# Appointment No-Show Reducer — Payments + Onboarding + Compliance + Concierge Setup (Implementation Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:58:47.554Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance + Concierge Setup (Implementation Pack)

## 1) Goal (1-screen summary)
Create a frictionless conversion path:
1) **Checkout** (Stripe Checkout) → 2) **Intake Form** (per-location settings) → 3) **Provision** (Twilio number / Messaging Service per location) → 4) **Test message** to owner → 5) **Activate** reminders + waitlist fill.

All location settings must be **stored per location**, reusable, and **duplicable** for multi-location businesses.

Website legitimacy link (use in communications):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Support/contact email:
agent_bob_replit+no-show-bot@agentmail.to

---

## 2) Monetization design (Stripe)
### 2.1 Products
**A) Subscription (per location)**
- Name: “No-Show Reducer — Per Location (SMS Reminders + Two-Way Confirmations)”
- Billing: monthly (optionally add annual later)
- Pricing model: per location (quantity)

**B) Optional one-time concierge setup fee**
- Name: “Concierge Setup (Done-for-you configuration)”
- One-time charge

### 2.2 Stripe Checkout approaches
Choose one:

**Option 1 (recommended): Stripe Checkout Session w/ `mode=subscription`**
- Line item #1: subscription price with `quantity = number_of_locations`
- Optional: add one-time setup fee as a second line item (allowed if using `mode=subscription` with additional one-time items)

**Option 2: Separate checkout flows**
- Checkout #1 subscription
- Checkout #2 setup fee (one-time)

### 2.3 Metadata to attach (critical)
Attach to the Checkout Session (and/or Customer):
- `org_id`
- `plan` (e.g., starter/pro)
- `locations_purchased` (quantity)
- `sales_source` (manual/demo/outreach)
- `trial` (true/false)

In webhook fulfillment, store:
- `stripe_customer_id`
- `stripe_subscription_id`
- `stripe_price_id`
- `status` (trialing/active/past_due/canceled)

### 2.4 Checkout URLs
- Success URL: `/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/checkout?canceled=1`

---

## 3) Onboarding intake form (post-checkout)
### 3.1 Minimum fields (per organization)
**Owner/admin**
- Owner full name
- Owner mobile number (for test SMS)
- Owner email (prefill with Stripe email if available)

**Business**
- Business name
- Website (optional)
- Primary industry (dental, med spa, PT, salon, etc.)

### 3.2 Per-location configuration schema
Create a `locations` table with:
- `org_id`
- `location_name`
- `location_address` (optional)
- `timezone` (IANA string, e.g., America/Chicago)
- `service_hours` (JSON by day: open/close)
- `appointment_types` (optional)
- `calendar_source` (Google/Outlook/Other/CSV)
- `calendar_access_method` (OAuth, shared calendar, API key, CSV upload)

**Reminder timing (defaults)**
- `reminder_1_offset_hours` (default 24)
- `reminder_2_offset_hours` (default 2)
- `confirmation_required` (boolean)
- `min_notice_to_reschedule_hours` (default 2)

**Waitlist settings**
- `waitlist_enabled` (boolean)
- `waitlist_contact_upload` (CSV file ref)
- `waitlist_offer_window_minutes` (default 15)
- `waitlist_message_template_id`

**Messaging**
- `twilio_account_sid` (or subaccount sid)
- `twilio_messaging_service_sid`
- `twilio_phone_number`
- `default_from_name` (optional)
- `message_templates` (references)

### 3.3 Duplicate location behavior
Add endpoint/action: **“Duplicate location”**
- Copies messaging templates, reminder offsets, service hours, waitlist settings
- Forces user to update: `location_name`, `timezone`, `address`, and (optional) calendar settings

---

## 4) Twilio provisioning + test message
### 4.1 Provisioning flow
After intake submission:
1) Create or reuse Twilio subaccount for the org (optional but recommended later)
2) Purchase a local number for the location (area code optional; start with generic US local)
3) Create Messaging Service and assign number (or directly use number)
4) Configure webhooks:
   - Inbound SMS webhook: `/api/twilio/inbound-sms`
   - Status callback: `/api/twilio/status-webhook`
5) Persist `phone_number`, `messaging_service_sid`, and webhook configuration status

### 4.2 Owner test message
Immediately after provisioning, send:
- To: owner mobile
- Body: “{BusinessName} reminders are ready. Reply YES to confirm you can receive messages. Reply STOP to opt out.”

If owner replies YES, mark `owner_verified=true`.

### 4.3 Trial-mode constraint
During week 1 (free launch), if Twilio trial limitations block provisioning:
- Allow “Demo mode”: use a shared trial number + verified recipient, and clearly label the account as **pending live number**.

---

## 5) STOP/HELP compliance + suppression rules
### 5.1 Keywords
Treat these inbound messages as opt-out regardless of case/punctuation:
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Treat these as help:
- HELP, INFO

### 5.2 Required behavior
On inbound message:
- If STOP-keyword: add sender to `opt_outs` table (scoped to org or location; recommended org-wide) and respond once:
  - “You are opted out and will no longer receive messages. Reply START to re-subscribe. Support: agent_bob_replit+no-show-bot@agentmail.to”
- If START: remove from opt-out list and respond:
  - “You are re-subscribed. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”
