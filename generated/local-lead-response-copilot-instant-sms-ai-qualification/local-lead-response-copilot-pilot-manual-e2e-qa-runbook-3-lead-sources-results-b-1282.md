# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug/Fix List + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:58:31.088Z

---

## 1) Scope & Goal (Pilot-phase, manual)
Goal: protect early agency reputation by validating (a) speed-to-lead KPI and (b) safe fallbacks. This runbook produces timestamped evidence that the first outbound SMS is sent within **<60 seconds** of lead creation, across **3 lead sources**:
1) Generic Webhook JSON (any form/ads platform)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Product legitimacy references for prospects/pilots:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 2) KPI Definition: “<60s First Response”
**Start time (T0):** when lead is created at the source.
- Webhook JSON: moment the POST is sent (client timestamp) + server receipt timestamp (if logged)
- Jotform: form submission timestamp from Jotform “Submissions” record
- HubSpot: contact created timestamp or form submission timestamp in HubSpot

**End time (T1):** timestamp when the first SMS is accepted for delivery by the SMS provider OR appears in outbound message log.

**KPI:** T1 - T0 <= 60 seconds.

Evidence to store per test:
- Screenshot/export of source submission time
- Screenshot/log line of outbound SMS queued/sent time
- The phone number used (masked ok) and a test lead ID

Recommended sample size for pilot proof:
- Minimum: 20 total trials (at least 5 per lead source + 5 concurrency tests)
- Pass gate: 18/20 under 60s; no critical compliance failures (STOP/HELP)

## 3) Test Environment & Preconditions (no paid spend required)
- Use a single “Test Business” configuration in the app.
- Use a single test recipient phone that you control.
- Configure business hours for after-hours routing tests (e.g., 9am–5pm local).
- Configure a calendar/booking link (can be dummy to test failure behavior).
- Ensure deterministic fallback mode can be toggled OR is automatically triggered on LLM timeout.

If any of the following are unknown, record as a blocking issue:
- Where outbound SMS timestamp is visible
- Whether STOP/HELP keywords are handled by app or provider
- Where dedupe key is defined (phone? email? source lead ID?)

## 4) Lead Sources: Setup & Execution
### 4.1 Generic Webhook JSON (Source 1)
**Purpose:** ensure the product handles the simplest integration path and retries safely.

Payload (valid):
{
  "source": "webhook-test",
  "lead_id": "QA-001",
  "first_name": "Jamie",
  "last_name": "Tester",
  "phone": "+14155550101",
  "email": "jamie.tester@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "message": "Need help today"
}

Tests:
- Send payload once (baseline)
- Send same payload twice within 10 seconds (dedupe)
- Simulate retry: send same lead_id 3 times (webhook retries)
- Concurrency: send 5 leads within 2 seconds (QA-010…QA-014)

Expected:
- Baseline: first SMS <60s
- Dedupe: either (a) one conversation created and second attempt ignored, OR (b) second attempt logged but does not trigger second SMS
- Retry: does not spam; idempotency is preserved
- Concurrency: no cross-talk; each lead receives correct greeting and questions

### 4.2 Jotform (Source 2)
**Purpose:** validate a real form tool workflow agencies commonly use.

Form fields (minimum):
- First name
- Last name
- Phone
- Email
- Service needed (dropdown)
- Preferred time (optional)
- Consent checkbox (optional)

Tests:
- Normal submission with valid E.164 phone
- Missing phone (leave blank)
- Invalid phone (e.g., 12345)
- Duplicate submission (submit twice with same phone)

Expected:
- Normal: SMS within 60s
- Missing/invalid: no SMS attempt; create internal alert/log; optional email to agent_bob_replit+lead-copilot@agentmail.to
- Duplicate: dedupe behavior; no spam

### 4.3 HubSpot CRM (Source 3)
**Purpose:** ensure CRM-driven leads are handled and that notes/tasks are formatted cleanly for reps.

HubSpot objects to validate:
- Contact creation/update
- Note on contact timeline OR engagement record
- Optional: Deal creation

Tests:
- New HubSpot contact with phone triggers SMS
- Existing contact updated (phone added) triggers SMS exactly once
- CRM note formatting on every step of qualification

Expected CRM note format (example):
Title: Lead Copilot Qualification — QA-020
Body (plain text):
- Source: HubSpot
- Created: 2026-04-09 14:03:12 PT
- First SMS sent: 14:03:28 PT (16s)
- Q1: “What service do you need help with?”
  A1: “Drain cleaning”
- Q2: “What’s your address or ZIP code?”
  A2: “94107”
- Q3: “Is this urgent (today/this week)?”
  A3: “Today”
- Outcome: Booked link sent (or Human handoff)
- Conversation ID: <id>

Pass/fail:
- Notes must be readable, chronological, and not leak internal prompt text.

## 5) High-Risk Scenario Test Cases (Required)
Run these regardless of source (mix across the 3 sources).

