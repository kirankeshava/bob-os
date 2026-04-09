# Admin Metrics Dashboard — Build Output (Routes, APIs, KPI Definitions, CSV Schema)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:58:38.481Z

---

# Admin Metrics Dashboard (MVP)

This artifact documents the shipped metrics dashboard and APIs for the “AI Review Reply & Reputation Autopilot”. It’s written to be immediately usable by whoever is testing or extending the MVP.

## Goal
Give owners/admins a single view of:
1) Google sync health by location,
2) the activation funnel from ingest → draft → approve → posted,
3) SLA compliance and alert volume,
4) key reputation KPIs (volume, rating, negative share, response time) over a selectable date range.

All metrics are computed from existing tables (Review, DraftReply, AuditLog, AlertEvent, Location, Integration). No new infrastructure.

---

## UI Route
- **/app/admin/metrics** (RBAC: business member; admin-only controls exposed for business admins)

### Filters
- Date range: start/end (defaults to last 14 days; max default clamp 90 days unless explicitly expanded)
- Location(s): multi-select; defaults to all enabled locations
- Source: optional filter (google/manual/yelp) if present in Review.source

### Sections
1) **Sync Health**
   - Table per location:
     - Location name
     - Integration status (connected / needs auth)
     - lastSyncAt
     - lastError (if any)
     - lastSuccessfulSyncAt
     - reviewsFetchedLastRun (if available)
   - Visual indicator when `lastSyncAt` older than threshold (e.g., 24h)

2) **Activation Funnel**
   - Counts in range:
     - Reviews ingested
     - Draft replies created
     - Drafts approved
     - Drafts posted (manual)
     - Drafts blocked by policy
   - Conversion rates:
     - drafted/ingested
     - approved/drafted
     - posted/approved

3) **Reputation + SLA KPIs**
   - Avg rating (range)
   - Rating trend vs previous period (same duration)
   - Negative share (rating<=2 OR sentiment=negative)
   - Response time (median + p90) from ingest to posted
   - SLA compliance for negatives (e.g., responded within X hours)

4) **Alerts & Issues**
   - AlertEvent volume by type
   - Top last 20 alerts with timestamps and resolution state
   - “Top themes” (category counts) for negative/neutral reviews

---

## API Endpoints

### 1) GET /api/admin/metrics
Returns JSON to power the dashboard.

**Query params**
- `start` (ISO date)
- `end` (ISO date)
- `locationIds` (comma-separated) optional

**Response JSON shape (high level)**
```json
{
  "range": {"start":"2026-03-25","end":"2026-04-08"},
  "locations": [{"id":"...","name":"..."}],
  "syncHealth": [
    {
      "locationId":"...",
      "locationName":"...",
      "lastSyncAt":"...",
      "lastSuccessfulSyncAt":"...",
      "lastError":"...",
      "integrationProvider":"google"
    }
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 98,
    "approved": 61,
    "posted": 44,
    "blocked": 5,
    "rates": {
      "draftedPerIngested": 0.816,
      "approvedPerDrafted": 0.622,
      "postedPerApproved": 0.721
    }
  },
  "kpis": {
    "avgRating": 4.43,
    "avgRatingPrev": 4.31,
    "avgRatingDelta": 0.12,
    "negativeShare": 0.083,
    "medianResponseMinutes": 312,
    "p90ResponseMinutes": 1300,
    "negativeSlaHours": 24,
    "negativeSlaCompliance": 0.74
  },
  "themes": {
    "all": [{"category":"service","count":33}],
    "negative": [{"category":"staff","count":7}]
  },
  "alerts": {
    "countsByType": [{"type":"NEGATIVE_REVIEW","count":8}],
    "recent": [{"id":"...","type":"...","createdAt":"...","message":"..."}]
  }
}
```

### 2) GET /api/admin/metrics.csv
Downloads a CSV containing the same metrics for the selected range.

**CSV columns (stable)**
- start
- end
- locationScope (ALL or comma list)
- ingested
- drafted
- approved
- posted
- blocked
- draftedPerIngested
- approvedPerDrafted
- postedPerApproved
- avgRating
- avgRatingPrev
- avgRatingDelta
- negativeShare
- medianResponseMinutes
- p90ResponseMinutes
- negativeSlaHours
- negativeSlaCompliance
- alertsTotal

---

## KPI Definitions (Important)

### Ingested
Count of **Review** records with `createdAt` within [start,end] and matching locations.

### Drafted
Count of **DraftReply** records created in range whose parent Review is in the location scope. (Draft creation time is the event.)

### Approved
Count of DraftReply approvals in range. Implementation reads DraftReply status transitions via DraftReply.status and/or AuditLog action `DRAFT_APPROVED`. If both exist, AuditLog is source of truth for timing; status is for current state.

### Posted
Count of drafts marked as posted (manual flow) in range. Source of truth is AuditLog action `DRAFT_MARKED_POSTED_MANUAL` plus DraftReply.postedAt.

### Blocked
Count of server-side guardrail blocks in range. Source is AuditLog action `DRAFT_APPROVAL_BLOCKED_POLICY`.

### Response time
For drafts that are posted: `postedAt - review.createdAt` in minutes. Report median and p90; exclude rejected/unposted.

### Negative share
`(count of reviews where rating <= 2 OR sentiment = 'negative') / ingested`.

### Negative SLA compliance
For negative reviews only, fraction that are posted within configured threshold (default 24h; can be read from escalation settings per business/location).

---

## Notes for Testing / Demos
- To demo legitimacy in outreach, share the product URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support inbox for onboarding: agent_bob_replit+review-bot@agentmail.to
- Recommended demo path:
  1) Import a few reviews (CSV/email/GBP sync)
  2) Approve 1–2 drafts and mark as posted
  3) Open /app/admin/metrics and show funnel + response time + negative SLA
  4) Download CSV and attach in an email to show reporting workflow

---

## Known Limitations (MVP)
- Metrics are “near real-time” but depend on ingestion jobs and audit logs being written consistently.
- If a business edits a draft multiple times, funnel counts measure events, not unique reviews; the UI displays counts as “events in range” to avoid confusion.
- For GBP API reply posting, the MVP uses manual copy/paste audit trail unless API posting is enabled/available.
