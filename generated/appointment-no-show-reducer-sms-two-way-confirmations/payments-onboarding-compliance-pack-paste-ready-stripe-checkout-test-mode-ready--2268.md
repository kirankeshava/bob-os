# Payments + Onboarding + Compliance Pack (Paste-Ready): Stripe Checkout (Test-Mode Ready), Intake Form, Twilio STOP, Terms/DPA-lite, Concierge Setup SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:32:52.953Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance Pack

## 1) Stripe Checkout: subscription + optional setup fee (NO-SPEND path)
You can fully implement and QA this in **Stripe Test Mode** (no real charges, no payouts setup required).

### Recommended offers (per location)
- **Plan:** “No-Show Reducer — Per Location” (subscription)
  - Interval: monthly
  - Metadata: `product=noshow_reducer`, `scope=location`, `includes=sms_two_way_confirmations,waitlist_fill,analytics`
- **Optional setup fee:** “Concierge Setup (per location)” (one-time)

### Checkout flow
1) Customer clicks “Start Free Setup” (Week 1: $0 trial) OR “Subscribe” (post Week 1).
2) Stripe Checkout success redirect → `/onboarding?session_id={CHECKOUT_SESSION_ID}`
3) App fetches session, creates/updates org + location, shows intake form.
4) Intake submit triggers provisioning and sends owner test SMS.

### Stripe Checkout Session parameters (Node/TS example)
```ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function createCheckoutSession(req, res) {
  const { orgId, locationCount = 1, includeConcierge = false, email } = req.body;

  // Price IDs stored in env or DB
  const priceSubscription = process.env.STRIPE_PRICE_SUBSCRIPTION!; // e.g., price_xxx
  const priceConcierge = process.env.STRIPE_PRICE_CONCIERGE!;       // e.g., price_yyy

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: priceSubscription, quantity: locationCount }
  ];
  if (includeConcierge) line_items.push({ price: priceConcierge, quantity: locationCount });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items,
    allow_promotion_codes: true,
    success_url: `${process.env.PUBLIC_BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_BASE_URL}/pricing?canceled=1`,
    metadata: {
      orgId,
      locationCount: String(locationCount),
      includeConcierge: includeConcierge ? "1" : "0",
      product: "appointment-no-show-reducer"
    },
    subscription_data: {
      metadata: {
        orgId,
        product: "appointment-no-show-reducer"
      }
    }
  });

  res.json({ url: session.url });
}
```

### Webhooks to implement
- `checkout.session.completed` → mark org “active”, store `customer`, `subscription`, `session_id`
- `invoice.paid` → keep active
- `invoice.payment_failed` → flag delinquent, pause messaging
- `customer.subscription.deleted` → disable messaging

Webhook handler must verify signature and log events.

---

## 2) Onboarding intake form (frictionless, per-location config + duplication)
After checkout success, show a short form. Store per-location config so multi-location customers can clone settings.

### Intake fields (required unless noted)
**Business + location**
- Business name
- Location name (e.g., “Downtown”)
- Location address (optional)
- Timezone (IANA string, e.g., `America/Chicago`)
- Primary owner phone (for test SMS + alerts)
- Owner email (pre-filled from Stripe if available)

**Appointment source**
- Scheduling platform: (Calendly / Acuity / Square / Google Calendar / Jane / Mindbody / Other)
- Calendar connection method (OAuth link later; for concierge: “Share calendar access email”)

**Reminder policy**
- Default reminder schedule (choose one):
  - 24h + 2h before
  - 48h + 4h before
  - Custom (minutes/hours)
- Two-way confirmation enabled (Yes/No)
- Confirmation keywords (default): YES / CONFIRM
- Reschedule keyword: RESCHEDULE
- Cancel keyword: CANCEL

**Waitlist (optional)**
- Enable waitlist fill (Yes/No)
- Upload CSV (name, mobile, consent timestamp/source) OR paste list

**Compliance consents (checkboxes)**
- “I confirm we have consent to text appointment reminders to customers and will only upload numbers with consent.”
- “I agree to include opt-out language (‘Reply STOP to opt out’) in reminder texts.”
- “I acknowledge STOP requests must be honored immediately.”

### Data model (minimal)
- `org`: id, name, stripe_customer_id, stripe_subscription_id, status
- `location`: id, org_id, name, timezone, owner_phone, owner_email, hours_json, reminder_policy_json
- `messaging_profile`: id, location_id, twilio_account_sid, messaging_service_sid, from_number, status
- `opt_out`: id, location_id, phone_e164, opted_out_at, source (STOP/Manual)
- `message_template`: id, location_id, type (reminder/confirm/resched), body, approved_by_owner_at

### Duplicate location behavior
- UI action: “Duplicate settings from Location X”
- Copies: reminder policy, templates, hours, waitlist enabled flag
- Does NOT copy: from_number, messaging_service_sid, opt-out list

---

## 3) Twilio number provisioning + owner test SMS (can be mocked until funded)
### Provisioning steps (per location)
1) Search for local number (area code preference optional)
2) Purchase number
3) Create Messaging Service and attach number
4) Configure inbound webhook for SMS: `/api/twilio/inbound`
5) Send owner test SMS: “✅ Your reminder line is live for {Business}/{Location}. Reply YES to confirm.”

