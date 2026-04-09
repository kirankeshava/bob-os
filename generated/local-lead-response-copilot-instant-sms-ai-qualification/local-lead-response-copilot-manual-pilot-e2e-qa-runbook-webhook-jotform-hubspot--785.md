# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:23:37.283Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Legitimacy URL to share with pilot partners:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Pilot ops contact:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal / KPI
**Primary KPI:** First outbound SMS is sent within **<60 seconds** of lead receipt (per lead source).

**Success definition:**
- For 20 total test leads (mix across sources and edge cases), 95%+ have first SMS sent within 60 seconds.
- 0 compliance violations: STOP honored immediately; HELP returns support message.
- LLM failure never blocks outreach; deterministic fallback flow continues safely.

## 1) Lead Sources Covered (minimum 3)
1) **Generic Webhook JSON** (direct integration)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

## 2) Pre-flight Checklist (do before testing)
1. Confirm SMS provider is connected and sending is enabled.
2. Confirm an internal “test recipient” phone number is available (your own phone).
3. Confirm system logs are accessible (at minimum: request received timestamp + message queued/sent timestamp).
4. Confirm after-hours window configured (example used in tests): **Mon–Fri 9am–6pm local time**.
5. Confirm a calendar/booking link is configured (even if dummy). We will test link failure handling.

## 3) Timing Proof Method (<60s)
For each test lead, capture these timestamps:
- **T0 (Lead Received):** when the system receives the lead (webhook hit time / form submit time / CRM event time).
- **T1 (SMS Queued/Sent):** when the system queues/sends the first SMS.
- **T2 (Handset Delivered):** when the SMS appears on the phone (manual observation; optional but useful).

**Compute:**
- **Response time = T1 - T0** (primary metric)
- Delivery lag = T2 - T1 (secondary; carrier-dependent)

**Pass criteria:** Response time < 60 seconds.

## 4) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)
Trigger this flow when:
- LLM request errors, times out, or returns empty/unsafe output
- Confidence is low or response parsing fails

### Fallback Step 1 (immediate first SMS)
**SMS 1:**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need?
Reply 1) Repair  2) Install  3) Quote  4) Other”

If user replies:
- **1/Repair:** go to Step 2A
- **2/Install:** go to Step 2B
- **3/Quote:** go to Step 2C
- **4/Other or text:** go to Step 2D
- **No response after 5 minutes:** send reminder (SMS 1b)

**SMS 1b (5 min no-response):**
“Just checking—reply 1) Repair  2) Install  3) Quote  4) Other and I’ll get you scheduled.”

### Fallback Step 2 (collect key qualification)
**2A Repair:**
“Got it. What’s the address (city is fine) and what’s the issue?”

**2B Install:**
“Great—what type of install and what’s the address (city is fine)?”

**2C Quote:**
“Sure—what are you looking to get quoted and what’s the address (city is fine)?”

**2D Other:**
“Thanks—briefly describe what you need and your city.”

### Fallback Step 3 (booking handoff)
When the user provides enough detail (service + location + short description), send:
“Perfect. Want to book a call or an onsite appointment?
Reply 1) Call  2) Appointment”

If **1) Call**:
“Here’s the booking link: {{calendar_link}}. If it doesn’t open, reply with 2 time windows that work for you and we’ll confirm.”

If **2) Appointment**:
“Here’s the booking link: {{calendar_link}}. If it doesn’t open, reply with 2 days/times that work and we’ll confirm.”

### Calendar Link Failure Handling
If user indicates link failure (“doesn’t work”, “404”, etc.) OR tracking shows link down:
“Sorry about that—just reply with **two** time windows that work (e.g., Tue 2–4pm, Wed 9–11am). We’ll confirm ASAP.”

### STOP/HELP Compliance (always deterministic)
- If inbound contains **STOP** (or common variants):
  - Immediately mark as opted-out; send confirmation:
  “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
  - Do not send any further qualification texts.
- If inbound contains **HELP**:
  “Support: email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### After-hours Handling
If lead is received outside business hours:
- Still send an immediate acknowledgment within <60s:
  “Thanks—we’re currently closed. We’ll text you first thing when we open. If urgent, reply URGENT.”
- If user replies URGENT, optionally route to on-call (if configured) or respond:
  “Understood—please share your address (city) and what’s going on, and we’ll do our best to assist.”

## 5) Test Matrix (What to run)
Run at least **20 total leads** with a mix of normal + edge cases. Minimum per source:
- Webhook JSON: 8 tests
- Jotform: 6 tests
- HubSpot: 6 tests

