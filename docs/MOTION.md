# Cinematic AirRadius motion

The public presentation, About, digital card, simulated demo and phone pilot scoping pages share `css/motion.css` and `js/motion.js`. Privacy and error pages use the same presentation controls. Quadcopter/radar artwork, the AIRRADIUS wordmark and DETECT. UNDERSTAND. RESPOND. remain the approved identity.

Animations are decorative: radar-radius breathing, drifting cyan light, slow image movement, short section entrances and interaction transitions. They do not represent live observations, sensor health, agent execution or business performance.

The document exposes `data-motion="running|paused|reduced"`. A visible 44px pause control persists only the boolean preference `airradius.motion.paused` in local storage. Hidden documents pause CSS motion. The operating system's reduced-motion setting always takes priority and disables continuous motion. Essential content remains visible without JavaScript. The card reuses its existing motion button, placed in a dedicated normal-flow control rail so it cannot cover card actions.

Validation commands:

```powershell
npm run build
npm test
npm run check:release
node scripts/browser-check.mjs
node scripts/pilot-browser-check.mjs
```

Browser checks accept `BASE_URL` and `OUTPUT_DIR` environment variables, allowing independent production verification without overwriting earlier release evidence. Motion verification separately samples actual animation time, checks pause/reduced-motion behavior and exercises keyboard/modal/navigation controls at narrow, phone, tablet and desktop widths. No frame-rate or physical-iPhone claim is made.

The private showcase uses its separate source and owner-only hosting boundary. Private HTML, records, financial planning documents, runtime credentials and database access are excluded from this public artifact. Its motion release preserves the existing Worker and database implementation.

Rollback: retain the pre-motion public source `6fdc256f77420c9cf6c2c7e419c70785b4114691` and previously saved Sites version 9. Re-publish the prior saved version for a hosting rollback; use a reviewed revert commit for source rollback. Do not force-push or migrate private data. Vercel business publication remains blocked by the confirmed Hobby account restriction; this change does not alter the plan or provider configuration.
