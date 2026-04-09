# Metrics Dashboard Implementation (Next.js + Prisma) — Code Skeleton + Queries + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:19:29.182Z

---

Below is build-ready implementation content for the /app/admin/metrics page and supporting endpoints. It assumes the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) Routes
- GET /app/admin/metrics
- GET /api/admin/metrics?from=ISO&to=ISO&locationId=...&tz=America/New_York
- GET /api/admin/metrics.csv?from=ISO&to=ISO&locationId=...&tz=...

2) Shared query validation (lib/metrics/params.ts)
```ts
import { z } from "zod";

export const MetricsQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  locationId: z.string().min(1).optional(),
  tz: z.string().min(1).default("UTC"),
});

export type MetricsQuery = z.infer<typeof MetricsQuerySchema>;

export function resolveRange(q: MetricsQuery) {
  const now = new Date();
  const to = q.to ? new Date(q.to) : now;
  const from = q.from ? new Date(q.from) : new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { from, to };
}
```

3) RBAC helper (lib/auth/rbac.ts)
```ts
import { prisma } from "@/lib/db";

export async function requireBusinessMember(userId: string, businessId: string) {
  const m = await prisma.userBusinessMembership.findFirst({
    where: { userId, businessId },
    select: { id: true, role: true },
  });
  if (!m) throw new Error("Forbidden");
  return m;
}
```

4) Metrics aggregation (lib/metrics/aggregate.ts)
Definitions:
- ingested: Review.createdAt within [from,to]
- drafted: DraftReply.createdAt within [from,to]
- approved: DraftReply.status == 'approved' and approvedAt within [from,to]
- posted: DraftReply.postedAt within [from,to] and status in ('posted_manual','posted_api')
- response_time: postedAt - Review.createdAt for reviews that have a posted reply
- negative_share: reviews with sentiment == 'negative' OR rating <= 2 divided by total ingested

```ts
import { prisma } from "@/lib/db";

export async function getMetrics({ businessId, from, to, locationId }: {
  businessId: string; from: Date; to: Date; locationId?: string;
}) {
  const reviewWhere: any = { businessId, createdAt: { gte: from, lte: to } };
  if (locationId) reviewWhere.locationId = locationId;

  const draftWhere: any = { businessId, createdAt: { gte: from, lte: to } };
  if (locationId) draftWhere.locationId = locationId;

  const [
    ingestedCount,
    ingestedAvgRating,
    negativeCountBySentiment,
    negativeCountByRating,
    draftedCount,
    approvedCount,
    postedCount,
    alertsCount,
    topThemes,
    responseTimes,
    syncHealthLocations,
    weeklyReports,
  ] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } }),
    prisma.review.count({ where: { ...reviewWhere, sentiment: "negative" } }),
    prisma.review.count({ where: { ...reviewWhere, rating: { lte: 2 } } }),
    prisma.draftReply.count({ where: draftWhere }),
    prisma.draftReply.count({ where: { ...draftWhere, status: "approved", approvedAt: { gte: from, lte: to } } }),
    prisma.draftReply.count({ where: { businessId, locationId, postedAt: { gte: from, lte: to }, status: { in: ["posted_manual","posted_api"] } } }),
    prisma.alertEvent.count({ where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId ? { locationId } : {}) } }),
    prisma.review.groupBy({
      by: ["category"],
      where: reviewWhere,
      _count: { _all: true },
      orderBy: { _count: { _all: "desc" } },
      take: 8,
    }),
    prisma.draftReply.findMany({
      where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ["posted_manual","posted_api"] }, ...(locationId ? { locationId } : {}) },
      select: { postedAt: true, review: { select: { createdAt: true } } },
      take: 5000,
    }),
    prisma.location.findMany({
      where: { businessId, ...(locationId ? { id: locationId } : {}) },
      select: { id: true, name: true, lastGbpReviewSyncAt: true, lastGbpReviewSyncError: true, lastGbpReviewSyncUpdateTime: true },
      orderBy: { name: "asc" },
    }),
    prisma.weeklyReport.findMany({
      where: { businessId, createdAt: { gte: from, lte: to } },
      select: { id: true, weekStart: true, weekEnd: true, sentAt: true, status: true },
      orderBy: { weekStart: "desc" },
      take: 8,
    })
  ]);

  const negativeCount = Math.max(negativeCountBySentiment, negativeCountByRating);
  const negativeShare = ingestedCount > 0 ? negativeCount / ingestedCount : 0;

  const responseMins = responseTimes
    .map((d) => (d.postedAt.getTime() - d.review.createdAt.getTime()) / 60000)
    .filter((x) => Number.isFinite(x) && x >= 0);
  responseMins.sort((a,b)=>a-b);
  const p50 = percentile(responseMins, 0.5);
  const p90 = percentile(responseMins, 0.9);

  const funnel = {
    ingested: ingestedCount,
    drafted: draftedCount,
    approved: approvedCount,
    posted: postedCount,
    draftedRate: ingestedCount ? draftedCount/ingestedCount : 0,
    approvedRate: draftedCount ? approvedCount/draftedCount : 0,
    postedRate: approvedCount ? postedCount/approvedCount : 0,
  };

  return {
    range: { from: from.toISOString(), to: to.toISOString() },
    summary: {
      ingestedCount,
      avgRating: ingestedAvgRating._avg.rating ?? null,
      negativeShare,
      alertsCount,
      responseTime: {
        count: responseMins.length,
        p50Minutes: p50,
        p90Minutes: p90,
      },
    },
    funnel,
    topThemes: topThemes.map(t => ({ theme: t.category ?? "other", count: t._count._all })),
    syncHealth: syncHealthLocations,
    weeklyReports,
  };
}

function percentile(arr: number[], p: number) {
  if (!arr.length) return null;
  const idx = Math.floor((arr.length - 1) * p);
  return Math.round(arr[idx] * 10) / 10;
}
```

