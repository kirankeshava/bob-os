# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results & Bug Log + Deterministic Fail-Safe

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:11:44.357Z

---

## Purpose
Validate end-to-end reliability *during early pilots* (no automation) for Local Lead Response Copilot, ensuring:
1) **<60s first response** from lead creation to first outbound SMS, and
2) **safe fail-safes** when LLM/calendar/webhooks fail, using a deterministic qualification flow.

Website (legitimacy link for agencies/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email for test communications/escalations: agent_bob_replit+lead-copilot@agentmail.to

---
## Scope: 3 lead sources
A) **Generic Webhook JSON** (any form/ads tool posting JSON)
B) **Jotform** (real form tool; free tier is sufficient)
C) **HubSpot CRM** (real CRM; free tier is sufficient)

---
## KPI Definition: “First response <60s”
**Start time (T0):** lead is created/submitted (server receives webhook OR form submitted OR CRM event fired).
**End time (T1):** first outbound SMS *accepted by provider* (or logged as sent by our system).
**KPI:** T1 − T0 ≤ 60 seconds for ≥ 95% of trials (pilot target). Any single failure must be explainable (provider outage, misconfig, etc.).

### Evidence to capture (required)
- Screenshot/log line for T0 event
- Screenshot/log line for T1 outbound attempt/accepted status
- SMS transcript (for STOP/HELP cases)
- Lead identifier(s): external lead id + internal lead id

### Recommended tools
- System logs (server/app logs)
- Provider logs (SMS delivery/queued/accepted)
- Spreadsheet (Results table below)

---
## Deterministic Fail-Safe Mode (LLM down/timeout)
Trigger deterministic mode when any of these occur:
- LLM request errors, times out (>8s), returns empty output, or fails validation
- Downstream booking link/calendar API fails
- Confidence below threshold (if implemented)

### Deterministic script (exact messages)
**Message 1 (immediate):**
“Hi {{first_name_or_there}} — got your request for {{service_or_quote}}. Quick questions so we can help fast. What’s the address (or ZIP) for the job?”

**If user provides ZIP/address → Message 2:**
“Thanks. When do you want the work done? Reply 1) ASAP 2) This week 3) Next week 4) Just pricing.”

**After selection → Message 3:**
“Got it. What’s the best time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening. Or reply with a specific time.”

**Escalation rule:**
- If user replies with clear intent + any time preference: create booking task or notify human.
- If user is confused: “No problem—tell me the best time to reach you and we’ll take it from there.”

**Timeout rule:**
- If no reply after 5 minutes: send one nudge:
“Just checking—still want help with {{service}}? Reply with your ZIP to get a quick estimate/appointment.”
- If no reply after 24 hours: stop.

### STOP/HELP compliance (must pass)
- If inbound message contains “STOP” (case-insensitive) → immediately confirm opt-out: “You’re opted out and will no longer receive messages. Reply START to opt back in.”
- If inbound message contains “HELP” → “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---
## Test Matrix (what to run)
Run each scenario across the applicable lead sources.

### 1) Missing phone number
**Input:** Lead payload lacks phone.
**Expected:** No SMS sent; create internal task/CRM note: “Missing phone; cannot text.” Optional email to business owner. Must not crash.

### 2) Invalid phone number
**Input:** phone = “123”, “(555) 555-5555” if invalid per validation, or letters.
**Expected:** Reject/flag; no SMS; log validation error; create CRM note.

### 3) STOP and HELP
**Input:** user replies STOP or HELP.
**Expected:** STOP immediately suppresses future sends; HELP returns help text; both logged.

### 4) After-hours behavior
**Input:** lead created outside business hours.
**Expected:** Either immediate acknowledgment + promise of follow-up, or queued send at next open—must match configured policy. No spam loops.

### 5) Multiple concurrent leads
**Input:** 5–20 leads within 60 seconds.
**Expected:** All leads get first SMS <60s; no cross-talk; correct personalization; no rate-limit meltdown.

### 6) Calendar/booking link failure
**Input:** booking link returns 500/timeout.
**Expected:** Fall back to “propose time” flow; create internal task; do not send broken link repeatedly.

