# Local Lead Response Copilot — Master Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:14:38.202Z

---

# Local Lead Response Copilot — Master Compliance + Deliverability Handoff

Business proof URL (share with prospects/agencies): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
Support email (include in disclosures): agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)
**Must-have before sending SMS**
1. **Express written consent** captured on the form/ad (checkbox or clear submission disclosure) including: automated texts, not required to buy, msg/data rates, STOP/HELP, frequency, links to Terms/Privacy.
2. **STOP/HELP implemented** with immediate honoring of opt-out and a persistent suppression list.
3. **Quiet hours**: do not message outside allowed local times for the lead (timezone-aware scheduling).
4. **Consent logging**: store proof of consent (source, timestamp, IP/user agent when possible, disclosure version, lead form copy, and contact data).
5. **Content guidelines**: avoid deceptive language, excessive links, URL shorteners, “spammy” phrasing, and repeated identical messages.
6. **Twilio deliverability baseline**: use a Messaging Service; decide sending route (10DLC vs toll-free) per use case; monitor error codes and opt-out rates.

## 2) Copy/Paste Opt-In Language (Forms + Ads)
### 2.1 Universal SMS Consent Disclosure (recommended)
Place near the submit button and/or as a required checkbox label.

**Option A (checkbox label):**
> [ ] I agree to receive automated text messages from {BUSINESS_NAME} about my request, appointment scheduling, and service updates at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.

**Option B (submission disclosure without checkbox, use only if platform doesn’t support checkbox):**
> By submitting, you agree to receive automated text messages from {BUSINESS_NAME} about your request and appointment scheduling. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.

**Strong recommendation:** Use a checkbox whenever possible.

### 2.2 Webflow Form Snippet (paste into helper text)
> By clicking “Submit,” you agree to receive automated texts from {BUSINESS_NAME} at the number provided about your request and appointment scheduling. Consent not required to purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.

### 2.3 Typeform Snippet
Add a required “Legal” statement or a Yes/No question.

**Legal statement:**
> You agree to receive automated text messages from {BUSINESS_NAME} related to your request. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.

**Yes/No question (best for audit):**
Question: “Do you agree to receive text messages about your request?”  
Yes = consent; No = do not text.

### 2.4 Meta/Facebook Lead Ads (Primary Text + Disclaimer)
**Primary text example:**
> Request a quote and we’ll text you in under a minute to confirm details and schedule.

**Lead form disclaimer (custom disclaimer field):**
> By submitting, you agree to receive automated text messages from {BUSINESS_NAME} about your request and appointment scheduling. Consent is not required to purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.

## 3) Message Templates (Compliant + Deliverable)
**Rules:** keep it short, identify the business, reference the inquiry, ask 1 question at a time, avoid all-caps, avoid too many links.

### 3.1 First Response (new lead)
> Hi {firstName} — this is {agentName} with {BUSINESS_NAME}. Got your request for {service}. What’s the address (city/zip) for the job? Reply STOP to opt out.

### 3.2 Qualification (simple)
> Thanks. When would you like us to come out — today/tomorrow, or later this week? Reply STOP to opt out.

### 3.3 Booking (offer two times)
> We can do {slot1} or {slot2}. Which works best? Reply STOP to opt out.

### 3.4 Confirmation
> Confirmed for {dateTime} at {address}. If anything changes, reply here. Reply STOP to opt out, HELP for help.

### 3.5 Missed-call text back
> Sorry we missed you — this is {BUSINESS_NAME}. Are you calling about {service}? What’s a good time today to reach you? Reply STOP to opt out.

### 3.6 Re-engagement (light)
> Hi {firstName}, still need help with {service}? If yes, what day works best? Reply STOP to opt out.

## 4) STOP/HELP Handling — Implementation Spec (Code-Ready)
### 4.1 Keywords to recognize (case-insensitive, trim punctuation)
**Opt-out:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**Help:** HELP, INFO  
**Resubscribe (optional, only if business wants):** START, YES, UNSTOP

### 4.2 State machine
- **State: SUBSCRIBED** (default when valid consent exists)
- **State: UNSUBSCRIBED** (after any opt-out keyword)

Transitions:
- SUBSCRIBED + inbound(opt-out) → set UNSUBSCRIBED immediately; add to suppression list.
- UNSUBSCRIBED + inbound(help) → respond with help info (allowed).
- UNSUBSCRIBED + inbound(start/yes) → only if you support re-consent; otherwise instruct to contact support.

### 4.3 Required behaviors
1. **Immediate confirmation on opt-out** (one message only):
   - “You’re opted out of {BUSINESS_NAME} texts. No more messages will be sent. Reply START to resubscribe (optional) or email agent_bob_replit+lead-copilot@agentmail.to for help.”
2. **Hard block outbound** to any number in suppression list (across all campaigns/clients within the same account, unless you have per-client segregation).
3. **Do not send further qualification/booking messages** after opt-out, even if automation is mid-flow.
4. **HELP response** (always allowed):
   - “{BUSINESS_NAME}: We text about your service request and scheduling. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

### 4.4 Logging (minimum)
For every inbound/outbound message:
- message_id, timestamp (UTC), direction, from, to, body, status, error_code
- lead_id (if known), client_id
- consent_status_at_send (subscribed/unsubscribed)
- compliance_event_type: CONSENT_GRANTED, OPT_OUT, HELP_REQUEST, MESSAGE_BLOCKED

