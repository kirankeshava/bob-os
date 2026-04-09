# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Eng Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:03:17.351Z

---

Below is the minimum-viable compliance/deliverability package designed to prevent pilot failure (carrier filtering, complaint risk, or Twilio enforcement) while keeping implementation lightweight.

BUSINESS IDENTIFIERS (use in all onboarding/compliance references)
- Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Replace these placeholders once published:
  - Privacy Policy URL: {PRIVACY_URL}
  - Terms URL: {TERMS_URL}

1) OPT‑IN / CONSENT LANGUAGE (COPY/PASTE)
Goal: capture express written consent for SMS (TCPA-style), disclose frequency, STOP/HELP, and link to legal.

A) Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request from {Company Name} at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. By submitting, you agree to the Terms ({TERMS_URL}) and Privacy Policy ({PRIVACY_URL}).”
Implementation notes:
- Checkbox must be unchecked by default.
- Store: checkbox true/false, timestamp, page URL, IP (if available), and form fields.

B) Typeform (statement + required short answer)
Typeform statement (near phone field):
“By providing your number, you consent to receive texts about your request from {Company Name}. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Optional required question:
“Do you agree to receive SMS updates about your request?” (Yes/No)

C) Meta/Facebook Lead Ads (settings + lead form disclaimer)
In the Lead Form “Custom disclaimer”:
“By submitting this form, you consent to receive text messages from {Company Name} about your request at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Operational note: export/store a copy of the lead form version and timestamp for audit.

2) DEFAULT MESSAGE TEMPLATES (LOW-RISK, HIGH-DELIVERABILITY)
Guidelines: keep short, no ALL CAPS, avoid excessive punctuation, avoid “free!!!/limited time!!!”, include business identification early, include STOP/HELP at least in first message and periodically.

Template 1 — First response (immediate)
“Hi {first_name}—this is {agent_name} with {Company Name}. Got your request for {service}. What’s the address (city/zip) and when would you like service? Reply STOP to opt out.”

Template 2 — Qualification question (1–2 steps max)
“Thanks. Is this for a home or business? And is it urgent (today/this week) or flexible? Reply STOP to opt out.”

Template 3 — Booking handoff
“Perfect—want to book a quick call or an on-site estimate? Share 2 times that work. Reply STOP to opt out.”

Template 4 — Missed-call textback (if applicable)
“Sorry we missed you—this is {Company Name}. Text us what you need help with and we’ll get you scheduled. Reply STOP to opt out.”

Template 5 — Help message (in response to HELP)
“{Company Name} SMS support: agent_bob_replit+lead-copilot@agentmail.to. Msg frequency varies. Reply STOP to opt out. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

3) STOP/HELP HANDLING — IMPLEMENTATION SPEC (TWILIO-STYLE)
Minimum viable requirement: if a user sends STOP (or variants), immediately confirm opt-out and block all future outbound messages to that number across all clients (global suppression), unless the user later re-subscribes.

A) Keyword matching (case-insensitive, trim whitespace/punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
START keywords (optional resubscribe): START, YES, UNSTOP

B) Behavior rules
- On inbound STOP keyword:
  1) Add phone number to GlobalSuppressionList with reason=“user_opt_out_sms”, timestamp, source="inbound_keyword", last_message_body.
  2) Send confirmation (single message):
     “You’re opted out from {Company Name} texts. No more messages will be sent. Reply START to re-subscribe.”
  3) Do not send any additional messages after confirmation.
- On inbound HELP keyword:
  Send Template 5 (help message) and do NOT change subscription state.
- On outbound send attempt:
  If number is in GlobalSuppressionList => block send, log “blocked_opt_out”.
- On inbound START/YES (optional):
  Remove from GlobalSuppressionList only if you can tie to a new opt-in event; otherwise keep suppressed and instruct user to re-submit the form.

C) Audit logging (minimum fields)
- event_id, event_type (opt_in, outbound_send, inbound_message, opt_out, help, blocked_opt_out)
- phone_e164, client_id, lead_id
- message_body (or hash), timestamp_utc, provider_message_id
- source (webflow/typeform/meta/manual)

4) QUIET HOURS BY TIMEZONE — IMPLEMENTATION SPEC
Minimum viable: avoid sending between 9pm–8am local time of the lead.

A) Timezone resolution order
1) Lead postal code => map to timezone
2) Lead state/city => map to timezone
3) Area code mapping (fallback)
4) If unknown => default to America/New_York (or the client’s timezone) and mark timezone_confidence="low"

B) Quiet window
- Default allowed window: 08:00–21:00 local time (configurable per client)

C) If message would send during quiet hours
- Queue message for next allowed time (e.g., 08:05 local)
- Log event: outbound_queued_quiet_hours with scheduled_send_time

D) Overrides
- If lead explicitly texts first, you may reply within quiet hours for the next 30 minutes (optional; log “user_initiated_override”).

5) TWILIO DELIVERABILITY HARDENING (NO-SPEND DEFAULTS)
- Use a Twilio Messaging Service (even with one number): enables better routing, compliance features, and scaling.
- Keep initial messages conversational and specific to the request; avoid marketing language.
- Include business name in first message.
- Avoid URLs in the first message where possible; if needed, use your own domain/short links and not generic shorteners.
- Maintain low complaint risk: opt-in checkbox, clear disclosures, fast STOP compliance.

A2P 10DLC note (US long code):
- If using US local long codes at any scale, assume A2P registration is required to protect deliverability.
- Start registration once you have: legal business name, EIN (if applicable), business address, website, privacy/terms URLs, use-case description (“conversational/2-way customer care + appointment scheduling”), and sample messages (use templates above).

6) AGENCY HANDOFF (WHAT TO DO IN 30 MINUTES)
1) Add the opt-in checkbox/disclaimer to the lead capture source (Webflow/Typeform/Meta) using the snippets above.
2) Ensure phone is captured and passed to the Copilot in E.164 format.
3) Confirm STOP/HELP keywords are enabled and tested:
   - Text STOP => receive opt-out confirmation; verify no further sends.
   - Text HELP => receive support + terms/privacy.
4) Confirm quiet hours: simulate a lead at 10:30pm local; verify message is queued for next morning.
5) Save evidence: export consent log row + screenshot of form disclaimer + one STOP test log.

Support: agent_bob_replit+lead-copilot@agentmail.to | Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
