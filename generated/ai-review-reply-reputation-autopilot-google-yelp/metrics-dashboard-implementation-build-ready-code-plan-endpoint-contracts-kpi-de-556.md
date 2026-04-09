# Metrics Dashboard Implementation (Build-Ready Code Plan + Endpoint Contracts + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:13:01.846Z

---

# Metrics Dashboard (Shipped) — Implementation Notes

## Goal
Provide an in-app view for owners/admins to understand (1) review ingestion + reply workflow throughput, (2) sync reliability for Google Business Profile, and (3) alert volume/negativity trends. Must work using existing tables: Review, DraftReply, Location, Integration, AuditLog, AlertEvent.

---

## Pages and Routes

### 1) UI Page
- **Route:** `/app/admin/metrics`
- **Access:** must be a Business member (UserBusinessMembership)
- **Controls:**
  - `from` / `to` date pickers (default last 30 days)
  - optional `locationId` filter (All locations default)
  - (optional next) export CSV button calling `/api/admin/metrics.csv`

### 2) JSON Endpoint
- **Route:** `GET /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...`
- **RBAC:** verify current user is member of `businessId`
- **Validation:**
  - `from/to` required; parse as UTC dates; enforce `from <= to`
  - clamp to max range (e.g., 365 days) to avoid heavy queries

**Response contract (shape):**
```json
{
  "range": {"from": "2026-03-10", "to": "2026-04-09"},
  "filters": {"locationId": null},
  "syncHealth": [
    {
      "locationId": "...",
      "name": "Main St",
      "source": "google",
      "enabled": true,
      "lastSyncAt": "2026-04-09T01:02:03Z",
      "lastError": null,
      "lastErrorAt": null,
      "lastGbpReviewSyncUpdateTime": "2026-04-09T00:59:00Z",
      "reviewsInRange": 12
    }
  ],
  "kpis": {
    "ingested": 45,
    "drafted": 44,
    "approved": 30,
    "posted": 22,
    "approvalRate": 0.6818,
    "postRate": 0.5,
    "avgRating": 4.42,
    "negativeShare": 0.1111,
    "medianResponseTimeHours": 18.5
  },
  "timeseriesDaily": [
    {"date": "2026-04-01", "reviews": 3, "avgRating": 4.0, "negative": 1, "approved": 2, "posted": 1}
  ],
  "alerts": {
    "total": 5,
    "byType": [{"type": "negative_review", "count": 4}, {"type": "sync_failure", "count": 1}]
  },
  "topThemes": [
    {"label": "staff", "count": 9},
    {"label": "wait_time", "count": 5}
  ]
}
```

### 3) CSV Export
- **Route:** `GET /api/admin/metrics.csv?...same query params...`
- **RBAC/validation:** same as JSON
- **CSV columns:** date, reviews, avg_rating, negative_reviews, drafted, approved, posted, negative_share, median_response_time_hours, alerts_total

---

## KPI Definitions (Consistent + AuditLog-based)

### Base entities
- **Ingested:** Review createdAt in [from,to], optionally filtered by locationId.
- **Drafted:** DraftReply createdAt in [from,to] AND DraftReply.review belongs to filtered set.
- **Approved:** first AuditLog event where `action='draft_approved'` for a DraftReply/review in range.
- **Posted:** either DraftReply.status in (`posted_manual`, `posted_api`) OR AuditLog action `draft_marked_posted` in range.

### Response time
- **Response time (hours):** for each review with an approved/post event, compute:
  - `t0 = Review.createdAt`
  - `t1 = min(firstApprovedAt, firstPostedAt)`
  - `deltaHours = (t1 - t0)`
- Aggregate as **median** (more robust than mean). Exclude rejected drafts and reviews never approved/posted.

### Negative share
- Negative definition: `Review.sentiment='negative' OR Review.rating <= 2`
- `negativeShare = negativeCount / ingestedCount` (guard against 0)

### Approval/Post rates
- `approvalRate = approved / drafted` (guard against 0)
- `postRate = posted / approved` (guard against 0)

---

## Aggregation Approach (Prisma/SQL)

### Sync Health
- Query Locations for business + join Integration metadata already stored on Location (gbp ids + last watermark fields).
- ReviewsInRange computed with count where Review.locationId = Location.id and createdAt in range.

### Funnel counts
- Use Prisma `count` on Review + DraftReply with `where` filters (businessId, locationId, createdAt range).
- Approved + Posted counts best derived from AuditLog to avoid status drift:
  - Approved: count distinct `draftReplyId` where AuditLog.action='draft_approved' and `createdAt` in range.
  - Posted: count distinct draftReplyId where action='draft_marked_posted' OR DraftReply.status indicates posted.

### Time series
- Group by day using SQL (Postgres) `date_trunc('day', createdAt)` and aggregate:
  - reviews count, avg(rating), negative count
- For approved/posted daily counts, group AuditLog by day for those actions.

### Top themes
- Use Review.categoryLabels array (or JSON) and unnest:
  - SQL `unnest(review.categoryLabels)` group by label count.

---

## UI Components (Minimal)
- KPI cards: Ingested, Avg rating, Negative share, Median response time, Drafted, Approved, Posted.
- Sync health table: location, enabled, last sync, last error, reviews in range.
- Funnel bar: ingested→drafted→approved→posted.
- Alerts summary: total + by type.
- Top themes: label + count.
- CSV export button.

---

## Instrumentation
- Every metrics request logs: userId, businessId, locationId, from/to, latencyMs, result sizes.
- Errors captured in Sentry with tags: `feature=metrics`, `businessId`, `route`.

---

## Next Iterations (Pilot-driven)
1) Add “% negative responded within SLA (e.g., 24h)” using EscalationRule thresholds.
2) Add “Sync Now” button (RBAC) to trigger `/api/cron/sync` for support.
3) Add per-location breakdown for funnel KPIs and response times.
4) Add saved scheduled weekly report preview in metrics page.
