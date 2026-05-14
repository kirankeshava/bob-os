# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:49:32.916Z

---

# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) What “minimum viable compliant” means (to launch pilots safely)
You must have ALL of the following on day 1:
1) **Clear opt-in disclosure** at the point of lead capture (form/ad).  
2) **STOP + HELP handling** that works on every number and suppresses future messages.  
3) **Quiet hours** (don’t text late night / early morning based on lead timezone; queue instead).  
4) **Consent logging** (store proof of what they agreed to and where).

If any one of these is missing, pilots risk carrier filtering, complaint spikes, or account enforcement.

---
## 2) Copy/paste opt-in language (by lead source)
Use the bracket fields to insert the client’s business name and your legal links.

### A) Webflow (under the phone field + near submit button)
**Checkbox label (preferred):**
“I agree to receive text messages from **[Client Business Name]** about my request and appointment. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to opt out, **HELP** for help. Consent is not a condition of purchase. See Terms: **[TERMS_URL]** and Privacy: **[PRIVACY_URL]**.”

**If no checkbox is possible (fallback):**
“By submitting, you agree to receive texts from **[Client Business Name]** about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Required form fields to capture/store:** phone, first name, service requested, zip/city, source (“webflow”), timestamp, page URL.

### B) Typeform (add as a ‘Legal’ statement + require phone)
“By providing your phone number, you agree that **[Client Business Name]** may text you about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: **[TERMS_URL]** Privacy: **[PRIVACY_URL]**.”

**Required fields to capture/store:** phone, name, answers, source (“typeform”), timestamp, form URL.

### C) Meta/Facebook Lead Ads (use the built-in ‘Privacy policy’ + custom disclaimer)
**Lead form disclaimer (paste):**
“By submitting, you agree to receive text messages from **[Client Business Name]** about your request and appointment. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: **[TERMS_URL]** Privacy: **[PRIVACY_URL]**.”

**Meta setup notes:**
- Ensure the **Privacy Policy URL** field is filled.
- Avoid misleading language (“guaranteed quote”, “free government program”, etc.).

---
## 3) Message templates (safe defaults)
Principles: be specific, short, no link on first touch if possible, include business identity, avoid ALL CAPS and excessive punctuation.

### Initial speed-to-lead (send immediately)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. What’s the address or ZIP for the job?”

### Qualification (1–2 questions max)
1) “When would you like us to come out—today, this week, or next week?”
2) “Any photos you can share, or a quick description of the issue?” (only if needed)

### Booking handoff
“Thanks—want to book a quick call or a time window for an appointment? Reply 1 for call, 2 for appointment.”

### Missed-call text back
“Hi—this is {business_name}. We missed your call. What service do you need and what’s your ZIP?”

### STOP/HELP footer usage
Do **not** append STOP/HELP to every message in a back-and-forth conversation; rely on opt-in disclosure + functional STOP/HELP handling. Add a footer only for first outreach if required by client policy.

---
## 4) STOP/HELP implementation spec (Twilio webhook model)
### Keywords to recognize (case-insensitive, trim punctuation)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**HELP set:** HELP, INFO

### Required behaviors
1) If inbound body matches STOP set:
- Add phone to **Global Suppression List** (per tenant/client + global platform list).
- Respond once with:
  “You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
- Block all future outbound sends to that phone unless they re-opt-in via a new compliant form submission.

2) If inbound body matches HELP set:
- Respond once with:
  “{business_name}: We text about your service request and scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) Any other inbound message:
- Continue normal qualification flow **only if not suppressed**.

### Logging requirements (minimum)
Store per inbound event:
- tenant_id/client_id
- from_number, to_number
- message_body
- matched_intent: STOP | HELP | OTHER
- suppression_changed: true/false
- timestamp_utc
- raw_provider_payload (or hash + key fields)

---
## 5) Quiet hours implementation spec (minimum viable)
### Default quiet hours
Do not send outbound messages between **8:00 PM and 8:00 AM lead-local time**.

### Timezone resolution order
1) Lead provided ZIP/city/state → map to timezone
2) If missing: infer from area code (lower confidence)
3) If still unknown: default to client’s business timezone

### Behavior when message falls in quiet hours
- **Queue** the message for the next allowable time (8:05 AM lead-local).
- If multiple queued messages exist, send only the latest “state” message (avoid spam bursts).

### Overrides
Allow a manual “send anyway” only for an internal user action (not automation), and log who overrode and why.

---
## 6) Consent logging (what agencies must pass through)
At lead capture, store:
- consent_text_version (exact string shown)
- consent_timestamp
- lead_source (webflow/typeform/meta/etc.)
- page_url/form_id
- ip_address (if available)
- user_agent (if available)
- phone, name

---
## 7) Go-live verification checklist (10 minutes)
1) Submit a test lead via the real form/ad with your phone number. Confirm first SMS arrives quickly.
2) Reply “STOP”. Confirm you get the opt-out confirmation and no further texts are sent.
3) Reply “HELP”. Confirm you receive the help message with support + website.
4) Trigger a message during quiet hours (simulate by setting timezone) and verify it queues for next morning.
5) Confirm consent log row exists with source + consent text.

If any step fails, do not launch paid traffic; fix first.
