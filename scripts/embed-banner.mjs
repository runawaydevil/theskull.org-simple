import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const inputPath = process.argv[2] || join(root, 'banner.png');

if (!existsSync(inputPath)) {
  console.error('Usage: node scripts/embed-banner.mjs <caminho-para-banner.png>');
  process.exit(1);
}

const b64 = readFileSync(inputPath).toString('base64');
writeFileSync(
  join(root, 'banner-data.js'),
  `window.__BANNER_PNG_DATA='data:image/png;base64,${b64}';\n`
);
console.log('Wrote banner-data.js from', inputPath);
