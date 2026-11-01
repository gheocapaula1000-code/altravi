// Rilevazione di momenti difficili anche in frasi scritte in altre lingue (sicurezza: chi scrive in ES/FR/DE/PT riceve comunque la schermata di cura, in IT/EN).
export const CRISIS_EXTRA = [
  // ES
  /quitarme la vida/i, /acabar con todo/i, /no quiero vivir/i, /hacerme da[ñn]o/i, /quiero morir/i, /matarme/i,
  // FR
  /me tuer/i, /en finir avec (la vie|tout)/i, /mettre fin [àa] mes jours/i, /ne veux plus vivre/i, /veux mourir/i, /me faire du mal/i,
  // DE
  /mich umbringen/i, /nicht mehr leben/i, /sterben (will|m[öo]chte)/i, /mir das leben nehmen/i, /selbstmord/i, /mir etwas antun/i, /mich selbst verletzen/i,
  // PT
  /me matar/i, /tirar (a )?minha vida/i, /acabar com tudo/i, /n[ãa]o quero (mais )?viver/i, /quero morrer/i, /me machucar/i,
];
