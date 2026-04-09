# Metrics Dashboard Implementation (Build-Ready) — Routes, APIs, Queries, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:05:02.700Z

---

Below is the build-ready implementation for the new Metrics Dashboard (Next.js App Router + Prisma/Postgres). It assumes existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES
- UI page: /app/admin/metrics
  - Server Component page that renders filters + sections.
  - Query params: from=YYYY-MM-DD, to=YYYY-MM-DD, tz=IANA (optional), locationId (optional).
  - Defaults: last 14 days, business.timezone.

- API JSON: /api/admin/metrics?from&to&tz&locationId
  - Returns { range, timezone, locations[], kpis, series, tables }.

- API CSV: /api/admin/metrics.csv?from&to&tz&locationId
  - Returns a flat CSV export including: daily series + headline KPIs + per-location snapshot.

2) RBAC + VALIDATION
- Require authenticated user.
- Require membership in Business via UserBusinessMembership.
- Validate query params with zod:
  - from/to: date strings, clamp max 90 days.
  - tz: optional IANA; fallback business timezone.
  - locationId: optional UUID; if present must belong to business.

3) KPI DEFINITIONS (CONSISTENT + AUDITABLE)
Date window is based on Review.createdAt (ingestion timestamp if missing original). When locationId is provided, filter all computations by locationId.

Funnel counts:
- Ingested: count(Review) createdAt in range.
- Drafted: count(distinct Review.id) where exists DraftReply for that review createdAt in range OR review.createdAt in range and draft exists (choose one; for consistency use DraftReply.createdAt in range plus a separate “draft coverage” metric).
- Approved: count(distinct reviewId) where DraftReply.status in ['approved','posted_manual','posted_api'] and approvedAt in range.
- Posted: count(distinct reviewId) where DraftReply.status in ['posted_manual','posted_api'] and postedAt in range.

Response time metrics (hours):
- timeToFirstDraft = DraftReply.createdAt - Review.createdAt (first draft per review)
- timeToApproval = DraftReply.approvedAt - Review.createdAt (first approved per review)
- timeToPost = DraftReply.postedAt - Review.createdAt (first posted per review)
Exclude reviews with missing endpoints for each metric. Exclude rejected drafts from approval/post metrics.
Report median + p90 for timeToApproval and timeToPost.

Reputation metrics:
- Review volume
- Average rating (mean of Review.rating)
- Negative share: % where sentiment='negative' OR rating<=2
- Top themes: frequency of category labels across reviews in range (e.g., staff/service/price/etc.)

Sync health:
- Per location: lastSyncAt, lastError, lastGbpReviewSyncUpdateTime, consecutiveFailures (if stored), and “staleness” hours since last sync.
- Alerts volume: count(AlertEvent) in range grouped by type (negative_review, sync_failed, ocr_failed, etc.)

4) DATA ACCESS (PRISMA + RAW SQL)
A) Headline counts (Prisma):
- reviews = prisma.review.count({ where: { businessId, locationId?, createdAt: { gte, lte }}})
- avgRating = prisma.review.aggregate({ where: same, _avg: { rating: true }})
- negativeCount = prisma.review.count({ where: { businessId, locationId?, createdAt: {gte,lte}, OR: [{sentiment:'negative'},{rating:{lte:2}}]}})

B) Funnel counts (Prisma):
- draftedDistinct = prisma.draftReply.findMany({ where: { businessId, locationId?, createdAt:{gte,lte}}, distinct:['reviewId'], select:{reviewId:true}})
- approvedDistinct = prisma.draftReply.findMany({ where:{ businessId, locationId?, approvedAt:{gte,lte}, status:{in:['approved','posted_manual','posted_api']}}, distinct:['reviewId'], select:{reviewId:true}})
- postedDistinct = prisma.draftReply.findMany({ where:{ businessId, locationId?, postedAt:{gte,lte}, status:{in:['posted_manual','posted_api']}}, distinct:['reviewId'], select:{reviewId:true}})

C) Response time percentiles (raw SQL recommended):
Use a CTE to select first draft/approve/post per review, then percentile_cont.
Example (Postgres):
WITH firsts AS (
  SELECT r.id AS review_id,
         r."createdAt" AS review_created,
         MIN(d."createdAt") AS first_draft_at,
         MIN(d."approvedAt") FILTER (WHERE d."approvedAt" IS NOT NULL AND d.status IN ('approved','posted_manual','posted_api')) AS first_approved_at,
         MIN(d."postedAt") FILTER (WHERE d."postedAt" IS NOT NULL AND d.status IN ('posted_manual','posted_api')) AS first_posted_at
  FROM "Review" r
  LEFT JOIN "DraftReply" d ON d."reviewId" = r.id
  WHERE r."businessId" = $1
    AND r."createdAt" >= $2 AND r."createdAt" <= $3
    AND ($4::uuid IS NULL OR r."locationId" = $4)
  GROUP BY r.id
)
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (first_approved_at - review_created))/3600) AS median_hours_to_approval,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (first_approved_at - review_created))/3600) AS p90_hours_to_approval,
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (first_posted_at - review_created))/3600) AS median_hours_to_post,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (first_posted_at - review_created))/3600) AS p90_hours_to_post
FROM firsts
WHERE first_approved_at IS NOT NULL OR first_posted_at IS NOT NULL;

D) Daily series (raw SQL):
Generate daily buckets in tz, join counts/avg rating.
- Output columns: day, reviews, avg_rating, negative_share, posted.

E) Top themes:
If Review.categoryLabels is stored as an array/json, use jsonb_array_elements_text and group by label.

5) UI SECTIONS + COPY (READY TO PASTE)
A) Header
Title: “Metrics”
Subtitle: “Track review volume, response speed, and reputation risk across locations.”
Filters: Date range, Location (All locations or specific), Timezone.

B) Sync Health card
- “Last sync” per location
- “Staleness” indicator: <2h OK, 2–12h Warning, >12h Needs attention
- Show lastError excerpt if present

C) Funnel card
- Ingested → Drafted → Approved → Posted
- Show conversion rates: drafted/ingested, approved/drafted, posted/approved

D) Response speed card
- Median hours to approval
- P90 hours to approval
- Median hours to post
- P90 hours to post
Copy note: “Times are measured from review ingestion time to first approval/post event.”

E) Reputation card
- Average rating
- Negative share
- Top themes table

F) Alerts card
- Alerts by type
- Recent alerts list (last 10) with timestamp and location

G) Exports
Button: “Download CSV” hits /api/admin/metrics.csv with current filters.

6) CUSTOMER-FACING BLURB (FOR FUTURE SHARING/SALES)
“This dashboard proves ROI: how many reviews came in, how fast we responded, and where negative feedback clusters. It’s backed by an audit trail of every draft, approval, and posting event.”

7) INSTRUMENTATION
- Wrap API handlers with structured logs including businessId, userId, from/to, locationId.
- Sentry spans around raw SQL queries and PDF/email send jobs.
- Record an AuditLog event ‘metrics_viewed’ (optional) to track engagement.

This implementation keeps the MVP fast and reliable: it reuses your existing source-of-truth tables and avoids new infra. It also directly supports revenue by making performance visible for customers (and easy to export/share).