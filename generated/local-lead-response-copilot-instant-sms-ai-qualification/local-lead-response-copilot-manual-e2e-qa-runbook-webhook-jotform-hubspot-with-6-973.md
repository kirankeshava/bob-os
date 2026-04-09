# Local Lead Response Copilot — Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:00:05.585Z

---

## Purpose
Validate that Local Lead Response Copilot reliably delivers first SMS response in <60 seconds and behaves safely across common failure/edge scenarios for the first 1–3 pilots. This is an operator-run manual E2E suite (no automation yet).

**Product proof links (use in any partner/customer context):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## Systems under test (3 lead sources)
1) **Generic Webhook JSON** (direct POST into our intake endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM: create/update contact + add note with transcript/metadata)

## Global acceptance criteria (must-pass)
1) **Speed-to-lead KPI:** First outbound SMS is **sent/queued within 60s** of lead receipt time for 95%+ of attempts (during test window). Record exact timestamps.
2) **Compliance:** STOP immediately opts out; HELP returns help message; no further marketing/qualification messages after STOP.
3) **Safety fallbacks:** If LLM errors/timeouts, system switches to deterministic flow (no hallucinated claims, no broken states).
4) **Idempotency/dedupe:** Retries/duplicates do not spam leads.
5) **After-hours:** Correct routing (either delayed message, voicemail-style message, or next-business-day scheduling prompt) per configuration.

## Instrumentation (how to measure <60s)
Capture three times for each test submission:
- **T0 Lead Received:** server receive timestamp (from logs/webhook intake record) OR the timestamp on the inbound lead record.
- **T1 SMS Queued/Sent:** messaging provider queued/sent time OR our outbound message log time.
- **T2 Handset Delivered (optional but recommended):** the receiving phone’s screenshot time (carrier delivery varies; use for informational only).

**KPI definition for pass/fail:** (T1 - T0) <= 60 seconds.

## Deterministic fallback qualification flow (NO-LLM)
Trigger this flow when:
- LLM returns error/timeout, OR
- LLM confidence is low/empty output, OR
- Any parsing/validation failure on LLM output.

**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what service do you need? Reply with 1) Repair 2) Install 3) Quote”

If reply == 1/2/3 then:
**Message 2:**
“Got it. What’s your ZIP code?”

If ZIP matches 5 digits:
**Message 3:**
“Thanks. What’s the best day/time for a quick call? Reply 1) ASAP 2) Today PM 3) Tomorrow 4) This week”

Then:
**Message 4 (handoff):**
“Perfect—here’s the booking link: {{calendar_link}}. If that link doesn’t work, reply ‘CALL’ and we’ll confirm by text.”

**Failure branches:**
- If calendar_link fails (known outage or HTTP failure): replace Message 4 with “Reply with your preferred time window and we’ll confirm.”
- If user replies STOP at any point: immediate opt-out confirmation.
- If after-hours: send “We’re currently closed; we’ll follow up at {{next_open_time}}. If urgent, reply URGENT.”

## Required test data
- A test mobile number you control (for inbound/outbound). Include a second number to test concurrency.
- A known business_name and calendar_link (even a placeholder link for failure testing).

## Test cases (execute across all 3 sources where applicable)
Each test case includes: **Setup → Action → Expected**.

### TC1 Normal lead (valid phone)
Action: submit lead with name + valid E.164 phone.
Expected: First SMS within 60s; qualification flow begins (LLM or deterministic). HubSpot note created/updated with metadata.

### TC2 Missing phone
Action: submit lead without phone.
Expected: No SMS attempt; create CRM note: “Phone missing—cannot text.” If email exists, send email fallback (optional). No crashes.

### TC3 Invalid phone
Action: submit phone like “12345” or non-E.164.
Expected: Validation fails; no SMS; CRM note indicates invalid phone; lead flagged for manual review.

### TC4 STOP compliance
Action: after first SMS, reply “STOP”.
Expected: immediate confirmation; opt-out stored; no further messages even if lead retries.

### TC5 HELP compliance
Action: reply “HELP”.
Expected: help message containing business name + support email agent_bob_replit+lead-copilot@agentmail.to.

### TC6 After-hours routing
Action: submit lead outside configured hours.
Expected: after-hours message + next steps; no booking prompts that imply immediate callback unless configured.

