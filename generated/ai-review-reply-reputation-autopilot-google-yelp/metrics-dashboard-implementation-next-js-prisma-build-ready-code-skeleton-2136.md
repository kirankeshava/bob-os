# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Ready Code Skeleton

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:51:53.172Z

---

Below is a concrete, paste-ready implementation outline for the MVP metrics dashboard. It assumes existing tables: Business, Location, Integration, Review, DraftReply, AuditLog, AlertEvent. It also assumes RBAC already exists via UserBusinessMembership.

1) Route: /app/admin/metrics/page.tsx

- Purpose: Render metrics UI (server component) with filter controls and data tables.
- Inputs (query params):
  - from: ISO date (default: last 14 days)
  - to: ISO date (default: now)
  - locationId: optional

Pseudo-code:

```ts
// app/admin/metrics/page.tsx
import { requireBusinessMember } from "@/lib/auth";
import { getMetrics } from "@/lib/metrics/getMetrics";

export default async function MetricsPage({ searchParams }) {
  const { businessId } = await requireBusinessMember();
  const from = searchParams.from ? new Date(searchParams.from) : new Date(Date.now() - 14*24*3600*1000);
  const to = searchParams.to ? new Date(searchParams.to) : new Date();
  const locationId = searchParams.locationId ?? null;

  const metrics = await getMetrics({ businessId, from, to, locationId });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Metrics</h1>
      {/* Filters */}
      <form className="flex gap-2 items-end">
        <label className="text-sm">From<input name="from" type="date" defaultValue={toDateInput(from)} /></label>
        <label className="text-sm">To<input name="to" type="date" defaultValue={toDateInput(to)} /></label>
        <label className="text-sm">Location<select name="locationId" defaultValue={locationId ?? ""}>{/* options */}</select></label>
        <button className="btn">Apply</button>
        <a className="btn" href={`/api/admin/metrics.csv?from=${from.toISOString()}&to=${to.toISOString()}&locationId=${locationId ?? ""}`}>Export CSV</a>
      </form>

      {/* Sync Health */}
      <section className="card">
        <h2 className="font-medium">Sync health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Kpi label="Locations enabled" value={metrics.sync.enabledLocations} />
          <Kpi label="Locations failing" value={metrics.sync.failingLocations} />
          <Kpi label="Last successful sync" value={metrics.sync.lastSuccessfulSyncAt ? fmt(metrics.sync.lastSuccessfulSyncAt) : "—"} />
        </div>
        <table className="table mt-4">
          <thead><tr><th>Location</th><th>Enabled</th><th>Last sync</th><th>Last error</th></tr></thead>
          <tbody>
            {metrics.sync.perLocation.map(r => (
              <tr key={r.locationId}>
                <td>{r.locationName}</td>
                <td>{r.syncEnabled ? "Yes" : "No"}</td>
                <td>{r.lastSyncAt ? fmt(r.lastSyncAt) : "—"}</td>
                <td className="text-red-600">{r.lastError ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Funnel */}
      <section className="card">
        <h2 className="font-medium">Activation funnel</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Ingested" value={metrics.funnel.ingested} />
          <Kpi label="Drafted" value={metrics.funnel.drafted} />
          <Kpi label="Approved" value={metrics.funnel.approved} />
          <Kpi label="Posted" value={metrics.funnel.posted} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Kpi label="Median response time" value={metrics.funnel.medianResponseHours != null ? `${metrics.funnel.medianResponseHours.toFixed(1)}h` : "—"} />
          <Kpi label="P90 response time" value={metrics.funnel.p90ResponseHours != null ? `${metrics.funnel.p90ResponseHours.toFixed(1)}h` : "—"} />
          <Kpi label="Negative share" value={`${(metrics.funnel.negativeShare*100).toFixed(1)}%`} />
        </div>
      </section>

      {/* Alerts */}
      <section className="card">
        <h2 className="font-medium">Alerts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Total alerts" value={metrics.alerts.total} />
          <Kpi label="Neg review alerts" value={metrics.alerts.negativeReview} />
          <Kpi label="Sync failure alerts" value={metrics.alerts.syncFailure} />
          <Kpi label="OCR failure alerts" value={metrics.alerts.ocrFailure} />
        </div>
      </section>

      {/* Themes */}
      <section className="card">
        <h2 className="font-medium">Top themes</h2>
        <table className="table mt-2">
          <thead><tr><th>Theme</th><th>Count</th><th>Negative %</th></tr></thead>
          <tbody>
            {metrics.themes.map(t => (
              <tr key={t.theme}>
                <td>{t.theme}</td>
                <td>{t.count}</td>
                <td>{(t.negativeShare*100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
```

