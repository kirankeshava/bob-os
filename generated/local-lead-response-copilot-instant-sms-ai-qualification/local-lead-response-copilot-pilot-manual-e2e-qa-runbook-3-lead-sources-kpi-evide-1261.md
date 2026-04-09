# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + KPI Evidence Standard + Deterministic Fail-safe Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:49:02.215Z

---

## Purpose
Run a fast, manual end-to-end QA pass during early pilots (no automation) to protect agency reputation. Validate (1) <60s first response from lead submission to first SMS sent, (2) safe failovers when AI/LLM fails, and (3) correct behaviors for compliance/edge cases.

## System Under Test (SUT)
Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with testers/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support contact for pilot comms: agent_bob_replit+lead-copilot@agentmail.to

## Lead Sources Covered (minimum 3)
1) Generic Webhook JSON (direct POST to ingest endpoint)
2) Jotform (real form tool)
3) HubSpot CRM (create/update contact + log note/task)

## KPI: <60s First Response — Evidence Standard
### What counts
- Pass: First outbound SMS is SENT within 60 seconds of lead submission.
- Stretch goal: Delivered within 60 seconds (carrier delays may impact; still record).

### Timestamp capture points (record all)
T0 = Lead submitted (form submit time / API call time)
T1 = Webhook received by Copilot (server log timestamp)
T2 = SMS send initiated (provider request timestamp)
T3 = SMS accepted/sent (provider status timestamp)
T4 = SMS delivered (if available)

### Evidence to store per trial
- Screenshot or exported log line showing T1
- SMS provider message log showing T2/T3 (and T4 if available)
- For Jotform: form submission receipt timestamp (T0)
- For webhook: curl output time + request ID correlation

### Sample size
- Minimum 20 trials total across the 3 sources
- Minimum 5 trials per source
- Include at least 5 “edge-case” trials from the scenarios below

## Required Test Data (use consistent identifiers)
Use a unique Lead External ID per attempt to test dedupe:
- external_id format: QA-YYYYMMDD-HHMMSS-<n>
- Example: QA-20260409-154501-01

### Generic Webhook JSON payloads (copy/paste)
#### A) Happy path
{
  "external_id": "QA-20260409-154501-01",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test.lead+01@example.com",
  "service": "Roof repair",
  "zip": "94107",
  "preferred_time": "ASAP",
  "consent": true,
  "submitted_at": "2026-04-09T15:45:01Z"
}

#### B) Missing phone
{
  "external_id": "QA-20260409-154501-02",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "test.lead+02@example.com",
  "service": "Plumbing",
  "consent": true,
  "submitted_at": "2026-04-09T15:45:01Z"
}
Expected: no SMS attempt; create CRM note “Missing phone” or error log; optional email fallback; must not loop retries indefinitely.

#### C) Invalid phone
{
  "external_id": "QA-20260409-154501-03",
  "source": "webhook",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "12345",
  "email": "test.lead+03@example.com",
  "service": "HVAC",
  "consent": true,
  "submitted_at": "2026-04-09T15:45:01Z"
}
Expected: fail fast with validation; no SMS; CRM note/error captures original value.

#### D) Duplicate lead (same external_id)
Send payload A twice.
Expected: second attempt deduped (no second SMS); CRM note indicates duplicate suppressed.

#### E) Webhook retry (same content, new request id)
Send payload A again with same external_id; add header X-Retry-Count: 1.
Expected: still dedupe.

## Jotform Setup Checklist (free tier)
Goal: ensure field mapping produces the same normalized lead object.
1) Create form fields:
- First Name (required)
- Last Name (optional)
- Phone (required)
- Email (optional)
- “What do you need help with?” (service)
- Zip code
- Preferred time
- Consent checkbox (required)
2) Configure webhook integration to Copilot ingest endpoint.
3) Submit 5 test leads (unique phone numbers if possible).
4) Record T0 from Jotform submission list.
5) Validate downstream: SMS sent, qualification begins, and CRM entries created.

## HubSpot Validation Checklist (free/developer)
Goal: confirm notes/tasks formatting is agency-readable and stable.
For each lead:
- Contact created/updated with phone + email
- Timeline note exists with:
  - Source (webhook/jotform)
  - external_id
  - Lead details (service, zip, preferred_time)
  - Conversation transcript snippet (first outbound + first inbound)
  - Disposition (Qualified / Not qualified / Needs follow-up)
