import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { runEastGateFixture } from '../js/east-gate-replay.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const specs = path.resolve(here, '../specs');
export { runEastGateFixture };

export async function loadEastGateFixture() {
  const [fixture, rules] = await Promise.all([
    readFile(path.join(specs, 'east-gate-ambiguity.fixture.json'), 'utf8').then(JSON.parse),
    readFile(path.join(specs, 'east-gate-ambiguity.rules.json'), 'utf8').then(JSON.parse),
  ]);
  return { fixture, rules };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { fixture, rules } = await loadEastGateFixture();
  process.stdout.write(`${JSON.stringify(runEastGateFixture(fixture, rules), null, 2)}\n`);
}
