# Admin Metrics Dashboard — Implementation Blueprint (Next.js + Prisma) + API/CSV Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:06:06.502Z

---

Goal
Ship /app/admin/metrics that answers: (1) Is syncing healthy? (2) Are we converting ingested reviews into posted replies quickly? (3) Are negative reviews handled within SLA? (4) What themes are driving sentiment?

Data sources (existing)
- Review: rating, createdAt, source, locationId, sentiment, categories[], rawPayload, url
- DraftReply: status (drafted/approved/rejected/posted_manual/posted_api), updatedAt, approvedAt, postedAt, policyBlockedReason
- Location: lastGbpReviewSyncUpdateTime, enabled flags
- Integration: lastSyncAt/lastError (if present)
- AuditLog: entityType, entityId, action, createdAt, metadata (use to compute funnel milestones if DraftReply timestamps missing)
- AlertEvent: type (negative_review, sync_failure, ocr_failure), createdAt, resolvedAt, metadata

KPI definitions (consistent, auditable)
- Ingested reviews: Review.createdAt within date range (or Review.ingestedAt if you have it; if not, add later).
- Drafted: review has >=1 DraftReply created within range (or DraftReply.createdAt within range).
- Approved: DraftReply.status == 'approved' OR approvedAt not null.
- Posted: DraftReply.status in ('posted_manual','posted_api') OR postedAt not null.
- Response time (median + p90): postedAt - Review.createdAt, excluding rejected/never-posted drafts.
- Negative share: count(sentiment='negative' OR rating<=2) / total.
- SLA breaches: negative reviews where (now - Review.createdAt) > threshold and not posted.

Routes & pages
1) Page: /app/admin/metrics
- Server component loads businessId from session membership.
- Query params: start, end (ISO date), locationId (optional), source (optional), sentiment (optional).
- Layout sections:
  A. Sync Health
    - Table per location: location name, integration type, enabled, last sync watermark (Location.lastGbpReviewSyncUpdateTime), last sync run time (Integration.lastSyncAt if you track per integration), last error (Integration.lastError), failures (AlertEvent type=sync_failure in range).
    - Badge: Healthy/Degraded based on (last sync < 24h) and no recent failures.
  B. Funnel
    - Counters: Ingested → Drafted → Approved → Posted.
    - Conversion rates: drafted/ingested, approved/drafted, posted/approved.
  C. Response Time
    - Median, p90, and breakdown by sentiment (positive/neutral/negative).
  D. Reputation Snapshot
    - Review volume, average rating, rating trend vs prior period, negative share.
  E. Themes
    - Top categories (from Review.categories) with counts and negative-rate per category.
  F. Alerts
    - Alert volume by type, unresolved count, average time-to-resolution (resolvedAt-createdAt).

2) API: /api/admin/metrics (JSON)
- Method: GET
- RBAC: require logged-in user + membership to businessId (derive from session; do not accept arbitrary businessId from client).
- Validation (zod):
  - start/end required; max range 180 days.
  - locationId optional; must belong to business.
- Response shape:
  {
    range: {start,end},
    filters: {locationId?, source?, sentiment?},
    syncHealth: [{locationId,name,enabled,lastWatermark,lastSyncAt?,lastError?,recentFailuresCount}],
    funnel: {ingested,drafted,approved,posted, rates:{drafted,approved,posted}},
    responseTime: {medianHours,p90Hours, bySentiment:{positive?,neutral?,negative?}},
    reputation: {reviewVolume, avgRating, avgRatingPrev, avgRatingDelta, negativeShare},
    themes: [{category,count,negativeCount,negativeRate}],
    alerts: {byType:{negative_review:number,sync_failure:number,ocr_failure:number}, unresolved:number}
  }

3) API: /api/admin/metrics.csv (download)
- Method: GET
- Same RBAC/validation as JSON.
- CSV columns (one row per review):
  reviewId, source, locationName, createdAt, rating, sentiment, categories, hasDraft, draftStatus, approvedAt, postedAt, responseTimeHours, url
- Purpose: customer support + debugging + “prove ROI” exports.

Aggregation approach (Prisma-friendly)
- Base where clause: { businessId via join on Location, createdAt: {gte:start, lte:end}, ...(locationId?), ...(source?) }
- Ingested: prisma.review.count({where:base})
- Avg rating: prisma.review.aggregate({_avg:{rating:true}, where:base})
- Negative count: prisma.review.count({where:{...base, OR:[{sentiment:'negative'},{rating:{lte:2}}]}})
- Drafted/Approved/Posted:
  - Option A (best): use DraftReply timestamps/status directly.
  - drafted = prisma.draftReply.count({where:{ review:{...base} }}) OR distinct reviewIds with drafts.
  - approved = prisma.draftReply.count({where:{ review:{...base}, OR:[{status:'approved'},{approvedAt:{not:null}}] }})
  - posted = prisma.draftReply.count({where:{ review:{...base}, status:{in:['posted_manual','posted_api']} }})
  - For funnel by review (preferred): count distinct reviews that reached each stage using groupBy on reviewId.

Response time distribution
- Query posted drafts joined to review:
  - prisma.draftReply.findMany({
      where:{ status:{in:['posted_manual','posted_api']}, review:{...base} },
      select:{ postedAt:true, review:{select:{createdAt:true,sentiment:true}} }
    })
- Compute responseTimeHours in JS and then median/p90 (fast enough for MVP; cap to 10k records by date-range validation).

Themes
- If Review.categories is a string[]:
  - Fetch reviews in range with select:{categories:true,sentiment:true,rating:true}
  - Count per category and negativeCount where sentiment negative or rating<=2.

Sync health
- locations = prisma.location.findMany({where:{businessId}, select:{id,name,enabledGbpSync,lastGbpReviewSyncUpdateTime, integration:{select:{lastSyncAt,lastError}}}})
- recentFailuresCount = prisma.alertEvent.count({where:{businessId, type:'sync_failure', createdAt:{gte:start,lte:end}}}) grouped by locationId if stored in metadata.

UI wiring notes
- Use server component to fetch /api/admin/metrics (or call Prisma directly in page for simplicity).
- Charts: keep minimal (tiny sparkline via lightweight library) or render tables only for speed.
- Add “Export CSV” button linking to /api/admin/metrics.csv?start=...&end=...&locationId=...

Customer-facing language (for later / optional on page)
- Headline: “Reputation Autopilot Metrics”
- Explainer: “Track review inflow, response speed, and negative-review handling. For product details and legitimacy, share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

Acceptance checklist
- Loads in <2s for 30-day range and <=10 locations.
- CSV export matches on-screen totals.
- RBAC verified: user can only see businesses they’re invited to.
- Metrics align with weekly report numbers (avg rating, negative share, response time).