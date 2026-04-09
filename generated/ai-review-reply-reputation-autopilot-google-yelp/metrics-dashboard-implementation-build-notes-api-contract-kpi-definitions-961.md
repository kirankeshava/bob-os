# Metrics Dashboard Implementation (Build Notes + API Contract + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:54:28.718Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard and its supporting endpoints for the AI Review Reply & Reputation Autopilot MVP. The goal is to let a business owner or admin verify that ingestion → draft → approve → posted is working, spot sync issues quickly, and export a CSV for troubleshooting or sharing.

Routes
1) UI Page
- GET /app/admin/metrics
- Access: user must be a member of the selected Business (UserBusinessMembership)
- Filters:
  - Date range: start, end (defaults: last 14 days)
  - Location: locationId (optional; default: all enabled locations)
  - Timezone: tz (optional; default from Business settings; fallback UTC)

2) Metrics JSON API
- GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...&tz=...
- Returns a single JSON payload with sections:
  - syncHealth: list per location { locationId, name, source, enabled, lastSyncAt, lastError, lastErrorAt, lastSuccessfulSyncAt }
  - funnel: { ingested, drafted, approved, posted, rejected } counts for the range
  - responseTime: { medianMinutes, p90Minutes, sampleSize } computed only on posted items
  - alerts: { total, byType: [{type,count}], bySeverity: [{severity,count}] }
  - themes: top category labels for negative+neutral reviews (from persisted tagging)

3) CSV Export
- GET /api/admin/metrics.csv?start=...&end=...&locationId=...&tz=...
- Output: text/csv; UTF-8; includes a summary header section then row blocks:
  - FunnelSummary rows
  - SyncHealth rows
  - AlertsBreakdown rows
  - Themes rows

KPI Definitions (Canonical)
1) Ingested
- Review.createdAt within [start,end] AND (location filter if provided)
- Includes: Google sync reviews, manual CSV, email parse, OCR imports

2) Drafted
- DraftReply.createdAt within range AND associated Review matches location filter
- If multiple drafts per review: count distinct reviewId drafted in range for funnel; keep raw count available in API for debugging.

3) Approved
- DraftReply.approvedAt within range
- Approval is blocked by guardrails if PII/banned phrases are detected; those attempts are logged in AuditLog and should not increment approved.

4) Posted
- DraftReply.postedAt within range
- Includes posted_manual and any future posted_via_api methods
- Response time calculations use postedAt - Review.createdAt (or Review.publishedAt if available from source).

5) Response Time
- Only for posted drafts
- medianMinutes and p90Minutes computed over per-review first-posted response time in the range
- Excludes rejected and never-posted approvals

6) Alerts
- AlertEvent.createdAt within range
- Grouped by type (e.g., NEGATIVE_REVIEW_SLA, SYNC_FAILED, OCR_FAILED) and severity

Implementation Notes
- Validation: all API query params validated with Zod. If end < start, return 400.
- RBAC: user must belong to Business; locationId must belong to Business.
- Performance: uses Prisma aggregates and a small number of grouped queries; logs timing and result sizes.
- Reliability: endpoints return empty-but-well-formed payloads when there is no data.

Customer-Facing Use
During onboarding and demos, the dashboard proves reliability:
- Sync Health shows Google Business Profile connection status and last sync per location.
- Funnel shows tangible value creation (drafts generated, approvals, posts).
- Alerts confirms SLA escalation is active.
- CSV export supports easy sharing and issue diagnosis.

If you need to send this in customer comms, reference:
- Website proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
