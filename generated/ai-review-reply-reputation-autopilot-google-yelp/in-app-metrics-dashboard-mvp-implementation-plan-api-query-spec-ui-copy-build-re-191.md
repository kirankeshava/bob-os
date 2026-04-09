# In-App Metrics Dashboard (MVP) — Implementation Plan + API/Query Spec + UI Copy (Build-Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:11:20.118Z

---

Goal
Ship /app/admin/metrics to monitor: (1) Google/Yelp/manual ingestion reliability, (2) activation funnel from review ingest to posted reply, (3) SLA/alert volume, and (4) basic reputation KPIs. Must work using existing DB tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

User-facing URL
- /app/admin/metrics (Business-scoped; user must be a member)

Core filters (top bar)
- Date range: last 7 / 30 / 90 days (default 30)
- Location: All locations or specific Location
- Source: all / google / yelp / manual / email / ocr (optional)
- Export CSV button

KPI definitions (strict)
1) Ingested reviews
- Count of Review where createdAt in range (or ingestedAt if you store it; otherwise Review.createdAt for “review date” and Review.insertedAt for “system ingest date”). For operational funnel, use DB insertion timestamp if available; else fall back to createdAt.

2) Drafted
- Reviews that have at least one DraftReply created in range OR have DraftReply for that Review at all and the Review ingested in range.
Recommended: draftedCount = count distinct Review.id where exists DraftReply with reviewId.

3) Approved
- Reviews with at least one DraftReply.status in ('approved','posted_manual','posted_api') OR an AuditLog event of type DRAFT_APPROVED.
Prefer source of truth: DraftReply.status.

4) Posted
- DraftReply.status in ('posted_manual','posted_api') with postedAt in range.

5) Median response time
- For posted replies only:
responseTimeHours = (DraftReply.postedAt - Review.createdAt) in hours.
Report median + p90.

6) Negative share
- negativeShare = negativeReviews / totalReviews.
Use Review.sentiment = 'negative' OR rating <= 2 as “negative”; expose toggle in UI.

7) Sync health
- Per enabled Location with Google integration:
  - lastSyncAt
  - lastError (if stored)
  - consecutiveFailures (if stored) OR derive from last N AlertEvents
  - watermark: Location.lastGbpReviewSyncUpdateTime

8) Alert volume
- Count AlertEvent within range grouped by type (sync_failure, negative_review_sla, ocr_failure, etc.) and severity.

Data contracts
API 1: GET /api/admin/metrics?businessId=&start=&end=&locationId=&source=
Return JSON:
{
  range: { start, end },
  filters: { locationId, source },
  kpis: {
    reviewsIngested, reviewsNegative, negativeShare,
    drafted, approved, posted,
    medianResponseHours, p90ResponseHours,
    avgRating, avgRatingPrevPeriod, ratingDelta
  },
  funnelSeries: [{ date, ingested, drafted, approved, posted }],
  themeBreakdown: [{ label, count, share }],
  sentimentBreakdown: [{ sentiment, count }],
  responseTimeByLocation: [{ locationId, locationName, medianHours, p90Hours, postedCount }],
  syncHealth: [{ locationId, locationName, source: 'google', enabled, lastSyncAt, lastError, lastSyncStatus }],
  alertsByType: [{ type, count }]
}

API 2: GET /api/admin/metrics.csv?businessId=&start=&end=&locationId=&source=
CSV rows (daily granularity):
- date, ingested, drafted, approved, posted, negative, avg_rating

RBAC
- Require authenticated user.
- Check UserBusinessMembership exists for businessId.
- If not member: 403.

Query spec (Prisma-first, raw SQL allowed for medians)
Assumptions: Prisma models already exist; adjust field names to your schema.

1) Daily ingested
Prisma groupBy:
- where: { businessId, createdAt: { gte: start, lte: end }, ...(locationId), ...(source) }
- groupBy: [dateTrunc('day', createdAt)] via raw SQL because Prisma groupBy lacks date trunc across DBs.
Raw SQL (Postgres):
SELECT date_trunc('day', r."createdAt")::date as day,
       count(*) as ingested,
       avg(r.rating) as avg_rating,
       sum(case when r.sentiment = 'negative' or r.rating <= 2 then 1 else 0 end) as negative
