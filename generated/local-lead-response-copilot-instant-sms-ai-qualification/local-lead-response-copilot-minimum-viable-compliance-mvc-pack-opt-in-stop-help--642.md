# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack (Opt‑In, STOP/HELP, Quiet Hours, Consent Logs, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:42:23.580Z

---

Purpose (wartime): ship the smallest set of compliance/deliverability controls that (1) removes buyer objections, (2) prevents obvious TCPA/CTIA failures, and (3) reduces Twilio/carrier enforcement risk—without slowing pilot launches.

Legitimacy references (use everywhere):
- Website (share with customers/agencies): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

A) What to implement NOW (MVC)
1) Explicit opt-in disclosure at capture point (form/lead ad)
Required elements:
- “By submitting, you agree to receive text messages…”
- Purpose: “regarding your request/quote/appointment”
- Msg frequency (lightweight): “Message frequency varies.”
- Msg&data rates disclosure
- STOP/HELP keywords disclosure
- Links to Terms/Privacy (if not yet published, publish ASAP; if temporarily unavailable, at minimum include the website URL + support email)

2) STOP/HELP handling (hard requirement)
- Recognize STOP keywords (see section C) and immediately suppress further messages.
- Reply with one confirmation message.
- HELP replies with program/help info.
- Maintain a global suppression list per subaccount/location.

3) Quiet hours (MVP)
- Prevent outbound sends during local quiet hours.
- Queue messages and send at next allowed time.
- Allow a manual override for truly urgent, user-requested replies (logged).

4) Consent logging (audit trail)
- Log source, timestamp, and disclosure version.
- Log STOP events and suppression.

Defer until after paid pilots (do later): advanced content linting, multi-campaign A2P optimization, branded short links, deep throughput tuning, complex re-consent workflows.

B) Copy/Paste Opt‑In Snippets (agency-ready)

1) Generic HTML / Website Form (Webflow/custom forms)
Add this directly under the submit button:
“By submitting this form, you agree to receive SMS messages from [BUSINESS NAME] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Terms and Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Contact: agent_bob_replit+lead-copilot@agentmail.to.”

Implementation notes:
- Include a required phone number field.
- Add an unchecked checkbox when possible (best practice): “I agree to receive texts about my request.”
- Store checkbox value + page URL + timestamp.

2) Typeform
Place in “Legal” / description text near the phone field:
“Consent: By providing your phone number, you agree to receive text messages from [BUSINESS NAME] regarding your inquiry. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”

3) Meta/Facebook Lead Ads
In the lead form “Privacy policy” and “Custom disclaimer” section:
Custom disclaimer text:
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”

C) STOP/HELP Implementation Spec (Twilio-agnostic logic)

Keyword matching (case-insensitive; trim whitespace/punctuation):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO

Rules:
1) On inbound message, normalize body; if in STOP set:
- Write suppression record: {phone_e164, location_id, timestamp_utc, channel:"sms", reason:"stop_keyword", raw_body, provider_message_sid}
- Immediately mark lead/contact as “sms_opt_out=true”
- Send ONE confirmation message:
“You’re unsubscribed and will no longer receive texts. Reply HELP for help. Contact agent_bob_replit+lead-copilot@agentmail.to.”
- Block all future outbound SMS to that phone for that location (and optionally global across all locations—recommended).

2) If in HELP set:
- Reply:
“[BUSINESS NAME] texts about your request/appointment. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

3) Any other inbound:
- Continue qualification flow ONLY if not opted out.

Outbound guardrail:
- Before sending any outbound SMS, check sms_opt_out; if true, do not send; log blocked_send event.

D) Quiet Hours MVP Spec
Goal: avoid sending marketing/automated texts at night in the lead’s local timezone.

Default quiet hours (recommended for pilots):
- Quiet window: 9:00 PM – 8:00 AM local time (lead timezone)
- If timezone unknown: use the business/location timezone.

Timezone resolution order:
1) Lead-provided timezone (rare)
2) Location/business timezone config (most reliable)
3) Phone number area-code lookup (optional; can be wrong)

Behavior:
- If message would send during quiet hours, enqueue with “send_at” = next allowed time (8:05 AM local).
- If lead actively texts in during quiet hours, you may respond immediately (transactional/user-initiated), but still respect STOP/HELP and log as “user_initiated_after_hours=true”.

E) Consent Logging (minimum fields)
Store per lead/contact:
- consent_status: opted_in | opted_out | unknown
- consent_source: webform | typeform | meta_lead_ad | manual | inbound_text
- consent_timestamp_utc
- consent_text_version (e.g., “MVC_v1_2026-04-09”)
- capture_page_url OR ad_id/form_id
- ip_address (if available)
- user_agent (if available)
- proof (optional): screenshot URL / raw payload

Event logs (append-only recommended):
- inbound_message_received
- outbound_message_attempted (with blocked reason)
- stop_received
- help_received
- quiet_hours_queued

F) Agency Handoff (copy/paste + go-live checklist)

What the agency must do (no code):
1) Add the opt-in snippet to every lead capture point that feeds SMS automation (Webflow/Typeform/Meta).
2) Ensure phone number is required and collected in E.164-ready format (or normalized).
3) Provide business timezone and business name exactly as used in messaging.
4) Provide booking link or calendar rules for appointment setting.

Go-live checklist:
- Opt-in language present on every form/ad
- Terms/Privacy link included (at minimum the website URL above) and support email included
- STOP/HELP tested: from a test phone send STOP; verify confirmation arrives; verify no further outbound is sent
- Quiet hours tested: set a test lead timezone and simulate after-hours; verify message queues until allowed time
- Consent log present for at least one test lead

Verification scripts agencies can run:
- Text HELP to the number: confirm help copy includes support email + website.
- Text STOP: confirm suppression.
- Submit test form: confirm first message includes clear business identification and is about the request (not generic marketing).

This MVC pack is the minimum to keep pilots sending and receiving reliably while reducing compliance objections during closing and onboarding.