- If HELP: respond:
  - “This number sends appointment reminders and confirmation requests from {BusinessName}. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

### 5.3 Outbound enforcement
Before sending any outbound SMS:
- Normalize E.164 phone
- Check suppression list; if opted out, **do not send**
- Log suppression event

---

## 6) Customer consent language (embed in onboarding + checkout)
Add a checkbox (required) on intake:

**Checkbox label (required):**
“I confirm this business has obtained customer consent to receive SMS reminders and that messages include opt-out instructions.”

**Disclosure text (show under checkbox):**
“By enabling SMS reminders, you agree to send only to customers who have opted in to receive appointment-related texts. Message frequency varies. Message and data rates may apply. Customers can reply STOP to opt out and HELP for help.”

Add to the first reminder template footer:
“Reply STOP to opt out.”

---

## 7) Message template approval guidelines (internal)
Rules:
- Must identify business/location (or be clearly recognizable)
- Must be appointment-related (transactional) unless explicit marketing consent exists
- Must include opt-out instructions at least on first message and on periodic reminders
- Avoid sensitive health details; keep content generic
- No coercion or misleading urgency

Template examples:
1) **24h reminder + confirm**
“Reminder: you have an appointment with {BusinessName} on {Date} at {Time}. Reply C to confirm or R to reschedule. Reply STOP to opt out.”
2) **2h reminder**
“Upcoming appointment today at {Time} with {BusinessName}. Reply C to confirm or R to reschedule. Reply STOP to opt out.”
3) **Reschedule flow**
“Thanks—what time works instead? Reply with a preferred day/time. Reply STOP to opt out.”

---

## 8) Terms (baseline early-stage text)
**Service**: We provide automated appointment reminders, two-way confirmation/rescheduling workflows, and reporting.
**Customer responsibilities**: Customer is responsible for (a) obtaining required SMS consent, (b) lawful use of messaging, (c) accuracy of appointment data, (d) honoring opt-outs.
**No medical advice**: Service is operational messaging only.
**Availability**: Best-effort uptime; SMS delivery depends on carriers.
**Fees**: Subscription per location; optional setup fee.
**Termination**: Customer may cancel; upon termination we stop sending and retain logs for a limited period.
**Liability**: Limit to fees paid in the previous 30 days (typical early-stage cap).

(Place this on a /terms page and link from checkout + onboarding.)

---

## 9) DPA-lite (baseline early-stage text)
- We act as a service provider/processor.
- Data types: contact info, appointment timestamps, message logs, opt-out status.
- Purpose: deliver reminders/confirmations/rescheduling and produce analytics.
- Subprocessors: Twilio (SMS delivery), Stripe (billing).
- Retention: keep message logs/opt-out list as needed for compliance and reporting; delete upon request where feasible.
- Security: access controls; secrets stored in environment; least-privilege.

(Place this on a /dpa page and link from onboarding.)

---

## 10) Concierge setup SOP (done in <30 minutes)
**Pre-req**: Customer completed checkout and intake form.

1) **Confirm org + locations purchased** (2 min)
- Check Stripe session metadata → org record → number of locations.

2) **Verify owner phone** (3 min)
- Trigger provisioning if not done.
- Send test SMS; confirm owner can receive and reply.

3) **Calendar connection** (10 min)
- If Google/Outlook OAuth available: connect.
- If not: request shared calendar or CSV export.
- Validate timezone + appointment fields.

4) **Reminder timing + templates** (5 min)
- Confirm offsets (24h/2h default).
- Confirm business name and opt-out footer.

5) **Waitlist upload (optional)** (5 min)
- Upload CSV, map columns, set offer window.

6) **Compliance confirmation** (2 min)
- Ensure consent checkbox checked.
- Confirm STOP handling test: text STOP to number and ensure suppression.

7) **Go-live** (3 min)
- Activate location.
- Send “go-live” email to owner with what to expect, support email, and the legitimacy link:
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

## 11) Minimal DB tables (suggested)
- `orgs(id, name, owner_name, owner_email, owner_phone, stripe_customer_id, created_at)`
- `locations(id, org_id, name, timezone, service_hours_json, reminder_offsets_json, calendar_config_json, waitlist_config_json, active, created_at)`
- `messaging_locations(location_id, twilio_phone, messaging_service_sid, status)`
- `opt_outs(id, org_id, phone_e164, opted_out_at, source)`
- `message_logs(id, org_id, location_id, to_phone, from_phone, body, status, twilio_sid, created_at)`

---

## 12) Required product pages (fast)
- `/checkout` (explains trial/free-week-1, links terms)
- `/onboarding` (intake form)
- `/onboarding/success`
- `/terms`
- `/dpa`

All pages should list support email: agent_bob_replit+no-show-bot@agentmail.to

---

## 13) Implementation checklist (engineering)
1) Stripe: create checkout session endpoint + webhook handler
2) UI: checkout page + onboarding form + success page
3) DB: org/location + duplication + opt-outs
4) Twilio: provisioning endpoint + inbound STOP/HELP + status callbacks
5) Templates: defaults with opt-out footer
6) Publish Terms/DPA + link everywhere

This pack is designed to be implemented using free tiers first and upgraded only when a paying customer is ready to go live with their own SMS number.