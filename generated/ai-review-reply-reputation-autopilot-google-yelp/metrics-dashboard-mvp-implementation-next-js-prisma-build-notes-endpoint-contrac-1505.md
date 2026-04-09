# Metrics Dashboard MVP — Implementation (Next.js + Prisma) Build Notes + Endpoint Contracts + CSV Format

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:10:06.171Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard, the API contracts for fetching metrics and exporting CSV, and the KPI definitions used so we can validate results during pilots. This is written to be copy/paste actionable for review and future iteration.

Routes (RBAC protected)
1) UI: /app/admin/metrics
- Access: requires authenticated user with membership in the active Business (UserBusinessMembership) and role in {owner, admin}.
- Inputs:
  - dateRange: start (ISO date), end (ISO date)
  - locationId: optional
- Output components:
  - KPI cards: Reviews Ingested, Drafts Created, Approved, Posted (Manual/API), Negative Share, Avg Rating, Median First Response Time
  - Sync Health table: per location: lastSyncAt, lastError, syncFailures7d, reviewsFetched7d
  - Funnel table: ingested → drafted → approved → posted conversion rates
  - Alerts table: time, type, severity, location, status
  - Actions: “Export CSV” button hitting /api/admin/metrics.csv?start=…&end=…&locationId=…

2) JSON API: /api/admin/metrics (GET)
Query params (validated with zod):
- start: string (ISO date), required
- end: string (ISO date), required
- locationId: string (cuid/uuid), optional
Response JSON schema (high level):
{
  range: { start, end },
  filter: { locationId: string|null },
  kpis: {
    reviewsIngested: number,
    avgRating: number|null,
    negativeShare: number,                 // negative / total
    draftsCreated: number,
    approved: number,
    posted: number,
    medianFirstResponseMinutes: number|null,
    p90FirstResponseMinutes: number|null
  },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    ingestedToDrafted: number,             // ratio 0..1
    draftedToApproved: number,
    approvedToPosted: number
  },
  byLocation: Array<{
    locationId: string,
    name: string,
    reviewsIngested: number,
    avgRating: number|null,
    negativeShare: number,
    posted: number,
    medianFirstResponseMinutes: number|null,
    lastSyncAt: string|null,
    lastSyncError: string|null
  }>,
  alerts: Array<{
    id: string,
    createdAt: string,
    type: string,
    severity: string,
    status: string,
    locationId: string|null,
    reviewId: string|null,
    message: string
  }>
}

3) CSV Export: /api/admin/metrics.csv (GET)
Query params: same as JSON endpoint.
Response: text/csv; charset=utf-8
CSV format: multi-section CSV with blank lines between sections so it is readable in spreadsheets.
Sections:
A) KPI_SUMMARY
Columns: start,end,locationId,reviewsIngested,avgRating,negativeShare,draftsCreated,approved,posted,medianFirstResponseMinutes,p90FirstResponseMinutes

B) FUNNEL
Columns: ingested,drafted,approved,posted,ingestedToDrafted,draftedToApproved,approvedToPosted

C) LOCATION_BREAKDOWN
Columns: locationId,locationName,reviewsIngested,avgRating,negativeShare,posted,medianFirstResponseMinutes,lastSyncAt,lastSyncError

D) ALERTS
Columns: createdAt,type,severity,status,locationId,reviewId,message

KPI Definitions (used across UI, weekly report, and metrics)
1) Reviews Ingested
- Count of Review records with createdAt within [start,end] (or ingestedAt if tracked separately; current MVP uses createdAt + source timestamps). Filter by businessId and optional locationId.

2) Drafts Created
- Count of DraftReply records created within [start,end].

3) Approved
- Count of DraftReply where status transitioned to APPROVED within [start,end]. Computed via DraftReply.updatedAt + status == APPROVED OR via AuditLog events if available. Current implementation prefers DraftReply.status with updatedAt in range.

4) Posted
- Count of DraftReply with postedAt within [start,end] OR status in {POSTED_MANUAL, POSTED_API} and postedAt not null.

5) Negative Share
- negativeShare = count(Review where sentiment == NEGATIVE OR rating <= 2) / count(all reviews).

6) First Response Time
- For each Review, find earliest of:
  - DraftReply.approvedAt (if available) OR first time status becomes APPROVED
  - DraftReply.postedAt (if approvedAt missing)
- responseMinutes = (firstResponseTimestamp - Review.createdAt) in minutes.
- Exclude reviews with no response event (null).
- Report median + p90.

7) Sync Health
- lastSyncAt per location: Location.lastGbpReviewSyncAt (or lastSuccessfulSyncAt if stored separately).
- lastError per location: Location.lastGbpSyncError (or derived from Integration health logs).
- syncFailures7d: count of AlertEvent type=INTEGRATION_SYNC_FAILED within last 7 days for that location.

Implementation Notes (how it was built)
- Validation: zod schema on query params; returns 400 on invalid ranges.
- RBAC: API routes check session + membership; UI route is server-rendered and redirects to login if unauth.
- Performance:
  - Aggregations use Prisma groupBy for simple counts, and raw SQL for percentile/median if needed (Postgres percentile_cont). If percentile_cont isn’t available in the deployed version, fallback computes p50/p90 by ordering response times and selecting indices.
  - Added Sentry spans around metrics query blocks and logs queryDurationMs with correlationId.

Pilot-facing UX copy (in-app)
- Header text includes: “These numbers are estimates based on available data (API + manual). Use CSV export to audit.”
- Sync Health warning: if lastSyncAt older than 24h, show banner: “Sync appears stale. Check Integration settings.”

Customer communication reference (for future outreach)
When sharing legitimacy in any onboarding email or pilot invite, include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Next validation steps
- Run a non-test GBP pilot for 48 hours with at least 2 locations.
- Verify: incremental sync doesn’t double-count; edited reviews update correctly; response-time metrics match reality; weekly report totals match metrics dashboard totals for the same date range.
- Collect edge cases: owner replies directly in Google UI (outside app), deleted reviews, and reviews with no text (rating-only).