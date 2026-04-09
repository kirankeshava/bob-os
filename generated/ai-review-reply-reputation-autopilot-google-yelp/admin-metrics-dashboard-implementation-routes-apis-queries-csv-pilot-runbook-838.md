# Admin Metrics Dashboard — Implementation (Routes, APIs, Queries, CSV) + Pilot Runbook

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:26:36.623Z

---

Below is build-ready implementation content for the in-app metrics dashboard and a pilot runbook to validate stability using a real (non-test) Google Business Profile.

1) ROUTES (Next.js App Router)

A. Page route
- /app/admin/metrics
  - Server component page with:
    - Date range picker (default last 14 days)
    - Location filter (multi-select, default all)
    - KPI tiles: Reviews ingested, Drafts generated, Approved, Posted, Median response time, Negative share, Alerts triggered
    - Charts/tables:
      1) Funnel over time (daily buckets): ingested/drafted/approved/posted
      2) Sync health table per location: lastSyncAt, lastSuccessAt, lastError, failures7d
      3) Alerts over time: by type/severity
      4) Top themes: category counts from Review.tags

B. API routes (RBAC)
- GET /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationIds=...&bucket=daily
- GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationIds=...

RBAC rule: caller must be a member of the business (UserBusinessMembership). If not, return 403.

2) KPI DEFINITIONS (CONSISTENT)

Time window filtering:
- A review is “ingested” if Review.createdAt is within [start,end].
- Draft counts are based on DraftReply.createdAt within [start,end] AND linked Review belongs to selected business/locations.
- “Approved” if DraftReply.status == 'approved' and approvedAt within [start,end].
- “Posted” if DraftReply.status in ('posted_manual','posted_api') and postedAt within [start,end].

Response time:
- For posted replies only: responseTimeMinutes = postedAt - Review.createdAt.
- Aggregate as median (p50) and p90; exclude rejected/unposted.

Negative share:
- Negative if Review.sentiment == 'negative' OR rating <= 2.
- negativeShare = negativeCount / totalReviews.

Top themes:
- Use Review.categoryLabels array (or tags JSON) and count occurrences for reviews in range.

3) AGGREGATION QUERIES (PRISMA/SQL SHAPE)

A. Base filters
- businessId required
- locationIds optional
- date range required

Pseudo-Prisma filter snippets:

const reviewWhere = {
  businessId,
  ...(locationIds?.length ? { locationId: { in: locationIds } } : {}),
  createdAt: { gte: startDate, lte: endDate }
};

const draftWhere = {
  review: {
    businessId,
    ...(locationIds?.length ? { locationId: { in: locationIds } } : {}),
    createdAt: { lte: endDate } // allow drafts even if review created earlier
  },
  createdAt: { gte: startDate, lte: endDate }
};

B. Funnel totals
- ingested = count(Review where reviewWhere)
- drafted = count(DraftReply where draftWhere)
- approved = count(DraftReply where status='approved' and approvedAt in range)
- posted = count(DraftReply where status in posted statuses and postedAt in range)

C. Time series buckets (daily)
Use SQL via prisma.$queryRaw for performance and correct bucketting.
Example (Postgres):

SELECT date_trunc('day', r."createdAt") AS day,
       count(*) AS ingested,
       sum(CASE WHEN r."sentiment"='negative' OR r."rating"<=2 THEN 1 ELSE 0 END) AS negative
FROM "Review" r
WHERE r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
  AND ($4::text[] IS NULL OR r."locationId" = ANY($4))
GROUP BY 1
ORDER BY 1;

Similar series for DraftReply approved/posted using approvedAt/postedAt.

D. Response time distribution
Query posted drafts joined to reviews:

SELECT EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60 AS minutes
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId"=$1
  AND d."postedAt" BETWEEN $2 AND $3
  AND d.status IN ('posted_manual','posted_api')
  AND ($4::text[] IS NULL OR r."locationId" = ANY($4));

