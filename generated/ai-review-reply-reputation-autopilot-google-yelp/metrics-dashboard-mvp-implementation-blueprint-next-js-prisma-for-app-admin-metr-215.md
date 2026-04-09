# Metrics Dashboard MVP — Implementation Blueprint (Next.js + Prisma) for /app/admin/metrics + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:04:31.529Z

---

Goal
Ship /app/admin/metrics that helps operators prove value (ratings/review volume/response SLAs) and debug reliability (sync failures, ingestion errors). Must use existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog. No new infrastructure.

Audience
- Business Owner/Admin: wants weekly KPI snapshot + “are we keeping up?”
- Operator/Admin: wants sync health, failure reasons, and a funnel view (ingest→draft→approve→posted)

Routes & APIs (minimal)
1) Page
- GET /app/admin/metrics?businessId=&locationId=&from=YYYY-MM-DD&to=YYYY-MM-DD
  - Server Component that calls internal query helpers (preferred) OR fetches /api/admin/metrics.

2) JSON API
- GET /api/admin/metrics
  Query params:
  - businessId (required)
  - locationId (optional, ‘all’ default)
  - from (optional; default: last 30 days)
  - to (optional; default: today)
  Response:
  {
    range: { from, to },
    syncHealth: { locations: [...] },
    funnel: { counts: {...}, rates: {...} },
    responseTime: { medianHours, p90Hours, buckets: [...] },
    ratings: { avgRating, ratingCounts: {1..5}, trend: [{date, avgRating, count}] },
    negatives: { negativeShare, negativeCount, topNegativeThemes: [...] },
    alerts: { total, byType: [...], last10: [...] }
  }

3) CSV Export
- GET /api/admin/metrics.csv
  - same query params
  - returns text/csv; includes a flattened subset safe for debugging/Excel.

RBAC / Auth
- Only members of the Business can view.
- Reuse your existing membership table (UserBusinessMembership). Guard both page and API.
- If you have role support: require role in {admin, operator}. If not, membership is sufficient for MVP.

Validation (Zod)
- businessId: uuid
- locationId: uuid optional
- from/to: parseable date; enforce from<=to; clamp range to max 180 days for performance.

UI Sections (MVP: tables/cards first)
A) Filters
- Business selector (if multi-business admin)
- Location selector (All + each enabled Location)
- Date range picker (Last 7/30/90)

B) Sync Health (Reliability)
Table columns per location:
- Location name
- Source enabled (GBP/Yelp/Manual)
- lastSyncAt (derived; see query)
- lastError (derived from Integration/Location or last failed AuditLog event)
- reviewsInRange (# reviews createdAt in range)
- failureCountInRange (# sync failures in range)

C) Activation Funnel (Value proof)
Cards:
- Reviews ingested
- Drafts created
- Drafts approved
- Replies posted (manual + api)
Rates:
- Draft coverage = drafted/ingested
- Approval rate = approved/drafted
- Posting rate = posted/approved

D) Response Time (SLA)
- Median hours to first posted reply
- P90 hours
- Buckets: <1h, 1–4h, 4–24h, 1–3d, >3d
Definition: responseTime = postedAt - reviewCreatedAt
- postedAt: DraftReply.postedAt (or equivalent) where status in posted_*.
- Exclude rejected and never-posted.

E) Ratings & Negatives
- Avg rating in range
- Rating distribution (1–5)
- Negative share: (rating<=2 OR sentiment=negative) / total
- Top themes: from Review.categoryLabels aggregated

F) Alerts
- Total alerts in range
- By type/severity (e.g., negative_review, sync_failure, ocr_failure)
- Last 10 alerts list with createdAt, type, location, message

Metric Definitions (consistent)
- Ingested: Review.createdAt within [from,to]
- Drafted: DraftReply.createdAt within [from,to] AND DraftReply.reviewId belongs to reviews in range (choose ONE). For simplicity, base on review range: drafted = reviewsInRange with at least one DraftReply.
- Approved: DraftReply.approvedAt not null (or status=approved) for reviews in range
- Posted: DraftReply.postedAt not null AND status in {posted_manual, posted_api}
- Response time: for reviews in range with posted replies
- Negative review: rating<=2 OR sentiment='negative'

