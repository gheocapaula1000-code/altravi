// Tutte le schermate. Ogni vista restituisce { name, html, bind?, tabs?, ptr?, title? }.
import { html, raw, esc, icon, ring, rateBadge, ownerChip, fmtDay, fmtTs, toast, t, tx } from './ui.js';
import { getLang } from './i18n.js';
import * as S from './store.js';
import * as M from './model.js';
import { PLANS, ORDER, annual, annualFull, TRIAL_DAYS, CONTACT } from './plans.js';
import { email as mail, mailto, IDS as EMAIL_IDS } from './emails.js';
import { linkFor, shareOrCopy } from './share.js';
import * as Cloud from './cloud.js';
import { accountCards, bindAccount } from './views-account.js';

export const env = { go: () => {}, replace: () => {}, rerender: () => {}, flash: '' };
const go = p => env.go(p);
const planName = id => t('pr.' + id);
const money = n => new Intl.NumberFormat(getLang() === 'it' ? 'it-IT' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' }).format(n);
const nsKey = k => 'ns.' + k.replace('-', '.');
const initials = n => String(n || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const crumb = (href, label) => html`<a class="crumb" href="#${href}">${icon('back')}<span>${label}</span></a>`;
const lvlText = a => t('sm.level.' + M.level(a));
const need = (id, msg) => raw(`<p class="err" id="${id}" role="alert" hidden>${esc(msg)}</p>`);
const $ = (r, s) => r.querySelector(s);
const sender = () => { const p = S.people()[0]; return p ? tx(p.name) : ''; };

/* ───────── landing ───────── */
export function landing() {
  const has = S.get().engagements.length > 0;
  return {
    name: 'landing', ptr: true, title: t('doc.title'),
    html: html`
<section class="hero">
  <p class="kicker">${t('ld.kicker')}</p>
  <h1>${t('ld.h1')}</h1>
  <p class="lead">${t('ld.lead')}</p>
  <div class="hero-cta">
    ${Cloud.signedIn()
      ? html`<a class="btn primary big" id="openGo" href="#/progetti">${t('ld.cta.in')}</a>`
      : html`<a class="btn primary big" id="trialGo" href="#/prova">${t('ld.cta')}</a>`}
    <a class="btn" id="demoGo" href="#/demo">${t('ld.cta2')}</a>
    <p class="small muted">${t('ld.demo.hint')}</p>
    <p class="small promise">${t('ld.promise')}</p>
    <p class="small links">
      <a href="#/prezzi">${t('ld.pricelink')}</a>
      ${has ? html`<a href="#/progetti">${t('hdr.projects')}</a>` : ''}
    </p>
  </div>
  <svg class="venn" viewBox="0 0 320 190" role="img" aria-label="${t('ld.venn.team')} + ${t('ld.venn.client')} = ${t('ld.venn.mid')}">
    <circle cx="125" cy="95" r="78" class="v-team"/><circle cx="195" cy="95" r="78" class="v-client"/>
    <text x="68" y="100" class="vt" text-anchor="middle">${t('ld.venn.team')}</text>
    <text x="252" y="100" class="vt" text-anchor="middle">${t('ld.venn.client')}</text>
    <text x="160" y="100" class="vt vm" text-anchor="middle">${t('ld.venn.mid')}</text>
  </svg>
</section>
<section class="band">
  <p class="not">${t('ld.not')}</p>
  <p class="muted">${t('ld.pain')}</p>
</section>
<section>
  <h2>${t('ld.how')}</h2>
  <ol class="steps">
    ${[1, 2, 3, 4, 5].map(n => html`<li><span class="num" aria-hidden="true">${n}</span><div><h3>${t('ld.s' + n + '.t')}</h3><p class="muted">${t('ld.s' + n + '.d')}</p></div></li>`)}
  </ol>
</section>
<section class="card scorecard">
  ${ring(83, 'mid', '6.5rem')}
  <div><h2>${t('ld.score.t')}</h2><p class="muted">${t('ld.score.d')}</p></div>
</section>
<section>
  <h2>${t('ld.who')}</h2>
  <ul class="who">${[1, 2, 3, 4, 5].map(n => html`<li>${t('ld.who.' + n)}</li>`)}</ul>
</section>
<section class="band">
  <p class="muted">${t('ld.trial')} <a href="#/prezzi">${t('ld.pricelink')}</a></p>
  <p class="muted">${t('ld.contact')} <a href="mailto:${CONTACT}">${CONTACT}</a></p>
</section>`,
  };
}

/* ───────── lista incarichi ───────── */
let gq = '';
function usageLine() {
  const a = S.access(), p = S.currentPlan(), pl = PLANS[p], n = S.activeEngagements().length;
  const unl = a ? a.limits.jobs == null : pl.jobs === Infinity;
  const one = n === 1 ? '.one' : '';
  const line = a && a.status === 'trial' ? t('lim.jobs.plain' + one, { n }) : unl ? t('lim.jobs.unl' + one, { n, plan: planName(p) }) : t('lim.jobs', { n, max: a ? a.limits.jobs : pl.jobs, plan: planName(p) });
  return html`<p class="usage">${line}</p>${Cloud.signedIn() ? html`<p class="usage sync" id="syncLine" aria-live="polite">${Cloud.syncText()}</p>` : ''}`;
}
function projCard(e) {
  const sc = M.engagementScore(e), ns = M.nextStep(e);
  const nm = ns.m ? tx(ns.m.name) : '';
  return html`<a class="card proj" href="#/i/${e.id}">
  <div class="proj-main">
    <h3>${tx(e.title)}${e.demo ? html` <span class="tag">${t('pl.demo.tag')}</span>` : ''}</h3>
    <p class="muted">${t('pl.client')}: ${tx(e.client)}</p>
    ${e.closedAt ? html`<p class="small muted">${t('sm.closed', { d: fmtTs(e.closedAt) })}</p>` : html`<p class="small next"><b>${t('pl.next')}:</b> ${t(nsKey(ns.kind) + '.t', { m: nm })}</p>`}
  </div>
  <div class="proj-score">${ring(sc ? sc.value : null, sc ? M.level(sc.value) : null, '4.6rem')}<span class="small muted">${sc ? lvlText(sc.value) : t('pl.noscore')}</span></div>
</a>`;
}
function searchHits(q) {
  q = q.trim().toLowerCase(); if (!q) return [];
  const out = [];
  for (const e of S.get().engagements) for (const ev of M.events(e)) if ((tx(e.title) + ' ' + tx(e.client) + ' ' + M.eventText(ev)).toLowerCase().includes(q)) out.push({ e, ev });
  return out.slice(0, 30);
}
const hitHtml = h => html`<li><a class="hit" href="#/i/${h.e.id}/storia"><span class="small muted">${tx(h.e.title)} · ${fmtTs(h.ev.at)}</span><b>${h.ev.title}</b>${h.ev.body ? html`<span>${h.ev.body}</span>` : ''}</a></li>`;

export function projects() {
  const all = S.get().engagements, active = all.filter(e => !e.closedAt), closed = all.filter(e => e.closedAt);
  return {
    name: 'projects', ptr: true,
    html: html`
<h1>${t('pl.h1')}</h1>
${usageLine()}
<div class="actions"><a class="btn primary" id="newEng" href="#/nuovo/1">${icon('plus')}<span>${t('pl.new')}</span></a></div>
${all.length ? html`
<div class="searchbox"><label for="gs" class="small muted">${t('pl.search')}</label><input id="gs" class="field" type="search" placeholder="${t('pl.search.ph')}" value="${gq}" autocomplete="off"></div>
<ul class="hits" id="gres" aria-live="polite"></ul>
<div id="plist" class="list">${active.map(projCard)}</div>
${closed.length ? html`<h2 class="h2s">${t('pl.closed')}</h2><div class="list">${closed.map(projCard)}</div>` : ''}`
      : html`<div class="card empty"><p>${t('pl.empty')}</p><a class="btn" href="#/demo">${t('pl.demo')}</a></div>`}`,
    bind(root) {
      const inp = $(root, '#gs'); if (!inp) return;
      const paint = () => {
        gq = inp.value; const hits = searchHits(gq);
        $(root, '#plist').hidden = !!gq.trim();
        $(root, '#gres').innerHTML = gq.trim() ? (hits.length ? hits.map(h => hitHtml(h).s).join('') : `<li class="muted">${esc(t('pl.noresult'))}</li>`) : '';
      };
      inp.addEventListener('input', paint); paint();
    },
  };
}

/* ───────── sintesi dell'incarico ───────── */
function nextCard(e) {
  const n = M.nextStep(e), m = n.m ? tx(n.m.name) : '';
  let href = '', onclick = '';
  const id = e.id;
  switch (n.kind) {
    case 'exp-client': href = `/i/${id}/attesa/1/client`; break;
    case 'exp-team': href = `/i/${id}/attesa/1/team`; break;
    case 'ms': href = `/i/${id}/tappa/1`; break;
    case 'check': href = `/i/${id}/m/${n.m.id}`; break;
    case 'send': case 'reply': href = `/i/${id}/m/${n.m.id}`; break;
    case 'close': href = ''; onclick = 'close'; break;
    default: href = `/i/${id}/decisione/1`;
  }
  const when = n.m ? M.whenText(n.m.date) : '';
  const d = t(nsKey(n.kind) + '.d', { m, when });
  return html`<section class="card next" aria-labelledby="nxt"><p class="small kick">${t('sm.next')}</p><h2 id="nxt">${t(nsKey(n.kind) + '.t', { m })}</h2><p class="muted">${d}</p>
  ${onclick ? html`<button class="btn primary" id="closeEng" type="button">${t('ns.close.b')}</button>` : html`<a class="btn primary" id="nextBtn" href="#${href}">${t(nsKey(n.kind) + '.b')}${icon('arrow')}</a>`}</section>`;
}
function peopleCard(e) {
  const team = S.people(), cts = e.contacts || [];
  const chip = p => html`<li class="person"><span class="av" aria-hidden="true">${initials(tx(p.name))}</span><span><b>${tx(p.name)}</b>${tx(p.role) ? html`<br><span class="small muted">${tx(p.role)}</span>` : ''}</span></li>`;
  if (!team.length && !cts.length) return '';
  return html`<section class="card" aria-labelledby="ppl"><h2 id="ppl" class="h2s">${t('sm.people')}</h2>
  <div class="two">
    <div><p class="small kick team-k">${t('sm.people.team')}</p><ul class="people">${team.map(chip)}</ul></div>
    <div><p class="small kick client-k">${t('sm.people.client')}</p><ul class="people">${cts.map(chip)}</ul></div>
  </div></section>`;
}
export function summary(id) {
  const e = S.engagement(id); if (!e) return notFound();
  const sc = M.engagementScore(e);
  const dtext = sc && sc.delta != null ? (sc.delta > 0 ? t('sm.delta.up', { n: sc.delta }) : sc.delta < 0 ? t('sm.delta.down', { n: -sc.delta }) : t('sm.delta.same')) : '';
  const ms = M.sortedMs(e);
  return {
    name: 'summary', ptr: true, tabs: { id, cur: 'sum' },
    html: html`
${crumb('/progetti', t('hdr.projects'))}
<h1>${tx(e.title)}</h1>
<p class="muted meta">${t('sm.client', { c: tx(e.client) })} · ${t('sm.team', { t: tx(e.team) || S.workspaceName() })}</p>
${e.closedAt ? html`<p class="small muted">${t('sm.closed', { d: fmtTs(e.closedAt) })}</p>` : ''}
<div class="grid2">
  <section class="card score" aria-labelledby="alg">
    ${ring(sc ? sc.value : null, sc ? M.level(sc.value) : null, '7.5rem')}
    <div class="score-t"><p class="small kick" id="alg">${t('sm.align')}</p>
      <p class="lvl ${sc ? M.level(sc.value) : ''}">${sc ? lvlText(sc.value) : t('sm.noalign')}</p>
      ${dtext ? html`<p class="small muted">${dtext}</p>` : ''}
      ${sc && sc.series.length > 1 ? html`<div class="trend" role="img" aria-label="${sc.series.join('% → ') + '%'}">${sc.series.map(v => html`<i style="height:${Math.max(8, v)}%"></i>`)}</div>` : ''}
    </div>
  </section>
  ${e.closedAt ? '' : nextCard(e)}
</div>
<nav class="stats" aria-label="${tx(e.title)}">
  <a href="#/i/${id}/attese"><b>${e.expectations.length}</b><span>${t('sm.stats.exp')}</span></a>
  <a href="#/i/${id}/scelte"><b>${e.decisions.length}</b><span>${t('sm.stats.dec')}</span></a>
  <a href="#/i/${id}/storia"><b>${M.doneMilestones(e).length}/${e.milestones.length}</b><span>${t('sm.stats.ms')}</span></a>
</nav>
<section aria-labelledby="mh"><h2 class="h2s" id="mh">${t('sm.ms.h')}</h2>
  <ul class="ms-list">
    ${ms.map(m => { const st = M.msState(m), r = st === 'done' ? M.milestoneResult(e, m) : null; return html`<li><a class="card ms ${st}" href="#/i/${id}/m/${m.id}"><span class="ms-main"><b>${tx(m.name)}</b><span class="small muted">${t('ms.due', { d: fmtDay(m.date) })}</span></span><span class="ms-st">${r && r.align != null ? html`<b class="pct ${M.level(r.align)}">${r.align}%</b>` : ''}<span class="small">${t('ms.st.' + st)}</span></span></a></li>`; })}
  </ul>
  <p><a class="btn quiet" href="#/i/${id}/tappa/1">${icon('plus')}<span>${t('sm.ms.new')}</span></a></p>
</section>
${peopleCard(e)}`,
    bind(root) {
      const b = $(root, '#closeEng');
      if (b) b.addEventListener('click', () => { if (S.readOnly()) { go('/in-pausa'); return; } S.closeEngagement(e); env.rerender(); });
    },
  };
}

/* ───────── aspettative ───────── */
function expCard(e, x) {
  const m = x.mid ? S.milestone(e, x.mid) : null;
  const done = m && M.isDone(m);
  return html`<li class="card exp ${x.owner}">
  <p class="exp-t">${tx(x.text)}</p>
  ${tx(x.by) ? html`<p class="small muted">${t('ex.by', { n: tx(x.by) })}</p>` : ''}
  ${tx(x.measure) ? html`<p class="small"><b>${t('ex.measure')}:</b> ${tx(x.measure)}</p>` : ''}
  <p class="small muted">${x.due ? t('ex.due', { d: fmtDay(x.due) }) : ''}${x.due && m ? ' · ' : ''}${m ? t('ex.check', { m: tx(m.name) }) : (!x.due ? t('ex.unassigned') : '')}</p>
  ${done ? html`<p class="rates-line"><span class="small">${t('ex.rated.team')}</span> ${rateBadge(m.team.ratings[x.id] ? m.team.ratings[x.id].r : 'met')} <span class="small">${t('ex.rated.client')}</span> ${rateBadge(m.client.ratings[x.id] ? m.client.ratings[x.id].r : 'met')}</p>` : ''}
  <p class="card-act"><a class="btn quiet" href="#/i/${e.id}/modifica/attesa/${x.id}" aria-label="${t('ed.edit.aria', { t: tx(x.text) })}">${icon('edit')}<span>${t('ed.edit')}</span></a></p>
</li>`;
}
export function expectations(id) {
  const e = S.engagement(id); if (!e) return notFound();
  const sec = o => { const l = e.expectations.filter(x => x.owner === o); return html`<section class="side ${o}" aria-labelledby="h-${o}"><h2 class="h2s" id="h-${o}">${ownerChip(o)} <span>${t('ex.' + o + '.h')}</span></h2>${l.length ? html`<ul class="cards">${l.map(x => expCard(e, x))}</ul>` : html`<p class="muted">${t('ex.none')}</p>`}</section>`; };
  const rv = (e.reviews || []).slice(-1)[0];
  return {
    name: 'expectations', ptr: true, tabs: { id, cur: 'exp' },
    html: html`
${crumb('/i/' + id, tx(e.title))}
<h1>${t('ex.h1')}</h1><p class="lead">${t('ex.lead')}</p>
<div class="actions"><a class="btn primary" id="addExp" href="#/i/${id}/attesa/1">${icon('plus')}<span>${t('ex.add')}</span></a></div>
${rv ? html`<p class="notice">${t('rv.status', { d: fmtTs(rv.at) })}${tx(rv.note) ? html`<br>${t('rv.status.note', { n: tx(rv.note) })}` : ''}</p>` : ''}
<div class="grid2">${sec('team')}${sec('client')}</div>
<section class="card invite"><p class="muted">${t('rv.invite.d')}</p>
  <div class="actions col"><button class="btn quiet" id="inv" type="button">${icon('share')}<span>${t('rv.invite')}</span></button><button class="btn quiet" id="invMail" type="button">${t('ms.mail')}</button></div>
  ${shareBox()}
</section>`,
    bind(root) {
      bindShare(root, '#inv', () => shareUrl(e, null, () => reviewSnap(e)), () => {
        const sn = reviewSnap(e);
        return { title: t('rv.invite'), mail: mail('invite', getLang(), { team: sn.w, client: sn.c, contact: ((e.contacts || [])[0] ? tx(e.contacts[0].name) : ''), sender: sender(), job: sn.ti, link: '{LINK}' }) };
      }, '#invMail');
    },
  };
}

/* ───────── decisioni ───────── */
export function decisions(id) {
  const e = S.engagement(id); if (!e) return notFound();
  const list = [...e.decisions].sort((a, b) => b.createdAt - a.createdAt);
  return {
    name: 'decisions', ptr: true, tabs: { id, cur: 'dec' },
    html: html`
${crumb('/i/' + id, tx(e.title))}
<h1>${t('dc.h1')}</h1><p class="lead">${t('dc.lead')}</p>
<div class="actions"><a class="btn primary" id="addDec" href="#/i/${id}/decisione/1">${icon('plus')}<span>${t('dc.add')}</span></a></div>
${list.length ? html`<ul class="cards">${list.map(d => html`<li class="card dec">
  <p class="small muted">${fmtDay(d.date, true)}${d.from ? ' · ' + t('dc.from', { m: tx(d.from.mname) }) : ''}</p>
  <h3>${tx(d.what)}</h3>
  ${tx(d.why) ? html`<p><b>${t('dc.why')}:</b> ${tx(d.why)}</p>` : ''}
  ${tx(d.who) ? html`<p class="small"><b>${t('dc.who')}:</b> ${tx(d.who)}</p>` : ''}
  <div class="road"><p class="small kick">${t('dc.alt')}</p><p>${tx(d.alt) || t('dc.noalt')}</p></div>
  <p class="card-act"><a class="btn quiet" href="#/i/${id}/modifica/decisione/${d.id}" aria-label="${t('ed.edit.aria', { t: tx(d.what) })}">${icon('edit')}<span>${t('ed.edit')}</span></a></p>
</li>`)}</ul>` : html`<p class="muted">${t('dc.none')}</p>`}`,
  };
}

/* ───────── storia ───────── */
const hs = { q: '', f: 'all' };
function evHtml(ev, id) {
  const link = ev.mid ? `#/i/${id}/m/${ev.mid}` : '';
  return html`<li class="ev ${ev.cat}"><span class="dot" aria-hidden="true"></span><div class="card">
    <p class="small muted">${fmtTs(ev.at)}</p><h3>${link ? html`<a href="${link}">${ev.title}</a>` : ev.title}</h3>
    ${ev.body ? html`<p>${ev.body}</p>` : ''}
    ${ev.extra && ev.extra.length ? html`<ul class="ex">${ev.extra.map(x => html`<li class="small muted">${x}</li>`)}</ul>` : ''}</div></li>`;
}
function exportMd(e) {
  const lines = [`# ${tx(e.title)}`, '', `${t('pl.client')}: ${tx(e.client)} · ${t('sm.team', { t: tx(e.team) || S.workspaceName() })}`, ''];
  for (const ev of M.events(e).slice().reverse()) {
    lines.push(`## ${new Date(ev.at).toISOString().slice(0, 10)} · ${ev.title}`);
    if (ev.body) lines.push(ev.body);
    (ev.extra || []).forEach(x => lines.push('- ' + x));
    lines.push('');
  }
  return lines.join('\n');
}
export function download(name, text, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: type + ';charset=utf-8' }));
  a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
