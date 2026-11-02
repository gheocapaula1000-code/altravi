// Schermate dell'account: accesso con email, prova di 14 giorni, abbonamento, colleghi, link cliente sul servizio. Una azione per schermata.
import { html, raw, esc, icon, fmtTs, toast, t } from './ui.js';
import { getLang, setLang } from './i18n.js';
import * as S from './store.js';
import * as Cloud from './cloud.js';
import { PLANS, ORDER, annual, CONTACT } from './plans.js';
import { env, crumb, money, planName, download, notFound, $ } from './views.js';

const go = p => env.go(p);
/** Un indirizzo email lungo può andare a capo solo dopo @ . - _ (mai in mezzo a una parola). */
const addr = e => raw(esc(e).replace(/([@._-])/g, '$1<wbr>'));
const pend = { email: '', mode: 'try', plan: '' };
const errText = code => { const k = 'ac.err.' + code; const s = t(k); return s === k ? t('ac.err.SERVER') : s; };
const validEmail = x => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x);
const showErr = (root, msg) => { const e = $(root, '#err'); e.textContent = msg; e.hidden = false; };
const busy = (btn, on, label) => { btn.disabled = on; if (label != null) btn.dataset.label = btn.dataset.label || btn.querySelector('span').textContent; btn.querySelector('span').textContent = on ? t('ac.sending') : (btn.dataset.label || ''); };
const errP = () => raw('<p class="err" id="err" role="alert" hidden></p>');
const lead = s => html`<p class="lead">${s}</p>`;

/** Dopo l'accesso: titolare nuovo → benvenuto; poi eventuale importazione; poi gli incarichi. */
function afterLogin(r) {
  if (r.created && (!r.workspace || r.workspace.role !== 'member')) return '/benvenuto';
  if (Cloud.pendingImport().length) { env.flash = t('ac.back'); return '/importa'; }
  env.flash = t('ac.back'); return '/progetti';
}

/* ───────── email (prova o accesso) ───────── */
export function emailStep(mode, plan) {
  if (Cloud.signedIn()) return { redirect: '/progetti' };
  pend.mode = mode; pend.plan = plan || '';
  const isTry = mode === 'try';
  return {
    name: 'login', ptr: false, tabs: null,
    html: html`${crumb(plan ? '/prezzi' : '/', t('back'))}
${plan ? html`<p class="small kick">${planName(plan)}</p>` : ''}
<h1>${isTry ? t('ac.try.h') : t('ac.in.h')}</h1>${lead(isTry ? t('ac.try.lead') : t('ac.in.lead'))}
<label class="flabel" for="em">${t('ac.email.label')}</label>
<input class="field" id="em" type="email" inputmode="email" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${t('ac.email.ph')}" value="${pend.email}">
${errP()}
<div class="actions"><button class="btn primary" id="go" type="button"><span>${isTry ? t('ac.email.cta.try') : t('ac.email.cta.in')}</span>${icon('arrow')}</button></div>
<p class="center"><a href="#/${isTry ? 'accedi' : 'prova'}" id="alt">${isTry ? t('ac.has') : t('ac.new')}</a></p>`,
    bind(root) {
      const f = $(root, '#em'), b = $(root, '#go');
      f.addEventListener('input', () => { pend.email = f.value; });
      const run = async () => {
        const v = f.value.trim().toLowerCase();
        if (!validEmail(v)) { showErr(root, t('ac.email.bad')); f.focus(); return; }
        $(root, '#err').hidden = true; pend.email = v; busy(b, true, 1);
        const r = await Cloud.requestCode(v);
        busy(b, false);
        if (!r.ok) { showErr(root, errText(r.code)); return; }
        go('/codice');
      };
      b.addEventListener('click', run);
      f.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); run(); } });
    },
  };
}

