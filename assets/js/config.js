// Indirizzo del servizio condiviso (Central Core · funzione «altravi-team»). Nessun segreto nel sito.
// Solo su localhost/127.0.0.1 si può puntare a un server di prova con localStorage['altravi.dev.api'] (usato dai test).
const PROD = 'https://jpunnzgixcghuydstdlt.supabase.co/functions/v1/altravi-team';
function pick() {
  try {
    const h = location.hostname;
    if (h === 'localhost' || h === '127.0.0.1') { const v = localStorage.getItem('altravi.dev.api'); if (v) return v; }
  } catch { /* ignore */ }
  return PROD;
}
export const API_URL = pick();
export const SYNC_EVERY = 45000;
