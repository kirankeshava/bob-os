# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Opt‑In, STOP/HELP, Quiet Hours, Consent Logs, Agency Instructions)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T16:07:57.983Z

---

## Purpose (MVP)
This handoff contains the minimum viable compliance + deliverability requirements needed to safely run paid pilots for **Local Lead Response Copilot (Instant SMS + AI Qualification)** without avoidable carrier/TCPA/CTIA issues. It is designed for agencies and operators launching home-services/local lead funnels.

Legitimacy links (use in proposals + opt-in disclosures):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---
## 1) Required Opt-In/Consent Language (copy/paste)
### A) Webflow / website form checkbox (recommended)
Add a required checkbox near the phone field:
**Checkbox label**
“I agree to receive text messages about my request from {BUSINESS_NAME}. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Helper text under checkbox (optional)**
“By submitting, you consent to receive SMS related to your inquiry, scheduling, and updates. See Privacy Policy and Terms: {PRIVACY_URL} | {TERMS_URL}.”

Implementation notes:
- Checkbox must be **unchecked by default**.
- Store: timestamp, page URL, form name, user IP (if available), and the exact checkbox text/version.

### B) Typeform (single checkbox + statement)
Use a **Statement** block under phone field:
“By providing your phone number, you agree to receive text messages about your request from {BUSINESS_NAME}. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”

Add a required “Yes, I agree” checkbox question.

### C) Meta/Facebook Lead Ads (recommended settings)
In the Lead Form:
- Add a custom disclaimer (or use the built-in one) including:
“By submitting, you agree to receive text messages from {BUSINESS_NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: {PRIVACY_URL} | {TERMS_URL}.”

Operational note: store the lead ad ID, campaign/adset/ad identifiers, and the exact disclaimer text used.

---
## 2) First Message Templates (deliverability-safe + compliant)
### Immediate first response (after lead submission)
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Thanks for reaching out about {service}. Are you looking to get this done in the next (A) 0–7 days, (B) 1–4 weeks, or (C) just researching? Reply A, B, or C. Reply STOP to opt out.”

### Qualification follow-up (if user replies)
“Got it. What’s the address or ZIP code for the job? Reply STOP to opt out.”

### Booking prompt
“Thanks. Want to book a quick call or estimate? Reply 1 for today, 2 for tomorrow, or 3 for next week. Reply STOP to opt out.”

### Missed-call text-back (if relevant)
“Sorry we missed you—this is {BUSINESS_NAME}. What’s a good time to call you back today? Reply STOP to opt out.”

Content guidelines (MVP):
- Don’t use “FREE”, “guaranteed”, excessive punctuation, or all-caps.
- Keep links minimal; only include your own domain if needed.
- Do not mention “loan/credit/debt”, “cannabis”, “crypto”, or other high-filter categories.

---
## 3) STOP / HELP Handling (MVP implementation spec)
### A) Keywords to treat as opt-out (case-insensitive, trim whitespace)
Exact or contains-match at word boundaries:
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

### B) HELP keywords
HELP, INFO, SUPPORT

### C) Behavior rules
1) If inbound message matches STOP keyword:
- Immediately add phone number to a **Global Suppression List** (per client account).
- Send one confirmation message:
  “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply HELP for help.”
- Block all future outbound messages to that number (including automated sequences) unless the user re-consents via a documented opt-in flow.

2) If inbound message matches HELP keyword:
- Send:
  “{BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

3) If phone is suppressed:
- Do not send any outbound messages (even transactional) until new opt-in is captured.
- Log the attempted send as “blocked_suppressed”.

### D) Logging requirements (audit trail)
For every lead + message, store:
- phone_e164
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow_form / typeform / fb_lead_ad / manual
- consent_timestamp (UTC)
- consent_text_version (hash or version string)
- stop_timestamp (UTC) when applicable
- last_inbound_message_body
- last_inbound_timestamp
- message_sid/provider_message_id (if Twilio)
- suppression_reason: STOP keyword (and which one)

---
## 4) Quiet Hours by Timezone (MVP spec)
Goal: prevent messages during late-night hours to reduce complaints and carrier scrutiny.

### A) Default send window
Allow outbound automation only between **08:00 and 20:00 local time** for the lead.

### B) Timezone resolution order
1) If lead address/ZIP exists → map ZIP to timezone.
2) Else if form includes state → approximate timezone (best-effort).
3) Else use area code timezone.
4) If unknown → default to client’s configured timezone.

### C) Behavior
- If a lead comes in during quiet hours: queue the first message to send at next allowed time (08:00 local).
- If user messages you during quiet hours: it is acceptable to respond immediately **only if** the user initiated the conversation; otherwise queue.
- Always allow an owner/manual override for truly urgent operational messages, but log overrides.

### D) Edge cases
- DST: rely on an IANA timezone database (e.g., America/Chicago) rather than fixed offsets.
- If timezone cannot be resolved confidently, choose the most conservative (earliest next send) and log “timezone_fallback_used=true”.

---
## 5) Twilio Deliverability (MVP defaults)
If using Twilio:
- Use a **Messaging Service** (not random standalone numbers) to centralize compliance and scaling.
- Enable: Advanced Opt-Out (if available), sticky sender (optional), and status callbacks for delivery tracking.
- Maintain consistent templates; avoid frequent drastic copy changes.

A2P 10DLC:
- For US long-code messaging at scale, assume A2P registration will be required.
- Do not start large-volume sending until Brand + Campaign are registered where applicable to avoid filtering.

Fallback behaviors:
- If message send fails with provider error: retry once after 60–120 seconds; if still failing, mark lead “needs_manual_followup” and email the operator.

---
## 6) Agency Go-Live Checklist (copy/paste)
1) Confirm lead source(s): Webflow / Typeform / FB Lead Ads.
2) Add required opt-in checkbox/disclaimer (Section 1) and ensure it is not pre-checked.
3) Confirm your Privacy/Terms URLs: {PRIVACY_URL} and {TERMS_URL}.
4) Configure STOP/HELP (Section 3) and verify suppression blocks future sends.
5) Enable quiet hours (Section 4) with 8am–8pm local window.
6) Send test leads from each source and validate:
   - First message sends within 60 seconds (or queues during quiet hours)
   - STOP returns confirmation and blocks future sends
   - HELP returns support email + STOP instruction
7) Keep proof: export consent logs + 3–5 example message logs for the pilot folder.

---
## 7) Minimal “Compliance Objection” Rebuttal (for proposals)
“We capture explicit SMS consent at the point of lead capture (checkbox/disclaimer), include STOP/HELP in messaging, enforce quiet hours by lead timezone, and maintain opt-in/opt-out audit logs. We also follow carrier deliverability best practices (messaging service, stable templates, and A2P registration where required) to reduce filtering and protect your sending reputation.”
