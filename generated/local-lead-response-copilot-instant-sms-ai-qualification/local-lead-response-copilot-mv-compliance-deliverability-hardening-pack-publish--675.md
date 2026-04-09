# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Publish-Ready + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:25:20.869Z

---

This document is the minimum-viable compliance + deliverability hardening pack for Local Lead Response Copilot (Instant SMS + AI Qualification). It is designed so agencies can launch pilots fast while reducing TCPA/CTIA/Twilio risk and improving inboxing.

BUSINESS PROOF + SUPPORT
- Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support Email: agent_bob_replit+lead-copilot@agentmail.to

1) PUBLISH-READY WEBSITE PAGES (PASTE INTO YOUR SITE)

1A) TERMS OF SERVICE (SMS) — DRAFT
Title: Terms of Service (SMS)
Effective date: [DATE]

These Terms of Service (the “Terms”) govern your access to and use of the Local Lead Response Copilot messaging features (the “Service”). By opting in to receive text messages, you agree to these Terms.

1. Program Description
Local Lead Response Copilot sends SMS messages to respond to your inquiry, ask short qualification questions, and help schedule an appointment or callback with a participating business. Messages may be sent using an automated system.

2. Consent to Receive Messages (TCPA)
By providing your mobile number and checking/agreeing to the opt-in language shown at the point of collection, you authorize Local Lead Response Copilot and the business you are contacting to send you text messages using an automatic telephone dialing system and/or prerecorded/artificial voice for purposes related to your inquiry, qualification, and scheduling. Consent is not a condition of purchase.

3. Message Frequency
Message frequency varies based on your interaction. Typically 1–6 messages per inquiry; additional messages may occur if you continue the conversation.

4. Costs
Message and data rates may apply.

5. STOP / Opt-Out
You can opt out at any time by replying STOP. After you send STOP, you will receive one confirmation message and then no further messages will be sent unless you re-opt in.

6. HELP
For help, reply HELP or contact agent_bob_replit+lead-copilot@agentmail.to.

7. Carrier Disclaimer
Mobile carriers are not liable for delayed or undelivered messages.

8. Eligibility
You must be at least 18 years old or have permission from a parent/guardian to use the Service.

9. Prohibited Use
You agree not to use the Service for unlawful, abusive, or fraudulent purposes, including attempting to circumvent opt-out, consent, or quiet-hours rules.

10. Changes
We may update these Terms from time to time. Updates will be posted on this page with a new effective date.

11. Contact
Questions about these Terms: agent_bob_replit+lead-copilot@agentmail.to


1B) PRIVACY POLICY — DRAFT
Title: Privacy Policy
Effective date: [DATE]

This Privacy Policy explains how Local Lead Response Copilot collects, uses, and shares information when you interact with our SMS-based lead response and qualification experience.

1. Information We Collect
- Contact information: name, phone number, email (if provided)
- Inquiry information: service requested, location, preferred time, and other details you submit via a form/ad
- Message content: inbound and outbound SMS content and timestamps
- Technical metadata: message delivery status, carrier, and opt-out status

2. How We Use Information
- Respond to your inquiry and provide requested information
- Ask qualification questions and route you to scheduling/callback
- Improve message templates, routing, and service quality
- Compliance and security (consent logging, opt-out enforcement, dispute handling)

3. SMS Consent and Opt-Out
If you opt in, we will send you SMS messages related to your inquiry. You may opt out at any time by replying STOP. For help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.

4. Sharing
We may share information with:
- The business you contacted (so they can follow up and provide service)
- Service providers (e.g., SMS delivery and scheduling tools) acting on our behalf
We do not sell your personal information.

5. Data Retention
We retain consent logs, message logs, and related metadata for compliance and operational purposes. Retention periods vary; we retain opt-in/opt-out evidence for a period sufficient to respond to disputes and legal requests.

6. Security
We use reasonable administrative and technical safeguards designed to protect information.

7. Your Choices
You can opt out of SMS via STOP. You can request access or deletion where applicable by contacting agent_bob_replit+lead-copilot@agentmail.to.

8. Updates
We may update this policy. Changes will be posted with a new effective date.

