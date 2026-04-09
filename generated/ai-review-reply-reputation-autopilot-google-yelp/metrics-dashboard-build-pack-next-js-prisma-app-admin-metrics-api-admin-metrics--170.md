# Metrics Dashboard Build Pack (Next.js + Prisma): /app/admin/metrics + /api/admin/metrics + CSV export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T03:37:49.658Z

---

# Goal
Ship a lightweight in-app metrics dashboard for the MVP that helps (a) you debug onboarding + activation, and (b) customers see proof of value. Must use existing data (Review/DraftReply/AlertEvent/AuditLog/WeeklyReport/Location) and work with multi-location businesses.

Website reference for legitimacy (show in-app footer / emails if needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## Routes / Pages
### 1) UI Page
- `GET /app/admin/metrics`
  - Server Component page with:
    - Date range picker (default last 14 days)
    - Location filter (All + each location)
    - Tabs: **Funnel**, **Sync Health**, **Alerts**, **Exports**

### 2) JSON API
- `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...|all&tz=America/Los_Angeles`
  - Returns computed metrics for the current Business (derived from session membership).

### 3) CSV Export
- `GET /api/admin/metrics.csv?from=...&to=...&locationId=...|all&type=funnel|alerts|sync|reviews`
  - Returns `text/csv` for basic offline debugging.

---

## Access Control (RBAC)
- Require authenticated user.
- Resolve `businessId` from `UserBusinessMembership`.
- Reject if user not a member.
- For location filtering, validate `locationId` belongs to that business.

Implementation note:
- Centralize in `requireBusinessMembership()` helper used by page + APIs.

---

## Metrics Definitions (must be consistent)
### Funnel counts (within date range)
Use review `createdAt` as the anchor (ingested date):
- **Ingested**: `Review.createdAt` in range.
- **Drafted**: reviews in range having at least one `DraftReply` (any status) created for that review.
- **Approved**: reviews in range with a `DraftReply.status = 'approved'` at any time.
- **Posted**: reviews in range with `DraftReply.status IN ('posted_manual','posted_api')`.

Rates:
- Draft rate = drafted/ingested
- Approval rate = approved/drafted
- Post rate = posted/approved

### Response time
- **Time to first draft**: min(`DraftReply.createdAt`) - `Review.createdAt` (for drafted reviews)
- **Time to approval**: time from `Review.createdAt` to first time a draft became approved (use earliest approved draft timestamp)
- **Time to posted**: time from `Review.createdAt` to earliest posted timestamp.

Exclude rejected-only flows:
- If a review has only rejected drafts and never approved/posted, it should still count as drafted, but not as approved/posted.

### Rating & sentiment mix
Within date range:
- Avg rating, count by rating bucket (1..5)
- Sentiment share based on `Review.sentiment` (positive/neutral/negative)

### Themes
Top categories from `Review.categoryLabels` (array) within date range:
- Count occurrences (each label counts once per review)
- Return top 5

### Alerts
From `AlertEvent.createdAt` in range:
- Count alerts by type (e.g., `NEGATIVE_REVIEW`, `SYNC_FAILED`, `OCR_FAILED`)
- Count by severity
- Median time-to-ack (if you track ack via AuditLog or `AlertEvent.ackAt`; if not available, omit)

### Sync health (per location)
From `Location` + Integration metadata:
- `Location.lastGbpReviewSyncAt`
- `Location.lastGbpReviewSyncUpdateTime`
- last error (if stored on Integration or via latest `AlertEvent(type=SYNC_FAILED)`)
- reviews ingested last 7 days per location

---

## Data Contracts
### /api/admin/metrics response shape
```json
{
  "range": {"from":"2026-04-01","to":"2026-04-08","tz":"America/Los_Angeles"},
  "filters": {"locationId":"all"},
  "funnel": {
    "ingested": 120,
    "drafted": 98,
    "approved": 80,
    "posted": 65,
    "rates": {"draftRate": 0.82, "approvalRate": 0.82, "postRate": 0.81},
    "responseTimeHours": {"toFirstDraftP50": 1.2, "toApprovalP50": 4.6, "toPostedP50": 22.1}
  },
  "ratings": {
    "avg": 4.62,
    "buckets": {"1": 3, "2": 4, "3": 8, "4": 25, "5": 80}
  },
  "sentiment": {"positive": 90, "neutral": 20, "negative": 10},
  "themesTop": [{"label":"staff","count":31},{"label":"service","count":28}],
  "alerts": {
    "total": 14,
    "byType": {"NEGATIVE_REVIEW": 9, "SYNC_FAILED": 3, "OCR_FAILED": 2},
    "bySeverity": {"info": 4, "warn": 7, "critical": 3}
  },
  "syncHealth": {
    "locations": [
      {
        "locationId": "loc_123",
        "name": "Downtown",
        "gbpEnabled": true,
        "lastSyncAt": "2026-04-08T12:00:00Z",
        "lastSyncUpdateTime": "2026-04-08T11:58:00Z",
        "lastError": null,
        "reviewsLast7d": 18
      }
    ]
  }
}
```

---

## Prisma Query Plan (copy/paste pseudocode)
Assumptions about schema based on prior cycles:
- `Review`: id, businessId, locationId, source, rating (Int), sentiment (String), categoryLabels (String[]), createdAt
- `DraftReply`: id, reviewId, status (enum), createdAt, updatedAt
- `AlertEvent`: id, businessId, locationId?, type, severity, createdAt
- `Location`: id, businessId, name, gbpEnabled, lastGbpReviewSyncAt, lastGbpReviewSyncUpdateTime

### Helper: build where clause
```ts
const reviewWhere: Prisma.ReviewWhereInput = {
  businessId,
  createdAt: { gte: fromDate, lte: toDate },
  ...(locationId !== 'all' ? { locationId } : {})
};
```

### Funnel counts
1) Ingested:
```ts
const ingested = await prisma.review.count({ where: reviewWhere });
```

