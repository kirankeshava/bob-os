# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Agency Handoff + STOP/HELP + Quiet Hours + Consent Logging)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:08:02.403Z

---

Below is the minimum-viable compliance/deliverability pack agencies can copy/paste to launch pilots safely. It is designed to remove the biggest sales objections and prevent carrier/TCPA issues.

REFERENCE LINKS (use in all disclosures)
- Product legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) COPY/PASTE OPT‑IN SNIPPETS (CONSENT LANGUAGE)
A) Webflow / Website form (below submit button)
“By submitting, you agree to receive SMS messages from [BUSINESS NAME] about your inquiry, scheduling, and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Privacy & Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (or your published Privacy/Terms links). Support: agent_bob_replit+lead-copilot@agentmail.to.”

B) Typeform (add to ‘Legal’ / description text)
“SMS consent: By providing your phone number, you agree to receive text messages about your request, appointment scheduling, and service updates. Msg frequency varies; msg/data rates may apply. Reply STOP to cancel, HELP for help. Consent not required to buy. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”

C) Meta/Facebook Lead Ads (Disclaimer / Privacy Policy link area)
Short disclaimer (paste in ‘Disclaimer’):
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request. Msg frequency varies. Msg/data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”
Privacy policy URL: use the legitimacy URL above (until your own privacy page is published).

2) DEFAULT FIRST MESSAGE TEMPLATE (COMPLIANT + DELIVERABLE)
Immediately on lead submission:
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. A couple quick questions to get you a fast quote: 1) What’s the address/ZIP? 2) When do you want service? Reply STOP to opt out, HELP for help.”

3) STOP/HELP HANDLING — IMPLEMENTATION SPEC (TWILIO)
Goal: Any inbound STOP must immediately suppress future outbound messages to that phone number across ALL clients/campaigns.

A) Keywords to handle (case-insensitive; trim punctuation/whitespace)
- STOP words: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP words: HELP, INFO
- Restart words: START, YES, UNSTOP

B) Behavior
- On receiving a STOP word:
  1) Mark recipient phone as “suppressed=true” in a GLOBAL suppression list (not per-campaign).
  2) Immediately send a single confirmation message:
     “You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
  3) Block ALL future outbound attempts to that phone. Do not send any other content, even transactional, unless user restarts.
- On receiving HELP:
  Respond:
  “{business_name}: We text about your inquiry/appointments. Msg frequency varies; msg/data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
- On receiving START/UNSTOP/YES:
  1) Remove from suppression list (suppressed=false) and log resubscribe timestamp.
  2) Send confirmation:
     “You’re re-subscribed. Reply STOP to opt out, HELP for help.”

C) Twilio wiring (typical)
- Configure inbound webhook for the sending number / Messaging Service to your endpoint (e.g., POST /twilio/inbound).
- Parse From, To, Body, MessageSid.
- If STOP: update suppression before any other routing.
- On outbound send: check suppression list first; if suppressed, do not call Twilio Messages API.

4) QUIET HOURS — MINIMUM VIABLE SPEC
Objective: Avoid texting during local late-night hours to reduce complaints and carrier filtering.

A) Default quiet window (recommended)
- Do not send outbound messages between 9:00 PM and 8:00 AM recipient local time.

B) Timezone resolution order
1) Lead-provided ZIP/address -> timezone lookup
2) Area code lookup from E.164 phone number
3) Business default timezone (configurable per client)

C) Behavior during quiet hours
- If a lead comes in during quiet hours: queue the first message for 8:00 AM local time.
- If a conversation is active (user replied within last 15 minutes): you may continue within quiet hours ONLY if user initiated the last message (safer), otherwise queue.
- Always honor STOP immediately (STOP messages are inbound; suppression is immediate regardless of time).

5) CONSENT LOGGING (AUDIT FIELDS)
Store these fields per lead and per message:
- lead_id, client_id
- consent_source (webflow/typeform/meta/manual)
- consent_timestamp_utc
- consent_text_version (hash or version label)
- landing_page_url or form_url
- ip_address (if available)
- phone_e164
- first_outbound_timestamp_utc
- message_direction (in/out), message_body, provider_message_id
- suppression_status (true/false) + suppression_timestamp_utc + suppression_reason (STOP keyword)

6) VERIFICATION TEST MATRIX (AGENCY GO‑LIVE CHECK)
Before launching ads/forms, run these manual tests with 2–3 real numbers:
1) New lead submission -> confirm first SMS arrives with STOP/HELP line.
2) Reply “HELP” -> confirm HELP response includes support email + link.
3) Reply “STOP” -> confirm opt-out confirmation arrives; then submit a new lead with same phone -> confirm NO outbound is sent.
4) Reply “START” -> confirm re-subscribe confirmation; submit new lead -> confirm outbound resumes.
5) Quiet hours: simulate a lead at 10:30 PM local time -> confirm queued for 8:00 AM and sends then.

7) CONTENT GUIDELINES (MINIMUM VIABLE DELIVERABILITY)
- Keep initial message short, specific to the inquiry, and avoid ALL CAPS.
- Avoid spammy phrases: “FREE!!!”, “WIN”, “GUARANTEED”, “ACT NOW”, excessive punctuation.
- Always identify the business quickly (“this is {name} with {business}”).
- Include STOP/HELP on first message and periodically thereafter.

This pack is intentionally minimal: it covers opt-in disclosure, STOP/HELP compliance, quiet hours, and logging—enough to launch pilots without predictable carrier/TCPA failures while distribution and closing stay the priority.