# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:38:29.391Z

---

## 0) Proof + Support (use in all customer-facing materials)
- Website (proof of legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email (SMS help/opt-out issues): agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)
**A. Consent + disclosure (TCPA/CTIA aligned)**
1) Lead form includes clear SMS consent language (not pre-checked when possible).
2) Disclosure includes: “automated”/“autodialer” language, msg/data rates, frequency estimate, STOP/HELP, link to Terms + Privacy.
3) Capture and store consent record: timestamp, source, page/form, IP, user agent, submitted fields, and the exact consent text shown.

**B. Operational requirements**
1) STOP/HELP handling implemented and verified (see Sections 4 and 7).
2) Quiet hours enforced by recipient timezone (see Section 5).
3) Sender identification: business name in first message; avoid deceptive content.
4) Message content avoids prohibited categories (adult, hate, illegal) and minimizes spam triggers (see Section 6).

**C. Twilio deliverability basics**
1) Use a Twilio Messaging Service (recommended) with proper compliance settings.
2) Decide send route (10DLC vs Toll-Free) for US; register A2P 10DLC brand/campaign if needed.
3) Monitor error codes, blocked rates, and opt-out rate; pause campaigns if opt-out spikes.

---

## 2) Copy/Paste Opt-in Language Snippets
> Replace bracketed placeholders. Once Terms/Privacy pages are published, replace URLs.

### 2.1 Webflow / Website Form (recommended)
**Checkbox label (recommended, unchecked by default):**
“I agree to receive SMS text messages from [BUSINESS NAME] about my inquiry (appointment scheduling and follow-ups). Reply STOP to opt out, HELP for help. Msg & data rates may apply. Msg frequency varies. By submitting, you agree to the Terms and Privacy Policy.”

**Below-form disclosure (small text):**
“By providing your phone number, you consent to receive automated SMS messages from [BUSINESS NAME] related to your request. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Terms: [TERMS_URL] • Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

### 2.2 Typeform
**Typeform “Legal” / description text (paste as-is):**
“By submitting this form, you consent to receive automated SMS texts from [BUSINESS NAME] regarding your inquiry (quotes/booking/follow-ups). Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL]. Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

### 2.3 Meta / Facebook Lead Ads
**Lead form disclaimer (short):**
“By submitting, you agree to receive automated SMS from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Follow-up confirmation message (first SMS must include business identification + STOP):**
“Hi [FirstName]—this is [BUSINESS NAME]. Thanks for your request. What service do you need help with? Reply STOP to opt out.”

---

## 3) Message Templates (Compliant + Deliverability-Friendly)
### 3.1 First response (speed-to-lead)
“Hi [FirstName]—this is [BUSINESS NAME]. Thanks for reaching out about [Service]. Are you looking to schedule a visit/quote today or later this week? Reply STOP to opt out.”

### 3.2 Qualification (short, low-risk content)
1) “What’s the address/ZIP for the job?”
2) “When would you like us to come out—today, tomorrow, or later?”
3) “Is this for a home or business?”

### 3.3 Booking handoff (human/dispatcher or calendar)
“Got it. I can book you for [2 options]. Which works best? Reply STOP to opt out.”

### 3.4 Missed-call text back
“Hi—this is [BUSINESS NAME]. Sorry we missed you. What’s the best time to call, or would you like to book by text? Reply STOP to opt out.”

### 3.5 Re-engagement (1 attempt, spaced)
“Hi [FirstName]—still need help with [Service]? If yes, what day works best? Reply STOP to opt out.”

---

## 4) STOP / HELP Handling (Implementation Spec)
### 4.1 Keywords
**STOP keywords (case-insensitive, trimmed):** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP keywords:** HELP, INFO

### 4.2 Required behavior
**On inbound STOP keyword:**
1) Immediately set contact status = “opted_out”.
2) Add phone (E.164) to a global suppression list (campaign-agnostic).
3) Send one (and only one) confirmation:
   - “You’re opted out from [BUSINESS NAME] texts. No more messages will be sent. Reply HELP for help.”
4) Block all future outbound messages to that number unless they re-consent (explicit).

**On inbound HELP keyword:**
- Respond:
  “Help: [BUSINESS NAME] appointment/quote texts. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

### 4.3 Edge cases
- If a user is opted out and sends non-HELP messages: do not send marketing/qualification messages; optionally reply once: “You’re opted out. Reply HELP for info.”
- If STOP and HELP appear in same message: treat as STOP.
- Maintain audit logs (below).

### 4.4 Required audit log events (for disputes)
Store immutable events:
- inbound_message_received {from, to, body, timestamp, provider_message_id}
- opt_out_triggered {from, keyword, timestamp}
- opt_out_confirmation_sent {timestamp, provider_message_id}
- help_requested {timestamp}
- help_response_sent {timestamp, provider_message_id}
- outbound_blocked_due_to_opt_out {timestamp, attempted_template}

---

## 5) Quiet Hours by Timezone (Implementation Algorithm)
**Goal:** prevent messaging during local night hours to reduce complaints and carrier scrutiny.

### 5.1 Default allowed window
- Allowed: 08:00–20:00 recipient local time (configurable per client)
- Outside window: queue and send at next allowed time.

