// Everyday advice (English). Qualitative: common sense and common habits, no statistics.
// Each idea: title (name of the path), headline (follows "My advice:"), why (2 reasons), step (a concrete first step).

export const DAILY_TEXT = {
  cena: {
    label: 'Dinner', example: 'What should I cook tonight?',
    ideas: {
      pasta: { title: 'One-pot pasta', headline: 'tonight, pasta with what you already have at home: one pot, 15 minutes, no hard decisions.', why: ['When you are unsure, the simplest dish usually wins: less spending, fewer dishes, fewer thoughts.', 'Garlic, oil and chilli, or a jar of tomato sauce: whatever you find is enough.'], step: 'Put the water on the stove now: while it boils, you decide the sauce.' },
      frigo: { title: 'Empty the fridge', headline: 'empty the fridge: an omelette, or fried rice with the vegetables that are about to run out.', why: ['Using what you have is the cheapest and easiest dinner.', 'One pan also means few dishes to wash.'], step: 'Open the fridge, take three things that go well together and cook them in the same pan.' },
      veloce: { title: 'Ready in 10 minutes', headline: 'something that takes 10 minutes: eggs, or bread, cheese and a salad.', why: ['When you are tired, a simple dinner is already a good dinner.', 'Tomorrow, with more energy, you will feel like cooking something nicer.'], step: 'Pick the thing you can cook in a single pan and eat it without rushing.' },
      ordina: { title: 'Order in', headline: 'tonight, order something you really like, and enjoy it.', why: ['An evening off from the stove is part of a week that works.', 'The dish that comes to mind first is usually the right one.'], step: 'Order within 5 minutes and still set the table: it changes the mood of the evening.' },
      ospiti: { title: 'A tray to the table', headline: 'cook one tray: a baked pasta or roasted vegetables, so you stay with your guests and not at the stove.', why: ['A dish that cooks by itself leaves you time to be present.', 'Simple, generous food always makes a lovely table.'], step: 'Prepare everything ahead, put it in the oven, and the last hour is all yours.' },
      zuppa: { title: 'A warm soup', headline: 'a warm soup: chickpeas or lentils, stock, a drizzle of oil.', why: ['In cold or rainy weather, something hot in a bowl feels like home.', 'It takes one pot and is even better the next day.'], step: 'Fry an onion, add the legumes and the stock: 20 minutes and you are done.' },
      fresco: { title: 'A fresh dish', headline: 'a cold dish: rice or pasta salad, or tomatoes and mozzarella.', why: ['In hot weather you do not need the stove on for long.', 'You can prepare it ahead and eat it calmly.'], step: 'Cook the pasta or rice, rinse it in cold water and add whatever fresh things you have.' },
      leggero: { title: 'Light and simple', headline: 'vegetables and a simple protein: eggs, legumes or baked fish.', why: ['A light dish leaves you energy for the rest of the evening.', 'Few ingredients, clear flavours, little effort.'], step: 'Put the vegetables in the oven and, meanwhile, cook the protein in a pan.' },
    },
  },
  serata: {
    label: 'Evening', example: 'Should I go out or stay in tonight?',
    ideas: {
      'esci-poco': { title: 'Out, but for one hour', headline: 'go out, but only for one hour: if you do not feel like it, you go home and you have still done your part.', why: ['Often the mood arrives after you start, not before.', 'With a time limit, the decision weighs much less.'], step: 'Pick the closest place to home and tell whoever is waiting: "I will stay an hour."' },
      resta: { title: 'Stay in', headline: 'stay in and do it well: couch, something good to eat, phone far away.', why: ['Resting is a choice, not giving something up: tomorrow you are more present for the people you care about.', 'When you are tired, a night out often costs more energy than it gives back.'], step: 'Make the dinner you love and turn off notifications for two hours.' },
      'esci-vai': { title: 'Out, gladly', headline: 'go out: when someone invites you and you feel like it, the evening usually recharges you more than it takes to get ready.', why: ['Being with people is one of the simplest ways to feel better.', 'An invitation accepted today is a nice memory tomorrow.'], step: 'Say yes now, before the doubt arrives, and pick what to wear.' },
    },
  },
  messaggio: {
    label: 'A message', example: 'Should I text them or wait?',
    ideas: {
      scrivi: { title: 'Write now', headline: 'text them, short and kind, without expecting an answer.', why: ['A simple message costs little; waiting for days usually makes it harder to write.', 'If the answer does not come right away, it says nothing about you: people have busy days.'], step: 'One line, one true thing: "You crossed my mind, how are you?" Then put the phone down.' },
      aspetta: { title: 'Wait and reread tomorrow', headline: 'write the message if you like, but do not send it tonight: reread it tomorrow morning.', why: ['When we are agitated, words come out harsher than we mean them.', 'If tomorrow you would send it unchanged, it is a message worth sending.'], step: 'Save it in your notes, close the chat and do something with your hands: a shower, a walk.' },
      scusa: { title: 'Say sorry', headline: 'write to say sorry, without a "but" and without long explanations.', why: ['A short, sincere apology is worth more than a long one full of justifications.', 'The person who receives it understands right away that you care.'], step: '"I am sorry for…, I needed to tell you." That is all, then leave some space.' },
      rispondi: { title: 'Reply now', headline: 'reply now with one simple line, even just to say you are thinking about them.', why: ['Replying late is normal: the kindest thing is to do it, not to do it perfectly.', 'A "I will answer properly tonight" keeps the door open.'], step: 'Write the first sentence that comes to mind and send it.' },
      chiama: { title: 'Call', headline: 'call: for some things, two minutes of voice are worth twenty messages.', why: ['A voice removes the misunderstandings that text creates.', 'Everything is settled in less time.'], step: 'Send "Do you have two minutes for a call?" and then phone.' },
    },
  },
  outfit: {
    label: 'What to wear', example: 'What should I wear tonight?',
    ideas: {
      comodo: { title: 'Comfortable, with one detail', headline: 'wear what makes you feel most at ease, plus one polished detail: a nice jacket, clean shoes or an accessory you like.', why: ['When you feel good in your clothes, it shows in how you move.', 'One polished detail is enough to make everything look intentional.'], step: 'Pick the shoes first, then build the rest around them.' },
      lavoro: { title: 'Neat and calm', headline: 'neat, calm and comfortable: a neutral colour and one detail that feels like you.', why: ['In a work setting, what matters is feeling put together and not thinking about it.', 'If you do not have to adjust every five minutes, you are more present.'], step: 'Try it on last night: if you keep fixing it, change it.' },
      appuntamento: { title: 'The one I feel sure in', headline: 'pick the piece in which you feel most confident, not the one that seems "prettiest".', why: ['Confidence is what people notice most.', 'With something comfortable you are more natural in conversation.'], step: 'Put it on, look in the mirror for a second, smile and head out.' },
      strati: { title: 'In layers', headline: 'think in layers: a light base, a sweater and a jacket that shelters you.', why: ['Layers come off and go back on: you adapt to every room.', 'You do not have to guess the temperature for the whole day.'], step: 'Check your shoes: if it rains, pick the ones that keep water out.' },
      leggero: { title: 'Light and bright', headline: 'light fabrics and bright colours, and shoes you can walk in.', why: ['In the heat, comfort comes before style, and style benefits.', 'Cotton and linen breathe better than almost anything.'], step: 'Bring one light layer in case the evening cools down.' },
      festa: { title: 'One special piece', headline: 'one special piece and everything else simple: that way attention goes where you want it.', why: ['If everything is special, nothing is: a single piece makes the difference.', 'The simple rest leaves you free to move and dance.'], step: 'Choose the special piece today and lay everything else on the chair, ready.' },
    },
  },
  palestra: {
    label: 'Workout', example: 'Gym now or tomorrow?',
    ideas: {
      piccola: { title: 'A small version', headline: 'go for 20 minutes, not a full hour: if after 10 minutes you feel like it, keep going.', why: ['Starting is the hardest part: a small version makes it possible.', 'A short workout done is worth more than a long one postponed.'], step: 'Set a 20-minute timer and do only what feels easiest.' },
      adesso: { title: 'Go now', headline: 'go now: the right moment is the one in which you actually manage to go.', why: ['Postponing to tomorrow often means postponing again.', 'You do not need a perfect workout: even a short one counts.'], step: 'Bag in hand and out the door within 10 minutes.' },
      riposo: { title: 'Rest today', headline: 'rest today or just take a walk, and pick it up tomorrow.', why: ['The body gets stronger on rest days too.', 'Listening to tiredness is part of training.'], step: 'If you feel like it, 15 minutes on foot; if you have a fever or pain, rest and ask your doctor.' },
      domani: { title: 'Tomorrow, at a set time', headline: 'tomorrow is fine, but decide the time now and pack your bag tonight.', why: ['"Tomorrow" with a precise time is a plan; without a time it is a postponement.', 'A packed bag removes half the effort of getting started.'], step: 'Set the alarm, pack the bag and tell someone.' },
    },
  },
  compra: {
    label: 'A purchase', example: 'Should I buy it or wait?',
    ideas: {
      aspetta: { title: 'Wait 24 hours', headline: 'wait 24 hours: if tomorrow you still want it, buy it without overthinking.', why: ['Timed offers are designed to make you decide fast; one night removes the rush.', 'If after a day you still miss it, it is a real wish, not an impulse.'], step: 'Save it in the cart or in your notes and put the phone away. Tomorrow ask yourself: do I still want it?' },
      compra: { title: 'Buy it', headline: 'buying it makes sense: if you truly need it, waiting costs more than the purchase.', why: ['Something you use every day pays back its price in comfort.', 'Comparing two or three shops for ten minutes is enough, then close it.'], step: 'Set your maximum budget, compare two shops, then buy and do not look at the price again.' },
      'gia-ho': { title: 'Use what I have', headline: 'do not buy it now: you already have something similar; use that for a month and then reconsider.', why: ['New things feel great at first and then become normal.', 'If in a month you truly miss something, you will know it for real.'], step: 'Write in your notes what it would give you over what you have.' },
      budget: { title: 'Set a ceiling first', headline: 'wait and set a spending ceiling: decide first how much you are willing to spend, then search.', why: ['A limit decided with a cool head protects you from choices made in excitement.', 'Inside a budget the choice becomes simpler and calmer.'], step: 'Write a maximum amount, and if the item goes over it, look for an alternative.' },
    },
  },
  weekend: {
    label: 'What to do', example: 'What should I do this weekend?',
    ideas: {
      fuori: { title: 'Outdoors', headline: 'go outside for a couple of hours, with no fixed plan: a walk, a market, a coffee somewhere new.', why: ['Walking and looking around changes your mood more than you think.', 'Not planning too much leaves room for surprises.'], step: 'Put your shoes on now and pick a direction: decide as you go.' },
      persone: { title: 'Someone who does me good', headline: 'see someone who makes you feel good: send a message now and suggest a coffee.', why: ['A simple invitation is worth more than many complicated plans.', 'Even one person changes the tone of the whole day.'], step: '"Want a coffee today or tomorrow?" Send it and see what comes back.' },
      riposa: { title: 'A slow day', headline: 'give yourself a slow day: free alarm, one good meal and a single thing to do.', why: ['After a full week, rest is the most productive thing.', 'A single thing to do leaves you feeling you did enough.'], step: 'Choose the one thing for the day now, and the rest is yours.' },
      mani: { title: 'Something with my hands', headline: 'make something with your hands: cook a new recipe, tidy a drawer that weighs on you, draw or play.', why: ['Doing something concrete cures boredom better than a screen.', 'At the end you have a result you can look at.'], step: 'Pick the first thing that comes to mind and work on it for 30 minutes.' },
      progetto: { title: 'One small project', headline: 'pick one small project and finish it before lunch: then the rest of the day is free.', why: ['A finished project gives more satisfaction than three started ones.', 'Knowing what is left to do makes you lighter.'], step: 'Write the project in one line and start with the easiest part.' },
    },
  },
  focus: {
    label: 'Study and work', example: 'Keep studying or take a break?',
    ideas: {
      continua: { title: 'Another 25 minutes', headline: 'keep going for another 25 minutes with a timer, then take a real 5-minute break.', why: ['A defined time makes the task lighter: you already know when it ends.', 'A planned break rests you more than a stolen one.'], step: 'Write in one line what you want to finish, start the timer and silence the phone.' },
      pausa: { title: 'Break now', headline: 'take a 15-minute break now: away from the screen, water, window open.', why: ['After hours in a row the mind gives less and less: a break gets time back.', 'Often the solution arrives when you stop looking for it.'], step: '15-minute timer, phone in another room, then restart from the easiest point.' },
      inizia: { title: 'Five minutes to start', headline: 'start with just 5 minutes: open the file and write the first line.', why: ['Starting is the hard part; after five minutes the rest often flows.', 'If after five minutes you want to stop, you have still opened the way.'], step: 'Open the document now and write the first sentence, even a rough one.' },
      chiudi: { title: 'Stop for tonight', headline: 'stop for tonight: review only the key points and go to sleep.', why: ['At night you learn less and it takes more effort.', 'Sleep helps lock in what you have already studied.'], step: 'Write the three things to pick up tomorrow on a sheet, then turn off the light.' },
    },
  },
  faccende: {
    label: 'Chores', example: 'Should I clean now or leave it?',
    ideas: {
      timer: { title: 'Ten minutes, one room', headline: 'set a 10-minute timer and do just one room: when it rings, you are free to stop.', why: ['A short time makes the effort bearable.', 'Often, when the timer rings, you already feel like finishing.'], step: 'Pick the room and start the timer now.' },
      'una-cosa': { title: 'Just one thing', headline: 'pick just one thing, the most visible, and do it now: the rest can wait.', why: ['When everything seems too much, one thing done lifts weight.', 'Seeing one corner in order gives energy for the rest.'], step: 'Look around, pick the object or corner that bothers you most and sort it out.' },
      musica: { title: 'With my music', headline: 'put on your favourite music and do the thing that weighs on you most first.', why: ['Music makes time lighter.', 'Removing the heaviest thing first makes the rest feel easy.'], step: 'Pick a 20-minute playlist and begin with the thing you have postponed longest.' },
      stasera: { title: 'Leave it tonight', headline: 'leave it tonight: only sort out what you need tomorrow morning.', why: ['When you are tired, chores weigh double.', 'Tomorrow, rested, you do them in half the time.'], step: 'Lay out your clothes and leave the kitchen ready for breakfast.' },
    },
  },
  regalo: {
    label: 'A gift', example: 'What gift should I get for a friend\'s birthday?',
    ideas: {
      ascolto: { title: 'Something they said', headline: 'choose something that shows you listened: a thing the person mentioned, even in passing, in recent months.', why: ['A gift that recalls a sentence said long ago makes someone feel seen.', 'You do not need to spend much: it needs to be thought for them.'], step: 'Recall a sentence with "I wish" or "I would love" and search from there.' },
      esperienza: { title: 'A moment together', headline: 'give a moment: a dinner together, a ticket to something, a day designed for the person.', why: ['When a person already has everything, time together is what is missing.', 'Memories last longer than objects.'], step: 'Pick a date and write it on a card to hand over on the birthday.' },
      scritto: { title: 'A card and a small gesture', headline: 'a handwritten card with a true memory, along with a small thing the person loves.', why: ['A well-written memory is worth more than an expensive object.', 'On a small budget, the thought makes all the difference.'], step: 'Write three lines about a shared moment and add their favourite sweet or flower.' },
      piccolo: { title: 'Small and shared', headline: 'something small to share: a sweet, a good coffee, a flower.', why: ['A simple gesture is perfect when the bond is professional or with a neighbour.', 'Something to share puts everyone at ease.'], step: 'Pick a local product and add a card with your name.' },
    },
  },
  sonno: {
    label: 'Rest', example: 'Should I go to bed or watch one more episode?',
    ideas: {
      letto: { title: 'Go to sleep', headline: 'go to sleep: the story is not going anywhere, tomorrow you will find it just as it was.', why: ['Sleep improves almost the whole next day, from mood to patience.', 'One more episode tonight often becomes tiredness tomorrow.'], step: 'Plug the phone in away from the bed and turn off the light within 15 minutes.' },
      capitolo: { title: 'One last chapter', headline: 'one more chapter, then lights out: decide now where you stop.', why: ['A limit decided beforehand is easier to keep.', 'Reading relaxes you more than a bright screen.'], step: 'Choose the chapter where you stop and put a marker in the book.' },
      sveglia: { title: 'Up at the first alarm', headline: 'get up at the first alarm and keep the phone away from the bed.', why: ['Snoozing breaks sleep into small pieces and usually does not rest you more.', 'Starting the day with a decisive gesture sets the tone for the rest.'], step: 'Tonight, move the alarm to the other side of the room.' },
      riposino: { title: 'A short nap', headline: 'yes to the nap, but a short one: 20 minutes with an alarm.', why: ['A short nap recharges you without letting deep sleep set in.', 'If it runs too long, you get up groggier than before.'], step: 'Set the alarm for 20 minutes, close your eyes and do not think about the to-do list.' },
    },
  },
  guardo: {
    label: 'Couch evening', example: 'What should I watch tonight?',
    ideas: {
      comfort: { title: 'Something I already love', headline: 'rewatch something you already love: tonight you do not need to discover, you need to feel good.', why: ['Stories you know make you feel good without effort.', 'You do not waste the evening choosing.'], step: 'Open the title that comes to mind first and press play.' },
      nuovo: { title: 'Something new, with a rule', headline: 'choose in 5 minutes: open three titles, keep the first that intrigues you and give it a 20-minute chance.', why: ['With a rule, choosing becomes a game and not a problem.', 'If after 20 minutes it does not grab you, you switch without any fuss.'], step: 'Start a 5-minute timer to choose and respect it.' },
      leggere: { title: 'A book', headline: 'a book: read for 20 minutes, and if it does not grab you, switch.', why: ['Reading in the evening calms the mind better than scrolling on the phone.', 'Twenty minutes is enough to know if a book is for you.'], step: 'Put the phone in another room and read two pages.' },
      leggero: { title: 'Something light', headline: 'a comedy or a series with short episodes: light and no thinking.', why: ['When you are tired the body asks for easy stories.', 'Short episodes stop whenever you want.'], step: 'Pick a cheerful title and set a limit: two episodes, then bed.' },
      insieme: { title: 'To watch together', headline: 'pick a film everyone likes: whoever proposes chooses, but you vote between two.', why: ['A simple rule avoids the argument over the remote.', 'Watching together is part of the pleasure.'], step: 'Everyone proposes one title and you vote straight away, without reopening it.' },
    },
  },
};

