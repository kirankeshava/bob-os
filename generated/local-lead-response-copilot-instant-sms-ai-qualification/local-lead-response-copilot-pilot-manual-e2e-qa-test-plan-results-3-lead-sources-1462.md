# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results (3 Lead Sources) + Deterministic Fail-safe Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:43:11.812Z

---

Business: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof/legitimacy URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Business contact email (for notifications/escalations): agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate end-to-end lead capture → <60s first SMS response → qualification → booking/escalation across 3 lead sources, with fail-safe behavior when the LLM or downstream dependencies fail. This is manual (pilot-stage), designed to protect agency reputation and reduce churn in month 1.

Lead Sources Under Test (minimum 3)
1) Generic Webhook JSON (any form/ad tool hitting our endpoint)
2) Jotform (real form tool) – via webhook integration
3) HubSpot (CRM) – via workflow/webhook/action that posts lead data into our endpoint OR via CRM-triggered event (depends on integration surface)

Primary KPI
First-response time: lead received timestamp (T0) → first outbound SMS queued/sent timestamp (T1) must be < 60 seconds for ≥ 95% of trials.

Evidence Protocol (how to prove <60s)
For each test trial, capture:
- T0: Lead submit time (source UI submission time OR server received timestamp in webhook logs)
- T0a: Our system “lead received” log timestamp (server logs / dashboard)
- T1: “first SMS initiated/queued” timestamp (Twilio logs or provider logs)
- T2: “delivered” timestamp if available (optional; not required for KPI)
Store evidence:
- Screenshot or exported log line for T0 (Jotform submission list / HubSpot timeline / curl timestamp)
- Screenshot or log excerpt for T1 (SMS provider message log)
- Transcript of messages for STOP/HELP tests
Pass gate for agencies:
- Demonstrate at least 20 total trials across the 3 sources with timestamp table filled and evidence links.

Pre-Flight Checklist (do before running)
- Confirm SMS sending number is configured and can deliver to test phones.
- Confirm business hours and after-hours rules configured (see After-hours section).
- Confirm calendar/booking link configured OR a known “booking unavailable” fallback exists.
- Confirm dedupe key strategy (recommended: source + lead_phone + lead_created_at rounded to minute OR source_lead_id).
- Confirm deterministic fallback mode toggle exists (auto-trigger on LLM error/timeout).

Test Data Set
Use at least 2 test phones:
- Phone A: your main test device
- Phone B: second device for concurrency tests
Prepare these inputs:
- Valid US number (E.164 preferred): +1XXXXXXXXXX
- Invalid number examples: “123”, “+1555”, “abcdef”, “+199999999999999” (too long)
- Missing phone (empty/null)
Names/emails:
- Normal: “Test Lead”, test@example.com
- Strange chars: “A—B O’Neil”, weird+alias@example.com
Service intent:
- “Need a quote today” (high intent)
- “Just browsing” (low intent)

========================================
SECTION A — Deterministic Fail-safe Qualification Spec (LLM Down/Timeout)
========================================
Trigger conditions for deterministic mode
Enter deterministic mode if ANY:
- LLM call errors (5xx/4xx), times out, or returns empty output
- LLM output fails validation (missing required fields, contains disallowed content)
- Total time since T0 exceeds 30 seconds without sending first response (to protect <60s KPI)

Global compliance rules (always-on)
- STOP: immediately cease all outbound messages to that phone. Send final confirmation: “You’re opted out and will receive no more texts.” Then set contact status=DoNotContact.
- HELP: respond with: “Help: Reply STOP to opt out. For assistance email agent_bob_replit+lead-copilot@agentmail.to.” Do not continue qualification until user replies with a non-HELP keyword.
- Quiet hours/after-hours: do not attempt to book calls immediately; collect basics and promise next-business-day follow-up.
- Max messages without reply: 3 total outbound attempts then stop and escalate.

