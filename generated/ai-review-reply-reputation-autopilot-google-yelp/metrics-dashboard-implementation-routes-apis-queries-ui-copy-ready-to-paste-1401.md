# Metrics Dashboard Implementation (Routes, APIs, Queries, UI Copy) — Ready-to-Paste

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:51:17.049Z

---

# Metrics Dashboard (MVP) — Implementation Notes + Copy

This artifact documents the exact routes/endpoints, KPI definitions, and UI text used to ship the in-app metrics dashboard for the AI Review Reply & Reputation Autopilot.

## 1) Routes (Next.js App Router)

### Page
- **GET** `/app/admin/metrics`
  - RBAC: must be a member of the Business (UserBusinessMembership)
  - Inputs (query string):
    - `from` (ISO date, optional) default: today-30d
    - `to` (ISO date, optional) default: today
    - `locationId` (string | "all", optional) default: all

### API
- **GET** `/api/admin/metrics?from=...&to=...&locationId=...`
  - Returns JSON summary + per-location breakdown
- **GET** `/api/admin/metrics.csv?from=...&to=...&locationId=...`
  - Returns CSV suitable for Google Sheets

## 2) KPI Definitions (consistent + auditable)

**Date window**: `Review.createdAt` within [from, to].

### Funnel
- **Ingested**: count of Reviews created in window.
- **Drafted**: count of DraftReply where `createdAt` in window OR (preferred) draft associated to reviews in window. The dashboard uses “drafts tied to ingested reviews in window” to make funnel interpretable.
- **Approved**: count of DraftReply with `status = 'approved'` and `approvedAt` in window.
- **Posted**: count of DraftReply with `status in ('posted_manual','posted_api')` and `postedAt` in window.

### Response Time
- **Median response time (hours)**: median of `(postedAt - review.createdAt)` for posted drafts only.
- **Avg response time (hours)**: average of `(postedAt - review.createdAt)` for posted drafts only.
- Excludes `rejected` and drafts never posted.

### Sentiment / Rating Mix
- **Avg rating**: average of `Review.rating`.
- **Negative share**: reviews where `sentiment='negative' OR rating <= 2` divided by total.
- **Sentiment counts**: positive/neutral/negative from tagging.
- **Top themes**: count of `categoryLabels[]` (service/price/staff/quality/cleanliness/wait_time/other).

### Sync Health
Per location (Google enabled):
- `lastSyncAt` (Location.lastGbpSyncAt or Integration last success)
- `lastError` (Location.lastGbpSyncError)
- `lastReviewUpdateTimeWatermark` (Location.lastGbpReviewSyncUpdateTime)
- `failedSyncs24h`: count of AlertEvent where type = `integration_sync_failed` within last 24h.

### Alerts
- total AlertEvents in window
- negative-review alerts in window
- OCR failure alerts (if enabled)

## 3) Queries / Aggregations

### Core filters
- businessId must match current session’s business context.
- if `locationId != 'all'`, include `Review.locationId = locationId`.

### Funnel counts (Prisma-style pseudocode)
- ingested:
  - `prisma.review.count({ where: { businessId, createdAt: { gte: from, lte: to }, ...(location filter) }})`
- drafted (tied to ingested reviews):
  - find ingested review ids, then `prisma.draftReply.count({ where: { businessId, reviewId: { in: [...] }}})`
- approved:
  - `prisma.draftReply.count({ where: { businessId, approvedAt: { gte: from, lte: to }, status: 'approved', ...(location filter via review join) }})`
- posted:
  - `prisma.draftReply.count({ where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }, ...(location filter via review join) }})`

### Response time SQL (Postgres)
Use raw SQL for median:

```sql
WITH posted AS (
  SELECT
    r."locationId" as location_id,
    EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0 AS hours
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE d."postedAt" IS NOT NULL
    AND d.status IN ('posted_manual','posted_api')
    AND r."businessId" = $1
    AND r."createdAt" BETWEEN $2 AND $3
    AND ($4 = 'all' OR r."locationId" = $4)
)
SELECT
  AVG(hours) AS avg_hours,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY hours) AS median_hours
FROM posted;
```

### Theme counts
If category labels stored as string[] on Review:
- fetch reviews in window, flatten categories, count in application code (fast enough for MVP). For larger scale, normalize categories into a join table later.

## 4) Dashboard Sections + UI Copy (ready to paste)

### Header
**Title:** Metrics
**Subtitle:** Track review flow from ingestion to posting, sync reliability, and alert volume.

### Filters
- Date range: From / To
- Location: All locations / specific location
- Buttons: **Apply**, **Export CSV**

### Cards
1) **Ingested Reviews**
- Helper: “New reviews captured in the selected window.”

2) **Drafts Generated**
- Helper: “Draft replies created for reviews in this window.”

3) **Approved**
- Helper: “Replies approved by a human in this window.”

4) **Posted**
- Helper: “Replies marked as posted (manual/API) in this window.”

5) **Median Response Time**
- Helper: “Median hours from review creation to posting (posted replies only).”

6) **Negative Share**
- Helper: “% of reviews tagged negative or rated 1–2 stars.”

### Sync Health Table
Columns:
- Location
- Integration
- Last Sync
- Watermark (updateTime)
- Last Error
- Failures (24h)

Empty state text:
- “No integrations connected yet. Connect Google Business Profile to enable automatic review sync.”

### Alerts Panel
- Total alerts
- Negative-review alerts
- Integration sync failures
- OCR failures

### Themes
- “Top themes in this period”
- show counts for service/price/staff/quality/cleanliness/wait_time/other

## 5) CSV Export Format
Filename: `metrics_{businessSlug}_{from}_{to}.csv`

Rows:
- KPI, Value
- Per-location table appended after a blank row, columns: locationId, locationName, ingested, drafted, approved, posted, avgResponseHours, medianResponseHours, avgRating, negativeShare

## 6) Pilot Outreach Email (uses website + inbox)

Subject: Set up your Review Reply & Reputation Autopilot (Google reviews) — 10 min

Hi {{OwnerName}},

I’m Bob — we built a lightweight “AI Review Reply & Reputation Autopilot” that:
- pulls in new Google reviews,
- drafts brand-safe replies,
- alerts you immediately on negative reviews,
- and sends a weekly KPI report (rating trend, response time, themes).

You can see the app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

If you’d like, we can onboard your Google Business Profile in ~10 minutes. You’ll:
1) connect Google,
2) select locations,
3) set where negative-review alerts should go,
4) start receiving drafts in the approval queue.

Reply to this email with the best time today/tomorrow, and the email address that should receive escalation alerts.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 7) Reliability Notes
- Every sync run writes structured logs + Sentry events with correlationId.
- Sync failures create AlertEvents after repeated errors.
- Manual posting path remains first-class and fully audited.

This completes the MVP “observe + operate” loop: ingestion → draft → approve → post → report, plus a dashboard to detect bottlenecks and integration failures early.
