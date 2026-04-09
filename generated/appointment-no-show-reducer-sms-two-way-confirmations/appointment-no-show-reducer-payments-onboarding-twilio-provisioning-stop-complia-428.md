# Appointment No-Show Reducer — Payments + Onboarding + Twilio Provisioning + STOP Compliance + Concierge SOP (Implementation-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:15:05.944Z

---

# 1) Stripe payments: subscription + optional one-time concierge setup

## 1.1 Pricing structure (recommended)
- **Plan:** “No‑Show Reducer — Per Location”
- **Billing:** Monthly subscription per location (quantity = number of active locations)
- **Optional add-on:** “Concierge Setup (one-time)” fee per new customer (or per location if you prefer)

**Why this structure works:**
- You can sell quickly (simple: $X/location/month).
- Stripe handles proration if a customer adds locations mid-cycle.
- Setup fee can be offered as optional “Done-for-you onboarding” to increase close rate and early cash.

## 1.2 Stripe objects
Create in Stripe Dashboard (no-code):
1) **Product:** No‑Show Reducer — Per Location
   - **Price (recurring):** MONTHLY, unit amount = your price (e.g., $14900 cents)
2) **Product:** Concierge Setup
   - **Price (one-time):** unit amount (e.g., $29900 cents)

### Option A (simplest): Two Checkout links
- **Link 1:** Subscription only
- **Link 2:** Subscription + setup fee (as additional line item)

### Option B (single link): On-Checkout “Add setup”
Stripe Checkout doesn’t support a native checkbox for add-ons in the simplest mode, so easiest is two links. If you later build a custom pricing page, you can call Checkout API with conditional line items.

## 1.3 Checkout configuration (API approach)
Use Stripe Checkout Sessions.
- **Mode:** `subscription`
- **Line items:**
  - subscription price (quantity = 1 location initially)
  - optionally add concierge setup as a one-time line item in the same session
- **Metadata:**
  - `org_id` (internal)
  - `plan` = `per_location`
  - `setup_fee` = `true/false`
- **Success URL:** `/onboarding?session_id={CHECKOUT_SESSION_ID}`
- **Cancel URL:** `/pricing`

### Required webhooks
Implement:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**State machine:**
- `checkout.session.completed` => create/update Organization, mark `billing_status = active_pending_onboarding`.
- On onboarding completion => mark `onboarding_status = complete` and set `location.status = active`.
- If subscription canceled/past_due => set `location.status = paused` and stop messages.

## 1.4 Minimum billing data model
- `organizations`: id, name, owner_name, owner_email, stripe_customer_id, stripe_subscription_id, billing_status
- `locations`: id, org_id, name, timezone, business_hours_json, reminder_rules_json, twilio_phone_number, twilio_number_sid, status
- `message_templates`: org_id, type, body, approved_by_owner_at
- `contacts` (optional initially): customer phone, consent flags
- `opt_outs`: org_id, phone_e164, opt_out_at, source (STOP)

## 1.5 Stripe tax & invoices (basic)
Early-stage: enable Stripe automatic tax later. For now, ensure receipts are enabled.

---

# 2) Post-checkout onboarding: frictionless intake form

## 2.1 Flow
1) Customer completes Stripe Checkout
2) Redirect to `/onboarding?session_id=...`
3) Backend verifies session via Stripe API, associates session to org
4) Show **single onboarding form** (can be multi-step UI but one save)
5) On submit:
   - Save org + location configuration
   - Trigger Twilio number provisioning
   - Send test message to owner
   - Show “You’re live” checklist + next steps

## 2.2 Intake form fields (per organization)
**Owner / primary contact**
- Owner full name
- Owner mobile phone (for test message + operational alerts) — required
- Owner email (prefill from checkout) — required

**Business**
- Business name — required
- Number of locations now (default 1)

