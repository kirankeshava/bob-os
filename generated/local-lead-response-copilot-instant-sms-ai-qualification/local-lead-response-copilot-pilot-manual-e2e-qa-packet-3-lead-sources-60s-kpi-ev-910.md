# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:03:48.849Z

---

## 0) Context & Scope
Product: Local Lead Response Copilot (Instant SMS + AI Qualification). Goal: protect reputation in early agency pilots by verifying end-to-end behavior manually (no automation) across 3 lead sources and all high-risk fail cases.

Proof/legitimacy URL to share during pilot coordination: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops contact (for test coordination and evidence): agent_bob_replit+lead-copilot@agentmail.to

### Lead sources covered (minimum 3)
1) Generic Webhook JSON (any form/FB lead ads via webhook relay)
2) Jotform (real form tool)
3) HubSpot (CRM)

### KPI to verify
First response SMS must be sent within <60 seconds of lead creation/submission.

### Key behaviors to verify (required)
- Missing phone
- Invalid phone
- STOP / HELP
- After-hours behavior
- Multiple concurrent leads
- Calendar link failures
- Webhook retries
- Duplicate leads
- CRM note formatting (HubSpot)


## 1) Definitions & Evidence Requirements
### Timestamp points (use all)
T0 = Lead submit time (source UI timestamp OR webhook receipt timestamp)
T1 = Webhook received time (server logs, if available)
T2 = First outbound SMS queued time (messaging provider log or internal log)
T3 = First outbound SMS delivered time (provider delivery receipt; if not available, use queued time and note limitation)

### KPI pass/fail rule
PASS if (T2 - T0) <= 60 seconds for at least 95% of trials in a run (minimum 20 trials total across sources). FAIL if any run shows systemic >60s delay or >5% overage.

### Evidence to store per trial
- Source: Webhook / Jotform / HubSpot
- Lead identifiers: name + phone + unique ID/email
- Full raw payload (or screenshot for UI-only sources)
- T0/T1/T2/T3 timestamps
- Message transcript (inbound/outbound)
- Final disposition: booked / not booked / escalated


## 2) Setup Checklist (Manual)
### Pre-reqs
- A test phone number you control that can receive SMS
- Access to the Copilot admin/logs (or at minimum: an endpoint URL for webhooks and a view of outbound messages)

### Jotform (free tier)
- Create a form with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), Zip Code, Preferred Time (optional)
- Ensure Jotform submission triggers a webhook to the Copilot webhook endpoint

### HubSpot (free tier)
- Create a free HubSpot account or developer test portal
- Create a pipeline (optional) and ensure either:
  a) HubSpot form submission triggers workflow/webhook → Copilot, OR
  b) Copilot pushes notes back into HubSpot via API after qualification

### Generic Webhook JSON
- Ability to send test POST requests to the Copilot webhook endpoint (curl/Postman)


## 3) Deterministic Fallback Qualification Flow (LLM-safe mode)
This flow must run when:
- LLM returns error/timeout
- LLM confidence below threshold (if available)
- Any upstream dependency is degraded (optional rule)

### Guardrails
- Never claim to be a human.
- Keep messages short.
- Respect STOP immediately.
- Provide HELP instructions.

### Fallback Script (exact copy)
Message 1 (immediate):
“Hi {first_name}, this is the automated assistant for {business_name}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote?”

If YES / any reply other than STOP:
Q1:
“1) What service do you need? Reply A) {service1} B) {service2} C) {service3} D) Other”

Q2 (after Q1 answered):
“2) What’s your ZIP code?”

Routing (after Q2 answered):
- If business hours: “Thanks—what’s the best time for a quick call? Reply 1) ASAP 2) Today later 3) Tomorrow”
- If after-hours: “Thanks—our team is currently offline. We’ll text you back at {next_open_time}. If it’s urgent, reply URGENT.”

Escalation:
- If reply contains URGENT: “Got it—sharing this with the on-call team now. What’s the best time in the next hour for a call?”

Booking step:
- If calendar link is available: “You can grab a time here: {calendar_link}. If you prefer, reply with a time window and we’ll confirm.”
- If calendar link fails/unavailable: “Our booking link is temporarily down—reply with a time window (e.g., ‘tomorrow 2–4pm’) and we’ll confirm by text.”

STOP compliance (global):
- On inbound “STOP” (any case): “You’re opted out and will no longer receive messages.” Then cease.

HELP compliance (global):
- On inbound “HELP”: “This is an automated assistant for {business_name}. Reply STOP to opt out. For support email: agent_bob_replit+lead-copilot@agentmail.to”

Timeout handling:
- If no response after 10 minutes: “Just checking—still want a quote? Reply YES to continue or STOP to opt out.”
- If no response after 24 hours: stop messaging.


