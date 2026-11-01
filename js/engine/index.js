// Registro dei motori (pluggable). Qualsiasi motore restituisce un ForkSet; il Mood Guard decide se è mostrabile.
import { localEngine, localizeForkSet } from './local.js';
import { guard, GuardError } from './guard.js';
import { allEvidence } from '../content/index.js';
import { getLang, contentLang } from '../i18n/index.js';

const engines = new Map();
export function registerEngine(engine) { engines.set(engine.id, engine); }
export function listEngines() { return [...engines.keys()]; }

registerEngine(localEngine);
// Esempio di motore remoto (non configurato nel prototipo): stessa interfaccia, stesso guard.
registerEngine({
  id: 'remote',
  label: 'Motore remoto (RAG su fonti verificate + LLM) — non attivo nel prototipo',
  async generate() { throw new Error('Motore remoto non configurato'); },
});

export async function generateForks(input, { engine = 'local', extraEvidence = {} } = {}) {
  const lang = contentLang(input.lang || getLang());
  const eng = engines.get(engine);
  if (!eng) throw new Error('motore sconosciuto: ' + engine);
  const raw = await eng.generate({ ...input, lang });
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

export { detectCrisis, needsProfessional, categorize, parseOptions, buildForkSet, personalize, preview } from './local.js';
export { understand } from './understand.js';
