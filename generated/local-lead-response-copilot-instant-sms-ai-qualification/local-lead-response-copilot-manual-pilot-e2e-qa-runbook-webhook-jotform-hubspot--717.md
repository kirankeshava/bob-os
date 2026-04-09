# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:48:16.422Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

Business proof URL to share with agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal & Success Criteria
**Goal:** Validate end-to-end reliability for early pilots (first 1–3 customers) without building automation. Ensure new leads from 3 sources receive an **initial SMS within 60 seconds** and the system behaves safely in common failure/edge conditions.

**Pass criteria:**
1. **Speed-to-lead KPI:** P95 initial response time < 60s (lead received → first SMS delivered to handset).
2. **Safety:** Deterministic fallback flow triggers on LLM failure (timeout/error) and continues qualification without hallucinations.
3. **Compliance:** STOP/HELP behavior correct and immediate.
4. **Operational resilience:** Dedupe, retries, concurrency, after-hours handling, calendar-link failure handling, and CRM logging all behave as expected.

## 2) Lead Sources In Scope (3)
1) **Generic Webhook JSON** (direct POST from form/ads/webhook tool)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

### Required Minimum Fields (normalize across sources)
- lead_id (string; source-provided unique id if available)
- first_name (string; optional)
- last_name (string; optional)
- phone (E.164 preferred; required to SMS)
- email (optional)
- service (optional)
- zip (optional)
- message/notes (optional)
- source (webhook|jotform|hubspot)
- created_at (ISO timestamp)

## 3) Environment & Pre-Flight Checklist
Before testing:
- Confirm SMS sending provider is connected in the pilot environment.
- Confirm messaging number is correct and can receive replies.
- Confirm after-hours schedule configured (business hours + timezone).
- Confirm calendar/booking handoff configured (or use a test booking URL).
- Confirm CRM writeback configured for HubSpot (notes/timeline events).
- Have at least 2 physical phones available:
  - Phone A: receives outbound SMS (test lead)
  - Phone B (optional): used for concurrency tests

## 4) KPI Timing Method (<60s) — How to Capture Proof
For each test submission, capture three timestamps:
1) **T0 Lead Received:** server logs / webhook receiver timestamp (or integration “received at”).
2) **T1 SMS Queued/Sent:** SMS provider message status timestamp (queued/sent).
3) **T2 SMS Delivered to Handset:** actual time observed on Phone A (use stopwatch + note time) OR provider “delivered” timestamp if accurate.

**Response Time:** T2 - T0 (primary), with T1 - T0 as secondary (system latency).

### Results Table (copy/paste)
| Test ID | Source | Scenario | T0 Received | T1 Sent | T2 Delivered | Seconds (T2-T0) | Expected | Actual | Pass/Fail | Notes |
|---|---|---|---|---|---|---:|---|---|---|---|

Target: **>= 20 total runs** spanning normal + edge cases. Aim for at least **5 per source**.

## 5) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)
Trigger this fallback when:
- LLM call errors, times out, or returns empty/invalid tool output
- Confidence/guardrail fails (e.g., missing required fields)

### Fallback SMS Script (deterministic)
**Message 1 (immediate):**
“Hi {first_name or “there”}, it’s {BusinessName}. Thanks for reaching out — I can help get you booked. What service do you need? Reply with a number: (1) Repair (2) Install (3) Quote (4) Other”

If reply = 1/2/3/4 (or text):
**Message 2:**
“Got it. What’s your ZIP code?”

If ZIP provided:
**Message 3:**
“Thanks. When would you like service? Reply: (1) ASAP (2) This week (3) Next week”

If schedule intent provided:
**Message 4 (booking handoff):**
“Perfect — you can pick a time here: {booking_link}. If you prefer, reply with 2 time windows that work for you.”

If booking link fails/unavailable:
**Message 4b (calendar down fallback):**
“Sorry — our booking link is temporarily unavailable. Reply with two times that work (e.g., ‘Tomorrow 2–4pm’), and we’ll confirm.”

### STOP/HELP Compliance (deterministic)
- If inbound contains “STOP” (case-insensitive) or equivalent opt-out keywords:
  - Immediately respond: “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  - Set contact opt_out=true; suppress further outbound.
- If inbound contains “HELP”:
  - Respond: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### After-Hours Behavior (deterministic)
If lead arrives outside business hours:
- Send immediate acknowledgement within 60s:
  “Thanks! We’re currently closed. We’ll text you back at {next_open_time}. If urgent, reply URGENT.”
- Queue follow-up at next open time.

## 6) Test Cases (by risk) with Expected Behaviors

### A) Missing phone
**Input:** lead has no phone or empty phone.
**Expected:**
- No SMS attempt.
- Create internal alert/CRM note: “Missing phone — cannot contact via SMS.”
- If email exists, optionally email fallback (if configured). Otherwise mark as “needs manual follow-up.”

### B) Invalid phone
**Input:** phone not parseable or wrong length.
**Expected:**
- Do not send SMS.
- Log validation error; add CRM note with raw phone value.

### C) STOP / HELP
**Input:** user texts STOP after first message.
**Expected:** immediate opt-out confirmation + suppress further messages.
**HELP:** send support instructions + opt-out instruction.

