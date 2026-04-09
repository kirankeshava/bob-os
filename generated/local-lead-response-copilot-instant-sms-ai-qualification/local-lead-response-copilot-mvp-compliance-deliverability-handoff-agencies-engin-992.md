# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Agencies + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:46:42.370Z

---

Below is the MINIMUM VIABLE compliance/deliverability pack to launch pilots safely (home services/local). It is designed to remove sales objections and reduce Twilio/carrier enforcement risk.

========================
1) WHAT AGENCY MUST IMPLEMENT (NON‑NEGOTIABLE)
========================
A) Explicit SMS consent on the lead capture point (form/ad).
B) STOP/HELP handling on inbound SMS + suppression list that blocks future sends.
C) Quiet hours by lead’s timezone (or a safe fallback).
D) Consent logging (who, what, when, source).
E) Message templates that avoid spam triggers and include identity.

Use these business references in proposals/onboarding:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

========================
2) COPY/PASTE OPT‑IN SNIPPETS (BY SOURCE)
========================

2.1 WEBFLOW FORM (checkbox + disclosure)
Field label (required checkbox):
“I agree to receive text messages about my request.”

Disclosure text (place directly under the checkbox):
“By submitting, you agree to receive SMS messages from [BUSINESS NAME] about your request and appointment. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Implementation notes:
- Checkbox must be unchecked by default.
- Store: timestamp, page URL, IP (if available), form name, and the exact disclosure text version.


2.2 TYPEFORM (statement + required ‘Yes’)
Question: “SMS Updates” (required)
Answer choices: “Yes, text me” / “No”

Statement (Typeform description):
“Opt in to SMS from [BUSINESS NAME] about your inquiry and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Logic:
- If “No”: do not send SMS; fall back to email.


2.3 META/FACEBOOK LEAD ADS (Disclaimer)
Add to the Lead Form “Custom Disclaimer” (or add a question + disclaimer if needed):
“By submitting, you agree to receive SMS messages from [BUSINESS NAME] about your request and appointment. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Operational notes:
- Store the Meta lead form ID + campaign/ad identifiers alongside consent.

========================
3) DEFAULT COMPLIANT MESSAGE TEMPLATES (LOW RISK)
========================

3.1 FIRST MESSAGE (sent immediately after lead)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address (city) and preferred time window? Reply STOP to opt out.”

3.2 QUALIFICATION (keep short; no excessive punctuation/links)
“Thanks—how soon do you need this done? (1) ASAP (2) This week (3) Just researching. Reply STOP to opt out.”

3.3 BOOKING CONFIRMATION
“Booked for {{date}} at {{time}}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

3.4 MISSED CALL TEXTBACK
“Sorry we missed you—this is {{business_name}}. Want to book a quick call or appointment? Reply 1 for call, 2 for appointment. Reply STOP to opt out.”

3.5 RE‑ENGAGEMENT (after quiet hours, or 24–72h later)
“Still want help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

Content guardrails (deliverability):
- Avoid “FREE”, “GUARANTEED”, “ACT NOW”, all-caps, excessive emojis/symbols.
- Keep links minimal; if used, use your domain and only after the user responds once.
- Always include business identity early (especially first message).

========================
4) STOP/HELP HANDLING — IMPLEMENTATION SPEC (TWILIO-STYLE)
========================
Keywords (case-insensitive, trimmed of punctuation):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO

Rules:
1) If inbound matches STOP set:
   - Immediately mark (phone_number) as “suppressed=true” in a GLOBAL suppression list.
   - Send ONE confirmation message only:
     “You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.”
   - Block all future outbound messages to that number across all subaccounts/locations.

2) If inbound matches HELP set:
   - Reply:
     “{{business_name}}: messaging help. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

3) If suppressed=true and any workflow attempts outbound:
   - Do not send.
   - Log event: outbound_blocked_reason=suppressed.

Audit logs to store (minimum):
- phone_number
- keyword_detected (STOP/HELP/none)
- timestamp (UTC)
- raw_inbound_body
- message_sid/provider_id
- action_taken (suppressed, help_sent, confirm_sent, blocked_outbound)

Verification (must pass before pilot go-live):
- Send “STOP” → receive confirm → attempt outbound → blocked.
- Send “HELP” → receive help.
- Send “Stop.” (with punctuation) → treated as STOP.

========================
5) QUIET HOURS BY TIMEZONE — IMPLEMENTATION SPEC
========================
Default quiet window (recommended for pilots):
- Do not send outbound between 9:00 PM and 8:00 AM lead-local time.

Timezone resolution order:
1) If lead provided ZIP/city/state → geocode to timezone.
2) Else if phone has reliable area-code timezone mapping → use it (flag as “estimated”).
3) Else fallback to business timezone (configured per account).

Behavior:
- If a message is triggered during quiet hours, queue it for the next allowed time (8:05 AM local).
- Booking confirmations may be allowed until 9:30 PM local if the user is actively texting (optional override).
- Always respect STOP suppression regardless of quiet hours.

DST:
- Use IANA tz (e.g., America/Chicago) and a real timezone library.

Required logging:
- lead_timezone_source (geocode/area-code/fallback)
- queued_until_timestamp
- sent_timestamp

========================
6) CONSENT LOGGING (MINIMUM FIELDS)
========================
Store per lead:
- phone_number
- consent_status (opted_in/opted_out/unknown)
- consent_source (webflow/typeform/meta/manual)
- consent_timestamp_utc
- consent_text_version (store the exact disclosure text)
- form/ad identifier (form name, typeform ID, meta lead form ID)
- page_url (if web)
- suppression_timestamp_utc (if STOP)

========================
7) TWILIO DELIVERABILITY BASICS (NO-SPEND SETTINGS)
========================
- Use a Messaging Service (not single random numbers).
- Enable sticky sender where appropriate.
- Don’t rotate numbers aggressively (looks like spam).
- Maintain low complaint rate by honoring STOP immediately.
- If scaling on 10DLC: complete A2P brand/campaign registration (may involve carrier fees later).

========================
8) AGENCY GO‑LIVE CHECKLIST (FAST)
========================
1) Paste opt-in snippet into the lead source and ensure it’s visible before submit.
2) Ensure checkbox/Yes is required and unchecked by default.
3) Confirm first message template includes business identity + STOP.
4) Test STOP, then confirm suppression blocks outbound.
5) Confirm quiet-hours queueing works using a lead in a different timezone.
6) Verify consent logs are being captured (timestamp + source + disclosure).

If an agency asks “are you compliant?” answer:
“We implement explicit opt-in language at capture, immediate STOP/HELP handling with global suppression, quiet hours by lead timezone, and consent logging for audits. See website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and support: agent_bob_replit+lead-copilot@agentmail.to.”