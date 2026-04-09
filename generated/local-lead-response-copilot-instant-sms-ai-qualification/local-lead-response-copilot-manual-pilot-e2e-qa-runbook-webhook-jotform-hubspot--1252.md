# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:16:09.116Z

---

Overview
This runbook is designed for the first 1–3 paid pilots to protect reputation (agencies) while staying lean (manual, no automation suite). It validates (1) <60s first response time and (2) safe, deterministic behavior when the LLM fails. Use this during onboarding and again after any integration change.

Product context & legitimacy references (include in any customer comms)
- Website (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Lead sources covered (minimum 3)
1) Generic Webhook JSON (direct POST into our intake endpoint)
2) Jotform (real form tool): submit -> webhook/Zapier/native integration -> our intake
3) HubSpot (CRM): new contact / form submission / workflow action -> webhook/integration -> our intake; and our system writes back notes to HubSpot

Core KPI to prove
- First response time < 60 seconds (lead submission time -> first SMS delivered to handset).
Notes:
- “Delivered” is preferred; “sent” is acceptable only if carrier delivery timestamp cannot be observed.
- Record all three if possible: Received (server), SMS queued/sent (provider), Delivered (handset).

Prerequisites (operator checklist)
- Test phone numbers:
  - One real mobile number you control for receiving SMS (Number A)
  - A second real mobile number for concurrency tests (Number B)
- Ability to set “business hours” in the product/config for after-hours tests
- Access to SMS logs (provider console) OR internal logs showing send timestamps
- HubSpot test portal access (free) for verifying notes/formatting
- Jotform test form (free) configured to send leads to the product

Timing capture method (required for KPI proof)
For each test submission, record:
1) Lead submit timestamp (T0):
   - Webhook: curl start time and/or request log timestamp
   - Jotform: submission timestamp in Jotform
   - HubSpot: form submission timestamp / contact create timestamp
2) Product received timestamp (T1): from server logs/event log (if available). If not available, use submit time.
3) SMS sent/queued timestamp (T2): from SMS provider message log or product event log.
4) SMS delivered timestamp (T3): phone screenshot with time OR provider delivery receipt.
Compute:
- Response time (submit->delivered) = T3 - T0
- Response time (received->sent) = T2 - T1
Target:
- T3 - T0 <= 60s for >= 19/20 leads (95%) during pilot; any miss requires a mitigation note.

Deterministic fallback qualification flow (no-LLM)
Trigger conditions
- LLM call fails (timeout, error, rate limit) OR response exceeds time budget (e.g., 3 seconds) OR the model returns empty/unsafe output.
Principle: deterministic questions, fixed branching, minimal data collection, compliant STOP/HELP.

Message templates (exact text)
Message 0 (immediate first response; must be sent instantly)
“Hi {{first_name}}, it’s {{business_name}}. Got your request — what do you need help with?
1) Quote/estimate
2) Schedule service
3) Not sure”

If user replies 1:
“Thanks — what’s the service type?
A) Repair
B) Install/Replace
C) Other (reply with a few words)”

If user replies 2:
“Great — what day works best?
1) Today
2) Tomorrow
3) This week”

If user replies 3:
“No problem — reply with a short description (1 sentence) of what’s going on.”

Collect location (if needed for routing) after the above:
“Thanks. What’s the service ZIP code?”

Booking handoff (if calendar available)
“Perfect. Here’s the quickest way to book: {{calendar_link}}. If you prefer, reply with two times that work and we’ll confirm.”

Booking handoff (if calendar unavailable)
“Thanks — our booking link is temporarily down. Reply with two times that work today/tomorrow and we’ll confirm by text.”

STOP compliance (always)
If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
Send: “You’re opted out and won’t receive more texts. Reply HELP for help.”
Set contact status = Opted Out; do not send further messages.

HELP compliance
If inbound contains “HELP”:
Send: “Help: This is {{business_name}} appointment/quote texting. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

After-hours behavior
If outside business hours:
Immediate first response still required (<60s), but content changes:
“Hi {{first_name}} — thanks for reaching out to {{business_name}}. We’re currently closed. Reply with what you need and we’ll follow up first thing at {{next_open_time}}. Reply STOP to opt out.”
Then queue internal follow-up task for open hours.

Fail-safe behavior matrix (expected outcomes)
1) Missing phone
- Expected: Do not attempt SMS. Create CRM note “Missing phone” and mark lead as “Needs phone”. If email exists, send an email requesting a phone number.
2) Invalid phone (too short, non-numeric, fails E.164)
- Expected: Same as missing phone; never send SMS to invalid numbers.
3) STOP
- Expected: Immediately opt out; no further SMS; CRM note includes opt-out timestamp.
4) HELP
- Expected: Send help template; do not opt out.
5) After-hours
- Expected: Still send first SMS within 60s; set follow-up for next open.
6) Multiple concurrent leads (5+ in 60 seconds)
- Expected: Each gets first SMS within 60s; no cross-talk (thread isolation) and correct CRM association.
7) Calendar link failures
- Expected: Use “calendar unavailable” deterministic text and collect 2 preferred times.
8) Webhook retries
- Expected: Idempotent handling: same lead_id (or same source+source_id) should not trigger duplicate SMS within dedupe window (default 24h). Log “duplicate suppressed”.
9) Duplicate leads (same phone, new payload)
- Expected: If within dedupe window and status active, do not send first message again; append CRM note “Duplicate lead received” with payload summary.
10) CRM note formatting
- Expected: Notes are readable, consistent, and include timestamps, message transcript, and outcomes.

