import {chromium} from 'playwright';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:4173',out='../release-evidence/share';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const report={base,checkedAt:new Date().toISOString(),checks:[],limitations:['Preview display is controlled by the recipient messaging app; physical iPhone Messages was not tested.']};
try{
const context=await browser.newContext({javaScriptEnabled:false,userAgent:'facebookexternalhit/1.1'});
for(const route of ['/','/card/','/business-card/']){
 const response=await context.request.get(base+route);assert.equal(response.status(),200);const html=await response.text();assert.ok(Buffer.byteLength(html)<1e6);
 for(const tag of ['og:title','og:description','og:url','og:type','og:image','og:image:width','og:image:height','og:image:alt','twitter:card'])assert.ok(html.includes('"'+tag+'"'),tag);
 assert.match(html,/business-card-preview-v1.png/);report.checks.push({name:'static crawler metadata '+route,passed:true});
}
const asset=await context.request.get(base+'/assets/business-card-preview-v1.png');assert.equal(asset.status(),200);assert.match(asset.headers()['content-type'],/image\/png/);const data=await asset.body();const png=PNG.sync.read(data);assert.equal(png.width,1200);assert.equal(png.height,680);assert.ok(data.length<1e6);report.checks.push({name:'anonymous PNG 1200x680 under 1MB',bytes:data.length,passed:true});await context.close();
const page=await browser.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/business-card/');
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);if(width===390||width===1440)await page.screenshot({path:out+'/business-card-'+width+'.png',fullPage:true});}report.checks.push({name:'mobile/tablet/desktop layout',passed:true});
await page.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.shareData=data;}}));await page.locator('#share-card').click();assert.equal((await page.evaluate(()=>window.shareData)).url,base+'/business-card/');assert.match((await page.evaluate(()=>window.shareData)).text,/business card/);report.checks.push({name:'Share card uses fresh business-card link',passed:true});
await page.locator('#show-qr').click();assert.equal(await page.locator('#qr-dialog').evaluate(e=>e.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#qr-dialog').evaluate(e=>e.open),false);assert.equal(await page.locator('a.save-contact').getAttribute('href'),'/assets/airradius.vcf');assert.deepEqual(errors,[]);report.checks.push({name:'QR dialog/contact link/no browser errors',passed:true});
}finally{await browser.close();await fs.writeFile(out+'/verification.json',JSON.stringify(report,null,2));}console.log(JSON.stringify(report));
