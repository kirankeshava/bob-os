# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:56:58.899Z

---

# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff
Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (MVP)
Launch pilots without carrier/TCPA/CTIA surprises by implementing only the non-negotiables:
1) Clear opt-in language at lead capture
2) STOP/HELP handling with durable suppression
3) Quiet hours by timezone (no late-night texts)
4) Consent logging (audit trail)

This is not legal advice; it is an implementation checklist to reduce enforcement risk.

---
## 1) Copy/Paste Opt-in Snippets (Use ONE per lead source)

### A) Webflow / Website Form (checkbox + short disclosure)
**Field label (required checkbox):**
“I agree to receive text messages about my request.”

**Disclosure text (place under checkbox):**
“By checking this box, you consent to receive SMS messages from [BUSINESS NAME] about your inquiry, including appointment scheduling and service updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms: [TERMS_URL] and Privacy: [PRIVACY_URL].”

**Implementation notes:**
- Checkbox must be unchecked by default.
- Store: checkbox value, timestamp, form URL, IP (if available), user agent (if available), and the exact disclosure text version.

### B) Typeform
Use a required Yes/No question.

**Question:** “Do you agree to receive text messages about your request?”
**Description:**
“By selecting Yes, you consent to receive SMS from [BUSINESS NAME] related to your inquiry (scheduling/updates). Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to buy. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Mapping:**
- Map the Yes/No answer into `sms_consent=true/false`.

### C) Meta/Facebook Lead Ads
Put the disclosure into the Lead Form’s custom disclaimer text.

**Disclaimer (paste as-is):**
“By submitting this form, you agree to receive SMS messages from [BUSINESS NAME] about your inquiry (e.g., scheduling and service updates). Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Important:**
- Only text leads who submitted the form AND where the disclaimer is present.

---
## 2) Message Templates (MVP, compliant + deliverability-friendly)
Guidelines: keep messages short, avoid ALL CAPS, avoid excessive links, avoid “free!!!”/“guaranteed” language.

### Initial speed-to-lead text (send immediately)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. Are you looking to book today or this week? Reply STOP to opt out.”

### Qualification (1–2 questions max)
1) “What’s the address/ZIP for the job?”
2) “What’s the best time window for us to call you: morning, afternoon, or evening? Reply STOP to opt out.”

### Booking prompt
“Perfect — want to grab a quick call to confirm details? Here are times: {slot1}, {slot2}. Reply 1 or 2. Reply STOP to opt out.”

### If no response (single follow-up)
“Checking in — do you still want help with {service}? Reply YES and we’ll schedule, or STOP to opt out.”

### HELP response (must be immediate)
“Help: You’re receiving texts because you requested info from {business_name}. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. More: {website_url}.”

### STOP confirmation
“You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe.”

---
## 3) STOP/HELP Handling — Engineering Spec (Twilio-style)

### Keywords (case-insensitive, trim punctuation)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP set:** HELP, INFO
**START set (re-subscribe):** START, YES, UNSTOP

### Required behaviors
1) On inbound message matching STOP-set:
- Immediately mark phone number as suppressed globally: `sms_opt_out=true`.
- Send STOP confirmation message (above).
- Block all future outbound messages to that number unless START-set received.

2) On inbound HELP-set:
- Send HELP response (above).
- Do NOT change subscription state.

3) On inbound START-set:
- Only allow resubscribe if you have historical proof of opt-in OR user is actively in a lead flow.
- Set `sms_opt_out=false` and log resubscribe event.
- Confirm: “You’re re-subscribed. Reply STOP to opt out.”

### Logging (minimum viable consent + compliance audit)
Store the following events:
- `lead_created` (source, timestamp, lead_id)
- `sms_consent_captured` (boolean, consent_text_version, page/form identifier, timestamp, ip/user_agent if available)
- `inbound_message` (from, to, body, timestamp, provider_message_sid)
- `opt_out` (method=STOP keyword, timestamp)
- `help_requested` (timestamp)
- `resubscribed` (timestamp)
- `outbound_blocked_due_to_opt_out` (timestamp, attempted_template)

### Suggested pseudo-logic
If inbound matches STOP → suppress + confirm.
Else if inbound matches HELP → help response.
Else if inbound matches START → unsuppress (if allowed) + confirm.
Else → normal AI/qualification flow.

---
## 4) Quiet Hours by Timezone — Implementation Spec (MVP)

### Default policy
- Send SMS only between **8:00am and 8:00pm recipient local time**, Monday–Saturday.
- Sunday: either 10:00am–6:00pm OR off (choose one default; MVP recommendation: 10–6).

### Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone
2) Phone number area code (best-effort)
3) Business timezone fallback (config)

### Behavior
- If a message would be sent outside window: **queue** it for next allowed time.
- If lead replies inbound outside window: you may respond with a single acknowledgement and queue the rest:
  “Thanks — we got this. We’ll text you back during business hours. Reply STOP to opt out.”

### Overrides
- Manual operator “send anyway” for truly urgent situations (logged as `quiet_hours_override=true`).

---
## 5) Deliverability Hardening (Do this before scaling volume)

### Content rules (simple lint)
- No URL shorteners.
- Keep links optional; avoid links in first message when possible.
- Avoid repeated identical messages across many recipients in a short time.
- Include business name early.
- Avoid spammy phrasing (“act now”, “limited time”, excessive punctuation).

### Twilio configuration (when Twilio is used)
- Use a **Messaging Service** for pooling, sticky sender, and centralized settings.
- Configure inbound webhook to your STOP/HELP handler.
- If sending via long code at scale, plan for **A2P 10DLC registration** (brand + campaign). Start free workflow when ready; do not scale cold traffic before registration.

---
## 6) Agency Go-Live Checklist (30 minutes)
1) Add opt-in disclosure to the lead form (Webflow/Typeform/FB).
2) Ensure consent field is captured and passed through (true/false).
3) Turn on STOP/HELP handler and verify suppression.
4) Enable quiet hours with timezone mapping.
5) Send yourself a test lead and confirm:
   - Initial SMS sends
   - Reply HELP → help response
   - Reply STOP → opt-out confirmation + future outbound blocked
   - Reply START → resubscribe (if allowed) and log created

If any step fails, email agent_bob_replit+lead-copilot@agentmail.to with timestamps + phone number used for test.
