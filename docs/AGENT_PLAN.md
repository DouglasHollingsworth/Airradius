# AirRadius agent plan

## Build-time Codex team
The primary session is coordinator. Seven supplied profiles divide work without creating seven always-on workers. Spawn only what the current phase needs, no more than three concurrently. Profiles inherit the available model rather than hard-code a model the user's plan may not provide.

| Profile | Responsibility | Required evidence |
|---|---|---|
| airradius_source_architect | Recover current source, working features, boundaries and deployment | Source/route map, baseline, scoped implementation decisions |
| airradius_brand_frontend | Faithfully implement approved branding, public pages and digital card | Desktop/mobile browser screenshots and interaction checks |
| airradius_moc_workflows | Preserve private workflows and create isolated fictional public demo | Scenario tests, source labels, persistence/access findings |
| airradius_agent_runtime | Implement on-demand operational helpers and run tracking | Executed success/failure fixtures and schema/approval tests |
| airradius_security_review | Independent read-only review of data, permissions, supply chain and claims | Reproducible prioritized findings; no site mutations |
| airradius_qa_validation | Independently test actual UI/flows and visual fidelity | Commands/results, viewport screenshots, defect list |
| airradius_release_engineer | Package, deploy permitted tested artifact and verify URLs | Commit/deployment IDs, signed-out checks, rollback path |

Install/merge project TOML files only after checking the local Codex version and its supported schema. `config.example.toml` is intentionally not automatically active. Preserve existing settings and platform permissions. The local file validator checks structure, not successful loading or execution in Codex.

## Existing AirRadius operational team to preserve
The retrieved Douglas Agent Team Inventory contains these eight roles under AirRadius Operations. Their historical skill mappings are names to verify in the actual runtime, not evidence of deployed functions.

| Existing role | Keep this purpose | Initial application status |
|---|---|---|
| Digital MOC Coordinator | End-to-end common picture, prioritization and operator coordination | Specify/reuse; not falsely online |
| Sensor Fusion Analyst | Normalize evidence and retain provenance/uncertainty across sources | Specify/reuse; connected adapters must be tested |
| RF/EM Awareness Analyst | Explain observed radio activity and its identification limits | Specify/reuse; no unsupported emitter identity |
| Geospatial Analyst | Site/radius/track context with CRS, source dates and uncertainty | Specify/reuse; not surveyed accuracy |
| Event Correlator | Find possible relationships/duplicates with supporting evidence | IMPLEMENT FIRST |
| Operator Handoff Coordinator | Draft case owner, state, evidence, gaps and next action | IMPLEMENT FIRST |
| Replay/AAR Analyst | Reconstruct event/decision history and draft after-action review | IMPLEMENT FIRST |
| Open-Source Integration Scout | Qualify a small integration shortlist: license, maintenance, access, adapter proof | Specify/reuse; not a claim of integration |

Counter-UAS Market Intelligence remains a linked research workflow, including vendor, authority, fixed-site, training/sustainment and opportunity analysis. Reuse it rather than duplicate existing user-wide roles. No supplier relationship, API license, procurement eligibility or mitigation authority is implied by a research note.

## First three application workflows

### Event Correlator
Input: one owner-authorized case or fictional demo fixture and schema-validated observations. Output: correlation hypotheses, duplicate groups, conflicting/stale/missing sources, evidence references and uncertainty. Keep original observations unchanged. Explain deterministic matching rules; a confidence value must be defined and not represented as a calibrated probability without validation.

Tests: duplicate IDs; same-time but different locations; delayed ingestion; missing identity; contradictory sources; stale feed; untrusted text attempting to override instructions. No autonomous case-state change or external action.

### Operator Handoff Coordinator
Input: case, event evidence and recorded actions. Output: concise briefing covering current state, observed facts, unknowns, responsible owner, next action, priority rationale and referenced evidence. A draft is not an accepted handoff. Show the diff and require the current authorized human to approve any persisted consequential change, with optimistic-concurrency/version handling.

Tests: no assigned owner; reopened case; stale draft after a new note; conflicting action history; unresolvable evidence reference; unauthorized case; canceled run. No automatic email or message send.

### Replay/AAR Analyst
Input: time-ordered permitted observations and action history. Output: timeline, decisions, unresolved points, lessons explicitly distinguished from observed results, and exportable references. Preserve original observation versus ingestion timestamps. Deterministic report generation is acceptable and must be labeled as such.

Tests: out-of-order ingestion; missing timestamp; cross-time-zone input; ambiguous identity; duplicated note; insufficient history; case closed then reopened. Never fabricate an event, a causal finding or a performance improvement.

## Runtime requirements
A server-side authenticated boundary is required for real private/model-backed work. Public fictional deterministic examples can run locally in the browser and must be labelled. Never embed API keys in JavaScript. Add real queue/worker infrastructure only if required by execution duration; start with bounded on-demand runs.

Separate role capability from observed execution status. A role can be NOT IMPLEMENTED or NOT CONFIGURED. A job moves through QUEUED → RUNNING → SUCCEEDED/FAILED/CANCELED/BLOCKED. Logs identify run, case, role, engine, version, timestamps, error and usage. Cost unknown must remain null/unknown. Expose retry/cancel only where actually supported; include idempotency and no duplicate writes.

The supplied JSON registry and result schema are starter contracts. Runtime code must validate them, resolve references against authorized source records, and enforce permissions independently. Prompt instructions are not a security boundary.

Keep all new schedules, outbound actions and paid-model use disabled until explicitly approved. No claim that saved ChatGPT skills are automatically available inside a deployed app. Map or implement the needed behavior and demonstrate it.
