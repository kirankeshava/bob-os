# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:08:49.563Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Legitimacy URL to share (if testers ask):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support/ops contact:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Scope & Goals (pilot-friendly, no automation)
This runbook validates end-to-end lead capture → first SMS → qualification → booking/escalation across **3 lead sources**:
1) **Generic Webhook JSON** (any ad/form tool)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

### Primary KPI
- **First response time (lead received → first SMS sent): < 60 seconds**

### Fail-safe promise
- If the LLM fails/timeout/returns unusable output, the system must switch to a **deterministic question flow** (documented below) so the lead still gets handled safely.

### Must-cover test cases
- Missing phone, invalid phone, STOP/HELP, after-hours, multiple concurrent leads, calendar link failures, webhook retries, duplicate leads, and **HubSpot note formatting**.

---

## 1) Test Environment & Pre-checks
**Assumptions (fill in during onboarding):**
- Sending number: ____________________
- Default timezone: ____________________
- Business hours: ____________________
- Calendar/booking URL: ____________________
- Human fallback routing (email/SMS): ____________________
- Webhook endpoint URL: ____________________
- HubSpot portal/test account: ____________________

**Pre-checks (5 minutes):**
1. Confirm outbound SMS delivery works (send a test SMS to QA phone).
2. Confirm inbound SMS replies are received and processed.
3. Confirm STOP keyword compliance is enabled (system stops future messages to that number).
4. Confirm HELP keyword returns a help/support message.
5. Confirm dedupe key strategy is known (phone+source? external lead id?). If unknown, log as Risk R1.

---

## 2) Evidence Collection (to prove <60s KPI)
For every trial, capture these timestamp points (screenshots/log lines acceptable):
- **T0 Lead submitted/received** (form submit time or webhook receipt timestamp)
- **T1 First SMS sent time** (provider log/app log)
- **Δ = T1 - T0** must be **<= 60 seconds**

**Minimum sample size for pilot proof:**
- **20 total trials** across the three sources
  - 8 webhook, 6 Jotform, 6 HubSpot (suggested)

**Store evidence:**
- A single results table (below)
- Message transcript snippets for STOP/HELP and calendar failure scenarios

---

## 3) Deterministic Qualification Fallback (LLM-safe mode)
**Trigger conditions (any):**
- LLM API error, timeout > 5s, invalid JSON/parse error
- LLM returns empty/irrelevant content
- LLM confidence flag (if exists) below threshold

**Fallback goals:**
- Ask only what’s needed to route/convert
- Avoid freeform interpretation
- Maintain compliance (STOP/HELP)

### Fallback Flow Copy (exact messages)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{biz_name}}. Thanks for reaching out — I can help. What service do you need?
Reply with 1) Repair  2) Install  3) Quote/Estimate  4) Other”

**If reply = 1/2/3/4:**
“Got it. What’s your ZIP code?”

**After ZIP:**
“When would you like service?
Reply 1) Today  2) This week  3) Next week”

**After timing:**
“Last question: is this for a home or business?
Reply 1) Home  2) Business”

**Success routing (during business hours):**
“Perfect — here’s the booking link to lock in a time: {{calendar_link}}. If you prefer, reply CALL and we’ll ring you.”

**After-hours routing:**
“Thanks — we’re currently closed, but you’re in the queue. We’ll text you first thing at {{next_open_time}}. If urgent, reply URGENT.”

**If calendar link fails (detected 4xx/5xx or missing):**
“Thanks — our booking link is temporarily down. Reply with a good time window (e.g., ‘tomorrow 2–5pm’) and we’ll confirm ASAP.”

### STOP/HELP compliance (always-on)
- If inbound message contains “STOP” (case-insensitive):
  - Reply once: “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  - Set contact status = opted_out; block further outbound.
- If inbound contains “HELP”:
  - Reply: “Help: You’re getting messages from {{biz_name}} about your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

### Escalation-to-human rules
Escalate (notify operator) if any:
- Lead replies “URGENT” after hours
- 2 failed delivery attempts for outbound SMS
- User requests “CALL”
- Any unrecognized reply twice in a row

Operator notification content should include: lead name (if any), phone, source, answers so far, and conversation transcript.

---

## 4) Test Matrix (what to run)
### A) Lead Source 1 — Generic Webhook JSON
**Goal:** validate baseline ingestion, speed-to-lead, retries, dedupe.

**Webhook payload (valid):**
```json
{
  "source": "webhook_test",
  "lead_id": "lead_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Quote",
  "zip": "94107",
  "submitted_at": "2026-04-09T12:00:00Z"
}
```

