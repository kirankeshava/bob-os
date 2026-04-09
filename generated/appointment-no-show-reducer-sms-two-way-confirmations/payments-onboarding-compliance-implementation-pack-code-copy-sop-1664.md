# Payments + Onboarding + Compliance — Implementation Pack (Code + Copy + SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:25:28.193Z

---

# 1) Stripe: Checkout + Webhook (subscription + optional setup fee)

## A. Environment variables
Set these in Replit Secrets (names shown):
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_MONTHLY` (or per-plan IDs)
- `APP_BASE_URL` = `https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev`

## B. API: create checkout session (Node/Express example)
```js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/stripe/create-checkout-session
// body: { orgId, locationCount: 1, plan: 'monthly', setupFee: true|false }
export async function createCheckoutSession(req, res) {
  const { orgId, plan = 'monthly', setupFee = false } = req.body;
  const priceId = process.env.STRIPE_PRICE_ID_MONTHLY; // swap by plan

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.APP_BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_BASE_URL}/checkout?canceled=1`,
    customer_creation: 'always',
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        orgId
      }
    },
    // Optional one-time setup fee on first invoice
    ...(setupFee ? {
      subscription_data: {
        metadata: { orgId },
        add_invoice_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Concierge Setup (one-time)' },
            unit_amount: 19900
          },
          quantity: 1
        }]
      }
    } : {})
  });

  res.json({ url: session.url });
}
```

## C. Webhook: activate after payment
Use Stripe CLI in dev, or Dashboard webhook in prod.
Events to handle:
- `checkout.session.completed` (good signal to create customer mapping)
- `invoice.paid` (best signal to mark subscription active)
- `customer.subscription.deleted` (deactivate)

```js
// POST /api/stripe/webhook
import express from 'express';

export async function stripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'invoice.paid': {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;
      // Lookup subscription, read metadata orgId (via retrieve)
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const orgId = sub.metadata?.orgId;
      // TODO: mark org as paid/active in DB
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      const orgId = sub.metadata?.orgId;
      // TODO: deactivate org/location sending
      break;
    }
  }

  res.json({ received: true });
}
```

### Data model additions (minimal)
- `Organization`:
  - `id`
  - `stripeCustomerId`
  - `stripeSubscriptionId`
  - `billingStatus` enum: `trial|active|past_due|canceled`
- `LocationConfig`:
  - `id`, `orgId`, `name`, `timezone`, `serviceHours`
  - `reminderRules` (JSON)
  - `twilioPhoneNumber`, `twilioPhoneSid`
  - `consentCapturedAt`, `consentSource`

# 2) Onboarding intake form (post-checkout)

## UI flow
1) `/checkout` → Start Checkout
2) Stripe success redirects to `/onboarding?session_id=...`
3) `/onboarding` shows intake form and calls `/api/onboarding/submit`
4) Backend provisions Twilio number and sends test SMS to owner
5) Show “All set” + instructions + link to invite staff

## Intake fields (per location)
**Business / Location**
- Business name
- Location name (or “Main”)
- Address (optional; improves local number matching)
- Timezone (required)
- Primary service hours (Mon–Sun start/end)

**Owner contact**
- Owner full name
- Owner mobile number (for test SMS)
- Notification email

**Calendar / scheduling**
- Booking system (dropdown: Calendly, Acuity, Google Calendar, Square, Mindbody, Other)
- Calendar access method (OAuth later; for now: “share calendar link / add service account / upload CSV”)

**Reminder & confirmation rules**
- Reminder timing presets (e.g., 24h + 2h)
- Two-way confirmation enabled (Y/N)
- Confirmation window cutoff (e.g., 12h before)
- Reschedule link (required)

**Waitlist**
- Enable waitlist backfill (Y/N)
- Waitlist contacts upload (CSV) OR paste list

**Compliance**
- Checkbox: “I confirm I have obtained customer consent to receive appointment-related texts and will include opt-out language.”
- Checkbox: “I approve the default message templates (can edit later).”

# 3) Twilio provisioning + test message

## Env vars
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_DEFAULT_COUNTRY=US`

## Endpoint: provision number
```js
import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// POST /api/twilio/provision-number
// body: { locationId, areaCode, ownerPhone }
export async function provisionNumber(req, res) {
  const { locationId, areaCode, ownerPhone } = req.body;

  // 1) Search
  const available = await client.availablePhoneNumbers('US')
    .local.list({ areaCode, smsEnabled: true, limit: 1 });
  if (!available?.length) return res.status(409).json({ error: 'No numbers available for that area code.' });

  // 2) Purchase
  const purchased = await client.incomingPhoneNumbers.create({
    phoneNumber: available[0].phoneNumber,
    smsUrl: `${process.env.APP_BASE_URL}/api/twilio/inbound`,
    smsMethod: 'POST'
  });

  // 3) Persist to LocationConfig
  // TODO DB update: twilioPhoneNumber=purchased.phoneNumber, twilioPhoneSid=purchased.sid

  // 4) Send owner test message
  await client.messages.create({
    to: ownerPhone,
    from: purchased.phoneNumber,
    body: 'Test: Your Appointment No-Show Reducer line is active. Reply HELP for info or STOP to opt out.'
  });

  res.json({ phoneNumber: purchased.phoneNumber });
}
```

# 4) STOP/START/HELP inbound webhook + suppression

## Requirements
- If inbound body contains `STOP`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`: mark number opted-out for that location/org.
- If inbound body contains `START` or `UNSTOP`: remove opt-out.
- If inbound contains `HELP`: respond with help text.
- All outbound sends must check suppression list first.

