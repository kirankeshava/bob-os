# Appointment No-Show Reducer — Payments + Onboarding + Twilio + Compliance (Build-Ready Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:32:49.294Z

---

# 1) Stripe: subscription + optional one-time setup fee (Week 1: free launch)

## Goal
Enable a frictionless path: **Checkout → Intake Form → Provision (Twilio) → Test SMS → Activate**. During Week 1 we can run **$0 pilots** (100% off coupons or $0 price in test) while still using the same flow.

## Recommended offer structure
- **Plan (per location):** “No-Show Reducer — Per Location”
  - Billing: monthly subscription
  - Trial: optional 7 days (aligns with Week 1 free pilots)
- **Concierge setup (optional):** one-time fee line item (can be $0 in Week 1)

### Stripe metadata (critical)
Attach to the **Checkout Session** and/or **Subscription**:
- `org_id` (UUID)
- `location_id` (UUID)
- `plan` (e.g., `location_monthly`)
- `seats` (optional future: number of providers)
- `timezone`

### Checkout success/cancel URLs
- Success: `https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2/onboarding?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2/pricing?canceled=1`

### Server endpoint: create checkout session (pseudo)
**POST** `/api/stripe/create-checkout-session`
Request body: `{ orgId, locationId, email, addConcierge:boolean }`
- Create Stripe customer (or reuse by email)
- Create Checkout Session `mode=subscription`
- `line_items`: subscription price + optional setup-fee price
- `allow_promotion_codes=true` (for Week 1 free pilots)
- `client_reference_id = locationId`
- `metadata = { org_id, location_id }`
Return `{ url }`

### Webhook handler
**POST** `/api/stripe/webhook`
Handle events:
- `checkout.session.completed`: mark `billing_status=active` for `locationId`, store `stripe_customer_id`, `stripe_subscription_id`
- `invoice.payment_failed`: set `billing_status=past_due` (pause sending)
- `customer.subscription.deleted`: set `billing_status=canceled` (pause sending)

> Week 1 policy note: You can still implement this fully using Stripe test mode and/or a 100% off coupon. No spend required.

---

# 2) Onboarding intake form (post-checkout)

## UX flow
1. Customer completes checkout.
2. Redirect to `/onboarding?session_id=...`
3. Backend verifies Stripe session → identifies `org/location`.
4. Customer fills intake form.
5. System provisions Twilio number (per location) or queues provisioning.
6. System sends a **test SMS** to owner: “Reply YES to confirm notifications.”
7. When owner replies YES, location status becomes “Ready”.

## Intake form fields (per location)
### Business + location
- Business name (string)
- Location name (string)
- Location address (string, optional)
- Timezone (IANA string, required)
- Primary owner name (string)
- Owner mobile for alerts/testing (E.164 required)
- Notification email (default to checkout email)

### Service hours
- Days open (Mon–Sun toggles)
- Open time / close time (per day or global)
- Do-not-message window (e.g., 9pm–8am)

### Calendar/booking integration (MVP supports manual import)
- Booking source: {Acuity, Calendly, Google Calendar, Square, Jane, Other}
- Access method:
  - OAuth (future)
  - Upload CSV (MVP)
  - Forward confirmation emails to parser address (optional)

### Reminder timing
- Default reminders: e.g., 24h + 2h before
- Confirmation request: e.g., 24h before (“Reply C to confirm, R to reschedule”)
- Reschedule link (URL)

### Waitlist
- Enable waitlist fill (toggle)
- Waitlist upload: CSV (name, phone, preferred windows)
- Gap-fill window threshold (e.g., fill gaps <48h)

### Consent + approvals
- Checkbox: “I confirm I have obtained consent to text my customers about appointments, and will only upload contacts who have consented.” (required)
- Checkbox: “I agree to Terms and DPA.” (required)
- Message template approval:
  - Show 2–3 default templates
  - Checkbox: “Approve these templates” or edit box + approve

## Data model (minimal)
Tables:
- `orgs(id, name, owner_email, created_at)`
- `locations(id, org_id, name, timezone, status, created_at)`
- `location_config(location_id, hours_json, reminder_rules_json, reschedule_url, owner_phone, dnm_window_json, waitlist_enabled, templates_json, consent_attested_at)`
- `twilio_resources(location_id, phone_number, messaging_service_sid, number_sid, status)`
- `opt_outs(location_id, phone_e164, opted_out_at, source)`

### Duplicate location config
Endpoint: **POST** `/api/locations/:id/duplicate`
- Copies `location_config` + templates + reminder rules
- Does NOT copy Twilio phone number
- Creates new `location` in “pending_provision”

---

# 3) Twilio provisioning + test message

