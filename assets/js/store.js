// Dati locali (localStorage). Nessun server. Struttura:
// { v:1, workspace:{name}, engagements:[{ id,title,client,team,end,createdAt,demo,
//   expectations:[{id,owner,text,measure,due,createdAt,mid}],
//   decisions:[{id,what,why,who,alt,date,createdAt,from}],
//   milestones:[{id,name,date,expIds,token,team:{ratings,at}|null,client:{ratings,at,by}|null}] }] }
import { demoEngagement, demoPeople } from './demo.js';
import { PLANS } from './plans.js';
import { tx } from './i18n.js';

const KEY = 'altravi.team.v1';
const CV_KEY = 'altravi.team.cv';
let S = load();
const subs = new Set();

function empty() { return { v: 1, workspace: { name: '', people: [], trial: null }, engagements: [] }; }
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const o = JSON.parse(raw); if (o && o.v === 1 && Array.isArray(o.engagements)) { o.workspace = Object.assign({ name: '', people: [], trial: null }, o.workspace || {}); return o; } }
  } catch { /* dati illeggibili: si riparte */ }
  return empty();
}
export function reload() { S = load(); }
export const get = () => S;
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* memoria piena */ } subs.forEach(f => f()); }
export const onChange = f => { subs.add(f); return () => subs.delete(f); };
export const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
export const token = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join('');

export const engagement = id => S.engagements.find(e => e.id === id);
export const milestone = (e, mid) => e && e.milestones.find(m => m.id === mid);
export const workspaceName = () => S.workspace.name || '';
export function setWorkspaceName(n) { S.workspace.name = String(n || '').trim().slice(0, 80); save(); }

/** Nuovo incarico: restituisce l'id. */
export function addEngagement({ title, client, contact, end }) {
  const [cn, ...cr] = String(contact || '').split(',');
  const contacts = cn && cn.trim() ? [{ name: cn.trim(), role: cr.join(',').trim() }] : [];
  const e = { id: uid(), title: title.trim(), client: client.trim(), contacts, team: S.workspace.name, end: end || '', createdAt: Date.now(), demo: false, closedAt: 0, reviews: [], expectations: [], decisions: [], milestones: [] };
  S.engagements.unshift(e); save(); return e.id;
}
/** La nuova aspettativa va nella prima tappa aperta (la più vicina); se non c'è resta libera. */
export function addExpectation(e, { owner, text, measure, due, by }) {
  const x = { id: uid(), owner, by: (by || '').trim(), text: text.trim(), measure: (measure || '').trim(), due: due || '', createdAt: Date.now(), mid: '' };
  const open = e.milestones.filter(m => !(m.team && m.client)).sort((a, b) => a.date.localeCompare(b.date));
  const target = open.find(m => !m.team && !m.client && (!due || m.date >= due)) || open.find(m => !m.team && !m.client);
  if (target) { x.mid = target.id; target.expIds.push(x.id); }
  e.expectations.push(x); save(); return x.id;
}
export function addDecision(e, { what, why, who, alt, from }) {
  const d = { id: uid(), what: what.trim(), why: (why || '').trim(), who: (who || '').trim(), alt: (alt || '').trim(), date: isoDay(new Date()), createdAt: Date.now(), from: from || null };
  e.decisions.push(d); save(); return d.id;
}
/** Nuova tappa: prende le aspettative non ancora assegnate a una tappa. */
export function addMilestone(e, { name, date }) {
  const free = e.expectations.filter(x => !x.mid).map(x => x.id);
  const m = { id: uid(), name: name.trim(), date, expIds: free, token: '', team: null, client: null };
  free.forEach(id => { e.expectations.find(x => x.id === id).mid = m.id; });
  e.milestones.push(m); save(); return m.id;
}
export function setTeamCheck(e, m, ratings) { m.team = { ratings, at: Date.now() }; save(); }
export function setClientCheck(e, m, ratings, by) { m.client = { ratings, at: Date.now(), by: by || '' }; save(); }
export function shareToken(m) { if (!m.token) { m.token = token(); save(); } return m.token; }

/* ───────── piano, prova, persone ───────── */
// L'accesso (prova, piano, pausa) arriva dal servizio tramite cloud.js; qui solo una finestra su di esso, per evitare import circolari.
let accessFn = () => null;
export const setAccessProvider = f => { accessFn = f; };
export const access = () => accessFn();
export const trialDaysLeft = () => { const a = accessFn(); return a && a.status === 'trial' ? a.daysLeft : null; };
/** Piano in uso: quello dell'abbonamento, Team durante la prova, Start senza account (incarichi già presenti su questo dispositivo). */
export const currentPlan = () => { const a = accessFn(); return a ? (a.accessPlan || a.plan || 'start') : 'start'; };
export const readOnly = () => { const a = accessFn(); return !!(a && a.readOnly); };
export const activeEngagements = () => S.engagements.filter(e => !e.closedAt);
export const jobLimitReached = () => {
  const a = accessFn(), n = activeEngagements().length;
  if (a) return a.readOnly || (a.limits.jobs != null && n >= a.limits.jobs);
  return n >= PLANS.start.jobs;
};
export const people = () => S.workspace.people;
export const userLimitReached = () => S.workspace.people.length >= PLANS[currentPlan()].users;
export function addPerson({ name, role }) { S.workspace.people.push({ id: uid(), name: name.trim(), role: (role || '').trim() }); save(); }
export function removePerson(id) { S.workspace.people = S.workspace.people.filter(p => p.id !== id); save(); }
export function closeEngagement(e) { e.closedAt = Date.now(); save(); }
export function addReview(e, by, note) { e.reviews = e.reviews || []; e.reviews.push({ at: Date.now(), by: by || '', note: note || '' }); save(); }

