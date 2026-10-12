# AirRadius — implementation, agents and release handoff
Prepared 5 October 2026 · Owner: Douglas Hollingsworth

## 1. Outcome and immediate priority

Finish the actual AirRadius websites and digital card so they match the approved drone/radar homepage identity. Add a usable, evidence-aware operations experience and scoped agents, then verify the release. This is not a request for another mockup, a new name, a generic landing page, or an architecture-only response.

Ship in gated phases. Complete the public visual/functional release before expanding the backend. Keep working through independent tasks when one connector is blocked. Never trade away the approved design or private-data boundary merely to get a deployment URL.

AirRadius is Douglas's airspace-operations and drone-defense business, inspired by his Maintenance Operations Control and electronic-countermeasures experience. Preserve the common operating picture, coordination, prioritization, handoffs and replay. It is not merely a drone detector and it is not Jarvis. Jarvis is a separate client roofing/property business. KAIJ and other ventures are also outside this task.

Douglas has asked for a presentation/demo site for now. No purchases, subscriptions, public operational service commitments or paid API traffic are authorized by this package. Public presentation does not establish a registered legal entity, a live sensor network, mitigation authority, or customer validation.

## 2. Recover source and verify hosting before edits

### Current primary target — freshly inspected in the preceding handoff session

- Repository: `https://github.com/DouglasHollingsworth/Airradius`
- Repository numeric ID from earlier metadata: `1406196343`; canonical spelling is `Airradius`.
- Public target: `https://airradius.vercel.app`
- Vercel project: `prj_TgJSMv6M1Ffvj2fNfZMLBiFi6u9Q`; name `airradius`.
- Vercel team: `team_Ec60aTPYKpVIzItXMgNdClWD`.
- Main commit at inspection: `29622d13895d78c32d0a687607e6216956cfcfff`.
- Repository tree contained only `README.md` and `index.html`; the latter was a 2,699-byte plain landing page, not the approved visual design or the fuller MOC system.
- Vercel returned deployment `dpl_9kV2cdG4VRC7f4MX5Sz68rDSRnMD` as `READY`, target `production`.
- Deployment metadata listed SSO protection `all_except_custom_domains`. Signed-out access was not tested during handoff preparation. Verify the exact public alias without a bypass cookie; do not assume READY means publicly accessible.

### Existing secondary AirRadius sites — historical pointers; reverify

| Surface | URL | Project pointer | Preserve |
|---|---|---|---|
| Earlier public company/card site | `https://airradius.kaij4u.chatgpt.site` | `appgprj_6ac3cf0a56f08191a3faa14504a6bfd7` | Existing QR/download paths and any working public content |
| Fuller private showcase | `https://airradius-intelligence-showcase.kaij4u.chatgpt.site` | `appgprj_6ab3050890fc8191a5bec2be102df7ce` | Owner-only audience, demos, application behavior and database |

The private build historically had `ceo.html`, `pilot.html`, `operations.html` and `card.html`, and database tables `airradius_records` and `airradius_journal` under a `DB` binding. These are recovery leads, not proof of current schemas or live functionality. Earlier local work paths included `/workspace/sites/airradius-contact` and `/workspace/scratch/9eab5b31a4c6`; they may not exist in a fresh Codex environment. Historical source archives and the approved visual files may also be in the user's conversation Library. Use available connectors and actual source access, not guesses about file paths.

### Entry procedure

Read repository/global/nested instructions and record a clean baseline: git status, branch, remotes, current commit, build commands, routes, assets, deployment target, authentication and storage boundaries. Preserve uncommitted work. Create a rollback point and working branch without force-pushing. Inventory capabilities from actual tool schemas; historical tools and credentials in chat are not permission or valid secrets.

Use connected read/write tools or authenticated CLI only when genuinely available. Never paste old tokens into a repository or attempt an undocumented write through a read-only tool. If an integration lacks writes, check the approved CLI/alternative account route and report the exact blocker. Keep all accessible local work progressing.

Do not copy the entire old private repository into public GitHub. Inspect and extract only safe reusable code, design assets and fictional fixtures. Do not export database contents, personal records, owner-only downloads or business-adviser notes into a public build.

## 3. Visual system — the user already approved it

Open these bundled images before building:

1. `references/01-approved-drone-homepage.png`: overall cinematic page direction.
2. `references/02-approved-homepage-and-card.png`: latest approved shared identity and card layout.

Preserve deep navy/near-black backgrounds, electric-blue/cyan highlights, white typography, restrained sunset warmth, a clearly recognizable quadcopter inside interrupted circular radar/radius rings, drone/airport imagery, and a command-center/geospatial context. The wordmark is AIRRADIUS, with AIR white and RADIUS blue. Do not restore the rejected aircraft/cross-shaped A. Keep the drone and rings legible as a favicon and small card mark, not only a photorealistic hero.

