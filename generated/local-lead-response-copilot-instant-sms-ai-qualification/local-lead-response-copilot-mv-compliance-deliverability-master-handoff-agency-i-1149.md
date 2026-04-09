# Local Lead Response Copilot — MV Compliance + Deliverability Master Handoff (Agency + Implementation)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:23:17.473Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Master Handoff (Agency + Implementation)

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Support / Compliance Contact:** agent_bob_replit+lead-copilot@agentmail.to

This document is a **minimum-viable compliant** (TCPA/CTIA-aligned) pack for pilot agencies to launch compliant SMS follow-up for local businesses.

---

## 1) What “compliant enough for pilots” means
You must have:
1) **Clear opt-in disclosure** at the point of capture (form/lead ad) stating: automated texts, purpose, optional, msg/data rates, frequency (or “varies”), STOP/HELP, and links to Terms + Privacy.
2) **STOP/HELP handling** (inbound keywords processed immediately, global suppression enforced).
3) **Quiet hours** so you don’t message consumers at unreasonable times in their timezone.
4) **Consent logging** so you can prove permission.

---

## 2) Terms of Service (incl. SMS Terms) — paste into a website page
Create a page titled **“Terms of Service”**. Recommended URL path: `/terms`.

### TERMS OF SERVICE
**Effective Date:** [Month Day, Year]

These Terms of Service (“Terms”) govern access to and use of Local Lead Response Copilot (“Service”), provided via the website at:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

By using the Service, you agree to these Terms.

#### 1. The Service
Local Lead Response Copilot helps businesses respond to inbound leads by sending text messages, asking short qualification questions, and routing/bookings based on responses. The Service may use automated systems, including AI-generated messages.

#### 2. Eligibility
You must be at least 18 years old and able to form a binding agreement to use the Service.

#### 3. Customer Responsibilities (Business / Agency)
If you are a business or agency using the Service to contact leads:
- You represent that you have obtained **valid consent** to contact each lead at the phone number provided, including consent for **automated** text messages where required.
- You will not upload or use purchased lists, scraped numbers, or leads without appropriate permission.
- You will keep your opt-in language accurate and will not mislead consumers.
- You will comply with applicable laws and regulations, including the TCPA and CTIA Messaging Principles.

#### 4. SMS / Text Messaging Terms (Important)
**a) Consent & Opt-In.** When a consumer opts in via a form or ad, they agree to receive text messages related to their inquiry (e.g., scheduling, qualification questions, service updates). Consent is not a condition of purchase.

**b) Automated Messages.** Messages may be sent using an automatic telephone dialing system and may include AI-generated content.

**c) Message Frequency.** Message frequency varies based on lead interaction (typically 1–6 messages related to qualification/scheduling).

**d) Msg & Data Rates.** Message and data rates may apply.

**e) STOP to Opt Out.** Consumers can opt out at any time by replying **STOP**. After opting out, they will receive one confirmation message and no further messages will be sent unless they re-opt in.

**f) HELP for Help.** Consumers can reply **HELP** for assistance and will receive contact information.

**g) Carriers.** Carriers are not liable for delayed or undelivered messages.

**h) Supported Countries.** Unless otherwise stated, the Service is intended for messaging to recipients in the United States.

#### 5. Acceptable Use
You agree not to use the Service to send:
- Unlawful, abusive, harassing, threatening, or deceptive content
- Content that infringes IP or privacy rights
- Adult content, hate speech, or content promoting violence
- Unauthorized marketing to recipients who have not consented

#### 6. Disclaimers
The Service is provided “as is” and “as available.” We do not guarantee message delivery, lead conversion, or uninterrupted availability.

#### 7. Limitation of Liability
To the maximum extent permitted by law, Local Lead Response Copilot is not liable for indirect, incidental, special, or consequential damages, or for lost profits or revenues.

#### 8. Changes
We may update these Terms from time to time. The Effective Date will be updated when changes are posted.

#### 9. Contact
Questions about these Terms or messaging practices:
**Email:** agent_bob_replit+lead-copilot@agentmail.to

---

## 3) Privacy Policy — paste into a website page
Create a page titled **“Privacy Policy”**. Recommended URL path: `/privacy`.

### PRIVACY POLICY
**Effective Date:** [Month Day, Year]

This Privacy Policy describes how Local Lead Response Copilot (“we,” “us,” “our”) collects, uses, and shares information.

**Website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

#### 1. Information We Collect
We may collect:
- **Contact information:** name, phone number, email
- **Lead metadata:** source form/ad, timestamp, page/campaign identifiers
- **Message content:** inbound/outbound SMS content, delivery status, and opt-out status
- **Technical data:** IP address, device/browser data (if you visit our website)

#### 2. How We Use Information
We use information to:
- Send and receive text messages requested by a consumer
- Qualify leads and route/book appointments
- Provide customer support and troubleshooting
- Maintain consent records, prevent abuse, and comply with legal obligations

#### 3. SMS Data & Consent
If a consumer provides a phone number and opts in, we may send SMS messages related to their inquiry. Consumers can opt out anytime by replying **STOP** and can request help by replying **HELP**.

#### 4. Sharing
We may share information with:
- **Service providers** (e.g., messaging providers like Twilio, automation platforms) solely to provide the Service
- **Our customers** (the business receiving the lead) to allow them to respond to the inquiry
- **Legal/compliance** when required by law or to protect rights and safety

We do not sell consumer phone numbers.

#### 5. Data Retention
We retain consent and messaging logs for compliance and dispute handling. Standard retention: **at least 24 months** (or longer if required by a customer’s policy or legal needs).

#### 6. Security
We implement reasonable administrative, technical, and organizational safeguards. No method of transmission/storage is 100% secure.

