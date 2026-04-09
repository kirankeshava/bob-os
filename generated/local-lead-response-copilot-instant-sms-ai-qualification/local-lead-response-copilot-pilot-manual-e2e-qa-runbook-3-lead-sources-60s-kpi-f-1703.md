# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:43:12.165Z

---

## 1) Scope & Goal
Goal: protect agency/customer reputation during early pilots by validating that Local Lead Response Copilot sends the FIRST SMS within 60 seconds of lead creation across 3 lead sources, and that the system behaves safely under common failures.

Product proof link (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

In-scope lead sources:
1) Generic Webhook JSON (any form/ad platform)
2) Jotform (real form tool)
3) HubSpot CRM (form/lead creation -> CRM timeline note)

In-scope scenarios (must test): missing phone, invalid phone, STOP/HELP, after-hours, multiple concurrent leads, calendar link failure, webhook retries, duplicate leads, CRM note formatting.

Out of scope for Week 1: automated test harness, load testing beyond simple concurrency checks.

## 2) KPI Definition & Evidence Method (<60s)
KPI: Time from lead creation event to FIRST outbound SMS attempt <= 60 seconds.
Record the following timestamps for every trial:
T0 = lead created time (form submit time or webhook received time; use platform submission timestamp or server log)
T1 = first outbound SMS “sent/queued” time (provider log or app log)
Delta = T1 - T0
Pass if Delta <= 60s.

Evidence to store per test:
- Screenshot or export of form submission timestamp (or webhook request timestamp)
- Screenshot of outbound SMS log showing first message timestamp and destination number
- If SMS fails: store failure reason + whether fallback escalation triggered

Minimum sample size for pilot proof:
- 20 trials total, distributed across sources (suggested: 8 webhook, 6 Jotform, 6 HubSpot)

## 3) Preconditions / Setup Checklist (Manual)
A) Environment
- Confirm sending number is configured and can send/receive SMS.
- Confirm qualification “agent” flow is enabled OR deterministic fallback is enabled for testing.

B) Test phone numbers
- Use at least two real mobile numbers you control for STOP/HELP testing.
- Use invalid numbers for validation tests: 
  - Too short: 555123
  - Wrong country/format: +999123456
  - Non-numeric: abcdef

C) After-hours window
- Define business hours for test (e.g., 9am–5pm local).
- Set system timezone.

D) Calendar/booking link
- Have one valid booking link and one intentionally broken link URL for failure tests.

## 4) Lead Source 1 — Generic Webhook JSON
### 4.1 Endpoint Contract (expected fields)
Send JSON with:
- lead_id (string)
- first_name (string)
- last_name (string, optional)
- phone (string, E.164 preferred)
- email (string, optional)
- service (string, optional)
- zip (string, optional)
- source (string, e.g., "fb_ads")

### 4.2 Copy-paste payloads
Payload A (valid):
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Water heater install",
  "zip": "94107",
  "source": "generic_webhook"
}

Payload B (missing phone):
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Drain cleaning",
  "source": "generic_webhook"
}

Payload C (invalid phone):
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "555123",
  "service": "HVAC repair",
  "source": "generic_webhook"
}

### 4.3 Expected behavior
- Valid: first SMS sent <= 60s; qualification starts.
- Missing phone: NO SMS attempt; create internal alert/CRM note (or email to agent_bob_replit+lead-copilot@agentmail.to) stating “Lead missing phone; cannot text.”
- Invalid phone: NO SMS attempt; log validation error; alert + store lead for manual follow-up.

### 4.4 Retry & dedupe tests
- Retry same payload A 3 times (simulate webhook retries).
Expected: only ONE conversation + ONE first SMS; subsequent events are deduped via lead_id or phone+time window.

## 5) Lead Source 2 — Jotform (Real Form Tool)
### 5.1 Jotform form fields (required)
- Name (first/last)
- Phone
- Service Needed (dropdown)
- Preferred time (optional)
- Consent checkbox (optional but recommended)