### 7) Webhook retries
**Input:** resend same webhook with same external id within 1–5 minutes.
**Expected:** Deduped; no duplicate SMS; note indicates duplicate suppressed.

### 8) Duplicate leads (same phone different ids)
**Input:** two leads same phone within 10 minutes.
**Expected:** second lead either merges thread or sends a single “confirm” message; must not spam.

### 9) CRM note formatting (HubSpot)
**Input:** lead qualified via SMS.
**Expected:** CRM note is readable, includes timestamps, question/answer pairs, and opt-in status.

---
## Source-specific setup & test execution
### A) Generic Webhook JSON
**Goal:** prove our webhook endpoint can accept common payload shapes and still respond fast.

#### Sample payloads (copy/paste)
**Payload A1 (minimal):
```json
{
  "external_lead_id": "test-001",
  "first_name": "Pat",
  "last_name": "Lee",
  "phone": "+14155552671",
  "email": "pat@example.com",
  "service": "HVAC repair",
  "source": "webhook-test"
}
```

**Payload A2 (missing phone):
```json
{
  "external_lead_id": "test-002",
  "first_name": "Sam",
  "email": "sam@example.com",
  "service": "roof quote",
  "source": "webhook-test"
}
```

**Payload A3 (duplicate):
Use A1 again with same `external_lead_id` and same phone.

**Measure:**
- T0 = server log “received webhook test-001”
- T1 = outbound SMS accepted log

### B) Jotform
**Goal:** validate a real form tool integration and field mapping.

**Form fields to include:** first name, last name, phone, email, service needed, preferred timeframe.

**Test cases:**
- Submit valid
- Submit missing phone
- Submit invalid phone
- Submit twice quickly (duplicate)

**Measure:**
- T0 = Jotform submission timestamp
- T1 = outbound SMS accepted timestamp

### C) HubSpot CRM
**Goal:** validate CRM-originated lead creation and correct note formatting.

**Trigger:** new contact created OR form submission in HubSpot.

**Expected note format (template):**
Title: “Lead Copilot Qualification Summary”
Body:
- Lead ID: {{internal_id}} | External: {{hubspot_vid}}
- First SMS sent: {{timestamp}} (T+{{delta_seconds}}s)
- Consent/Status: {{opt_status}}
- Q1 ZIP/Address: {{answer}}
- Q2 Timing: {{answer}}
- Q3 Best callback time: {{answer}}
- Outcome: {{booked|needs_human|no_response}}

---
## Results Table (fill during execution)
Columns:
1) Date
2) Lead source (Webhook/Jotform/HubSpot)
3) Scenario (valid, missing phone, STOP, etc.)
4) External lead id
5) Phone
6) T0 (lead created)
7) T1 (first SMS accepted)
8) Delta seconds
9) Pass/Fail (<60s)
10) Transcript saved? (Y/N)
11) Notes / anomalies

Minimum sample for pilot claim: **20 trials** total, including at least:
- 5 webhook
- 5 Jotform
- 5 HubSpot
- 5 mixed edge cases (STOP/HELP/after-hours/duplicates/retries)

---
## Bug/Fix Log (prioritized)
For each issue:
- Bug ID
- Severity: P0 (churn/compliance) / P1 (conversion loss) / P2 (polish)
- Source(s)
- Steps to reproduce
- Expected vs actual
- Evidence link (log screenshot/transcript)
- Suggested fix

### P0s to watch (immediate escalation)
- STOP not honored or messages continue after STOP
- First SMS regularly >60s with no provider outage
- Duplicate lead causes multiple SMS blasts
- After-hours sends violate stated business policy

---
## Definition of Done (for “verified” claim)
We can claim “verified <60s first response” when:
- 20+ trials completed with evidence
- ≥95% under 60s, and any failures have clear root cause + mitigation
- STOP/HELP tested successfully with archived transcripts
- Deterministic fallback tested at least once (forced LLM failure/timeout) and produces safe qualification + escalation

---
## Known gaps / dependencies
- Requires access to the product’s webhook endpoints, SMS provider logs, and any calendar/booking integration for the calendar-failure scenario.
- If we do not yet have an LLM failure toggle, simulate by disabling the LLM key or forcing timeout at the network level during one test run.
