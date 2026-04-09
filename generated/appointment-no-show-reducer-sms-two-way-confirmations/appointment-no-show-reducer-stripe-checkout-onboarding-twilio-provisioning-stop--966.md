# Appointment No-Show Reducer — Stripe Checkout + Onboarding + Twilio Provisioning + STOP Compliance + Concierge Setup (Implementation Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:33:19.111Z

---

Below is an implementation-ready pack for payments + onboarding + SMS compliance/ops.

1) STRIPE CHECKOUT FLOWS (NO-SPEND SETUP)
Goal: checkout → success redirect with session_id → intake form → activate location.

A. Pricing model
- Core subscription (per location): $99/mo (example; adjust later)
- Optional concierge setup (one-time): $199 (example)

B. Create Checkout Session (server-side)
Endpoint: POST /api/stripe/create-checkout-session
Request body: { plan: 'standard', quantityLocations: 1, addSetupFee: true|false, customerEmail, successUrl, cancelUrl }

Server logic:
- Build line_items with subscription price.
- If addSetupFee, add a second line item as one-time payment.
- Use mode='subscription'. Stripe supports mixed recurring + one-time line items in subscription mode.
- Attach metadata for internal provisioning.

Example (Node/TS pseudocode):

const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  customer_email,
  allow_promotion_codes: true,
  line_items: [
    { price: process.env.STRIPE_PRICE_STANDARD_MONTHLY, quantity: quantityLocations },
    ...(addSetupFee ? [{ price: process.env.STRIPE_PRICE_CONCIERGE_SETUP, quantity: 1 }] : [])
  ],
  subscription_data: {
    metadata: {
      product: 'no-show-reducer',
      plan,
      locations: String(quantityLocations),
      websiteProof: 'https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2'
    }
  },
  metadata: {
    product: 'no-show-reducer',
    plan,
    addSetupFee: String(addSetupFee)
  },
  success_url: `${BASE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${BASE_URL}/pricing?canceled=1`,
  consent_collection: { terms_of_service: 'required' },
});

C. Webhook
Endpoint: POST /api/stripe/webhook
Events to handle:
- checkout.session.completed → mark org as paid, store stripeCustomerId, stripeSubscriptionId, sessionId
- invoice.payment_succeeded → keep active
- customer.subscription.deleted / invoice.payment_failed → pause sending

Data to store:
- org.stripeCustomerId
- org.stripeSubscriptionId
- org.subscriptionStatus (active/past_due/canceled)
- org.paidAt

2) ONBOARDING INTAKE FORM (POST-CHECKOUT)
Page: GET /onboarding?session_id=...
Behavior:
- Server verifies session_id belongs to a completed session (or at minimum created) and extracts customer email.
- Show intake form.

Form fields (per organization + first location)
Org-level:
- ownerName
- ownerMobile (for test SMS)
- ownerEmail (prefill from Stripe)
- businessName
- website (optional)
- termsAccepted checkbox

Location-level (repeatable / duplicable):
- locationName (e.g., “Downtown Clinic”)
- locationAddress (optional)
- timezone (IANA string, required)
- businessHours: per-day open/close + closed days
- appointmentSystem: { type: 'Calendly'|'Acuity'|'Google Calendar'|'EHR/Other', notes }
- reminderSchedule (defaults recommended):
  - reminder1: 24h before
  - reminder2: 2h before
  - reminder3: 30m before (optional)
- twoWayConfirmations: enabled true/false
- confirmationKeywords: CONFIRM / C to confirm; RESCHEDULE / R to reschedule
- rescheduleLink (optional)
- waitlistUpload: CSV upload OR pasted list (name, phone, service)
- consentCaptureMethod:
  - “Customer consent is collected at booking” (checkbox required)
  - link to customer consent language (provided below)
- messageTemplateApproval:
  - checkbox “I approve the default reminder templates”
  - text area for custom wording (optional)

Submit endpoint: POST /api/onboarding/submit
Stores org + location config and sets status=“pending_phone_provision”.

Location duplication
UI action: “Duplicate location”
- clones reminderSchedule, confirmation settings, templates, consent method, waitlist settings
- requires editing locationName + timezone + hours

3) TWILIO NUMBER PROVISIONING (GATED UNTIL FUNDED)
Endpoint: POST /api/twilio/provision-number
Trigger: after onboarding submit OR manual button “Provision number”.

