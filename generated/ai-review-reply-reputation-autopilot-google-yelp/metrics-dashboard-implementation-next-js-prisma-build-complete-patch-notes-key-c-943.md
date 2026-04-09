# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Complete Patch Notes + Key Code

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:45:16.393Z

---

Below is the concrete, build-complete implementation outline (including key code) for the new in-app metrics dashboard. It assumes the existing Next.js App Router + Prisma + Postgres stack already present in the MVP.

1) Routes shipped
- UI page: /app/admin/metrics
- JSON API: /api/admin/metrics?from=2026-04-01&to=2026-04-08&locationId=optional
- CSV export: /api/admin/metrics.csv?from=...&to=...&locationId=optional
All routes are protected via existing membership RBAC: only users who are members of the Business (or admin) can access.

2) Query contract + validation (shared)
Create a shared validator:

```ts
// src/lib/validators/metrics.ts
import { z } from "zod";

export const metricsQuerySchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
  locationId: z.string().cuid().optional()
}).refine((v) => new Date(v.from) <= new Date(v.to), {
  message: "from must be <= to"
});
```

3) Aggregations (Prisma)
Key definitions:
- Ingested: Review.createdAt within range
- Drafted: has DraftReply.createdAt within range for reviews in range
- Approved: DraftReply.status == 'approved' and approvedAt within range
- Posted: DraftReply.postedAt within range OR status == 'posted_manual' with postedAt set
- Response time metrics:
  a) ingestToApproveMinutes: avg(approvedAt - review.createdAt)
  b) ingestToPostMinutes: avg(postedAt - review.createdAt) where postedAt exists
- Negative share: reviews with sentiment == 'negative' OR rating <= 2 divided by total in range
- Top themes: count of category labels from persisted Review.tags/categoryLabels

Example helper:

```ts
// src/lib/metrics/aggregate.ts
import { prisma } from "@/lib/prisma";

export async function getMetrics({ businessId, from, to, locationId }: {
  businessId: string; from: Date; to: Date; locationId?: string;
}) {
  const reviewWhere: any = {
    businessId,
    createdAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {})
  };

  const total = await prisma.review.count({ where: reviewWhere });
  const avgRatingAgg = await prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } });

  const negative = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [{ sentiment: "negative" }, { rating: { lte: 2 } }]
    }
  });

  // Draft funnel
  const drafted = await prisma.draftReply.count({
    where: {
      businessId,
      review: reviewWhere,
      createdAt: { gte: from, lte: to }
    }
  });

  const approved = await prisma.draftReply.count({
    where: {
      businessId,
      review: reviewWhere,
      status: "approved",
      approvedAt: { gte: from, lte: to }
    }
  });

  const posted = await prisma.draftReply.count({
    where: {
      businessId,
      review: reviewWhere,
      postedAt: { gte: from, lte: to }
    }
  });

  // Response times: compute from rows to avoid db-specific interval ops
  const timeRows = await prisma.draftReply.findMany({
    where: { businessId, review: reviewWhere },
    select: { approvedAt: true, postedAt: true, review: { select: { createdAt: true } } }
  });

  const toMinutes = (ms: number) => Math.round((ms / 60000) * 10) / 10;
  const ingestToApprove = timeRows
    .filter(r => r.approvedAt)
    .map(r => (r.approvedAt!.getTime() - r.review.createdAt.getTime()));
  const ingestToPost = timeRows
    .filter(r => r.postedAt)
    .map(r => (r.postedAt!.getTime() - r.review.createdAt.getTime()));

  const avg = (arr: number[]) => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : null;

  // Themes: pull tags/categories from Review
  const reviews = await prisma.review.findMany({
    where: reviewWhere,
    select: { categoryLabels: true }
  });
  const counts: Record<string, number> = {};
  for (const r of reviews) {
    for (const c of (r.categoryLabels ?? [])) counts[c] = (counts[c] || 0) + 1;
  }
  const topThemes = Object.entries(counts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0, 8)
    .map(([theme,count])=>({ theme, count }));

  // Alerts volume
  const alerts = await prisma.alertEvent.count({
    where: {
      businessId,
      createdAt: { gte: from, lte: to },
      ...(locationId ? { locationId } : {})
    }
  });

  return {
    range: { from: from.toISOString(), to: to.toISOString() },
    totals: {
      reviews: total,
      drafted,
      approved,
      posted,
      alerts
    },
    ratings: {
      avgRating: avgRatingAgg._avg.rating ?? null,
      negativeShare: total ? negative / total : 0,
      negativeCount: negative
    },
    responseTimes: {
      ingestToApproveMinutes: avg(ingestToApprove) ? toMinutes(avg(ingestToApprove)!) : null,
      ingestToPostMinutes: avg(ingestToPost) ? toMinutes(avg(ingestToPost)!) : null
    },
    topThemes
  };
}
```

4) API endpoints
JSON endpoint returns the structure above and logs context for debugging.

```ts
// src/app/api/admin/metrics/route.ts
import { NextResponse } from "next/server";
import { metricsQuerySchema } from "@/lib/validators/metrics";
import { getMetrics } from "@/lib/metrics/aggregate";
import { requireBusinessMember } from "@/lib/auth/requireBusinessMember";
import * as Sentry from "@sentry/nextjs";

export async function GET(req: Request) {
  try {
    const { user, businessId } = await requireBusinessMember();
    const { searchParams } = new URL(req.url);
    const parsed = metricsQuerySchema.parse({
      from: searchParams.get("from"),
      to: searchParams.get("to"),
      locationId: searchParams.get("locationId") || undefined
    });

    const metrics = await getMetrics({
      businessId,
      from: new Date(parsed.from),
      to: new Date(parsed.to),
      locationId: parsed.locationId
    });

    return NextResponse.json(metrics);
  } catch (e: any) {
    Sentry.captureException(e);
    return NextResponse.json({ error: e.message ?? "metrics_error" }, { status: 400 });
  }
}
```

CSV export provides row-level detail: reviewId/source/location/rating/sentiment/createdAt + draftedAt/approvedAt/postedAt + computed durations.

5) UI page (/app/admin/metrics)
- Date range picker (defaults last 7 days)
- Location dropdown (All locations + each enabled)
- KPI cards (reviews, avg rating, negative share, avg response times)
- Funnel table (ingested/drafted/approved/posted with conversion %)
- Alerts count
- Top themes table
- Buttons: “Export CSV” which hits /api/admin/metrics.csv with same params

6) Notes
- This dashboard is intentionally lightweight and reliable: no new infra, uses existing tables.
- CSV export is crucial for operator trust: it lets a business owner validate why KPIs look the way they do.
- Error handling is defensive (bad date range, missing RBAC, DB issues) and captured in Sentry for fast debugging.

If we proceed, the next engineering step is a “data freshness” widget plus a protected “trigger sync now” button so pilots can self-diagnose when Google API syncing is delayed or rate-limited.