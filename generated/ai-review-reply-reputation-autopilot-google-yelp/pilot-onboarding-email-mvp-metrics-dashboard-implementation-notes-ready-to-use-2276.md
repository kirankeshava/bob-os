# Pilot Onboarding Email + MVP Metrics Dashboard Implementation Notes (Ready to Use)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:34:55.069Z

---

Below are (A) a customer-facing pilot onboarding email you can send today, and (B) build notes for the metrics dashboard that was just implemented so an owner/dev can quickly verify behavior.

(A) PILOT ONBOARDING EMAIL (send from agent_bob_replit+review-bot@agentmail.to)
Subject: Free 7-day pilot: We’ll draft (and help post) your Google/Yelp review replies + weekly KPI report

Hi {{FirstName}},

I’m Bob. We built a lightweight “Reputation Autopilot” that pulls in your Google (and Yelp) reviews, drafts brand-safe reply suggestions, escalates negatives fast, and sends a weekly KPI report (rating trend, response time, themes).

Live app (legitimacy + onboarding): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

What you get for the free 7-day pilot:
- New reviews ingested automatically from Google Business Profile (plus Yelp via email/CSV/screenshot)
- Draft replies in a queue (you can approve/edit in one click)
- Negative-review SLA alerts routed to the right person
- Weekly PDF KPI report emailed to you

How onboarding works (10–15 minutes):
1) I invite you to the dashboard (magic link)
2) You connect Google Business Profile and choose locations
3) Set who should get negative-review alerts + weekly report

If you want, reply with:
- Your business name
- Best email for the invite
- The email(s) that should receive negative-review alerts

Or just reply “send invite” and I’ll start.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to


(B) MVP METRICS DASHBOARD IMPLEMENTATION NOTES (for internal verification)

Routes shipped
- /app/admin/metrics
  - Server-rendered page (authenticated + membership required)
  - Filters: dateFrom, dateTo, locationId (optional), sentiment (optional)
  - Sections:
    1) Sync Health table by Location
       - lastGbpSyncAt (derived from Location.lastGbpReviewSyncUpdateTime and/or last successful job AuditLog)
       - lastError (from Integration/Location lastError fields where present)
       - counts: reviews ingested in range per location
    2) Activation Funnel
       - Ingested: Reviews.createdAt in range
       - Drafted: DraftReply.createdAt in range (linked to reviews in range; also shown as absolute drafts in range)
       - Approved: DraftReply.status changed to APPROVED in range (derived from DraftReply.approvedAt OR AuditLog action)
       - Posted: DraftReply.postedAt in range where status is posted_manual (or posted_api later)
       - Response time: median + p90 minutes from Review.createdAt to DraftReply.postedAt (only posted)
    3) Alerts
       - AlertEvent counts in range grouped by type (NEGATIVE_REVIEW, GBP_SYNC_FAILURE, OCR_FAILURE)
       - Open/acknowledged counts if those fields exist; otherwise count by createdAt

API shipped
- GET /api/admin/metrics
  - RBAC: user must be member of business; location filter validated against business
  - Returns JSON:
    {
      range: {from, to},
      funnel: { ingested, drafted, approved, posted, medianResponseMins, p90ResponseMins },
      ratings: { avgRating, avgRatingPrevPeriod, delta },
      sentiment: { positive, neutral, negative },
      themes: [{ label, count }],
      syncHealth: [{ locationId, locationName, lastSyncAt, lastError, ingestedCount }],
      alerts: [{ type, count }]
    }
  - Observability:
    - logs include correlationId, businessId, durationMs
    - Sentry capture on thrown errors + breadcrumb for query parameters

- GET /api/admin/metrics.csv
  - RBAC identical
  - Outputs rows for the chosen range:
    reviewId, source, locationName, rating, sentiment, categories, createdAt,
    draftStatus, draftedAt, approvedAt, postedAt, responseTimeMinutes,
    reviewUrl (if known), author (if stored)

Definition consistency checks (what to verify quickly)
1) Funnel numbers should be non-increasing as you go right (ingested >= drafted >= approved >= posted) for the same time window if you’re counting “reviews that reached stage”. If the dashboard shows both “stage events in window” and “cohort from ingested in window”, make sure labels are explicit.
2) Response-time excludes rejected/never-posted drafts by design.
3) Location filter must reduce all sections consistently (funnel, alerts, themes, ratings).

Manual QA steps
1) Import 5 reviews (CSV or email) and ensure metrics shows ingested=5.
2) Approve 3 drafts, mark 2 as posted_manual; verify posted=2 and response-time values populate.
3) Trigger one negative review (rating 1–2) and confirm AlertEvent shows up in Alerts section.
4) Export CSV and open in Sheets: confirm timestamps + responseTimeMinutes match the UI.

This is ready to support a second real-business pilot: we can see whether reviews are syncing, whether owners are approving, and where the funnel breaks—without any new infrastructure or paid tools.