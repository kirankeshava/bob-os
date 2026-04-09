# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:03:48.113Z

---

Business context (for pilots)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Proof URL to share with agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email (support/escalations): agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate end-to-end reliability for first 1–3 customer pilots (manual QA, no automation) across 3 lead sources:
1) Generic Webhook JSON
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI
- First response time: Lead received → first outbound SMS sent/queued ≤ 60 seconds (target). Record delivery time separately.

Pre-flight checklist (do before running timed tests)
1) Confirm outbound SMS sender is configured and can message your handset.
2) Confirm inbound keyword handling is enabled: STOP, START, HELP.
3) Confirm after-hours rules exist (define schedule + action).
4) Confirm dedupe key strategy exists (phone + recent window OR external lead_id).
5) Confirm there is a “calendar/booking” destination (calendar link or booking endpoint). If booking is down, ensure fallback behavior.
6) Confirm CRM logging destination exists for HubSpot (note on contact or engagement) and formatting is consistent.

Instrumentation & timestamp capture (how to prove <60s)
For each test lead, capture these timestamps (use a consistent timezone):
A. Lead Submitted Time (T_submit)
- Webhook: time you POST the payload (terminal timestamp) + server receive time if logged.
- Jotform: submission time shown in Jotform submissions table.
- HubSpot: time you create/update contact / trigger the workflow (activity timestamp).
B. System Receive Time (T_receive)
- Prefer application log line “received lead” with a timestamp.
C. SMS Queued/Sent Time (T_sms_sent)
- Provider log timestamp (or application log “SMS queued/sent”).
D. Handset Delivery Time (T_delivered)
- Time the SMS appears on your phone (manual).

KPI computation
- First-response KPI = T_sms_sent − T_receive (or T_submit if T_receive unavailable). Pass if ≤ 60s.
- Delivery latency = T_delivered − T_sms_sent (tracked separately; do not fail the product for carrier delay unless extreme).

Results table template (copy/paste)
| Test ID | Source | Scenario | T_submit | T_receive | T_sms_sent | T_delivered | KPI (sec) | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---:|---|---|

Lead sources: setup + execution

SOURCE 1: Generic Webhook JSON
Purpose: Validate core ingestion, phone validation, retries/dedupe, concurrency.
Setup:
- Identify the inbound endpoint URL that accepts JSON leads.
- Ensure it returns 2xx quickly and either processes async or within a stable time budget.
Execution tool:
- Use curl/Postman.

Baseline payload (valid)
POST /lead
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+14155550101",
  "email": "test.webhook@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:00:00Z"
}
Expected:
- First outbound SMS sent within 60s.
- CRM note created/updated if CRM logging is enabled.
- If AI is available: qualification begins; if AI fails: deterministic fallback begins (see fallback flow).

Edge-case payloads
1) Missing phone (should not send SMS)
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "phone": "",
  "email": "nophone@example.com",
  "service": "Plumbing",
  "source": "webhook"
}
Expected:
- No SMS attempt.
- Logged as “unreachable: missing phone”.
- Optional: email alert to agent_bob_replit+lead-copilot@agentmail.to (or dashboard flag).

2) Invalid phone (should not send SMS)
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "1234",
  "service": "HVAC",
  "source": "webhook"
}
Expected:
- No SMS attempt; logged validation error.

3) Duplicate lead_id (dedupe)
Send qa-webhook-001 again (same lead_id).
Expected:
- No second conversation start.
- CRM note should append “Duplicate received” OR ignore safely.

4) Retry behavior (idempotency)
- Simulate webhook provider retry: send same payload 3 times within 30 seconds.
Expected:
- One outbound first message only.
- System acknowledges quickly with 2xx if safe.

5) Concurrency (multiple concurrent leads)
- Fire 5 different leads in parallel (qa-webhook-010..014) within 5 seconds.
Expected:
- Each gets its own first SMS within 60s.
- No cross-talk in transcripts; CRM logs match correct contact.


SOURCE 2: Jotform (real form tool)
Purpose: Validate real-world form submission payload mapping, missing fields, and speed.
Setup steps:
1) Create a Jotform form with these fields:
- First name (required)
- Last name
- Phone number (required)
- Email
- Service needed (dropdown)
- Preferred time (optional)
- Consent checkbox (optional)
2) Ensure the integration (webhook/Zapier-like) sends submissions to the Copilot.
3) Publish the form and open in an incognito window.

Execution:
Run at least 10 submissions, including:
- Normal valid lead
- Missing phone (if Jotform allows bypass, otherwise temporarily make it optional for the test)
- Invalid phone (enter short number)
- Duplicate submission (same phone and same name twice)
- After-hours submission (simulate by temporarily changing after-hours window to “now”)

Expected mapping checks:
- Phone must normalize to E.164 format (+1…)
- First outbound SMS starts within 60s.
- Source metadata should reflect “Jotform” and include form name/id if available.


SOURCE 3: HubSpot (CRM)
Purpose: Validate CRM-origin leads and CRM note formatting consistency.
Setup:
1) Create a HubSpot test environment (free) and a pipeline/stage if needed.
2) Decide trigger: “New contact created” OR “Form submission” OR “Lifecycle stage changed to Lead”.
3) Configure the Copilot to write back an engagement note (or contact property + note).

