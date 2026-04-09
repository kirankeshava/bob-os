# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Ready Code Skeleton + Queries

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:55:42.094Z

---

Below is a build-ready implementation skeleton (routes, APIs, Prisma queries) for the MVP metrics dashboard. It assumes your existing tables: Business, Location, Review, DraftReply, AlertEvent, AuditLog, and membership-based RBAC.

1) ROUTES
- UI page: app/app/admin/metrics/page.tsx
- JSON API: app/api/admin/metrics/route.ts
- CSV export: app/api/admin/metrics.csv/route.ts

2) KPI DEFINITIONS (used consistently across UI + APIs)
- Ingested: Reviews.createdAt within [from,to]
- Drafted: DraftReply.createdAt within [from,to] (or DraftReply.reviewId belongs to ingested reviews if you prefer cohort mode; MVP uses time-window mode)
- Approved: DraftReply.approvedAt within [from,to]
- Posted: DraftReply.postedAt within [from,to] OR DraftReply.status in {posted_api, posted_manual} with postedAt
- Response time (median + p90): for posted replies only, postedAt - Review.createdAt; exclude rejected/unposted drafts.
- Negative share: Reviews where (rating <= 2) OR sentiment = 'negative' divided by total ingested in window.
- Top themes: count of category labels on Reviews within window.

3) QUERY VALIDATION (shared)
Create a helper: lib/metrics/params.ts

```ts
import { z } from "zod";

export const MetricsParamsSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
  locationId: z.string().uuid().optional(),
});

export type MetricsParams = z.infer<typeof MetricsParamsSchema>;

export function clampWindow(from: Date, to: Date) {
  const maxDays = 120; // defensive cap
  const ms = to.getTime() - from.getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  if (days > maxDays) {
    const newFrom = new Date(to);
    newFrom.setDate(to.getDate() - maxDays);
    return { from: newFrom, to };
  }
  return { from, to };
}
```

4) JSON API: /api/admin/metrics
app/api/admin/metrics/route.ts

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MetricsParamsSchema, clampWindow } from "@/lib/metrics/params";
import { requireBusinessMember } from "@/lib/auth/requireBusinessMember";

