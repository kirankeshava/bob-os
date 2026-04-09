# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug/Fix Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:09:10.647Z

---

Overview
This runbook is designed for early pilots to protect agency reputation and reduce churn, without investing in automated QA yet. It verifies end-to-end lead ingestion from three sources—(1) Generic Webhook JSON, (2) Jotform (real form tool), and (3) HubSpot (CRM)—and confirms the core KPI: first outbound SMS to the lead occurs in under 60 seconds from lead submission. It also validates fail-safe behavior when the LLM, calendar link, or SMS delivery fails by switching to a deterministic qualification flow.

Business legitimacy references (use in any customer-facing comms during testing)
- Website (shareable proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope
Lead sources covered:
1) Generic Webhook JSON (any form/ad platform that can POST JSON)
2) Jotform (form tool) → webhook
3) HubSpot (CRM) → new contact/lead trigger → webhook or integration

Edge cases required (test each at least once; high-risk ones multiple times):
- Missing phone
- Invalid phone
- STOP/HELP compliance
- After-hours behavior
- Multiple concurrent leads
- Calendar link failures
- Webhook retries
- Duplicate leads
- CRM note formatting (HubSpot)

Definitions / KPI Measurement
Primary KPI: T_first_sms <= 60 seconds.
Timestamp points (capture all):
T0: Lead submitted (form submit time or webhook request receipt time)
T1: Ingestion acknowledged (server log line or webhook 200 response time)
T2: First SMS sent event time (Twilio/telephony log timestamp) OR first outbound message log timestamp
T3: First SMS delivered time (if available)

Pass criteria:
- Must send first SMS (or deterministic fallback message) within 60s for >= 95% of trials (target 19/20) during pilot run.
- Must not message if phone missing/invalid.
- Must immediately honor STOP (no further marketing/qualification messages; only confirmation).
- Must respond to HELP with compliant support text.
- Must avoid duplicate conversations/messages on webhook retry/duplicate leads.

Evidence required per trial
- Screenshot or copy/paste of the incoming lead payload (or form submission confirmation)
- Outbound message transcript (first SMS text + timestamp)
- Log line or dashboard evidence proving T0 and T2 (or T1 and T2)
- If failure: attach error text, stack trace snippet, or provider error code

Pre-Flight Checklist (10 minutes)
1) Confirm environment and endpoints
- Confirm the public webhook URL for ingest (e.g., /webhook/lead). Record it here: __________________
- Confirm message-sending provider logs are accessible (Twilio console or app logs). Record access method: __________________
- Confirm deterministic fallback can be toggled (feature flag / config). Record method: __________________

2) Phone normalization rules (must be explicit)
- Accept: E.164 (+1XXXXXXXXXX) and common US formats; normalize to E.164.
- Reject: <10 digits US numbers, letters, obvious fake (e.g., 1234567890), missing country where required.
- Behavior on reject: do not send SMS; create internal alert or CRM note: “Lead missing/invalid phone—needs manual follow-up.”

3) After-hours policy (set before testing)
- Business hours (example): Mon–Fri 8am–6pm local
- After-hours behavior: send a short acknowledgement + next-step expectation OR queue until next open.
Recommended safe behavior: send acknowledgement immediately (within 60s) but do not attempt booking; offer a link or promise next-day follow-up.

Deterministic Qualification Fallback Spec (LLM down / timeout / error)
Trigger conditions for deterministic mode:
- LLM API timeout > 6 seconds (configurable) OR 5xx error OR malformed output OR safety refusal
- Calendar link API returns error (>=500) OR times out > 4 seconds
- Message sending provider returns transient error (retryable)

Deterministic flow goals:
- Collect only the minimum needed to route/close: service type, zip/city, urgency, preferred time window.
- Keep messages short, clear, and compliant.
- Always offer a human fallback.

Exact deterministic questions (copy for config)
Message 1 (first response; must be sent <60s):
“Hi {first_name}—this is {business_name}. Thanks for reaching out about {service_hint}. I can help get you scheduled. What service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other”

If no reply within 3 minutes:
“Quick check—what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other. If you’d rather call, share a good time window.”

On selection, ask location:
“Got it. What ZIP code is the job in?”

Then urgency:
“When do you need help? Reply 1) ASAP 2) This week 3) Flexible”

Then scheduling preference (no calendar dependency):
“What’s the best time for a quick call? Reply with a 2-hour window (e.g., ‘tomorrow 2–4pm’) and a backup window.”

Confirmation:
“Perfect—someone will confirm your appointment shortly. If anything changes, reply here. Reply STOP to opt out.”

Escalation-to-human trigger:
- User replies with complex/angry message
- More than 2 unclear responses
- Any compliance keywords beyond STOP/HELP (e.g., “lawsuit”, “spam”)
Escalation message:
“Thanks—looping in a team member to help now. If urgent, reply with your best callback number and time window.”

STOP/HELP Compliance (required)
STOP behavior:
- On inbound “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately mark number as opted out and send ONE confirmation: “You’re opted out and will no longer receive texts. Reply START to resubscribe.” No further messages.
HELP behavior:
- On “HELP” send: “Support: reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Lead Source 1: Generic Webhook JSON — Test Procedure
Goal: confirm arbitrary JSON ingestion maps fields correctly and triggers <60s SMS.

Sample payloads (use curl/Postman) — Valid lead
POST {INGEST_URL}
{
  "source": "webhook_test",
  "lead_id": "wh_001",
  "first_name": "Taylor",
  "last_name": "Jordan",
  "phone": "+14155550123",
  "email": "taylor@example.com",
  "service": "Water heater repair",
  "message": "Need someone today",
  "submitted_at": "{ISO8601_NOW}",
  "utm": {"campaign":"fb_leads_test","adset":"a1"}
}
Expected:
- T0 recorded; T2 first SMS sent within 60s
- Conversation created; CRM note (if applicable) includes source + service + message + utm

