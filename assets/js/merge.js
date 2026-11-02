// Unione a tre vie di un incarico (base = ultima versione sincronizzata, local = su questo dispositivo, remote = sul servizio).
// Regole: ogni lato conserva le proprie modifiche; se entrambi hanno cambiato lo stesso campo vince il locale;
// le voci aggiunte da uno dei due restano; una voce eliminata da un lato sparisce solo se l'altro non l'ha modificata.
export function stable(v) {
  if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}';
  return JSON.stringify(v === undefined ? null : v);
}
const same = (a, b) => stable(a) === stable(b);
const clone = v => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

function mergeObj(b, l, r) {
  if (same(l, b)) return clone(r);
  if (same(r, b)) return clone(l);
  const out = {};
  for (const k of new Set([...Object.keys(r), ...Object.keys(l)])) {
    const v = !same(l[k], b ? b[k] : undefined) ? l[k] : r[k];   // il campo cambiato qui vince; altrimenti quello del servizio
    if (v !== undefined) out[k] = clone(v);
  }
  return out;
}
function mergeById(b, l, r) {
  const bm = new Map((b || []).map(x => [x.id, x])), lm = new Map(l.map(x => [x.id, x])), rm = new Map(r.map(x => [x.id, x]));
  const out = [];
  for (const x of r) {
    const bi = bm.get(x.id), li = lm.get(x.id);
    if (li) out.push(bi ? mergeObj(bi, li, x) : mergeObj({}, li, x));
    else if (bi && same(bi, x)) continue;        // eliminata qui, non toccata di là: resta eliminata
    else out.push(clone(x));                      // aggiunta di là, oppure modificata di là: resta
  }
  for (const x of l) {
    if (rm.has(x.id)) continue;
    const bi = bm.get(x.id);
    if (bi && same(bi, x)) continue;              // eliminata di là, non toccata qui: resta eliminata
    out.push(clone(x));                           // aggiunta qui, oppure modificata qui: resta
  }
  return out;
}
const union = (l, r) => { const seen = new Set(), out = []; for (const x of [...r, ...l]) { const k = stable(x); if (!seen.has(k)) { seen.add(k); out.push(clone(x)); } } return out; };

/** Rende coerenti i riferimenti tra aspettative e tappe dopo l'unione. */
export function repair(doc) {
  const ids = new Set(doc.expectations.map(x => x.id)), ms = new Map(doc.milestones.map(m => [m.id, m]));
  for (const m of doc.milestones) {
    m.expIds = [...new Set(m.expIds.filter(i => ids.has(i)))];
    for (const side of ['team', 'client']) if (m[side] && m[side].ratings) for (const k of Object.keys(m[side].ratings)) if (!ids.has(k)) delete m[side].ratings[k];
  }
  for (const x of doc.expectations) {
    if (x.mid && !ms.has(x.mid)) x.mid = '';
    if (x.mid && !ms.get(x.mid).expIds.includes(x.id)) ms.get(x.mid).expIds.push(x.id);
  }
  return doc;
}

export function merge3(base, local, remote) {
  const b = base || { expectations: [], decisions: [], milestones: [], reviews: [], log: [] };
  const out = {};
  const LISTS = ['expectations', 'decisions', 'milestones'], UNIONS = ['reviews', 'log'];
  for (const k of new Set([...Object.keys(remote), ...Object.keys(local)])) {
    if (LISTS.includes(k)) out[k] = mergeById(b[k], local[k] || [], remote[k] || []);
    else if (UNIONS.includes(k)) out[k] = union(local[k] || [], remote[k] || []).sort((x, y) => (x.at || 0) - (y.at || 0));
    else if (!(k in remote)) out[k] = clone(local[k]);
    else if (!(k in local)) out[k] = clone(remote[k]);
    else out[k] = same(local[k], b[k]) ? clone(remote[k]) : clone(local[k]);
  }
  return repair(out);
}
