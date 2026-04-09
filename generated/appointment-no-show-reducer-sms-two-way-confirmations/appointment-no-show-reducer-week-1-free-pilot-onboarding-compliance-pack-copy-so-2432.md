# Appointment No-Show Reducer — Week 1 Free Pilot Onboarding + Compliance Pack (Copy + SOP + Intake Form)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:22:40.263Z

---

# 1) Frictionless onboarding path (Week 1: $0, no Stripe)

**Goal:** Start onboarding customers today without spending money. Replace Step 1 with Stripe Checkout after Week 1.

**Flow:**
1) Customer clicks **“Start Free 7‑Day No‑Show Reduction Pilot”** (CTA on website).
2) They land on **Intake Form** (single page). They submit required details.
3) System emails **agent_bob_replit+no-show-bot@agentmail.to** with the intake payload + a “go/no-go checklist”.
4) We reply with: (a) confirmation of start date/timezone, (b) request for a small test list of upcoming appointments (CSV), (c) instructions to add our number (later) as an approved sender.
5) After Week 1: swap Step 1 to **Stripe Checkout** and auto-provision Twilio number + send owner test SMS.

**Website legitimacy link to include everywhere:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

# 2) Intake form (copy + schema)

## Page title
**Set up your reminders & confirmations (takes ~3 minutes)**

## Intro text
“Answer a few questions so we can configure reminders, confirmations, reschedules, and waitlist fills for your location. You’ll be able to review and approve message templates before anything goes live.”

## Required fields (per location)
### Business & location
- **Business name** (text)
- **Location name** (text, e.g., “Downtown”) 
- **Location address** (text)
- **Primary contact name** (text)
- **Owner/manager mobile number** (text, E.164 preferred)
- **Owner/manager email** (email)
- **Timezone** (dropdown)
- **Appointment types** (multi-select: Consultation, Follow-up, Procedure, Class, Other + text)

### Scheduling & operating constraints
- **Business hours** (per weekday open/close)
- **Earliest time to send messages** (time)
- **Latest time to send messages** (time)
- **Lead time rules** (checkboxes): 
  - “Do not message within X hours of appointment” (number)
  - “Do not message more than X days ahead” (number)

### Reminder timing (recommended defaults included)
- **Reminder #1**: (dropdown) 72h / 48h / 24h / custom
- **Reminder #2**: 24h / 12h / custom
- **Same-day nudge**: 4h / 2h / off
- **Two-way confirmation enabled** (toggle) default ON

### Confirmation & reschedule logic
- **Confirmation keywords** (default): “YES” to confirm
- **Cancel keywords** (default): “NO” to cancel
- **Reschedule keywords** (default): “R” or “RESCHEDULE”
- **Reschedule method** (select one):
  1) “We call them” (collect preferred callback time)
  2) “Send our booking link” (URL field)
  3) “Text a human” (route to internal number/email)

### Waitlist
- **Enable waitlist fill** (toggle)
- **Waitlist contacts upload** (CSV) OR “We’ll add manually later”
- **Waitlist offer window**: “Offer openings that start within X hours” (number)

### Calendar / appointment source (Week 1: manual import allowed)
- “How do you manage appointments?” (select): Google Calendar / Outlook / Square / Acuity / Calendly / Jane / Other
- **Week 1 method:** “Upload upcoming appointments CSV daily” (yes/no)
- **If they have a booking platform:** “Provide read-only access or export method” (free-text)

### Compliance & approvals (required)
- **A2P/Consent representation checkbox (required):**
  “I confirm that our business obtains customer consent to receive appointment-related SMS messages, and that we will only message customers regarding their appointments and related service notifications.”
- **Template approval checkbox (required):**
  “I will review and approve the exact SMS templates before messages are sent.”
- **Opt-out acknowledgement checkbox (required):**
  “I understand customers can opt out anytime by replying STOP, and we must honor opt-outs immediately.”

**Submit button:** “Submit & start pilot”

**Post-submit message:**
“Thanks — we received your setup info. We’ll email you from agent_bob_replit+no-show-bot@agentmail.to within 1 business day with your draft templates and next steps.”

---

# 3) SMS consent + opt-out language (paste into intake form + footer)

## Customer-facing consent line (for the business to use on their booking/intake forms)
“By providing your phone number, you agree to receive appointment reminders and service-related messages from [Business Name]. Reply STOP to opt out, HELP for help. Message & data rates may apply.”

## Our product UI disclosure (on intake form)
“Messages sent by this service are transactional appointment reminders/confirmations. Recipients can opt out at any time by replying STOP. We do not send marketing messages unless you separately collect marketing consent.”

## STOP/HELP operational handling rules (what our system will enforce)
- If an inbound message equals (case-insensitive, trim punctuation): **STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT** → mark recipient opted-out immediately and send a single confirmation:
  “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
- If inbound equals **HELP** → respond:
  “Help: appointment reminders for [Business Name]. Reply STOP to opt out. For questions call [Business Phone] or email [Business Email].”
- If inbound equals **START/UNSTOP** → re-subscribe and confirm:
  “You’re re-subscribed. Reply STOP to opt out.”
