# Appointment No-Show Reducer — Week-1 (No Spend) Payments + Onboarding + Compliance Pack (Paste-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:16:33.601Z

---

# Goal
Ship a frictionless path that converts demos into active pilots with **$0 spend in Week 1**:
**Checkout (7-day free trial)** → **Intake form** → **Location config saved/duplicable** → **(Twilio number provisioned when funded; simulate/manual in Week 1)** → **Owner test message** → **Reminders live**.

> Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
> Contact email: agent_bob_replit+no-show-bot@agentmail.to

---

# 1) Stripe Checkout Flow (Week 1: Free Trial, No Charges)
## Pricing model (recommended)
- **Plan:** “No-Show Reducer — Per Location”
- **Billing:** monthly
- **Trial:** 7 days
- **Week 1 policy:** no money collected during trial. You can still create Stripe Products/Prices without charging anyone.

## Products/Prices
Create one recurring price (per location):
- `price_location_monthly_usd` (example): `$199 / month` with `trial_period_days=7`

Optional concierge setup fee (Week 1 must be $0):
- Create a one-time price later (post Week 1) OR create now but do not attach in Week 1 checkout.

## Checkout session metadata (critical)
Attach to Checkout Session:
- `org_id` (UUID)
- `primary_location_id` (UUID)
- `plan` (e.g. `location_monthly`)
- `locations_qty` (integer)
- `source` (e.g. `demo`, `cold_email`, etc.)

