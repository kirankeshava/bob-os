# Local Lead Response Copilot — Pilot Manual E2E Test Plan + Results (3 Lead Sources, <60s KPI, Fail-safe Behaviors)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:25:46.160Z

---

Overview
Goal: validate end-to-end lead intake → first SMS response (KPI <60 seconds) → qualification → booking/escalation across three lead sources: (1) Generic Webhook JSON, (2) Jotform (real form tool), (3) HubSpot (CRM). Validate fail-safe behaviors: missing/invalid phone handling, STOP/HELP compliance, after-hours routing, concurrency, calendar link failures, webhook retries, duplicate leads, and CRM note formatting.

Product/Legitimacy references for pilots
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email to include in any HELP/opt-out and human escalation messaging: agent_bob_replit+lead-copilot@agentmail.to

Definitions & KPI measurement
KPI: First Response Time (FRT) = timestamp of lead creation/receipt (T0) to timestamp of first outbound SMS attempt (T1). PASS if median FRT <60s and p95 FRT <60s during the run; any single FRT >120s is a FAIL requiring investigation.
Timestamps to capture:
- T0a: Lead submitted timestamp shown by source (Jotform submission time / HubSpot create time)
- T0b: Webhook received time in app logs (if available)
- T1: SMS provider “queued/sent” event time (or app log “first SMS triggered”)
Evidence to save per test case: screenshot/export of source submission, app log line showing intake, message log transcript, and (if applicable) CRM note record.

Test environment prerequisites (free-tier only)
1) One test business scenario (home services): “AC Repair – same-day estimates.”
2) One test recipient phone number owned by the operator. (Do not use random third-party numbers.)
3) Access to view outbound SMS logs/events (app logs or SMS console). No purchase required.
4) Jotform free form with fields: Full Name, Phone, Email, Zip, Service Needed (dropdown), Preferred Time (dropdown).
5) HubSpot free developer/test portal with a Contact object and Notes/Engagements enabled.

Lead source configurations
A) Generic Webhook JSON
Expected inbound JSON fields (minimum):
{
  "lead_id": "string-unique",
  "source": "webhook",
  "full_name": "Jane Doe",
  "phone": "+14155550123",
  "email": "jane@example.com",
  "service": "AC Repair",
  "zip": "94107",
  "timestamp": "2026-04-09T18:22:00Z"
}
Mapping expectations:
- phone → SMS destination
- full_name → personalization
- service/zip → qualification context
Deduping key recommendation: normalized phone + source + (optional) lead_id.

B) Jotform
Field mapping expectations:
- Name (first/last) → full_name
- Phone Number → phone
- Email → email
- Service Needed → service
- Zip → zip
- Preferred Time → preferred_time

C) HubSpot CRM
Creation path: either (1) HubSpot form submission creating a contact or (2) contact created via UI/import which then triggers workflow/webhook.
Expected mapping:
- Contact phone property → phone
- firstname/lastname → full_name
- lifecycle stage/deal info (if present) → context
Note formatting expectation (in HubSpot timeline note):
Title: “Lead Copilot Qualification Summary”
Body (plain text; avoid malformed markdown):
- Lead Source: <source>
- Name: <full_name>
- Phone: <normalized>
- Service: <service>
- Zip: <zip>
- Disposition: Qualified / Not Qualified / After-hours Pending / Opted Out
- Answers:
  Q1: …
  Q2: …
- Booking: <calendar link> or “Human follow-up requested”
- Timestamps: T0=<…> T1=<…> FRT=<…>

Deterministic fail-safe qualification flow (LLM down/timeout safe mode)
Trigger conditions (any): LLM error, LLM timeout >8s, tool-call failure, or missing critical context.
Rules:
- Never ask more than 3 questions before offering a booking link or human handoff.
- If phone invalid/missing: do not send SMS; log and optionally email/internal alert.
- STOP must immediately opt-out and suppress future messages.

Message Script (Deterministic)
0) First SMS (always within KPI)
“Hi {{first_name}}, it’s Bob from {{business_name}}. Thanks for reaching out about {{service}}. I can help you get booked fast—can I ask 2 quick questions?”
If after-hours mode enabled:
“Hi {{first_name}}, it’s Bob from {{business_name}}. We’re currently closed, but I can get your request queued. Can I ask 2 quick questions so we can call/text you first thing?”
Include HELP footer only when user asks HELP; keep first message short for speed.

