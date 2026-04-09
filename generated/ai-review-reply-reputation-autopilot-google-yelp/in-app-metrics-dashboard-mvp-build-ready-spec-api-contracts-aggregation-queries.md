# In‑App Metrics Dashboard (MVP) — Build-Ready Spec + API Contracts + Aggregation Queries

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:51:36.437Z

---

## Goal
Ship a lightweight, trustworthy /app/admin/metrics dashboard for the MVP of **AI Review Reply & Reputation Autopilot** that answers:
1) Are integrations syncing? 2) Are reviews flowing through the funnel? 3) Are we meeting SLA on negative reviews? 4) What’s the weekly trend?

Public legitimacy link to reference in any comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## Page: /app/admin/metrics
### Filters (top bar)
- **Date range**: startDate, endDate (default: last 14 days)
- **Location**: locationId = all | specific
- **Source**: all | google | yelp | manual | ocr (optional; can be v2)

### Section A — Sync Health
**Table: Locations Sync Status**
Columns:
- Location name
- Integration source(s)
- lastSyncAt (derived)
- lastError (derived)
- lastReviewSeenAt (max Review.createdAt or Review.updatedAt)
- failing? (boolean)

**Derivation rules (MVP, no new tables):**
- lastSyncAt: for GBP, use Location.lastGbpReviewsSyncedAt if present; otherwise infer from the latest AuditLog event where action in ["google_sync_start","google_sync_success"] and locationId matches.
- lastError: latest AuditLog action = "google_sync_error" or AlertEvent.type = "INTEGRATION_SYNC_FAILED".

**Empty state copy:**
“No sync data yet. Connect Google Business Profile under Integrations and run the sync cron to start pulling reviews.”

### Section B — Activation Funnel
Show counts for the selected range:
- **Ingested reviews** = number of Review records created in range
- **Drafted** = DraftReply created in range (or DraftReply exists for reviews in range)
- **Approved** = DraftReply approvedAt in range
- **Posted** = DraftReply postedAt in range (manual or API)

**Important definition:** posted requires DraftReply.status in [posted_manual, posted_api] AND postedAt not null.

**Table: Funnel + Conversion**
- Ingested
- Drafted
- Approved
- Posted
- % drafted/ingested
- % approved/drafted
- % posted/approved

**Empty state copy:**
“No reviews ingested in this period. Import via CSV/email/screenshot OCR, or connect Google Business Profile to begin.”

### Section C — SLA + Risk (Negative Reviews)
KPIs:
- **Negative share** = negativeReviews / totalReviews
- **SLA compliance**: % negative reviews with firstResponseAction within X hours (configurable per business; start with 24h default)
- **Escalations triggered**: count of AlertEvent where type in [NEGATIVE_REVIEW_ALERT, SLA_BREACH]

**Definition: negative review**
- rating <= 2 OR sentiment = 'negative'

**Definition: response time**
- responseTimeHours = (postedAt OR approvedAt OR firstDraftAt) - Review.createdAt, depending on what you want to measure.
For MVP, show two metrics:
1) **Time to draft** = first DraftReply.createdAt - Review.createdAt
2) **Time to posted** = DraftReply.postedAt - Review.createdAt (only for posted)

### Section D — Trends (simple)
For the range, group by day (or week if > 30 days):
- Reviews volume
- Avg rating
- Negative count
- Posted count

Use a simple table first; add sparklines later.

---

## API Contracts
### GET /api/admin/metrics
Returns JSON for the page.

**Query params (zod validation):**
- startDate: ISO string (optional)
- endDate: ISO string (optional)
- locationId: string | "all" (optional, default all)

**RBAC:** requester must be a member of the Business in context.
- If the app uses a “currentBusinessId” in session/cookie, use that.
- Otherwise require businessId param and verify membership.

**Response shape:**
```json
{
  "range": {"startDate":"2026-03-26","endDate":"2026-04-09"},
  "syncHealth": {
    "locations": [
      {"locationId":"...","name":"Downtown","sources":["google"],"lastSyncAt":"...","lastError":null,"failing":false,"lastReviewSeenAt":"..."}
    ]
  },
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 80,
    "posted": 65,
    "conversion": {"draftedPerIngested":0.916,"approvedPerDrafted":0.727,"postedPerApproved":0.812}
  },
  "sla": {
    "negativeCount": 12,
    "negativeShare": 0.10,
    "slaHours": 24,
    "slaCompliant": 9,
    "slaComplianceRate": 0.75,
    "escalations": 5
  },
  "trends": {
    "bucket": "day",
    "series": [
      {"date":"2026-04-01","reviews":10,"avgRating":4.2,"negative":1,"posted":5}
    ]
  }
}
```

