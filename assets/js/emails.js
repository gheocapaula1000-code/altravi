// Modelli email IT/EN. Variabili: {team} {client} {contact} {sender} {job} {milestone} {link} {score} {level} {gaps} {plan} {date} {days} {email}
const T = {
  invite: {
    it: {
      s: '{job}: rivediamo insieme cosa ci aspettiamo',
      b: `Ciao {contact},

per partire bene su «{job}» abbiamo scritto, in modo semplice, cosa ci aspettiamo noi di {team} e cosa ci sembra di aver capito che vi aspettate voi di {client}.

Ti chiediamo due minuti per controllare:
{link}

Non serve nessun account. Se manca qualcosa o c’è qualcosa di sbagliato, scrivilo nella pagina: meglio dirlo adesso che alla consegna.

Grazie,
{sender}
{team}`,
    },
    en: {
      s: '{job}: let’s review what we each expect',
      b: `Hi {contact},

to start well on “{job}” we wrote down, in plain words, what we at {team} expect and what we understood {client} expects.

Could you take two minutes to check it:
{link}

No account needed. If something is missing or wrong, write it on the page: better now than at delivery.

Thanks,
{sender}
{team}`,
    },
  },
  checkin: {
    it: {
      s: '{job}: com’è andata la tappa «{milestone}»?',
      b: `Ciao {contact},

siamo alla tappa «{milestone}» di «{job}». Ti chiediamo due minuti: per ogni punto dicci se è andato come previsto.

{link}

Nessun account. Noi rispondiamo per conto nostro e le risposte restano nascoste finché non avete risposto entrambi: così il confronto è onesto.

Grazie,
{sender}
{team}`,
    },
    en: {
      s: '{job}: how did the “{milestone}” milestone go?',
      b: `Hi {contact},

we are at the “{milestone}” milestone of “{job}”. Could you take two minutes: for each point, tell us whether it went as expected.

{link}

No account. We answer on our side, and answers stay hidden until both of us have answered: that keeps the comparison honest.

Thanks,
{sender}
{team}`,
    },
  },
  summary: {
    it: {
      s: '{job}: verifica «{milestone}» completata, allineamento {score}%',
      b: `Ciao {contact},

grazie per la verifica di «{milestone}». Ecco com’è andata:

Allineamento: {score}% ({level})
{gaps}

Prossimo passo: ne parliamo e scriviamo una decisione, così alla prossima tappa siamo sulla stessa pagina.

A presto,
{sender}
{team}`,
    },
    en: {
      s: '{job}: “{milestone}” check completed, alignment {score}%',
      b: `Hi {contact},

thank you for the “{milestone}” check. Here is how it went:

Alignment: {score}% ({level})
{gaps}

Next step: we talk it through and write down a decision, so at the next milestone we are on the same page.

Speak soon,
{sender}
{team}`,
    },
  },
  trialStart: {
    it: {
      s: 'Benvenuto in Altravì: la tua prova di 14 giorni è iniziata',
      b: `Ciao,

la tua prova del piano {plan} è iniziata e dura 14 giorni, fino al {date}. Nessuna carta, nessun pagamento.

Per iniziare: apri la demo, guarda un incarico già pronto e prova la verifica di tappa. Poi crea il tuo primo incarico: servono un minuto.

Se hai una domanda, rispondi a questa email: ti risponde una persona.

Pi.Gi Service
info@pigiservice.com`,
    },
    en: {
      s: 'Welcome to Altravì: your 14-day trial has started',
      b: `Hi,

your {plan} plan trial has started and lasts 14 days, until {date}. No card, no payment.

To begin: open the demo, look at a ready engagement and try a milestone check. Then create your first engagement: it takes a minute.

If you have a question, reply to this email: a person answers.

Pi.Gi Service
info@pigiservice.com`,
    },
  },
  trialEnd: {
    it: {
      s: 'La tua prova di Altravì finisce tra {days} giorni',
      b: `Ciao,

la prova del piano {plan} finisce il {date}. I tuoi incarichi restano sul tuo dispositivo, niente va perso.

Per continuare con più di 5 incarichi attivi scegli un piano: Start 99 € al mese, Team 249 € al mese, Studio 499 € al mese. Con il pagamento annuale hai 2 mesi gratis. Prezzi finali, IVA non applicata (regime forfettario).

Vuoi parlarne prima? Rispondi a questa email.

Pi.Gi Service
info@pigiservice.com`,
    },
    en: {
      s: 'Your Altravì trial ends in {days} days',
      b: `Hi,

your {plan} plan trial ends on {date}. Your engagements stay on your device, nothing is lost.

To go on with more than 5 active jobs pick a plan: Start €99 a month, Team €249 a month, Studio €499 a month. With annual payment you get 2 months free. Final prices, no VAT charged (flat-rate tax regime).

Want to talk first? Reply to this email.

Pi.Gi Service
info@pigiservice.com`,
    },
  },
};
export const IDS = ['invite', 'checkin', 'summary', 'trialStart', 'trialEnd'];
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] == null ? '' : v[k]));
export function email(id, lang, vars = {}) {
  const tpl = T[id][lang] || T[id].it;
  return { subject: fill(tpl.s, vars), body: fill(tpl.b, vars) };
}
export const mailto = (to, m) => 'mailto:' + (to || '') + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
