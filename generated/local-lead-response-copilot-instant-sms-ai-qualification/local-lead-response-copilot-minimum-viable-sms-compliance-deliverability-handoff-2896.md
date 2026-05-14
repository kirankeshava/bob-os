# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:34:33.584Z

---

Purpose (wartime MVP)
This document contains the minimum required SMS compliance + deliverability elements needed to launch pilots safely (avoid carrier blocks and TCPA/CTIA complaints) while keeping implementation lean. It is designed for agencies and local businesses using Local Lead Response Copilot.

Legitimacy links (use everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Opt‑in language (copy/paste)
A) Webflow / Website form checkbox (recommended)
Add a required checkbox with this label:
“I agree to receive text messages about my inquiry from [BUSINESS NAME] at the number provided. Message & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms & Privacy: [TERMS_URL] / [PRIVACY_URL].”
Implementation notes:
- Checkbox must be unchecked by default.
- Store timestamp, page URL, and checkbox state.
- If no checkbox is possible, use an explicit statement directly above the submit button.

B) Typeform (statement + required question)
Add a Statement block above Submit:
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME]. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Then add a required Yes/No question:
“Do you agree to receive SMS updates about your request at the number you provided?”
- Choices: “Yes, I agree” / “No”
Only enroll leads who select “Yes, I agree.”

C) Meta/Facebook Lead Ads (higher scrutiny)
Use the “Custom Disclaimer” field (or equivalent) and include:
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Operational note: Ensure your lead form includes a phone field and that your webhook/CRM marks the lead as “consented=true” based on this disclaimer.

2) First message templates (compliant + deliverability-friendly)
Guidelines: keep it short, match the user’s intent, avoid URL shorteners, avoid excessive caps/emoji, and include STOP/HELP in early messages.

Template 1 — Instant response (default)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

Template 2 — Missed call text-back
“Hi {{first_name}} — sorry we missed you. This is {{business_name}}. What service do you need and what’s your ZIP? Reply STOP to opt out, HELP for help.”

Template 3 — Booking handoff (when ready)
“Thanks — we can get you scheduled. What day/time works best? (Or say ‘call me’). Reply STOP to opt out, HELP for help.”

3) STOP / HELP handling (MUST implement)
Keywords (case-insensitive, trimmed of punctuation):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- START, YES, UNSTOP → opt-in re-enable (only if previously opted out)
- HELP, INFO → help response

Behavior rules:
A) On STOP-like keyword:
1) Immediately mark recipient as “suppressed=true” (global suppression list) for that customer/account.
2) Send one confirmation message (no marketing):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to that number unless they send START/YES/UNSTOP.

B) On HELP-like keyword:
Reply:
“{{business_name}} SMS help: replies are used to follow up on your request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

C) On START/YES/UNSTOP:
If previously suppressed, clear suppression and reply:
“You’re back in for texts from {{business_name}}. Msg frequency varies. Reply STOP to opt out.”

Engineering acceptance test (minimum)
- Send STOP from a test handset → confirmation message sent + outbound blocked.
- Attempt outbound after STOP → must be blocked with a logged reason (suppressed).
- Send HELP → returns help template.
- Send START after STOP → outbound allowed again.

4) Quiet hours (minimum viable)
Goal: avoid texting at night to reduce complaints and carrier scrutiny.
Default quiet hours policy (recommended for pilots):
- Local time window: 8:00am–8:00pm recipient local time
- If recipient timezone unknown: use business timezone and treat 8:00am–8:00pm

Timezone resolution order:
1) If lead record has timezone → use it
2) Else infer from phone area code (best-effort)
3) Else infer from ZIP/address if collected
4) Else fallback to business timezone

Queue behavior:
- If message would send during quiet hours, queue it for next allowed time (8:00am local).
- Do not batch-send; preserve original ordering and spacing.

5) Consent logging (minimum fields)
Store these fields per lead/contact:
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow / typeform / fb_lead_ad / manual / inbound_text
- consent_text_version: string (e.g., “optin_v1_2026-05-14”)
- consent_timestamp_utc
- consent_capture_url (page or ad identifier)
- consent_capture_ip (if available)
- last_stop_timestamp_utc (if opted out)
- messaging_profile_id (sending number/service)

6) Twilio deliverability setup (minimum guidance; no spend)
If using Twilio:
- Use a Messaging Service (not a single hardcoded number) so you can manage compliance features and future scaling.
- Enable inbound handling webhooks to your STOP/HELP processor.
- Keep content consistent with the user’s request; avoid “promo” language for lead-response use cases.
- Do not include shortened links; if linking, use your branded domain.
- A2P 10DLC: if you use a 10DLC long code at scale, you will likely need Brand + Campaign registration. You can start prep now (business details, use case, sample messages) and complete registration when ready.

7) Agency go‑live checklist (copy/paste)
Before launch:
- [ ] Opt-in language installed (one of the snippets above).
- [ ] Checkbox is unchecked by default (if applicable).
- [ ] Lead form sends: first name, phone, service requested, and either ZIP or address.
- [ ] STOP/HELP webhooks configured and tested.
- [ ] Quiet hours enabled (8am–8pm recipient local).
- [ ] Consent logging fields captured and accessible.
- [ ] First message template includes business name + intent + STOP/HELP.

Verification (15 minutes):
- Submit a test lead → confirm instant SMS within 60 seconds.
- Reply STOP → confirm opt-out confirmation + suppression.
- Attempt another message → confirm blocked.
- Reply START → confirm re-enabled.
- Reply HELP → confirm help response.

Support contact
For implementation questions or compliance concerns, email agent_bob_replit+lead-copilot@agentmail.to and reference the website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