## 4) Manual Test Cases (with Pass/Fail)
Run at least 20 total trials; recommended distribution: 8 Webhook, 6 Jotform, 6 HubSpot.

### TC-01 Valid lead happy path (each source)
Input: valid E.164 phone, name, service
Expected: First SMS sent <60s; qualification proceeds; note written to HubSpot (for HubSpot source or CRM-writeback scenario)
Pass criteria: (T2-T0)<=60s; transcript matches expected; no duplicate messages.

### TC-02 Missing phone
Input: omit phone or blank
Expected: No SMS attempt; lead flagged “missing phone”; (optional) email alert created; CRM note indicates failure reason.
Pass: zero SMS attempts; clear log/CRM note.

### TC-03 Invalid phone
Input: phone like “123”, “555-5555”, or non-numeric
Expected: Validation fails; no SMS; lead flagged invalid phone.
Pass: zero SMS; reason recorded.

### TC-04 STOP keyword
Input: lead replies STOP after first SMS
Expected: immediate confirmation message; no further SMS; future retries do not send.
Pass: no additional messages post-STOP; opt-out recorded.

### TC-05 HELP keyword
Input: lead replies HELP
Expected: HELP response includes business identification + STOP instruction + support email.
Pass: correct content; flow can continue after HELP (unless user STOPs).

### TC-06 After-hours behavior
Input: lead submitted outside configured business hours
Expected: immediate acknowledgment; sets expectation for next open time; no booking pressure; optional urgent path.
Pass: messaging matches spec; no call booking attempts unless URGENT.

### TC-07 Multiple concurrent leads (race)
Input: submit 5 leads within 30 seconds (mix sources)
Expected: all receive first SMS <60s; no cross-talk (wrong name/service); logs separate.
Pass: no content bleed; KPI met.

### TC-08 Calendar link failure
Input: simulate calendar endpoint failure or invalid link
Expected: message offers manual scheduling fallback; no dead-end.
Pass: fallback message sent; lead can still provide time window.

### TC-09 Webhook retries
Input: replay identical webhook with same lead_id/request_id
Expected: dedupe prevents duplicate SMS; system returns idempotent success.
Pass: only one outbound SMS; dedupe recorded.

### TC-10 Duplicate lead (same phone within window)
Input: same phone submits twice within 10 minutes
Expected: either (a) do not restart flow; or (b) send a single “we’re on it” message and resume existing thread.
Pass: no spam; behavior matches configured rule; CRM note indicates dedupe.

### TC-11 HubSpot note formatting
Input: qualified lead completes Q1/Q2 + preferred time
Expected: a single HubSpot note containing:
- Timestamp
- Lead source
- Service selected
- ZIP
- Preferred time
- Transcript snippet
- Status (booked / needs follow-up)
Pass: readable formatting; no JSON blobs dumped raw; consistent labels.


## 5) Sample Payloads
### Generic Webhook JSON (recommended)
POST /webhook
{
  "source": "webhook_test",
  "lead_id": "lead_001",
  "first_name": "Test",
  "last_name": "User",
  "phone": "+15551234567",
  "email": "test.user@example.com",
  "service": "Water Heater Repair",
  "zip": "78701",
  "created_at": "2026-04-09T12:00:00Z"
}

### Webhook duplicate (same lead_id)
Repeat with identical lead_id; expect idempotency.


## 6) Results Capture Table (copy/paste)
Columns:
Trial # | Source | Lead ID | Phone | Scenario | T0 | T2 | Delta (sec) | First SMS content OK (Y/N) | STOP/HELP OK | Dedupe OK | Calendar fallback OK | HubSpot note OK | Pass/Fail | Notes/Link to evidence


## 7) Bug/Fix Log Template
Bug ID | Title | Severity (P0/P1/P2) | Source(s) | Steps to Reproduce | Expected | Actual | Evidence (links/screens) | Suspected Cause | Recommended Fix | Owner | Status

Severity guidance:
- P0: compliance (STOP), spamming, wrong-recipient, >60s systemic delays
- P1: occasional >60s, calendar dead-end, missing notes
- P2: formatting, minor copy issues


## 8) What “Verified <60s” Means (for agencies)
To claim verified performance in pilots, store:
- At least 20 timestamped trials across Webhook/Jotform/HubSpot
- Screenshots or exports of outbound message logs showing queue time
- A short summary: median delta, 95th percentile delta, and count over 60s


## 9) Exit Criteria (ready for first paid pilots)
- STOP/HELP works 100%
- No duplicate SMS on retry/dedupe scenarios
- After-hours copy is correct and non-spammy
- At least 95% of first responses under 60 seconds across 20 trials
- HubSpot notes readable and consistent

End of packet.