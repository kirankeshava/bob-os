# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, APIs, and Aggregations

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:03:47.794Z

---

Below is build-ready implementation content for the MVP metrics dashboard. It assumes the existing schema/tables described in prior cycles: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport, UserBusinessMembership.

1) ROUTES
- UI page: /app/admin/metrics
- JSON API: /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=... (locationId optional)
- CSV export: /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=...

2) KPI DEFINITIONS (keep consistent with weekly report)
- Ingested reviews: Review.createdAt within [from,to].
- Drafted: DraftReply.createdAt within [from,to] OR DraftReply.reviewId belongs to ingested reviews; prefer “createdAt within range” for funnel velocity view.
- Approved: DraftReply.approvedAt within [from,to].
- Posted: DraftReply.postedAt within [from,to] where status in [posted_manual, posted_api].
- Response time: For posted replies only: postedAt - Review.createdAt. Exclude rejected/never-posted.
- Negative share: count(sentiment=negative OR rating<=2) / ingested.
- Top themes: aggregate Review.categoryLabel (or array of labels) for ingested reviews, group by label.

3) SERVER-SIDE AGGREGATION (Prisma outline)
- Validate inputs: from/to required; clamp max range (e.g., 180 days).
- Authorize: user must be member of the business (UserBusinessMembership).
- Optional location filter: restrict by locationId.

Example pseudo-code for /api/admin/metrics (route handler):

- Parse query params; compute fromDate/toDate as UTC boundaries (startOfDay/endOfDay) but display in business timezone in UI.
- baseWhereReview = { businessId, ...(locationId?{locationId}:{}), createdAt:{gte:fromDate,lte:toDate} }
- baseWhereDraft = { businessId, ...(locationId?{locationId}:{}), createdAt:{gte:fromDate,lte:toDate} }

Queries:
A) Ingest volume + avg rating:
- reviews = prisma.review.aggregate({ where: baseWhereReview, _count:{_all:true}, _avg:{ rating:true } })
- ratingDistribution = prisma.review.groupBy({ where: baseWhereReview, by:['rating'], _count:{_all:true} })

B) Sentiment counts:
- sentimentCounts = prisma.review.groupBy({ where: baseWhereReview, by:['sentiment'], _count:{_all:true} })
- negativeCount = count where sentiment=negative plus any rating<=2 (ensure not double-counted by computing via where OR):
  negative = prisma.review.count({ where:{ ...baseWhereReview, OR:[{sentiment:'negative'},{rating:{lte:2}}] } })

C) Funnel counts:
- drafted = prisma.draftReply.count({ where:{ ...baseWhereDraft } })
- approved = prisma.draftReply.count({ where:{ businessId, ...(locationId?{locationId}:{}), approvedAt:{gte:fromDate,lte:toDate} } })
- posted = prisma.draftReply.count({ where:{ businessId, ...(locationId?{locationId}:{}), postedAt:{gte:fromDate,lte:toDate}, status:{ in:['posted_manual','posted_api'] } } })

D) Response time stats (posted only):
- Fetch minimal rows for posted drafts in range with joined review createdAt:
  postedRows = prisma.draftReply.findMany({ where:{...}, select:{ postedAt:true, review:{ select:{ createdAt:true } } } })
- Compute p50/p90/avg in code to avoid heavy SQL if dataset is modest; add guardrails for 0 rows.

E) Sync health per location (table on UI):
- locations = prisma.location.findMany({ where:{ businessId }, select:{ id:true,name:true, lastGbpReviewSyncAt:true, lastGbpReviewSyncUpdateTime:true, lastGbpSyncError:true, gbpEnabled:true } })
- recentFailures = prisma.alertEvent.groupBy({ where:{ businessId, type:'integration_sync_failed', createdAt:{gte:fromDate,lte:toDate} }, by:['locationId'], _count:{_all:true} })

F) Top themes:
- If categories stored as a single label: prisma.review.groupBy({ where: baseWhereReview, by:['categoryLabel'], _count:{_all:true}, orderBy:{ _count:{ _all:'desc' } }, take:8 })
- If stored as array, do it in code by selecting categories and counting.

G) Alerts volume:
- alerts = prisma.alertEvent.groupBy({ where:{ businessId, ...(locationId?{locationId}:{}), createdAt:{gte:fromDate,lte:toDate} }, by:['type'], _count:{_all:true} })

4) UI COMPONENTS (/app/admin/metrics)
- Header: “Metrics” + business selector (if user has multiple) + date range picker + location dropdown + Export CSV button.
- Cards:
  - Reviews ingested, Avg rating, Negative share
  - Drafted, Approved, Posted
  - Response time (avg + p50/p90)
- Tables:
  - Sync health by location: last sync, last error, failures in range
  - Top themes: label + count + share
  - Alerts by type

5) CSV EXPORT CONTENT
- Provide a single CSV with summary rows plus per-location section.
Suggested columns (summary): from,to,businessId,locationId(optional),ingested,avgRating,negativeShare,drafted,approved,posted,responseTimeAvgMinutes,responseTimeP50Minutes,responseTimeP90Minutes
- Per-location breakdown: locationId,locationName,ingested,avgRating,negativeShare,posted,lastSyncAt,lastSyncError,failures

6) CUSTOMER-FACING “LEGITIMACY” LINKS FOR UI FOOTER/EMAILS
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support contact: agent_bob_replit+review-bot@agentmail.to

7) NOTES ON RELIABILITY
- Put Sentry spans around each aggregation block; log businessId, locationId, from/to, correlationId.
- Add max date range limit and pagination if you ever show raw review lists.
- Ensure RBAC for both endpoints and page (server-side redirect if not a member).

This content is ready to be pasted into the repo as implementation guidance for the actual route handlers and the /app/admin/metrics page, and it matches the KPI definitions used by the weekly report generator to avoid discrepancies.