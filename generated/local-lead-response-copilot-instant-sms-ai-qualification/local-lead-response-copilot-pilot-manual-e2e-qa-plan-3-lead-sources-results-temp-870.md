# Local Lead Response Copilot — Pilot Manual E2E QA Plan (3 Lead Sources) + Results Template + Bug/Fix List + Deterministic Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:42:21.601Z

---

Purpose
Validate end-to-end lead capture → first SMS (<60s) → qualification → booking/escalation across three lead sources while protecting reputation via fail-safe behaviors.

Product reference (for customer/pilot legitimacy)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Ops email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources
A) Generic Webhook JSON (baseline): any form/ad platform that can POST JSON.
B) Jotform (real form tool): submit → webhook/Zapier-style handoff.
C) HubSpot (CRM): new contact/deal triggers and note formatting verification.

Primary KPI
First outbound SMS sent within 60 seconds of lead creation.

Evidence & timing measurement method (must-do)
Capture these timestamps for every trial:
T0 = lead created (form submit time / webhook received time / HubSpot create time).
T1 = first outbound SMS attempt time (Twilio log or internal message log).
Δ = T1 - T0 must be <= 60s.
Evidence required per trial:
- Screenshot or export row proving T0 (Jotform submissions list / webhook receiver log / HubSpot contact create timestamp).
- Screenshot of SMS log showing T1 and recipient.
- Store in Results table.
Sample size: minimum 20 trials total; at least 5 per source.
Pass gate: 95% of trials <=60s; no trial >120s.

Pre-flight checklist (before running)
1) Confirm STOP/HELP compliance messages configured.
2) Confirm after-hours schedule configured (e.g., 6pm–8am local time).
3) Confirm deterministic safe-mode toggle exists OR documented procedure to switch prompts to deterministic messages.
4) Confirm dedupe key rules (phone-based) and retry policy.
5) Confirm calendar/booking integration and failure handling path.

Test data fixtures
Use these phone numbers (replace with test-capable numbers that can receive SMS):
- Valid test mobile: +14155550101
- Invalid phone: 12345
- Missing phone: null/empty
Names/emails:
- Alice Test / alice@example.com
- Bob Test / bob@example.com
Service requests:
- “Need same-day plumbing leak fix” (high intent)
- “Quote for HVAC tune-up” (medium)
Metadata:
- source = "fb_leads" | "google_lsa" | "website_form"
- campaign = "spring_promo"

A) Generic Webhook JSON — payloads
A1 Happy path payload
POST /webhook/leads (example)
{
  "lead_id": "wh_001",
  "created_at": "2026-04-09T10:00:00Z",
  "full_name": "Alice Test",
  "phone": "+14155550101",
  "email": "alice@example.com",
  "service": "Need same-day plumbing leak fix",
  "zip": "94107",
  "source": "website_form",
  "campaign": "spring_promo"
}
Expected:
- First SMS within 60s.
- Qualification begins; if booking enabled, provide times or link.
- CRM note (if connected) includes: source, campaign, service, timestamps.

A2 Missing phone
Same payload with phone omitted or empty.
Expected:
- NO SMS attempt.
- Create CRM note/record flagged “Missing phone; manual follow-up required.”
- Optional: send email to ops (agent_bob_replit+lead-copilot@agentmail.to) if configured.

A3 Invalid phone
phone: "12345"
Expected:
- No SMS or immediate validation failure.
- Record marked invalid; note includes raw phone and reason.

A4 Duplicate lead
Send A1 twice with same phone within 5 minutes.
Expected:
- Second event deduped (no second SMS) OR merged with a single thread.
- CRM note: “Duplicate lead suppressed” with original lead_id.

A5 Webhook retry / idempotency
Send same payload with same lead_id 3 times (simulate retries).
Expected:
- At most one outbound SMS.
- System returns 200 OK (or safe ack) to stop further retries.

B) Jotform — form spec (fields)
Create a test form with:
- Name (first + last)
- Phone (required)
- Email
- Service Needed (dropdown + “Other”)
- Preferred time (AM/PM)
Hidden fields:
- source (default: jotform)
- campaign
Test cases mirror A1–A5 using Jotform submissions.
Expected mapping:
- Jotform phone field → normalized E.164 before SMS.
- Submission time shown in Jotform is T0.

