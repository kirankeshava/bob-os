# Metrics Dashboard MVP — Implementation Notes (Next.js + Prisma) for /app/admin/metrics

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:28:05.465Z

---

Goal
Ship /app/admin/metrics to show (1) Sync Health, (2) Activation Funnel + Response Time, (3) Alerts + SLA, using existing data (Review, DraftReply, AuditLog, AlertEvent, Location, WeeklyReport). No new infra.

Routes
1) UI
- /app/admin/metrics/page.tsx (Server Component)
  - Reads query params: start, end, locationId (optional), source (optional: google|yelp|manual|ocr)
  - Calls internal server function getMetrics({businessId, start, end, filters})
  - Renders sections + export links.

2) API (optional but recommended for client-side filter updates)
- GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...&source=...
  - Returns JSON payload with all KPIs.
- GET /api/admin/metrics.csv?... same params
  - Returns CSV for debugging and customer success.

RBAC / Auth
- Require signed-in user.
- Require UserBusinessMembership for currentBusinessId.
- Only admins can access /app/admin/*.

KPI Definitions (must match weekly report)
Time window: [start, end] inclusive in business timezone; store as UTC in DB but compute boundaries with timezone.
- Ingested Reviews: reviews with createdAt within window.
- Drafted: DraftReply createdAt within window OR DraftReply.review.createdAt within window (pick one and stay consistent). Recommended: count drafts where Review.createdAt in window (since drafts are downstream of ingestion) and show draft latency.
- Approved: DraftReply.status transitioned to approved within window (from AuditLog) OR DraftReply.approvedAt field if present. If you don’t store approvedAt, use AuditLog event.
- Posted: DraftReply.postedAt within window OR DraftReply.status in (posted_manual, posted_api) and postedAt in window.
- Response Time: postedAt - Review.createdAt (only for posted replies).
- SLA Breach: negative review (rating<=2 OR sentiment=negative) not posted within X hours (per Location threshold) OR no approved draft within X hours (choose one). Recommended: breach if not posted.

Data Sources
- Review: rating, sentiment, categories (array), source, createdAt, locationId.
- DraftReply: status, createdAt, updatedAt, postedAt, reviewId.
- AuditLog: action types for approve/reject/edit/post/manual_post (already used elsewhere).
- AlertEvent: type (negative_review, sync_failure, ocr_failure), createdAt, resolvedAt.
- Location: last sync fields (lastGbpReviewSyncAt, lastGbpReviewSyncUpdateTime), enabled flags.

Server Function: getMetrics()
Input:
{ businessId, startUTC, endUTC, locationId?, source? }

A) Sync Health (per location)
Query locations for business, join latest integration status fields.
Return per location:
- locationName
- enabledGoogleSync (bool)
- lastSyncAt (from Location.lastGbpReviewsSyncAt if exists; else from AuditLog last sync event)
- lastError (from Integration.lastError or AlertEvent last sync_failure)
- reviewsFetchedInWindow (count of Review where source=google and createdAt in window)

B) Funnel Counts
Base reviewWhere = { businessId, createdAt: { gte: startUTC, lte: endUTC }, ...(locationId), ...(source) }
1. ingestedCount = prisma.review.count({ where: reviewWhere })
2. draftedCount = prisma.draftReply.count({ where: { review: reviewWhere } })
3. approvedCount
Option 1 (preferred if you have DraftReply.approvedAt):
- prisma.draftReply.count({ where: { review: reviewWhere, approvedAt: { not: null }, approvedAt: { gte: startUTC, lte: endUTC } } })
Option 2 (AuditLog):
- prisma.auditLog.count({ where: { businessId, action: 'draft_approved', createdAt: { gte, lte }, ...(locationId) } })
4. postedCount = prisma.draftReply.count({ where: { review: reviewWhere, postedAt: { gte: startUTC, lte: endUTC }, status: { in: ['posted_manual','posted_api'] } } })

C) Latency Metrics
- medianResponseTimeHours: compute from posted drafts only. If Postgres: use percentile_cont.
SQL example:
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS p50_hours
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3 AND d."postedAt" IS NOT NULL;
Also compute p90.

- timeToFirstDraftHours: DraftReply.createdAt - Review.createdAt (first draft per review). Use MIN(d.createdAt) group by reviewId.

D) Reputation Metrics
- avgRating = avg(Review.rating) in window
- ratingTrend: compare avg rating this window vs previous same-length window.
- negativeShare = count where (rating<=2 OR sentiment='negative') / ingestedCount
- topThemes: from Review.categories (array). Count occurrences.
Prisma approach:
- Fetch categories for reviews in window (select categories only) and aggregate in JS (fast enough for MVP). Add limit (e.g., 5).

E) Alerts
alertWhere = { businessId, createdAt: { gte, lte }, ...(locationId) }
- negativeAlerts = count AlertEvent where type='negative_review'
- syncFailureAlerts = count type='sync_failure'
- ocrFailureAlerts = count type='ocr_failure'
- unresolvedAlerts = count where resolvedAt is null

F) “Needs attention” list (table)
Return last 20 negative reviews in window with:
- rating, sentiment, categories, createdAt
- draft status (none/drafted/approved/posted)
- SLA hours remaining (if threshold set)
This drives operator workflow.

API Response Shape (JSON)
{
  range: { start, end, timezone },
  filters: { locationId, source },
  syncHealth: [{ locationId, name, enabled, lastSyncAt, lastError, reviewsFetchedInWindow }],
  funnel: { ingested, drafted, approved, posted },
  latency: { p50ResponseHours, p90ResponseHours, p50DraftHours },
  reputation: { avgRating, avgRatingPrev, delta, negativeShare, topThemes: [{theme,count}] },
  alerts: { negative, syncFailure, ocrFailure, unresolved },
  needsAttention: [{ reviewId, locationName, rating, sentiment, categories, createdAt, draftStatus, slaDueAt }]
}

CSV Export
Provide a flat CSV with one row per day per location:
Columns: date, location, ingested, negative, avg_rating, drafted, approved, posted, p50_resp_hours, negative_alerts, sync_failures
Implementation: generate daily buckets in JS and fill via groupBy queries (or raw SQL date_trunc).

UI Copy (ready-to-paste)
Page title: “Metrics”
Subtitle: “Track review volume, response speed, and issues across Google/Yelp/manual imports.”
Sync Health section helper: “If sync is failing, reviews may still be imported via email forwarding, CSV, or screenshot OCR.”
Funnel helper: “Counts reflect reviews created in the selected date range.”
Empty state (no reviews): “No reviews found in this range. Try expanding the dates or importing via CSV/screenshot.”
Export button: “Download CSV”

Instrumentation
- Log a single correlationId for each /api/admin/metrics request.
- Sentry capture if any query exceeds 2s (add timing logs).

Owner-facing Outreach Note (for later templates)
When requesting pilot access, reference the product URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and mention: “We support Google API sync when permitted, plus fast fallbacks (email/CSV/screenshot OCR) so you can start immediately.”
