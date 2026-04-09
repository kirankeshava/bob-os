# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safes, Results + Bug Log)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:26:12.671Z

---

Business under test: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with testers/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Test contact email: agent_bob_replit+lead-copilot@agentmail.to

Purpose
Validate end-to-end reliability across 3 lead sources and prove the core KPI: first outbound SMS sent within <60 seconds of lead submission/creation. Ensure safe fallbacks when LLM fails by using a deterministic question flow (no AI required) and ensuring STOP/HELP compliance.

Scope (3 lead sources for pilot)
1) Generic Webhook JSON (baseline integration)
2) Jotform (real form tool)
3) HubSpot (CRM)

Global KPI + Acceptance Criteria
A1. First response time: lead received by our server -> first SMS send attempt within 60 seconds (P95 during test run). Goal: P50 <20s, P95 <60s.
A2. Safety: If LLM errors/timeouts/invalid output, system switches to deterministic flow and continues qualification without delays >10s.
A3. Compliance UX: STOP immediately suppresses messaging; HELP responds with support message and link/email.
A4. Deduplication: Same lead (same phone + source + within configured TTL, e.g., 10 minutes) does not trigger multiple parallel conversations.
A5. After-hours: Confirm correct routing (auto-reply + next-business-day scheduling OR immediate response with limited actions), per configured hours.

Instrumentation to Capture Timing (manual-friendly)
For each test lead, record:
T0 = Lead submission time (from source UI timestamp)
T1 = Our system received time (server log / request log / webhook delivery time)
T2 = First SMS “send” time (Twilio/message provider log time)
T3 = Carrier delivered time (if available)
Metric M1 = T2 - T1 (primary KPI). Secondary M2 = T3 - T1.
How to capture (minimum viable): screenshot source submit time + export message log from SMS provider.

Pre-flight Checklist (do before running cases)
- Confirm one dedicated test phone number for inbound/outbound (to test STOP/HELP). Use a real mobile device.
- Confirm business profile: business name, booking link, business hours, and fallback flow enabled.
- Ensure a “test calendar link” exists; also prepare a broken link for failure case.
- Confirm message templates include support email: agent_bob_replit+lead-copilot@agentmail.to

Deterministic Fallback Qualification Flow (No-LLM)
Trigger: any of the following
- LLM call fails (timeout, 5xx, network)
- LLM output invalid (missing required fields, unsafe content)
- Confidence below threshold or parsing failure

Fallback Conversation Script (exact SMS text)
System message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — I can help fast. What service do you need? Reply: 1) Quote/Estimate  2) Schedule service  3) Emergency”

If reply = 1 (Quote/Estimate):
Q2: “Got it. What’s the job type? Reply with a number: 1) Plumbing 2) Electrical 3) HVAC 4) Roofing 5) Other”
Q3: “What’s your ZIP code?”
Q4: “When do you want this done? Reply: 1) ASAP 2) This week 3) Next 2+ weeks”
Handoff: “Perfect — what’s the best time for a quick call? Reply: 1) Morning 2) Afternoon 3) Evening. Or book here: {{calendar_link}}”

If reply = 2 (Schedule service):
Q2: “Great. What’s your address or ZIP code?”
Q3: “What day works best? Reply: 1) Today 2) Tomorrow 3) This week 4) Next week”
Handoff: “Thanks. To lock it in, pick a time here: {{calendar_link}}. If you prefer, reply with a time window.”

If reply = 3 (Emergency):
Q2: “Understood. Is it safe to wait 60 minutes? Reply YES or NO.”
If NO: “If there’s immediate danger, call 911. If not, reply with your address/ZIP and we’ll call you now.”
If YES: “Thanks — reply with your address/ZIP and we’ll call you shortly. You can also book: {{calendar_link}}”

Fallback termination rule:
- After 2 no-responses, send one final nudge after 15 minutes:
“Just checking — want to get this scheduled? Reply 1) Yes 2) No. If you need help, email agent_bob_replit+lead-copilot@agentmail.to”
- After “No”, mark lead as closed-lost and suppress further messages.

STOP / HELP Handling (must pass)
Inbound “STOP” (and variants: STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT):
- Immediately set contact = DND/suppressed
- Reply once: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
Inbound “HELP”:
- Reply: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to and include your phone number.”
Inbound “START” (after STOP):
- Re-enable messaging; respond: “You’re re-subscribed. How can we help today?”

