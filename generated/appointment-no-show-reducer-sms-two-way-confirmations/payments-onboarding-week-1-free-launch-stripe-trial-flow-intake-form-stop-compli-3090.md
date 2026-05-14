# Payments + Onboarding (Week-1 Free Launch) — Stripe Trial Flow, Intake Form, STOP Compliance, and 30-Min Concierge SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:22:47.229Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance (Week 1: $0 spend)

## 0) Goal (Week 1 constraint)
We must enable a frictionless path from interest → “live pilot” **without spending money**. That means:
- Stripe can be configured on free tier, and we can run a **7‑day free trial** subscription (no charge collected until after trial).
- Twilio number purchase/sending may require funds; in Week 1 we support either:
  1) **BYON (Bring Your Own Number)**: client connects an existing SMS-capable number (or we configure later), or
  2) **Manual demo mode**: system runs reminders “dry-run” + logs, while we send a limited test via any available free/trial mechanism.

The product still needs compliance basics: consent language, STOP/HELP handling rules, suppression, and template approval.

---

## 1) Stripe Checkout: 7-day free trial subscription (no Week-1 charges)
### Recommended pricing objects
Create 2 Products in Stripe (Dashboard):
1) **No-Show Reducer — Per Location** (Recurring)
   - Price: e.g., $99/mo (edit later)
   - Billing: monthly
   - **Trial**: 7 days (set on the subscription/Checkout Session)
2) **Concierge Setup (Optional)** (One-time)
   - Price: $0 in Week 1 (or don’t offer until Week 2)
   - In Week 2+: can be $149–$499 depending on DFY scope

