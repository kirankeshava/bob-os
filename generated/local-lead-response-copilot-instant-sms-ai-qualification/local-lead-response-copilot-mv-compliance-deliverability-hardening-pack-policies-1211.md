# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Policies + Opt-in Snippets + STOP/HELP + Quiet Hours + Consent Logging + Twilio Guidance)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:54:42.121Z

---

Below is a single, agency-ready compliance + deliverability handoff for Local Lead Response Copilot (Instant SMS + AI Qualification). It is “minimum viable compliant” for pilots and designed to reduce carrier filtering and account enforcement risk.

BUSINESS ID / TRUST LINKS
- Proof URL (share with leads/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/Contact email: agent_bob_replit+lead-copilot@agentmail.to

SECTION A — PUBLISH-READY TERMS OF SERVICE (SMS) (paste to a /terms page)
Title: Local Lead Response Copilot — Terms of Service (including SMS)
Effective Date: [set date when published]

1) Service Overview
Local Lead Response Copilot (“Service”) provides rapid lead-response messaging and qualification for local businesses (“Clients”). The Service can send SMS messages to leads who submit a form or request information from a Client.

2) SMS/Text Messaging Program Disclosure
By providing your mobile number and submitting a request for information, quote, or service, you consent to receive text messages from the business you contacted and/or its service provider (Local Lead Response Copilot) at the number you provided. Messages may include appointment scheduling, qualification questions, and follow-ups related to your inquiry.

- Message frequency: varies by your interaction (typically 1–6 messages per inquiry; may be more if you continue the conversation).
- Message and data rates may apply.
- HELP: Reply HELP for help.
- STOP: Reply STOP to opt out at any time.

Consent is not a condition of purchase. If you opt out, you will no longer receive SMS messages unless you later re-consent.

3) Quiet Hours
We aim to avoid sending non-urgent messages during late-night hours based on your timezone. Some appointment confirmations or time-sensitive replies may be sent outside typical business hours only when needed to respond to your direct request.

4) User Responsibilities
You agree to provide accurate contact information and to use the Service only for lawful purposes. You must not use the Service to send unlawful, harassing, deceptive, or prohibited content.

5) Prohibited Content
The Service may not be used to send:
- Messages that are deceptive, impersonate others, or misrepresent identity.
- Content related to illegal products/services.
- Hate, threats, or harassment.
- High-risk financial, gambling, or other content restricted by carriers.

6) Client Compliance (for businesses using the Service)
Clients are responsible for ensuring they have appropriate consent to message leads (including TCPA/CTIA requirements where applicable), and that lead sources and forms include clear opt-in language. Clients must maintain records of consent.

7) Disclaimers
Delivery is subject to carrier and network availability. SMS delivery is not guaranteed. We are not responsible for delays or filtering applied by carriers.

8) Termination
We may suspend or terminate access for misuse, policy violations, or to comply with legal/carrier requirements.

9) Contact
For questions: agent_bob_replit+lead-copilot@agentmail.to

SECTION B — PUBLISH-READY PRIVACY POLICY (paste to a /privacy page)
Title: Local Lead Response Copilot — Privacy Policy
Effective Date: [set date when published]

1) What We Collect
We may collect:
- Contact info: name, phone number, email.
- Lead-source metadata: form name, page URL, ad campaign identifiers (if provided).
- Message content and timestamps for SMS conversations.
- Appointment/booking metadata (requested time, status).
- Technical data: IP address, device/browser metadata (if captured by Client’s form tool).

2) How We Use Information
We use data to:
- Respond to inquiries and provide requested services.
- Send SMS messages for qualification, scheduling, confirmations, and follow-up.
- Improve message flows and service performance.
- Maintain compliance records (consent logs, opt-out lists).

3) SMS Consent and Opt-Out
If you provide your phone number, you consent to receive text messages related to your inquiry.
- Reply STOP to opt out.
- Reply HELP for help.
Message and data rates may apply.

4) Sharing
We may share data with:
- Our Clients (the business you contacted).
- Service providers used to deliver messages and bookings (e.g., SMS carriers/aggregators, scheduling tools).
We do not sell your personal information.

5) Data Retention
We retain message logs and consent records as needed to operate the Service and comply with legal and carrier requirements. Retention periods may vary by Client configuration; we recommend retaining consent + messaging logs for at least 24 months for dispute handling.

