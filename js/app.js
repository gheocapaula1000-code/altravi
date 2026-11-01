import { t, getLang, setLang, onLang, locale, LANGS, LANG_NAMES, region } from './i18n/index.js';
import { store, DAY_MS } from './store.js';
import { generateForks, generateForksSmart, aiEligible, classifyText, detectCrisis, forkSetFor, preview, nextAdvice, isDaily, dailyHorizons, DAILY_CATS, dailyExample, dailyColor } from './engine/index.js';
import { dailySign, checkinText } from './engine/advice.js';
import { AI } from './config.js';
import { initPWA } from './pwa.js';
import { content, evidence, HORIZONS, rankEvidence } from './content/index.js';
import { moonPhase, coincidencesFor, coincidencesAll, fmtDate, fmtTime, fmtDay, fmtShort, fmtOn } from './signals.js';
import { h, svg, FORK_COLORS, humanize, remainingMs, evBadge, showEvidence, shortSource, downloadICS, prefersReduced, sleep } from './ui.js';

const view = document.getElementById('view');
let cleanup = [];            // funzioni da eseguire al cambio vista
let pendingText = null;      // testo in elaborazione (vista "pensa")
let deferredInstall = null;
let quiet = false;
let firstRoute = true;    // al primo caricamento il focus resta all'inizio (il primo Tab raggiunge «Vai al contenuto»)           // true durante il cambio lingua: niente animazioni cinematiche, niente furto del focus

/* ───────── utilità ───────── */
const go = hash => { if (location.hash === hash) route(); else location.hash = hash; };
const C = () => content();
const hzL = (hz, kind = '') => t('hz.' + hz.key + (kind ? '.' + kind : ''));
// Orizzonti di un ForkSet: lunghi (1 giorno · 1 settimana · 3 mesi · 1 anno) o, per le scelte di ogni giorno, brevi (tra 1 ora · stasera · domani mattina).
const hzs = (fs, at = Date.now()) => (isDaily(fs) ? dailyHorizons(at) : HORIZONS);
const lineHz = line => hzs(fsOf(line), line.choiceAt);
const lineLight = line => {
  const el = store.elapsedDays(line), list = lineHz(line);
  const unlocked = list.filter(x => el >= x.days).length;
  const noted = Object.values(line.signs || {}).filter(Boolean).length;
  return Math.min(1, 0.25 + 0.75 * (unlocked + noted) / (2 * list.length));
};
// ForkSet di una linea nella lingua corrente (i titoli scritti dall'utente restano intatti)
const fsCache = new Map();
const fsOf = line => {
  const key = line.id + ':' + getLang();
  if (!fsCache.has(key)) fsCache.set(key, forkSetFor(line.forkSet));
  return fsCache.get(key);
};
const chosenFork = line => fsOf(line).forks.find(f => f.id === line.chosenForkId);
const colorOf = id => FORK_COLORS[id] || '#ffb84d';
const mount = (...nodes) => { view.replaceChildren(h('div', { class: 'view' }, ...nodes)); };
const focusMain = () => {
  const h1 = view.querySelector('h1');
  const el = h1 || view;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true }); window.scrollTo(0, 0);
};
const textSizeApply = () => {
  const big = store.state.settings.bigText;
  document.documentElement.classList.toggle('big', big);
  const b = document.getElementById('textSize');
  b.setAttribute('aria-pressed', String(big));
  const lbl = document.getElementById('textSizeLbl'); if (lbl) lbl.textContent = big ? t('text.smaller') : t('text.bigger');
};
const chipEl = c => h('span', { class: 'cap ' + c.kind }, c.text);
const catLabel = id => (C().CATEGORIES[id] || { label: id }).label;
const signOf = (key) => (C().SIGNS[key] || dailySign(key, getLang()));
const openLabel = (line, hz) => `${hzL(hz)}`;

/** Testi statici dell'index.html (tab, footer, titolo) nella lingua corrente. */
function applyStatic() {
  document.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(n => n.setAttribute('aria-label', t(n.dataset.i18nAria)));
  document.title = t('page.title');
  const d = document.querySelector('meta[name=description]'); if (d) d.setAttribute('content', t('page.desc'));
  const ls = document.getElementById('langSel');
  if (ls) {
    if (!ls.options.length) LANGS.forEach(l => { const o = h('option', { value: l, lang: l }, LANG_NAMES[l]); ls.append(o); });
    ls.value = getLang(); ls.setAttribute('aria-label', t('lang.label'));
  }
  textSizeApply();
}

/* ───────── vista: chiedi (la prima schermata) ───────── */
function viewAsk(query) {
  const from = query.get('da') ? store.getLine(query.get('da')) : null;
  const draft = store.state.draft;
  const ta = h('textarea', { class: 'field', id: 'q', rows: '2', maxlength: '240', placeholder: t('ask.placeholder'), 'aria-label': t('ask.free'), 'aria-describedby': 'askhint err', autocomplete: 'off', autocapitalize: 'sentences', enterkeyhint: 'go' });
  ta.value = sessionStorage.getItem('altravi.ask') || '';
  const err = h('p', { class: 'err', id: 'err', role: 'alert' });
  const submit = () => {
    const text = ta.value.trim();
    if (text.length < 3) { err.textContent = t('ask.empty'); ta.focus(); return; }
    sessionStorage.setItem('altravi.ask', '');
    if (detectCrisis(text)) { go('#/cura'); return; }
    pendingText = { text, parent: from ? from.id : null };
    go('#/pensa');
  };
  ta.addEventListener('input', () => { err.textContent = ''; sessionStorage.setItem('altravi.ask', ta.value); });
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
  // domande di ogni giorno: un tocco e parte (porte + consiglio)
  const daily = ['cena', 'serata', 'messaggio', 'outfit', 'palestra', 'compra'].map(id => {
    const q = dailyExample(id, getLang());
    return h('button', { class: 'chip', type: 'button', 'data-daily': id, style: `--c:${dailyColor(id)}`, onclick: () => { ta.value = q; submit(); } }, h('i', { 'aria-hidden': 'true' }), q);
  });
  const big = Object.entries(C().CATEGORIES).filter(([id]) => id !== 'altro').map(([id, c]) =>
    h('button', { class: 'chip', type: 'button', style: `--c:${c.color}`, onclick: () => { ta.value = c.example; err.textContent = ''; ta.focus(); } }, h('i', { 'aria-hidden': 'true' }), c.label));
  // il battito d'ali: due ali = due strade (ambra e verde acqua), disegnate come linee di luce; si accendono mentre scrivi
  const wing = (sx, col, cls) => svg('g', sx < 0 ? { transform: 'translate(200 0) scale(-1 1)' } : {}, svg('g', { class: 'wing ' + cls, style: `color:${col}` },
    svg('path', { d: 'M99 40 C 90 12, 52 2, 31 14 C 18 23, 34 44, 99 45', stroke: col }),
    svg('path', { d: 'M99 47 C 80 49, 56 60, 62 73 C 69 82, 92 68, 99 52', stroke: col }),
    svg('path', { d: 'M99 41 C 80 28, 58 22, 44 26', stroke: col, class: 'vein' })));
  const splitSvg = svg('svg', { class: 'hero-split wings', viewBox: '0 0 200 88', 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'xMidYMid meet' },
    wing(1, '#ffb84d', 'wl'), wing(-1, '#4fd1c5', 'wr'),
    svg('path', { d: 'M100 32 L100 66', stroke: '#f3eefc', class: 'body' }),
    svg('path', { d: 'M100 32 C 98 24, 94 20, 90 18 M100 32 C 102 24, 106 20, 110 18', stroke: '#f3eefc', class: 'vein' }));
  ta.addEventListener('input', () => splitSvg.classList.toggle('awake', ta.value.length > 0));
  mount(h('section', { class: 'hero' },
    splitSvg,
    from ? h('p', { class: 'kicker' }, t('ask.from', { title: chosenFork(from).title })) : h('p', { class: 'kicker' }, t('ask.kicker')),
    from ? h('h1', null, t('ask.title')) : h('h1', { class: 'quote' }, h('span', { class: 'q1' }, t('ask.quote1')), ' ', h('span', { class: 'q2' }, t('ask.quote2'))),
    from ? null : h('h2', { class: 'ask-q' }, t('ask.title')),
    h('p', { class: 'lead', id: 'askhint' }, t('ask.hint')),
    ta, err,
    h('div', { class: 'row' },
      h('button', { class: 'btn primary big', type: 'button', id: 'go', onclick: submit }, t('ask.cta')),
      draft && h('a', { class: 'btn', href: '#/porte' }, t('ask.resume'))),
    h('p', { class: 'promise' }, t('ask.promise')),
    h('p', { class: 'muted small', style: 'margin:1rem 0 .2rem' }, t('ask.examples')),
    h('div', { class: 'chips', id: 'dailyChips' }, daily),
    h('details', { class: 'more' }, h('summary', null, t('ask.big')), h('div', { class: 'chips' }, big)),
  ));
  if (!prefersReduced() && !quiet) setTimeout(() => { if (document.activeElement === document.body || document.activeElement === view || view.contains(document.activeElement)) ta.focus({ preventScroll: true }); }, 700);
}

