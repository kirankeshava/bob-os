# Local Lead Response Copilot — STOP/HELP + Quiet Hours + Consent Logging (Agency Implementation + Verification Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:00:37.152Z

---

Below is a copy/paste, minimum-viable compliant implementation and verification pack for pilot agencies using Local Lead Response Copilot (proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4, support: agent_bob_replit+lead-copilot@agentmail.to).

1) STOP / START / HELP — REQUIRED BEHAVIOR
A. Keywords to recognize (case-insensitive; trim punctuation):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- START, YES, UNSTOP → opt back in (only if previously opted out)
- HELP, INFO → help response
Precedence rule: If message contains any STOP keyword, treat as STOP even if it also contains HELP.

B. STOP auto-reply (send exactly once per opt-out event)
“Local Lead Response Copilot: You’re opted out and will no longer receive texts. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

C. HELP auto-reply (send anytime; do NOT change consent)
“Local Lead Response Copilot support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

D. START/UNSTOP auto-reply (only if opted out)
“You’re re-subscribed. Msg & data rates may apply. Reply STOP to opt out. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

E. Suppression enforcement (non-negotiable)
- Maintain a GLOBAL suppression list keyed by E.164 phone number.
- Once a number is opted out, block ALL outbound messages across all clients/workspaces until START/UNSTOP is received.
- If an outbound send is attempted to a suppressed number, do not send; log event “OUTBOUND_BLOCKED_SUPPRESSED”.

F. Required audit log events (store minimum 12 months; exportable)
- INBOUND_RECEIVED (phone, message body, timestamp UTC, provider message SID)
- CONSENT_OPT_OUT (phone, keyword matched, timestamp UTC, source=“sms_inbound”)
- CONSENT_OPT_IN (phone, keyword matched, timestamp UTC, source=“sms_inbound”)
- AUTO_REPLY_SENT (type=STOP|HELP|START, timestamp UTC, provider SID)
- OUTBOUND_BLOCKED_SUPPRESSED (campaign/workflow id, timestamp UTC)

2) QUIET HOURS BY TIMEZONE — IMPLEMENTATION SPEC
Goal: prevent messages during restricted local times while preserving “speed-to-lead” by scheduling the next allowed send.

A. Default allowed window (configurable per client)
- Allowed: 08:00–20:00 recipient local time, Monday–Saturday
- Sunday: allowed 10:00–18:00 (or disable Sunday sending)

B. Timezone resolution order (deterministic)
1) Lead-provided timezone field (if captured)
2) Property/service address → geocode → timezone
3) Client business timezone (fallback)
4) If unknown, treat as client timezone but log TIMEZONE_FALLBACK_USED

C. Algorithm
- When an outbound SMS is requested, compute recipientLocalTime.
- If within allowed window: send immediately.
- If outside allowed window: enqueue message with “deferred_until” = next window start in recipient timezone.
- If multiple deferred messages exist for same lead/phone, dedupe to most recent message (avoid bursts).

D. Overrides
- Manual override flag (per send) for true emergencies only; requires agent note and logs QUIET_HOURS_OVERRIDE.
- System override: if lead explicitly texts first (inbound within last 5 minutes), you may reply once even during quiet hours; log QUIET_HOURS_INBOUND_EXCEPTION.

E. Required logs
- OUTBOUND_DEFERRED_QUIET_HOURS (phone, deferred_until, timezone_source)
- OUTBOUND_SENT (phone, send_time_utc, recipient_timezone)

3) CONSENT LOGGING — MINIMUM REQUIRED FIELDS
For every lead record where texting occurs, log:
- consent_status: opted_in | opted_out | unknown
- consent_timestamp_utc
- consent_source: webform | facebook_lead_ad | sms_inbound | manual
- consent_text_snapshot: exact opt-in language shown at capture time
- capture_url: page URL or FB form name/id
- ip_address (if web)
- user_agent (if web)
- lead_phone_e164
- business/client_id
- operator_id (if manual)
Retention: store at least 12 months; ability to export a “proof of consent” bundle per phone number.

4) AGENCY HANDOFF — WHERE TO PASTE OPT-IN LANGUAGE (COPY/PASTE)
A. Webflow/Website forms (place directly under phone field)
“By submitting, you agree to receive text messages from us about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

B. Typeform (in the phone-number question description)
“Consent: You agree to receive texts about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

C. Meta/Facebook Lead Ads (add to ‘Privacy policy’ and ‘Custom disclaimer’)
Custom disclaimer text:
“By submitting, you agree to receive text messages about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

5) VERIFICATION TEST MATRIX (PILOT SIGN-OFF)
Run on a staging or real number before going live:
- Send inbound “STOP” → expect STOP confirmation; verify suppression flag set; outbound attempts blocked.
- Send inbound “HELP” → expect HELP response; verify consent unchanged.
- After STOP, send inbound “START” → expect resubscribe confirmation; verify suppression removed.
- Send “Stop!!!” and “unsubscribe” → verify keyword normalization.
Evidence to capture for agency/client:
- Timestamped logs for each required audit event
- Provider message SIDs for auto-replies

Content safety notes (deliverability): keep messages under ~160 chars when possible, avoid URL shorteners, avoid excessive punctuation, avoid “free/guarantee/act now” spam phrasing, and ensure every conversation can surface support (agent_bob_replit+lead-copilot@agentmail.to) plus opt-out instructions.
