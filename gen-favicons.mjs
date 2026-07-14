import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync } from 'fs';

const SRC = 'images/logo.png';

// Crop just the circle+drop mark — start right of where the pipeline line ends,
// stop above the FILTRATION text baseline. Exact values tuned from 1772x888 source.
const cropLeft = 1460;
const cropTop  = 30;
const cropWidth  = 1772 - 1460; // 312
const cropHeight = 800;          // avoids FILTRATION text row at bottom

const croppedBuf = await sharp(SRC)
  .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
  .png()
  .toBuffer();

// Trim near-white whitespace to isolate the mark tightly
const trimmedBuf = await sharp(croppedBuf)
  .trim({ background: '#ffffff', threshold: 15 })
  .png()
  .toBuffer();

const meta = await sharp(trimmedBuf).metadata();
console.log('Trimmed mark size:', meta.width, 'x', meta.height);

// Mark on white square with padding
async function markOnWhite(targetSize, paddingFraction) {
  const pad = Math.round(targetSize * paddingFraction);
  const markSize = targetSize - pad * 2;
  const markBuf = await sharp(trimmedBuf)
    .resize(markSize, markSize, { fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer();
  return sharp({
    create: { width: targetSize, height: targetSize, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([{ input: markBuf, top: pad, left: pad }])
    .png()
    .toBuffer();
}

const atiBuf = await markOnWhite(180, 0.12);
writeFileSync('images/apple-touch-icon.png', atiBuf);
console.log('apple-touch-icon.png done');

const f32Buf = await markOnWhite(32, 0.10);
writeFileSync('images/favicon-32x32.png', f32Buf);
console.log('favicon-32x32.png done');

const f16Buf = await markOnWhite(16, 0.10);
writeFileSync('images/favicon-16x16.png', f16Buf);
console.log('favicon-16x16.png done');

const icoBuf = await toIco([f32Buf]);
writeFileSync('favicon.ico', icoBuf);
console.log('favicon.ico done');

console.log('All favicons generated.');