/* ───────── modifica ed eliminazione (con registro per lo storico) ───────── */
const logOf = e => (e.log = e.log || []);
function applyChanges(e, kind, obj, fields, next, extraLog) {
  const ch = [];
  for (const k of fields) {
    const from = tx(obj[k]), to = String(next[k] == null ? '' : next[k]).trim();
    if (from !== to) { ch.push({ k, from, to }); obj[k] = to; }
  }
  if (!ch.length) return false;
  logOf(e).push({ at: Date.now(), kind, id: obj.id, owner: obj.owner || '', text: tx(obj.text || obj.what), ch, ...extraLog });
  save(); return true;
}
export const expectationById = (e, id) => e.expectations.find(q => q.id === id);
export const decisionById = (e, id) => e.decisions.find(q => q.id === id);
/** True se la tappa dell'aspettativa è già chiusa da entrambi: allora non si elimina (lo storico resta vero). */
export const expLocked = (e, x) => { const m = x.mid && milestone(e, x.mid); return !!(m && m.team && m.client); };
export function updateExpectation(e, id, next) { const x = expectationById(e, id); return x ? applyChanges(e, 'exp-edit', x, ['text', 'by', 'measure', 'due'], next) : false; }
export function updateDecision(e, id, next) { const d = decisionById(e, id); return d ? applyChanges(e, 'dec-edit', d, ['what', 'why', 'who', 'alt'], next) : false; }
/** Elimina; restituisce il necessario per annullare (o null). */
export function deleteExpectation(e, id) {
  const idx = e.expectations.findIndex(q => q.id === id); if (idx < 0) return null;
  const x = e.expectations[idx]; if (expLocked(e, x)) return null;
  const m = x.mid ? milestone(e, x.mid) : null; const rec = { kind: 'exp', idx, x, mid: m ? m.id : '', pos: m ? m.expIds.indexOf(id) : -1, rt: null, rc: null };
  if (m) {
    m.expIds = m.expIds.filter(q => q !== id);
    if (m.team && m.team.ratings[id]) { rec.rt = m.team.ratings[id]; delete m.team.ratings[id]; }
    if (m.client && m.client.ratings[id]) { rec.rc = m.client.ratings[id]; delete m.client.ratings[id]; }
  }
  e.expectations.splice(idx, 1);
  rec.log = { at: Date.now(), kind: 'exp-del', id, owner: x.owner, text: tx(x.text), ch: [] }; logOf(e).push(rec.log);
  save(); return rec;
}
export function deleteDecision(e, id) {
  const idx = e.decisions.findIndex(q => q.id === id); if (idx < 0) return null;
  const d = e.decisions[idx]; e.decisions.splice(idx, 1);
  const rec = { kind: 'dec', idx, d, log: { at: Date.now(), kind: 'dec-del', id, owner: '', text: tx(d.what), ch: [] } }; logOf(e).push(rec.log);
  save(); return rec;
}
export function restoreDeleted(e, rec) {
  if (rec.kind === 'exp') {
    e.expectations.splice(Math.min(rec.idx, e.expectations.length), 0, rec.x);
    const m = rec.mid ? milestone(e, rec.mid) : null;
    if (m) { m.expIds.splice(rec.pos >= 0 ? rec.pos : m.expIds.length, 0, rec.x.id); if (rec.rt && m.team) m.team.ratings[rec.x.id] = rec.rt; if (rec.rc && m.client) m.client.ratings[rec.x.id] = rec.rc; }
  } else e.decisions.splice(Math.min(rec.idx, e.decisions.length), 0, rec.d);
  e.log = logOf(e).filter(l => l !== rec.log); save();
}

export function seedDemo(force = false) {
  const i = S.engagements.findIndex(e => e.id === 'demo');
  if (i >= 0 && !force) return 'demo';
  if (i >= 0) S.engagements.splice(i, 1);
  if (!S.workspace.name) S.workspace.name = 'Studio Meridiana';
  if (!S.workspace.people.length) S.workspace.people = demoPeople();
  S.engagements.unshift(demoEngagement(S.workspace.name));
  save(); return 'demo';
}
export function wipe() { S = empty(); try { localStorage.removeItem(KEY); localStorage.removeItem(CV_KEY); } catch { /* ignore */ } subs.forEach(f => f()); }

export function isoDay(d) {
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
export const addDays = (n, from = new Date()) => { const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + n); return isoDay(d); };
export const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const daysFromToday = s => Math.round((parseDay(s) - parseDay(isoDay(new Date()))) / 86400000);

/* ───────── stato della vista cliente (solo su questo dispositivo) ───────── */
export function loadCV() { try { return JSON.parse(localStorage.getItem(CV_KEY) || 'null'); } catch { return null; } }
export function saveCV(o) { try { localStorage.setItem(CV_KEY, JSON.stringify(o)); } catch { /* ignore */ } }
export function clearCV() { try { localStorage.removeItem(CV_KEY); } catch { /* ignore */ } }