- If booking occurs: store meeting link or scheduled time in a dedicated property or note.

### Required note formatting (exact structure)
Title: “Lead Copilot Intake — <external_id> (<source>)”
Body (markdown-safe/plaintext):
1) Lead
- Name: <first last>
- Phone: <E.164>
- Email: <email>
- Service: <service>
- Zip: <zip>
- Preferred time: <preferred_time>
2) Speed
- Submitted (T0): <timestamp>
- First SMS sent (T2/T3): <timestamp>
- SLA: PASS/FAIL (<seconds>s)
3) Conversation (latest first)
- Copilot: “<message>”
- Lead: “<message>”
4) Outcome
- Qualified: Yes/No
- Next step: Booked / Sent calendar link / Routed to human / Stopped

## Edge-Case Scenarios (execute + expected outcomes)
1) STOP
- Lead replies “STOP”.
Expected: immediate confirmation (“You’re opted out. Reply START to resubscribe.”) and suppress any further messages. Log opt-out in CRM.

2) HELP
- Lead replies “HELP”.
Expected: send help message with business identification and support email agent_bob_replit+lead-copilot@agentmail.to; do not ask qualification questions in same message.

3) After-hours
- Set business hours (e.g., 9am–6pm local). Submit lead outside hours.
Expected: send after-hours message acknowledging receipt + expectation + option to book; route to next-day follow-up; no aggressive multi-message sequence overnight.

4) Multiple concurrent leads
- Submit 5 leads within 30 seconds.
Expected: all receive first SMS within SLA; no cross-talk (messages never sent to wrong phone); CRM notes link correct external_id.

5) Calendar link failure
- Simulate booking link down/invalid.
Expected: apology + alternative (“reply with best time window”); escalate to human; record incident.

6) LLM failure/timeout
- Simulate by disabling model key or forcing timeout.
Expected: deterministic fallback questions (below) used; never returns raw error text to lead; still qualifies and routes.

7) Webhook retries
- Same lead resent 3 times.
Expected: only one SMS; idempotency key external_id prevents duplicates.

8) Missing/invalid phone
Expected: no SMS attempt; record in CRM; optionally email fallback if email present.

## Deterministic Fail-safe Qualification Flow (No LLM)
Trigger conditions:
- LLM API error, timeout (>3s), empty response, or confidence flag below threshold.

Rules:
- Max 3 questions before routing.
- Single message at a time; wait up to 5 minutes for response before one reminder.
- Never ask for sensitive data (SSN, card numbers).

Message 0 (immediate, always within SLA):
“Hi <first_name>, it’s <Business Name>. Thanks for reaching out about <service>. Quick questions so we can help fast.”

Q1 (need/type):
“1) What do you need help with? Reply A) New install B) Repair C) Estimate/quote D) Other”
Branch:
- If D/Other: ask free text: “Tell me a bit more in one sentence.”

Q2 (urgency):
“2) How urgent is this? Reply A) Emergency today B) This week C) Not urgent”

Q3 (location readiness):
“3) What ZIP code is the job at?” (skip if already captured)

Routing outcomes:
- If Emergency today: “Got it — we’ll call you ASAP. What’s the best time in the next 30 minutes?” Create high-priority task.
- If This week/Not urgent: “Thanks — you can grab a time here: <calendar_link>. If the link doesn’t work, reply with 2 times that work for you.”

Compliance inserts:
- If inbound == STOP: opt-out flow (no further messages)
- If inbound == HELP: help flow

## Results Table (fill during execution)
Columns:
Trial # | Source | external_id | Scenario | T0 | T1 | T2/T3 | Delta (T0->T3) sec | PASS/FAIL | Notes | Evidence link

## Bug/Fix Log (prioritize churn risk)
Fields:
ID | Severity (P0-P3) | Scenario | Steps to Repro | Expected | Actual | Impact | Suggested Fix | Owner | Status

## Exit Criteria (pilot-ready)
- 20 trials completed with evidence stored
- >= 95% of trials meet <60s sent SLA (or documented root cause)
- STOP/HELP compliant behavior verified with transcripts
- Dedupe/idempotency verified
- Deterministic fallback verified (LLM down) without user-facing errors
- HubSpot note formatting matches the required structure
