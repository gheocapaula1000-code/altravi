// Registro dei contenuti per lingua + dati neutri rispetto alla lingua.
import * as it from './it.js';
import * as en from './en.js';
import { getLang, contentLang } from '../i18n/index.js';

export const CONTENT = { it, en };
export const content = (lang = getLang()) => CONTENT[contentLang(lang)] || CONTENT.it;

// Orizzonti: chiave e giorni sono uguali in ogni lingua (le etichette sono in i18n: hz.<key>*).
export const HORIZONS = [
  { key: 'd1', days: 1 },
  { key: 'w1', days: 7 },
  { key: 'm3', days: 90 },
  { key: 'y1', days: 365 },
];
export const evidence = (id, lang = getLang()) => content(lang).EVIDENCE[id];
export const allEvidence = (lang = getLang()) => content(lang).EVIDENCE;

/** A quale zona appartiene una fonte (neutro rispetto alla lingua). */
const SCOPE_REGION = { Italy: 'IT', Italia: 'IT', 'European Union': 'EU', 'Unione europea': 'EU', 'United Kingdom': 'GB', 'Regno Unito': 'GB', USA: 'US', 'Stati Uniti': 'US' };
export const scopeRegion = ev => SCOPE_REGION[ev && ev.scope] || 'WORLD';
const ORDER = { IT: ['IT', 'EU', 'WORLD', 'GB', 'US'], EU: ['EU', 'IT', 'WORLD', 'GB', 'US'], GB: ['GB', 'WORLD', 'EU', 'IT', 'US'], US: ['US', 'WORLD', 'GB', 'EU', 'IT'], WORLD: ['WORLD', 'EU', 'GB', 'US', 'IT'] };
/** Ordina gli id delle evidenze: prima quelle più vicine alla zona dell'utente (poi studi internazionali). Nessuna viene nascosta. */
export function rankEvidence(ids, region, lang) {
  const ord = ORDER[region] || ORDER.WORLD;
  const rank = id => { const r = ord.indexOf(scopeRegion(evidence(id, lang))); return r < 0 ? 9 : r; };
  return [...ids].sort((a, b) => rank(a) - rank(b));
}
