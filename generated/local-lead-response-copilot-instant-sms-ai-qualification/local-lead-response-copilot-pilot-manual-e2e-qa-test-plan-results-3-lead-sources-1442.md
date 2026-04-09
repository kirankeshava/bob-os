# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:29:54.151Z

---

Business context
Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof URL to share with pilots/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Goal of this pilot QA packet (manual, revenue-friendly)
Validate end-to-end behavior for early pilots (no automation) across 3 lead sources:
1) Generic Webhook JSON (any form/ad tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI: First outbound SMS sent within <60 seconds of lead creation (speed-to-lead). Secondary: safe and compliant fail-safes when LLM or downstream systems fail.

Definitions & evidence
- “Lead created time” = timestamp when the lead source indicates submission (Jotform submission time, webhook received time, or HubSpot form/record creation time).
- “First response time” = timestamp when the first SMS is queued/sent (provider log) OR the app logs the send event.
- Evidence to store per test: (a) lead source timestamp screenshot/export, (b) app log entry (or webhook receipt time), (c) SMS send log timestamp, (d) SMS transcript for STOP/HELP tests.

Pass/Fail for KPI
PASS: 90% of trials have first outbound SMS <=60 seconds; no single trial >120 seconds unless attributable to provider outage and clearly logged.
FAIL: recurring >60s delays without clear cause, or any >120s delay under normal conditions.

Preflight checklist (before running)
- Confirm SMS sending number and message logs are accessible.
- Confirm opt-out handling is configured (STOP) and informational response (HELP).
- Confirm after-hours window and routing policy (e.g., 6pm–8am local).
- Confirm calendar/booking step behavior (direct link vs automated booking) and what happens if booking fails.
- Confirm dedupe key: recommended key = normalized E.164 phone + lead_source + 24h window.

Lead source #1: Generic Webhook JSON
Objective: prove we can ingest a generic payload, validate phone, dedupe, trigger <60s SMS, and write formatted notes.

A) Canonical payload (valid)
POST body (application/json):
{
  "lead_source": "webhook_generic",
  "source_event_id": "evt_001",
  "submitted_at": "2026-04-09T15:00:00Z",
  "contact": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155552671",
    "email": "test.lead@example.com"
  },
  "service": {
    "category": "Plumbing",
    "requested_service": "Water heater leak",
    "zip": "94107"
  },
  "meta": {
    "landing_page": "https://example.com/plumbing",
    "utm_source": "facebook",
    "utm_campaign": "spring-offer"
  }
}
Expected:
- Phone normalized to E.164 and validated.
- First outbound SMS queued within 60s.
- Qualification begins (LLM or deterministic) with Q1.
- A note/log entry created for downstream CRM (if connected) with clean formatting.

B) Missing phone
Payload: same as above but contact.phone omitted or empty.
Expected:
- No SMS attempt.
- System flags lead as “Needs phone” and (optionally) sends email/internal alert to agent_bob_replit+lead-copilot@agentmail.to.
- If lead has email, optionally send an email requesting phone (manual follow-up). Must not hallucinate a number.

C) Invalid phone
Payload: phone = "123" or "+1415555".
Expected:
- Reject/flag as invalid; no SMS send.
- Clear error reason logged.

D) Webhook retries
Send the same payload 3 times with identical source_event_id.
Expected:
- Exactly one SMS conversation starts.
- Subsequent retries return idempotent success (or 200) and log dedupe.

E) Duplicate leads (new event id, same phone)
Send payload with source_event_id evt_002 but same phone within 5 minutes.
Expected:
- Deduped according to rule; either (a) do not re-text, or (b) send a single “continuation” message. Must not spam.

Lead source #2: Jotform (real form tool)
Objective: confirm mapping from Jotform fields to lead schema, fast trigger, and edge cases.

Setup (manual, free tier)
1) Create a Jotform form: “Lead Copilot Test Form” with fields:
- Name (first/last)
- Phone
- Email
- Service Needed (dropdown)
- Preferred Time (dropdown)
- Consent checkbox (if applicable)
2) Configure Jotform webhook integration to the product’s intake endpoint.
3) Confirm Jotform sends submission payload instantly (no batching).

Field mapping acceptance
- Name.first -> contact.first_name
- Name.last -> contact.last_name
- Phone -> contact.phone (normalize to E.164)
- Email -> contact.email
- Service Needed -> service.requested_service
- Submission ID -> source_event_id
- Submission time -> submitted_at

Test cases
1) Valid submission: confirm <60s first SMS.
2) Missing phone: should not SMS; create a “missing phone” status.
3) Invalid phone: no SMS; explicit validation error.
4) Concurrency: submit 5 forms within 30 seconds using different phones.
Expected: all receive first SMS within 60s; no cross-talk; each has correct context.

Lead source #3: HubSpot (CRM)
Objective: ensure we can (a) create/update contact, (b) attach qualification transcript as a note, and (c) format cleanly.

HubSpot note formatting (expected)
Subject: Lead Copilot Qualification — {Contact Name} — {YYYY-MM-DD}
Body template:
Lead Source: {source}
Speed-to-Lead: {X}s (submit -> first SMS)
After-hours: {Yes/No}

