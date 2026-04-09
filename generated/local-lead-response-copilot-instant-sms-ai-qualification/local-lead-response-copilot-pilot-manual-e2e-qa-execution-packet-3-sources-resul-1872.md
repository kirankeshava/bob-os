# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Sources) + Results + Bug Log + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:34:14.267Z

---

Overview / Goal
Validate end-to-end lead ingestion + instant SMS response + qualification + booking/hand-off across 3 lead sources with <60s first response. Prove safe failover behavior (deterministic flow) when LLM or downstream systems fail. Capture evidence suitable for agencies.

Business legitimacy references (for any customer/operator comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

Lead Sources Under Test (3)
1) Generic Webhook JSON (simulate any ads/form tool)
2) Jotform (real form tool; free tier)
3) HubSpot (CRM; free developer/test account)

Pre-Reqs / Setup Checklist (operator)
A. Access
- Inbound webhook endpoint URL for Lead Response Copilot (the product’s “receive lead” endpoint)
- A view into outbound SMS logs (Twilio console/logs or app logs) with timestamps
- A test sending number already configured in the system (no new spend)
- Calendar/booking link configured (or a dummy link for failure testing)

B. Test identities (use distinct phone numbers)
- Valid US mobile #1 (control)
- Valid US mobile #2 (concurrency)
- Invalid phone samples: “123”, “+1555”, “+1(000)000-0000”
- Missing phone (omit phone field)
- Duplicate lead: same phone/email as #1

C. Evidence capture
Use a single Results Table row per trial and capture:
- T0 = lead submit time (from source log / HTTP client timestamp)
- T1 = first outbound SMS time (from Twilio/app log)
- Δ = T1 - T0 (seconds)
Store screenshots or exported logs for at least 5 representative trials: baseline, after-hours, STOP, LLM failover, calendar failure.

KPI Acceptance Criteria
- First response: ≥ 95% of trials must have first outbound SMS within 60 seconds (Δ <= 60s). Any Δ > 60s is a fail and requires investigation.
- STOP/HELP compliance: STOP must immediately cease further messages to that number; HELP must return help text.
- Safety: Missing/invalid phone must not send SMS; must create a CRM note/log entry indicating failure reason.
- Dedupe: Duplicate lead should not create duplicate outreach within the dedupe window (suggest 24h or configurable). Expected: log “duplicate suppressed” and optionally notify internal.
- After-hours: Must follow configured routing (e.g., acknowledge + next-business-day scheduling link) and avoid booking prompts that imply immediate service.

Test Execution Order (run time ~45–60 minutes)
1) Baseline happy path via each source (3 trials)
2) Missing phone + invalid phone (2–4 trials)
3) STOP + HELP (2 trials)
4) After-hours behavior (1–2 trials; can simulate by temporarily setting business hours)
5) Concurrency: 5 leads in <60 seconds (1 batch)
6) Calendar link failure (1–2 trials)
7) Webhook retry + duplicate lead (2–3 trials)
8) HubSpot formatting verification (ongoing across HubSpot trials)
9) LLM failure simulation -> deterministic safe mode (1–2 trials)

Source 1: Generic Webhook JSON (copy/paste payloads)
Send with curl/Postman to inbound endpoint.

Payload A (happy path)
{
  "source": "generic_webhook",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550101",
    "email": "test.lead.0101@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "message": "Need a quote today"
  },
  "meta": {
    "campaign": "QA_baseline",
    "submitted_at": "<ISO_TIMESTAMP>"
  }
}

Payload B (missing phone)
{
  "source": "generic_webhook",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "email": "nophone@example.com",
    "service": "AC tune-up",
    "zip": "94107"
  }
}
Expected: No SMS attempt. System logs/CRM note: “Missing phone – cannot text.” Optional email to internal only.

Payload C (invalid phone)
{
  "source": "generic_webhook",
  "lead": {
    "first_name": "BadPhone",
    "last_name": "Lead",
    "phone": "123",
    "email": "badphone@example.com",
    "service": "Plumbing",
    "zip": "94107"
  }
}
Expected: No SMS. Log/CRM note: “Invalid phone format.”

Payload D (duplicate lead)
Send Payload A twice within 2 minutes.
Expected: first triggers SMS; second suppressed (no second outreach). Log “duplicate suppressed” with dedupe key (phone/email/source).

Payload E (webhook retry simulation)
Send same payload with header or field indicating retry:
{"meta": {"retry_count": 1, "original_event_id": "evt_123"}, ...}
Expected: idempotency based on event_id or dedupe key; no duplicate SMS.

Source 2: Jotform (free) — Setup + Tests
Setup steps
1) Create Jotform form fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Message.
2) Configure “Webhook” integration in Jotform to post to inbound endpoint.
3) Submit the form from an incognito window to generate clean timestamps.

Jotform test cases
- JF-1 Happy path: valid phone.
- JF-2 Missing phone: remove/blank phone.
- JF-3 Invalid phone: enter 123.
- JF-4 Duplicate: submit twice same phone.
Expected matches Generic section.

Source 3: HubSpot (free dev/test) — Tests
Goal: Validate CRM-origin leads (e.g., new contact created) and note formatting.
Two options depending on integration availability:
A) If product pulls from HubSpot via workflow/webhook: create a workflow “Contact created -> POST to endpoint”.
B) If product uses HubSpot forms: create HubSpot form and embed/submit.

