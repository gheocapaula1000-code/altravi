// Service worker: shell offline (cache-first) con aggiornamento in background.
const VERSION = 'altravi-v4.0.0';
const SHELL = [
  './', 'index.html', 'privacy.html', 'termini.html', 'cookie.html', 'manifest.webmanifest',
  'css/app.css', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'js/app.js', 'js/store.js', 'js/signals.js', 'js/ui.js', 'js/lang-boot.js', 'js/legal.js',
  'js/i18n/index.js', 'js/i18n/it.js', 'js/i18n/en.js', 'js/content/safety.js', 'js/content/daily-core.js', 'js/content/daily-it.js', 'js/content/daily-en.js', 'js/content/more-core.js', 'js/content/more-it.js', 'js/content/more-en.js', 'js/engine/advice.js',
  'js/content/index.js', 'js/content/it.js', 'js/content/en.js', 'js/engine/understand.js', 'js/engine/index.js', 'js/engine/local.js', 'js/engine/guard.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
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
