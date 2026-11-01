# Architettura e migrazione · Architecture & migration

## Struttura (sito statico, nessuna build)
```
/index.html            guscio dell'app (header, <main id="view">, tab, footer Pi.Gi Service)
/sw.js                 service worker (cache altravi-b2b-v1.0.0)
/manifest.webmanifest  name "Altravì", start_url "/", scope "/"
/404.html              rimanda a / (vecchi link profondi della app personale)
/privacy.html /termini.html /cookie.html   pagine legali B2B, IT/EN
/assets/css/b2b.css
/assets/js/            app.js (router #/…), views.js, store.js, model.js, share.js, plans.js,
                       emails.js, i18n.js + i18n2.js, demo.js, pwa.js (banner + PTR), ui.js, legal.js, lang-boot.js
/icons/                icon.svg, 192, 512, maskable
```
Hosting: GitHub Pages (repo `gheocapaula1000-code/altravi`, dominio altravi.com). Sorgenti e test: `altravi-team/` (`deploy.sh` copia nel repo di deploy).

## Dati
`localStorage`: `altravi.team.v1` (dati), `altravi.team.lang`, `altravi.team.big`, `altravi.team.cv` (stato vista cliente). Esportazione/cancellazione da Impostazioni. Nessuna chiamata di rete verso API: il sito **non chiama più Central Core** (`altravi/ask` dell'app personale non è più usata).

## Condivisione senza server
Istantanea JSON → deflate-raw → base64url nel frammento dell'URL: `#/c/z.<payload>` (cliente), `#/r/z.<payload>` (risposta del cliente al team, validata con un token per tappa). Il frammento non viene inviato ai server. Le valutazioni del team non sono incluse nel link cliente (verifica cieca).

## Service worker e aggiornamenti
Cache-first con aggiornamento in background. Il nuovo SW **aspetta**; il banner «Nuova versione disponibile» invia `SKIP_WAITING` con «Aggiorna»; una sola ricarica su `controllerchange`. Alla `activate` vengono **eliminate tutte** le cache diverse dalla corrente (anche `altravi-v4.*`). Il tira-per-aggiornare controlla se c'è un SW in attesa, altrimenti ridisegna la schermata; è disattivato nelle procedure guidate per non perdere ciò che si scrive.

## Migrazione dalla vecchia app personale (B2C v4.4.1)
- Tag git `b2c-v4.4.1` (commit 56d0703) = ultima versione della vecchia app; sorgenti anche in `/workspace/slidingdoors`.
- `./sw.js` resta allo stesso percorso: le installazioni esistenti ricevono il nuovo SW, la vecchia app mostra il suo banner «Nuova versione disponibile»; con «Aggiorna» passa ad Altravì B2B. Anche se si apre il sito prima di aggiornare, il vecchio SW serve il nuovo `index.html` e i file B2B (nomi nuovi sotto `/assets/`, nessuna collisione con `css/` e `js/` vecchi).
- Vecchie chiavi localStorage (`altravi.*` della app personale) **ignorate, non cancellate**; `altravi.lang` è letta come lingua iniziale.
- Test: `tests/e2e_migrate.py` (due percorsi), `e2e_sw.py`, `e2e_flow.py`, `e2e_layout.py`.