HubSpot note formatting standard (copy/paste spec)
Title: “Lead Copilot Conversation — {{lead_id}} — {{status}}”
Body:
Lead Copilot Summary
- Lead ID: {{lead_id}}
- Source: {{source}} (Jotform/HubSpot/Webhook)
- Received: {{received_at}}
- First SMS sent: {{sms_sent_at}}
- First SMS delivered: {{sms_delivered_at}} (if available)
- Response time: {{seconds}}s
- Opt-out: {{yes/no}} ({{timestamp_if_yes}})
- After-hours: {{yes/no}}
- Booking outcome: {{booked/not_booked/pending}}
- Booking link: {{calendar_link_or_none}}

Transcript (most recent last)
{{timestamp}} IN: {{message}}
{{timestamp}} OUT: {{message}}
...

Lead details
- Name: {{name}}
- Phone: {{phone}}
- Email: {{email}}
- Service/Intent: {{intent}}
- ZIP/Location: {{zip}}

Manual test cases (execute across 3 lead sources)
Run at least 20 total submissions (recommended distribution):
- Webhook JSON: 8
- Jotform: 6
- HubSpot: 6
Include the edge cases below.

A) Generic Webhook JSON — ready-to-send payloads
Assume endpoint: POST {{INTAKE_URL}} (operator fills).
Headers: Content-Type: application/json

A1 Valid lead
{
  "lead_id": "wh_001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+1XXXXXXXXXX",
  "email": "test+wh001@example.com",
  "service": "estimate",
  "submitted_at": "{{iso_timestamp}}"
}
Expected: First SMS within 60s, normal qualification begins.

A2 Missing phone
{
  "lead_id": "wh_002",
  "source": "webhook",
  "first_name": "NoPhone",
  "email": "test+wh002@example.com",
  "service": "estimate",
  "submitted_at": "{{iso_timestamp}}"
}
Expected: No SMS attempt. CRM note/lead status indicates missing phone.

A3 Invalid phone
{
  "lead_id": "wh_003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "1234ABCD",
  "email": "test+wh003@example.com",
  "submitted_at": "{{iso_timestamp}}"
}
Expected: No SMS attempt. Invalid phone logged.

A4 Duplicate lead_id (send A1 again)
Expected: No duplicate SMS; dedupe log entry.

A5 Retry simulation (same payload re-sent 3x)
Expected: idempotent; only first attempt triggers messaging.

B) Jotform tests
Setup
- Create form with fields: First name, Last name, Phone, Email, Service needed, ZIP.
- Configure integration to send on submit.
Test cases
B1 Normal submission (Number A)
B2 Missing phone (leave blank)
B3 Invalid phone (non-numeric)
B4 After-hours submission
B5 Duplicate submission (same phone within 5 minutes)
B6 Concurrency: submit twice quickly from different devices
Expected: matches matrix; CRM note created if integrated.

C) HubSpot tests
Setup
- Create a test pipeline or at minimum a Contact property set.
- Ensure our system can write a Note to the Contact record.
Test cases
C1 New contact with valid phone triggers SMS
C2 Update existing contact (same phone) does NOT retrigger within dedupe window
C3 STOP inbound from Number A after initial message
C4 HELP inbound
C5 Calendar link failure path (simulate by disabling link)
C6 CRM note formatting check (verify Title/Body structure exactly)

STOP/HELP execution steps (for any source)
1) Trigger a normal lead to Number A.
2) Reply “HELP”. Confirm help message and no opt-out.
3) Reply “STOP”. Confirm opt-out message and that further messages are blocked.
4) Re-trigger same lead. Confirm no SMS is sent.

Concurrency execution steps
1) Submit 5 leads in <60 seconds (mix Webhook and Jotform) targeting Number A and Number B.
2) Confirm each lead received its own first response within 60 seconds.
3) Confirm transcripts are isolated and CRM notes attach to correct lead/contact.

Results table (fill during pilot; copy into a sheet)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 Submit
- T1 Received
- T2 SMS Sent
- T3 SMS Delivered
- Response time (T3-T0)
- Pass/Fail
- Notes (screenshots/links)

Bug/fix log template (use during execution)
For each issue capture:
- Bug ID
- Severity (S0 revenue-blocking, S1 compliance risk, S2 conversion-impacting, S3 cosmetic)
- Source/scenario
- Steps to reproduce
- Expected vs actual
- Evidence (timestamps, screenshots, logs)
- Suggested smallest fix/workaround (config first)

Common high-risk bugs to watch for (triage order)
1) Compliance: STOP not respected (S1)
2) Duplicate SMS on retries/duplicates (S1/S2)
3) First response >60s intermittently (S2)
4) Wrong lead/contact association in HubSpot (S2)
5) Calendar failure causes dead-end (S2)
6) LLM failure causes no response (S2) — must always fall back deterministically

Verification statement (to complete after running)
After executing 20 submissions, summarize:
- Total tests run:
- # within 60s delivered:
- Worst response time:
- Any compliance incidents (STOP/HELP):
- Any duplicates observed:
- Confirmed deterministic fallback works when LLM fails:
- HubSpot note format verified (Y/N):

Owner/operator note
This runbook is intentionally manual to keep focus on distribution and first revenue. Once 2+ paying customers are stable, convert the highest-risk cases (STOP, duplicates, retries, after-hours) into lightweight automated regression checks.