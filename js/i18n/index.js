// i18n: IT (lingua di partenza) + EN. La lingua è una preferenza locale ("altravi.lang"); nessun dato lascia il dispositivo.
import it from './it.js';
import en from './en.js';

// Solo italiano e inglese (interfaccia + contenuti completi). Predefinita: inglese; italiano se il browser lo preferisce.
const dicts = { it, en };
export const LANGS = ['it', 'en'];
export const LANG_NAMES = { it: 'Italiano', en: 'English' };
export const RTL = ['ar', 'he', 'fa', 'ur']; // layout RTL pronto: aggiungere un dizionario basta ad attivarlo
export const contentLang = l => (l === 'it' ? 'it' : 'en');
export const dirOf = l => (RTL.includes(l) ? 'rtl' : 'ltr');
const LKEY = 'altravi.lang';
let lang = 'it';
const listeners = new Set();

function detect() {
  try {
    const q = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('lang') : null;
    if (q && dicts[q]) return q;
    const s = typeof localStorage !== 'undefined' ? (localStorage.getItem(LKEY) || localStorage.getItem('altrimenti.lang')) : null;
    if (s && dicts[s]) return s;
  } catch { /* storage non disponibile */ }
  const prefs = (typeof navigator !== 'undefined' && (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])) || ['en'];
  for (const p of prefs) { const base = String(p || '').toLowerCase().split('-')[0]; if (dicts[base]) return base; }
  return 'en';
}
lang = detect();
if (typeof document !== 'undefined') { document.documentElement.lang = lang; document.documentElement.dir = dirOf(lang); }

export const getLang = () => lang;
export function setLang(l) {
  if (!dicts[l] || l === lang) return;
  lang = l;
  try { localStorage.setItem(LKEY, l); } catch { /* ok */ }
  if (typeof document !== 'undefined') { document.documentElement.lang = l; document.documentElement.dir = dirOf(l); }
  listeners.forEach(fn => fn(l));
}
export const onLang = fn => listeners.add(fn);

export function t(key, vars = {}) {
  const s = (dicts[lang] && dicts[lang][key]) ?? dicts.en[key] ?? dicts.it[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
}
/** Locale per Intl */
export const LOCALES = { it: 'it-IT', en: 'en-GB' };
export const locale = () => LOCALES[lang] || 'en-GB';
export function dictKeys(l) { return Object.keys(dicts[l]); }

/* ───── regione (per scegliere quali fonti pubbliche mostrare per prime) ───── */
const EU = 'AT BE BG HR CY CZ DK EE FI FR DE GR HU IE LV LT LU MT NL PL PT RO SK SI ES SE'.split(' ');
const TZ = { 'Europe/Rome': 'IT', 'Europe/London': 'GB', 'Europe/Dublin': 'IE' };
/** Codice paese ISO 3166 stimato da lingua/regione del browser o dal fuso orario ("?region=XX" per forzarlo). Nessun dato esce dal dispositivo. */
export function country() {
  try {
    const q = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('region') : null;
    if (q && /^[A-Za-z]{2}$/.test(q)) return q.toUpperCase();
    const prefs = typeof navigator !== 'undefined' ? (navigator.languages || [navigator.language]) : [];
    for (const p of prefs) { const m = String(p).match(/^[a-z]{2,3}[-_]([A-Za-z]{2})\b/); if (m) return m[1].toUpperCase(); }
    const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
    if (TZ[tz]) return TZ[tz];
    if (/^Europe\//.test(tz)) return 'EU';
  } catch { /* ok */ }
  return '';
}
/** 'IT' | 'EU' | 'GB' | 'US' | 'WORLD' */
export function region() {
  const c = country();
  if (c === 'IT') return 'IT';
  if (c === 'GB') return 'GB';
  if (c === 'US') return 'US';
  if (c === 'EU' || EU.includes(c)) return 'EU';
  return 'WORLD';
}
