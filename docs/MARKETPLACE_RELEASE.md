# AirRadius marketplace implementation — 2026-10-06

The public website now has a bounded training integration for the current ChatGPT/Codex plugin directory and a separate GPT Store build kit. Neither package is submitted, approved or publicly listed. No GPT was created. Backend execution remains deterministic; no external model, paid API, schedule or operational action runs.

## Implemented surfaces

The existing public site keeps its homepage, founder page, card, demo and phone pilot planner. `/connect/` adds manual fictional preset selection, three workflow buttons, actual run/evidence output and JSON download. `/mcp` provides stateless Streamable HTTP behind Sites-managed connection authentication; anonymous production MCP requests return401. `/training-api/v1/correlate`, `/handoff`, `/replay` provide the matching public read-only GET Actions. The two presets are fixed fictional exercises. Unexpected arguments, private input and LIVE values are denied. Every invocation receives a fresh runtime, run ID and request-only audit. Private CEO/pilot/growth/API routes, dotfiles and repository instructions are denied before static asset delegation.

The publisher-provided domain challenge can be served as exact plain text using the Worker `OPENAI_APPS_CHALLENGE` binding. It is intentionally not configured: no portal token exists in this build. No domain ownership claim is made.

`marketplace/plugin/` is the portable ZIP source: root plugin.json/mcp.json, three bounded skills, approved branding and five positive/three negative review prompts. `marketplace/gpt-store/` contains instructions, fictional handbook, Builder metadata and three focused OpenAPI Actions. These files contain no private records or credentials. The listing excludes proposed paid pilots and subscriptions.

## Reproduce

From the primary repository: `npm ci`, `npm test`, `npm run test:marketplace`, `npm run build`, `npm run build:marketplace`, `node scripts/build-gpt-kit.mjs`, `npm run check:release`. `node scripts/check-marketplace.mjs` additionally needs the canonical Agent Plugins schemas downloaded into the ignored `marketplace/vendor-schemas/` folder from the exact schema URLs in plugin.json/mcp.json.

`npm run start:marketplace` previews the bundled Worker and real public assets. Run `node scripts/marketplace-browser-check.mjs`, `node scripts/verify-marketplace.mjs`, existing `npm run test:browser` and `node scripts/pilot-browser-check.mjs`. Set BASE_URL and OUTPUT_DIR for production checks. For the hosted public API, `node scripts/verify-marketplace.mjs --actions-only` runs actual scenarios and verifies denial while managed MCP installation/consent is pending. Local SDK checks do not prove a connected remote client. `node scripts/record-marketplace.mjs` records actual browser execution; it does not record or validate a ChatGPT conversation.

The mixed Sites artifact contains client static files, server/index.js and .openai/hosting.json declaring the existing public project and MCP capability. Private D1 migrations, authentication code, records and financial model were not copied. No private Site deployment is changed.

## Verification scope

Local baseline: 23 unit tests, 15 SDK/HTTP/Actions tests, 34 marketplace browser checks, 54 existing public regressions, and 19 phone planner checks passed. The official portable plugin/MCP JSON schemas validate. OpenAPI operation mapping, metadata limits and references validate; GPT Builder import is pending. All three output envelopes validate against the supplied result contract. The Worker runs with dynamic code generation disabled. Dependency audit reports zero known vulnerabilities; the lockfile inventory resolves 156 package licenses including optional platform packages, with zero public frontend runtime dependencies and 95 server runtime dependency entries. The minified server bundle is approximately 790 KB; the lockfile inventory is not the bundle inventory.

Checks found and repaired the shared motion toggle's visible/accessibility label mismatch and an overly broad private-pilot rule that denied `/js/pilot.js`. Failed pre-fix reports are retained separately; final checks passed. Signature/path checks are bounded and are not exhaustive binary secret forensics. Physical iPhone, assistive-technology usability, performance/load testing, real ChatGPT installation, natural-language reviewer behavior, GPT Builder import and directory scans remain unverified.

## Submission gates

Verified developer identity and publishing permissions; actual public support contact; portal domain-verification token; confirmed platform logging/retention and final policy text; actual ChatGPT positive/negative reviewer conversations; category/account UI confirmation; and the directory's complete-product quality review remain required. Current educational scope does not establish review eligibility; trial/demo plugins are excluded by official guidelines. Public browser/SDK test evidence is not a ChatGPT model/refusal test.

Current GPT Help says personal Free/Go/Plus/Pro accounts cannot create or publish new GPTs. Managed-workspace settings and roles determine eligibility; existing eligible GPTs can be edited. No account fact has been verified for this user. Custom GPT retirement is planned for affected Enterprise workspaces on December 11, 2026, with other account notices potentially differing. Do not purchase an account upgrade to work around this without explicit approval.

Sources checked: https://developers.openai.com/plugins/deploy/submission ; https://developers.openai.com/plugins/plugin-guidelines ; https://help.openai.com/en/articles/8798878-sharing-and-publishing-gpts ; https://developers.openai.com/api/docs/actions/production .

## Rollback

Public pre-marketplace baseline: source f651903ae549a08ea752d246e1c7b74501ff3fe9, saved version appgprj_6ac3cf0a56f08191a3faa14504a6bfd7~appgver_54a42b728230819189095f38c70f9794, deployment appgdep_6ac5486b3a3c819181f99f5dcf4e6c3e. Redeploy that saved version on the same public project to remove training endpoints and restore version10. Keep the audience unchanged. Primary source baseline f5efe21f4a1963bf8b98aca9d663827eb75f1892 can be restored through a new revert commit; do not force-push. Native plugin connection/provisioning is separate from HTTP deployment; reconcile it after rollback rather than claiming it was automatically removed.

Vercel remains blocked by the confirmed Hobby commercial-use restriction. No upgrade, provider switch or primary-domain migration was performed. The existing Sites host supplies the training endpoint explicitly.
