// Consigli: scelte di ogni giorno (porte brevi: tra 1 ora · stasera · domani mattina) e consiglio di metodo per qualsiasi scelta.
// Tutto locale, deterministico, qualitativo: nessuna statistica inventata. Il Mood Guard controlla ogni testo (engine/guard.js).
import { DAILY, DAILY_ORDER, norm } from '../content/daily-core.js';
import * as IT from '../content/daily-it.js';
import * as EN from '../content/daily-en.js';
import { contentLang } from '../i18n/index.js';
import { parseOptions, topicOf } from './understand.js';

const TXT = { it: IT, en: EN };
const T = lang => TXT[contentLang(lang)] || IT;
export const DAILY_KEYS = ['h1', 'sera', 'dom'];
const HOUR = 3600000, DAY = 86400000;

/** Orizzonti brevi relativi al momento della scelta: tra 1 ora · stasera · domani mattina. days = frazione di giorno. */
export function dailyHorizons(at = Date.now()) {
  const eve = new Date(at); eve.setHours(20, 0, 0, 0);
  const sera = Math.max(2 * HOUR, eve.getTime() - at);
  const t = at + 6 * HOUR; const n8 = new Date(t); n8.setHours(8, 0, 0, 0);
  if (n8.getTime() <= t) n8.setDate(n8.getDate() + 1);
  let dom = n8.getTime() - at; if (dom <= sera + HOUR) dom = sera + 10 * HOUR;
  return [{ key: 'h1', days: HOUR / DAY }, { key: 'sera', days: sera / DAY }, { key: 'dom', days: dom / DAY }];
}
export const isDaily = fs => !!fs && fs.kind === 'daily';
export const hzList = (fs, at) => (isDaily(fs) ? dailyHorizons(at) : null);
export const dailySign = (key, lang) => T(lang).DAILY_SIGNS[key];
export const hzLabel = (key, kind, lang) => { const L = T(lang).HZ_LABELS[key]; return L ? L[kind === 'short' ? 1 : kind === 'long' ? 2 : 0] : null; };
export const checkinText = lang => T(lang).CHECKIN;
export const dailyLabel = (cat, lang) => T(lang).DAILY_TEXT[cat].label;
export const dailyExample = (cat, lang) => T(lang).DAILY_TEXT[cat].example;
export const DAILY_CATS = DAILY_ORDER;
export const dailyColor = cat => DAILY[cat].color;

/** Punteggio di una categoria quotidiana: numero di indizi diversi trovati ×2 (0 se esclusa). */
// "prima di cena", "dopo pranzo"…: il pasto qui è solo un riferimento di tempo, non l'argomento
const NOISE = /\b(?:prima|dopo|durante)\s+(?:di\s+|della\s+|del\s+|la\s+|il\s+)?(?:cena|pranzo)\b|\b(?:before|after|during|until)\s+(?:the\s+)?(?:dinner|lunch)\b|\bwait\s+for\s+dinner\b|\baspett\w*\s+(?:la\s+)?(?:cena|pranzo)\b/g;

export function dailyScore(cat, text) {
  const d = DAILY[cat], t = cat === 'cena' ? norm(text).replace(NOISE, ' ') : norm(text);
  if (d.not && d.not.test(t)) return 0;
  const m = t.match(d.re); if (!m) return 0;
  return new Set(m).size * 2 + (d.prio || 0);
}

/** Quotidiana o grande? Vince la quotidiana se i suoi indizi pesano almeno quanto quelli della categoria grande. */
export function classify(text, bigScore = 0) {
  let best = null, bs = 0;
  for (const c of DAILY_ORDER) { const s = dailyScore(c, text); if (s > bs) { best = c; bs = s; } }
  if (best && bs >= bigScore) return { kind: 'daily', id: best };
  return { kind: 'big', id: null };
}

const ideaScore = (def, t) => (def.re ? (def.re.test(t) ? def.w : 0) : def.w);
const optScore = (def, o) => (def.opt && def.opt.test(norm(o)) ? 1 + (def.re && def.re.test(norm(o)) ? def.w : 0) : 0);

function rank(cat, text) {
  const t = norm(text);
  return Object.entries(DAILY[cat].ideas).map(([id, def], i) => ({ id, score: ideaScore(def, t), i })).sort((a, b) => b.score - a.score || a.i - b.i);
}

const PREFIX = { it: 'Il mio consiglio: ', en: 'My advice: ' };
const cap1 = s => s;

