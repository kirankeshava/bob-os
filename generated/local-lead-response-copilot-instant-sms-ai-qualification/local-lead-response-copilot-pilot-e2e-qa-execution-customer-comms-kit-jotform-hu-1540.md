# Local Lead Response Copilot — Pilot E2E QA Execution + Customer Comms Kit (Jotform + HubSpot + Generic Webhook, <60s KPI, Deterministic Fallback)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:27:47.925Z

---

## 1) Objective
Validate that Local Lead Response Copilot reliably sends the first outbound SMS in <60 seconds from lead creation across three lead sources and behaves safely under failure modes (LLM errors, missing/invalid phone, STOP/HELP, after-hours, retries/dedupes, calendar failures, concurrency). This is designed for early agency/home-service pilots and can be run manually in under ~60–90 minutes.

Business legitimacy references for pilots:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

## 2) Lead Sources Covered (3)
1) Generic Webhook JSON (simulates “any form/FB lead tool”) — triggered via cURL/Postman.
2) Jotform (real form tool) — free form submission -> webhook.
3) HubSpot (CRM) — free CRM record creation OR HubSpot Form submission -> integration/webhook.

## 3) KPI: First Response <60s — Measurement Protocol (Strict)
Record 3 timestamps for every trial:
- T0 (Lead Created): moment the form is submitted / webhook request is sent / CRM record created.
- T1 (Copilot Received): server log timestamp for inbound webhook (or integration event log timestamp).
- T2 (First SMS Sent): SMS provider “message created/sent” log timestamp.

Pass criteria:
- Primary KPI: T2 - T0 <= 60 seconds for >= 95% of trials (minimum 20 trials across the 3 sources; at least 5 per source).
- Secondary: T2 - T1 <= 15 seconds (detects internal processing delays).

Clock sources:
- Use ISO-8601 timestamps from logs where possible.
- If using screenshots, capture system clock + SMS log screen in the same minute.

Evidence storage:
- Save: webhook request logs (headers + body), message log screenshots/exports, and the filled results table.

## 4) Core Test Data (Use These Values)
Valid phone (E.164): +14155550123 (replace with a controlled test phone that can receive SMS).
Invalid phone examples:
- 4155550123 (missing +country)
- +1415ABC0123 (alpha)
- +1999999999999999 (too long)

Lead identity fields:
- first_name: “Test”
- last_name: “Lead”
- service: “AC Repair” (home services example)
- zip: “94107”
- consent: true

## 5) Deterministic Fallback Qualification Flow (LLM Down / Timeout)
Trigger conditions (any):
- LLM API error (5xx/4xx)
- LLM timeout (>5s configured)
- Empty/garbled LLM response
- Safety policy block

Fallback mode behavior:
- Do NOT mention “AI is down.” Use calm service language.
- Limit to 3 questions max before escalation.
- Always provide an exit and STOP/HELP compliance.

Fallback Script (copy/paste):
1) First message (immediate):
   “Hi {first_name} — thanks for reaching out about {service}. This is {business_name}. A quick couple questions so we can help fast: what’s the address or ZIP for the job?”
2) If ZIP/address provided:
   “Got it. Is this an urgent issue needing same-day service? Reply 1) Yes  2) No”
3) If urgent:
   “Understood. What’s the best time for a quick call in the next 30 minutes? Reply with a time window (e.g., ‘now’, ‘in 15’, ‘after 3pm’).”
4) If not urgent:
   “Thanks. What day/time works best for an appointment? (e.g., Tue morning, Wed 2–4).”

Escalation rules:
- If no reply after 2 prompts: send a final message:
  “No worries — if you’d rather book directly, use this link: {calendar_link}. Or reply with a good time and we’ll confirm.”
- If calendar link is unavailable/fails: replace with:
  “Our booking link is having trouble right now. Reply with 2–3 times that work for you and we’ll lock one in.”

STOP/HELP compliance (always enabled):
- If inbound message contains STOP (or unsubscribe keywords): immediately mark contact unsubscribed and respond:
  “You’re opted out and will no longer receive messages. Reply HELP for help.”
- If inbound contains HELP:
  “Help: This is {business_name} responding to your request. For assistance email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

After-hours rule:
- If lead arrives outside business hours: send immediate acknowledgment, but do not promise immediate human follow-up:
  “Thanks — we got your request. We’ll follow up as soon as we’re open. If it’s urgent, reply ‘URGENT’ and we’ll try to accommodate.”

## 6) Scenario Test Matrix (Must-Run)
A. Missing phone
- Input: lead payload without phone
- Expected: no SMS sent; create CRM note “Missing phone”; send internal alert/email; mark lead as “needs contact method”.