## Inbound webhook (Twilio)
```js
import { twiml } from 'twilio';

// POST /api/twilio/inbound
export async function inboundSms(req, res) {
  const from = (req.body.From || '').trim();
  const to = (req.body.To || '').trim();
  const body = (req.body.Body || '').trim().toUpperCase();

  // TODO: resolve location by "to" (our Twilio number)
  // const locationId = await findLocationByTwilioNumber(to);

  const resp = new twiml.MessagingResponse();

  if (/(STOP|UNSUBSCRIBE|CANCEL|END|QUIT)/.test(body)) {
    // TODO: upsert opt-out record (locationId, from)
    resp.message('You are opted out. Reply START to re-subscribe.');
  } else if (/(START|UNSTOP)/.test(body)) {
    // TODO: remove opt-out record
    resp.message('You are re-subscribed.');
  } else if (/HELP/.test(body)) {
    resp.message('Appointment reminders service. Reply STOP to opt out. For support email agent_bob_replit+no-show-bot@agentmail.to');
  }

  res.type('text/xml').send(resp.toString());
}
```

# 5) Customer-facing consent + opt-out language (paste into UI)

**Checkout / onboarding consent block:**

> By enabling SMS reminders, you confirm you have obtained express consent from your customers to receive appointment-related text messages at the phone number they provide. Message frequency varies by appointment activity. Message and data rates may apply. Customers can reply STOP to opt out and HELP for help. You agree to include opt-out language in reminders where required and to honor opt-out requests.

**Default reminder footer (recommended):**

> Reply STOP to opt out, HELP for help.

# 6) Terms (baseline) + DPA-lite (baseline)

## Terms highlights (short-form)
1. We send appointment-related SMS on your behalf using your customer list and scheduling data.
2. You are responsible for lawful basis/consent to message recipients and for the content you approve.
3. Opt-out requests are honored via STOP; you must not re-add opted-out numbers unless they re-consent.
4. Availability: best-effort; SMS delivery not guaranteed.
5. Limitation of liability: capped to fees paid in last 30 days (or similar early-stage cap).
6. Support: agent_bob_replit+no-show-bot@agentmail.to

## DPA-lite highlights
- Roles: You = Controller; We = Processor.
- Processing: send reminders/confirmations/reschedule links; store minimal metadata.
- Security: least-privilege access, encrypted secrets, logs retention policy.
- Subprocessors: Twilio (SMS), Stripe (billing).

# 7) Message template approval guidelines

- All templates must be “appointment-related” (transactional), not marketing.
- Include business identifier + reschedule link.
- Include opt-out footer at least in first reminder or every message if uncertain.
- Avoid sensitive medical details; keep generic (“your appointment”).

Default templates (editable):
1) 24h reminder:
> {Business}: Reminder of your appointment on {Date} at {Time}. Reply Y to confirm or N to reschedule: {RescheduleLink}. Reply STOP to opt out.

2) 2h reminder:
> {Business}: See you at {Time}. Reply Y to confirm. Need to reschedule? {RescheduleLink}. Reply STOP to opt out.

3) Waitlist fill:
> {Business}: An earlier time opened up: {SlotTime}. Reply YES to claim. Reply STOP to opt out.

# 8) Concierge setup SOP (<30 minutes)

## What you need from client (copy/paste request email)
Send from: agent_bob_replit+no-show-bot@agentmail.to
Reference legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Subject: 15-minute setup — Appointment No-Show Reducer

Body:
1) Business name + location name
2) Timezone
3) Hours of operation
4) Reschedule link
5) Reminder timings (choose: 24h+2h or custom)
6) Owner mobile for test SMS
7) Area code preference for the reminder number
8) CSV waitlist (optional)
9) Confirmation you have customer SMS consent (checkbox in form)

## Internal steps (timer-based)
0–5 min: Verify Stripe checkout success → orgId created → open onboarding record.
5–12 min: Enter location config → save → click Provision Number.
12–15 min: Confirm Twilio number purchased and inbound webhook set.
15–20 min: Send test SMS to owner → owner replies HELP and STOP → verify suppression toggles.
20–30 min: Enable reminders for one test appointment → confirm outbound send + logging.

## Completion criteria
- Location has assigned Twilio number
- Owner received test message
- STOP opt-out stored and enforced
- Default templates approved or edited
- Location config duplicated (if multi-location) and saved

---
If you want me to turn this into concrete PRs against the Replit repo, share the repo URL or paste the server entrypoint + routing structure and I’ll align the endpoints exactly to your codebase.
