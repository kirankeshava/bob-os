# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Pilot-Safe) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:34:11.712Z

---

Purpose: enable pilots to send/receive SMS reliably without triggering carrier enforcement or TCPA/CTIA objections. This is the “minimum viable” pack—enough to launch safely while deferring heavier legal/process work until after first paid pilots.

Business proof / support:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum Compliance Checklist (pilot go/no-go)
A. Consent capture
- Lead source must include a clear SMS consent disclosure (checkbox or explicit language near submit).
- Disclosure must mention: automated texts, message frequency, “Msg & data rates may apply”, STOP/HELP keywords.
- Keep proof: store timestamp, source, page/form identifier, and the exact consent language version.

B. STOP/HELP + suppression
- MUST honor STOP immediately (no further outbound except one confirmation).
- MUST respond to HELP with support info.
- Maintain a global suppression list (per subaccount/location + global) and block all outbound sends to suppressed numbers.

C. Quiet hours
- Do not send marketing/qualification texts outside 8am–8pm recipient local time (configurable). If lead arrives after-hours, queue first message for next window.

D. Content basics (deliverability + compliance)
- No misleading claims, no excessive caps/punctuation, no link shorteners, avoid “free!!!/act now” style.
- Keep first message short, identify the business, and ask 1 question.
- If including a link, prefer your domain; keep to one link maximum per message.

2) Copy/Paste Opt-in Language (agencies)
Use one of these where leads are collected.

2.1 Webflow / Website form (recommended with checkbox)
Add a required checkbox label:
“I agree to receive texts from [Business Name] about my request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. By submitting, you agree to the Terms and Privacy: [Terms URL] | [Privacy URL].”
Implementation note: store a boolean “sms_consent=true” plus a hidden field “consent_version=v1.0”.

2.2 Typeform (statement + consent)
Add a Statement block above submit:
“By submitting, you agree to receive automated text messages from [Business Name] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [Terms URL] Privacy: [Privacy URL].”
Optional yes/no question:
“Can we text you about scheduling and next steps?” (Yes required to proceed)

2.3 Meta/Facebook Lead Ads (custom question)
In the lead form description or a custom question:
“By providing your phone number, you agree to receive automated text messages from [Business Name] regarding your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Terms: [Terms URL] Privacy: [Privacy URL].”

3) Compliant Message Templates (copy/paste)
Notes: Keep brand identification, keep it conversational, avoid spam triggers. Always support STOP/HELP.

3.1 First response (speed-to-lead)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. A quick question so I can help: is this for {city/area}? Reply YES/NO. Reply STOP to opt out.”

3.2 Qualification (2–3 short questions)
Q1 schedule urgency:
“Thanks—when are you looking to get this done? 1) ASAP 2) This week 3) Just pricing. Reply 1/2/3. Reply STOP to opt out.”
Q2 job details:
“Got it. What best describes the job? (Briefly) e.g., ‘leak under sink’ or ‘replace water heater’. Reply STOP to opt out.”

3.3 Booking / handoff
“Perfect. Want to book a quick call or on-site estimate? Reply 1) Call 2) Appointment. Reply STOP to opt out.”
If Call:
“What time works today? 1) Next 30 min 2) Later today 3) Tomorrow. Reply 1/2/3. Reply STOP to opt out.”

3.4 Missed-call text back
“Hi—sorry we missed you. This is {business_name}. What can we help with? Reply with a short description and we’ll get you scheduled. Reply STOP to opt out.”

3.5 Re-engagement (one follow-up max)
“Hi {first_name}, checking in—did you still need help with {service}? Reply YES and we’ll get you scheduled, or NO to close this out. Reply STOP to opt out.”

4) STOP/HELP Implementation Spec (Twilio-compatible)
Goal: deterministic compliance behavior with an auditable log.

4.1 Keywords
- STOP keywords (case-insensitive, trim punctuation): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- Optional: START / UNSTOP to re-opt-in ONLY if you have a compliant re-consent flow; otherwise respond with instructions to contact support.

4.2 Inbound message handler logic
On inbound SMS:
1) Normalize body: uppercase, trim, remove trailing punctuation.
2) If body matches STOP keyword:
   - Add {from_number} to suppression list immediately (global + per-location tag)
   - Log event: type=opt_out, timestamp, from_number, to_number, message_sid, source=STOP
   - Send ONE confirmation message:
     “You’re opted out from {business_name} texts. No more messages will be sent. Reply HELP for help.”
   - Do not send any other messages.
3) Else if body matches HELP keyword:
   - Log event: type=help
   - Respond:
     “{business_name}: We text about your service request and scheduling. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to and https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
4) Else: proceed with AI qualification flow ONLY if not suppressed.

4.3 Outbound send guard (hard block)
Before any outbound SMS:
- Check suppression list for destination number.
- If suppressed: do not send; log blocked_send with reason=suppressed.

4.4 Consent logging (minimum schema)
Store per lead:
- phone, first_name (if available)
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow/typeform/meta/manual
- consent_text_version: v1.0
- consent_captured_at (UTC)
- captured_page_url/form_id
- ip_user_agent (if available)
- opt_out_at (UTC) if applicable

5) Quiet Hours Implementation Spec (by recipient timezone)
Default window: 08:00–20:00 recipient local time (configurable per customer).

5.1 Timezone resolution order
1) If lead includes postal code/state/city: map to timezone.
2) Else infer from phone area code (approximate) + customer’s service area.
3) Else fallback to customer account timezone.

5.2 Behavior
- If lead arrives outside window: queue the “first response” for next allowed time (e.g., 8:05am local) and log queued_reason=quiet_hours.
- If within window: send immediately.
- If timezone unknown: treat as customer account timezone and mark tz_confidence=low in log.

5.3 Overrides
- Admin override flag per conversation: allow_after_hours=true (default false).
- Emergency categories (optional later): only if customer explicitly enables.

6) Deliverability Hardening Notes (minimum viable)
- Use consistent “From” number per business/location (Messaging Service if Twilio).
- Avoid link shorteners; prefer your main domain.
- Keep first message <160 chars when possible; avoid multiple links.
- Frequency: for leads, aim 1 immediate + 1 follow-up max unless user engages.
- Always identify the business in the first message.

7) Agency Go-Live Checklist (copy/paste)
1) Add opt-in disclosure to the lead source (Webflow/Typeform/Meta) using the snippets above.
2) Ensure phone is required and correctly formatted (E.164 if possible).
3) Confirm STOP/HELP handler is live (send HELP then STOP from a test phone; confirm responses).
4) Confirm suppression works (after STOP, attempt outbound—must be blocked).
5) Confirm quiet hours by setting a test account timezone and sending after-hours (must queue).
6) Save evidence: screenshots of form disclosure + logs of STOP/HELP events.

8) Verification Test Matrix (engineering)
- HELP: inbound “HELP” → returns help message; conversation not suppressed.
- STOP: inbound “STOP” → confirmation sent; number suppressed.
- STOP then message: inbound “Hi” after STOP → no AI flow; remain suppressed (optionally respond: ‘You are opted out…’ depending policy).
- Outbound to suppressed: blocked + logged.
- After-hours lead: message queued, sent at next window.

Owner dependency (to remove placeholders): publish Terms + Privacy pages on the website and provide final URLs so agencies can link them in opt-in disclosures.