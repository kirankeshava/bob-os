# Appointment No-Show Reducer — Stripe Checkout + Onboarding Intake + Twilio Provisioning + STOP Compliance + Concierge Setup SOP (Paste-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:51:21.818Z

---

## 1) Stripe checkout (subscription + optional setup fee)

### Pricing model (recommended)
- **Plan:** “No‑Show Reducer — Per Location”
- **Billing:** Monthly subscription per location.
- **Optional:** One-time “Concierge Setup” fee.

**Week 1 policy (FREE launch):**
- Run everything in **Stripe Test Mode** OR create a $0 coupon / 100% discount code for pilots.
- Do not charge real cards during Week 1 unless owner explicitly chooses to (out of scope for Week 1 policy).

### Stripe objects
Create in Stripe Dashboard (Test Mode):
- **Product:** No‑Show Reducer (Per Location)
  - **Recurring Price:** `price_location_monthly` (e.g., $149/mo later; for Week 1 you can set normal price but apply 100% off coupon, or create a temporary $0 pilot price)
- **Product:** Concierge Setup
  - **One-time Price:** `price_concierge_setup` (e.g., $299 one-time later; can be $0 for Week 1)

### Checkout session approach
Use **Stripe Checkout Session** for subscriptions.
Two options for setup fee:
1) **Invoice item** added to the subscription at creation time (preferred).
2) Separate one-time Checkout payment first, then subscription.

**Preferred single checkout** (subscription + one-time fee):
- `mode: subscription`
- Add the recurring line item.
- Add one-time fee as an **additional line item** using `price_concierge_setup` (Stripe supports one-time line items in subscription Checkout; if your integration hits a limitation, fall back to invoice-item approach via webhook).

### Session creation (server-side contract)
Endpoint: `POST /api/stripe/create-checkout-session`

**Request body**
```json
{
  "plan": "location_monthly",
  "locations": 1,
  "addConcierge": true,
  "customerEmail": "owner@business.com",
  "orgName": "Acme Dental",
  "successPath": "/onboarding?session_id={CHECKOUT_SESSION_ID}",
  "cancelPath": "/pricing"
}
```

**Server creates session**
- `customer_email = customerEmail`
- `line_items`: subscription price × `locations`
- If `addConcierge`: add one-time line item
- `allow_promotion_codes: true` (for Week 1: use 100% off code)
- `metadata` (critical):
  - `orgName`
  - `locationsPurchased`
  - `addConcierge`
  - `source=website`
- `success_url = <BASE_URL> + successPath`
- `cancel_url = <BASE_URL> + cancelPath`

**Response**
```json
{ "url": "https://checkout.stripe.com/c/pay/cs_test_..." }
```

### Webhook (activation gating)
Endpoint: `POST /api/stripe/webhook`
Handle events:
- `checkout.session.completed`:
  - Verify signature.
  - Read `session.customer`, `session.subscription`, and metadata.
  - Create/lookup `org` by `customer_email`.
  - Mark `billingStatus = active_pilot` (Week 1) or `active_paid` (later).
  - Create `entitlements.locations = locationsPurchased`.
  - Allow onboarding to proceed.

## 2) Onboarding flow (checkout → intake → provision → test SMS)

### Pages
- `/pricing` — plan overview + CTA
- `/checkout` — posts to create session and redirects to Stripe
- `/onboarding?session_id=...` — intake form (requires validated Stripe session)
- `/onboarding/success` — shows “Test message sent” + next steps

### Intake form (per-location config)
Endpoint: `POST /api/onboarding/submit`

**Org-level fields**
- Business name (string)
- Primary contact name (string)
- Owner mobile number (E.164, used for test SMS)
- Owner email (prefill from Stripe)
- Industry (optional)
- Consent acknowledgement (required checkbox):
  - “I confirm I have permission to text my customers and will only message numbers that have consented.”

**Location-level fields (repeatable, supports duplication)**
- Location nickname (e.g., “Downtown”)
- Location address (optional)
- Timezone (IANA: `America/New_York`)
- Service hours (Mon–Sun open/close)
- Appointment types (optional tags)
- Reminder timing rules (defaults):
  - T-24h reminder (Yes/No)
  - T-2h reminder (Yes/No)
  - Confirmation request (Yes/No)
  - If no response: follow-up at T-12h (Yes/No)
- Two-way keywords:
  - Confirm: YES/Y/CONFIRM
  - Cancel: NO/N/CANCEL
  - Reschedule: RESCHEDULE/R
- Waitlist upload:
  - CSV upload (name, mobile, desired days/times)
- Calendar/source integration choice:
  - “We will upload appointments CSV daily” (Week 1 quick start)
  - “Connect Google Calendar” (later)
  - “Connect EHR/booking system” (later)

**Duplication support**
- Button: “Duplicate this location settings” → copies everything except nickname/address.
- Backend: store as `locationTemplateId` or clone config.

### Provisioning step (async recommended)
After onboarding submit:
1) Create location record (status: `provisioning`).
2) Provision messaging resources (Twilio number / messaging service) — see section 3.
3) Send **test SMS** to owner mobile:
   - “No‑Show Reducer test: You’re connected. Reply YES to confirm.”
