# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safes) + Test Payloads + Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:17:44.912Z

---

## Purpose (pilot-stage, revenue-friendly)
Validate that Local Lead Response Copilot reliably (1) sends a first SMS in <60 seconds, (2) qualifies leads even when the LLM fails via deterministic safe-mode, and (3) logs clean CRM notes. This is designed to run manually during agency/customer pilots (no automation required yet) and produce audit-grade evidence.

Product legitimacy link to share with agencies if needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

---

## Lead sources under test (minimum 3)
1) Generic Webhook JSON (direct POST from any form/ads tool)
2) Jotform (real form tool)
3) HubSpot (CRM: contact creation/update + note logging)

---

## KPI & acceptance criteria
### Primary KPI: first response time
**Definition:** Lead submission timestamp (T0) to first outbound SMS timestamp (T1).
**Pass:** P95 < 60 seconds AND no single response > 120 seconds during the test run.
**Minimum sample size for pilot proof:** 20 total trials across sources (recommended distribution below).

Recommended distribution:
- Webhook JSON: 10 trials (covers retries/dedupe variations)
- Jotform: 5 trials
- HubSpot: 5 trials

### Compliance/UX gates (hard fails)
- STOP: must immediately confirm opt-out and cease further messages.
- HELP: must provide support info (company name + contact email/phone if available).
- Missing/invalid phone: must not attempt SMS; must log failure and optionally notify human.
- After-hours: must not push for immediate call booking; must set expectation and offer next available window.
- Duplicate/retry events: must not spam; must dedupe.

---

## Evidence to capture (required)
For each trial record:
- T0: lead submitted timestamp (source system time)
- T1: first SMS sent timestamp (messaging provider/app logs)
- Calculated delta seconds
- Conversation transcript (at least first 3 messages)
- Final disposition: booked / qualified-not-booked / no-response / opted-out / failed

Store evidence in:
- A shared sheet (Results table below)
- Screenshots of logs for any failure

---

## Setup checklist (do once per pilot)
1) Confirm sending number and that inbound replies are received.
2) Confirm safe-mode switch exists (or define: safe-mode triggers automatically on LLM timeout/error).
3) Confirm after-hours window (e.g., 6pm–8am local) and timezone.
4) Confirm booking method:
   - Preferred: calendar booking link (if link fails, fallback path defined below)
5) Confirm CRM logging destination (HubSpot contact record notes / timeline event).

---

## Deterministic fallback qualification flow (LLM failure safe-mode)
### When to trigger safe-mode
Trigger safe-mode if any occur:
- LLM call errors
- LLM timeout > 8 seconds
- Empty/garbled response
- Safety refusal

### Safe-mode conversation (exact text)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need help with? Reply with 1) Repair 2) Installation 3) Estimate/Quote 4) Other”

**If reply = 1/2/3/4 (or free text mapped):**
**Message 2:**
“Got it. What’s your ZIP code?”

**Message 3:**
“Thanks. When would you like service? Reply 1) ASAP 2) This week 3) Next week”

**Message 4 (booking attempt):**
If calendar is available:
“Perfect—here’s the fastest way to lock a time: {{calendar_link}}. If you prefer, reply with two times that work for a call.”

If calendar is unavailable (link failure or missing):
“Perfect—reply with two times that work for a call (include day + time). We’ll confirm shortly.”

**Escalation rule (human handoff):**
If no valid response after 2 prompts OR user asks complex question:
“Thanks—someone from our team will follow up shortly. If urgent, reply with ‘URGENT’.”

### STOP/HELP deterministic handling
- If inbound contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT:
  “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  Then set contact status = Opted Out; block further outbound.
- If inbound contains HELP:
  “Support: reply to this message or email agent_bob_replit+lead-copilot@agentmail.to. You can reply STOP to opt out.”

---

## Test execution order (finish in <60 minutes)
Run in this order to quickly detect the biggest reputation risks:
1) Webhook valid lead (confirm <60s + correct first question)
2) STOP test (confirm immediate opt-out + no further messages)
3) Missing phone (confirm no SMS attempt)
4) Duplicate lead + webhook retry simulation (confirm dedupe)
5) After-hours routing (confirm tone + no aggressive booking)
6) Calendar link failure (confirm fallback to “two times” flow)
7) Concurrent leads (2–5 leads within 60 seconds)
8) Jotform end-to-end (real form submit)
9) HubSpot logging format verification

---

## Source-specific steps

### A) Generic Webhook JSON tests
**Endpoint:** (fill in product webhook URL)
**Headers:** Content-Type: application/json

Use these payloads (copy/paste):

#### A1 — Valid lead (baseline)
{
  "source": "webhook",
  "event_id": "evt_1001",
  "submitted_at": "{{ISO8601_NOW}}",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550100",
    "email": "test.lead@example.com",
    "service": "Quote",
    "zip": "94107"
  }
}
**Expected:** first SMS sent <60s; message uses name; asks service question (or confirms service if provided).