C) HubSpot — trigger & note formatting
Trigger: new Contact created OR new Deal associated with Contact.
Test: create contacts matching fixtures.
Expected:
- If phone valid: SMS sent within 60s of contact creation.
- If missing/invalid: no SMS; note added.

CRM note formatting (required)
All notes must be readable by agency ops; use this template:
Title: Lead Response Copilot — Qualification Transcript
Body (markdown-like text):
- Lead Source: {source}
- Campaign: {campaign}
- Lead Created (T0): {timestamp}
- First SMS (T1): {timestamp} (Δ={seconds}s)
- Status: {Qualified|Unqualified|Booking Sent|Booked|Needs Human}
- Transcript:
  1) System: "{first_sms_text}"
  2) Lead: "{reply_1}"
  3) System: "{q2_text}"
  ...
- Booking:
  - Calendar link shown: {url or ‘N/A’}
  - Booking outcome: {booked|failed|not attempted}
- Errors/Warnings:
  - {LLM_timeout|calendar_down|sms_failed|dedupe_suppressed}

High-risk scenario test cases (run across sources)
1) STOP compliance
Step: After first SMS, reply “STOP”.
Expected:
- Immediate confirmation message (carrier-compliant).
- No further messages sent unless user re-subscribes.
Evidence: transcript screenshot.

2) HELP compliance
Reply “HELP”.
Expected:
- Help text includes business identity and support email: agent_bob_replit+lead-copilot@agentmail.to.

3) After-hours routing
Submit lead during after-hours window.
Expected:
- Immediate SMS acknowledges receipt + sets expectation (e.g., “We’ll text you at 8am”).
- Optional: urgent path if user replies “urgent”.

4) Multiple concurrent leads
Submit 5 leads within 60 seconds.
Expected:
- All receive first SMS within 60s.
- No cross-contamination of transcripts.

5) Calendar link failure
Simulate booking provider outage or invalid link.
Expected:
- Fallback offers: “Reply with preferred day/time” + human escalation.
- CRM note flags calendar failure.

6) LLM failure / timeout
Force LLM error (disconnect key / set timeout low).
Expected:
- System switches to deterministic safe-mode questions (below) without stopping.

Deterministic safe-mode qualification flow (copy/paste messages)
Trigger conditions:
- LLM call errors, times out (>6s), or returns empty/unsafe output.
- Downstream booking API errors.

Safe-mode SMS script:
Message 1 (immediate):
“Hi {first_name}, this is the scheduling assistant for {Business}. I can help you get booked. What service do you need? Reply 1) Plumbing 2) HVAC 3) Electrical 4) Other”

If reply 1/2/3/4:
Message 2:
“Got it. What’s your ZIP code?”

After ZIP:
Message 3:
“Thanks. Is this urgent (same-day) or flexible? Reply 1) Urgent 2) Flexible”

If Urgent:
Message 4:
“Understood. What’s the best time for a call today? Reply with a time window (e.g., ‘2–4pm’).”

If Flexible:
Message 4:
“What day/time works best? Reply with 2 options (e.g., ‘Tue 10am or Wed 3pm’).”

Escalation rule:
- If user provides time options OR asks complex question: create CRM note “Needs Human” and send:
“Thanks — a human coordinator will confirm shortly. If you need immediate help, call us directly.”

Timeout rule:
- If no reply after 10 minutes: send one reminder.
Reminder:
“Just checking — do you still want to get scheduled? Reply with the service type (1–4).”
- If no reply after 24 hours: stop messaging; mark “No response”.

Results table (fill during pilot)
Columns:
Trial ID | Source (Webhook/Jotform/HubSpot) | Scenario | T0 | T1 | Δ seconds | Pass/Fail | Evidence link | Notes

Bug/Fix log (prioritized)
Fields:
Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Suspected Cause | Proposed Fix | Owner | Status
Pre-filled likely P0/P1 items to watch:
- P0: SMS sent to invalid phone / no validation
- P0: STOP not honored / continued texting
- P0: Deduping fails → double-texts same lead
- P1: After-hours message not used
- P1: Calendar failure causes conversation to stall
- P1: LLM timeout stops flow (no deterministic fallback)
- P2: HubSpot note transcript formatting unreadable

Exit criteria (pilot-ready)
- <60s KPI met per gates above
- STOP/HELP verified with transcripts
- Deterministic safe-mode produces a complete qualification record and escalates safely
- Dedupe + retries do not cause duplicate outbound messages
- HubSpot notes follow required formatting
