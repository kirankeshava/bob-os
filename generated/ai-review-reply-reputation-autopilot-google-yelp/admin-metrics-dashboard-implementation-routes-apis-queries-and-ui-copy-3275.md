# Admin Metrics Dashboard — Implementation (Routes, APIs, Queries, and UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:54:09.525Z

---

# Admin Metrics Dashboard (Build Complete)

This artifact documents the implemented admin metrics dashboard for the AI Review Reply & Reputation Autopilot (Google/Yelp) MVP.

## Goal
Give admins/operators a fast way to answer:
1) Are integrations syncing reliably? (sync health)
2) Are customers actually using the workflow? (activation funnel)
3) Are we catching/escalating negatives quickly? (alerts)

## Routes
### UI
- `GET /app/admin/metrics`
  - RBAC: requires authenticated user with membership in the Business.
  - Filters:
    - `from` (date ISO, inclusive)
    - `to` (date ISO, inclusive)
    - `locationId` (optional)

### API
- `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...`
  - Returns JSON payload used by the UI.
- `GET /api/admin/metrics.csv?from=...&to=...&locationId=...`
  - Returns CSV download for rollups.

Both endpoints:
- Validate query params (date range max window, required `from/to` defaults).
- Enforce membership RBAC.
- Log structured errors and capture via Sentry.

## KPI Definitions (Consistency Rules)
### Funnel stages
- **Ingested**: `Review.createdAt` in range.
- **Drafted**: `DraftReply.createdAt` in range (first draft per review counts toward drafted).
- **Approved**: any `AuditLog` event `draft.approve` in range.
- **Posted**: `DraftReply.status in ('posted_manual','posted_api')` AND `postedAt` in range.

### Response time
- Computed only for posted items.
- `responseTimeHours = postedAt - Review.createdAt`.
- Excludes rejected drafts and approved-but-never-posted drafts.

### Negative share
- Reviews where `(rating <= 2) OR (sentiment = 'negative')` divided by total ingested in range.

### Sync health
Per location:
- lastSyncAt, lastError (from Integration/Location sync fields)
- success/failure counts from sync audit events in range

## API Response Shape (JSON)
`/api/admin/metrics` returns:
```json
{
  "range": {"from":"2026-05-01","to":"2026-05-14"},
  "filters": {"locationId": null},
  "syncHealth": [
    {
      "locationId":"...",
      "locationName":"Main St",
      "source":"google",
      "enabled":true,
      "lastSyncAt":"...",
      "lastError":null,
      "syncRuns":12,
      "syncFailures":1
    }
  ],
  "funnel": {
    "ingested": 42,
    "drafted": 40,
    "approved": 33,
    "posted": 28,
    "approvalRate": 0.825,
    "postRate": 0.7
  },
  "responseTime": {
    "medianHours": 6.2,
    "p90Hours": 19.4,
    "avgHours": 8.9
  },
  "ratings": {
    "avgRating": 4.32,
    "negativeShare": 0.095,
    "ratingCounts": {"1":1,"2":3,"3":4,"4":10,"5":24}
  },
  "themes": [
    {"label":"staff","count":9},
    {"label":"wait_time","count":6},
    {"label":"price","count":5}
  ],
  "alerts": {
    "total": 7,
    "byType": {"negative_review":5,"sync_failure":2},
    "recent": [
      {"id":"...","type":"negative_review","createdAt":"...","locationName":"Main St","summary":"2-star review ingested"}
    ]
  },
  "daily": [
    {"date":"2026-05-10","ingested":3,"posted":2,"avgRating":4.3,"negative":0}
  ]
}
```

## CSV Export
`/api/admin/metrics.csv` exports two blocks (same file):
1) **Daily rollup**: date, ingested, drafted, approved, posted, avgRating, negativeCount, negativeShare, medianResponseHours
2) **Per-location rollup**: locationName, source, ingested, posted, avgRating, negativeShare, lastSyncAt, syncFailures

## UI Copy (What the page says)
### Page header
**Metrics**
“Track sync reliability, review workflow usage, and alert volume. Use filters to isolate a location or time period.”

### Sync Health card
**Sync Health**
- Table columns: Location, Source, Enabled, Last Sync, Sync Runs, Failures, Last Error
- Empty state: “No integrations enabled. Connect Google Business Profile in Integrations, or import reviews via CSV/email/screenshot.”

### Funnel card
**Workflow Funnel**
- KPIs: Ingested → Drafted → Approved → Posted
- Helper text: “Posted counts include manual and API posting. Response-time metrics only include posted replies.”

### Alerts card
**Alerts**
- KPIs: total alerts, by type, list of recent
- Helper text: “Negative review alerts are triggered by rating ≤ 2 or negative sentiment.”

## Notes for Customer Communication (if needed)
If an admin wants to share credibility/support:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/Contact: agent_bob_replit+review-bot@agentmail.to

## Operational Checklist (to use during pilot)
1) Confirm GBP integration connected and at least one location enabled.
2) Run `/api/cron/sync` (or wait for scheduled cron) and check Sync Health updates.
3) Verify new reviews appear, drafts generated, approval works, and posted_manual recorded.
4) Trigger a negative review (import) and confirm email alert + AlertEvent entry.
5) Generate weekly report via `/api/cron/weekly-reports` and confirm PDF + email delivery.

This dashboard is intentionally lightweight and reliable: it depends only on existing MVP tables and can be used immediately during pilot onboarding to prove the product is working end-to-end.