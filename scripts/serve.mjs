// Tiny zero-dependency static server for local preview: `npm start` → http://localhost:5173
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".mp4": "video/mp4", ".ico": "image/x-icon", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml"
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = normalize(join(root, path));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, "index.html");
    const body = await readFile(file).catch(() => null);
    if (!body) {
      res.writeHead(404, { "Content-Type": types[".html"] }).end(await readFile(join(root, "404.html")).catch(() => "Not found"));
      return;
    }
    res.writeHead(200, { "Content-Type": types[extname(file).toLowerCase()] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(500).end();
  }
}).listen(port, () => console.log(`Serving on http://localhost:${port}`));
