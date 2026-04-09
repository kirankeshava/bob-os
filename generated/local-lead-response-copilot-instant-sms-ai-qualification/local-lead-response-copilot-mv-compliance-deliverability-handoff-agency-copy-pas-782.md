# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:22:30.984Z

---

Below is a single, agency-ready handoff you can copy/paste into (a) your website, (b) lead forms/ads, and (c) your SMS automation logic. It is designed to be “minimum viable compliant” for pilots while materially improving deliverability.

BUSINESS IDENTIFIERS (use consistently)
- Proof/legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email for SMS program: agent_bob_replit+lead-copilot@agentmail.to
- Product name: Local Lead Response Copilot (Instant SMS + AI Qualification)

1) WEBSITE LEGAL PAGES (COPY/PASTE)

1A) SMS TERMS (add as a page section titled “SMS Terms” or inside Terms of Service)
SMS Program Description
Local Lead Response Copilot sends text messages to people who request information or submit a lead form to a participating local business (e.g., home services). Messages may include appointment scheduling, qualification questions, reminders, and customer support.

Consent / Opt-In
By submitting your phone number through a form, ad, or by otherwise requesting contact, you agree to receive text messages related to your inquiry. Consent is not a condition of purchase. Message frequency varies based on your interaction.

STOP / Opt-Out
You can opt out at any time by replying STOP. After you send STOP, you will receive one confirmation message and no further messages will be sent unless you re-opt in.

HELP
For help, reply HELP or contact agent_bob_replit+lead-copilot@agentmail.to.

Message & Data Rates
Message and data rates may apply.

Supported Carriers
Supported carriers are not guaranteed. Delivery is subject to carrier/network availability.

Privacy
We respect your privacy. See the Privacy Policy for details on how we collect and use your information.

1B) PRIVACY POLICY (MV DRAFT — paste into a “Privacy Policy” page)
Overview
This Privacy Policy describes how Local Lead Response Copilot collects, uses, and shares information when texting and qualifying leads on behalf of participating businesses.

Information We Collect
- Contact information: phone number, name (if provided), email (if provided)
- Lead source metadata: the form/ad source, timestamp, page/ad identifier (when available)
- Conversation data: SMS message content, responses to qualification questions, appointment preferences
- Technical data: message delivery status (sent/delivered/failed), carrier error codes, timestamps, and consent events (opt-in/opt-out)

How We Use Information
- To respond to your inquiry quickly and route you to the right service
- To ask a small number of questions to qualify your request
- To schedule or request scheduling for calls/appointments
- To support compliance (consent logging, opt-out suppression)
- To monitor deliverability and prevent abuse/fraud

How We Share Information
We share your information with the participating business you contacted and with vendors necessary to send messages (e.g., SMS providers). We do not sell your personal information.

Text Messaging & Consent
If you opt in, you may receive texts regarding your inquiry. Message frequency varies. You can opt out at any time by replying STOP. For help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.

Data Retention
We retain consent and messaging logs for compliance and dispute resolution. Retention may be longer where required by law or to resolve claims.

Your Choices
- Opt out of SMS: reply STOP
- Request help: reply HELP or contact agent_bob_replit+lead-copilot@agentmail.to

Contact
Questions about this policy: agent_bob_replit+lead-copilot@agentmail.to
Proof of service: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

2) OPT-IN / CONSENT LANGUAGE (COPY/PASTE BY SOURCE)

2A) WEBFLOW / GENERIC WEBSITE FORM CHECKBOX
Add a required checkbox (unchecked by default) next to submit:
Checkbox label (recommended):
“I agree to receive text messages about my request (including scheduling and follow-ups) from [BUSINESS NAME] via Local Lead Response Copilot. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms & Privacy: [LINK_TO_TERMS] | [LINK_TO_PRIVACY].”

If you cannot add a checkbox, add this sentence immediately above the Submit button and log the submission timestamp + page URL:
“By submitting, you agree to receive texts about your request. Msg & data rates may apply. Reply STOP to opt out. Terms/Privacy: [LINKS].”

2B) TYPEFORM
Add a “Legal” statement block right before submission:
“By submitting, you consent to receive SMS regarding your request from [BUSINESS NAME] via Local Lead Response Copilot. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [LINK] Privacy: [LINK].”

2C) META/FACEBOOK LEAD ADS (Higher-risk—keep tight)
- In the Lead Form > Privacy Policy URL: set to your Privacy Policy link.
- Add Custom Disclaimer text:
“By submitting, you agree to receive text messages about your request (including appointment scheduling) from [BUSINESS NAME] via Local Lead Response Copilot. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

3) SMS MESSAGE TEMPLATES (DELIVERABILITY-FRIENDLY)

3A) FIRST MESSAGE (sent immediately after form submission)
“Hi {{first_name}}, this is {{agent_or_business_name}}. Thanks for reaching out about {{service}}. To help you fast—what’s your ZIP code?”

If you must include disclosures in-message (e.g., lead source ambiguity), append ONE short line only:
“Reply STOP to opt out, HELP for help.”

3B) QUALIFICATION FLOW (2–4 questions max)
Q1: “What’s the address or nearest cross street for the job?”
Q2: “Is this for today, this week, or later?”
Q3: “Any photos you can share (optional)?” (Only if MMS is enabled; otherwise skip)