Execution:
Create/update at least 10 contacts, including:
- Valid phone → should trigger SMS in <60s
- Missing phone → should create CRM note “missing phone” but no SMS
- Duplicate contact update (same contact triggers twice) → dedupe should prevent restarting conversation

HubSpot note formatting (strict template)
Every lead should create/update ONE consistent note (append-only transcript ok). Template:

[Lead Copilot] Lead Received
- Source: {source} (HubSpot)
- Lead ID: {lead_id or hubspot_contact_id}
- Name: {first} {last}
- Phone: {phone_normalized or MISSING}
- Email: {email or MISSING}
- Service: {service or MISSING}
- Submitted/Triggered At: {timestamp}

[Speed-to-Lead]
- Receive time: {T_receive}
- First SMS sent: {T_sms_sent}
- KPI: {seconds}s (PASS/FAIL @60s)

[Conversation]
- Opt status: {OPTED_IN | OPTED_OUT | UNKNOWN}
- Transcript:
  - System: {first message}
  - Lead: {reply}
  - System: {next}

[Outcome]
- Qualification status: {Qualified | Not Qualified | Incomplete}
- Booking: {Booked | Link Sent | Booking Failed | Not Requested}
- Owner/Route: {after-hours queue | on-call | dispatcher}

Fail-safe behaviors (must-pass)

1) Missing phone
- Behavior: Do not attempt SMS. Log “unreachable”. Create CRM note. Optionally email alert to agent_bob_replit+lead-copilot@agentmail.to.
- Pass criteria: 0 SMS attempts; clear record exists.

2) Invalid phone
- Behavior: Do not attempt SMS; log validation error; CRM note.
- Pass criteria: no provider API call made.

3) STOP keyword compliance
- If lead texts STOP (or unsubscribe keywords): immediately stop messaging; confirm opt-out response per provider policy.
- Pass criteria: no further outbound messages until START.

4) HELP keyword
- Reply with a simple help message identifying the business and how to opt out.
- Pass criteria: HELP yields deterministic safe reply; no LLM required.

5) After-hours handling
- Rule example: outside business hours, send a single acknowledgement + next-business-day expectation OR route to on-call.
- Pass criteria: after-hours lead gets correct message; no booking promises that cannot be met.

6) Calendar/booking failures
- If booking link down or API fails: apologize + offer manual scheduling: “Reply with best time” and notify team.
- Pass criteria: no dead-end; CRM note logs booking failure reason.

7) Webhook retries / idempotency
- Same lead_id repeated → only first starts conversation.
- Pass criteria: only one “first SMS” per dedupe window.

8) Duplicate leads (same phone)
- If new lead arrives for same phone within dedupe window (e.g., 24h): do not restart; append context and continue.
- Pass criteria: avoids spam; CRM transcript remains coherent.

9) Multiple concurrent leads
- System must not mix conversations.
- Pass criteria: each phone’s transcript isolated.

Deterministic fallback qualification flow (no-LLM)
Trigger conditions:
- LLM timeout/error OR model returns empty/unsafe output OR confidence below threshold.
Principles:
- 3–4 short questions max.
- Always allow human handoff.
- Always respect STOP/HELP.

Exact messages (SMS)
Message 1 (immediate):
“Hi {first_name}, it’s the scheduling assistant for {Business Name}. Thanks for reaching out about {service}. To help you faster—what’s your address or ZIP code?”

If user provides ZIP/address → Message 2:
“Got it. What’s the best time for a call/visit? Reply with: 1) ASAP 2) Today 3) Tomorrow 4) This week”

If user chooses option or provides time → Message 3:
“Thanks. Last question: is this an emergency (active leak/no heat) or routine? Reply: 1) Emergency 2) Routine”

Handoff/booking:
- If calendar works: “Perfect—here’s the link to book: {calendar_link}. If you prefer, reply with a time window and we’ll confirm.”
- If calendar fails: “Our booking link is temporarily down. Reply with a 2-hour window that works for you and a human will confirm shortly.”

Completion:
- Create/update CRM note with answers + outcome.
- If Emergency: route/notify immediately (per pilot rules).

Bug log template (copy/paste)
| Bug ID | Date | Source | Severity (P0-P3) | Summary | Steps to Reproduce | Expected | Actual | Evidence (screenshots/log lines) | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|

Severity definitions
- P0: Compliance risk (STOP ignored), spam risk, or no first response.
- P1: KPI miss (>60s) or booking dead-end.
- P2: Formatting/CRM note issues; minor mapping.
- P3: Cosmetic copy.

Minimum acceptance for first pilots
- Across 20 timed tests: 95% of valid-phone leads have T_sms_sent − T_receive ≤ 60s.
- 100% of STOP cases halt outbound.
- 0 cases of duplicate spam on retries.
- HubSpot notes follow the strict template for every logged lead.

Operator checklist (quick run)
1) Run 5 webhook tests (valid, missing phone, invalid phone, duplicate, concurrency).
2) Run 5 Jotform submissions (include after-hours simulation).
3) Run 5 HubSpot triggers (include duplicate contact update).
4) Run 5 special keyword/calendar tests (STOP/HELP/booking failure/retry).
5) Fill the Results table and open bugs for any mismatch.

When to escalate to engineering (vs workaround)
- Any P0/P1 bug.
- KPI misses caused by queueing/provider misconfig.
- Any dedupe failure that creates multiple first messages.
- Any CRM note formatting drift that confuses agency reporting.
