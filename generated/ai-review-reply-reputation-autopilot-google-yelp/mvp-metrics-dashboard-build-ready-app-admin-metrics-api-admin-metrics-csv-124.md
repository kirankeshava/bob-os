# MVP Metrics Dashboard (Build-Ready): /app/admin/metrics + /api/admin/metrics (+ CSV)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:40:05.202Z

---

## Goal
Ship a lightweight in-app metrics dashboard for the MVP: (1) Sync Health, (2) Activation Funnel, (3) Alerts volume & SLA compliance, and (4) Theme breakdown. Must use existing tables only: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport.

Website reference for customer legitimacy (use in any shared screenshots/links): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
## Routes
### UI
- `GET /app/admin/metrics`
  - Server component page; reads session + business membership; defaults to last 14 days.
  - Filters: date range (from/to), location (All + per location), source (All/Google/Yelp/Manual), sentiment (All/pos/neu/neg).
  - Sections: Sync Health, Funnel KPIs, Response Time, Alerts & SLA, Top Themes, Export.

### APIs
- `GET /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=...`
  - Returns JSON for charts/tables.
- `GET /api/admin/metrics.csv?...same params...`
  - Returns CSV export (single file with multiple sections or multiple endpoints—fastest is single “wide” CSV with section headers).

RBAC: only users with `UserBusinessMembership` for the business can access. If you have roles, restrict export to admin; otherwise allow all members.

---
## KPI Definitions (consistent + auditable)
Use these definitions everywhere (UI tooltips + weekly report alignment):

1) **Ingested Reviews**
- Count of `Review` createdAt within [from,to].
- Optional: include updated reviews if you want “touched”; but keep ingestion strictly createdAt to avoid double counting.

2) **Drafted**
- Count of reviews that have at least one `DraftReply` createdAt within [from,to] OR whose first draft is created within [from,to].
- Recommended: “firstDraftAt” = MIN(DraftReply.createdAt) per review.

3) **Approved**
- Count of DraftReplies where `status == 'approved'` and `approvedAt` within [from,to].

4) **Posted**
- Count of DraftReplies where status in `posted_manual` / `posted_api` (whatever enum exists) and `postedAt` within [from,to].

5) **Response Time**
- For posted replies only: `postedAt - Review.createdAt` (hours).
- Exclude: rejected drafts, never-posted approvals.
- Show: median (p50), p90, and average.

6) **Negative Share**
- Reviews with (sentiment == negative OR rating <= 2) divided by total ingested in range.

7) **SLA Compliance (Negative Reviews)**
- For negative reviews ingested in range, check if there exists a posted reply within SLA hours (config per Location or Business; use existing escalation rules/thresholds).
- SLA met if `postedAt <= review.createdAt + slaHours`.

8) **Sync Health**
Per enabled location:
- lastSyncAt (store or derive from latest successful sync AuditLog event)
- lastError (most recent integration error message)
- reviewDelta24h (number of new reviews in last 24h)
- consecutiveFailures (derive from AlertEvent or AuditLog pattern)

9) **Top Themes**
- Use Review.categoryLabels (service/price/staff/quality/cleanliness/wait_time/other)
- Count occurrences in range; show top 5.

---
## Data Retrieval (Prisma/SQL approach)
### Input validation
Use zod:
- from/to required, max range 90 days (prevent expensive scans)
- locationId optional
- source optional enum

### Core where clause
- Always scope to businessId.
- If locationId provided, `Review.locationId = locationId`.
- If source provided, `Review.source = source`.
- Filter by createdAt between from/to.

### Aggregations (pseudocode)
1) Ingested:
- `prisma.review.count({ where })`

2) Drafted:
- Option A (fast enough): count distinct reviewId in DraftReply within range.
  - `prisma.draftReply.groupBy({ by: ['reviewId'], where: { review: where.review, createdAt: { gte: from, lte: to } } })`
- Option B (better definition): firstDraftAt = MIN per review; use raw SQL.

3) Approved/Posted counts:
- `prisma.draftReply.count({ where: { review: where.review, status: 'approved', approvedAt: { gte: from, lte: to } } })`
- `prisma.draftReply.count({ where: { review: where.review, status: { in: ['posted_manual','posted_api'] }, postedAt: { gte: from, lte: to } } })`

4) Response time stats (posted only):
- Raw SQL recommended for percentiles (Postgres):
  - p50/p90 via `percentile_cont(0.5) within group (order by extract(epoch from (postedAt - review.createdAt)))`

5) Negative share:
- `negativeCount = prisma.review.count({ where: { ...where.review, OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }] } })`

6) SLA compliance:
- Fetch negative reviews ids + createdAt in range.
- Join to first posted DraftReply per review (MIN(postedAt)).
- SLA met if postedAt exists and within threshold.
- Implement as raw SQL for speed:
  - `SELECT COUNT(*) FILTER (WHERE posted_at <= created_at + make_interval(hours => sla_hours)) / COUNT(*)` (handle null posted_at as fail).

7) Theme counts:
- If labels stored as string array/JSON, use Postgres `unnest` / `jsonb_array_elements_text` in raw SQL to count.

---
## UI Layout (minimal Tailwind + existing components)
### Header
- Title: “Metrics”
- Subtitle: “Operational health and reputation performance.”
- Filters row: Date range, Location dropdown, Source dropdown, Export CSV button.

### Section 1: Sync Health (table)
Columns:
- Location
- Integration (Google/Yelp/Manual)
- Enabled
- Last sync
- Last error
- New reviews (24h)
- Action: “Run sync now” (optional later)

### Section 2: Funnel KPIs (cards)
Cards:
- Ingested
- Drafted
- Approved
- Posted
- Negative share
Each card tooltip text (copy-ready):
- Ingested: “Reviews received in this period.”
- Drafted: “Reviews that had at least one draft reply generated.”
- Approved: “Drafts approved by a human (edited or one-click).”
- Posted: “Approved replies marked as posted (API or manual audit).”
- Negative share: “% of reviews that were negative (sentiment=negative or rating ≤ 2).”

### Section 3: Response Time (stat row)
- Avg response time (hours)
- Median (p50)
- p90
Tooltip: “Calculated for posted replies only. Excludes rejected or never-posted drafts.”

### Section 4: Alerts & SLA (table)
- Alert type
- Count
- Last triggered
- SLA compliance (negative reviews)
Tooltip: “SLA compliance checks whether negative reviews received a posted response within the configured SLA window.”

### Section 5: Top Themes (bar list)
- service/price/staff/quality/cleanliness/wait_time/other
Copy: “Themes are auto-tagged from review text to highlight what customers mention most.”

### Empty states
- No data: “No reviews in this date range. Try expanding the dates or importing reviews.”
- Sync not connected: “Google isn’t connected yet. Connect it to enable automated ingestion.”

---
## CSV Export format (single file)
Row blocks with a `section` column:
- section=funnel: metric,value
- section=response_time: metric,value
- section=themes: theme,count
- section=sync_health: location,lastSyncAt,lastError,newReviews24h
- section=alerts: alertType,count,lastTriggeredAt

---
## Instrumentation
- Log metrics endpoint timing + params (businessId, rangeDays, locationId) to structured logs.
- Sentry capture if aggregations exceed 3s or throw.

---
## Build order (fast)
1) Implement `/api/admin/metrics` with funnel + response time + negative share.
2) Implement `/app/admin/metrics` with cards + simple tables (no chart lib required initially).
3) Add Sync Health and Theme breakdown.
4) Add CSV export endpoint.

This keeps the MVP reliable and ship-fast without new infrastructure or paid dependencies.