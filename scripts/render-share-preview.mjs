import fs from 'node:fs/promises';
import {chromium} from 'playwright';
const logo='data:image/svg+xml;base64,'+(await fs.readFile('assets/logo.svg')).toString('base64');
const drone='data:image/webp;base64,'+(await fs.readFile('assets/drone-sunset.webp')).toString('base64');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try {
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await page.setContent(`<!doctype html><html><head><style>
 *{box-sizing:border-box}body{margin:0;background:#03111f;color:#f4f9ff;font-family:Arial,Helvetica,sans-serif}.card{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(ellipse at 25% 100%,#0b3349,transparent 65%),#03111f}.art{position:absolute;right:0;top:0;width:490px;height:630px;object-fit:cover;object-position:60% center;opacity:.78}.shade{position:absolute;inset:0;background:linear-gradient(90deg,#03111f 12%,#03111ff5 46%,#03111f40 85%),linear-gradient(0deg,#03111f80,transparent 70%)}.ring{position:absolute;right:30px;top:100px;border:2px solid #00bfff65;border-radius:50%;width:380px;height:380px}.ring:before,.ring:after{content:'';position:absolute;border:1px solid #00bfff70;border-radius:50%;inset:44px}.ring:after{inset:90px}.top{position:absolute;top:44px;left:54px;display:flex;align-items:center;gap:20px}.top img{width:105px;height:105px}.brand{font-size:49px;font-weight:800;letter-spacing:2px}.brand span{color:#00bfff}.name{position:absolute;left:64px;top:216px}.name h1{font-size:66px;line-height:1.06;margin:0 0 23px;letter-spacing:-1.5px}.name p{font-size:31px;color:#a6e2fa;margin:0}.bottom{position:absolute;left:64px;bottom:46px;font-size:21px;color:#b9d0df;letter-spacing:1px}.accent{position:absolute;left:0;top:0;height:630px;width:7px;background:#00bfff}.rule{width:72px;height:4px;background:#00bfff;margin-bottom:20px}
 </style></head><body><article class="card"><img class="art" src="${drone}"><div class="shade"></div><div class="ring"></div><div class="accent"></div><div class="top"><img src="${logo}"><div class="brand">AIR<span>RADIUS</span></div></div><div class="name"><h1>Douglas<br>Hollingsworth</h1><p>Founder &amp; CEO</p></div><div class="bottom"><div class="rule"></div>Airspace Operations &amp; Incident Coordination</div></article></body></html>`);
 await page.evaluate(async()=>await Promise.all([...document.images].map(i=>i.decode())));
 await page.screenshot({path:'assets/business-card-preview-v1.png'});
 console.log('Rendered 1200 × 630 business-card preview.');
}finally{await browser.close();}
