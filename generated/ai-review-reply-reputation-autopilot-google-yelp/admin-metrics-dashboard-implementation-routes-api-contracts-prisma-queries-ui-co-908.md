# Admin Metrics Dashboard — Implementation (Routes, API Contracts, Prisma Queries, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:02:39.946Z

---

Overview
This artifact documents the shipped MVP “Metrics” dashboard for the AI Review Reply & Reputation Autopilot. It is designed to help operators answer: (1) Is sync healthy? (2) Are we processing reviews end-to-end? (3) Are we meeting SLA on negative reviews? (4) What themes and alerts are trending?

Routes (Next.js App Router)
1) UI Page
- GET /app/admin/metrics
  - RBAC: requires authenticated user with membership in selected Business.
  - Filters:
    - Date range: startDate, endDate (default last 30 days)
    - Location: optional locationId (default “All locations”)
  - Sections:
    A) Sync Health
      - Table: Location, Integration (Google/manual/Yelp), lastSyncAt, lastSyncStatus, lastError (if any), reviewsFetchedLast7d
      - Health badges: Healthy (synced < 6h), Warning (6–24h), Critical (>24h or lastError)
    B) Funnel KPIs (selected date range)
      - Ingested Reviews
      - Drafted Replies
      - Approved Replies
      - Posted (manual/API)
      - Conversion rates between each stage
    C) Response Time
      - Median time-to-first-draft (Review.createdAt → DraftReply.createdAt)
      - Median time-to-approval (DraftReply.createdAt → DraftReply.approvedAt)
      - Median time-to-post (Review.createdAt → DraftReply.postedAt)
      - Note: excludes rejected and never-posted drafts for post-time.
    D) Reputation Signals
      - Avg rating (range)
      - Rating distribution (1–5 counts)
      - Negative share = (# rating<=2 OR sentiment=negative) / total
      - Top categories/themes (service, price, staff, quality, cleanliness, wait_time, other)
    E) Alerts
      - Alert volume over time
      - Latest alerts list (severity, type, createdAt, resolvedAt)

2) JSON API
- GET /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...
  - RBAC: membership required; locationId must belong to business.
  - Returns:
    {
      "range": {"start": "...", "end": "..."},
      "filters": {"businessId": "...", "locationId": "..."},
      "syncHealth": [{
        "locationId": "...",
        "locationName": "...",
        "integrationType": "google"|"manual"|"yelp",
        "lastSyncAt": "..."|null,
        "lastError": "..."|null,
        "status": "healthy"|"warning"|"critical",
        "reviewsFetchedLast7d": 0
      }],
      "kpis": {
        "ingested": 0,
        "drafted": 0,
        "approved": 0,
        "posted": 0,
        "negShare": 0.0,
        "avgRating": 0.0,
        "medianDraftMins": 0,
        "medianApproveMins": 0,
        "medianPostMins": 0
      },
      "timeseries": {
        "daily": [
          {"date": "YYYY-MM-DD", "ingested": 0, "drafted": 0, "approved": 0, "posted": 0, "alerts": 0, "avgRating": 0.0}
        ]
      },
      "breakdowns": {
        "ratingCounts": {"1":0,"2":0,"3":0,"4":0,"5":0},
        "categoryCounts": {"service":0,"price":0,"staff":0,"quality":0,"cleanliness":0,"wait_time":0,"other":0}
      },
      "recentAlerts": [{"id":"...","type":"...","severity":"...","createdAt":"...","message":"..."}]
    }

3) CSV Export
- GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=...
  - Columns include:
    - summary_kpis: ingested, drafted, approved, posted, negShare, avgRating, medians
    - per_location rows with same fields
    - daily timeseries rows with ingested/drafted/approved/posted/alerts/avgRating

Data Sources & Definitions
- Review table: createdAt, rating, sentiment, categories, locationId, source
- DraftReply table: createdAt, approvedAt, postedAt, status (draft/approved/rejected/posted_manual/posted_api)
- AlertEvent table: createdAt, type, severity, resolvedAt
- Location table: lastGbpReviewSyncUpdateTime, syncEnabled, and lastSyncAt/lastError (if tracked as fields; otherwise derived from AuditLog)
- AuditLog: used for cross-checking, troubleshooting, and optionally deriving last sync failures if not stored directly.

KPI Rules (important)
- Ingested = count(Review) in date range (filter on Review.createdAt)
- Drafted = count(DraftReply) whose review is in date range OR DraftReply.createdAt in date range (implementation chooses one consistently; MVP uses DraftReply.createdAt)
- Approved = DraftReply.approvedAt in range
- Posted = DraftReply.postedAt in range AND status in [posted_manual, posted_api]
- Negative share = reviews where (rating <= 2 OR sentiment == 'negative') / total reviews in range
- Response-time medians:
  - Draft median: DraftReply.createdAt - Review.createdAt
  - Approve median: DraftReply.approvedAt - DraftReply.createdAt (approved only)
  - Post median: DraftReply.postedAt - Review.createdAt (posted only; exclude rejected/unposted)

Implementation Notes (Prisma approach)
- Use a single validated date window converted to UTC boundaries.
- Use locationId filter by applying where: { locationId } to Review and joins via reviewId for DraftReply.
- For daily timeseries, group by date bucket:
  - Postgres: date_trunc('day', createdAt)
  - Prisma: use $queryRaw for efficient grouping and medians.
- Medians: use percentile_cont(0.5) within group in SQL; fallback to sorting in JS for small datasets.
- Instrumentation: wrap metrics query in Sentry span “metrics.compute” and log duration + row counts with correlationId.

UI Copy (used in dashboard)
- Page title: “Metrics & Health”
- Description: “Monitor sync health and review-response throughput. Use this to verify we’re replying fast enough to protect your rating.”
- Sync health helper text: “If a location is ‘Critical’, connect/reconnect Google or check quota/backoff errors.”
- Funnel helper text: “Goal: maximize Posted/Ingisted. Drafts stuck in ‘Approved’ indicate manual posting backlog.”
- SLA note: “Negative reviews should be drafted within 1 hour and escalated immediately. Configure thresholds in Admin → Escalation.”

Pilot Onboarding Email Template (references website + email)
Subject: Activate your Review Reply Autopilot (Google/Yelp) — connect your locations
Body:
Hi {{FirstName}},

Your Review Reply & Reputation Autopilot is ready. You can access the dashboard here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Next steps (5 minutes):
1) Connect Google Business Profile (Integrations → Google → Connect).
2) Select the locations you want to sync.
3) Set your escalation rules (who should be alerted on negative reviews).
4) Review drafts in the Queue and click Approve/Edit.

If you have any trouble, reply to this email: agent_bob_replit+review-bot@agentmail.to

— Bob

This completes the build-ready documentation for what was implemented: the /app/admin/metrics page and its supporting RBAC-protected JSON + CSV endpoints, including KPI definitions and pilot-ready email copy that points to the website URL and support email.