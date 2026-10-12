// Render the semantic card; no full-page mockup is used as a website.
import QRCode from 'qrcode';import {chromium} from 'playwright';import path from 'node:path';
const root=process.cwd(),base=process.env.BASE_URL||'http://127.0.0.1:4173';
await QRCode.toFile(path.join(root,'assets/site-qr.svg'),'https://airradius.kaij4u.chatgpt.site',{type:'svg',errorCorrectionLevel:'H',margin:4,color:{dark:'#020b14',light:'#ffffff'}});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
await QRCode.toFile(path.join(root,'assets/card-qr.svg'),'https://airradius.kaij4u.chatgpt.site/card/',{type:'svg',errorCorrectionLevel:'H',margin:4});
const page=await browser.newPage({viewport:{width:1200,height:1400},deviceScaleFactor:2});await page.goto(base+'/card/');await page.emulateMedia({reducedMotion:'reduce'});
await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));const panel=document.createElement('div');panel.style.cssText='display:flex;align-items:center;gap:20px;padding:24px;color:#eef8ff;background:#06111e';const qr=document.createElement('img');qr.src='/assets/card-qr.svg';qr.width=180;qr.height=180;qr.style.cssText='background:white;border-radius:8px';await qr.decode();const label=document.createElement('p');label.textContent='SCAN TO CONNECT · airradius.kaij4u.chatgpt.site/card/';label.style.cssText='font-size:15px;overflow-wrap:anywhere';panel.append(qr,label);document.querySelector('.connection-card').append(panel);});
await page.locator('.connection-card').screenshot({path:path.join(root,'assets/card-wide.png')});await page.setViewportSize({width:422,height:1600});await page.locator('.connection-card').screenshot({path:path.join(root,'assets/card-portrait.png')});await browser.close();console.log('Rendered current card exports; browser checks independently decode QR codes.');

