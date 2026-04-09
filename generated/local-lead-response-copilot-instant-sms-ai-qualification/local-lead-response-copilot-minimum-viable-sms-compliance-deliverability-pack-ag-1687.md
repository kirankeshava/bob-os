# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:37:49.239Z

---

## Purpose (MV compliance only)
This pack gives agencies a “deploy today” set of compliant opt-in disclosures, message templates, STOP/HELP handling requirements, quiet-hours behavior, and deliverability guardrails for Local Lead Response Copilot.

Business legitimacy links to use everywhere:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/paste opt‑in language (Webflow / embedded forms)
**Checkbox label (recommended, unchecked by default):**
“I agree to receive text messages about my request at the number provided. Message & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Terms & Privacy.”

**Below-form microcopy (optional but recommended):**
“By submitting, you authorize us to contact you about your request via SMS/calls. Consent is not a condition of purchase. Terms/Privacy: [link]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Required fields to capture:**
- Phone number
- Timestamp (UTC)
- Source (Webflow)
- Page URL
- Checkbox value (true/false)
- IP address (if available)

---

## 2) Copy/paste opt‑in language (Typeform)
**Statement (near phone question):**
“By providing your number, you agree to receive text messages about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms/Privacy: [link].”

**Typeform recommended setup:**
- Add a Yes/No consent question (default = No)
- Only send the lead to SMS if consent = Yes

---

## 3) Copy/paste opt‑in language (Meta/Facebook Lead Ads)
**Add to the ‘Privacy Policy’/disclaimer section (and/or custom question description):**
“By submitting this form, you agree to receive text messages regarding your request at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms/Privacy: [link]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Operational note:** Ensure the lead form includes a phone field and that your CRM/zap only triggers SMS when consent is present.

---

## 4) Minimum viable message templates (carrier-safe)
**First message (send immediately after form submission):**
“Hi {{first_name}}—this is {{business_name}}. We got your request for {{service}}. What’s the address/ZIP for the job?”

**Qualification follow-up (if no address):**
“No problem—what city is the project in?”

**Availability question:**
“When would you like this done—today, this week, or a specific date?”

**Booking handoff (when ready):**
“Got it. Want to book a quick call or get an estimate by text? Reply 1 for call, 2 for text.”

**Call booking confirmation:**
“Perfect—what’s a good time today/tomorrow? If you prefer, you can call us directly too.”

**STOP/HELP footer rule (MV):**
- Do NOT append STOP/HELP to every message (can look spammy), but ensure it appears in the initial disclosure (form) and at least once in early conversation if your legal counsel requires it.

---

## 5) STOP / HELP handling (implementation spec)
### Keywords
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- Case-insensitive; trim whitespace; ignore punctuation (e.g., “STOP.”)

### Behavior
1) **Inbound STOP received**
- Immediately mark phone as opted_out=true in a **Global Suppression List** (across all subaccounts/locations).
- Send **one** confirmation message:
  “You’re opted out and will no longer receive texts. Reply START to resubscribe. For help: agent_bob_replit+lead-copilot@agentmail.to.”
- Block all future outbound messages to that phone unless a compliant re-opt-in occurs.

2) **Inbound HELP received**
- Do not opt-out.
- Send help message:
  “Help: This number sends updates about your request with {{business_name}}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) **Inbound START received (optional, if supported)**
- Only re-enable if you can log re-consent.
- Reply:
  “You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”

### Logging requirements (audit)
For every opt-out/help event, log:
- phone_e164
- event_type (STOP|HELP|START)
- inbound_message_body
- timestamp_utc
- provider_message_id
- source (sms)
- campaign/location identifier

### Outbound safety checks
Before sending any outbound SMS:
- If opted_out=true ⇒ hard-block send and log “blocked_optout”.
- If consent_missing=true ⇒ block send and log “blocked_no_consent”.

---

## 6) Quiet hours (timezone-based) — implementation spec
### Default quiet hours (MV)
- No outbound SMS from **8:00 PM to 8:00 AM lead-local time**, every day.

### Timezone resolution order
1) Lead-provided ZIP/postal code ⇒ map to timezone
2) Lead city/state ⇒ map to timezone
3) Area code heuristic (phone NPA) ⇒ approximate timezone
4) If unknown ⇒ default to business timezone and be conservative (queue if near boundary)

### Sending behavior
- If message is triggered during quiet hours: **queue** and send at next allowed time (8:00 AM lead-local).
- For human-takeover: allow manual override only for inbound replies (i.e., if lead texts first during quiet hours, you may respond).

### DST
- Use IANA timezone IDs; rely on standard DST conversion.

### Logging
- decision: sent_now | queued_quiet_hours
- lead_timezone
- scheduled_send_time_utc

---

## 7) Deliverability guardrails (Twilio or any SMS provider)
**Do (recommended):**
- Identify business early: “this is {{business_name}}”
- Keep messages short; ask one question at a time
- Use plain links sparingly; avoid URL shorteners
- Cap follow-ups: max 3 nudges within 24 hours if no reply

**Avoid (common carrier filters):**
- “FREE”, “LIMITED TIME”, “ACT NOW”, excessive punctuation, ALL CAPS
- Repeated identical messages
- Link-only messages (no context)
- Claims about approval/loans/credit (unless your vertical legitimately requires it)

---

## 8) Agency go-live checklist (no code changes)
1) Add the opt-in checkbox + disclosure to the form (Webflow/Typeform) or disclaimer in FB lead form.
2) Ensure the automation only triggers SMS when consent is captured.
3) Confirm initial message template includes business identification.
4) Confirm STOP/HELP keywords are routed to the product/provider and that opt-outs are honored globally.
5) Enable quiet hours: 8pm–8am lead-local; queue sends.
6) Run a 10-minute test:
   - Submit a test lead with your phone
   - Reply HELP (confirm help response)
   - Reply STOP (confirm opt-out + no further messages)
   - Submit another test lead to ensure blocked outbound works

---

## 9) Notes on A2P 10DLC (defer unless needed)
For pilots, start with compliant content + low volume. If using US long-code at scale, A2P 10DLC Brand/Campaign registration will likely be required to protect deliverability. We can initiate registration once the sending route/provider is confirmed; do not pay any fees in week 1.
