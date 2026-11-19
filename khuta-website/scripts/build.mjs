// Copies the static site into ./dist (zero dependencies) and verifies that
// every local file referenced from index.html, css and js exists.
import { cpSync, rmSync, mkdirSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const items = ['index.html', 'css', 'js', 'assets', 'favicon-32.png', 'apple-touch-icon.png', 'icon-512.png', 'robots.txt'];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const it of items) {
  const src = join(root, it);
  if (!existsSync(src)) throw new Error(`Missing required file: ${it}`);
  cpSync(src, join(dist, it), { recursive: true });
}

// Verify local references
const missing = [];
const check = (from, ref) => {
  if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(ref)) return;
  const clean = ref.split(/[?#]/)[0];
  const base = from.endsWith('.css') ? dirname(from) : dist;
  if (!existsSync(join(base, clean))) missing.push(`${from.replace(dist + '/', '')} -> ${ref}`);
};
const html = readFileSync(join(dist, 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) check(join(dist, 'index.html'), m[1]);
const css = readFileSync(join(dist, 'css/styles.css'), 'utf8');
for (const m of css.matchAll(/url\(([^)]+)\)/g)) check(join(dist, 'css/styles.css'), m[1].replace(/["']/g, ''));
const js = readFileSync(join(dist, 'js/app.js'), 'utf8');
for (const m of js.matchAll(/assets\/[a-z0-9\-/]+\.(?:svg|png|webp|woff2)/g)) check(join(dist, 'index.html'), m[0]);
if (missing.length) {
  console.error('Broken local references:\n' + missing.join('\n'));
  process.exit(1);
}

let n = 0, bytes = 0;
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : (n++, bytes += statSync(p).size); } })(dist);
console.log(`Build OK: ${n} files, ${(bytes / 1024).toFixed(0)} KB -> dist/`);
