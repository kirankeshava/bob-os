# Appointment No-Show Reducer — Stripe Checkout + Onboarding + Twilio STOP Compliance + Concierge SOP (Week-1 $0 Spend Implementation Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:01:49.234Z

---

# Goal
Ship a frictionless conversion path:
**Checkout → Intake form → (later) Provision Twilio number → Test SMS to owner → Activate reminders/waitlist**

**Week-1 constraint:** $0 spend. That means:
- Stripe can be used in **TEST MODE now** (no money movement), and flipped to live later.
- Twilio number purchase/SMS sending may require funding; implement code paths now, but gate production provisioning until funding is permitted.

---

## 1) Stripe Checkout: Subscription + Optional Concierge Setup (No spend in test mode)

### Product structure (recommended)
Create in Stripe (test mode first):
- **Product:** “Appointment No-Show Reducer”
  - **Recurring Price:** `per_location_monthly` (e.g., $99/mo) — billed monthly
- **Product:** “Concierge Setup (Optional)”
  - **One-time Price:** `concierge_setup_fee` (e.g., $199 one-time)

If you want “setup fee only when chosen”, implement two checkout entry points:
1) Subscription only
2) Subscription + add-on (one-time)

### Checkout Session creation (server-side)
**Endpoint:** `POST /api/stripe/create-checkout-session`

**Inputs:**
- `plan`: string (e.g., `standard`)
- `locationsCount`: number (default 1)
- `includeConcierge`: boolean
- `email`: string

**Session fields:**
- `mode: "subscription"`
- `line_items`:
  - subscription price (quantity = locationsCount)
  - if includeConcierge: one-time price as additional line_item
- `success_url`: `${APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url`: `${APP_URL}/checkout?canceled=1`
- `customer_email`: email
- `allow_promotion_codes: true` (optional)
- `subscription_data.metadata`:
  - `plan`
  - `locationsCount`
- `metadata` (Session-level):
  - `source: "website"`
  - `app: "no-show-reducer"`

### Webhook to activate account
**Endpoint:** `POST /api/stripe/webhook`

Listen for:
- `checkout.session.completed`
- (optional) `invoice.paid`, `customer.subscription.updated`, `customer.subscription.deleted`

On `checkout.session.completed`:
- Read `session.customer`, `session.subscription`
- Create/Update `Organization` record keyed by Stripe `customerId`
- Set org status: `active_trial` (Week-1 free) OR `active_paid` (later)
- Store subscriptionId and plan metadata

**Important:** do not rely on client-side success redirect to activate access. Always use webhooks.

### Data model (minimal)
- `organizations`:
  - `id`
  - `name`
  - `ownerEmail`
  - `stripeCustomerId`
  - `stripeSubscriptionId`
  - `status` (inactive|active_trial|active_paid|past_due|canceled)
  - `createdAt`
- `locations`:
  - `id`
  - `orgId`
  - `nickname` (e.g., “Downtown Clinic”)
  - `timezone`
  - `serviceHoursJson`
  - `reminderRulesJson`
  - `calendarConnectionJson` (tokens/IDs; encrypt at rest)
  - `twilioPhoneNumber` (nullable Week-1)
  - `twilioNumberSid` (nullable)
  - `messagingConsentCapturedAt`
  - `createdAt`
- `opt_outs`:
  - `id`
  - `locationId`
  - `phoneE164`
  - `optedOutAt`
  - `reason` (STOP|END|CANCEL|etc)

### Location duplication
**Endpoint:** `POST /api/locations/:id/duplicate`
Copies config JSON fields (timezone/service hours/reminders/templates) but not calendar tokens.

---

## 2) Onboarding Intake Form (post-checkout)

**URL:** `/onboarding?session_id=...`

### UX: 2-step form
**Step A — Business + Location**
- Business name (prefill from org if known)
- Location nickname
- Address (optional)
- Timezone (dropdown)
- Service hours (Mon–Sun open/close + closed toggle)

**Step B — Reminders + Confirmations + Waitlist**
- Reminder timing presets (choose):
  - 24h + 2h
  - 48h + 24h
  - Custom (add multiple)
- Two-way confirmation enabled (Yes/No)
- Reschedule link (optional)
- Waitlist upload:
  - Paste list (name, phone, desired times) OR CSV upload

**Step C — Calendar access (concierge-friendly)**
- Option 1: “I’ll connect my calendar now” (OAuth button)
- Option 2: “Concierge setup: I’ll share access after this form” (collect instructions)

**Step D — Compliance consents (required)**
Checkboxes:
1) “I confirm I have obtained consent from my customers to receive SMS reminders related to their appointments, and I will not upload purchased lists.” (required)
2) “I agree to the Terms, Privacy Policy, and DPA-lite.” (required)

### After submit behavior
`POST /api/onboarding/submit`
- Creates the first `location`
- Saves reminder rules, timezone, hours, waitlist file pointer
- Sets `messagingConsentCapturedAt = now`
- Shows next page: “Setup in progress”

Week-1 behavior:
- Show banner: “SMS provisioning will be enabled after trial verification; meanwhile we can run with email/WhatsApp or manual test mode.” (If you want SMS-only, keep the banner but explain the delay.)

