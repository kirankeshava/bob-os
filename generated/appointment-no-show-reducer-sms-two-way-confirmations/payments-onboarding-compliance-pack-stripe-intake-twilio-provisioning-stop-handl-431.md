# Payments + Onboarding + Compliance Pack (Stripe, Intake, Twilio Provisioning, STOP Handling, Terms/DPA, Concierge SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:15:22.633Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance Pack

## 1) Stripe billing design (subscription + optional setup)

### Offer structure
We sell **per-location** subscriptions. Each location gets its own configuration (timezone, reminder timing, phone number, opt-out list, templates, waitlist rules) and can be duplicated.

**Recommended packages (editable later):**
- **Starter (1 location)**: $99/month
- **Growth (up to 3 locations)**: $249/month
- **Multi-location (per location)**: $79/location/month (minimum 5 locations)
- **Optional concierge setup (one-time)**: $199

### Stripe objects
Create these in Stripe:
- **Product:** “No-Show Reducer — Subscription”
  - **Prices:**
    - `price_starter_monthly` ($99/mo)
    - `price_growth_monthly` ($249/mo)
    - `price_multilocation_per_location_monthly` ($79/mo) with quantity used for location count
- **Product:** “No-Show Reducer — Concierge Setup (One-time)”
  - **Price:** `price_concierge_setup` ($199 one-time)

### Checkout flow
Use **Stripe Checkout Sessions** (subscription mode). Two options:

**A) Subscription only**
- Checkout Session mode: `subscription`
- Line items: selected subscription price
- Success URL: `/onboarding/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/pricing`

**B) Subscription + one-time setup fee**
- Still `subscription` mode
- Line items:
  - subscription price
  - one-time setup fee price

### Metadata requirements
Attach metadata to the Checkout Session (and copy to Customer/Subscription via webhook):
- `account_email` (payer/admin)
- `plan_key` (starter/growth/multi)
- `locations_purchased` (integer; for multi-location quantity)
- `source` (demo, inbound, cold_email, partner)

### Webhooks
Implement:
- `checkout.session.completed` → create internal `Account`, `Subscription`, and `Location(s)` placeholders; set status = `paid_pending_onboarding`.
- `invoice.paid` → keep active.
- `customer.subscription.deleted` or `invoice.payment_failed` → pause messaging + show banner in app.

**Operational guardrail:** never send production SMS unless subscription status is active.

---

## 2) Frictionless onboarding path

### UX: checkout → intake → provision → test
1. Customer pays via Stripe Checkout.
2. Stripe redirects to **Onboarding Success** page with “Continue setup”.
3. Customer completes **Intake Form** (per location).
4. System provisions Twilio number + messaging service (per location).
5. System sends **test SMS** to owner/admin phone and requires confirmation.

### Intake form fields (minimum viable)
**Business & admin**
- Business name
- Primary contact name
- Admin mobile phone (for test + alerts)
- Admin email (pre-fill from Stripe)

**Location (repeatable / duplicable)**
- Location nickname (e.g., “Downtown Clinic”)
- Location address (optional; helps number locality)
- Timezone (required)
- Service hours (Mon–Sun open/close)
- Appointment types (optional)

**Reminders & confirmations**
- Reminder schedule (defaults):
  - 24 hours before
  - 2 hours before
- Confirmation mode:
  - Reply **1** to confirm
  - Reply **R** to reschedule
- Reschedule handling:
  - Send reschedule link (if available)
  - Or route to staff phone/email

**Calendar/booking integration (concierge allowed)**
- “How do you schedule appointments?” (choices: Calendly, Acuity, Square, Google Calendar, Jane, Mindbody, Custom)
- Connection method:
  - OAuth (if supported)
  - Provide booking link
  - Upload CSV daily
  - Forward confirmation emails to parser (future)

**Waitlist / gap fill**
- Enable waitlist: yes/no
- Waitlist upload (CSV: name, phone, preferred times)
- Rules:
  - How far ahead can we offer openings? (e.g., next 7 days)
  - Offer window expiry (e.g., 15 minutes)

**Compliance & consent confirmations (checkboxes)**
- “I confirm I have obtained consent to send SMS reminders to my customers.”
- “I agree to the Terms and Data Processing Addendum.”
- “I understand message & data rates may apply and customers can opt out by replying STOP.”

### Data model (per-location)
- `Account`
- `Location`
  - timezone
  - hours
  - reminder_offsets
  - templates (approved)
  - twilio_number
  - twilio_messaging_service_sid
  - opt_out_list (or separate table)
- `Customer` (optional)
- `ConsentRecord` (recommended)
- `OptOut` (phone, location_id, timestamp, source)

**Duplication feature:** “Duplicate location settings” clones everything except phone number + opt-out list.

---

## 3) Twilio number provisioning + test message

### Provisioning steps (per location)
1. Search for available local number (prefer same area code as location; fallback any US local).
2. Buy number.
3. Create Messaging Service (recommended for scaling) and add purchased number.
4. Set webhook URLs:
   - Inbound messages → `/webhooks/twilio/inbound`
   - Status callbacks → `/webhooks/twilio/status`
5. Persist:
   - `twilio_phone_number`
   - `phone_number_sid`
   - `messaging_service_sid`

