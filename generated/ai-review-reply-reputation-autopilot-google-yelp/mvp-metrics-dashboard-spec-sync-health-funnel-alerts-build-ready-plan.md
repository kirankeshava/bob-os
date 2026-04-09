# MVP Metrics Dashboard Spec (Sync Health + Funnel + Alerts) — Build-Ready Plan

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T00:54:28.427Z

---

## Goal
Ship a lightweight, reliable /app/admin/metrics dashboard for the MVP using existing data (Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, Location). Must answer: “Is syncing working?”, “Are we responding fast enough?”, “Where are we dropping off?”, and “What’s causing escalations?”

---
## Pages & Routes
### 1) Page: /app/admin/metrics
**Audience:** business admins/owners.
**Filters (top bar):**
- Date range: last 7 / 30 / 90 days + custom (from/to)
- Location: All locations or specific locationId
- Source: all | google | yelp | manual | ocr (optional if stored as Review.source)

**Sections (stacked cards):**
1. Sync Health
2. Reputation Overview
3. Activation Funnel
4. Response SLA
5. Alerts & Escalations
6. Export

### 2) API: /api/admin/metrics (GET)
Returns JSON for the dashboard. Params:
- from=ISO date
- to=ISO date
- locationId?=string
- source?=string

Auth/RBAC:
- Require signed-in user
- User must be member of Business (UserBusinessMembership)
- If locationId provided, must belong to that business

### 3) API: /api/admin/metrics.csv (GET)
Same filters; returns CSV for debugging/ops:
- Review-level export: id, source, location, rating, createdAt, sentiment, categories, draftStatus, approvedAt, postedAt, responseTimeHours

---
## KPI Definitions (Consistency Rules)
### Review States
- **Ingested:** Review exists in DB within date range (Review.createdAt is within filter range).
- **Drafted:** There exists a DraftReply for the Review with status in {draft, needs_edit, approved, rejected, posted_manual, posted_api}.
- **Approved:** DraftReply.status == 'approved' OR any posted status (because posted implies approved).
- **Posted:** DraftReply.status in {'posted_manual','posted_api'}.
- **Rejected:** DraftReply.status == 'rejected'.

### Response Time
- Only count reviews that were **posted**.
- responseTimeHours = (postedAt - Review.createdAt) in hours.
- Also compute p50 and p90.

### Negative Review
A review is “negative” if either:
- sentiment == 'negative' OR
- rating <= configured threshold (default 2)
Use the business/location escalation rule settings when possible.

---
## Dashboard Cards (What to Show + How to Compute)

### Card A: Sync Health
**Widgets:**
- Table by Location:
  - locationName
  - integration source (Google enabled? Yelp manual?)
  - lastSyncAt (from Integration metadata or Location fields)
  - lastError (from Integration.lastError or latest AlertEvent related to sync)
  - reviewsInLast7Days
- Status badges:
  - Healthy: lastSyncAt within 6 hours (configurable)
  - Degraded: lastSyncAt 6–24h
  - Down: >24h or lastError present

**Data Sources:**
- Location.lastGbpReviewSyncUpdateTime and/or Integration.lastSyncAt
- AlertEvent where type == 'integration_sync_failed'
- Review counts grouped by locationId

### Card B: Reputation Overview
**Widgets:**
- Total reviews (count)
- Average rating (mean) for range
- Rating trend: compare avg rating current range vs previous equal-length period (WoW/MoM)
- Negative share: negativeCount / totalCount

**Compute:**
- Aggregate Review.rating, Review.sentiment
- For trend: compute same metrics for previous window: [from-(to-from), from)

### Card C: Activation Funnel
**Widgets:**
- Counts + conversion rates:
  - Ingested
  - Drafted
  - Approved
  - Posted
  - Rejected
- Drop-off callouts:
  - Approved but not posted count (needs manual copy/paste)

**Compute approach:**
- Ingested = count(Review)
- Drafted = count(distinct reviewId in DraftReply join Review)
- Approved = count(distinct reviewId where DraftReply.status in approved/posted*)
- Posted = count(distinct reviewId where DraftReply.status in posted*)
- Rejected = count(distinct reviewId where DraftReply.status == rejected)

### Card D: Response SLA
**Widgets:**
- p50 response time (hours)
- p90 response time (hours)
- % responded within 24h and within 48h
- Negative review median response time (subset negative)

**Compute:**
- Use posted reviews only.
- responseTimeHours distribution from Review.createdAt to DraftReply.postedAt.

### Card E: Alerts & Escalations
**Widgets:**
- Alerts count by type (negative_review, sync_failed, ocr_failed, guardrail_block)
- Latest 10 alerts with status (open/ack/resolved if you have; otherwise just list)
- Top themes among negative reviews (reuse categories)

**Compute:**
- AlertEvent filtered by createdAt in range
- Categories: count Review.categories for negative reviews

### Card F: Export
- Button: “Download CSV” hits /api/admin/metrics.csv with current filters.

---
## Implementation Notes (Fast Path)
### UI
- Use server components for initial render (fast + secure) and a small client component only for date picker/filter state.
- Use simple charts:
  - Rating over time: basic sparkline via lightweight library or render as table if avoiding deps.
  - Funnel: horizontal bar counts.

### Metrics Query Strategy
- Prefer 3–5 aggregated queries vs many small ones.
- Use Prisma groupBy where convenient; otherwise use $queryRaw for percentiles.

### Percentiles (p50/p90)
Postgres approach (recommended):
- Build a CTE that selects responseTimeHours per posted review, then:
  - percentile_cont(0.5) within group (order by response_time)
  - percentile_cont(0.9) within group
If Prisma can’t express it cleanly, use $queryRaw with parameterized dates.

### CSV Export Columns (Review-level)
- reviewId
- source
- locationName
- rating
- createdAt
- sentiment
- categories (comma-separated)
- draftStatus
- approvedAt
- postedAt
- responseTimeHours

---
## Pseudocode: Core Aggregations
1) Base filter:
- businessId = current user’s business
- createdAt between [from,to)
- optional locationId
- optional source

2) Funnel counts:
- reviews = SELECT id FROM Review WHERE filter
- drafted = SELECT COUNT(DISTINCT reviewId) FROM DraftReply WHERE reviewId IN reviews
- approved = SELECT COUNT(DISTINCT reviewId) FROM DraftReply WHERE status IN (...) AND reviewId IN reviews
- posted = SELECT COUNT(DISTINCT reviewId) FROM DraftReply WHERE status IN ('posted_manual','posted_api') AND reviewId IN reviews
- rejected = SELECT COUNT(DISTINCT reviewId) FROM DraftReply WHERE status='rejected' AND reviewId IN reviews

3) Response time percentiles:
- For each review in reviews with posted draft:
  response_time = EXTRACT(EPOCH FROM (postedAt - review.createdAt))/3600
- Compute percentile_cont.

4) Sync health table:
- locations for business
- join Integration metadata and last error; count reviews last 7 days

---
## Acceptance Criteria
- Dashboard loads in <2s for a typical business (<5k reviews) with minimal queries.
- Metrics match weekly report definitions (no contradictory numbers).
- CSV export matches filters and includes responseTimeHours.
- Only authorized business members can view metrics.

---
## Out-of-Scope (for MVP)
- Real-time websockets
- Complex cohort analytics
- Paid analytics tools
- Multi-business super-admin view (unless already needed)
