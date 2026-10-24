/*
  Yaad Kamrul Bari | portfolio
  1. Render every section from content.js
  2. Build the name pixel by pixel (once)
  3. Pixel scenes (hero ocean + seabed) on low-res canvases
  4. Depth meter, project detection boxes, copy-email
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
  function fill(parent, nodes) {
    if (!parent) return;
    parent.replaceChildren.apply(parent, nodes);
  }
  function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

  /* ------------------------------------------------------------
     Sprites: one character per pixel, "." is transparent.
     Colours: k navy  a/A/h amber  w white  c cyan  t turquoise  f foam
              p/d acrylic  g/G steel  L blinking light  1/2 propeller frames
     ------------------------------------------------------------ */
  // AUV drawn facing right; it is mirrored so it faces the text.
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
  var ROCK = [
    "....kkkk....",
    "..kkgggGkk..",
    ".kggggGGGGk.",
    "kgggGGGGGGGk",
    "kGGGGGGGGGGk"
  ];
  var PEBBLE = [".kk.", "kgGk"];
  var STAR = ["..a..", "aaaaa", ".aAa.", ".a.a."];
  var ICONS = {
    code: [
      "............",
      ".......a....",
      ".......a....",
      "...c..a.c...",
      "..c...a..c..",
      ".c....a...c.",
      "c....a.....c",
      ".c...a....c.",
      "..c..a...c..",
      "...ca...c...",
      "....a.......",
      "............"
    ],
    agent: [
      "............",
      "............",
      "..wwwwwwww..",
      ".wddddddddw.",
      ".wddddddddw.",
      ".wdadadaddw.",
      ".wddddddddw.",
      ".wddddddddw.",
      "..wwwwwwww..",
      "..ww........",
      "..w.........",
      "............"
    ],
    eye: [
      "............",
      "............",
      "............",
      "...wwwwww...",
      "..w.cccc.w..",
      ".w..cwkc..w.",
      "w...ckkc...w",
      ".w..ckkc..w.",
      "..w.cccc.w..",
      "...wwwwww...",
      "............",
      "............"
    ],
    robot: [
      "..........c.",
      "........ac..",
      "......aa..c.",
      ".....a...c..",
      "...www......",
      "....a.......",
      "....a.......",
      "....a.......",
      "....a.......",
      "..ggggg.....",
      ".GGGGGGG....",
      ".GGGGGGG...."
    ],
    chip: [
      "............",
      "....g.g.g...",
      "....g.g.g...",
      "...gggggg...",
      ".gggGGGGggg.",
      "...gGccGg...",
      ".gggGccGggg.",
      "...gGGGGg...",
      ".gggggggggg.",
      "....g.g.g...",
      "....g.g.g...",
      "............"
    ],
    db: [
      "............",
      "...wwwwww...",
      "..gccccccg..",
      "...dddddd...",
      "............",
      "...wwwwww...",
      "..gccccccg..",
      "...dddddd...",
      "............",
      "...wwwwww...",
      "..gccccccg..",
      "...dddddd..."
    ],
    screen: [
      "............",
      "gggggggggggg",
      "gkkkkkkkkkkg",
      "gkccccckkkkg",
      "gkkkkkkkkkkg",
      "gkfffffffkkg",
      "gkffffkkkkkg",
      "gkkkkkkkkkkg",
      "gggggggggggg",
      ".....GG.....",
      "...gggggg...",
      "............"
    ],
    tool: [
      "............",
      "........g.g.",
      ".......gg.g.",
      ".......gggg.",
      "......gggg..",
      ".....ggG....",
      "....ggG.....",
      "...ggG......",
      "..ggG.......",
      ".aaG........",
      ".aa.........",
      "............"
    ],
    trophy: [
      "................",
      "....hhhhhhhh....",
      ".aaahhaaaaAAAAA.",
      ".a..hhawwaAA..A.",
      ".a..hhawaaAA..A.",
      "..a.hhaaaaAA.A..",
      "...ahhaaaaAAA...",
      "....aaaaaaAA....",
      ".....AAAAAA.....",
      ".......aa.......",
      ".......aa.......",
      ".....AAAAAA.....",
      "....gggggggg....",
      "....GGaaaaGG....",
      "....GGGGGGGG....",
      "................"
    ],
    medal: [
      "....ct....tc....",
      ".....ct..tc.....",
      ".....ct..tc.....",
      "......cttc......",
      "......cttc......",
      ".......tc.......",
      ".......tc.......",
      "......aaaa......",
      "....aaaaaaaA....",
      "....aaahhaAA....",
      "....aahhhhAA....",
      "....aaahhaAA....",
      "....aaahhaAA....",
      "....aaaaaaAA....",
      "......AAAAA.....",
      "................"
    ],
    marker: [
      "....a....",
      "...pppp..",
      "gaaaaaaac",
      "gaaaaaaac",
      "..AAAAA.."
    ]

  };

  // Contact icons: sprites drawn in "x" = the link's text colour, or a ready-made SVG
  var BRAND = {
    mail: [
      ".............",
      ".............",
      "xxxxxxxxxxxxx",
      "xx.........xx",
      "x.x.......x.x",
      "x..x.....x..x",
      "x...x...x...x",
      "x....xxx....x",
      "x...........x",
      "x...........x",
      "xxxxxxxxxxxxx",
      ".............",
      "............."
    ],
    linkedin: [
      ".xxxxxxxxxxx.",
      "xxxxxxxxxxxxx",
      "xx..xxxxxxxxx",
      "xx..xxxxxxxxx",
      "xxxxxxxxxxxxx",
      "xx..x.....xxx",
      "xx..x..xx..xx",
      "xx..x..xx..xx",
      "xx..x..xx..xx",
      "xx..x..xx..xx",
      "xx..x..xx..xx",
      "xxxxxxxxxxxxx",
      ".xxxxxxxxxxx."
    ],
    // the official GitHub mark: a pixel octocat is unreadable at this size
    github: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>'
  };

  // Inline SVG from a sprite; colours come from .px-* classes in styles.css.
  function spriteSVG(rows, cls) {
    var w = rows[0].length, h = rows.length, out = [];
    rows.forEach(function (row, y) {
      var x = 0;
      while (x < w) {
        var ch = row[x];
        if (ch === ".") { x++; continue; }
        var x0 = x;
        while (x < w && row[x] === ch) x++;
        out.push('<rect class="px-' + ch + '" x="' + x0 + '" y="' + y + '" width="' + (x - x0) + '" height="1"/>');
      }
    });
    return '<svg class="' + (cls || "") + '" viewBox="0 0 ' + w + " " + h +
      '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + out.join("") + "</svg>";
  }

  var ARROW_OUT = '<svg viewBox="0 0 7 7" width="11" height="11" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><path fill="currentColor" d="M2 0h5v1H2zM6 1h1v4H6zM5 1h1v1H5zM4 2h1v1H4zM3 3h1v1H3zM2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z"/></svg>';
  var ARROW_DOWN = '<svg viewBox="0 0 7 8" width="11" height="12" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 0h1v4H3zM1 3h1v1H1zM5 3h1v1H5zM2 4h1v1H2zM4 4h1v1H4zM3 5h1v1H3zM0 7h7v1H0z"/></svg>';

  /* ------------------------------------------------------------
     1. Content
     ------------------------------------------------------------ */
  function link(l) {
    var a = el("a", "link");
    a.href = l.href;
    a.appendChild(el("span", null, l.label));
    if (l.download) {
      a.setAttribute("download", "");
      a.insertAdjacentHTML("beforeend", ARROW_DOWN);
    } else if (l.newTab || /^https?:/.test(l.href)) {
      a.target = "_blank";
      a.rel = "noopener";
      a.insertAdjacentHTML("beforeend", ARROW_OUT);
    }
    return a;
  }

  // An image / GIF / video if one is set, otherwise a labelled grey slot.
  function media(src, slot, alt, title) {
    if (src) {
      if (/\.(mp4|webm)$/i.test(src)) {
        // Nothing is downloaded until the video is near the screen (see lazyVideos).
        var v = el("video", "media-img");
        v.muted = true;
        v.setAttribute("muted", "");
        v.loop = true;
        v.playsInline = true;
        v.preload = "none";
        v.dataset.src = src;
        v.dataset.poster = src.replace(/\.(mp4|webm)$/i, ".jpg");
        v.setAttribute("aria-label", alt || "");
        return v;
      }
      var img = el("img", "media-img");
      img.src = src;
      img.alt = alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      return img;
    }
    var s = el("div", "slot");
    s.setAttribute("role", "img");
    s.setAttribute("aria-label", (title || "Image slot") + ": " + (alt || "placeholder"));
    s.appendChild(el("span", "slot__title", title || "Image slot"));
    if (slot) s.appendChild(el("span", "slot__path", slot));
    return s;
  }

  // Decorative barcode: each character sets the widths of a bar and the gap after it.
  function barcodeSVG(text) {
    var x = 0, bars = [];
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      [c % 3 + 1, (c >> 2) % 2 + 1, (c >> 3) % 3 + 1].forEach(function (w, j) {
        if (j !== 1) bars.push('<rect x="' + x + '" width="' + w + '" height="1"/>');
        x += w;
      });
      x += 1;
    }
    return '<svg viewBox="0 0 ' + x + ' 1" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><g fill="currentColor">' +
      bars.join("") + "</g></svg>";
  }

  function tags(list) {
    var ul = el("ul", "tags");
    (list || []).forEach(function (t) { ul.appendChild(el("li", null, t)); });
    return ul;
  }

  function renderContent() {
    if (C.meta) {
      if (C.meta.title) document.title = C.meta.title;
      var desc = $('meta[name="description"]');
      if (desc && C.meta.description) desc.setAttribute("content", C.meta.description);
    }

    $$("[data-text]").forEach(function (node) {
      var v = get(node.dataset.text);
      if (typeof v === "string" || typeof v === "number") node.textContent = v;
      if (v === "") node.hidden = true; // empty text in content.js hides the element
    });

    // Nav + CV
    var nav = C.nav || {};
    fill($("#nav-links"), (nav.links || []).map(function (l) {
      var li = el("li");
      var a = el("a", null, l.label);
      a.href = l.href;
      li.appendChild(a);
      return li;
    }));
    var cv = $("#cv-link");
    if (cv && nav.cv && nav.cv.href) cv.href = nav.cv.href;
    var preview = $("#cv-preview");
    if (preview) {
      if (nav.cvPreview && nav.cvPreview.href) preview.href = nav.cvPreview.href;
      else preview.hidden = true;
    }

    // Hero
    var hero = C.hero || {};
    fill($("#hero-actions"), (hero.actions || []).map(function (a) {
      var b = el("a", "btn" + (a.style === "secondary" ? " btn--secondary" : ""), a.label);
      b.href = a.href;
      return b;
    }));
    fill($("#hero-titles"), (hero.titles || []).map(function (t) { return el("li", null, t); }));
    var intro = [].concat(hero.intro || []);
    fill($("#hero-intro"), intro.map(function (line) { return el("p", null, line); }));
    var facts = $("#hero-facts");
    if (facts) {
      fill(facts, (hero.facts || []).map(function (f) { return el("li", null, f); }));
      facts.hidden = !(hero.facts && hero.facts.length);
    }

    // About
    var about = C.about || {};
    fill($("#about-text"), (about.paragraphs || []).map(function (p) { return el("p", null, p); }));
    var card = about.card || {};
    fill($("#about-photo"), [media(card.image, card.slot, card.alt, "Photo slot")]);
    var barcode = $("#about-barcode");
    if (barcode) {
      if (card.number) barcode.innerHTML = barcodeSVG(card.number);
      else barcode.hidden = true;
    }
    fill($("#about-facts"), (card.facts || []).map(function (f) {
      var d = el("div");
      d.appendChild(el("dt", null, f.label));
      d.appendChild(el("dd", null, f.value));
      return d;
    }));

    // Headline mission (RoboSub), inside About
    var ft = C.featured || {};
    fill($("#featured-links"), (ft.links || []).map(link));
    fill($("#featured-stats"), (ft.stats || []).map(function (s) {
      var li = el("li");
      li.appendChild(el("span", "stat__value", s.value));
      li.appendChild(el("span", "stat__label", s.label));
      return li;
    }));

    // Projects
    var pr = C.projects || {};
    fill($("#project-cards"), (pr.featured || []).concat(pr.more || []).map(projectCard));

    // Experience + education
    var ex = C.experience || {};
    fill($("#log-missions"), (ex.items || []).map(function (e) { return logEntry(e, ex.showPoints !== false); }));
    fill($("#edu-list"), ((C.education || {}).items || []).map(eduCard));

    // Inventory
    var sk = C.skills || {};
    fill($("#inventory"), (sk.groups || []).map(function (g) {
      var li = el("li", "slotbox");
      var head = el("div", "slotbox__head");
      var icon = el("span", "slotbox__icon");
      icon.innerHTML = spriteSVG(ICONS[g.icon] || ICONS.code);
      head.appendChild(icon);
      var name = el("div");
      name.appendChild(el("h3", "slotbox__name", g.name));
      name.appendChild(el("span", "slotbox__count", "x" + (g.items || []).length + " items"));
      head.appendChild(name);
      li.appendChild(head);
      li.appendChild(tags(g.items));
      return li;
    }));

    // Awards
    var aw = C.awards || {};
    fill($("#awards-list"), (aw.items || []).map(function (a) {
      var li = el("li", "award");
      li.innerHTML = spriteSVG(ICONS[a.icon] || ICONS.trophy);
      li.appendChild(el("p", "award__place", a.place));
      li.appendChild(el("p", "award__event", a.event));
      if (a.detail) li.appendChild(el("p", "award__detail", a.detail));
      if (a.certificate && a.certificate.href) {
        var cert = el("a", "award__cert");
        cert.href = a.certificate.href;
        cert.target = "_blank";
        cert.rel = "noopener";
        if (a.certificate.image) {
          var thumb = el("img");
          thumb.src = a.certificate.image;
          thumb.alt = "Certificate of participation, " + a.event;
          thumb.loading = "lazy";
          thumb.decoding = "async";
          cert.appendChild(thumb);
        }
        cert.setAttribute("aria-label", "Open the certificate for " + a.event + " (new tab)");
        li.appendChild(cert);
      }
      return li;
    }));

    // Contact
    var person = C.person || {};
    var ct = C.contact || {};
    if (person.email) {
      // Gmail's compose page works in any browser; mailto: needs a desktop mail app.
      var mail = (C.contact && C.contact.compose === "mailto")
        ? "mailto:" + person.email
        : "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(person.email);
      var em = $("#contact-email");
      em.href = mail;
      em.textContent = person.email;
      $("#mail-btn").href = mail;
    }
    var ctLinks = (ct.links || []).filter(function (l) { return l.href; });
    fill($("#contact-links"), ctLinks.map(function (l) {
      var li = el("li");
      li.appendChild(link(l));
      return li;
    }));

    // Same links as icons under the photo on the About card
    var cardLinks = $("#about-links");
    if (cardLinks) {
      var icons = (person.email && mail ? [{ label: "Email", href: mail, icon: "mail" }] : [])
        .concat(ctLinks.filter(function (l) { return BRAND[l.icon]; }));
      fill(cardLinks, icons.map(function (l) {
        var li = el("li");
        var a = el("a", "idcard__link");
        a.href = l.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.title = l.label;
        a.setAttribute("aria-label", l.label + " (new tab)");
        var icon = BRAND[l.icon];
        a.innerHTML = typeof icon === "string" ? icon : spriteSVG(icon);
        li.appendChild(a);
        return li;
      }));
      cardLinks.hidden = (C.about && C.about.card || {}).links === false || !icons.length;
    }

    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function projectCard(p) {
    var li = el("li", "card");
    var det = p.detect || { label: "project", confidence: 0.97 };

    var box = el("div", "card__det");
    box.setAttribute("aria-hidden", "true");
    var label = el("span", "card__det-label", det.label + " " + det.confidence.toFixed(2));
    box.appendChild(label);
    li.appendChild(box);

    var m = el("div", "card__media");
    m.appendChild(!p.image && p.icon ? noSignal(p) : media(p.image, p.slot, p.alt || p.title, "GIF / image slot"));
    li.appendChild(m);

    var body = el("div", "card__body");
    var meta = el("div", "card__meta");
    meta.appendChild(el("span", "card__kind", p.kind));
    if (p.stat) {
      var st = el("span", "card__stat", p.stat.label + " ");
      st.appendChild(el("b", null, p.stat.value));
      meta.appendChild(st);
    }
    body.appendChild(meta);
    body.appendChild(el("h3", "card__title", p.title));
    body.appendChild(el("p", "card__summary", p.summary));
    body.appendChild(tags(p.tags));
    var links = el("div", "card__links");
    (p.links || []).filter(function (l) { return l.href; }).forEach(function (l) {
      var a = link(l);
      a.setAttribute("aria-label", l.label + ": " + p.title);
      links.appendChild(a);
    });
    body.appendChild(links);
    li.appendChild(body);

    // confidence counts up while the box draws
    var raf = 0;
    function run() {
      cancelAnimationFrame(raf);
      if (reduceMQ.matches) { label.textContent = det.label + " " + det.confidence.toFixed(2); return; }
      var t0 = performance.now();
      (function tick(now) {
        var k = Math.min(1, (now - t0) / 360);
        label.textContent = det.label + " " + (0.41 + (det.confidence - 0.41) * k).toFixed(2);
        if (k < 1) raf = requestAnimationFrame(tick);
      })(t0);
    }
    li.addEventListener("mouseenter", run);
    li.addEventListener("focusin", function (e) {
      if (!li.contains(e.relatedTarget)) run();
    });
    return li;
  }

  // Institution logo, or a pixel monogram until a logo file is added.
  function logoTile(e) {
    var box = el("span", "logo" + (e.logo ? "" : " logo--mark"));
    if (e.logo && e.logoBg) box.style.background = e.logoBg;
    if (e.logo) {
      var img = el("img");
      img.src = e.logo;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      box.appendChild(img);
    } else {
      box.textContent = e.mark || (e.org || "?").charAt(0);
      box.setAttribute("aria-hidden", "true");
    }
    return box;
  }

  function eduCard(e) {
    var li = el("li", "edu__card");
    var head = el("div", "edu__head");
    head.appendChild(logoTile(e));
    head.appendChild(el("p", "log__time", e.dates));
    li.appendChild(head);
    li.appendChild(el("h3", "edu__degree", e.degree));
    li.appendChild(el("p", "log__org", [e.org, e.place].filter(Boolean).join(" · ")));
    if (e.grade) li.appendChild(el("p", "edu__grade", e.grade));
    return li;
  }

  // A card without media: a pixel "no signal" screen with the project's icon.
  function noSignal(p) {
    var box = el("div", "nofeed");
    box.setAttribute("aria-hidden", "true");
    box.innerHTML = spriteSVG(ICONS[p.icon] || ICONS.code, "nofeed__icon");
    var tag = el("span", "media-tag");
    box.appendChild(tag);
    return box;
  }

  function logEntry(e, showPoints) {
    var li = el("li", "log__entry" + (e.status === "Active" ? " is-active" : ""));
    li.appendChild(logoTile(e));
    var text = el("div", "log__text");
    li.appendChild(text);
    var time = el("p", "log__time");
    time.appendChild(el("span", null, e.dates));
    if (e.status) time.appendChild(el("span", "log__status", e.status));
    text.appendChild(time);
    text.appendChild(el("h3", "log__role", e.role));
    text.appendChild(el("p", "log__org", [e.org, e.place].filter(Boolean).join(" · ")));
    if (showPoints && e.points && e.points.length) {
      var ul = el("ul", "log__points");
      e.points.forEach(function (pt) { ul.appendChild(el("li", null, pt)); });
      text.appendChild(ul);
    }
    return li;
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
    var timeout = new Promise(function (r) { setTimeout(r, 1000); });

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
     3. Pixel scenes
     One engine draws both the hero ocean and the seabed; the options
     decide what goes in each.
     ------------------------------------------------------------ */
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

  var SCENES = {
    hero: {
      canvas: ".hero__canvas",
      ramp: ["--water-0", "--water-1", "--water-2", "--water-3", "--water-4",
             "--water-5", "--water-6", "--water-7", "--water-8", "--water-9"],
      level: function (yn) { return yn < 0.1 ? 2.2 + (yn / 0.1) * 2.8 : 5 + ((yn - 0.1) / 0.9) * 1.9; },
      rays: 1.7,
      rayFadeIn: 0,
      surface: true,
      damp: ".hero__copy",
      avoid: [".hero__copy", ".viewport"],
      anchor: ".viewport",
      auv: "bob",
      fish: true,
      sand: false,
      detect: true,
      kelpSpots: [0.012, 0.04, 0.07, 0.31, 0.34, 0.5, 0.53, 0.72, 0.9, 0.935, 0.965, 0.99],
      kelpHeight: [0.28, 0.58],
      seed: 5
    },
    seabed: {
      canvas: ".seabed__canvas",
      // level 4 (deep-3) at the top matches the Awards zone above
      ramp: ["--water-8", "--water-9", "--deep-1", "--deep-2", "--deep-3", "--deep-4", "--navy-950"],
      level: function (yn) { return 4 + yn * 1.7; },
      rays: 1.1,
      rayFadeIn: 0.25,
      surface: false,
      damp: ".transmission",
      avoid: [".transmission"],
      anchor: ".seabed__dock",
      auv: "rest",
      fish: false,
      sand: true,
      detect: false,
      kelpSpots: [0.015, 0.045, 0.08, 0.4, 0.44, 0.6, 0.64, 0.88, 0.93, 0.97],
      kelpHeight: [0.18, 0.42],
      seed: 21
    }
  };

  function Scene(section, opt) {
    var canvas = $(opt.canvas, section);
    var ctx = canvas.getContext("2d", { alpha: false });
    var detect = opt.detect ? $(".detect", section) : null;
    var detectLabel = detect ? $(".detect__label", detect) : null;
    var tape = $(".hud__tape", section);
    var headingOut = $('[data-hud="heading"]', section);

    var hud = C.hud || {};
    var det = hud.detection || { label: "auv", confidence: 0.99 };
    var heading0 = Number(hud.heading) || 87;

    var W = 0, H = 0, S = 4, img = null, buf = null;
    var RAMP = [], COL = [];
    var sprAuv, fishL, fishR, fishLB, fishRB, sprRock, sprPebble, sprStar;
    var baseLv, rayFade, dampX, dampY, rayTex, sandTop, sandLayer;
    var anchor = null, avoid = [], damp = null, kelp = [], bubbles = [], fishBand = null, props = [];
    var t = 0, last = 0, rafId = 0, running = false, onScreen = false;
    var par = { x: 0, y: 0, tx: 0, ty: 0 };
    var timers = { auv: 0, amb: 0, conf: 0, jit: 0 };
    var conf = det.confidence, jit = [0, 0, 0, 0];
    var lastBox = "", lastHeading = -1, lastLabel = "";

    function readPalette() {
      RAMP = opt.ramp.map(function (n) { return pack(cssVar(n)); });
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
      COL.sand = ["--sand-0", "--sand-1", "--sand-2", "--sand-3"].map(function (n) { return pack(cssVar(n)); });
    }

    function buildSprites() {
      sprAuv = compile(AUV, true); // propeller frames are swapped at draw time
      fishL = compile(FISH_A, false); fishLB = compile(FISH_B, false);
      fishR = compile(FISH_A, true); fishRB = compile(FISH_B, true);
      sprRock = compile(ROCK, false);
      sprPebble = compile(PEBBLE, false);
      sprStar = compile(STAR, false);
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

    function toArt(node, hr) {
      if (!node) return null;
      var rect = node.getBoundingClientRect();
      var x0 = (rect.left - hr.left) / S, y0 = (rect.top - hr.top) / S;
      var w = rect.width / S, h = rect.height / S;
      return { x0: x0, y0: y0, x1: x0 + w, y1: y0 + h, w: w, h: h, cx: x0 + w / 2, cy: y0 + h / 2 };
    }

    function layout() {
      var hr = section.getBoundingClientRect();
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

      if (opt.detect) {
        root.style.setProperty("--art-px", S + "px");
        root.style.setProperty("--grid", S * 12 + "px");
      }

      anchor = toArt($(opt.anchor, section), hr);
      damp = toArt($(opt.damp, section), hr);
      avoid = opt.avoid.map(function (s) { return toArt($(s, section), hr); }).filter(Boolean);

      var maxLv = RAMP.length - 1;
      baseLv = new Float32Array(H);
      rayFade = new Float32Array(H);
      for (var y = 0; y < H; y++) {
        var yn = y / H;
        baseLv[y] = Math.min(maxLv, opt.level(yn));
        var fadeIn = opt.rayFadeIn ? Math.min(1, yn / opt.rayFadeIn) : 1;
        rayFade[y] = Math.pow(Math.max(0, 1 - yn * 0.95), 1.6) * fadeIn * opt.rays;
      }
      // light rays are damped behind the text so it stays readable
      dampX = new Float32Array(W);
      dampY = new Float32Array(H);
      if (damp) {
        for (var x = 0; x < W; x++) dampX[x] = smoothInside(x, damp.x0, damp.x1, 8);
        for (y = 0; y < H; y++) dampY[y] = smoothInside(y, damp.y0, damp.y1, 8);
      }

      if (opt.sand) buildSand();
      plantKelp();

      if (opt.fish && anchor) {
        var copy = avoid[0];
        var beside = copy && anchor.x0 >= copy.x1 - 2;
        fishBand = beside
          ? { x0: copy.x1 + 6, x1: W + 14, y: anchor.y0 + anchor.h * 0.26 }
          : { x0: -14, x1: W + 14, y: anchor.y0 + anchor.h * 0.24 };
      }

      bubbles = [];
      if (reduceMQ.matches) seedStaticBubbles();
      draw();
    }

    function floorY(x) {
      if (!sandTop) return H;
      return sandTop[Math.max(0, Math.min(W - 1, Math.round(x)))];
    }

    // Sand, pebbles, rocks and a starfish: drawn once per layout into a static layer.
    function buildSand() {
      var r = rng(opt.seed + 3);
      var depth = Math.max(16, Math.round(H * 0.13));
      sandTop = new Int16Array(W);
      for (var x = 0; x < W; x++) {
        sandTop[x] = H - depth + Math.round(Math.sin(x * 0.045 + 0.5) * 1.5 + Math.sin(x * 0.11) * 1);
      }
      sandLayer = new Uint32Array(W * H);
      var S4 = COL.sand;
      for (x = 0; x < W; x++) {
        for (var y = sandTop[x]; y < H; y++) {
          var d = y - sandTop[x];
          var lv = d === 0 ? 0 : Math.min(3, 0.6 + d * 0.16);
          var b = lv | 0, f = lv - b;
          var c = f > BAYER[((y & 3) << 2) | (x & 3)] && b < 3 ? b + 1 : b;
          sandLayer[y * W + x] = S4[c];
        }
        // ripples
        if (r() < 0.12) sandLayer[(sandTop[x] + 2) * W + x] = S4[0];
      }
      props = [];
      function place(spr, x) {
        x = Math.round(x);
        props.push({ spr: spr, x: x, y: floorY(x + spr.w / 2) - spr.h + 2 });
      }
      var cx = anchor ? anchor.cx : W * 0.7;
      var half = sprAuv.w / 2;
      if (cx + half + 4 + sprRock.w < W) place(sprRock, cx + half + 4);
      else place(sprRock, cx - half - sprRock.w - 4);
      place(sprStar, cx - half - 10);
      for (var i = 0; i < 6; i++) place(sprPebble, r() * (W - 4));
    }

    function plantKelp() {
      var r = rng(opt.seed);
      kelp = [];
      opt.kelpSpots.forEach(function (f) {
        var x = Math.round(f * W + (r() - 0.5) * 3);
        var h = Math.round(H * (opt.kelpHeight[0] + r() * (opt.kelpHeight[1] - opt.kelpHeight[0])));
        var base = opt.sand ? floorY(x) + 1 : H;
        // keep clear of the text and the HUD frame
        avoid.forEach(function (bx) {
          if (x >= bx.x0 - 6 && x <= bx.x1 + 6) h = Math.min(h, Math.floor(base - bx.y1 - 4));
        });
        // and of the resting AUV
        if (opt.auv === "rest" && anchor && Math.abs(x - anchor.cx) < sprAuv.w / 2 + 14) h = 0;
        if (h >= 8) {
          kelp.push({ x: x, base: base, h: h, ph: r() * 6.28, sp: 0.6 + r() * 0.5, amp: 1.5 + r() * 2.5, lo: (r() * 6) | 0 });
        }
      });
    }

    function seedStaticBubbles() {
      var r = rng(9);
      for (var i = 0; i < 18; i++) {
        var x = r() * W, y = H * (0.15 + r() * 0.7);
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
      var maxLv = RAMP.length - 1;
      for (var y = 0; y < H; y++) {
        var base = baseLv[y], fade = rayFade[y] * breathe, row = y * W;
        var yo = y * 0.5 + phase, dy = dampY[y], by = (y & 3) << 2;
        for (var x = 0; x < W; x++) {
          var ray = rayTex[(x + yo) & (RAY_N - 1)] * fade * (1 - 0.82 * dampX[x] * dy);
          var lv = base - ray;
          if (lv < 0) lv = 0;
          var b = lv | 0, f = lv - b;
          var ff = f < 0.45 ? 0 : (f - 0.45) / 0.55;
          buf[row + x] = RAMP[ff > BAYER[by | (x & 3)] && b < maxLv ? b + 1 : b];
        }
      }
      if (!opt.surface) return;
      // underside of the surface, rippling
      for (var sx = 0; sx < W; sx++) {
        var ys = Math.round(2 + Math.sin(sx * 0.21 + t * 1.7) + Math.sin(sx * 0.067 - t * 0.9) * 0.8);
        if (ys < 0) ys = 0;
        for (var sy = 0; sy < ys; sy++) buf[sy * W + sx] = RAMP[1];
        buf[ys * W + sx] = RAMP[0];
      }
    }

    function drawSand() {
      for (var x = 0; x < W; x++) {
        for (var y = sandTop[x]; y < H; y++) {
          var i = y * W + x;
          buf[i] = sandLayer[i];
        }
      }
      for (var n = 0; n < props.length; n++) blit(props[n].spr, props[n].x, props[n].y, false, false);
    }

    function drawKelp() {
      var kd = COL.kd, km = COL.km, kl = COL.kl;
      for (var n = 0; n < kelp.length; n++) {
        var k = kelp[n], x = 0, y = 0;
        for (var j = 0; j < k.h; j++) {
          y = k.base - 1 - j;
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
      if (!anchor) return { x: -999, y: -999 };
      if (opt.auv === "rest") {
        var x = Math.round(anchor.cx - sprAuv.w / 2);
        return { x: x, y: Math.min(floorY(x + 8), floorY(x + sprAuv.w - 8)) - sprAuv.h + 2 };
      }
      return {
        x: Math.round(anchor.cx - sprAuv.w / 2 + par.x * 4 + Math.sin(t * 0.35) * 1.2),
        y: Math.round(anchor.cy - sprAuv.h / 2 + par.y * 3 + Math.sin(t * 1.25) * 1.6)
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
      if (hdg !== lastHeading && headingOut) {
        lastHeading = hdg;
        var shown = ((hdg % 360) + 360) % 360;
        headingOut.textContent = ("00" + shown).slice(-3) + "°";
        if (tape) tape.style.setProperty("--tape-x", -hdg * 1.2 + "px");
      }
      var label = det.label + " " + conf.toFixed(2);
      if (label !== lastLabel) {
        lastLabel = label;
        detectLabel.textContent = label;
      }
    }

    function update(dt) {
      var k = Math.min(1, dt * 4);
      par.x += (par.tx - par.x) * k;
      par.y += (par.ty - par.y) * k;

      var p = auvPos();
      timers.auv -= dt;
      if (timers.auv <= 0 && anchor) {
        // rear thruster is on the right (sprite is mirrored)
        spawn(p.x + sprAuv.w - 1, p.y + 12 + ((Math.random() * 3) | 0) - 1, Math.random() < 0.3 ? 2 : 1, 7);
        timers.auv = opt.auv === "rest" ? 1.2 + Math.random() * 1.6 : 0.25 + Math.random() * 0.5;
      }
      timers.amb -= dt;
      if (timers.amb <= 0) {
        var bx = Math.random() * W;
        spawn(bx, opt.sand ? floorY(bx) : H + 2, 1 + ((Math.random() * 3) | 0), 9);
        timers.amb = 0.5 + Math.random() * 0.9;
      }
      for (var i = bubbles.length - 1; i >= 0; i--) {
        var bb = bubbles[i];
        bb.y -= bb.vy * dt;
        bb.x = bb.x0 + Math.sin(t * 2.2 + bb.ph) * 0.9;
        if (bb.y < 4) bubbles.splice(i, 1);
      }

      if (!detect) return;
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
      if (opt.fish && fishBand) drawFish();
      if (opt.sand) drawSand();
      drawKelp();
      var p = auvPos();
      var spin = opt.auv === "bob" && ((t * 12) | 0) % 2 === 1;
      blit(sprAuv, p.x, p.y, spin, ((t * 1.4) | 0) % 2 === 0);
      drawBubbles();
      ctx.putImageData(img, 0, 0);
      if (detect) {
        updateDetect(p);
        updateHud();
      }
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
      bubbles = [];
      if (reduceMQ.matches) {
        t = 2;
        par.x = par.y = par.tx = par.ty = 0;
        seedStaticBubbles();
        draw();
      } else {
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
      }, { rootMargin: "100px 0px" }).observe(section);
    } else {
      onScreen = true;
      start();
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
    if ("ResizeObserver" in window) new ResizeObserver(onResize).observe(section);
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
     4a. Depth meter: live depth from scroll position; doubles as nav
     ------------------------------------------------------------ */
  function depthMeter() {
    var zones = (C.zones || []).filter(function (z) { return document.getElementById(z.id); });
    if (!zones.length) return;

    $$("[data-zone-tag]").forEach(function (node) {
      var z = zones.filter(function (q) { return q.id === node.dataset.zoneTag; })[0];
      if (z) node.textContent = z.depth + " m · " + z.label;
    });

    var stops = $("#meter-stops");
    var marker = $(".meter__marker");
    var track = $(".meter__track");
    var readout = $('[data-hud="meter"]');
    var heroDepth = $('[data-hud="depth"]');
    if (marker) marker.innerHTML = spriteSVG(ICONS.marker);

    var links = zones.map(function (z) {
      var li = el("li");
      var a = el("a");
      a.href = "#" + z.id;
      a.appendChild(el("span", "meter__name", z.label));
      a.appendChild(el("span", "meter__depth", z.depth + " m"));
      li.appendChild(a);
      stops.appendChild(li);
      return a;
    });
    var sections = zones.map(function (z) { return document.getElementById(z.id); });
    var topbar = $(".topbar");
    var queued = false, lastActive = -1, lastDepth = -1;

    function update() {
      queued = false;
      var y = window.scrollY, vh = window.innerHeight;
      // probe just under the sticky top bar; reads 0 m at the very top
      var bar = topbar ? topbar.offsetHeight + 8 : 72;
      var probe = y + Math.min(y, bar);
      var tops = sections.map(function (s) { return s.getBoundingClientRect().top + y; });
      var n = zones.length, i = 0, frac = 0;
      if (y + vh >= document.documentElement.scrollHeight - 2) {
        i = n - 1;
      } else {
        while (i < n - 1 && tops[i + 1] <= probe) i++;
        if (i < n - 1) frac = Math.max(0, Math.min(1, (probe - tops[i]) / (tops[i + 1] - tops[i])));
      }
      var depth = i < n - 1 ? zones[i].depth + frac * (zones[i + 1].depth - zones[i].depth) : zones[n - 1].depth;
      depth = Math.round(depth);
      if (depth !== lastDepth) {
        lastDepth = depth;
        if (readout) readout.textContent = depth + " m";
        if (heroDepth) heroDepth.textContent = depth;
      }
      if (track && marker) {
        marker.style.setProperty("--marker-y", ((i + frac) / (n - 1)) * track.clientHeight + "px");
      }
      var active = frac > 0.5 ? i + 1 : i;
      if (active !== lastActive) {
        if (links[lastActive]) { links[lastActive].classList.remove("is-active"); links[lastActive].removeAttribute("aria-current"); }
        links[active].classList.add("is-active");
        links[active].setAttribute("aria-current", "location");
        lastActive = active;
      }
    }
    function queue() {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
  }

  /* ------------------------------------------------------------
     4a2. Card videos: load when near the screen, play only while visible
     ------------------------------------------------------------ */
  function lazyVideos() {
    var vids = $$("video[data-src]");
    if (!vids.length) return;
    function load(v) {
      if (v.dataset.loaded) return;
      v.dataset.loaded = "1";
      v.poster = v.dataset.poster;
      v.src = v.dataset.src;
      v.preload = reduceMQ.matches ? "metadata" : "auto";
    }
    if (!("IntersectionObserver" in window)) { vids.forEach(load); return; }
    var near = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { load(e.target); near.unobserve(e.target); }
      });
    }, { rootMargin: "400px 0px" });
    var onScreen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduceMQ.matches) {
          load(v);
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { near.observe(v); onScreen.observe(v); });
  }

  /* ------------------------------------------------------------
     4b. Copy email
     ------------------------------------------------------------ */
  function copyEmail() {
    var btn = $("#copy-btn"), status = $("#copy-status");
    var email = (C.person || {}).email;
    if (!btn || !email) return;
    var ct = C.contact || {};
    var timer = 0;
    function done(ok) {
      status.textContent = ok ? (ct.copiedLabel || "Copied") : email;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ""; }, 2400);
    }
    function fallback() {
      var ta = el("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove();
      done(ok);
    }
    btn.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ------------------------------------------------------------
     4c. Portrait resolves from chunky pixels to the real photo, once
     A canvas sits over the <img>; the real photo is never altered.
     ------------------------------------------------------------ */
  var PHOTO_STEPS = [8, 12, 18, 28, 44, 70, 110]; // columns of pixels per step
  var PHOTO_STEP_MS = 120;

  function photoReveal() {
    var box = $(".idcard__photo");
    var img = box && $("img", box);
    if (!img || reduceMQ.matches || !("IntersectionObserver" in window)) return;

    var canvas = el("canvas", "photo-pixels");
    canvas.setAttribute("aria-hidden", "true");
    box.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var small = document.createElement("canvas");
    var sctx = small.getContext("2d");
    var visible = false, started = false;

    function paint(cols) {
      var r = box.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      small.width = cols;
      small.height = Math.max(1, Math.round((cols * r.height) / r.width));
      sctx.drawImage(img, 0, 0, small.width, small.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, canvas.width, canvas.height);
    }
    function run() {
      if (started || !visible || !img.naturalWidth) return;
      started = true;
      var i = 0;
      (function step() {
        if (i < PHOTO_STEPS.length) {
          paint(PHOTO_STEPS[i++]);
          setTimeout(step, PHOTO_STEP_MS);
        } else {
          canvas.remove();
        }
      })();
    }

    // until it scrolls into view, show the coarsest version
    if (img.complete && img.naturalWidth) paint(PHOTO_STEPS[0]);
    img.addEventListener("load", function () {
      if (!started) paint(PHOTO_STEPS[0]);
      run();
    });
    img.addEventListener("error", function () { canvas.remove(); });

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      visible = true;
      run();
      if (started) io.disconnect();
    }, { threshold: 0.6 });
    io.observe(box);
  }

  /* ------------------------------------------------------------
     4d. Marine snow in the middle sections
     One low-res canvas fixed to the viewport, drawn *under* the section
     content (zone__inner sits above it), only between About and Contact.
     Specks are fainter over the reading column than in the margins.
     ------------------------------------------------------------ */
  function marineSnow() {
    var topSec = $("#about"), endSec = $("#contact");
    if (!topSec || !endSec || reduceMQ.matches) return;

    var canvas = el("canvas", "snow");
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var snowColor = cssVar("--foam-200"), bubbleColor = cssVar("--foam-100");

    var S = 4, W = 0, H = 0, colL = 0, colR = 0;
    var r = rng(77), flakes = [], bubbles = [];
    for (var i = 0; i < 150; i++) {
      flakes.push({
        x: r(), y: r(),                 // 0..1, scaled to the viewport on draw
        z: 0.35 + r() * 0.55,           // parallax depth: how much it moves with scroll
        s: r() < 0.12 ? 2 : 1,          // size in art pixels
        a: 0.16 + r() * 0.3,            // base opacity
        vy: 0.8 + r() * 2.2,            // sinking speed, art px per second
        ph: r() * 6.28
      });
    }

    function layout() {
      S = parseFloat(cssVar("--art-px")) || 4;
      W = Math.ceil(window.innerWidth / S);
      H = Math.ceil(window.innerHeight / S);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = W * S + "px";
      canvas.style.height = H * S + "px";
      // the reading column, from the first section's content box
      var inner = $(".zone__inner", topSec), cs = getComputedStyle(inner), rc = inner.getBoundingClientRect();
      colL = (rc.left + parseFloat(cs.paddingLeft)) / S;
      colR = (rc.right - parseFloat(cs.paddingRight)) / S;
    }

    function columnFade(x) {
      var ramp = 6, inside = 0.32;
      if (x < colL - ramp || x > colR + ramp) return 1;
      if (x < colL) return 1 - (1 - inside) * (x - (colL - ramp)) / ramp;
      if (x > colR) return inside + (1 - inside) * (x - colR) / ramp;
      return inside;
    }

    var t = 0, last = 0, rafId = 0, running = false, bubbleTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var top = topSec.getBoundingClientRect().top / S;
      var bottom = endSec.getBoundingClientRect().top / S;
      var y0 = Math.max(0, Math.floor(top)), y1 = Math.min(H, Math.ceil(bottom));
      if (y1 <= y0) return;

      // denser the deeper you are between About and Contact
      var span = Math.max(1, bottom - top - H);
      var depth = Math.max(0, Math.min(1, -top / span));
      var count = Math.round(flakes.length * (0.35 + 0.65 * depth));
      var scroll = window.scrollY / S, wrap = H + 20;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, y0, W, y1 - y0);
      ctx.clip();
      ctx.fillStyle = snowColor;
      for (var i = 0; i < count; i++) {
        var f = flakes[i];
        var sy = ((f.y * wrap + t * f.vy - scroll * f.z) % wrap + wrap) % wrap - 10;
        var sx = Math.round(f.x * W + Math.sin(t * 0.35 + f.ph) * 1.5);
        ctx.globalAlpha = f.a * columnFade(sx);
        ctx.fillRect(sx, Math.round(sy), f.s, f.s);
      }
      ctx.fillStyle = bubbleColor;
      for (var b = 0; b < bubbles.length; b++) {
        var bb = bubbles[b], bx = Math.round(bb.x + Math.sin(t * 2 + bb.ph) * 0.8), by = Math.round(bb.y);
        ctx.globalAlpha = 0.5 * columnFade(bx);
        if (bb.r === 1) {
          ctx.fillRect(bx, by, 1, 1);
        } else {
          ctx.fillRect(bx + 1, by, 1, 1); ctx.fillRect(bx, by + 1, 1, 1);
          ctx.fillRect(bx + 2, by + 1, 1, 1); ctx.fillRect(bx + 1, by + 2, 1, 1);
        }
      }
      ctx.restore();
    }

    function update(dt) {
      bubbleTimer -= dt;
      if (bubbleTimer <= 0 && bubbles.length < 8) {
        // bubbles rise in the side margins (or near the screen edges on phones)
        var left = colL - 4 > 6, side = Math.random() < 0.5;
        var x = left
          ? (side ? 2 + Math.random() * (colL - 8) : colR + 4 + Math.random() * (W - colR - 8))
          : (side ? 1 + Math.random() * 3 : W - 4 - Math.random() * 3);
        bubbles.push({ x: x, y: H + 2, vy: 7 + Math.random() * 7, r: Math.random() < 0.6 ? 1 : 2, ph: Math.random() * 6.28 });
        bubbleTimer = 0.9 + Math.random() * 1.6;
      }
      for (var i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].y -= bubbles[i].vy * dt;
        if (bubbles[i].y < -4) bubbles.splice(i, 1);
      }
    }

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
      if (running || document.hidden) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, W, H);
    }

    layout();
    // run only while some middle section is on screen
    var visible = new Set();
    var zones = $$("main > .zone");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      visible.size ? start() : stop();
    });
    zones.forEach(function (z) { io.observe(z); });
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : (visible.size && start());
    });
    if (reduceMQ.addEventListener) {
      reduceMQ.addEventListener("change", function () {
        if (reduceMQ.matches) { stop(); io.disconnect(); canvas.remove(); }
      });
    }
    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  }

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  renderContent();
  depthMeter();
  lazyVideos();
  copyEmail();
  photoReveal();

  var heroScene = null;
  [["hero", ".hero"], ["seabed", ".seabed"]].forEach(function (s) {
    var section = $(s[1]);
    if (!section) return;
    try {
      var sc = Scene(section, SCENES[s[0]]);
      if (s[0] === "hero") heroScene = sc;
    } catch (err) {
      if (window.console) console.error(err);
    }
  });
  buildName(heroScene ? heroScene.artPx() : 4);
  marineSnow();
})();
