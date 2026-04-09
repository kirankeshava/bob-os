# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Pilot‑Safe) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:59:23.936Z

---

Below is the minimum-viable compliance + deliverability pack for launching pilots safely. It is intentionally scoped to: (1) capture compliant opt-in, (2) honor STOP/HELP, (3) respect quiet hours, (4) log consent, and (5) reduce carrier filtering. 

Business legitimacy references (include in agency communications):
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED OPT-IN DISCLOSURE (copy/paste)
Use this exact structure wherever leads submit a phone number.

Universal checkbox label (recommended):
“I agree to receive automated text messages from {BUSINESS_NAME} about my request. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

If you cannot add a checkbox (not ideal), append to the submit button area:
“By submitting, you agree to receive automated texts from {BUSINESS_NAME} about your request. Consent not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

Typeform snippet:
- Add a required Yes/No question before submission:
  Q: “SMS Consent”
  Description: “I agree to receive automated text messages from {BUSINESS_NAME} about my request. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
- Only send leads to SMS if answer = Yes.

Webflow snippet:
- Use a required checkbox field named: sms_consent = true
- Place the disclosure text directly under the phone field.

Meta/Facebook Lead Ads:
- Use the “Custom disclaimer” (or equivalent) and include:
  “By submitting, you agree to receive automated texts from {BUSINESS_NAME} about your request. Consent not required to purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
- Ensure the Page/business name matches the sender identity used in messages.

2) COMPLIANT MESSAGE TEMPLATES (minimum viable)
Keep messages short, transactional, and aligned to the user’s specific request. Avoid aggressive promos, ALL CAPS, excessive punctuation, and link shorteners.

2.1 First message (immediate speed-to-lead)
“Hi {first_name} — it’s {agent_name} with {BUSINESS_NAME}. Got your request for {service}. A couple quick questions so we can get you a fast quote. What’s your address or ZIP?”
(Include STOP/HELP line in either message #1 or #2; recommended in #1 if possible)
Add to end if space allows:
“Reply STOP to opt out, HELP for help.”

2.2 Qualification follow-up (1–2 questions max)
“Thanks. What’s the best time for a call: morning, afternoon, or evening?”

2.3 Booking/hand-off
“Perfect — can you do {time_option_1} or {time_option_2}? Reply 1 or 2.”

2.4 If no response (one nudge only)
“Just checking — do you still want help with {service}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

3) STOP / HELP HANDLING (must implement)
3.1 Recognized keywords (case-insensitive, ignore punctuation/leading/trailing spaces)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP, INFO

3.2 STOP behavior (hard requirements)
- Immediately mark the phone as “do_not_text = true” (global suppression list).
- Send confirmation once:
  “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply HELP for help.”
- Block all future outbound texts to that number across all client accounts unless/until explicit re-consent is captured.
- Log event: timestamp (UTC), keyword, message SID/provider ID, client_id, campaign/source, and raw inbound body.

3.3 HELP behavior
- Do NOT ask qualification questions.
- Reply with:
  “{BUSINESS_NAME}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
- Log event similarly.

3.4 Other inbound messages
- If not STOP/HELP and user is suppressed, do not restart conversation. Only restart if you capture new consent via a form with checkbox + timestamp (recommended) or written “START/YES” with clear context (safer to use form re-consent).

4) QUIET HOURS (minimum viable)
Goal: avoid after-hours texts that trigger complaints.

4.1 Default quiet hours rule
- Only send between 8:00 AM and 8:00 PM lead-local time (can be tightened by industry/state).

4.2 Timezone resolution order (best to worst)
1) Lead postal code/address → timezone lookup
2) Area code heuristic (US/CA)
3) Client account default timezone
4) Fallback: send next window using client timezone

4.3 Queueing behavior
- If lead arrives during quiet hours: enqueue the first message for the next allowed window (8:00 AM local). Do not “burst send” multiple queued messages; send only the first message, then continue live.

4.4 Emergency override
- Allow client to set “after_hours_allowed = true” only for explicit emergencies (documented). Default off.

5) CONSENT LOGGING (minimum viable schema)
You need a defensible audit trail.
Store per lead:
- phone, first_name, last_name (if available)
- consent_status: granted/denied/unknown
- consent_timestamp_utc
- consent_source: webflow/typeform/meta/manual
- consent_text_version: hash or version ID of disclosure shown
- source_url (page or form URL) and/or lead_ad_id
- ip_address (if available)
- user_agent (if available)
- proof fields: checkbox value, screenshot URL (optional), raw payload (redact sensitive fields)
Also store per message:
- outbound/inbound, timestamp_utc, provider_message_id, body, status, error codes

6) TWILIO/DELIVERABILITY HARDENING (no-spend steps)
- Use a Twilio Messaging Service (so you can manage sender pools, compliance, and sticky sender if needed).
- Ensure each message includes clear business identity early (“it’s {name} with {business}”) and is tied to the user’s request.
- Avoid: “FREE”, “ACT NOW”, excessive links, shortened URLs, repeated identical copy at high volume.
- Keep link domains consistent (prefer your own domain). If you must include a link, use a full https URL (not a shortener).
- Maintain a global suppression list across all clients.
- Monitor: delivery rates, carrier filtering indicators, and opt-out rates. If opt-out spikes, reduce frequency and tighten copy.

7) AGENCY HANDOFF (implementation steps)
Step A — Insert opt-in text
- Webflow/Typeform: add required SMS consent checkbox/question (recommended).
- Meta Lead Ads: add custom disclaimer.
- Confirm Terms/Privacy links are present (even if temporary URLs at first).

Step B — Configure intake payload
Minimum fields to pass to Copilot:
- phone, first_name, last_name (optional), service_requested, zip/address, lead_source, consent_status, consent_timestamp

Step C — Run compliance test (10-minute script)
1) Submit a test lead with your own phone number (with consent checked).
2) Confirm first message arrives within ~60 seconds and references the requested service.
3) Reply “HELP” → verify HELP response contains support email and STOP instruction.
4) Reply “STOP” → verify opt-out confirmation.
5) Attempt another outbound send to the same number → must be blocked.
6) Submit a lead after 8 PM local → confirm message is queued to next morning.

If any step fails, pause launch. Compliance failures here can cause carrier blocks and churn.

Owner note: Once Terms/Privacy pages are published on the website, replace {TERMS_URL}/{PRIVACY_URL} in every snippet and HELP message with live URLs on https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.
