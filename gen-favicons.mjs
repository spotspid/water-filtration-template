import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync } from 'fs';

// Water-drop mark: bold single shape, fill #007BC1 on white rounded-square.
// ViewBox 100x100. Teardrop: tip at (50,15), semicircle center at (50,62) r=25.
// Shape height: 15 to 87 = 72px = ~72% of canvas.
// At 16px that is ~11.5px tall and ~8px wide — legible as a solid drop.

// Right side: control pts stay close to the tip's x-axis, then sweep out.
// Left side: mirror. Produces a pointed top, wide middle, rounded bottom.
const DROP_PATH = 'M50 15 C52 25 75 44 75 62 A25 25 0 0 1 25 62 C25 44 48 25 50 15Z';

// paddingPct expands the viewBox around the fixed 100x100 shape,
// adding white space without changing the path.
function makeSVG(paddingPct = 0) {
  const p = paddingPct * 100; // padding in viewBox units
  const vb = 100 + p * 2;
  const rx = vb * 0.18;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${vb}">
  <rect width="${vb}" height="${vb}" fill="#ffffff" rx="${rx.toFixed(1)}"/>
  <g transform="translate(${p},${p})">
    <path d="${DROP_PATH}" fill="#007BC1"/>
  </g>
</svg>`;
}

async function render(svgStr, size) {
  return sharp(Buffer.from(svgStr))
    .resize(size, size)
    .png()
    .toBuffer();
}

// favicon sizes: no extra padding (drop fills ~72% of canvas)
const f32 = await render(makeSVG(0), 32);
writeFileSync('images/favicon-32x32.png', f32);
console.log('favicon-32x32.png');

const f16 = await render(makeSVG(0), 16);
writeFileSync('images/favicon-16x16.png', f16);
console.log('favicon-16x16.png');

// apple-touch-icon: 8% extra padding each side for more breathing room
const ati = await render(makeSVG(0.08), 180);
writeFileSync('images/apple-touch-icon.png', ati);
console.log('apple-touch-icon.png');

// favicon.ico: bundle 32px PNG
const ico = await toIco([f32]);
writeFileSync('favicon.ico', ico);
console.log('favicon.ico');

console.log('Done.');
