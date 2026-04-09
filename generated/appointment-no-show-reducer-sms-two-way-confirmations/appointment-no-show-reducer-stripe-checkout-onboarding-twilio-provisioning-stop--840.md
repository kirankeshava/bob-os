# Appointment No-Show Reducer — Stripe Checkout + Onboarding + Twilio Provisioning + STOP Compliance + Concierge Setup (Build-Ready Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:28:13.324Z

---

# 1) Pricing + Payments (Stripe)

## 1.1 Offer Structure
We sell **per-location** because reminders, numbers, schedules, and consent differ by location.

**Plan (subscription):**
- Product name: “No‑Show Reducer — Per Location”
- Price: `price_monthly_location` (e.g., $149/mo per location; adjust later)
- Billing: recurring monthly
- Trial: optional 7–14 days (recommend: none until deliverability is proven)

**Optional one-time concierge setup fee:**
- Product: “Concierge Setup (One‑time)”
- Price: `price_setup_fee` (e.g., $299 one-time)
- Charged as an additional line item in Checkout or as a separate one-time Checkout.

## 1.2 Stripe Checkout Session Parameters (implementation spec)
**Mode:** `subscription` (for the monthly plan). Add the setup fee as a second line item if selected.

**Metadata (critical for provisioning):**
Attach these to either `checkout.session` metadata and/or the `subscription` metadata:
- `org_id`
- `location_id` (create location record pre-checkout or create post-success)
- `plan` (e.g., `monthly_location`)
- `includes_concierge` (`true|false`)
- `onboarding_version` (e.g., `v1`)

**Success URL:**
- `/onboarding?session_id={CHECKOUT_SESSION_ID}`

**Cancel URL:**
- `/checkout?canceled=1`

**Required Stripe settings (no spend):**
- Enable Customer Portal (optional but recommended)
- Configure Billing emails
- Add business support email: `agent_bob_replit+no-show-bot@agentmail.to`

## 1.3 Webhooks (activation logic)
Listen for:
- `checkout.session.completed` (capture customer + subscription ID)
- `invoice.paid` (mark location active)
- `customer.subscription.deleted` (disable sending)

**Rule:** Don’t start sending messages until `invoice.paid` (or trial rules if used).


# 2) Onboarding Flow (Frictionless)

## 2.1 Flow Overview
1) Customer clicks “Get Started” → Stripe Checkout
2) Stripe success redirect → Onboarding Intake Form
3) Intake submitted → backend provisions messaging resources
4) System sends **test SMS** to owner + records confirmation
5) Location is marked “Ready” and reminders start according to configuration


# 3) Onboarding Intake Form (per-location config)

## 3.1 Fields (minimum viable)
**Business + location**
- Business / Org name (string, required)
- Location name (string, required)
- Location address (string, optional)
- Timezone (IANA string, required; e.g., `America/Chicago`)

**Owner / operator (for testing + ops)**
- Owner full name (string, required)
- Owner mobile phone (E.164, required)
- Owner email (email, required)

**Appointment source (choose one)**
- Calendar system: Google Calendar / Outlook / Jane / Acuity / Calendly / Other (enum)
- Connection method (enum): OAuth (if supported) / ICS feed / CSV upload / Manual test

**Reminder behavior**
- Reminder schedule (multi-select): 24h, 4h, 2h, 1h, custom
- Quiet hours (start/end local time) e.g., 8pm–8am
- Reschedule link (URL, optional)
- Reply keywords enabled (default yes): CONFIRM, C, YES; RESCHEDULE; CANCEL

**Waitlist / fill gaps**
- Waitlist upload (CSV) OR manual entry
  - Required columns: first_name, last_name (optional), phone (E.164), consent_timestamp, consent_source

**Compliance acknowledgements (required checkboxes)**
- “I confirm I have obtained consent to send SMS reminders to my customers, and I will only upload contacts who opted in.”
- “I understand customers can reply STOP to opt out at any time.”
- “I agree to the Terms and Data Processing Addendum.”

## 3.2 Per-location storage model (DB-ready)
- `orgs`: id, name, owner_email
- `locations`: id, org_id, name, timezone, status (`pending|active|paused`), created_at
- `location_settings`: location_id, quiet_hours_start, quiet_hours_end, reminder_offsets_json, reschedule_url, waitlist_enabled
- `messaging_numbers`: location_id, twilio_phone_e164, twilio_sid, messaging_service_sid, status
- `consents`: location_id, method, accepted_at, ip_address (if collected)
- `opt_outs`: location_id, phone_e164, opted_out_at, source_message_sid

## 3.3 “Duplicate location” requirement
Add an action: **Duplicate Location**
- Copies `location_settings` + reminder rules + templates
- Does NOT copy messaging number or opt-outs
- Prompts for new location name/timezone/owner phone


# 4) Twilio Provisioning + Messaging (automation spec)