#### A2 — Missing phone
{
  "source": "webhook",
  "event_id": "evt_1002",
  "submitted_at": "{{ISO8601_NOW}}",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "email": "nophone@example.com",
    "service": "Repair",
    "zip": "94107"
  }
}
**Expected:** no SMS attempted; system logs “missing phone” and marks lead as needs-human-followup.

#### A3 — Invalid phone
{
  "source": "webhook",
  "event_id": "evt_1003",
  "submitted_at": "{{ISO8601_NOW}}",
  "lead": {
    "first_name": "BadPhone",
    "last_name": "Lead",
    "phone": "123",
    "email": "badphone@example.com",
    "service": "Installation",
    "zip": "94107"
  }
}
**Expected:** no SMS attempted; validation error logged; no retries that could spam.

#### A4 — Duplicate lead (same event_id)
Send A1 twice with same event_id.
**Expected:** second event is deduped (no second SMS); logs show duplicate ignored.

#### A5 — Webhook retry simulation (new event_id but same lead fingerprint)
Send:
- First payload with event_id evt_1004
- Second payload with event_id evt_1005 but same phone/email within 2 minutes
**Expected:** dedupe by fingerprint (phone+source+time window) prevents double texting; OR if product chooses to allow, it must not send identical intro twice (must detect active conversation).

#### A6 — Concurrency (5 leads in 60 seconds)
Send 5 valid leads with different phones quickly.
**Expected:** no queue collapse; P95 still <60s; no cross-talk (messages must map to correct lead).


### B) Jotform tests (real form tool)
Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP.
Connect Jotform submission to Copilot via webhook/integration.

Run:
- B1 baseline submission
- B2 missing phone (leave blank)
- B3 invalid phone (enter “123”)
- B4 duplicate submit (submit twice same phone)

**Expected:** same behaviors as webhook suite; response time measured from Jotform submission time.


### C) HubSpot CRM tests (note formatting + dedupe)
Trigger path examples:
- Lead comes from webhook/Jotform and creates/updates a HubSpot contact.
- Copilot app writes a note/timeline event.

#### Required note format (copy/paste spec)
Title: “Lead Response Copilot — Qualification Summary”
Body sections (in this order):
1) Source: {{source}} | Event ID: {{event_id}} | Submitted: {{submitted_at}}
2) First SMS sent: {{sms_sent_at}} | Response time: {{delta_seconds}}s
3) Conversation outcome: {{booked/qualified/not_reached/opted_out/failed}}
4) Answers:
   - Service: {{service}}
   - ZIP: {{zip}}
   - Timing: {{asap/this_week/next_week/specific_time}}
5) Booking:
   - Calendar link offered: {{yes/no}}
   - Booked time (if any): {{timestamp}}
6) Compliance:
   - STOP/opt-out: {{yes/no}}
   - HELP requested: {{yes/no}}
7) Errors (if any): {{error_messages}}

**Pass criteria:** formatting is consistent, readable, and does not include raw JSON blobs; line breaks preserved.

---

## Scenario test cases (what to do + expected)
1) STOP: after first SMS, reply “STOP”. Expect confirmation + no more outbound.
2) HELP: reply “HELP”. Expect support message including agent_bob_replit+lead-copilot@agentmail.to.
3) After-hours: set system clock/window or run during after-hours. Expect softer message + next-day option.
4) Calendar link failure: break/disable link or simulate provider outage. Expect fallback: ask for two times.
5) LLM failure: force timeout/error. Expect deterministic safe-mode questions above.

---

## Results table (paste into sheet)
Columns:
Trial ID | Source | Scenario | T0 Submitted | T1 First SMS | Delta (sec) | Pass/Fail | Transcript link | CRM note link | Notes

---

## Bug/Fix log template (tie to churn risk)
Fields:
- Bug ID
- Severity: S0 (compliance/legal) / S1 (revenue loss) / S2 (annoying)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Evidence (screenshots/logs)
- Suspected cause
- Suggested fix
- Owner
- Status

---

## Known high-risk failure patterns (watch for these)
- Double texting on retries/duplicates (agency reputational damage)
- STOP not enforced across all future sends (compliance risk)
- LLM outage causing silence (lost leads) rather than safe-mode
- Calendar outage causing dead-end instead of “two times” fallback
- HubSpot notes unreadable (raw JSON) causing agency complaints

---

## Definition of “Verified <60s first response” (what we will claim)
We can claim “verified <60s first response” only after:
- 20 timestamped trials recorded
- P95 < 60s and worst-case < 120s
- Evidence stored (results sheet + log screenshots)
- STOP/HELP tested and documented

End of runbook.