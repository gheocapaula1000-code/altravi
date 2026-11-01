// Link di condivisione: l'istantanea dell'incarico viaggia nel frammento dell'URL (#...), che il browser non invia ai server.
const b64 = bytes => { let s = ''; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64 = str => { const s = atob(str.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, c => c.charCodeAt(0)); };

async function pipe(bytes, stream) {
  const s = new Blob([bytes]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(s).arrayBuffer());
}
/** Oggetto → testo breve per l'URL. Prefisso z. = compresso, j. = semplice. */
export async function encode(obj) {
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if (typeof CompressionStream === 'function') {
    try { return 'z.' + b64(await pipe(raw, new CompressionStream('deflate-raw'))); } catch { /* ripiego */ }
  }
  return 'j.' + b64(raw);
}
export async function decode(str) {
  try {
    const kind = str.slice(0, 2), body = str.slice(2);
    let bytes = unb64(body);
    if (kind === 'z.') bytes = await pipe(bytes, new DecompressionStream('deflate-raw'));
    else if (kind !== 'j.') return null;
    const o = JSON.parse(new TextDecoder().decode(bytes));
    return o && typeof o === 'object' ? o : null;
  } catch { return null; }
}
export const baseUrl = () => new URL('./', location.href).href;
export async function linkFor(kind, obj) { return baseUrl() + '#/' + kind + '/' + (await encode(obj)); }

/** Condivide con il foglio di sistema se c'è, altrimenti copia negli appunti. Restituisce 'shared' | 'copied' | 'manual'. */
export async function shareOrCopy(url, title, text) {
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return 'shared'; } catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
  }
  try { await navigator.clipboard.writeText(url); return 'copied'; } catch { return 'manual'; }
}
