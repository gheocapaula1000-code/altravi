// Imposta la lingua della pagina prima del rendering (evita il lampo di lingua sbagliata).
(function () {
  try {
    var ok = { it: 1, en: 1 }, RTL = { ar: 1, he: 1, fa: 1, ur: 1 };
    var l = localStorage.getItem('altravi.lang') || localStorage.getItem('altrimenti.lang');
    if (!ok[l]) {
      l = 'en';
      var p = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (var i = 0; i < p.length; i++) { var b = String(p[i] || '').toLowerCase().split('-')[0]; if (ok[b]) { l = b; break; } }
    }
    document.documentElement.lang = l;
    document.documentElement.dir = RTL[l] ? 'rtl' : 'ltr';
  } catch (e) {}
})();
