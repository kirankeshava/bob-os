# Local Lead Response Copilot — Compliance + Deliverability Hardening: STOP/HELP Verification, Quiet Hours Spec, and Agency Handoff (Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:29:50.141Z

---

Business reference (use in customer/agency comms)
- Product/site legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

1) Agency Handoff Instructions (copy/paste + steps)
Goal: ensure every lead source captures compliant SMS consent, every outbound includes STOP/HELP support, opt-outs are honored globally, and texts avoid quiet hours.

A. What you (the agency) must provide
- Business/legal name + DBA
- Business website + service area
- Booking link (Calendly/Jobber/Housecall Pro/etc.) or preferred call routing
- Lead sources (Webflow form / Typeform / Meta Lead Ads / other)
- (Optional) Existing phone number to text-enable; otherwise we provision a new number

B. What Local Lead Response Copilot does
- Instantly texts new leads
- Asks 2–4 qualifying questions
- Routes to booking/call based on answers
- Logs consent + opt-outs
- Suppresses all future texts after STOP

C. Go-live checklist (agency)
1) Add opt-in language to every form/ad (templates below). No opt-in → no SMS.
2) Ensure your privacy policy/terms links are present on the form page (or in ad disclaimer). If you don’t have them, email agent_bob_replit+lead-copilot@agentmail.to.
3) Confirm lead fields captured: phone, name, zip (optional), service type (optional).
4) Confirm quiet hours for your locale (default below).
5) Run STOP/HELP tests before launch (verification plan below).

2) Opt-in/Consent Copy (paste-ready)
Important: Do not pre-check consent boxes. Consent should be explicit.

A) Webflow (checkbox + short disclosure)
Checkbox label:
“I agree to receive text messages about my request.”

Disclosure text (place under checkbox):
“By submitting, you agree to receive SMS messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. View terms: [TERMS_URL] and privacy: [PRIVACY_URL].”

B) Typeform (statement + optional yes/no)
Statement:
“By providing your phone number, you agree to receive SMS messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Optional required yes/no question:
“Do you agree to receive texts about your request?” Yes / No
(Only send SMS if Yes.)

C) Meta/Facebook Lead Ads
In the “Privacy Policy” link field: use your Privacy URL.
Add to the custom disclaimer/description:
“By submitting, you consent to receive SMS texts from [BUSINESS NAME] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

3) Default Message Templates (compliant + deliverable)
Guidelines baked in: identify the business, stay on-topic (the user’s request), keep links minimal, avoid all-caps, avoid “free!!!” bait, include STOP/HELP line.

A) First message (immediate)
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. A couple quick questions so we can help—what’s the address or ZIP for the job?”

B) Qualification Q2 (job timing)
“Thanks—when are you looking to get this done? (Today/This week/Next week/Just pricing)”

C) Qualification Q3 (scope)
“Got it. Briefly, what’s the main issue or what work do you need?”

D) Booking offer
“We can get you scheduled. Want the next available time, or a specific day/time? If you prefer, you can book here: {booking_link}”

E) Confirmation
“You’re all set for {date_time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

F) Missed-call text back (if inbound call missed)
“Sorry we missed your call—this is {business_name}. How can we help, and what’s the job address/ZIP? Reply STOP to opt out, HELP for help.”

G) Re-engagement (only if still within consent window/policy)
“Hi {first_name}, checking back—do you still need help with {service}? If yes, what day works best? Reply STOP to opt out, HELP for help.”

4) STOP/HELP Handling — Implementation Spec + Verification Plan

A. Required keyword handling (case-insensitive, ignore punctuation)
STOP keywords (treat all as opt-out):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords:
HELP, INFO

B. STOP behavior (must)
1) Immediately mark the phone number as “globally opted out” for that business/tenant.
2) Cancel any queued/scheduled messages.
3) Block all future outbound SMS to that number (including automations) until explicit re-opt-in.
4) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
5) Log the event with timestamp, source (“inbound_sms”), keyword, and message SID/provider ID.

C. HELP behavior (must)
Send ONE message:
“{business_name}: We text about your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Log HELP request.

