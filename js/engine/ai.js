// Motore AI di RISERVA (facoltativo, mai predefinito). Chiama il Core tramite core-proxy: nessun segreto nel sito.
// Questo file è puro: nessun accesso allo stato. L'output dell'AI è DATO non fidato: schema rigido qui, poi Mood Guard (engine/guard.js).
import { AI } from '../config.js';
import { BANNED, DETERMINISTIC } from './guard.js';
import { DAILY } from '../content/daily-core.js';
import * as IT from '../content/daily-it.js';
import * as EN from '../content/daily-en.js';
import { contentLang } from '../i18n/index.js';
import { parseOptions } from './understand.js';

const TXT = { it: IT, en: EN };
const PREFIX = { it: 'Il mio consiglio: ', en: 'My advice: ' };
export const AI_NOTE = {
  it: "Questo consiglio è stato scritto da un'AI, solo perché me l'hai permesso. Può essere imperfetto: tu conosci cose che io non so.",
  en: 'This advice was written by an AI, only because you allowed it. It may be imperfect: you know things I do not.',
};
const TIMER_RE = /\d+[\s-]?(?:minut\w*|min\b|ore\b|ora\b|h\b|hours?\b|hour\b|days?\b|giorn\w*)/gi;
// Dati personali riconoscibili: se ci sono, il testo non esce mai dal telefono.
export const PII_RE = /[\w.+-]+@[\w-]+\.[\w.-]+|\bhttps?:\/\/|\bwww\.|(?:\+?\d[\s().-]*){8,}|\b[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]\b|\bIT\d{2}[A-Z0-9 ]{15,}\b/i;

export class AiError extends Error {}
const fail = m => { throw new AiError(m); };
const s = (v, min, max) => { if (typeof v !== 'string') return null; const t = v.replace(/\s+/g, ' ').trim(); return t.length >= min && t.length <= max ? t : null; };
const calm = t => !BANNED.test(t) && !DETERMINISTIC.test(t);

/** Schema rigido della risposta del Core (stessa forma validata lato server): rifiuta tutto ciò che non combacia. */
export function validateAiResult(r) {
  if (!r || typeof r !== 'object' || !r.paths || typeof r.paths !== 'object') fail('schema');
  const paths = {};
  for (const k of ['a', 'b', 'c']) {
    const p = r.paths[k]; if (!p || typeof p !== 'object') fail('path ' + k);
    const title = s(p.title, 1, 48), tagline = s(p.tagline, 1, 120);
    if (!title || !tagline) fail('title/tagline');
    if (!Array.isArray(p.moments) || p.moments.length !== 3 || !Array.isArray(p.feels) || p.feels.length !== 3 || !Array.isArray(p.needs) || p.needs.length !== 2) fail('conteggi');
    const moments = p.moments.map(x => s(x, 4, 170)), feels = p.feels.map(x => s(x, 2, 22)), needs = p.needs.map(x => s(x, 4, 150));
    if ([...moments, ...feels, ...needs].some(x => !x) || feels.some(x => /\s/.test(x))) fail('testi');
    for (const t of [title, tagline, ...moments, ...feels, ...needs]) { if (!calm(t)) fail('lessico'); }
    for (const t of [tagline, ...moments, ...feels, ...needs]) if (/\d/.test(t)) fail('cifre');
    paths[k] = { title, tagline, moments, feels, needs };
  }
  if (!Array.isArray(r.advice) || r.advice.length !== 3) fail('consigli');
  const advice = r.advice.map(a => {
    const headline = s(a && a.headline, 4, 190), step = s(a && a.step, 4, 190);
    const why = Array.isArray(a && a.why) && a.why.length === 2 ? a.why.map(x => s(x, 4, 150)) : null;
    if (!headline || !step || !why || why.some(x => !x)) fail('consiglio');
    for (const t of [headline, step, ...why]) { if (!calm(t)) fail('lessico consiglio'); if (/\d/.test(t.replace(TIMER_RE, ''))) fail('cifre consiglio'); }
    return { headline, why, step };
  });
  return { paths, advice };
}