export const BIG_ADVICE = {
  lavoro: { headline: 'before deciding, run a small experiment: talk to someone who does the job that attracts you, or ask for an exploratory interview.', why: ['Changing is easier to judge when you have first-hand information.', 'A coffee or an interview does not commit you: it shows you what is beyond the door.'], step: 'This week, write to someone who does that job: "Could I ask you two questions?"' },
  trasloco: { headline: 'try the place first: a long weekend there, living it like a resident, not like a tourist.', why: ['A place is understood from ordinary days, not from photos.', 'Deciding after living it removes half the doubts.'], step: 'Book a weekend, do the shopping, take public transport and notice how you feel on Monday.' },
  relazioni: { headline: 'say what you feel simply and without expectations, in person or by phone, when you are both calm.', why: ['Saying it calmly is a gift to the other person too: they know what you think.', 'You do not need the perfect speech: two true sentences are enough.'], step: 'Write the two sentences you want to say, read them aloud and pick the moment.' },
  studio: { headline: 'try a taste: an open class, a short course or a chat with someone already inside.', why: ['From the outside a field of study looks different from how it is lived.', 'A taste costs little and gives you real information.'], step: 'Look for an open class or write to someone who followed that path.' },
  impresa: { headline: 'start small while you still have an income: a first client or a first sale, before changing everything.', why: ['A first client tells you more than a thousand plans.', 'Starting small leaves you room to learn.'], step: 'Write in one line what you offer and to whom, and look for the first client in the next two weeks.' },
  acquisto: { headline: 'wait a few days and set a spending ceiling: compare at least two alternatives before deciding.', why: ['For important purchases, time is a resource that works for you.', 'With a ceiling decided calmly, you choose better.'], step: 'Write the maximum amount and two alternatives, then come back to the decision in three days.' },
  salute: { headline: 'start from a ridiculously small version, from today: 10 minutes, not the perfect Monday plan.', why: ['A habit comes from repetition, not intensity.', 'Starting small today beats starting big on Monday.'], step: 'Choose one 10-minute action and set the time you will do it tomorrow.' },
  casa: { headline: 'write down what you truly need in the coming years, then have an independent adviser run a serious calculation.', why: ['A home choice is big: it deserves real numbers and your own priorities.', 'Clarifying what you need makes comparing the paths much simpler.'], step: 'List three must-haves and three nice-to-haves, then book a consultation.' },
  amicizia: { headline: 'write first: a short, warm message, expecting nothing in return.', why: ['Whoever receives a message like this is usually glad that someone took the first step.', 'A bond is rekindled by a small gesture, not by a long speech.'], step: '"I thought of you today, how are you?" Send it and leave the door open.' },
  altruismo: { headline: 'start with one hour, not a commitment: try an activity near home and see how it feels.', why: ['Trying for an hour tells you more than a lot of reflection.', 'You can always do more later, if it makes you feel good.'], step: 'Find an organisation near you and ask how to try it for one hour.' },
};

