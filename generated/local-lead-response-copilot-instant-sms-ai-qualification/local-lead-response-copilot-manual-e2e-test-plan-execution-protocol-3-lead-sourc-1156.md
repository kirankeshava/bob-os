# Local Lead Response Copilot — Manual E2E Test Plan + Execution Protocol (3 Lead Sources) with KPI Evidence, Fail-safes, and Expected Outputs

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:01:48.043Z

---

Overview
This is a pilot-first, manual end-to-end (E2E) test plan for Local Lead Response Copilot (Instant SMS + AI Qualification). It is designed to protect reputation with agencies by verifying the core KPI (first response in <60 seconds) and validating safe behavior in failure/edge scenarios without building automation pre-revenue.

Product reference for legitimacy in any partner comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope
Lead sources covered (3):
1) Generic Webhook JSON (any form tool / ad platform that can POST)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Primary KPI
- KPI-1: First outbound SMS sent within 60 seconds of lead receipt.

Evidence requirements (what to save)
For each trial, capture:
- T0: Timestamp when lead was submitted (form submit time / webhook request time / HubSpot create time)
- T1: Timestamp when the first SMS was sent (provider log or application log)
- Delta: T1 - T0 in seconds
- Screenshot or copied log lines for T0 and T1
- Full SMS transcript for STOP/HELP tests

Minimum sample size
- 20 total trials recommended before declaring “stable enough for pilot agencies”
  - 8 trials: Generic webhook
  - 6 trials: Jotform
  - 6 trials: HubSpot
Pass gate: 19/20 under 60 seconds AND no Sev-1 bugs (see severity definitions).

Tooling (manual, free)
- Browser + stopwatch (phone timer is acceptable)
- Curl/Postman for webhook tests
- Free Jotform account
- Free HubSpot developer account
- Access to SMS sending logs (Twilio/Plivo/etc.) or internal message logs

Severity definitions (churn-risk based)
- Sev-1 (must fix before any agency pilot): wrong recipient, sends to invalid/empty phone, ignores STOP, sends outside allowed after-hours policy, duplicates causing spam, fails to send any first message.
- Sev-2 (fix quickly): response >60s intermittently, formatting issues in CRM notes, calendar link not resilient (no fallback), confusing messages.
- Sev-3 (nice-to-have): minor copy tweaks, edge formatting.

Deterministic Fail-safe Qualification Mode (when LLM fails)
Trigger conditions (any):
- LLM returns error / timeout
- LLM response is empty/unparseable
- LLM response latency exceeds configured threshold (recommended: 8 seconds)

Core principles
- Never block the first SMS on the LLM.
- Ask short, deterministic questions with numbered choices.
- Stop immediately on STOP; comply on HELP.
- Escalate to human when uncertain.

Fail-safe message flow (exact copy)
Message 1 (immediate, always sent once phone is valid):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—quick question so we can help fast. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”

Branching:
- If reply 1/2/3/4: proceed
- If free-text: map to closest bucket if obvious; otherwise ask for clarification once, then escalate

Message 2 (deterministic scheduling intent):
“Got it. When do you want this handled? Reply 1) ASAP 2) This week 3) Just researching”

Message 3 (location/fit):
“What ZIP code is the job at?”

Booking step:
- If calendar link works: “Perfect—grab a time here: {calendar_link}. If you prefer, reply with a good time window.”
- If calendar link fails (detected or reported): “Our booking link is temporarily down—no problem. Reply with 2–3 times that work for you and we’ll confirm.”

Escalation rule:
- If user replies with urgency (“emergency”, “leak”, etc.) OR after 2 unclear responses: “Thanks—looping in a specialist now. If you’d like faster help, call/text back here and we’ll respond ASAP.” Then create internal alert/assignment.

STOP/HELP compliance
- If inbound contains STOP (case-insensitive, exact or includes “stop”): immediately stop all outbound messages and store opt-out flag.
  Reply (one time only): “You’re opted out and will no longer receive texts. Reply HELP for help.”
- If inbound contains HELP: reply: “Support: {business_name}. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to”

After-hours behavior (fail-safe)
Define business hours per account (e.g., 8am–6pm local). If lead arrives after-hours:
- Still send first SMS within 60 seconds, but set expectation:
“Thanks for reaching out! We’re currently closed, but we’ll follow up as soon as we open. If this is urgent, reply ASAP with details.”
- Do not book calls outside allowed windows; offer next-available booking.