/** Attesa dell'AI: breve, rassicurante, con una via d'uscita sempre visibile («Resta sul telefono» → consiglio locale subito). */
function mountAiWait(ctl, isGone) {
  const live = h('p', { class: 'think-live', role: 'status', 'aria-live': 'polite' }, t('ai.wait'));
  const stay = h('button', { class: 'btn primary big', type: 'button', id: 'aiStay', onclick: () => { stay.disabled = true; live.textContent = t('ai.stay.now'); ctl.abort(); } }, t('ai.stay'));
  mount(h('section', { class: 'think ai-wait' }, h('div', { class: 'think-in' },
    h('div', { class: 'lightline', 'aria-hidden': 'true' }),
    h('h1', { class: 'ai-wait-h' }, t('ai.wait.title')),
    live,
    h('p', { class: 'muted' }, t('ai.wait.sub')),
    h('p', { class: 'ai-actions-one' }, stay))));
  setTimeout(() => stay.focus({ preventScroll: true }), 50);
  setTimeout(() => { if (!isGone() && !ctl.signal.aborted) live.textContent = t('ai.wait.long'); }, 9000);
}

/** Consenso esplicito prima che il testo lasci il telefono: mostra ESATTAMENTE cosa verrebbe inviato. */
function askAiConsent(text) {
  return new Promise(resolve => {
    const done = v => resolve(v);
    const first = h('button', { class: 'btn primary big', type: 'button', id: 'aiOnce', onclick: () => done('once') }, t('ai.ask.once'));
    mount(h('section', { class: 'card ai-consent', 'aria-labelledby': 'aiT' },
      h('p', { class: 'kicker' }, t('ask.kicker')),
      h('h1', { id: 'aiT' }, t('ai.ask.title')),
      h('p', { class: 'lead' }, t('ai.ask.body')),
      h('p', { class: 'muted small' }, t('ai.ask.sent')),
      h('blockquote', { class: 'ai-sent' }, text.trim()),
      h('div', { class: 'row ai-actions' },
        first,
        h('button', { class: 'btn', type: 'button', id: 'aiAlways', onclick: () => done('always') }, t('ai.ask.always')),
        h('button', { class: 'btn', type: 'button', id: 'aiLocal', onclick: () => done('local') }, t('ai.ask.local'))),
      h('p', { class: 'promise' }, t('ai.ask.promise')),
      h('p', { class: 'muted small' }, h('button', { class: 'linkbtn', type: 'button', id: 'aiNever', onclick: () => done('never') }, t('ai.ask.never')), ' · ', h('a', { href: 'privacy.html' }, t('ai.ask.privacy')))));
    setTimeout(() => first.focus({ preventScroll: true }), 50);
  });
}

/* ───────── vista: pensa (le tue parole entrano nella luce, poi la linea si divide) ───────── */
async function viewThink() {
  if (!pendingText) { go('#/nuovo'); return; }
  const job = pendingText;
  let done = false, timer, ctl = null, left = false;
  const reduced = prefersReduced();
  const pv = preview(job.text);
  const words = job.text.split(/\s+/).slice(0, 14);
  const finish = async () => {
    if (done) return; done = true; clearTimeout(timer);
    try {
      // Consiglio AI di riserva: SOLO se il motore locale non riconosce la domanda, l'AI è attiva e l'utente acconsente (esplicitamente).
      let useAI = false;
      if (!detectCrisis(job.text) && aiEligible(job.text, classifyText(job.text))) {
        const c = store.state.settings.aiConsent;
        if (c === 'always') useAI = true;
        else if (c !== 'never') {
          const ch = await askAiConsent(job.text);
          if (ch === 'always' || ch === 'never') store.setSetting('aiConsent', ch);
          useAI = ch === 'once' || ch === 'always';
        }
        if (useAI) { ctl = new AbortController(); mountAiWait(ctl, () => left); }
      }
      const fs = await generateForksSmart({ text: job.text }, { useAI, signal: ctl && ctl.signal });
      if (left) return;   // l'utente ha cambiato schermata mentre aspettava: nessun salto a sorpresa
      store.setDraft(fs, job.parent);
      pendingText = null;
      go('#/porte');
    } catch (e) {
      console.error(e); pendingText = null; go('#/nuovo');
    }
  };
  const wordEls = words.map((w, i) => h('span', { class: 'w', style: `animation-delay:${(i * 0.07).toFixed(2)}s` }, w + ' '));
  const chipsAll = pv.chips.slice(0, 5);
  const chipEls = chipsAll.map((c, i) => h('span', { class: 'cap pop ' + c.kind, style: `animation-delay:${(0.5 + i * 0.15).toFixed(2)}s` }, c.text));
  if (pv.options) chipEls.unshift(h('span', { class: 'cap pop opts', style: 'animation-delay:.35s' }, `${pv.options.a} · ${pv.options.b}`));
  mount(h('section', { class: 'think' }, h('div', { class: 'think-in' },
    h('div', { class: 'lightline', 'aria-hidden': 'true' }),
    h('p', { class: 'think-q', 'aria-hidden': 'true' }, wordEls),
    h('p', { class: 'think-live', role: 'status' }, t('think.live') + '…'),
    chipEls.length ? h('div', { class: 'think-chips', 'aria-hidden': 'true' }, h('span', { class: 'think-lbl' }, t('think.caught') + ':'), chipEls) : null,
    h('p', { class: 'think-skip' }, h('button', { class: 'btn', type: 'button', onclick: finish }, t('think.skip'))),
  )));
  const total = 1000 + Math.min(chipEls.length, 4) * 80;
  timer = setTimeout(finish, reduced || quiet ? 400 : total);
  cleanup.push(() => { done = true; left = true; clearTimeout(timer); if (ctl) ctl.abort(); });
}

/* ───────── vista: le porte ───────── */
function forkPaths(fs, p, showC) {
  const n = showC ? 3 : 2;
  const targets = n === 3 ? [50, 150, 250] : [75, 225];
  const order = n === 3 ? ['a', 'c', 'b'] : ['a', 'b'];
  const y0 = 12 + (1 - p) * 26; // le linee si separano prima, man mano che il tempo scorre
  return order.map((id, i) => {
    const x = targets[i];
    return { id, d: `M150 4 L150 ${y0.toFixed(1)} C150 ${(y0 + 44).toFixed(1)} ${x} ${(y0 + 20).toFixed(1)} ${x} 116` };
  });
}

