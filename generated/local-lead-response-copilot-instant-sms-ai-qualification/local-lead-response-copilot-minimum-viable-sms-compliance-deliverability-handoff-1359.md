# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Handoff (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:38:02.315Z

---

Purpose (pilot-ready, minimum viable):
This document contains the smallest set of SMS compliance + deliverability requirements needed to (1) remove common agency/buyer objections, (2) reduce carrier filtering/account enforcement risk, and (3) avoid TCPA/CTIA foot-guns during early pilots. It is written to be copy/paste for agencies and implementation-ready for engineering.

Business legitimacy references (use in proposals/onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum requirements checklist (what must be true before any pilot goes live)
A. Consent capture (opt-in) is explicit
- Form/ad must disclose: automated SMS, purpose (responding/qualifying/booking), msg frequency estimate, “Msg & data rates may apply”, STOP/HELP keywords, and links to Terms/Privacy.
- No pre-checked consent boxes (where applicable). Consent language must be next to the submit CTA.

B. STOP/HELP handling works end-to-end
- Any inbound STOP-like keyword immediately suppresses further texts to that number (global suppression list).
- HELP returns support instructions + support email.
- Suppression is honored across all clients/subaccounts.

C. Quiet hours are enforced by recipient timezone
- Default: send only 8:00am–8:00pm recipient local time.
- If timezone unknown: default to lead’s area code timezone; if still unknown, default to account timezone.
- Messages outside window are queued for next open time (unless the user explicitly requests immediate contact).

D. Consent and message audit logs exist
- Store: consent source, timestamp, IP (if available), form/ad identifier, consent text version hash, lead phone, and message events.

2) Copy/paste opt-in language (agencies)
Important: Replace [TERMS_URL] and [PRIVACY_URL] once published on the website.

2.1 Webflow (checkbox + helper text)
Checkbox label (recommended):
“I agree to receive automated text messages about my inquiry (including appointment scheduling and service updates) from [Business Name] at the phone number provided. Consent is not a condition of purchase. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]”

If Webflow UI requires shorter label, use:
“I agree to get texts about my inquiry. Reply STOP to opt out; HELP for help. Msg freq varies. Msg & data rates may apply.”
And place the full disclosure under the form:
“By submitting, you agree to receive automated texts from [Business Name] about your request, scheduling, and service updates. Consent not required to buy. Reply STOP to opt out, HELP for help. Msg freq varies. Msg & data rates may apply. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.2 Typeform (statement + required yes/no)
Question: “Do you agree to receive text messages about your request?” (Required)
Choices: “Yes, I agree” / “No”
Typeform footer statement (or immediately below submit):
“By selecting Yes, you consent to receive automated SMS from [Business Name] about your inquiry (including qualification questions and scheduling). Consent not a condition of purchase. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.3 Meta/Facebook Lead Ads (privacy policy + custom disclaimer)
Use Meta’s “Privacy Policy” link field: [PRIVACY_URL]
Add a custom disclaimer in the lead form description:
“By submitting, you agree to receive automated text messages from [Business Name] about your request, qualification, and scheduling. Consent is not a condition of purchase. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

3) Default message templates (compliant + deliverability-friendly)
Guidelines applied: identify business early, keep messages short, avoid aggressive urgency/spam words, avoid link shorteners, include STOP/HELP in early messages.

3.1 First response (immediate)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. A couple quick questions so we can quote accurately. Reply STOP to opt out, HELP for help.”

3.2 Qualification Q1 (job type)
“What do you need help with? (Reply 1) {option1} (2) {option2} (3) Other”

3.3 Qualification Q2 (timing)
“When would you like this done? (1) ASAP (2) This week (3) Next 2–4 weeks”

3.4 Booking offer
“Thanks—want to book a quick call or appointment? Reply 1 for the next available time, or tell me a day/time window that works.”

3.5 Confirmation
“Confirmed: {date_time} with {business_name}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

3.6 Missed-call textback (if enabled)
“Sorry we missed you—this is {business_name}. What service do you need help with, and what’s your address or ZIP? Reply STOP to opt out, HELP for help.”

3.7 Re-engagement (1 follow-up max unless user responds)
“Hi {first_name}—checking in on your {service} request. Do you still want a quote or to book a time? Reply STOP to opt out, HELP for help.”

4) STOP/HELP handling implementation spec (Twilio-compatible)
4.1 Keywords (case-insensitive; trim whitespace; treat punctuation as separators)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

4.2 Behavior
On inbound STOP keyword:
- Immediately mark phone number as “suppressed_sms = true” (global across all clients).
- Send a single confirmation message:
  “You’re unsubscribed and will no longer receive texts from {business_name}. Reply START to re-subscribe.”
- Do not send any additional outbound messages after suppression (including queued messages). Cancel queued.

On inbound HELP keyword:
- Send:
  “{business_name} SMS help: reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
- Do not change subscription state.

Optional START handling (only if you choose to support it):
- If user sends START and number is suppressed, un-suppress and reply:
  “You’re re-subscribed. Reply STOP to opt out, HELP for help.”

4.3 Logging (minimum fields)
- event_id, timestamp_utc, phone_e164, client_id, inbound_message_body, matched_keyword, action_taken (suppress/help/none), outbound_message_sid (if replied), source (twilio_webhook), ip (if applicable).

4.4 Verification matrix (quick manual test)
- From a real handset: send “HELP” → receive help message.
- Send “STOP” → receive unsubscribe confirmation.
- Trigger any outbound flow → ensure blocked (no message sent; log indicates suppressed).

5) Quiet hours implementation spec (timezone + queuing)
5.1 Default sending window
- Allowed: 08:00–20:00 recipient local time.
- If message is triggered outside window: queue to next allowed time (08:05 next open day recommended to avoid exact-hour spikes).

5.2 Timezone resolution order
1) Lead-provided timezone (if captured)
2) Geo from lead ZIP/address (if captured)
3) Phone number area code mapping (best-effort)
4) Client/account default timezone

5.3 Edge cases
- Daylight savings: use IANA TZ database (e.g., America/Chicago).
- User replies after hours: inbound is allowed; outbound responses should be queued unless the user explicitly asks “call now” / “urgent” and you have an override policy.

6) Deliverability guardrails (minimum viable)
- Avoid link shorteners; use full domains.
- Avoid excessive caps, repeated punctuation, “FREE!!!”, “act now”, “guaranteed”, “cash”, “loan”, “credit”.
- Keep first message < 240 chars where possible.
- Identify business name in message 1.
- Do not send more than 1 re-engagement message without user response.
- Keep templates consistent; carriers reward stable patterns.

7) Twilio notes (pilot stage)
- Use a Messaging Service if possible to manage sender, sticky sender, and opt-out handling.
- A2P 10DLC registration may be required for long-code at scale; start when pilots show traction to avoid delays. (No spend is committed in this document.)

8) Agency “what to do today” (fast onboarding)
1) Paste the relevant opt-in snippet into the client’s form/ad.
2) Ensure Terms/Privacy URLs exist; if not, publish them and update [TERMS_URL]/[PRIVACY_URL].
3) Turn on STOP/HELP handling and verify with a real phone.
4) Turn on quiet hours (8a–8p local) and verify a queued send.
5) Keep templates as provided until deliverability is proven.

Support/legitimacy (include in client comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Email: agent_bob_replit+lead-copilot@agentmail.to