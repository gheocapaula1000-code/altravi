// Lingua prima del primo disegno: evita il lampo di lingua sbagliata.
(function () {
  try {
    var ok = { it: 1, en: 1 };
    var l = localStorage.getItem('altravi.team.lang') || localStorage.getItem('altravi.lang');
    if (!ok[l]) {
      l = 'en';
      var p = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (var i = 0; i < p.length; i++) { var b = String(p[i] || '').toLowerCase().split('-')[0]; if (ok[b]) { l = b; break; } }
    }
    document.documentElement.lang = l;
    if (localStorage.getItem('altravi.team.big') === '1') document.documentElement.classList.add('big');
  } catch (e) {}
})();