9. Contact
agent_bob_replit+lead-copilot@agentmail.to


2) COPY/PASTE OPT-IN SNIPPETS (FOR AGENCIES)

IMPORTANT: Opt-in language must appear at the point where the phone number is collected. Do not rely on “soft opt-in” (e.g., buried in terms only). Keep it visible.

2A) WEBFLOW FORM OPT-IN (CHECKBOX)
Add a required checkbox under the phone field:
Checkbox label (copy/paste):
“I agree to receive text messages about my request from [BUSINESS NAME] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]”

2B) TYPEFORM OPT-IN
Add a statement + Yes/No question (Yes required):
Statement:
“By continuing, you agree to receive text messages about your request from [BUSINESS NAME] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”
Question:
“Do you agree to receive text messages?” (Yes/No)
Hidden field to pass downstream:
sms_consent = yes/no
Include links:
Terms: [TERMS_URL]  Privacy: [PRIVACY_URL]

2C) META/FACEBOOK LEAD ADS (DISCLAIMER)
In the “Disclaimer” or “Custom Disclaimer” section:
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]”

2D) DOUBLE OPT-IN (OPTIONAL BUT STRONG)
Use for higher-risk categories or cold lists (recommended if unsure):
First message: “Reply YES to confirm you want text updates about your request with [BUSINESS NAME]. Msg & data rates may apply. Reply STOP to opt out.”
Only proceed with qualification after YES.


3) MESSAGE TEMPLATES (DELIVERABILITY-SAFE)
Guidelines: keep messages short; avoid ALL CAPS, excessive punctuation, “FREE!!!”, “guaranteed”, “act now”; limit links; include business name early; include STOP/HELP language in initial messages and periodically.

3A) FIRST RESPONSE (LEAD INBOUND)
“Hi {first_name} — this is {business_name}. Thanks for reaching out. I can help get you scheduled. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

3B) QUALIFYING Qs (2–4 QUESTIONS MAX)
Q1: “What service do you need? (e.g., repair, install, quote)?”
Q2: “When would you like us to come out? (today/tomorrow/this week)” 
Q3: “Any brief details we should know before we call?”

3C) BOOKING / HANDOFF
“If you’d like, I can book a time. What’s the best time window for a call: morning / afternoon / evening?”
If using scheduling link (use sparingly):
“Here’s a link to pick a time: {short_link}. Reply STOP to opt out.”

3D) MISSED CALL TEXTBACK
“Sorry we missed you — this is {business_name}. Want to book a callback? Reply 1 for ‘call me’, 2 for ‘text me’, or share a time window. Reply STOP to opt out.”

3E) RE-ENGAGEMENT (ONLY IF CONSENT IS VALID)
“Hi {first_name}, checking back on your request with {business_name}. Do you still need help with {service}? Reply STOP to opt out.”


4) STOP / HELP IMPLEMENTATION (MUST-HAVE)

4A) RECOGNIZED KEYWORDS (case-insensitive)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

4B) REQUIRED BEHAVIOR
- On STOP keyword:
  1) Immediately mark phone as opted_out=true globally (across all clients unless you maintain a legally-safe per-brand opt-out model).
  2) Send ONE confirmation message:
     “You’re opted out and will no longer receive texts. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
  3) Block all future outbound messages unless re-opt-in occurs.
- On HELP keyword:
  Send:
  “Local Lead Response Copilot: automated texts about your request with {business_name}. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

4C) STATE MACHINE (SIMPLE)
States: ACTIVE, OPTED_OUT
- If inbound STOP* from any state => OPTED_OUT + send confirmation
- If OPTED_OUT and inbound START/YES (only if you support resubscribe) => ACTIVE + send confirmation
- If OPTED_OUT and any other inbound => do not send marketing/qualification; optionally send: “You are opted out. Reply START to resubscribe.”

4D) LOGGING (NON-NEGOTIABLE)
Log events:
- consent_captured (source, timestamp, IP/page/ad if available)
- message_sent (content hash, template, to/from, timestamp)
- message_received (content, classification, timestamp)
- opt_out (keyword, timestamp)
- help_request (timestamp)
- quiet_hours_deferred (until_timestamp, timezone)


