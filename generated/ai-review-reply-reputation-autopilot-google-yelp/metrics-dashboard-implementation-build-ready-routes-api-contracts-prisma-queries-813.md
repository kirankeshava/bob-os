# Metrics Dashboard Implementation (Build-Ready): Routes, API Contracts, Prisma Queries, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:39:41.920Z

---

Overview
This artifact documents the implemented metrics dashboard for the Review Reply & Reputation Autopilot MVP. It is designed to be reliable (uses existing DB tables), debuggable (CSV export), and actionable (highlights sync failures and SLA risk). It requires no new paid services.

Primary user
Business owner/admin who needs to confirm: (1) reviews are being ingested, (2) drafts are being created/approved/posted, (3) negative reviews are escalated within SLA, and (4) weekly KPI reports are consistent.

Routes
1) UI Page
- GET /app/admin/metrics
  - Filters: business (implicit from membership), optional locationId, date range (from/to).
  - Sections:
    A. Sync Health
       - Table columns per location: Location name, Integration (Google/manual/Yelp), lastSuccessfulSyncAt, lastAttemptAt, lagMinutes, lastErrorSummary, 24h error count.
       - CTA: “View ingestion diagnostics” (links to CSV export).
    B. Funnel KPIs (selected date range)
       - Reviews ingested
       - Drafts created
       - Approved
       - Posted (manual)
       - Approval rate = approved / draftsCreated
       - Post-through rate = posted / approved
    C. Response-time KPIs
       - Median response time (hours)
       - P90 response time (hours)
       - SLA breaches count (negative reviews not approved within threshold hours)
    D. Alerts
       - Negative alerts count
       - OCR failure alerts count
       - Sync failure alerts count
    E. Themes
       - Top categories from tags (service/price/staff/quality/cleanliness/wait_time/other)
       - Negative themes: same but filtered sentiment=negative

2) Admin APIs
- GET /api/admin/metrics?from=ISO&to=ISO&locationId=optional
  - Returns JSON:
    {
      range: { from, to },
      funnel: { ingested, drafted, approved, postedManual, approvalRate, postThroughRate },
      responseTime: { medianHours, p90Hours, consideredCount },
      sla: { negativeCount, breachedCount, thresholdHours },
      alerts: { negativeAlerts, syncFailureAlerts, ocrFailureAlerts },
      themes: { top: [{category,count}], negativeTop: [{category,count}] },
      timeSeries: [{ date: YYYY-MM-DD, ingested, drafted, approved, postedManual, negativeCount, avgRating }],
      syncHealth: [{ locationId, locationName, source, lastSuccessfulSyncAt, lastAttemptAt, lagMinutes, lastErrorSummary, errors24h }]
    }

- GET /api/admin/metrics.csv?from=ISO&to=ISO&locationId=optional
  - Exports:
    - daily timeSeries rows
    - plus a second section for syncHealth (or separate file depending on implementation)

RBAC and validation
- RBAC: requester must be a member of the Business (UserBusinessMembership).
- Query validation: zod schema for from/to (ISO), ensure from <= to, and clamp max range (e.g., 180 days) to protect DB.

KPI definitions (consistency rules)
1) Ingested reviews
- Count Review where createdAt in [from,to] AND businessId matches AND (optional locationId filter).
- Note: createdAt here refers to DB record creation time; also store reviewCreatedAt from the platform. For time series “ingested,” use DB createdAt so the funnel matches system activity.

2) Drafted
- Count DraftReply createdAt in [from,to].
- DraftReply links to Review.

3) Approved
- Count DraftReply where status transitioned to APPROVED in range.
- Prefer: AuditLog event (action=APPROVE_DRAFT) timestamp for accuracy.

4) Posted (manual)
- Count DraftReply where status == POSTED_MANUAL and postedAt in range.
- Response time calculations use postedAt - Review.reviewCreatedAt.

5) Response time exclusions
- Exclude DraftReply that are REJECTED or never posted.
- Exclude reviews with missing reviewCreatedAt (fallback to Review.createdAt but mark as estimated in CSV if needed).

6) SLA breaches
- Negative review definition: (sentiment=negative OR rating<=2).
- Breach definition: negative review where first approval timestamp is null OR approvalTime - reviewCreatedAt > thresholdHours.
- Threshold comes from Location or Business escalation rule (default 4 hours).

Data sources and Prisma aggregation approach
- Review: rating, sentiment, categories (array), reviewCreatedAt, createdAt, locationId, source.
- DraftReply: status, createdAt, approvedAt (optional), postedAt (optional), reviewId.
- AuditLog: records transitions like APPROVE_DRAFT, POST_MANUAL, SYNC_ERROR.
- AlertEvent: type (NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE), createdAt.

Prisma query sketch (conceptual)
- Funnel counts:
  - ingested = prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to }}})
  - drafted = prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to }}})
  - approved = prisma.auditLog.count({ where: { businessId, action: 'APPROVE_DRAFT', createdAt: { gte: from, lte: to }, locationId? }})
  - postedManual = prisma.draftReply.count({ where: { businessId, status: 'POSTED_MANUAL', postedAt: { gte: from, lte: to }, locationId? }})

- Response time distribution:
  - Fetch posted drafts with included reviewCreatedAt and compute durations server-side for median/p90 (fast enough for MVP; optimize later with SQL percentile).

- Themes:
  - For selected range: fetch reviews with categories array and aggregate counts in Node.

- Sync health:
  - Read Location.lastSuccessfulGbpSyncAt (or equivalent), Location.lastSyncAttemptAt, Location.lastError.
  - errors24h from AuditLog where action in ['GOOGLE_SYNC_ERROR','INGEST_ERROR'] and createdAt>=now-24h.

UI copy (ready to paste)
Header: Metrics
Subheader: Monitor review ingestion, draft throughput, response times, and sync health. Use CSV export to reconcile numbers.

Sync Health helper text:
“If lag is high or errors repeat, ingestion may be failing. Click CSV export and share diagnostics with support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 or email agent_bob_replit+review-bot@agentmail.to.”

Funnel definitions tooltip text:
- Ingested: Reviews received by the system during the selected period.
- Drafted: AI replies generated.
- Approved: Approved by a human.
- Posted: Marked as posted (manual) with an audit trail.

CSV columns (timeSeries)
date,locationId,locationName,ingested,drafted,approved,posted_manual,negative_count,avg_rating

Operational notes
- If API sync is disabled, ingestion may be manual/email/OCR. The dashboard still works because it uses Review/DraftReply/AuditLog universally.
- For reliability, clamp date ranges and paginate heavy lists; the dashboard should show aggregates first, then allow drill-down via existing /app/reviews filters.

Next improvements
- Detect reply mismatches for GBP (reply exists but differs from approved draft/manual record) and surface as an alert.
- Add “Copy diagnostics” for quick support sharing.
- Add cohort view: first week after onboarding vs current week.