FROM "Review" r
WHERE r."businessId" = $1
  AND r."createdAt" >= $2 AND r."createdAt" <= $3
  AND ($4::text is null OR r."locationId" = $4)
  AND ($5::text is null OR r."source" = $5)
GROUP BY 1
ORDER BY 1;

2) Funnel totals (distinct reviews)
- ingested: count(*) from Review in range
- drafted: count distinct reviewId from DraftReply join Review with filters
- approved: count distinct reviewId where DraftReply.status in (...)
- posted: count distinct reviewId where DraftReply.status in ('posted_manual','posted_api') and postedAt in range

SQL snippet:
SELECT
  (SELECT count(*) FROM "Review" r WHERE ...filters...) as ingested,
  (SELECT count(distinct d."reviewId") FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId" WHERE ...filters...) as drafted,
  (SELECT count(distinct d."reviewId") FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId" WHERE ...filters... AND d.status IN ('approved','posted_manual','posted_api')) as approved,
  (SELECT count(distinct d."reviewId") FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId" WHERE ...filters... AND d.status IN ('posted_manual','posted_api') AND d."postedAt" BETWEEN $2 AND $3) as posted;

3) Response time median/p90 (posted only)
Postgres percentile:
SELECT
  percentile_cont(0.5) within group (order by extract(epoch from (d."postedAt" - r."createdAt"))/3600.0) as median_hours,
  percentile_cont(0.9) within group (order by extract(epoch from (d."postedAt" - r."createdAt"))/3600.0) as p90_hours
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId"=$1
  AND d.status IN ('posted_manual','posted_api')
  AND d."postedAt" >= $2 AND d."postedAt" <= $3
  AND ($4::text is null OR r."locationId"=$4)
  AND ($5::text is null OR r."source"=$5);

4) Theme breakdown
Use Review.categoryLabels array (or join table). If stored as string[]:
SELECT label, count(*) as count
FROM (
  SELECT unnest(r."categoryLabels") as label
  FROM "Review" r
  WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
    AND ($4::text is null OR r."locationId"=$4)
    AND ($5::text is null OR r."source"=$5)
) t
GROUP BY 1
ORDER BY count DESC
LIMIT 8;

5) Sync health table
For each Location in business:
- enabledGoogleSync = Location.googleSyncEnabled (or derived)
- lastSyncAt, lastError from Integration/Location columns you already added
- lastSyncStatus: OK if lastSyncAt within 24h (configurable); WARN if older; ERROR if lastError present and recent.
Prisma query:
- locations = findMany({ where:{businessId}, select:{ id,name, googleSyncEnabled, lastGbpReviewsSyncAt, lastGbpReviewsSyncError } })

UI components (minimal, fast)
- KPI cards row: Ingested, Negative share, Drafted, Approved, Posted, Median response time
- Funnel chart: simple stacked bars per day (use lightweight library or plain SVG; do not block MVP on charts)
- Tables:
  1) Sync health per location
  2) Alerts by type
  3) Top themes
- CSV export: daily series table

Empty states / helper copy (paste-ready)
1) No data yet
“Nothing to show yet. Connect Google Business Profile or import reviews (CSV, email forward, or screenshot OCR) to start tracking your reputation pipeline. If you need help, share this link with your team: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

2) Sync warnings
“Sync hasn’t run recently for this location. Check integration permissions and try reconnecting Google. If errors persist, reply to the onboarding email and include this business URL for support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

Implementation checklist (1-day build)
- [ ] Create /app/admin/metrics/page.tsx with filter bar + server fetch to /api/admin/metrics
- [ ] Implement /api/admin/metrics route: validate query via Zod, enforce membership RBAC, run raw SQL for medians + daily series, return JSON
- [ ] Implement /api/admin/metrics.csv: same RBAC + filters, return text/csv
- [ ] Add navigation link in admin sidebar
- [ ] Add basic tests for Zod validation + RBAC + one snapshot response

Notes
- Keep computations consistent with WeeklyReport job to avoid “dashboard vs email mismatch.” Reuse shared functions if possible.
- If Review.createdAt is “review created” and you also track insertedAt/ingestedAt, expose toggle later; for MVP, keep the definition stable and documented in UI tooltips.