/** Costruisce un ForkSet "quotidiano": 2 porte (+ la terza: la via di mezzo), il consiglio e scene brevi. */
export function buildDailySet({ text, category, lang, titles, variant = 0, ideaIds, id, createdAt, now = Date.now() }) {
  lang = contentLang(lang);
  const X = T(lang), cat = category;
  const ranked = rank(cat, text);
  const opts = ideaIds || titles ? null : parseOptions(text);
  let ids = ideaIds ? { ...ideaIds } : null;
  const user = { a: titles ? titles.a || null : null, b: titles ? titles.b || null : null };
  if (!ids) {
    ids = {};
    const used = new Set();
    // 1) ogni opzione scritta dall'utente prende l'idea che la descrive meglio (indizi "opt"); 2) le altre si riempiono per pertinenza.
    const best = o => { let b = null, bs = 0; if (o) for (const [iid, def] of Object.entries(DAILY[cat].ideas)) { if (used.has(iid)) continue; const s = optScore(def, o); if (s > bs) { b = iid; bs = s; } } return b; };
    if (opts) { user.a = opts.a; user.b = opts.b; }
    ids.a = best(opts && opts.a); if (ids.a) used.add(ids.a);
    ids.b = best(opts && opts.b); if (ids.b) used.add(ids.b);
    const fill = () => { const n = ranked.map(r => r.id).find(x => !used.has(x)); used.add(n); return n; };
    if (!ids.a) ids.a = fill();
    if (!ids.b) ids.b = fill();
    ids.c = fill();
  }
  // ripiego «generico»: riusa le parole dell'utente solo nel consiglio (il Mood Guard le ignora come eco); nelle carte compare un testo neutro
  const topic = cat === 'generico' ? (topicOf(text) || (lang === 'it' ? 'questa scelta' : 'this choice')) : null;
  const neutral = s => (topic ? s.replace(/«\{q\}»|"\{q\}"/g, lang === 'it' ? 'questa scelta' : 'this choice') : s);
  const withQ = s => (topic ? s.replace(/\{q\}/g, topic) : s);
  const mkFork = k => {
    const iid = ids[k], base = X.DAILY_TEXT[cat].ideas[iid], sc = X.SCENES[cat + '.' + iid];
    const u = k === 'c' ? null : user[k];
    return {
      id: k, title: u || base.title, fromUser: !!u, tagline: sc[0],
      supports: [base.why[0], base.why[1], (lang === 'it' ? 'Primo passo: ' : 'First step: ') + neutral(base.step)],
      horizons: Object.fromEntries(DAILY_KEYS.map((hk, n) => [hk, { text: sc[1][n], feel: sc[2][n] }])),
      evidence: [], hidden: k === 'c', order: ['a', 'b', 'c'].indexOf(k), idea: iid,
    };
  };
  const forks = ['a', 'b', 'c'].map(mkFork);
  // consiglio: tra le tre porte, in ordine di pertinenza; "un altro consiglio" scorre la lista
  const sc = rank(cat, text); const sOf = iid => (sc.find(r => r.id === iid) || { score: 0 }).score;
  const order = ['a', 'b', 'c'].sort((x, y) => sOf(ids[y]) - sOf(ids[x]) || (x === 'c') - (y === 'c') || x.localeCompare(y));
  const v = ((variant % 3) + 3) % 3, pickK = order[v], pickIdea = X.DAILY_TEXT[cat].ideas[ids[pickK]];
  const advice = {
    kind: 'daily', id: ids[pickK], pick: pickK, variant: v, count: 3,
    text: PREFIX[lang] + withQ(pickIdea.headline), headline: withQ(pickIdea.headline), why: pickIdea.why.slice(), step: withQ(pickIdea.step), note: X.UI_NOTES.daily,
    echo: topic ? [topic] : [],
  };
  const label = X.DAILY_TEXT[cat].label;
  return {
    id: id || 'fs_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    engine: 'local', kind: 'daily', lang, createdAt: createdAt || Date.now(),
    question: (text || '').trim(), category: cat, categoryLabel: label, color: DAILY[cat].color,
    parsed: !!(user.a && user.b), needsPro: false, ideaIds: ids,
    ctx: { name: null, timeframe: null, flags: [] },
    personal: { chips: [], intro: null, forkNotes: { a: [], b: [], c: [] }, horizonNotes: { h1: [], sera: [], dom: [] }, mark: null },
    forks, echoes: [], advice,
  };
}

/** Consiglio per le scelte grandi (o qualsiasi altra): su misura per categoria, poi metodi universali. */
export function bigAdvice({ cat, text, options, lang, variant = 0 }) {
  lang = contentLang(lang);
  const X = T(lang);
  const t = norm(text);
  const agitated = /stanc\w*|notte|ansia|agitat\w*|paura|stress\w*|tired|night|anxi\w*|scared|afraid|worr\w*/.test(t);
  const methodOrder = agitated ? ['sonno', 'persona', 'reversibile', 'moneta'] : ['reversibile', 'persona', 'sonno', 'moneta'];
  const seq = X.BIG_ADVICE[cat] ? ['tailored', ...methodOrder] : methodOrder;
  const v = ((variant % seq.length) + seq.length) % seq.length, key = seq[v];
  const fillOpt = s => (options ? s.replace(/\{a\}/g, options.a).replace(/\{b\}/g, options.b) : s);
  let src, id;
  if (key === 'tailored') { src = X.BIG_ADVICE[cat]; id = cat; } else { src = X.METHODS[key]; id = key; }
  const step = key === 'reversibile' && !options ? src.stepSolo : fillOpt(src.step);
  return {
    kind: key === 'tailored' ? 'big' : 'general', id, variant: v, count: seq.length,
    echo: options && /\{[ab]\}/.test(src.step || '') ? [options.a, options.b] : [], text: PREFIX[lang] + src.headline, headline: src.headline, why: src.why.slice(), step, note: key === 'tailored' ? X.UI_NOTES.big : X.UI_NOTES.general,
  };
}

/** Regole del Mood Guard per il consiglio: lessico, determinismo e cifre ammesse solo come timer ("15 minuti"). */
export const TIMER_RE = /\d+[\s-]?(?:minut\w*|min\b|ore\b|ora\b|h\b|hours?\b|hour\b|days?\b|giorn\w*)/gi;
