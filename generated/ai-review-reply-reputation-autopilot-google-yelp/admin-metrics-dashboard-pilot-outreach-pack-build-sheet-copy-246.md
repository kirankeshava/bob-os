# Admin Metrics Dashboard + Pilot Outreach Pack (Build Sheet + Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:28:53.976Z

---

## Part A — /app/admin/metrics Build Sheet (MVP)

### Goal
Give each business owner a single place to see: (1) sync health, (2) reputation funnel, (3) alert/SLA performance, and (4) top themes—using **existing tables**: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport.

### Route + Data Flow
- Page: **/app/admin/metrics** (Server Component)
- Data endpoint: **GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&groupBy=day|week**
- CSV endpoint: **GET /api/admin/metrics.csv?from=...&to=...&locationId=...**

RBAC:
- Require authenticated user.
- Require membership in Business via UserBusinessMembership.
- Scope all queries by businessId.

Filters (top of page):
- Date range (default last 28 days)
- Location (All + per location)
- Group by (day/week)

### Sections + KPIs

#### 1) Sync Health
Display a table per Location:
- Location name
- Source enabled (Google/Yelp/Manual)
- Last sync time
- Last sync status (OK/ERROR)
- Last error message (truncated)
- Reviews ingested in range

Data sources:
- Location.lastGbpReviewSyncUpdateTime (and any existing lastSyncAt/lastError fields you already track)
- AuditLog events for sync runs (if you log them)
- Review.createdAt within range

Implementation notes:
- If last sync fields live on Integration or in AuditLog only, compute:
  - lastSyncAt = max(AuditLog.createdAt where action in ["gbp_sync_start","gbp_sync_complete"])
  - lastError = latest AuditLog where action="gbp_sync_error" or AlertEvent.type="integration_sync_failed"

#### 2) Activation Funnel (Ingest → Draft → Approved → Posted)
Show counts + conversion rates for the selected range:
- Ingested reviews: count(Review)
- Drafted: count(DraftReply) (latest per review) where createdAt in range OR review.createdAt in range (pick one definition; recommended: tie to review.createdAt)
- Approved: count(DraftReply where status="approved")
- Posted: count(DraftReply where status in ["posted_manual","posted_api"]) 

Recommended definitions:
- **Ingested**: Review.createdAt ∈ [from,to]
- **Drafted**: Review in range AND has DraftReply (any status)
- **Approved**: Review in range AND latest DraftReply.status="approved" OR approval AuditLog exists
- **Posted**: Review in range AND latest DraftReply.status in posted states

Also show time-to metrics:
- Median time to first draft: DraftReply.createdAt - Review.createdAt
- Median time to approve: approvedAt - DraftReply.createdAt
- Median time to post: postedAt - approvedAt

Where timestamps come from:
- DraftReply.createdAt
- DraftReply.approvedAt (if present) else AuditLog(action="draft_approved").createdAt
- DraftReply.postedAt (if present) else AuditLog(action like "draft_marked_posted").createdAt

#### 3) Reputation KPIs
Cards:
- Avg rating (range)
- Review volume (range)
- Negative share % (rating<=2 OR sentiment=negative)
- Response rate % (posted / ingested)
- Avg response time (postedAt - Review.createdAt) excluding rejected/never-posted

Trend chart (line):
- Avg rating over time (day/week)
- Volume over time (bar)

#### 4) Alerts & SLA
Table + counts:
- Alerts created (AlertEvent) by type
- Negative reviews that breached SLA (e.g., not approved within X hours)

Define SLA breach:
- For each negative review (rating<=2 OR sentiment=negative):
  - if no approval within thresholdHours → breach
  - thresholdHours stored per Location or EscalationRule

Compute breach count:
- For each negative review in range:
  - approvalTime = approvedAt OR NULL
  - if approvalTime is NULL and (now - Review.createdAt) > thresholdHours → breach
  - if approvalTime exists and (approvalTime - Review.createdAt) > thresholdHours → breach

#### 5) Top Themes
From Review.categoryLabels (service/price/staff/etc):
- Pie/bar chart: label frequency
- Table: label, count, %

Optionally: show top keywords via naive word counts from Review.text excluding stopwords (quick MVP).

---

## Part B — Concrete Query Recipes (Prisma/SQL)

### Shared Where Clause
- businessId from session membership
- optional locationId
- date range on Review.createdAt

### 1) Review volume + avg rating
SQL:
```sql
SELECT
  COUNT(*) AS review_count,
  AVG(rating) AS avg_rating,
  SUM(CASE WHEN rating <= 2 OR sentiment = 'negative' THEN 1 ELSE 0 END) AS negative_count
FROM "Review"
WHERE "businessId" = $1
  AND ($2::uuid IS NULL OR "locationId" = $2)
  AND "createdAt" >= $3 AND "createdAt" < $4;
```

Negative share = negative_count / review_count.

### 2) Funnel counts (latest draft per review)
Approach: select reviews in range, join latest draft.
SQL:
```sql
WITH reviews AS (
  SELECT id FROM "Review"
  WHERE "businessId"=$1
    AND ($2::uuid IS NULL OR "locationId"=$2)
    AND "createdAt">=$3 AND "createdAt"<$4
), latest_draft AS (
  SELECT DISTINCT ON ("reviewId") "reviewId", status, "createdAt" AS drafted_at, "approvedAt", "postedAt"
  FROM "DraftReply"
  WHERE "reviewId" IN (SELECT id FROM reviews)
  ORDER BY "reviewId", "createdAt" DESC
)
SELECT
  (SELECT COUNT(*) FROM reviews) AS ingested,
  (SELECT COUNT(*) FROM latest_draft) AS drafted,
  (SELECT COUNT(*) FROM latest_draft WHERE status='approved') AS approved,
  (SELECT COUNT(*) FROM latest_draft WHERE status IN ('posted_manual','posted_api')) AS posted;
```

