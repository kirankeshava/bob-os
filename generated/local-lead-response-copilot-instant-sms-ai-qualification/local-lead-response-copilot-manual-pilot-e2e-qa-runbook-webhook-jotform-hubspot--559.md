# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:14:26.829Z

---

## 0) Purpose (Pilot-stage reliability without automation)
This runbook validates end-to-end lead capture → first SMS response → qualification → booking handoff → CRM logging across **3 lead sources**:
1) **Generic Webhook JSON**
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

Primary KPI: **First outbound SMS is sent within <60 seconds** of lead submission/receipt.
Secondary goals: compliance (STOP/HELP), safe after-hours behavior, dedupe/retry handling, deterministic fallback flow when the LLM fails.

Reference business legitimacy for pilots/partners:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Pre-flight checklist (must be true before timed testing)
1. **SMS channel ready** (test number provisioned; outbound permitted).
2. **Opt-out keywords supported**: STOP, UNSUBSCRIBE, CANCEL, END, QUIT.
3. **HELP keyword supported** with a compliant support message.
4. **After-hours rules configured** (define business hours + timezone).
5. **Calendar/booking handoff** configured OR a safe fallback message is ready.
6. **Dedupe key chosen** (recommended: source + lead_id; fallback: normalized phone + timestamp bucket).
7. **Logging available** (at minimum: lead_received_at, first_sms_queued_at/sent_at, provider_message_id, failure_reason).

---

## 2) Response-time KPI measurement method (<60s)
For each test submission, capture these timestamps (in one table row):
- **T0 Lead Submitted**: time you click submit (Jotform) OR time webhook request is sent OR HubSpot lead creation time.
- **T1 Server Received**: system log time when lead payload is received (if available).
- **T2 First SMS Queued/Sent**: time system queues/sends first SMS (from logs/provider dashboard).
- **T3 Handset Delivered (optional)**: time message arrives on test phone.

Compute:
- **Processing latency** = T2 - T1 (target: <60s)
- **User-perceived latency** = T3 - T0 (nice-to-have; carriers vary)

Pass criteria:
- **>= 95% of leads** in pilot test set have **T2 - T1 < 60s**.
- Any single failure must have a documented reason and mitigation (retry, queue backpressure, provider outage).

Results table template:
| Test ID | Source | Scenario | T0 Submit | T1 Received | T2 1st SMS Sent | Delta (T2-T1) | Outcome | Notes/Msg ID |
|---|---|---|---|---|---|---:|---|---|

---

## 3) Lead source setup + execution

### 3A) Source #1 — Generic Webhook JSON
Goal: validate the most “raw” integration path.

Minimum required fields (recommended):
- lead_id (string)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- zip (optional)
- source (string, e.g., "webhook")
- submitted_at (ISO timestamp)

Test payloads (ready to paste):

1) Valid lead
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Jamie",
  "last_name": "Lopez",
  "phone": "+14155550101",
  "email": "jamie@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "source": "webhook",
  "submitted_at": "2026-04-09T17:00:00Z"
}
```
Expected:
- First SMS within 60s.
- Qualification begins (LLM or deterministic fallback).
- CRM note created if HubSpot sync enabled.

2) Missing phone
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "Taylor",
  "email": "taylor@example.com",
  "service": "Roof leak",
  "zip": "94016",
  "source": "webhook",
  "submitted_at": "2026-04-09T17:01:00Z"
}
```
Expected:
- **No SMS attempt**.
- System flags lead as **unreachable_missing_phone**.
- Optional: send internal alert/email to agent_bob_replit+lead-copilot@agentmail.to.

