# Local Lead Response Copilot — Agency MV Compliance + Deliverability Hardening (Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:55:25.556Z

---

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

1) COPY/PASTE OPT-IN LANGUAGE (USE EVERYWHERE)

A) Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Required form storage fields: consent_checked=true, consent_timestamp, consent_source_url, consent_ip (if available), lead_phone.

B) Typeform (statement + required Yes)
Statement text:
“By providing your phone number, you consent to receive text messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Question: “Do you agree to receive SMS updates about your request?” Yes/No (Required = Yes)

C) Meta/Facebook Lead Ads (Primary text + privacy policy)
Primary text:
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL].”
Also ensure the Meta lead form includes your Privacy Policy URL and Business phone/email.

2) MESSAGE TEMPLATES (COMPLIANT + DELIVERABILITY-SAFE)

First message (sent immediately after opt-in lead creation):
“Hi {first_name}, this is {agent_name} with {business_name}. I got your request for {service}. What’s the address/ZIP for the job?”

Qualification follow-up (only if they respond):
“Thanks—when would you like us to come out? (1) ASAP (2) This week (3) Just pricing”

Booking confirmation (after selecting a slot):
“Perfect. You’re booked for {day} at {time}. Reply YES to confirm or reply STOP to opt out.”

Missed-call text-back (only if they called you):
“Sorry we missed your call—this is {business_name}. Text us what you need help with and the job ZIP, and we’ll get you scheduled.”

Re-engagement (max 1 attempt, 24–72h later, only if no reply):
“Hi {first_name}, checking in—do you still want help with {service}? Reply 1 for YES, 2 for NO. Reply STOP to opt out.”

Content guardrails (reduce filtering):
- Avoid: “FREE”, “GUARANTEED”, “WIN”, “CLICK HERE!!!”, excessive caps/punctuation, URL shorteners.
- Prefer: conversational, specific to the request, no attachments, minimal links.
- If you must link: use a branded domain; include only one link; do not shorten.

3) STOP/HELP HANDLING — IMPLEMENTATION SPEC (TWILIO INBOUND)

Goal: honor opt-out immediately across ALL future campaigns and messages.

A) Normalize inbound body
- body_norm = trim(lowercase(body))
- collapse multiple spaces
- remove punctuation except spaces

B) Opt-out keywords (treat as global STOP)
Exact or contains-only tokens:
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

C) Help keywords
HELP, INFO

D) Required behavior
On receiving an opt-out keyword:
1) Add phone (E.164) to global_suppression_list with:
- suppression_type = “sms_stop”
- suppressed_at timestamp
- source = “inbound_keyword”
- raw_message + message_sid
2) Respond immediately (one final message):
“You’re opted out from {business_name} texts. No more messages will be sent. Reply START to resubscribe. Help: agent_bob_replit+lead-copilot@agentmail.to.”
3) Block ALL future outbound messages to that phone unless they re-consent.

On receiving HELP:
Respond:
“{business_name}: We text about your service request. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

On receiving START (optional resubscribe)
Only allow if you have a compliant record of prior opt-in OR you capture a fresh opt-in:
- remove from suppression list
- send confirmation:
“You’re resubscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”

E) Edge cases
- If a user texts STOP with extra words (“stop texting me”): still opt-out.
- If suppressed user texts anything non-HELP: do not resume sending marketing; you may send one human-agent response only if it’s clearly customer service and they initiated.
- Idempotency: if STOP received multiple times, do not send multiple confirmations in a short burst; store last_stop_confirmed_at and rate-limit.

F) Required audit logs (minimum)
For each inbound message: phone, body_raw, body_norm, keyword_detected, action_taken, timestamp, message_sid.
For each suppression event: phone, suppressed_at, reason, message_sid.
For each blocked outbound attempt: phone, blocked_reason, timestamp, intended_template.

4) QUIET HOURS BY TIMEZONE — IMPLEMENTATION SPEC

A) Default quiet hours
- Do not send outbound SMS between 9:00 PM and 8:00 AM recipient local time.
- If business category requires stricter, use 8:00 PM–9:00 AM.

B) Determine recipient timezone (resolution order)
1) Explicit lead field timezone (if captured)
2) Lead ZIP -> timezone lookup
3) Phone number area code -> timezone estimate
4) Business default timezone (fallback)
Log which method was used.

C) Scheduling algorithm
When an outbound message is ready to send:
1) tz = resolve_timezone(lead)
2) local_now = now() in tz
3) if local_now within allowed window: send immediately
4) else: schedule for next allowed send time (e.g., 8:05 AM next day) with jitter +/- 5 minutes
5) If a lead replies during quiet hours, you may respond (customer-initiated) but keep it minimal and avoid marketing language.

D) Retries and failure behavior
- If send fails with transient error: retry up to 3 times over 10 minutes (within allowed window only).
- If outside allowed window during retry: defer to next window.

E) Required logs
- message_id, lead_id, tz_used, local_send_time, send_mode (immediate/deferred), defer_reason, scheduled_for.

5) TWILIO DELIVERABILITY RUNBOOK (AGENCIES)

A) Use a Twilio Messaging Service
- Add your sender(s) (10DLC numbers or toll-free) to the Messaging Service.
- Enable Smart Encoding.
- Set status callback URL to capture delivery outcomes.
- Configure inbound webhook to your STOP/HELP handler endpoint.

B) 10DLC vs Toll-Free decision (pilot guidance)
- Low volume, local service business, conversational flows: 10DLC typically fine.
- If higher volume or nationwide outreach: consider toll-free verification.
- If using 10DLC at scale in the US, expect A2P registration (Brand + Campaign). Do not blast from unregistered numbers.

C) Content rules
- Avoid URL shorteners.
- Include business name early.
- Keep first message purely transactional to the request.
- Do not include repetitive identical messages to many recipients.

D) Fallback behaviors
- If outbound blocked due to suppression: do not send; mark lead “Opted out”.
- If deliverability degraded (high undelivered/filtered): slow sending rate, reduce links, and switch to “call + voicemail drop + textback” pattern.

6) COMPLIANCE VERIFICATION CHECKLIST (GO/NO-GO)

Before going live, verify and record:
- Opt-in language present on the lead source (Webflow/Typeform/Meta) including STOP/HELP, frequency, rates disclosure, and Terms/Privacy links.
- Consent record stored per lead (timestamp, source, form URL, checkbox/yes answer).
- STOP handling: send STOP from a test phone; confirm (1) confirmation message, (2) suppression saved, (3) outbound blocked.
- HELP handling: send HELP; confirm correct response includes support email agent_bob_replit+lead-copilot@agentmail.to and proof URL.
- Quiet hours: simulate 10:30 PM local; confirm messages are deferred and sent after 8:00 AM.
- Delivery monitoring: confirm status callbacks logged (sent/delivered/undelivered).

Agency support contact (for disputes/complaints): agent_bob_replit+lead-copilot@agentmail.to
Proof URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
