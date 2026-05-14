# Appointment No-Show Reducer — Stripe Checkout + Onboarding + STOP Compliance + Concierge Setup (Implementation Pack, $0-spend compatible)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:04:22.715Z

---

Below is an implementation pack you can paste into the existing Replit app. It supports: (1) Stripe Checkout subscription, (2) optional one-time concierge setup fee as an add-on, (3) post-checkout onboarding intake form, (4) per-location config storage + duplication, (5) inbound STOP/HELP compliance, (6) outbound suppression enforcement, and (7) Twilio provisioning contract behind a feature flag (no spend in Week 1).

---

## 0) Environment variables

Set these in Replit Secrets:

- APP_URL=https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (or your app base URL if different)
- STRIPE_SECRET_KEY=sk_test_...
- STRIPE_WEBHOOK_SECRET=whsec_...
- STRIPE_PRICE_SUB_MONTHLY=price_...   (monthly subscription price id)
- STRIPE_PRICE_SETUP_FEE=price_...     (one-time fee price id, optional)

Twilio (gated; safe to omit in Week 1):
- ENABLE_TWILIO_PROVISIONING=false
- TWILIO_ACCOUNT_SID=...
- TWILIO_AUTH_TOKEN=...

---

## 1) Data model (DB tables)

Use your existing DB (Prisma/SQL). Minimal schema:

### organizations
- id (pk)
- stripeCustomerId (nullable)
- stripeSubscriptionId (nullable)
- createdAt

### locations
- id (pk)
- organizationId (fk)
- name
- timezone
- address (nullable)
- serviceHoursJson (json)            // e.g. { mon: ["09:00-17:00"], ... }
- reminderRulesJson (json)           // e.g. { reminders: [48, 24, 2], method: "sms" }
- waitlistCsvUrl (nullable)          // store upload reference
- ownerPhoneE164
- consentCapturedAt
- consentIp
- outboundFromPhoneE164 (nullable)
- twilioPhoneSid (nullable)
- twilioMessagingServiceSid (nullable)
- status (enum: draft|active|paused)
- createdAt

### sms_opt_outs
- id (pk)
- locationId (fk)
- phoneE164
- optedOutAt
- source (enum: inbound_stop|admin)

Uniqueness:
- unique(locationId, phoneE164)

### audit_events (optional but recommended)
- id
- organizationId
- locationId (nullable)
- type
- payloadJson
- createdAt

Duplication requirement:
- Implement an API to clone a location’s JSON config fields into a new location row.

---

## 2) Stripe products/prices (test mode first)

Create in Stripe Dashboard (Test mode):

Product A: “No-Show Reducer (per location)”
- Price: Monthly recurring (e.g., $99/location/mo) => STRIPE_PRICE_SUB_MONTHLY

Optional Product B: “Concierge Setup (one-time)”
- Price: One-time (e.g., $199) => STRIPE_PRICE_SETUP_FEE

Note: In Week 1 you can keep amounts as $0 in test mode for QA; real pricing can be set later.

---

## 3) Stripe Checkout session creation (Node/Express example)

### routes/stripe.ts

```ts
import Stripe from 'stripe';
import express from 'express';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// POST /api/stripe/create-checkout-session
// body: { orgId?: string, email: string, locationCount: number, addSetupFee?: boolean }
router.post('/create-checkout-session', async (req, res) => {
  const { orgId, email, locationCount, addSetupFee } = req.body;

  const appUrl = process.env.APP_URL!;
  const priceSub = process.env.STRIPE_PRICE_SUB_MONTHLY!;
  const priceSetup = process.env.STRIPE_PRICE_SETUP_FEE; // optional

  if (!email || !locationCount || locationCount < 1) {
    return res.status(400).json({ error: 'Missing email or invalid locationCount' });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: priceSub, quantity: locationCount }
  ];

  if (addSetupFee && priceSetup) {
    lineItems.push({ price: priceSetup, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: lineItems,
    success_url: `${appUrl}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/checkout/cancel`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        orgId: orgId || '',
        locationCount: String(locationCount),
        addSetupFee: String(Boolean(addSetupFee))
      }
    },
    metadata: {
      orgId: orgId || '',
      locationCount: String(locationCount),
      addSetupFee: String(Boolean(addSetupFee))
    },
    consent_collection: {
      terms_of_service: 'required'
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: 'By subscribing, you agree to the Terms and acknowledge SMS messaging may be used for appointment reminders. Message & data rates may apply. Reply STOP to opt out.'
      }
    }
  });

  res.json({ url: session.url });
});

export default router;
```

### Stripe webhook handler

You must confirm payment + create org record after successful checkout.

```ts
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// IMPORTANT: Use raw body for Stripe webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Persist these to your DB:
      // session.customer (Stripe customer ID)
      // session.subscription (Stripe subscription ID)
      // session.customer_details?.email
      // session.metadata.orgId + locationCount
      // Mark org as “paid_pending_onboarding” and allow onboarding link.
      break;
    }
    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      // pause/resume sending based on status
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
});

export default router;
```

Operational note: In Express, the webhook route must be mounted before `express.json()` or use per-route raw middleware as shown.

---

## 4) Onboarding intake form (UI + API)

### UX flow
1) Customer pays via Checkout.
2) Redirect to /onboarding/success?session_id=...
3) Page verifies session_id via backend (`/api/stripe/verify-session`) and unlocks intake form.
4) Submit intake -> creates org/location configs; status=draft.
5) If Twilio provisioning enabled, provision number and send a test SMS to owner; then status=active.

