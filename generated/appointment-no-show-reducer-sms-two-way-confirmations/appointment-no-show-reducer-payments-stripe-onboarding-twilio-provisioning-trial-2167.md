# Appointment No-Show Reducer — Payments (Stripe) + Onboarding + Twilio Provisioning (Trial-Compatible) + STOP Compliance + Concierge Setup SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:01:10.728Z

---

## Goal (Week 1: $0 spend)
Create a frictionless onboarding path that works end-to-end in demo/pilot mode without paid spend: **Stripe (test mode) Checkout → Intake form → Save per-location config → Provision messaging identity (trial-compatible) → Test message to owner → Ready to activate reminders/waitlist.**

Public legitimacy URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

---

# 1) Stripe: subscription + optional concierge setup fee (test-mode first)
## 1.1 Pricing objects
Create two Prices in Stripe Dashboard (test mode):
- **Price A (subscription):** “No-Show Reducer — Per Location” recurring monthly.
- **Price B (one-time):** “Concierge Setup (optional)” one-time.

You can later swap IDs for live-mode prices without changing code.

## 1.2 Checkout session creation (server)
Endpoint: `POST /api/stripe/create-checkout-session`
Input JSON:
```json
{
  "plan": "per_location_monthly",
  "quantity": 1,
  "addConcierge": true,
  "orgName": "Acme Dental",
  "ownerEmail": "owner@acme.com",
  "locationCount": 1
}
```
Server logic:
- Build `line_items`:
  - subscription price with `quantity = locationCount` (or 1 now and let onboarding add locations later).
  - if `addConcierge`, add one-time price.
- Set `mode: "subscription"`.
- Set `customer_email` (or create Customer first).
- Add metadata (critical for provisioning):
  - `org_name`, `owner_email`, `location_count`, `add_concierge`, `source: "checkout"`.
- URLs:
  - `success_url = {APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url = {APP_URL}/checkout?canceled=1`
- Compliance links:
  - Surface Terms + Privacy/DPA + SMS consent links on the checkout page UI (not inside Stripe unless using custom).

## 1.3 Webhook (server)
Endpoint: `POST /api/stripe/webhook`
Events to handle:
- `checkout.session.completed`: mark `org.payment_status = "active"` and store `stripe_customer_id`, `stripe_subscription_id`, `stripe_session_id`.
- `invoice.payment_failed`: mark delinquent.
- `customer.subscription.deleted`: deactivate reminders.

Data model minimum:
- `orgs`: id, name, owner_email, stripe_customer_id, stripe_subscription_id, payment_status
- `locations`: id, org_id, name, timezone, config_json, twilio_* fields, status

**Week 1 note:** This can run entirely in test mode to enable demos and free pilots (no charges).

---

# 2) Onboarding intake form (post-checkout)
Route/UI: `GET /onboarding?session_id=...`
Form submits to: `POST /api/onboarding/submit`

## 2.1 Fields (per org)
- Business/Org name (prefilled from Stripe metadata if present)
- Owner name
- Owner mobile phone (for test SMS)
- Owner email
- Primary contact consent acknowledgment (checkbox)

## 2.2 Fields (per location)
Allow multiple locations; must support **duplicate location**:
- Location name
- Location address (optional)
- Timezone (IANA string e.g. America/New_York)
- Service hours per weekday (open/close)
- Appointment types (optional tags)
- Calendar source:
  - “Google Calendar” (connect later)
  - “CSV upload” (placeholder)
  - “Manual entry” (placeholder)
- Reminder schedule (default, editable):
  - T-48h, T-24h, T-2h (checkboxes)
  - Quiet hours (e.g., 9pm–8am)
- Two-way confirmation:
  - Confirm keywords (YES/Y)
  - Cancel keywords (NO/N)
  - Reschedule keyword (RESCHEDULE)
- Waitlist:
  - Upload list CSV (name, phone, preferences)
  - Or paste phones (trial-friendly)

## 2.3 Compliance acknowledgments (required)
Checkboxes:
1) “I confirm I have obtained consent from recipients to receive appointment reminder texts from my business, and will only message customers for transactional purposes.”
2) “I will include opt-out language and honor STOP requests immediately.”
3) “I reviewed and approve the default message templates (can be edited later).”

Store these as `location.compliance_ack = {timestamp, ip, userAgent, version}`.

## 2.4 Duplicate location behavior
UI button: “Duplicate this location” → clones config JSON except:
- location name (append “(Copy)”)
- Twilio phone fields blank

Endpoint: `POST /api/locations/:id/duplicate`

---

# 3) Twilio provisioning + test message (trial-compatible)
**Constraint (Week 1, $0):** buying numbers usually requires funding. So implement logic with two modes:

## 3.1 Mode A (Trial / No-spend demo)
- Use a single existing Twilio trial number (if available) or require verifying recipient phone numbers.
- Store `location.messaging_mode = "shared_trial"`.
- Outbound test SMS to owner only.

## 3.2 Mode B (Paid later)
- Buy per-location local number, attach to Messaging Service.
- Store `location.messaging_mode = "dedicated"`.

