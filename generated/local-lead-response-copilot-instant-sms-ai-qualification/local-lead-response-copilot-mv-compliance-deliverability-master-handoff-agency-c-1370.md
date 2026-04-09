# Local Lead Response Copilot — MV Compliance + Deliverability Master Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:29:25.110Z

---

## 0) Reference Info (use everywhere)
- Proof / website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/Paste Opt‑In Language (Forms + Ads)
### 1.1 Universal checkbox + disclosure (recommended)
**Checkbox label:**
“I agree to receive text messages about my request from [BUSINESS NAME] at the number provided.”

**Disclosure under checkbox (small text):**
“By checking this box, you consent to receive SMS messages (including automated texts) from [BUSINESS NAME] related to your inquiry, scheduling, and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Provider: Local Lead Response Copilot: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

**Required:** checkbox must be unchecked by default.

### 1.2 Typeform
- Add a “Yes/No” or “Legal” field as the final step.
- Store fields: phone, name, service requested, ZIP, and `sms_consent=yes`.
- Include the disclosure above in the field description.

### 1.3 Webflow form
- Add checkbox `name="sms_consent" value="yes"`.
- Place disclosure text below checkbox.
- Ensure form submits checkbox state.

### 1.4 Meta/Facebook Lead Ads (instant forms)
Add to **custom disclaimer** (or “Privacy Policy/Terms” areas):
“You agree to receive text messages (including automated) from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Provider info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

---

## 2) Message Templates (Pilot‑Safe)
### 2.1 First message (immediate)
“Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address/ZIP for the job?”

### 2.2 Qualification question (AI-safe, short)
“Thanks—when would you like us to come out? (Today / This week / Next week)” 

### 2.3 Booking offer
“I can get you on the schedule. What time works best: {{slot_1}} or {{slot_2}}?”

### 2.4 If no response (15–30 min later)
“Just checking in—still want help with {{service}}? Reply 1) Yes 2) Not now”

### 2.5 Missed call text-back
“Sorry we missed you—this is {{business_name}}. Text me what you need help with and your address/ZIP, and I’ll get you scheduled.”

### 2.6 Compliance footer (use sparingly, e.g., first message only)
“Reply STOP to opt out, HELP for help.”

---

## 3) STOP / HELP Handling (Implementation Spec — Verified Behavior)
### 3.1 Keyword normalization
- Normalize inbound text: trim, lowercase, remove punctuation.
- Match whole words for: 
  - STOP keywords: stop, stopall, unsubscribe, cancel, end, quit
  - HELP keywords: help, info, support
- If message contains both HELP and STOP, treat as STOP.

### 3.2 State machine
Per `recipient_phone` maintain `sms_status`:
- `active` (default)
- `opted_out`

Transitions:
- On inbound STOP keyword: set `sms_status=opted_out` immediately.
- On inbound START/UNSTOP (optional): set `sms_status=active` only if your policy allows re-subscribe; otherwise instruct to contact support.

### 3.3 Required responses
- STOP confirmation (must be sent once, immediately):
  “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe. Support: agent_bob_replit+lead-copilot@agentmail.to.”
- HELP response:
  “{{business_name}}: For help, email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Provider: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

### 3.4 Suppression enforcement
- Before any outbound send, check `sms_status`. If `opted_out`, block send.
- Maintain a **global suppression list** across all campaigns/workflows for that recipient.
- Log every blocked attempt with reason `recipient_opted_out`.

### 3.5 Required audit logs (minimum)
Store immutable events:
- `inbound_message_received` (timestamp, from, to, body)
- `opt_out_detected` (keyword matched, normalized body)
- `opt_out_confirmation_sent` (sid/provider id)
- `help_detected` / `help_response_sent`
- `outbound_blocked` (reason)

---

## 4) Quiet Hours by Timezone (Implementation Spec)
### 4.1 Default policy (pilot-safe)
- Allowed send window: **8:00 AM – 8:00 PM recipient local time**, all days.
- If outside window: **defer** the message to next allowed window.

### 4.2 Timezone resolution order
1) If lead has explicit `timezone` field, use it.
2) Else if ZIP exists, map ZIP → timezone.
3) Else if state exists, map state → timezone (fallback).
4) Else use account default timezone (configured per client).

### 4.3 Defer queue behavior
- If message is generated during quiet hours, enqueue with `send_at=next_allowed_time`.
- If multiple queued messages exist, collapse into one summary message where possible.
- Max defer window: 24 hours. After 24h, convert to “manual follow-up needed” task.

### 4.4 Overrides
- If lead explicitly requests “text me now” during quiet hours, still defer unless client admin enables `quiet_hours_override=true`.
- Never override for marketing/re-engagement flows.

### 4.5 Logging
Log `quiet_hours_deferred` with resolved timezone, local time, and computed `send_at`.

---

## 5) Consent Logging (Dispute-Ready)
Minimum fields to store per lead:
- `lead_id`
- `phone_e164`
- `consent_status` (yes/no)
- `consent_timestamp_utc`
- `consent_source` (webflow/typeform/meta/other)
- `consent_language_version` (hash of disclosure text)
- `landing_page_url` or `form_url`
- `ip_address` (if available)
- `user_agent` (if available)

Retention: 4 years recommended (or per client counsel).
Export: one-click CSV/PDF export of consent + message timeline.

---

