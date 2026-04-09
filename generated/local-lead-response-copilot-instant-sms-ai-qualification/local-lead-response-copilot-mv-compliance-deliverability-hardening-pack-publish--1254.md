# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Publish-Ready + Implementation Specs + Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:17:20.771Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack

**Business proof URL (share with customers/for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support/Compliance contact:** agent_bob_replit+lead-copilot@agentmail.to

> This document is “minimum viable compliant” for pilot rollout. It provides (1) publish-ready Terms + Privacy copy, (2) copy/paste opt-in snippets for common lead sources, (3) STOP/HELP rules with verifiable logging, (4) quiet hours by timezone spec, (5) consent logging requirements, and (6) deliverability guidelines for Twilio.

---

## 1) Publish-ready policy pages (copy/paste)

### 1.1 Terms of Service (including SMS Terms)
**Page title:** Terms of Service

**Effective date:** [Enter date]

#### 1) Overview
Local Lead Response Copilot (“Service”) provides automated SMS follow-up, lead qualification, and appointment/call booking for businesses (“Customers”). By using the Service, you agree to these Terms.

#### 2) Who we are / Contact
For questions, support, or complaints contact: **agent_bob_replit+lead-copilot@agentmail.to**. Proof of business presence: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4**.

#### 3) Acceptable use
You agree not to use the Service to send unlawful, deceptive, abusive, or unsolicited messages. You will not:
- Send SMS without valid recipient consent where required.
- Use purchased/rented lists or harvested phone numbers.
- Send content related to prohibited categories (e.g., illegal products, hate/harassment, scams) or any content barred by carriers/Twilio.

#### 4) SMS/Text messaging terms (TCPA/CTIA-aligned)
The Service may send text messages to leads on your behalf.

**Consent requirement:** You (Customer) represent and warrant that you will only trigger SMS to recipients who have provided appropriate consent (e.g., via a form checkbox or equivalent language) and that you will maintain records of that consent.

**Message frequency:** Message frequency varies based on recipient responses and business workflows.

**Carrier costs:** Message and data rates may apply.

**Opt-out:** Recipients can opt out at any time by replying **STOP**. The Service must honor opt-outs immediately and maintain a suppression list.

**Help:** Recipients can reply **HELP** for help.

**No guarantee of delivery:** Carrier filtering and network conditions may affect delivery.

#### 5) Customer responsibilities
Customer is responsible for:
- Providing compliant opt-in language and collecting consent.
- Maintaining accurate business identity and contact details.
- Configuring quiet hours and respecting local laws.
- Ensuring staff follow up on qualified leads when booked.

#### 6) Privacy
Our Privacy Policy explains how we collect and use data. See: **[LINK TO PRIVACY POLICY URL]**

#### 7) Disclaimers
Service is provided “as is” without warranties of uninterrupted delivery or increased sales.

#### 8) Limitation of liability
To the maximum extent permitted by law, Local Lead Response Copilot is not liable for indirect, incidental, special, or consequential damages.

#### 9) Changes
We may update these Terms. Continued use after updates constitutes acceptance.

#### 10) Governing law
[Add jurisdiction/state if desired]


### 1.2 Privacy Policy (pilot-ready)
**Page title:** Privacy Policy

**Effective date:** [Enter date]

#### 1) Contact
Questions: **agent_bob_replit+lead-copilot@agentmail.to**. Proof URL: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4**.

#### 2) What we collect
We may collect:
- Lead contact information (name, phone, email)
- Message content (inbound/outbound SMS)
- Metadata (timestamps, delivery status, consent source)
- Appointment/booking details

#### 3) How we use information
We use data to:
- Contact leads and qualify requests
- Schedule appointments/calls
- Provide customer support and analytics
- Maintain compliance (opt-out and consent logs)

#### 4) Sharing
We may share data with:
- Messaging providers (e.g., SMS carriers/Twilio)
- Booking/CRM tools as configured by the Customer
We do not sell personal information.

#### 5) Data retention
We retain message logs and consent records for a reasonable period to support compliance and dispute resolution (recommended minimum: **24 months**, unless Customer requests otherwise or law requires longer).

#### 6) Security
We use reasonable safeguards; no method of transmission/storage is 100% secure.

#### 7) Your choices
Recipients can opt out of SMS by replying **STOP**. For help, reply **HELP**.

#### 8) Updates
We may update this policy; changes will be posted on this page.

---

## 2) Copy/paste opt-in consent language (lead sources)

> Goal: explicit disclosure of automated texts, msg frequency variability, rates, STOP/HELP, and links to Terms/Privacy.

### 2.1 Webflow / Website form (checkbox text)
**Checkbox label (recommended):**
“I agree to receive automated text messages about my request from {Business Name} via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Required behavior:**
- Checkbox **unchecked by default**.
- Store timestamp, IP (if available), page URL, and exact checkbox language version.

### 2.2 Typeform (statement + required question)
**Statement block (above phone field):**
“By providing your phone number, you consent to receive automated text messages about your request from {Business Name} via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Optional required yes/no:**
“Do you agree to receive text messages about your request?” Yes/No (must be Yes to proceed)

### 2.3 Meta/Facebook Lead Ads (Higher intent, short)
**Add to the lead form custom disclaimer (best effort within Meta limits):**
“By submitting, you agree {Business Name} may contact you by automated SMS about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Operational note:** If Meta limits link formatting, put Terms/Privacy links on the thank-you screen and in the first SMS.

---

## 3) Compliant message templates (low-spam, high clarity)

### 3.1 First message (immediate speed-to-lead)
“Hi {first_name} — this is {agent_name} with {Business Name}. Got your request for {service}. Can I ask 2 quick questions to get you a fast quote?”

### 3.2 Consent reinforcement (if needed for Meta/short forms)
“Reply STOP to opt out, HELP for help. Msg & data rates may apply. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

### 3.3 Qualification question examples (keep short)
1) “What’s the address or ZIP where the work is needed?”
2) “Is this urgent (today/this week) or flexible?”
3) “Any photos you can share? (Optional)” *(If MMS is enabled; otherwise omit)*

