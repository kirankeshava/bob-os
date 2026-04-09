# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:32:25.350Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

## Goal
Validate (manually, pilot-ready) that new leads from **3 sources** receive a compliant first SMS within **<60 seconds**, get qualified safely, and are logged correctly in HubSpot—even if the LLM or downstream services fail.

### Lead sources in scope (3)
1) **Generic Webhook JSON** (direct POST)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM create/update → automation triggers)

## Definitions / KPI
- **T0 (Lead Received):** time the system receives the lead (server/log timestamp).
- **T1 (SMS Queued/Sent):** time SMS provider request is accepted/queued (provider log) or app “sent” log.
- **T2 (Handset Delivered):** time message appears on test phone.
- **KPI:** T2 − T0 ≤ 60 seconds for ≥ 95% of test submissions (target during pilot).

## Required test assets
- Two test phone numbers:
  - Phone A (normal recipient)
  - Phone B (used to test duplicates/concurrency)
- One test email address (optional) for lead metadata.
- Access to:
  - Lead ingestion endpoint / webhook URL
  - Jotform form builder
  - HubSpot portal (free) with contacts
  - Any internal logs showing T0/T1

## Deterministic fallback (no-LLM) qualification flow
Trigger fallback when: LLM timeout (>5s), LLM error, blank/unsafe output, or “model unavailable”.

### Message 1 (immediate; must send within KPI)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what can we help with? Reply with 1) New quote 2) Schedule service 3) Question”

### Branching
- If reply contains 1:
  “Got it. What’s the service address (zip is ok) and when do you want this done? (Today / This week / Flexible)”
- If reply contains 2:
  “Perfect—what day/time works best? Morning / Afternoon / Evening”
- If reply contains 3:
  “Sure—what’s your question? If it’s easier, share a good callback time.”

### Booking handoff
If calendar/booking is available, send:
“Here’s the fastest way to lock a time: {{calendar_link}}. If you prefer, reply with a time window and we’ll confirm.”

### After-hours behavior
If outside business hours:
“Thanks! We’re currently closed. We’ll text you back at {{next_open_time}}. If urgent, reply URGENT and we’ll try to accommodate.”

### STOP/HELP compliance
- If message equals/contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT:
  Respond once: “You’re opted out and will no longer receive texts. Reply START to opt back in.” Then suppress future messages.
- If message contains HELP:
  “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Message/data rates may apply.”

## Fail-safe behavior matrix (expected)
1) **Missing phone:** Do not text. Create CRM note: “Lead missing phone; follow up by email if available.”
2) **Invalid phone:** Do not text. Mark invalid; request correction via email/CRM task.
3) **STOP:** Suppress all future outbound. Log opt-out timestamp + source.
4) **HELP:** Send help template; continue only if user replies normally.
5) **After-hours:** Send after-hours acknowledgement OR queue first message at next open (choose one consistent policy).
6) **Multiple concurrent leads:** No cross-talk; each lead gets its own thread; no shared variables.
7) **Calendar link failure:** Send alternate “reply with time window” message; create internal alert + CRM note.
8) **Webhook retries:** Idempotency key (lead_id) prevents double texting; second delivery logs as duplicate.
9) **Duplicate leads (same phone within window):** Do not re-send first message if a thread is active (<30 min). Append CRM note “Duplicate lead suppressed.”
10) **CRM note formatting:** Strict template (below) with transcript + metadata + booking outcome.

## HubSpot note formatting template (copy/paste format)
Title: “Lead Copilot — Conversation Transcript”
Body:
- Source: {{source}} (Webhook/Jotform/HubSpot)
- Lead ID: {{lead_id}}
- Name: {{name}}
- Phone: {{phone}}
- Email: {{email}}
- Created (T0): {{t0}}
- First SMS sent (T1): {{t1}}
- First SMS delivered (T2): {{t2}}
- Response time (T2-T0): {{seconds}}s
- Status: {{qualified/unqualified/opted_out/after_hours_pending/booking_sent/booking_failed}}
- Booking: {{calendar_link}} | Outcome: {{booked/not_booked/error}}

