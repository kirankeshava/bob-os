# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safes, Deterministic Mode) + Results/Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:24:34.441Z

---

Business context
Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof/legitimacy URL to share with pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/contact for pilot comms: agent_bob_replit+lead-copilot@agentmail.to

Objective
Run a manual end-to-end (E2E) QA pass during early agency/customer pilots (no automation) to:
1) Verify first outbound SMS is sent within <60 seconds of lead creation for 3 lead sources.
2) Validate fail-safe behaviors for common edge cases (STOP/HELP, missing/invalid phone, after-hours, retries, dedupe, concurrency, calendar failures).
3) Ensure CRM logging is correctly formatted and useful (HubSpot notes).

Lead sources under test (minimum 3)
A) Generic Webhook JSON (any form/ads tool)
B) Jotform (real form tool)
C) HubSpot CRM (real CRM)

KPI definition + evidence (must collect)
KPI: First SMS sent within 60 seconds of lead submission/creation.
Record these timestamps (screenshots or logs acceptable):
T0 = Lead created (form submit timestamp, webhook received timestamp, or CRM create time)
T1 = Outbound SMS requested/queued (app log if available)
T2 = Outbound SMS delivered/sent (provider log if available) or received on test phone
Pass if (T2 - T0) ≤ 60 seconds (fallback to (T1 - T0) if delivery timestamps unavailable; note limitation).
Sample size target: 20 total trials across sources (minimum 5 per source), plus edge-case tests.

Test environment prerequisites
- One dedicated test phone number that can receive SMS and can send replies (“STOP”, “HELP”, short answers).
- Access to message logs (Twilio or equivalent) OR the product’s internal message event log.
- Access to webhook endpoint URL for Generic Webhook + any shared secret/header requirements.
- For Jotform: free account + form with name/phone/service fields.
- For HubSpot: free dev/test portal + ability to create contacts/notes via workflow/webhook.

Golden path (baseline) — run once per source
Goal: confirm normal qualification + booking handoff.
Steps:
1) Create a lead with valid US phone (E.164 or standard 10-digit).
2) Verify first SMS arrives within 60s.
3) Reply with concise answers to qualification questions.
4) Verify outcome: booked call/appointment OR clear CTA with scheduling link.
5) Verify CRM logging created/updated correctly (HubSpot note).
Evidence to store: timestamps + transcript + CRM note screenshot.

Edge-case test matrix (execute across sources where applicable)
1) Missing phone
- Input: submit lead without phone.
- Expected: no SMS attempt; lead is flagged “Phone Missing”; optionally email/internal alert; CRM note indicates missing phone.
- Pass criteria: zero outbound SMS events; clear internal record.

2) Invalid phone
- Input: 123, non-US length, letters, or malformed.
- Expected: validation fails; no SMS; lead flagged “Invalid Phone”; CRM note captures raw value.

3) STOP compliance
- Input: after first SMS, reply “STOP”.
- Expected: immediate confirmation message per provider policy (if configured) and permanent suppression of further outbound messages to that number.
- Pass: no further messages on subsequent triggers for same phone; suppression persists across sources.

4) HELP compliance
- Input: reply “HELP”.
- Expected: help message includes business identification + support email agent_bob_replit+lead-copilot@agentmail.to and opt-out instruction.

5) After-hours behavior
- Configure business hours (example: Mon–Fri 8am–6pm local).
- Input: lead created outside hours.
- Expected: immediate acknowledgement SMS within 60s stating they’ll be contacted next business day OR offering scheduling link; no aggressive multi-message qualification if policy says defer.
- Pass: messaging matches policy; no booking promises if calendar closed.

6) Multiple concurrent leads (load/concurrency)
- Input: submit 5 leads within 60 seconds (different phones).
- Expected: each gets first SMS within 60s; no cross-contamination of names/answers; correct threading.
- Pass: transcripts show correct personalization; no message mix-ups.

7) Calendar link failures
- Simulate: provide invalid/expired scheduling link or force booking API failure.
- Expected: system apologizes + offers alternative: “Reply with preferred times” OR “We’ll call you shortly” and escalates to human.
- Pass: no dead-end; internal alert created.

8) Webhook retries
- Input: resend same webhook event (same lead_id) 3x.
- Expected: dedupe prevents duplicate SMS blasts; only one conversation started.
- Pass: at most one outbound conversation; CRM note indicates deduped event.