### D) After-hours
**Input:** lead arrives outside configured hours.
**Expected:** initial acknowledgement within 60s + defer qualification/booking until open (or proceed only if policy allows).

### E) Multiple concurrent leads
**Input:** submit 5 leads within 30 seconds.
**Expected:**
- All receive first SMS within 60s.
- No cross-talk (each conversation isolated).

### F) Calendar/booking link failures
**Input:** booking service returns error / link unreachable.
**Expected:** send “calendar down fallback” message; capture preferred time windows; log issue.

### G) Webhook retries
**Input:** same event delivered twice (retry) with same lead_id.
**Expected:** dedupe; do not send duplicate first SMS; log “duplicate suppressed.”

### H) Duplicate leads (same phone)
**Input:** two submissions with same phone within 10 minutes.
**Expected:** optionally suppress second outreach or merge thread; CRM should not show conflicting notes.

### I) CRM note formatting (HubSpot)
**Expected:** notes follow a strict template (below) and remain readable for agencies.

## 7) Ready-to-Paste Webhook JSON Payloads
Use these as POST bodies in your webhook tester.

### 7.1 Valid lead
```json
{
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550100",
  "email": "testlead@example.com",
  "service": "Quote",
  "zip": "94107",
  "message": "Need an estimate.",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z"
}
```

### 7.2 Missing phone
```json
{
  "lead_id": "wh_002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Repair",
  "source": "webhook",
  "created_at": "2026-04-09T12:01:00Z"
}
```

### 7.3 Invalid phone
```json
{
  "lead_id": "wh_003",
  "first_name": "BadPhone",
  "phone": "12345",
  "service": "Install",
  "source": "webhook",
  "created_at": "2026-04-09T12:02:00Z"
}
```

### 7.4 Duplicate lead id (dedupe)
```json
{
  "lead_id": "wh_dup_001",
  "first_name": "Dupe",
  "phone": "+14155550101",
  "service": "Quote",
  "source": "webhook",
  "created_at": "2026-04-09T12:03:00Z"
}
```
Send this twice; second should be suppressed.

### 7.5 Retry simulation (same payload, later timestamp)
```json
{
  "lead_id": "wh_retry_001",
  "first_name": "Retry",
  "phone": "+14155550102",
  "service": "Repair",
  "source": "webhook",
  "created_at": "2026-04-09T12:04:00Z",
  "meta": {"delivery_attempt": 2}
}
```

## 8) Jotform Test Setup (manual)
1) Create a Jotform test form with fields: Name, Phone, Email, Service (dropdown), ZIP, Notes.
2) Ensure phone field requires country code or enforce formatting.
3) Connect submission webhook/integration to Copilot endpoint.
4) Run at least 10 submissions:
   - 5 normal
   - 1 missing phone (if form allows)
   - 1 invalid phone
   - 1 after-hours (submit outside hours)
   - 2 rapid-fire concurrency
Record timings in the results table.

## 9) HubSpot Test Setup (manual)
1) Create HubSpot test account/pipeline.
2) Create test form (optional) or simulate new Contact creation + workflow/webhook into Copilot.
3) Validate writeback:
   - Contact created/updated
   - Note/timeline event added with the template below

### HubSpot Note Formatting Template (strict)
**Title:** “Lead Copilot — SMS Qualification Transcript”

**Body (paste format):**
- Lead ID: {lead_id}
- Source: {source}
- Received At (UTC): {T0}
- First SMS Sent At (UTC): {T1}
- First SMS Delivered At: {T2 or “unknown”}
- Phone: {E164}
- Opt-out: {true/false}
- After-hours: {true/false}
- Booking Outcome: {Booked / Link Sent / Needs Manual Scheduling / Opted Out}

Transcript:
1) System: “{msg1}”
2) Lead: “{reply1}”
3) System: “{msg2}”
4) Lead: “{reply2}”
...

Errors/Warnings:
- {any validation/LLM/calendar errors}

## 10) Bug Log Template (copy/paste)
| Bug ID | Severity (P0-P3) | Source | Scenario | Steps to Reproduce | Expected | Actual | Evidence (timestamps/screenshots) | Proposed Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|

Severity guidance:
- **P0:** compliance breach (STOP ignored), duplicate spam, >60s response frequently
- **P1:** occasional >60s, booking handoff broken, wrong lead mapped
- **P2:** formatting issues, minor delays, non-blocking errors
- **P3:** cosmetic copy/typos

## 11) Test Execution Order (fastest to highest risk)
1) Webhook valid lead (prove baseline <60s)
2) Webhook duplicates/retries (prove dedupe)
3) STOP/HELP (compliance)
4) After-hours
5) Calendar failure
6) Concurrency burst
7) Jotform 10-run set
8) HubSpot writeback + note formatting checks

## 12) Reporting to Agencies (what to share)
- A screenshot or export of the Results table proving <60s initial response.
- Confirmation that STOP/HELP and after-hours behaviors are deterministic.
- Link to business proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email for escalations: agent_bob_replit+lead-copilot@agentmail.to

---
End of runbook.