// PWA: registrazione del service worker, banner «Nuova versione», tira-per-aggiornare.
// Nessun dato lascia il telefono: qui si parla solo con il service worker di questo sito.
import { t, onLang } from './i18n/index.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const THRESHOLD = 70;       // px di trascinamento (dopo la resistenza) per attivare
const RESIST = 0.5;         // il dito fa il doppio del cammino dell'indicatore
const CHECK_EVERY = 30 * 60 * 1000;

let reg = null;
let wantReload = false;     // ricarica solo se l'utente ha chiesto di aggiornare
let reloaded = false;
let banner = null;

function el(tag, attrs = {}, kids = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  kids.forEach(k => n.append(k));
  return n;
}

/* ───────── banner nuova versione ───────── */
function paintBanner() {
  if (!banner) return;
  banner.querySelector('strong').textContent = t('upd.msg');
  banner.querySelector('.upd-hint').textContent = t('upd.hint');
  banner.querySelector('button').textContent = t('upd.btn');
}
function showBanner() {
  if (banner) { banner.hidden = false; return; }
  const btn = el('button', { type: 'button', class: 'btn primary' });
  btn.addEventListener('click', applyUpdate);
  banner = el('div', { class: 'upd', role: 'status', 'aria-live': 'polite' }, [
    el('div', { class: 'upd-t' }, [el('strong'), el('span', { class: 'upd-hint' })]), btn,
  ]);
  document.body.append(banner);
  paintBanner();
}
function applyUpdate() {
  const w = reg && reg.waiting;
  if (!w) { location.reload(); return; }
  wantReload = true;
  const b = banner && banner.querySelector('button');
  if (b) b.disabled = true;
  w.postMessage({ type: 'SKIP_WAITING' });
}
function trackInstalling(worker) {
  if (!worker) return;
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed' && navigator.serviceWorker.controller) showBanner();
  });
}
async function checkUpdate() {
  if (!reg) return;
  try { await reg.update(); } catch { /* offline: riproveremo */ }
}

/* ───────── tira per aggiornare ───────── */
function initPTR() {
  if (!('ontouchstart' in window) && !(navigator.maxTouchPoints > 0)) return;
  const ind = el('div', { class: 'ptr', role: 'status', 'aria-live': 'polite' });
  const arrow = document.createElementNS(SVG_NS, 'svg');
  arrow.setAttribute('viewBox', '0 0 24 24'); arrow.setAttribute('fill', 'none'); arrow.setAttribute('stroke', 'currentColor');
  arrow.setAttribute('stroke-width', '2.2'); arrow.setAttribute('stroke-linecap', 'round'); arrow.setAttribute('stroke-linejoin', 'round'); arrow.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path'); path.setAttribute('d', 'M12 5v14M6 13l6 6 6-6');
  arrow.append(path);
  const label = el('span');
  ind.append(arrow, label);
  document.body.append(ind);

  let startY = 0, startX = 0, pulling = false, tracking = false, busy = false, dist = 0;

  const blocked = target => {
    if (document.querySelector('.reveal, .burst')) return true;
    for (let n = target; n && n !== document.body && n.nodeType === 1; n = n.parentElement) {
      const tag = n.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || n.isContentEditable) return true;
      const oy = getComputedStyle(n).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight) return true; // contenitore scorrevole interno
    }
    return false;
  };
  const atTop = () => (window.scrollY || document.documentElement.scrollTop || 0) <= 0;
  const paint = d => {
    const ready = d >= THRESHOLD;
    ind.style.opacity = String(Math.min(1, d / (THRESHOLD * 0.7)));
    ind.style.transform = 'translate(-50%,' + (Math.min(d, THRESHOLD * 1.6) - 56) + 'px)';
    ind.classList.toggle('ready', ready);
    label.textContent = ready ? t('ptr.release') : t('ptr.pull');
  };
  const reset = () => {
    ind.classList.add('snap'); ind.classList.remove('ready', 'busy');
    ind.style.opacity = '0'; ind.style.transform = 'translate(-50%,-4rem)';
    pulling = false; tracking = false; dist = 0;
  };

  document.addEventListener('touchstart', e => {
    if (busy || e.touches.length !== 1 || !atTop() || blocked(e.target)) { tracking = false; return; }
    startY = e.touches[0].clientY; startX = e.touches[0].clientX; tracking = true; pulling = false; dist = 0;
    ind.classList.remove('snap');
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!tracking || busy) return;
    const dy = e.touches[0].clientY - startY, dx = e.touches[0].clientX - startX;
    if (!pulling) {
      if (dy < 0 || Math.abs(dx) > Math.abs(dy) || !atTop()) { if (dy < 0 || !atTop()) tracking = false; return; }
      if (dy < 8) return;             // piccola zona morta: non scambiare un tocco per un gesto
      pulling = true;
    }
    if (!atTop() && dy <= 0) { reset(); return; }
    dist = Math.max(0, dy) * RESIST;
    if (e.cancelable) e.preventDefault();
    paint(dist);
  }, { passive: false });

  const end = async () => {
    if (!tracking) return;
    const go = pulling && dist >= THRESHOLD;
    if (!go) { reset(); return; }
    busy = true; tracking = false;
    ind.classList.add('snap', 'busy'); ind.classList.remove('ready');
    ind.style.opacity = '1'; ind.style.transform = 'translate(-50%,.4rem)';
    label.textContent = t('ptr.loading');
    await Promise.race([checkUpdate(), new Promise(r => setTimeout(r, 3000))]);
    if (reg && reg.waiting) { wantReload = true; reg.waiting.postMessage({ type: 'SKIP_WAITING' }); setTimeout(() => location.reload(), 1500); return; }
    location.reload();
  };
  document.addEventListener('touchend', end, { passive: true });
  document.addEventListener('touchcancel', () => { if (!busy) reset(); }, { passive: true });
}

export function initPWA() {
  onLang(paintBanner);
  initPTR();
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  const sw = navigator.serviceWorker;
  sw.addEventListener('controllerchange', () => {
    if (!wantReload || reloaded) return;   // prima installazione o cambio non richiesto: nessuna ricarica
    reloaded = true; location.reload();
  });
  sw.register('./sw.js').then(r => {
    reg = r;
    if (r.waiting && sw.controller) showBanner();
    trackInstalling(r.installing);
    r.addEventListener('updatefound', () => trackInstalling(r.installing));
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkUpdate(); });
    setInterval(checkUpdate, CHECK_EVERY);
  }).catch(() => {});
}
