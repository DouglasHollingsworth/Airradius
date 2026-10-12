import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {existsSync} from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const systemBrowsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const executablePath = process.env.BROWSER_PATH || systemBrowsers.find(existsSync);
const browser = await chromium.launch({headless: true, ...(executablePath ? {executablePath} : {})});
const page = await browser.newPage();
const trainingRequests = [];
page.on('request', request => {
  if (new URL(request.url()).pathname.startsWith('/training-api/')) trainingRequests.push(request.url());
});

try {
  await page.goto(`${base}/connect/`, {waitUntil: 'load'});
  await page.locator('#training-scenario').selectOption('east-gate-ambiguity');
  assert.equal(await page.locator('[data-training="correlate"]').isDisabled(), false);
  assert.equal(await page.locator('[data-training="handoff"]').isDisabled(), true);
  assert.equal(await page.locator('[data-training="replay"]').isDisabled(), true);

  const downloadEvent = page.waitForEvent('download');
  await page.locator('[data-training="correlate"]').click();
  await page.waitForFunction(() => document.querySelector('#training-state').textContent.startsWith('SUCCEEDED'));
  const output = JSON.parse(await page.locator('#training-result').innerText());
  assert.equal(output.data_mode, 'SIMULATED');
  assert.equal(output.execution_kind, 'DETERMINISTIC_LOCAL_RULES');
  assert.equal(output.run_state, 'SUCCEEDED');
  assert.equal(output.execution_location, 'BROWSER_LOCAL');
  assert.equal(output.storage_scope, 'IN_MEMORY_ONLY');
  assert.equal(output.track.track_id, 'T17');
  assert.equal(output.track.latest_observation_s, 15);
  assert.equal(output.track.latest_arrival_s, 21);
  assert.equal(output.track.age_s_at_exercise_time, 45);
  assert.equal(output.track.freshness, 'stale');
  assert.deepEqual(output.track.classification_labels, ['drone-like', 'bird-like']);
  assert.deepEqual(output.track.coverage_loss_sensor_ids, ['rf-east-1']);
  assert.deepEqual(output.track.remote_id_separate_ids, ['ID1']);
  assert.deepEqual(output.audit.transitions.map(item => item.state), ['QUEUED', 'RUNNING', 'SUCCEEDED']);
  assert.ok(output.evidence_references.some(item => item.ref === 'R2'));
  assert.ok(output.limitations.some(item => item.includes('no sensor, MCP tool, model')));
  assert.deepEqual(trainingRequests, [], 'East Gate run must not call the training API');

  await page.locator('#training-download').click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'airradius-east-gate-ambiguity.json');
  console.log(JSON.stringify({status: 'PASS', scenario: output.fixture_id, runId: output.run_id, state: output.run_state, dataMode: output.data_mode, ageSeconds: output.track.age_s_at_exercise_time, stale: output.track.freshness, trainingApiRequests: trainingRequests.length}));
} finally {
  await browser.close();
}
