# Build Artifact: Admin Metrics Dashboard (Routes, APIs, Prisma Aggregations, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:51:19.822Z

---

# Admin Metrics Dashboard — Build Artifact (ready to paste)

This artifact documents the implemented MVP metrics dashboard: routes, endpoint contracts, Prisma queries (TypeScript), and UI copy/definitions. It assumes Next.js App Router + Prisma. Replace model/field names if yours differ.

---

## 1) Routes

### Page
- `GET /app/admin/metrics`
  - Server page with filters: date range (from/to), locationId (optional), sentiment (optional), source (optional)
  - Renders sections:
    1) Sync Health
    2) Activation Funnel
    3) Alerts & Guardrails
  - “Export CSV” button -> `/api/admin/metrics.csv?...`

### APIs
- `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...`
  - Returns JSON payload used by the page
- `GET /api/admin/metrics.csv?from=...&to=...&locationId=...`
  - Returns `text/csv` with same metrics

RBAC: user must be a member of the Business they’re querying.

---

## 2) KPI Definitions (UI tooltips)

Use these consistent definitions in UI:

- **Ingested**: reviews created in DB during the selected window (`Review.createdAt` within range) regardless of source.
- **Drafted**: reviews with at least one `DraftReply` created during the window.
- **Approved**: `DraftReply.status = 'approved'` updated during the window.
- **Posted**: `DraftReply.postedAt` within the window (manual or API).
- **Time to first draft**: `DraftReply.createdAt - Review.createdAt` for the earliest draft per review.
- **Time to post**: `DraftReply.postedAt - Review.createdAt` (exclude rejected/never-posted).
- **Negative share**: count of reviews where (`sentiment='negative' OR rating<=2`) divided by total ingested.
- **Top themes**: frequency of category labels on reviews in window (service/price/staff/quality/cleanliness/wait_time/other).
- **Sync health**: last successful sync time per location, last error (if any), and consecutive failures (if tracked).
- **Guardrail blocks**: count of approve attempts blocked by policy checks (PII/banned phrases), derived from `AuditLog` events.

---

## 3) JSON Contract (/api/admin/metrics)

```json
{
  "range": {"from":"2026-04-01","to":"2026-04-08"},
  "totals": {
    "ingested": 120,
    "drafted": 98,
    "approved": 75,
    "posted": 60,
    "negativeShare": 0.12,
    "medianTimeToDraftMinutes": 34,
    "p95TimeToDraftMinutes": 240,
    "medianTimeToPostMinutes": 180,
    "p95TimeToPostMinutes": 1440
  },
  "byLocation": [
    {
      "locationId":"loc_...",
      "name":"Main St",
      "ingested":40,
      "drafted":35,
      "approved":30,
      "posted":22,
      "negativeShare":0.10,
      "lastSyncAt":"2026-04-08T12:00:00Z",
      "lastSyncError":null
    }
  ],
  "themes": [{"label":"staff","count":22},{"label":"service","count":19}],
  "alerts": {
    "negativeReviewAlerts": 6,
    "syncFailureAlerts": 1,
    "ocrFailureAlerts": 0,
    "guardrailBlocks": 3
  },
  "timeSeries": {
    "daily": [
      {"date":"2026-04-01","ingested":10,"posted":4,"avgRating":4.6,"negative":1}
    ]
  }
}
```

---

## 4) Prisma/TypeScript Aggregations (server-side)

> Notes:
> - Use a default range of last 30 days if not provided.
> - Enforce max range 180 days to avoid heavy scans.
> - Filter by `businessId` always.

### Helpers

```ts
export function clampDateRange(inputFrom?: string, inputTo?: string) {
  const now = new Date();
  const to = inputTo ? new Date(inputTo) : now;
  const from = inputFrom ? new Date(inputFrom) : new Date(now.getTime() - 30*24*60*60*1000);
  if (to < from) throw new Error("Invalid date range");
  const maxMs = 180*24*60*60*1000;
  if (to.getTime() - from.getTime() > maxMs) throw new Error("Date range too large");
  return { from, to };
}

function minutesBetween(a: Date, b: Date) {
  return Math.max(0, Math.round((a.getTime() - b.getTime())/60000));
}

function percentile(sorted: number[], p: number) {
  if (sorted.length === 0) return null;
  const idx = Math.min(sorted.length-1, Math.max(0, Math.floor(p * (sorted.length-1))));
  return sorted[idx];
}
```

### Core query (totals)

```ts
// Inputs: prisma, businessId, optional locationId, {from,to}
const reviewWhere: any = {
  businessId,
  createdAt: { gte: from, lte: to },
  ...(locationId ? { locationId } : {})
};

const ingested = await prisma.review.count({ where: reviewWhere });

// Drafted = reviews that have draft replies created in window
const drafted = await prisma.draftReply.count({
  where: {
    businessId,
    createdAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {})
  }
});

const approved = await prisma.draftReply.count({
  where: {
    businessId,
    status: "approved",
    updatedAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {})
  }
});

const posted = await prisma.draftReply.count({
  where: {
    businessId,
    postedAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {})
  }
});

const negativeCount = await prisma.review.count({
  where: {
    ...reviewWhere,
    OR: [{ sentiment: "negative" }, { rating: { lte: 2 } }]
  }
});

const negativeShare = ingested ? negativeCount / ingested : 0;
```