export async function GET(req: Request) {
  const { businessId } = await requireBusinessMember();

  const url = new URL(req.url);
  const parsed = MetricsParamsSchema.safeParse({
    from: url.searchParams.get("from"),
    to: url.searchParams.get("to"),
    locationId: url.searchParams.get("locationId") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const from0 = new Date(parsed.data.from);
  const to0 = new Date(parsed.data.to);
  const { from, to } = clampWindow(from0, to0);

  const locationFilter = parsed.data.locationId
    ? { locationId: parsed.data.locationId }
    : { location: { businessId } };

  // Sync health per location
  const locations = await prisma.location.findMany({
    where: { businessId, ...(parsed.data.locationId ? { id: parsed.data.locationId } : {}) },
    select: {
      id: true,
      name: true,
      integrationEnabled: true,
      lastGbpSyncAt: true,
      lastGbpSyncError: true,
      lastGbpReviewSyncUpdateTime: true,
    },
    orderBy: { name: "asc" },
  });

  // Funnel counts
  const [ingested, drafted, approved, posted] = await Promise.all([
    prisma.review.count({ where: { ...locationFilter, createdAt: { gte: from, lte: to } } }),
    prisma.draftReply.count({ where: { review: locationFilter, createdAt: { gte: from, lte: to } } }),
    prisma.draftReply.count({ where: { review: locationFilter, approvedAt: { gte: from, lte: to } } }),
    prisma.draftReply.count({ where: { review: locationFilter, postedAt: { gte: from, lte: to }, status: { in: ["posted_manual","posted_api"] } } }),
  ]);

  // Ratings + negative share
  const reviews = await prisma.review.findMany({
    where: { ...locationFilter, createdAt: { gte: from, lte: to } },
    select: { rating: true, sentiment: true, categories: true, createdAt: true },
  });
  const total = reviews.length;
  const avgRating = total ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total : null;
  const negativeCount = reviews.filter(r => (r.rating ?? 0) <= 2 || r.sentiment === "negative").length;
  const negativeShare = total ? negativeCount / total : 0;

  // Theme counts
  const themeCounts: Record<string, number> = {};
  for (const r of reviews) {
    for (const c of (r.categories ?? [])) themeCounts[c] = (themeCounts[c] ?? 0) + 1;
  }
  const topThemes = Object.entries(themeCounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 8)
    .map(([theme, count]) => ({ theme, count }));

  // Response time (posted only)
  const postedRows = await prisma.draftReply.findMany({
    where: {
      review: locationFilter,
      postedAt: { gte: from, lte: to },
      status: { in: ["posted_manual","posted_api"] },
    },
    select: { postedAt: true, review: { select: { createdAt: true } } },
  });
  const deltas = postedRows
    .map(r => r.postedAt && r.review.createdAt ? (r.postedAt.getTime() - r.review.createdAt.getTime()) : null)
    .filter((n): n is number => typeof n === "number" && n >= 0)
    .sort((a,b) => a-b);

  function percentile(arr: number[], p: number) {
    if (!arr.length) return null;
    const idx = Math.floor((arr.length - 1) * p);
    return arr[idx];
  }
  const medianMs = percentile(deltas, 0.5);
  const p90Ms = percentile(deltas, 0.9);

  // Alerts volume
  const alerts = await prisma.alertEvent.findMany({
    where: { businessId, createdAt: { gte: from, lte: to }, ...(parsed.data.locationId ? { locationId: parsed.data.locationId } : {}) },
    select: { type: true, createdAt: true, status: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json({
    window: { from, to },
    syncHealth: locations,
    funnel: { ingested, drafted, approved, posted },
    reputation: { totalReviews: total, avgRating, negativeCount, negativeShare, topThemes },
    responseTime: { medianMs, p90Ms },
    alerts,
  });
}
```

5) CSV EXPORT: /api/admin/metrics.csv
This exports (a) aggregate KPI row and (b) review-level rows for debugging.

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MetricsParamsSchema, clampWindow } from "@/lib/metrics/params";
import { requireBusinessMember } from "@/lib/auth/requireBusinessMember";

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"','""')}"`;
  return s;
}

export async function GET(req: Request) {
  const { businessId } = await requireBusinessMember();
  const url = new URL(req.url);

  const parsed = MetricsParamsSchema.safeParse({
    from: url.searchParams.get("from"),
    to: url.searchParams.get("to"),
    locationId: url.searchParams.get("locationId") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { from, to } = clampWindow(new Date(parsed.data.from), new Date(parsed.data.to));

  const locationFilter = parsed.data.locationId
    ? { locationId: parsed.data.locationId }
    : { location: { businessId } };

  const reviews = await prisma.review.findMany({
    where: { ...locationFilter, createdAt: { gte: from, lte: to } },
    select: {
      id: true,
      source: true,
      rating: true,
      sentiment: true,
      categories: true,
      authorName: true,
      createdAt: true,
      location: { select: { name: true } },
      draftReplies: {
        select: { status: true, approvedAt: true, postedAt: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "reviewId","location","source","rating","sentiment","categories","authorName","reviewCreatedAt",
    "latestDraftStatus","approvedAt","postedAt"
  ].join(",");

  const lines = reviews.map(r => {
    const d = r.draftReplies[0];
    return [
      r.id,
      r.location?.name ?? "",
      r.source,
      r.rating ?? "",
      r.sentiment ?? "",
      (r.categories ?? []).join("|"),
      r.authorName ?? "",
      r.createdAt.toISOString(),
      d?.status ?? "",
      d?.approvedAt?.toISOString() ?? "",
      d?.postedAt?.toISOString() ?? "",
    ].map(csvEscape).join(",");
  });

  const body = [header, ...lines].join("\n");
  return new NextResponse(body, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename=metrics_${from.toISOString()}_${to.toISOString()}.csv`,
    },
  });
}
```

6) UI PAGE: /app/admin/metrics
- Server component reads searchParams (from,to,locationId), calls /api/admin/metrics, renders:
  - Sync Health table (location, enabled, last sync, last error)
  - Funnel cards (ingested/drafted/approved/posted) + conversion rates
  - Reputation cards (avg rating, negative share) + top themes list
  - Response time (median, p90)
  - Alerts table (type/status/time)
  - Buttons: Export CSV (links to /api/admin/metrics.csv with same params)

Also include a short “Need help?” block pointing to:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

7) NOTES
- This MVP intentionally uses simple aggregates in application code for top themes and response-time percentiles. If volume grows, move to SQL percentile functions or materialized rollups.
- Keep all metrics computed from the same sources as weekly reports to avoid “dashboard vs PDF mismatch.”