function viewForks() {
  const draft = store.state.draft;
  if (!draft) { go('#/nuovo'); return; }
  const fs = forkSetFor(draft.forkSet);
  const daily = isDaily(fs), HZ = hzs(fs), N = HZ.length - 1;
  const P = fs.personal || { chips: [], forkNotes: {}, horizonNotes: {}, intro: null, mark: null };
  const now = Date.now();
  const reduced = prefersReduced() || quiet;
  let hIdx = 0, thirdShown = false, interacted = false;

  // SVG delle linee che si dividono
  const pathEls = {};
  const lines = svg('svg', { class: 'fork-lines', viewBox: '0 0 300 120', 'aria-hidden': 'true', preserveAspectRatio: 'none' });
  const glowEls = {};
  fs.forks.forEach(f => {
    const g = svg('path', { class: 'glow', stroke: colorOf(f.id) }); const p = svg('path', { stroke: colorOf(f.id), style: `color:${colorOf(f.id)}` });
    glowEls[f.id] = g; pathEls[f.id] = p; lines.append(g, p);
    if (f.hidden) { g.style.opacity = 0; p.style.opacity = 0; }
  });
  const drawLines = (p) => {
    forkPaths(fs, p, thirdShown).forEach(({ id, d }) => {
      pathEls[id].setAttribute('d', d); glowEls[id].setAttribute('d', d);
      if (!(fs.forks.find(f => f.id === id).hidden && !thirdShown)) { pathEls[id].style.opacity = 1; glowEls[id].style.opacity = .18; }
    });
  };

  // schede-porta
  const nowBoxes = {};
  const renderNow = (fork, animate) => {
    const hz = HZ[hIdx], d = fork.horizons[hz.key];
    const box = nowBoxes[fork.id];
    const hn = (P.horizonNotes && P.horizonNotes[hz.key]) || [];
    const fill = () => box.replaceChildren(...[
      h('div', { class: 'when' }, `${t('fork.tends')} · ${hzL(hz)}`),
      h('p', null, d.text),
      h('div', { class: 'row', style: 'gap:.5rem' },
        h('span', { class: 'feel', 'aria-label': `${t('fork.feel')}: ${d.feel}` }, d.feel),
        evBadge(d.ev)),
      hn.length ? h('div', { class: 'hnote' }, hn.map(n => h('p', null, n))) : null].filter(Boolean));
    if (animate && !reduced) { box.classList.add('swap'); setTimeout(() => { fill(); box.classList.remove('swap'); }, 180); } else fill();
  };
  const doorCard = (fork) => {
    const c = colorOf(fork.id);
    const box = h('div', { class: 'now', 'aria-live': 'polite' }); nowBoxes[fork.id] = box;
    const notes = (P.forkNotes && P.forkNotes[fork.id]) || [];
    const card = h('article', { class: 'door', style: `--c:${c}`, 'data-fork': fork.id, 'aria-label': t('fork.door', { l: fork.id.toUpperCase(), title: fork.title }) },
      h('div', { class: 'door-top' }, h('span', { class: 'letter', 'aria-hidden': 'true' }, fork.id.toUpperCase()),
        h('div', null, h('h3', null, fork.title), h('p', { class: 'tag' }, fork.tagline))),
      notes.length ? h('div', { class: 'for-you' }, h('b', null, t('fork.foryou')), notes.map(n => h('p', null, n))) : null,
      box,
      h('details', { class: 'needs' }, h('summary', null, t(daily ? 'fork.needs.daily' : 'fork.needs')), h('ul', null, fork.supports.map(s => h('li', null, s)))),
      fork.evidence.length ? h('details', { class: 'needs' }, h('summary', null, t('fork.sources')),
        h('ul', null, fork.evidence.map(id => h('li', null, h('button', { class: 'badge srcbtn', type: 'button', onclick: () => showEvidence(id) }, evidence(id).headline))))) : null,
      h('button', { class: 'btn primary block', type: 'button', 'data-choose': fork.id, onclick: ev => enterDoor(ev, fork) }, t('fork.choose')),
    );
    renderNow(fork, false);
    return card;
  };

  // i due futuri, uno accanto all'altro: la differenza si vede a colpo d'occhio
  const marksEl = h('div', { class: 'marks', 'aria-hidden': 'true' });
  const firstSentence = (x) => { const m = x.match(/^.*?[.!?](\s|$)/); const f = (m ? m[0] : x).trim(); return f.length > 96 ? f.slice(0, 93).trim() + '…' : f; };
  const renderMarks = () => {
    const hz = HZ[hIdx];
    const order = (thirdShown ? ['a', 'c', 'b'] : ['a', 'b']).map(id => fs.forks.find(f => f.id === id)).filter(Boolean);
    marksEl.style.setProperty('--n', order.length);
    marksEl.replaceChildren(...order.map(f => {
      const d = f.horizons[hz.key];
      return h('div', { class: 'mk', style: `--c:${colorOf(f.id)}` },
        h('i', { class: 'mk-orb' }), h('b', { class: 'mk-feel' }, d.feel), h('span', { class: 'mk-name' }, f.title), h('p', { class: 'mk-txt' }, firstSentence(d.text)));
    }));
    whenEl.textContent = t('fork.diverge', { when: hzL(hz) });
  };
  const whenEl = h('p', { class: 'diverge-when' });
  const doorsEl = h('div', { class: 'doors', id: 'doors' });
  fs.forks.filter(f => !f.hidden).forEach(f => doorsEl.append(doorCard(f)));

  const third = fs.forks.find(f => f.hidden);
  const thirdBox = h('div');

  // Il mio consiglio: dopo le porte. «Un altro consiglio» scorre le versioni senza cambiare le porte.
  const adviceBox = h('section', { class: 'advice', id: 'advice', 'aria-labelledby': 'advH' });
  const markRec = pick => {
    doorsEl.querySelectorAll('.rec').forEach(n => n.remove());
    const card = doorsEl.querySelector(`[data-fork="${pick}"] .door-top`);
    if (card) card.append(h('span', { class: 'rec' }, t('advice.rec'), h('span', { class: 'sr' }, ' · ' + t('advice.rec.sr'))));
  };
  const renderAdvice = (adv, animate) => {
    if (!adv) { adviceBox.replaceChildren(); return; }
    adviceBox.classList.toggle('swap', !!animate);
    adviceBox.replaceChildren(
      h('h2', { id: 'advH', class: 'advice-h' }, h('span', { class: 'advice-lbl' }, t('advice.label') + ':'), ' ', adv.headline),
      h('div', { class: 'advice-cols' },
        h('div', null, h('h3', null, t('advice.why')), h('ul', null, adv.why.map(w => h('li', null, w)))),
        h('div', null, h('h3', null, t('advice.step')), h('p', { class: 'advice-step' }, adv.step))),
      h('p', { class: 'muted small' }, adv.note),
      h('div', { class: 'row' },
        h('button', { class: 'btn', type: 'button', id: 'another', onclick: () => {
          const nf = nextAdvice(fs); store.setDraft(nf, draft.parentLineId);
          fs.advice = nf.advice; renderAdvice(nf.advice, true); if (daily) markRec(nf.advice.pick);
          setTimeout(() => adviceBox.classList.remove('swap'), 400);
        } }, t('advice.another'))));
    if (daily && adv.pick) markRec(adv.pick);
  };
  const showThird = () => {
    if (thirdShown) return; thirdShown = true;
    thirdBox.replaceChildren();
    doorsEl.append(doorCard(third));
    drawLines(range.value / N); renderMarks();
    doorsEl.lastChild.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  };

  // scrub del tempo
  const markIdx = P.mark ? HZ.findIndex(x => x.key === P.mark) : -1;
  const range = h('input', { type: 'range', id: 'time', min: '0', max: String(N), step: '0.01', value: '0', 'aria-valuetext': hzL(HZ[0]), 'aria-describedby': 'scrubhint' });
  const tickBtns = HZ.map((hz, i) => h('button', { class: 'tick' + (i === markIdx ? ' mine' : ''), type: 'button', 'data-tick': i,
    onclick: () => { interacted = true; animateTo(i); } },
    i === markIdx ? '★ ' : '', hzL(hz, 'short'), i === markIdx ? h('span', { class: 'sr' }, ' · ' + t('fork.yourdate')) : null));
  const setIdx = (i, animate) => {
    if (i === hIdx && animate) return;
    hIdx = i; range.setAttribute('aria-valuetext', hzL(HZ[i]) + (i === markIdx ? ' · ' + t('fork.yourdate') : ''));
    tickBtns.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    fs.forks.forEach(f => { if (nowBoxes[f.id] && (!f.hidden || thirdShown)) renderNow(f, animate); });
    renderMarks();
  };
  const onRange = () => { drawLines(range.value / N); setIdx(Math.round(range.value), true); };
  range.addEventListener('input', () => { interacted = true; onRange(); });
  range.addEventListener('change', () => { range.value = Math.round(range.value); onRange(); });
  range.addEventListener('pointerdown', () => { interacted = true; });
  let raf;
  const animateTo = (target, ms = 700, then) => {
    cancelAnimationFrame(raf);
    const from = parseFloat(range.value), t0 = performance.now();
    const step = (tNow) => {
      const k = Math.min(1, (tNow - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      range.value = from + (target - from) * e; onRange();
      if (k < 1) raf = requestAnimationFrame(step); else if (then) then();
    };
    if (reduced) { range.value = target; onRange(); then && then(); } else raf = requestAnimationFrame(step);
  };
  cleanup.push(() => cancelAnimationFrame(raf));
  tickBtns[0].setAttribute('aria-current', 'true');
  drawLines(0); renderMarks();

  const scrub = h('div', { class: 'scrub' },
    h('label', { for: 'time' }, t('fork.scrub'), h('span', { class: 'hint', id: 'scrubhint' }, ' · ' + t(daily ? 'fork.sub.daily' : 'fork.sub'))),
    range, h('div', { class: 'ticks' }, tickBtns));

  // sipario: le TUE parole sulle due porte che si aprono
  let mom = null;
  if (!reduced) {
    const lt = fs.forks[0].title, rt = fs.forks[1].title;
    mom = h('div', { class: 'reveal', role: 'presentation', 'aria-hidden': 'true' },
      h('div', { class: 'panel l' }, h('span', { class: 'ptxt' }, lt)), h('div', { class: 'panel r' }, h('span', { class: 'ptxt' }, rt)), h('div', { class: 'seam' }),
      h('div', { class: 'moment' }, h('small', null, `${fmtShort(now)} · ${fmtTime(now)}`), h('b', null, t('fork.moment'))));
    document.body.append(mom);
    cleanup.push(() => mom.remove());
  }

  const caught = P.chips.length ? h('div', { class: 'caught' }, h('span', { class: 'think-lbl' }, t('fork.caught') + ':'), P.chips.map(chipEl)) : null;
  const qText = fs.question.length > 170 ? fs.question.slice(0, 167) + '…' : fs.question;
  mount(
    h('div', { class: 'fork-head' },
      h('p', { class: 'kicker' }, `${fs.categoryLabel} · ${t(daily ? 'fork.title.daily' : 'fork.title')}`),
      h('h1', { class: 'q-title' }, '«' + qText + '»'),
      caught,
      P.intro ? h('p', { class: 'fear-intro' }, P.intro) : null,
      h('div', { class: 'diverge' }, whenEl, h('span', { class: 'origin', 'aria-hidden': 'true' }), lines, marksEl)),
    scrub,
    h('p', { class: 'spark' }, t('fork.spark')),
    markIdx >= 0 ? h('p', { class: 'markleg' }, '★ ' + t('fork.yourdate') + ': ' + P.chips.find(c => c.kind === 'time').text) : null,
    fs.needsPro && h('p', { class: 'note pro' }, t('fork.pro')),
    doorsEl, thirdBox,
    adviceBox,
    h('p', { class: 'note' }, t(daily ? 'fork.honest.daily' : 'fork.honest')),
    h('p', { class: 'note' }, t(daily ? 'fork.final.daily' : 'fork.final')),
  );
  renderAdvice(fs.advice, false);

  // sequenza cinematica (accorciata: porte visibili in ~1,6 s)
  const teaser = () => {
    thirdBox.replaceChildren(h('div', { class: 'third-tease' },
      h('h3', null, t('fork.third.hint')),
      h('p', { class: 'muted' }, third.tagline + '…'),
      h('button', { class: 'btn', type: 'button', id: 'third', onclick: showThird }, t('fork.third.cta'))));
  };
  if (reduced) { setTimeout(teaser, 300); return; }
  setTimeout(() => mom && mom.classList.add('go'), 300);
  setTimeout(() => mom && mom.remove(), 1500);
  doorsEl.querySelectorAll('.door').forEach((d, i) => { d.style.animationDelay = (0.5 + i * 0.12) + 's'; });
  setTimeout(teaser, 2200);
  // tutorial gestuale: il tempo scorre da solo una volta, poi torna all'inizio
  setTimeout(() => {
    if (interacted) return;
    animateTo(N, 2400, () => setTimeout(() => { if (!interacted) animateTo(0, 800); }, 600));
  }, 1800);
}

function enterDoor(ev, fork) {
  const fsd = store.state.draft.forkSet, parent = store.state.draft.parentLineId;
  const btn = ev.currentTarget, r = btn.getBoundingClientRect();
  try { navigator.vibrate && navigator.vibrate([14, 40, 22]); } catch {}
  const line = store.addLine(fsd, fork.id, parent);
  if (prefersReduced()) { go('#/nata/' + line.id); return; }
  const b = h('div', { class: 'burst', style: `--c:${colorOf(fork.id)};--x:${r.left + r.width / 2}px;--y:${r.top + r.height / 2}px` });
  document.body.append(b);
  setTimeout(() => { go('#/nata/' + line.id); setTimeout(() => b.remove(), 400); }, 900);
}

/* ───────── vista: linea nata ───────── */
const icsFor = (line, hz) => () => downloadICS({ title: t('ics.title', { ch: hzL(hz) }), description: t('ics.desc'), whenTs: line.choiceAt + hz.days * DAY_MS });

function viewBorn(id) {
  const line = store.getLine(id); if (!line) { go('#/'); return; }
  const fsl = fsOf(line);
  const f = chosenFork(line), c = colorOf(f.id), cat = C().CATEGORIES[fsl.category] || { echoes: [] };
  const daily = isDaily(fsl);
  const coinc = coincidencesFor(line, store.state.lines)[0];
  const echoId = rankEvidence((cat.echoes || []).filter(e => evidence(e) && evidence(e).echo), region())[0];
  const next = hzs(fsl, line.choiceAt)[0];
  mount(
    h('section', { class: 'center stack', style: `--c:${c}` },
      h('div', { class: 'row', style: 'justify-content:center' }, h('div', { class: 'orb', style: '--l:.35', 'aria-hidden': 'true' })),
      h('p', { class: 'kicker' }, `${fmtDay(line.choiceAt)} ${fmtDate(line.choiceAt)} · ${fmtTime(line.choiceAt)}`),
      h('h1', null, t('born.title')),
      h('p', { class: 'lead' }, t('born.sub', { title: f.title })),
    ),
    h('div', { class: 'grid', style: 'margin-top:1.4rem' },
      daily ? h('div', { class: 'card glow', style: `--c:${c}` },
        h('p', { class: 'kicker' }, t('born.daily.first')),
        h('p', null, fsl.advice ? fsl.advice.step : f.supports[2])) : h('div', { class: 'card glow', style: `--c:${c}` },
        h('p', { class: 'kicker' }, t('born.first')),
        h('p', null, t('born.first.text')),
        evBadge('gilbertEbert')),
      echoId && h('div', { class: 'card' },
        h('p', { class: 'kicker' }, t('born.echo')),
        h('p', null, evidence(echoId).echo), evBadge(echoId)),
      h('div', { class: 'card' },
        h('p', { class: 'kicker' }, t('born.coinc')),
        h('h3', null, coinc.title), h('p', null, coinc.text),
        h('p', { class: 'muted small' }, t('born.coinc.note'))),
    ),
    h('div', { class: 'card', style: 'margin-top:1rem;text-align:center' },
      h('h2', null, t(daily ? 'born.daily.next' : 'born.next')),
      h('div', { class: 'row', style: 'justify-content:center' },
        daily ? null : h('button', { class: 'btn', type: 'button', id: 'cal', onclick: icsFor(line, next) }, t('born.cal')),
        h('a', { class: 'btn primary', href: '#/linea/' + line.id }, t('born.line')))),
    h('p', { class: 'center', style: 'margin-top:1rem' }, h('a', { href: '#/cielo' }, t('born.sky'))),
  );
}

/* ───────── vista: home / linee ───────── */
function chapterStatus(line) {
  const el = store.elapsedDays(line), now = store.now(), list = lineHz(line);
  const unseen = list.filter(x => el >= x.days && !store.isSeen(line.id, x.key));
  const nextHz = list.find(x => el < x.days);
  return { unseen, nextHz, next: nextHz && humanize(remainingMs(line, nextHz, now)) };
}

const needsCheckin = line => { const fsl = fsOf(line); return isDaily(fsl) && !line.checkin && store.elapsedDays(line) >= lineHz(line)[1].days; };

function viewHome() {
  const lines = store.state.lines;
  if (!lines.length) { viewAsk(new URLSearchParams()); return; }
  const sorted = [...lines].sort((a, b) => chapterStatus(b).unseen.length - chapterStatus(a).unseen.length || b.choiceAt - a.choiceAt);
  const top = sorted[0], st = chapterStatus(top), f = chosenFork(top);
  const lastUnseen = st.unseen[st.unseen.length - 1];
  const cards = sorted.map(line => {
    const s = chapterStatus(line), fk = chosenFork(line), c = colorOf(fk.id);
    return h('a', { class: 'card glow', href: '#/linea/' + line.id, style: `--c:${c};--l:${lineLight(line)};text-decoration:none;color:inherit;display:block`, 'data-line': line.id },
      h('div', { class: 'line-head', style: 'margin:0' },
        h('div', { class: 'orb', style: `--l:${lineLight(line)};width:4rem`, 'aria-hidden': 'true' }),
        h('div', null,
          h('p', { class: 'kicker' }, fsOf(line).categoryLabel),
          h('h3', { style: 'margin:0' }, fk.title, s.unseen.length ? h('span', { class: 'pill-new' }, t('line.new')) : null, needsCheckin(line) ? h('span', { class: 'pill-new', 'data-checkin-pill': '1' }, t('home.checkin')) : null),
          h('p', { class: 'muted', style: 'margin:.2rem 0 0' }, s.unseen.length
            ? `${t('home.opened')}: ${hzL(s.unseen[s.unseen.length - 1])}`
            : s.nextHz ? t('home.waiting', { when: `${hzL(s.nextHz)} — ${s.next}` }) : t('home.allopen')))),
      h('div', { class: 'light-meter', 'aria-hidden': 'true' }, h('i')));
  });
  mount(
    h('p', { class: 'kicker' }, t('home.back')),
    h('h1', null, st.unseen.length ? t('home.step') : t('home.growing')),
    h('p', { class: 'lead' }, st.unseen.length
      ? t('home.chapter.open', { title: f.title, ch: hzL(lastUnseen) })
      : st.nextHz ? t('home.next', { title: f.title, when: st.next }) : t('home.allopen2', { title: f.title })),
    h('p', { class: 'intro-line' }, t('home.what')),
    store.state.settings.demoOffsetDays > 0 && h('p', null, h('span', { class: 'demo-flag' }, t('line.demo', { n: Math.round(store.state.settings.demoOffsetDays) }))),
    h('div', { class: 'row', style: 'margin:1rem 0' },
      h('a', { class: 'btn primary', href: '#/linea/' + top.id }, st.unseen.length ? t('home.open.new') : t('home.go')),
      h('a', { class: 'btn', href: '#/nuovo' }, t('home.new')),
      h('a', { class: 'btn', href: '#/libro', id: 'booklink' }, t('home.book'))),
    h('h2', { style: 'margin-top:2rem' }, t('home.lines')),
    h('div', { class: 'grid' }, cards),
  );
}

/* ───────── «Com'è andata?» (scelte di ogni giorno) ───────── */
function checkinCard(line, c, meter, orb) {
  const X = checkinText(getLang());
  const reply = h('p', { class: 'checkin-r', role: 'status' }, line.checkin ? X[line.checkin + '_r'] : '');
  const btns = ['good', 'ok', 'skip'].map(k => h('button', { class: 'tgl', type: 'button', 'data-checkin': k, 'aria-pressed': String(line.checkin === k), onclick: () => {
    store.setCheckin(line.id, k);
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.checkin === k)));
    reply.textContent = X[k + '_r'];
    const nl = lineLight(line); orb.style.setProperty('--l', nl); meter.style.setProperty('--l', nl);
    if (!card.querySelector('.checkin-more')) card.append(h('p', { class: 'checkin-more' }, h('span', { class: 'muted small' }, t('line.checkin.done') + ' '), h('a', { href: '#/nuovo' }, t('line.checkin.again'))));
  } }, X[k]));
  const card = h('section', { class: 'card checkin glow', style: `--c:${c}`, 'aria-labelledby': 'ckH' },
    h('h2', { id: 'ckH' }, X.q), h('div', { class: 'row' }, btns), reply);
  return card;
}

