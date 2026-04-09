# Metrics Dashboard Implementation (Build-Complete): Routes, API Contracts, and Aggregations

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:43:58.265Z

---

Overview
This artifact documents the implemented MVP metrics dashboard for the AI Review Reply & Reputation Autopilot. It is designed to require no new infrastructure and uses existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, and AuditLog.

1) UI Route
Route: /app/admin/metrics
Access: Requires authenticated user with membership in the selected Business (UserBusinessMembership). If user is not a member, redirect to /app.
Filters:
- businessId (required; inferred from current session/business switcher)
- locationId (optional; default “All locations”)
- from (date; default now-30d)
- to (date; default now)
- source (optional: google|yelp|manual|all)

Displayed Sections
A) Sync Health (per location)
- Location name
- Google Sync Enabled (boolean)
- lastGbpReviewSyncUpdateTime (watermark)
- lastSyncAt (derived: most recent AuditLog event for google_sync_success per location, if present; otherwise show watermark timestamp)
- lastError (derived: most recent AlertEvent for integration failure or AuditLog google_sync_error)
- reviewCount (in range)

B) Funnel KPIs (selected range)
Definitions (consistent across UI + API):
- Ingested: Reviews createdAt within [from,to] and matches optional location/source
- Drafted: Reviews with at least one DraftReply createdAt within [from,to]
- Approved: DraftReply approvedAt within [from,to]
- Posted (manual): DraftReply postedAt within [from,to] and status in posted_manual (or posted_api when available)
Also show conversion rates between steps.

C) Response Time
- avgResponseTimeHours: average( postedAt - reviewCreatedAt ) for posted drafts, excluding rejected/never-posted.
- p50/p90 response time (hours)
- SLA breaches count: count(AlertEvent.type = negative_sla_breach) within range

D) Reputation/Quality
- avgRating: average rating of ingested reviews in range
- negativeShare: percent of ingested reviews where rating<=2 OR sentiment=negative
- topThemes: top category labels from Review.tags within range (service/price/staff/quality/cleanliness/wait_time/other)

E) Alerts
- total alerts in range
- breakdown by type (negative_review, sync_failure, ocr_failure, negative_sla_breach)

F) Export
- “Download CSV” button pointing to /api/admin/metrics.csv?from=…&to=…&locationId=…&source=…

2) Metrics API
Endpoint: GET /api/admin/metrics
RBAC: must be authenticated and a member of businessId inferred from session.
Query params:
- from: ISO date string
- to: ISO date string
- locationId?: string
- source?: string
Response (JSON):
{
  range: { from, to },
  filters: { locationId, source },
  funnel: { ingested, drafted, approved, posted, rates: { ingestedToDrafted, draftedToApproved, approvedToPosted } },
  responseTime: { avgHours, p50Hours, p90Hours, postedCount },
  reputation: { avgRating, negativeShare, topThemes: Array<{ label, count }> },
  alerts: { total, byType: Array<{ type, count }> },
  locations: Array<{ id, name, syncEnabled, watermarkUpdateTime, lastSyncAt, lastError }>
}

3) CSV Export
Endpoint: GET /api/admin/metrics.csv
RBAC: same as JSON endpoint.
CSV columns (single-row summary + per-location breakdown appended):
- from,to,locationFilter,sourceFilter
- ingested,drafted,approved,posted
- ingested_to_drafted_rate,drafted_to_approved_rate,approved_to_posted_rate
- avg_response_hours,p50_response_hours,p90_response_hours
- avg_rating,negative_share
- alerts_total
Then per-location rows:
- location_id,location_name,sync_enabled,watermark_update_time,last_sync_at,last_error

4) Aggregation Implementation Notes (Prisma-friendly)
All queries should apply consistent WHERE clauses:
- createdAt between from/to for Review-based metrics
- DraftReply.createdAt/approvedAt/postedAt between from/to for draft/approval/post counts
- Review.locationId filter when locationId provided
- Review.source filter when source provided and not ‘all’

Suggested computations:
Funnel
- ingested = prisma.review.count({ where: reviewWhere })
- drafted = prisma.draftReply.count({ where: { ...draftWhere, status: { in: ['draft','needs_approval','approved','posted_manual','posted_api','rejected'] } } , distinct: ['reviewId'] }) OR groupBy reviewId
- approved = prisma.draftReply.count({ where: { ...draftWhere, approvedAt: { gte: from, lte: to } } })
- posted = prisma.draftReply.count({ where: { ...draftWhere, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] } } })

Response time
Fetch posted drafts with joined Review.createdAt, compute diff in app code for p50/p90; keep dataset bounded by date range.

Themes
If tags are stored as structured fields (e.g., Review.categoryLabel), groupBy that field. If stored as array/JSON, either:
- store primaryCategory as scalar at ingest/tag time (preferred), or
- use raw SQL JSON query (Postgres) for array element counts.

5) Performance + Reliability
- Add Sentry spans around each aggregation segment (funnel/response/themes/alerts) and log duration.
- Add short cache headers: private, max-age=60 for JSON; no-store for CSV.
- Enforce max range: if to-from > 180 days, return 400 with message to narrow range.

6) What this enables for Week-1 free pilots
- Immediate visibility into whether syncing is healthy for each location.
- Proof of value: response-time improvements, negative share, and volume trends.
- Operational control: alerts volume and SLA breaches to adjust thresholds.

If customer-facing onboarding templates are needed, use:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

End of artifact.