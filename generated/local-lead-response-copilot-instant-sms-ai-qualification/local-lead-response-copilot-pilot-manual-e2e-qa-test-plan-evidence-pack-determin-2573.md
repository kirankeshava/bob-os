# Local Lead Response Copilot — Pilot Manual E2E QA: Test Plan + Evidence Pack + Deterministic Fallback (3 Lead Sources)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:33:43.055Z

---

Purpose
Protect reputation in early agency pilots by validating end-to-end lead handling across 3 lead sources with proof of <60s first response and safe behavior when dependencies fail (LLM, SMS delivery, calendar link). This is intentionally manual (no automation) to avoid slowing revenue.

System under test
Local Lead Response Copilot (Instant SMS + AI Qualification)
Website to share with pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support contact (use in templates/logs): agent_bob_replit+lead-copilot@agentmail.to

Lead sources in scope (minimum 3)
A) Generic Webhook JSON (POST to ingestion endpoint)
B) Jotform (free) form submission -> webhook -> ingestion
C) HubSpot (free/developer) CRM lead create/update -> workflow/webhook -> ingestion + CRM note writeback

Primary KPI and acceptance criteria
KPI-1: First response time < 60 seconds
Pass if: For >= 95% of trials, time(lead_received_timestamp -> first_outbound_sms_timestamp) <= 60 seconds.
Fail if: Any systemic issue causes >60s in >= 2 trials or any trial exceeds 120s.

Safety criteria (must-pass)
S-1 Missing phone: no SMS attempted; system logs “missing phone” and creates a CRM note/task; optional email to business; no crash.
S-2 Invalid phone: no SMS attempted; system logs “invalid phone”; no repeated retries to the same invalid number.
S-3 STOP/HELP: STOP immediately suppresses further marketing/qualification SMS; HELP returns compliant help text; both are logged.
S-4 After-hours: lead receives appropriate after-hours message and is queued for next business window OR offered booking link (configurable). No repeated pings overnight.
S-5 Concurrency: 5 leads arriving within 10 seconds all get first SMS within 60 seconds; no cross-talk between conversations.
S-6 Calendar link failure: if booking link endpoint fails, system offers fallback (manual scheduling message) and escalates to human.
S-7 Webhook retries: safe to receive the same event multiple times; dedupe prevents duplicate SMS threads.
S-8 Duplicate leads: same phone within dedupe window does not start a new qualification; system continues existing thread and adds a CRM note.
S-9 CRM note formatting: notes are readable, consistent, and include timestamps + lead answers; no JSON blobs dumped to the CRM UI.

Evidence pack (what to capture for every trial)
For each test run, capture:
1) Lead source screenshot/export: submission/record with timestamp.
2) Ingestion log line: event received timestamp (server time) + event_id.
3) Messaging log: outbound SMS timestamp + to-number.
4) Transcript: messages exchanged and final disposition.
5) CRM artifact: contact record + note content + timestamp.

Results table (copy/paste columns)
TrialID | Source (Webhook/Jotform/HubSpot) | Scenario | EventID | LeadReceived (UTC) | FirstSMS (UTC) | DeltaSeconds | Pass<60s (Y/N) | Disposition (Booked/Qualified/Escalated/Stopped/Invalid) | Notes/Links to screenshots

Lead payloads (Generic Webhook JSON)
Use these as deterministic inputs. If your ingestion schema differs, map fields; do not change the semantic meaning.

1) Valid lead (happy path)
{
  "event_id": "qa-webhook-001",
  "source": "generic_webhook",
  "lead": {
    "first_name": "Test",
    "last_name": "Plumbing",
    "phone": "+14155550101",
    "email": "test.plumbing@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "message": "Need service today",
    "utm": {"campaign": "qa", "medium": "cpc"}
  },
  "timestamp": "<client_iso_timestamp>"
}
Expected: First SMS within 60s; qualification begins.

2) Missing phone
{
  "event_id": "qa-webhook-002",
  "source": "generic_webhook",
  "lead": {
    "first_name": "Test",
    "last_name": "NoPhone",
    "phone": "",
    "email": "nophone@example.com",
    "service": "HVAC tune-up",
    "zip": "94107"
  }
}
Expected: No SMS; CRM note: “Missing phone”; escalation path triggered.

3) Invalid phone
{
  "event_id": "qa-webhook-003",
  "source": "generic_webhook",
  "lead": {
    "first_name": "Test",
    "last_name": "BadPhone",
    "phone": "12345",
    "email": "badphone@example.com",
    "service": "Roof leak"
  }
}
Expected: No SMS; invalid phone logged; no repeated retries.

4) Duplicate event (retry)
Send the exact payload of qa-webhook-001 again with same event_id.
Expected: Deduped. No second “first SMS” sent; CRM note indicates duplicate suppressed.

