# Appointment No-Show Reducer — Stripe (Test Mode) + Onboarding + Twilio STOP Compliance + Concierge Setup SOP (Drop-in Build Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:42:20.656Z

---

# Goal
Create a frictionless flow: **Checkout (free in Week 1 / Stripe test mode) → Intake form → Provision messaging (Twilio) → Send owner test SMS → Activate location**. Include compliance basics: consent capture + STOP/HELP handling + message-template approval.

---

## 1) Stripe Checkout (Week 1: $0 / Test Mode)
**Week 1 policy:** do NOT collect money. Use **Stripe Test Mode** and/or a **$0 “Pilot” price**.

### Products/Prices to create in Stripe (test mode)
- Product: `No-Show Reducer — Per Location`
  - Price A (recurring): `$0 / month` (Week 1 Pilot)
  - (Later) Price B (recurring): e.g., `$49 / month`
- Optional one-time “Concierge Setup” (Week 1 should also be $0):
  - Price C (one-time): `$0` (pilot)
  - (Later) Price D (one-time): e.g., `$199`

### Metadata strategy
Attach metadata so each checkout is tied to an org/location draft.
- `org_id` (uuid)
- `location_id` (uuid)
- `plan` (pilot/pro)
- `has_setup_fee` (true/false)

### API endpoint: create checkout session (Node/Express example)
```js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/stripe/create-checkout-session
export async function createCheckoutSession(req, res) {
  const { orgId, locationId, priceIdRecurring, priceIdSetup, includeSetupFee } = req.body;

  const lineItems = [{ price: priceIdRecurring, quantity: 1 }];
  if (includeSetupFee && priceIdSetup) lineItems.push({ price: priceIdSetup, quantity: 1 });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: lineItems,
    success_url: `${process.env.PUBLIC_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_URL}/checkout?canceled=1`,
    allow_promotion_codes: false,
    customer_creation: 'always',
    metadata: {
      org_id: orgId,
      location_id: locationId,
      has_setup_fee: includeSetupFee ? 'true' : 'false'
    },
    subscription_data: {
      metadata: { org_id: orgId, location_id: locationId }
    }
  });

  res.json({ url: session.url });
}
```

### Stripe Webhook: activate location after successful payment (still $0 in pilot)
Events:
- `checkout.session.completed`
- `invoice.paid`

```js
// POST /api/stripe/webhook
import express from 'express';
const rawBody = express.raw({ type: 'application/json' });

export const stripeWebhook = [rawBody, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orgId = session.metadata?.org_id;
    const locationId = session.metadata?.location_id;

    // 1) persist stripe_customer_id + stripe_subscription_id
    // 2) mark location billing_status = 'active' (pilot)
    // 3) allow onboarding submit/provisioning
  }

  res.json({ received: true });
}];
```

**UI pages:**
- `/checkout`: explain Pilot is free for 7 days, links Terms + Consent
- `/onboarding?session_id=...`: intake form
- `/success`: “You’re live” + test SMS status

---

## 2) Onboarding Intake Form (single page, <5 minutes)
After checkout success redirect, show one form. Required fields:

### Business/org fields
- `orgName` (required)
- `ownerName` (required)
- `ownerEmail` (prefill from Stripe if available)
- `ownerMobile` (required for test SMS)

### Location fields (per location)
- `locationName` (required)
- `locationAddress` (optional)
- `timezone` (required)
- `businessHours` (required):
  - `mon`..`sun`: open/close or closed
- `appointmentTypes` (optional, comma list)

### Calendar / scheduling integration (pilot: manual ok)
- `schedulingSystem`: { Calendly, Acuity, Square, Mindbody, Jane, Other }
- `calendarAccessMethod`: { OAuth, iCal URL, CSV export, Manual } (pilot can start Manual)
- `bookingLink` or `calendarUrl` (optional)

### Reminder settings
- `reminderSchedule` (required): e.g. [24h, 2h]
- `confirmationKeyword`: default “CONFIRM”
- `rescheduleKeyword`: default “RESCHEDULE”
- `cancelKeyword`: default “CANCEL”

### Waitlist (optional)
- Upload CSV: `waitlist.csv` (name, phone, desired service)
- Or paste list

### Compliance consents (required checkboxes)
- `hasCustomerConsent`: “We only message customers who have provided consent to receive appointment-related SMS from our business.”
- `agreesToSTOPHandling`: “We will honor STOP/UNSUBSCRIBE requests; customers can reply STOP to opt out.”
- `agreesToTemplateApproval`: “We will review/approve message templates before going live.”
- `agreesToTerms`: link to Terms + DPA-lite

### POST /api/onboarding/submit
Stores:
- Org
- Location config
- Consent attestation + timestamp + submitter IP
- status = `pending_provisioning`

---

## 3) Data Model (per-location config + duplication)
Minimal tables (SQL-ish):

### orgs
- `id` (uuid)
- `name`
- `owner_name`
- `owner_email`
- `created_at`

### locations
- `id` (uuid)
- `org_id`
- `name`
- `timezone`
- `hours_json`
- `settings_json` (reminderSchedule, keywords, etc.)
- `stripe_customer_id`
- `stripe_subscription_id`
- `status` enum: `draft | active | paused`

