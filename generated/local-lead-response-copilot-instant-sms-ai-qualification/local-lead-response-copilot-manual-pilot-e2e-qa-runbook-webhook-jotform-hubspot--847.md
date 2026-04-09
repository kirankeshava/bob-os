# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:58:24.888Z

---

## Purpose
Protect agency reputation and reduce month-1 churn by verifying that every new lead gets a first SMS in <60 seconds and that the system behaves safely when the LLM, calendar, or downstream integrations fail.

**Product legitimacy reference (use in any pilot comms):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support contact:** agent_bob_replit+lead-copilot@agentmail.to

## Scope (3 lead sources)
1) **Generic Webhook JSON** (baseline, easiest to control)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (CRM-side creation / note formatting validation)

## KPI to verify
**Speed-to-lead:** Lead submitted/received → First outbound SMS sent (and ideally delivered) within **<60 seconds**.

### Evidence to capture (per test run)
- T0: lead submitted timestamp (Jotform submission time or webhook request time)
- T1: server receive time (ingestion logs if available)
- T2: SMS queued/sent time (provider log or app log)
- T3: handset delivery/receipt time (phone screenshot)
- Compute: T2–T0 and T3–T0

## Test environment prerequisites
- A test phone capable of receiving SMS (and sending STOP/HELP).
- A known “after-hours” window configured OR a test toggle to simulate after-hours.
- Calendar booking target (can be a placeholder link) and a way to intentionally break it (404 link) for failure tests.
- HubSpot test portal access with permissions to view contact activity/notes.

## Deterministic (No-LLM) Fallback Qualification Flow
### Trigger conditions
Use deterministic flow when any of these occur:
- LLM call errors, non-2xx, timeout, or empty/invalid response.
- LLM response fails validation (missing required fields like next_question).

### Deterministic SMS script (exact copy)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote?”

If YES/OK/anything non-stop:
**Q1:** “What service do you need? Reply with: 1) Repair 2) Install 3) Estimate 4) Other”

**Q2 (based on Q1 but deterministic):**
- If 1/Repair: “Got it—what’s the main issue in 3–6 words?”
- If 2/Install: “What are we installing? (e.g., water heater, HVAC, garage door, etc.)”
- If 3/Estimate: “What’s the address or ZIP code for the estimate?”
- If 4/Other: “Briefly describe what you need.”

**Booking handoff (if calendar is healthy):**
“Thanks—want to book a quick call or appointment? Here’s the link: {{calendar_link}}. If you prefer, reply with a time window (e.g., ‘today 3–5’).”

**If calendar link fails (detected or reported):**
“Sorry—our booking link is acting up. Reply with 2 times that work for you and we’ll confirm ASAP.”

### STOP/HELP compliance (must override everything)
- On inbound “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately mark opted-out; send: “You’re opted out and will no longer receive messages. Reply HELP for info.”
- On inbound “HELP”: “{{business_name}}: We text to follow up on your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

## Fail-safe behavior matrix (expected)
1) **Missing phone**: Do not send SMS; create CRM note “Missing phone—SMS not sent”; optionally email internal alert.
2) **Invalid phone** (non-E.164/too short): Do not send SMS; CRM note with raw value; mark lead as “Needs phone”.
3) **STOP**: Suppress all future outbound; log opt-out event; CRM note includes timestamp and keyword.
4) **HELP**: Send HELP response; do not change qualification state.
5) **After-hours**: Send a single acknowledgement + next-open message, e.g., “We’re closed right now—next available is {{open_time}}. Want the first slot tomorrow?”; do not spam.
6) **Multiple concurrent leads**: No cross-talk; each lead conversation state isolated; verify no message goes to wrong number.
7) **Calendar failure**: Fallback to “reply with two times”; create internal flag “calendar_down”.
8) **Webhook retries**: Idempotent by lead_id; duplicates should not resend first SMS if already sent.
9) **Duplicate leads**: Dedup by phone + last_submit_window (e.g., 15 min) OR lead_id; merge into one thread; CRM note “duplicate detected”.
10) **CRM note formatting**: Always readable, consistent, and agency-report-ready.

## HubSpot note format (strict template)
**Title:** Lead Copilot — Conversation Summary

**Body (exact headings):**
- Lead Source: {{source}} (Webhook/Jotform/HubSpot)
- Lead ID: {{lead_id}}
- Name: {{first_name}} {{last_name}}
- Phone: {{phone_e164}} (Opt-out: {{true/false}})
- Submitted: {{timestamp}}
- First SMS Sent: {{timestamp}} (Delta: {{seconds}}s)
- Qualification:
  - Service Type: {{value}}
  - Details: {{value}}
  - ZIP/Address: {{value}}
