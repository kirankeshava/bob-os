# Local Lead Response Copilot — MVP Compliance Pack (Pilot-Ready): Opt‑In, STOP/HELP, Quiet Hours, Consent Logging, Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:42:31.919Z

---

Business legitimacy link (share with customers/partners): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime/MVP): Remove the top objections that block pilots and prevent carrier/TCPA issues: (1) explicit opt-in disclosure, (2) STOP/HELP compliance, (3) quiet hours, (4) consent logging. Everything else is optional until paid pilots are live.

1) Copy/Paste Opt‑In Language (use as-is)
A) Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from {BUSINESS_NAME} about my inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Under the form (small text):
“By submitting, you consent to receive SMS messages at the number provided, including automated texts related to your request. Consent is not a condition of purchase. View Privacy Policy: {PRIVACY_URL} and Terms: {TERMS_URL}.”

Implementation notes:
- Checkbox should be unchecked by default.
- Store a timestamp + page URL + IP (if available) + form name + checkbox state.

B) Typeform (or any embedded form)
Add a required Yes/No question:
“Do you agree to receive text messages about your request?”
Description:
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

Map Typeform fields into your lead payload:
- consent_sms = yes/no
- consent_text_shown = exact disclosure text version (or template version id)

C) Meta / Facebook Lead Ads (Higher risk—use strongest disclosure)
In the “Privacy Policy” and “Disclaimer”/custom question area, include:
“By submitting this form, you consent to receive SMS messages from {BUSINESS_NAME} about your request, including automated texts. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

If Meta UI supports a custom question, add:
“Do you agree to receive text messages about your request?” (Required)

2) First Message Templates (MVP compliant; low spam risk)
Rules:
- Identify the business quickly.
- Reference the user’s request.
- Ask 1 short qualifying question.
- Include STOP/HELP line (at least in first message and periodically).

Template 1 — Immediate response after lead submits:
“Hi {first_name}, this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

Template 2 — If business name is unknown/untrusted (use legitimacy cue):
“Hi {first_name} — {BUSINESS_NAME} here. We received your request. What type of {service} do you need (install/repair/estimate)? Reply STOP to opt out, HELP for help.”

Template 3 — Booking handoff:
“Thanks — would you like to book a quick call or an on-site estimate? (1) Call (2) On-site. Reply STOP to opt out.”

3) STOP/HELP Handling (implementation spec)
A) Keywords to treat as opt-out (case-insensitive; trim punctuation/spaces)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

B) Keywords to treat as help
HELP, INFO

C) STOP behavior (must be global)
When an inbound message matches a STOP keyword:
1) Immediately mark phone_number status = “suppressed” (global suppression list).
2) Set suppressed_at timestamp, suppressed_reason = “user_stop”, last_inbound_body.
3) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to re-subscribe.”
4) Block all future outbound sends to that phone_number across all clients/campaigns unless re-subscribed.

D) HELP behavior
When inbound matches HELP/INFO:
Send:
“{BUSINESS_NAME}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Log help_event = true.

E) START behavior (optional but recommended)
When inbound matches START/YES:
- If previously suppressed due to STOP, set status = “active” and log resubscribe_at.
- Send:
“You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.”

F) Twilio webhook notes (if using Twilio Messaging)
- Use a single inbound webhook endpoint that receives From, To, Body.
- Keyword handling occurs BEFORE any AI routing.
- Return TwiML (MessagingResponse) for STOP/HELP confirmations.
- Maintain suppression list in your DB; also consider Twilio Advanced Opt-Out features if enabled, but do not rely on Twilio alone—your app must enforce suppression.

4) Quiet Hours (MVP spec)
Objective: Avoid texting consumers at night; reduce complaints and carrier filtering.

A) Default quiet hours
Do not send outbound SMS to leads between 8:00 PM and 8:00 AM in the lead’s local timezone (configurable per client).

B) Timezone resolution order
1) Lead-provided state/ZIP → map to timezone.
2) Service address state/ZIP → map to timezone.
3) Phone number area code → approximate timezone.
4) Fallback: client’s configured timezone.

C) Behavior
If a message would be sent during quiet hours:
- Queue the message with next_allowed_send_time = next 8:00 AM local.
- If lead replies inbound during quiet hours, you may respond if the user initiated the conversation (safer), but keep responses short and still include STOP option.

D) Owner override
Allow client admin to enable “After-hours” for specific lead sources (e.g., emergency plumbing) with explicit configuration.

5) Consent Logging (minimum fields)
Store these fields per lead:
- lead_id
- phone_number
- consent_sms (true/false)
- consent_source (webflow/typeform/meta/manual)
- consent_timestamp (UTC)
- consent_text_version (e.g., v1.0)
- consent_page_url or form_id
- ip_address (if available)
- user_agent (if available)
- proof_blob (raw webhook payload from form/ad if available)

Rules:
- If consent_sms != true, do not send SMS.
- If consent is ambiguous (missing checkbox), require manual review.

6) Agency Handoff — Go‑Live Checklist (copy/paste)
Pre-flight (must-do):
1) Add opt-in disclosure + checkbox (or required question) using the snippets above.
2) Ensure the lead payload includes consent_sms=true.
3) Confirm STOP/HELP keywords are enabled and suppression is global.
4) Confirm quiet hours are enabled (8pm–8am local) and timezone mapping is configured.
5) Confirm first message template includes business name + STOP/HELP line.

Verification tests (15 minutes):
A) Submit test lead with your own phone number (with consent checked). Confirm you receive the first SMS within 60 seconds.
B) Reply “HELP”. Confirm you get the HELP response with the support email.
C) Reply “STOP”. Confirm opt-out confirmation arrives.
D) Trigger another outbound message attempt. Confirm it is blocked (no SMS sent) and logged as suppressed.
E) Reply “START”. Confirm re-subscribe message arrives and outbound is allowed again.

If anything fails, email agent_bob_replit+lead-copilot@agentmail.to with:
- Your phone number used for testing
- Timestamp/timezone
- Screenshot of messages
- Lead source (Webflow/Typeform/Meta)

7) Deliverability MVP guidelines (don’t trigger filtering)
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “ACT NOW”, or link-shorteners.
- Keep first message under ~240 chars when possible.
- Include business identity early.
- Don’t send large bursts from a new number. Warm up gradually.
- If including links, use your own domain/known URL; avoid bit.ly.

This document is intentionally MVP: it’s designed to keep pilots live, messages deliverable, and compliance defensible without slowing distribution or onboarding.