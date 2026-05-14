# Appointment No-Show Reducer — Payments + Onboarding + Compliance (Stripe + Intake + Twilio + STOP) + Concierge Setup SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:36:57.852Z

---

# 1) Goal + Week 1 constraint
We need a frictionless onboarding path that can convert demos into paying customers later. **Week 1 policy: $0 spend**.
- Stripe can be set up in **test mode** (free) and/or used for a **$0 “Pilot / Setup” checkout** to capture customer details.
- Twilio number purchase and SMS sending can be **stubbed** until funding is allowed, but we still implement the webhooks + compliance logic now.

# 2) Stripe: products, prices, and checkout flows
## 2.1 Recommended pricing objects
Create these in Stripe (test mode now):
1) **Subscription: No-Show Reducer — Per Location**
   - Recurring price (monthly). Example: `price_location_monthly`
   - Quantity = number of locations (or separate subscription per location).
2) **One-time: Concierge Setup (Optional)**
   - One-time price. Example: `price_concierge_setup`

## 2.2 Checkout session creation (subscription)
Server endpoint: `POST /api/stripe/create-checkout-session`
Input (JSON):
- `plan`: "location_monthly" (or priceId)
- `locations`: integer >= 1
- `addConcierge`: boolean
- `orgName`: string (optional prefill)
- `ownerEmail`: string

Create Checkout Session (Node pseudo):
```js
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  customer_email: ownerEmail,
  line_items: [
    { price: process.env.STRIPE_PRICE_LOCATION_MONTHLY, quantity: locations },
    ...(addConcierge ? [{ price: process.env.STRIPE_PRICE_CONCIERGE_SETUP, quantity: 1 }] : [])
  ],
  success_url: `${APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${APP_URL}/pricing?canceled=1`,
  allow_promotion_codes: true,
  subscription_data: {
    metadata: {
      product: 'no-show-reducer',
      locations: String(locations)
    }
  },
  metadata: {
    product: 'no-show-reducer',
    ownerEmail,
    orgName: orgName || ''
  }
});
```

## 2.3 Webhook handling
Endpoint: `POST /api/stripe/webhook`
Listen for:
- `checkout.session.completed` → create/attach **Org** record; mark `billingStatus=active_pending_onboarding`.
- `invoice.paid` → keep `billingStatus=active`.
- `customer.subscription.deleted` or `invoice.payment_failed` → `billingStatus=past_due` and pause reminders.

Persist Stripe identifiers:
- `stripeCustomerId`, `stripeSubscriptionId`, `checkoutSessionId`.

## 2.4 Week 1 “free pilot” workaround (no payment)
Two options (both $0 spend):
A) Use **Stripe test mode only** for internal QA and use the onboarding form without payment.
B) Use a **$0 one-time Checkout** (“Pilot activation”) to capture customer email/name in Stripe without collecting money.

# 3) Onboarding intake form (post-checkout)
Route: `GET /onboarding?session_id=`
- If `session_id` exists, fetch session details server-side and prefill owner email/org.
- Otherwise allow manual entry for Week 1 free pilot.

## 3.1 Intake fields (Org + Location)
### Organization
- Business name (required)
- Owner name (required)
- Owner email (required)
- Owner mobile (required; for test SMS)
- Primary timezone (IANA, required)

### Location (repeatable; support “Duplicate location”)
- Location name (required)
- Address/City (optional; used for local number selection)
- Location timezone (defaults to org timezone)
- Service hours (per weekday: open/close; required)
- Appointment types (free text list)

### Calendar + appointment source
- Source type: {"Google Calendar", "Calendly", "Acuity", "Square", "Other"}
- Connection method:
  - If integrations not built yet: upload CSV sample OR “forward confirmation emails” placeholder.

### Reminder policy
- Reminder schedule (defaults):
  - T-24h: Reminder + confirm
  - T-2h: Reminder
- Confirmation workflow:
  - Reply “1” to confirm
  - Reply “2” to reschedule
- Waitlist enable: yes/no

### Waitlist upload
- CSV upload (name, mobile, preferences) OR paste list.

### Compliance consents (required checkboxes)
- “I confirm I have obtained consent from customers to receive SMS reminders about their appointments.”
- “I agree to include opt-out language (‘Reply STOP to opt out’) in messages.”
- “I agree to the Terms and Privacy/DPA.”

Submit endpoint: `POST /api/onboarding/submit`
Server actions:
1) Create Org + Location(s)
2) Set `status=provisioning`
3) Kick off Twilio provisioning job (or stub) for each location
4) Send owner test message after provisioning

## 3.2 Per-location config storage + duplication
Data model (minimum):
- `orgs`: id, name, ownerName, ownerEmail, ownerPhone, timezone, stripeCustomerId, stripeSubscriptionId, billingStatus
- `locations`: id, orgId, name, timezone, serviceHoursJson, reminderPolicyJson, waitlistEnabled, twilioPhoneNumber, twilioMessagingServiceSid, status
- `optOuts`: id, orgId, locationId (nullable), phoneE164, optedOutAt, source (STOP/inbound/support)

