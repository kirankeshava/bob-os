# Local Lead Response Copilot — Minimum Viable SMS Compliance & Deliverability Pack (Agency + Engineering Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:08:43.601Z

---

Purpose (wartime): Ship the minimum compliance/deliverability requirements that remove pilot launch objections and prevent the most common carrier/TCPA issues. This is not a law firm document; it is an implementation playbook for agencies and engineering.

Business legitimacy references (use everywhere):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Opt-in / Consent language (copy/paste)
A. Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request, appointment, and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under form (small text):
“By submitting, you confirm you are the subscriber/owner of the number provided and consent to receive SMS regarding your inquiry. View Terms and Privacy: [TERMS_URL] | [PRIVACY_URL].”
Implementation notes:
- Checkbox should be unchecked by default.
- Store: consent_checkbox=true, timestamp, IP, page URL, and form version.

B. Typeform consent statement
Add a “Legal” statement block directly before submission:
“Consent: By submitting, you agree to receive SMS messages about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

C. Meta/Facebook Lead Ads (highly recommended fields)
In the “Disclaimer” / “Privacy Policy” area (and/or custom question description):
“By submitting this form, you consent to receive text messages about your inquiry, scheduling, and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

2) Message templates (safe defaults)
Guidelines: keep messages short, no URL shorteners, no excessive punctuation/caps, don’t imply prior relationship, include STOP notice in first message.

Template 1: First response (immediate)
“Hi {{first_name}}, this is {{business_name}}. Got your request for {{service}}. A couple quick questions to get you the fastest quote—ok? Reply STOP to opt out.”

Template 2: Qualification Q1 (job type)
“Great—what type of help do you need? (1) Repair (2) Replace (3) Estimate (4) Other”

Template 3: Qualification Q2 (timing)
“When do you want this done? (1) ASAP (2) This week (3) Next 2–4 weeks (4) Just researching”

Template 4: Booking handoff
“Thanks. Want to book a quick call? Reply 1 for the next available time today, or 2 and I’ll offer times.”

Template 5: Missed-call textback
“Sorry we missed you—this is {{business_name}}. What’s the address/ZIP for the job? Reply STOP to opt out.”

Template 6: Re-engagement (1x only)
“Hi {{first_name}}—still want help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

3) STOP/HELP handling (engineering spec)
Keywords to treat as opt-out (case-insensitive, trim punctuation/whitespace):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Required behavior:
- On receiving an opt-out keyword: mark recipient as “opted_out=true” in a global suppression list scoped to (sending_number OR messaging_service) AND optionally across the customer account (recommended: account-wide suppression).
- Send one confirmation message (only once per opt-out event):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- After opt-out: block all outbound messages to that phone until explicit resubscribe.

HELP keywords:
HELP, INFO
Required response:
“{{business_name}} texting support. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

START (resubscribe) keywords:
START, YES, UNSTOP
Behavior:
- Only allow resubscribe if prior opt-out exists.
- Confirmation:
“You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”

Audit logging (minimum fields):
- phone_e164, customer_id, sending_number/messaging_service_sid, inbound_body_raw, normalized_keyword, event_type (STOP/HELP/START/OTHER), timestamp_utc, source (twilio_webhook), message_sid, suppression_state_before/after.

4) Quiet hours (engineering spec)
Goal: avoid messaging at night; reduce complaints.
Default quiet hours (configurable per client): 8:00pm–8:00am recipient local time.
Timezone resolution order:
1) Explicit timezone captured from form/CRM (best)
2) Lead ZIP/postal code lookup
3) Area code heuristic (fallback)
4) If unknown: treat as business timezone and apply conservative window
Behavior:
- If a message is triggered during quiet hours: queue it for next allowed time (e.g., 8:05am local).
- If lead is “hot” (e.g., replied within last 10 minutes), allow responses even in quiet hours ONLY if the user initiated the conversation (inbound message received after quiet start). Otherwise queue.
- Always allow STOP/HELP responses immediately (compliance messages bypass quiet hours).
Logging:
- log quiet_hours_applied=true/false, computed_timezone, scheduled_send_time_utc.

5) Twilio deliverability minimums (no-spend defaults)
- Use a Twilio Messaging Service (even for low volume) to manage numbers, sticky sender, and callbacks.
- Avoid link shorteners; prefer branded full URLs.
- Keep first message human and contextual (“got your request for…”), avoid “free/guarantee/act now” language.
- Maintain a suppression list at app level even if Twilio handles STOP, to prevent accidental sends from other channels.
- If sending significant volume from local long code (10DLC): plan A2P 10DLC Brand + Campaign registration before scaling. If not registered, keep volume low and focus on high-intent replies.

6) Agency go-live checklist (copy/paste)
Pre-launch:
- Confirm opt-in language present in the lead source (Webflow/Typeform/FB).
- Confirm lead payload includes: phone, first name, service, ZIP/city, consent=true, consent_timestamp.
- Confirm legal links: Terms URL + Privacy URL are live (no placeholders).
- Confirm quiet hours configured for client.
- Confirm STOP/HELP tested.

Verification test matrix (run in staging):
1) Send “STOP” inbound → expect suppression=true + confirm message + outbound blocked.
2) After STOP, trigger outbound (e.g., new lead) → expect blocked + logged.
3) Send “HELP” inbound → expect help message.
4) Send “START” inbound after STOP → expect resubscribed + outbound allowed.
5) Trigger message at 11pm local → expect queued for morning (except STOP/HELP).

Support note for agencies to include:
“If you have any compliance questions or need audit logs, contact agent_bob_replit+lead-copilot@agentmail.to and reference https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
