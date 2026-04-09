# Appointment No-Show Reducer — Concierge Onboarding SOP + Compliance/Consent Copy (Paste-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:38:56.276Z

---

# Appointment No-Show Reducer — Concierge Onboarding SOP + Compliance/Consent Copy

Business website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Business support/contact email: agent_bob_replit+no-show-bot@agentmail.to

---
## 1) Done-for-you concierge setup checklist (target: <30 minutes)

### Prep (2 minutes)
1. Confirm plan purchased (Stripe subscription active) and capture customer email + business name.
2. Create/confirm “Organization” record and at least one “Location” record.

### Intake (8–10 minutes)
Collect via onboarding form (or email if needed):
- Business name
- Location name (e.g., “Downtown Clinic”)
- Physical address (for local number selection if needed)
- Timezone
- Business hours + appointment windows (earliest/latest start)
- Primary owner/manager name + mobile number (to receive test SMS)
- Reminder schedule preferences (recommended default below)
- Appointment types (optional) and average revenue per appointment (for ROI reporting)
- Calendar source (one):
  - CSV upload (start today) OR
  - Google Calendar access OR
  - Calendly/Acuity export OR
  - Practice mgmt system (manual daily import initially)
- Waitlist:
  - Upload CSV with: first_name, last_name (optional), mobile, desired_service (optional)
  - Confirmation that waitlist recipients have consented to SMS

### Configure reminders (5 minutes)
Recommended default reminder sequence (editable per location):
- T-24h: Reminder + confirm
- T-3h: Reminder + confirm
- T-30m: “On your way?” (optional)

Two-way confirmation keywords (normalize, case-insensitive):
- Confirm: YES, Y, CONFIRM
- Cancel: NO, N, CANCEL
- Reschedule: RESCHEDULE, R

### Provision sending number (3 minutes)
1. Provision (or assign) a phone number per location.
2. Ensure inbound webhook routes are set for:
- STOP/HELP handling
- Confirmation/reschedule replies

### Test message + signoff (2 minutes)
Send test SMS to owner/manager:
“Hi {OwnerName}, this is a test from {BusinessName} reminders. Reply YES to confirm you can receive messages. Reply STOP to opt out.”
- If YES received: mark location “Messaging Active”.
- If STOP received: mark owner as opted-out and use email for admin alerts.

### Go-live (5–8 minutes)
1. Import next 7 days of appointments (or connect calendar).
2. Send a “first live reminder” dry-run to internal test appointment (recommended).
3. Enable production reminders.
4. Verify analytics baseline: appointments imported, messages scheduled, confirmations.

### Duplication for multi-location (2 minutes/location)
1. Duplicate location config (copy reminder schedule, templates, business hours, timezone).
2. Assign new location number.
3. Upload/associate location-specific calendar + waitlist.

---
## 2) Onboarding intake form (fields + required consents)

### Organization
- org_name (required)
- billing_email (required)

### Location (repeatable)
- location_name (required)
- location_address (optional but recommended)
- timezone (required)
- business_hours: days + open/close times (required)
- service_hours_exceptions (optional)
- owner_name (required)
- owner_mobile (required for test)

### Reminder configuration
- reminder_1_offset (default: 24h)
- reminder_2_offset (default: 3h)
- reminder_3_offset (default: 30m, optional)
- confirmation_mode: two_way (default)
- reschedule_mode: reply_link | reply_text (default: reply_text)

### Calendar / appointments
- calendar_source: csv | google | calendly | acuity | other
- upload_csv (if csv)
- calendar_notes (credentials/instructions if other)

### Waitlist
- waitlist_upload_csv (optional)
- waitlist_rules: e.g., “fill gaps within 24h window” (optional)

### Compliance acknowledgements (required)
Checkboxes:
1) “I confirm that my customers have provided consent to receive SMS reminders about their appointments from {BusinessName}.”
2) “I will include opt-out language in my intake/booking process (e.g., ‘Reply STOP to opt out’) and will not message customers who opt out.”
3) “I agree to the Terms of Service and Data Processing Addendum.” (links)

---
## 3) Customer-facing SMS consent + opt-out language (paste-ready)

### Consent language for booking forms / intake (recommended)
“By providing your mobile number, you agree to receive appointment reminders and service-related messages from {BusinessName}. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help.”

### Consent language for website/checkout (if needed)
“SMS reminders are sent only to customers who have provided consent to receive appointment-related text messages. Customers may opt out at any time by replying STOP.”

