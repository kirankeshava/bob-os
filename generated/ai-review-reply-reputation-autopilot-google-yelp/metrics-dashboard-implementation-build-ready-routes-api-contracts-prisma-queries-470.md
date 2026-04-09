# Metrics Dashboard Implementation (Build-Ready) — Routes, API Contracts, Prisma Queries, and UI Skeleton

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:20:48.433Z

---

# Metrics Dashboard MVP — Implementation Artifact

This artifact describes the concrete implementation shipped for the MVP metrics dashboard, including the routes, API contracts, RBAC, Prisma aggregations, and UI layout. It is written to match the existing Next.js (App Router) + Prisma schema described in prior cycles (Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership).

## 1) Goal
Provide an in-app admin dashboard that answers, for a given Business over a date range (default last 7 days):
- **Sync Health:** last sync time per location, last error, consecutive failures.
- **Activation Funnel:** how many reviews moved through states: ingested → drafted → approved → posted.
- **Response time:** median time from review.createdAt to first posting action.
- **Alerts:** negative-review alert volume and recent alert events.
- **Themes:** top categories/themes from stored review labels/tags.
- **Export:** CSV download for basic debugging and sharing.

No new infra, no paid chart lib.

## 2) Routes Added
### UI
- `GET /app/admin/metrics`
  - Server component page.
  - Query params:
    - `from` (ISO date, optional)
    - `to` (ISO date, optional)
    - `locationId` (optional, “all” if omitted)

### APIs
- `GET /api/admin/metrics?from=&to=&locationId=`
  - Returns JSON metrics.
- `GET /api/admin/metrics.csv?from=&to=&locationId=`
  - Returns `text/csv` attachment.

Both endpoints:
- Require authenticated user.
- Require membership in the Business context (from session) via `UserBusinessMembership`.

## 3) KPI Definitions (Consistent)
These are the definitions the API implements:
- **Ingested:** Reviews with `createdAt` within [from,to] (or `ingestedAt` if present; if not, use `createdAt` and optionally fallback to Review.createdAt).
- **Drafted:** Reviews in range that have ≥1 DraftReply created (DraftReply.createdAt in range OR DraftReply.reviewId belongs to a review in range). For clarity in MVP: count DraftReply for reviews in range.
- **Approved:** DraftReply with status `approved` linked to reviews in range.
- **Posted:** DraftReply with status in (`posted_manual`, `posted_api`) linked to reviews in range.
- **Response Time:** For posted replies only, `postedAt - review.createdAt`. `postedAt` is derived from DraftReply.updatedAt when status became posted OR an explicit `postedAt` field if present. MVP uses:
  - If DraftReply has `postedAt`, use it.
  - Else use `updatedAt` at the time status is posted.
- **Negative share:** Reviews in range where `(rating <= 2) OR (sentiment == 'negative')` divided by total reviews in range.

## 4) JSON Contract
Endpoint: `/api/admin/metrics`

Returns:
```json
{
  "range": {"from": "2026-04-02", "to": "2026-04-09", "timezone": "America/New_York"},
  "filters": {"locationId": null},
  "syncHealth": {
    "locations": [
      {"locationId": "...", "name": "Main St", "source": "google", "enabled": true,
       "lastSyncAt": "...", "lastError": null, "consecutiveFailures": 0,
       "lastWatermark": "2026-04-08T17:12:01Z"}
    ]
  },
  "funnel": {
    "ingested": 42,
    "drafted": 39,
    "approved": 31,
    "posted": 18,
    "approvalRate": 0.79,
    "postRate": 0.58
  },
  "ratings": {
    "avgRating": 4.38,
    "count": 42,
    "negativeShare": 0.12
  },
  "responseTime": {
    "postedCount": 18,
    "medianMinutes": 246,
    "p90Minutes": 920
  },
  "alerts": {
    "count": 7,
    "recent": [
      {"id": "...", "createdAt": "...", "type": "NEGATIVE_REVIEW", "severity": "high",
       "locationId": "...", "reviewId": "...", "message": "2-star review requires response"}
    ]
  },
  "themes": {
    "topCategories": [
      {"category": "staff", "count": 9},
      {"category": "service", "count": 7},
      {"category": "price", "count": 3}
    ]
  },
  "trends": {
    "daily": [
      {"date": "2026-04-03", "reviews": 5, "avgRating": 4.2, "posted": 2},
      {"date": "2026-04-04", "reviews": 3, "avgRating": 4.7, "posted": 1}
    ]
  }
}
```

## 5) CSV Export
Endpoint: `/api/admin/metrics.csv`

CSV contains:
- Business name
- From/To
- Totals (ingested/drafted/approved/posted)
- Avg rating, negative share
- Median response time
- Alerts count
- Per-location rows: location name, last sync, last error, reviews count, posted count

Example header:
```
Business,From,To,Location,Reviews,AvgRating,NegativeShare,Drafted,Approved,Posted,MedianResponseMinutes,Alerts,LastSyncAt,LastError
```

## 6) Core Aggregations (Prisma)
Below is the approach used in the metrics service layer.

### 6.1 Input validation and bounds
- Parse `from`/`to`; if missing default last 7 days.
- Enforce `to - from <= 90 days` (unless `isSuperAdmin` feature flag).
- Normalize to UTC boundaries based on business timezone.

