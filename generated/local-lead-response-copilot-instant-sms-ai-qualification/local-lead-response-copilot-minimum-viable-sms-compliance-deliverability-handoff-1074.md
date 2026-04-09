# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:23:25.488Z

---

Purpose (wartime / minimum viable)
This document includes only the compliance + deliverability elements that routinely block pilots: (1) clear opt-in disclosure, (2) STOP/HELP handling, (3) quiet hours, (4) basic consent logging, and (5) safe message templates. It is designed to remove sales objections and reduce Twilio/carrier enforcement risk without slowing distribution.

Legitimacy links to include everywhere
- Product/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
- Privacy + Terms: publish pages and replace placeholders below with final URLs.

A) Copy/paste opt-in language snippets
1) Webflow/website form checkbox (recommended)
Checkbox label (required, unchecked by default):
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”
Hidden fields to store with submission:
- sms_consent = true
- sms_consent_source = "webflow_form"
- sms_consent_timestamp = ISO8601
- sms_consent_ip = visitor IP (if available)
- sms_consent_text = exact checkbox label version

2) Typeform
Add a required Yes/No question:
Question: “Can we text you about your request?”
Description: “Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
Logic: Only proceed to phone capture / submission if Yes.
Store fields:
- sms_consent = true/false
- sms_consent_source = "typeform"
- sms_consent_timestamp
- sms_consent_text_version

3) Meta/Facebook Lead Ads (high impact)
In the Instant Form > Privacy Policy + Custom Disclaimer:
Custom disclaimer text:
“By submitting, you agree [BUSINESS NAME] may contact you by SMS about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
Also ensure the lead form asks for phone number and the ad/offer context matches what the SMS will reference (reduces spam reports).

B) Minimum compliant message templates (paste-ready)
Notes:
- Always include business name early.
- Avoid link shorteners; use full domains.
- Avoid “FREE!!!”, “urgent”, excessive caps, repeated emojis, or vague “claim now” language.

1) First response (speed-to-lead)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service_requested}. What’s the address (or ZIP) for the job? Reply STOP to opt out, HELP for help.”

2) Qualification (1–3 questions max)
“Thanks. When are you looking to have this done—ASAP, this week, or later? Reply STOP to opt out, HELP for help.”
“Any photos or details you want us to know? (Optional) Reply STOP to opt out, HELP for help.”

3) Booking handoff
“We can get you on the schedule. What time works best for a quick call—{slot_1} or {slot_2}? Reply STOP to opt out, HELP for help.”

4) Confirmation
“Booked: {date} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

5) Missed-call text-back (if used)
“Hi—this is {business_name}. Sorry we missed you. What service do you need and what’s your ZIP? Reply STOP to opt out, HELP for help.”

C) STOP/HELP handling (engineering spec)
Goal: immediate opt-out compliance, carrier expectation alignment, and prevention of further messages.

1) Keywords to treat as STOP (case-insensitive, trimmed)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Behavior:
- Immediately mark recipient as opted_out=true in a global suppression list (across all sub-accounts/clients unless legally required otherwise).
- Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
- Block all future outbound messages to that number unless they explicitly resubscribe.

2) Keywords to treat as START/UNSTOP
START, YES, UNSTOP
Behavior:
- Only if a prior opt-out exists, set opted_out=false and log resubscribe event.
- Send ONE confirmation:
“You’re back in. You’ll receive texts from {business_name}. Msg frequency varies. Reply STOP to opt out.”

3) HELP keyword
HELP, INFO
Behavior:
- Do not change opt status.
- Send support and basic program info:
“{business_name}: We text about your service request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

4) Logging requirements (minimum viable)
For every inbound message:
- timestamp_utc
- from_number, to_number
- body
- matched_intent (STOP/HELP/START/OTHER)
- action_taken (suppressed, help_sent, resubscribed, none)
For consent events:
- consent_status (opted_in/opted_out)
- consent_source (webflow/typeform/meta/manual)
- consent_text_version
- proof fields (timestamp, ip/user_agent if available)

D) Quiet hours by timezone (implementation spec)
Goal: reduce complaints and align with common “reasonable hours” expectations.
Default quiet hours window (configurable per client):
- Send only between 8:00 AM and 8:00 PM recipient local time.

Timezone resolution order:
1) Lead-provided ZIP/address → geocode to timezone
2) If unavailable, use phone number area code inference
3) If unknown, default to client’s timezone

Behavior:
- If a message would send during quiet hours, queue it to the next allowed window start (e.g., 8:05 AM) with a “queued_reason=quiet_hours”.
- If lead texts inbound during quiet hours, you may respond once immediately ONLY with a minimal acknowledgment, or queue the full flow (choose one policy and stay consistent). Recommended:
  - Immediate acknowledgment allowed: “Thanks—got it. We’ll follow up at {next_allowed_time}. Reply STOP to opt out.”

Owner override:
- Allow a per-lead override if the lead explicitly requests “text me now / call me now” (log override_reason and who triggered it).

E) Twilio deliverability minimum setup (no spend assumed)
- Use a Twilio Messaging Service (instead of a single number) for scaling and compliance features.
- Enable Smart Encoding and Sticky Sender (if available).
- Use consistent business identification in first message.
- Avoid link shorteners; use your real domain.
- Monitor: delivery rates, spam complaints, opt-out rate, and message error codes.
A2P 10DLC note:
- If sending from a US local long code at meaningful volume, you will likely need A2P Brand + Campaign registration. Start the workflow when ready; it may later involve carrier fees (do not spend without owner approval).

F) Agency go-live checklist (minimum viable)
1) Add opt-in disclosure to the form/ad using the snippets above.
2) Ensure the lead payload includes: phone, first name, service type, and consent=true.
3) Configure STOP/HELP handling endpoint and verify suppression.
4) Enable quiet hours with timezone resolution.
5) Send test leads from each source and run verification matrix.

Verification matrix (quick)
- Submit a test lead with consent=true → confirm first SMS arrives within 60 seconds.
- Reply “HELP” → confirm HELP message includes support email + site URL.
- Reply “STOP” → confirm opt-out confirmation arrives; attempt another outbound → must be blocked.
- Submit a lead at 10:30 PM local time → confirm message queues to next morning.

If an agency asks “are you compliant?” (copy/paste response)
“We capture explicit SMS opt-in at the lead source, include STOP/HELP instructions, honor opt-outs immediately via a suppression list, and enforce quiet hours by recipient timezone. We also log consent + opt-out events for audit support. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to”
