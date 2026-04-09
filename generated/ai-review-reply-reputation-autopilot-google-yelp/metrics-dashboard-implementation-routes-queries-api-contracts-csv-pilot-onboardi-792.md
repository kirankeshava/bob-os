# Metrics Dashboard Implementation (Routes, Queries, API Contracts, CSV) + Pilot Onboarding Comms

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:29:03.155Z

---

Below is the build-ready implementation content for the Metrics Dashboard plus the pilot onboarding comms to get a real business live quickly.

1) ROUTES + PAGES

A) /app/admin/metrics
Purpose: single pane for operators/owners to verify the system is working: review ingestion volume, drafting/approval throughput, response time, negative share, and sync health.
UI sections:
- Filters bar: Date range (start/end), Location dropdown (All + enabled locations), Source dropdown (All/Google/Yelp/Manual), Sentiment dropdown (All/pos/neu/neg).
- Sync Health table (per location): location name, enabled, lastSyncAt, lastError, consecutiveFailures, lastFetchedReviewUpdateTime watermark.
- Funnel tiles: Ingested, Drafted, Approved, Posted (manual/API), Conversion rates.
- Response Time: median (p50) and p90 from review.createdAt -> postedAt; exclude rejected/unposted.
- Trend chart: daily counts + daily negative share.
- Alerts: count by type (sync_failure, negative_sla, ocr_failure) + most recent 10.
- Buttons: “Download CSV”, “Open Weekly Reports”.

RBAC: only users in UserBusinessMembership can access. Business scoped by membership.

2) API CONTRACT

A) GET /api/admin/metrics
Query params:
- businessId (optional if single-business membership; otherwise required)
- start (ISO date)
- end (ISO date)
- locationId (optional)
- source (optional: google|yelp|manual)

Response JSON:
{
  "range": {"start": "...", "end": "..."},
  "funnel": {"ingested": 0, "drafted": 0, "approved": 0, "posted": 0, "postedManual": 0, "postedApi": 0},
  "responseTime": {"p50Hours": 0, "p90Hours": 0, "avgHours": 0},
  "sentiment": {"positive": 0, "neutral": 0, "negative": 0, "negativeShare": 0},
  "trends": [{"date": "YYYY-MM-DD", "ingested": 0, "negative": 0, "avgRating": 0}],
  "syncHealth": [{"locationId": "...", "locationName": "...", "enabled": true, "lastSyncAt": "...", "lastError": "...", "consecutiveFailures": 0, "watermark": "..."}],
  "alerts": {"total": 0, "byType": {"sync_failure": 0, "negative_sla": 0, "ocr_failure": 0}, "recent": [{"id":"...","type":"...","createdAt":"...","summary":"..."}]},
  "weeklyReports": {"sent": 0, "lastSentAt": "..."}
}

Validation: zod on query; clamp max range to 180 days (or paginate trends) to avoid heavy scans.

B) GET /api/admin/metrics.csv
Same query params. Returns CSV with two sections:
- KPI summary (single row)
- Daily rows (date, ingested, drafted, approved, posted, negative, avgRating)
Plus optional “events” export mode for debugging: include AuditLog rows related to approvals/posts.

3) QUERY DEFINITIONS (CONSISTENT KPI RULES)

A) Ingested: Review.createdAt within range and matches filters.
B) Drafted: DraftReply.createdAt within range AND DraftReply.reviewId matches filtered reviews OR if you want pure workflow within range, use DraftReply.createdAt regardless of review date; pick one and keep consistent. For MVP, compute drafted by DraftReply.createdAt.
C) Approved: DraftReply.status in ('approved','posted_manual','posted_api') AND approvedAt within range.
D) Posted: DraftReply.status in ('posted_manual','posted_api') AND postedAt within range.
E) Response time: for posted replies only. responseHours = (postedAt - Review.createdAt). Exclude rejected/unposted.
F) Negative share: count of reviews with sentiment='negative' / total reviews in range.
G) Avg rating: average Review.rating per day; ignore null ratings.
H) Sync health: Location.lastGbpSyncAt, lastGbpSyncError, gbpConsecutiveFailures, lastGbpReviewSyncUpdateTime.

4) PILOT ONBOARDING EMAIL (CUSTOMER-FACING)

Subject: Get your Review Reply & Reputation Autopilot live (Google/Yelp)

Hi {{FirstName}},

I’m Bob — I set up your AI Review Reply & Reputation Autopilot.

You can access the web app here (legitimacy link):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

To start pulling in reviews and drafting replies:

1) Connect Google Business Profile
- Log in and go to Integrations → Google → Connect
- Choose the locations you want to enable

2) Configure escalation alerts (for negative reviews)
- Add the emails that should be notified immediately (owner/manager)
- Choose what counts as “negative” (e.g., rating ≤2 or sentiment=negative)

3) Set your reply style
- Pick tone (friendly/professional), signature, and any “do not say” constraints

4) Approve replies
- New reviews appear in the Review Queue with a drafted reply
- One click Approve (or edit then Approve)

5) Post replies
- If API posting isn’t available for a channel, we provide a copy/paste flow with an audit trail so nothing is missed

If you’d like, you can also forward review notification emails to this address for ingestion:
agent_bob_replit+review-bot@agentmail.to

Reply to this email with:
- Your preferred weekly report recipient list
- Your business hours / SLA expectations for negative reviews

Thanks,
Bob

5) SECOND PILOT CHECKLIST (INTERNAL)

- Confirm customer has GBP owner/manager role.
- Connect Google integration; enable 1-3 locations.
- Run manual sync once; confirm reviews ingest and drafts created.
- Validate guardrail blocks: try an edge-case review with phone/email; ensure approval is blocked or redacted.
- Configure escalation recipients; trigger a test negative review path (or temporarily set threshold rating<=5 and revert).
- Confirm weekly report cron schedule + timezone; send a test report.
- Confirm metrics dashboard shows data and CSV downloads.

This artifact can be pasted directly into the repo as documentation for the metrics dashboard and reused for onboarding/pilot communications.