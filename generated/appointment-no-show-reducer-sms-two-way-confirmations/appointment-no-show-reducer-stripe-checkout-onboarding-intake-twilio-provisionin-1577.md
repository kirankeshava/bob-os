# Appointment No-Show Reducer — Stripe Checkout + Onboarding Intake + Twilio Provisioning (Dry-Run) + STOP Compliance + Concierge Setup SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:42:35.799Z

---

## Goal
Convert demos into paid pilots immediately with a frictionless path:
**Checkout → Intake form → Provision (Twilio number) → Test SMS to owner → Activate reminders/waitlist**.
This doc is implementation-ready (Stripe test-mode + Twilio dry-run until funded).

---
## 1) Stripe: Products, prices, and flows
### Recommended pricing objects
- **Subscription (per location):** “No‑Show Reducer – Location”
  - Price: monthly recurring (e.g., $199/mo). Treat as *per-location seat*.
- **Optional one-time concierge setup fee:** “Concierge Setup”
  - Price: one-time (e.g., $299).

### Checkout session approach (preferred)
Use **Stripe Checkout Session (mode=subscription)** and include setup fee as an additional line item.

**Key metadata to attach**
- `org_id` (internal)
- `location_count` (initial seats)
- `setup_concierge` (true/false)
- `source` (e.g., demo, inbound)

**Success URL**
Redirect to onboarding with session id:
- `SUCCESS_URL = https://<your-app>/onboarding?session_id={CHECKOUT_SESSION_ID}`
- `CANCEL_URL = https://<your-app>/checkout?canceled=1`

### Server endpoint: create checkout session (pseudo-code)
**POST /api/stripe/create-checkout-session**
Input: `{ plan: 'location-monthly', seats: 1, concierge: true|false, email }`
Output: `{ url }`
Implementation notes:
- Create/find Stripe Customer by email.
- Create Checkout Session with line items:
  - subscription price x seats
  - if concierge: setup fee price x 1
- Put `org_id` in `metadata` (create org if needed).

### Webhook: activate after payment
**POST /api/stripe/webhook** listening for:
- `checkout.session.completed` → mark org as `paid_active=true`, store `stripe_customer_id`, `stripe_subscription_id`, and persist `paid_seats`.
- `invoice.payment_failed` → set `paid_active=false` and alert.
- `customer.subscription.deleted` → deactivate.

**Important**: In webhook, treat Checkout completion as “paid, proceed to onboarding” but do not send SMS to customers until onboarding consent + config is completed.

---
## 2) Onboarding intake form (single page, <5 minutes)
### Route
**GET /onboarding?session_id=cs_test_...**
- Validate session via Stripe API.
- Load org from `metadata.org_id`.

### Intake fields (per location)
Collect minimal per-location config; allow duplicate later.

**Organization**
- Business name (string)
- Owner name (string)
- Owner mobile (E.164) for test SMS + alerts
- Primary contact email (prefill from Stripe)

**Location profile (repeatable)**
- Location name (e.g., “Downtown Clinic”)
- Address (optional, helps number area code)
- Timezone (IANA, required)
- Business hours (per weekday open/close)
- Appointment types (optional labels)

**Reminder policy**
- Reminder schedule (defaults): 24h + 2h before
- Two-way confirmations: Yes/No (default Yes)
- Confirm keywords: “YES”
- Cancel keywords: “NO”, “CANCEL”
- Reschedule handling: link or “reply RESCHEDULE” (depending on v1)

**Waitlist / gap fill (optional v1)**
- Upload CSV of waitlist phone numbers OR paste list
- Consent proof checkbox for waitlist list

**Calendar / booking source**
- Dropdown: “Manual upload”, “Google Calendar”, “Calendly”, “Other (notes)”
- If Google/Calendly not implemented yet: collect access method and schedule concierge.

**Compliance acknowledgements (required)**
Checkboxes:
1) “I confirm I have obtained patient/customer consent to receive SMS reminders at the numbers provided.”
2) “I will include opt-out language and honor STOP requests.”
3) “I approve the default reminder templates (editable) below.”

### Default templates (owner approval)
Show editable templates in onboarding; store approved version.
- Reminder 24h: “Reminder: {business} appointment on {date} at {time}. Reply YES to confirm or NO to cancel. Msg&data rates may apply. Reply STOP to opt out.”
- Reminder 2h: “Upcoming: {business} at {time}. Reply YES to confirm, NO to cancel. Reply STOP to opt out.”
- Confirmed: “Thanks—you're confirmed. Reply STOP to opt out.”
- Cancelled: “You’re cancelled. Reply RESCHEDULE for options. Reply STOP to opt out.”

