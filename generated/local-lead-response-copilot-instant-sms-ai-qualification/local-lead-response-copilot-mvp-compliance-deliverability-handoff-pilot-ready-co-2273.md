# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Pilot-Ready, Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:33:56.960Z

---

## Purpose (pilot-ready, minimal)
This pack is the minimum needed to remove compliance/deliverability objections and prevent carrier/TCPA issues during pilots for **Local Lead Response Copilot**.
- Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Opt‑in language (copy/paste)
Use **one** of the snippets below wherever the lead submits their phone number. Do not text cold lists.

### A) Webflow / Website form checkbox (recommended)
**Checkbox label (required, unchecked by default):**
> I agree to receive text messages from {BUSINESS NAME} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.

**Helper text (optional, near submit button):**
> By submitting, you confirm you are the subscriber/primary user of this number and consent to receive texts related to your inquiry.

### B) Typeform (in description under phone question)
> By providing your number, you consent to receive text messages from {BUSINESS NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.

### C) Meta/Facebook Lead Ads (custom disclaimer)
Put this in the **“Custom disclaimer”** field:
> By submitting this form, you agree to receive SMS from {BUSINESS NAME} regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.

**Important:** If the lead source is Meta Lead Ads, ensure the client’s page/form is configured so the user expects contact (high intent). Avoid “sweepstakes/discount blast” framing.

---

## 2) Message templates (compliant + deliverability-safe)
Guidelines: keep messages short, no ALL CAPS, no “FREE!!!”, no link stuffing, no misleading claims. Include business identification early.

### Template 1 — First response (immediate)
> Hi {first_name} — this is {agent_name} with {BUSINESS NAME}. Thanks for reaching out about {service}. What city/zip is the job in?

### Template 2 — Qualification (1–2 questions max)
> Got it. When would you like service: today, this week, or just getting a quote?

### Template 3 — Booking prompt
> I can get you scheduled. What time works best for a quick call: {option1} or {option2}?

### Template 4 — Booking confirmation
> You’re set for {day} at {time}. If anything changes, reply here. Reply STOP to opt out.

### Template 5 — Missed-call textback (if used)
> Sorry we missed you — this is {BUSINESS NAME}. Text me what you need help with and your address/zip, and we’ll get you booked.

### Template 6 — Re‑engagement (1 follow‑up only)
Send no more than once after 24–48 hours:
> Hi {first_name}, this is {BUSINESS NAME}. Do you still need help with {service}? Reply 1 for yes or 2 for no. Reply STOP to opt out.

---

## 3) STOP/HELP handling (MVP implementation spec)
This is the must-ship behavior to avoid enforcement.

### Keywords
- **STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **START/UNSTOP set:** START, YES, UNSTOP
- **HELP set:** HELP, INFO

### Required behavior
1) **On inbound STOP-set keyword** (case-insensitive; trim punctuation/spaces):
   - Mark contact as **opted_out=true** immediately.
   - Add phone to **Global Suppression List** (do not message from any campaign/workflow).
   - Send one confirmation message:
     > {BUSINESS NAME}: You’re unsubscribed and will no longer receive texts. Reply START to resubscribe.
   - Log event (see logging below).

2) **On inbound HELP-set keyword**:
   - Do not change consent status.
   - Send:
     > {BUSINESS NAME}: For help, reply to this text or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.
   - Log event.

3) **On inbound START/UNSTOP**:
   - Only re-enable if there is a recorded prior opt-in (form/lead source record).
   - If re-enabled, send:
     > {BUSINESS NAME}: You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.
   - Log event.

4) **Outbound gate**
Before any outbound SMS, check:
- If opted_out=true OR phone in suppression list => **block send** and log “blocked_suppression”.

### Logging (minimum fields)
Store for each message/event:
- contact_phone (E.164)
- lead_source (webflow/typeform/meta/etc.)
- consent_status (opted_in/opted_out)
- consent_timestamp + consent_context (form name, ad id if available)
- inbound_message_body (for STOP/HELP audits)
- event_type (inbound_stop, inbound_help, outbound_blocked, outbound_sent)
- event_timestamp_utc

---

## 4) Quiet hours (MVP spec)
Goal: avoid complaints + carrier scrutiny; keep it simple.

### Default rule
- Only send automated texts **8:00am–8:00pm** in the lead’s local timezone.

### Timezone resolution order
1) If lead has explicit timezone field => use it.
2) Else infer from **ZIP** (preferred) or **state**.
3) Else infer from **area code**.
4) If unknown => treat as client’s business timezone and be conservative.

### Behavior
- If a lead arrives outside quiet hours:
  - Queue first SMS to send at next 8:00am local time.
  - Still allow internal notification to business owner (email/slack) if configured.

### Override (optional)
If the lead explicitly requests immediate contact (e.g., “call now”), allow sending one message outside quiet hours, but include calm language and no marketing.

---

## 5) Twilio deliverability (MVP guidance)
- Use a **Twilio Messaging Service** (even for a single number) to centralize compliance features.
- Keep templates consistent; avoid URL shorteners.
- Avoid “marketing blast” language; these are **transactional/lead response** messages.
- If volume grows or filtering increases, move toward **A2P 10DLC** registration (brand + campaign). For pilots, ensure consent capture + STOP handling are correct first.

---

## 6) Agency go‑live checklist (15 minutes)
1) Confirm lead source includes opt-in language (Section 1).
2) Send a test lead with your own phone number.
3) Verify first SMS arrives within 60 seconds (or queues if outside quiet hours).
4) Reply “HELP” => receive help message.
5) Reply “STOP” => receive unsubscribe confirmation.
6) Confirm any further outbound attempt is blocked for that number.
7) Reply “START” => confirm resubscribe works only if prior opt-in is recorded.

If any step fails, pause sending and email agent_bob_replit+lead-copilot@agentmail.to with: sending number, destination number, timestamps, and message bodies.
