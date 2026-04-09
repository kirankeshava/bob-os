# Local Lead Response Copilot — Pilot E2E QA Runbook (3 Sources) + <60s KPI Evidence + Deterministic Fallback + Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:20:27.677Z

---

Overview
This runbook validates end-to-end lead intake → first SMS → qualification → booking handoff across 3 lead sources:
(1) Generic Webhook JSON, (2) Jotform, (3) HubSpot CRM.
Goal: protect reputation in early pilots by proving response-time (<60s) and safe behavior under failure.

System under test (customer legitimacy references for outreach/templates)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

1) KPI: <60s First Response — Evidence Standard
Definition
T0 = lead submitted/received by our system.
T1 = first outbound SMS created/sent (provider accepted) OR first SMS delivered (if delivery receipt is available).
Primary KPI: (T1 - T0) <= 60 seconds.

How to capture timestamps (manual but auditable)
Record all timestamps in a results table for each trial.
Evidence to capture per trial:
- Source-side timestamp (form submission time, webhook request time, or HubSpot create time)
- Our system log timestamp for “lead received” and “first message queued/sent”
- SMS provider log timestamp (if available)
Store: screenshot(s) or exported log snippet for at least 5 samples per source.

Sample size for pilots
Minimum per source: 20 leads (60 total) during first serious pilot window.
Compute:
- Pass rate = % of trials <= 60s
- P50 and P95 manually (sort response times, take median and 95th percentile)
Acceptance gate (pilot-ready):
- 95% of leads <= 60s AND no single lead > 180s without an explicit system incident record.

2) Test Environment Setup (Free-tier friendly)
A) Generic Webhook JSON
Tooling: curl or Postman.
Requirement: a public endpoint URL for inbound webhook (provided by product).

B) Jotform (real form tool)
Create a free Jotform account and a test form with fields:
- Full Name (required)
- Phone (required)
- Email (optional)
- Service Needed (dropdown)
- Zip Code
Configure Jotform webhook integration to POST to our inbound webhook endpoint.

C) HubSpot (CRM)
Create free HubSpot developer/test account.
Create a test Contact and a simple form (optional) OR use HubSpot workflow/webhook (depending on integration).
Requirement: define what object triggers (Contact created, Form submission, Deal created).

3) Canonical Lead Object (Expected Internal Mapping)
We normalize inputs from all sources into:
- lead_id (source-specific id)
- source (webhook|jotform|hubspot)
- full_name
- phone_e164
- email
- service
- location (zip/city)
- created_at (T0)
- meta (raw payload stored)

Phone normalization rule (expected)
- Convert to E.164 when possible (US: +1XXXXXXXXXX)
- Reject if invalid length/characters.

4) Deterministic Fallback Qualification Flow (LLM timeout/error safe mode)
Trigger conditions
Enter deterministic mode when:
- LLM call errors, times out (e.g., >3s), or returns empty/unsafe output
- Confidence/validation fails (e.g., missing required entities)

Global rules
- Never claim appointment is confirmed unless booking system confirms.
- Respect STOP/HELP immediately (see compliance tests).
- Limit to 3 questions max before offering human handoff.
- If user is upset/hostile: stop qualification and offer human callback.

Script (copy/paste messages)
Message 1 (immediate):
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need help with? (Reply 1) Repair 2) Install 3) Quote 4) Other”

If reply is 4/Other:
“Got it—briefly describe what you need.”

Message 2 (timed after valid service):
“Thanks. What’s your ZIP code?”

Message 3 (timed after zip):
“Great—when would you like to get this done? (Reply 1) ASAP 2) This week 3) Next week”

Handoff message (after 3 answers or if user asks to book):
“Perfect. Here’s the booking link: {{calendar_link}}. If that link doesn’t work, reply ‘CALL’ and we’ll reach out shortly.”

Escalation rules
- If user replies “CALL”: create a task for human callback and send:
“Got it—someone will call you shortly. If you need to stop messages, reply STOP.”
- If calendar_link missing/unavailable: do not send a broken link. Send:
“Thanks—our booking link is temporarily unavailable. Reply with the best time to call you (morning/afternoon/evening), or reply CALL.”

5) Executable Test Cases (Steps + Expected Results)
Test Case 1: Happy path (each source)
Steps
1) Submit lead with valid phone.
2) Observe first SMS.
3) Answer 2–3 qualification prompts.
4) Verify booking link/handoff.
Expected
- First SMS <=60s.
- Qualification stays on-topic.
- CRM note (HubSpot) includes transcript and status.