/** Chiede il consiglio al Core (via core-proxy). Lancia AiError per qualsiasi problema: il chiamante ricade sul motore locale. */
export async function askAI(text, lang, { fetchImpl = (typeof fetch === 'function' ? fetch : null), timeoutMs = AI.timeoutMs } = {}) {
  if (!AI.enabled || !AI.endpoint || !fetchImpl) fail('AI non attiva');
  const ctl = typeof AbortController === 'function' ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), timeoutMs) : null;
  try {
    const res = await fetchImpl(AI.endpoint, {
      method: 'POST', mode: 'cors', credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: AI.route, payload: { text: String(text).trim(), lang: contentLang(lang) } }),
      signal: ctl ? ctl.signal : undefined,
    });
    if (!res.ok) fail('HTTP ' + res.status);
    let data; try { data = await res.json(); } catch { fail('risposta non JSON'); }
    if (!data || data.ok !== true || !data.data || !data.data.result) fail('risposta non valida');
    return validateAiResult(data.data.result);
  } catch (e) {
    if (e instanceof AiError) throw e;
    throw new AiError(e && e.name === 'AbortError' ? 'timeout' : 'rete');
  } finally { if (timer) clearTimeout(timer); }
}

const mkAdvice = (fs, v) => {
  const lang = fs.lang, a = fs.aiAdvices[((v % 3) + 3) % 3];
  return { kind: 'daily', id: 'ai', pick: 'a', variant: ((v % 3) + 3) % 3, count: 3, text: PREFIX[lang] + a.headline, headline: a.headline, why: a.why.slice(), step: a.step, note: AI_NOTE[lang], echo: [] };
};

/** ForkSet nello stesso formato del motore locale (3 strade, 3 momenti ciascuna). I titoli delle due opzioni scritti dall'utente hanno la precedenza. */
export function buildAiForkSet({ text, lang, result, id, createdAt }) {
  lang = contentLang(lang);
  const X = TXT[lang] || IT;
  const res = validateAiResult(result);
  const opts = parseOptions(text);
  const user = { a: opts && opts.a || null, b: opts && opts.b || null };
  const forks = ['a', 'b', 'c'].map((k, n) => {
    const p = res.paths[k], u = k === 'c' ? null : user[k];
    return {
      id: k, title: u || p.title, fromUser: !!u, tagline: p.tagline,
      supports: [p.needs[0], p.needs[1], (lang === 'it' ? 'Primo passo: ' : 'First step: ') + res.advice[n].step],
      horizons: Object.fromEntries(['h1', 'sera', 'dom'].map((hk, i) => [hk, { text: p.moments[i], feel: p.feels[i] }])),
      evidence: [], hidden: k === 'c', order: n, idea: 'ai',
    };
  });
  const fs = {
    id: id || 'fs_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    engine: 'ai', kind: 'daily', lang, createdAt: createdAt || Date.now(),
    question: (text || '').trim(), category: 'generico', categoryLabel: X.DAILY_TEXT.generico.label, color: DAILY.generico.color,
    parsed: !!(user.a && user.b), needsPro: false, ideaIds: null,
    ctx: { name: null, timeframe: null, flags: [] },
    personal: { chips: [], intro: null, forkNotes: { a: [], b: [], c: [] }, horizonNotes: { h1: [], sera: [], dom: [] }, mark: null },
    forks, echoes: [], aiAdvices: res.advice,
  };
  fs.advice = mkAdvice(fs, 0);
  return fs;
}

/** «Un altro consiglio» per un ForkSet scritto dall'AI: scorre i 3 consigli già ricevuti (nessuna nuova chiamata, nessun nuovo invio). */
export function nextAiAdvice(fs) {
  return { ...fs, advice: mkAdvice(fs, ((fs.advice && fs.advice.variant) || 0) + 1) };
}
