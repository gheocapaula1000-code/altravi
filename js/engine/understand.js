// Comprensione della domanda: opzioni "A o B", luogo/persona, tempo indicato, vincoli (famiglia, budget, tempo, dubbi…).
// Tutto locale e deterministico. Lavora su IT+EN insieme: l'utente può scrivere in una lingua e usare l'app nell'altra.
import { CONTENT } from '../content/index.js';

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const DAY = 86400000;

/* ───────── opzioni "A o B" ───────── */
const LEAD = /^\s*(?:non so se|devo decidere se|devo scegliere (?:se|tra)|scegliere tra|decidere se|decidere tra|dovrei|devo|posso|potrei|vorrei|meglio|conviene|è meglio|e se|ma|allora|secondo te|dimmi se|se|tra|should i|do i|i should|i need to decide whether to|whether to|should we|shall i|between|or|and|but|so)\s+/i;
const CUT_LEFT = /\b(?:ma|però|perché|mentre|quindi|allora|se|but|because|while|so|then|whether)\s+(?!.*\b(?:ma|però|perché|mentre|quindi|allora|se|but|because|while|so|then|whether)\s+)/i;
const STOP_RIGHT = /\s+(?:anche se|ma|però|perché|visto che|dato che|considerando|sebbene|but|because|even if|although|given that|considering)\s+.*$/i;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function cleanOpt(s) {
  let x = (s || '').replace(/[?!.]+$/g, '').replace(/^[\s,;:–-]+|[\s,;:–-]+$/g, '').trim();
  for (let i = 0; i < 4; i++) { const y = x.replace(LEAD, ''); if (y === x) break; x = y; }
  return cap(x.trim());
}
const lastWords = (s, n) => s.trim().split(/\s+/).slice(-n).join(' ');
const firstWords = (s, n) => s.trim().split(/\s+/).slice(0, n).join(' ');

/** "A o B" -> {a, b}. Prende l'ULTIMO separatore valido, ignora le subordinate ("ma ho due figli e un mutuo"). */
export function parseOptions(text) {
  const t = (text || '').trim().replace(/\s+/g, ' ');
  const re = /\s+(?:oppure|ovvero|o invece|or|vs\.?|o|\/)\s+/gi;
  const hits = [...t.matchAll(re)];
  for (let k = hits.length - 1; k >= 0; k--) {
    const m = hits[k];
    let left = t.slice(0, m.index).replace(/,\s*$/, '');
    let right = t.slice(m.index + m[0].length);
    left = left.split(/[.?!:;]/).pop().trim();
    if (/,/.test(left) && left.length > 60) left = left.split(',').pop().trim();
    const cut = left.match(CUT_LEFT);
    if (cut) left = left.slice(cut.index + cut[0].length).trim();
    right = right.split(/[.?!:;,]/)[0].trim().replace(STOP_RIGHT, '');
    const dropTime = x => { const tf = findTimeframe(x); return tf ? x.replace(tf.label, ' ').replace(/\s+/g, ' ').trim() : x; };
    right = dropTime(right); left = dropTime(left);
    const a = cleanOpt(lastWords(left, 8)), b = cleanOpt(firstWords(right, 8));
    if (a.length >= 3 && b.length >= 3 && a.length <= 90 && b.length <= 90 && /\p{L}{2}/u.test(a) && /\p{L}{2}/u.test(b)) return { a, b };
  }
  return null;
}

/* ───────── luogo / persona ───────── */
const KNOWN_PLACES = ('milano roma torino napoli bologna firenze venezia padova verona genova palermo catania bari trieste trento bolzano cagliari perugia ancona pisa parma modena brescia bergamo como lecce '
  + 'londra parigi berlino madrid barcellona lisbona vienna amsterdam bruxelles zurigo ginevra monaco dublino edimburgo praga varsavia stoccolma copenaghen oslo helsinki atene '
  + 'new york los angeles san francisco toronto sydney tokyo dubai singapore canada svizzera germania francia spagna portogallo inghilterra olanda irlanda australia giappone stati uniti '
  + 'milan rome turin naples florence venice padua london paris berlin barcelona lisbon vienna zurich geneva munich dublin edinburgh prague warsaw stockholm copenhagen athens '
  + 'switzerland germany france spain portugal england netherlands ireland italy'
).split(/\s+/);
const NOT_NAMES = new Set(norm('gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre lunedi martedi mercoledi giovedi venerdi sabato domenica natale pasqua dio january february march april may june july august september october november december monday tuesday wednesday thursday friday saturday sunday christmas easter god io').split(/\s+/));
const NAME_RE = /(?:^|[\s,;(])(?:a|ad|in|per|da|verso|con|to|at|from|near|with|for)\s+([A-ZÀ-ÖØ-Þ][\p{L}'’]+(?:[ -][A-ZÀ-ÖØ-Þ][\p{L}'’]+)?)/gu;
const BANNED_NAME = /\b(fallimento|disastro|colpa|rischio|pericolo|failure|disaster|blame|risk|danger)\b/i;

