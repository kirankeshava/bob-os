# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:08:13.402Z

---

## 0) Purpose
Validate reputation-critical reliability during early pilots (no automation yet): prove **<60s first response** and safe failovers across **3 lead sources**:
1) Generic Webhook JSON (any form/ads platform)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Business proof link to share with pilots/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support contact for pilot comms: agent_bob_replit+lead-copilot@agentmail.to

---
## 1) KPI: <60s First Response — Measurement Protocol
**Goal:** First outbound SMS must be initiated within 60 seconds of lead creation.

### Timestamp points (record all)
- T0: Lead created time
  - Webhook: server received timestamp (or request sent timestamp from Postman)
  - Jotform: submission timestamp in Jotform “Submissions” view
  - HubSpot: form submission or contact creation timestamp in HubSpot timeline
- T1: Copilot “lead accepted/queued” timestamp (app logs)
- T2: SMS provider “message created/sent” timestamp (provider logs)
- T3: Recipient phone receives message time (phone screenshot)

### Evidence to capture
- Screenshot or log line for T0
- Screenshot/log line for T2 (provider)
- Phone screenshot showing received SMS and time (T3)

### Pass/Fail
- **PASS:** (T2 - T0) ≤ 60 seconds for 95% of trials; no single trial > 120 seconds.
- **FAIL:** Any systemic delay > 60s OR more than 1/20 trials > 120s.

### Sample size
- Minimum **20 total trials** across sources (suggested: 8 webhook, 6 Jotform, 6 HubSpot).

---
## 2) Environment + Pre-Flight Checklist (10 minutes)
1) Confirm outbound SMS number is active and logs are accessible.
2) Confirm suppression list behavior exists (STOP compliance).
3) Confirm after-hours rules configured (business hours + timezone).
4) Confirm booking action configured (calendar link or booking endpoint).
5) Confirm deterministic fallback mode can be toggled or is auto-triggered on LLM error/timeout.

Record configuration snapshot:
- Business timezone:
- Business hours:
- Booking method (calendar link / scheduler API):
- Human escalation destination (email/SMS/CRM task):

---
## 3) Lead Source Test Setup
### A) Generic Webhook JSON
**Objective:** Ensure minimal payload works, validates phone, dedupes, retries safely.

#### Sample payloads
1) Valid lead payload (baseline)
```json
{
  "source": "webhook",
  "source_id": "test-001",
  "first_name": "Alex",
  "last_name": "Taylor",
  "phone": "+14155550123",
  "email": "alex@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "notes": "Leaking unit, need today"
}
```
Expected:
- SMS sent to +14155550123 within 60s
- Qualification begins (LLM or deterministic)
- CRM note (if enabled) includes source, service, notes, timestamps

2) Missing phone (must not attempt SMS)
```json
{
  "source": "webhook",
  "source_id": "test-002",
  "first_name": "Jamie",
  "email": "jamie@example.com",
  "service": "Drain cleaning"
}
```
Expected:
- **No SMS** attempt
- Create a task/note “Missing phone” and send escalation to human channel
- System marks lead as “needs contact info”

3) Invalid phone
```json
{
  "source": "webhook",
  "source_id": "test-003",
  "first_name": "Sam",
  "phone": "1234",
  "service": "HVAC tune-up"
}
```
Expected:
- **No SMS** attempt
- Error noted with validation reason
- Escalation created

4) Duplicate lead (same phone within window)
```json
{
  "source": "webhook",
  "source_id": "test-004",
  "first_name": "Alex",
  "phone": "+14155550123",
  "service": "Water heater repair",
  "notes": "Submitting again"
}
```
Expected:
- Dedupe triggers (see Section 6)
- No second full qualification thread (or system sends “We’re already on it” message once)

#### Webhook retry simulation
- Resend the exact payload with the same `source_id` 3 times within 2 minutes.
Expected:
- Idempotent handling (no duplicate SMS blasts)


### B) Jotform (Real Form Tool)
**Objective:** Validate a real form submission triggers same flow reliably.

#### Form fields required
- First name
- Phone (required)
- Service needed (dropdown)
- Preferred time (optional)
- Notes (optional)

#### Jotform test cases
1) Normal submission with valid E.164 phone (baseline)
2) Submission missing phone (if Jotform requires phone, temporarily make optional for this test)
3) Submission with invalid phone formats (e.g., “(415) 555-0123”, “4155550123”) to confirm normalization

Expected for normalization:
- System converts to E.164 and proceeds, OR rejects with clear error and escalation

Evidence:
- Jotform submission timestamp (T0)
- SMS provider timestamp (T2)


### C) HubSpot (CRM)
**Objective:** Validate CRM-originated leads create correct notes/tasks and formatting.

#### HubSpot test cases
1) New Contact created (or Form submission) with phone + service notes
2) Duplicate contact update (ensure dedupe)
3) CRM note formatting verification (see Section 7)

Expected:
- Qualification transcript logged to HubSpot note (clean formatting)
- No HTML garbage, no broken newlines

---
## 4) High-Risk Scenario Tests (Must Pass)
### 4.1 STOP / HELP compliance
Steps:
1) After first outbound message, reply “STOP”.
Expected:
- Immediate confirmation message (or compliant silent suppression depending on provider rules)
- Lead is suppressed; no further automated messages

