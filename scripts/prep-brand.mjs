/**
 * One-shot pre-processor for the uploaded brand PNGs.
 *
 * The originals in public/brand/ are rendered on pure black (#000) with no
 * alpha. The page background is #0A0A0A, so dropping them straight in would
 * leave a faint visible seam. This script reads each source PNG and writes
 * a transparent variant (luma-driven alpha): pixels darker than `floor` go
 * fully transparent; brighter than `ceil` go fully opaque; in between, ramp.
 *
 * Run via:  node scripts/prep-brand.mjs
 *
 * Outputs (next to the originals):
 *   logo-lockup-transparent.png  + .webp
 *   monogram-transparent.png
 *   monogram@2x-transparent.png
 *
 * Idempotent — safe to re-run. Keeps the originals untouched so the source
 * is recoverable.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BRAND = path.resolve(__dirname, '..', 'public', 'brand');

/** luma floor / ceil for the alpha ramp (8-bit) */
const FLOOR = 6;
const CEIL = 28;

async function toTransparent(input, outBase) {
  const im = sharp(input).ensureAlpha();
  const { data, info } = await im.raw().toBuffer({ resolveWithObject: true });
  // RGBA, 4 channels per pixel
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    let alpha;
    if (luma <= FLOOR) alpha = 0;
    else if (luma >= CEIL) alpha = 255;
    else alpha = Math.round(((luma - FLOOR) / (CEIL - FLOOR)) * 255);
    data[i + 3] = alpha;
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

  await sharp(data, raw)
    .png({ compressionLevel: 9, palette: false })
    .toFile(`${outBase}.png`);

  await sharp(data, raw)
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(`${outBase}.webp`);

  console.log(`  ✓ ${path.basename(outBase)} (png + webp)`);
}

const jobs = [
  ['logo-lockup.png',   'logo-lockup-transparent'],
  ['monogram.png',      'monogram-transparent'],
  ['monogram@2x.png',   'monogram@2x-transparent'],
];

console.log('Preparing transparent brand variants...');
for (const [src, dst] of jobs) {
  await toTransparent(path.join(BRAND, src), path.join(BRAND, dst));
}
console.log('Done.');
