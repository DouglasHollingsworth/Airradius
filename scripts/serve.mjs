import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'), port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.json':'application/json','.vcf':'text/vcard; charset=utf-8','.xml':'application/xml','.txt':'text/plain'};
const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; img-src 'self' data: blob:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",'Permissions-Policy':'camera=(), microphone=(), geolocation=()'};
export const server=http.createServer(async(req,res)=>{try{
 let route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,security);res.end();return;}
 if(/^\/(?:ceo|pilot|growth)(?:\/|\.|$)/i.test(route)||/(?:^|\/)(?:\.\.?|private|api|docs|specs|\.codex)(?:\/|\.|$)/i.test(route)) throw Error('denied');
 let file=path.resolve(root,'.'+route);if(!file.startsWith(root+path.sep)&&file!==root)throw Error('denied');
 if((await stat(file)).isDirectory())file=path.join(file,'index.html');
 const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream',...security});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8',...security});res.end(await readFile(path.join(root,'404.html')).catch(()=>Buffer.from('Not found')));}});
server.listen(port,'127.0.0.1',()=>console.log(`AirRadius http://127.0.0.1:${port}`));
