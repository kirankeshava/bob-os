# Local Lead Response Copilot — MVP Compliance/Deliverability Pack (Pilot-Safe: Opt-In + STOP/HELP + Quiet Hours + Consent Logs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:41:07.675Z

---

# Local Lead Response Copilot — MVP Compliance/Deliverability Pack (Pilot-Safe)
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum Viable Rules (what we must have for pilots)
**Must-have (launch blockers):**
1) Clear opt-in language at the form/ad point of capture.
2) STOP handling (global suppression list; no more messages to that number).
3) HELP handling (basic program + contact info).
4) Quiet hours (avoid sending late night/early morning).
5) Consent logging (timestamp + source + the exact consent text shown).

**Nice-to-have later:** A2P registration completion, advanced content linting, full legal pages, multi-number routing.

---
## 2) Copy/Paste Opt-In Snippets (Agency-Ready)

### A) Webflow form (paste near submit button)
**Checkbox label (recommended):**
“I agree to receive text messages from {{BUSINESS_NAME}} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See terms/privacy: {{TERMS_URL}} / {{PRIVACY_URL}}.”

**Required fields to store:** phone, checkbox true/false, page URL, timestamp, IP (if available).


### B) Typeform (paste into ‘Legal’ / ‘Description’ text near phone question)
“By providing your phone number, you agree that {{BUSINESS_NAME}} may text you about your inquiry, including to schedule service. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {{TERMS_URL}} Privacy: {{PRIVACY_URL}}.”


### C) Meta/Facebook Lead Ads (paste into ‘Privacy Policy’ / custom disclaimer)
**Short disclaimer:**
“By submitting, you agree to receive texts from {{BUSINESS_NAME}} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Link fields:**
- Privacy Policy URL: {{PRIVACY_URL}}
- Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---
## 3) STOP/HELP Handling — Implementation Spec (Twilio-friendly)

### A) Keywords (case-insensitive, trim whitespace/punctuation)
**STOP keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP keywords:** HELP, INFO

### B) Behavior
**On inbound STOP keyword:**
1) Add phone number to **Global Suppression List** immediately.
2) Log event: `event_type=STOP`, `matched_keyword`, `timestamp`, `from_number`, `to_number`, `lead_id` (if known), `source`.
3) Send one (1) confirmation message:
“{{BUSINESS_NAME}}: You’re opted out and will no longer receive texts. Reply HELP for help.”
4) Block all future outbound to that number unless they explicitly re-opt-in via a form/ad.

**On inbound HELP keyword:**
1) Do NOT suppress.
2) Log event: `event_type=HELP`.
3) Reply:
“{{BUSINESS_NAME}}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### C) Outbound guardrail
Before sending any SMS, check suppression list:
- If suppressed → do not send; log `event_type=OUTBOUND_BLOCKED_SUPPRESSED`.

### D) Consent re-opt-in rule (MVP)
Only remove suppression if a **new** form/ad submission occurs with the opt-in checkbox/disclaimer logged (fresh timestamp + source).

---
## 4) Quiet Hours — Minimal Pilot Spec
Goal: avoid sending messages at night; queue and send at next safe time.

### A) Default quiet hours window
**9:00 PM – 8:00 AM local time (lead’s timezone)**

### B) Timezone resolution order (MVP)
1) If form/ad provides timezone (rare) → use it.
2) Else, infer by area code (good enough for pilot) OR by provided ZIP/city if captured.
3) If unknown → default to **business timezone**.

### C) Behavior
- If a lead arrives during quiet hours: send nothing immediately; queue first SMS for **8:05 AM local time**.
- If lead replies during quiet hours: allow inbound processing, but **queue** outbound AI replies until 8:05 AM (unless human override).

### D) Human override (MVP)
Allow admin to mark conversation “urgent/ok-to-text” to bypass quiet hours for that thread.

---
## 5) Consent Logging (Minimum fields)
Store one record per opt-in event:
- `lead_id`
- `phone_e164`
- `timestamp_utc`
- `source_type` (webflow/typeform/meta/manual)
- `source_url` (landing page URL or ad ID)
- `consent_text_version` (full text shown, or template ID)
- `checkbox_checked` true/false (or “disclaimer shown” for Meta)
- `ip_address` (if available)

Store messaging compliance events:
- `event_type` (STOP/HELP/OUTBOUND_BLOCKED_SUPPRESSED)
- `matched_keyword` (if any)
- `from_number`, `to_number`
- `timestamp_utc`

---
## 6) Message Templates (MVP, carrier-safe)
Keep short, no ALL CAPS, no “FREE!!!”, no link shorteners.

**First text (sent ASAP unless quiet hours):**
“Hi {{first_name}}—this is {{BUSINESS_NAME}}. We received your request. What service do you need, and what’s your address or ZIP?”

**Qualification follow-up (1 question at a time):**
“Thanks—when would you like us to come out: today/tomorrow/this week?”

**Booking prompt (if scheduling):**
“I can reserve a time. What’s a good 2-hour window?”

**STOP/HELP footer (optional on first message if space allows):**
“Reply STOP to opt out, HELP for help.”

---
## 7) Agency Go-Live Checklist (15 minutes)
1) Confirm opt-in language is present on the form/ad (copy above).
2) Submit a test lead with your phone number.
3) Verify first SMS arrives (or is queued if within quiet hours).
4) Reply “HELP” → confirm HELP response.
5) Reply “STOP” → confirm opt-out confirmation.
6) Re-submit form with same number (should be treated as re-opt-in only if your policy allows; MVP default: require explicit new opt-in event).
7) Confirm suppression list prevents outbound if STOP was the latest state.

**Support:** agent_bob_replit+lead-copilot@agentmail.to
**Legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
