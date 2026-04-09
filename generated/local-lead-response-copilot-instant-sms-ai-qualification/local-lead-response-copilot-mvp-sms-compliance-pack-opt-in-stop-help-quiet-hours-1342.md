# Local Lead Response Copilot — MVP SMS Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:28:37.720Z

---

Business legitimacy links (use these in every opt-in + help response):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

GOAL (MVP): Remove pilot sales objections and prevent shutdowns by implementing (1) clear opt-in language, (2) STOP/HELP handling with a suppression list, (3) quiet hours by recipient timezone.

1) COPY/PASTE OPT-IN SNIPPETS (by lead source)

A) Webflow / website form checkbox (recommended)
Label: “Text me about my request (recommended)”
Consent text (below checkbox):
“By checking this box, you agree to receive SMS texts about your request from [BUSINESS NAME] at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”
Add below the submit button:
“By submitting, you confirm you are the account holder for this number. Privacy & Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Data to capture (hidden fields if possible): timestamp, page URL, IP (if available), checkbox value.

B) Typeform
Add a “Legal” statement right before submit:
“By submitting, you consent to receive SMS texts from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy & Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Also include a required Yes/No question:
“Do you agree to receive texts about your request at this number?” (Default: No; must choose Yes.)

C) Meta/Facebook Lead Ads
Add to the “Disclaimer” / “Privacy policy” area:
“By submitting this form, you agree to receive SMS texts from [BUSINESS NAME] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”
Privacy Policy URL: use the website URL above until dedicated pages are live.

2) FIRST MESSAGE TEMPLATES (compliant + deliverable)

Initial auto-text (send immediately after form submit)
“Hi {first_name}, it’s {agent_name} with {business_name}. Got your request for {service}. What’s the address for the job?”
(Do NOT include links in the first message unless necessary. Avoid ALL CAPS and excessive punctuation.)

Qualification follow-up (if no reply after 3–5 minutes)
“Quick question so I can help: is this for ASAP service or are you planning for later?”

Booking handoff (when qualified)
“Thanks — we can get you on the schedule. What’s the best day/time for a call or appointment?”

Re-engagement (next day, within quiet hours)
“Hi {first_name}, checking back — do you still need help with {service}?”

3) STOP/HELP HANDLING (IMPLEMENTATION SPEC)

A) Keywords to recognize (case-insensitive, trim whitespace)
STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO, SUPPORT

B) Required behaviors
On inbound STOP keyword:
1) Immediately mark (tenant_id, phone_e164) as suppressed in a GLOBAL suppression list.
2) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
3) Block all future outbound to that phone across all flows/campaigns until explicit re-consent.

On inbound HELP keyword:
Send:
“{business_name} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

On any other message from a suppressed number:
Do not send automated marketing/qualification. Optionally send once:
“You’re currently opted out. Reply START to resubscribe.”
(Only implement START resubscribe if you can log proof of re-consent; otherwise omit.)

C) Consent logging (minimum viable fields)
Store per lead:
- lead_id, tenant_id
- phone_e164
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (string)
- consent_timestamp_utc
- consent_context_url
- consent_checkbox_value (true/false) if applicable
- first_message_timestamp_utc
Store per inbound message:
- from_phone_e164, to_phone_e164
- message_body
- received_timestamp_utc
- classification (STOP/HELP/OTHER)
- suppression_applied (boolean)

4) QUIET HOURS (TIMEZONE) — MVP SPEC

Default quiet window: 9:00pm–8:00am recipient local time.

Timezone resolution order:
1) If lead includes state/zip -> map to timezone.
2) Else use phone number area code timezone guess.
3) Else default to tenant timezone.

Rules:
- If a message would send during quiet hours, queue it for next allowed time (8:05am local).
- Operational exception: allow human-triggered 1:1 replies anytime if the lead texted within the last 15 minutes (reduces frustration while still limiting unsolicited sends).
- Log queued_at and sent_at to prove compliance.

5) TWILIO DELIVERABILITY (MVP GUIDELINES — NO SPEND)

- Use a single consistent sending number per tenant where possible.
- Keep messages short, personalized, and directly tied to the inbound request.
- Avoid spam triggers: repeated links, “free/guaranteed/act now”, all-caps, excessive emojis/symbols.
- Maintain low complaint rates via STOP compliance + quiet hours.
- If scaling beyond early pilots on long code: prepare for A2P 10DLC Brand + Campaign registration (requires accurate business/vertical details and example messages).

6) AGENCY GO-LIVE CHECKLIST (60 minutes)

1) Add opt-in language to the form (choose snippet above).
2) Ensure phone field is required and formatted (E.164 if possible).
3) Confirm the first SMS template is installed and contains business identification.
4) Implement STOP/HELP handling and verify suppression list blocks outbound.
5) Enable quiet hours with timezone detection.
6) Run a 10-minute test:
- Submit test lead -> confirm instant SMS.
- Reply HELP -> confirm help text with support + website.
- Reply STOP -> confirm opt-out confirmation.
- Try sending again -> confirm blocked.

Support escalation: agent_bob_replit+lead-copilot@agentmail.to (include tenant name + sending number + screenshots of logs).