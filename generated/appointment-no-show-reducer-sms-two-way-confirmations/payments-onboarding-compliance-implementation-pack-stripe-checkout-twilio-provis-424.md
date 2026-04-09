# Payments + Onboarding + Compliance Implementation Pack (Stripe Checkout + Twilio Provisioning + Concierge SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:14:25.563Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance Pack

Business website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

## 1) Stripe billing architecture (subscription + optional setup fee)

### Recommended offers
**Plan A (Core):** $199/location/month (starter), includes 1 location, 1 SMS number, up to X reminders/month (keep “fair use” wording if you don’t want a hard cap).

**Plan B (Multi-location):** $149/location/month with minimum 3 locations (optional).

**One-time concierge setup fee (optional):** $299/location (waived for annual or limited-time promo).

You can implement as:
- **Subscription product/price** in Stripe (recurring monthly)
- **Setup fee** as an additional one-time line item in the same Checkout Session (mode=subscription supports `line_items` with a one-time price) OR as `subscription_data[add_invoice_items]`.

### Checkout flow
**Landing → Checkout → Intake form**
1) Customer clicks “Start” → choose number of locations + whether concierge setup.
2) Stripe Checkout collects payment method and starts subscription.
3) On success redirect to onboarding intake form with `session_id`.

### Success / Cancel URLs
Use your app domain:
- Success: `https://<your-domain>/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://<your-domain>/pricing?canceled=1`

### Stripe metadata to capture (critical for automation)
Include metadata on the Checkout Session and/or Customer:
- `business_name`
- `primary_contact_email`
- `primary_contact_phone`
- `locations_purchased` (integer)
- `concierge_setup` (true/false)
- `timezone` (if known)

### Webhooks to enable
- `checkout.session.completed` (start provisioning workflow)
- `invoice.paid` (keep service active)
- `invoice.payment_failed` (pause sending)
- `customer.subscription.deleted` (disable location sending)

### Minimal Stripe Checkout Session parameters (implementation spec)
Server creates session:
- `mode: 'subscription'`
- `line_items: [{price: PRICE_ID_SUB, quantity: locations}]`
- if setup fee chosen: add `line_items: [{price: PRICE_ID_SETUP, quantity: locations}]` (setup price is one-time)
- `customer_email` (if not logged in)
- `allow_promotion_codes: true`
- `automatic_tax: {enabled: false}` initially (keep simple)
- `success_url`, `cancel_url`
- `metadata` as above

Post-checkout: you must store Stripe `customer`, `subscription`, and `checkout_session_id` → map to your `account_id`.

---

## 2) Onboarding: frictionless intake form (per-location configuration)

### Goal
In <5 minutes, collect everything needed for a first working reminder. Keep it concierge-friendly: a human can complete it in under 30 minutes even if the client is unsure.

### Pages
- `/checkout` (plan selector) → Stripe Checkout redirect
- `/onboarding?session_id=...` (intake)
- `/onboarding/success` (next steps + “send test now”)

### Intake form fields (Account-level)
**Business info**
- Business name (text)
- Main contact name (text)
- Owner/manager mobile phone (E.164 format)
- Notification email (defaults to payer email)
- Default timezone (IANA e.g., `America/New_York`)

**Compliance confirmations** (checkboxes)
- “I confirm I have obtained customer consent to receive SMS reminders and will only upload/enter opted-in numbers.” (required)
- “I agree to Terms and acknowledge the Privacy/DPA.” (required)

**Messaging preferences**
- Brand name to display in message (text)
- Tone: Professional / Friendly
- Reply handling: Confirm/Cancel keywords (default YES/NO)

### Intake form fields (Location-level; repeatable + duplicable)
Each location is a record. Provide “Add location” and “Duplicate from location 1”.

**Location basics**
- Location name (e.g., “Downtown Clinic”)
- Address (optional)
- Location phone (optional)

**Operating hours**
- Days open (Mon–Sun toggles)
- Open time / Close time (local)
- Holiday closure handling: “Skip reminders on holidays” (optional later)

**Appointment source / calendar access** (choose one)
- Option A: “We will upload a daily appointment CSV” (fastest pilot)
- Option B: “Connect Google Calendar” (OAuth)
- Option C: “Connect Calendly/Acuity” (API)
- Option D: “We use a PMS/EMR” (free text)

For MVP: implement Option A + manual import; collect future integration preference.

**Reminder timing**
- Reminder #1: 24 hours before (default)
- Reminder #2: 2 hours before (default)
- Same-day morning reminder (optional toggle)
- Minimum quiet hours window (e.g., do not text 9pm–8am)

**Two-way confirmation settings**
- Confirmation keywords: YES/NO (default)
- If NO: offer reschedule link or “reply RESCHEDULE” (choose)

**Waitlist**
- Enable waitlist fill (toggle)
- Waitlist upload: CSV (name, phone, preferred days/times)
- Gap-fill rule: if a cancellation occurs < X hours, send to waitlist (default 24h)

**Message template approval**
- Provide editable template fields, but require explicit approval checkbox:
  - “I approve the exact message templates shown below for this location.”

### Storage model (must support per-location duplication)
- `accounts` table: id, business_name, contact_email, owner_phone, timezone, stripe_customer_id, stripe_subscription_id, status
- `locations` table: id, account_id, name, timezone_override, hours_json, reminder_rules_json, waitlist_enabled, templates_json, twilio_number_sid, twilio_phone_e164, opt_out_list_id
- `appointments` table: id, location_id, start_at, customer_name, customer_phone, status, last_reminder_at, confirmed_at, canceled_at
- `suppression_list` table: id, location_id (or account_id), phone_e164, reason('STOP'), created_at

Duplication: `POST /api/locations/:id/duplicate` → copies rules/templates/hours to a new location record.

