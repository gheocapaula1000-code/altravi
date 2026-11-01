// Piccoli attrezzi di interfaccia: html sicuro, date, icone, anello del punteggio.
import { t, tx, locale } from './i18n.js';
import { parseDay } from './store.js';

export class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
export const raw = s => new Raw(s);
const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = s => String(s).replace(/[&<>"']/g, c => MAP[c]);
const val = v => (v instanceof Raw ? v.s : Array.isArray(v) ? v.map(val).join('') : v == null || v === false ? '' : esc(v));
export function html(strs, ...vals) { let o = ''; strs.forEach((s, i) => { o += s; if (i < vals.length) o += val(vals[i]); }); return new Raw(o); }

const fmtCache = {};
export function fmtDay(iso, withYear) {
  if (!iso) return t('date.none');
  const d = parseDay(iso), key = locale() + (withYear ? 'y' : '');
  fmtCache[key] = fmtCache[key] || new Intl.DateTimeFormat(locale(), withYear ? { day: 'numeric', month: 'short', year: 'numeric' } : { day: 'numeric', month: 'short' });
  return fmtCache[key].format(d);
}
export function fmtTs(ts) {
  const d = new Date(ts);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return new Intl.DateTimeFormat(locale(), sameYear ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

const I = {
  sum: '<path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0"/><path d="M12 8v4l3 2"/>',
  exp: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L6.8 5M3.5 12l1.2 1.2L6.8 11M3.5 18l1.2 1.2L6.8 17"/>',
  dec: '<path d="M12 3v7M12 10c0 4-6 4-6 11M12 10c0 4 6 4 6 11"/>',
  his: '<path d="M12 7v5l3 2"/><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  met: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  partly: '<path d="M12 4a8 8 0 1 0 0 16z" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="8"/>',
  missed: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v7h14v-7"/>',
  download: '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/>',
};
export const icon = (n, cls = '') => raw(`<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`);

export const rateBadge = r => html`<span class="rate ${r}">${icon(r)}<span>${t('rate.' + r)}</span></span>`;
export const ownerChip = o => html`<span class="owner ${o}"><i></i>${t('ex.' + o)}</span>`;

/** Anello del punteggio di allineamento. */
export function ring(value, level, size = '8rem') {
  const C = 2 * Math.PI * 42;
  const dash = value == null ? 0 : (value / 100) * C;
  return html`<div class="ring ${level || 'none'}" style="--s:${size}" role="img" aria-label="${t('sm.align')}: ${value == null ? '—' : value + '%'}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rt" cx="50" cy="50" r="42"/><circle class="rv" cx="50" cy="50" r="42" stroke-dasharray="${dash.toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 50 50)"/></svg><b>${value == null ? '—' : value + '%'}</b></div>`;
}

let toastT = 0;
export function toast(msg) {
  let n = document.getElementById('toast');
  if (!n) { n = document.createElement('div'); n.id = 'toast'; n.className = 'toast'; n.setAttribute('role', 'status'); n.setAttribute('aria-live', 'polite'); document.body.append(n); }
  n.textContent = msg; n.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => n.classList.remove('on'), 2600);
}
export { t, tx };