export function findName(text) {
  const t = text || '';
  for (const m of t.matchAll(NAME_RE)) {
    const name = m[1].trim();
    if (NOT_NAMES.has(norm(name)) || BANNED_NAME.test(name)) continue;
    const prep = m[0].trim().split(/\s+/)[0].toLowerCase();
    return { name, prep, known: KNOWN_PLACES.includes(norm(name)), withPrep: /^(con|with)$/.test(prep) };
  }
  // città note scritte in minuscolo
  const n = ' ' + norm(t) + ' ';
  for (const p of KNOWN_PLACES) if (n.includes(' ' + p + ' ') || n.includes(' ' + p + '?') || n.includes(' ' + p + ',')) return { name: p.replace(/\b\p{L}/gu, c => c.toUpperCase()), prep: '', known: true, withPrep: false };
  return null;
}

/* ───────── tempo indicato ───────── */
const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const NUMW = { un: 1, uno: 1, una: 1, due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, sette: 7, otto: 8, dodici: 12, a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, twelve: 12 };
const UNIT_DAYS = u => /^(giorn|day)/i.test(u) ? 1 : /^(settiman|week)/i.test(u) ? 7 : /^(mes|month)/i.test(u) ? 30 : 365;

function monthTarget(idx, now, dayNum) {
  const d = new Date(now); const y = d.getFullYear();
  let t = new Date(y, idx + 1, 0, 12); // fine mese (o giorno indicato)
  if (dayNum) t = new Date(y, idx, dayNum, 12);
  if (t.getTime() < now) t = new Date(y + 1, idx + 1, 0, 12);
  return t.getTime();
}

export function findTimeframe(text, now = Date.now()) {
  const t = text || '';
  let m;
  const mon = MONTHS.join('|');
  if ((m = t.match(new RegExp(`\\b(?:entro|per|a|ad|in|by|before|until)\\s+(?:il\\s+|the\\s+)?(?:(\\d{1,2})\\s+(?:di\\s+)?)?(${mon})\\b`, 'i')))) {
    const idx = MONTHS.indexOf(m[2].toLowerCase()) % 12;
    const days = Math.max(1, Math.ceil((monthTarget(idx, now, m[1] ? parseInt(m[1], 10) : 0) - now) / DAY));
    return { label: m[0].trim(), days };
  }
  if ((m = t.match(/\b(?:tra|fra|entro|in|within|in the next|next)\s+(\d+|un|uno|una|due|tre|quattro|cinque|sei|sette|otto|dodici|a|an|one|two|three|four|five|six|twelve)\s+(giorn\w*|settiman\w*|mes[ei]|ann[oi]|days?|weeks?|months?|years?)\b/i))) {
    const n = /^\d+$/.test(m[1]) ? parseInt(m[1], 10) : (NUMW[m[1].toLowerCase()] || 1);
    return { label: m[0].trim(), days: Math.max(1, n * UNIT_DAYS(m[2])) };
  }
  if ((m = t.match(/\b(domani|tomorrow|stasera|tonight|oggi|today)\b/i))) return { label: m[0], days: 1 };
  if ((m = t.match(/\b(questa settimana|prossima settimana|this week|next week)\b/i))) return { label: m[0], days: 7 };
  if ((m = t.match(/\b(questo mese|prossimo mese|this month|next month)\b/i))) return { label: m[0], days: 30 };
  if ((m = t.match(/\b(quest'anno|quest’anno|entro l'anno|entro l’anno|a fine anno|this year|by the end of the year|end of the year|next year|anno prossimo|prossimo anno)\b/i))) return { label: m[0], days: /next|prossim/i.test(m[0]) ? 365 : 200 };
  return null;
}

export function nearestHorizon(days, horizons) {
  if (!days || days < 1 || days > 800) return null;
  let best = null, bd = Infinity;
  for (const h of horizons) { const d = Math.abs(Math.log(days / h.days)); if (d < bd) { bd = d; best = h.key; } }
  return best;
}

/* ───────── vincoli ───────── */
export function findFlags(text) {
  const out = new Set();
  for (const lang of Object.keys(CONTENT)) for (const [id, p] of Object.entries(CONTENT[lang].PERSONAL)) if (p.kw.test(text || '')) out.add(id);
  const order = CONTENT.it.FLAG_ORDER;
  return order.filter(f => out.has(f));
}

/** Tutto insieme (senza luogo/persona, che dipendono dalla categoria). */
export function understand(text, now = Date.now()) {
  return { options: parseOptions(text), name: findName(text), timeframe: findTimeframe(text, now), flags: findFlags(text) };
}
