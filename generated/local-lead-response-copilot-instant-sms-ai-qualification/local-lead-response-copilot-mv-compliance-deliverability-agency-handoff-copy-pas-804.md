# Local Lead Response Copilot — MV Compliance + Deliverability Agency Handoff (Copy/Paste + Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:33:19.330Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Agency Handoff
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable SMS Disclosures (use everywhere)
**Required disclosure line (forms + landing pages):**
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Required links (recommended):**
“Terms: [TERMS URL] • Privacy: [PRIVACY URL]”

**First SMS (must include STOP/HELP at least once):**
“Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. Thanks for reaching out about {{service}}. Are you looking to book an appointment today or this week? Reply STOP to opt out, HELP for help.”

**Help message (inbound HELP response):**
“{{business_name}}: Help info. We text about your service request and scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

## 2) Copy/Paste Opt-in Snippets by Lead Source
### A) Webflow / Website Forms
**Checkbox label (unchecked by default; recommended):**
“Text me updates about my request (recommended)”

**Checkbox disclosure (small text under checkbox):**
“By checking this box, you agree to receive text messages from {{business_name}} about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {{terms_url}} Privacy: {{privacy_url}}.”

**If no checkbox is possible (fallback):**
Include the disclosure directly above the submit button and ensure it’s visible without scrolling.

### B) Typeform
**Add a Statement block above Submit:**
“By submitting, you consent to receive text messages from {{business_name}} regarding your request and appointment scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {{terms_url}} Privacy: {{privacy_url}}.”

**Recommended:** Add a required Yes/No question: “Do you agree to receive text messages about your request?” Default blank; only proceed if Yes.

### C) Meta / Facebook Lead Ads
**Lead form disclaimer (custom disclaimer text):**
“By submitting this form, you consent to receive SMS from {{business_name}} about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {{terms_url}} Privacy: {{privacy_url}}.”

**Important:** Ensure the ad and lead form reflect the same business name as the SMS sender identity.

## 3) STOP/HELP Handling — Implementation Spec (Code-Ready)
### Keywords (case-insensitive; trim whitespace; ignore punctuation)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP set:** HELP, INFO, SUPPORT

### State machine
- If inbound matches STOP set:
  1) Mark recipient as `sms_opt_out = true` (global suppression for the specific business/account).
  2) Store `opt_out_timestamp`, `opt_out_source = inbound_keyword`, `opt_out_message_sid`.
  3) Send ONE confirmation message (no marketing):
     “You’re opted out of texts from {{business_name}}. No more messages will be sent. Reply START to re-subscribe.”
  4) Block all future outbound SMS to this number for this account (except START confirmation flow).

- If inbound matches HELP set:
  1) Do not change opt-in status.
  2) Send HELP message (see Section 1).

- If inbound matches START/UNSTOP (optional resubscribe):
  1) Only allow if you have an auditable prior opt-in OR you capture a new explicit opt-in.
  2) Mark `sms_opt_out=false`; log resubscribe event.
  3) Send: “You’re re-subscribed to texts from {{business_name}}. Msg frequency varies. Reply STOP to opt out.”

### Required logs (per inbound message)
Log event object:
- `event_type`: inbound_message
- `from_number`, `to_number`
- `message_body_raw`, `message_body_normalized`
- `matched_keyword`: STOP|HELP|OTHER
- `action_taken`: opt_out|help|none
- `timestamp_utc`
- `provider`: twilio
- `provider_message_sid`

### Enforcement
Before sending any outbound message:
- Check suppression list for `to_number` + `account_id`.
- If suppressed: do not send; log `outbound_blocked_opt_out` with reason.

## 4) Quiet Hours by Timezone — Implementation Spec
### Goal
Do not send automated outbound SMS during user-local quiet hours (default: 9pm–8am), while still capturing lead instantly and scheduling the next allowed send.

### Inputs
- Lead phone number (E.164)
- Lead location hints (optional): zip, state, city, IP-derived timezone, form locale
- Business/account settings:
  - `quiet_hours_enabled` (default true)
  - `quiet_start_local` (default 21:00)
  - `quiet_end_local` (default 08:00)
  - `allowed_days` (default Mon–Sun)
  - `override_send_anytime` (default false; owner-only)

