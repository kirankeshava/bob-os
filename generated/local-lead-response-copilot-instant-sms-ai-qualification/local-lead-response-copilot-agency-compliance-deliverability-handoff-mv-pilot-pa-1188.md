# Local Lead Response Copilot — Agency Compliance + Deliverability Handoff (MV Pilot Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:43:07.974Z

---

## 0) Business identity (use in all disclosures)
**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support:** agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Minimum-viable compliance checklist (pilot-ready)
Use this as a go/no-go list before launching any client.

### Required (do not skip)
1) **Express written consent language** on every lead source (form/ad) that can trigger SMS.
2) **Clear disclosure**: “Msg & data rates may apply”, “Msg frequency varies”, “Reply STOP to cancel, HELP for help”.
3) **No auto-SMS without opt-in**: any lead lacking consent must be routed to email/call-only.
4) **STOP/HELP implemented** (see Section 4) with **global suppression**.
5) **Quiet hours** enabled by lead’s local timezone (see Section 5).
6) **Consent logging** enabled (see Section 6) and exportable.

### Strongly recommended (improves deliverability)
7) Use **Twilio Messaging Service** + consistent sender.
8) Keep first message short, branded, and **match the opt-in context**.
9) Avoid URL shorteners and spammy phrasing (see Section 7).

---

## 2) Copy/paste opt-in language (by lead source)
These snippets are designed to be pasted into forms/ads. Replace bracketed fields.

### 2.1 Webflow form checkbox (recommended)
**Checkbox label:**
“I agree to receive text messages about my request from [Business Name] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. View Terms & Privacy: [TERMS_URL] | [PRIVACY_URL].”

**Validation rule:** required checkbox for SMS follow-up.

**Hidden fields to store (if possible):**
- sms_consent = true
- sms_consent_timestamp = {{now}}
- sms_consent_source = “webflow_form”
- landing_page_url

### 2.2 Typeform (legal text + checkbox)
**Typeform Yes/No question (required):**
“Can we text you about your request?” Yes / No

**Typeform ‘Legal’ text shown near the question:**
“By selecting Yes, you agree to receive text messages from [Business Name] via Local Lead Response Copilot about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**If No:** do not send SMS; route to email/call-only.

### 2.3 Meta/Facebook Lead Ads (disclosure text)
**Add to ‘Privacy Policy’ / ‘Custom disclaimer’ / description (where available):**
“By submitting, you agree to receive text messages from [Business Name] via Local Lead Response Copilot about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent not required for purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

**Operational note:** If Meta’s UI limits link fields, at minimum include support email and STOP/HELP language in the disclaimer and ensure your privacy policy page includes the SMS disclosure.

---

## 3) Message templates (deliverability-safe)
Principles: be brief, match the lead’s context, avoid hype/ALL CAPS, don’t lead with links.

### 3.1 First message (immediate)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job?”

### 3.2 Qualification (AI-driven, 2–4 questions max)
1) “When would you like this done? (Today/This week/Date)”
2) “Any photos or details you can share about the issue?”
3) “Best email for the quote/confirmation?”

### 3.3 Booking handoff (call or appointment)
“Thanks — we can get you on the schedule. Would you prefer a quick call now or an appointment window?”

If scheduling link is needed:
“Here’s the booking link: {booking_link}. If you’d rather text times, reply with 2–3 options.”

### 3.4 Missed call text-back (if enabled)
“Sorry we missed you — this is {business_name}. What’s the best time to call you back today?”

### 3.5 Re-engagement (48–72 hours later, only if still relevant)
“Hi {first_name} — checking in on your {service} request with {business_name}. Still need help?”

---

## 4) STOP / HELP handling (implementation spec)
Goal: instant compliance + protect deliverability by honoring opt-out universally.

### 4.1 Normalize inbound body
- Trim whitespace
- Uppercase
- Remove punctuation except spaces
- Treat multi-word messages containing a keyword as a match (e.g., “STOP PLEASE”)

### 4.2 Keyword sets
**STOP keywords (opt-out):** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP keywords:** HELP, INFO, SUPPORT
**START/UNSTOP (opt-in again):** START, YES, UNSTOP

### 4.3 State machine
Maintain per-phone state in a **global suppression list** (not per-client only).
- default: ACTIVE
- on STOP keyword: set state = OPTED_OUT
- on START/UNSTOP keyword (only if previously opted out): set state = ACTIVE (optional: require confirmation)

### 4.4 Required behaviors
1) If inbound matches STOP:
   - Immediately send confirmation (one message only):
     “You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
   - Add to suppression list with timestamp + source “inbound_stop”.
2) If inbound matches HELP:
   - Send:
     “{business_name}: We text about your service request. Msg frequency varies. Msg&data rates may apply. Reply STOP to cancel. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
3) If phone is OPTED_OUT:
   - Block all outbound sends (including scheduled/queued messages).
   - Return an internal error code: OUTBOUND_BLOCKED_OPTED_OUT.

### 4.5 Edge cases
- If user says “stop” but message contains other text: still opt out.
- If user opts out after a question: suppress future steps in the flow.
- If multiple client accounts share a number: suppression is **global**.

