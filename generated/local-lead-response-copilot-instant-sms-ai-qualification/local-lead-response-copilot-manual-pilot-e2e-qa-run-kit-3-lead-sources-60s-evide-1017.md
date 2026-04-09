# Local Lead Response Copilot — Manual Pilot E2E QA Run Kit (3 Lead Sources) + <60s Evidence Tables + Deterministic Fallback Script

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:55:57.864Z

---

## 1) Scope & Goal (Pilot / Pre-revenue)
Validate that the system can:
- Trigger on **3 lead sources**: (A) Generic Webhook JSON, (B) Jotform, (C) HubSpot CRM
- Send **first SMS in <60 seconds** from lead receipt
- Behave safely for: missing phone, invalid phone, STOP/HELP, after-hours, concurrency, calendar failure, retries, duplicates, and HubSpot note formatting
- Continue qualification even if LLM fails using a **deterministic script**

Store evidence (timestamps + transcripts) to protect agency reputation.

---
## 2) Environments / Evidence to Capture
**Evidence fields (fill per test run):**
- Test ID
- Lead source
- Lead submit timestamp (source-side)
- Copilot received timestamp (webhook logs / app logs)
- First SMS sent timestamp (provider/app)
- First SMS delivered timestamp (provider)
- Delta (submit → sent) seconds
- Pass/Fail
- Transcript / screenshot link
- Notes

**KPI acceptance:**
- P0: 95% of trials have submit→sent <60s (during normal operations)
- P0: 100% of leads either (a) get a valid first response SMS or (b) are safely rejected/queued with internal alert when phone missing/invalid

---
## 3) Lead Source A — Generic Webhook JSON
### A1) Standard payload (happy path)
POST JSON:
{
  "event": "lead.created",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test.lead@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "preferred_time": "ASAP"
  },
  "source": {
    "name": "WebhookTest",
    "campaign": "Search-HighIntent",
    "ad_id": "ad_123"
  },
  "meta": {
    "lead_id": "wh_001",
    "timestamp": "2026-04-09T10:00:00Z"
  }
}
Expected:
- Copilot accepts request (2xx)
- First SMS sent <60s
- Qualification begins (deterministic if LLM fails)

### A2) Missing phone
Same as A1 but omit lead.phone.
Expected:
- No SMS attempt
- Lead marked “uncontactable”
- Internal note/log: missing phone
- If email present, optional email task created (if product supports) otherwise just log

### A3) Invalid phone
lead.phone: "123" or "+1415ABC".
Expected:
- No SMS attempt
- Validation error logged
- Lead flagged for manual follow-up

### A4) Webhook retries / idempotency
Send A1 three times with same meta.lead_id="wh_001".
Expected:
- Exactly one outbound SMS thread
- Subsequent retries return 2xx but do not duplicate messages

### A5) Concurrency
Fire 10 distinct leads within 5 seconds (lead_id wh_010–wh_019).
Expected:
- No cross-talk (each lead gets correct personalization)
- All first SMS sent <60s (record deltas)

---
## 4) Lead Source B — Jotform (real form tool)
### Setup checklist
- Create free Jotform with fields: First Name, Last Name, Phone, Email, Service Needed, Zip, “Preferred time”
- Configure submission webhook to Copilot endpoint

### B1) Happy path submission
Submit with valid E.164 phone.
Expected:
- First SMS sent <60s
- Service field appears in first message (or in CRM note)

### B2) Invalid phone formatting
Submit phone as (415) 555-0123, 4155550123, and a malformed string.
Expected:
- If product normalizes, it converts to E.164 and sends; otherwise safely rejects and logs
- No provider errors thrown repeatedly (no retry loop)

### B3) Duplicate Jotform submissions
Submit same form twice within 30 seconds with same phone/email.
Expected:
- Dedupe rule kicks in (recommended: dedupe window 10 minutes by phone+source)
- Second submission either updates context or logs as duplicate without spamming the lead

---
## 5) Lead Source C — HubSpot CRM
### C1) New contact created (with phone)
Create contact with phone + lifecycle stage “lead”.
Expected:
- Copilot triggers once
- First SMS <60s
- HubSpot note created with required format (see section 8)

### C2) Missing phone
Create contact without phone.
Expected:
- No SMS
- HubSpot note: “Missing phone; cannot text” + next steps

