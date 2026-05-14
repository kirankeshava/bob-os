# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:24:15.420Z

---

Purpose (Week-1 MVP): Remove the #1 onboarding objections and reduce carrier/TCPA enforcement risk with (1) explicit opt-in language, (2) functional STOP/HELP handling, (3) quiet hours, and (4) consent logging. This is not a substitute for legal advice; it is an implementation playbook aligned with common TCPA/CTIA carrier expectations.

Business legitimacy links/support (use in all materials):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED OPT-IN FIELDS (capture these in every lead source)
- Phone number (required)
- Consent checkbox OR equivalent disclosure acceptance (required)
- Source metadata: form name/ad name/page URL (required for auditing)
- Timestamp + IP/User-Agent if available (recommended)

2) COPY/PASTE OPT-IN LANGUAGE SNIPPETS
2.1 Webflow (checkbox + helper text)
Checkbox label (required):
“I agree to receive text messages from [BUSINESS NAME] about my request.”
Helper text (directly below checkbox):
“By checking this box, you consent to receive SMS messages (including automated texts) from [BUSINESS NAME] at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not a condition of purchase. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”
Implementation notes:
- Checkbox must be unchecked by default.
- Store checkbox true/false + timestamp.

2.2 Typeform (statement + yes/no)
Add a required Yes/No question:
Question: “Do you agree to receive text updates about your request?”
Yes description (disclosure text):
“Yes — I consent to receive SMS messages (including automated texts) from [BUSINESS NAME] at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
No description:
“No — do not text me.”
Routing: If “No”, do not trigger SMS; optionally trigger email-only follow-up.

2.3 Meta/Facebook Lead Ads (custom disclaimer)
Add to the “Privacy policy / Custom disclaimer” section:
“By submitting this form, you agree to receive SMS messages (including automated texts) from [BUSINESS NAME] about your request at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

3) COMPLIANT MESSAGE TEMPLATES (LOW-SPAM, HIGH-CLARITY)
3.1 First message (immediate speed-to-lead)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}} — got your request for {{service}}. Are you looking to get this done in the next (A) 0–7 days (B) 1–4 weeks (C) just pricing? Reply A/B/C. Reply STOP to opt out.”

3.2 Qualification follow-up (only after user responds)
“Thanks. What’s the address/zip for the job? (So I can check availability.) Reply STOP to opt out.”

3.3 Booking push
“Got it. Want to book a quick call or on-site estimate? Reply 1 for call, 2 for appointment. Reply STOP to opt out.”

3.4 Missed-call text-back
“Sorry we missed you — this is {{business_name}}. What time works best for a quick call today? Reply with a time. Reply STOP to opt out.”

3.5 Re-engagement (1 gentle ping only)
“Hi {{first_name}} — still need help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

Content guidelines (deliverability):
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “GUARANTEED”, misleading urgency.
- Keep links minimal; if needed, use your branded domain and avoid link shorteners.
- Include business name early; include STOP language at least in first message and periodically thereafter.

4) STOP/HELP HANDLING — IMPLEMENTATION SPEC (TWILIO-LIKE SMS)
4.1 Keywords
- STOP triggers: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP triggers: HELP, INFO
- START triggers (optional re-subscribe): START, YES (only if you choose to support re-opt-in)

4.2 Behavior
On inbound message:
A) Normalize body: trim spaces, uppercase.
B) If STOP keyword:
- Add phone to Global Suppression List (account-wide, per client subaccount if multi-tenant).
- Log event (see Consent Log schema below).
- Send confirmation (required):
  “You’re unsubscribed from {{business_name}} texts. No more messages. Reply START to resubscribe or email us at agent_bob_replit+lead-copilot@agentmail.to.”
- Block all future outbound SMS to that phone until re-opt-in.
C) If HELP keyword:
- Send help response:
  “{{business_name}}: We text about your request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
D) If START (optional):
- Only remove suppression if you have an allowed re-opt-in policy AND you log it as renewed consent.
- Reply:
  “You’re re-subscribed to {{business_name}} texts. Reply STOP to opt out.”

4.3 Outbound send guard
Before sending any SMS, check suppression list. If suppressed, do NOT send; log “blocked_suppressed”.

4.4 Verification checklist (run in staging)
- Send STOP from test phone → confirm suppression + confirm message returned.
- Attempt outbound after STOP → must be blocked.
- Send HELP → must return help message.
- (If enabled) Send START → suppression removed and outbound allowed.

5) QUIET HOURS BY TIMEZONE — IMPLEMENTATION SPEC
Goal: Don’t text leads at night in their local time. Default window: 8:00 AM–8:00 PM local.

5.1 Timezone resolution order
1) Lead-provided zip/postal code → map to timezone.
2) Form/ad geolocation fields (city/state) → map to timezone.
3) Phone number area code heuristic (fallback).
4) If unknown: assume business timezone and apply conservative window (9 AM–7 PM).

5.2 Sending rules
- If lead arrives outside window: queue first message for next allowed time (e.g., 8:05 AM) and mark as “queued_quiet_hours”.
- If human overrides (owner “send anyway”): allow but log override reason.
- DST: rely on IANA tz database (e.g., America/Chicago).

5.3 Edge cases
- If lead responds during quiet hours: allow a single transactional reply if user-initiated (recommended), but avoid multi-message sequences.
- Multi-tenant: quiet hours should be configurable per client.

6) CONSENT + AUDIT LOGGING (MINIMUM SCHEMA)
Store these records for each phone:
- phone_e164
- consent_status: opted_in | opted_out
- consent_source: webflow_form | typeform | fb_lead_ad | manual
- consent_text_version (string)
- consent_timestamp_utc
- consent_capture: checkbox=true/false, plus raw text shown
- lead_metadata: page_url, form_name, campaign/ad identifiers
- events[]: {timestamp_utc, type: inbound|outbound|stop|help|blocked_suppressed|queued_quiet_hours, message_body, provider_message_id}

7) AGENCY HANDOFF — GO LIVE IN 30 MINUTES
Step-by-step:
1) Paste the opt-in snippet into the form/lead source and ensure checkbox is unchecked by default.
2) Ensure your CRM/form webhook passes: phone, first_name, service, consent=true, timestamp, source.
3) Turn on STOP/HELP handling and suppression checks before every send.
4) Turn on quiet hours with timezone mapping.
5) Send 3 test leads (daytime) and confirm: first text, qualification, booking.
6) Run STOP/HELP tests and retain logs (screenshots or exported events) for compliance evidence.

What agencies can say to prospects (objection killer, 2 lines):
“We only text people who explicitly opt in on your form/ad, every message supports STOP/HELP, and we enforce quiet hours by the lead’s timezone. We also log consent + opt-out events for auditability.”

Placeholders to replace once published:
- [PRIVACY_URL] and [TERMS_URL] should point to live pages hosted on your website path.