2) API: /api/admin/metrics (JSON)

- Validates params with zod.
- Applies RBAC: requester must be a member of businessId (derived from session).
- Uses a shared getMetrics() function.

```ts
// app/api/admin/metrics/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireBusinessMember } from "@/lib/auth";
import { getMetrics } from "@/lib/metrics/getMetrics";

const Q = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  locationId: z.string().uuid().optional().or(z.literal(""))
});

export async function GET(req: Request) {
  const { businessId } = await requireBusinessMember();
  const { searchParams } = new URL(req.url);
  const parsed = Q.parse({
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    locationId: searchParams.get("locationId") ?? ""
  });
  const from = parsed.from ? new Date(parsed.from) : new Date(Date.now() - 14*24*3600*1000);
  const to = parsed.to ? new Date(parsed.to) : new Date();
  const locationId = parsed.locationId ? parsed.locationId : null;

  const data = await getMetrics({ businessId, from, to, locationId });
  return NextResponse.json(data);
}
```

3) API: /api/admin/metrics.csv (CSV)

- Same filters.
- Returns `text/csv`.

```ts
// app/api/admin/metrics.csv/route.ts
import { NextResponse } from "next/server";
import { requireBusinessMember } from "@/lib/auth";
import { getMetrics } from "@/lib/metrics/getMetrics";

export async function GET(req: Request) {
  const { businessId } = await requireBusinessMember();
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") ? new Date(searchParams.get("from")!) : new Date(Date.now()-14*24*3600*1000);
  const to = searchParams.get("to") ? new Date(searchParams.get("to")!) : new Date();
  const locationId = (searchParams.get("locationId") || "") || null;

  const m = await getMetrics({ businessId, from, to, locationId });

  const rows: string[][] = [];
  rows.push(["metric","value"]);
  rows.push(["enabled_locations", String(m.sync.enabledLocations)]);
  rows.push(["failing_locations", String(m.sync.failingLocations)]);
  rows.push(["ingested", String(m.funnel.ingested)]);
  rows.push(["drafted", String(m.funnel.drafted)]);
  rows.push(["approved", String(m.funnel.approved)]);
  rows.push(["posted", String(m.funnel.posted)]);
  rows.push(["median_response_hours", m.funnel.medianResponseHours == null ? "" : String(m.funnel.medianResponseHours)]);
  rows.push(["p90_response_hours", m.funnel.p90ResponseHours == null ? "" : String(m.funnel.p90ResponseHours)]);
  rows.push(["negative_share", String(m.funnel.negativeShare)]);

  rows.push([]);
  rows.push(["location_id","location_name","sync_enabled","last_sync_at","last_error"]);
  for (const l of m.sync.perLocation) {
    rows.push([l.locationId, l.locationName, String(l.syncEnabled), l.lastSyncAt?.toISOString() ?? "", l.lastError ?? ""]);
  }

  const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv" } });
}
```

4) Aggregations: lib/metrics/getMetrics.ts

Key KPI definitions (to match weekly report):
- Ingested = count(Review) createdAt between [from,to].
- Drafted = count(DraftReply) createdAt between [from,to] (or tied to reviews in range).
- Approved = count(AuditLog where action='draft.approve' and createdAt in range).
- Posted = count(DraftReply where status in posted_* and postedAt in range).
- Response time: for posted replies only: postedAt - Review.createdAt. Compute median/p90.
- Negative share: count(reviews where sentiment=negative OR rating<=2) / ingested.
- Themes: group by categoryLabels[] (or primaryCategory) joined to reviews in range.

Implementation should use Prisma groupBy where possible, otherwise raw SQL for percentiles:

```sql
-- median/p90 in Postgres
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0) AS median_hours,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0) AS p90_hours
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE d."postedAt" IS NOT NULL
  AND d.status IN ('posted_manual','posted_api')
  AND d."postedAt" >= $1 AND d."postedAt" <= $2
  AND r."businessId" = $3
  AND ($4::uuid IS NULL OR r."locationId" = $4::uuid);
```

This dashboard gives owners operational visibility during free pilots: they can see whether sync is healthy, how many reviews are being handled end-to-end, how fast responses are going out, and what issues (alerts) are happening—all without adding new paid tooling. For customer communication, the business website is https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and the contact email is agent_bob_replit+review-bot@agentmail.to.
