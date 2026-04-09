# Appointment No-Show Reducer — Stripe Checkout + Onboarding Intake + Twilio Provisioning + STOP Compliance + Concierge Setup SOP (Paste-Ready Implementation Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:51:38.060Z

---

## 1) Stripe payments: subscription + optional one-time concierge setup

### Goal
Frictionless flow: **Checkout → success redirect → intake form → provision phone number → send test SMS to owner → activate reminders**.

### Recommended pricing objects
Create **one subscription product** and (optional) **one-time setup product**.
- Product: “No-Show Reducer (per location)”
  - Price (recurring monthly): e.g., $99/mo (set in Stripe Dashboard)
  - Nickname: `noshow_location_monthly`
- Product: “Concierge Setup (one-time)”
  - Price (one-time): e.g., $199
  - Nickname: `concierge_setup_one_time`

Store the Stripe Price IDs in environment variables so you can swap prices without code changes:
- `STRIPE_PRICE_SUB_LOCATION_MONTHLY=price_...`
- `STRIPE_PRICE_SETUP_ONE_TIME=price_...` (optional)

### Checkout session creation (server-side)
Create a Stripe Checkout Session with:
- `mode: "subscription"`
- `line_items: [{price: SUB_PRICE_ID, quantity: locationCount}]`
- If user selects concierge setup, include an additional **one-time** line item via `line_items` using a one-time Price.
- `success_url: {APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url: {APP_URL}/checkout?canceled=1`
- `customer_creation: "always"`
- `allow_promotion_codes: true` (optional)
- `consent_collection: {terms_of_service: "required"}`
- `metadata` (critical for provisioning):
  - `plan: "location_monthly"`
  - `location_count: "1"` (or more)
  - `setup_fee: "true"|"false"`
  - `source: "website"|"demo"|"outbound"`

### Webhook events to handle
Use Stripe webhooks to avoid provisioning on incomplete payments.
Handle:
- `checkout.session.completed`: mark organization as **paid** and create an onboarding token (or set `org.status="paid_pending_onboarding"`).
- `invoice.payment_succeeded`: keep subscription active (handle renewals).
- `customer.subscription.deleted`: disable reminders and pause messaging.

### Data to store
- `org.stripeCustomerId`
- `org.stripeSubscriptionId`
- `org.plan`
- `org.status`: `trial|paid_pending_onboarding|active|past_due|canceled`
- `org.defaultTimezone`

### Checkout page copy (minimal, high-converting)
Headline: “Reduce no-shows with two-way SMS confirmations.”
Bullets:
- “Smart reminders + ‘Confirm/Reschedule’ replies”
- “Auto-fill cancellations from a waitlist”
- “Simple analytics: recovered revenue per location”
Compliance snippet near CTA:
- “By subscribing you agree to the Terms and confirm you have consent to message your customers. Reply STOP to opt out.”
Link:
- Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
(Host a /terms and /privacy on that site; see section 4.)


## 2) Onboarding intake form (post-checkout)

### URL + gating
- After successful payment, user lands on: `/onboarding?session_id=...`
- Backend verifies the session belongs to a paid customer before showing the form.

### Intake fields (per organization)
**Org-level**
- Business name (required)
- Primary contact name (required)
- Owner mobile number for testing (required)
- Contact email (prefill from Stripe if available)
- Default timezone (required)
- Industry (optional: dental, med spa, PT, salon, etc.)

**Location-level (repeatable / duplicable)**
- Location name (required)
- Location address (optional)
- Location timezone (defaults to org)
- Service hours (required): days + open/close times
- Appointment types (optional list)
- Calendar system (required choice): Google / Outlook / Jane / Acuity / Calendly / Other
- Calendar access method (required choice): OAuth / ICS feed / manual CSV / integration later
- Reminder schedule (required): e.g., 24h + 2h before
- Confirmation keywords (default): CONFIRM / C / YES
- Reschedule keywords (default): RESCHEDULE / R
- Waitlist upload (optional CSV): name, mobile, desired appointment type, constraints

**Compliance confirmations (required checkboxes)**
1) “I confirm my customers have provided consent to receive SMS about their appointments.”
2) “I will include opt-out language and honor STOP requests.”
3) “I understand this is for transactional appointment messaging, not unsolicited marketing.”

**Message template approval**
- Show editable templates with preview, plus checkbox: “Approve these templates for use.”

### Location duplication requirement
UI action: “Duplicate this location” → copies:
- reminder timing
- service hours
- templates
- calendar settings
…but requires new:
- location name
- (later) calendar connection


## 3) Twilio provisioning + test message

### Provisioning sequence (after intake submit)
For each location:
1) Create (or select) a Twilio Messaging Service (recommended) OR use per-number messaging.
2) Purchase a local number (area code preference optional).
3) Attach number to Messaging Service.
4) Save to DB:
   - `location.twilioPhoneNumber`
   - `location.twilioPhoneSid`
   - `location.twilioMessagingServiceSid`
   - `location.messagingStatus = "provisioned"`
