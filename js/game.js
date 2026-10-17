/* ==========================================================================
   数字封锁行动 · 游戏引擎
   game.html / game1.html / game2.html 三页共用
   --------------------------------------------------------------------------
   · 欢迎屏 / 断点续玩 / 顶部 HUD / 30 分钟计时 / 判分 / 提示 / 解析
   · 结束屏 / 逐关记录 / 全部解析弹层
   · localStorage：live、results、snapshot、lastTeam
   · BroadcastChannel('cyberEscape') + storage 事件：教师控制台指令与消息
   · 三语：静态标记交给 I18N.apply，动态内容在 i18n:change 后整体重绘
   · 无依赖、无 ES module、无内联事件
   ========================================================================== */
(function (window, document) {
  'use strict';

  var I18N = window.I18N;
  var NS = 'cyberEscape:';
  var CHANNEL = 'cyberEscape';

  var TOTAL_TIME = 30 * 60; // 30 分钟
  var MAX_ATTEMPTS = 5;
  var MAX_HINTS = 3;
  var BASE_SCORE = 100;
  var SECONDS_BONUS = 2;
  var ATTEMPT_PENALTY = 10;
  var HINT_PENALTY = 20;
  var AUTO_NEXT_DELAY = 1500;
  var AUTO_REVEAL_DELAY = 3200;
  var LIVE_SYNC_MS = 5000;

  var scenarioKey = document.documentElement.getAttribute('data-scenario') || 'main';
  var scenario = null;
  var enigmas = [];
  var missingKeys = [];
  var configFound = false;
  var dom = {};
  var state = {
    phase: 'welcome', // welcome | playing | paused | finished
    view: 'welcome',
    team: '',
    teamKey: '',
    current: 0,
    per: [],
    score: 0,
    elapsedBefore: 0,
    startedAt: 0,
    resultStatus: '',
    pausedByAdmin: false,
    feedback: null,
    autoTimer: null,
    pendingAdvance: false,
    lastLive: 0,
    channel: null,
    seenIds: {},
    pendingSnapshot: null,
    modalEl: null,
    modalOnClose: null,
    modalLastFocus: null
  };

  /* ------------------------------------------------------------------ *
   * 小工具
   * ------------------------------------------------------------------ */
  function pad2(n) {
    n = Math.floor(Number(n) || 0);
    return n < 10 ? '0' + n : String(n);
  }

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function setText(node, text) {
    if (node) node.textContent = text == null ? '' : String(text);
  }

  function show(node, visible) {
    if (!node) return;
    node.hidden = !visible;
  }

  function parseJSON(raw) {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------------ *
   * localStorage
   * ------------------------------------------------------------------ */
  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      var parsed = parseJSON(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* 隐私模式 / 配额满：静默失败 */
    }
  }

  function readRaw(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw == null ? fallback : raw;
    } catch (e) {
      return fallback;
    }
  }

  function writeRaw(key, value) {
    try {
      window.localStorage.setItem(key, String(value));
    } catch (e) {
      /* ignore */
    }
  }

  function removeKey(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
  }

  /* ------------------------------------------------------------------ *
   * 场景与关卡数据（防御性读取）
   * ------------------------------------------------------------------ */
  function fallbackScenario() {
    return {
      key: scenarioKey,
      code: '—',
      page: window.location.pathname,
      difficulty: 1,
      label: { zh: '未知模式', en: 'Unknown mode', fr: 'Mode inconnu' },
      title: { zh: '数字封锁行动', en: 'Operation Digital Lockdown', fr: 'Opération Digital Lockdown' },
      briefing: { zh: '', en: '', fr: '' },
      enigmas: []
    };
  }

  function resolveScenario() {
    var all = window.SCENARIOS;
    if (all && typeof all === 'object' && all[scenarioKey] && typeof all[scenarioKey] === 'object') {
      configFound = true;
      return all[scenarioKey];
    }
    configFound = false;
    return fallbackScenario();
  }

  function resolveEnigmas() {
    enigmas = [];
    missingKeys = [];
    var registry = window.ENIGMAS;
    var keys = scenario && Array.isArray(scenario.enigmas) ? scenario.enigmas : [];
    keys.forEach(function (key) {
      var item = registry && typeof registry === 'object' ? registry[key] : null;
      if (item && typeof item === 'object') enigmas.push(item);
      else missingKeys.push(String(key));
    });
  }

  function currentEnigma() {
    return enigmas[state.current] || null;
  }

  function enigmaTitle(enigma) {
    if (!enigma) return '';
    var title = I18N.pick(enigma.title);
    return title || enigma.code || '';
  }

  function enigmaTag(enigma) {
    return enigma ? I18N.pick(enigma.tag) : '';
  }

  function enigmaHints(enigma) {
    var raw = enigma ? I18N.pickRaw(enigma.hints) : null;
    return Array.isArray(raw) ? raw : [];
  }

  function answerDisplay(enigma) {
    if (!enigma || enigma.answer == null) return '—';
    var value = I18N.pick(enigma.answer);
    return value == null || value === '' ? '—' : String(value);
  }

  function normalizeAnswer(raw) {
    var text = String(raw == null ? '' : raw).trim().toUpperCase();
    text = text.replace(/\s+/g, '');
    text = text.replace(/[，、；：]/g, function (ch) {
      if (ch === '；') return ';';
      if (ch === '：') return ':';
      return ',';
    });
    return text;
  }

  function acceptedAnswers(enigma) {
    var out = [];
    if (!enigma) return out;
    var answer = enigma.answer;
    if (answer != null) {
      if (typeof answer === 'object' && !Array.isArray(answer)) {
        // 按语言区分的答案：只取当前语言（I18N.pick 已含中文回退）
        out.push(I18N.pick(answer));
      } else {
        out.push(I18N.pick(answer));
      }
    }
    if (Array.isArray(enigma.accept)) {
      enigma.accept.forEach(function (item) {
        out.push(I18N.pick(item));
      });
    }
    return out.filter(function (item) {
      return item != null && String(item).length > 0;
    });
  }

  function isCorrectAnswer(enigma, raw) {
    var given = normalizeAnswer(raw);
    if (!given) return false;
    var candidates = acceptedAnswers(enigma);
    for (var i = 0; i < candidates.length; i++) {
      if (normalizeAnswer(candidates[i]) === given) return true;
    }
    return false;
  }

  function teamKeyOf(team) {
    var base = String(team == null ? '' : team).toLowerCase().trim();
    try {
      base = base.replace(/[^\p{L}\p{N}]+/gu, '');
    } catch (e) {
      base = base.replace(/[^\w\u4e00-\u9fff]+/g, '');
    }
    return base || 'team';
  }

  /* ------------------------------------------------------------------ *
   * 计时与进度
   * ------------------------------------------------------------------ */
  function freshPerEntry() {
    return { attempts: 0, hints: 0, resolved: false, revealed: false, score: 0, draft: '' };
  }

  function elapsedSeconds() {
    if (state.phase === 'playing') {
      return state.elapsedBefore + Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000));
    }
    return state.elapsedBefore;
  }

  function remainingSeconds() {
    return Math.max(0, TOTAL_TIME - elapsedSeconds());
  }

  function startClock() {
    state.startedAt = Date.now();
  }

  function stopClock() {
    state.elapsedBefore = Math.min(TOTAL_TIME, elapsedSeconds());
  }

  function resolvedCount() {
    var count = 0;
    for (var i = 0; i < state.per.length; i++) {
      if (state.per[i] && state.per[i].resolved) count++;
    }
    return count;
  }

  function allResolved() {
    return enigmas.length > 0 && resolvedCount() === enigmas.length;
  }

  function sumAttempts() {
    return state.per.reduce(function (total, item) {
      return total + (item ? Number(item.attempts) || 0 : 0);
    }, 0);
  }

  function sumHints() {
    return state.per.reduce(function (total, item) {
      return total + (item ? Number(item.hints) || 0 : 0);
    }, 0);
  }

  /* ------------------------------------------------------------------ *
   * DOM 缓存
   * ------------------------------------------------------------------ */
  function cacheDom() {
    var ids = [
      'viewWelcome', 'viewStage', 'viewFinish',
      'welcomeCode', 'welcomeTitle', 'welcomeBrief', 'welcomeLabel', 'welcomeDifficulty',
      'welcomeStages', 'welcomeMode', 'welcomeStageCount', 'welcomeDuration',
      'teamForm', 'teamInput', 'teamError', 'startBtn', 'resumeBtn', 'dataEmpty', 'dataEmptyBody',
      'hud', 'hudMode', 'hudTeam', 'hudTimer', 'hudScore', 'hudStageLabel', 'hudProgress', 'pauseBtn',
      'indexList',
      'enigmaCard', 'enigmaCode', 'enigmaTag', 'enigmaCount', 'enigmaState', 'enigmaTitle',
      'enigmaBrief', 'enigmaContent', 'answerArea', 'answerForm', 'answerInput', 'submitBtn',
      'answerNote', 'attemptsLabel', 'hintBtn', 'hintsCount', 'hints', 'feedback',
      'solvedPanel', 'solvedStamp', 'solvedAnswer', 'solvedBody', 'autoNote', 'prevBtn', 'nextBtn',
      'finishTitle', 'finishStamp', 'statSolved', 'statScore', 'statTime', 'statStatus',
      'reportId', 'reportBody', 'solutionsBtn', 'againBtn',
      'resumeMeta', 'resumeContinue', 'resumeRestart',
      'pauseMeta', 'pauseResume',
      'timeoutMeta', 'timeoutSolutions', 'timeoutAgain',
      'solutionsBody',
      'modalResume', 'modalPause', 'modalTimeout', 'modalSolutions',
      'toastStack'
    ];
    ids.forEach(function (id) {
      dom[id] = document.getElementById(id);
    });
  }

  /* ------------------------------------------------------------------ *
   * Toast
   * ------------------------------------------------------------------ */
  function toast(text, tone) {
    if (!dom.toastStack || !text) return;
    var node = document.createElement('div');
    node.className = 'toast' + (tone ? ' toast--' + tone : '');
    node.setAttribute('role', 'status');
    var body = document.createElement('p');
    body.textContent = String(text);
    node.appendChild(body);
    dom.toastStack.appendChild(node);
    window.setTimeout(function () {
      node.classList.add('is-leaving');
      window.setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 320);
    }, 4200);
  }

  /* ------------------------------------------------------------------ *
   * 弹层（含焦点管理与 Esc / Tab 循环）
   * ------------------------------------------------------------------ */
  function focusableIn(node) {
    var nodes = node.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    return toArray(nodes).filter(function (item) {
      return !item.disabled && item.getClientRects().length > 0;
    });
  }

  function onModalKeydown(event) {
    var modal = state.modalEl;
    if (!modal || modal.hidden) {
      document.removeEventListener('keydown', onModalKeydown, true);
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal(modal);
      return;
    }
    if (event.key !== 'Tab') return;
    var nodes = focusableIn(modal);
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openModal(target, onClose) {
    var modal = typeof target === 'string' ? document.getElementById(target) : target;
    if (!modal || !modal.hidden) return;
    state.modalLastFocus = document.activeElement;
    state.modalEl = modal;
    state.modalOnClose = typeof onClose === 'function' ? onClose : null;
    modal.hidden = false;
    document.addEventListener('keydown', onModalKeydown, true);
    var nodes = focusableIn(modal);
    var preferred = modal.querySelector('[data-autofocus]') || modal.querySelector('.modal__close');
    var targetNode = preferred && !preferred.disabled ? preferred : nodes[0];
    if (targetNode && targetNode.focus) {
      try {
        targetNode.focus();
      } catch (e) {
        /* ignore */
      }
    }
  }

  function closeModal(target, options) {
    var modal = typeof target === 'string' ? document.getElementById(target) : target;
    if (!modal || modal.hidden) return;
    var callback = state.modalOnClose;
    state.modalOnClose = null;
    modal.hidden = true;
    document.removeEventListener('keydown', onModalKeydown, true);
    if (state.modalLastFocus && document.contains(state.modalLastFocus) && state.modalLastFocus.focus) {
      try {
        state.modalLastFocus.focus();
      } catch (e) {
        /* ignore */
      }
    }
    state.modalLastFocus = null;
    if (state.modalEl === modal) state.modalEl = null;
    if ((!options || !options.silent) && callback) callback();
  }

  function closeAllModals() {
    ['modalResume', 'modalPause', 'modalTimeout', 'modalSolutions'].forEach(function (id) {
      var modal = document.getElementById(id);
      if (modal && !modal.hidden) closeModal(modal, { silent: true });
    });
    state.modalOnClose = null;
  }

  /* ------------------------------------------------------------------ *
   * BroadcastChannel / storage
   * ------------------------------------------------------------------ */
  function bcast(payload) {
    if (!state.channel) return;
    try {
      state.channel.postMessage(payload);
    } catch (e) {
      /* ignore */
    }
  }

  function setupBroadcast() {
    try {
      if (typeof window.BroadcastChannel === 'function') {
        state.channel = new window.BroadcastChannel(CHANNEL);
        state.channel.onmessage = function (event) {
          handleMessage(event && event.data);
        };
      }
    } catch (e) {
      state.channel = null;
    }
    window.addEventListener('storage', onStorage);
  }

  function onStorage(event) {
    if (!event || !event.key || event.key.indexOf(NS) !== 0) return;
    var payload = parseJSON(event.newValue);
    if (!payload || typeof payload !== 'object') return;
    if (event.key === NS + 'command') {
      handleMessage({ type: 'command', cmd: payload.cmd, id: payload.id });
    } else if (event.key === NS + 'broadcast') {
      handleMessage({ type: 'broadcast', text: payload.text, id: payload.id });
    } else if (event.key === NS + 'hint') {
      handleMessage({ type: 'hint', text: payload.text, id: payload.id });
    }
  }

  function handleMessage(message) {
    if (!message || typeof message !== 'object') return;
    var id = message.id == null ? '' : String(message.id);
    if (id) {
      if (state.seenIds[id]) return;
      state.seenIds[id] = true;
      var keys = Object.keys(state.seenIds);
      if (keys.length > 160) {
        keys.slice(0, 80).forEach(function (key) {
          delete state.seenIds[key];
        });
      }
    }
    if (message.type === 'command') {
      handleCommand(message.cmd);
    } else if (message.type === 'broadcast') {
      if (message.text) toast(I18N.t('game.toast.broadcast', { text: message.text }), 'warn');
    } else if (message.type === 'hint') {
      if (message.text) toast(I18N.t('game.toast.hint', { text: message.text }), 'ok');
    }
  }

  function handleCommand(cmd) {
    if (cmd === 'pause') {
      if (state.phase === 'playing') {
        toast(I18N.t('game.toast.paused'), 'warn');
        pauseGame(true);
      }
    } else if (cmd === 'resume') {
      if (state.phase === 'paused') {
        closeModal('modalPause', { silent: true });
        resumeGame();
        toast(I18N.t('game.toast.resumed'), 'ok');
      }
    } else if (cmd === 'reset') {
      resetByAdmin();
    }
  }

  /* ------------------------------------------------------------------ *
   * 存档 / live / results
   * ------------------------------------------------------------------ */
  function snapKey() {
    return NS + 'snapshot:' + scenarioKey;
  }

  function buildSnapshot() {
    return {
      v: 1,
      scenario: scenarioKey,
      team: state.team,
      teamKey: state.teamKey,
      current: state.current,
      score: state.score,
      elapsed: Math.max(0, Math.min(TOTAL_TIME - 1, Math.floor(elapsedSeconds()))),
      per: state.per.map(function (item) {
        item = item || freshPerEntry();
        return {
          attempts: Number(item.attempts) || 0,
          hints: Number(item.hints) || 0,
          resolved: !!item.resolved,
          revealed: !!item.revealed,
          score: Number(item.score) || 0,
          draft: typeof item.draft === 'string' ? item.draft : ''
        };
      }),
      savedAt: Date.now()
    };
  }

  function saveSnapshot() {
    if (state.phase !== 'playing' && state.phase !== 'paused') return;
    if (!state.teamKey) return;
    var payload = buildSnapshot();
    writeJSON(snapKey(), payload);
    state.pendingSnapshot = payload;
    updateResumeAffordance();
  }

  function clearSnapshot() {
    removeKey(snapKey());
    state.pendingSnapshot = null;
    updateResumeAffordance();
  }

  function validSnapshot(snap) {
    return !!(
      snap &&
      typeof snap === 'object' &&
      snap.v === 1 &&
      typeof snap.team === 'string' &&
      snap.team.length > 0 &&
      Array.isArray(snap.per) &&
      enigmas.length > 0
    );
  }

  function loadSnapshotRaw() {
    var snap = readJSON(snapKey(), null);
    return validSnapshot(snap) ? snap : null;
  }

  function updateResumeAffordance() {
    var has = !!loadSnapshotRaw();
    if (dom.resumeBtn) dom.resumeBtn.hidden = !(has && state.phase === 'welcome');
    return has;
  }

  function buildLive() {
    var total = enigmas.length;
    var status = 'playing';
    if (state.phase === 'paused') status = 'paused';
    else if (state.phase === 'finished') status = state.resultStatus || 'won';
    return {
      team: state.team,
      key: state.teamKey,
      scenario: scenarioKey,
      current: total ? Math.min(total, state.current + 1) : 0,
      solved: resolvedCount(),
      score: state.score,
      attempts: sumAttempts(),
      hints: sumHints(),
      elapsed: Math.max(0, Math.min(TOTAL_TIME, Math.floor(elapsedSeconds()))),
      totalTime: TOTAL_TIME,
      status: status,
      updatedAt: Date.now()
    };
  }

  function syncLive() {
    if (!state.teamKey || state.phase === 'welcome') return;
    var live = buildLive();
    var all = readJSON(NS + 'live', {});
    if (!all || typeof all !== 'object' || Array.isArray(all)) all = {};
    all[state.teamKey] = live;
    writeJSON(NS + 'live', all);
    state.lastLive = Date.now();
    bcast({ type: 'live', team: live });
  }

  function writeResult() {
    if (!state.teamKey) return;
    var record = {
      team: state.team,
      key: state.teamKey,
      scenario: scenarioKey,
      score: state.score,
      solved: resolvedCount(),
      elapsed: Math.max(0, Math.min(TOTAL_TIME, Math.floor(state.elapsedBefore))),
      status: state.resultStatus || 'won',
      finishedAt: Date.now()
    };
    var list = readJSON(NS + 'results', []);
    if (!Array.isArray(list)) list = [];
    list = list.filter(function (item) {
      return !(item && item.key === record.key);
    });
    list.unshift(record);
    if (list.length > 300) list = list.slice(0, 300);
    writeJSON(NS + 'results', list);
    bcast({ type: 'results', result: record });
  }

  /* ------------------------------------------------------------------ *
   * 渲染：浏览器标题 / 欢迎屏 / HUD / 索引
   * ------------------------------------------------------------------ */
  function applyDocumentMeta() {
    var mode = scenario ? I18N.pick(scenario.title) : '';
    document.title = mode || I18N.t('page.title');
  }

  function renderWelcome() {
    if (!scenario || !dom.welcomeTitle) return;
    setText(dom.welcomeCode, scenario.code || '—');
    setText(dom.welcomeTitle, I18N.pick(scenario.title) || I18N.t('site.name'));
    setText(dom.welcomeBrief, I18N.pick(scenario.briefing) || '');
    setText(dom.welcomeLabel, I18N.pick(scenario.label) || '—');
    setText(dom.welcomeDifficulty, I18N.t('game.difficulty', { n: scenario.difficulty || 1 }));
    setText(dom.welcomeStages, I18N.t('game.meta.stagesCount', { n: enigmas.length }));
    setText(
      dom.welcomeMode,
      (scenario.code ? scenario.code + ' · ' : '') + (I18N.pick(scenario.label) || '—')
    );
    setText(dom.welcomeStageCount, I18N.t('game.meta.stagesCount', { n: enigmas.length }));
    setText(dom.welcomeDuration, I18N.t('game.meta.duration'));
    renderDataState();
    updateResumeAffordance();
  }

  function renderDataState() {
    var hasData = enigmas.length > 0;
    var hasProblem = !hasData || missingKeys.length > 0;
    show(dom.dataEmpty, hasProblem);
    if (hasProblem) {
      var body = '';
      if (missingKeys.length) {
        body = I18N.t('game.empty.body', { n: missingKeys.length, keys: missingKeys.join(', ') });
      } else if (!configFound) {
        body = I18N.t('game.empty.config');
      } else {
        body = I18N.t('game.empty.body', { n: 0, keys: '—' });
      }
      setText(dom.dataEmptyBody, body);
    }
    if (dom.startBtn) dom.startBtn.disabled = !hasData;
    if (dom.teamInput) dom.teamInput.disabled = !hasData;
  }

  function buildProgressSegments() {
    if (!dom.hudProgress) return;
    clear(dom.hudProgress);
    enigmas.forEach(function () {
      var seg = document.createElement('span');
      seg.className = 'g-hud__seg';
      seg.setAttribute('data-state', 'todo');
      seg.setAttribute('aria-hidden', 'true');
      dom.hudProgress.appendChild(seg);
    });
  }

  function updateClock() {
    if (!dom.hudTimer) return;
    var remaining = remainingSeconds();
    var text = I18N.fmtTime(remaining);
    setText(dom.hudTimer, text);
    if (remaining < 300) dom.hudTimer.setAttribute('data-tone', 'alert');
    else if (remaining < 600) dom.hudTimer.setAttribute('data-tone', 'warn');
    else dom.hudTimer.removeAttribute('data-tone');
    dom.hudTimer.setAttribute('aria-label', I18N.t('game.a11y.timer', { time: text }));
  }

  function renderHud() {
    if (!dom.hud) return;
    var total = enigmas.length;
    setText(
      dom.hudMode,
      scenario ? (scenario.code ? scenario.code + ' · ' : '') + (I18N.pick(scenario.label) || '—') : '—'
    );
    setText(dom.hudTeam, state.team || '—');
    setText(dom.hudScore, String(state.score));
    updateClock();
    var stageNo = total ? Math.min(total, state.current + 1) : 0;
    setText(dom.hudStageLabel, I18N.t('game.hud.stage', { n: stageNo, total: total }));
    if (dom.hudProgress) {
      dom.hudProgress.setAttribute(
        'aria-label',
        I18N.t('game.a11y.progress', { done: resolvedCount(), total: total })
      );
      var segments = dom.hudProgress.children;
      for (var i = 0; i < segments.length; i++) {
        var per = state.per[i];
        var segState = per && per.resolved ? 'done' : i === state.current ? 'current' : 'todo';
        segments[i].setAttribute('data-state', segState);
      }
    }
  }

  function buildIndex() {
    if (!dom.indexList) return;
    clear(dom.indexList);
    enigmas.forEach(function (enigma, index) {
      var item = document.createElement('li');
      item.className = 'g-index__item';
      item.setAttribute('data-state', 'todo');
      var number = document.createElement('span');
      number.className = 'g-index__n';
      number.textContent = pad2(index + 1);
      var title = document.createElement('span');
      title.className = 'g-index__t';
      var status = document.createElement('span');
      status.className = 'g-index__s';
      item.appendChild(number);
      item.appendChild(title);
      item.appendChild(status);
      dom.indexList.appendChild(item);
    });
  }

  function renderIndex() {
    if (!dom.indexList) return;
    var items = dom.indexList.children;
    for (var i = 0; i < items.length; i++) {
      var enigma = enigmas[i];
      var per = state.per[i] || freshPerEntry();
      var item = items[i];
      var title = item.querySelector('.g-index__t');
      var status = item.querySelector('.g-index__s');
      setText(title, enigmaTitle(enigma));
      if (per.resolved) {
        item.setAttribute('data-state', 'done');
        setText(status, I18N.t('game.index.done'));
      } else if (i === state.current) {
        item.setAttribute('data-state', 'current');
        setText(status, I18N.t('game.index.current'));
      } else {
        item.setAttribute('data-state', 'todo');
        setText(status, I18N.t('game.index.todo'));
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * 渲染：关卡
   * ------------------------------------------------------------------ */
  function renderFeedback() {
    if (!dom.feedback) return;
    var feedback = state.feedback;
    if (!feedback) {
      show(dom.feedback, false);
      dom.feedback.removeAttribute('data-tone');
      return;
    }
    show(dom.feedback, true);
    dom.feedback.setAttribute('data-tone', feedback.tone || 'info');
    setText(dom.feedback, I18N.t(feedback.key, feedback.vars || {}));
  }

  function renderHints(hints, shown) {
    if (!dom.hints) return;
    if (dom.hints.children.length !== shown) {
      clear(dom.hints);
      for (var i = 0; i < shown; i++) {
        var item = document.createElement('li');
        var number = document.createElement('span');
        number.className = 'mono g-hints__n';
        number.textContent = pad2(i + 1);
        var body = document.createElement('span');
        body.textContent = hints[i] == null ? '' : String(hints[i]);
        item.appendChild(number);
        item.appendChild(body);
        dom.hints.appendChild(item);
      }
    } else {
      for (var j = 0; j < shown; j++) {
        var node = dom.hints.children[j];
        if (node && node.lastChild) node.lastChild.textContent = hints[j] == null ? '' : String(hints[j]);
      }
    }
  }

  function renderSolved() {
    var enigma = currentEnigma();
    var per = state.per[state.current];
    var visible = !!(enigma && per && per.resolved);
    show(dom.solvedPanel, visible);
    if (!visible) return;
    setText(dom.solvedStamp, I18N.t(per.revealed ? 'game.enigma.revealed' : 'game.enigma.solved'));
    dom.solvedStamp.className = 'stamp ' + (per.revealed ? 'stamp--warn' : 'stamp--ok');
    setText(dom.solvedAnswer, I18N.t('game.enigma.answerIs', { answer: answerDisplay(enigma) }));
    var explain = I18N.pick(enigma.explain);
    if (explain) dom.solvedBody.innerHTML = explain;
    else clear(dom.solvedBody);
  }

  function renderEnigma(options) {
    options = options || {};
    var enigma = currentEnigma();
    if (!enigma || !dom.enigmaCard) return;
    var index = state.current;
    var per = state.per[index] || (state.per[index] = freshPerEntry());
    var total = enigmas.length;

    setText(dom.enigmaCode, enigma.code || 'EN-' + pad2(index + 1));
    setText(dom.enigmaTag, enigmaTag(enigma));
    show(dom.enigmaTag, !!enigmaTag(enigma));
    setText(dom.enigmaCount, I18N.t('game.enigma.count', { n: pad2(index + 1), total: pad2(total) }));
    setText(dom.enigmaTitle, enigmaTitle(enigma));
    setText(dom.enigmaBrief, I18N.pick(enigma.brief) || '');
    dom.enigmaContent.innerHTML = I18N.pick(enigma.content) || '';

    show(dom.answerArea, !per.resolved);
    dom.answerInput.disabled = per.resolved;
    dom.submitBtn.disabled = per.resolved;
    dom.answerInput.value = per.draft || '';
    dom.answerInput.removeAttribute('data-state');
    var note = I18N.pick(enigma.answerNote);
    setText(dom.answerNote, note || '');
    show(dom.answerNote, !!note);
    setText(dom.attemptsLabel, I18N.t('game.enigma.attempts', { n: per.attempts, max: MAX_ATTEMPTS }));

    var hints = enigmaHints(enigma);
    var shownHints = Math.min(per.hints, hints.length);
    renderHints(hints, shownHints);
    var hintMax = Math.min(MAX_HINTS, hints.length);
    setText(dom.hintsCount, I18N.t('game.enigma.hintsCount', { n: shownHints, max: hintMax }));
    dom.hintBtn.disabled =
      per.resolved || !!state.autoTimer || shownHints >= hints.length || hints.length === 0;
    dom.hintBtn.setAttribute('aria-pressed', shownHints > 0 ? 'true' : 'false');
    dom.hintBtn.setAttribute('aria-expanded', shownHints > 0 ? 'true' : 'false');

    if (per.resolved) {
      show(dom.enigmaState, true);
      setText(dom.enigmaState, I18N.t(per.revealed ? 'game.enigma.revealed' : 'game.enigma.solved'));
      dom.enigmaState.className = 'stamp ' + (per.revealed ? 'stamp--warn' : 'stamp--ok');
    } else {
      show(dom.enigmaState, false);
    }

    renderSolved();
    renderFeedback();
    setText(dom.autoNote, state.autoTimer ? I18N.t('game.enigma.advancing') : '');

    dom.prevBtn.disabled = index <= 0;
    dom.nextBtn.disabled = !per.resolved;

    if (options.focus) {
      try {
        dom.enigmaTitle.focus();
      } catch (e) {
        /* ignore */
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * 渲染：结束屏与弹层内容
   * ------------------------------------------------------------------ */
  function renderFinish() {
    if (!dom.finishTitle) return;
    var total = enigmas.length;
    var status = state.resultStatus || 'won';
    var isTimeout = status === 'timeout';
    setText(dom.finishTitle, I18N.t(isTimeout ? 'game.finish.timeout' : 'game.finish.won'));
    dom.finishStamp.className = 'stamp ' + (isTimeout ? 'stamp--alert' : 'stamp--ok');
    setText(dom.finishStamp, I18N.t(isTimeout ? 'status.timeout' : 'status.won'));
    setText(dom.statSolved, resolvedCount() + ' / ' + total);
    setText(dom.statScore, String(state.score));
    setText(dom.statTime, I18N.fmtTime(state.elapsedBefore));
    setText(dom.statStatus, I18N.t('status.' + status));
    setText(dom.reportId, (scenario && scenario.code ? scenario.code : scenarioKey) + ' · ' + state.team);

    clear(dom.reportBody);
    enigmas.forEach(function (enigma, index) {
      var per = state.per[index] || freshPerEntry();
      var row = document.createElement('tr');

      var stageCell = document.createElement('td');
      var code = document.createElement('span');
      code.className = 'mono';
      code.textContent = enigma.code || 'EN-' + pad2(index + 1);
      stageCell.appendChild(code);
      stageCell.appendChild(document.createTextNode(' ' + enigmaTitle(enigma)));

      var resultCell = document.createElement('td');
      if (per.resolved) {
        setText(resultCell, I18N.t(per.revealed ? 'game.finish.result.revealed' : 'game.finish.result.solved'));
      } else {
        setText(resultCell, I18N.t('game.finish.result.missed'));
      }

      var scoreCell = document.createElement('td');
      setText(scoreCell, per.resolved && !per.revealed ? String(per.score) : '—');

      row.appendChild(stageCell);
      row.appendChild(resultCell);
      row.appendChild(scoreCell);
      dom.reportBody.appendChild(row);
    });
  }

  function renderResumeMeta(snap) {
    snap = snap || state.pendingSnapshot || loadSnapshotRaw();
    if (!snap || !dom.resumeMeta) return;
    var total = enigmas.length;
    var index = Math.max(0, Math.min(total - 1, Number(snap.current) || 0));
    setText(
      dom.resumeMeta,
      I18N.t('game.resume.meta', {
        team: snap.team || '—',
        n: index + 1,
        total: total,
        time: I18N.fmtTime(Number(snap.elapsed) || 0)
      })
    );
  }

  function renderPauseMeta(fromAdmin) {
    if (!dom.pauseMeta) return;
    if (fromAdmin == null) fromAdmin = state.pausedByAdmin;
    if (fromAdmin) {
      setText(dom.pauseMeta, I18N.t('game.pause.admin'));
      return;
    }
    var total = enigmas.length;
    var stageNo = total ? Math.min(total, state.current + 1) : 0;
    setText(
      dom.pauseMeta,
      (state.team || '—') +
        ' · ' +
        I18N.t('game.hud.stage', { n: stageNo, total: total }) +
        ' · ' +
        I18N.fmtTime(elapsedSeconds())
    );
  }

  function renderTimeoutMeta() {
    if (!dom.timeoutMeta) return;
    setText(
      dom.timeoutMeta,
      I18N.t('game.timeout.summary', {
        solved: resolvedCount(),
        total: enigmas.length,
        score: state.score
      })
    );
  }

  function renderSolutions() {
    if (!dom.solutionsBody) return;
    clear(dom.solutionsBody);
    if (!enigmas.length) {
      setText(dom.solutionsBody, I18N.t('game.solutions.empty'));
      return;
    }
    enigmas.forEach(function (enigma, index) {
      var per = state.per[index] || freshPerEntry();
      var wrap = document.createElement('div');
      wrap.className = 'g-solution';

      var head = document.createElement('div');
      head.className = 'g-solution__head';
      var code = document.createElement('span');
      code.className = 'mono';
      code.textContent = enigma.code || 'EN-' + pad2(index + 1);
      var title = document.createElement('span');
      title.className = 'g-solution__title';
      title.textContent = enigmaTitle(enigma);
      var stamp = document.createElement('span');
      if (per.resolved) {
        stamp.className = 'stamp ' + (per.revealed ? 'stamp--warn' : 'stamp--ok');
        stamp.textContent = I18N.t(per.revealed ? 'game.finish.result.revealed' : 'game.finish.result.solved');
      } else {
        stamp.className = 'stamp';
        stamp.textContent = I18N.t('game.finish.result.missed');
      }
      head.appendChild(code);
      head.appendChild(title);
      head.appendChild(stamp);
      wrap.appendChild(head);

      var answer = document.createElement('p');
      answer.className = 'g-solution__answer';
      answer.textContent = I18N.t('game.solutions.answer') + ' · ' + answerDisplay(enigma);
      wrap.appendChild(answer);

      var explain = I18N.pick(enigma.explain);
      if (explain) {
        var body = document.createElement('p');
        body.className = 'g-solution__explain';
        body.textContent = explain;
        wrap.appendChild(body);
      }
      dom.solutionsBody.appendChild(wrap);
    });
  }

  /* ------------------------------------------------------------------ *
   * 视图切换
   * ------------------------------------------------------------------ */
  function showView(name) {
    state.view = name;
    show(dom.viewWelcome, name === 'welcome');
    show(dom.viewStage, name === 'stage');
    show(dom.viewFinish, name === 'finish');
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    syncHeadOffset();
  }

  function syncHeadOffset() {
    var head = document.querySelector('.site-head');
    if (!head) return;
    var height = Math.round(head.getBoundingClientRect().height);
    if (height > 0) document.documentElement.style.setProperty('--g-head-h', height + 'px');
  }

  /* ------------------------------------------------------------------ *
   * 队伍错误提示
   * ------------------------------------------------------------------ */
  function showTeamError(message) {
    if (!dom.teamError) return;
    setText(dom.teamError, message);
    show(dom.teamError, true);
    dom.teamInput.setAttribute('aria-invalid', 'true');
  }

  function hideTeamError() {
    if (!dom.teamError) return;
    show(dom.teamError, false);
    dom.teamInput.removeAttribute('aria-invalid');
  }

  function initialTeam() {
    var fromUrl = '';
    try {
      var params = new window.URLSearchParams(window.location.search);
      fromUrl = params.get('team') || '';
    } catch (e) {
      fromUrl = '';
    }
    var team = String(fromUrl || readRaw(NS + 'lastTeam', '') || '')
      .trim()
      .slice(0, 20);
    return team;
  }

  /* ------------------------------------------------------------------ *
   * 自动进入下一关
   * ------------------------------------------------------------------ */
  function clearAdvance() {
    if (state.autoTimer) {
      window.clearTimeout(state.autoTimer);
      state.autoTimer = null;
    }
  }

  function scheduleAdvance(delay) {
    clearAdvance();
    state.pendingAdvance = false;
    state.autoTimer = window.setTimeout(function () {
      state.autoTimer = null;
      advanceAfterResolve();
    }, delay);
    setText(dom.autoNote, I18N.t('game.enigma.advancing'));
  }

  function advanceAfterResolve() {
    if (state.phase !== 'playing' && state.phase !== 'paused') return;
    setText(dom.autoNote, '');
    if (allResolved()) {
      finishGame('won');
      return;
    }
    var next = -1;
    for (var i = state.current + 1; i < enigmas.length; i++) {
      if (!state.per[i].resolved) {
        next = i;
        break;
      }
    }
    if (next < 0) {
      for (var j = 0; j < enigmas.length; j++) {
        if (!state.per[j].resolved) {
          next = j;
          break;
        }
      }
    }
    if (next < 0) {
      finishGame('won');
      return;
    }
    goTo(next, true);
  }

  function goTo(index, focus) {
    if (index < 0 || index >= enigmas.length) return;
    clearAdvance();
    state.pendingAdvance = false;
    state.current = index;
    state.feedback = null;
    setText(dom.autoNote, '');
    renderEnigma({ focus: !!focus });
    renderHud();
    renderIndex();
    saveSnapshot();
    syncLive();
  }

  /* ------------------------------------------------------------------ *
   * 开始 / 暂停 / 继续 / 结束 / 重开
   * ------------------------------------------------------------------ */
  function startGame(rawTeam) {
    var team = String(rawTeam == null ? '' : rawTeam).trim().slice(0, 20);
    if (!team) {
      showTeamError(I18N.t('game.team.required'));
      dom.teamInput.focus();
      return;
    }
    if (!enigmas.length) {
      toast(I18N.t('game.empty.title'), 'warn');
      return;
    }
    hideTeamError();
    state.team = team;
    state.teamKey = teamKeyOf(team);
    state.phase = 'playing';
    state.resultStatus = '';
    state.current = 0;
    state.per = enigmas.map(freshPerEntry);
    state.score = 0;
    state.feedback = null;
    state.elapsedBefore = 0;
    state.startedAt = Date.now();
    state.pendingAdvance = false;
    clearAdvance();
    dom.teamInput.value = team;
    writeRaw(NS + 'lastTeam', team);
    showView('stage');
    renderHud();
    renderIndex();
    renderEnigma({ focus: true });
    startClock();
    saveSnapshot();
    syncLive();
    toast(I18N.t('game.toast.started'), 'ok');
  }

  function computeScore(per) {
    var points =
      BASE_SCORE +
      remainingSeconds() * SECONDS_BONUS -
      (Number(per.attempts) || 0) * ATTEMPT_PENALTY -
      (Number(per.hints) || 0) * HINT_PENALTY;
    return Math.max(0, Math.round(points));
  }

  function submitAnswer() {
    if (state.phase !== 'playing' || state.autoTimer) return;
    var enigma = currentEnigma();
    var per = state.per[state.current];
    if (!enigma || !per || per.resolved) return;
    var raw = dom.answerInput.value;
    if (!String(raw == null ? '' : raw).trim()) {
      toast(I18N.t('game.feedback.empty'), 'warn');
      dom.answerInput.focus();
      return;
    }

    if (isCorrectAnswer(enigma, raw)) {
      per.resolved = true;
      per.score = computeScore(per);
      state.score += per.score;
      state.feedback = { tone: 'ok', key: 'game.feedback.correct', vars: { points: per.score } };
      renderEnigma();
      renderHud();
      renderIndex();
      saveSnapshot();
      syncLive();
      scheduleAdvance(AUTO_NEXT_DELAY);
      return;
    }

    per.attempts += 1;
    per.draft = String(raw);
    if (per.attempts >= MAX_ATTEMPTS) {
      per.resolved = true;
      per.revealed = true;
      per.score = 0;
      state.feedback = {
        tone: 'bad',
        key: 'game.feedback.revealed',
        vars: { answer: answerDisplay(enigma) }
      };
      renderEnigma();
      renderHud();
      renderIndex();
      saveSnapshot();
      syncLive();
      scheduleAdvance(AUTO_REVEAL_DELAY);
      return;
    }

    state.feedback = {
      tone: 'bad',
      key: 'game.feedback.wrong',
      vars: { left: MAX_ATTEMPTS - per.attempts }
    };
    dom.answerInput.setAttribute('data-state', 'bad');
    setText(dom.attemptsLabel, I18N.t('game.enigma.attempts', { n: per.attempts, max: MAX_ATTEMPTS }));
    renderFeedback();
    dom.answerInput.focus();
    try {
      dom.answerInput.select();
    } catch (e) {
      /* ignore */
    }
    saveSnapshot();
    syncLive();
  }

  function useHint() {
    if (state.phase !== 'playing' || state.autoTimer) return;
    var enigma = currentEnigma();
    var per = state.per[state.current];
    if (!enigma || !per || per.resolved) return;
    var hints = enigmaHints(enigma);
    if (!hints.length) return;
    if (per.hints >= MAX_HINTS || per.hints >= hints.length) return;
    per.hints += 1;
    state.feedback = { tone: 'info', key: 'game.feedback.hint', vars: { n: per.hints } };
    renderEnigma();
    saveSnapshot();
    syncLive();
  }

  function pauseGame(fromAdmin) {
    if (state.phase !== 'playing') return;
    stopClock();
    state.phase = 'paused';
    state.pausedByAdmin = !!fromAdmin;
    if (state.autoTimer) {
      clearAdvance();
      state.pendingAdvance = true;
    }
    setText(dom.autoNote, '');
    updateClock();
    renderHud();
    renderPauseMeta(!!fromAdmin);
    openModal('modalPause', resumeGame);
    saveSnapshot();
    syncLive();
  }

  function resumeGame() {
    if (state.phase !== 'paused') return;
    state.phase = 'playing';
    state.pausedByAdmin = false;
    startClock();
    renderHud();
    if (state.pendingAdvance) {
      state.pendingAdvance = false;
      scheduleAdvance(AUTO_NEXT_DELAY);
    }
    saveSnapshot();
    syncLive();
  }

  function finishGame(status) {
    if (state.phase === 'finished') return;
    clearAdvance();
    state.pendingAdvance = false;
    stopClock();
    state.elapsedBefore = Math.max(0, Math.min(TOTAL_TIME, state.elapsedBefore));
    state.phase = 'finished';
    state.resultStatus = status;
    updateClock();
    showView('finish');
    renderFinish();
    renderHud();
    syncLive();
    writeResult();
    clearSnapshot();
    updateResumeAffordance();
    if (status === 'timeout') {
      renderTimeoutMeta();
      openModal('modalTimeout');
    }
  }

  function resetRuntime() {
    clearAdvance();
    state.pendingAdvance = false;
    state.phase = 'welcome';
    state.view = 'welcome';
    state.team = '';
    state.teamKey = '';
    state.current = 0;
    state.per = enigmas.map(freshPerEntry);
    state.score = 0;
    state.elapsedBefore = 0;
    state.startedAt = 0;
    state.resultStatus = '';
    state.pausedByAdmin = false;
    state.feedback = null;
    closeAllModals();
    hideTeamError();
  }

  function restartToWelcome() {
    clearSnapshot();
    resetRuntime();
    dom.teamInput.value = initialTeam();
    showView('welcome');
    renderWelcome();
    renderHud();
    renderIndex();
    renderEnigma();
    updateResumeAffordance();
  }

  function resetByAdmin() {
    clearSnapshot();
    resetRuntime();
    dom.teamInput.value = initialTeam();
    showView('welcome');
    renderWelcome();
    renderHud();
    renderIndex();
    renderEnigma();
    updateResumeAffordance();
    toast(I18N.t('game.toast.reset'), 'warn');
  }

  function continueSnapshot() {
    var snap = state.pendingSnapshot || loadSnapshotRaw();
    if (!snap) {
      closeModal('modalResume', { silent: true });
      return;
    }
    state.team = String(snap.team || '')
      .trim()
      .slice(0, 20);
    if (!state.team) state.team = I18N.t('game.team.label');
    state.teamKey = snap.teamKey ? String(snap.teamKey) : teamKeyOf(state.team);
    state.score = Math.max(0, Number(snap.score) || 0);
    state.current = Math.max(0, Math.min(enigmas.length - 1, Number(snap.current) || 0));
    state.per = enigmas.map(function (enigma, index) {
      var saved = Array.isArray(snap.per) ? snap.per[index] : null;
      var per = freshPerEntry();
      if (saved && typeof saved === 'object') {
        per.attempts = Math.max(0, Math.min(MAX_ATTEMPTS, Number(saved.attempts) || 0));
        per.hints = Math.max(0, Math.min(MAX_HINTS, Number(saved.hints) || 0));
        per.resolved = !!saved.resolved;
        per.revealed = !!saved.revealed;
        per.score = Math.max(0, Number(saved.score) || 0);
        per.draft = typeof saved.draft === 'string' ? saved.draft : '';
      }
      return per;
    });
    state.feedback = null;
    state.elapsedBefore = Math.max(0, Math.min(TOTAL_TIME - 1, Number(snap.elapsed) || 0));
    state.phase = 'playing';
    state.resultStatus = '';
    state.startedAt = Date.now();
    clearAdvance();
    state.pendingAdvance = false;
    closeModal('modalResume', { silent: true });
    dom.teamInput.value = state.team;
    hideTeamError();

    if (allResolved()) {
      finishGame('won');
      return;
    }
    showView('stage');
    renderHud();
    renderIndex();
    renderEnigma({ focus: true });
    saveSnapshot();
    syncLive();
    toast(I18N.t('game.toast.resumedGame'), 'ok');
  }

  function restartFromResume() {
    clearSnapshot();
    closeModal('modalResume', { silent: true });
    state.pendingSnapshot = null;
    hideTeamError();
    showView('welcome');
    renderWelcome();
    updateResumeAffordance();
  }

  function openSolutions() {
    renderSolutions();
    openModal('modalSolutions');
  }

  function checkPendingSnapshot() {
    var snap = loadSnapshotRaw();
    if (!snap) {
      updateResumeAffordance();
      return;
    }
    state.pendingSnapshot = snap;
    renderResumeMeta(snap);
    updateResumeAffordance();
    openModal('modalResume');
  }

  /* ------------------------------------------------------------------ *
   * 计时器主循环
   * ------------------------------------------------------------------ */
  function tick() {
    if (state.phase !== 'playing') return;
    updateClock();
    if (remainingSeconds() <= 0) {
      finishGame('timeout');
      return;
    }
    if (Date.now() - state.lastLive >= LIVE_SYNC_MS) {
      syncLive();
      saveSnapshot();
    }
  }

  /* ------------------------------------------------------------------ *
   * 语言切换：动态内容整体重绘
   * ------------------------------------------------------------------ */
  function handleLanguageChange() {
    applyDocumentMeta();
    renderWelcome();
    renderHud();
    renderIndex();
    renderEnigma();
    renderFinish();
    renderResumeMeta();
    if (state.phase === 'paused' && dom.modalPause && !dom.modalPause.hidden) renderPauseMeta();
    if (dom.timeoutMeta) renderTimeoutMeta();
    if (dom.modalSolutions && !dom.modalSolutions.hidden) renderSolutions();
    syncHeadOffset();
  }

  /* ------------------------------------------------------------------ *
   * 事件绑定
   * ------------------------------------------------------------------ */
  function bindEvents() {
    if (dom.teamForm) {
      dom.teamForm.addEventListener('submit', function (event) {
        event.preventDefault();
        startGame(dom.teamInput.value);
      });
    }
    if (dom.teamInput) dom.teamInput.addEventListener('input', hideTeamError);
    if (dom.resumeBtn) {
      dom.resumeBtn.addEventListener('click', function () {
        var snap = loadSnapshotRaw();
        if (!snap) {
          updateResumeAffordance();
          return;
        }
        state.pendingSnapshot = snap;
        continueSnapshot();
      });
    }
    if (dom.resumeContinue) dom.resumeContinue.addEventListener('click', continueSnapshot);
    if (dom.resumeRestart) dom.resumeRestart.addEventListener('click', restartFromResume);

    if (dom.answerForm) {
      dom.answerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitAnswer();
      });
    }
    if (dom.answerInput) {
      dom.answerInput.addEventListener('input', function () {
        var per = state.per[state.current];
        if (per) per.draft = dom.answerInput.value;
        if (dom.answerInput.getAttribute('data-state')) dom.answerInput.removeAttribute('data-state');
      });
    }
    if (dom.hintBtn) dom.hintBtn.addEventListener('click', useHint);
    if (dom.prevBtn) {
      dom.prevBtn.addEventListener('click', function () {
        goTo(state.current - 1, true);
      });
    }
    if (dom.nextBtn) {
      dom.nextBtn.addEventListener('click', function () {
        var per = state.per[state.current];
        if (!per || !per.resolved) return;
        var next = state.current + 1;
        if (next < enigmas.length) goTo(next, true);
        else if (allResolved()) finishGame('won');
      });
    }
    if (dom.pauseBtn) {
      dom.pauseBtn.addEventListener('click', function () {
        if (state.phase === 'playing') pauseGame(false);
      });
    }
    if (dom.pauseResume) {
      dom.pauseResume.addEventListener('click', function () {
        closeModal('modalPause');
      });
    }
    if (dom.againBtn) dom.againBtn.addEventListener('click', restartToWelcome);
    if (dom.timeoutAgain) dom.timeoutAgain.addEventListener('click', restartToWelcome);
    if (dom.solutionsBtn) dom.solutionsBtn.addEventListener('click', openSolutions);
    if (dom.timeoutSolutions) dom.timeoutSolutions.addEventListener('click', openSolutions);

    toArray(document.querySelectorAll('[data-close]')).forEach(function (button) {
      button.addEventListener('click', function () {
        closeModal(button.getAttribute('data-close'));
      });
    });

    toArray(document.querySelectorAll('.modal')).forEach(function (modal) {
      modal.addEventListener('click', function (event) {
        if (event.target === modal) closeModal(modal);
      });
    });

    window.addEventListener('resize', syncHeadOffset);
    if (typeof window.ResizeObserver === 'function') {
      var head = document.querySelector('.site-head');
      if (head) {
        try {
          new window.ResizeObserver(syncHeadOffset).observe(head);
        } catch (e) {
          /* ignore */
        }
      }
    }

    window.addEventListener('pagehide', function () {
      if (state.phase === 'playing' || state.phase === 'paused') saveSnapshot();
    });
  }

  /* ------------------------------------------------------------------ *
   * 初始化
   * ------------------------------------------------------------------ */
  function init() {
    if (!I18N) {
      if (window.console && window.console.error) window.console.error('[game] I18N 未加载');
      return;
    }
    cacheDom();
    scenario = resolveScenario();
    resolveEnigmas();
    bindEvents();
    setupBroadcast();

    if (!I18N.mounted) {
      try {
        I18N.mountSwitchers(document);
      } catch (e) {
        /* ignore */
      }
    }
    I18N.apply(document);
    applyDocumentMeta();

    buildIndex();
    buildProgressSegments();
    if (dom.teamInput) dom.teamInput.value = initialTeam();
    hideTeamError();

    showView('welcome');
    renderWelcome();
    renderHud();
    renderIndex();
    renderEnigma();
    renderFinish();
    renderSolutions();

    I18N.onChange(handleLanguageChange);

    /* i18n 引擎可能把 boot 推迟到 DOMContentLoaded，会在其后重刷一遍静态文案
       （包括 <title>）。这里在启动完成后补一次动态标题与静态标记，保证标题正确。 */
    var resyncAfterBoot = function () {
      try {
        I18N.apply(document);
      } catch (e) {
        /* ignore */
      }
      applyDocumentMeta();
      syncHeadOffset();
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resyncAfterBoot, { once: true });
    } else {
      window.setTimeout(resyncAfterBoot, 0);
    }

    syncHeadOffset();
    checkPendingSnapshot();
    window.setInterval(tick, 1000);

    if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
      document.fonts.ready.then(syncHeadOffset).catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window, document);
