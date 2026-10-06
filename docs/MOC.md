# Public fictional operations exercise

`/demo/` exposes only fictional SIMULATED/REPLAY observations and browser-local case actions. AIR/RF/GEO/INTEL/MOC/ADAPTERS/HISTORY views retain unknown identity, source IDs, observation versus ingestion time, delayed ingestion and relative freshness. No live feed, model, private API or authenticated multi-user behavior is implied.

Notes, assignment labels, close/reopen, replay, reset, JSON import and export work locally. Assignee labels do not change the exercise owner or authenticate another user. New actions increment case version; handoff approval uses runtime draft signature/version checks. Workflow history is session memory; case history uses localStorage `airradius-public-fictional-v1`. Neither is tamper-proof. Reset resets the case and retains session workflow audit.

Import accepts a direct case object matching `js/runtime.js` validateCase: id, version, owner, state, dataMode SIMULATED/REPLAY, fictional true, 1–100 observations and at most 100 actions. File and text maximum is 64 KB. Extra fields, malformed timestamps, duplicate IDs and unresolved evidence reject. Never import private/personal/customer records. The exported wrapper contains `case` and `runAudit`; to re-import, extract its case object. No data is sent by this page.

Three buttons execute Event Correlator, Operator Handoff Coordinator and Replay/AAR Analyst through the deterministic runtime. Status, evidence, limitations, audit, cancellation and failed-validation fixture are displayed from actual results. The handoff button creates a draft; a separate human approval adds a fictional action without sending anything. New model calls, schedules, sensors and outbound actions remain absent.

Safe source concepts recovered from older v0.4 MOC: common picture, source uncertainty, journal actions, handoff review, replay and AAR. This bounded public exercise does not replace the richer existing private consoles or migrate their database. Those retain their separate hosting/authentication boundary.

Run `node --test tests/demo.test.mjs`. Browser checks must verify console tabs, action cycle, slider, workflow buttons, cancellation, failed validation, stale handoff approval, reset/import/export and mobile overflow.