### 4.5 Verification test matrix (must pass)
- Inbound “STOP” → suppression added; confirmation sent; next outbound blocked.
- Inbound “stop ”, “STOP.”, “Unsubscribe” → treated as opt-out.
- Inbound “HELP” (subscribed) → help message returned.
- Inbound “HELP” (unsubscribed) → help message returned; still unsubscribed.
- Outbound attempt after opt-out → blocked + logged as MESSAGE_BLOCKED.

## 5) Quiet Hours by Timezone — Implementation Spec
### 5.1 Policy (default)
- **Allowed window:** 9:00 AM–7:00 PM lead-local time (adjustable per client).
- Outside window: **defer** the message to next allowed time.

### 5.2 Timezone resolution order
1. Lead provided ZIP/postal code → map to timezone.
2. Lead provided city/state → map to timezone.
3. Phone number area code heuristic (fallback only).
4. If unknown: default to client’s timezone, log “timezone_fallback_used=true”.

### 5.3 Deferral behavior
- If message is generated outside window, enqueue with:
  - send_at (next window start), reason=QUIET_HOURS
- If multiple messages queued for same lead, coalesce to the latest “best next message” to avoid bursts.

### 5.4 Overrides
- Human-initiated send may override quiet hours only if client enables “manual_override=true”; still log override.
- System should never override for marketing/broadcast.

### 5.5 Required logs
- lead_timezone, resolution_method, original_event_time, scheduled_send_time, override_flag

## 6) Consent Logging Schema (Dispute-Ready)
Store per lead:
- phone, name, email
- consent_status (granted/denied/unknown)
- consent_timestamp_utc
- consent_source (webflow/typeform/meta/manual)
- consent_text_version_id (hash of disclosure text)
- page_url or ad_id/form_id
- ip_address + user_agent (if available)
- proof fields: checkbox_checked (true/false), raw_payload_snapshot (redact sensitive)
Retention: recommend 4 years (or client policy), exportable CSV + JSON.

## 7) Twilio Deliverability Hardening (Pilot Baseline)
### 7.1 Use a Messaging Service
- Create one Messaging Service per client (recommended) to isolate reputation.
- Enable: sticky sender (optional), opt-out handling (still implement your own suppression), and status callbacks.

### 7.2 10DLC vs Toll-Free decision
- **10DLC**: best for US local long-code with A2P registration; good for conversational lead follow-up.
- **Toll-Free**: may be simpler for early stage; still requires verification for best deliverability.
Choose based on client volume + geography + timeline.

### 7.3 Content guidelines (reduce filtering)
- Identify the business early.
- Limit links; avoid URL shorteners; prefer a consistent domain.
- Avoid spam triggers: “FREE!!!”, “ACT NOW”, repeated identical blasts, excessive punctuation.
- Keep messages conversational and tied to the user’s request.

### 7.4 Fallback behaviors
- If SMS fails with a carrier error: attempt one retry with backoff; if still fails, notify operator and/or send email.
- If lead is unsubscribed: do not fallback to SMS; optionally send internal notification only.

## 8) Agency Implementation Steps (No-Code Friendly)
1. Add the opt-in disclosure (Section 2) to the client’s lead capture (Webflow/Typeform/Meta Lead Ad).
2. Ensure the webhook payload includes: phone, name, service requested, location.
3. In Zapier/Make:
   - Trigger: new form submission / new lead
   - Action: call Copilot endpoint (or your webhook) with lead data
4. Confirm consent status true before initiating SMS.
5. Run verification:
   - Submit a test lead → receive first message
   - Reply HELP → receive help message
   - Reply STOP → receive opt-out confirmation; confirm no further texts
6. Share support contact in all flows: agent_bob_replit+lead-copilot@agentmail.to and the proof URL above.

## 9) MV Terms of Service (SMS) + Privacy Policy (paste-ready)
### 9.1 SMS Terms (paste into /terms)
**SMS Terms for Local Lead Response Copilot**

Local Lead Response Copilot (“we,” “us”) helps businesses respond to customer inquiries by sending text messages related to scheduling and service coordination. By providing your mobile number and submitting a request through one of our customers’ forms/ads, you agree to receive text messages (including automated texts) about your inquiry.

**Consent & Purpose.** Messages may include request confirmation, qualification questions, appointment scheduling, reminders, and service updates. Consent is not a condition of purchase.

**Message Frequency.** Message frequency varies based on your request and follow-up.

**Msg/Data Rates.** Msg & data rates may apply.

**Opt-Out.** Reply STOP to opt out at any time. After you opt out, you will no longer receive text messages from that sender unless you re-consent.

**Help.** Reply HELP for help or contact us at agent_bob_replit+lead-copilot@agentmail.to.

**Carriers.** Carriers are not liable for delayed or undelivered messages.

**Eligibility.** You must be the authorized user of the mobile number you provide.

### 9.2 Privacy Policy (paste into /privacy)
**Privacy Policy for Local Lead Response Copilot**

We collect information you provide when you submit a service request, including your name, phone number, email, address/location, and details about your requested service. We use this information to (a) contact you about your request, (b) coordinate scheduling and service updates, and (c) improve system reliability and prevent abuse.

**Consent Records.** We may store consent records such as form/ad source, timestamp, and the disclosure shown at time of submission to demonstrate compliance.

**Sharing.** We share your information with the business you contacted and with service providers that help deliver messages and scheduling (e.g., SMS and hosting providers). We do not sell your personal information.

**Retention.** We retain records as needed to provide the service and to meet legal/compliance obligations.

**Your Choices.** You can opt out of text messages by replying STOP. You can request assistance at agent_bob_replit+lead-copilot@agentmail.to.

**Security.** We take reasonable measures to protect data, but no method of transmission/storage is 100% secure.

**Contact.** Questions: agent_bob_replit+lead-copilot@agentmail.to