/* ───────── codice ───────── */
export function codeStep() {
  if (Cloud.signedIn()) return { redirect: '/progetti' };
  if (!pend.email) return { redirect: '/accedi' };
  return {
    name: 'code', ptr: false, tabs: null,
    html: html`${crumb(pend.mode === 'in' ? '/accedi' : '/prova', t('ac.code.change'))}
<h1>${t('ac.code.h')}</h1>
<p class="lead">${t('ac.code.lead', { email: '' })}<span class="addr">${addr(pend.email)}</span></p>
<label class="flabel" for="cd">${t('ac.code.label')}</label>
<input class="field code" id="cd" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="7" autocomplete="one-time-code" placeholder="${t('ac.code.ph')}">
${errP()}
<div class="actions"><button class="btn primary" id="go" type="button"><span>${t('ac.code.cta')}</span>${icon('arrow')}</button></div>
<p class="muted small">${t('ac.code.link')} ${t('ac.code.spam')}</p>
<div class="actions"><button class="btn quiet" id="again" type="button">${t('ac.code.resend')}</button></div>`,
    bind(root) {
      const f = $(root, '#cd'), b = $(root, '#go'); let lock = false;
      const run = async () => {
        if (lock) return;
        const code = f.value.replace(/\D/g, '');
        if (code.length !== 6) { showErr(root, t('ac.code.need')); f.focus(); return; }
        lock = true; $(root, '#err').hidden = true; busy(b, true, 1);
        const r = await Cloud.verify({ email: pend.email, code });
        lock = false; busy(b, false);
        if (!r.ok) { showErr(root, r.code === 'LOCKED' ? t('ac.code.locked') : r.code === 'INVALID' ? t('ac.code.bad') : errText(r.code)); f.select(); return; }
        pend.email = ''; go(afterLogin(r));
      };
      b.addEventListener('click', run);
      f.addEventListener('input', () => { if (f.value.replace(/\D/g, '').length === 6) run(); });
      f.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); run(); } });
      const again = $(root, '#again');
      again.addEventListener('click', async () => {
        again.disabled = true;
        const r = await Cloud.requestCode(pend.email);
        if (r.ok) toast(t('ac.code.resent')); else showErr(root, errText(r.code));
        setTimeout(() => { again.disabled = false; }, 20000);
      });
    },
  };
}

/* ───────── link dell'email ───────── */
export function enter(token) {
  const bad = html`<h1>${t('ac.enter.bad.h')}</h1>${lead(t('ac.enter.bad.d'))}<div class="actions"><a class="btn primary" id="newCode" href="#/accedi">${t('ac.enter.bad.cta')}</a></div>`;
  return {
    name: 'enter', ptr: false, tabs: null,
    html: html`<div id="box"><h1>${t('ac.enter.wait')}</h1><p class="spin" aria-hidden="true"></p></div>`,
    async bind(root) {
      const r = await Cloud.verify({ token });
      if (!r.ok) { $(root, '#box').innerHTML = bad.s; return; }
      env.replace(afterLogin(r));
    },
  };
}

