// Consigli di ogni giorno (italiano). Qualitativi: buon senso e abitudini comuni, nessuna statistica.
// Ogni idea: title (nome della strada), headline (segue «Il mio consiglio:»), why (2 motivi), step (primo passo concreto).
// Regole del Mood Guard: niente lessico negativo, niente promesse; cifre solo come timer («15 minuti»).

export const DAILY_TEXT = {
  cena: {
    label: 'Cena', example: 'Cosa cucino stasera?',
    ideas: {
      pasta: { title: 'Pasta in una pentola', headline: 'stasera pasta con quello che hai già in casa: una pentola, 15 minuti, nessuna decisione difficile.', why: ['Quando sei in dubbio, il piatto più semplice di solito vince: meno spesa, meno piatti, meno pensieri.', 'Aglio, olio e peperoncino, oppure un barattolo di pomodoro: basta quello che trovi.'], step: 'Metti l\'acqua sul fuoco adesso: mentre bolle decidi il condimento.' },
      frigo: { title: 'Svuota il frigo', headline: 'svuota il frigo: una frittata, o del riso saltato con le verdure che stanno per finire.', why: ['Usare quello che hai è la cena più economica e più comoda.', 'Una padella sola significa anche pochi piatti da lavare.'], step: 'Apri il frigo, prendi tre cose che stanno bene insieme e cucinale nella stessa padella.' },
      veloce: { title: 'Pronta in 10 minuti', headline: 'qualcosa che si fa in 10 minuti: uova, oppure pane, formaggio e un\'insalata.', why: ['Quando sei stanco, una cena semplice è già una buona cena.', 'Domani, con più energia, avrai voglia di cucinare meglio.'], step: 'Scegli la cosa che si cucina con una sola padella e mettila in tavola senza fretta.' },
      ordina: { title: 'Ordino fuori', headline: 'stasera ordina qualcosa che ti piace davvero, e goditelo.', why: ['Una sera di pausa dai fornelli fa parte di una settimana che funziona.', 'Il piatto che ti viene in mente per primo, di solito, è quello giusto.'], step: 'Ordina entro 5 minuti e apparecchia comunque la tavola: cambia il clima della serata.' },
      ospiti: { title: 'Una teglia da portare in tavola', headline: 'cucina una teglia: pasta al forno o verdure arrosto, così stai con gli ospiti e non ai fornelli.', why: ['Un piatto che cuoce da solo ti lascia il tempo di esserci.', 'Le cose semplici e abbondanti fanno sempre una bella tavola.'], step: 'Prepara tutto prima, metti in forno e l\'ultima ora è tutta tua.' },
      zuppa: { title: 'Una zuppa calda', headline: 'una zuppa o una minestra calda: ceci o lenticchie, brodo, un filo d\'olio.', why: ['Con il freddo o la pioggia, qualcosa di caldo in una ciotola fa subito casa.', 'Si prepara in una pentola e il giorno dopo è ancora più buona.'], step: 'Soffriggi una cipolla, aggiungi i legumi e il brodo: 20 minuti e hai finito.' },
      fresco: { title: 'Un piatto fresco', headline: 'un piatto freddo: insalata di riso o di pasta, oppure pomodori e mozzarella.', why: ['Con il caldo non serve accendere i fornelli a lungo.', 'Si prepara prima e si mangia con calma.'], step: 'Cuoci la pasta o il riso, passali sotto l\'acqua fredda e aggiungi quello che hai di fresco.' },
      leggero: { title: 'Leggero e semplice', headline: 'verdure e una proteina semplice: uova, legumi o pesce al forno.', why: ['Un piatto leggero ti lascia energia per il resto della serata.', 'Pochi ingredienti, sapori netti, poca fatica.'], step: 'Metti le verdure in forno e, intanto, prepara la proteina in padella.' },
    },
  },
  serata: {
    label: 'Serata', example: 'Esco o resto a casa stasera?',
    ideas: {
      'esci-poco': { title: 'Esco, ma per un\'ora', headline: 'esci, ma solo per un\'ora: se non ti va, torni a casa e hai comunque fatto la tua parte.', why: ['Spesso la voglia arriva dopo che hai cominciato, non prima.', 'Con un limite di tempo la decisione pesa molto meno.'], step: 'Scegli il posto più vicino a casa e dillo a chi ti aspetta: «Mi faccio un\'ora».' },
      resta: { title: 'Resto a casa', headline: 'resta a casa e fallo bene: divano, qualcosa di buono da mangiare, telefono lontano.', why: ['Riposare è una scelta, non una rinuncia: domani sei più presente per le persone a cui tieni.', 'Se sei stanco, la serata fuori spesso costa più energia di quella che restituisce.'], step: 'Prepara la cena che ami e spegni le notifiche per due ore.' },
      'esci-vai': { title: 'Esco volentieri', headline: 'esci: quando qualcuno ti invita e ne hai voglia, la serata di solito ricarica più di quanto fatichi a prepararla.', why: ['Stare con le persone è uno dei modi più semplici per sentirsi meglio.', 'Un invito accettato oggi è un bel ricordo domani.'], step: 'Rispondi di sì adesso, prima che arrivi il dubbio, e scegli cosa mettere.' },
    },
  },
  messaggio: {
    label: 'Un messaggio', example: 'Gli scrivo o aspetto?',
    ideas: {
      scrivi: { title: 'Scrivi adesso', headline: 'scrivi, in modo breve e gentile, senza pretendere una risposta.', why: ['Un messaggio semplice costa poco; aspettare giorni di solito rende tutto più pesante da scrivere.', 'Se la risposta non arriva subito, non dice nulla su di te: le persone hanno giornate piene.'], step: 'Una riga, una cosa vera: «Mi è venuto in mente di te, come stai?» Poi posa il telefono.' },
      aspetta: { title: 'Aspetta e rileggi domani', headline: 'scrivi pure il messaggio, ma non inviarlo stasera: rileggilo domani mattina.', why: ['Quando siamo agitati le parole escono più dure di come le intendiamo.', 'Se domani lo invieresti uguale, è un messaggio che vale la pena mandare.'], step: 'Salvalo nelle note, chiudi la chat e fai una cosa con le mani: una doccia, una passeggiata.' },
      scusa: { title: 'Chiedi scusa', headline: 'scrivi per chiedere scusa, senza «ma» e senza spiegazioni lunghe.', why: ['Una scusa breve e sincera vale più di una lunga e piena di giustificazioni.', 'Chi la riceve capisce subito che ci tieni.'], step: '«Mi dispiace per…, avevo bisogno di dirtelo.» Fine, e poi lascia spazio.' },
      rispondi: { title: 'Rispondi adesso', headline: 'rispondi adesso con una riga semplice, anche solo per dire che ci stai pensando.', why: ['Rispondere in ritardo è normale: la cosa più gentile è farlo, non farlo perfetto.', 'Un «ti rispondo meglio stasera» tiene aperta la porta.'], step: 'Scrivi la prima frase che ti viene in mente e invia.' },
      chiama: { title: 'Chiama', headline: 'chiama: per certe cose due minuti di voce valgono più di venti messaggi.', why: ['La voce toglie i malintesi che il testo crea.', 'Si chiude tutto in meno tempo.'], step: 'Manda un «Hai due minuti per una chiamata?» e poi telefona.' },
    },
  },
  outfit: {
    label: 'Cosa mi metto', example: 'Che vestito metto stasera?',
    ideas: {
      comodo: { title: 'Comodo, con un dettaglio', headline: 'metti il capo con cui ti senti più a tuo agio, più un dettaglio curato: una bella giacca, scarpe pulite o un accessorio che ti piace.', why: ['Quando stai bene nei vestiti, si vede da come ti muovi.', 'Un solo dettaglio curato basta a far sembrare tutto pensato.'], step: 'Scegli prima le scarpe, poi costruisci il resto intorno.' },
      lavoro: { title: 'Sobrio e pulito', headline: 'pulito, sobrio e comodo: un colore neutro e un solo dettaglio che ti somiglia.', why: ['In un contesto di lavoro conta sentirsi a posto e non pensarci.', 'Se non devi sistemarti ogni cinque minuti, sei più presente.'], step: 'Provalo ieri sera: se devi aggiustarlo di continuo, cambialo.' },
      appuntamento: { title: 'Quello in cui mi sento sicuro', headline: 'scegli il capo in cui ti senti più sicuro, non quello che ti sembra «più bello».', why: ['La sicurezza è la cosa che le persone notano di più.', 'Con qualcosa di comodo sei più naturale nella conversazione.'], step: 'Mettilo, guardati un secondo allo specchio, sorridi ed esci.' },
      strati: { title: 'A strati', headline: 'pensa a strati: una base leggera, un maglione e una giacca che ripara.', why: ['Gli strati si tolgono e si rimettono: ti adatti a ogni ambiente.', 'Così non devi indovinare la temperatura di tutta la giornata.'], step: 'Controlla le scarpe: se piove, scegli quelle che tengono l\'acqua.' },
      leggero: { title: 'Leggero e chiaro', headline: 'tessuti leggeri e colori chiari, e scarpe in cui cammini bene.', why: ['Con il caldo il comfort viene prima dello stile, e lo stile ne guadagna.', 'Il cotone e il lino respirano meglio di quasi tutto.'], step: 'Porta con te una cosa leggera da mettere se la sera rinfresca.' },
      festa: { title: 'Un capo speciale', headline: 'un capo speciale e tutto il resto semplice: così l\'attenzione va dove vuoi tu.', why: ['Se tutto è speciale, niente lo è: un pezzo solo fa la differenza.', 'Il resto semplice ti lascia libero di muoverti e ballare.'], step: 'Scegli oggi il pezzo speciale e appoggia sopra la sedia tutto il resto, già pronto.' },
    },
  },
  palestra: {
    label: 'Allenamento', example: 'Palestra adesso o domani?',
    ideas: {
      piccola: { title: 'Una versione piccola', headline: 'vai per 20 minuti, non per un\'ora intera: se dopo 10 minuti hai voglia, continui.', why: ['Cominciare è la parte più difficile: una versione piccola la rende possibile.', 'Un allenamento corto fatto vale più di uno lungo rimandato.'], step: 'Metti un timer da 20 minuti e fai solo quello che ti viene più facile.' },
      adesso: { title: 'Vado adesso', headline: 'vai adesso: il momento giusto è quello in cui riesci ad andarci davvero.', why: ['Rimandare a domani spesso significa rimandare di nuovo.', 'Non serve un allenamento perfetto: ne vale uno anche corto.'], step: 'Borsa in mano e fuori dalla porta entro 10 minuti.' },
      riposo: { title: 'Oggi riposo', headline: 'oggi riposa o fai solo una passeggiata, e riprendi domani.', why: ['Il corpo si rafforza anche nei giorni di pausa.', 'Ascoltare la stanchezza fa parte dell\'allenamento.'], step: 'Se te la senti, 15 minuti a piedi; se hai febbre o dolore, riposa e chiedi al tuo medico.' },
      domani: { title: 'Domani, con un orario', headline: 'va bene domani, ma decidi adesso l\'ora e prepara la borsa stasera.', why: ['«Domani» con un orario preciso è un piano; senza orario è un rinvio.', 'Una borsa pronta toglie metà della fatica di partire.'], step: 'Metti la sveglia, prepara la borsa e dillo a qualcuno.' },
    },
  },
  compra: {
    label: 'Un acquisto', example: 'Lo compro o aspetto?',
    ideas: {
      aspetta: { title: 'Aspetto 24 ore', headline: 'aspetta 24 ore: se domani lo vuoi ancora, compralo senza pensarci troppo.', why: ['Le offerte a tempo servono a farti decidere in fretta; una notte toglie la fretta.', 'Se dopo un giorno ne senti ancora la mancanza, è un desiderio vero, non un impulso.'], step: 'Salvalo nel carrello o negli appunti e rimetti il telefono in tasca. Domani chiediti: lo voglio ancora?' },
      compra: { title: 'Lo compro', headline: 'comprarlo ha senso: se ti serve davvero, aspettare costa più dell\'acquisto.', why: ['Una cosa che usi ogni giorno ripaga il suo prezzo in comodità.', 'Confrontare due o tre negozi per dieci minuti basta, poi chiudi.'], step: 'Fissa il tuo budget massimo, confronta due negozi, poi compra e non riguardare più il prezzo.' },
      'gia-ho': { title: 'Uso quello che ho', headline: 'non comprarlo adesso: ne hai già uno simile; usa quello per un mese e poi riconsidera.', why: ['Le cose nuove piacciono molto all\'inizio e poi diventano normali.', 'Se tra un mese ti manca davvero qualcosa, lo saprai con certezza vera.'], step: 'Scrivi nelle note cosa ti darebbe in più rispetto a quello che hai.' },
      budget: { title: 'Prima fisso un tetto', headline: 'aspetta e fissa un tetto di spesa: decidi prima quanto sei disposto a spendere, poi cerca.', why: ['Un limite deciso a mente fredda protegge dalle scelte fatte con l\'entusiasmo.', 'Dentro il budget la scelta diventa più semplice e più serena.'], step: 'Scrivi una cifra massima, e se l\'oggetto la supera, cerca un\'alternativa.' },
    },
  },
  weekend: {
    label: 'Cosa fare', example: 'Cosa faccio nel weekend?',
    ideas: {
      fuori: { title: 'All\'aria aperta', headline: 'esci all\'aria aperta per un paio d\'ore, senza programma preciso: una passeggiata, un mercato, un caffè in un posto nuovo.', why: ['Camminare e guardarsi intorno cambia l\'umore più di quanto pensi.', 'Non programmare troppo lascia spazio alle sorprese.'], step: 'Metti le scarpe adesso e scegli una direzione: decidi strada facendo.' },
      persone: { title: 'Una persona che mi fa stare bene', headline: 'vedi una persona che ti fa stare bene: manda un messaggio ora e proponi un caffè.', why: ['Un invito semplice vale più di tanti piani complicati.', 'Anche una persona sola cambia il tono di tutta la giornata.'], step: '«Ti va un caffè oggi o domani?» Invia e vedi cosa risponde.' },
      riposa: { title: 'Una giornata lenta', headline: 'regalati una giornata lenta: sveglia libera, un pasto buono e una sola cosa da fare.', why: ['Dopo una settimana piena, il riposo è la cosa più produttiva.', 'Una sola cosa da fare ti lascia la sensazione di aver fatto abbastanza.'], step: 'Scegli ora l\'unica cosa della giornata e il resto è tuo.' },
      mani: { title: 'Qualcosa con le mani', headline: 'fai qualcosa con le mani: cucina una ricetta nuova, riordina un cassetto che ti pesa, disegna o suona.', why: ['Fare qualcosa di concreto cura la noia meglio dello schermo.', 'Alla fine hai un risultato che puoi guardare.'], step: 'Scegli la cosa che ti viene in mente per prima e lavoraci per 30 minuti.' },
      progetto: { title: 'Un piccolo progetto', headline: 'scegli un solo progetto piccolo e finiscilo prima di pranzo: poi il resto del giorno è libero.', why: ['Un progetto finito dà più soddisfazione di tre iniziati.', 'Sapere cosa resta da fare ti rende più leggero.'], step: 'Scrivi il progetto in una riga e inizia dalla parte più semplice.' },
    },
  },
  focus: {
    label: 'Studio e lavoro', example: 'Continuo a studiare o faccio una pausa?',
    ideas: {
      continua: { title: 'Ancora 25 minuti', headline: 'continua ancora per 25 minuti con un timer, poi fai una pausa vera di 5 minuti.', why: ['Un tempo definito rende il compito più leggero: sai già quando finisce.', 'Una pausa pianificata riposa più di una rubata.'], step: 'Scrivi in una riga cosa vuoi finire, avvia il timer e silenzia il telefono.' },
      pausa: { title: 'Pausa adesso', headline: 'fai una pausa di 15 minuti adesso: lontano dallo schermo, acqua, finestra aperta.', why: ['Dopo ore di fila la testa rende sempre meno: la pausa ti fa recuperare tempo.', 'Spesso la soluzione arriva quando smetti di cercarla.'], step: 'Timer da 15 minuti, telefono in un\'altra stanza, poi riparti dal punto più facile.' },
      inizia: { title: 'Cinque minuti per iniziare', headline: 'comincia con soli 5 minuti: apri il file e scrivi la prima riga.', why: ['Iniziare è la parte difficile; dopo cinque minuti spesso il resto scorre.', 'Se dopo cinque minuti vuoi smettere, hai comunque aperto la strada.'], step: 'Apri il documento adesso e scrivi la prima frase, anche brutta.' },
      chiudi: { title: 'Chiudo per stasera', headline: 'chiudi per stasera: ripassa solo i punti chiave e vai a dormire.', why: ['Di notte si impara meno e si fatica di più.', 'Il sonno aiuta a fissare quello che hai già studiato.'], step: 'Scrivi su un foglio le tre cose da riprendere domani, poi spegni la luce.' },
    },
  },
  faccende: {
    label: 'Faccende', example: 'Pulisco adesso o lascio stare?',
    ideas: {
      timer: { title: 'Dieci minuti, una stanza', headline: 'metti un timer da 10 minuti e fai una sola stanza: quando suona, sei libero di smettere.', why: ['Un tempo breve rende la fatica sopportabile.', 'Spesso, quando suona il timer, hai già voglia di finire.'], step: 'Scegli la stanza e avvia il timer adesso.' },
      'una-cosa': { title: 'Una cosa sola', headline: 'scegli una cosa sola, la più visibile, e falla adesso: il resto può aspettare.', why: ['Quando tutto sembra troppo, una cosa fatta toglie peso.', 'Vedere un angolo in ordine dà energia per il resto.'], step: 'Guardati intorno, scegli l\'oggetto o l\'angolo che ti dà più fastidio e sistemalo.' },
      musica: { title: 'Con la mia musica', headline: 'metti la tua musica preferita e fai per prima la cosa che ti pesa di più.', why: ['La musica rende il tempo più leggero.', 'Togliere subito la cosa più pesante fa sembrare facile il resto.'], step: 'Scegli una playlist da 20 minuti e comincia dalla cosa che rimandi da più tempo.' },
      stasera: { title: 'Stasera lascio stare', headline: 'stasera lascia stare: sistema solo le cose che servono domani mattina.', why: ['Quando sei stanco, le faccende pesano il doppio.', 'Domani, riposato, le fai in metà del tempo.'], step: 'Preparati i vestiti e lascia la cucina pronta per la colazione.' },
    },
  },
  regalo: {
    label: 'Un regalo', example: 'Che regalo faccio per il compleanno di un\'amica?',
    ideas: {
      ascolto: { title: 'Qualcosa che ha detto', headline: 'scegli qualcosa che dimostri che hai ascoltato: una cosa che la persona ha nominato, anche di passaggio, negli ultimi mesi.', why: ['Un regalo che ricorda una frase detta tempo fa fa sentire visti.', 'Non serve spendere molto: serve che sia pensato per lei o per lui.'], step: 'Ripensa a una frase con «vorrei» o «mi piacerebbe» e cerca da lì.' },
      esperienza: { title: 'Un momento insieme', headline: 'regala un momento: una cena insieme, un biglietto per qualcosa, una giornata pensata per la persona.', why: ['Quando una persona ha già tutto, il tempo insieme è ciò che manca.', 'I ricordi restano più degli oggetti.'], step: 'Scegli una data e scrivila su un biglietto da consegnare il giorno del compleanno.' },
      scritto: { title: 'Biglietto e piccolo gesto', headline: 'un biglietto scritto a mano con un ricordo vero, accompagnato da una piccola cosa che la persona ama.', why: ['Un ricordo scritto bene vale più di un oggetto costoso.', 'Con poco budget il pensiero fa tutta la differenza.'], step: 'Scrivi tre righe su un momento condiviso e aggiungi il suo dolce o fiore preferito.' },
      piccolo: { title: 'Piccolo e condiviso', headline: 'qualcosa di piccolo da condividere: un dolce, un buon caffè, un fiore.', why: ['Un gesto semplice è perfetto quando il legame è professionale o di vicinato.', 'Una cosa da condividere mette tutti a proprio agio.'], step: 'Scegli un prodotto locale e aggiungi un biglietto con il tuo nome.' },
    },
  },
  sonno: {
    label: 'Riposo', example: 'Vado a letto o guardo ancora una puntata?',
    ideas: {
      letto: { title: 'Vado a dormire', headline: 'vai a dormire: la storia non scappa, domani la ritrovi uguale.', why: ['Il sonno migliora quasi tutto il giorno dopo, dall\'umore alla pazienza.', 'Una puntata in più stasera spesso diventa stanchezza domani.'], step: 'Metti il telefono in carica fuori dal letto e spegni la luce entro 15 minuti.' },
      capitolo: { title: 'Un ultimo capitolo', headline: 'ancora un capitolo, poi spegni: decidi adesso il punto in cui ti fermi.', why: ['Un limite deciso prima è più facile da rispettare.', 'Leggere rilassa più di uno schermo luminoso.'], step: 'Scegli il capitolo dove ti fermi e metti un segno nel libro.' },
      sveglia: { title: 'Alzo alla prima sveglia', headline: 'alzati alla prima sveglia e tieni il telefono lontano dal letto.', why: ['Rimandare la sveglia spezza il sonno in pezzi piccoli e di solito non riposa di più.', 'Cominciare la giornata con un gesto deciso dà il tono a tutto il resto.'], step: 'Stasera sposta la sveglia dall\'altra parte della stanza.' },
      riposino: { title: 'Un riposino breve', headline: 'sì al riposino, ma breve: 20 minuti con la sveglia.', why: ['Un riposino breve ricarica senza far arrivare il sonno profondo.', 'Se dura troppo, ti alzi più stordito di prima.'], step: 'Metti la sveglia a 20 minuti, chiudi gli occhi e non pensare alla lista delle cose da fare.' },
    },
  },
  guardo: {
    label: 'Serata sul divano', example: 'Che film guardo stasera?',
    ideas: {
      comfort: { title: 'Qualcosa che amo già', headline: 'rivedi qualcosa che ami già: stasera non serve scoprire, serve stare bene.', why: ['Le storie che conosci ti fanno stare bene senza fatica.', 'Non sprechi la serata a scegliere.'], step: 'Apri il titolo che ti viene in mente per primo e premi play.' },
      nuovo: { title: 'Una novità, con una regola', headline: 'scegli in 5 minuti: apri tre titoli, tieni il primo che ti incuriosisce e dagli una chance di 20 minuti.', why: ['Con una regola scegliere diventa un gioco e non un problema.', 'Se dopo 20 minuti non ti prende, cambi senza problemi.'], step: 'Avvia un timer da 5 minuti per scegliere e rispettalo.' },
      leggere: { title: 'Un libro', headline: 'un libro: leggi per 20 minuti, e se non ti prende, cambia.', why: ['Leggere la sera calma la testa meglio dello scorrere sul telefono.', 'Venti minuti bastano per capire se un libro fa per te.'], step: 'Metti il telefono in un\'altra stanza e leggi due pagine.' },
      leggero: { title: 'Qualcosa di leggero', headline: 'una commedia o una serie a episodi brevi: leggero e senza pensieri.', why: ['Quando sei stanco il corpo chiede storie facili.', 'Gli episodi brevi si fermano quando vuoi.'], step: 'Scegli un titolo allegro e metti un limite: due episodi, poi a letto.' },
      insieme: { title: 'Da guardare insieme', headline: 'scegli un film che piaccia a tutti: chi propone sceglie, ma si vota tra due.', why: ['Una regola semplice evita la discussione sul telecomando.', 'Guardare insieme è parte del piacere.'], step: 'Ognuno propone un titolo e si vota subito, senza rimettere in discussione.' },
    },
  },
};

