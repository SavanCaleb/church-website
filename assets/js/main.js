/* ==========================================================================
   Freedom Worship Center Würzburg — site script
   - renders the shared header, mobile menu and footer
   - German/English switch (German lives in the HTML, English in i18n-en.js)
   - fills church details (config.js), sermons (sermons.js), events (events.js)
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var EN = window.I18N_EN || {};
  document.documentElement.classList.remove("no-js");

  /* ---------- Language ---------- */
  var LANG_KEY = "fwc-lang";
  function readLang() {
    try { var l = localStorage.getItem(LANG_KEY); if (l === "en" || l === "de") return l; } catch (e) {}
    return "de";
  }
  function saveLang(l) { try { localStorage.setItem(LANG_KEY, l); } catch (e) {} }
  var lang = readLang();
  function tr(de, en) { return lang === "en" ? en : de; }
  function pick(obj) { return obj && typeof obj === "object" ? (obj[lang] || obj.de) : obj; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function tel(p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); }

  /* ---------- Navigation ---------- */
  var NAV = [
    { href: "index.html", de: "Start", en: "Home" },
    { href: "about.html", de: "Über uns", en: "About" },
    { href: "visit.html", de: "Besuch planen", en: "Plan a Visit" },
    { href: "watch.html", de: "Predigten", en: "Sermons" },
    { href: "ministries.html", de: "Dienste", en: "Ministries" },
    { href: "events.html", de: "Events", en: "Events" },
    { href: "give.html", de: "Spenden", en: "Give" },
    { href: "contact.html", de: "Kontakt", en: "Contact" }
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  var ICONS = {
    yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8v3.6h2.6V22H14v-9.9h2.7l.4-3.6H14Z"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.3v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
  };
  window.FWC_ICONS = ICONS;

  function navLinks(items) {
    return items.map(function (n) {
      var cur = n.href === here ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + cur + ">" + tr(n.de, n.en) + "</a></li>";
    }).join("");
  }
  function socialLinks() {
    var out = "";
    if (S.youtubeUrl) out += '<a href="' + S.youtubeUrl + '" target="_blank" rel="noopener" aria-label="YouTube">' + ICONS.yt + "</a>";
    if (S.instagramUrl) out += '<a href="' + S.instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + "</a>";
    if (S.facebookUrl) out += '<a href="' + S.facebookUrl + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + "</a>";
    if (S.tiktokUrl) out += '<a href="' + S.tiktokUrl + '" target="_blank" rel="noopener" aria-label="TikTok">' + ICONS.tt + "</a>";
    return out;
  }
  function contactLines() {
    var out = esc(S.street) + "<br>" + esc(S.zip) + " " + esc(S.town);
    if (S.phone) out += '<br><a href="' + tel(S.phone) + '">' + esc(S.phone) + "</a>";
    if (S.email) out += '<br><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>";
    return out;
  }

  var QI = {
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z" fill="currentColor"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2 1-4 3-4.5 2 .5 3 2.5 3 4.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  };
  var QUICK = [
    { href: "watch.html", icon: "play", de: "Predigten", en: "Sermons" },
    { href: "visit.html", icon: "pin", de: "Besuch", en: "Visit" },
    { href: "about.html", icon: "info", de: "Über uns", en: "About" },
    { href: "ministries.html", icon: "people", de: "Dienste", en: "Ministries" },
    { href: "give.html", icon: "heart", de: "Spenden", en: "Give" },
    { href: "events.html", icon: "cal", de: "Events", en: "Events" },
    { href: "contact.html", icon: "chat", de: "Kontakt", en: "Contact" }
  ];

  function brandHtml() {
    return '<img src="assets/img/logo-mark.png" width="300" height="300" alt="">' +
      '<span class="brand-text">Freedom<small>Worship Center</small></span>';
  }

  function renderAnnouncement() {
    var A = S.announcement;
    var old = document.getElementById("announce");
    if (!A || !A.title) { if (old) old.remove(); return; }
    var key = "fwc-announce-" + pick(A.title);
    try { if (localStorage.getItem(key) === "closed") { if (old) old.remove(); return; } } catch (e) {}
    var bar = old || document.createElement("div");
    bar.id = "announce";
    bar.className = "announce";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", tr("Hinweis", "Announcement"));
    bar.innerHTML = '<div class="container"><div class="text"><strong>' + esc(pick(A.title)) + "</strong>" + (A.text ? "<span class=\"sub\">" + esc(pick(A.text)) + "</span>" : "") + "</div>" +
      (A.link ? '<a class="btn" href="' + esc(A.link) + '"' + (/^https?:/.test(A.link) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(pick(A.button)) + "</a>" : "") +
      '<button class="close" type="button" aria-label="' + tr("Hinweis schließen", "Close announcement") + '">×</button></div>';
    if (!old) { var header = document.getElementById("site-header"); header.parentNode.insertBefore(bar, header); }
    bar.querySelector(".close").addEventListener("click", function () {
      try { localStorage.setItem(key, "closed"); } catch (e) {}
      bar.remove();
    });
  }

  function renderChrome() {
    renderAnnouncement();
    var header = document.getElementById("site-header");
    var live = S.youtubeLiveUrl || S.youtubeUrl;
    if (header) {
      header.innerHTML =
        '<div class="container header-inner">' +
          '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-overlay" aria-label="' + tr("Menü öffnen", "Open menu") + '"><span></span></button>' +
          '<a class="brand" href="index.html" aria-label="Freedom Worship Center – ' + tr("Startseite", "Home") + '">' + brandHtml() + "</a>" +
          '<nav class="main-nav" aria-label="' + tr("Hauptnavigation", "Main navigation") + '"><ul>' +
            navLinks(NAV.filter(function (n) { return n.href !== "index.html" && n.href !== "give.html"; })) + "</ul></nav>" +
          '<div class="header-actions">' +
            '<div class="lang-toggle" role="group" aria-label="' + tr("Sprache", "Language") + '">' +
              '<button type="button" data-lang="de" aria-pressed="' + (lang === "de") + '">DE</button>' +
              '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
            "</div>" +
            '<a class="btn btn-primary btn-sm header-cta" href="give.html">' + tr("Spenden", "Give") + "</a>" +
            '<a class="btn btn-red btn-sm header-cta" href="' + live + '" target="_blank" rel="noopener">' + ICONS.play + "Live</a>" +
          "</div>" +
        "</div>" +
        '<nav class="quicknav" aria-label="' + tr("Schnellzugriff", "Quick links") + '"><ul>' +
          QUICK.map(function (q) {
            return '<li><a href="' + q.href + '"' + (q.href === here ? ' aria-current="page"' : "") + ">" + QI[q.icon] + "<span>" + tr(q.de, q.en) + "</span></a></li>";
          }).join("") +
        "</ul></nav>";
    }

    var overlay = document.getElementById("menu-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "menu-overlay";
      overlay.className = "menu-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }
    overlay.innerHTML =
      '<div class="menu-backdrop" data-close></div>' +
      '<div class="menu-panel" role="dialog" aria-modal="true" aria-label="' + tr("Menü", "Menu") + '">' +
        '<div class="menu-head"><a class="brand" href="index.html">' + brandHtml() + '</a><button class="menu-close" type="button" data-close aria-label="' + tr("Menü schließen", "Close menu") + '">×</button></div>' +
        '<nav><ol>' + navLinks(NAV) + "</ol></nav>" +
        '<div class="menu-foot">' +
          '<a class="btn btn-red" href="' + live + '" target="_blank" rel="noopener">' + ICONS.play + tr("Live ansehen", "Watch live") + "</a>" +
          "<div>" + contactLines() + "</div>" +
          '<div class="socials">' + socialLinks() + "</div>" +
        "</div>" +
      "</div>";
    overlay.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", function () { setMenu(false); }); });

    var footer = document.getElementById("site-footer");
    if (footer) {
      var times = (S.services || []).map(function (s) {
        return "<li>" + pick(s.day) + " " + s.time + " · " + pick(s.title) + "</li>";
      }).join("");
      footer.innerHTML =
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div><a class="footer-brand" href="index.html">' + brandHtml().replace('alt=""', 'alt="Freedom Worship Center"') + "</a>" +
              "<p>" + contactLines() + "</p>" +
              '<div class="socials">' + socialLinks() + "</div></div>" +
            "<div><h4>" + tr("Termine", "Schedule") + "</h4><ul>" + times + "</ul></div>" +
            "<div><h4>" + tr("Entdecken", "Explore") + "</h4><ul>" + navLinks(NAV.slice(1, 5)) + "</ul></div>" +
            "<div><h4>" + tr("Mitmachen", "Get involved") + "</h4><ul>" + navLinks(NAV.slice(5)) + "</ul></div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>© " + new Date().getFullYear() + " " + esc(S.name) + " " + esc(S.city) + " · Where Freedom Reigns</span>" +
            '<span><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">' + tr("Datenschutz", "Privacy") + "</a></span>" +
          "</div>" +
        "</div>";
    }

    var btn = document.querySelector(".menu-btn");
    if (btn) btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  function setMenu(open) {
    var btn = document.querySelector(".menu-btn");
    var overlay = document.getElementById("menu-overlay");
    document.body.classList.toggle("menu-open", open);
    if (btn) {
      btn.setAttribute("aria-expanded", String(open));
      if (!open) btn.focus({ preventScroll: true });
    }
    if (overlay) {
      overlay.setAttribute("aria-hidden", String(!open));
      if (open) { var c = overlay.querySelector(".menu-close"); if (c) c.focus(); }
    }
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false); });

  /* ---------- Home hero slideshow ---------- */
  function initHeroSlides() {
    var wrap = document.querySelector(".hero-slides");
    if (!wrap) return;
    var imgs = wrap.querySelectorAll("img");
    var dots = document.querySelector(".hero-dots");
    if (imgs.length < 2) { if (imgs[0]) imgs[0].classList.add("is-active"); return; }
    var i = 0, timer;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (dots) {
      dots.innerHTML = Array.prototype.map.call(imgs, function (_, n) {
        return '<button type="button" aria-label="' + tr("Bild ", "Slide ") + (n + 1) + '"' + (n === 0 ? ' aria-current="true"' : "") + "></button>";
      }).join("");
      dots.querySelectorAll("button").forEach(function (b, n) { b.addEventListener("click", function () { show(n); restart(); }); });
    }
    function show(n) {
      imgs[i].classList.remove("is-active");
      i = (n + imgs.length) % imgs.length;
      imgs[i].classList.add("is-active");
      if (dots) dots.querySelectorAll("button").forEach(function (b, k) { b.setAttribute("aria-current", String(k === i)); });
    }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { show(i + 1); }, 6500); }
    imgs[0].classList.add("is-active");
    restart();
    document.addEventListener("visibilitychange", function () { if (document.hidden) clearInterval(timer); else restart(); });
  }

  /* ---------- Carousels ---------- */
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
      var track = root.querySelector(".carousel-track");
      var prev = root.querySelector("[data-prev]"), next = root.querySelector("[data-next]");
      var dotsEl = root.querySelector(".carousel-dots");
      if (!track) return;
      function step() { var c = track.children[0]; return c ? c.getBoundingClientRect().width + 16 : 300; }
      if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
      function update() {
        var max = track.scrollWidth - track.clientWidth - 2;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max;
        if (dotsEl) {
          var n = track.children.length, idx = Math.round(track.scrollLeft / step());
          if (dotsEl.children.length !== n) dotsEl.innerHTML = new Array(n + 1).join("<span></span>");
          Array.prototype.forEach.call(dotsEl.children, function (d, k) { d.classList.toggle("on", k === Math.min(idx, n - 1)); });
        }
      }
      track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  /* ---------- Page translations ---------- */
  var originals = new Map();
  function applyPageLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = lang === "en" && EN[key] != null ? EN[key] : originals.get(el);
    });
    if (!document.body.dataset.titleDe) document.body.dataset.titleDe = document.title;
    var titleEn = document.body.getAttribute("data-title-en");
    document.title = lang === "en" && titleEn ? titleEn : document.body.dataset.titleDe;
  }

  function setLang(l) {
    lang = l === "en" ? "en" : "de";
    saveLang(lang);
    renderChrome();
    applyPageLang();
    fillDynamic();
  }

  /* ---------- Sermons ---------- */
  function fmtDate(iso) {
    var p = iso.split("-");
    return new Date(+p[0], p[1] - 1, +p[2]).toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", { day: "numeric", month: "long", year: "numeric" });
  }
  function ytUrl(id) { return "https://www.youtube.com/watch?v=" + id; }
  // maxresdefault is widescreen without black bars; mqdefault (also 16:9) is the fallback when a video has no HD thumbnail
  function ytThumb(id, hi) { return "https://i.ytimg.com/vi/" + id + "/" + (hi ? "maxresdefault" : "mqdefault") + ".jpg"; }

  function renderSermons() {
    var list = window.SERMONS || [];
    document.querySelectorAll("[data-sermons]").forEach(function (el) {
      var skip = +(el.getAttribute("data-skip") || 0);
      var limit = +(el.getAttribute("data-sermons") || list.length);
      el.innerHTML = list.slice(skip, skip + limit).map(function (s) {
        return '<a class="sermon" href="' + ytUrl(s.id) + '" target="_blank" rel="noopener">' +
          '<div class="thumb"><img src="' + ytThumb(s.id, true) + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'' + ytThumb(s.id) + '\'"><span class="play-badge">' + ICONS.play + "</span></div>" +
          '<div class="body"><span class="meta">' + fmtDate(s.date) + "</span><h3>" + esc(s.title) + '</h3><span class="speaker">' + esc(s.speaker) + "</span></div></a>";
      }).join("");
    });
    document.querySelectorAll("[data-feature]").forEach(function (el) {
      var s = list[0];
      if (!s) { el.hidden = true; return; }
      el.innerHTML =
        '<a class="feature-media" href="' + ytUrl(s.id) + '" target="_blank" rel="noopener" aria-label="' + esc(s.title) + '">' +
          '<img src="' + ytThumb(s.id, true) + '" alt="" onerror="this.onerror=null;this.src=\'' + ytThumb(s.id) + '\'">' +
          '<span class="play-badge">' + ICONS.play + "</span></a>" +
        '<div class="feature-body"><div><div class="meta">' + tr("Neueste Predigt", "Latest message") + " · " + fmtDate(s.date) + "</div>" +
          "<h3>" + esc(s.title) + '</h3><span class="speaker">' + esc(s.speaker) + "</span></div>" +
          '<a class="link-arrow" href="watch.html">' + tr("Alle", "All") + "</a></div>";
    });
  }

  /* ---------- Events ---------- */
  function renderEvents() {
    var list = document.querySelector("[data-events]");
    if (!list) return;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var months = lang === "en"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    var upcoming = (window.EVENTS || [])
      .map(function (ev) { var p = ev.date.split("-"); return { ev: ev, d: new Date(+p[0], p[1] - 1, +p[2]) }; })
      .filter(function (x) { return x.d >= today; })
      .sort(function (a, b) { return a.d - b.d; });
    var empty = document.querySelector("[data-events-empty]");
    if (empty) empty.hidden = upcoming.length > 0;
    list.hidden = upcoming.length === 0;
    list.innerHTML = upcoming.map(function (x) {
      var ev = x.ev;
      var weekday = x.d.toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", { weekday: "long" });
      var btn = ev.link
        ? '<a class="btn btn-ghost" href="' + esc(ev.link) + '" target="_blank" rel="noopener">' + tr("Anmelden", "Register") + "</a>"
        : '<a class="btn btn-ghost" href="contact.html">' + tr("Infos", "Info") + "</a>";
      return '<article class="event">' +
        '<div class="event-date"><span class="d">' + x.d.getDate() + '</span><span class="m">' + months[x.d.getMonth()] + "</span></div>" +
        "<div>" + (ev.tag ? '<span class="tag">' + esc(pick(ev.tag)) + "</span>" : "") +
          "<h3>" + esc(pick(ev.title)) + "</h3>" +
          "<p><strong>" + weekday + (ev.time ? ", " + ev.time + tr(" Uhr", "") : "") + "</strong> · " + esc(pick(ev.text)) + "</p></div>" +
        btn + "</article>";
    }).join("");
  }

  /* ---------- Config-driven content ---------- */
  function fillDynamic() {
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var v = el.getAttribute("data-config").split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, S);
      if (v != null && v !== "") el.textContent = pick(v);
      var wrap = el.closest("[data-optional]");
      if (wrap) wrap.hidden = v == null || v === "";
    });
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var k = el.getAttribute("data-href");
      if (k === "email") el.href = "mailto:" + S.email;
      else if (k === "phone") el.href = tel(S.phone);
      else if (k === "maps") el.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery);
      else if (S[k]) el.href = S[k];
    });
    document.querySelectorAll("[data-address]").forEach(function (el) {
      el.innerHTML = esc(S.street) + "<br>" + esc(S.zip) + " " + esc(S.town);
    });

    document.querySelectorAll("[data-services]").forEach(function (el) {
      el.innerHTML = (S.services || []).map(function (s) {
        return '<div class="time"><div class="day">' + pick(s.day) + '</div><div class="hour">' + s.time +
          (s.end ? "<small>– " + s.end + "</small>" : "") + "</div><h3>" + pick(s.title) + "</h3><p>" + pick(s.note) + "</p></div>";
      }).join("");
    });

    document.querySelectorAll("[data-map]").forEach(function (el) {
      if (el.querySelector("iframe")) return;
      el.innerHTML = '<iframe title="' + tr("Karte", "Map") + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' +
        encodeURIComponent(S.mapsQuery) + '&output=embed"></iframe>';
    });

    document.querySelectorAll("[data-youtube]").forEach(function (el) {
      if (!S.youtubeChannelId || el.querySelector("iframe")) return;
      el.innerHTML = '<iframe title="YouTube – Freedom Worship Center" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ' +
        'src="https://www.youtube-nocookie.com/embed/videoseries?list=UU' + S.youtubeChannelId.slice(2) + '"></iframe>';
    });

    // Giving: show bank details only when they're filled in
    var g = S.give || {};
    document.querySelectorAll("[data-give-details]").forEach(function (el) { el.hidden = !g.iban; });
    document.querySelectorAll("[data-give-empty]").forEach(function (el) { el.hidden = !!g.iban; });
    document.querySelectorAll("[data-paypal]").forEach(function (el) { el.hidden = !g.paypalUrl; if (g.paypalUrl) el.href = g.paypalUrl; });

    // Contact form needs an email or a form endpoint to deliver messages
    var canSend = !!(S.formEndpoint || S.email);
    document.querySelectorAll("form[data-contact]").forEach(function (f) { f.hidden = !canSend; });
    document.querySelectorAll("[data-form-fallback]").forEach(function (el) { el.hidden = canSend; });

    renderSermons();
    renderEvents();
    updateCountdown();
  }

  /* ---------- Next service countdown ---------- */
  function updateCountdown() {
    var els = document.querySelectorAll("[data-countdown]");
    if (!els.length || !S.mainService) return;
    var m = S.mainService, now = new Date();
    var start = new Date(now);
    start.setHours(m.hour, m.minute, 0, 0);
    var add = (m.weekday - now.getDay() + 7) % 7;
    start.setDate(now.getDate() + add);
    var end = new Date(start.getTime() + m.durationMin * 60000);
    if (add === 0 && now >= end) start.setDate(start.getDate() + 7);
    var html;
    if (now >= start && now < end) {
      html = '<span class="live-dot"></span><a href="' + (S.youtubeLiveUrl || S.youtubeUrl) + '" target="_blank" rel="noopener"><strong>' + tr("Jetzt live – Gottesdienst läuft", "Live now – service in progress") + "</strong></a>";
    } else {
      var diff = start - now;
      var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, mi = Math.floor(diff / 6e4) % 60;
      html = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' +
        "<span>" + tr("Nächster Gottesdienst in ", "Next service in ") + "<strong>" +
        (d ? d + tr(" T ", "d ") : "") + h + tr(" Std ", "h ") + mi + " Min</strong></span>";
    }
    els.forEach(function (el) { el.innerHTML = html; });
  }
  setInterval(updateCountdown, 30000);

  /* ---------- Header shadow on scroll ---------- */
  function onScroll() {
    var h = document.querySelector(".site-header");
    if (h) h.classList.toggle("is-solid", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Copy buttons ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var src = document.querySelector(b.getAttribute("data-copy"));
    if (!src || !navigator.clipboard) return;
    navigator.clipboard.writeText(src.textContent.trim()).then(function () {
      var old = b.textContent; b.textContent = tr("Kopiert ✓", "Copied ✓");
      setTimeout(function () { b.textContent = old; }, 1600);
    });
  });

  /* ---------- Contact forms ---------- */
  function initForms() {
    var topic = new URLSearchParams(location.search).get("topic");
    var sel = document.querySelector("select[name=topic]");
    if (topic && sel && sel.querySelector('option[value="' + topic.replace(/[^a-z]/gi, "") + '"]')) sel.value = topic;

    document.querySelectorAll("form[data-contact]").forEach(function (form) {
      var status = form.querySelector(".form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        if (data.get("website")) return; // spam honeypot
        if (!S.formEndpoint) {
          var body = "";
          data.forEach(function (v, k) { if (k !== "website" && v) body += (k === "message" ? "\n" + v : k + ": " + v) + "\n"; });
          location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(tr("Nachricht über die Website", "Message from the website")) + "&body=" + encodeURIComponent(body);
          return;
        }
        if (status) status.textContent = tr("Wird gesendet…", "Sending…");
        fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error();
            form.reset();
            if (status) status.textContent = tr("Danke! Wir melden uns bald bei dir.", "Thank you! We'll be in touch soon.");
          })
          .catch(function () {
            if (status) status.textContent = tr("Das hat leider nicht geklappt. Bitte ruf uns an: ", "Something went wrong. Please call us: ") + S.phone;
          });
      });
    });
  }

  /* ---------- Boot ---------- */
  renderChrome();
  applyPageLang();
  fillDynamic();
  initReveal();
  initForms();
  initHeroSlides();
  initCarousels();
  onScroll();
})();