## 2.3 Intake form fields (per location)
- Location name (e.g., “Downtown Clinic”)
- Location address (optional but useful for compliance)
- Timezone (dropdown; default inferred from browser)
- Service hours (Mon–Sun open/close) and closed days
- Appointment types (optional): “Consult”, “Follow-up”, etc.

**Reminder rules**
- Default reminder schedule (checkboxes + hours):
  - 24h before
  - 3h before
  - 1h before
- Two-way confirmation enabled (Y/N)
- Confirmation keywords (defaults): YES / NO
- Reschedule link (URL) OR “reply to reschedule” flow

**Calendar/booking source** (choose one)
- “We will send a daily CSV export” (fast start)
- “Google Calendar access” (later)
- “Calendly” (later)
- “Other (describe)”

**Waitlist**
- Upload CSV (phone + name) OR paste list
- Waitlist send window (e.g., only 9a–6p)

**Message sending number preferences**
- Local area code preference (optional)

## 2.4 Validation rules
- Normalize all phones to **E.164**
- Ensure timezone present
- Ensure at least one reminder time selected
- Require explicit consent acknowledgement (checkbox)

## 2.5 “Duplicate location” requirement
Implement “Copy settings from Location A” button:
- Copies `business_hours_json`, `reminder_rules_json`, `templates`, waitlist settings
- Does **not** copy Twilio number or calendar credentials

---

# 3) Automated Twilio number provisioning + test message

## 3.1 Provisioning approach
- Use one Twilio master account and create **Subaccounts per organization** (recommended for isolation).
- For each location, buy one local number:
  - Search by preferred area code if provided
  - Capabilities: SMS
- Assign webhook URLs:
  - Incoming SMS: `POST /webhooks/twilio/inbound`
  - Status callbacks (optional): `/webhooks/twilio/status`

## 3.2 Provisioning steps (pseudo)
1) On onboarding submit:
   - If org has no twilio_subaccount_sid: create subaccount
2) Purchase number:
   - `availablePhoneNumbers(local).list({ areaCode, smsEnabled: true, limit: 1 })`
   - `incomingPhoneNumbers.create({ phoneNumber, smsUrl, smsMethod: 'POST' })`
3) Store:
   - `locations.twilio_phone_number = +1...`
   - `locations.twilio_number_sid = PN...`
   - `organizations.twilio_subaccount_sid = AC...`
4) Send test message to owner mobile:
   - “Hi {OwnerName} — your reminder number for {LocationName} is {TwilioNumber}. Reply YES to confirm you got this.”
5) Record owner reply to validate inbound flow.

## 3.3 Failure handling
- If number purchase fails: show “Provisioning error — we’ll finish setup within 1 business day” and alert internal email.
- If test SMS fails: prompt owner to confirm phone number; retry.

---

# 4) STOP/HELP compliance and operational essentials

## 4.1 Mandatory inbound keywords
Implement in `/webhooks/twilio/inbound`:
- If inbound body matches (case-insensitive, trimmed):
  - `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`
    - Add sender phone to `opt_outs` for that org (or global if you prefer)
    - Respond: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
  - `START`, `YES` (when opted out)
    - Remove from `opt_outs`
    - Respond: “You’re re-subscribed. Reply STOP to opt out.”
  - `HELP`, `INFO`
    - Respond: “{BusinessName}: Appointment reminders. Reply STOP to opt out. For help: {OwnerPhone or support email agent_bob_replit+no-show-bot@agentmail.to}”

## 4.2 Outbound suppression
Before sending any SMS:
- If recipient exists in `opt_outs` => do not send; log suppressed event.

## 4.3 Consent language (put on onboarding + client-facing templates)
**On onboarding form checkbox text:**
“I confirm that my business only messages customers who have provided consent to receive SMS related to their appointments. I understand customers can reply STOP to opt out and HELP for help. Message & data rates may apply.”

**Recommended patient/customer consent snippet for clients to use (copy/paste):**
“By providing your phone number, you agree to receive appointment-related text messages (reminders, confirmations, and rescheduling). Reply STOP to opt out at any time. Reply HELP for help. Message & data rates may apply.”

