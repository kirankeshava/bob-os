# Free-Pilot Onboarding + Compliance + Concierge Setup Pack (Ready to Paste Into Product + Emails)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:51:29.665Z

---

## 0) Week-1 Reality: launch without spend
Because Week 1 is $0 budget, the live flow should be:
**Landing → “Start Free 7‑Day Pilot” → Intake Form → Manual/Trial provisioning (later Twilio) → Test message (email or SMS if trial available).**
Stripe subscription + setup fee should be implemented as a **feature-flagged** step for Week 2+ (same metadata fields), so we don’t block distribution or onboarding now.

---

## 1) Customer-facing onboarding flow (frictionless)
### Step A — Start Pilot CTA
Button text: **Start Free 7‑Day Pilot**
Microcopy: “No credit card in Week 1. We’ll configure reminders and confirmations for one location within 1 business day.”
Support footer: “Questions? Email agent_bob_replit+no-show-bot@agentmail.to”
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Step B — Intake form (single page)
Collect **Organization** + **Location 1** configuration. Support “Add another location” later by duplication.

**Org fields**
- Company/Brand Name (required)
- Primary Contact Name (required)
- Owner/Manager Mobile Phone (required)
- Owner/Manager Email (required)
- Industry (dropdown: dental, med spa, PT, salon, clinic, other)

**Location fields**
- Location Name (e.g., “Downtown”) (required)
- Address (optional)
- Timezone (required)
- Business hours (required)
- Appointment types (optional free text)

**Calendar/booking source**
- Booking system (dropdown: Calendly, Google Calendar, Square, Acuity, Jane, Mindbody, Other)
- Calendar access method (radio):
  1) “Share calendar link / ICS”
  2) “Connect Google (later)”
  3) “Upload daily schedule CSV”
- If “Other”: instructions textarea

**Reminder & confirmation settings (per location)**
- Reminder schedule (multi-select): 24h before, 3h before, 1h before, 15m before
- Confirmation required? (Yes/No)
- If Yes: Confirmation window cutoff (e.g., “must confirm ≥2 hours before”)
- Reschedule link (optional)
- Waitlist enabled? (Yes/No)
- Waitlist import method (CSV upload or paste list)

**Message template approval**
- Checkbox: “I approve the default message templates (can edit later).” (required)
- Textarea: “Brand voice notes (optional)”

**Compliance/consent capture (required checkboxes)**
1) “I confirm we will only message customers who have provided consent to receive SMS about their appointments.”
2) “I agree to include opt-out language (Reply STOP) in messages when required.”
3) “I agree to the Terms and Data Processing Addendum (links).”

Success screen: “Thanks—setup started. We’ll send a test message to your phone and email when your location is active.”

---

## 2) Opt-in/consent + STOP/HELP language (paste-ready)
### A) Consent language for the business to place on their booking forms
**SMS Appointment Reminders Consent (recommended):**
“By providing your mobile number, you agree to receive appointment reminders and confirmation requests via SMS from [BUSINESS NAME]. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

### B) Consent language to display inside our onboarding
“Customer consent required: You must only send SMS to customers who have opted in to receive appointment-related texts from your business. You are responsible for collecting and maintaining proof of consent.”

### C) Outbound message footer guidance
- For first message to a patient: include “Reply STOP to opt out.”
- For subsequent messages: include at least periodically and always honor STOP immediately.

### D) STOP/HELP operational rules
- If inbound body matches (case-insensitive, trimmed): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → set **opted_out=true** for that recipient under that location/brand.
- Respond once: “You’re opted out and will no longer receive texts from [BUSINESS NAME]. Reply START to re-subscribe.”
- If inbound body is START, YES, UNSTOP → set opted_out=false and respond: “You’re re-subscribed for appointment texts from [BUSINESS NAME].”
- HELP → respond: “[BUSINESS NAME] appointment texts. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to.”
- Suppression enforcement: before sending any SMS, check opted_out; if true, do not send.

---

## 3) Message template approval guidelines (internal + customer-friendly)
### Default templates (require customer approval checkbox)
1) **Reminder + confirmation**
“Hi {{first_name}}—this is {{business_name}}. You have an appointment on {{date}} at {{time}}. Reply Y to confirm or N to reschedule. Reply STOP to opt out.”

2) **Confirmed**
“Thanks {{first_name}}—you’re confirmed for {{date}} at {{time}}. See you soon.”

3) **Reschedule flow**
“No problem—use this link to reschedule: {{reschedule_link}} (or reply with a better time).”

4) **Waitlist opening**
“Hi {{first_name}}—an earlier appointment opened at {{time_option}} on {{date}}. Reply 1 to take it or 2 to pass. Reply STOP to opt out.”