### Checkout session requirements (developer notes)
When creating a Checkout Session (mode=subscription):
- Collect email
- Success URL should send user directly to intake form:
  - `success_url = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL:
  - `cancel_url = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2/checkout?canceled=1`
- Metadata to attach (either on Customer or Subscription):
  - `org_name` (if known)
  - `location_count=1`
  - `source` (demo/outreach)
  - `pilot=true`

**Trial setting**: set `subscription_data.trial_period_days = 7`.

### Checkout page disclosure copy (paste-ready)
**Header:** Start your 7‑day free pilot

**Bullets:**
- Smart SMS reminders + two-way confirmations
- Auto-reschedule prompts and waitlist gap-filling
- Location-level analytics to quantify recovered revenue

**Legal/consent notice (show near CTA):**
“By starting a pilot, you agree to our Terms and acknowledge our messaging policy. You are responsible for obtaining customer consent to receive appointment-related text messages. Messages must include opt-out instructions (reply STOP to unsubscribe).”

**Footer links (publish on site):** Terms • Privacy • Data Processing Addendum (DPA) • Messaging/Consent Policy

---

## 2) Onboarding Intake Form (post-checkout)
### UX flow
1) Stripe Checkout success → redirects to `/onboarding?session_id=...`
2) Intake form collects per-location details
3) On submit: create Org + Location config; mark Location status as `pending_provisioning`
4) Provisioning step (Week 1):
   - If BYON: store their number and set status `ready_for_test`
   - If Twilio-funded later: set status `needs_number_purchase`
5) Send test message to owner; on success set status `active`

### Form fields (minimum viable)
**Business (Org)**
- Business name (text, required)
- Primary contact name (text, required)
- Owner mobile for test messages (E.164, required)
- Contact email (prefill from Stripe email if available)

**Location (repeatable; start with 1)**
- Location name (text, required) (e.g., “Downtown Clinic”)
- Location address (optional)
- Timezone (dropdown, required)
- Service hours (e.g., Mon–Fri 9–5) (structured or free text)
- Appointment types (comma list or add/remove chips) (optional)

**Reminder policy**
- Reminder schedule (checkboxes):
  - 24 hours before
  - 3 hours before
  - 1 hour before
- Two-way confirmation enabled? (yes/no)
- If not confirmed, send follow-up? (yes/no; default yes)

**Reschedule & waitlist**
- Reschedule link (URL) OR reschedule instructions (text)
- Waitlist enabled? (yes/no)
- Waitlist contacts upload (CSV) OR connect Google Sheet link (Week 1: accept CSV only)

**Calendar/booking source** (Week 1: simplest)
- Booking system (dropdown): Calendly / Google Calendar / Acuity / Square / Other
- “How do you want to provide appointments?”
  - Upload CSV daily (Week 1)
  - Forward booking emails (later)
  - API integration (later)

**Compliance confirmations (required checkboxes)**
1) **Customer consent** (required):
   - “I confirm my customers have provided consent to receive appointment-related SMS messages from my business. I understand I must include opt-out instructions and honor STOP requests.”
2) **Messaging use** (required):
   - “I will only use the service for transactional appointment messages (reminders, confirmations, rescheduling) and not for unrelated marketing without explicit opt-in.”
3) **Template approval** (required):
   - “I approve the default message templates below (or I will edit them now and approve the edited versions).”

### Default message templates (editable + approve)
Template A — Reminder + confirm:
“Hi {{first_name}}, reminder: you have an appointment at {{business_name}} on {{date}} at {{time}}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”

Template B — Not confirmed follow-up:
“Hi {{first_name}}, we didn’t see a confirmation for your {{business_name}} appointment on {{date}} at {{time}}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”

Template C — Reschedule instructions:
“No problem — to reschedule, use {{reschedule_link}} or reply with a preferred day/time. Reply STOP to opt out.”

Template D — Waitlist opening:
“Good news — an earlier time opened at {{business_name}}: {{date}} {{time}}. Reply TAKE to claim it. Reply STOP to opt out.”

---

## 3) STOP/HELP compliance (inbound + outbound rules)
### Inbound keyword handling (minimum)
If inbound message body (case-insensitive) matches any of:
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Then:
1) Mark `phone_number` as opted_out=true in suppression list (scoped to location OR global; recommend **global** to be safe).
2) Respond once:
   - “You are unsubscribed and will no longer receive messages. Reply START to re-subscribe.”
3) Do not send further outbound messages to that number.

If inbound matches HELP:
- Respond:
  - “{{business_name}} appointment messages. Reply STOP to opt out. For help call {{business_phone}}.”

If inbound matches START (or YES for re-opt-in only if you choose):
- Mark opted_out=false
- Respond:
  - “You are re-subscribed. Reply STOP to opt out.”

### Outbound enforcement
Before sending any SMS, check suppression list:
- If `opted_out=true`, block send and log `blocked_optout` event.

### Audit logging (recommended minimum)
Log events with: timestamp, location_id, to_number, message_type, status (sent/blocked/failed), provider_id.

---

## 4) Per-location configuration + duplication
### Data model (minimum)
- Org: id, name, owner_name, owner_phone, owner_email, stripe_customer_id
- Location: id, org_id, name, timezone, service_hours, reminder_policy_json, reschedule_link, waitlist_enabled, status
- MessagingProfile: id, location_id, from_number, provider (twilio/byon), messaging_service_sid (optional)
- Suppression: id, org_id (or global), phone_e164, opted_out, opted_out_at

### Duplicate location flow
In UI: “Duplicate location” button
- Creates new Location with same reminder_policy_json + templates + waitlist settings
- Prompts only for: name, timezone (if different), from_number (if BYON)

---

## 5) Done-for-you concierge setup SOP (≤ 30 minutes)
### What to ask the client for (copy/paste email)
Subject: Quick setup for your No‑Show Reducer pilot (10 minutes)

Hi {{name}},

To launch your pilot, reply with:
1) Business name + location name
2) Timezone + service hours
3) Reminder timing (choose: 24h, 3h, 1h)
4) Reschedule link/instructions
5) If you have a waitlist: upload a CSV of names + mobile numbers
6) The best mobile number to receive a test message

We’ll activate the pilot and send you a test text the same day.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

### Operator checklist (timeboxed)
**0–5 min:** Verify Stripe checkout completed (or pilot marked active). Confirm owner phone is in E.164.

**5–12 min:** Create Org + Location, set timezone, service hours, reminder schedule.

**12–18 min:** Configure messaging profile:
- Week 1: set provider=BYON and record client SMS-capable number (or mark needs_number_purchase).

**18–25 min:** Template approval:
- Confirm templates include business name + appointment time + STOP language.

**25–30 min:** Send owner test message:
- “Test: your reminders are active for {{location}}. Reply YES to confirm you received this.”
- If received, mark Location=active.
- If not, troubleshoot formatting/number.

### Completion criteria
- Location status=active
- Test SMS acknowledged by owner
- Suppression list enabled
- Default templates approved

---

## 6) Terms/DPA-lite essentials (paste-ready clauses)
### Messaging consent (customer-facing)
“You will receive appointment-related text messages (reminders, confirmations, and rescheduling) from {{business_name}}. Message and data rates may apply. Reply STOP to unsubscribe, HELP for help.”

### DPA-lite summary
We act as a service provider processing appointment contact data on behalf of the business. We process only what is needed to deliver reminders/confirmations, maintain reasonable security controls, and delete data upon request subject to legal/operational retention.

### Template approval guideline (internal)
No outbound template can be enabled unless it:
1) Identifies the business
2) States the appointment context
3) Provides a clear next action (YES/NO/TAKE)
4) Includes “Reply STOP to opt out”

---

## 7) Engineering endpoint contract (minimal)
- `POST /api/stripe/create-checkout-session` → returns Checkout URL
- `POST /api/onboarding/submit` → creates Org/Location, stores config, returns status
- `POST /api/location/:id/duplicate` → duplicates config
- `POST /api/twilio/inbound` (or `/api/sms/inbound`) → handles STOP/HELP/START + replies

This package is Week‑1 compliant: it enables pilots and onboarding without requiring Twilio spend while still implementing consent capture and opt-out handling correctly.
