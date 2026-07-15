import sharp from 'sharp';
import { writeFileSync } from 'fs';

// Placeholder for equipment-tank.webp (formerly flagship-system.webp)
// Gradient uses template token source colors: navy #1C3651, teal #2C819B, sky #DFF7FC
// A subtle water-drop SVG centered on the gradient background.
// NOTE: gen-default-images.mjs supersedes this for the full default set.
const DROP_PATH = 'M50 15 C52 25 75 44 75 62 A25 25 0 0 1 25 62 C25 44 48 25 50 15Z';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480" width="600" height="480">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1C3651"/>
      <stop offset="60%" stop-color="#2C819B"/>
      <stop offset="100%" stop-color="#DFF7FC"/>
    </linearGradient>
    <linearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="600" height="480" fill="url(#bg)"/>
  <!-- Subtle drop icon centered -->
  <g transform="translate(225,140) scale(1.5)">
    <path d="${DROP_PATH}" fill="url(#drop)" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.35"/>
  </g>
  <!-- Placeholder label -->
  <text x="300" y="400" font-family="system-ui,sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.45" text-anchor="middle">Replace with flagship system photo</text>
</svg>`;

const buf = await sharp(Buffer.from(svg))
  .resize(600, 480)
  .webp({ quality: 82 })
  .toBuffer();

writeFileSync('images/equipment-tank.webp', buf);
console.log('images/equipment-tank.webp written (placeholder)');