Captured Details:
- Service: {requested_service}
- Job timing: {timeframe}
- Location: {zip/city}
- Budget range: {budget}
- Urgency: {urgent flag}

Conversation Transcript (SMS):
1) (15:00:12) System: Hi {first_name} — quick question so we can help fast: what service do you need?
2) (15:00:25) Lead: Water heater leaking
3) ...

Outcome:
- Qualified: {Yes/No}
- Booking: {Booked/Calendar link sent/Hand-off}
- Next step: {call scheduled time or manual follow-up}

HubSpot test cases
1) Note creation: ensure note attaches to correct Contact and/or Deal.
2) HTML/markdown: ensure line breaks render properly (no giant unbroken text).
3) Duplicate updates: if the webhook retries, avoid duplicate notes; update existing note or append with de-dupe marker.

Compliance & customer-safe behaviors (global)
STOP handling
- When lead texts “STOP”, “UNSUBSCRIBE”, “CANCEL”, or “END”: immediately stop all future messages.
- Send confirmation: “You’re opted out and will no longer receive texts. Reply HELP for info.” (or compliant variant per provider requirements).
- Log opt-out event with timestamp.

HELP handling
- When lead texts “HELP”: respond with who we are + how to opt out + contact email.
Required content (adapt wording as needed):
“Lead Copilot: We text to help schedule your requested service. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-hours behavior
- If lead arrives after-hours: send immediate acknowledgement (<60s) + set expectation.
Example:
“Thanks — we got your request. Our team will reach out at {next_open_time}. If this is urgent, reply URGENT and we’ll try to prioritize.”
- Continue qualification only if configured; otherwise pause and queue for morning.

Calendar link failures
- If booking link fails to generate or calendar API errors:
1) Apologize + offer two time windows to choose from.
2) Escalate to human handoff if no confirmation in 10 minutes.
Example:
“Sorry—our booking link is having trouble. What’s better: today 3–5pm or tomorrow 9–11am?”

Deterministic fallback mode (LLM failure safe mode)
Trigger conditions (any):
- LLM request times out (e.g., >8s) twice
- LLM returns error/empty content
- Safety filter blocks response
- Confidence/quality gate fails (if implemented)

Behavior: switch conversation to fixed question flow below; do not mention “AI error.”

Deterministic questions (exact copy)
Q1: “Hi {first_name} — quick question so we can help fast: what service do you need?”
If no response in 2 minutes: “Just checking — what service do you need help with?”
If no response in 10 minutes: stop and mark “No response”.

Q2 (after Q1 answered): “Got it. What’s the address or ZIP code for the job?”

Q3: “How soon do you need this handled? Reply 1) Today 2) This week 3) Flexible”

Q4: “What’s the best time for a quick call? Reply with a time window (e.g., ‘after 3pm’).”

Booking / handoff
- If calendar is available: “Perfect—here’s the booking link: {link}. Reply BOOKED once done.”
- If calendar unavailable: propose two windows (as above) and create a task for human scheduling.

Safety rules in deterministic mode
- Never promise pricing.
- Never diagnose emergencies; if lead indicates gas leak/fire/flood: “If this is an emergency, please call local emergency services immediately.”

Manual results capture table (fill during pilot)
For each trial, record:
- Trial ID
- Lead source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- Submitted at (source timestamp)
- Webhook received at (server log timestamp)
- First SMS queued/sent at (provider log timestamp)
- Delta seconds (submit -> first SMS)
- Outcome (pass/fail)
- Notes (screenshots/links to logs)

Required scenario list (must run)
1) Missing phone
2) Invalid phone
3) STOP
4) HELP
5) After-hours lead
6) Multiple concurrent leads (5+ within 30 seconds)
7) Calendar link failure
8) Webhook retries (same event)
9) Duplicate leads (same phone)
10) CRM note formatting (HubSpot)

Bug/fix log (prioritization)
P0 (must-fix before any agency pilot):
- STOP doesn’t immediately suppress messages
- SMS not sent / delays routinely >60s
- Deduping broken causing multiple texts per lead
- Wrong lead gets wrong transcript (cross-talk)

P1 (fix quickly):
- After-hours not respected (sends booking prompts at night)
- Calendar failure doesn’t fallback gracefully
- HubSpot notes unreadable (no line breaks, bad encoding)

P2 (nice-to-have pre-scale):
- Minor copy issues, unclear questions, missing tracking fields

How to declare “verified <60s”
- Run at least 20 total valid-lead trials across the 3 lead sources (recommended distribution: 8 webhook, 8 Jotform, 4 HubSpot-triggered).
- Provide a summary: median, p90, max response time; attach evidence links/screenshots.
- Any failures must be categorized (provider delay vs app delay) and include remediation notes.

Escalation / incident response (manual)
If SMS provider outage or LLM outage is suspected:
1) Flip to deterministic mode (if toggle exists) or force deterministic routing.
2) Send a single acknowledgement text (<60s) and collect minimal details (Q1–Q3).
3) Email agent_bob_replit+lead-copilot@agentmail.to with affected lead list and timestamps.

End of document.
