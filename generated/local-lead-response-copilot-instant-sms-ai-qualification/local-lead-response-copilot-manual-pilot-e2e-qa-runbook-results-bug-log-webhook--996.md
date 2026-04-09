# Local Lead Response Copilot — Manual Pilot E2E QA Runbook + Results + Bug Log (Webhook JSON + Jotform + HubSpot, <60s KPI, Fail-safes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:10:27.993Z

---

Business under test: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with partners: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email for pilots: agent_bob_replit+lead-copilot@agentmail.to

GOAL (pilot-ready, manual): Validate end-to-end lead intake → first SMS within 60 seconds across 3 lead sources AND confirm safe fallback behaviors (no LLM dependency) for reputation-critical edge cases.

SCOPE: 3 lead sources
1) Generic Webhook JSON (direct POST into ingestion endpoint)
2) Jotform (real form tool)
3) HubSpot (CRM source / CRM logging destination validation)

ONE KPI: First response time < 60 seconds
Definition: From “lead received by our server” timestamp to “first outbound SMS message successfully queued/sent” timestamp must be ≤ 60s. Optional secondary: handset delivery time.

TIMESTAMP CAPTURE (required for proof)
Capture these in the Results table for every test lead:
A. Lead Received Time (server): from ingestion logs or webhook request time (UTC recommended)
B. SMS Queued/Sent Time (provider/app log): time message is queued/sent
C. Handset Delivery Time (optional): time you see it arrive on test phone
Compute:
- T1 = B - A (must be ≤ 60s)
- T2 = C - A (nice to have)

TEST PHONES
Use at least two test numbers if possible (to test concurrency and STOP/HELP). If only one number is available, run concurrency tests with rapid sequential submissions and record behavior.

DETERMINISTIC FALLBACK (NO-LLM) — must always work
Trigger conditions (any): LLM timeout (>8s), LLM error, empty LLM output, content filter failure.
Fallback conversation goal: confirm intent + collect minimum booking info without sounding broken.

Fallback SMS Copy + Logic (exact)
Message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 3 quick questions to get you a fast quote?”
If YES / OK / Sure:
Q1: “What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
Valid replies: 1/2/3/4 or text → map to category.
Q2: “What’s your zip code?” (validate 5 digits; if not, ask again once)
Q3: “When would you like service? Reply 1) ASAP 2) This week 3) Just researching”
Then handoff:
- If calendar link is healthy: “Perfect—grab a time here: {{calendar_link}}. If you prefer, reply with 2 time windows and we’ll confirm.”
- If calendar link fails: “Our booking link is temporarily down—reply with 2 time windows that work today/tomorrow and we’ll confirm by text.”

Hard stops (compliance):
- STOP: Immediately stop all messaging; log opt-out; confirm one final message only: “You’re opted out and won’t receive texts. Reply HELP for info.”
- HELP: Provide support: “Help: This number sends appointment updates from {{business_name}}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

After-hours routing (safe + honest)
Define business hours per pilot (example 8am–6pm local).
If lead arrives after-hours:
Immediate SMS (still within 60s):
“Thanks—got it. We’re currently closed, but you’re in line for first thing tomorrow. What service is this for? (Repair/Install/Quote/Other)”
No auto-booking outside hours unless client explicitly wants 24/7.

LEAD SOURCE SETUP (manual)
A) Generic Webhook JSON
Minimum fields:
- lead_id (string)
- first_name (string)
- last_name (optional)
- phone (E.164 recommended)
- email (optional)
- source (e.g., “webhook”) 
- created_at (ISO) (optional)

Test payloads (ready to paste)
1. Valid:
{
  "lead_id": "qa-webhook-001",
  "first_name": "Jamie",
  "last_name": "QA",
  "phone": "+14155550101",
  "email": "jamie.qa@example.com",
  "source": "webhook",
  "service": "Repair",
  "zip": "94107"
}
2. Missing phone:
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "phone": "",
  "source": "webhook"
}
Expected: no SMS attempt; create CRM note “missing phone”; notify ops email.
3. Invalid phone:
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "123",
  "source": "webhook"
}
Expected: no SMS; mark invalid; request corrected phone if email exists.
4. Duplicate lead_id:
(send payload 1 again)
Expected: dedupe; do not send duplicate first SMS; CRM note indicates duplicate suppressed.
5. Retry simulation:
Send the same payload but with header like X-Retry-Count: 1 (or repeat within 30s)
Expected: idempotent; no extra SMS.