Logic:
- Ensure org subscriptionStatus == active.
- Purchase local number in the location’s country/area (if provided) with SMS capability.
- Configure Messaging webhook URLs:
  - inbound SMS webhook: POST {BASE_URL}/api/twilio/inbound
  - status callback: POST {BASE_URL}/api/twilio/status
- Store per location:
  - twilioPhoneNumber
  - twilioPhoneSid
  - twilioMessagingServiceSid (optional)
  - provisionedAt

Send owner test message
After provisioning, send SMS to ownerMobile:
“Your Appointment No-Show Reducer line is active for {businessName} ({locationName}). Reply CONFIRM to test two-way confirmations. Reply STOP to opt out.”

4) OPT-OUT / HELP COMPLIANCE (CORE)
Inbound webhook: POST /api/twilio/inbound
- Parse From, To, Body.
- Normalize Body trim uppercase.
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO

Rules:
- If STOP: add From to suppression list scoped to org (or location) and respond with a single confirmation message:
  “You’re opted out from {businessName} reminders. Reply START to re-subscribe.”
- If START: remove from suppression list and confirm.
- If HELP: respond:
  “{businessName} appointment reminders. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”
- For any outbound reminder, check suppression list; if suppressed, do not send.

Database tables (suggested)
- orgs: id, businessName, ownerEmail, ownerMobile, stripeCustomerId, stripeSubscriptionId, subscriptionStatus
- locations: id, orgId, name, timezone, hoursJson, reminderJson, templatesJson, twilioNumber, twilioSid
- suppressed_numbers: id, orgId, phoneE164, suppressedAt, source ('STOP'), lastMessage

5) CONSENT LANGUAGE + TEMPLATE RULES
A. Customer consent language (embed in booking flow and intake acknowledgment)
“By providing your mobile number, you agree to receive appointment-related SMS messages from {Business Name}, including reminders and confirmations. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

B. Outbound message footer requirement
Every reminder/confirmation message should include at least occasionally (or always, safest early-stage):
“Reply STOP to opt out.”

C. Template approval guidelines (internal)
- No marketing/promotional language unless customer explicitly opted in for marketing.
- Keep to transactional: reminders, confirmations, reschedule links.
- Identify business name.
- Include STOP/HELP at least in first message of a thread and in periodic messages.

6) BASIC TERMS + DPA-LITE (MINIMUM VIABLE)
Terms (summary clauses to publish as a page)
- Service description: appointment reminder automation via SMS/email.
- Customer responsibilities: obtain consent, provide lawful data, maintain accurate schedules.
- Prohibited use: spam/marketing without consent, illegal content.
- Fees & billing: subscription per location; optional setup fee; cancellation and proration policy.
- Limitation of liability; no guarantee of outcomes.
- Support contact: agent_bob_replit+no-show-bot@agentmail.to

DPA-lite (summary)
- We process appointment contact data solely to send reminders/confirmations.
- We use subprocessors (e.g., Twilio, Stripe) for SMS and billing.
- Security: access controls, least privilege.
- Retention: suppress lists retained to respect opt-outs; other data deleted on request where feasible.

7) CONCIERGE “DONE-FOR-YOU” SETUP SOP (UNDER 30 MIN)
Objective: go from paid → first test SMS sent.
Checklist:
1. Confirm payment in Stripe (subscription active) (2 min)
2. Open onboarding intake; verify: business name, timezone, hours, reminder timing, owner mobile (3 min)
3. Confirm customer attests they collect SMS consent at booking (1 min)
4. Provision number for first location (requires Twilio funds) (3–5 min)
5. Send owner test SMS; have owner reply CONFIRM; verify inbound webhook captures it (3–5 min)
6. Add/verify reschedule link and confirmation keywords (3 min)
7. Upload waitlist CSV (optional) and validate format (5 min)
8. Turn on “live sending” toggle for that location (1 min)
9. Email owner confirmation:
Subject: “Your reminders are live — {Business Name}”
Body: “Your SMS line is active. If a patient replies STOP, they’ll be opted out automatically. For help: agent_bob_replit+no-show-bot@agentmail.to. Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2” (3 min)

This pack is designed so engineering can implement without further product decisions. The only hard dependency for end-to-end SMS is Twilio funding to purchase numbers and send messages.