3C) BOOKING / HANDOFF
“Thanks—want the soonest appointment or a quick call first?”
- If appointment: “Great. What day/time window works best (morning/afternoon/evening)?”
- If call: “What’s the best time today to call you? (e.g., 2–4pm)”

3D) MISSED-CALL TEXTBACK (optional)
“Hi {{first_name}}—sorry we missed you. What service do you need help with, and what’s your ZIP code?”

3E) RE-ENGAGEMENT (only if consent exists; 1 attempt)
“Hi {{first_name}}—checking back on your request for {{service}}. Do you still need help?”

Content Guidelines (avoid filtering)
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “act now”, “limited time”, URL shorteners.
- Use one brand/business name consistently.
- Keep links minimal; prefer full domains (no bit.ly).
- Don’t include attachments unless MMS explicitly enabled.

4) STOP / HELP HANDLING (ENGINEERING SPEC — CODE-READY)

4A) Normalize inbound message
- Trim whitespace; convert to uppercase; remove punctuation.
- If normalized text matches any STOP keyword, treat as opt-out.

4B) STOP KEYWORDS
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Behavior:
1) Immediately set recipient state = “opted_out” in a GLOBAL suppression table keyed by E.164 phone.
2) Send one confirmation message (and only one):
“You’re opted out and will no longer receive texts. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to that E.164 across all client accounts until re-opt-in.
4) Log audit events (see section 6).

4C) HELP KEYWORDS
HELP, INFO

Behavior:
- Do NOT change opt-in state.
- Send:
“Local Lead Response Copilot help: Reply STOP to opt out. Msg frequency varies. Msg & data rates may apply. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

4D) START / RESUBSCRIBE
START, YES, UNSTOP

Behavior:
- Only allow resubscribe if you have prior opt-in evidence OR the user explicitly requests.
- Set state = “opted_in” and confirm:
“You’re resubscribed. Reply STOP to opt out. For help: agent_bob_replit+lead-copilot@agentmail.to.”

4E) Edge cases
- If user sends STOP plus other text (“stop texting me”), treat as STOP.
- If STOP received while a conversation is mid-flow, immediately halt the flow.

5) QUIET HOURS (TIMEZONE-AWARE SPEC)

Goal: prevent texts at night and reduce complaints.

Allowed send window (default): 8:00 AM–8:00 PM local time (recipient’s local time).

Timezone resolution order:
1) If lead record has explicit timezone → use it.
2) Else infer from ZIP/postal code → timezone lookup.
3) Else infer from area code (fallback, less accurate).
4) Else default to business timezone.

Algorithm:
- When an outbound message is triggered, compute recipient local time.
- If within window: send now.
- If outside window: enqueue with “deferred_send_at = next allowed window start” (e.g., next day 8:05 AM).
- If multiple messages queued: send at most 1 immediately at window open; throttle remaining based on conversation state.

Overrides:
- If recipient explicitly texts first during quiet hours, you may respond immediately (transactional reply) but keep it short.
- Admin override flag per client (for emergencies) must be logged.

Logging:
- Log “message_deferred_quiet_hours” with local time and timezone source used.

6) CONSENT LOGGING (REQUIRED FIELDS)
Store these fields per lead/contact (minimum):
- phone_e164
- consent_status: opted_in / opted_out
- consent_source: webform / typeform / meta_lead_ad / inbound_sms / manual
- consent_timestamp_utc
- consent_text_snapshot (the exact opt-in language shown)
- landing_page_url or ad_form_id
- ip_address (if available)
- user_agent (if available)
- opt_out_timestamp_utc (if applicable)
- last_help_timestamp_utc (if applicable)
- suppression_scope = global

Retention: keep consent + opt-out logs for at least 24 months (conservative pilot default).

7) TWILIO DELIVERABILITY RUNBOOK (NO-SPEND FIRST)

7A) Use a Messaging Service
- Create 1 Messaging Service per client (preferred for isolation).
- Enable: Sticky Sender (if multi-number), Smart Encoding, Scaler (if applicable).
- Add phone number(s) to the service.

7B) A2P 10DLC vs Toll-Free decision
- If sending from a US long code and volume > a few messages/day OR using automation: plan for A2P 10DLC.
- Toll-free can be viable for early pilots, but still needs verification and good content.

7C) Content + link rules
- Use consistent brand name and purpose.
- Avoid link shorteners; use full domains.
- Don’t send repeated identical messages at high volume.

7D) Fallback behaviors
- If message fails with carrier filtering: retry once after 2–5 minutes; if still fails, create a task for human call/email.
- If phone is opted_out: hard block and log.

8) VERIFICATION TEST MATRIX (WHAT TO PROVE BEFORE PILOT)

STOP tests (each should produce logs + expected replies):
- Inbound: “STOP” → confirmation sent; outbound blocked.
- Inbound: “stop texting me” → same.
- Inbound: “STOPALL” → same.

HELP tests:
- Inbound: “HELP” → help message includes support email + proof URL.

Quiet hours tests:
- Trigger outbound at 11pm local → message deferred; logs show timezone source.
- Trigger at 8:05am local → message sends.

Consent tests:
- New lead from form includes consent_text_snapshot + timestamp.

Agency implementation note
All customer-facing materials should reference:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

End of handoff.