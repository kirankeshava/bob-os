# Local Lead Response Copilot — MV SMS Compliance + Deliverability Handoff (Agency Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:11:46.176Z

---

Purpose
This handoff is “minimum viable compliant” for pilot launches of Local Lead Response Copilot (instant SMS + AI qualification + booking) and is designed to (1) reduce TCPA/CTIA risk, (2) prevent Twilio/carrier enforcement, and (3) improve deliverability. Customer legitimacy references:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/Paste Opt‑In Language (Forms + Ads)
A. Universal disclosure (place directly under phone field + checkbox)
Checkbox label (recommended):
[ ] I agree to receive text messages from {BUSINESS_NAME} about my request.

Disclosure (small text under checkbox):
By checking this box, you consent to receive SMS messages from {BUSINESS_NAME} related to your inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}

B. Webflow (example block)
- Add a required checkbox named: sms_consent
- Add hidden fields: page_url, utm_source, utm_campaign, utm_medium (optional)
- Place this disclosure under the phone input.

C. Typeform
- Use a “Legal” or “Statement” block immediately before submission.
- Add yes/no question: “Do you consent to SMS updates about your request?” Required: Yes
- Store as: sms_consent=true

D. Meta/Facebook Lead Ads
- Add a disclaimer (custom question or description field):
“By submitting, you agree to receive text messages from {BUSINESS_NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required for purchase. Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}.”
- Ensure the lead form includes the phone number field.

2) Messaging Templates (Carrier-friendly, compliant)
Rules:
- Keep first message short, identity + reason + opt-out.
- Avoid: excessive punctuation, ALL CAPS, “free!!!”, “guaranteed”, URL shorteners, repeated links, spammy urgency.
- Prefer one branded domain link (no bit.ly). If no domain, send no link in first SMS.

A. First response (immediate)
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. A couple quick questions to get you a quote. Reply STOP to opt out.”

B. Qualification Q1 (service + scope)
“What are you looking to get done? (1) Repair (2) Replace (3) New install (Reply 1–3)”

C. Qualification Q2 (timing)
“When would you like this done? (1) ASAP (2) This week (3) 2+ weeks”

D. Booking handoff (call/appointment)
“Thanks—best time for a quick call? Reply with a time window (e.g., ‘today 3–5pm’) and I’ll get you scheduled. Reply STOP to opt out.”

E. Missed-call textback (if you support it)
“Sorry we missed you—this is {BUSINESS_NAME}. What’s a good time to call back? Reply STOP to opt out.”

F. Re-engagement (only if consent exists; wait 24–72h)
“Hi {first_name}—checking back on your {service} request with {BUSINESS_NAME}. Still want an estimate? Reply YES or NO. Reply STOP to opt out.”

3) STOP/HELP Handling — Implementation Spec (must be global)
Objective: if a contact opts out anywhere, no further messages are sent from any workflow/number until they re-opt-in explicitly.

A. Keywords (case-insensitive; ignore surrounding punctuation/whitespace)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO, SUPPORT
Optional (treat as opt-out to be safe): REMOVE

B. State machine
States: ACTIVE, OPTED_OUT
- On inbound STOP keyword from a phone number:
  - Set contact.sms_status = OPTED_OUT
  - Set contact.sms_opt_out_at = now()
  - Record sms_opt_out_source = “inbound_stop”
  - Add phone to global suppression list
  - Send one final confirmation SMS (below)
  - Do not send any further messages unless explicit re-consent is recorded

- On inbound HELP keyword:
  - Send help response (below)
  - Do not change consent state

C. Confirmation + Help copy (copy/paste)
STOP confirmation:
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply HELP for help. For support email agent_bob_replit+lead-copilot@agentmail.to.”

HELP response:
“{BUSINESS_NAME}: We text about your service request/appointments. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

D. Enforcement rules
- Before ANY outbound send, check sms_status != OPTED_OUT.
- If OPTED_OUT: block send, log event “sms_blocked_opt_out”.
- If Twilio returns error codes for unsubscribed recipient, also mark OPTED_OUT.

E. Required log events (minimum)
Log table: sms_events
- event_id, timestamp_utc, contact_phone, direction (inbound/outbound), message_body, message_sid (if Twilio), event_type
Event types to implement:
- consent_recorded
- sms_sent
- sms_delivered (optional)
- inbound_received
- stop_received
- help_received
- opt_out_confirm_sent
- sms_blocked_opt_out
- quiet_hours_deferred
- quiet_hours_released

F. Webhook examples (Twilio)
- Configure Twilio Messaging webhook for incoming messages to: POST /webhooks/twilio/inbound
- Parse From, To, Body.
- Normalize Body and match keywords.

4) Quiet Hours by Timezone — Implementation Spec
Goal: avoid messaging during local quiet hours (recommended 8pm–8am local). If a lead arrives during quiet hours, queue the first SMS for the next allowed time.

