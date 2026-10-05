# Backup and rollback

Primary baseline: commit `29622d13895d78c32d0a687607e6216956cfcfff`, local tag `airradius-before-takeover-20261005`; prior production deployment `dpl_9kV2cdG4VRC7f4MX5Sz68rDSRnMD`. Working branch `codex/airradius-takeover`. No force push. Keep previous deployment until the new release passes signed-out verification.

For an authorized Vercel release on an eligible plan, deploy the tested branch as preview, verify its routes/headers/exports, then promote that exact deployment. Record the deployment ID. Roll back by promoting the recorded prior deployment with Vercel's rollback action; do not rebuild different source and call it the same artifact. No Vercel publication is authorized under the current confirmed Hobby business-use constraint.

To undo source changes, create a revert commit or branch from the baseline; review and push normally. Do not rewrite shared history. Portable static build and source archives are supplied independently of hosting.

Secondary public Sites baseline: version 2, source `119d5b968237a9eec02992e5572c177989dd46c5`, deployment `appgdep_6ac3e393bcd08191a05471b18896a5e9`. Private showcase baseline: version 7, source `87999fe3af483a3eb51ab09d2aaad2faa7832eb3`, deployment `appgdep_6ac3c630f3148191884b3cb222bdcdf1`. Restore/redeploy the saved preceding version using the same project and audience. Keep private sources and artifacts outside public GitHub.

No database migration or row export is part of this change. Binding DB and tables airradius_records/airradius_journal are retained. Do not restore a source archive over live database data. A database backup/recovery drill is not performed here; require one before any future destructive schema change.

Browser-local demo records can be exported before reset and re-imported from the export's `case` field. Test imports in a nonproduction browser profile. History is mutable and is not forensic/tamper-proof evidence.

Retention: fictional case stays on the device until reset/browser clearing; runtime audit stays in the page session and optional user export. No new telemetry or server retention policy is introduced. Existing private journal retention is preserved.