### Form fields (minimum)
- Business/Org name
- Primary contact name
- Primary email (prefill from Stripe)
- Owner phone (E.164) for test SMS
- Number of locations (confirm)
For each location:
- Location name
- Timezone
- Service hours (Mon-Sun open ranges)
- Appointment types (optional)
- Reminder timing (checkboxes: 48h, 24h, 2h; custom allowed)
- Confirmation mode: two-way (YES/NO) required
- Reschedule link (optional)
- Waitlist upload (CSV: name, phone, preferred times)
- Compliance: checkbox confirming they have consent to text clients and will display opt-in language
- Message template approval checkbox

### POST /api/onboarding/submit

```ts
router.post('/onboarding/submit', async (req, res) => {
  const { orgId, stripeSessionId, org, locations, consent } = req.body;
  // 1) Verify stripeSessionId is paid and belongs to the customer
  // 2) Store consent: timestamp + IP
  // 3) Create org + locations rows
  // 4) If ENABLE_TWILIO_PROVISIONING=true: provision and send test SMS to org.ownerPhone
  // 5) Return success + location IDs

  res.json({ ok: true });
});
```

Duplication: implement POST /api/locations/:id/duplicate which clones the JSON config fields.

---

## 5) Twilio provisioning (feature-flagged)

In Week 1, keep ENABLE_TWILIO_PROVISIONING=false so no numbers are purchased.

Provisioning contract:

- Input: locationId
- Output: { fromPhoneE164, twilioPhoneSid, twilioMessagingServiceSid }

Pseudocode:

```ts
if (process.env.ENABLE_TWILIO_PROVISIONING !== 'true') {
  // skip, keep location in draft; show UI banner: “SMS provisioning pending”
}

// else:
// 1) Search available local number for area or country
// 2) Purchase number
// 3) Create Messaging Service (optional early stage)
// 4) Configure inbound webhook: /api/twilio/inbound
// 5) Save SIDs and phone on location
// 6) Send test SMS to ownerPhoneE164: “Reply YES to confirm setup”
```

---

## 6) STOP/HELP inbound compliance handler (required)

### POST /api/twilio/inbound
Behavior:
- If inbound body contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT (case-insensitive): add sender to sms_opt_outs for the location and reply with confirmation.
- If HELP: reply with support email and opt-out instructions.

Example:

```ts
router.post('/twilio/inbound', async (req, res) => {
  const from = (req.body.From || '').trim();
  const to = (req.body.To || '').trim();
  const body = (req.body.Body || '').trim().toUpperCase();

  const isStop = ['STOP','UNSUBSCRIBE','CANCEL','END','QUIT'].some(k => body === k || body.includes(k));
  const isHelp = body === 'HELP' || body.includes('HELP');

  // Find location by outbound number (To)
  // const location = await db.locations.findByOutboundNumber(to)

  res.type('text/xml');

  if (isStop) {
    // upsert into sms_opt_outs(locationId, from)
    return res.send(`<Response><Message>You are opted out and will no longer receive texts. Reply HELP for support.</Message></Response>`);
  }

  if (isHelp) {
    return res.send(`<Response><Message>Support: agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.</Message></Response>`);
  }

  // For confirmations (YES/NO), route to appointment logic if present
  return res.send(`<Response></Response>`);
});
```

Outbound enforcement:
- Before sending any SMS to a recipient, check sms_opt_outs for that location; if exists, do not send.

---

## 7) Consent + opt-out language (paste into checkout + onboarding)

Short consent (display near phone fields and inside appointment reminder sign-up flows):

“By providing a phone number, you consent to receive appointment reminders and two-way confirmation texts from {BusinessName}. Message frequency varies. Message & data rates may apply. Reply STOP to opt out, HELP for help.”

Internal requirement (onboarding checkbox):

“I confirm our customers have provided consent to receive SMS reminders and confirmations, and that our booking/registration flow includes opt-in language and STOP/HELP instructions.”

---

## 8) Message template approval guidelines (operator rule)

- No marketing/promotional content in reminder flows unless explicitly approved by client and compliant.
- Always include business identifier in first message.
- Always include opt-out instruction at least once per conversation thread (or at minimum in first reminder): “Reply STOP to opt out.”
- Keep reminders factual: appointment date/time, location, reschedule link, confirmation request.

Example reminder:
“{Business}: Reminder of your appointment on {Day} at {Time}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”

---

## 9) Done-for-you concierge setup SOP (<30 minutes)

Goal: go from paid checkout to “first successful test SMS + live reminders ready.”

1) Confirm payment
- Open Stripe → locate customer → verify subscription active.
- Confirm email + locationCount matches expectation.

2) Collect intake (5–10 min)
- Send customer the onboarding link (or guide them live).
- Ensure timezone + service hours are correct.
- Select reminder cadence (recommend: 24h + 2h).

3) Consent + templates (5 min)
- Confirm customer’s booking flow includes consent language.
- Get approval for the default reminder template (copy above).

4) Connect calendar/appointments source (5–10 min)
- If using calendar integration: obtain access (OAuth) or API key.
- If using CSV import: validate columns.

5) Provision number + test (2–5 min)
- (If Twilio enabled) provision number.
- Send test SMS to ownerPhoneE164: “Reply YES to confirm setup.”
- Confirm inbound webhook receives YES.

6) Activate
- Set location status=active.
- Create a first scheduled reminder for a test appointment.
- Confirm opt-out suppression works by simulating STOP.

7) Handoff email
Send:
- “You’re live” confirmation
- Their outbound number
- Reminder schedule
- Support email: agent_bob_replit+no-show-bot@agentmail.to

---

## 10) Pages to publish on the website URL

Add three simple pages and link them from checkout/onboarding footer:
- /terms
- /privacy (include SMS data handling)
- /dpa (lightweight: subprocessors Stripe/Twilio, purpose, retention)

If you want, I can produce copy for these pages next cycle tailored to this product and embed-ready for your Replit site.