D. Re-opt-in behavior (recommended)
If a user previously opted out, do NOT resume texting from messages like “ok” or “yes.” Require an explicit opt-in keyword such as:
“START” or “UNSTOP” (choose one), plus a confirmation message:
“Thanks—you're opted back in to texts from {business_name}. Msg & data rates may apply. Reply STOP to opt out.”

E. Verification plan (run in staging before every new client launch)
Test Matrix (each row should be logged and screenshot-able):
1) Inbound “STOP” → system sends opt-out confirmation; suppress list updated; further outbound blocked.
2) Inbound “stop” (lowercase) → same result.
3) Inbound “Unsubscribe” → same result.
4) Inbound “STOP!!” (punctuation) → same result.
5) After STOP, attempt to send a manual message from UI/workflow → should be blocked with reason “opted_out”.
6) Inbound “HELP” → help message returned.
7) Inbound “INFO” → help message returned.
8) If re-opt-in supported: inbound “START” after STOP → opt-in confirmation + outbound allowed.

Expected log fields (minimum):
- tenant_id/business_id
- lead_id (if known)
- phone_e164
- event_type: inbound_message | outbound_message | opt_out | help | opt_in
- provider: twilio
- provider_message_sid
- keyword_detected (STOP/HELP/START)
- suppression_state_before/after
- created_at (UTC)

5) Quiet Hours — Timezone + Scheduling Spec

A. Defaults (editable per client)
- Quiet hours window: 8:00pm – 8:00am recipient local time
- Days: all days (or optionally stricter on Sundays)

B. Timezone resolution (priority order)
1) If lead has ZIP/postal code → map ZIP to timezone.
2) Else if lead has state/city → infer timezone.
3) Else if phone number country/area code mapping available → infer timezone (lower confidence).
4) Else default to client’s business timezone.

C. Scheduling behavior
- If a lead arrives inside quiet hours: queue the first message to the next allowed time (e.g., 8:05am local).
- If multiple messages are queued (qualification flow): send only the first at the next allowed time; wait for response before sending subsequent questions.
- If the user messages first during quiet hours: you may respond once with a minimal acknowledgement if policy allows, but safest default is still to queue until allowed time unless client explicitly enables “respond-to-inbound override.”

D. Daylight savings + edge cases
- Store timezone as an IANA zone (e.g., America/Chicago), not a fixed UTC offset.
- All quiet-hour checks should be performed at send-time (not only at scheduling-time) to handle DST changes.

E. Owner override
Allow a per-tenant setting: “Allow sends during quiet hours for hot leads” default OFF. If ON, log override reason and who enabled it.

6) Twilio Deliverability Hardening Notes (A2P 10DLC readiness + content rules)

A. Messaging Service (recommended)
- Use a Twilio Messaging Service per tenant (or per vertical) with:
  - Sticky Sender ON (keeps consistent number per recipient)
  - Smart Encoding ON
  - Fallback to alternate number in the pool (if available)
  - Status callbacks enabled for delivery tracking

B. A2P 10DLC
- If using US long codes at scale, register Brand + Campaign.
- Campaign description should clearly match: “Responding to customer inquiries and scheduling appointments for local services.”
- Message samples should include STOP/HELP language.

C. Content lint rules (reduce filtering)
- Avoid excessive links; prefer one booking link max.
- Avoid URL shorteners.
- Avoid all-caps, heavy punctuation, and repeated promotional terms (“FREE!!!”, “WIN”, “GUARANTEED”, “CLICK NOW”).
- Always reference the user’s request (contextual relevance improves carrier trust).
- Identify the business early (“this is {business_name}”).

D. Fallback behaviors
- If message fails with policy/blocked/undelivered: stop automation and notify internal channel/email.
- If a number is flagged as unreachable/invalid: mark lead as “sms_unreachable” and route to call/email.

7) Support + Escalation
- For agencies needing updated opt-in language, proof of consent logging, or carrier questions, contact: agent_bob_replit+lead-copilot@agentmail.to
- Legitimacy reference page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Owner note: The only remaining blockers to go fully production-grade are (1) publishing real Terms/Privacy pages to replace placeholders and (2) confirming the exact SMS webhook/provider integration points so STOP/HELP can be verified end-to-end with real inbound message events and logs.