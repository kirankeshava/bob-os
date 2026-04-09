# Metrics Dashboard Implementation (Next.js + Prisma) — Build Artifact (Routes, APIs, Queries, CSV)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:18:09.381Z

---

Below is a build-ready implementation artifact describing the exact routes, API contracts, Prisma queries, and UI structure to ship the MVP metrics dashboard for the AI Review Reply & Reputation Autopilot.

1) ROUTES / PAGES
A) Page: /app/admin/metrics
- Access: Business members only (UserBusinessMembership).
- Inputs:
  - dateFrom (default: now-30d)
  - dateTo (default: now)
  - locationId (optional, default: all enabled locations)
- Sections:
  1) Sync Health
     - Table columns: Location, Integration, Enabled, Last Sync At, Last Error, Last Review Watermark, Reviews Synced (range).
  2) Activation Funnel (for selected range)
     - Ingested reviews count
     - Drafted count (reviews with >=1 DraftReply)
     - Approved count (DraftReply.status='approved')
     - Posted count (DraftReply.status in ['posted_manual','posted_api'])
     - Rates: drafted/ingested, approved/drafted, posted/approved
     - Response time:
       - avgResponseHours: mean(postedAt - review.createdAt)
       - p50ResponseHours, p90ResponseHours computed from posted items in range
       - Exclude rejected/unposted from response-time stats
  3) Alerts
     - Total alerts, negative-review alerts, sync-failure alerts, OCR-failure alerts
     - Top recipients (optional; from AlertEvent.to)

B) API: GET /api/admin/metrics
- Query params: businessId, dateFrom, dateTo, locationId?
- Returns JSON:
  {
    range: { dateFrom, dateTo },
    scope: { businessId, locationId?: string },
    syncHealth: Array<{ locationId, locationName, enabled, integrationType, lastSyncAt, lastError, lastWatermark }>,
    volume: { totalReviews, avgRating, negativeShare, sentimentBreakdown },
    funnel: { ingested, drafted, approved, posted, rates: { draftedRate, approvedRate, postedRate } },
    responseTime: { avgHours, p50Hours, p90Hours, n },
    themes: Array<{ label: string, count: number }>,
    alerts: { total, byType: Array<{ type, count }> }
  }

C) API: GET /api/admin/metrics.csv
- Same query params.
- Returns text/csv with sections separated by blank lines:
  - “SYNC HEALTH” header then rows
  - “FUNNEL” header then key/value rows
  - “RESPONSE TIME” header then key/value rows
  - “ALERTS” header then rows
  - “TOP THEMES” header then rows

2) RBAC / VALIDATION
- Use the existing auth session.
- Validate:
  - businessId is required
  - dateFrom/dateTo are ISO strings, dateFrom <= dateTo, max range 365d (guardrail)
  - locationId if present must belong to business
- Enforce membership:
  - UserBusinessMembership where userId=session.user.id and businessId matches

3) PRISMA AGGREGATIONS (DEFINITIONS)
Assumptions: Tables exist: Review, DraftReply, Location, Integration, AlertEvent.
Core definitions:
- Ingested: Review.createdAt within [dateFrom, dateTo].
- Drafted: distinct Review ids where exists DraftReply createdAt within range OR linked to reviews in range (choose stable approach below).
Recommended stable approach for funnel in range:
- Base set = reviews created in range (ingested).
- drafted = count of those reviews with at least one DraftReply (any time).
- approved = count of those reviews with at least one DraftReply.status='approved' (any time).
- posted = count of those reviews with at least one DraftReply.status in posted statuses (any time).
Reason: funnel is about what happened to reviews ingested in that period.
Response time stats:
- Consider the first posted DraftReply for each base review.
- responseHours = postedAt - review.createdAt.

Pseudo-queries (Prisma):
A) Base reviews
- where: { businessId, locationId?, createdAt: { gte: dateFrom, lte: dateTo } }
- select: { id, rating, sentiment, categoryLabels, createdAt }

B) Draft/Approved/Posted counts
- Fetch reviewIds = baseReviews.map(r=>r.id)
- Query DraftReply grouped by reviewId:
  - where: { reviewId: { in: reviewIds } }
  - select: { reviewId, status, createdAt, postedAt }
- Compute in code:
  - draftedSet add reviewId
  - approvedSet if any status==='approved'
  - postedSet if any status in posted statuses

C) Response-time stats
- For each reviewId:
  - find earliest postedAt among DraftReply where status in posted statuses and postedAt not null
  - hours = (postedAt - review.createdAt)/3600000
- Compute avg, p50, p90 by sorting.

D) Volume + sentiment share
- totalReviews = baseReviews.length
- avgRating = mean(r.rating)
- sentimentBreakdown counts from Review.sentiment
- negativeShare = negative/total

E) Top themes
- If stored as Review.categoryLabels string[]:
  - Count occurrences across baseReviews
  - Return top N (e.g., 8)

F) Alerts
- where: { businessId, locationId?, createdAt: { gte: dateFrom, lte: dateTo } }
- groupBy type counts

4) UI IMPLEMENTATION NOTES (NO NEW DEPS)
- Keep MVP light: render tables and simple inline bars.
- Example layout:
  - Filter bar at top (date range + location select + Export CSV button).
  - Cards row for totals (Total Reviews, Avg Rating, Negative Share, Avg Response Hours).
  - Tables below for Sync Health and Alerts.
- Export CSV button hits /api/admin/metrics.csv with current filters.

5) INSTRUMENTATION
- Add structured log events:
  - metrics.query.start { businessId, locationId, dateFrom, dateTo, correlationId }
  - metrics.query.success { ms, totals }
  - metrics.query.error { errorName, message }
- Sentry:
  - captureException on failures with tags: feature=metrics, businessId

6) CUSTOMER-FACING ONBOARDING EMAIL TEMPLATE (for pilot)
Subject: Set up your review reply autopilot (Google/Yelp) in 10 minutes

Hi {FirstName},

I’m Bob — I’m setting up your AI Review Reply & Reputation Autopilot. It drafts brand-safe responses to your Google/Yelp reviews, escalates negative reviews fast, and emails you a weekly KPI report.

To get started, please:
1) Connect your Google Business Profile: {ConnectLink}
2) Choose which locations to sync
3) Add the emails that should receive escalation alerts (owner/manager)

You can see the app here (live MVP): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

If you want, forward any Yelp review notification emails to agent_bob_replit+review-bot@agentmail.to and we’ll ingest them automatically, or you can upload a screenshot/CSV inside the app.

Reply to this email with:
- The best escalation recipient(s)
- Your preferred reply tone (friendly/professional/brief)
- Any banned phrases or compliance constraints

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

This artifact can be pasted directly into the repo as an implementation guide; the APIs/pages described are aligned with the existing Review/DraftReply/AlertEvent/AuditLog schema and avoids any paid dependencies. The outreach template references the provided website URL and contact email for legitimacy.