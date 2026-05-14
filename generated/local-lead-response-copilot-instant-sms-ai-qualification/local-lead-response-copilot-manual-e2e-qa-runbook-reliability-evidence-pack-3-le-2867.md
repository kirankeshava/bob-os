# Local Lead Response Copilot — Manual E2E QA Runbook + Reliability Evidence Pack (3 Lead Sources, <60s KPI, Deterministic Fail-safe)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:29:14.211Z

---

## 0) Purpose
Run manual end-to-end checks during early pilots (no automation) to protect reputation with agencies: prove <60s first response, verify STOP/HELP compliance, confirm retries/deduping behavior, and ensure a deterministic fallback when the LLM fails.

**Public legitimacy URL (share with prospects/agencies):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support contact used in messages/docs:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope: 3 Lead Sources
1) **Generic Webhook JSON** (any form/ads platform → our webhook)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

## 2) KPI + Evidence Standard (<60s)
### KPI definition
**First response time =** Timestamp(SMS first outgoing attempt) − Timestamp(lead received at source).

### Evidence capture points
- Lead-source submission time (screenshot or submission log export)
- Webhook receive time (server log line, request log, or internal event log)
- SMS send attempt time (provider log or internal log)
- Recipient phone message receipt time (screenshot optional; helpful)

### Acceptance
- **Pass:** P95 < 60 seconds across at least **20 total** trials (mix across 3 sources). During pilot day 1, a smaller smoke test passes if **10/10 < 60s**.
- **Fail:** Any systematic delays >60s, or missing first-message attempts.

## 3) Pre-Flight Checklist (15 minutes)
- Confirm outbound SMS number is live.
- Confirm STOP/HELP keywords are supported.
- Confirm after-hours policy (business hours, timezone, fallback route).
- Confirm booking mechanism: calendar link or scheduling tool.
- Confirm internal logs accessible (even basic console logs).

## 4) Deterministic Fail-safe Qualification Flow (LLM down / timeout)
Trigger safe-mode if:
- LLM call errors, times out (>6 seconds), or returns empty/invalid.
- Any downstream tool call fails (calendar lookup, CRM write) and we still must proceed.

### Safe-mode message sequence (exact copy)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{biz_name}}. Thanks for reaching out — I can help fast. What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

**Branch A (1/2/3/4 received):**
“Got it. What’s your ZIP code?”

**Branch B (ZIP received):**
“Thanks. When do you want this handled? Reply 1) Today 2) This week 3) Just researching.”

**Branch C (timing received):**
“Perfect — what’s the best address or nearest cross-street (so we can confirm service area)?”

**Branch D (location received):**
“Thanks. Want to book a quick call or appointment? Reply 1) Book now (link) 2) Have someone call me.”

**If booking link is available:**
“Book here: {{calendar_link}}. If it doesn’t load, reply CALL and we’ll reach out.”

**Escalation rule:** If user replies CALL or if booking link fails, route to human and send:
“Understood — a specialist will call you shortly. If you need help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.”

**STOP/HELP compliance (must override all flows):**
- STOP: “You’re opted out and will no longer receive texts. Reply START to re-subscribe. Help: agent_bob_replit+lead-copilot@agentmail.to.”
- HELP: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

## 5) Test Data (Phone + Identity)
Use controlled test phones:
- Valid US mobile: +1XXXYYYZZZZ (tester)
- Invalid phone: “12345”, “+199999”, blank
- Duplicate lead: same phone + same email + same name within 2 minutes

Names:
- “Test Alice” / “Test Bob”
Emails:
- test.alice@example.com / test.bob@example.com

## 6) Expected HubSpot CRM Note Formatting (spec)
When a lead is qualified or attempts qualification, write a note (or engagement) with:
- Lead source
- Timestamp (ISO 8601)
- Conversation transcript summary
- Detected intent + answers
- Booking outcome (booked link / requested call / stopped)

