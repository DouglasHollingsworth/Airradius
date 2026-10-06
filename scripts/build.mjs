import {mkdir,cp,readdir,stat,writeFile,rm,lstat} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), out=path.join(root,'dist');
if(path.dirname(path.resolve(out))!==path.resolve(root)||path.basename(out)!=='dist') throw Error('Unsafe build destination');
if((await lstat(out).catch(()=>null))?.isSymbolicLink()) throw Error('Build destination may not be a symlink');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
// Explicit public allowlist. Instructions, specs, source archives, credentials,
// tests and all private projects stay outside the published artifact.
const entries=['index.html','about','card','demo','start','css','js','assets','404.html','robots.txt','sitemap.xml','privacy.html','manifest.webmanifest'];
for(const name of entries) await cp(path.join(root,name),path.join(out,name),{recursive:true});
const files=[];
async function walk(dir){for(const name of await readdir(dir)){const p=path.join(dir,name);if((await stat(p)).isDirectory())await walk(p);else files.push(path.relative(out,p).replaceAll('\\','/'));}}
await walk(out); await writeFile(path.join(out,'public-manifest.json'),JSON.stringify({dataMode:'SIMULATED',files},null,2));
console.log(`Built ${files.length} public files; private source excluded.`);
