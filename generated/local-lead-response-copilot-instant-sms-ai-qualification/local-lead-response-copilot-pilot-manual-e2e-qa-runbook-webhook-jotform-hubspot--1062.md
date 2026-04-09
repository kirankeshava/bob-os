# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:40:51.967Z

---

Purpose
This runbook validates end-to-end reliability for Local Lead Response Copilot during early pilots (1–3 customers) without building automated test infrastructure. It proves the core KPI (first outbound SMS in <60 seconds) across 3 lead sources and verifies fail-safe behavior when inputs are bad, carriers are slow, calendars fail, the LLM errors, or users opt out.

Reference assets (use in comms)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources
1) Generic Webhook JSON (direct POST from any form/ads tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

KPI definition (<60s)
We consider “first response” successful when:
- A lead is received by our system (T0), and
- The first SMS is queued/sent by our SMS provider (T1), and
- Preferably delivered to a handset (T2) within a reasonable carrier window.

Pass/Fail
- HARD PASS: T1 - T0 <= 60 seconds
- SOFT PASS (carrier variance): T1 - T0 <= 60 seconds but T2 delayed (log carrier delay separately)
- FAIL: T1 - T0 > 60 seconds OR no outbound message OR wrong recipient

How to capture timestamps
For each test lead, record:
- T0 (Lead received): server request timestamp (webhook logs / integration logs)
- T1 (SMS queued/sent): SMS provider message log timestamp
- T2 (Delivered): handset message receipt time (screenshot OK)
Compute: Δ = T1 - T0 (seconds)

Operator setup checklist (do once per environment)
- Confirm an SMS-capable test phone number is available for receipt (not the sending number).
- Confirm after-hours window configured (e.g., 6pm–8am) and business timezone set.
- Confirm calendar/booking link configured (or intentionally break it for calendar-failure tests).
- Confirm LLM fallback trigger exists (simulate via toggling “LLM disabled” or using a forced timeout setting if available).
- Confirm dedupe key strategy (e.g., lead_id + source OR phone + source + time window).

Deterministic fallback qualification flow (no-LLM)
Trigger conditions (any):
- LLM timeout (e.g., >8s), LLM error, empty/garbled output, policy block
- System in “Safe Mode” toggled on

Fallback rules
- Always keep messages short.
- Ask max 3 questions before offering booking.
- Stop immediately on STOP (opt-out) and comply on HELP.

Exact fallback SMS copy + branching
Message 1 (immediate):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—what can we help with? Reply 1) Repair 2) Install 3) Quote”

If reply is 1/2/3:
Message 2:
“Got it. What’s your ZIP code?”

If ZIP is valid (5 digits) OR any short location:
Message 3:
“Thanks. When would you like service? Reply 1) ASAP 2) This week 3) Just pricing”

After reply:
- If booking enabled and link OK:
  “Perfect—grab a time here: {calendar_link}. If you prefer, reply with two times that work.”
- If calendar link fails or missing:
  “We’re scheduling manually right now. Reply with two times that work and a good callback number if different.”

After-hours variant
If lead arrives after-hours:
Immediate SMS must still send (to hit KPI) but set expectation:
“Hi {first_name}, thanks for reaching out to {business_name}. We’re currently closed—reply with what you need and we’ll follow up first thing in the morning.”
Then continue fallback questions, but do not promise immediate calls.

Compliance: STOP/HELP
- If inbound is “STOP” (or “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”):
  Reply exactly: “You’re opted out and will no longer receive messages. Reply HELP for help.”
  Mark contact as opted_out=true and do not message again.
- If inbound is “HELP”:
  Reply: “For help, contact us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Lead source #1: Generic Webhook JSON
Goal
Validate any external tool can POST a lead and receive <60s first SMS plus correct dedupe/retry behavior.

Minimum required fields (recommend)
- source: "webhook"
- lead_id: unique string (required for dedupe)
- first_name
- last_name (optional)
- phone (E.164 recommended)
- email (optional)
- service (optional)
- message (optional)
- timestamp (optional)

Ready-to-paste test payloads
A) Valid lead
{
  "source": "webhook",
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "Repair",
  "message": "Need help today"
}
Expected
- SMS sent to +14155550101 within 60s
- CRM note created (if HubSpot connected) with transcript header and metadata

B) Missing phone
{
  "source": "webhook",
  "lead_id": "wh_002",
  "first_name": "NoPhone",
  "email": "nophone@example.com"
}
Expected
- No SMS attempt
- Create CRM note/task: “Missing phone—cannot text”
- Alert/log with reason

C) Invalid phone
{
  "source": "webhook",
  "lead_id": "wh_003",
  "first_name": "BadPhone",
  "phone": "12345"
}
Expected
- No SMS attempt OR immediate validation failure
- CRM note/task: “Invalid phone format: 12345”

D) Duplicate lead ID (dedupe)
Send payload A again with same lead_id=wh_001.
Expected
- No second outbound SMS (or send only if configured “allow duplicates”)
- Log “duplicate suppressed” with correlation ID