5) API route: /api/admin/metrics (app/api/admin/metrics/route.ts)
```ts
import { NextResponse } from "next/server";
import { MetricsQuerySchema, resolveRange } from "@/lib/metrics/params";
import { getSessionUser } from "@/lib/auth/session";
import { requireBusinessMember } from "@/lib/auth/rbac";
import { getMetrics } from "@/lib/metrics/aggregate";

export async function GET(req: Request) {
  const user = await getSessionUser();
  const url = new URL(req.url);
  const businessId = url.searchParams.get("businessId");
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 });

  await requireBusinessMember(user.id, businessId);

  const parsed = MetricsQuerySchema.safeParse({
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    locationId: url.searchParams.get("locationId") ?? undefined,
    tz: url.searchParams.get("tz") ?? undefined,
  });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { from, to } = resolveRange(parsed.data);
  const data = await getMetrics({ businessId, from, to, locationId: parsed.data.locationId });
  return NextResponse.json(data);
}
```

6) CSV export: /api/admin/metrics.csv (app/api/admin/metrics.csv/route.ts)
```ts
import { NextResponse } from "next/server";
import { MetricsQuerySchema, resolveRange } from "@/lib/metrics/params";
import { getSessionUser } from "@/lib/auth/session";
import { requireBusinessMember } from "@/lib/auth/rbac";
import { getMetrics } from "@/lib/metrics/aggregate";

function csvEscape(v: any) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes("\n") || s.includes('"')) return '"' + s.replaceAll('"','""') + '"';
  return s;
}

export async function GET(req: Request) {
  const user = await getSessionUser();
  const url = new URL(req.url);
  const businessId = url.searchParams.get("businessId");
  if (!businessId) return new NextResponse("businessId required", { status: 400 });
  await requireBusinessMember(user.id, businessId);

  const parsed = MetricsQuerySchema.parse({
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    locationId: url.searchParams.get("locationId") ?? undefined,
    tz: url.searchParams.get("tz") ?? undefined,
  });
  const { from, to } = resolveRange(parsed);
  const m = await getMetrics({ businessId, from, to, locationId: parsed.locationId });

  const rows: Array<[string,string,any]> = [
    ["summary","ingestedCount", m.summary.ingestedCount],
    ["summary","avgRating", m.summary.avgRating],
    ["summary","negativeShare", m.summary.negativeShare],
    ["summary","alertsCount", m.summary.alertsCount],
    ["summary","responseP50Minutes", m.summary.responseTime.p50Minutes],
    ["summary","responseP90Minutes", m.summary.responseTime.p90Minutes],
    ["funnel","drafted", m.funnel.drafted],
    ["funnel","approved", m.funnel.approved],
    ["funnel","posted", m.funnel.posted],
    ["funnel","draftedRate", m.funnel.draftedRate],
    ["funnel","approvedRate", m.funnel.approvedRate],
    ["funnel","postedRate", m.funnel.postedRate],
  ];

  for (const t of m.topThemes) rows.push(["theme", t.theme, t.count]);

  const header = "section,key,value\n";
  const body = rows.map(r => r.map(csvEscape).join(",")).join("\n");
  const csv = header + body + "\n";

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename=metrics_${from.toISOString()}_${to.toISOString()}.csv`,
    },
  });
}
```

7) Metrics page UI outline (app/app/admin/metrics/page.tsx)
- Server component reads businessId from session context.
- Renders filter controls (date picker, location dropdown) and fetches JSON from /api/admin/metrics.
- Displays:
  - Sync Health table: location name, last sync at, last error, watermark.
  - Funnel cards: ingested/drafted/approved/posted + rates.
  - Response time: p50/p90.
  - Alerts count.
  - Top themes list.
  - Buttons: “Download CSV” linking to /api/admin/metrics.csv with current filters.

This content is sufficient to implement the dashboard quickly with no new infrastructure. It leverages existing data (Review/DraftReply/AlertEvent/WeeklyReport/Location) and is safe to expose to customers due to RBAC + param validation.