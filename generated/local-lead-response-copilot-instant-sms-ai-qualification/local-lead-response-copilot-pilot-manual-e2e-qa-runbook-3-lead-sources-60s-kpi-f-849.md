# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:31:18.119Z

---

## 0) Scope + Goal (pre-revenue / pilot-safe)
Goal: protect reputation and reduce churn by verifying: (a) first SMS response <60 seconds from lead creation, (b) safe behavior on common failure modes, (c) deterministic qualification works if LLM fails.

Lead sources in-scope (3):
1) Generic Webhook JSON (any form/ad tool)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Evidence to store for every run (paste into Results table):
- Lead source + lead ID
- t0: lead created timestamp (form submit/webhook received/CRM create)
- t1: first outbound SMS queued timestamp
- t2: first outbound SMS delivered (if delivery receipts exist)
- First-response latency: t1 - t0 (primary KPI) and t2 - t0 (secondary)
- Transcript snippet + system state (LLM mode vs deterministic)
- Screenshot/log link where available

KPI acceptance:
- PASS if median (P50) t1-t0 < 30s and max (P95) < 60s across 20 trials.
- FAIL if any single lead exceeds 60s without explicit, logged reason (provider outage, after-hours hold, invalid phone).

---
## 1) Preconditions / Setup
Required (no spend assumed):
- Access to product admin/logs that show webhook receipt time + SMS queue time.
- A test SMS-capable phone number to receive messages (can be a team member’s phone during pilot).
- If using HubSpot: a free HubSpot account is sufficient for basic contact + note validation.
- If using Jotform: free Jotform form with name/phone/email fields.

Configuration assumptions (document actual values during pilot):
- Business hours (example): Mon–Fri 8am–6pm local
- Default booking link (calendar): <calendar URL>
- Escalation email: agent_bob_replit+lead-copilot@agentmail.to
- Legitimacy URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---
## 2) Deterministic fallback mode (LLM down / timeout)
Trigger deterministic mode when:
- LLM API error OR
- LLM response time > 6 seconds OR
- LLM returns empty/invalid schema OR
- Safety filter blocks generation

Fallback principles:
- Ask minimal questions (2–4), keep it compliant, stop if user opts out.
- Never hallucinate availability, prices, or confirmations.
- Always offer human escalation.

Exact deterministic question flow (copy/paste):
1) Immediate first SMS (sent as soon as lead received):
   "Hi {first_name}, this is {business_name}. Thanks for reaching out—quick questions so we can help fast. What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other"
2) Based on reply:
   - If 1/2/3/4/Other text: proceed.
3) Q2 (job location):
   "Thanks. What’s the address or zip code for the job?"
4) Q3 (urgency / timing):
   "Got it. When do you need this? Reply 1) ASAP 2) This week 3) Next week 4) Just researching"
5) Q4 (permission to call + booking):
   "Perfect—want to book a quick call or text-only? Reply 1) Call me 2) Send booking link 3) Text only"
6) If user requests booking link:
   Send: "Here’s the link to pick a time: {calendar_link}. If it doesn’t open, reply BOOK and we’ll text 2–3 times." (See calendar failure behavior below.)
7) Escalation rule:
   - If user answers any 2 questions but conversation stalls for 10 minutes OR user types “AGENT”/“HUMAN”: create internal task + email agent_bob_replit+lead-copilot@agentmail.to with transcript + lead details.

STOP/HELP compliance (must override all flows):
- If inbound contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT: immediately stop all messages and send: "You’re opted out and will no longer receive messages." Mark lead DNC.
- If inbound contains HELP/INFO: send: "Reply STOP to opt out. For help, email agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4"

After-hours behavior:
- If outside business hours, still send first SMS within 60s but set expectation:
  "Thanks {first_name}—we’re currently closed. We’ll follow up at {next_open_time}. If urgent, reply URGENT." 
- If URGENT: trigger escalation email + optionally send booking link if available.

---
## 3) Lead Source Test Cases (E2E)
### A) Generic Webhook JSON
Purpose: validate the universal integration most agencies will use.

Test payloads (POST to webhook endpoint; adjust to actual endpoint):
1) Valid lead
{
  "source": "webhook",
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "Repair",
  "message": "Need help today"
}
Expected:
- First SMS queued <60s from webhook receipt
- Conversation starts (LLM or deterministic)
- CRM note (if enabled) includes source=webhook and lead_id

2) Missing phone
{ "source":"webhook","lead_id":"wh_002","first_name":"NoPhone","email":"nophone@example.com" }
Expected:
- NO SMS attempt
- Create internal task + email agent_bob_replit+lead-copilot@agentmail.to: “Missing phone” with payload
- If CRM exists: note “Missing/invalid phone; cannot contact”

