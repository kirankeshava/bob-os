# Local Lead Response Copilot — Minimum-Viable SMS Compliance & Deliverability Pack (Agency Copy/Paste + STOP/HELP + Quiet Hours)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:28:31.692Z

---

Business legitimacy links (use in all opt-in + templates)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

GOAL (wartime MVP)
Implement only what prevents blocked numbers, carrier filtering, and customer churn during pilots:
1) Explicit SMS consent language at point of capture (form/ad)
2) STOP/HELP handling with suppression list enforcement
3) Quiet hours (local timezone) with queued-send behavior
4) Message templates that avoid spam triggers and always include opt-out language

A) COPY/PASTE OPT-IN SNIPPETS (use ONE everywhere)

1) Webflow / Website Form (recommended)
Checkbox (unchecked by default):
“I agree to receive text messages about my request from {BUSINESS_NAME} at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy and Terms: {PRIVACY_URL} | {TERMS_URL}.”

If you cannot add a checkbox, add required line above the submit button:
“By submitting, you consent to receive texts about your request from {BUSINESS_NAME}. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”

2) Typeform
Add a Yes/No consent question (required) before submission:
Question: “SMS Updates Consent”
Description: “Do you agree to receive text messages about your request from {BUSINESS_NAME} at the number provided? Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”
Only proceed if answer = Yes.

3) Meta/Facebook Lead Ads
In the Lead Form “Privacy Policy” section + custom disclaimer:
“By submitting this form, you agree to receive text messages from {BUSINESS_NAME} about your request at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”

Non-negotiable data fields to capture:
- phone
- timestamp
- lead source (webflow/typeform/fb)
- consent text version (store the exact snippet version or hash)
- ip/user agent when available (web forms)

B) STOP / HELP HANDLING (Twilio-ready behavior)

Keywords (case-insensitive, trim punctuation):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO

Required behaviors:
1) On inbound STOP-set keyword:
- Immediately add phone to Global Suppression List (do not text again from any campaign/number)
- Send one final confirmation message (only once):
  “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply HELP for help.”
- Log event: type=opt_out, channel=sms, source=inbound_keyword, keyword, timestamp, messageSid

2) On inbound HELP-set keyword:
- Do NOT opt out.
- Respond:
  “{BUSINESS_NAME}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: {WEBSITE_URL}”
- Log event: type=help, channel=sms, timestamp, messageSid

3) Outbound guardrail:
- Before sending any outbound SMS, check suppression list. If suppressed => block send and log blocked_outbound with reason=suppressed.

Minimal Twilio webhook pseudocode (language-agnostic):
- Receive inbound webhook: From, Body, MessageSid
- normalized = normalize(Body)
- if normalized in STOP_SET:
    suppress(From)
    if not alreadyConfirmed(From): send(From, STOP_CONFIRMATION)
    return 200
- if normalized in HELP_SET:
    send(From, HELP_MESSAGE)
    return 200
- else: route to normal conversation/qualification flow

C) QUIET HOURS (minimum viable)
Objective: don’t text leads at night; queue for next allowed window.

Default send window (local time): 08:00–20:00, 7 days/week.
Timezone resolution order:
1) If lead source provides timezone (rare) use it
2) Use area-code mapping based on phone number (acceptable MVP)
3) Fallback: business timezone (configured per client)

Rules:
- If message would be sent outside window: queue to next local 08:00.
- If lead submits outside window: still log/notify internally (email/CRM) but delay SMS.
- Emergency override (optional): allow manual send by owner/admin with “I confirm consent and time-of-day exception” toggle (audit log required).

D) MESSAGE TEMPLATES (MVP, compliant, low-spam)
Principles:
- Keep first text short, specific, and clearly related to the lead’s request.
- Avoid: “free”, “guaranteed”, excessive caps, repeated links, URL shorteners.
- Include opt-out line at least in initial + any automated sequences.

1) First Response (immediate)
“Hi {firstName} — this is {BUSINESS_NAME}. Got your request for {service}. Are you looking to schedule service in the next 1–3 days? Reply 1) Yes 2) Not yet. Reply STOP to opt out.”

2) Qualifier Q1 (timing)
If Yes:
“Great — what’s the address/ZIP for the job? Reply STOP to opt out.”

3) Qualifier Q2 (scope)
“Quick question: what best describes the issue? 1) Repair 2) Install 3) Estimate/quote. Reply STOP to opt out.”

4) Booking
“Thanks. Want to book a call or an on-site visit? Reply 1) Call 2) Visit, and the best time window today/tomorrow. Reply STOP to opt out.”

5) No-response nudge (after 15–30 min, only once)
“Just checking in — still want help with {service}? Reply 1) Yes 2) No. Reply STOP to opt out.”

6) Missed-call text-back (if applicable)
“Sorry we missed you — this is {BUSINESS_NAME}. Reply with your name + what you need help with and we’ll get you scheduled. Reply STOP to opt out.”

E) DELIVERABILITY HARDENING (minimum viable; no spend)
- Use a Twilio Messaging Service (even in pilot) to centralize compliance features and future scaling.
- Ensure proper from-number consistency per client; avoid swapping numbers frequently.
- Don’t include links in the first message unless necessary; if used, use a full branded domain (no shorteners).
- Monitor error codes; any spike in 30007/30005 (carrier filtering) => tighten content and slow pacing.

A2P 10DLC decision guide (quick):
- If using local long code and sending at any meaningful volume: plan A2P 10DLC brand+campaign registration.
- If ultra-low volume pilot: can start with compliant content + messaging service, then register before scaling.
(Registration may involve carrier fees later; do not pay during week 1.)

F) AGENCY GO-LIVE CHECKLIST (30 minutes)
1) Add the opt-in snippet to the lead capture (Webflow/Typeform/FB form).
2) Ensure phone field is required and formatted E.164.
3) Configure quiet hours (08:00–20:00 lead local time) with queueing.
4) Turn on STOP/HELP webhook handling + suppression list enforcement.
5) Paste templates (First Response + Qualifiers + Booking + One nudge) and cap nudges to 1.
6) Test: send “HELP”, “STOP”, then attempt outbound => outbound must be blocked.
7) Record: consent timestamp + consent text version + lead source in CRM/logs.

Support reference line (use in agency proposals):
“Compliance baseline included: explicit opt-in, STOP/HELP automation, suppression lists, consent logging, and quiet-hours scheduling. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to.”

Owner action needed later (not required for MVP launch, but should be scheduled):
- Publish Privacy Policy + Terms pages and replace {PRIVACY_URL}/{TERMS_URL} in all snippets.
- Complete A2P 10DLC registration before scaling outbound volume.
