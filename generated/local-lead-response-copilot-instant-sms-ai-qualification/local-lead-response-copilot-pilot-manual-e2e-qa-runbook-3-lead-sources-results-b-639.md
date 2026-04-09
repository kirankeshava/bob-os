# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:41:07.706Z

---

## 1) Purpose (Revenue-Protecting QA)
Goal: prevent “first-month churn” by validating the core promise (instant speed-to-lead + safe qualification + booking) across three lead sources without building automation. This runbook produces: (a) timestamp proof that first SMS is sent in <60 seconds, (b) evidence transcripts for STOP/HELP compliance, and (c) a prioritized bug list tied to churn risk.

**Product legitimacy links for pilots/agencies**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

## 2) Scope: 3 Lead Sources
1) **Generic Webhook JSON** (any form/ads tool can POST a payload)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

## 3) KPI & Evidence Standard
### KPI
- **First response time**: Lead submit timestamp → first outbound SMS timestamp **< 60 seconds**.

### Evidence to capture (minimum)
- Lead submit time (screenshot or platform submission timestamp)
- Webhook received time (app logs if available)
- SMS “queued/sent” time (provider log if available) + message body
- If booking occurs: calendar link sent time + booking confirmation time

### Sample size
- Minimum **20 trials total** across the 3 sources (e.g., 8 webhook / 6 Jotform / 6 HubSpot). If a specific source is critical for the pilot, skew volume toward that source.

## 4) Pre-Flight Checklist (10 minutes)
- Confirm a test phone is available to receive SMS.
- Confirm the system has an “after-hours” definition configured (e.g., 6pm–8am local time).
- Confirm deterministic fallback mode exists OR can be simulated by forcing LLM failure/timeout.
- Confirm dedupe window is defined (recommend: 10–30 minutes by phone number + source).
- Confirm calendar/booking destination exists (or intentionally misconfigure for failure tests).

## 5) Deterministic Fallback Qualification Mode (LLM-safe)
Trigger deterministic mode when:
- LLM API error, timeout (>3–5s), or empty output
- Guardrails trip (unsafe content, tool failure)
- Message parsing uncertainty

### Fallback SMS script (exact questions)
**Message 1 (immediate):**
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—can I ask 3 quick questions to get you the fastest quote? Reply YES to continue.”

If YES or any positive response, proceed.

**Q1 (service type):**
“What service do you need? Reply 1) Repair 2) Install 3) Estimate 4) Other”

**Q2 (timing/urgency):**
“When do you need this? Reply 1) Today 2) This week 3) Flexible”

**Q3 (location readiness):**
“What’s the job ZIP code?”

**Booking / escalation rule:**
- If user provided service + timing + ZIP: 
  - If within business hours: “Perfect—here’s the fastest way to get on the schedule: {calendar_link}. Want the earliest available slot? Reply EARLIEST.”
  - If after-hours: “Thanks—our team is offline right now. We’ll text you first thing at {next_open_time}. If it’s urgent, reply URGENT.”

**Urgent after-hours behavior:**
- If URGENT: “Understood. If this is an emergency, call 911. Otherwise, reply with a brief description and we’ll prioritize you at open.”

**Timeouts / no response:**
- If no reply in 5 minutes: send one follow-up: “Just checking—do you still want help with this? Reply YES and I’ll get you scheduled.”
- If still no reply in 30 minutes: stop outreach.

## 6) Compliance Behaviors (STOP/HELP)
**STOP**: immediately stop messages, mark contact DNC, confirm with: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
**HELP**: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. To opt out, reply STOP.”

## 7) Test Matrix (What to Run)
Run each test case on at least **one** lead source; highest risk cases should be run on **all three** sources.

### A) Core happy path (all 3 sources)
1. Valid lead submitted with phone + name
2. First SMS sent <60s
3. Qualification completes (LLM or deterministic)
4. Calendar link delivered; booking success (if configured)