/* ───────── benvenuto e importazione ───────── */
export function welcome() {
  if (!Cloud.signedIn()) return { redirect: '/prova' };
  const a = Cloud.access();
  return {
    name: 'welcome', ptr: false, tabs: null,
    html: html`<h1>${t('ac.wel.h')}</h1>${lead(t('ac.wel.lead', { date: fmtTs(Date.parse(a.trialEndsAt)) }))}
<label class="flabel" for="tn">${t('ac.wel.team.q')}</label><p class="small muted">${t('ac.wel.team.h')}</p>
<input class="field" id="tn" type="text" autocomplete="organization" enterkeyhint="done" placeholder="${t('ac.wel.team.ph')}" value="${S.workspaceName()}">
<div class="actions"><button class="btn primary" id="go" type="button"><span>${t('ac.wel.cta')}</span>${icon('arrow')}</button><button class="btn quiet" id="skip" type="button">${t('ac.wel.skip')}</button></div>`,
    bind(root) {
      const next = async save => {
        const v = $(root, '#tn').value.trim();
        if (save && v) await Cloud.setTeamName(v);
        go(Cloud.pendingImport().length ? '/importa' : '/progetti');
      };
      $(root, '#go').addEventListener('click', () => next(true));
      $(root, '#skip').addEventListener('click', () => next(false));
      $(root, '#tn').addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); next(true); } });
    },
  };
}
export function importJobs() {
  if (!Cloud.signedIn()) return { redirect: '/prova' };
  const n = Cloud.pendingImport().length;
  if (!n) return { redirect: '/progetti' };
  return {
    name: 'import', ptr: false, tabs: null,
    html: html`<h1>${n === 1 ? t('ac.imp.h.one') : t('ac.imp.h', { n })}</h1>${lead(t('ac.imp.lead'))}
<div class="actions col"><button class="btn primary big" id="yes" type="button"><span>${t('ac.imp.yes')}</span>${icon('arrow')}</button><button class="btn quiet" id="no" type="button">${t('ac.imp.no')}</button></div>`,
    bind(root) {
      $(root, '#yes').addEventListener('click', async () => { await Cloud.unlockImport(true); go('/progetti'); });
      $(root, '#no').addEventListener('click', async () => { await Cloud.unlockImport(false); go('/progetti'); });
    },
  };
}

