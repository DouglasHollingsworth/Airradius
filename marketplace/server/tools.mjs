import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod/v4';
import {CfWorkerJsonSchemaValidator} from '@modelcontextprotocol/sdk/validation/cfworker-provider.js';
import resultContract from '../../specs/agent-result.schema.json' with {type:'json'};
import {createRuntime,fixture} from '../../js/runtime.js';
// Edge runtimes prohibit dynamic code generation; use Zod's interpreter path.
z.config({jitless:true});

export const SCENARIOS=['duplicate-and-delay','separated-observations'];
export const INPUT_SCHEMA=z.strictObject({scenario:z.enum(SCENARIOS).describe('Choose a built-in fictional exercise. No personal, private, imported or live data is accepted.')});
const id=z.string().min(1),refs=z.array(id),time=z.iso.datetime({offset:true}),statement=z.strictObject({text:id,evidenceRefs:refs.min(1)});
const engine=z.strictObject({name:z.string().nullable(),version:z.string().nullable(),provider:z.string().nullable(),model:z.string().nullable()}),usage=z.strictObject({inputTokens:z.number().int().min(0).nullable(),outputTokens:z.number().int().min(0).nullable(),costUsd:z.number().min(0).nullable()});
const result=z.strictObject({schemaVersion:z.literal('0.1.0'),runId:id,agentId:z.enum(['digital-moc-coordinator','sensor-fusion-analyst','rf-em-awareness-analyst','geospatial-analyst','event-correlator','operator-handoff-coordinator','replay-aar-analyst','open-source-integration-scout']),caseId:id,dataMode:z.enum(['SIMULATED','REPLAY','LIVE']),executionKind:z.enum(['DETERMINISTIC','LLM','NOT_CONFIGURED']),status:z.enum(['QUEUED','RUNNING','SUCCEEDED','FAILED','CANCELED','BLOCKED']),startedAt:time.nullable(),finishedAt:time.nullable(),engine,inputRefs:refs,facts:z.array(statement),inferences:z.array(statement),limitations:z.array(id),recommendations:z.array(z.strictObject({text:id,evidenceRefs:refs.min(1),humanApprovalRequired:z.literal(true)})),usage,approvalRequired:z.literal(true),error:z.strictObject({code:id,message:id}).nullable()});
const observation=z.strictObject({id,source:id,observedAt:time,ingestedAt:time,x:z.number().min(-10000).max(10000),y:z.number().min(-10000).max(10000),identity:z.string().nullable()}),action=z.strictObject({id,type:z.enum(['NOTE','ASSIGN','CLOSE','REOPEN','HANDOFF_APPROVED']),at:time,actor:id,text:id,evidenceRefs:refs.min(1)});
const fixtureSchema=z.strictObject({id,version:z.number().int().min(1),owner:id.nullable(),state:z.enum(['OPEN','CLOSED','REOPENED']),dataMode:z.enum(['SIMULATED','REPLAY']),fictional:z.literal(true),observations:z.array(observation).min(1).max(100),actions:z.array(action).max(100)});
const audit=z.strictObject({runId:id,agentId:id,caseId:id,actor:id,inputVersion:z.number().int().min(1).nullable(),status:z.enum(['QUEUED','RUNNING','SUCCEEDED','FAILED','CANCELED','BLOCKED']),engine,usage,transitions:z.array(z.strictObject({state:z.enum(['QUEUED','RUNNING','SUCCEEDED','FAILED','CANCELED','BLOCKED']),at:time})).min(1),finishedAt:time,error:z.strictObject({code:id,message:id}).nullable()});
export const OUTPUT_SCHEMA=z.strictObject({scenario:z.enum(SCENARIOS),fixture:fixtureSchema,result,audit:z.array(audit).max(1),storageScope:z.literal('REQUEST_ONLY'),humanReview:id});
export const OUTPUT_JSON_SCHEMA=z.toJSONSchema(OUTPUT_SCHEMA);
// Preserve supplied result-contract conditionals and reference uniqueness for external validation.
OUTPUT_JSON_SCHEMA.$defs=resultContract.$defs;
OUTPUT_JSON_SCHEMA.properties.result={...resultContract};
delete OUTPUT_JSON_SCHEMA.properties.result.$schema;delete OUTPUT_JSON_SCHEMA.properties.result.$defs;
const validateOutput=new CfWorkerJsonSchemaValidator().getValidator(OUTPUT_JSON_SCHEMA);
export const TOOLS=[
 {name:'airradius_correlate_events',role:'event-correlator',title:'Correlate fictional AirRadius events',description:'Find possible duplicates and proximity relationships in a built-in fictional airspace exercise. Returns SIMULATED deterministic hypotheses with original source observations, timestamps, uncertainty, evidence references and the actual request audit. Does not identify aircraft, infer hostile intent, access private records or control anything.'},
 {name:'airradius_draft_handoff',role:'operator-handoff-coordinator',title:'Draft a fictional AirRadius handoff',description:'Draft a human-review briefing from a selected fictional airspace case. Returns owner/state, observed facts, unknowns, evidence and actual request run state. This does not accept a handoff, change case records, send messages or access private operator data.'},
 {name:'airradius_analyze_replay',role:'replay-aar-analyst',title:'Analyze a fictional AirRadius replay',description:'Reconstruct the observation and action timeline of a built-in fictional exercise. Returns a REPLAY deterministic after-action draft with distinct observation/ingestion timestamps, evidence, limitations and request audit. Does not connect live feeds, establish causal effects or provide operational control.'}
];
export const ACTION_ENDPOINTS=TOOLS.map((tool,i)=>({...tool,path:`/training-api/v1/${['correlate','handoff','replay'][i]}`,method:'GET',operationId:tool.name}));
export function scenarioFixture(scenario,role){
 if(!SCENARIOS.includes(scenario))throw new Error('Unknown preset');
 const c=fixture();
 if(scenario==='separated-observations'){
  c.id='fictional-separated-001';c.observations=c.observations.slice(0,2);c.observations[1].observedAt=c.observations[0].observedAt;c.observations[1].x=1000;c.observations[1].y=-700;
 }
 if(role==='replay-aar-analyst')c.dataMode='REPLAY';
 return c;
}
export async function executePreset(role,scenario){
 const runtime=createRuntime({auditScope:'REQUEST_ONLY'}),c=scenarioFixture(scenario,role);
 const result=await runtime.runWorkflow(role,c,{actor:'demo-operator',timeoutMs:1000});
 result.limitations.push('Only an enumerated built-in fictional preset was accepted; no user case input or private records were read.','No handoff approval, external action, model call, schedule, charge or operational control was performed.');
 const output={scenario,fixture:c,result,audit:runtime.getRunLog(),storageScope:'REQUEST_ONLY',humanReview:'Draft only. Human review does not authorize any action through this tool.'};
 const validation=validateOutput(output);if(!validation.valid)throw new Error('Fictional output failed the shared result schema');
 return output;
}
export function createToolServer(){
 const server=new McpServer({name:'airradius-training',version:'0.1.0'},{jsonSchemaValidator:new CfWorkerJsonSchemaValidator(),instructions:'AirRadius exposes only three bounded fictional exercise tools. All results distinguish SIMULATED/REPLAY and deterministic execution. Never present samples as live detections, private record access, aircraft identity or executed operational actions.'});
 for(const tool of TOOLS)server.registerTool(tool.name,{title:tool.title,description:tool.description,inputSchema:INPUT_SCHEMA,outputSchema:OUTPUT_SCHEMA,annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:false,openWorldHint:false}},async({scenario})=>{
  const output=await executePreset(tool.role,scenario);
  return {content:[{type:'text',text:JSON.stringify(output)}],structuredContent:output,isError:output.result.status!=='SUCCEEDED'};
 });
 return server;
}
