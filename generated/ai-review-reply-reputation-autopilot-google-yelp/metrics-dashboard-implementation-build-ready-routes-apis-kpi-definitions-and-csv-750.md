# Metrics Dashboard Implementation (Build-Ready) — Routes, APIs, KPI Definitions, and CSV Schema

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:07:06.794Z

---

Below is the concrete implementation plan + drop-in code skeleton for the new metrics dashboard. It assumes the existing schema from prior cycles: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES / PAGES

A. Page: /app/admin/metrics
- RBAC: require logged-in user + membership in selected business.
- Inputs:
  - businessId (implicit from session context or selector)
  - locationId (optional; “All locations” default)
  - startDate / endDate (defaults: last 30 days)
- Sections:
  1) Sync Health
     - Table: Location, lastSyncAt, lastError, lastReviewSeenAt, failures7d
  2) Funnel (counts)
     - Ingested reviews (createdAt in range)
     - Drafted (DraftReply created in range)
     - Approved (AuditLog action=reply_approved)
     - Posted (DraftReply status in [posted_manual, posted_api] in range)
     - Conversion rates: drafted/ingested, approved/drafted, posted/approved
  3) Response Time
     - Median + p90 time from Review.createdAt -> postedAt (DraftReply.postedAt)
     - Exclude: drafts rejected or never posted (status rejected, pending)
  4) Reputation KPIs
     - Avg rating (mean of Review.rating)
     - Negative share (% rating<=2 OR sentiment=negative)
     - Rating trend: daily avg rating sparkline
  5) Top Themes
     - From Review.categoryLabels (service/price/staff/quality/cleanliness/wait_time/other): counts & %
  6) Alerts
     - AlertEvents in range by type (sync_failed, negative_review_sla, ocr_failed)
     - Unacked alerts count

B. API: /api/admin/metrics (GET)
- Query params:
  - businessId (string, required)
  - locationId (string, optional)
  - start (ISO date string, required)
  - end (ISO date string, required)
- Returns JSON:
  {
    range: { start, end },
    syncHealth: Array<{ locationId, locationName, lastSyncAt, lastError, lastReviewSeenAt, failures7d }>,
    funnel: { ingested, drafted, approved, posted, rates: { draftedPerIngested, approvedPerDrafted, postedPerApproved } },
    responseTime: { medianMinutes, p90Minutes, sampleSize },
    reputation: { avgRating, negativeShare, reviewCount },
    timeSeries: { byDay: Array<{ date, ingested, drafted, approved, posted, avgRating, negativeShare }> },
    themes: Array<{ label, count, share }>,
    alerts: { total, unacked, byType: Array<{ type, count }> }
  }

C. CSV Export: /api/admin/metrics.csv (GET)
- Same query params and RBAC as JSON endpoint.
- CSV outputs (single file with sections separated by blank line is fine for MVP):
  1) Daily timeseries header:
     date,ingested,drafted,approved,posted,avg_rating,negative_share
  2) Per-location sync summary header:
     location_id,location_name,last_sync_at,last_error,failures_7d,last_review_seen_at

2) KPI DEFINITIONS (MUST MATCH WEEKLY REPORT)

- Ingested: Review records with createdAt in [start,end] and (locationId matches filter if provided).
- Drafted: DraftReply records createdAt in [start,end] joined to Review within business + optional location filter.
- Approved: AuditLog actions where action = 'reply_approved' and createdAt in [start,end]. (If you store DraftReply status transitions without audit logs, you can alternatively count DraftReply.status='approved' with updatedAt in range, but AuditLog is preferred.)
- Posted: DraftReply with status IN ('posted_manual','posted_api') and postedAt in [start,end].
- Response time: minutes between Review.createdAt and DraftReply.postedAt, for posted replies only. Exclude rejected/unposted.
- Negative share: count where (Review.rating <= 2) OR (Review.sentiment='negative'). Denominator: total ingested in range.
- Themes: use Review.categoryLabels array; flatten and count occurrences. If multiple labels per review, count each label occurrence (or choose top-1 label; pick one and keep consistent—MVP recommendation: count occurrences, but also compute unique-review share as countDistinct(reviewId with label)/totalReviews).

3) PRISMA AGGREGATION SKETCH (SERVER)

A. Base filters
- const reviewWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDate, lte: endDate }
  }

B. Counts
- ingested = prisma.review.count({ where: reviewWhere })
- drafted = prisma.draftReply.count({ where: { review: reviewWhere, createdAt: { gte: startDate, lte: endDate } } })
- approved = prisma.auditLog.count({ where: { businessId, ...(locationId?{locationId}:{}), action:'reply_approved', createdAt:{gte:startDate,lte:endDate} } })
- posted = prisma.draftReply.count({ where: { review: reviewWhere, status: { in: ['posted_manual','posted_api'] }, postedAt:{gte:startDate,lte:endDate} } })

C. Response-time distribution
- Fetch posted replies sample (only posted):
  prisma.draftReply.findMany({
    where: { review: reviewWhere, status:{in:['posted_manual','posted_api']}, postedAt:{not:null, gte:startDate, lte:endDate} },
    select: { postedAt:true, review:{ select:{ createdAt:true } } }
  })
- Compute minutes array; median/p90 in JS.

D. Avg rating / negatives
- avgRating via aggregate:
  prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true }, _count: { _all:true } })
- negatives count:
  prisma.review.count({ where: { ...reviewWhere, OR:[{rating:{lte:2}}, {sentiment:'negative'}] } })

E. Themes
- For PostgreSQL + Prisma, easiest MVP: fetch categoryLabels in range then count in JS:
  prisma.review.findMany({ where: reviewWhere, select: { id:true, categoryLabels:true } })
- Count occurrences and compute share.

F. Time series by day
- MVP: groupBy not perfect with dates; use raw SQL for speed/accuracy:
  - Daily ingested/drafted/posted and avg rating can be computed via DATE_TRUNC('day', ...)
  - Negative share per day using SUM(CASE WHEN ... THEN 1 END)::float / COUNT(*)

4) UI COMPONENTS (NO NEW DEPENDENCIES)

- Use tables + simple SVG sparkline component:
  - Input: number[] or {x,y}[]
  - Render polyline scaled to min/max.
- Provide “Download CSV” button linking to /api/admin/metrics.csv?businessId=...&start=...&end=...

5) RBAC + SECURITY

- Both APIs require authentication.
- Validate business membership:
  - UserBusinessMembership where userId=session.user.id and businessId matches.
- Prevent cross-business data leakage: ensure all queries filter by businessId.
- Rate-limit is optional for MVP; rely on Vercel/edge basic protections.

6) INSTRUMENTATION

- Add structured logs:
  - event: metrics_query
  - businessId, locationId, start, end
  - durationMs, counts
- Sentry:
  - captureException on Prisma errors
  - add breadcrumbs for slow queries > 1s

7) CUSTOMER-FACING REFERENCES (FOR ANY EMAIL/UI HELP TEXT)

- Product legitimacy URL to show in onboarding/help: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support/contact email: agent_bob_replit+review-bot@agentmail.to

If you want, I can next produce the onboarding email + in-app checklist copy that references the URL/email above and guides a local business through: connect Google, set escalation recipients, import Yelp, approve first 3 replies, and verify weekly report delivery.