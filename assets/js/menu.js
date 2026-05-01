(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function slideToggle(el, duration) {
    var d = duration || 350;
    var isOpen = el.dataset.menuOpen === '1';
    if (isOpen) {
      el.style.transition = 'width ' + d + 'ms ease';
      el.style.width = '0';
      el.dataset.menuOpen = '0';
      window.setTimeout(function () { el.style.display = 'none'; }, d);
    } else {
      el.style.display = 'block';
      var target = el.scrollWidth;
      el.style.width = '0';
      el.style.transition = 'width ' + d + 'ms ease';
      // force reflow so the transition kicks in
      void el.offsetWidth;
      el.style.width = target + 'px';
      el.dataset.menuOpen = '1';
    }
  }

  function setBlur(selectors, on) {
    selectors.forEach(function (sel) {
      var nodes = document.querySelectorAll(sel);
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.filter = on ? 'blur(5px)' : 'blur(0px)';
      }
    });
  }

  ready(function () {
    var trigger = document.querySelector('.menu-toggle');
    if (!trigger) return;
    var panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains('menu-drawer')) {
      panel = document.querySelector('.menu-drawer');
    }
    var isHome = !!document.querySelector('.home-title');
    var blurTargets = isHome
      ? ['.home-title', '.home-hero', '.social-links']
      : ['.footer', '.posts-list', '.projects-list', '.top-strip'];

    if (!isHome) trigger.style.color = 'rgba(52, 152, 219, 1)';

    var open = false;
    trigger.addEventListener('click', function () {
      if (panel) slideToggle(panel, 350);
      setBlur(blurTargets, !open);
      var menuList = document.querySelector('ul.menu');
      if (menuList) menuList.style.animationDuration = '0.1s';
      if (isHome) {
        trigger.style.color = open ? '#ecf0f1' : 'rgba(52, 152, 219, 1)';
      }
      open = !open;
    });
  });
})();
