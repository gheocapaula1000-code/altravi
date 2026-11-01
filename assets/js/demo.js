// Incarico dimostrativo: agenzia + cliente, rifacimento del sito di un hotel. Testi IT/EN. Le date sono relative a oggi.
const DAY = 86400000;
const p = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
const dayOff = n => { const d = new Date(); return iso(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)); };
const at = n => Date.now() + n * DAY - 3600000 * 2;
const L = (it, en) => ({ it, en });

export const demoPeople = () => [
  { id: 'p1', name: 'Elena', role: L('Project lead', 'Project lead') },
  { id: 'p2', name: 'Davide', role: L('Designer', 'Designer') },
  { id: 'p3', name: 'Sara', role: L('Sviluppo', 'Development') },
  { id: 'p4', name: 'Luca', role: L('Account', 'Account') },
  { id: 'p5', name: 'Giulia', role: L('Contenuti', 'Content') },
];

export function demoEngagement(team) {
  const ex = (id, owner, off, text, measure, due, mid, by) => ({ id, owner, by, text, measure, due: dayOff(due), createdAt: at(off), mid });
  const expectations = [
    ex('x1', 'team', -40, L('Testi e foto arrivano entro il 15 del mese', 'Texts and photos arrive by the 15th'), L('Tutti i materiali ricevuti, almeno 20 foto in alta qualità', 'All materials received, at least 20 high-quality photos'), -26, 'm1', 'Giulia'),
    ex('x2', 'client', -40, L('Aggiornamenti chiari ogni venerdì', 'Clear updates every Friday'), L('Una mail di stato ogni venerdì, senza doverla chiedere', 'A status email every Friday, without having to ask'), -26, 'm1', 'Marco'),
    ex('x3', 'team', -39, L('Un solo referente per le correzioni', 'One single contact for corrections'), L('Una sola mail di correzioni per ogni giro', 'One single corrections email per round'), -10, 'm2', 'Elena'),
    ex('x4', 'team', -39, L('Due giri di correzioni inclusi', 'Two rounds of corrections included'), L('Massimo due giri prima dell’approvazione del design', 'At most two rounds before design approval'), -10, 'm2', 'Luca'),
    ex('x5', 'client', -38, L('Il sito si legge e si prenota bene da telefono', 'The site reads and books well on a phone'), L('Si prenota una camera con un dito in meno di 2 minuti', 'A room can be booked with one thumb in under 2 minutes'), -10, 'm2', 'Marco'),
    ex('x6', 'client', -38, L('Online prima dell’alta stagione', 'Online before high season'), L('Sito nuovo pubblicato entro la data del lancio', 'New site published by the launch date'), 2, 'm3', 'Marco'),
    ex('x7', 'team', -37, L('Il sito va online senza interruzioni', 'The site goes live without downtime'), L('Nessun disservizio nelle prime 48 ore', 'No outage in the first 48 hours'), 2, 'm3', 'Sara'),
    ex('x8', 'team', -37, L('Il cliente sa aggiornare i testi da solo', 'The client can update the texts alone'), L('Una sessione di formazione di un’ora fatta', 'One one-hour training session done'), 2, 'm3', 'Davide'),
    ex('x9', 'client', -36, L('Più prenotazioni dirette dal sito', 'More direct bookings from the site'), L('+20% di prenotazioni dirette nei 3 mesi dopo il lancio', '+20% direct bookings in the 3 months after launch'), 90, 'm4', 'Giulia Fontana'),
  ];
  const decisions = [
    { id: 'd1', what: L('Teniamo il motore di prenotazione attuale', 'We keep the current booking engine'), why: L('Cambiarlo avrebbe ritardato il lancio di sei settimane, oltre l’alta stagione', 'Changing it would have delayed launch by six weeks, past high season'), who: L('Elena (Studio) e Marco (Hotel)', 'Elena (Studio) and Marco (Hotel)'), alt: L('Passare a un nuovo motore integrato: più pulito e moderno, ma più lento e più caro. Da rivalutare dopo la stagione.', 'Move to a new integrated engine: cleaner and more modern, but slower and costlier. To reconsider after the season.'), date: dayOff(-30), createdAt: at(-30), from: null },
    { id: 'd2', what: L('Il menu del sito passa a cinque voci', 'The site menu goes down to five items'), why: L('Gli ospiti cercavano solo camere, ristorante e contatti', 'Guests only looked for rooms, restaurant and contacts'), who: L('Elena', 'Elena'), alt: L('Tenere le dodici voci attuali e aggiungere una ricerca.', 'Keep the current twelve items and add a search.'), date: dayOff(-18), createdAt: at(-18), from: null },
    { id: 'd3', what: L('Il giro di correzioni sulle foto non conta tra i due inclusi', 'The photo corrections round does not count among the two included'), why: L('Il cliente l’aveva vissuto come un giro a parte; evitiamo un disaccordo sul contratto', 'The client saw it as a separate round; we avoid a dispute over the contract'), who: L('Insieme', 'Together'), alt: L('Contare tre giri totali e far pagare il terzo.', 'Count three rounds in total and charge for the third.'), date: dayOff(-7), createdAt: at(-7), from: { mid: 'm2', mname: L('Design approvato', 'Design approved') } },
  ];
  const R = (r, note) => ({ r, note: note || '' });
  const milestones = [
    { id: 'm1', name: L('Materiali e obiettivi chiari', 'Materials and goals clear'), date: dayOff(-24), expIds: ['x1', 'x2'], token: '',
      team: { at: at(-24), ratings: { x1: R('met', L('Materiali arrivati il 14, foto incluse.', 'Materials arrived on the 14th, photos included.')), x2: R('met', L('Mail di stato ogni venerdì.', 'Status email every Friday.')) } },
      client: { at: at(-23), by: 'Marco', ratings: { x1: R('met'), x2: R('partly', L('Le mail arrivavano, ma spesso di martedì.', 'The emails came, but often on a Tuesday.')) } } },
    { id: 'm2', name: L('Design approvato', 'Design approved'), date: dayOff(-8), expIds: ['x3', 'x4', 'x5'], token: '',
      team: { at: at(-8), ratings: { x3: R('partly', L('Due referenti hanno scritto, ma ci siamo allineati.', 'Two people wrote, but we got aligned.')), x4: R('met', L('Due giri fatti, come da contratto.', 'Two rounds done, as per contract.')), x5: R('met', L('Provato su tre telefoni.', 'Tested on three phones.')) } },
      client: { at: at(-7), by: 'Marco', ratings: { x3: R('partly', L('Sì, ma i commenti erano su due mail.', 'Yes, but comments were on two emails.')), x4: R('partly', L('Per noi i giri sono stati tre: uno era sulle foto.', 'For us there were three rounds: one was on the photos.')), x5: R('met') } } },
    { id: 'm3', name: L('Lancio del sito', 'Site launch'), date: dayOff(2), expIds: ['x6', 'x7', 'x8'], token: '', team: null, client: null },
    { id: 'm4', name: L('Fine ciclo: tre mesi dopo', 'End of cycle: three months later'), date: dayOff(90), expIds: ['x9'], token: '', team: null, client: null },
  ];
  return { id: 'demo', demo: true, title: L('Nuovo sito web', 'Website redesign'), client: 'Hotel Bellavista', team, end: dayOff(92), createdAt: at(-40), closedAt: 0, reviews: [{ at: at(-39), by: 'Marco', note: L('Aggiungiamo l’aggiornamento del venerdì tra le attese.', 'Let’s add the Friday update to the expectations.') }],
    contacts: [{ name: 'Marco Bellavista', role: L('Direttore', 'Director') }, { name: 'Giulia Fontana', role: L('Marketing', 'Marketing') }], expectations, decisions, milestones };
}