export function history(id) {
  const e = S.engagement(id); if (!e) return notFound();
  const evs = M.events(e);
  const filters = ['all', 'exp', 'dec', 'chk'];
  return {
    name: 'history', ptr: true, tabs: { id, cur: 'his' },
    html: html`
${crumb('/i/' + id, tx(e.title))}
<h1>${t('hs.h1')}</h1><p class="lead">${t('hs.lead')}</p>
<div class="actions"><button class="btn primary" id="exp" type="button">${icon('download')}<span>${t('hs.export')}</span></button></div>
<div class="searchbox"><label for="hq" class="small muted">${t('hs.search')}</label><input id="hq" class="field" type="search" placeholder="${t('hs.search.ph')}" value="${hs.q}" autocomplete="off"></div>
<div class="chips" role="group" aria-label="${t('hs.h1')}">${filters.map(f => html`<button class="chip" type="button" data-f="${f}" aria-pressed="${String(hs.f === f)}">${t('hs.f.' + f)}</button>`)}</div>
<ol class="tl" id="tl"></ol>`,
    bind(root) {
      const paint = () => {
        const q = hs.q.trim().toLowerCase();
        const list = evs.filter(ev => (hs.f === 'all' || ev.cat === hs.f) && (!q || M.eventText(ev).includes(q)));
        $(root, '#tl').innerHTML = list.length ? list.map(ev => evHtml(ev, id).s).join('') : `<li class="muted">${esc(t('hs.none'))}</li>`;
        root.querySelectorAll('[data-f]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === hs.f)));
      };
      $(root, '#hq').addEventListener('input', ev => { hs.q = ev.target.value; paint(); });
      root.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { hs.f = b.dataset.f; paint(); }));
      $(root, '#exp').addEventListener('click', () => download(`${t('hs.file')}-${String(tx(e.title)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'altravi'}.md`, exportMd(e), 'text/markdown'));
      paint();
    },
  };
}

