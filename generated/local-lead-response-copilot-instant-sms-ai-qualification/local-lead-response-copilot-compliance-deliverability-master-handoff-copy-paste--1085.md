# Local Lead Response Copilot — Compliance + Deliverability Master Handoff (Copy/Paste + Engineering Specs + Verification)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:51:07.176Z

---

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance contact: agent_bob_replit+lead-copilot@agentmail.to

Goal: minimum-viable compliant SMS that maximizes deliverability for pilots. This pack is designed for home services/local high-intent businesses using instant SMS + AI qualification.

1) COPY/PASTE OPT-IN LANGUAGE (LEAD SOURCES)
A. Webflow / Website Form (checkbox + disclosure)
Checkbox label:
[ ] I agree to receive text messages about my request and appointment scheduling.

Disclosure (place directly under phone field or checkbox):
“By submitting this form, you agree to receive SMS messages from {BUSINESS_NAME} about your request, scheduling, and service updates. Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms: {TERMS_URL} and Privacy: {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to. Powered by Local Lead Response Copilot: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

B. Typeform (statement + required “I agree”)
Question: “SMS Consent” (Required)
Options: “I agree” / “I do not agree”
Description:
“Agreeing allows {BUSINESS_NAME} to text you about your request, scheduling, and service updates. Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: {TERMS_URL} Privacy: {PRIVACY_URL} Support: agent_bob_replit+lead-copilot@agentmail.to (Local Lead Response Copilot: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4).”

C. Meta/Facebook Lead Ads (Disclaimer field + follow-up)
Lead form Disclaimer (add to “Custom Disclaimer”):
“By submitting, you agree to receive SMS from {BUSINESS_NAME} about your request and scheduling. Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent not required as a condition of purchase. Terms: {TERMS_URL} Privacy: {PRIVACY_URL} Support: agent_bob_replit+lead-copilot@agentmail.to. Local Lead Response Copilot: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

2) MESSAGE TEMPLATES (DELIVERABILITY-SAFE)
Rules: keep first message short; avoid ALL CAPS, excessive punctuation, “free!!!”, link shorteners; only include one link when needed; identify the business.

A. First message (immediate after lead)
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Saw your request for {service}. What’s the address or ZIP so I can confirm availability?”

B. Qualification (2–4 questions max)
1) “What day/time works best for a quick call or appointment—today, tomorrow, or another day?”
2) “Is this for a new issue or ongoing?”
3) “Any photos you can share? (Optional)” (Only if MMS is enabled and consented)

C. Booking / confirmation
“Perfect. I can book you for {slot}. Reply YES to confirm, or send a better time.”

D. Missed-call textback (if enabled)
“Missed your call—this is {BUSINESS_NAME}. Want to book service? Reply with your ZIP and best time today.”

E. Re-engagement (1 follow-up only; respect quiet hours)
“Checking in—do you still need help with {service}? Reply 1) Yes 2) Not anymore. Reply STOP to opt out.”

3) STOP/HELP IMPLEMENTATION (REQUIRED)
3.1 Keyword handling (case-insensitive; trim punctuation)
STOP keywords (immediate opt-out): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO, SUPPORT

3.2 State machine
States: CONSENTED, PENDING_CONFIRMATION (optional), OPTED_OUT
Inbound STOP from any state => OPTED_OUT
Inbound HELP from any state => send HELP response (do not change consent state)

3.3 Required responses (exact templates)
STOP confirmation (send once, immediately):
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to re-subscribe. Support: agent_bob_replit+lead-copilot@agentmail.to. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

HELP response:
“{BUSINESS_NAME} SMS support: agent_bob_replit+lead-copilot@agentmail.to. Msg & data rates may apply. Reply STOP to opt out. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

START (optional resubscribe; only if your policy supports it):
“You’re re-subscribed to {BUSINESS_NAME} texts. Msg & data rates may apply. Reply STOP to opt out.”

3.4 Outbound blocking (hard requirement)
If recipient is OPTED_OUT, block all outbound messages across:
- all workflows
- all numbers/messaging services
- all clients (global suppression list)
Log event: outbound_blocked_opted_out.

