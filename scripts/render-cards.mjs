// Render the semantic card; no full-page mockup is used as a website.
import QRCode from 'qrcode';import {chromium} from 'playwright';import path from 'node:path';
const root=process.cwd(),base=process.env.BASE_URL||'http://127.0.0.1:4173';
await QRCode.toFile(path.join(root,'assets/site-qr.svg'),'https://airradius.vercel.app',{type:'svg',errorCorrectionLevel:'H',margin:4,color:{dark:'#020b14',light:'#ffffff'}});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:3});await page.goto(base+'/card/');await page.locator('.card-qr img').waitFor();await page.locator('.digital-card').screenshot({path:path.join(root,'assets/card-wide.png')});
await page.setViewportSize({width:422,height:1100});await page.locator('.digital-card').evaluate(e=>e.classList.add('export-portrait'));await page.locator('.digital-card').screenshot({path:path.join(root,'assets/card-portrait.png'),scale:'device'});await browser.close();console.log('Rendered wide and portrait cards; run browser QR decode checks afterward.');

