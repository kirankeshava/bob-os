# Payments + Onboarding + Compliance + Provisioning — Build Artifact (Week-1 $0 / Stripe Test Mode / Twilio Mock)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:09:42.419Z

---

## Goal
Ship a frictionless onboarding path for Appointment No-Show Reducer: **Checkout → Intake form → Provision messaging → Send owner test message → Activate reminders/waitlist**, with compliance essentials (consent + STOP) and a <30-minute concierge setup.

This artifact is written to be buildable in the existing Replit app immediately **without spending money** (Week 1): use **Stripe test mode** and implement Twilio provisioning behind a **feature flag / mock** until we choose to fund Twilio later.

---

## 1) Stripe: subscription + optional one-time concierge setup fee
### Pricing structure (recommended)
- **Plan:** “No-Show Reducer – Per Location” (recurring monthly)
- **Optional:** “Concierge Setup (per location)” (one-time)

### Stripe objects
Create:
1) **Product A:** No-Show Reducer (Recurring)
   - Price: monthly recurring, e.g. `$X/location/month` (final price can be changed later)
2) **Product B:** Concierge Setup (One-time)
   - Price: one-time, e.g. `$Y/location` (optional)

### Checkout mode
- Use **Stripe Checkout Session** in `subscription` mode.
- For the one-time concierge fee:
  - Either add as an additional line item with `mode=subscription` (Stripe supports mixing one-time + recurring in Checkout), OR
  - Run a separate one-time payment Checkout after subscription success (simpler reporting).

### Required metadata captured at checkout
Attach to `checkout.session` **metadata** (or `subscription` metadata via webhook):
- `org_id`: internal org identifier
- `location_count`: integer (default 1)
- `plan`: e.g. `per_location`
- `source`: e.g. `demo`, `website`, `cold_outreach`

### URLs
- Success URL: `/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/pricing?canceled=1`

### Webhooks
Implement:
- `checkout.session.completed`
  - Verify signature
  - Fetch session + subscription
  - Create/update internal `Org` record
  - Mark `billing_status=active` and store:
    - `stripe_customer_id`
    - `stripe_subscription_id`
    - price id
- `invoice.payment_failed`
  - Mark org as `past_due`
  - Pause sending (or warn) depending on policy
- `customer.subscription.deleted`
  - Mark org `canceled` and pause sending

**Week 1 note:** do everything in **Stripe test mode**. No money moves.

---

## 2) Onboarding intake form (post-checkout)
After successful checkout, redirect to `/onboarding?session_id=...` and load the intake form.

### Intake fields (per org + per location)
**Org-level**
- Owner full name
- Owner email (pre-fill from Stripe when possible)
- Owner mobile phone (for test SMS)
- Primary business name
- Primary timezone
- Consent checkbox (see compliance section)

**Location-level (repeatable; supports duplication)**
- Location name (e.g. “Downtown”) 
- Address (optional; helps pick local number area code later)
- Timezone override (default org timezone)
- Business hours (Mon–Sun open/close)
- Appointment types (optional labels)
- Reminder schedule (default recommended):
  - T-24h reminder
  - T-2h reminder
  - T-30m reminder
- Two-way confirmation enabled: yes/no
- Reschedule link (if they have a booking URL)
- Waitlist enabled: yes/no
- Waitlist upload: CSV (name, mobile, email optional)
- Calendar/booking source:
  - Options: “Calendly”, “Square”, “Acuity”, “Google Calendar”, “Other”
  - Credential method: OAuth later; for week-1 allow manual export or webhook placeholder

### Storage model (minimum viable)
Tables/collections:
- `orgs`
  - `id`, `name`, `owner_email`, `owner_phone`, `timezone`, `stripe_customer_id`, `stripe_subscription_id`, `billing_status`, `created_at`
- `locations`
  - `id`, `org_id`, `name`, `timezone`, `hours_json`, `reminder_rules_json`, `waitlist_enabled`, `reschedule_url`, `created_at`
- `messaging_profiles`
  - `id`, `location_id`, `provider` (twilio), `from_number`, `twilio_number_sid`, `status` (mock|provisioned), `created_at`
- `opt_outs`
  - `id`, `location_id`, `phone_e164`, `status` (opted_out), `source` (inbound_stop|admin), `updated_at`

### Duplicate location behavior
- UI action “Duplicate this location” copies:
  - hours
  - reminder rules
  - waitlist enabled
  - templates
- Does **not** copy:
  - from_number/twilio sid

---

## 3) Twilio provisioning (week-1 mock, week-2+ real)
### Feature flag
- `PROVISION_PROVIDER=mock|twilio`
- In week 1, set to `mock`.