Transcript:
1) OUT ({{t1}}): {{message_1}}
2) IN ({{t_in_1}}): {{reply_1}}
3) OUT ({{t_out_2}}): {{message_2}}
...

Compliance:
- Opt-out: {{yes/no}} | Keyword: {{STOP/etc}} | Timestamp: {{t_optout}}

## Test execution steps (high level)
For each source, run: Normal flow + edge cases. For every case, record T0/T1/T2 and outcomes.

### A) Generic Webhook JSON tests
Send POST requests (curl/Postman) to the webhook endpoint.
Required fields (minimum): lead_id, first_name, last_name (optional), phone, email (optional), source.

**Payload 1 — Valid**
{"lead_id":"qa-001","first_name":"Test","phone":"+1XXXXXXXXXX","email":"test@example.com","source":"webhook"}
Expected: SMS Message 1 within <60s; CRM note created/updated.

**Payload 2 — Missing phone**
{"lead_id":"qa-002","first_name":"Test","email":"test@example.com","source":"webhook"}
Expected: No SMS; CRM note indicates missing phone.

**Payload 3 — Invalid phone**
{"lead_id":"qa-003","first_name":"Test","phone":"123","source":"webhook"}
Expected: No SMS; CRM note indicates invalid phone.

**Payload 4 — Duplicate lead_id retry**
Send Payload 1 twice within 30 seconds.
Expected: Only first SMS; second attempt logged as duplicate.

**Payload 5 — Concurrency**
Send 5 valid payloads rapidly (qa-010…qa-014).
Expected: All receive isolated first messages <60s; no mixed transcripts.

### B) Jotform tests
1) Create a simple form: First name, Last name, Phone, Email, Service Needed, Preferred Time.
2) Connect form submission → Lead Copilot.
3) Submit 10 entries:
- 5 normal
- 1 missing phone
- 1 invalid phone
- 1 duplicate phone (submit twice)
- 1 after-hours (run outside hours or simulate)
- 1 STOP test (submit then reply STOP)

Expected: Same as matrix; CRM notes show Source=Jotform.

### C) HubSpot tests
1) Create/identify a test contact.
2) Trigger lead copilot via workflow or integration event (new contact, form submit, deal stage).
3) Run:
- New contact with valid phone
- Update existing contact with same phone (dedupe)
- Note formatting verification

Expected: Clean notes per template; no duplicate outbound when same thread active.

## Results capture table (fill during pilot)
Columns:
- Test ID | Source | Scenario | Lead ID | Phone | T0 | T1 | T2 | Seconds (T2-T0) | Expected met? (Y/N) | Notes/Bugs

Acceptance thresholds (pilot):
- <60s for first outbound delivered in ≥ 95% cases
- 0 compliance failures (STOP must suppress)
- 0 double-texts on retries/duplicates

## Bug / Fix Log template
- Bug ID:
- Severity: (P0 compliance / P1 revenue / P2 annoying / P3 cosmetic)
- Source: Webhook/Jotform/HubSpot
- Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence: (screenshots/log lines/timestamps)
- Suspected cause:
- Workaround (if any):
- Proposed fix:
- Retest result:

## Verified behaviors to explicitly check during run
- STOP/HELP responses are correct and immediate.
- After-hours policy is consistent (ack now vs queue) and doesn’t spam.
- Calendar down: alternate message is sent and logged.
- CRM note contains transcript + timestamps and is readable for agencies.

## Operator checklist (quick)
1) Confirm test phone(s) can receive SMS.
2) Confirm business hours configured.
3) Run 5 webhook tests + capture T0/T1/T2.
4) Run 10 Jotform tests + capture T0/T1/T2.
5) Run 5 HubSpot tests + verify notes + dedupe.
6) Summarize KPI pass rate and file bugs with evidence.