/* ───────── condivisione ───────── */
const shareBox = () => html`<div class="sharebox" hidden><label class="small muted" for="sbl">${t('ms.link.label')}</label><textarea class="field" id="sbl" rows="3" readonly></textarea><button class="btn quiet" type="button" id="sbc">${t('copy')}</button></div>`;
const errMsg = c => { const k = 'ac.err.' + c; const x = t(k); return x === k ? t('ac.err.SERVER') : x; };
/** Con un account il link cliente vive sul servizio (breve, revocabile); senza account resta il link con i dati dentro. */
const shareUrl = (e, mid, snapFn) => (Cloud.signedIn() && !e.demo ? Cloud.clientLink(e, mid) : linkFor('c', snapFn()));
function bindShare(root, sel, build, meta, mailSel) {
  const btn = $(root, sel); if (!btn) return;
  const box = root.querySelector('.sharebox');
  const run = async mode => {
    btn.disabled = true;
    try {
      let url;
      try { url = await build(); } catch (err) {
        if (err && err.code === 'PLAN_NO_CLIENTS') { go('/clienti-piano'); return; }
        if (err && err.code === 'PAUSED') { go('/in-pausa'); return; }
        toast(errMsg(err && err.code)); return;
      }
      box.hidden = false; $(box, '#sbl').value = url;
      const m = meta();
      if (mode === 'mail') {
        const em = { subject: m.mail.subject, body: m.mail.body.replace('{LINK}', url) };
        location.href = mailto('', em);
      } else {
        const r = await shareOrCopy(url, m.title, (m.text || '') + '');
        if (r === 'copied') toast(t('copied')); else if (r === 'shared') toast(t('shared'));
      }
    } finally { btn.disabled = false; }
  };
  btn.addEventListener('click', () => run('share'));
  const mb = mailSel && $(root, mailSel); if (mb) mb.addEventListener('click', () => run('mail'));
  const cp = $(box, '#sbc');
  cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText($(box, '#sbl').value); toast(t('copied')); } catch { $(box, '#sbl').select(); } });
}
function baseSnap(e) {
  return { v: 1, e: e.id, w: tx(e.team) || S.workspaceName(), c: tx(e.client), ti: tx(e.title), l: getLang(), cs: (e.contacts || []).map(c => tx(c.name)),
    x: e.expectations.map(x => [x.id, x.owner === 'team' ? 0 : 1, tx(x.text), tx(x.measure), x.due || '', tx(x.by)]) };
}
const reviewSnap = e => baseSnap(e);
function msSnap(e, m) {
  return { ...baseSnap(e), m: m.id, k: S.shareToken(m), mn: tx(m.name), md: m.date, ids: m.expIds,
    d: e.decisions.map(d => [tx(d.what), tx(d.why), tx(d.alt), d.date]) };
}

