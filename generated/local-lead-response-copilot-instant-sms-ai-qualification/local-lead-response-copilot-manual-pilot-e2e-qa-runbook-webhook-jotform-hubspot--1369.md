# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:27:58.046Z

---

Business: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with customers/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

Goal (pilot-stage): Validate end-to-end reliability across 3 lead sources without building automation yet. Prove <60s first-response KPI and document safe fallbacks when the LLM or integrations fail.

Scope: 
A) Lead Sources to test (minimum 3)
1) Generic Webhook JSON (direct POST into intake endpoint)
2) Jotform (real form tool → webhook integration)
3) HubSpot (CRM source → workflow/webhook or API-driven lead creation)

B) Core KPI
- First-response KPI: First outbound SMS must be queued/sent within 60 seconds of lead receipt.
- Evidence requirement: record timestamps for Lead Received, SMS Queued/Sent, and (if possible) Handset Delivered.

C) Fail-safe behaviors required
- Missing/invalid phone: do not text; create internal log/CRM note; email alert (if configured)
- STOP/HELP compliance: immediately stop further outbound to STOP; provide help text on HELP
- After-hours: either (1) acknowledge + schedule next-business response or (2) send booking link with expectation-setting; never spam multiple messages
- LLM failure: deterministic question flow (no-LLM) must take over
- Calendar booking failures: offer fallback (manual booking link, request preferred times, or human callback)
- Webhook retries: idempotency/dedupe prevents double texting
- Duplicate leads: do not re-qualify within dedupe window; append note instead
- Concurrent leads: no cross-talk; transcripts stay isolated by lead ID
- CRM notes: consistent formatting for agency reporting

--------------------------------------------
1) Test Environment + Tools

Required tools (free):
- A real mobile phone to receive SMS
- A stopwatch/timer or timestamp tool
- Browser devtools + a simple HTTP client (curl/Postman) for webhook tests
- Jotform free account (test form)
- HubSpot free developer/test portal or free CRM account

Data & safety rules:
- Use test phone numbers only except when using your own handset for receipt timing.
- Avoid messaging real customers.
- If using Twilio or other SMS provider, ensure compliance templates for STOP/HELP exist.

--------------------------------------------
2) Standard Timestamp Capture Protocol (KPI Proof)

For EACH test submission, record:
- T0 Lead Received: server-side receipt time (preferred) OR time you click “Submit” (fallback)
- T1 SMS Queued/Sent: provider log timestamp OR app log timestamp
- T2 Delivered (optional): handset receipt time (your phone)

Pass/Fail criteria:
- PASS if (T1 - T0) ≤ 60 seconds.
- Soft PASS if provider queued ≤ 60 seconds but carrier delivery is slower (record for monitoring).
- FAIL if first outbound is > 60 seconds OR missing when it should send.

Results table template (copy/paste into sheet):
- Test ID | Source | Scenario | Lead Received (T0) | SMS Queued/Sent (T1) | Delivered (T2) | Delta T1-T0 (sec) | Outcome (Pass/Fail) | Notes

--------------------------------------------
3) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)

Trigger conditions:
- LLM API error/timeout
- Response parsing failure
- Safety filter blocks response

General rules:
- One question per SMS.
- Stop after 3 questions max if no reply; send a final “reply when ready” message.
- At any point, if user replies STOP: mark opted-out and do not send further messages.
- If HELP: send help response and pause.

Message 1 (immediate):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote? Reply YES to continue.”

If YES:
Q1:
“What service do you need? Reply 1) Repair 2) Install 3) Estimate 4) Other”

Q2 (based on Q1, generic if unknown):
“Got it. What’s your ZIP code?”

Q3:
“What’s the best time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening”

Handoff:
- If calendar booking is available: “Perfect—book a time here: {calendar_link}. If you prefer, reply with two time windows and we’ll confirm.”
- If calendar booking fails/unavailable: “Our booking link is having trouble. Reply with 2 times that work for you and we’ll confirm ASAP.”

No reply after Q1/Q2/Q3 within 15 minutes:
“Quick reminder—reply when you’re ready and we’ll get you scheduled.”

STOP compliance:
- On “STOP”: “You’re opted out and won’t receive further messages.” (then enforce suppression)

HELP compliance:
- On “HELP”: “Reply STOP to opt out. For help, email agent_bob_replit+lead-copilot@agentmail.to.”

After-hours behavior (if outside defined business hours):
“Thanks— we’re currently closed. We’ll follow up next business day. If you want, you can still book here: {calendar_link}.”

--------------------------------------------
4) Lead Source Test Setup + Payloads

A) Generic Webhook JSON
Minimum fields expected (map as needed):
- lead_id (string)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- source (string)
- created_at (ISO timestamp)
- message/notes (optional)