### Core Test Cases (apply across sources)
1. Normal lead (valid mobile) → first SMS <60s, qualification starts
2. Missing phone → no SMS sent; create internal alert/CRM note; request phone if possible
3. Invalid phone format → no SMS; log validation error; create CRM note
4. STOP keyword → immediate opt-out, no further sends
5. HELP keyword → help response + support email
6. After-hours lead → acknowledgement <60s + next-business-hour behavior
7. Multiple concurrent leads (submit 5 within 30 seconds) → all get responses <60s, no cross-talk
8. Calendar link failure → fallback to “two time windows” message
9. Webhook retries (same event resent) → dedupe; no duplicate SMS threads
10. Duplicate lead (same phone, new lead id) → expected behavior defined (either new thread or merge); must not spam
11. CRM note formatting → transcript + metadata clean, consistent

## 6) Source-Specific Setup + Execution

### A) Generic Webhook JSON
**Minimum expected fields:**
- lead_id (string)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- source ("webhook")
- created_at (ISO)
- message (optional)

**Ready-to-paste payloads (examples):**

1) **Valid lead**
```json
{
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z",
  "message": "Need a quote"
}
```
**Expected:** First SMS within 60s; qualification starts.

2) **Missing phone**
```json
{
  "lead_id": "wh_002",
  "first_name": "NoPhone",
  "source": "webhook",
  "created_at": "2026-04-09T12:02:00Z"
}
```
**Expected:** No SMS attempt; internal log error; CRM note or alert created.

3) **Invalid phone**
```json
{
  "lead_id": "wh_003",
  "first_name": "BadPhone",
  "phone": "12345",
  "source": "webhook",
  "created_at": "2026-04-09T12:03:00Z"
}
```
**Expected:** No SMS; validation error recorded; no crash.

4) **Duplicate lead ID (dedupe)**
Send payload #1 again with same lead_id.
**Expected:** No second initial SMS; note “duplicate ignored”.

5) **Retry simulation**
Send payload #1 twice within 5 seconds.
**Expected:** idempotent handling; only one conversation started.

### B) Jotform
**Setup:** Create a simple form with fields:
- First Name
- Phone Number
- Service Needed (dropdown)
- Message (optional)
- Consent checkbox (optional, if used)

**Execution:** Submit form entries manually with:
- Valid phone
- Missing phone
- Invalid phone
- After-hours submission (change device time or run outside window)

**Expected:** Form submission triggers the same immediate SMS within <60s.

### C) HubSpot
**Setup:**
- Create test contact properties if needed (Lead Source, Last Form, etc.)
- Confirm where notes/logs are written (Contact “Notes” timeline)

**Execution:** Create/update contacts to trigger workflow (depending on integration design).

**Expected:**
- Correct note formatting (see below)
- No duplicated notes on retries
- If SMS fails, note contains error reason and next step

## 7) HubSpot CRM Note Format (Strict Template)
Each lead should create/update a note formatted like:

**Title:** Lead Response Copilot — Conversation Started

**Body (example):**
- Lead ID: {{lead_id}}
- Source: {{source}} (Webhook/Jotform/HubSpot)
- Received At (UTC): {{received_at}}
- First SMS Sent At (UTC): {{sms_sent_at}}
- First Response Time (sec): {{t1_minus_t0_seconds}}
- Phone: {{phone}} (E.164)
- Email: {{email}}
- Opt-out Status: {{opt_out_status}}
- After-hours: {{true_false}}
- Booking Outcome: {{booked|pending|failed_link|user_provided_times}}
- Calendar Link Used: {{calendar_link_or_none}}

**Transcript:**
1. OUT: “Hi … Reply 1) Repair 2) Install 3) Quote 4) Other”
2. IN: “3”
3. OUT: “Sure—what are you looking to get quoted and what’s the address (city is fine)?”
...

**Errors/Warnings (if any):**
- {{error_message}}

## 8) Results Table (fill during run)
Use one row per test lead:
- Test ID
- Source
- Scenario (valid/missing phone/STOP/etc.)
- T0 Received
- T1 SMS Sent
- Response Time (sec)
- Pass/Fail (<60s)
- Notes / Bug link

## 9) Bug Log Template (minimum fields)
- Bug ID
- Title
- Severity (P0/P1/P2)
- Source (Webhook/Jotform/HubSpot)
- Steps to Reproduce
- Expected
- Actual
- Evidence (timestamps, screenshots)
- Suspected Cause
- Suggested Fix
- Retest Result

## 10) Known High-Risk Failure Modes (watch closely)
- Phone parsing/normalization errors (E.164)
- STOP/HELP not honored across thread states
- Dedupe/idempotency missing → double texts on retries
- Queue backlog causing >60s first SMS
- After-hours logic incorrectly blocks first acknowledgement
- Calendar link outages causing dead-ends (must fallback to “two time windows”)
- CRM note formatting inconsistent → agency distrust

---
**Operator instruction:** Do not attempt to “fix in code” during the pilot. Log failures with exact timestamps and reproduction steps; apply the smallest operational workaround (e.g., configuration change, throttling, idempotency key usage) and rerun the failing test.
