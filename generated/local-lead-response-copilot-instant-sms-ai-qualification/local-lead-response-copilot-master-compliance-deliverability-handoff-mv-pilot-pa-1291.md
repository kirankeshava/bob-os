# Local Lead Response Copilot — Master Compliance + Deliverability Handoff (MV Pilot Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:37:45.099Z

---

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance contact: agent_bob_replit+lead-copilot@agentmail.to

SECTION 1 — Minimum-Viable Compliant Website Pages (copy/paste)

A) SMS Terms (add as a web page “SMS Terms” or a section inside Terms of Service)
Title: SMS Terms & Conditions
1) Program description: Local Lead Response Copilot sends text messages on behalf of [Client Business Name] to respond to your inquiry, ask a few qualifying questions, and help schedule service.
2) Consent: By providing your phone number and submitting this form, you agree to receive SMS messages from [Client Business Name] and its service provider (Local Lead Response Copilot) regarding your request, including conversational/qualification messages and appointment scheduling.
3) Autodialer/automated: Messages may be sent using an automatic telephone dialing system and/or AI-assisted automation.
4) Not a condition of purchase: Consent is not a condition of purchase.
5) Message frequency: Message frequency varies based on your interaction.
6) Rates: Message and data rates may apply.
7) Opt-out: Reply STOP to cancel. After you send STOP, you will receive one confirmation message and no further messages will be sent unless you re-consent.
8) Help: Reply HELP for help or email agent_bob_replit+lead-copilot@agentmail.to.
9) Carriers: Carriers are not liable for delayed or undelivered messages.
10) Eligibility: You must be 18+ or have permission from the account holder.
11) Privacy: See Privacy Policy: [INSERT PRIVACY POLICY URL].

B) Privacy Policy (add as a web page “Privacy Policy”)
Title: Privacy Policy
1) What we collect: Name, phone number, email, service address (optional), and details you provide about your service request; message metadata (timestamps, delivery status); and booking/interaction events.
2) How we use it: To respond to your inquiry, qualify your needs, schedule service, provide customer support, prevent fraud/abuse, and improve service quality.
3) SMS consent: Phone numbers and SMS consent records are used only to send messages related to your inquiry and are not shared for third-party marketing.
4) Sharing: We may share data with service providers who help deliver messages, scheduling, and analytics (e.g., SMS carriers/aggregators, scheduling tools). We do not sell personal information.
5) Retention: We retain consent logs and message logs for compliance and dispute resolution for at least 24 months (recommended). Clients may retain longer based on their legal counsel.
6) Your choices: You can opt out of SMS anytime by replying STOP. You may request access/deletion by contacting agent_bob_replit+lead-copilot@agentmail.to.
7) Security: We use reasonable administrative/technical safeguards; no method is 100% secure.
8) Contact: agent_bob_replit+lead-copilot@agentmail.to.

SECTION 2 — Opt-in Language (copy/paste snippets)

Required elements everywhere: (1) explicit consent to receive texts, (2) msg frequency varies, (3) “Msg & data rates may apply”, (4) STOP/HELP, (5) not a condition of purchase, (6) links to Terms/Privacy.

A) Webflow / website form checkbox
Checkbox label (recommended):
“I agree to receive text messages from [Client Business Name] about my request, including appointment scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [LINK] Privacy: [LINK]”

B) Typeform (long form field description)
“By submitting, you consent to receive SMS messages from [Client Business Name] and its service provider (Local Lead Response Copilot) about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. Terms: [LINK] Privacy: [LINK]”

C) Meta / Facebook Lead Ads (use disclaimer + privacy policy link)
In the Lead Form “Privacy Policy” link: point to the Privacy Policy URL.
Add a custom disclaimer line in the form:
“By submitting, you agree to receive text messages about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Consent is not a condition of purchase.”
(If space allows add “HELP for help” and the Terms link.)

SECTION 3 — Message Templates (deliverability-safe)

Guidelines: keep messages conversational; avoid ALL CAPS, excessive punctuation, “free”, “act now”, “guarantee”; don’t use link shorteners; use one plain URL max when needed; identify the business early.

Template 1 — First response (immediate)
“Hi {first_name}—this is {agent_name} with {business_name}. Thanks for reaching out about {service}. What’s the service address (ZIP is OK)?”

Template 2 — Qualification follow-up
“Got it. What’s the main issue you want fixed (1 sentence)? If you prefer, reply with a photo.”

Template 3 — Appointment offer
“Thanks. We can help. Would you like to book a time? Reply 1) Today 2) Tomorrow 3) This week”

Template 4 — Booking confirmation
“Booked: {date} at {time}. If you need to reschedule, just reply here. Reply STOP to opt out.”

Template 5 — No response nudge (after 15–30 min)
“Just checking—do you still want help with {service}? Reply YES and we’ll get you scheduled.”

Template 6 — Re-engagement (after 24–72 hours)
“Hi {first_name}, do you still need help with {service}? Reply 1) Yes 2) Not now”

SECTION 4 — STOP/HELP Handling (implementation spec)

A) Keyword set
STOP keywords (case-insensitive, trim whitespace): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
HELP keywords: HELP, INFO.
Also support common punctuation variants (e.g., “STOP.”).

