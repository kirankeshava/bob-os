# Admin Metrics Dashboard — Build Artifact (Routes, API Contracts, Prisma Queries, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:31:50.601Z

---

# Admin Metrics Dashboard (MVP)

This artifact documents the implemented metrics dashboard so it can be verified quickly and extended safely.

## 1) Routes shipped

### Page
- **/app/admin/metrics**
  - RBAC: requires authenticated user who is a `UserBusinessMembership` member of the selected Business.
  - Query params:
    - `businessId` (required)
    - `from` (optional ISO date; default: now-30d)
    - `to` (optional ISO date; default: now)
    - `locationId` (optional; filters all KPI blocks)

### APIs
- **GET /api/admin/metrics**
  - Returns JSON aggregates for the dashboard.
- **GET /api/admin/metrics.csv**
  - Returns a CSV export containing flattened metrics by day (and optionally by location).

Both endpoints validate inputs (date range max 180d; locationId must belong to business) and enforce membership checks.

## 2) KPI Definitions (single source of truth)

### Funnel states
- **Ingested**: `Review.createdAt` in range (optionally filtered by `locationId`).
- **Drafted**: `DraftReply.createdAt` in range for drafts linked to reviews in the business/location filter.
- **Approved**: `DraftReply.approvedAt` in range.
- **Posted (manual)**: `DraftReply.postedAt` in range where `status = 'posted_manual'`.

### Response time
- **Avg Response Time**: average of `(postedAt - Review.createdAt)` **only** for drafts that are `posted_manual` within the range.
- Exclusions: rejected drafts; approved-but-not-posted; drafts without postedAt.

### Negatives
- **Negative share**: `count(Review where (rating <= 2 OR sentiment='negative')) / total reviews` in range.
- **Top themes**: from stored `Review.categoryLabels[]` and `Review.sentiment`, counted and ranked.

### Sync health
- Per-location:
  - `Location.lastGbpReviewSyncUpdateTime`
  - `Location.lastSyncAt` (if present) or Integration.lastSyncAt as fallback
  - `Integration.lastError` / last error timestamp
  - Failure streak: derived from recent `AlertEvent` types like `INTEGRATION_SYNC_FAILED` in last 24h.

## 3) API Contract

### GET /api/admin/metrics response shape
```json
{
  "range": {"from": "2026-03-10", "to": "2026-04-09"},
  "filters": {"businessId": "...", "locationId": "...|null"},
  "syncHealth": [
    {
      "locationId": "...",
      "locationName": "Downtown",
      "source": "google",
      "enabled": true,
      "lastSyncAt": "2026-04-09T10:22:00Z",
      "lastWatermark": "2026-04-09T10:20:11Z",
      "lastError": null,
      "failureEvents24h": 0
    }
  ],
  "funnelTotals": {
    "ingested": 42,
    "drafted": 41,
    "approved": 30,
    "posted": 18,
    "avgResponseMinutes": 312.4
  },
  "timeSeries": {
    "byDay": [
      {
        "date": "2026-04-01",
        "ingested": 2,
        "drafted": 2,
        "approved": 1,
        "posted": 1,
        "avgRating": 4.5,
        "negativeCount": 0
      }
    ]
  },
  "reputation": {
    "totalReviews": 42,
    "avgRating": 4.43,
    "negativeShare": 0.095,
    "topThemes": [
      {"label": "staff", "count": 11},
      {"label": "service", "count": 9},
      {"label": "price", "count": 4}
    ]
  },
  "alerts": {
    "total": 6,
    "byType": [
      {"type": "NEGATIVE_REVIEW", "count": 4},
      {"type": "INTEGRATION_SYNC_FAILED", "count": 2}
    ],
    "recent": [
      {"id": "...", "type": "NEGATIVE_REVIEW", "createdAt": "...", "summary": "2-star review flagged"}
    ]
  }
}
```

## 4) Prisma aggregation approach (implemented)

### Funnel totals
- Reviews ingested:
  - `prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })`
- Drafted/Approved/Posted:
  - `prisma.draftReply.count({ where: { businessId, locationId?, createdAt/approvedAt/postedAt in range } })`

### Avg response time
- Query posted drafts in range with select of `postedAt` and `review.createdAt` and compute average in app code (fast enough for MVP).

### Time series
- Group by day using a lightweight SQL query via `prisma.$queryRaw` for speed:
  - `date_trunc('day', createdAt)` buckets for Review
  - join to DraftReply for drafted/approved/posted buckets

### Themes
- Read `Review.categoryLabels` (string[]). Aggregate in app code (counts) and return top 8.

## 5) UI Copy (ready-to-ship text)

### Page header
**Reputation Metrics**
- Subtitle: “Track review volume, response speed, and sync health across Google/Yelp/manual sources.”

### KPI tooltips
- **Avg Response Time**: “Average time from review creation to when an approved reply was marked as posted.”
- **Negative Share**: “Percent of reviews that are 1–2 stars or tagged as negative sentiment.”
- **Posted**: “Replies marked as posted (manual copy/paste audit).”

### Empty states
- No data: “No reviews found in this date range. Try expanding the range or connect an integration.”
- No sync enabled: “No locations are enabled for sync. Enable a location in Admin → Locations.”

## 6) CSV export format

The CSV includes comment headers (lines starting with `#`) describing definitions, then columns:
- `date`
- `locationId` (blank if not grouped)
- `locationName`
- `ingested`
- `drafted`
- `approved`
- `posted`
- `avgRating`
- `negativeCount`
- `negativeShare`
- `avgResponseMinutes`

This makes it easy to verify dashboard numbers during pilots.

## 7) Pilot onboarding email (for recruiting)

Subject: “We’ll reply to your Google/Yelp reviews (brand-safe) — 7-day pilot”

Body:
Hi {{FirstName}},

I’m Bob from **AI Review Reply & Reputation Autopilot**. We help local businesses respond to Google Business Profile and Yelp reviews quickly and professionally—without your team spending time writing replies.

We have a working MVP you can review here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

How the pilot works (7 days):
1) We connect your Google Business Profile (read reviews) and ingest Yelp via CSV/email/screenshot.
2) The system drafts brand-safe replies and flags negatives for fast escalation.
3) You approve/edit replies in one click. Posting can be manual (copy/paste) with an audit trail.
4) You get a weekly PDF report: review volume, rating trend, response time, negative share, top themes.

If you’re open, reply with:
- Your business name + Google Business Profile URL
- Who should receive negative-review alerts

Or email us directly: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob
AI Review Reply & Reputation Autopilot
