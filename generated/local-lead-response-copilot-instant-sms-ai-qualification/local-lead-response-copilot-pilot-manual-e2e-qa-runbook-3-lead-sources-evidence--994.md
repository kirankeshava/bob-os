# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Evidence Pack + Fail-safe Deterministic Mode

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:46:48.569Z

---

## Purpose
Validate end-to-end lead response reliability for early pilots (no automation). Primary KPI: **first outbound SMS sent < 60 seconds** from lead receipt. Secondary: safe compliance behavior (STOP/HELP), correct routing (after-hours), dedupe/retries, calendar fallback, and CRM logging.

Business legitimacy references for any pilot comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## Lead Sources Covered (3)
1) **Generic Webhook JSON** (any ad/form tool can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM; verify note formatting)

## Evidence & Timing Method (to prove <60s)
For each trial, capture these timestamps (UTC preferred):
- T0 = lead received by copilot (webhook request received time OR platform submission time)
- T1 = first SMS queued/sent timestamp (Twilio/message log)
- Delta = T1 - T0 (must be < 60s)

Evidence to store per trial:
- Screenshot/export of submission (Jotform) or raw request (Webhook) or record creation (HubSpot)
- Screenshot/log line showing T1 (message provider log)
- Copy of first outbound SMS body

Sample size guidance:
- Minimum 20 total trials, at least: 8 webhook, 6 Jotform, 6 HubSpot.
- Include at least 1 trial per edge case below.

## Pre-Flight Checklist (10 minutes)
- Confirm inbound lead endpoint is reachable (200 OK on test request).
- Confirm SMS sending pipeline is connected (message logs available).
- Confirm deterministic mode toggle exists (or the system has documented fallback behavior).
- Confirm after-hours window configured (e.g., 6pm–8am local) and business timezone set.
- Confirm calendar booking link configured (even a dummy link for negative tests).
- Confirm dedupe key definition (recommended: phone+source within 10 minutes).

## Deterministic Qualification Fallback (LLM Down / Timeout)
Trigger conditions:
- LLM call errors, times out, returns empty/unsafe output, or exceeds latency budget (recommend: 8 seconds).

Fallback rules:
1) Always send first SMS immediately (<60s). Do not wait for LLM.
2) Use a fixed question sequence. Stop after 3 questions or when booking intent is clear.
3) If user requests HELP: send help text and notify human.
4) If user sends STOP: immediately confirm opt-out and halt.
5) If after-hours: acknowledge and offer booking link + promise next-business-day follow-up.

Fallback script (exact messages):
- First message (always):
  "Hi {first_name}, this is {biz_name}. Thanks for reaching out — can I ask 2 quick questions to get you the fastest quote? Reply YES to continue."
- If YES:
  Q1: "What service do you need? (e.g., repair, install, estimate)"
  Q2: "What’s your address or ZIP code?"
  Q3: "When do you want this done? (Today / This week / Flexible)"
- Booking handoff:
  "Got it. You can pick a time here: {calendar_link}. If you prefer, reply with a good time and we’ll confirm."
- If LLM fails mid-thread:
  Continue deterministic Qs; do not mention AI.

Escalation-to-human:
- If user answers with high urgency (e.g., “flood”, “no heat”) or expresses frustration:
  "Understood — I’m looping in a specialist now. If it’s urgent, call us at {phone} and we’ll prioritize you."

## Test Cases (Pass/Fail + What to Capture)

### A. Missing Phone
Goal: no SMS attempt; safe handling.
- Input: lead without phone field.
- Pass: system logs “missing phone”, creates CRM note if configured, and triggers email alert to agent/human; no SMS sent.
- Evidence: lead record + log line + alert email.

### B. Invalid Phone
- Input: phone like “123”, “+1abc”, or wrong length.
- Pass: no SMS; attempt normalization; if still invalid, create note + alert.
- Evidence: normalization log + no message sent.

### C. STOP / HELP Compliance
- Input: reply STOP.
- Pass: confirm opt-out message; set contact do-not-text; no further messages.
- Input: reply HELP.
- Pass: send help text (who we are + how to contact + opt-out instruction) and notify human.
- Evidence: full transcript + timestamps.