Deterministic flow (state machine)
State 0 — Immediate first response (send within 60s)
Message 1 (send ASAP):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out — I can help. What service do you need? (Reply 1) Repair  2) Install  3) Estimate  4) Other”
If no name available:
“Hi — thanks for reaching out to {business_name}. What service do you need? Reply 1) Repair 2) Install 3) Estimate 4) Other.”

State 1 — Collect job type
If user replies 1/2/3/4 or text:
Message 2:
“Got it. What’s the address or ZIP code for the job?”

State 2 — Collect location
After ZIP/address:
Message 3:
“When would you like this done? Reply 1) ASAP  2) This week  3) Flexible”

State 3 — Intent + booking
If within business hours AND calendar link healthy:
Message 4:
“Perfect. Here’s the quickest way to get scheduled: {calendar_link}. What’s the best time window for a call?”
If calendar link unhealthy OR booking API fails:
“Thanks — booking is temporarily unavailable. What’s the best time window to reach you today, and we’ll confirm by text?”
If after-hours:
“Thanks — we’re currently closed. What’s the best time tomorrow to reach you, and we’ll confirm first thing?”

Escalation rules
- If user asks pricing immediately: “We can give a fast quote after 2 quick details. What service is this for (repair/install/estimate/other)?”
- If user is angry/confused: stop automation; set NeedsHuman=TRUE; send: “Understood — a team member will follow up shortly. If urgent, email agent_bob_replit+lead-copilot@agentmail.to.”

========================================
SECTION B — End-to-End Test Plan (Manual)
========================================

B1. Generic Webhook JSON (curl/Postman)
Objective: confirm minimal payload triggers <60s SMS, handles missing/invalid phone safely, dedupes retries.
Setup: Identify the inbound endpoint URL and any required auth secret.

Sample payload (valid)
POST /lead
{
  "source": "webhook",
  "source_lead_id": "wh_001",
  "created_at": "2026-04-09T12:00:00Z",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Estimate",
  "notes": "Need a quote today"
}
Expected:
- System logs lead received (T0a)
- SMS Message 1 sent to phone within 60s (T1)
- CRM note created/updated if configured

Test cases (Webhooks)
1) Missing phone
Payload: phone omitted or null
Expected: no SMS attempt; create internal alert + record lead as “Missing phone”; if email present, optionally email request for phone; no crash.
2) Invalid phone
Payload: phone: “123”
Expected: reject/flag; no SMS; record reason “Invalid phone”; no retries loop.
3) Webhook retries (idempotency)
Send same payload 3x with same source_lead_id.
Expected: only one SMS thread started; subsequent requests return 200 OK but marked duplicate; CRM notes not duplicated.
4) Duplicate lead (same phone different lead_id within 5 minutes)
Expected: attach to same conversation; do not spam (max 1 new “Message 1” within dedupe window).


B2. Jotform (real form tool)
Objective: validate actual form submission triggers webhook ingestion, field mapping, and <60s first SMS.
Setup steps:
1) Create Jotform form with fields: First name, Last name, Phone, Email, Service (dropdown), Notes.
2) Enable webhook integration to our endpoint.
3) Submit via form preview and live link.

Test cases (Jotform)
1) Happy path submission (valid phone)
Expected: SMS within 60s; correct name merge; correct service context.
2) Missing phone (leave blank)
Expected: Jotform submits; our system flags missing phone; no SMS; optionally email follow-up.
3) Invalid phone (enter “123”)
Expected: flagged invalid; no SMS; recorded.
4) High concurrency
Submit 5 leads within 60 seconds (use different names/phones if possible).
Expected: 5 separate threads; no cross-talk; all first messages <60s.


B3. HubSpot (CRM)
Objective: ensure leads originating/managed in HubSpot trigger texting, and notes are formatted correctly in HubSpot timeline.
Setup options (choose based on integration):
Option A: HubSpot workflow → Webhook action (preferred manual test)
Option B: HubSpot form → workflow → webhook
Option C: If app has native HubSpot app, connect and test native event.