6) Security
We use reasonable administrative, technical, and organizational safeguards. However, no system can be guaranteed 100% secure.

7) Your Choices
You can opt out of texts by replying STOP. You can request assistance at agent_bob_replit+lead-copilot@agentmail.to.

8) Updates
We may update this Policy periodically. The Effective Date will reflect the latest version.

9) Contact
agent_bob_replit+lead-copilot@agentmail.to

SECTION C — COPY/PASTE OPT-IN LANGUAGE SNIPPETS (AGENCY PACK)
Important: Put opt-in language next to the phone field and/or submit button. Keep it unambiguous.

C1) Webflow / Website Form (near submit button)
“By submitting this form, you agree to receive text messages about your request (quotes/booking/updates) from [BUSINESS NAME] and its service provider Local Lead Response Copilot at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Reply HELP for help. View Privacy: [YOUR PRIVACY URL] and Terms: [YOUR TERMS URL].”

C2) Typeform (add to form description or final screen)
“Consent: By providing your phone number, you agree to receive text messages from [BUSINESS NAME] (via Local Lead Response Copilot) about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out; HELP for help. Privacy: [YOUR PRIVACY URL] Terms: [YOUR TERMS URL].”

C3) Meta/Facebook Lead Ads (add to ‘Privacy policy’ and custom disclaimer)
Custom disclaimer text:
“By submitting, you agree to receive SMS about your inquiry from [BUSINESS NAME] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [YOUR PRIVACY URL] Terms: [YOUR TERMS URL]. Consent is not a condition of purchase.”

C4) Optional double-opt-in confirmation (recommended for higher trust)
Immediately after lead capture, first SMS:
“Hi {first_name} — this is {agent_name} with {business_name}. You requested info on {service}. Reply YES to confirm we can text you about your request. Reply STOP to opt out.”
If YES:
“Thanks! What’s the address or ZIP code for the job?”
If no response: do not continue beyond your configured follow-up policy.

SECTION D — COMPLIANT MESSAGE TEMPLATES (LOW-SPAM, HIGH-CLARITY)
D1) First message (single-link optional)
“Hi {first_name}, it’s {agent_name} with {business_name}. Thanks for reaching out about {service}. What’s the job address or ZIP code?”

D2) Qualification (keep questions short)
1) “What’s the best time for a call: morning, afternoon, or evening?”
2) “Is this for a new install, repair, or estimate?”
3) “Any photos you can share? (optional)” (only if MMS enabled and expected)

D3) Booking offer
“I can get you scheduled. Choose a time: 1) {slot1} 2) {slot2} 3) {slot3}”

D4) Confirmation
“Booked: {date} at {time}. Address: {address}. Reply RESCHEDULE to change. Reply STOP to opt out.”

D5) Missed call text-back
“Sorry we missed you — this is {business_name}. What’s a good time to call you back?”

D6) Re-engagement (1 attempt)
“Checking in — do you still need help with {service}? Reply 1 for Yes, 2 for No. Reply STOP to opt out.”

SECTION E — STOP/HELP HANDLING (IMPLEMENTATION SPEC + VERIFICATION)
Goal: carrier-compliant and dispute-ready behavior.

E1) Keywords to treat as STOP (case-insensitive, trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

E2) Keywords to treat as HELP
HELP, INFO, SUPPORT

E3) STOP behavior (required)
When inbound matches STOP keyword:
1) Immediately set contact.sms_opted_out = true
2) Add phone number to GLOBAL_SUPPRESSION_LIST (across all clients on same sending number/service)
3) Record audit event: event_type=STOP_RECEIVED, timestamp, from_number, to_number, raw_body, normalized_keyword, client_id, lead_id (if known)
4) Send one (and only one) confirmation message:
   “You’re opted out and will no longer receive messages. Reply START to re-subscribe. For help: agent_bob_replit+lead-copilot@agentmail.to.”
5) Block all future outbound messages to this number unless explicit re-consent recorded.

E4) HELP behavior (required)
When inbound matches HELP keyword:
- Do not change subscription status.
- Send:
  “Local Lead Response Copilot: Messages are related to your request with {business_name}. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
- Record audit event: HELP_RECEIVED.

E5) START / re-consent (optional but recommended)
Keywords: START, YES
- Only re-enable messaging if you can tie the re-consent to a prior lead interaction or a new opt-in.
- Record audit event: RESUBSCRIBE.