/* ───────── tappa: stato, esito ───────── */
export function milestone(id, mid) {
  const e = S.engagement(id), m = S.milestone(e, mid); if (!e || !m) return notFound();
  const st = M.msState(m), nm = tx(m.name);
  const head = html`${crumb('/i/' + id, tx(e.title))}<h1>${st === 'done' ? t('rs.h1', { m: nm }) : nm}</h1>${st === 'done' ? '' : html`<p class="muted">${t('ms.when', { d: fmtDay(m.date, true) })}</p>`}`;
  if (st === 'done') return resultView(e, m, head);
  const exps = m.expIds.map(i => e.expectations.find(x => x.id === i)).filter(Boolean);
  const list = html`<h2 class="h2s">${t('ms.todo.h')}</h2>${exps.length ? html`<ul class="cards">${exps.map(x => html`<li class="card exp ${x.owner}">${ownerChip(x.owner)}<p class="exp-t">${tx(x.text)}</p></li>`)}</ul>` : html`<p class="muted">${t('ms.todo.none')}</p>`}`;
  const priv = html`<p class="small muted blind">${icon('user')}<span>${t('ms.privacy')}</span></p>`;
  if (st === 'open' || st === 'client') {
    const clientFirst = st === 'client';
    return { name: 'milestone', ptr: true, tabs: { id, cur: 'sum' }, html: html`${head}
${clientFirst ? html`<section class="card next"><h2>${t('ms.team.wait.t')}</h2><p class="muted">${t('ms.team.wait.d')}</p></section>` : ''}
<div class="actions"><a class="btn primary" id="startCheck" href="#/i/${id}/m/${mid}/v/1" ${exps.length ? '' : 'aria-disabled="true"'}>${t('ms.team.start')}${icon('arrow')}</a></div>
${priv}${list}` };
  }
  // team ha risposto, attende il cliente
  return {
    name: 'milestone', ptr: true, tabs: { id, cur: 'sum' },
    html: html`${head}
<section class="card next"><h2>${t('ms.client.wait.t')}</h2><p class="muted">${t('ms.client.wait.d')}</p></section>
<div class="actions col">
  <button class="btn primary" id="sendC" type="button">${icon('share')}<span>${t('ms.send')}</span></button>
  <button class="btn" id="mailC" type="button">${t('ms.mail')}</button>
</div>
${shareBox()}
<section class="card"><h3>${t('ms.together')}</h3><p class="muted small">${t('ms.together.d')}</p><button class="btn quiet" id="together" type="button">${t('ms.together')}</button></section>
<section class="card"><details><summary>${t('ms.haveReply')}</summary><label class="small muted" for="rl">${t('ms.haveReply.ph')}</label><textarea class="field" id="rl" rows="3"></textarea><p class="err" id="rlErr" role="alert" hidden>${t('ms.haveReply.bad')}</p><button class="btn quiet" id="rlGo" type="button">${t('ms.haveReply.go')}</button></details></section>
${priv}${list}`,
    bind(root) {
      const sn = () => msSnap(e, m);
      const first = e.contacts && e.contacts[0] ? tx(e.contacts[0].name) : '';
      bindShare(root, '#sendC', () => shareUrl(e, m.id, sn), () => {
        const ss = sn();
        return { title: t('ms.send'), text: t('ms.send.text', { m: nm }), mail: mail('checkin', getLang(), { team: ss.w, client: ss.c, contact: first, sender: sender(), job: ss.ti, milestone: nm, link: '{LINK}' }) };
      }, '#mailC');
      $(root, '#together').addEventListener('click', async () => { location.hash = '#/c/' + (await linkFor('c', sn())).split('#/c/')[1]; });
      $(root, '#rlGo').addEventListener('click', () => {
        const v = $(root, '#rl').value.trim(); const k = v.split('#/r/')[1];
        if (!k) { $(root, '#rlErr').hidden = false; return; }
        location.hash = '#/r/' + k;
      });
    },
  };
}
function resultView(e, m, head) {
  const r = M.milestoneResult(e, m), id = e.id;
  const decide = r.gaps.length > 0;
  const rowHtml = (row, gap) => html`<li class="card gap ${gap ? 'diff' : 'same'}"><p class="exp-t">${tx(row.exp.text)}</p>
    <div class="two"><div class="side team"><p class="small kick team-k">${t('rs.team')}</p>${rateBadge(row.a.r)}<p class="small muted">${tx(row.a.note) || t('rs.nonote')}</p></div>
    <div class="side client"><p class="small kick client-k">${t('rs.client')}</p>${rateBadge(row.b.r)}<p class="small muted">${tx(row.b.note) || t('rs.nonote')}</p></div></div></li>`;
  const sum = r.gaps.length ? t('rs.sum', { n: r.rows.length, s: r.agree.length, g: r.gaps.length }) : t('rs.sum.all', { n: r.rows.length });
  const first = e.contacts && e.contacts[0] ? tx(e.contacts[0].name) : '';
  return {
    name: 'result', ptr: true, tabs: { id, cur: 'sum' },
    html: html`${head}
<section class="card score" aria-labelledby="rsl">
  ${ring(r.align, M.level(r.align ?? 0), '7.5rem')}
  <div class="score-t"><p class="small kick" id="rsl">${t('rs.align')}</p><p class="lvl ${M.level(r.align ?? 0)}">${lvlText(r.align ?? 0)}</p><p>${sum}</p><p class="small muted">${t('rs.fulfil')}: ${r.fulfil}%</p></div>
</section>
<div class="actions">${decide ? html`<a class="btn primary" id="decide" href="#/i/${id}/decisione/1?from=${m.id}">${t('rs.decide')}${icon('arrow')}</a>` : html`<a class="btn primary" href="#/i/${id}">${t('rs.home')}</a>`}</div>
${r.gaps.length ? html`<h2 class="h2s">${t('rs.gaps')}</h2><p class="muted">${t('rs.gap.hint')}</p><ul class="cards">${r.gaps.map(x => rowHtml(x, true))}</ul>` : ''}
${r.agree.length ? html`<h2 class="h2s">${t('rs.same')}</h2><ul class="cards">${r.agree.map(x => rowHtml(x, false))}</ul>` : ''}
<p><button class="btn quiet" id="mailSum" type="button">${t('rs.mail')}</button></p>`,
    bind(root) {
      $(root, '#mailSum').addEventListener('click', () => {
        const gaps = r.gaps.length ? r.gaps.map(g => `- ${tx(g.exp.text)}: ${t('rs.team')} ${t('rate.' + g.a.r)} / ${t('rs.client')} ${t('rate.' + g.b.r)}`).join('\n') : sum;
        location.href = mailto('', mail('summary', getLang(), { team: tx(e.team) || S.workspaceName(), client: tx(e.client), contact: first, sender: sender(), job: tx(e.title), milestone: tx(m.name), score: r.align, level: lvlText(r.align), gaps }));
      });
    },
  };
}

/* ───────── verifica (una aspettativa per schermata) ───────── */
const ckDraft = {};
function checkinView({ exps, n, draftKey, ans, who, back, nextHref, onFinish, saveAns, crumbHtml, ptrOff = true }) {
  const x = exps[n - 1];
  if (!x) return { redirect: back };
  const cur = ans[x.id] || { r: '', note: '' };
  const last = n === exps.length;
  return {
    name: 'checkin', ptr: false, tabs: null,
    html: html`${crumbHtml}
<p class="step">${t('ck.prog', { n, m: exps.length })} · ${t('ck.who.' + who)}</p>
<div class="bar"><i style="width:${(n - 1) / exps.length * 100}%"></i></div>
<p>${ownerChip(x.owner)}</p>
<h1>${tx(x.text)}</h1>
${tx(x.measure) ? html`<p class="muted"><b>${t('ck.measure')}</b> ${tx(x.measure)}</p>` : ''}
<h2 class="q">${t('ck.q')}</h2>
<div class="rates" role="radiogroup" aria-label="${t('ck.q')}">
  ${M.RATES.map(r => html`<button type="button" class="rbtn ${r}" role="radio" aria-checked="${String(cur.r === r)}" data-r="${r}">${icon(r)}<span>${t('ck.' + r)}</span></button>`)}
</div>
<div id="nbox" ${cur.r ? '' : 'hidden'}><label for="note" class="small muted">${t('ck.note')}</label><textarea class="field" id="note" rows="3" placeholder="${t('ck.note.ph')}">${cur.note}</textarea></div>
${need('ckErr', t('need.pick'))}
<div class="actions"><button class="btn primary" id="ckNext" type="button">${last ? t('ck.finish') : t('next')}${icon('arrow')}</button></div>`,
    bind(root) {
      let r = cur.r;
      root.querySelectorAll('.rbtn').forEach(b => b.addEventListener('click', () => {
        r = b.dataset.r;
        root.querySelectorAll('.rbtn').forEach(o => o.setAttribute('aria-checked', String(o === b)));
        $(root, '#nbox').hidden = false; $(root, '#ckErr').hidden = true;
        saveAns(x.id, { r, note: $(root, '#note').value.trim() });
      }));
      $(root, '#note').addEventListener('input', () => { if (r) saveAns(x.id, { r, note: $(root, '#note').value.trim() }); });
      $(root, '#ckNext').addEventListener('click', () => {
        if (!r) { $(root, '#ckErr').hidden = false; root.querySelector('.rbtn').focus(); return; }
        saveAns(x.id, { r, note: $(root, '#note').value.trim() });
        if (last) onFinish(); else go(nextHref(n + 1));
      });
    },
  };
}
export function teamCheckin(id, mid, n) {
  const e = S.engagement(id), m = S.milestone(e, mid); if (!e || !m) return notFound();
  const exps = m.expIds.map(i => e.expectations.find(x => x.id === i)).filter(Boolean);
  if (!exps.length) return { redirect: `/i/${id}/m/${mid}` };
  const key = id + ':' + mid; ckDraft[key] = ckDraft[key] || {};
  if (n === 1 && env.lastView !== 'checkin') ckDraft[key] = {};
  return checkinView({
    exps, n, draftKey: key, ans: ckDraft[key], who: 'team', back: `/i/${id}/m/${mid}`,
    nextHref: k => `/i/${id}/m/${mid}/v/${k}`,
    saveAns: (xid, v) => { ckDraft[key][xid] = v; },
    onFinish: () => { S.setTeamCheck(e, m, { ...ckDraft[key] }); delete ckDraft[key]; env.flash = t('ck.saved.team'); go(`/i/${id}/m/${mid}`); },
    crumbHtml: n > 1 ? crumb(`/i/${id}/m/${mid}/v/${n - 1}`, t('back')) : crumb(`/i/${id}/m/${mid}`, t('back')),
  });
}

