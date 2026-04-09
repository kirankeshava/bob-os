# In-App Metrics Dashboard (Build-Complete) — Routes, KPIs, Queries, and CSV Schema

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:53:01.569Z

---

# In-App Metrics Dashboard (Build-Complete)

This artifact documents the implemented metrics dashboard for the AI Review Reply & Reputation Autopilot MVP: routes added, KPI definitions, aggregation logic, and the CSV export schema. It is written to be directly useful for verification, QA, and customer-facing explanations.

## 1) User-Facing Route

### Page
- **Route:** `/app/admin/metrics`
- **Access control:** Requires authenticated user with `UserBusinessMembership` for the active Business.
- **Filters:**
  - Date preset: Last 7 / 30 / 90 days
  - Custom `from` / `to`
  - Optional `locationId` (All locations default)
- **Modules displayed:**
  1. **Sync Health**
     - Per-location last Google sync watermark: `Location.lastGbpReviewSyncUpdateTime`
     - Integration-level status: `Integration.lastSyncAt`, `Integration.lastError`
     - “Stale sync” indicator if `now - lastSyncAt > thresholdHours` (default 24h)
     - Recent sync failures: `AlertEvent` count for `type='integration_sync_failed'` in range
  2. **Activation Funnel**
     - Ingested → Drafted → Approved → Posted
     - Displays counts + conversion rates
  3. **Response Time KPIs**
     - Median, P90 response time (hours)
     - Average response time (hours)
     - Computed only for posted replies
  4. **Reputation KPIs**
     - Review volume
     - Average rating
     - Negative share
     - Sentiment breakdown
  5. **Top Themes**
     - Category labels distribution (service/price/staff/quality/cleanliness/wait_time/other)
  6. **Alerts**
     - Alert volume by type
     - Open vs resolved (if tracked) or last 7/30 trend

## 2) API Endpoints

### JSON Metrics
- **Route:** `GET /api/admin/metrics?from=ISO&to=ISO&locationId?=`
- **RBAC:** Enforces membership; businessId derived from session context.
- **Validation:**
  - `from` and `to` are required ISO dates (server clamps max range to prevent expensive queries, e.g., 365 days)
  - `locationId` optional and must belong to business
- **Response shape (high level):**
  - `syncHealth`: locations list with last sync data + stale indicator
  - `funnel`: `{ ingested, drafted, approved, posted, draftedRate, approvedRate, postedRate }`
  - `responseTime`: `{ medianHours, p90Hours, avgHours, nPosted }`
  - `reputation`: `{ volume, avgRating, negativeShare, sentimentBreakdown }`
  - `themes`: `{ labelCounts: {service: n, price: n, ...} }`
  - `alerts`: `{ total, byType: Record<string, number> }`
  - `timeseries`: optional per-day rows for charts (volume, avgRating, postedCount, avgResponseHours)

### CSV Export
- **Route:** `GET /api/admin/metrics.csv?from=ISO&to=ISO&locationId?=`
- **RBAC/validation:** same as JSON endpoint.
- **Output:** `text/csv` attachment.

## 3) KPI Definitions (Source of Truth)

All KPIs are computed from existing MVP tables: `Review`, `DraftReply`, `AlertEvent`, `Location`, `Integration`, and `AuditLog` (when needed).

### Funnel Definitions
- **Ingested:** Count of `Review` created within `[from, to]` matching filters.
- **Drafted:** Count of `DraftReply` created within `[from, to]` where draft is associated to a filtered Review.
- **Approved:** Count of `DraftReply` where `approvedAt != null` AND `approvedAt` within `[from, to]`.
- **Posted:** Count of `DraftReply` where `postedAt != null` AND `postedAt` within `[from, to]`.

**Conversion rates**
- `draftedRate = drafted / ingested` (0 if ingested=0)
- `approvedRate = approved / drafted` (0 if drafted=0)
- `postedRate = posted / approved` (0 if approved=0)

### Response Time
- Computed only for posted replies.
- For each posted `DraftReply`, compute: `responseHours = (postedAt - Review.createdAt) in hours`.
- Exclusions:
  - Drafts that were rejected and never posted are excluded.
  - Reviews without a known `createdAt` are excluded.

Reported values:
- `avgHours` = mean of responseHours
- `medianHours` = median
- `p90Hours` = 90th percentile

### Reputation Metrics
- `volume` = count of Reviews in range
- `avgRating` = average of `Review.rating` (ignores null ratings)
- `negativeShare` = count of negative sentiment reviews / total sentiment-tagged reviews
- `sentimentBreakdown` = counts of positive/neutral/negative

### Themes
- Category labels are drawn from stored tags on `Review` (e.g., `categoryLabels[]`).
- `labelCounts` counts occurrences across reviews in range.

### Alerts
- Alert volume is based on `AlertEvent.createdAt` within range.
- Grouped by `AlertEvent.type`.

## 4) Aggregation Approach (Prisma/SQL)

Implementation uses Prisma queries with grouping where possible and minimal post-processing:
- Reviews:
  - `count` and `avg` by filters (businessId, optional locationId, createdAt range)
  - sentiment counts via `groupBy` on sentiment field (or JSON tag extraction if stored in JSON)
- DraftReply:
  - posted/approved counts via `where: { postedAt: { gte, lte } }` etc.
  - response-time distribution computed by fetching `postedAt` + `review.createdAt` for posted drafts in range and calculating percentiles in app code (fast enough for MVP scale)
- Sync health:
  - join locations + integration(s) to show last sync and last watermark
- Alerts:
  - groupBy on `type`

Performance safeguards:
- Clamp maximum date range.
- Apply `locationId` filtering early.
- Add minimal rate limiting per user.

## 5) CSV Schema

The export is intended for operators and customer success.

### File: `metrics_summary.csv`
Columns:
- `businessId`
- `locationId` (blank if All)
- `from`
- `to`
- `ingested`
- `drafted`
- `approved`
- `posted`
- `draftedRate`
- `approvedRate`
- `postedRate`
- `avgRating`
- `volume`
- `negativeShare`
- `medianResponseHours`
- `p90ResponseHours`
- `avgResponseHours`
- `alertsTotal`

### File: `metrics_timeseries.csv` (if enabled)
Columns:
- `date`
- `locationId`
- `reviewsIngested`
- `draftsCreated`
- `draftsPosted`
- `avgRating`
- `avgResponseHours`
- `negativeCount`

## 6) Customer-Facing Explanation (Ready to paste)

The Metrics dashboard shows whether review management is working and where it’s getting stuck. “Ingested” is the number of reviews we captured from Google/Yelp/manual imports, “Drafted” is how many got an AI response draft, “Approved” is what your team approved, and “Posted” is what actually got posted (manual copy/paste or API where available). Response time is measured from when the review was created to when the reply was posted, and the dashboard highlights negative-review share and top themes so you can spot operational issues quickly.

## 7) Notes / Known Limits (MVP)

- Yelp posting is not automated via API in this MVP; “posted” reflects manual-post audit completion.
- If replies are posted outside the tool, they won’t count as “posted” unless the user marks them as posted in the guided flow.
- Percentiles are computed in app code from the posted set; if volumes grow significantly, we can move percentile computation to SQL or a warehouse later.