### 5.2 Test cases
JF-1 Valid submission: ensure first SMS <= 60s.
JF-2 Missing phone: submit with blank phone (if allowed) or dummy; ensure system rejects gracefully (no SMS) and logs.
JF-3 Invalid phone: enter short/alpha; ensure validation blocks or downstream rejects safely.
JF-4 Duplicate: submit same phone twice within 2 minutes.
Expected: either (a) second lead merges into same thread with a single “acknowledge” message OR (b) second lead is suppressed with a note “duplicate lead suppressed.”

## 6) Lead Source 3 — HubSpot CRM
### 6.1 HubSpot objects to validate
- Contact created/updated
- Timeline note or engagement created with:
  - Source attribution (HubSpot)
  - Timestamp of first SMS
  - Qualification transcript summary (or fallback mode flag)
  - Outcome (booked / not booked / needs human)

### 6.2 CRM note formatting acceptance criteria
Pass if note contains, in readable plain text:
- Lead name + phone
- First response timestamp and Delta seconds
- Q/A transcript (condensed) or key fields captured
- Booking status + link (if applicable)
- Compliance: STOP status if user opted out

Example note template (expected):
"Lead Copilot: New lead responded in 34s.\nName: Test Lead | Phone: +14155550123\nService: Water heater install | ZIP: 94107\nQualification: (1) Job type=Install (2) Urgency=This week (3) Property=Single family\nOutcome: Booking link sent: https://...\nStatus: Active (no opt-out)"

## 7) Fail-safe Behaviors (Deterministic Mode when LLM fails)
Trigger deterministic mode when:
- LLM API errors
- LLM timeout > 5s (configurable)
- LLM returns empty/invalid output

Deterministic question flow (copy-ready)
Message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Got your request — what service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply is 1/2/3/4 -> Message 2:
“Thanks. How soon do you need help? 1) ASAP (today/24h) 2) This week 3) Flexible.”

Message 3:
“What’s your ZIP code?”

Message 4 (routing):
- If during business hours: “Got it. Want to book a quick call? Here’s the link: {{booking_link}}. Or reply CALL and we’ll reach out.”
- If after-hours: “Thanks — we’re currently closed. We’ll text you at opening time. If urgent, reply ASAP and we’ll try to reach you sooner.”

Escalation rules:
- If user replies with free text that doesn’t map: send “Reply 1, 2, 3, or 4.” (max 2 attempts) then escalate to human.
- If booking link fails/unreachable: send alternate CTA “Reply CALL” and create internal task to call.

## 8) Compliance Tests (STOP/HELP)
- User sends STOP at any time.
Expected: immediate confirmation message (carrier-compliant), mark number as opted-out, suppress all future outbound.
- User sends HELP.
Expected: provide business name, support email agent_bob_replit+lead-copilot@agentmail.to, and opt-out instructions.

## 9) Concurrency Test (Multiple Leads)
Create 5 leads within 30 seconds (mix webhook/Jotform).
Expected:
- Each valid lead receives first SMS <= 60s.
- No cross-talk: transcripts stay attached to correct phone.

## 10) Calendar Link Failure
Force booking_link = broken URL.
Expected:
- System detects failure (or at least has safe copy): “If the link doesn’t open, reply CALL and we’ll schedule manually.”
- Create CRM note/task “calendar link failure encountered.”

## 11) Results Table (fill during execution)
For each trial record:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- T0 timestamp
- T1 timestamp
- Delta seconds
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

## 12) Bug / Fix Log (prioritized)
Fields:
- Bug ID
- Severity (P0 revenue/compliance, P1 conversion, P2 annoyance)
- Scenario/source
- Steps to reproduce
- Expected vs actual
- Impact (churn risk description)
- Recommended fix
- Owner + status

## 13) Expected “Verified <60s” Statement Template (for agencies)
“During pilot validation, we measured end-to-end lead-to-first-text time across Webhook, Jotform, and HubSpot sources. Over 20 trials, first response was delivered/queued within 60 seconds in all passing cases. Failures (if any) were limited to invalid/missing phone numbers where the system correctly avoided sending messages and created a follow-up alert.”
