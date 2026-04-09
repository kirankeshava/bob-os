# Local Lead Response Copilot — Pilot Launch Compliance (Minimum Viable) Pack

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:39:24.769Z

---

# Pilot Launch Compliance (Minimum Viable) — Local Lead Response Copilot
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) What “minimum viable compliant” means (wartime)
For paid pilots, we only need what prevents carrier/Twilio enforcement and removes the #1 agency/client objections:
1) **Documented opt-in language** at the lead source (form/ad) + checkbox (where possible)
2) **STOP/HELP handling** that actually works and prevents further outbound texts after STOP
3) **Quiet hours** to avoid late-night texting (reduces complaints)
4) **Consent logging** (basic audit trail: what they saw, when, and where)

If any of the above is missing, pilots are at risk of complaints, filtering, or Twilio enforcement.

---
## 2) Copy/paste opt-in language (use as-is)
### A) Webflow / Website forms (preferred: unchecked checkbox)
Add a required checkbox label next to the phone field:
> **SMS Consent (required):** I agree to receive text messages from [Business Name] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.

Under the submit button (small text):
> By submitting, you confirm you are the account holder or have permission to use this number. Consent is not a condition of purchase. See Terms and Privacy: [TERMS_URL] | [PRIVACY_URL].

Implementation notes:
- Checkbox should be **unchecked by default**.
- Store the checkbox value + timestamp + page URL.

### B) Typeform
Add a “Legal” statement block before submit:
> By providing your phone number, you agree that [Business Name] may text you about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].

If you can add a Yes/No question, make “Yes” required to proceed.

### C) Meta/Facebook Lead Ads
In the lead form “Privacy policy” field, link to your privacy page. In the custom disclaimer:
> By submitting, you agree to receive text messages from [Business Name] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.

(If Meta provides a checkbox option, use it.)

---
## 3) First message templates (safe defaults)
### Immediately after lead (speed-to-lead)
> Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address/ZIP for the job?
> Reply STOP to opt out, HELP for help.

### Qualification (keep short, no links initially)
> Thanks—what’s the best day/time for a quick call or estimate?
> Reply STOP to opt out, HELP for help.

### Booking confirmation
> Confirmed: {{appt_day}} at {{appt_time}}. Reply 1 to confirm or 2 to reschedule.
> Reply STOP to opt out, HELP for help.

### Missed-call textback (if using call tracking)
> Missed you—this is {{business_name}}. Are you trying to schedule {{service}}? Reply 1 Yes or 2 No.
> Reply STOP to opt out, HELP for help.

Content guardrails (deliverability):
- Avoid “FREE!!!”, excessive caps, repeated emojis, URL shorteners, or aggressive urgency.
- Keep first 1–2 messages link-free.
- Always identify the business.

---
## 4) STOP / HELP handling (implementation spec)
### Keywords
Treat these as opt-out: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT (case-insensitive; trim punctuation).
Treat these as help: HELP, INFO.

### Required behaviors
1) **On inbound STOP keyword**
   - Immediately send a single confirmation:
     > You’re opted out. No more texts from {{business_name}}. Reply START to re-subscribe.
   - Add phone number to a **global suppression list** (per sending number/service).
   - Block all future outbound messages to that number (except compliance-required confirmations).
   - Log the event (see Consent Log below).

2) **On inbound HELP keyword**
   - Send:
     > {{business_name}}: We text about your service request. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to
   - Do not change subscription status.

3) **On inbound START keyword** (optional, but recommended)
   - If previously STOP’d, restore status to subscribed and reply:
     > You’re re-subscribed. Reply STOP to opt out.

### Engineering notes (Twilio)
- Implement at the inbound webhook handler before routing into AI/qualification.
- Enforce suppression at the message-send layer as a hard gate.

---
## 5) Quiet hours (implementation spec)
Goal: avoid sending texts during local quiet hours while keeping speed-to-lead.

Default rule (recommended): **No outbound SMS 9pm–8am recipient local time**.

### Timezone resolution order
1) If lead includes address/ZIP → map ZIP to timezone.
2) Else if business operates in a single timezone → use that.
3) Else fallback to business timezone and mark lead timezone as “assumed”.

### Behavior during quiet hours
- If a lead arrives during quiet hours: **queue the first outbound SMS for 8:05am local**.
- If user texts you inbound during quiet hours: you may respond (they initiated), but still keep messages concise.

### Override
Allow business owner/admin to override per lead (e.g., emergency services).

---
## 6) Consent logging (minimum required fields)
Store these fields for each lead:
- phone
- lead_source (webflow/typeform/fb/other)
- consent_text_version (string)
- consent_captured_at (UTC timestamp)
- consent_capture_url (page/ad identifier)
- checkbox_value (true/false/unknown)
- ip_user_agent (if available)
- initial_message_sent_at + sending_number
- opt_out_status (subscribed/opted_out)
- opt_out_timestamp (if any)
- help_requests (count + last_timestamp)

---
## 7) Agency go-live checklist (do this before traffic)
1) Confirm opt-in language is installed at the lead source (screenshot it).
2) Send a test lead with your own phone number and verify:
   - First message arrives quickly (or is queued if during quiet hours)
   - Business identification is present
   - STOP triggers opt-out confirmation and blocks future sends
   - HELP returns the help message with support email
3) Confirm consent logs are recording: timestamp + source + URL/ad.
4) Confirm messaging content does not include shortened links or spammy phrasing.

## 8) Verification matrix (quick)
- Send STOP → expect confirmation + suppression
- After STOP, attempt outbound send → must be blocked and logged
- Send HELP → expect help response
- Send START (if enabled) → expect resubscribe confirmation

---
## 9) Twilio/A2P note (keep simple for pilots)
- If using a long code at scale, expect **A2P 10DLC registration** requirements. For pilots, focus on consent + STOP/HELP correctness and clean content; begin A2P workflow as soon as the sending route is confirmed.

If an agency/client asks “are you compliant?” you can answer:
- Yes: opt-in captured at the form/ad, STOP/HELP supported, quiet hours enforced, and consent/opt-out events are logged for audit.