2) Reply “HELP”.
Expected:
- Help message includes business identifier and support email: agent_bob_replit+lead-copilot@agentmail.to

3) Try to trigger another message to same phone (new lead).
Expected:
- No SMS sent; system logs “suppressed due to STOP”


### 4.2 After-hours handling
Configure business hours (example): Mon-Fri 8am–6pm local.
Steps:
- Submit lead outside hours.
Expected:
- First SMS within 60s but message copy indicates next steps and timeframe OR queues for morning depending on policy.
- If policy is “do not text after-hours,” then no SMS is sent and a morning scheduled send is created (document which policy is used).


### 4.3 Multiple concurrent leads
Steps:
- Submit 5 leads within 30 seconds (different phones).
Expected:
- All receive first SMS within KPI
- No cross-talk between threads (wrong names/services)


### 4.4 Calendar/booking link failure
Steps:
- Configure booking link to an intentionally invalid URL (or simulate 500 response).
Expected:
- System switches to fallback: offer 2–3 time windows to choose from, then escalates to human to confirm
- No dead-end messaging to lead


### 4.5 Webhook retries
Steps:
- Send same webhook payload with same id multiple times.
Expected:
- Single conversation created; retries logged as idempotent replays

---
## 5) Deterministic Fallback Mode (LLM Failure Safe-Flow)
**Trigger conditions** (any of these):
- LLM timeout > 8 seconds
- LLM returns error/empty
- LLM confidence below threshold (if available)
- Any exception during qualification

### Message templates (exact copy)
**Initial SMS (sent immediately on lead receipt):**
“Hi {{first_name}}, it’s {{business_name}}. Got your request for {{service}}. Quick questions so we can get you scheduled—are you looking for service **today** or **this week**?”

If no reply in 3 minutes:
“Just checking—do you prefer **today** or **this week**?”

**Q1 Branch:**
- If “today”:
“Got it. What’s the address or ZIP code for the job?”
- If “this week”:
“Great. What day/time window works best (e.g., Tue morning, Wed after 3pm)?”

**Q2 (collect job detail):**
“Briefly, what’s going on? (1 sentence is fine)”

**Q3 (confirm contact):**
“Best email for the confirmation?”

**Booking step (if calendar works):**
“Perfect—here’s the link to book the soonest time that works: {{booking_link}}”

**If booking link fails or unavailable:**
“Thanks—our scheduler is acting up. Reply with two time windows that work (e.g., ‘tomorrow 9-11 or 2-4’) and we’ll confirm ASAP.”

**Escalation-to-human rule:**
- Escalate if:
  - No response after 2 nudges
  - Any “angry/urgent” keyword (e.g., “complaint”, “refund”, “lawsuit”, “bleeding gas”, “fire”)
  - Booking link failure

**Escalation message to lead:**
“Thanks—looping in a human to confirm the next step. You’ll hear back shortly.”

### Deterministic data to log to CRM
- lead source + source_id
- T0/T2 timestamps
- answers to Q1–Q3
- booking link offered? (Y/N)
- escalated? reason

---
## 6) Dedupe + Idempotency Rules (Expected Behavior)
- Primary key: normalized phone (E.164)
- Dedupe window: 30–60 minutes (configurable)
- If duplicate detected:
  - Do not start a second conversation thread
  - Optionally send one message: “We got your request—still working on it. Reply here if anything changed.”
- Webhook idempotency: `source_id` must be stored; replayed IDs should not resend SMS

---
## 7) HubSpot Note Formatting (Expected)
**Single note body format (plain text):**
Title: “Lead Copilot Qualification — {{date}}”
Body:
- Source: Jotform / Webhook / HubSpot
- Lead: {{first_name}} {{last_name}} — {{phone}} — {{email}}
- Service: {{service}}
- Speed-to-lead: {{T2-T0}} seconds
- Transcript:
  - Outbound: “…message…”
  - Inbound: “…reply…”
  - Outbound: “…message…”
- Booking:
  - Link offered: yes/no
  - Booked: yes/no (if known)
- Status: Qualified / Unqualified / Needs human

**Must NOT happen:**
- HTML tags visible
- Missing newlines (wall of text)
- Wrong lead attached

---
## 8) Results Capture Tables (paste into doc/spreadsheet)
### Trial log
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (baseline/invalid phone/STOP/etc)
- T0
- T2
- Delta seconds
- Pass/Fail
- Evidence links (screenshots/log refs)
- Notes

### Bug log
Columns:
- Bug ID
- Severity (P0/P1/P2)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Impact (conversion/compliance/reputation)
- Suggested fix
- Owner
- Status

---
## 9) Run Order (Under 60 minutes)
1) Baseline: 1 webhook + 1 Jotform + 1 HubSpot (prove plumbing)
2) STOP/HELP on one number
3) Missing/invalid phone tests
4) Concurrency (5 leads)
5) Calendar failure
6) Webhook retries + duplicates
7) HubSpot note formatting spot-check

Definition of Done for pilot QA:
- At least 20 trials recorded
- <60s KPI met per Section 1
- STOP suppression verified with evidence
- Deterministic fallback demonstrated at least once (simulate LLM failure/timeout) and documented
- Bug list prioritized with fixes assigned