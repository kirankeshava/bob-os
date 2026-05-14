# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:07:20.302Z

---

# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack

**Purpose (wartime/MVP):** remove the #1 sales objection (“Will this get us in trouble / get blocked?”) and prevent pilot failures by implementing **clear opt‑in**, **STOP/HELP**, **quiet hours**, and **basic deliverability hygiene**.

**Legitimacy links to include everywhere**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
- Privacy/Terms: publish pages on the same domain and replace placeholders below with final URLs.

---
## 1) Copy/Paste Opt‑In Language (Lead Sources)

### A) Webflow / Website form checkbox (recommended)
**Checkbox label (must be unchecked by default):**
> I agree to receive text messages about my request (quotes, scheduling, and updates) from **{BUSINESS_NAME}** at the number provided. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to cancel, **HELP** for help. View Privacy: {PRIVACY_URL} and Terms: {TERMS_URL}.

**Hidden fields to capture (minimum):**
- consent_sms = true/false
- consent_timestamp (ISO)
- consent_source = "webflow"
- consent_form_url
- ip_address (if available)
- user_agent (if available)

### B) Typeform
**Statement (before submit):**
> By submitting, you agree **{BUSINESS_NAME}** may text you about your request (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help. Privacy {PRIVACY_URL}, Terms {TERMS_URL}.

**Typeform settings:** enable a required “SMS Consent” Yes/No field if possible; otherwise include statement + store submission timestamp.

### C) Meta/Facebook Lead Ads
**Lead form custom disclaimer (add to form):**
> By submitting this form, you agree to receive SMS messages from **{BUSINESS_NAME}** regarding your request (quotes, scheduling, and updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.

**Meta notes:** ensure the lead form question explicitly asks for phone number, and the disclaimer is visible at submit.

---
## 2) Default Message Templates (Compliant, low‑spam)

### Initial speed-to-lead (send within 10–30 seconds)
> Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address/zip for the job?

*(Do not include links in the first message unless necessary. Avoid ALL CAPS, excessive punctuation, and “free/urgent/limited time”.)*

### Qualification (2–4 short questions)
1) > Thanks. When are you looking to start—today/tomorrow, this week, or later?
2) > Is this for a home or business?
3) > Any quick details I should know (size/issue/type)?

### Booking handoff (call or appointment)
> Perfect—want to book a quick call or set an appointment? Reply 1 for a call, 2 for an appointment.

If call:
> Great. What’s the best time window today: morning, afternoon, or evening?

If appointment:
> What day/time works best? (Example: Tue 2–4pm)

### STOP/HELP footer (include at least once in the conversation, and in any broadcast/re‑engagement)
> Reply STOP to opt out, HELP for help.

### Re‑engagement (only if consent exists; keep it single-touch)
> Hi {first_name}—checking in from {BUSINESS_NAME}. Do you still need help with {service}? Reply YES and I’ll get you booked. Reply STOP to opt out.

---
## 3) STOP / HELP Handling (Implementation Spec)

**Goal:** immediate compliance, global suppression, and provable logs.

### A) Recognize keywords (case-insensitive, trimmed)
- **STOP keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP keywords:** HELP, INFO, SUPPORT

### B) Behavior
**On inbound STOP keyword:**
1) Set `contact.sms_opt_out = true` and `contact.sms_opt_out_at = now()`.
2) Add phone to a **global suppression list** (applies across all subaccounts/locations).
3) Send **one** confirmation message:
   > You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to opt back in.
4) Block all future outbound to that phone until explicit opt‑in/START is captured.

**On inbound HELP keyword:**
Send:
> {BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**On inbound START (optional re-opt-in):**
- Only if you support re-opt-in: set `sms_opt_out=false` and log `reopt_in_source='START'`.
- Confirm:
  > You’re re‑subscribed. Reply STOP to opt out.

### C) Logging requirements (minimum fields)
For every inbound/outbound message:
- message_id, timestamp, direction, to, from, body, provider_status
- consent_reference_id (if available)
- stop_help_event_type (none/stop/help/start)

---
## 4) Quiet Hours by Timezone (Implementation Spec)

**Default quiet hours:** 8:00pm–8:00am recipient local time (adjustable per client).

### A) Timezone resolution order
1) If lead has address/zip → map to timezone.
2) Else if area code mapping is confident → use that timezone.
3) Else use business timezone as fallback.

### B) Behavior
- If a message would send during quiet hours: **queue** it for the next allowed time (e.g., 8:05am local).
- If lead messages you during quiet hours: you may send **one** acknowledgment if permitted by client policy, otherwise queue response.

**Suggested quiet-hours auto-reply (optional):**
> Thanks—got it. We’ll follow up in the morning. Reply STOP to opt out.

### C) Overrides
- Admin “urgent” override allowed only for explicit emergency services (client-configured), and must be logged with reason.

---
## 5) Twilio Deliverability Hardening (MVP Checklist)

### A) Messaging Service
- Use a **Twilio Messaging Service** (not a single number hard-coded).
- Enable: Sticky Sender (if appropriate), Smart Encoding, and status callbacks/webhooks.
- Add numbers to pool as volume grows.

### B) A2P 10DLC readiness (do ASAP if using long code)
- Prepare: legal business name, EIN (if applicable), website, privacy/terms URLs, sample messages, opt-in description.
- Create Brand + Campaign in Twilio console when ready.

### C) Content guidelines to avoid filtering
- Avoid: excessive links, URL shorteners, “free/winner/guarantee”, ALL CAPS, repeated identical messages.
- Keep first message short, contextual (“about your request”), and conversational.
- Include STOP language at least once per conversation thread and in any re-engagement.

### D) Fallback behaviors
- If message fails with carrier violation/blocked: stop retries, flag lead record, notify operator.
- If lead is opted out: block send and return a clear application error.

---
## 6) Agency Handoff: Go‑Live Checklist (Copy/Paste)

1) **Install opt-in language** in the lead source (Webflow/Typeform/FB Lead Ads) using snippets above.
2) Ensure you capture: phone, consent checkbox/disclaimer, timestamp, source.
3) Confirm Privacy/Terms URLs are live on the website (same domain as above).
4) Turn on STOP/HELP handling per spec; verify suppression is global.
5) Configure quiet hours (default 8pm–8am) and timezone resolution.
6) Send test leads (3 numbers) and run STOP/HELP tests.

### STOP/HELP verification (quick test matrix)
- Send “STOP” → receive opt-out confirmation; further outbound is blocked.
- Send “HELP” → receive support message with email + website.
- Send “START” (if supported) → re-subscribed confirmation; outbound allowed again.

---
## 7) “Compliance objection” rebuttal (agencies can paste)
> We use explicit SMS consent language on every form/ad, include STOP/HELP handling, respect quiet hours by recipient timezone, and log consent + message events for auditability. We can support Twilio A2P 10DLC registration where required and follow CTIA/TCPA-aligned messaging guidelines to reduce carrier filtering and account risk.
