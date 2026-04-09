# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T16:44:25.000Z

---

Business legitimacy links (use in all forms/ads and onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

Goal (MVC for pilots): prevent account shutdowns, carrier filtering, and TCPA/CTIA violations while keeping setup fast. This is the “must-have” set only: (1) explicit opt‑in disclosures, (2) STOP/HELP handling + global suppression, (3) quiet hours by lead timezone, (4) consent logging.

1) COPY/PASTE OPT‑IN LANGUAGE (Forms + Ads)
A) Webflow / Website form checkbox (recommended)
Add a required checkbox next to the submit button:
Checkbox label:
“I agree to receive automated SMS texts from {BUSINESS NAME} about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Below checkbox (small text):
“By submitting, you confirm you are the owner/authorized user of this number. View Privacy Policy and Terms: {PRIVACY_URL} | {TERMS_URL}.”
Implementation notes:
- Store checkbox value=true, timestamp, page URL, and form name.
- Never pre-check the box.

B) Typeform (consent statement)
Add a “Statement” block immediately before the Submit button:
“Consent: By submitting this form, you agree to receive automated SMS texts from {BUSINESS NAME} related to your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”
Add a Yes/No question (required): “Do you agree to receive SMS updates about your request?”
- If No: do not text; route to email-only.

C) Meta/Facebook Lead Ads (higher risk; keep tight)
In the Lead Form “Privacy policy” field, link to {PRIVACY_URL}. In the custom disclaimer text:
“By submitting, you agree to receive automated SMS texts from {BUSINESS NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL}.”

2) DEFAULT COMPLIANT MESSAGE TEMPLATES (low spam risk)
Principles:
- Identify business quickly.
- Reference the user’s request.
- Ask one short question.
- Avoid excessive punctuation, all‑caps, “FREE!!!”, URL shorteners, and repeated links.

Initial speed-to-lead (send immediately after form/lead):
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service_requested}. What’s your address (or ZIP) so we can confirm availability?”

Qualification follow-up (if no response in 3–5 minutes):
“Quick check: is this for today, this week, or just pricing?”

Booking prompt (once qualified):
“Thanks — we can help. Want to book a quick call or an appointment? Reply 1 for call, 2 for appointment.”

STOP/HELP footer policy:
- Do NOT append “Reply STOP…” to every message if it makes messages long; but ensure (a) it is present in the opt-in disclosure and (b) it appears in at least one early message in the thread or via HELP response. If your risk tolerance is higher, include a short footer every 2–3 messages:
“Reply STOP to opt out.”

3) STOP / HELP HANDLING (engineering-ready spec)
Required behavior:
- STOP must immediately opt the number out across ALL clients/campaigns (global suppression), and block all future outbound messages until re-consent.
- HELP must return program identity + support contact.

Keywords (case-insensitive, trim punctuation/whitespace):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP, INFO

Inbound processing logic:
A) On inbound message body matches STOP keyword:
1) Add phone number to GlobalSuppressionList with fields:
- phone_e164
- source=“sms_inbound_stop”
- timestamp_utc
- last_message_sid (if Twilio)
- client_id (if known) AND global=true
2) Send one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
3) Mark conversation status=“opted_out”.
4) Block any queued/outbound sends to that phone.

B) On inbound matches HELP keyword:
Send:
“{business_name} SMS help: We text about your service request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

C) START handling (optional but recommended):
Only allow resubscribe if you can prove renewed consent. If you implement START:
- Reply: “To restart texts, please confirm: YES”
- On YES, record new consent event and remove suppression.

Outbound gate:
Before sending any SMS:
- If phone in GlobalSuppressionList => do not send; log blocked_reason=“opted_out”.

Audit logging (minimum fields):
message_id, direction(in/out), timestamp_utc, phone_e164, client_id, template_name, body_hash, consent_event_id (if any), suppressed(bool), suppressed_reason.

4) QUIET HOURS BY TIMEZONE (engineering-ready spec)
Default quiet hours (recommended): 8:00 PM–8:00 AM lead-local time.
Rules:
- If lead timezone known: enforce strictly.
- If unknown: infer from area code (if US/CA) OR from lead ZIP/state captured in qualification; else default to client’s timezone.
- If still unknown: treat as “most conservative” and delay until 8:00 AM client timezone.

Queue behavior:
- If message is triggered during quiet hours, do not send immediately.
- Queue it for next allowed time window start (e.g., 8:00 AM lead-local).
- If multiple messages are queued, send only the most relevant latest message (dedupe) to avoid spam bursts.

Emergency/override:
- Allow manual override for ongoing two-way conversations where the lead has texted within last 15 minutes (implied engagement). Still avoid late-night blasting; cap to 1 reply per inbound message.

DST:
- Use IANA timezones where possible (e.g., America/Chicago). If using offset-only, re-check offset daily.

5) TWILIO DELIVERABILITY (minimum guidance for pilots)
Minimum viable configuration:
- Use a Twilio Messaging Service (not a single number directly) so you can add numbers and manage compliance.
- Enable sticky sender if you use multiple numbers.
- Avoid link shorteners. If including a link, use your own domain/website path.
- Keep first message under ~160 chars where possible.
- Avoid “marketing” phrasing; keep messages strictly transactional/lead-response.
A2P 10DLC:
- If using US long codes at scale, you will need A2P registration. For pilots with low volume, you can start with a compliant setup but plan to register before scaling to avoid throughput/filtering issues.

6) AGENCY QUICKSTART (10–20 minutes)
Step 1: Paste the opt-in snippet into the client’s form/lead ad.
Step 2: Ensure you capture: first name, phone, service requested, zip/address (or collect via first SMS).
Step 3: Configure your lead source to send lead data to Copilot (webhook/Zapier).
Step 4: Turn on STOP/HELP + quiet hours toggles (or confirm with support).
Step 5 (verification test — do before going live):
- Submit a test lead with your own phone.
- Confirm first SMS arrives and references the request.
- Reply “HELP” and confirm help message returns support + website.
- Reply “STOP” and confirm opt-out confirmation arrives.
- Trigger another message attempt; confirm it is blocked and logged as suppressed.
- Adjust quiet hours and confirm messages queue instead of sending.

Support/contact for agencies (include in onboarding emails):
- agent_bob_replit+lead-copilot@agentmail.to
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Owner TODO (blocking): replace {PRIVACY_URL} and {TERMS_URL} with live links once published on the site; then update all opt-in snippets accordingly.