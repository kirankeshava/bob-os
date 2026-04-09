# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Agency Copy/Paste + Build Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:00:07.999Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance Email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)
**On every lead capture surface (form/ad):**
1. Clear disclosure that the consumer will receive **SMS texts**.
2. **Consent checkbox** (recommended where possible) + statement: “By submitting, you agree to receive SMS… Consent not required to purchase.”
3. Disclose **msg frequency** (e.g., “Up to 6 messages per month” or “Msg frequency varies”).
4. Disclose **STOP/HELP** instructions.
5. Disclose **Message & data rates may apply**.
6. Provide links/URLs to **Terms** + **Privacy** (publish these ASAP; don’t leave placeholders in production).
7. Record **consent proof** (timestamp, source URL, IP, form fields, checkbox state).

**In the SMS program behavior:**
8. Implement **STOP/UNSUBSCRIBE** suppression immediately and globally.
9. Implement **HELP** response.
10. Implement **quiet hours** (local to recipient) with deferral.
11. Avoid prohibited/regulated content for pilots unless explicitly reviewed (e.g., debt relief, gambling, firearms, adult).

## 2) Copy/Paste Opt-In Snippets (Webflow / Typeform / Meta Lead Ads)

### A) Webflow (form under the phone field + checkbox)
**Checkbox label:**
> I agree to receive text messages from [BUSINESS NAME] about my request.

**Disclosure text (small print):**
> By submitting this form, you consent to receive SMS messages from [BUSINESS NAME] via Local Lead Response Copilot at the phone number provided, including automated texts for appointment scheduling and service updates. Consent is not a condition of purchase. Msg frequency varies (typically 1–6/month). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL]. Privacy: [PRIVACY_URL]. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Implementation note:** store checkbox boolean + timestamp; do not send SMS if unchecked.

### B) Typeform (description under phone question)
> By providing your number, you agree to receive SMS from [BUSINESS NAME] via Local Lead Response Copilot related to your request (appointment scheduling + updates). Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL]. Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to

**Implementation note:** Typeform should include a required “Yes, I agree” field; map it into the webhook payload.

### C) Meta/Facebook Lead Ads (privacy policy + custom disclaimer)
**Add to ‘Custom disclaimer’ (or lead form context):**
> By submitting, you consent to receive text messages from [BUSINESS NAME] via Local Lead Response Copilot about your inquiry (automated messages may be used). Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL]. Privacy: [PRIVACY_URL].

**Meta requirement:** set the **Privacy Policy URL** to your published privacy page when available.

## 3) Message Templates (Carrier-Friendly, Non-Spammy)

### First message (immediate)
> Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. Got your request for {{service}}. Are you looking for service at {{address_or_city}}? Reply 1) Yes 2) Not sure

### Qualification (short, high intent)
> Thanks—when would you like us to come out? Reply 1) ASAP 2) This week 3) Just pricing

### Booking (lightweight)
> Great. What time works best? Reply 1) Morning 2) Afternoon 3) Evening

### Confirmation
> Confirmed: {{appt_day}} {{appt_window}}. If you need to reschedule, reply RESCHEDULE. Reply STOP to opt out.

### Missed-call textback (if used)
> Sorry we missed you—this is {{business_name}}. Want to book a quick call or appointment? Reply 1) Call me 2) Book a visit

### Re-engagement (only to previously-consented leads; low frequency)
> Hi {{first_name}}—checking in. Do you still need help with {{service}}? Reply 1) Yes 2) No. Reply STOP to opt out.

**Content guardrails:**
- Avoid “free”, “guaranteed”, excessive punctuation, ALL CAPS, repeated links.
- Keep links minimal; prefer branded domains when possible.
- Identify business early (“it’s {{business_name}}”).

## 4) STOP / HELP / START Handling (Implementation Spec)

### 4.1 Keywords (case-insensitive; trim whitespace; ignore punctuation)
- **STOP intents:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP intents:** HELP, INFO, SUPPORT
- **START intents (re-subscribe):** START, UNSTOP, SUBSCRIBE

### 4.2 State machine
- Default state: `subscribed`
- If inbound matches STOP intent:
  - Set `subscription_state = unsubscribed`
  - Add number to **global suppression list** scoped to the client’s account (and optionally platform-wide if required)
  - Immediately reply once:
    > You’re opted out from {{business_name}} texts. No more messages will be sent. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to
