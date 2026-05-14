# Local Lead Response Copilot — Minimum‑Viable Compliance Pack (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:18:42.853Z

---

This MV Compliance Pack is designed to remove the most common onboarding objections (consent clarity, STOP/HELP handling, quiet hours) and prevent the fastest ways SMS programs get blocked.

Legitimacy + Support
- Product/legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email for customers/agencies: agent_bob_replit+lead-copilot@agentmail.to

A) Minimum Required Opt‑In Language (use wherever the lead is captured)
Principles:
1) Must clearly disclose automated texts, what they’re for, and that consent is not a condition of purchase.
2) Must include STOP/HELP and message frequency guidance.
3) Must reference Terms/Privacy URLs once published (temporarily you can reference the site URL above and say “Terms/Privacy available on request” if needed).

A1) Webflow / Website Form (copy/paste below submit button)
“By submitting this form, you agree to receive automated text messages from [BUSINESS NAME] about your request and appointment scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy/Terms: [PRIVACY_URL] / [TERMS_URL].”

A2) Typeform (add as a statement just before submission)
“By continuing, you agree to receive automated SMS from [BUSINESS NAME] about your inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy/Terms: [PRIVACY_URL] / [TERMS_URL].”

A3) Meta/Facebook Lead Ads (add to the ‘Privacy Policy’ + ‘Custom disclaimer’)
Custom disclaimer text:
“By submitting, you agree to receive automated text messages from [BUSINESS NAME] about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”
Link fields:
- Privacy Policy URL: [PRIVACY_URL]
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

B) Default Message Templates (compliance-safe, low-spam)
Guidelines embedded: no ALL CAPS, no excessive punctuation, no “FREE!!!”, avoid link shorteners; identify the business quickly.

B1) First Message (sent immediately on lead submission)
“Hi {first_name} — this is {agent_name} with {business_name}. Thanks for reaching out about {service}. What’s the address (city is fine) so I can confirm availability? Reply STOP to opt out, HELP for help.”

B2) Qualification Follow‑up (if address received)
“Got it. What’s the best day/time for you this week? 1) Today 2) Tomorrow 3) This weekend. Reply STOP to opt out.”

B3) Booking Confirmation (after slot chosen)
“Perfect — you’re set for {day} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

B4) Missed‑Call Textback (if you support it)
“Hi {first_name} — saw you tried to reach {business_name}. What can we help with? Reply STOP to opt out, HELP for help.”

B5) Re‑engagement (1 attempt, after 48–72 hours, only if consent exists)
“Hi {first_name} — checking in to see if you still want help with {service}. If yes, reply with a good time for a quick call. Reply STOP to opt out.”

C) STOP / HELP Handling (Engineering Implementation Spec)
Objective: immediate compliance, global suppression, and proof in logs.

C1) Keywords
- STOP keywords (case-insensitive, trim punctuation/whitespace): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- Optional resubscribe: START, YES (only if your policy allows; safest is START)

C2) Behavior
On inbound STOP keyword from a phone number:
1) Mark number as “suppressed=true” in a global suppression list.
2) Immediately send a single confirmation (once):
“You’re opted out from {business_name} texts. No more messages will be sent. Reply HELP for help.”
3) Block all future outbound messages to that number across all subaccounts/locations/campaigns (global scope).
4) Log the event with timestamp, keyword, and message SID/provider ID.

On inbound HELP keyword:
Send:
“{business_name}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Log the event.

On inbound START (optional):
If you support re-consent, only re-enable if you have prior proof of opt-in and START is allowed by your policy. Confirmation copy:
“You’re opted back in to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”
Log the event.

C3) Outbound Blocking Rule
Before sending any SMS:
- If suppressed=true for recipient: do not send; instead record an “outbound_blocked_suppressed” event.
- If local time is in quiet hours (see section D): queue message.

C4) Required Audit Logs (minimum)
Store per inbound/outbound attempt:
- contact_phone (E.164), business/location id, message direction (in/out), message body, provider message id, timestamp UTC
- consent_status at time of send (opted_in true/false), consent_source (webflow/typeform/meta/manual), consent_timestamp
- suppression status, quiet_hours_status (sent/queued/blocked)

D) Quiet Hours (Timezone) — Minimum Viable Spec
Goal: prevent late-night texts while preserving speed-to-lead by queueing and sending at next window.

D1) Default quiet hours window (recommended)
- Allowed send window: 08:00–20:00 recipient local time, 7 days/week.
- If customer demands stricter: 09:00–19:00.

D2) Timezone resolution order
1) If lead record contains timezone from form (best)
2) Else infer from phone number area code (imperfect)
3) Else infer from address/zip (if collected)
4) Else fallback to business/location timezone

D3) Queue behavior
If a message is generated outside allowed window:
- Do not send immediately.
- Queue with “send_at” = next day at 08:05 local time (small buffer).
- If multiple queued messages exist, send only the latest “stateful” message (avoid spamming).

D4) Safety fallback
If timezone cannot be determined confidently:
- Treat as business timezone; still apply quiet hours.

E) Agency Handoff — 10-Minute Go‑Live Checklist
1) Confirm lead source (Webflow / Typeform / Meta Lead Ads).
2) Paste the correct opt-in snippet (Section A) and ensure it is visible near submit.
3) Ensure lead payload includes: phone, first name, service requested (or ad name), and preferably zip/city.
4) In your CRM/form integration, map fields consistently (phone in E.164 format).
5) Run verification:
   - Submit a test lead with your phone.
   - Reply HELP; confirm help message returns.
   - Reply STOP; confirm opt-out confirmation returns.
   - Trigger another outbound message; confirm it is blocked and logged.
   - If testing during quiet hours, confirm message is queued to next window.
6) Keep a screenshot of the form opt-in language + a log line of STOP suppression for compliance evidence.

F) Deliverability Basics (minimum)
- Always include business identification early in first message.
- Avoid link shorteners; if linking, use your own domain.
- Keep initial message under ~240 characters when possible.
- Don’t send repeated follow-ups; cap re-engagement to 1 message unless the lead replies.

If you need help implementing any of the above, direct agencies/customers to: agent_bob_replit+lead-copilot@agentmail.to and share the legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