3) Invalid phone
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "Morgan",
  "phone": "12345",
  "service": "AC tune-up",
  "source": "webhook",
  "submitted_at": "2026-04-09T17:02:00Z"
}
```
Expected:
- **No SMS**.
- Error recorded: invalid_phone_format.

4) Duplicate lead (same lead_id)
Send payload #1 again.
Expected:
- Second submission is **deduped** (no duplicate SMS thread).
- CRM note may add a “Duplicate received” line (optional), but must not spam.

5) Retry simulation (same lead_id, header indicates retry)
Resend payload #1 and mark as retry in your webhook tool if possible.
Expected:
- Idempotent behavior; do not send a second first message.


### 3B) Source #2 — Jotform (real form tool)
Goal: validate a real form provider flow.

Form fields to create:
- First Name (required)
- Last Name (optional)
- Phone (required)
- Email (optional)
- Service Needed (dropdown)
- Preferred Time (optional)
- Consent checkbox (optional but recommended)

Execution:
1. Publish form.
2. Configure integration to your webhook endpoint (or Zapier/Make free tier if available; prefer direct webhook).
3. Submit 10 test leads including:
   - 6 normal leads
   - 1 missing phone (if form allows; otherwise simulate by sending blank/space)
   - 1 invalid phone (e.g., 111)
   - 1 after-hours submission
   - 1 duplicate (submit same phone + same name twice)

Expected:
- First SMS within 60s of submission receipt.
- Correct parsing of name/phone/service.
- Dedupe prevents double-texting.


### 3C) Source #3 — HubSpot (CRM)
Goal: validate CRM-originated leads and CRM note formatting.

Setup (minimum):
- Create a test Contact and a test pipeline/stage (if used).
- Decide trigger condition: new contact created OR form submission logged in HubSpot OR stage change.

Execution scenarios:
1) New contact with valid phone → should trigger SMS within 60s.
2) New contact missing phone → should not SMS; should log unreachable.
3) Update same contact twice quickly → dedupe and no spam.

Expected:
- Correct contact association.
- Notes are formatted consistently (see Section 6).

---

## 4) Deterministic fallback qualification flow (no-LLM)
Trigger fallback when:
- LLM call times out (>5–8s) or errors
- LLM returns empty/unsafe output
- Safety policy flags the output

**Deterministic Script (exact outbound text)**
Message 1 (sent immediately):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—can I ask 2 quick questions so we can help fast?”

If YES / any positive response:
Q1:
“1) What service do you need? (Reply A) Repair  B) Install/Replace  C) Quote  D) Other”

Q2 (based on Q1 answer):
- If A (Repair): “2) What’s the main issue (1 short sentence)?”
- If B (Install/Replace): “2) What are you replacing/installing? (e.g., water heater, AC, door, etc.)”
- If C (Quote): “2) What’s the location ZIP code?”
- If D (Other): “2) Briefly describe what you need.”

Booking handoff:
- If calendar link is available:
“Got it—here’s the quickest way to book: {calendar_link}. If you prefer, reply with a good time today.”
- If calendar link fails/unavailable:
“Thanks—our scheduling link is temporarily down. Reply with a good time today (and your timezone) and we’ll confirm ASAP.”

After 2 questions answered, create CRM note transcript and mark status:
- qualified_ready_to_book OR needs_followup

STOP/HELP behavior (must override everything):
- If message contains STOP keywords: immediately set opted_out=true and send: “You’re opted out and will no longer receive texts. Reply HELP for info.”
- If message contains HELP: “Support: reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---

## 5) Fail-safe behavior matrix (expected outcomes)

1) Missing phone
- No SMS attempt
- Lead status: unreachable_missing_phone
- Optional: internal alert

2) Invalid phone
- No SMS
- Lead status: unreachable_invalid_phone

3) STOP
- Immediate opt-out
- No further automation
- CRM note: “Opted out via STOP at {timestamp}”

4) HELP
- Send support text
- Keep conversation paused unless user continues

5) After-hours
- If outside business hours, send:
“Thanks—got it. We’re currently closed. We’ll follow up at {next_open_time}. If urgent, reply URGENT.”
- Optionally route urgent to on-call.

6) Multiple concurrent leads
- Ensure queue processes without >60s delay
- No cross-talk between threads

7) Calendar link failure
- Detect non-200 / missing link
- Send fallback scheduling text (see Section 4)
- Create CRM note: calendar_link_down

8) Webhook retries
- Idempotent on lead_id or phone+timestamp bucket
- Do not double-text

9) Duplicate leads
- Same phone within X minutes → merge thread
- CRM note indicates duplicate and preserves transcript

10) CRM note formatting
- Always consistent template (Section 6)
- No raw JSON dumped into notes

---

## 6) HubSpot CRM note formatting (strict template)
Paste this structure into notes for every lead:

Title: “Lead Copilot Transcript — {first_name} {last_name} ({phone})”

Body:
- Lead Source: {source}
- Lead ID: {lead_id}
- Submitted At: {submitted_at}
- First SMS Sent At: {first_sms_sent_at}
- Response Time (sec): {delta_seconds}
- Status: {qualified_ready_to_book | needs_followup | unreachable_missing_phone | unreachable_invalid_phone | opted_out | after_hours_deferred}

Qualification Summary:
- Service: {service}
- Urgency: {urgent | normal | unknown}
- ZIP/Area: {zip}
- Preferred Time: {preferred_time}

Transcript (most recent last):
1) System: “{msg1}”
2) Lead: “{reply1}”
3) System: “{msg2}”
4) Lead: “{reply2}”

Compliance:
- Opt-out: {true/false}
- Opt-out timestamp (if any): {timestamp}

---

## 7) Test cases to execute (minimum set)
Run these across sources as indicated; record each row in Results table.

A. Normal flow (all sources): 6 runs
B. Missing phone (Webhook + HubSpot): 2 runs
C. Invalid phone (Webhook + Jotform if possible): 2 runs
D. STOP keyword (any source): 2 runs
E. HELP keyword (any source): 1 run
F. After-hours submission (Jotform or Webhook): 2 runs
G. Concurrent leads (Webhook burst 5 leads in 30s): 1 run (counts as 5 rows)
H. Calendar link failure simulation: 1 run
I. Webhook retry + dedupe: 2 runs
J. Duplicate lead (same phone/name): 2 runs
K. HubSpot note formatting verification: 5 runs

Total target: 20–30 rows.

---

## 8) Bug log (copy/paste template)
| Bug ID | Severity | Source | Scenario | Steps to Reproduce | Expected | Actual | Evidence (logs/screens) | Proposed Fix | Owner | Status |
|---|---:|---|---|---|---|---|---|---|---|---|

Severity guide:
- P0: compliance risk (STOP ignored), spamming, wrong recipient
- P1: KPI miss (>60s) or broken booking
- P2: formatting/reporting issues

---

## 9) Pass/Fail criteria for pilot readiness
PASS if:
- Response-time KPI met: **>=95%** under 60s (T2-T1)
- STOP/HELP compliant in all tests
- No double-texting on retries/duplicates
- After-hours behavior matches configuration
- HubSpot notes follow strict template for all CRM-synced leads

If FAIL:
- Apply smallest operational workaround first (queue limits, provider config, business hours settings) before engineering changes; re-run the failing subset and update Results + Bug Log.
