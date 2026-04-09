# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:00:55.973Z

---

## 0) Purpose / Success Criteria
This runbook validates end-to-end reliability during early pilots (no automated suite yet). It focuses on reputation-protecting behaviors:
- **KPI:** first outbound SMS sent within **<60 seconds** of lead receipt for each lead source.
- **Safety/compliance:** correct handling of missing/invalid phone, STOP/HELP, after-hours routing, duplicates, retries, calendar failures, and concurrency.
- **Agency reporting quality:** clean, consistent **HubSpot note formatting**.

**Product legitimacy references (include in pilot comms if needed):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope: 3 Lead Sources
1) **Generic Webhook JSON** (direct POST to ingestion endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM lead/contact creation -> workflow/webhook into copilot)

## 2) Preconditions / Setup Checklist (Operator)
Record these before testing:
- Business/test account name: __________________________
- Test phone numbers used (at least 2 unique): __________________________
- Test hours configuration:
  - Business hours: ____ to ____ (timezone: ____)
  - After-hours behavior expected: (pause + next-day follow-up OR immediate message indicating next-day response) choose: __________
- Booking link / calendar link configured: __________________________
- Dedicated sender number (or messaging service): __________________________
- CRM destination (HubSpot portal + object): __________________________

**Logging required:**
- Ability to see “lead received timestamp” at ingestion (server log/DB entry/audit log)
- Ability to see “SMS queued/sent timestamp” (provider log/app log)
- Handset “message received timestamp” (screenshot acceptable)

## 3) Timing / KPI Evidence Method (<60s)
For each test case, capture three timestamps:
- **T0 Lead Received:** when system records inbound lead (server receive time)
- **T1 SMS Sent/Queued:** when system/provider indicates outbound SMS was created
- **T2 Handset Delivered:** time shown on receiving handset

Compute:
- **Response time (system):** T1 - T0 (must be <60s)
- **Response time (real-world):** T2 - T0 (best-effort; may vary by carrier)

**Evidence to attach per lead (minimum):**
- Screenshot of handset with timestamp OR message metadata
- Copy of log line / audit record for T0 + T1

## 4) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)
Trigger fallback when:
- LLM times out, errors, returns empty/unsafe output
- Any classification confidence below threshold
- Any policy/compliance guard trips

### Fallback conversation script
**Message 1 (immediate, under 60s):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out. Quick questions so we can help fast — what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

If reply is unclear/non-numeric:
“Got it. Reply with 1, 2, 3, or 4 so I route this correctly.”

**Message 2 (after service choice):**
“Thanks. What’s your ZIP code?”

**Message 3:**
“Great — when do you want help? Reply 1) ASAP 2) This week 3) Just researching.”

**Handoff (if booking enabled):**
“Perfect. Here’s the fastest way to lock a time: {{calendar_link}}. If the link doesn’t open, reply ‘CALL’ and we’ll reach out.”

**If calendar link failure detected (HTTP fail, provider error, or repeated user ‘link not working’):**
“Sorry about that — the booking link is having trouble. Reply with your preferred day/time window (e.g., ‘Tue 2–5pm’) and a good callback number if different from this one.”

### After-hours version (if outside business hours)
Immediate message still required (<60s):
“Hi {{first_name}} — thanks for reaching out to {{business_name}}. We’re currently closed, but I can get details now and we’ll follow up at opening. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

## 5) Compliance: STOP / HELP
- If inbound message contains **STOP** (case-insensitive, exact match or contains), system must:
  - Immediately confirm opt-out: “You’re opted out and won’t receive more texts. Reply START to re-subscribe.”
  - Mark contact status = opted_out
  - Suppress all future automated messages
- If inbound contains **HELP**:
  - Respond: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

## 6) Test Matrix (Execute 20 leads total; mix across sources)
Run at least:
- 8 tests via Generic Webhook
- 6 tests via Jotform
- 6 tests via HubSpot

### A) Generic Webhook JSON — Payloads + Expected Results
**A1 Valid lead (baseline)**
Payload:
{ "lead_id":"qa-001", "first_name":"Test", "last_name":"One", "phone":"+15555550101", "email":"test1@example.com", "source":"webhook" }
Expected:
- SMS Message 1 sent <60s
- CRM note created (if enabled) with formatted transcript header

**A2 Missing phone**
{ "lead_id":"qa-002", "first_name":"Test", "phone":"", "email":"test2@example.com" }
Expected:
- No SMS attempt
- Create CRM note: “Missing phone — unable to text”
- If email fallback exists: send email requesting phone (optional)

**A3 Invalid phone**
{ "lead_id":"qa-003", "first_name":"Test", "phone":"12345", "email":"test3@example.com" }
Expected:
- Validation failure, no SMS
- CRM note records invalid phone and payload