## 4.4 Message template approval guidelines
- Keep messages strictly appointment-transactional unless explicit marketing consent exists.
- Always include business identifier in first message (e.g., “{BusinessName}: …”).
- Avoid sensitive medical details; reference “your appointment” not condition.
- Always support STOP/HELP.
- Send within business hours unless urgent (configurable).

---

# 5) Basic Terms + DPA-lite (paste onto website)

## 5.1 Terms (minimum viable)
**Service description:** We send SMS reminders/confirmations/reschedule flows on behalf of client.
**Client responsibilities:** Client represents they have consent, will follow applicable laws (TCPA, CTIA guidelines), provides accurate appointment data.
**Prohibited use:** Spam/marketing blasts without consent, illegal content.
**Availability:** Best effort; not guaranteed; SMS delivery depends on carriers.
**Fees & billing:** Subscription per location; setup fee optional; refunds policy (e.g., no refunds after provisioning).
**Limitation of liability:** Cap at fees paid in last 30 days (or similar).
**Termination:** Cancel anytime; service stops at period end.

## 5.2 DPA-lite / privacy
- We act as service provider/processor.
- We process phone numbers, appointment timestamps, names (optional).
- Data retention: configurable; default delete after X days if requested.
- Subprocessors: Twilio, Stripe.
- Security: access controls, encryption in transit.

---

# 6) Done-for-you concierge setup SOP (≤ 30 minutes)

## Goal
Get a new client live with one location: paid, configured, number provisioned, first test reminder sent.

## Tools
- Admin access to app
- Stripe dashboard
- Twilio console (master)
- Client info from onboarding form

## Step-by-step checklist
### A) Payment & account (3 minutes)
1. Confirm Stripe payment succeeded (Checkout Session paid / subscription active).
2. Verify org record has `stripe_customer_id` and `billing_status` set to active.

### B) Validate onboarding intake (5 minutes)
3. Confirm timezone, business hours, reminder timing.
4. Confirm owner mobile is valid E.164.
5. Confirm opt-in checkbox captured.

### C) Provision messaging number (7 minutes)
6. Create/confirm Twilio subaccount for org.
7. Buy local SMS-capable number (match area code if possible).
8. Set inbound webhook URL to `/webhooks/twilio/inbound`.
9. Store number + SID on location.

### D) Template approval (5 minutes)
10. Load default templates:
    - Reminder
    - Confirmation request
    - Reschedule prompt
    - Waitlist offer
11. Send templates to owner for approval (email from agent_bob_replit+no-show-bot@agentmail.to) OR approve in-app if owner checked “approve defaults”.

### E) Test end-to-end (7 minutes)
12. Send test SMS to owner mobile: “{BusinessName}: Setup complete. Reply YES to confirm.”
13. Confirm inbound YES is received and logged.
14. Trigger a simulated appointment reminder to owner number to confirm outbound path.

### F) Go-live handoff (3 minutes)
15. Email owner:
    - Their Twilio number
    - What customers will see
    - How STOP works
    - How to update reminder timing
    - Support contact: agent_bob_replit+no-show-bot@agentmail.to

**Definition of Done:**
- Subscription active
- Location config saved
- Twilio number provisioned and webhooks set
- STOP/HELP confirmed functioning
- Owner received and replied to a test SMS

---

# 7) Customer-facing onboarding email template (for after payment)
Subject: Your reminder number is being set up (5 minutes)

Hi {{OwnerName}},

Thanks for signing up. To finish activating {{BusinessName}}, please complete the onboarding form here:
{{OnboardingLink}}

After you submit, we’ll automatically provision your texting number and send a test message to {{OwnerMobile}}.

Important: please confirm you only text customers who have opted in to receive appointment-related SMS. Customers can reply STOP to opt out at any time.

Support: agent_bob_replit+no-show-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— No‑Show Reducer Team
