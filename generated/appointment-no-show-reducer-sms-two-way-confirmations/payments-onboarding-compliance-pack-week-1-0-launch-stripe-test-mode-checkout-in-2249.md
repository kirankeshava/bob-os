# Payments + Onboarding + Compliance Pack (Week-1 $0 Launch): Stripe Test-Mode Checkout + Intake Form + STOP Policy + Concierge SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:26:29.699Z

---

# 1) Minimal architecture (ship now, $0 spend)
Goal: enable a frictionless path **Checkout → Intake Form → “Provisioning queued” → Owner test SMS (when Twilio funded)**.

**Week 1 constraint:** do not collect real payments and do not buy phone numbers. We can still:
- Run **Stripe in TEST mode** to prove the flow.
- Collect onboarding intake + consents.
- Store per-location config and support duplication.
- Stub Twilio provisioning; show “Pending SMS activation”.

---

# 2) Data model (per-location config + duplication)
Use whatever DB exists (Postgres/SQLite). Minimum tables:

**organizations**
- id (uuid)
- name (text)
- owner_email (text)
- created_at

**locations**
- id (uuid)
- organization_id (uuid)
- label (text) — e.g., “Downtown Clinic”
- timezone (text) — IANA e.g., America/Chicago
- phone_owner (text) — owner mobile for test SMS
- business_phone_public (text, nullable)
- service_hours_json (json) — e.g. { mon: ["09:00-17:00"], ... }
- reminder_rules_json (json) — e.g. { first: "24h", second: "2h", requireConfirmation: true }
- waitlist_upload_url (text, nullable)
- calendar_provider (text) — google/acuity/calendly/manual
- calendar_access_json (json)
- sms_status (text) — pending|active|blocked
- twilio_subaccount_sid (text, nullable)
- twilio_messaging_service_sid (text, nullable)
- twilio_number (text, nullable)
- created_at

**sms_opt_outs** (global suppression per location)
- id
- location_id
- phone_e164
- status (opted_out|opted_in)
- last_keyword (STOP/START/etc)
- updated_at

**stripe_links** (tie Stripe customer/subscription to org/location)
- id
- organization_id
- location_id (nullable if org-level)
- stripe_customer_id
- stripe_subscription_id
- stripe_checkout_session_id
- status (test|live)

**Duplication:** “Duplicate location” creates a new locations row copying service_hours_json + reminder_rules_json + message templates; excludes Twilio + calendar tokens.

---

# 3) Stripe Checkout (TEST mode now; Live later)
## 3.1 Environment variables
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- APP_BASE_URL (e.g., https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev)
- STRIPE_PRICE_ID_SUB (test price id)
- STRIPE_PRICE_ID_SETUP (optional one-time test price id)

## 3.2 Backend route: create checkout session (Node/Express example)
```js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/api/stripe/create-checkout-session", async (req, res) => {
  try {
    const { organizationName, ownerEmail, includeSetupFee, locationCount = 1 } = req.body;

    // You can create the org record here (status: pending) or after webhook.
    // For week-1: keep it simple; create after success redirect.

    const lineItems = [
      { price: process.env.STRIPE_PRICE_ID_SUB, quantity: Number(locationCount) }
    ];
    if (includeSetupFee) {
      lineItems.push({ price: process.env.STRIPE_PRICE_ID_SETUP, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: ownerEmail,
      line_items: lineItems,
      allow_promotion_codes: false,
      success_url: `${process.env.APP_BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_BASE_URL}/checkout?canceled=1`,
      metadata: {
        organizationName,
        ownerEmail,
        includeSetupFee: includeSetupFee ? "true" : "false",
        locationCount: String(locationCount)
      },
      subscription_data: {
        metadata: {
          organizationName,
          ownerEmail
        }
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
```

## 3.3 Webhook handler (activate after payment)
For week-1 we can still process `checkout.session.completed` in TEST mode.

```js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // session.customer, session.subscription
      // Create org record if missing, tie to stripe IDs, mark as paid/test.
      // Then allow onboarding.
    }

    if (event.type === "customer.subscription.deleted") {
      // Mark org/location inactive.
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Webhook handler failed");
  }
});

export default router;
```

---

# 4) Onboarding intake form (fields + POST endpoint)
## 4.1 UI fields (single location)
1) Business
- Organization name
- Location label
- Timezone (dropdown)
- Owner name (optional)
- Owner mobile (E.164)

2) Operations
- Service hours (per weekday)
- Typical appointment length (minutes)

3) Reminder rules
- Reminder #1 timing (e.g., 24h)
- Reminder #2 timing (e.g., 2h)
- Require confirmation? (yes/no)
- If no response, send final “Please confirm” (yes/no)

4) Calendar access
- Provider: Google/Calendly/Acuity/Manual
- If manual: upload CSV format instructions

