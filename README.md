# Freedom Worship Center Würzburg – Website

A fast, modern, bilingual (Deutsch / English) church website. Plain HTML, CSS and JavaScript:
no build step and no frameworks, so it can be hosted for free on GitHub Pages, Netlify or Cloudflare Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, service times, next steps, latest message, ministries, prayer request |
| `about.html` | Über uns: story, vision and values, beliefs, leadership team |
| `visit.html` | Besuch planen: times, address and map, what to expect, FAQ, "I'm coming" form |
| `watch.html` | Predigten: YouTube embed and sermon series |
| `ministries.html` | Gemeindeleben: kids, youth, life groups, other ministries, serving |
| `events.html` | Events: generated from `assets/js/events.js` (past events hide automatically) |
| `give.html` | Spenden: bank details with copy button, optional PayPal |
| `contact.html` | Kontakt: contact form, map, details |
| `impressum.html`, `datenschutz.html` | Legal pages (required in Germany) – **templates, fill in and have them checked** |

## Updating content (no coding needed)

1. **Church details** (address, email, phone, service times, social links, YouTube, bank details):
   edit `assets/js/config.js`. Everything marked `TODO` is a placeholder.
2. **Events**: edit `assets/js/events.js`.
3. **German text**: edit it directly in the `.html` files.
4. **English text**: edit `assets/js/i18n-en.js` (same key as the `data-i18n="…"` attribute in the HTML).
5. **Photos**: put images in `assets/img/` and replace the gradient placeholders – look for
   `<!-- <img src="assets/img/…"> -->` comments in the HTML. For a video background on the home page,
   add `assets/img/hero.mp4` and uncomment the `<video>` line in `index.html`.
6. **Colors and fonts**: change the variables at the top of `assets/css/styles.css`.

### Contact form
By default the form opens the visitor's email program. To receive messages directly,
create a free form at [formspree.io](https://formspree.io) and paste its endpoint into `formEndpoint` in `config.js`.

### YouTube
Paste your channel ID (starts with `UC…`, found in YouTube Studio → Settings → Channel → Advanced) into
`youtubeChannelId` in `config.js`. The site then shows your latest uploads automatically.

## Run locally

Requires [Node.js](https://nodejs.org):

```powershell
npm start
```

Then open http://localhost:5173.

## Publish on GitHub Pages (free)

1. Push this repository to GitHub.
2. In the repository: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. To use `freedomworshipcenterwue.de`: add the domain under **Settings → Pages → Custom domain**,
   then at your domain provider point the DNS to GitHub Pages
   (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   and a CNAME for `www` → `<your-github-username>.github.io`).
   Only switch the DNS once the new site is ready – this replaces the current Wix site.