### 3.4 Booking prompt
“Thanks — we can get you on the schedule. Want the soonest slot, or a specific day/time?”

### 3.5 Missed-call text-back
“Sorry we missed you — this is {Business Name}. What can we help with, and what’s a good time to call you back?”

### 3.6 Re-engagement (no pressure)
“Hi {first_name}, checking in — do you still need help with {service}? If not, reply STOP and we won’t text again.”

---

## 4) STOP/HELP handling — implementation spec (code-ready)

### 4.1 Keyword matching
Normalize inbound body: trim, uppercase, remove punctuation, collapse whitespace.

**STOP keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**HELP keywords:** HELP, INFO

**Edge-case rule:** If message contains STOP keyword as a standalone token (e.g., “STOP”, “STOP please”), treat as STOP.

### 4.2 State machine
Each phone number has `sms_status`:
- `ACTIVE` (default)
- `STOPPED`

**On inbound STOP:**
1) Set `sms_status=STOPPED` immediately.
2) Add number to **global suppression list** (account-wide) and **client suppression list** (per business/customer) (recommended: both).
3) Send one (1) confirmation message:
   “You’re opted out and will no longer receive texts. Reply HELP for help.”
4) Block all future outbound attempts to this number unless/until explicit re-opt-in occurs (do not auto-resume).

**On inbound HELP:**
- Send:
  “{Business Name} texts about your request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

### 4.3 Outbound gate (must be enforced)
Before sending any outbound SMS:
- If `sms_status=STOPPED` OR number in suppression list ⇒ **do not send**.
- Log `blocked_reason=opted_out`.

### 4.4 Audit logging (required fields)
For every inbound/outbound attempt:
- `event_id`, `timestamp_utc`
- `lead_id` (if known)
- `to_number`, `from_number`
- `direction` (inbound/outbound)
- `message_body` (or hashed/redacted if needed)
- `normalized_body`
- `detected_intent` (STOP/HELP/NONE)
- `sms_status_before`, `sms_status_after`
- `delivery_status` (queued/sent/delivered/failed)
- `provider_message_id` (Twilio SID)
- `blocked_reason` (if blocked)

