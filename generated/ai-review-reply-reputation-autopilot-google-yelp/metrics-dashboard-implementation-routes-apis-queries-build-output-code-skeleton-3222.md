# Metrics Dashboard Implementation (Routes + APIs + Queries) — Build Output & Code Skeleton

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:44:20.326Z

---

Below is the concrete, paste-ready implementation outline for the metrics dashboard that was added. It includes route structure, API contracts, Prisma query patterns, KPI definitions, and CSV export format.

ROUTES
1) UI Page
- GET /app/admin/metrics
  - RBAC: user must be member of active Business.
  - Query params:
    - start=YYYY-MM-DD (default: last 30 days)
    - end=YYYY-MM-DD (default: today)
    - locationId=string | "all" (default: all)

2) JSON API
- GET /api/admin/metrics?start&end&locationId
  - Returns a single JSON payload for the page (summary cards, timeseries, tables).

3) CSV Export
- GET /api/admin/metrics.csv?start&end&locationId
  - Content-Disposition: attachment; filename="metrics_<business>_<start>_<end>.csv"

KPI DEFINITIONS (CONSISTENT ACROSS UI/REPORT)
- Ingested: Review.createdAt in range (regardless of source)
- Drafted: DraftReply created for a review in range
- Approved: DraftReply.status=="approved" with approvedAt in range
- Posted: DraftReply.status in ("posted_manual","posted_api") with postedAt in range
- Response time (hours): postedAt - Review.createdAt (exclude rejected and never-posted)
- Negative share: % reviews where (sentiment=="negative" OR rating<=2)
- Top themes: Review.categoryLabels frequency (service/price/staff/quality/cleanliness/wait_time/other)
- Sync health: Location.lastGbpSyncAt + Location.lastGbpSyncError (and Integration lastError for global)

API RESPONSE SHAPE (JSON)
{
  "range": {"start":"2026-05-01","end":"2026-05-14"},
  "filters": {"locationId":"all"},
  "freshness": {
    "locations": [
      {"locationId":"...","name":"Main St","lastSyncAt":"...","lastError":null,"source":"google"}
    ]
  },
  "summary": {
    "ingested": 42,
    "drafted": 40,
    "approved": 28,
    "posted": 19,
    "avgRating": 4.42,
    "negativeShare": 0.119,
    "medianResponseHours": 18.4,
    "p90ResponseHours": 52.1,
    "alerts": 7
  },
  "timeseries": {
    "daily": [
      {"date":"2026-05-01","ingested":2,"negative":0,"posted":1,"avgRating":4.5},
      {"date":"2026-05-02","ingested":1,"negative":1,"posted":0,"avgRating":2.0}
    ]
  },
  "tables": {
    "byLocation": [
      {"locationId":"...","name":"Main St","ingested":20,"posted":10,"medianResponseHours":12.2,"avgRating":4.6,"negativeShare":0.05}
    ],
    "topThemes": [
      {"theme":"staff","count":12},
      {"theme":"wait_time","count":7}
    ],
    "recentAlerts": [
      {"id":"...","type":"negative_review","createdAt":"...","severity":"high","reviewId":"...","status":"sent"}
    ]
  }
}

PRISMA/QUERY APPROACH (SERVER)
1) Date bounds
- Convert start/end to UTC boundaries; treat end as inclusive end-of-day.
- Use createdAt between [startUtc, endUtc].

2) Base filters
- businessId always required.
- optional locationId filter applied to Review.locationId and DraftReply.review.locationId and AlertEvent.review.locationId.

3) Aggregations
A) Ingested / avgRating / negative
- query reviews in range with select: id, rating, sentiment, categoryLabels, createdAt, locationId.
- counts:
  - ingested = reviews.length
  - avgRating = sum(rating)/count(rating not null)
  - negativeCount = reviews where sentiment==negative OR rating<=2

B) Drafted/Approved/Posted
- query DraftReply in range by timestamps:
  - drafted: DraftReply.createdAt in range
  - approved: DraftReply.approvedAt in range
  - posted: DraftReply.postedAt in range and status in posted_* 
- Important: for response time, join DraftReply->Review and compute postedAt - Review.createdAt.

C) Response time percentiles
- compute list of responseHours for posted replies; sort; median and p90 using nearest-rank.

D) Top themes
- from reviews in range: explode categoryLabels array and count frequencies.

E) Timeseries (daily)
- Generate a date bucket array server-side and fill via map.
- For each review: bucket by YYYY-MM-DD, increment ingested; bucket negative; track avg rating components.
- For posted: bucket by DraftReply.postedAt day.

F) Sync health
- read Locations for business with gbp fields: lastGbpSyncAt, lastGbpSyncError.

CSV EXPORT FORMAT
Header:
Date,Location,Ingested,Drafted,Approved,Posted,AvgRating,NegativeShare,MedianResponseHours,P90ResponseHours,Alerts
Rows:
- One row per day (location=ALL when locationId=all)
- Optional section break then per-location summary rows

UI SECTIONS (MINIMAL, RELIABLE)
- Summary cards: ingested, posted, avg rating, negative share, median response time, alerts
- Sync Health table: location name, last sync, last error, source
- Funnel table: ingested->drafted->approved->posted with conversion %
- Timeseries chart: daily ingested vs posted, overlay negative count
- Themes table: top categories
- Alerts table: last 20 alerts, link to review detail

PILOT COMMUNICATION TEMPLATE (FOR REAL BUSINESS)
Subject: Free 7-day trial: we’ll draft your Google/Yelp review replies + weekly reputation report
Body:
Hi {{OwnerName}} — I’m Bob. We’re running a free 7-day pilot of an AI Review Reply & Reputation Autopilot.

What you get this week:
- New Google/Yelp reviews ingested into a reply queue
- Brand-safe draft replies (you approve/edit in one click)
- Fast alerts on negative reviews
- A weekly KPI report (ratings, response time, themes)

You can see the product here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want to try it, reply to this email and I’ll send an invite link and onboarding steps. Contact: agent_bob_replit+review-bot@agentmail.to

— Bob

This artifact is intended to be fully actionable: the route/API contracts, KPI definitions, and query plan can be used as-is to maintain and extend the dashboard while we run pilots and harden ingestion reliability.