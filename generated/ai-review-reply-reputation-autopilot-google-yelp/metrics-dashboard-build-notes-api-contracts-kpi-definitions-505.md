# Metrics Dashboard (Build Notes + API Contracts + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:44:44.836Z

---

This artifact documents the shipped /app/admin/metrics dashboard: what it shows, how metrics are computed, and the API contracts used by the UI.

1) URLS + ACCESS
- UI: /app/admin/metrics
- API (JSON): GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
- API (CSV): GET /api/admin/metrics.csv?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
- Access control: user must be a member of the Business (UserBusinessMembership). Non-members get 403.

2) DASHBOARD SECTIONS
A) Sync Health (per Location)
Displayed per enabled location:
- lastSyncAt: last cron attempt timestamp
- lastSuccessAt: last successful sync timestamp
- lastErrorAt + lastErrorMessage: most recent failure
- consecutiveFailureCount: number of failed attempts since last success
- newestReviewUpdateTime: most recent updateTime seen from GBP (if integrated)
- backlogEstimate:
  - approvedNotPostedCount = DraftReply where status in (approved) and postedAt is null
  - negativeUnansweredCount = Review where (rating<=2 OR sentiment='negative') AND no posted reply

B) Funnel KPIs (for selected date range)
Definitions are based on Review.createdAt within [start,end].
- ingestedCount: Review count created in window
- draftedCount: Reviews in window with at least 1 DraftReply created
- approvedCount: DraftReply approvals in window (AuditLog action APPROVE_DRAFT or DraftReply.approvedAt in window)
- postedCount:
  - manual: DraftReply.status='posted_manual' or postedAt not null within window
  - (future) api: posted via API will also set postedAt
Conversion rates:
- draftRate = draftedCount / ingestedCount
- approveRate = approvedCount / draftedCount
- postRate = postedCount / approvedCount
Response time (speed-to-response):
- For posted replies only, compute delta = postedAt - Review.createdAt
- Exclude DraftReplies that are rejected or approved but never posted
- Report median and p90 in hours
Negative share:
- negativeByRating = Reviews in window where rating<=2 / ingestedCount
- negativeBySentiment = Reviews in window where sentiment='negative' / ingestedCount
Top themes:
- Uses Review.categoryLabels aggregated (service/price/staff/quality/cleanliness/wait_time/other)
- Counts are within window; one review can contribute multiple labels.

C) Alerts/Incidents
- AlertEvent counts by type in window (negative_review, sync_failed, ocr_failed, guardrail_blocked)
- Most recent 20 AlertEvents with links to the related Review/Location
- Optional ‘View underlying events’ opens AuditLog filtered by correlationId

3) API CONTRACT (JSON)
GET /api/admin/metrics returns:
{
  range: { start: string, end: string },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    rates: { draftRate: number|null, approveRate: number|null, postRate: number|null },
    responseTimeHours: { median: number|null, p90: number|null }
  },
  sentiment: {
    avgRating: number|null,
    negativeShareByRating: number|null,
    negativeShareBySentiment: number|null
  },
  themes: Array<{ label: string, count: number }>,
  syncHealth: Array<{
    locationId: string,
    locationName: string,
    enabled: boolean,
    lastSyncAt: string|null,
    lastSuccessAt: string|null,
    lastErrorAt: string|null,
    lastErrorMessage: string|null,
    consecutiveFailureCount: number,
    newestReviewUpdateTime: string|null,
    backlogEstimate: { approvedNotPosted: number, negativeUnanswered: number }
  }>,
  alerts: {
    countsByType: Array<{ type: string, count: number }>,
    recent: Array<{ id: string, type: string, createdAt: string, summary: string, reviewId?: string, locationId?: string }>
  }
}

4) CSV EXPORT FORMAT
The CSV endpoint outputs a single CSV designed to paste into Sheets:
- Row 1: "SECTION,KEY,VALUE"
- Then blocks:
  - SECTION=Funnel rows: ingested/drafted/approved/posted/rates/median/p90
  - SECTION=SyncHealth rows: one row per location per metric
  - SECTION=Themes rows: label,count
  - SECTION=Alerts rows: type,count
  - SECTION=Outliers rows: reviewId, location, createdAt, postedAt, responseTimeHours, status

5) NOTES FOR PILOTING / SUPPORT
- If a customer asks what this tool is, use the website URL as proof of legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support contact email for onboarding/issues: agent_bob_replit+review-bot@agentmail.to
- Operational guidance:
  - If consecutiveFailureCount>=3 for a location, check OAuth token validity and GBP scopes; run a manual sync and inspect /api/health/integrations.
  - If approvedNotPosted is high, the business is likely not completing the manual copy/paste step; prompt them to use the “Posted” confirmation button for accurate KPIs.

This dashboard is intentionally dependency-light (no paid BI, no heavy chart libs) and uses existing tables (Review, DraftReply, AlertEvent, AuditLog, Location, Integration) so it’s stable, fast to iterate, and debuggable during the first pilots.