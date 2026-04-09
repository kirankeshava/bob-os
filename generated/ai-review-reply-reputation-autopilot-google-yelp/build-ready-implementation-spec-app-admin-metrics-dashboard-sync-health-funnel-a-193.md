# Build-Ready Implementation Spec: /app/admin/metrics Dashboard (Sync Health + Funnel + Alerts + CSV Export)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:14:18.861Z

---

## Goal
Ship a lightweight in-app metrics dashboard that answers: (1) Is review sync healthy? (2) Are we converting ingested reviews into posted replies? (3) Are negative reviews handled within SLA? (4) What alerts/errors are happening?

This must use existing tables and infrastructure:
- Review
- DraftReply
- AlertEvent
- AuditLog
- Location
- Integration
- WeeklyReport
No new vendors required.

---
## Route + API structure
### UI
- `GET /app/admin/metrics`
  - Server component page; loads initial metrics with default date range (last 30 days) and default location=all.
  - Client components for charts/filters.

### APIs
- `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=google|yelp|manual|all`
  - Returns JSON with KPIs + timeseries + per-location breakdown.
- `GET /api/admin/metrics.csv?from=...&to=...&locationId=...&source=...`
  - Returns a flattened CSV export (daily rollups + totals).

### RBAC
- Require authenticated user.
- User must have membership in the Business that owns the queried Location(s).
- If `locationId` is omitted, scope to *all locations* in the user’s Business.

Validation:
- Use zod on query params; `from <= to`, max range 365 days.

---
## KPI definitions (consistent + auditable)
All metrics are computed within [from, to] inclusive, in the business timezone (use business or location timezone if stored; otherwise UTC for MVP).

### Volume + ratings
1) `reviewsIngested`: count of Review where `createdAt` in range AND (optional filters: locationId/source).
2) `avgRating`: average of Review.rating across those reviews.
3) `ratingDistribution`: counts by 1..5.

### Funnel (activation)
We define states using *events* and canonical columns to avoid ambiguity.
- `drafted`: Review has at least one DraftReply created in range OR DraftReply.review.createdAt in range and DraftReply.createdAt in range.
- `approved`: DraftReply.status == 'approved' and approvedAt in range.
- `posted`: DraftReply.status in ('posted_manual', 'posted_api') and postedAt in range.

Funnel numbers:
- `draftRate = drafted / reviewsIngested`
- `approveRate = approved / drafted`
- `postRate = posted / approved`

### Response time
We report two:
- `timeToFirstDraftMedianHours`: median(DraftReply.createdAt - Review.createdAt) for reviews with draft.
- `timeToPostMedianHours`: median(DraftReply.postedAt - Review.createdAt) for reviews with posted status.

Exclude:
- Rejected drafts from response-time metrics.
- Reviews without posted replies from `timeToPost...`.

### Sentiment + themes
Using Review.sentiment + Review.categories (existing tagging):
- `negativeShare = negative / total`
- `topCategories`: count of each category label across reviews in range (limit 5).

### Alerts + SLA
Use AlertEvent table:
- `alertsTotal`: count in range
- `alertsByType`: group by type (sync_failure, negative_review_sla, ocr_failure, guardrail_block, etc.)
- `slaBreaches`: count where type == negative_review_sla

SLA definition for MVP:
- A negative review (sentiment=negative OR rating<=2 OR matched rule) is a breach if no posted reply within N hours (location threshold) from Review.createdAt.
Implementation note: you already create AlertEvent when breach occurs—use those records to compute breaches, rather than recomputing.

---
## Data queries (Prisma-first; raw SQL allowed for timeseries)
Assume we have `businessId` available from session membership.

### Shared filters
- locations = if locationId given -> [locationId] else all location ids for business
- source filter on Review.source if not 'all'
- date range filter on Review.createdAt for ingest/ratings/sentiment; for posted/approved use DraftReply timestamps.

### Totals
- Reviews ingested:
  - Prisma: `review.count({ where: { businessId, locationId: { in: locations }, source?, createdAt: { gte: from, lte: to } } })`
- Avg rating + distribution:
  - `review.aggregate({ _avg: { rating: true }, _count: { rating: true } ... })` plus `groupBy({ by: ['rating'], _count: true })`

### Funnel counts
- drafted: count distinct reviewId that has DraftReply.createdAt in range and review matches filters.
  - Prisma groupBy on DraftReply.reviewId with where on DraftReply.createdAt and Review filters via relation.
- approved: DraftReply where status='approved' and approvedAt in range.
- posted: DraftReply where status in posted statuses and postedAt in range.

### Median response times
Prisma doesn’t do median easily; use raw SQL for Postgres:
- `percentile_cont(0.5) within group (order by extract(epoch from (draft.created_at - review.created_at))/3600)`
Compute separately for first-draft and posted.

### Timeseries (daily)
Return daily rollups for charts:
- `reviewsDaily[{date, count, avgRating, negativeCount}]`
- `postedDaily[{date, postedCount, medianTimeToPostHours}]` (optional median; can be heavy—start with average)
Use raw SQL with `date_trunc('day', ...)` grouped.

---
## UI layout (fast + clear)
### Filters row
- Date range picker (Last 7 / 30 / 90 + custom)
- Location dropdown (All + per location)
- Source dropdown (All / Google / Yelp / Manual / OCR)
- Export CSV button (links to /api/admin/metrics.csv with same params)

### Cards (top)
1) Reviews ingested (total) + avg rating + rating sparkline (optional)
2) Negative share + top category
3) Median time to post
4) Alerts total + SLA breaches

### Sections
- Funnel table: Ingested → Drafted → Approved → Posted with rates
- Sync health table (per location):
  - location name
  - last sync at (from Location.lastGbpReviewSyncUpdateTime or Integration.lastSyncAt)
  - last error (from Integration.lastError or most recent AlertEvent)
  - new reviews in period
- Alerts table: recent 20 alerts with type, createdAt, location, message

Implementation note: keep charts minimal. Use simple `<table>` + small bar chart component.

---
## CSV export format
One CSV containing:
- Header includes filter context rows (business name, from/to, generatedAt)
- Then a daily rollup table:
  - date, reviewsIngested, avgRating, negativeCount, draftedCount, approvedCount, postedCount, alertsTotal, slaBreaches
- Then a totals row.

---
## Instrumentation (already in place; just surface it)
- Use existing structured logs correlationId; no change.
- Add an AuditLog event when CSV export is downloaded: action='metrics_export_csv'.

---
## Owner execution checklist (no paid tools required)
1) Implement APIs with zod validation + RBAC
2) Implement page with server fetch + client filters
3) Verify metrics on a test business with known review/draft/posted history
4) Confirm CSV downloads in Chrome/Safari
5) Add one screenshot to README for selling/onboarding

---
## Optional outreach/customer communication template (if you need to invite a pilot)
Subject: We built a Review Reply & Reputation Autopilot—want to pilot it?

Hi {{Name}},

I’m running a lightweight tool that ingests your Google/Yelp reviews, drafts brand-safe replies, alerts you on negative reviews, and emails a weekly KPI report.

You can see the app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a 15-minute setup, we can connect your Google Business Profile (or start with email/CSV import) and have replies ready for approval the same day. You stay in control with one-click approve/edit and an audit trail.

Reply with your preferred email for access and which locations you want included.

Thanks,
{{Your Name}}
{{Your Email}}