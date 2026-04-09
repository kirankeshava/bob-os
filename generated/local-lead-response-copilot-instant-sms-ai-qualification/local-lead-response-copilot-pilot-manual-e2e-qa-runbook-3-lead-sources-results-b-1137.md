# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bugs/Fixes + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:52:02.698Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

Goal: Protect early-agency reputation and reduce churn by validating end-to-end reliability (manual checks only) across 3 lead sources, proving **<60s first response**, and ensuring safe fallbacks when the LLM fails.

Business legitimacy links to reference in any pilot comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope & Lead Sources
We will validate these 3 sources:
1) **Generic Webhook JSON** (represents “any form / any ads tool”)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

Core flow under test: New lead arrives → system sends SMS immediately → qualifies with short Qs → books call/appointment or escalates → logs notes in CRM.

## 2) KPI: First Response <60s (How to Measure)
### Definition
**First Response Time (FRT)** = timestamp when lead is created/submitted (T0) → timestamp when first outbound SMS is sent (T1).

### Evidence to capture (per test run)
- T0 evidence: form submit time (Jotform submission timestamp) OR webhook request time (client log) OR HubSpot create time.
- T1 evidence: outbound SMS log time (provider log / internal log / webhook delivery log).
- Screenshot or exported log row for both.

### Pass/Fail
- PASS: (T1 - T0) ≤ 60 seconds
- WARN: 61–120 seconds (acceptable only if explained by provider outage)
- FAIL: >120 seconds or no SMS

### Sample size
Minimum: **20 runs** total across the 3 sources (suggested distribution: 8 webhook / 8 Jotform / 4 HubSpot).

## 3) Preconditions / Setup
- A test phone capable of receiving SMS.
- A “do-not-contact” safe test list (internal only). Never test with a real customer lead.
- After-hours window configured (define business hours explicitly, e.g., 9am–5pm local).
- Calendar/booking integration (or a known “broken link” to simulate failures).
- CRM integration for HubSpot (test portal is fine).

## 4) Deterministic Fallback Mode (LLM Fail-Safe)
Trigger conditions (any of the following):
- LLM API error, timeout, rate-limit, or invalid JSON
- LLM returns empty/unsafe content
- LLM latency threatens FRT SLA (configure a hard cutover, e.g., 3–5 seconds)

### Fallback behavior requirements
- Never block the **first SMS** on the LLM.
- If LLM fails after first SMS, switch to deterministic script below.
- Always provide STOP/HELP compliance.

### Deterministic qualification script (copy/paste)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—are you looking for help with (A) emergency/urgent, (B) quote/estimate, or (C) schedule service? Reply A, B, or C. Reply STOP to opt out.”

Branching:
- If A: “Got it. What’s the address/ZIP and what’s going on? We can get you on the schedule ASAP.”
- If B: “Great—what service do you need and what ZIP code are you in?”
- If C: “Sure—what day/time works best and what ZIP code?”

**If user gives ZIP + service:**
“Thanks. Last question: is this for residential or commercial?”

**Booking attempt (if calendar available):**
“Perfect. You can grab the next available time here: {{calendar_link}}. If you prefer, reply with 2–3 times that work and we’ll confirm.”

**If calendar link fails / unavailable:**
“Looks like our booking link is having an issue. Reply with 2–3 times that work and a good email, and we’ll confirm by text. Or call us at {{phone}}.”

Timeout rules:
- If no reply after 5 minutes: send 1 follow-up: “Just checking—do you still want to get this scheduled? Reply A (urgent), B (quote), or C (schedule).”
- If no reply after 30 minutes: stop messaging (to avoid spam perception) and create a CRM task.

Escalation-to-human:
- If user expresses frustration, requests a human, or indicates high urgency: “Understood—looping a team member in now. If it’s urgent, call {{phone}}.” Then create “call now” task.

## 5) Compliance: STOP / HELP
Acceptance criteria:
- STOP: Immediately cease non-essential messages; send confirmation: “You’re opted out and will no longer receive messages.” Log opt-out.
- HELP: Provide business name, support email, and basic instructions. Example: “This is {{business_name}}. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

## 6) Test Matrix (Scenarios Required)
Run each scenario at least once per lead source where applicable.

### A) Missing phone
Input: lead payload has no phone field or phone is blank.
Expected:
- No SMS attempt.
- Create CRM note/task: “Missing phone—cannot text.”
- Optional: email fallback if available.