4) Mark location `active` once test response received OR mark `active_pending` if outbound succeeded.

## 3) Twilio provisioning + STOP/HELP compliance

### Week 1 no-spend handling
- Implement provisioning code paths but gate actual number purchase behind a flag:
  - If Twilio trial exists and supports a free number, use it.
  - Otherwise, set location to `smsPending=true` and proceed with email-only reminders for Week 1 pilots (still captures value + pipeline).

### Provisioning endpoint contract
Endpoint: `POST /api/twilio/provision-number`
Input: `{ "locationId": "loc_123", "areaCode": "415" }`
Output: `{ "fromNumber": "+1415...", "messagingServiceSid": "MG..." }`

### Inbound SMS webhook (STOP/HELP)
Endpoint: `POST /api/twilio/inbound`
- Verify Twilio signature (if feasible now; otherwise log and add verification ASAP).
- Parse:
  - `From` (customer number)
  - `To` (your Twilio number)
  - `Body`
- Normalize `Body` to uppercase trimmed.

**STOP keywords (must honor immediately)**
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Action:
- Add `From` to suppression list scoped by `To` (location number) and also a global org suppression list.
- Reply:
  - “You are opted out and will no longer receive messages. Reply START to opt back in. Msg&data rates may apply.”

**START/UNSTOP keywords**
- START, YES (optional), UNSTOP
Action:
- Remove from suppression list.
- Reply:
  - “You are opted in. Reply STOP to opt out. Msg&data rates may apply.”

**HELP keyword**
- HELP, INFO
Reply:
- “No‑Show Reducer: appointment reminders. Reply STOP to opt out. For help contact agent_bob_replit+no-show-bot@agentmail.to.”

**Enforcement (outbound)**
Before sending any SMS:
- Check suppression list for that customer number.
- If suppressed, do not send.

## 4) Customer-facing consent language (paste into forms + footer)

### Checkout / onboarding consent checkbox
“I confirm that (1) I will only upload/message customers who have provided consent to receive SMS about their appointments, (2) I will include required opt-out instructions, and (3) I understand messages are sent using third‑party carriers and delivery is not guaranteed.”

### Appointment message footer (recommended)
“Reply STOP to opt out. Reply HELP for help.”

### Example opt-in language the client can use (their booking forms)
“By providing your mobile number, you agree to receive appointment reminders and updates by SMS from [Business Name]. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

## 5) Message template approval guidelines (internal)
- Only send transactional content related to an existing appointment (time/date/location/provider) unless the business has separate marketing consent.
- Always include STOP/HELP footer on reminders.
- Avoid sensitive health details in SMS (HIPAA/PHI risk). Use generic language: “You have an appointment tomorrow at 2:00 PM.”
- Keep messages under 160–240 chars when possible.

## 6) Minimal Terms + DPA-lite (starter text)

### Terms (high-level clauses)
- Service provides automated reminders/confirmations; delivery depends on carriers.
- Customer (business) is responsible for obtaining consent and complying with TCPA/CTIA and applicable laws.
- Prohibited content: marketing without consent, sensitive personal data in SMS, illegal activities.
- Limitation of liability and service availability disclaimers.

### DPA-lite (data handling summary)
- We process customer contact + appointment metadata solely to send reminders and confirmations.
- Subprocessors: Twilio (SMS), Stripe (billing).
- Data retention: configurable; default 90 days for message logs.
- Security: access controls; least privilege.

## 7) Done-for-you concierge setup checklist (<30 minutes)

**Inputs to request (copy/paste email)**
Send to client from: agent_bob_replit+no-show-bot@agentmail.to
- Business name + location name(s)
- Owner mobile for testing
- Timezone per location
- Reminder timing preference (24h/2h or custom)
- Export of tomorrow’s appointments (CSV) OR read-only calendar access
- Waitlist CSV (optional)

**Concierge steps**
1) Create org + location in admin.
2) Apply default reminder rules.
3) Provision/send test SMS to owner.
4) Confirm STOP/HELP footer present.
5) Import sample appointments (5–10 rows) and send one test reminder to owner.
6) Verify two-way replies update status (YES/NO/RESCHEDULE).
7) Provide client a “Go live” confirmation email with:
   - What number texts will come from
   - How to opt out
   - What to tell customers

## 8) Implementation note: per-location storage + duplication

Data model (minimal):
- `org`: id, name, ownerEmail, ownerPhone, stripeCustomerId, stripeSubscriptionId, entitlements
- `location`: id, orgId, name, timezone, hoursJson, reminderRulesJson, fromNumber, twilioMessagingServiceSid, status
- `suppression`: id, orgId, locationId (nullable for global), phoneE164, status, createdAt

Duplication:
- `POST /api/locations/:id/duplicate` clones reminderRulesJson/hoursJson/settings into a new location.

---
If you want, next cycle I will turn the above into concrete Express/Next/Node route code stubs (Stripe SDK + Twilio SDK) matching the Replit project structure, and produce paste-ready Terms/Privacy/DPA pages for the website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2