import {chromium} from 'playwright';import fs from 'node:fs/promises';import path from 'node:path';
const out=path.resolve('../../outputs');await fs.mkdir(path.join(out,'screenshots'),{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const ctx=await browser.newContext();const report={checkedAt:new Date().toISOString(),signedOut:true,checks:[]};
for(const [label,url,privateRoute] of [
 ['vercel-current','https://airradius.vercel.app',false],
 ['sites-public','https://airradius.kaij4u.chatgpt.site',false],
 ['sites-card','https://airradius.kaij4u.chatgpt.site/card/',false],
 ['sites-demo','https://airradius.kaij4u.chatgpt.site/demo/',false],
 ['private-ceo','https://airradius-intelligence-showcase.kaij4u.chatgpt.site/ceo.html',true],
 ['private-pilot','https://airradius-intelligence-showcase.kaij4u.chatgpt.site/pilot.html',true],
 ['private-api','https://airradius-intelligence-showcase.kaij4u.chatgpt.site/api/airradius/desk',true]
]){const page=await ctx.newPage();try{
 const response=await page.goto(url,{waitUntil:'networkidle',timeout:45000});const body=await page.locator('body').innerText();const title=await page.title();
 const accessDenied=[401,403,404].includes(response?.status())||/sign.?in|log.?in|access denied|unauthori[sz]ed/i.test(title+' '+body.slice(0,500));
 const leaked=privateRoute&&/Your next business decision|Capabilities and execution evidence|"prospects"|"objective"/.test(body);
 const item={label,url,status:response?.status(),finalUrl:page.url(),title,accessDenied,privateLeak:leaked,approvedHeadline:body.includes('DETECT.'),responseHeaders:response?.headers()};
 report.checks.push(item);for(const width of (privateRoute?[390]:[390,1440])){await page.setViewportSize({width,height:1000});await page.screenshot({path:path.join(out,'screenshots',`deployed-${label}-${width}.png`),fullPage:true});}
 }catch(e){report.checks.push({label,url,error:e.message});}finally{await page.close();}}
await ctx.close();await browser.close();await fs.writeFile(path.join(out,'deployed-verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.checks.map(({label,status,accessDenied,privateLeak,approvedHeadline,error})=>({label,status,accessDenied,privateLeak,approvedHeadline,error})),null,2));
