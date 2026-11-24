// Generates small redirect pages so links to the old Wix website keep working,
// e.g. freedomworshipcenterwue.de/de/about  ->  /about.html
// Run with: node scripts/make-redirects.mjs   (then commit the generated folders)
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// old Wix page slug -> new page (relative to the site root)
const MAP = {
  "": "index.html",
  about: "about.html",
  leadership: "about.html#team",
  ministries: "ministries.html",
  "worship-ministry": "ministries.html#worship",
  "healing-ministry-1": "ministries.html#healing",
  "soulwinning-ministry": "ministries.html#more",
  "outreach-ministry": "ministries.html#more",
  "chosen-generation": "ministries.html#youth",
  "children-ministry": "ministries.html#kids",
  "kopie-von-worship-ministry": "ministries.html#family",
  "kopie-von-family-ministry": "ministries.html#family",
  "mission-ministry": "about.html#missions",
  "martin-espiritu-ministries": "about.html#missions",
  "kingdom-empowerment-uganda-e-v": "about.html#missions",
  "lighthose-global-mission": "about.html#missions",
  "running-for-hope": "about.html#missions",
  "carriers-of-the-flame-e-v": "about.html#missions",
  "church-schedule": "visit.html",
  "location-contact": "contact.html",
  pictures: "index.html#gallery",
  "impressum-datenschutz": "impressum.html",
  "event-list": "events.html",
  groups: "index.html",
  members: "index.html"
};

// Pages whose slug already matches a new file (e.g. /about -> about.html) need no root folder.
const SERVED_BY_FILE = new Set(["about", "ministries"]);

function page(target, depth) {
  const url = "../".repeat(depth) + target;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Weiterleitung – Freedom Worship Center</title>
<meta http-equiv="refresh" content="0; url=${url}">
<link rel="canonical" href="${url}">
<script>location.replace(${JSON.stringify(url)});</script>
</head>
<body style="font-family:system-ui,sans-serif;padding:40px;text-align:center">
<p>Diese Seite ist umgezogen. · This page has moved.</p>
<p><a href="${url}">Weiter · Continue</a></p>
</body>
</html>
`;
}

let count = 0;
function write(dir, target, depth) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(target, depth));
  count++;
}

for (const [slug, target] of Object.entries(MAP)) {
  // German pages lived under /de/...
  write(join("de", slug), target, slug ? 2 : 1);
  // English pages lived at the root (/leadership, /church-schedule, ...)
  if (slug && !SERVED_BY_FILE.has(slug)) write(slug, target, 1);
}
console.log(`Wrote ${count} redirect pages.`);
