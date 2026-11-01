// Stato locale (localStorage). Nessun dato lascia il dispositivo.
const KEY = 'altravi.v1';
const DAY = 86400000;
// Migrazione dal nome precedente del prototipo (stessa origine, solo locale).
try { if (typeof localStorage !== 'undefined' && !localStorage.getItem(KEY) && localStorage.getItem('altrimenti.v1')) { localStorage.setItem(KEY, localStorage.getItem('altrimenti.v1')); localStorage.removeItem('altrimenti.v1'); } } catch (e) {}

const blank = () => ({
  v: 1,
  createdAt: Date.now(),
  settings: { bigText: false, resonanceOptIn: false, demoOffsetDays: 0 },
  lines: [],
  draft: null,
  seen: {},        // capitoli già visti: "lineId:horizon"
});

let mem = null;
function read() {
  if (mem) return mem;
  try {
    const raw = localStorage.getItem(KEY);
    mem = raw ? { ...blank(), ...JSON.parse(raw) } : blank();
    mem.settings = { ...blank().settings, ...(mem.settings || {}) };
  } catch { mem = blank(); }
  return mem;
}
function write() {
  try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch { /* modalità privata: resta in memoria */ }
}

export const store = {
  get state() { return read(); },
  save() { read(); write(); },
  now() { return Date.now() + read().settings.demoOffsetDays * DAY; },
  setDraft(fs, parentLineId = null) { read().draft = { forkSet: fs, parentLineId }; write(); },
  clearDraft() { read().draft = null; write(); },
  addLine(forkSet, chosenForkId, parentLineId = null) {
    const s = read();
    const line = {
      id: 'ln_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      createdAt: Date.now(),          // momento reale (non simulato) della scelta
      choiceAt: Date.now(),
      question: forkSet.question,
      forkSet,
      chosenForkId,
      parentLineId,
      signs: {},                      // { d1: true } segni notati
      resonance: false,               // opt-in per questo bivio (nel prototipo non invia nulla)
    };
    s.lines.push(line);
    s.draft = null;
    write();
    return line;
  },
  setCheckin(lineId, val) { const l = this.getLine(lineId); if (!l) return; l.checkin = val; l.signs.checkin = true; write(); },
  getLine(id) { return read().lines.find(l => l.id === id) || null; },
  toggleSign(lineId, key) {
    const l = this.getLine(lineId); if (!l) return;
    l.signs[key] = !l.signs[key]; write();
  },
  markSeen(lineId, key) { read().seen[lineId + ':' + key] = this.now(); write(); },
  isSeen(lineId, key) { return !!read().seen[lineId + ':' + key]; },
  setSetting(k, v) { read().settings[k] = v; write(); },
  exportJSON() { return JSON.stringify(read(), null, 2); },
  wipe() { mem = blank(); try { localStorage.removeItem(KEY); } catch {} },
  /** giorni trascorsi dalla scelta, con eventuale offset demo */
  elapsedDays(line) { return (this.now() - line.choiceAt) / DAY; },
};

export const DAY_MS = DAY;
