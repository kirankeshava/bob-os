# Appointment No-Show Reducer — Week 1 Free-Pilot Onboarding + Compliance Pack (Copy, SOP, and Build Spec)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:21:52.223Z

---

# Goal
Enable a frictionless Week-1 ($0) onboarding flow that is compliant enough to run pilots: **checkout (free pilot) → intake form → (optional) Twilio provisioning stub → test message workflow → reminders live**, with STOP/HELP handling and per-location configuration that can be duplicated.

---
## 1) Week-1 Payments Approach (No Spend / No Paid Commitments)
Because Week 1 is $0 budget, do **not** activate paid Stripe prices yet. Use one of these:

**Option A (recommended Week 1): “Free Pilot” Checkout (no payment method)**
- Use Stripe Checkout in **payment mode** with a **$0 one-time** line item labeled “7-Day Pilot (No payment collected)”.
- After checkout success: redirect to intake form.
- Pros: no card collection, zero charge risk, frictionless.
- Cons: you can’t auto-convert to paid without re-checkout.

**Option B (better later): Subscription with trial (collect card, start billing after trial)**
- Create a subscription product with a trial (7 days) and a post-trial recurring price.
- **Do not enable Week 1** (would involve real billing commitments later). Save for Week 2.

**Metadata to attach at checkout success (store in DB):**
- org_name
- owner_name
- owner_email
- locations_count (default 1)
- onboarding_status = 'needs_intake'
- source = 'pilot'

---
## 2) Onboarding Intake Form (Fields + Validation)
**Purpose:** Collect everything required to configure reminders per location.

### A. Business (Org-level)
1. Business name (required)
2. Owner full name (required)
3. Owner email (required; prefill from checkout)
4. Owner mobile phone (required; E.164 if possible)
5. Primary timezone (required; dropdown)
6. Primary location count (number; default 1)

### B. Location (repeatable; support “Duplicate Location”)
1. Location name (required) — e.g., “Downtown Clinic”
2. Location address (optional)
3. Location timezone (required; default org timezone)
4. Appointment hours (required)
   - days of week checkboxes
   - open/close times
   - blackout dates/holidays (optional)
5. Appointment types (optional) — free text or list
6. Calendar source (required):
   - “Google Calendar” / “Outlook” / “Practice management system” / “CSV upload”
   - If not integrated: ask for daily export method
7. Reminder schedule (required):
   - Default: 24 hours before + 2 hours before
   - Custom: multiple offsets (hours/days)
8. Two-way confirmation behavior (required):
   - Confirm keywords: YES/Y
   - Cancel keywords: NO/N/CANCEL
   - Reschedule keywords: RESCHEDULE/R
9. Waitlist (optional):
   - Upload CSV (name, phone, availability notes)
   - or paste list
10. Message template approval (required checkbox):
   - “I approve the default reminder/confirmation templates (editable later).”

### C. Compliance Consents (required)
1. **Business attestation checkbox (required):**
   - “I confirm I have obtained consent from my customers/patients to receive SMS reminders and that I will only upload/contact people who have consented or where reminders are permitted as transactional messages.”
2. **Opt-out compliance checkbox (required):**
   - “I understand recipients can reply STOP to opt out and that opt-outs must be honored.”
3. **Terms acceptance checkbox (required):**
   - “I agree to the Terms and Data Processing Addendum.”

**Post-submit success screen:** “We’re provisioning your line and running a test message to the owner number. You’ll be live shortly.”

---
## 3) Data Model (Per-Location Config + Duplication)
Minimum tables/collections:

### orgs
- id
- name
- owner_name
- owner_email
- owner_phone
- timezone
- created_at

### locations
- id
- org_id
- name
- address
- timezone
- hours_json
- reminder_offsets_json
- confirmation_keywords_json
- waitlist_enabled (bool)
- status: draft | active | paused
- created_at

### messaging_profiles (per location)
- id
- location_id
- provider = 'twilio'
- twilio_phone_number (nullable in Week 1)
- twilio_phone_sid (nullable)
- twilio_messaging_service_sid (nullable)
- outbound_template_json

### consents (org-level)
- id
- org_id
- accepted_terms_at
- accepted_dpa_at
- attested_sms_consent_at
- ip_address
- user_agent

### opt_outs (global suppression)
- id
- org_id
- phone_e164
- opted_out_at
- source = inbound_stop | manual

**Duplicate location action:**
- Endpoint: POST /api/locations/:id/duplicate
- Copies location settings + templates but not live phone numbers.

---
## 4) Twilio Provisioning + Test Message (Week 1 Stub)
Week 1 no spend: implement “provisioning stub mode”.

**Provisioning step (Week 1):**
- Create messaging_profile row with provider='twilio' and null phone/SIDs.
- Display banner: “SMS line provisioning will be completed before go-live (Week 2). For now we can test using a verified sender or simulator.”