### TC7 Multiple concurrent leads
Action: submit 5 leads within 30 seconds (mix of two phone numbers).
Expected: no queue deadlocks; all first responses <60s; no cross-talk (messages tied to correct lead).

### TC8 Calendar link failure
Action: use intentionally broken calendar link or simulate calendar service down.
Expected: fallback prompts user to reply with preferred time; CRM note marks “Calendar link failure fallback used”.

### TC9 Webhook retries
Action: POST same webhook payload 3 times with same lead_id.
Expected: dedupe prevents multiple SMS; only one conversation created; CRM shows one consolidated entry.

### TC10 Duplicate leads (new lead_id but same phone)
Action: send two submissions with different IDs but same phone within 5 minutes.
Expected: either attach to same conversation or send a single additional message maximum; no spam loop; CRM notes reflect dedupe rule.

### TC11 CRM note formatting
Action: run any qualification (LLM or deterministic).
Expected: HubSpot note uses the exact format below.

## HubSpot note format (strict)
Title: “Lead Copilot Qualification Transcript”
Body (template):
- Lead Source: {{source}} (Webhook/Jotform/HubSpot)
- Lead ID: {{lead_id}}
- Received At (UTC): {{t0}}
- First SMS Sent At (UTC): {{t1}}
- Speed-to-Lead (sec): {{t1_minus_t0}}
- Name: {{name}}
- Phone: {{phone}}
- Email: {{email}}
- After-hours?: {{yes_no}}
- Opt-out Status: {{opted_in/STOPPED}}
- Outcome: {{booked / requested callback / no response / invalid phone / missing phone}}
- Booking Link Used: {{yes/no}}  

Transcript:
1) System: “...”
2) Lead: “...”
3) System: “...”
(continue)

## Jotform setup (minimum viable)
Create a form named “Lead Copilot Test Form” with:
- Name (Short Text)
- Phone (Phone)
- Email (Email)
- Service Needed (Dropdown)
- Hidden fields: lead_id, source, submitted_at

Configure submission to send to our webhook intake endpoint (or via free Zapier/Make if needed). Ensure the payload includes phone, name, email, lead_id.

## Generic webhook payloads (ready to paste)
### Valid
{
  "lead_id": "qa-001",
  "source": "webhook",
  "name": "Test Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Quote",
  "submitted_at": "2026-04-09T12:00:00Z"
}

### Missing phone
{
  "lead_id": "qa-002",
  "source": "webhook",
  "name": "No Phone",
  "email": "nophone@example.com",
  "service": "Repair",
  "submitted_at": "2026-04-09T12:01:00Z"
}

### Invalid phone
{
  "lead_id": "qa-003",
  "source": "webhook",
  "name": "Bad Phone",
  "phone": "12345",
  "email": "badphone@example.com",
  "service": "Install",
  "submitted_at": "2026-04-09T12:02:00Z"
}

### Duplicate lead_id (retry)
{
  "lead_id": "qa-001",
  "source": "webhook",
  "name": "Test Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Quote",
  "submitted_at": "2026-04-09T12:00:00Z",
  "retry": true
}

## Results table (fill during execution)
Columns:
- Case ID | Source | Lead ID | T0 Received | T1 SMS Sent | Delta (sec) | Pass <60s (Y/N) | Observed Behavior | Expected Match (Y/N) | Notes/Bug ID

Minimum run: 20 total submissions across all sources, with at least:
- 10 normal
- 2 missing phone
- 2 invalid phone
- 2 STOP
- 2 after-hours
- 2 duplicates/retries

## Bug log (template)
For each bug:
- Bug ID:
- Severity (Blocker/High/Med/Low):
- Source(s):
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (screenshots/log snippets):
- Proposed fix (smallest change first):
- Retest date/result:

## Known high-risk areas (watch during pilot)
- Phone normalization to E.164 and strict validation before sending SMS
- Dedupe rules (lead_id + phone + time window)
- Queue latency spikes causing >60s sends
- STOP/HELP handling across provider + internal state
- Calendar link failure and safe fallback messaging
- HubSpot note size limits / HTML vs plain text formatting

## Exit criteria (what ‘done’ looks like)
- Completed results table for 20 tests
- Documented proof that (T1-T0) <60s for 95%+ of cases
- Any failures have bug IDs with reproduction steps + mitigation workaround for pilots
- Deterministic fallback flow confirmed working by forcing LLM failure at least once
