# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bugs/Fixes + Deterministic Fallback (v1.0)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:31:45.640Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (v1.0)
Business proof URL (share if asked): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Scope (Revenue-friendly)
Manual end-to-end checks only (no automation) to protect reputation in first pilots. Covers 3 lead sources:
1) Generic Webhook JSON (any form/ads tool)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM target)

Primary KPI: **First outbound SMS sent < 60 seconds** after lead capture.

## 1) Preconditions / Setup
- Have a test phone that can receive SMS.
- Ensure opt-out language exists somewhere in initial flow (or in HELP response).
- Ensure the system can log timestamps for: lead-received, sms-sent, sms-delivered (if available).

### Evidence to collect (minimum)
- Screenshot or log line for inbound lead timestamp.
- Screenshot or log line for first SMS timestamp.
- If possible: provider delivery timestamp (Twilio or equivalent).
- Transcript snippet for STOP/HELP tests.

## 2) Timing Measurement Method (<60s)
Record these timestamps for each trial:
- T0 = Lead captured (webhook received OR form submission time OR CRM event time)
- T1 = First SMS sent time (system log)
- T2 = First SMS received time (on device)
Compute:
- Send latency = T1 - T0 (must be <= 60s)
- Perceived latency = T2 - T0 (track; acceptable may vary by carrier)
Pass criteria: **Send latency <= 60s** in at least 19/20 trials per source. Any single failure is logged as a bug.

## 3) Lead Sources: How to Trigger
### A) Generic Webhook JSON
Use any webhook sender (curl/Postman). Target endpoint = your product’s inbound webhook URL.

**Payload 1 — valid lead**
```json
{
  "source": "generic_webhook",
  "lead_id": "qa-generic-001",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550101",
  "email": "jamie.lee@example.com",
  "service": "Water heater replacement",
  "zip": "94107",
  "message": "Need a quote ASAP",
  "submitted_at": "2026-04-09T12:00:00Z"
}
```

**Payload 2 — missing phone**
```json
{
  "source": "generic_webhook",
  "lead_id": "qa-generic-002",
  "first_name": "Sam",
  "email": "sam@example.com",
  "service": "Drain cleaning",
  "submitted_at": "2026-04-09T12:05:00Z"
}
```
Expected: no SMS attempt; create internal alert/CRM note; safe fallback email (if configured).

**Payload 3 — invalid phone**
```json
{
  "source": "generic_webhook",
  "lead_id": "qa-generic-003",
  "first_name": "Pat",
  "phone": "12345",
  "service": "AC repair",
  "submitted_at": "2026-04-09T12:10:00Z"
}
```
Expected: no SMS attempt; mark invalid; request correction via email or internal queue.

**Payload 4 — duplicate lead (same lead_id)**
Send Payload 1 twice within 5 minutes.
Expected: idempotent handling; **no second initial SMS**; CRM note updated with “duplicate suppressed”.

### B) Jotform
Create a free Jotform with fields: First Name, Last Name, Phone, Email, Service Needed, Preferred Time, Consent checkbox.
Connect via webhook integration to product inbound endpoint.
Run trials by submitting:
- Valid phone
- Missing phone
- Invalid phone
- Same phone twice within 2 minutes (dedupe)
Evidence: Jotform submission timestamp + product SMS sent log.

### C) HubSpot CRM
Create a free HubSpot account (or use sandbox). Configure workflow/webhook/automation that triggers on new contact or form submission and sends data to the product.
Test:
- Create new contact with phone
- Update contact (should not re-trigger initial outreach unless configured)
- Duplicate contact creation attempt
Expected: correct association + note formatting (see section 6).

## 4) High-Risk Scenario Test Cases (Pass/Fail)

### 4.1 Missing Phone
Trigger: payload missing phone OR Jotform submission without phone.
Pass:
- No SMS sent.
- System creates a task/CRM note: “Lead missing phone — cannot text”.
- If email exists, send email asking for phone or offering link to schedule.
Fail:
- Attempted SMS (provider error) without suppression.

### 4.2 Invalid Phone
Trigger: phone not E.164 or clearly invalid.
Pass:
- Validation blocks SMS.
- CRM note created with raw phone + reason.

### 4.3 STOP / HELP Compliance
Trigger: reply “HELP” then “STOP” from test phone.
Pass:
- HELP returns support text (see fallback copy) including business email: agent_bob_replit+lead-copilot@agentmail.to and brief instructions.
- STOP results in confirmation (“You’re opted out…”) and **suppresses all future outbound** to that number.
- CRM note records STOP event with timestamp.
Fail:
- Any additional marketing/qualification messages after STOP.

### 4.4 After-hours Routing
Set business hours (e.g., 8am–6pm local). Trigger lead outside hours.
Pass:
- First SMS still sent <60s.
- Copy indicates after-hours + provides next-available response expectation + booking link.

