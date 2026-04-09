# Admin Metrics Dashboard — Build-Ready Implementation Spec (Next.js + Prisma + CSV Export)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:45:18.988Z

---

## Goal
Ship a lightweight in-app metrics dashboard at **/app/admin/metrics** that helps (a) internal operators debug sync + automation reliability and (b) customers see tangible reputation outcomes. No new infra required; use existing tables: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `AuditLog`.

This spec is designed to be implemented in 1–2 dev sessions.

---

## Page: /app/admin/metrics (RBAC: business member)
### Filters (top bar)
- Date range: `start` / `end` (default last 30 days)
- Location filter: `locationId` (default: All)
- Source filter (optional): `source` in {google, yelp, manual, ocr, email}
- Buttons: **Refresh**, **Export CSV**

### Section A — Sync Health (ops + customer confidence)
**Cards (per business; optionally per location table below):**
- Last Google sync (per enabled location): `Location.lastGbpSyncAt` (or whichever field you already store; if not present use latest successful sync audit event)
- Last sync error: `Location.lastGbpSyncError` (or derive from latest `AlertEvent` type=integration_error)
- Reviews fetched (range): count of `Review` created in range
- Sync failures (range): count of `AlertEvent` where `type in (integration_sync_failed, ocr_failed, ingest_failed)`

**Table: Locations**
Columns: Location name | Source enabled | Last sync | Last error | Reviews (range) | Negatives (range)

**Derivations**
- Reviews(range) = `Review.count({ where: { businessId, locationId?, createdAt between start/end } })`
- Negatives(range) = `Review.count({ where: { sentiment: 'negative', createdAt between start/end } })` (or rating <=2 OR sentiment negative; keep consistent with escalation rule)

---

## Section B — Activation Funnel (value delivery)
**Funnel definition (keep consistent across UI + reports):**
- **Ingested**: Review exists in DB with `createdAt` in range.
- **Drafted**: Review has ≥1 DraftReply created (status any) in range OR created at any time but review in range. Prefer: DraftReply createdAt in range for “work done this period.”
- **Approved**: DraftReply status transitioned to approved in range.
- **Posted**: DraftReply marked posted (manual/API) in range.

**Recommended time-window semantics**
For a date filter `[start,end]`, show:
- Ingested = reviews created in range
- Drafted/Approved/Posted = events that happened in range (draft created, approvedAt, postedAt)
This answers: “What work did the system/users do this period?” and avoids weirdness when old reviews get processed later.

**Cards**
- Ingested
- Drafted
- Approved
- Posted
- Approval rate = Approved / Drafted
- Post rate = Posted / Approved

**Prisma queries (examples)**
- Ingested:
  - `prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })`
- Drafted:
  - `prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })`
- Approved:
  - Use DraftReply `approvedAt` if exists:
  - `prisma.draftReply.count({ where: { businessId, locationId?, approvedAt: { gte: start, lte: end } } })`
  - If approval stored only in AuditLog, then count distinct draftReplyId with action=APPROVED.
- Posted:
  - `prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: start, lte: end } } })`

**Tooltip copy (paste into UI)**
- Ingested: “New reviews captured in this period from Google/Yelp/manual sources.”
- Drafted: “AI draft replies generated in this period (may include drafts for older reviews).”
- Approved: “Draft replies a human approved in this period.”
- Posted: “Replies marked as posted (manual copy/paste or API) in this period.”

---

## Section C — Response Time + SLA
**Metrics**
- Median response time (posted replies only)
- P90 response time (posted replies only)
- Negative first-response time (median)
- SLA breaches count (e.g., negative reviews not posted within X hours)

**Definitions**
- Response time for a posted reply = `postedAt - Review.createdAt`
- Exclude: rejected drafts, approved but never posted.
- For multiple drafts per review: pick first posted reply.

**Prisma approach**
1) Fetch posted drafts in range (or whose postedAt in range) joined with review createdAt.
2) Compute durations in app code (Node) and calculate median/p90.

Pseudo:
- `postedDrafts = prisma.draftReply.findMany({ where: { businessId, locationId?, postedAt: { gte: start, lte: end }, status: { in: ['posted_manual','posted_api'] } }, select: { postedAt: true, review: { select: { createdAt: true, sentiment: true, rating: true } } } })`
- Durations = `postedAt - review.createdAt` in minutes/hours.

**SLA breaches**
- If you store `EscalationRule.slaHours`, compute breaches among negatives:
  - reviews negative in range with no posted reply within slaHours.
  - Query negatives, left-join first posted draft; compute breaches in code.

---

## Section D — Themes + Sentiment Breakdown
**Charts/Tables**
- Sentiment counts: positive/neutral/negative
- Rating distribution (1–5)
- Top categories/themes (service/price/staff/quality/cleanliness/wait_time/other)

**Query**
- Sentiment: groupBy sentiment over `Review` createdAt range.
- Themes: if `Review.categoryLabels` is array, do counting in code by iterating reviews in range selecting only labels.

---

## Section E — Alerts and Escalations
**Cards**
- Alerts sent (range)
- Unique reviews escalated (range)
- OCR failures (range)
- Integration sync failures (range)

**Query**
- `prisma.alertEvent.count({ where: { businessId, createdAt: { gte: start, lte: end } } })`
- Group by `type` if available; else filter per type.

---

## APIs (App Router)
### GET /api/admin/metrics?start=ISO&end=ISO&locationId=...&source=...
Returns JSON:
```json
{
  "range": {"start":"...","end":"..."},
  "funnel": {"ingested":0,"drafted":0,"approved":0,"posted":0,"approvalRate":0,"postRate":0},
  "syncHealth": {"locations": [/* rows */], "failures": {"integration":0,"ocr":0}},
  "sentiment": {"positive":0,"neutral":0,"negative":0},
  "ratings": {"1":0,"2":0,"3":0,"4":0,"5":0},
  "themes": [{"label":"service","count":0}],
  "responseTime": {"medianHours":0,"p90Hours":0,"negativeMedianHours":0,"slaBreaches":0},
  "alerts": {"total":0,"byType":[{"type":"...","count":0}]}
}
```

### GET /api/admin/metrics.csv?start=...&end=...
Streams a CSV suitable for quick debugging in Sheets.
Recommended rows:
- One row per day (or per week) with: date, ingested, drafted, approved, posted, negative_count, avg_rating, alerts
- Plus a second sheet-like section is hard in CSV; keep it simple.

**Validation + RBAC**
- Use Zod on querystring.
- Ensure logged-in user is a `UserBusinessMembership` for the business in session.

---

## UI Implementation Notes (fast)
- Use server components for initial render + one client component for date/location filters.
- For charts, choose simplest: small bar charts via lightweight library OR pure HTML tables for MVP. Reliability > visuals.
- Add a “Definitions” accordion that contains the tooltip copy above.

---

## Customer-Facing Copy Snippet (for the dashboard header)
“Reputation Autopilot metrics show how many reviews we captured, how many replies were drafted, and how quickly your team approved/posted responses. Use this to confirm responsiveness (which impacts conversions) and to spot location-level issues early. Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-zsng1spf.picard.replit.dev/sites/1”

---

## Acceptance Criteria
- Dashboard loads in <2s for a business with up to ~10k reviews (30-day range). If slow, add simple indexes (createdAt, businessId, locationId).
- Metrics match weekly report definitions for sentiment/rating/response time.
- CSV export works and respects RBAC.
- No new paid services required.