Payloads (ready to paste) — replace endpoint URL accordingly:
1) Valid lead
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test@example.com",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z",
  "notes": "QA valid submission"
}
Expected: SMS within 60s; qualification begins.

2) Missing phone
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "source": "webhook",
  "created_at": "2026-04-09T12:01:00Z"
}
Expected: No SMS; create internal log/CRM note “missing phone”; optional email alert.

3) Invalid phone
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "1234",
  "source": "webhook",
  "created_at": "2026-04-09T12:02:00Z"
}
Expected: No SMS; log invalid phone; do not retry blindly.

4) Duplicate lead (same lead_id)
Send payload from (1) again.
Expected: No second initial SMS; append note “duplicate received” with timestamp.

5) Retry simulation (same lead_id + retry header if available)
Expected: Idempotent handling; no double-send.

B) Jotform (Real Form Tool)
Form fields to create:
- First Name
- Last Name
- Phone
- Email
- Service Needed (dropdown)
- ZIP
- Consent checkbox (if required by your policy)

Tests:
- Submit 5 valid leads (vary service + zip)
- Submit missing phone
- Submit invalid phone
- Submit same phone twice within 5 minutes (duplicate)

Expected: Same as webhook; lead source recorded as “jotform”.

C) HubSpot (CRM)
Goal: ensure that leads originating/created in HubSpot trigger outreach correctly and that CRM notes are clean.

HubSpot note format (strict template):
Title: “Lead Copilot Transcript — {lead_id}”
Body:
- Lead ID: {lead_id}
- Source: {source}
- Name: {first_name} {last_name}
- Phone: {phone}
- Email: {email}
- Created At: {created_at}
- Status: {Qualified | Unqualified | Opted-out | After-hours pending | Booking failed}
- Speed-to-lead:
  - Lead received: {T0}
  - First SMS sent: {T1}
  - Delta: {seconds}
- Transcript:
  - OUT: “…” (timestamp)
  - IN: “…” (timestamp)
  - OUT: “…” (timestamp)
- Booking outcome:
  - Calendar link used: {yes/no}
  - Appointment time: {datetime or N/A}
- Compliance:
  - STOP received: {yes/no}
  - HELP received: {yes/no}

HubSpot tests:
- Create a test contact with phone and trigger the workflow → verify SMS and note creation.
- Duplicate contact creation (same phone) → verify dedupe.
- Note formatting: ensure no broken JSON, no missing fields, timestamps present.

--------------------------------------------
5) Edge-Case Test Matrix (Execute These)

1) Missing phone: verify no SMS + CRM/internal note
2) Invalid phone: verify no SMS + error recorded, no repeated retries
3) STOP: reply “STOP” to first message; verify suppression of all future messages; note updated to opted-out
4) HELP: reply “HELP”; verify help text + pause
5) After-hours: simulate lead outside business hours; verify after-hours template and next-step behavior
6) Multiple concurrent leads: submit 5 leads within 1 minute; verify no cross-talk and all first responses within 60s
7) Calendar link failure: use an invalid calendar URL or disable scheduling temporarily; verify fallback message asking for preferred times
8) Webhook retries: resend same payload (same lead_id) 3 times; verify single initial SMS
9) Duplicate leads: same phone different lead_id within dedupe window; expected: no re-qualification spam; append CRM note
10) CRM note formatting: confirm strict template populated; transcript ordering correct; opt-out status shown

--------------------------------------------
6) Bug Log Template (Must Be Actionable)

For every failure, capture:
- Bug ID
- Severity (P0 reputation/compliance, P1 conversion, P2 cosmetic)
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Steps to reproduce (numbered)
- Expected behavior
- Actual behavior
- Evidence (screenshots/log snippets/timestamps)
- Suggested fix / workaround
- Retest date + result

Common high-risk P0/P1 bugs to watch for:
- Double-texting on retries/duplicates
- STOP not suppressing
- >60s first response due to queue/backlog
- LLM failure causes no response (instead of deterministic flow)
- Notes written to wrong contact or malformed

--------------------------------------------
7) “Results” Section (Fill During Pilot)

Run minimum 20 tests total:
- 8 webhook (mix of valid + edge cases)
- 6 Jotform (mix)
- 6 HubSpot (mix)

Success criteria:
- 95% of valid leads meet <60s T1-T0
- 100% STOP compliance
- 0 duplicate double-sends in retry tests
- All CRM notes readable and consistently formatted

Operator sign-off:
- Tested by:
- Date:
- Environment:
- Summary of KPI results:
- Summary of top bugs and mitigations:

--------------------------------------------
8) Minimal Customer/Agency Communication Snippet (if asked for proof)

“We run an onboarding QA pass across webhook + your form tool + your CRM to confirm <60s speed-to-lead and compliance behaviors (STOP/HELP/after-hours). You can view our product site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 and reach us at agent_bob_replit+lead-copilot@agentmail.to.”