### 4.5 Verification test matrix (staging/prod)
- Inbound: “STOP”, “Stop”, “STOP pls”, “unsubscribe”, “END” ⇒ status becomes STOPPED, confirmation sent, future outbound blocked.
- Inbound: “HELP” ⇒ HELP message sent.
- After STOP: attempt outbound campaign/automation ⇒ must be blocked and logged.

---

## 5) Quiet hours by timezone — implementation spec

### 5.1 Goal
Do not send outbound SMS during recipient-local quiet hours (reduce complaints and comply with common best practices).

### 5.2 Default window (configurable)
Allowed send window (recipient local time): **09:00–19:00**, Monday–Saturday. Sunday optional (default off).

### 5.3 Timezone resolution order
1) Lead-provided address/ZIP → geocode → timezone
2) Lead area code (best-effort) → timezone
3) Business default timezone
4) Fallback: UTC

Store `lead_timezone_source` and `lead_timezone`.

### 5.4 Scheduling algorithm
When an outbound message is triggered:
- Convert `now_utc` to `lead_local_time`.
- If within allowed window ⇒ send immediately.
- Else ⇒ enqueue to next allowed start time (next 09:00 local). Set `deferred_reason=quiet_hours`.

### 5.5 Overrides
- Human/manual send can override quiet hours only with explicit confirmation and must log `override=true`, `override_by=user_id`, `override_reason`.

### 5.6 Logging
For deferred sends log:
- `scheduled_send_time_utc`, `lead_local_time_at_trigger`, `quiet_hours_rule_version`.

---

## 6) Consent logging (dispute-ready minimum)

For each lead, store:
- `consent_status` (granted/unknown/denied)
- `consent_timestamp_utc`
- `consent_source` (webflow/typeform/meta/manual)
- `consent_form_url` (where collected)
- `consent_text_version` (exact disclosure text)
- `consent_proof` (screenshot URL, meta lead form ID, or raw payload hash)
- `ip_address` (if available)

Export requirement: ability to export a lead’s consent + message history as a single PDF/CSV for complaints.

---

## 7) Twilio deliverability guidance (pilot-safe)

### 7.1 Sending setup
- Use a **Twilio Messaging Service** when possible.
- Decide route:
  - **10DLC** for higher scale/standard A2P needs.
  - **Toll-Free** can work for early pilots but still needs verification to improve deliverability.

### 7.2 Content do’s/don’ts
**Do:**
- Personalize with {first_name} and specific service context.
- Keep messages short, conversational, and question-based.
- Include STOP/HELP disclosures at least in initial or early messages when form constraints exist.

**Avoid:**
- URL shorteners.
- Excessive capitalization, repeated punctuation, “FREE!!!”, “GUARANTEED”, or urgent spammy language.
- Repeated identical blasts across many numbers.

### 7.3 Fallback behaviors
- If message fails with carrier filtering/undelivered:
  - Retry once after 5–10 minutes (max 1 retry).
  - If still failing, route to email notification to staff or create a task in CRM.

---

## 8) Agency handoff — how to implement in 30–60 minutes

1) **Add opt-in language** to the lead source (Webflow/Typeform/Meta) using the snippets above.
2) **Ensure consent capture**: checkbox required (where possible), store the exact disclosure text.
3) **Webhook/Zapier/Make**: when a lead submits, send payload to Copilot endpoint including `first_name`, `phone`, `service`, `source`, `consent_status`, `consent_timestamp`, `consent_text_version`, and `page_url`.
4) **Enable STOP/HELP**: configure inbound webhook from Twilio to Copilot; implement the state machine + suppression list.
5) **Enable quiet hours**: implement timezone resolution and deferral queue.
6) **Run verification**: execute STOP/HELP test matrix and retain logs.

Support: agent_bob_replit+lead-copilot@agentmail.to  
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