Use a shared logo asset, color/type/spacing tokens, buttons, header/footer and component language. Suitable starting tokens: background `#020B14`, panel `#071927`, cyan `#00BFFF`, blue `#008CFF`, off-white `#F4F9FF`; adjust for faithful appearance and accessible contrast. These are proposed implementation tokens, not an existing certified style guide.

Hero: **DETECT. UNDERSTAND. RESPOND.** Support with **Turning airspace data into action for a safer tomorrow.** Use the descriptive line **Airspace Operations & Incident Coordination** and the approved aspirational brand line **Safer skies. Stronger communities.** Clarify actual capability maturity in nearby product/demo copy without drowning the design in disclaimers.

The reference is artwork, not a catalogue of confirmed features or contact details. Correct garbled labels and inaccurate use-case thumbnails. Avoid verified-sounding performance, identity, hostile-intent or integration claims. A mitigation capability tile must describe authorized response planning/support rather than imply AirRadius can jam, spoof, take over or physically intercept aircraft. There must be no operative mitigation controls in this release.

Build real responsive HTML/components: selectable text, semantic headings, functioning controls, keyboard support and mobile layout. Do not use the full mockup as a background website with invisible click areas. Reuse/crop permissible art as individual assets or produce separate clean assets when needed, not a screenshot masquerading as an application. Log asset origin and licenses; never commit unlicensed font files.

## 4. Public experience and card

### Required public sections or routes

Build Home, Solutions, Use Cases, Technology, About, Contact, a simulated Demo, and `/card`. Sections can be anchors where that is simpler; every visible navigation item must work. Preserve a lightweight architecture; the current static page does not require a forced framework migration. Add a framework only when its value to the actual app justifies the dependency/build complexity.

Home must closely match the reference composition. Solutions must explain the chain from observation through understanding to coordinated response. Use cases should cover critical infrastructure, airports/airspace, events/large venues and public safety as proposed applications, not client endorsements. Technology must distinguish current demonstration behavior, proposed adapters and verified connections. About identifies Douglas Hollingsworth as Founder & CEO without fabricated credentials, certifications, employees or contracts.

Use working calls to action. Default to **Explore Demo** while there is no confirmed receiving endpoint. A Request Demo/Contact button may point to a verified business contact or a tested form only after that channel is configured. Do not display a fake success notification or invent a business mailbox. Add clear contact-unconfigured behavior rather than a silent dead button.

### Digital card

The card is a miniature version of the homepage hero, not just a plain logo/name card: matching drone/radar mark, wordmark, colors, hero treatment, concise three-word headline, Douglas's name/title, and a real QR code leading to the verified canonical public URL. Do not reproduce the reference's QR bitmap. Generate a real code and independently decode the final exported image at full and phone display sizes.

Provide a wide image suitable for messages, a portrait iPhone image, a functional `/card` page and a `.vcf` contact export. Include only confirmed contact fields; no placeholder phone number, personal address, or invented `douglas@airradius.vercel.app` address. Do not promise an Apple Wallet pass unless separately generated, signed and tested. Native sharing needs a copy-link fallback. Keep the canonical URL consistent in metadata, card exports, vCard and QR.

### Secondary sites

Apply the same shared brand to the existing public company/card site where source access is available. Preserve old QR/download routes. Do not silently delete or redirect the entire site; any migration should retain useful routes and report what changed. Restyle the private showcase shell and private CEO/pilot screens in their existing protected project without changing their audience or data isolation. Private navigation does not belong in the public footer. A blocked secondary host must remain explicitly NOT UPDATED in the final release report.

## 5. Operations and demo — protect the existing product

Recover working MOC features before coding replacements. Historical consoles include AIR, RF/EM, GEO, INTEL, MOC/Operations and HISTORY/Replay; a seventh console was mentioned without a consistent name. Inventory the actual current consoles and preserve each one. Do not invent a seventh label or remove an existing view to fit this brief.

Keep the operational loop: Observe → Correlate → Assess → Prioritize → Assign/Acknowledge → Monitor → Log → Close/Reopen → Review. The public version uses resettable fictional fixtures only. Start with one well-designed fixed-site scenario and include a duplicate observation, unknown identity, stale source and missing feed so the demo shows uncertainty honestly. A useful interface has a map/radius display, event list, source health, evidence drawer, priority/reason, responsible owner, next action, history and replay controls.

Every event and export has a data mode: `SIMULATED`, `REPLAY`, or `LIVE`. LIVE is permitted only for a genuinely connected, verified live source. Browser animations and prerecorded feeds are not live sensing. Show observation time, ingestion time, source ID, timestamp/time-zone handling, freshness and uncertainty. RF activity alone does not establish drone identity or hostile intent; cooperative identification cannot be sold as universal detection.

