# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:39:31.302Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Proof URL (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (why this exists)
Protect agency/customer reputation during first pilots by confirming:
1) **<60s first-response SMS** from lead submit time
2) **Safe behavior** for high-risk edge cases (missing phone, STOP/HELP, after-hours, duplicates/retries, calendar failure, concurrency)
3) **Deterministic fallback** continues qualification if LLM fails

This is **manual** (no automation) by design until we have paying customers.

---
## 1) Lead sources covered (minimum 3)
1. **Generic Webhook JSON** (any ad/form tool posting JSON to our endpoint)
2. **Jotform** (real form tool)
3. **HubSpot CRM** (contact + note/timeline event formatting)

---
## 2) Roles and tools
**Tester:** Bob (or pilot onboarding rep)

**Tools:**
- Browser + phone (or SMS inbox access)
- A stopwatch OR timestamp capture via:
  - Form submit time (Jotform submission timestamp)
  - Server/log timestamp (webhook received)
  - SMS provider delivery log timestamp (or message received time on device)
- A simple spreadsheet (use the Results tables below)

**Evidence to store:** screenshot or copy/paste of:
- submission confirmation
- SMS transcript (including STOP/HELP)
- CRM record (HubSpot contact timeline / note)

---
## 3) KPI + acceptance criteria
### A) <60s First Response KPI
**Definition:** Time from lead submission (or webhook received) to first outbound SMS.

**Pass criteria:**
- P0: **90% of trials** under **60 seconds**
- P1: No single trial exceeds **120 seconds** without a documented provider outage

**Minimum sample size (pilot):**
- 20 total leads across the 3 sources
  - 8 webhook JSON
  - 6 Jotform
  - 6 HubSpot-triggered (if HubSpot is a source) or HubSpot logging validation for the other sources

### B) Compliance + safety
- STOP immediately suppresses further marketing/qualification texts (except a one-time confirmation)
- HELP returns support info including **website URL** and **support email**
- Missing/invalid phone does not crash the flow; lead is logged with a clear error status and a safe next step

---
## 4) Deterministic fallback mode (LLM down / timeout)
**Trigger conditions (any):**
- LLM API error
- LLM timeout > 6s (configurable)
- Empty/invalid LLM response

**Fallback principles:**
- Ask a **short fixed sequence** of questions
- Always provide an “agent takeover” route
- Never hallucinate pricing, availability, or promises

### Fallback Script (exact messages)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions so we can help fast?”

If YES / any reply:
**Q1:** “What service do you need? (Reply 1) Repair  2) Install  3) Quote  4) Other”

**Q2:** “What’s your address or ZIP code?”

**Q3:** “When do you need this? (Reply 1) ASAP  2) This week  3) Just researching”

**Booking step (if calendar available):**
“Got it. Here’s the booking link to grab the next available slot: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm.”

**If calendar fails/unavailable:**
“Thanks—our booking link is temporarily unavailable. Reply with a good time window (e.g., ‘today 3–5pm’) and a human will confirm ASAP.”

**Escalation rule:**
- If user answers Q1+Q2 (service + location), mark as **Qualified** and route to human if booking not completed within 10 minutes.

### STOP / HELP responses (required)
- If inbound contains “STOP”:
  - Respond once: “You’re opted out and will no longer receive texts. Reply HELP for help.”
  - Set contact status: **Do Not Text**
- If inbound contains “HELP”:
  - “Support: {{business_name}} — {{website_url}}. Email: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---
## 5) Test data
Use consistent test leads:
- Valid US phone: +1XXXXXXXXXX (tester’s real device)
- Invalid phone cases:
  - “123”
  - “+199999”
  - blank
- Names:
  - “Test Valid”, “Test MissingPhone”, “Test InvalidPhone”, “Test Duplicate”, “Test AfterHours”

**After-hours window to test:** define per pilot (e.g., outside 9am–5pm local).

---
## 6) E2E test cases (runbook)
For each case, fill the Results row and attach evidence.

### Case 1: Generic Webhook JSON — happy path
**Steps**
1) POST to webhook endpoint with valid name + phone + service interest.
2) Start timer at request sent / received.
3) Confirm first SMS arrives.
4) Reply to qualify; confirm booking link sent.

