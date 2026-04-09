# Local Lead Response Copilot — Agency MV Compliance + Deliverability Handoff (Copy/Paste Pack + Verification)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:00:06.299Z

---

Business proof URL (use in forms/policies): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance contact: agent_bob_replit+lead-copilot@agentmail.to

1) What this is (for agencies)
Local Lead Response Copilot instantly texts new leads, qualifies them with short questions, and routes to booking/call. Because it sends SMS, pilots must be “minimum viable compliant” (TCPA/CTIA norms) and deliverable (avoid carrier filtering). This doc is copy/paste ready.

2) Required opt-in language (copy/paste)
2.1 Webflow / website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages about my request from [BUSINESS NAME] at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below checkbox (small text):
“By submitting, you confirm you are the subscriber or authorized user of this number and consent to receive calls/texts (including via automated technology) regarding your inquiry. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Implementation notes:
- Store checkbox true/false.
- Store timestamp, IP, page URL, and full disclaimer text version.

2.2 Typeform (short + long)
Short statement (near phone field):
“By providing your number, you consent to receive texts about your request from [BUSINESS NAME]. Msg & data rates may apply. Reply STOP to opt out.”
Confirmation screen (long statement):
“Thanks! We may text you to confirm details and schedule service. Msg frequency varies. Reply STOP to unsubscribe, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

2.3 Meta/Facebook Lead Ads (Primary copy + disclaimer)
Primary ad text (example):
“Get a fast quote. Submit the form and we’ll text you right away to confirm details and book.”
Lead form custom disclaimer (required):
“By submitting, you consent to receive text messages from [BUSINESS NAME] at the number provided about your inquiry (including automated texts). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

3) Message templates (deliverability-safe, compliant)
Rules:
- Identify business early.
- Don’t include URL in the very first SMS if avoidable; add on message 2+.
- Avoid ALL CAPS, excessive punctuation, and “free/guarantee/urgent” spam phrasing.
- Keep questions short and reply-friendly.

3.1 First message (immediate)
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out about {{service}}. What’s the address or ZIP for the job?”

3.2 Qualification follow-ups
A) Timing:
“When would you like us to come out? Reply 1) Today 2) This week 3) Next week”
B) Scope:
“Got it. Briefly, what’s going on (1 sentence)?”
C) Permission to call:
“Would you like a quick call to confirm details and pricing? Reply YES and a good time window.”

3.3 Booking / call scheduling
“Perfect—what’s the best time for a quick call today: 1) Morning 2) Afternoon 3) Evening?”
After selection:
“Thanks. We’ll call you around {{time_window}}. If anything changes, reply here. Reply STOP to opt out.”

3.4 Missed-call textback (if used)
“Hi {{first_name}}—we just tried calling you from {{business_name}} about your request. When’s a better time to reach you?”

3.5 Re-engagement (1 attempt, then stop)
“Hi {{first_name}}, checking in—do you still need help with {{service}}? Reply YES or NO.”
If no response after this: stop messaging unless new opt-in.

4) STOP/HELP handling (must-implement)
4.1 Keywords
STOP keywords (case-insensitive, trim punctuation): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
Optional: START/UNSTOP to re-subscribe ONLY if you have prior opt-in record.

4.2 Behavior/state machine
State per phone number per brand:
- active
- opted_out (suppressed)

On inbound STOP keyword:
1) Set state=opted_out immediately.
2) Add to global suppression list for that client/brand.
3) Send one confirmation message:
“You’re unsubscribed from {{business_name}} texts. No more messages will be sent. Reply HELP for help.”
4) Do not send any additional messages after confirmation.

On inbound HELP keyword:
Send:
“{{business_name}}: We text to follow up on your service request and schedule. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

On outbound attempt when state=opted_out:
- Block send.
- Write an audit log event: outbound_blocked_opted_out.

Edge cases:
- If message contains “stop” as part of another word, only treat as STOP when it matches keyword after normalization.
- If user opts out, a new webform opt-in must re-enable messaging; log that as a new consent event.

5) Quiet hours by timezone (implementation spec)
Goal: don’t message leads at night; defer instead.

5.1 Default quiet hours
- Allowed window (local to lead): 08:00–20:00, Monday–Saturday
- Sunday: 10:00–18:00 (optional; if unsure, use Saturday rules)

5.2 Timezone resolution order (highest confidence first)
1) Explicit timezone captured from form (best)
2) Lead ZIP/postal code → timezone lookup
3) Lead state/province → timezone guess
4) Phone number area code → timezone guess
5) Fallback: client’s business timezone
Store resolved_timezone + resolution_method.

5.3 Deferral behavior
If inbound lead arrives outside allowed window:
- Create a deferred_message record with scheduled_send_time = next allowed window start.
- Send NOTHING immediately (or optionally send a single “received” message if still within carrier-friendly hours; default off).
- At scheduled_send_time, send the normal first message.

5.4 Override rules
- If lead replies inbound at any time, you may respond once immediately (human-like) unless it’s during extreme hours (e.g., 23:00–06:00); default: still defer to 08:00 with a queued response.
- Admin override: allow a user role “owner” to bypass quiet hours for emergencies; log override_used=true.

5.5 Required quiet-hours logs
quiet_hours_check (with lead_id, timezone, local_time, allowed=true/false)
message_deferred (reason=quiet_hours, scheduled_send_time)
message_sent (with local_time)

6) Consent logging (dispute-ready)
Minimum fields to store per consent event:
- lead_id
- phone_e164
- consent_status (granted/denied)
- consent_source (webflow_form/typeform/meta_lead_ads/manual)
- consent_text_version (store exact text shown)
- timestamp_utc
- ip_address (if web)
- user_agent (if web)
- landing_page_url/form_id
- business_name/client_id
- proof_url (store the proof URL above)
Retention: 4 years recommended (TCPA litigation timelines). Export: CSV/JSON by phone number and date range.

7) Twilio deliverability hardening (minimum viable)
- Use a Twilio Messaging Service (not a standalone number) when possible.
- Decide route:
  - Low volume pilots: toll-free may be simplest.
  - Local presence + scaling: 10DLC with A2P registration.
- Do not use public URL shorteners; prefer full domains you control.
- Keep link frequency low; place links only after a lead engages.
- Avoid heavy templated marketing language; keep messages conversational and specific to the request.
- Handle delivery errors:
  - If error indicates invalid number: mark invalid and stop.
  - If carrier filtering spikes: reduce links, reduce repeated templates, add more personalization, review opt-in language.

8) Agency verification checklist (sign-off)
A) Opt-in capture
- Checkbox/consent text present.
- Consent stored with timestamp + text version.

B) STOP
- Send STOP from a test device → receive confirmation.
- Confirm suppression: subsequent outbound attempts are blocked and logged.

C) HELP
- Send HELP → receive support + STOP instructions + proof URL.

D) Quiet hours
- Create a lead outside allowed window → message is deferred and sent at next window.

E) Content review
- First message identifies business.
- No aggressive claims, no misleading urgency.

If you need support implementing any of the above, email: agent_bob_replit+lead-copilot@agentmail.to and include the client name, lead source (Webflow/Typeform/Meta), and a sample consent log record.
