/* ==========================================================================
   教师控制台 · 页面逻辑
   --------------------------------------------------------------------------
   数据来源（见 DESIGN-SPEC 第五节）：
     localStorage  cyberEscape:live      { [teamKey]: LiveTeam }
                   cyberEscape:results   Result[]
                   cyberEscape:command   { id, cmd:'pause'|'resume'|'reset', at }
                   cyberEscape:broadcast { id, text, at }
                   cyberEscape:hint      { id, text, at }
     BroadcastChannel('cyberEscape')      { type:'live', team } 游戏页 → 控制台
   写入方向：控制台只写 command / broadcast / hint / 演示数据。
   不依赖任何构建工具，无 ES module，无内联事件。
   ========================================================================== */
(function () {
  'use strict';

  var LIVE_KEY = 'cyberEscape:live';
  var RESULTS_KEY = 'cyberEscape:results';
  var COMMAND_KEY = 'cyberEscape:command';
  var BROADCAST_KEY = 'cyberEscape:broadcast';
  var HINT_KEY = 'cyberEscape:hint';
  var SNAPSHOT_PREFIX = 'cyberEscape:snapshot:';
  var CHANNEL_NAME = 'cyberEscape';
  var REFRESH_MS = 5000;
  var MAX_STAGE = 6;
  var STATUSES = ['playing', 'paused', 'won', 'timeout'];
  var SCENARIO_KEYS = ['main', 'classic', 'alt'];
  var STATUS_CLASS = {
    playing: 'stamp--brand',
    paused: 'stamp--warn',
    won: 'stamp--ok',
    timeout: 'stamp--alert'
  };

  var DEMO_PRESETS = [
    { i: 1, scenario: 'main', current: 4, solved: 3, score: 940, attempts: 6, hints: 1, elapsed: 754, status: 'playing', age: 36 },
    { i: 2, scenario: 'classic', current: 6, solved: 5, score: 1780, attempts: 9, hints: 2, elapsed: 1265, status: 'playing', age: 96 },
    { i: 3, scenario: 'alt', current: 3, solved: 2, score: 620, attempts: 4, hints: 0, elapsed: 517, status: 'paused', age: 324 },
    { i: 4, scenario: 'classic', current: 6, solved: 6, score: 2260, attempts: 11, hints: 3, elapsed: 1458, status: 'won', age: 2760 },
    { i: 5, scenario: 'main', current: 5, solved: 4, score: 890, attempts: 7, hints: 1, elapsed: 1500, status: 'timeout', age: 5700 }
  ];

  var state = {
    live: {},
    results: [],
    lastRefresh: 0,
    demo: false,
    detailKey: null
  };

  var els = {};
  var channel = null;
  var refreshTimer = null;
  var refreshQueued = false;
  var lastFocus = null;

  /* ---------- 基础工具 ---------- */

  function $(id) {
    return document.getElementById(id);
  }

  function t(key, vars) {
    return window.I18N ? window.I18N.t(key, vars) : key;
  }

  function pick(value) {
    if (window.I18N) return window.I18N.pick(value);
    return typeof value === 'string' ? value : '';
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function num(value) {
    var n = Number(value);
    return isFinite(n) ? n : 0;
  }

  function clampInt(value, min, max) {
    var n = Math.round(num(value));
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  function teamKeyOf(name) {
    var raw = String(name == null ? '' : name).toLowerCase();
    raw = raw.replace(/[\s.,;:!?'"`~@#$%^&*()_+\-=[\]{}<>|/\\]+/g, '');
    return raw || 'team';
  }

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function timeLocale() {
    if (!window.I18N) return undefined;
    return window.I18N.HTML_LANG[window.I18N.lang] || window.I18N.lang;
  }

  function fmtClock(ts) {
    if (!ts) return '--:--:--';
    try {
      return new Date(ts).toLocaleTimeString(timeLocale(), {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return pad2(new Date(ts).getHours()) + ':' + pad2(new Date(ts).getMinutes()) + ':' + pad2(new Date(ts).getSeconds());
    }
  }

  function fmtDateTime(ts) {
    if (!ts) return '—';
    try {
      return new Date(ts).toLocaleString(timeLocale(), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      var d = new Date(ts);
      return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
    }
  }

  function relativeTime(ts) {
    if (!ts) return t('admin.time.never');
    var diff = Date.now() - ts;
    if (diff < 0) diff = 0;
    var seconds = Math.floor(diff / 1000);
    if (seconds < 45) return t('admin.time.justNow');
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return t('admin.time.minutes', { n: Math.max(1, minutes) });
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return t('admin.time.hours', { n: hours });
    return t('admin.time.days', { n: Math.floor(hours / 24) });
  }

  function fmtTime(totalSeconds) {
    if (window.I18N) return window.I18N.fmtTime(totalSeconds);
    var s = Math.max(0, Math.floor(num(totalSeconds)));
    return pad2(Math.floor(s / 60)) + ':' + pad2(s % 60);
  }

  /* ---------- 数据规范化 ---------- */

  function normalizeTeam(raw, fallbackKey) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    var key = String(raw.key || fallbackKey || teamKeyOf(raw.team));
    var scenario = SCENARIO_KEYS.indexOf(raw.scenario) >= 0 ? raw.scenario : 'main';
    var status = STATUSES.indexOf(raw.status) >= 0 ? raw.status : 'playing';
    return {
      team: String(raw.team == null || raw.team === '' ? t('admin.team.unknown') : raw.team),
      key: key,
      scenario: scenario,
      current: clampInt(raw.current, 1, MAX_STAGE),
      solved: clampInt(raw.solved, 0, MAX_STAGE),
      score: Math.max(0, Math.round(num(raw.score))),
      attempts: Math.max(0, Math.round(num(raw.attempts))),
      hints: Math.max(0, Math.round(num(raw.hints))),
      elapsed: Math.max(0, Math.round(num(raw.elapsed))),
      totalTime: raw.totalTime == null ? null : Math.max(0, Math.round(num(raw.totalTime))),
      status: status,
      updatedAt: Math.max(0, num(raw.updatedAt)),
      demo: raw.demo === true || String(key).indexOf('demo:') === 0,
      demoKey: typeof raw.demoKey === 'string' ? raw.demoKey : null
    };
  }

  function normalizeResult(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    var status = STATUSES.indexOf(raw.status) >= 0 ? raw.status : 'won';
    return {
      team: String(raw.team == null || raw.team === '' ? t('admin.team.unknown') : raw.team),
      key: String(raw.key || teamKeyOf(raw.team)),
      scenario: SCENARIO_KEYS.indexOf(raw.scenario) >= 0 ? raw.scenario : 'main',
      score: Math.max(0, Math.round(num(raw.score))),
      solved: clampInt(raw.solved, 0, MAX_STAGE),
      elapsed: Math.max(0, Math.round(num(raw.elapsed))),
      status: status,
      finishedAt: Math.max(0, num(raw.finishedAt)),
      demo: raw.demo === true
    };
  }

  function readLive() {
    var raw = readJSON(LIVE_KEY, {});
    var out = {};
    if (Array.isArray(raw)) {
      raw.forEach(function (item, index) {
        var team = normalizeTeam(item, item && item.key ? item.key : 'team' + (index + 1));
        if (team) out[team.key] = team;
      });
      return out;
    }
    if (!raw || typeof raw !== 'object') return out;
    Object.keys(raw).forEach(function (storageKey) {
      var item = raw[storageKey];
      var team = normalizeTeam(item, storageKey);
      if (team) out[team.key] = team;
    });
    return out;
  }

  function readResults() {
    var raw = readJSON(RESULTS_KEY, []);
    var list = Array.isArray(raw) ? raw : [];
    var out = [];
    list.forEach(function (item) {
      var result = normalizeResult(item);
      if (result) out.push(result);
    });
    return out;
  }

  /* ---------- 场景与关卡本地化 ---------- */

  function scenarioInfo(key) {
    var scenario = window.SCENARIOS ? window.SCENARIOS[key] : null;
    var fallback = String(key || '').toUpperCase();
    return {
      code: scenario && scenario.code ? scenario.code : fallback,
      label: scenario ? pick(scenario.label) : String(key || ''),
      stageKeys: scenario && Array.isArray(scenario.enigmas) ? scenario.enigmas : []
    };
  }

  function stageInfo(team) {
    var scenario = scenarioInfo(team.scenario);
    var enigmaKey = scenario.stageKeys[team.current - 1];
    var enigma = enigmaKey && window.ENIGMAS ? window.ENIGMAS[enigmaKey] : null;
    var parts = [];
    if (enigma && enigma.code) parts.push(enigma.code);
    var title = enigma ? pick(enigma.title) : '';
    if (title) parts.push(title);
    return {
      code: enigma && enigma.code ? enigma.code : '',
      title: title,
      text: parts.length ? parts.join(' · ') : t('admin.team.stage', { n: team.current })
    };
  }

  function statusLabel(status) {
    return t('status.' + (STATUSES.indexOf(status) >= 0 ? status : 'playing'));
  }

  function displayName(team) {
    if (team.demo && team.demoKey) {
      var translated = t(team.demoKey);
      if (translated && translated !== team.demoKey) return translated;
    }
    return team.team;
  }

  function sortedTeams() {
    var teams = Object.keys(state.live).map(function (key) {
      return state.live[key];
    });
    teams.sort(function (a, b) {
      var aActive = a.status === 'playing' || a.status === 'paused' ? 0 : 1;
      var bActive = b.status === 'playing' || b.status === 'paused' ? 0 : 1;
      if (aActive !== bActive) return aActive - bActive;
      return (b.updatedAt || 0) - (a.updatedAt || 0) || b.score - a.score;
    });
    return teams;
  }

  function sortedResults() {
    return state.results.slice().sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      if (a.elapsed !== b.elapsed) return a.elapsed - b.elapsed;
      return (b.finishedAt || 0) - (a.finishedAt || 0);
    });
  }

  /* ---------- 统计 ---------- */

  function computeStats() {
    var teams = Object.keys(state.live).map(function (key) {
      return state.live[key];
    });
    var liveCount = 0;
    var wonCount = 0;
    var timeoutCount = 0;
    var scoreSum = 0;
    var finishedElapsed = [];
    teams.forEach(function (team) {
      scoreSum += team.score;
      if (team.status === 'playing' || team.status === 'paused') liveCount += 1;
      if (team.status === 'won') wonCount += 1;
      if (team.status === 'timeout') timeoutCount += 1;
      if ((team.status === 'won' || team.status === 'timeout') && team.elapsed > 0) finishedElapsed.push(team.elapsed);
    });
    var total = teams.length;
    var avgScore = total ? Math.round(scoreSum / total) : null;
    var avgTime = finishedElapsed.length
      ? Math.round(finishedElapsed.reduce(function (sum, value) { return sum + value; }, 0) / finishedElapsed.length)
      : null;
    var pct = total ? Math.round((wonCount / total) * 100) : 0;

    /* 没有实时会话时，退回到成绩记录，保证教师仍能看到结果统计 */
    if (!total && state.results.length) {
      var results = state.results;
      wonCount = results.filter(function (r) { return r.status === 'won'; }).length;
      timeoutCount = results.filter(function (r) { return r.status === 'timeout'; }).length;
      scoreSum = results.reduce(function (sum, r) { return sum + r.score; }, 0);
      avgScore = Math.round(scoreSum / results.length);
      var times = results.filter(function (r) { return r.elapsed > 0; }).map(function (r) { return r.elapsed; });
      avgTime = times.length ? Math.round(times.reduce(function (sum, value) { return sum + value; }, 0) / times.length) : null;
      pct = Math.round((wonCount / results.length) * 100);
    }

    return {
      total: total || (state.results.length ? state.results.length : 0),
      live: liveCount,
      won: wonCount,
      timeout: timeoutCount,
      avgScore: avgScore,
      avgTime: avgTime,
      pct: pct
    };
  }

  /* ---------- 渲染：状态行 / 统计 ---------- */

  function renderStatus() {
    var teams = Object.keys(state.live).map(function (key) { return state.live[key]; });
    var online = teams.filter(function (team) {
      return team.status === 'playing' || team.status === 'paused';
    }).length;
    if (els.statusLive) els.statusLive.textContent = t('admin.status.live', { n: online });
    if (els.statusDot) els.statusDot.setAttribute('data-on', online > 0 ? 'true' : 'false');
    if (els.statusRefresh) els.statusRefresh.textContent = t('admin.status.refresh', { time: fmtClock(state.lastRefresh) });
    if (els.demoStamp) els.demoStamp.hidden = !state.demo;
  }

  function renderStats() {
    var stats = computeStats();
    if (els.statLive) els.statLive.textContent = String(stats.live);
    if (els.statLiveSub) {
      els.statLiveSub.textContent = stats.total ? t('admin.status.total', { n: stats.total }) : t('admin.stats.noData');
    }
    if (els.statWon) els.statWon.textContent = String(stats.won);
    if (els.statWonSub) {
      els.statWonSub.textContent = stats.total ? t('admin.stats.completedSub', { pct: stats.pct }) : t('admin.stats.noData');
    }
    if (els.statScore) els.statScore.textContent = stats.avgScore == null ? '—' : String(stats.avgScore);
    if (els.statScoreSub) {
      els.statScoreSub.textContent = stats.total ? t('admin.stats.scoreSub', { n: stats.total }) : t('admin.stats.noData');
    }
    if (els.statTime) els.statTime.textContent = stats.avgTime == null ? '—' : fmtTime(stats.avgTime);
    if (els.statTimeSub) {
      els.statTimeSub.textContent = stats.total ? t('admin.stats.timeSub') : t('admin.stats.noData');
    }
  }

  /* ---------- 渲染：队伍卡片 ---------- */

  function teamCardHTML(team) {
    var scenario = scenarioInfo(team.scenario);
    var stage = stageInfo(team);
    var pct = Math.round((team.solved / MAX_STAGE) * 100);
    var isDemo = team.demo;
    var stageLabel = t('admin.team.stage', { n: team.current });
    return (
      '<article class="team-card plate" data-key="' + esc(team.key) + '" data-status="' + esc(team.status) + '" data-demo="' + (isDemo ? 'true' : 'false') + '">' +
        '<div class="team-card__head">' +
          '<div>' +
            '<h3 class="team-card__name">' + esc(displayName(team)) + '</h3>' +
            '<p class="team-card__scenario">' + esc(scenario.code) + ' · ' + esc(scenario.label) + '</p>' +
          '</div>' +
          '<div class="team-card__marks">' +
            '<span class="stamp ' + (STATUS_CLASS[team.status] || 'stamp--brand') + '">' + esc(statusLabel(team.status)) + '</span>' +
            (isDemo ? '<span class="tag tag--demo">' + esc(t('admin.team.demo')) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="team-card__body">' +
          '<div class="team-card__progress">' +
            '<div class="team-card__progress-row"><span>' + esc(t('admin.team.progress')) + '</span><span>' + team.solved + ' / ' + MAX_STAGE + '</span></div>' +
            '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + MAX_STAGE + '" aria-valuenow="' + team.solved + '" aria-label="' + esc(t('admin.team.progress')) + '"><span style="width:' + pct + '%"></span></div>' +
          '</div>' +
          '<dl class="kv">' +
            '<dt>' + esc(t('admin.team.currentStage')) + '</dt><dd>' + esc(stage.text) + '</dd>' +
            '<dt>' + esc(t('admin.team.score')) + '</dt><dd>' + team.score + ' ' + esc(t('unit.points')) + '</dd>' +
            '<dt>' + esc(t('admin.team.attemptsHints')) + '</dt><dd>' + team.attempts + ' / ' + team.hints + '</dd>' +
            '<dt>' + esc(t('admin.team.lastActive')) + '</dt><dd title="' + esc(fmtDateTime(team.updatedAt)) + '">' + esc(relativeTime(team.updatedAt)) + '</dd>' +
          '</dl>' +
        '</div>' +
        '<div class="team-card__foot">' +
          '<span class="team-card__id" title="' + esc(team.key) + '">' + esc(team.key) + '</span>' +
          '<div class="row team-actions">' +
            '<button type="button" class="btn btn--ghost btn--sm" data-act="detail" data-key="' + esc(team.key) + '">' + esc(t('admin.team.detail')) + '</button>' +
            '<button type="button" class="btn btn--quiet btn--sm" data-act="hint" data-key="' + esc(team.key) + '">' + esc(t('admin.team.hint')) + '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderTeams() {
    var teams = sortedTeams();
    if (els.teamGrid) els.teamGrid.innerHTML = teams.map(teamCardHTML).join('');
    if (els.teamEmpty) els.teamEmpty.hidden = teams.length > 0;
    if (els.teamCount) els.teamCount.textContent = t('admin.teams.count', { n: teams.length });
    if (els.demoNote) els.demoNote.hidden = !state.demo;
    if (els.btnDemo) {
      els.btnDemo.textContent = state.demo ? t('admin.tool.demoClear') : t('admin.tool.demoLoad');
      els.btnDemo.setAttribute('aria-pressed', state.demo ? 'true' : 'false');
      els.btnDemo.classList.toggle('btn--active', state.demo);
    }
  }

  /* ---------- 渲染：成绩表 / 排行榜 ---------- */

  function resultRowHTML(result, index, withFinished) {
    var scenario = scenarioInfo(result.scenario);
    var row = (
      '<tr>' +
        '<td class="mono">' + pad2(index + 1) + '</td>' +
        '<td class="results-team">' + esc(result.team) + '</td>' +
        '<td class="results-mode">' + esc(scenario.code) + ' · ' + esc(scenario.label) + '</td>' +
        '<td class="mono">' + result.solved + ' / ' + MAX_STAGE + '</td>' +
        '<td class="mono">' + fmtTime(result.elapsed) + '</td>' +
        '<td class="mono">' + result.score + '</td>' +
        '<td><span class="stamp ' + (STATUS_CLASS[result.status] || 'stamp--brand') + '">' + esc(statusLabel(result.status)) + '</span></td>'
    );
    if (withFinished) row += '<td class="mono">' + esc(fmtDateTime(result.finishedAt)) + '</td>';
    return row + '</tr>';
  }

  function renderResults() {
    var results = sortedResults();
    if (els.resultsBody) els.resultsBody.innerHTML = results.map(function (item, index) {
      return resultRowHTML(item, index, true);
    }).join('');
    if (els.resultsWrap) els.resultsWrap.hidden = results.length === 0;
    if (els.resultsEmpty) els.resultsEmpty.hidden = results.length > 0;
    if (els.resultCount) els.resultCount.textContent = t('admin.results.count', { n: results.length });
  }

  function standings() {
    var rows = [];
    var seen = {};
    sortedTeams().forEach(function (team) {
      seen[team.key] = true;
      rows.push({
        team: displayName(team),
        key: team.key,
        scenario: team.scenario,
        solved: team.solved,
        elapsed: team.elapsed,
        score: team.score,
        status: team.status
      });
    });
    sortedResults().forEach(function (result) {
      if (seen[result.key]) return;
      rows.push({
        team: result.team,
        key: result.key,
        scenario: result.scenario,
        solved: result.solved,
        elapsed: result.elapsed,
        score: result.score,
        status: result.status
      });
    });
    rows.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.elapsed - b.elapsed;
    });
    return rows;
  }

  function renderLeaderboard() {
    var rows = standings();
    if (els.leaderboardBody) {
      els.leaderboardBody.innerHTML = rows.map(function (item, index) {
        return resultRowHTML(item, index, false);
      }).join('');
    }
    if (els.leaderboardWrap) els.leaderboardWrap.hidden = rows.length === 0;
    if (els.leaderboardEmpty) els.leaderboardEmpty.hidden = rows.length > 0;
  }

  /* ---------- 渲染：队伍详情 ---------- */

  function detailRow(labelKey, value) {
    return '<dt>' + esc(t(labelKey)) + '</dt><dd>' + esc(value) + '</dd>';
  }

  function renderTeamDetail() {
    var team = state.detailKey ? state.live[state.detailKey] : null;
    if (!team) {
      closeModal('modalTeam');
      return;
    }
    var scenario = scenarioInfo(team.scenario);
    var stage = stageInfo(team);
    var marks = '<span class="stamp ' + (STATUS_CLASS[team.status] || 'stamp--brand') + '">' + esc(statusLabel(team.status)) + '</span>';
    if (team.demo) marks += '<span class="tag tag--demo">' + esc(t('admin.team.demo')) + '</span>';
    marks += '<span class="tag">' + esc(scenario.code) + ' · ' + esc(scenario.label) + '</span>';
    if (els.teamDetailBody) {
      els.teamDetailBody.innerHTML =
        '<div class="detail-head">' +
          '<p class="detail-name">' + esc(displayName(team)) + '</p>' +
          '<div class="detail-marks">' + marks + '</div>' +
        '</div>' +
        '<dl class="kv detail-kv">' +
          detailRow('admin.detail.key', team.key) +
          detailRow('admin.detail.scenario', scenario.code + ' · ' + scenario.label) +
          detailRow('admin.detail.stage', stage.text) +
          detailRow('admin.detail.solved', team.solved + ' / ' + MAX_STAGE) +
          detailRow('admin.detail.score', team.score + ' ' + t('unit.points')) +
          detailRow('admin.detail.attempts', String(team.attempts)) +
          detailRow('admin.detail.hints', String(team.hints)) +
          detailRow('admin.detail.elapsed', fmtTime(team.elapsed)) +
          detailRow('admin.detail.status', statusLabel(team.status)) +
          detailRow('admin.detail.lastActive', relativeTime(team.updatedAt)) +
          detailRow('admin.detail.updatedAt', fmtDateTime(team.updatedAt)) +
        '</dl>';
    }
  }

  /* ---------- 总渲染 ---------- */

  function renderAll() {
    renderStatus();
    renderStats();
    renderTeams();
    renderResults();
    var leaderboard = $('modalLeaderboard');
    if (leaderboard && !leaderboard.hidden) renderLeaderboard();
    var detail = $('modalTeam');
    if (detail && !detail.hidden) renderTeamDetail();
  }

  /* ---------- 数据刷新 ---------- */

  function refreshState(showToast) {
    state.live = readLive();
    state.results = readResults();
    state.demo = Object.keys(state.live).some(function (key) {
      return state.live[key].demo;
    });
    state.lastRefresh = Date.now();
    renderAll();
    if (showToast) toast(t('admin.toast.refreshed'), 'ok');
  }

  function scheduleRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    window.setTimeout(function () {
      refreshQueued = false;
      refreshState(false);
    }, 120);
  }

  /* ---------- 广播与指令 ---------- */

  function postChannel(message) {
    if (!channel) return;
    try {
      channel.postMessage(message);
    } catch (e) {
      /* 频道关闭时忽略 */
    }
  }

  function sendCommand(cmd) {
    var payload = { id: 'cmd-' + Date.now(), cmd: cmd, at: Date.now() };
    writeJSON(COMMAND_KEY, payload);
    postChannel({ type: 'command', cmd: cmd, id: payload.id });
  }

  function sendBroadcast(text) {
    var payload = { id: 'msg-' + Date.now(), text: text, at: Date.now() };
    writeJSON(BROADCAST_KEY, payload);
    postChannel({ type: 'broadcast', text: text, id: payload.id });
  }

  function sendHint(text) {
    var payload = { id: 'hint-' + Date.now(), text: text, at: Date.now() };
    writeJSON(HINT_KEY, payload);
    postChannel({ type: 'hint', text: text, id: payload.id });
  }

  /* ---------- 导出 CSV ---------- */

  function csvCell(value) {
    var text = String(value == null ? '' : value);
    if (/[",\r\n]/.test(text)) return '"' + text.replace(/"/g, '""') + '"';
    return text;
  }

  function dateStamp() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function exportCSV() {
    var rows = sortedResults();
    if (!rows.length) {
      rows = sortedTeams().map(function (team) {
        return {
          team: displayName(team),
          scenario: team.scenario,
          score: team.score,
          solved: team.solved,
          elapsed: team.elapsed,
          status: team.status,
          finishedAt: team.updatedAt
        };
      });
    }
    if (!rows.length) {
      toast(t('admin.toast.exportEmpty'), 'warn');
      return;
    }
    var headers = [
      t('admin.csv.team'),
      t('admin.csv.scenario'),
      t('admin.csv.score'),
      t('admin.csv.solved'),
      t('admin.csv.elapsed'),
      t('admin.csv.status'),
      t('admin.csv.finished')
    ];
    var lines = [headers.map(csvCell).join(',')];
    rows.forEach(function (row) {
      lines.push([
        row.team,
        scenarioInfo(row.scenario).label,
        row.score,
        row.solved,
        fmtTime(row.elapsed),
        statusLabel(row.status),
        fmtDateTime(row.finishedAt)
      ].map(csvCell).join(','));
    });
    var csv = '\uFEFF' + lines.join('\r\n') + '\r\n';
    try {
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'cyber-escape-results-' + dateStamp() + '.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1500);
      toast(t('admin.toast.exportDone'), 'ok');
    } catch (e) {
      toast(t('admin.toast.exportEmpty'), 'alert');
    }
  }

  /* ---------- 演示数据 ---------- */

  function loadDemo() {
    var live = readLive();
    var now = Date.now();
    DEMO_PRESETS.forEach(function (preset) {
      var key = 'demo:' + pad2(preset.i);
      live[key] = normalizeTeam({
        team: t('admin.demo.team' + preset.i),
        key: key,
        scenario: preset.scenario,
        current: preset.current,
        solved: preset.solved,
        score: preset.score,
        attempts: preset.attempts,
        hints: preset.hints,
        elapsed: preset.elapsed,
        totalTime: preset.status === 'timeout' ? preset.elapsed : null,
        status: preset.status,
        updatedAt: now - preset.age * 1000,
        demo: true,
        demoKey: 'admin.demo.team' + preset.i
      }, key);
    });
    writeJSON(LIVE_KEY, live);
    refreshState(false);
    toast(t('admin.toast.demoLoaded', { n: DEMO_PRESETS.length }), 'ok');
  }

  function clearDemo() {
    var raw = readJSON(LIVE_KEY, {});
    var removed = 0;
    if (Array.isArray(raw)) {
      raw = raw.filter(function (item) {
        var isDemo = item && (item.demo === true || String(item.key || '').indexOf('demo:') === 0);
        if (isDemo) removed += 1;
        return !isDemo;
      });
    } else if (raw && typeof raw === 'object') {
      Object.keys(raw).forEach(function (key) {
        var item = raw[key];
        var isDemo = key.indexOf('demo:') === 0 || (item && item.demo === true);
        if (isDemo) {
          delete raw[key];
          removed += 1;
        }
      });
    }
    if (!removed) {
      toast(t('admin.toast.demoNone'), 'warn');
      refreshState(false);
      return;
    }
    writeJSON(LIVE_KEY, raw);
    refreshState(false);
    toast(t('admin.toast.demoCleared'), 'ok');
  }

  /* ---------- 重置 ---------- */

  function performReset() {
    try {
      window.localStorage.removeItem(LIVE_KEY);
      window.localStorage.removeItem(RESULTS_KEY);
      window.localStorage.removeItem(BROADCAST_KEY);
      window.localStorage.removeItem(HINT_KEY);
      var stale = [];
      for (var i = 0; i < window.localStorage.length; i += 1) {
        var key = window.localStorage.key(i);
        if (key && key.indexOf(SNAPSHOT_PREFIX) === 0) stale.push(key);
      }
      stale.forEach(function (key) {
        window.localStorage.removeItem(key);
      });
    } catch (e) {
      /* 隐私模式下删除失败时忽略 */
    }
    sendCommand('reset');
    closeModal('modalReset');
    refreshState(false);
    toast(t('admin.toast.resetDone'), 'ok');
  }

  /* ---------- Toast ---------- */

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

  /* ---------- 弹层 ---------- */

  function openModal(id) {
    var modal = $(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var target = modal.querySelector('textarea, input');
    if (!target) target = modal.querySelector('.btn--ghost') || modal.querySelector('.btn') || modal.querySelector('.modal__close');
    if (target) {
      try {
        target.focus();
        if (target.select && target.tagName === 'TEXTAREA') target.select();
      } catch (e) {
        /* 忽略焦点异常 */
      }
    }
  }

  function closeModal(id) {
    var modal = $(id);
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (!document.querySelector('.modal:not([hidden])')) document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) {
      try {
        lastFocus.focus();
      } catch (e) {
        /* 忽略 */
      }
    }
    lastFocus = null;
  }

  function openBroadcastModal() {
    if (els.broadcastText) els.broadcastText.value = '';
    openModal('modalBroadcast');
  }

  function openHintModal() {
    if (els.hintText) els.hintText.value = '';
    openModal('modalHint');
  }

  function openTeamDetail(key) {
    if (!state.live[key]) return;
    state.detailKey = key;
    renderTeamDetail();
    openModal('modalTeam');
  }

  function submitText(modalId, textarea, sender, okKey, warnKey) {
    var text = textarea ? String(textarea.value || '').trim() : '';
    if (!text) {
      toast(t(warnKey), 'warn');
      if (textarea) textarea.focus();
      return;
    }
    sender(text);
    closeModal(modalId);
    toast(t(okKey), 'ok');
  }

  /* ---------- 事件绑定 ---------- */

  function cacheElements() {
    els.statusLive = $('statusLive');
    els.statusDot = $('statusDot');
    els.statusRefresh = $('statusRefresh');
    els.demoStamp = $('demoStamp');
    els.statLive = $('statLive');
    els.statLiveSub = $('statLiveSub');
    els.statWon = $('statWon');
    els.statWonSub = $('statWonSub');
    els.statScore = $('statScore');
    els.statScoreSub = $('statScoreSub');
    els.statTime = $('statTime');
    els.statTimeSub = $('statTimeSub');
    els.teamGrid = $('teamGrid');
    els.teamEmpty = $('teamEmpty');
    els.teamCount = $('teamCount');
    els.demoNote = $('demoNote');
    els.resultsBody = $('resultsBody');
    els.resultsWrap = $('resultsWrap');
    els.resultsEmpty = $('resultsEmpty');
    els.resultCount = $('resultCount');
    els.leaderboardBody = $('leaderboardBody');
    els.leaderboardWrap = $('leaderboardWrap');
    els.leaderboardEmpty = $('leaderboardEmpty');
    els.teamDetailBody = $('teamDetailBody');
    els.broadcastText = $('broadcastText');
    els.hintText = $('hintText');
    els.btnDemo = $('btnDemo');
    els.toastStack = $('toastStack');
  }

  function bindEvents() {
    var refreshBtn = $('btnRefresh');
    if (refreshBtn) refreshBtn.addEventListener('click', function () { refreshState(true); });

    var pauseBtn = $('btnPauseAll');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        sendCommand('pause');
        toast(t('admin.toast.paused'), 'warn');
      });
    }

    var resumeBtn = $('btnResumeAll');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', function () {
        sendCommand('resume');
        toast(t('admin.toast.resumed'), 'ok');
      });
    }

    var broadcastBtn = $('btnBroadcast');
    if (broadcastBtn) broadcastBtn.addEventListener('click', openBroadcastModal);

    var hintBtn = $('btnHint');
    if (hintBtn) hintBtn.addEventListener('click', openHintModal);

    var leaderboardBtn = $('btnLeaderboard');
    if (leaderboardBtn) {
      leaderboardBtn.addEventListener('click', function () {
        renderLeaderboard();
        openModal('modalLeaderboard');
      });
    }

    var exportBtn = $('btnExport');
    if (exportBtn) exportBtn.addEventListener('click', exportCSV);

    var resetBtn = $('btnResetAll');
    if (resetBtn) resetBtn.addEventListener('click', function () { openModal('modalReset'); });

    var resetConfirm = $('resetConfirm');
    if (resetConfirm) resetConfirm.addEventListener('click', performReset);

    if (els.btnDemo) {
      els.btnDemo.addEventListener('click', function () {
        if (state.demo) clearDemo();
        else loadDemo();
      });
    }

    var broadcastSend = $('broadcastSend');
    if (broadcastSend) {
      broadcastSend.addEventListener('click', function () {
        submitText('modalBroadcast', els.broadcastText, sendBroadcast, 'admin.toast.broadcastSent', 'admin.toast.needText');
      });
    }

    var hintSend = $('hintSend');
    if (hintSend) {
      hintSend.addEventListener('click', function () {
        submitText('modalHint', els.hintText, sendHint, 'admin.toast.hintSent', 'admin.toast.needText');
      });
    }

    var detailHint = $('teamDetailHint');
    if (detailHint) {
      detailHint.addEventListener('click', function () {
        closeModal('modalTeam');
        openHintModal();
      });
    }

    if (els.teamGrid) {
      els.teamGrid.addEventListener('click', function (event) {
        var trigger = event.target.closest('[data-act]');
        if (!trigger) return;
        var action = trigger.getAttribute('data-act');
        var key = trigger.getAttribute('data-key');
        if (action === 'detail') openTeamDetail(key);
        else if (action === 'hint') openHintModal();
      });
    }

    document.querySelectorAll('[data-close]').forEach(function (button) {
      button.addEventListener('click', function () {
        closeModal(button.getAttribute('data-close'));
      });
    });

    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click', function (event) {
        if (event.target === modal) closeModal(modal.id);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var open = document.querySelector('.modal:not([hidden])');
      if (open) closeModal(open.id);
    });

    window.addEventListener('storage', function (event) {
      if (!event.key) return;
      scheduleRefresh();
    });

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) refreshState(false);
    });

    if (window.I18N && window.I18N.onChange) {
      window.I18N.onChange(function () {
        renderAll();
      });
    }
  }

  function initChannel() {
    if (!('BroadcastChannel' in window)) return;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.addEventListener('message', function (event) {
        var data = event.data || {};
        if (data.type === 'live' || data.type === 'results' || data.type === 'sync') scheduleRefresh();
      });
    } catch (e) {
      channel = null;
    }
  }

  function boot() {
    cacheElements();
    bindEvents();
    initChannel();
    refreshState(false);
    if (refreshTimer) window.clearInterval(refreshTimer);
    refreshTimer = window.setInterval(function () {
      refreshState(false);
    }, REFRESH_MS);
    /* i18n 引擎在个别加载时序下会在本脚本首轮渲染之后才执行 data-i18n 刷新，
       这里在 DOMContentLoaded / load 后再补一次动态内容渲染，避免模板占位符残留。 */
    if (document.readyState === 'loading' || document.readyState === 'interactive') {
      document.addEventListener('DOMContentLoaded', renderAll, { once: true });
    }
    window.addEventListener('load', renderAll, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