5) Waitlist
- Upload CSV (name, phone, preferred days)

6) Compliance
- Checkbox: “I confirm I have customer consent to send appointment-related SMS and I will only upload opted-in contacts.”
- Checkbox: “I agree to Terms + DPA.”

## 4.2 Endpoint: /api/onboarding/submit
```js
router.post("/api/onboarding/submit", async (req, res) => {
  const {
    sessionId,
    organization,
    location,
    reminderRules,
    serviceHours,
    calendar,
    waitlist,
    compliance
  } = req.body;

  // 1) Verify Stripe sessionId exists (optional in week-1; recommended)
  // 2) Upsert organization + location
  // 3) Save configs
  // 4) Set sms_status='pending'
  // 5) Return next step: "pending_sms_activation" or "activate_now" if Twilio enabled.

  res.json({ ok: true, status: "pending_sms_activation" });
});
```

---

# 5) Twilio provisioning + STOP handling (gated)
## 5.1 Env flags
- TWILIO_ENABLED=false (week 1)
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN

## 5.2 Provision number endpoint (stub now)
```js
router.post("/api/twilio/provision-number", async (req, res) => {
  if (process.env.TWILIO_ENABLED !== "true") {
    return res.json({ ok: true, status: "disabled_week1" });
  }
  // Later: buy number, create messaging service, attach, store SIDs.
});
```

## 5.3 Inbound SMS webhook for STOP/HELP
Even in week-1, define the contract.

Rules:
- On inbound body matching: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → mark opted_out.
- START, YES, UNSTOP → mark opted_in.
- HELP → respond with support info and opt-out reminder.

```js
router.post("/api/twilio/inbound", async (req, res) => {
  const from = (req.body.From || "").trim();
  const to = (req.body.To || "").trim();
  const body = (req.body.Body || "").trim().toUpperCase();

  // Lookup location by "to" (our Twilio number) once active.
  // For now, just respond politely.

  let reply = "";
  const stopWords = new Set(["STOP","STOPALL","UNSUBSCRIBE","CANCEL","END","QUIT"]);
  const startWords = new Set(["START","YES","UNSTOP"]);

  if (stopWords.has(body)) {
    reply = "You are opted out and will no longer receive SMS messages. Reply START to re-subscribe.";
    // persist opt-out
  } else if (startWords.has(body)) {
    reply = "You are opted in. You may receive appointment-related messages. Reply STOP to opt out.";
    // persist opt-in
  } else if (body === "HELP") {
    reply = "Support: agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.";
  } else {
    reply = "Thanks! For support email agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.";
  }

  res.type("text/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`);
});
```

**Outbound filter (required):** before sending any SMS, check suppression list for recipient phone_e164 at that location.

---

# 6) Customer-facing consent + opt-out language (paste into checkout + intake)
## 6.1 Consent checkbox text (intake form)
“I confirm that the phone numbers I upload or message have provided consent to receive appointment-related SMS (including confirmations and reschedule links). I understand recipients can reply STOP to opt out and HELP for help.”

## 6.2 Footer snippet for outbound messages
“Reply STOP to opt out, HELP for help.”

## 6.3 Minimal SMS disclosure (on onboarding page)
“By enabling SMS reminders, you agree to send only appointment-related messages to customers who have consented to receive texts. Message frequency varies by appointment. Standard message and data rates may apply. Recipients can opt out at any time by replying STOP.”

---

# 7) Message template approval guidelines (internal)
- No marketing/promotions. Appointment ops only.
- Must include business name and reason for message.
- Must include opt-out footer at least once per conversation thread.
- No sensitive medical details. Use generic language (“your appointment”).
- Confirmations: accept Y/YES/CONFIRM and N/NO/CANCEL; treat anything else as “needs review.”

---

# 8) Concierge setup SOP (≤30 minutes)
**Inputs needed from client (send them to agent_bob_replit+no-show-bot@agentmail.to or via intake):**
1) Business name + location label
2) Timezone
3) Service hours
4) Reminder timings (e.g., 24h + 2h)
5) Owner mobile for test SMS
6) Calendar provider + access method
7) Waitlist CSV (optional)
8) Confirmation that consent is in place

**Steps:**
1) (5 min) Create organization + location in admin; verify timezone/service hours.
2) (5 min) Configure reminder rules; choose default templates.
3) (5 min) Import waitlist CSV (optional) and validate phone formatting.
4) (5 min) If Twilio enabled: provision number + messaging service; attach inbound webhook.
5) (5 min) Send test message to owner mobile; verify STOP/HELP responses.
6) (5 min) Activate location; schedule first dry-run reminder for a test appointment.

**Exit criteria:** owner confirms receipt; location shows “SMS Active”; opt-out keywords tested; templates approved.

---

# 9) Links to include in customer comms
Website legitimacy link (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to
