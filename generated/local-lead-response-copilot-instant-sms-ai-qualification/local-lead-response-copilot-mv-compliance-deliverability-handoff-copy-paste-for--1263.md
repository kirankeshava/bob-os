# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Copy/Paste for Agencies)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:49:57.888Z

---

Purpose (MV = minimum viable): This is the smallest compliant setup that removes the #1 sales objections (consent, STOP/HELP, quiet hours) and reduces carrier filtering so pilots can launch safely.

Business legitimacy references (include in agency proposals/onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED OPT-IN (copy/paste)

1A) Webflow/Website form checkbox + disclosure (recommended)
Add a required checkbox near the submit button:
[ ] “I agree to receive text messages about my request.”

Add disclosure text directly under the checkbox (small text ok):
“By submitting, you agree to receive SMS messages from {BUSINESS NAME} about your request (appointment scheduling and updates). Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Privacy Policy: {PRIVACY_URL} and Terms: {TERMS_URL}.”

Form fields to capture (minimum):
- phone
- first_name (optional)
- consent_checkbox = true
- page_url (hidden)
- timestamp (auto)

1B) Typeform consent block
Add a Yes/No question: “Do you agree to receive text messages about your request?”
If Yes, show this statement and proceed:
“By continuing, you agree to receive SMS messages from {BUSINESS NAME} about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL}. Terms: {TERMS_URL}.”
If No, submit without SMS follow-up.

1C) Meta/Facebook Lead Ads (Instant Form)
In the form’s “Privacy policy” and “Custom disclaimer” section add:
“By submitting this form, you consent to receive SMS messages from {BUSINESS NAME} about your request (appointment scheduling and updates). Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL}. Terms: {TERMS_URL}.”

Important: If you cannot add clickable Terms/Privacy links inside the ad form, include them in the first SMS message (see templates).

2) COMPLIANT MESSAGE TEMPLATES (ready to paste)

2A) First response (must be factual, non-promotional, identify business)
“Hi {first_name}—this is {agent_name} with {BUSINESS NAME}. Got your request for {service_requested}. Are you looking to schedule today or later this week? Reply STOP to opt out, HELP for help.”

2B) Qualification (keep it short; avoid spammy words)
Option A (2 questions max):
“Quick question so I can route you right: what’s your address/ZIP?”
Then:
“Thanks—what’s the best time for a quick call (or I can book you by text)?”

2C) Booking link message (use only after engagement)
“Perfect. Here’s a link to choose a time: {booking_link}. If you prefer, reply with 2 times that work for you. Reply STOP to opt out.”

2D) Missed-call text back
“Hi {first_name}—sorry we missed you. This is {BUSINESS NAME}. What can we help with today? Reply STOP to opt out.”

2E) Re-engagement (one attempt only, 24–72h later)
“Hi {first_name}—checking in: do you still need help with {service_requested}? If yes, reply 1 and we’ll get you scheduled. Reply STOP to opt out.”

Content guidelines (deliverability):
- Don’t use ALL CAPS, repeated punctuation, “FREE!!!”, “guaranteed”, “act now”, crypto/loan language.
- Avoid URL shorteners; use your own domain when possible.
- Keep first message under ~240 chars.
- Include STOP language in first message and any message containing a link.

3) STOP/HELP HANDLING (implementation spec)

3A) Keywords to recognize (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

3B) STOP behavior (required)
When inbound message matches STOP keyword:
1) Mark phone as “opted_out=true” in a GLOBAL suppression list (applies across all subaccounts/clients if you share numbers) and also per-client list.
2) Immediately reply once with confirmation:
“You’re opted out and will no longer receive messages from {BUSINESS NAME}. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to”
3) Block all future outbound to that phone until explicit re-opt-in.

3C) START behavior (optional but recommended)
If inbound equals START/YES:
- Only re-enable if you have a prior consent record OR you re-confirm consent.
Reply:
“You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.”

3D) HELP behavior
Reply:
“{BUSINESS NAME} texting help: We message about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

3E) Logging requirements (for audits + disputes)
Store at minimum:
- phone_e164
- event_type (consent_given | outbound_sent | inbound_received | opt_out | opt_in)
- timestamp_utc
- source (webflow/typeform/meta/manual)
- consent_text_version
- page_url or lead_form_id
- message_body (for inbound/outbound)
- provider_message_sid (Twilio SID)

4) QUIET HOURS (timezone-based) — MV spec

Goal: prevent sending during restricted hours to reduce complaints and policy risk.
Default quiet hours (suggested): 8:00pm–8:00am recipient local time.

Timezone resolution order:
1) If lead captured with explicit timezone field, use it.
2) Else infer from ZIP/state (preferred).
3) Else infer from area code (fallback).
4) Else default to business timezone but treat as “unknown” and be conservative.

Behavior:
- If message would send during quiet hours, queue it for next allowable window (e.g., 8:05am local time).
- If lead arrives during quiet hours, optionally send ONE immediate non-marketing acknowledgement only if your risk tolerance allows; otherwise queue the first message.
Recommended MV approach: queue all first messages that fall in quiet hours.

Owner override:
- Allow manual send override for truly urgent cases, but log it with reason.

5) TWILIO DELIVERABILITY SETUP (MV checklist)

- Use a Twilio Messaging Service (not ad-hoc numbers) for scaling and compliance controls.
- Enable Advanced Opt-Out (if available) OR implement suppression at application layer (Section 3).
- Ensure webhook handling for inbound messages is configured and tested.
- Warm-up: start low volume per number, avoid bursts.
- Keep consistent sender numbers per client when possible.
- Decide route: 10DLC (local long code) vs toll-free. If sending at scale to US recipients, plan A2P 10DLC registration.

6) AGENCY GO-LIVE CHECKLIST (fast)

A) Before launch
- Add opt-in checkbox/disclaimer to the form (Section 1).
- Confirm Terms/Privacy URLs (replace {PRIVACY_URL} and {TERMS_URL}).
- Confirm message templates inserted exactly (Section 2).
- Confirm STOP/HELP keywords enabled and tested (Section 3).
- Confirm quiet hours configured (Section 4).

B) Verification test matrix (10 minutes)
1) Submit a test lead with your own phone.
Expected: first SMS contains business name + STOP/HELP.
2) Reply HELP.
Expected: help message with support email.
3) Reply STOP.
Expected: opt-out confirmation.
4) Trigger another outbound (submit form again).
Expected: NO outbound is sent to opted-out number; log shows blocked.
5) If testing during quiet hours, ensure it queues and sends next morning.

Implementation support / escalation:
- agent_bob_replit+lead-copilot@agentmail.to
- Website legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

This MV pack is sufficient for pilots: it captures consent, enforces opt-out, prevents off-hours messaging, and reduces deliverability risk without slowing down onboarding.