2) Drafted / Approved / Posted:
Use distinct reviewId counts from DraftReply joined via review.
```ts
const drafted = await prisma.draftReply.count({
  where: { review: reviewWhere },
  distinct: ['reviewId']
});

const approved = await prisma.draftReply.count({
  where: { review: reviewWhere, status: 'approved' },
  distinct: ['reviewId']
});

const posted = await prisma.draftReply.count({
  where: { review: reviewWhere, status: { in: ['posted_manual','posted_api'] } },
  distinct: ['reviewId']
});
```

3) Response time percentiles (p50)
Prisma doesn’t do percentiles easily; fastest MVP approach:
- Query relevant timestamps with raw SQL (Postgres) using `percentile_cont(0.5)`.

Example: time to first draft p50 (hours)
```sql
WITH first_draft AS (
  SELECT r.id AS review_id,
         EXTRACT(EPOCH FROM (MIN(d.created_at) - r.created_at))/3600.0 AS hours
  FROM reviews r
  JOIN draft_replies d ON d.review_id = r.id
  WHERE r.business_id = $1
    AND r.created_at BETWEEN $2 AND $3
    AND ($4::text = 'all' OR r.location_id = $4)
  GROUP BY r.id
)
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY hours) AS p50
FROM first_draft;
```
Repeat for approval and posted using MIN(d.updated_at or d.created_at) filtered by status.
- Approval time: use the earliest `DraftReply` row where status became approved. If you only track current status (no status history), approximate by `MIN(d.updatedAt)` among approved drafts.
- Posted time: `MIN(d.updatedAt)` among posted drafts.

### Ratings
```ts
const ratingAgg = await prisma.review.aggregate({
  where: reviewWhere,
  _avg: { rating: true },
  _count: { rating: true }
});

const buckets = await prisma.review.groupBy({
  by: ['rating'],
  where: reviewWhere,
  _count: { _all: true }
});
```

