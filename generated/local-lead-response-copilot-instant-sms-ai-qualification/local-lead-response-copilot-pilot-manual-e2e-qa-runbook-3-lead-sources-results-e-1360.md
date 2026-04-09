# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results Evidence + Bug/Fix List + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:38:13.476Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook
Business proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what we must prove in pilots)
1) **Speed-to-lead KPI:** first outbound SMS is created/sent **< 60 seconds** after lead is received (per lead source).
2) **Safety:** if the LLM fails (timeout/error), the system switches to **deterministic qualification** so the lead still gets handled.
3) **Compliance & resilience:** STOP/HELP, retries, dedupe, after-hours rules, calendar failures, and CRM logging all behave predictably.

## 1) Scope: 3 lead sources to test end-to-end
A) **Generic Webhook JSON** (any form/ads platform)
B) **Jotform** (real form tool)
C) **HubSpot CRM** (real CRM)

## 2) Prerequisites (pilot operator checklist)
- Access to product admin/logs that show:
  - webhook receive timestamp
  - outbound SMS creation timestamp
  - SMS provider “sent” timestamp (or delivery event)
- A test phone number you control for receiving SMS.
- A way to simulate after-hours (either configurable business hours or a staging env clock override).
- Calendar/booking link configured (or a placeholder URL to simulate failures).

**Evidence storage:** create a single folder for:
- screenshots of logs showing timestamps
- SMS conversation screenshots
- CRM record screenshots

## 3) KPI Measurement Method (<60s)
For every test case where an SMS should be sent, record:
- **T0 (Lead Received):** timestamp when webhook/form/CRM event hits our system.
- **T1 (SMS Created):** timestamp when system enqueues/creates outbound SMS.
- **T2 (SMS Sent):** timestamp from SMS provider (if available).

**Primary KPI:** T1 - T0 must be **<= 60s**.
**Secondary KPI:** T2 - T0 should generally be <= 90s (carrier variance acceptable), but log it.

**Sample size requirement for “Verified <60s”:**
- Minimum **20 total** successful lead submissions across the 3 sources, with at least:
  - 8 generic webhook
  - 6 Jotform
  - 6 HubSpot
- Of those, at least **5** should be “edge cases” (invalid/missing phone, after-hours, duplicates, retry).

## 4) Deterministic Fallback Mode (LLM down/timeout)
**Trigger conditions (any):**
- LLM API returns error
- LLM response time > configured timeout (recommend 4–6 seconds)
- LLM returns malformed output (missing required fields like intent/classification)

**Fallback behavior:**
- Send a deterministic message sequence that qualifies without AI.
- Keep messages short, one question at a time.
- If no response after timeouts, escalate to human with a clear status.

### Fallback flow (copy/paste script)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the right time/price?”

**If YES / any response / no response within 2 minutes** (do not block on YES):
**Message 2:**
“1) What service do you need? Reply: (A) Repair (B) Install/Replace (C) Quote/Estimate (D) Other”

**Message 3 (based on reply or if unclear):**
“2) What’s your ZIP code?”

**Message 4 (after ZIP):**
“Thanks. What’s a good time for a quick call? Reply with a time window (e.g., ‘today 3–5pm’) or I can send a booking link.”

**If booking link is enabled:**
“Here’s the booking link: {{calendar_link}}. If it doesn’t open, reply with 2 times that work and we’ll confirm.”

**Escalation rule:**
- If customer is qualified enough (service + zip + time window) OR customer asks for human, create a “Call Requested” task and notify operator.

**Safety text for failures:**
- If anything breaks: “Sorry—having trouble on our end. If you reply with your address (or ZIP) + best callback time, a human will confirm ASAP.”

## 5) STOP/HELP compliance requirements
- If user texts **STOP** (or STOPALL/UNSUBSCRIBE/CANCEL/END/QUIT):
  - Immediately send confirmation: “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  - Set contact as opted-out; do not send further automated messages.
- If user texts **HELP**:
  - Reply: “For help, contact us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

## 6) Test Execution Order (fastest pilot run)
Run in this order to minimize setup friction:
1) Generic webhook JSON (covers core pipeline)
2) Jotform submission (valid + missing/invalid phone)
3) HubSpot event -> SMS + CRM note formatting
4) Edge cases: STOP/HELP, after-hours, duplicates, retries, concurrency, calendar failure

## 7) Generic Webhook JSON — copy/paste payloads
Assume endpoint: POST {{WEBHOOK_URL}}
Header: Content-Type: application/json

### 7.1 Valid lead (should send SMS <60s)
{
  "source": "webhook",
  "external_lead_id": "wh_10001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test.lead@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "created_at": "2026-04-09T12:00:00Z"
}
**Expected:**
- T1-T0 <= 60s
- First SMS uses normal AI flow OR fallback if AI fails
- Lead record created with source=webhook

