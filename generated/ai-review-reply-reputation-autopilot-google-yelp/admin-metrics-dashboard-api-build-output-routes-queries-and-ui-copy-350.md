# Admin Metrics Dashboard + API (Build Output): Routes, Queries, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:20:39.481Z

---

Below is the build-ready implementation content for the Metrics Dashboard and APIs.

ROUTES
1) /app/admin/metrics
Purpose: Give operators/business owners immediate visibility into (a) integration sync health, (b) the review-handling funnel, and (c) alerting/escalations.
UI sections:
A. Filters
- Date range: startDate, endDate (default last 14 days)
- Location selector: All locations or a single locationId
- Buttons: Refresh, Export CSV

B. Sync Health (per location)
Table columns:
- Location name
- Source: Google / Yelp / Manual
- Sync enabled (boolean)
- Last sync at
- Last review watermark (Location.lastGbpReviewSyncUpdateTime)
- Last error (Integration.lastError or last AlertEvent message)
- Consecutive failures (derived from AlertEvents of type=integration_sync_failed in last 24h)

C. Activation Funnel KPIs (selected date range)
Cards:
- Reviews ingested
- Drafts generated
- Drafts approved
- Drafts posted (manual)
- Approval rate = approved/drafted
- Post rate = posted/approved
- Median response time (hours) from Review.createdAt → DraftReply.postedAt (exclude rejected/unposted)
- P90 response time (hours)

D. Alerts & Incidents
- Negative review alerts sent (count)
- OCR failures (count)
- Integration sync failures (count)
- Top alert recipients (by email)

E. “Copy support summary” (for email)
A read-only textarea that compiles:
- Business name
- Date range
- Ingested/drafted/approved/posted counts
- Median response time
- Last sync per location + last error
- Link to app and support email

APIs
2) GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
AuthZ: user must be member of the Business; if multiple businesses supported, require activeBusinessId context.
Validation:
- Ensure end >= start
- Ensure range <= 90 days
- If locationId present, ensure it belongs to business
Return shape (example):
{
  "range": {"start":"2026-03-26","end":"2026-04-09"},
  "funnel": {"ingested": 124, "drafted": 118, "approved": 92, "posted": 70, "approvalRate": 0.78, "postRate": 0.76},
  "responseTimeHours": {"median": 9.4, "p90": 27.1},
  "sentiment": {"negativeShare": 0.14, "avgRating": 4.36},
  "topThemes": [{"label":"staff","count":31},{"label":"wait_time","count":18},{"label":"price","count":12}],
  "syncHealth": [{"locationId":"...","name":"Downtown","source":"google","enabled":true,"lastSyncAt":"...","lastError":null,"watermark":"...","failures24h":0}],
  "alerts": {"negative": 6, "ocrFailures": 2, "syncFailures": 1, "topRecipients": [{"email":"owner@biz.com","count":5}]}
}

Core Prisma query logic (definitions):
- ingested = Review.createdAt in range (and location filter)
- drafted = DraftReply.createdAt in range AND status in {draft, approved, rejected, posted_manual}
- approved = DraftReply.approvedAt in range AND status in {approved, posted_manual}
- posted = DraftReply.postedAt in range AND status = posted_manual
- response time = postedAt - Review.createdAt for posted_manual only
- negativeShare = count(reviews where sentiment=negative OR rating<=2) / total reviews in range
- topThemes = count of Review.categoryLabels (stored array) across reviews in range
- sync failures 24h = AlertEvent where type='integration_sync_failed' and createdAt>=now-24h

3) GET /api/admin/metrics.csv?start=...&end=...&locationId=...
AuthZ: same as metrics.
CSV output (daily granularity):
Columns:
- date
- location (or ALL)
- ingested_reviews
- drafted_replies
- approved_replies
- posted_replies
- median_response_hours
- p90_response_hours
- negative_reviews
- avg_rating
- alerts_negative
- alerts_sync_failures
- alerts_ocr_failures

UI COPY (for legitimacy + support)
Header blurb:
“Track your reputation workflow end-to-end: review ingestion → AI drafts → approval → posting. If anything looks off, export CSV or email support with the summary below.”

Support footer text (must reference business assets):
“Need help? Email agent_bob_replit+review-bot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1”

OPERATOR EMAIL TEMPLATE (for pilot onboarding)
Subject: Set up review reply autopilot for your Google reviews (10 min)
Body:
Hi {{FirstName}},

I’m Bob. We built a lightweight Review Reply & Reputation Autopilot that:
- pulls in new Google reviews,
- drafts brand-safe replies for approval,
- alerts you fast on negative reviews,
- and emails a weekly KPI report (rating trend, response times, themes).

If you want to pilot it, reply here and I’ll send a connect link for your Google Business Profile (you can choose which locations to enable).

Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
Support/contact: agent_bob_replit+review-bot@agentmail.to

— Bob

This artifact is intended to be pasted directly into the codebase as route/API structure and UI copy, using the existing Prisma models (Review, DraftReply, AlertEvent, Location, Integration) and the already-shipped RBAC membership checks.