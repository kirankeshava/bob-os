# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:18:21.015Z

---

## 0) What this is (send to agencies)
This pack lets you launch Local Lead Response Copilot for a local business with “minimum viable compliant” SMS practices (TCPA/CTIA-aligned) and deliverability hardening. It includes:
- Copy/paste opt-in language for Webflow, Typeform, and Meta/Facebook Lead Ads
- Compliant first-message + AI qualification + booking templates
- STOP/HELP handling rules (code-ready)
- Quiet hours by timezone spec (code-ready)
- Consent logging schema (audit-ready)
- Twilio setup checklist (Messaging Service + A2P/10DLC decisioning)

Proof/legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Non-negotiables (MV compliant)
1) You must capture *express written consent* before sending marketing/qualification SMS.
2) Every SMS flow must support STOP to opt out and HELP for support info.
3) Honor quiet hours by the lead’s local timezone (or defer until allowed).
4) Log consent + message events so the business can respond to disputes.

---

## 2) Copy/paste opt-in snippets
### 2.1 Webflow / Website form checkbox (recommended)
**Checkbox label (unchecked by default):**
“I agree to receive text messages from [BUSINESS NAME] about my request, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

**Under form microcopy (small):**
“By submitting, you confirm you are the account holder for the number provided. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Hidden fields to include if possible:**
- sms_consent_checked = true/false
- sms_consent_text = (store the exact checkbox text)
- sms_consent_timestamp = (ISO time)
- page_url
- ip_address (if available)

### 2.2 Typeform (statement + yes/no)
**Statement:**
“We can text you to respond faster and schedule your appointment.”

**Yes/No question:**
“Do you agree to receive texts from [BUSINESS NAME] regarding your request?”
- Yes (required to trigger SMS)
- No

**Below (description):**
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

### 2.3 Meta / Facebook Lead Ads (primary text + disclaimer)
**Ad creative primary text (short):**
“Request a quote and we’ll text you right away to confirm details and availability.”

**Lead form disclaimer (where available):**
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Important:** If the platform UI limits disclaimer length, keep at minimum: consent + msg rates + STOP/HELP + terms/privacy links.

---

## 3) Message templates (deliverability-safe)
Guidelines: keep messages short, avoid ALL CAPS, avoid spammy phrases (“FREE!!!”, “guaranteed”), limit links, and do not include large blocks of legal text in the SMS itself.

### 3.1 First message (immediate)
“Hi {first_name} — this is {biz_name}. Got your request for {service}. What’s the address (or ZIP) for the job?”

### 3.2 Qualification (2–4 questions max)
1) “What’s the best day/time for us to come by or call?”
2) “Is this for a home or business?”
3) “Any photos you can share? (Optional)”  (Only if MMS is enabled/expected)

### 3.3 Booking CTA (when ready)
“Thanks. We can get you on the schedule. Want to book a time now? Reply 1 for {slot_1}, 2 for {slot_2}, or tell me what works.”

### 3.4 Missed-call text-back (if used)
“Sorry we missed you — this is {biz_name}. What can we help with? Reply with the service you need and your ZIP.”

### 3.5 Re-engagement (one attempt, then stop)
“Hi {first_name} — checking in from {biz_name}. Still need help with {service}? Reply YES and we’ll get you scheduled.”

### 3.6 Required footer behavior
Do **not** append STOP/HELP to every message (can hurt deliverability). Include it:
- In the opt-in language, and
- In the first message *only if* required by your client’s counsel/policy, and
- Always in the HELP response, and
- In the STOP confirmation.

---

## 4) STOP / HELP handling (implementation rules)
### 4.1 Keywords to recognize (case-insensitive, trim punctuation)
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP, INFO

### 4.2 State machine
**If inbound matches STOP keyword:**
1) Mark recipient as opted_out=true (global suppression list for that business/account).
2) Immediately send confirmation (exactly once):
   “You’re opted out from {biz_name} texts. No more messages will be sent. Reply START to re-subscribe or email agent_bob_replit+lead-copilot@agentmail.to for help.”
3) Block all future outbound to that number for this business until explicit re-opt-in.

**If inbound matches HELP keyword:**
Reply:
“{biz_name} texting support: reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

**If inbound matches START/UNSTOP (optional re-subscribe):**
- Only re-enable if you can confirm prior consent (recommended: send “Reply YES to confirm” and log it). Otherwise require a fresh form submission.

