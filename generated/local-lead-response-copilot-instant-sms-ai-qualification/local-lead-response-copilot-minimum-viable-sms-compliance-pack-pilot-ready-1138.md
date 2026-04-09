# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:53:15.803Z

---

This document is the Minimum Viable Compliance (MVC) pack to launch paid pilots safely while minimizing implementation time. It is designed for Local Lead Response Copilot (Instant SMS + AI Qualification) and can be handed to an agency/client as copy/paste blocks.

Business legitimacy references (include in proposals and onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) MVC OPT-IN LANGUAGE (copy/paste)
Goal: capture express consent for SMS + automated messaging at the point of lead capture.

A) Webflow / generic website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages from [BUSINESS NAME] about my request (including automated texts). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Under the form (small text):
“By submitting, you confirm you are the owner/user of the phone number provided. Consent is not a condition of purchase. Support: agent_bob_replit+lead-copilot@agentmail.to. Privacy/Terms: [PRIVACY_URL] | [TERMS_URL].”

Data fields to store with the lead (MVC logging): phone, timestamp, IP (if available), page/form name, checkbox value, and the exact consent text version.

B) Typeform consent statement
Add a Yes/No question: “SMS consent” (default = No).
Prompt:
“Can we text you about your request? We may use automated texts. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent isn’t required to buy.”
If Yes: proceed. If No: route to email-only follow up.

C) Meta/Facebook Lead Ads (primary text + custom disclaimer)
Add to the form’s custom disclaimer (or questions/description section):
“By submitting, you agree to receive text messages from [BUSINESS NAME] about your request, including automated texts. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy/Terms: [PRIVACY_URL] | [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

2) MVC MESSAGE TEMPLATES (low-spam, compliant)
General rules:
- Identify the business quickly.
- Be directly related to the user’s request.
- Avoid ALL CAPS, excessive punctuation, link shorteners, and “promo/discount/free” language during pilots.
- Include STOP/HELP in the first message (and periodically if a conversation stretches).

Template 1 — First response (immediate)
“Hi {first_name} — this is {rep_name} with {business_name}. Got your request for {service}. A couple quick questions so we can get you the fastest quote. Reply STOP to opt out, HELP for help.”

Template 2 — Qualification Q1 (scope)
“First: what’s the address (or zip code) for the work?”

Template 3 — Qualification Q2 (timing)
“When are you looking to get this done? (Today / This week / Next week / Just pricing)” 

Template 4 — Booking prompt
“Thanks. Want to book a quick call or on-site estimate? Reply 1 for a call, 2 for an appointment, or tell me what time works.”

Template 5 — Missed-call text-back (if lead calls and misses)
“Sorry we missed you — this is {business_name}. What’s the best time to call you back about {service}? Reply STOP to opt out, HELP for help.”

3) STOP/HELP HANDLING — IMPLEMENTATION SPEC (MVC)
Objective: comply with carrier expectations and prevent texting after opt-out.

Keywords (case-insensitive, trim punctuation/whitespace):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO

Behavior:
A) On inbound STOP keyword:
1. Mark phone as “globally suppressed = true” immediately (across all clients/locations for safety during pilots).
2. Send one (and only one) confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
3. Block all future outbound messages to that number unless user explicitly re-consents via a new opt-in event.
4. Log event: phone, keyword, timestamp, conversation_id, business_id/location_id, raw inbound body.

B) On inbound HELP keyword:
Send:
“{business_name} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Log event similarly.

C) On other inbound messages:
Proceed with qualification/booking flows.

D) Outbound safety checks (required):
Before sending any SMS, check suppression list. If suppressed, do not send; log “blocked_outbound_due_to_optout”.

4) QUIET HOURS — IMPLEMENTATION SPEC (MVC)
Objective: avoid messages at night in the lead’s local time.

Default quiet hours window (pilot default):
- Allowed send window: 08:00–20:00 local time (lead timezone)
- Outside window: queue message for next allowed time

Timezone resolution order:
1) If lead provided zipcode/address: map to timezone.
2) Else if area code mapping available: infer timezone.
3) Else default to the business’s timezone (configured per location).

Queue behavior:
- If a new lead arrives at 22:30 local time: send an immediate internal notification (email/dashboard), but queue the first SMS to 08:05 local time.
- If multiple messages are queued: send only the most recent “next action” message at send time (avoid burst).

Edge cases:
- Daylight Savings Time: rely on IANA timezone IDs (e.g., America/Chicago), not fixed offsets.
- Owner override (optional): allow manual send, but show warning “Outside quiet hours”.

5) AGENCY HANDOFF (ONE-PAGER)
What the agency must do to go live:
1. Add MVC consent language to the lead form (Webflow/Typeform/FB Lead Ad). Use the snippets above.
2. Ensure the form captures phone number and stores consent = Yes (checkbox or question).
3. Provide Privacy/Terms URLs once published. Until then, use the business site URL to demonstrate legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
4. Configure notification routing (who gets booked calls/appointments).

Go-live verification (15 minutes):
A) Opt-in test: submit the form yourself; confirm first SMS arrives with business identification + STOP/HELP.
B) STOP test: reply “STOP”; confirm you receive opt-out confirmation and no further texts are sent.
C) HELP test: reply “HELP”; confirm support email is returned.
D) Quiet hours test (if possible): set lead timezone/test window; confirm messages queue outside 08:00–20:00.

If anything fails, email agent_bob_replit+lead-copilot@agentmail.to with (1) the phone number used, (2) timestamp, and (3) screenshot of messages.

6) DELIVERABILITY MVC GUIDELINES (do now; defer heavy work)
- Use a consistent sender (same number/service).
- Keep first message short and directly tied to the user’s request.
- Avoid link shorteners; if links are needed, use the business domain.
- Don’t send re-engagement blasts during pilots; only message recent opt-ins.

This MVC pack is intentionally minimal: it removes the #1 causes of pilot failure (unclear consent, missing STOP/HELP, and nighttime texting) while keeping implementation fast enough to support distribution and closing.