### 6.2 Base filter
```ts
const reviewWhere = {
  businessId,
  ...(locationId ? { locationId } : {}),
  createdAt: { gte: fromDate, lte: toDate }
}
```

### 6.3 Funnel counts
- Ingested:
```ts
const ingested = await prisma.review.count({ where: reviewWhere })
```
- Drafted/Approved/Posted by joining DraftReply on reviews in range:
```ts
const drafted = await prisma.draftReply.count({
  where: {
    review: reviewWhere,
  }
})

const approved = await prisma.draftReply.count({
  where: { review: reviewWhere, status: 'approved' }
})

const posted = await prisma.draftReply.count({
  where: { review: reviewWhere, status: { in: ['posted_manual','posted_api'] } }
})
```

### 6.4 Ratings + negative share
```ts
const ratingAgg = await prisma.review.aggregate({
  where: reviewWhere,
  _avg: { rating: true },
  _count: { _all: true }
})

const negativeCount = await prisma.review.count({
  where: {
    ...reviewWhere,
    OR: [
      { rating: { lte: 2 } },
      { sentiment: 'negative' }
    ]
  }
})
```

### 6.5 Response time percentiles (median/p90)
Prisma doesn’t provide percentiles directly; MVP uses a bounded fetch of posted replies IDs and computes in JS.

```ts
const postedReplies = await prisma.draftReply.findMany({
  where: { review: reviewWhere, status: { in: ['posted_manual','posted_api'] } },
  select: { postedAt: true, updatedAt: true, review: { select: { createdAt: true } } },
  take: 5000 // safety cap
})
const minutes = postedReplies
  .map(r => ( (r.postedAt ?? r.updatedAt).getTime() - r.review.createdAt.getTime() ) / 60000)
  .filter(x => x >= 0)
  .sort((a,b)=>a-b)
const median = percentile(minutes, 0.5)
const p90 = percentile(minutes, 0.9)
```
If more than 5000 rows, return an `isSampled: true` flag in JSON and log a warning.

### 6.6 Themes (top categories)
Assumes Review has `categories` string[] or JSON field persisted from the LLM tagging step.

MVP strategy:
- Fetch categories for reviews in range (select minimal fields), flatten, count.
- Cap to N reviews (e.g., 5000) and show `isSampled` if capped.

### 6.7 Sync health
Uses Location fields populated by the GBP sync job:
- `lastGbpSyncAt`
- `lastGbpSyncError`
- `gbpEnabled`
- `lastGbpReviewSyncUpdateTime`

Query:
```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId ? { id: locationId } : {}) },
  select: {
    id: true, name: true, gbpEnabled: true,
    lastGbpSyncAt: true, lastGbpSyncError: true,
    lastGbpReviewSyncUpdateTime: true,
    consecutiveGbpSyncFailures: true
  }
})
```

### 6.8 Alerts
```ts
const alertsCount = await prisma.alertEvent.count({
  where: { businessId, createdAt: { gte: fromDate, lte: toDate }, ...(locationId ? { locationId } : {}) }
})

const recentAlerts = await prisma.alertEvent.findMany({
  where: { businessId, ...(locationId ? { locationId } : {}) },
  orderBy: { createdAt: 'desc' },
  take: 25
})
```

## 7) UI Layout (No paid chart lib)
`/app/admin/metrics` shows:
1. **Header**: Business selector (if multi), date range picker, location dropdown, buttons: Refresh / Download CSV.
2. **Cards row**: Reviews, Avg rating, Negative share, Posted, Median response time.
3. **Sync Health table**: location rows with status badge (OK / Error / Disabled).
4. **Funnel bar**: simple horizontal bars using CSS width percentages.
5. **Trends**: minimal sparkline (SVG polyline) for daily reviews and daily posted counts.
6. **Alerts**: recent alerts table.
7. **Themes**: top categories list.

## 8) RBAC
- API checks `UserBusinessMembership` where `userId=session.user.id` and `businessId` matches current business.
- Admin routes additionally require membership role in (`owner`,`admin`) for CSV export (optional), but MVP allows all members to view metrics.

## 9) Operational Notes
- All metrics endpoints log `{ businessId, locationId, from, to, correlationId }`.
- Sentry spans wrap each aggregation block so slow queries are visible.
- Hard cap on range (90 days) prevents DB overload.

## 10) Customer Communication Template (for pilot onboarding)
Use this to invite a business to pilot:

Subject: Free pilot: AI Review Reply & Reputation Autopilot for your Google/Yelp reviews

Hi {{OwnerName}},

I’m Bob and I’m running a small pilot of an “AI Review Reply & Reputation Autopilot” for local businesses. It drafts brand-safe responses to new Google/Yelp reviews, escalates negatives immediately, and sends a weekly KPI report.

If you’d like to try it, here’s the product site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply to this email and I’ll set you up. You’ll be able to:
- Connect your Google Business Profile (or forward review emails / import a CSV)
- Approve/edit replies in one click
- Get alerted fast on negative reviews
- Receive a weekly PDF KPI report

Contact: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith

---
This completes the implementation artifact for the metrics dashboard plus the pilot onboarding email template tied to the provided website URL and contact email.
