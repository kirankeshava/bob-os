# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:29:28.005Z

---

Below is the minimum-viable compliance pack designed to remove the most common pilot objections (TCPA/CTIA, carrier enforcement, “what if someone texts STOP?”) while keeping implementation lightweight.

BUSINESS ID (use everywhere)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) OPT-IN / CONSENT LANGUAGE (COPY/PASTE)
Goal: capture express written consent to receive SMS, disclose msg frequency, STOP/HELP, and link to Terms/Privacy.

A) Webflow / Website Form (recommended checkbox)
Checkbox label (required, unchecked by default):
“I agree to receive text messages about my request (appointment scheduling and updates) from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Implementation notes:
- Store: timestamp, page URL, IP (if available), checkbox true/false, form fields, and the exact consent text version.
- Do not pre-check the box.

B) Typeform
Add a required “Legal” statement + a Yes/No question.
Statement:
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME]. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Question (required): “Do you consent to receive SMS updates about your request at this number?” Yes/No
Only send SMS if Yes.

C) Meta/Facebook Lead Ads (primary text + privacy policy link)
Primary text (include in the ad or follow-up screen):
“By submitting, you agree to receive texts about your request from [BUSINESS NAME]. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Meta setup:
- Ensure the Lead Form includes the Privacy Policy URL field.
- If possible, add a custom disclaimer question confirming SMS consent.

2) FIRST MESSAGE TEMPLATE (COMPLIANT, HIGH DELIVERABILITY)
Send immediately after lead capture.
Template:
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. What’s the address or zip code for the job?”
Follow-up line (include in message 1 or 2 depending on length):
“Reply STOP to opt out, HELP for help.”
Deliverability notes:
- Avoid ALL CAPS, excessive punctuation, and link shorteners.
- Do not include promotional language (“limited time”, “free”, “act now”) in the first touches.

3) STOP / HELP / START HANDLING (ENGINEERING SPEC)
Applies globally across all tenants (businesses) to prevent accidental re-texting.

Keywords (case-insensitive, trim punctuation):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- START/UNSTOP set: START, YES, UNSTOP
- HELP set: HELP, INFO

Behavior:
A) On inbound STOP keyword:
1) Immediately mark {from_number} as “suppressed=true” in a global suppression list.
2) Stop all future outbound messages to that number across all sequences and retries.
3) Send one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4) Log the event (see Consent/Compliance Logging).

B) On inbound HELP keyword:
- Do NOT change suppression state.
- Send:
“{business_name} texts for appointment/request updates. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

C) On inbound START/UNSTOP:
- If previously suppressed, set suppressed=false and log.
- Send:
“You’re resubscribed. Reply STOP to opt out, HELP for help.”

D) Outbound send-time check (hard block):
Before sending any SMS, check suppression list. If suppressed=true, do not send and log “blocked_suppressed”.

4) QUIET HOURS (TIMEZONE-AWARE) — MVP SPEC
Goal: reduce complaints and carrier risk while preserving speed-to-lead.

Default allowed window (local time of the lead): 8:00 AM – 8:00 PM, 7 days/week.
Timezone resolution order:
1) Lead-provided address/zip → map to timezone.
2) Lead phone number area code → approximate timezone.
3) Business default timezone.

If message is triggered outside allowed window:
- Queue it to send at next window start (8:00 AM lead local).
- For “hot lead” events (e.g., web form submit), optionally send an immediate email notification to the business owner instead of SMS.

Edge cases:
- DST: rely on IANA tz database.
- Unknown timezone: use business timezone and apply quiet hours.
- Emergency override: optional per-tenant toggle “send despite quiet hours” (default OFF) with warning.

5) CONSENT + COMPLIANCE LOGGING (MVP FIELDS)
Store these fields per lead + per message event:
- lead_id, tenant_id
- phone_e164, first_name, source (webflow/typeform/meta/etc)
- consent_status: consented | not_consented | revoked
- consent_captured_at (UTC)
- consent_capture_method: checkbox | lead_ad_disclaimer | double_opt_in | manual
- consent_text_version (store exact text shown)
- consent_page_url (where available)
- ip_address (where available)
- message_event logs: direction(in/out), timestamp, body_hash/body (as policy allows), provider_message_id, status(sent/delivered/failed), blocked_reason(suppressed/quiet_hours/no_consent)
- optout_event: keyword, timestamp

6) AGENCY GO-LIVE CHECKLIST (10 MIN)
1) Put opt-in checkbox/disclaimer in the lead source (Webflow/Typeform/Meta) using the snippets above.
2) Confirm the form payload includes: phone, first name, service, zip/address (for timezone), and consent flag.
3) Confirm STOP/HELP works in staging:
- Text STOP → receive opt-out confirmation; verify number is suppressed and outbound blocks.
- Text HELP → receive help message.
- Text START → resubscribe works.
4) Confirm quiet hours:
- Trigger lead at 9:30 PM lead local → message is queued; it sends at 8:00 AM.
5) Confirm business identity:
- Website link is present in help flow: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email is present: agent_bob_replit+lead-copilot@agentmail.to

7) TWILIO DELIVERABILITY NOTES (NO-SPEND DEFAULT)
- Use a Twilio Messaging Service (for sticky sender, scaling, and deliverability controls).
- Avoid shortened links; prefer direct domain links when needed.
- Keep early messages short, 1 question at a time, no promotional claims.
- If sending via 10DLC long codes at scale, be prepared for A2P Brand + Campaign registration to avoid filtering/suspension.

If you want, I can translate the STOP/HELP + quiet-hours spec into a single pseudocode flow that engineering can drop into the inbound webhook handler (Twilio -> your app) once you confirm the exact endpoint style being used.