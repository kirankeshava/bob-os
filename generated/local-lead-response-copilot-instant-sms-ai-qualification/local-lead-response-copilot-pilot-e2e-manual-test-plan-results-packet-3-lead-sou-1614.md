# Local Lead Response Copilot — Pilot E2E Manual Test Plan + Results Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:53:48.919Z

---

Business refs (use in any customer comms / pilot coordination)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

Scope / Goal
Validate end-to-end lead intake → first SMS response → qualification → booking/escalation across 3 sources:
1) Generic Webhook JSON (any form/ad tool)
2) Jotform (real form tool)
3) HubSpot (CRM)
Primary KPI: first outbound SMS sent within 60 seconds of lead submission (p95 target <60s for pilot).
Secondary: safe, compliant behavior when data is missing/invalid or when LLM/downstream services fail.

Environments / Preconditions (Pilot-friendly, no paid tooling assumed)
- A test SMS sending number exists in the product (operator has access to logs; no spend authorized by this QA doc).
- Product can accept inbound leads via (a) webhook endpoint, (b) Jotform webhook integration, (c) HubSpot workflow/webhook or integration.
- Calendar/booking step configured (can be a link or embedded scheduling). If not configured, test “calendar failure” behavior using a deliberately invalid link.
- Timezone + business hours configured.

Evidence to Capture (Required)
For every trial, record 4 timestamps (store as screenshot/log line where possible):
T0: Lead submitted timestamp (source-side: Jotform submission time / HubSpot create time / webhook POST time).
T1: Product lead received timestamp (server log/event log).
T2: SMS queued/sent timestamp (provider log or app log).
T3: Lead first SMS delivered timestamp if available (optional; carrier latency can vary).
KPI metric: Δ(T2 − T0) must be <60s.

Sample Size / Acceptance
- Run at least 20 total trials across 3 sources.
- Minimum distribution: 6 webhook, 7 Jotform, 7 HubSpot.
- Pass gate: p95 of Δ(T2 − T0) <60s and no single trial >90s unless a known external outage is documented.

Lead Sources — Setup & Execution
A) Generic Webhook JSON
- Use curl/Postman to POST to the product’s inbound webhook endpoint.
- Ensure idempotency field is present (lead_id) and test dedupe.

Webhook Payload Templates
1) Valid lead
{
  "lead_id": "qa-webhook-001",
  "source": "webhook",
  "first_name": "Pat",
  "last_name": "Test",
  "phone": "+14155550100",
  "email": "pat.test@example.com",
  "service": "water heater repair",
  "zip": "94107",
  "notes": "Interested ASAP"
}

2) Missing phone
{
  "lead_id": "qa-webhook-002",
  "source": "webhook",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "roof leak"
}
Expected: no outbound SMS attempt; lead flagged “needs phone”; create CRM note/task; optional email fallback if configured.

3) Invalid phone
{
  "lead_id": "qa-webhook-003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "1234",
  "service": "HVAC tune-up"
}
Expected: validation failure; do not send SMS; log error; request corrected phone via internal notification/CRM.

4) Duplicate lead (same lead_id)
POST the valid payload twice within 2 minutes.
Expected: second submission deduped; no second SMS; CRM note should indicate duplicate suppressed.

5) Retry simulation
- Send same payload with header "X-Retry-Count: 1" or re-POST after 10s.
Expected: idempotent handling; no double-send.

B) Jotform
Jotform Form Fields Required
- Name
- Phone
- Email (optional)
- Service needed (dropdown)
- “Best time” (optional)

Jotform Test Cases
- Standard submit with valid phone.
- Submit missing phone (if form allows) OR submit with invalid phone string.
- Submit after-hours (see after-hours scenario) by adjusting business hours or performing test outside window.
Evidence: Jotform submission receipt timestamp + product log + SMS sent time.

C) HubSpot CRM
HubSpot Objects
- Contact created (phone, firstname, lastname, email)
- Optional Deal creation
Integration expectation
- On contact create OR form submission event, product is triggered.
HubSpot Test Cases
- Create contact with valid E.164 phone.
- Create contact missing phone.
- Create contact with invalid phone.
- Duplicate: create contact twice with same phone/email or update existing contact.
HubSpot Note Formatting Requirements (verify)
- A single timeline note per conversation start with:
  - Lead source
  - First outbound SMS timestamp
  - Qualification transcript (Q/A lines)
  - Outcome (Booked / Needs human / Unreachable / Opted out)
  - Booking link used or failure reason
Formatting example:
[Lead Copilot] First SMS sent: 2026-04-09 14:03:12 UTC
Source: HubSpot Contact Create
Q1: What service do you need help with?
A1: Water heater repair
Q2: Is this urgent (today/this week/not urgent)?
A2: Today
Outcome: Escalated to human (urgent)

Core Scenarios (Run Across Sources)
1) <60s first response KPI
Steps: submit lead → record T0, T1, T2 → compute Δ.
Pass: Δ<60s.

2) Missing phone
Pass: no SMS sent; lead marked incomplete; creates internal alert/CRM note; does not crash pipeline.

3) Invalid phone
Pass: no SMS; validation error surfaced; stored for follow-up; no repeated retries.