### Sentiment
```ts
const sentiment = await prisma.review.groupBy({
  by: ['sentiment'],
  where: reviewWhere,
  _count: { _all: true }
});
```

### Themes top
If `categoryLabels` is `text[]`, easiest MVP:
- Pull reviews’ labels and count in app (acceptable for <=10k reviews).
```ts
const reviews = await prisma.review.findMany({
  where: reviewWhere,
  select: { categoryLabels: true }
});
const counts = new Map<string, number>();
for (const r of reviews) for (const lbl of (r.categoryLabels ?? [])) counts.set(lbl, (counts.get(lbl)||0)+1);
const themesTop = [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5).map(([label,count])=>({label,count}));
```

### Alerts
```ts
const alertWhere: Prisma.AlertEventWhereInput = {
  businessId,
  createdAt: { gte: fromDate, lte: toDate },
  ...(locationId !== 'all' ? { locationId } : {})
};

const totalAlerts = await prisma.alertEvent.count({ where: alertWhere });
const byType = await prisma.alertEvent.groupBy({ by: ['type'], where: alertWhere, _count: { _all: true } });
const bySeverity = await prisma.alertEvent.groupBy({ by: ['severity'], where: alertWhere, _count: { _all: true } });
```

### Sync health per location
```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId !== 'all' ? { id: locationId } : {}) },
  select: {
    id: true,
    name: true,
    gbpEnabled: true,
    lastGbpReviewSyncAt: true,
    lastGbpReviewSyncUpdateTime: true
  }
});

// reviewsLast7d per location
const from7d = new Date(Date.now()-7*24*3600*1000);
const counts7d = await prisma.review.groupBy({
  by: ['locationId'],
  where: { businessId, createdAt: { gte: from7d } },
  _count: { _all: true }
});
```
For last error:
- simplest: query latest AlertEvent type SYNC_FAILED per location in last 30d.

---

## UI Layout (minimal, fast)
### /app/admin/metrics
Header:
- Title: “Metrics”
- Subtext: “Reputation Autopilot performance and sync health”
- Date range + location dropdown

Cards row (quick overview):
- Ingested reviews
- Drafted
- Approved
- Posted

Funnel tab:
- Funnel table with counts + rates
- Response time table (p50 hours): to first draft / approval / posted
- Rating buckets mini table
- Sentiment share mini table
- Top themes list

Sync Health tab:
- Table: location | gbp enabled | last sync at | last sync updateTime | reviews last 7d | last error

Alerts tab:
- Totals + table by type/severity
- Recent alerts list (last 20) with createdAt, type, severity, location

Exports tab:
- Buttons to download CSV (funnel, alerts, sync, reviews)

Charting: keep optional.
- If you already have a lightweight chart lib, add a simple bar chart for rating buckets. Otherwise tables only.

---

## CSV Formats
### type=funnel
Columns: from,to,locationId,ingested,drafted,approved,posted,draftRate,approvalRate,postRate,toFirstDraftP50Hours,toApprovalP50Hours,toPostedP50Hours

### type=alerts
Columns: createdAt,locationId,type,severity,message (if exists)

### type=sync
Columns: locationId,name,gbpEnabled,lastSyncAt,lastSyncUpdateTime,reviewsLast7d,lastError

### type=reviews
Columns: createdAt,locationId,source,rating,sentiment,categories,hasDraft,hasApproved,hasPosted

---

## Instrumentation Notes
- For /api/admin/metrics add structured logs with `{businessId, from, to, locationId}`.
- Add Sentry breadcrumb when percentile SQL runs to catch slow queries.
- If response > 2s, log a warn with timings per section.

---

## “Done” Criteria
- Business owner can open /app/admin/metrics and see funnel + sync health for last 14 days.
- CSV exports work and match on-screen counts.
- Filters by location do not leak data across businesses.
- Query performance acceptable for MVP (<=10k reviews) with basic indexes: `Review(businessId, createdAt)`, `Review(locationId, createdAt)`, `DraftReply(reviewId, status)`, `AlertEvent(businessId, createdAt)`.
