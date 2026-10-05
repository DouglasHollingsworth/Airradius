# State and source register
Prepared 5 October 2026. Recheck live state in Codex before relying on it.

## Fresh connected reads in the preceding task
- GitHub `fetch` of `DouglasHollingsworth/Airradius` main tree returned SHA `29622d13895d78c32d0a687607e6216956cfcfff`, `README.md` (11 bytes) and `index.html` (2,699 bytes).
- GitHub `fetch_file` for `index.html` returned blob SHA `2e082b103e85792bc074ec23fe496143cda7ac92` and the earlier simple text landing page.
- Vercel `get_project` for `prj_TgJSMv6M1Ffvj2fNfZMLBiFi6u9Q` returned latest deployment `dpl_9kV2cdG4VRC7f4MX5Sz68rDSRnMD`, READY/production, plus the `airradius.vercel.app` alias. It also returned `live: false`; interpret that field through current platform documentation rather than using it alone to infer reachability.
- The same Vercel read returned SSO protection enabled with `deploymentType: all_except_custom_domains`. Neither public availability nor private-route denial was browser-tested for this handoff.
- The two visual references were actual mounted PNG files in the current conversation. They were copied unchanged into this package; no new design approval is needed.
- No repository writes, hosting mutations, agent installations, job schedules or paid-service changes were performed to prepare this package.

## Historical records, not freshly proven deployment state
- Earlier public ChatGPT Sites project `appgprj_6ac3cf0a56f08191a3faa14504a6bfd7` and private showcase `appgprj_6ab3050890fc8191a5bec2be102df7ce` were described earlier in this conversation.
- Earlier history describes CEO/pilot routes and two database tables. Verify source, access and schema before touching them. Do not trust earlier success wording as a test result for current code.
- `Douglas_Agent_Team_Inventory.html`, retrieved from the user's Library, describes 32 saved workflows, 20 historical teams and 114 mapped responsibilities. It explicitly distinguishes on-demand definitions from running external services and preserves AirRadius/Jarvis separation.
- `AirRadius_CEO_Launch_Book.md`, retrieved from conversation files, describes an owner-private alpha and browser-local simulated MOC. Live sensors, authenticated multi-user access, extra adapters, external attachments and tamper-proof records were not established. Pilot prices/targets are hypotheses and must not appear as verified customer results.

## Primary technical sources consulted
1. OpenAI, Custom instructions with AGENTS.md:
   https://developers.openai.com/codex/guides/agents-md
   Currently redirects to https://learn.chatgpt.com/docs/agent-configuration/agents-md
   Basis: persistent project guidance; inspect/merge existing instruction hierarchy.
2. OpenAI, Subagents:
   https://developers.openai.com/codex/subagents
   Currently redirects to https://learn.chatgpt.com/docs/agent-configuration/subagents
   Basis: project-local standalone `.codex/agents/*.toml` definitions requiring name, description and developer_instructions; model omission inherits configuration; current concurrency setting is `agents.max_concurrent_threads_per_session`. Local version compatibility still needs verification.
3. Vercel, Hobby plan:
   https://vercel.com/docs/plans/hobby
   Basis: current published personal/non-commercial restriction. Presentation-only does not prove eligibility. Do not purchase or change plan automatically.
4. Vercel deployment docs for implementation-time verification:
   https://vercel.com/docs/deployments
   https://vercel.com/docs/deployments/git/vercel-for-github
   Re-read during release; this package does not assert an authenticated deployment command was executed.

## Truth hierarchy
Current source/tests and authenticated platform responses outrank stale conversation summaries. User-approved images determine visual intent, not facts, contact channels or legal authority. Definitions are not installations; installations are not executions; local success is not a live deployment; synthetic/replay evidence is not live sensor performance.