/* ───────── abbonamento ───────── */
const ivText = i => t('iv.' + (i === 'annual' ? 'annual' : 'monthly'));
export function subscription() {
  if (!Cloud.signedIn()) return { redirect: '/accedi' };
  const a = Cloud.access(), me = Cloud.me(), owner = Cloud.isOwner();
  let h, d, cta = '';
  if (a.admin) { h = t('ac.sub.admin.h'); d = t('ac.sub.admin.d'); }
  else if (a.status === 'trial') { h = t('ac.sub.trial.h'); d = t('ac.sub.trial.d', { date: fmtTs(Date.parse(a.trialEndsAt)) }); cta = html`<a class="btn primary big" id="choose" href="#/prezzi"><span>${t('ac.sub.choose')}</span>${icon('arrow')}</a>`; }
  else if (a.status === 'paused') { h = t('ac.sub.paused.h'); d = t('ac.sub.paused.d'); cta = html`<a class="btn primary big" id="choose" href="#/prezzi"><span>${t('ac.sub.choose')}</span>${icon('arrow')}</a>`; }
  else {
    const past = a.status === 'past_due';
    h = past ? t('ac.sub.past.h') : t('ac.sub.active.h', { plan: a.plan ? planName(a.plan) : '' });
    d = past ? t('ac.sub.past.d') : a.periodEnd ? (a.cancelAtPeriodEnd ? t('ac.sub.active.end', { date: fmtTs(Date.parse(a.periodEnd)) }) : t('ac.sub.active.d', { interval: ivText(a.interval), date: fmtTs(Date.parse(a.periodEnd)) })) : t('ac.sub.active.nodate', { interval: ivText(a.interval) });
    cta = html`<button class="btn primary big" id="manage" type="button"><span>${past ? t('ac.sub.check') : t('ac.sub.manage')}</span>${icon('arrow')}</button>`;
  }
  return {
    name: 'subscription', ptr: true, tabs: null,
    html: html`${crumb('/impostazioni', t('hdr.settings'))}<h1>${t('ac.sub.h')}</h1>
<section class="card next ${a.status === 'paused' || a.status === 'past_due' ? 'warn' : ''}"><h2>${h}</h2><p class="muted">${d}</p>${owner ? '' : html`<p class="notice">${t('ac.sub.owneronly')}</p>`}${owner ? cta : ''}</section>
<p class="small muted">${me.user.email}</p>${errP()}`,
    bind(root) {
      const m = $(root, '#manage');
      if (m) m.addEventListener('click', async () => { m.disabled = true; const r = await Cloud.portal(); if (!r.ok) { m.disabled = false; showErr(root, errText(r.code)); } });
      Cloud.refreshMe().then(x => { if (x && JSON.stringify(x.workspace.access) !== JSON.stringify(me.workspace.access)) env.rerender(); });
    },
  };
}
export function confirm(plan, interval) {
  if (!PLANS[plan] || !['monthly', 'annual'].includes(interval)) return notFound();
  if (!Cloud.signedIn()) return { redirect: '/prova/' + plan };
  const a = Cloud.access(), owner = Cloud.isOwner(), bill = Cloud.billing();
  if (a.admin || a.status === 'active' || a.status === 'past_due') return { redirect: '/abbonamento' };
  const price = interval === 'annual' ? annual(plan) : PLANS[plan].monthly;
  return {
    name: 'confirm', ptr: false, tabs: null,
    html: html`${crumb('/prezzi', t('ac.cf.change'))}
<h1>${t('ac.cf.h', { plan: planName(plan), interval: ivText(interval) })}</h1>
<section class="card next"><p class="price"><b>${money(price)}</b> <span>${interval === 'annual' ? t('pr.per.year') : t('pr.per.month')}</span></p>
<p class="muted">${t('ac.cf.novat')}</p><p class="muted">${t('ac.cf.now')}</p><p class="muted">${t('ac.cf.stripe')}</p>
${bill && bill.mode === 'test' ? html`<p class="notice" id="testMode">${t('ac.cf.test')}</p>` : ''}</section>
${owner ? html`${errP()}<div class="actions"><button class="btn primary big" id="pay" type="button"><span>${t('ac.cf.cta')}</span>${icon('arrow')}</button></div>` : html`<p class="notice">${t('ac.sub.owneronly')}</p>`}`,
    bind(root) {
      const b = $(root, '#pay'); if (!b) return;
      b.addEventListener('click', async () => {
        busy(b, true, 1); $(root, '#err').hidden = true;
        const r = await Cloud.checkout(plan, interval);
        if (!r.ok) { busy(b, false); showErr(root, errText(r.code)); }
      });
    },
  };
}
export function payOk() {
  if (!Cloud.signedIn()) return { redirect: '/accedi' };
  const okHtml = a => html`<h1>${t('ac.ok.h', { plan: planName(a.plan || 'team') })}</h1>${lead(t('ac.ok.d'))}<div class="actions"><a class="btn primary big" id="openJobs" href="#/progetti"><span>${t('ac.ok.cta')}</span>${icon('arrow')}</a></div>`;
  const slow = html`<h1>${t('ac.ok.slow.h')}</h1>${lead(t('ac.ok.slow.d'))}<div class="actions"><button class="btn primary" id="again" type="button"><span>${t('ac.ok.slow.cta')}</span></button></div>`;
  return {
    name: 'payok', ptr: false, tabs: null,
    html: html`<div id="box"><h1>${t('ac.ok.wait')}</h1><p class="spin" aria-hidden="true"></p></div>`,
    async bind(root) {
      const box = $(root, '#box');
      const check = async () => {
        for (let i = 0; i < 12; i++) {
          const m = await Cloud.refreshMe();
          if (m && m.workspace.access.status === 'active') { box.innerHTML = okHtml(m.workspace.access).s; Cloud.syncNow(); return; }
          await new Promise(r => setTimeout(r, 1500));
        }
        box.innerHTML = slow.s; $(box, '#again').addEventListener('click', () => { box.innerHTML = `<h1>${esc(t('ac.ok.wait'))}</h1><p class="spin" aria-hidden="true"></p>`; check(); });
      };
      check();
    },
  };
}
export function payCancel() {
  return { name: 'paycancel', ptr: false, tabs: null, html: html`<h1>${t('ac.ko.h')}</h1>${lead(t('ac.ko.d'))}<div class="actions"><a class="btn primary" id="backPlans" href="#/prezzi"><span>${t('ac.ko.cta')}</span>${icon('arrow')}</a></div>` };
}
export function paused() {
  if (!Cloud.signedIn()) return { redirect: '/prova' };
  const owner = Cloud.isOwner();
  return {
    name: 'paused', ptr: true, tabs: null,
    html: html`<h1>${t('ac.pause.h')}</h1>${lead(t('ac.pause.d'))}
${owner ? html`<div class="actions"><a class="btn primary big" id="choose" href="#/prezzi"><span>${t('ac.sub.choose')}</span>${icon('arrow')}</a></div>` : html`<p class="notice">${t('ac.pause.owner')}</p>`}
<div class="actions"><a class="btn quiet" id="seeJobs" href="#/progetti">${t('hdr.projects')}</a><button class="btn quiet" id="dl" type="button">${icon('download')}<span>${t('ac.pause.dl')}</span></button></div>`,
    bind(root) { $(root, '#dl').addEventListener('click', () => download('altravi-team-dati.json', JSON.stringify(S.get(), null, 2), 'application/json')); },
  };
}
export function clientsLocked() {
  return { name: 'limit', ptr: true, tabs: null, html: html`${crumb('/progetti', t('back'))}<section class="card next"><h1 class="h2">${t('ac.nocl.h')}</h1><p class="muted">${t('ac.nocl.d')}</p><a class="btn primary" id="seePlans" href="#/prezzi">${t('ac.nocl.cta')}</a></section>` };
}