## 3.3 Provision endpoint
Endpoint: `POST /api/twilio/provision-number`
Input: `{ locationId }`
Logic:
- If `ENV TWILIO_CAN_BUY_NUMBERS=false`, skip purchase; mark shared mode; return shared number.
- Else search and purchase local number by area code (from location), create Messaging Service, add number.
- Save:
  - `twilio_phone_number`
  - `twilio_phone_sid`
  - `twilio_messaging_service_sid`

## 3.4 Send owner test message
Endpoint: `POST /api/twilio/send-test`
Input: `{ locationId, ownerPhone }`
Message template:
“[BusinessName]: This is a test reminder system message for LocationName. Reply YES to confirm you receive texts. Reply STOP to opt out.”

Owner reply handling uses the inbound webhook below.

---

# 4) STOP / HELP inbound handling (compliance essential)
Endpoint (Twilio webhook): `POST /api/twilio/inbound`

## 4.1 Keywords
Normalize inbound body: trim, uppercase.
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- START, YES (if previously opted out) → optional opt-in (only if customer initiated)
- HELP → help response

## 4.2 Data structures
- `suppression_list`: org_id, phone_e164, status (opted_out/opted_in), updated_at, source (customer/owner)

## 4.3 Enforcement
Before sending any outbound SMS to a phone:
- If suppressed (opted_out), block send and log event.

## 4.4 Auto-responses
If STOP received:
“<BizName>: You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
If HELP received:
“<BizName>: Appointment reminders. Reply STOP to opt out. Contact: agent_bob_replit+no-show-bot@agentmail.to”

---

# 5) Consent language (paste into onboarding + website)
Use this near phone fields and in Terms:
“By providing a phone number, you confirm you have obtained the recipient’s consent to receive appointment-related text messages from your business. Message frequency varies by appointment activity. Reply STOP to opt out, HELP for help. Standard message and data rates may apply.”

For customers (your client’s end customers), include in every first reminder thread at least once:
“Reply STOP to opt out.”

---

# 6) Message template approval guidelines (internal + client-facing)
Rules:
- Transactional only (appointment reminders, confirmations, reschedules). No marketing blasts.
- Include business name in every message.
- Include opt-out language at least in the first message of a thread and periodically.
- Respect quiet hours and reasonable frequency caps.
- Avoid sensitive medical details; use generic phrasing (“your appointment”).

Default templates:
1) T-24h reminder:
“<BizName>: Reminder of your appointment at <Time>. Reply YES to confirm, NO to cancel, RESCHEDULE to reschedule. Reply STOP to opt out.”
2) Same-day reminder:
“<BizName>: Your appointment is today at <Time>. Reply YES to confirm. Reply STOP to opt out.”
3) Waitlist fill:
“<BizName>: An earlier slot opened at <Time>. Reply YES to take it or NO to pass. Reply STOP to opt out.”

---

# 7) Basic Terms + DPA-lite (MVP publishable copy)
## 7.1 Terms (summary text)
- Service provides automated appointment reminder messaging and reporting.
- Customer (business client) is responsible for obtaining consent and ensuring legal compliance for their recipients.
- Opt-out must be honored; system enforces suppression when configured correctly.
- No warranties about revenue recovery; analytics are estimates based on appointments and confirmations.
- Limitation of liability and termination language (simple early-stage).

## 7.2 DPA-lite (summary text)
- We process contact data (name, phone), appointment metadata (time/status), and message events.
- Data used solely to provide and improve the service.
- Subprocessors: Twilio (messaging), Stripe (billing).
- Retention: delete upon request; suppressions retained to honor opt-outs.

Publish as `/terms`, `/privacy`, `/dpa` pages on the website URL, and link them from checkout/onboarding.

---

# 8) Concierge setup SOP (done-for-you, <30 minutes)
## Inputs to request (email template)
Send from agent_bob_replit+no-show-bot@agentmail.to:
Subject: “Quick setup: Appointment No-Show Reducer (15–30 min)” 
Body:
1) Business name + location name(s)
2) Timezone per location
3) Service hours (Mon–Sun)
4) Reminder timing preferences (default: 48h/24h/2h)
5) Owner mobile for test SMS
6) Sample of 1–2 reminder messages they want (or approve defaults)
7) (Optional) Waitlist CSV upload

## Step-by-step (operator checklist)
1) Create org + location(s) in admin.
2) Paste config or fill intake form fields.
3) Click “Provision messaging” (trial/shared mode in Week 1).
4) Send test SMS to owner; wait for YES.
5) Confirm inbound webhook receives YES/STOP properly.
6) Enable reminders for the location.
7) Document template approval (timestamp) and confirm consent checkbox.
8) Send confirmation email: “Live — here’s what to expect + how to pause.”

## Completion definition
- Owner received test SMS and replied YES.
- STOP opt-out tested (owner can opt out then START back in).
- Location config saved and duplicable.

---

# 9) What is ‘live’ in Week 1 (no spend)
- Stripe: test-mode checkout fully functional for demos.
- Twilio: trial/shared messaging for owner test and limited pilot.
- Full compliance mechanics (STOP suppression + help responses) implemented now, regardless of trial vs paid.

When ready to charge (post-Week 1), switch Stripe prices to live mode and enable Twilio dedicated number purchase per location.