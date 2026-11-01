// Curated content of the local engine (English). Mirror of it.js: same ids, same evidence links, same URLs.
// RULES: no figure without a source (ev field), "tends to" tone, true-positive first, no negative vocabulary.
// Every figure below was checked on the web on 1 November 2026 (see CONCEPT.md, sources table).

export const EVIDENCE = {
  gilbertEbert: {
    scope: 'Psychological studies',
    headline: 'After a final choice, satisfaction tends to rise',
    source: 'Gilbert & Ebert (2002), Journal of Personality and Social Psychology',
    year: 2002,
    url: 'https://doi.org/10.1037/0022-3514.82.4.503',
    means: 'In their experiments, people who could no longer change their mind about a choice were more satisfied than people who could reconsider.',
    limits: 'These are experiments on simple choices: they point to a tendency, not a guarantee.',
  },
  immune: {
    scope: 'Psychological studies',
    headline: 'Difficult emotions last less than we predict',
    source: 'Gilbert, Pinel, Wilson, Blumberg & Wheatley (1998), Journal of Personality and Social Psychology',
    year: 1998,
    url: 'https://doi.org/10.1037/0022-3514.75.3.617',
    means: 'People overestimate how long negative emotions will last after an event: the mind has its own “immune system” that softens them.',
    limits: 'These are averages over many people: they do not say how it will go for you, they say how it tends to go.',
  },
  atlanta: {
    scope: 'USA',
    headline: 'People who change jobs: median hourly pay +4.7% in a year (people who stay: +3.4%)',
    stat: '4.7% vs 3.4%',
    source: 'Federal Reserve Bank of Atlanta, Wage Growth Tracker (3-month average, September 2026)',
    year: 2026,
    url: 'https://www.atlantafed.org/research-and-data/data/wage-growth-tracker',
    means: 'At the median, people who changed jobs saw their hourly pay grow more; but people who stayed saw it grow too.',
    limits: 'American data, medians over very many people: they do not describe your sector or your case.',
    echo: 'In the USA, in September 2026, people who change jobs have a median pay growth of 4.7% against 3.4% for those who stay.',
  },
  mlDim: {
    scope: 'Italy',
    headline: 'In Italy, in the fourth quarter of 2025 alone, 527 thousand employment relationships ended with the worker’s resignation',
    stat: '527 thousand · 13.6%',
    source: 'Italian Ministry of Labour and Social Policies, quarterly note on Mandatory Communications, Q4 2025',
    year: 2026,
    url: 'https://www.lavoro.gov.it/documenti-e-norme/studi-e-statistiche/nota-co-iv-trimestre-2025',
    means: 'Resignations are the main part of the endings requested by the worker: 527 thousand in three months, 13.6% of all employment relationships that ended. Leaving a job to look for another is something very many people do every quarter.',
    limits: 'It counts employment relationships, not people, and does not say why people resign or what they do next: it also includes people leaving for personal reasons.',
    echo: 'In Italy, in the fourth quarter of 2025 alone, 527 thousand employment relationships ended with the worker’s resignation (Ministry of Labour): choosing to change is something very many people do.',
  },
  istatStay: {
    scope: 'Italy',
    headline: '96.7% of people who were employed in 2024 were still employed in 2025',
    stat: '96.7%',
    source: 'Istat, The longitudinal component of the labour force survey, 2024-2025 flows (2 October 2026)',
    year: 2026,
    url: 'https://www.istat.it/comunicato-stampa/la-componente-longitudinale-della-rilevazione-sulle-forze-di-lavoro-2/',
    means: 'Among 15-64 year-olds, staying in employment after one year rose from 94.4% (2023-2024) to 96.7% (2024-2025): continuity of work is the norm.',
    limits: 'It says people stay employed, not that they stay in the same place or that they are satisfied; it concerns resident 15-64 year-olds.',
    echo: 'In Italy 96.7% of people employed in 2024 were still employed in 2025 (Istat): continuity of work is the norm, and a turning point can be a normal step too.',
  },
  nowok: {
    scope: 'United Kingdom',
    headline: 'Before a move wellbeing tends to dip and picks up in the year of the move',
    source: 'Nowok, van Ham, Findlay & Gayle (2013), Environment and Planning A',
    year: 2013,
    url: 'https://doi.org/10.1068/a45287',
    means: 'With 12 years of British data, the dip in satisfaction comes before the move, and in the year of the move people return to their usual level.',
    limits: 'It concerns moves within the United Kingdom: it shows an average tendency, not a guaranteed jump in happiness.',
  },
  istat: {
    scope: 'Italy',
    headline: 'In Italy in 2025 over 1.4 million changes of residence between municipalities',
    stat: '1,455,000',
    source: 'Istat, Internal and international migration of the resident population, 2024/2025 (3 August 2026, provisional data)',
    year: 2026,
    url: 'https://www.istat.it/comunicato-stampa/migrazioni-interne-e-internazionali-della-popolazione-residente-anni-2024-2025/',
    means: 'Moving is a very common experience: in 2025 transfers of residence between Italian municipalities were one million 455 thousand.',
    limits: 'It counts registry changes of residence, not the reasons nor how they went.',
    echo: 'In Italy, in 2025, 1,455,000 transfers of residence between municipalities (Istat, provisional data): changing place is a choice very many people make.',
  },
  abroad: {
    scope: 'Italy',
    headline: 'For people who leave for a job abroad, net pay one year after graduation is on average +54.2%',
    stat: '+54.2%',
    source: 'AlmaLaurea, 2025 Report on graduates’ employment outcomes (second-cycle graduates employed abroad)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Italian second-cycle graduates employed abroad earn on average over 2,200 euro net per month one year after graduating, +54.2% compared with those working in Italy.',
    limits: 'It concerns graduates employed abroad, not people changing city within Italy; cost of living and contexts differ.',
  },
  harvard: {
    scope: 'Psychological studies',
    headline: 'The quality of relationships is among the best indicators of long-term wellbeing',
    source: 'Harvard Study of Adult Development (Robert Waldinger), Harvard Gazette',
    year: 2023,
    url: 'https://news.harvard.edu/gazette/story/2023/02/work-out-daily-ok-but-how-socially-fit-are-you/',
    means: 'Following the same people for decades, the study found that good-quality relationships go together with happiness and good health.',
    limits: 'It is an association observed in a specific group: it does not say what to do in a particular case.',
  },
  liking: {
    scope: 'Psychological studies',
    headline: 'After a conversation we are liked more than we think (“liking gap”)',
    source: 'Boothby, Cooney, Sandstrom & Clark (2018), Psychological Science',
    year: 2018,
    url: 'https://doi.org/10.1177/0956797618783714',
    means: 'In five studies people underestimated how much the other person liked them and enjoyed their company, even months later.',
    limits: 'It concerns conversations between people who know each other little or recently: it is not a forecast of the answer you will get.',
  },
  almaOcc: {
    scope: 'Italy',
    headline: 'Graduates: 78.6% employed at one year and about 9 in 10 at five years',
    stat: '78.6% · 92.8% / 89.7%',
    source: 'AlmaLaurea, 2025 Report on graduates’ employment outcomes (2024 graduates)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'One year after graduating the employment rate is 78.6% (first and second cycle); at five years it is 92.8% (first cycle) and 89.7% (second cycle).',
    limits: 'These are national averages of graduates: they vary a lot by course, area and moment.',
    echo: 'Over 690 thousand graduates were followed into the world of work: one year after graduating 78.6% are employed (AlmaLaurea, 2025).',
  },
  almaSat: {
    scope: 'Italy',
    headline: '90.2% of graduates are satisfied with their course and 72.2% would make the same choice again',
    stat: '90.2% · 72.2%',
    source: 'AlmaLaurea, 2025 Report on graduates’ profile (2024 graduates)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Among 2024 graduates, 90.2% declare overall satisfaction with the course and 72.2% would choose again both the course and the university.',
    limits: 'It is the opinion of those who finished: it does not represent those who stopped studying.',
    echo: 'Among over 305 thousand 2024 graduates, 90.2% are satisfied with the course they chose (AlmaLaurea, 2025).',
  },
  almaIntern: {
    scope: 'Italy',
    headline: '61% of graduates did an internship and 94.3% of them are satisfied',
    stat: '61% · 94.3%',
    source: 'AlmaLaurea, 2025 Report on graduates’ profile (2024 graduates)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'The curricular internship concerns 61.0% of 2024 graduates and 94.3% declare they are satisfied with the experience.',
    limits: 'It concerns internships included in degree courses, not any trial experience.',
  },
  almaMismatch: {
    scope: 'Italy',
    headline: 'A clear motivation when choosing what to study reduces the gap between studies and work',
    source: 'AlmaLaurea, 2025 Report (mismatch between training and work)',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'According to AlmaLaurea, people who choose their path with a clear motivation, cultural or professional, are less likely to end up in work unrelated to their studies.',
    limits: 'It is an association observed among graduates: it does not guarantee any single outcome.',
  },
  almaSelf: {
    scope: 'Italy',
    headline: 'Five years after graduating, 15.2% of second-cycle graduates in work are self-employed',
    stat: '15.2%',
    source: 'AlmaLaurea, 2025 Report on graduates’ employment outcomes',
    year: 2025,
    url: 'https://www.almalaurea.it/news/rapporto-almalaurea-2025',
    means: 'Among second-cycle graduates in work five years after graduating, 15.2% run their own activity: more than one person in seven.',
    limits: 'It concerns graduates and includes many forms of self-employment: it is not a success rate of businesses.',
    echo: 'In Italy, five years after a second-cycle degree, 15.2% of those in work are self-employed, more than one person in seven (AlmaLaurea, 2025).',
  },
  istatSurv: {
    scope: 'Italy',
    headline: 'More than 8 in 10 new Italian businesses get past the first year (80.9%) and about one in two reaches five (49.4%)',
    stat: '80.9% · 49.4%',
    source: 'Istat, Business demography 2019-2024, Table 5 (cohort of businesses born in 2019, 13 July 2026)',
    year: 2026,
    url: 'https://www.istat.it/tavole-di-dati/demografia-dimpresa-anni-2019-2024/',
    means: 'The curve of Italian businesses born in 2019: 80.9% still active after 1 year, 69.7% after 2, 62.1% after 3, 55.4% after 4, 49.4% after 5.',
    limits: 'It does not tell closures for difficulty apart from voluntary or planned ones (for example a sale or a change of direction); the cohort also spans 2020-2024.',
    echo: 'In Italy, of the businesses born in 2019, 80.9% were still active after one year and 49.4% after five (Istat).',
  },
  euGrowth: {
    scope: 'European Union',
    headline: 'In the EU, businesses born in 2019 and still active in 2024 employed 72% more people',
    stat: '72%',
    source: 'Eurostat, Business demography statistics, Statistics Explained (October 2026 data)',
    year: 2026,
    url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Business_demography_statistics',
    means: 'Five-year-old businesses still active in 2024 employed 72% more people than in 2019, the year they were born.',
    limits: 'It concerns only businesses that kept going: it does not describe those that closed nor say how a single business will do.',
  },
  euOwn: {
    scope: 'Italy',
    headline: 'In Italy 77.1% of people live in a home they own and 22.9% in a rented one',
    stat: '77.1% · 22.9%',
    source: 'Eurostat, EU-SILC, ilc_lvho02 (Italy, 2025; updated 20 October 2026)',
    year: 2025,
    url: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_lvho02/default/table?lang=en',
    means: 'In 2025, 77.1% of the Italian population lived in an owned home (17.3% with a mortgage or loan, 59.9% without) and 22.9% in a rented one: both roads are very common.',
    limits: 'It describes how people live today, not which choice suits you: it depends on income, city, plans and moment.',
    echo: 'In Italy 77.1% of people live in a home they own and 22.9% in a rented one (Eurostat, 2025): both roads are very common.',
  },
  kumar: {
    scope: 'Psychological studies',
    headline: 'People who express gratitude tend to underestimate how happy the other will be',
    source: 'Kumar & Epley (2018), Psychological Science',
    year: 2018,
    url: 'https://doi.org/10.1177/0956797618772506',
    means: 'In experiments with gratitude letters, the writers predicted less surprise and less happiness in the recipients than the recipients really felt, and overestimated how awkward they would feel.',
    limits: 'It concerns thank-you letters in experimental settings: it does not predict how a particular person will react.',
    echo: 'In Kumar and Epley’s experiments (2018), recipients of a gratitude letter were more surprised and happier than the person who wrote it predicted.',
  },
  liuReach: {
    scope: 'Psychological studies',
    headline: 'Reaching out to someone is appreciated more than we think',
    source: 'Liu, Rim, Min & Min (2023), Journal of Personality and Social Psychology',
    year: 2023,
    url: 'https://doi.org/10.1037/pspi0000402',
    means: 'In a series of studies, people who received an unexpected message or small gesture appreciated it more than the sender imagined: the surprise counts for more than any awkwardness.',
    limits: 'They are studies on messages and small gestures: they do not say how a difficult conversation will go nor whether the bond will resume.',
    echo: 'In a series of studies (Liu et al., 2023), people who received an unexpected message appreciated it more than the sender imagined.',
  },
  dunn: {
    scope: 'Psychological studies',
    headline: 'Spending on others tends to make people happier than spending on themselves',
    source: 'Dunn, Aknin & Norton (2008), Science',
    year: 2008,
    url: 'https://doi.org/10.1126/science.1150952',
    means: 'In an experiment, people who spent a small sum on someone else were happier than people who spent it on themselves.',
    limits: 'These are surveys and one experiment with small sums: they do not measure big choices nor say how long the effect lasts.',
    echo: 'In an experiment (Dunn, Aknin and Norton, 2008) people who spent a small sum on someone else were happier than those who spent it on themselves.',
  },
  jenkinson: {
    scope: 'Psychological studies',
    headline: 'People who volunteer tend to report more wellbeing and fewer depressive symptoms',
    source: 'Jenkinson et al. (2013), BMC Public Health',
    year: 2013,
    url: 'https://doi.org/10.1186/1471-2458-13-773',
    means: 'A review of 40 studies on formal volunteering found, in cohort data, associations with greater life satisfaction and wellbeing and with less depression.',
    limits: 'These are observed associations: the experimental studies included did not confirm the same effects, so they do not say that volunteering alone leads to feeling better.',
    echo: 'A review of 40 studies (Jenkinson et al., 2013) found, in observational data, more wellbeing and less depression in people who volunteer.',
  },
  vanboven: {
    scope: 'Psychological studies',
    headline: 'Experiences tend to make people happier than material goods',
    source: 'Van Boven & Gilovich (2003), Journal of Personality and Social Psychology',
    year: 2003,
    url: 'https://doi.org/10.1037/0022-3514.85.6.1193',
    means: 'In their studies people reported more happiness from experiential purchases (trips, concerts) than from objects, partly because experiences are tied to identity and relationships.',
    limits: 'These are averages from surveys and experiments: an object linked to an experience or a person can be worth a great deal.',
  },
  lally: {
    scope: 'Psychological studies',
    headline: 'A repeated action becomes automatic in 66 days (median; from 18 to 254)',
    stat: '66 days',
    source: 'Lally, van Jaarsveld, Potts & Wardle (2010), European Journal of Social Psychology',
    year: 2010,
    url: 'https://doi.org/10.1002/ejsp.674',
    means: 'Following 96 people for 12 weeks, the median time to reach automaticity was 66 days (from 18 to 254 depending on the person and the action). Missing a single occasion made no meaningful difference.',
    limits: 'A small sample of simple actions (eating, drinking, moving): times vary a lot from person to person.',
    echo: 'In the University College London habits study, 96 people followed a daily action for 12 weeks (Lally et al., 2010).',
  },
};