// Consigli sulle scelte più grandi: «un esperimento piccolo» invece di una verità. Per categoria del motore a evidenze.
export const BIG_ADVICE = {
  lavoro: { headline: 'prima di decidere, fai un piccolo esperimento: parla con una persona che fa il lavoro che ti attrae, o chiedi un colloquio esplorativo.', why: ['Cambiare è più facile da valutare quando hai informazioni di prima mano.', 'Un caffè o un colloquio non ti impegnano: ti mostrano cosa c\'è oltre la porta.'], step: 'Questa settimana scrivi a una persona che fa quel lavoro: «Posso farti due domande?»' },
  trasloco: { headline: 'prova prima il posto: un fine settimana lungo là, vivendolo come un residente, non come un turista.', why: ['Un posto si capisce dalle giornate ordinarie, non dalle foto.', 'Decidere dopo averlo vissuto toglie metà dei dubbi.'], step: 'Prenota un fine settimana, fai la spesa, prendi i mezzi e guarda come ti senti il lunedì.' },
  relazioni: { headline: 'dì quello che senti in modo semplice e senza pretese, di persona o con una telefonata, quando entrambi siete tranquilli.', why: ['Dirlo con calma è un regalo anche per l\'altra persona: sa cosa pensi.', 'Non serve il discorso perfetto: bastano due frasi vere.'], step: 'Scrivi le due frasi che vuoi dire, leggile ad alta voce e scegli il momento.' },
  studio: { headline: 'prova un assaggio: una lezione aperta, un corso breve o una chiacchierata con chi ci è già dentro.', why: ['Dall\'esterno uno studio sembra diverso da come lo si vive.', 'Un assaggio costa poco e ti dà informazioni vere.'], step: 'Cerca una lezione aperta o scrivi a una persona che ha fatto quel percorso.' },
  impresa: { headline: 'parti in piccolo, mentre hai ancora un\'entrata: un primo cliente o una prima vendita, prima di cambiare tutto.', why: ['Un primo cliente ti dice più di mille piani.', 'Partire in piccolo ti lascia margine per imparare.'], step: 'Scrivi in una riga cosa offri e a chi, e cerca il primo cliente nelle prossime due settimane.' },
  acquisto: { headline: 'aspetta qualche giorno e fissa un tetto di spesa: confronta almeno due alternative prima di decidere.', why: ['Per acquisti importanti il tempo è una risorsa che ti lavora a favore.', 'Con un tetto deciso a mente fredda scegli meglio.'], step: 'Scrivi la cifra massima e due alternative, poi riprendi la decisione tra tre giorni.' },
  salute: { headline: 'parti da una versione ridicolmente piccola, da oggi: 10 minuti, non il piano perfetto di lunedì.', why: ['Un\'abitudine nasce dalla ripetizione, non dall\'intensità.', 'Cominciare oggi, in piccolo, batte cominciare lunedì in grande.'], step: 'Scegli un\'azione da 10 minuti e fissa l\'ora in cui la farai domani.' },
  casa: { headline: 'scrivi cosa ti serve davvero nei prossimi anni, poi fai fare un conto serio a un consulente indipendente.', why: ['Una scelta di casa è grande: conviene guardarla con numeri veri e con te stesso.', 'Chiarire cosa ti serve rende il confronto tra le strade molto più semplice.'], step: 'Elenca tre cose indispensabili e tre che sono solo belle da avere, poi prenota una consulenza.' },
  amicizia: { headline: 'scrivi tu: un messaggio breve e caldo, senza aspettarti nulla in cambio.', why: ['Chi riceve un messaggio simile di solito è contento che qualcuno abbia fatto il primo passo.', 'Un legame si riaccende con un gesto piccolo, non con un discorso lungo.'], step: '«Ti ho pensato oggi, come stai?» Invia e lascia la porta aperta.' },
  altruismo: { headline: 'comincia con un\'ora, non con un impegno: prova un\'attività vicino a casa e vedi come ti senti.', why: ['Provare un\'ora ti dice più di tante riflessioni.', 'Puoi sempre aumentare dopo, se ti fa stare bene.'], step: 'Cerca un\'associazione vicino a te e chiedi come si fa a provare per un\'ora.' },
};

