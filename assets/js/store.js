// Dati locali (localStorage). Nessun server. Struttura:
// { v:1, workspace:{name}, engagements:[{ id,title,client,team,end,createdAt,demo,
//   expectations:[{id,owner,text,measure,due,createdAt,mid}],
//   decisions:[{id,what,why,who,alt,date,createdAt,from}],
//   milestones:[{id,name,date,expIds,token,team:{ratings,at}|null,client:{ratings,at,by}|null}] }] }
import { demoEngagement, demoPeople } from './demo.js';
import { PLANS, TRIAL_DAYS } from './plans.js';

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
export const trial = () => S.workspace.trial;
export function trialDaysLeft() {
  const tr = S.workspace.trial; if (!tr) return null;
  return Math.ceil((tr.endsAt - Date.now()) / 86400000);
}
export const trialActive = () => { const n = trialDaysLeft(); return n != null && n > 0; };
/** Piano in uso: quello della prova finché dura, altrimenti Start (la demo gira con i limiti di Start). */
export const currentPlan = () => (trialActive() ? S.workspace.trial.plan : 'start');
export function startTrial(plan, email) {
  S.workspace.trial = { plan, email: String(email).trim(), startedAt: Date.now(), endsAt: Date.now() + TRIAL_DAYS * 86400000 };
  save();
}
export const activeEngagements = () => S.engagements.filter(e => !e.closedAt);
export const jobLimitReached = () => activeEngagements().length >= PLANS[currentPlan()].jobs;
export const people = () => S.workspace.people;
export const userLimitReached = () => S.workspace.people.length >= PLANS[currentPlan()].users;
export function addPerson({ name, role }) { S.workspace.people.push({ id: uid(), name: name.trim(), role: (role || '').trim() }); save(); }
export function removePerson(id) { S.workspace.people = S.workspace.people.filter(p => p.id !== id); save(); }
export function closeEngagement(e) { e.closedAt = Date.now(); save(); }
export function addReview(e, by, note) { e.reviews = e.reviews || []; e.reviews.push({ at: Date.now(), by: by || '', note: note || '' }); save(); }

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