5) Duplicate lead (new event_id, same phone)
Same as qa-webhook-001 but event_id = qa-webhook-005.
Expected: Does not restart qualification if within dedupe window; continues thread; adds CRM note.

Jotform setup + test scenarios (manual)
Setup (free):
- Create a form “QA Lead Form”. Fields: First Name, Last Name, Phone, Email, Service Needed, ZIP, Message.
- Configure Webhooks/integration to POST to the ingestion endpoint.
Scenarios:
- JF-1 Happy path valid phone
- JF-2 Missing phone (leave blank)
- JF-3 Invalid phone (enter 12345)
- JF-4 Duplicate submission (submit twice same phone within 1 minute)
Evidence: Jotform submission timestamp + ingestion log + SMS log.

HubSpot setup + test scenarios (manual)
Setup (free/developer):
- Create test pipeline/contact properties if needed: service, lead_source, desired_time.
- Ensure system can write back a note/engagement to contact.
Scenarios:
- HS-1 New contact created with valid phone -> triggers SMS
- HS-2 Update existing contact (same phone) -> should not restart from scratch
- HS-3 Duplicate webhook delivery (simulate by re-sending event) -> dedupe
- HS-4 CRM note formatting check (see expected note template below)

Expected CRM note format (readable, no raw JSON)
Title: Lead Copilot Qualification (Auto)
Body (example):
[2026-05-14 18:22:10 UTC] Source: Jotform | Event: jf-12345
First response: 14s
Status: Qualified – Ready to book
Customer answers:
1) What service do you need? -> Water heater repair
2) When do you want us to come out? -> Today
3) Address/ZIP? -> 94107
4) Best time to call? -> ASAP
Next step:
- Booking link sent: https://<calendar_link>
- If no booking in 10 min, escalate to human.

Deterministic fallback qualification flow (LLM down / timeout safe-mode)
Trigger conditions:
- LLM API error OR timeout > 6s OR confidence flag low OR rate-limit.
- Calendar endpoint error > 2 consecutive attempts.
- Any internal exception during conversation state update.

Rules:
- Never block first SMS on LLM.
- Use fixed questions in order; one question per message.
- If user responds with STOP: mark DNC immediately; send confirmation; end.
- If user sends HELP: send help text; keep state unless STOP.

Safe-mode message copy (paste-ready)
First message (always within 60s):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. A couple quick questions so we can help fast—what’s the best time today for a call or visit?”

Q2 (after time answer):
“Got it. What’s the address or ZIP code for the job?”

Q3:
“Any details we should know (photos, error codes, urgency)?”

Booking attempt:
“Thanks—want to grab a spot on the schedule? Here’s the booking link: {{calendar_link}}”

If calendar link fails:
“Sorry—our booking link is acting up. Reply with a good time window (e.g., 2–4pm) and we’ll confirm ASAP. If urgent, reply URGENT.”

Escalation-to-human (no response / high intent):
- If user replies “URGENT” or mentions emergency keywords: “Understood—someone will call you shortly. If this is an emergency, call {{business_phone}}.”
- If no reply after 10 minutes: send one follow-up: “Just checking—still need help with {{service}}? Reply YES and your preferred time.”

Compliance messages
STOP confirmation:
“You’re opted out and won’t receive more texts. Reply HELP for help.”
HELP response:
“For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

After-hours behavior
Define business hours (pilot default): 8am–6pm local.
If lead arrives after-hours:
- Send within 60s: “Thanks for reaching out—our team is offline right now. Reply with a good time tomorrow and we’ll confirm first thing. If urgent, reply URGENT.”
- Queue a next-business-day follow-up at opening time.

Concurrency test
Procedure:
- Fire 5 events within 10 seconds (webhook or form submissions) using unique phones: +14155550101…+14155550105.
Pass if:
- All 5 receive first SMS <60s and transcripts do not mix names/services.

Bug log (copy/paste fields)
BugID | Date | Severity (P0-P3) | Source | Scenario | Steps to Reproduce | Expected | Actual | Evidence Link | Suspected Cause | Suggested Fix | Owner | Status
Severity guidance:
P0: compliance breach (STOP ignored), duplicate spam, >120s systemic delay
P1: >60s frequently, wrong recipient, calendar failure w/o fallback
P2: formatting issues, minor routing issues
P3: copy tweaks

How to run this in <60 minutes during a pilot
1) Confirm ingestion endpoint + logging access.
2) Run 5 webhook trials (happy/missing/invalid/duplicate/retry).
3) Run 3 Jotform trials (happy/missing/duplicate).
4) Run 3 HubSpot trials (new/update/note formatting).
5) Run STOP and HELP on a real thread.
6) Fill the results table; compute % under 60s and list bugs with severity.

Definition of done for the pilot QA pass
- >= 20 total trials across 3 sources with evidence.
- >= 95% first responses <60s.
- All safety criteria S-1 through S-9 pass OR have P0/P1 bugs logged with clear fixes before onboarding next agency.
