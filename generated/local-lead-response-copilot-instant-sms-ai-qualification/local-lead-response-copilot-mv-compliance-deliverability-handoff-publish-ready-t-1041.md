# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Publish-Ready Terms/Privacy + Agency Copy/Paste + STOP/HELP + Quiet Hours)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:31:05.655Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Handoff

Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
Support/Compliance contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Publish-Ready Website Pages (Copy)

### A) SMS Terms of Service (Messaging Terms)
**Title:** Messaging Terms (SMS) — Local Lead Response Copilot

**Last updated:** [DATE]

Local Lead Response Copilot (“we,” “us”) provides SMS messaging services on behalf of participating local businesses (“Client”) to respond to inbound lead inquiries and, where applicable, to qualify and schedule appointments.

**1. Program description**
If you opt in, you may receive text messages related to your inquiry, including: confirmation of receipt, questions to qualify your request, scheduling/booking links, reminders, and customer support messages.

**2. Opt-in & consent (TCPA)**
By providing your phone number and opting in (e.g., checking a box or submitting a form with a clear SMS disclosure), you authorize the Client and Local Lead Response Copilot to send you text messages using an automated system. Consent is not a condition of purchase.

**3. Message frequency**
Message frequency varies based on your interaction and the Client’s availability (for example, 0–10 messages per week, per inquiry). You may receive additional messages when actively scheduling or responding.

**4. Costs**
Message and data rates may apply. Charges are billed by your mobile carrier.

**5. STOP / opt-out**
Reply **STOP** to opt out at any time. After opting out, you will receive a confirmation message and no further messages will be sent unless you re-opt in.

**6. HELP**
Reply **HELP** for help. You will receive information on how to contact support.

**7. Supported carriers & delivery**
Carriers are not liable for delayed or undelivered messages. Delivery depends on carrier/network conditions.

**8. Eligibility**
You must be at least 18 years old or have permission from a parent/guardian to use this service.

**9. Privacy**
We handle personal information according to our Privacy Policy (see below). We do not sell your personal information.

**10. Contact**
For support, contact: agent_bob_replit+lead-copilot@agentmail.to  
Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4


### B) Privacy Policy (Copy)
**Title:** Privacy Policy — Local Lead Response Copilot

**Last updated:** [DATE]

This Privacy Policy explains how Local Lead Response Copilot collects, uses, and shares information when individuals submit lead forms or communicate via SMS in connection with our Clients.

**1. Information we collect**
- Contact information: name, phone number, email (if provided)
- Lead details: service requested, address/ZIP (if provided), preferred time, notes
- Message content: SMS conversations and timestamps
- Technical data: IP address/user agent from webhooks (where available), form source (e.g., Webflow/Typeform/Meta)

**2. How we use information**
- To respond to your inquiry and route it to the relevant Client
- To send SMS messages you request/consent to receive (confirmation, qualification, scheduling)
- To provide customer support and improve message quality/deliverability
- To maintain compliance logs (consent, opt-out, message history)

**3. Legal bases / consent**
We send SMS messages only when we have appropriate consent or another lawful basis (e.g., you initiated the inquiry and agreed to receive texts). You can withdraw consent by replying STOP.

**4. Sharing**
We share information with:
- The Client you contacted (to fulfill your request)
- Service providers (e.g., SMS/telephony providers, automation tools) solely to provide the service
We do not sell your personal information.

**5. Data retention**
We retain consent logs, opt-out records, and message records for compliance and dispute handling. Typical retention is 24 months unless a Client requests longer/shorter retention or law requires otherwise.

**6. Your choices**
- Opt out of SMS: Reply STOP
- Get help: Reply HELP
- Request access/deletion: email agent_bob_replit+lead-copilot@agentmail.to (subject: “Privacy Request”)

**7. Security**
We use reasonable safeguards to protect information; no method of transmission/storage is 100% secure.

**8. Contact**
agent_bob_replit+lead-copilot@agentmail.to  
Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4


## 2) Copy/Paste Opt-In Language (Agencies)

### A) Webflow form (recommended)
**Checkbox label (unchecked by default):**
“I agree to receive text messages about my inquiry and appointment scheduling. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”

**Short disclosure under form submit button:**
“By submitting, you agree to be contacted by text about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Hidden fields to capture (if possible):**
- consent_sms = true
- consent_timestamp = {{now}}
- consent_source = “webflow”
- page_url
- ip_address (if available)

### B) Typeform
**Disclaimer text (in Welcome screen or before phone question):**
“By continuing, you consent to receive text messages about your inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Consent not required to purchase.”

**If using a yes/no question:**
Question: “Can we text you to follow up about your request?”  
Yes = proceed / No = collect email only.

### C) Meta/Facebook Lead Ads
**Lead form disclaimer (add to custom disclaimer / privacy policy section):**
“By submitting this form, you agree to receive text messages regarding your inquiry, appointment scheduling, and related updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Consent not required to purchase.”