**Test cases (Webhook):**
- W1 Valid lead → first SMS <60s
- W2 Missing phone (omit `phone`) → no SMS; create task/alert; log clean error
- W3 Invalid phone (`phone":"123"`) → rejected; no SMS; recorded reason
- W4 Duplicate lead (same lead_id) → deduped (no second SMS)
- W5 Duplicate lead (same phone, new lead_id within 5 min) → dedupe policy applied (document behavior)
- W6 Retry simulation (send same payload 3 times, add header `X-Retry-Count: 2` if supported) → idempotent handling
- W7 Concurrency (send 5 different leads within 10 seconds) → each gets first SMS <60s; no cross-talk

**Acceptance:**
- No scenario sends SMS to missing/invalid phone
- Dedupe prevents double-SMS storms
- First response KPI met for valid leads

### B) Lead Source 2 — Jotform
**Setup:**
- Create a free Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Preferred Timing.
- Configure submission to hit product webhook (or Zapier-like bridge if available on free tier; if not, use Jotform webhook feature).

**Test cases (Jotform):**
- J1 Normal submission → first SMS <60s
- J2 Missing phone (leave blank) → safe failure (no SMS)
- J3 Invalid phone format → safe failure
- J4 After-hours submission → after-hours message path
- J5 Calendar link failure (temporarily set calendar_link blank) → fallback wording asks for time window

**Acceptance:**
- Field mapping correct (name/phone)
- Response speed and safe handling consistent with webhook

### C) Lead Source 3 — HubSpot CRM
**Goal:** validate CRM-created lead triggers, note formatting, dedupe.

**Setup options (choose what exists):**
- Trigger on new contact created OR new form submission in HubSpot OR workflow webhook.

**Test cases (HubSpot):**
- H1 New contact with phone → first SMS <60s
- H2 New contact missing phone → no SMS; create CRM note/task indicating missing phone
- H3 Duplicate contact (same phone) → no duplicate SMS within dedupe window
- H4 CRM note formatting: qualification transcript appended cleanly

### Expected HubSpot Note Format (paste-ready)
**Title:** “Lead Copilot Qualification Summary”

**Body template:**
```
Source: {{source}}
Lead ID: {{lead_id}}
Submitted: {{submitted_at}}
First Response Sent: {{first_response_sent_at}} (Δ={{first_response_delta_sec}}s)
Status: {{status}}  (Qualified / Needs Follow-up / Opted-out)

Answers:
- Service: {{service}}
- ZIP: {{zip}}
- Timing: {{timing}}
- Property: {{property_type}}

Conversation Transcript:
{{transcript}}

System Notes:
- Mode: {{ai_mode}} (LLM / Deterministic Fallback)
- Errors: {{errors_or_none}}
```

**Acceptance:**
- Note is readable, consistent, includes Δ seconds, and transcript is not malformed

---

## 5) Results Capture Tables
### Run Results Table (copy into sheet)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (W1/J3/etc.)
- T0 Lead Received (timestamp)
- T1 First SMS Sent (timestamp)
- Δ seconds
- Passed? (Y/N)
- Evidence link (screenshot/log URL)
- Notes

### Bug/Fix Log Table
Columns:
- Bug ID
- Severity (Blocker/High/Med/Low)
- Scenario
- Steps to Reproduce
- Expected
- Actual
- Impact (conversion/compliance/reputation)
- Suggested Fix
- Owner
- Status

Severity guidance:
- **Blocker:** compliance (STOP ignored), SMS to wrong person, repeated spam, data leakage
- **High:** response time >60s for valid leads, calendar failure dead-end, dedupe broken
- **Med:** note formatting issues, minor copy problems
- **Low:** cosmetic logging

---

## 6) Pass/Fail Gates (pilot readiness)
Pilot readiness requires:
1. **>= 90%** of valid-lead trials meet **Δ <= 60s** (and no systematic outliers)
2. **0 compliance failures** for STOP/HELP
3. Deterministic fallback works end-to-end (at least 2 trials) and still routes to booking/escalation
4. Missing/invalid phone never triggers outbound SMS
5. Dedupe prevents duplicate SMS for identical lead/retries
6. HubSpot note formatting matches template and includes response-time delta

---

## 7) Quick Operator SOP (when something fails)
- If LLM errors spike: switch to deterministic mode (forced) until stable.
- If SMS delivery fails: pause outbound to that number, notify operator, log carrier error.
- If calendar link fails: use the calendar-failure message and collect a time window; operator books manually.
- If webhooks retry storm: enforce idempotency by lead_id (or hashed phone+timestamp bucket) and return 200 quickly once accepted.

---

## 8) What “Verified <60s First Response” Means
A run is considered verified when:
- You have **20 trials** logged
- Each trial includes T0 and T1 evidence
- Summary shows median and p90 response times
- Any failures include a bug entry and remediation note

End of runbook.
