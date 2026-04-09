# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:02:31.599Z

---

## Purpose (pre-revenue, pilot-ready)
This runbook validates end-to-end reliability for the first 1–3 pilots without building automated test infrastructure. It protects agency reputation by proving (1) first response <60 seconds and (2) safe deterministic behavior when the LLM or booking step fails.

Reference links for legitimacy in pilot comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

---
## Lead Sources Covered (3)
1) **Generic Webhook JSON** (baseline for any form/ads platform)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM sink + notes/logging verification)

---
## KPI to Prove
**KPI:** First outbound SMS is sent within **<60 seconds** of lead submission.

### What counts as “first response”
The first SMS sent to the lead’s phone number (or, if phone is missing/invalid, the first internal alert + CRM note created within 60 seconds).

### Timestamp capture (minimum)
Record these three timestamps for each test lead:
1. **T0 Lead Submitted**: time you click submit in form OR time webhook request is sent.
2. **T1 SMS Queued/Sent**: from provider logs (or app logs) when message is queued/sent.
3. **T2 Delivered to Handset** (optional but recommended): when the test phone receives the SMS.

**Pass rule:** (T1 − T0) < 60 seconds. If you only have T2, use (T2 − T0) and target <90 seconds while investigating carrier delay.

---
## Required Test Data (use consistent identities)
Use two test phones:
- Phone A: a real mobile number you can receive SMS on.
- Phone B: a second real mobile number for concurrency tests.

Use the following consistent lead identity fields:
- first_name: “Test”
- last_name: “Lead”
- email: test.lead+copilot@example.com
- service: “Plumbing” (or your pilot niche)
- zip: “94107”

Dedupe key recommendation for tests (document actual system behavior):
- Primary: (phone + source)
- Secondary: (email + source)
- Optional: external_lead_id from source payload

---
## Deterministic Fallback Qualification Flow (No-LLM)
Trigger this flow when:
- LLM errors, times out, returns empty output, or confidence flag is low.
- Any safety/compliance rule requires deterministic behavior.

### Opening SMS (always immediate)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the right time?”

### Q1 (Service urgency)
“Is this **urgent (today)** or **non-urgent**?”
- If “urgent/today/emergency”: tag = URGENT
- Else: tag = STANDARD

### Q2 (Job type)
“What do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”
- Map to standardized categories.

### Booking handoff
If calendar/booking link is healthy:
“Great—here’s the fastest way to get scheduled: {{calendar_link}}. If you prefer, reply with two times that work today/tomorrow.”

If calendar link fails/unavailable:
“Thanks—our booking link is temporarily down. Reply with **two times** that work and we’ll confirm ASAP.”

### Completion note
When lead gives times or books:
“Perfect—confirming now. If anything changes, reply HELP.”

---
## Compliance & Safety Behaviors (must-pass)
### STOP
If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”:
- Immediately mark opt-out.
- Reply once (if required by provider): “You’re unsubscribed. Reply HELP for help.”
- No further marketing/qualification messages.
- Add CRM note: Opt-out event + timestamp.

### HELP
If inbound contains “HELP”:
- Reply: “For help, contact us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- Add CRM note: HELP request + timestamp.

### After-hours
Define business hours for pilot (example): Mon–Fri 8am–6pm local.
If lead arrives after-hours:
- Still send immediate acknowledgement SMS (<60s):
  “Thanks {{first_name}}—we’re currently closed. We’ll text you first thing at {{next_open_time}}. If urgent, reply URGENT.”
- If reply URGENT, route to on-call (or send internal alert) per pilot policy.

---
## HubSpot CRM Note Formatting (strict template)
Create/append a note to the Contact record using this exact structure:

**[Lead Copilot Intake]**
- Source: {{source}} (Webhook/Jotform/HubSpot)
- External Lead ID: {{external_lead_id or ‘n/a’}}
- Submitted At (T0): {{timestamp}}
- First SMS Sent At (T1): {{timestamp}}
- First Response SLA: {{T1-T0}} seconds (PASS/FAIL)
- Phone: {{phone}} (valid/invalid/missing)
- Opt-out: {{yes/no}} (STOP at {{timestamp}} if yes)
- After-hours: {{yes/no}}
- Qualification Path: {{LLM or Deterministic Fallback}}
- Answers:
  - Urgency: {{urgent/standard/unknown}}
  - Job type: {{repair/install/quote/other}}
  - Preferred times: {{free text}}
