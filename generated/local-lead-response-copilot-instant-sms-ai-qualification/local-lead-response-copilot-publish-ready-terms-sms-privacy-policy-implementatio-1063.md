# Local Lead Response Copilot — Publish-Ready Terms (SMS) + Privacy Policy + Implementation Specs (STOP/HELP + Quiet Hours) + Agency Opt-in Snippets

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:40:57.415Z

---

# Local Lead Response Copilot — Compliance + Deliverability (Pilot-Ready)

Proof of business / product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
Support / contact: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Terms of Service (SMS) — Paste as a Website Page
**Title:** Terms of Service (SMS)

**Effective date:** [Month Day, Year]

These SMS Terms of Service (the “SMS Terms”) describe how Local Lead Response Copilot (“we,” “us,” “our”) sends text messages on behalf of participating businesses (each, a “Client”) to people who request information, submit a lead form, or otherwise opt in to receive messages (each, a “You”). These SMS Terms apply in addition to any other terms presented on our website.

### 1.1 Program description
Local Lead Response Copilot is an automated lead-response and qualification service. If you opt in, you may receive text messages related to your inquiry, including: (a) confirmation of your request, (b) questions to qualify your request (e.g., job type, location, timing), (c) appointment or call booking coordination, (d) updates related to your request.

### 1.2 Consent to receive messages (TCPA)
By providing your mobile number and completing an opt-in action (for example, checking an opt-in box or submitting a form containing SMS disclosure language), you authorize the applicable Client and Local Lead Response Copilot to send you text messages using an automatic telephone dialing system and/or prerecorded or artificial voice (where applicable) at the number you provide.

**Consent is not a condition of purchase.** You may still request information or services without consenting to receive text messages.

### 1.3 Message frequency
Message frequency varies based on your interaction, but is typically limited to a small number of messages related to your request (for example, 1–6 messages over a short period). Additional messages may occur if you continue the conversation or reschedule.

### 1.4 Costs
**Message and data rates may apply** depending on your mobile plan.

### 1.5 Supported carriers
Carriers are not liable for delayed or undelivered messages.

### 1.6 Opting out (STOP)
You can cancel SMS messages at any time by replying **STOP**. After you send STOP, you will receive one final confirmation message that you have been unsubscribed. After that, you will no longer receive SMS messages from that specific program/Client unless you opt in again.

### 1.7 Help (HELP)
For help, reply **HELP** or contact us at agent_bob_replit+lead-copilot@agentmail.to. You may receive instructions on how to unsubscribe and where to find additional support.

### 1.8 Eligibility and accuracy
You represent that you are the account holder or have authorization to use the mobile number provided, and that you will provide accurate contact information.

### 1.9 Privacy
We use information you provide (including phone number and message content) to deliver and improve the service, route inquiries to the appropriate Client, and maintain compliance logs. Please review our **Privacy Policy** for details.

### 1.10 Changes
We may update these SMS Terms from time to time. The “Effective date” above indicates when the latest changes were made.

### 1.11 Contact
Questions about these SMS Terms: agent_bob_replit+lead-copilot@agentmail.to  
Business info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 2) Privacy Policy — Paste as a Website Page
**Title:** Privacy Policy

**Effective date:** [Month Day, Year]

Local Lead Response Copilot (“we,” “us,” “our”) provides an automated SMS lead-response and qualification service for local businesses. This Privacy Policy explains what we collect, how we use it, and your choices.

### 2.1 Information we collect
We may collect:
- **Contact information:** name, phone number, email (if provided), address or service area (if provided).
- **Lead details:** information you submit via forms/ads (job type, timing, notes).
- **Message content and metadata:** SMS/phone conversation content with our system, timestamps, delivery status, carrier info.
- **Technical data:** webhook payloads, page/form source, UTM parameters, IP (where captured by the Client’s form provider), and system logs.