### 4.3 Edge cases
- If a user sends STOP with extra text (“stop texting”): treat as STOP.
- If STOP received during an active AI flow: terminate the flow, suppress immediately.
- If outbound fails due to carrier block: do not retry repeatedly; degrade to email notify or internal alert.

---

## 5) Quiet hours by timezone (spec)
Goal: don’t send texts outside allowed local hours.

### 5.1 Default allowed window (suggested)
- 8:00 AM to 8:00 PM lead-local time, 7 days/week.

### 5.2 Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone
2) Lead-provided address/city/state → geocode → timezone
3) Phone number area code heuristic (fallback)
4) Account default timezone (last resort)

### 5.3 Algorithm
When an outbound message is ready:
- Determine tz using resolution order.
- Compute lead_local_time.
- If within allowed window: send immediately.
- If outside window: enqueue message with send_at = next allowed start time (e.g., 8:05 AM).
- Record deferral_reason=quiet_hours and scheduled_send_at.

### 5.4 Overrides
- “Owner override” flag can bypass quiet hours only for transactional messages (e.g., “tech arriving now”)—log override_actor and override_reason.

---

## 6) Consent logging (audit-ready)
Store these fields per lead:
- lead_id
- phone_e164
- consent_status: opted_in | opted_out | unknown
- consent_source: webflow | typeform | meta_lead_ads | manual
- consent_text (exact disclosure text shown)
- consent_timestamp_utc
- consent_page_url / form_id
- consent_ip (if available)
- user_agent (if available)
- opt_out_timestamp_utc (if any)
- opt_out_keyword (STOP, etc.)
- message_events (send/failed/delivered/inbound) with timestamps + Twilio message SID(s)

Retention: keep consent + message logs minimum 24 months (recommended) or per client counsel.

---

## 7) Twilio deliverability setup (agency runbook)
### 7.1 Messaging Service (recommended)
- Create a Messaging Service
- Enable: Sticky Sender (if using pool), Smart Encoding, Delivery Receipts
- Add the sending number(s) to the service
- Configure webhooks for:
  - Inbound messages (for STOP/HELP)
  - Status callbacks (delivery, failed, etc.)

### 7.2 A2P 10DLC vs Toll-Free decision (pilots)
- If US long code (10DLC) and you send more than minimal traffic or multiple brands → register A2P brand + campaign.
- If you need faster approval and simpler setup for a single business → consider Toll-Free verification.
- Short code is overkill for pilots.

### 7.3 Content guidelines to reduce filtering
- Avoid link shorteners; use the business domain when possible.
- Keep first message conversational and context-specific (“Got your request for {service}”).
- Don’t send repeated identical messages at high volume.
- Avoid “urgent”, “act now”, heavy punctuation, and aggressive promos.

### 7.4 Fallback behaviors
If SMS fails (undelivered/blocked):
- Notify internal channel (email/Slack) with lead_id + reason
- Optionally switch to email follow-up if email exists
- Do not hammer retries (max 1 retry after 5–10 minutes)

---

## 8) Verification checklist (before go-live)
### 8.1 STOP test matrix (must pass)
1) Lead opts in via form → receives first SMS
2) Reply “STOP” → receives opt-out confirmation
3) System attempts to send next step → must be blocked (log event: outbound_blocked_opted_out)
4) Reply “HELP” after opt-out → must still receive HELP info

### 8.2 HELP test matrix
- Reply “HELP” at any point → immediate support message including email agent_bob_replit+lead-copilot@agentmail.to and proof URL.

### 8.3 Quiet hours test matrix
- Create lead in timezone where it’s outside window → message should schedule (not send)
- At allowed start time → message sends automatically

### 8.4 Required log evidence (save screenshots/exports)
- Consent record showing consent_text + timestamp + source
- Twilio message SID for first outbound + delivery status
- STOP inbound record + suppression flag
- Blocked outbound attempt record after STOP

---

## 9) Agency handoff: how to deploy in 30 minutes
1) Add opt-in checkbox/disclaimer to the client form (use Section 2).
2) Ensure webhook/Zapier/Make only triggers SMS if consent == true.
3) Connect Twilio Messaging Service + inbound webhook for STOP/HELP.
4) Set quiet hours window and enable timezone resolution.
5) Run Verification checklist (Section 8) and store evidence.

Support: agent_bob_replit+lead-copilot@agentmail.to
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4