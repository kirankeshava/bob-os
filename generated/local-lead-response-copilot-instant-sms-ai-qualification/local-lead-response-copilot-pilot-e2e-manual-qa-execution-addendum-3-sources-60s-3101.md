# Local Lead Response Copilot — Pilot E2E Manual QA Execution Addendum (3 Sources, <60s Proof, Fail-safe Behaviors)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:24:21.055Z

---

Purpose
This addendum turns the existing manual QA packet into a pilot-executable run that produces: (1) timestamped proof that first SMS response is <60s, (2) transcripts/evidence for STOP/HELP and after-hours behavior, and (3) a clear bug list tied to churn risk. This is intentionally manual (no automation) per CEO directive.

Legitimacy references (use in any pilot comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources
1) Generic Webhook JSON (any ad/form tool -> webhook)
2) Jotform (real form tool)
3) HubSpot (CRM record update + note formatting)

KPI Definition: “First response <60s”
Start time (T0): moment the lead is submitted (form submit confirmation shown OR webhook sender timestamp).
End time (T1): moment the first outbound SMS is sent (provider/message log timestamp) OR received on test phone (if provider logs are unavailable).
Metric: Δ = T1 - T0.
Pass criteria: p50 < 30s and p95 < 60s across 20 trials (minimum). If only 10 trials are possible in early pilot, require max < 60s and document sample size.
Evidence to store per trial: screenshot of submission confirmation (or webhook sender log), screenshot of outbound message log (or phone receipt timestamp), plus the raw payload used.

60-minute execution plan (pilot run)
Prep (10 minutes)
1) Choose an “open hours” window and an “after-hours” window to test.
2) Have 2 test phones if possible (or 1 phone plus one colleague). Ensure at least one number is mobile-capable.
3) Create a simple naming convention for trials: SRC-## (e.g., WEB-01, JF-02, HS-03).

Run (40 minutes)
- Execute 20 trials total:
  - Webhook: 8 trials
  - Jotform: 8 trials
  - HubSpot-driven (if supported as a trigger): 4 trials
- Include edge cases below (mix across sources).

Wrap (10 minutes)
- Compute response times (Δ) and record p50/p95.
- Extract top 5 issues by severity.

Edge-case matrix (must cover)
A) Missing phone
B) Invalid phone
C) STOP
D) HELP
E) After-hours
F) Multiple concurrent leads (5 within 30 seconds)
G) Calendar link failure
H) Webhook retries
I) Duplicate leads
J) CRM note formatting (HubSpot)

Copy/paste test payloads
1) Generic Webhook JSON (baseline)
POST /webhook/lead
{
  "event_id": "evt_WEB_01",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550101",
    "email": "test.lead@example.com",
    "service": "Water Heater Repair",
    "zip": "94107",
    "message": "Need someone today if possible"
  },
  "meta": {
    "ip": "127.0.0.1",
    "user_agent": "QA-Agent"
  }
}
Expected:
- First SMS sent to +14155550101 within 60s.
- If LLM is healthy: may ask qualifying question(s).
- If LLM fails/timeout: deterministic flow starts (see below).
- CRM note (if configured) created with standardized formatting.

2) Generic Webhook JSON (missing phone)
{
  "event_id": "evt_WEB_02",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:03:00Z",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "phone": "",
    "email": "nophone@example.com",
    "service": "Drain Cleaning",
    "zip": "94107",
    "message": "Clogged sink"
  }
}
Expected:
- NO outbound SMS attempt.
- Create internal task/CRM note: “Missing phone; cannot text.”
- Optional email to business owner (not lead) if that’s part of ops.

3) Generic Webhook JSON (invalid phone)
{
  "event_id": "evt_WEB_03",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:05:00Z",
  "lead": {
    "first_name": "BadPhone",
    "last_name": "Lead",
    "phone": "12345",
    "email": "badphone@example.com",
    "service": "HVAC Repair",
    "zip": "94107",
    "message": "AC not cooling"
  }
}
Expected:
- NO outbound SMS attempt.
- CRM note includes: “Invalid phone format; manual follow-up required.”

4) Duplicate lead (same phone + same source within window)
Send WEB-01 again with:
- event_id = evt_WEB_01_DUP
- same phone
Expected:
- Deduped: do not send a second “first message” within dedupe window.
- CRM note: “Duplicate lead suppressed (reason: same phone within X minutes).”

5) Webhook retry (same event_id)
Resend identical payload with identical event_id “evt_WEB_01”.
Expected:
- Idempotent: no second SMS, no second CRM note.
- Log indicates “replay/idempotent hit”.

Jotform mapping checklist (real form tool)
Create a free Jotform with fields:
- First Name
- Last Name
- Phone Number
- Email
- Service Needed (dropdown)
- ZIP Code
- How soon? (Today / This week / Just quote)
- Notes
Expected mapping into webhook/lead object:
first_name, last_name, phone, email, service, zip, message (Notes + How soon)
Test cases to run through Jotform:
- Normal lead
- Missing phone
- Invalid phone
- After-hours submission
- 5 rapid submissions (concurrency)

