# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:40:46.018Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Handoff
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support email (for STOP/HELP, disputes, consent questions): agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-viable compliance checklist (pilot-ready)
**Must-have before sending any SMS:**
1. **Explicit opt-in language at the form/ad** (see copy/paste below) including: automated texts, msg/data rates, frequency, STOP/HELP, and links to Privacy/Terms.
2. **Consent logging** stored per lead (schema below).
3. **STOP/UNSUBSCRIBE handling**: immediate confirmation + global suppression.
4. **HELP handling**: returns identity + instructions + support email.
5. **Quiet hours**: do not send outside configured local hours; defer instead.
6. **Content rules**: no misleading claims, no excessive links, no “free!!!/act now” spam patterns.
7. **Identity**: first message must identify the business + why texting.

**Nice-to-have (as volumes scale):**
- A2P 10DLC registration (US long code) or Toll-Free verification; Twilio Messaging Service; ongoing delivery monitoring.

## 2) Copy/paste opt-in language (by lead source)
### 2.1 Webflow / website form checkbox (recommended)
**Checkbox label (unchecked by default):**
“I agree to receive automated text messages from **[BUSINESS NAME]** about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: **[TERMS_URL]** Privacy: **[PRIVACY_URL]**.”

**Helper note (below checkbox):**
“By submitting, you confirm you are the owner/authorized user of this phone number.”

**Implementation notes:**
- Store checkbox value + timestamp.
- If unchecked, do **not** text.

### 2.2 Typeform (consent statement)
Add a required “Statement” or “Legal” block:
“By providing your phone number, you consent to receive automated text messages from **[BUSINESS NAME]** regarding your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: **[TERMS_URL]** Privacy: **[PRIVACY_URL]**.”

### 2.3 Meta / Facebook Lead Ads (primary text + privacy policy)
**Lead form disclaimer / custom disclaimer field (preferred):**
“By submitting, you agree to receive automated text messages from **[BUSINESS NAME]** about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: **[TERMS_URL]** Privacy: **[PRIVACY_URL]**.”

**Ad primary text (short):**
“Get a fast reply by text from **[BUSINESS NAME]**. By submitting your number, you agree to receive automated texts (STOP to opt out).”

### 2.4 If collecting phone via phone-call intake (verbal opt-in)
Agent script:
“Can I text you updates and a couple quick questions about your request? Automated texts, msg/data rates may apply. You can reply STOP anytime to opt out.”
Log: `consent_source=verbal` + `agent_id`.

## 3) Message templates (compliant + deliverability-friendly)
### 3.1 First message (immediate)
“Hi {{first_name}} — this is {{business_name}}. You requested info about {{service}}. I can help quickly. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

### 3.2 Qualification follow-up (keep short)
“Thanks. What’s the main issue: (1) repair (2) replace (3) quote (4) other?”

### 3.3 Booking prompt
“Got it. Want to book a quick call or onsite estimate? Reply 1 for call, 2 for onsite, 3 for just a quote by text.”

### 3.4 Confirmation
“You’re set for {{appointment_time_local}}. Reply RESCHEDULE to change. Reply STOP to opt out.”

### 3.5 Missed-call textback (if enabled)
“Hi — we missed your call at {{business_name}}. What can we help with? Reply STOP to opt out.”

### 3.6 Re-engagement (only if recent opt-in; avoid spam)
“Hi {{first_name}} — checking in on your {{service}} request. Still need help? Reply YES or NO. STOP to opt out.”

**Content guidelines (to reduce filtering):**
- Avoid URL shorteners; if linking, use your branded domain.
- Keep to 1 link max in early flow; prefer no links until trust established.
- Avoid ALL CAPS, repeated punctuation, “FREE!!!”, “act now”, “guaranteed approval”, etc.

## 4) STOP / HELP handling (implementation spec)
### 4.1 Keywords (normalize: trim, lowercase, remove punctuation)
**STOP intents:** `stop, unsubscribe, cancel, end, quit, opt out, optout, stopall`
**HELP intents:** `help, info, information, support`
**START/UNSTOP intents (optional):** `start, unstop, resume`

### 4.2 State machine
- `subscribed` (default when consent captured)
- `unsubscribed` (after STOP)

**On inbound STOP-intent:**
1. Set `subscription_status=unsubscribed` for that E.164 phone **globally** (across all clients/tenants unless you maintain separate legal entities; safest default is global suppression).
2. Create audit log event `opt_out` with original message body + timestamp.
3. Send **one** confirmation message:
   “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4. Block all future outbound messages to that phone unless they explicitly `START` (if supported) AND you log resubscribe consent.

**On inbound HELP-intent:**
- Do not change subscription status.
- Send:
  “{{business_name}} texting about your request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

**On inbound START/UNSTOP (optional):**
- Only resubscribe if you can associate a prior consent record or capture a fresh consent event.
- Send:
  “You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”