### 2.2 How we use information
We use your information to:
- Send and receive messages you’ve opted in to receive and route conversations to the appropriate business.
- Ask short qualification questions and help coordinate appointments/calls.
- Maintain compliance records (e.g., consent evidence, opt-out history).
- Monitor deliverability and prevent abuse/spam.
- Improve our service reliability and safety.

### 2.3 Legal bases / consent
Where required by law (including the TCPA for SMS marketing/automated messaging), we rely on your **consent**. You can withdraw consent by replying **STOP**.

### 2.4 Sharing of information
We may share information with:
- **The local business you contacted (our Client)** so they can respond and provide services.
- **Service providers/subprocessors** that help us operate (e.g., SMS/telecom providers such as Twilio; hosting and analytics providers). These providers process data under contractual obligations to protect it.
- **Legal/compliance** where required to comply with law, enforce policies, or protect rights and safety.

We do **not** sell your personal information.

### 2.5 Data retention
We retain lead and messaging data only as long as necessary to:
- Provide the service,
- Maintain compliance/audit logs (e.g., opt-in evidence and opt-out history),
- Resolve disputes and enforce policies.

Retention periods may vary by Client and legal requirements. We can delete or anonymize data upon request where feasible and lawful.

### 2.6 Your choices and rights
Depending on your location, you may have rights to access, correct, delete, or obtain a copy of your personal information. To exercise these rights, contact agent_bob_replit+lead-copilot@agentmail.to.

**SMS opt-out:** Reply **STOP** at any time.

### 2.7 Security
We use reasonable administrative, technical, and organizational safeguards to protect personal information. No method of transmission or storage is 100% secure.

### 2.8 Children
Our services are not directed to children under 13 (or the minimum age required by local law). We do not knowingly collect personal information from children.

### 2.9 Changes
We may update this Privacy Policy. The Effective date above will reflect the latest version.

### 2.10 Contact
agent_bob_replit+lead-copilot@agentmail.to  
Proof/business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 3) STOP / HELP Handling — Implementation Spec (Code-Ready)
### 3.1 Keyword handling (case-insensitive, trim whitespace)
**STOP intents:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**HELP intents:** HELP, INFO

### 3.2 State machine
- **Active (default):** messages may be sent.
- **Suppressed:** no messages may be sent except one-time compliance confirmations.

**Transitions**
- Active -> Suppressed when inbound STOP intent received.
- Suppressed -> Active only when a new explicit opt-in event is recorded (do not re-enable from “START/YES” unless your compliance counsel approves; safest: require a new opt-in form event).

### 3.3 Required behaviors
**On STOP intent:**
1) Immediately mark recipient as **Suppressed** for that Client/program. Also add to a **Global Suppression** list if you run multiple clients on shared numbers.
2) Send exactly one confirmation:  
“Local Lead Response Copilot: You’re unsubscribed and will no longer receive text messages. Reply HELP for help.”
3) Block all future outbound sends to that recipient for that Client/program (including automated qualification follow-ups, reminders, and broadcasts).

**On HELP intent (if Active):**
Send:  
“Local Lead Response Copilot: Automated texts about your request. Msg & data rates may apply. Reply STOP to unsubscribe. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

**On HELP intent (if Suppressed):**
You may respond with the same HELP message above, but do not re-subscribe.

### 3.4 Edge cases
- If inbound contains both STOP and other text, treat as STOP.
- If STOP received during an active scheduled sequence, cancel pending jobs.
- If a message is attempted to a suppressed number, the send must be prevented at application level (not only via provider).

### 3.5 Audit logging (minimum)
Log events with timestamp, recipient, client/program, and payload hash:
- consent.recorded (with evidence)
- inbound.received
- optout.received (keyword)
- optout.confirmation.sent
- help.sent
- outbound.blocked_due_to_optout

### 3.6 Verification test matrix (must pass)
1) Active -> send message -> deliver OK
2) Inbound “STOP” -> suppression set -> confirmation sent
3) Attempt outbound after STOP -> blocked + logged
4) Inbound “HELP” -> help response sent
5) Inbound “STOPALL” and “Unsubscribe” -> same as STOP
6) Opt-in again (new form submission with consent) -> re-enabled and logged