### 3) Response time metrics
Compute only for posted drafts.
```sql
WITH reviews AS (
  SELECT id, "createdAt" FROM "Review"
  WHERE "businessId"=$1
    AND ($2::uuid IS NULL OR "locationId"=$2)
    AND "createdAt">=$3 AND "createdAt"<$4
), latest_posted AS (
  SELECT DISTINCT ON (d."reviewId") d."reviewId", d."postedAt"
  FROM "DraftReply" d
  WHERE d."reviewId" IN (SELECT id FROM reviews)
    AND d.status IN ('posted_manual','posted_api')
  ORDER BY d."reviewId", d."createdAt" DESC
)
SELECT
  AVG(EXTRACT(EPOCH FROM (p."postedAt" - r."createdAt"))/3600.0) AS avg_hours_to_post
FROM latest_posted p
JOIN reviews r ON r.id=p."reviewId";
```

### 4) Theme counts
If categoryLabels is a string array:
```sql
SELECT label, COUNT(*)
FROM (
  SELECT unnest("categoryLabels") AS label
  FROM "Review"
  WHERE "businessId"=$1
    AND ($2::uuid IS NULL OR "locationId"=$2)
    AND "createdAt">=$3 AND "createdAt"<$4
) t
GROUP BY label
ORDER BY COUNT(*) DESC;
```

### 5) Alerts summary
```sql
SELECT type, COUNT(*)
FROM "AlertEvent"
WHERE "businessId"=$1
  AND "createdAt">=$2 AND "createdAt"<$3
GROUP BY type
ORDER BY COUNT(*) DESC;
```

---

## Part C — API Contracts

### GET /api/admin/metrics
Response JSON:
```json
{
  "range": {"from":"2026-03-01","to":"2026-03-29"},
  "filters": {"locationId": null, "groupBy": "week"},
  "cards": {
    "reviewCount": 42,
    "avgRating": 4.43,
    "negativeShare": 0.071,
    "responseRate": 0.62,
    "avgHoursToPost": 19.4
  },
  "funnel": {"ingested":42,"drafted":40,"approved":30,"posted":26},
  "times": {"medianHoursToDraft":0.6,"medianHoursToApprove":3.1,"medianHoursToPost":19.4},
  "trends": {
    "rating": [{"bucket":"2026-W09","avgRating":4.2,"count":10}],
    "volume": [{"bucket":"2026-W09","count":10}]
  },
  "themes": [{"label":"staff","count":12}],
  "alerts": {"byType": [{"type":"negative_review","count":3}], "slaBreaches": 1},
  "syncHealth": [{"locationId":"...","locationName":"Downtown","lastSyncAt":"...","status":"ok","lastError":null,"ingestedInRange":12}]
}
```

Validation:
- from/to required; cap range to 365 days.
- locationId optional; must belong to business.

### GET /api/admin/metrics.csv
CSV columns (one row per day/week bucket):
- bucket
- review_count
- avg_rating
- negative_count
- posted_count
- avg_hours_to_post

---

## Part D — Pilot Outreach Copy (references legitimacy URL)

### 1) Cold email to local business owner (short)
Subject: We’ll reply to your Google/Yelp reviews (brand-safe) + weekly reputation report

Hi {{FirstName}},

I’m reaching out because {{BusinessName}} gets reviews that directly impact calls/bookings, but responding consistently is time-consuming.

We built a lightweight “AI Review Reply & Reputation Autopilot” that:
- pulls in new Google reviews (and Yelp via import/email)
- drafts brand-safe replies for approval (one click approve/edit)
- escalates negative reviews immediately
- emails a weekly KPI report (ratings trend, response time, top themes)

Preview of the product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open, I can set you up as a pilot and get you to “inbox zero” on reviews this week. Want to try it for {{PilotOffer}}?

— {{YourName}}
{{YourEmail}}

### 2) Follow-up #1
Subject: Quick follow-up — review replies + alerts

Hi {{FirstName}},

Just checking if you’d like help staying on top of Google/Yelp reviews. The MVP drafts replies in your tone, blocks risky content, and pings you fast on negative reviews so you can protect your rating.

If you send your Google Business Profile link + best email for alerts, I can get a pilot running in ~15 minutes.

Product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{YourName}}
{{YourEmail}}

### 3) Pilot onboarding checklist (send after they say yes)
Subject: Pilot setup — 3 quick items

Thanks {{FirstName}}—here’s what I need to set up your review autopilot:

1) Your Google Business Profile access (preferred):
   - Invite {{YourEmail}} as a manager OR we can connect via OAuth in the app.
2) Yelp (optional):
   - Forward Yelp review notification emails to {{InboundEmail}} OR export/import CSV.
3) Brand voice:
   - Reply style: (Friendly/Professional/Short & direct/etc.)
   - Any phrases to avoid + escalation contact for negative reviews.

Once connected, you’ll see a queue of drafted replies for one-click approval and you’ll receive a weekly KPI report.

Product site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{YourName}}
{{YourEmail}}

---

## Owner Execution Notes (no new paid tools required)
1) Build /app/admin/metrics using the queries above.
2) Use the outreach emails to recruit 2 pilots (ideally: dentist, med spa, home services, restaurant; at least one multi-location).
3) During pilots, watch for: edited reviews, deleted reviews, GBP pagination, quota backoff behavior, and reply mismatch risk; log everything via Sentry correlationId.
