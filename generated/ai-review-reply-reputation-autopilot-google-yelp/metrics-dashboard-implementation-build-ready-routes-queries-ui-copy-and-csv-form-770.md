# Metrics Dashboard Implementation (Build-Ready) — Routes, Queries, UI Copy, and CSV Format

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:18:07.253Z

---

Below is the concrete implementation content for the Metrics Dashboard that is now wired to the existing schema (Business, Location, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog). This is written to be directly usable in a Next.js (App Router) + Prisma codebase.

1) ROUTES
A) Page: /app/admin/metrics
- RBAC: require authenticated user + membership in the Business.
- Controls: date range (from/to), location selector (All locations or a single location).
- Sections:
  i) Sync Health
     - Table columns: Location, Integration, Last Sync At, Last Sync Status, Last Error, Reviews added (range).
     - Copy: “If Last Sync Status is failing, check Integrations health or quota/backoff logs.”
  ii) Activation Funnel
     - KPIs: Reviews ingested, Drafts created, Drafts approved, Drafts posted (manual/API), Approval rate, Post rate.
     - Definitions:
       * Ingested: Review.createdAt within range (or reviewSourceCreatedAt if stored separately; otherwise createdAt).
       * Drafted: DraftReply.createdAt within range.
       * Approved: DraftReply.approvedAt within range.
       * Posted: DraftReply.postedAt within range.
  iii) Response Time
     - Median response time: median(postedAt - Review.createdAt) for posted drafts.
     - SLA breaches count: count of negative reviews where (now - Review.createdAt) > threshold and no approved/posted draft exists.
  iv) Reputation
     - Avg rating (range), rating trend (daily avg), negative share (% of reviews rating<=2 OR sentiment=negative).
     - Top themes: from Review.categoryLabels aggregation (service/price/staff/etc.).
  v) Alerts & Escalations
     - Alerts created (range), by type (sync_failure, negative_review_sla, ocr_failure, etc.).

B) API: /api/admin/metrics
- Query params:
  - businessId (required)
  - from (required ISO date)
  - to (required ISO date)
  - locationId (optional)
- Validation:
  - max range 180 days
  - to >= from
- Response JSON shape:
  {
    range: { from, to },
    funnel: { ingested, drafted, approved, posted, approvalRate, postRate },
    responseTime: { medianMinutes, p90Minutes, sampleSize },
    reputation: { avgRating, negativeShare, totalReviews },
    syncHealth: [{ locationId, locationName, lastSyncAt, lastError, status, reviewsAdded }],
    themes: [{ label, count }],
    alerts: { total, byType: [{ type, count }] },
    timeseries: { daily: [{ date, reviews, avgRating, negativeShare, posted }] }
  }

C) CSV: /api/admin/metrics.csv
- Same filters.
- CSV contains:
  - Header block (key,value): from,to,businessId,locationId(optional)
  - KPI block: ingested,drafted,approved,posted,approvalRate,postRate,avgRating,negativeShare,medianResponseMinutes,p90ResponseMinutes
  - Daily rows: date,reviews,avgRating,negativeShare,posted,alerts
This makes it easy to paste into Sheets for a client call.

2) PRISMA/SQL AGGREGATIONS (EXACT QUERIES)
A) Funnel counts
- Ingested:
  prisma.review.count({ where: { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: from, lte: to } } })
- Drafted:
  prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: from, lte: to } } })
- Approved:
  prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{}) , approvedAt: { gte: from, lte: to }, status: 'approved' } })
- Posted:
  prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{}) , postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] } } })

B) Avg rating + negative share
- Avg rating:
  prisma.review.aggregate({ where: { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: from, lte: to } }, _avg: { rating: true }, _count: { _all: true } })
- Negative share (rating<=2 OR sentiment='negative'):
  const total = countAll
  const negative = prisma.review.count({ where: { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: from, lte: to }, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })
  negativeShare = total>0 ? negative/total : 0

C) Response-time percentiles (raw SQL for median/p90)
- For posted drafts only; join DraftReply to Review and compute minutes delta.
- Postgres SQL (parameterized):
  SELECT
    percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS median_minutes,
    percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p90_minutes,
    COUNT(*) AS n
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE d."businessId" = $1
    AND ($2::text IS NULL OR d."locationId" = $2)
    AND d."postedAt" BETWEEN $3 AND $4
    AND d.status IN ('posted_manual','posted_api');

D) Sync health
- Uses Location fields already present (e.g., lastGbpSyncAt/lastError if stored; otherwise derive from AuditLog/Integration).
- Also compute reviewsAdded in range for that location via Review.count with locationId.

E) Top themes
- If stored as array (categoryLabels), do a raw SQL unnest:
  SELECT label, COUNT(*)::int AS count
  FROM (
    SELECT unnest("categoryLabels") AS label
    FROM "Review"
    WHERE "businessId"=$1
      AND ($2::text IS NULL OR "locationId"=$2)
      AND "createdAt" BETWEEN $3 AND $4
  ) t
  GROUP BY label
  ORDER BY count DESC
  LIMIT 10;

F) Timeseries (daily)
- Raw SQL to bucket by day:
  SELECT
    date_trunc('day', r."createdAt")::date AS day,
    COUNT(*)::int AS reviews,
    AVG(r.rating)::float AS avg_rating,
    AVG(CASE WHEN (r.rating<=2 OR r.sentiment='negative') THEN 1 ELSE 0 END)::float AS negative_share
  FROM "Review" r
  WHERE r."businessId"=$1
    AND ($2::text IS NULL OR r."locationId"=$2)
    AND r."createdAt" BETWEEN $3 AND $4
  GROUP BY day
  ORDER BY day ASC;

3) UI COPY (READY TO PASTE)
- Page title: “Metrics & Health”
- Subtitle: “Track review volume, response speed, and sync reliability. Use this to confirm the autopilot is working.”
- Sync Health help text: “If a location shows repeated failures, check Google OAuth connection and quota/backoff logs. Failures also generate Alert Events.”
- Funnel help text: “Ingested → Drafted → Approved → Posted. Drops indicate either guardrail blocks, missing approvals, or posting delays.”
- Response time note: “Response time is calculated only for posted replies. Rejected or never-posted drafts are excluded.”

4) SECURITY/RBAC
- Metrics endpoints require membership in the business (UserBusinessMembership).
- Enforce businessId access server-side; do not rely on UI selection.

5) OPERATIONAL INSTRUMENTATION
- Add Sentry spans for each section query: funnel, response-time, themes, timeseries.
- Log query durations with correlationId; warn if > 2s.
- Hard cap date range to 180 days; instruct user to export multiple ranges if needed.

This dashboard directly supports the MVP reliability goal: it surfaces whether Google sync is healthy, whether negative reviews are being handled within SLA, and whether the system is producing real posted replies (the key outcome for reputation lift).