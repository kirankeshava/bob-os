# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:24:29.049Z

---

Purpose (wartime MVP)
This document contains the minimum compliance + deliverability components required to (1) remove common agency/customer objections, (2) reduce carrier filtering/enforcement risk, and (3) prevent consumer complaints. It is designed for fast pilot launches for Local Lead Response Copilot.
Legitimacy/support references:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Opt‑in language (copy/paste)
Use one of these snippets wherever leads submit their phone number.

1A) Webflow / embedded form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request from [BUSINESS NAME]. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Helper text below submit button (small text):
“By submitting, you consent to receive SMS regarding your inquiry and appointment scheduling. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”
Implementation notes:
- Checkbox must be unchecked by default.
- Store checkbox=true + timestamp + source URL + IP (if available).

1B) Typeform (consent statement)
Add a “Statement” block immediately before submission:
“By submitting this form, you consent to receive text messages from [BUSINESS NAME] about your inquiry (message frequency varies). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

1C) Meta/Facebook Lead Ads (disclaimer)
In the Lead Form > Privacy Policy / Custom Disclaimer:
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required for purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
Operational note: Ensure the business name displayed matches what the consumer expects to avoid spam reports.

2) Required first message template (compliant + deliverability-safe)
Send immediately after form submit (or within 60 seconds) during allowed hours.
Template:
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job? Reply STOP to opt out.”
Rules:
- Keep under ~160 chars when possible.
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “act now”, or link shorteners.
- Include STOP line at least on first message and on any re-engagement.

3) Qualification flow (AI-driven, short)
Q1:
“Thanks—what’s the best time for service: ASAP, this week, or just a quote? Reply STOP to opt out.”
Q2 (only if needed):
“Any details we should know (size, urgency, photos available)? Reply STOP to opt out.”
Booking prompt:
“I can get you on the calendar. Prefer {option1} or {option2}? Reply STOP to opt out.”

4) STOP/HELP handling (engineering spec)
Goal: immediate compliance, reduced complaints, and auditable suppression.

4A) Keyword matching (case-insensitive; trim punctuation)
STOP keywords (treat as opt-out):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords:
HELP, INFO, SUPPORT
Edge rule: If message contains only a stop keyword (or stop keyword with punctuation), treat as STOP.

4B) STOP behavior
On inbound STOP:
- Mark contact as opted_out=true immediately.
- Add phone to GLOBAL suppression list (shared across all subaccounts/tenants if you operate multi-tenant; at minimum per-tenant plus a global list).
- Send ONE confirmation message (no marketing):
“{business_name}: You’re unsubscribed and will no longer receive texts. Reply HELP for help.”
- Block all future outbound messages to that phone unless they explicitly re-opt-in through a compliant form.

4C) HELP behavior
On inbound HELP:
- Do NOT change opt status.
- Respond:
“{business_name} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

4D) Audit logging (minimum fields)
Store an event row per inbound compliance keyword:
- event_type: STOP | HELP
- phone_e164
- tenant_id (if multi-tenant)
- message_body
- detected_keyword
- timestamp_utc
- provider_message_id (Twilio SID if applicable)
- source (sms)

5) Quiet hours by lead timezone (minimum viable)
Goal: prevent late-night messaging + reduce complaints.

5A) Allowed window
Default allowed send window (local lead time): 8:00 AM – 8:00 PM, Monday–Saturday. Sunday optional (off by default for pilots).

5B) Timezone resolution order
1) Lead provided ZIP/address → map to timezone
2) Phone number area code (fallback)
3) Account default timezone (last resort)
If unknown, treat as “most conservative”: do not send until 9:00 AM account default timezone.

5C) Queue behavior
If a lead arrives outside allowed hours:
- Send no SMS immediately.
- Queue the “first message template” for next allowed time (e.g., 8:05 AM local).
- Optional: send an internal notification (email/Slack) to the business owner so they can call manually if desired.

5D) Emergency override
Allow the business to manually send outside quiet hours only if they confirm “lead initiated conversation within last 15 minutes” (reduce complaint risk). Default off.

6) Consent logging schema (minimum viable)
Store consent at capture time (form submit):
- phone_e164
- consent_status: opted_in | opted_out
- consent_timestamp_utc
- consent_source: webflow | typeform | meta_lead_ads | manual
- consent_text_version (hash or version string)
- landing_page_url
- ip_address (if available)
- user_agent (if available)
- business_name presented to user
This supports audits and A2P registration questions later.

7) Twilio deliverability minimums (no spend actions)
- Use a Twilio Messaging Service (even for pilots) so you can:
  - manage sender pooling later,
  - enable sticky sender,
  - add compliance features centrally.
- Ensure inbound webhook points to your STOP/HELP handler.
- Avoid URL shorteners; use full branded domains if linking.
- Keep content transactional and tied to the user’s request; avoid “promos”.
- Throttle bursts: for a new number, keep low volume and consistent patterns.

A2P 10DLC note (defer heavy work until needed):
- If sending significant US volume from 10DLC, you will need Brand + Campaign registration.
- MVP readiness now: have the opt-in language, consent logs, and sample messages ready (this doc provides them).

8) Agency handoff (how to launch a pilot fast)
Step-by-step:
1) Pick lead source (Webflow/Typeform/Meta). Paste the relevant opt-in snippet exactly.
2) Ensure the business name in the opt-in matches what will appear in SMS.
3) Confirm the business hours; set quiet hours to 8a–8p lead local time.
4) Turn on STOP/HELP handling using the spec above. Test with a real phone:
   - Send STOP → confirm you receive unsubscribe confirmation and no further texts.
   - Send HELP → confirm support email response.
5) Save proof: screenshot opt-in + export one consent log record + one STOP event record.
6) For legitimacy, include in proposals/onboarding emails:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
   - Support: agent_bob_replit+lead-copilot@agentmail.to

This is sufficient for pilots: explicit opt-in disclosure, STOP/HELP automation, quiet hours, and auditable consent. Full legal page publishing and A2P campaign registration can follow once pilots prove demand and volume requires it.