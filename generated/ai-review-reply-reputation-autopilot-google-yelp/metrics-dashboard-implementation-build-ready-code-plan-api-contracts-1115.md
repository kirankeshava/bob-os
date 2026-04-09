# Metrics Dashboard Implementation (Build-Ready Code Plan + API Contracts)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:07:31.139Z

---

Below is a build-ready implementation outline for the shipped metrics dashboard so the system is maintainable and easy to extend. It documents the page layout, API contracts, Prisma/SQL aggregation definitions, and CSV schema.

1) Page: /app/admin/metrics
- Access: authenticated user must have UserBusinessMembership for the selected business.
- Controls:
  - Date range: dateFrom, dateTo (default last 14 days).
  - Location filter: locationId (optional; default all enabled locations).
  - Source filter (optional): google/yelp/manual.
- Panels:
  A) Sync Health (table)
    - Columns: Location name, integration source, lastSyncAt, lastError (if any), status (OK/STALE/FAILING).
    - Logic:
      - STALE if now - lastSyncAt > 24h (or configurable).
      - FAILING if AlertEvent exists in last 24h with type in [INTEGRATION_SYNC_FAILED, GBP_SYNC_FAILED] OR Integration.lastError not null.
  B) Funnel KPIs (cards)
    - Ingested: count(Review.createdAt within range)
    - Drafted: count(DraftReply.createdAt within range)
    - Approved: count(DraftReply.approvedAt within range)
    - Posted: count(DraftReply.postedAt within range) OR status in [posted_manual, posted_api]
    - Conversion rates displayed: drafted/ingested, approved/drafted, posted/approved.
  C) Response Time
    - Median, P90 response time.
    - Definition: postedAt - Review.createdAt for reviews that have postedAt and were not rejected. Exclude drafts that were rejected or never posted.
    - Distribution buckets: <1h, 1-4h, 4-24h, 1-3d, >3d.
  D) Reputation Trend
    - Avg rating trend by day/week (depending on date range): group by date(review.createdAt) and avg(rating).
    - Negative share: percent of reviews with rating<=2 OR sentiment=negative.
  E) Themes
    - Top category labels from tagging: service/price/staff/quality/cleanliness/wait_time/other.
    - Computation: explode categoryLabels array or stored join table; count occurrences in range.
  F) Alerts
    - Count AlertEvent by type and by day.

2) API: GET /api/admin/metrics
- Query params:
  - businessId (required)
  - dateFrom (ISO date, optional)
  - dateTo (ISO date, optional)
  - locationId (optional)
- Validation:
  - Default range to last 14 days.
  - Reject ranges > 90 days (HTTP 400) unless user is platform admin.
- Response JSON shape:
{
  "range": {"dateFrom":"2026-03-26","dateTo":"2026-04-09","timezone":"America/New_York"},
  "filters": {"locationId": null},
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","source":"google","lastSyncAt":"...","status":"OK","lastError":null}
  ],
  "funnel": {
    "ingested": 42,
    "drafted": 40,
    "approved": 33,
    "posted": 28,
    "rates": {"draftedPerIngested":0.95,"approvedPerDrafted":0.825,"postedPerApproved":0.848}
  },
  "responseTime": {
    "medianMinutes": 180,
    "p90Minutes": 1440,
    "buckets": {"lt1h":5,"h1to4":12,"h4to24":9,"d1to3":2,"gt3d":0}
  },
  "reputation": {
    "avgRating": 4.41,
    "negativeShare": 0.095,
    "series": [{"date":"2026-04-01","avgRating":4.2,"count":5,"negativeShare":0.2}]
  },
  "themes": [{"label":"staff","count":12},{"label":"service","count":9}],
  "alerts": {"total": 3, "byType": {"NEGATIVE_REVIEW":2,"SYNC_FAILED":1}, "series": [{"date":"2026-04-05","count":1}]}
}

3) API: GET /api/admin/metrics.csv
- Same query params/validation as JSON.
- CSV rows:
  - Summary section (single-row): dateFrom,dateTo,locationFilter,ingested,drafted,approved,posted,medianMinutes,p90Minutes,avgRating,negativeShare,alertsTotal
  - Per-location breakdown section (multi-row): locationName,source,ingested,posted,avgRating,negativeShare,medianMinutes,lastSyncAt,status
  - Themes section (multi-row): themeLabel,count

4) Aggregation definitions (Prisma/SQL guidance)
- Reviews base filter:
  WHERE Review.businessId = :businessId
    AND Review.createdAt BETWEEN :dateFrom AND :dateTo
    AND (:locationId IS NULL OR Review.locationId = :locationId)
- Funnel:
  - ingested = COUNT(Review.id)
  - drafted = COUNT(DraftReply.id WHERE DraftReply.createdAt in range AND DraftReply.reviewId joins filtered reviews)
  - approved = COUNT(DraftReply.id WHERE approvedAt in range)
  - posted = COUNT(DraftReply.id WHERE postedAt in range)
- Response time:
  - SELECT percentile_cont(0.5) within group (order by extract(epoch from (postedAt - Review.createdAt))/60)
  - Only include rows where postedAt IS NOT NULL AND DraftReply.status NOT IN ('rejected')
- Avg rating series:
  - groupBy day: date_trunc('day', Review.createdAt)
  - avg(rating), count(*), negativeShare = avg(CASE WHEN rating<=2 OR sentiment='negative' THEN 1 ELSE 0 END)
- Themes:
  - If stored as string[] categoryLabels: use SQL unnest(categoryLabels) group by label.
  - If stored normalized: join ReviewCategoryLabel table.

5) UI notes
- Use server components for initial load (fast + secure) and client components for chart interactions.
- Provide an empty state when there are 0 reviews in range: show CTA buttons to import CSV, connect Google, or forward emails.
- Show a compact “Operational Status” banner at top:
  - Green: no stale/failed locations.
  - Yellow: stale sync >24h.
  - Red: failing sync alert in last 24h.

6) Reliability + instrumentation
- Add correlationId per request and include businessId, userId in logs.
- Add Sentry spans around each aggregation block (funnel, reputation series, response time) to isolate slow queries.
- Hard cap date range length and add DB indexes if needed:
  - Review(businessId, createdAt)
  - DraftReply(businessId, createdAt), DraftReply(approvedAt), DraftReply(postedAt)
  - AlertEvent(businessId, createdAt)

This artifact is the authoritative reference for the shipped dashboard and ensures anyone can extend metrics (e.g., per-template performance, sentiment drift, SLA compliance) without redefining KPIs inconsistently.