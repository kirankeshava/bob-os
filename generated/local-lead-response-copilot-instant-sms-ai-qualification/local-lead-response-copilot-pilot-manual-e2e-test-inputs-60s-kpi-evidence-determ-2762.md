# Local Lead Response Copilot — Pilot Manual E2E Test Inputs + <60s KPI Evidence + Deterministic Fallback (Generic Webhook, Jotform, HubSpot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:06:38.904Z

---

## Scope (manual, pilot-ready)
Goal: validate end-to-end reliability across 3 lead sources without building automation.
Lead sources covered:
1) Generic Webhook JSON (any form/ad tool)
2) Jotform (real form tool)
3) HubSpot (CRM + HubSpot Forms)

Key KPI: first outbound SMS sent within <60 seconds of lead creation.
Key risk behaviors: missing/invalid phone, STOP/HELP, after-hours, concurrent leads, calendar link failure, webhook retries, duplicate leads, and HubSpot note formatting.

---
## Evidence standard to claim “<60s first response”
Record 3 timestamps per trial (same trial ID across logs):
T0 = Lead created time
- Generic webhook: the moment request is sent (HTTP client timestamp)
- Jotform: form submission timestamp (submission confirmation + Jotform submission record)
- HubSpot: form submit timestamp or contact create time in HubSpot

T1 = Webhook received time (server log line that includes trial_id)
T2 = First SMS “sent” event time (Twilio/message provider event or app log that indicates outbound send initiated)

Compute: Δ = T2 - T0. Pass if Δ < 60s.
Evidence to store per trial:
- Screenshot or exported log snippet showing T0
- Server/app log line with trial_id for webhook received (T1)
- Messaging provider log line for outbound message (T2)

Sample size target: 20 trials total across sources, with at least:
- 8 Generic webhook
- 6 Jotform
- 6 HubSpot
Include at least 2 concurrency tests (5 leads within 30 seconds).

---
## Trial ID convention (required)
Use: trial_id = "QA-YYYYMMDD-###".
Always include trial_id in:
- lead payload (hidden field in Jotform/HubSpot where possible)
- webhook JSON body
- CRM notes

---
## Generic Webhook JSON — copy/paste payloads
Assume endpoint expects JSON with fields: first_name, last_name, phone, email, service, zip, source, trial_id, created_at.
If your current schema differs, map fields but keep trial_id.

### A1: Valid lead (baseline)
{
  "trial_id": "QA-20260514-001",
  "source": "webhook",
  "created_at": "2026-05-14T10:00:00-04:00",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155552671",
  "email": "test.lead+001@example.com",
  "service": "HVAC repair",
  "zip": "94107"
}
Expected:
- First SMS <60s.
- Qualification begins (LLM or deterministic).
- CRM note created (if enabled) with formatted block (see HubSpot format section).

### A2: Missing phone
{
  "trial_id": "QA-20260514-002",
  "source": "webhook",
  "created_at": "2026-05-14T10:05:00-04:00",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "phone": "",
  "email": "test.lead+002@example.com",
  "service": "Plumbing",
  "zip": "94016"
}
Expected:
- No SMS attempted.
- Create CRM/task: “Missing phone – cannot text” with lead metadata.
- If email fallback exists: send email to internal team (agent_bob_replit+lead-copilot@agentmail.to) with subject including trial_id.

### A3: Invalid phone
{
  "trial_id": "QA-20260514-003",
  "source": "webhook",
  "created_at": "2026-05-14T10:10:00-04:00",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "1234",
  "email": "test.lead+003@example.com",
  "service": "Roofing quote",
  "zip": "10001"
}
Expected:
- Validate and reject before send.
- CRM note/task: “Invalid phone – cannot text”.

### A4: Duplicate lead (same phone + source within dedupe window)
Send A1 twice with same phone and new trial_id:
1) QA-20260514-004
2) QA-20260514-005
Expected:
- Second lead should not trigger a second identical opening message if within dedupe window.
- CRM note should indicate deduped: true, and reference original trial_id.

### A5: Webhook retry (same trial_id resent)
Resend A1 with SAME trial_id QA-20260514-001.
Expected:
- Idempotent handling: no duplicate conversation/notes.
- Respond 200 quickly.

### A6: After-hours flag scenario
{
  "trial_id": "QA-20260514-006",
  "source": "webhook",
  "created_at": "2026-05-14T23:30:00-04:00",
  "first_name": "AfterHours",
  "last_name": "Lead",
  "phone": "+14155552671",
  "email": "test.lead+006@example.com",
  "service": "Emergency electrician",
  "zip": "30301"
}
Expected:
- After-hours message variant used.
- If booking disabled after-hours: provide next-available window or promise callback.

### A7: Concurrency burst (5 leads in <30s)
Create 5 payloads QA-20260514-007..011 with unique phones.
Expected:
- All receive first SMS <60s.
- No cross-talk between threads.

