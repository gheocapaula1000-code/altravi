// Chiamate al servizio. Mai eccezioni: restituisce sempre { ok, status, code, ... }.
import { API_URL } from './config.js';

export async function call(a, body = {}, session = '') {
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch(API_URL, {
      method: 'POST', cache: 'no-store', signal: ctl.signal,
      headers: { 'content-type': 'application/json', ...(session ? { 'x-altravi-session': session } : {}) },
      body: JSON.stringify({ a, ...body }),
    });
    let j = null; try { j = await r.json(); } catch { /* corpo non JSON */ }
    if (j && j.ok) return { ...j, ok: true, status: r.status };
    // funzione non ancora pubblicata nel Core: risposta del gateway, non nostra
    const gw = r.status === 404 && (!j || (j.message && j.code === 'NOT_FOUND'));
    return { ...(j || {}), ok: false, status: r.status, code: gw ? 'NOT_DEPLOYED' : (j && j.code) || 'SERVER' };
  } catch {
    return { ok: false, status: 0, code: 'NETWORK' };
  } finally { clearTimeout(to); }
}
