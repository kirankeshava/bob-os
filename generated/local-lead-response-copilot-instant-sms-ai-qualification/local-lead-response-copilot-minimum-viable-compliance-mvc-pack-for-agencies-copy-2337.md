# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack for Agencies (Copy/Paste + Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:53:03.689Z

---

Purpose (MVC — minimum viable compliance for pilots)
This pack is the minimum set of compliance/deliverability components needed to (1) remove common agency/prospect objections, (2) reduce carrier filtering/account enforcement risk, and (3) safely run free pilots for Local Lead Response Copilot.

Business proof + support
- Website (shareable legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Opt-in language (copy/paste) — REQUIRED
Goal: explicit consent + disclosure that messages are automated + STOP/HELP + frequency + “msg/data rates may apply”.

1A) Webflow form checkbox (recommended)
Add a required checkbox under phone number:
Checkbox label:
“I agree to receive automated text messages from [BUSINESS NAME] about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Helper text (small):
“By submitting, you confirm you are the owner/user of this phone number and consent to receive texts related to this inquiry.”

1B) Typeform (phone + consent)
Add a YES/NO question (required) before submission:
Question:
“Can we text you about your request?”
Choices:
- Yes, text me
- No
Description (required disclosure):
“By choosing Yes, you consent to receive automated text messages from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

1C) Meta/Facebook Lead Ads (higher scrutiny)
In the Lead Form ‘Privacy policy’ field, link to your privacy page (publish ASAP). In the custom disclaimer text area add:
“By submitting this form, you agree to receive automated text messages from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

2) First SMS message templates (safe defaults)
Rules: keep it short, identify the business, reference the inquiry, ask 1 question, include opt-out.

2A) Instant speed-to-lead (sent immediately)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job? Reply STOP to opt out.”

2B) If lead source is ambiguous
“Hi {first_name} — {agent_name} from {business_name}. Thanks for reaching out. What service do you need help with? Reply STOP to opt out.”

2C) Booking prompt (after 1–2 qualification questions)
“Thanks. Want to book a quick call or on-site estimate? Reply 1 for call, 2 for estimate. Reply STOP to opt out.”

2D) Missed call text-back
“Sorry we missed your call — this is {business_name}. What’s the best time today to call you back? Reply STOP to opt out.”

3) STOP / HELP handling (implementation spec — must be enforced)
Keywords (case-insensitive, trim punctuation/spaces):
- STOP: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP: HELP, INFO

Behavior:
A) On inbound STOP-keyword from a phone number:
- Immediately mark number as “opted_out=true” in a Global Suppression List.
- Send one (and only one) confirmation message:
“You’re opted out of texts from {business_name}. No more messages will be sent. Reply HELP for help.”
- Block all future outbound to that number across all clients/locations until re-consent is captured.

B) On inbound HELP-keyword:
- Do NOT change consent status.
- Send:
“{business_name} — support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

C) Re-subscribe (only with explicit re-consent)
If a previously opted-out user texts something else, do not resume messages automatically. Require an explicit opt-in event (e.g., new form submission with consent checkbox, or a message that explicitly requests to restart + logged).

Audit logging requirements (minimum fields)
- lead_id, phone_e164, timestamp_utc, inbound_body, normalized_keyword, action_taken (STOP/HELP/none), suppression_list_state_before/after, outbound_response_sid (if any)

4) Quiet hours (timezone) — minimum viable rules
Default: only send messages 8:00am–8:00pm recipient local time, Monday–Sunday.

Timezone resolution order:
1) If lead has service address ZIP/state → map to timezone.
2) Else if phone number area code mapping exists → use that timezone.
3) Else default to business’s local timezone.

Queueing behavior:
- If a message is triggered outside allowed window, queue it for next allowed time at 8:05am local (add 5 minutes jitter to avoid top-of-hour bursts).
- If queued longer than 24 hours, cancel and create an internal task for manual follow-up.

Emergency override:
- Allow manual send by an authenticated business user, but still append STOP language.

5) Consent logging (minimum viable)
For every lead, store:
- consent_status: unknown | consented | opted_out
- consent_timestamp_utc
- consent_source: webflow | typeform | meta | manual
- consent_text_version: e.g., “MVC_v1_2026-04-09”
- proof fields (when available): page_url/form_name, checkbox_value, fb_lead_id

6) Deliverability/A2P readiness (minimum viable checklist)
This prevents “messages sent but no replies” and carrier blocks.
- Use a Messaging Service (if Twilio): enable sticky sender, set a single default number pool, and add fallback sender.
- Avoid link-heavy first messages; avoid ALL CAPS and excessive punctuation.
- Identify the business early (“this is {business_name}”).
- Ramp volume gradually (especially day 1–3 of a pilot).
- Maintain low complaint rate: ensure STOP works globally and immediately.

7) Agency go-live checklist (what partners must do)
1) Add consent checkbox/disclaimer to the lead source (Webflow/Typeform/Meta).
2) Ensure phone is captured in E.164 format if possible.
3) Confirm quiet-hours are enabled (8am–8pm local).
4) Run STOP test: submit a test lead → receive SMS → reply STOP → verify no more outbound.
5) Run HELP test: reply HELP → verify support response includes agent_bob_replit+lead-copilot@agentmail.to.
6) Save screenshots of the form consent + STOP confirmation message for compliance evidence.

Notes for agencies to reduce objections
- We only message leads who opted in via the form/ad.
- Every message supports STOP/HELP.
- Quiet hours prevent late-night texting.
- Consent and opt-out events are logged for auditability.

End of MVC pack.