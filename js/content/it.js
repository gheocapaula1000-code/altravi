// Contenuti curati del motore locale (italiano).
// REGOLE: nessuna cifra senza fonte (campo ev), tono "tende a", positivo-vero prima, niente lessico negativo.
// Ogni cifra qui sotto è stata verificata via web il 1 novembre 2026 (vedi CONCEPT.md, tabella fonti).

export const EVIDENCE = {
  gilbertEbert: {
    scope: 'Studi psicologici',
    headline: 'Dopo una scelta definitiva, la soddisfazione tende a salire',
    source: 'Gilbert & Ebert (2002), Journal of Personality and Social Psychology',
    year: 2002,
    url: 'https://doi.org/10.1037/0022-3514.82.4.503',
    means: 'Nei loro esperimenti, chi non poteva più cambiare idea sulla propria scelta era più soddisfatto di chi poteva ripensarci.',
    limits: 'Sono esperimenti su scelte semplici: indicano una tendenza, non una garanzia.',
  },
  immune: {
    scope: 'Studi psicologici',
    headline: 'Le emozioni difficili durano meno di quanto prevediamo',
    source: 'Gilbert, Pinel, Wilson, Blumberg & Wheatley (1998), Journal of Personality and Social Psychology',
    year: 1998,
    url: 'https://doi.org/10.1037/0022-3514.75.3.617',
    means: 'Le persone sopravvalutano quanto a lungo dureranno le emozioni negative dopo un evento: la mente ha un proprio «sistema immunitario» che le attenua.',
    limits: 'Sono medie su molte persone: non dicono come andrà a te, dicono come tende ad andare.',
  },
  atlanta: {
    scope: 'USA',
    headline: 'Chi cambia lavoro: paga oraria mediana +4,7% in un anno (chi resta: +3,4%)',
    stat: '4,7% vs 3,4%',
    source: 'Federal Reserve Bank of Atlanta, Wage Growth Tracker (media a 3 mesi, settembre 2026)',
    year: 2026,
    url: 'https://www.atlantafed.org/research-and-data/data/wage-growth-tracker',
    means: 'In mediana, chi ha cambiato lavoro ha visto la paga oraria crescere di più; ma anche chi è rimasto l\'ha vista crescere.',
    limits: 'Dati americani, mediane su moltissime persone: non descrivono il tuo settore né il tuo caso.',
    echo: 'Negli USA, a settembre 2026, chi cambia lavoro ha una crescita mediana della paga del 4,7% contro il 3,4% di chi resta.',
  },
  nowok: {
    scope: 'Regno Unito',
    headline: 'Prima di un trasloco la serenità tende a calare e riprende nell\'anno in cui ci si muove',
    source: 'Nowok, van Ham, Findlay & Gayle (2013), Environment and Planning A',
    year: 2013,
    url: 'https://doi.org/10.1068/a45287',
    means: 'Con 12 anni di dati britannici si vede che il calo di soddisfazione precede il trasloco e che nell\'anno in cui ci si sposta si torna al proprio livello abituale.',
    limits: 'Riguarda traslochi interni al Regno Unito: indica una tendenza media, non un salto garantito di felicità.',
  },
  istat: {
    scope: 'Italia',
    headline: 'In Italia nel 2025 oltre 1,4 milioni di cambi di residenza tra Comuni',
    stat: '1.455.000',
    source: 'Istat, Migrazioni interne e internazionali della popolazione residente, anni 2024/2025 (3 agosto 2026, dati provvisori)',
    year: 2026,
    url: 'https://www.istat.it/comunicato-stampa/migrazioni-interne-e-internazionali-della-popolazione-residente-anni-2024-2025/',
    means: 'Trasferirsi è un\'esperienza molto comune: nel 2025 i trasferimenti di residenza tra Comuni italiani sono stati un milione 455mila.',
    limits: 'Conta i cambi di residenza anagrafica, non i motivi né come sono andati.',
    echo: 'In Italia, nel 2025, 1.455.000 trasferimenti di residenza tra Comuni (Istat, dati provvisori): cambiare luogo è una scelta che fanno in moltissimi.',
  },
  abroad: {
    scope: 'Italia',
    headline: 'Per chi parte per un lavoro all\'estero la retribuzione netta a un anno è in media +54,2%',
    stat: '+54,2%',
    source: 'AlmaLaurea, Rapporto 2025 sulla condizione occupazionale dei laureati (laureati di 2° livello occupati all\'estero)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'I laureati di secondo livello italiani occupati all\'estero guadagnano in media oltre 2.200 euro netti al mese a un anno dal titolo, +54,2% rispetto a chi lavora in Italia.',
    limits: 'Riguarda laureati occupati all\'estero, non chi cambia città in Italia; costo della vita e contesti sono diversi.',
  },
  harvard: {
    scope: 'Studi psicologici',
    headline: 'La qualità dei legami è tra i migliori indicatori di benessere nel lungo periodo',
    source: 'Harvard Study of Adult Development (Robert Waldinger), Harvard Gazette',
    year: 2023,
    url: 'https://news.harvard.edu/gazette/story/2023/02/work-out-daily-ok-but-how-socially-fit-are-you/',
    means: 'Seguendo le stesse persone per decenni, lo studio ha trovato che relazioni di buona qualità accompagnano felicità e buona salute.',
    limits: 'È un\'associazione osservata su un gruppo specifico: non dice cosa fare in un caso concreto.',
  },
  liking: {
    scope: 'Studi psicologici',
    headline: 'Dopo una conversazione, ci si piace più di quanto si creda («liking gap»)',
    source: 'Boothby, Cooney, Sandstrom & Clark (2018), Psychological Science',
    year: 2018,
    url: 'https://doi.org/10.1177/0956797618783714',
    means: 'In cinque studi le persone hanno sottovalutato quanto l\'altro le apprezzasse e si fosse trovato bene con loro, anche a mesi di distanza.',
    limits: 'Riguarda conversazioni fra persone che si conoscono poco o da poco: non è una previsione sulla risposta che riceverai.',
  },
  almaOcc: {
    scope: 'Italia',
    headline: 'Laureati: occupati il 78,6% a un anno e circa 9 su 10 a cinque anni',
    stat: '78,6% · 92,8% / 89,7%',
    source: 'AlmaLaurea, Rapporto 2025 sulla condizione occupazionale dei laureati (laureati 2024)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'A un anno dal titolo il tasso di occupazione è 78,6% (1° e 2° livello); a cinque anni è 92,8% (1° livello) e 89,7% (2° livello).',
    limits: 'Sono medie nazionali dei laureati: variano molto per corso, territorio e momento.',
    echo: 'Oltre 690 mila laureati sono stati seguiti nel mondo del lavoro: a un anno dal titolo sono occupati il 78,6% (AlmaLaurea, 2025).',
  },
  almaSat: {
    scope: 'Italia',
    headline: 'Il 90,2% dei laureati è soddisfatto del corso scelto e il 72,2% rifarebbe la stessa scelta',
    stat: '90,2% · 72,2%',
    source: 'AlmaLaurea, Rapporto 2025 sul profilo dei laureati (laureati 2024)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Tra i laureati 2024, il 90,2% dichiara soddisfazione complessiva per il corso e il 72,2% sceglierebbe di nuovo sia il corso sia l\'ateneo.',
    limits: 'È l\'opinione di chi ha finito: non rappresenta chi ha interrotto gli studi.',
    echo: 'Tra oltre 305 mila laureati del 2024, il 90,2% è soddisfatto del corso scelto (AlmaLaurea, 2025).',
  },
  almaIntern: {
    scope: 'Italia',
    headline: 'Il 61% dei laureati ha fatto un tirocinio e il 94,3% di loro ne è soddisfatto',
    stat: '61% · 94,3%',
    source: 'AlmaLaurea, Rapporto 2025 sul profilo dei laureati (laureati 2024)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Il tirocinio curriculare riguarda il 61,0% dei laureati 2024 e il 94,3% dichiara soddisfazione per l\'esperienza.',
    limits: 'Riguarda tirocini inseriti nei corsi di laurea, non qualunque esperienza di prova.',
  },
  almaMismatch: {
    scope: 'Italia',
    headline: 'Una motivazione precisa nella scelta degli studi riduce il disallineamento tra studi e lavoro',
    source: 'AlmaLaurea, Rapporto 2025 (mismatch tra formazione e lavoro)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Secondo AlmaLaurea chi sceglie il percorso con una motivazione precisa, culturale o professionalizzante, è meno esposto a fare un lavoro non coerente con gli studi.',
    limits: 'È un\'associazione osservata sui laureati: non garantisce un singolo esito.',
  },
  almaSelf: {
    scope: 'Italia',
    headline: 'A cinque anni dalla laurea il 15,2% degli occupati di 2° livello lavora in proprio',
    stat: '15,2%',
    source: 'AlmaLaurea, Rapporto 2025 sulla condizione occupazionale dei laureati',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Tra i laureati di secondo livello occupati a cinque anni dal titolo, il 15,2% svolge un\'attività in proprio: più di una persona su sette.',
    limits: 'Riguarda i laureati e include molte forme di lavoro in proprio: non è un tasso di successo delle imprese.',
    echo: 'In Italia, a cinque anni dalla laurea di 2° livello, il 15,2% degli occupati lavora in proprio, più di una persona su sette (AlmaLaurea, 2025).',
  },
  mlDim: {
    scope: 'Italia',
    headline: 'In Italia, nel solo quarto trimestre 2025, 527 mila rapporti di lavoro si sono chiusi con le dimissioni del lavoratore',
    stat: '527 mila · 13,6%',
    source: 'Ministero del Lavoro e delle Politiche Sociali, Nota trimestrale sulle Comunicazioni Obbligatorie, IV trimestre 2025',
    year: 2026,
    url: 'https://www.lavoro.gov.it/documenti-e-norme/studi-e-statistiche/nota-co-iv-trimestre-2025',
    means: 'Le dimissioni sono la parte principale delle cessazioni richieste dal lavoratore: 527 mila in tre mesi, il 13,6% dei rapporti di lavoro conclusi. Lasciare un posto per cercarne un altro è una scelta che in moltissimi fanno ogni trimestre.',
    limits: 'Conta rapporti di lavoro, non persone, e non dice perché ci si dimette né cosa si fa dopo: include anche chi lascia per motivi personali.',
    echo: 'In Italia, solo nel quarto trimestre 2025, 527 mila rapporti di lavoro si sono chiusi con le dimissioni del lavoratore (Ministero del Lavoro): scegliere di cambiare è una cosa che fanno in moltissimi.',
  },
  istatStay: {
    scope: 'Italia',
    headline: 'Il 96,7% di chi lavorava nel 2024 risultava occupato anche nel 2025',
    stat: '96,7%',
    source: 'Istat, La componente longitudinale della rilevazione sulle forze di lavoro, flussi 2024-2025 (2 ottobre 2026)',
    year: 2026,
    url: 'https://www.istat.it/comunicato-stampa/la-componente-longitudinale-della-rilevazione-sulle-forze-di-lavoro-2/',
    means: 'Tra i 15-64enni, la permanenza nell\'occupazione a un anno è salita dal 94,4% (2023-2024) al 96,7% (2024-2025): la continuità del lavoro è la norma.',
    limits: 'Dice che si resta occupati, non che si resta nello stesso posto né che si è soddisfatti; riguarda i 15-64enni residenti.',
    echo: 'In Italia il 96,7% di chi lavorava nel 2024 era ancora occupato nel 2025 (Istat): la continuità del lavoro è la norma, e anche una svolta può essere un passo normale.',
  },
  istatSurv: {
    scope: 'Italia',
    headline: 'Più di 8 nuove imprese italiane su 10 superano il primo anno (80,9%) e circa una su due arriva ai cinque (49,4%)',
    stat: '80,9% · 49,4%',
    source: 'Istat, Demografia d\'impresa anni 2019-2024, Tavola 5 (coorte delle imprese nate nel 2019, 13 luglio 2026)',
    year: 2026,
    url: 'https://www.istat.it/tavole-di-dati/demografia-dimpresa-anni-2019-2024/',
    means: 'La curva delle imprese italiane nate nel 2019: 80,9% ancora attive dopo 1 anno, 69,7% dopo 2, 62,1% dopo 3, 55,4% dopo 4, 49,4% dopo 5.',
    limits: 'Non distingue le chiusure per difficoltà da quelle volontarie o programmate (ad esempio una cessione o un cambio di strada); la coorte attraversa anche gli anni 2020-2024.',
    echo: 'In Italia, tra le imprese nate nel 2019, l\'80,9% era ancora attiva dopo un anno e il 49,4% dopo cinque (Istat).',
  },
  euGrowth: {
    scope: 'Unione europea',
    headline: 'In UE le imprese nate nel 2019 e ancora attive nel 2024 impiegavano il 72% di persone in più',
    stat: '72%',
    source: 'Eurostat, Business demography statistics, Statistics Explained (dati di ottobre 2026)',
    year: 2026,
    url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Business_demography_statistics',
    means: 'Le imprese di cinque anni ancora attive nel 2024 occupavano il 72% di persone in più rispetto al 2019, anno di nascita.',
    limits: 'Riguarda solo le imprese che hanno continuato l\'attività: non descrive quelle che hanno chiuso né dice come andrà a una singola attività.',
  },
  euOwn: {
    scope: 'Italia',
    headline: 'In Italia il 77,1% delle persone vive in una casa di proprietà e il 22,9% in affitto',
    stat: '77,1% · 22,9%',
    source: 'Eurostat, EU-SILC, ilc_lvho02 (Italia, 2025; aggiornato il 20 ottobre 2026)',
    year: 2025,
    url: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_lvho02/default/table?lang=en',
    means: 'Nel 2025 il 77,1% della popolazione italiana viveva in una casa di proprietà (17,3% con mutuo o prestito, 59,9% senza) e il 22,9% in affitto: entrambe le strade sono molto comuni.',
    limits: 'Descrive come vivono le persone oggi, non quale scelta conviene a te: dipende da reddito, città, progetti e momento.',
    echo: 'In Italia il 77,1% delle persone vive in una casa di proprietà e il 22,9% in affitto (Eurostat, 2025): entrambe le strade sono molto comuni.',
  },
  kumar: {
    scope: 'Studi psicologici',
    headline: 'Chi esprime gratitudine tende a sottovalutare quanto l\'altro ne sarà felice',
    source: 'Kumar & Epley (2018), Psychological Science',
    year: 2018,
    url: 'https://doi.org/10.1177/0956797618772506',
    means: 'In esperimenti con lettere di gratitudine, chi le scriveva prevedeva meno sorpresa e meno felicità nei destinatari di quanta ne provassero davvero, e sovrastimava il loro imbarazzo.',
    limits: 'Riguarda lettere di ringraziamento in contesti sperimentali: non prevede come reagirà una persona in particolare.',
    echo: 'Negli esperimenti di Kumar ed Epley (2018), i destinatari di una lettera di gratitudine erano più sorpresi e più felici di quanto chi l\'aveva scritta prevedesse.',
  },
  liuReach: {
    scope: 'Studi psicologici',
    headline: 'Farsi vivi con qualcuno è apprezzato più di quanto si pensi',
    source: 'Liu, Rim, Min & Min (2023), Journal of Personality and Social Psychology',
    year: 2023,
    url: 'https://doi.org/10.1037/pspi0000402',
    means: 'In una serie di studi, chi riceveva un messaggio o un piccolo gesto inatteso lo apprezzava più di quanto chi lo inviava immaginasse: conta più la sorpresa dell\'eventuale imbarazzo.',
    limits: 'Sono studi su messaggi e piccoli gesti: non dicono come andrà una conversazione difficile né se il legame riprenderà.',
    echo: 'In una serie di studi (Liu et al., 2023), chi riceveva un messaggio inatteso lo apprezzava più di quanto chi lo scriveva immaginasse.',
  },
  dunn: {
    scope: 'Studi psicologici',
    headline: 'Spendere per gli altri tende a rendere più felici che spendere per sé',
    source: 'Dunn, Aknin & Norton (2008), Science',
    year: 2008,
    url: 'https://doi.org/10.1126/science.1150952',
    means: 'In un esperimento, le persone che hanno speso una piccola somma per qualcun altro erano più felici di chi l\'aveva spesa per sé.',
    limits: 'Sono indagini e un esperimento con somme piccole: non misurano scelte grandi né dicono quanto duri l\'effetto.',
    echo: 'In un esperimento (Dunn, Aknin e Norton, 2008) chi ha speso una piccola somma per qualcun altro era più felice di chi l\'ha spesa per sé.',
  },
  jenkinson: {
    scope: 'Studi psicologici',
    headline: 'Chi fa volontariato tende a riferire più benessere e meno sintomi depressivi',
    source: 'Jenkinson et al. (2013), BMC Public Health',
    year: 2013,
    url: 'https://doi.org/10.1186/1471-2458-13-773',
    means: 'Una revisione di 40 studi sul volontariato formale ha trovato, nei dati di coorte, associazioni con maggiore soddisfazione di vita e benessere e con meno depressione.',
    limits: 'Sono associazioni osservate: gli studi sperimentali inclusi non hanno confermato gli stessi effetti, quindi non dicono che il volontariato porti da solo a stare meglio.',
    echo: 'Una revisione di 40 studi (Jenkinson et al., 2013) ha trovato, nei dati osservazionali, più benessere e meno depressione in chi fa volontariato.',
  },
  vanboven: {
    scope: 'Studi psicologici',
    headline: 'Le esperienze tendono a rendere più felici dei beni materiali',
    source: 'Van Boven & Gilovich (2003), Journal of Personality and Social Psychology',
    year: 2003,
    url: 'https://doi.org/10.1037/0022-3514.85.6.1193',
    means: 'Nei loro studi le persone riferivano più felicità dagli acquisti-esperienza (viaggi, concerti) che dagli oggetti, anche perché le esperienze sono più legate all\'identità e alle relazioni.',
    limits: 'Sono medie di indagini e esperimenti: un oggetto che si lega a un\'esperienza o a una persona può valere moltissimo.',
  },
  lally: {
    scope: 'Studi psicologici',
    headline: 'Un gesto ripetuto diventa automatico in 66 giorni (mediana; da 18 a 254)',
    stat: '66 giorni',
    source: 'Lally, van Jaarsveld, Potts & Wardle (2010), European Journal of Social Psychology',
    year: 2010,
    url: 'https://doi.org/10.1002/ejsp.674',
    means: 'Seguendo 96 persone per 12 settimane, il tempo mediano per raggiungere l\'automatismo è stato di 66 giorni (da 18 a 254 secondo la persona e il gesto). Saltare una singola occasione non ha inciso in modo rilevante.',
    limits: 'Piccolo campione di gesti semplici (mangiare, bere, muoversi): i tempi variano molto da persona a persona.',
    echo: 'Nello studio sulle abitudini dell\'University College London, 96 persone hanno seguito un gesto quotidiano per 12 settimane (Lally et al., 2010).',
  },
};

