# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Pack (Agency Handoff + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T16:54:39.583Z

---

Business legitimacy links (use in all customer/agency materials)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum‑Viable Compliance Checklist (pilot-ready)
A. Consent capture (must-have)
- Explicit disclosure that SMS will be sent.
- Purpose: “updates + questions to qualify/schedule.”
- Msg frequency range (ex: “2–6 messages per inquiry”).
- “Message & data rates may apply.”
- STOP/HELP disclosures.
- Link to Terms + Privacy (if not live yet, publish ASAP; avoid placeholders in production).
- No pre-checked consent boxes.

B. STOP/HELP handling (must-have)
- Recognize STOP keywords (see spec below), confirm opt-out, and suppress all future outbound.
- HELP returns support instructions and link.

C. Quiet hours (must-have)
- Do not text leads during 9pm–8am in the lead’s local timezone (default window; configurable).
- If lead submits during quiet hours: queue first message to next allowable time (don’t “send anyway”).

D. Consent logging (must-have)
- Store: timestamp, IP (if available), source (Webflow/Typeform/FB), form URL/ad ID, consent checkbox state + text version, phone, and initial message SID.

E. Content rules (must-have deliverability)
- Avoid “free!!!”, “act now”, excessive caps/punctuation, link shorteners, and repeated links.
- Identify the business in the first message.
- Keep first message short; ask 1 question at a time.

2) Copy/Paste Opt‑In Snippets (agencies)

2.1 Webflow form (checkbox + disclosure)
Checkbox label (required, unchecked by default):
“I agree to receive text messages about my request (including scheduling and follow‑up) at the phone number provided.”

Disclosure text (place below checkbox):
“By submitting, you consent to receive SMS messages related to your inquiry. Msg frequency varies (typically 2–6 per request). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [PASTE TERMS URL]. Privacy: [PASTE PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. See https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

Required fields to capture (minimum):
- phone (E.164 preferred), name, service requested, zip/city, consent_checkbox=true, page_url, timestamp.

2.2 Typeform (statement + yes/no)
Add a Yes/No question (required):
“Do you agree to receive text messages about your request (scheduling + follow‑up) at the number you provided?”
- If “No”: do not enroll in SMS; route to email/call only.

Typeform ‘Legal’ or description text:
“Msg frequency varies (typically 2–6 per request). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [PASTE TERMS URL]. Privacy: [PASTE PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

2.3 Meta/Facebook Lead Ads (CRM card + privacy policy link)
In the Lead Form “Custom disclaimer”:
“By submitting, you agree to receive text messages about your request (including scheduling and follow‑up). Msg frequency varies (typically 2–6 per request). Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

Privacy Policy URL: [PASTE PRIVACY URL]
Website URL (optional field): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

3) Default Message Templates (compliant + deliverability-safe)

3.1 First response (immediate)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. Are you looking to book an estimate today or this week? Reply 1) Today 2) This week. Reply STOP to opt out.”

3.2 Qualification (one question at a time)
“Thanks — what’s the service address or zip code? Reply STOP to opt out.”
“Got it. What’s the best time window for a call/visit: morning, afternoon, or evening? Reply STOP to opt out.”

3.3 Booking handoff
“Perfect. I can schedule {option_A} or {option_B}. Which works? Reply STOP to opt out.”

3.4 Missed-call text back
“Hi {first_name} — sorry we missed you. This is {business_name}. What’s a good time to call you back? Reply STOP to opt out.”

3.5 Re-engagement (7–14 days; only if consent exists)
“Hi {first_name} — checking in from {business_name}. Do you still want help with {service}? Reply YES or NO. Reply STOP to opt out.”

4) STOP/HELP Handling — Engineering Spec (Twilio)

4.1 Keyword matching (normalize inbound)
- Normalize inbound body: trim, lowercase.
- STOP keywords (treat as opt-out):
  “stop”, “stopall”, “unsubscribe”, “cancel”, “end”, “quit”
- HELP keywords:
  “help”, “info”
- START keywords (optional opt-back-in; only if policy allows and consent re-confirmed):
  “start”, “unstop”, “yes”

4.2 Required behavior
On STOP keyword:
1) Immediately mark phone as “globally opted out” (suppression list) across all tenants/workspaces unless you have per-brand numbers (safer: global by default).
2) Do not send any further outbound messages to that phone.
3) Send one final confirmation message (Twilio best practice):
   “You’re opted out and will no longer receive texts. Reply START to opt back in. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4) Log the event (see 4.4).

On HELP keyword:
- Send:
  “Support: agent_bob_replit+lead-copilot@agentmail.to. You can reply STOP to opt out. Product: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
- Do not change opt-in status.

Outbound guardrail:
- Before sending any SMS, check suppression list; if suppressed, block send and log “blocked_due_to_opt_out=true”.

4.3 Twilio webhook routing (generic)
- Configure inbound webhook for each sending number/messaging service to POST to:
  /webhooks/sms/inbound
- Handler responsibilities:
  a) parse From, To, Body, MessageSid
  b) run keyword logic
  c) persist message + compliance events
  d) route non STOP/HELP messages into AI qualification flow only if opted-in

4.4 Audit log fields (minimum)
- phone_e164
- tenant_id / workspace_id
- event_type: inbound_message | opt_out | help | opt_in
- event_timestamp_utc
- source: twilio
- twilio_message_sid
- inbound_body_raw
- inbound_body_normalized
- legal_context_version (the exact opt-in text version stored at capture time)

5) Quiet Hours by Timezone — Implementation Spec

5.1 Default rule (configurable per tenant)
- Quiet hours: 9:00 PM to 8:00 AM in lead local time.
- If unknown timezone: default to business timezone; if also unknown, default to America/New_York.

5.2 Timezone resolution order
1) Lead-provided ZIP/city → geocode to timezone.
2) Phone number country/area code heuristic (fallback only).
3) Tenant/business timezone setting.

5.3 Send behavior
- If a lead arrives during quiet hours:
  a) create queued message job
  b) send at next allowable time (8:00 AM local)
  c) preserve original “created_at” for speed-to-lead reporting, but separate “sent_at”

5.4 Edge cases
- Daylight Savings Time: always compute via timezone database (IANA tz).
- If queued message becomes stale (e.g., >12 hours): optionally re-check lead status before sending.
- Manual override: allow tenant admin to disable quiet hours per lead only (log override).

6) Twilio Deliverability Setup (minimum viable)
- Use a Twilio Messaging Service (not direct from a single number) to enable:
  a) sticky sender (consistent replies)
  b) easier scaling across numbers
- Keep templates consistent; avoid rapid template changes during the first week of a pilot.
- If sending from US local long codes at scale: prepare for A2P 10DLC registration (brand + campaign). Start free steps now; do not pay fees without approval.

7) 30-minute Verification Matrix (pilot go-live)
A. STOP
- Send “STOP” from a test phone to the pilot number.
Expected:
1) Confirmation message returned.
2) Phone added to suppression list.
3) Any subsequent outbound attempts are blocked and logged.

B. HELP
- Send “HELP”.
Expected: support + STOP instructions returned; no opt-out.

C. Quiet hours
- Temporarily set quiet hours to “now” window for test.
- Create a new lead.
Expected: message is queued, not sent; then sent when window opens.

Agency handoff note
- If an agency asks “are you compliant?” answer:
“Yes — we capture explicit opt-in on the form/ad, include STOP/HELP language, automatically honor opt-outs with a suppression list, enforce quiet hours by lead timezone, and log consent + messaging events for audits. Details and support: agent_bob_replit+lead-copilot@agentmail.to and https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
