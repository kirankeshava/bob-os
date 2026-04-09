import { logger } from "./logger";

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

function getCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables are required");
  }
  return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

let cachedProductId: string | null = null;
let cachedPlanId: string | null = null;

export async function ensureProductAndPlan(): Promise<{ productId: string; planId: string }> {
  if (cachedProductId && cachedPlanId) {
    return { productId: cachedProductId, planId: cachedPlanId };
  }

  const token = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const productsRes = await fetch(`${PAYPAL_API_BASE}/v1/catalogs/products?page_size=20`, {
    headers,
  });
  const productsData = (await productsRes.json()) as { products?: { id: string; name: string }[] };
  let product = productsData.products?.find((p) => p.name === "AI Review Autopilot");

  if (!product) {
    const createRes = await fetch(`${PAYPAL_API_BASE}/v1/catalogs/products`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "AI Review Autopilot",
        description: "AI-powered review monitoring and response service",
        type: "SERVICE",
        category: "SOFTWARE",
      }),
    });
    if (!createRes.ok) {
      const text = await createRes.text();
      throw new Error(`PayPal create product failed: ${createRes.status} ${text}`);
    }
    product = (await createRes.json()) as { id: string; name: string };
    logger.info({ productId: product.id }, "PayPal product created");
  }

  cachedProductId = product.id;

  const plansRes = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans?product_id=${product.id}&page_size=20`, {
    headers,
  });
  const plansData = (await plansRes.json()) as { plans?: { id: string; name: string; status: string }[] };
  let plan = plansData.plans?.find((p) => p.name === "Weekly Subscription" && p.status === "ACTIVE");

  if (!plan) {
    const createPlanRes = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        product_id: product.id,
        name: "Weekly Subscription",
        description: "Weekly subscription for AI Review Autopilot service",
        billing_cycles: [
          {
            frequency: { interval_unit: "WEEK", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: { value: "97", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 3,
        },
      }),
    });
    if (!createPlanRes.ok) {
      const text = await createPlanRes.text();
      throw new Error(`PayPal create plan failed: ${createPlanRes.status} ${text}`);
    }
    plan = (await createPlanRes.json()) as { id: string; name: string; status: string };
    logger.info({ planId: plan.id }, "PayPal weekly plan created");
  }

  cachedPlanId = plan.id;
  return { productId: cachedProductId, planId: cachedPlanId };
}

export async function createSubscription(
  planId: string,
  customerName: string,
  customerEmail: string,
  returnUrl: string,
  cancelUrl: string,
): Promise<{ subscriptionId: string; approvalUrl: string }> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      subscriber: {
        name: { given_name: customerName.split(" ")[0], surname: customerName.split(" ").slice(1).join(" ") || customerName },
        email_address: customerEmail,
      },
      application_context: {
        brand_name: "AI Review Autopilot",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create subscription failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { id: string; links: { rel: string; href: string }[] };
  const approvalLink = data.links.find((l) => l.rel === "approve");
  if (!approvalLink) {
    throw new Error("PayPal subscription created but no approval URL returned");
  }

  return { subscriptionId: data.id, approvalUrl: approvalLink.href };
}

export async function verifyWebhookSignature(
  headers: Record<string, string>,
  body: string,
  webhookId: string,
): Promise<boolean> {
  try {
    const token = await getAccessToken();

    const res = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers["paypal-auth-algo"],
        cert_url: headers["paypal-cert-url"],
        transmission_id: headers["paypal-transmission-id"],
        transmission_sig: headers["paypal-transmission-sig"],
        transmission_time: headers["paypal-transmission-time"],
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    if (!res.ok) return false;
    const data = (await res.json()) as { verification_status: string };
    return data.verification_status === "SUCCESS";
  } catch {
    return false;
  }
}

export function isPayPalConfigured(): boolean {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

export function getZelleContactInfo(): { email: string; phone: string } {
  return {
    email: process.env.ZELLE_EMAIL || "payments@example.com",
    phone: process.env.ZELLE_PHONE || "(555) 123-4567",
  };
}