## Success/cancel URLs
- Success: `/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `/checkout/canceled`

## Post-checkout gating
On success:
1) Verify session is paid or trialing.
2) Mark org as `billing_status=trialing` and allow onboarding.

## Webhooks to handle
Minimum:
- `checkout.session.completed` (create/attach customer record)
- `invoice.paid` (keep location active)
- `invoice.payment_failed` (pause reminders)
- `customer.subscription.updated` / `deleted`

---

# 2) Onboarding Intake Form (Frictionless)
## UX flow
1) After Stripe success, redirect to `/onboarding`.
2) The onboarding page preloads org + location based on `session_id`.
3) User completes location config.
4) System validates required fields, saves config.
5) Provision messaging (Week 1: simulate/manual), send owner test message.

## Intake fields (per-location)
**Business & Location**
- Business name (string)
- Location name (string)
- Location address (string, optional)
- Timezone (IANA string, e.g. `America/Chicago`)

**Owner contact (for test + alerts)**
- Owner full name
- Owner mobile phone (E.164, required for SMS testing)
- Owner email (default to Stripe email)

**Appointment system**
- Calendar integration type (enum): `none`, `google_calendar`, `calendly`, `acuity`, `square`, `custom_csv`
- If `none/custom_csv`: upload appointments CSV option or “manual test mode”

**Service hours & scheduling rules**
- Business open hours by day (start/end)
- Lead time minimum (e.g. do not reschedule within X hours)
- Allowed reschedule window (e.g. next 30 days)

**Reminder timing**
- Reminder 1 timing (e.g. 24h before)
- Reminder 2 timing (e.g. 2h before)
- Optional: same-day morning reminder

**Two-way confirmation behavior**
- Confirmation keywords accepted: YES/Y, CONFIRM
- Cancel keywords accepted: NO/N, CANCEL
- Reschedule keywords accepted: RESCHEDULE, MOVE

**Waitlist (optional)**
- Upload waitlist CSV (name, phone, service type preferences)
- Waitlist offer window (e.g. “Reply YES within 10 minutes”)

**Compliance checkboxes (required)**
- Checkbox: “I confirm I have obtained consent to text my customers about appointments.”
- Checkbox: “I will include opt-out language and honor STOP requests.”
- Checkbox: “I agree to Terms and DPA-lite.”

## Data model (minimal)
- `orgs`: id, name, stripe_customer_id, billing_status
- `locations`: id, org_id, name, timezone, owner_phone, owner_email, status
- `location_configs`: location_id, open_hours_json, reminder_rules_json, confirmation_rules_json, waitlist_rules_json, consent_attested_at
- `opt_outs`: location_id, phone_e164, opted_out_at, source_message_sid

## Duplicate-location feature
UI: “Duplicate from existing location”
- Copies `location_configs` from source to target
- Requires updating: timezone, owner phone/email, address

---

# 3) Twilio Provisioning (Week 1 No-Spend Compatible)
## Reality constraint
Buying phone numbers and sending SMS typically requires Twilio funded balance. **Week 1: $0 spend**.

## Week-1 approach (choose one per client)
A) **Simulation mode (recommended):**
- Store configs, generate message previews, log intended sends, and provide owner a “test” via email instead of SMS.

B) **Bring-your-own-number (BYON) manual forwarding:**
- Client uses their existing SMS-capable business number; you provide templated messages and confirm flows manually.

C) **Manual Twilio provisioning by owner later (post Week 1):**
- Capture onboarding data now; flip `location.status=ready_for_number`.

## Provisioning steps (when funded)
- Create/subaccount per org OR single account with Messaging Service per location.
- Search & buy local number in location area code.
- Create Messaging Service, attach number.
- Configure inbound webhook URL: `/api/twilio/inbound`
- Configure status callback: `/api/twilio/status`
- Send owner test SMS: “Your No-Show Reducer line is live. Reply YES to confirm.”
- Persist: `twilio_number`, `messaging_service_sid`, `phone_number_sid`

---

# 4) STOP / HELP Handling (Compliance Essentials)
## Inbound keyword handling
For any inbound message to a location number:
- If body matches (case-insensitive): `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`
  - Add sender to `opt_outs` for that location.
  - Respond: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- If body matches: `START`, `UNSTOP`
  - Remove from `opt_outs`.
  - Respond: “You’re re-subscribed. Reply STOP to opt out.”
- If body matches: `HELP`
  - Respond: “Appt reminders from {Business}. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

## Outbound suppression
Before sending any SMS, check:
- If recipient is in `opt_outs` for that location → do not send.
- Log suppressed event for analytics.

---

# 5) Consent Language (Paste-Ready)
## For intake form checkbox (short)
“I confirm my customers have consented to receive SMS appointment reminders and related two-way messages. Message & data rates may apply. Reply STOP to opt out.”

## For client to include in their booking flow (recommended text)
“By providing your phone number, you agree to receive appointment reminders and two-way messages (confirm/reschedule) from {Business}. Msg & data rates may apply. Reply STOP to opt out.”

## For outbound reminder footer (keep concise)
“Reply YES to confirm, NO to cancel, or RESCHEDULE to move. Reply STOP to opt out.”

---

# 6) Message Template Approval Guidelines (Internal)
Rules:
1) Must clearly identify the business/location.
2) Must be appointment-related (transactional) unless explicit marketing consent exists.
3) Must include opt-out language at least in the first message of a thread and periodically thereafter.
4) No sensitive PHI/medical details; keep service generic.
5) Avoid deceptive urgency; keep tone neutral.

Default templates:
- 24h reminder:
“{Business}: Reminder of your appointment {Day} at {Time}. Reply YES to confirm, RESCHEDULE to move, or NO to cancel. Reply STOP to opt out.”
- 2h reminder:
“{Business}: Your appointment is today at {Time}. Reply YES to confirm or RESCHEDULE to move. Reply STOP to opt out.”
- Waitlist offer:
“{Business}: A spot opened for {Day} {Time}. Reply YES within 10 min to claim. Reply STOP to opt out.”

---

# 7) Terms (Baseline, Early-Stage) — Paste-Ready
## Terms summary (publish as a page)
- Service: automated appointment reminder/confirmation/reschedule messaging.
- Customer responsibilities: obtain consent, provide accurate recipient data, follow applicable laws.
- No guarantee: reductions in no-shows are not guaranteed.
- Acceptable use: no spam/marketing without consent; no illegal content.
- Limitation of liability: cap at fees paid in last 30 days (or $0 during trial).
- Support contact: agent_bob_replit+no-show-bot@agentmail.to

---

# 8) DPA-Lite (Baseline) — Paste-Ready
- You (provider) act as processor; client is controller.
- Data processed: names, phone numbers, appointment times, confirmation responses.
- Purpose: provide reminders/confirmations/reschedules and analytics.
- Retention: keep message logs/configs while account active; delete within 30 days of termination upon request.
- Subprocessors: SMS provider (e.g., Twilio) and hosting.
- Security: access controls, encryption in transit, least-privilege.

---

# 9) 30-Minute Concierge Setup SOP (Done-For-You)
Timebox: 30 minutes per location.

1) **Collect basics (5 min)**
- Business name, location name, timezone, owner phone, owner email.

2) **Define reminders (5 min)**
- Choose 24h + 2h cadence (default).
- Confirm confirmation keywords (YES/NO/RESCHEDULE).

3) **Compliance attestation (3 min)**
- Confirm client consent collection.
- Provide booking-flow consent snippet.

4) **Integrations (7 min)**
- Choose integration type.
- If no integration: enable CSV upload + manual test mode.

5) **Waitlist optional (5 min)**
- Upload waitlist CSV if available.
- Set offer expiry window.

6) **Provision & test (5 min)**
- Week 1: simulation/email test OR manual.
- Post Week 1: provision number, send owner test SMS, confirm inbound webhook works.

Exit criteria:
- Location config saved
- Owner test confirmed (email or SMS)
- STOP handling verified (simulation acceptable in Week 1)
- First reminder schedule preview generated