### 7.2 Missing phone (must fail safe; no SMS)
{
  "source": "webhook",
  "external_lead_id": "wh_10002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "HVAC install",
  "zip": "94107"
}
**Expected:**
- No SMS attempted
- Lead marked “Needs phone”
- Optional: email alert to operator

### 7.3 Invalid phone (must fail safe; no SMS)
{
  "source": "webhook",
  "external_lead_id": "wh_10003",
  "first_name": "BadPhone",
  "phone": "12345",
  "service": "Plumbing"
}
**Expected:**
- No SMS attempted
- Validation error recorded (E164 recommended)

### 7.4 Duplicate lead (idempotency)
Send the **Valid lead** again with same external_lead_id=wh_10001.
**Expected:**
- No second SMS blast
- System logs “duplicate suppressed”

### 7.5 Webhook retry event (same id, later timestamp)
Resend valid lead with same external_lead_id but new created_at.
**Expected:**
- Still deduped (idempotency key is external_lead_id)

## 8) Jotform tests (real form tool)
**Form fields required for test:** First name, Phone, Service needed, ZIP, Consent checkbox.

Test cases:
- JF-1 Valid submission -> SMS <60s
- JF-2 Missing phone -> form validation blocks OR our system rejects safely
- JF-3 Invalid phone -> safely rejected (no SMS)
- JF-4 Duplicate submit quickly (same phone within 2 minutes) -> dedupe rule should prevent spam

**Expected dedupe rule (recommended):**
- If same phone + same service (or same form submission id) within 5 minutes, do not send “first message” twice; append to existing thread.

## 9) HubSpot CRM tests
Trigger: new contact created or form submission inside HubSpot (depending on integration).

Test cases:
- HS-1 New contact w/ valid phone -> SMS <60s
- HS-2 Contact created without phone -> no SMS; create HubSpot note/task “Missing phone”
- HS-3 Ensure CRM note formatting contains transcript + qualification summary

### Expected HubSpot note format (copy/paste schema)
Title: “Lead Copilot — SMS Qualification Transcript”
Body:
- Source: HubSpot
- Lead received: {{T0}}
- First SMS created: {{T1}} ({{delta_seconds}}s)
- Status: {{Qualified | Unqualified | Needs Human | Opted Out}}
- Service: {{service}}
- ZIP: {{zip}}
- Preferred time: {{time_window}}
- Booking link clicked: {{yes/no/unknown}}

Transcript:
{{timestamp}} System: {{message}}
{{timestamp}} Lead: {{message}}
...

## 10) Edge case test matrix (pass/fail)
1) **STOP**: send STOP after first message
- Pass: opt-out confirmation sent; no further automation
2) **HELP**: send HELP
- Pass: help message includes email agent_bob_replit+lead-copilot@agentmail.to + STOP instruction
3) **After-hours**:
- Pass: first SMS acknowledges hours + offers booking/request callback next business day; no aggressive back-and-forth
4) **Multiple concurrent leads** (5 leads within 60 seconds)
- Pass: all receive first SMS <60s; no cross-talk between threads
5) **Calendar link failure** (simulate 404)
- Pass: system detects failure or user reports issue; offers 2-times manual scheduling path
6) **Webhook retries**
- Pass: idempotent; no duplicate first message
7) **Duplicate leads** (same phone from different sources)
- Pass: merge strategy or suppression prevents spamming; CRM contains a single unified thread reference
8) **CRM note formatting**
- Pass: transcript readable; no broken JSON; timestamps present

## 11) Results Evidence Table (fill during pilot)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 Lead Received
- T1 SMS Created
- Delta (sec)
- T2 SMS Sent (if available)
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes

## 12) Bug/Fix list (prioritized, pre-revenue critical)
P0 (must fix before agencies scale pilots):
- No idempotency key -> duplicate SMS on retries/duplicates
- STOP not enforced globally -> compliance risk
- Phone validation too permissive -> wasted SMS + poor UX
- After-hours routing sends immediate “book now” spam -> reputation risk

P1:
- Calendar failure not handled -> lost conversions
- Concurrency mixes threads -> catastrophic trust loss
- HubSpot note formatting inconsistent -> agencies can’t audit performance

P2:
- Minor copy issues, timing of follow-ups, optional enrichment

## 13) What “Verified <60s” means (final acceptance statement)
We can claim “Verified <60s first response” once:
- 20 tests are executed across the 3 sources
- 95%+ of valid leads meet T1-T0 <= 60 seconds
- Any failures have a documented root cause and mitigation

Operator sign-off:
Name: __________ Date: __________
Evidence folder link: __________
