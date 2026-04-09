# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:26:25.578Z

---

Below is the Minimum Viable Compliance (MVC) pack designed to remove sales objections and prevent carrier/TCPA/CTIA enforcement while launching paid pilots fast.

BUSINESS ID (use in all customer-facing compliance copy)
- Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

A) MVC LAUNCH CHECKLIST (DO THESE, DEFER THE REST)
1) Consent capture present on every lead source (form/ads) with TCPA-style “automated texts” disclosure.
2) First outbound message includes: business identification + why they’re being texted + STOP + HELP.
3) STOP handling: inbound STOP-family keywords immediately suppress the recipient; send one confirmation; block all future sends unless re-consented.
4) HELP handling: return support contact + brief instructions.
5) Quiet hours: do not text outside local hours; queue and send at next allowed window.
6) Consent logging: store proof of consent (timestamp, source, language version, IP/user agent when available).

B) COPY/PASTE OPT‑IN LANGUAGE (AGENCIES)
Use ONE of the following depending on the lead source. Keep it near the submit button.

1) WEBFLOW / WEBSITE FORM (checkbox recommended)
Checkbox label:
“I agree to receive automated text messages from [BUSINESS NAME] about my request. Message & data rates may apply. Reply STOP to opt out, HELP for help.”

Small text under submit button (or next to checkbox):
“By submitting, you consent to receive automated SMS from [BUSINESS NAME] at the number provided regarding your inquiry, including appointment scheduling and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 for more info. Support: agent_bob_replit+lead-copilot@agentmail.to.”

Implementation notes (minimum viable):
- If you cannot add a checkbox, the disclosure must be clearly visible near the submit button.
- Store whether the checkbox was checked (true/false) and the exact disclosure text/version shown.

2) TYPEFORM
Add a required “Legal” statement right before submission:
“By submitting, you agree that [BUSINESS NAME] may contact you via automated text at the number provided about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

3) META / FACEBOOK LEAD ADS
In the lead form “Privacy policy” and “Custom disclaimer” area, paste:
“By submitting this form, you consent to receive automated SMS from [BUSINESS NAME] about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

C) MVC MESSAGE TEMPLATES (SAFE DEFAULTS)
These are designed to minimize spam triggers (no excessive caps, no “free!!!”, no URL shorteners). Replace bracketed fields.

1) FIRST MESSAGE (immediate)
“Hi {first_name}—this is {agent_name} with {business_name}. We got your request for {service}. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

2) QUALIFICATION (short, high intent)
Option A:
“Thanks—what timeframe are you looking for (today/this week/next week)? Reply STOP to opt out, HELP for help.”

Option B:
“Got it. Is this for a residential or commercial property? Reply STOP to opt out, HELP for help.”

3) BOOKING (offer two times)
“I can get you scheduled. Does {time_option_1} or {time_option_2} work? Reply STOP to opt out, HELP for help.”

4) MISSED-CALL TEXTBACK (if you use call tracking)
“Sorry we missed you—this is {business_name}. What service do you need and what’s your ZIP? Reply STOP to opt out, HELP for help.”

D) STOP/HELP HANDLING — IMPLEMENTATION RULES (MVC)
1) Keywords (case-insensitive; trim whitespace/punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
2) STOP behavior:
- Immediately mark recipient as “suppressed=true” (global suppression list per business/account).
- Send exactly one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- Block all further outbound messages to that number unless explicit re-consent is captured (recommended: require a new form submission/checkbox; do not rely on START alone if your use case requires strict proof).
3) HELP keywords:
HELP, INFO
4) HELP response:
“{business_name}: We text about your service request/appointments. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

Required logging fields (minimum viable audit trail):
- phone_e164
- event_type: consent_captured | outbound_sent | inbound_received | stop_received | help_received | suppressed | suppressed_block
- timestamp_utc
- message_body (for inbound) or template_id (for outbound)
- consent_source (webflow | typeform | meta | manual)
- consent_text_version (store the exact disclosure string or a version hash)
- lead_id / form_submission_id

E) QUIET HOURS (MVC) — IMPLEMENTATION SPEC
Goal: Never text at night locally; if lead arrives at night, queue and send at next window.

1) Default allowed window:
- 08:00–20:00 recipient local time, Monday–Saturday
- Sunday: 10:00–18:00 local time (optional; if unsure, use 08:00–20:00 all days)
2) Timezone resolution order:
- If lead has explicit timezone field, use it.
- Else if lead has ZIP/postal code, map ZIP→timezone.
- Else use business’s configured timezone.
3) Behavior:
- If a lead arrives outside the window: send nothing immediately; enqueue the first message for the next allowed time.
- If multiple messages are queued, send in order with a minimum 2–3 minute spacing to avoid burst flags.
4) Edge cases:
- If timezone is unknown: treat as business timezone and log “tz_fallback=true”.
- Daylight savings: rely on IANA timezone (e.g., America/Chicago), not a fixed offset.

F) AGENCY HANDOFF — GO-LIVE STEPS (COPY/PASTE)
1) On the lead form/ad, paste the matching opt-in disclosure from section B.
2) Ensure the form collects:
- First name
- Mobile phone
- Service requested (dropdown or free text)
- ZIP or address (for timezone + routing)
3) Confirm the first SMS template (section C1) is the one that triggers immediately.
4) Run a 5-minute compliance test:
- Submit a test lead with your own phone during allowed hours → confirm message arrives and includes STOP/HELP.
- Reply HELP → confirm you receive the HELP message.
- Reply STOP → confirm you receive the opt-out confirmation.
- Submit another test lead to the same phone → confirm no messages are sent and a “suppressed_block” log appears.
5) If using Twilio:
- Use a Messaging Service (not a single number hard-coded) and attach the number(s) to it.
- Avoid link shorteners; avoid high-risk content (credit repair, payday, cannabis, etc.).

This MVC pack is intentionally small: it’s enough to launch pilots, prevent the most common carrier issues, and answer “are you TCPA compliant?” without slowing distribution.