/* ───────── procedura guidata a passi ───────── */
const drafts = {};
export const wiz = { active: null };
function stepScreen({ key, ns, steps, n, base, exit, finish, init, query }) {
  if (n === 1 && wiz.active !== key) drafts[key] = { ...(init || {}) };
  const d = drafts[key] = drafts[key] || { ...(init || {}) };
  const list = steps(d);
  const st = list[n - 1];
  if (!st) return { redirect: base + '/1' };
  const total = list.length, last = n === total;
  const kp = st.pre || `${ns}.${st.k}`;
  const hint = t(kp + '.h'), ph = t(kp + '.ph');
  const q = st.qKey ? t(st.qKey) : t(kp + '.q');
  const sk = d._skip1 ? 1 : 0;
  const backHref = n > 1 && !(sk && n === 2) ? `${base}/${n - 1}` : exit;
  let body;
  if (st.type === 'choice') {
    body = html`<div class="choices">${st.opts.map(o => html`<button class="btn big choice" type="button" data-v="${o.v}">${o.label}</button>`)}</div>`;
  } else if (st.type === 'long') {
    body = html`<textarea class="field" id="wf" rows="4" placeholder="${ph}">${d[st.k] || ''}</textarea>`;
  } else if (st.type === 'date') {
    body = html`<div class="chips">${(st.chips || []).map(c => html`<button class="chip" type="button" data-set="${c.v}">${c.label}</button>`)}</div>
      <label class="small muted" for="wf">${t('due.pick')}</label><input class="field" id="wf" type="date" value="${d[st.k] || ''}">`;
  } else {
    body = html`${st.chips && st.chips.length ? html`<div class="chips">${st.chips.map(c => html`<button class="chip" type="button" data-set="${c.v}">${c.label}</button>`)}</div>` : ''}
      <input class="field" id="wf" type="${st.input || 'text'}" ${st.input === 'email' ? 'inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false"' : ''} placeholder="${ph}" value="${d[st.k] || ''}" autocomplete="off" enterkeyhint="${last ? 'done' : 'next'}">`;
  }
  return {
    name: 'wizard', ptr: false, tabs: null, active: key,
    html: html`${crumb(backHref, t('back'))}
${total - sk > 1 ? html`<p class="step">${t('step.of', { n: n - sk, m: total - sk })}</p><div class="bar"><i style="width:${(n - 1 - sk) / (total - sk) * 100}%"></i></div>` : ''}
<h1>${q}</h1><p class="lead">${hint}</p>
${body}
${need('wErr', st.type === 'choice' ? t('need.pick') : (st.badMsg || t('need.text')))}
${st.type === 'choice' ? '' : html`<div class="actions"><button class="btn primary" id="wNext" type="button">${last ? (st.cta || t('save')) : t('next')}${icon('arrow')}</button>${st.opt ? html`<button class="btn quiet" id="wSkip" type="button">${t('skip.step')}</button>` : ''}</div>`}`,
    bind(root) {
      const f = $(root, '#wf');
      const adv = () => { if (last) { const to = finish(drafts[key]); delete drafts[key]; wiz.active = null; go(to); } else go(`${base}/${n + 1}`); };
      if (st.type === 'choice') {
        root.querySelectorAll('.choice').forEach(b => b.addEventListener('click', () => { d[st.k] = b.dataset.v; adv(); }));
        return;
      }
      const sync = () => { d[st.k] = f.value; };
      f.addEventListener('input', sync);
      root.querySelectorAll('[data-set]').forEach(b => b.addEventListener('click', () => { f.value = b.dataset.set; sync(); root.querySelectorAll('[data-set]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); if (st.type !== 'date') f.focus(); }));
      const next = () => {
        const v = f.value.trim();
        if (!v && !st.opt) { const er = $(root, '#wErr'); er.hidden = false; f.focus(); return; }
        if (st.valid && v && !st.valid(v)) { const er = $(root, '#wErr'); er.hidden = false; f.focus(); return; }
        d[st.k] = v; adv();
      };
      $(root, '#wNext').addEventListener('click', next);
      const sk = $(root, '#wSkip'); if (sk) sk.addEventListener('click', () => { d[st.k] = ''; adv(); });
      if (f.tagName === 'INPUT') f.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); next(); } });
    },
  };
}
const dueChips = () => [['due.2w', 14], ['due.1m', 30], ['due.3m', 90]].map(([k, n]) => ({ label: t(k), v: S.addDays(n) }));

