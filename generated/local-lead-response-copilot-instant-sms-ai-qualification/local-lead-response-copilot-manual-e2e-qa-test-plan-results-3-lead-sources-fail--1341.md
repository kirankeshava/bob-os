# Local Lead Response Copilot — Manual E2E QA Test Plan + Results (3 Lead Sources) + Fail-safe Deterministic Flow + Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:27:46.295Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet
Website (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal + Scope
**Goal:** Protect pilot reputation by proving **<60 seconds time-to-first-SMS** and safe behaviors across failures.
**Lead sources covered (3):**
1) **Generic Webhook JSON** (any ad platform/form posting JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

**Out of scope (until revenue):** automated test harnesses, load testing beyond manual concurrency checks.

## 2) KPI + Evidence Requirements
**Primary KPI:** First outbound SMS sent within **60 seconds** of lead submission.

### Timestamp capture points (must record all)
- **T0 Lead Submitted**
  - Webhook: time request sent (client clock) + server receipt time if available
  - Jotform: submission timestamp in Jotform
  - HubSpot: form submission / contact creation timestamp
- **T1 Inbound Received by Copilot** (app logs if available)
- **T2 SMS Sent** (provider message “queued/sent” timestamp, e.g., Twilio logs)
- **T3 SMS Delivered** (if available)

**Pass criteria:** (T2 - T0) ≤ 60 seconds for at least **18/20** trials (90%) across sources.
**Fail criteria:** Any systematic delay >60s, or any silent failure (no SMS, no escalation, no record).

### Evidence to store
- Screenshot/CSV of provider message logs for each trial
- Lead submission screenshots (Jotform/HubSpot) for at least 5 trials/source
- Copy/paste of conversation transcript for STOP/HELP tests

## 3) Test Environment Setup (Pilot)
**Pre-reqs:**
- One SMS sending number configured in the product
- Access to message logs
- A single “Test Operator” phone number to receive SMS
- Calendar/booking link configured (or a known-broken link for failure tests)

### Lead Source A — Generic Webhook JSON
Configure a webhook endpoint in the product (or any inbound endpoint supported).
Use a tool like curl/Postman to send JSON payloads.

**Baseline payload (valid):**
```json
{
  "source": "webhook",
  "lead_id": "qa-001",
  "first_name": "Casey",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "casey@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "created_at": "2026-04-09T12:00:00Z"
}
```

### Lead Source B — Jotform
- Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed, ZIP.
- Configure Jotform → webhook/Zapier (free if possible) to send to Copilot.
- Ensure phone formatting is raw user input (to test validation).

### Lead Source C — HubSpot CRM
- Use HubSpot free tools / dev test portal.
- Create a simple HubSpot form or workflow that triggers a webhook/integration to Copilot.
- Confirm where Copilot writes back: contact note, timeline event, or custom property.

## 4) Fail-safe Deterministic Mode (LLM Down) — Required Behavior
**Trigger conditions (any):**
- LLM request times out (e.g., >8s)
- LLM returns error/empty
- LLM confidence below threshold (if implemented)

**Deterministic flow must run without LLM** (exact messages below). Store state per lead.

### Message 1 (immediate)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — I can help. What are you looking for help with? Reply with 1, 2, or 3:\n1) Emergency / ASAP\n2) This week\n3) Just pricing / quote”

### If reply = 1 (Emergency)
“Got it. What’s your address or ZIP code?”
- If ZIP/address provided → “Thanks. What’s the best time for a quick call in the next 10 minutes? Reply with a time or ‘CALL ME’.”
- If user replies CALL ME → route to immediate call booking or notify human.

### If reply = 2 (This week)
“Great. What day works best? Reply with Mon/Tue/Wed/Thu/Fri + morning/afternoon.”
Then: “Perfect — here’s a link to book: {{calendar_link}}. If the link doesn’t work, reply ‘BOOK’ and we’ll set it up by text.”

### If reply = 3 (Pricing)
“Sure — to quote accurately, which service is it? Reply with a short description (e.g., ‘drain cleaning’, ‘water heater’, ‘HVAC tune-up’).”
Then: “Thanks. What’s your ZIP code?”
Then share booking link + escalation option.

### Global fallbacks
- **No response after 5 minutes:** send 1 nudge: “Just checking — want to get on the schedule? Reply 1 (ASAP), 2 (This week), or 3 (Quote).”
- **No response after 30 minutes:** stop automation; create CRM note “No response after 30m; follow-up needed.”

### STOP/HELP compliance
- If inbound = “STOP” (or STOP variants): immediately send confirmation: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.” Ensure no further messages.
- If inbound = “HELP”: “Reply STOP to opt out. For help, email agent_bob_replit+lead-copilot@agentmail.to and include your name + number.”

## 5) Core Test Cases (Runbook)
Record each as a trial row in Results table.

### TC1 — Baseline happy path (all 3 sources)
- Submit valid lead
- Expect: first SMS in <60s
- Expect: qualification proceeds (LLM or deterministic)

### TC2 — Missing phone
- Submit lead without phone
- Expect: No SMS attempt
- Expect: CRM note created: “Missing phone; cannot text” + email fallback if configured

### TC3 — Invalid phone
- Use “12345” or “+199999”
- Expect: validation failure logged, no repeated retries
- Expect: CRM note: “Invalid phone; needs correction”

### TC4 — STOP
- After receiving first SMS, reply STOP
- Expect: opt-out confirmation + hard stop

### TC5 — HELP
- Reply HELP
- Expect: help response with opt-out instructions + support email

### TC6 — After-hours
- Force after-hours condition (or temporarily set office hours)
- Expect: message acknowledging hours + next available time + option to book

### TC7 — Multiple concurrent leads
- Submit 5 leads within 30 seconds (any source)
- Expect: all get first SMS <60s
- Expect: no cross-talk (lead A never receives lead B’s context)

### TC8 — Calendar link failure
- Configure broken calendar link
- Expect: message includes alternate path “Reply BOOK”
- Expect: CRM note “Calendar link failed; manual booking needed” if link check exists OR when user reports failure

### TC9 — Webhook retries
- Send same webhook payload 3 times (same lead_id)
- Expect: only 1 conversation started (dedupe)
- Expect: log indicates deduped events

### TC10 — Duplicate leads across sources
- Same phone appears via Jotform then HubSpot within 10 minutes
- Expect: dedupe/merge behavior (one active thread) OR clear labeling “Duplicate lead detected”

### TC11 — CRM note formatting (HubSpot)
- Ensure Copilot writes back note with:
  - Lead source
  - Timestamps
  - Conversation transcript summary
  - Qualification outputs (service, urgency, zip, preferred time)
  - Booking status + link
- Expect: readable formatting, no JSON blobs, no markdown that breaks HubSpot

## 6) Results Capture Tables
### 6.1 KPI timing table (copy/paste for 20+ trials)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (TC#)
- T0 Lead Submitted (timestamp)
- T1 Received (timestamp)
- T2 SMS Sent (timestamp)
- Delta (T2-T0 seconds)
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

### 6.2 Conversation transcript snippet (for STOP/HELP and fallbacks)
- Trial ID
- Inbound message(s)
- Outbound responses
- Compliance Pass/Fail

## 7) Bug/Fix Log Template (Churn-Risk Oriented)
Fields:
- Bug ID
- Title
- Severity (S0 revenue-blocking, S1 high churn risk, S2 annoying)
- Source/Scenario (TC#)
- Steps to reproduce
- Expected
- Actual
- Evidence
- Suggested fix
- Owner
- Status

### Severity guidance
- **S0:** No first SMS / wrong person texted / STOP ignored / >60s consistently
- **S1:** Duplicate spam texts / after-hours mishandled / calendar failure dead-ends
- **S2:** formatting issues in CRM notes, minor copy issues

## 8) Expected HubSpot Note Format (Reference)
Title: “Lead Copilot Qualification — {{lead_name}} ({{phone}})”
Body (plain text):
- Source: HubSpot Form {{form_name}}
- Received: {{T0}}
- First SMS Sent: {{T2}} ({{delta}}s)
- Status: {{Booked / Needs Follow-up / Opted Out}}
- Qualification:
  - Service: {{service}}
  - Urgency: {{ASAP/This week/Quote}}
  - ZIP: {{zip}}
  - Preferred time: {{time}}
- Transcript (last 6 messages):
  - Lead: “…”
  - Copilot: “…”

## 9) Exit Criteria (Pilot-Ready)
- 20+ trials recorded with evidence
- ≥90% under 60s (or documented root cause + mitigation)
- STOP/HELP passes 100%
- Deterministic mode proven (force LLM failure once; qualification still works)
- Any S0/S1 issues triaged with fixes queued
