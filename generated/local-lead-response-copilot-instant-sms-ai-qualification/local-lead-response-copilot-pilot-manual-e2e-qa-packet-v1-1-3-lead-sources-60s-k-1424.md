# Local Lead Response Copilot — Pilot Manual E2E QA Packet v1.1 (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Inputs + Expected Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:18:09.063Z

---

## 0) Purpose
Validate end-to-end lead capture → first SMS → qualification → booking/hand-off for 3 lead sources, proving **<60s first response** and **safe failovers** (STOP/HELP compliance, after-hours routing, LLM failure deterministic mode). This is manual (pre-revenue), optimized to run in <60 minutes once endpoints are available.

## 1) Lead Sources in Scope (3)
1) **Generic Webhook JSON** (any form/ads tool can mimic)
2) **Jotform** (real form tool; free tier)
3) **HubSpot** (CRM; free/dev account)

## 2) KPI & Evidence Requirements
### 2.1 KPI definition: “First response <60s”
- Start timestamp (T0): lead received by our system.
  - If form tool: form submission timestamp OR inbound webhook receipt log time.
  - If CRM: contact/lead created timestamp OR inbound event receipt time.
- End timestamp (T1): first outbound SMS request created/sent (provider API accepted) OR outbound message log entry.
- Pass: (T1 - T0) ≤ 60 seconds.
- Evidence to save per run: screenshot/export of inbound event + outbound SMS log with timestamps.

### 2.2 Minimum samples for pilot proof
- 20 total runs across sources (recommended):
  - 10 Jotform, 5 Generic Webhook, 5 HubSpot.
- Must include at least: 2 invalid/missing phone, 2 duplicates, 1 retry, 1 after-hours.

## 3) Deterministic Fallback Mode (LLM failure safe mode)
Trigger fallback if: LLM timeout (>8s), non-200 error, empty/unsafe output, or rate limit.

### 3.1 Global rules
- Always identify business and provide opt-out.
- Never ask for sensitive info (SSN, payment card, etc.).
- STOP/HELP must be handled immediately.
- If user is abusive/unknown: short neutral response + escalation.

### 3.2 Exact fallback SMS flow (copy/paste)
**Message 1 (sent immediately upon lead receipt):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out about {{service}}. Quick question so we can help fast: what’s the address or ZIP code for the job? Reply STOP to opt out.”

If reply contains **STOP** (case-insensitive, exact word or startswith):
“OK — you’re opted out and won’t receive more texts. Reply HELP for info.”
- Mark lead status: Opted Out.
- Do not send further messages.

If reply contains **HELP**:
“Help: {{business_name}} texts to follow up on your request and schedule service. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”

**If no reply in 3 minutes:**
“Just checking — what ZIP code is the service needed in? We can usually book quickly.”

**After ZIP provided:**
“Thanks. What type of help do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”

**After type chosen:**
“When would you like this handled? Reply 1) Today 2) This week 3) Flexible”

**Booking/hand-off step:**
- If calendar link is healthy: 
“Perfect — here’s the booking link: {{calendar_link}}. If you prefer, reply with 2 time windows that work.”
- If calendar link fails/unavailable:
“Scheduling link is temporarily down. Reply with 2 time windows that work and we’ll confirm by text.”

**After-hours rule (if outside configured hours):**
“Thanks — we’re closed right now, but we’ll confirm first thing when we open at {{open_time}}. If urgent, reply ‘URGENT’.”
- Create internal task/notification.

## 4) Test Acceptance Matrix (Pass/Fail)
### 4.1 Missing phone
- Input: lead payload missing phone field.
- Expected: no SMS attempt; lead marked “Needs phone”; optional email/internal note created; no crash.
- Pass: system logs validation error; no outbound SMS.

### 4.2 Invalid phone
- Input: phone like “123”, “+1 (555)”, or letters.
- Expected: phone normalized/validated; if invalid, behave like missing phone.
- Pass: no outbound SMS; clear error state.

