# Metrics Dashboard Implementation Kit (Next.js + Prisma): /app/admin/metrics + /api/admin/metrics + CSV export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:03:03.640Z

---

Below is an implementation kit you (owner) can paste into the codebase with minimal adaptation. It uses existing schema objects mentioned in prior cycles: Business, Location, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport, UserBusinessMembership.

GOAL
Ship /app/admin/metrics that answers:
1) Sync health: last sync per location (GBP), last error, review volume last 7/30 days.
2) Funnel: ingested → drafted → approved → posted counts and conversion rates.
3) Operational: response-time distribution, negative SLA breaches, alert volume.
4) Export: CSV for the selected filters.

KPI DEFINITIONS (consistent + computable)
- Ingested reviews: Review.createdAt within date range (or Review.sourceCreatedAt if you track platform time; pick one and be consistent).
- Drafted: DraftReply.createdAt within range (join by reviewId). If multiple drafts per review exist, use the first draft created (MIN(createdAt)) per review.
- Approved: DraftReply.approvedAt within range.
- Posted: DraftReply.postedAt within range AND status in ('posted_api','posted_manual').
- Response time (hours): postedAt - Review.createdAt (or sourceCreatedAt). Exclude rejected drafts and exclude never-posted.
- Negative review: Review.rating <= 2 OR sentiment='negative'. (Use whichever you already use in SLA alerts; keep aligned.)
- SLA breach: negative review where (first human action time) > threshold. If you don’t track “first viewed”, use first draft created time as proxy, else use approvedAt. Recommended proxy: MIN(DraftReply.createdAt) - Review.createdAt.

API CONTRACT: GET /api/admin/metrics
Query params:
- businessId (required unless inferred from session)
- locationId (optional)
- start (ISO date) default: now-30d
- end (ISO date) default: now
- source (optional: 'google' | 'yelp' | 'manual' | 'email' | 'ocr')
Returns:
{
  range: {start,end},
  filters: {locationId,source},
  syncHealth: [{locationId, name, lastSyncAt, lastError, reviews7d, reviews30d}],
  funnel: {ingested, drafted, approved, posted, rates: {draftedPerIngested, approvedPerDrafted, postedPerApproved}},
  responseTime: {medianHours, p90Hours, avgHours},
  negatives: {count, share, slaBreaches, breachShare},
  alerts: {total, byType: [{type,count}]}
}

ROUTE: /api/admin/metrics (pseudo-code in TS)
1) RBAC: confirm session user has membership to businessId.
2) Validate query with zod.
3) Build where clause for Review based on businessId, optional locationId/source, date range.
4) Query aggregates:

PRISMA QUERY SKETCH (adapt to your model names)

A) Base review set
const reviewWhere = {
  businessId,
  ...(locationId ? { locationId } : {}),
  ...(source ? { source } : {}),
  createdAt: { gte: start, lte: end }
};

const ingested = await prisma.review.count({ where: reviewWhere });

B) Drafted/Approved/Posted counts (distinct reviews)
If DraftReply is 1:1 with Review, simple counts. If 1:many, use groupBy or distinct.

Example for 1:many:
const draftedDistinct = await prisma.draftReply.findMany({
  where: {
    review: reviewWhere,
    createdAt: { gte: start, lte: end }
  },
  select: { reviewId: true },
  distinct: ['reviewId']
});
const drafted = draftedDistinct.length;

const approvedDistinct = await prisma.draftReply.findMany({
  where: {
    review: reviewWhere,
    approvedAt: { not: null, gte: start, lte: end }
  },
  select: { reviewId: true },
  distinct: ['reviewId']
});
const approved = approvedDistinct.length;

const postedDistinct = await prisma.draftReply.findMany({
  where: {
    review: reviewWhere,
    postedAt: { not: null, gte: start, lte: end },
    status: { in: ['posted_api','posted_manual'] }
  },
  select: { reviewId: true },
  distinct: ['reviewId']
});
const posted = postedDistinct.length;

C) Response time stats
Fetch posted items with their review createdAt then compute in JS for median/p90.
const postedItems = await prisma.draftReply.findMany({
  where: {
    review: reviewWhere,
    postedAt: { not: null, gte: start, lte: end },
    status: { in: ['posted_api','posted_manual'] }
  },
  select: { postedAt: true, review: { select: { createdAt: true } } }
});
const hours = postedItems.map(x => (x.postedAt.getTime()-x.review.createdAt.getTime())/36e5).filter(h=>h>=0);
Compute avg/median/p90.

