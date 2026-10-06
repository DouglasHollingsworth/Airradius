# AirRadius

Responsive public presentation, digital contact card and fictional on-demand operations demo. Static HTML/CSS/ES modules with a separate stateless training Worker for MCP and GPT Actions. No external model calls, application analytics, paid APIs, live sensors or schedules.

## Run

Node 24: `npm ci`, `npm run build`, `npm start` (http://127.0.0.1:4173).
Run `npm test`, `npm run check:release`, `npm run test:browser`, and `npm audit`.
Browser checks use installed Chrome by default; configure `CHROME_PATH` if needed. Results and screenshots are written to the task outputs folder by the supplied harness. Dependencies are pinned; the static frontend has no runtime dependencies, while the optional marketplace server bundles the official MCP SDK, Zod and a Worker-compatible schema validator.

## Public boundary

Build copies an explicit public allowlist into a clean `dist/`. CEO/pilot records, server credentials, instructions, specifications and private Sites source are excluded. Public case owner labels enforce fictional exercise logic, not authentication. Public missing-route tests prove there is no private surface here; they do not prove authorization in another application.

The demo accepts bounded, labelled fictional SIMULATED/REPLAY JSON only. No LIVE source exists. Case persistence is localStorage; run audit is session memory. Reset clears the fictional case; exports carry evidence and mutable history. See docs/MOC.md and docs/RUNTIME.md.

## Release

Canonical target: https://airradius.vercel.app. The current team is Hobby (owner-confirmed). Production publication of this business site on that plan is blocked pending an eligible account decision; no upgrade or provider switch was performed. Local build success is not a Vercel deployment.

Existing AirRadius Sites projects remain separate, preserving their audiences and data. See docs/ROLLBACK.md and the release report for actual published versions.


Phone and commercial additions (6 October 2026): /start/ creates a nonbinding proposed pilot brief; public receiving contact is unconfigured until owner supplied. iPhone Safari Share → Add to Home Screen provides a web shortcut; network required. Current About/card changes from Sites version 8 were preserved. Private CEO financial planning and internal business documents remain outside this repository. See docs/COMMERCIAL.md.

Marketplace additions: `/connect/` runs two built-in fictional training presets through three deterministic workflows. `npm run build:marketplace`, `npm run start:marketplace`, `npm run test:marketplace`, `node scripts/check-marketplace.mjs` and `node scripts/verify-marketplace.mjs` cover the separate server/package surfaces. See docs/MARKETPLACE_RELEASE.md for schema setup, actual evidence, remaining publisher/account gates and rollback. `marketplace/plugin/` is a portable directory package; `marketplace/gpt-store/` is a Builder/Actions kit. Neither is submitted, approved or installed by defining these files.