// Metodi per qualsiasi decisione scritta liberamente (quando non c'è un consiglio su misura).
// {a} e {b} sono le opzioni dell'utente, se le ho capite.
export const METHODS = {
  reversibile: { headline: 'scegli la strada che puoi cambiare più facilmente, e fai oggi un primo passo piccolo.', why: ['Quando una scelta si può correggere, provare costa poco e insegna molto.', 'Un primo passo piccolo ti dà informazioni vere, più di mille pensieri.'], step: 'Scrivi su un foglio cosa cambierebbe tra una settimana con «{a}» e con «{b}»: tieni la strada che ti fa respirare meglio.', stepSolo: 'Scrivi su un foglio il primo passo più piccolo possibile e fallo oggi o domani; se non ne trovi uno, aspetta e rileggi domani.' },
  sonno: { headline: 'non decidere adesso: dormici sopra e rispondi domattina con la prima cosa che ti viene in mente.', why: ['Una testa riposata vede più strade di una stanca.', 'Se la prima risposta del mattino ti dà sollievo, vale la pena ascoltarla.'], step: 'Scrivi la domanda su un foglio, mettilo vicino al letto e domattina scrivi sotto la prima risposta.' },
  persona: { headline: 'parlane con una persona di cui ti fidi: dirlo ad alta voce chiarisce più di mille pensieri.', why: ['Spiegare una scelta a qualcuno ti fa capire cosa conta davvero.', 'Chi ti conosce vede cose che tu, da dentro, non vedi.'], step: 'Scegli oggi chi, e scrivi: «Ho una decisione da prendere, mi ascolti per dieci minuti?»' },
  moneta: { headline: 'tira una moneta, ma guarda come ti senti mentre è in aria: spesso sai già cosa speri esca.', why: ['Non conta cosa dice la moneta, conta cosa speri mentre gira.', 'Ti aiuta a sentire una preferenza che i ragionamenti coprono.'], step: 'Testa è la prima strada, croce la seconda: prima che cada, nota cosa speri.' },
};

