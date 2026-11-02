// Altravì: router a frammento (#/...), intestazione, barra sezioni, piè di pagina.
import { t, getLang, setLang, onLang, tx } from './i18n.js';
import * as S from './store.js';
import * as V from './views.js';
import * as A from './views-account.js';
import * as Cloud from './cloud.js';
import { decode } from './share.js';
import { initPWA, setSoftRefresh } from './pwa.js';
import { icon, toast, html, undoBar, hideUndo } from './ui.js';

const main = document.getElementById('view');
const tabsEl = document.getElementById('tabs');
let token = 0, lastName = '';

const go = p => { const h = '#' + p; if (location.hash === h) render(); else location.hash = h; };
// «replace»: sostituisce la voce della cronologia (usato dopo l'accesso, così «indietro» non rimanda al link monouso)
const replace = p => { history.replaceState(null, '', '#' + p); render(); };
V.env.go = go; V.env.replace = replace; V.env.rerender = () => render(true);
S.setAccessProvider(Cloud.access);

function parse() {
  const raw = location.hash.slice(1) || '/';
  const [path, qs] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs || ''));
  return { path, query };
}
const N = x => Math.max(1, parseInt(x, 10) || 1);

const WRITE = [/^\/nuovo\//, /^\/i\/(?!demo\/)[\w-]+\/(attesa|decisione|tappa|modifica|elimina)\//, /^\/i\/(?!demo\/)[\w-]+\/m\/[\w-]+\/v\//];
async function resolve({ path, query }) {
  let m;
  if (Cloud.signedIn() && S.readOnly() && WRITE.some(r => r.test(path))) return { redirect: '/in-pausa' };
  if (!Cloud.signedIn() && /^\/nuovo\//.test(path)) return { redirect: '/prova' };
  if (path === '/') return V.landing();
  if (path === '/demo') { S.seedDemo(); return { redirect: '/i/demo' }; }
  if (path === '/progetti') return V.projects();
  if (path === '/prezzi') return V.pricing();
  if (path === '/prova') return A.emailStep('try', '');
  if ((m = path.match(/^\/prova\/(start|team|studio)$/))) return A.emailStep('try', m[1]);
  if (path === '/accedi') return A.emailStep('in', '');
  if (path === '/codice') return A.codeStep();
  if ((m = path.match(/^\/entra\/([\w-]+)$/))) return A.enter(m[1]);
  if (path === '/benvenuto') return A.welcome();
  if (path === '/importa') return A.importJobs();
  if (path === '/abbonamento') return A.subscription();
  if (path === '/abbonamento/ok') return A.payOk();
  if (path === '/abbonamento/annullato') return A.payCancel();
  if ((m = path.match(/^\/abbonamento\/conferma\/(\w+)\/(\w+)$/))) return A.confirm(m[1], m[2]);
  if (path === '/in-pausa') return A.paused();
  if (path === '/clienti-piano') return A.clientsLocked();
  if (path === '/invita') return A.invitePerson();
  if ((m = path.match(/^\/v\/([\w-]+)$/))) return A.clientEntry(m[1]);
  if (path === '/impostazioni') return V.settings();
  if (path === '/email') return V.emails();
  if (path === '/nota') return V.nota();
  if ((m = path.match(/^\/nuovo\/(\d+)$/))) return V.newEngagement(N(m[1]));
  if ((m = path.match(/^\/persona\/(\d+)$/))) return V.newPerson(N(m[1]));
  if ((m = path.match(/^\/i\/([\w-]+)$/))) return V.summary(m[1]);
  if ((m = path.match(/^\/i\/([\w-]+)\/attese$/))) return V.expectations(m[1]);
  if ((m = path.match(/^\/i\/([\w-]+)\/scelte$/))) return V.decisions(m[1]);
  if ((m = path.match(/^\/i\/([\w-]+)\/storia$/))) return V.history(m[1]);
  if ((m = path.match(/^\/i\/([\w-]+)\/attesa\/(\d+)(?:\/(team|client))?$/))) return V.newExpectation(m[1], N(m[2]), m[3]);
  if ((m = path.match(/^\/i\/([\w-]+)\/decisione\/(\d+)$/))) return V.newDecision(m[1], N(m[2]), query);
  if ((m = path.match(/^\/i\/([\w-]+)\/tappa\/(\d+)$/))) return V.newMilestone(m[1], N(m[2]));
  if ((m = path.match(/^\/i\/([\w-]+)\/modifica\/attesa\/([\w-]+)$/))) return V.editExpectation(m[1], m[2]);
  if ((m = path.match(/^\/i\/([\w-]+)\/modifica\/decisione\/([\w-]+)$/))) return V.editDecision(m[1], m[2]);
  if ((m = path.match(/^\/i\/([\w-]+)\/elimina\/(attesa|decisione)\/([\w-]+)$/))) return V.confirmDelete(m[2], m[1], m[3]);
  if ((m = path.match(/^\/i\/([\w-]+)\/m\/([\w-]+)$/))) return V.milestone(m[1], m[2]);
  if ((m = path.match(/^\/i\/([\w-]+)\/m\/([\w-]+)\/v\/(\d+)$/))) return V.teamCheckin(m[1], m[2], N(m[3]));
  // vista cliente
  if ((m = path.match(/^\/c\/(.+)$/))) {
    const sn = await decode(m[1]);
    if (!sn || sn.v !== 1 || !Array.isArray(sn.x) || typeof sn.e !== 'string') return { name: 'bad', client: true, html: html`<h1>${t('cl.empty')}</h1><div class="actions"><a class="btn primary" href="#/">${t('err.home')}</a></div>` };
    const old = S.loadCV();
    const same = old && old.snap.e === sn.e && old.snap.m === sn.m && old.snap.k === sn.k;
    S.saveCV(same ? { ...old, snap: sn } : { snap: sn, answers: {}, by: '', note: '', done: false });
    try { if (!localStorage.getItem('altravi.team.lang') && (sn.l === 'it' || sn.l === 'en') && sn.l !== getLang()) setLang(sn.l, false); } catch { /* ignore */ }
    return { redirect: '/cliente' };
  }
  if (path === '/cliente') return V.clientWelcome();
  if (path === '/cliente/chi') return V.clientWho();
  if (path === '/cliente/fine') return V.clientDone();
  if ((m = path.match(/^\/cliente\/(\d+)$/))) return V.clientStep(N(m[1]));
  if ((m = path.match(/^\/r\/(.+)$/))) return applyReply(await decode(m[1]));
  return { redirect: '/' };
}

function applyReply(p) {
  const bad = { name: 'bad', ptr: true, html: html`<h1>${t('cl.reply.bad')}</h1><div class="actions"><a class="btn primary" href="#/progetti">${t('hdr.projects')}</a></div>` };
  if (!p || p.v !== 1 || typeof p.e !== 'string') return bad;
  const e = S.engagement(p.e); if (!e) return bad;
  if (p.rv) { S.addReview(e, String(p.by || '').slice(0, 80), String(p.n || '').slice(0, 600)); V.env.flash = t('rv.applied'); return { redirect: `/i/${e.id}/attese` }; }
  const m = S.milestone(e, p.m); if (!m || !m.token || m.token !== p.t) return bad;
  const ratings = {};
  for (const id of m.expIds) { const a = p.a && p.a[id]; if (a && ['met', 'partly', 'missed'].includes(a[0])) ratings[id] = { r: a[0], note: String(a[1] || '').slice(0, 600) }; }
  if (!Object.keys(ratings).length) return bad;
  S.setClientCheck(e, m, ratings, String(p.by || '').slice(0, 80));
  V.env.flash = t('rs.applied');
  return { redirect: `/i/${e.id}/m/${m.id}` };
}

const TAB_ICONS = { sum: 'sum', exp: 'exp', dec: 'dec', his: 'his' };
function paintTabs(v) {
  if (!v.tabs) { tabsEl.hidden = true; document.body.classList.remove('has-tabs'); return; }
  tabsEl.hidden = false; document.body.classList.add('has-tabs');
  const { id, cur } = v.tabs;
  const href = { sum: `#/i/${id}`, exp: `#/i/${id}/attese`, dec: `#/i/${id}/scelte`, his: `#/i/${id}/storia` };
  tabsEl.innerHTML = ['sum', 'exp', 'dec', 'his'].map(k => `<a href="${href[k]}" data-nav="${k}"${k === cur ? ' aria-current="page"' : ''}>${icon(TAB_ICONS[k]).s}<span>${t('nav.' + k)}</span></a>`).join('');
}

async function render(soft = false) {
  const my = ++token;
  let v;
  try { v = await resolve(parse()); } catch (err) { console.error(err); v = V.notFound(); }
  if (my !== token) return;
  if (v.redirect) { go(v.redirect); return; }
  main.innerHTML = v.html.s;
  document.title = v.title || (v.name === 'landing' ? t('doc.title') : 'Altravì');
  document.body.dataset.view = v.name;
  document.body.dataset.ptr = v.ptr === false ? 'off' : 'on';
  document.body.classList.toggle('client', !!v.client);
  V.wiz.active = v.active || null;
  paintTabs(v);
  paintChrome();
  paintAcct(v);
  if (v.bind) v.bind(main);
  V.env.lastView = v.name; lastName = v.name;
  document.body.dataset.rendered = String(my);
  if (!soft) hideUndo();
  if (V.env.undo) { undoBar(V.env.undo); V.env.undo = null; }
  if (V.env.flash) { toast(V.env.flash); V.env.flash = ''; }
  if (!soft) { window.scrollTo(0, 0); const h = main.querySelector('h1'); if (h && !firstRender) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
  firstRender = false;
}
let firstRender = true;

/* ───────── intestazione e piè di pagina ───────── */
function paintChrome() {
  const L = getLang();
  document.documentElement.lang = L;
  document.querySelector('meta[name=description]').setAttribute('content', t('doc.desc'));
  document.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(n => n.setAttribute('aria-label', t(n.dataset.i18nAria)));
  const sel = document.getElementById('langSel'); if (sel.value !== L) sel.value = L;
  const big = document.documentElement.classList.contains('big');
  const sz = document.getElementById('textSize');
  sz.setAttribute('aria-pressed', String(big));
  document.getElementById('textSizeLbl').textContent = big ? t('size.less') : t('size.more');
  tabsEl.setAttribute('aria-label', t('nav.aria'));
}

/* ───────── fascia di stato dell'abbonamento ───────── */
const ACCT_VIEWS = new Set(['projects', 'summary', 'expectations', 'decisions', 'history', 'milestone', 'settings']);
function paintAcct(v) {
  const el = document.getElementById('acct'); if (!el) return;
  const a = Cloud.signedIn() ? Cloud.access() : null;
  if (!a || a.admin || !ACCT_VIEWS.has(v ? v.name : document.body.dataset.view) || document.body.classList.contains('client') || a.status === 'active') { el.hidden = true; el.className = 'acct'; return; }
  let msg, link, warn = false;
  if (a.status === 'trial') { msg = a.daysLeft > 1 ? t('ac.st.trial', { n: a.daysLeft }) : a.daysLeft === 1 ? t('ac.st.trial.one') : t('ac.st.trial.last'); link = t('ac.bar.choose'); warn = a.daysLeft <= 3; }
  else if (a.status === 'paused') { msg = t('ac.st.paused'); link = t('ac.bar.resume'); warn = true; }
  else { msg = t('ac.st.past'); link = t('ac.bar.check'); warn = true; }
  el.className = 'acct' + (warn ? ' warn' : '');
  el.innerHTML = `<span class="acct-t"></span><a class="btn quiet" href="#/abbonamento"></a>`;
  el.firstChild.textContent = msg; el.lastChild.textContent = link; el.hidden = false;
}

/** Ridisegna dopo un allineamento solo se non si sta scrivendo. */
function afterRemote() {
  const ae = document.activeElement;
  const typing = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT');
  if (V.wiz.active || typing || document.body.dataset.ptr === 'off') return;
  render(true);
}
function paintSync() {
  const n = document.getElementById('syncLine'); if (n) n.textContent = Cloud.syncText();
  paintAcct(null);
}

function boot() {
  const sel = document.getElementById('langSel');
  sel.innerHTML = '<option value="it">IT</option><option value="en">EN</option>';
  sel.addEventListener('change', () => setLang(sel.value));
  document.getElementById('textSize').addEventListener('click', () => {
    const on = document.documentElement.classList.toggle('big');
    try { localStorage.setItem('altravi.team.big', on ? '1' : '0'); } catch { /* ignore */ }
    paintChrome();
  });
  onLang(() => render(true));
  window.addEventListener('hashchange', () => { if (!/^#\/prezzi/.test(location.hash)) V.resetBilling(); render(); });
  window.addEventListener('storage', e => { if (e.key === 'altravi.team.v1') { S.reload(); render(true); } });
  setSoftRefresh(async () => { S.reload(); if (Cloud.signedIn()) { await Cloud.syncNow(); await Cloud.refreshMe(); } await render(true); });
  Cloud.onCloud(paintSync); Cloud.onRemote(afterRemote);
  Cloud.init();
  initPWA();
  render();
}
boot();