Test Matrix (what to run)
A) Lead intake validation
1. Missing phone (Sev-1)
- Submit lead without phone.
Expected: No SMS sent. Lead is marked “missing phone” and routed to email/internal task. No crashes.
Evidence: intake log + absence of SMS log.

2. Invalid phone (Sev-1)
- Submit phone like “123”, “555-5555”, or non-US length if US-only.
Expected: No SMS sent. Error reason recorded. Optional: email alert.

3. Valid phone normalization
- Submit “(415) 555-0123”.
Expected: Stored as E.164 +14155550123 (or region format) and SMS sends.

B) SMS compliance and user controls
4. STOP (Sev-1)
- After first SMS, reply “STOP”.
Expected: one opt-out confirmation, then no further messages even if lead retries.

5. HELP
- Reply “HELP”.
Expected: help message with opt-out + support email.

C) After-hours routing
6. After-hours lead
- Submit lead outside business hours.
Expected: first SMS <60s with after-hours copy; no aggressive booking prompts.

D) Resilience, retries, dedupe
7. Webhook retries (Sev-1 if spam)
- POST same payload 3 times with same lead_id.
Expected: only one SMS thread created; idempotency key prevents duplicates.

8. Duplicate leads (Sev-1/2)
- Submit same phone + same name within 5 minutes.
Expected: dedupe; either ignore second or append to same conversation, but do not send a second “intro” blast.

9. Multiple concurrent leads
- Submit 5 leads in 60 seconds.
Expected: all receive first SMS <60s; no cross-talk; correct attribution.

E) Calendar/booking failures
10. Calendar link failure
- Simulate booking URL down or wrong.
Expected: system offers manual time windows; logs incident.

F) CRM logging and formatting (HubSpot)
11. HubSpot note formatting
Expected note template (single note per lead creation, append updates):
Title: “Lead Copilot Qualification Summary”
Body:
- Lead Source: {source}
- First Response Sent: {timestamp}
- Status: {Qualified | Unqualified | Needs follow-up | Opted-out}
- Answers:
  - Service: {answer}
  - Timeline: {answer}
  - ZIP: {answer}
- Booking:
  - Calendar Link: {url or ‘failed’}
  - Appointment Time: {if booked}
- Transcript (last 5 messages):
  1) …
  2) …
No raw JSON dumps; avoid double newlines; preserve timestamps.

Lead Source Specific Execution Steps
1) Generic Webhook JSON
- Use curl/Postman to POST to the product webhook endpoint.
- Required fields for baseline: lead_id, first_name, last_name, phone, source, created_at.
Sample payload A (valid):
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+14155550123",
  "email": "test@example.com",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z",
  "utm": {"campaign": "qa", "medium": "test"}
}
Sample payload B (missing phone):
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "source": "webhook",
  "created_at": "2026-04-09T12:05:00Z"
}
Record T0 as request sent time; T1 from SMS log.

2) Jotform
- Create a simple form with fields: First name, Last name, Phone, Service (dropdown), ZIP.
- Configure submission to send to the webhook endpoint.
- Run 6 trials: valid, invalid phone, missing phone, after-hours, duplicate submit, concurrency (submit 2 quickly).
Record T0 as Jotform submission timestamp.

3) HubSpot
- Create contact manually or via form; ensure webhook/workflow triggers lead copilot.
- Run 6 trials including note formatting verification.
Record T0 as contact create time or form submission time.

Results Table (copy/paste)
Trial ID | Source | Scenario | T0 (lead received) | T1 (first SMS sent) | Delta(s) | Pass/Fail | Evidence Link | Notes

Bug Log Table (copy/paste)
Bug ID | Severity | Source | Scenario | Steps to Reproduce | Expected | Actual | Impact | Suggested Fix | Status

Definition of “Verified <60s”
We consider the KPI verified when:
- For each source, at least 5/6 trials are <60 seconds, and
- Overall 19/20 trials are <60 seconds, and
- Any >60s trials have a known, non-systemic cause (e.g., deliberate after-hours gating still sends initial message quickly; SMS provider outage documented).

This plan is intentionally manual to avoid slowing distribution and sales pre-revenue, while still producing credible, timestamped reliability evidence during early agency pilots.