### 4.3 Error handling
- If user is `unsubscribed`, outbound send attempts must be **blocked** and logged: `blocked_unsubscribed`.
- If inbound message is empty or unknown, proceed with normal AI flow only if `subscribed` and within quiet hours.

### 4.4 Required audit logs (minimum)
For each phone number:
- `consent_captured` (source, IP/URL if web, timestamp)
- `message_sent` (template_id, body, timestamp, provider SID)
- `message_received` (body, timestamp, provider SID)
- `opt_out` (timestamp, keyword matched)
- `help_requested` (timestamp)
- `blocked_unsubscribed` (timestamp, attempted template)

## 5) Quiet hours by timezone (implementation spec)
### 5.1 Policy (default pilot setting)
- Default allowed window: **08:00–20:00 local time** (lead’s timezone).
- Outside window: **defer** message until next allowed start.
- Exception: if lead initiated inbound message, you may respond once with a minimal acknowledgment and schedule the rest at start of window.

### 5.2 Timezone resolution order
1. If lead record has `timezone` (IANA like `America/Chicago`), use it.
2. Else if `postal_code` available, map ZIP→timezone.
3. Else infer from phone number country/area code (coarse; log as `tz_inferred_low_confidence`).
4. Else fall back to business default timezone (configured per client).

Log fields: `timezone_used`, `timezone_source`, `quiet_hours_deferred=true/false`.

### 5.3 Deferral queue behavior
When outside allowed window:
- Create a scheduled job with `send_at = next_allowed_time_local` converted to UTC.
- Ensure idempotency: same template + phone + lead_id within 5 minutes should not create duplicate jobs.
- If lead replies before send_at, cancel pending scheduled messages and continue conversationally (within allowed window rules).

### 5.4 Overrides
- Client admin may set: `allowed_start`, `allowed_end`, and `days_of_week`.
- Emergency override should be OFF by default; if enabled, log `quiet_hours_override=true` with reason.

## 6) Consent logging schema (dispute-ready)
Minimum fields to store per consent event:
- `lead_id`
- `phone_e164`
- `consent_status` (true/false)
- `consent_timestamp_utc`
- `consent_source` (webflow/typeform/meta/verbal/import)
- `consent_text_snapshot` (the exact disclosure shown)
- `form_url` or `ad_id` (if available)
- `ip_address` (web)
- `user_agent` (web)
- `business_name` / `client_id`
- `initial_message_template_id`

Retention: store **at least 4 years** (TCPA litigation windows vary; longer is safer if storage is cheap).
Export: be able to export all events for a phone number/date range to CSV.

## 7) Twilio deliverability runbook (zero-spend steps first)
### 7.1 Messaging Service (recommended)
- Create a Twilio Messaging Service per client (or per region).
- Enable: Sticky Sender (for conversation continuity), Smart Encoding, and status callbacks.
- Attach numbers to the service (10DLC long codes or Toll-Free).

### 7.2 10DLC vs Toll-Free decision (pilots)
- **Low volume / mixed geography:** Toll-Free can be simpler (but verification may be needed for higher deliverability).
- **Local presence + scaling:** 10DLC long code with A2P registration is the long-term default.

### 7.3 A2P 10DLC registration (as needed)
Prereqs:
- Business/brand identity, website, and compliant opt-in language.
- Campaign description must match actual use (lead response + scheduling), include STOP/HELP.

Do not proceed with paid steps without approval if Twilio prompts fees.

### 7.4 Fallback behaviors
- If message fails with filtering/carrier error: retry once with simplified body (no link), then stop.
- If undelivered repeatedly: switch to alternate number pool (within same Messaging Service) and flag for review.
- For landlines: detect and fallback to email or voice task.

### 7.5 Monitoring
Track per client:
- Delivery rate, error codes, opt-out rate, spam/complaint indicators (if available), and time-to-first-response.

## 8) Verification test matrix (sign-off)
**STOP tests:**
1. Send “STOP” → confirmation sent once; status becomes unsubscribed; outbound blocked.
2. Send “stop.” (punctuation) → same as above.
3. Send “unsubscribe” → same.
4. After STOP, attempt outbound qualification → must be blocked + logged.

**HELP tests:**
1. Send “HELP” → receives identity + STOP/HELP + support email + proof URL.

**Quiet hours tests:**
1. Trigger lead at 22:00 local → message deferred; scheduled job created; nothing sent immediately.
2. At 08:00 local → deferred message sends; log shows deferral.

**Consent logging tests:**
1. Webflow/Typeform/Meta webhook includes consent fields → stored with snapshot of disclosure.

Evidence to capture (for pilots): status callback logs, suppression list entry, and 2–3 example records exported as CSV.

---
If you want, provide your intended Terms/Privacy page URLs and default business timezone per pilot client; I’ll update the opt-in snippets so they’re immediately paste-ready with real links.