/* ───────── colleghi ───────── */
export function invitePerson() {
  if (!Cloud.signedIn() || !Cloud.isOwner()) return { redirect: '/impostazioni' };
  return {
    name: 'invite', ptr: false, tabs: null,
    html: html`${crumb('/impostazioni', t('back'))}<h1>${t('ac.mem.q')}</h1>${lead(t('ac.mem.hint'))}
<label class="flabel sr" for="em">${t('ac.email.label')}</label>
<input class="field" id="em" type="email" inputmode="email" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${t('ac.email.ph')}">
${errP()}<div class="actions"><button class="btn primary" id="go" type="button"><span>${t('ac.mem.cta')}</span>${icon('arrow')}</button></div>`,
    bind(root) {
      const f = $(root, '#em'), b = $(root, '#go');
      const run = async () => {
        const v = f.value.trim().toLowerCase();
        if (!validEmail(v)) { showErr(root, t('ac.email.bad')); f.focus(); return; }
        $(root, '#err').hidden = true; busy(b, true, 1);
        const r = await Cloud.invite(v); busy(b, false);
        if (!r.ok) { showErr(root, errText(r.code)); return; }
        env.flash = t('ac.mem.sent', { email: v }); go('/impostazioni');
      };
      b.addEventListener('click', run);
      f.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); run(); } });
    },
  };
}

