import { eq, and, isNull, lte } from "drizzle-orm";
import { db, customersTable, reviewsTable, dailyReportsTable } from "@workspace/db";
import { sendEmail, listInboxes } from "../lib/agentmail";
import { generateReport, renderReportEmail } from "./report-generator";
import { logger } from "../lib/logger";

const SAMPLE_REVIEWS = [
  {
    platform: "google",
    rating: 5,
    authorName: "Jennifer M.",
    reviewText: "Absolutely love this place! The staff was incredibly friendly and the service was top-notch. Will definitely be back and recommending to all my friends.",
    daysAgo: 2,
  },
  {
    platform: "google",
    rating: 4,
    authorName: "Robert T.",
    reviewText: "Really great experience overall. The quality was excellent and the team was professional. Took a bit longer than expected but totally worth it.",
    daysAgo: 4,
  },
  {
    platform: "yelp",
    rating: 5,
    authorName: "Sarah K.",
    reviewText: "One of the best experiences I've had! Highly professional and very attentive to detail. They truly care about their customers. 5 stars without hesitation.",
    daysAgo: 5,
  },
  {
    platform: "google",
    rating: 3,
    authorName: "Mike D.",
    reviewText: "Decent experience but room for improvement. The quality was okay but I felt the communication could be better. Might give it another try.",
    daysAgo: 7,
  },
  {
    platform: "yelp",
    rating: 2,
    authorName: "Lisa B.",
    reviewText: "Not what I expected. The wait was too long and I felt my concerns weren't fully addressed. Hopefully they improve because the potential is there.",
    daysAgo: 9,
  },
  {
    platform: "google",
    rating: 5,
    authorName: "Carlos R.",
    reviewText: "Phenomenal service from start to finish. Very knowledgeable team who took the time to explain everything. Best in the area, hands down.",
    daysAgo: 11,
  },
  {
    platform: "google",
    rating: 4,
    authorName: "Amanda J.",
    reviewText: "Very positive experience! Everything was handled smoothly and professionally. I appreciated how responsive they were to my questions. Would recommend.",
    daysAgo: 14,
  },
  {
    platform: "yelp",
    rating: 1,
    authorName: "Kevin S.",
    reviewText: "Very disappointed with my visit. Poor communication and the end result didn't meet expectations. I won't be returning and can't recommend to others.",
    daysAgo: 16,
  },
  {
    platform: "google",
    rating: 5,
    authorName: "Patricia H.",
    reviewText: "Outstanding! Everything exceeded my expectations. The team went above and beyond to make sure I was satisfied. This is how every business should operate.",
    daysAgo: 18,
  },
  {
    platform: "yelp",
    rating: 4,
    authorName: "David W.",
    reviewText: "Good experience. The work quality was solid and pricing was fair. The team was polite and answered all my questions. Minor improvements could make it 5 stars.",
    daysAgo: 20,
  },
  {
    platform: "google",
    rating: 5,
    authorName: "Michelle L.",
    reviewText: "Came in on short notice and they handled everything perfectly. Very impressed by the professionalism and the final result. Will be a loyal customer from now on.",
    daysAgo: 22,
  },
  {
    platform: "google",
    rating: 3,
    authorName: "Thomas A.",
    reviewText: "Mixed feelings. Some aspects were great and others were lacking. The staff was friendly but the process felt disorganized. Gave it 3 stars as it was middle of the road.",
    daysAgo: 25,
  },
];

export async function seedReviewsForCustomer(customerId: number): Promise<void> {
  try {
    const existing = await db.select().from(reviewsTable).where(eq(reviewsTable.customerId, customerId));
    if (existing.length > 0) return;

    const now = new Date();
    const inserts = SAMPLE_REVIEWS.map(r => ({
      customerId,
      platform: r.platform,
      rating: r.rating,
      authorName: r.authorName,
      reviewText: r.reviewText,
      reviewDate: new Date(now.getTime() - r.daysAgo * 24 * 60 * 60 * 1000),
    }));

    await db.insert(reviewsTable).values(inserts);
    logger.info({ customerId, count: inserts.length }, "Reviews seeded for new customer");
  } catch (err) {
    logger.error({ err, customerId }, "Failed to seed reviews");
  }
}

export async function scheduleReportEmailsForCustomer(customerId: number): Promise<void> {
  try {
    const existing = await db.select().from(dailyReportsTable).where(eq(dailyReportsTable.customerId, customerId));
    if (existing.length > 0) return;

    const now = new Date();
    const rows = [];
    for (let day = 1; day <= 7; day++) {
      const scheduledAt = new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
      scheduledAt.setHours(8, 0, 0, 0);
      rows.push({
        customerId,
        dayNumber: day,
        sentAt: null,
        emailMessageId: null,
        reportData: null,
      });
    }

    await db.insert(dailyReportsTable).values(rows);
    logger.info({ customerId, count: rows.length }, "7-day report schedule created for customer");
  } catch (err) {
    logger.error({ err, customerId }, "Failed to schedule report emails");
  }
}

export async function sendDueReportEmails(): Promise<void> {
  try {
    const pendingReports = await db.select().from(dailyReportsTable).where(isNull(dailyReportsTable.sentAt));
    if (pendingReports.length === 0) return;

    const inboxes = await listInboxes();
    const inboxId = inboxes[0]?.id;
    if (!inboxId) {
      logger.warn("No AgentMail inbox available for sending reports");
      return;
    }

    logger.info({ count: pendingReports.length }, "Checking due report emails");

    for (const report of pendingReports) {
      try {
        const [customer] = await db.select().from(customersTable).where(eq(customersTable.id, report.customerId));
        if (!customer) continue;

        if (!["trial", "active"].includes(customer.subscriptionStatus)) continue;

        const daysSinceSignup = Math.floor((Date.now() - new Date(customer.trialStartAt).getTime()) / (24 * 60 * 60 * 1000));

        if (daysSinceSignup < report.dayNumber) continue;

        const reportData = await generateReport(customer.id);
        if (!reportData) continue;

        const { subject, html, text } = renderReportEmail(reportData, report.dayNumber, customer.name);

        const result = await sendEmail(inboxId, customer.email, subject, text, html);

        await db.update(dailyReportsTable)
          .set({
            sentAt: new Date(),
            emailMessageId: result?.messageId ?? null,
            reportData: reportData as unknown as Record<string, unknown>,
          })
          .where(eq(dailyReportsTable.id, report.id));

        logger.info(
          { customerId: customer.id, dayNumber: report.dayNumber, to: customer.email },
          "Daily report email sent"
        );

        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (reportErr) {
        logger.error({ err: reportErr, reportId: report.id }, "Failed to send report email");
      }
    }
  } catch (err) {
    logger.error({ err }, "sendDueReportEmails: fatal error");
  }
}
