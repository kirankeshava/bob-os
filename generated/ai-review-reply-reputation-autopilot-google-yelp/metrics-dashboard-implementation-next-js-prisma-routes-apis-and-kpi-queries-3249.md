# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, APIs, and KPI Queries

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:49:21.995Z

---

Below is the build-ready implementation content for the MVP metrics dashboard.

ROUTES
1) /app/admin/metrics
- Purpose: single-page operational dashboard for owners/admins.
- Controls: Date range (from/to), optional Location filter (All locations default).
- Sections:
  A. Sync Health
    - Table per enabled location: location name, source (GBP/manual/yelp), lastSyncAt, lastError, consecutiveFailures, reviewsFetchedLast24h.
  B. Activation Funnel
    - KPI cards: Reviews ingested, Drafts generated, Approved, Posted.
    - Derived rates: Draft rate = drafted/ingested; Approval rate = approved/drafted; Post rate = posted/approved.
  C. Response Time
    - Median and P90 response time (posted only).
    - Breakdown: posted within 24h, 48h, 7d.
  D. Rating & Sentiment
    - Avg rating in range, negative share (rating<=2 OR sentiment=negative), sentiment counts, category/theme counts.
  E. Alerts
    - Recent alert events (negative review SLA, sync failures, OCR failures), with timestamps and status.

API
2) GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
- Auth/RBAC: require logged-in user; require membership in a Business; businessId derived from session + membership.
- Validation:
  - from/to required; to>=from; max range 180 days.
  - locationId optional; must belong to business.
- Response JSON:
  {
    range: { from, to },
    funnel: { ingested, drafted, approved, posted, rates: {...} },
    responseTime: { medianSeconds, p90Seconds, within24h, within48h, within7d },
    ratings: { avgRating, count, byStars: {1..5}, sentiment: {...}, negativeShare },
    themes: { categories: [{label,count}], topPhrases: [{phrase,count}] },
    syncHealth: [{ locationId, name, source, lastSyncAt, lastError, consecutiveFailures, reviewsFetched24h }],
    alerts: [{ id, type, createdAt, status, summary }],
    daily: [{ date, ingested, drafted, approved, posted, avgRating, negativeShare }]
  }

3) GET /api/admin/metrics.csv?from=...&to=...&locationId=optional
- Same RBAC + validation.
- CSV output:
  - Summary header rows then time-series rows by day.
  - Columns: date, ingested, drafted, approved, posted, avgRating, negativeShare, medianResponseTimeSeconds.

KPI DEFINITIONS (CONSISTENT)
- Ingested: Reviews with Review.createdAt in [from,to]. (For GBP sync, createdAt = review.createTime; for manual/email/OCR, createdAt = imported timestamp.)
- Drafted: DraftReply.createdAt in range AND DraftReply.review belongs to business and (optionally) location.
- Approved: AuditLog entries where action='reply_approved' and createdAt in range.
- Posted: DraftReply where postedAt in range OR status in ['posted_manual','posted_api'] with postedAt not null.
- Response time: for posted replies only: (postedAt - Review.createdAt). Exclude rejected drafts and exclude approved-but-not-posted.
- Negative share: count of reviews where (rating<=2 OR sentiment='negative') / total ingested.

PRISMA/SQL AGGREGATION OUTLINE
- Funnel counts:
  - ingested: prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to }}})
  - drafted: prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to }}})
  - approved: prisma.auditLog.count({ where: { businessId, locationId?, action: 'reply_approved', createdAt: { gte: from, lte: to }}})
  - posted: prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }}})

- Response time:
  - Fetch posted replies joined to reviews in range:
    SELECT EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt")) AS seconds
    FROM "DraftReply" d
    JOIN "Review" r ON r.id = d."reviewId"
    WHERE d."businessId"=$1
      AND d."postedAt" BETWEEN $2 AND $3
      AND d.status IN ('posted_manual','posted_api')
      AND ($4::text IS NULL OR r."locationId"=$4)
    LIMIT 20000;
  - Compute median/p90 in app (sort seconds) to avoid complex percentile SQL on early MVP.

- Ratings & sentiment:
  - Avg rating + by stars:
    SELECT rating, COUNT(*) FROM "Review" WHERE businessId=$1 AND createdAt BETWEEN $2 AND $3 GROUP BY rating;
  - Sentiment counts:
    SELECT sentiment, COUNT(*) FROM "Review" WHERE ... GROUP BY sentiment;

- Themes/categories:
  - If categories stored as array/json on Review: unnest and group:
    SELECT label, COUNT(*) FROM (
      SELECT UNNEST("categoryLabels") AS label
      FROM "Review" WHERE ...
    ) t GROUP BY label ORDER BY COUNT(*) DESC LIMIT 10;

- Sync health:
  - From Location fields:
    SELECT id,name,"lastGbpSyncAt","lastGbpSyncError","gbpSyncFailCount" FROM "Location" WHERE businessId=$1;
  - Add reviewsFetched24h:
    SELECT "locationId", COUNT(*) FROM "Review" WHERE createdAt > now()-interval '24 hours' AND businessId=$1 GROUP BY "locationId";

UI IMPLEMENTATION NOTES (NO PAID LIBS)
- Use server components to fetch metrics JSON from /api/admin/metrics (or call internal server function directly) and render tables.
- For “daily” time-series: render as a compact table and simple bar widths using CSS (div width proportional to max value) to avoid chart dependencies.
- Add “Export CSV” button pointing to /api/admin/metrics.csv with same query params.

SECURITY & RELIABILITY
- RBAC: deny if user not member of business; never accept businessId from client.
- Input validation: zod schema; clamp date range (<=180 days).
- Rate limiting (optional later): simple per-user request interval; for now cap rows and add pagination on alerts.
- Observability: Sentry spans around metrics computation; log query params + durations (no PII).

CUSTOMER PILOT CHECKLIST (FOR NEXT STEP)
1) Invite owner via magic link.
2) Owner connects Google integration, selects locations, sets escalation recipients.
3) Run /api/cron/sync manually once (admin button) then confirm:
   - new reviews appear
   - drafts generated
   - negative alerts sent
   - weekly report scheduled
4) Verify /app/admin/metrics reflects funnel counts and response-time after posting.

This implementation uses only existing tables (Review, DraftReply, AuditLog, AlertEvent, Location) and avoids new infrastructure or paid charting libraries, keeping MVP fast and stable.