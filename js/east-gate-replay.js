export function runEastGateFixture(fixture, rules) {
  const arrivalOrdered = [...fixture.events].sort((a, b) => a.arrived_s - b.arrived_s || a.event_id.localeCompare(b.event_id));
  let maxObserved = Number.NEGATIVE_INFINITY;
  const outOfOrder = [];
  for (const event of arrivalOrdered) {
    if (event.observed_s < maxObserved) outOfOrder.push(event.event_id);
    maxObserved = Math.max(maxObserved, event.observed_s);
  }

  const seenRadar = new Set();
  const retainedRadar = [];
  const duplicates = [];
  for (const event of arrivalOrdered.filter(item => item.kind === 'radar_observation')) {
    const key = rules.deduplication.key_fields.map(field => event[field]).join('|');
    if (seenRadar.has(key)) duplicates.push(event.event_id);
    else { seenRadar.add(key); retainedRadar.push(event); }
  }

  const currentEvents = [];
  const lateExcluded = [];
  for (const event of arrivalOrdered) {
    const lag = event.arrived_s - event.observed_s;
    if (event.kind === rules.late_evidence.applies_to && lag > rules.late_evidence.maximum_arrival_lag_s) lateExcluded.push(event.event_id);
    else if (!(event.kind === 'radar_observation' && duplicates.includes(event.event_id))) currentEvents.push(event);
  }

  const track = fixture.site.tracks.find(item => item.track_id === fixture.expected.correlated_track_id);
  const latestRadar = retainedRadar.filter(item => item.track_id === track.track_id).sort((a, b) => b.observed_s - a.observed_s)[0];
  const age = fixture.exercise_time_s - latestRadar.observed_s;
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const withinGates = event => Math.abs(event.observed_s - latestRadar.observed_s) <= rules.association.event_time_window_s
    && distance(event, track) <= rules.association.track_spatial_radius_m;
  const classifications = currentEvents.filter(event => event.kind === 'camera_classification' && withinGates(event));
  const remoteIdSeparate = currentEvents.filter(event => event.kind === 'remote_id' && !withinGates(event));
  const rfContext = currentEvents.filter(event => event.kind === 'rf_activity'
    && Math.abs(event.observed_s - latestRadar.observed_s) <= rules.association.event_time_window_s);
  const coverageLossSensors = currentEvents.filter(event => event.kind === 'sensor_status' && event.status === rules.sensor_health.offline_status).map(event => event.sensor_id);
  const observationTimeline = [...retainedRadar].sort((a, b) => a.observed_s - b.observed_s || a.event_id.localeCompare(b.event_id));

  return {
    fixture_id: fixture.fixture_id,
    data_mode: fixture.data_mode,
    execution_kind: fixture.execution_kind,
    run_state: 'SUCCEEDED',
    audit: {
      input_event_ids: fixture.events.map(event => event.event_id),
      duplicate_removed_ids: duplicates,
      late_excluded_ids: lateExcluded,
      out_of_order_event_ids: outOfOrder,
    },
    track: {
      track_id: track.track_id,
      retained_radar_observation_ids: observationTimeline.filter(event => event.track_id === track.track_id).map(event => event.event_id),
      latest_observation_s: latestRadar.observed_s,
      latest_arrival_s: latestRadar.arrived_s,
      age_s_at_exercise_time: age,
      freshness: age >= rules.time.stale_after_s ? 'stale' : 'fresh',
      classification_labels: classifications.map(event => event.label),
      identity: classifications.length > 1 ? 'unidentified' : (classifications[0]?.label ?? 'unidentified'),
      threat_status: 'undetermined',
      rf_context_ids: rfContext.map(event => event.event_id),
      remote_id_separate_ids: remoteIdSeparate.map(event => event.event_id),
      coverage_loss_sensor_ids: [...new Set(coverageLossSensors)],
      observation_timeline: observationTimeline.filter(event => event.track_id === track.track_id).map(event => ({ event_id: event.event_id, observed_s: event.observed_s })),
    },
    evidence_references: currentEvents.map(event => ({ ref: event.event_id, kind: event.kind, observed_s: event.observed_s, arrived_s: event.arrived_s })),
    limitations: fixture.limitations,
    actions_taken: [],
  };
}
