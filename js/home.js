/* ==========================================================================
   首页脚本：行动入口卡片渲染 · 滚动显现 · 队伍参数跳转
   ========================================================================== */
(function () {
  'use strict';

  var grid = document.getElementById('scenarioGrid');
  var ORDER = ['classic', 'main', 'alt'];
  var BADGE = {
    classic: 'home.entries.badge.recommended',
    main: 'home.entries.badge.advanced',
    alt: 'home.entries.badge.variant'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  function dots(level) {
    var out = '';
    var n = Math.max(1, Math.min(3, Number(level) || 1));
    for (var i = 1; i <= 3; i++) out += '<i class="' + (i <= n ? 'is-on' : '') + '"></i>';
    return out;
  }

  function renderCards() {
    if (!grid) return;
    if (!window.SCENARIOS) {
      grid.innerHTML = '<p class="empty">行动模式数据未就绪（js/data/scenarios.js）。</p>';
      return;
    }
    grid.innerHTML = '';
    ORDER.forEach(function (key) {
      var scenario = window.SCENARIOS[key];
      if (!scenario) return;
      var stages = scenario.enigmas ? scenario.enigmas.length : 6;
      var card = document.createElement('article');
      card.className = 'entry-card plate reveal';
      card.innerHTML =
        '<div class="entry-card__top">' +
        '  <span class="mono entry-card__code">' + esc(scenario.code) + '</span>' +
        '  <span class="stamp stamp--brand">' + esc(I18N.t(BADGE[key])) + '</span>' +
        '</div>' +
        '<h3 class="entry-card__title display">' + esc(I18N.pick(scenario.title)) + '</h3>' +
        '<p class="entry-card__label">' + esc(I18N.pick(scenario.label)) + '</p>' +
        '<p class="entry-card__brief">' + esc(I18N.pick(scenario.briefing)) + '</p>' +
        '<div class="entry-card__meta">' +
        '  <span class="entry-card__meta-item"><span>' + esc(I18N.t('home.entries.meta.difficulty')) +
        '</span><span class="dots" aria-hidden="true">' + dots(scenario.difficulty) + '</span></span>' +
        '  <span class="entry-card__meta-item"><span>' + esc(I18N.t('home.entries.meta.stages')) +
        '</span><span class="v">' + stages + ' ' + esc(I18N.t('unit.enigma')) + '</span></span>' +
        '  <span class="entry-card__meta-item"><span>' + esc(I18N.t('home.entries.meta.duration')) +
        '</span></span>' +
        '</div>' +
        '<a class="lk entry-card__open" href="' + esc(scenario.page) + '"><span>' +
        esc(I18N.t('home.entries.open')) + '</span><span class="arw" data-dir="e" aria-hidden="true">→</span></a>';
      grid.appendChild(card);
    });
    observeReveal();
  }

  var revealObserver = null;

  function markAllRevealed() {
    var items = document.querySelectorAll('.reveal');
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  }

  function observeReveal() {
    var items = document.querySelectorAll('.reveal:not(.is-in)');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      markAllRevealed();
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
      );
    }
    for (var i = 0; i < items.length; i++) revealObserver.observe(items[i]);
  }

  function redirectTeamParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      var team = params.get('team');
      if (team) {
        window.location.replace('game.html?team=' + encodeURIComponent(team));
      }
    } catch (err) {
      /* 旧浏览器忽略 */
    }
  }

  /* 二维码 / 队名链接带 ?team= 时直接进入游戏 */
  redirectTeamParam();

  function boot() {
    renderCards();
    observeReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  I18N.onChange(function () {
    renderCards();
  });
})();
