# Local Lead Response Copilot — Manual Pilot QA Runbook (3 Lead Sources, <60s KPI, Fail-safes, HubSpot Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:38:48.429Z

---

## Purpose
Validate end-to-end reliability for early pilots (1–3 customers) without building automated e2e tests yet. Goal: protect agency reputation by proving first response <60s and safe behavior under common failure modes.

**Business proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support email:** agent_bob_replit+lead-copilot@agentmail.to

## Scope: 3 Lead Sources
1) **Generic Webhook JSON** (POST into our intake endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM source: new contact / form submission / workflow action)

## KPI
**First outbound SMS initiated within 60 seconds** of lead receipt.
Record three timestamps:
- T0 = Lead received by our server (or webhook request time)
- T1 = SMS send requested (provider API call initiated)
- T2 = SMS delivered to handset (if delivery receipts available; otherwise time received on test phone)
Pass criteria: **T1 - T0 <= 60s** for 95%+ of test submissions.

## Deterministic No-LLM Fallback Qualification Flow (must work even if LLM is down)
Trigger fallback when: LLM timeout (>5s), LLM error, or model returns empty/unsafe content.

**SMS #1 (immediate):**
“Hi {first_name}, it’s {business_name}. Thanks for reaching out about {service}. I can help—what’s the job address (city/zip)?”

If user replies with location:
**SMS #2:**
“Got it. What type of help do you need? Reply 1) Repair 2) Install/Replace 3) Quote/Other”

Branch:
- If 1: “Thanks—what’s the issue and when did it start?”
- If 2: “Thanks—what are you looking to install/replace?”
- If 3: “Please describe what you need in 1 sentence.”

**SMS #3 (booking handoff):**
“Perfect. To get you on the schedule, pick a time here: {calendar_link}. If you’d rather text, reply with 2–3 times that work today/tomorrow.”

**After-hours rule (local business hours configurable):**
If lead arrives outside hours, still send **SMS #1 immediately**, then add:
“FYI we’re currently closed—someone will confirm first thing at {next_open_time}. If urgent, reply URGENT.”

**STOP/HELP compliance (always overrides flows):**
- If inbound contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT: immediately mark opted-out, stop all messages, write CRM note “Opt-out received: STOP”.
- If inbound contains HELP: respond once: “You’re receiving texts from {business_name} about your request. Reply STOP to unsubscribe. Support: agent_bob_replit+lead-copilot@agentmail.to”

## Fail-safe Behavior Matrix (Expected)
- Missing phone: do not SMS; create lead with status “Needs Phone”; notify internal (email/Slack) if available.
- Invalid phone: do not SMS; mark “Invalid Phone”; store raw value for follow-up.
- Duplicate lead (same external_id or same phone+source within 10 min): dedupe; do not spam; append CRM note “Duplicate suppressed”.
- Webhook retries: idempotent handling using request_id/external_id.
- Calendar link failure: send alternate: “Our booking link is temporarily down—reply with 2–3 times that work and we’ll confirm.”
- Multiple concurrent leads: no cross-talk; each conversation keyed by phone + lead_id.

## Test Execution: 20-Lead Manual Pass
Use 2 test phones (or one phone + one Google Voice) to simulate concurrency.

### A) Generic Webhook JSON (10 tests)
For each test, capture T0/T1/T2 and paste transcript.

**Payload template (valid):**
{
  "external_id": "webhook-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Plumbing",
  "message": "Need a quote for a leaking faucet",
  "submitted_at": "2026-04-09T12:00:00Z"
}

**Edge payloads:**
1) Missing phone:
{ "external_id":"webhook-002","source":"webhook","first_name":"NoPhone","service":"HVAC" }
Expected: no SMS; lead stored; internal alert.

2) Invalid phone:
{ "external_id":"webhook-003","source":"webhook","first_name":"BadPhone","phone":"123","service":"Roofing" }
Expected: no SMS; marked invalid.

3) Duplicate lead id:
Send webhook-001 again.
Expected: dedupe; no second SMS; CRM note “Duplicate suppressed”.

4) Retry simulation:
Send same payload with header/request_id identical.
Expected: idempotent; no duplicate SMS.

5) After-hours:
Submit outside business hours.
Expected: immediate SMS with after-hours message.

6) STOP/HELP:
After receiving SMS #1, reply STOP then submit another lead from same phone.
Expected: no more SMS; opt-out persists.

### B) Jotform (5 tests)
Create a simple form: First name, Phone, Service dropdown, Free-text “What do you need?”.
Tests:
1) Normal submission
2) Missing phone (leave blank)
3) Invalid phone (letters)
4) Duplicate submission (same phone twice)
5) After-hours
Expected behaviors per matrix above.

### C) HubSpot (5 tests)
Trigger via: new Contact created or HubSpot form submission.
Tests:
1) Normal contact with mobile phone
2) Missing phone
3) Invalid phone format
4) Duplicate contact (same phone)
5) Calendar link failure simulation (force calendar_link empty)

## HubSpot CRM Note Formatting (must be consistent)
Create/append a note with this exact structure:

Title: “Lead Copilot SMS Qualification — {source} — {status}”
Body:
- Lead ID: {lead_id} | External ID: {external_id}
- Source: {source} | Submitted: {submitted_at}
- Name: {first_name} {last_name}
- Phone: {phone} | Email: {email}
- Service: {service}
- Speed-to-lead: T1-T0 = {seconds}s (T0 {iso}, T1 {iso})
- Opt-out: {true/false}
- After-hours: {true/false}
- Booking: {booked/attempted/failed} | Link: {calendar_link}
- Transcript:
  1) OUT: “...”
  2) IN: “...”
  3) OUT: “...”
  ...

## Results Table (fill during execution)
Columns: Test # | Source | Scenario | T0 | T1 | T2 | T1-T0 (s) | Pass/Fail | Notes/Bug link

## Bug Log Template
- Bug ID:
- Title:
- Severity (P0 spam/compliance, P1 KPI, P2 formatting, P3 cosmetic):
- Source (Webhook/Jotform/HubSpot):
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (timestamps, screenshots, transcript):
- Suggested fix/workaround:

## Definition of Done for First Pilots
- 20 test leads executed across 3 sources
- 95%+ of cases have T1-T0 <= 60 seconds
- STOP/HELP works 100% of the time
- Dedupe prevents double-texting
- HubSpot notes are readable and standardized
- Deterministic fallback flow verified by forcing LLM failure (timeout) and confirming safe scripted questions
