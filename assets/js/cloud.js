// Account e sincronizzazione con il servizio (Central Core). Offline-first: i dati restano sul dispositivo e si allineano quando c'è rete.
// Stato in localStorage['altravi.team.cloud']: { session, me, base:{id:{v,doc}}, skew, lastSync, lastWs, pending:[ids], skip:{id:1}, importAsked }
import * as S from './store.js';
import { call } from './api.js';
import { merge3, stable } from './merge.js';
import { SYNC_EVERY } from './config.js';
import { getLang, t } from './i18n.js';
import { baseUrl } from './share.js';

const KEY = 'altravi.team.cloud';
const blank = () => ({ session: '', me: null, base: {}, skew: 0, lastSync: 0, lastWs: '', pending: [], skip: {}, importAsked: false });
function load() { try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && typeof o === 'object') return Object.assign(blank(), o); } catch { /* ignore */ } return blank(); }
let C = load();
let state = 'idle', blocked = '', timersOn = false, applying = false, debounce = 0, running = null, again = false, expired = false;
const subs = new Set();
export const onCloud = f => { subs.add(f); return () => subs.delete(f); };
const rsubs = new Set(); export const onRemote = f => { rsubs.add(f); return () => rsubs.delete(f); };
const emit = () => subs.forEach(f => f());
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(C)); } catch { /* memoria piena */ } };
const clone = v => JSON.parse(JSON.stringify(v));

export const signedIn = () => !!C.session && !!C.me;
export const sessionExpired = () => expired;
export const me = () => C.me;
/** Una riga che dice se tutto è allineato. */
export function syncText() {
  if (!signedIn()) return '';
  const p = dirtyIds().length;
  if (blocked) return t('sync.blocked.' + blocked);
  if (state === 'offline') return t('sync.offline') + (p ? ' · ' + t('sync.pending', { n: p }) : '');
  if (state === 'error') return t('sync.error');
  if (state === 'syncing') return t('sync.syncing');
  return p ? t('sync.pending', { n: p }) : t('sync.ok');
}
export const syncState = () => ({ state, blocked, last: C.lastSync, pending: dirtyIds().length });
const now = () => Date.now() + (C.skew || 0);

/** Stato dell'accesso, ricalcolato qui con l'orologio del servizio: la prova scade anche senza rete. */
export function access() {
  if (!signedIn()) return null;
  const a = C.me.workspace.access;
  if (a.admin || a.status !== 'trial') return a;
  const left = Date.parse(a.trialEndsAt) - now();
  if (left > 0) return { ...a, daysLeft: Math.ceil(left / 86400000) };
  return { ...a, status: 'paused', readOnly: true, daysLeft: null, accessPlan: null, limits: { jobs: 0, users: 0, clients: false } };
}
export const isOwner = () => !!C.me && (C.me.workspace.role === 'owner' || C.me.user.admin);
export const billing = () => (C.me ? C.me.billing : null);

/* ───────── accesso ───────── */
function setSession(r) {
  const prev = C.lastWs;
  C.session = r.session; C.me = { user: r.user, workspace: r.workspace, billing: r.billing };
  C.skew = Date.parse(r.server_time) - Date.now(); expired = false;
  if (prev && prev !== r.workspace.id) { C.base = {}; C.skip = {}; C.importAsked = false; }
  C.lastWs = r.workspace.id;
  // gli incarichi già presenti su questo dispositivo (non demo) aspettano la scelta «portali nel tuo spazio»
  C.pending = C.importAsked ? [] : S.get().engagements.filter(e => !e.demo && !C.base[e.id]).map(e => e.id);
  persist(); emit(); start(); syncNow();
}
export const requestCode = (email) => call('auth/request', { email, lang: getLang() });
export async function verify(payload) {
  const r = await call('auth/verify', payload);
  if (r.ok) setSession(r);
  return r;
}
export async function signOut() {
  if (!signedIn()) return;
  try { await syncNow(); } catch { /* ignore */ }
  const s = C.session;
  call('auth/logout', {}, s);
  // gli incarichi già al sicuro nel servizio escono da questo dispositivo (utile sui dispositivi condivisi)
  const eng = S.get().engagements; for (let i = eng.length - 1; i >= 0; i--) if (!eng[i].demo && C.base[eng[i].id] && stable(eng[i]) === stable(C.base[eng[i].id].doc)) eng.splice(i, 1);
  applying = true; S.save(); applying = false;
  C = blank(); persist(); emit();
}
export async function refreshMe() {
  if (!C.session) return null;
  const r = await call('me', {}, C.session);
  if (r.ok) { C.me = { user: r.user, workspace: r.workspace, billing: r.billing }; C.skew = Date.parse(r.server_time) - Date.now(); persist(); emit(); return C.me; }
  fail(r); return null;
}
function fail(r) {
  if (r.code === 'NO_SESSION') { expired = true; C.session = ''; C.me = null; persist(); state = 'idle'; }
  else if (r.code === 'NETWORK' || r.code === 'NOT_DEPLOYED') state = 'offline';
  else state = 'error';
  emit();
}