### Provisioning endpoint
`POST /api/provision`
Input: `org_id`, `location_id`, desired area code (optional)
Output: `from_number`, `status`

Mock behavior:
- Generate a deterministic fake number like `+1555XXXXXXX`
- Store `status=mock`

Real Twilio behavior (later):
- Create/choose Twilio subaccount per org (optional)
- Search & buy local number for location area code
- Configure webhook URLs:
  - Inbound SMS: `/api/twilio/inbound`
  - Status callbacks (delivery): `/api/twilio/status`
- Store SID + purchased number in `messaging_profiles`

### Test message to owner
After provisioning, send:
“[Business] reminders are connected. Reply YES to confirm you received this test. Reply STOP to opt out.”

---

## 4) STOP/HELP opt-out handling (required)
Implement inbound SMS webhook:
`POST /api/twilio/inbound`
Parse:
- `From`, `To`, `Body`

Keywords:
- STOP variations: `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`
  - Action: add `From` to `opt_outs` for the **location** identified by `To` (the location’s from_number)
  - Respond: “You’re opted out and won’t receive texts from us. Reply START to resubscribe.”
- HELP: `HELP`, `INFO`
  - Respond: “Appointment reminders. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”
- START / UNSTOP:
  - Remove from `opt_outs`
  - Respond: “You’re resubscribed and may receive appointment texts again.”

Outbound send guard (must enforce):
- Before sending any SMS, check `opt_outs` for that location + phone. If opted out, do not send.

---

## 5) Customer consent language (paste into checkout + intake)
Add a required checkbox on intake:
“By providing my number, I confirm I am authorized to enable SMS appointment reminders for my business. I agree that we will send customers appointment-related texts (including confirmations and reschedule prompts). Message frequency varies. Msg & data rates may apply. Customers can reply STOP to opt out and HELP for help.”

Add short footer text on every outbound reminder:
“Reply STOP to opt out.”

---

## 6) Message template approval guidelines (internal)
Rules:
1) Only appointment-related content (transactional): reminders, confirmations, reschedules, waitlist fills.
2) No marketing blasts in week 1.
3) Every template includes business identifier and STOP line.
4) Avoid sensitive info (no medical details). Use generic: “You have an appointment at [Business] on [Date/Time].”

Suggested templates:
- 24h reminder: “Reminder: [Business] appointment on [Day] at [Time]. Reply 1 to confirm, 2 to reschedule. Reply STOP to opt out.”
- 2h reminder: “Upcoming: [Business] at [Time]. Reply 1 to confirm, 2 to reschedule. STOP to opt out.”
- Waitlist fill: “A spot opened at [Business] for [Time]. Reply YES to book it. STOP to opt out.”

---

## 7) Minimal Terms + DPA-lite (publish on website)
Publish 2 pages and link them from onboarding:
1) **Terms of Service (short)**
   - Service provides appointment reminder automation via SMS.
   - Customer responsible for obtaining consent and lawful basis to message end-users.
   - No guarantee of delivery; carrier filtering may occur.
   - Limitation of liability.
2) **Data Processing Addendum (lite)**
   - We process contact data to deliver reminders.
   - Subprocessors: Twilio (SMS), Stripe (billing).
   - Retention: opt-outs retained to honor suppression.

Include support contact:
- agent_bob_replit+no-show-bot@agentmail.to
Website for legitimacy:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

## 8) 30-minute concierge setup checklist (operator SOP)
1) Confirm checkout success (Stripe session completed).
2) Open org in admin → verify owner email + phone.
3) Create location (or duplicate) → set timezone + hours.
4) Set reminder timings (24h/2h/30m defaults).
5) Enable two-way confirmations.
6) Upload waitlist CSV (optional).
7) Provision messaging profile:
   - Week 1: mock number created
   - Later: buy local number per location
8) Send test SMS to owner; confirm they can reply.
9) Verify STOP handling by sending “STOP” from a test phone; ensure suppression record created.
10) Mark location “Active” and schedule first real reminder dry-run (no send) to verify pipeline.

---

## Implementation cut-list (engineer-ready)
Routes:
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/webhook`
- `GET /onboarding` (UI)
- `POST /api/onboarding/submit`
- `POST /api/provision`
- `POST /api/twilio/inbound`
- `POST /api/twilio/status`

Env vars:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `PROVISION_PROVIDER=mock`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` (later)

Week-1 acceptance tests:
- Stripe test checkout completes → onboarding form loads
- Submit onboarding → creates org+location records
- Provision mock number → stored
- Send test message path executes (can log instead of SMS)
- STOP webhook endpoint creates suppression record

This artifact is complete and can be pasted into a project issue as the build plan for payments + onboarding + compliance with $0 spend in week 1.