## Provisioning steps (per location)
Endpoint: **POST** `/api/twilio/provision-number`
1. Search local numbers in target country/area (use location address/area code if provided).
2. Purchase number with SMS capability.
3. Configure webhook URLs on the number:
   - Inbound SMS webhook: `/api/twilio/inbound-sms`
   - Status callback: `/api/twilio/status-webhook`
4. Store SIDs + phone in `twilio_resources`.
5. Send owner test SMS:
   - “Your No-Show Reducer line is ready: {twilioNumber}. Reply YES to confirm you received this.”
6. If inbound reply contains YES, set `location.status = active_ready`.

> Week 1: if Twilio trial is available, use it. If not, queue provisioning and keep onboarding usable (status “pending_number”).

---

# 4) STOP/HELP compliance + suppression

## Inbound keyword handling
Inbound webhook: **POST** `/api/twilio/inbound-sms`
Parse incoming body (case-insensitive, trimmed):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → mark number opted out
  - Upsert `opt_outs(location_id, from_number)`
  - Reply: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- START, YES (when opted out) → remove from opt_outs
  - Reply: “You’re re-subscribed. You will receive appointment texts.”
- HELP → reply: “Appointment reminders from {Business}. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

## Outbound enforcement
Before sending any SMS:
- Check `opt_outs` for `(location_id, to_number)`
- If present, do not send.

## Consent language (embed in intake + optionally in customer messages)
**Owner attestation (intake checkbox text):**
“I confirm my customers have consented to receive SMS about their appointments (or I will obtain consent before texting). I understand customers can reply STOP to opt out and HELP for assistance.”

**Optional customer-facing footer (first message only or periodically):**
“Reply STOP to opt out, HELP for help.”

---

# 5) Message template approval guidelines (internal)

- Appointment reminders must be **transactional** (appointment logistics), not marketing.
- Avoid sensitive health details; use generic service wording.
- Always include business identifier and opt-out line at least on first message.
- Never imply urgency that is false (“final notice”) and never shorten links without a trusted domain.

Default templates (editable, require approval checkbox):
1. **24h confirmation**: “{Business}: You’re scheduled for {Day} at {Time}. Reply C to confirm or R to reschedule. Reply STOP to opt out.”
2. **2h reminder**: “{Business}: Reminder—appointment today at {Time}. Reply R to reschedule. STOP to opt out.”
3. **Waitlist fill**: “{Business}: An earlier spot opened {Day} at {Time}. Reply Y to take it. STOP to opt out.”

---

# 6) Terms + DPA-lite (paste-ready sections)

## Terms (short form)
- Service provides appointment reminder automation via SMS/email.
- Customer is responsible for lawful basis/consent to contact end users.
- Customer will not upload or transmit prohibited content; will not use for marketing without proper consent.
- Limitation of liability (typical cap: fees paid in last 3 months) — can be added later.
- Suspension: we may suspend sending if payment fails or abuse/complaints occur.
- Support contact: agent_bob_replit+no-show-bot@agentmail.to

## DPA-lite
- Roles: Customer = controller, Service = processor.
- Processing: phone numbers, names, appointment times, message logs.
- Subprocessors: Twilio (SMS delivery), Stripe (billing).
- Retention: delete upon request within reasonable time; logs retained for troubleshooting.
- Security: access controls, least privilege.

---

# 7) Concierge setup SOP (≤30 minutes)

1) Create org + location in admin (2 min)
- Org name, location name, timezone.

2) Collect owner inputs (8 min)
- Owner phone, hours, reminder timing, reschedule URL.
- Confirm consent attestation checked.

3) Provision number (5 min)
- Run provisioning endpoint; verify phone stored.

4) Templates (5 min)
- Paste default templates; confirm business name; ensure STOP/HELP line present.

5) Test (5 min)
- Send test SMS to owner; owner replies YES.
- Confirm inbound webhook logs YES and flips status to ready.

6) Launch (5 min)
- Turn on sending for that location.
- Send owner a “go-live” email with support address and what to expect.

Owner email template (send from agent_bob_replit+no-show-bot@agentmail.to):
Subject: Your No-Show Reducer line is live for {Location}
Body:
Hi {Name},
Your reminder line is active: {TwilioNumber}.
Next steps:
- You’ll see confirmations/reschedules come in as replies.
- Customers can opt out anytime by replying STOP.
If you want changes to timing or wording, reply here.
— No-Show Reducer Support (agent_bob_replit+no-show-bot@agentmail.to)

---

# 8) What still needs coding (checklist)
- Stripe: create-checkout-session endpoint + webhook verification + DB updates.
- Onboarding UI: intake form + submit + status page.
- Twilio: provision-number endpoint + inbound-sms + status callbacks.
- Opt-out DB enforcement in sending pipeline.
- Location config duplication endpoint + UI action.