**Test message workflow:**
- On intake completion, system triggers a ‘test reminder’ preview on-screen and an email to owner with the message content.
- If Twilio is available later: send SMS to owner_phone.

---
## 5) STOP/HELP Handling (Required Even in Pilot)
Implement inbound SMS webhook handler (works once Twilio is connected):

**Keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- On receive: add sender phone to opt_outs for that org
- Reply once: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”

**HELP keyword:** HELP
- Reply: “Help: Reply STOP to opt out. Contact: agent_bob_replit+no-show-bot@agentmail.to”

**START keyword (optional re-subscribe):** START, YES
- Remove from opt_outs
- Reply: “You’re re-subscribed. You’ll receive appointment messages again.”

**Outbound enforcement:**
Before any outbound SMS send: check opt_outs for org_id + phone_e164; if present, do not send.

---
## 6) Customer-Facing Consent Language (Paste-Ready)
Use this on onboarding + any customer-facing consent capture flows.

**Business-side attestation (on intake form):**
“I confirm that I have obtained permission from recipients to send appointment-related text messages, or that messages are otherwise permitted as transactional/service communications. I will only upload contact information for recipients who should receive reminders.”

**Recipient message footer (include at least once, and in initial message where possible):**
“Reply STOP to opt out. Reply HELP for help.”

**Website/terms SMS disclosure block:**
“We send appointment-related text messages on behalf of our business customers. Message frequency varies by appointment schedule. Standard message and data rates may apply. You can opt out at any time by replying STOP. For help, reply HELP or email agent_bob_replit+no-show-bot@agentmail.to.”

---
## 7) Message Template Approval Guidelines (Internal + Customer)
**Default templates (safe, transactional):**
1) 24h reminder:
“Reminder: You have an appointment at {BUSINESS} on {DATE} at {TIME}. Reply YES to confirm, NO to cancel, or R to reschedule. Reply STOP to opt out.”

2) 2h reminder:
“Upcoming appointment at {BUSINESS} today at {TIME}. Reply YES to confirm, NO to cancel, or R to reschedule. Reply STOP to opt out.”

3) Cancellation acknowledgment:
“Okay—your appointment is cancelled. If you’d like to reschedule, reply R. Reply STOP to opt out.”

4) Reschedule prompt:
“Sure—reply with a couple times that work, or call {BUSINESS_PHONE}. Reply STOP to opt out.”

**Rules:**
- No marketing language in reminder templates during pilot.
- Include STOP instructions in first message to each recipient and periodically thereafter.
- Do not include sensitive medical details.

---
## 8) Terms + DPA-lite (Minimum Viable Sections)
Add to a simple web page linked from onboarding.

**Terms (minimum):**
- Service description (SMS reminders, confirmations, rescheduling assistance)
- Customer responsibilities: consent, lawful contact lists, accuracy of appointment data
- Prohibited use: spam, marketing blasts without consent, illegal content
- Limitation of liability: best-effort delivery; carriers may delay/block
- Data retention: store configs, logs, opt-outs; delete on request
- Support contact: agent_bob_replit+no-show-bot@agentmail.to

**DPA-lite (minimum):**
- Roles: Customer = controller; Provider = processor
- Processing purpose: send appointment-related notifications
- Subprocessors: Twilio (SMS), hosting provider
- Security: access controls, least privilege
- Data subject requests: customer is primary handler; provider assists

---
## 9) Concierge Setup SOP (Under 30 Minutes)
**Objective:** take a paid/pilot customer from “paid” to “live reminders” fast.

1) (2 min) Confirm owner contact + timezone
- Verify business name, owner phone, timezone.

2) (8 min) Intake completion (or do it for them)
- Create org + first location.
- Enter hours + reminder offsets.
- Confirm two-way keywords.

3) (5 min) Template approval
- Paste default templates.
- Get explicit approval (checkbox + timestamp).

4) (5 min) Data source hookup
- Determine calendar source.
- If no integration: agree on CSV upload cadence.

5) (5 min) Opt-out readiness check
- Ensure STOP/HELP language present.
- Confirm customer attestation checked.

6) (5 min) Test run
- Generate a sample appointment.
- Send a preview via UI and email owner.
- When SMS is enabled: send test SMS to owner and confirm STOP handling.

**Done definition:**
- Location status = active
- Reminder schedule configured
- Templates approved
- Owner test completed (email now; SMS once Twilio enabled)

---
## 10) Engineering Checklist (Build Order)
1) Create pages: /checkout-success → /onboarding
2) Implement POST /api/onboarding/submit to write org/location/consents
3) Implement POST /api/locations/:id/duplicate
4) Implement opt_outs table + suppression checks
5) Implement inbound webhook route /api/twilio/inbound (STOP/HELP/START)
6) Publish Terms/DPA/SMS disclosure page and link from onboarding
7) Week 2: activate Stripe paid pricing + Twilio number purchase + live outbound SMS
