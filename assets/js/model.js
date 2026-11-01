// Logica di allineamento, prossimo passo, storico. Nessuna interfaccia qui.
import { daysFromToday } from './store.js';
import { tx, t } from './i18n.js';

export const RATES = ['met', 'partly', 'missed'];
const VAL = { met: 1, partly: 0.5, missed: 0 };
export const rateVal = r => VAL[r];

/** 100 se uguali, 50 se differiscono di un gradino, 0 se opposti (raggiunta / mancata). */
export const pairAlign = (a, b) => { const d = Math.abs(VAL[a] - VAL[b]); return d === 0 ? 100 : d === 0.5 ? 50 : 0; };
export const level = a => (a >= 85 ? 'high' : a >= 60 ? 'mid' : 'low');
export const isDone = m => !!(m.team && m.client);

export function milestoneResult(e, m) {
  if (!isDone(m)) return null;
  const rows = [];
  for (const id of m.expIds) {
    const exp = e.expectations.find(x => x.id === id);
    const a = m.team.ratings[id], b = m.client.ratings[id];
    if (!exp || !a || !b) continue;
    rows.push({ exp, a, b, align: pairAlign(a.r, b.r), same: a.r === b.r });
  }
  if (!rows.length) return { rows, align: null, fulfil: null, gaps: [], agree: [] };
  const align = Math.round(rows.reduce((s, r) => s + r.align, 0) / rows.length);
  const fulfil = Math.round(rows.reduce((s, r) => s + (VAL[r.a.r] + VAL[r.b.r]) / 2, 0) / rows.length * 100);
  const gaps = rows.filter(r => !r.same).sort((x, y) => x.align - y.align);
  return { rows, align, fulfil, gaps, agree: rows.filter(r => r.same) };
}
export const doneMilestones = e => e.milestones.filter(isDone).sort((a, b) => a.date.localeCompare(b.date));

/** Punteggio dell'incarico = allineamento dell'ultima tappa verificata (+ differenza con la precedente). */
export function engagementScore(e) {
  const d = doneMilestones(e).map(m => milestoneResult(e, m)).filter(r => r && r.align != null);
  if (!d.length) return null;
  const last = d[d.length - 1].align;
  const prev = d.length > 1 ? d[d.length - 2].align : null;
  return { value: last, delta: prev == null ? null : last - prev, series: d.map(r => r.align) };
}

export const msState = m => (isDone(m) ? 'done' : m.team ? 'team' : m.client ? 'client' : 'open');
export const sortedMs = e => [...e.milestones].sort((a, b) => a.date.localeCompare(b.date));

/** Cosa fare adesso: sempre un solo passo, scelto in questo ordine. */
export function nextStep(e) {
  const hasT = e.expectations.some(x => x.owner === 'team'), hasC = e.expectations.some(x => x.owner === 'client');
  if (!hasC) return { kind: 'exp-client' };
  if (!hasT) return { kind: 'exp-team' };
  if (!e.milestones.length) return { kind: 'ms' };
  const ms = sortedMs(e);
  const waiting = ms.find(m => m.team && !m.client);
  if (waiting) return { kind: 'send', m: waiting };
  const clientFirst = ms.find(m => m.client && !m.team);
  if (clientFirst) return { kind: 'reply', m: clientFirst };
  const due = ms.find(m => !m.team && !m.client && m.expIds.length && daysFromToday(m.date) <= 3);
  if (due) return { kind: 'check', m: due };
  if (!e.closedAt && ms.length && ms.every(isDone)) return { kind: 'close' };
  return { kind: 'dec' };
}
export function whenText(date) {
  const n = daysFromToday(date);
  if (n === 0) return t('ns.when.today');
  if (n === 1) return t('ns.when.tomorrow');
  if (n < 0) return t('ns.when.past');
  return t('ns.when.in', { n });
}

/** Storico: eventi ricavati dai dati, dal più recente. */
export function events(e) {
  const out = [];
  out.push({ at: e.createdAt, kind: 'start', title: t('hs.ev.start', { t: tx(e.title) }), body: '', cat: 'all' });
  for (const x of e.expectations) {
    out.push({ at: x.createdAt, kind: 'exp', owner: x.owner, title: t('hs.ev.exp.' + x.owner), body: tx(x.text), extra: [tx(x.by) && t('ex.by', { n: tx(x.by) }), tx(x.measure) && (t('ex.measure') + ': ' + tx(x.measure))].filter(Boolean), cat: 'exp' });
  }
  for (const r of e.reviews || []) {
    out.push({ at: r.at, kind: 'review', title: t('hs.ev.review'), body: r.by ? t('rs.from', { n: r.by }) : '', extra: tx(r.note) ? [tx(r.note)] : [], cat: 'exp' });
  }
  for (const d of e.decisions) {
    const extra = [];
    if (tx(d.why)) extra.push(t('dc.why') + ': ' + tx(d.why));
    if (tx(d.who)) extra.push(t('dc.who') + ': ' + tx(d.who));
    if (tx(d.alt)) extra.push(t('dc.alt') + ': ' + tx(d.alt));
    out.push({ at: d.createdAt, kind: 'dec', title: t('hs.ev.dec'), body: tx(d.what), extra, cat: 'dec' });
  }
  for (const m of e.milestones) {
    const nm = tx(m.name);
    const notes = side => Object.entries(side.ratings).map(([id, v]) => { const x = e.expectations.find(q => q.id === id); return x ? tx(x.text) + ' — ' + t('rate.' + v.r) + (v.note ? ': ' + tx(v.note) : '') : ''; }).filter(Boolean);
    if (m.team) out.push({ at: m.team.at, kind: 'chk', side: 'team', mid: m.id, title: t('hs.ev.chk.team', { m: nm }), body: '', extra: notes(m.team), cat: 'chk' });
    if (m.client) out.push({ at: m.client.at, kind: 'chk', side: 'client', mid: m.id, title: t('hs.ev.chk.client', { m: nm }), body: m.client.by ? t('rs.from', { n: m.client.by }) : '', extra: notes(m.client), cat: 'chk' });
    if (isDone(m)) {
      const r = milestoneResult(e, m);
      out.push({ at: Math.max(m.team.at, m.client.at) + 1, kind: 'res', mid: m.id, title: t('hs.ev.res', { m: nm, a: r.align ?? 0 }), body: '', extra: [], cat: 'chk' });
    }
  }
  return out.sort((a, b) => b.at - a.at);
}
export const eventText = ev => [ev.title, ev.body, ...(ev.extra || [])].join(' ').toLowerCase();
