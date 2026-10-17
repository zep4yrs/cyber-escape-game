/* ==========================================================================
   数字封锁行动 · 轻量三语引擎
   zh（默认）· en · fr
   --------------------------------------------------------------------------
   用法：
     I18N.t('nav.home')                 取当前语言文案（缺省回退中文，再缺省回退 key）
     I18N.t('game.left', { n: 3 })      占位符 {n}
     I18N.pick({ zh:'…', en:'…', fr:'…' })  取当前语言字段
     I18N.setLang('en')                 切换语言（写 localStorage + 重刷页面文案）
     I18N.onChange(fn)                  语言切换后回调（返回取消函数）
     I18N.apply(root)                   重新应用 data-i18n 标记
     I18N.register(dict)                追加词典：{ zh:{…}, en:{…}, fr:{…} }

   页面标记：
     data-i18n="key"                  → textContent
     data-i18n-html="key"             → innerHTML（仅限可信词典内容）
     data-i18n-attr="placeholder:key;aria-label:key2"  → 属性
   语言切换容器：
     <div class="langswitch" data-lang-switch></div>   → 自动填充按钮
   ========================================================================== */
(function (global) {
  'use strict';

  var LANGS = ['zh', 'en', 'fr'];
  var LABEL = { zh: '中文', en: 'EN', fr: 'FR' };
  var HTML_LANG = { zh: 'zh-CN', en: 'en', fr: 'fr' };
  var STORAGE_KEY = 'cyberEscape:lang';
  var DEFAULT_LANG = 'zh';

  var dict = { zh: {}, en: {}, fr: {} };
  var listeners = [];
  var mounted = false;

  function safeStorage() {
    try {
      return global.localStorage;
    } catch (e) {
      return null;
    }
  }

  function normalize(code) {
    if (!code) return '';
    var c = String(code).toLowerCase().slice(0, 2);
    return LANGS.indexOf(c) >= 0 ? c : '';
  }

  function detect() {
    var store = safeStorage();
    var saved = store ? normalize(store.getItem(STORAGE_KEY)) : '';
    return saved || DEFAULT_LANG;
  }

  var lang = detect();

  function lookup(code, key) {
    var pack = dict[code];
    if (pack && Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    return null;
  }

  function interpolate(text, vars) {
    if (!vars) return text;
    return String(text).replace(/\{(\w+)\}/g, function (m, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m;
    });
  }

  function t(key, vars) {
    var text = lookup(lang, key);
    if (text == null) text = lookup('zh', key);
    if (text == null) return key;
    return interpolate(text, vars);
  }

  function pick(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      if (value[lang] != null) return value[lang];
      if (value.zh != null) return value.zh;
      if (value.en != null) return value.en;
      if (value.fr != null) return value.fr;
    }
    return String(value);
  }

  /** 当前语言对应的字段值（数组时返回数组） */
  function pickRaw(value) {
    if (value == null) return value;
    if (typeof value === 'object' && !Array.isArray(value)) {
      if (Object.prototype.hasOwnProperty.call(value, lang)) return value[lang];
      if (Object.prototype.hasOwnProperty.call(value, 'zh')) return value.zh;
    }
    return value;
  }

  function applyAttrs(el, spec) {
    if (!spec) return;
    spec.split(';').forEach(function (pair) {
      var idx = pair.indexOf(':');
      if (idx < 0) return;
      var attr = pair.slice(0, idx).trim();
      var key = pair.slice(idx + 1).trim();
      if (!attr || !key) return;
      el.setAttribute(attr, t(key));
    });
  }

  function apply(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
      var htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey) el.innerHTML = t(htmlKey);
      var attrSpec = el.getAttribute('data-i18n-attr');
      if (attrSpec) applyAttrs(el, attrSpec);
    }
    if (scope === document) {
      document.documentElement.lang = HTML_LANG[lang];
    }
  }

  function renderSwitcher(host) {
    host.innerHTML = '';
    LANGS.forEach(function (code, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'langswitch__sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '/';
        host.appendChild(sep);
      }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'langswitch__btn rowlink';
      btn.textContent = LABEL[code];
      btn.lang = HTML_LANG[code];
      btn.setAttribute('data-lang', code);
      var on = code === lang;
      btn.setAttribute('data-on', on ? 'true' : 'false');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.addEventListener('click', function () {
        setLang(code);
      });
      host.appendChild(btn);
    });
  }

  function mountSwitchers(root) {
    var scope = root || document;
    var hosts = scope.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < hosts.length; i++) renderSwitcher(hosts[i]);
    mounted = hosts.length > 0;
  }

  function syncSwitchers() {
    var btns = document.querySelectorAll('[data-lang-switch] [data-lang]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === lang;
      btns[i].setAttribute('data-on', on ? 'true' : 'false');
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function emit() {
    var detail = { lang: lang, label: LABEL[lang] };
    listeners.slice().forEach(function (fn) {
      try {
        fn(detail);
      } catch (e) {
        if (global.console) console.error('[i18n]', e);
      }
    });
    var ev = new CustomEvent('i18n:change', { detail: detail });
    document.dispatchEvent(ev);
  }

  function setLang(code, opts) {
    var next = normalize(code);
    if (!next || next === lang) {
      if (opts && opts.force) {
        apply();
        syncSwitchers();
      }
      return lang;
    }
    lang = next;
    var store = safeStorage();
    if (store) {
      try {
        store.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* 隐私模式下写不进去，忽略 */
      }
    }
    apply();
    syncSwitchers();
    emit();
    return lang;
  }

  function register(pack) {
    if (!pack || typeof pack !== 'object') return;
    LANGS.forEach(function (code) {
      if (pack[code] && typeof pack[code] === 'object') {
        Object.assign(dict[code], pack[code]);
      }
    });
  }

  function onChange(fn) {
    if (typeof fn !== 'function') return function () {};
    listeners.push(fn);
    return function () {
      var idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function fmtTime(totalSeconds) {
    var s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    return pad(Math.floor(s / 60)) + ':' + pad(s % 60);
  }

  function fmtMinutes(totalSeconds) {
    var mins = Math.max(0, Math.round((Number(totalSeconds) || 0) / 60));
    return mins;
  }

  global.I18N = {
    LANGS: LANGS,
    LABEL: LABEL,
    HTML_LANG: HTML_LANG,
    get lang() {
      return lang;
    },
    get mounted() {
      return mounted;
    },
    t: t,
    pick: pick,
    pickRaw: pickRaw,
    setLang: setLang,
    register: register,
    onChange: onChange,
    apply: apply,
    syncSwitchers: syncSwitchers,
    mountSwitchers: mountSwitchers,
    fmtTime: fmtTime,
    fmtMinutes: fmtMinutes
  };

  function boot() {
    apply();
    mountSwitchers();
    document.documentElement.lang = HTML_LANG[lang];
  }

  /* boot 必须等 DOMContentLoaded：defer 脚本执行时 readyState 已是 interactive，
     但同一队列里后面的 locale 脚本还没跑完；提前 apply 会把页面刷成 key。
     DOMContentLoaded 在所有 defer 脚本之后才触发，词典那时一定齐了。 */
  if (document.readyState === 'complete') {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  }
})(window);
