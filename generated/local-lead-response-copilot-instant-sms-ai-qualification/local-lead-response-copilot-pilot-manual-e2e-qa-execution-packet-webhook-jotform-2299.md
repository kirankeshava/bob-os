# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (Webhook + Jotform + HubSpot) with <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:41:20.639Z

---

## 1) Goal
Run a fast, repeatable manual end-to-end (E2E) verification during early pilots (no automation) that proves:
- First response KPI: **lead received → first outbound SMS sent in < 60 seconds** (target) for 95%+ of trials.
- Safe fail-safes: deterministic qualification continues when LLM fails/timeouts.
- Compliance/UX basics: STOP/HELP, after-hours handling, dedupe, retries, calendar failure, concurrency, and CRM note formatting.

This packet is designed to protect reputation with agencies and reduce churn in month 1.

**Customer legitimacy references (for pilots/onboarding):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---
## 2) Systems Under Test (SUT)
1) **Lead intake**: Generic webhook endpoint (JSON).
2) **Real form tool**: **Jotform** submission → webhook/Zapier-style post to SUT (free tier acceptable).
3) **CRM**: **HubSpot** contact creation/update + note/timeline event formatting.

Downstream dependencies assumed (configure per pilot): SMS sending number/provider, LLM (optional), calendar booking link (optional), and internal datastore for dedupe.

---
## 3) Measurement & Evidence for <60s Response KPI
### Required timestamp points (record all)
For each trial, capture:
- **T0 (Lead Created)**: time lead submitted (form submit confirmation time / webhook request time).
- **T1 (Lead Received by SUT)**: server log timestamp (or webhook request log receipt time).
- **T2 (First SMS Sent)**: SMS provider “message created/sent” timestamp (or app outbox timestamp).
- **T3 (First SMS Delivered)** (optional but recommended): provider delivery receipt.

### Pass/Fail
- **Primary KPI:** (T2 − T0) < 60 seconds = PASS.
- If T0 is ambiguous, use (T2 − T1) < 30 seconds as internal processing KPI.

### Evidence to store (per source)
- Screenshot/export of webhook request log (T1).
- Screenshot of outbound message record (T2) and (if available) delivery status (T3).
- If SMS transcript is visible, export/copy full transcript.

### Sample size
- Minimum **20 trials total** across sources:
  - Webhook JSON: 8
  - Jotform: 6
  - HubSpot-driven/CRM update validations: 6
Include at least: 2 after-hours, 3 invalid/missing phone, 3 duplicates, 3 concurrent leads.

---
## 4) Deterministic Fallback Mode (LLM failure / timeout safe behavior)
### When to trigger fallback
Fallback must activate when:
- LLM API errors OR times out > 2.5s (configurable)
- LLM returns empty/invalid JSON
- Tool-call fails repeatedly (>=2 attempts)

### Fallback conversation (copy/paste script)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what service do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”

**If reply 1/2/3/4:**
“Got it. What’s your ZIP code?”

**After ZIP provided:**
“Thanks—what’s the best time for a quick call? Reply 1) ASAP 2) Today 3) Tomorrow 4) This week”

**After time preference:**
“Perfect. Here’s the booking link: {{calendar_link}}. If it doesn’t load, reply CALL and we’ll schedule you.”

**If user replies CALL:**
“Okay—what’s a good phone number to reach you at? (Or reply SAME if this number is best.)”

**Escalation to human (if user is confused / free text 2x):**
“Thanks—someone from our team will text you shortly to confirm details. If urgent, reply URGENT.”

### Calendar link failure handling (deterministic)
If calendar tool returns error/unavailable:
- Replace booking line with: “We’re having trouble with the booking link right now. Reply with a time window that works (e.g., ‘today 2–4pm’) and we’ll confirm.”
- Create internal task: “Manual scheduling required: calendar down.”

---
## 5) Compliance: STOP/HELP (must pass)
### STOP
- If inbound message equals “STOP” / “UNSUBSCRIBE” / “CANCEL” (case-insensitive):
  - Immediately set contact status = DoNotContact
  - Send confirmation: “You’re unsubscribed and will no longer receive messages. Reply HELP for help.”
  - No further marketing/qualification messages.

### HELP
- If inbound equals “HELP”:
  - Respond: “{{business_name}}: We can help schedule your service. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

Store evidence: screenshot of transcript showing STOP/HELP behavior.

---
## 6) Lead Source Setup & Test Execution
### A) Generic Webhook JSON (baseline)
**Purpose:** fastest way to validate E2E reliability independent of vendor forms.

**Minimum required fields** (map to internal schema):
- first_name (string, optional)
- last_name (string, optional)
- phone (string, required for SMS)
- email (string, optional)
- source (string, e.g., “webhook”)
- service (string, optional)
- created_at (ISO8601, optional; otherwise server time)
- external_id (string, recommended for dedupe)

