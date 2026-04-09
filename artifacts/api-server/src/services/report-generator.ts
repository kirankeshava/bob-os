import { eq, desc, asc } from "drizzle-orm";
import { db, reviewsTable, customersTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "../lib/logger";

export interface ReviewMetrics {
  avgRating: number;
  totalCount: number;
  countPerStar: Record<number, number>;
  trend: "improving" | "stable" | "declining";
}

export interface ReviewWithReply {
  id: number;
  platform: string;
  rating: number;
  authorName: string;
  reviewText: string;
  reviewDate: string;
  proposedReplyText: string | null;
}

export interface ReportData {
  customerId: number;
  businessName: string;
  generatedAt: string;
  metrics: ReviewMetrics;
  latestReviews: ReviewWithReply[];
  lowestRatedReviews: ReviewWithReply[];
}

export async function generateReport(customerId: number): Promise<ReportData | null> {
  try {
    const [customer] = await db.select().from(customersTable).where(eq(customersTable.id, customerId));
    if (!customer) {
      logger.warn({ customerId }, "Report generator: customer not found");
      return null;
    }

    const reviews = await db.select().from(reviewsTable)
      .where(eq(reviewsTable.customerId, customerId))
      .orderBy(desc(reviewsTable.reviewDate));

    if (reviews.length === 0) {
      logger.info({ customerId }, "Report generator: no reviews found");
    }

    const metrics = computeMetrics(reviews);
    const latestReviews = reviews.slice(0, 3);
    const lowestRated = [...reviews].sort((a, b) => a.rating - b.rating).slice(0, 3);

    const toGenerate = [
      ...latestReviews.filter(r => !r.proposedReplyText),
      ...lowestRated.filter(r => !r.proposedReplyText && !latestReviews.some(lr => lr.id === r.id)),
    ];

    if (toGenerate.length > 0) {
      await generateReplies(toGenerate, customer.businessName, customer.email);
      const updatedReviews = await db.select().from(reviewsTable)
        .where(eq(reviewsTable.customerId, customerId))
        .orderBy(desc(reviewsTable.reviewDate));

      const updatedMap = new Map(updatedReviews.map(r => [r.id, r]));

      const hydratedLatest = latestReviews.map(r => updatedMap.get(r.id) ?? r);
      const hydratedLowest = lowestRated.map(r => updatedMap.get(r.id) ?? r);

      return buildReport(customer.businessName, customerId, metrics, hydratedLatest, hydratedLowest);
    }

    return buildReport(customer.businessName, customerId, metrics, latestReviews, lowestRated);
  } catch (err) {
    logger.error({ err, customerId }, "Report generator: error");
    return null;
  }
}

function buildReport(
  businessName: string,
  customerId: number,
  metrics: ReviewMetrics,
  latestReviews: Array<typeof reviewsTable.$inferSelect>,
  lowestRated: Array<typeof reviewsTable.$inferSelect>,
): ReportData {
  return {
    customerId,
    businessName,
    generatedAt: new Date().toISOString(),
    metrics,
    latestReviews: latestReviews.map(r => ({
      id: r.id,
      platform: r.platform,
      rating: r.rating,
      authorName: r.authorName,
      reviewText: r.reviewText,
      reviewDate: r.reviewDate.toISOString(),
      proposedReplyText: r.proposedReplyText ?? null,
    })),
    lowestRatedReviews: lowestRated.map(r => ({
      id: r.id,
      platform: r.platform,
      rating: r.rating,
      authorName: r.authorName,
      reviewText: r.reviewText,
      reviewDate: r.reviewDate.toISOString(),
      proposedReplyText: r.proposedReplyText ?? null,
    })),
  };
}

function computeMetrics(reviews: Array<typeof reviewsTable.$inferSelect>): ReviewMetrics {
  const countPerStar: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;

  for (const r of reviews) {
    const star = Math.min(5, Math.max(1, r.rating));
    countPerStar[star] = (countPerStar[star] ?? 0) + 1;
    total += r.rating;
  }

  const avgRating = reviews.length > 0 ? Math.round((total / reviews.length) * 10) / 10 : 0;

  const recent = reviews.slice(0, 5);
  const older = reviews.slice(5, 10);
  let trend: "improving" | "stable" | "declining" = "stable";
  if (recent.length >= 2 && older.length >= 2) {
    const recentAvg = recent.reduce((s, r) => s + r.rating, 0) / recent.length;
    const olderAvg = older.reduce((s, r) => s + r.rating, 0) / older.length;
    if (recentAvg > olderAvg + 0.3) trend = "improving";
    else if (recentAvg < olderAvg - 0.3) trend = "declining";
  }

  return { avgRating, totalCount: reviews.length, countPerStar, trend };
}

async function generateReplies(
  reviews: Array<typeof reviewsTable.$inferSelect>,
  businessName: string,
  ownerEmail: string,
): Promise<void> {
  for (const review of reviews) {
    try {
      const prompt = `You are a professional reputation manager writing a response on behalf of "${businessName}".

Customer Review:
- Platform: ${review.platform}
- Rating: ${review.rating}/5
- Reviewer: ${review.authorName}
- Review: "${review.reviewText}"

Write a concise, professional, and warm reply (50-100 words). 
- Thank the reviewer by name
- Address their specific feedback
- If negative (1-3 stars), apologize and offer to make it right
- If positive (4-5 stars), express genuine gratitude
- Sign off as the ${businessName} team
- Do NOT include a subject line or greeting like "Dear" — just the reply body

Reply:`;

      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_completion_tokens: 256,
        messages: [{ role: "user", content: prompt }],
      });

      const replyText = response.choices[0]?.message?.content?.trim();
      if (replyText) {
        await db.update(reviewsTable)
          .set({ proposedReplyText: replyText, replyGeneratedAt: new Date() })
          .where(eq(reviewsTable.id, review.id));
      }
    } catch (err) {
      logger.warn({ err, reviewId: review.id }, "Report generator: failed to generate reply for review");
    }
  }
}

