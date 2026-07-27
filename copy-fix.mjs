import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const REPLACEMENTS = [
  // CTA with arrow first (must precede plain CTA to avoid double-hit)
  ['Get Your Free Water Test &rarr;', 'Get Your Free Water Assessment &rarr;'],
  // Plain CTA (nav bar, footer links, button text)
  ['Get Your Free Water Test', 'Get Your Free Water Assessment'],
  // water-assessment.html title — liberty
  ['Free Water Test | Liberty Water Systems', 'Free Water Assessment | Liberty Water Systems'],
  // water-assessment.html title — template placeholder
  ['Free Water Test | {{COMPANY_NAME}}', 'Free Water Assessment | {{COMPANY_NAME}}'],
  // meta description prose — liberty
  ['Get a free water test for your Greater Philadelphia and South Jersey home.', 'Get a free water assessment for your Greater Philadelphia and South Jersey home.'],
  // meta description prose — template placeholder
  ['Get a free water test for your {{SERVICE_AREA_LABEL}} home.', 'Get a free water assessment for your {{SERVICE_AREA_LABEL}} home.'],
  // benefit h4 body copy
  ['No in-home test required', 'No in-home visit required'],
  // footer prose
  ['test-first approach', 'assessment-first approach'],
  // credential gate: licensed heading
  ['<h2>Local, licensed, and accountable</h2>', '<h2>Local, professional, and accountable</h2>'],
  // credential gate: about body "We're insured,"
  ["We're insured, our equipment is NSF-certified, and you don't pay until the job is done and you're happy. No deposit to get started.", "Our equipment is NSF-certified, and you don't pay until the job is done and you're happy. No deposit to get started."],
  // credential gate: footer "insured work,"
  ["A professional installer, insured work, and you don't pay a dime until the job is done and you're happy.", "A professional installer, and you don't pay a dime until the job is done and you're happy."],
  // credential gate: footer tag
  ['NSF-certified equipment &middot; Insured', 'NSF-certified equipment'],
];

function collectHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      results.push(...collectHtml(full));
    } else if (entry.endsWith('.html') || entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

let totalFiles = 0;
let totalHits = 0;

for (const f of collectHtml('.')) {
  const original = readFileSync(f, 'utf8');
  let out = original.replace(/\r\n/g, '\n');
  let fileHits = 0;
  for (const [from, to] of REPLACEMENTS) {
    const count = out.split(from).length - 1;
    if (count > 0) {
      out = out.split(from).join(to);
      console.log(`  ${f}:  "${from}" → "${to}"  (${count}x)`);
      fileHits += count;
    }
  }
  if (fileHits > 0) {
    writeFileSync(f, out, 'utf8');
    totalFiles++;
    totalHits += fileHits;
  }
}
console.log(`\nDone: ${totalHits} replacements across ${totalFiles} files.`);