export const UI_NOTES = {
  daily: 'Un consiglio di buon senso, senza statistiche: tu conosci cose che io non so.',
  big: 'Un consiglio di metodo: non conosco i dettagli della tua vita. Per le fonti e il quadro nel tempo, guarda le strade qui sotto.',
  general: 'Non conosco i dettagli della tua situazione: questo è un consiglio di metodo, che puoi adattare.',
};

// Le due (o tre) versioni della giornata: etichetta breve, tre scene (tra 1 ora · stasera · domani mattina), tre stati d'animo.
// Scene vivide e brevi, non previsioni: mostrano una versione possibile.
export const SCENES = {
  'cena.pasta': ['semplice e calda', ['L\'acqua bolle, la cucina profuma di aglio: hai già deciso senza accorgertene.', 'Una ciotola fumante sul tavolo, pochi piatti nel lavello e la serata ancora tutta tua.', 'Mattina leggera: niente da riordinare e il resto della pasta pronto per pranzo.'], ['concreto', 'al caldo', 'leggero']],
  'cena.frigo': ['con quello che hai', ['La padella sfrigola e il frigo, finalmente, ha un po\' di spazio.', 'Una cena inventata sul momento, e un po\' di orgoglio per non aver sprecato niente.', 'Il frigo più ordinato e la spesa di domani più corta.'], ['ingegnoso', 'soddisfatto', 'ordinato']],
  'cena.veloce': ['senza fatica', ['Dieci minuti e sei già a tavola, senza aver spostato mezza cucina.', 'La stanchezza si scioglie sul divano con qualcosa di caldo nello stomaco.', 'Dormito bene e voglia di cucinare qualcosa di più bello stasera.'], ['sollevato', 'rilassato', 'riposato']],
  'cena.ordina': ['pausa dai fornelli', ['Hai scelto in un minuto e il telefono fa il resto: cinque minuti di attesa.', 'Si apre la scatola, la tavola è apparecchiata e per una volta nessuno lava niente.', 'Mattina senza pentole nel lavello.'], ['libero', 'coccolato', 'tranquillo']],
  'cena.ospiti': ['tavola grande', ['La teglia è in forno e tu sei ancora in tempo per cambiarti e mettere la musica.', 'Gli ospiti ridono, la teglia gira di mano in mano e tu non sei mai in cucina.', 'Qualche messaggio di ringraziamento e la sensazione di una bella serata.'], ['organizzato', 'presente', 'contento']],
  'cena.zuppa': ['calda e semplice', ['Un soffritto che profuma di casa e la pioggia, fuori, sembra più lontana.', 'Una ciotola calda tra le mani: è esattamente quello che serviva.', 'Il resto della zuppa, ancora più buono, ti aspetta per pranzo.'], ['al riparo', 'coccolato', 'previdente']],
  'cena.fresco': ['fresca e senza fornelli', ['Il riso è nell\'acqua fredda e la cucina non si trasforma in una sauna.', 'Una cena fresca, una finestra aperta, nessuna fretta.', 'La parte avanzata è già pronta per un pranzo leggero.'], ['fresco', 'tranquillo', 'comodo']],
  'cena.leggero': ['chiara e leggera', ['Verdure in forno e profumo di erbe: la cucina è in ordine.', 'Un piatto colorato, leggero, che lascia energia per quello che farai dopo.', 'Ti svegli leggero e con la testa libera.'], ['lucido', 'soddisfatto', 'energico']],

  'serata.esci-poco': ['un\'ora e poi si vede', ['Sei già fuori: la parte più difficile è già alle spalle.', 'Dopo un\'ora, o te ne vai con la coscienza a posto, o resti perché ti sta piacendo.', 'Una serata raccontata in due frasi, e la sensazione di aver fatto qualcosa.'], ['incuriosito', 'leggero', 'soddisfatto']],
  'serata.resta': ['serata lenta', ['Il telefono è in un\'altra stanza e il divano ti accoglie.', 'Una cena che ami, una coperta, una cosa bella da guardare: la sera è tua.', 'Mattina riposata, con più pazienza per tutti.'], ['al sicuro', 'rilassato', 'riposato']],
  'serata.esci-vai': ['in buona compagnia', ['Ti stai preparando e ti accorgi che sorridi.', 'Risate, una chiacchierata che non ti aspettavi, il tempo che vola.', 'Un po\' di stanchezza buona e un ricordo da conservare.'], ['carico', 'vivo', 'grato']],

  'messaggio.scrivi': ['una riga gentile', ['Premi invia e il cuore va un po\' più veloce, poi si calma.', 'Il telefono vibra, oppure no: in ogni caso hai fatto il gesto.', 'Una risposta arrivata nella notte, o la serenità di aver aperto la porta.'], ['coraggioso', 'in attesa', 'sereno']],
  'messaggio.aspetta': ['una notte di pausa', ['Scrivi tutto nelle note, e già le parole sembrano meno taglienti.', 'La notte mette ordine: ti addormenti con la testa un po\' meno piena.', 'Rileggi la mattina: cambi due parole, oppure decidi di non mandare niente.'], ['agitato', 'più calmo', 'lucido']],
  'messaggio.scusa': ['una scusa breve', ['Scrivi la frase vera, senza «ma» e senza spiegazioni, e premi invia.', 'Hai fatto la tua parte; adesso lasci all\'altra persona il tempo che le serve.', 'Più leggerezza al risveglio, qualunque cosa sia arrivata nel frattempo.'], ['teso', 'più leggero', 'in pace']],
  'messaggio.rispondi': ['risposta semplice', ['Una riga e hai tolto il peso che stavi portando da ore.', 'Dall\'altra parte arriva un sorriso, o un\'emoji: va bene così.', 'Conversazione di nuovo aperta e un pensiero in meno.'], ['sollevato', 'tranquillo', 'leggero']],
  'messaggio.chiama': ['due minuti di voce', ['Squilla e per due secondi non sai cosa dire; poi parte la voce.', 'Bastano due minuti: i malintesi che il testo faceva crescere si sciolgono.', 'Il giorno dopo ti viene da sorridere ripensando alla telefonata.'], ['teso', 'sciolto', 'contento']],

  'outfit.comodo': ['a proprio agio', ['Ti guardi allo specchio e per una volta non cambi niente.', 'Ti muovi senza pensare ai vestiti, e il dettaglio che hai scelto fa sorridere qualcuno.', 'Appendi tutto già pronto per un\'altra volta.'], ['a mio agio', 'sicuro', 'ordinato']],
  'outfit.lavoro': ['sobrio e sicuro', ['Pulito, sobrio, in ordine: esci di casa senza ripensamenti.', 'Per tutta la giornata non ti tocchi il colletto nemmeno una volta.', 'La mattina dopo sai già cosa mettere.'], ['composto', 'presente', 'preparato']],
  'outfit.appuntamento': ['semplicemente sicuro', ['Sorridi allo specchio, prendi le chiavi ed esci.', 'Ti senti te stesso, e si sente anche nel modo in cui parli.', 'Ripensi alla serata e ti ricordi le conversazioni, non gli abiti.'], ['sicuro', 'naturale', 'sereno']],
  'outfit.strati': ['a strati', ['Una giacca che ripara e un maglione che puoi togliere: sei pronto a tutto.', 'Dentro fa caldo, fuori freddo: ti adatti senza pensarci.', 'Asciutto e caldo anche al ritorno.'], ['al riparo', 'a mio agio', 'asciutto']],
  'outfit.leggero': ['leggero e chiaro', ['Il cotone sulla pelle e le scarpe giuste: il caldo pesa meno.', 'Cammini tutta la sera senza pensare ai piedi.', 'Giornata fresca e vestiti facili da lavare.'], ['fresco', 'comodo', 'leggero']],
  'outfit.festa': ['un pezzo speciale', ['Il pezzo speciale è già sulla sedia: il resto è semplice.', 'Si vede, ti guardano, e tu balli senza pensare a niente.', 'Ritorni con la stanchezza buona di una bella festa.'], ['speciale', 'libero', 'felice']],

  'palestra.piccola': ['venti minuti e basta', ['Scarpe ai piedi, timer avviato: la parte difficile è già andata.', 'Hai fatto venti minuti, e magari dieci in più: il corpo ringrazia.', 'Ti svegli con la sensazione di aver mantenuto una piccola promessa.'], ['avviato', 'orgoglioso', 'in ritmo']],
  'palestra.adesso': ['subito', ['Borsa in mano, casa alle spalle: sei già in strada.', 'La doccia dopo l\'allenamento e la sera che comincia con una marcia in più.', 'Mattina con un po\' di energia in più.'], ['deciso', 'carico', 'energico']],
  'palestra.riposo': ['un giorno di pausa', ['Divano o passeggiata lenta: il corpo ha il tempo di recuperare.', 'La serata scorre morbida, e domani ripartirai con più forza.', 'Muscoli rilassati e voglia di tornare ad allenarti.'], ['tranquillo', 'rilassato', 'riposato']],
  'palestra.domani': ['domani, con un orario', ['La borsa è pronta e la sveglia è impostata.', 'La sera passa senza il peso del «dovrei», perché hai già deciso.', 'La sveglia suona e sai già cosa fare, senza trattare.'], ['organizzato', 'leggero', 'determinato']],

  'compra.aspetta': ['una notte per pensarci', ['Hai salvato l\'oggetto e chiuso l\'app: il respiro si fa più lento.', 'La voglia si è già calmata di un po\' e vedi meglio cosa ti serve.', 'Al risveglio sai se lo vuoi ancora: la risposta è tua, senza fretta.'], ['impaziente', 'più calmo', 'chiaro']],
  'compra.compra': ['una cosa che serve', ['Hai confrontato due negozi, scelto e premuto acquista.', 'Una cosa in meno a cui pensare e un problema in meno da risolvere.', 'La usi senza ripensarci: era la scelta giusta per te.'], ['deciso', 'tranquillo', 'soddisfatto']],
  'compra.gia-ho': ['uso quello che ho', ['Chiudi il negozio online e apri il cassetto: quello che hai ancora funziona.', 'Un po\' di soldi restano dove stanno, e questo dà una strana tranquillità.', 'Tra qualche settimana sai davvero se manca qualcosa.'], ['sobrio', 'tranquillo', 'consapevole']],
  'compra.budget': ['con un tetto', ['Scrivi una cifra massima nelle note: ora hai un limite chiaro.', 'Cercando dentro il limite trovi un\'alternativa che non avevi considerato.', 'Il conto è sereno, la scelta è tua.'], ['organizzato', 'concentrato', 'sereno']],

  'weekend.fuori': ['senza programma', ['Scarpe ai piedi e una direzione a caso: la giornata è già cominciata.', 'Un posto nuovo, un caffè, il tempo che scorre a modo suo.', 'Una stanchezza buona e qualche foto che ti fa sorridere.'], ['curioso', 'libero', 'pieno']],
  'weekend.persone': ['un caffè insieme', ['Hai inviato l\'invito: adesso, per un attimo, aspetti la risposta.', 'Due chiacchiere vere e il caffè che si fredda.', 'Un pensiero caldo al risveglio: ti ha fatto bene vederlo.'], ['aperto', 'vicino', 'grato']],
  'weekend.riposa': ['giornata lenta', ['Sveglia libera, nessun programma: solo una cosa da fare.', 'Un pasto buono e il tempo che passa senza la voglia di correre.', 'Lunedì parte con più pazienza.'], ['lento', 'rilassato', 'ricaricato']],
  'weekend.mani': ['qualcosa di concreto', ['Hai tirato fuori ricetta, matite o chiavi inglesi: qualcosa sta nascendo.', 'Un primo risultato da guardare, e la noia sembra lontana.', 'Il giorno dopo guardi quello che hai fatto e sorridi.'], ['curioso', 'concentrato', 'orgoglioso']],
  'weekend.progetto': ['un progetto solo', ['Hai scritto il progetto in una riga e cominci dalla parte più facile.', 'Prima di pranzo è finito: il resto della giornata è libero.', 'Lunedì sai di aver tolto un peso dalla lista.'], ['concentrato', 'sollevato', 'leggero']],

  'focus.continua': ['25 minuti e una pausa', ['Il timer è avviato e il telefono a faccia in giù.', 'Hai finito la cosa che avevi scritto, e la pausa è davvero una pausa.', 'Ricominci con la testa più ordinata e un punto già raggiunto.'], ['concentrato', 'soddisfatto', 'in ritmo']],
  'focus.pausa': ['pausa vera', ['Finestra aperta, un bicchiere d\'acqua e lo schermo spento: la testa si allarga.', 'Quando torni, vedi il punto in cui eri bloccato con occhi diversi.', 'Il giorno dopo ricordi meglio quello che hai fatto.'], ['stanco', 'rinfrescato', 'lucido']],
  'focus.inizia': ['cinque minuti', ['Il documento è aperto e la prima frase c\'è, anche se non è bellissima.', 'Dopo qualche minuto scorri senza accorgertene: il resto viene da sé.', 'Una cosa in meno da portare con te domani.'], ['bloccato', 'in moto', 'alleggerito']],
  'focus.chiudi': ['stop per stasera', ['Hai scritto le tre cose da riprendere e spento la lampada.', 'La testa si ferma e il sonno arriva senza fatica.', 'Mattina fresca: ripassi i punti chiave e li ricordi meglio.'], ['stanco', 'in pace', 'riposato']],

  'faccende.timer': ['dieci minuti', ['Il timer parte e tu scegli una sola stanza: musica in sottofondo.', 'Quando suona, la stanza è già un\'altra: puoi fermarti con soddisfazione.', 'Rientri la mattina in un ambiente più chiaro.'], ['deciso', 'orgoglioso', 'sollevato']],
  'faccende.una-cosa': ['una cosa sola', ['Scegli l\'angolo che ti dà più fastidio e lo sistemi in dieci minuti.', 'Ti guardi intorno: una cosa sola in ordine cambia il colore della stanza.', 'Il giorno dopo ti viene voglia di fare anche il resto.'], ['alleggerito', 'più chiaro', 'motivato']],
  'faccende.musica': ['con la mia musica', ['Una playlist e la cosa che rimandi da più tempo.', 'Il tempo passa più in fretta e alla fine batti il piede a ritmo.', 'La lista delle cose da fare è più corta.'], ['carico', 'in ritmo', 'soddisfatto']],
  'faccende.stasera': ['stasera lascio stare', ['Sistemi solo quello che serve domani mattina e poi ti siedi.', 'Una sera senza lista in testa: il corpo ringrazia.', 'La mattina dopo la cucina è ordinata e la colazione già pronta.'], ['stanco', 'in pace', 'organizzato']],

  'regalo.ascolto': ['una cosa che ha detto', ['Ripensi a una frase di mesi fa e capisci già cosa cercare.', 'Lo incarti con cura e immagini il suo viso mentre lo apre.', 'La sua faccia mentre lo apre: ti ha ascoltato, e lo vede.'], ['ispirato', 'attento', 'felice']],
  'regalo.esperienza': ['un momento insieme', ['Scegli una data sul calendario e ti viene già da sorridere.', 'Scrivi il biglietto: un tempo insieme come regalo.', 'Una serata che resterà nei ricordi più degli oggetti.'], ['entusiasta', 'concentrato', 'felice']],
  'regalo.scritto': ['un biglietto e un gesto', ['Carta e penna: ti vengono in mente tre ricordi veri.', 'Aggiungi il suo dolce preferito: il pacchetto è semplice e bellissimo.', 'Il biglietto finisce in un cassetto, e ci rimane a lungo.'], ['sentimentale', 'creativo', 'commosso']],
  'regalo.piccolo': ['piccolo e condiviso', ['Un dolce locale, un fiore, un biglietto con il tuo nome.', 'Lo offri con un sorriso e il clima si scalda.', 'Un grazie gentile, e un buon ricordo di te.'], ['semplice', 'gentile', 'a posto']],

  'sonno.letto': ['a letto presto', ['Il telefono è in carica fuori dal letto e la luce si spegne.', 'Il sonno arriva presto e la storia può aspettare.', 'Ti svegli con la testa chiara e un po\' di curiosità per la puntata di domani sera.'], ['stanco', 'cullato', 'riposato']],
  'sonno.capitolo': ['un ultimo capitolo', ['Il segno è nel libro: fermarti è già deciso.', 'Poche pagine, poi la luce si spegne con dolcezza.', 'Mattina morbida, con la storia che ti aspetta.'], ['calmo', 'rilassato', 'riposato']],
  'sonno.sveglia': ['alla prima sveglia', ['Hai spostato la sveglia lontano dal letto: domani mattina dovrai alzarti.', 'Ti addormenti sapendo che il primo suono è quello giusto.', 'Il primo suono e già in piedi: la giornata comincia con un gesto deciso.'], ['deciso', 'tranquillo', 'in moto']],
  'sonno.riposino': ['venti minuti', ['Occhi chiusi e sveglia a venti minuti: il pensiero si spegne.', 'Ti rialzi più leggero e la sera non ti pesa.', 'Hai dormito bene anche la notte.'], ['stanco', 'ricaricato', 'riposato']],

  'guardo.comfort': ['una storia che conosco', ['Premi play su qualcosa che già ami e il corpo si rilassa.', 'Le battute che sai a memoria ti fanno sorridere come la prima volta.', 'Ti addormenti di buon umore.'], ['rilassato', 'coccolato', 'sereno']],
  'guardo.nuovo': ['con una regola', ['Hai aperto tre titoli e il timer di cinque minuti corre.', 'Ne hai scelto uno: dopo venti minuti sai già se fa per te.', 'Hai un titolo nuovo di cui parlare con qualcuno.'], ['curioso', 'coinvolto', 'soddisfatto']],
  'guardo.leggere': ['un libro', ['Telefono in un\'altra stanza, due pagine lette: la testa rallenta.', 'La storia ti prende e il tempo si ferma.', 'Mattina con la voglia di tornare a quelle pagine.'], ['calmo', 'assorbito', 'sereno']],
  'guardo.leggero': ['qualcosa di leggero', ['Una commedia e una coperta: niente da pensare.', 'Le risate ti sciolgono, due episodi e basta.', 'Dormi bene, con ancora un sorriso.'], ['stanco', 'allegro', 'riposato']],
  'guardo.insieme': ['da guardare insieme', ['Ognuno propone un titolo e si vota subito.', 'Divano pieno, popcorn, qualcuno che ride troppo forte.', 'Il giorno dopo vi citate le battute.'], ['complice', 'allegro', 'felice']],
};

