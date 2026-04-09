# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:40:01.243Z

---

Purpose (wartime MVP)
This document covers ONLY the compliance/deliverability items that most often block pilots, trigger carrier filtering, or create immediate churn: (1) clear opt-in language, (2) STOP/HELP handling, (3) quiet hours, (4) consent logging, and (5) basic content guidelines. Use this to launch pilots safely while keeping setup lightweight.

Business legitimacy links (use everywhere)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to
(If Privacy/Terms pages are published, replace the placeholders below with those final URLs.)

1) Opt-in language (copy/paste)
A. Webflow / website form checkbox (recommended)
Add a required checkbox with this label:
“Text me about my request and appointment. I agree to receive automated SMS from {BUSINESS_NAME} at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
Implementation notes:
- Checkbox must be unchecked by default.
- Store checkbox value + timestamp + page URL.
- If no checkbox is possible, include the same language directly under the submit button.

B. Typeform (consent statement)
Add a short “Statement” block immediately before the phone field or submit step:
“By submitting, you agree to receive automated SMS from {BUSINESS_NAME} about your request. Consent not required to buy. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

C. Meta/Facebook Lead Ads (disclaimer)
Add to the Lead Form “Privacy Policy” / “Custom Disclaimer”:
“I agree to receive automated SMS from {BUSINESS_NAME} regarding my inquiry and scheduling. Consent not required to purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
Meta setup reminders:
- Ensure the form collects phone number.
- Keep business name consistent with the sending brand.

2) First message + qualification templates (carrier-safe)
Guidelines: keep messages short, clear, and directly tied to the user’s request. Avoid ALL CAPS, excessive punctuation, and “promo” language.

Template 1 — Instant response (send within 0–60 seconds)
“Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address/ZIP for the job?”

Template 2 — Next qualification
“Thanks. When would you like us to come out? Reply 1) ASAP 2) This week 3) Next week”

Template 3 — Booking handoff
“Perfect — I can book you. What’s the best time window: morning, afternoon, or evening?”

Template 4 — Confirmation
“Booked: {day} {time_window}. Reply YES to confirm or reply NO to pick another time. Reply STOP to opt out.”

Template 5 — Missed-call text back (if applicable)
“Sorry we missed you — this is {BUSINESS_NAME}. Want to book an appointment? Reply 1 for first available, or tell me what day works. Reply STOP to opt out.”

Template 6 — Re-engagement (1 attempt only, 24–72h later)
“Hi {first_name} — still want help with {service}? Reply YES and I’ll book you, or STOP to opt out.”

3) STOP / HELP handling (must be global)
A. Keywords to treat as STOP (case-insensitive, trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
On receipt:
1) Immediately mark recipient as opted-out in a global suppression list (applies across all campaigns, numbers, and clients under the same sender/brand as required).
2) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to”
3) Block all future outbound messages to that phone unless they re-opt-in.

B. Keywords to treat as HELP
HELP, INFO
Response (single message):
“{BUSINESS_NAME}: Texts are about your inquiry/booking. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to {WEBSITE_URL}”

C. Re-subscribe keywords
START, YES, UNSTOP
Only allow re-subscribe if:
- user explicitly sends START/UNSTOP/YES after being opted out
- log event with timestamp
Confirmation:
“You’re re-subscribed. Reply STOP to opt out anytime.”

D. Logging (minimum for audit)
For every inbound STOP/HELP/START event store:
- phone (E.164)
- keyword detected
- timestamp (UTC)
- messaging provider message SID
- client/account id
- action taken (suppressed / help sent / re-subscribed)

4) Quiet hours (minimum viable)
Goal: do not send automated texts at night in the lead’s local time.
Default quiet hours (recommended): 9:00 PM – 8:00 AM local time.

Timezone resolution order:
1) Explicit timezone from form (best)
2) Lead ZIP/postal code -> timezone lookup
3) Phone number area code heuristic
4) Fallback: business timezone

Behavior:
- If a lead arrives during quiet hours, queue the first outbound SMS for 8:05 AM local time.
- If the lead responds during quiet hours, you may respond (reply) immediately ONLY if it’s a direct human-initiated interaction rule you choose; otherwise queue.
- Always log: original intended send time, queued time, and actual send time.
Edge case: unknown timezone -> use business timezone and queue if between 9 PM–8 AM business time.

5) Consent logging (minimum viable)
Store, at lead creation:
- phone number
- opt-in text version (exact string shown)
- checkbox value or equivalent (true/false)
- timestamp
- source (Webflow/Typeform/Meta)
- page/form URL
- IP address (if available)
- privacy/terms URLs presented at the time
This is what agencies need to defend complaints and is the fastest way to eliminate “compliance risk” objections.

6) Twilio deliverability (minimum viable guidance)
- Use a Twilio Messaging Service (not ad-hoc numbers) for pooling and compliance features.
- Keep templates consistent; avoid link shorteners; prefer no links in the first message.
- Keep the first message clearly tied to the lead’s request (“got your request for X”).
- If scaling on local long codes, plan A2P 10DLC Brand + Campaign registration; if unsure, start pilots low-volume first to validate.

7) Agency go-live checklist (10 minutes)
1) Add opt-in language to the form (Webflow/Typeform/Meta) using the snippets above.
2) Confirm phone field is required and captured.
3) Confirm Privacy + Terms URLs are live and referenced.
4) Test STOP: submit a lead with your phone -> receive first text -> reply STOP -> confirm you receive opt-out confirmation -> confirm no further texts.
5) Test HELP: reply HELP -> confirm help message.
6) Test quiet hours: temporarily set quiet window to current time, submit a lead -> confirm message queues, then sends at window end.

If anything fails, contact: agent_bob_replit+lead-copilot@agentmail.to and include message SIDs and timestamps.
