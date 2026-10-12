import fs from 'node:fs/promises';
let p=await fs.readFile('js/pilot.js','utf8');
p=p.replace("const base=plan==='Partner'?7500:plan==='Operator'?2500:750;","const base=null;").replace('const monthly=base+extra*125;','const monthly=null;').replace('priceUsd:2500','priceUsd:null').replace('extraWorkspaceMonthlyUsd:125','extraWorkspaceMonthlyUsd:null');
p=p.replace('Its proposed base includes 10 workspaces; additional workspaces are $125/month each.','Workspace scope and commercial terms require founder confirmation.').replace('Indicative USD pricing only; no live service offer, checkout, contract or submission.','Pricing is unconfirmed; no live service offer, checkout, contract or submission.');
p=p.replace(/`Proposed pilot:.*?`,/,'`Proposed pilot: ${p.pilot.durationDays} days; human scope approval required. Pricing requires founder confirmation.`,').replace(/`Proposed future plan:.*?`,/,'`Proposed future scope: ${p.futurePlan.name}. Commercial terms require founder confirmation.`,');
p=p.replace("line('p','$2,500 USD / 30 days','price')","line('p','Pricing requires founder confirmation.','price')").replace("line('p','$'+p.futurePlan.indicativeMonthlyUsd.toLocaleString('en-US')+' USD / month','price')","line('p','Commercial terms require founder confirmation.','price')").replace(/line\('p',`Pricing breakdown:.*?`\),/,'');
await fs.writeFile('js/pilot.js',p);
let t=await fs.readFile('tests/pilot.test.mjs','utf8');
t=t.replace(/(priceUsd|indicativeMonthlyUsd),(2500|750|7750|12500)/g,'$1,null');
await fs.writeFile('tests/pilot.test.mjs',t);
for(const [file,from,to] of [['start/index.html','PLANNING · INDICATIVE PRICING','PLANNING · PROPOSED SCOPE'],['start/index.html','Explore proposed scope and pricing','Explore proposed scope'],['js/connect.js','Validating and replaying','Loading and replaying'],['README.md','https://airradius.vercel.app','https://airradius.kaij4u.chatgpt.site']]){let s=await fs.readFile(file,'utf8');await fs.writeFile(file,s.replaceAll(from,to));}