/* ───────── vista: linea ───────── */
function viewLine(id) {
  const line = store.getLine(id); if (!line) { go('#/'); return; }
  const fsl = fsOf(line), P = fsl.personal || { chips: [], forkNotes: {}, horizonNotes: {} };
  const f = chosenFork(line), c = colorOf(f.id), el = store.elapsedDays(line), now = store.now();
  const daily = isDaily(fsl), HZ = lineHz(line);
  const L = lineLight(line);
  const others = fsl.forks.filter(x => x.id !== f.id);
  const meter = h('div', { class: 'light-meter', 'aria-hidden': 'true' }, h('i'));
  const orb = h('div', { class: 'orb', style: `--l:${L}`, 'aria-hidden': 'true' });
  const chapters = HZ.map(hz => {
    const unlocked = el >= hz.days, isNew = unlocked && !store.isSeen(line.id, hz.key);
    const d = f.horizons[hz.key];
    if (!unlocked) {
      return h('article', { class: 'card chap locked', 'data-chapter': hz.key, 'aria-label': t('line.closed', { label: hzL(hz) }) },
        h('div', { class: 'when' }, hzL(hz, 'long')),
        h('p', { class: 'countdown' }, t('line.locked', { when: humanize(remainingMs(line, hz, now)) })),
        h('p', { class: 'muted small', style: 'margin:0' }, t('line.locked.note')));
    }
    const noted = !!line.signs[hz.key];
    const peekBox = h('div');
    let peeking = false;
    const peekBtn = h('button', { class: 'tgl', type: 'button', 'aria-pressed': 'false', 'data-peek': hz.key, onclick: () => {
      peeking = !peeking; peekBtn.setAttribute('aria-pressed', String(peeking)); peekBtn.textContent = peeking ? t('line.peek.hide') : t('line.peek');
      peekBox.replaceChildren(...(peeking ? [h('div', { class: 'peek' }, h('p', { class: 'muted small' }, t('line.peek.note')),
        others.map(o => h('div', { style: `--c:${colorOf(o.id)};margin:.5rem 0` }, h('b', null, o.title), h('p', { style: 'margin:.2rem 0' }, o.horizons[hz.key].text), h('span', { class: 'feel' }, o.horizons[hz.key].feel))))] : []));
    } }, t('line.peek'));
    const signBtn = h('button', { class: 'tgl', type: 'button', 'aria-pressed': String(noted), 'data-sign': hz.key, onclick: () => {
      store.toggleSign(line.id, hz.key); const on = !!line.signs[hz.key];
      signBtn.setAttribute('aria-pressed', String(on)); signBtn.textContent = on ? t('line.noted.on') : t('line.noted');
      const nl = lineLight(line); document.documentElement.style.setProperty('--l', nl);
      meter.firstChild.style.setProperty('--l', nl); orb.style.setProperty('--l', nl); meter.style.setProperty('--l', nl);
    } }, noted ? t('line.noted.on') : t('line.noted'));
    const hn = (P.horizonNotes && P.horizonNotes[hz.key]) || [];
    return h('article', { class: 'card chap' + (isNew ? ' new' : ''), style: `--c:${c}`, 'data-chapter': hz.key },
      h('div', { class: 'when' }, hzL(hz, 'long'), isNew ? h('span', { class: 'pill-new' }, t('line.new')) : null),
      h('p', null, d.text),
      h('div', { class: 'row', style: 'gap:.5rem' }, h('span', { class: 'feel' }, d.feel), evBadge(d.ev)),
      hn.length ? h('div', { class: 'hnote' }, hn.map(n => h('p', null, n))) : null,
      h('div', { class: 'sign' }, h('b', null, t('line.sign') + ': '), signOf(hz.key), h('div', { style: 'margin-top:.6rem' }, signBtn)),
      h('div', { style: 'margin-top:.6rem' }, peekBtn), peekBox);
  });
  meter.style.setProperty('--l', L);
  const nextHz = HZ.find(x => el < x.days);
  const notes = (P.forkNotes && P.forkNotes[f.id]) || [];
  mount(
    h('div', { style: `--c:${c};--l:${L}` },
      h('div', { class: 'line-head' }, orb,
        h('div', { style: 'flex:1' },
          h('p', { class: 'kicker' }, fsl.categoryLabel),
          h('h1', { style: 'margin-bottom:.2rem' }, f.title),
          h('p', { class: 'muted', style: 'margin:0' }, t('line.born', { date: fmtOn(line.choiceAt), time: fmtTime(line.choiceAt) })),
          store.state.settings.demoOffsetDays > 0 && h('p', { style: 'margin:.4rem 0 0' }, h('span', { class: 'demo-flag' }, t('line.demo', { n: Math.round(store.state.settings.demoOffsetDays) }))),
          h('p', { class: 'small muted', style: 'margin:.5rem 0 0' }, t('line.light')), meter)),
      h('p', { class: 'lead' }, '«' + line.question + '»'),
      P.chips.length ? h('div', { class: 'caught left' }, h('span', { class: 'think-lbl' }, t('line.ctx') + ':'), P.chips.map(chipEl)) : null,
      daily && el >= HZ[1].days ? checkinCard(line, c, meter, orb) : null,
      h('div', { class: 'rail' },
        h('article', { class: 'card chap', style: `--c:${c}` },
          h('div', { class: 'when' }, t('line.day0')),
          h('p', null, f.tagline + '.'),
          notes.length ? h('div', { class: 'for-you' }, h('b', null, t('fork.foryou')), notes.map(n => h('p', null, n))) : null,
          h('details', { class: 'needs' }, h('summary', null, t(daily ? 'fork.needs.daily' : 'fork.needs')), h('ul', null, f.supports.map(s => h('li', null, s))))),
        chapters),
      h('div', { class: 'row' },
        h('a', { class: 'btn primary', href: '#/nuovo?da=' + line.id }, t('line.child')),
        nextHz && !daily && h('button', { class: 'btn', type: 'button', id: 'cal', onclick: icsFor(line, nextHz) }, t('line.cal')),
        h('a', { class: 'btn', href: '#/cielo' }, t('born.sky')))
    ));
  // segna come visti DOPO il rendering (così l'animazione "nuovo" si vede una volta)
  HZ.filter(x => el >= x.days).forEach(x => store.markSeen(line.id, x.key));
}

