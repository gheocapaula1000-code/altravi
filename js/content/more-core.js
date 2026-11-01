// A\bvado a letto\b|go to bed|andare a letto|ltre scelte di ogni giorno (IT+EN insieme). Stesso schema di daily-core.js; `prio` rompe i pareggi a favore delle categorie più specifiche.
// Le regex lavorano su testo minuscolo SENZA accenti e senza apostrofi (l'amico → "l amico").
// `generico` non ha indizi: è il ripiego quando nulla combacia (riusa le parole dell'utente).

export const MORE_ORDER = [
  'colazione', 'spuntino', 'ristorante', 'spesa', 'bere',
  'appuntamento', 'amici', 'famiglia', 'partner', 'conflitto', 'rifiuto', 'vicini', 'figli', 'animali', 'festa',
  'risparmio', 'benessere', 'look', 'relax',
  'esame', 'imparare', 'priorita', 'email', 'presentazione', 'chiedere',
  'vacanza', 'viaggio', 'spostarsi', 'sistemare', 'butto',
  'telefono', 'social', 'creativita', 'mattina', 'prestare', 'sincerita', 'daremano',
  'generico',
];

export const MORE = {
  colazione: {
    color: '#fcd34d', prio: 2,
    re: /latte e biscott\w*|yogurt e frutta|\bcereali\b|\bcereal\b|milk and cereal|salata o dolce|dolce o salata|sweet or savou?ry|colazione|cappuccino|cornetto|brioche|merenda|breakfast|brunch|porridge|pancakes?|saltare la colazione|skip breakfast/g,
    not: null,
    ideas: {
      solida: { opt: /uov\w*|proteic\w*|yogurt|porridge|avena|oats|eggs?|solid\w*|sostanz\w*|filling/, re: /lungo|riunione|palestra|allenament\w*|fame|long day|hungry|workout|meeting/, w: 2 },
      leggera: { opt: /legg\w*|frutta|fruit|light|caff\w*|coffee|veloc\w*|quick|salt\w*|skip/, re: /fretta|tardi|poco tempo|no time|\blate\b|hurry|rush|non ho fame|not hungry|nausea/, w: 3 },
      fuori: { opt: /\bbar\b|fuori|cornetto|brioche|cappuccino|out|cafe|bakery|pasticceria/, re: /weekend|domenica|sabato|sunday|saturday|coccol\w*|treat|festeggi\w*/, w: 3 },
    },
  },
  spuntino: {
    color: '#fb7185', prio: 3,
    re: /spuntino|snack|dolce\b|dolcetto|cioccolat\w*|gelato|biscott\w*|patatine|chips\b|dessert|sweet tooth|sugar craving|fame nervosa|voglia di (dolce|qualcosa|mangiare)|craving|merendin\w*|fett[ae] di|\bfette\b|ultim[aeoi] (fett\w*|pezz\w*|biscott\w*)|last (slice|piece|cookie)|leftover pizza|fetta di|\btorta\b|\bcake\b|slice of|barrett\w*|candy bar|patatin\w*|snack before bed|\bspuntin\w*|\bcandy\b|pasticcin\w*/g,
    not: null,
    ideas: {
      pausa: { opt: /aspett\w*|acqua|wait|water|dopo|later|prima|first/, re: /fame nervosa|noia|annoi\w*|stress\w*|bored\w*|craving|voglia|automatic\w*|per abitudine|out of habit/, w: 3 },
      gustalo: { opt: /mangi\w*|gust\w*|\beat\b|enjoy|prend\w*|have it|vai|go for/, re: /meritat\w*|festa|treat|special|premio|reward|domenica|sunday|ho fame davvero|really hungry/, w: 2 },
      scambio: { opt: /frutta|fruit|yogurt|noci|nuts|legg\w*|light|alternativ\w*|swap/, re: /dieta|leggero|light|diet|sano|healthy|abitudin\w*|tutti i giorni|every day/, w: 3 },
    },
  },
  ristorante: {
    color: '#f97316', prio: 3,
    re: /ristorante|trattoria|osteria|pizzeria|locale (dove|per)|dove (mangiare|andiamo a mangiare|cenare|pranzare)|where (to eat|should we eat|shall we eat|to have dinner)|which restaurant|place to eat|dove mangiare|posto (dove|per) mangiare|\bun locale\b|\blocale (tranquillo|per|dove)|\brestaurants?\b|ristorant\w*|prenot\w* (un |il |lo |uno )?(tavolo|ristorante|locale)|book (a )?(table|restaurant)|mangiare fuori|mangiamo fuori|andiamo fuori a|let s eat out|eat(ing)? out|cena fuori|dinner out|brasserie|bistro|cucina (giapponese|indiana|thai|messicana|cinese|italiana)|(japanese|indian|thai|mexican|chinese) (food|restaurant)|sushi o pizza/g,
    not: null,
    ideas: {
      solito: { opt: /solito|conosc\w*|gia (stat\w*|visto)|fidat\w*|usual|favou?rite|regular|know\w*|safe|stesso|same/, re: /stanc\w*|tardi|fretta|tired|late|hurry|bambin\w*|kids|gruppo|group|vecchio|old friend/, w: 2 },
      nuovo: { opt: /nuov\w*|prov\w*|scopr\w*|new|try\w*|discover\w*|diverso|different|etnic\w*/, re: /curios\w*|annoi\w*|bored\w*|routine|sempre lo stesso|same old|occasion\w*|festeggi\w*|celebrat\w*/, w: 3 },
      semplice: { opt: /semplic\w*|vicino|nearby|simple|local|quartiere|neighbou?rhood|tavola calda|casual|veloce|quick/, re: /poco tempo|budget|vicino|nearby|quick|veloce|\bpiove\b|rain\w*|senza prenot\w*|no booking/, w: 2 },
    },
  },
  spesa: {
    color: '#84cc16', prio: 3,
    re: /fare la spesa|la spesa\b|supermercat\w*|lista della spesa|grocer\w*|shopping list|meal prep|plan (the |my )?meals|meals for (next|the) week|pasti della settimana|pianificare i pasti|menu settimanale|weekly meals|comprare da mangiare|cibo per la settimana|groceries|food for the week|pasti in anticipo|prepar\w* i pasti|batch cook\w*|pasti per la settimana|cucinare in anticipo|preparare i pasti|menu (della )?settimana|weekly menu|meal plan\w*|piano pasti|mercato|farmers market|discount (store|supermarket)|cosa compro (al|per la)|what to buy (at|for the)/g,
    not: null,
    ideas: {
      lista: { opt: /lista|list|scritt\w*|written|piano|plan|scrivo|write|prima|first/, re: /impuls\w*|tutto|troppo|buy too much|overspend|spendo troppo|dimentic\w*|forget|mi perdo/, w: 3 },
      pianifica: { opt: /pianific\w*|menu|settimana|week|prepar\w*|meal prep|batch|cucin\w* (tutto|in anticipo)/, re: /settimana|week|stanc\w*|sera|lavoro|work|tired|weeknight|poco tempo|busy/, w: 2 },
      dispensa: { opt: /dispens\w*|frigo|pantry|fridge|usare quello|use what|avanz\w*|leftover/, re: /spreco|avanz\w*|dispens\w*|congelator\w*|freezer|pantry|pieno|full|waste|svuot\w*/, w: 3 },
    },
  },
  bere: {
    color: '#a3e635', prio: 2,
    re: /quanta acqua|how much water|water a day|acqua al giorno|caffe\b|caffeina|\bcoffee\b|caffeine|birra|\bbirre\b|vino\b|\bdrink\b|alcol\w*|\bbeer\b|\bwine\b|spritz|cocktail|amaro|\btea\b|\bte\b|energy drink|bevand\w*|glass of (red|white|wine|water)|rosso o bianco|red or white|\bred wine\b|vino (rosso|bianco)|prosecco|champagne|\bgin\b|whisky|vodka|\bshot\b|alcohol|sobri\w*|\bsober\b|\bcup of tea\b|bere (qualcosa|un|una|meno|di piu)|drink (less|more|something)|analcolic\w*|sober|non[- ]alcoholic|dry (january|month)|mocktail/g,
    not: null,
    ideas: {
      acqua: { opt: /acqua|water|prima|first|aspett\w*|wait|tisana|herbal/, re: /sete|thirst\w*|\bgia\b|already|piu di uno|another|ancora un|un altro|stanc\w*|tired|pomeriggio|afternoon|dopo le|after \w+ pm/, w: 3 },
      uno: { opt: /\buno\b|\bone\b|solo uno|just one|un bicchiere|a glass|prend\w*|have|bere|drink|si\b|yes/, re: /compagnia|amici|friends|festa|party|cena|dinner|occasion\w*|brindisi|toast|celebr\w*/, w: 2 },
      analcolico: { opt: /analcolic\w*|senza alcol|sober|non[- ]alcoholic|mocktail|soda|succo|juice|zero|decaf|deca/, re: /domani|tomorrow|guido|driv\w*|presto|early|sveglia|alarm|lavoro|work|ridurre|cut down|meno|less|sober|dry/, w: 3 },
    },
  },
  appuntamento: {
    color: '#fb7185', prio: 3,
    re: /(gli|le) dico che mi piace|dico che mi piace|i like (him|her)|\bgli piaccio|\ble piaccio|dopo (due|tre|\d) usc\w*|after (two|a few) dates|ask (him|her) out|chiederle di uscire|chiedergli di uscire|appuntament\w*|primo incontro|first date|\bdate\b|dating|invitar\w* (a uscire|fuori|a cena|a bere)|chiedere di uscire|chiedo di uscire|chied\w* di uscire|invito fuori|ask(ing)? (him|her|them|someone) out|ragazza che mi piace|ragazzo che mi piace|(girl|guy|boy) i like|uscire con (lui|lei|una|un|quel|quella)|corteggi\w*|flirt\w*|\bcrush\b|mi piace (un|una|lui|lei|quel|quella)|tinder|bumble|hinge|app di incontri|dating app|\bmatch\b|uscita romantica|romantic (night|evening|dinner|date)|serata romantica|cena romantica|seconda uscita|dopo l uscita|uscita di ieri|swipe\w*|second date|after the date/g,
    not: null,
    ideas: {
      proponi: { opt: /propon\w*|invit\w*|chied\w*|ask|propose|suggest\w*|inviare|send/, re: /mi piace|crush|match|chat|parlat\w*|conosc\w*|talk\w*|texting|we ve been|stiamo scrivendo|just met|appena/, w: 3 },
      semplice: { opt: /semplic\w*|caffe|coffee|passegg\w*|walk|aperitivo|drink|simple|brief|breve|short/, re: /primo|first|nervos\w*|ansios\w*|nervous|anxious|non (ci )?conosc\w*|do not know|app\b|online|tinder|bumble|hinge|incontri/, w: 4 },
      ascolta: { opt: /aspett\w*|wait|attend\w*|lasci\w*|lascio|aspetto|give (space|time)|slow\w*|piano|dopo|later|prima|first/, re: /seconda|second|dopo la|after|risposta|reply|silenzio|silence|non (mi )?(ha )?rispost\w*|has not (replied|answered)|ghost\w*|incerto|unsure|confus\w*/, w: 2 },
    },
  },
  amici: {
    color: '#38bdf8', prio: 1,
    re: /migliore amic\w*|best friend|vecchi amici|old friends|mi evita|avoids me|\bamic[oahie]\b|amici|amiche|amicizia|\bfriends?\b|friendship|disdire (la|il|l|una|un) (serata|cena|piano|uscita|appuntamento)|disdico (la|il|l|una|un) (serata|cena|piano|uscita|appuntamento)|annullare (il|la|l|i) (piano|piani|serata|cena|uscita)|cancel\w* (the )?(plans?|dinner|meetup|evening)|piano con (un|una|gli) amic\w*|uscita con|catch up with|vedersi con|rivedere (un|una)|ci vediamo|(un|una) (mio|mia) amic\w*|my friend|reunion|rimpatriata|serata tra amici|rimando (l|la|il|una|un) (aperitivo|cena|serata|uscita|caffe|appuntamento)|rimandare (l|la|il) (aperitivo|cena|serata|uscita)|reschedule|postpone (the|our|a)|group chat|chat di gruppo|gruppo whatsapp|vederci|meet up|meetup/g,
    not: /vecchio amic|vecchia amic|old friend|riconcili|ritrovare|ho litigato|abbiamo litigato|we fought|argument|\bfight\b|quarrel|litig|discussion|discussione|traslocare|moving/,
    ideas: {
      proponi: { opt: /propon\w*|organizz\w*|invit\w*|chied\w*|inizi\w*|first move|ask|suggest\w*|plan|ceniamo|vediamoci/, re: /da tempo|mancano|manca|non (ci )?(vediamo|sentiamo)|haven t seen|haven t talked|miss\b|long time|distant\w*|lontan\w*/, w: 3 },
      disdici: { opt: /disdic\w*|annull\w*|cancel\w*|rimand\w*|reschedul\w*|postpone|non (vado|ci vado|esco)|skip/, re: /stanc\w*|esaust\w*|non ho (voglia|energie)|tired|exhaust\w*|burnt|drained|no energy|impegn\w*|troppo|overbooked/, w: 3 },
      vai: { opt: /vado|andare|vai|go\b|andiamo|join|ci vado|partecip\w*|esco|show up/, re: /invitat\w*|invited|compleanno|birthday|festa|party|aspett\w*|expecting|contano|counting on|promess\w*|promised/, w: 2 },
    },
  },
  famiglia: {
    color: '#fda4af', prio: 1,
    re: /\bmamma\b|\bpapa\b|\bnonn[oae]\b|genitori|famiglia|sorell\w*|fratell\w*|cognat\w*|parenti|suocer\w*|\bzi[oa]\b|cugin\w*|\bi miei\b|\bmadre\b|\bpadre\b|mia mamma|trovare i miei|dai miei|con i miei|dai nonni|natale con|pasqua con|christmas with|\bmum\b|\bmummy\b|\bmama\b|home for (easter|christmas|the holidays)|tornare a casa (dai|per)|\bmother\b|\bfather\b|\bmom\b|\bdad\b|parents?|\bfamily\b|\bsister\b|\bbrother\b|grandm\w*|grandp\w*|in-laws?|aunt|uncle|cousin|pranzo (dai|da|con i) \w+|sunday lunch|family (lunch|dinner|gathering)|natale con|domenica dai/g,
    not: /traslo\w*|vivere con|convivenz\w*|move in with|moving in/,
    ideas: {
      vai: { opt: /vado|andare|vai|visit\w*|trovare|go\b|pass\w*|ci vado|stop by|see/, re: /da tempo|manc\w*|haven t seen|\bmiss\b|long time|anzian\w*|elderly|soli\w*|alone|lonely|compleanno|birthday|domenica|sunday/, w: 3 },
      chiama: { opt: /chiam\w*|call|telefon\w*|sentir\w*|phone|videochiam\w*|video call|messagg\w*/, re: /lontan\w*|distanza|far away|abroad|estero|non posso|cannot|can t make|lavoro|work|tempo|busy|occupat\w*/, w: 3 },
      breve: { opt: /poco|breve|short|brief|un ora|an hour|mezz\w*|half|passo|stop|rest\w* poco/, re: /tensione|litig\w*|discuss\w*|tension|argument|difficil\w*|difficult|stanc\w*|stress\w*|tired|limit\w*|boundar\w*|confin\w*/, w: 3 },
    },
  },
  partner: {
    color: '#f472b6', prio: 2,
    re: /fidanzat\w*|\bmarito\b|\bmoglie\b|compagn[oa]\b|\bpartner\b|boyfriend|girlfriend|husband|\bwife\b|\bcoppia\b|\bcouple\b|il mio ragazzo|mio ragazzo|la mia ragazza|mio fidanzat\w*|mia fidanzat\w*|mio marito|mia moglie|my (bf|gf)|my other half|serata (in )?coppia|date night|ti amo|i love you/g,
    not: null,
    ideas: {
      parla: { opt: /parl\w*|dir\w*|talk\w*|tell|discut\w*|chiar\w*|clarify|open up|confid\w*/, re: /ho bisogno|dobbiamo|serio|important\w*|need to|serious|bothers|disturba|pesa|mi pesa|weighs|since|da giorni|for days/, w: 3 },
      gesto: { opt: /sorpres\w*|gest\w*|surpris\w*|regal\w*|gift|fior\w*|flowers?|cen\w*|dinner|biglietto|note|cucin\w*|cook\w*|preparo|prepare/, re: /anniversar\w*|compleanno|birthday|festeggi\w*|celebr\w*|manc\w*|miss\b|speciale|special|valentin\w*/, w: 3 },
      spazio: { opt: /spazio|space|tempo|time|lasci\w*|respir\w*|breath\w*|aspett\w*|wait|da solo|alone|break|pausa/, re: /litig\w*|discuss\w*|nervos\w*|teso|tens\w*|argu\w*|fight|fought|arrabbi\w*|angry|upset|stress\w*|stanc\w*|tired|sera tardi|late/, w: 4 },
    },
  },
  conflitto: {
    color: '#ef4444', prio: 2,
    re: /offes[ao]\b|offend\w*|davanti a tutti|\binsult\w*|chiedo scusa|\btorto\b|apologi[sz]\w*|in the wrong|litig\w*|discussione|discuter\w*|conflitt\w*|argument\b|arguing|\bfight\b|fought|quarrel\w*|confront\w*|chiarimento|chiaris\w*|chiarir\w*|faccio pace|fare pace|riconcili\w*|make up|ci sono rimast[oa] male|mi ha fatto male|\burlat\w*|gridat\w*|shout\w*|yell\w*|chi fa il primo passo|first step|apologi[sz]e first|scusarmi per primo|took credit|si e preso il merito|mi ha (mentito|tradit\w*|ignorat\w*)|betray\w*|lied to me|alle spalle|behind my back|lascio correre|dico la mia|let it slide|let it go|say my piece|speak my mind|mi ha ferit\w*|hurt me|hurt my|mi ha offes[oa]|mi sono offes[oa]|hurt my feelings|upset with|arrabbiat[oa] con|angry (with|at)|\bresent\w*|tension\w*|tensione|incomprension\w*|misunderstand\w*|malintes\w*|fare pace|make up with|make peace|passare sopra|let it go|lasciar correre|tenere il muso|silent treatment/g,
    not: null,
    ideas: {
      raffredda: { opt: /aspett\w*|wait|dopo|later|domani|tomorrow|calm\w*|cool\w*|respir\w*|breath\w*|non (dico|rispondo|scrivo)|sleep on/, re: /arrabbiat\w*|furios\w*|rabbia|nervos\w*|angry|furious|mad\b|heat\w*|caldo|sul momento|in the moment|stanotte|notte|night|ubriac\w*|drunk/, w: 4 },
      parla: { opt: /parl\w*|chiar\w*|talk\w*|clarify|confront\w*|dir\w*|affront\w*|tell|face/, re: /da giorni|mi pesa|ripete|continua|keeps|again|for days|pesa|bothers|weighs|ogni volta|every time|chiarire|chiarimento/, w: 3 },
      lascia: { opt: /lasci\w*|passar\w*|let\w* (it )?(go|pass)|drop|ignor\w*|dimentic\w*|forget|va bene|fine/, re: /piccol\w*|sciocc\w*|banal\w*|small|minor|silly|petty|trivial|una volta|once|stupid\w*|futil\w*/, w: 3 },
    },
  },
  rifiuto: {
    color: '#c084fc', prio: 2,
    re: /dire di no|dico di no|\bdico no\b|\brifiut\w*|\bdecline\b|politely decline|gentilmente un invito|non ne ho voglia|non ho voglia di (andare|partecipare)|pressione per partecipare|pressure to (go|attend)|saying no|say yes to|coprire un turno|cover (a|the|his|her) shift|devo davvero andare|do i (really )?have to go|dirgli di no|dirle di no|di no a|rifiutar\w*|rifiuto (l|un|il|la)|declin\w*|say(ing)? no|turn(ing)? down|non voglio andare|mi sento in obbligo|sono obbligat\w*|obbligo di|troppi impegni|overcommit\w*|too many commitments|guilt trip|senso di colpa verso|limiti|boundaries|boundary|non me la sento|do not feel like (going|it)|accetto l invito|accept the invite|accettare l invito|disdire un impegno|back out|tirarmi indietro|opt out/g,
    not: null,
    ideas: {
      gentile: { opt: /dir\w* (di )?no|no\b|rifiut\w*|declin\w*|turn down|say no|non (vado|accetto|posso)|decline|passo/, re: /obblig\w*|colpa|guilt\w*|oblig\w*|non me la sento|do not feel|troppo|too much|stanc\w*|tired|energie|energy/, w: 3 },
      tempo: { opt: /pens\w*|tempo|aspett\w*|vedo|ti faccio sapere|let you know|think\w*|get back|sleep on|rispondo dopo|later/, re: /indecis\w*|incerto|unsure|undecided|non so|do not know|forse|maybe|dubb\w*|doubt\w*|combatt\w*|torn/, w: 3 },
      alternativa: { opt: /altro|alternativ\w*|invece|instead|propon\w*|offer|offr\w*|un altra volta|another time|another way|diversamente/, re: /amic\w*|friend|collega|colleague|famiglia|family|ci tengo|care about|vorrei ma|i would like to but|vorrei esserci|want to be there/, w: 3 },
    },
  },
  vicini: {
    color: '#94a3b8', prio: 2,
    re: /vicin[oi]\b|vicina|condomin\w*|\bneighbou?rs?\b|neighbou?rhood noise|rumor\w*|\bnoise\b|noisy|coinquilin\w*|inquilin\w*|\btenants?\b|piano di sopra|piano di sotto|upstairs|downstairs|dirimpettai|roommate\w*|flatmate\w*|housemate\w*|portinaio|pianerottolo|landlord|padrone di casa|amministratore|\bmusica alta\b|loud music|parcheggio del condominio|shared (kitchen|space|flat)|cucina condivisa|casa condivisa|assemblea di condominio/g,
    not: /anzian\w*|elderly/,
    ideas: {
      saluta: { opt: /salut\w*|present\w*|introduc\w*|conosc\w*|greet|hello|say hi|gentil\w*|kind|friendly|biscott\w*/, re: /nuov\w*|appena|just moved|new|trasloc\w*|moved|mai parlat\w*|never spoken|scosta\w*|awkward|imbarazz\w*/, w: 3 },
      parla: { opt: /parl\w*|dir\w*|bus\w*|talk\w*|knock|speak|chiedere|ask|citofon\w*|suon\w*/, re: /rumor\w*|noise|noisy|musica|music|spazzatura|trash|parcheggi\w*|parking|cucina|kitchen|pulizi\w*|cleaning|da giorni|for days|ripete|keeps/, w: 3 },
      biglietto: { opt: /biglietto|nota|messagg\w*|note|letter|scritt\w*|write|written|lettera|bacheca|chat/, re: /imbarazz\w*|difficile|awkward|hard to|tensione|tension|litig\w*|non voglio|do not want to|evit\w*|avoid/, w: 3 },
    },
  },
  figli: {
    color: '#fbbf24', prio: 2,
    re: /year.old|toddler|\basilo\b|materna|preschool|\bnursery\b|\bfigli[oae]?\b|\bbambin\w*|\bbimb\w*|capricci|tantrum\w*|\bdaughter\b|\bmy son\b|\bsons?\b|\bkids?\b|\bchild\w*|toddler|\bteen\w*|adolescent\w*|mio figlio|mia figlia|asilo|nursery|\bscuola dei\b|school run|nanna|bedtime|dopo scuola|after school|baby\b|neonat\w*|newborn|ragazzin\w*|preteen|compiti di (mio|mia)|aiutare (mio|mia) (figli|bimb)|parent\w* (of|with)|genitorial\w*|parenting/g,
    not: null,
    ideas: {
      chiaro: { opt: /regol\w*|limit\w*|dire di no|stop|rules?|firm\w*|chiar\w*|clear|boundar\w*|confin\w*|no\b/, re: /capricc\w*|tantrum|non (mi )?ascolt\w*|does not listen|schermo|screen|tablet|tv|dolci|sweets|letto|bed|ordine|tidy|compiti|homework/, w: 3 },
      ascolta: { opt: /ascolt\w*|chied\w*|parl\w*|listen|ask|talk\w*|capire|understand|abbraccia\w*|hug|calm\w*/, re: /triste|piang\w*|sad\w*|cry\w*|arrabbiat\w*|angry|upset|silenzios\w*|quiet|chiuso|closed off|scuola|school|amici|friends|bull\w*/, w: 4 },
      scelta: { opt: /scelt\w*|lasci\w*|decid\w*|choice|choose|let (him|her|them)|autonom\w*|indipend\w*|solo|alone|own/, re: /capricc\w*|rifiut\w*|refus\w*|no a tutto|power struggle|autonom\w*|indipend\w*|da solo|on (his|her|their) own|compiti|homework|vestir\w*|dress\w*/, w: 3 },
    },
  },
  animali: {
    color: '#f59e0b', prio: 3,
    re: /\bcane\b|\bcani\b|\bgatt[oiae]\b|\bdog\b|\bdogs\b|\bcats?\b|\bpuppy\b|kitten|cucciol\w*|animal\w*|\bpets?\b|criceto|coniglio|\brabbit\b|hamster|tartarug\w*|pesciolino|acquario|veterinar\w*|\bvet\b|passeggiata (col|con il) cane|walk the dog|portare fuori il cane|adott\w* (un|una) (cane|gatt\w*|cucciol\w*)|adopt\w* (a )?(dog|cat|puppy|kitten|pet)|canile|gattile|shelter|rescue/g,
    not: null,
    ideas: {
      passeggiata: { opt: /passegg\w*|fuori|walk|out|esco|porto|take|corsa|run|parco|park|giro|round|adesso|now/, re: /piove|rain\w*|freddo|cold|stanc\w*|tired|energia|energy|abbai\w*|bark\w*|irrequiet\w*|restless|annoi\w*|bored/, w: 2 },
      prova: { opt: /adott\w*|prend\w*|adopt\w*|get\b|nuovo|new|cucciol\w*|puppy|kitten|gatt\w*|cane|dog|stallo|foster/, re: /adott\w*|adopt\w*|canile|gattile|shelter|rescue|vorrei un|want a|prendere un|getting a|spazio|space|tempo|time|viaggi|travel|lavoro|work|famiglia|family/, w: 4 },
      routine: { opt: /routine|orari\w*|schedule|regol\w*|rules?|abitudin\w*|habit|stesso|same/, re: /sofa|divano|letto|bed|cibo|food|mangia\w*|eating|educazione|training|addestra\w*|morde\w*|bites|tira|pulls|guinzaglio|leash|sporco|mess/, w: 3 },
    },
  },
  festa: {
    color: '#f0abfc', prio: 3,
    re: /party at home|birthday party|snacks for a|for a party|per una festa|party food|organizz\w* (la |una |un |il |l |due |tre )?(festa|cena|serata|evento|compleanno|apericena|pranzo|brunch|barbecue|grigliata)|fare una festa|dare una festa|festeggiar\w*|host\w* (a |the )?(party|dinner|brunch|barbecue|gathering)|throw\w* (a )?party|plan\w* (a |the )?(party|dinner|event|birthday|gathering)|birthday party|party planning|apericena|invit\w* (gli )?(ospiti|amici)|\bospiti\b|\bguests\b|alla mia festa|mia festa|my party|faccio una cena (a casa )?con|cena a casa con|dinner party|invito (gli )?amici a cena|have (friends|people) over|friends over|per la festa|for the party|\bdj\b|catering|menu per il compleanno|per il compleanno di|compleanno di mi|birthday (menu|cake|party)|guest list|lista degli invitati|baby shower|festa a sorpresa|surprise party|inaugurazione|housewarming|festa di laurea|graduation party|menu per (la festa|gli ospiti)|menu for (the )?(party|guests)|cosa (preparo|servo) (per|agli) ospiti|what (to serve|should i serve|do i make) (for )?(the )?(guests|party)/g,
    not: null,
    ideas: {
      semplice: { opt: /semplic\w*|piccol\w*|simple|small|intim\w*|cozy|informal\w*|casual|tranquill\w*|low.?key/, re: /poco (tempo|budget)|budget|stanc\w*|stress\w*|tired|no time|casa piccola|small (flat|apartment|place)|tight/, w: 3 },
      pochi: { opt: /pochi|poche|few|small group|close|stretti|intim\w*|solo (gli|i|le)|just (the|my)|tanti|many|everyone|tutti|big/, re: /tanti|troppi|many|too many|dubb\w*|lista|list|chi invito|who to invite|invit\w*|ospiti|guests/, w: 3 },
      delega: { opt: /porta\w*|bring|ciascuno|everyone brings|portano|pot ?luck|dividere|share|split|delega\w*|delegate|ognuno/, re: /tanto da fare|troppo da|so much to|too much to|aiuto|help|da sol[oa]|alone|organizz\w*|organi[sz]ing|cucin\w*|cook\w*/, w: 3 },
    },
  },
  risparmio: {
    color: '#22c55e', prio: 2,
    re: /risparm\w*|\bsoldi\b|\bbudget\b|stipendio|\bspese\b|bolletta\w*|save money|saving|savings|\bmoney\b|expenses|\bafford\b|salary|paycheck|fine mese|end of (the )?month|conto (in banca|corrente)|bank account|abbonament\w* (a|di)\b|subscription|mettere da parte|metto da parte|put aside|overspend\w*|spendo troppo|every month|ogni mese|\bil conto\b|the bill|pago io|offro io|my treat|set aside|disdico (netflix|spotify|prime|disney|abbonament\w*)|cancel (netflix|spotify|prime|disney|my subscription)|bring (it |my )?(lunch )?from home|pranzo da casa|packed lunch|spendo troppo (in|per|di)|spend too much (money|on)|tirare la cinghia|tighten my belt|mancia|tip\b|conto del ristorante|split the bill|dividere il conto|prestito a|carta di credito|credit card|\bdebt\b|\bdebito\b/g,
    not: null,
    ideas: {
      daparte: { opt: /part\w*|risparm\w*|save|put aside|metto|set aside|messo/, re: /stipendio|salary|paycheck|appena|arrivat\w*|just got|received|bonus|fine mese|end of month/, w: 3 },
      semplice: { opt: /budget|semplic\w*|limit\w*|simple|cap|tetto|settimanale|weekly/, re: /confus\w*|non so dove|dove vanno|where (does|did) .* go|tracc\w*|track\w*|spese|expenses|troppo|too much|fine mese/, w: 3 },
      taglia: { opt: /taglia\w*|ridurre|cut\w*|reduce|rinunc\w*|give up|disdic\w*|cancel\w*|abbonament\w*|subscription|meno|less/, re: /abbonament\w*|subscription|streaming|ordin\w*|delivery|caffe|coffee|aperitiv\w*|piccole spese|small purchases|ogni giorno|every day/, w: 3 },
    },
  },
  benessere: {
    color: '#2dd4bf', prio: 2,
    re: /\bcollo\b|\bneck\b|stretching|move more|muoverm\w*|vitamin\w*|integrator\w*|supplement\w*|bere (di piu )?acqua|bevo (di )?piu acqua|piu acqua|more water|drink (more )?water|hydrat\w*|camminat\w*|\bcammin\w*|digerir\w*|digest\w*|walk after|tired every|ogni pomeriggio|every afternoon|passeggiat\w* (di|dopo|ogni|quotidian)|\bsteps\b|\bpassi\b al giorno|postura|posture|scrivania tutto il giorno|desk all day|male alla schiena|back hurts|back hurt|sore back|backache|stiff neck|neck pain|sitting (all day|too much)|too much sitting|from sitting|dolor\w* (alla )?(schiena|collo)|mi fa male la schiena|schiena|ritrovo energia|energia nel pomeriggio|boost (my )?energy|\benergia\b|\benergy\b|respirazion\w*|breathing|mal di schiena|back pain|rigid\w*|stiff\w*|zucchero|\bsugar\b|digiuno|fasting|salto (il |la |lo )?(pranzo|pasto|cena)|skip (lunch|a meal|dinner)|energia (bassa|calo)|low energy|crollo (pomeridiano|di energia)|afternoon slump|sedentar\w*|sitting all day|sole|sunlight|aria aperta|fresh air|pausa dal pc|break from the screen|tisana|herbal tea|sana\b|healthy (habit|choice|snack)|mangiare sano|eat(ing)? healthy/g,
    not: /smettere di fumare|dieta (rigida|drastica)|diagnosi|diagnosis|medic\w*|farmac\w*|medication|prescription|terapia|therapy/,
    ideas: {
      piccola: { opt: /piccol\w*|poco|small|little|una cosa|one thing|iniziar\w*|start|inizio|comincio/, re: /abitudin\w*|habit|inizia\w*|start\w*|cominci\w*|nuov\w*|new|routine|motivaz\w*|motivat\w*/, w: 3 },
      movimento: { opt: /camm\w*|passegg\w*|walk|mov\w*|stretch\w*|aria|air|fuori|outside|scale|stairs/, re: /seduto|scrivania|desk|sitting|sedentar\w*|schiena|back|rigid\w*|stiff|postura|posture|pomeriggio|afternoon|pc|screen|schermo/, w: 3 },
      ascolta: { opt: /ascolt\w*|riposo|rest|listen|pausa|break|dorm\w*|sleep|acqua|water/, re: /stanc\w*|energia|energy|tired|crollo|slump|digiuno|fasting|salto|skip|sete|thirst|fame|hungry/, w: 3 },
    },
  },
  look: {
    color: '#e879f9', prio: 2,
    re: /capell\w*|taglio\b|parrucchier\w*|\bbarba\b|barber|haircut|\bhair\b|\bbeard\b|trucco|make.?up|\btinta\b|colorare i capelli|dye my hair|unghie|\bnails\b|tatuagg\w*|tattoo|piercing|look nuovo|new look|cambio di stile|change (of )?style|nuovo stile|new style|makeover|cambiare look|cambio look|change (my )?look|frangia|\bbangs\b|\bfringe\b|rasarmi|shave|\bshaving\b|taglio corto|short hair|capelli lunghi|long hair|skincare|crema viso|face cream|profumo|perfume|\bcologne\b/g,
    not: null,
    ideas: {
      poco: { opt: /poco|piccol\w*|small|subtle|leggero|slight|ritocc\w*|trim|spunt\w*|dettaglio|detail/, re: /indecis\w*|incerto|unsure|undecided|dubb\w*|doubt|prima volta|first time|radicale|drastic|big change|grande cambiamento|cresc\w*|grow/, w: 3 },
      foto: { opt: /foto|photo|esempi\w*|examples?|riferiment\w*|reference|ispir\w*|inspir\w*|vedere|see/, re: /non so (come|cosa)|do not know (how|what)|idea|ispir\w*|inspir\w*|stile|style|moda|trend|nuov\w*|new/, w: 3 },
      parlane: { opt: /parl\w*|chied\w*|consult\w*|talk|ask|professionist\w*|pro\b|esperto|expert|hairdresser|parrucchier\w*|barber/, re: /parrucchier\w*|hairdresser|barber|salone|salon|appuntamento|appointment|prenot\w*|book/, w: 3 },
    },
  },
  relax: {
    color: '#67e8f9', prio: 2,
    re: /rilass\w*|\brelax\w*|\bspa\b|meditar\w*|meditat\w*|staccare|switch off|unwind|decompress\w*|ricaricar\w*|recharge|stressat\w*|sovraccaric\w*|for myself|per me stess[oa]|serata per me|staccare la spina|\bterme\b|day spa|spa day|\bstressed\b|giorno per me|day (for|to) (myself|me)|me time|tempo per me|self.?care|cura di se|bagno caldo|hot bath|bagno (con|rilassante)|bath salts|candele|candles|\btisana\b|sali da bagno|take a bath|have a bath|bubble bath|massaggi\w*|massage|pausa dal mondo|mindfulness|journal\w*|diario|tisana e libro|serata (tranquilla|relax)|quiet evening|do nothing|non fare niente|ozio|\bidle\b|burn.?out|esaurimento|sovraccarico|overload\w*|overwhelm\w*|sopraffatt\w*|ho bisogno di una pausa|need a break/g,
    not: null,
    ideas: {
      bagno: { opt: /bagno|doccia|bath|shower|musica|music|candel\w*|candle|spa\b|massag\w*|cura|care/, re: /sera|evening|night|dopo|after|freddo|cold|schiena|back|tension\w*|spall\w*|shoulders/, w: 2 },
      niente: { opt: /niente|nulla|nothing|ozio|idle|divano|couch|sdraiat\w*|lie|lying|sofa|stare/, re: /esaust\w*|sovraccaric\w*|sopraffatt\w*|overwhelm\w*|exhaust\w*|burn\w*|troppo|too much|testa|mind|pensier\w*|thoughts/, w: 3 },
      aria: { opt: /aria|fuori|passegg\w*|outside|air|walk|natura|nature|parco|park|mare|sea|sole|sun/, re: /chius\w*|casa tutto il giorno|indoors|all day inside|schermo|screen|pc|ufficio|office|sole|sun|natur\w*/, w: 3 },
    },
  },
  esame: {
    color: '#60a5fa', prio: 2,
    re: /all.nighter|before the (test|exam)|nottata|notte in bianco|\besam\w*|interrogazion\w*|verifica\b|test (di|scritto|orale)|\bexams?\b|\bquiz\b|\btesi\b|thesis|driving test|test di guida|esame di guida|\bpatente\b|for (the|my) test|ripasso|ripassare|revis\w*|study for|prepararmi (per|a|all)|prepare for (the )?(exam|test)|\boral\b|orale|prova scritta|written test|midterm|finals?\b|appello|punteggio|voto|\bgrade\b|\bgrades\b|sessione (di esami|estiva|invernale)|exam (session|period)|flashcard\w*|appunti|lecture notes|notes for/g,
    not: null,
    ideas: {
      quiz: { opt: /quiz|domand\w*|test|question\w*|prove|prova|flashcard\w*|autointerrog\w*|self.?test|ripet\w* ad alta voce|out loud/, re: /ripasso|ripassare|revis\w*|riletto|riletti|reread|ore a leggere|hours reading|rileggere|leggo|read\w*|sottoline\w*|highlight\w*/, w: 3 },
      blocchi: { opt: /blocch\w*|session\w*|pomodor\w*|block|chunks?|pause|paus\w*|piano|plan|calendar\w*|programm\w*|schedule/, re: /tanto|troppo|molto da|so much|too much|non so da dove|where to start|settimana|week|giorni|days|vicin\w*|close|programma|syllabus|capitol\w*|chapters/, w: 3 },
      riposa: { opt: /riposa\w*|dorm\w*|sleep|rest|stop|basta|chiud\w*|stasera|tonight/, re: /domani|tomorrow|stanotte|notte|night|tardi|late|vigilia|eve of|stanc\w*|tired|stress\w*|mattina presto|early/, w: 4 },
    },
  },
  imparare: {
    color: '#34d399', prio: 1,
    re: /imparar\w*|\blearn\w*|\blezion\w*|\blessons?\b|corso (di|online|serale)|online course|tutorial|\blingua\b|language|chitarra|pianoforte|violino|\bguitar\b|violin|duolingo|spagnolo|francese|tedesco|inglese|giapponese|portoghese|spanish|french|german|japanese|english|strumento musicale|musical instrument|corso di (cucina|ceramica|pittura|danza|fotografia|yoga|nuoto)|(cooking|pottery|painting|dance|photography|swimming) (class|course|lessons?)|programmar\w*|coding|learn to code|learn to cook|imparare a cucinare|nuova competenza|new skill|certificazione|certificate|studiare da sol[oa]|self.?taught|autodidatta/g,
    not: /universit|laurea|dottorato|master\b|degree|\bphd\b|iscrivermi all universita/,
    ideas: {
      poco: { opt: /ogni giorno|daily|poco|little|ogni sera|every (day|evening)|piccol\w*|small|abitudin\w*|habit|app\b|duolingo|tutorial/, re: /iniziar\w*|start\w*|cominci\w*|begin|tempo|time|lavoro|work|poche ore|little time|rimand\w*|putting off|zero/, w: 3 },
      lezione: { opt: /lezion\w*|corso|insegnant\w*|maestr\w*|class|course|teacher|tutor|scuola|school|gruppo|group|insieme|together/, re: /da sol[oa]|alone|bloccat\w*|stuck|non so (come|da dove)|do not know (how|where)|aiuto|help|feedback|errori|mistakes|progress\w*/, w: 3 },
      progetto: { opt: /progett\w*|project|costruir\w*|build\w*|fare qualcosa|make something|pratica|practice|provare|try|esperiment\w*/, re: /annoi\w*|bored|teoria|theory|troppo (studio|teoria)|too much theory|motivaz\w*|motivat\w*|concret\w*|practical/, w: 3 },
    },
  },
  priorita: {
    color: '#38bdf8', prio: 0,
    re: /priorit\w*|\bto-?do (list|app)\b|\btodo\b|scadenze|deadlines|affront\w* prima|per primo|per prima|cosa fare per prim\w*|what to do first|lista (delle )?(cose|attivita)|\btasks?\b|ho troppe cose|troppe cose da fare|too many things|too much to do|da dove inizio|where (do i|should i|to) start|prima cosa|first thing|cosa faccio prima|what (do i|should i) do first|agenda|piano della giornata|plan (my|the) day|giornata (piena|pesante)|busy day|backlog|arretrat\w*|organizz\w* (la |il )?(mia |my )?(giornata|settimana|lavoro)|organi[sz]e my (day|week|work)|lista di cose|cose da fare|progetto e in ritardo|project is (late|behind)|carico di lavoro|workload|mi sento sommers\w*|snowed under|sommerso|ordine di importanza|order of importance|urgente|urgent|importante (o|ma)|important (or|but)|progetto in ritardo|behind (on|schedule)/g,
    not: null,
    ideas: {
      difficile: { opt: /difficil\w*|pesant\w*|hard\w*|toughest|biggest|grande|important\w*|rana|frog|prima|first/, re: /mattina|morning|energia|energy|fresc\w*|fresh|rimand\w*|putting off|evit\w*|avoid|ansia|dread/, w: 3 },
      piccola: { opt: /piccol\w*|facile|veloc\w*|quick|easy|small|rapid\w*|due minuti|two minutes|subito|right away/, re: /bloccat\w*|stuck|sommers\w*|overwhelm\w*|troppe|too many|non riesco|cannot|stanc\w*|tired|pomeriggio|afternoon|sera|evening|slancio|momentum/, w: 3 },
      tre: { opt: /tre\b|three|lista|list|scegl\w*|choose|pick|selezion\w*|ordin\w*|order/, re: /tutto|everything|troppe|too many|lunga lista|long list|caos|chaos|confus\w*|non so|do not know|importante|urgente|urgent|important/, w: 2 },
    },
  },
  email: {
    color: '#a5b4fc', prio: 3,
    re: /\be.?mails?\b|\bposta\b|scrivo (al|alla|a) (professor\w*|prof|dirigente|direttore|capo|cliente)|scrivere (al|alla) professor\w*|proroga|write to (my )?(professor|boss|client)|\bmail\b|mail (formale|di lavoro|al|a)|scrivere (una |la )?mail|rispondere (alla|a una|a quella) mail|reply to (the |an |that )?email|subject line|oggetto (della|di una) mail|\bcc\b|\bbcc\b|inviare (il|un|la) (cv|documento|report|file)|(mando|invio|spedisco|inoltro) (il|un|la|lo|i) (cv|documento|report|file|curriculum)|send (the |a |my )?(cv|resume|report|file|document)|(il|un|la) (cv|curriculum)\b|lettera di presentazione|cover letter|allegat\w*|attachment|linkedin messaggio|messaggio su linkedin|linkedin message|ho ricevuto una mail|received an email|mail al (capo|professore|cliente|collega)|email (to|from) (my )?(boss|professor|client|colleague|landlord)/g,
    not: null,
    ideas: {
      breve: { opt: /breve|short|brief|scriv\w*|write|manda\w*|send|invia\w*|subito|now|ora|adesso|rispond\w*|reply|answer/, re: /ritardo|late|aspett\w*|waiting|sollecit\w*|follow.?up|promemoria|reminder|semplice|simple|rispost\w*/, w: 3 },
      rileggi: { opt: /rileg\w*|domani|tomorrow|dopo|later|aspett\w*|wait|bozza|draft|sleep on|sera|tonight/, re: /arrabbiat\w*|nervos\w*|angry|upset|irritat\w*|tono|tone|lunga|long|difficil\w*|difficult|delicat\w*|sensitive|reclam\w*|complaint|stanotte|tardi|late/, w: 4 },
      chiama: { opt: /chiam\w*|call|parl\w*|talk|di persona|in person|passa\w*|stop by|videochiam\w*/, re: /malinteso|misunderstand\w*|tropp\w* (mail|email)|too many (emails|messages)|avanti e indietro|back and forth|complicat\w*|complicated|tono|tone|delicat\w*|sensitive/, w: 3 },
    },
  },
  presentazione: {
    color: '#fb923c', prio: 2,
    re: /presentazion\w*|presentation\w*|present\w* (il |la )?(mio |mia )?(progetto|idea|lavoro)|parl\w* davanti|tremano le mani|mi tremano|davanti agli altri|in front of others|riunione|\bmeeting\b|parlare in pubblico|public speaking|discorso|\bspeech\b|brindisi|\btoast\b|\bpitch\b|\bslide\b|\bslides\b|diapositiv\w*|interrogazione orale|colloquio di gruppo|prepar\w* (al|per il|il) colloquio|prepare for (the |an )?interview|job interview|presentare il progetto|present(ing)? (the |my )?(project|idea|work)|mi tremano le gambe|stage fright|ansia da palco|parlare davanti|speak(ing)? in front|intervento|relazione orale|keynote|webinar|dirigo la riunione|lead the meeting|run the meeting|talk (at|to) (a )?(conference|class|team)|domande (dal|del) pubblico|q&a/g,
    not: null,
    ideas: {
      voce: { opt: /prov\w*|ripet\w*|ad alta voce|rehears\w*|practice|out loud|allen\w*|specchio|mirror|registr\w*|record/, re: /domani|tomorrow|stasera|tonight|oggi|today|presto|soon|prima volta|first time|nuov\w*|new|non (sono )?pront\w*|not ready/, w: 3 },
      punti: { opt: /punti|appunti|schema|outline|notes|bullet|tre|three|essenzial\w*|essential|semplic\w*|simple|slide|diapositive|script|testo|memoriz\w*/, re: /troppo|too much|lungo|long|confus\w*|dimentic\w*|forget\w*|perdo il filo|lose my thread|complicat\w*|slide|diapositiv\w*|testo|script/, w: 3 },
      respira: { opt: /respir\w*|breath\w*|arriv\w*|early|presto|calm\w*|tranquill\w*|pausa|pause|acqua|water|sorrid\w*|smile/, re: /ansi\w*|nervos\w*|tremano|agitat\w*|panic\w*|stage fright|nervous|shaking|anxious|paura|scared|afraid|cuore|heart|sudo|sweat\w*|pubblico|audience/, w: 4 },
    },
  },
  chiedere: {
    color: '#fbbf24', prio: 2,
    re: /chiedere (aiuto|un favore|una mano|un aumento|ferie|un permesso|consiglio|scusa a|il permesso|un parere|un passaggio|un giorno)|ask(ing)? for (help|a favou?r|a raise|time off|advice|permission|a ride|feedback)|chiedo (aiuto|un favore|a)|devo chiedere|chiedergli (un|di)|chiederle (un|di)|ask (him|her|them|my \w+) (to|for|if)|\baumento\b|\braise\b|\bfavou?r\b|\bfavore\b|\bpermess[oi]\b|chiedo (le )?ferie|ask for time off|lend a hand|give me a hand|a hand with|chiedo (una mano|un favore|aiuto|un aiuto|un consiglio|un parere|il permesso)|domando a|domandare a|aiutarmi|help me (with|to)|help from|ho bisogno di aiuto|i need help|need a hand|serve una mano|rivolgermi a|reach out for help|mentore|mentor|raccomandazione|recommendation letter|lettera di referenze|reference letter/g,
    not: /lavoro (da|come|in)|cambiare lavoro|dimission\w*|licenzi\w*|quit my job|resign\w*/,
    ideas: {
      chiaro: { opt: /chied\w*|ask\w*|dir\w*|diretto|direct\w*|chiar\w*|clear|esplicit\w*|subito|now/, re: /aumento|raise|promozione|promotion|ferie|time off|favor\w*|permess\w*|aiuto|help|bisogno|need/, w: 3 },
      momento: { opt: /moment\w*|aspett\w*|wait|tempo|time|quando|when|dopo|later|giusto|right|domani|tomorrow|riunione|meeting/, re: /occupat\w*|busy|stress\w*|nervos\w*|giornata (storta|pesante)|bad day|hard day|di fretta|in a hurry|capo|boss|manager|collega|colleague/, w: 3 },
      offri: { opt: /offr\w*|in cambio|exchange|reciproc\w*|return|ringrazi\w*|thank|contraccamb\w*|give back|scambio|swap/, re: /favor\w*|aiuto|help|mano|hand|molto|a lot|disturb\w*|bother\w*|imbarazz\w*|embarrass\w*|vergogn\w*|ashamed/, w: 3 },
    },
  },
  vacanza: {
    color: '#38bdf8', prio: 2,
    re: /mare o (in )?montagna|sea or (the )?mountains|quest estate|this summer|week in|ad agosto|in agosto|una settimana|prenoto (il |un )?volo|book (the |a |our )?flight|vacanz\w*|\bferie\b|holiday\w*|vacation|prenotare (il|un|l|lo|la) (volo|hotel|viaggio|alloggio|treno|b&b)|book (a |the |my )?(flight|hotel|trip|train|stay|airbnb)|\bvolo\b|\bvoli\b|\bflight\b|\bhotel\b|\bairbnb\b|mare o montagna|sea or mountain|beach|spiaggia|citta d arte|city break|dove (andare|andiamo|vado) in (vacanza|ferie)|where to go (on|for) (holiday|vacation)|cheap flights|\bflights?\b|book now|prenota ora|biglietti aerei|biglietto aereo|ryanair|easyjet|\bbnb\b|crociera|cruise|campeggio|camping|resort|agriturismo|last minute|early booking|prenotare presto|book early|itinerar\w*|itinerary|valigia|\bluggage\b|suitcase|passaporto|passport|ponte (del|di)|long weekend|bank holiday|agosto|estate al mare|summer trip|natale (in|a) |christmas trip|capodanno (in|a)|new year.?s (trip|eve trip)/g,
    not: null,
    ideas: {
      flessibile: { opt: /prenot\w*|book|subito|now|presto|early|flessibil\w*|flexible|cancellabil\w*|refundable|gratuit\w*|free cancel\w*/, re: /offerta|deal|sconto|discount|prezzi (salgono|alti)|prices (go|are) up|posti|availability|last minute|ultimo|early booking|agosto|natale|summer|estate/, w: 3 },
      tipo: { opt: /mare|montagna|citta|sea|mountain|city|natura|nature|relax|avventura|adventure|cultura|culture|beach|spiaggia/, re: /non so (dove|cosa)|do not know (where|what)|indecis\w*|undecided|idee|ideas|dove (andare|vado|andiamo)|where to go|insieme|together|coppia|couple|famiglia|family|amici|friends/, w: 3 },
      aspetta: { opt: /aspett\w*|wait|dopo|later|rimand\w*|postpone|pens\w*|think|prima (di|devo)|before/, re: /ferie|time off|permess\w*|capo|boss|date|dates|calendar\w*|soldi|money|budget|passaporto|passport|incerto|unsure|non so se|not sure if/, w: 2 },
    },
  },
  viaggio: {
    color: '#4ade80', prio: 2,
    re: /\bgita\b|\bgite\b|in giornata|day trip|road trip|escursion\w*|\bhike\b|hiking|trekking|passeggiata in montagna|weekend fuori porta|weekend away|weekend trip|short trip|scappata|getaway|viaggetto|piccolo viaggio|small trip|short break|mini.?vacanza|quick trip|partire (stasera|domani|presto|subito)|leave (tonight|tomorrow|early|now) for|fuori citta|out of town|lago|\blake\b|\bcollina\b|\bhills?\b|borgo|\bvillage\b|un giro (sui|sulle|in|al|a)|giro sui colli|go for a drive|take a drive|partiamo|alba\b|all alba|at dawn|at sunrise|in montagna|to the mountains|picnic|pic.?nic|scampagnata|\bbbq\b|barbecue|camminata (in|al|nel)|campo base|\bcampsite\b|tenda da campeggio|camping tent|\btent\b|giro in (bici|moto|auto)|bike ride|motorcycle ride|drive to/g,
    not: null,
    ideas: {
      meta: { opt: /meta|posto|place|destinazion\w*|destination|vicin\w*|nearby|lago|lake|montagna|mountain|mare|sea|borgo|village|citta|town/, re: /non so (dove|cosa)|do not know (where|what)|indecis\w*|undecided|dove (andare|andiamo|vado)|where to go|idee|ideas/, w: 3 },
      presto: { opt: /prest\w*|early|mattin\w*|morning|alba|dawn|sunrise|partire|leave|subito|now|stasera|tonight/, re: /traffico|traffic|caldo|heat|folla|crowd\w*|giornata lunga|long day|ritorno|return|tornare|get back|sera|evening|pioggia|rain|meteo|weather/, w: 3 },
      semplice: { opt: /semplic\w*|simple|trasport\w*|treno|train|bus|auto|car|bici|bike|comod\w*|easy|zaino|backpack|panino|sandwich/, re: /stanc\w*|tired|poco tempo|little time|bambin\w*|kids|budget|poco budget|cheap|economic\w*|improvvis\w*|spontane\w*|last.?minute|ultimo momento/, w: 3 },
    },
  },
  spostarsi: {
    color: '#a3a3a3', prio: 2,
    re: /\bmacchina\b|\bauto\b|\btreno\b|autobus|\bbus\b|\bmetro\b|\bbici\b|bicicletta|\bmoto\b|monopattino|parcheggi\w*|traffico|benzina|guidare|\bdriv\w*|\bcar\b|\btrain\b|\bbike\b|\bcycl\w*|scooter|\btaxi\b|\buber\b|commut\w*|pendolar\w*|andare (al lavoro|a lavoro|in ufficio) (in|con|a)|come (arrivo|vado|raggiungo)|how (do i|to) (get|go)|leave (now|early|later)|parto (adesso|ora|presto|piu tardi)|esco (ora|adesso) per|passaggio|\blift\b|carpool\w*|car sharing|a piedi|on foot|\bwalk (to|there)|prendo (il|la|l|un|una) (treno|bus|metro|auto|macchina|bici|taxi)|take (the|a) (train|bus|metro|car|bike|taxi)|abbonamento (bus|treno|trasporti|ai mezzi)|\bmezzi\b|mezzi pubblici|public transport|season pass|ritardo (del|dello|di) (treno|bus|volo)|train (delay|strike)|sciopero/g,
    not: /compr\w* (la |una |un )?(nuov\w* )?(macchina|auto)|buy(ing)? (a |the )?(new |used )?(car|bike)|noleggio lungo|\bleasing\b/,
    ideas: {
      mezzi: { opt: /treno|bus|metro|autobus|mezzi|train|public|tram|trasporto pubblico|public transport/, re: /traffico|traffic|parcheggi\w*|parking|stanc\w*|tired|leggere|read|lavorare|work|sciopero|strike/, w: 2 },
      auto: { opt: /auto|macchina|car|guid\w*|driv\w*|taxi|uber|passaggio|ride|lift|carpool|moto|scooter/, re: /pioggia|rain|tardi|late|bagagli|luggage|bambin\w*|kids|sera|night|notte|spesa|groceries|carico|heavy|lontano|far/, w: 2 },
      piedi: { opt: /piedi|bici|bicicletta|monopattino|walk|foot|bike|cycl\w*|scooter|passegg\w*|camm\w*/, re: /vicin\w*|near|bel tempo|nice weather|sole|sunny|movimento|exercise|aria|fresh air|poco (lontano|distante)|short distance|giro|ride/, w: 4 },
    },
  },
  sistemare: {
    color: '#fb923c', prio: 2,
    re: /aggiustar\w*|riparar\w*|riparazion\w*|fai da te|\bdiy\b|rubinetto|lampadina|montare|\bfix\w*|\brepair\w*|\bassembl\w*|idraulico|elettricista|plumber|electrician|tinteggiar\w*|dipingere (la|il|le|i) (cas\w*|stanz\w*|parete|muro|cucina|camera|porta)|paint (the|my) (room|wall|kitchen|bedroom|house)|imbianchin\w*|dipingo (io )?(la|il|le|i)\b|painter|trapano|\bdrill\b|\bviti\b|\bscrews?\b|mensola|\bshelf\b|scaffale|\bmobile\b|furniture|\bikea\b|perdita d acqua|leak\w*|\bguasto\b|\bbroken\b|si e rotto|got broken|caldaia|boiler|tapparella|serratura|\block\b|mettere a posto|handyman|tuttofare|manutenzione|maintenance|bricolage|\bpresa\b|\bsocket\b|tyre|\btire\b|\bgomma\b|puntura|punctur\w*|\bbrake\w*|\bfreni\b|lavandino|intasat\w*|clogged|\bsink\b|\bscarico\b|scaldabagno|gocciol\w*|dripping|serratur\w*|salvavita|interruttore|non funziona|does not work|doesn t work|not working/g,
    not: null,
    ideas: {
      provatu: { opt: /prov\w*|tent\w*|try|fai da te|diy|da sol\w*|myself|tutorial|video|imparo|learn|io/, re: /semplice|simple|piccol\w*|small|facile|easy|tutorial|video|lampadina|bulb|mensola|shelf|vite|screw|ikea|montare|assembl\w*/, w: 3 },
      esperto: { opt: /esperto|professionist\w*|chiam\w*|idraulic\w*|elettricist\w*|call|expert|pro\b|plumber|electrician|tecnico|technician|ripar\w*|repair\w*/, re: /acqua|water|perdita|leak|elettric\w*|electric\w*|gas|caldaia|boiler|scoss\w*|spark\w*|corrente|power|sicurezza|safety|muro portante|load.?bearing|tetto|roof/, w: 5 },
      subito: { opt: /subito|adesso|now|oggi|today|rimand\w*|dopo|later|aspett\w*|wait|weekend/, re: /rimand\w*|putting off|da (mesi|settimane)|for (months|weeks)|da tempo|long time|fastidi\w*|annoy\w*|ogni giorno|every day|pesa|nags|lista|list/, w: 2 },
    },
  },
  butto: {
    color: '#a78bfa', prio: 2,
    re: /tengo o (regalo|butto|vendo)|keep or (donate|toss|sell|throw)|non usa piu|no longer (use|uses|wear)|giochi che|buttar\w*|\bbutto\b|tengo o|decluttering|declutter\w*|svuotare (l|il|la|i|le|un|una)|armadio|cambio stagione|cassetto|cantina|soffitta|garage|throw (it )?(away|out)|keep or|get rid of|donate (clothes|old|books)|vendere (usat\w*|vecchi\w*)|sell (old|used)|marie kondo|regalare (vestiti|libri|cose)|\bli dono\b|\bli regalo\b|give away|donate|vecchi (appunti|quaderni|libri|giornali|riviste|vestiti)|riciclare|recycle|scatola dei ricordi|memory box|tengo (questa|questo|quella|quello|la scatola)|vestiti che non uso|che non uso|do not use|donate my|old clothes|old books|vendo o regalo|regalo i vestiti|regalo i miei|regalo le mie|vecchi (libri|vestiti|giocattoli|mobili|oggetti)|vecchie cose|roba vecchia|old stuff|clutter|tenere (questo|quello|queste|quelle)|keep (this|that|these|those)|non lo uso (piu|mai)|never use (it|this|that)|dentro l armadio|closet|wardrobe|ricordi in scatola|memorabilia|mercatino|flea market|second hand|secondhand/g,
    not: null,
    ideas: {
      scatola: { opt: /scatola|box|metto|put|da parte|aside|tengo|keep|aspett\w*|wait|per ora|for now/, re: /incerto|unsure|dubb\w*|doubt|non so|do not know|ricord\w*|memor\w*|sentiment\w*|regal\w*|gift|forse|maybe/, w: 3 },
      uso: { opt: /uso|usat\w*|use|indoss\w*|wear|ultima volta|last time|serve|need|funzion\w*|works/, re: /mai usat\w*|never used|non lo uso|do not use|anno|year|stagione|season|armadio|closet|wardrobe|cassetto|drawer/, w: 3 },
      dona: { opt: /dona\w*|regal\w*|vend\w*|give|donate|sell|mercatino|second hand|riciclar\w*|recycle|via\b|away/, re: /ancora (buono|bello|utile)|still (good|nice|useful)|buono stato|good condition|nuovo|new|qualcun altro|someone else|brutto buttare|pity to throw|spreco|waste/, w: 3 },
    },
  },
  telefono: {
    color: '#818cf8', prio: 1,
    re: /telefono in un cassetto|phone in a drawer|metto (via )?il telefono|put (away )?my phone|silenzioso|do not disturb|non disturbare|telefono|cellulare|smartphone|schermo|screen time|\bphone\b|scroll\w*|notifich\w*|notification\w*|too much time|(delete|uninstall|elimino|cancello|disinstall\w*) (this |the |l |la |quest\w* |un )?app\b|doomscroll|disattivare|disinstall\w*|uninstall|digital detox|detox digitale|videogioc\w*|video games?|gaming|playstation|\bconsole\b|giocare a|\bplay (a )?game|\bgame\b|\bgames\b|\bsocial media break\b|pausa dai social|break from social|controllare (il telefono|le notifiche|i messaggi)|check(ing)? (my )?(phone|notifications|messages)|tempo (sul|al) telefono|time on (my )?phone|streaming senza fine|endless scroll|batteria|\bbattery\b|prima di dormire (col|con il) telefono|phone (in|before) bed|schermo a letto|screen in bed/g,
    not: null,
    ideas: {
      posa: { opt: /pos\w*|lasci\w*|metto via|put (it )?(away|down)|leave|stanza|other room|lontano|away|spegn\w*|off|silenzios\w*|silent/, re: /lavor\w*|work|studi\w*|stud\w*|cena|dinner|famiglia|family|amici|friends|concentr\w*|focus|film|book|libro|dormire|sleep|letto|bed/, w: 3 },
      finestra: { opt: /minut\w*|ora\b|hour|limit\w*|timer|tempo|window|dopo|later|solo|only|dieci|ten|venti|twenty|quando/, re: /scroll\w*|ore|hours|troppo|too much|tempo (che )?(perdo|passo)|time (i )?(waste|spend)|abitudin\w*|habit|automatic\w*|noia|bored\w*|schermo|screen time/, w: 3 },
      notifiche: { opt: /notifich\w*|notification\w*|disattiv\w*|turn off|silenz\w*|mute|disinstall\w*|uninstall|elimin\w*|delete|rimuov\w*|remove/, re: /distratt\w*|distract\w*|interrompe\w*|interrupt\w*|continu\w*|constant\w*|ping|vibra\w*|buzz\w*|ansia di rispondere|pressure to reply/, w: 4 },
    },
  },
  social: {
    color: '#e879f9', prio: 3,
    re: /postare|pubblicare|storia (su )?insta\w*|instagram story|\bstories\b|\breel\b|\breels\b|\bposto (una |la |questa |quella |un |il |questo )?(foto|storia|video|reel|post)\b|follow request|friend request|richiesta di (amicizia|follow|seguire)|follow back|\bpost\b|post it|\bcaption\b|didascalia|foto (da )?(postare|pubblicare)|post(ing)? a|share (a )?(photo|story|video)|condivido|condivid\w* (la|una|questa) (foto|storia)|share (my|the|this) (photo|picture|video)|condividere (la|una) (foto|storia|video)|\bfollowers?\b|seguaci|\bunfollow\w*|smettere di seguire|silenziare|\bmute\b|commento|commentare|comment (on|under)|mettere like|\blike (a|his|her|their)\b|\blinkedin\b|influencer|instagram|facebook|tiktok|\bthreads\b|\bx\.com\b|\btwitter\b|\bstatus\b|\bbio\b|profile (pic|picture|photo)|foto profilo|tag(gare)? (qualcuno|lui|lei)|\btag (him|her|them|someone)|dm (a|to)|rispondere a un commento|reply to (a |the |that )?comment|\bvirale\b|\bviral\b|hashtag|pubblico (le|la|il|un|una|delle) (foto|video|storia)|foto delle vacanze|\btaggo\b|nella storia|nella story|in the story|my story/g,
    not: null,
    ideas: {
      semplice: { opt: /post\w*|pubblic\w*|share|condivid\w*|foto|photo|storia|story|si\b|yes|vai|go/, re: /bella|nice|felice|happy|orgogli\w*|proud|ricordo|memory|viaggio|trip|compleanno|birthday|momento|moment|risultat\w*|result|traguardo|milestone/, w: 2 },
      aspetta: { opt: /aspett\w*|wait|dopo|later|domani|tomorrow|bozza|draft|pens\w*|think|non post\w*|do not post|tengo|keep|per me/, re: /arrabbiat\w*|angry|upset|nervos\w*|sfogo|vent\w*|ex\b|polemic\w*|controvers\w*|drama|sera tardi|late at night|notte|night|ubriac\w*|drunk|rabbia/, w: 4 },
      privato: { opt: /privat\w*|dm|messagg\w*|message|scriv\w*|write|dir\w*|tell|di persona|in person|chiam\w*|call|direttamente|directly/, re: /commento|comment|critic\w*|risposta|reply|persona|person|amic\w*|friend|conosc\w*|know|pubblic\w*|public|imbarazz\w*|awkward/, w: 3 },
    },
  },
  creativita: {
    color: '#f472b6', prio: 2,
    re: /short story|racconto|\bpoem\b|poesia|romanzo|\bnovel\b|scrivere (il |la |un |una )?(mio |mia )?(libro|racconto|romanzo|poesia|canzone|blog|diario|storia)|aprire un blog|apro un blog|\bdipingo\b|\bsuono\b|write (my |a |the )?(story|book|novel|poem|song)|dipingere|disegnar\w*|\bdisegno\b|\bmusica\b|suonare|comporre|\bcanzone\b|creativ\w*|\bhobby\b|\bnovel\b|write (a )?(book|story|song|poem|blog|journal)|\bpaint\w*|\bdraw\w*|\bcompose\w*|\bcraft\w*|sketch\w*|fare fotografia|fotografare|scattare foto|take photos|cucito|\bmaglia\b|knit\w*|\bsew\w*|\bpottery\b|fare ceramica|make ceramics|inizio un blog|start (a |my )?blog|podcast|short story|racconto|write it down|youtube channel|canale youtube|\bidea\b per un|idea for a (book|song|business|video|story|project)|progetto creativo|creative project|\bmusa\b|writer.?s block|blocco dello scrittore|\bstudio (di )?(arte|musica)|art studio|portfolio|mostra (le mie|il mio)|show my (work|art|writing)/g,
    not: null,
    ideas: {
      venti: { opt: /venti|minut\w*|timer|ogni giorno|daily|ora|now|oggi|today|subito|inizi\w*|start|comincio|begin/, re: /rimand\w*|putting off|non (ho|trovo) (il )?tempo|no time|bloccat\w*|stuck|blocco|block|perfett\w*|perfect|inizi\w*|start|comincio|begin/, w: 3 },
      piccolo: { opt: /piccol\w*|small|breve|short|semplic\w*|simple|bozza|draft|schizzo|sketch|prototip\w*|prototype/, re: /grande|big|ambizios\w*|ambitious|libro|book|romanzo|novel|album|progetto|project|tutto|everything|completo|complete|troppo/, w: 3 },
      mostra: { opt: /mostr\w*|condivid\w*|show|share|pubblic\w*|publish|post\w*|invi\w*|send|feedback|parere/, re: /vergogn\w*|shy|timid\w*|paura|afraid|giudizio|judg\w*|non so se|not sure if|bello|good|abbastanza|enough|fatto|finished|finito|done/, w: 4 },
    },
  },
  mattina: {
    color: '#fde047', prio: 3,
    re: /\bmattine\b|\bmornings\b|caotic\w*|chaotic|make my bed|rifaccio il letto|rifare il letto|routine (mattutina|del mattino|della mattina|serale|della sera|quotidiana)|morning routine|evening routine|wind down|la mattina (faccio|sono|mi)|every morning|ogni mattina|ogni sera|prima di uscire|before leaving|in ritardo la mattina|late in the morning|mi preparo la mattina|\broutine\b|abitudini del mattino|morning habits|svegliarmi (presto|prima)|mi sveglio (mezz ora )?prima|mezz ora prima|half an hour earlier|organizzo (meglio )?al mattino|organi[sz]e my mornings|vestiti la sera prima|sera prima|night before|wake up (at|earlier|early)|get up (at|earlier|early)|svegliarmi alle|alzarmi alle|mi sveglio alle|mi alzo (prima|presto)|alzarmi (prima|presto)|sera per la mattina|per la mattina dopo|for the next morning|wake up (early|earlier)|alzarmi (presto|prima)|get up (early|earlier)|mattiniero|early bird|nottambulo|night owl|alzataccia|doccia (fredda|la mattina)|cold shower|colazione e|ritual\w*|\brito\b/g,
    not: null,
    ideas: {
      ieri: { opt: /ieri|sera prima|stasera|tonight|prepar\w*|prepare|pronto|ready|zaino|bag|vestit\w*|clothes|outfit/, re: /fretta|hurry|rush|ritardo|late|caos|chaos|corsa|running around|dimentic\w*|forget\w*|cerco|looking for/, w: 3 },
      luce: { opt: /luce|acqua|light|water|finestra|window|tenda|curtain|aria|air|sole|sun|stretch|allung\w*/, re: /stanc\w*|tired|pesante|groggy|svegli\w* (male|a fatica)|hard to wake|sonnolenz\w*|sleepy|inverno|winter|buio|dark/, w: 3 },
      senza: { opt: /senza|telefono|phone|silenzio|silence|calma|calm|lenta|slow|musica|music|caffe|coffee|prima di|before/, re: /telefono|phone|social|notifich\w*|notification|scroll|messagg\w*|messages|email|mail|news|notizie|stress\w*|ansi\w*|anxious/, w: 3 },
    },
  },
  prestare: {
    color: '#fde68a', prio: 3,
    re: /mi ha prestato|\bprestato\b|restituirlo|restituirla|devo restituire|return it|owes me|mi deve (dei )?(soldi|denaro)|owe me|prestar\w*|\bprestito\b|\bpresto (dei |i |un po di )?(soldi|denaro)|presto (i miei|il mio|la mia)|\bpresto (\w+ )?(euro|dollari|soldi|denaro)|never gave back|gave back my|not returned|never returned|non ha (mai )?restituito|non mi ha restituito|\bloan\b|\bprestami\b|\blend(?! a hand)\w*|\bborrow\w*|soldi a (un|una|mio|mia|un mio|una mia)|money to (a |my )?(friend|brother|sister|colleague|cousin)|mi ha chiesto (dei )?soldi|asked (me )?(to lend|for money|for a loan)|presto (la|il|i|le) (macchina|auto|libro|libri|vestit\w*|casa)|lend (my|the) (car|book|books|clothes|house|money)|mi (deve|devono) dei soldi|owes me|restituire|pay me back|paga\w* (indietro|il debito)|chiedere indietro|ask (him|her|them) to (pay|return)|riprendermi|get back (my|the)|anticip\w* (i )?soldi|front the money|cauzione|deposit for/g,
    not: null,
    ideas: {
      chiarezza: { opt: /prest\w*|dar\w*|lend|give|si\b|yes|aiut\w*|help|accett\w*|accept/, re: /amic\w*|friend|famiglia|family|bisogno|need|difficolt\w*|trouble|hard (time|spot)|urgent\w*|emergenza|emergency/, w: 3 },
      regala: { opt: /regal\w*|dona\w*|gift|donate|dar\w* (senza|e basta)|give (it )?away|non (voglio|chiedo) indietro|do not expect|forget it|dimentic\w*/, re: /piccol\w*|small|poco|little|amic\w*|friend|ci tengo|care about|tenere buoni rapporti|keep the peace|rapporto|relationship/, w: 3 },
      no: { opt: /\bno\b|rifiut\w*|non (presto|do|posso)|decline|refuse|say no|diss?\w* di no|passo|pass|dire di no/, re: /gia successo|happened before|non (ha|hanno) (mai )?(restituit\w*|reso)|never (paid|returned|gave back)|molto|a lot|troppo|too much|non mi fido|do not trust|ritard\w*|late|ancora (deve|devono)|still owes/, w: 4 },
    },
  },
  sincerita: {
    color: '#fb7185', prio: 3,
    re: /non mi convince|truth about|the truth|\bonest\w*|onesta con|la verita|\b(le|gli) dico (che)?\b|\bsono onest\w*|dire la verita|dico la verita|la verita\b|the truth|dico quello che penso|what i really think|is cheating|cheating|mi tradisce|la tradisce|lo tradisce|tell my friend|dirlo alla mia amica|dirlo al mio amico|dirglielo|dico cosa penso|cosa penso davvero|penso davvero|dico (alla|al) (\w+ ){1,2}che|dico a mi[oa] \w+ che|dirle che|dirgli che|tell (her|him|them) (that|about)|should i tell (her|him|them)|faccio notare|far notare|point out|difetto|dirgli la verita|dirle la verita|tell (him|her|them|my \w+) the truth|\bhonest\w*|\bsincer\w*|\bfeedback\b|dire (cosa|quello che) penso|say what i think|speak up|parlare apertamente|\bdirlo\b|\bcritic\w*|dare un parere|give my opinion|\bsegreto\b|\bsecret\b|confessare|confess\w*|(dirgli|dirle|dirgli|dirti) quello che (provo|penso)|come lo dico|how (do i|to) (tell|say|put) (it|this|him|her|them)|come glielo dico|how do i tell|opinione sincera|honest opinion|dire come la penso|say how i feel|parlare chiaro|speak (my mind|plainly)|essere sincer\w*|be honest|bugia|\blie\b|\blying\b|mentire|meglio che lo sappia|better (that )?(he|she|they) know/g,
    not: null,
    ideas: {
      cura: { opt: /dir\w*|tell|parl\w*|talk|spieg\w*|explain|sincer\w*|honest|verita|truth|franc\w*|chiar\w*|clear|diretto|direct/, re: /importante|important|pesa|weighs|bothers|ripete|keeps|da tempo|for a while|ci tengo|care about|rapporto|relationship|amic\w*|friend|collega|colleague/, w: 3 },
      permesso: { opt: /chied\w*|permess\w*|ask|permission|vuoi sapere|do you want to know|se (vuole|vuoi)|if (they|he|she|you) want|prima|first/, re: /delicat\w*|sensitive|difficile|hard|critic\w*|feedback|giudizio|judg\w*|offend\w*|hurt|ferire|upset|male/, w: 4 },
      tieni: { opt: /tengo|keep|per me|to myself|non (dico|parlo)|do not (say|tell)|taccio|silence|silenzio|aspett\w*|wait|lascio|let it/, re: /piccol\w*|small|minor|banal\w*|petty|trivial|dettaglio|detail|passer\w*|will pass|momento|moment|stanc\w*|tired|nervos\w*|upset/, w: 3 },
    },
  },
  daremano: {
    color: '#34d399', prio: 3,
    re: /volontariato|volunteer\w*|food bank|banco alimentare|dare una mano|aiutare (un|una|il|la|mio|mia|i|le|gli)|aiuto (un|una|il|la)\b|offro aiuto|mi offro|offrirmi|offer to|volunteer to|help at|help out at|give a hand|school fair|sagra|vicino anzian\w*|dono il sangue|\bdono\b|donate to|donare a|donazion\w*|donation|\bhelp (a |my |someone|out|him|her|them)|offrirmi|offrire aiuto|offer (to )?help|portare la spesa|carry (the )?groceries|vicino anzian\w*|elderly neighbo\w*|fare del bene|do good|gesto gentile|kind gesture|random act|gentilezza|kindness|donare (un|del|il)|donate (a |some |my )?(blood|clothes|books|time|money)|donare il sangue|give blood|ore (di )?volontariat\w*|volunteer (hours|for a day)|mensa dei poveri|soup kitchen|raccolta (di )?(cibo|vestiti|fondi)|food (drive|bank)|clothing drive|banco alimentare|pulizia (del )?(parco|spiaggia|quartiere)|cleanup (day|of the)|sostenere (un|una) (amico|amica|collega)|support (a |my )?(friend|colleague)|aiuto (a|per) (un|una) (amico|amica|vicino|collega)/g,
    not: /iscrivermi|iscrivere|diventare volontari\w*|become a volunteer|associazione di volontariato/,
    ideas: {
      gesto: { opt: /gest\w*|piccol\w*|small|gentil\w*|kind\w*|subito|now|oggi|today|messagg\w*|message|offr\w*|offer/, re: /vicin\w*|neighbo\w*|anzian\w*|elderly|collega|colleague|amic\w*|friend|spesa|groceries|sol[oa]\b|alone|lonely|difficolt\w*|struggl\w*/, w: 3 },
      ore: { opt: /ore|hours|fisse|regolar\w*|regular\w*|tempo|time|settimanal\w*|weekly|volontar\w*|volunteer|associazion\w*|organization/, re: /tempo|time|spazio|space|energie|energy|impegn\w*|commit\w*|continuativ\w*|ongoing|regolar\w*|long term|lungo termine|ogni settimana|every week/, w: 3 },
      chiedi: { opt: /chied\w*|ask|domand\w*|ascolt\w*|listen|cosa serve|what.{0,12}need|capire|understand|telefon\w*|call|visita|visit/, re: /non so (come|cosa)|do not know (how|what)|indecis\w*|unsure|rispett\w*|respect|discrezion\w*|discreet|imbarazz\w*|awkward|orgogli\w*|proud/, w: 4 },
    },
  },
  generico: {
    color: '#c4b5fd', prio: 0,
    re: /(?!)/g,
    not: null,
    ideas: {
      piccolo: { w: 1 },
      notte: { re: /stanc\w*|tardi|notte|stanotte|ansi\w*|agitat\w*|nervos\w*|stress\w*|tired|late|night|anxious|worried|upset/, w: 4 },
      ascolta: { re: /persona|amic\w*|famiglia|collega|capo|lui|lei|insieme|con (mio|mia|un|una)|friend|family|colleague|boss|together|with (my|a|an)/, w: 3 },
      prova: { re: /nuov\w*|prov\w*|primo|prima volta|curios\w*|new|try|first time|curious|never/, w: 3 },
    },
  },
};
