# Local Lead Response Copilot — Minimum Viable Pilot Launch Compliance Pack (Opt‑In, STOP/HELP, Quiet Hours, Consent Logging, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:15:11.136Z

---

Purpose (wartime MV-compliance)
This pack is the minimum required to launch paid pilots without getting blocked by carriers or creating TCPA/CTIA exposure. It focuses on (1) clear consent capture, (2) STOP/HELP handling + suppression, (3) quiet hours by timezone, and (4) consent logging for audit.

Business legitimacy references (include in proposals/templates)
- Product site (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt-in language (required)
A) Webflow / Website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages from [BUSINESS NAME] about my inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under checkbox (small text):
“By submitting, you confirm you are the subscriber or authorized user of the number provided. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

B) Typeform (statement + required Yes)
Add a required question: “Do you agree to receive text messages about your request?” Answers: Yes/No.
Description text:
“By selecting Yes, you consent to receive SMS from [BUSINESS NAME] regarding your inquiry (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

C) Meta/Facebook Lead Ads (copy for ‘Custom disclaimer’)
“By submitting this form, you consent to receive text messages from [BUSINESS NAME] about your inquiry (appointment scheduling and service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2) Message templates (MV-safe, high deliverability)
Template 1 — First response (immediate)
“Hi {{first_name}}, this is {{agent_or_company}}. Got your request for {{service}}. What’s the address/ZIP for the job?”
(If needed add a second message after reply, not in the first message.)

Template 2 — Qualification (keep short)
“Thanks. When would you like us to come out—today, tomorrow, or later this week?”

Template 3 — Booking handoff
“Perfect—want to book a quick call or a specific appointment time? Reply with (1) Call or (2) Appointment.”

Template 4 — STOP/HELP footer (only when appropriate)
Do NOT append “Reply STOP…” to every single message if it bloats content; include it in initial consent disclosure and periodic/long threads. If a carrier/account policy requires it, append this footer to the first outbound after opt-in:
“Reply STOP to opt out, HELP for help.”

3) STOP/HELP handling (implementation spec)
Keywords (case-insensitive, trimmed):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO
Behavior:
A) On STOP keyword inbound:
- Immediately mark recipient as opted_out=true in a global suppression list keyed by phone_e164.
- Log event: event_type=opt_out, source=inbound_sms, keyword={{matched_keyword}}, timestamp.
- Send a single confirmation message:
  “You’re opted out and will no longer receive texts from {{brand}}. Reply START to re-subscribe.”
- Block all future outbound messages to that number across all subaccounts/clients (global suppression), unless explicit re-opt-in.

B) On HELP keyword inbound:
- Do NOT change opt-in status.
- Reply once:
  “{{brand}}: We text about your inquiry/appointments. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

C) Re-opt-in:
- Only process START/YES (optional) to clear opted_out if you have a record of prior consent and your policy allows it.
- Send confirmation:
  “You’re re-subscribed. Reply STOP to opt out.”

4) Quiet hours by timezone (implementation spec)
Goal: avoid sending between 9pm–8am recipient local time (default window; adjust per client).
Timezone resolution order:
1) Explicit timezone stored on lead (from form field or CRM)
2) Derived from lead address ZIP/postal code
3) Derived from phone number area code (fallback)
4) Default to client’s timezone if unknown
Rules:
- If current local time is within quiet hours: queue the message and send at next allowed time (e.g., 8:05am local).
- If lead submits during quiet hours: send a single immediate acknowledgement only if legally allowed and non-promotional; otherwise queue everything.
- Emergency override: allow client admin to bypass quiet hours per conversation (logged with actor + reason).
Logging:
- Store computed_timezone, quiet_hours_applied=true/false, queued_until timestamp.

5) Consent logging (must-have fields)
Store a consent record per phone number per client:
- phone_e164
- client_id
- consent_status: opted_in / opted_out
- consent_source: webform / typeform / fb_lead_ad / manual
- consent_timestamp
- consent_text_version (hash of opt-in wording)
- landing_page_url or form_id
- ip_address (if available)
- user_agent (if available)
- proof_payload (raw lead payload or normalized JSON)
Also store opt-out events (keyword, timestamp) and outbound send attempts blocked due to suppression.

6) Agency go-live checklist (30 minutes)
1) Add opt-in checkbox/statement to the lead source (Webflow/Typeform/FB) using the snippet above.
2) Ensure Terms/Privacy URLs are present (publish pages, then replace [TERMS_URL]/[PRIVACY_URL]).
3) Confirm the first outbound message template does not include spammy wording (no ALL CAPS, no “FREE!!!”, no link shorteners).
4) Test STOP:
   - Send STOP from a test phone.
   - Confirm: opt-out confirmation is received; further outbound is blocked and logged.
5) Test HELP:
   - Send HELP.
   - Confirm help message includes support email agent_bob_replit+lead-copilot@agentmail.to.
6) Test quiet hours:
   - Simulate a lead at 9:30pm local; confirm queued send at next allowed time.

If anything fails, pause sending and contact support: agent_bob_replit+lead-copilot@agentmail.to (include client name, sending number, timestamps, and example phone numbers in E.164).
