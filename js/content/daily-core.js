// Scelte di ogni giorno: parole-chiave e indizi NEUTRI rispetto alla lingua (IT+EN insieme).
// I testi dei consigli stanno in daily-it.js / daily-en.js, con gli stessi id.
// Tutti i testi del consiglio sono qualitativi: nessuna statistica, nessuna cifra se non un timer ("15 minuti").
// Le regex lavorano su testo minuscolo SENZA accenti.

import { MORE, MORE_ORDER } from './more-core.js';

export const DAILY_ORDER = ['cena', 'serata', 'messaggio', 'outfit', 'palestra', 'compra', 'weekend', 'focus', 'faccende', 'regalo', 'sonno', 'guardo'];

export const DAILY = {
  cena: {
    color: '#ffb84d',
    re: /cucin\w*|\bcena\b|cenare|pranz\w*|ricett\w*|mangiar\w*|\bmangio\b|\bpiatto\b|cook\w*|dinner|lunch|recipe|takeaway|takeout|delivery|ordin\w* (la |una |del )?(pizza|sushi|cibo)|order (in|food|pizza|sushi)|\bpizza\b|sushi|\buova\b|\beggs?\b|spinac\w*|spinach|spaghett\w*|\baglio\b|insalata|what can i make|make with|\bzupp\w*|minestr\w*|risotto|\bpasta\b|frittata|\bsoup\b|chicken|\bpollo\b|zucchin\w*|cosa mangiamo|what (are we|shall we) eat|cosa si mangia|what (to )?eat|what should i (eat|cook)/g,
    not: /abitudin|dieta per|per sempre|habit\b|forever/,
    ideas: {
      pasta: { opt: /cucin\w*|\bcuocer\w*|\bcook\w*|pasta|\bhome\b|in casa|fare io|preparo|prepare/, w: 1 },
      frigo: { opt: /avanz\w*|frigo|leftover|fridge/, re: /avanz\w*|frigo|svuot\w*|leftover|fridge|nothing in|niente in casa/, w: 3 },
      veloce: { re: /stanc\w*|tardi|poco tempo|veloce|non ho voglia|quick|tired|\blate\b|no time|lazy|pigr\w*|esaust\w*|exhaust\w*/, w: 2 },
      ordina: { opt: /ordin\w*|pizza|sushi|delivery|takeaway|takeout|fuori|\border\b|ristorante|restaurant|mangio fuori|eat out/, re: /ordin\w*|\bpizza\b|sushi|delivery|takeaway|takeout|fuori|\border\b|restaurant|ristorante/, w: 3 },
      ospiti: { re: /ospit\w*|invit\w*|amici|guests?|friends|company|fidanzat\w*|partner|romantic|romantic\w*/, w: 3 },
      zuppa: { re: /freddo|pioggia|piove|inverno|\bcold\b|rain\w*|winter/, w: 3 },
      fresco: { re: /\bcaldo\b|estate|\bafa\b|\bhot\b|summer/, w: 3 },
      leggero: { re: /leggero|\bdieta\b|\blight\b|\bdiet\b|\blean\b/, w: 3 },
    },
  },
  serata: {
    color: '#a78bfa',
    re: /go out tonight|going out tonight|esco stasera|stasera esco|esco con i|recharge|rimanere a casa stasera|stay (in|home) (tonight|this evening)|stay at home tonight|\buscire\b|\besco\b|(resto|restare|stare|rimanere|rimango) (a|in) casa|a casa o|serata|aperitivo|\bfesta\b|go out|going out|stay home|stay in( tonight| this evening| today|[?.!,]|$)|night out|\bparty\b|casa o (esco|uscire|fuori)|discotec\w*|\bclub\b|\bbar\b|\bpub\b|clubbing|karaoke|concerto|concert|stay in with|meet (people|friends)|invited me out|mi hanno invitat\w*|invitato fuori|andare a (quella|una|la) festa|festa di (sabato|venerdi)|resto a casa/g,
    not: null,
    ideas: {
      'esci-poco': { opt: /\besc[oi]\b|uscire|go out|going out|\bout\b|fuori/, w: 1 },
      resta: { opt: /rest\w+|rimang\w*|rimaner\w*|stare a casa|stay|\bhome\b|\bin\b|divano|couch|a casa/, re: /stanc\w*|esaust\w*|sfinit\w*|settimana pesante|divano|riposo|\btired\b|exhaust\w*|\brest\b|couch|heavy week|burnt|burned|malat\w*|febbre|\bsick\b|non ho dormito|poco sonno/, w: 3 },
      'esci-vai': { opt: /\besc[oi]\b|uscire|go out|going out|\bout\b|fuori/, re: /amic\w*|invitat\w*|festa|compleanno|da tempo|mancano|friends|party|invited|birthday|haven t seen|\bmiss\b|ho voglia|i want to|voglia di uscire/, w: 3 },
    },
  },
  messaggio: {
    color: '#f472b6',
    re: /scriver\w*(gli|le|ci|lo|la)\b|\bscrivo\b|scriverg\w*|messagg\w*|rispond\w*|chiamar\w*|\bchiamo\b|\btext (him|her|them|back|first)\b|\btext\b|ci sentiamo|\brichiam\w*|call (him|her|them) back|call back|\bmessage\b|\breply\b|call (him|her|them)|whatsapp|\bdm\b|farmi sentire|visualizzat\w*|left on read|\bscus\w*|sorry|apolog\w*/g,
    not: /innamor|ti amo|lo amo|la amo|amore|dirgli quello che provo|dirle quello che provo|tell (him|her) (how|what) i feel|vecchio amic|vecchia amic|old friend|riconcili/,
    ideas: {
      scrivi: { opt: /scriv\w*|\bmanda\w*|\binvi\w*|text|write|send|messagg\w*/, w: 1 },
      aspetta: { opt: /aspett\w*|attend\w*|\bwait\w*|lascio stare|non scriv\w*|non mando|\bhold\b|\bsleep on\b/, re: /arrabbiat\w*|nervos\w*|litig\w*|furios\w*|rabbia|offes\w*|\bex\b|angry|upset|\bfight\b|argu\w*|furious|\bmad\b|ubriac\w*|drunk|stanotte|late at night|notte/, w: 3 },
      chiama: { opt: /chiam\w*|\bcall\b|telefon\w*|\bphone\b/, re: /\bchiam\w*|\bcall\b|\bvoce\b|parlar\w*|voice/, w: 2 },
      rispondi: { opt: /rispond\w*|\breply\b|\banswer\b/, re: /\brisposto\b|\brispond\w*|\breply\b|\banswer\b|visualizzat\w*|left on read|ritardo|\bseen\b/, w: 2 },
      scusa: { opt: /scus\w*|sorry|apolog\w*/, re: /\bscus\w*|perdon\w*|sorry|apolog\w*|forgive/, w: 3 },
    },
  },
  outfit: {
    color: '#f9a8d4',
    re: /\bjeans\b|\bskirt\b|\bgonna\b|pantaloni|trousers|\bshirt\b|vestit\w*|\bindoss\w*|\bmetto (la|il|i|le) (giacca|maglione|camicia|vestito|gonna)|outfit|abbigliament\w*|giacca|camicia|scarpe|tacchi|sneakers?|stivali|\bboots\b|sandali|sandals|\bheels\b|cravatta|cappotto|\bcoat\b|maglione|sweater|\bjumper\b|\babito\b|completo elegante|\bsuit\b|gonna|pantalon\w*|\bwear\b|cosa (mi )?metto|che (mi )?metto|what to put on|what to wear|\bdress\b|jacket|shoes|\bshirt\b|\blook\b|\babito\b/g,
    not: null,
    ideas: {
      comodo: { opt: /comod\w*|casual|jeans|tuta|comfort\w*/, w: 1 },
      lavoro: { opt: /formal\w*|elegant\w*|giacca|camicia|jacket|\bsuit\b|work/, re: /colloquio|lavoro|ufficio|riunione|presentazione|interview|office|meeting|presentation|\bwork\b/, w: 3 },
      appuntamento: { opt: /elegant\w*|vestito|\bdress\b|bello|nice/, re: /appuntamento|primo incontro|cena fuori|\bdate\b|romantic\w*|fidanzat\w*|first date/, w: 3 },
      strati: { re: /piov\w*|freddo|neve|vento|\brain\b|\bcold\b|snow|\bwind\b/, w: 3 },
      leggero: { re: /\bcaldo\b|\bafa\b|estate|\bhot\b|summer/, w: 3 },
      festa: { re: /festa|matrimonio|cerimonia|\bparty\b|wedding|ceremony|evento/, w: 3 },
    },
  },
  palestra: {
    color: '#4fd1c5',
    re: /palestra|\bgambe\b|\bbraccia\b|leg day|addominali|cardio|\bpesi\b|weights|\bnuoto\b|\bpilates\b|crossfit|allenament\w*|allenar\w*|\bcorrere\b|\bcorsa\b|workout|work out|working out|\bmi alleno\b|\balleno\b|allenarmi|\bcorro\b|jog\w*|\bgym\b|\brun\b|running|training|yoga|nuotare|piscina|\bsport\b|esercizio|stretching|fitness/g,
    not: /abitudin|iniziare|inizio|partire|cominciare|smettere|dieta\b|habit|\bstart\b|begin|\bquit\b|per sempre|forever|new routine/,
    ideas: {
      piccola: { opt: /poco|breve|\bshort\b|veloce|\bquick\b|solo (un|20|dieci)/, w: 2 },
      adesso: { opt: /adesso|\bora\b|\bnow\b|subito|oggi|today|\bgo\b|palestra|\bgym\b|workout|allen\w*|correre|\brun\b/, re: /energia|\bcarico\b|ho tempo|motivat\w*|energy|motivated|feel good|ho voglia|adesso|\bora\b|\bnow\b/, w: 1.6 },
      riposo: { opt: /riposo|riposar\w*|\brest\b|salto|\bskip\b|non vado|do not go|pausa|passeggiata|\bwalk\b|divano|couch|sofa/, re: /stanc\w*|dolore|\bmale\b|febbre|non ho dormito|influenza|\bsick\b|tired|\bpain\b|\bsore\b|injur\w*|fever|exhaust\w*|poco sonno|dolorant\w*/, w: 4 },
      domani: { opt: /domani|tomorrow|\bdopo\b|\blater\b|lunedi|monday/, re: /domani|tomorrow|\bdopo\b|\blater\b|piove|\brain\b/, w: 1.5 },
    },
  },
  compra: {
    color: '#fbbf24',
    re: /compr\w*|acquist\w*|amazon|\bordino (quel|quell|la|il|un)|cuffie|zalando|ebay|mi serve (davvero |proprio )?(un|una|altro|altra)\b|do i (really )?need (a|an|another|new)|altro paio|another pair|\bprendere\b|lo prendo|\bsaldi\b|sconto|offerta|carrello|ordin\w* (online|su amazon)|worth the (price|money)|worth it|\bprice\b|il prezzo|in saldo|on sale|in offerta|black friday|cyber monday|nuovo o usato|new or used|usato o nuovo|aspetto (il|i|le) (saldi|sconti|black friday|offerte)|\bbuy\w*|purchase|order it|\bsale\b|discount|\bcart\b|worth (it|buying)|vale la pena|\bspendere\b|\bspend (some |all |my |more |less )?(money|cash|\d|euro|dollar)|\bspend on\b/g,
    not: /accettare l offerta|accept (the|an) offer|offerta di lavoro|job offer|trasferi\w*|relocat\w*|restare a |\bvolo\b|\bvoli\b|\bflights?\b|\bcasa\b|\bauto\b|macchina|mutuo|appartament\w*|\bhouse\b|\bcar\b|mortgage|apartment|viaggio|vacanza|\btrip\b|holiday|regal\w*|\bgift\b|present for|compleanno/,
    ideas: {
      aspetta: { opt: /aspett\w*|attend\w*|\bwait\w*|rimand\w*|\blater\b|non compr\w*|\bskip\b|\bhold off\b/, re: /offerta|sconto|saldi|ultimo|capriccio|voglio|\bwant\b|\bsale\b|discount|limited|last one|impuls\w*/, w: 1 },
      compra: { opt: /compr\w*|\bprend\w*|\bbuy\w*|acquist\w*|\bget\b|\border\b/, re: /\bserve\b|mi serve|rotto|necessar\w*|bisogno|\bneed\b|broken|essential|replace\w*|sostitu\w*|per lavoro/, w: 3 },
      'gia-ho': { opt: /gia ho|already have|uso quello|use what i have/, re: /gia ho|ne ho gia|ho gia|already have|similar|duplicate|simile|uguale/, w: 3 },
      budget: { opt: /budget|tetto|ceiling|limite|limit/, re: /costos\w*|\bcaro\b|\bbudget\b|soldi|mi costa|expensive|afford\w*|pricey|prezzo|\bprice\b|stipendio/, w: 2 },
    },
  },
  weekend: {
    color: '#34d399',
    re: /che programma|programma per (sabato|domenica)|\bplans\b|\bhike\b|\bmuseum\b|\bmuseo\b|weekend|fine settimana|cosa si fa|what to do (in|on)|things to do|no plans|senza programm\w*|nessun programma|any plans|rainy (day|saturday|sunday)|giornata di pioggia|passare il tempo|pass the time|idee per|ideas for|nothing to do|nulla da fare|niente da fare|(sabato|domenica) (sono|e) libero|sunday afternoon|(domenica|sabato|giornata|pomeriggio|sera) liber[ao]|free (sunday|saturday|afternoon|evening)|cosa faccio (oggi|stasera|domani|domenica|sabato)|che faccio\b|annoi\w*|\bnoia\b|cosa fare|what to do|\bbored\b|this weekend|free time|tempo libero|pomeriggio libero|\bgita\b/g,
    not: null,
    ideas: {
      fuori: { opt: /fuori|aperto|aria|outdoor\w*|walk|passegg\w*|gita|\bout\b/, w: 1 },
      persone: { opt: /amic\w*|persone|friends|people|famiglia|family|vedere|\bsee\b/, re: /\bsolo\b|solitudine|amic\w*|\balone\b|lonely|friends|famiglia|family/, w: 3 },
      riposa: { opt: /riposo|riposar\w*|\brest\b|divano|couch|casa|\bhome\b|relax/, re: /stanc\w*|esaust\w*|riposo|\btired\b|exhaust\w*|\brest\b|settimana pesante/, w: 3 },
      mani: { re: /annoi\w*|\bnoia\b|\bbored\b|nulla da fare|nothing to do|creativ\w*/, w: 2.5 },
      progetto: { re: /\bcasa\b|ordine|chores|project|progetto|arretrat\w*|backlog/, w: 2 },
    },
  },
  focus: {
    color: '#60a5fa',
    re: /continu\w* (a )?(studiar\w*|lavorar\w*)|\bpausa\b|concentr\w*|studiar\w*|\bstudio\b|\bbreak\b|keep (studying|working)|ore che (lavoro|studio)|hours of (working|studying)|mi fermo|take a break|\bfocus\b|procrastin\w*|\bstacco\b|call it a day|work (a bit|a little) more|lavoro ancora|studio ancora|torno a studiare|torno a lavorare|back to (work|studying)|distract\w*|distratt\w*|mi distraggo|pausa caffe|coffee break|capitolo|chapter|rimand\w*|compiti|homework|deadline|scadenza/g,
    not: /universit|iscrivermi|iscriversi|laurea|dottorato|master\b|enrol\w*|degree|\bphd\b/,
    ideas: {
      'continua': { opt: /continu\w*|\bkeep\b|\bstay\b|ancora|\bmore\b|studiar\w*|lavorar\w*|study|\bwork\b/, w: 1 },
      pausa: { opt: /paus\w*|\bbreak\b|fermar\w*|\bstop\b|riposar\w*|\brest\b/, re: /\bore\b|da ore|stanc\w*|non entra|non mi concentro|bloccat\w*|for hours|\btired\b|\bstuck\b|can t focus|distratt\w*|distracted/, w: 3 },
      inizia: { opt: /inizi\w*|comincia\w*|\bstart\b|\bbegin\b/, re: /rimand\w*|procrastin\w*|non riesco a iniziare|iniziare|cominciare|putting off|\bstart\b|\bbegin\b|can t start/, w: 3 },
      chiudi: { opt: /chiud\w*|\bstop\b|finisc\w*|basta|dormir\w*|\bsleep\b/, re: /tardi|mezzanotte|notte|\blate\b|midnight|\bnight\b/, w: 2 },
    },
  },
  faccende: {
    color: '#fb923c',
    re: /\bstendo\b|\bpanni\b|\bstendere\b|\bvacuum\w*|\bhoover|puli\w+|faccende|metto in ordine|lavastoviglie|dishwasher|\bsvuoto\b|empty the|metto a posto|put away|mettere in ordine|in ordine la (camera|casa|stanza)|riordino|tidy up|\bstiro\b|stirare le|iron\w*|\bsporc\w*|\bdirty\b|spazz\w*|aspirapolvere|\bvacuum\w*|\bpolvere\b|\bdust\w*|lavatrice|piatti da lavare|\bpiatti\b|\blavo\b|lavare (i|le|la)\b|ordine in casa|riordin\w*|bucato|\bstirare\b|chores|\bclean\w*|laundry|dishes|\btidy\b|\bmess\b|vacuum|sistemare (la )?(camera|casa)/g,
    not: null,
    ideas: {
      timer: { opt: /puli\w+|riordin\w*|sistem\w*|\bclean\w*|\btidy\b|adesso|\bnow\b/, w: 1 },
      'una-cosa': { re: /\btutto\b|troppo|caos|\bmess\b|everything|too much|overwhelm\w*|disordine/, w: 3 },
      musica: { re: /\bpesa\b|\bodio\b|\bhate\b|boring|dread|noios\w*/, w: 2 },
      stasera: { opt: /lasc\w+ stare|rimand\w*|domani|tomorrow|\bleave\b|\blater\b|dopo/, re: /stanc\w*|\bsera\b|tardi|\btired\b|\bnight\b|\blate\b/, w: 2.5 },
    },
  },
  regalo: {
    color: '#e879f9',
    re: /fiori o cioccolat\w*|flowers or chocolate|bouquet|cioccolatini|regal\w*|regalin\w*|what (should i|to) give|\bgive my (teacher|boss|mom|dad|friend|colleague)|fiori ai|flowers for|una bottiglia|what can i give|can i give|give (him|her|them)|\bvoucher\b|gift (card|voucher)|buono regalo|per la maestra|per l insegnante|for the teacher|\bgift\b|present for|cosa porto|what to bring|bomboniera/g,
    not: null,
    ideas: {
      ascolto: { opt: /oggetto|\bcosa\b|object|thing|qualcosa|something/, w: 1 },
      esperienza: { opt: /esperienz\w*|cena|biglietto|ticket|experience|dinner|insieme|together/, re: /ha tutto|has everything|difficile|hard to|non so cosa|no idea/, w: 3 },
      scritto: { opt: /scritt\w*|lettera|biglietto scritto|handwritten|card|letter/, re: /\bpoco\b|\bbudget\b|tight|cheap|economico|senza spendere|no money/, w: 3 },
      piccolo: { re: /collega|\bcapo\b|\bboss\b|colleague|teacher|maestra|vicin\w*|neighbou?r|ospit\w*|\bhost\b/, w: 3 },
    },
  },
  sonno: {
    color: '#818cf8',
    re: /addormentar\w*|\basleep\b|insonnia|insomnia|non dormo|\bletto\b|dormire|\bdormo\b|sveglia|puntata|ancora una (puntata|serie)|\bsonno\b|stanotte|nottata|spengo la luce|lights out|turn off the light|leggo ancora|vado a dormire|go to sleep|alzar\w*|\bbed\b|sleep\w*|alarm|one more episode|stay up|go to bed|late night|pisolino|riposino|\bnap\b/g,
    not: /abitudin|dormire meglio|habit\b|insonnia|insomnia/,
    ideas: {
      letto: { opt: /letto|dormir\w*|\bdormo\b|\bbed\b|sleep\w*|\bsleep\b/, w: 1 },
      capitolo: { opt: /ancora (una|un)\b|puntata|episod\w*|\bone more\b|\bwatch\b|guardo|capitolo|chapter/, re: /\blibro\b|\bread\b|tranquill\w*|rilass\w*|\brelax\b/, w: 1.5 },
      sveglia: { opt: /sveglia|alzar\w*|\balarm\b|\bwake\b|\bsnooze\b/, re: /sveglia|alzar\w*|alarm|\bwake\b|\bpresto\b|\bearly\b|snooze/, w: 3 },
      riposino: { re: /riposino|pisolino|\bnap\b|dopo pranzo|afternoon/, w: 4 },
    },
  },
  guardo: {
    color: '#c084fc',
    re: /\bguardo (un|il|la|una|qualcosa|altro|un altra|something)\b|guardare (un|il|la|una|qualcosa)\b|\banime\b|serie tv|tv series|streaming|documentar\w*|which (show|series|movie|film)|start watching|comincio a guardare|\bfilm\b|\bserie\b|netflix|cosa vedere|what to watch|watch tonight|\bmovie\b|show to watch|\bbinge\b|libro da leggere|cosa leggere|what to read|what book|which book|che libro/g,
    not: null,
    ideas: {
      comfort: { opt: /rivedo|rivedere|rewatch|gia visto|already seen|conosc\w*/, w: 1 },
      nuovo: { opt: /nuovo|\bnew\b|scopr\w*|discover\w*|\bsconosciut\w*/, re: /nuovo|\bnew\b|curios\w*|scopr\w*|discover\w*|consigli/, w: 2.5 },
      leggere: { opt: /libro|leggere|\bbook\b|\bread\b/, re: /\blibro\b|leggere|\bbook\b|\bread\b/, w: 3 },
      leggero: { re: /stanc\w*|\btired\b|leggero|\blight\b|\beasy\b|comed\w*|commedia/, w: 2 },
      insieme: { re: /insieme|partner|amici|together|friends|famiglia/, w: 2.5 },
    },
  },
};

// categorie aggiuntive (more-core.js): stesso schema, stesso motore
Object.assign(DAILY, MORE);
DAILY.weekend.prio = -1; DAILY.regalo.prio = 3; DAILY.compra.prio = 2; DAILY.guardo.prio = 3; DAILY.outfit.prio = 1; DAILY.faccende.prio = 1;
DAILY_ORDER.push(...MORE_ORDER);

export const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['’`]/g, ' ');
