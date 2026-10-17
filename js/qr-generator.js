/* ==========================================================================
   队伍二维码生成器 · 页面逻辑
   --------------------------------------------------------------------------
   · 二维码完全在本机生成：vendor/qrcode.js（MIT，全局 qrcode 函数）
   · 团队链接：<基础链接>/index.html?team=<队伍编号>
     若基础链接已指向具体页面（…game1.html），则直接追加 ?team=
   · 不引用任何外部二维码 API，无 ES module，无内联事件。
   ========================================================================== */
(function () {
  'use strict';

  var MAX_TEAMS = 20;
  var DEFAULT_COUNT = 8;
  var QR_CELL_SIZE = 8;
  var QR_MARGIN_MODULES = 4;
  var PNG_SCALE = 10;

  var els = {};
  var generated = null;

  function $(id) {
    return document.getElementById(id);
  }

  function t(key, vars) {
    return window.I18N ? window.I18N.t(key, vars) : key;
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function clampCount(value) {
    var count = parseInt(value, 10);
    if (!isFinite(count)) return DEFAULT_COUNT;
    if (count < 1) return 1;
    if (count > MAX_TEAMS) return MAX_TEAMS;
    return count;
  }

  /* ---------- 基础链接与队伍编号 ---------- */

  function baseDirDefault() {
    var path = window.location.pathname || '/';
    var dir = path.replace(/qr_generator\.html?$/i, '');
    if (!dir) dir = '/';
    return window.location.origin + dir;
  }

  function normalizeBase(raw) {
    var value = String(raw == null ? '' : raw).trim();
    if (!value) return '';
    if (/^\/\//.test(value)) return window.location.protocol + value;
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(value) && !/^\//.test(value)) return 'https://' + value;
    return value;
  }

  function isValidBase(value) {
    try {
      var url = new URL(value, window.location.href);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  function joinTeamUrl(base, teamId) {
    var query = 'team=' + encodeURIComponent(teamId);
    var value = String(base);
    var hash = '';
    var hashIndex = value.indexOf('#');
    if (hashIndex >= 0) {
      hash = value.slice(hashIndex);
      value = value.slice(0, hashIndex);
    }
    if (/\.html?$/i.test(value)) {
      return value + (value.indexOf('?') >= 0 ? '&' : '?') + query + hash;
    }
    if (value.indexOf('?') >= 0) return value + '&' + query + hash;
    if (!/\/$/.test(value)) value += '/';
    return value + 'index.html?' + query + hash;
  }

  function parseNames(raw) {
    return String(raw == null ? '' : raw)
      .split(/\r?\n/)
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line.length > 0; })
      .slice(0, MAX_TEAMS);
  }

  function makeTeamIds(count, prefix, names) {
    if (names.length) return names.slice();
    var cleaned = String(prefix == null ? '' : prefix).trim().replace(/\s+/g, '').slice(0, 12);
    if (!cleaned) cleaned = 'TEAM';
    var ids = [];
    for (var i = 1; i <= count; i += 1) ids.push(cleaned + pad2(i));
    return ids;
  }

  /* ---------- 二维码生成 ---------- */

  function createQr(url) {
    if (typeof window.qrcode !== 'function') return null;
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      return qr;
    } catch (e) {
      return null;
    }
  }

  function svgFor(qr, teamId, index, localizedAlt) {
    try {
      return qr.createSvgTag({
        cellSize: QR_CELL_SIZE,
        margin: QR_CELL_SIZE * QR_MARGIN_MODULES,
        scalable: true,
        alt: { text: localizedAlt, id: 'qr-desc-' + index },
        title: { text: teamId, id: 'qr-title-' + index }
      });
    } catch (e) {
      return '';
    }
  }

  /* 二维码需要标准黑白对比，故这里的颜色是功能色而非主题色 */
  function drawQrCanvas(qr) {
    var modules = qr.getModuleCount();
    var quiet = QR_MARGIN_MODULES;
    var size = (modules + quiet * 2) * PNG_SCALE;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000000';
    for (var row = 0; row < modules; row += 1) {
      for (var col = 0; col < modules; col += 1) {
        if (qr.isDark(row, col)) {
          ctx.fillRect((col + quiet) * PNG_SCALE, (row + quiet) * PNG_SCALE, PNG_SCALE, PNG_SCALE);
        }
      }
    }
    return canvas;
  }

  function safeFileName(teamId) {
    var name = String(teamId).replace(/[^\w.\-\u4e00-\u9fa5]+/g, '_').slice(0, 60);
    return name || 'team';
  }

  /* ---------- 渲染 ---------- */

  function cardHTML(item, index) {
    var alt = t('qr.a11y.qrAlt', { team: item.id });
    return (
      '<article class="qr-card plate" role="listitem" data-team="' + esc(item.id) + '">' +
        '<div class="qr-card__code">' + svgFor(item.qr, item.id, index, alt) + '</div>' +
        '<div class="plate-caption">' +
          '<span class="cap-id">' + esc(item.id) + '</span>' +
          '<span>' + esc(t('qr.card.scan')) + '</span>' +
        '</div>' +
        '<div class="qr-card__body">' +
          '<p class="qr-card__link-label">' + esc(t('qr.card.linkLabel')) + '</p>' +
          '<p class="qr-card__link" title="' + esc(item.url) + '">' + esc(item.url) + '</p>' +
          '<div class="qr-card__actions no-print">' +
            '<button type="button" class="btn btn--ghost btn--sm" data-act="copy" data-index="' + index + '">' + esc(t('common.copy')) + '</button>' +
            '<button type="button" class="btn btn--ghost btn--sm" data-act="download" data-index="' + index + '">' + esc(t('qr.card.download')) + '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderCards() {
    var items = generated ? generated.items : [];
    if (els.grid) {
      els.grid.innerHTML = items.map(function (item, index) {
        return cardHTML(item, index);
      }).join('');
      els.grid.hidden = items.length === 0;
    }
    if (els.empty) els.empty.hidden = items.length > 0;
    var countLabel = t('qr.sheet.count', { n: items.length });
    if (els.sheetCount) els.sheetCount.textContent = countLabel;
    if (els.printCount) els.printCount.textContent = countLabel;
  }

  function updatePreview() {
    if (!els.preview) return;
    var base = normalizeBase(els.base ? els.base.value : '');
    if (!base) {
      els.preview.textContent = '—';
      return;
    }
    var count = clampCount(els.count ? els.count.value : DEFAULT_COUNT);
    var names = parseNames(els.names ? els.names.value : '');
    var ids = makeTeamIds(count, els.prefix ? els.prefix.value : 'TEAM', names);
    els.preview.textContent = joinTeamUrl(base, ids[0] || 'TEAM01');
  }

  /* ---------- 交互 ---------- */

  function toast(message, tone) {
    var stack = els.toastStack;
    if (!stack) return;
    var node = document.createElement('div');
    node.className = 'toast' + (tone ? ' toast--' + tone : '');
    var text = document.createElement('span');
    text.textContent = message;
    node.appendChild(text);
    stack.appendChild(node);
    window.setTimeout(function () {
      node.classList.add('is-leaving');
      window.setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 320);
    }, 3600);
  }

  function generate() {
    var base = normalizeBase(els.base ? els.base.value : '');
    if (!base) {
      toast(t('qr.toast.invalidUrl'), 'warn');
      if (els.base) els.base.focus();
      return;
    }
    if (!isValidBase(base)) {
      toast(t('qr.toast.invalidBase'), 'warn');
      if (els.base) els.base.focus();
      return;
    }

    var rawCount = parseInt(els.count ? els.count.value : DEFAULT_COUNT, 10);
    var count = clampCount(rawCount);
    if (isFinite(rawCount) && rawCount !== count) {
      if (els.count) els.count.value = String(count);
      toast(t('qr.toast.clamped', { max: MAX_TEAMS }), 'warn');
    }

    var names = parseNames(els.names ? els.names.value : '');
    var teamIds = makeTeamIds(count, els.prefix ? els.prefix.value : 'TEAM', names);
    var items = [];
    var failed = 0;

    teamIds.forEach(function (teamId) {
      var url = joinTeamUrl(base, teamId);
      var qr = createQr(url);
      if (!qr) {
        failed += 1;
        return;
      }
      items.push({ id: teamId, url: url, qr: qr });
    });

    if (!items.length) {
      toast(t('qr.toast.genFail'), 'alert');
      return;
    }

    generated = { base: base, items: items };
    renderCards();
    if (failed) {
      toast(t('qr.toast.genFail'), 'alert');
    } else {
      toast(t('qr.toast.generated', { n: items.length }), 'ok');
    }
    if (window.innerWidth < 900) {
      var sheet = document.getElementById('qrSheetTitle');
      if (sheet && sheet.scrollIntoView) sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function fallbackCopy(text) {
    try {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', 'readonly');
      area.className = 'sr';
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(area);
      toast(ok ? t('qr.toast.copied') : t('qr.toast.copyFail'), ok ? 'ok' : 'warn');
    } catch (e) {
      toast(t('qr.toast.copyFail'), 'warn');
    }
  }

  function copyLink(index) {
    var item = generated && generated.items[index];
    if (!item) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(item.url).then(function () {
        toast(t('qr.toast.copied'), 'ok');
      }, function () {
        fallbackCopy(item.url);
      });
    } else {
      fallbackCopy(item.url);
    }
  }

  function downloadPng(index) {
    var item = generated && generated.items[index];
    if (!item) return;
    try {
      var canvas = drawQrCanvas(item.qr);
      var dataUrl = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-' + safeFileName(item.id) + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast(t('qr.toast.downloaded', { team: item.id }), 'ok');
    } catch (e) {
      toast(t('qr.toast.genFail'), 'alert');
    }
  }

  function printAll() {
    if (!generated || !generated.items.length) {
      toast(t('qr.toast.noCards'), 'warn');
      return;
    }
    try {
      window.print();
    } catch (e) {
      toast(t('qr.toast.genFail'), 'alert');
    }
  }

  /* ---------- 初始化 ---------- */

  function cacheElements() {
    els.base = $('qrBase');
    els.count = $('qrCount');
    els.prefix = $('qrPrefix');
    els.names = $('qrNames');
    els.form = $('qrForm');
    els.generate = $('qrGenerate');
    els.print = $('qrPrint');
    els.preview = $('qrPreview');
    els.grid = $('qrGrid');
    els.empty = $('qrEmpty');
    els.sheetCount = $('qrSheetCount');
    els.printCount = $('qrPrintCount');
    els.toastStack = $('toastStack');
  }

  function bindEvents() {
    if (els.form) {
      els.form.addEventListener('submit', function (event) {
        event.preventDefault();
        generate();
      });
    }
    if (els.print) els.print.addEventListener('click', printAll);

    [els.base, els.count, els.prefix, els.names].forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', updatePreview);
      input.addEventListener('change', updatePreview);
    });

    if (els.grid) {
      els.grid.addEventListener('click', function (event) {
        var trigger = event.target.closest('[data-act]');
        if (!trigger) return;
        var index = parseInt(trigger.getAttribute('data-index'), 10);
        if (!isFinite(index)) return;
        if (trigger.getAttribute('data-act') === 'copy') copyLink(index);
        else downloadPng(index);
      });
    }

    if (window.I18N && window.I18N.onChange) {
      window.I18N.onChange(function () {
        updatePreview();
        renderCards();
      });
    }
  }

  function boot() {
    cacheElements();
    if (els.base && !String(els.base.value || '').trim()) els.base.value = baseDirDefault();
    if (els.count && !els.count.value) els.count.value = String(DEFAULT_COUNT);
    bindEvents();
    updatePreview();
    renderCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