5) QUIET HOURS BY TIMEZONE (SPEC)

Goal: avoid texting during local night hours to reduce complaints and carrier scrutiny.
Default quiet hours (recommended): 8:00pm–8:00am recipient local time.

5A) TIMEZONE RESOLUTION ORDER
1) Explicit lead field timezone if captured
2) Lead ZIP/postal code => timezone lookup
3) Lead state => timezone fallback (with edge cases)
4) Area code mapping (last resort)
5) Default business timezone if unknown (log “timezone_unknown=true”)

5B) BEHAVIOR
- If a message would be sent inside quiet hours:
  - Do not send immediately.
  - Queue/defer to next allowed window start (e.g., 8:05am local).
  - If lead is actively texting during quiet hours (inbound message received), you may respond once with minimal content (transactional) but still consider deferring non-urgent qualification.

5C) OVERRIDES
- Manual override allowed for: explicit user request (“text me now”), emergency services, or ongoing active conversation thread (within last X minutes). Log override reason.


6) CONSENT LOGGING SCHEMA (DISPUTE-READY)
Store minimum fields:
- lead_id
- phone_e164
- business_id
- consent_status (opted_in/opted_out)
- consent_source (webflow/typeform/meta/manual)
- consent_text (exact wording shown)
- consent_timestamp_utc
- consent_capture_metadata (page_url/form_id/ad_id, IP if available)
- opt_out_timestamp_utc + opt_out_keyword
- last_message_timestamp_utc
- timezone + timezone_source
Retention: keep consent + opt-out evidence and message logs long enough to respond to disputes (commonly 2–4 years; follow counsel guidance).


7) TWILIO DELIVERABILITY SETUP (RUNBOOK, NO-SPEND STEPS)

7A) MESSAGING SERVICE
- Create a Messaging Service per client (recommended) or per account if early pilots.
- Enable:
  - Sticky sender
  - Smart encoding
  - Use case-appropriate throughput
- Add phone number(s) to the service.

7B) A2P 10DLC VS TOLL-FREE DECISION
- If sending from local long code (10DLC) at meaningful volume, register Brand + Campaign.
- If you need faster approval or broader coverage early, consider toll-free verification.
Note: Some registration/verification steps may incur fees depending on Twilio/carriers; do not spend without owner approval.

7C) CONTENT GUARDRAILS
- Avoid:
  - “FREE”, “ACT NOW”, “LIMITED TIME”, “GUARANTEED”, heavy emojis/symbols
  - URL shorteners that look suspicious (use reputable short domain; ideally your own)
  - Multiple links per message
- Include business name early in the first message.
- Include STOP/HELP language in the first message and periodically.

7D) FALLBACK BEHAVIORS
- If message fails with carrier filtering/blocked:
  - Retry once after short delay if error is transient
  - If repeated failure, switch sender (within Messaging Service) or fall back to email notification to the business
  - Log failure reason and mark lead as “sms_unreachable”


8) AGENCY HANDOFF: IMPLEMENTATION STEPS
1) Add opt-in checkbox/disclaimer at phone capture (Webflow/Typeform/Meta).
2) Ensure form submit passes: phone, name, service, zip, consent=yes, consent_text, source.
3) Trigger webhook/Zapier/Make to call Copilot endpoint with lead payload.
4) Confirm STOP/HELP works end-to-end:
   - Text STOP from a test phone => confirmation + suppression
   - Try sending again => must be blocked
   - Text HELP => must return help content
5) Confirm quiet hours:
   - Submit a lead during quiet hours in that timezone => deferred and logged
6) Publish Terms + Privacy pages and update [TERMS_URL]/[PRIVACY_URL] in all opt-in language.

9) VERIFICATION TEST MATRIX (FOR PILOTS)
- STOP: “STOP”, “Stop”, “unsubscribe”, “END” => opt-out confirmation + suppression
- HELP: “HELP”, “info” => help message returned
- Quiet hours: lead created at 10:30pm local => deferred until next allowed window
- Consent required: lead with consent=no => do not text; notify business via alternate channel

If you need help implementing any of the above, email agent_bob_replit+lead-copilot@agentmail.to and reference the proof URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.