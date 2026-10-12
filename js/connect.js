'use strict';
(() => {
  const select = document.querySelector('#training-scenario');
  const state = document.querySelector('#training-state');
  const result = document.querySelector('#training-result');
  const download = document.querySelector('#training-download');
  const buttons = [...document.querySelectorAll('[data-training]')];
  const panel = select.closest('section');
  let payload = null;
  let workflow = '';
  let busy = false;
  const syncButtons = () => buttons.forEach(button => {
    button.disabled = busy || (select.value === 'east-gate-ambiguity' && button.dataset.training !== 'correlate');
  });
  select.addEventListener('change', syncButtons);
  syncButtons();

  for (const button of buttons) button.addEventListener('click', async () => {
    const scenario = select.value;
    const localEastGate = scenario === 'east-gate-ambiguity';
    if (!['duplicate-and-delay', 'separated-observations', 'east-gate-ambiguity'].includes(scenario)
      || (localEastGate && button.dataset.training !== 'correlate')) {
      state.textContent = 'FAILED · This workflow is not available for the selected training preset.';
      return;
    }
    workflow = button.dataset.training;
    payload = null;
    download.disabled = true;
    busy = true;
    syncButtons();
    select.disabled = true;
    panel.setAttribute('aria-busy', 'true');
    result.textContent = '';
    state.textContent = localEastGate
      ? 'LOADING · Loading and replaying the fixed fictional fixture in this browser.'
      : 'LOADING · Requesting a deterministic fictional training result.';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      let value;
      if (localEastGate) {
        const base = '/assets/training/';
        const [fixtureResponse, rulesResponse] = await Promise.all([
          fetch(`${base}east-gate-ambiguity.fixture.json`, {signal: controller.signal, credentials: 'omit', cache: 'no-store'}),
          fetch(`${base}east-gate-ambiguity.rules.json`, {signal: controller.signal, credentials: 'omit', cache: 'no-store'}),
        ]);
        if (!fixtureResponse.ok || !rulesResponse.ok) throw new Error('Fixture unavailable');
        const [fixture, rules] = await Promise.all([fixtureResponse.json(), rulesResponse.json()]);
        const {runEastGateFixture} = await import('./east-gate-replay.js');
        const startedAt = new Date().toISOString();
        const replay = runEastGateFixture(fixture, rules);
        const finishedAt = new Date().toISOString();
        const runId = `run-${crypto.randomUUID()}`;
        value = {
          ...replay,
          run_id: runId,
          execution_location: 'BROWSER_LOCAL',
          storage_scope: 'IN_MEMORY_ONLY',
          audit: {
            ...replay.audit,
            run_id: runId,
            actor: 'browser-local-simulated',
            started_at: startedAt,
            finished_at: finishedAt,
            transitions: [
              {state: 'QUEUED', at: startedAt},
              {state: 'RUNNING', at: startedAt},
              {state: replay.run_state, at: finishedAt},
            ],
          },
          limitations: [...replay.limitations, 'This invocation ran in the browser against a fixed public fictional fixture; no custom data was uploaded and no sensor, MCP tool, model or operational system was called.'],
        };
      } else {
        const response = await fetch(`/training-api/v1/${workflow}?scenario=${encodeURIComponent(scenario)}`, {signal: controller.signal, credentials: 'omit', cache: 'no-store'});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        value = await response.json();
        const run = value?.result;
        const mode = workflow === 'replay' ? 'REPLAY' : 'SIMULATED';
        if (!run || !['SUCCEEDED', 'FAILED', 'BLOCKED', 'CANCELED'].includes(run.status) || run.dataMode !== mode || run.executionKind !== 'DETERMINISTIC' || typeof run.runId !== 'string' || !Array.isArray(value.audit) || !Array.isArray(run.limitations) || !Array.isArray(run.inputRefs) || value.scenario !== scenario || value.storageScope !== 'REQUEST_ONLY') throw new Error('Invalid result');
      }
      payload = value;
      result.textContent = JSON.stringify(value, null, 2);
      state.textContent = localEastGate
        ? `SUCCEEDED · SIMULATED · Deterministic browser-local replay. Run ${value.run_id}; no data was sent.`
        : `${value.result.status} · ${workflow === 'replay' ? 'REPLAY' : 'SIMULATED'} · Deterministic fictional training. Inspect returned run state, evidence and limitations below.`;
      download.disabled = false;
    } catch (error) {
      state.textContent = `FAILED · ${error.name === 'AbortError' ? 'Request timed out.' : 'No successful result returned.'} No operational action occurred. Try again or visit support.`;
    } finally {
      clearTimeout(timeout);
      busy = false;
      syncButtons();
      select.disabled = false;
      panel.setAttribute('aria-busy', 'false');
    }
  });

  download.addEventListener('click', () => {
    if (!payload) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = payload.fixture_id === 'east-gate-ambiguity-v1'
      ? 'airradius-east-gate-ambiguity.json'
      : `airradius-training-${workflow}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