E) Webhook retry simulation
Send same payload with same lead_id but add header X-Retry: 1 (if supported) OR resend within 10 seconds.
Expected
- Same as dedupe: suppress additional SMS
- Ensure idempotent CRM note behavior (append “Duplicate attempt suppressed” or no-op)

Lead source #2: Jotform
Setup
- Create a Jotform form “Lead Copilot Test Form” with fields:
  First Name, Last Name, Phone, Email, Service Type (dropdown), Message (long text).
- Ensure phone field collects country code or normalize to E.164.
- Connect Jotform to our webhook endpoint OR use Jotform’s webhooks integration.

Test cases (run at least 10 submissions)
1) Normal submission with valid phone -> verify <60s SMS
2) Missing phone -> verify no SMS and internal/CRM note
3) Invalid phone (letters) -> verify validation handling
4) After-hours submission -> verify after-hours message variant
5) Duplicate submission (same phone within 2 minutes) -> verify dedupe rule

Pass criteria
- KPI met for normal and after-hours cases
- No messaging sent on missing/invalid phone
- Dedupe prevents double texts for identical lead within window

Lead source #3: HubSpot (CRM)
Goal
Validate that when a lead enters via HubSpot (new contact / form / deal stage), we text quickly and write clean notes back into HubSpot for agency reporting.

HubSpot note formatting (strict template)
Title line:
“Lead Copilot Transcript — {source} — {YYYY-MM-DD HH:mm TZ}”
Body sections:
1) Lead metadata
- Name: {first} {last}
- Phone: {phone}
- Email: {email}
- Source: {source}
- Lead ID: {lead_id}
- Created: {T0}

2) System actions
- First SMS queued: {T1}
- KPI (T1-T0): {Δ_seconds}s
- Mode: LLM | FALLBACK
- After-hours: Yes/No
- Calendar link: OK | FAILED | NOT CONFIGURED
- Opt-out: Yes/No

3) Transcript
Outbound 1: “…”
Inbound 1: “…”
Outbound 2: “…”
…

4) Outcome
- Qualified: Yes/No
- Booking: booked | link sent | manual follow-up
- Notes: …

HubSpot test cases
1) New contact created with valid phone -> SMS <60s + note created
2) Contact missing phone -> no SMS + note/task
3) STOP reply -> opt-out property set and no further SMS
4) HELP reply -> correct help message + note updates
5) Duplicate lead (same contact updated) -> no duplicate first SMS

Concurrency test (all sources)
Goal
Ensure multiple leads arriving at once do not delay first response beyond 60s.
Procedure
- Submit 5 leads within 10 seconds (mix of webhook + Jotform) with different phones.
Expected
- All 5 get first SMS queued within 60s of their own T0
- No cross-talk (wrong personalization)

Calendar link failure test
Procedure
- Temporarily set calendar_link to an invalid URL OR disable calendar service.
- Submit a valid lead.
Expected
- First SMS still sent <60s
- Fallback message: “We’re scheduling manually…” (no broken link)
- CRM note shows Calendar link: FAILED and Outcome: manual follow-up

STOP/HELP compliance tests
Procedure
- From test handset, reply STOP.
Expected
- Immediate opt-out confirmation, no further messages (including automated follow-ups)
Procedure
- Reply HELP.
Expected
- Help message includes agent_bob_replit+lead-copilot@agentmail.to and STOP instructions

Results table (copy/paste)
For each run, fill:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Normal/Missing phone/Invalid/After-hours/Dupe/Retry/Calendar fail/STOP/HELP/Concurrency)
- T0 lead received
- T1 SMS queued/sent
- T2 delivered
- Δ = T1-T0
- Pass/Fail
- Notes / bug link

Bug log template
- Bug ID
- Title
- Severity (P0 compliance, P1 KPI, P2 formatting, P3 minor)
- Source/Scenario
- Steps to reproduce
- Expected vs Actual
- Evidence (screenshots/log IDs)
- Proposed fix (smallest change first)
- Re-test result

Expected high-risk bugs to watch for (with suggested fixes)
1) Phone normalization errors (missing +country) -> Fix: strict E.164 normalization + reject ambiguous
2) Dedupe gaps on webhook retries -> Fix: idempotency key on lead_id/source with TTL
3) STOP not persisted -> Fix: global opt-out store keyed by phone; check before send
4) After-hours still attempting booking calls -> Fix: route to message-only; delay call booking until open
5) Calendar failure sending broken link -> Fix: link health check; fallback copy without URL
6) HubSpot note formatting inconsistent -> Fix: single renderer function; newline-safe escaping

Operator sign-off checklist
- At least 20 total test leads across 3 sources
- At least 10 “normal” leads; 100% meet HARD PASS (T1-T0 <= 60s)
- All compliance tests pass (STOP/HELP)
- At least 1 calendar-failure test passes with safe messaging
- HubSpot notes match strict template and are readable

If any FAIL
- Apply immediate operational workaround first (rate limits, queue configuration, provider settings)
- Only then create an engineering ticket with reproduction steps and the exact log IDs/timestamps

Support line to include in help flows
agent_bob_replit+lead-copilot@agentmail.to
(Website reference for agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4)
