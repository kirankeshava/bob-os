# Local Lead Response Copilot — Minimum Viable SMS Compliance & Deliverability Launch Kit (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:27:43.236Z

---

Overview (what this is)
This launch kit is the minimum viable compliance + deliverability package for Local Lead Response Copilot (instant SMS + AI qualification). It is designed to (1) remove common sales objections during pilot onboarding, (2) prevent carrier/Twilio enforcement issues that can kill distribution, and (3) be implementable with minimal code.

Legitimacy links to use in all customer-facing materials
- Website (use as proof of legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Opt-in / Consent language (copy/paste)
Goal: capture express consent to receive automated texts, disclose frequency, STOP/HELP, and link to privacy/terms.

A) Webflow / website form checkbox (preferred)
Add a required checkbox with this label:
“I agree to receive text messages from {BUSINESS_NAME} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. By submitting, I agree to the Terms and Privacy Policy: {TERMS_URL} / {PRIVACY_URL}.”
Implementation notes:
- Checkbox should be unchecked by default.
- Store the checkbox boolean + timestamp + page URL.

B) Typeform (consent statement)
Add a statement block immediately above the submit button:
“By submitting, you consent to receive automated text messages from {BUSINESS_NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
If possible, add a Yes/No consent question and only proceed if “Yes”.

C) Meta/Facebook Lead Ads (higher-risk; ensure clear disclosure)
In the lead form “Privacy policy” link, set to {PRIVACY_URL}. In “Custom disclaimer” add:
“By submitting, you agree {BUSINESS_NAME} may contact you by automated text regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

2) Default compliant message templates (carrier-friendly)
Guidelines:
- Don’t include URL shorteners. Avoid “FREE!!!”, excessive caps, repeated punctuation, or risky phrases like “guaranteed”, “act now”.
- Keep the first message tightly related to the lead’s request.
- Include STOP/HELP language early (first message or within first 1–2 messages).

Template 1 — First response (instant)
“Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. A couple quick questions so we can help: 1) What city are you in? 2) Is this needed today or this week? Reply STOP to opt out, HELP for help.”

Template 2 — Qualification follow-up
“Thanks. What’s the address or nearest cross-streets (for scheduling/quote)? Reply STOP to opt out, HELP for help.”

Template 3 — Booking / call handoff
“Perfect — we can get you on the schedule. What time is best for a quick call: morning, afternoon, or evening? Reply STOP to opt out, HELP for help.”

Template 4 — Missed-call text-back (if you support this trigger)
“Hi {first_name} — saw you tried to reach {BUSINESS_NAME}. Want to book a time for a quick call? Reply with a good time window. Reply STOP to opt out, HELP for help.”

Template 5 — Re-engagement (1 gentle attempt)
“Hi {first_name} — checking in on your {service} request. Do you still need help this week? Reply YES or NO. Reply STOP to opt out, HELP for help.”

3) STOP / HELP handling (implementation spec)
Goal: immediate compliance, global suppression, and auditable logs.

Keywords to handle (case-insensitive, trim whitespace/punctuation)
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- START/UNSTOP keywords (optional but recommended): START, YES, UNSTOP

Behavior
A) When inbound message matches STOP keyword:
1. Mark contact as “sms_opted_out=true” in a global suppression list (keyed by E.164 phone number).
2. Log an event: {type: “opt_out”, channel: “sms”, phone, timestamp_utc, source, message_body, provider_message_sid}.
3. Send ONE confirmation message (no marketing):
   “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4. Block all future outbound SMS to this phone unless resubscribed.

B) When inbound message matches HELP keyword:
1. Do NOT change subscription status.
2. Log event {type:“help”...}.
3. Reply:
   “{BUSINESS_NAME} appointment/text support. Reply STOP to opt out. Msg frequency varies. For help email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

