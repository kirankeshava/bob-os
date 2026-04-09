# Local Lead Response Copilot — Pilot-Safe SMS Compliance Pack (Opt-in + STOP/HELP + Quiet Hours + Consent Logs + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:42:07.822Z

---

Purpose (minimum viable, pilot-safe)
This pack contains the smallest set of compliance + deliverability requirements needed to run paid pilots for Local Lead Response Copilot (instant SMS + AI qualification) without triggering common carrier/TCPA/CTIA failures. It is designed for agencies/implementers to copy/paste into forms and ad lead flows. Reference for legitimacy/support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt-in language (use one per lead source)
A) Webflow / Website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages about my request from [BUSINESS NAME] (and its service provider, Local Lead Response Copilot) at the phone number I provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under-checkbox helper text (small):
“By submitting, you confirm you are the subscriber/authorized user of this number. Consent is not a condition of purchase.”
Link line (footer near submit):
“Terms: [TERMS_URL] | Privacy: [PRIVACY_URL]”

B) Typeform (form description + required question)
Form description (top):
“We’ll text you shortly about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]”
Required Yes/No question:
“Do you agree to receive text messages about this request at the number you provided?”
Yes option text: “Yes, text me”
No option text: “No, email/call only”
Routing note: If “No”, do not trigger SMS; send email or task only.

C) Meta/Facebook Lead Ads (best-effort within platform constraints)
Lead form “Custom disclaimer” (paste):
“By submitting, you agree to receive text messages about your request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Consent not required to purchase.”

2) Compliant first SMS + qualification template (low-spam phrasing)
First message (send immediately after lead capture):
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. We just got your request for {{service}}. Are you looking to schedule an estimate today or this week? Reply 1) Today 2) This week 3) Just pricing.
Reply STOP to opt out, HELP for help.”

Qualification follow-up (based on reply):
“Got it—what’s the job address or ZIP code? (So we can confirm availability.) Reply STOP to opt out, HELP for help.”

Booking prompt:
“Thanks. What time window works best? 1) Morning 2) Afternoon 3) Evening. Or share a preferred time.
Reply STOP to opt out, HELP for help.”

3) STOP/HELP handling (must implement)
Keyword matching (case-insensitive; trim punctuation/spaces):
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

Behavior requirements:
A) On inbound STOP keyword:
- Immediately mark the sending phone number as opted_out=true in a GLOBAL suppression list (account-wide; not just per campaign).
- Send a single confirmation message:
“You’re unsubscribed and will no longer receive texts from {{business_name}}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- Do not send any other SMS afterwards unless the user explicitly re-subscribes.

B) On inbound HELP keyword:
Send:
“{{business_name}} messaging help: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

C) Optional resubscribe handling (recommended)
START keywords: START, YES
On START: set opted_out=false and send:
“You’re re-subscribed. Reply STOP to opt out anytime.”

D) Outbound gating (non-negotiable)
Before ANY outbound send, check suppression list. If opted_out=true, block send and log reason “suppressed_opt_out”.

4) Quiet hours (minimum viable)
Goal: avoid late-night texting and reduce complaints.
Default sending window: 8:00 AM – 8:00 PM recipient local time (can be configured per business).
Timezone resolution order:
1) If lead captured timezone exists (from form/device), use it.
2) Else infer timezone from lead phone area code (best-effort) OR lead ZIP if provided.
3) Else use business timezone.
If message would send outside window:
- Queue message and schedule for next allowed time (e.g., next day at 8:05 AM).
- If lead is “high urgency” (e.g., emergency service) require explicit business override flag; otherwise still queue.

5) Consent logging schema (for audits + disputes)
Store for every lead:
- lead_id
- phone_e164
- consent_status: opted_in | opted_out | unknown
- consent_source: webflow | typeform | facebook_lead_ad | manual | import
- consent_timestamp_utc
- consent_ip (if available)
- consent_user_agent (if available)
- consent_form_url (page URL where consent was captured)
- consent_language_version (hash of opt-in text)
- terms_url_at_capture, privacy_url_at_capture
- opt_out_timestamp_utc (if any)
- last_message_timestamp_utc
Retention: keep consent + opt-out logs minimum 4 years (or longer if the business requires).

6) 10-minute agency go-live checklist (copy/paste)
1) Add the opt-in checkbox/disclaimer to the lead form (Webflow/Typeform/FB lead form).
2) Confirm Terms + Privacy URLs are live and pasted in the disclaimer.
3) Send yourself a test lead and confirm first SMS includes STOP/HELP line.
4) Reply “HELP” and verify help message returns.
5) Reply “STOP” and verify: (a) confirmation message sent (b) no further texts are sent.
6) Reply “START” (if supported) and verify resubscribe works.
7) Send a test lead at 9:30 PM local time; verify message is queued and sent next window.

7) Content guardrails (deliverability basics)
- Avoid ALL CAPS, excessive punctuation, and “free/guaranteed/act now” spam phrasing.
- Keep links minimal; if used, prefer branded domain and avoid URL shorteners.
- Identify the business in the first message (“this is X with Y”).
- Do not mention sensitive personal attributes; keep questions service-related (time, ZIP, job type).

Implementation note
This pack is intentionally minimal for pilots. The only hard requirements to avoid immediate issues are: (1) clear opt-in language at capture, (2) STOP/HELP implemented with global suppression, (3) outbound gating on suppression list, and (4) quiet-hours queueing.

Support
If an agency needs confirmation of compliance posture or wants the latest version of these snippets, direct them to agent_bob_replit+lead-copilot@agentmail.to and the website URL above.