const H = (text, feel, ev) => ({ text, feel, ev: ev || null });

export const CATEGORIES = {
  lavoro: {
    label: 'Lavoro',
    color: '#ffb84d',
    example: 'Cambiare lavoro o restare dove sono?',
    keywords: ['lavor', 'impiego', 'dimission', 'dimetterm', 'licenzi', 'promozion', 'carriera', 'ufficio', 'colloquio', 'stipendio', 'azienda', 'capo ', 'offerta', 'proposta di', 'banca', 'anni in ', 'assunzion', 'contratto', 'ruolo', 'part time', 'smart working', 'datore', 'collegh'],
    defaults: { a: 'Cambiare lavoro', b: 'Restare dove sei', c: 'Esplorare senza lasciare' },
    stayWords: ['rest', 'riman', 'non cambi', 'tener', 'mantener', 'aspett'],
    echoes: ['mlDim', 'istatStay', 'atlanta'],
    forks: {
      a: {
        tagline: 'Una nuova stanza, nuovi stimoli',
        supports: [
          'Tre persone che conoscono il tuo valore e a cui chiedere un parere',
          'Un margine di tempo e di risparmio per i primi mesi',
          'Una domanda in più al colloquio: «come si lavora qui, davvero?»',
        ],
        horizons: {
          d1: H('Hai deciso: la mente comincia a mettere in luce i lati buoni della scelta fatta. È normale sentire insieme emozione e un po\' di vertigine: vanno spesso a braccetto.', 'Vertigine buona', 'gilbertEbert'),
          w1: H('Impari nomi, strumenti, orari. Fai tante domande e va bene così: nelle prime settimane si cerca di capire, non di dimostrare.', 'Curiosità'),
          m3: H('Cominci a muoverti senza mappa. I colleghi ti vedono per ciò che porti. Spesso ora si vede se compiti, tempo e paga sono quelli che immaginavi.', 'Orientamento'),
          y1: H('Un anno dopo hai una storia nuova da raccontare e competenze in più. In Italia, in soli tre mesi del 2025, 527 mila rapporti di lavoro si sono chiusi con le dimissioni del lavoratore (Ministero del Lavoro): cambiare è una strada molto battuta.', 'Slancio', 'mlDim'),
        },
        evidence: ['gilbertEbert', 'mlDim', 'atlanta', 'immune'],
      },
      b: {
        tagline: 'Radici, e un modo nuovo di starci',
        supports: [
          'Una cosa che vorresti cambiare dove sei, scritta in una riga',
          'Una persona con cui parlare di crescita o di nuovi incarichi',
          'Una data tua entro cui rifare il punto',
        ],
        horizons: {
          d1: H('Hai scelto di restare: è una scelta, non un rinvio. La mente si assesta e ritrova solidità in ciò che già conosci.', 'Solidità', 'gilbertEbert'),
          w1: H('Guardi il tuo lavoro con occhi nuovi: cosa funziona, cosa ti manca. Notare cosa ti piace è già una bussola.', 'Chiarezza'),
          m3: H('Hai avuto modo di proporre un cambiamento piccolo: un incarico, un orario, un progetto. Anche restare è muoversi: la paga di chi non cambia lavoro cresce comunque (mediana +3,4%, dati USA).', 'Stabilità viva', 'atlanta'),
          y1: H('Un anno dopo conosci il posto meglio di chiunque e puoi decidere con più dati in mano. In Italia il 96,7% di chi lavorava nel 2024 era ancora occupato nel 2025 (Istat): la continuità è comune, e può essere una scelta consapevole.', 'Radicamento', 'istatStay'),
        },
        evidence: ['gilbertEbert', 'istatStay', 'atlanta', 'immune'],
      },
      c: {
        tagline: 'Aprire uno spiraglio senza chiudere la porta',
        supports: [
          'Un\'ora a settimana dedicata a esplorare',
          'Due conversazioni con persone che fanno il lavoro che ti incuriosisce',
          'Un piccolo progetto-prova da fare nel tempo libero',
        ],
        horizons: {
          d1: H('Fissi un piccolo passo: una chiacchierata, un curriculum aggiornato. Il primo passo toglie molta nebbia.', 'Sollievo'),
          w1: H('Hai parlato con qualcuno del mestiere che ti incuriosisce: spesso emergono dettagli che nessun annuncio racconta.', 'Scoperta'),
          m3: H('Hai più informazioni reali e meno ipotesi. La scelta, quando arriva, è molto più tua.', 'Fiducia'),
          y1: H('Hai una scelta fatta con calma. Qualunque porta tu apra, la apri con più mappa e meno ansia.', 'Libertà'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
    },
  },

  trasloco: {
    label: 'Trasferirsi',
    color: '#4fd1c5',
    example: 'Trasferirmi in un\'altra città o restare dove sono?',
    keywords: ['trasfer', 'traslo', 'citt', 'cambiare casa', 'andare a vivere', 'vivere a', 'estero', 'milano', 'roma', 'partire', 'emigr', 'mi sposto', 'convivenza'],
    defaults: { a: 'Partire', b: 'Restare dove sei', c: 'Vivere un\'anteprima' },
    stayWords: ['rest', 'riman', 'non part', 'non mi trasfer', 'tener', 'aspett'],
    echoes: ['istat', 'abroad'],
    forks: {
      a: {
        tagline: 'Un luogo nuovo, un modo nuovo di essere te',
        supports: [
          'Un punto d\'appoggio per le prime settimane (un amico, una stanza, un contatto)',
          'Un posto dove passare la domenica: un parco, un bar, una sala',
          'Due videochiamate fisse con chi resta, ogni settimana',
        ],
        horizons: {
          d1: H('Hai deciso: la parte più faticosa, decidere, è alle spalle. Gli studi mostrano che il calo di serenità prima di un trasloco tende a sciogliersi proprio quando ci si muove.', 'Sollievo', 'nowok'),
          w1: H('Scatoloni, indirizzi, strade nuove. Tutto è nuovo, anche la stanchezza: i primi giorni sono la sveglia dei sensi.', 'Energia nuova'),
          m3: H('Cominci ad avere i tuoi posti: il bar, la strada, la faccia nota. Nell\'anno del trasloco, l\'umore tende a tornare al proprio livello abituale.', 'Appartenenza', 'nowok'),
          y1: H('Un anno dopo hai due case dentro di te. Se la partenza è per un lavoro all\'estero, la retribuzione netta a un anno è in media molto più alta (+54,2% per i laureati di 2° livello).', 'Ampiezza', 'abroad'),
        },
        evidence: ['nowok', 'istat', 'abroad'],
      },
      b: {
        tagline: 'Le radici, scelte di nuovo',
        supports: [
          'Una cosa nuova da fare nel tuo posto, mai fatta prima',
          'Una persona con cui rinsaldare un legame',
          'Una data per rivedere la scelta',
        ],
        horizons: {
          d1: H('Hai scelto di restare: il tuo posto torna a essere una scelta e non un\'abitudine. La mente comincia a trovarne i pregi.', 'Appartenenza', 'gilbertEbert'),
          w1: H('Fai una cosa nuova nei luoghi di sempre: un percorso diverso, un invito. La novità non sta solo altrove.', 'Novità'),
          m3: H('Le relazioni vicine hanno avuto spazio per crescere. Lo studio di Harvard sulla vita adulta mostra che la qualità dei legami è tra i migliori indicatori di benessere nel tempo.', 'Calore', 'harvard'),
          y1: H('Un anno dopo conosci il tuo posto in profondità, e chi ami sa di poter contare su di te.', 'Radicamento'),
        },
        evidence: ['gilbertEbert', 'harvard', 'istat'],
      },
      c: {
        tagline: 'Vivere un\'anteprima, poi decidere',
        supports: [
          'Un periodo di prova di due o quattro settimane',
          'Tre righe a sera: cosa mi è piaciuto oggi',
          'Una persona del luogo che ti racconti com\'è davvero',
        ],
        horizons: {
          d1: H('Scegli un periodo di prova: la decisione diventa piccola e concreta.', 'Leggerezza'),
          w1: H('Vivi il luogo da residente e non da turista: orari, spese, rumori. La realtà batte l\'immaginazione.', 'Realtà'),
          m3: H('Hai dati veri su come ti senti lì. La scelta che segue poggia sull\'esperienza e non sulle ipotesi.', 'Sicurezza'),
          y1: H('Hai scelto a occhi aperti. Sia che tu parta sia che tu resti, lo fai senza il «e se…?».', 'Pace'),
        },
        evidence: ['nowok', 'istat'],
      },
    },
  },

  relazioni: {
    label: 'Relazioni',
    color: '#f687b3',
    example: 'Dirgli quello che provo o aspettare ancora?',
    keywords: ['amore', 'innamor', 'fidanzat', 'relazion', 'partner', 'lui ', 'lei ', 'amic', 'famiglia', 'dirgli', 'dirle', 'litigi', 'ex ', 'coppia', 'sposar', 'matrimon', 'sentiment', 'dichiar', 'ti amo', 'lo amo', 'la amo', 'mi piace', 'dire a ', 'dirti', 'baci'],
    defaults: { a: 'Parlare con sincerità', b: 'Aspettare e osservare', c: 'Un piccolo gesto' },
    stayWords: ['aspett', 'attend', 'osserv', 'non dir', 'tacer', 'rest'],
    echoes: ['harvard', 'liking'],
    forks: {
      a: {
        tagline: 'Aprire la porta con parole vere',
        supports: [
          'Un momento tranquillo, senza fretta',
          'Una frase d\'inizio semplice: «Ci tengo a dirti una cosa»',
          'Il permesso di non avere già tutte le risposte',
        ],
        horizons: {
          d1: H('Hai deciso di parlare: spesso il sollievo comincia prima ancora delle parole.', 'Sollievo'),
          w1: H('Dopo una conversazione, di solito si sta meglio di quanto si temeva: gli studi sul «liking gap» mostrano che le persone ci apprezzano più di quanto pensiamo.', 'Leggerezza', 'liking'),
          m3: H('Qualunque sia stata la risposta, ora c\'è chiarezza. La chiarezza è una forma di pace e lascia spazio a ciò che viene.', 'Chiarezza'),
          y1: H('Un anno dopo ricordi di aver avuto il coraggio di dire. Le relazioni di qualità sono tra i più solidi indicatori di benessere nel lungo periodo (Harvard).', 'Autenticità', 'harvard'),
        },
        evidence: ['liking', 'harvard', 'gilbertEbert'],
      },
      b: {
        tagline: 'Dare tempo al tempo, con gli occhi aperti',
        supports: [
          'Una data (per esempio fra due settimane) in cui ti riservi di scegliere',
          'Tre cose che noti, scritte, senza giudicare',
          'Qualcuno di fidato con cui sfogare i pensieri',
        ],
        horizons: {
          d1: H('Hai scelto di darti tempo: non è fuga, è scegliere il momento. La mente ringrazia di non essere forzata.', 'Respiro'),
          w1: H('Osservi cosa senti nei momenti piccoli. Spesso le risposte stanno nei dettagli: chi ti fa ridere, chi ti ascolta.', 'Attenzione'),
          m3: H('Hai raccolto abbastanza segnali per scegliere con la testa e col cuore insieme.', 'Chiarezza'),
          y1: H('Hai imparato un ritmo tuo nel decidere sui legami: né di corsa, né mai.', 'Equilibrio'),
        },
        evidence: ['harvard', 'immune'],
      },
      c: {
        tagline: 'Un invito leggero, senza peso',
        supports: [
          'Un gesto piccolo: un messaggio, un caffè, un grazie',
          'Nessuna aspettativa sulla risposta',
          'Un modo di dire «ho pensato a te» e basta',
        ],
        horizons: {
          d1: H('Fai un gesto piccolo: i gesti piccoli sono i più facili da accogliere e da fare.', 'Leggerezza'),
          w1: H('Dopo una conversazione le persone tendono a piacersi più di quanto credono (liking gap): un piccolo gesto è un modo semplice di cominciarla.', 'Calore', 'liking'),
          m3: H('Una piccola abitudine di attenzione ha reso il legame più vivo, o più chiaro.', 'Vicinanza'),
          y1: H('I legami si coltivano con gesti piccoli e ripetuti: la qualità delle relazioni accompagna il benessere nel tempo (Harvard).', 'Radici', 'harvard'),
        },
        evidence: ['liking', 'harvard'],
      },
    },
  },

  studio: {
    label: 'Studio',
    color: '#90cdf4',
    example: 'Iscrivermi all\'università o lavorare prima?',
    keywords: ['studi', 'universit', 'laurea', 'corso', 'master', 'scuola', 'dottorato', 'iscriv', 'esame', 'liceo', 'facolt'],
    defaults: { a: 'Iscriversi', b: 'Lavorare prima, studiare poi', c: 'Provare con un corso breve' },
    stayWords: ['lavorar', 'aspett', 'prima', 'non iscriv', 'rimand', 'rest'],
    echoes: ['almaSat', 'almaOcc'],
    forks: {
      a: {
        tagline: 'Una strada di sapere e di incontri',
        supports: [
          'Un orario di studio fisso e piccolo, anche 30 minuti',
          'Un compagno di corso con cui confrontarti',
          'Una data in cui festeggiare il primo esame',
        ],
        horizons: {
          d1: H('Hai deciso: la curiosità prende la guida. Iscriversi è il passo più grande, e l\'hai fatto.', 'Orgoglio', 'gilbertEbert'),
          w1: H('Nuovi orari, nuove parole. Si impara a imparare di nuovo: la fatica dei primi giorni è normalissima.', 'Entusiasmo'),
          m3: H('Il primo esame è un traguardo che cambia il modo di vedersi. In Italia il 90,2% dei laureati si dichiara soddisfatto del corso scelto.', 'Appartenenza', 'almaSat'),
          y1: H('Un anno dopo hai un linguaggio nuovo e un gruppo di persone. L\'occupazione dei laureati è del 78,6% a un anno dal titolo e arriva a circa 9 su 10 a cinque anni.', 'Prospettiva', 'almaOcc'),
        },
        evidence: ['almaSat', 'almaOcc', 'gilbertEbert'],
      },
      b: {
        tagline: 'Costruire esperienza, poi scegliere meglio',
        supports: [
          'Una cosa che vuoi capire del mondo del lavoro',
          'Un piccolo budget per quando studierai',
          'Una data in cui rivedere la scelta',
        ],
        horizons: {
          d1: H('Hai scelto di fare esperienza prima: una scelta con un piano. La mente si fida di ciò che ha una data.', 'Concretezza', 'gilbertEbert'),
          w1: H('Impari come funziona un luogo di lavoro: sapere cosa ti manca è un ottimo motivo per studiare bene.', 'Realtà'),
          m3: H('Hai soldi, esperienza e domande migliori da portare allo studio.', 'Autonomia'),
          y1: H('Un anno dopo sai cosa vuoi studiare e perché. Per AlmaLaurea chi sceglie il percorso con una motivazione precisa è meno esposto al disallineamento tra studi e lavoro.', 'Direzione', 'almaMismatch'),
        },
        evidence: ['almaMismatch', 'gilbertEbert'],
      },
      c: {
        tagline: 'Assaggiare prima di scegliere',
        supports: [
          'Un corso breve o una lezione aperta',
          'Una persona che fa quel mestiere',
          'Un\'ora a settimana per provare',
        ],
        horizons: {
          d1: H('Scegli di provare in piccolo: una lezione, un corso breve. Il dubbio si fa esperienza.', 'Leggerezza'),
          w1: H('Dopo la prima lezione spesso capisci subito se ti accende o no: entrambe le risposte sono utili.', 'Chiarezza'),
          m3: H('In Italia il tirocinio curriculare riguarda il 61% dei laureati e il 94,3% di chi lo fa si dichiara soddisfatto: provare sul campo è una strada molto battuta.', 'Scoperta', 'almaIntern'),
          y1: H('Un anno dopo hai fatto una scelta di studi con prove in mano.', 'Sicurezza'),
        },
        evidence: ['almaIntern', 'almaMismatch'],
      },
    },
  },

  impresa: {
    label: 'Mettersi in proprio',
    color: '#faf089',
    example: 'Aprire la mia attività o restare dipendente?',
    keywords: ['attivit', 'impresa', 'startup', 'aprire', 'negozio', 'partita iva', 'mettermi in proprio', 'in proprio', 'freelance', 'socio', 'business', 'progetto mio'],
    defaults: { a: 'Aprire l\'attività', b: 'Restare dov\'ero', c: 'Partire in piccolo, in parallelo' },
    stayWords: ['rest', 'riman', 'dipendent', 'non apr', 'aspett'],
    echoes: ['istatSurv', 'almaSelf'],
    forks: {
      a: {
        tagline: 'Un\'idea che prende corpo',
        supports: [
          'Tre potenziali clienti con cui parlare prima di spendere',
          'Un commercialista o un consulente per il primo orientamento sul regime fiscale più adatto',
          'Una spesa massima che ti lascia tranquillo',
        ],
        horizons: {
          d1: H('Hai deciso: l\'idea smette di essere solo tua e comincia a esistere. È una sensazione potente e normale: eccitazione e vertigine insieme.', 'Eccitazione', 'gilbertEbert'),
          w1: H('Fai cose concrete: nome, primo cliente, primi conti. Ci sono tante cose da imparare e l\'ordine in cui le impari è libero.', 'Slancio'),
          m3: H('Hai i primi riscontri veri. I numeri cominciano a parlare e puoi ascoltarli con curiosità.', 'Concretezza'),
          y1: H('Un anno dopo hai dati veri in mano. In Italia più di 8 nuove imprese su 10 superano il primo anno (80,9% per quelle nate nel 2019) e circa una su due arriva ai cinque (49,4%): sono numeri di partenza, non un destino.', 'Tenuta', 'istatSurv'),
        },
        evidence: ['istatSurv', 'euGrowth', 'gilbertEbert'],
      },
      b: {
        tagline: 'Il sogno resta acceso, la porta resta aperta',
        supports: [
          'Una riga che descrive l\'idea, da tenere in un cassetto',
          'Un\'ora al mese per ascoltare cosa succede nel tuo settore',
          'Una data in cui rivedere la scelta',
        ],
        horizons: {
          d1: H('Hai scelto di non aprire adesso: è una scelta di tempo, non una rinuncia. La mente trova pace nelle cose che hanno una data.', 'Calma', 'gilbertEbert'),
          w1: H('Guardi il tuo lavoro sapendo che l\'idea è lì, al sicuro: una stabilità che dà ossigeno.', 'Calma'),
          m3: H('Noti cosa cambia nel tuo settore e raccogli indizi senza pressione.', 'Attenzione'),
          y1: H('Un anno dopo l\'idea è più matura, oppure ha lasciato spazio a una nuova. In entrambi i casi hai scelto tu il momento.', 'Libertà'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
      c: {
        tagline: 'Provare il sogno senza lasciare la riva',
        supports: [
          'Un\'offerta minima da proporre a una persona reale',
          'Una spesa-limite fissata in anticipo',
          'Due ore a settimana dedicate, non di più',
        ],
        horizons: {
          d1: H('Scegli di partire in piccolo: la prova costa poco e insegna molto.', 'Leggerezza'),
          w1: H('Mostri l\'idea a una persona vera: ogni risposta, sì o no, è un\'informazione preziosa.', 'Scoperta'),
          m3: H('Hai i primi riscontri senza aver messo in gioco tutto: puoi crescere o cambiare rotta con calma. È una strada percorsa da molti: in Italia, a cinque anni dalla laurea di 2° livello, il 15,2% degli occupati lavora in proprio.', 'Chiarezza', 'almaSelf'),
          y1: H('Un anno dopo hai i primi dati veri. In UE le imprese ancora attive a cinque anni impiegano il 72% di persone in più rispetto all\'anno di nascita (Eurostat): quando una cosa regge, tende a crescere.', 'Cammino', 'euGrowth'),
        },
        evidence: ['almaSelf', 'euGrowth', 'istatSurv'],
      },
    },
  },

  acquisto: {
    label: 'Un acquisto',
    color: '#fbb6ce',
    example: 'Comprarlo adesso o aspettare un po\'?',
    keywords: ['compr', 'acquist', 'prezzo', 'costa', 'regal', 'macchina', 'auto ', 'telefono', 'viaggio', 'vacanza', 'spendere', 'in offerta', 'sconto', 'saldi'],
    defaults: { a: 'Comprarlo', b: 'Aspettare un po\'', c: 'Scegliere un\'esperienza' },
    stayWords: ['aspett', 'attend', 'non compr', 'rimand', 'dopo'],
    echoes: ['vanboven'],
    forks: {
      a: {
        tagline: 'Un sì deciso, un oggetto che entra nella tua vita',
        supports: [
          'Un budget che ti lascia tranquillo a fine mese',
          'Un momento in cui userai l\'oggetto, già immaginato',
          'Un modo di godertelo: dargli uno spazio e un\'occasione',
        ],
        horizons: {
          d1: H('Hai deciso: l\'indecisione scompare. Una scelta definitiva tende a essere più soddisfacente di una che si può sempre rivedere.', 'Soddisfazione', 'gilbertEbert'),
          w1: H('Lo usi, lo conosci. La novità è al massimo: goditela, è fatta anche per questo.', 'Piacere'),
          m3: H('L\'oggetto diventa parte della routine: comodità e abitudine. Le ricerche suggeriscono che ciò che si lega a esperienze e persone dà una felicità più duratura.', 'Comodità', 'vanboven'),
          y1: H('Un anno dopo l\'oggetto è una piccola presenza fidata. Se ti ha aperto a una nuova esperienza, è stato un acquisto ben speso.', 'Familiarità'),
        },
        evidence: ['gilbertEbert', 'vanboven'],
      },
      b: {
        tagline: 'Lasciar maturare il desiderio',
        supports: [
          'Una data in cui deciderai (per esempio fra 14 giorni)',
          'Una riga: cosa vorrei fare con questo oggetto?',
          'Un confronto con una seconda opzione',
        ],
        horizons: {
          d1: H('Hai scelto di aspettare: il desiderio ha una data, e questo toglie fretta.', 'Calma'),
          w1: H('Osservi se il desiderio resta, cresce o cambia forma: tutte e tre le cose sono informazioni.', 'Chiarezza'),
          m3: H('Se decidi di comprare lo fai con più informazioni; se non lo fai, hai tenuto qualcosa per te.', 'Libertà'),
          y1: H('Hai imparato a conoscere i tuoi desideri e a riservarti il momento giusto per assecondarli.', 'Maturità'),
        },
        evidence: ['gilbertEbert', 'vanboven'],
      },
      c: {
        tagline: 'Trasformare il desiderio in un\'esperienza',
        supports: [
          'Un\'esperienza che ti dia lo stesso desiderio: un viaggio, un corso, una serata',
          'Una persona con cui condividerla',
          'Una data in cui viverla',
        ],
        horizons: {
          d1: H('Orienti il desiderio verso un\'esperienza: un programma e una data.', 'Entusiasmo'),
          w1: H('Cominci a immaginare e a preparare: anche l\'attesa è parte del piacere.', 'Attesa'),
          m3: H('Le ricerche mostrano che le esperienze tendono a rendere più felici dei beni materiali, anche perché si rileggono in chiave positiva e legano alle persone.', 'Ricordi', 'vanboven'),
          y1: H('Un anno dopo hai un ricordo vivo che nessuno può toglierti.', 'Ricordo'),
        },
        evidence: ['vanboven', 'gilbertEbert'],
      },
    },
  },

  salute: {
    label: 'Una nuova abitudine',
    color: '#9ae6b4',
    example: 'Partire oggi con una nuova abitudine o aspettare lunedì?',
    keywords: ['abitudin', 'palestra', 'correre', 'camminar', 'dieta', 'dormire', 'sonno', 'smettere di fumare', 'fumo', 'allenar', 'meditar', 'sport', 'mangiare', 'bere meno', 'yoga'],
    defaults: { a: 'Partire oggi, in piccolo', b: 'Partire con un piano completo', c: 'Prepararmi e partire fra una settimana' },
    stayWords: ['aspett', 'lunedi', 'lunedì', 'dopo', 'rimand', 'prepar'],
    echoes: ['lally'],
    forks: {
      a: {
        tagline: 'Due minuti, ma oggi',
        supports: [
          'Una versione minuscola dell\'abitudine (due minuti)',
          'Un aggancio: dopo il caffè, prima del telegiornale',
          'Un segno visibile: una croce sul calendario',
        ],
        horizons: {
          d1: H('Hai fatto il primo passo oggi: un inizio piccolo è un inizio vero.', 'Fatto!', 'gilbertEbert'),
          w1: H('Hai ripetuto qualche volta: la ripetizione nello stesso contesto trasforma un gesto in abitudine. Se salti un giorno non si perde nulla: nello studio di Lally mancare un\'occasione non ha inciso in modo rilevante.', 'Ritmo', 'lally'),
          m3: H('A tre mesi sei oltre il tempo mediano (66 giorni) in cui un gesto ripetuto diventa automatico.', 'Naturalezza', 'lally'),
          y1: H('Un anno dopo il gesto fa parte della giornata: è diventato automatico.', 'Stabilità'),
        },
        evidence: ['lally', 'gilbertEbert'],
      },
      b: {
        tagline: 'Un percorso disegnato con cura',
        supports: [
          'Un piano scritto in una pagina',
          'Un modo di adattarlo se la settimana è piena',
          'Una persona con cui condividerlo',
        ],
        horizons: {
          d1: H('Hai un piano: un percorso scritto dà direzione e sicurezza.', 'Direzione', 'gilbertEbert'),
          w1: H('Segui il piano e lo adatti: la flessibilità fa parte del piano. Un giorno saltato non spezza nulla (Lally, 2010).', 'Flessibilità', 'lally'),
          m3: H('Superi il tempo mediano per fare di un gesto un\'abitudine (66 giorni). Il piano ha lasciato posto alla naturalezza.', 'Costanza', 'lally'),
          y1: H('Un anno dopo hai un\'abitudine che hai disegnato tu, su misura.', 'Su misura'),
        },
        evidence: ['lally', 'gilbertEbert'],
      },
      c: {
        tagline: 'Preparare il terreno, poi partire leggeri',
        supports: [
          'Una data di partenza (per esempio lunedì prossimo)',
          'Una cosa da preparare ogni giorno: scarpe pronte, borsa, orario',
          'Un primo gesto minuscolo da fare il giorno della partenza',
        ],
        horizons: {
          d1: H('Hai una data: preparare è già iniziare.', 'Attesa'),
          w1: H('Arrivato il giorno, tutto è pronto: il primo gesto costa meno fatica.', 'Prontezza'),
          m3: H('Il gesto è parte della giornata. Se ci sono state interruzioni, nulla è perso: nello studio di Lally una mancanza singola non ha inciso in modo rilevante.', 'Continuità', 'lally'),
          y1: H('Un anno dopo il gesto è di casa.', 'Casa'),
        },
        evidence: ['lally'],
      },
    },
  },

  casa: {
    label: 'Casa',
    color: '#ffa987',
    example: 'Comprare casa o restare in affitto?',
    keywords: ['casa ', 'comprare casa', 'acquistare casa', 'mutuo', 'affitt', 'appartament', 'immobil', 'ristruttur', 'rogito', 'prima casa', 'inquilin'],
    defaults: { a: 'Comprare casa', b: 'Restare in affitto', c: 'Esplorare con calma' },
    stayWords: ['affitt', 'rest', 'riman', 'aspett', 'non compr'],
    echoes: ['euOwn'],
    forks: {
      a: {
        tagline: 'Un posto che diventa tuo',
        supports: [
          'Un incontro con una persona esperta (banca, notaio o consulente) prima di decidere',
          'Un elenco di tre cose che la casa deve avere e tre a cui puoi rinunciare',
          'Un margine di tranquillità nei conti anche dopo le spese iniziali',
        ],
        horizons: {
          d1: H('Hai deciso: la parte più faticosa, scegliere, è alle spalle, e la mente comincia a mettere in luce i lati buoni della casa che immagini.', 'Sollievo', 'gilbertEbert'),
          w1: H('Visite, numeri, carte: è la fase più laboriosa, e ogni passo concreto rende la casa un po\' più reale.', 'Concretezza'),
          m3: H('Cominci a trovare i tuoi angoli: la luce del mattino, il posto per il caffè. Le emozioni difficili, se ci sono state, tendono a durare meno di quanto prevediamo.', 'Radicamento', 'immune'),
          y1: H('Un anno dopo la casa ha la tua impronta. In Italia il 77,1% delle persone vive in una casa di proprietà (Eurostat, 2025): è una strada molto comune.', 'Radici', 'euOwn'),
        },
        evidence: ['gilbertEbert', 'euOwn', 'immune'],
      },
      b: {
        tagline: 'Leggerezza e libertà di muoversi',
        supports: [
          'Una cifra mensile che ti lascia respirare',
          'Un angolo della casa che senti tuo (una pianta, una luce, un quadro)',
          'Una data in cui rivedere la scelta',
        ],
        horizons: {
          d1: H('Hai scelto di restare in affitto: è una scelta con i suoi vantaggi, a partire dalla libertà di cambiare quando vorrai.', 'Libertà', 'gilbertEbert'),
          w1: H('Dai alla casa di oggi un tocco tuo: il sentirsi a casa si costruisce con piccole cose.', 'Calore'),
          m3: H('Hai più margine di movimento e il tempo di guardarti intorno senza fretta.', 'Respiro'),
          y1: H('Un anno dopo hai scelto di nuovo, a occhi aperti. In Italia oltre una persona su cinque vive in affitto (22,9%, Eurostat 2025): è una strada normale e molto condivisa.', 'Appartenenza', 'euOwn'),
        },
        evidence: ['gilbertEbert', 'euOwn', 'immune'],
      },
      c: {
        tagline: 'Immaginare prima di scegliere',
        supports: [
          'Due o tre visite in orari diversi, anche solo per sentire il quartiere',
          'Una simulazione dei conti fatta con una persona competente',
          'Una pagina in cui scrivi come vorresti vivere la tua giornata a casa',
        ],
        horizons: {
          d1: H('Scegli di esplorare: guardare case senza dover decidere subito toglie molta pressione.', 'Leggerezza'),
          w1: H('Cominci a capire cosa conta davvero per te: la luce, il quartiere, il silenzio.', 'Chiarezza'),
          m3: H('Hai un\'idea più nitida del tuo desiderio e dei conti. Qualunque decisione verrà ora poggia su fatti tuoi.', 'Fiducia'),
          y1: H('Un anno dopo la tua scelta poggia su visite e conti veri, non su ipotesi. La mente tende a ritrovare serenità dopo un cambiamento, spesso più in fretta di quanto pensiamo.', 'Serenità', 'immune'),
        },
        evidence: ['gilbertEbert', 'immune', 'euOwn'],
      },
    },
  },

  amicizia: {
    label: 'Un legame',
    color: '#a7f3d0',
    example: 'Scrivere a un vecchio amico o aspettare che si faccia vivo lui?',
    keywords: ['vecchio amic', 'vecchia amic', 'riallacc', 'scrivere a', 'chiamare', 'ritrovare', 'riconcili', 'ringrazi', 'gratitudin', 'scus', 'mi manca', 'farmi viv', 'farsi viv', 'messaggio', 'contatti', 'perdon'],
    defaults: { a: 'Fare il primo passo', b: 'Aspettare che sia l\'altro', c: 'Un piccolo segno' },
    stayWords: ['aspett', 'attend', 'farsi viv', 'farmi viv', 'lasciar'],
    echoes: ['liuReach', 'kumar'],
    forks: {
      a: {
        tagline: 'Riaprire una porta rimasta socchiusa',
        supports: [
          'Una frase semplice per cominciare: «Mi sei venuto in mente e mi ha fatto piacere»',
          'Nessuna aspettativa su quando o come arriverà la risposta',
          'Un momento senza fretta per scrivere',
        ],
        horizons: {
          d1: H('Hai deciso di farti vivo: il sollievo di aver scelto arriva spesso prima del messaggio stesso.', 'Sollievo', 'gilbertEbert'),
          w1: H('Un messaggio inatteso di solito è accolto con più piacere di quanto chi lo scrive pensi: nelle ricerche conta più la sorpresa dell\'eventuale imbarazzo.', 'Leggerezza', 'liuReach'),
          m3: H('Qualunque sia stata la risposta, ora c\'è chiarezza, e la porta è stata aperta da te. Anche un legame che cambia forma resta parte della tua storia.', 'Chiarezza'),
          y1: H('Un anno dopo ricordi di aver avuto il coraggio di scrivere. La qualità dei legami è tra i migliori indicatori di benessere nel lungo periodo (Harvard).', 'Autenticità', 'harvard'),
        },
        evidence: ['liuReach', 'harvard', 'gilbertEbert'],
      },
      b: {
        tagline: 'Lasciare spazio, con la porta aperta',
        supports: [
          'Una data in cui deciderai se fare tu il passo',
          'Un ricordo bello di questa persona, scritto in due righe',
          'Un gesto di cura per un altro legame, intanto',
        ],
        horizons: {
          d1: H('Hai scelto di lasciare spazio: non è chiusura, è dare tempo. La mente ringrazia di non essere forzata.', 'Respiro', 'gilbertEbert'),
          w1: H('Noti quanti legami vivi hai intorno: coltivare anche quelli è una forma di cura.', 'Calore'),
          m3: H('Hai avuto tempo di capire cosa desideri davvero da questo legame, e sei più chiaro nel scegliere.', 'Chiarezza'),
          y1: H('Un anno dopo hai imparato un tuo modo di stare nei legami: né inseguire, né chiudere. Harvard mostra che la qualità dei legami accompagna il benessere nel tempo.', 'Equilibrio', 'harvard'),
        },
        evidence: ['harvard', 'immune', 'liuReach'],
      },
      c: {
        tagline: 'Un grazie, una foto, un ricordo',
        supports: [
          'Un ricordo condiviso da citare in una riga',
          'Un ringraziamento sincero per qualcosa che questa persona ti ha dato',
          'Nessuna richiesta, solo un pensiero',
        ],
        horizons: {
          d1: H('Scegli un gesto piccolo: i gesti piccoli sono facili da fare e facili da accogliere.', 'Leggerezza'),
          w1: H('Dire grazie ha un effetto che chi lo dice tende a sottovalutare: negli esperimenti di Kumar ed Epley (2018) chi riceveva una lettera di gratitudine era più sorpreso e più felice del previsto.', 'Calore', 'kumar'),
          m3: H('Il piccolo gesto ha riacceso un filo, oppure ha chiuso una storia con gratitudine: due esiti buoni.', 'Vicinanza'),
          y1: H('I legami si coltivano con gesti piccoli e ripetuti: la qualità delle relazioni accompagna il benessere nel tempo (Harvard).', 'Radici', 'harvard'),
        },
        evidence: ['kumar', 'liuReach', 'harvard'],
      },
    },
  },

  altruismo: {
    label: 'Dare una mano',
    color: '#e9a8ff',
    example: 'Iscrivermi come volontario o aspettare di avere più tempo?',
    keywords: ['volontar', 'donare', 'donazion', 'aiutare', 'associazion', 'beneficenza', 'dare una mano', 'solidariet', 'sostenere', 'mettermi a disposizione'],
    defaults: { a: 'Iniziare adesso', b: 'Aspettare di avere più tempo', c: 'Provare una volta sola' },
    stayWords: ['aspett', 'più tempo', 'rimand', 'dopo', 'quando avr'],
    echoes: ['dunn', 'jenkinson'],
    forks: {
      a: {
        tagline: 'Un posto dove la tua mano serve',
        supports: [
          'Un\'ora a settimana, scelta in anticipo, non di più',
          'Un\'associazione vicina a te, scelta dopo una chiacchierata',
          'Una persona con cui cominciare insieme',
        ],
        horizons: {
          d1: H('Hai deciso di dare una mano: la scelta ha già un senso, e la mente comincia a metterlo in luce.', 'Senso', 'gilbertEbert'),
          w1: H('Conosci il posto, le persone, il compito: all\'inizio si osserva e si impara, e ogni piccolo aiuto conta.', 'Appartenenza'),
          m3: H('Hai un ritmo tuo e un volto in più che ti saluta. Una revisione di 40 studi ha trovato, nei dati osservazionali, più benessere e meno depressione tra chi fa volontariato.', 'Utilità', 'jenkinson'),
          y1: H('Un anno dopo hai una storia di cura da raccontare e persone nuove accanto. Nel loro esperimento (2008), chi ha speso per qualcun altro era più felice di chi ha speso per sé.', 'Calore', 'dunn'),
        },
        evidence: ['jenkinson', 'dunn', 'gilbertEbert'],
      },
      b: {
        tagline: 'Preparare il terreno per quando sarà il momento',
        supports: [
          'Una data in cui rivedere la scelta',
          'Due associazioni che ti incuriosiscono, annotate',
          'Un piccolo gesto di aiuto già oggi, anche minuscolo',
        ],
        horizons: {
          d1: H('Hai scelto di aspettare: una scelta con una data è una scelta, non un rinvio.', 'Calma', 'gilbertEbert'),
          w1: H('Guardi quali cause ti toccano di più: già questo è un modo di avvicinarti.', 'Chiarezza'),
          m3: H('Hai un\'idea precisa di dove e come vorresti esserci, e il tempo per farlo bene.', 'Direzione'),
          y1: H('Un anno dopo hai scelto il momento giusto con consapevolezza.', 'Saggezza'),
        },
        evidence: ['gilbertEbert', 'immune', 'jenkinson'],
      },
      c: {
        tagline: 'Una volta, per sentire com\'è',
        supports: [
          'Un\'occasione breve e senza impegno (una mattina, una raccolta)',
          'Una persona con cui andare',
          'Un modo di notare come ti senti dopo',
        ],
        horizons: {
          d1: H('Scegli di provare una volta: il passo è piccolo e leggero.', 'Leggerezza'),
          w1: H('Anche un gesto piccolo conta: in un esperimento (Dunn et al., 2008), chi ha speso una piccola somma per qualcun altro era più felice di chi l\'ha spesa per sé.', 'Calore', 'dunn'),
          m3: H('Hai sentito com\'è davvero: puoi tornare, cambiare luogo o fermarti, con un\'idea reale.', 'Chiarezza'),
          y1: H('Un anno dopo hai un\'esperienza vera da cui partire: vale più di cento ipotesi.', 'Realtà'),
        },
        evidence: ['dunn', 'jenkinson', 'gilbertEbert'],
      },
    },
  },

  altro: {
    label: 'Una scelta tutta tua',
    color: '#c3b4ff',
    example: 'Dire di sì a questa proposta o prendermi tempo?',
    keywords: [],
    defaults: { a: 'Fare il passo', b: 'Prendere tempo', c: 'Provare in piccolo' },
    stayWords: ['aspett', 'attend', 'tempo', 'rimand', 'rest', 'no'],
    echoes: ['immune'],
    forks: {
      a: {
        tagline: 'Un sì che apre',
        supports: [
          'Una persona fidata a cui raccontarlo',
          'Un primo piccolo passo concreto da fare entro due giorni',
          'Un modo di festeggiare la partenza',
        ],
        horizons: {
          d1: H('Hai deciso: la mente comincia a mettere in luce i lati buoni della scelta fatta.', 'Sollievo', 'gilbertEbert'),
          w1: H('Nei primi giorni tutto è nuovo e un po\' faticoso: è normale, è la fase in cui ci si orienta.', 'Orientamento'),
          m3: H('A tre mesi la tua mente si è adattata: le emozioni difficili tendono a durare meno di quanto prevediamo.', 'Adattamento', 'immune'),
          y1: H('Un anno dopo la scelta è parte della tua storia, e tu hai imparato a guidarla.', 'Storia'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
      b: {
        tagline: 'Il tempo come alleato',
        supports: [
          'Una data in cui deciderai',
          'Tre cose che vuoi capire prima di decidere',
          'Una persona con cui ragionare ad alta voce',
        ],
        horizons: {
          d1: H('Hai scelto di darti tempo: una scelta con una data è una scelta, non un rinvio.', 'Respiro'),
          w1: H('Raccogli informazioni e sensazioni con calma. Ogni dettaglio notato è una luce in più.', 'Attenzione'),
          m3: H('Hai abbastanza elementi per decidere con tranquillità, e la mente tende ad adattarsi bene a ciò che sceglie.', 'Chiarezza', 'immune'),
          y1: H('Un anno dopo sai riconoscere il momento giusto per scegliere.', 'Saggezza'),
        },
        evidence: ['immune', 'gilbertEbert'],
      },
      c: {
        tagline: 'Una prova piccola e reale',
        supports: [
          'Un\'azione piccola, reversibile nel tempo e nel costo',
          'Una durata della prova decisa in anticipo',
          'Un modo di notare come ti senti',
        ],
        horizons: {
          d1: H('Scegli una prova piccola: la nebbia comincia a diradarsi già dal primo passo.', 'Leggerezza'),
          w1: H('Hai un\'esperienza vera da cui partire: vale più di cento ipotesi.', 'Realtà'),
          m3: H('Hai visto come ti trovi. Qualunque sia la decisione, ora poggia su fatti tuoi.', 'Fiducia'),
          y1: H('Un anno dopo la tua scelta ha le radici nell\'esperienza.', 'Radici'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
    },
  },
};


// Segni da notare: universali, mai "compiti".
export const SIGNS = {
  d1: 'Oggi nota una cosa che ti sembra già un po\' più leggera.',
  w1: 'Questa settimana nota un momento in cui la scelta ti è sembrata giusta.',
  m3: 'Nota una cosa che sai fare ora e che prima non sapevi.',
  y1: 'Nota una cosa che oggi puoi dire senza esitare.',
};

export const CRISIS_PATTERNS = [
  /suicid/i, /uccidermi/i, /ammazzarmi/i, /farla finita/i, /togliermi la vita/i, /non voglio pi[uù] vivere/i,
  /farmi del male/i, /voglio morire/i, /mi voglio fare male/i, /autolesion/i,
];

export const PRO_PATTERNS = [
  /farmac/i, /terapia/i, /diagnosi/i, /operazione/i, /chemio/i, /gravidanz/i, /aborto/i, /avvocato/i, /\bcausa\b/i,
  /divorzi/i, /mutuo/i, /invest/i, /cripto/i, /prestito/i, /debit/i, /tribunale/i, /psichiatr/i,
];

// ── Personalizzazione: vincoli e contesto che l'utente scrive nella domanda ──
// kw: parole che li rivelano; roles: una frase per porta; d1/w1: invito per i capitoli. Mai numeri, mai promesse.
export const PERSONAL = {
  fear: {
    label: 'qualche dubbio',
    kw: /(paura|ansia|timore|dubbi?\w*|preoccup\w*|non so se|insicur\w*|agitat\w*|spavent\w*)/i,
    roles: {
      a: 'I dubbi mostrano che ci tieni. Un passo piccolo e una data di verifica li rendono compagni di viaggio utili.',
      b: 'Avere dubbi e scegliere di aspettare è una scelta lucida, soprattutto con una data per rifare il punto.',
      c: 'Con qualche dubbio, la prova in piccolo è la porta più adatta: ti dà fatti al posto di ipotesi.',
    },
    d1: 'Scrivi il dubbio in una riga: dargli una forma è un primo modo di conoscerlo.',
    w1: 'Rileggi il dubbio di una settimana fa e nota se ha cambiato forma.',
  },
  family: {
    label: 'famiglia',
    kw: /\b(figli\w*|bambin\w*|famiglia|marito|moglie|compagn[oa]|fidanzat[oa]|partner|nipot\w*)\b/i,
    roles: {
      a: 'Con la famiglia nel quadro, il passo funziona bene se lo racconti a chi ami con parole semplici, una data e tre cose che restano uguali.',
      b: 'Restare può essere un regalo per chi vive con te: stabilità e tempo condiviso, scelti insieme.',
      c: 'Provare in piccolo è un modo gentile di coinvolgere la famiglia: si prova insieme, senza che nessuno rinunci a qualcosa.',
    },
    d1: 'Parlane oggi con chi ami: condividere la scelta di solito la rende più leggera.',
    w1: 'Cerca un momento della settimana in cui la scelta si è inserita bene nella vita di casa.',
  },
  money: {
    label: 'budget',
    kw: /(soldi|risparm\w*|stipendio|budget|mutuo|affitto|debit\w*|\bspese\b|\bcosti?\b|economic\w*|prestito|denaro)/i,
    roles: {
      a: 'Con i conti in mente, un buon appiglio è fissare in anticipo una cifra-limite e una data per rifare i calcoli: la tranquillità economica fa parte della porta.',
      b: 'Restare rende i conti più prevedibili: un buon momento per mettere da parte un piccolo margine.',
      c: 'La prova in piccolo ha un vantaggio concreto: costa poco e dà numeri veri su cui decidere.',
    },
    d1: 'Scrivi in una riga la cifra con cui stai tranquillo: è il tuo punto fermo.',
    w1: 'Metti a confronto tre numeri veri: quello che sapevi, quello che hai scoperto, quello che ti serve.',
  },
  time: {
    label: 'poco tempo',
    kw: /(poco tempo|non ho (?:il )?tempo|senza tempo|tempo libero|\borari\b|stanchezz\w*|\bstanc[oa]\b|impegnat\w*)/i,
    roles: {
      a: 'Con poco tempo, parti dal passo più piccolo possibile: dieci minuti a settimana, sempre alla stessa ora.',
      b: 'Il tempo che hai è prezioso: restare ti lascia energia per ciò che conta adesso.',
      c: 'La prova in piccolo si adatta a un calendario pieno: una finestra breve, decisa in anticipo.',
    },
    d1: 'Blocca nel calendario una finestra di dieci minuti per il primo passo.',
    w1: 'Se la settimana è piena, vale anche un passo minuscolo: conta che sia tuo.',
  },
  parents: {
    label: 'genitori',
    kw: /(genitori|mamma|papà|\bpapa\b|\bnonn[io]\b|\bmadre\b|\bpadre\b)/i,
    roles: {
      a: 'Con i genitori nel quadro, raccontare la scelta con calma e fissare una data per risentirvi di solito rassicura tutti.',
      b: 'Restare può significare esserci per chi ti è caro, scegliendo tu quanto e come.',
      c: 'Una prova in piccolo permette di sentire come si incastrano i legami con i genitori, senza decisioni definitive.',
    },
    d1: 'Una telefonata a chi ti è caro, anche breve, dà alla scelta una luce in più.',
    w1: 'Fissa un appuntamento ricorrente con chi ti è caro (una chiamata, una cena): è un punto fermo.',
  },
  dream: {
    label: 'un sogno',
    kw: /(sogno|sogni|passione|da sempre|desider\w*|vorrei da)/i,
    roles: {
      a: 'Se è un sogno, la porta ha già la cosa più importante: la direzione. Il resto si costruisce un passo alla volta.',
      b: 'Un sogno che aspetta resta un sogno acceso, se gli dai una data e un piccolo gesto di cura.',
      c: 'Provare il sogno in piccolo gli dà un corpo: è il modo più gentile di scoprire cosa vuole davvero.',
    },
    d1: 'Scrivi in una riga cosa ti brilla in questa scelta: è il tuo filo.',
    w1: 'Fai oggi una cosa minuscola che appartiene al sogno: una telefonata, una ricerca, uno schizzo.',
  },
};
export const FLAG_ORDER = ['fear', 'family', 'money', 'time', 'parents', 'dream'];

export const PERSON_CATS = ['relazioni', 'amicizia'];
export const PERSON_ROLES = {
  a: 'Con {name}, un momento tranquillo conta più delle parole perfette.',
  b: 'Dare tempo a ciò che c\'è con {name} è anche un modo di ascoltarti.',
  c: 'Un gesto piccolo verso {name} parla da solo, senza bisogno di spiegazioni.',
};
export const PLACE_ROLES = {
  a: 'Se la scelta porta a {name}, conoscere già tre cose concrete del posto (una strada, un luogo, una persona) lo rende subito più familiare.',
  b: 'Restare non chiude {name}: quella porta resta lì e puoi riaprirla quando vuoi.',
  c: 'Una prova in piccolo di {name}, anche solo un weekend, trasforma l\'immaginazione in ricordi veri.',
};
export const TIME_NOTE = 'È il tempo che hai indicato («{label}»): un buon momento per rifare il punto.';
export const FEAR_INTRO = 'Hai accennato a qualche dubbio: è un segno che ci tieni. Qui trovi porte pensate per attraversarlo, un passo alla volta.';