- Booking:
  - Calendar link: {{ok/fail/not used}}
  - Outcome: {{booked / requested times / no response}}
- Transcript (most recent first):
  - {{timestamp}} Lead: “…”
  - {{timestamp}} Copilot: “…”

Pass criteria: note is readable, consistently formatted, includes SLA proof, and includes opt-out status.

---
## Test Cases (execute across 3 sources)
For each case: run via Webhook JSON + Jotform + verify HubSpot note.

### TC01 Normal lead (valid phone)
Input: valid phone A.
Expected:
- First SMS sent <60s.
- Qualification starts.
- HubSpot note created with PASS and transcript.

### TC02 Missing phone
Input: phone omitted.
Expected:
- No SMS attempt.
- Create internal alert (email/slack) + HubSpot note within 60s stating missing phone.

### TC03 Invalid phone
Input: “12345” or malformed.
Expected:
- Phone validation fails, no SMS sent.
- HubSpot note: invalid phone, include raw input.

### TC04 STOP
Steps: submit normal lead; reply “STOP”.
Expected:
- Immediate opt-out acknowledgement.
- No further questions.
- HubSpot note logs opt-out.

### TC05 HELP
Steps: submit normal lead; reply “HELP”.
Expected:
- HELP reply includes agent_bob_replit+lead-copilot@agentmail.to and STOP instructions.
- HubSpot note logs HELP.

### TC06 After-hours
Submit outside business hours.
Expected:
- Immediate after-hours acknowledgement (<60s).
- Next-open-time message.

### TC07 Multiple concurrent leads
Submit 5 leads rapidly (mix phone A/B).
Expected:
- No cross-talk between leads.
- All first SMS <60s.

### TC08 Calendar link failure
Simulate booking link down (use a broken link in config for test).
Expected:
- Message asks for two times instead of link.
- HubSpot note flags calendar fail.

### TC09 Webhook retries
Send same external_lead_id twice.
Expected:
- Deduped: no duplicate SMS storms.
- HubSpot note shows retry and dedupe action.

### TC10 Duplicate lead (same phone)
Submit same phone within 5 minutes.
Expected:
- Either merge into existing conversation OR send a single short acknowledgement without restarting full flow (document actual policy).

### TC11 CRM note formatting stress
Long transcript (10+ messages).
Expected:
- Note remains structured, no broken bullets, includes SLA line.

---
## Ready-to-paste Webhook JSON Payloads
Send as application/json.

1) Valid:
{ "external_lead_id": "qa-001", "source": "webhook", "first_name": "Test", "last_name": "Lead", "email": "test.lead+copilot@example.com", "phone": "+14155550101", "service": "Plumbing", "message": "Need a quote" }

2) Missing phone:
{ "external_lead_id": "qa-002", "source": "webhook", "first_name": "Test", "last_name": "Lead", "email": "test.lead+copilot@example.com", "service": "Plumbing", "message": "Call me" }

3) Invalid phone:
{ "external_lead_id": "qa-003", "source": "webhook", "first_name": "Test", "last_name": "Lead", "email": "test.lead+copilot@example.com", "phone": "12345", "service": "Plumbing", "message": "Leak" }

4) Retry (same ID as qa-001):
{ "external_lead_id": "qa-001", "source": "webhook", "first_name": "Test", "last_name": "Lead", "email": "test.lead+copilot@example.com", "phone": "+14155550101", "service": "Plumbing", "message": "Need a quote (retry)" }

---
## Results Table (fill during execution)
Columns:
- Case ID | Source (Webhook/Jotform/HubSpot) | external_lead_id | Phone | T0 submitted | T1 SMS sent | SLA sec | PASS/FAIL | Notes/Bug link

Target: at least **20 total runs** across sources, with at least 1 run per edge case above.

---
## Bug / Fix Log Template
For each issue:
- Bug ID
- Severity (P0 churn-risk, P1 high, P2)
- Source (Webhook/Jotform/HubSpot)
- Steps to reproduce
- Expected vs actual
- Evidence (screenshots/log timestamps)
- Suspected root cause
- Proposed smallest fix/workaround (config first)
- Re-test date + result

---
## Definition of “Verified” for agencies
We can claim “<60s speed-to-lead” when:
- 20+ test leads show (T1 − T0) <60s with no P0 compliance failures (STOP/HELP) and no SMS storms from retries/duplicates.
- Deterministic fallback flow successfully handles at least one forced LLM failure and still routes to booking or manual scheduling.
