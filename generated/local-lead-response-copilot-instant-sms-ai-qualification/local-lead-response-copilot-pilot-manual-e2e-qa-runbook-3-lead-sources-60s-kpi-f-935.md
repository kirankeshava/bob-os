# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) + Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:15:33.540Z

---

Overview / Objective
Validate end-to-end lead intake → first SMS response (<60s) → qualification → appointment handoff across 3 lead sources:
1) Generic Webhook JSON (any ads/form tool)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)
This runbook is designed for early agency pilots and protects reputation by ensuring safe fallbacks when the LLM fails and strict handling of compliance keywords (STOP/HELP).

Business legitimacy references (use in any customer-facing comms)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

A. Success Criteria (Pass/Fail)
A1. Speed-to-lead KPI
- PASS: First outbound SMS is sent within 60 seconds of lead receipt (server receives lead payload).
- STRONG PASS: <30 seconds median across 20 trials.
- FAIL: Any P0 scenario where first response >60s without after-hours gating.

A2. Compliance / Safety
- STOP: Must immediately stop all outbound messages to that number; confirm opt-out message; persist suppression.
- HELP: Must send help message (brand, contact email), no qualification questions until user replies.
- Missing/invalid phone: Must not attempt SMS; must log error and create internal alert/CRM note.

A3. Deterministic fallback
- If LLM errors/timeouts/returns invalid JSON: system must switch to deterministic flow (below) within 5 seconds and continue qualification.

A4. Dedupe/retries
- Duplicate lead submissions must not trigger duplicate SMS if within dedupe window (recommend 30 minutes) based on phone + source + optional email.
- Webhook retries must be idempotent.

A5. Calendar link failure
- If scheduling link API fails or returns non-200: system must offer manual booking (“reply with preferred time window”) and alert team.

A6. CRM note formatting (HubSpot)
- Notes must be readable and structured, include timestamps, source, qualification answers, and outcome.

B. Instrumentation & Evidence संग्रह (no automation required)
Record these timestamps for every trial:
T0 = lead submitted (form submit time) OR request sent time (curl/Postman) OR HubSpot entry created time
T1 = server receives payload (from app logs / webhook request log)
T2 = first outbound SMS queued/sent (Twilio log or app log)
T3 = lead replies (optional)
Compute: T2 - T1 (primary KPI), and optionally T2 - T0 (customer-perceived).
Evidence required per run:
- Screenshot/export of request log showing T1
- Screenshot/export of SMS provider log showing T2
- Transcript of SMS conversation for at least 3 qualification runs (including STOP/HELP)

C. Test Data / Phones
Use at least 2 test phone numbers:
- Phone A: valid mobile that can receive SMS
- Phone B: second valid mobile for concurrency and STOP suppression tests
Invalid phone samples:
- empty string, null
- “123”, “555-555-5555” (depending on validation rules)
- “+1 (000) 000-0000”

D. Lead Source #1 — Generic Webhook JSON (E2E)
D1. Base payload (happy path)
POST to the product’s inbound lead endpoint (replace URL when known):
{
  "source": "webhook",
  "source_id": "test-001",
  "created_at": "2026-04-09T12:00:00Z",
  "lead": {
    "full_name": "Test Homeowner",
    "phone": "+15551234567",
    "email": "test@example.com",
    "service": "AC repair",
    "zip": "94107",
    "notes": "No cold air"
  }
}
Expected:
- SMS sent <60s: introduction + 1st question
- CRM note created/updated (if enabled)
- Deterministic fallback not used unless LLM forced-fail

D2. Missing phone
Set lead.phone=null.
Expected:
- No SMS attempt; error logged; create internal alert + CRM note “Missing phone, cannot contact.”

D3. Invalid phone
Set lead.phone="123".
Expected:
- No SMS attempt; validation error logged; CRM note created.

D4. Webhook retries / idempotency
Send the same payload with same source_id 3x within 60 seconds.
Expected:
- Only one initial SMS sent.
- Log shows dedupe hit for subsequent deliveries.

D5. Duplicate leads (same phone new source_id)
Send two different source_id payloads with same phone within 5 minutes.
Expected:
- Either (preferred) one SMS only + CRM note “duplicate suppressed”, or (acceptable) second SMS is a different message that acknowledges prior contact and does not re-run full flow.

D6. Concurrency
Send 5 payloads for 5 different phones within 10 seconds.
Expected:
- No queue collapse; all first responses <60s.

E. Lead Source #2 — Jotform (Real Form Tool)
Setup
1) Create Jotform form: fields = Name, Phone, Email, Service Needed, ZIP.
2) Configure submission webhook to product endpoint.
3) Submit using real mobile.

E1. Happy path
Expected:
- T1 appears in inbound logs within seconds of submit.
- T2 SMS sent <60s.

E2. Missing phone
Submit without phone (if allowed) OR submit with blank.
Expected:
- No SMS, CRM note/alert.

