# Local Lead Response Copilot — Manual E2E QA Runbook (3 Lead Sources) + Results/Evidence Pack + Deterministic Fail-safe Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:27:43.755Z

---

Overview
This runbook is designed for early pilots (no automation) to protect reputation with agencies by proving: (1) first outbound SMS response occurs in <60 seconds from lead creation across three sources, and (2) fail-safe behavior is deterministic and compliant when AI/LLM or downstream systems fail.

Business legitimacy references (include in any customer comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources (minimum)
1) Generic Webhook JSON (any ad platform / form tool -> webhook)
2) Jotform (real form tool)
3) HubSpot (CRM)

Success criteria (acceptance)
A) Speed-to-lead KPI
- Pass: first outbound SMS is sent within 60 seconds of lead creation event for >= 19/20 trials per source (95%).
- Fail: any systematic delay where median > 30s or p95 > 60s, or any trial > 120s without an explained external cause (carrier outage) documented.

B) Safety & compliance
- STOP: any inbound “STOP” (case-insensitive, with punctuation allowed) must immediately suppress further marketing/qualification messages and return a single confirmation message.
- HELP: any inbound “HELP” must return a single help message with opt-out instructions and the contact email.
- After-hours: must not attempt to book calls; must acknowledge and set expectation; offer next-business-day callback.

C) Deterministic fallback when LLM fails
- If AI/LLM errors, times out, or returns invalid output, the system must switch to a deterministic question flow (below) and still attempt to route/book/escalate.

Evidence to collect (for every test trial)
- T0: Lead creation timestamp (source-specific evidence)
  - Webhook: request received timestamp in server logs + raw payload
  - Jotform: submission timestamp screenshot/export
  - HubSpot: contact create/update timestamp or workflow enrollment timestamp
- T1: First outbound SMS send timestamp (Twilio/message provider logs OR application event log)
- Transcript: full SMS conversation (screenshots acceptable)
- Outcome: qualified? booked? escalated? suppressed? (STOP)
- If failure: error logs + which fail-safe path triggered

Results table (copy/paste and fill during pilot)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Happy path, missing phone, invalid phone, STOP, HELP, after-hours, concurrency, calendar failure, retry, duplicate)
- T0 Lead timestamp (with evidence link)
- T1 First SMS timestamp (with evidence link)
- Delta seconds (T1-T0)
- Pass/Fail (<60s)
- Outcome (Booked / Qualified-no-book / Escalated / Suppressed / Failed)
- Notes + evidence links (logs/screenshots)

Minimum sample size
- 20 trials total across the 3 sources, with at least:
  - 6 webhook trials (include retry + duplicate)
  - 7 Jotform trials (include missing/invalid phone)
  - 7 HubSpot trials (include note formatting)
- Must include all specified edge cases at least once.

Test data and payloads
1) Generic Webhook JSON payloads
Assumed endpoint accepts JSON and maps fields:
- first_name, last_name, phone, email, service, zip, message, source, submitted_at, lead_id

1A) Happy path payload
{
  "lead_id": "qa-web-001",
  "submitted_at": "2026-04-09T10:00:00Z",
  "source": "webhook_test",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test.lead@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "message": "Need someone today if possible"
}
Expected:
- First SMS within 60s.
- Qualification questions begin.
- If booking enabled, calendar link offered after qualification.

1B) Missing phone
Same as above but omit phone or set phone to null.
Expected:
- No SMS attempt.
- Create a CRM note/task: “Missing phone; cannot text. Email fallback if available.”
- Optional: send email to lead (if email automation exists). Must not claim a text was sent.

1C) Invalid phone
Set phone to “555-ABC-0000” or “123”.
Expected:
- Validation error handled safely.
- No repeated retries that could spam logs/CRM.
- Create CRM note: “Invalid phone; requires manual correction.”

1D) Duplicate lead (same lead_id)
Send payload 1A twice with same lead_id within 2 minutes.
Expected:
- Deduped: only one outbound SMS.
- Second event logged as duplicate.

1E) Webhook retry
Send 1A twice with same lead_id but include header “X-Retry-Count: 1” (if supported) or simulate same body again.
Expected:
- Idempotent behavior: no double SMS, no double CRM notes.

2) Jotform test setup + cases
Setup steps (free tier)
- Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Message.
- Configure webhook/integration to the product’s ingest endpoint (or via Zapier/Make only if free; otherwise direct webhook).
- Use unique “Submission ID” as lead_id.

2A) Happy path
Submit valid phone +14155550102.
Expected: same as webhook happy path.

2B) Missing phone
Leave phone blank.
Expected: no SMS; internal note created.

2C) Invalid phone
Enter “0000”.
Expected: validation path.

2D) Multiple concurrent leads
Submit 5 valid leads within 60 seconds.
Expected:
- All receive first SMS within 60s.
- No cross-talk: each transcript stays tied to correct lead.

3) HubSpot CRM test setup + cases
Setup steps (free tools)
- Use a free HubSpot account.
- Define a form or contact creation method OR workflow that triggers on “New contact created” with phone present.
- Ensure mapping: firstname, lastname, phone, email, lifecyclestage/lead source.