## 4.1 Provisioning Steps
When onboarding is submitted (and location is paid/authorized):
1) Search for an available local number (optionally by area code)
2) Purchase number
3) Create or attach to a Messaging Service (recommended)
4) Configure webhook URLs:
   - Inbound message webhook: `/api/twilio/inbound`
   - Status callback webhook: `/api/twilio/status`
5) Store SIDs + purchased phone in `messaging_numbers`
6) Send owner test SMS:
   - “Test: Your reminder line is active for {Location}. Reply YES to confirm.”
7) If owner replies YES → mark messaging as verified

## 4.2 Inbound message handling (STOP/HELP)
**Keywords (case-insensitive, trim punctuation):**
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt out
- START, YES → opt back in (only if previously opted out)
- HELP, INFO → help response

**Behavior:**
- On STOP*: add sender phone to `opt_outs` for that location; reply:
  - “You’re opted out of {Business} reminders. Reply START to rejoin. Msg&data rates may apply.”
- On START/YES: remove from `opt_outs`; reply:
  - “You’re opted back in to {Business} reminders. Msg&data rates may apply.”
- On HELP: reply:
  - “{Business} appointment reminders. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

**Outbound enforcement:**
Before sending any SMS, check `opt_outs` for that location + phone. If opted out, suppress.


# 5) Consent Language (embed in checkout + onboarding)

Use this near the phone number field and in Terms:

**SMS Consent (customer-facing):**
“By providing your phone number, you agree to receive appointment-related text messages (reminders and confirmations) from {Business/Location}. Message frequency varies. Message & data rates may apply. Reply STOP to opt out, HELP for help.”

**Client warranty (business-facing):**
“Client represents and warrants it has obtained all necessary consents and permissions to send SMS to its customers, including for reminder and confirmation messages, and will maintain records of consent.”


# 6) Message Template Approval Guidelines (internal + client-facing)

1) Appointment reminders only (transactional) unless explicit marketing consent exists.
2) Every template must include:
   - Business identifier (name/location)
   - Clear call to action (CONFIRM / RESCHEDULE)
   - STOP instructions at least once in first message thread (or in initial reminder)
3) Avoid sensitive details (no medical specifics; no financial account info).
4) Don’t send during quiet hours.
5) Keep under 160–320 chars when possible; avoid URL shorteners if deliverability drops.


# 7) Baseline Terms + DPA-lite (snippets to publish)

## 7.1 Terms (key clauses)
- Service description: automated SMS reminders/confirmations/waitlist fill
- Fees: subscription per location; optional one-time setup
- Client responsibilities: accurate data, lawful consent, honoring opt-outs, providing reschedule links
- Acceptable use: no spam/marketing without consent; no prohibited content
- Limitation of liability: cap to fees paid in last 3 months (starter-friendly)
- Termination: nonpayment stops messages; client can cancel anytime

## 7.2 DPA-lite (key clauses)
- Roles: Client = Controller; Provider = Processor
- Processing: phone numbers, appointment times, message logs, opt-out status
- Purpose: send appointment-related messages per client instruction
- Security: access controls, encryption in transit, least privilege
- Subprocessors: Twilio, Stripe (list them)
- Retention: delete upon request; default retention window (e.g., 90 days logs)


# 8) Concierge Setup SOP (≤30 minutes)

## Checklist (operator steps)
1) Confirm payment succeeded in Stripe (subscription active / invoice paid)
2) Open onboarding intake; verify:
   - timezone
   - quiet hours
   - reminder offsets
   - owner phone is E.164
3) Provision number (Twilio): buy local number → attach messaging service → save SIDs
4) Send owner test SMS; wait for YES reply; mark verified
5) Upload waitlist CSV (if provided) and validate consent columns
6) Run end-to-end test:
   - create a test appointment 2 hours out
   - confirm reminder sends and confirmation reply is recorded
7) Send “Go live” email to client:
   - their dedicated reminder number
   - what customers will see
   - how STOP works
   - support email: agent_bob_replit+no-show-bot@agentmail.to

## Troubleshooting quick hits
- If messages fail: verify A2P/brand requirements regionally; check Twilio error codes; ensure webhooks reachable.
- If confirmations not recorded: check inbound webhook URL + signature validation.


# 9) Copy blocks to paste into the app UI

**Checkout page bullets:**
- “Two-way confirmations: customers reply CONFIRM to lock in”
- “Automatic reschedule prompts when they can’t make it”
- “Waitlist fills last-minute gaps”
- “Analytics: recovered revenue estimate per location”

**Onboarding success page:**
“Thanks — we’re provisioning your reminder line now. You’ll receive a test text in the next 1–2 minutes. Reply YES to confirm everything is working.”


# 10) Implementation Notes (engineering)
- Build in Stripe **test mode** first; no financial approval required to code.
- Use environment variables for Stripe/Twilio keys.
- Store `stripe_customer_id`, `stripe_subscription_id`, and `stripe_price_id` on the `locations` table.
- Enforce opt-out at send-time + honor STOP immediately on inbound.

Reference site for legitimacy in outbound/customer comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to
