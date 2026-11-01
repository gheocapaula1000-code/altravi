// Motore locale a template: contenuti curati + fonti verificate (js/content/{it,en}.js) + comprensione della domanda.
import { nextAiAdvice } from './ai.js';
import { CONTENT, content, HORIZONS } from '../content/index.js';
import { getLang, contentLang } from '../i18n/index.js';
import { CRISIS_EXTRA } from '../content/safety.js';
import { parseOptions, findName, findTimeframe, findFlags, nearestHorizon } from './understand.js';
import { classify, buildDailySet, bigAdvice, dailyLabel, DAILY_CATS } from './advice.js';

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export { parseOptions };

const anyRe = (key, text) => Object.values(CONTENT).some(c => c[key].some(r => r.test(text || '')));
export const detectCrisis = text => anyRe('CRISIS_PATTERNS', text) || CRISIS_EXTRA.some(r => r.test(text || ''));
export const needsProfessional = text => anyRe('PRO_PATTERNS', text);

/** Categoria: parole chiave di TUTTE le lingue (chi scrive in italiano può usare l'app in inglese e viceversa). */
export const categorize = text => categorizeScore(text).id;
export function categorizeScore(text) {
  const t = ' ' + norm(text) + ' ';
  let best = 'altro', bestScore = 0;
  for (const id of Object.keys(CONTENT.it.CATEGORIES)) {
    let score = 0;
    for (const lang of Object.keys(CONTENT)) for (const k of CONTENT[lang].CATEGORIES[id].keywords) if (t.includes(norm(k))) score += k.trim().length > 5 ? 2 : 1;
    if (score > bestScore) { best = id; bestScore = score; }
  }
  return { id: best, score: bestScore };
}

const stayScore = (option, cat) => {
  const t = norm(option);
  return Object.values(CONTENT).reduce((n, c) => n + c.CATEGORIES[cat].stayWords.reduce((m, w) => m + (t.includes(norm(w)) ? 1 : 0), 0), 0);
};

const fill = (s, name) => s.replace(/\{name\}/g, name);

/** Costruisce le note personali dal contesto (ctx = codici, indipendenti dalla lingua). */
export function personalize(ctx, catId, lang) {
  lang = contentLang(lang);
  const C = content(lang);
  const chips = [];
  const forkNotes = { a: [], b: [], c: [] };
  const horizonNotes = { d1: [], w1: [], m3: [], y1: [] };
  if (ctx.name) {
    chips.push({ kind: ctx.name.kind, text: ctx.name.name });
    const tpl = ctx.name.kind === 'person' ? C.PERSON_ROLES : C.PLACE_ROLES;
    for (const r of ['a', 'b', 'c']) forkNotes[r].push(fill(tpl[r], ctx.name.name));
  }
  if (ctx.timeframe) {
    chips.push({ kind: 'time', text: ctx.timeframe.label });
    if (ctx.timeframe.hz) horizonNotes[ctx.timeframe.hz].push(C.TIME_NOTE.replace('{label}', ctx.timeframe.label));
  }
  for (const f of ctx.flags) {
    const P = C.PERSONAL[f]; if (!P) continue;
    chips.push({ kind: 'flag', text: P.label });
    for (const r of ['a', 'b', 'c']) forkNotes[r].push(P.roles[r]);
    horizonNotes.d1.push(P.d1); horizonNotes.w1.push(P.w1);
  }
  for (const r of Object.keys(forkNotes)) forkNotes[r] = forkNotes[r].slice(0, 2);
  for (const k of Object.keys(horizonNotes)) horizonNotes[k] = horizonNotes[k].slice(0, 2);
  return {
    chips,
    intro: ctx.flags.includes('fear') ? C.FEAR_INTRO : null,
    forkNotes,
    horizonNotes,
    mark: ctx.timeframe && ctx.timeframe.hz ? ctx.timeframe.hz : null,
  };
}