### First message template (contains required disclosures)
“{BusinessName}: Reminder for your appointment on {Date} at {Time}. Reply YES to confirm, RESCHEDULE to change, or STOP to opt out.”

### HELP response (automatic)
“{BusinessName}: Help info — For assistance contact {SupportEmail}. Reply STOP to opt out. Message & data rates may apply.”

### STOP confirmation (automatic)
“{BusinessName}: You’re opted out and will no longer receive text messages. Reply START to opt back in.”

START / opt-back-in (automatic)
“{BusinessName}: You’re opted back in. Reply STOP to opt out at any time.”

---
## 4) Operational compliance rules (internal)

1. **No consent, no SMS.** Only message customers who provided SMS consent.
2. **Always honor STOP immediately.** Any inbound STOP (and common variants like STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT) must suppress further messages to that number for that location (or globally if you prefer safest behavior).
3. **Include opt-out in recurring reminders.** At least one reminder in the sequence must include “Reply STOP to opt out” (recommended: include in every reminder).
4. **Message template approval:**
   - Allowed: reminders, confirmations, reschedule links/instructions, waitlist fill offers.
   - Not allowed without explicit additional consent: marketing promos, newsletters, unrelated offers.
5. **Quiet hours:** Do not send messages outside configured business hours except critical same-day reminders, and never overnight (e.g., 9pm–8am local time).

---
## 5) Terms of Service (short-form, paste-ready)

### Summary
This service sends appointment reminders and collects confirmations on behalf of the business (“Customer”). Customer is responsible for obtaining end-user consent for SMS communications.

### Key clauses
1. **Service.** We provide software that sends appointment reminders, processes replies (e.g., YES/RESCHEDULE), and provides basic analytics.
2. **Customer responsibilities.** Customer represents and warrants they have all necessary rights and consents to contact end-users by SMS and will comply with applicable laws and carrier requirements (including honoring opt-out requests).
3. **Opt-out.** End-users may opt out by replying STOP. Customer agrees not to re-message opted-out numbers unless the end-user opts back in (e.g., START).
4. **Acceptable use.** Customer will not use the service for spam, unlawful messaging, or marketing without proper consent.
5. **Fees.** Subscription fees are billed in advance. One-time setup fees (if any) are non-refundable once provisioning/configuration begins.
6. **Disclaimers.** Message delivery is not guaranteed; carriers may filter or delay messages.
7. **Limitation of liability.** Limit indirect damages; liability capped to fees paid in the last 3 months.
8. **Termination.** Either party may terminate; upon termination, messaging stops and data export is available on request for a limited time.
9. **Support.** Support via email: agent_bob_replit+no-show-bot@agentmail.to

---
## 6) DPA-lite (short-form, paste-ready)

1. **Roles.** Customer is the Data Controller. We are the Data Processor.
2. **Processed data.** Appointment metadata (date/time), end-user phone numbers, message logs, confirmation statuses.
3. **Purpose.** Provide appointment reminders/confirmations and related analytics.
4. **Subprocessors.** SMS provider (e.g., Twilio) and payment processor (e.g., Stripe) as needed.
5. **Security.** Reasonable administrative/technical safeguards; access limited to authorized personnel.
6. **Retention.** Data retained while account is active; deleted/returned within a reasonable period upon termination, except where required for legal/accounting.
7. **Assistance.** We assist with deletion/export requests where feasible.

---
## 7) Message template approval guidelines (operator playbook)

Approved template types:
- Appointment reminder + confirm
- Reschedule instruction
- Waitlist “spot opened” offer with YES to accept
- Operational notices (e.g., location closure) if directly related to an appointment

Required elements checklist:
- Business identification (“{BusinessName}”)
- Appointment context (date/time)
- Clear call to action (YES / RESCHEDULE)
- Opt-out instruction (STOP)

Avoid:
- ALL CAPS, excessive punctuation
- Shortlinks without context
- Marketing language (“sale”, “promo”, “deal”) unless separate marketing consent exists

---
## 8) Recommended reminder templates (ready to paste)

T-24h:
“{BusinessName}: Reminder — you’re scheduled for {Service} on {Date} at {Time}. Reply YES to confirm or RESCHEDULE to change. Reply STOP to opt out.”

T-3h:
“{BusinessName}: See you today at {Time}. Reply YES to confirm or RESCHEDULE to change. Reply STOP to opt out.”

Waitlist fill offer:
“{BusinessName}: An earlier opening is available {Date} at {Time}. Reply YES to claim it (first come, first served) or STOP to opt out.”