---
## Jotform setup + test execution
Create a free Jotform form with fields:
- First Name (text)
- Last Name (text)
- Phone (phone)
- Email (email)
- Service Needed (dropdown)
- ZIP (text)
- Hidden field: trial_id

Configure submission webhook to the product endpoint.

Jotform test cases:
J1 Baseline valid submit (trial_id QA-20260514-012)
- Expected: first SMS <60s.
J2 Missing phone (leave phone blank) (QA-20260514-013)
- Expected: no SMS; internal task/note.
J3 Invalid phone (force via text field if possible) (QA-20260514-014)
- Expected: validation fail or app rejects.
J4 Duplicate submit (submit twice same phone) (QA-20260514-015 & 016)
- Expected: dedupe.
J5 After-hours submit (perform test during after-hours OR simulate with created_at mapping if supported) (QA-20260514-017)
- Expected: after-hours script.

Evidence for Jotform T0:
- Jotform “Submissions” row timestamp + screenshot including trial_id.

---
## HubSpot setup + test execution
Two entry paths:
H1 HubSpot Form submission -> webhook/integration
H2 New Contact created/updated -> workflow -> webhook

Minimum fields:
- firstname, lastname, phone, email, lifecycle stage
- custom property: trial_id (recommended)

HubSpot test cases:
H1 Valid form submit (QA-20260514-018)
H2 Missing phone (QA-20260514-019)
H3 Duplicate contact update (same phone) (QA-20260514-020)

HubSpot note formatting (required)
Create/append a Note on the Contact with exact block:

[Lead Response Copilot]
trial_id: QA-20260514-018
source: hubspot_form
lead_created_at: 2026-05-14T10:30:00-04:00
first_sms_sent_at: 2026-05-14T10:30:35-04:00
first_response_sla_seconds: 35
status: active | deduped | blocked_missing_phone | blocked_invalid_phone
consent: implicit_form_submit
stop_flag: true/false
help_flag: true/false
qualification_mode: llm | deterministic_fallback
answers:
- Q1: "..." => "..."
- Q2: "..." => "..."
booking:
- attempted: true/false
- result: booked | failed_calendar | sent_link | escalated
- calendar_url: https://...
transcript_snippet:
- OUT: "..."
- IN: "..."
- OUT: "..."

Expected:
- Note is readable, consistent, and includes SLA seconds.

---
## STOP/HELP compliance tests (message-level)
S1 STOP
- Lead replies “STOP”.
Expected:
- Immediate confirmation message: “You’re opted out and will no longer receive texts. Reply START to resubscribe.” (exact copy may vary by provider policy)
- No further outbound messages.
- stop_flag recorded in CRM note.

S2 HELP
- Lead replies “HELP”.
Expected:
- Help message with business identity and contact: “Local Lead Response Copilot support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- help_flag recorded.

---
## Calendar link failure handling
Simulate by providing an invalid calendar URL or forcing booking API failure.
Expected:
- System sends: “Quick heads up—our booking link is having trouble. What time works best for a call: (1) Today, (2) Tomorrow, (3) This week?”
- Escalate to human queue + CRM note booking.result = failed_calendar.

---
## Deterministic fallback qualification flow (LLM down / timeout safe mode)
Trigger conditions:
- LLM API error, timeout > 8s, or empty response.
- Hard switch: qualification_mode = deterministic_fallback.

Message 0 (immediate, <60s):
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out about {{service}}. I can help get you scheduled—can I ask 3 quick questions?”

If YES / any response:
Q1: “What’s the address or ZIP where service is needed?”
- If missing: reprompt once.
Q2: “Is this urgent (today) or flexible (next few days)?”
- Map to urgency = urgent|flexible.
Q3: “What’s the best time for a call: morning, afternoon, or evening?”

Booking step:
- If calendar link OK: “Great—grab a time here: {{calendar_url}}. If you prefer, tell me a specific time and we’ll confirm.”
- If calendar fails: use calendar failure handling above.

After-hours variant:
“Thanks for reaching out—our office is currently closed, but I can get this queued. Are you looking for service ASAP or can it wait until the next business day?”

Escalation rule:
- If user answers at least 2 questions OR indicates urgent: create human follow-up task immediately.

Timeout rule:
- If no response after 15 minutes: send one nudge: “Just checking—do you still need help with {{service}}?”
- If no response after 24 hours: close loop, no more messages.

---
## Results capture table (paste into Sheet)
Columns:
trial_id | source | scenario | T0 lead created | T1 webhook received | T2 first SMS sent | SLA seconds | pass/fail | notes | screenshot/log link

---
## Bug/fix log (pilot)
Fields:
bug_id | severity (P0-P3) | scenario | steps to reproduce | expected | actual | evidence link | likely cause | suggested fix | retest status

P0 examples:
- SMS sent to invalid phone / wrong recipient
- STOP not honored
- First response >60s for baseline leads
- Cross-talk between concurrent leads

This packet is ready to run as soon as we have the product’s webhook endpoint + access to message logs and a HubSpot/Jotform sandbox configuration.