### GET /api/admin/metrics.csv
Same params + RBAC. Returns CSV with these columns:
- date
- location
- reviews
- avg_rating
- negative
- drafted
- approved
- posted
- avg_time_to_draft_hours
- avg_time_to_post_hours

---

## Aggregation Queries (Prisma-friendly)
Assumptions from your existing schema:
- Review: id, businessId, locationId, source, rating, sentiment, categoryLabels, createdAt, updatedAt
- DraftReply: id, reviewId, businessId, status, createdAt, approvedAt, postedAt
- AlertEvent: id, businessId, locationId, type, createdAt
- AuditLog: id, businessId, locationId, action, createdAt, metadata

### 1) Funnel counts
**Ingested**
- Reviews where businessId = X AND createdAt between start/end AND (location filter)

**Drafted**
Option A (simpler, consistent): count DraftReply where createdAt between start/end AND businessId = X AND (location via join on Review)
Option B (ties to ingested reviews): count reviews ingested in range that have any DraftReply.
Pick one and label it. I recommend Option B for “how many ingested got drafted”.

**Prisma pseudo:**
- ingested = prisma.review.count({ where: { businessId, createdAt: { gte: start, lte: end }, ...(locationId!=='all'?{locationId}:{} ) }})
- drafted = prisma.review.count({ where: { businessId, createdAt:{...}, ...(locationFilter), draftReplies: { some: {} } }})
- approved = prisma.draftReply.count({ where: { businessId, approvedAt:{ gte:start, lte:end }, ...(locationFilterViaReviewJoin) }})
- posted = prisma.draftReply.count({ where: { businessId, postedAt:{ gte:start, lte:end }, status: { in:["posted_manual","posted_api"] }, ...(locationFilterViaReviewJoin) }})

### 2) Negative + SLA compliance
- negativeReviews = count Review in range where rating <=2 OR sentiment='negative'
- slaCompliant = count negative reviews where exists DraftReply with postedAt within slaHours OR approvedAt within slaHours (choose postedAt for stricter SLA)

SQL sketch (postedAt SLA):
```sql
SELECT COUNT(*)
FROM "Review" r
JOIN "DraftReply" d ON d."reviewId" = r.id
WHERE r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
  AND (r."rating" <= 2 OR r."sentiment" = 'negative')
  AND d."postedAt" IS NOT NULL
  AND d."postedAt" <= r."createdAt" + ($4 || ' hours')::interval;
```

### 3) Time-to-draft and time-to-post averages
Compute on posted reviews only (for time-to-post) to avoid skew.
- avgTimeToDraft = avg(firstDraftCreatedAt - reviewCreatedAt)
- avgTimeToPost = avg(postedAt - reviewCreatedAt)

If there can be multiple DraftReply per review, use MIN(createdAt) for first draft.

### 4) Trends by day
Group Reviews by date(createdAt):
- reviews = count(*)
- avgRating = avg(rating)
- negative = count where negative definition

Posted by day: group DraftReply by date(postedAt).
Then merge in app code by date bucket.

---

## UI Copy (ready to paste)
**Page title:** Metrics
**Subtitle:** “Monitor sync health, response performance, and review trends.”

**Cards:**
- “Ingested Reviews”
- “Drafts Created”
- “Approved Replies”
- “Posted Replies”
- “Negative Share”
- “SLA Compliance (Negative Reviews)”

**Tooltips:**
- Negative Share: “Reviews with rating ≤ 2 or sentiment marked negative.”
- SLA Compliance: “Percent of negative reviews that received a posted response within your SLA window.”

**Export button:** “Export CSV”

---

## Implementation Notes (fast path)
- Prefer a single server route /api/admin/metrics that returns all sections; avoid multiple round trips.
- Use cached computations per request (in-memory per invocation) and rely on DB indexes (createdAt, businessId, locationId).
- Keep charts minimal (table-first). Add sparkline later.

This spec is intentionally MVP-focused: it uses only existing data (Review/DraftReply/AuditLog/AlertEvent) and provides reliable definitions so the dashboard matches what customers experience in the queue.