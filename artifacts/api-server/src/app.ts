import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "./lib/logger";
import { getStripeSync } from "./lib/stripeClient";
import router from "./routes";
import { startTaskExecutor } from "./services/task-executor";
import { startGithubSync } from "./services/github-sync";
import { provisionMissingInboxes } from "./services/email-provisioner";
import { startTrialExpiryScheduler } from "./services/trial-expiry";
import { handleStripeEvent } from "./services/stripe-sync";
import { handlePayPalWebhookEvent } from "./services/paypal-sync";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature) {
      res.status(400).json({ error: "Missing stripe-signature" });
      return;
    }
    const sig = Array.isArray(signature) ? signature[0] : signature;
    const payload = req.body as Buffer;

    if (!Buffer.isBuffer(payload)) {
      logger.error("Stripe webhook: body is not a Buffer — likely express.json() ran first");
      res.status(500).json({ error: "Webhook processing error" });
      return;
    }

    try {
      const event = JSON.parse(payload.toString("utf8")) as { type: string; data?: { object?: Record<string, unknown> } };

      try {
        const sync = await getStripeSync();
        await sync.processWebhook(payload, sig);
      } catch (syncErr) {
        logger.warn({ syncErr }, "stripe-replit-sync processWebhook failed (non-fatal)");
      }

      await handleStripeEvent(event.type, event.data?.object ?? {});

      res.status(200).json({ received: true });
    } catch (error) {
      logger.error({ error }, "Stripe webhook error");
      res.status(400).json({ error: "Webhook processing error" });
    }
  }
);

app.post(
  "/api/paypal/webhook",
  express.json(),
  async (req, res) => {
    try {
      const event = req.body as { event_type: string; resource: Record<string, unknown> };
      if (!event.event_type) {
        res.status(400).json({ error: "Invalid webhook payload" });
        return;
      }

      await handlePayPalWebhookEvent(event.event_type, event.resource ?? {});
      res.status(200).json({ received: true });
    } catch (error) {
      logger.error({ error }, "PayPal webhook error");
      res.status(400).json({ error: "Webhook processing error" });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

startTaskExecutor();
startGithubSync();
startTrialExpiryScheduler();

provisionMissingInboxes().catch(err => logger.error({ err }, "Failed to run startup inbox provisioner"));

initStripe().catch(err => logger.error({ err }, "Stripe initialization failed (non-fatal)"));

async function initStripe() {
  try {
    const { runMigrations } = await import("stripe-replit-sync");
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) return;

    await runMigrations({ databaseUrl, schema: "stripe" });
    logger.info("Stripe schema ready");

    const stripeSync = await getStripeSync();
    const webhookBaseUrl = process.env.REPLIT_DOMAINS
      ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
      : process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : null;

    if (webhookBaseUrl) {
      await stripeSync.findOrCreateManagedWebhook(`${webhookBaseUrl}/api/stripe/webhook`);
      logger.info("Stripe managed webhook configured");
    }

    stripeSync.syncBackfill().then(() => {
      logger.info("Stripe data synced");
    }).catch((err: unknown) => {
      logger.error({ err }, "Stripe backfill error");
    });
  } catch (err) {
    logger.error({ err }, "Stripe init error");
  }
}

export default app;