/* ───────── vista: cielo ───────── */
function viewSky() {
  const lines = store.state.lines;
  if (!lines.length) { mount(h('h1', null, t('sky.title')), h('p', { class: 'lead' }, t('sky.empty')), h('a', { class: 'btn primary', href: '#/nuovo' }, t('home.new'))); return; }
  const W = 100, H = Math.max(110, 30 + lines.length * 26);
  const s = svg('svg', { class: 'sky', viewBox: `0 0 ${W} ${H}`, role: 'group', 'aria-label': t('sky.aria'), style: `aspect-ratio:${W}/${H}` });
  const defs = svg('defs');
  s.append(defs);
  // polvere di stelle deterministica
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 70; i++) s.append(svg('circle', { cx: (rnd() * W).toFixed(1), cy: (rnd() * H).toFixed(1), r: (0.15 + rnd() * 0.35).toFixed(2), fill: '#fff', opacity: (0.2 + rnd() * 0.5).toFixed(2) }));
  const pos = {};
  lines.forEach((l, i) => { pos[l.id] = { x: 50 + Math.sin(i * 1.9 + 0.6) * 24, y: 20 + i * 26 }; });
  lines.forEach(l => { if (l.parentLineId && pos[l.parentLineId]) s.append(svg('line', { x1: pos[l.parentLineId].x, y1: pos[l.parentLineId].y, x2: pos[l.id].x, y2: pos[l.id].y, stroke: '#ffffff', 'stroke-opacity': '.35', 'stroke-width': '.4', 'stroke-dasharray': '1 1' })); });
  lines.forEach((l, i) => {
    const p = pos[l.id], f = chosenFork(l), c = colorOf(f.id), L = lineLight(l);
    const others = fsOf(l).forks.filter(x => x.id !== f.id);
    others.forEach((o, k) => {
      const ang = (k === 0 ? -1 : 1) * (0.55 + 0.1 * i) + Math.PI / 2, ox = p.x + Math.cos(ang) * 13, oy = p.y + Math.sin(ang) * 11;
      s.append(svg('line', { x1: p.x, y1: p.y, x2: ox, y2: oy, stroke: colorOf(o.id), 'stroke-opacity': '.35', 'stroke-width': '.35' }));
      s.append(svg('circle', { cx: ox, cy: oy, r: '1.1', fill: colorOf(o.id), opacity: '.45' }));
    });
    const gid = 'g' + i;
    const rg = svg('radialGradient', { id: gid }, svg('stop', { offset: '0', 'stop-color': '#fff' }), svg('stop', { offset: '.35', 'stop-color': c }), svg('stop', { offset: '1', 'stop-color': c, 'stop-opacity': '0' }));
    defs.append(rg);
    const a = svg('a', { href: '#/linea/' + l.id, 'data-sky-line': l.id });
    const ttl = svg('title'); ttl.textContent = t('sky.line.aria', { n: i + 1, title: f.title }); a.append(ttl);
    a.append(svg('circle', { cx: p.x, cy: p.y, r: (4.5 + L * 6).toFixed(1), fill: `url(#${gid})` }));
    a.append(svg('circle', { cx: p.x, cy: p.y, r: '1.6', fill: '#fff' }));
    const lab = svg('text', { x: p.x, y: p.y + 10.5 + L * 4, 'text-anchor': 'middle', 'aria-hidden': 'true' }); lab.textContent = f.title.length > 26 ? f.title.slice(0, 25) + '…' : f.title;
    a.append(lab);
    s.append(a);
  });
  mount(
    h('h1', null, t('sky.title')), h('p', { class: 'lead' }, t('sky.sub')), s, h('p', { class: 'sky-hint' }, t('sky.hint') + ' ' + t('sky.spark')),
    h('div', { class: 'legend' }, h('span', null, h('b', { class: 'dot a', 'aria-hidden': 'true' }, '● '), t('sky.legend.1')), h('span', null, h('b', { class: 'dot b', 'aria-hidden': 'true' }, '● '), t('sky.legend.2')), h('span', null, '┄ ' + t('sky.legend.3'))),
    h('ul', { class: 'clean' }, lines.map((l, i) => h('li', null, h('a', { href: '#/linea/' + l.id }, `${i + 1}. ${chosenFork(l).title}`), ` · ${fmtDate(l.choiceAt)}`))),
    h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/nuovo' }, t('home.new')), h('a', { class: 'btn', href: '#/libro' }, t('sky.book'))));
}

