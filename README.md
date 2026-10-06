# AirRadius

Responsive public presentation, digital contact card and fictional on-demand operations demo. Static HTML/CSS/ES modules; no runtime server, external models, analytics, paid APIs, live sensors or schedules.

## Run

Node 24: `npm ci`, `npm run build`, `npm start` (http://127.0.0.1:4173).
Run `npm test`, `npm run check:release`, `npm run test:browser`, and `npm audit`.
Browser checks use installed Chrome by default; configure `CHROME_PATH` if needed. Results and screenshots are written to the task outputs folder by the supplied harness. All dependencies are build/test-only and locked.

## Public boundary

Build copies an explicit public allowlist into a clean `dist/`. CEO/pilot records, server credentials, instructions, specifications and private Sites source are excluded. Public case owner labels enforce fictional exercise logic, not authentication. Public missing-route tests prove there is no private surface here; they do not prove authorization in another application.

The demo accepts bounded, labelled fictional SIMULATED/REPLAY JSON only. No LIVE source exists. Case persistence is localStorage; run audit is session memory. Reset clears the fictional case; exports carry evidence and mutable history. See docs/MOC.md and docs/RUNTIME.md.

## Release

Canonical target: https://airradius.vercel.app. The current team is Hobby (owner-confirmed). Production publication of this business site on that plan is blocked pending an eligible account decision; no upgrade or provider switch was performed. Local build success is not a Vercel deployment.

Existing AirRadius Sites projects remain separate, preserving their audiences and data. See docs/ROLLBACK.md and the release report for actual published versions.


Phone and commercial additions (6 October 2026): /start/ creates a nonbinding proposed pilot brief; public receiving contact is unconfigured until owner supplied. iPhone Safari Share → Add to Home Screen provides a web shortcut; network required. Current About/card changes from Sites version 8 were preserved. Private CEO financial planning and internal business documents remain outside this repository. See docs/COMMERCIAL.md.
