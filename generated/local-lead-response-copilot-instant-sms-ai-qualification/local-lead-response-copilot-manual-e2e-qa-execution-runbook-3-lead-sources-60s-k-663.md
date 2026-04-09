# Local Lead Response Copilot — Manual E2E QA Execution Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:52:00.598Z

---

## Scope (pilot stage, no automation)
Goal: validate end-to-end behavior across 3 lead sources and prove the first SMS response happens in <60s, while ensuring fail-safe behaviors when the LLM or integrations fail.
Lead Sources Covered:
1) Generic Webhook JSON (simulates any ads/forms)
2) Jotform (real form tool, free tier)
3) HubSpot (CRM, free tier)

Business legitimacy links (use in any customer-facing messages):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---
## Global Acceptance Criteria
A. Response-time KPI
- P0 pass: first outbound SMS is sent within 60 seconds of lead receipt for >= 19/20 trials.
- P1 pass: median <30s.
Evidence required each trial: (1) lead-received timestamp, (2) first-SMS-sent timestamp, (3) screenshot/log line for both.

B. Safety/compliance
- STOP: system immediately confirms opt-out and stops further messages.
- HELP: system responds with brief assistance + business contact email.
- Missing/invalid phone: no SMS attempt; lead is logged; human follow-up route triggered.
- After-hours: message acknowledges receipt and offers next-available scheduling / “we’ll reach out at X”.

C. Reliability
- Retries: webhook retries must not spam the lead (dedupe).
- Duplicate leads: same lead within dedupe window results in one active conversation and one CRM thread.
- Concurrency: burst of 10 leads should not cross-contaminate conversations.
- Calendar link failure: system offers fallback (manual booking link or “reply with preferred time”) and creates a task.
- LLM failure/timeout: deterministic question flow activates within 5 seconds of failure detection; continues qualification.

---
## Evidence Capture Setup (required)
Use a single Results table (below). For every test:
1) Record “Lead Submitted” timestamp (from source: webhook request time / Jotform submission time / HubSpot create time)
2) Record “First SMS Sent” timestamp (from app logs/Twilio message log)
3) Compute delta seconds
4) Capture evidence: screenshot of source submission + screenshot/log of SMS sent.

Results Table Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (normal/missing phone/etc.)
- Lead Submitted (ISO time)
- First SMS Sent (ISO time)
- Delta (sec)
- Pass/Fail
- Evidence links (screenshots/log IDs)
- Notes

---
## Deterministic Fallback Qualification Flow (LLM down / timeout)
Trigger conditions:
- LLM returns error OR no response within 4 seconds OR confidence < threshold (if available).
Behavior: switch to deterministic script and stop calling LLM for the remainder of the conversation (or for 15 minutes).

SMS Copy + Branching (exact text)
1) Initial message (sent immediately on lead receipt):
"Hi {{first_name}}, it’s {{business_name}}. Quick question so we can help fast—what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other"

2) If reply = 1/2/3/4 (or free text):
"Got it. What’s your ZIP code?"

3) ZIP collected:
"Thanks. What’s the best day/time for us to call you? Reply with a time window (e.g., ‘today 2-4pm’)."

4) Time window collected:
If calendar integration OK:
"Perfect—here’s a link to lock it in: {{calendar_link}}. If that link doesn’t work, just reply with your preferred time and we’ll confirm by text."
If calendar integration fails:
"Thanks. Our booking link is temporarily down—reply with your preferred time and we’ll confirm by text."

5) Escalation rule:
- If user gives time window: create internal task “Confirm appointment” + add CRM note with service/ZIP/time.
- If user is unresponsive for 15 minutes: send one nudge:
"Just checking—what time works best for a quick call? You can also email us at agent_bob_replit+lead-copilot@agentmail.to."

STOP/HELP handling (always-on, overrides everything)
- If inbound contains “STOP”: respond:
"You’re opted out and will no longer receive texts."
Then set contact do-not-text = true.
- If inbound contains “HELP”: respond:
"For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out."

---
## Lead Source 1: Generic Webhook JSON (E2E)
Pre-req: webhook endpoint URL in app (e.g., https://app.../webhook/lead). If unknown, leave placeholder and fill at pilot.

Test Payloads (ready to paste)
1) Normal lead (valid phone)
POST JSON:
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+14155550101",
  "email": "test.webhook@example.com",
  "source": "webhook",
  "service": "Quote",
  "created_at": "{{now}}"
}
Expected:
- First SMS within 60s.
- CRM note created (if connected) with normalized fields.

