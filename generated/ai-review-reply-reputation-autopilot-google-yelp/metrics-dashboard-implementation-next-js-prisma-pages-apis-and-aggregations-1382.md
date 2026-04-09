# Metrics Dashboard Implementation (Next.js + Prisma) — Pages, APIs, and Aggregations

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:51:41.161Z

---

# Goal
Ship a lightweight, reliable metrics dashboard at **/app/admin/metrics** for the “AI Review Reply & Reputation Autopilot” MVP. It must answer: “Are reviews syncing?”, “Are we responding fast enough?”, “How many negatives and alerts are happening?”, and “What themes are trending?”

This implementation uses **existing tables**: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

---

## Routes / UI

### 1) /app/admin/metrics
**RBAC:** user must be a member of the selected Business.

**Query params** (persisted in URL):
- `from` (ISO date, required)
- `to` (ISO date, required)
- `locationId` (optional; “all locations” default)
- `bucket` (optional: `day` default; allow `week` when range > 45d)

**Sections**
1. **Sync Health**
   - Per location table: lastSyncAt, lastError, reviewsFetched (range), newReviews (range)
   - Integration status: connected/disconnected, token expiry, scopes stored (read-only display)

2. **Funnel KPIs (range)**
   - Ingested reviews
   - Drafted (DraftReply created)
   - Approved (AuditLog action APPROVE_DRAFT)
   - Posted (DraftReply.status in `posted_manual` or future `posted_api`)
   - Rates: drafted/ingested, approved/drafted, posted/approved

3. **Response Time KPIs (range)**
   - Median and p90 time-to-first-response (ingestedAt -> postedAt)
   - “Open backlog”: approved-but-not-posted, and negative-unapproved

4. **Alerts (range)**
   - count by type/severity
   - count by location

5. **Top Themes (range)**
   - counts by category label (service/price/staff/quality/cleanliness/wait_time/other)
   - sentiment breakdown (positive/neutral/negative)

6. **Exports**
   - “Download CSV” button calls `/api/admin/metrics.csv?from=...&to=...&locationId=...`

---

## API Endpoints

### 2) GET /api/admin/metrics
Returns JSON for UI rendering.

**Validation** (zod):
- from/to required
- max range 365 days
- if locationId present, must belong to business

**Response shape (example)**
```json
{
  "range": {"from":"2026-04-01","to":"2026-04-08","bucket":"day"},
  "syncHealth": {
    "locations": [
      {"locationId":"...","name":"Downtown","lastSyncAt":"...","lastError":null,"newReviews":12,"totalFetched":20}
    ]
  },
  "funnel": {
    "ingested": 20,
    "drafted": 18,
    "approved": 12,
    "posted": 9,
    "rates": {"draftedPerIngested":0.9,"approvedPerDrafted":0.67,"postedPerApproved":0.75}
  },
  "responseTime": {
    "medianMinutes": 180,
    "p90Minutes": 1440,
    "open": {"approvedNotPosted": 3, "negativeUnapproved": 2}
  },
  "alerts": {
    "total": 4,
    "byType": [{"type":"negative_review","count":3}],
    "byLocation": [{"locationId":"...","count":2}]
  },
  "themes": {
    "byCategory": [{"category":"service","count":7}],
    "bySentiment": [{"sentiment":"negative","count":4}]
  },
  "timeseries": {
    "buckets": [
      {"date":"2026-04-01","ingested":3,"posted":1,"negative":1,"avgRating":4.3}
    ]
  }
}
```

### 3) GET /api/admin/metrics.csv
Downloads a CSV containing:
- Overview metrics
- Per-location sync health
- Time series buckets
- Alerts breakdown
- Themes

This is intentionally “multi-section CSV” (blank lines separating sections) so the owner can paste into Sheets quickly.

---

## Aggregation Definitions (consistent + debuggable)

### Date window
All counts are filtered by `Review.createdAt` within `[from, to]` unless otherwise noted.

### Funnel
- **Ingested:** Review records created in range.
- **Drafted:** DraftReply created where DraftReply.review.createdAt is in range.
- **Approved:** AuditLog records with action `DRAFT_APPROVED` where targetDraftReply.review.createdAt in range.
- **Posted:** DraftReply.status IN (`posted_manual`, `posted_api`) and postedAt exists AND review.createdAt in range.

### Response time
- Compute only for **posted** drafts.
- `responseMinutes = (postedAt - Review.createdAt) / 60000`
- Median + p90 from distribution of responseMinutes.

### Open backlog
- approvedNotPosted: DraftReply.status == `approved` (or equivalent) and postedAt null
- negativeUnapproved: Review sentiment negative OR rating<=2 AND no approved/posted DraftReply

### Sync health
- lastSyncAt/lastError derived from Integration + per-location fields (e.g., Location.lastGbpReviewSyncAt and Location.lastGbpReviewSyncError if present). If only generic fields exist, show integration-level.
- newReviews: count of reviews in range (optionally where source=google and locationId matches)

---

## Implementation Notes (Next.js App Router)

### Server-side data fetching
- /app/admin/metrics is a Server Component page reading query params and calling internal fetch to `/api/admin/metrics` OR directly invoking a `getMetrics()` server function.
- Prefer direct server function for performance; keep API for CSV and for potential future client-side refresh.

### Prisma query approach (fast, minimal)
- Use `count()` and `groupBy()` where possible.
- For timeseries, bucket by day using raw SQL if needed (Postgres `date_trunc('day', ...)`) to avoid N queries.
- Cap bucket count (e.g., max 120 buckets); if range too large, force `bucket=week`.

### Instrumentation
- Wrap aggregations in Sentry spans: `metrics.funnel`, `metrics.timeseries`, `metrics.alerts`.
- Structured logs include businessId, locationId, from/to, and duration.

---

## QA Checklist
1. With no data: dashboard renders with empty states; CSV still downloads with headers.
2. With Google sync data: lastSyncAt updates and new reviews appear.
3. Ingest -> draft -> approve -> posted_manual updates funnel counts and response time.
4. Negative review triggers AlertEvent and appears in Alerts section.
5. CSV matches UI totals for same filter range.

---

## Customer-facing note (for future help docs)
This dashboard is intended for owners/managers to verify the autopilot is working and to quantify business impact (response time + negative review handling). If we ever need to justify legitimacy in outreach, we can reference the product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and support email: agent_bob_replit+review-bot@agentmail.to.