3) Invalid phone
{ "source":"webhook","lead_id":"wh_003","first_name":"BadPhone","phone":"123","email":"bad@example.com" }
Expected:
- Validation failure; no SMS
- Logged as invalid; escalation email created

4) Duplicate lead (same phone + source within 10 min)
Send wh_001 again.
Expected:
- Deduped: do not send duplicate first SMS
- CRM note: “Duplicate suppressed” + reference original lead_id

5) Webhook retry simulation
Send same event with header X-Retry: true (or resend same payload 3x).
Expected:
- Idempotency: only one outreach
- No multiple CRM notes

### B) Jotform
Purpose: validate a real form tool used by home services.

Setup steps:
- Create Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), Message.
- Configure Jotform webhook to product endpoint.

Test cases:
1) Normal submit with valid phone
Expected: first SMS <60s; correct name substitution.
2) Submit with phone blank
Expected: no SMS; escalation email + log.
3) Submit with phone containing parentheses/spaces (e.g., (415) 555-0101)
Expected: normalized to E.164; SMS sent.
4) Concurrency: submit 5 leads in <60s (different phones)
Expected: all 5 get first SMS <60s; no cross-talk; correct personalization.

### C) HubSpot CRM
Purpose: validate CRM ingestion + note formatting agencies care about.

Setup assumptions:
- HubSpot workflow or webhook triggers when Contact is created/updated with lifecycle stage “Lead”.

Test cases:
1) New contact created with phone
Expected:
- First SMS <60s from HubSpot event receipt
- A Note is appended to the contact record with consistent formatting (below)

2) Duplicate contact (same phone)
Expected:
- Do not restart qualification if conversation active <24h
- Add note: “Duplicate/Existing contact—continued thread”

3) CRM note formatting (required)
Expected note template (exact):
"[Lead Response Copilot]\nSource: {source} ({source_detail})\nLead ID: {lead_id}\nReceived: {t0_iso}\nFirst SMS queued: {t1_iso} (latency {latency_seconds}s)\nMode: {LLM|Deterministic}\nSummary: {1-2 lines}\nTranscript:\n- Outbound: {msg1}\n- Inbound: {reply1}\n- Outbound: {msg2}\nOpt-out: {true|false}"

---
## 4) Global Failure-Mode Tests (run across sources)
1) STOP: user replies STOP
Expected: immediate opt-out confirmation; no further messages; CRM note “Opt-out=true”.
2) HELP: user replies HELP
Expected: help message includes email agent_bob_replit+lead-copilot@agentmail.to and legitimacy URL.
3) After-hours lead
Expected: first SMS still <60s but promises next open; no booking claim.
4) Calendar link failure
Simulate: use invalid calendar_link or observe 404.
Expected: message instructs user to reply BOOK; system emails agent_bob_replit+lead-copilot@agentmail.to with “Calendar link failed” and lead details; avoid loops.
5) LLM failure
Simulate by disabling LLM key or forcing timeout.
Expected: deterministic flow begins; no blank/garbled messages.

---
## 5) Results Table (paste/fill during pilot)
Columns:
- Date
- Source (Webhook/Jotform/HubSpot)
- Test Case ID
- Lead ID
- Phone
- t0 received (ISO)
- t1 first SMS queued (ISO)
- Latency seconds
- Mode (LLM/Deterministic)
- Pass/Fail
- Evidence link/screenshot
- Notes

---
## 6) Bug / Fix Log Template (prioritize churn risk)
Fields:
- Bug ID
- Severity (S0 compliance / S1 revenue / S2 annoying / S3 cosmetic)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Impact (conversion/compliance/reputation)
- Suggested fix
- Owner
- Status

High-risk bugs to watch (auto-S0/S1):
- STOP not honored immediately
- Duplicate lead spams user
- First response >60s without after-hours justification
- Calendar link failure causes dead-end
- Missing/invalid phone triggers SMS attempts (carrier complaints)

---
## 7) Definition of “Verified <60s first response”
To claim verification, store:
- 20 trial rows completed across 3 sources (minimum 5 each; remaining 5 any)
- Logs showing t0 and t1 for each trial
- Summary stats: median, P95, max
- Any outliers annotated with root cause

If verification fails:
- Immediate mitigation: switch to deterministic mode by default and reduce dependencies (no multi-step LLM call before first SMS).
- Operational workaround: send first SMS instantly with deterministic opener, then do deeper qualification after first reply.