5) Send test SMS to owner mobile:
   - “No-Show Reducer: your location <NAME> is active. Reply HELP for info, STOP to opt out of admin alerts.”

### Inbound SMS webhook (STOP/HELP)
Create `/api/twilio/inbound` to receive inbound messages.
Normalize message body to upper-case trimmed.
Handle keywords:
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
  - Add sender number to suppression list for that location/org.
  - Reply once: “You’re opted out. Reply START to opt back in.”
- START, YES, UNSTOP
  - Remove from suppression list.
  - Reply once: “You’re opted in. Reply STOP to opt out.”
- HELP
  - Reply: “<Business>: appointment reminders. Reply STOP to opt out. Call <business phone> for help.”

### Suppression enforcement
Before sending any outbound SMS, check:
- Global suppression list (org-wide)
- Location suppression list
If suppressed: do not send; log event `suppressed_optout`.

### Message templates (transactional)
Default templates (editable):
1) 24h reminder:
   “Reminder: {{business_name}} appointment on {{date}} at {{time}}. Reply CONFIRM to confirm or RESCHEDULE for options. Reply STOP to opt out.”
2) 2h reminder:
   “Today at {{time}}: {{business_name}}. Reply CONFIRM or RESCHEDULE. Reply STOP to opt out.”
3) Cancellation gap fill to waitlist:
   “Opening: {{business_name}} has a slot {{date}} {{time}}. Reply YES to claim. Reply STOP to opt out.”

Guideline: avoid marketing language (“sale”, “promo”), keep it appointment-operational.


## 4) Compliance basics (website + in-app)

### Consent language (place on intake + in outbound messages footer where possible)
“By providing a phone number, you confirm you have obtained consent from your customers to receive SMS messages related to their appointments (reminders, confirmations, rescheduling, and waitlist offers). Message frequency varies. Reply STOP to opt out; reply HELP for help. Standard message and data rates may apply.”

### Terms (DPA-lite + SMS)
Add simple pages and link them in checkout and onboarding.
Minimum clauses to include:
- Service description: appointment reminder automation via SMS.
- Customer responsibilities: lawful basis/consent, accurate numbers, honoring opt-outs.
- Prohibited use: unsolicited marketing, high-risk regulated content without approval.
- Data handling: you store appointment metadata and phone numbers to deliver service.
- Security: reasonable safeguards; no guarantee of uninterrupted delivery.
- Subprocessors: Twilio, Stripe, hosting provider.
- Liability limits: typical micro-SaaS limitation.

### Template approval rules (operational)
- Customer must approve message templates before activation.
- Changes to templates require re-approval.
- Include STOP language in all first-touch and periodic messages.


## 5) Concierge setup SOP (done in <30 minutes)

### Objective
Go from paid checkout to “first reminder successfully sent” in under 30 minutes.

### Checklist (timeboxed)
1) (2 min) Confirm payment in admin dashboard (Stripe webhook processed).
2) (5 min) Collect missing intake fields (if any) via email: agent_bob_replit+no-show-bot@agentmail.to.
3) (5 min) Verify timezone + business hours + reminder timing.
4) (5 min) Configure/confirm templates; ensure STOP included.
5) (5 min) Provision Twilio number for location; record number in location settings.
6) (3 min) Send owner test SMS; owner replies CONFIRM to validate two-way.
7) (3 min) Upload waitlist CSV (optional) and validate parsing.
8) (2 min) Turn on location: set `location.status="active"`.

### Client email (paste-ready)
Subject: Your No-Show Reducer setup — 2 quick items

Hi {{OwnerName}},

Thanks for subscribing. To activate your SMS confirmations, please reply with:
1) Your business timezone (e.g., America/Chicago)
2) Your preferred reminder timing (default: 24h + 2h)

You can also complete the intake form here: {{OnboardingLink}}

Reminder: please ensure you have customer consent to send appointment-related SMS. Customers can opt out anytime by replying STOP.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2


## 6) Minimal engineering task list (directly implementable)

Backend routes:
- POST `/api/stripe/create-checkout-session`
- POST `/api/stripe/webhook`
- GET `/api/onboarding/session?session_id=...` (verifies paid session)
- POST `/api/onboarding/submit` (stores org + location config)
- POST `/api/twilio/provision-number` (called after submit per location)
- POST `/api/twilio/inbound` (STOP/HELP/START)

Database tables (suggested):
- `orgs` (stripeCustomerId, stripeSubscriptionId, status, defaultTimezone, createdAt)
- `locations` (orgId, name, timezone, hoursJson, reminderRulesJson, templatesJson, twilioPhoneNumber, twilioSidsJson, status)
- `opt_outs` (orgId, locationId nullable, phoneE164, status, updatedAt)
- `events` (orgId, locationId, type, payloadJson, createdAt)

This pack is ready to paste into the repo as the engineering + ops spec, and to publish the consent/terms copy on the website URL for immediate legitimacy during demos.