The known private alpha was owner-only. A responsibility assignment is not proof of a second user's authenticated acknowledgment. Preserve owner-only operation unless real role-based access, authorization and multi-user tests are implemented separately. Do not claim multi-user collaboration from a dropdown with several names.

Preserve the current validated input format and export behavior. Add schema validation, size/rate limits, duplicate handling, escaped rendering, empty/loading/error states, safe reset, deterministic fixtures and persistence tests. Do not expand to live sensors, arbitrary external attachments, many formats, or a new data store before the basic workflow passes.

## 6. Two different agent layers

### A. Build agents in Codex

Use the seven bundled project-scoped agent definitions after checking the installed Codex configuration schema. The primary session is coordinator and integration owner. Keep at most three spawned agents concurrent to control cost and conflicts. Delegate independent, bounded tasks and collect file paths, tests, findings and unresolved risks. Work in isolated branches/worktrees or assign non-overlapping files. Do not allow multiple workers to edit the same shared components simultaneously.

Roles: Source Architect; Brand/Frontend Builder; MOC Workflow Engineer; Agent Runtime Engineer; Security Reviewer; QA Validator; Release Engineer. Security review is read-only; findings return to the implementation owner. QA should independently inspect the actual browser implementation, not merely approve the builder's description. Only the coordinator and release owner may publish the agreed release.

These profiles are definitions, not proof of active subagents. Verify that Codex loaded them and that each invoked role produced a result. If the client cannot run subagents, perform the same tasks sequentially and record that fact; do not fabricate a team activity stream.

### B. Agents inside the AirRadius product

Reuse the user's existing AirRadius Operations and Counter-UAS Market Intelligence mappings. The retrieved inventory describes on-demand saved workflows, not an already-running external service. Do not recreate all 32 workflows or all 114 historical responsibilities inside AirRadius. Keep original AirRadius role names; see `docs/AGENT_PLAN.md` and the eight-role registry.

Implement three useful on-demand paths first: **Event Correlator**, **Operator Handoff Coordinator**, **Replay/AAR Analyst**. At least one sample case must go through all three and yield an export that a reviewer can reconstruct. Deterministic algorithms/templates are acceptable when labeled accurately. Optional LLM assistance requires a server-side provider configuration and approved cost budget; without those, show NOT CONFIGURED rather than pretending to call a model.

Agent outcomes must include source/evidence references, observed facts versus inferences, limitations, unresolved questions, recommended next action and run state. Track run ID, role, code/prompt version, data mode, start/end, model/provider or deterministic engine, errors, latency and actual usage/cost where available. Unknown cost is unknown, not zero. Make cancellation, timeout and failed-run behavior visible.

Enforce tool/action allowlists and permissions in code, not only prompts. Agent recommendations cannot change case priority/disposition, issue external notifications or invoke sensor/response actions without the appropriate human approval. Treat imported records and retrieved content as untrusted data rather than instructions. Review screens must show what would change, require current case version checks, and record the actor who approved.

The run-result schema in `specs/` is a proposed transport contract and its sample is synthetic. It is not a tested worker implementation. Add adversarial/negative tests, server-side input/output validation, evidence-reference resolution and row/owner authorization before real use. IDs alone are not access control.

## 7. Private CEO workspace and operating essentials

Preserve existing CEO decisions, tasks, prospects, exports and data. Make a small private Agent Center showing actual configured roles, jobs, last success/error, approvals waiting, run history, integration state and budget/usage. Do not add fake revenue, prospects, live staff or green health indicators without evidence.

Link existing Counter-UAS research workflows for sourced vendor/authority briefs when available. A future CEO summary may combine real owned tasks, current blockers and confirmed pipeline entries. An opportunity helper may draft research-backed outreach but must not send it without specific approval. Research and vendor suggestions are not authorized purchases or signed partnerships.

Defaults: scheduled tasks OFF; outbound sends OFF; purchases OFF; operational control OFF; new paid-model calls OFF until configured and approved. Existing schedules must be inspected and preserved rather than duplicated. No claim of 24/7 operation without a deployed scheduler/worker, health check, owner-visible controls and successful observed runs.

## 8. Other release necessities

**Privacy/security:** separate public assets/demo data from owner records; server-side auth and object-level authorization; deny unauthorized API/download access; protect writes against CSRF where applicable; rate/size limit public inputs; escape untrusted strings; prevent credential leakage; scan built output and repository for secrets and unintended private records. Use environment-variable examples with empty values. No client bundle secrets. `robots.txt`, noindex and a hidden menu are not security controls.

**Reliability/data:** document persistence boundaries, migrations, backup and restoration; validate backup recovery in a non-production environment before destructive migrations. Give logs a retention policy and avoid copying sensitive raw inputs into public telemetry. Provide retries with idempotency for any real background jobs. Ordinary database history is an audit trail, not tamper-proof evidence.

