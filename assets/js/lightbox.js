/* Lightbox minimale per le gallerie Jekyll
   Richiede nel DOM:
   <div id="lightbox" class="lightbox" aria-hidden="true" role="dialog">
     <button class="lightbox__close" aria-label="Chiudi">×</button>
     <img class="lightbox__img" alt="">
     <button class="lightbox__arrow lightbox__arrow--prev" aria-label="Precedente">‹</button>
     <button class="lightbox__arrow lightbox__arrow--next" aria-label="Successiva">›</button>
   </div>
*/

(function () {
  'use strict';

  // Utility: selettore sicuro
  function $(q, ctx) { return (ctx || document).querySelector(q); }
  function $all(q, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(q)); }

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = $('#lightbox');
    if (!overlay) {
      // Se l'overlay non esiste, non attiviamo nulla
      return;
    }

    var imgEl    = $('.lightbox__img', overlay);
    var btnClose = $('.lightbox__close', overlay);
    var btnPrev  = $('.lightbox__arrow--prev', overlay);
    var btnNext  = $('.lightbox__arrow--next', overlay);

    // Tutti i link cliccabili dentro le griglie
    var thumbs = $all('.gallery-grid a');
    if (!thumbs.length) return;

    var index = 0;

    function setImage(i) {
      index = i;
      var href = thumbs[index].getAttribute('href');
      imgEl.setAttribute('src', href);
    }

    function openAt(i) {
      setImage(i);
      overlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
      overlay.setAttribute('aria-hidden', 'false');
      // focus per accessibilità (tasti freccia/esc)
      btnClose.focus();
    }

    function closeLb() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      overlay.setAttribute('aria-hidden', 'true');
      // rimuovo src per liberare memoria sulle immagini pesanti (opzionale)
      // imgEl.removeAttribute('src');
    }

    function prev() {
      var i = (index - 1 + thumbs.length) % thumbs.length;
      setImage(i);
    }

    function next() {
      var i = (index + 1) % thumbs.length;
      setImage(i);
    }

    // Bind: click sulle thumb
    thumbs.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        // Evita che i link aprano la foto in nuova scheda
        e.preventDefault();
        openAt(i);
      });
    });

    // Bind: controlli overlay
    if (btnClose) btnClose.addEventListener('click', closeLb);
    if (btnPrev)  btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    if (btnNext)  btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });

    // Chiudi cliccando fuori dall'immagine
    overlay.addEventListener('click', function (e) {
      // Chiudi solo se clicchi sull’overlay, non sull’immagine o sui bottoni
      if (e.target === overlay) closeLb();
    });

    // Tastiera: ESC per chiudere, frecce per navigare
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft')  prev();
      else if (e.key === 'ArrowRight') next();
    });
  });
})();
