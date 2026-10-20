/*
  Yaad Kamrul Bari | portfolio
  1. Render text and links from content.js
  2. Build the name pixel by pixel (once)
  3. Pixel ocean scene on a low-res canvas + HUD + detection box
*/
(function () {
  "use strict";

  var C = window.CONTENT || {};
  var root = document.documentElement;
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fineMQ = window.matchMedia("(hover: hover) and (pointer: fine)");

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

  /* ------------------------------------------------------------
     1. Content
     ------------------------------------------------------------ */
  function renderContent() {
    if (C.meta) {
      if (C.meta.title) document.title = C.meta.title;
      var desc = $('meta[name="description"]');
      if (desc && C.meta.description) desc.setAttribute("content", C.meta.description);
    }

    $$("[data-text]").forEach(function (node) {
      var v = get(node.dataset.text);
      if (typeof v === "string" || typeof v === "number") node.textContent = v;
    });

    var nav = C.nav || {};
    var list = $("#nav-links");
    if (list && nav.links) {
      list.replaceChildren.apply(list, nav.links.map(function (l) {
        var li = el("li");
        var a = el("a", null, l.label);
        a.href = l.href;
        li.appendChild(a);
        return li;
      }));
    }
    var cv = $("#cv-link");
    if (cv && nav.cv && nav.cv.href) cv.href = nav.cv.href;

    var hero = C.hero || {};
    var actions = $("#hero-actions");
    if (actions && hero.actions) {
      actions.replaceChildren.apply(actions, hero.actions.map(function (a) {
        var link = el("a", "btn" + (a.style === "secondary" ? " btn--secondary" : ""), a.label);
        link.href = a.href;
        return link;
      }));
    }
    var facts = $("#hero-facts");
    if (facts) {
      if (hero.facts && hero.facts.length) {
        facts.replaceChildren.apply(facts, hero.facts.map(function (f) { return el("li", null, f); }));
      } else {
        facts.hidden = true;
      }
    }
  }

  /* ------------------------------------------------------------
     2. Name builds itself pixel by pixel
     The real <h1> text stays in the DOM (transparent while building).
     A canvas copy of it is revealed in art-pixel blocks, then removed.
     ------------------------------------------------------------ */
  var NAME_SPAN = 820;   // ms over which blocks appear
  var NAME_FLASH = 140;  // ms each block shows as a solid cyan pixel

  function buildName(blockCss) {
    var h1 = $(".hero__name");
    if (!h1) return;
    var done = function () { h1.classList.remove("is-pending"); };
    if (reduceMQ.matches || !document.fonts || !window.Promise) return done();

    var cs = getComputedStyle(h1);
    var font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
    var timeout = new Promise(function (r) { setTimeout(r, 1500); });

    Promise.race([document.fonts.load(font, h1.textContent), timeout])
      .then(function () {
        if (!document.fonts.check(font, h1.textContent)) return done();
        requestAnimationFrame(function () { animateName(h1, font, blockCss, done); });
      })
      .catch(done);
  }

  function animateName(h1, font, blockCss, done) {
    var textNode = Array.prototype.find.call(h1.childNodes, function (n) { return n.nodeType === 3; });
    var box = h1.getBoundingClientRect();
    if (!textNode || !box.width) return done();

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var shadowY = parseFloat(getComputedStyle(h1).getPropertyValue("--name-shadow")) || 0;
    var w = Math.ceil(box.width);
    var h = Math.ceil(box.height + shadowY + 2);

    var off = document.createElement("canvas");
    off.width = Math.ceil(w * dpr);
    off.height = Math.ceil(h * dpr);
    var o = off.getContext("2d");
    o.scale(dpr, dpr);
    o.font = font;
    var m = o.measureText(textNode.data);
    var asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
    if (!asc) return done();

    // Position each word exactly where the browser laid it out.
    var range = document.createRange();
    var re = /\S+/g, mt, words = [];
    while ((mt = re.exec(textNode.data))) {
      range.setStart(textNode, mt.index);
      range.setEnd(textNode, mt.index + mt[0].length);
      var r = range.getClientRects()[0];
      if (!r) continue;
      words.push({ t: mt[0], x: r.left - box.left, y: r.top - box.top + (r.height - asc - desc) / 2 + asc });
    }
    o.fillStyle = cssVar("--navy-950");
    words.forEach(function (wd) { o.fillText(wd.t, wd.x, wd.y + shadowY); });
    o.fillStyle = cssVar("--text");
    words.forEach(function (wd) { o.fillText(wd.t, wd.x, wd.y); });

    // Which blocks contain ink?
    var b = Math.max(2, Math.round(blockCss * dpr));
    var data = o.getImageData(0, 0, off.width, off.height).data;
    var cols = Math.ceil(off.width / b), rows = Math.ceil(off.height / b);
    var blocks = [];
    for (var by = 0; by < rows; by++) {
      for (var bx = 0; bx < cols; bx++) {
        var hit = false;
        for (var y = by * b; y < Math.min((by + 1) * b, off.height) && !hit; y++) {
          for (var x = bx * b; x < Math.min((bx + 1) * b, off.width); x++) {
            if (data[(y * off.width + x) * 4 + 3] > 24) { hit = true; break; }
          }
        }
        if (hit) {
          blocks.push({
            x: bx * b,
            y: by * b,
            at: ((bx * b) / off.width) * 0.62 * NAME_SPAN + Math.random() * 0.38 * NAME_SPAN
          });
        }
      }
    }
    blocks.sort(function (p, q) { return p.at - q.at; });

    var vis = document.createElement("canvas");
    vis.className = "hero__name-build";
    vis.setAttribute("aria-hidden", "true");
    vis.width = off.width;
    vis.height = off.height;
    vis.style.width = off.width / dpr + "px";
    vis.style.height = off.height / dpr + "px";
    h1.appendChild(vis);
    var v = vis.getContext("2d");
    v.fillStyle = cssVar("--cyan");

    var t0 = performance.now(), i = 0, flashing = [];
    function frame(now) {
      var t = now - t0;
      while (i < blocks.length && blocks[i].at <= t) {
        v.fillRect(blocks[i].x, blocks[i].y, b, b);
        flashing.push(blocks[i++]);
      }
      while (flashing.length && flashing[0].at + NAME_FLASH <= t) {
        var bl = flashing.shift();
        v.clearRect(bl.x, bl.y, b, b);
        v.drawImage(off, bl.x, bl.y, b, b, bl.x, bl.y, b, b);
      }
      if (i < blocks.length || flashing.length) {
        requestAnimationFrame(frame);
      } else {
        done();
        requestAnimationFrame(function () { vis.remove(); });
      }
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------
     3. Pixel ocean scene
     ------------------------------------------------------------ */

  // Sprites: one character per pixel, "." is transparent.
  // AUV is drawn facing right here and mirrored so it faces the text.
  //  k outline  a/A/h amber body  p/w/d/G acrylic tube + electronics
  //  g/G steel  c camera  L antenna light (blinks)  1/2 propeller frames
  var AUV = [
    "...............................L................",
    "...............................k................",
    "..........kkkkkkkkkkkkkkkkkkkkkkkkkkk...........",
    "....kkk..kggpwwwwwwwwwwppppppppppppggk..kkk.....",
    "...kgGGk.kggppGddddGddddGddddGddddpggk.kgGGk....",
    "...kgGGk.kggppddddcdddadddcdddddddpggk.kgGGk....",
    "...kgGGk.kGGpppppppppppppppppppppppGGk.kgGGk....",
    "...kgGGk..kkkkkkkkkkkkkkkkkkkkkkkkkkk..kgGGk....",
    "....kkk......GG.................GG......kkk.....",
    "....kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk......",
    "kkkkahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkkk...",
    "k1GkaaaaaaaaaaaAaaaaaaaaaaaaaaAaaaaaaaaaaakpck..",
    "k2GkaaaaaaaaaaaAaakkkkkkkkkkaaAaaaaaaaaaaakcwck.",
    "k1GkaaaaaaaaaaaAaaaaaaaaaaaaaaAaaaaaaaaaaakccck.",
    "k2GkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkdck..",
    "kkkkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkkk...",
    "....kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk......",
    "..........GG......................GG............",
    "......kGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGk......."
  ];
  var FISH_A = [".fff.t", "efffft", ".fff.t"];
  var FISH_B = [".fff..", "efffft", ".fff.."];

  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(function (n) { return (n + 0.5) / 16; });
  var RAY_N = 512;

  function compile(rows, flip) {
    var w = rows[0].length, px = [];
    rows.forEach(function (row, y) {
      for (var x = 0; x < w; x++) {
        var ch = row.charCodeAt(x);
        if (ch !== 46) px.push(flip ? w - 1 - x : x, y, ch);
      }
    });
    return { w: w, h: rows.length, px: px };
  }

  function pack(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.replace(/./g, "$&$&");
    var n = parseInt(hex, 16);
    // ImageData is RGBA bytes; on little-endian a Uint32 reads as ABGR.
    return ((255 << 24) | ((n & 255) << 16) | (((n >> 8) & 255) << 8) | (n >> 16)) >>> 0;
  }

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function smoothInside(v, a, b, ramp) {
    if (v < a - ramp || v > b + ramp) return 0;
    if (v < a) return (v - (a - ramp)) / ramp;
    if (v > b) return ((b + ramp) - v) / ramp;
    return 1;
  }

  function Scene(hero) {
    var canvas = $(".hero__canvas", hero);
    var ctx = canvas.getContext("2d", { alpha: false });
    var detect = $(".detect", hero);
    var detectLabel = $(".detect__label", hero);
    var tape = $(".hud__tape", hero);
    var headingOut = $('[data-hud="heading"]', hero);

    var hud = C.hud || {};
    var det = hud.detection || { label: "auv", confidence: 0.99 };
    var heading0 = Number(hud.heading) || 87;

    var W = 0, H = 0, S = 4, img = null, buf = null;
    var WATER = [], COL = [];
    var sprAuv, fishL, fishR, fishLB, fishRB;
    var baseLv, rayFade, dampX, dampY, rayTex;
    var stage = null, copy = null, kelp = [], bubbles = [], fishBand = null;
    var t = 0, last = 0, rafId = 0, running = false, onScreen = true;
    var par = { x: 0, y: 0, tx: 0, ty: 0 };
    var timers = { auv: 0, amb: 0, conf: 0, jit: 0 };
    var conf = det.confidence, jit = [0, 0, 0, 0];
    var lastBox = "", lastHeading = -1;

    function readPalette() {
      WATER = [];
      for (var i = 0; i < 10; i++) WATER.push(pack(cssVar("--water-" + i)));
      COL = [];
      var map = {
        k: "--navy-950", a: "--amber", A: "--amber-deep", h: "--amber-light",
        p: "--acrylic", w: "--foam-100", d: "--acrylic-dark", g: "--steel", G: "--steel-dark",
        c: "--cyan", f: "--water-2", e: "--water-7", t: "--water-3"
      };
      Object.keys(map).forEach(function (k) { COL[k.charCodeAt(0)] = pack(cssVar(map[k])); });
      COL.kd = pack(cssVar("--kelp-dark"));
      COL.km = pack(cssVar("--kelp"));
      COL.kl = pack(cssVar("--kelp-light"));
      COL.f0 = pack(cssVar("--foam-100"));
      COL.f1 = pack(cssVar("--foam-200"));
      COL.f2 = pack(cssVar("--water-1"));
    }

    function buildSprites() {
      sprAuv = compile(AUV, true); // propeller frames are swapped at draw time
      fishL = compile(FISH_A, false); fishLB = compile(FISH_B, false);
      fishR = compile(FISH_A, true); fishRB = compile(FISH_B, true);
    }

    function buildRays() {
      var r = rng(11);
      rayTex = new Float32Array(RAY_N);
      for (var i = 0; i < 8; i++) {
        var c = r() * RAY_N, w = 3 + r() * 14, a = 0.35 + r() * 0.65;
        for (var k = -w; k <= w; k++) {
          var idx = ((c + k) | 0) & (RAY_N - 1);
          rayTex[idx] = Math.max(rayTex[idx], a * (1 - Math.abs(k) / w));
        }
      }
    }

    function toArt(rect, hr) {
      var x0 = (rect.left - hr.left) / S, y0 = (rect.top - hr.top) / S;
      var w = rect.width / S, h = rect.height / S;
      return { x0: x0, y0: y0, x1: x0 + w, y1: y0 + h, w: w, h: h, cx: x0 + w / 2, cy: y0 + h / 2 };
    }

    function layout() {
      var hr = hero.getBoundingClientRect();
      if (!hr.width || !hr.height) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 3);
      var target = hr.width >= 1100 ? 5 : 4;
      // keep one art pixel a whole number of device pixels, so it stays crisp
      S = Math.max(1, Math.round(target * dpr)) / dpr;
      W = Math.ceil(hr.width / S);
      H = Math.ceil(hr.height / S);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = W * S + "px";
      canvas.style.height = H * S + "px";
      img = ctx.createImageData(W, H);
      buf = new Uint32Array(img.data.buffer);

      root.style.setProperty("--art-px", S + "px");
      root.style.setProperty("--grid", S * 12 + "px");

      stage = toArt($(".viewport", hero).getBoundingClientRect(), hr);
      copy = toArt($(".hero__copy", hero).getBoundingClientRect(), hr);

      // background water: banded gradient, a little lighter at the surface
      baseLv = new Float32Array(H);
      rayFade = new Float32Array(H);
      for (var y = 0; y < H; y++) {
        var yn = y / H;
        baseLv[y] = yn < 0.1 ? 2.2 + (yn / 0.1) * 2.8 : 5 + ((yn - 0.1) / 0.9) * 1.9;
        rayFade[y] = Math.pow(Math.max(0, 1 - yn * 0.95), 1.6);
      }
      // light rays are damped behind the text so it stays readable
      dampX = new Float32Array(W);
      dampY = new Float32Array(H);
      for (var x = 0; x < W; x++) dampX[x] = smoothInside(x, copy.x0, copy.x1, 8);
      for (y = 0; y < H; y++) dampY[y] = smoothInside(y, copy.y0, copy.y1, 8);

      plantKelp();

      var beside = stage.x0 >= copy.x1 - 2;
      fishBand = beside
        ? { x0: copy.x1 + 6, x1: W + 14, y: stage.y0 + stage.h * 0.26 }
        : { x0: -14, x1: W + 14, y: stage.y0 + stage.h * 0.24 };

      bubbles = [];
      if (reduceMQ.matches) seedStaticBubbles();
      draw();
    }

    function plantKelp() {
      var r = rng(5);
      var spots = [0.012, 0.04, 0.07, 0.31, 0.34, 0.5, 0.53, 0.72, 0.9, 0.935, 0.965, 0.99];
      kelp = [];
      spots.forEach(function (f) {
        var x = Math.round(f * W + (r() - 0.5) * 3);
        var h = Math.round(H * (0.28 + r() * 0.3));
        // keep clear of the text block and the HUD frame
        [copy, stage].forEach(function (bx) {
          if (x >= bx.x0 - 6 && x <= bx.x1 + 6) h = Math.min(h, Math.floor(H - bx.y1 - 4));
        });
        if (h >= 8) {
          kelp.push({ x: x, h: h, ph: r() * 6.28, sp: 0.6 + r() * 0.5, amp: 1.5 + r() * 2.5, lo: (r() * 6) | 0 });
        }
      });
    }

    function seedStaticBubbles() {
      var r = rng(9);
      for (var i = 0; i < 18; i++) {
        var x = r() * W, y = H * (0.15 + r() * 0.8);
        bubbles.push({ x0: x, x: x, y: y, vy: 0, ph: 0, r: 1 + ((r() * 3) | 0) });
      }
    }

    /* ---- drawing primitives ---- */
    function put(x, y, c) {
      if (x >= 0 && y >= 0 && x < W && y < H) buf[y * W + x] = c;
    }
    function blit(spr, ox, oy, swapProp, light) {
      var p = spr.px;
      for (var i = 0; i < p.length; i += 3) {
        var x = ox + p[i], y = oy + p[i + 1];
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        var ch = p[i + 2], c;
        if (ch === 49 || ch === 50) c = COL[(ch === 49) !== swapProp ? 103 : 71]; // 1/2 -> g/G
        else if (ch === 76) c = light ? COL[97] : COL[107];                       // L -> amber/off
        else c = COL[ch];
        if (c) buf[y * W + x] = c;
      }
    }

    function drawWater() {
      var phase = t * 2.4 + par.x * 3 + 64;
      var breathe = 0.85 + 0.15 * Math.sin(t * 0.6);
      for (var y = 0; y < H; y++) {
        var base = baseLv[y], fade = rayFade[y] * breathe * 1.7, row = y * W;
        var yo = y * 0.5 + phase, dy = dampY[y], by = (y & 3) << 2;
        for (var x = 0; x < W; x++) {
          var ray = rayTex[(x + yo) & (RAY_N - 1)] * fade * (1 - 0.82 * dampX[x] * dy);
          var lv = base - ray;
          if (lv < 0) lv = 0;
          var b = lv | 0, f = lv - b;
          var ff = f < 0.45 ? 0 : (f - 0.45) / 0.55;
          buf[row + x] = WATER[ff > BAYER[by | (x & 3)] && b < 9 ? b + 1 : b];
        }
      }
      // underside of the surface, rippling
      for (var sx = 0; sx < W; sx++) {
        var ys = Math.round(2 + Math.sin(sx * 0.21 + t * 1.7) + Math.sin(sx * 0.067 - t * 0.9) * 0.8);
        if (ys < 0) ys = 0;
        for (var sy = 0; sy < ys; sy++) buf[sy * W + sx] = WATER[1];
        buf[ys * W + sx] = WATER[0];
      }
    }

    function drawKelp() {
      var kd = COL.kd, km = COL.km, kl = COL.kl;
      for (var n = 0; n < kelp.length; n++) {
        var k = kelp[n], x = 0, y = 0;
        for (var j = 0; j < k.h; j++) {
          y = H - 1 - j;
          var f = j / k.h;
          x = Math.round(k.x + Math.sin(t * k.sp + k.ph + j * 0.08) * k.amp * f * f + par.x * 6 * f);
          put(x, y, kd);
          put(x + 1, y, km);
          if (j > 4 && (j + k.lo) % 6 === 0) {
            if (((j + k.lo) / 6) % 2) {
              put(x - 1, y, km); put(x - 2, y - 1, km); put(x - 3, y - 1, km); put(x - 4, y - 2, kl);
            } else {
              put(x + 2, y, km); put(x + 3, y - 1, km); put(x + 4, y - 1, km); put(x + 5, y - 2, kl);
            }
          }
        }
        put(x, y - 1, kl); put(x + 1, y - 1, kl);
      }
    }

    function drawFish() {
      var band = fishBand, L = band.x1 - band.x0;
      if (L <= 0) return;
      var u = (t * 6) % (2 * L), goingLeft = u < L;
      var hx = goingLeft ? band.x1 - u : band.x0 + (u - L);
      var flick = ((t * 5) | 0) % 2;
      var spr = goingLeft ? (flick ? fishLB : fishL) : (flick ? fishRB : fishR);
      var school = [[0, 0], [9, -4], [15, 2], [6, 5]];
      var py = Math.round(band.y + Math.sin(t * 0.8) * 1.5 + par.y * 2);
      for (var i = 0; i < school.length; i++) {
        var dx = goingLeft ? school[i][0] : -school[i][0];
        blit(spr, Math.round(hx + dx + par.x * 2), py + school[i][1], false, false);
      }
    }

    function drawBubbles() {
      var f0 = COL.f0, f1 = COL.f1, f2 = COL.f2;
      for (var i = 0; i < bubbles.length; i++) {
        var bb = bubbles[i], x = Math.round(bb.x + par.x * 3), y = Math.round(bb.y);
        if (bb.r === 1) {
          put(x, y, f1);
        } else if (bb.r === 2) {
          put(x, y, f0); put(x + 1, y, f1); put(x, y + 1, f1); put(x + 1, y + 1, f2);
        } else {
          put(x + 1, y, f1); put(x, y + 1, f1); put(x + 2, y + 1, f1); put(x + 1, y + 2, f2); put(x, y, f0);
        }
      }
    }

    function auvPos() {
      return {
        x: Math.round(stage.cx - sprAuv.w / 2 + par.x * 4 + Math.sin(t * 0.35) * 1.2),
        y: Math.round(stage.cy - sprAuv.h / 2 + par.y * 3 + Math.sin(t * 1.25) * 1.6)
      };
    }

    function updateDetect(p) {
      var pad = 3;
      var x0 = (p.x - pad + jit[0]) * S, y0 = (p.y - pad - 1 + jit[1]) * S;
      var x1 = (p.x + sprAuv.w + pad + jit[2]) * S, y1 = (p.y + sprAuv.h + pad + jit[3]) * S;
      var key = x0 + "," + y0 + "," + x1 + "," + y1;
      if (key !== lastBox) {
        lastBox = key;
        detect.style.transform = "translate(" + x0 + "px," + y0 + "px)";
        detect.style.width = x1 - x0 + "px";
        detect.style.height = y1 - y0 + "px";
      }
      detect.classList.add("is-live");
    }

    function updateHud() {
      var hdg = Math.round(heading0 + Math.sin(t * 0.3) * 3 + par.x * 4);
      if (hdg !== lastHeading) {
        lastHeading = hdg;
        var shown = ((hdg % 360) + 360) % 360;
        headingOut.textContent = ("00" + shown).slice(-3) + "°";
        tape.style.setProperty("--tape-x", -hdg * 1.2 + "px");
      }
      detectLabel.textContent = det.label + " " + conf.toFixed(2);
    }

    function update(dt) {
      // eased parallax
      var k = Math.min(1, dt * 4);
      par.x += (par.tx - par.x) * k;
      par.y += (par.ty - par.y) * k;

      var p = auvPos();
      timers.auv -= dt;
      if (timers.auv <= 0) {
        // rear thruster is on the right (sprite is mirrored)
        spawn(p.x + sprAuv.w - 1, p.y + 12 + ((Math.random() * 3) | 0) - 1, Math.random() < 0.3 ? 2 : 1, 7);
        timers.auv = 0.25 + Math.random() * 0.5;
      }
      timers.amb -= dt;
      if (timers.amb <= 0) {
        spawn(Math.random() * W, H + 2, 1 + ((Math.random() * 3) | 0), 9);
        timers.amb = 0.5 + Math.random() * 0.9;
      }
      for (var i = bubbles.length - 1; i >= 0; i--) {
        var bb = bubbles[i];
        bb.y -= bb.vy * dt;
        bb.x = bb.x0 + Math.sin(t * 2.2 + bb.ph) * 0.9;
        if (bb.y < 4) bubbles.splice(i, 1);
      }

      timers.conf -= dt;
      if (timers.conf <= 0) {
        var roll = Math.random();
        conf = det.confidence - (roll < 0.25 ? 0.01 : roll < 0.33 ? 0.02 : 0);
        timers.conf = 0.4 + Math.random() * 0.5;
      }
      timers.jit -= dt;
      if (timers.jit <= 0) {
        for (var j = 0; j < 4; j++) jit[j] = Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
        timers.jit = 0.18 + Math.random() * 0.3;
      }
    }

    function spawn(x, y, r, speed) {
      if (bubbles.length > 80) return;
      bubbles.push({ x0: x, x: x, y: y, vy: speed + Math.random() * 6 + r * 2, ph: Math.random() * 6.28, r: r });
    }

    function draw() {
      if (!buf) return;
      drawWater();
      drawFish();
      drawKelp();
      var p = auvPos();
      blit(sprAuv, p.x, p.y, ((t * 12) | 0) % 2 === 1, ((t * 1.4) | 0) % 2 === 0);
      drawBubbles();
      ctx.putImageData(img, 0, 0);
      updateDetect(p);
      updateHud();
    }

    /* ---- loop: 30 fps, only while on screen and motion is allowed ---- */
    function loop(now) {
      rafId = requestAnimationFrame(loop);
      var elapsed = now - last;
      if (elapsed < 1000 / 30 - 2) return;
      last = now;
      var dt = Math.min(0.1, elapsed / 1000);
      t += dt;
      update(dt);
      draw();
    }
    function start() {
      if (running || reduceMQ.matches || document.hidden || !onScreen) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function setMotion() {
      stop();
      if (reduceMQ.matches) {
        t = 2;
        par.x = par.y = par.tx = par.ty = 0;
        bubbles = [];
        seedStaticBubbles();
        draw();
      } else {
        bubbles = [];
        start();
      }
    }

    /* ---- init ---- */
    readPalette();
    buildSprites();
    buildRays();
    layout();
    setMotion();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        onScreen ? start() : stop();
      }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });
    if (reduceMQ.addEventListener) reduceMQ.addEventListener("change", setMotion);

    var resizeTimer = 0;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    }
    if ("ResizeObserver" in window) new ResizeObserver(onResize).observe(hero);
    else window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    window.addEventListener("pointermove", function (e) {
      if (!fineMQ.matches || reduceMQ.matches || e.pointerType !== "mouse") return;
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    return { artPx: function () { return S; } };
  }

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  renderContent();
  var heroEl = $(".hero");
  var scene = null;
  try {
    if (heroEl && heroEl.querySelector(".hero__canvas").getContext) scene = Scene(heroEl);
  } catch (err) {
    if (window.console) console.error(err);
  }
  buildName(scene ? scene.artPx() : 4);
})();
