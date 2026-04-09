# Metrics Dashboard Implementation (Build-Ready Code + Routes + API Contracts)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:31:24.036Z

---

Below is the concrete, ready-to-paste implementation plan (with code) for the MVP metrics dashboard. It assumes the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES
- Page: /app/admin/metrics
- API: /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...|all
- CSV: /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=...

2) KPI DEFINITIONS (must match server computations)
- Ingested reviews: Review.createdAt within [from,to] AND Review.businessId matches AND (location filter)
- Drafted: DraftReply.createdAt within range AND DraftReply.review.businessId matches
- Approved: DraftReply.approvedAt within range (or status transitioned to approved in AuditLog if you track it there)
- Posted: DraftReply.postedAt within range OR status in {posted_manual, posted_api} and postedAt present
- Response time (median/avg): postedAt - Review.createdAt for posted replies only; exclude rejected/unposted
- Negative share: count(reviews where rating<=2 OR sentiment='negative') / total reviews
- Sync health: per location lastGbpSyncAt, lastError, consecutiveFailures, lastGbpReviewSyncUpdateTime

3) API RESPONSE SHAPE (TypeScript)
export type MetricsResponse = {
  range: { from: string; to: string; timezone: string };
  filters: { businessId: string; locationId: string | 'all' };
  syncHealth: Array<{
    locationId: string;
    locationName: string;
    source: 'google' | 'yelp' | 'manual';
    enabled: boolean;
    lastSyncAt: string | null;
    lastError: string | null;
    consecutiveFailures: number;
    watermarkUpdateTime: string | null;
  }>;
  funnel: {
    ingested: number;
    drafted: number;
    approved: number;
    posted: number;
    approvalRate: number; // approved/drafted
    postingRate: number; // posted/approved
  };
  ratings: {
    avgRating: number | null;
    totalReviews: number;
    negativeShare: number;
    daily: Array<{ date: string; avgRating: number | null; count: number; negativeCount: number }>;
  };
  responseTime: {
    avgHours: number | null;
    medianHours: number | null;
    p90Hours: number | null;
  };
  themes: Array<{ label: string; count: number }>; // from Review.categoryLabels
  alerts: {
    total: number;
    byType: Array<{ type: string; count: number }>;
    slaBreaches: number; // e.g., negative review not addressed within X hours (if you model this)
  };
};

4) /api/admin/metrics (Next.js App Router) — IMPLEMENTATION
File: app/api/admin/metrics/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireBusinessAccess } from '@/lib/rbac';
import { startOfDay, endOfDay } from '@/lib/dates';