### messaging_profiles
- `id`
- `location_id`
- `twilio_account_sid`
- `twilio_messaging_service_sid`
- `twilio_phone_number`
- `twilio_phone_sid`

### opt_outs
- `id`
- `location_id`
- `phone_e164`
- `reason` (STOP/UNSUBSCRIBE)
- `created_at`

### message_templates
- `id`
- `location_id`
- `type` (reminder_24h, reminder_2h, waitlist_offer, reschedule)
- `body`
- `approved_by_location_owner` (bool)
- `approved_at`

### Duplicate location action
- `POST /api/locations/:id/duplicate`
  - clones `locations.settings_json`, templates, hours; sets status `draft`

---

## 4) Twilio Provisioning (automated, but can be deferred in pilot)
**Flow:** after onboarding submit → provision number → send test SMS to owner.

### POST /api/twilio/provision-number
Inputs: `locationId`
Steps:
1. If `messaging_profiles` exists, no-op.
2. Find available local number (by area code if provided).
3. Purchase number.
4. Configure webhook URLs:
   - Inbound SMS: `${PUBLIC_URL}/api/twilio/inbound`
   - Status callback: `${PUBLIC_URL}/api/twilio/status`
5. Store SIDs + number.

**Important:** If Twilio is unfunded/trial-limited, keep provisioning behind a feature flag:
- `ENABLE_TWILIO_PURCHASE=false` (pilot can still collect settings and run in “pending messaging” state)

---

## 5) STOP / HELP Handling (required)
### Twilio inbound webhook: POST /api/twilio/inbound
Rules:
- If message body matches (case-insensitive): `STOP`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`:
  - Add sender to `opt_outs` for that location
  - Reply: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- If `HELP`:
  - Reply: “Reply STOP to opt out. Msg&data rates may apply. Contact: agent_bob_replit+no-show-bot@agentmail.to”
- If `START` and previously opted out:
  - Remove from `opt_outs`
  - Reply: “You’re re-subscribed to appointment texts.”

Outbound send guard:
- Before sending any SMS: check `opt_outs` for that `location_id` + `phone_e164`. If present, do not send.

---

## 6) Message Consent Language (paste into checkout + onboarding)
Use as a paragraph + checkbox label:

**Consent disclosure (customer-facing):**
“By providing your phone number, you agree to receive appointment-related text messages (reminders, confirmations, rescheduling) from [Business Name]. Message frequency varies. Message & data rates may apply. Reply STOP to opt out, HELP for help.”

**Business attestation (owner checkbox):**
“We confirm we have obtained consent from our customers to receive appointment-related SMS from our business, and we will only send transactional appointment messages.”

---

## 7) Terms + DPA-lite (early-stage, paste into site)
### Key Terms (plain language)
- Service sends appointment-related SMS on behalf of the business.
- Customer is responsible for lawful consent collection.
- Opt-out is mandatory; we enforce STOP suppression.
- No guarantees on carrier delivery.
- Customer provides scheduling data; we use it to send reminders and confirmations.

### DPA-lite points
- Roles: Customer is Data Controller; we are Processor.
- Processing: phone numbers, appointment times, message logs, opt-outs.
- Retention: retain logs X days (suggest 90) unless requested otherwise.
- Subprocessors: Twilio (SMS), Stripe (billing).

---

## 8) Message Template Approval Guidelines (internal + customer)
- No marketing/promotions in reminder templates during pilot.
- Templates must include business identifier and STOP language at least on the first message to a number or per local policy.
- Keep under 160 chars when possible.
- Avoid sensitive health info.

Example reminder template:
“[BizName]: Reminder of your appointment on {date} at {time}. Reply CONFIRM to confirm or RESCHEDULE to move it. Reply STOP to opt out.”

---

## 9) Concierge Setup SOP (<30 minutes)
**Goal:** go from “paid/pilot activated” to “test SMS received by owner”.

1) Confirm checkout completed (Stripe session ID) — 2 min
- Verify `location.status` is eligible for onboarding.

2) Intake form review — 5 min
- Timezone, business hours, reminder schedule.
- Confirm owner mobile in E.164 format.

3) Consent attestation — 2 min
- Ensure required checkboxes checked.

4) Provision number (or set pending) — 8 min
- If Twilio purchase enabled: buy local number + store in `messaging_profiles`.
- If disabled: mark `pending_messaging` and notify owner.

5) Templates — 5 min
- Set default templates for 24h/2h.
- Mark `approved_by_location_owner=false` until owner confirms.

6) Send owner test SMS — 3 min
- “Test: Your reminders are ready. Reply CONFIRM to verify two-way texting works.”
- If reply received, mark templates approved + location active.

7) Final confirmation email — 3 min
Send to agent_bob_replit+no-show-bot@agentmail.to and owner:
- Location name, Twilio number, reminder schedule, STOP policy, next steps.

---

## 10) Customer-Facing Onboarding Email (ready to send)
Subject: Your No-Show Reducer pilot — next step (2-minute setup)

Hi {OwnerName},

To activate your free 7-day pilot, please complete the setup form here:
{PUBLIC_URL}/onboarding

We’ll ask for your location timezone, business hours, reminder timing, and the mobile number to receive a test text.

Compliance note: we only message customers who have opted in to receive appointment-related texts from your business. Customers can always reply STOP to opt out.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
