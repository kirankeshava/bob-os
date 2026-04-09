# Appointment No-Show Reducer — Payments (Stripe) + Onboarding Intake + Twilio Provisioning + STOP Compliance + Concierge Setup SOP (Implementation-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:01:47.840Z

---

# 1) Stripe payments: subscription + optional setup fee

## Pricing model (per location)
- **Subscription (per location)**: `No-Show Reducer — Location Plan` billed monthly.
- **Optional one-time concierge setup**: `Concierge Setup (one-time)`.

Recommended starting price points (editable):
- Subscription: **$99/location/month**
- Setup: **$199 one-time** (optional)

## Stripe objects
Create (in Stripe Dashboard):
- Product A: `No-Show Reducer — Per Location`
  - Price A (recurring monthly): `price_location_monthly`
- Product B: `Concierge Setup`
  - Price B (one-time): `price_concierge_setup`

## Checkout flow
User path: **/checkout → Stripe Checkout → /onboarding/intake?session_id=...**

### Create Checkout Session (server-side)
Endpoint: `POST /api/stripe/create-checkout-session`
Request body:
```json
{
  "plan": "location_monthly",
  "locations": 1,
  "addConcierge": true,
  "customerEmail": "owner@business.com"
}
```
Implementation rules:
- Always collect email.
- Use `mode: subscription`.
- Add line item Price A with quantity = locations.
- If `addConcierge=true`, include Price B as an additional line item (one-time price is allowed with subscriptions).
- Set metadata for downstream provisioning:
  - `metadata.product = "no_show_reducer"`
  - `metadata.locations = "1"`
  - `metadata.addConcierge = "true"|"false"`
  - `metadata.source = "website"|"demo"|...`
- Set `success_url` to the business website/app domain:
  - `success_url = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2/onboarding/intake?session_id={CHECKOUT_SESSION_ID}`
- Set `cancel_url` similarly.

### Stripe webhook (server-side)
Endpoint: `POST /api/stripe/webhook`
Events to handle:
- `checkout.session.completed`: create internal Org record if missing; mark `payment_status = "pending_activation"`.
- `invoice.paid`: mark subscription active for the location(s); allow Twilio provisioning.
- `customer.subscription.deleted`: deactivate reminders and stop outbound messaging.

Internal state machine (minimal):
- `ORG.status`: `new → paid_pending_intake → provisioning → active`.
- `LOCATION.status`: `draft → paid → provisioned → active`.

## What to store (DB)
- `orgs`: `id, name, owner_email, stripe_customer_id, created_at`
- `subscriptions`: `id, org_id, stripe_subscription_id, status, current_period_end`
- `payments`: `id, org_id, stripe_checkout_session_id, status, raw_event_json`

# 2) Onboarding intake form (post-checkout)

URL: `/onboarding/intake?session_id=...`
Purpose: Collect **per-location configuration** and compliance confirmations.

## Intake fields (minimum)
### Business & location
- Business name
- Location name (e.g., “Downtown”)
- Address (optional)
- Timezone (IANA, e.g., `America/New_York`)
- Primary service category (medical/dental/salon/fitness/etc.)

### Owner contact (for testing + ops)
- Owner/manager name
- Owner mobile phone (E.164 preferred)
- Email (pre-filled from Stripe)

### Appointment source
- “How do you manage appointments today?” (dropdown)
  - Google Calendar / Outlook / Square / Calendly / Acuity / Jane / Mindbody / Other
- Calendar access method (radio)
  - “Connect calendar (OAuth)” (future)
  - “Upload/export appointments daily”
  - “We’ll start with manual test list”

### Reminder policy
- Default reminder schedule (checkboxes)
  - 24 hours before
  - 3 hours before
  - 1 hour before
- Two-way confirmation enabled (yes/no)
- If customer replies “No”, auto-reschedule link (yes/no)

### Waitlist gap-fill
- Enable waitlist (yes/no)
- Waitlist upload (CSV upload) OR paste list
  - Fields: `first_name,last_name,phone,preferred_days(optional),notes(optional)`

### Compliance & approvals (required)
Checkboxes (must be checked):
1) **Customer consent**: “We only text customers who have provided consent to receive appointment-related SMS.”
2) **Opt-out**: “We will honor STOP/UNSUBSCRIBE immediately.”
3) **Template approval**: “I approve the default message templates or will provide edits for approval.”
4) **Authorized sender**: “I confirm I am authorized to message customers for this business.”

Submit result:
- Create `org` + `location` records.
- Kick off Twilio provisioning job.

## Per-location config schema (store as JSON + normalized fields)
Table `locations`:
- `id, org_id, name, timezone, owner_phone, owner_email`
- `reminder_schedule_json` (e.g., `[1440,180,60]` minutes)
- `two_way_confirm_enabled` boolean
- `waitlist_enabled` boolean
- `status` enum
- `twilio_phone_number, twilio_phone_sid, twilio_messaging_service_sid`

### Duplicate location behavior
UI action: “Duplicate location”
- Copies reminder schedule, templates, waitlist settings.
- Requires new: location name, timezone (optional), owner phone (optional).