### D. After-hours Behavior
- Input: lead submitted during after-hours window.
- Pass: immediate acknowledgement SMS (<60s) that sets expectation + offers booking link; no aggressive follow-ups.
- Evidence: SMS body + timestamps + after-hours tag.

### E. Multiple Concurrent Leads
- Input: 5 leads within 10 seconds.
- Pass: all receive first SMS <60s; no cross-talk between threads.
- Evidence: message logs per lead.

### F. Calendar Link Failure
- Setup: use broken calendar URL.
- Pass: system detects failure (or user reports) and offers alternative: “reply with 2 times”; escalates to human.
- Evidence: transcript + internal alert.

### G. Webhook Retries
- Input: same webhook delivered twice (simulate retry with same event_id).
- Pass: dedupe prevents duplicate SMS; logs idempotent handling.
- Evidence: only one outbound SMS.

### H. Duplicate Leads (Different IDs, Same Phone)
- Input: two leads from same phone within 10 minutes.
- Pass: either (a) suppress second outreach, or (b) send a single “We got your request—still want help?” message; never spam.
- Evidence: dedupe decision logged.

### I. HubSpot Note Formatting
- Pass criteria: note includes source, lead fields, timestamps, qualification answers, and booking status in a readable block.
- Evidence: screenshot of HubSpot record.

## Copy-Paste Test Payloads

### 1) Generic Webhook JSON (valid)
POST /lead-webhook
{
  "event_id": "test-001",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Customer",
    "phone": "+14155550123",
    "email": "test.customer@example.com",
    "service": "Water heater install",
    "zip": "94107"
  }
}

### 2) Generic Webhook JSON (missing phone)
{
  "event_id": "test-002",
  "source": "webhook",
  "submitted_at": "2026-04-09T12:05:00Z",
  "lead": {
    "first_name": "NoPhone",
    "email": "nophone@example.com",
    "service": "HVAC repair"
  }
}

### 3) Generic Webhook JSON (retry: same event_id)
Send payload from test-001 again.
Expected: idempotent; no second SMS.

## Jotform Setup (field mapping)
Create a free Jotform with fields:
- First Name (first_name)
- Last Name (last_name)
- Phone (phone)
- Email (email)
- Service Needed (service)
- ZIP (zip)
Configure webhook to your lead endpoint.
Pass: submission triggers SMS <60s and logs “source=jotform”.

## HubSpot Setup (expected note template)
When a lead is created/updated, append a note like:
"[Lead Copilot] Source: {source}\nSubmitted: {submitted_at}\nName: {first} {last}\nPhone: {phone}\nService: {service}\nQualifying Answers:\n- Q1 Service: {a1}\n- Q2 Zip: {a2}\n- Q3 Timing: {a3}\nStatus: {booked|pending|after-hours|opted-out}\nFirst SMS Sent: {t1} (Δ {delta}s)"

## Results Table (fill during pilot)
Columns:
Trial ID | Source | Scenario | T0 | T1 | Delta(s) | First SMS Body | Outcome(P/F) | Evidence Link | Notes/Bug ID

## Likely Bugs / Fixes (prioritized)
P0: STOP not persisting -> must set global do-not-text flag.
P0: Dedupe missing -> retries cause double texts.
P1: Phone normalization errors -> invalid numbers sent to carrier.
P1: After-hours mis-timezone -> wrong messaging.
P1: Calendar failures not handled -> user stuck.
P2: HubSpot note formatting inconsistent -> agencies complain.

## Exit Criteria
- 20 trials completed with evidence.
- >= 95% of trials meet <60s first response (and 100% for “happy path” per source).
- All compliance tests pass (STOP/HELP).
- Fallback deterministic flow verified by forcing LLM failure (or simulating timeout) and capturing transcript.

If a customer/agency requests legitimacy during pilot, use the website above and have them email agent_bob_replit+lead-copilot@agentmail.to for confirmation and onboarding steps.
