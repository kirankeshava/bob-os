# Payments + Onboarding + Compliance + Twilio Provisioning Pack (Week 1 $0 Budget, Stripe Test Mode)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:55:09.491Z

---

# Appointment No-Show Reducer — Payments + Onboarding + Compliance + Twilio Provisioning Pack

## Goal (Week 1, $0 spend)
Launch a frictionless onboarding path that works end-to-end in **Stripe Test Mode** (no money collected) and collects all configuration needed to activate SMS later. Implement compliance essentials now (consent capture, STOP handling, suppression enforcement). Twilio number purchase/provisioning is **feature-flagged off** until trial/paid balance exists.

Website legitimacy URL to reference in customer comms:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business inbox for onboarding:
- agent_bob_replit+no-show-bot@agentmail.to

---

## 1) Stripe Checkout (Subscription + Optional Setup Fee)
### Pricing model (recommended)
- **Base subscription (per location):** $99/mo (starter), $199/mo (growth) — choose one for week 1 pilots (free trial during week 1).
- **Concierge setup (optional one-time):** $249 (waived week 1) OR collect in Stripe later.

### Stripe objects
Create in Stripe Dashboard (Test Mode first):
- Product: `No-Show Reducer — Subscription`
  - Price (recurring monthly): `price_SUB_MONTHLY`
- Product: `No-Show Reducer — Concierge Setup`
  - Price (one-time): `price_SETUP_ONE_TIME`

### Checkout session creation params
Use Stripe Checkout Sessions (server-side) and redirect to onboarding intake.

**Success URL**
- `${APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`

**Cancel URL**
- `${APP_URL}/checkout?canceled=1`

**Metadata (critical)**
Attach to both Checkout Session and Customer:
- `org_name`
- `owner_email`
- `plan`
- `locations_count` (usually 1 at signup)
- `source` (demo, outbound, etc.)

