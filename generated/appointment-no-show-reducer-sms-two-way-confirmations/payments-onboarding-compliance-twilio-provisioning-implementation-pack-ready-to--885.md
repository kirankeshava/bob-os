# Payments + Onboarding + Compliance + Twilio Provisioning — Implementation Pack (Ready to Build)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:51:09.317Z

---

## 1) Stripe: subscription + optional concierge setup fee (test-mode first)

### Pricing structure (recommended)
- **Core subscription (per location):** e.g., $199/mo per location (adjust later). Implement as a recurring Price.
- **Optional concierge setup fee (one-time):** e.g., $499 one-time. Implement as a one-time Price.

### Checkout flow
**Route:** `POST /api/stripe/create-checkout-session`
Inputs:
- `plan` (string; e.g., "starter")
- `locationCount` (int; default 1)
- `setupFee` (boolean)
- `businessEmail` (prefill; optional)

Server behavior:
- Create Stripe Checkout Session in **subscription** mode.
- Line items:
  - Recurring price: quantity = `locationCount`
  - Optional one-time price: quantity = 1 if `setupFee` true
- Collect billing address (optional) and require email.
- Set `success_url` to: `https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Set `cancel_url` to: `https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/checkout?canceled=1`
- Attach metadata on session + subscription:
  - `app`: "appointment-no-show-reducer"
  - `location_count`
  - `setup_fee`
  - `source`: "web"

### Webhook
**Route:** `POST /api/stripe/webhook`
Listen to:
- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Behavior:
1. On `checkout.session.completed`, look up session; create/attach internal `org` record keyed by Stripe `customer.id`.
2. Mark org as `payment_status = active` once subscription is active.
3. Allow onboarding only if session is paid (or subscription active).

Notes:
- Implement in TEST MODE without charging real money.
- Going LIVE requires owner completing Stripe verification/payout info, but code is identical.


## 2) Onboarding: frictionless intake form (per-location config, duplicable)

### Pages
- `/checkout`: plan selection + “Add concierge setup” toggle → calls `create-checkout-session`.
- `/onboarding?session_id=...`: intake form (shown after successful checkout).
- `/onboarding/success`: displays “Provisioning number + sending test SMS” status.

### Intake fields (minimum viable)
**Org-level**
- Business name (string)
- Primary owner name (string)
- Owner mobile for test (E.164) (string)
- Owner email (string; prefilled from Stripe)
- Timezone (IANA string)

**Location-level (repeatable)**
- Location name (string)
- Location address (string)
- Service category (dropdown/free text)
- Business hours (per weekday open/close)
- Appointment types (optional)
- Calendar connection type (for concierge): Google / Outlook / Other / None yet
- Reminder schedule:
  - T-24h (on/off)
  - T-2h (on/off)
  - Custom minutes before (int list)
- Two-way confirmation enabled (boolean)
- Reschedule link (url) OR "Text us to reschedule" flow (boolean)
- Waitlist upload (CSV) OR waitlist feature off

**Compliance confirmations (required checkboxes)**
- “I confirm we have consent to text our customers about appointments and will include opt-out instructions.”
- “I agree to the Terms, Privacy Policy, and SMS Messaging Policy.”

### Storage model (example tables)
- `orgs`: id, stripe_customer_id, owner_email, owner_name, owner_phone, timezone, created_at
- `locations`: id, org_id, name, address, status (draft/active), created_at
- `location_configs`: id, location_id, hours_json, reminders_json, confirmation_enabled, reschedule_mode, waitlist_enabled, created_at
- `message_templates`: id, location_id, template_type, body, approved_by_owner_at
- `opt_outs`: id, location_id, phone_e164, opted_out_at, source (STOP/manual)
- `audit_events`: id, org_id, location_id, type, payload_json, created_at

### Duplicate location
Provide endpoint: `POST /api/locations/:id/duplicate`
- Clones `location_configs` + `message_templates` into a new location row.
- Prompts only for location name/address/phone number assignment.


## 3) Twilio provisioning + test message

### Provisioning endpoint
**Route:** `POST /api/twilio/provision-number`
Input: `location_id`
Behavior:
1. Search available local number (country/area optional).
2. Purchase number.
3. Create Messaging Service (optional but recommended for scale) and attach number.
4. Configure inbound webhook for that number (or messaging service):
   - Inbound SMS URL: `/api/twilio/inbound-sms`
   - Status callback: `/api/twilio/status-callback`
5. Store in DB:
   - `twilio_phone_e164`, `twilio_number_sid`, `twilio_messaging_service_sid`

### Owner test message
After provisioning, send an SMS to `org.owner_phone`:
- “Setup complete for {Location}. Reply YES to confirm you received this. Reply STOP to opt out.”
Store delivery status via status callback.


## 4) STOP/HELP handling + suppression enforcement

### Inbound webhook
**Route:** `POST /api/twilio/inbound-sms`
Twilio params include `From`, `To`, `Body`.
Logic:
- Normalize `Body` to uppercase trimmed.
- If matches STOP keywords: `STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT`
  - Upsert `opt_outs` for (location_id inferred by `To` number) + `From`
  - Respond with TwiML: “You are unsubscribed. No more messages. Reply START to resubscribe.”
- If matches HELP:
  - Respond: “Help: This number sends appointment reminders for {Business}. Reply STOP to opt out. Contact: agent_bob_replit+no-show-bot@agentmail.to”
- If matches START/UNSTOP:
  - Remove from `opt_outs` and confirm resubscription.
- Else: treat as two-way confirmation/reschedule intent; route to conversation handler.

### Outbound enforcement
Before sending any outbound SMS:
- Check `opt_outs` for that location and destination number.
- If opted out, do not send; log audit event.


## 5) Customer-facing SMS consent + policy copy (paste-ready)

Add to checkout/onboarding (and link from footer):

**SMS Consent (operational messaging):**
“By providing a phone number and booking an appointment, customers agree to receive appointment-related text messages (e.g., reminders, confirmations, and rescheduling) from {Business Name}. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time; reply HELP for help.”

**Business acknowledgment checkbox text:**
“I confirm my business obtains appropriate consent to send appointment-related SMS to customers and that each message includes opt-out instructions (STOP).”


## 6) Message template approval guidelines (internal)
- Default templates must be approved by the owner during onboarding (`approved_by_owner_at`).
- Every template must include: business identifier + opt-out instruction (at least in initial reminder or periodically).
- No promotional/marketing messages unless customer has explicit marketing consent.
- Keep PHI/medical details out of SMS. Use generic language (e.g., “appointment”).


## 7) Concierge setup SOP (done-for-you, <30 minutes)

### What you need from the client (ask once)
1. Business name + location name(s)
2. Timezone
3. Owner mobile (for test SMS)
4. Reminder timing preferences (24h/2h/custom)
5. Confirmation/reschedule preference (YES/NO confirm; keyword RESCHEDULE)
6. Waitlist CSV (optional): first name, last name, mobile, service type, availability notes
7. Calendar access method:
   - If Google: invite our service account or provide shared calendar access (read-only OK to start)

### Steps
1. Verify payment success in Stripe (subscription active).
2. Create org + location(s) in admin.
3. Paste intake details; save configuration.
4. Click “Provision number” per location; confirm number saved.
5. Send owner test SMS; ask owner to reply YES.
6. Configure default templates; get explicit approval.
7. Run a simulated reminder send to a test contact; verify STOP works.
8. Mark location status = ACTIVE.

### Completion criteria
- Owner received test message.
- STOP opt-out confirmed.
- Location config saved and duplicated if multi-location.
- Templates approved.


## 8) Minimal Terms/DPA-lite clauses (starter)
- Service provides automated appointment messaging on behalf of the business.
- Business is data controller; we act as processor for appointment contact data.
- We process phone numbers, appointment timestamps, and message logs to deliver reminders.
- Business represents it has the right/consent to contact recipients.
- Opt-out requests must be honored; system enforces suppression.
- Limitation of liability; uptime best-effort; no guarantee of attendance outcomes.


## 9) Where to reference legitimacy + support contact
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email (use everywhere): agent_bob_replit+no-show-bot@agentmail.to