HubSpot test cases
- HS-1 Create new contact with valid phone -> triggers SMS.
- HS-2 Create contact missing phone -> no SMS, log note.
- HS-3 Duplicate contact/lead -> dedupe.
- HS-4 Verify CRM notes formatting (see format spec below).

STOP/HELP Compliance Tests (applies to all sources)
- STOP: After receiving first SMS, reply “STOP”. Expected: immediate confirmation message (carrier/Twilio standard) and no further messages from system for any subsequent lead submissions for that number.
- HELP: Reply “HELP”. Expected: a help message describing business name and contact method (at minimum).
Suggested HELP text (safe default):
“Local Lead Response Copilot: You’re receiving messages about your service request. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-Hours Behavior
Define business hours (example): Mon–Fri 8am–6pm local.
Test: Submit lead outside hours.
Expected SMS (example):
“Thanks for reaching out—our team is currently closed. We’ll text you first thing next business day. If this is urgent, reply URGENT and we’ll do our best to respond.”
No aggressive booking language implying immediate availability.

Concurrency Test
Submit 5 leads within 60 seconds (use 5 different phone numbers if possible; otherwise 2–3). Measure Δ for each. Expected: all first responses <60s, no cross-talk (messages must not mix between leads), correct state per lead.

Calendar Link Failure Tests
Simulate by using an invalid booking URL or temporarily disabling calendar endpoint.
Expected:
- System does not loop.
- Sends fallback: “I’m having trouble generating a booking link. Would you like us to call you instead? Reply 1 for a call, 2 for a text quote.”
- Creates internal alert/log and CRM note.

LLM Failure / Timeout → Deterministic Safe Mode (Documented Fallback)
Trigger method: disable LLM key, set LLM timeout to 1s, or use a test flag “force_llm_error=true”.
Expected behavior:
- Qualification continues using the deterministic script below.
- No hallucinated pricing/availability.
- Clear escalation path to human.

Deterministic Qualification Script (exact flow)
Message 1 (immediate):
“Hi {{first_name}}, this is the scheduling assistant for {{business_name}}. A quick 3 questions so we can help fast—what service do you need? (Reply 1 Plumbing, 2 HVAC, 3 Electrical, 4 Other)”
If reply 1/2/3/4:
Q2:
“Thanks. What’s your ZIP code?”
If ZIP invalid/non-5-digit after 2 tries:
“Got it. What city are you in?”
Q3:
“Is this urgent? Reply 1 Urgent (today), 2 Soon (this week), 3 Flexible.”
Then routing:
- If business hours AND calendar OK: “Perfect—here’s the soonest time to book: {{calendar_link}}. Or reply CALL for a callback.”
- If after-hours: “Thanks—our office is closed right now. We’ll follow up next business day. Reply CALL if you’d like a callback.”
- If calendar failure: offer CALL/text-quote options and create internal task.
Stop conditions:
- If user replies STOP at any time: cease.
- If user replies HELP: send help text.
- If no response after 10 minutes: send one nudge, then stop.
Nudge:
“Just checking—do you still want help with this request? Reply YES to continue or STOP to opt out.”

HubSpot CRM Note Formatting Spec
Each lead should append a single well-formatted note/timeline event on the contact:
Title: “Lead Copilot Qualification”
Body (plain text):
- Source: <generic_webhook|jotform|hubspot>
- Received: <ISO timestamp>
- First SMS sent: <ISO timestamp> (Δ=<seconds>)
- Status: <Qualified|Unreachable|Opted out|After-hours queued|Calendar error|Duplicate suppressed>
- Answers:
  - Service: <value>
  - ZIP/City: <value>
  - Urgency: <value>
- Next step: <Booked link|Needs callback|Queued>
- Transcript (last 6 messages max):
  - OUT: ...
  - IN: ...

Results Table (fill during execution)
Columns:
Trial ID | Source | Scenario | T0 Submit (UTC) | T1 1st SMS (UTC) | Δ seconds | Pass/Fail | Evidence link/screenshot | Notes
Target: 20 total trials across all sources, including 1 concurrency batch (counts as 5).

Bug/Fix Log Template (prioritized)
Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Impact | Suggested Fix | Owner | Status
Severity guidance:
- P0: compliance risk (STOP not honored), messages to invalid/missing phone, >60s systemic delay, cross-lead message mix-up
- P1: calendar failure loops, dedupe missing, after-hours misrouting, CRM note unreadable
- P2: copy issues, minor formatting

Likely Bugs to Watch (checklist)
- Phone normalization: E.164 formatting inconsistencies causing silent SMS failures
- STOP list persistence: STOP honored only per-conversation, not globally per number
- Duplicate suppression: dedupe by phone only causing issues with shared household numbers; or no event idempotency causing retries to spam
- Concurrency: LLM/session state bleeding between leads
- After-hours: still sending booking link during closed hours
- HubSpot notes: HTML/markdown rendering poorly; missing timestamps

How to Report Results
At end, provide:
1) Completed Results Table (20 rows)
2) Evidence pack: 5 screenshots/log exports
3) Bug/Fix Log with severities and recommended remediation order
4) KPI statement: “X/Y trials under 60 seconds; p95=__s; max=__s; failures=__ (with root causes)”

Operator Notes
This is intentionally manual (no automation) to protect early pilots without slowing revenue work. Once 1–2 paying customers exist, convert the P0 scenarios (STOP/HELP, dedupe/idempotency, <60s response) into lightweight automated smoke checks.
