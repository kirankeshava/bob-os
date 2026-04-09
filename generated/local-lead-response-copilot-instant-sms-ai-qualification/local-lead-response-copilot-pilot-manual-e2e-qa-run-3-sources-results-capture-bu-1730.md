# Local Lead Response Copilot — Pilot Manual E2E QA Run (3 Sources) + Results Capture + Bug List + Deterministic Fallback (LLM-Safe)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:51:17.403Z

---

Business context
Local Lead Response Copilot instantly texts new leads, qualifies them, and routes to booking/human follow-up. Reliability issues here are reputationally expensive for agencies; this runbook is designed for early pilots without test automation.

References to include in any customer/pilot comms
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate end-to-end behavior across 3 lead sources and confirm:
1) First outbound SMS sent in <60 seconds from lead creation.
2) Fail-safe behavior works when LLM fails (deterministic question flow).
3) Edge cases do not create compliance risk (STOP/HELP) or duplicate/spam leads.

Lead sources in scope (3)
A) Generic Webhook JSON (direct POST to our inbound endpoint)
B) Jotform (real form tool → webhook)
C) HubSpot (CRM event → workflow/webhook → our endpoint; verify CRM note formatting)

Definition of “<60s first response” (KPI)
Capture these timestamps for each trial:
T0 = Lead created time at source (form submit time, CRM event time, or webhook request received time if direct POST)
T1 = First outbound SMS send time (provider log or application log; must be “send attempted” and ideally “queued/sent”)
Latency = T1 - T0. Pass if <= 60 seconds.

Evidence standard (store for each trial)
- Screenshot/export of the source event time (Jotform submission record / HubSpot timeline / webhook client timestamp).
- Screenshot/export of outbound message log showing send timestamp and recipient.
- Transcript of messages (first SMS + any replies) for STOP/HELP scenarios.
- If failure: screenshot of error logs and the exact payload used.

Minimum sample plan (20 total trials)
- 5 trials Generic Webhook JSON
- 10 trials Jotform
- 5 trials HubSpot
Must include at least:
- 2 missing phone
- 2 invalid phone
- 2 STOP
- 1 HELP
- 2 after-hours
- 2 concurrent leads (submitted within 5 seconds)
- 2 duplicate leads (same phone within 2 minutes)
- 2 webhook retries (same event_id resent 3 times)
- 1 calendar link failure simulation

Pre-flight checklist (run once)
1) Confirm inbound endpoint URL and required headers (API key/signature if used).
2) Confirm which phone number is the sending number and that logs are accessible.
3) Confirm business hours configuration (timezone!) for after-hours behavior.
4) Confirm booking method (calendar link vs direct scheduling) and the expected failure copy.
5) Confirm dedupe strategy: key fields (phone, source_event_id), time window, and how duplicates are logged.

Test data (use consistently)
Use these canonical leads so dedupe and CRM notes are predictable:
- Lead A: name=Alex Test, phone=+14155550101, service=“Water heater install”, zip=94107
- Lead B: name=Jamie Test, phone=+14155550102, service=“AC repair”, zip=78701
- Missing phone: name=No Phone, phone="", service=“Plumbing leak”, zip=10001
- Invalid phone: name=Bad Phone, phone="12345", service=“Roof quote”, zip=30301

A) Generic Webhook JSON — sample payloads
POST to inbound endpoint (example body). Include a deterministic id for retries/dedupe.

Payload A1 (valid)
{
  "event_id": "wh_0001",
  "source": "generic_webhook",
  "created_at": "2026-04-09T14:00:00Z",
  "lead": {
    "first_name": "Alex",
    "last_name": "Test",
    "phone": "+14155550101",
    "email": "alex@example.com",
    "service": "Water heater install",
    "zip": "94107"
  }
}

Payload A2 (missing phone)
{
  "event_id": "wh_0002",
  "source": "generic_webhook",
  "created_at": "2026-04-09T14:02:00Z",
  "lead": {
    "first_name": "No",
    "last_name": "Phone",
    "phone": "",
    "email": "nophone@example.com",
    "service": "Plumbing leak",
    "zip": "10001"
  }
}

Payload A3 (invalid phone)
{
  "event_id": "wh_0003",
  "source": "generic_webhook",
  "created_at": "2026-04-09T14:03:00Z",
  "lead": {
    "first_name": "Bad",
    "last_name": "Phone",
    "phone": "12345",
    "email": "badphone@example.com",
    "service": "Roof quote",
    "zip": "30301"
  }
}

Webhook retry test
Resend Payload A1 three times with SAME event_id=wh_0001. Expected: only one conversation is started; subsequent requests return 200/202 with “duplicate ignored” logged, and no extra SMS.

Concurrent leads test
Send Payload A1 and another valid payload within 5 seconds. Expected: both get first SMS <60s and no cross-contamination of answers.

B) Jotform — setup + mapping
Create a free Jotform with fields:
- Full Name (or First/Last)
- Phone Number
- Email
- Service Needed (dropdown)
- Zip Code
- Preferred timing (optional)
Configure webhook integration to the inbound endpoint.

Field mapping expectations
- Jotform phone must be normalized to E.164. If not possible, system should validate and reject with a human-friendly internal log.
- Lead source metadata should include: source="jotform", form_id, submission_id.