2) Missing phone
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "source": "webhook"
}
Expected:
- No SMS attempt.
- Lead logged with error “missing phone”.
- Human follow-up route/task created.

3) Invalid phone
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "12345",
  "source": "webhook"
}
Expected:
- Validation fails; no SMS.
- Logged with reason.

4) Duplicate lead (same lead_id)
Send payload #1 twice within 2 minutes.
Expected:
- Only one SMS conversation started.
- Second attempt logged as duplicate; no extra initial SMS.

5) Webhook retries (simulate 3 retries)
Send same payload 3 times with identical lead_id and same phone.
Expected:
- No SMS spam.
- One CRM thread.

6) Concurrency burst
Send 10 unique leads within 30 seconds (qa-webhook-010 to 019) with different phones.
Expected:
- No cross-talk (each phone receives its own context).
- Response times remain <60s.

Evidence to collect:
- Request timestamps (Postman/curl output)
- App receive log line (if available)
- Twilio message log entry time

---
## Lead Source 2: Jotform (real form tool)
Setup (free):
1) Create Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP.
2) In Jotform Settings → Integrations/Webhooks: add webhook URL to Copilot lead endpoint.
3) Submit form yourself with test phone(s).

Test Cases:
- Normal submission: valid phone
- Missing phone: omit phone field (or submit blank)
- Invalid phone: “12345”
- After-hours: submit outside business hours window (or temporarily set hours to simulate)
- Duplicate: resubmit same values (ensure lead_id mapping is consistent; if Jotform lacks stable lead_id, dedupe on phone+time window)

Expected:
- First SMS <60s.
- If missing/invalid phone: no SMS; logged; follow-up task.

Evidence:
- Jotform submission timestamp screenshot
- Twilio/app timestamp screenshot

---
## Lead Source 3: HubSpot (CRM)
Goal: ensure CRM note formatting + no duplication + correct association.
Setup (free):
- Create a test contact list.
- Create contacts manually or via import to simulate “new lead”.
- If using HubSpot workflow/webhook: trigger Copilot on “Contact created” or “Form submission”. If not available on free tier, simulate by sending webhook payload shaped like HubSpot contact.

HubSpot-shaped payload example:
{
  "lead_id": "hs-qa-001",
  "first_name": "Test",
  "last_name": "HubSpot",
  "phone": "+14155550102",
  "email": "test.hubspot@example.com",
  "source": "hubspot",
  "hubspot_contact_id": "123456",
  "created_at": "{{now}}"
}

Expected HubSpot Note Format (verify exact formatting):
Title: “Lead Copilot SMS Qualification — Started”
Body:
- Source: {{source}}
- Lead ID: {{lead_id}}
- Phone: {{E164_phone}}
- First response sent at: {{timestamp}}
- Status: {{qualified/unqualified/pending}}
- Transcript (latest first):
  [{{time}}] Copilot: …
  [{{time}}] Lead: …
- Next step: {{booked_call / needs_manual_followup / opted_out}}

Test Cases:
- Normal: contact created triggers SMS.
- Duplicate: same contact updated triggers should not restart.
- STOP: lead replies STOP; verify HubSpot note appended “Opted out at {{time}}”.

---
## Special Scenarios (run across at least one source each)
1) STOP compliance
- After initial SMS, reply “STOP”.
Expected: immediate opt-out confirmation + no further messages.

2) HELP
- Reply “HELP”.
Expected: helpful response + email agent_bob_replit+lead-copilot@agentmail.to.

3) After-hours routing
- Submit lead when “closed”.
Expected: after-hours template + no aggressive booking.

4) Calendar link failure
- Temporarily break calendar URL (or simulate failure).
Expected: fallback message + create task in CRM.

5) LLM failure
- Force LLM error (disable key / simulate timeout).
Expected: deterministic script begins; no dead-air; still collects service/ZIP/time.

---
## Bug Log (what to record)
For each issue:
- Severity (P0 revenue/churn, P1 major, P2 minor)
- Source + Scenario
- Repro steps
- Expected vs Actual
- Evidence (screenshots/log IDs)
- Suspected cause
- Recommended fix

High-priority bugs to watch:
- Any first response >60s
- Any STOP not honored immediately
- Any duplicate SMS spam due to retries
- Any conversation context leakage across leads
- Any CRM note missing timestamps/transcript

---
## How to Declare “Verified <60s First Response”
You may claim verification only when:
- 20 total trials completed
- >= 19/20 have delta <= 60s
- Evidence stored for each trial (source timestamp + SMS sent timestamp)
- Any failure has a documented root cause hypothesis + fix owner

End of runbook.