/* ───────── vista: risonanze ───────── */
function viewEcho() {
  const lines = store.state.lines;
  const cats = [...new Set(lines.map(l => fsOf(l).category))];
  const echoIds = rankEvidence([...new Set(cats.flatMap(cid => (C().CATEGORIES[cid] || { echoes: [] }).echoes))].filter(id => evidence(id) && evidence(id).echo), region());
  const coinc = coincidencesAll(lines).slice(0, 6);
  const catName = lines.length ? fsOf(lines[lines.length - 1]).categoryLabel.toLowerCase() : C().CATEGORIES.lavoro.label.toLowerCase();
  const opt = h('input', { type: 'checkbox', id: 'optin', checked: store.state.settings.resonanceOptIn || null, onchange: e => store.setSetting('resonanceOptIn', e.target.checked) });
  mount(
    h('h1', null, t('echo.title')), h('p', { class: 'lead' }, t('echo.sub')),
    h('div', { class: 'rings', role: 'img', 'aria-label': t('echo.rings') }, h('i', { style: '--c:var(--amber)' }), h('i', { style: '--c:var(--teal)' }), h('i', { style: '--c:var(--violet)' })),
    h('div', { class: 'rings-legend' }, h('span', { class: 'tag', style: '--c:var(--amber)' }, t('echo.tag.real')), h('span', { class: 'tag', style: '--c:var(--teal)' }, t('echo.tag.calc')), h('span', { class: 'tag', style: '--c:var(--violet)' }, t('echo.tag.sim'))),
    !lines.length && h('div', { class: 'card', style: 'margin-bottom:1rem' }, h('p', null, t('echo.empty')), h('a', { class: 'btn primary', href: '#/nuovo' }, t('home.new'))),
    h('div', { class: 'grid' },
      h('section', { class: 'card', 'aria-labelledby': 'e1' },
        h('span', { class: 'tag', style: '--c:var(--amber)' }, t('echo.tag.real')),
        h('p', { class: 'kicker', id: 'e1' }, t('echo.public')), h('p', { class: 'muted small' }, t('echo.public.note')), h('p', { class: 'muted small' }, t('echo.region', { region: t('region.' + region()) })),
        echoIds.length ? echoIds.map(id => h('div', { class: 'echo-item' }, h('p', { style: 'margin:0 0 .4rem' }, evidence(id).echo), evBadge(id))) : h('p', { class: 'muted' }, '—')),
      h('section', { class: 'card', 'aria-labelledby': 'e2' },
        h('span', { class: 'tag', style: '--c:var(--teal)' }, t('echo.tag.calc')),
        h('p', { class: 'kicker', id: 'e2' }, t('echo.coinc')), h('p', { class: 'muted small' }, t('echo.coinc.note')),
        coinc.length ? coinc.map(cn => h('div', { class: 'echo-item' }, h('b', null, `${cn.title} · ${t('echo.line', { n: cn.n })}`), h('p', { style: 'margin:.2rem 0 0' }, cn.text))) : h('p', { class: 'muted' }, '—')),
      h('section', { class: 'card glow', style: '--c:var(--teal)', 'aria-labelledby': 'e3' },
        h('span', { class: 'tag', style: '--c:var(--violet)' }, t('echo.tag.sim')),
        h('span', { class: 'ribbon' }, t('echo.net.sim')),
        h('p', { class: 'kicker', id: 'e3' }, t('echo.net')),
        h('p', { style: 'font-family:var(--serif);font-size:1.25rem;border-left:.2rem dashed var(--teal);padding-left:.9rem' }, t('echo.net.example', { cat: catName })),
        h('label', { class: 'switch', for: 'optin' }, opt, h('span', null, h('b', null, t('echo.net.optin')), h('br'), h('span', { class: 'muted small' }, t('echo.net.optin.note')))),
        h('details', { class: 'needs' }, h('summary', null, t('echo.net.rules')),
          h('ul', null, ['r1', 'r2', 'r3', 'r4'].map(k => h('li', null, t('echo.net.' + k))))))),
  );
}