Prisma Query Helpers (pseudo-code)
Assumptions: 
- Review has fields: id, businessId, locationId, source, rating, authorName, text, createdAt, sentiment, categoryLabels (string[]), rawPayload
- DraftReply has: id, reviewId, businessId, status, createdAt, approvedAt, postedAt
- AlertEvent has: id, businessId, locationId, type, severity, message, createdAt
- Location has: id, businessId, name, enabled, lastGbpReviewSyncUpdateTime, etc.
- AuditLog has: id, businessId, locationId, action, entityType, entityId, createdAt, metadata(json)

1) Fetch base filters
- const whereReview = { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: from, lte: to }}
- reviews = await prisma.review.findMany({ where: whereReview, select: { id, rating, sentiment, categoryLabels, createdAt, locationId } })
For performance: do aggregates in SQL where possible.

2) Funnel counts
- ingestedCount = prisma.review.count({ where: whereReview })
- draftedCount = prisma.draftReply.count({ where: { businessId, review: whereReview, NOT: { status: 'rejected' } }, distinct: ['reviewId'] })
- approvedCount = prisma.draftReply.count({ where: { businessId, review: whereReview, approvedAt: { not: null } }, distinct: ['reviewId'] })
- postedCount = prisma.draftReply.count({ where: { businessId, review: whereReview, postedAt: { not: null }, status: { in: ['posted_manual','posted_api'] } }, distinct: ['reviewId'] })
Rates computed in app code with divide-by-zero guards.

3) Response time buckets (SQL recommended)
Use a raw query for percentile/median:
- SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS median_hours,
         percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS p90_hours
  FROM "DraftReply" d
  JOIN "Review" r ON r.id=d."reviewId"
  WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
    AND d."postedAt" IS NOT NULL AND d.status IN ('posted_manual','posted_api');
Bucket counts:
- CASE WHEN hours<1 THEN '<1h' WHEN hours<4 THEN '1-4h' WHEN hours<24 THEN '4-24h' WHEN hours<72 THEN '1-3d' ELSE '>3d' END

4) Ratings distribution + avg
- avgRating: SELECT AVG(rating) FROM Review WHERE whereReview
- counts: SELECT rating, COUNT(*) FROM Review WHERE whereReview GROUP BY rating

5) Trend (daily)
- SELECT DATE_TRUNC('day', "createdAt") as day, COUNT(*) as cnt, AVG(rating) as avg
  FROM "Review" WHERE businessId=$1 AND createdAt BETWEEN $2 AND $3 [AND locationId=$4]
  GROUP BY day ORDER BY day;

6) Negative share
- negativeCount = prisma.review.count({ where: { ...whereReview, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })
- negativeShare = negativeCount/ingestedCount

7) Top themes
If categoryLabels is string[] in Postgres:
- SELECT label, COUNT(*) as cnt
  FROM (
    SELECT UNNEST("categoryLabels") as label
    FROM "Review"
    WHERE businessId=$1 AND createdAt BETWEEN $2 AND $3 [AND locationId=$4]
  ) t
  GROUP BY label ORDER BY cnt DESC LIMIT 10;

8) Sync health
Compute per location:
- lastSyncAt: if you store it, read from Location/Integration; else derive from AuditLog where action='gbp_sync_success' and take max(createdAt)
- failureCountInRange: AuditLog action in ('gbp_sync_failed','yelp_ingest_failed','ocr_failed') filtered by range.
- lastError: most recent failure event message (AuditLog.metadata.error or AlertEvent.message).

CSV Export schema (flattened)
Rows: one row per day per location (keeps it small, useful).
Columns:
- date, locationId, locationName, ingestedCount, negativeCount, avgRating, draftedCount, approvedCount, postedCount, medianResponseHours
Implementation: reuse trend query per location; join additional aggregates.

Instrumentation
- For /api/admin/metrics: log correlationId + businessId + locationId + range + durationMs.
- Capture errors to Sentry with tags: feature=metrics, businessId.

Acceptance Criteria (done when)
- Page loads under 2s for 30-day range with <=5 locations, <=2k reviews.
- Numbers match WeeklyReport logic (avg rating, response time) for same range.
- CSV download opens in Google Sheets and matches on-screen totals (within expected daily aggregation differences).

Owner Execution Notes
- Keep charts optional. Start with cards + tables; add sparklines later.
- Prefer raw SQL for percentiles; Prisma doesn’t do percentile well.
- Use DB indexes: Review(businessId, createdAt), DraftReply(reviewId, postedAt), AlertEvent(businessId, createdAt), AuditLog(businessId, createdAt). If not present, add migration later (non-blocking for MVP).

Reference Website for legitimacy (for any customer-facing links/screens): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-cm2c2899.picard.replit.dev/sites/1