D) Negatives + SLA breaches
const negativesWhere = {
  ...reviewWhere,
  OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }]
};
const negativeCount = await prisma.review.count({ where: negativesWhere });
const negativeShare = ingested ? negativeCount/ingested : 0;

SLA breach proxy (time to first draft) – this is computable with current data:
Fetch negatives in range plus first draft createdAt.
const negativeReviews = await prisma.review.findMany({
  where: negativesWhere,
  select: {
    id: true,
    createdAt: true,
    drafts: { select: { createdAt: true }, orderBy: { createdAt: 'asc' }, take: 1 }
  }
});
const thresholdHours = 2; // pull from EscalationRule by business/location
const slaBreaches = negativeReviews.filter(r => {
  const firstDraftAt = r.drafts[0]?.createdAt;
  if (!firstDraftAt) return true; // no action = breach
  const deltaH = (firstDraftAt.getTime()-r.createdAt.getTime())/36e5;
  return deltaH > thresholdHours;
}).length;

E) Alerts volume
const alerts = await prisma.alertEvent.groupBy({
  by: ['type'],
  where: {
    businessId,
    createdAt: { gte: start, lte: end },
    ...(locationId ? { locationId } : {})
  },
  _count: { _all: true }
});
const alertsTotal = alerts.reduce((a,x)=>a+x._count._all,0);

F) Sync health per location
Assumes Location has lastGbpSyncAt + lastGbpError + lastGbpReviewSyncUpdateTime (or similar).
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId ? { id: locationId } : {}) },
  select: { id:true, name:true, lastGbpSyncAt:true, lastGbpSyncError:true }
});
Then compute reviews7d/reviews30d counts per location (either N queries or single groupBy by locationId).
Efficient groupBy example for 30d:
const reviews30 = await prisma.review.groupBy({
  by: ['locationId'],
  where: { businessId, createdAt: { gte: new Date(Date.now()-30*864e5) } },
  _count: { _all: true }
});
Do similarly for 7d.

CSV EXPORT: GET /api/admin/metrics.csv
- Same filters.
- Return a flat file with one row per location (or a summary row + location rows).
Columns:
businessId,locationId,locationName,start,end,ingested,drafted,approved,posted,negatives,negativeShare,medianResponseHours,p90ResponseHours,alertsTotal,slaBreaches,lastSyncAt,lastError

UI: /app/admin/metrics
- Top filter bar: date range picker (last 7/30/90, custom), location dropdown (All + locations), source dropdown.
- Cards row:
  - Ingested
  - Posted
  - Median response time
  - Negative share
- Table 1: Funnel
  - Ingested | Drafted | Approved | Posted | conversion rates
- Table 2: Sync Health per location
  - Location | Last sync | Last error | Reviews 7d | Reviews 30d
- Table 3: Alerts
  - Type | Count
- Buttons:
  - Download CSV (hits /api/admin/metrics.csv with current query)

COPY FOR CSV BUTTON TOOLTIP (ready to paste)
“Exports the same metrics shown on this page as a CSV for debugging and sharing. Data comes from your Review Autopilot logs and review records.”

NOTES / EDGE CASES
- If you have separate timestamps for platform review time vs ingestion time, prefer platform time for reputation KPIs and ingestion time for pipeline KPIs; if only one exists, use Review.createdAt consistently.
- Some reviews may be ingested but never drafted if LLM fails; include that in funnel (drafted < ingested) and surface errors via Sentry/AuditLog.
- For GBP sync failures, ensure Location.lastGbpSyncError is written by your sync job; otherwise show last AlertEvent of type 'integration_sync_failed'.

CUSTOMER COMMUNICATION (for pilot onboarding email)
When you share the dashboard or request pilot access, use the product URL for legitimacy:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-cm2c2899.picard.replit.dev/sites/1

If you want, next cycle I can output: (a) exact Next.js route code skeletons with zod + RBAC helpers, and (b) the React/Server Component page code for /app/admin/metrics that calls the API and renders the tables.