/* ───────── vista: libro delle linee (stampabile / PDF) ───────── */
function viewBook(query) {
  const lines = [...store.state.lines].sort((a, b) => a.choiceAt - b.choiceAt);
  const withOthers = query.get('altre') === '1';
  const now = store.now();
  if (!lines.length) {
    mount(h('h1', null, t('book.title')), h('p', { class: 'lead' }, t('book.empty')),
      h('a', { class: 'btn primary', href: '#/nuovo' }, t('home.new')));
    return;
  }
  const used = new Set();
  const cite = id => { used.add(id); const n = [...used].indexOf(id) + 1; return h('sup', { class: 'cite' }, `[${n}]`); };
  const chapterEls = lines.map((line, i) => {
    const fsl = fsOf(line), f = chosenFork(line), el = store.elapsedDays(line);
    const P = fsl.personal || { chips: [], horizonNotes: {}, forkNotes: {} };
    const others = fsl.forks.filter(x => x.id !== f.id && !x.hidden);
    const BH = hzs(fsl, line.choiceAt);
    const rows = BH.map(hz => {
      const d = f.horizons[hz.key];
      if (el < hz.days) return h('div', { class: 'bk-ch locked' }, h('h4', null, hzL(hz, 'long')), h('p', { class: 'muted' }, t('book.locked', { date: fmtOn(line.choiceAt + hz.days * DAY_MS) })));
      const hn = (P.horizonNotes && P.horizonNotes[hz.key]) || [];
      return h('div', { class: 'bk-ch' },
        h('h4', null, hzL(hz, 'long'), line.signs[hz.key] ? h('span', { class: 'bk-sign' }, ' · ' + t('book.sign.on')) : null),
        h('p', null, d.text, d.ev ? cite(d.ev) : null),
        h('p', { class: 'muted small' }, `${t('book.feel')}: ${d.feel}`),
        hn.map(n => h('p', { class: 'bk-note' }, n)));
    });
    const alt = withOthers && others.length ? h('div', { class: 'bk-others' },
      h('h4', null, t('book.others.title')), h('p', { class: 'muted small' }, t('book.others.note2')),
      others.map(o => h('div', null, h('h5', null, o.title),
        BH.filter(hz => el >= hz.days).map(hz => h('p', null, h('b', null, hzL(hz, 'short') + ': '), o.horizons[hz.key].text, o.horizons[hz.key].ev ? cite(o.horizons[hz.key].ev) : null))))) : null;
    const coinc = coincidencesFor(line, lines)[0];
    return h('section', { class: 'bk-line', id: 'bk' + (i + 1), 'aria-labelledby': 'bkh' + (i + 1) },
      h('p', { class: 'kicker' }, `${t('book.chapter', { n: i + 1 })} · ${fsl.categoryLabel}`),
      h('h2', { id: 'bkh' + (i + 1) }, f.title),
      h('p', { class: 'muted' }, t('book.born', { date: fmtOn(line.choiceAt), time: fmtTime(line.choiceAt) })),
      h('p', { class: 'bk-q' }, h('b', null, t('book.question') + ': '), '«' + line.question + '»'),
      P.chips.length ? h('p', { class: 'small muted' }, P.chips.map(c => c.text).join(' · ')) : null,
      h('div', { class: 'bk-ch' }, h('h4', null, t('book.day0')), h('p', null, f.tagline + '.')),
      rows, alt,
      coinc ? h('p', { class: 'small muted bk-coinc' }, h('b', null, t('book.coinc') + ': '), coinc.title + ' — ' + coinc.text) : null);
  });
  const srcList = [...used].map((id, k) => { const e = evidence(id); return h('li', { value: k + 1 }, h('b', null, e.headline), h('br'), h('span', { class: 'small' }, `${e.source}. ${t('ev.limits')}: ${e.limits}`), h('br'), h('span', { class: 'small url' }, e.url)); });
  const demo = store.state.settings.demoOffsetDays > 0;
  const toc = h('nav', { class: 'bk-toc', 'aria-label': t('book.toc') }, h('h2', null, t('book.toc')),
    h('ol', null, lines.map((l, i) => h('li', null, h('a', { href: '#/libro' + (withOthers ? '?altre=1' : ''), onclick: ev => { ev.preventDefault(); document.getElementById('bk' + (i + 1)).scrollIntoView({ block: 'start' }); } }, chosenFork(l).title)))));
  const opt = h('input', { type: 'checkbox', id: 'bkothers', checked: withOthers || null, onchange: e => go('#/libro' + (e.target.checked ? '?altre=1' : '')) });
  mount(
    h('div', { class: 'book-tools noprint' },
      h('h1', null, t('book.title')), h('p', { class: 'lead' }, t('book.sub')),
      h('div', { class: 'row' },
        h('button', { class: 'btn primary', type: 'button', id: 'bkprint', onclick: () => window.print() }, t('book.print')),
        h('a', { class: 'btn', href: '#/' }, t('book.back'))),
      h('p', { class: 'muted small' }, t('book.print.hint')),
      h('label', { class: 'switch', for: 'bkothers' }, opt, h('span', null, h('b', null, t('book.others')), h('br'), h('span', { class: 'muted small' }, t('book.others.note'))))),
    h('article', { class: 'book', id: 'book', 'aria-label': t('book.title') },
      h('section', { class: 'bk-cover' },
        h('div', { class: 'lightline', 'aria-hidden': 'true' }),
        h('p', { class: 'kicker' }, t('book.cover.kicker')),
        h('h2', { class: 'bk-title' }, t('app.name')),
        h('p', { class: 'bk-tag' }, t('book.cover.tag')),
        h('p', null, lines.length === 1 ? t('book.cover.n1') : t('book.cover.n', { n: lines.length })),
        h('p', { class: 'muted' }, t('book.cover.date', { date: fmtOn(Date.now()) })),
        demo ? h('p', null, h('span', { class: 'demo-flag' }, t('book.demo'))) : null),
      toc, chapterEls,
      h('section', { class: 'bk-sources' }, h('h2', null, t('book.sources')), h('p', { class: 'muted small' }, t('book.sources.note')), h('ol', null, srcList)),
      h('p', { class: 'small muted bk-colophon' }, t('book.colophon'))));
}

