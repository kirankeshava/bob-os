# Metrics Dashboard Implementation (Build-Ready): Next.js Pages + API + Queries + CSV

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:19:09.612Z

---

This document is the build-ready implementation for the MVP in-app metrics dashboard, including the exact routes, payload shapes, KPI definitions, and query approach using existing tables.

1) Routes/UI
A. Page: /app/admin/metrics
- Access: authenticated + member of Business (UserBusinessMembership).
- Controls:
  - Date range: dateFrom/dateTo (default: last 14 days).
  - Location filter: All locations or specific locationId.
  - Buttons: “Apply”, “Export CSV”.
- Sections:
  1) Sync Health (table): Location, Source (GBP/manual/Yelp), Status (green/yellow/red), lastSyncAt, lastError.
  2) Funnel KPIs (cards): Ingested, Drafted, Approved, Posted. Show conversion rates (Drafted/Ingested etc.).
  3) Response Time: median minutes (posted - createdAt), p90 minutes.
  4) Reputation: avg rating, negative share (rating<=2 OR sentiment=negative).
  5) Alerts: total alerts in range, negative-review alerts, sync-failure alerts.
  6) Daily series (table or lightweight chart): per-day ingested/drafted/approved/posted + avg_rating + negative_share + alerts.

2) KPI Definitions (must remain consistent)
- Ingested: Review.createdAt in range AND (optional locationId filter).
- Drafted: DraftReply.createdAt in range for reviews in filter OR derived as count of reviews with at least one draft created in range. Prefer: drafts created in range.
- Approved: DraftReply.approvedAt in range.
- Posted: DraftReply.postedAt in range OR status in {posted_manual, posted_api} with postedAt set.
- Response time (minutes): for posted drafts only: postedAt - Review.createdAt. Exclude rejected/unposted.
- Avg rating: average Review.rating in range.
- Negative share: count of reviews where (rating<=2 OR sentiment='negative') / total reviews in range.
- Alerts volume: AlertEvent.createdAt in range. Break down by type (negative_review, sync_failure, ocr_failure, etc.).

3) API Endpoints
A. GET /api/admin/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=optional
- RBAC: ensure user is member of business; businessId can be inferred from session “active business” selector or first membership.
- Response payload:
{
  "range": {"dateFrom": "2026-04-01", "dateTo": "2026-04-08"},
  "filters": {"locationId": null},
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","source":"google","status":"green","lastSyncAt":"...","lastError":null}
  ],
  "funnel": {"ingested": 120, "drafted": 98, "approved": 70, "posted": 55},
  "reputation": {"avgRating": 4.42, "negativeShare": 0.07},
  "responseTimeMinutes": {"median": 180, "p90": 1440},
  "alerts": {"total": 6, "byType": {"negative_review": 4, "sync_failure": 2}},
  "daily": [
    {"date":"2026-04-01","ingested":10,"drafted":8,"approved":6,"posted":5,"avgRating":4.5,"negativeShare":0.1,"alerts":1,"medianResponseMinutes":210}
  ]
}

B. GET /api/admin/metrics.csv?dateFrom=...&dateTo=...&locationId=...
- RBAC same as above.
- CSV columns:
  date, ingested, drafted, approved, posted, avg_rating, negative_share, median_response_minutes, alerts_total, alerts_negative_review, alerts_sync_failure

4) Query Strategy (Prisma + small raw SQL)
A. Base filters
- Always filter by businessId and date range.
- If locationId present, include locationId in Review and DraftReply joins.

B. Funnel counts
- Ingested:
  prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: start, lt: end } } })
- Drafted:
  prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: start, lt: end } } })
- Approved:
  prisma.draftReply.count({ where: { businessId, locationId?, approvedAt: { gte: start, lt: end } } })
- Posted:
  prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: start, lt: end }, status: { in: ["posted_manual","posted_api"] } } })

C. Reputation metrics
- Avg rating:
  prisma.review.aggregate({ where: {...}, _avg: { rating: true } })
- Negative share:
  - negativeCount: prisma.review.count({ where: { ... , OR: [{ rating: { lte: 2 } }, { sentiment: "negative" }] } })
  - totalCount: ingested

D. Response time distribution
- Fetch posted drafts joined to review createdAt, compute minutes in SQL for median/p90 (Postgres percentile_cont), because Prisma lacks percentile.
Example raw SQL (parameterized):
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS median_minutes,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p90_minutes
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE d."businessId" = $1
  AND d."postedAt" >= $2 AND d."postedAt" < $3
  AND d.status IN ('posted_manual','posted_api')
  AND ($4::text IS NULL OR r."locationId" = $4);

E. Daily series
- Use raw SQL to group by date (fast + consistent):
  - Reviews ingested per day (count)
  - Drafts created/approved/posted per day (count)
  - Avg rating per day
  - Negative share per day
  - Alerts per day
  - Median response minutes per day (optional; can be computed only overall to keep MVP fast)

5) Sync Health Computation
- For each Location in business:
  - lastSyncAt: use Location.lastGbpReviewSyncUpdateTime (converted to timestamp) and/or Integration.lastSyncAt if present.
  - lastError: Integration.lastError if set recently.
  - status:
    - green: lastSyncAt within last 24h AND no error.
    - yellow: lastSyncAt within 72h OR intermittent errors.
    - red: no sync recorded OR lastError exists and lastSyncAt stale >72h.

6) Notes on Reliability
- All endpoints must validate dateFrom/dateTo and cap maximum window (e.g., 120 days) to avoid expensive queries.
- Add server-side caching headers for metrics (short TTL) if needed.
- Log correlationId + businessId + timings; send slow query warnings to Sentry.

7) Optional customer-facing use
The CSV export is suitable to share with customers as proof of value (response time improvements, negative-share reduction). When writing customer instructions or emails, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
- Support/Contact: agent_bob_replit+review-bot@agentmail.to

This completes the metrics dashboard portion of the MVP workflow and provides a low-risk foundation for pilot validation.