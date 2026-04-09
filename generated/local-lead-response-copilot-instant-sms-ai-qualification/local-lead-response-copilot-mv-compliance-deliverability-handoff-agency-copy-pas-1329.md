# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste Pack + STOP/HELP + Quiet Hours + Consent Logging)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:02:19.454Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Handoff
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support email (required in disclosures): agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)
**Opt-in required** before any SMS marketing/promotional messages. For speed-to-lead “conversational” follow-up to an inbound inquiry, still include clear disclosure at point of capture.
- [ ] Clear affirmative consent at form/ad submission (checkbox or explicit statement). 
- [ ] Disclosures at capture: **brand/name**, **automated texts**, **msg frequency**, **Msg&Data rates may apply**, **STOP to cancel**, **HELP for help**, **consent not a condition of purchase**, and links to **Privacy/Terms** (or at least the proof URL + support email until final pages are published).
- [ ] **STOP handling**: immediate confirmation, global suppression list, and hard-block any future outbound except compliance confirmations.
- [ ] **HELP handling**: provide support email + basic instructions.
- [ ] **Quiet hours**: do not send outside permitted local hours; defer.
- [ ] **Consent logging** retained and exportable for disputes.

## 2) Copy/Paste Opt-in Language (Use As-Is)
### 2.1 Webflow / Website Form (recommended: checkbox)
**Checkbox label (unchecked by default):**
“I agree to receive automated text messages from {BUSINESS NAME} about my request. Message frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. Privacy/Terms: {PRIVACY_URL} / {TERMS_URL} (or see: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4).”

**Form footer (small text, optional but recommended):**
“Questions? agent_bob_replit+lead-copilot@agentmail.to”

### 2.2 Typeform (statement + required yes/no)
**Statement block:**
“By submitting, you agree {BUSINESS NAME} may contact you via automated text messages about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. Privacy/Terms: {PRIVACY_URL}/{TERMS_URL} (or see proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4). Support: agent_bob_replit+lead-copilot@agentmail.to”

**Required question (Yes/No):**
“Do you agree to receive text messages from {BUSINESS NAME} about your request?”
- Yes (required)
- No (if No, do not text; route to email only)

### 2.3 Meta/Facebook Lead Ads (instant form custom disclaimer)
**Custom disclaimer:**
“By tapping Submit, you agree to receive automated text messages from {BUSINESS NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. Privacy/Terms: {PRIVACY_URL}/{TERMS_URL} (or see proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4). Support: agent_bob_replit+lead-copilot@agentmail.to”

## 3) First Message Templates (Carrier-Friendly)
### 3.1 First response to new lead (speed-to-lead)
“Hi {first_name}—this is {agent_name} with {BUSINESS NAME}. Thanks for requesting {service}. What’s the address/ZIP for the job?”

### 3.2 Consent/Compliance reinforcement (use if capture disclosures were weak)
“FYI: You’re receiving texts from {BUSINESS NAME} about your request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to”

### 3.3 Booking offer
“Got it. What day works best for a quick call or estimate—today or tomorrow?”

**Content guidelines:** avoid ALL CAPS, excessive punctuation, repeated links, URL shorteners, “free/guaranteed/act now”, and affiliate-style language. Prefer 0–1 link total and only to your own domain.

## 4) STOP / HELP Handling — Implementation Spec (Verified Behavior)
### 4.1 Keyword normalization
Normalize inbound body:
- trim whitespace, lower-case
- remove punctuation except internal characters
- collapse multiple spaces

### 4.2 STOP keywords (treat as opt-out)
Match exact or contains-only command tokens: `stop, unsubscribe, cancel, end, quit, revoke, opt out, opt-out`.

**On STOP:**
1) Create/Update suppression record (global, per-tenant):
- `suppressed = true`, `suppressed_at`, `suppression_reason = 'user_stop'`, `source_message_sid`, `channel='sms'`
2) Send single confirmation (required):
“{BUSINESS NAME}: You’re opted out and will no longer receive texts. Reply START to resubscribe. Support: agent_bob_replit+lead-copilot@agentmail.to”
3) Block all future outbound to that E.164 except:
- STOP confirmation (immediate)
- START confirmation (if user opts back in)