### Time-to-first-draft + time-to-post

```ts
// Fetch minimal fields; limit to avoid huge payloads (range already clamped)
const reviews = await prisma.review.findMany({
  where: reviewWhere,
  select: { id: true, createdAt: true },
  take: 5000
});

const reviewIds = reviews.map(r => r.id);

// Earliest draft per review
const firstDrafts = await prisma.draftReply.findMany({
  where: { businessId, reviewId: { in: reviewIds } },
  select: { reviewId: true, createdAt: true },
  orderBy: { createdAt: "asc" }
});

const firstDraftMap = new Map<string, Date>();
for (const d of firstDrafts) if (!firstDraftMap.has(d.reviewId)) firstDraftMap.set(d.reviewId, d.createdAt);

const ttd: number[] = [];
for (const r of reviews) {
  const dAt = firstDraftMap.get(r.id);
  if (dAt) ttd.push(minutesBetween(dAt, r.createdAt));
}

ttd.sort((a,b)=>a-b);
const medianTimeToDraftMinutes = percentile(ttd, 0.5);
const p95TimeToDraftMinutes = percentile(ttd, 0.95);

// Time to post: choose first posted draft per review
const postedDrafts = await prisma.draftReply.findMany({
  where: {
    businessId,
    reviewId: { in: reviewIds },
    postedAt: { not: null }
  },
  select: { reviewId: true, postedAt: true },
  orderBy: [{ postedAt: "asc" }]
});

const firstPostMap = new Map<string, Date>();
for (const p of postedDrafts) if (p.postedAt && !firstPostMap.has(p.reviewId)) firstPostMap.set(p.reviewId, p.postedAt);

const ttp: number[] = [];
for (const r of reviews) {
  const pAt = firstPostMap.get(r.id);
  if (pAt) ttp.push(minutesBetween(pAt, r.createdAt));
}

ttp.sort((a,b)=>a-b);
const medianTimeToPostMinutes = percentile(ttp, 0.5);
const p95TimeToPostMinutes = percentile(ttp, 0.95);
```

### Themes

```ts
// If you store category labels as string[] on Review (e.g., categories)
const themeRows = await prisma.review.findMany({
  where: reviewWhere,
  select: { categories: true }
});

const themeCounts: Record<string, number> = {};
for (const row of themeRows) {
  for (const c of (row.categories ?? [])) themeCounts[c] = (themeCounts[c] ?? 0) + 1;
}

const themes = Object.entries(themeCounts)
  .map(([label,count]) => ({ label, count }))
  .sort((a,b)=>b.count-a.count)
  .slice(0,10);
```

### Alerts & guardrail blocks

```ts
const negativeReviewAlerts = await prisma.alertEvent.count({
  where: { businessId, type: "negative_review", createdAt: { gte: from, lte: to } }
});
const syncFailureAlerts = await prisma.alertEvent.count({
  where: { businessId, type: "sync_failure", createdAt: { gte: from, lte: to } }
});
const ocrFailureAlerts = await prisma.alertEvent.count({
  where: { businessId, type: "ocr_failure", createdAt: { gte: from, lte: to } }
});

// Guardrail blocks recorded in AuditLog action = "draft_approve_blocked" (example)
const guardrailBlocks = await prisma.auditLog.count({
  where: { businessId, action: "draft_approve_blocked", createdAt: { gte: from, lte: to } }
});
```

### Sync health (per-location)

```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId ? { id: locationId } : {}) },
  select: {
    id: true,
    name: true,
    lastGbpSyncAt: true,
    lastGbpSyncError: true
  }
});
```

---

## 5) CSV Export Format

Header rows (example):

- `from,to,locationId,locationName,ingested,drafted,approved,posted,negativeShare,medianTTDMinutes,p95TTDMinutes,medianTTPMinutes,p95TTPMinutes,lastSyncAt,lastSyncError,negativeReviewAlerts,syncFailureAlerts,ocrFailureAlerts,guardrailBlocks`

Include one row per location plus an optional TOTAL row.

---

## 6) Customer-facing copy blocks (for UI)

### Metrics page intro
“See whether reviews are syncing, how fast your team is responding, and what themes customers mention most. Export CSV to share with stakeholders or your agency.”

### Sync Health empty state
“No integrations have synced yet. Connect Google Business Profile in Integrations, or import reviews via email/CSV/screenshot.”

### Funnel notes
“Posted counts include manual copy/paste posts recorded in the audit trail. Response-time metrics exclude rejected or never-posted drafts.”

---

## 7) Pilot onboarding email (use these assets)

Subject: “Your Review Reply Autopilot is ready — connect Google in 3 minutes”

Body:

Hi {{FirstName}},

Your AI Review Reply & Reputation Autopilot workspace is live.

1) Connect Google Business Profile: log in → Integrations → Google → Connect, then select the locations you want to sync.
2) Within a few minutes, new reviews will appear in the Review Queue with draft replies.
3) Approve/edit in one click. If you can’t post via API, use the guided copy/paste flow—every post is tracked in the audit log.
4) Negative reviews trigger immediate alerts to your escalation recipients.
5) Every week you’ll receive a KPI report (rating trend, response time, negative share, and top themes).

You can share this URL internally as proof of legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-qfdl4ouo.picard.replit.dev/sites/1

Reply to this email if you want us to verify your integration or import past reviews for baseline reporting: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob
