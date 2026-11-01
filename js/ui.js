// Piccoli helper UI (nessun framework). Il testo dell'utente passa sempre da textContent: niente XSS.
import { t } from './i18n/index.js';
import { evidence } from './content/index.js';
import { DAY_MS } from './store.js';

export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') el.setAttribute('style', v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'html') throw new Error('html non ammesso');
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return el;
}

export function svg(tag, attrs, ...kids) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  for (const kid of kids.flat()) if (kid) el.append(kid);
  return el;
}

export const FORK_COLORS = { a: '#ffb84d', b: '#4fd1c5', c: '#b794f6' };

/** "tra 21 ore", "in 3 days"… dato un numero di millisecondi mancanti. */
export function humanize(ms) {
  const m = Math.max(1, Math.round(ms / 60000));
  if (m < 60) return t(m === 1 ? 'rel.minute' : 'rel.minutes', { n: m });
  const hrs = Math.round(m / 60);
  if (hrs < 48) return t(hrs === 1 ? 'rel.hour' : 'rel.hours', { n: hrs });
  const d = Math.round(hrs / 24);
  if (d < 60) return t('rel.days', { n: d });
  const mo = Math.round(d / 30);
  return t(mo === 1 ? 'rel.month' : 'rel.months', { n: mo });
}
export const remainingMs = (line, hz, now) => line.choiceAt + hz.days * DAY_MS - now;

export function shortSource(e) {
  const base = e.source.split(/,|\(/)[0].trim();
  return `${base} ${e.year}`;
}

let dlg, lastFocus;
export function showEvidence(id) {
  const e = evidence(id); if (!e) return;
  lastFocus = document.activeElement;
  if (!dlg) {
    dlg = h('dialog', { class: 'sheet', 'aria-labelledby': 'evT' });
    dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => { try { lastFocus && lastFocus.isConnected && lastFocus.focus(); } catch {} });
    document.body.append(dlg);
  }
  dlg.replaceChildren(
    h('p', { class: 'kicker' }, `${t('ev.source')} · ${e.scope}`),
    h('h3', { id: 'evT' }, e.headline),
    h('dl', null,
      h('dt', null, t('ev.means')), h('dd', null, e.means),
      h('dt', null, t('ev.limits')), h('dd', null, e.limits),
      h('dt', null, t('ev.source')), h('dd', null, e.source),
    ),
    h('div', { class: 'row', style: 'margin-top:1rem' },
      h('a', { class: 'btn', href: e.url, target: '_blank', rel: 'noopener noreferrer' }, t('ev.open')),
      h('button', { class: 'btn primary', type: 'button', onclick: () => dlg.close() }, t('ev.close')),
    ),
  );
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
}

export function evBadge(evId) {
  if (!evId) return h('span', { class: 'badge q', title: t('fork.qual.title') }, t('fork.qual'));
  const e = evidence(evId);
  return h('button', { class: 'badge', type: 'button', onclick: () => showEvidence(evId), 'aria-label': `${t('fork.evidence')}: ${shortSource(e)}. ${t('fork.evidence.open')}` },
    svg('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' },
      svg('path', { d: 'M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z' }), svg('path', { d: 'M8 7h6M8 11h6' })),
    `${t('fork.evidence')} · ${shortSource(e)}`);
}

/** File .ics locale (nessun server): promemoria per l'apertura del prossimo capitolo. */
export function downloadICS({ title, description, whenTs }) {
  const d = new Date(whenTs); d.setHours(9, 0, 0, 0);
  const p = n => String(n).padStart(2, '0');
  const stamp = x => `${x.getFullYear()}${p(x.getMonth() + 1)}${p(x.getDate())}T${p(x.getHours())}${p(x.getMinutes())}00`;
  const end = new Date(d.getTime() + 15 * 60000);
  const esc = s => s.replace(/[\\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pi.Gi Service//Altravì//' + (document.documentElement.lang || 'it').toUpperCase(), 'BEGIN:VEVENT',
    `UID:${Date.now()}@altravi.local`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(d)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`, `DESCRIPTION:${esc(description)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = h('a', { href: url, download: t('ics.file') }); document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export const prefersReduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const sleep = ms => new Promise(r => setTimeout(r, ms));