### 4.5 Multiple Concurrent Leads
Trigger: submit 5 leads within 60 seconds (different phones).
Pass:
- All receive first SMS <60s.
- No cross-talk (wrong name/service in any message).
- CRM notes correctly associated.

### 4.6 Calendar Link Failure
Simulate by configuring an invalid booking URL or temporarily disabling calendar.
Pass:
- System detects failure (or at minimum provides alternative): “Reply with a good time” fallback.
- No dead-end conversation.

### 4.7 Webhook Retries
Trigger: send same webhook with same lead_id; or configure sender to retry on 500.
Pass:
- Idempotency prevents double texting.
- System returns 200 once accepted.

### 4.8 Duplicate Leads (Same Phone)
Trigger: submit two leads with same phone within 10 minutes.
Pass:
- Only one initial outreach; second event appends to CRM note: “Duplicate within 10m suppressed”.
- If service differs, note includes new context and optionally one clarifying message only if policy allows.

### 4.9 CRM Note Formatting (HubSpot)
Pass:
- Note includes: lead source, timestamps, first message, replies, qualification answers, booking status, opt-out events.
- Human-readable and auditable.

## 5) Deterministic Fallback Mode (LLM failure safe)
Trigger conditions (any): LLM timeout > 8s, API error, malformed output, or confidence below threshold.
Behavior: switch to deterministic script; do not mention “AI failed”.

### Initial SMS (always within 60s)
**In-hours:**
“Hi {first_name} — thanks for reaching out about {service}. Quick questions so we can help fast: 1) What’s your address/ZIP? 2) When would you like service: today, this week, or flexible?”

**After-hours:**
“Hi {first_name} — we got your request for {service}. We’re currently closed, but I can line this up. 1) What’s your ZIP? 2) Best time tomorrow (morning/afternoon/evening)?”

### Deterministic branching rules
- If user provides ZIP/address: store.
- Ask Q2 (timing) if missing.
- Ask Q3 (urgency) only if needed: “Is this urgent (no water/leak/no heat)?”
- After 3 questions OR if user asks to book: send booking link; if link fails, ask for preferred time and promise callback.

### HELP response (compliance)
“Support: Reply STOP to opt out. For help, email agent_bob_replit+lead-copilot@agentmail.to. If this is urgent, reply with ‘URGENT’ and a best callback time.”

### STOP response (compliance)
“You’re opted out and won’t receive more texts. Reply START to re-subscribe.”

### Escalation-to-human rules
- If user replies “call me” / “human” / “agent”: create task + notify operator; reply: “Got it — a team member will call you shortly. What’s the best number/time?”
- If calendar link fails: “Booking link is temporarily down—reply with 2 time windows that work and we’ll confirm.”

## 6) HubSpot Note Formatting Spec (copy/paste)
Title: “Lead Response Copilot — Conversation Transcript”
Body template:
- Lead Source: {source}
- Lead ID: {lead_id}
- Lead Captured (T0): {timestamp}
- First SMS Sent (T1): {timestamp} (Latency: {T1-T0}s)
- Mode: {LLM|DeterministicFallback}
- Qualification:
  - Service: {service}
  - ZIP/Address: {zip}
  - Timing: {timing}
  - Urgency: {urgency}
- Booking:
  - Link shown: {url}
  - Outcome: {booked|not_booked|link_failed}
- Compliance:
  - HELP received: {yes/no} at {time}
  - STOP received: {yes/no} at {time} (Suppression: {enabled})
- Transcript (chronological):
  - [{time}] OUT: ...
  - [{time}] IN: ...

## 7) Results Capture Tables (fill during pilot)
For each source, record 20 rows.
Columns: Trial # | Source | Lead ID | T0 | T1 | T2 | Send latency (s) | Perceived latency (s) | Pass/Fail | Notes/Evidence link

## 8) Bug/Fix List (seeded with likely issues)
1) Double-text on webhook retry (Severity: Critical) — Fix: enforce idempotency by lead_id + phone + 10m window.
2) STOP not suppressing follow-ups (Critical) — Fix: global blocklist check before any send.
3) After-hours message not used (High) — Fix: timezone-aware hours check.
4) Calendar link outage dead-ends flow (High) — Fix: alternate scheduling capture via reply + create task.
5) Concurrency cross-talk (High) — Fix: ensure per-lead conversation state keyed by phone/lead_id.
6) Invalid phone attempts send (Medium) — Fix: strict E.164 validation + country defaults.
7) HubSpot note formatting inconsistent (Medium) — Fix: single template + escape newlines.

## 9) Exit Criteria
- Evidence of <60s first outbound SMS in >=95% of trials per source.
- STOP/HELP verified with transcripts.
- Dedupe verified (no duplicate initial SMS) on retries/duplicates.
- Any critical bugs have a clear fix path documented before scaling outreach.