B. Invalid phone
- Input: invalid phone formats
- Expected: no SMS; CRM note includes validation failure; optionally send internal alert.

C. STOP/HELP
- Input: recipient replies STOP
- Expected: immediate opt-out; no further automated qualification; compliance confirmation message.
- Input: recipient replies HELP
- Expected: help message with email + opt-out instruction.

D. After-hours
- Input: lead created outside hours
- Expected: immediate acknowledgment + queued follow-up; no spammy multiple pings.

E. Multiple concurrent leads
- Input: submit 5 leads within 30 seconds
- Expected: all get first SMS <60s; no cross-talk (messages/notes tied to correct lead).

F. Calendar link failures
- Input: calendar service down / link not configured
- Expected: fallback asks for 2–3 times; CRM note “Calendar link unavailable”; no dead-end.

G. Webhook retries
- Input: resend identical webhook request 3 times (same external lead id)
- Expected: dedupe prevents duplicate SMS and duplicate CRM records; note “duplicate event ignored”.

H. Duplicate leads (same phone, new submission)
- Input: same phone submits twice within 10 minutes
- Expected: either merge thread and continue context OR send a single polite message acknowledging repeat; never spam.

I. CRM note formatting (HubSpot)
- Expected note template (exact):
  “Lead Copilot Log\nSource: {source}\nLead ID: {external_id}\nReceived: {T1}\nFirst SMS: {T2}\nStatus: {status}\nTranscript:\n- OUT: {message_1}\n- IN: {reply_1}\n- OUT: {message_2}\nErrors: {errors_or_none}\nOpt-out: {true/false}”

## 7) Generic Webhook JSON — Ready Test Payload + cURL
Payload (example):
{
  "external_id": "test-001",
  "source": "generic_webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "service": "AC Repair",
  "zip": "94107",
  "consent": true,
  "created_at": "2026-04-09T12:00:00Z"
}

cURL skeleton (replace URL):
curl -X POST https://YOUR_WEBHOOK_ENDPOINT \
  -H "Content-Type: application/json" \
  -d '{"external_id":"test-001","source":"generic_webhook","first_name":"Test","last_name":"Lead","phone":"+14155550123","service":"AC Repair","zip":"94107","consent":true}'

## 8) Jotform — Setup + Test Steps (Free Tier)
1) Create a Jotform form with fields: First Name, Last Name, Phone, Service, ZIP, Consent checkbox.
2) Enable webhook integration to YOUR_WEBHOOK_ENDPOINT.
3) Submit 5 test entries (include missing phone/invalid phone cases).
4) Capture T0 at submit, then confirm T2 in SMS logs.

## 9) HubSpot — Setup + Test Steps (Free Tier)
Option 1: HubSpot Form submission -> webhook/integration.
Option 2: Create a contact record via CRM -> automation triggers.
For each test, verify:
- Contact created/updated correctly (dedupe by phone).
- Notes appended in the exact format above.
- No duplicate notes on retry events.

## 10) Results Table (Fill During Run)
Columns:
- Trial #, Source, Scenario, External ID, Phone, T0, T1, T2, T2-T0 (sec), Pass/Fail, Evidence link (screenshot/log), Notes/Bug ID.

## 11) Bugs/Fixes Log (During Pilot)
For every failure, log:
- Bug ID, Severity (P0-P3), Scenario, Steps to reproduce, Expected, Actual, Impact on revenue/churn, Suggested fix, Owner, Status.

## 12) Customer/Pilot Communication Templates (Reference Website + Email)
A) Pilot onboarding email (to agency/client)
Subject: Quick setup for instant lead SMS + qualification (Local Lead Response Copilot)

Hi {Name},

I’m Bob from Local Lead Response Copilot. We help local businesses respond to new leads instantly by SMS, ask 2–3 quick qualification questions, and book calls/appointments automatically.

For reference, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

To connect your lead source, please reply with:
1) Which source: Jotform / HubSpot / webhook / other
2) The form URL (or the fields you collect)
3) Business hours + after-hours handling preference
4) Your booking link (if you have one)

Once connected, we’ll run a short QA pass (about 20 test leads) and share proof that first response is under 60 seconds plus transcripts and any fixes needed.

Thanks,
Bob

B) SMS disclosure snippet (first message footer when needed)
“Reply STOP to opt out. Reply HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to”

C) “Calendar link down” customer-safe message
“Our booking link is having trouble right now. Reply with 2–3 times that work for you and we’ll confirm an appointment.”