/** Contesto (codici) a partire dal testo: luogo/persona, tempo, vincoli. */
export function buildContext(text, catId, now = Date.now()) {
  const nm = findName(text);
  let name = null;
  if (nm) {
    const personCat = CONTENT.it.PERSON_CATS.includes(catId);
    const kind = nm.known ? 'place' : (nm.withPrep || personCat) ? 'person' : 'place';
    // luoghi solo dove hanno senso; persone solo nelle relazioni
    if (kind === 'person' ? personCat : true) name = { name: nm.name, kind };
  }
  const tf = findTimeframe(text, now);
  return {
    name,
    timeframe: tf ? { ...tf, hz: nearestHorizon(tf.days, HORIZONS) } : null,
    flags: findFlags(text),
  };
}

let seq = 0;
/** Costruisce un ForkSet completo (sincrono). `titles` = {a,b} scelti dall'utente (null = default della lingua). */
export function buildForkSet({ text, category, lang = getLang(), ctx, titles, id, createdAt, now = Date.now(), adviceVariant = 0 }) {
  lang = contentLang(lang);
  const catId = category && CONTENT.it.CATEGORIES[category] ? category : categorize(text);
  const cat = content(lang).CATEGORIES[catId];
  const opts = titles ? null : parseOptions(text);
  let userA = null, userB = null;
  if (titles) { userA = titles.a || null; userB = titles.b || null; }
  else if (opts) {
    const s1 = stayScore(opts.a, catId), s2 = stayScore(opts.b, catId);
    if (s1 > s2) { userA = opts.b; userB = opts.a; } else { userA = opts.a; userB = opts.b; }
  }
  const context = ctx || buildContext(text, catId, now);
  const personal = personalize(context, catId, lang);
  const forks = ['a', 'b', 'c'].map((k, i) => {
    const f = cat.forks[k];
    const user = k === 'a' ? userA : k === 'b' ? userB : null;
    return {
      id: k,
      title: user || cat.defaults[k],
      fromUser: !!user,
      tagline: f.tagline,
      supports: f.supports.slice(),
      horizons: JSON.parse(JSON.stringify(f.horizons)),
      evidence: f.evidence.slice(),
      hidden: k === 'c',
      order: i,
    };
  });
  return {
    id: id || 'fs_' + Date.now().toString(36) + (seq++),
    engine: 'local',
    lang,
    createdAt: createdAt || Date.now(),
    question: (text || '').trim(),
    category: catId,
    categoryLabel: cat.label,
    color: cat.color,
    parsed: !!(userA && userB),
    needsPro: needsProfessional(text),
    ctx: context,
    personal,
    forks,
    echoes: cat.echoes.slice(),
    advice: bigAdvice({ cat: catId, text, options: userA && userB ? { a: userA, b: userB } : null, lang, variant: adviceVariant }),
  };
}

/** Rende un ForkSet salvato nella lingua richiesta (titoli dell'utente intatti, testi nella lingua dell'interfaccia). */
export function localizeForkSet(fs, lang = getLang()) {
  lang = contentLang(lang);
  if (!fs || (fs.lang === lang && fs.personal) || fs.engine !== 'local') return fs;
  const t = { a: null, b: null };
  for (const f of fs.forks) if (f.fromUser && (f.id === 'a' || f.id === 'b')) t[f.id] = f.title;
  const variant = fs.advice ? fs.advice.variant || 0 : 0;
  if (fs.kind === 'daily') return buildDailySet({ text: fs.question, category: fs.category, lang, titles: t, ideaIds: fs.ideaIds, variant, id: fs.id, createdAt: fs.createdAt });
  return buildForkSet({ text: fs.question, category: fs.category, lang, ctx: fs.ctx, titles: t, id: fs.id, createdAt: fs.createdAt, adviceVariant: variant });
}