9) Duplicate leads (same phone, new submission)
- Input: same phone submits twice within 10 minutes.
- Expected: either merge into existing thread with a single “Thanks—got it” message or suppress duplicate outreach; no spam.
- Pass: defined behavior is consistent and logged.

10) CRM note formatting (HubSpot)
- Expected note template (exact):
  Title line: “Lead Copilot Qualification Summary”
  Body fields (each on new line):
  - Source: <Webhook|Jotform|HubSpot>
  - Lead Name: <name or blank>
  - Phone: <E.164>
  - Service Requested: <value>
  - ZIP/Area: <value>
  - Urgency: <value>
  - Budget/Range: <value>
  - Appointment: <Booked/Not Booked> <date/time if booked>
  - Transcript Link or Inline Transcript: <short summary + last 3 messages>
  - Status: <Qualified|Unqualified|Needs Human|Opted Out>
- Pass: note is readable, consistent, and attached to correct contact/deal.

Fail-safe behavior: deterministic qualification mode (LLM down/timeout)
Trigger conditions (any):
- LLM API error, timeout > 5 seconds, malformed response, or safety refusal.
- Provider webhook indicates message delivery failure patterns.

Deterministic script (exact messages)
Message 1 (first response; must be <60s):
“Hi {{first_name}}, thanks for reaching out—this is the scheduling assistant. Quick questions so we can get you booked. What service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other”

If reply is unclear or empty (1 retry):
“Got it—reply with 1, 2, 3, or 4. If it’s something else, reply 4 and describe it.”

Question 2 (location):
“Thanks. What’s your ZIP code (or neighborhood)?”

Question 3 (urgency):
“When do you want this handled? Reply: 1) ASAP 2) This week 3) Not sure”

Question 4 (availability):
“What’s the best time for a call? Reply: 1) Morning 2) Afternoon 3) Evening”

Handoff / booking:
- If calendar is available: “Perfect—grab a time here: {{calendar_link}}. If you prefer, reply with 2 times that work and we’ll confirm.”
- If calendar is unavailable/failing: “I’m having trouble with scheduling right now. Reply with 2 times that work for you and a human will confirm shortly.”

Escalation rule:
- If user replies with anger, legal threats, or 2+ unrecognized responses: stop automation and create “Needs Human” alert; send: “Thanks—someone will follow up shortly.”

STOP/HELP deterministic responses
HELP: “Help: You’re texting with Lead Copilot scheduling assistant. Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
STOP: honor provider default; ensure suppression list is updated.

Results capture tables (paste into doc/spreadsheet)
Table A — KPI trials
Columns: Trial # | Source | Lead Identifier | T0 Lead Created | T1 SMS Queued | T2 SMS Received/Sent | Delta (T2-T0) | Pass/Fail | Notes | Evidence link

Table B — Edge cases
Columns: Case | Source | Input | Expected | Actual | Pass/Fail | Bug ID (if fail) | Evidence link

Bug log template
Bug ID: QA-###
Title:
Severity: P0 (reputation/compliance) / P1 (conversion) / P2 (minor)
Source(s):
Steps to reproduce:
Expected:
Actual:
Evidence:
Impact (conversion/churn risk):
Suggested fix:
Owner:
Status:

Known high-risk bug categories to watch
- Duplicate SMS blasts due to missing idempotency keys (P0/P1)
- STOP not persisting across sources (P0 compliance)
- Phone normalization issues (E.164 conversion, country code assumptions) (P1)
- After-hours messaging too aggressive or silent (P1)
- Calendar failures leading to dead end (P1)
- HubSpot notes overwriting vs appending; poor readability (P2/P1)

Execution order (fastest path during pilot)
1) Run Golden Path for Generic Webhook JSON (1 trial).
2) Run Golden Path for Jotform (1 trial).
3) Run Golden Path for HubSpot (1 trial).
4) Run STOP/HELP (once, any source).
5) Run missing/invalid phone (webhook + form).
6) Run retries + duplicates (webhook resends).
7) Run after-hours (simulate by toggling business hours or testing at night).
8) Run concurrency (5 quick leads).
9) Run calendar failure (disable link) and confirm escalation.

Definition of “verified <60s first response”
Verified when: at least 20 KPI trials recorded with evidence, and ≥ 95% pass rate with no P0 failures. Any P0 (STOP, duplicate blasting, incorrect recipient) blocks onboarding until fixed.