### C3) CRM note formatting & updates
Ensure subsequent lead replies append correctly (either add a second note or update a timeline event without mangling formatting).
Expected:
- Notes are readable, consistent, and contain metadata

---
## 6) STOP / HELP Compliance (All Sources)
### STOP
From the lead handset, reply “STOP”.
Expected:
- Immediate confirmation message: “You’re opted out…”
- No further messages are sent (including retries, reminders)
- Opt-out persists across new duplicate leads

### HELP
Reply “HELP”.
Expected:
- Help message includes business identity and contact email:
  - agent_bob_replit+lead-copilot@agentmail.to
  - Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---
## 7) After-hours Behavior
Define business hours (example): Mon–Fri 8am–6pm local.
### Test
Submit lead outside business hours.
Expected:
- First SMS still sent <60s but uses after-hours copy:
  - sets expectation (responding next business day)
  - offers booking link OR asks 1 qualifying question then routes to next-day follow-up queue

---
## 8) Calendar Link Failure
Simulate calendar provider outage or invalid booking URL.
Expected:
- Copilot detects failure within timeout and switches to:
  - offer alternate: “Reply with 2 times that work tomorrow”
  - create internal task/alert
- No infinite retry loops

---
## 9) Deterministic Fallback Qualification Script (LLM Down / Timeout)
**Trigger conditions:** LLM error, timeout >3s, or confidence below threshold.
**Goal:** collect minimum viable info to book or escalate.

### Message 0 (First SMS; must send <60s)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. Quick question so I can get you scheduled: is this for (1) today, (2) this week, or (3) just pricing info?”

Branch:
- If reply contains 1/today/ASAP → go to Q1
- If 2/this week → go to Q1
- If 3/pricing → go to Q3
- Else → clarification prompt once, then escalate

### Q1 (Location / zip)
“Got it—what’s the job ZIP code?”
- Validate 5-digit; if invalid twice → escalate

### Q2 (Job type / urgency)
“Any details I should know (e.g., no hot water, leak, or install)?”
- Store as notes; proceed

### Q3 (Appointment)
“I can get you on the calendar. What time window works best: (1) morning, (2) afternoon, or (3) evening?”

### Q4 (Confirmation)
“Perfect. I’ll have a tech confirm shortly. If you prefer a call, reply CALL.”

### Escalation rule
If user replies anything that fails validation twice OR asks complex question:
“Thanks—looping in a human to help. If urgent, reply URGENT.”
Create internal alert/task.

### Timeouts
If no reply after 5 minutes:
“Just checking—do you still want help with {{service}}? Reply YES and I’ll get you scheduled.”
If no reply after 24 hours: stop.

---
## 10) HubSpot Note Format (Expected)
**Single timeline note template:**
Title: “Lead Copilot SMS Qualification”
Body:
- Lead Source: {{source}}
- Campaign/Ad: {{campaign}} / {{ad_id}}
- Received: {{received_timestamp}}
- First SMS Sent: {{sms_sent_timestamp}} (delta: {{seconds}}s)
- Status: Qualified / Unqualified / Needs follow-up / Opted-out
- Key fields:
  - Service: {{service}}
  - ZIP: {{zip}}
  - Urgency: {{urgency}}
  - Preferred window: {{window}}
- Transcript (latest 6 messages):
  - OUT: …
  - IN: …

Acceptance:
- No broken JSON, no run-on lines, readable bullets
- STOP sets Status: Opted-out and prevents further notes from outbound messaging

---
## 11) Bug/Fix Log (Use during pilot)
For each issue record:
- Severity (P0 blocks sending/compliance; P1 causes spam/confusion; P2 cosmetic)
- Repro steps + payload
- Expected vs Actual
- Evidence (timestamp, screenshots)
- Suggested fix (e.g., phone normalization to E.164; idempotency key = source+lead_id; dedupe window 10m by phone; calendar timeout fallback)

---
## 12) How to Verify “<60s First Response” in Practice
For each of 20 trials:
1) Record form submit / CRM create time (UTC)
2) Record webhook received time (app logs)
3) Record SMS sent time (provider logs)
4) Compute delta submit→sent
Pass if delta <60s.

Minimum sample recommendation (manual):
- 10 webhook JSON
- 5 Jotform
- 5 HubSpot

This kit is ready to run as soon as endpoints and a sending number/log access exist.