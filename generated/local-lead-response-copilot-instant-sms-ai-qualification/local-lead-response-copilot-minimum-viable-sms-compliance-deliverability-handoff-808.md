# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Handoff (Agency + Engineering Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:10:47.104Z

---

Purpose (wartime/MVP): Prevent the 3 fastest ways pilots fail—(1) no provable opt-in language, (2) missing STOP/HELP compliance, (3) texting people at night—while keeping setup lightweight so we can close pilots quickly.

Legitimacy links (use in every opt-in):
- Product site (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Privacy URL: [PUBLISH + INSERT FINAL URL]
- Terms URL: [PUBLISH + INSERT FINAL URL]

1) Opt-in language (COPY/PASTE)
A) Webflow / generic website form checkbox
Checkbox label (required):
“I agree to receive text messages from {BUSINESS NAME} about my request (appointment/estimate/availability). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: {PRIVACY_URL} and Terms: {TERMS_URL}.”
Implementation notes:
- Make checkbox unchecked by default.
- Store timestamp, page URL, and the exact disclosure text version (see Consent Logging).

B) Typeform
Add a required “Legal” statement + Yes/No question.
Statement:
“By providing your phone number, you agree to receive SMS from {BUSINESS NAME} regarding your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
Question:
“Do you consent to receive text messages about your request?” (Yes/No) — only proceed if Yes.

C) Meta/Facebook Lead Ads
In the “Privacy Policy” field: {PRIVACY_URL}
Add custom disclaimer text (or in the questions/description where allowed):
“By submitting, you agree to receive text messages from {BUSINESS NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL}”
Important: Lead Ads must clearly indicate texting; do not rely on pre-checked consent.

2) First message templates (compliant + deliverability-friendly)
Rules:
- Identify the business in message 1.
- Reference the user’s request (“your request/estimate”) not “marketing”.
- Avoid spammy words/formatting: no ALL CAPS, no “FREE!!!”, no link shorteners.
- Include STOP instructions in message 1; include HELP instructions in either message 1 or 2.

Template 1 — immediate response
“Hi {FirstName}, it’s {AgentName} with {BusinessName}. Got your request for {Service}. A couple quick questions so we can help—what’s your address or ZIP?”
(If you can only send one message before reply, append compliance line)
“Reply STOP to opt out, HELP for help.”

Template 2 — qualification follow-up (after ZIP)
“Thanks—what best describes the job? (1) Repair (2) Install (3) Quote/Estimate”

Template 3 — booking
“Great. What day/time works for a call or appointment? (1) Today (2) Tomorrow (3) Choose a time window”

Template 4 — missed call text-back
“Sorry we missed you—this is {BusinessName}. What’s a good time to call back, or can we book you now?”
“Reply STOP to opt out, HELP for help.”

3) STOP/HELP handling (ENGINEERING SPEC — Twilio)
Goal: ensure any inbound STOP immediately suppresses future texts across all numbers/campaigns for that recipient.

Keywords (case-insensitive, trim punctuation/spaces):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Action:
- Set contact.sms_opt_out = true
- Add phone to Global Suppression List (GSL) for the tenant (and optionally system-wide if shared sending)
- Store event log entry (see Consent Logging)
- Immediately send ONE confirmation message:
“You’re unsubscribed from {BusinessName} texts. No more messages will be sent. Reply START to re-subscribe.”
- Block any queued/outstanding sends to that phone.

HELP keywords:
- HELP, INFO
Action:
- Send:
“{BusinessName} texting support: reply STOP to unsubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to. Visit {SITE_URL}.”
Do not change opt-in state.

START keywords (optional but recommended):
- START, YES, UNSTOP
Action:
- Only allow if you have prior consent record OR you prompt for consent again.
- If allowing re-subscribe:
“Thanks— you’re re-subscribed to {BusinessName} texts. Msg frequency varies. Reply STOP to opt out, HELP for help.”
- Log event.

Twilio webhook routing notes:
- Configure Twilio inbound webhook (Messaging) to POST to /sms/inbound.
- Parse From, To, Body, MessageSid, Timestamp.
- Apply STOP/HELP logic before any AI/qualification routing.
- If STOP detected: short-circuit (no AI calls), send confirm, return 200.

4) Quiet hours (ENGINEERING SPEC)
Default policy (safe for pilots):
- Do not send outbound SMS between 8:00 PM and 8:00 AM recipient local time.
- If lead arrives during quiet hours: send nothing immediately; queue the initial message for 8:05 AM local time.

Timezone resolution order:
1) If lead form captured timezone explicitly, use it.
2) Else infer from ZIP/state (US) if captured.
3) Else infer from area code of phone (best-effort).
4) Else fallback to business timezone (configured per tenant) and treat as “unknown” in logs.

DST handling:
- Use IANA tz database (e.g., America/Chicago). Avoid fixed UTC offsets.

Overrides:
- Admin toggle: “Send during quiet hours” (default OFF).
- Emergency manual send: require confirmation + logged reason.

Edge cases:
- If appointment is within quiet hours and user explicitly requests “text me now”: still respect policy unless explicit override is enabled.

5) Consent logging (MVP schema)
Store these fields per lead:
- lead_id, tenant_id
- phone_e164
- consent_status: opted_in | opted_out | unknown
- consent_source: webform | typeform | fb_lead_ad | manual
- consent_text_version: full disclosure string as displayed
- consent_timestamp_utc
- consent_page_url (where available)
- consent_ip (where available)
- last_opt_out_timestamp_utc
- message_events[]: direction (in/out), body_hash, provider_id (Twilio MessageSid), timestamp_utc, classification (first_contact/qualification/booking/stop/help)

Minimum proof for disputes: timestamp + exact disclosure text + source + phone.

6) Twilio deliverability minimums (no spend guidance)
- Use a Twilio Messaging Service (recommended) so you can manage sender pooling, sticky sender, and add compliance features.
- Enable status callbacks and track delivery outcomes; alert on spikes in failed/undelivered.
- Content guidelines:
  - Keep first message human, contextual (“your request”), no URL shorteners.
  - Avoid repeated identical blasts; vary message slightly by service type.
  - Do not send promotional offers until you have explicit marketing consent (separate from service-request consent).

A2P 10DLC note (US long code):
- If using US 10DLC at scale, complete Twilio Brand + Campaign registration. Until then, keep volumes low and 1:1 conversational traffic. If the owner confirms Twilio details, we can produce the exact registration inputs (sample campaign description, opt-in proof, sample messages) for fast approval.

7) Agency quickstart (30-minute deployment)
Checklist:
1) Pick lead source (Webflow/Typeform/FB). Paste the matching opt-in snippet and ensure it’s required.
2) Confirm the form captures: First name, phone, service type, ZIP/address, and consent yes/checkbox.
3) Set business name and agent name in templates.
4) Turn on STOP/HELP handling and verify with a real phone:
   - Text STOP → confirm message received; verify no further messages can be sent.
   - Text HELP → receive support instructions.
5) Turn on quiet hours (8pm–8am). Submit a test lead at night and confirm it queues for morning.
6) Keep a copy of the disclosure text + privacy/terms URLs for audit.

If an agency/client asks “is this compliant?” (pasteable answer):
“We capture explicit SMS consent at the form/ad, log consent proof (timestamp + disclosure text + source), include STOP/HELP instructions, honor STOP immediately with suppression, and enforce quiet hours by recipient timezone. This is designed to align with TCPA/CTIA expectations and reduce carrier filtering for speed-to-lead texting.”