### 5.2 Timezone resolution order
1) If lead provides ZIP/postal code → map to timezone.
2) Else if address/city/state provided → geocode/timezone.
3) Else infer from area code (fallback, lower confidence).
4) Else default to client’s timezone and log “timezone_confidence=low”.

### 5.3 Deferral rules
- If inbound lead arrives outside allowed window:
  - Immediately log “quiet_hours_deferred=true”.
  - Schedule first outbound message for next allowed time (e.g., 08:05 local).
  - If it’s within 30 minutes of window start, schedule at window start + 5 minutes.

### 5.4 Overrides
- If lead explicitly asks “text me now” or similar and the client has enabled “explicit override,” allow.
- Always allow STOP/HELP replies immediately (even during quiet hours).

### 5.5 Logging
- time_zone_selected {source, tz, confidence}
- outbound_deferred {original_time, scheduled_time, reason=quiet_hours}

---

## 6) Deliverability Content Guidelines (Twilio/Carrier Friendly)
- Put business name in first message.
- Avoid ALL CAPS, excessive punctuation, repeated links, “free”, “urgent”, “act now”, “winner”, “guarantee”.
- Prefer one link max; use your own domain when possible; avoid URL shorteners.
- Keep messages short and conversational; ask a single question.
- Space follow-ups: at least 4 hours apart; max 1 re-engagement after initial sequence.
- If opt-out rate exceeds ~2–3% in a day, pause and review consent + copy.

---

## 7) Verification Test Plan (Agency/Engineering Sign-off)
### 7.1 STOP test
1) Send outbound template to test phone.
2) Reply “STOP”.
**Pass criteria:**
- Immediate opt-out confirmation received.
- Further outbound attempts are blocked.
- Logs show opt_out_triggered + outbound_blocked_due_to_opt_out.

### 7.2 HELP test
1) Reply “HELP”.
**Pass criteria:**
- HELP response includes business name, STOP instruction, support email, and proof URL.

### 7.3 Quiet hours test
1) Set test lead timezone to Pacific.
2) Attempt send at 22:30 PT.
**Pass criteria:**
- Message deferred to next day within allowed window.
- Logs show outbound_deferred with correct scheduled time.

---

## 8) Consent Logging Schema (Minimum Required Fields)
For each lead:
- lead_id
- phone_e164
- consent_status (unknown/consented/opted_out)
- consent_timestamp
- consent_source (webflow/typeform/meta/manual/import)
- consent_text_version (hash of the exact text shown)
- page_url/form_id/ad_id
- ip_address, user_agent
- last_opt_out_timestamp (if any)
- message_history (provider ids + timestamps)
Retention: at least 24 months recommended (or per client counsel).

---

## 9) Twilio Setup Runbook (No-Spend Steps First)
1) Create Messaging Service (per client recommended) and attach sender (10DLC number or toll-free).
2) Enable Smart Encoding; set status callback URL to capture delivery receipts.
3) Implement suppression list at app level (do not rely only on provider).
4) US scaling: if using local long codes at volume, register A2P 10DLC Brand + Campaign (Twilio console). If using toll-free, complete verification where applicable.
5) Monitor: delivery errors, spam/blocked patterns, opt-out rate.

---

## 10) Terms of Service (SMS) — Pasteable MV Draft
**Terms of Service (SMS Program)**
Local Lead Response Copilot facilitates SMS communication on behalf of participating local businesses (“Business”) to respond to consumer inquiries and coordinate appointments/quotes.

**Program Description:** By providing your phone number on a Business’s website, form, or advertisement and checking/accepting the disclosure presented, you agree to receive text messages related to your inquiry, including appointment scheduling, follow-ups, and service coordination.

**Consent:** You consent to receive automated text messages. Consent is not a condition of purchase. Message frequency varies.

**Costs:** Message and data rates may apply.

**Opt-Out:** Reply STOP to opt out at any time. After opting out, you will no longer receive text messages from that Business unless you provide new, explicit consent.

**Help:** Reply HELP for help, or contact agent_bob_replit+lead-copilot@agentmail.to.

**Supported Carriers:** Supported carriers are not liable for delayed or undelivered messages.

**Privacy:** See the Privacy Policy: [PRIVACY_URL].

**Changes:** These terms may be updated from time to time. Material changes will be posted on this website.

Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 11) Privacy Policy — Pasteable MV Draft
**Privacy Policy**
Local Lead Response Copilot processes contact information submitted by consumers to help local businesses respond to inquiries quickly.

**Information We Collect:** Name, phone number, email (if provided), service request details, message history, timestamps, and technical data such as IP address/user agent when submitted via web forms (depending on the lead source).

**How We Use Information:** To send and receive text messages related to your inquiry, qualify requests, schedule appointments/calls, provide customer support, and maintain compliance records (consent, opt-outs).

**Sharing:** We may share information with the Business you contacted and with service providers (e.g., SMS and infrastructure providers) solely to deliver messaging and operate the service. We do not sell personal information.

**SMS Consent:** SMS consent is used only for communications related to your inquiry and is not shared with third parties for unrelated marketing.

**Data Retention:** We retain records as needed to operate the service and for compliance/audit purposes.

**Your Choices:** You can opt out of SMS at any time by replying STOP. For help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.

**Contact:** agent_bob_replit+lead-copilot@agentmail.to

Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
