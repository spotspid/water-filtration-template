/**
 * gen-default-images.mjs
 * Generates / processes the full default image set for the water-filtration template.
 *
 * Stock sources (blue-line-water-filtration) are copied + re-compressed.
 * Slots with no stock source get an SVG-based labelled placeholder.
 *
 * Run from the template root:
 *   node gen-default-images.mjs
 *
 * Requires: sharp  (already in devDependencies)
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const BLUE_LINE = 'C:/Sites/blue-line-water-filtration/images';
const OUT = 'images';

// ── helpers ──────────────────────────────────────────────────────────────────

function labeledPlaceholder({ w, h, label, sublabel = '', bg1 = '#1B4F8C', bg2 = '#2E7DBE' }) {
  const subLine = sublabel
    ? `<text x="${w/2}" y="${h/2 + 30}" font-family="system-ui,sans-serif" font-size="${Math.round(w/40)}" fill="#ffffff" fill-opacity="0.5" text-anchor="middle">${sublabel}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <text x="${w/2}" y="${h/2}" font-family="system-ui,sans-serif" font-size="${Math.round(w/30)}" font-weight="600" fill="#ffffff" fill-opacity="0.7" text-anchor="middle" dominant-baseline="middle">${label}</text>
  ${subLine}
</svg>`;
}

async function fromStock(srcFile, outFile, resizeOpts, quality = 82) {
  if (!existsSync(srcFile)) {
    console.warn(`  WARN: source not found: ${srcFile} -- skipping ${outFile}`);
    return;
  }
  await sharp(srcFile)
    .resize(resizeOpts)
    .webp({ quality })
    .toFile(`${OUT}/${outFile}`);
  console.log(`  wrote ${OUT}/${outFile} (from stock)`);
}

async function fromSvg(svg, outFile, w, h, quality = 82) {
  const buf = await sharp(Buffer.from(svg))
    .resize(w, h)
    .webp({ quality })
    .toBuffer();
  writeFileSync(`${OUT}/${outFile}`, buf);
  console.log(`  wrote ${OUT}/${outFile} (placeholder)`);
}

// ── process each slot ─────────────────────────────────────────────────────────

console.log('Generating default image set...\n');

// hero-water.webp: 1920x480, sourced from blue-line hero-bg
await fromStock(
  `${BLUE_LINE}/hero-bg.webp`,
  'hero-water.webp',
  { width: 1920, height: 480, fit: 'cover', position: 'centre' },
  80
);

// equipment-tank.webp: 600x480, sourced from blue-line flagship-system
await fromStock(
  `${BLUE_LINE}/flagship-system.webp`,
  'equipment-tank.webp',
  { width: 600, height: 480, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } },
  84
);

// equipment-ro.webp: 600x480, SVG placeholder (no stock source yet)
await fromSvg(
  labeledPlaceholder({ w: 600, h: 480, label: 'RO System Photo', sublabel: 'Replace with under-sink RO unit photo', bg1: '#1B4F8C', bg2: '#2E7DBE' }),
  'equipment-ro.webp', 600, 480, 82
);

// lifestyle-kitchen.webp: 960x640, SVG placeholder
await fromSvg(
  labeledPlaceholder({ w: 960, h: 640, label: 'Kitchen Lifestyle', sublabel: 'Replace with kitchen faucet / clean water scene', bg1: '#1B4F8C', bg2: '#2E7DBE' }),
  'lifestyle-kitchen.webp', 960, 640, 82
);

// lifestyle-family.webp: 960x640, SVG placeholder
await fromSvg(
  labeledPlaceholder({ w: 960, h: 640, label: 'Family Lifestyle', sublabel: 'Replace with family drinking water scene', bg1: '#1B4F8C', bg2: '#2E7DBE' }),
  'lifestyle-family.webp', 960, 640, 82
);

// lifestyle-shower.webp: 960x640, SVG placeholder
await fromSvg(
  labeledPlaceholder({ w: 960, h: 640, label: 'Shower Lifestyle', sublabel: 'Replace with shower / bathroom water scene', bg1: '#1B4F8C', bg2: '#2E7DBE' }),
  'lifestyle-shower.webp', 960, 640, 82
);

// ro-stage-1 through ro-stage-4: faucet finish thumbnails (120px display height)
for (let i = 1; i <= 4; i++) {
  await fromStock(
    `${BLUE_LINE}/ro-stage-${i}.webp`,
    `ro-stage-${i}.webp`,
    { height: 240, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } },
    85
  );
}

console.log('\nDone. Per-client slots (logo.webp, logo-footer.webp, owner-headshot.webp) are not generated here -- supply at build time.');
