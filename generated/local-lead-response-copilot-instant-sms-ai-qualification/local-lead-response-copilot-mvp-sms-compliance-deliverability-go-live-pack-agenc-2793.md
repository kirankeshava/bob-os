# Local Lead Response Copilot — MVP SMS Compliance/Deliverability Go‑Live Pack (Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:13:04.871Z

---

Use this pack to launch pilots quickly with minimum viable compliance + deliverability protection. Business legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email for customers: agent_bob_replit+lead-copilot@agentmail.to

GO-LIVE GOAL (MVP):
1) Explicit SMS consent at capture (web form / lead ad).
2) STOP/HELP works immediately and permanently (unless user re-consents).
3) Quiet hours prevents late-night sends in the lead’s local time.
4) Consent logging exists (who/when/where/what they agreed to).

A) COPY/PASTE OPT-IN LANGUAGE (choose one; keep it near the submit button)

A1) Webflow / Website Form (recommended)
Checkbox label (unchecked by default):
“Text me about my request and appointment availability.”

Disclosure text (small text under checkbox):
“By checking this box, you agree to receive SMS messages about your request and scheduling from {BUSINESS_NAME} using an automated system. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

Required fields to store (hidden or backend): page URL, timestamp, IP (if available), form name, and the exact disclosure text version.

A2) Typeform
Add a required Yes/No question before submission:
Question: “Do you agree to receive text messages about your quote/appointment?”
Yes choice text: “Yes, text me.”
Description (beneath question):
“By selecting Yes, you agree to receive SMS messages from {BUSINESS_NAME} about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
If “No”: do not text; send email-only follow-up.

A3) Meta / Facebook Lead Ads
In the ‘privacy policy’ / disclaimer area (and/or custom question), include:
“By submitting this form, you agree to receive SMS messages from {BUSINESS_NAME} about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Also ensure the lead ad points to your privacy policy URL field.

B) FIRST MESSAGE TEMPLATE (safe, non-spammy)
Send immediately after lead capture.
“Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out.”

If no name available:
“Hi — this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out.”

Avoid in first message: ALL CAPS, multiple links, “FREE!!!”, “BUY NOW”, repeated emojis, URL shorteners.

C) QUALIFICATION FLOW (2–4 questions max)
Q1: “What’s the best address (or ZIP) for the job?”
Q2: “When would you like us to come out — today, tomorrow, or later this week?”
Q3: “Any photos or details you can share here? (Optional)”

Booking handoff:
“Thanks — I can get you scheduled. What’s a good time for a quick call to confirm details? (e.g., 2pm, 4pm) Reply STOP to opt out.”

D) STOP / HELP HANDLING (MUST IMPLEMENT)

D1) Keywords to treat as STOP (case-insensitive; trim punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Behavior:
- Immediately add phone number to Global Suppression List with: reason=’STOP’ source=’inbound_sms’ timestamp.
- Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to opt back in.”
- Block all future outbound SMS to that number unless they explicitly re-consent.

D2) Keywords to treat as START/UNSTOP (opt back in):
START, UNSTOP, YES

Behavior:
- Only remove suppression if you have an opt-in record OR treat the START message itself as re-consent (log it as consent_source=’sms_start’).
- Confirmation message:
“You’re opted back in. Msg frequency varies. Reply STOP to opt out.”

D3) HELP keywords:
HELP, INFO

HELP response (single message, no links required but allowed if clean):
“{BUSINESS_NAME}: We text about your request and scheduling. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

D4) Non-delivery / carrier errors:
- If carrier returns “undelivered/blocked”: pause outreach to that number for 24h; do NOT retry rapidly.

E) QUIET HOURS (MVP SPEC)
Default quiet hours (recommended): 8:00pm–8:00am lead-local time.

Timezone resolution order:
1) Lead-provided ZIP/postal code → map to timezone.
2) Address/state → map to timezone.
3) Phone number area code heuristic (fallback only).
4) If unknown: assume business local timezone.

Behavior:
- If a message would be sent during quiet hours: queue it for 8:05am lead-local time.
- Exception: if lead texts you first during quiet hours, you may reply within 15 minutes (still include STOP language).
- Always log: original_send_time, queued_until, timezone_source.

F) CONSENT LOGGING (minimum fields)
Store one row per consent event:
- lead_phone
- consent_status (opted_in / opted_out)
- consent_source (webform / typeform / meta / sms_start / manual)
- consent_text (exact disclosure shown)
- consent_timestamp_utc
- consent_page_url or lead_ad_id
- ip_address (if available)
- user_agent (if available)
- suppression_reason (if opted_out)

G) AGENCY HANDOFF CHECKLIST (launch in <60 min)
1) Add opt-in disclosure + checkbox (or Typeform question / Meta disclaimer).
2) Ensure phone field is required and validated (E.164 formatting preferred).
3) Paste the First Message Template into automation.
4) Implement STOP/HELP logic exactly as in section D.
5) Turn on quiet hours queueing (section E).
6) Verify with 3 test numbers:
   - Send STOP → confirm suppression + confirmation text.
   - Send HELP → confirm help text.
   - Submit a test lead at 9pm lead-local time → confirm message queues until morning.
7) Keep message content clean: no URL shorteners; max 1 link per message; keep under ~320 chars.

H) WHAT WE DEFER UNTIL AFTER PILOTS (do not block launch)
- Full A2P 10DLC brand/campaign optimization (we’ll do it once sending volume increases or carriers require it).
- Advanced deliverability tuning (content rotation, throughput tuning, multi-number pools).

If an agency needs a compliance reassurance line for proposals:
“We capture explicit SMS consent at the form/ad, include STOP/HELP in messaging, honor quiet hours by lead timezone, and maintain an audit log of consent and opt-outs. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Support: agent_bob_replit+lead-copilot@agentmail.to.”