**Exact note template:**
“[Lead Copilot] {{timestamp_iso}}
Source: {{source}}
Name: {{name}}
Phone: {{phone_e164_or_missing}}
Email: {{email_or_missing}}
Status: {{qualified|unqualified|pending|opted_out}}
Answers:
- Service: {{service}}
- ZIP: {{zip}}
- Timing: {{timing}}
- Location: {{location}}
Outcome:
- Booking: {{calendar_booked|calendar_link_sent|calendar_failed|call_requested|no_response}}
Transcript (last 6 msgs):
1) …
2) …”

Pass if formatting is consistent, readable, and placed on the correct contact record. Fail if it creates duplicates, truncates critical info, or breaks line formatting.

## 7) E2E Test Cases (Run Order)
### A) Generic Webhook JSON (8 cases)
**A1 Happy path**
Payload:
{
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Alice",
  "phone": "+14155550100",
  "email": "test.alice@example.com",
  "service": "Water heater repair",
  "submitted_at": "{{now}}"
}
Expected: SMS Message 1 within <60s.

**A2 Missing phone**: phone omitted.
Expected: No SMS attempt; create task/flag; optional email to support; record error.

**A3 Invalid phone**: phone=“12345”.
Expected: No send; error logged; no repeated retries.

**A4 STOP**: reply STOP after first message.
Expected: immediate opt-out confirmation; no further messages.

**A5 HELP**: reply HELP.
Expected: help message includes support email + public URL.

**A6 After-hours**: submit outside business hours.
Expected: after-hours message + next-open promise OR queue to morning; no spam.

**A7 Webhook retries**: resend identical payload 3 times.
Expected: dedupe prevents 3 parallel conversations; at most 1 qualification flow.

**A8 Duplicate leads**: same phone submitted twice with different service.
Expected: either merge into same thread + update intent, or create second case but avoid duplicate SMS blasts (define rule; record behavior).

### B) Jotform (6 cases)
Form fields: Name, Phone, Email, Service dropdown, ZIP, Preferred time.
**B1 Happy path submit**: check SMS <60s.
**B2 Missing phone field**: submit without phone.
**B3 Invalid phone**: non-E.164 / too short.
**B4 Concurrent submits**: submit form twice quickly from two different test phones.
**B5 After-hours submit**.
**B6 Calendar link failure simulation**: temporarily remove/blank calendar link; verify fallback message and escalation.

### C) HubSpot CRM (5 cases)
Create contact / deal / form submission depending on integration path.
**C1 New contact created triggers SMS**.
**C2 Existing contact submits again**: ensure dedupe/merge.
**C3 CRM note formatting**: verify template above.
**C4 STOP then new lead event**: ensure opt-out respected.
**C5 Webhook retry from HubSpot**: ensure idempotency.

## 8) Concurrency Test (must-run)
Submit 5 leads within 30 seconds (mix sources if possible).
Pass if:
- No cross-talk between threads
- Each lead receives first SMS <60s
- Logs show correct correlation IDs per lead

## 9) Results Table (paste into a sheet)
Columns:
- Test ID
- Source
- Submitted at (source)
- Webhook received at
- SMS sent at
- First response time (sec)
- Outcome (pass/fail)
- Evidence link (screenshot/log snippet)
- Notes

## 10) Bug/Fix Log (prioritized for churn risk)
Fields:
- Bug ID
- Severity (S0: compliance, S1: revenue-loss, S2: annoyance)
- Scenario/Test ID
- Steps to reproduce
- Expected vs Actual
- Suspected cause
- Recommended fix
- Workaround (pilot)

## 11) Agency-Facing Reliability Evidence Pack (what we can share)
After running tests, provide:
1) Short statement: “We tested first-response speed and fail-safes across webhook + Jotform + HubSpot.”
2) KPI screenshot: table showing first-response times and P95.
3) STOP/HELP transcript screenshots.
4) Description of deterministic safe-mode (above) that activates on LLM/tool failure.
5) Support contact: agent_bob_replit+lead-copilot@agentmail.to and legitimacy URL.

This pack is designed to reduce agency fear (“will your bot spam my leads / break compliance / respond too slowly?”) without spending time on full automation pre-revenue.