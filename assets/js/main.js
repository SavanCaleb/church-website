/* ==========================================================================
   Freedom Worship Center Würzburg — site script
   - renders the shared header, menu and footer
   - German/English language switch (German is the text written in the HTML;
     English comes from assets/js/i18n-en.js)
   - fills church details from config.js
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

  /* ---------- Shared navigation ---------- */
  var NAV = [
    { href: "index.html", de: "Start", en: "Home" },
    { href: "about.html", de: "Über uns", en: "About" },
    { href: "visit.html", de: "Besuch planen", en: "Plan a Visit" },
    { href: "watch.html", de: "Predigten", en: "Watch" },
    { href: "ministries.html", de: "Gemeindeleben", en: "Ministries" },
    { href: "events.html", de: "Events", en: "Events" },
    { href: "give.html", de: "Spenden", en: "Give" },
    { href: "contact.html", de: "Kontakt", en: "Contact" }
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (here === "") here = "index.html";

  var ICONS = {
    yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8v3.6h2.6V22H14v-9.9h2.7l.4-3.6H14Z"/></svg>'
  };

  function renderChrome() {
    var links = NAV.map(function (n) {
      var cur = n.href === here ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + cur + ">" + tr(n.de, n.en) + "</a></li>";
    }).join("");
    var desktopLinks = NAV.filter(function (n) { return n.href !== "index.html" && n.href !== "give.html"; })
      .map(function (n) {
        var cur = n.href === here ? ' aria-current="page"' : "";
        return '<li><a href="' + n.href + '"' + cur + ">" + tr(n.de, n.en) + "</a></li>";
      }).join("");

    var header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<div class="container header-inner">' +
          '<a class="brand" href="index.html" aria-label="' + S.name + ' – ' + tr("Startseite", "Home") + '">' +
            '<span class="brand-mark" aria-hidden="true">✦</span>' +
            '<span class="brand-text">Freedom<small>Worship Center</small></span>' +
          "</a>" +
          '<nav class="main-nav" aria-label="' + tr("Hauptnavigation", "Main navigation") + '"><ul>' + desktopLinks + "</ul></nav>" +
          '<div class="header-actions">' +
            '<div class="lang-toggle" role="group" aria-label="' + tr("Sprache", "Language") + '">' +
              '<button type="button" data-lang="de" aria-pressed="' + (lang === "de") + '">DE</button>' +
              '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
            "</div>" +
            '<a class="btn btn-primary header-give" href="give.html">' + tr("Spenden", "Give") + "</a>" +
            '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-overlay" aria-label="' + tr("Menü öffnen", "Open menu") + '"><span></span></button>' +
          "</div>" +
        "</div>";
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
      '<nav aria-label="' + tr("Menü", "Menu") + '"><ol>' + links + "</ol></nav>" +
      '<div class="menu-foot">' +
        "<div>" + S.street + ", " + S.zip + " " + S.town + "<br>" + '<a href="mailto:' + S.email + '">' + S.email + "</a></div>" +
        '<div class="socials">' + socialLinks() + "</div>" +
      "</div>";

    var footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      var times = (S.services || []).map(function (s) {
        return "<li>" + pick(s.day) + " · " + s.time + " — " + pick(s.title) + "</li>";
      }).join("");
      footer.innerHTML =
        '<div class="container">' +
          '<div class="footer-big">' + tr("Du bist", "You are") + "<br><span>" + tr("willkommen.", "welcome.") + "</span></div>" +
          '<div class="footer-grid">' +
            "<div><h4>" + S.name + "</h4>" +
              '<p class="muted">' + S.street + "<br>" + S.zip + " " + S.town + "</p>" +
              '<p class="muted"><a href="mailto:' + S.email + '">' + S.email + '</a><br><a href="tel:' + S.phone.replace(/\s/g, "") + '">' + S.phone + "</a></p>" +
              '<div class="socials">' + socialLinks() + "</div></div>" +
            "<div><h4>" + tr("Gottesdienste", "Gatherings") + "</h4><ul class=\"muted\">" + times + "</ul></div>" +
            "<div><h4>" + tr("Entdecken", "Explore") + "</h4><ul>" +
              NAV.slice(1, 5).map(function (n) { return '<li><a href="' + n.href + '">' + tr(n.de, n.en) + "</a></li>"; }).join("") +
            "</ul></div>" +
            "<div><h4>" + tr("Mitmachen", "Get involved") + "</h4><ul>" +
              NAV.slice(5).map(function (n) { return '<li><a href="' + n.href + '">' + tr(n.de, n.en) + "</a></li>"; }).join("") +
            "</ul></div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>© " + new Date().getFullYear() + " " + S.name + " " + S.city + "</span>" +
            '<span><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">' + tr("Datenschutz", "Privacy") + "</a></span>" +
          "</div>" +
        "</div>";
    }
    bindChrome();
  }

  function socialLinks() {
    var out = "";
    if (S.youtubeUrl) out += '<a href="' + S.youtubeUrl + '" target="_blank" rel="noopener" aria-label="YouTube">' + ICONS.yt + "</a>";
    if (S.instagramUrl) out += '<a href="' + S.instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + "</a>";
    if (S.facebookUrl) out += '<a href="' + S.facebookUrl + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + "</a>";
    return out;
  }

  function setMenu(open) {
    var btn = document.querySelector(".menu-btn");
    var overlay = document.getElementById("menu-overlay");
    document.body.classList.toggle("menu-open", open);
    if (btn) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? tr("Menü schließen", "Close menu") : tr("Menü öffnen", "Open menu"));
    }
    if (overlay) overlay.setAttribute("aria-hidden", String(!open));
  }

  function bindChrome() {
    var btn = document.querySelector(".menu-btn");
    if (btn) btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Page translations ---------- */
  var originals = new Map();
  function applyPageLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      if (lang === "en" && EN[key] != null) el.innerHTML = EN[key];
      else el.innerHTML = originals.get(el);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      if (!el.dataset.phDe) el.dataset.phDe = el.getAttribute("placeholder") || "";
      var k = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", lang === "en" && EN[k] ? EN[k] : el.dataset.phDe);
    });
    var titleKey = document.body.getAttribute("data-title-en");
    if (!document.body.dataset.titleDe) document.body.dataset.titleDe = document.title;
    document.title = lang === "en" && titleKey ? titleKey : document.body.dataset.titleDe;
  }

  function setLang(l) {
    lang = l === "en" ? "en" : "de";
    saveLang(lang);
    renderChrome();
    applyPageLang();
    fillDynamic();
  }

  /* ---------- Config-driven content ---------- */
  function fillDynamic() {
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var path = el.getAttribute("data-config").split(".");
      var v = path.reduce(function (o, k) { return o ? o[k] : undefined; }, S);
      if (v != null && v !== "") el.textContent = pick(v);
    });
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var k = el.getAttribute("data-href");
      if (k === "email") el.href = "mailto:" + S.email;
      else if (k === "phone") el.href = "tel:" + S.phone.replace(/\s/g, "");
      else if (k === "maps") el.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery);
      else if (S[k]) el.href = S[k];
    });
    document.querySelectorAll("[data-address]").forEach(function (el) {
      el.innerHTML = S.street + "<br>" + S.zip + " " + S.town;
    });

    // Service times panel
    document.querySelectorAll("[data-services]").forEach(function (el) {
      el.innerHTML = (S.services || []).map(function (s) {
        return '<div class="time"><div class="day">' + pick(s.day) + '</div><div class="hour">' + s.time +
          "</div><h3>" + pick(s.title) + "</h3><p>" + pick(s.note) + "</p></div>";
      }).join("");
    });

    // Map embed
    document.querySelectorAll("[data-map]").forEach(function (el) {
      if (el.querySelector("iframe")) return;
      el.innerHTML = '<iframe title="' + tr("Karte", "Map") + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' +
        encodeURIComponent(S.mapsQuery) + '&output=embed"></iframe>';
    });

    // YouTube latest uploads/live embed
    document.querySelectorAll("[data-youtube]").forEach(function (el) {
      if (!S.youtubeChannelId || el.querySelector("iframe")) return;
      var uploads = "UU" + S.youtubeChannelId.slice(2);
      el.innerHTML = '<iframe title="YouTube" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ' +
        'src="https://www.youtube-nocookie.com/embed/videoseries?list=' + uploads + '"></iframe>';
    });

    // PayPal button visibility
    document.querySelectorAll("[data-paypal]").forEach(function (el) {
      if (S.give && S.give.paypalUrl) { el.href = S.give.paypalUrl; el.hidden = false; } else { el.hidden = true; }
    });

    renderEvents();
    updateCountdown();
  }

  /* ---------- Events (from events.js) ---------- */
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
    list.innerHTML = upcoming.map(function (x) {
      var ev = x.ev;
      var weekday = x.d.toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", { weekday: "long" });
      var btn = ev.link
        ? '<a class="btn btn-ghost" href="' + ev.link + '" target="_blank" rel="noopener">' + tr("Anmelden", "Register") + "</a>"
        : '<a class="btn btn-ghost" href="contact.html">' + tr("Infos", "Info") + "</a>";
      return '<article class="event">' +
        '<div class="event-date"><span class="d">' + x.d.getDate() + '</span><span class="m">' + months[x.d.getMonth()] + "</span></div>" +
        "<div>" + (ev.tag ? '<span class="tag">' + pick(ev.tag) + "</span>" : "") +
          "<h3>" + pick(ev.title) + "</h3>" +
          '<p><strong>' + weekday + (ev.time ? ", " + ev.time + tr(" Uhr", "") : "") + "</strong> — " + pick(ev.text) + "</p></div>" +
        btn + "</article>";
    }).join("");
  }

  /* ---------- Next service countdown ---------- */
  function updateCountdown() {
    var el = document.querySelector("[data-countdown]");
    if (!el || !S.mainService) return;
    var m = S.mainService, now = new Date();
    var start = new Date(now);
    start.setHours(m.hour, m.minute, 0, 0);
    var add = (m.weekday - now.getDay() + 7) % 7;
    start.setDate(now.getDate() + add);
    var end = new Date(start.getTime() + m.durationMin * 60000);
    if (add === 0 && now >= end) start.setDate(start.getDate() + 7);
    if (now >= start && now < end) {
      el.innerHTML = '<span class="live-dot"></span><strong>' + tr("Jetzt live", "Live now") + "</strong>";
      return;
    }
    var diff = start - now;
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, mi = Math.floor(diff / 6e4) % 60;
    el.innerHTML = tr("Nächster Gottesdienst in ", "Next service in ") + "<strong>" +
      (d ? d + tr(" T ", "d ") : "") + h + tr(" Std ", "h ") + mi + " Min</strong>";
  }
  setInterval(updateCountdown, 30000);

  /* ---------- Header on scroll ---------- */
  function onScroll() {
    var h = document.querySelector(".site-header");
    if (h) h.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Copy buttons (giving details) ---------- */
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

  /* ---------- Contact form ---------- */
  function initForms() {
    // Preselect topic from ?topic=... (e.g. contact.html?topic=gebet)
    var topic = new URLSearchParams(location.search).get("topic");
    var sel = document.querySelector("select[name=topic]");
    if (topic && sel && sel.querySelector('option[value="' + topic.replace(/[^a-z]/gi, "") + '"]')) sel.value = topic;

    document.querySelectorAll("form[data-contact]").forEach(function (form) {
      var status = form.querySelector(".form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        if (data.get("website")) return; // honeypot
        if (!S.formEndpoint) {
          var body = "";
          data.forEach(function (v, k) { if (k !== "website" && v) body += (k === "message" ? "\n" + v : k + ": " + v) + "\n"; });
          location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(tr("Nachricht über die Website", "Message from the website")) +
            "&body=" + encodeURIComponent(body);
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
            if (status) status.textContent = tr("Das hat leider nicht geklappt. Bitte schreib uns direkt an ", "Something went wrong. Please email us at ") + S.email;
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
  onScroll();
})();