/** Un altro consiglio per la stessa domanda (stesse porte): ricostruisce il ForkSet con la variante successiva. */
export function nextAdvice(fs) {
  if (fs.engine === 'ai') return nextAiAdvice(fs);
  const t = { a: null, b: null };
  for (const f of fs.forks) if (f.fromUser && (f.id === 'a' || f.id === 'b')) t[f.id] = f.title;
  const variant = ((fs.advice && fs.advice.variant) || 0) + 1;
  if (fs.kind === 'daily') return buildDailySet({ text: fs.question, category: fs.category, lang: fs.lang, titles: t, ideaIds: fs.ideaIds, variant, id: fs.id, createdAt: fs.createdAt });
  return buildForkSet({ text: fs.question, category: fs.category, lang: fs.lang, ctx: fs.ctx, titles: t, id: fs.id, createdAt: fs.createdAt, adviceVariant: variant });
}

const BIGHINT = /\bdopo (\d+|[a-z]+) anni\b|\bda (\d+|[a-z]+) anni\b|\bafter (\d+|[a-z]+) years\b|\bfor (\d+|[a-z]+) years\b|lasciar\w* (il|la|lo)? ?(mio|mia)? ?(fidanzat\w*|compagn\w*|marito|moglie|ragazz\w*)|break(ing)? up with|\bdivorz\w*|\bdivorc\w*|separarmi|dimettermi|licenziarmi|quit my job|resign\w*|\bmutuo\b|mortgage|compro (un|una|la|il)? ?(appartament\w*|casa)|buy(ing)? (a )?(house|apartment|home)|trasferirmi|relocat\w*|emigrar\w*/;
const LONG_RE = /\b(vita|futuro|carriera|anni|decenni|per sempre|life|lifetime|forever|future|career|years|decade|decades)\b/;

/** Quotidiana o grande? (categoria grande: id del motore a evidenze). */
const REL_LONG = /\b(tra|fra|entro|within|in) (un|\d+|due|tre|quattro|cinque|sei|pochi|a|two|three|four|five|six|a few) (anni|anno|mesi|years?|months?)\b|\b(next year|l anno prossimo|prossimi anni|next few years)\b/;
export function classifyText(text) {
  const big = categorizeScore(text);
  const k = classify(text, big.score);
  if (k.kind === 'daily' && BIGHINT.test(norm(text))) return { kind: 'big', id: big.id };
  if (k.kind === 'daily' && big.score > 0) { if (REL_LONG.test(norm(text))) return { kind: 'big', id: big.id }; }
  if (k.kind === 'daily') return k;
  // nulla combacia: una domanda di ogni giorno qualunque → consiglio «generico» che riusa le parole dell'utente.
  // Restano grandi solo le scelte che guardano lontano (mesi, anni, vita).
  if (big.id === 'altro' && big.score === 0) {
    const tf = findTimeframe(text);
    if (!(tf && tf.days > 14) && !LONG_RE.test(norm(text))) return { kind: 'daily', id: 'generico' };
  }
  return { kind: 'big', id: big.id };
}

/** Anteprima rapidissima per la schermata «pensa»: cosa ho colto dalla frase (nessuna generazione completa). */
export function preview(text, lang = getLang()) {
  lang = contentLang(lang);
  const k = classifyText(text);
  if (k.kind === 'daily') return { category: k.id, kind: 'daily', label: dailyLabel(k.id, lang), chips: [], options: parseOptions(text) };
  const catId = k.id;
  const ctx = buildContext(text, catId);
  const opts = parseOptions(text);
  return { category: catId, kind: 'big', label: content(lang).CATEGORIES[catId].label, chips: personalize(ctx, catId, lang).chips, options: opts };
}

export const localEngine = {
  id: 'local',
  label: 'Motore locale a template (evidenze curate)',
  async generate({ text, category, lang }) {
    const k = category ? (DAILY_CATS.includes(category) ? { kind: 'daily', id: category } : { kind: 'big', id: category }) : classifyText(text);
    return k.kind === 'daily' ? buildDailySet({ text, category: k.id, lang }) : buildForkSet({ text, category: k.id, lang });
  },
};
export { HORIZONS };