## 6) Deliverability Hardening (Twilio-Friendly)
### 6.1 Content guardrails
- Avoid ALL CAPS, excessive punctuation, and repeated identical messages across many recipients.
- Keep links minimal; prefer branded domains when available.
- Don’t use “free”, “act now”, “guarantee”, “cash”, “credit”, “winner” style promo language.
- Use a real business name early in the conversation.

### 6.2 Frequency caps
- New lead: up to 3 messages in first hour, then 1/day for 3 days if no response.
- Stop re-engagement after 3 attempts.

### 6.3 Twilio configuration (no-spend steps)
- Use a **Messaging Service** for pooling, sticky sender, and compliance features.
- Enable: smart encoding, status callbacks/webhooks, and opt-out keywords (but still implement your own suppression logic).
- Choose route:
  - Low volume/very early pilots: toll-free may be simpler.
  - Higher volume/local presence: A2P 10DLC recommended.

### 6.4 Fallback behaviors
- If SMS fails with carrier error, create an internal task: “Call lead within 5 minutes.”
- If message queued due to quiet hours, schedule first send at next allowed time and do not backfill multiple texts.

---

## 7) Agency Implementation Steps (Copy/Paste)
1) Add opt-in checkbox + disclosure (Section 1) to the lead source.
2) Ensure the webhook/Zapier/Make payload includes: phone, name, service, consent flag, consent timestamp, and source URL.
3) On ingest, store consent record (Section 5). If consent is missing/false: do not text.
4) Send first message template (2.1) immediately if within quiet hours window; otherwise defer (Section 4).
5) Enforce STOP/HELP state machine globally (Section 3).
6) Run verification tests (below) before going live.

### 7.1 Verification test matrix (minimum)
- Text “STOP” → receive opt-out confirmation; subsequent outbound attempts are blocked and logged.
- Text “HELP” → receive help message with support email and STOP reminder.
- Send during quiet hours → confirm it is deferred and logged; sends at next allowed window.
- Missing consent → confirm no outbound is sent; log `consent_missing_block`.

---

## 8) Website Pages (Copy/Paste)
### 8.1 Terms of Service (SMS) — paste into a page
**Title:** Terms of Service (SMS)
**Effective date:** {{DATE}}

These Terms apply to SMS/text messages sent by or on behalf of Local Lead Response Copilot in connection with service inquiries you submit to participating businesses (“Clients”). Our goal is to help you receive faster responses, answer a few questions, and schedule an appointment or call.

**1. Consent to Receive Text Messages**
By providing your phone number and selecting an opt-in checkbox or otherwise clearly consenting, you authorize the applicable Client and Local Lead Response Copilot to send you text messages, including automated texts, related to your inquiry, scheduling, and service updates. Consent is not a condition of purchase.

**2. Message Frequency**
Message frequency varies based on your interaction and the status of your request.

**3. Costs**
Msg & data rates may apply depending on your carrier and plan.

**4. Opting Out (STOP)**
You can opt out at any time by replying STOP. After you opt out, you will receive a confirmation message and no further texts will be sent unless you re-subscribe (where supported).

**5. Help (HELP)**
For help, reply HELP or contact us at agent_bob_replit+lead-copilot@agentmail.to. Additional provider information is available at: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**6. Eligible Use**
You agree not to use the SMS channel for unlawful, harmful, or abusive communications. We may suspend messaging to protect users and comply with carrier rules.

**7. Privacy**
Our collection and use of information is described in our Privacy Policy.

**8. Disclaimer**
SMS delivery is not guaranteed and may be affected by carrier filtering, network availability, and device limitations.

**9. Contact**
Questions about these Terms: agent_bob_replit+lead-copilot@agentmail.to

### 8.2 Privacy Policy — paste into a page
**Title:** Privacy Policy
**Effective date:** {{DATE}}

Local Lead Response Copilot (“we,” “us”) provides tools that help local businesses respond to new leads via SMS and qualify requests. This Privacy Policy describes how we collect, use, and share information.

**1. Information We Collect**
We may collect:
- Contact details you submit (e.g., name, phone number, email).
- Request details (e.g., service type, ZIP/address, preferred time).
- Consent records (e.g., opt-in checkbox value, timestamp, source form/URL, IP address/user agent when available).
- Message data (inbound/outbound SMS content, timestamps, delivery status).

**2. How We Use Information**
We use information to:
- Respond to your inquiry and help schedule appointments/calls.
- Send and manage SMS communications you requested.
- Maintain consent and compliance logs.
- Prevent fraud/abuse and improve system reliability.

**3. How We Share Information**
We may share information:
- With the participating business you contacted (the Client).
- With service providers that process messages and data on our behalf (e.g., SMS delivery providers such as Twilio and AI/automation infrastructure). These providers are limited to providing services to us.
- When required by law or to protect rights and safety.

**4. SMS Opt-In Data**
We maintain records of SMS opt-in/opt-out to comply with carrier rules and applicable laws. We do not sell your SMS opt-in data.

**5. Data Retention**
We retain information as needed to provide services, resolve disputes, and maintain compliance records. Retention periods may vary by Client and legal requirements.

**6. Your Choices**
- Opt out of SMS at any time by replying STOP.
- Request assistance at agent_bob_replit+lead-copilot@agentmail.to.

**7. Security**
We use reasonable administrative and technical safeguards to protect information.

**8. Contact**
Privacy questions: agent_bob_replit+lead-copilot@agentmail.to
Provider info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