HubSpot (CRM) expected note formatting
When a lead is created/updated, a note should be appended in a consistent format to avoid agency complaints.
Expected note template (copy spec):
Title: “Lead Copilot Qualification Transcript”
Body (example):
---
Source: {source}
Lead: {first_name} {last_name}
Phone: {phone}
Email: {email}
Service: {service}
Submitted At: {submitted_at}
First SMS Sent At: {first_sms_sent_at}
Response Time: {response_time_seconds}s
Mode: {LLM|DETERMINISTIC}
Status: {Qualified|Unqualified|Needs human}

Transcript:
Q1: {question_1}
A1: {answer_1}
Q2: {question_2}
A2: {answer_2}
...

Booking:
- Outcome: {Booked|Sent link|Failed}
- Calendar link: {url or “N/A”}
- Failure reason (if any): {reason}
---
Pass criteria:
- No broken markdown/HTML.
- Newlines preserved.
- Timestamp fields present.
- Transcript present even in deterministic mode.

Deterministic fallback flow (LLM down / timeout safe-mode)
Trigger conditions:
- LLM API error, timeout > 3s, empty response, or safety block.
- Any parsing failure.
Global rules:
- Always identify business intent and opt-out info.
- Never claim to be a human.
- STOP immediately halts messages; HELP provides assistance.
- Max messages without user response: 2; then stop and mark “Needs human”.

Message 1 (immediate)
“Hi {first_name}, this is the automated assistant for {BusinessName}. Thanks for reaching out about {service}. What’s the job address ZIP code?”

Branching
- If user replies a 5-digit ZIP: proceed.
- Else: “Got it—what’s the 5-digit ZIP code for the service address?” (one retry)
- If still invalid/no response after 5 minutes: mark Needs human.

Message 2
“Thanks. When would you like service? Reply 1) Today 2) This week 3) Just a quote”

Branching
- If reply contains 1/2/3: proceed.
- Else: “Reply 1 for Today, 2 for This week, or 3 for Just a quote.” (one retry)

Message 3 (qualification close)
“Last question—what’s the best time to call you? Reply with a time window (e.g., ‘2–4pm’)”

Escalation
- After collecting ZIP + urgency + best time: create CRM note and notify human/route to booking.
- If calendar booking is enabled: send booking link.
- If calendar link fails: send fallback message below.

Calendar failure safe message
“Thanks—our scheduling link is temporarily unavailable. A team member will call you at {best_time} to confirm. If urgent, reply URGENT.”

STOP/HELP compliance
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: respond once: “You’re opted out and will no longer receive texts.” Set contact do-not-text.
- If inbound contains “HELP”: respond: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Pass criteria:
- After STOP, no further outbound messages for that phone.

After-hours behavior (safe default)
Define after-hours window (example): 6pm–8am local time.
If lead arrives after-hours:
- Send one acknowledgement within 60s:
  “Thanks for reaching out—our team is currently closed. We’ll follow up first thing at {open_time}. If this is urgent, reply URGENT.”
- Do not continue qualification questions unless user replies URGENT.
- Create CRM note marking after-hours and expected follow-up time.

Concurrency test (5 leads in 30 seconds)
Steps:
- Submit 5 leads rapidly (unique phones).
Expected:
- All receive first SMS within 60s.
- No cross-talk (transcripts/notes never mix across leads).
- Rate limits handled gracefully (queueing allowed; still must meet KPI or document breach).

Dedupe + retry policy spec (for manual verification)
Definitions
- Idempotency key: event_id when present; else hash(source + phone + submitted_at rounded to 1 min).
- Dedupe window: 10 minutes (same phone + same source).
Expected behavior
- Same event_id replay: suppress all side effects (SMS + CRM note).
- New event_id but same phone+source inside window: suppress duplicate “first SMS”; add CRM note “duplicate suppressed”.
- Outside window: allow new conversation; append to existing CRM timeline.

Results table (paste into sheet)
Columns:
Trial ID | Source | Scenario | T0 submit time | T1 first SMS time | Δ seconds | Mode (LLM/DET) | STOP/HELP ok (Y/N/NA) | After-hours ok (Y/N/NA) | Dedupe ok (Y/N/NA) | CRM note ok (Y/N/NA) | Evidence links | Notes/Bugs

Bug triage rules (churn-focused)
Severity 0 (drop everything): Double-texting after STOP; texting invalid/missing phone; sending after STOP; >60s response on most trials.
Severity 1: After-hours continues qualification without consent; calendar failure sends broken link with no fallback; CRM note unreadable.
Severity 2: Minor formatting issues; non-critical copy tweaks.

Pilot communication snippet (if needed)
“If you’d like to verify reliability before going live, we can run a 20-lead pilot QA pass across your lead sources and record evidence that first response is under 60 seconds. Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Questions: agent_bob_replit+lead-copilot@agentmail.to.”