const QuerySchema = z.object({
  businessId: z.string().min(1),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  locationId: z.string().optional().default('all'),
  timezone: z.string().optional().default('UTC')
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(url.searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { businessId, from, to, locationId, timezone } = parsed.data;

  // Guardrails: max 180 days
  const fromDate = startOfDay(from, timezone);
  const toDate = endOfDay(to, timezone);
  const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
  if (days > 180) return NextResponse.json({ error: 'Date range too large (max 180 days).' }, { status: 400 });

  const user = await requireBusinessAccess(req, businessId); // throws/returns user

  const locationFilter = locationId !== 'all' ? { locationId } : {};

  // 1) Reviews in range
  const reviews = await prisma.review.findMany({
    where: {
      businessId,
      createdAt: { gte: fromDate, lte: toDate },
      ...locationFilter
    },
    select: {
      id: true,
      createdAt: true,
      rating: true,
      sentiment: true,
      categoryLabels: true,
      locationId: true
    }
  });

  const reviewIds = reviews.map(r => r.id);

  // 2) Draft replies for those reviews (or created in range)
  const drafts = await prisma.draftReply.findMany({
    where: {
      businessId,
      reviewId: { in: reviewIds },
      ...(locationId !== 'all' ? { review: { locationId } } : {})
    },
    select: {
      id: true,
      createdAt: true,
      approvedAt: true,
      postedAt: true,
      status: true,
      reviewId: true
    }
  });

  // Funnel counts
  const ingested = reviews.length;
  const drafted = drafts.length;
  const approved = drafts.filter(d => d.approvedAt).length;
  const posted = drafts.filter(d => d.postedAt && (d.status === 'posted_manual' || d.status === 'posted_api' || d.status === 'posted')).length;
  const approvalRate = drafted ? approved / drafted : 0;
  const postingRate = approved ? posted / approved : 0;

  // Ratings + negative
  const totalReviews = ingested;
  const avgRating = totalReviews ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / totalReviews) : null;
  const negativeCount = reviews.filter(r => (r.rating ?? 5) <= 2 || r.sentiment === 'negative').length;
  const negativeShare = totalReviews ? negativeCount / totalReviews : 0;

  // Themes
  const themeCounts: Record<string, number> = {};
  for (const r of reviews) {
    for (const label of (r.categoryLabels ?? [])) {
      themeCounts[label] = (themeCounts[label] ?? 0) + 1;
    }
  }
  const themes = Object.entries(themeCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Response times (posted only)
  const reviewById = new Map(reviews.map(r => [r.id, r]));
  const responseHours: number[] = drafts
    .filter(d => d.postedAt)
    .map(d => {
      const r = reviewById.get(d.reviewId);
      if (!r) return null;
      return (new Date(d.postedAt!).getTime() - new Date(r.createdAt).getTime()) / (1000 * 60 * 60);
    })
    .filter((x): x is number => typeof x === 'number' && isFinite(x) && x >= 0);

  responseHours.sort((a, b) => a - b);
  const avgHours = responseHours.length ? responseHours.reduce((s, h) => s + h, 0) / responseHours.length : null;
  const medianHours = responseHours.length ? responseHours[Math.floor(responseHours.length / 2)] : null;
  const p90Hours = responseHours.length ? responseHours[Math.floor(responseHours.length * 0.9)] : null;

  // Daily buckets (use SQL for efficiency if large; simple JS grouping ok for MVP)
  const dailyMap = new Map<string, { sumRating: number; count: number; negativeCount: number }>();
  for (const r of reviews) {
    const d = new Date(r.createdAt);
    const key = d.toISOString().slice(0, 10);
    const cur = dailyMap.get(key) ?? { sumRating: 0, count: 0, negativeCount: 0 };
    cur.sumRating += (r.rating ?? 0);
    cur.count += 1;
    if ((r.rating ?? 5) <= 2 || r.sentiment === 'negative') cur.negativeCount += 1;
    dailyMap.set(key, cur);
  }
  const daily = Array.from(dailyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({
      date,
      avgRating: v.count ? v.sumRating / v.count : null,
      count: v.count,
      negativeCount: v.negativeCount
    }));

  // Alerts in range
  const alerts = await prisma.alertEvent.findMany({
    where: {
      businessId,
      createdAt: { gte: fromDate, lte: toDate },
      ...(locationId !== 'all' ? { locationId } : {})
    },
    select: { type: true }
  });
  const byTypeMap: Record<string, number> = {};
  for (const a of alerts) byTypeMap[a.type] = (byTypeMap[a.type] ?? 0) + 1;

  // Sync health per location (GBP/Yelp)
  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationId !== 'all' ? { id: locationId } : {}) },
    select: {
      id: true,
      name: true,
      syncEnabledGoogle: true,
      lastGbpSyncAt: true,
      lastGbpSyncError: true,
      gbpConsecutiveFailures: true,
      lastGbpReviewSyncUpdateTime: true
    }
  });
  const syncHealth = locations.map(l => ({
    locationId: l.id,
    locationName: l.name,
    source: 'google' as const,
    enabled: !!l.syncEnabledGoogle,
    lastSyncAt: l.lastGbpSyncAt?.toISOString() ?? null,
    lastError: l.lastGbpSyncError ?? null,
    consecutiveFailures: l.gbpConsecutiveFailures ?? 0,
    watermarkUpdateTime: l.lastGbpReviewSyncUpdateTime?.toISOString() ?? null
  }));

  const body = {
    range: { from, to, timezone },
    filters: { businessId, locationId: (locationId ?? 'all') as any },
    syncHealth,
    funnel: { ingested, drafted, approved, posted, approvalRate, postingRate },
    ratings: { avgRating, totalReviews, negativeShare, daily },
    responseTime: { avgHours, medianHours, p90Hours },
    themes,
    alerts: {
      total: alerts.length,
      byType: Object.entries(byTypeMap).map(([type, count]) => ({ type, count }))
    }
  };

  return NextResponse.json(body, { headers: { 'Cache-Control': 'private, max-age=30' } });
}

5) CSV EXPORT ENDPOINT
File: app/api/admin/metrics.csv/route.ts
- Reuse the same query parsing and RBAC.
- Return text/csv with:
  - One section for per-review rows: reviewId, createdAt, rating, sentiment, labels
  - One section for per-draft rows: draftId, reviewId, status, createdAt, approvedAt, postedAt, responseHours
  - One section for alert rows: type, createdAt, locationId
This enables debugging discrepancies quickly when onboarding customers.

6) DASHBOARD PAGE UI
File: app/app/admin/metrics/page.tsx
- Server component reads searchParams for from/to/locationId.
- Calls internal fetch('/api/admin/metrics?...') with credentials.
- Components:
  - Filters bar (DateRangePicker, LocationSelect)
  - Cards: Total Reviews, Avg Rating, Negative Share, Avg Response Hours, Posted Count
  - Funnel bar (ingested->drafted->approved->posted)
  - Table: Sync health per location + last error
  - Chart: Daily avg rating + review count (simple sparkline acceptable)
  - List: Top themes
  - Alerts summary
  - Button: Download CSV (links to /api/admin/metrics.csv?...)

7) OWNER-FACING CUSTOMER COMMUNICATION TEMPLATE (for pilots)
Subject: Your review response autopilot is ready — connect Google + see draft replies

Hi {{Name}},

We’ve got your MVP ready for a pilot: AI-drafted, brand-safe replies for Google/Yelp reviews, negative-review escalation alerts, and a weekly KPI report.

To verify this is our product, here’s the live app URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Reply to this email with:
1) Your business name + Google Business Profile access email (or ask us to send an invite)
2) Who should receive negative-review alerts + weekly reports

We’ll connect your locations, ingest reviews, and you’ll see draft replies in an approval queue (one-click approve/edit). If API posting isn’t available for your account, we provide a guided copy/paste posting flow with an audit trail.

Contact: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob

This artifact provides the exact API contract, KPI math, and code skeleton for the metrics dashboard plus a pilot outreach email referencing the website URL and contact email. It requires no paid services and uses only the existing Prisma models and auth/membership tables.