export const METHODS = {
  reversibile: { headline: 'choose the path you can change most easily, and take a small first step today.', why: ['When a choice can be corrected, trying costs little and teaches a lot.', 'A small first step gives you real information, more than a thousand thoughts.'], step: 'On a sheet of paper write what would change in a week with "{a}" and with "{b}": keep the path that lets you breathe better.', stepSolo: 'On a sheet of paper write the smallest possible first step and do it today or tomorrow; if you cannot find one, wait and reread tomorrow.' },
  sonno: { headline: 'do not decide now: sleep on it and answer tomorrow morning with the first thing that comes to mind.', why: ['A rested mind sees more paths than a tired one.', 'If your first answer in the morning brings relief, it is worth listening to.'], step: 'Write the question on a sheet, put it by the bed and tomorrow morning write the first answer under it.' },
  persona: { headline: 'talk it over with someone you trust: saying it aloud clarifies more than a thousand thoughts.', why: ['Explaining a choice to someone shows you what really matters.', 'People who know you see things you cannot see from inside.'], step: 'Pick who today, and write: "I have a decision to make, will you listen for ten minutes?"' },
  moneta: { headline: 'flip a coin, but watch how you feel while it is in the air: often you already know what you hope for.', why: ['What matters is not what the coin says but what you hope while it spins.', 'It helps you feel a preference that reasoning covers up.'], step: 'Heads is the first path, tails the second: before it lands, notice what you hope for.' },
};