/* ───────── sincronizzazione ───────── */
const DEMO = e => !!e.demo;
export function dirtyIds() {
  if (!C.session) return [];
  return S.get().engagements.filter(e => !DEMO(e) && !C.skip[e.id] && !C.pending.includes(e.id) && (!C.base[e.id] || stable(e) !== stable(C.base[e.id].doc))).map(e => e.id);
}
function replaceLocal(id, doc) {
  const eng = S.get().engagements, i = eng.findIndex(e => e.id === id);
  if (i >= 0) eng[i] = clone(doc); else eng.unshift(clone(doc));
}
function takeRemote(id, doc, version) {
  const local = S.engagement(id), b = C.base[id];
  if (!local) replaceLocal(id, doc);
  else if (b && stable(local) === stable(b.doc)) replaceLocal(id, doc);
  else replaceLocal(id, merge3(b ? b.doc : null, local, doc));
  C.base[id] = { v: version, doc: clone(doc) };
}
async function doSync() {
  if (!C.session) return;
  state = 'syncing'; emit();
  let changed = false;
  const known = Object.fromEntries(Object.entries(C.base).filter(([id]) => S.engagement(id)).map(([id, b]) => [id, b.v]));   // un incarico tolto da questo dispositivo (es. «Cancella tutti i dati») si riscarica per intero
  const r = await call('jobs/list', { known }, C.session);
  if (!r.ok) { fail(r); return; }
  C.me.workspace.access = r.access; C.skew = Date.parse(r.server_time) - Date.now();
  for (const j of r.jobs) if (j.doc && !(C.skip[j.id])) { takeRemote(j.id, j.doc, j.version); changed = true; }
  blocked = '';
  for (let round = 0; round < 3; round++) {
    const ids = dirtyIds(); if (!ids.length) break;
    let conflict = false;
    for (const id of ids) {
      const e = S.engagement(id); if (!e) continue;
      const doc = clone(e);
      const p = await call('jobs/put', { id, base_version: C.base[id] ? C.base[id].v : 0, doc }, C.session);
      if (p.ok) { C.base[id] = { v: p.version, doc }; continue; }
      if (p.code === 'CONFLICT') { takeRemote(id, p.doc, p.version); changed = true; conflict = true; continue; }
      if (p.code === 'PAUSED' || p.code === 'JOB_LIMIT') { blocked = p.code; state = 'idle'; await finish(changed); return; }
      fail(p); await finish(changed); return;
    }
    if (!conflict) break;
  }
  state = 'idle'; C.lastSync = Date.now();
  await finish(changed);
}
async function finish(changed) {
  if (changed) { applying = true; S.save(); applying = false; }
  persist(); emit(); if (changed) rsubs.forEach(f => f());
}
export function syncNow() {
  if (!C.session) return Promise.resolve();
  if (running) { again = true; return running; }
  running = (async () => { try { do { again = false; await doSync(); } while (again); } finally { running = null; } })();
  return running;
}
export const unlockImport = (take) => {
  if (take) C.pending = []; else { for (const id of C.pending) C.skip[id] = 1; C.pending = []; }
  C.importAsked = true; persist(); emit(); return syncNow();
};
export const pendingImport = () => (C.pending || []).filter(id => S.engagement(id));

function start() {
  if (timersOn) return; timersOn = true;
  setInterval(() => { if (C.session && document.visibilityState === 'visible') syncNow(); }, SYNC_EVERY);
  document.addEventListener('visibilitychange', () => { if (C.session && document.visibilityState === 'visible') { syncNow(); refreshMe(); } });
  window.addEventListener('online', () => syncNow());
}
export function init() {
  S.onChange(() => { if (applying || !C.session) return; clearTimeout(debounce); debounce = setTimeout(syncNow, 1200); });
  if (C.session) { start(); syncNow(); refreshMe(); }
}

/* ───────── spazio, colleghi, clienti, pagamento ───────── */
export async function setTeamName(name) {
  S.setWorkspaceName(name);
  if (!C.session) return { ok: true };
  const r = await call('workspace/update', { name: String(name || '').trim().slice(0, 80) }, C.session);
  if (r.ok) { C.me.workspace.name = r.name; persist(); emit(); } else fail(r);
  return r;
}
export async function invite(email) { const r = await call('members/invite', { email, lang: getLang() }, C.session); if (!r.ok) fail(r); else refreshMe(); return r; }
export async function removeMember(id) { const r = await call('members/remove', { user_id: id }, C.session); if (r.ok) await refreshMe(); else fail(r); return r; }
export async function clientLink(e, mid) {
  await syncNow();
  if (!C.base[e.id]) throw Object.assign(new Error('NOT_SYNCED'), { code: 'NOT_SYNCED' });
  const r = await call('clients/create', { job_id: e.id, milestone_id: mid || undefined, lang: getLang() }, C.session);
  if (!r.ok) { if (r.code === 'NO_SESSION') fail(r); throw Object.assign(new Error(r.code), { code: r.code }); }
  return baseUrl() + '#/v/' + r.token;
}
export const clientFetch = token => call('clients/get', { token });
export const clientSend = (token, payload) => call('clients/answer', { token, ...payload });
export async function checkout(plan, interval) {
  const r = await call('billing/checkout', { plan, interval, lang: getLang() }, C.session);
  if (!r.ok) { if (r.code === 'NO_SESSION') fail(r); return r; }
  location.assign(r.url); return r;
}
export async function portal() {
  const r = await call('billing/portal', { lang: getLang() }, C.session);
  if (r.ok) location.assign(r.url); else if (r.code === 'NO_SESSION') fail(r);
  return r;
}
export const adminStats = () => call('admin/stats', {}, C.session);
