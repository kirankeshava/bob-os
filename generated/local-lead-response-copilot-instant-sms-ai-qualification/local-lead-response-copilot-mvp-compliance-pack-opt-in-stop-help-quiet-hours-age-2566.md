# Local Lead Response Copilot — MVP Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:33:38.809Z

---

Business legitimacy references (include in any agency/customer-facing material)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal of this pack (wartime MVP)
Implement only what prevents launches from getting blocked or churned:
1) Clear express written consent language at opt-in
2) Working STOP/HELP handling with suppression
3) Quiet hours by recipient timezone (basic)
Everything else (advanced deliverability tuning, long legal pages, deep A2P) can follow after pilots are converting.

A) Copy/paste opt-in language (use exactly or close)

A1) Webflow / website form checkbox (recommended)
Add a required checkbox + short disclosure:
Checkbox label:
“I agree to receive text messages about my request from [Business Name] at the phone number provided.”
Under the checkbox (small text):
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (publish final links when available).”

Data to capture (minimum): phone, timestamp, page URL, checkbox=true, IP/user agent if available.

A2) Typeform (consent statement)
Add a “Legal” statement + required Yes/No:
Prompt:
“Do you agree to receive text messages regarding your request?”
Yes option text:
“Yes, text me updates and questions about my request.”
Legal text (below):
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (publish final links when available).”
Routing rule: Only send SMS if Yes.

A3) Meta/Facebook Lead Ads (privacy policy + custom disclaimer)
- Add the website URL as the Privacy Policy link.
- Add a “Custom Disclaimer” (or questions section) with:
“By submitting, you agree to receive text messages about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Support: agent_bob_replit+lead-copilot@agentmail.to.”

B) Compliant SMS templates (MVP set)
Guidelines:
- Identify business quickly
- Ask 1 question at a time
- No link shorteners; use full domains if links are needed
- Avoid “free!!!”, “act now”, excessive caps, repeated punctuation
- Include STOP/HELP at least in first message and periodically

B1) First contact (immediate)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job?”
(If required by your compliance posture, append):
“Reply STOP to opt out, HELP for help.”

B2) Qualification follow-up
“Thanks—when would you like us to come out: today, tomorrow, or this week?”

B3) Booking push
“Perfect. I can book you for {slot1} or {slot2}. Which works best?”

B4) Missed call text-back (if you also do call tracking)
“Sorry we missed you—this is {business_name}. What service do you need help with? Reply here and we’ll get you scheduled. Reply STOP to opt out.”

B5) HELP response (exact)
“You’re texting with {business_name} about your service request. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

C) STOP/HELP handling — implementation spec (Twilio-agnostic)

C1) Keywords
- STOP synonyms: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP: HELP, INFO
- START/UNSTOP (optional resubscribe): START, UNSTOP
Matching rules:
- Trim whitespace, case-insensitive
- If message body contains only the keyword (common carrier expectation). For safety, treat “stop” at beginning as STOP as well.

C2) Behavior
On STOP keyword received:
1) Immediately add recipient E.164 number to a global suppression list (per client/workspace + optionally master suppression)
2) Log event: type=STOP, timestamp, from_number, to_number, raw_body, channel=SMS, source=provider webhook id
3) Send one confirmation message:
“You’re opted out from {business_name} texts. No more messages will be sent. Reply START to resubscribe.”
4) Block all future outbound messages to that number for that client until resubscribed

On HELP keyword received:
1) Log event type=HELP
2) Respond with B5 HELP response (above)

On START/UNSTOP received:
1) Remove from suppression list (or mark resubscribed)
2) Log event type=START
3) Confirm:
“You’re resubscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”

C3) Outbound guardrail
Before sending any SMS:
- Check suppression list. If suppressed, do not send. Log blocked_outbound with reason=suppressed.

C4) Minimal audit fields (consent logging)
Store per lead:
- lead_id
- phone (E.164)
- consent_status (true/false)
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (string)
- consent_timestamp (UTC)
- consent_page_url (if applicable)
- ip/user_agent (if available)
Store per message:
- direction inbound/outbound
- timestamps
- template_name (if any)
- body
- status (sent/delivered/failed)

D) Quiet hours by timezone — implementation spec (MVP)
Objective: avoid sending texts at night locally.

D1) Default quiet window
- Quiet hours: 9:00 PM – 8:00 AM recipient local time (adjustable per client)

D2) Timezone resolution order
1) If lead has explicit timezone field (best)
2) Else infer from lead ZIP/postal code (US)
3) Else infer from area code (fallback)
4) Else default to client’s timezone and mark timezone_confidence=low

D3) Behavior
When an outbound message is requested:
- Compute recipient local time
- If inside quiet hours:
  - Queue message for next allowed time (8:05 AM local)
  - If this is the very first response and the lead just submitted: optionally send a single “receipt” message only if allowed; otherwise queue it
- If outside quiet hours: send immediately

D4) Overrides
- Admin/owner manual override flag: “send_anytime=true” for specific conversations (use sparingly)
- Emergency categories: OFF by default (home services generally not emergency unless client explicitly enables)

E) Agency handoff — copy/paste steps (no code)

E1) What agencies must implement on day 0
1) Add consent language to the lead capture source (Webflow/Typeform/Meta) using section A
2) Ensure phone number is required and formatted (collect country if outside US)
3) Confirm the first SMS template (B1) includes business identification and avoids links on first touch
4) Confirm STOP/HELP keywords are supported by the sending system (or your integration)
5) Agree on quiet hours window (default 9pm–8am)

E2) Go-live verification checklist (15 minutes)
- Submit a test lead with your own phone number
- Confirm first SMS arrives within 60 seconds (outside quiet hours)
- Reply “STOP” and confirm you receive the opt-out confirmation
- Trigger another outbound message attempt and confirm it is blocked (no SMS received)
- Reply “HELP” (from a non-suppressed number) and confirm the help message returns support email
- Test quiet hours by temporarily setting quiet window to “now” and confirming messages queue instead of send

E3) If something breaks (support routing)
Email agent_bob_replit+lead-copilot@agentmail.to with:
- client name
- your test phone number (E.164)
- timestamps
- screenshots of received messages
- provider message SID/webhook logs if available

F) Deliverability MVP rules (so pilots don’t get filtered)
- Use consistent business name in first message
- Avoid sending multiple messages back-to-back; wait for a reply after 1–2 questions
- Avoid link shorteners and avoid including links in first touch unless necessary
- Keep templates conversational; no marketing claims
- Do not blast lists; only message fresh inbound leads who opted in

Owner/engineering note (what to implement first)
If engineering time is limited: implement suppression list + STOP/HELP + outbound guardrail first. Quiet hours can be implemented as “queue until 8am” using a single timezone default, then improved with ZIP/area code inference.
