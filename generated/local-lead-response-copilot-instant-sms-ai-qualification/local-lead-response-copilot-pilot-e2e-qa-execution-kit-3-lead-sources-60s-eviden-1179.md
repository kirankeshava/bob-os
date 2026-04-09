# Local Lead Response Copilot — Pilot E2E QA Execution Kit (3 Lead Sources) + <60s Evidence + Deterministic Fallback Script

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:11:18.851Z

---

Business reference (use in any customer-facing comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

Goal
Prove “first response in <60 seconds” across 3 lead sources and validate fail-safe behaviors that protect agency reputation: missing/invalid phone, STOP/HELP, after-hours, concurrency, calendar link failures, webhook retries, duplicate leads, and CRM note formatting.

Lead Sources Covered
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot (CRM)

Evidence Standard (to credibly claim <60s)
For each trial, capture:
- T0 = lead created time (form submit time / webhook request time / CRM create time)
- T1 = first outbound SMS queued time (server log or provider log)
- T2 = first outbound SMS delivered time (provider delivery event if available)
Pass threshold:
- KPI: T1 - T0 <= 60 seconds for 95% of trials (20-trial minimum), and worst-case <= 120 seconds.
Store evidence:
- Screenshot or export of webhook request timestamps
- Screenshot of messaging logs showing first outbound time
- Transcript of the conversation for STOP/HELP and fallback-mode cases

Sample Size
- Minimum 20 total trials: at least 6 per source + 2 multi-lead concurrency trials.
- Include at least 1 trial per negative scenario below.

Preflight Checklist (do before any trials)
- Confirm sending number is configured and message logs are accessible.
- Confirm after-hours window (e.g., 6pm–8am local) is set.
- Confirm dedupe rule exists (recommended: same phone + same lead source within 10 minutes).
- Confirm “LLM timeout/error” triggers deterministic mode (details below).
- Confirm calendar link is configured for normal hours; also prepare a known-bad link to simulate failure.

Test Data Set
Use these phone numbers / cases (replace with permitted test numbers in your SMS provider):
A) Valid US mobile: +14155550101
B) Another valid: +14155550102
C) Invalid length: +1415555
D) Missing phone: null / empty string
E) Duplicate lead: re-send A within 2 minutes
F) STOP compliance: reply STOP from A
G) HELP compliance: reply HELP from B

Generic Webhook JSON — Copy/Paste Payloads
1) Happy path payload
POST /webhook/leads (endpoint as implemented)
Content-Type: application/json
{
  "source": "webhook",
  "lead_id": "whk-001",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550101",
  "email": "jamie.lee@example.com",
  "service": "water heater repair",
  "zip": "94107",
  "notes": "Leaking tank, wants estimate today",
  "created_at": "<ISO timestamp>"
}
Expected:
- If within business hours: first SMS starts within 60s.
- If outside business hours: sends after-hours message (see script) within 60s.
- CRM note (if enabled) includes source, service, and transcript markers (format below).

2) Missing phone payload
{
  "source": "webhook",
  "lead_id": "whk-002",
  "first_name": "Taylor",
  "phone": "",
  "service": "roof leak",
  "created_at": "<ISO timestamp>"
}
Expected:
- No SMS attempt.
- Internal alert/flag created (email/CRM task) indicating lead missing phone.
- Lead still stored with error status.

3) Invalid phone payload
{
  "source": "webhook",
  "lead_id": "whk-003",
  "first_name": "Morgan",
  "phone": "+1415555",
  "service": "HVAC tune-up",
  "created_at": "<ISO timestamp>"
}
Expected:
- No SMS attempt.
- Error status recorded; optionally request phone via email if available.

4) Duplicate lead payload (same phone within 10 minutes)
Send whk-001 again with a new lead_id (whk-001b) and same phone.
Expected:
- Dedupe suppresses a second conversation start.
- CRM note indicates “Duplicate suppressed” with reference to original lead.

Jotform Setup (real form tool)
Create a Jotform with these fields (minimum):
- Name (first/last)
- Phone
- Email
- Dropdown: Service Needed (e.g., Plumbing, HVAC, Roofing)
- Preferred time (ASAP / Today / This week)
- Consent checkbox: “I agree to receive texts about my request.”
Configure submission to POST to our webhook endpoint.
Run 6 submissions:
- 4 valid phones, 1 missing phone, 1 invalid phone.
Expected:
- Same as webhook cases, with source set to “jotform” and form_id captured.

HubSpot (CRM) Test
Goal: verify CRM note formatting and ensure retries/deduping don’t spam notes.
Setup:
- Create a test pipeline/stage or a custom property “Lead Source”.
- Configure integration to create/update a Contact and attach a Note/Engagement.
Run:
- Create 4 contacts (two unique, one duplicate, one missing phone) via integration path.
Expected:
- Contact created/updated correctly.
- Note formatting matches the spec below.
- Duplicate lead doesn’t create a second conversation note within the dedupe window.

