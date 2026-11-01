// Segnali di risonanza CALCOLATI sul serio (nessuna predizione, nessun utente finto).
import { t, locale } from './i18n/index.js';

const SYNODIC = 29.530588853;
const NEW_MOON_JD = 2451550.1; // 6 gennaio 2000, 18:14 UTC

export function moonPhase(ts) {
  const jd = ts / 86400000 + 2440587.5;
  let phase = ((jd - NEW_MOON_JD) / SYNODIC) % 1; if (phase < 0) phase += 1;
  const illum = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  let key;
  if (phase < 0.03 || phase > 0.97) key = 'moon.new';
  else if (phase < 0.22) key = 'moon.waxing.crescent';
  else if (phase < 0.28) key = 'moon.first.quarter';
  else if (phase < 0.47) key = 'moon.waxing.gibbous';
  else if (phase < 0.53) key = 'moon.full';
  else if (phase < 0.72) key = 'moon.waning.gibbous';
  else if (phase < 0.78) key = 'moon.last.quarter';
  else key = 'moon.waning.crescent';
  return { phase, illum: Math.round(illum * 100), key, name: t(key) };
}

const f = (ts, opts) => new Date(ts).toLocaleDateString(locale(), opts);
export const fmtDate = ts => f(ts, { day: 'numeric', month: 'long', year: 'numeric' });
export const fmtTime = ts => { const d = new Date(ts); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
export const fmtDay = ts => f(ts, { weekday: 'long' });
export const fmtShort = ts => f(ts, { day: 'numeric', month: 'long' });

/** Coincidenze per UNA linea (sempre almeno la luna). */
export function coincidencesFor(line, allLines = []) {
  const ts = line.choiceAt, d = new Date(ts), out = [];
  const m = moonPhase(ts);
  out.push({ id: 'moon', title: m.name, text: t('coinc.moon', { n: m.illum }) });
  const hh = String(d.getHours()).padStart(2, '0'), mm = String(d.getMinutes()).padStart(2, '0');
  if (hh === mm) out.push({ id: 'repeat', title: t('coinc.repeat.t'), text: t('coinc.repeat', { hh, mm }) });
  else if (hh === mm.split('').reverse().join('')) out.push({ id: 'mirror', title: t('coinc.mirror.t'), text: t('coinc.mirror', { hh, mm }) });
  if (d.getDate() === d.getMonth() + 1) out.push({ id: 'double', title: t('coinc.double.t'), text: t('coinc.double', { d: d.getDate(), m: d.getMonth() + 1 }) });
  const sameDay = allLines.filter(l => l.id !== line.id && new Date(l.choiceAt).getDay() === d.getDay());
  if (sameDay.length) out.push({ id: 'weekday', title: t('coinc.weekday.t'), text: t('coinc.weekday', { day: fmtDay(ts) }) });
  return out;
}

/** Coincidenze trasversali, per la pagina Risonanze. */
export function coincidencesAll(lines) {
  const out = [];
  lines.forEach((l, i) => coincidencesFor(l, lines).forEach(c => out.push({ ...c, line: l, n: i + 1 })));
  return out;
}

/** "il 2 novembre 2026" / "l'8 novembre 2026" (IT, elisione corretta) · "2 November 2026" (EN: la preposizione è nel testo) */
export const fmtOn = ts => {
  const d = fmtDate(ts);
  if (locale() !== 'it-IT') return d;
  const day = new Date(ts).getDate();
  return ([8, 11, 18].includes(day) ? "l'" : 'il ') + d;
};