---

## 4) Quiet Hours by Timezone — Implementation Spec
### 4.1 Goal
Prevent outbound SMS from being sent during restricted local hours (default: 8:00pm–8:00am recipient local time), while preserving speed-to-lead by scheduling the earliest allowed send.

### 4.2 Timezone resolution order
1) Lead-provided address/ZIP -> timezone lookup
2) Area code -> approximate timezone
3) Client/business timezone fallback

Store `lead.timezone_source` and `lead.timezone` for audit.

### 4.3 Allowed window (default)
Allowed: 8:00am–8:00pm local recipient time, all days. (Client-configurable.)

### 4.4 Scheduling rules
- If an event triggers outbound inside allowed window: send immediately.
- If triggered during quiet hours: enqueue with `defer_until = next_allowed_start_local` converted to UTC.
- If multiple messages queued: coalesce where possible (avoid bursts) and preserve ordering.

### 4.5 Overrides
- Manual agent/business owner can override on a per-lead basis (logged as `quiet_hours.override_used`).
- Critical compliance messages (STOP confirmation) may be sent regardless of quiet hours.

### 4.6 Required logging
- quiet_hours.evaluated (inputs: timezone, local_time, allowed_window)
- message.deferred (defer_until)
- message.sent (actual send time)

---

## 5) Agency Copy/Paste Opt-in Snippets (Webflow / Typeform / Meta Lead Ads)
**Important:** Once Terms + Privacy pages are published, replace these placeholders:
- Terms URL: [PASTE YOUR TERMS URL]
- Privacy URL: [PASTE YOUR PRIVACY URL]

### 5.1 Webflow (checkbox + disclosure)
**Checkbox label (required, unchecked by default):**
“I agree to receive text messages about my request.”

**Disclosure text (near submit button):**
“By submitting this form and checking the box, you consent to receive SMS messages from us about your request via Local Lead Response Copilot. Msg & data rates may apply. Msg frequency varies. Reply STOP to unsubscribe, HELP for help. Consent is not a condition of purchase. Terms: [PASTE YOUR TERMS URL] Privacy: [PASTE YOUR PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

### 5.2 Typeform
Add a **Yes/No** question (required):
“Do you agree to receive text messages about your request?”

Add statement on the submit/thank-you screen:
“By opting in, you agree to receive SMS messages about your request via Local Lead Response Copilot. Msg & data rates may apply. Msg frequency varies. Reply STOP to unsubscribe, HELP for help. Consent is not a condition of purchase. Terms: [PASTE YOUR TERMS URL] Privacy: [PASTE YOUR PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to”

### 5.3 Meta/Facebook Lead Ads
**Disclaimer / custom question (recommended):**
“By submitting, you agree to receive text messages about your request. Msg & data rates may apply. Reply STOP to unsubscribe, HELP for help. Consent not required to purchase. Terms: [PASTE YOUR TERMS URL] Privacy: [PASTE YOUR PRIVACY URL].”

**First SMS after lead submission (use immediately):**
“Hi {{first_name}}—it’s {{business_name}}. Thanks for reaching out. Quick question so we can help: what service do you need? Reply STOP to opt out.”

---

## 6) Deliverability Content Guardrails (Pilot Minimum)
- Avoid ALL CAPS, excessive punctuation, and repeated link-only messages.
- Prefer one brand/domain link max per conversation step; use a consistent domain.
- No sensitive content, no misleading claims, no “free money,” no payday language.
- Always identify the business early in the conversation.
- Keep messages short, conversational, and clearly tied to the user’s request.

---

## 7) What’s still needed to fully “lock” compliance
1) Publish these Terms + Privacy pages and insert their final URLs into all opt-in snippets.
2) Run live STOP/HELP tests through the actual sending number and save logs showing suppression + blocked sends.
3) Confirm sending route (10DLC vs toll-free) per pilot and complete registrations as needed for stable deliverability.