CRM note formatting requirements
Each conversation event should append a note with:
- Timestamp (ISO + local time)
- Direction (INBOUND/OUTBOUND)
- Channel (SMS)
- Message body (verbatim)
- Delivery status if available
Example note block:
[2026-04-09 09:14:12 PT] OUTBOUND SMS
Hi Test, it’s ACME Plumbing. Thanks for reaching out — I can help. What service do you need? Reply 1) Repair 2) Install 3) Estimate 4) Other
Status: queued

Test cases (HubSpot)
1) New contact created with phone
Expected: trigger to our endpoint; SMS <60s; note added to contact timeline.
2) Duplicate contact update triggers
Update same contact property twice.
Expected: dedupe prevents re-sending first message; note indicates “duplicate trigger suppressed”.
3) Note formatting
Verify multiline formatting preserved; no markdown garbage; no double-escaping; readable in HubSpot UI.

========================================
SECTION C — Cross-Cutting Fail-safe Behaviors (Must Test)
========================================

C1) STOP compliance
Steps:
- After receiving Message 1, reply “STOP”.
Expected:
- Immediate confirmation opt-out text.
- No further messages even if new lead arrives with same phone.
- Contact flagged DoNotContact.

C2) HELP compliance
Steps:
- Reply “HELP”.
Expected:
- Help message sent with opt-out instructions and contact email agent_bob_replit+lead-copilot@agentmail.to.
- Qualification pauses until next non-HELP reply.

C3) After-hours routing
Configure business hours (e.g., 9am–5pm local).
Steps:
- Submit lead outside hours.
Expected:
- First response still sent within 60s.
- Copy indicates closed and sets expectation for next business day.
- No booking link sent (or only “request time tomorrow”).

C4) Calendar link failure
Simulate by using invalid calendar link or forcing booking API error.
Expected:
- User is not sent a broken link repeatedly.
- System asks for preferred time window + escalates to human scheduling.

C5) Multiple concurrent leads
Steps:
- Submit 5 leads quickly.
Expected:
- No race conditions: correct lead gets correct texts; CRM notes attach to correct contact.

C6) LLM failure simulation
Steps:
- Force LLM timeout (if configurable) or disconnect LLM key in staging.
Expected:
- Deterministic flow triggers; Message 1 still within 60s; no blank/garbled messages.

========================================
SECTION D — Results Capture Tables
========================================

D1) Response-time results table (fill during run)
Columns:
Trial ID | Source (Webhook/Jotform/HubSpot) | Scenario | T0 (submit) | T0a (received) | T1 (SMS queued/sent) | Delta T0→T1 (sec) | Pass <60s? | Evidence link (screenshot/log) | Notes

D2) Compliance transcript table
Test | Phone | Inbound keyword | System response | Further messages sent after? (Y/N) | Pass? | Evidence

D3) Bug log (use if any fail)
Bug ID | Severity (P0/P1/P2) | Scenario | Steps to reproduce | Expected | Actual | Suspected cause | Fix recommendation | Owner | Status

Severity definitions
- P0: legal/compliance or spam risk (STOP not honored), or repeated texting to wrong person, or no first response.
- P1: breaks KPI frequently (>5% over 60s), booking broken, dedupe missing.
- P2: formatting issues, minor copy issues.

========================================
SECTION E — Current Known Risk List (Preemptive Bug/Fix Targets)
========================================
1) Idempotency on retries: Ensure source_lead_id is stored and suppress duplicates across 24h.
2) Phone normalization: Parse to E.164; reject invalid; never attempt send if invalid.
3) STOP/HELP universal intercept: must run before any other logic/LLM call.
4) Concurrency isolation: per-lead conversation state keyed by phone + lead_id to prevent cross-talk.
5) Calendar failure fallback: detect non-200 or timeout; switch to “time window” collection.
6) HubSpot note formatting: avoid JSON escaping; preserve newlines; consistent timestamp.

How to use this during pilots
- Run 20 trials total: 8 webhook (including retries/duplicates), 6 Jotform (including missing/invalid + concurrency), 6 HubSpot (including dedupe + note formatting).
- Fill the tables and store evidence in a shared folder.
- If any P0 occurs, pause onboarding and switch to deterministic-only mode until fixed.

End of document.