High-Risk Scenario Tests (Pass/Fail)
1) STOP compliance
Steps:
- Trigger a valid lead.
- From the lead phone, reply “STOP”.
Expected:
- Immediate confirmation (carrier/system standard OK).
- No further messages to that number (even if a new lead arrives) unless re-consented.
Fail if:
- Any outbound after STOP.

2) HELP handling
Steps: Reply “HELP”.
Expected:
- Provide business identification and contact: “Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”.

3) After-hours
Steps: Submit lead outside hours.
Expected:
- After-hours first SMS within 60s; no booking push unless configured; offer next-day scheduling.

4) Multiple concurrent leads
Steps: Submit 3 leads within 10 seconds (different phones).
Expected:
- All receive first SMS within 60s.
- No cross-talk (messages stay within each thread).

5) Calendar link failure
Steps:
- Configure booking link to known-bad URL or simulate 500.
Expected:
- User receives alternate CTA: “We’re having trouble with the calendar link—what time works for you?”
- Escalation to human if no resolution within 2 turns.

6) Webhook retries
Steps:
- Send identical webhook payload 3 times (same lead_id).
Expected:
- Idempotent handling: only one conversation started.
- Log indicates duplicate request ignored.

7) CRM note formatting
Expected HubSpot note template (exact):
Title: “Lead Copilot Qualification — <FirstName> <LastName> (<Phone>)”
Body (markdown-like text acceptable):
- Source: <webhook|jotform|hubspot>
- Lead ID: <id>
- Service: <service>
- Timing: T0=<...> T1=<...> (first SMS queued)
- Status: <Qualified|Unqualified|After-hours pending|Stopped>
- Answers:
  Q1 (<question>): <answer>
  Q2 (<question>): <answer>
  Q3 (<question>): <answer>
- Booking:
  <Booked link/time OR “Not booked” + reason>
- Transcript (last 6 messages max):
  Lead: ...
  System: ...

Deterministic Fallback Qualification Flow (Non-LLM Safe Mode)
Trigger deterministic mode when:
- LLM request fails OR times out (>3s) OR returns empty output.
- Any downstream service (calendar/CRM) errors twice.
General rules:
- Max 3 questions before escalation.
- If user is unresponsive for 10 minutes: send one follow-up, then stop.
- Always honor STOP immediately.

Message 1 (sent immediately on lead receipt)
“Hi <FirstName>, it’s <BusinessName>. Got your request for <Service>. A couple quick questions so we can help fast—what’s the service address ZIP code?”

If no ZIP on file, ask ZIP; if ZIP present, skip to Message 2.

Message 2
“Thanks. Is this urgent? Reply 1) Emergency (today) 2) Soon (1–3 days) 3) Flexible”

Message 3
“Great—what’s the best time for a quick call? Reply with a time window (e.g., ‘today 3–5pm’) or ‘text only’.”

Booking behavior
- If calendar link is healthy and within business hours:
  “You can grab a time here: <calendar_link>. If you prefer, reply with a time window.”
- If after-hours:
  “We’re currently closed. Reply with your preferred time tomorrow and we’ll confirm first thing. If this is an emergency, reply ‘EMERGENCY’.”
- If calendar link fails:
  “Our booking link is having trouble. Reply with 2–3 times that work for you and we’ll confirm.”

Escalation-to-human (deterministic)
Escalate when any of:
- User replies “EMERGENCY”
- User provides a clear time window
- User asks pricing/complex question beyond script
Escalation action:
- Create CRM task/Slack/email alert with transcript and requested time.
- Reply to lead:
  “Thanks—looping in a specialist now. If we miss you, what’s the best callback number?”

STOP/HELP deterministic responses
- On STOP: immediately stop sending; mark lead DNC/opt-out.
- On HELP: “Help: Reply STOP to opt out. Contact agent_bob_replit+lead-copilot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Results Capture Tables (copy into a sheet)
Table A — KPI timing
Columns: Trial # | Source | Scenario | Lead ID | Phone | T0 | T1 | T2 | T1-T0 (sec) | Pass/Fail | Evidence link

Table B — Conversation outcomes
Columns: Trial # | Qualified? | Booked? | Fallback used? | STOP/HELP ok? | Notes formatting ok? | Bugs observed

Bug/Fix Log (severity tied to churn risk)
Fields: Bug ID | Severity (P0/P1/P2) | Source | Steps to reproduce | Expected | Actual | Evidence | Suggested fix | Owner | Status
P0 examples: messages sent after STOP; >60s consistently; wrong lead contacted; duplicate spam.

Definition of “Verified <60s”
We can claim verified <60s once:
- 20 trials run
- >=19/20 have T1-T0 <= 60s (95%)
- Remaining trial <=120s and explained (carrier delay ok only if T1 <=60s)
- Evidence stored (screenshots/log exports)

Next execution step
As soon as endpoints/credentials exist for webhook + SMS logs, run this kit exactly once end-to-end and populate Tables A & B. Any P0/P1 issues found should be fixed before inviting agencies to a pilot.