// MOOD GUARD — valida l'output di QUALSIASI motore (locale, remoto, AI futuro), in italiano e in inglese.
// Un ForkSet che non passa NON viene mai mostrato: si ricade su un contenuto sicuro.
import { HORIZONS, allEvidence, content } from '../content/index.js';

export class GuardError extends Error {}

// Lessico che non deve comparire nei testi scritti dal motore (non nei titoli scritti dall'utente).
export const BANNED_IT = /\b(fallimento|fallire|fallirai|falliment\w*|disastr\w*|catastrof\w*|colpa|colpevol\w*|rimpiant\w*|pericol\w*|rischi\w*|sbagliat\w*|peggior\w*|terribil\w*|perdere tutto|rovin\w*|fiasco|drammatic\w*|tragic\w*|condanna\w*|disperaz\w*|inutile)\b/i;
export const BANNED_EN = /\b(fail|fails|failed|failing|failure|failures|disaster\w*|catastroph\w*|blame\w*|your fault|regret\w*|danger\w*|dangerous|risk|risks|risky|wrong|worst|terrible|lose everything|ruin\w*|fiasco|dramatic|tragic\w*|doomed|despair\w*|hopeless|useless)\b/i;
export const BANNED = new RegExp(`${BANNED_IT.source}|${BANNED_EN.source}`, 'i');
// Linguaggio deterministico vietato: mai promettere né predire.
// NB: \b non funziona dopo una lettera accentata ("accadrà"): si usano lookaround Unicode.
export const DETERMINISTIC_IT = /(?<![\p{L}])(accadr[àa]|succeder[àa]|sicuramente|di certo|garantit\w*|certamente|senza dubbio)(?![\p{L}])/iu;
export const DETERMINISTIC_EN = /\b(will definitely|will certainly|will surely|definitely|certainly|surely|guarantee[ds]?|guaranteed|without a doubt|for sure|is bound to|will always)\b/i;
export const DETERMINISTIC = new RegExp(`${DETERMINISTIC_IT.source}|${DETERMINISTIC_EN.source}`, 'iu');

const REQUIRED_HORIZONS = HORIZONS.map(h => h.key);
const DAILY_HORIZONS_KEYS = ['h1', 'sera', 'dom'];
const TIMER_RE = /\d+[\s-]?(?:minut\w*|min\b|ore\b|ora\b|h\b|hours?\b|hour\b|days?\b|giorn\w*)/gi;

function checkText(label, s, allowDeterministic = false) {
  if (typeof s !== 'string' || !s.trim()) throw new GuardError(`${label}: testo mancante`);
  if (BANNED.test(s)) throw new GuardError(`${label}: lessico non ammesso («${s.match(BANNED)[0]}»)`);
  if (!allowDeterministic && DETERMINISTIC.test(s)) throw new GuardError(`${label}: linguaggio deterministico («${s.match(DETERMINISTIC)[0]}»)`);
}

export function validateEvidenceMap(map) {
  for (const [id, e] of Object.entries(map)) {
    const hasNumber = /\d/.test((e.headline || '') + (e.stat || ''));
    if (hasNumber && !(e.source && e.url && e.year)) throw new GuardError(`evidenza ${id}: cifra senza fonte completa`);
    if (!e.limits) throw new GuardError(`evidenza ${id}: manca «cosa non dice»`);
    checkText(`evidenza ${id} headline`, e.headline);
    checkText(`evidenza ${id} means`, e.means);
    checkText(`evidenza ${id} limits`, e.limits, true); // «cosa non dice» può negare una garanzia
    if (e.echo) checkText(`evidenza ${id} echo`, e.echo);
  }
}