**Test payloads (copy/paste JSON)**
1) Valid lead
{ "external_id":"wh_001", "first_name":"Alex", "phone":"+14155550123", "email":"alex@example.com", "source":"webhook", "service":"Quote" }

2) Missing phone
{ "external_id":"wh_002", "first_name":"NoPhone", "email":"nophone@example.com", "source":"webhook", "service":"Repair" }
Expected: no SMS attempt; create internal alert + optionally email fallback; mark lead as “needs phone”.

3) Invalid phone
{ "external_id":"wh_003", "first_name":"BadPhone", "phone":"123", "source":"webhook" }
Expected: reject/flag; no SMS; log validation error.

4) Duplicate lead (same external_id)
Send payload #1 again.
Expected: dedupe triggers; no second SMS; add CRM note “duplicate ignored”.

5) Concurrency batch
Send 5 valid leads rapidly (wh_010..wh_014).
Expected: each gets first SMS <60s; no cross-talk; correct threading.

6) Retry simulation (same request delivered twice within 10s)
Send wh_020 twice.
Expected: idempotent handling; only one outbound first SMS.

Record timestamps T0/T1/T2.

### B) Jotform (real form tool)
**Form fields to create** (free):
- First Name
- Phone Number
- Email
- Service Needed (dropdown)
- Consent checkbox (optional depending on region)

**Tests**
- Valid submission → first SMS <60s.
- Missing phone (leave blank) → form should block OR SUT should gracefully reject and notify.
- Invalid phone format → verify normalization/validation rules.
- After-hours submission (simulate by running during configured after-hours or temporarily adjusting after-hours window) → ensure correct after-hours message.

**After-hours expected message (deterministic):**
“Thanks for reaching out—our team is currently offline. We’ll text you first thing at {{next_business_time}}. If urgent, reply URGENT.”

### C) HubSpot CRM validations
**Objectives**
- Contact created/updated correctly.
- Notes/timeline event formatting is readable and consistent.
- Duplicate behavior does not spam the contact or create multiple contacts.

**Expected HubSpot note format (template)**
Title: “Lead Copilot Qualification”
Body (example):
- Source: {{source}}
- External ID: {{external_id}}
- First response sent at: {{T2_iso}}
- Conversation summary:
  - Service: {{service}}
  - ZIP: {{zip}}
  - Preferred time: {{time_pref}}
- Booking:
  - Calendar link: {{calendar_link}}
  - Status: {{booked|pending|calendar_failed}}
- Compliance:
  - STOP status: {{true|false}}

**HubSpot test cases**
- New contact: verify single contact created, properties filled.
- Existing contact: new lead should append note (not overwrite key fields incorrectly).
- Dedupe: same phone/email should not create duplicate contacts; should attach new note.

---
## 7) Edge-Case Test Matrix (required)
1) Missing phone (all sources)
- Pass: no SMS sent; lead flagged; optional email sent; no crash.

2) Invalid phone
- Pass: validation error logged; lead flagged; no repeated retries.

3) STOP
- Pass: DNC set; confirmation message sent; no further messages.

4) HELP
- Pass: help response includes business name + support email + STOP instruction.

5) After-hours
- Pass: first SMS still sent <60s but uses after-hours copy; no booking attempts until open.

6) Multiple concurrent leads
- Pass: no queue starvation; each lead gets first SMS <60s.

7) Calendar link failure
- Pass: fallback scheduling message; internal task created; CRM note indicates calendar_failed.

8) Webhook retries
- Pass: idempotency by external_id (or hashed payload+timestamp window); only one first SMS.

9) Duplicate leads (same phone)
- Pass: dedupe rules prevent double first SMS within configured window (e.g., 24h) unless explicitly allowed.

10) CRM note formatting
- Pass: note readable, consistent fields, includes timestamps and status.

---
## 8) Results Capture Tables (paste into docs/spreadsheet)
### Trial log
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/invalid/duplicate/after-hours/etc.)
- T0 Lead Created
- T1 Lead Received
- T2 First SMS Sent
- Delta (T2-T0)
- Pass/Fail (<60s)
- Transcript saved? (Y/N)
- Evidence link (screenshot/log URL)
- Notes

### Bug log (severity tied to churn risk)
Columns:
- Bug ID
- Severity (P0 reputational/compliance, P1 conversion loss, P2 minor)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Evidence
- Suggested fix
- Owner
- Status

---
## 9) Known “must-fix before agency pilot” gates
- Any STOP failure = **P0** (do not onboard agencies).
- Any repeat SMS spam on retry/duplicate = **P0/P1** depending on severity.
- Median first response >60s in normal conditions = **P1** (hurts core value prop).
- Calendar failure without fallback = **P1**.

---
## 10) What ‘Verified’ Means for <60s
We can claim “<60s first response” when:
- At least 20 trials recorded.
- 95%+ trials show (T2 − T0) < 60s.
- Remaining failures have documented cause (provider outage, misconfig) and documented mitigation.

End of packet.