Compute median/p90 in JS by sorting minutes; or use percentile_cont in SQL:

SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p50,
       percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p90
...

E. Sync health
From Location fields + recent AlertEvents:
- Location.lastGbpSyncAt
- Location.lastGbpSyncError
- failures7d = count(AlertEvent where type like 'google_sync_failed' and createdAt in last 7 days)

4) API RESPONSE SHAPE

GET /api/admin/metrics returns JSON:
{
  range: { start, end },
  totals: {
    ingested, drafted, approved, posted,
    negativeCount, negativeShare,
    responseTime: { p50Minutes, p90Minutes }
  },
  series: {
    ingestedDaily: [{ day, ingested, negative }],
    postedDaily: [{ day, posted }],
    approvedDaily: [{ day, approved }],
    alertsDaily: [{ day, total, highSeverity }]
  },
  syncHealth: [
    { locationId, locationName, source: 'google', lastSyncAt, lastSuccessAt, lastError, failures7d }
  ],
  themes: [{ label: 'staff', count: 12 }, ...]
}

5) CSV EXPORT CONTENT

/api/admin/metrics.csv produces rows:
- Section 1: Totals (key,value)
- Section 2: Daily series (day, ingested, negative, approved, posted, alerts)
- Section 3: Sync health per location (location, lastSyncAt, lastError, failures7d)
- Section 4: Themes (label,count)

6) UI COPY (LIGHTWEIGHT, IN-APP)

Header: “Metrics (Internal)”
Subtext: “Use this to verify review sync health and how fast replies are going out. Export CSV for debugging or client reporting.”
KPI definitions tooltip text:
- “Response time = time from review creation to posted reply. Rejected/unposted drafts are excluded.”
- “Negative = sentiment negative or rating ≤ 2.”

7) PILOT RUNBOOK (NON-TEST GBP, MULTI-LOCATION)

Goal: Validate stability and correctness over 72 hours with at least 2 locations.

Step 0 — Preconditions
- Business created in /app/admin/businesses
- At least one user invited and accepted (magic link)
- Escalation recipients set (owner + backup email)

Step 1 — Connect Google
- Go to /app/integrations/google/connect
- Complete OAuth
- Select 2+ locations to enable syncing
- Confirm /api/health/integrations shows lastSyncAt populated after first sync

Step 2 — Force initial sync
- Trigger /api/cron/sync manually (or wait for cron)
- Verify Reviews appear in /app/reviews with source=google
- Verify Tagging + Draft generation created DraftReply records

Step 3 — Approve + post (manual)
- Approve 3 drafts; mark as posted_manual after copy/paste
- Confirm response-time KPIs update in /app/admin/metrics

Step 4 — Negative review SLA
- Identify (or create) at least 1 negative review (rating <=2)
- Confirm alert email received (Resend)
- Confirm AlertEvent created and visible in metrics

Step 5 — Incremental updates
- Over 48–72 hours, ensure:
  - No duplicate reviews (upsert key stable)
  - Edited reviews update and create a new draft if content changed
  - Sync failures produce AlertEvents but do not block other locations

Step 6 — Weekly report verification
- Trigger /api/cron/weekly-reports (or wait)
- Confirm PDF email renders correctly on Gmail + Outlook
- Cross-check totals against /app/admin/metrics for same range

Acceptance criteria
- 0 missed reviews across enabled locations (spot-check via GBP UI)
- Median response time and posted counts reflect reality
- Negative alerts fire within configured SLA
- CSV export opens cleanly in Google Sheets

If any failure occurs, capture:
- correlationId from logs (shown in admin error toast or Sentry event)
- businessId/locationId
- timestamp window and failing endpoint

This artifact is complete: it defines the routes, KPI definitions, aggregation approach, API shapes, CSV content, and a pilot runbook to validate the end-to-end system using the metrics dashboard as the control panel.