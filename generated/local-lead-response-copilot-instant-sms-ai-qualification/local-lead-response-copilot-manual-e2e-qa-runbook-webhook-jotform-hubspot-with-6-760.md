# Local Lead Response Copilot — Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:11:46.515Z

---

# Local Lead Response Copilot — Manual E2E QA Runbook (Pilot)

Business site (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Scope + KPI
**Goal:** Prove end-to-end reliability for first pilots across **3 lead sources** and validate **first-response speed-to-lead < 60 seconds** while maintaining safe, compliant behaviors.

**Lead Sources in scope**
1) Generic Webhook JSON (POST)
2) Jotform (form tool)
3) HubSpot (CRM)

**Primary KPI:**
- P0: Time from **lead received by system** → **first outbound SMS queued/sent** must be **< 60s** (target < 20s).

**Secondary KPIs / safety checks:**
- P1: STOP/HELP handling is compliant and immediate.
- P1: Missing/invalid phone never triggers SMS; lead is routed to email/CRM note.
- P1: Dedupe prevents double-texting for duplicates/retries.
- P1: After-hours logic works.
- P2: Calendar link failure doesn’t dead-end; offers fallback booking method.

---
## 1) Pre-flight Setup (Operator Checklist)
Record these before testing:
- Date/time + tester name
- Environment: (prod/pilot sandbox)
- SMS provider + from-number used
- Timezone configured in app
- After-hours window configured (e.g., 6pm–8am)
- Booking method configured:
  - Preferred: calendar link (e.g., Calendly) OR internal booking endpoint
  - Fallback: “Reply with preferred times” + internal notification

**Tools needed:**
- A phone that can receive SMS (use a real handset)
- Stopwatch or time.is page for accurate seconds
- Access to logs/console timestamps if available (if not available, use message receive time on handset)

---
## 2) Deterministic Fallback Qualification Flow (No-LLM)
**Trigger conditions (any):**
- LLM error/timeout
- LLM returns empty/invalid output
- LLM latency pushes first response close to 60s threshold

**Rule:** The very first SMS must be sent without waiting for LLM if the first-response clock is nearing risk.

### 2.1 First SMS (sent immediately)
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—quick question so we can help fast: what service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other”

If no first_name/business_name available, use:
“Hi! Thanks for reaching out—quick question so we can help fast: what service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other”

### 2.2 Branching (deterministic)
After they reply with 1–4 or free text:
**Q2:** “Got it. What’s your ZIP code?”

**Q3:** “What’s the best time for a call? (Reply 1) ASAP 2) Today 3) Tomorrow 4) This week”

**Booking handoff:**
- If calendar link is healthy: “Perfect—grab a time here: {{calendar_link}}. If you don’t see a good slot, reply with 2–3 times that work.”
- If calendar link fails: “I’m having trouble loading the booking link right now. Reply with 2–3 times that work and we’ll confirm ASAP.”

**Completion:**
- Create/append CRM note: include transcript + answers + booking intent.
- Notify internal email/Slack if configured.

---
## 3) Global Fail-safe Behavior Matrix (Expected)

### 3.1 Missing phone
**Input:** no phone field OR empty
**Expected:**
- No SMS attempt
- Create CRM note/record with status “Missing phone”
- Send internal email to agent_bob_replit+lead-copilot@agentmail.to with lead details + source

### 3.2 Invalid phone
Invalid examples: “123”, “555-abc-xxxx”, too short, country mismatch
**Expected:**
- No SMS
- Log validation error + lead payload
- CRM note “Invalid phone—manual follow-up required”

### 3.3 STOP
**Expected:**
- Immediate opt-out confirmation: “You’re opted out and will no longer receive messages. Reply HELP for help.”
- Set contact opt-out flag; never message again unless explicit opt-in captured
- Record in CRM note: “STOP received at {{timestamp}}”

### 3.4 HELP
**Expected:**
- Reply with business identification + contact path: “Help: This is {{business_name}}. Reply STOP to opt out. For assistance email agent_bob_replit+lead-copilot@agentmail.to.”
- Log in CRM

### 3.5 After-hours
**Expected:**
- First response still sent promptly (<60s) but sets expectation:
  “Thanks! We’re currently closed, but we’ll follow up first thing at {{open_time}}. If urgent, reply ‘URGENT’.”
- Next-day follow-up task created (CRM or internal notification)

### 3.6 Multiple concurrent leads
**Expected:**
- Messages do not cross-contaminate (each lead has its own thread/context)
- All first responses <60s; no queue starvation

### 3.7 Calendar link failures
**Expected:**
- Detect failure OR if link is missing, present fallback booking request (reply with times)
- Log booking link failure once (don’t loop)

### 3.8 Webhook retries
**Expected:**
- Same event resent should not re-text if already processed (idempotency)
- Return 200/OK after safe dedupe OR 409 if you explicitly signal duplicate

### 3.9 Duplicate leads
**Expected:**
- Deduping on (source + lead_id) OR normalized phone within a time window (e.g., 24h)
- If duplicate detected, append CRM note rather than restarting qualification