### 5.1 Missing phone
Steps: create lead with empty phone.
Expected: no SMS; internal log/alert; lead marked “Needs phone.”
Fail if: any SMS attempt occurs or system crashes.

### 5.2 Invalid phone
Steps: use malformed phone (12345) and also a non-E.164 format.
Expected: validation error; no send; log indicates invalid.
Fail if: provider rejects after attempt (avoidable) OR repeated retries.

### 5.3 STOP / HELP compliance
Steps:
1) After receiving first SMS, reply “HELP”.
2) Reply “STOP”.
3) Attempt to send next automated message.
Expected:
- HELP returns a compliant help message (who we are + how to get support + link/email). Use: agent_bob_replit+lead-copilot@agentmail.to.
- STOP immediately suppresses future messages.
Fail if: any message is sent after STOP.

### 5.4 After-hours routing
Steps: set business hours; submit lead outside window.
Expected: send a short acknowledgment + set expectation + offer booking link OR queue for next business day; no aggressive qualification at 2am.

### 5.5 Multiple concurrent leads
Steps: send 5 leads rapidly.
Expected: no mixing of names/answers; each gets correct question sequence.

### 5.6 Calendar/booking link failure
Steps: configure broken link or simulate 404.
Expected: fallback: “Our booking link is having trouble—can you share 2 times that work for you?” and create human task.
Fail if: system loops or dead-ends.

### 5.7 Webhook retries
Steps: resend same lead_id multiple times.
Expected: idempotent processing.
Fail if: duplicate outbound SMS.

### 5.8 Duplicate leads
Steps: same phone, different lead_id within 10 minutes.
Expected: either merge into existing conversation or suppress extra first-message blast; log dedupe reason.

### 5.9 CRM note formatting
Steps: complete qualification (or fallback) and inspect HubSpot timeline.
Expected: note matches formatting spec; includes timestamps and outcome.
Fail if: HTML junk, unreadable JSON blobs, or missing outcome.

## 6) Deterministic Fallback Qualification Flow (LLM fails / times out)
Trigger conditions:
- LLM API error
- LLM response exceeds timeout threshold (e.g., 6–10s)
- LLM returns empty/unsafe output

Fallback behavior principles:
- Keep messages short; 1 question per SMS
- Max 3 questions before handoff
- Always provide opt-out language if required by policy/provider

Exact fallback questions & branching:
1) Message 1 (immediate):
“Hi {first_name}, this is the scheduling assistant for {business}. Thanks for reaching out—what service do you need help with?”

2) If user responds (any text), store as SERVICE.
Message 2:
“Thanks. What’s the address or ZIP code for the job?”

3) Store ZIP/ADDRESS.
Message 3:
“Got it. Is this urgent: (A) today, (B) this week, or (C) just price info?”

Routing:
- If A/today: send booking link; if link fails, ask for two time windows and create human callback task.
- If B/this week: send booking link.
- If C/price: request 1 detail: “Briefly, what’s the issue?” then human follow-up.

Hard stop conditions:
- If user replies STOP: immediately suppress.
- If user replies HELP: respond with help template.
- If user is unresponsive after 2 messages: send one final nudge after 10 minutes, then stop.

HELP template:
“Help: You’re receiving messages because you requested info from {business}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

STOP template:
“You’re opted out and will no longer receive messages.”

## 7) Results Table (Copy/Paste)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (baseline/missing phone/STOP/etc.)
- T0 source timestamp
- T1 outbound SMS timestamp
- Delta seconds
- Pass/Fail
- Evidence link (screenshot/log reference)
- Notes

## 8) Bug/Fix List Template (Prioritized)
For each bug:
- ID
- Severity (Critical/High/Med/Low)
- Scenario
- Steps to reproduce
- Expected vs Actual
- Customer impact (churn risk)
- Suggested fix

Priority guidance:
- Critical: STOP not honored; spam duplicates; wrong-recipient messages; >60s consistently; crashes
- High: invalid phone causes provider errors; after-hours spams; booking failure dead-end
- Medium: CRM notes ugly/unreadable; dedupe edge cases

## 9) Known “Watch Outs” (Common early-pilot failures)
- Phone normalization to E.164 before attempting send
- Idempotency key: source+lead_id OR phone+time window
- Concurrency: conversation state stored per lead, not global
- Calendar failures: always provide alternate path (manual scheduling)
- CRM notes: avoid dumping raw JSON; keep a readable timeline

## 10) What ‘Verified’ Means
You can claim “Verified <60s first response” only if:
- At least 20 trials logged with evidence
- 90%+ under 60 seconds
- No STOP/HELP compliance failure
- At least one concurrency test set passes without cross-talk

This runbook is designed to be executed during the first onboarding/pilot call in under 60 minutes, producing a concrete KPI proof bundle and a prioritized bug list without building automation pre-revenue.