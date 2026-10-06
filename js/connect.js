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
  for (const button of buttons) button.addEventListener('click', async () => {
    const scenario = select.value;
    if (!['duplicate-and-delay', 'separated-observations'].includes(scenario)) {
      state.textContent = 'FAILED · Unsupported training preset.';
      return;
    }
    workflow = button.dataset.training;
    payload = null;
    download.disabled = true;
    buttons.forEach(item => { item.disabled = true; });
    select.disabled = true;
    panel.setAttribute('aria-busy', 'true');
    result.textContent = '';
    state.textContent = 'LOADING · Requesting a deterministic fictional training result.';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`/training-api/v1/${workflow}?scenario=${encodeURIComponent(scenario)}`, {signal: controller.signal, credentials: 'omit', cache: 'no-store'});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const value = await response.json();
      const run = value?.result;
      const mode = workflow === 'replay' ? 'REPLAY' : 'SIMULATED';
      if (!run || !['SUCCEEDED', 'FAILED', 'BLOCKED', 'CANCELED'].includes(run.status) || run.dataMode !== mode || run.executionKind !== 'DETERMINISTIC' || typeof run.runId !== 'string' || !Array.isArray(value.audit) || !Array.isArray(run.limitations) || !Array.isArray(run.inputRefs) || value.scenario !== scenario || value.storageScope !== 'REQUEST_ONLY') throw new Error('Invalid result');
      payload = value;
      result.textContent = JSON.stringify(value, null, 2);
      state.textContent = `${run.status} · ${mode} · Deterministic fictional training. Inspect returned run state, evidence and limitations below.`;
      download.disabled = false;
    } catch (error) {
      state.textContent = `FAILED · ${error.name === 'AbortError' ? 'Request timed out.' : 'No successful result returned.'} No operational action occurred. Try again or visit support.`;
    } finally {
      clearTimeout(timeout);
      buttons.forEach(item => { item.disabled = false; });
      select.disabled = false;
      panel.setAttribute('aria-busy', 'false');
    }
  });
  download.addEventListener('click', () => {
    if (!payload) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = `airradius-training-${workflow}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
