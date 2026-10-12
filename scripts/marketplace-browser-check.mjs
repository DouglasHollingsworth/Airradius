import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
const BASE=process.env.BASE_URL||'http://127.0.0.1:4173';
const OUT=process.env.OUTPUT_DIR||'C:/Users/dougl/Documents/Codex/2026-10-05/i-x20/outputs/marketplace/local-browser';
await fs.mkdir(OUT,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const checks=[],errors=[];const check=(name,ok,detail=null)=>{checks.push({name,passed:!!ok,detail});};
const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
const axe=await fs.readFile('node_modules/axe-core/axe.min.js','utf8');
try {
for(const width of [320,390,768,1440]){
await page.setViewportSize({width,height:width===1440?1000:844});await page.goto(BASE+'/connect/');
check('connect no overflow '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.evaluate(axe);const a=await page.evaluate(()=>axe.run(document));const serious=a.violations.filter(v=>['serious','critical'].includes(v.impact));check('connect axe '+width,!serious.length,serious.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
if([390,1440].includes(width))await page.screenshot({path:path.join(OUT,`connect-${width}.png`),fullPage:true});
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();check('OS reduced motion',await page.locator('html').getAttribute('data-motion')==='reduced');const motion=page.locator('[data-motion-toggle]');if(await motion.count())check('reduced toggle disabled',await motion.isDisabled());await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();
await page.keyboard.press('Tab');check('keyboard skip focus',await page.locator('.skip').evaluate(e=>e===document.activeElement));
for(const [flow,mode] of [['correlate','SIMULATED'],['handoff','SIMULATED'],['replay','REPLAY']]){
await page.locator(`[data-training="${flow}"]`).click();await page.waitForFunction(()=>!document.querySelector('#training-state').textContent.startsWith('LOADING'));
const state=await page.locator('#training-state').textContent();check(flow+' actual success',state.startsWith('SUCCEEDED'),state);
let value;try{value=JSON.parse(await page.locator('#training-result').textContent());}catch{}
check(flow+' mode+audit',value?.result?.dataMode===mode&&value.result.executionKind==='DETERMINISTIC'&&value.audit?.[0]?.runId===value.result.runId,value?.result?.runId);
check(flow+' evidence+limits',value?.result?.inputRefs?.length>0&&value.result.limitations?.length>0);
const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#training-download').click()]);const target=path.join(OUT,download.suggestedFilename());await download.saveAs(target);const exported=JSON.parse(await fs.readFile(target,'utf8'));check(flow+' genuine JSON export',JSON.stringify(exported)===JSON.stringify(value));
}
await page.screenshot({path:path.join(OUT,'connect-run-1440.png'),fullPage:true});
await page.route('**/training-api/v1/*',route=>route.abort());await page.locator('[data-training="correlate"]').click();await page.waitForFunction(()=>document.querySelector('#training-state').textContent.startsWith('FAILED'));check('network failure honest',await page.locator('#training-download').isDisabled());await page.unroute('**/training-api/v1/*');
const original=await (await page.request.get(BASE+'/training-api/v1/correlate?scenario=duplicate-and-delay')).json();original.result.status='FAILED';await page.route('**/training-api/v1/*',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(original)}));await page.locator('[data-training="correlate"]').click();await page.waitForFunction(()=>!document.querySelector('#training-state').textContent.startsWith('LOADING'));check('HTTP200 failed envelope truthful',(await page.locator('#training-state').textContent()).startsWith('FAILED'));check('failure audit retained',JSON.parse(await page.locator('#training-result').textContent()).result.status==='FAILED');await page.unroute('**/training-api/v1/*');
await page.route('**/training-api/v1/*',route=>route.fulfill({status:200,contentType:'application/json',body:'{"status":"SUCCEEDED"}'}));await page.locator('[data-training="correlate"]').click();await page.waitForFunction(()=>!document.querySelector('#training-state').textContent.startsWith('LOADING'));check('invalid payload denied export',await page.locator('#training-download').isDisabled()&&(await page.locator('#training-state').textContent()).startsWith('FAILED'));await page.unroute('**/training-api/v1/*');
for(const route of ['/privacy.html','/terms.html','/support/']){await page.goto(BASE+'/connect/');await page.locator(`a[href="${route}"]`).first().click();const normalize=p=>p.replace(/\.html$/,'').replace(/\/$/,'');check('navigation '+route,normalize(new URL(page.url()).pathname)===normalize(route));await page.evaluate(axe);const a=await page.evaluate(()=>axe.run(document));check('policy axe '+route,!a.violations.some(v=>['serious','critical'].includes(v.impact)),a.violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>v.id));}
check('no browser exceptions',!errors.length,errors);
} catch(e){check('harness completion',false,e.stack);} finally{await browser.close();const report={baseURL:BASE,at:new Date().toISOString(),checks,passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed).length,limitations:['Frontend checks performed by its author; protocol/runtime independent review belongs to other specialists.','No actual ChatGPT client installation or natural-language tool-selection validation.']};await fs.writeFile(path.join(OUT,'browser-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.failed)process.exitCode=1;}