### 3.10 CRM note formatting (HubSpot)
**Expected:**
- Notes are consistent, readable, and agency-reporting friendly (template below)

---
## 4) Source-specific Tests

### 4.1 Source A — Generic Webhook JSON
**Minimum required fields (recommended):**
- lead_id (string)
- first_name, last_name (optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- source (e.g., “webhook-test”)
- created_at (optional)

#### 4.1.1 Paste-ready payloads
**A1 Valid lead**
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "Repair",
  "source": "webhook-test"
}
```
**A2 Missing phone**
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "source": "webhook-test"
}
```
**A3 Invalid phone**
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "123",
  "source": "webhook-test"
}
```
**A4 Duplicate lead_id (send A1 twice)**
- Re-send payload A1 within 1–2 minutes.

**A5 Retry simulation**
- Send A1, then immediately resend with identical body and a header like `X-Retry: 1` if supported.

**Expected:** as per matrix; ensure dedupe prevents double SMS.

### 4.2 Source B — Jotform
**Setup:**
- Create a form “QA Lead Form”
- Fields: First name, Last name, Phone, Email, Service needed (dropdown), ZIP, Consent checkbox

**Test submissions:**
- J1 Normal submission with valid phone
- J2 Missing phone (leave blank)
- J3 Invalid phone (enter 123)
- J4 After-hours submission
- J5 Duplicate (submit identical phone twice within 2 minutes)

**Expected:** first SMS <60s for valid; no SMS for missing/invalid.

### 4.3 Source C — HubSpot
**Setup:**
- Create test contact(s) and trigger a “new lead created” event (or form submission into HubSpot)

**Tests:**
- H1 New contact with valid phone triggers SMS
- H2 Existing contact update should not re-trigger if configured as “new lead only”
- H3 Note formatting includes transcript + timestamps + opt-out status

---
## 5) Timing Verification Procedure (<60s proof)
For each test case, capture:
1) **T0 Lead submit time**
   - Webhook: time you sent request (or server received timestamp if shown)
   - Jotform: submission confirmation time
   - HubSpot: record creation time
2) **T1 SMS sent/queued time**
   - Prefer provider log timestamp; if not available, use time the message appears on handset as proxy
3) **T2 Handset received time** (message appears)

**Computed:**
- First response latency = T1 - T0 (primary)
- Perceived latency = T2 - T0 (secondary)

**Pass/Fail:**
- Pass if first response latency < 60s for all valid leads
- Any single >60s is a P0 incident; log immediately.

---
## 6) Results Table (paste into doc/sheet)
| Case ID | Source | Scenario | T0 Lead Received | T1 SMS Sent | T2 Received | T1-T0 (sec) | Pass? | Notes |
|---|---|---|---|---|---|---:|---|---|
| A1 | Webhook | Valid |  |  |  |  |  |  |
| A2 | Webhook | Missing phone |  |  |  |  |  |  |
| A3 | Webhook | Invalid phone |  |  |  |  |  |  |
| A4 | Webhook | Duplicate |  |  |  |  |  |  |
| J1 | Jotform | Valid |  |  |  |  |  |  |
| J4 | Jotform | After-hours |  |  |  |  |  |  |
| H1 | HubSpot | New lead |  |  |  |  |  |  |

---
## 7) HubSpot Note Formatting (Strict Template)
**Title:** Lead Copilot Transcript — {{source}} — {{lead_id or contact_id}}

**Body (exact sections):**
- Lead Summary:
  - Name: {{name}}
  - Phone: {{phone}} (valid/invalid)
  - Email: {{email}}
  - Source: {{source}}
  - Lead ID: {{lead_id}}
  - Received at: {{T0}}
  - First SMS at: {{T1}} (Latency: {{T1-T0}}s)
  - Opt-out: {{true/false}} (STOP at {{timestamp}} if applicable)

- Qualification (deterministic/LLM):
  - Mode used: {{LLM|Fallback}}
  - Service needed: {{answer}}
  - ZIP: {{answer}}
  - Timing preference: {{answer}}

- Booking:
  - Calendar link offered: {{url or none}}
  - Outcome: {{Booked|Requested times|No response|Failed link}}

- Transcript (verbatim):
  - {{timestamp}} US -> “…”
  - {{timestamp}} LEAD -> “…”

---
## 8) Bug Log Template (with severity)
| Bug ID | Severity (P0/P1/P2) | Source | Title | Steps to Reproduce | Expected | Actual | Evidence (screenshots/logs) | Proposed Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|

**Severity guide:**
- P0: >60s first response; double-texting; STOP ignored; messages sent to invalid phone; cross-lead message leakage
- P1: after-hours wrong; calendar down dead-ends; CRM notes unreadable
- P2: minor copy issues; non-blocking formatting

---
## 9) Pilot “Definition of Done”
You can confidently onboard agencies when:
- 20 timed trials completed across Webhook + Jotform + HubSpot
- 100% of valid leads show T1-T0 < 60s (no exceptions)
- STOP/HELP verified once per source
- Dedupe verified (no double texts on retry/duplicate)
- Fallback flow triggers correctly when LLM is disabled or fails
- HubSpot notes match the strict template and include latency proof