- Outcome: {{Booked/Requested callback/No response/Opted out}}
- Booking Link Used: {{url or “N/A (calendar down)”}}
- Transcript (last 10 messages max):
  1) OUT {{time}}: ...
  2) IN  {{time}}: ...

## Test cases (run at least 20 total)
### A) Generic Webhook JSON (8 tests)
Use these payload patterns (adapt endpoint/path to your webhook receiver).

1. **Valid lead**
{ "lead_id":"w-001","source":"webhook","first_name":"Test","last_name":"One","phone":"+14155550101","email":"test1@example.com","service":"Estimate" }
Expected: First SMS <60s, normal or fallback qualification.

2. **Missing phone**
{ "lead_id":"w-002","source":"webhook","first_name":"Test","last_name":"NoPhone","email":"test2@example.com" }
Expected: No SMS; CRM note indicates missing phone.

3. **Invalid phone**
{ "lead_id":"w-003","source":"webhook","first_name":"Test","last_name":"BadPhone","phone":"415-555","email":"test3@example.com" }
Expected: No SMS; CRM note indicates invalid phone.

4. **Duplicate lead_id retry** (send same payload twice)
{ "lead_id":"w-004","source":"webhook","first_name":"Test","last_name":"Dup","phone":"+14155550102" }
Expected: Only one first SMS; second request logged as duplicate.

5. **Webhook retry header simulation** (if supported): resend with same lead_id and a retry flag.
Expected: idempotent.

6. **After-hours** (submit during configured closed window)
Expected: after-hours acknowledgement, no aggressive qualification.

7. **Concurrency**: fire 5 leads within 10 seconds (w-010 to w-014)
Expected: correct routing, no delays beyond 60s, no cross-talk.

8. **Calendar failure**: set calendar link to invalid and submit
Expected: fallback “reply with two times”, CRM note “calendar_down”.

### B) Jotform (7 tests)
Form fields required:
- first_name, last_name, phone, email, service dropdown
Hidden fields:
- lead_id (autogen), source="jotform"

Run:
1) Normal submission with valid phone
2) Missing phone (if allowed) or phone field with spaces
3) Invalid phone length
4) Submit twice with same phone within 5 minutes (duplicate)
5) After-hours submission
6) Calendar failure path
7) STOP/HELP compliance: after first SMS, reply STOP, then ensure suppression; separately test HELP.

Expected: identical behaviors to webhook; verify Jotform timestamp captured for KPI.

### C) HubSpot CRM (5 tests)
Goal: verify that creating/updating a contact via HubSpot path triggers correct SMS + note formatting.

1) Create new contact with phone; confirm first SMS <60s and note created
2) Create contact missing phone; ensure no SMS and note indicates missing phone
3) Update existing contact phone; ensure no duplicate first SMS unless explicitly intended
4) Duplicate contact creation attempt (same phone/email); ensure dedupe and single conversation
5) Note formatting audit: headings present, delta seconds included, transcript appended

## Results table (copy/paste)
| Test ID | Source | Scenario | T0 Submit | T2 SMS Sent | Delta (s) | Pass <60s | Notes/Evidence |
|---|---|---|---|---|---:|---|---|
| w-001 | Webhook | Valid |  |  |  |  |  |
| w-002 | Webhook | Missing phone |  |  |  |  |  |
| jf-001 | Jotform | Valid |  |  |  |  |  |
| hs-001 | HubSpot | New contact |  |  |  |  |  |

## Bug log template
- Bug ID:
- Title:
- Severity: (P0 revenue-risk / P1 high / P2 medium / P3 low)
- Source: Webhook/Jotform/HubSpot
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (screenshots/log lines):
- Suggested fix (smallest change first):
- Retest result:

## Acceptance criteria (pilot-ready)
- 20/20 tests executed with recorded timestamps.
- 95%+ of first SMS sends occur <60 seconds (and 100% <60 seconds for the “happy path” cases).
- STOP/HELP fully compliant and overrides any flow.
- Dedup/idempotency prevents duplicate first SMS on retries/duplicates.
- HubSpot notes match the strict template and are readable for agencies.

## If KPI fails (operational mitigations before engineering)
- Check SMS provider queue/backlog; verify rate limits.
- Reduce synchronous work before initial SMS (send first SMS immediately, do qualification after send).
- Add retry/backoff only after first SMS attempt is logged.
- Temporarily force deterministic flow if LLM latency is causing >60s.