### 4.3 STOP
- Input: user replies STOP.
- Expected: immediate opt-out confirmation; suppress all future sends for that number.
- Pass: any subsequent triggers do not text.

### 4.4 HELP
- Input: user replies HELP.
- Expected: send help message with contact email: agent_bob_replit+lead-copilot@agentmail.to.
- Pass: help content sent; no opt-out unless STOP.

### 4.5 After-hours
- Input: lead arrives outside hours.
- Expected: first SMS still sent quickly (≤60s) but sets expectation; scheduling deferred; no call booking.
- Pass: correct after-hours copy; internal notification created.

### 4.6 Multiple concurrent leads
- Input: submit 5 leads within 30 seconds.
- Expected: all receive first SMS ≤60s; no cross-talk between conversations.
- Pass: correct mapping lead→thread.

### 4.7 Calendar link failure
- Input: booking link endpoint returns error or is blank.
- Expected: fallback to “reply with 2 time windows”; create task for human confirmation.
- Pass: no dead-end for customer.

### 4.8 Webhook retries
- Input: send same webhook event id 3 times.
- Expected: dedupe prevents duplicate SMS.
- Pass: only one first SMS.

### 4.9 Duplicate leads (same phone)
- Input: 2 form submits with same phone within 10 minutes.
- Expected: either merge into same conversation or send one message with context; no spam.
- Pass: max 1 new outbound within throttle window.

### 4.10 HubSpot note formatting
- Input: qualified lead.
- Expected HubSpot note body (single block, easy scan):
  - “Lead Copilot Summary”
  - Name/Phone
  - Source (HubSpot/Jotform/Webhook)
  - Service requested
  - ZIP/address
  - Time preference
  - Conversation transcript (last 5 messages)
  - Booking status + link
- Pass: note is readable; no broken markdown; timestamps included.

## 5) Concrete Test Inputs
### 5.1 Generic Webhook JSON (example)
POST to: {{YOUR_WEBHOOK_ENDPOINT}}
Headers: Content-Type: application/json
Body:
{
  "event_id": "evt_001",
  "source": "webhook",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test@example.com",
    "service": "Plumbing leak",
    "submitted_at": "{{ISO_TIMESTAMP}}"
  }
}
Variants:
- Missing phone: remove phone field.
- Invalid phone: "phone": "123".
- Retry: reuse same event_id.

### 5.2 Jotform submission fields
Create a form with:
- First Name, Last Name
- Phone
- Email
- Service needed (dropdown)
- ZIP
Configure submission webhook to {{YOUR_WEBHOOK_ENDPOINT}} (or Jotform→Zapier/Make if needed later; for now webhook direct).

### 5.3 HubSpot
Trigger: new contact/lead created with phone.
Required properties to map: firstname, lastname, phone, email, lifecycle stage (optional), lead source.
Expected: Copilot writes an engagement note with the formatting in section 4.10.

## 6) Results Capture Table (fill during pilot)
For each test run:
- Run ID:
- Source (Webhook/Jotform/HubSpot):
- Scenario (normal/missing phone/STOP/etc.):
- T0 inbound received (timestamp + where captured):
- T1 first SMS accepted/sent (timestamp + where captured):
- Delta seconds:
- Pass KPI (<60s): Y/N
- Pass behavior acceptance: Y/N
- Evidence link (screenshot/log URL):
- Notes:

## 7) Bug/Fix Log Template
- Bug ID:
- Severity (P0 churn risk / P1 serious / P2 minor):
- Source:
- Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Suggested fix:
- Owner:
- Status (Open/In progress/Fixed/Verified):

## 8) Known High-Risk Areas to Watch During First Pilot
- Dedupe keys (event_id + phone + time window) to prevent spam.
- STOP enforcement across all triggers and retries.
- Phone normalization (E.164) and validation.
- Concurrency isolation (each lead thread mapped correctly).
- Calendar link health checks and safe fallback.

## 9) Customer-facing legitimacy reference (for agencies/pilots)
If any tester/agency asks for legitimacy during QA/pilot, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to