const H = (text, feel, ev) => ({ text, feel, ev: ev || null });

export const CATEGORIES = {
  lavoro: {
    label: 'Work',
    color: '#ffb84d',
    example: 'Change jobs or stay where I am?',
    keywords: ['job', 'work', 'resign', 'quit', 'promotion', 'career', 'office', 'interview', 'salary', 'company', 'boss', 'offer', 'employer', 'colleague', 'hired', 'bank', 'contract', 'remote'],
    defaults: { a: 'Change jobs', b: 'Stay where you are', c: 'Explore without leaving' },
    stayWords: ['stay', 'remain', 'keep', 'wait', 'not change', 'stick'],
    echoes: ['mlDim', 'istatStay', 'atlanta'],
    forks: {
      a: {
        tagline: 'A new room, new stimuli',
        supports: [
          'Three people who know your worth and whose opinion you can ask',
          'A cushion of time and savings for the first months',
          'One more question at the interview: “what is it really like to work here?”',
        ],
        horizons: {
          d1: H('You have decided: the mind starts to bring out the good sides of the choice you made. Feeling excitement and a bit of vertigo together is normal: they often go hand in hand.', 'Good vertigo', 'gilbertEbert'),
          w1: H('You learn names, tools, schedules. You ask lots of questions and that is fine: in the first weeks you are trying to understand, not to prove.', 'Curiosity'),
          m3: H('You start moving without a map. Colleagues see you for what you bring. Often this is when you see whether tasks, time and pay are what you imagined.', 'Orientation'),
          y1: H('A year later you have a new story to tell and more skills. In Italy, in just three months of 2025, 527 thousand employment relationships ended with the worker’s resignation (Ministry of Labour): changing is a well-trodden road.', 'Momentum', 'mlDim'),
        },
        evidence: ['gilbertEbert', 'mlDim', 'atlanta', 'immune'],
      },
      b: {
        tagline: 'Roots, and a new way of being there',
        supports: [
          'One thing you would like to change where you are, written in a single line',
          'A person to talk to about growth or new responsibilities',
          'A date of your own by which to take stock',
        ],
        horizons: {
          d1: H('You chose to stay: it is a choice, not a postponement. The mind settles and finds solidity in what it already knows.', 'Solidity', 'gilbertEbert'),
          w1: H('You look at your work with fresh eyes: what works, what is missing. Noticing what you like is already a compass.', 'Clarity'),
          m3: H('You have had a chance to propose a small change: a role, a schedule, a project. Staying is also moving: pay for people who do not change jobs keeps growing too (median +3.4%, US data).', 'Living stability', 'atlanta'),
          y1: H('A year later you know the place better than anyone and can decide with more data in hand. In Italy 96.7% of people employed in 2024 were still employed in 2025 (Istat): continuity is common, and it can be a conscious choice.', 'Rootedness', 'istatStay'),
        },
        evidence: ['gilbertEbert', 'istatStay', 'atlanta', 'immune'],
      },
      c: {
        tagline: 'Open a crack without closing the door',
        supports: [
          'One hour a week set aside for exploring',
          'Two conversations with people who do the job that intrigues you',
          'A small trial project to do in your free time',
        ],
        horizons: {
          d1: H('You set one small step: a chat, an updated CV. The first step clears a lot of fog.', 'Relief'),
          w1: H('You have talked to someone about the trade that intrigues you: details often emerge that no job ad tells.', 'Discovery'),
          m3: H('You have more real information and fewer hypotheses. The choice, when it comes, is much more yours.', 'Confidence'),
          y1: H('You have a choice made calmly. Whichever door you open, you open it with more of a map and less worry.', 'Freedom'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
    },
  },

  trasloco: {
    label: 'Moving',
    color: '#4fd1c5',
    example: 'Move to another city or stay where I am?',
    keywords: ['move', 'moving', 'relocat', 'city', 'abroad', 'milan', 'rome', 'leave', 'emigrat', 'live in', 'live together', 'new town', 'another country'],
    defaults: { a: 'Leave', b: 'Stay where you are', c: 'Live a preview' },
    stayWords: ['stay', 'remain', 'not move', 'not leave', 'keep', 'wait'],
    echoes: ['istat', 'abroad'],
    forks: {
      a: {
        tagline: 'A new place, a new way of being you',
        supports: [
          'A foothold for the first weeks (a friend, a room, a contact)',
          'A place to spend Sundays: a park, a café, a hall',
          'Two fixed video calls with the people left behind, every week',
        ],
        horizons: {
          d1: H('You have decided: the hardest part, deciding, is behind you. Studies show that the dip in wellbeing before a move tends to melt right when you move.', 'Relief', 'nowok'),
          w1: H('Boxes, addresses, new streets. Everything is new, even the tiredness: the first days are a wake-up call for the senses.', 'New energy'),
          m3: H('You begin to have your own places: the café, the street, the familiar face. In the year of the move, mood tends to return to its usual level.', 'Belonging', 'nowok'),
          y1: H('A year later you have two homes inside you. If you left for a job abroad, net pay one year on is on average much higher (+54.2% for second-cycle graduates).', 'Breadth', 'abroad'),
        },
        evidence: ['nowok', 'istat', 'abroad'],
      },
      b: {
        tagline: 'Roots, chosen again',
        supports: [
          'One new thing to do in your place, never done before',
          'A person with whom to strengthen a bond',
          'A date to review the choice',
        ],
        horizons: {
          d1: H('You chose to stay: your place becomes a choice again rather than a habit. The mind starts to find its merits.', 'Belonging', 'gilbertEbert'),
          w1: H('You do something new in the usual places: a different route, an invitation. Novelty is not only elsewhere.', 'Novelty'),
          m3: H('The relationships close to you have had room to grow. The Harvard study of adult life shows that the quality of relationships is among the best indicators of wellbeing over time.', 'Warmth', 'harvard'),
          y1: H('A year later you know your place in depth, and the people you love know they can count on you.', 'Rootedness'),
        },
        evidence: ['gilbertEbert', 'harvard', 'istat'],
      },
      c: {
        tagline: 'Live a preview, then decide',
        supports: [
          'A trial period of two or four weeks',
          'Three lines each evening: what did I like today',
          'A local person to tell you what it is really like',
        ],
        horizons: {
          d1: H('You choose a trial period: the decision becomes small and concrete.', 'Lightness'),
          w1: H('You live the place as a resident, not as a tourist: schedules, bills, noises. Reality beats imagination.', 'Reality'),
          m3: H('You have real data on how you feel there. The choice that follows rests on experience, not on hypotheses.', 'Security'),
          y1: H('You chose with open eyes. Whether you leave or stay, you do it without the “what if…?”.', 'Peace'),
        },
        evidence: ['nowok', 'istat'],
      },
    },
  },

  relazioni: {
    label: 'Relationships',
    color: '#f687b3',
    example: 'Tell him how I feel or keep waiting?',
    keywords: ['love', 'in love', 'girlfriend', 'boyfriend', 'relationship', 'partner', 'friend', 'family', 'tell him', 'tell her', 'argument', 'ex ', 'couple', 'marry', 'wedding', 'feelings', 'confess', 'kiss', 'i like him', 'i like her', 'crush'],
    defaults: { a: 'Speak honestly', b: 'Wait and observe', c: 'A small gesture' },
    stayWords: ['wait', 'observe', 'not tell', 'stay quiet', 'keep quiet', 'hold'],
    echoes: ['harvard', 'liking'],
    forks: {
      a: {
        tagline: 'Opening the door with true words',
        supports: [
          'A quiet moment, with no rush',
          'A simple opening line: “There is something I would like to tell you”',
          'Permission not to have all the answers yet',
        ],
        horizons: {
          d1: H('You decided to speak: relief often begins even before the words.', 'Relief'),
          w1: H('After a conversation people usually feel better than they feared: studies on the “liking gap” show that people like us more than we think.', 'Lightness', 'liking'),
          m3: H('Whatever the answer was, there is clarity now. Clarity is a form of peace and leaves room for what comes next.', 'Clarity'),
          y1: H('A year later you remember having had the courage to say it. Quality relationships are among the most solid indicators of long-term wellbeing (Harvard).', 'Authenticity', 'harvard'),
        },
        evidence: ['liking', 'harvard', 'gilbertEbert'],
      },
      b: {
        tagline: 'Giving time to time, with open eyes',
        supports: [
          'A date (for example in two weeks) on which you reserve the right to choose',
          'Three things you notice, written down, without judging',
          'Someone you trust to share your thoughts with',
        ],
        horizons: {
          d1: H('You chose to give yourself time: it is not running away, it is choosing the moment. The mind is grateful not to be forced.', 'Breathing space'),
          w1: H('You observe what you feel in small moments. Answers are often in the details: who makes you laugh, who listens to you.', 'Attention'),
          m3: H('You have gathered enough signals to choose with head and heart together.', 'Clarity'),
          y1: H('You have learned a rhythm of your own for deciding about bonds: neither in a rush, nor never.', 'Balance'),
        },
        evidence: ['harvard', 'immune'],
      },
      c: {
        tagline: 'A light invitation, with no weight',
        supports: [
          'A small gesture: a message, a coffee, a thank-you',
          'No expectation about the answer',
          'A way of saying “I thought of you” and nothing more',
        ],
        horizons: {
          d1: H('You make a small gesture: small gestures are the easiest to welcome and to make.', 'Lightness'),
          w1: H('After a conversation people tend to like each other more than they think (liking gap): a small gesture is a simple way of starting one.', 'Warmth', 'liking'),
          m3: H('A small habit of attention has made the bond more alive, or clearer.', 'Closeness'),
          y1: H('Bonds are cultivated with small, repeated gestures: the quality of relationships goes with wellbeing over time (Harvard).', 'Roots', 'harvard'),
        },
        evidence: ['liking', 'harvard'],
      },
    },
  },

  studio: {
    label: 'Study',
    color: '#90cdf4',
    example: 'Enrol at university or work first?',
    keywords: ['study', 'studies', 'universit', 'degree', 'course', 'master', 'school', 'phd', 'enrol', 'exam', 'college', 'faculty', 'bootcamp', 'diploma'],
    defaults: { a: 'Enrol', b: 'Work first, study later', c: 'Try a short course' },
    stayWords: ['work', 'wait', 'first', 'not enrol', 'postpone', 'later'],
    echoes: ['almaSat', 'almaOcc'],
    forks: {
      a: {
        tagline: 'A road of knowledge and encounters',
        supports: [
          'A small fixed study time, even 30 minutes',
          'A course mate to compare notes with',
          'A date to celebrate your first exam',
        ],
        horizons: {
          d1: H('You have decided: curiosity takes the lead. Enrolling is the biggest step, and you took it.', 'Pride', 'gilbertEbert'),
          w1: H('New timetables, new words. You learn to learn again: the effort of the first days is perfectly normal.', 'Enthusiasm'),
          m3: H('The first exam is a milestone that changes how you see yourself. In Italy 90.2% of graduates say they are satisfied with the course they chose.', 'Belonging', 'almaSat'),
          y1: H('A year later you have a new language and a group of people. Graduate employment is 78.6% one year after graduating and reaches about 9 in 10 at five years.', 'Perspective', 'almaOcc'),
        },
        evidence: ['almaSat', 'almaOcc', 'gilbertEbert'],
      },
      b: {
        tagline: 'Build experience, then choose better',
        supports: [
          'One thing you want to understand about the world of work',
          'A small budget for when you study',
          'A date to review the choice',
        ],
        horizons: {
          d1: H('You chose to gain experience first: a choice with a plan. The mind trusts what has a date.', 'Concreteness', 'gilbertEbert'),
          w1: H('You learn how a workplace functions: knowing what you are missing is an excellent reason to study well.', 'Reality'),
          m3: H('You have money, experience and better questions to bring to your studies.', 'Autonomy'),
          y1: H('A year later you know what you want to study and why. According to AlmaLaurea, people who choose their path with a clear motivation are less likely to find a gap between studies and work.', 'Direction', 'almaMismatch'),
        },
        evidence: ['almaMismatch', 'gilbertEbert'],
      },
      c: {
        tagline: 'Taste before choosing',
        supports: [
          'A short course or an open lesson',
          'A person who does that job',
          'One hour a week to try',
        ],
        horizons: {
          d1: H('You choose to try on a small scale: one lesson, a short course. Doubt becomes experience.', 'Lightness'),
          w1: H('After the first lesson you often understand right away whether it lights you up or not: both answers are useful.', 'Clarity'),
          m3: H('In Italy the curricular internship concerns 61% of graduates and 94.3% of those who do one say they are satisfied: trying in the field is a well-trodden road.', 'Discovery', 'almaIntern'),
          y1: H('A year later you have made a study choice with evidence in hand.', 'Security'),
        },
        evidence: ['almaIntern', 'almaMismatch'],
      },
    },
  },

  impresa: {
    label: 'Going solo',
    color: '#faf089',
    example: 'Open my own business or stay an employee?',
    keywords: ['business', 'startup', 'start up', 'open a shop', 'shop', 'freelance', 'self-employed', 'own business', 'co-founder', 'cofounder', 'my own', 'side project', 'entrepreneur'],
    defaults: { a: 'Open the business', b: 'Stay where I was', c: 'Start small, in parallel' },
    stayWords: ['stay', 'remain', 'employee', 'not open', 'wait', 'keep my job'],
    echoes: ['istatSurv', 'almaSelf'],
    forks: {
      a: {
        tagline: 'An idea taking shape',
        supports: [
          'Three potential customers to talk to before spending',
          'An accountant or a consultant for a first orientation on the tax regime that suits you',
          'A maximum spend that leaves you calm',
        ],
        horizons: {
          d1: H('You have decided: the idea stops being only yours and begins to exist. It is a powerful and normal feeling: excitement and vertigo together.', 'Excitement', 'gilbertEbert'),
          w1: H('You do concrete things: a name, a first customer, first numbers. There is a lot to learn and the order in which you learn it is free.', 'Momentum'),
          m3: H('You have the first real feedback. The numbers begin to speak and you can listen to them with curiosity.', 'Concreteness'),
          y1: H('A year later you have real data in hand. In Italy more than 8 in 10 new businesses get past the first year (80.9% for those born in 2019) and about one in two reaches five (49.4%): they are starting numbers, not a destiny.', 'Staying power', 'istatSurv'),
        },
        evidence: ['istatSurv', 'euGrowth', 'gilbertEbert'],
      },
      b: {
        tagline: 'The dream stays lit, the door stays open',
        supports: [
          'One line describing the idea, to keep in a drawer',
          'One hour a month to listen to what is happening in your sector',
          'A date to review the choice',
        ],
        horizons: {
          d1: H('You chose not to open now: it is a choice about timing, not a renunciation. The mind finds peace in things that have a date.', 'Calm', 'gilbertEbert'),
          w1: H('You look at your work knowing the idea is there, safe: a stability that gives oxygen.', 'Calm'),
          m3: H('You notice what changes in your sector and gather clues without pressure.', 'Attention'),
          y1: H('A year later the idea is more mature, or it has made room for a new one. Either way you chose the moment.', 'Freedom'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
      c: {
        tagline: 'Try the dream without leaving the shore',
        supports: [
          'A minimal offer to put to a real person',
          'A spending limit set in advance',
          'Two hours a week set aside, no more',
        ],
        horizons: {
          d1: H('You choose to start small: the test costs little and teaches a lot.', 'Lightness'),
          w1: H('You show the idea to a real person: every answer, yes or no, is precious information.', 'Discovery'),
          m3: H('You have first feedback without having put everything at stake: you can grow or change course calmly. It is a road many walk: in Italy, five years after a second-cycle degree, 15.2% of those in work are self-employed.', 'Clarity', 'almaSelf'),
          y1: H('A year later you have first real data. In the EU, businesses still active at five years employ 72% more people than in their birth year (Eurostat): when something holds, it tends to grow.', 'Path', 'euGrowth'),
        },
        evidence: ['almaSelf', 'euGrowth', 'istatSurv'],
      },
    },
  },

  acquisto: {
    label: 'A purchase',
    color: '#fbb6ce',
    example: 'Buy it now or wait a bit?',
    keywords: ['buy', 'purchase', 'price', 'costs', 'gift', 'car ', 'phone', 'trip', 'holiday', 'vacation', 'spend', 'on sale', 'discount'],
    defaults: { a: 'Buy it', b: 'Wait a bit', c: 'Choose an experience' },
    stayWords: ['wait', 'not buy', 'postpone', 'later', 'hold off'],
    echoes: ['vanboven'],
    forks: {
      a: {
        tagline: 'A clear yes, an object entering your life',
        supports: [
          'A budget that leaves you calm at the end of the month',
          'A moment in which you will use the object, already imagined',
          'A way of enjoying it: giving it a space and an occasion',
        ],
        horizons: {
          d1: H('You have decided: the indecision disappears. A final choice tends to be more satisfying than one you can always revisit.', 'Satisfaction', 'gilbertEbert'),
          w1: H('You use it, you get to know it. The novelty is at its peak: enjoy it, that is what it is for.', 'Pleasure'),
          m3: H('The object becomes part of the routine: comfort and habit. Research suggests that what is tied to experiences and people gives longer-lasting happiness.', 'Comfort', 'vanboven'),
          y1: H('A year later the object is a small trusted presence. If it opened you to a new experience, it was money well spent.', 'Familiarity'),
        },
        evidence: ['gilbertEbert', 'vanboven'],
      },
      b: {
        tagline: 'Letting the desire mature',
        supports: [
          'A date on which you will decide (for example in 14 days)',
          'One line: what would I like to do with this object?',
          'A comparison with a second option',
        ],
        horizons: {
          d1: H('You chose to wait: the desire has a date, and that removes the rush.', 'Calm'),
          w1: H('You observe whether the desire stays, grows or changes shape: all three are information.', 'Clarity'),
          m3: H('If you decide to buy, you do it with more information; if you do not, you kept something for yourself.', 'Freedom'),
          y1: H('You have learned to know your desires and to reserve the right moment to indulge them.', 'Maturity'),
        },
        evidence: ['gilbertEbert', 'vanboven'],
      },
      c: {
        tagline: 'Turning the desire into an experience',
        supports: [
          'An experience that gives you the same desire: a trip, a course, an evening',
          'A person to share it with',
          'A date on which to live it',
        ],
        horizons: {
          d1: H('You point the desire toward an experience: a plan and a date.', 'Enthusiasm'),
          w1: H('You start imagining and preparing: the waiting is part of the pleasure too.', 'Anticipation'),
          m3: H('Research shows that experiences tend to make people happier than material goods, also because they are reread in a positive light and tie us to other people.', 'Memories', 'vanboven'),
          y1: H('A year later you have a vivid memory nobody can take away.', 'Memory'),
        },
        evidence: ['vanboven', 'gilbertEbert'],
      },
    },
  },

  salute: {
    label: 'A new habit',
    color: '#9ae6b4',
    example: 'Start a new habit today or wait until Monday?',
    keywords: ['habit', 'gym', 'run', 'running', 'walk', 'diet', 'sleep', 'quit smoking', 'smoking', 'workout', 'meditat', 'sport', 'eat', 'drink less', 'yoga', 'routine'],
    defaults: { a: 'Start today, small', b: 'Start with a complete plan', c: 'Prepare and start in a week' },
    stayWords: ['wait', 'monday', 'later', 'postpone', 'prepare'],
    echoes: ['lally'],
    forks: {
      a: {
        tagline: 'Two minutes, but today',
        supports: [
          'A tiny version of the habit (two minutes)',
          'An anchor: after the coffee, before the news',
          'A visible sign: a cross on the calendar',
        ],
        horizons: {
          d1: H('You took the first step today: a small start is a real start.', 'Done!', 'gilbertEbert'),
          w1: H('You have repeated it a few times: repetition in the same context turns an action into a habit. If you skip a day nothing is lost: in Lally’s study missing one occasion made no meaningful difference.', 'Rhythm', 'lally'),
          m3: H('At three months you are past the median time (66 days) in which a repeated action becomes automatic.', 'Naturalness', 'lally'),
          y1: H('A year later the action is part of the day: it has become automatic.', 'Stability'),
        },
        evidence: ['lally', 'gilbertEbert'],
      },
      b: {
        tagline: 'A path designed with care',
        supports: [
          'A plan written on one page',
          'A way to adapt it if the week is full',
          'A person to share it with',
        ],
        horizons: {
          d1: H('You have a plan: a written path gives direction and security.', 'Direction', 'gilbertEbert'),
          w1: H('You follow the plan and adapt it: flexibility is part of the plan. A skipped day breaks nothing (Lally, 2010).', 'Flexibility', 'lally'),
          m3: H('You pass the median time to make an action a habit (66 days). The plan has given way to naturalness.', 'Consistency', 'lally'),
          y1: H('A year later you have a habit you designed yourself, made to measure.', 'Made to measure'),
        },
        evidence: ['lally', 'gilbertEbert'],
      },
      c: {
        tagline: 'Prepare the ground, then start light',
        supports: [
          'A starting date (for example next Monday)',
          'One thing to prepare each day: shoes ready, bag, time',
          'A tiny first action to do on the start day',
        ],
        horizons: {
          d1: H('You have a date: preparing is already starting.', 'Anticipation'),
          w1: H('The day arrives, everything is ready: the first action costs less effort.', 'Readiness'),
          m3: H('The action is part of the day. If there were interruptions, nothing is lost: in Lally’s study a single miss made no meaningful difference.', 'Continuity', 'lally'),
          y1: H('A year later the action feels at home.', 'Home'),
        },
        evidence: ['lally'],
      },
    },
  },

  casa: {
    label: 'Home',
    color: '#ffa987',
    example: 'Buy a home or keep renting?',
    keywords: ['home ', 'house', 'buy a home', 'buy a house', 'mortgage', 'rent', 'apartment', 'flat', 'property', 'renovat', 'first home', 'landlord', 'tenant'],
    defaults: { a: 'Buy a home', b: 'Keep renting', c: 'Explore calmly' },
    stayWords: ['rent', 'stay', 'remain', 'wait', 'not buy', 'keep'],
    echoes: ['euOwn'],
    forks: {
      a: {
        tagline: 'A place that becomes yours',
        supports: [
          'A meeting with an expert (bank, notary or adviser) before deciding',
          'A list of three things the home must have and three you can give up',
          'A cushion of calm in your accounts even after the initial costs',
        ],
        horizons: {
          d1: H('You have decided: the hardest part, choosing, is behind you, and the mind begins to bring out the good sides of the home you imagine.', 'Relief', 'gilbertEbert'),
          w1: H('Viewings, numbers, paperwork: it is the most laborious phase, and every concrete step makes the home a little more real.', 'Concreteness'),
          m3: H('You start finding your corners: the morning light, the spot for the coffee. Difficult emotions, if there were any, tend to last less than we predict.', 'Rootedness', 'immune'),
          y1: H('A year later the home bears your mark. In Italy 77.1% of people live in a home they own (Eurostat, 2025): it is a very common road.', 'Roots', 'euOwn'),
        },
        evidence: ['gilbertEbert', 'euOwn', 'immune'],
      },
      b: {
        tagline: 'Lightness and freedom to move',
        supports: [
          'A monthly amount that lets you breathe',
          'A corner of the home that feels yours (a plant, a light, a picture)',
          'A date to review the choice',
        ],
        horizons: {
          d1: H('You chose to keep renting: a choice with its advantages, starting with the freedom to change whenever you wish.', 'Freedom', 'gilbertEbert'),
          w1: H('Give today’s home a touch of your own: feeling at home is built from small things.', 'Warmth'),
          m3: H('You have more room to move and the time to look around without rushing.', 'Breathing space'),
          y1: H('A year later you have chosen again, with open eyes. In Italy over one person in five lives in a rented home (22.9%, Eurostat 2025): it is a normal and widely shared road.', 'Belonging', 'euOwn'),
        },
        evidence: ['gilbertEbert', 'euOwn', 'immune'],
      },
      c: {
        tagline: 'Imagine before choosing',
        supports: [
          'Two or three viewings at different times, even just to feel the neighbourhood',
          'A simulation of the numbers done with a competent person',
          'A page in which you write how you would like to live your day at home',
        ],
        horizons: {
          d1: H('You choose to explore: looking at homes without having to decide right away takes off a lot of pressure.', 'Lightness'),
          w1: H('You begin to understand what really matters to you: the light, the neighbourhood, the quiet.', 'Clarity'),
          m3: H('You have a clearer idea of your desire and of the numbers. Whatever decision comes now rests on facts of your own.', 'Confidence'),
          y1: H('A year later your choice rests on real viewings and numbers, not on hypotheses. The mind tends to regain serenity after a change, often faster than we think.', 'Serenity', 'immune'),
        },
        evidence: ['gilbertEbert', 'immune', 'euOwn'],
      },
    },
  },

  amicizia: {
    label: 'A bond',
    color: '#a7f3d0',
    example: 'Write to an old friend or wait for them to get in touch?',
    keywords: ['old friend', 'reconnect', 'write to', 'text him', 'text her', 'call him', 'call her', 'get back in touch', 'reconcile', 'thank', 'gratitude', 'apologi', 'sorry', 'i miss', 'reach out', 'message', 'lost touch', 'forgive'],
    defaults: { a: 'Make the first move', b: 'Wait for the other', c: 'A small sign' },
    stayWords: ['wait', 'let them', 'let him', 'let her', 'get in touch first'],
    echoes: ['liuReach', 'kumar'],
    forks: {
      a: {
        tagline: 'Reopening a door left ajar',
        supports: [
          'A simple line to begin: “You came to mind and it made me happy”',
          'No expectation about when or how the answer will arrive',
          'A moment without rush to write',
        ],
        horizons: {
          d1: H('You decided to get in touch: the relief of having chosen often comes before the message itself.', 'Relief', 'gilbertEbert'),
          w1: H('An unexpected message is usually received with more pleasure than the sender thinks: in the research the surprise counts for more than any awkwardness.', 'Lightness', 'liuReach'),
          m3: H('Whatever the answer was, there is clarity now, and the door was opened by you. Even a bond that changes shape remains part of your story.', 'Clarity'),
          y1: H('A year later you remember having had the courage to write. The quality of relationships is among the best indicators of long-term wellbeing (Harvard).', 'Authenticity', 'harvard'),
        },
        evidence: ['liuReach', 'harvard', 'gilbertEbert'],
      },
      b: {
        tagline: 'Leaving space, with the door open',
        supports: [
          'A date on which you will decide whether to make the move yourself',
          'A good memory of this person, written in two lines',
          'A gesture of care for another bond, meanwhile',
        ],
        horizons: {
          d1: H('You chose to leave space: it is not closing, it is giving time. The mind is grateful not to be forced.', 'Breathing space', 'gilbertEbert'),
          w1: H('You notice how many living bonds you have around you: cultivating those is a form of care too.', 'Warmth'),
          m3: H('You have had time to understand what you really want from this bond, and you choose with more clarity.', 'Clarity'),
          y1: H('A year later you have learned your own way of being in bonds: neither chasing nor closing. Harvard shows that the quality of relationships goes with wellbeing over time.', 'Balance', 'harvard'),
        },
        evidence: ['harvard', 'immune', 'liuReach'],
      },
      c: {
        tagline: 'A thank-you, a photo, a memory',
        supports: [
          'A shared memory to mention in one line',
          'A sincere thanks for something this person gave you',
          'No request, just a thought',
        ],
        horizons: {
          d1: H('You choose a small gesture: small gestures are easy to make and easy to welcome.', 'Lightness'),
          w1: H('Saying thank you has an effect that the person saying it tends to underestimate: in Kumar and Epley’s experiments (2018), recipients of a gratitude letter were more surprised and happier than expected.', 'Warmth', 'kumar'),
          m3: H('The small gesture has relit a thread, or closed a story with gratitude: two good outcomes.', 'Closeness'),
          y1: H('Bonds are cultivated with small, repeated gestures: the quality of relationships goes with wellbeing over time (Harvard).', 'Roots', 'harvard'),
        },
        evidence: ['kumar', 'liuReach', 'harvard'],
      },
    },
  },

  altruismo: {
    label: 'Lending a hand',
    color: '#e9a8ff',
    example: 'Sign up as a volunteer or wait until I have more time?',
    keywords: ['volunteer', 'donat', 'help others', 'charity', 'nonprofit', 'non-profit', 'give back', 'lend a hand', 'solidarity', 'support a cause', 'fundrais'],
    defaults: { a: 'Start now', b: 'Wait until I have more time', c: 'Try it just once' },
    stayWords: ['wait', 'more time', 'postpone', 'later', 'when i have'],
    echoes: ['dunn', 'jenkinson'],
    forks: {
      a: {
        tagline: 'A place where your hand is needed',
        supports: [
          'One hour a week, chosen in advance, no more',
          'An association near you, chosen after a chat',
          'A person to start with together',
        ],
        horizons: {
          d1: H('You decided to lend a hand: the choice already has a meaning, and the mind begins to bring it out.', 'Meaning', 'gilbertEbert'),
          w1: H('You get to know the place, the people, the task: at first you observe and learn, and every small help counts.', 'Belonging'),
          m3: H('You have a rhythm of your own and one more face that greets you. A review of 40 studies found, in observational data, more wellbeing and less depression among people who volunteer.', 'Usefulness', 'jenkinson'),
          y1: H('A year later you have a story of care to tell and new people beside you. In their experiment (2008), people who spent on someone else were happier than people who spent on themselves.', 'Warmth', 'dunn'),
        },
        evidence: ['jenkinson', 'dunn', 'gilbertEbert'],
      },
      b: {
        tagline: 'Preparing the ground for when the time comes',
        supports: [
          'A date to review the choice',
          'Two associations that intrigue you, noted down',
          'A small gesture of help already today, even a tiny one',
        ],
        horizons: {
          d1: H('You chose to wait: a choice with a date is a choice, not a postponement.', 'Calm', 'gilbertEbert'),
          w1: H('You look at which causes touch you most: that alone is a way of getting closer.', 'Clarity'),
          m3: H('You have a precise idea of where and how you would like to be there, and the time to do it well.', 'Direction'),
          y1: H('A year later you chose the right moment with awareness.', 'Wisdom'),
        },
        evidence: ['gilbertEbert', 'immune', 'jenkinson'],
      },
      c: {
        tagline: 'Once, to feel what it is like',
        supports: [
          'A short occasion with no commitment (a morning, a collection)',
          'A person to go with',
          'A way of noticing how you feel afterwards',
        ],
        horizons: {
          d1: H('You choose to try once: the step is small and light.', 'Lightness'),
          w1: H('Even a small gesture counts: in an experiment (Dunn et al., 2008), people who spent a small sum on someone else were happier than those who spent it on themselves.', 'Warmth', 'dunn'),
          m3: H('You have felt what it is really like: you can come back, change place or stop, with a real idea.', 'Clarity'),
          y1: H('A year later you have a real experience to start from: it is worth more than a hundred hypotheses.', 'Reality'),
        },
        evidence: ['dunn', 'jenkinson', 'gilbertEbert'],
      },
    },
  },

  altro: {
    label: 'A choice all your own',
    color: '#c3b4ff',
    example: 'Say yes to this proposal or take some time?',
    keywords: [],
    defaults: { a: 'Take the step', b: 'Take time', c: 'Try on a small scale' },
    stayWords: ['wait', 'time', 'postpone', 'stay', 'no'],
    echoes: ['immune'],
    forks: {
      a: {
        tagline: 'A yes that opens',
        supports: [
          'A trusted person to tell',
          'A first small concrete step to take within two days',
          'A way of celebrating the start',
        ],
        horizons: {
          d1: H('You have decided: the mind begins to bring out the good sides of the choice you made.', 'Relief', 'gilbertEbert'),
          w1: H('In the first days everything is new and a bit tiring: it is normal, it is the phase in which you find your bearings.', 'Orientation'),
          m3: H('At three months your mind has adapted: difficult emotions tend to last less than we predict.', 'Adaptation', 'immune'),
          y1: H('A year later the choice is part of your story, and you have learned to steer it.', 'Story'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
      b: {
        tagline: 'Time as an ally',
        supports: [
          'A date on which you will decide',
          'Three things you want to understand before deciding',
          'A person to reason out loud with',
        ],
        horizons: {
          d1: H('You chose to give yourself time: a choice with a date is a choice, not a postponement.', 'Breathing space'),
          w1: H('You gather information and sensations calmly. Every detail noticed is one more light.', 'Attention'),
          m3: H('You have enough elements to decide calmly, and the mind tends to adapt well to what it chooses.', 'Clarity', 'immune'),
          y1: H('A year later you can recognise the right moment to choose.', 'Wisdom'),
        },
        evidence: ['immune', 'gilbertEbert'],
      },
      c: {
        tagline: 'A small, real trial',
        supports: [
          'A small action, reversible in time and cost',
          'A trial length decided in advance',
          'A way of noticing how you feel',
        ],
        horizons: {
          d1: H('You choose a small trial: the fog starts to clear from the very first step.', 'Lightness'),
          w1: H('You have a real experience to start from: it is worth more than a hundred hypotheses.', 'Reality'),
          m3: H('You have seen how you get on. Whatever the decision, it now rests on facts of your own.', 'Confidence'),
          y1: H('A year later your choice has its roots in experience.', 'Roots'),
        },
        evidence: ['gilbertEbert', 'immune'],
      },
    },
  },
};

export const SIGNS = {
  d1: 'Today notice one thing that already feels a little lighter.',
  w1: 'This week notice a moment when the choice felt right.',
  m3: 'Notice one thing you can do now that you could not before.',
  y1: 'Notice one thing you can say today without hesitating.',
};

// Safety detection (on-device only). Mirrors the Italian list.
export const CRISIS_PATTERNS = [
  /suicid/i, /kill myself/i, /end it all/i, /take my (own )?life/i, /don'?t want to live/i, /do not want to live/i,
  /hurt myself/i, /want to die/i, /self[- ]?harm/i, /end my life/i,
];

export const PRO_PATTERNS = [
  /medication/i, /\btherapy\b/i, /diagnos/i, /surgery/i, /chemo/i, /pregnan/i, /abortion/i, /lawyer/i, /lawsuit/i,
  /divorce/i, /mortgage/i, /invest/i, /crypto/i, /\bloan\b/i, /\bdebt/i, /court/i, /psychiatr/i,
];

export const PERSONAL = {
  fear: {
    label: 'some doubts',
    kw: /(afraid|scared|fear|anxious|anxiety|worried|worry|doubt\w*|not sure if|unsure|nervous|insecure)/i,
    roles: {
      a: 'Doubts show that you care. A small step and a review date make them useful travelling companions.',
      b: 'Having doubts and choosing to wait is a lucid choice, especially with a date to take stock.',
      c: 'With a few doubts, the small trial is the most fitting door: it gives you facts in place of hypotheses.',
    },
    d1: 'Write the doubt in a single line: giving it a shape is a first way of getting to know it.',
    w1: 'Reread the doubt from a week ago and notice whether it has changed shape.',
  },
  family: {
    label: 'family',
    kw: /\b(kids?|child|children|baby|family|husband|wife|spouse|boyfriend|girlfriend|partner|grandchild\w*)\b/i,
    roles: {
      a: 'With family in the picture, the step works well if you tell the people you love in simple words, with a date and three things that stay the same.',
      b: 'Staying can be a gift for the people you live with: stability and shared time, chosen together.',
      c: 'Trying on a small scale is a gentle way of involving the family: you try together, with nobody giving anything up.',
    },
    d1: 'Talk about it today with someone you love: sharing the choice usually makes it lighter.',
    w1: 'Look for a moment this week when the choice fitted well into home life.',
  },
  money: {
    label: 'budget',
    kw: /(money|savings?|salary|budget|mortgage|\brent\b|debts?|expenses|\bcosts?\b|afford|financial|\bloan\b)/i,
    roles: {
      a: 'With the numbers in mind, a good anchor is setting a spending limit in advance and a date to redo the sums: financial calm is part of the door.',
      b: 'Staying makes the numbers more predictable: a good moment to set aside a small cushion.',
      c: 'The small trial has a concrete advantage: it costs little and gives real numbers to decide on.',
    },
    d1: 'Write in one line the amount you are calm with: it is your fixed point.',
    w1: 'Compare three real numbers: what you knew, what you found out, what you need.',
  },
  time: {
    label: 'little time',
    kw: /(little time|no time|not enough time|free time|schedule|tired|exhausted|\bbusy\b|packed)/i,
    roles: {
      a: 'With little time, start from the smallest step possible: ten minutes a week, always at the same hour.',
      b: 'The time you have is precious: staying leaves you energy for what matters now.',
      c: 'The small trial fits a full calendar: a short window, decided in advance.',
    },
    d1: 'Block ten minutes in your calendar for the first step.',
    w1: 'If the week is full, even a tiny step counts: what matters is that it is yours.',
  },
  parents: {
    label: 'parents',
    kw: /(parents|\bmum\b|\bmom\b|\bdad\b|grandparent\w*|mother|father|my folks)/i,
    roles: {
      a: 'With parents in the picture, telling them about the choice calmly and fixing a date to speak again usually reassures everyone.',
      b: 'Staying can mean being there for the people dear to you, choosing how much and how.',
      c: 'A small trial lets you feel how bonds with your parents fit in, without final decisions.',
    },
    d1: 'A phone call to someone dear to you, even a short one, gives the choice a little more light.',
    w1: 'Set a recurring appointment with someone dear to you (a call, a dinner): it is a fixed point.',
  },
  dream: {
    label: 'a dream',
    kw: /(dream\w*|passion|always wanted|\bwish\b|since i was)/i,
    roles: {
      a: 'If it is a dream, the door already has the most important thing: direction. The rest is built one step at a time.',
      b: 'A dream that waits stays a lit dream, if you give it a date and a small gesture of care.',
      c: 'Trying the dream on a small scale gives it a body: it is the gentlest way of finding out what it really wants.',
    },
    d1: 'Write in one line what shines for you in this choice: it is your thread.',
    w1: 'Do one tiny thing today that belongs to the dream: a phone call, a search, a sketch.',
  },
};
export const FLAG_ORDER = ['fear', 'family', 'money', 'time', 'parents', 'dream'];

export const PERSON_CATS = ['relazioni', 'amicizia'];
export const PERSON_ROLES = {
  a: 'With {name}, a quiet moment counts for more than perfect words.',
  b: 'Giving time to what is there with {name} is also a way of listening to yourself.',
  c: 'A small gesture toward {name} speaks for itself, with no need for explanations.',
};
export const PLACE_ROLES = {
  a: 'If the choice leads to {name}, already knowing three concrete things about the place (a street, a spot, a person) makes it feel familiar right away.',
  b: 'Staying does not close {name}: that door is still there and you can reopen it whenever you wish.',
  c: 'A small trial of {name}, even just a weekend, turns imagination into real memories.',
};
export const TIME_NOTE = 'This is the time you mentioned (“{label}”): a good moment to take stock.';
export const FEAR_INTRO = 'You mentioned some doubts: it is a sign that you care. Here you will find doors made for crossing them, one step at a time.';