**Expected**
- First SMS <60s
- Qualification completes
- HubSpot note (if enabled) contains clean transcript

### Case 2: Jotform — happy path
**Steps**
1) Submit Jotform with valid phone.
2) Capture Jotform submission timestamp.
3) Confirm SMS received.

**Expected**
- First SMS <60s from submission

### Case 3: HubSpot logging — formatting
**Steps**
1) Trigger a lead (webhook/Jotform) that creates/updates HubSpot contact.
2) Inspect contact timeline / note.

**Expected (format standard)**
- Title: “Lead Copilot Qualification”
- Body includes:
  - Lead source (Webhook/Jotform)
  - First response latency (seconds)
  - Transcript formatted with timestamps and direction
  - Final status: Qualified / Unqualified / Opted-out / Needs human

### Case 4: Missing phone
**Steps:** submit lead with empty phone.

**Expected:**
- No SMS attempt
- Lead stored with status “Missing phone”
- If email exists, optional email sent to request phone (safe copy)

### Case 5: Invalid phone
**Expected:**
- No repeated SMS retries beyond 1 (avoid carrier flags)
- Status “Invalid phone” with validation reason

### Case 6: STOP
**Steps:** after first SMS, reply “STOP”.

**Expected:**
- Confirmation message, then silence
- Contact flagged DNT

### Case 7: HELP
**Expected:**
- HELP message includes proof URL + support email

### Case 8: After-hours routing
**Expected:**
- Message sets expectation: “We’ll follow up at {{next_business_hour}}” OR offers booking link without promising immediate response

### Case 9: Multiple concurrent leads (burst)
**Steps:** submit 5 leads within 60 seconds.

**Expected:**
- No cross-talk (transcripts not mixed)
- All first responses <60–120s depending on provider; record actuals

### Case 10: Calendar link failure
**Steps:** simulate calendar outage/bad link.

**Expected:**
- System switches to “reply with a time window”
- Lead status “Needs scheduling (calendar down)”

### Case 11: Webhook retries
**Steps:** resend same webhook with same event_id/message_id.

**Expected:**
- Deduped: no duplicate SMS
- Log shows retry handled

### Case 12: Duplicate leads (same phone)
**Expected:**
- If within dedupe window (e.g., 24h): do not restart full flow; append note + optional “Still need help?” text

### Case 13: LLM failure forces deterministic mode
**Steps:** disable LLM key or simulate timeout.

**Expected:**
- Deterministic Q1/Q2/Q3 path used
- No broken/empty responses

---
## 7) Results tables (copy into a sheet)
### A) KPI timing log
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Lead name
- Phone valid? (Y/N)
- Submit timestamp
- Webhook received timestamp (if available)
- First SMS sent timestamp
- First SMS received timestamp
- Latency (submit -> sent)
- Latency (submit -> received)
- Pass <60s (Y/N)
- Notes/Evidence link

### B) Scenario pass/fail matrix
Rows = cases 1–13. Columns:
- Expected behavior
- Actual behavior
- Pass/Fail
- Severity (P0/P1/P2)
- Screenshot/Transcript link

---
## 8) Bug log template + severity
**Severity definitions:**
- **P0:** compliance or revenue-killer (STOP ignored, wrong recipient, >120s consistently)
- **P1:** material conversion hit (<60s often missed, calendar failure not handled)
- **P2:** formatting/polish

**Bug log fields:**
- Bug ID
- Severity
- Source
- Steps to reproduce
- Expected
- Actual
- Evidence
- Suggested fix
- Owner
- Status

---
## 9) Likely bugs/fixes checklist (pre-filled suspects)
1) Phone normalization to E.164 (prevent invalid sends)
2) Deduplication key (event_id + phone + timestamp window)
3) STOP/HELP keyword handling at earliest inbound stage
4) After-hours rules: messaging + routing + next-business-hour calculation
5) Calendar outage fallback copy + status tagging
6) CRM note formatting: transcript with clear directions + timestamps

---
## 10) Pilot sign-off criteria
Pilot QA passes when:
- 20-trial KPI log completed
- 90% under 60s and none >120s without vendor outage
- STOP/HELP verified with transcripts
- LLM-down deterministic mode verified
- HubSpot record shows correct, readable notes

If anything fails, ship fixes before onboarding the next agency to avoid compounding churn and reputation risk.
