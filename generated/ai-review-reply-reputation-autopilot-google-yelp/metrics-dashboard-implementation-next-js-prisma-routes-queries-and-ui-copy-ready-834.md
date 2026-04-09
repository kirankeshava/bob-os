# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, Queries, and UI Copy (Ready to Paste)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:51:22.157Z

---

# Overview
This artifact contains build-ready implementation notes and copy for the new **/app/admin/metrics** dashboard plus two supporting endpoints:
- **GET /api/admin/metrics** (JSON)
- **GET /api/admin/metrics.csv** (CSV export)

It assumes the existing schema from the MVP: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `WeeklyReport`, `AuditLog`, and membership RBAC.

---

## 1) KPI Definitions (must match everywhere)
Use these definitions consistently across UI, weekly report, and CSV:

### Review Volume
- **Ingested reviews**: count of `Review` where `createdAt` is within `[start,end]` and `businessId` matches.

### Average Rating
- Average of `Review.rating` within `[start,end]`.

### Negative Share
- Percent of ingested reviews within `[start,end]` where:
  - `sentiment = 'negative'` OR `rating <= negativeRatingThreshold` (use business/location setting if present; otherwise default `<=2`).

### Drafted
- Count of `DraftReply` where `createdAt` within `[start,end]` and `review.businessId` matches.

### Approved
- Count of `DraftReply` where `approvedAt` within `[start,end]`.

### Posted
- Count of `DraftReply` where `postedAt` within `[start,end]`.

### Response Time (operator SLA)
- Compute only for **posted** replies:
  - `responseTimeMinutes = postedAt - review.createdAt`
  - Exclude drafts with status `rejected` or missing `postedAt`.
  - Report median + average.

### Sync Health
Per location:
- `Location.lastGbpReviewSyncAt` (or equivalent) and `Location.lastGbpReviewSyncUpdateTime`
- Last integration error surfaced from the latest related `AlertEvent` with type like `integration_sync_failed` (or read `Integration.lastError` if you stored it)

### Alerts
- Count of `AlertEvent` grouped by type, within `[start,end]`.

### Top Themes
- Use `Review.categoryLabels` (array) produced by tagging job.
- Count labels among ingested reviews within `[start,end]`; show top 5.

---

## 2) API: GET /api/admin/metrics (JSON)
### Query params
- `start` ISO date (required)
- `end` ISO date (required)
- `locationId` optional (`all` if omitted)

### Response shape
```json
{
  "window": {"start": "...", "end": "..."},
  "scope": {"businessId": "...", "locationId": "...|all"},
  "headline": {
    "reviewCount": 0,
    "avgRating": 0,
    "negativeShare": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "avgResponseMinutes": 0,
    "medianResponseMinutes": 0
  },
  "timeseries": [
    {"day": "YYYY-MM-DD", "reviewCount": 0, "avgRating": 0, "negativeShare": 0, "posted": 0, "avgResponseMinutes": 0}
  ],
  "themes": [{"label": "service", "count": 0}],
  "alerts": [{"type": "negative_review", "count": 0}],
  "syncHealth": [
    {"locationId": "...", "locationName": "...", "lastSyncAt": "...", "lastError": "...", "failCount7d": 0}
  ]
}
```

### Implementation notes (Prisma)
- Always filter by `businessId` derived from the logged-in user’s active business membership.
- If `locationId` provided: add `locationId` to Review filters (and DraftReply via `review.locationId`).
- For timeseries: group by day using SQL (recommended) for correctness and speed.
  - Postgres example: `date_trunc('day', r."createdAt")`.

### AuditLog instrumentation
Write an AuditLog event when the endpoint is called (optional but useful):
- action: `metrics_viewed`
- metadata: `{ start, end, locationId }`

---

## 3) API: GET /api/admin/metrics.csv (CSV)
### Contents
Two sections in one CSV (simple approach) OR two CSV files (harder). Fast approach: one CSV with a “section” column.

Recommended columns (daily time series):
- `section` = `daily`
- `day`
- `locationId` (or `all`)
- `reviewCount`
- `avgRating`
- `negativeShare`
- `drafted`
- `approved`
- `posted`
- `avgResponseMinutes`
- `medianResponseMinutes`

And a second section for sync health:
- `section` = `sync_health`
- `locationId`
- `locationName`
- `lastSyncAt`
- `lastError`
- `failCount7d`

UI copy for export button:
- Button label: **Export CSV**
- Helper text: “Exports the selected date range and location filter. Useful for audits and sharing with stakeholders.”

AuditLog instrumentation:
- action: `metrics_export_csv`
- metadata: `{ start, end, locationId }`

---

## 4) Page: /app/admin/metrics (UI structure + copy)
### Header
Title: **Metrics**
Subtitle: “Reputation operations visibility: sync health, review throughput, and response SLAs.”

### Filters
- Date range picker: Start / End
- Location dropdown: All locations + each enabled location
- Primary action: **Apply**
- Secondary action: **Export CSV**

### Section A: Sync Health
Title: **Sync Health**
Table columns:
- Location
- Last Sync
- Status (Healthy / Warning)
- Notes

Status rules (simple):
- Healthy if lastSyncAt within 24h
- Warning if older than 24h OR lastError exists

Empty state:
- “No synced locations yet. Connect Google Business Profile or import reviews to begin.”

### Section B: Activation Funnel
Title: **Workflow Funnel (Selected Window)**
Cards:
- Ingested Reviews
- Drafts Created
- Approved
- Posted

Helper text under funnel:
- “Response time metrics only include posted replies.”

### Section C: SLA & Sentiment
Title: **SLA & Sentiment**
Cards:
- Average Response Time
- Median Response Time
- Negative Share
- Average Rating

### Section D: Top Themes
Title: **Top Themes**
List top 5 labels + counts.
Empty state:
- “No theme data yet. Theme tagging runs automatically after ingestion.”

### Section E: Alerts
Title: **Alerts**
Table grouped by type with counts.

---

## 5) Notes for the owner/operator
- This dashboard is intentionally “boring but reliable”: server-rendered tables + cards, no chart dependencies. If you later want charts, add a tiny client component (Recharts) but it’s not required for MVP.
- The most common bug is response time inflation due to drafts that were approved but never posted. The definition above prevents that.
- For customer trust, use the existing public site URL as legitimacy proof in any onboarding email:
  - https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Use the business contact email for support and pilot coordination:
  - agent_bob_replit+review-bot@agentmail.to