export function renderReportEmail(report: ReportData, dayNumber: number, customerName: string): { subject: string; html: string; text: string } {
  const subject = `Day ${dayNumber}: Your Review Report — ${report.businessName}`;

  const starBar = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

  const trendIcon = report.metrics.trend === "improving" ? "📈" : report.metrics.trend === "declining" ? "📉" : "➡️";
  const trendLabel = report.metrics.trend === "improving" ? "Improving" : report.metrics.trend === "declining" ? "Declining" : "Stable";

  const reviewHtml = (reviews: ReviewWithReply[], sectionTitle: string) => {
    if (reviews.length === 0) return "";
    return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
  <tr><td style="padding-bottom:12px;">
    <h2 style="margin:0;font-size:16px;font-weight:700;color:#1a1a2e;">${sectionTitle}</h2>
  </td></tr>
  ${reviews.map(r => `
  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:12px;display:block;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <div>
        <span style="font-size:18px;color:#f59e0b;">${starBar(r.rating)}</span>
        <span style="margin-left:8px;font-size:12px;color:#64748b;text-transform:uppercase;font-weight:600;">${r.platform}</span>
      </div>
      <span style="font-size:12px;color:#94a3b8;">${new Date(r.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
    </div>
    <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#1e293b;">${r.authorName}</p>
    <p style="margin:0 0 12px 0;font-size:14px;color:#334155;line-height:1.5;">"${r.reviewText}"</p>
    ${r.proposedReplyText ? `
    <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:10px 14px;border-radius:0 6px 6px 0;">
      <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;">💬 Proposed Reply (copy &amp; paste)</p>
      <p style="margin:0;font-size:13px;color:#1e40af;line-height:1.5;">${r.proposedReplyText}</p>
    </div>` : ""}
  </td></tr>
  <tr><td style="height:12px;"></td></tr>
  `).join("")}
</table>`;
  };

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
    <tr><td align="center" style="padding:24px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 32px;">
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">📊 Your Daily Review Report</h1>
          <p style="margin:6px 0 0 0;font-size:14px;color:#94a3b8;">Day ${dayNumber} of 7 — ${report.businessName}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">

          <p style="margin:0 0 24px 0;font-size:15px;color:#374151;">Hi ${customerName}, here's your review snapshot for today.</p>

          <!-- Summary Stats -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="padding-bottom:12px;">
              <h2 style="margin:0;font-size:16px;font-weight:700;color:#1a1a2e;">📈 Summary</h2>
            </td></tr>
            <tr>
              <td width="33%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;text-align:center;">
                <div style="font-size:28px;font-weight:800;color:#16a34a;">${report.metrics.avgRating}</div>
                <div style="font-size:11px;color:#4ade80;font-weight:600;text-transform:uppercase;margin-top:2px;">Avg Rating</div>
              </td>
              <td width="2%" style="padding:0 6px;"></td>
              <td width="33%" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;text-align:center;">
                <div style="font-size:28px;font-weight:800;color:#2563eb;">${report.metrics.totalCount}</div>
                <div style="font-size:11px;color:#60a5fa;font-weight:600;text-transform:uppercase;margin-top:2px;">Total Reviews</div>
              </td>
              <td width="2%" style="padding:0 6px;"></td>
              <td width="30%" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;text-align:center;">
                <div style="font-size:28px;font-weight:800;color:#d97706;">${trendIcon}</div>
                <div style="font-size:11px;color:#f59e0b;font-weight:600;text-transform:uppercase;margin-top:2px;">${trendLabel}</div>
              </td>
            </tr>
          </table>

          <!-- Star Distribution -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="padding-bottom:10px;">
              <p style="margin:0;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Rating Breakdown</p>
            </td></tr>
            ${[5, 4, 3, 2, 1].map(star => {
              const count = report.metrics.countPerStar[star] ?? 0;
              const pct = report.metrics.totalCount > 0 ? Math.round((count / report.metrics.totalCount) * 100) : 0;
              return `<tr><td style="padding:2px 0;">
                <table width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td width="40" style="font-size:12px;color:#94a3b8;">${"★".repeat(star)}</td>
                  <td style="padding:0 8px;">
                    <div style="background:#e2e8f0;border-radius:9999px;height:8px;">
                      <div style="background:#f59e0b;height:8px;border-radius:9999px;width:${pct}%;min-width:${count > 0 ? "4px" : "0"};"></div>
                    </div>
                  </td>
                  <td width="30" style="font-size:12px;color:#64748b;text-align:right;">${count}</td>
                </tr></table>
              </td></tr>`;
            }).join("")}
          </table>

          ${reviewHtml(report.latestReviews, "🆕 Latest Reviews")}
          ${reviewHtml(
            report.lowestRatedReviews.filter(r => !report.latestReviews.some(lr => lr.id === r.id)),
            "⚠️ Needs Attention (Lowest Rated)"
          )}

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-top:8px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 8px 0;font-size:14px;font-weight:600;color:#1e293b;">💡 Tip: Responding to reviews boosts your ranking</p>
              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">Copy and paste the proposed replies above directly into your Google Business or Yelp account. Responding to reviews — especially negative ones — shows potential customers you care.</p>
            </td></tr>
          </table>

          <p style="margin:24px 0 0 0;font-size:12px;color:#94a3b8;text-align:center;">
            You're receiving this email as part of your 7-day free trial with AI Review Autopilot.<br>
            Day ${dayNumber} of 7 complete.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Day ${dayNumber} Review Report — ${report.businessName}

Hi ${customerName},

SUMMARY
-------
Average Rating: ${report.metrics.avgRating}/5
Total Reviews: ${report.metrics.totalCount}
Trend: ${trendLabel}

LATEST REVIEWS
--------------
${report.latestReviews.map(r => `
${r.authorName} — ${starBar(r.rating)} (${r.platform})
"${r.reviewText}"

Proposed Reply: ${r.proposedReplyText ?? "(generating...)"}
`).join("\n")}

NEEDS ATTENTION
---------------
${report.lowestRatedReviews.filter(r => !report.latestReviews.some(lr => lr.id === r.id)).map(r => `
${r.authorName} — ${starBar(r.rating)} (${r.platform})
"${r.reviewText}"

Proposed Reply: ${r.proposedReplyText ?? "(generating...)"}
`).join("\n")}

---
Day ${dayNumber} of 7 | AI Review Autopilot`;

  return { subject, html, text };
}