A. Timezone resolution order
1) Lead-provided timezone field (if captured)
2) Property/service ZIP → map to timezone
3) Phone number area code → approximate timezone
4) Default business timezone (set per client account)
Always store resolved_timezone + resolution_method.

B. Allowed window
Default allowed sending window: 08:00–20:00 local time, Mon–Sat (configurable per client).
- Sunday can be allowed or blocked; default to allowed 10:00–18:00 if home services want weekend coverage.

C. Scheduling algorithm (deterministic)
Inputs: now_utc, resolved_timezone, message_type (first_response vs followup), override_flag
1) Convert now_utc → local_time.
2) If override_flag=true (admin/manual) then send immediately and log override.
3) If local_time within allowed window and allowed day: send.
4) Else:
   - Compute next_allowed_local = next day/time at window start (or same day if before start)
   - Convert next_allowed_local → send_at_utc
   - Enqueue message with send_at_utc and reason=quiet_hours
   - Log quiet_hours_deferred
5) Worker releases queued messages at send_at_utc; log quiet_hours_released.

D. Edge cases
- DST changes: always compute based on timezone database (IANA tz).
- If lead replies during quiet hours, inbound is always accepted; outbound replies should still respect quiet hours unless message is purely transactional and client opts in to “respond to inbound anytime” (advanced; default OFF for pilots).

5) Consent Logging (Dispute-ready)
Store evidence sufficient to answer: “How did you get consent to text this person?”

A. Required fields (minimum)
- contact_phone (E.164)
- consent_status: CONSENTED | NOT_CONSENTED | OPTED_OUT
- consent_timestamp_utc
- consent_source: webform | fb_lead_ad | manual_import | inbound_keyword
- consent_text_shown (the exact disclosure text version)
- consent_checkbox_label (if applicable)
- consent_ip (if available)
- consent_page_url
- consent_form_name/form_id
- consent_user_agent (if available)
- utm_source/utm_campaign (optional)
- terms_url, privacy_url at time of consent

B. Retention + export
- Retain consent logs for minimum 4 years (recommend 5).
- One-click export: CSV + JSON including consent record + SMS event timeline for a phone number.

6) Twilio Deliverability Hardening (Pilot-ready)
A. Messaging Service
- Use a Twilio Messaging Service (not ad-hoc numbers).
- Enable: Sticky Sender (ON), Smart Encoding (ON), Validity Period (e.g., 4 hours).
- Add numbers to the service; keep per-client segregation if possible.

B. 10DLC vs Toll-Free decision tree
- If sending to US numbers and doing application-to-person messaging at any scale: assume A2P 10DLC is required.
- For fastest pilot with lower throughput: Toll-Free can work but still benefits from verification; carriers may filter unverified TF.
- Default recommendation for home services pilots: 10DLC local long code via Messaging Service, with compliant opt-in and low initial volume.

C. Content guidelines (to reduce filtering)
- Identify sender in first message ({BUSINESS_NAME}).
- Include opt-out instruction in first message and periodically.
- Avoid link shorteners; avoid multiple links; avoid “loan/credit/debt” keywords unless that vertical.
- Keep messages conversational; don’t send repeated identical blasts.
- Throttle: avoid high burst sends; start low volume.

D. Fallback behaviors
- If message send fails: retry once after 2–5 minutes.
- If repeated failures (e.g., 3): mark channel degraded, notify admin, stop automation.
- If recipient is OPTED_OUT: never retry; never send.

7) Agency Implementation Steps (no code in our app required)
1) Add opt-in checkbox + disclosure to the lead capture source (Webflow/Typeform/FB Lead Ads).
2) Ensure webhook/Zapier/Make sends these fields to Copilot: phone, first_name, service, sms_consent=true, consent_timestamp, page_url, consent_text_version.
3) Configure your Twilio Messaging Service and inbound webhook for STOP/HELP.
4) Turn on quiet hours using the spec above; test with a lead created at 9pm local.
5) Run verification tests (below) before going live.

8) Verification Test Matrix (must pass before pilot)
A. Consent
- Submit form with checkbox unchecked → ensure NO SMS is sent.
- Submit with checked → ensure consent_recorded event exists.

B. STOP
- From a test phone, reply “STOP” to any message → receive opt-out confirmation.
- Trigger another outbound send → must be blocked; log sms_blocked_opt_out.

C. HELP
- Reply “HELP” → receive help response with support email + proof URL.

D. Quiet hours
- Create lead during quiet window → message deferred; log quiet_hours_deferred.
- At next allowed time → message sent; log quiet_hours_released.

Owner note: Terms/Privacy URLs
All snippets above include {TERMS_URL}/{PRIVACY_URL}. Next step is publishing those pages on the website so agencies can paste real links instead of placeholders. Use the proof URL above as the public legitimacy reference until the final domain is live.