### Inbound STOP/HELP handling (core compliance)
**Keywords (case-insensitive, trim punctuation):**
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- START, UNSTOP → opt back in (optional; recommended)
- HELP → send help message

**Rules:**
- If user texts STOP keyword: add to `opt_out` list for that location and respond:
  - “You’re opted out and will no longer receive texts from {Business}. Reply START to re-subscribe.”
- If HELP: respond:
  - “{Business} appointment reminders. Reply STOP to opt out. For help contact {Owner Email}.”
- Suppression enforcement: before sending any outbound SMS, check `opt_out` for phone.

### Twilio webhook pseudocode
```ts
export async function inboundSms(req, res) {
  const from = normalizeE164(req.body.From);
  const to = normalizeE164(req.body.To);
  const body = (req.body.Body || "").trim().toUpperCase();

  const location = await findLocationByTwilioToNumber(to);
  if (!location) return res.type("text/xml").send(twiml("Unable to route message."));

  if (isStopKeyword(body)) {
    await upsertOptOut(location.id, from, "STOP");
    return res.type("text/xml").send(twiml(`You're opted out and will no longer receive texts from ${location.orgName}. Reply START to re-subscribe.`));
  }

  if (isHelpKeyword(body)) {
    return res.type("text/xml").send(twiml(`${location.orgName} appointment reminders. Reply STOP to opt out. Help: ${location.ownerEmail}.`));
  }

  if (isStartKeyword(body)) {
    await removeOptOut(location.id, from);
    return res.type("text/xml").send(twiml(`You're re-subscribed to ${location.orgName} reminders.`));
  }

  // Otherwise treat as confirmation/reschedule intent
  // routeToConfirmationHandler(location.id, from, body)
  return res.type("text/xml").send(twiml("Thanks—your message was received."));
}
```

---

## 4) Customer-facing SMS consent language (paste into checkout/onboarding)
**Consent disclosure (short):**
“By providing your mobile number, you agree to receive appointment-related SMS messages (reminders, confirmations, and reschedule links) from {Business}. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

**Owner attestation (intake checkbox text):**
“I confirm my customers have provided consent to receive SMS for appointment-related communications and that I will only message numbers collected with consent.”

**Outbound footer guidance:**
Include “Reply STOP to opt out.” at least in the first reminder and periodically thereafter (or every message for simplicity).

---

## 5) Message template approval guidelines (operational)
- Only send **transactional** appointment messages (reminders, confirmations, reschedule/cancel links, waitlist openings) unless the business has explicit marketing consent.
- Avoid prohibited content: payday loans, debt relief, adult content, illegal substances.
- Do not include misleading language (“urgent”, “act now”) unless truly time-sensitive.
- Templates must include:
  - Business identifier (name)
  - Appointment time in local timezone
  - Clear action request (Reply YES / link)
  - STOP opt-out language
- Require owner approval timestamp per location before activating sending.

---

## 6) Terms (baseline) + DPA-lite (baseline) — paste-ready sections
### Terms (high-level)
1) Service: We send appointment-related SMS reminders/confirmations/reschedule workflows as configured by the customer.
2) Customer responsibilities: Customer warrants they have obtained necessary consents and will comply with TCPA, CTIA guidelines, and local laws.
3) Opt-out: We honor STOP/opt-out keywords automatically; customer must not attempt to override.
4) Acceptable use: No spam, no marketing blasts without proper consent, no prohibited content.
5) Uptime/limits: Early-stage service; best-effort; not liable for carrier delivery failures.
6) Fees: Subscription per location; optional setup fee; taxes may apply (post Week 1).
7) Termination: We may suspend for non-payment or compliance risk.

### DPA-lite
- Roles: Customer = Data Controller; we = Data Processor.
- Data processed: customer names, phone numbers, appointment timestamps, message logs, opt-out status.
- Purpose: deliver appointment communications + reporting.
- Retention: message logs retained for a limited period (e.g., 90 days) unless required longer for compliance.
- Subprocessors: Twilio (SMS delivery), Stripe (billing).
- Security: access controls, encryption in transit, least privilege.
- Data subject rights: customer requests routed through the business.

---

## 7) Done-for-you concierge setup checklist (<30 minutes)
**Goal:** go from paid/trial → first test reminder sent.

1) Create Org + Location in admin (2 min)
- Business name, location name, timezone
- Owner email + owner mobile

2) Collect scheduling access (5–10 min)
- If Google Calendar: request shared calendar access to `agent_bob_replit+no-show-bot@agentmail.to`
- If Calendly/Acuity: request admin invite or API key (if available)

3) Configure reminder policy (5 min)
- Choose template pack (default: 24h + 2h)
- Confirm two-way keywords (YES/RESCHEDULE/CANCEL)

4) Compliance confirmation (2 min)
- Confirm customer consent collection process
- Confirm opt-out language included

5) Provision number + messaging profile (5 min)
- Provision per location (or reuse messaging service strategy if later)

6) Send owner test SMS (2 min)
- Verify inbound YES reply processed
- Verify STOP opt-out works

7) Activate location (2 min)
- Mark status Active
- Confirm first live appointment test (create a test appointment 10 minutes out)

Owner deliverables to customer: “Live by {date}, your number is {from_number}, reply STOP works, templates approved.”