Missing phone payload
{ "source":"webhook_test","lead_id":"wh_002","first_name":"Sam","phone":"", "service":"HVAC" }
Expected:
- No SMS sent
- Internal alert/CRM note: missing phone

Invalid phone payload
{ "source":"webhook_test","lead_id":"wh_003","first_name":"Riley","phone":"12345", "service":"Plumbing" }
Expected:
- No SMS sent; error recorded cleanly; no crash

Retry / duplicate payload test
Send the same valid payload 3 times (same lead_id) within 30 seconds.
Expected:
- Only one outbound first SMS
- Dedupe key includes (source + lead_id) OR normalized phone + timestamp bucket
- Logs show idempotent handling

Lead Source 2: Jotform — Test Procedure
Goal: confirm a real form tool posts data, field mapping works, and timing holds.

Setup checklist (free tier)
- Create Jotform “Lead Intake” with fields: First Name, Last Name, Phone, Email, Service Needed, ZIP, Notes.
- Set webhook integration to {INGEST_URL}.
- Confirm Jotform sends JSON payloads.

Field mapping assertions
- Jotform phone field arrives in a consistent key; normalize it.
- Ensure first_name populated even if Jotform only sends “name.first/last”.

Test cases
1) Normal submit with valid phone: expect SMS <60s.
2) Missing phone: expect no SMS; create follow-up task.
3) Invalid phone (e.g., “(555) 555-555”): expect validation failure.
4) Concurrency: submit 5 forms within 30 seconds using different numbers.
Expected:
- 5 separate conversations; no cross-talk.

Lead Source 3: HubSpot — Test Procedure
Goal: confirm CRM-originated leads (new contact or form submission in HubSpot) result in correct messaging and correctly formatted CRM notes.

Setup checklist (free tier/dev)
- Create a test pipeline/contact property set.
- Configure trigger: new contact created with phone + lifecycle stage = lead (or specific list membership).
- Confirm payload includes contact id, name, phone, email, and source.

HubSpot note formatting (expected)
Create/update a note or engagement with a consistent template:
Title: “Lead Copilot Qualification Started”
Body (plain text, readable):
- Source: HubSpot
- Contact ID: {id}
- Name: {first} {last}
- Phone: {e164}
- Service: {service}
- Submitted: {timestamp}
- First SMS sent: {timestamp}
- Qualification status: {In progress / Qualified / Unreachable / Opted out}
- Transcript link (if available): {url}

Test cases
1) New contact with valid phone: SMS <60s.
2) Duplicate contact update triggers: update same contact 3 times—ensure dedupe.
3) CRM note update on STOP: when STOP received, update note “Opted out” (no further SMS).

Calendar Link Failure Tests
Simulate by using an invalid calendar URL or forcing provider error.
Expected:
- System does not loop.
- Sends message: “Scheduling link is temporarily unavailable—what 2-hour window works for a quick call?”
- Creates internal alert/CRM note “Calendar outage fallback used.”

After-Hours Tests
Submit a lead outside business hours.
Expected:
- Still sends acknowledgement within 60s.
- Message indicates next available follow-up time; no aggressive booking.

STOP/HELP Tests
During an active convo, reply “HELP” then “STOP”.
Expected:
- HELP response includes the support email agent_bob_replit+lead-copilot@agentmail.to.
- STOP opt-out confirmation sent once; subsequent system messages blocked.

Results Capture Table (paste into Sheets)
Columns:
Trial # | Source (Webhook/Jotform/HubSpot) | Scenario | Lead ID | Phone | T0 (submit) | T2 (first SMS sent) | Delta seconds | Pass (<60s?) | Transcript saved (Y/N) | Notes

Minimum dataset
- Total trials: 20
- At least: 7 Webhook, 7 Jotform, 6 HubSpot
- Include: 1 missing phone, 2 invalid phone, 2 STOP, 1 HELP, 1 after-hours, 1 calendar failure, 2 retries/duplicates, 1 concurrency batch

Bug/Fix Log Template (prioritized)
Fields:
ID | Severity (S0-S3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Suspected Cause | Proposed Fix | Owner | Status
Severity guide:
S0 Compliance breach (STOP not honored), or messaging wrong person
S1 KPI breach (first SMS >60s) or duplicate spam
S2 Qualification correctness issue (bad mapping, wrong notes)
S3 Cosmetic/wording

Pre-filled likely issues to watch (common in lead-response systems)
1) Phone normalization fails on Jotform formatted numbers → fix: normalize all inputs via libphonenumber.
2) Webhook retry duplicates trigger multiple SMS → fix: idempotency keys + dedupe window.
3) After-hours sends booking link that disappoints users → fix: after-hours copy + queue.
4) Calendar outage causes dead-end → fix: deterministic scheduling window capture.
5) HubSpot notes become HTML mess or exceed limits → fix: plain text template + truncation.

Exit Criteria (ready for pilot)
- 20 trials executed with evidence.
- >= 19/20 first responses under 60 seconds.
- Zero S0 bugs open; S1 bugs have mitigations or are fixed.
- Deterministic fallback verified by forcing LLM failure (disable key / simulate timeout) and confirming the exact question flow runs end-to-end.

Operator Notes
This packet is meant to be executed during first agency onboarding. If you need to reassure a prospect about legitimacy during testing, share the website URL above and offer support via agent_bob_replit+lead-copilot@agentmail.to. Keep transcripts and timestamps—those become proof points for agencies (“we consistently respond in under a minute”).
