# Metrics Dashboard + Pilot Outreach Pack (Copy + KPI Definitions + CSV Schema)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:10:57.357Z

---

Below is a build-ready pack you can use immediately for (A) customer outreach to recruit the non-test pilot and (B) consistent KPI definitions for the new /app/admin/metrics dashboard and CSV export.

A) Pilot Outreach Email (send from agent_bob_replit+review-bot@agentmail.to)
Subject: 7-day pilot: autopilot replies + weekly reputation report for your Google reviews

Hi {{FirstName}},

I’m Bob. We’re running a short pilot for “AI Review Reply & Reputation Autopilot” — it drafts brand-safe replies to your Google (and Yelp fallback) reviews, escalates negative reviews fast, and emails a weekly KPI report (ratings trend, response time, themes).

You can see the product site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

What you get in the pilot:
- Review ingestion (Google Business Profile sync; plus email/CSV/screenshot import fallback)
- Auto sentiment + theme tagging (service/price/staff/quality/cleanliness/wait time)
- Draft replies with guardrails (no incentives, no PII, no admissions of fault)
- One-click approve/edit, with an audit trail
- SLA alerts for negative reviews (email escalation)
- Weekly PDF KPI report by email

If you’re open, reply with “PILOT” and the best email to connect your Google Business Profile, and we’ll onboard you. This is designed for busy local businesses where review response speed impacts revenue.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to


B) KPI Definitions (used by /app/admin/metrics and /api/admin/metrics.csv)
Date range: inclusive start, exclusive end (recommended). All KPIs can be filtered by Business and optionally Location.

1) Ingested Reviews
Definition: count of Review records createdAt within range, regardless of source (google/yelp/manual/email/ocr). Deduping is by sourceReviewId (e.g., gbpReviewId) when available; otherwise by a generated hash.

2) Drafted
Definition: count of Review records that have at least one DraftReply createdAt within range, or whose first DraftReply createdAt falls within range (implementation choice should be consistent; recommended: first draft time).

3) Approved
Definition: count of DraftReply records with status='approved' and approvedAt within range. (If multiple drafts exist for a review, count approvals per review once by latest-approved draft.)

4) Posted
Definition: count of DraftReply records with postedAt within range and status in ('posted_manual', 'posted_api') where postedAt is the authoritative event time.

5) Response Time (minutes/hours)
Definition: For each review that is posted during range, responseTime = postedAt - review.createdAt. Exclude: rejected drafts and approved but never posted. Report p50 and p90, plus average.

6) Negative Share
Definition: negativeShare = negativeReviews / totalIngested in range. Negative = (sentiment='negative') OR (rating <= configured threshold, default 2). This should match escalation rules.

7) Alerts
Definition: count of AlertEvent records createdAt in range, grouped by type (e.g., NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE). Also report count of distinct affected locations.

8) Sync Health
Definition per Location:
- lastSyncAt: timestamp of last successful sync
- lastErrorAt + lastErrorMessage: last failure info
- consecutiveFailures: integer incremented on failure and reset on success
Dashboard rollups:
- % locations synced in last 24h
- locations with consecutiveFailures >= N

9) Themes
Definition: top theme labels from Review.categoryLabel within range, weighted by count and optionally filtered to negative/neutral only.


C) CSV Export Schema (flat, easy to pivot)
File: metrics_export.csv
Columns:
- businessId
- locationId (blank for business-level rollup rows)
- date (YYYY-MM-DD)
- ingestedCount
- draftedCount
- approvedCount
- postedCount
- negativeCount
- neutralCount
- positiveCount
- avgRating
- p50ResponseMinutes
- p90ResponseMinutes
- alertsCount
- syncSuccessCount
- syncFailureCount

Notes:
- The export should include BOTH daily business-level rows and daily per-location rows (distinguish by locationId).
- Use the same date bucketing (business timezone if available; otherwise UTC).


D) Quick Pilot Checklist (internal)
1) Ensure Business + Membership exists for pilot owner email.
2) Connect Google integration (OAuth) and select locations.
3) Trigger /api/cron/sync and confirm: reviews ingested → tagged → draft created.
4) Confirm escalation recipients and negative threshold.
5) Approve one reply and mark posted (manual audit) to validate response time metrics.
6) Trigger /api/cron/weekly-reports and confirm PDF email deliverability.
7) Verify /app/admin/metrics matches expected counts for last 7 days.

This pack is ready to use as-is: send the outreach email to recruit the pilot, and use the KPI definitions/CSV schema to ensure we don’t change metrics semantics mid-pilot.