**Optional (higher-compliance) checkbox question inside form:**
“SMS consent: Yes, you may text me about my inquiry and scheduling.”


## 3) Message Templates (Compliant + Deliverability-Safe)

### First response (immediate)
“Hi {{first_name}}, this is {{business_name}}—got your request for {{service}}. What’s the address or ZIP code for the job?”

### Qualification follow-up
“Thanks. What’s the best day/time for a quick call or appointment?”

### Booking link (avoid spammy language)
“Great—here’s a link to pick a time that works: {{booking_link}} (Reply STOP to opt out.)”

### No response nudges (2 attempts max)
1) “Just checking in—do you still need help with {{service}}? Reply 1) Yes 2) Not anymore”
2) “Last check—reply YES if you’d like to schedule. (Reply STOP to opt out.)”

### Missed call text-back
“Sorry we missed you—this is {{business_name}}. Want to book a time or text us what you need?”


## 4) STOP/HELP Handling — Implementation Spec (Verified Behavior)

### Keywords (case-insensitive; trim whitespace; match whole word)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**HELP set:** HELP, INFO, SUPPORT

### State machine
- If inbound matches STOP set:
  - Set `contact.sms_opted_out = true`
  - Add phone number to **global suppression list** (account-level)
  - Log event `sms_opt_out_received` with timestamp, message_sid, source
  - Reply once: “You’re opted out and will no longer receive texts. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
  - Block all future outbound messages unless re-opt-in.

- If inbound matches HELP set:
  - Log event `sms_help_received`
  - Reply: “Help: You’re receiving texts about your inquiry with {{business_name}}. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

- If inbound is START (optional re-opt-in):
  - Only re-enable if you can prove prior consent or capture re-consent.
  - Reply: “You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.”

### Verification test matrix (must capture logs)
1) Send STOP → confirm opt-out reply sent; outbound blocked; suppression list updated.  
2) Send “ stop ” (whitespace) → same behavior.  
3) Send HELP → returns HELP template.  
4) Attempt outbound after STOP → ensure blocked and logged `sms_blocked_opted_out`.  
5) Audit export includes consent + opt-out timestamps.


## 5) Quiet Hours by Timezone — Implementation Spec

### Goal
Do not send non-critical outbound messages outside local quiet hours, except where the end user is actively responding (session-based) or a business override applies.

### Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone  
2) Business/service-area default timezone  
3) Phone number area code fallback (least reliable)

### Default quiet hours policy (editable per business)
- Allowed send window: 8:00 AM – 8:00 PM local time
- Outside window: queue message for next allowed time

### Session exception (to preserve conversation)
- If the lead messages in, allow responses for the next 30 minutes even if outside quiet hours (configurable), but never send marketing/bulk messages.

### Logging
Log `quiet_hours_deferred` with computed timezone, local timestamp, scheduled_send_time, and reason.


## 6) Consent Logging (Minimum Required Fields)
Store per phone number + per business:
- phone_e164
- consent_status (opted_in/opted_out)
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (hash or version string)
- consent_timestamp_utc
- form_url / lead_source_id
- ip_address (if available)
- opt_out_timestamp_utc (if any)
- last_message_in/out timestamps

Retention: recommend 24 months minimum.


## 7) Twilio Deliverability Runbook (Pilot-Safe)

### A) Messaging Service
- Use a Twilio Messaging Service (pool numbers per client if needed)
- Enable: sticky sender (if available), smart encoding, and status callbacks for delivery logs

### B) A2P 10DLC decision
- If sending in the US from local long codes at scale, plan A2P 10DLC registration.
- For very low volume pilots, still follow compliance steps; registration may still be required depending on Twilio policy and traffic patterns.

### C) Content guidelines (reduce filtering)
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “GUARANTEED”, or money-heavy phrasing
- Keep links minimal; use branded domain when possible; avoid link shorteners
- Personalize with business name + service context; keep messages under ~160–240 chars when possible
- Don’t send repeated messages with identical content across many recipients

### D) Fallback behaviors
- If message fails (carrier blocked / undelivered):
  - Retry once after 2–5 minutes (only for transactional content)
  - If still failing, switch to email notification to business + task to call lead
- Never override STOP suppression.


## 8) Agency Handoff — What to Do in 30 Minutes
1) Add checkbox + disclosure to the lead form using snippets above.
2) Ensure webhook passes: phone, first name, service, ZIP, consent flag, consent timestamp.
3) Implement STOP/HELP handler exactly as specified.
4) Turn on quiet hours (8am–8pm local) with deferral queue.
5) Confirm consent + opt-out logs can be exported for a single phone number on request.

---
Replace [TERMS_URL] and [PRIVACY_URL] after publishing the pages on the proof website (same domain as the URL above).