E3. After-hours
Set business hours in product (e.g., 9am–5pm local). Submit outside hours.
Expected:
- First message within 60s but after-hours variant (see section H) OR delay until open (choose one policy, must be consistent). Recommended policy: respond immediately with after-hours script + offer scheduling.

F. Lead Source #3 — HubSpot CRM (Real CRM)
Setup
1) Create free HubSpot developer/test account.
2) Create a simple workflow or integration path: New contact created (or form submission) triggers webhook to product OR product pulls from HubSpot (depending on integration).
3) Ensure product writes back a note to the contact record.

F1. Happy path
Create a new contact with phone + service note.
Expected:
- SMS <60s.
- HubSpot note created with structured formatting (see section I).

F2. Note formatting
Verify note includes: lead source, timestamp, first SMS time, answers, status, booking link result.
Expected: readable markdown-like bullets, not raw JSON.

F3. Dedupe with existing contact
Create the same contact again or update the contact.
Expected:
- No duplicate SMS if within dedupe window; note indicates suppression.

G. STOP/HELP Compliance (All Sources)
G1. STOP
After receiving first SMS, reply “STOP”.
Expected:
- Immediate confirmation opt-out message.
- No further messages, even if lead re-submits form.
- Suppression persists across sources.

G2. HELP
Reply “HELP”.
Expected:
- Help message: business name + support email agent_bob_replit+lead-copilot@agentmail.to + brief instructions.
- Do not continue qualification until user replies with non-HELP.

H. After-hours behavior (deterministic)
Recommended immediate response template (sent <60s):
“Thanks for reaching out — we’re currently closed, but I can still get this scheduled. What service do you need (1) repair, (2) estimate, or (3) maintenance?”
If user replies, proceed with deterministic questions and offer booking link; if booking link fails, collect preferred time window.

I. Calendar link failure handling
Simulate scheduling link outage (disable link or force error).
Expected behavior:
- Message: “Scheduling link is temporarily down. Reply with a day/time window that works (e.g., ‘tomorrow 2–5pm’), and we’ll confirm ASAP.”
- Internal alert + CRM note with failure reason.

J. Deterministic Qualification Fallback (LLM down / timeout)
Trigger conditions
- LLM call errors, exceeds timeout (recommend 3–5s), returns invalid/empty response.
- Any exception during “generate next question”.

Deterministic flow (exact questions)
1) Q1 Service type: “What service do you need? Reply 1) Repair 2) Estimate 3) Maintenance”
2) Q2 Urgency: “How soon do you want help? Reply 1) Today 2) This week 3) Flexible”
3) Q3 Location: “What ZIP code is the job in?”
4) Q4 Job details: “Briefly describe the issue or what you want done (1 sentence is fine).”
5) Q5 Scheduling: “Want to book now? Reply YES for a link or NO to have us text you times.”

Branching
- If user replies YES: send booking link. If link fails → manual time window request.
- If user replies NO: ask “What day/time window works best?” then escalate.
- If user gives unclear input: send one clarification then escalate.

Escalation-to-human rule
- If no reply after 2 nudges (e.g., 2 minutes and 20 minutes) OR user requests human: “Got it — a human will take over shortly.” Create CRM task + notify team.

K. Results Table (paste into sheet)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (happy, missing phone, STOP, etc.)
- T0 submit
- T1 received
- T2 first SMS
- T2-T1 (sec)
- Pass/Fail
- Evidence links (screenshots)
- Notes

L. Bug/Fix List (prioritized)
P0 (must fix before any paid pilot)
1) STOP not persisted across retries/sources → implement suppression table keyed by E164 phone.
2) SMS sent to invalid/missing phone → strict E164 validation; block send.
3) No deterministic fallback when LLM fails → implement timeout + fallback router.
4) Dedupe missing → implement idempotency key: source + source_id; plus phone-based dedupe window.

P1 (fix during pilot)
5) After-hours inconsistent messaging → enforce business-hours gate and message templates.
6) Calendar failure causes dead end → add manual scheduling branch + alert.
7) Concurrency causes delayed sends >60s → queue tuning, parallelism.

P2 (polish)
8) HubSpot note formatting messy → implement structured note template.
9) HELP doesn’t include contact email → add compliance text.

HubSpot Note Template (expected)
Title: “Lead Copilot Qualification — {status}”
Body:
- Source: {source} ({source_id})
- Received: {T1}
- First SMS: {T2} ({latency}s)
- Answers:
  - Service: …
  - Urgency: …
  - ZIP: …
  - Details: …
- Outcome: booked / needs follow-up / stopped
- Booking: {link or ‘link failed’}

How to declare “Verified <60s”
Run 20 total trials across the 3 sources (min 5 per source). Report:
- Median T2-T1
- 95th percentile T2-T1
- Count over 60s (should be 0 in business hours)
Store evidence screenshots for at least 5 representative trials (1 per source + 2 edge cases).