import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEastGateFixture, runEastGateFixture } from '../scripts/east-gate-ambiguity.mjs';

const { fixture, rules } = await loadEastGateFixture();
const result = runEastGateFixture(fixture, rules);

test('fixture is labeled simulated and deterministic, with no actions', () => {
  assert.equal(result.data_mode, 'SIMULATED');
  assert.equal(result.execution_kind, 'DETERMINISTIC_LOCAL_RULES');
  assert.deepEqual(result.actions_taken, []);
  assert.equal(result.run_state, 'SUCCEEDED');
});

test('duplicate radar report is removed while original evidence is auditable', () => {
  assert.deepEqual(result.audit.duplicate_removed_ids, ['R1-DUP']);
  assert.deepEqual(result.track.retained_radar_observation_ids, ['R1', 'R2']);
  assert.ok(result.audit.input_event_ids.includes('R1-DUP'));
});

test('camera identity conflict is preserved without asserting a threat', () => {
  assert.deepEqual(result.track.classification_labels, ['drone-like', 'bird-like']);
  assert.equal(result.track.identity, 'unidentified');
  assert.equal(result.track.threat_status, 'undetermined');
});

test('RF evidence remains contextual and Remote ID stays separate by distance', () => {
  assert.deepEqual(result.track.rf_context_ids, ['F1']);
  assert.deepEqual(result.track.remote_id_separate_ids, ['ID1']);
});

test('late camera evidence is excluded from correlation but retained in the audit input', () => {
  assert.deepEqual(result.audit.late_excluded_ids, ['C-OLD']);
  assert.ok(result.evidence_references.every(item => item.ref !== 'C-OLD'));
  assert.ok(result.audit.input_event_ids.includes('C-OLD'));
});

test('events arriving out of observation order are flagged and timeline uses observation time', () => {
  assert.ok(result.audit.out_of_order_event_ids.includes('R2'));
  assert.deepEqual(result.track.observation_timeline, [
    { event_id: 'R1', observed_s: 10 },
    { event_id: 'R2', observed_s: 15 },
  ]);
});

test('sensor outage is flagged and age uses observation time, not arrival time', () => {
  assert.deepEqual(result.track.coverage_loss_sensor_ids, ['rf-east-1']);
  assert.equal(result.track.latest_observation_s, 15);
  assert.equal(result.track.age_s_at_exercise_time, 45);
  assert.equal(result.track.freshness, 'stale');
  const r2 = fixture.events.find(event => event.event_id === 'R2');
  assert.equal(r2.arrived_s, 21);
  assert.equal(fixture.exercise_time_s - r2.observed_s, 45);
  assert.notEqual(fixture.exercise_time_s - r2.arrived_s, result.track.age_s_at_exercise_time);
});

test('every synthetic record contains observation and arrival times', () => {
  for (const event of fixture.events) {
    assert.equal(typeof event.observed_s, 'number', `${event.event_id} observation time`);
    assert.equal(typeof event.arrived_s, 'number', `${event.event_id} arrival time`);
  }
});

test('deterministic result matches the fixture acceptance record', () => {
  const expected = fixture.expected;
  assert.equal(result.track.track_id, expected.correlated_track_id);
  assert.deepEqual(result.track.retained_radar_observation_ids, expected.retained_radar_observation_ids);
  assert.deepEqual(result.audit.duplicate_removed_ids, expected.duplicate_removed_ids);
  assert.deepEqual(result.track.classification_labels, expected.classification_labels);
  assert.deepEqual(result.track.remote_id_separate_ids, expected.remote_id_separate_ids);
  assert.deepEqual(result.track.rf_context_ids, expected.rf_context_ids);
  assert.deepEqual(result.audit.late_excluded_ids, expected.late_excluded_ids);
  assert.deepEqual(result.track.coverage_loss_sensor_ids, expected.coverage_loss_sensor_ids);
  assert.deepEqual(result.audit.out_of_order_event_ids, expected.out_of_order_event_ids);
  assert.equal(result.track.age_s_at_exercise_time, expected.track_age_s_at_exercise_time);
  assert.equal(result.track.freshness, expected.track_freshness);
  assert.equal(result.track.identity, expected.identity);
  assert.equal(result.track.threat_status, expected.threat_status);
});