/** Parte «account» delle impostazioni. */
export function accountCards() {
  if (!Cloud.signedIn()) {
    return html`<section class="card"><h2 class="h2s">${t('ac.set.h')}</h2>${Cloud.sessionExpired() ? html`<p class="notice">${t('ac.set.expired')}</p>` : ''}<p class="muted">${t('ac.set.in.d')}</p>
<a class="btn primary" id="setIn" href="#/accedi"><span>${t('ac.set.in')}</span></a></section>`;
  }
  const me = Cloud.me(), a = Cloud.access(), owner = Cloud.isOwner(), lim = a.limits.users;
  const st = a.admin ? t('ac.sub.admin.h') : a.status === 'trial' ? (a.daysLeft > 1 ? t('ac.st.trial', { n: a.daysLeft }) : a.daysLeft === 1 ? t('ac.st.trial.one') : t('ac.st.trial.last')) : a.status === 'paused' ? t('ac.st.paused') : a.status === 'past_due' ? t('ac.st.past') : t('ac.st.active', { plan: a.plan ? planName(a.plan) : '', interval: ivText(a.interval) });
  return html`<section class="card"><h2 class="h2s">${t('ac.set.h')}</h2><p>${t('ac.set.as', { email: '' })}<span class="addr">${addr(me.user.email)}</span></p>
<p class="small muted" id="syncLine" aria-live="polite">${Cloud.syncText()}</p>
<a class="btn quiet" id="subLink" href="#/abbonamento"><span>${st}</span>${icon('arrow')}</a>
<button class="btn quiet" id="signOut" type="button">${t('ac.set.out')}</button><p class="small muted">${t('ac.set.out.d')}</p></section>
<section class="card"><h2 class="h2s">${t('ac.mem.h')}</h2><p class="small muted">${t('ac.mem.count', { n: me.workspace.members.length, max: lim == null ? '∞' : lim })}</p>
<ul class="people">${me.workspace.members.map(m => html`<li class="person"><span class="av" aria-hidden="true">${m.email.slice(0, 2).toUpperCase()}</span><span class="grow"><span class="addr"><b>${addr(m.email)}</b></span><span class="small muted">${m.role === 'owner' ? t('ac.mem.owner') : t('ac.mem.member')}</span></span>${owner && m.role !== 'owner' ? html`<button class="btn quiet sm" type="button" data-rmm="${m.id}">${t('ac.mem.rm')}</button>` : ''}</li>`)}</ul>
${owner && !a.readOnly ? html`<a class="btn quiet" id="inviteGo" href="#/invita">${icon('plus')}<span>${t('ac.mem.add')}</span></a>` : ''}</section>
${a.admin ? html`<section class="card" id="adminCard"><h2 class="h2s">${t('ac.admin.h')}</h2><p class="muted" id="adminTxt">…</p></section>` : ''}`;
}
export function bindAccount(root) {
  const o = $(root, '#signOut');
  if (o) o.addEventListener('click', async () => { o.disabled = true; await Cloud.signOut(); env.flash = ''; go('/'); });
  root.querySelectorAll('[data-rmm]').forEach(b => b.addEventListener('click', async () => { b.disabled = true; await Cloud.removeMember(b.dataset.rmm); env.rerender(); }));
  const ad = $(root, '#adminTxt');
  if (ad) Cloud.adminStats().then(r => { ad.textContent = r.ok ? t('ac.admin.d', { trial: r.counts.trial || 0, active: (r.counts.active || 0) + (r.counts.past_due || 0), paused: r.counts.paused || 0 }) : ''; });
}

/* ───────── link del cliente sul servizio ───────── */
export function clientEntry(token) {
  const msg = (h, d, retry) => html`<h1>${h}</h1>${lead(d)}${retry ? html`<div class="actions"><button class="btn primary" id="retry" type="button">${t('ac.cl.retry')}</button></div>` : ''}`;
  return {
    name: 'cl-entry', ptr: false, client: true, tabs: null,
    html: html`<div id="box"><h1>${t('ac.cl.wait')}</h1><p class="spin" aria-hidden="true"></p></div>`,
    async bind(root) {
      const box = $(root, '#box');
      const run = async () => {
        const r = await Cloud.clientFetch(token);
        if (!r.ok) {
          const m = r.code === 'PAUSED' ? msg(t('ac.cl.paused.h'), t('ac.cl.paused.d')) : (r.code === 'LINK_INVALID' || r.code === 'NOT_FOUND') ? msg(t('ac.cl.bad.h'), t('ac.cl.bad.d')) : msg(t('ac.cl.fail.h'), errText(r.code), true);
          box.innerHTML = m.s; const rb = $(box, '#retry'); if (rb) rb.addEventListener('click', run); return;
        }
        const sn = r.snapshot, old = S.loadCV(), same = old && old.cloud === token;
        if (r.answered && !(same && old.sent)) { box.innerHTML = msg(t('ac.cl.already.h'), t('ac.cl.already.d')).s; return; }
        S.saveCV(same ? { ...old, snap: sn } : { snap: sn, answers: {}, by: '', note: '', done: false, cloud: token, sent: false });
        try { if (!localStorage.getItem('altravi.team.lang') && (sn.l === 'it' || sn.l === 'en') && sn.l !== getLang()) setLang(sn.l, false); } catch { /* ignore */ }
        env.replace('/cliente');
      };
      run();
    },
  };
}
export { CONTACT, ORDER };
