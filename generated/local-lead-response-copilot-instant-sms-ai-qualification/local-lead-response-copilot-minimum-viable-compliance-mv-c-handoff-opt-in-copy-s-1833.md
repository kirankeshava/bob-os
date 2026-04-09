# Local Lead Response Copilot — Minimum-Viable Compliance (MV-C) Handoff: Opt-In Copy, STOP/HELP, Quiet Hours, and Agency Go-Live

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:22:32.674Z

---

## Purpose (MV-C Scope)
This is the minimum-viable compliance + deliverability package required to (1) remove common pilot onboarding objections and (2) prevent carrier/account issues that break distribution. It covers: **opt-in disclosure**, **STOP/HELP handling**, **quiet hours**, and **consent logging**. 

Legitimacy links for agencies to share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/Paste Opt‑In Language (Forms + Ads)
### A) Webflow / Website Form (paste under the phone field)
**Checkbox label (recommended):**
“I agree to receive text messages about my request (appointment scheduling and updates) from {BUSINESS_NAME} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Small print (below checkbox):**
“By submitting, you confirm you are the subscriber/owner of this number and consent to receive SMS from {BUSINESS_NAME}. Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Required fields to store (for consent logging):** phone, checkbox=true, timestamp, page URL, IP (if available), user agent (if available), form name.

### B) Typeform (description text + required Yes/No)
**Question:** “SMS consent” (Required)
**Prompt:** “Can we text you about your request (scheduling and updates)?”
**Choices:** “Yes, text me” / “No”

**Description (beneath question):**
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Logic:** If “No”, do not start SMS flow (email/call only).

### C) Meta/Facebook Lead Ads (Lead form disclosures)
**Add to ‘Custom Disclaimer’ (or questions/description area):**
“By providing your phone number, you agree to receive text messages from {BUSINESS_NAME} about your request (scheduling and updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Important:** Do not claim “free” unless it’s truly free. Avoid implying affiliation with carriers.

---

## 2) Message Templates (Compliant Defaults)
### First Message (immediate)
“Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. We received your request for {service}. Are you looking to schedule in the next 7 days? Reply 1) Yes 2) No. Reply STOP to opt out, HELP for help.”

### Qualification Follow-up
“Got it. What’s your zip code? Reply with 5 digits. Reply STOP to opt out, HELP for help.”

### Booking CTA
“Thanks. Want to book a call or onsite estimate? Reply 1) Call 2) Onsite. Reply STOP to opt out, HELP for help.”

### Missed-call Textback (if enabled)
“Sorry we missed you — this is {BUSINESS_NAME}. What service do you need help with? Reply STOP to opt out, HELP for help.”

**Content rules (deliverability):**
- No ALL CAPS, no repeated punctuation, no misleading urgency (“ACT NOW”), no shortened/obfuscated links.
- Keep <160 chars where possible; include STOP/HELP at least in the first message of any new conversation.

---

## 3) STOP/HELP Handling (Implementation Spec)
### Keywords (case-insensitive; ignore leading/trailing whitespace/punctuation)
- **STOP:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP:** HELP, INFO, SUPPORT

### Behavior
1) If inbound matches STOP keyword:
   - Immediately mark contact as **sms_opted_out = true**.
   - Add phone to **global suppression list** (applies across all clients/locations under the platform unless legally segmented per account).
   - Send one confirmation (required):
     “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply HELP for help.”
   - Block all future outbound SMS to that number until explicit re-consent is captured.

2) If inbound matches HELP keyword:
   - Do **not** change opt status.
   - Respond:
     “{BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Msg freq varies. Reply STOP to opt out.”

3) If user sends freeform “start”/re-consent:
   - Only re-enable SMS if a new explicit consent event is recorded (e.g., checkbox on form or recorded verbal consent + timestamp). Do not assume “START” alone is legally sufficient across jurisdictions.

### Required audit logs (minimum)
- event_type: inbound_message / opt_out / help / outbound_blocked
- phone_e164
- timestamp_utc
- message_body (raw) + normalized_keyword
- account/location id
- decision (opted_out=true, responded=true, blocked_outbound=true)

### Acceptance criteria (for verification)
- After STOP: any outbound attempt returns “blocked_due_to_opt_out” in logs and sends nothing.
- HELP always returns support text within 5 seconds.

---

## 4) Quiet Hours by Timezone (Implementation Spec)
### Default quiet hours window
- **9:00 PM to 8:00 AM** recipient local time (configurable per account).

### Timezone resolution order
1) Lead-provided zip/postal → map to timezone
2) Business location timezone (if single-location)
3) Phone number area-code lookup (fallback)
4) Default: business HQ timezone

### Behavior
- If a message would send during quiet hours:
  - **Queue** it for the next allowed time (8:05 AM local) and log “queued_quiet_hours”.
  - Exception: operational messages that are directly requested by the user (e.g., “Text me the address”) may be allowed if the user initiated within the last 5 minutes; otherwise queue.

### DST handling
- Use IANA timezones (e.g., America/Chicago) and system libraries; do not hardcode offsets.

### Owner override
- Admin toggle: “Allow after-hours messaging” (default OFF). Log every override send.

---

## 5) Agency Go-Live Checklist (60 minutes)
1) Add opt-in language + checkbox to the lead form (Webflow/Typeform) OR add disclaimer to FB lead form.
2) Ensure the lead payload includes: phone, source, timestamp, and consent=true.
3) Turn on STOP/HELP handling in the SMS webhook (or confirm platform feature flag enabled).
4) Set quiet hours window and business timezone.
5) Send 3 test leads (internal numbers) and validate:
   - First message includes STOP/HELP line
   - STOP replies opt out and suppresses future outbound
   - HELP returns support message
   - After-hours lead queues until next morning

For implementation questions, agencies can reference the legitimacy URL above and email support: agent_bob_replit+lead-copilot@agentmail.to.