---
## 3) Per-location storage model + duplication
### Tables (example)
- `orgs`: id, name, owner_name, owner_phone, email, stripe_customer_id, stripe_subscription_id, paid_active, paid_seats
- `locations`: id, org_id, name, timezone, address, hours_json, reminder_policy_json, templates_json, twilio_number, twilio_messaging_service_sid, status
- `opt_outs`: id, org_id, location_id (nullable), phone_e164, opted_out_at, source ('inbound_stop'|'manual')
- `audit_events`: id, org_id, type, payload_json, created_at

### Duplicate location feature
UI action: “Duplicate location settings”
- Copies reminder policy + templates + hours.
- Prompts for new location name/timezone/address.
- Triggers Twilio provisioning for the new location when Twilio is enabled.

---
## 4) Twilio provisioning (with dry-run mode)
### Why dry-run
Buying numbers and sending SMS costs money; implement now with a `TWILIO_ENABLED=false` flag.

### Provisioning flow
**POST /api/twilio/provision-number** (internal, called after onboarding submit)
- Input: `location_id`, preferred area code (optional)
- If `TWILIO_ENABLED=false`:
  - Generate a placeholder number like `+1555000XXXX`
  - Mark location `twilio_status='dry_run'`
  - Continue the onboarding flow.
- If enabled:
  - Search available local numbers by area code
  - Purchase number
  - Create Messaging Service (recommended) and add purchased number
  - Set inbound webhook to `/api/twilio/inbound`
  - Store `twilio_number`, `messaging_service_sid`

### Owner test SMS
After provisioning, send: “Your No‑Show Reducer line is ready for {location}. Reply YES to confirm setup. Reply STOP to opt out.”
Store result in `audit_events`.

---
## 5) STOP/HELP compliance: inbound webhook + suppression
### Inbound webhook
**POST /api/twilio/inbound** receives From/To/Body.
- Normalize Body to uppercase trimmed.
- If Body in {STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT}:
  - Upsert `opt_outs(phone_e164=From)` scope to org (or location).
  - Respond with TwiML: “You are opted out and will no longer receive messages. Reply START to re-subscribe.”
- If Body == HELP:
  - Respond: “{business} reminders. Reply STOP to opt out. Contact {support_email}.”
- If Body in {START, YES} and opted out:
  - Remove opt-out and confirm resubscribe.

### Outbound enforcement
Before sending any SMS:
- Check `opt_outs` for phone.
- If opted out: do not send; log audit.

---
## 6) Consent language (paste into checkout + onboarding)
**Consent statement (short):**
“By providing your number, you confirm you have consent from the recipient to receive appointment reminder texts from {business}. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

**Owner attestation (checkbox text):**
“I represent that my business has obtained all required consent to send SMS reminders to customers/patients and will use this service only for those who have opted in.”

---
## 7) Terms + DPA-lite (minimal publishable text)
### Terms highlights
- Service provides SMS reminders and confirmation automation.
- Customer is responsible for lawful basis/consent and content.
- No guarantee of delivery; depends on carriers.
- Limitation of liability: fees paid in last 30 days.
- Acceptable use: no marketing blasts unless explicitly enabled and consented.

### DPA-lite highlights
- You act as processor; customer is controller.
- Data types: phone numbers, appointment times, confirmation status.
- Subprocessors: Stripe (billing), Twilio (SMS).
- Retention: configurable; default 90 days for message logs (or minimal in v1).
- Security: access controls, encryption in transit.

---
## 8) Concierge setup SOP (under 30 minutes)
### What you request from client (email after payment)
1) Business name + location name(s) + timezone
2) Owner mobile for test
3) Reminder timing (24h/2h default)
4) Template approval (use defaults unless edits)
5) Appointment feed method (CSV export or calendar access)
6) Confirmation actions (YES/NO; reschedule link)

### Operator steps
1) Confirm Stripe payment + org active.
2) Complete onboarding intake (or review their submission).
3) Provision number (dry-run if Twilio not funded) and store on location.
4) Send owner test SMS; confirm reply.
5) Run acceptance test:
   - Create a sample appointment → ensure scheduled reminder entries created
   - Simulate inbound YES/STOP → verify confirmation stored and opt-out enforced
6) Mark location status = “Active”.
7) Send “Setup complete” email with:
   - Their dedicated number
   - How confirmations work
   - How to opt out
   - Support email: agent_bob_replit+no-show-bot@agentmail.to

---
## 9) Where to link legitimacy + support
- Website to reference in checkout/onboarding/footer: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

---
## Acceptance criteria (definition of done)
- Stripe test-mode checkout creates subscription + optional setup fee, webhook activates org.
- After checkout, onboarding intake saved per location and duplicable.
- Twilio provisioning runs in dry-run mode without funds; when enabled, purchases number and sends owner test SMS.
- STOP/HELP webhooks suppress outbound messages reliably.
- Consent language + Terms/DPA pages are published and linked from checkout/onboarding.
