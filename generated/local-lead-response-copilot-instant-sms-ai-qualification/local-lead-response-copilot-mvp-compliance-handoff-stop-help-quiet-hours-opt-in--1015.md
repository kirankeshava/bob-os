# Local Lead Response Copilot — MVP Compliance Handoff (STOP/HELP + Quiet Hours + Opt‑In + Consent Logging)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:55:43.960Z

---

Purpose (wartime MVP)
This document covers the minimum compliance + deliverability items that most commonly block pilot launches for Local Lead Response Copilot: clear opt-in language, STOP/HELP handling, quiet hours by timezone, and consent logging. It is designed so an agency or an engineer can implement quickly and produce evidence if a carrier, Twilio, or a customer asks.

Business legitimacy references (use in onboarding)
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email (include in HELP and legal): agent_bob_replit+lead-copilot@agentmail.to

1) Opt-in language (copy/paste)
A. Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request from {Business Name} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to unsubscribe, HELP for help.”
Under checkbox (small text with links):
“By submitting, you agree to our Terms and Privacy Policy: {TERMS_URL} | {PRIVACY_URL}. Consent is not a condition of purchase.”

B. Typeform
Add a “Legal” or “Statement” block near phone collection:
“By providing your phone number, you consent to receive SMS from {Business Name} about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}. Consent not required to purchase.”

C. Meta/Facebook Lead Ads
In the lead form “Privacy policy” and “Custom disclaimer”:
Custom disclaimer text:
“By submitting, you agree to receive text messages from {Business Name} regarding your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}. Consent is not a condition of purchase.”

2) STOP/HELP handling (MVP spec)
Goal: If someone texts STOP (or equivalent) at any time, we must (a) send a confirmation, (b) stop all future messages to that number, and (c) record it.

A. Keyword matching
Treat as opt-out keywords (case-insensitive; ignore punctuation/extra spaces):
STOP, STOPALL, STOP ALL, UNSUBSCRIBE, CANCEL, END, QUIT

Treat as help keywords:
HELP, INFO, SUPPORT

B. Required behaviors
1) Inbound STOP keyword received:
- Immediately mark number as “suppressed/opted_out=true” for the entire workspace/account (global suppression list).
- Send exactly one confirmation message.
- Block all future outbound SMS to that number unless they explicitly opt back in (recommended: only via a new web form submission with consent).

STOP confirmation (copy/paste):
“You’re opted out and will no longer receive texts from {Business Name}. Reply HELP for help.”

2) Inbound HELP keyword received:
- Do NOT change subscription state.
- Reply with a help message that includes business name and support contact.

HELP response (copy/paste):
“{Business Name}: We text to follow up on your request and help schedule service. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) If a suppressed number submits a new form:
- Recommended MVP: treat it as a new opt-in ONLY if the form includes the consent language and timestamp; otherwise do not message.

C. Twilio webhook mapping (generic)
- Configure Twilio “A Message Comes In” webhook to POST to /sms/inbound
- Handler logic (order matters):
  1) Normalize message body
  2) If keyword in STOP set: suppress + send STOP confirmation
  3) Else if keyword in HELP set: send HELP response
  4) Else: continue normal lead qualification flow

D. Audit logging (required fields)
Every STOP/HELP decision should log:
- event_type: inbound_sms
- from_number, to_number
- message_body
- classification: stop | help | normal
- action_taken: suppressed | help_sent | routed
- timestamp_utc
- provider_message_sid (Twilio SID)

3) Quiet hours (MVP spec)
Goal: Avoid texting at night to reduce complaints and carrier filtering.

A. Default schedule (local time of lead)
- Allowed send window: 08:00–20:00 (8am to 8pm)
- If outside window: queue the first outbound message for next allowed time (08:00 local)
- If the lead came from an “emergency” service category (optional toggle): allow 08:00–21:30

B. Timezone resolution order
1) If lead record includes timezone explicitly, use it.
2) Else if lead includes ZIP/postal code, map ZIP→timezone.
3) Else use area code (NANPA) mapping.
4) Else fallback to business timezone (workspace setting).

C. Daylight savings
Use IANA timezone IDs (e.g., America/Chicago) and a timezone-aware library. Never hardcode UTC offsets.

D. Queued-send behavior
- Store queued_message with planned_send_at_utc and reason=quiet_hours
- At send time, re-check suppression list before sending.

4) Consent logging (MVP)
Goal: Be able to answer “Where did this lead consent?” without digging.

A. Store these fields on each lead
- consent_status: opted_in | opted_out | unknown
- consent_source: webflow | typeform | meta | manual | other
- consent_text_version: e.g., v1_2026-04-09
- consent_timestamp_utc
- consent_ip (if available)
- consent_user_agent (if available)
- landing_page_url (or form URL)
- terms_url, privacy_url shown at time of consent

B. Example log line (for audits)
“2026-04-09T15:22:11Z consent_recorded lead=abc123 source=meta phone=+1XXXXXXXXXX terms={TERMS_URL} privacy={PRIVACY_URL} text_version=v1_2026-04-09”

5) Go-live verification (15-minute checklist)
- Text STOP from a test phone → confirm you receive STOP confirmation and all future messages are blocked.
- Text HELP → confirm help response includes support email and website.
- Submit a lead at 9:30pm local → confirm first message is queued for next morning.
- Submit a normal lead during business hours → confirm first message sends immediately and includes STOP language at least once in the initial sequence.

Notes (what we are intentionally deferring)
- Full A2P 10DLC campaign registration details, throughput tuning, link branding, and advanced content linting. These can be added after first paid pilots unless Twilio/carriers force earlier registration.
