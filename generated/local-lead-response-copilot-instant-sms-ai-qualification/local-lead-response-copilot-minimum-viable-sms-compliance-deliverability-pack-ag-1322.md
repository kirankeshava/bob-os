# Local Lead Response Copilot — Minimum-Viable SMS Compliance & Deliverability Pack (Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:17:25.237Z

---

Purpose (pilot-ready, minimal): This pack covers the minimum compliance/deliverability requirements that prevent carrier blocks and onboarding churn for Local Lead Response Copilot (Instant SMS + AI Qualification). It is designed for agencies to copy/paste into forms/ads and for engineering to implement without ambiguity.

Business references for legitimacy/support:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Mandatory opt-in (copy/paste snippets)
A) Webflow / Website form checkbox (recommended)
Checkbox label (required):
“I agree to receive text messages about my inquiry and appointment from {BUSINESS NAME} at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Terms and Privacy.”
Implementation notes:
- Checkbox must be unchecked by default.
- Store: checkbox=true, timestamp, page URL, IP (if available), form name, and the exact disclosure text version.

B) Typeform consent block
Add a required “Legal” / “Statement” plus a Yes/No question:
Statement:
“By submitting, you consent to receive text messages about your request from {BUSINESS NAME}. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Question:
“Do you agree to receive text messages about your request?” (Yes required)

C) Meta/Facebook Lead Ads (higher scrutiny)
In Lead Form > Privacy Policy: link to {PRIVACY_URL}.
Add custom disclaimer (near submit):
“By tapping Submit, you agree to receive automated text messages from {BUSINESS NAME} regarding your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

2) First message template (must include identity + opt-out)
Send immediately after lead capture (or after first human call attempt):
“Hi {first_name} — this is {agent_name} with {BUSINESS NAME}. Got your request for {service_type}. What’s the address/ZIP for the job? Reply STOP to opt out.”
Rules:
- Always identify the business in message #1.
- Avoid link-shorteners; if a link is needed, use your own domain.

3) STOP/HELP handling (implementation spec)
Keywords to treat as opt-out (case-insensitive, trim punctuation/whitespace):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
On receiving an opt-out keyword:
- Immediately mark phone as “suppressed=true” (global suppression across all tenants unless you have strict tenant separation; minimum: per-tenant suppression).
- Send exactly one confirmation message:
“You’re unsubscribed from {BUSINESS NAME} texts. No more messages will be sent. Reply HELP for help.”
- Block all future outbound messages to suppressed numbers (including queued messages). Log the blocked attempt.

HELP handling keywords:
HELP, INFO, SUPPORT
On receiving HELP:
“{BUSINESS NAME}: We text about your service request/appointment. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

Edge cases:
- If a user texts STOP after business hours, still process immediately and suppress immediately.
- If a user texts START/UNSTOP (optional): only re-enable if your compliance policy supports it; otherwise instruct them to re-submit the form.

4) Quiet hours (pilot-safe default)
Goal: avoid after-hours outreach that triggers complaints.
Default send window (local to the lead): 8:00 AM – 8:00 PM, Monday–Saturday. Sunday: 10:00 AM – 6:00 PM.
Timezone resolution order:
1) If lead has ZIP/address, map to timezone.
2) Else if area code reliably maps, use area-code timezone.
3) Else default to the business’s timezone.
Behavior:
- If lead arrives outside window: send next at the start of next window.
- If a conversation is already active and the lead replies inbound, you may respond even in quiet hours only if it’s a direct reply within 5 minutes and message is strictly transactional (no marketing). Otherwise queue.

5) Consent logging (minimum fields for audit)
Store per lead:
- phone, first_name, source (Webflow/Typeform/FB), source_form_id
- consent_status (granted/denied), consent_timestamp (UTC)
- consent_language_version (exact text or hash)
- capture_page_url, referrer (if available)
- ip_address (if available)
- message_send_log: message_id, timestamp, template_name, content_hash, status (sent/delivered/failed/blocked_suppressed)
- stop_event_log: inbound_text, timestamp, provider_message_id
Retention: 24 months minimum (carrier/TCPA dispute window).

6) Deliverability content rules (minimum)
- Do not include: “FREE!!!”, excessive caps, repeated punctuation, or deceptive claims.
- Keep messages short, conversational, and directly tied to the lead’s request.
- No affiliate-style language; no unrelated promotions.
- Avoid sending multiple messages back-to-back without waiting for a reply (max 1 follow-up after 5–10 minutes, then next day during quiet hours).

7) Agency go-live checklist (15 minutes)
- Confirm opt-in checkbox/statement is required and not pre-checked.
- Submit a test lead with your own phone; confirm first message includes business name + STOP.
- Text HELP; confirm help message returns support email.
- Text STOP; confirm unsubscribe message and that further outbound is blocked.
- Submit a lead outside quiet hours; confirm message is queued.

Notes: This MVC pack is intentionally minimal to remove sales objections and prevent account enforcement. Once the first paid pilots are live, expand with A2P 10DLC registration details (brand/campaign), per-tenant suppression policies, and full monitoring dashboards.