Jotform test cases (10)
1) Valid lead A
2) Valid lead B
3) Missing phone
4) Invalid phone
5) Duplicate submission (same phone within 2 minutes)
6) After-hours submission (or simulate by temporarily setting business hours)
7) STOP reply after first message
8) HELP reply after first message
9) Calendar link failure: set booking link to an invalid URL temporarily
10) Webhook retry: re-send same submission payload if Jotform retries (or replay via request bin)

C) HubSpot — note formatting and dedupe
Goal: when a lead is created/updated in HubSpot (or when our system pushes an activity), confirm the CRM note is created with consistent formatting and contains:
- Timestamp
- Lead source
- Summary of answers
- Conversation status
- Booking result (link or failure reason)

Expected HubSpot note template (copy exact formatting)
Title: Lead Copilot — Qualification Summary
Body (example):
[Lead Copilot] 2026-04-09 10:15 AM America/Los_Angeles
Source: Jotform (form_id=12345 submission_id=abcde)
First response latency: 18s
Contact: Alex Test (+14155550101)
Intent: Water heater install | Zip: 94107
Q&A:
1) When would you like service? → “This week”
2) Is this for a residential or commercial property? → “Residential”
3) Anything else we should know? → “Tank is leaking”
Outcome: Booking link sent (no booking confirmed yet)
Status: QUALIFYING
Stop/Help flags: none

HubSpot test cases (5)
1) New contact created from inbound lead: note appears on contact timeline.
2) Duplicate lead (same phone): system appends/update strategy is consistent (either one note updated or a second note clearly marked DUPLICATE IGNORED).
3) Retry behavior: same event_id does not create multiple notes.
4) Special characters: service contains symbols or multi-line input; note remains readable.
5) After-hours: note indicates after-hours routing applied.

Compliance behavior tests (STOP/HELP)
STOP expected:
- System immediately stops automated messages to that phone.
- System replies with a confirmation (carrier/compliance dependent) OR at minimum ceases further contact.
- Conversation status set to DO_NOT_CONTACT with timestamp.
- If integrated with CRM: add a note “STOP received” and mark contact appropriately.

HELP expected:
- System replies with a short help message:
  “You’re texting with [Business Name]. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-hours behavior
If lead arrives outside business hours:
- First message must still go out quickly (<60s) but should set expectations.
Expected copy:
“Thanks for reaching out — we’re currently closed. We’ll follow up first thing tomorrow. Quick question so we can help faster: what service do you need?”

Deterministic fallback mode (LLM down / timeout)
Trigger conditions
- LLM API error, timeout > 6s, malformed response, or safety refusal.
Behavior
- Switch to deterministic script for the rest of the conversation for that lead.
- Do not attempt “clever” free-text interpretation; collect structured answers only.

Deterministic question flow (exact copy)
Message 1 (immediate on lead receive):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. Quick question: what’s the address or ZIP code for the job?”

If no response in 5 minutes:
“Just checking — what ZIP code is the job in?”

After ZIP is received:
“Thanks. When would you like service? Reply 1) ASAP 2) This week 3) Next week 4) Just pricing”

After timing:
“Got it. Is this Residential or Commercial? Reply R or C.”

After R/C:
“Any brief details we should know? (Optional—reply in one sentence.)”

Wrap-up (booking path):
- If calendar link works:
“Perfect. Here’s the booking link: {{calendar_link}}. If you’d rather, reply CALL and we’ll reach out.”
- If calendar link fails:
“Thanks — our booking link is temporarily down. Reply CALL and we’ll contact you ASAP, or share the best time window (morning/afternoon/evening).”

Escalation-to-human rule
Escalate (notify internal channel/CRM flag) if:
- Lead replies with anger/confusion
- Phone invalid but email exists
- Any STOP/HELP ambiguity
- More than 2 unanswered prompts

Results capture table (paste into doc/spreadsheet)
Columns:
Trial ID | Source (Webhook/Jotform/HubSpot) | Scenario | T0 | T1 | Latency (s) | Pass <60s (Y/N) | Expected behavior | Actual behavior | Evidence link | Bug ID

Bug log format
Bug ID | Severity (P0/P1/P2) | Scenario | Steps to reproduce | Expected | Actual | Frequency | Customer impact | Proposed fix | Owner | Status

Severity definitions
P0: Compliance risk (STOP/HELP), spams duplicates, messages wrong person, or >60s consistently.
P1: Breaks booking/qualification or creates CRM corruption.
P2: Cosmetic, minor copy/formatting.

Exit criteria (for first pilot readiness)
- At least 18/20 trials have T1-T0 <= 60s; any failures have a clear root cause and mitigation.
- STOP and HELP behave as specified.
- Missing/invalid phone does not cause outbound SMS; system logs and escalates appropriately.
- Dedupe and webhook retry do not produce multiple outbound SMS.
- HubSpot note is created and readable with consistent fields.

Notes
This is intentionally manual to protect distribution/revenue focus while preventing reputation-damaging failures during pilots. Once 1–2 customers are live, we can convert the P0/P1 scenarios into lightweight automated regression checks.
