# Metrics Dashboard MVP — Implementation (Next.js + Prisma) Build Artifact

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:45:30.981Z

---

Below is a build-ready implementation artifact for the Metrics Dashboard MVP, aligned to the current schema (Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog) and the existing Next.js App Router stack.

1) ROUTES
- UI: /app/admin/metrics
- JSON API: /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
- CSV API: /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=optional

2) RBAC
Both API routes must enforce: requester is a member of the requested business (UserBusinessMembership). Reject with 403 if not.

3) KPI DEFINITIONS (consistent + debuggable)
Date filter: Review.createdAt between [start, end] inclusive (use start at 00:00:00 and end at 23:59:59 in business timezone; store/compute in UTC but convert boundaries).

Funnel counts:
- ingested: count(Review) in range
- drafted: count(Review where exists DraftReply created in range OR DraftReply.reviewId in reviews in range). Prefer tying to reviews-in-range so funnel stays aligned.
- approved: count(DraftReply where status='approved' AND review.createdAt in range)
- posted: count(DraftReply where status in ('posted_manual','posted_api') AND postedAt within range OR review.createdAt in range). For operational funnel, use postedAt within range; for cohort funnel, use review.createdAt in range. MVP uses cohort (review.createdAt).

Ratings:
- avgRating: avg(Review.rating) in range
- negativeShare: reviews with (rating<=2 OR sentiment='negative') / total

Response times:
- responseTimeP50/P90: for reviews that have a posted draft, compute (DraftReply.postedAt - Review.createdAt) in minutes; exclude rejected drafts and approved-but-not-posted.

Alerts:
- negativeAlerts: count(AlertEvent where type in ('negative_review','sync_failure','ocr_failure') in range)
- openAlerts: count(AlertEvent where resolvedAt is null)

Top themes:
- from Review.categoryLabels array (or stored tags), group and count.

4) PRISMA AGGREGATION UTILITIES (server-only)
Create lib/metrics.ts with functions:
- getMetrics({ businessId, start, end, locationId? }) => { syncHealth, funnel, ratings, responseTimes, alerts, themes }
- getCsvRows(metrics) => string[][]
Implementation notes:
- Use Prisma.review.findMany with select { id, rating, sentiment, categoryLabels, createdAt, locationId }
- Use Prisma.draftReply.findMany where reviewId in reviewIds, select { status, postedAt, createdAt }
- Compute response times in JS to avoid DB-specific interval math; keep it reliable.

5) API HANDLERS
- /api/admin/metrics (GET): validate query params (businessId required, start/end optional default last 7 days). Return JSON.
- /api/admin/metrics.csv (GET): call getMetrics then serialize CSV with headers and Content-Disposition.

6) UI PAGE (/app/admin/metrics)
Server component that:
- Loads current user + membership
- Renders filters: date range inputs + location dropdown
- Fetches metrics via server action or direct function call (preferred: call lib/metrics.ts directly to avoid extra network)
- Displays sections:
  a) Sync Health: table of Locations with lastSyncAt, lastError, reviewCount7d
  b) Funnel: ingested, drafted, approved, posted + conversion rates
  c) Ratings: avg rating, negative share, volume trend (simple sparkline from daily buckets)
  d) Response time: p50, p90, % responded under 24h
  e) Alerts: counts + last 10 alerts
  f) Themes: top categories with counts
- Add “Export CSV” button linking to /api/admin/metrics.csv with the same query params.

7) INSTRUMENTATION
Log correlationId per metrics request (not per review). If aggregation fails, capture Sentry exception with businessId and date window.

8) DONE CRITERIA
- Metrics reflect newly ingested reviews and status changes (approve/post) within one refresh.
- CSV export opens cleanly in Google Sheets.
- RBAC verified by attempting cross-business access (403).

Optional (next): add a “Send weekly report now” button that triggers the existing report generator for the selected business and emails agent_bob_replit+review-bot@agentmail.to for verification.
