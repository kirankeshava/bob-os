# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Pack (Agency Fast-Start + Engineering Appendix)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:59:24.117Z

---

Business legitimacy links (use in all customer-facing materials)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime MVP)
Launch pilots without carrier/TCPA surprises by implementing: (1) explicit opt-in language, (2) STOP/HELP handling + suppression, (3) quiet hours, (4) consent logging. Everything else is “nice-to-have” until revenue.

1) Copy/Paste Opt-In Language (agency ready)
A) Webflow / website form checkbox (recommended)
Add a required checkbox + short disclosure under phone field:
Checkbox label:
“I agree to receive text messages about my request.”
Disclosure (small text under checkbox):
“By submitting, you agree to receive SMS messages about your request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out or HELP for help. See Terms and Privacy: [TERMS_URL] | [PRIVACY_URL].”
Implementation notes:
- Checkbox must be unchecked by default.
- Store timestamp, page URL, and the exact disclosure text version.

B) Typeform (works with single consent question)
Add a Yes/No question: “SMS updates?” (Required)
Question description:
“Do you consent to receive text messages about your request from [BUSINESS NAME]? Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out or HELP for help. Terms/Privacy: [TERMS_URL] | [PRIVACY_URL].”
Store the answer + submission timestamp.

C) Meta / Facebook Lead Ads (best-effort within platform constraints)
In the “Privacy policy” link field:
- Link to: [PRIVACY_URL]
In the custom disclaimer (or intro text / question description), paste:
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME] at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL].”
Operational note: FB lead ads can be ambiguous on consent; strongly prefer adding an explicit opt-in question (“Do you agree to receive texts?” Yes/No) when possible.

2) First Message Template (immediate speed-to-lead, compliant)
Send within 0–60 seconds after lead submission.
Template:
“Hi {first_name}, it’s {agent_name} with {business_name}. Got your request for {service}. What’s the address (or ZIP) and when would you like service? Reply STOP to opt out.”
Guidelines:
- Don’t include ALL CAPS, excessive punctuation, or repeated emojis.
- Avoid “FREE!!!”, “GUARANTEED”, “ACT NOW”, “WIN”, “CASH”, “URGENT” spam phrasing.
- Keep links minimal; if needed, use your primary domain only.

3) Qualification Flow (short, human-like)
Q1 (service confirmation):
“To make sure I route this right—are you looking for {service_option_1} or {service_option_2}?”
Q2 (timeline):
“When are you hoping to get this done—today/tomorrow, this week, or just pricing?”
Q3 (call booking):
“I can get you on the schedule. Want a quick call or should I book a time directly?”
Booking confirmation:
“Booked for {date_time_local}. Reply YES to confirm. Reply STOP to opt out.”

4) STOP/HELP Handling (must-implement)
A) Keyword matching (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
B) Required behavior
When inbound matches STOP keyword:
1) Immediately add phone number to a GLOBAL suppression list (across all campaigns/clients if you share a sending number; at minimum, across that client).
2) Send a single confirmation message:
“You’re unsubscribed and will no longer receive text messages. Reply HELP for help.”
3) Block all future outbound messages to that number unless they re-opt-in via a compliant form.
When inbound matches HELP keyword:
Send:
“Help: {business_name} texting about your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
C) Edge rules
- Do not send any marketing content in HELP response.
- After STOP, do not send “Are you sure?”
- Maintain an audit trail (see Consent Logging).

5) Quiet Hours (minimum viable, reduces complaints)
Default policy (recommended): do not initiate new conversations outside 8:00am–8:00pm recipient local time.
Operational behavior:
- If lead comes in during quiet hours: queue the first message for 8:00am local time.
- If the recipient texts you first during quiet hours: you may respond (transactional) but keep it concise.
Timezone resolution order:
1) Timezone captured on form (best)
2) From lead ZIP/state
3) From area code heuristic (fallback)
If unknown: default to the business timezone and err on “queue until morning.”

6) Consent Logging (what to store for compliance)
Store these fields per lead (minimum):
- phone_e164
- lead_source (webflow/typeform/meta/etc.)
- consent_status (true/false)
- consent_timestamp_utc
- consent_language_version (the exact text shown)
- page_url_or_form_id
- ip_address (if available)
- timezone (if known)
- stop_status (active/inactive)
- stop_timestamp_utc (if STOP)

7) Twilio Deliverability Hardening (minimum viable)
- Use a Twilio Messaging Service (even for MVP) so you can manage sender pooling later.
- Enable “Sticky Sender” for consistent threads.
- Add a simple content lint rule: block messages containing more than 1 link, ALL CAPS over 30% of characters, or common spam phrases.
- Throttle bursts: avoid sending large batches from a single number.
- Use one brand domain only; do not rotate shorteners.
- If you move beyond tiny pilot volume, plan A2P 10DLC registration (brand + campaign) before scaling.

8) Agency Fast-Start (Go-Live in ~30 minutes)
Step 1: Choose lead source (Webflow / Typeform / FB lead ads).
Step 2: Paste the opt-in disclosure + add required checkbox/consent question.
Step 3: Ensure phone is required and captured.
Step 4: Capture timezone or ZIP (recommended).
Step 5: Turn on templates:
- First message template (Section 2)
- Qualification questions (Section 3)
Step 6: Verify STOP/HELP:
- Text “HELP” → receives HELP response.
- Text “STOP” → receives unsubscribe confirmation.
- Try to send again → must be blocked.
Support and legitimacy to share with the client:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Appendix A — STOP/HELP Verification Matrix (engineering)
Test cases:
1) Inbound “STOP” → suppression=true, confirmation sent, outbound blocked
2) Inbound “Stop.” → same as above (punctuation)
3) Inbound “UNSUBSCRIBE” → same
4) Inbound “HELP” → help message sent (no suppression)
5) Inbound random text after STOP → no outbound except allowed transactional if user re-opted-in (default: block)
Log events required:
- inbound_message_received
- keyword_detected (STOP/HELP)
- suppression_list_updated
- outbound_message_blocked_due_to_stop
- outbound_message_sent

Appendix B — Quiet Hours Decision Table (engineering)
If now_local within 08:00–20:00: send immediately.
If outside window and conversation not initiated by user: queue to next 08:00 local.
If outside window but user initiated: allow response, but do not start a new marketing sequence.

Open items (must be finalized before scale)
- Publish Terms/Privacy pages and replace [TERMS_URL]/[PRIVACY_URL] in all snippets.
- Confirm SMS route (10DLC vs toll-free) and initiate A2P registration before higher volume.
- Confirm actual inbound webhook endpoint so STOP/HELP can be verified end-to-end in staging.
