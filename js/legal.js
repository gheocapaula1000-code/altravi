// Interruttore lingua delle pagine legali (IT/EN). Stessa chiave dell'app.
(function () {
  var b = document.getElementById('legalLang');
  if (!b) return;
  b.addEventListener('click', function () {
    var next = document.documentElement.lang === 'it' ? 'en' : 'it';
    document.documentElement.lang = next;
    try { localStorage.setItem('altravi.lang', next); } catch (e) {}
  });
})();
