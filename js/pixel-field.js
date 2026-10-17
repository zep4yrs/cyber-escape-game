/* ==========================================================================
   首屏方格粒子场（canvas）
   --------------------------------------------------------------------------
   一张浅色纸上的靛蓝墨点网格：低频噪声缓慢漂移、指针经过处点亮一圈、
   点按落下一枚扩散的方印。参考枫桥作品档案站首屏的方格粒子场，
   这里用纯 canvas 轻量重写，只保留「漂移 + 辉光 + 落戳」三种状态。

   标记：
     <div class="hero__field" data-pixel-field aria-hidden="true"><canvas></canvas></div>
   颜色全部读 CSS 令牌（--field-*），换主题不用改 JS。
   ========================================================================== */
(function () {
  'use strict';

  var host = document.querySelector('[data-pixel-field]');
  if (!host) return;
  var canvas = host.querySelector('canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var BAYER = [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60,
    28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47,
    7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21
  ];

  var palette = readPalette();
  var width = 0;
  var height = 0;
  var dpr = 1;
  var cell = 16;
  var cols = 0;
  var rows = 0;
  var jitter = buildJitter(0x4a4ee0);
  var pointer = { x: -1e4, y: -1e4, strength: 0 };
  var targetStrength = 0;
  var pings = [];
  var visible = true;
  var frame = 0;
  var lastDraw = 0;
  var INTERVAL = 33; /* 约 30fps：场是漂移噪声，60fps 没有额外信息量 */

  function readPalette() {
    var style = getComputedStyle(document.documentElement);
    var read = function (name, fallback) {
      var v = style.getPropertyValue(name).trim();
      return v || fallback;
    };
    return {
      bg: read('--field-bg', '#e9eefb'),
      dim: read('--field-dim', '#9faae6'),
      mid: read('--field-mid', '#7b85dd'),
      lit: read('--field-lit', '#565dd4'),
      hover: read('--field-hover', '#383cc0')
    };
  }

  function buildJitter(seed) {
    var state = seed >>> 0;
    var tile = new Float32Array(64 * 64);
    for (var i = 0; i < tile.length; i++) {
      state = (state * 1664525 + 1013904223) >>> 0;
      tile[i] = state / 4294967296;
    }
    return tile;
  }

  var NOISE_SIZE = 64;

  /** 一张 64×64 的软斑噪声，作为场漂移的底；两遍盒式模糊把白噪声揉成团 */
  function buildNoise(seed) {
    var size = NOISE_SIZE;
    var state = seed >>> 0;
    var field = new Float32Array(size * size);
    for (var i = 0; i < field.length; i++) {
      state = (state * 1664525 + 1013904223) >>> 0;
      field[i] = state / 4294967296;
    }
    for (var pass = 0; pass < 2; pass++) {
      var next = new Float32Array(size * size);
      for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
          var sum = 0;
          for (var dy = -1; dy <= 1; dy++) {
            for (var dx = -1; dx <= 1; dx++) {
              sum += field[(((y + dy + size) % size) * size + ((x + dx + size) % size))];
            }
          }
          next[y * size + x] = sum / 9;
        }
      }
      field = next;
    }
    var min = Infinity;
    var max = -Infinity;
    for (var k = 0; k < field.length; k++) {
      if (field[k] < min) min = field[k];
      if (field[k] > max) max = field[k];
    }
    var span = max - min || 1;
    for (var j = 0; j < field.length; j++) field[j] = (field[j] - min) / span;
    return field;
  }

  var noiseField = buildNoise(0x4a4ee0);

  /** 双线性 + smoothstep 取噪声，环形平铺 */
  function sampleNoise(x, y) {
    var xi = Math.floor(x);
    var yi = Math.floor(y);
    var fx = x - xi;
    var fy = y - yi;
    var x0 = ((xi % NOISE_SIZE) + NOISE_SIZE) % NOISE_SIZE;
    var y0 = ((yi % NOISE_SIZE) + NOISE_SIZE) % NOISE_SIZE;
    var x1 = (x0 + 1) % NOISE_SIZE;
    var y1 = (y0 + 1) % NOISE_SIZE;
    var sx = fx * fx * (3 - 2 * fx);
    var sy = fy * fy * (3 - 2 * fy);
    var a = noiseField[y0 * NOISE_SIZE + x0];
    var b = noiseField[y0 * NOISE_SIZE + x1];
    var c = noiseField[y1 * NOISE_SIZE + x0];
    var d = noiseField[y1 * NOISE_SIZE + x1];
    return (a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy;
  }

  /** 低频漂移场：两层不同尺度的软斑噪声缓慢移动，比正弦波更有机 */
  function driftAt(x, y, t, cellPx) {
    var u = x / (cellPx * 8);
    var v = y / (cellPx * 8);
    var a = sampleNoise(u + t * 0.1, v - t * 0.045);
    var b = sampleNoise(u * 0.42 - t * 0.06, v * 0.42 + t * 0.05);
    return 0.62 * a + 0.38 * b;
  }

  function measure() {
    var box = host.getBoundingClientRect();
    if (box.width < 2 || box.height < 2) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nextW = Math.round(box.width * dpr);
    var nextH = Math.round(box.height * dpr);
    if (nextW !== width || nextH !== height) {
      width = nextW;
      height = nextH;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = box.width + 'px';
      canvas.style.height = box.height + 'px';
    }
    cell = Math.max(11, Math.min(16, Math.round(box.width / (box.width > 900 ? 110 : 56))));
    cols = Math.ceil(box.width / cell) + 1;
    rows = Math.ceil(box.height / cell) + 1;
    return true;
  }

  function stampAt(cx, cy, t) {
    var amount = 0;
    for (var i = 0; i < pings.length; i++) {
      var ping = pings[i];
      var age = (t - ping.born) / 1000;
      if (age > ping.life) continue;
      var progress = age / ping.life;
      var radius = (0.4 + progress * 2.6) * cell * 3.2;
      var d = Math.sqrt((cx - ping.x) * (cx - ping.x) + (cy - ping.y) * (cy - ping.y));
      if (d > radius) continue;
      var ring = 1 - Math.abs(d - radius) / (radius * 0.55);
      if (ring > 0) amount = Math.max(amount, ring * (1 - progress) * 0.9);
    }
    return amount;
  }

  function draw(time) {
    var t = reducedMotion ? 0 : time / 1000;
    var w = width;
    var h = height;
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, w, h);

    pings = pings.filter(function (ping) {
      return time - ping.born < ping.life * 1000;
    });

    pointer.strength += (targetStrength - pointer.strength) * 0.3;

    var dimPath = new Path2D();
    var midPath = new Path2D();
    var litPath = new Path2D();
    var cellPx = cell * dpr;
    var cursorReach = cellPx * 13;

    for (var r = 0; r < rows; r++) {
      var y = r * cellPx;
      var cy = y + cellPx / 2;
      for (var c = 0; c < cols; c++) {
        var x = c * cellPx;
        var cx = x + cellPx / 2;

        var drift = driftAt(cx, cy, t, cellPx);
        var sparkle = Math.sin(t * 0.9 + jitter[(r * 37 + c * 11) & 4095] * 6.283);
        var seedJitter = jitter[(r & 63) * 64 + (c & 63)];

        /* 静息分布：噪声控制密度（3%–11%），随机决定这一格是否落墨。
           左侧是首屏文案区，粒子让开一段；右侧保持完整密度，场于是有重心。 */
        var hush = cx < w * 0.52 ? 0.16 + (cx / w) * 1.6 : 1;
        var density = (0.016 + 0.058 * drift) * Math.min(1, hush);
        var painted = seedJitter < density;
        var level = painted ? (seedJitter < density * 0.28 || sparkle > 0.9 ? 2 : 1) : 0;

        /* 指针辉光：附近格子无论静息是否落墨都被点亮 */
        if (pointer.strength > 0.01) {
          var dx = cx - pointer.x;
          var dy = cy - pointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cursorReach) {
            var falloff = 1 - dist / cursorReach;
            var heat = falloff * falloff * pointer.strength;
            if (heat > 0.45) level = 3;
            else if (heat > 0.18) level = Math.max(level, 2);
            else if (heat > 0.05) level = Math.max(level, 1);
          }
        }

        /* 点按涟漪 */
        var ripple = stampAt(cx, cy, time);
        if (ripple > 0.55) level = 3;
        else if (ripple > 0.2) level = Math.max(level, 2);
        else if (ripple > 0) level = Math.max(level, 1);

        if (level === 0) continue;

        var left = Math.round(x);
        var top = Math.round(y);
        var size = Math.round(x + cellPx) - left;
        var sizeY = Math.round(y + cellPx) - top;
        if (level === 3) litPath.rect(left, top, size, sizeY);
        else if (level === 2) midPath.rect(left, top, size, sizeY);
        else dimPath.rect(left, top, size, sizeY);
      }
    }

    ctx.fillStyle = palette.dim;
    ctx.fill(dimPath);
    ctx.fillStyle = palette.mid;
    ctx.fill(midPath);
    ctx.fillStyle = palette.lit;
    ctx.fill(litPath);
  }

  function loop(time) {
    frame = requestAnimationFrame(loop);
    if (time - lastDraw < INTERVAL) return;
    lastDraw = time;
    draw(time);
  }

  function start() {
    if (frame) return;
    if (reducedMotion) {
      draw(0);
      return;
    }
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function insideHost(clientX, clientY) {
    var box = host.getBoundingClientRect();
    return clientX >= box.left && clientX <= box.right && clientY >= box.top && clientY <= box.bottom
      ? { x: (clientX - box.left) * dpr, y: (clientY - box.top) * dpr, inside: true }
      : { inside: false };
  }

  if (finePointer) {
    window.addEventListener(
      'pointermove',
      function (event) {
        if (!visible) return;
        var at = insideHost(event.clientX, event.clientY);
        if (!at.inside) {
          targetStrength = 0;
          pointer.x = -1e4;
          pointer.y = -1e4;
          if (reducedMotion) draw(0);
          return;
        }
        pointer.x = at.x;
        pointer.y = at.y;
        targetStrength = 1;
        if (reducedMotion) draw(0);
      },
      { passive: true }
    );
  }

  window.addEventListener(
    'pointerdown',
    function (event) {
      if (!visible || !event.target || !event.target.closest) return;
      var onControl = event.target.closest('a, button, input, textarea, select, label, [data-no-stamp]');
      if (onControl) return;
      var at = insideHost(event.clientX, event.clientY);
      if (!at.inside) return;
      pings = pings.slice(-3).concat([
        { x: at.x, y: at.y, born: performance.now(), life: 0.85 + Math.random() * 0.25 }
      ]);
      if (reducedMotion) draw(0);
    },
    { passive: true }
  );

  var observer = new IntersectionObserver(
    function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    },
    { rootMargin: '80px' }
  );
  observer.observe(host);

  var resize = new ResizeObserver(function () {
    if (measure()) {
      if (reducedMotion) draw(0);
      else start();
    }
  });
  resize.observe(host);

  if (measure()) start();
})();
