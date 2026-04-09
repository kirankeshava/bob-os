# Payments + Onboarding + Compliance Implementation Pack (Stripe Checkout + Intake + Twilio STOP + Concierge SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:36:12.323Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance Pack

This pack is designed for **Week 1 $0 spend**: everything can be implemented and tested using **Stripe Test Mode** and **Twilio trial / mocked sending**. It creates a frictionless path: **Checkout → Intake form → Provision (Twilio later) → Test message → Activate**.

---

## 1) Stripe: subscription + optional one-time concierge setup fee

### Products/Prices (recommended)
Create in Stripe (Test mode first):
- **Product:** “No-Show Reducer — Per Location”
  - **Price:** `price_location_monthly` (recurring monthly)
- **Product:** “Concierge Setup (Optional)”
  - **Price:** `price_setup_onetime` (one-time)

If you want “setup fee optional,” implement **two checkout links**:
1) Subscription only
2) Subscription + setup fee (one-time line item)

### Checkout session creation (Node/Express)
```js
// routes/stripe.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(req, res) {
  const {
    plan = 'location_monthly',
    includeSetupFee = false,
    orgName,
    ownerEmail,
    locationsCount = 1,
  } = req.body;

  const PRICE_LOCATION_MONTHLY = process.env.STRIPE_PRICE_LOCATION_MONTHLY; // e.g. price_...
  const PRICE_SETUP_ONETIME = process.env.STRIPE_PRICE_SETUP_ONETIME;       // e.g. price_...

  if (!ownerEmail) return res.status(400).json({ error: 'ownerEmail required' });

  const lineItems = [
    {
      price: PRICE_LOCATION_MONTHLY,
      quantity: Math.max(1, Number(locationsCount) || 1),
    },
  ];

  if (includeSetupFee) {
    lineItems.push({ price: PRICE_SETUP_ONETIME, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: ownerEmail,
    line_items: lineItems,
    allow_promotion_codes: true,
    success_url: `${process.env.PUBLIC_BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_BASE_URL}/checkout?canceled=1`,
    metadata: {
      orgName: orgName || '',
      plan,
      includeSetupFee: includeSetupFee ? 'true' : 'false',
      locationsCount: String(locationsCount),
    },
    subscription_data: {
      metadata: {
        orgName: orgName || '',
        plan,
      },
    },
    consent_collection: {
      terms_of_service: 'required',
    },
    custom_text: {
      terms_of_service_acceptance: {
        message:
          'By subscribing you agree to the Terms, Privacy Policy, and SMS Messaging Policy, including STOP to opt out.',
      },
    },
  });

  res.json({ url: session.url });
}
```

### Webhook: mark org as “paid/active”
Use webhook events:
- `checkout.session.completed` (create org record if needed)
- `invoice.paid` (mark subscription active)
- `customer.subscription.deleted` (deactivate)

```js
// routes/stripeWebhook.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function stripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // TODO: upsert org by session.customer_email
      // store stripeCustomerId=session.customer, stripeSubscriptionId=session.subscription
      // set billingStatus='pending_activation'
      break;
    }
    case 'invoice.paid': {
      const invoice = event.data.object;
      // TODO: mark org billingStatus='active'
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      // TODO: mark org billingStatus='canceled'
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
}
```

**Implementation note:** Stripe webhooks require the raw body. In Express, use `express.raw({type: 'application/json'})` on the webhook route only.

---

## 2) Onboarding flow (frictionless)

### Pages
- `/checkout` → choose: “subscription only” or “subscription + concierge setup” → calls `POST /api/stripe/create-checkout-session`
- `/onboarding?session_id=...` → intake form
- `/onboarding/success` → confirms “We’re testing messaging now”

### Intake form fields (per location)
Store **Org** and **LocationConfig**.

**Org**
- `orgName`
- `ownerName`
- `ownerEmail`
- `ownerMobile` (for test message)
- `preferredContact` (email/sms)