export function newEngagement(n) {
  if (S.jobLimitReached()) return limitView();
  const steps = () => {
    const s = [];
    if (!S.workspaceName()) s.push({ k: 'ws' });
    s.push({ k: 'title' }, { k: 'client' }, { k: 'contact', opt: true }, { k: 'end', type: 'date', opt: true, chips: dueChips() });
    return s;
  };
  return stepScreen({ key: 'eng', ns: 'eng', steps, n, base: '/nuovo', exit: '/progetti', init: {},
    finish: d => { if (d.ws) S.setWorkspaceName(d.ws); return '/i/' + S.addEngagement({ title: d.title, client: d.client, contact: d.contact, end: d.end }); } });
}
function limitView() {
  const p = S.currentPlan();
  return { name: 'limit', ptr: true, tabs: null, html: html`${crumb('/progetti', t('back'))}
<section class="card next"><h1 class="h2">${t('lim.reached.h', { plan: planName(p) })}</h1><p class="muted">${t('lim.reached.d', { plan: planName(p), max: PLANS[p].jobs })}</p>
<a class="btn primary" href="#/prezzi">${t('lim.see')}</a></section>` };
}
export function newExpectation(id, n, preset) {
  const e = S.engagement(id); if (!e) return notFound();
  const init = preset === 'team' || preset === 'client' ? { owner: preset } : {};
  if (init.owner && n === 1 && wiz.active !== 'exp:' + id) { drafts['exp:' + id] = { ...init, _skip1: true }; wiz.active = 'exp:' + id; return { redirect: `/i/${id}/attesa/2` }; }
  const steps = d => {
    const side = d.owner === 'client' ? 'client' : 'team';
    const names = side === 'team' ? S.people().map(p => tx(p.name)) : (e.contacts || []).map(c => tx(c.name));
    return [
      { k: 'owner', type: 'choice', opts: [{ v: 'team', label: t('exp.owner.team') }, { v: 'client', label: t('exp.owner.client') }] },
      { k: 'by', opt: true, chips: names.map(x => ({ label: x, v: x })) },
      { k: 'text', qKey: 'exp.text.q.' + side },
      { k: 'measure' },
      { k: 'due', type: 'date', opt: true, chips: dueChips() },
    ];
  };
  return stepScreen({ key: 'exp:' + id, ns: 'exp', steps, n, base: `/i/${id}/attesa`, exit: `/i/${id}/attese`, init: {},
    finish: d => { S.addExpectation(e, { owner: d.owner || 'team', text: d.text, measure: d.measure, due: d.due, by: d.by }); return `/i/${id}/attese`; } });
}
export function newDecision(id, n, query) {
  const e = S.engagement(id); if (!e) return notFound();
  const fm = query.from && S.milestone(e, query.from);
  const init = fm ? { from: { mid: fm.id, mname: tx(fm.name) } } : {};
  const steps = () => [{ k: 'what' }, { k: 'why', type: 'long' }, { k: 'who', chips: [{ label: t('dec.who.both'), v: t('dec.who.both') }, { label: t('dec.who.team'), v: t('dec.who.team') }, { label: t('dec.who.client'), v: t('dec.who.client') }] }, { k: 'alt', type: 'long', opt: true }];
  return stepScreen({ key: 'dec:' + id, ns: 'dec', steps, n, base: `/i/${id}/decisione`, exit: fm ? `/i/${id}/m/${fm.id}` : `/i/${id}/scelte`, init,
    finish: d => { S.addDecision(e, { what: d.what, why: d.why, who: d.who, alt: d.alt, from: d.from }); return `/i/${id}/scelte`; } });
}
/* ───────── modifica ed eliminazione ───────── */
const ed = { key: '', d: null };
function editDraft(key, init) { if (env.lastView !== 'edit' || ed.key !== key) { ed.key = key; ed.d = { ...init }; } return ed.d; }
const fld = (id, label, inner) => html`<div class="fgroup"><label class="flabel" for="${id}">${label}</label>${inner}</div>`;
const chipRow = (list, attr) => (list.length ? html`<div class="chips">${list.map(c => html`<button class="chip" type="button" data-${attr}="${c.v}">${c.label}</button>`)}</div>` : '');
export function editExpectation(id, xid) {
  const e = S.engagement(id), x = e && S.expectationById(e, xid); if (!x) return notFound();
  const d = editDraft('x:' + xid, { text: tx(x.text), by: tx(x.by), measure: tx(x.measure), due: x.due || '' });
  const names = (x.owner === 'team' ? S.people().map(p => tx(p.name)) : (e.contacts || []).map(c => tx(c.name))).map(n => ({ label: n, v: n }));
  const locked = S.expLocked(e, x), back = `/i/${id}/attese`;
  return {
    name: 'edit', ptr: false, tabs: null,
    html: html`${crumb(back, t('back'))}
<h1>${t('ed.exp.h')}</h1><p class="lead">${ownerChip(x.owner)} ${t('ed.exp.lead')}</p>
${fld('f-text', t('ed.l.text'), html`<textarea class="field" id="f-text" rows="3">${d.text}</textarea>`)}
${fld('f-by', t('ed.l.by'), html`${chipRow(names, 'by')}<input class="field" id="f-by" type="text" value="${d.by}" autocomplete="off">`)}
${fld('f-measure', t('ed.l.measure'), html`<input class="field" id="f-measure" type="text" value="${d.measure}" autocomplete="off">`)}
${fld('f-due', t('ed.l.due'), html`${chipRow(dueChips(), 'due')}<input class="field" id="f-due" type="date" value="${d.due}">`)}
<p class="err" id="edErr" role="alert" hidden></p>
<div class="actions col"><button class="btn primary big" id="edSave" type="button">${t('ed.save')}</button><a class="btn" id="edCancel" href="#${back}">${t('ed.cancel')}</a></div>
<div class="dangerzone">${locked ? html`<p class="notice">${t('ed.del.locked')}</p>` : html`<a class="btn quiet danger" id="edDel" href="#/i/${id}/elimina/attesa/${xid}">${icon('missed')}<span>${t('ed.del')}</span></a>`}</div>`,
    bind(root) {
      [['#f-text', 'text'], ['#f-by', 'by'], ['#f-measure', 'measure'], ['#f-due', 'due']].forEach(([sel, k]) => $(root, sel).addEventListener('input', ev => { d[k] = ev.target.value; }));
      root.querySelectorAll('[data-by]').forEach(b => b.addEventListener('click', () => { $(root, '#f-by').value = d.by = b.dataset.by; }));
      root.querySelectorAll('[data-due]').forEach(b => b.addEventListener('click', () => { $(root, '#f-due').value = d.due = b.dataset.due; }));
      $(root, '#edSave').addEventListener('click', () => {
        const err = m => { const n = $(root, '#edErr'); n.textContent = m; n.hidden = false; };
        if (!String(d.text).trim()) { err(t('ed.need.text')); $(root, '#f-text').focus(); return; }
        if (!String(d.measure).trim()) { err(t('ed.need.measure')); $(root, '#f-measure').focus(); return; }
        const changed = S.updateExpectation(e, xid, d); ed.key = '';
        env.flash = changed ? t('ed.saved') : t('ed.nochange'); go(back);
      });
    },
  };
}
export function editDecision(id, did) {
  const e = S.engagement(id), x = e && S.decisionById(e, did); if (!x) return notFound();
  const d = editDraft('d:' + did, { what: tx(x.what), why: tx(x.why), who: tx(x.who), alt: tx(x.alt) });
  const back = `/i/${id}/scelte`;
  const whoChips = [t('dec.who.both'), t('dec.who.team'), t('dec.who.client')].map(v => ({ label: v, v }));
  return {
    name: 'edit', ptr: false, tabs: null,
    html: html`${crumb(back, t('back'))}
<h1>${t('ed.dec.h')}</h1><p class="lead">${t('ed.dec.lead')}</p>
${fld('f-what', t('ed.l.what'), html`<input class="field" id="f-what" type="text" value="${d.what}" autocomplete="off">`)}
${fld('f-why', t('ed.l.why'), html`<textarea class="field" id="f-why" rows="3">${d.why}</textarea>`)}
${fld('f-who', t('ed.l.who'), html`${chipRow(whoChips, 'who')}<input class="field" id="f-who" type="text" value="${d.who}" autocomplete="off">`)}
${fld('f-alt', t('ed.l.alt'), html`<textarea class="field" id="f-alt" rows="3">${d.alt}</textarea>`)}
<p class="err" id="edErr" role="alert" hidden></p>
<div class="actions col"><button class="btn primary big" id="edSave" type="button">${t('ed.save')}</button><a class="btn" id="edCancel" href="#${back}">${t('ed.cancel')}</a></div>
<div class="dangerzone"><a class="btn quiet danger" id="edDel" href="#/i/${id}/elimina/decisione/${did}">${icon('missed')}<span>${t('ed.del')}</span></a></div>`,
    bind(root) {
      [['#f-what', 'what'], ['#f-why', 'why'], ['#f-who', 'who'], ['#f-alt', 'alt']].forEach(([sel, k]) => $(root, sel).addEventListener('input', ev => { d[k] = ev.target.value; }));
      root.querySelectorAll('[data-who]').forEach(b => b.addEventListener('click', () => { $(root, '#f-who').value = d.who = b.dataset.who; }));
      $(root, '#edSave').addEventListener('click', () => {
        if (!String(d.what).trim()) { const n = $(root, '#edErr'); n.textContent = t('ed.need.what'); n.hidden = false; $(root, '#f-what').focus(); return; }
        const changed = S.updateDecision(e, did, d); ed.key = '';
        env.flash = changed ? t('ed.saved') : t('ed.nochange'); go(back);
      });
    },
  };
}
export function confirmDelete(kind, id, oid) {
  const e = S.engagement(id), isExp = kind === 'attesa';
  const x = e && (isExp ? S.expectationById(e, oid) : S.decisionById(e, oid)); if (!x) return notFound();
  if (isExp && S.expLocked(e, x)) return { redirect: `/i/${id}/modifica/attesa/${oid}` };
  const back = isExp ? `/i/${id}/attese` : `/i/${id}/scelte`, editBack = `/i/${id}/modifica/${kind}/${oid}`;
  return {
    name: 'confirm', ptr: false, tabs: null,
    html: html`${crumb(editBack, t('back'))}
<h1>${t(isExp ? 'ed.del.exp.h' : 'ed.del.dec.h')}</h1>
<blockquote class="card quote ${isExp ? x.owner : 'dec'}"><p>${tx(isExp ? x.text : x.what)}</p></blockquote>
<p class="lead">${t('ed.del.d')}</p>
<div class="actions col"><a class="btn primary big" id="delNo" href="#${back}">${t('ed.del.no')}</a><button class="btn big danger" id="delYes" type="button">${t('ed.del.yes')}</button></div>`,
    bind(root) {
      $(root, '#delYes').addEventListener('click', () => {
        const rec = isExp ? S.deleteExpectation(e, oid) : S.deleteDecision(e, oid);
        if (!rec) { go(editBack); return; }
        env.undo = { msg: t(isExp ? 'ed.deleted.exp' : 'ed.deleted.dec'), label: t('ed.undo'), done: t('ed.undone'), fn: () => { S.restoreDeleted(e, rec); env.rerender(); } };
        go(back);
      });
    },
  };
}
export function newMilestone(id, n) {
  const e = S.engagement(id); if (!e) return notFound();
  const steps = () => [{ k: 'name' }, { k: 'date', type: 'date', chips: dueChips(), badMsg: t('need.pick') }];
  return stepScreen({ key: 'mw:' + id, ns: 'mw', steps, n, base: `/i/${id}/tappa`, exit: `/i/${id}`, init: {},
    finish: d => { const m = S.addMilestone(e, { name: d.name, date: d.date }); return `/i/${id}`; } });
}
export function newPerson(n) {
  if (S.userLimitReached()) { const p = S.currentPlan(); return { name: 'limit', ptr: true, tabs: null, html: html`${crumb('/impostazioni', t('back'))}<section class="card next"><h1 class="h2">${t('lim.users.reached', { max: PLANS[p].users, plan: planName(p) })}</h1><a class="btn primary" href="#/prezzi">${t('lim.see')}</a></section>` }; }
  return stepScreen({ key: 'pp', ns: 'pp', steps: () => [{ k: 'name' }, { k: 'role', opt: true }], n, base: '/persona', exit: '/impostazioni', init: {},
    finish: d => { S.addPerson({ name: d.name, role: d.role }); return '/impostazioni'; } });
}

