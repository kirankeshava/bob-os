# MV-Compliance Pilot Launch Pack — Opt-in Copy, STOP/HELP, Quiet Hours, Consent Logging (Agency + Engineering Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:14:50.707Z

---

Business legitimacy links (use in all client-facing materials)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime scope)
Implement only what prevents carrier/TCPA issues and removes onboarding objections:
1) Clear express written consent language at the point of lead capture
2) STOP/HELP handling + global suppression
3) Quiet hours by timezone (safe defaults)
4) Consent + message audit logging

A) Copy/paste opt-in language (agency snippets)

1) Webflow form checkbox + disclosure (paste near submit button)
Checkbox label:
“I agree to receive text messages about my request.”
Disclosure (small text):
“By submitting, you consent to receive SMS/text messages from [BUSINESS NAME] about your inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
Required fields to capture: phone, first name, service needed, ZIP/city, and a consent checkbox value (true/false) with timestamp.

2) Typeform (add as “Statement” block before submit)
“By continuing, you agree that [BUSINESS NAME] may text you about your request (appointment scheduling and service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”
Implementation note: include a Yes/No consent question and only send SMS if “Yes.”

3) Meta/Facebook Lead Ads (paste into “Privacy Policy” / custom disclaimer)
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
Lead Ad setup: enable the required consent checkbox/disclaimer if available; ensure the phone field is required.

B) Minimum viable message templates (safe + fast)

1) First text (send within 10–60 seconds)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job?”
(If needed add one line on second message, not first): “Reply STOP to opt out.”

2) Qualification (keep to 1 question per message)
“Thanks. When would you like us to come out — today/tomorrow, or later this week?”

3) Booking handoff
“Perfect — I can get you on the schedule. What’s the best time window (AM/PM) and a good email for the confirmation?”

4) If no response (after 15–30 min, during allowed hours)
“Quick check — do you still want help with {service}? If yes, reply with a good time window (AM/PM).”

Content guardrails (deliverability)
- Avoid: “FREE!!!”, “WIN”, “GUARANTEED”, excessive links, URL shorteners, all-caps, repeated emojis.
- Prefer: short, contextual, 1 question at a time, no more than 1 link per thread (and only if necessary).

C) STOP/HELP handling (engineering spec)

STOP keywords (case-insensitive, trim punctuation/spaces): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
HELP keywords: HELP, INFO.

Behavior:
1) On inbound STOP keyword:
- Immediately mark phone as “suppressed=true” in a global suppression list (per client subaccount/tenant + global master).
- Send one confirmation message only:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
- Do not send any further outbound messages to that phone unless the user re-consents via a fresh opt-in flow.

2) On inbound HELP keyword:
- Send:
“{business_name} SMS help: replies are used to schedule service. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

3) Re-consent rule (minimum viable)
- Do NOT auto-resubscribe on “START/YES”. Only resubscribe if a new lead form submission includes consent=true with a new timestamp.

Audit logging fields (store for every inbound/outbound)
- tenant_id, lead_id (if known), phone_e164, message_direction (in/out), provider_message_id, timestamp_utc, local_time + timezone, content_hash (optional), body (or redacted), consent_status_at_send, suppression_status_at_send, template_id, user_agent/source (form/meta/typeform), ip_address (if available), optin_timestamp_utc.

Verification test (10 minutes)
1) Submit a test lead with consent=true → confirm first message sends.
2) Reply “HELP” → confirm HELP response.
3) Reply “STOP” → confirm opt-out confirmation and suppression flag.
4) Trigger another outbound attempt → must be blocked + logged as “blocked_suppressed.”

D) Quiet hours by timezone (implementation spec)

Default quiet hours window (recommended wartime-safe):
- No outbound messages between 9:00 PM and 8:00 AM recipient local time.

Timezone resolution order:
1) Lead ZIP/postal → map to timezone.
2) Lead city/state → map.
3) Phone number area code → approximate.
4) Fallback: tenant’s default timezone.

Send logic:
- If lead arrives during quiet hours: send immediately at next allowed time (8:00 AM local). Log “queued_quiet_hours=true”.
- If lead arrives near boundary: never send after 9:00 PM local.
- Daylight savings: rely on IANA timezone (e.g., America/Chicago) not a fixed offset.

Override (optional but simple):
- Tenant setting “Allow after-hours for emergency jobs” (default OFF). If ON, restrict to predefined categories only.

E) Agency go-live checklist (minimum)
1) Confirm lead source has explicit SMS consent disclosure + checkbox/statement included (use snippets above).
2) Confirm legal links point to the website page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (replace with final Terms/Privacy URLs once published).
3) Confirm STOP/HELP works end-to-end using the 10-minute test.
4) Confirm quiet hours enabled and timezone mapping works for at least 2 ZIP codes in the service area.
5) Confirm suppression is global per tenant and persists across new leads unless fresh consent captured.

If an agency/client asks “Are we compliant?” (one-paragraph objection handler)
“We capture express consent at the point of lead submission with clear SMS disclosure (msg rates, frequency, STOP/HELP, and legal links). Every outbound message is blocked if the number is suppressed, STOP/HELP is handled automatically with confirmation, and we enforce quiet hours by recipient timezone with queued sends. We also log consent + messaging events for auditing to reduce carrier and TCPA risk.”