**LocationConfig** (repeatable)
- `locationName`
- `locationAddress` (optional)
- `timezone` (IANA, e.g. America/Los_Angeles)
- `serviceHours` (Mon–Sun open/close or closed)
- `appointmentTypes` (optional)
- `reminderSchedule`:
  - `t1HoursBefore` (e.g. 24)
  - `t2HoursBefore` (e.g. 2)
  - `sendAtLocalTimeWindow` (e.g. 9am–7pm)
- `twoWayConfirmationsEnabled` (true/false)
- `rescheduleLink` (optional)
- `calendarSource`:
  - `type` (google/outlook/acuity/calendly/manual)
  - `connectionNotes` (text)
- `waitlistUpload` (CSV file optional: name, phone, preferred times)
- `consentCapture`:
  - `businessConfirmsConsent` (checkbox required)
  - `businessAgreesNoMarketing` (checkbox required)
  - `messageTemplateApproved` (checkbox required)

### Duplicate location
Add action “Duplicate location config” which copies a chosen `LocationConfig` and lets user edit name/timezone.

---

## 3) Twilio provisioning + STOP/HELP compliance

### Week-1 no-spend approach
- Implement code now.
- Allow “Provisioning status: pending” until Twilio is funded.
- Use Twilio **trial** if available; otherwise mock outbound sending.

### Data model fields (per location)
- `twilioAccountSid` (optional)
- `twilioMessagingServiceSid` (optional)
- `twilioFromNumber` (E.164, optional)
- `provisioningStatus` (pending/active/failed)
- `optOutList` (table recommended)

### Provision a number (when funded)
```js
// twilio/provision.js
import twilio from 'twilio';

export async function provisionTwilioNumberForLocation({ locationId, areaCode }) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  // 1) Buy local number
  const numbers = await client.availablePhoneNumbers('US').local.list({
    areaCode: areaCode || 415,
    limit: 1,
    smsEnabled: true,
  });

  if (!numbers.length) throw new Error('No numbers available for requested area code');

  const purchased = await client.incomingPhoneNumbers.create({
    phoneNumber: numbers[0].phoneNumber,
    smsUrl: `${process.env.PUBLIC_BASE_URL}/api/twilio/inbound`,
    statusCallback: `${process.env.PUBLIC_BASE_URL}/api/twilio/status`,
  });

  // 2) Store purchased.phoneNumber + purchased.sid for the location
  return {
    fromNumber: purchased.phoneNumber,
    incomingPhoneNumberSid: purchased.sid,
  };
}
```

### Inbound SMS webhook: STOP / HELP
Must always honor opt-out. Keywords should include: `STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT`.

```js
// routes/twilioInbound.js
import { MessagingResponse } from 'twilio/lib/twiml/MessagingResponse.js';

const STOP_WORDS = new Set(['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT']);

export async function twilioInbound(req, res) {
  const from = (req.body.From || '').trim();
  const to = (req.body.To || '').trim();
  const body = (req.body.Body || '').trim();
  const upper = body.toUpperCase();

  // TODO: resolve location by `to` (the Twilio number assigned to a location)
  // const locationId = await findLocationByTwilioNumber(to)

  const twiml = new MessagingResponse();

  if (STOP_WORDS.has(upper)) {
    // TODO: upsert opt-out record: (locationId, from, optedOutAt)
    twiml.message('You are opted out and will no longer receive messages. Reply START to re-subscribe.');
    res.type('text/xml').send(twiml.toString());
    return;
  }

  if (upper === 'HELP') {
    twiml.message('Help: This number sends appointment reminders. Reply STOP to opt out.');
    res.type('text/xml').send(twiml.toString());
    return;
  }

  if (upper === 'START') {
    // TODO: remove opt-out record
    twiml.message('You are re-subscribed. Reply STOP to opt out.');
    res.type('text/xml').send(twiml.toString());
    return;
  }

  // For confirmations (two-way): YES/NO
  if (upper === 'YES' || upper === 'Y') {
    // TODO: mark appointment confirmed
    twiml.message('Confirmed. Thank you!');
  } else if (upper === 'NO' || upper === 'N') {
    // TODO: trigger reschedule flow
    twiml.message('No problem—reply with a preferred time or use the reschedule link.');
  } else {
    twiml.message('Reply YES to confirm or NO to reschedule. Reply STOP to opt out.');
  }

  res.type('text/xml').send(twiml.toString());
}
```

