# Metrics Dashboard Implementation (Build-Ready Code Outline + KPI Definitions + API Contracts)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:25:43.255Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard and its supporting APIs for the AI Review Reply & Reputation Autopilot MVP. It is designed to use existing tables (Review, DraftReply, Location, Integration, AlertEvent, AuditLog) and requires no new infrastructure.

Access + RBAC
- Route: /app/admin/metrics
- Access rule: user must be a member of the Business (UserBusinessMembership) or admin.
- All API routes validate businessId from session membership.

KPI Definitions (canonical)
1) Ingested reviews: Review records created within [start,end] (createdAt filter) per location/source.
2) Drafted: DraftReply records created within [start,end]. If multiple drafts per review exist, “drafted” counts distinct reviewId with >=1 draft in range.
3) Approved: DraftReply where status == 'approved' and approvedAt within range.
4) Posted: DraftReply where status in ('posted_api','posted_manual') and postedAt within range.
5) Response time:
   - For posted replies only: postedAt - Review.createdAt.
   - Report avg + median; exclude rejected and never-posted drafts.
6) Negative share:
   - sentiment == 'negative' OR rating <= 2.
7) Rating trend:
   - Daily buckets of avg(rating) and count(rating) for trend charts.

API Contracts
1) GET /api/admin/metrics
Query params:
- start (ISO date), end (ISO date)
- locationId (optional)
- groupBy = 'day' | 'location' (optional; defaults to day)
Validation:
- Maximum range: 90 days
- start <= end
Response shape:
{
  summary: {
    ingestedCount: number,
    draftedCount: number,
    approvedCount: number,
    postedCount: number,
    conversion: { draftedRate: number, approvedRate: number, postedRate: number },
    avgResponseMinutes: number | null,
    medianResponseMinutes: number | null,
    negativeShare: number,
    avgRating: number | null
  },
  trends: {
    byDay: Array<{ day: string, ingestedCount: number, postedCount: number, avgRating: number | null, negativeCount: number }>
  },
  syncHealth: {
    locations: Array<{
      locationId: string,
      locationName: string,
      source: 'google'|'yelp'|'manual',
      enabled: boolean,
      lastSyncAt: string | null,
      lastError: string | null,
      consecutiveFailures: number,
      lastGbpReviewSyncUpdateTime: string | null
    }>
  },
  alerts: {
    total: number,
    byType: Array<{ type: string, count: number }>,
    recent: Array<{ id: string, type: string, createdAt: string, severity: string, message: string }>
  }
}

2) GET /api/admin/metrics.csv
- Same query params as /api/admin/metrics.
- Returns text/csv with headers suitable for spreadsheets.
- Includes daily buckets and optional per-location rows.

Dashboard UI Layout (/app/admin/metrics)
A) Filters row
- Date range (start/end)
- Location dropdown (All + per-location)
- Buttons: Refresh, Export CSV

B) Sync Health table
Columns: Location, Source, Enabled, Last Sync, Last Error, Consecutive Failures.
Row action: “View reviews” deep-links to /app/reviews?locationId=...&status=pending.

C) Funnel KPIs cards
- Ingested, Drafted, Approved, Posted
- Conversion rates
- Avg/Median response time

D) Trends
- Daily ingested vs posted line/bar
- Avg rating by day
- Negative count by day

E) Alerts panel
- Count by alert type (SLA breach, sync failure, OCR failure)
- Recent alert list (last 20)

Implementation Notes (Prisma/SQL approach)
- Use Prisma groupBy where possible; for median, use SQL percentile_cont if available or compute in JS after selecting posted response times (bounded by range).
- Key queries:
  - Reviews in range: where createdAt between start/end AND (optional locationId)
  - Drafts in range: where createdAt between start/end; distinct reviewId for draftedCount
  - Posted response times: select postedAt, Review.createdAt join; compute minutes
  - Alerts: AlertEvent where createdAt between start/end AND businessId
  - Sync health: Location join Integration metadata; use Location.lastGbpReviewSyncUpdateTime and Integration.lastSyncAt/lastError if present

Instrumentation + safeguards
- Add correlationId to logs for each metrics request.
- Enforce max 90-day window to prevent expensive scans.
- Add indexes (if not already): Review(businessId, createdAt), Review(locationId, createdAt), DraftReply(status, postedAt), AlertEvent(businessId, createdAt).

Customer-facing proof of legitimacy for pilots
When sharing the pilot or asking for access, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

This completes the dashboard portion of the MVP: operators can now see whether syncing is healthy, whether replies are being produced/approved/posted, and whether SLA/ingestion failures are occurring—without leaving the app.