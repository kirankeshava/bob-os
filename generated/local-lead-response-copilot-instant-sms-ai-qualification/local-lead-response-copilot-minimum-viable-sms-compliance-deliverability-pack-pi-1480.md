# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Pilot‑Safe, Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:57:12.644Z

---

Business legitimacy references (include everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime scope)
Ship the minimum that prevents (a) carrier enforcement, (b) TCPA/CTIA complaints, (c) churn from “is this compliant?” objections. This pack is designed for fast pilot launches.

1) Required fields to capture for every lead (consent logging)
Store these in your CRM/Zapier storage/DB:
- lead_phone (E.164), lead_name (if available)
- lead_source (webform/typeform/fb_lead_ad/referral)
- consent_text_version (e.g., “v1.0-2026-04-09”)
- consent_timestamp_utc
- consent_ip (web only, if available)
- consent_url (page/form URL)
- consent_checkbox_value (true/false) OR “platform_default” for FB lead ads
- initial_message_id / provider_message_sid
- opt_out_status (active/opted_out)
- opt_out_timestamp_utc (if opted out)

2) Opt-in language (copy/paste)
Important: Use an unchecked checkbox for web forms where possible.

2.1 Webflow / website form checkbox
Label (next to checkbox):
“I agree to receive text messages about my inquiry from [BUSINESS NAME] at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Below checkbox (small text):
“By submitting, you confirm you are the owner/authorized user of this number and consent to receive automated texts related to your request. Privacy & Terms: [PRIVACY_URL] | [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

Hidden fields to pass along (recommended):
- consent_text_version=v1.0-2026-04-09
- consent_url={{current_page_url}}
- consent_checkbox_value=true

2.2 Typeform (single required statement + yes/no)
Question title:
“Text message consent (required)”

Description:
“To respond faster, we can text you about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy & Terms: [PRIVACY_URL] | [TERMS_URL].”

Choices:
- “Yes, text me about my request” (required to continue)
- “No, email/call only”

2.3 Meta/Facebook Lead Ads (custom disclaimer)
Add to the form’s disclaimer / custom question:
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] at the number provided regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy & Terms: [PRIVACY_URL] | [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

3) Minimum compliant message templates (pilot-safe)
Rules for all templates:
- No URL shorteners. If links are needed, use your domain.
- No ALL CAPS, no excessive punctuation, avoid “free/guaranteed/act now/urgent”.
- Keep first message strictly about the inquiry they submitted.

3.1 First response (send within 0–60 seconds)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address (or ZIP) for the job?”

3.2 Qualification follow-up (after address/zip)
“Thanks—what’s the main issue you want fixed? (1 sentence is fine).”

3.3 Booking handoff (when qualified)
“Perfect. Want to book a call or an appointment?
1) Call
2) Appointment
Reply 1 or 2. Reply STOP to opt out.”

3.4 Missed-call textback (optional)
“Hi {{first_name}}—sorry we missed you. Text me what you need help with and we’ll get you scheduled. Reply STOP to opt out.”

3.5 Re-engagement (only if consent exists; max 1)
“Hi {{first_name}}—checking in on your request for {{service}}. Do you still need help? Reply YES or NO. Reply STOP to opt out.”

4) STOP/HELP handling (must implement)
4.1 Keywords (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

4.2 Behavior
On inbound STOP keyword:
- Immediately mark number as opted_out=true in a GLOBAL suppression list (applies across all clients/tenants unless you maintain tenant-scoped numbers; safest is global).
- Block all future outbound messages to that number (including automated sequences, reminders, and manual sends).
- Reply once (and only once per STOP event):
  “You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.”

On inbound HELP keyword:
- Do NOT opt-out.
- Reply:
  “{{business_name}}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

On any message from an opted-out number:
- Do not respond with marketing/qualification.
- Optional: respond once with a reminder:
  “You’re currently opted out. Reply START to resubscribe.”
(Only implement START resubscribe if you can log it clearly. Otherwise omit.)

4.3 Audit logging requirements
Log every inbound STOP/HELP with:
- timestamp_utc, from_number, to_number, raw_body, matched_keyword, action_taken, message_provider_sid

4.4 Verification test matrix (no paid traffic required)
Run these in staging:
- Send “STOP” → expect opt_out=true + confirmation reply + outbound blocked
- Send “Help” → expect help reply + opt_out unchanged
- Send “cancel” → treated as STOP
- Send “STOP.” (with punctuation) → treated as STOP
- After STOP, attempt outbound send → must hard-fail (do not silently send)

5) Quiet hours by timezone (minimum viable)
Objective: avoid late-night texting, reduce complaints.

5.1 Default window
Allowed send window: 8:00 AM to 8:00 PM lead-local time, daily.

5.2 Timezone resolution order
1) If lead provides ZIP/address → map to timezone
2) Else if area code lookup available → infer timezone
3) Else default to business timezone (configurable) and be conservative

5.3 Behavior when outside window
- Queue the message and send at next window start (8:00 AM lead-local).
- If message is time-sensitive (e.g., “confirm appointment in 30 min”), degrade to email task or internal notification instead of sending SMS.

5.4 Edge cases
- Daylight savings: rely on IANA timezone (e.g., America/Chicago) not numeric offsets.
- If timezone unknown: use business timezone AND restrict to 9 AM–6 PM to reduce risk.

6) Twilio deliverability minimums (pilot)
No spend actions here; this is configuration guidance.
- Use a Twilio Messaging Service (rather than ad-hoc numbers) to centralize compliance features and metrics.
- Enable Smart Encoding / avoid MMS unless necessary.
- Maintain a single consistent sender per client where possible.
- Keep templates short, personalized ({{first_name}}, {{service}}), and inquiry-specific.
- Avoid link-only messages; avoid repeated identical blasts.

A2P 10DLC note (US long code)
- For scaling beyond tiny pilot volume, register Brand + Campaign (A2P 10DLC). Initiation may be free but typically involves carrier fees later; do not spend without approval.

7) Agency handoff: “paste this, then go live”
Implementation steps (no code version):
1) Add consent checkbox + disclosure to the form (Webflow/Typeform) OR add disclaimer to FB Lead Form.
2) Ensure the form passes: phone, name, service, address/zip (if possible), plus consent fields.
3) Configure automation to send Template 3.1 immediately.
4) Implement STOP/HELP parsing + global suppression before any further automation.
5) Turn on quiet hours: 8a–8p lead-local; queue outside window.
6) Run the verification test matrix and save logs (screenshots or exported rows) before running paid ads.

Sales objection one-liner (agencies can paste)
“We capture explicit SMS consent on every lead (with timestamp + source), include STOP/HELP in disclosures, enforce global opt-out suppression, and respect quiet hours by lead timezone. This keeps carrier risk low and prevents TCPA/CTIA issues. Proof/support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | agent_bob_replit+lead-copilot@agentmail.to.”