E6) Edge cases
- If message contains “stop” in a sentence (e.g., “please don’t stop by”), do NOT treat as STOP unless exact match to STOP keyword after normalization.
- If already opted-out: do not send anything except HELP response if they text HELP.

E7) Verification test matrix (must pass before pilots)
1) Send STOP → suppression set + confirmation sent.
2) Attempt outbound after STOP → blocked + log OUTBOUND_BLOCKED_OPT_OUT.
3) Send HELP → help message returned, no opt-out set.
4) Send STOPALL/UNSUBSCRIBE/CANCEL/END/QUIT → same as STOP.
5) Send START → only re-enable if re-consent policy satisfied; log event.

SECTION F — QUIET HOURS BY TIMEZONE (IMPLEMENTATION SPEC)
Goal: reduce complaints and align with best practices.

F1) Default quiet hours policy
- Allowed sending window: 08:00–20:00 local time (lead’s timezone).
- If outside window and message is not marked “urgent”: defer.

F2) Timezone resolution order
1) Explicit lead.timezone if provided.
2) Lead ZIP/postal code → map to timezone.
3) Client’s business timezone as fallback.
4) If unknown: default to Client timezone and log TIMEZONE_FALLBACK_USED.

F3) Deferral behavior
- Place message in a queue with next_send_at = next local 08:05.
- If multiple messages are queued, collapse to the latest “state” message (avoid stacking spammy sequences).

F4) Overrides
- Allow immediate send if:
  a) lead just texted in (inbound within last 10 minutes), or
  b) message is transactional confirmation (“Booked…”, “We’re on the way…”) and client allows.

F5) Audit logs (required)
- QUIET_HOURS_DEFERRED (include local_time, timezone, next_send_at)
- QUIET_HOURS_SENT_WITH_OVERRIDE (include override reason)

SECTION G — CONSENT LOGGING (DISPUTE-READY SCHEMA)
Store the following fields per lead:
- lead_id, client_id
- phone_number (E.164)
- consent_status: opted_in | opted_out | unknown
- consent_source: webform | typeform | meta_lead_ad | inbound_sms | manual
- consent_text_version: hash or version id of opt-in language shown
- consent_timestamp_utc
- consent_capture_proof: page_url/form_id/ad_id, and optionally screenshot url/file id
- ip_address (if captured), user_agent (if captured)
- opt_out_timestamp_utc, opt_out_method (STOP keyword, manual)
- last_message_sent_at_utc, last_inbound_at_utc
Retention: recommend 24 months minimum for consent + messaging logs.
Export: one-click CSV export for disputes (lead + consent + all message events).

SECTION H — TWILIO DELIVERABILITY GUIDANCE (NO-SPEND FIRST)
H1) Use a Twilio Messaging Service
- Centralize senders, set sticky sender, enable advanced opt-out (if available) but still implement your own suppression list.

H2) A2P/10DLC vs Toll-Free decision (pilot-oriented)
- If sending from US long code to US numbers at scale, expect A2P 10DLC registration needs.
- If using toll-free, verification helps deliverability.
Do not spend without owner approval; begin with free configuration and gather requirements.

H3) Content guardrails to reduce filtering
- Avoid all-caps, excessive punctuation, and URL shorteners.
- Keep links minimal; prefer branded domain when available.
- Include business name early in first message.
- Avoid “free”, “guaranteed”, and aggressive promo language.

H4) Fallback behaviors
- If SMS fails (carrier error):
  a) retry once after a short delay,
  b) if still failing, email the client and/or create a task in CRM,
  c) do not loop retries.
- If lead replies STOP: suppress immediately across all flows.

SECTION I — AGENCY HANDOFF INSTRUCTIONS (WHAT TO DO TODAY)
1) Add Terms/Privacy pages to client site using Sections A and B. Link them in the form disclaimer.
2) Place opt-in snippet (Section C) next to phone field / submit button on Webflow/Typeform/Meta forms.
3) Ensure webhook/Zapier/Make sends: phone, first_name, service, source, page_url, timestamp.
4) Implement STOP/HELP per Section E before starting campaigns.
5) Turn on quiet hours per Section F.
6) Verify using the test matrix (Section E7) and save log evidence for each test.

Support contact (include in agency ticketing): agent_bob_replit+lead-copilot@agentmail.to
Proof URL for prospects/auditors: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
