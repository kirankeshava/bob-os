# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:19:43.142Z

---

Business legitimacy / support
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Compliance checklist (MV = minimum viable for pilots)
MV requirements to send SMS for lead response:
A. Consent capture (opt-in language present at the point of lead capture)
- Must clearly state: texts will be sent, message frequency estimate, “Msg & data rates may apply”, and STOP/HELP instructions.
- Must identify sender ("[Business Name]" / "[Company] team") and purpose (responding to inquiry, scheduling, estimate).
- Must not be pre-checked if using a checkbox (recommended). If no checkbox, include disclosure near the submit button.

B. STOP/HELP handling (non-negotiable)
- STOP keywords immediately suppress all future outbound messages to that number across all client accounts OR at least within the client subaccount.
- HELP returns support info (business name + support email + STOP guidance).

C. Quiet hours
- Do not send marketing-like texts during night hours; for lead-response, still avoid 9pm–8am local time unless the user initiated and is actively texting.
- If a message is generated during quiet hours, queue it for next allowed time window.

D. Consent logging
- Log: when/where consent was captured, the exact disclosure version shown, source (FB lead ad, web form), IP/UA if available, and timestamps.

E. Content safety
- No deceptive language, no excessive capitalization, no “free!!!” style copy, no link shorteners.
- Include STOP in first message and periodically thereafter.

2) Copy/paste opt-in language (agencies)
Replace [BUSINESS], [PHONE], [PRIVACY_URL], [TERMS_URL].

2.1 Webflow / generic website form (no checkbox; place above submit)
“By submitting, you agree to receive text messages from [BUSINESS] about your request, scheduling, and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

2.2 Webflow / recommended checkbox version
Checkbox label:
“I agree to receive text messages from [BUSINESS] about my request and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Below checkbox (small text):
“Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

2.3 Typeform (place in description text near submit)
“Consent: By continuing, you agree to receive text messages from [BUSINESS] about your inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

2.4 Meta/Facebook Lead Ads (paste into ‘Privacy Policy’ + custom disclaimer)
Custom disclaimer (short):
“By submitting, you agree to receive text messages from [BUSINESS] about your request and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Link fields:
- Privacy Policy URL: [PRIVACY_URL]
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

3) Message templates (compliant, deliverability-safe)
Guidelines:
- Keep first message under ~240 chars where possible.
- Personalize with first name + service requested.
- Avoid link shorteners; if using a link, use the business domain.

3.1 First response (immediate)
“Hi {first_name} — this is {agent_name} with [BUSINESS]. Got your request for {service}. A few quick questions so we can book you fast: 1) What’s your address/ZIP? Reply STOP to opt out.”

3.2 Qualification question (choose 2-4 max)
“Thanks. 2) When would you like us to come out — ASAP, this week, or next week? Reply STOP to opt out.”

3.3 Booking prompt
“Perfect. I can get you on the calendar. What’s the best day/time window? (AM/PM works). Reply STOP to opt out.”

3.4 Confirmation
“Booked: {date} {time_window}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

3.5 Missed-call textback
“Sorry we missed you — this is [BUSINESS]. Text us your name + what you need and we’ll get you scheduled. Reply STOP to opt out.”

3.6 Re-engagement (only if prior consent exists; keep gentle)
“Hi {first_name} — checking in: do you still want help with {service}? Reply YES to book, or STOP to opt out.”

4) STOP/HELP handling — engineering implementation spec (Twilio-compatible)
4.1 Keywords (case-insensitive, trim punctuation)
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO

4.2 Behavior
On inbound STOP keyword:
1) Mark phone_number as suppressed=true immediately.
2) Write log event: event_type=opt_out, channel=sms, source=inbound_keyword, keyword_received, timestamp, client_id.
3) Send one final confirmation message:
“You’re opted out from [BUSINESS] texts. No more messages will be sent. Reply HELP for help.”
4) Block any future outbound attempts to suppressed numbers (hard fail with logged reason “suppressed”).

On inbound HELP keyword:
Send:
“[BUSINESS] SMS support. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Log event_type=help.

4.3 Suppression scope
- Minimum: per-client suppression.
- Preferred: global suppression across all clients if the same sending numbers are reused (safer for compliance).

4.4 Acceptance tests
- If user texts “STOP”, the very next outbound send attempt is blocked.
- STOP confirmation is the last message sent.
- HELP always responds even if user is suppressed (allowed), but does not unsuppress.

5) Quiet hours by timezone — implementation spec
5.1 Default rule
- Allowed window: 8:00am–8:59pm recipient local time.
- Outside window: queue message for next allowed time (8:05am next day).

5.2 Timezone resolution order
1) If lead provides ZIP/address, map to timezone.
2) Else if phone number country/area code mapping is available, infer.
3) Else use business timezone as fallback (log timezone_confidence=low).

5.3 Active conversation exception (optional MV)
- If user sent an inbound message within last 15 minutes, allow responses even if outside quiet hours (still avoid after 11pm local). Log override_reason=active_conversation.

5.4 Owner override
- If an operator manually triggers “send now”, allow but log override_user + reason.

6) Consent logging schema (MV)
Store a ConsentEvent record:
- lead_id, phone_e164, client_id
- consent_status: opted_in | opted_out
- consent_source: webflow | typeform | fb_lead_ads | manual | import
- consent_text_version (hash or version string)
- consent_captured_at (UTC)
- page_url / form_id / ad_id (when available)
- ip_address, user_agent (when available)
- proof_snapshot (optional): store the exact disclosure string shown
- opt_out_at (UTC) + opt_out_keyword (if applicable)

7) Deliverability hardening (Twilio MV)
- Use a Twilio Messaging Service (not direct from individual numbers) so you can attach multiple numbers and manage throughput.
- Keep content transactional: “about your request/scheduling”. Avoid “limited time offer”, “click now”, “guaranteed”, heavy emojis, excessive punctuation.
- Don’t include more than 1 link in first message; avoid URL shorteners.
- Consistent brand identification in first message.

A2P 10DLC note (week 1 / no spend):
- Prepare brand & campaign details now; registration may later require carrier fees depending on Twilio/account.
- Campaign description should match: “Conversational lead response + appointment scheduling for customers who requested service.”

8) Agency go-live checklist (copy/paste)
1) Add opt-in disclosure (section 2) to the lead source.
2) Confirm legal links (Privacy/Terms) are live and correct.
3) Confirm first SMS includes business identification + STOP.
4) Run STOP/HELP tests:
- Send “HELP” → receives support message.
- Send “STOP” → receives opt-out confirmation, then no further texts.
5) Verify quiet hours: create a test lead during quiet hours; confirm message is queued for next window.
6) Keep proof: export consent event + STOP event logs for the pilot folder.

If anything looks off, contact agent_bob_replit+lead-copilot@agentmail.to and reference the product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