/* ───────── prezzi e prova ───────── */
let billing = 'monthly';
/** La fatturazione parte sempre da «Mensile»; «Annuale» è una scelta da fare ogni volta. */
export const resetBilling = () => { billing = 'monthly'; };
export function pricing() {
  const an = billing === 'annual';
  const acc = Cloud.signedIn() ? Cloud.access() : null, live = !!acc && !acc.admin && (acc.status === 'active' || acc.status === 'past_due');
  const cta = id => (!acc ? `#/prova/${id}` : live || acc.admin ? '#/abbonamento' : `#/abbonamento/conferma/${id}/${billing}`);
  const ctaText = id => (!acc ? t('pr.cta') : live || acc.admin ? t('ac.sub.manage') : t('pr.cta.choose', { plan: planName(id) }));
  const card = id => {
    const p = PLANS[id];
    const feats = [1, 2, 3, 4].map(n => t(`pr.${id}.f${n}`));
    return html`<article class="plan ${p.rec ? 'rec' : ''}" aria-labelledby="pl-${id}">
      ${p.rec ? html`<p class="ribbon">${t('pr.rec')}</p>` : ''}
      <h2 id="pl-${id}">${planName(id)}</h2><p class="muted small">${t('pr.' + id + '.d')}</p>
      <p class="price"><b>${money(an ? annual(id) : p.monthly)}</b> <span>${an ? t('pr.per.year') : t('pr.per.month')}</span></p>
      ${an ? html`<p class="small anx"><span class="strike">${t('pr.instead', { p: money(annualFull(id)) })}</span> · <b>${t('pr.annual.label')}</b> · ${t('pr.annual.badge')}</p>` : html`<p class="small muted">&nbsp;</p>`}
      <ul class="feats">${feats.map(f => html`<li>${icon('met')}<span>${f}</span></li>`)}</ul>
      <a class="btn ${p.rec ? 'primary' : ''}" href="${cta(id)}">${ctaText(id)}</a>
    </article>`;
  };
  const em = mail('invite', 'it', {}); void em;
  return {
    name: 'pricing', ptr: true,
    html: html`<h1>${t('pr.h1')}</h1><p class="lead">${t('pr.lead')}</p>
<div class="toggle" role="radiogroup" aria-label="${t('pr.toggle.aria')}">
  <button type="button" role="radio" id="bm" aria-checked="${String(!an)}">${t('pr.monthly')}</button>
  <button type="button" role="radio" id="ba" aria-checked="${String(an)}">${t('pr.annual')} <span class="badge">${t('pr.annual.badge')}</span></button>
</div>
<div class="plans">${ORDER.map(card)}
  <article class="plan" aria-labelledby="pl-ent"><h2 id="pl-ent">${t('pr.enterprise')}</h2><p class="muted small">${t('pr.enterprise.d')}</p>
    <p class="price"><b>${t('pr.custom')}</b></p><p class="small muted">&nbsp;</p>
    <ul class="feats">${[1, 2, 3].map(n => html`<li>${icon('met')}<span>${t('pr.enterprise.f' + n)}</span></li>`)}</ul>
    <a class="btn" id="entCta" href="mailto:${CONTACT}?subject=${encodeURIComponent(t('pr.ent.subject'))}&body=${encodeURIComponent(t('pr.ent.body'))}">${t('pr.ent.cta')}</a></article>
</div>
<p class="muted center">${t('pr.trial.note')}</p>
<p class="small muted center">${t('pr.final')}</p>`,
    bind(root) {
      $(root, '#bm').addEventListener('click', () => { billing = 'monthly'; env.rerender(); });
      $(root, '#ba').addEventListener('click', () => { billing = 'annual'; env.rerender(); });
    },
  };
}
/* ───────── impostazioni, email, nota ───────── */
let wipeArm = false;
export function settings() {
  const p = S.currentPlan(), pl = PLANS[p], ppl = S.people();
  return {
    name: 'settings', ptr: true,
    html: html`${crumb('/progetti', t('hdr.projects'))}<h1>${t('st.h1')}</h1>
<section class="card"><h2 class="h2s">${t('st.plan')}</h2><p><b>${Cloud.signedIn() ? '' : t('plan.demo', { plan: planName(p) })}</b></p>${usageLine()}<a class="btn quiet" href="#/prezzi">${t('st.plans')}</a></section>
${accountCards()}
<section class="card"><label for="ws" class="h2s">${t('st.ws')}</label><input id="ws" class="field" value="${S.workspaceName()}" placeholder="${t('st.ws.ph')}" autocomplete="off"><div class="actions"><button class="btn primary" id="wsSave" type="button">${t('st.save')}</button></div></section>
<section class="card"><h2 class="h2s">${t('st.people')}</h2><p class="small muted">${t('lim.users', { n: ppl.length, max: pl.users })}</p>
  ${ppl.length ? html`<ul class="people">${ppl.map(x => html`<li class="person"><span class="av" aria-hidden="true">${initials(tx(x.name))}</span><span class="grow"><b>${tx(x.name)}</b>${tx(x.role) ? html`<br><span class="small muted">${tx(x.role)}</span>` : ''}</span><button class="btn quiet sm" type="button" data-rm="${x.id}" aria-label="${t('close')}: ${tx(x.name)}">${icon('missed')}</button></li>`)}</ul>` : html`<p class="muted">${t('pp.none')}</p>`}
  <a class="btn quiet" href="#/persona/1">${icon('plus')}<span>${t('pp.add')}</span></a></section>
<section class="card"><h3>${t('st.emails')}</h3><p class="small muted">${t('st.emails.d')}</p><a class="btn quiet" href="#/email">${t('st.emails')}</a></section>
<section class="card"><h3>${t('st.note')}</h3><a class="btn quiet" href="#/nota">${t('st.note')}</a></section>
<section class="card"><button class="btn quiet" id="reDemo" type="button">${t('st.demo')}</button><p class="small muted">${t('st.demo.d')}</p>
  <button class="btn quiet" id="dl" type="button">${icon('download')}<span>${t('st.export')}</span></button><p class="small muted">${t('st.export.d')}</p>
  <button class="btn quiet danger" id="wipe" type="button">${wipeArm ? t('st.wipe.sure') : t('st.wipe')}</button><p class="small muted">${t(Cloud.signedIn() ? 'st.wipe.d.in' : 'st.wipe.d')}</p></section>
<p class="small muted center">${t('st.ver', { v: '1.2.0' })}</p>`,
    bind(root) {
      bindAccount(root);
      $(root, '#wsSave').addEventListener('click', () => { Cloud.setTeamName($(root, '#ws').value); toast(t('st.saved')); });
      root.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { S.removePerson(b.dataset.rm); env.rerender(); }));
      $(root, '#reDemo').addEventListener('click', () => { S.seedDemo(true); go('/i/demo'); });
      $(root, '#dl').addEventListener('click', () => download('altravi-team-dati.json', JSON.stringify(S.get(), null, 2), 'application/json'));
      $(root, '#wipe').addEventListener('click', () => { if (!wipeArm) { wipeArm = true; env.rerender(); return; } wipeArm = false; S.wipe(); go('/'); });
    },
  };
}
let emLang = '';
export function emails() {
  emLang = emLang || getLang();
  const v = { team: 'Studio Meridiana', client: 'Hotel Bellavista', contact: 'Marco', sender: 'Elena', job: emLang === 'it' ? 'Nuovo sito web' : 'Website redesign', milestone: emLang === 'it' ? 'Design approvato' : 'Design approved', link: 'https://altravi.com/#/c/…', score: 83, level: emLang === 'it' ? 'quasi allineati' : 'nearly aligned', gaps: emLang === 'it' ? '- Due giri di correzioni inclusi: team Raggiunta / cliente In parte' : '- Two rounds of corrections included: team Met / client Partly', plan: 'Team', date: fmtTs(Date.now() + TRIAL_DAYS * 86400000), days: 3, email: '' };
  return {
    name: 'emails', ptr: true,
    html: html`${crumb('/impostazioni', t('st.h1'))}<h1>${t('em.h1')}</h1><p class="lead">${t('em.lead')}</p>
<div class="toggle" role="radiogroup" aria-label="${t('em.lang')}"><button type="button" role="radio" data-l="it" aria-checked="${String(emLang === 'it')}">Italiano</button><button type="button" role="radio" data-l="en" aria-checked="${String(emLang === 'en')}">English</button></div>
<ul class="cards">${EMAIL_IDS.map(id => { const m = mail(id, emLang, v); return html`<li class="card"><h2 class="h2s">${t('em.t.' + id)}</h2><p class="small muted">${t('em.subject')}</p><p><b>${m.subject}</b></p><pre class="mailbody" tabindex="0">${m.body}</pre><button class="btn quiet" type="button" data-cp="${id}">${t('em.copy')}</button></li>`; })}</ul>`,
    bind(root) {
      root.querySelectorAll('[data-l]').forEach(b => b.addEventListener('click', () => { emLang = b.dataset.l; env.rerender(); }));
      root.querySelectorAll('[data-cp]').forEach(b => b.addEventListener('click', async () => { const m = mail(b.dataset.cp, emLang, v); try { await navigator.clipboard.writeText(m.subject + '\n\n' + m.body); toast(t('em.copied')); } catch { /* ignore */ } }));
    },
  };
}
export function nota() {
  return { name: 'nota', ptr: true, html: html`${crumb('/', t('err.home'))}<h1>${t('nt.h1')}</h1><p>${t('nt.p1')}</p><p>${t('nt.p2')}</p><p>${t('nt.p3')}</p><p>${t('nt.p4')}</p>` };
}
export function notFound() {
  return { name: '404', ptr: true, html: html`<h1>${t('err.404')}</h1><div class="actions"><a class="btn primary" href="#/">${t('err.home')}</a></div>` };
}

