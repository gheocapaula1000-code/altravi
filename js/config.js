// Configurazione pubblica (nessun segreto qui: il sito è statico e visibile a tutti).
// Consiglio AI di RISERVA: acceso (Core pubblicato). Per spegnerlo basta enabled: false. Il motore locale resta sempre predefinito.
// Si usa SOLO se: il motore locale non riconosce la domanda · l'utente ha acconsentito · il testo non è una crisi,
// un tema da professionista o un dato personale. In caso di qualunque errore si ricade sul motore locale.
export const AI = {
  enabled: true,
  endpoint: 'https://jpunnzgixcghuydstdlt.supabase.co/functions/v1/core-proxy',
  route: 'altravi/ask',
  timeoutMs: 15000,
};