- Enforce suppression: do not send any outbound SMS to opted-out numbers.

---

# 4) Message template approval guidelines (internal + client-facing)

**Rule 1: Appointment-only by default.** Templates must refer to an appointment, a reschedule, or a waitlist opening. No promotions, coupons, or marketing language unless marketing consent is explicitly collected.

**Rule 2: Identify sender.** Every template should include the business name.

**Rule 3: Include opt-out.** At least the first reminder a customer receives should include “Reply STOP to opt out.”

**Rule 4: Keep it short.** Aim for <160 characters when possible.

**Rule 5: No sensitive data.** Do not include medical details, diagnoses, or other sensitive info. Use generic “appointment” language.

### Default templates (drafts for approval)
1) **48h reminder**
“Reminder from {Business}: you have an appointment on {Date} at {Time}. Reply YES to confirm or R to reschedule. Reply STOP to opt out.”

2) **24h reminder**
“{Business} reminder: {Date} at {Time}. Reply YES to confirm, NO to cancel, or R to reschedule.”

3) **Same-day (2h) nudge**
“{Business}: see you at {Time} today. Reply R if you need to reschedule.”

4) **Waitlist opening**
“{Business}: an earlier time opened up today at {Time}. Reply YES to take it. Reply STOP to opt out.”

---

# 5) Basic Terms / DPA-lite / Privacy (starter copy for website)

## Terms (short-form)
**Service.** Appointment No-Show Reducer provides software that sends appointment-related SMS reminders, confirmations, reschedule prompts, and waitlist messages on behalf of a business.

**Customer responsibilities.** You represent that you have obtained all necessary permissions and consents to contact recipients, and that your recipient data is accurate. You agree not to use the service for unsolicited marketing, illegal content, or to contact recipients who have opted out.

**Opt-out compliance.** The system supports STOP/START/HELP handling. You agree to honor opt-outs immediately and not to re-message recipients who opt out unless they explicitly opt back in.

**Data handling.** We process contact data and appointment metadata solely to provide the service. We do not sell recipient data.

**Availability & limitations.** Message delivery depends on carriers and third-party providers. No specific reduction in no-shows is guaranteed.

**Termination.** Either party may terminate access. Upon request, we will delete customer data within a reasonable timeframe, subject to legal/operational retention needs.

## Privacy (short-form)
We collect business account details, configuration settings, and appointment-related contact data provided by our customers. We use this information only to operate and improve the service. We do not sell personal information.

## DPA-lite (short-form)
Customer is the Data Controller. We are the Data Processor, processing data only on documented instructions to provide reminder/confirmation workflows. We implement reasonable security measures and will notify the customer of material incidents when legally required.

---

# 6) Done-for-you concierge setup checklist (<= 30 minutes)

**Objective:** Configure one location end-to-end (reminders + confirmation + reschedule + waitlist) and validate with a live test.

## Inputs needed (ask client to prepare)
1) Business name + location name
2) Timezone + business hours
3) Owner/manager mobile number + email
4) Booking link or reschedule instructions
5) Reminder timing preferences (or accept defaults)
6) A small CSV of upcoming appointments (10–30 rows) for testing (Name, Phone, Date, Time, Service)
7) Waitlist CSV (optional)

## Steps
1) **Create/verify location record** (2 min)
- Enter location details, timezone, and sending window.

2) **Configure reminder schedule** (5 min)
- Set 48h + 24h + same-day (optional) reminders.
- Confirm confirmation keywords (YES/NO/R).

3) **Paste draft templates** (5 min)
- Insert templates above.
- Confirm they include Business name and opt-out.

4) **Compliance checks** (3 min)
- Confirm client checked the consent + opt-out acknowledgements.
- Confirm business phone/email for HELP response.

5) **Upload test appointments CSV** (5 min)
- Verify parsing and timezone alignment.

6) **Run a test send to owner/manager number** (5 min)
- Send a sample reminder.
- Confirm STOP blocks future sends.
- Confirm YES/NO/R routes correctly.

7) **Go-live criteria** (5 min)
- Client approves templates in writing (email reply is fine).
- Confirm first live cohort (e.g., next 7 days appointments).

## Acceptance criteria
- Owner receives test message.
- YES marks confirmed; NO marks canceled; R triggers reschedule workflow.
- STOP opt-out stored and suppresses outbound messages.
- Location config is saved and duplicable for additional locations.

---

# 7) Email templates (to start pilots now)

## A) Intake submission auto-reply (send from agent_bob_replit+no-show-bot@agentmail.to)
Subject: We got your setup — next steps for your no-show reduction pilot

Body:
Hi {Name},

Thanks for submitting your setup details. Next, please reply with either:
1) A small CSV of upcoming appointments for the next 3–7 days (Name, Phone, Date, Time, Service), or
2) Your preferred export method from your booking system.

We’ll send your draft SMS templates for approval, then run a test message to your number before anything goes live.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

## B) Template approval request
Subject: Please approve your reminder/confirmation SMS templates

Body:
Hi {Name},

Reply “APPROVED” to this email if the templates below look good. If you want changes, paste edits inline.

(templates…)

Reminder: recipients can opt out anytime by replying STOP.

— Bob