3A) HubSpot contact create happy path
Create contact with phone +14155550103.
Expected:
- First SMS within 60s.
- HubSpot timeline note added (see formatting spec below).

3B) HubSpot note formatting validation
Expected note format (exact requirements)
Title: “Lead Response Copilot — SMS Qualification Started”
Body (plain text; no broken JSON; keep under 2,000 chars):
- Lead source: {source}
- First SMS sent at: {timestamp}
- First message: “Hi {first_name}, this is {BusinessName}. Quick question so we can help fast—what service do you need?”
- Qualification status: {in_progress/qualified/booked/escalated/suppressed}
- If suppressed: “Opt-out keyword received: STOP at {timestamp}”

3C) Duplicate contact update
Update same contact property that triggers workflow twice.
Expected:
- Deduped outbound SMS.
- Notes not duplicated (or appended with “duplicate event suppressed”).

Edge-case behavior specifications (must pass)
1) STOP handling (compliance)
Inbound: “STOP”, “Stop”, “ stop ”, “STOP!!”
System behavior:
- Immediately mark lead as suppressed/opted out.
- Send exactly one confirmation SMS:
  “You’re opted out and will no longer receive texts. Reply HELP for help. Contact: agent_bob_replit+lead-copilot@agentmail.to”
- Do not send further qualification, reminders, or booking links.
- Add CRM note: “STOP received; suppressed.”

2) HELP handling
Inbound: “HELP”
System reply (exact copy):
  “Help: This number texts you about your service request. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”
Add CRM note.

3) After-hours routing
Define hours (example): Mon–Fri 8am–6pm local.
If lead arrives outside hours:
- First SMS within 60s must still go out acknowledging timing:
  “Hi {first_name}—we got your request. We’re currently closed, but we’ll follow up first thing next business day. What service do you need?”
- Do not offer calendar booking if staff won’t answer; instead offer “Reply with best time tomorrow.”
- If the lead answers, store responses and escalate for manual follow-up.

4) Calendar link failure
If calendar API fails / link cannot be generated within 10 seconds:
- Send fallback SMS:
  “Thanks—one moment. Our booking link is having trouble. What’s the best time today/tomorrow and a good address/ZIP?”
- Create CRM task: “Manual booking needed (calendar failure).”

5) LLM failure / timeout deterministic mode
Trigger condition:
- LLM request errors, times out (e.g., >5s), or returns empty/unparseable.
Deterministic question flow (no AI required)
Q1 (immediate after greeting):
  “Quick question so we can help fast—what service do you need? (e.g., plumbing, HVAC, electrical, roof, cleaning)”
If no reply in 5 minutes: send reminder once:
  “Just checking—what service do you need help with?”
Q2 (after service captured):
  “Got it. What’s your ZIP code?”
Q3 (after ZIP):
  “Is this urgent (today) or can it wait a few days? Reply: TODAY or LATER.”
Q4 (optional, only if booking is available):
  “Would you like to book a call/appointment now? Reply YES for a link or NO to get a callback.”
If YES and calendar OK: send link.
If NO or calendar fail: escalate:
  “No problem—what’s the best time to reach you?”
Escalation-to-human rule:
- After collecting service + ZIP + urgency, create CRM task and stop automated questioning.

6) Multiple concurrent leads
Expectation:
- Each lead’s state machine is isolated.
- No message content from one lead appears in another lead’s thread.

Bug/Fix log template (fill during runs)
Fields:
- Bug ID
- Scenario
- Severity (P0 reputational/compliance, P1 conversion-impact, P2 minor)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Evidence links (logs/screens)
- Suggested fix
- Owner + status

Priority checklist (what to fix first if found)
P0
- STOP not honored immediately or follow-up messages still sent
- Duplicate/retry sends multiple SMS to same lead
- Missing/invalid phone causes crashes or repeated retries
- After-hours sends booking links that can’t be answered (bad CX)
P1
- First response regularly >60s
- Calendar failure produces dead-end (no escalation)
- HubSpot note formatting unreadable/broken (JSON dump)
P2
- Copy/typos, minor mapping inconsistencies

Operator execution steps (60-minute pilot run)
1) Prepare: open product logs, SMS provider logs, and CRM timeline view.
2) Run 2 happy-path tests per source; record T0/T1 and transcript.
3) Run edge cases: missing phone, invalid phone, STOP, HELP, after-hours (change system clock or run at off-hour), calendar failure (disable calendar or simulate error), duplicates, retries, concurrency.
4) Fill results table and compute pass rate + p95 response time.
5) File bugs in the log with evidence.

Definition of “verified <60s first response”
- For each trial, compute Delta = T1 (provider send time) – T0 (source event time).
- Verification requires either: screenshots of timestamps OR exported logs with timestamps.
- Provide a summary line per source: count, pass %, median, p95, max.

End of runbook
This document is designed to be used during the first agency pilot onboarding to produce a defensible KPI proof bundle and a short, prioritized fix list before scaling distribution.
