import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const header = readFileSync(resolve(__dirname, 'user-script-header.txt'), 'utf8');

const result = await esbuild.build({
  entryPoints: [resolve(__dirname, 'src/index.js')],
  bundle: true,
  format: 'iife',
  target: 'es2018',
  write: false,
  legalComments: 'none',
});

const output = header + '\n' + result.outputFiles[0].text;
const outPath = resolve(__dirname, 'form-auto-fill.user.js');
writeFileSync(outPath, output, 'utf8');

const sizeKB = (output.length / 1024).toFixed(1);
console.log(`[build] 写入 ${outPath} (${sizeKB} KB)`);