### 4.3 HELP keywords
`help, info, support`

**On HELP:** respond (do not change suppression state):
“{BUSINESS NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### 4.4 START keywords (optional resubscribe)
`start, unstop, resubscribe`
Only allow if there is prior consent record OR the user is re-initiating a request.

**On START:**
“{BUSINESS NAME}: You’re resubscribed. Msg frequency varies. Reply STOP to opt out, HELP for help.”

### 4.5 Required audit log events
Log events with timestamps and message SIDs:
- `inbound_received`
- `stop_detected` / `help_detected` / `start_detected`
- `suppression_added` / `suppression_removed`
- `outbound_blocked_due_to_suppression`
- `outbound_sent`

## 5) Quiet Hours by Timezone — Algorithm Spec
**Goal:** Don’t text at night in the lead’s local time; defer instead.

### 5.1 Allowed window (default)
- Allowed: **08:00–20:00** lead-local time (configurable per tenant)
- Outside window: enqueue for next allowed start

### 5.2 Timezone resolution order
1) Lead provided ZIP/state/city → map to timezone
2) Phone number area code lookup (fallback)
3) Tenant default timezone

Store: `lead_timezone`, `timezone_source`.

### 5.3 Deferral behavior
If now is outside allowed window:
- Create `deferred_send` job with:
  - `scheduled_for = next_allowed_start_local converted to UTC`
  - `reason = 'quiet_hours'`
- Do **not** send any message until scheduled time.

### 5.4 Edge cases
- Daylight savings: rely on IANA tz database.
- Multiple pending deferred messages: coalesce (send only the most recent “next step” message).
- Owner override: allow manual send if user explicitly requests immediate contact; log `quiet_hours_override=true`.

## 6) Consent Logging Schema (Dispute-Ready)
Minimum fields:
- `lead_id`, `phone_e164`, `consented=true/false`, `consent_timestamp_utc`
- `consent_source` (webflow/typeform/meta/manual)
- `consent_text_shown` (exact string or version id)
- `form_url` (or ad form id)
- `ip_address` (if available)
- `user_agent` (if available)
- `landing_page` / `referrer`
- `privacy_url` and `terms_url` shown at capture
Retention: **at least 4 years** recommended for TCPA dispute handling.

## 7) Twilio Deliverability (Minimum Viable Guidance)
- Use a **Messaging Service** (do not send ad-hoc from random numbers).
- Maintain consistent brand identity in messages.
- Avoid URL shorteners; use branded domain links.
- Keep messages conversational, short, and directly tied to the user’s request.
- Monitor error codes and opt-out rates; pause campaigns if complaints rise.

### A2P 10DLC decision (high level)
- If using long codes for US application-to-person texting at scale: plan for A2P 10DLC brand/campaign registration.
- If low volume or special cases: evaluate toll-free verification.
(Registration may involve fees—do not spend without owner approval.)

## 8) Verification Test Matrix (Run Before Pilots)
1) New lead opt-in → first message delivered.
2) User replies “STOP” → confirmation sent + suppression created.
3) After STOP, system attempts outbound → blocked + logged `outbound_blocked_due_to_suppression`.
4) User replies “HELP” → support response sent.
5) Quiet hours test (set lead timezone): message deferred; sends at next allowed time.
6) Export consent record for the test lead (fields populated).

## 9) Agency Handoff: Quick Implementation Steps
1) Add the relevant opt-in snippet to the capture source (Webflow/Typeform/Meta).
2) Ensure phone number is captured in E.164 format if possible.
3) Pass to webhook/Zapier/Make with fields: first_name, phone, service, zip/address, consent=true, consent_source, consent_timestamp.
4) Configure STOP/HELP handling on inbound messages and enforce suppression globally.
5) Enable quiet hours by timezone with deferral.
6) Use support email in HELP and disclosures: agent_bob_replit+lead-copilot@agentmail.to.

If you need to validate legitimacy for a client, provide the proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