---

## 3) Twilio Provisioning + Test Message (implemented but gated Week-1)

### Provisioning endpoint
`POST /api/twilio/provision-number`
Inputs:
- `locationId`
- `areaCode` (optional)

Steps:
1) Find available local number
2) Purchase number
3) Configure messaging webhook URLs:
   - Inbound SMS: `${APP_URL}/api/twilio/inbound?locationId=...`
   - Status callbacks (optional): `${APP_URL}/api/twilio/status`
4) Store `twilioPhoneNumber`, `twilioNumberSid`

Week-1 gating:
- If `TWILIO_ENABLED !== "true"`, return 409 with message “Provisioning disabled in free launch; contact support at agent_bob_replit+no-show-bot@agentmail.to.”

### Test message endpoint
`POST /api/twilio/send-test`
- Sends SMS to owner phone: “Your appointment reminder system is connected. Reply STOP to opt out. Reply HELP for help.”

---

## 4) STOP/HELP Opt-Out Handling (core compliance)

### Inbound SMS webhook contract
`POST /api/twilio/inbound`
Twilio sends:
- `From` (patient phone)
- `To` (your Twilio number)
- `Body`

Logic:
1) Normalize `Body` to uppercase trimmed.
2) If body contains any of: `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`:
   - Upsert into `opt_outs` table for that `locationId` and `From`.
   - Respond with TwiML: “You are unsubscribed. No further messages will be sent.”
3) If body contains `HELP`:
   - Respond: “Help: Appointment reminders. Contact agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.”
4) Otherwise treat as confirmation channel:
   - If body in (`Y`, `YES`, `CONFIRM`): mark appointment confirmed
   - If body in (`N`, `NO`): mark as canceled/unconfirmed and trigger reschedule flow

### Suppression enforcement
Before sending any outbound SMS:
- Check if `From` phone is in `opt_outs` for that location.
- If opted out, do not send.

---

## 5) Message template approval guidelines (avoid carrier issues)

Rules:
- No marketing/upsell language in reminder flows unless explicit marketing opt-in exists.
- Always include business name and appointment context.
- Include opt-out language at least once initially and periodically: “Reply STOP to opt out.”
- Avoid URL shorteners. Use your own domain when possible.

Starter templates (transactional reminders):
1) 24h reminder:
“{BusinessName}: Reminder of your appointment on {Date} at {Time}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”
2) 2h reminder:
“{BusinessName}: Your appointment is today at {Time}. Reply YES to confirm. Reply STOP to opt out.”
3) Waitlist opening:
“{BusinessName}: Earlier slot opened: {Date} {Time}. Reply YES to take it (first come). Reply STOP to opt out.”

---

## 6) Website/Checkout Compliance Copy (paste-ready)

### SMS consent language (display near phone collection and in onboarding)
“By providing your phone number, you confirm you have permission to receive appointment-related text messages from {BusinessName}. Message frequency varies. Message & data rates may apply. Reply STOP to opt out, HELP for help.”

### Customer obligation (for the clinic using the tool)
“You represent and warrant that you have obtained all necessary consents from your customers/patients to receive SMS messages about appointments, and that you will honor opt-out requests.”

### Terms (short-form you can expand later)
- Service provides appointment reminders, confirmations, reschedules, and waitlist notifications.
- Customer is responsible for lawful basis/consent for messaging.
- No warranties of revenue increase; analytics are estimates.
- Limitation of liability (cap to fees paid last 30 days, exclude consequential damages).
- Termination for abuse/spam/illegal lists.

### DPA-lite summary
- We act as a service provider/processor.
- We process customer contact data solely to deliver reminders.
- We use subprocessors (e.g., Twilio, Stripe) for messaging and billing.
- We retain data only as needed; deletion on request.

---

## 7) Done-for-you Concierge Setup Checklist (<30 minutes)

**Client must provide (5 minutes):**
1) Business name + location nickname
2) Timezone + service hours
3) Reminder timing choice (24h/2h recommended)
4) Owner phone to receive test
5) Calendar access path:
   - OAuth connect OR add our service email as viewer/editor (client choice)
6) Waitlist: upload CSV or paste list
7) Confirm they have SMS consent language in their intake/booking flow

**We do (20 minutes):**
1) Create org + location config
2) Connect calendar / set polling
3) (When enabled) provision Twilio number + set inbound webhook
4) Send test message to owner; confirm STOP/HELP behavior
5) Activate reminders for a test appointment

**Client verifies (5 minutes):**
1) Receives test reminder
2) Replies YES/NO and sees status update
3) Confirms opt-out works with STOP

Support contact in all comms:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 8) What is “live” this week vs later
**Live now (Week-1, $0):**
- Stripe checkout in TEST MODE + full onboarding intake + storage + location duplication
- Compliance pages copy + STOP logic implemented (can be tested with mocked inbound payloads)

**Later (post Week-1 / when spend allowed):**
- Twilio funded provisioning + real SMS sending
- Stripe LIVE MODE activation (payout details/verification)

This keeps distribution moving (demos convert), product onboarding smooth, and revenue path ready without violating the $0-spend rule.