**A4 Duplicate lead_id**
Send A1 again with same lead_id “qa-001” within 5 minutes
Expected:
- Deduplicate: no second SMS (or send only if first failed)
- CRM note indicates duplicate suppressed

**A5 Webhook retry simulation**
Send the same payload with same lead_id and header Retry-Count: 1 (or equivalent)
Expected:
- Idempotent handling; no duplicate customer-facing messages

**A6 Concurrent leads (5 at once)**
Send qa-010 … qa-014 within 3 seconds
Expected:
- All receive Message 1 <60s
- No cross-talk (each transcript stays with correct lead)

**A7 After-hours**
Run outside configured hours
Expected:
- After-hours message variant sent <60s
- No booking push that implies immediate human callback (unless configured)

**A8 STOP/HELP**
- After initial message, reply “HELP” then “STOP”
Expected:
- HELP response with support email
- STOP opt-out confirmation and suppression

### B) Jotform Tests
Create a Jotform with fields:
- First name, Last name, Phone, Email, Service needed (optional)

**B1 Normal submission**
Expected: baseline <60s, transcript created

**B2 Empty phone field**
Expected: same as missing phone

**B3 Phone with formatting**
Example: “(555) 555-0102”
Expected: normalize to E.164 and send

**B4 Duplicate submission**
Submit twice quickly with same phone/email
Expected: dedupe rule applied (by lead_id if present, else by phone+time window)

**B5 After-hours submission**
Expected: after-hours message variant

**B6 Calendar link failure**
Temporarily set calendar link to invalid URL
Expected: fallback instructions (“Reply CALL…”), no infinite retry loop

### C) HubSpot Tests
In HubSpot, create contacts via form, manual creation, or workflow.

**C1 New contact created with phone**
Expected: SMS <60s, HubSpot note created on contact record

**C2 Contact missing phone**
Expected: no SMS; note indicates missing phone

**C3 Duplicate contact / same phone**
Create second contact with same phone within 5 minutes
Expected: dedupe prevents double text or applies “only one active conversation per phone”

**C4 CRM note formatting**
Expected note must follow template below exactly (or close enough to be consistent)

**C5 STOP propagation**
If lead texts STOP, HubSpot contact property updated (opted_out=true) and note added

**C6 Concurrent HubSpot creates**
Create 3 contacts rapidly
Expected: each gets correct transcript and timing

## 7) HubSpot Note Formatting Template (Strict)
Title line:
“Lead Copilot Transcript — {{date}} {{time}} ({{source}})”

Body:
Lead:
- Name: {{first_name}} {{last_name}}
- Phone: {{phone_e164}} (valid={{true/false}})
- Email: {{email}}
- Source: {{source}}
- Lead ID: {{lead_id}}
- Status: {{new / in_qualification / booked / needs_human / opted_out}}

Timing:
- T0 lead received: {{timestamp}}
- T1 first SMS queued: {{timestamp}}
- First-response (T1-T0): {{duration_seconds}}s

Transcript:
- OUT: "..."
- IN: "..."
- OUT: "..."

Outcome:
- Qualification: service={{repair/install/quote/other}}, zip={{zip}}, urgency={{asap/this_week/researching}}
- Booking: {{booked_time_or_link}} (calendar_ok={{true/false}})
- Opt-out: {{true/false}}

## 8) Results Table (Fill During Run)
Create 20 rows (one per lead):
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0
- T1
- T2
- T1-T0 (sec)
- Pass KPI? (Y/N)
- Pass behavior? (Y/N)
- Evidence link/screenshot
- Notes

## 9) Bug Log / Fix List Template
For any failure, log:
- Bug ID
- Severity (P0 reputation/compliance, P1 revenue loss, P2 annoyance)
- Source (Webhook/Jotform/HubSpot)
- Repro steps
- Expected vs actual
- Logs/screenshots
- Suspected cause
- Proposed smallest fix/workaround (ops-first)
- Retest date/result

## 10) Known High-Risk Areas (Watch Closely)
- Phone normalization/validation (E.164)
- STOP suppression across all sources (no further automation)
- Deduping/idempotency on webhook retries
- Concurrency: transcript mix-ups, race conditions
- After-hours messaging promises (avoid implying immediate callback)
- Calendar-link hard failures (provide alternate path)

## 11) Definition of “Verified <60s First Response”
You can claim KPI met when:
- At least **20 total leads** tested across the 3 sources
- **100%** of valid-phone leads show **T1-T0 < 60s**
- Any misses are explained (provider outage) and mitigations documented

Operator sign-off:
- Name: __________________ Date: __________
- Summary of KPI: ____/____ under 60s
- Summary of defects: P0=__, P1=__, P2=__