### Timezone resolution order
1) Explicit timezone captured on form (best)
2) IP-derived timezone from form submission
3) Zip/postal -> timezone mapping
4) Phone number area code -> timezone estimate
5) Default business timezone

Store `timezone_source` and `timezone_confidence`.

### Algorithm
- Compute `now_local` in resolved timezone.
- If `override_send_anytime=true`: send immediately.
- Else if `now_local` is within quiet window:
  - Do not send.
  - Create a scheduled job `deferred_sms_send_at_utc` for the next allowed time (quiet_end_local on the next valid day).
  - Log: `outbound_deferred_quiet_hours` including computed send time and timezone.
- Else: send immediately.

### Edge cases
- If timezone confidence is low, be conservative: defer if within 8pm–9am in business timezone.
- If lead explicitly requests “call/text me now” (captured field), allow override only if local time is not legally restricted by your policy; still log justification.

## 5) Consent Logging + Audit Export (Dispute-Ready)
### Minimum fields to store per lead
- `lead_id`, `account_id`
- `phone_e164`
- `consent_status`: opted_in|opted_out|unknown
- `consent_timestamp_utc`
- `consent_source`: webflow|typeform|meta|manual
- `consent_text_shown` (exact disclosure string version)
- `consent_checkbox_value` (true/false if applicable)
- `form_url` (or lead ad id)
- `ip_address` (if available)
- `user_agent` (if available)
- `timezone_resolved`, `timezone_source`

### Retention
Keep consent + message logs at least 24 months (preferred) or the longest period your customers need for disputes.

### Export
Provide CSV export with:
- Consent record
- Full message timeline (inbound/outbound)
- STOP/HELP events and suppression status

## 6) Twilio Deliverability — MV Setup & Guardrails
### A) Messaging Service
- Use a Twilio Messaging Service (even for 1 number) to centralize:
  - Sticky sender
  - Opt-out management integration (still enforce in app)
  - Status callbacks

### B) 10DLC vs Toll-Free (pilot rule of thumb)
- **Low volume pilot (e.g., < 1,000 msgs/day, local/home services):** 10DLC local number is typical, but A2P registration may be required depending on Twilio/carriers.
- **If filtering/blocked occurs or you need higher trust quickly:** consider Toll-Free verification.

### C) Content guidelines (reduce spam flags)
- Avoid all-caps, excessive punctuation, “FREE!!!”, “CLICK NOW”, “LIMITED TIME”.
- Keep links minimal; prefer branded domains when possible.
- Keep first message contextual: reference their request (service/city) and identify the business.
- Do not include unrelated marketing unless separately opted-in.

### D) Fallback behaviors
- If outbound fails with carrier filtering/error:
  - Retry once after 2–5 minutes.
  - If fails again, mark lead as “SMS unreachable” and trigger email/call task.
  - Log provider error code and message SID.

## 7) Agency Implementation Checklist (No-Code Friendly)
1) Add opt-in disclosure to form (Webflow/Typeform) or Lead Ad disclaimer (Meta).
2) Ensure lead payload includes: name, phone, service, city/zip, preferred time.
3) Connect webhook/Zapier/Make to Local Lead Response Copilot endpoint.
4) Map fields exactly; store consent text version used.
5) Verify STOP/HELP:
   - Send STOP from test phone → receive opt-out confirmation → future outbound blocked.
   - Send HELP → receive help info with support email agent_bob_replit+lead-copilot@agentmail.to and proof URL.
6) Verify quiet hours: simulate a lead during quiet window → message deferred and sent at next allowed time.

## 8) Verification Test Matrix (What to screenshot/log)
- Inbound STOP: raw message, normalization, suppression set, confirmation sent.
- Outbound attempt after STOP: blocked + reason logged.
- Inbound HELP: help response sent.
- Quiet-hours deferral: computed timezone, scheduled send time, actual send.

If you need implementation help, email agent_bob_replit+lead-copilot@agentmail.to and include your form type (Webflow/Typeform/Meta), your business name, and your intended sending route (10DLC vs toll-free).