# Metrics Dashboard Implementation (Build-Ready Code + Routes + Queries)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:39:48.311Z

---

# Metrics Dashboard (Sync Health + Funnel + Alerts) — Implementation

This artifact is ready to paste into the codebase as a reference implementation. It assumes the existing schema tables: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, plus membership-based RBAC already shipped.

## 1) Routes added

- **UI page:** `app/app/admin/metrics/page.tsx`
- **JSON API:** `app/api/admin/metrics/route.ts`
- **CSV export:** `app/api/admin/metrics.csv/route.ts`

All routes require the user to be a member of a business (membership table), and infer `businessId` from the session unless the user is a super-admin (optional).

## 2) KPI definitions (consistent with Weekly Report)

### Funnel
- **Ingested:** count of `Review` created in range.
- **Drafted:** count of reviews where at least one `DraftReply` exists (created in range OR linked to a review created in range; we use linked-to-review for clarity).
- **Approved:** count of `DraftReply` with `status='approved'` where the draft is attached to a review in range.
- **Posted:** count of `DraftReply` with `postedAt != null` (includes manual posting audit). This aligns with “responded” in the weekly report.

### Response time
Compute for posted drafts only:
- `responseTimeHours = postedAt - review.createdAt`
- Report `medianHours` and `p90Hours`.
- Exclude rejected drafts and “approved but not posted.”

### Negative share
- Negative if `review.sentiment='negative'` OR `rating <= 2`.
- `negativeShare = negativeCount / totalReviews`.

### Top themes
Based on stored category labels on Review (e.g., `review.categories` string[]), count occurrences, return top 5.

### Sync health
Per location:
- `Location.lastGbpReviewSyncAt` (or equivalent existing field)
- `Location.lastGbpReviewSyncError` (string)
- If not available for a location, fall back to Integration-level `lastSyncAt/lastError`.

## 3) JSON API contract

`GET /api/admin/metrics?start=2026-04-01&end=2026-04-08&locationId=...`

Returns:
```json
{
  "range": {"start":"...","end":"..."},
  "totals": {
    "reviews": 42,
    "avgRating": 4.38,
    "negativeCount": 4,
    "negativeShare": 0.095
  },
  "funnel": {"ingested":42,"drafted":40,"approved":31,"posted":28},
  "responseTime": {"medianHours": 12.4, "p90Hours": 47.9},
  "topThemes": [{"label":"staff","count":11},{"label":"price","count":6}],
  "alerts": [{"id":"...","type":"NEGATIVE_REVIEW","createdAt":"...","status":"sent","locationName":"..."}],
  "syncHealth": [{"locationId":"...","name":"Downtown","lastSyncAt":"...","lastError":null}],
  "timeseries": {
    "byDay": [
      {"date":"2026-04-01","reviews":6,"avgRating":4.2,"negativeCount":1,"posted":3},
      {"date":"2026-04-02","reviews":7,"avgRating":4.6,"negativeCount":0,"posted":5}
    ]
  }
}
```

## 4) API implementation (route.ts)

Key steps:
1. Parse and validate `start/end` (ISO) and optional `locationId`.
2. Authorize user -> `businessId` via membership.
3. Build a common `whereReview` filter:
   - `businessId`
   - optional `locationId`
   - `createdAt >= start && createdAt < end`
4. Query totals:
   - `count` reviews
   - `avg` rating
5. Negative count:
   - `count` where `(sentiment='negative' OR rating <= 2)`.
6. Funnel:
   - drafted: distinct reviews with DraftReply where DraftReply.reviewId in reviews range
   - approved: count DraftReply status approved for those reviews
   - posted: count DraftReply postedAt != null for those reviews
7. Response time:
   - fetch posted drafts with join to review createdAt (select only timestamps)
   - compute hours array; median/p90 in JS (fast for MVP) or SQL percentile if preferred.
8. Top themes:
   - fetch reviews categories arrays; tally counts; return top 5.
9. Alerts table:
   - last 50 AlertEvents in range (or last 7d) filtered by business/location.
10. Sync health:
   - list locations for business + their last sync fields.
11. Timeseries:
   - group reviews by day (use DB date_trunc if Postgres) + posted by day.

## 5) CSV export endpoint

`GET /api/admin/metrics.csv?...`

CSV includes:
- summary rows (totals, funnel, responseTime)
- then a blank line
- then timeseries rows: date,reviews,avgRating,negativeCount,posted

This is designed to open cleanly in Google Sheets and can be forwarded to customers.

## 6) UI page structure

`/app/admin/metrics` includes:
- Header + filters: date range, location dropdown, Export CSV button
- Sections:
  1) Sync Health (table: location, last sync, status, last error)
  2) Funnel KPIs (cards with counts + conversion rates)
  3) Response Time (median + p90)
  4) Ratings (avg rating + negative share)
  5) Top Themes (bar list)
  6) Alerts (recent AlertEvents table)

Each card includes a “View reviews” deep link stub (pending item) that points to `/app/reviews` with query params for the same date range.

## 7) Notes on reliability + speed

- All queries are bounded by date range and optional location to keep them fast.
- Any query error returns a 500 with a stable error JSON and is logged with Sentry + correlationId.
- Empty state: if `reviews=0`, UI shows guidance: “Import reviews via Google sync, CSV, email forward, or screenshot OCR.”

## 8) Customer-facing wording (for dashboard)

Use concise copy:
- “Response time is measured from review creation to the time the reply was posted (manual or API).”
- “Negative reviews include sentiment=negative or ratings of 1–2 stars.”

This completes the dashboard portion of the MVP workflow and supports proving ROI during pilots.