### Outbound sending must suppress opted-out numbers
Before sending any reminder, check `optOutList` for `(locationId, patientPhone)`.

---

## 4) Consent language + message template approval

### Add to onboarding intake (required checkbox)
**Consent confirmation (business-to-us):**
> “I confirm that my business only messages people who have provided consent to receive appointment-related SMS, and that messages are transactional (reminders/confirmations/reschedules), not marketing.”

### Add to every outbound reminder (footer)
> “Reply YES to confirm. Reply NO to reschedule. Reply STOP to opt out.”

### Customer consent language (for the business to place on their booking forms)
> “By providing your mobile number, you agree to receive appointment reminders and confirmation texts from [Business Name]. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

### Template approval guideline (internal)
- Allowed: appointment reminders, confirmations, reschedule prompts, waitlist offers.
- Disallowed without explicit additional consent: promotions, coupons, newsletters.
- Every template must include STOP language.

---

## 5) Basic Terms + DPA-lite (paste into website pages)

### Terms (short-form)
**Service:** We send appointment-related SMS reminders/confirmations/reschedule prompts on behalf of the customer’s business.

**Customer responsibilities:** Customer warrants they have obtained consent from recipients; Customer provides accurate scheduling/contact data; Customer will not use the service for marketing unless explicitly enabled with proper consent.

**Opt-out:** We honor STOP/opt-out and maintain suppression lists. Customer must not attempt to override opt-outs.

**Uptime/limitations:** Early-stage service; best-effort availability; not liable for carrier filtering or delivery failures.

**Fees:** Subscription billed per location; optional concierge setup fee if selected.

**Termination:** Either party may terminate; upon termination we stop sending messages and retain logs as required for compliance/debugging.

### DPA-lite / privacy summary
- We process: recipient phone numbers, appointment times, message logs, opt-out status.
- Purpose: send transactional appointment communications.
- Retention: minimal; opt-out records retained to enforce suppression.
- Subprocessors: Twilio (messaging), Stripe (billing), hosting provider.

---

## 6) Done-for-you concierge setup checklist (<30 minutes)

**Goal:** Activate one location end-to-end.

1) **Collect basics (3 min)**
- Business name, location name/address
- Timezone
- Owner mobile (for testing)

2) **Define reminder timing (5 min)**
- Reminder #1 timing (e.g., 24h)
- Reminder #2 timing (e.g., 2h)
- Quiet hours window

3) **Confirm consent workflow (3 min)**
- Where they collect phone numbers
- Confirm transactional-only messaging

4) **Load waitlist (optional, 5 min)**
- Upload CSV (name, phone, best times)

5) **Provision number + set webhooks (5 min)**
- Assign Twilio number to location
- Confirm inbound webhook works

6) **Approve message templates (5 min)**
- Reminder + confirmation template
- Reschedule prompt

7) **Send test SMS to owner (2 min)**
- Owner receives reminder
- Owner replies YES/STOP to verify routing + suppression

8) **Go live (2 min)**
- Set location status active
- Confirm analytics baseline (no-show estimate, recovered revenue fields)

---

## 7) Link to legitimacy assets (for outreach + checkout)
Use these in footer/copy:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

---

## What is live now vs deferred
**Can be live now (free):** Stripe integration in test mode, onboarding intake capture, config storage + duplication, Twilio inbound STOP logic code (even if not used yet), compliance pages copy, concierge SOP.

**Deferred until post-Week-1 or Twilio trial:** buying a Twilio number and sending real SMS at scale.