### B) Invalid phone
Input: phone contains letters, too short, wrong country, etc.
Expected:
- No SMS attempt OR SMS provider rejects and system handles gracefully.
- CRM note includes invalid value and reason.

### C) STOP / HELP
Input: recipient replies STOP then later HELP.
Expected:
- STOP opt-out honored immediately.
- HELP returns support instructions (but should still respect opt-out rules—do not resume marketing).

### D) After-hours
Input: lead arrives outside business hours.
Expected:
- Immediate first SMS acknowledging after-hours (still within <60s): “Thanks—our team is offline. We’ll follow up at {{next_open_time}}. If urgent call {{phone}}.”
- Create “next business day follow-up” task.

### E) Multiple concurrent leads
Input: submit 5 leads in 60 seconds.
Expected:
- All get first SMS within <60s.
- No cross-talk (lead A responses do not affect lead B state).

### F) Calendar link failures
Input: booking link returns error or is removed.
Expected:
- System detects failure (or fallback path used).
- Offers manual scheduling via text; creates CRM task.

### G) Webhook retries
Input: same webhook delivered twice (same event id).
Expected:
- Deduping prevents double SMS.
- Log “duplicate suppressed” with key used.

### H) Duplicate leads
Input: same phone submits twice within 10 minutes.
Expected:
- Either (a) thread continues existing conversation or (b) sends polite acknowledgment without spamming.
- CRM notes clearly reflect repeat inquiry.

### I) CRM note formatting (HubSpot)
Expected note template (consistent + scannable):
- Title: “Lead Copilot Qualification Summary”
- Body includes:
  - Source (Webhook/Jotform/HubSpot)
  - Lead details (name/phone/email)
  - Timeline (T0/T1, FRT seconds)
  - Transcript bullets (Q/A)
  - Outcome (Booked/Needs follow-up/Opted out)
  - Next action + owner

## 7) Exact Generic Webhook JSON Payloads (Copy/Paste)
### Webhook: valid lead
{
  "event_id": "test-001",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test@example.com",
    "service": "plumbing",
    "zip": "94107"
  }
}

### Webhook: missing phone
{
  "event_id": "test-002",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:05:00Z",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "email": "nophone@example.com",
    "service": "hvac",
    "zip": "94107"
  }
}

### Webhook: invalid phone
{
  "event_id": "test-003",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:10:00Z",
  "lead": {
    "first_name": "Bad",
    "last_name": "Phone",
    "phone": "555-ABC-XXXX",
    "email": "badphone@example.com",
    "service": "roofing",
    "zip": "94107"
  }
}

## 8) Results Capture Table (Fill During Pilot)
For each run, record:
- Run ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 (lead created)
- T1 (first SMS sent)
- FRT seconds
- Pass/Fail
- Notes (screenshots/log links)

## 9) Bug/Fix Log (Churn-Risk Oriented)
Fields:
- Bug ID
- Severity (S0 compliance, S1 revenue-loss, S2 annoyance)
- Source + scenario
- Steps to reproduce
- Expected vs actual
- Evidence (logs/screens)
- Suggested fix
- Owner / status

## 10) Current “Known Risk Areas” to Watch Closely
- Deduping key choice (event_id vs phone+timestamp) to avoid double-texting.
- STOP/HELP behavior in all states (qualifying, booked, after-hours).
- LLM timeout handling: ensure it cannot delay first SMS.
- Calendar failure detection: avoid dead-end links.
- HubSpot note rendering: ensure newlines/bullets display correctly.

## 11) Execution Order (Fastest Pilot Run)
1) Run 3 webhook tests (valid/missing/invalid).
2) Run 3 Jotform tests (valid + after-hours + duplicate submit).
3) Run 2 HubSpot tests (create lead + ensure note formatting).
4) Run STOP/HELP on the test phone.
5) Run 5-lead concurrency burst.
6) Record timestamps and compute FRT; open bugs immediately for any FAIL.

End state for “QA sign-off for pilot”:
- Documented evidence that median FRT ≤ 60s and worst-case ≤ 60s for normal cases.
- Deterministic fallback confirmed by forcing an LLM failure (timeout/error) and observing scripted flow.
- STOP confirmed and logged.
- No duplicate SMS from retries/duplicates.
- HubSpot notes are readable and standardized.