B) Jotform (real form tool)
Create “Lead Copilot QA Form” fields:
- First name (required)
- Last name (optional)
- Phone (required)
- Email (optional)
- Service needed (dropdown)
- Zip code
- Hidden: lead_id (set to unique ID if possible)
Create submissions:
- 5 normal
- 1 missing phone (if Jotform allows submit; otherwise simulate with webhook)
- 1 invalid phone
- 1 after-hours submission (change system clock or submit after hours)
- 1 duplicate (same phone + same lead_id)

C) HubSpot (CRM)
Purpose: confirm correct note formatting + dedupe markers + opt-out status recording.
Set up:
- Contacts enabled
- Properties (if possible): Lead ID, Lead Source
Expected behavior:
- On new lead: create/update contact
- Add Note/Activity with transcript + metadata (template below)

HUBSPOT NOTE FORMAT (strict template)
Title: “Lead Copilot Qualification — {{lead_id}} — {{source}}”
Body:
Lead:
- Name: {{first_name}} {{last_name}}
- Phone: {{phone}}
- Email: {{email}}
- Source: {{source}}
- Received At (UTC): {{received_at}}

Speed-to-Lead:
- First SMS Queued At (UTC): {{sms_sent_at}}
- SLA: {{"PASS" if <=60s else "FAIL"}} ({{delta_seconds}}s)

Conversation Transcript:
1) System: {{message_1}}
2) Lead: {{reply_1}}
3) System: {{q1}}
4) Lead: {{reply_2}}
...

Outcome:
- Qualification Path: {{LLM | FALLBACK}}
- Status: {{Booked | Needs follow-up | Opted-out | Invalid phone | After-hours queued}}
- Booking Link Used: {{url or "N/A"}}
- Next Step: {{human action if any}}

Compliance:
- STOP Received: {{Yes/No}} | Timestamp: {{ts if yes}}
- HELP Received: {{Yes/No}} | Timestamp: {{ts if yes}}

TEST CASES (execute + expected)
1) Normal lead (all sources)
Expected: first SMS within 60s; qualification Qs; booking link sent or time windows requested.
2) Missing phone
Expected: no SMS; CRM note “missing phone”; ops email alert.
3) Invalid phone
Expected: no SMS; CRM note; if email present, send email requesting correct phone.
4) STOP
Expected: immediate opt-out; no further messages; CRM note updates opt-out.
5) HELP
Expected: help info message; no sales pressure.
6) After-hours
Expected: immediate acknowledgement within 60s + queued follow-up; no aggressive booking.
7) Concurrent leads (5 rapid submissions)
Expected: all receive first SMS within 60s; no cross-talk; correct mapping to lead_id.
8) Calendar link failure
Expected: fallback to “reply with two time windows” and CRM note indicates booking link down.
9) Webhook retries
Expected: idempotent; no duplicate SMS.
10) Duplicate leads (same phone, same lead_id)
Expected: dedupe; note indicates duplicate suppressed.
11) CRM note formatting
Expected: exactly matches template; readable; includes SLA PASS/FAIL.

RESULTS TABLE (copy/paste)
| Test ID | Source | Lead ID | Scenario | Received (UTC) | SMS Sent (UTC) | Delta(s) | <60s Pass? | Delivery time (opt) | Notes |
|---|---|---|---|---|---|---:|---|---|---|
| 1 | Webhook | qa-webhook-001 | Normal |  |  |  |  |  |  |
| 2 | Webhook | qa-webhook-002 | Missing phone |  |  |  |  |  |  |
| 3 | Webhook | qa-webhook-003 | Invalid phone |  |  |  |  |  |  |
| 4 | Webhook | qa-webhook-001 | Duplicate lead_id |  |  |  |  |  |  |
| 5 | Jotform | qa-jf-001 | Normal |  |  |  |  |  |  |
| 6 | Jotform | qa-jf-002 | After-hours |  |  |  |  |  |  |
| 7 | HubSpot | qa-hs-001 | CRM note format check |  |  |  |  |  |  |

BUG LOG (copy/paste)
| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Logs/Screens | Proposed Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

KNOWN HIGH-RISK BUGS TO WATCH (first pilots)
- Phone normalization: non-E.164 numbers causing send failures.
- STOP/HELP handling: accidental follow-up after STOP.
- Dedupe: webhook retries or form resubmits sending multiple first messages.
- Concurrency: mixed transcripts between leads.
- Calendar downtime: dead link causing drop-offs; must offer two time windows.
- HubSpot note readability: missing SLA delta, messy transcript, or missing lead_id/source.

PASS CRITERIA
- At least 20 total test leads across the 3 sources.
- 95%+ of “normal” leads meet <60s (T1) and no P0 compliance failures.
- Fallback flow works and feels coherent when LLM fails (or is forced off).
- HubSpot notes consistently match the template and are agency-reporting friendly.