/** Il consiglio: stessi filtri; le cifre sono ammesse solo come timer («15 minuti»), mai come dati. */
export function validateAdvice(a) {
  if (!a) return;
  // Le parole scritte dall'utente (eco delle sue due opzioni) non sono testo del motore: si tolgono prima dei controlli.
  const strip = v => (a.echo || []).reduce((t, e) => (e ? t.split(e).join(' ') : t), String(v));
  for (const [k, v] of [['headline', a.headline], ['text', a.text], ['step', a.step], ['note', a.note]]) {
    checkText(`consiglio.${k}`, strip(v));
    if (/\d/.test(strip(v).replace(TIMER_RE, ''))) throw new GuardError(`consiglio.${k}: cifra non ammessa`);
  }
  if (!Array.isArray(a.why) || a.why.length < 2) throw new GuardError('consiglio: servono almeno 2 motivi');
  a.why.forEach((w, i) => { checkText(`consiglio.perche ${i + 1}`, w); if (/\d/.test(w.replace(TIMER_RE, ''))) throw new GuardError('consiglio.perche: cifra non ammessa'); });
}

/** Le note di personalizzazione (frasi-modello + eco di parole dell'utente) passano dagli stessi filtri. */
function validatePersonal(p) {
  if (!p) return;
  if (p.intro) checkText('personal.intro', p.intro);
  for (const [k, arr] of Object.entries(p.forkNotes || {})) arr.forEach((s, i) => checkText(`personal.fork ${k}.${i}`, s));
  for (const [k, arr] of Object.entries(p.horizonNotes || {})) arr.forEach((s, i) => checkText(`personal.horizon ${k}.${i}`, s));
}

/** @param {object} fs ForkSet @param {object} evidenceMap */
export function guard(fs, evidenceMap) {
  if (!fs || typeof fs !== 'object') throw new GuardError('ForkSet non valido');
  evidenceMap = evidenceMap || allEvidence(fs.lang);
  if (!Array.isArray(fs.forks) || fs.forks.length < 2) throw new GuardError('servono almeno 2 porte');
  const ids = new Set();
  const daily = fs.kind === 'daily';
  const needed = daily ? DAILY_HORIZONS_KEYS : REQUIRED_HORIZONS;
  for (const f of fs.forks) {
    if (ids.has(f.id)) throw new GuardError('id porta duplicato');
    ids.add(f.id);
    if (!f.title || typeof f.title !== 'string') throw new GuardError('porta senza titolo');
    checkText(`${f.id} tagline`, f.tagline);
    if (!Array.isArray(f.supports) || f.supports.length < 3) throw new GuardError(`${f.id}: servono 3 appigli («cosa serve a questa porta»)`);
    f.supports.forEach((s, i) => checkText(`${f.id} appiglio ${i + 1}`, s));
    // Le scelte di ogni giorno sono qualitative: nessuna evidenza, nessuna cifra (vedi il controllo sui numeri qui sotto).
    if (!daily && (!Array.isArray(f.evidence) || !f.evidence.length)) throw new GuardError(`${f.id}: nessuna evidenza collegata`);
    for (const id of f.evidence || []) if (!evidenceMap[id]) throw new GuardError(`${f.id}: evidenza sconosciuta ${id}`);
    for (const k of needed) {
      const h = f.horizons && f.horizons[k];
      if (!h) throw new GuardError(`${f.id}: manca orizzonte ${k}`);
      checkText(`${f.id}.${k}`, h.text);
      checkText(`${f.id}.${k} stato d'animo`, h.feel);
      // Qualsiasi cifra nel testo deve rimandare a una fonte collegata alla porta.
      if (daily && /\d/.test(h.text)) throw new GuardError(`${f.id}.${k}: cifra non ammessa in una scelta quotidiana`);
      if (/\d/.test(h.text)) {
        if (!h.ev || !f.evidence.includes(h.ev)) throw new GuardError(`${f.id}.${k}: cifra senza fonte collegata`);
        const e = evidenceMap[h.ev];
        if (!e.url || !e.source) throw new GuardError(`${f.id}.${k}: fonte incompleta`);
      }
    }
  }
  validatePersonal(fs.personal);
  validateAdvice(fs.advice);
  return fs;
}

/** Eccezione: porta di contenuto sicuro quando un motore fallisce. */
export function isSafeToShow(fs) { try { guard(fs); return true; } catch { return false; } }