### 4.6 Required audit logs (minimum)
Log events (immutable):
- inbound_message_received (phone, body_hash, timestamp, carrier if known)
- stop_detected (keyword, normalized_body)
- opted_out_set (phone, timestamp, scope=global)
- outbound_blocked (phone, campaign_id, reason)
- help_sent (timestamp)
- start_detected / opted_in_restored (if enabled)

---

## 5) Quiet hours by timezone (implementation spec)
Goal: avoid texting at night locally; reduce complaints and carrier scrutiny.

### 5.1 Default allowed window
- **9:00 AM to 8:00 PM** lead-local time (recommended pilot default)

### 5.2 Timezone resolution order
1) Lead-provided timezone field (if present)
2) Lead ZIP/postal code → timezone mapping
3) Phone number area code → timezone inference (fallback)
4) Account default timezone

### 5.3 Scheduling algorithm
When an outbound message is requested at time `now_utc`:
1) Resolve `lead_tz`
2) Convert to `now_local`
3) If `now_local` within allowed window:
   - send immediately
4) Else:
   - enqueue message with `defer_until_local = next allowed start time`
   - store `defer_until_utc`
   - do not send until that time

### 5.4 Overrides
- Admin override flag per account: `ignore_quiet_hours=true` (default false)
- Transactional-only override (optional): e.g., “appointment confirmed” may be allowed later, but avoid for pilots unless required.

### 5.5 Logs required
- quiet_hours_blocked (phone, now_local, tz, defer_until_utc)
- message_deferred_enqueued (message_id)
- deferred_message_sent (message_id)

---

## 6) Consent logging spec (must-have for disputes)
Store these fields per lead and per message.

### 6.1 Consent record (per phone per business)
- phone_e164
- consent_status: CONSENTED | NOT_CONSENTED | OPTED_OUT
- consent_timestamp_utc
- consent_source: webflow | typeform | meta | import | verbal (avoid) | other
- consent_text_version (hash of disclosure text)
- landing_page_url / form_url
- ip_address (if available)
- user_agent (if available)

### 6.2 Message record (per outbound)
- message_id
- phone_e164
- business_id
- template_id / content_hash
- timestamp_utc
- send_status: queued | sent | delivered | failed | blocked
- blocked_reason (opted_out, no_consent, quiet_hours)
- provider_message_sid (Twilio SID if used)

### 6.3 Export requirements
Be able to export (CSV/JSON) for a phone number:
- consent record
- all outbound + inbound logs
- STOP/HELP events
- timestamps in UTC plus lead-local conversion where possible

---

## 7) Deliverability hardening (content + operational rules)
### 7.1 Content do’s
- Start with: who you are + why texting (“about your request”)
- Keep messages under ~240 characters when possible
- Use plain language; 1 question at a time
- Use consistent brand name; avoid rotating identities

### 7.2 Avoid (common spam triggers)
- URL shorteners (bit.ly, tinyurl)
- Excessive punctuation/ALL CAPS
- “FREE!!!”, “LIMITED TIME”, “ACT NOW”, “WINNER”
- Too many links; avoid link-first first message

### 7.3 Link rules
- Prefer a single, branded domain when available
- If including booking links, do it after user engages (2nd–3rd message)

### 7.4 Fallback behaviors
- If message fails with carrier filtering/undelivered:
  - retry once with simplified content (no links)
  - then stop automated retries and flag for human follow-up

---

## 8) Twilio configuration runbook (no-spend steps first)
### 8.1 Use a Messaging Service
- Create Twilio Messaging Service
- Add sending number(s)
- Enable status callbacks to log delivery outcomes

### 8.2 10DLC vs Toll-Free (pilot decision)
- **10DLC**: best for local long-term scaling; requires Brand/Campaign registration.
- **Toll-Free**: can work for early pilots; still benefits from verification.

Decision rule (pilot):
- If you will send > ~3,000 msgs/day or across multiple brands/accounts → prioritize 10DLC.
- If very small pilot volumes → toll-free can be acceptable short-term, but still keep compliance tight.

### 8.3 A2P/10DLC readiness (what you must have)
- Business identity (legal name, address)
- Website with Terms/Privacy pages and SMS disclosure
- Opt-in language matching campaign purpose
- STOP/HELP implemented

Note: Registration may incur fees depending on Twilio/carrier policy; request owner approval before any paid registration step.

---

## 9) Agency implementation notes (Zapier/Make/webhook)
Minimum viable wiring:
1) Lead source captures consent checkbox/field
2) Automation only triggers SMS if `sms_consent=true`
3) First SMS uses Template 3.1
4) Inbound replies feed into qualification flow
5) STOP/HELP handled centrally (Section 4) before any routing

Support reference (for clients/agencies):
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Email: agent_bob_replit+lead-copilot@agentmail.to

---

## 10) Verification test matrix (run before each pilot)
1) **STOP**: send “STOP” inbound → receive opt-out confirmation → all future outbound blocked.
2) **STOP with text**: “stop please” → same result.
3) **HELP**: send “HELP” → receive help response with support email + proof URL.
4) **Quiet hours**: trigger outbound at 11pm lead-local → message deferred → sent at next window start.
5) **No consent**: lead without consent triggers flow → SMS must be blocked and logged as no_consent.

Evidence to capture:
- Log lines for each test (event names from Sections 4–5)
- Example Twilio status callbacks (sent/delivered/failed)
- Screenshot or export snippet showing consent record + timestamps