### Approval rules
- Customer must approve templates before first send.
- Prohibit: marketing promos, sensitive PHI in SMS, misleading sender identity.
- Require: clear business identity, appointment context, opt-out support.

---

## 4) Terms (short-form) — paste-ready
**Terms of Service (Early Access)**
This service (“Appointment No‑Show Reducer”) provides automated appointment reminders, confirmations, reschedule workflows, and basic analytics. You are responsible for (a) obtaining any customer consent required for SMS, email, or other messages, (b) the accuracy of appointment data you provide, and (c) compliance with applicable laws (including TCPA/CTIA guidance where applicable).

**No medical advice / sensitive data**: Do not include sensitive personal data in message templates (e.g., diagnoses, test results). Use neutral language (“your appointment”).

**Third-party services**: We may use third-party providers (e.g., SMS carriers, messaging platforms) to deliver messages. Delivery is not guaranteed.

**Opt-out**: We will process common opt-out keywords (STOP, etc.) and suppress further messages, but you remain responsible for honoring opt-outs collected through other channels.

**Availability / early access**: The service is provided “as is” during early access. We may change features, limits, or availability.

**Limitation of liability**: To the maximum extent permitted by law, our total liability is limited to fees paid in the last 30 days (or $100 if none).

**Support**: agent_bob_replit+no-show-bot@agentmail.to

---

## 5) DPA-lite (short-form) — paste-ready
**Data Processing Addendum (Summary)**
You (the customer) are the Data Controller for customer contact and appointment data. We act as a Data Processor, processing data only to provide reminders/confirmations, rescheduling flows, waitlist outreach, and analytics.

**Data types**: name, phone number, appointment datetime, appointment type (optional, recommended generic), message history, opt-out status.

**Purpose limitation**: We process data solely to provide the service and support.

**Security**: We apply reasonable administrative and technical safeguards appropriate for an early-stage service.

**Subprocessors**: We may use messaging and hosting providers to deliver the service.

**Retention**: Upon request, we will delete or return customer data within a reasonable timeframe unless legally required to retain.

---

## 6) Per-location config schema (duplication-ready)
**Organization**
- org_id
- org_name
- owner_name
- owner_email
- owner_phone
- created_at

**Location**
- location_id
- org_id
- location_name
- timezone
- hours_json
- reminder_offsets_json
- confirmation_enabled (bool)
- confirmation_cutoff_minutes
- reschedule_link
- waitlist_enabled (bool)
- waitlist_source (csv|paste|integration)
- messaging_profile_id (future)
- twilio_number (future)
- template_set_json
- compliance_attestations_json
- active (bool)

**Recipient suppression**
- location_id
- phone_e164
- opted_out (bool)
- last_opt_out_at

**Duplicate location action**
- Creates new Location copying: timezone, hours, reminder offsets, confirmation settings, templates, waitlist settings. Requires new location_name.

---

## 7) Concierge setup SOP (≤30 minutes)
1) Open client intake submission.
2) Confirm timezone + reminder schedule.
3) Confirm booking source + data feed method (ICS/CSV/manual).
4) Verify consent checkbox is completed; if not, email the client with the consent snippet to add to their booking flow.
5) Paste/confirm default templates; apply brand voice notes.
6) Create location in admin; mark “pending messaging.”
7) Send owner test message (email now; SMS when Twilio is live):
   - “Your location is configured. Reply YES to confirm you received this.”
8) Once confirmation received, flip location to “active.”
9) Send client go-live email with:
   - what to expect
   - opt-out behavior
   - support email: agent_bob_replit+no-show-bot@agentmail.to
   - website legitimacy link

---

## 8) Email templates (include website + contact)
### A) Go-live email
Subject: Your No‑Show Reducer pilot is live for {{location_name}}

Hi {{owner_name}},
Your 7‑day pilot is now active for {{business_name}} / {{location_name}}.

What will happen:
- Customers receive reminders at: {{reminder_offsets}}
- Confirmation is: {{on/off}}
- Opt-out: customers can reply STOP at any time.

Support: agent_bob_replit+no-show-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with any template edits you want.
—Bob

### B) Consent fix email
Subject: Quick action needed: SMS consent language for {{business_name}}

Hi {{owner_name}},
To stay compliant, please add the following consent line anywhere customers enter their phone number for appointments:

“By providing your mobile number, you agree to receive appointment reminders and confirmation requests via SMS from {{business_name}}. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

Once that’s added, reply “Done” and we’ll proceed.
Support: agent_bob_replit+no-show-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

—Bob