export const HZ_LABELS = { h1: ['Tra 1 ora', 'Tra 1 ora', 'Tra un\'ora'], sera: ['Stasera', 'Stasera', 'Stasera'], dom: ['Domani mattina', 'Domani mattina', 'Domani mattina'] };
export const DAILY_SIGNS = {
  h1: 'Nota quanto ti pesa (o ti pesava) la decisione, adesso che l\'hai presa.',
  sera: 'Nota un momento di questa serata in cui sei stato bene.',
  dom: 'Nota come ti senti stamattina, rispetto a ieri sera.',
};
export const CHECKIN = {
  q: 'Com\'è andata?',
  good: 'Bene', ok: 'Così così', skip: 'Non l\'ho fatto',
  good_r: 'Mi fa piacere. Ricorda cosa ti ha fatto stare bene: la prossima volta sceglierai ancora più in fretta.',
  ok_r: 'Va bene così. Una scelta non deve essere perfetta per essere stata utile: ti insegna qualcosa su di te.',
  skip_r: 'Succede, e nessuna strada si chiude: puoi sceglierne una nuova adesso.',
};

// altre categorie di ogni giorno
import { MORE_TEXT, MORE_SCENES } from './more-it.js';
Object.assign(DAILY_TEXT, MORE_TEXT);
Object.assign(SCENES, MORE_SCENES);