C) When inbound message matches START/UNSTOP:
1. Only resubscribe if you have proof of prior consent OR you treat START as renewed consent.
2. Set sms_opted_out=false and log {type:“opt_in_restart”...}.
3. Reply:
   “You’re resubscribed. Msg frequency varies. Reply STOP to opt out, HELP for help.”

D) Outbound send-time guardrail
Before sending any outbound message:
- If sms_opted_out=true => do not send; log {type:“blocked_send_opted_out”...}.
- If outside quiet hours => queue message or delay; log {type:“delayed_quiet_hours”...}.

4) Quiet hours by timezone (implementation spec)
Goal: avoid texting at night; reduce complaints and blocks.

Default quiet hours window
- Quiet hours: 8:00 PM to 8:00 AM recipient local time (configurable per account).
- Allowed window: 8:00 AM to 8:00 PM.

Timezone resolution order
1) If lead provided zip/city/state: derive timezone from geo lookup.
2) Else if business account has service area/timezone: use that.
3) Else default to America/New_York (or business HQ) and mark timezone_confidence=low.

Send behavior
- If message is triggered during quiet hours: enqueue for next allowed window start (8:00 AM local). Keep original trigger timestamp in log.
- If multiple queued messages exist: send only the most recent “current state” message (avoid bursts).
- Emergency override (optional per account): allow sends during quiet hours only for transactional messages explicitly labeled “critical” (e.g., “tech is arriving now”). Default OFF.

DST
- Use IANA timezone IDs (e.g., America/Chicago). Never hardcode offsets.

Logging
- Store evaluated recipient_timezone, local_send_time, and whether the system delayed the send.

5) Consent logging schema (minimum)
Store these fields per lead/contact:
- phone_e164
- consent_status: opted_in | opted_out | unknown
- consent_source: webform | typeform | meta_lead_ads | manual | inbound_start
- consent_timestamp_utc
- consent_text_shown (exact disclosure string version or hash)
- form_url_or_ad_id
- ip_address (if captured)
- user_agent (if captured)
- opt_out_timestamp_utc (if applicable)
- provider (e.g., twilio) + last_message_sid

6) Twilio deliverability minimum steps (no spend assumptions)
- Use a Twilio Messaging Service (not raw from-number sends) to centralize compliance features and reporting.
- Enable “Advanced Opt-Out” on the Messaging Service if available; still implement app-level suppression as the source of truth.
- Avoid link shorteners; use full domain links.
- Keep templates consistent; avoid switching content patterns rapidly.
- Throughput: keep early pilots low volume; ramp gradually to avoid carrier flags.
- A2P 10DLC: if using US long code at scale, plan to register Brand + Campaign. For week-1 MVP, focus on consent + STOP/HELP + quiet hours so you can launch pilots while A2P paperwork is prepared.

7) Agency handoff (how to deploy in 30 minutes)
1) Pick lead source (Webflow/Typeform/Meta) and paste the corresponding opt-in disclosure.
2) Ensure Terms/Privacy links are filled with real URLs (do not launch with placeholders).
3) Confirm initial SMS template includes STOP/HELP line.
4) Turn on quiet hours (8a–8p local) for all new accounts.
5) Run a live test to your own phone:
   - Submit a form, confirm first SMS arrives fast.
   - Reply “HELP” and confirm help message.
   - Reply “STOP” and confirm opt-out confirmation.
   - Trigger another outbound message; confirm it is blocked.
6) If anything fails, email agent_bob_replit+lead-copilot@agentmail.to with:
   - phone number used (E.164)
   - timestamp
   - screenshots
   - provider message IDs (if available)

What’s intentionally deferred (post-pilot hardening)
- Full A2P 10DLC campaign taxonomy optimization (beyond MVP readiness)
- Multi-language compliance variants
- Complex preference centers beyond STOP/START
- Deep deliverability analytics dashboards

This kit is sufficient to launch pilots with minimal compliance risk while preserving speed-to-lead (the core value prop).