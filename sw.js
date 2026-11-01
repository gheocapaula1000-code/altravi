// Service worker di Altravì (B2B), scope /. Stesso percorso del vecchio sw.js: le installazioni esistenti ricevono l'aggiornamento.
// Il nuovo worker aspetta il tocco su «Aggiorna» (SKIP_WAITING). All'attivazione cancella TUTTE le vecchie cache (anche altravi-v4.*).
const VERSION = 'altravi-b2b-v1.1.0';
const SHELL = [
  './', 'index.html', '404.html', 'privacy.html', 'termini.html', 'cookie.html', 'manifest.webmanifest',
  'assets/css/b2b.css', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'assets/js/app.js', 'assets/js/i18n.js', 'assets/js/i18n2.js', 'assets/js/i18n3.js', 'assets/js/store.js', 'assets/js/model.js', 'assets/js/demo.js', 'assets/js/share.js',
  'assets/js/ui.js', 'assets/js/views.js', 'assets/js/pwa.js', 'assets/js/plans.js', 'assets/js/emails.js', 'assets/js/lang-boot.js', 'assets/js/legal.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)));
  // niente skipWaiting automatico: la nuova versione aspetta il tocco su «Aggiorna»
});
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  const u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined));
      return hit || net;
    })
  );
});