/* ───────── vista: cura ───────── */
function careLines() {
  const r = region();
  if (r === 'IT') return [t('care.112'), t('care.ta')];
  if (r === 'EU') return [t('care.eu')];
  if (r === 'US') return [t('care.us')];
  if (r === 'GB') return [t('care.gb')];
  return [t('care.world')];
}
function viewCare() {
  mount(h('section', { class: 'care' },
    h('h1', null, t('care.title')),
    h('p', { class: 'lead' }, t('care.text')),
    h('div', { class: 'card' }, careLines().map((txt, i) => h('p', { style: 'margin:0 0 .6rem' }, i === 0 ? h('b', null, txt) : txt)),
      h('p', { style: 'margin:0' }, t('care.find') + ' ', h('a', { href: 'https://findahelpline.com', target: '_blank', rel: 'noopener noreferrer' }, t('care.find.link')), ' ' + t('care.find.after'))),
    h('p', { class: 'muted' }, t('care.note')),
    h('a', { class: 'btn', href: '#/nuovo' }, t('care.back'))));
}

/* ───────── vista: impostazioni ───────── */
function viewSettings() {
  const s = store.state.settings;
  const demoNote = s.demoOffsetDays > 0 ? h('p', null, h('span', { class: 'demo-flag' }, t('line.demo', { n: Math.round(s.demoOffsetDays) }))) : null;
  const bump = d => () => { store.setSetting('demoOffsetDays', s.demoOffsetDays + d); route(); };
  const textSw = h('input', { type: 'checkbox', id: 'bigtext', checked: s.bigText || null, onchange: e => { store.setSetting('bigText', e.target.checked); textSizeApply(); } });
  const lang = getLang();
  const langBtn = (code) => h('button', { class: 'btn' + (lang === code ? ' primary' : ''), type: 'button', 'data-lang': code, lang: code, 'aria-pressed': String(lang === code), onclick: () => setLang(code) }, LANG_NAMES[code]);
  const isIOS = /iphone|ipad/i.test(navigator.userAgent);
  const exp = () => {
    const url = URL.createObjectURL(new Blob([store.exportJSON()], { type: 'application/json' }));
    const a = h('a', { href: url, download: 'altravi-dati.json' }); document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  mount(
    h('h1', null, t('set.title')),
    h('div', { class: 'grid' },
      h('section', { class: 'card', 'aria-labelledby': 's0' }, h('h2', { id: 's0' }, t('set.lang')), h('p', { class: 'muted small' }, t('set.lang.note')),
        h('div', { class: 'row' }, LANGS.map(langBtn))),
      h('section', { class: 'card', 'aria-labelledby': 's1' }, h('h2', { id: 's1' }, t('set.text')),
        h('label', { class: 'switch', for: 'bigtext' }, textSw, h('span', null, t('text.bigger')))),
      h('section', { class: 'card', 'aria-labelledby': 's2' }, h('h2', { id: 's2' }, t('set.book')), h('p', { class: 'muted small' }, t('set.book.note')),
        h('a', { class: 'btn', href: '#/libro' }, t('set.book'))),
      h('section', { class: 'card', 'aria-labelledby': 's3' }, h('h2', { id: 's3' }, t('set.data')), h('p', { class: 'muted small' }, t('set.data.note')),
        h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', id: 'export', onclick: exp }, t('set.export')),
          h('button', { class: 'btn danger', type: 'button', id: 'wipe', onclick: () => { if (confirm(t('set.wipe.confirm'))) { store.wipe(); fsCache.clear(); go('#/'); } } }, t('set.wipe')))),
      h('section', { class: 'card', 'aria-labelledby': 's4' }, h('h2', { id: 's4' }, t('set.demo')), h('p', { class: 'muted small' }, t('set.demo.note')), demoNote,
        h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', id: 'd1', onclick: bump(1) }, t('set.demo.plus')),
          h('button', { class: 'btn', type: 'button', id: 'd7', onclick: bump(7) }, t('set.demo.week')),
          h('button', { class: 'btn', type: 'button', id: 'd90', onclick: bump(90) }, t('set.demo.month')),
          h('button', { class: 'btn', type: 'button', id: 'dreset', onclick: () => { store.setSetting('demoOffsetDays', 0); route(); } }, t('set.demo.reset')))),
      h('section', { class: 'card', 'aria-labelledby': 's5' }, h('h2', { id: 's5' }, t('set.install')),
        deferredInstall ? h('button', { class: 'btn primary', type: 'button', onclick: async () => { deferredInstall.prompt(); deferredInstall = null; route(); } }, t('set.install'))
          : h('p', { class: 'muted' }, isIOS ? t('set.install.ios') : t('set.install.generic'))),
      AI.enabled ? aiSettingsCard() : null,
      h('section', { class: 'card', 'aria-labelledby': 's6' }, h('h2', { id: 's6' }, t('set.engine')), h('p', { class: 'muted' }, AI.enabled ? t('ai.engine.val') : t('set.engine.val'))),
    ));
}

function aiSettingsCard() {
  const cur = store.state.settings.aiConsent;
  const names = { null: t('ai.set.ask'), always: t('ai.set.always'), never: t('ai.set.never') };
  const opt = (val, id) => h('button', { class: 'btn' + (cur === val ? ' primary' : ''), type: 'button', id, 'aria-pressed': String(cur === val), onclick: () => { store.setSetting('aiConsent', val); route(); } }, names[val]);
  return h('section', { class: 'card', 'aria-labelledby': 's7' }, h('h2', { id: 's7' }, t('ai.set.title')), h('p', { class: 'muted' }, t('ai.set.body')),
    h('p', { class: 'muted small', role: 'status' }, t('ai.set.now') + names[cur === 'always' || cur === 'never' ? cur : null]),
    h('div', { class: 'row' }, opt(null, 'aiSetAsk'), opt('always', 'aiSetAlways'), opt('never', 'aiSetNever')),
    h('p', { class: 'muted small ai-link' }, h('a', { href: 'privacy.html' }, t('ai.ask.privacy'))));
}

/* ───────── router ───────── */
function setNavActive(name) {
  document.querySelectorAll('.tabs a').forEach(a => {
    const on = a.dataset.nav === name; if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
function route() {
  cleanup.forEach(fn => { try { fn(); } catch {} }); cleanup = [];
  document.querySelectorAll('.reveal,.burst').forEach(n => n.remove());
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?');
  const q = new URLSearchParams(qs || ''); const parts = path.split('/').filter(Boolean);
  const name = parts[0] || '';
  const map = {
    '': () => { setNavActive('lines'); viewHome(); },
    nuovo: () => { setNavActive('new'); viewAsk(q); },
    pensa: () => { setNavActive('new'); viewThink(); },
    porte: () => { setNavActive('new'); viewForks(); },
    nata: () => { setNavActive('lines'); viewBorn(parts[1]); },
    linea: () => { setNavActive('lines'); viewLine(parts[1]); },
    libro: () => { setNavActive('lines'); viewBook(q); },
    cielo: () => { setNavActive('sky'); viewSky(); },
    risonanze: () => { setNavActive('echo'); viewEcho(); },
    impostazioni: () => { setNavActive('settings'); viewSettings(); },
    cura: () => { setNavActive(''); viewCare(); },
  };
  (map[name] || map[''])();
  document.body.dataset.route = name || 'home';
  if (!quiet && !firstRoute) focusMain();
  firstRoute = false;
}

/* ───────── avvio ───────── */
function init() {
  applyStatic();
  window.addEventListener('hashchange', route);
  document.querySelector('.skip').addEventListener('click', e => { e.preventDefault(); focusMain(); });
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; });
  document.getElementById('textSize').addEventListener('click', () => { store.setSetting('bigText', !store.state.settings.bigText); textSizeApply(); });
  document.getElementById('langSel').addEventListener('change', e => setLang(e.target.value));
  onLang(() => {
    // stessa vista, nuova lingua: niente animazioni, nessun salto del focus
    const active = document.activeElement && document.activeElement.id;
    quiet = true; fsCache.clear(); applyStatic(); route(); quiet = false;
    const again = active && document.getElementById(active); if (again) again.focus({ preventScroll: true });
    else { const ls = document.getElementById('langSel'); if (ls && active === 'langSel') ls.focus(); }
  });
  route();
  initPWA();
}
init();