Duplicate action:
- Copy `serviceHoursJson`, `reminderPolicyJson`, waitlist settings; do NOT copy Twilio number/SIDs.

# 4) Twilio provisioning + messaging (implement now; buying number later)
## 4.1 Provisioning steps per location
Endpoint/job: `POST /api/twilio/provision-number`
1) Search local number by area code (from address) or default.
2) Purchase number (PAID later; stub during Week 1).
3) Create Messaging Service (optional but recommended)
4) Attach number to Messaging Service
5) Configure inbound webhook URL: `${APP_URL}/api/twilio/inbound`
6) Store: `twilioPhoneNumber`, `messagingServiceSid`, `phoneSid`

## 4.2 Owner test message
After provisioning, send to `ownerPhone`:
“[BusinessName] reminders are ready for LocationName. Reply OK to confirm you received this test. Reply STOP to opt out.”

# 5) STOP/HELP/START compliance handling (required)
Twilio inbound webhook: `POST /api/twilio/inbound`
Parse `From`, `To`, `Body`.
Normalize body upper-trim.

Keywords:
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → **opt out**
- START, YES, UNSTOP → **opt back in**
- HELP, INFO → send help text

Behavior:
1) On STOP-like: add `From` to `optOuts` (org/location determined by `To` number) and respond:
   - “You’re opted out of [BusinessName] appointment texts. No more messages will be sent. Reply START to re-subscribe.”
2) On START-like: remove from `optOuts` and respond:
   - “You’re re-subscribed to [BusinessName] appointment texts. Reply STOP to opt out.”
3) On HELP: respond:
   - “Help: appointment reminders from [BusinessName]. Reply STOP to opt out. Msg & data rates may apply.”
4) On any outbound send attempt: check suppression list first; if opted out, do not send.

# 6) Customer-facing consent language (paste into onboarding + checkout)
**SMS Consent (required):**
“By providing your phone number and enabling SMS reminders, you confirm that you (a) have obtained the necessary consent from your customers to send them appointment-related text messages, and (b) will only use the service for informational/transactional appointment communications (reminders, confirmations, reschedules, waitlist notifications). Customers can opt out at any time by replying STOP. Message and data rates may apply.”

**Opt-out disclosure (include in every template footer):**
“Reply STOP to opt out.”

# 7) Message template approval guidelines (internal + customer)
Rules:
- No marketing blasts; only appointment-related transactional messages unless explicit marketing consent is captured.
- Always include business identifier + opt-out.
- Avoid sensitive health/financial details; keep minimal appointment info.
- Keep under 160 chars when possible; if longer, ensure segmentation is acceptable.

Default templates:
1) Reminder + confirm:
“[Biz]: Reminder for your appointment on [Date] at [Time]. Reply 1 to confirm, 2 to reschedule. Reply STOP to opt out.”
2) Same-day reminder:
“[Biz]: See you at [Time] today. Reply 2 if you need to reschedule. Reply STOP to opt out.”
3) Waitlist fill:
“[Biz]: An earlier spot opened [Date] [Time]. Reply YES to take it. Reply STOP to opt out.”

# 8) Terms + Privacy/DPA-lite (paste-ready short form)
## 8.1 Terms (short)
- Service provides appointment reminder automation; availability not guaranteed.
- Customer is responsible for obtaining consent and complying with TCPA/CTIA/carrier rules.
- Prohibited use: spam, marketing without consent, unlawful content.
- Limitation of liability: fees paid in last 30 days (or similar early-stage cap).
- Suspension: for non-payment, abuse, or high complaint rates.

## 8.2 Privacy + DPA-lite
- We process phone numbers, appointment timestamps, and message content solely to provide the service.
- Subprocessors: Twilio (SMS), Stripe (billing).
- Data retention: opt-out list retained to enforce suppression.
- Security: access controls, encryption in transit.

# 9) Concierge setup SOP (done-for-you, <30 minutes)
1) Collect access: business name, owner email, owner phone, timezone, location count.
2) Confirm reminder policy (24h + 2h defaults) and reschedule workflow.
3) Confirm service hours per location.
4) Import waitlist (CSV) if enabled.
5) Approve message templates (copy/paste defaults; adjust name).
6) Provision location phone number (if funded) or mark “pending number”.
7) Send owner test SMS; owner replies OK.
8) Activate location; monitor first day logs.

# 10) Minimal onboarding checklist (customer-facing)
- Complete checkout (or free pilot).
- Fill onboarding form (5 minutes).
- Reply OK to test SMS.
- Upload waitlist (optional).
- Go live.

Website legitimacy reference to include in emails/scripts:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to