export const UI_NOTES = {
  daily: 'Common-sense advice, no statistics: you know things I do not.',
  big: 'Advice about method: I do not know the details of your life. For sources and the picture over time, see the paths above.',
  general: 'I do not know the details of your situation: this is advice about method, which you can adapt.',
};

export const SCENES = {
  'cena.pasta': ['simple and warm', ['The water is boiling and the kitchen smells of garlic: you have decided without noticing.', 'A steaming bowl on the table, few dishes in the sink and the evening still all yours.', 'A light morning: nothing to tidy and leftover pasta ready for lunch.'], ['concrete', 'warm', 'light']],
  'cena.frigo': ['with what you have', ['The pan sizzles and the fridge finally has some room.', 'A dinner invented on the spot, and a little pride at wasting nothing.', 'A tidier fridge and a shorter shopping list tomorrow.'], ['resourceful', 'satisfied', 'tidy']],
  'cena.veloce': ['no effort', ['Ten minutes and you are at the table, without moving half the kitchen.', 'Tiredness melts on the couch with something warm inside you.', 'Slept well and in the mood to cook something nicer tonight.'], ['relieved', 'relaxed', 'rested']],
  'cena.ordina': ['a break from the stove', ['You chose in a minute and the phone does the rest: five minutes of waiting.', 'The box opens, the table is set and for once nobody washes anything.', 'A morning with no pots in the sink.'], ['free', 'pampered', 'calm']],
  'cena.ospiti': ['a big table', ['The tray is in the oven and you still have time to change and put music on.', 'Guests laugh, the tray goes from hand to hand and you are never stuck in the kitchen.', 'A few thank-you messages and the feeling of a lovely evening.'], ['organised', 'present', 'happy']],
  'cena.zuppa': ['warm and simple', ['A fried onion that smells like home, and the rain outside feels farther away.', 'A warm bowl in your hands: exactly what was needed.', 'The rest of the soup, even better, waits for lunch.'], ['sheltered', 'cosy', 'prepared']],
  'cena.fresco': ['fresh, no stove', ['The rice is in cold water and the kitchen does not turn into a sauna.', 'A cool dinner, a window open, no hurry.', 'The leftovers are already a light lunch.'], ['cool', 'calm', 'comfortable']],
  'cena.leggero': ['clear and light', ['Vegetables in the oven and a smell of herbs: the kitchen is tidy.', 'A colourful, light dish that leaves energy for what comes next.', 'You wake up light and with a clear head.'], ['clear', 'satisfied', 'energetic']],
  'serata.esci-poco': ['an hour, then see', ['You are already out: the hardest part is already behind you.', 'After an hour, either you leave with a clear conscience or you stay because you are enjoying it.', 'An evening you can tell in two sentences, and the feeling of having done something.'], ['curious', 'light', 'satisfied']],
  'serata.resta': ['a slow evening', ['The phone is in another room and the couch welcomes you.', 'A dinner you love, a blanket, something nice to watch: the evening is yours.', 'A rested morning, with more patience for everyone.'], ['safe', 'relaxed', 'rested']],
  'serata.esci-vai': ['in good company', ['You are getting ready and notice you are smiling.', 'Laughter, a chat you did not expect, time flying.', 'A good tiredness and a memory to keep.'], ['energised', 'alive', 'grateful']],
  'messaggio.scrivi': ['one kind line', ['You press send and your heart speeds up a bit, then settles.', 'The phone buzzes, or it does not: either way you made the gesture.', 'A reply that arrived overnight, or the calm of having opened the door.'], ['brave', 'waiting', 'calm']],
  'messaggio.aspetta': ['a night of pause', ['You write it all in your notes, and already the words feel less sharp.', 'The night puts things in order: you fall asleep with a slightly emptier head.', 'You reread in the morning: change two words, or decide to send nothing.'], ['agitated', 'calmer', 'clear']],
  'messaggio.scusa': ['a short apology', ['You write the true sentence, no "but", no explanations, and press send.', 'You have done your part; now you leave the other person the time they need.', 'More lightness on waking, whatever arrived meanwhile.'], ['tense', 'lighter', 'at peace']],
  'messaggio.rispondi': ['a simple reply', ['One line and you have set down the weight you carried for hours.', 'On the other side comes a smile, or an emoji: that is fine.', 'The conversation is open again and one worry fewer.'], ['relieved', 'calm', 'light']],
  'messaggio.chiama': ['two minutes of voice', ['It rings and for two seconds you do not know what to say; then the voice starts.', 'Two minutes are enough: the misunderstandings the text was growing dissolve.', 'The next day you smile thinking about the call.'], ['tense', 'loosened', 'glad']],
  'outfit.comodo': ['at ease', ['You look in the mirror and for once change nothing.', 'You move without thinking about clothes, and the detail you chose makes someone smile.', 'You hang everything up, ready for another time.'], ['at ease', 'confident', 'tidy']],
  'outfit.lavoro': ['neat and sure', ['Neat, calm, put together: you leave home with no second thoughts.', 'All day you do not touch your collar even once.', 'The next morning you already know what to wear.'], ['composed', 'present', 'prepared']],
  'outfit.appuntamento': ['simply confident', ['You smile at the mirror, take your keys and go.', 'You feel like yourself, and it shows in the way you talk.', 'You think back on the evening and remember the conversations, not the clothes.'], ['confident', 'natural', 'calm']],
  'outfit.strati': ['in layers', ['A jacket that shelters and a sweater you can take off: you are ready for anything.', 'Warm inside, cold outside: you adapt without thinking.', 'Dry and warm on the way back too.'], ['sheltered', 'at ease', 'dry']],
  'outfit.leggero': ['light and bright', ['Cotton on your skin and the right shoes: the heat weighs less.', 'You walk all evening without thinking about your feet.', 'A fresh day and clothes that are easy to wash.'], ['cool', 'comfortable', 'light']],
  'outfit.festa': ['one special piece', ['The special piece is already on the chair: the rest is simple.', 'People notice, and you dance without thinking about anything.', 'You come back with the good tiredness of a great party.'], ['special', 'free', 'happy']],
  'palestra.piccola': ['twenty minutes, that is all', ['Shoes on, timer started: the hard part is already over.', 'You did twenty minutes, maybe ten more: the body says thank you.', 'You wake up feeling you kept a small promise.'], ['started', 'proud', 'in rhythm']],
  'palestra.adesso': ['right now', ['Bag in hand, home behind you: you are already on the street.', 'The shower after training and the evening begins in a higher gear.', 'A morning with a bit more energy.'], ['decided', 'charged', 'energetic']],
  'palestra.riposo': ['a day of rest', ['Couch or a slow walk: the body has time to recover.', 'The evening flows softly, and tomorrow you restart stronger.', 'Relaxed muscles and a wish to train again.'], ['calm', 'relaxed', 'rested']],
  'palestra.domani': ['tomorrow, at a set time', ['The bag is packed and ready, and the alarm is set.', 'The evening passes without the weight of "I should", because you already decided.', 'The alarm rings and you know what to do, no bargaining.'], ['organised', 'light', 'determined']],
  'compra.aspetta': ['a night to think', ['You saved the item and closed the app: your breathing slows.', 'The urge has calmed a little and you see better what you need.', 'On waking you know whether you still want it: the answer is yours, no hurry.'], ['impatient', 'calmer', 'clear']],
  'compra.compra': ['something needed', ['You compared two shops, chose and pressed buy.', 'One less thing to think about and one problem fewer to solve.', 'You use it without second thoughts: it was the right choice for you.'], ['decided', 'calm', 'satisfied']],
  'compra.gia-ho': ['use what I have', ['You close the online shop and open the drawer: what you have still works.', 'Some money stays where it is, which brings a strange calm.', 'In a few weeks you will truly know whether something is missing.'], ['sober', 'calm', 'aware']],
  'compra.budget': ['with a ceiling', ['You write a maximum amount in your notes: now you have a clear limit.', 'Searching within the limit you find an alternative you had not considered.', 'The bill is calm, the choice is yours.'], ['organised', 'focused', 'calm']],
  'weekend.fuori': ['no plan', ['Shoes on and a random direction: the day has already begun.', 'A new place, a coffee, time passing at its own pace.', 'A good tiredness and a few photos that make you smile.'], ['curious', 'free', 'full']],
  'weekend.persone': ['a coffee together', ['You sent the invitation: now, for a moment, you wait for the reply.', 'A real chat and the coffee going cold.', 'A warm thought on waking: it did you good to see them.'], ['open', 'close', 'grateful']],
  'weekend.riposa': ['a slow day', ['Free alarm, no schedule: just one thing to do.', 'A good meal and time passing without the urge to rush.', 'Monday starts with more patience.'], ['slow', 'relaxed', 'recharged']],
  'weekend.mani': ['something concrete', ['You took out the recipe, the pencils or the wrenches: something is taking shape.', 'A first result to look at, and boredom feels far away.', 'The next day you look at what you made and smile.'], ['curious', 'focused', 'proud']],
  'weekend.progetto': ['one project', ['You wrote the project in one line and start with the easiest part.', 'Before lunch it is done: the rest of the day is free.', 'On Monday you know you took a weight off the list.'], ['focused', 'relieved', 'light']],
  'focus.continua': ['25 minutes and a break', ['The timer is on and the phone face down.', 'You finished the thing you wrote down, and the break is a real break.', 'You restart with a tidier head and a point already reached.'], ['focused', 'satisfied', 'in rhythm']],
  'focus.pausa': ['a real break', ['Window open, a glass of water and the screen off: the mind widens.', 'When you return, you see the place you were stuck with different eyes.', 'The next day you remember better what you did.'], ['tired', 'refreshed', 'clear']],
  'focus.inizia': ['five minutes', ['The document is open and the first sentence is there, even if not beautiful.', 'After a few minutes you scroll along without noticing: the rest follows.', 'One less thing to carry with you tomorrow.'], ['stuck', 'moving', 'lightened']],
  'focus.chiudi': ['stop for tonight', ['You wrote the three things to pick up and turned off the lamp.', 'The mind stops and sleep comes without effort.', 'A fresh morning: you review the key points and remember them better.'], ['tired', 'at peace', 'rested']],
  'faccende.timer': ['ten minutes', ['The timer starts and you pick one room: music in the background.', 'When it rings, the room is already different: you can stop with satisfaction.', 'You walk into a clearer room in the morning.'], ['decided', 'proud', 'relieved']],
  'faccende.una-cosa': ['one thing only', ['You pick the corner that bothers you most and fix it in ten minutes.', 'You look around: just one thing in order changes the colour of the room.', 'The next day you feel like doing the rest too.'], ['lightened', 'clearer', 'motivated']],
  'faccende.musica': ['with my music', ['A playlist and the thing you have postponed longest.', 'Time goes faster and by the end you are tapping your foot.', 'The to-do list is shorter.'], ['charged', 'in rhythm', 'satisfied']],
  'faccende.stasera': ['leave it tonight', ['You fix only what you need tomorrow morning and then sit down.', 'An evening with no list in your head: the body says thank you.', 'The next morning the kitchen is tidy and breakfast is already set.'], ['tired', 'at peace', 'organised']],
  'regalo.ascolto': ['something they said', ['You recall a sentence from months ago and already know what to look for.', 'You wrap it carefully and picture their face as they open it.', 'Their face as they open it: you listened, and they can see it.'], ['inspired', 'attentive', 'happy']],
  'regalo.esperienza': ['a moment together', ['You pick a date on the calendar and already feel like smiling.', 'You write the card: time together as a gift.', 'An evening that will stay in memory more than objects.'], ['excited', 'focused', 'happy']],
  'regalo.scritto': ['a card and a gesture', ['Paper and pen: three true memories come to mind.', 'You add their favourite sweet: the package is simple and lovely.', 'The card ends up in a drawer, and stays there for a long time.'], ['sentimental', 'creative', 'moved']],
  'regalo.piccolo': ['small and shared', ['A local sweet, a flower, a card with your name.', 'You offer it with a smile and the atmosphere warms up.', 'A kind thank-you, and a good memory of you.'], ['simple', 'kind', 'settled']],
  'sonno.letto': ['early to bed', ['The phone is charging away from the bed and the light goes off.', 'Sleep comes early and the story can wait.', 'You wake with a clear head and some curiosity for tomorrow night\'s episode.'], ['tired', 'lulled', 'rested']],
  'sonno.capitolo': ['one last chapter', ['The marker is in the book: stopping is already decided.', 'A few pages, then the light goes off gently.', 'A soft morning, with the story waiting for you.'], ['calm', 'relaxed', 'rested']],
  'sonno.sveglia': ['at the first alarm', ['You moved the alarm away from the bed: tomorrow morning you will have to get up.', 'You fall asleep knowing the first sound is the right one.', 'First sound and already up: the day starts with a decisive gesture.'], ['decided', 'calm', 'moving']],
  'sonno.riposino': ['twenty minutes', ['Eyes closed and an alarm at twenty minutes: the thoughts switch off.', 'You get up lighter and the evening does not weigh on you.', 'You slept well at night too.'], ['tired', 'recharged', 'rested']],
  'guardo.comfort': ['a story I know', ['You press play on something you already love and your body relaxes.', 'The lines you know by heart make you smile like the first time.', 'You fall asleep in a good mood.'], ['relaxed', 'cosy', 'calm']],
  'guardo.nuovo': ['with a rule', ['You opened three titles and the five-minute timer is running.', 'You picked one: after twenty minutes you already know if it is for you.', 'You have a new title to talk about with someone.'], ['curious', 'absorbed', 'satisfied']],
  'guardo.leggere': ['a book', ['Phone in another room, two pages read: the mind slows.', 'The story grabs you and time stops.', 'A morning with the wish to go back to those pages.'], ['calm', 'absorbed', 'calm']],
  'guardo.leggero': ['something light', ['A comedy and a blanket: nothing to think about.', 'Laughter loosens you up, two episodes and that is all.', 'You sleep well, still with a smile.'], ['tired', 'cheerful', 'rested']],
  'guardo.insieme': ['to watch together', ['Everyone proposes a title and you vote straight away.', 'A full couch, popcorn, someone laughing too loud.', 'The next day you quote the lines to each other.'], ['playful', 'cheerful', 'happy']],
};

export const HZ_LABELS = { h1: ['In 1 hour', 'In 1 hour', 'In an hour'], sera: ['Tonight', 'Tonight', 'Tonight'], dom: ['Tomorrow morning', 'Tomorrow morning', 'Tomorrow morning'] };
export const DAILY_SIGNS = {
  h1: 'Notice how heavy the decision felt (or feels) now that you have made it.',
  sera: 'Notice one moment tonight when you felt good.',
  dom: 'Notice how you feel this morning compared with last night.',
};
export const CHECKIN = {
  q: 'How did it go?',
  good: 'Well', ok: 'So-so', skip: 'I did not do it',
  good_r: 'I am glad. Remember what made you feel good: next time you will choose even faster.',
  ok_r: 'That is fine. A choice does not have to be perfect to be useful: it teaches you something about yourself.',
  skip_r: 'It happens, and no path closes: you can pick a new one right now.',
};

// altre categorie di ogni giorno
import { MORE_TEXT, MORE_SCENES } from './more-en.js';
Object.assign(DAILY_TEXT, MORE_TEXT);
Object.assign(SCENES, MORE_SCENES);
