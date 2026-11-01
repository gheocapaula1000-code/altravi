// Registro dei motori (pluggable). Qualsiasi motore restituisce un ForkSet; il Mood Guard decide se è mostrabile.
import { localEngine, localizeForkSet, classifyText, detectCrisis, needsProfessional } from './local.js';
import { guard, GuardError } from './guard.js';
import { allEvidence } from '../content/index.js';
import { askAI, buildAiForkSet, PII_RE } from './ai.js';
import { AI } from '../config.js';
import { getLang, contentLang } from '../i18n/index.js';

const engines = new Map();
export function registerEngine(engine) { engines.set(engine.id, engine); }
export function listEngines() { return [...engines.keys()]; }

registerEngine(localEngine);
// Motore AI di RISERVA (facoltativo): chiama il Core tramite core-proxy. Mai predefinito; ogni errore → motore locale.
registerEngine({
  id: 'ai',
  label: 'Consiglio AI di riserva (facoltativo)',
  async generate({ text, lang, signal }) { return buildAiForkSet({ text, lang, result: await askAI(text, lang, { signal }) }); },
});

/** Il testo può essere offerto all'AI? Solo se: AI attiva, online, il motore locale non lo riconosce (ripiego «generico»), lunghezza ok, niente crisi / temi da professionista / dati personali. */
export function aiEligible(text, k = classifyText(text)) {
  if (!AI.enabled || !AI.endpoint) return false;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  const t = (text || '').trim();
  if (!(k && k.kind === 'daily' && k.id === 'generico')) return false;
  if (t.length < 8 || t.length > 240) return false;
  if (detectCrisis(t) || needsProfessional(t) || PII_RE.test(t)) return false;
  return true;
}

/** Genera con l'AI solo se richiesto E consentito; qualunque errore o output respinto dal Mood Guard → motore locale. */
export async function generateForksSmart(input, { useAI = false, signal } = {}) {
  if (useAI && aiEligible(input.text)) {
    try { return await generateForks({ ...input, signal }, { engine: 'ai' }); } catch (e) { console.warn('[AI] ricaduta sul motore locale:', e && e.message); }
  }
  return generateForks(input);
}

export async function generateForks(input, { engine = 'local', extraEvidence = {} } = {}) {
  const lang = contentLang(input.lang || getLang());
  const eng = engines.get(engine);
  if (!eng) throw new Error('motore sconosciuto: ' + engine);
  let raw;
  try { raw = await eng.generate({ ...input, lang }); } catch (e) {
    if (engine === 'local') throw e;
    console.warn('[engine] ' + engine + ' non disponibile, ricado sul motore locale:', e && e.message);
    return guard(await engines.get('local').generate({ ...input, lang }));
  }
  try {
    return guard(raw, { ...allEvidence(raw.lang || lang), ...extraEvidence });
  } catch (e) {
    if (!(e instanceof GuardError)) throw e;
    console.warn('[Mood Guard] output respinto:', e.message);
    if (engine !== 'local') {
      // Ricade sul motore locale, sempre sicuro.
      return guard(await engines.get('local').generate({ ...input, lang }));
    }
    throw e;
  }
}

/** Un ForkSet salvato, mostrato nella lingua corrente (e riconvalidato dal guard). */
export function forkSetFor(fs, lang = getLang()) {
  lang = contentLang(lang);
  try { return guard(localizeForkSet(fs, lang)); } catch (e) { console.warn('[Mood Guard] localizzazione respinta:', e.message); return fs; }
}

export { detectCrisis, needsProfessional, categorize, categorizeScore, classifyText, nextAdvice, parseOptions, buildForkSet, personalize, preview } from './local.js';
export { buildDailySet, bigAdvice, dailyHorizons, isDaily, DAILY_CATS, dailyLabel, dailyExample, dailyColor } from './advice.js';
export { understand } from './understand.js';