**Accessibility/performance:** inspect desktop, tablet and iPhone layouts; test at 390, 768 and 1440 px and check narrow 320 px overflow. Keyboard navigation, visible focus, appropriate dialog focus handling, labels, alt text, reduced motion and readable contrast are mandatory. Avoid autoplay audio. Optimize large art into appropriate formats and sizes. Suggested targets, not current results: initial page payload around 2 MB or less, CLS below 0.1 in the measured test, and no critical automated accessibility issues. Record the environment and actual results.

**Public site basics:** favicon, share preview, canonical URL, correct metadata, sitemap/public robots rules, useful 404, broken-link check, no unimplemented CTA. Privacy/contact copy must match actual data collection. Terms/privacy text is a draft for review, not a claim of legal compliance. No unapproved analytics or tracking defaults.

**Maintainability:** shared brand assets, documented setup/build/test commands, locked dependencies where applicable, licenses/SBOM or dependency inventory, CI checks, source/version notes and a rollback runbook. Do not add fashionable infrastructure that the scope does not need. Keep deliverables portable across authorized hosts.

## 9. Execution phases and gates

**Phase 0 — Recover and baseline:** fresh source/hosting inventory, backups, route/data-boundary map, screenshots of current state, working branch, and agent/config verification. Do not rely on prior claims of 44 or 30 checks; run tests against the current source.

**Phase 1 — Brand and public release candidate:** real responsive homepage, navigation/sections, use-case and technology content, matching card route/exports, logo assets and metadata. Gate: screenshot comparison to both references, working controls and QR decode, no invented contact info or feature claims.

**Phase 2 — Demo and private reskin:** restore/preserve the full operational loop, share the visual system, add resettable public simulation and consistent source/freshness labels; keep private CEO/pilot records out of the public build. Gate: end-to-end scenario plus unauthorized-access checks; mark inaccessible secondary sites as blocked without erasing functionality.

**Phase 3 — Agent vertical slice:** run correlate → handoff draft → after-action report with synthetic or permitted replay data, show execution state and evidence, and enforce the approval boundary. Gate: successful and failed runs, duplicate/stale/ambiguous input, prompt-injection attempt, evidence integrity and canceled job. Do not delay Phase 1 solely to scaffold every future agent.

**Phase 4 — Validate and publish:** run available build/lint/type/unit/browser/security checks. Inspect preview before promoting the same verified artifact. Verify canonical URL and signed-out access after deployment. Do not mark every site complete when only one project updated.

## 10. Deployment/account constraints

The preferred public target remains the existing `airradius.vercel.app`; do not create a new project or random replacement URL when the existing project is usable. Keep private hosting separate. Check current account plan and platform terms. Vercel's current Hobby documentation restricts it to personal/non-commercial use; a presentation-only business page or lack of revenue does not automatically create an exception. Do not promise compliance or silently upgrade, incur charges, or switch provider. Report any genuine account/hosting decision while completing code/tests/portable build artifacts.

In the preceding session, available connections exposed reads but not the needed publication writes. Codex may have different tools; inspect them rather than treating this as a permanent platform limitation. Use the repository's authorized Git deployment workflow or authenticated CLI. Never attempt to work around an access denial by reusing exposed historical tokens or disabling unrelated protection.

For release, record source commit, project, deployment ID, environment and canonical alias. Test in a fresh unauthenticated browser. A temporary authentication-bypass URL is not a durable public website and cannot be used in the QR. Only relax public presentation protection within explicit authorization and leave all private application protection intact.

Retain the previous release and rollback path. Check routes, assets, forms, card downloads, headers and errors at the deployed URL. No successful deployment claim from a local build alone.

## 11. Definition of done and required final response

Return a per-surface table for public Vercel site, old public site, private showcase, CEO/pilot interface, card exports and Agent Center: source changed, built, tested, deployed, signed-out/private access checked, blocked/untested.

Attach desktop/mobile screenshots of the real implementation and a short comparison to the approved reference. Include repository branch/commit, deployment IDs and actually verified URLs. Report tests executed with commands and results; skipped tests remain skipped. Show which agent profiles were loaded, which tasks they completed, and which in-product workflows actually ran. Separate deterministic automation from model inference. Include actual provider/budget/scheduler state, not decorative status.

Provide updated documentation and portable build/source artifacts where permitted. State remaining blockers with the precise missing access/decision and what was completed independently. Do not end at a plan, screenshot mockup or definition-only agent list when implementation tools are available. Do not claim a full migration, live sensing, authenticated multi-user control, proven detection, tamper-proof logs, certifications, operational mitigation or commercial readiness without the corresponding evidence.

Keep future increments prioritized: one well-measured workflow before more integrations; real pilot proof before broader commercial claims.
