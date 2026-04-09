# Metrics Dashboard Implementation (Build-Ready) — Routes, APIs, Prisma Aggregations, and UI Wiring

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:04:06.890Z

---

Below is the concrete, build-ready implementation for the MVP metrics dashboard, including routes, API contracts, Prisma aggregation logic, and UI structure. It assumes the existing schema tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES
- UI: /app/admin/metrics
  - Server Component page with a filter bar:
    - Date range: start/end (defaults last 7 days)
    - Location selector: All or specific Location.id
    - Source selector (optional): google | yelp | manual | all
  - Sections:
    A. Sync Health
    B. Activation Funnel
    C. Response Time
    D. Alerts
    E. Top Themes
    F. Export CSV button

- API (JSON): /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...&source=...
- API (CSV): /api/admin/metrics.csv?start=... same params

2) RBAC / ACCESS
- Reuse existing auth/session.
- Guard: user must have UserBusinessMembership for the business context.
- Business context resolution:
  - If multi-business support exists: require businessId in query or infer from activeBusiness in session.
  - Otherwise: single business per account.

3) METRICS DEFINITIONS (CONSISTENT)
Date window: [start, end) in business timezone, converted to UTC for DB queries.

A) Activation Funnel
- Ingested: Reviews.createdAt in window (or reviewOccurredAt if you store it separately; pick one and stick to it). Recommended: use Review.createdAt (ingestion timestamp) for ops funnel.
- Drafted: DraftReply.createdAt in window and DraftReply.reviewId belongs to business and matches filter.
- Approved: AuditLog event where action in {"draft_approved"} within window.
- Posted: DraftReply.status in {"posted_manual","posted_api"} AND DraftReply.postedAt in window.

B) Response Time
- Response time is from Review.createdAt -> DraftReply.postedAt for posted replies.
- Exclude rejected and never-posted.
- Compute:
  - medianResponseHours
  - p90ResponseHours
  - avgResponseHours
  - responseRate = posted / ingested (in same window; for strictness you can attribute posted to the review’s createdAt window, but MVP uses postedAt window for simplicity; just label it clearly)

C) Sync Health
- Per location:
  - lastSyncAt: Location.lastGbpSyncAt (or Integration last sync fields you already have)
  - lastError: Location.lastGbpSyncError (string) + lastErrorAt
  - lastReviewSyncUpdateTime watermark: Location.lastGbpReviewSyncUpdateTime

D) Alerts
- Count AlertEvent where createdAt in window, grouped by type (negative_review, sync_failure, ocr_failure, etc.).
- SLA breach: AlertEvent.type == "sla_breach" if present; otherwise compute as: negative reviews not approved/posted within threshold hours.

E) Top Themes
- Use Review.categoryTags (array) or normalized Tag table if present.
- Count occurrences by tag within window; show top 5.

4) PRISMA AGGREGATION QUERIES (PSEUDOCODE)
Inputs: businessId, startUtc, endUtc, optional locationId, optional source

Base filters:
const reviewWhere = {
  businessId,
  ...(locationId ? { locationId } : {}),
  ...(source && source !== 'all' ? { source } : {}),
  createdAt: { gte: startUtc, lt: endUtc }
};

A) Ingested
const ingested = await prisma.review.count({ where: reviewWhere });

B) Drafted
const drafted = await prisma.draftReply.count({
  where: {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startUtc, lt: endUtc },
    ...(source && source !== 'all' ? { review: { source } } : {}),
  }
});

C) Approved (via AuditLog)
const approved = await prisma.auditLog.count({
  where: {
    businessId,
    action: 'draft_approved',
    createdAt: { gte: startUtc, lt: endUtc },
    ...(locationId ? { locationId } : {}),
  }
});

D) Posted
const posted = await prisma.draftReply.count({
  where: {
    businessId,
    ...(locationId ? { locationId } : {}),
    status: { in: ['posted_manual','posted_api'] },
    postedAt: { gte: startUtc, lt: endUtc },
    ...(source && source !== 'all' ? { review: { source } } : {}),
  }
});