### B) Data quality
- **Missing phone**: ensure no SMS attempt; create CRM note/task “Missing phone—cannot text”; optional email to business.
- **Invalid phone** (e.g., 123, too short, wrong country): no SMS; log validation error; CRM note.

### C) Messaging compliance
- **STOP** response: ensure suppression + confirmation message.
- **HELP** response: ensure help message + support email.

### D) Routing / business hours
- **After-hours lead**: immediate acknowledgment + set expectation; no aggressive follow-ups overnight.

### E) Reliability and scale
- **Multiple concurrent leads** (5 submissions within 60 seconds): verify each gets correct personalization; no cross-talk.
- **Webhook retries** (re-send identical payload): should dedupe; no duplicate SMS.
- **Duplicate leads** (same phone new submission within dedupe window): should not re-blast; should append note.

### F) Downstream failures
- **Calendar link failure** (bad URL or booking API down): send fallback message: “Booking link is temporarily unavailable—reply with 2 times that work for you and we’ll confirm.” Create internal alert.
- **LLM failure/timeout**: deterministic flow activates; no blank/garbled messages.

### G) CRM formatting
- **HubSpot note formatting**: verify note is readable, includes timestamps, source, transcript snippet, and disposition.

## 8) Exact Payloads / Inputs
### 8.1 Generic Webhook JSON (example)
POST JSON:
{
  "source": "webhook_test",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15551234567",
  "email": "test@example.com",
  "service": "Estimate",
  "message": "Need a quote",
  "submitted_at": "<ISO-8601 timestamp>"
}
Variants:
- Missing phone: omit phone
- Invalid phone: "phone": "1234"
- Duplicate: resend same payload with same phone within 2 minutes

### 8.2 Jotform
Create a test form with fields: Name, Phone, Email, Service Needed (dropdown), Message.
- Submit with valid phone, then submit missing/invalid phone.
- Confirm the integration sends the correct mapping.

### 8.3 HubSpot
Create test contact(s) and trigger whichever event is used (new form submission, new contact, workflow enrollment).
- Verify the created note and any task/disposition updates.

## 9) Results Capture Tables
### 9.1 KPI timing table (copy/paste)
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/MissingPhone/STOP/etc.)
- Lead submitted timestamp (with timezone)
- Webhook received timestamp
- First SMS queued timestamp
- First SMS delivered timestamp (if available)
- First SMS body (first 120 chars)
- Result (PASS/FAIL)
- Notes / link to evidence

### 9.2 Conversation transcript table
- Trial #
- Inbound messages (lead)
- Outbound messages (system)
- STOP/HELP outcome (if applicable)
- Booking outcome

## 10) Bug Log Template (Churn-risk prioritized)
Fields:
- Bug ID
- Severity: P0 (churn/legal), P1 (revenue loss), P2 (annoying)
- Source(s) affected
- Repro steps
- Expected vs Actual
- Evidence (screenshots/log IDs)
- Suggested fix
- Owner + status

**Common P0/P1 to watch**
- SMS sent to invalid/missing phone (carrier errors spam logs)
- STOP not honored immediately
- >60s response consistently on any source
- Duplicate SMS on webhook retries
- Wrong lead gets wrong personalization (cross-thread)
- After-hours sends aggressive prompts

## 11) Pass/Fail Gates (Go/No-Go for pilot)
**GO** if:
- 90%+ trials meet <60s queued time (or <60s delivered if delivery data available)
- STOP/HELP works correctly in at least 3 attempts
- Dedupe works on webhook retries and duplicates
- Deterministic fallback produces coherent flow during forced LLM failure

**NO-GO** if:
- Any STOP failure
- Any cross-lead mix-up in concurrent leads
- Response time frequently >60s without clear external cause

## 12) How to Present Evidence to Agencies
Provide a single PDF or doc with:
- A table of 20 trials showing response times
- 2–3 transcript screenshots including STOP/HELP
- A short list of any known issues + mitigation (e.g., “If calendar down → manual scheduling SMS triggers”) 
- Business legitimacy references: website + support email above