#### 7. Your Choices
Consumers may:
- Opt out of SMS by replying **STOP**
- Request help by replying **HELP**

#### 8. Contact
Privacy questions or requests:
**Email:** agent_bob_replit+lead-copilot@agentmail.to

---

## 4) Copy/paste opt-in language (Webflow / Typeform / Meta Lead Ads)
**Important:** Place this immediately next to the phone field and submit button.

### A) Webflow form checkbox (recommended)
Add a required checkbox labeled:
> I agree to receive text messages about my request.

Add helper text under the checkbox:
> By submitting, you agree to receive automated text messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

### B) Typeform (short)
Add a statement block before submit:
> By submitting, you consent to receive automated texts from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg freq varies. Reply STOP to cancel, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

### C) Meta / Facebook Lead Ads (use “Custom Disclaimer”)
Use this text:
> By tapping Submit, you agree to receive automated text messages from [BUSINESS NAME] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

**Agency note:** If the client refuses Terms/Privacy links, do not launch SMS automation. Carriers and Twilio enforcement risk increases materially.

---

## 5) Message templates (carrier-friendly)
### First message (immediate)
> Hi {{first_name}}—this is {{biz_name}}. Thanks for reaching out about {{service}}. What’s the address/ZIP for the job?

### Qualification follow-up (if no reply in 2–4 minutes)
> Want to get you a fast quote—what’s the best time for us to call: morning, afternoon, or evening?

### Booking
> Great. Here’s the booking link: {{booking_link}}. If you prefer, reply with 2 times that work and we’ll confirm.

### Missed-call textback
> Sorry we missed you—this is {{biz_name}}. What service do you need and what ZIP?

### Re-engagement (24–72 hours later; only if consent exists)
> Checking back—do you still want help with {{service}}? Reply YES and we’ll schedule, or STOP to opt out.

**Content guardrails:**
- Avoid “free,” “guaranteed,” “act now,” excessive punctuation, ALL CAPS.
- Identify the business early (brand trust improves deliverability).
- Keep links consistent and branded where possible; avoid URL shorteners.

---

## 6) STOP/HELP handling — implementation spec (must be global)
### Keywords
Normalize incoming message: trim, uppercase, remove punctuation.

**STOP set (opt-out):** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**HELP set:** HELP, INFO

**START set (optional re-opt-in):** START, YES (only if your policy supports it)

### Behavior
1) If inbound matches STOP set:
- Set `contact.sms_opt_out = true`
- Add phone to **global suppression list** (per sending account / tenant)
- Log event `sms_opt_out` with timestamp, source, raw body, messageSid
- Reply once:
  > You’re opted out and will no longer receive texts from {{biz_name}}. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to
- Block all future outbound messages to that phone unless re-opt-in recorded.

2) If inbound matches HELP set:
- Log event `sms_help`
- Reply:
  > {{biz_name}}: For help, email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg & data rates may apply.

3) If inbound matches START set and previously opted out:
- Clear suppression only if you treat START as re-consent
- Log event `sms_reopt_in`
- Reply:
  > You’re subscribed. Reply STOP to opt out.

### Required enforcement
- Enforcement must happen **before** any automation/AI routing.
- Suppression is checked on every send attempt; if suppressed, log `sms_blocked_suppressed`.

---

## 7) Quiet hours by timezone — implementation spec
### Goal
Do not send SMS outside allowed hours in the **lead’s local timezone**.

### Default allowed window
**9:00 AM – 8:00 PM local time**, daily.

### Timezone resolution order
1) Explicit timezone captured (lead form field)
2) Derived from ZIP/postal code
3) Derived from area code (US NANP mapping)
4) Fallback: business timezone (config)

### Algorithm
On send attempt:
1) Compute `local_time = now in lead_timezone`.
2) If within allowed window: send.
3) If outside window:
- enqueue a deferred send with `not_before = next allowed window start` (next day 9:00 AM local if after 8 PM; same day 9:00 AM if before 9 AM)
- log `sms_deferred_quiet_hours` including lead_timezone, local_time, not_before

### Overrides
- Owner manual send override allowed only for transactional messages explicitly requested by consumer.
- No override for marketing blasts.

---

## 8) Consent logging (audit-ready)
Store these fields per lead:
- `lead_id`
- `phone_e164`
- `consent_status` (opted_in/opted_out)
- `consent_timestamp`
- `consent_source` (webflow/typeform/meta/manual)
- `consent_text_version` (hash or version ID)
- `terms_url`, `privacy_url`
- `ip_address` (if available)
- `user_agent` (if available)
- `lead_form_url` / `campaign_id`
- `message_history` pointers and delivery receipts

Retention: **24 months minimum**.
Export: CSV/JSON per phone number for disputes.

---

## 9) Twilio deliverability checklist (pilot-ready)
- Use a **Messaging Service** (not ad-hoc from individual numbers).
- Add numbers to the service; enable **sticky sender**.
- Ensure opt-in language exists and is stored/logged.
- Decide route:
  - **Low volume** / early pilots: local long code (10DLC) with A2P registration where required.
  - If higher throughput or mixed traffic, evaluate toll-free (often easier perception but still can require verification).
- Do not use URL shorteners; use consistent domains.
- Keep first message contextual to the lead’s inquiry.
- Monitor: delivery rates, carrier errors, opt-out rate.

---

## 10) Verification checklist (must pass before going live)
1) Opt-in language present on capture source and saved in logs.
2) Reply STOP → confirmation sent; further outbound blocked.
3) Reply HELP → help message sent.
4) Quiet hours defers messages; logs show `sms_deferred_quiet_hours`.
5) Random audit: export consent record for 3 leads.

For support: agent_bob_replit+lead-copilot@agentmail.to
