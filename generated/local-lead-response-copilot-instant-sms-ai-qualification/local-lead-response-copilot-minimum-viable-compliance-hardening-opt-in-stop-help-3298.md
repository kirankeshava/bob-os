# Local Lead Response Copilot — Minimum Viable Compliance Hardening (Opt‑In, STOP/HELP, Quiet Hours, Consent Logging, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:58:27.894Z

---

Purpose (wartime MVCH)
This document contains the minimum viable compliance + deliverability setup to launch pilots without getting blocked by STOP/HELP failures, missing consent language, or quiet-hours issues. It is intentionally scoped to what removes sales objections and prevents account enforcement. Legit URL for prospects/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support email: agent_bob_replit+lead-copilot@agentmail.to.

1) Copy/Paste Opt‑In Language (use ONE source of truth)
Use on any form that triggers SMS.

Universal checkbox (recommended):
[ ] I agree to receive text messages from {{BusinessName}} about my request, including appointment scheduling and follow-ups. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

Short disclosure (if no checkbox available; put near Submit button):
By submitting, you agree to receive SMS from {{BusinessName}} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

If you can include links:
By submitting, you agree to receive SMS from {{BusinessName}} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {{PrivacyURL}} Terms: {{TermsURL}}.

Typeform placement:
- Add required “Statement” above Submit with short disclosure.
- Add required Yes/No question: “Do you agree to receive text messages about your request?” Default must be unchecked if presented as checkbox.
- Store fields: phone, consent=yes, timestamp, source=typeform, page/url.

Webflow placement:
- Add checkbox field “sms_consent” required.
- Add small helper text under the button with STOP/HELP line.
- Ensure hidden fields capture: page URL, UTM params, gclid/fbclid if available.

Meta/Facebook Lead Ads:
- In “Disclaimer” / “Privacy Policy” section: include the short disclosure and add Privacy/Terms links.
- Question suggestion: “Are you okay receiving texts to schedule?” (Yes/No). If No → do not text.

2) STOP/HELP Handling (must be global and immediate)
Goal: One inbound STOP must suppress ALL future outbound to that phone across every workflow.

2.1 Keyword matching
Normalize inbound body: trim, uppercase, remove punctuation.

STOP keywords (opt-out): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
START keywords (opt back in): START, YES, UNSTOP

Rules:
- If message contains a STOP keyword as a standalone token, treat as STOP.
- STOP always wins if multiple keywords appear.
- START only re-enables if previously opted out.

2.2 Required system responses
On STOP:
"You’re opted out of {{BusinessName}} texts. No more messages. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to"

On HELP:
"{{BusinessName}}: We text about your recent request to schedule/service updates. Msg freq varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to"

On START (if previously opted out):
"You’re resubscribed to {{BusinessName}} texts. Msg freq varies. Reply STOP to opt out."

2.3 Suppression list behavior
- Maintain GlobalSuppression(phone_e164, status=[opted_out|active], opted_out_at, source, last_keyword, last_message_sid)
- Before sending ANY outbound SMS: check suppression. If opted_out => block send and log event "blocked_opt_out".

2.4 Audit logging (minimum fields)
Store for every inbound/outbound message:
message_id, direction, phone_e164, timestamp_utc, body, provider (twilio), provider_sid, campaign/workflow, lead_id, consent_status_at_send, suppression_status_at_send, source_form, ip(if available).

3) Quiet Hours by Timezone (default-safe)
Goal: avoid sending during local quiet hours; queue instead.

3.1 Default schedule (agency-friendly)
Allowed window: 8:00am–8:00pm recipient local time, 7 days/week.

3.2 Timezone resolution order
1) Explicit business timezone (account setting)
2) Lead zip/postal code → timezone lookup
3) Lead state/province → approximate timezone
4) Phone NPA-NXX → approximate timezone
5) Fallback: business timezone
Log tz_source and tz_confidence.

3.3 Behavior
- If message would send outside allowed window: do not send immediately.
- Queue for next allowed time (next 8:00am local) and mark status=queued_quiet_hours.
- If lead replies inbound during quiet hours: you MAY send a single transactional response acknowledging receipt (no marketing), then continue in next window.

Transactional acknowledgement template (optional):
"Got it—thanks. We’ll follow up as soon as we’re back online. Reply STOP to opt out."

4) Message Templates (deliverability-safe defaults)
Principles:
- No all-caps, no excessive punctuation, no “FREE!!!”, no URL shorteners, no misleading claims.
- Identify the business quickly.
- Keep under ~320 chars when possible.

4.1 First response (speed-to-lead)
"Hi {{first_name}}—this is {{BusinessName}}. Saw your request for {{service}}. What’s the address/zip for the job? Reply STOP to opt out."

4.2 Qualification (2–3 quick questions)
"Thanks. What’s the best day/time for a call or estimate? (e.g., today 3pm, tomorrow morning). Reply STOP to opt out."

4.3 Booking handoff
"Perfect—can you confirm the best email for the appointment details? Reply STOP to opt out."

4.4 Missed call text-back
"Sorry we missed you—this is {{BusinessName}}. Want to book a time for {{service}}? Reply with a day/time. Reply STOP to opt out."

4.5 Re-engagement (1 attempt max)
"Hi {{first_name}}, checking in—do you still need help with {{service}}? Reply YES or NO. Reply STOP to opt out."

5) Agency Handoff (do this in 15 minutes)
Step A — Add consent field
- Ensure every lead source captures explicit SMS consent (checkbox or Yes/No).
- If consent != yes → do not text.

Step B — Paste opt-in disclosure
- Place disclosure next to the phone field or submit button.
- Add Privacy/Terms links if available (otherwise leave placeholders temporarily).

Step C — Set quiet hours
- Default 8am–8pm local time.
- Confirm business timezone and service area.

Step D — Verify STOP/HELP quickly (staging)
1) Submit a test lead with your phone.
2) Confirm first SMS arrives.
3) Reply “HELP” → confirm help message.
4) Reply “STOP” → confirm opt-out confirmation.
5) Trigger another outbound (submit again) → confirm it is blocked and logged.

6) Twilio deliverability notes (minimum viable)
- Use a Messaging Service (even with a single number) so you can add compliance settings and scaling later.
- Avoid link shorteners; use a stable domain.
- Keep content consistent across sends; don’t rotate dramatically.
- If using 10DLC long code at scale, expect A2P Brand/Campaign registration. Start the workflow when the sending route is confirmed; do not launch volume without it.

Owner/Support
For compliance or opt-out issues, contact agent_bob_replit+lead-copilot@agentmail.to and reference the legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.
