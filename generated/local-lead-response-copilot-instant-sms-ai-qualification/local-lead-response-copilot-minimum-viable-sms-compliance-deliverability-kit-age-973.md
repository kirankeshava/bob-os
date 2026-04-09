# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Kit (Agency Handoff + Eng Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:36:05.413Z

---

## 1) What this is (for agencies)
Local Lead Response Copilot instantly texts new leads, asks 2–4 short qualification questions, and routes to booking. This pack gives you **copy/paste opt‑in language**, **default SMS templates**, and **minimum technical requirements** (STOP/HELP, quiet hours, consent logging) so your client can launch without carrier/TCPA issues.

**Legitimacy link (share with clients):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support:** agent_bob_replit+lead-copilot@agentmail.to

---

## 2) Minimum compliance checklist (MV, launch-ready)
**Required (do these before any sends):**
1) **Express written consent** captured on the lead form (checkbox or clear disclosure near submit).
2) **STOP handling**: if recipient replies STOP (or variants), immediately confirm opt‑out and add to suppression list.
3) **HELP handling**: reply with who you are + help contact.
4) **Suppression list enforced** across all clients/subaccounts.
5) **Quiet hours**: don’t text leads at night; queue until morning.
6) **Consent logging**: store the text shown at opt‑in + timestamp + source.

**Strongly recommended (but not blocking for first pilots):**
- Twilio Messaging Service + A2P 10DLC registration (if using long codes at scale)
- Content lint rules (avoid spam triggers; keep messages short and contextual)

---

## 3) Copy/paste opt‑in snippets (by source)
### A) Webflow / generic website form
Place **directly above the Submit button**:

**Option 1 (no checkbox, disclosure + submit constitutes consent):**
“By submitting this form, you agree to receive text messages about your request (appointment scheduling, updates, and confirmations). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out or HELP for help.”

Add links (recommended) near the disclosure:
“View Terms and Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (or your published Terms/Privacy URLs).”

**Option 2 (checkbox, safer for audits):**
[ ] “I consent to receive text messages about my request (appointment scheduling, updates, confirmations). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out; HELP for help.”

### B) Typeform
Add as a final statement screen or in the phone number question description:
“By providing your number, you agree to receive texts about your request (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out; HELP for help.”

### C) Meta / Facebook Lead Ads
In the Lead Form “Privacy Policy” / “Custom Disclaimer” area:
“By submitting, you agree to receive text messages about your inquiry (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out; HELP for help.”

Also ensure the page’s privacy policy link points to your published policy (or interim business site):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---

## 4) Default compliant message templates (safe, high-converting)
### 4.1 First response (immediate)
“Hi {{first_name}}, this is {{business_name}}. Got your request for {{service}}. What’s the address or ZIP for the job?”

### 4.2 Qualification (2–4 short questions)
Q1: “What’s the best day/time for us to come out or call?”
Q2: “Is this for a home or business?”
Q3: “Any details we should know so we can quote accurately?”

### 4.3 Booking handoff
“Perfect — I can get you scheduled. Here’s a link to pick a time: {{booking_link}}. If you prefer, reply with 2 times that work.”

### 4.4 Missed-call text back
“Hi {{first_name}}, we missed your call — can I help you get a quick quote or schedule a visit? Reply with what you need.”

### 4.5 Stop/Help footer (don’t add to every message; use where appropriate)
When required by client policy, add:
“Reply STOP to opt out, HELP for help.”

---

## 5) STOP/HELP implementation spec (Twilio-friendly)
### 5.1 Keywords to recognize (case-insensitive, trimmed)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP set:** HELP, INFO

### 5.2 Behavior
**On STOP keyword:**
1) Mark phone as opted_out=true immediately.
2) Add phone to **global suppression list** (client-scoped optional; safest is global per sending number/service).
3) Send single confirmation message:
“You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe.”
4) Block all future outbound to that phone unless explicit resubscribe captured.

**On HELP keyword:**
Respond:
“{{business_name}}: We text about your service request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

**On START (optional resubscribe):**
Only allow if you have prior consent record. Message:
“You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”

### 5.3 Logging requirements (audit)
Store an immutable event log row with:
- phone_e164
- client_id / business_id
- event_type: INBOUND_STOP / INBOUND_HELP / OUTBOUND_BLOCKED / OUTBOUND_SENT
- inbound_body (if inbound)
- matched_keyword
- message_sid (Twilio)
- timestamp_utc

---

## 6) Quiet hours (minimum viable spec)
**Goal:** prevent late-night texting while preserving speed-to-lead.

### 6.1 Quiet window
Default: **9:00pm–8:00am local time** (client-configurable).

### 6.2 Timezone resolution order
1) Business timezone setting (preferred)
2) Lead ZIP/postal code → timezone lookup
3) Lead state → timezone guess
4) Fallback: business timezone

### 6.3 Behavior
- If lead arrives during quiet hours: **queue** first message for next allowed time (send at 8:00am local).
- Store queued_at + scheduled_send_at.
- If multiple leads queued: send in arrival order.
- Allow **owner override** flag: “send anyway” for urgent categories (optional).

---

## 7) Deliverability hardening (minimum guidelines)
### 7.1 Content rules (reduce carrier filtering)
- No ALL CAPS, excessive punctuation, or “free/guarantee/winner” language.
- Avoid URL shorteners; use full branded domains when possible.
- Keep first message contextual (“Got your request for…”) and personalized.
- Don’t send repetitive identical messages at high volume; vary templates slightly.

### 7.2 Twilio configuration (recommended)
- Use a **Messaging Service** with:
  - Sticky Sender ON (for conversation continuity)
  - Smart Encoding ON
  - Validity period reasonable (e.g., 4–6 hours)
- If using long codes at scale: prepare for **A2P 10DLC** brand + campaign registration.

---

## 8) Agency go-live checklist (copy/paste)
1) Confirm the lead form has opt‑in disclosure (section 3).
2) Confirm STOP/HELP keywords are implemented (section 5).
3) Confirm quiet hours enabled (section 6).
4) Send test lead with your own phone number.
5) Reply “HELP” → verify help response.
6) Reply “STOP” → verify opt-out confirmation.
7) Attempt another outbound → must be blocked + logged.
8) Document the opt‑in screenshot + consent text used (store for audit).

---

## 9) Quick “compliance objection” response (for proposals)
“We use compliant opt‑in language on the lead form and automatically handle STOP/HELP. We enforce suppression lists to prevent messaging opted-out contacts, log consent for auditing, and respect quiet hours by local timezone. Our templates avoid carrier spam triggers, and we can support Twilio Messaging Services and A2P 10DLC registration as volumes scale.”