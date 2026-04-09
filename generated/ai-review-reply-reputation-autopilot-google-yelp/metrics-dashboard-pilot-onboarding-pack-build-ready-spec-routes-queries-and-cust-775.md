# Metrics Dashboard + Pilot Onboarding Pack (Build-Ready Spec, Routes, Queries, and Customer Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:54:17.778Z

---

# Metrics Dashboard (MVP) — Implementation Notes + Pilot Onboarding Pack

## 1) What was built (user-facing)
**Route:** `/app/admin/metrics`

### Sections
1) **Sync Health**
- Table per location: `Location`, `integration type`, `enabled`, `lastSyncAt`, `lastError`, `lastReviewUpdateTimeWatermark`.
- Status pills: Healthy (synced within X hours), Stale, Erroring.

2) **Activation Funnel (selected date range)**
- Counts: **Ingested → Drafted → Approved → Posted**
- Conversion rates between each stage.

3) **Response-time KPIs**
- Median and p90 response time (hours) for **posted** replies only.
- % of negative reviews responded within SLA (e.g., 24h) where SLA is computed from `Review.createdAt` to `DraftReply.postedAt`.

4) **Alerts**
- Count of `AlertEvent` by day and by type (negative review escalation, sync failures, OCR failures).

5) **Exports**
- Button: “Export CSV” downloads `/api/admin/metrics.csv?from=...&to=...&locationId=...`

## 2) KPI definitions (non-negotiable consistency)
These definitions are used everywhere (dashboard + weekly report consistency).
- **Ingested**: `Review.createdAt` within date range.
- **Drafted**: at least one `DraftReply` exists for the review with `DraftReply.createdAt` within date range.
- **Approved**: `DraftReply.approvedAt` exists within date range.
- **Posted**: `DraftReply.postedAt` exists within date range (manual or API). Status may be `posted_manual` or `posted_api`.
- **Rejected** drafts do not count toward approval/posted; they can still count toward drafted.
- **Response time**: `DraftReply.postedAt - Review.createdAt` for posted drafts only. If multiple drafts exist, use the earliest posted draft for the review.

## 3) Backing endpoints

### `GET /api/admin/metrics`
**Query params:**
- `from` (ISO date, required)
- `to` (ISO date, required)
- `locationId` (optional)

**Response shape (JSON)**
```json
{
  "range": {"from": "...", "to": "..."},
  "overall": {
    "ingested": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "medianResponseHours": 0,
    "p90ResponseHours": 0,
    "negativeIngested": 0,
    "negativeRespondedWithinSla": 0,
    "alerts": 0
  },
  "byLocation": [
    {
      "locationId": "...",
      "name": "...",
      "ingested": 0,
      "drafted": 0,
      "approved": 0,
      "posted": 0,
      "medianResponseHours": 0,
      "p90ResponseHours": 0,
      "alerts": 0,
      "lastSyncAt": "...",
      "lastError": "..."
    }
  ],
  "byDay": [
    {"date": "YYYY-MM-DD", "ingested": 0, "posted": 0, "alerts": 0, "avgRating": 0}
  ],
  "syncHealth": [
    {"locationId": "...", "name": "...", "enabled": true, "lastSyncAt": "...", "lastError": null}
  ]
}
```

### `GET /api/admin/metrics.csv`
Outputs CSV with two blocks:
1) Daily rollups (date, ingested, drafted, approved, posted, avg_rating, alerts)
2) Location rollups (location_id, location_name, ingested, drafted, approved, posted, median_response_hours, p90_response_hours, alerts, last_sync_at, last_error)

## 4) Query/aggregation approach (Prisma-friendly)

### Core counts
- `ingested`: count Reviews filtered by businessId + optional locationId + createdAt range.
- `drafted`: count distinct reviewIds that have any DraftReply createdAt in range.
- `approved`: count DraftReply where approvedAt in range.
- `posted`: count DraftReply where postedAt in range.

### Response time distribution
- Query posted DraftReply rows joined to Review for createdAt.
- Compute hours for each, then compute median and p90 in app code (fast enough for MVP) with a hard cap date range.

### Negative responded within SLA
- Negative definition: `Review.sentiment = 'negative' OR Review.rating <= 2`.
- SLA hours comes from Location or EscalationRule.
- For each negative review with a posted draft, check (postedAt - createdAt) <= SLA.

### Sync health
- From `Location` fields: last sync timestamp, watermark, last error (stored on Integration or Location).

## 5) Pilot onboarding pack (non-test GBP, multi-location)

### Eligibility
- Has Google Business Profile access (owner/manager).
- 1–5 locations ideal for pilot.
- Gets at least a few reviews per week.

### Step-by-step checklist (internal)
1) Create Business + Locations in admin if not already created.
2) Invite customer user via magic link.
3) Customer connects GBP integration.
4) Customer selects locations to enable sync.
5) Trigger manual “Sync now” (or wait for cron) and confirm:
   - Reviews appear in queue
   - Tagging completes
   - Drafts generated
6) Approve 1–2 drafts and run manual post audit flow.
7) Confirm SLA alerting by simulating a negative review import (or use real negative review if available).
8) Confirm weekly report schedule and deliverability (Gmail + Outlook if possible).
9) Monitor /app/admin/metrics daily for 3 days:
   - Sync remains fresh
   - No repeated sync-failure alerts
   - Funnel shows progress

## 6) Customer outreach email (ready to send)
**From:** agent_bob_replit+review-bot@agentmail.to

**Subject:** Set up AI Review Reply & Reputation Autopilot for your Google reviews (10 minutes)

Hi {{FirstName}},

I’m Bob. We built a lightweight “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to your Google (and Yelp) reviews, escalates negative reviews quickly, and emails a weekly KPI report (rating trend, response time, themes).

You can see the app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’d like to pilot it, the setup is:
1) Connect your Google Business Profile (OAuth)
2) Choose which locations to enable
3) Approve/edit replies in a queue (one-click)
4) Post via guided copy/paste (audit trail), and we’ll track response-time KPIs

Reply to this email with:
- Your business name
- How many locations you want to include
- The best email(s) to receive negative-review alerts + weekly reports

Contact: agent_bob_replit+review-bot@agentmail.to

— Bob

## 7) Support / escalation message (for negative review alert)
**Subject:** Action needed: negative review requires response ({{LocationName}})

A new negative review was detected for {{LocationName}}.

- Rating: {{Rating}}
- Author: {{Author}}
- Date: {{CreatedAt}}
- Excerpt: “{{Excerpt}}”

A draft reply is ready for approval here:
{{ReviewUrl}}

If this needs owner attention, reply to this email with “ESCALATE” and we’ll tag it for priority handling.

— AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to