If user replies YES / anything:
Q1) “What’s the address or ZIP for the job?”
Q2) “What’s the best time window for a call/visit: Morning, Afternoon, or Evening?”
Q3) “Is this urgent (no heat/AC, leak, safety issue) — yes or no?”

Routing:
- If urgent=yes and after-hours: send “Thanks — we’ll prioritize this at open. If it’s an emergency, please call your local emergency service. Reply STOP to opt out.” and create CRM note as After-hours Pending.
- If urgent=yes and business hours: send booking link (or call offer) and flag as Qualified.
- If urgent=no: send booking link.

Booking link failure fallback:
If calendar link generation fails or returns non-200:
“Thanks. Our booking link is temporarily down. Reply with a good time for a call today, or email us at agent_bob_replit+lead-copilot@agentmail.to and we’ll confirm ASAP.”
Log incident; create CRM note with Disposition=Human follow-up requested.

STOP/HELP compliance
- On inbound “STOP” (or STOP variants): respond once: “You’re opted out and will no longer receive messages. Reply START to opt back in.” Then suppress all future outbound.
- On inbound “HELP”: respond once: “Help: This is an automated assistant for {{business_name}} to schedule appointments. Email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Test STOP/HELP from both qualified and unqualified states.

Test cases (execute in one session)
For each test: record T0a, T0b, T1, compute FRT, save evidence, and mark PASS/FAIL.

TC1 Baseline (Webhook JSON, valid phone)
Input: valid +1 E.164 phone.
Expected: first SMS <60s; proceeds through Q1/Q2; booking link or handoff; CRM note created if HubSpot connected.

TC2 Missing phone (all sources)
Input: phone omitted.
Expected: no SMS attempt; system logs “missing phone”; creates CRM note (if applicable) stating unable to text; optional internal alert.

TC3 Invalid phone (letters/too short)
Input: “555-ABCD”.
Expected: validation fails; no SMS; logged as invalid; no retries to SMS provider.

TC4 STOP behavior
Flow: submit lead, receive first SMS, reply “STOP”.
Expected: opt-out confirmation; subsequent automated messages suppressed even if workflow would continue.

TC5 HELP behavior
Flow: submit lead, reply “HELP”.
Expected: help template includes support email agent_bob_replit+lead-copilot@agentmail.to and STOP instructions.

TC6 After-hours routing
Set business hours closed; submit lead.
Expected: after-hours first message (no promise of immediate call), questions ok; disposition After-hours Pending; no booking if policy forbids after-hours booking.

TC7 Multiple concurrent leads (burst)
Submit 5 leads within 30 seconds via webhook/Jotform.
Expected: all get first SMS within KPI; no cross-talk (answers tied to correct lead); no rate-limit failure.

TC8 Calendar link failure
Simulate link failure (disable calendar or use invalid URL).
Expected: fallback message (booking down) + human follow-up; CRM note includes failure flag.

TC9 Webhook retries
Send same lead_id twice (or identical payload) with retry header.
Expected: dedupe prevents duplicate conversations; log shows “duplicate ignored” or merges.

TC10 Duplicate leads via different sources
Same phone submits Jotform then HubSpot form within 10 minutes.
Expected: dedupe merges or suppresses second outreach; at minimum does not send two initial SMS messages back-to-back.

TC11 HubSpot note formatting
After qualification, verify note title/body exactly as specified; verify newlines render; verify no broken JSON/markdown.

Results table (fill during execution)
Columns:
- Test Case ID
- Source
- Input summary
- T0a
- T0b
- T1
- FRT (sec)
- PASS/FAIL
- Evidence links (screenshots/log IDs)
- Observed issues

Bugs/Fixes log (fill during execution)
Fields:
- Bug ID
- Severity (P0 compliance / P1 revenue / P2 annoyance)
- Scenario/Test Case
- Steps to reproduce
- Expected vs Actual
- Impact (churn/compliance risk)
- Suggested fix (validation, dedupe key, timeout handling, messaging)

Exit criteria (what “verified” means)
- At least 20 total lead trials across sources (min 5 per source).
- Median FRT <60s and p95 FRT <60s; no single FRT >120s.
- STOP and HELP behave correctly (one response, then suppression for STOP).
- Deterministic fallback successfully completes Q1/Q2 and routes to booking/handoff when LLM is forced to fail.
- HubSpot note formatting is readable, consistent, and includes timestamps + disposition.

Operator notes
Do not run STOP tests against real customer numbers. Use only the operator’s test device. Keep transcripts; if sharing with agencies, redact phone numbers. If any compliance uncertainty appears, pause outreach until STOP/HELP is correct.