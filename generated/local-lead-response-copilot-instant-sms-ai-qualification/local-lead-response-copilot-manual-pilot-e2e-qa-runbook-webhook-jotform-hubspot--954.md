# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:49:25.779Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

Purpose: validate reputation-critical reliability for early agency pilots without building automated QA. This runbook verifies (1) <60s first response and (2) safe fail-safes when LLM/integrations fail.

Reference assets (include in any comms/screenshots):
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

---
## 0) Pre-Flight Setup (10–20 min)

### Required items
- A test mobile number that can receive SMS (one per tester).
- Ability to submit leads via:
  1) Generic webhook (JSON)
  2) Jotform (form tool)
  3) HubSpot (CRM)

### Environment checklist
- Confirm your SMS provider is connected and can send outbound messages.
- Confirm an “after-hours” window is configured (e.g., 6pm–8am local time).
- Confirm STOP/HELP keyword handling is enabled.
- Confirm calendar booking link/booking step exists (or a simulated booking URL).

---
## 1) KPI: <60s First Response — How to Measure

Goal: For each lead submission, prove time from lead-received to first outbound SMS delivered is <60 seconds.

Capture these timestamps:
1) **T0 Lead Received (server/app)**: timestamp when webhook/Jotform/HubSpot event is received.
2) **T1 SMS Queued/Sent (provider/app)**: timestamp when the SMS is created/queued/sent.
3) **T2 SMS Delivered (handset)**: timestamp visible on the receiving phone.

Compute:
- **Response latency** = T2 – T0 (primary)
- If T2 unavailable, use T1 – T0 (secondary) and note limitation.

### Results table (copy/paste)
| Test ID | Source | Scenario | T0 Lead Received | T1 SMS Sent | T2 Delivered | Latency (T2-T0) | Pass (<60s) | Notes |
|---|---|---|---|---|---|---|---|---|

Acceptance criteria:
- 90%+ of tests: <60s to delivery (T2-T0).
- 100%: system attempts first response (T1 exists) unless phone invalid/missing.

---
## 2) Lead Sources to Test (3)