### Test SMS flow
Immediately after provisioning, send SMS to admin mobile:
- “This is your Appointment No-Show Reducer test. Reply YES to confirm you received messages for {LocationName}.”
Mark location as `ready` only after YES.

---

## 4) STOP / HELP compliance handling (core)

### Required behavior
If inbound message body matches (case-insensitive):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → mark phone as opted out for that location and respond:
  - “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- START, YES, UNSTOP → remove opt-out and respond:
  - “You’re re-subscribed. Reply STOP to opt out.”
- HELP → respond:
  - “Appointment reminders from {BusinessName}. Reply STOP to opt out. For help call {LocationPhone}.”

### Implementation notes
- Always honor opt-outs before sending.
- Store opt-out at minimum by `location_id + phone_e164`.
- If multi-location customer uses same phone, opt-out should apply to the sending location by default (safer); optionally provide global opt-out later.

---

## 5) Customer consent language (for client to place on booking forms)
Client-facing snippet (paste into booking/registration pages):

> **SMS Consent:** By providing your mobile number, you agree to receive appointment reminders and service-related messages from **{BusinessName}**. Message frequency varies. Message and data rates may apply. Reply **STOP** to opt out, reply **HELP** for help.

Internal requirement: do not allow marketing/promotional blasts by default. Keep it strictly appointment/service messages unless explicitly enabled with additional consent.

---

## 6) Message template approval guidelines

### Allowed by default (transactional/service)
- Appointment reminders
- Confirmation requests
- Reschedule links
- “We have an opening” waitlist offers

### Disallowed by default
- Promotions, coupons, newsletters
- Non-appointment-related outreach

### Template rules
- Must identify business or location in first message.
- Must include opt-out instructions at least once in first interaction thread (and accessible via HELP).
- Avoid sensitive medical/financial details. Use generic wording (“your appointment”).

Example reminder template:
- 24h: “{BusinessName}: Reminder of your appointment on {Date} at {Time}. Reply 1 to confirm, R to reschedule. Reply STOP to opt out.”
- 2h: “{BusinessName}: See you at {Time}. Reply R if you need to reschedule. Reply STOP to opt out.”

---

## 7) Basic Terms + DPA (starter text)

### Terms (high-level clauses)
1. **Service.** We provide automated SMS reminders, confirmations, reschedule routing, and waitlist gap-fill messaging based on customer’s appointment data.
2. **Customer Responsibilities.** Customer represents they have lawful basis and required consents to send SMS to end users, and will not use the service for unsolicited marketing.
3. **Opt-out.** We support STOP/START/HELP. Customer agrees not to circumvent opt-out requests.
4. **Acceptable Use.** No illegal content; no harassment; no sensitive personal data in message bodies unless strictly necessary.
5. **Fees & Billing.** Subscriptions billed monthly via Stripe; setup fee if purchased; taxes as applicable.
6. **SMS/Carrier limitations.** Delivery not guaranteed; message and data rates may apply; carriers may filter messages.
7. **Termination.** Either party may terminate; upon non-payment messaging is suspended.
8. **Limitation of Liability.** Cap liability to fees paid in prior 3 months; no consequential damages.
9. **Privacy.** Refer to Privacy Policy and DPA.

### DPA essentials
- Roles: Customer = Controller; we = Processor.
- Processing: appointment metadata (name, phone, appointment time), configuration data.
- Subprocessors: Twilio, Stripe, hosting provider.
- Security: access controls, encryption in transit, least-privilege.
- Retention: configurable; recommend deleting appointment records after X days.

---

## 8) Concierge setup SOP (under 30 minutes)

**Goal:** From payment to first live reminder sent.

### Pre-reqs
- Stripe payment complete
- Intake form complete
- Admin mobile reachable

### Checklist (time-boxed)
1. **(2 min) Verify payment & create account**
   - Confirm Stripe session completed
   - Ensure subscription active

2. **(5 min) Review intake form**
   - Check timezone, service hours, reminder timing
   - Confirm reschedule path (link or staff contact)

3. **(5 min) Provision Twilio number**
   - Buy local number
   - Attach to Messaging Service
   - Save SIDs to location config

4. **(3 min) Configure compliance webhooks**
   - Inbound SMS webhook set
   - Status callback set

5. **(5 min) Approve templates**
   - Insert BusinessName + opt-out line
   - Ensure no sensitive details

6. **(5 min) Send test SMS + verify**
   - Send admin test
   - Admin replies YES
   - Mark location “Ready”

7. **(5 min) Go-live verification**
   - Trigger a sample reminder to admin phone (simulated appointment)
   - Confirm STOP works (admin can test then START to re-enable)

**Completion definition:** location status = READY; templates approved; test appointment reminder delivered; opt-out logic verified.

---

## 9) Customer-facing onboarding email (after purchase)
Subject: Your No-Show Reducer setup — 10 minutes

Body:
Hi — thanks for signing up.

Finish setup here: {OnboardingLink}

You’ll be asked for your location timezone, service hours, reminder timing, and where appointments come from. After that we’ll provision your texting number and send a test SMS to your phone.

Important: Please ensure your booking flow includes SMS consent. Suggested language:
“By providing your mobile number, you agree to receive appointment reminders from {BusinessName}. Msg & data rates may apply. Reply STOP to opt out.”

Support: agent_bob_replit+no-show-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

