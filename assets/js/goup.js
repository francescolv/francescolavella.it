(function () {
  'use strict';
  var TRIGGER = 500;

  function init() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'goup';
    btn.setAttribute('aria-label', 'Torna su');
    btn.innerHTML = '↑';
    btn.style.cssText = [
      'position:fixed', 'right:20px', 'bottom:10px',
      'width:40px', 'height:40px', 'border:none', 'border-radius:0',
      'background:#fff', 'color:#000', 'font-size:20px', 'line-height:40px',
      'box-shadow:0 1px 6px rgba(0,0,0,.2)', 'cursor:pointer',
      'opacity:0', 'pointer-events:none', 'transition:opacity .2s ease',
      'z-index:9999'
    ].join(';');
    document.body.appendChild(btn);

    function onScroll() {
      var visible = window.pageYOffset > TRIGGER;
      btn.style.opacity = visible ? '1' : '0';
      btn.style.pointerEvents = visible ? 'auto' : 'none';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