### A) Generic Webhook JSON
Minimum fields:
- lead_id (string)
- first_name (string)
- last_name (string optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- source (e.g., "webhook")

**Test payloads (ready to paste)**
1) Valid lead:
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+15555550101",
  "email": "test.webhook@example.com",
  "service": "Water heater repair",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:00:00Z"
}
```
2) Missing phone:
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "phone": "",
  "source": "webhook"
}
```
3) Invalid phone:
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "1234",
  "source": "webhook"
}
```
4) Duplicate lead (same lead_id): send payload #1 again.
5) Retry scenario: send payload #1 twice within 5–10 seconds but with same lead_id and identical phone.

Expected behaviors:
- Valid: first SMS sent immediately; qualification begins.
- Missing/invalid phone: **no SMS**; create internal/CRM note “Phone missing/invalid; cannot text”; optionally send email if available.
- Duplicate/retry: do not double-text; record “duplicate suppressed” in notes.

### B) Jotform (Real form tool)
Create a test form with fields:
- First name, Last name
- Phone
- Email
- Service needed (dropdown)
- Preferred time (optional)
- Consent checkbox (if used)

Test cases:
- Submit 5 valid leads quickly (different phones) to simulate concurrency.
- Submit 1 lead with phone empty.
- Submit 1 lead with invalid phone.

Expected behaviors:
- Same as webhook: immediate first SMS for valid; safe handling for missing/invalid.

### C) HubSpot (CRM)
Trigger: new Contact created OR new Form submission event OR new Deal created (pick whichever integration supports).

Test cases:
- New contact with valid mobile.
- New contact without phone.
- Update existing contact with same phone (dedupe check).

Expected behaviors:
- Must not repeatedly re-qualify the same contact within dedupe window.
- Notes must be formatted cleanly (see §6).

---
## 3) Deterministic Fallback Qualification Flow (No-LLM)

Trigger fallback if:
- LLM request times out (>8s) OR
- LLM returns empty/invalid output OR
- Any exception in LLM pipeline.

**SMS Copy (exact text)**
1) First message (immediate):
“Hi {first_name}, it’s {business_name}. Got your request for {service}. Quick question—what’s the address or ZIP code for the job?”

2) After ZIP/address:
“Thanks—what’s the best time for a quick call? Reply 1) ASAP 2) Today 3) Tomorrow”

3) After time choice:
“Perfect. Last question—what’s the main issue? Reply with a short description.”

4) Handoff:
- If calendar is working: “Thanks. Book a time here: {calendar_link}. If you prefer, reply with a time window and we’ll confirm.”
- If calendar fails/unavailable: “Thanks. Our booking link is temporarily down—reply with a 2-hour window today/tomorrow and we’ll confirm by text.”

Stop conditions:
- If user replies STOP: immediately mark opted-out; send confirmation per provider compliance.
- If user replies HELP: send: “You can reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to and include your phone number.”

---
## 4) Required Fail-Safe Behaviors (Matrix)

1) Missing phone
- Expected: no SMS attempt; log error; create CRM note “Missing phone; cannot text”; notify via email if available.

2) Invalid phone
- Expected: no SMS attempt; log “invalid phone format”; CRM note.

3) STOP keyword
- Expected: immediate opt-out; suppress all future messages; CRM note “Opted out (STOP) at {timestamp}”.

4) HELP keyword
- Expected: send help message with opt-out instructions and support email.

5) After-hours
- Expected: either (a) send a single after-hours acknowledgement + next-business-hours promise, or (b) queue first qualification message for opening time. Must be consistent and documented.

6) Multiple concurrent leads
- Expected: no cross-talk (each lead tied to its own phone/thread); response latency remains <60s for first SMS.

7) Calendar link failures
- Expected: detect failure (link unreachable/error from calendar API) and switch to manual scheduling prompt (fallback step 4).

8) Webhook retries
- Expected: idempotency by lead_id and/or (phone + submitted_at bucket). Do not double-text.

9) Duplicate leads
- Expected: suppress duplicate qualification if dedupe window (e.g., 30–60 minutes) matches; add CRM note.

10) CRM note formatting
- Expected: a single structured note per lead with transcript + metadata (see next section).

---
## 5) Execution: Minimum 20 Test Submissions

Target distribution:
- Webhook: 8 tests (including duplicates/retries, missing/invalid)
- Jotform: 6 tests (incl. concurrency)
- HubSpot: 6 tests (incl. dedupe/update)

For each test:
1) Start a stopwatch.
2) Submit lead.
3) Record T0 from app logs/event viewer.
4) Record T1 from SMS logs.
5) Record T2 from handset message timestamp.
6) Verify expected behavior (did correct message send? did fallback trigger? did after-hours apply?).
7) Verify CRM note created/updated with correct format.

---
## 6) HubSpot CRM Note Format (Strict Template)

Title:
“Lead Copilot — Qualification Transcript ({source}) — {lead_id}”

Body (exact sections):
- Lead metadata:
  - Lead ID: {lead_id}
  - Source: {source}
  - Submitted at: {submitted_at}
  - Name: {first_name} {last_name}
  - Phone: {phone} (valid/invalid)
  - Email: {email}
  - Service: {service}
  - After-hours applied: yes/no
  - Opt-out status: opted-in/STOP

- Timing:
  - Lead received (T0): {timestamp}
  - First SMS sent (T1): {timestamp}
  - First SMS delivered (T2): {timestamp if available}
  - First response latency: {seconds}

- Transcript:
  - Outbound 1: “...”
  - Inbound 1: “...”
  - Outbound 2: “...”
  - …

- Outcome:
  - Qualified? yes/no/partial
  - Booking link offered: yes/no
  - Appointment booked: yes/no (time if known)
  - Next step: call/text follow-up owner

---
## 7) Bug Log + Fix List Template

| Bug ID | Severity (P0-P2) | Source | Scenario | Steps to Reproduce | Expected | Actual | Evidence (screenshots/logs) | Suggested Fix | Status |
|---|---|---|---|---|---|---|---|---|---|

Severity guidance:
- P0: compliance risk (STOP ignored), double-texting, >60s common latency, wrong recipient.
- P1: calendar failure no fallback, dedupe broken, after-hours wrong.
- P2: formatting, minor copy issues.

---
## 8) What “Verified <60s” Means for Pilots

You can claim “<60s first response” for a pilot when:
- At least 20 test leads across the 3 sources are executed.
- At least 18/20 show T2–T0 <60s (or documented carrier delay with T1–T0 <60s).
- Zero P0 bugs remain (especially STOP/opt-out + duplicate suppression).

If KPI fails:
- First try operational mitigations (reduce LLM dependency via fallback, reduce webhook processing steps, confirm SMS provider queue, confirm after-hours behavior). Only propose engineering changes after you can reproduce the failure reliably.
