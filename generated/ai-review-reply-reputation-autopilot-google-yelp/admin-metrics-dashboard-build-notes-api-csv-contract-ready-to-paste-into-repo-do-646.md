# Admin Metrics Dashboard — Build Notes + API/CSV Contract (Ready to Paste into Repo Docs)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:08:13.463Z

---

# Admin Metrics Dashboard (MVP)

This document describes what was implemented for **/app/admin/metrics** and how it computes reputation/ops KPIs from existing tables (Review, DraftReply, AlertEvent, AuditLog, Location, Integration). It also defines the API and CSV export contracts.

## 1) What the dashboard shows

### A) Sync Health
For each enabled location:
- Location name
- Integration type (Google / Yelp / Manual)
- `lastSyncAt` and `lastError` (from `/api/health/integrations`)
- A “Stale” indicator when lastSyncAt is older than a threshold (default 6h)
- Quick links: Location settings + Integration connect page

**Goal:** Make ingestion failures obvious and actionable.

### B) Funnel KPIs (selected date range)
Definitions are based on timestamps and statuses:
- **Ingested**: Reviews with `Review.createdAt` within range
- **Drafted**: Reviews that have at least one DraftReply with `DraftReply.createdAt` within range (or `draftedAt` if you store it explicitly)
- **Approved**: DraftReplies with status `approved` and `approvedAt` within range
- **Posted**: DraftReplies with status in (`posted_manual`, `posted_api`) and `postedAt` within range

The dashboard computes:
- Counts for each step
- Step conversion rates (drafted/ingested, approved/drafted, posted/approved)
- Median + p90 time-to-first-draft and time-to-post

Important logic:
- If multiple drafts exist for a single review, funnel counts use the **earliest** relevant timestamp per review for step transitions (to avoid inflated numbers).
- Response-time KPIs exclude drafts that were rejected and never posted.

### C) Rating & Sentiment Snapshot
Within date range:
- Total reviews
- Average rating
- Rating distribution (1–5)
- Sentiment distribution (positive/neutral/negative)

### D) Alerts
Within date range:
- Total AlertEvents
- Alerts by severity/type
- Alerts by location

### E) Top Themes
Within date range:
- Top category labels (service/price/staff/quality/cleanliness/wait_time/other)
- Split by sentiment where possible (e.g., “staff (negative)”)


## 2) API Contract

### GET `/api/admin/metrics`
RBAC: caller must be a member of the active Business (UserBusinessMembership).

Query params:
- `start` (ISO date string, required)
- `end` (ISO date string, required)
- `locationId` (optional)

Response (single payload for all panels):
```json
{
  "range": {"start": "2026-04-01", "end": "2026-04-08"},
  "filters": {"locationId": "..."},
  "syncHealth": [
    {"locationId": "...", "locationName": "Main St", "integration": "google", "lastSyncAt": "...", "lastError": null}
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 80,
    "posted": 70,
    "rates": {"draftedPerIngested": 0.92, "approvedPerDrafted": 0.73, "postedPerApproved": 0.875},
    "timing": {
      "draftMins": {"median": 8.2, "p90": 45.0},
      "postMins": {"median": 180.0, "p90": 1440.0}
    }
  },
  "ratings": {
    "count": 120,
    "avg": 4.42,
    "distribution": {"1": 3, "2": 5, "3": 10, "4": 22, "5": 80}
  },
  "sentiment": {"positive": 90, "neutral": 18, "negative": 12},
  "alerts": {
    "count": 7,
    "byType": {"sync_failure": 2, "negative_review": 5},
    "byLocation": [{"locationId": "...", "count": 4}]
  },
  "themes": [
    {"label": "staff", "count": 25, "negative": 6},
    {"label": "service", "count": 20, "negative": 3}
  ]
}
```

Validation:
- Reject missing/invalid dates
- Enforce `start <= end`
- Clamp maximum range if needed (e.g., 365 days) to protect DB


## 3) CSV Export

### GET `/api/admin/metrics.csv`
Same query params and RBAC as `/api/admin/metrics`.

CSV output is a **multi-section** CSV for easy sharing:
- Section: Funnel summary
- Section: Timing summary
- Section: Ratings distribution
- Section: Sentiment distribution
- Section: Alerts breakdown
- Section: Top themes

The first column is always `section` so it can be filtered/pivoted.

Example rows:
```
section,metric,value
funnel,ingested,120
funnel,drafted,110
funnel,approved,80
funnel,posted,70
timing,median_draft_mins,8.2
ratings,avg_rating,4.42
sentiment,negative,12
alerts,sync_failure,2
themes,staff_total,25
themes,staff_negative,6
```


## 4) UI Notes (Next.js App Router)

Route:
- `/app/admin/metrics`

Components:
- Date range picker (start/end)
- Location dropdown (All locations + each enabled location)
- Cards: Funnel, Rating snapshot, Sentiment snapshot, Alerts
- Tables: Sync health per location, Top themes
- Button: “Export CSV” hits `/api/admin/metrics.csv?start=...&end=...&locationId=...`


## 5) Known Limitations (acceptable for MVP)
- Yelp API posting/ingestion is not guaranteed; metrics treat Yelp items the same as other sources once ingested.
- Response times are based on system timestamps (created/drafted/approved/posted). If a business replies outside the system, it won’t be captured unless manually recorded.
- Theme accuracy depends on the tagging model; the dashboard surfaces counts, not perfect topic modeling.


## 6) QA Checklist
- Load metrics with empty DB → renders zeros, no crashes
- Multiple drafts per review → funnel counts de-duplicated correctly
- Rejected draft → excluded from response-time-to-post
- Posted_manual only → included in posted step
- RBAC: user from Business A cannot query Business B (both API and CSV)
- Stale sync banner triggers when lastSyncAt exceeds threshold