- If inbound matches HELP intent (regardless of state):
  - Reply:
    > {{business_name}} SMS help: replies schedule/confirm appointments. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- If inbound matches START intent and prior state = unsubscribed:
  - Set `subscription_state = subscribed`
  - Remove from suppression list
  - Reply:
    > You’re re-subscribed to {{business_name}} texts. Reply STOP to opt out.

### 4.3 Enforcement
- **Hard block** all outbound messages to `unsubscribed` recipients.
- Log a blocked send attempt with reason `suppressed_stop`.

### 4.4 Required audit logs (minimum fields)
- `event_type` (inbound_message | outbound_message | suppression_add | suppression_remove | outbound_blocked)
- `timestamp_utc`
- `from_number`, `to_number`
- `message_body` (or hashed if needed)
- `matched_intent` (stop/help/start/none)
- `subscription_state_before`, `subscription_state_after`
- `lead_source` (webflow/typeform/meta/etc.)
- `consent_record_id`

## 5) Quiet Hours by Timezone (Implementation Spec)

### 5.1 Goal
Avoid sending outbound messages during local quiet hours (recommended: **9pm–8am** recipient local time). Defer messages and send at next allowed time.

### 5.2 Timezone resolution order (deterministic)
1. Lead-provided `timezone` if explicitly captured.
2. Location-based timezone from `lead_zip` or `lead_city/state` (geo lookup).
3. Phone-number timezone approximation from area code (fallback; imperfect).
4. Default account timezone.

### 5.3 Sending rule
- Define `allowed_window_start = 08:00` and `allowed_window_end = 21:00` local time.
- If `now_local` is within window: send immediately.
- If outside window:
  - Create a deferred job with `send_at = next_allowed_time` (08:00 next day if after 21:00; 08:00 same day if before 08:00).
  - Store `defer_reason = quiet_hours`.

### 5.4 Overrides
- Allow account-level override for emergencies only (default OFF).
- Never override STOP suppression.

### 5.5 Logging
Log timezone chosen, source used (explicit/location/area-code/default), and whether message was deferred.

## 6) Consent Logging (Dispute-Ready Schema)
Store per lead:
- `consent_status` (granted/denied)
- `consent_timestamp_utc`
- `consent_text_shown` (exact disclosure string or version id)
- `checkbox_value` (true/false + field name)
- `source` (webflow/typeform/meta/zapier/make)
- `landing_page_url` / `form_url`
- `ip_address` (if available)
- `user_agent` (if available)
- `lead_payload_snapshot` (redacted as needed)
- `proof_url` stored = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Retention: minimum 24 months recommended (align to risk tolerance); export CSV/JSON for disputes.

## 7) Twilio Deliverability Setup (No-Spend Steps First)
1. Use a **Messaging Service** (not ad-hoc numbers) so Twilio can manage sender selection and throughput.
2. Enable **Sticky Sender** (keeps conversation from same number).
3. Add **Advanced Opt-Out** / ensure your own STOP logic remains consistent (don’t double-send contradictory replies).
4. Choose route:
   - **Low volume / quick pilots:** Toll-free can work; verify toll-free if needed.
   - **Scaled local lead gen:** A2P 10DLC recommended; register Brand + Campaign when moving beyond pilots.
5. Content guidelines:
   - Keep first message short, identify business, ask 1 question.
   - Avoid link in first message when possible.
   - Don’t send repeated follow-ups; cap retries (e.g., 2 follow-ups over 48 hours).

## 8) Agency Handoff: “Copy/Paste + Hook It Up”
**What agency does today:**
1. Paste the opt-in snippet into form/ad.
2. Ensure webhook/Zapier/Make sends fields: first_name, phone, service, location, consent=true, source, form_url.
3. Confirm STOP/HELP works using the test plan below.

### STOP/HELP Test Matrix (must pass before go-live)
- Send inbound: STOP → verify immediate opt-out reply + outbound blocked.
- Send inbound: HELP → verify help info reply.
- After STOP, attempt outbound → must be blocked + logged.
- Send inbound: START → verify re-subscribe reply + outbound allowed.

For issues/support: agent_bob_replit+lead-copilot@agentmail.to