3.5 Edge cases
- If user sends STOP plus additional text (“stop texting me”): treat as STOP.
- If STOP received during a conversation: opt-out overrides everything.
- If HELP received after STOP: still respond with HELP, but remain OPTED_OUT.

4) QUIET HOURS BY TIMEZONE (IMPLEMENTATION SPEC)
Objective: do not send non-critical messages outside allowed local hours.

4.1 Allowed window (default)
Allowed send window: 08:00–20:00 recipient local time, Mon–Sat. (Sunday optional; default off unless client enables.)
Message types always allowed: STOP confirmation, HELP response (compliance).

4.2 Timezone resolution order
1) Lead-provided ZIP/postal code => timezone lookup
2) Address city/state => timezone lookup
3) Area code of phone => best-effort timezone
4) Business default timezone (client setting)
Log resolved_timezone_source.

4.3 Deferral behavior
If message scheduled outside window:
- Place into “deferred_send_queue” with next_send_at (next allowed minute)
- Deduplicate: if multiple messages queued, keep only latest per conversation thread unless explicitly marked “must_send_all”.
- Send at next_send_at in order.
Log: message_deferred, message_sent_from_deferral.

4.4 Overrides
- Admin override flag per client: allow_after_hours=true for emergency use only (must be auditable).
Log: quiet_hours_override_used.

5) CONSENT + AUDIT LOGGING (DISPUTE-READY)
Store per recipient:
- recipient_phone (E.164)
- consent_status (CONSENTED/OPTED_OUT)
- consent_source (webform/typeform/meta/other)
- consent_text_snapshot (the exact disclosure shown)
- consent_timestamp_utc
- consent_ip (if available)
- consent_user_agent (if available)
- lead_ad_id/form_id (if available)
- campaign/client_id
- last_opt_out_timestamp_utc
- opt_out_keyword (STOP/UNSUBSCRIBE/etc)
- message_log: {timestamp_utc, direction, body, template_id, twilio_message_sid/provider_id, status}
Retention: minimum 24 months recommended; must support export by phone number for disputes.

6) TWILIO / DELIVERABILITY HARDENING (PILOT DEFAULTS)
- Use a Messaging Service (not raw numbers) to centralize compliance features and scaling.
- Choose route:
  a) Low volume pilots: toll-free or 10DLC depending on client; avoid random number churn.
  b) Higher volume / US long code: register A2P 10DLC Brand + Campaign.
- Content guardrails:
  - Identify business early in thread.
  - Avoid link shorteners; prefer full domain.
  - Do not use “free/guaranteed/winner” language.
  - Keep templates consistent; reduce rapid-fire multi-part messages.
- Fallback behaviors:
  - If send fails with filtering/carrier violation: stop automation, alert admin, and require manual review.

7) VERIFICATION TEST MATRIX (SIGN-OFF)
STOP tests:
- Send “STOP” inbound -> confirm opt-out message sent; consent_status becomes OPTED_OUT; outbound attempts blocked.
- Send “stop texting me” inbound -> same behavior.
HELP tests:
- Send “HELP” inbound -> HELP response returned; no opt-out triggered.
Quiet hours tests:
- Trigger lead at 22:00 local -> message_deferred logged; sent at next allowed time.
Logging tests:
- Export consent record and message log for a test phone number.

8) AGENCY HANDOFF: HOW TO DEPLOY IN 30 MINUTES
1) Add opt-in disclosure + checkbox (Webflow/Typeform) or Disclaimer (Meta Lead Ads) using snippets above.
2) Ensure form captures: phone, first name, service type, ZIP/address (for timezone).
3) Trigger the Copilot workflow via webhook/Zapier/Make; pass consent_source and consent_text_snapshot.
4) Confirm STOP/HELP routes are wired to the inbound webhook and update suppression list globally.
5) Run the verification test matrix before going live.

Note: Replace {TERMS_URL} and {PRIVACY_URL} with published URLs once available. Support contact must remain: agent_bob_replit+lead-copilot@agentmail.to and proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.
