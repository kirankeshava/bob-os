# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:21:32.262Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

**Goal (Week 1, no automation):** Prove reliable lead capture + **first SMS response < 60 seconds** across **3 lead sources** and validate fail-safe behaviors that prevent churn/reputation damage.

**Product legitimacy link (share if asked):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Ops contact:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope: 3 Lead Sources
1) **Generic Webhook JSON** (any form/ads platform posting directly)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (CRM ingestion + note logging)

## 2) KPI: <60s First Response — Evidence Method
**Definition:** time from `lead_received_timestamp` (server receipt or webhook delivery time) to `first_sms_sent_timestamp` (provider accepted/send event). If only app logs exist, use the earliest “SMS queued/sent” event.

**Capture points per trial:**
- T0 = lead submitted (browser timestamp or webhook POST time)
- T1 = app receives lead (server log / webhook log)
- T2 = first outbound SMS queued/sent (SMS log)

**Pass:** (T2 - T1) ≤ 60 seconds (preferred) and (T2 - T0) ≤ 90 seconds (acceptable if third-party delays).

**Sample size target for pilot:** 20 total trials minimum:
- Webhook JSON: 8
- Jotform: 6
- HubSpot: 6

**Evidence to store (per trial):** screenshot/export of webhook log + SMS log + any CRM note created.

## 3) Deterministic Fallback Mode (LLM fail-safe)
Trigger deterministic mode when:
- LLM returns error, timeout (>5s), empty response, or unsafe output
- confidence/validation fails (e.g., missing required fields)

**Deterministic questions (exact wording):**
1. **Intro:** “Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote?”
2. **Service type:** “What do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”
3. **Timing:** “How soon do you want this done? Reply 1) ASAP 2) This week 3) Next 2–4 weeks”
4. **Location:** “What ZIP code is the job in?”
5. **Escalation offer:** “Got it—want to book a quick call or get a text estimate? Reply 1) Book call 2) Text estimate”

**Deterministic branching rules:**
- If user replies STOP → immediately confirm opt-out (see STOP/HELP section) and halt.
- If user replies HELP → send help text and halt qualification until next inbound.
- If no reply within 5 minutes → send one follow-up: “Just checking—still want help with this? Reply 1) Yes 2) No”.
- If still no reply after 30 minutes → stop auto-messages; create CRM note “No response after 2 attempts”.

**Safety copy for failures:**
- If calendar link fails: “Sorry—booking is temporarily unavailable. Reply with a good time window (e.g., ‘tomorrow 2–4pm’) and we’ll confirm.”

## 4) High-Risk Test Cases (Required)
### A) Missing phone
**Input:** lead payload without phone.
**Expected:** no SMS attempt; lead marked “Needs phone”; CRM note created; optional email sent to ops.
**Pass criteria:** system does not crash; does not send to null/empty.

### B) Invalid phone
**Inputs:**
- “12345”
- “+1 (555) 000-0000” (reserved)
- “abcdef”
**Expected:** validation error path; no SMS; CRM note “Invalid phone”.

### C) STOP/HELP compliance
**STOP expected behavior:**
- On inbound “STOP”, “UNSUBSCRIBE”, “CANCEL”: immediately respond “You’re opted out and will no longer receive messages.”
- Add contact to do-not-message list; block future outbound.

**HELP expected behavior:**
- On inbound “HELP”: respond with business identification + contact email: “This is {{business_name}} texting about your request. Reply STOP to opt out. Email: agent_bob_replit+lead-copilot@agentmail.to”.

### D) After-hours routing
Define after-hours window (example): 6pm–8am local time.
**Expected:** first message acknowledges timing: “We’re closed right now, but you’re in the queue—what’s the best time tomorrow?”; tag lead “After-hours”.

### E) Multiple concurrent leads
**Test:** submit 5 leads within 30 seconds.
**Expected:** all receive first SMS within KPI; no cross-talk (no lead gets another lead’s name/details).

### F) Calendar link failures
**Test:** configure invalid/expired booking link or simulate 500.
**Expected:** send fallback booking text (see above); do not loop; CRM note “Calendar unavailable; offered manual scheduling.”

### G) Webhook retries / idempotency
**Test:** send identical payload 3 times (same external_id).
**Expected:** only one conversation started; CRM note indicates dedupe; return 200 OK idempotent.

### H) Duplicate leads
**Test:** same phone + same name submitted twice within 10 minutes.
**Expected:** merge into existing thread; do not spam with full intro twice; optionally send: “We already texted you—want to continue here?”

### I) CRM note formatting (HubSpot)
**Expected note template (single note per lead lifecycle step):**
- Title: “Lead Copilot Qualification”
- Body (example):
  - Source: Jotform
  - Submitted: 2026-04-09 14:03:22 UTC
  - First SMS sent: 2026-04-09 14:03:40 UTC (18s)
  - Answers:
    - Service: Install
    - Timing: ASAP
    - ZIP: 94107
  - Outcome: Book call link sent / Manual schedule offered
  - Opt-out status: Active/STOPPED

## 5) Execution Steps by Lead Source
### 5.1 Generic Webhook JSON (POST)
**Purpose:** verify ingestion, phone validation, dedupe, retries, KPI.

**Base payload (valid):**
```json
{
  "external_id": "test-webhook-001",
  "source": "webhook",
  "submitted_at": "2026-04-09T14:03:22Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Webhook",
    "phone": "+14155552671",
    "email": "test.webhook@example.com",
    "service": "install",
    "zip": "94107"
  }
}
```

**Variants:**
- Missing phone: remove `phone`
- Invalid phone: `"phone": "12345"`
- Duplicate: reuse `external_id`
- Concurrency: external_id 010–014 fired within 30s

**Pass checks:** SMS sent, correct personalization, CRM note created (if enabled), dedupe works.

### 5.2 Jotform
**Setup:** create free Jotform with fields First Name, Last Name, Phone, Email, Service, ZIP.
**Execution:** submit form 6 times with test dataset. One submission after-hours.
**Pass checks:** Jotform submission triggers same flow; correct mapping; KPI <60s.

### 5.3 HubSpot
**Setup:** free HubSpot account + test contact creation path (via workflow/webhook/whatever integration exists).
**Execution:** create 6 test leads via HubSpot (or integration endpoint that logs to HubSpot).
**Pass checks:** notes are formatted as specified; dedupe by phone/contact; no HTML-breaking/markdown garbage.

## 6) Results Table (paste into notes)
For each trial, record:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (happy path, invalid phone, dedupe, etc.)
- T0 submit
- T1 received
- T2 first SMS sent
- Delta (T2-T1)
- Pass/Fail
- Evidence link(s)
- Bug ID if fail

## 7) Bug/Fix Log Format
- Bug ID
- Severity: P0 compliance / P1 revenue / P2 annoyance
- Source + scenario
- Steps to reproduce
- Expected vs actual
- Impact (spam risk, missed lead, brand risk)
- Suggested fix (validation, idempotency key, fallback copy)

## 8) Stop Criteria (when to pause pilots)
- Any STOP request not honored within 1 message
- Any lead receives another lead’s data (cross-talk)
- First response > 60s in >20% of trials
- Duplicate/retry causes more than 1 outbound SMS to same lead within 2 minutes

---
**Next action once endpoints/logs exist:** run 20 trials, store screenshots/log exports, and produce a one-page “Verified KPI + Issues Found + Fix Priority” summary for agencies.