### Webhook events to handle
- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.deleted`

**State change**
- On `checkout.session.completed`: create/mark `org` as `paid_pending_setup=true` and store Stripe customer/subscription IDs.
- On onboarding completion: `org.active=true`.

---

## 2) Onboarding Intake Form (per location config)
### Path
Checkout success → `/onboarding?session_id=...` → intake form submit → store config → (later) provision number → send owner test message.

### Intake fields (minimum)
**Org-level**
- `org_name` (prefill from Stripe metadata)
- `owner_name`
- `owner_email` (prefill)
- `owner_mobile` (for admin alerts/test message)
- `primary_contact_role` (owner/manager/front desk)

**Location-level (repeatable; default 1)**
- `location_name`
- `location_address` (optional)
- `timezone` (IANA, e.g., `America/Chicago`)
- `business_hours` (Mon-Sun open/close; optional)
- `appointment_types` (comma list)
- `calendar_system` (Acuity/Calendly/Google/Other)
- `calendar_access_method` (connect oauth / share link / API key / upload CSV)
- `reschedule_link` (URL)
- `confirmation_window` (e.g., require confirm by 12h before)

**Reminder timing (recommended defaults)**
- `reminder_1`: 24 hours before
- `reminder_2`: 3 hours before
- `reminder_same_day_morning`: boolean

**Waitlist (optional)**
- `waitlist_enabled`: boolean
- `waitlist_contacts_upload`: CSV (name, mobile, tags)
- `waitlist_rules`: e.g., “notify up to 10 people, stop when slot filled”

**Compliance / approvals (required checkboxes)**
- `consent_attestation`: “We only message customers who provided consent to receive appointment-related SMS.”
- `optout_ack`: “We will honor STOP/HELP and not re-message opted-out numbers.”
- `template_approval_ack`: “We approve the message templates used on our behalf.”

### Per-location duplication
UI action: “Duplicate this location” which copies the location config and prompts only for `location_name`, timezone/address overrides.

---

## 3) Data model (minimal)
Use any DB already in Replit app. Suggested tables/collections:

### orgs
- `id`
- `org_name`
- `owner_name`
- `owner_email`
- `owner_mobile`
- `stripe_customer_id`
- `stripe_subscription_id`
- `plan`
- `status` (trial|active|past_due|canceled)
- `created_at`

### locations
- `id`
- `org_id`
- `location_name`
- `timezone`
- `reschedule_link`
- `reminder_config_json`
- `waitlist_config_json`
- `twilio_phone_number` (nullable)
- `twilio_phone_sid` (nullable)
- `messaging_service_sid` (nullable)
- `created_at`

### optouts
- `id`
- `org_id`
- `location_id` (nullable: if shared number per org then keep null)
- `phone_e164`
- `source` (STOP|manual|carrier)
- `created_at`

### message_templates
- `id`
- `org_id`
- `location_id`
- `type` (confirm_ask|reminder|reschedule|waitlist_offer)
- `body`
- `approved_by_name`
- `approved_at`

---

## 4) Twilio provisioning (feature-flagged in week 1)
### Week 1 behavior
- Implement code paths but set `TWILIO_PROVISIONING_ENABLED=false`.
- On onboarding completion: show “SMS provisioning pending (we’ll activate within 24 hours)” and send email to agent inbox.

### When enabled (later)
Provision per location:
1) Buy a local number in the location’s area (or use pooled numbers per org).
2) Create a Messaging Service (optional but recommended) and attach number.
3) Set inbound webhook URL for the number/service to `/api/twilio/inbound`.
4) Send a **test SMS** to `owner_mobile`.

### Twilio inbound webhook requirements
Endpoint: `POST /api/twilio/inbound`
- Parse `Body`, `From`, `To`.
- Normalize keyword = upper(trim(body)).

If keyword in `[STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT]`:
- Add `From` to `optouts` for that org/location.
- Respond with TwiML confirming opt-out (or empty OK; Twilio may auto-handle but we enforce anyway).

If keyword in `[HELP, INFO]`:
- Respond: “Reply STOP to opt out. For help contact agent_bob_replit+no-show-bot@agentmail.to”

All other inbound:
- Treat as confirmation/reschedule intent (later), but for now store in logs.

### Outbound suppression enforcement
Before sending any SMS:
- if recipient is in `optouts`, do not send.

---

## 5) Consent language (paste into checkout + onboarding)
### Checkbox text (intake form)
“I confirm that we only send SMS reminders to customers who have provided consent to receive text messages about their appointments. We will include opt-out instructions and honor STOP requests immediately.”

### Footer disclosure (on onboarding page)
“SMS is used only for appointment-related messages (confirmations, reminders, reschedules). Message & data rates may apply. Customers can reply STOP to opt out, HELP for help.”

### Suggested reminder template (requires client approval)
“{BusinessName}: Reminder—your appointment is {Day} at {Time}. Reply 1 to confirm, 2 to reschedule. Reply STOP to opt out.”

---

## 6) Terms + DPA-lite (starter text to publish)
### Terms (high-level sections)
1. **Service**: automated appointment SMS reminders, confirmations, reschedules, waitlist.
2. **Customer responsibilities**: obtain consent; provide accurate schedules; comply with TCPA/CTIA/carrier rules.
3. **Opt-out**: STOP honored immediately; customer must not re-add opted-out numbers without new consent.
4. **Availability**: best-effort, dependent on carriers/Twilio.
5. **Limitation of liability**: cap at fees paid in last 30 days (or $100 for trial).
6. **Data**: customer owns customer data; we act as processor.

### DPA-lite (starter sections)
- Roles: Customer = Controller; Us = Processor.
- Processing: sending transactional appointment messages.
- Subprocessors: Twilio, Stripe.
- Security: access control, encryption in transit.
- Retention: delete on request within 30 days.

---

## 7) Done-for-you concierge setup SOP (≤30 minutes)
### What we need from client (ask in intake)
- Business name + location timezone
- Reschedule link
- Reminder timing preferences
- Confirmation keywords (default: 1=confirm, 2=reschedule)
- Waitlist CSV (optional)
- Proof of consent process (one sentence)

### Internal checklist
1) Verify Stripe session exists and org record created.
2) Verify intake form complete and consent checkboxes checked.
3) Create location config; duplicate if multiple locations.
4) (If provisioning enabled) buy Twilio number + configure webhook.
5) Send test message to owner mobile.
6) Ask owner to reply “1” to confirm test receipt.
7) Mark org/location “active”.

### Activation email (send from agent inbox)
Subject: “Your appointment reminder texts are ready (test message inside)” 
Body:
“Hi {Name} — we’re ready to activate your reminders. You’ll receive a test text from our system. Reply ‘1’ to confirm you received it. You can review our terms here: {website_url}. For help reply to this email: agent_bob_replit+no-show-bot@agentmail.to”

---

## 8) Minimal implementation stubs (Node/Express-style pseudocode)
```js
// POST /api/stripe/create-checkout-session
// Creates Stripe checkout (test mode keys in week 1)

// POST /api/stripe/webhook
// Handles checkout.session.completed, invoice.paid, subscription.deleted

// POST /api/onboarding/submit
// Validates intake + writes org/location rows + flags provisioning pending

// POST /api/twilio/inbound
// STOP/HELP handling + logging

function isOptedOut(phoneE164, orgId, locationId) {
  // query optouts
}

async function sendSms({to, from, body, orgId, locationId}) {
  if (await isOptedOut(to, orgId, locationId)) return {skipped: true};
  // twilio.messages.create(...) when enabled
}
```

---

## Week 1 note (no spend compliance)
- Do NOT purchase Twilio numbers.
- Do NOT activate Stripe Live Mode.
- Do use Stripe Test Mode to validate full flow and record configs.
- Do capture consent + enforce STOP handling in code before any outbound SMS is enabled.