---

## 3) Twilio provisioning + test message

### Provisioning workflow (automated)
Trigger: `checkout.session.completed` webhook OR onboarding submit.

Steps:
1) Create (or reuse) Twilio subaccount per customer (optional; simplest is one master account with tags).
2) Search available local numbers matching location area code (if provided) else default.
3) Buy number (requires Twilio funds; may work on trial with limitations).
4) Configure Messaging Webhook URLs:
   - Incoming message webhook: `POST https://<your-domain>/api/twilio/inbound`
   - Status callback: `POST https://<your-domain>/api/twilio/status`
5) Store phone number SID + E.164 on location.
6) Send owner test message:
   - To owner phone: “Your reminders are active for <Location>. Reply YES to confirm you receive texts. Text STOP to opt out.”

### Two-way message handling (inbound)
Incoming SMS parsing rules (case-insensitive, trim punctuation):
- STOP / UNSUBSCRIBE / CANCEL / END / QUIT → add sender to suppression list and reply “You’re opted out. Reply START to resubscribe.”
- START / YES (when opted-out) → remove from suppression list and reply “You’re opted back in. Reply STOP to opt out.”
- YES / Y → mark appointment confirmed (match by phone + nearest upcoming appt within window)
- NO / N → mark appointment canceled; optionally trigger reschedule workflow or waitlist fill
- RESCHEDULE → send reschedule link (or notify staff)

### Critical compliance behavior
- If phone is in suppression list, do **not** send outbound reminders.
- Maintain logs: message SID, to/from, content hash, timestamps, delivery status.

---

## 4) Consent language + opt-out language (embed in checkout + intake)

### Customer-facing consent statement (for your clients to use)
“By providing your mobile number, you agree to receive appointment reminders and service-related messages via SMS from <Business Name>. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, START to re-subscribe. For help, reply HELP.”

### In-product requirement (client attestation)
Checkbox: “I confirm I have obtained express consent from customers to receive SMS reminders and will only message opted-in recipients.”

### HELP response
If inbound equals HELP: reply “Help: This number sends appointment reminders from <Business>. Reply STOP to opt out. Contact <business phone/email> for assistance.”

---

## 5) Terms + DPA basics (short-form, MVP)

### Terms (minimum viable sections)
1) Service description: SMS reminders, confirmations, waitlist.
2) Customer responsibilities: consent collection, lawful contact data, honoring opt-outs.
3) Prohibited use: marketing blasts, purchased lists.
4) Availability: best-effort; carriers may filter.
5) Fees + billing: subscription per location, setup fee if applicable.
6) Data handling: you process appointment/contact data to provide service.
7) Limitation of liability.
8) Termination: for non-payment or abuse.

### DPA/Privacy (minimum viable sections)
- You act as processor; customer is controller.
- Data types: names, phone numbers, appointment times, message logs.
- Subprocessors: Twilio, Stripe, hosting provider.
- Retention: keep message logs X days (e.g., 90) unless required longer.
- Security: access controls; encryption in transit.

(Implement as simple hosted pages linked in checkout and intake; capture acceptance timestamp + version.)

---

## 6) Message template approval guidelines (to reduce carrier filtering)

Rules:
- Identify sender: include business name.
- Keep under 160–300 chars when possible.
- Avoid ALL CAPS, excessive punctuation, shortened links; use branded domain when available.
- No marketing language ("sale", "deal") for reminders.
- Always include opt-out info at least in first message thread or initial confirmation.

Default templates (location-scoped):
1) 24h reminder:
“<Business>: Reminder of your appointment on <Day> at <Time>. Reply YES to confirm or NO to cancel. Reply STOP to opt out.”
2) 2h reminder:
“<Business>: Your appointment is at <Time> today. Reply YES to confirm or NO to cancel. STOP to opt out.”
3) Waitlist offer:
“<Business>: An earlier time opened up at <Time>. Reply YES within 10 minutes to claim it. STOP to opt out.”

---

## 7) Concierge setup SOP (done-for-you checklist, <30 minutes)

### Pre-req (2 minutes)
- Confirm payer email and owner mobile.
- Confirm number of locations purchased.

### Step 1 — Intake completion (8–10 minutes)
- Fill business name, timezone, owner phone.
- For each location: name, hours, reminder timing defaults (24h + 2h), confirmation keywords YES/NO.
- Choose appointment source for pilot: “Daily CSV upload” unless integration already known.

### Step 2 — Consent verification (2 minutes)
- Ask client (email) to confirm: “You collect SMS consent at booking and include STOP info.”
- Ensure consent checkbox checked + timestamp stored.

### Step 3 — Twilio number provisioning (5 minutes)
- Provision number per location (or one shared number if MVP; document choice).
- Verify inbound webhook configured.

### Step 4 — Send owner test (2 minutes)
- Send test message to owner.
- Have owner reply YES; verify inbound processed.

### Step 5 — First live data (8–10 minutes)
- Upload sample appointments CSV for the next day (5–20 appts).
- Trigger a “dry-run preview” screen of scheduled reminders.
- Turn on live sending.

### Step 6 — Handoff (2 minutes)
Email client from agent_bob_replit+no-show-bot@agentmail.to:
Subject: “<Business> reminders are live for <Location>”
Body:
- Their Twilio number
- Reminder schedule
- How confirmations work (YES/NO)
- Opt-out behavior (STOP)
- Support link: website URL above

---

## 8) What “live” means (acceptance criteria)
A location is considered provisioned when:
- Stripe subscription active
- Location config saved
- Twilio number assigned + inbound webhook receiving
- Owner received and replied to a test SMS
- At least 1 appointment imported and a reminder is scheduled
- STOP tested once and suppression verified
