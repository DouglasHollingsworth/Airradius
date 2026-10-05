import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const files=[];async function walk(dir){for(const n of await readdir(dir)){const p=path.join(dir,n);if((await stat(p)).isDirectory())await walk(p);else files.push(p);}}await walk('dist');
const forbidden=/(?:^|\/)(?:\.git|\.codex|\.env|docs|specs|references|ceo(?:\.|\/)|pilot(?:\.|\/)|owner(?:\.|\/)|private(?:\.|\/)|downloads)(?:\/|$)/i;
const secrets=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/,/\b(?:api[_-]?key|access[_-]?token|password)\s*[:=]\s*["'][^"']{12,}["']/i];
let bytes=0;for(const f of files){assert.ok(!forbidden.test(f),`Forbidden public path ${f}`);const b=await readFile(f);bytes+=b.length;if(/\.(?:js|html|css|json|txt|xml|svg|vcf)$/.test(f)){const s=b.toString();for(const r of secrets)assert.ok(!r.test(s),`Secret-like value in ${f}`);}}
const lock=JSON.parse(await readFile('package-lock.json'));const inventory=Object.entries(lock.packages).filter(([n])=>n).map(([n,p])=>({package:n.replace('node_modules/',''),version:p.version,license:p.license||'UNKNOWN',dev:p.dev===true}));
assert.ok(inventory.every(p=>p.license!=='UNKNOWN'),'Unresolved dependency license');
await writeFile('docs/DEPENDENCIES.json',JSON.stringify({runtimeDependencies:[],buildTestDependencies:inventory},null,2));
console.log(JSON.stringify({publicFiles:files.length,totalArtifactBytes:bytes,secretScan:'PASS',privatePathScan:'PASS',dependencies:inventory.length,licenses:'PASS',runtimeDependencies:0},null,2));