Test Case 2: Missing phone
Steps
1) Submit lead with blank phone (if source allows) or remove phone field from webhook payload.
Expected
- System does NOT attempt SMS.
- System logs “missing phone” and routes to email/internal alert.
- No repeated retries creating spam.

Test Case 3: Invalid phone
Inputs
- “123”, “(555) 555-555”, “abcdef”, “+199999999999999”
Expected
- Rejected with clear reason.
- No SMS attempted.
- Dedup does not keep retrying invalid numbers.

Test Case 4: STOP compliance
Steps
1) Receive initial SMS.
2) Reply STOP.
3) Verify no further messages.
4) Resubmit a new lead with same phone.
Expected
- Immediate suppression.
- Internal record marks number as opted-out.
- New inbound lead does not trigger SMS; create internal task instead.

Test Case 5: HELP compliance
Steps
1) Reply HELP.
Expected
- Return support message:
“Help: You’re receiving messages about your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

Test Case 6: After-hours behavior
Setup
Define business hours (e.g., 8am–6pm local).
Steps
1) Submit lead after hours.
Expected
- First SMS still goes out <=60s but sets expectation:
“Thanks—our team is currently offline. We’ll follow up at {{next_business_time}}. If urgent, reply CALL.”
- No promises of immediate call.

Test Case 7: Multiple concurrent leads
Steps
1) Submit 10 leads within 30 seconds.
Expected
- No cross-talk (each phone gets its own thread).
- Response-time stays <=60s for at least 9/10 (note infra limits).

Test Case 8: Calendar link failure
Steps
1) Force calendar_link = null OR simulate booking provider down.
Expected
- Do not send broken link.
- Send fallback callback prompt and create internal task.

Test Case 9: Webhook retries
Steps
1) Send the same webhook payload 3 times with same source lead_id.
Expected
- Idempotent: only one conversation created.
- System returns 200 OK quickly and logs dedupe.

Test Case 10: Duplicate leads (different IDs, same phone)
Steps
1) Submit two leads with same phone within 5 minutes.
Expected
- Either: merge into same conversation OR second triggers “We already got your request—anything else to add?”
- No double-booking spam.

Test Case 11: HubSpot CRM note formatting
Expected note template (exact)
Title: “Lead Copilot SMS Transcript — {{date}}”
Body:
Source: {{source}}
Lead ID: {{lead_id}}
Phone: {{phone_e164}}
Status: {{Qualified|Unqualified|Opted-out|Needs human}}
Response time: {{seconds}}s
Transcript:
- OUT {{timestamp}}: {{text}}
- IN  {{timestamp}}: {{text}}
...
Errors/Warnings:
- {{any validation errors or fallback-mode triggers}}

Pass
- New note appended/created on correct Contact.
- Formatting preserved (no JSON blobs unless in a collapsible section).

6) Results Capture Tables (paste into docs/sheets)
Per-trial table columns
- Trial #
- Source (webhook/jotform/hubspot)
- T0 (source submit time)
- T1 (first SMS send/accept time)
- Response time (sec)
- Scenario (happy/stop/after-hours/etc.)
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

Incident log (when T1-T0 > 60s)
- Timestamp
- Suspected root cause (queue lag/provider/LLM/DB)
- Mitigation taken (fallback mode, retry, manual follow-up)

7) Bug/Fix List (Prioritized)
P0 (must fix before agency pilots scale)
1) STOP not globally suppressing future messages
Fix: persistent opt-out list keyed by phone_e164; check before any send.
2) Non-idempotent webhook intake causing duplicate SMS
Fix: idempotency key = source + lead_id; also time-window dedupe by phone.
3) Invalid phone passes through and triggers provider errors
Fix: strict E.164 validation; reject + log + internal notification.
4) Calendar link missing still sent as empty/invalid URL
Fix: guardrails; if link invalid, route to callback workflow.

P1 (fix quickly)
5) After-hours messaging lacks expectation setting
Fix: template + next business time calculation.
6) Concurrency causes thread mix-ups
Fix: ensure conversation key is phone_e164; lock per conversation.

P2 (polish)
7) HubSpot note formatting inconsistent
Fix: enforce a single plain-text template; keep raw JSON in an appendix.

8) How to Run This in <60 Minutes During First Pilot
1) Run 5 happy-path trials per source (15 total) and record response times.
2) Run STOP/HELP tests once using a real phone.
3) Run 1 concurrency burst (10 leads) using webhook payload generator.
4) Run calendar failure simulation once.
Output: one results table, one incident log, and a ranked bug list to action.
