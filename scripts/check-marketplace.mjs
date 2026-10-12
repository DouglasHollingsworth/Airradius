import {readFile,readdir,lstat,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import Ajv from 'ajv/dist/2020.js';
import formats from 'ajv-formats';
import {OUTPUT_JSON_SCHEMA,executePreset,ACTION_ENDPOINTS} from '../marketplace/server/tools.mjs';
const ajv=new Ajv({strict:false,allErrors:true});formats(ajv);const checks=[];
const json=async p=>JSON.parse(await readFile(p,'utf8'));
for(const name of ['plugin','mcp']){const validate=ajv.compile(await json(`marketplace/vendor-schemas/${name}.schema.json`)),value=await json(`marketplace/plugin/${name}.json`);assert.ok(validate(value),JSON.stringify(validate.errors));checks.push(`${name}: official portable schema PASS`);}
const plugin=await json('marketplace/plugin/plugin.json'),listing=plugin.extensions['com.openai'].interface;
assert.ok(listing.displayName.length<=30&&listing.shortDescription.length<=30&&listing.longDescription.length<=4000);assert.equal(listing.defaultPrompt.length,3);
for(const k of ['websiteURL','supportURL','privacyPolicyURL','termsOfServiceURL'])assert.equal(new URL(listing[k]).origin,'https://airradius.kaij4u.chatgpt.site');
assert.equal(plugin.extensions['com.openai'].review.test_cases.positive.length,5);assert.equal(plugin.extensions['com.openai'].review.test_cases.negative.length,3);checks.push('listing lengths, URLs and five/three review case counts PASS');
const review=plugin.extensions['com.openai'].review;assert.equal(review.demo_recording_url,'https://airradius.kaij4u.chatgpt.site/assets/training-walkthrough.webm');assert.ok(!('video_url'in review)&&!('release_notes'in review)&&!('test_credentials'in review)&&!('reviewer_instructions'in review));assert.ok(plugin.extensions['com.openai'].publication.release_notes);checks.push('documented review/publication metadata fields and credential exclusion PASS');
const spec=await json('marketplace/gpt-store/openapi.json');assert.equal(spec.openapi,'3.1.0');assert.equal(spec.servers[0].url,'https://airradius.kaij4u.chatgpt.site');assert.equal(Object.keys(spec.paths).length,3);
function refs(value){if(Array.isArray(value))return value.forEach(refs);if(value&&typeof value==='object'){for(const[k,v]of Object.entries(value)){if(k==='$ref'){assert.ok(v.startsWith('#/'),'External schema ref not permitted in GPT kit');let target=spec;for(const p of v.slice(2).split('/'))target=target?.[p.replaceAll('~1','/').replaceAll('~0','~')];assert.ok(target,`Unresolved ${v}`);}else refs(v);}}}refs(spec);
for(const e of ACTION_ENDPOINTS){const op=spec.paths[e.path].get;assert.equal(op.operationId,e.name);assert.equal(op['x-openai-isConsequential'],false);assert.ok(op.description.length<=300&&op.summary.length<=300);assert.equal(op.parameters.length,1);assert.deepEqual(op.parameters[0].schema.enum,['duplicate-and-delay','separated-observations']);}
checks.push('OpenAPI structure, operation mapping, metadata budgets and all internal refs PASS (Builder import pending)');
const validateOutput=ajv.compile(OUTPUT_JSON_SCHEMA);for(const e of ACTION_ENDPOINTS){const output=await executePreset(e.role,'duplicate-and-delay');assert.ok(validateOutput(output),JSON.stringify(validateOutput.errors));assert.equal(output.result.executionKind,'DETERMINISTIC');assert.equal(output.audit.length,1);}checks.push('three actual outputs against shared JSON result envelope PASS');
const authored=[];async function walk(dir){for(const name of await readdir(dir)){const p=path.join(dir,name),s=await lstat(p);assert.ok(!s.isSymbolicLink(),`Symlink forbidden ${p}`);if(s.isDirectory())await walk(p);else authored.push(p);}}
for(const dir of ['marketplace/plugin','marketplace/listing','marketplace/gpt-store','marketplace/server'])await walk(dir);
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/];
for(const f of authored){assert.ok(!/(?:\.env|\.app\.json|hooks\.json|private-record|credential\.json)$/.test(f));if(/\.(json|md|mjs|svg)$/.test(f)){const s=await readFile(f,'utf8');for(const p of patterns)assert.ok(!p.test(s),`Secret signature ${f}`);}}
checks.push(`signature/path/symlink scan of ${authored.length} authored marketplace files PASS (not exhaustive secret forensics)`);
const out=process.env.OUTPUT_DIR||'../../outputs/marketplace';await mkdir(out,{recursive:true});const result={at:new Date().toISOString(),checks,packageStatus:'TECHNICALLY_PREPARED_NOT_SUBMITTED',gptStatus:'KIT_ONLY_NOT_CREATED',naturalLanguageReviewCases:'NOT_RUN_IN_CHATGPT',publisherVerification:'UNVERIFIED',domainVerification:'PORTAL_CHALLENGE_MISSING',supportContact:'OWNER_CONFIRMATION_MISSING',hostingLogRetention:'UNCONFIRMED',directoryQualityReview:'PENDING_COMPLETE_PRODUCT_ASSESSMENT'};await writeFile(path.join(out,'package-check.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