Lead Source Setup Requirements + Test Payloads
1) Generic Webhook JSON
Minimum fields expected:
- source: “webhook”
- first_name, last_name (optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- timestamp
Test payload (valid):
{
  "source":"webhook",
  "first_name":"Test",
  "last_name":"Lead",
  "phone":"+14155550123",
  "email":"test@example.com",
  "service":"HVAC",
  "timestamp":"{{ISO8601}}"
}

2) Jotform
Field mapping to verify:
- Name -> first_name/last_name
- Phone -> phone (normalize)
- Service dropdown -> service
- Zip -> zip
- Consent checkbox (if present) -> consent

3) HubSpot
Trigger event: new contact created OR form submission creates contact.
Verify:
- phone number normalization
- source tracking stored
- CRM note created/updated with conversation transcript summary

Manual Test Cases (execute per source unless noted)
For each case, record T0/T1/T2/T3 and pass/fail.

Core Happy Path
TC-01 Valid lead -> first SMS <60s -> completes 2+ questions -> booking link sent.
Expected: no errors, smooth conversation, correct personalization.

Missing/Invalid Phone
TC-02 Missing phone field.
Expected: no SMS attempt; create CRM note “Missing phone”; send email fallback if email exists; mark “needs contact”.
TC-03 Invalid phone (e.g., “123”, “+1 (000)”).
Expected: validation fail; no SMS; logged as invalid; no retries to carrier.

STOP/HELP
TC-04 Lead replies STOP after first message.
Expected: immediate suppression; no further messages even if automation attempts.
TC-05 Lead replies HELP.
Expected: help message with support email; conversation can continue if user replies normally.

After-hours
TC-06 Submit lead outside business hours.
Expected: immediate after-hours autoreply (or configured behavior) + next-business-day follow-up scheduled; still meets <60s for the first message.

Concurrency + Deduping
TC-07 5 leads submitted within 10 seconds.
Expected: all get first SMS <60s; no cross-talk; separate conversation states.
TC-08 Duplicate lead (same phone) submitted twice within TTL.
Expected: only one active conversation; second event logged as duplicate; no double texting.

Calendar Link Failures
TC-09 Booking link intentionally broken.
Expected: system detects failure (if instrumented) OR provides alternate: “Reply with a time window” and flags internal alert/CRM note.

Webhook Retries
TC-10 Webhook endpoint receives same event ID multiple times (simulate retry).
Expected: idempotency prevents duplicate SMS; logs show replay handled.

LLM Failure -> Deterministic Flow
TC-11 Simulate LLM timeout/error.
Expected: fallback flow starts within 10 seconds; questions exactly as scripted; no unsafe content.

CRM Note Formatting
TC-12 Verify CRM note contains:
- Lead source
- First response timestamp
- Conversation transcript (trimmed) or summary
- Booking outcome
Expected formatting (example):
“Lead Copilot | Source: Jotform | First SMS: 2026-04-09T18:21:05Z | Status: Booked
Transcript: Q1=Quote, Job=HVAC, ZIP=94107, Timing=ASAP | Booking link sent: yes”

Results Table Template (fill during pilot)
Columns:
- Source (Webhook/Jotform/HubSpot)
- Test Case ID
- Phone
- T0
- T1
- T2
- T3
- M1 (T2-T1)
- Outcome (Pass/Fail)
- Notes / Screenshot links

Bug Log + Fix List Template
Fields:
- Bug ID
- Title
- Severity (P0 texting wrong person, P1 cannot text, P2 formatting)
- Source(s)
- Steps to Reproduce
- Expected vs Actual
- Evidence (logs/screenshots)
- Proposed Fix
- Retest Date/Result

Known High-Risk Areas to Watch Closely
- Phone normalization and validation (E.164)
- Idempotency keys for webhook retries and duplicate events
- STOP suppression enforced at the highest priority (pre-send hook)
- After-hours logic interacting with <60s KPI
- Calendar failure mode: always offer alternative scheduling path

Operator Script for a Real Pilot Run
1) Tell agency/client we’re running a reliability smoke test; share legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
2) Run TC-01 and TC-04 immediately for each source (fastest risk reduction).
3) If both pass, run remaining cases (TC-02/03/06/08/10/11/12).
4) Stop the run if any P0 occurs (wrong number text, STOP ignored) and fix before proceeding.

Completion Definition
This runbook is “verified” when:
- At least 20 total lead events across the 3 sources are executed and logged.
- P95 of M1 (T2-T1) is <60 seconds.
- STOP/HELP and deterministic fallback pass 100%.
- Any defects are logged with retest evidence.
