# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:38:22.661Z

---

Business legitimacy links (use in proposals/forms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime scope): remove the #1 launch blockers for pilots—unclear consent, missing STOP/HELP, texting outside reasonable hours, and no audit trail.

1) REQUIRED OPT‑IN LANGUAGE (copy/paste)
A) Webflow / Website form checkbox (recommended)
Checkbox label: “Yes, text me about my request.” (unchecked by default)
Under form submit button (small text):
“By submitting, you agree to receive SMS messages about your request from [BUSINESS NAME] via Local Lead Response Copilot. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”
Implementation notes:
- Store checkbox value + timestamp + page URL.
- Never pre-check the checkbox.

B) Typeform (consent statement)
Add a required Yes/No question before submission:
Question: “Can we text you about this request?”
Choices: Yes / No
Description:
“By selecting Yes, you consent to receive SMS messages about your request from [BUSINESS NAME] via Local Lead Response Copilot. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
Routing rule: if No → show thank-you + alternative contact (“Please call us at [PHONE]”).

C) Meta/Facebook Lead Ads (privacy policy + custom disclaimer)
- Connect the client’s Privacy Policy URL in the Lead Form settings.
- Add custom disclaimer (short):
“By submitting, you agree to receive texts about your request from [BUSINESS NAME]. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

2) DEFAULT COMPLIANT MESSAGE TEMPLATES (safe, low-spam)
Template variables: {firstName}, {businessName}, {service}, {city}, {link}, {agentName}

Message #1 (instant response)
“Hi {firstName}—this is {agentName} with {businessName}. Got your request for {service}. Are you looking to get this done in the next (A) 0–7 days, (B) 1–4 weeks, or (C) just researching? Reply A/B/C. Reply STOP to opt out.”

Qualification follow-up (only if they reply)
“Thanks. What’s the address or ZIP where the work is needed? Reply with ZIP. Reply STOP to opt out.”

Booking prompt (high intent)
“Perfect—want to book a quick call or appointment? Reply 1 for ‘Call me’, 2 for ‘Send available times’. Reply STOP to opt out.”

If user asks for times
“Here are two options: (1) Today 4–6pm or (2) Tomorrow 9–11am. Reply 1 or 2. Reply STOP to opt out.”

Missed-call text-back (if using call tracking)
“Hi—sorry we missed your call. This is {businessName}. What service do you need and what’s your ZIP? Reply here. Reply STOP to opt out.”

Re-engagement (only to leads with consent; limit to 1 attempt)
“Hi {firstName}—checking in: do you still need help with {service}? Reply YES or NO. Reply STOP to opt out.”

Content guardrails (deliverability):
- Avoid: “FREE”, “GUARANTEED”, excessive caps, multiple links, URL shorteners, “act now”, repeated emojis.
- Keep first message under ~240 chars when possible.
- Put STOP line in first message and any broadcast-like messages.

3) STOP/HELP HANDLING (MUST IMPLEMENT)
Keywords (case-insensitive; trim punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

Behavior:
A) On inbound STOP keyword:
- Immediately mark recipient as opted_out=true in a GLOBAL suppression list (across all client subaccounts/workspaces).
- Send one final confirmation message:
“You’re opted out and will no longer receive texts from {businessName}. Reply HELP for help.”
- Block ALL future outbound messages to this number unless user later re-consents via a new form submission with fresh timestamp and source.

B) On inbound HELP keyword:
Send:
“{businessName} messaging support: {supportEmail}. Msg frequency varies. Reply STOP to opt out.”
Use support email: agent_bob_replit+lead-copilot@agentmail.to

C) Any outbound attempt to a suppressed number:
- Do not send.
- Log event: blocked_reason=opted_out.

Logging (minimum audit fields):
- phone_e164
- event_type: consent_captured | sms_inbound | sms_outbound | opt_out | help_request | blocked
- timestamp_utc
- message_body (inbound/outbound)
- source (webflow/typeform/meta/manual)
- consent_text_version (hash or version string)
- landing_page_url / form_id
- client_workspace_id

4) QUIET HOURS (MINIMUM IMPLEMENTATION)
Recommended quiet window: 8:00pm–8:00am recipient local time.

Timezone resolution order:
1) If lead form provides ZIP → map ZIP to timezone.
2) Else if area code mapping available → approximate timezone.
3) Else default to client’s business timezone.

Send behavior:
- If message would be sent during quiet hours: queue it for next allowed window (8:05am local).
- Exception (optional): if the user texts first during quiet hours, allow responses for the next 30 minutes (conversation window), but still suppress proactive marketing.

Edge cases:
- DST: use IANA tz database (e.g., America/Chicago).
- Unknown timezone: default to client tz; do not attempt multiple sends.

5) TWILIO DELIVERABILITY SETUP (NO-SPEND STEPS)
- Use a Twilio Messaging Service (recommended) with:
  - Sticky Sender ON
  - Smart Encoding ON
  - Dequeue/queue handling aligned with quiet hours
  - Opt-out keywords handled at application level (still keep Twilio’s built-in where possible)
- A2P 10DLC: if using local long code at scale, plan to register Brand + Campaign. (Some routes may later incur carrier fees—get approval if/when required.)
- Monitoring: track delivery statuses (sent/delivered/undelivered/failed) and filter rate by template.

6) AGENCY GO‑LIVE CHECKLIST (PILOT READY)
Before launch:
- Confirm lead source (Webflow/Typeform/Meta) and paste the correct opt-in snippet.
- Verify consent capture fields are stored.
- Turn on STOP/HELP handling and global suppression.
- Enable quiet hours queueing.
- Send internal test lead → confirm Message #1 is received.
- Send “HELP” → confirm help response.
- Send “STOP” → confirm confirmation + all future outbound blocked.

Sales objection rebuttal (paste into agency proposal):
“We use explicit SMS consent language on every form/ad, include STOP/HELP instructions, enforce quiet hours by recipient timezone, and maintain consent + opt-out logs for auditing. This reduces carrier filtering and keeps messaging compliant so speed-to-lead improves without account risk.”

Owner next steps (to finish hardening fast):
1) Publish Privacy Policy + Terms pages on the website and set [PRIVACY_URL]/[TERMS_URL] in all snippets.
2) Run the STOP/HELP verification matrix in staging with real inbound messages and save logs as proof for agencies.
3) Decide route: 10DLC vs toll-free; if 10DLC, start Twilio A2P registration workflow (no spend assumed to start; request approval if fees appear).