/* ───────── vista cliente ───────── */
const cvBar = cv => html`<p class="cvbar">${icon('user')}<span>${t('cl.banner', { c: cv.snap.c })}</span></p>`;
const cvExps = (sn, ids) => (ids ? sn.x.filter(r => ids.includes(r[0])) : sn.x).map(r => ({ id: r[0], owner: r[1] === 0 ? 'team' : 'client', text: r[2], measure: r[3], due: r[4], by: r[5] }));
const noCV = () => ({ name: 'client-empty', ptr: true, client: true, html: html`<h1>${t('cl.empty')}</h1><div class="actions"><a class="btn primary" href="#/">${t('err.home')}</a></div>` });
function cvBack(cv) { return S.engagement(cv.snap.e) ? (cv.snap.m ? `/i/${cv.snap.e}/m/${cv.snap.m}` : `/i/${cv.snap.e}/attese`) : '/'; }
const cvLeave = cv => html`<p class="center"><a class="btn quiet" href="#${cvBack(cv)}">${t('cl.back')}</a></p>`;

export function clientWelcome() {
  const cv = S.loadCV(); if (!cv) return noCV();
  if (cv.done) return { redirect: '/cliente/fine' };
  const sn = cv.snap, review = !sn.m;
  const exps = cvExps(sn, review ? null : sn.ids);
  const list = (o, items) => html`<div class="side ${o}"><p class="small kick ${o}-k">${t('ex.' + o + '.h')}</p><ul class="cards">${items.map(x => html`<li class="card exp ${o}"><p class="exp-t">${x.text}</p>${x.measure ? html`<p class="small"><b>${t('ex.measure')}:</b> ${x.measure}</p>` : ''}</li>`)}</ul></div>`;
  return {
    name: 'client', ptr: true, client: true,
    html: html`${cvBar(cv)}<h1>${t('cl.hi', { name: '' })}</h1>
<p class="lead">${review ? t('cl.rv.intro', { team: sn.w, t: sn.ti }) : t('cl.intro', { team: sn.w, m: sn.mn })}</p><p class="muted">${review ? t('cl.rv.d') : t('cl.intro.d')}</p>
${review ? '' : html`<div class="actions"><button class="btn primary" id="cvStart" type="button">${t('cl.start')}${icon('arrow')}</button></div>`}
<h2 class="h2s">${t('cl.seen')}</h2>
<div class="grid2">${list('team', exps.filter(x => x.owner === 'team'))}${list('client', exps.filter(x => x.owner === 'client'))}</div>
${review ? html`<label class="small muted" for="rvn">${t('cl.rv.note')}</label><textarea class="field" id="rvn" rows="3" placeholder="${t('cl.rv.note.ph')}">${cv.note || ''}</textarea>
<div class="actions"><button class="btn primary" id="cvOk" type="button">${t('cl.rv.ok')}${icon('arrow')}</button></div>` : (sn.d && sn.d.length ? html`<h2 class="h2s">${t('cl.decs')}</h2><ul class="cards">${sn.d.map(d => html`<li class="card dec"><h3>${d[0]}</h3>${d[1] ? html`<p class="small muted">${d[1]}</p>` : ''}</li>`)}</ul>` : '')}
${cvLeave(cv)}`,
    bind(root) {
      const s = $(root, '#cvStart'); if (s) s.addEventListener('click', () => go('/cliente/1'));
      const ok = $(root, '#cvOk'); if (ok) ok.addEventListener('click', () => { cv.note = $(root, '#rvn').value.trim(); S.saveCV(cv); go('/cliente/chi'); });
    },
  };
}
export function clientStep(n) {
  const cv = S.loadCV(); if (!cv || !cv.snap.m) return noCV();
  const exps = cvExps(cv.snap, cv.snap.ids);
  const r = checkinView({
    exps, n, draftKey: 'cv', ans: cv.answers || {}, who: 'client', back: '/cliente',
    nextHref: k => `/cliente/${k}`,
    saveAns: (xid, v) => { cv.answers = cv.answers || {}; cv.answers[xid] = v; S.saveCV(cv); },
    onFinish: () => go('/cliente/chi'),
    crumbHtml: html`${cvBar(cv)}${crumb(n > 1 ? `/cliente/${n - 1}` : '/cliente', t('back'))}`,
  });
  r.client = true; return r;
}
export function clientWho() {
  const cv = S.loadCV(); if (!cv) return noCV();
  const sn = cv.snap;
  const r = stepScreen({ key: 'cvwho', ns: 'cl', steps: () => [{ k: 'who', pre: 'cl.who', opt: true, chips: (sn.cs || []).map(c => ({ label: c, v: c })), cta: t('cl.send') }], n: 1, base: '/cliente/chi', exit: sn.m ? `/cliente/${cvExps(sn, sn.ids).length}` : '/cliente', init: { who: cv.by || '' },
    finish: d => { cv.by = d.who || ''; cv.done = true; S.saveCV(cv); return '/cliente/fine'; } });
  if (r.html) r.html = html`${cvBar(cv)}${r.html}`;
  r.client = true; return r;
}
function clientDoneCloud(cv) {
  const sn = cv.snap, review = !sn.m;
  const panel = (h, d, retry) => html`<h1>${h}</h1><p class="lead">${d}</p>${retry ? html`<div class="actions"><button class="btn primary" id="cvRetry" type="button"><span>${t('ac.cl.retry')}</span></button></div>` : ''}${cvLeave(cv)}`;
  return {
    name: 'client-done', ptr: false, client: true,
    html: html`${cvBar(cv)}<div id="cdBox">${cv.sent ? panel(t('ac.cl.sent.h'), t('ac.cl.sent.d')) : html`<h1>${t('ac.cl.sending')}</h1><p class="spin" aria-hidden="true"></p>`}</div>`,
    async bind(root) {
      if (cv.sent) return;
      const box = $(root, '#cdBox');
      const send = async () => {
        box.innerHTML = html`<h1>${t('ac.cl.sending')}</h1><p class="spin" aria-hidden="true"></p>`.s;
        const answers = Object.fromEntries(Object.entries(cv.answers || {}).map(([k, v]) => [k, [v.r, v.note || '']]));
        const r = await Cloud.clientSend(cv.cloud, { by: cv.by || '', note: review ? (cv.note || '') : '', answers });
        let out;
        if (r.ok) { cv.sent = true; S.saveCV(cv); out = panel(t('ac.cl.sent.h'), t('ac.cl.sent.d')); }
        else if (r.code === 'ALREADY_ANSWERED') { cv.sent = true; S.saveCV(cv); out = panel(t('ac.cl.already.h'), t('ac.cl.already.d')); }
        else if (r.code === 'PAUSED') out = panel(t('ac.cl.paused.h'), t('ac.cl.paused.d'));
        else out = panel(t('ac.cl.fail.h'), t('ac.cl.fail.d'), true);
        box.innerHTML = out.s;
        const rb = $(box, '#cvRetry'); if (rb) rb.addEventListener('click', send);
      };
      send();
    },
  };
}
export function clientDone() {
  const cv = S.loadCV(); if (!cv || !cv.done) return noCV();
  if (cv.cloud) return clientDoneCloud(cv);
  const sn = cv.snap, review = !sn.m;
  const rep = () => ({ v: 1, e: sn.e, m: sn.m || '', t: sn.k || '', by: cv.by || '', rv: review ? 1 : 0, n: cv.note || '', a: Object.fromEntries(Object.entries(cv.answers || {}).map(([k, v]) => [k, [v.r, v.note || '']])) });
  return {
    name: 'client-done', ptr: true, client: true,
    html: html`${cvBar(cv)}<h1>${review ? t('cl.rv.done.h') : t('cl.done.h')}</h1><p class="lead">${t('cl.done.d')}</p>
<div class="actions col"><button class="btn primary" id="cvSend" type="button">${icon('share')}<span>${t('cl.send')}</span></button></div>
${shareBox()}
<p><button class="btn quiet" id="cvOpen" type="button">${t('cl.open.team')}</button></p>
${cvLeave(cv)}`,
    bind(root) {
      bindShare(root, '#cvSend', () => linkFor('r', rep()), () => ({ title: t('cl.send'), text: review ? t('cl.rv.send.text') : t('cl.send.text', { m: sn.mn }), mail: { subject: '', body: '' } }));
      $(root, '#cvOpen').addEventListener('click', async () => { location.hash = '#/r/' + (await linkFor('r', rep())).split('#/r/')[1]; });
    },
  };
}

export { crumb, need, $, money, planName, usageLine };
