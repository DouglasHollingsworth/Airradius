// Public fictional, on-demand deterministic helpers. No network or private adapters.
const implemented = ['event-correlator','operator-handoff-coordinator','replay-aar-analyst'];
const roles = ['digital-moc-coordinator','sensor-fusion-analyst','rf-em-awareness-analyst','geospatial-analyst',...implemented,'open-source-integration-scout'];
const runs = [], cache = new Map(), drafts = new Map();
const copy = value => JSON.parse(JSON.stringify(value));
const fail = (code,message) => { throw Object.assign(new Error(message),{code}); };
const text = v => typeof v === 'string' && v.length > 0 && v.length <= 1000;
const stamp = v => text(v) && /(?:Z|[+-]\d\d:\d\d)$/.test(v) && Number.isFinite(Date.parse(v));
function keys(value,allowed) { if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(k=>!allowed.includes(k))) fail('SCHEMA','Unexpected fields or object type'); }
export function fixture() { return {id:'fictional-case-001',version:1,owner:'demo-operator',state:'OPEN',dataMode:'SIMULATED',fictional:true,observations:[{id:'obs-001',source:'fictional-radar',observedAt:'2026-10-05T12:00:00Z',ingestedAt:'2026-10-05T12:00:02Z',x:20,y:30,identity:null},{id:'obs-002',source:'fictional-optical',observedAt:'2026-10-05T12:00:04Z',ingestedAt:'2026-10-05T12:00:10Z',x:23,y:32,identity:null},{id:'obs-003',source:'fictional-radar',observedAt:'2026-10-05T12:00:00Z',ingestedAt:'2026-10-05T12:00:03Z',x:20,y:30,identity:null},{id:'obs-004',source:'fictional-legacy-replay',observedAt:'2026-10-05T11:58:00Z',ingestedAt:'2026-10-05T11:58:02Z',x:-45,y:10,identity:null}],actions:[{id:'note-001',type:'NOTE',at:'2026-10-05T12:00:11Z',actor:'demo-operator',text:'Fictional exercise: review uncertain observation.',evidenceRefs:['observation:obs-001']}]}; }
export function validateCase(c) {
  keys(c,['id','version','owner','state','dataMode','fictional','observations','actions']);
  if (!text(c.id)||!Number.isInteger(c.version)||c.version<1||!(c.owner===null||text(c.owner))||!['OPEN','CLOSED','REOPENED'].includes(c.state)||!['SIMULATED','REPLAY'].includes(c.dataMode)||c.fictional!==true) fail('BOUNDARY','Only labelled fictional SIMULATED/REPLAY cases are accepted');
  if (!Array.isArray(c.observations)||c.observations.length<1||c.observations.length>100||!Array.isArray(c.actions)||c.actions.length>100) fail('SCHEMA','Require 1–100 observations and at most 100 actions');
  const ids = new Set();
  for (const o of c.observations) {
    keys(o,['id','source','observedAt','ingestedAt','x','y','identity']);
    if (!text(o.id)||!text(o.source)||!stamp(o.observedAt)||!stamp(o.ingestedAt)||Date.parse(o.ingestedAt)<Date.parse(o.observedAt)||![o.x,o.y].every(n=>Number.isFinite(n)&&Math.abs(n)<=10000)||!(o.identity===null||text(o.identity))) fail('SCHEMA','Invalid observation');
    if(ids.has(o.id)) fail('DUPLICATE_ID','Observation IDs must be unique'); ids.add(o.id);
  }
  const refs = new Set([`case:${c.id}`,...c.observations.map(o=>`observation:${o.id}`),...c.actions.map(a=>`action:${a.id}`)]), actionIds=new Set();
  for(const a of c.actions) {
    keys(a,['id','type','at','actor','text','evidenceRefs']);
    if(!text(a.id)||actionIds.has(a.id)||!['NOTE','ASSIGN','CLOSE','REOPEN','HANDOFF_APPROVED'].includes(a.type)||!stamp(a.at)||!text(a.actor)||!text(a.text)||!Array.isArray(a.evidenceRefs)||a.evidenceRefs.length<1||a.evidenceRefs.some(r=>!refs.has(r))) fail('SCHEMA','Invalid action or unresolved evidence'); actionIds.add(a.id);
  }
  return true;
}
export function getRunLog() { return copy(runs); }
export function getRoleRegistry() { return roles.map(id=>({id,historicalWorkflowMapping:'AirRadius Operations',implementationStatus:implemented.includes(id)?'IMPLEMENTED_DETERMINISTIC':'NOT_IMPLEMENTED',trigger:'MANUAL_ONLY',executionStatus:runs.findLast(r=>r.agentId===id)?.status ?? 'NEVER_RUN',lastRunId:runs.findLast(r=>r.agentId===id)?.runId ?? null})); }
function statement(text,evidenceRefs) { return {text,evidenceRefs}; }
export async function runWorkflow(agentId,c,options={}) {
  if(!roles.includes(agentId)) fail('AGENT','Unknown role');
  const actor=options.actor??'demo-operator';
  const signature=JSON.stringify([agentId,c,actor]);
  if(options.idempotencyKey && cache.has(options.idempotencyKey)) { const old=cache.get(options.idempotencyKey); if(old.signature!==signature) fail('IDEMPOTENCY','Key already used for different input'); return copy(await old.promise); }
  const promise=execute(agentId,copy(c),options,actor);
  if(options.idempotencyKey) cache.set(options.idempotencyKey,{signature,promise});
  return copy(await promise);
}
async function execute(agentId,c,options,actor) {
  const now=()=>new Date().toISOString(), start=Date.now(), timeout=options.timeoutMs??1000;
  const r={schemaVersion:'0.1.0',runId:`run-${globalThis.crypto?.randomUUID?.()??`${Date.now()}-${runs.length}`}`,agentId,caseId:text(c?.id)?c.id:'invalid-case',dataMode:['SIMULATED','REPLAY'].includes(c?.dataMode)?c.dataMode:'SIMULATED',executionKind:'DETERMINISTIC',status:'QUEUED',startedAt:null,finishedAt:null,engine:{name:'airradius-fictional-rules',version:'1.0.0',provider:null,model:null},inputRefs:[],facts:[],inferences:[],limitations:['Fictional public exercise only; no live feeds, identity verification or operational control.','Deterministic rules, not model-backed execution. Spatial values are illustrative exercise units.','Audit is browser/session memory, not authenticated or tamper-proof storage.'],recommendations:[],usage:{inputTokens:null,outputTokens:null,costUsd:null},approvalRequired:true,error:null};
  const audit={runId:r.runId,agentId,caseId:r.caseId,actor,inputVersion:c?.version??null,status:r.status,engine:copy(r.engine),usage:copy(r.usage),transitions:[{state:'QUEUED',at:now()}]}; runs.push(audit);
  function transition(state) { r.status=state;audit.status=state;audit.transitions.push({state,at:now()});options.onState?.(copy(r)); }
  function check() { if(options.signal?.aborted) fail('CANCELED','Run canceled');if(!Number.isFinite(timeout)||timeout<=0||Date.now()-start>=timeout) fail('TIMEOUT','Run exceeded deadline'); }
  try {
    validateCase(c);
    if(c.owner!==actor) fail('AUTHORIZATION','Actor must be current exercise owner');
    if(!implemented.includes(agentId)) {r.executionKind='NOT_CONFIGURED';fail('NOT_CONFIGURED','Role defined but not implemented');}
    check();r.startedAt=now();transition('RUNNING');
    await new Promise(resolve=>setTimeout(resolve,0));check();
    const caseRef=`case:${c.id}`, obsRef=o=>`observation:${o.id}`;
    r.inputRefs=[caseRef,...c.observations.map(obsRef),...c.actions.map(a=>`action:${a.id}`)];
    r.facts.push(statement(`Case ${c.id}; state ${c.state}; responsible exercise owner ${c.owner}; version ${c.version}.`,[caseRef]));
    if(agentId==='event-correlator') {
      r.limitations.push('Candidate rule: observation time gap ≤10 seconds and distance ≤10 exercise units. This is not a calibrated probability or confirmed identity.');
      for(let i=0;i<c.observations.length;i++) {
        check();const a=c.observations[i];
        if(a.identity===null) r.facts.push(statement('Aircraft identity is unknown.',[obsRef(a)]));
        if(Date.parse(a.ingestedAt)-Date.parse(a.observedAt)>5000) r.facts.push(statement('Ingestion was delayed by more than five seconds; arrival order is not event order.',[obsRef(a)]));
        for(const b of c.observations.slice(i+1)) {
          const gap=Math.abs(Date.parse(a.observedAt)-Date.parse(b.observedAt)),distance=Math.hypot(a.x-b.x,a.y-b.y),refs=[obsRef(a),obsRef(b)];
          if(gap<=10000&&distance<=10) r.inferences.push(statement(a.identity&&b.identity&&a.identity!==b.identity?'Sources conflict on identity; do not merge.':a.source===b.source&&gap===0&&distance===0?'Possible duplicate observation; original records retained.':'Possible related observations under the stated proximity rule; requires review.',refs));
          else if(gap===0) r.facts.push(statement('Same-time observations are spatially separated; no proximity match.',refs));
          if(gap>60000) r.facts.push(statement('Observations are more than 60 seconds apart; relative freshness gap.',refs));
        }
      }
    } else if(agentId==='operator-handoff-coordinator') {
      r.facts.push(statement(`${c.observations.length} observations and ${c.actions.length} recorded actions. This is a draft, not an accepted handoff.`,[caseRef]));
      for(const o of c.observations) r.facts.push(statement(`Observed ${o.observedAt}; ingested ${o.ingestedAt}; source ${o.source}; identity ${o.identity??'unknown'}.`,[obsRef(o)]));
      r.recommendations.push({text:'Review the referenced observations, reconcile unknown identity and record the next human review step. Priority is review only; no hostile intent is established.',evidenceRefs:[caseRef],humanApprovalRequired:true});
    } else {
      const timeline=[...c.observations.map(o=>({at:o.observedAt,text:`Observation from ${o.source}; ingestion ${o.ingestedAt}; identity ${o.identity??'unknown'}.`,ref:obsRef(o)})),...c.actions.map(a=>({at:a.at,text:`Recorded ${a.type}: ${a.text}`,ref:`action:${a.id}`}))].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
      r.facts.push(...timeline.map(t=>statement(`${t.at} — ${t.text}`,[t.ref])));
      r.limitations.push('Recorded actions and observations do not establish causal effects or measured performance improvements.');
      if(c.actions.length<2) r.limitations.push('Insufficient action history for a complete after-action review.');
      const seen=new Set();for(const a of c.actions){if(seen.has(a.text))r.facts.push(statement('Repeated action text recorded; records retained.',[`action:${a.id}`]));seen.add(a.text);}
      r.recommendations.push({text:'Suggested lesson for human review: preserve observation and ingestion times and resolve unknowns before drawing causal conclusions.',evidenceRefs:[caseRef],humanApprovalRequired:true});
    }
    check();transition('SUCCEEDED');
    if(agentId==='operator-handoff-coordinator') drafts.set(r.runId,{caseSignature:JSON.stringify(c),result:JSON.stringify(r),actor,approved:false});
  } catch(e) {r.error={code:e.code??'ERROR',message:e.code?e.message:'Unexpected runtime failure'};transition(e.code==='CANCELED'?'CANCELED':['AUTHORIZATION','BOUNDARY','NOT_CONFIGURED'].includes(e.code)?'BLOCKED':'FAILED');}
  r.finishedAt=now();audit.finishedAt=r.finishedAt;audit.error=copy(r.error);
  // Store completed contract after finishedAt has been assigned.
  if(drafts.has(r.runId)) drafts.get(r.runId).result=JSON.stringify(r);
  return r;
}
export function approveHandoff(c,result,actor,expectedVersion) {
  validateCase(c);const d=drafts.get(result?.runId);
  if(c.owner!==actor||!d||d.actor!==actor) fail('AUTHORIZATION','Only the current exercise owner can approve a locally executed draft');
  if(d.approved) fail('ALREADY_APPROVED','Draft already approved');
  if(c.version!==expectedVersion||JSON.stringify(c)!==d.caseSignature) fail('STALE_VERSION','Case changed after draft execution');
  if(JSON.stringify(result)!==d.result||result.status!=='SUCCEEDED') fail('RESULT','Draft result was modified');
  if(c.actions.length>=100) fail('SCHEMA','Action limit reached');
  const next=copy(c);next.version++;next.actions.push({id:`approval-${result.runId}`,type:'HANDOFF_APPROVED',at:new Date().toISOString(),actor,text:'Human approved the fictional handoff draft; no outbound message or operational action.',evidenceRefs:[`case:${c.id}`]});validateCase(next);d.approved=true;
  const audit=runs.find(r=>r.runId===result.runId);audit.approval={actor,at:new Date().toISOString(),beforeVersion:c.version,afterVersion:next.version};return next;
}