4) STOP compliance
Steps: from the lead phone, reply “STOP”.
Pass:
- Immediate confirmation message (carrier/number dependent but app should send a confirmation where applicable).
- Lead is suppressed from further outbound messages.
- Any further triggers (retries/duplicates) do not send SMS.
- CRM note indicates opt-out.

5) HELP compliance
Steps: reply “HELP”.
Pass: returns help text including business identification and contact method (email agent_bob_replit+lead-copilot@agentmail.to) and opt-out reminder.

6) After-hours behavior
Config: set business hours (e.g., 8am–6pm local).
Steps: submit lead outside window.
Pass (choose one and be consistent):
- Option A: send immediate “We got it—we’ll text/call at 8am” + offer emergency keyword.
- Option B: suppress first SMS until open (not recommended for speed-to-lead positioning).
Also verify no booking is attempted if operator unavailable (unless 24/7).

7) Multiple concurrent leads
Steps: submit 5 leads within 10 seconds.
Pass:
- All 5 receive first SMS within 60s.
- No cross-talk: each conversation transcript remains bound to correct lead.
- No rate-limit failures; if rate-limited, system queues and still meets SLA or flags incident.

8) Calendar link failures
Setup: configure an invalid booking URL or simulate scheduler outage.
Pass:
- SMS should not present a broken link without apology/backup.
- Fallback: “Reply with 1) Morning 2) Afternoon 3) Evening” to collect availability and escalate to human for manual booking.
- CRM note captures failure reason and collected availability.

9) Webhook retries (at-least-once delivery)
Steps: re-send same webhook with same lead_id; or simulate client retry.
Pass:
- Idempotent; no duplicate SMS.
- Logs show retry recognized.

10) Duplicate leads (same phone different lead_id)
Steps: submit two leads with same phone within 5 minutes.
Pass:
- Suppress second outreach OR merge threads (define rule).
Recommended rule: if active thread <24h, append details to existing lead and do not restart qualification.

11) CRM note formatting
Pass:
- Notes are readable, consistently prefixed, include timestamps, include Q/A transcript and outcome.
- No raw JSON dumps unless behind a collapsible section.

Fail-safe Deterministic Qualification Mode (LLM Down / Timeout)
Trigger Conditions
- LLM API error OR timeout >3s (configurable) OR empty/invalid response.
- Also trigger if safety policy blocks content unexpectedly.

Deterministic Script (exact messages)
Message 1 (immediate after lead):
“Hi {first_name}, this is {BusinessName}. Got your request for {service}. I can help fast—what’s the address or ZIP where you need service?”

If user responds with ZIP/address → store.
Message 2:
“Thanks. What’s the issue? Reply with a short description (e.g., ‘no hot water’, ‘leak’, ‘won’t turn on’).”

Message 3:
“How urgent is this?
1) Emergency (today)
2) Soon (this week)
3) Not urgent”

Branching
- If “1 Emergency”: “Understood—someone will call you shortly. What’s the best time in the next 2 hours?” → escalate to human immediately.
- If “2 Soon” or “3 Not urgent”: “Great. What time works best for a call?
1) Morning
2) Afternoon
3) Evening”

Booking attempt
- If calendar available: “You can grab a time here: {booking_link}. If you prefer, reply with 1/2/3.”
- If calendar fails/unset: skip link and collect availability; escalate.

Silence handling
- If no reply after 5 minutes: send one reminder: “Just checking—still want help with {service}? Reply YES and I’ll get you scheduled.”
- If still no reply after 30 minutes: stop automation; mark “Unresponsive”; no spam.

STOP/HELP always overrides
- Any inbound “STOP”: set opt-out and cease.
- Any inbound “HELP”: send help text and cease qualification until user replies.

Results Capture Tables (copy/paste)
Trial Log
Columns: TrialID | Source | Scenario | T0 | T1 | T2 | Δ(T2-T0) | Pass/Fail | Evidence link/screenshot | Notes

Bug Log
Columns: BugID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Impact on churn | Suggested Fix | Owner | Status

Known High-Risk Bug Patterns to Watch For (and how to mark)
- Double-send on retries/duplicates (P0)
- STOP not honored (P0 compliance)
- Cross-thread contamination in concurrency (P0)
- >60s first SMS under load (P1)
- Calendar broken link without fallback (P1)
- HubSpot notes unreadable/raw JSON (P2)

Test Execution Checklist (operator-friendly)
1) Confirm business hours + timezone.
2) Confirm opt-out state reset for test numbers.
3) Run 6 webhook trials (include duplicate + retry).
4) Run 7 Jotform trials (include after-hours or adjust hours).
5) Run 7 HubSpot trials (include missing phone + note formatting check).
6) Run STOP/HELP using one valid lead thread.
7) Run 5-lead concurrency burst.
8) Force LLM failure (disable key / set timeout) and run deterministic flow once.
9) Summarize KPI: compute p50/p95/max for Δ.
10) File bugs with evidence links and recommended fix.

Reporting Format (to share with agencies if needed)
- One-page KPI summary (p95 <60s) + compliance statement (STOP/HELP verified) + fallback mode description.
- Provide legitimacy refs: website URL above + support email agent_bob_replit+lead-copilot@agentmail.to.