B) State machine
1) If inbound matches STOP keyword:
- Set contact.sms_opted_out = true
- Add contact.phone_e164 to GLOBAL_SUPPRESSION_LIST (account-wide)
- Log event: sms_opt_out_received {timestamp, from, campaign/message_service_id, raw_body}
- Send one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe.”
- Block all future outbound to this phone across all clients unless re-consent recorded.

2) If inbound matches HELP keyword:
- Log event: sms_help_received
- Send help message:
“{business_name}: For help, reply here or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

3) START / resubscribe (only if your legal posture allows it)
START keywords: START, YES, UNSTOP.
- Only re-enable if there is an auditable new consent record OR explicit user request to re-subscribe.
- Log event: sms_opt_in_restored.

C) Outbound blocking behavior
Before sending any SMS: check GLOBAL_SUPPRESSION_LIST and contact.sms_opted_out.
If blocked: do not send; log event sms_blocked_opt_out.

SECTION 5 — Quiet Hours by Timezone (implementation spec)

A) Default policy (recommended for pilots)
- Allowed hours: 8:00 AM–8:00 PM recipient local time, Monday–Saturday.
- Sunday: allowed 10:00 AM–6:00 PM recipient local time.
- If outside window: defer message to next allowed window at 8:05 AM local time (or next nearest allowed time).

B) Timezone resolution order
1) If lead has postal code/address → map to timezone.
2) Else if area code can be mapped → infer timezone.
3) Else fallback to client account timezone.
Record timezone_source in logs.

C) Deferral queue rules
- Store deferred messages with scheduled_send_at (UTC) + reason=quiet_hours.
- If lead replies inbound during quiet hours, you may respond immediately only if the user initiated the conversation and your policy allows; otherwise still defer.
- Provide override flag per client (owner_override=true) for emergency/critical messages; all overrides must log an audit event.

Required audit log fields: contact_id, phone_e164, timezone, timezone_source, original_attempt_at, scheduled_send_at, sent_at, override_used, override_actor.

SECTION 6 — Consent Logging Schema (minimum fields)

Store per consent event:
- consent_id (uuid)
- contact_id
- phone_e164
- consent_status (granted/withdrawn)
- consent_text_shown (full text)
- source (webflow/typeform/meta/zapier/manual)
- form_url / ad_id / lead_id (when available)
- timestamp_utc
- ip_address (if captured)
- user_agent (if captured)
- proof (screenshot url or form version id if available)
- terms_url + privacy_url at time of consent

Retention: minimum 24 months recommended.
Export: one-click CSV for disputes (include all fields + message history summary).

SECTION 7 — Twilio Deliverability Setup (minimum viable)

1) Use a Twilio Messaging Service (even for one number)
- Enable: Sticky Sender (optional), Smart Encoding, and Opt-Out keywords (if using Twilio native, still keep app-level suppression as source of truth).
- Add your sending number(s) to the Messaging Service.

2) A2P 10DLC vs Toll-Free (pilot decision rule)
- If US long code and moderate volume/ongoing campaigns: plan for A2P 10DLC Brand + Campaign registration.
- If you need faster initial setup and simpler registration: consider Toll-Free verification.
(No spend is authorized here; just choose the route and follow Twilio’s free steps until payment is required.)

3) Content rules to avoid filtering
- Identify business early (“This is {business_name}”).
- Avoid link shorteners; use your own domain URL if linking.
- Keep URL count low; avoid repeated identical templates across many recipients in a short burst.
- Keep the first message purely transactional/conversational.

4) Fallback behaviors
- If message fails with a carrier error: retry once after 2–5 minutes.
- If still fails: mark lead as “SMS undeliverable” and optionally fall back to email/call task.

SECTION 8 — Verification: STOP/HELP End-to-End Test Matrix (agency sign-off)

Test using two real phones.

A) STOP tests
1) Send outbound message to Phone A. Reply “STOP”. Expect: confirmation message; no further outbound possible.
Evidence required: suppression list entry + log event sms_opt_out_received + blocked outbound log.
2) Reply “Stop.” (punctuation). Expect same.
3) Attempt outbound after STOP. Expect: blocked (no carrier send).

B) HELP tests
1) Reply “HELP”. Expect: help message containing support email and STOP instructions.
Evidence: sms_help_received log.

C) Quiet hours tests
1) Set lead timezone to Pacific. Attempt send at 9:30 PM PT. Expect: deferred until next allowed window.
Evidence: scheduled_send_at log + reason=quiet_hours.

SECTION 9 — Agency Implementation Steps (no-code friendly)

1) Place opt-in text (Section 2) next to the phone field + checkbox where possible.
2) Ensure Terms/Privacy links are live and reachable from the form/ad.
3) Configure webhook/Zapier/Make:
- Trigger: New lead created.
- Action: POST to Copilot endpoint (or Twilio Send via Messaging Service).
- Map: first_name, phone, service_requested, address/zip, source, consent_text_version.
4) Confirm consent logging fields are stored.
5) Run Verification Matrix (Section 8) before launch.

If you need help implementing any step, email agent_bob_replit+lead-copilot@agentmail.to and include: client name, lead source (webflow/typeform/meta), Twilio account SID (if applicable), and a sample lead payload (redact PII if needed).