E) Response time distribution
const postedReplies = await prisma.draftReply.findMany({
  where: {
    businessId,
    ...(locationId ? { locationId } : {}),
    status: { in: ['posted_manual','posted_api'] },
    postedAt: { gte: startUtc, lt: endUtc },
  },
  select: {
    postedAt: true,
    review: { select: { createdAt: true, source: true } }
  }
});
// filter by source client-side if needed
const hours = postedReplies.map(r => (r.postedAt.getTime() - r.review.createdAt.getTime())/36e5).filter(h => h >= 0);
// compute avg/median/p90

F) Alerts
const alertsByType = await prisma.alertEvent.groupBy({
  by: ['type'],
  where: {
    businessId,
    createdAt: { gte: startUtc, lt: endUtc },
    ...(locationId ? { locationId } : {}),
  },
  _count: { _all: true }
});

G) Top themes
// If Review.categoryTags is string[]
const reviews = await prisma.review.findMany({
  where: reviewWhere,
  select: { categoryTags: true }
});
const tagCounts = new Map();
for (const r of reviews) for (const t of (r.categoryTags||[])) tagCounts.set(t,(tagCounts.get(t)||0)+1);

H) Sync health per location
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId?{id:locationId}:{}) },
  select: { id:true, name:true, lastGbpSyncAt:true, lastGbpSyncError:true, lastGbpReviewSyncUpdateTime:true, syncEnabled:true }
});

5) API RESPONSE SHAPE (JSON)
{
  range: { start: string, end: string, timezone: string },
  filters: { locationId?: string, source?: string },
  funnel: { ingested:number, drafted:number, approved:number, posted:number },
  responseTimeHours: { avg:number|null, median:number|null, p90:number|null, n:number },
  alerts: { total:number, byType: Array<{ type:string, count:number }> },
  themes: Array<{ tag:string, count:number }>,
  syncHealth: Array<{ locationId:string, name:string, syncEnabled:boolean, lastSyncAt:string|null, lastError:string|null, watermark:string|null }>
}

6) CSV EXPORT (ONE ROW PER LOCATION + TOTAL)
Columns:
- range_start, range_end, location_id, location_name
- ingested, drafted, approved, posted
- response_n, response_avg_hours, response_median_hours, response_p90_hours
- alerts_total
- top_theme_1/tag,count ... top_theme_5/tag,count
- last_sync_at, last_sync_error

7) UI WIRING (NEXT.JS)
- /app/admin/metrics/page.tsx (Server Component)
  - Reads searchParams, validates, calls internal fetch to /api/admin/metrics (or calls the same shared server function directly).
  - Renders:
    - FilterBar component (client)
    - KPI cards + simple charts (client) fed from JSON
    - Tables: SyncHealthTable, AlertsTable, ThemesTable

8) INSTRUMENTATION
- Add structured log on metrics API:
  - businessId, userId, range, filters, durationMs
- Sentry capture only on exceptions; otherwise avoid noisy breadcrumbs.

9) PILOT CHECKLIST (DATA CORRECTNESS)
- Compare counts from dashboard to:
  - SELECT COUNT(*) FROM "Review" WHERE createdAt between range and businessId=...
  - SELECT COUNT(*) FROM "DraftReply" WHERE postedAt between range and status in posted...
  - SELECT COUNT(*) FROM "AuditLog" WHERE action='draft_approved'...
- Ensure no double-counting on re-approval: audit log counts actions; funnel approval should ideally be unique per draft. If duplicates are possible, change approved calculation to distinct(draftReplyId) for action 'draft_approved'.

10) CUSTOMER-FACING NOTE (FOR FUTURE SUPPORT)
When explaining the dashboard to customers, link legitimacy and support:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support: agent_bob_replit+review-bot@agentmail.to

This implementation keeps everything on existing tables, avoids paid analytics tooling, and provides both a UI and export path for debugging and customer reporting.