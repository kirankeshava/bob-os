# Metrics Dashboard Implementation (Next.js + Prisma) + Pilot Outreach Email (Free MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:56:30.863Z

---

# Metrics Dashboard (Build Shipped) — Key Implementation Notes

## Routes
- **UI:** `app/app/admin/metrics/page.tsx`
- **JSON API:** `app/api/admin/metrics/route.ts`
- **CSV Export:** `app/api/admin/metrics.csv/route.ts`

All three are protected via existing RBAC/membership logic: only users with a `UserBusinessMembership` for the selected `businessId` can access.

## Query Model + Definitions
**Date range:** `[start, end)` in business timezone (UI selects dates; API receives ISO). Range is capped at **180 days**.

**KPIs (consistent definitions):**
- **Ingested:** `Review.createdAt` within range.
- **Drafted:** `DraftReply.createdAt` within range.
- **Approved:** `DraftReply.approvedAt` within range.
- **Posted:** `DraftReply.postedAt` within range AND `status in ('posted_manual','posted_api')`.
- **Negative share:** `count(reviews where rating<=2 OR sentiment='negative') / total reviews` in range.
- **Response time (posted only):** average of `(DraftReply.postedAt - Review.createdAt)` for posted replies where the reply belongs to the review and postedAt is not null.

**Sync health:**
- `Location.lastGbpReviewSyncAt`, `Location.lastGbpReviewSyncUpdateTime`
- `Integration.lastError`, `Integration.lastSyncAt`

**Alerts:**
- `AlertEvent.createdAt` within range grouped by type (negative_review, sync_failed, ocr_failed, etc.).

## API Response Shape (JSON)
`GET /api/admin/metrics?businessId=...&start=...&end=...&locationId=optional`

Returns:
- `summary`: totals for ingested/drafted/approved/posted, negativeShare, avgRating, avgResponseMinutes
- `seriesDaily`: array of `{ date, ingested, drafted, approved, posted, avgResponseMinutes, negativeCount, totalCount, alerts }`
- `breakdowns`: by location + by sentiment + by category labels
- `syncHealth`: per-location last sync timestamps and computed status (ok/stale/error)

## CSV Export
`GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=optional`

Columns:
- date
- ingested
- drafted
- approved
- posted
- avg_response_minutes
- total_reviews
- negative_reviews
- negative_share
- alerts

CSV is streamed and uses RFC4180 quoting; verified to open in Google Sheets + Excel.

## UI Components (page.tsx)
Sections:
1. **Filters:** date range picker, location dropdown, export CSV button.
2. **Sync Health Panel:** table of locations with last sync time, last error, and “needs attention” badge.
3. **Activation Funnel:** totals + daily trend (sparkline SVG) and conversion rates (drafted/ingested, approved/drafted, posted/approved).
4. **Alerts:** total alerts + by-type counts and recent list.

## Reliability / Instrumentation
- Adds `correlationId` per request, logs query params + duration.
- Adds Sentry breadcrumbs for endpoint entry, validation, and DB aggregation.
- Enforces max range and rejects missing `businessId`.

---

# Second Pilot Outreach Email (Free MVP)

Subject: Free review reply autopilot for Google/Yelp (7-day pilot) — faster responses, fewer 1-star surprises

Hi {{OwnerName}},

I’m Bob. We’re piloting a lightweight “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google Business Profile and Yelp reviews quickly and consistently.

What it does:
- Pulls in new reviews (Google via integration; Yelp via email/CSV/screenshot)
- Tags sentiment + themes (service, price, staff, etc.)
- Drafts brand-safe replies (you approve/edit with one click)
- Escalates negative reviews immediately via email
- Sends a weekly KPI report (ratings trend, response time, negative share, top themes)

We’re offering the pilot **free for 7 days** in exchange for feedback. If you’re open to it, I can set you up today:
1) Connect your Google Business Profile (takes ~2 minutes)
2) Choose who gets negative-review alerts
3) Start approving replies from a simple queue

You can see the product here (live MVP):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want to try it, reply with:
- Your business name
- Your GBP public listing link
- The best email for alerts

Or email me directly: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
