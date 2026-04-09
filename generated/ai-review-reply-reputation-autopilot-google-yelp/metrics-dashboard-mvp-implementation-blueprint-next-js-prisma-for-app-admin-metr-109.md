# Metrics Dashboard MVP — Implementation Blueprint (Next.js + Prisma) for /app/admin/metrics

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:11:51.291Z

---

Goal
Ship /app/admin/metrics to let an owner/operator quickly answer: (1) Is syncing healthy? (2) Are we responding fast enough? (3) Where are reviews getting stuck (draft/approval/post)? (4) How many negative reviews/alerts happened in the selected period?

Context / Existing Data Sources
Use only current tables you already have:
- Business, Location
- Integration (GBP/Yelp/manual)
- Review (createdAt, rating, sentiment, categories, source, status fields you already use)
- DraftReply (createdAt, updatedAt, status: drafted/approved/rejected/posted_manual/posted_api if present)
- AlertEvent (createdAt, type, severity, resolvedAt, metadata)
- AuditLog (createdAt, actorUserId, action, entityType, entityId, metadata)

Key Definitions (must be consistent across UI + reports)
Time window: [start, end] inclusive; use business timezone for display, but store queries in UTC. Default: last 14 days.

Funnel stages (counts are by Review.id):
1) Ingested: Review.createdAt in range.
2) Drafted: Review with at least one DraftReply created (DraftReply.createdAt in range OR Review.createdAt in range AND draft exists). For simplicity: count reviews where firstDraftAt is within range; compute firstDraftAt = MIN(DraftReply.createdAt).
3) Approved: reviews whose latest DraftReply was approved within range OR any approval action in AuditLog within range.
4) Posted: reviews whose reply was marked posted_manual/posted_api within range OR posting action in AuditLog.

Response time KPI:
- “Time to first draft”: firstDraftAt - Review.createdAt
- “Time to approval”: firstApprovedAt - Review.createdAt
- “Time to posted”: firstPostedAt - Review.createdAt
Exclude rejected-only reviews from approval/post medians.

Negative share:
- Negative if sentiment=negative OR rating <= 2 (use same rule as escalation threshold default; if you have per-location thresholds, compute both global and per-location).

Sync health:
Per location:
- lastSyncAt (store on Location or Integration-health record; if you have Location.lastGbpSyncAt use it; else infer from latest successful sync AuditLog)
- lastError (from Integration.lastError or most recent AlertEvent of type=sync_failed)
- reviewsFetchedLast7d (count of reviews created from GBP source in last 7 days)

UI Pages / Components
Route: /app/admin/metrics
- Top bar filters:
  - Date range picker (start/end)
  - Location dropdown (All + specific locations)
  - Source filter (All, Google, Yelp, Manual)
  - Export CSV button
- Section A: “Funnel Overview” cards
  - Ingested, Drafted, Approved, Posted
  - Conversion rates: Drafted/Ingested, Approved/Drafted, Posted/Approved
- Section B: “Speed & SLA”
  - Median time to first draft
  - Median time to approval
  - Median time to posted
  - Count of negatives responded within SLA (e.g., within 4 hours or 1 business day; pick one configurable)
- Section C: “Negative & Themes”
  - Negative share %
  - Top categories (service/price/staff/quality/cleanliness/wait_time/other)
- Section D: “Alerts”
  - Alerts count by type/severity
  - Open alerts (resolvedAt is null)
- Section E: “Sync Health” table
  - Location name, integration status, last sync, last error, consecutive failures, reviews fetched last 7d

API Endpoints
1) GET /api/admin/metrics?start=ISO&end=ISO&locationId=optional&source=optional
Returns JSON:
{
  range: { start, end, timezone },
  funnel: { ingested, drafted, approved, posted, rates: {...} },
  speed: { medianDraftMins, medianApproveMins, medianPostedMins },
  negative: { negativeCount, totalCount, negativeShare, respondedWithinSlaCount },
  categories: [ { label, count } ],
  alerts: { total, open, byType: [{type,count}], bySeverity:[{severity,count}] },
  syncHealth: [ { locationId, locationName, source, enabled, lastSyncAt, lastError, consecutiveFailures, reviewsLast7d } ]
}

2) GET /api/admin/metrics.csv?start=ISO&end=ISO&locationId=optional&source=optional
Streams CSV for the underlying review-level dataset (for debugging):
Columns:
- reviewId, locationName, source, rating, sentiment, categories, reviewCreatedAt
- firstDraftAt, firstApprovedAt, firstPostedAt
- timeToDraftMins, timeToApproveMins, timeToPostedMins
- statusSummary (e.g., drafted/approved/posted)

Security / RBAC
- Require authenticated user
- Ensure user is member of the Business they’re querying
- If multi-business admin exists, require businessId param or infer from session’s active business
- Validate inputs with zod (dates, enums, UUID)

Prisma/SQL Aggregations (copy/paste-ready logic)
A) Prepare per-review timestamps via subqueries
- firstDraftAt = MIN(DraftReply.createdAt) GROUP BY reviewId
- firstApprovedAt = MIN(AuditLog.createdAt) WHERE action in ('draft.approved') GROUP BY reviewId (or DraftReply.approvedAt if you store it)
- firstPostedAt = MIN(AuditLog.createdAt) WHERE action in ('draft.posted_manual','draft.posted_api') GROUP BY reviewId (or DraftReply.postedAt)

B) Funnel counts (for reviews in range)
- ingested: COUNT(*) FROM Review WHERE createdAt between start/end (+ filters)
- drafted: COUNT(*) of reviews where firstDraftAt between start/end (or where review in range and has any draft)
- approved: COUNT(*) where firstApprovedAt between start/end
- posted: COUNT(*) where firstPostedAt between start/end

C) Medians
In Postgres, median via percentile_cont:
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (firstDraftAt - reviewCreatedAt))/60) AS medianDraftMins
Filter where firstDraftAt is not null.
Repeat for approval/post.

D) Categories
If categories are stored as string[] on Review:
SELECT unnest(categories) AS label, count(*)
FROM Review
WHERE createdAt between start/end
GROUP BY label
ORDER BY count(*) DESC
LIMIT 10;

E) Alerts
SELECT type, count(*) FROM AlertEvent WHERE createdAt between start/end GROUP BY type;
Open: WHERE resolvedAt IS NULL.

Implementation Notes (Next.js App Router)
- /app/admin/metrics/page.tsx is a server component that calls internal fetch to /api/admin/metrics (or directly calls a shared server function).
- Use a shared server-only module: lib/metrics.ts
  - export async function getMetrics({businessId, start, end, locationId, source})
  - return the JSON shape above
- Keep charts minimal for MVP: simple tables + sparklines using a lightweight library or no library (CSS bars). Priority is correctness.
- Add instrumentation: Sentry capture for API errors and include correlationId in response headers.

Owner Execution Checklist
1) Implement lib/metrics.ts with queries (prefer raw SQL for medians + unnest categories).
2) Implement /api/admin/metrics route handler with zod validation + RBAC.
3) Implement /app/admin/metrics UI with filters and sections above.
4) Implement /api/admin/metrics.csv streaming export using the same per-review dataset.
5) Verify on one real business: compare counts to /app/reviews queue and weekly report numbers.

Customer Communication Tie-In (optional copy for app footer)
Add “Powered by AI Review Reply & Reputation Autopilot” link to website for legitimacy:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
This can appear on weekly report emails and the metrics dashboard footer so recipients can verify the product quickly.