# 3) Twilio provisioning + messaging

## Provisioning steps (server-side)
Endpoint: `POST /api/twilio/provision-number`
Inputs: `org_id, location_id, area_code(optional), country=US`
Steps:
1) Search available local numbers with SMS capability.
2) Buy number.
3) Create Messaging Service (optional but recommended) OR attach number directly.
4) Configure webhooks:
   - Inbound message webhook URL: `/api/twilio/inbound`
   - Status callback URL for delivery receipts: `/api/twilio/status`
5) Save SIDs + number to `locations`.
6) Send owner a test SMS: “Your reminder system is live. Reply YES to confirm you received this.”

## Outbound message guardrails
Before sending any outbound SMS:
- Check suppression list (opt-outs) for that phone number.
- Ensure message includes business identifier.
- Ensure STOP instructions appear at least once in the first reminder chain.

# 4) STOP/HELP compliance handling (required)

Endpoint: `POST /api/twilio/inbound`
Behavior:
- Normalize inbound body: trim, uppercase.
- If body contains any of: `STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT`
  - Add phone to `opt_outs` table with timestamp + location/org.
  - Respond with: “You are opted out and will no longer receive texts. Reply START to opt back in.”
  - Do **not** send further reminders.
- If body contains: `START, YESSTART, UNSTOP`
  - Remove from opt-out list.
  - Respond: “You are opted back in. You will receive appointment texts.”
- If body contains: `HELP, INFO`
  - Respond: “Appointment reminders from {Business}. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

Data model:
- `opt_outs`: `id, org_id, location_id, phone_e164, opted_out_at, source="inbound"`
- `inbound_messages`: `id, location_id, from_phone, to_phone, body, received_at`

# 5) Customer-facing consent + opt-out language (paste-ready)

Use on checkout page and intake form:

**SMS Consent:** By providing your phone number, you agree to receive appointment-related text messages (reminders, confirmations, and rescheduling links) from {Business Name}. Message frequency varies. Message & data rates may apply.

**Opt-out:** Reply STOP to opt out at any time. Reply START to opt back in. Reply HELP for help.

**Privacy:** We use your information only to provide appointment communications for your chosen business location.

# 6) Message template approval guidelines (internal)

- Only send transactional appointment messages: reminders, confirmations, reschedule links, waitlist offers.
- No marketing content unless explicit separate consent.
- Templates must include:
  - Business name
  - Appointment date/time
  - Simple confirm action (“Reply Y to confirm, N to reschedule”)
  - STOP instruction in at least one message in the sequence
- Keep under 160–300 chars where possible; avoid URL shorteners that look suspicious.

Default templates (editable):
1) 24h reminder: “{Business}: Reminder of your appointment on {Date} at {Time}. Reply Y to confirm or N to reschedule. Reply STOP to opt out.”
2) 3h reminder: “{Business}: See you at {Time} today. Reply Y to confirm or N to reschedule.”
3) Waitlist offer: “{Business}: An earlier slot opened at {Time}. Reply YES to claim it. Reply STOP to opt out.”

# 7) Basic Terms + DPA-lite (early-stage, paste-ready)

## Terms (summary)
- Service: automated appointment reminders/confirmations and basic analytics.
- Customer responsibilities: obtain SMS consent; ensure numbers are accurate; comply with applicable laws.
- Prohibited use: spam/marketing without consent, illegal content.
- Availability: best-effort; SMS delivery not guaranteed.
- Limitation: liability capped to fees paid in the last 30 days (or a small fixed cap).
- Termination: stop service on non-payment or misuse; opt-outs must be honored.

## DPA-lite (summary)
- Roles: customer is controller; we are processor.
- Data processed: customer name/phone, appointment time, message logs, opt-out status.
- Purpose: provide reminders/confirmations and reporting.
- Retention: delete/aggregate logs after a defined period (e.g., 90–180 days) upon request.
- Subprocessors: SMS provider (Twilio) and payment provider (Stripe).

# 8) Concierge setup SOP (under 30 minutes)

Goal: get a new paid location to “test message sent to owner” quickly.

Checklist:
1) Confirm payment (Stripe: invoice.paid or subscription active).
2) Open org record; create first location.
3) Send client intake link if not completed.
4) Verify timezone + reminder schedule (default: 24h + 3h).
5) Provision Twilio number for the location.
6) Configure inbound webhook + status callback.
7) Send owner test SMS; confirm they can reply.
8) Save approved message templates.
9) (Optional) Import waitlist CSV.
10) Run a simulated appointment reminder to owner number for validation.
11) Mark location status = ACTIVE.

Client-facing email (send from agent_bob_replit+no-show-bot@agentmail.to):
Subject: Your appointment reminder system is ready — final setup
Body:
Hi {Name},

To finish setup for {Business}/{Location}, please complete this intake form: {Intake URL}.

Once submitted, we’ll provision your texting number and send a test SMS. If you have preferred reminder timing or wording, reply here and we’ll update it.

Thanks,
Bob
Support: agent_bob_replit+no-show-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
