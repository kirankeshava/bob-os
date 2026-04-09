# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:51:58.886Z

---

Business context (use in any comms)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Proof/legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Goal of this runbook
Validate (manually, during first 1–3 pilots) that:
1) First response SMS is sent in <60 seconds from lead creation across 3 lead sources.
2) The system behaves safely when inputs are bad (missing/invalid phone), users send STOP/HELP, it’s after-hours, the calendar link fails, webhooks retry/duplicate, multiple leads arrive concurrently, or the LLM fails.
3) CRM (HubSpot) notes are formatted consistently for agency reporting.

Scope: 3 lead sources
A) Generic Webhook JSON (direct POST into our endpoint)
B) Jotform (real form tool) -> webhook to our endpoint
C) HubSpot (CRM) -> workflow/webhook (or middleware) to our endpoint AND write-back note

Key KPI definition (<60s)
- KPI is measured as: T_first_sms_sent - T_lead_received <= 60 seconds.
- We record three timestamps when possible:
  1) T0 Lead Received: server timestamp when webhook/form/CRM event is received.
  2) T1 SMS Queued/Sent: timestamp when SMS provider request is created (or message status becomes “sent”).
  3) T2 Delivered to handset: timestamp from SMS provider delivery receipt OR video proof on test phone with device clock visible.
- Pass criteria: T1 - T0 <= 60s. (T2 is informative; networks can vary.)

Pre-flight checklist (do before running cases)
1) Test phone numbers
- Use a dedicated test phone that can receive SMS.
- Have 2 additional numbers (or teammates) to test concurrency and STOP/HELP.
- Ensure device clock is accurate (auto time).

2) Config sanity
- Default business hours for test: 9am–5pm local time.
- After-hours behavior configured (see expected behavior section).
- Calendar/booking link configured (even if it’s a dummy link for negative testing).
- LLM fallback mode available (or simulate LLM failure by disabling key/forcing timeout if supported).

3) Dedupe key agreement
- Define dedupe key order for test expectations (recommended):
  - Primary: source_lead_id if present
  - Secondary: (normalized_phone + source + campaign_id + day)
  - Minimum: normalized_phone + (first_name + last_name) within a 10-minute window

4) Data normalization rules
- Phone normalization: E.164 preferred. Accept common US formats and convert. Reject clearly invalid.
- Missing phone: do not attempt SMS.

Deterministic fallback qualification flow (no-LLM)
Trigger conditions
- Any LLM error/timeout (>5–8s waiting), empty response, or safety filter block.
- Also can be forced via config flag for testing.

Fallback conversation (exact copy)
Message 1 (immediate):
“Hi {first_name}, it’s {biz_name}. Thanks for reaching out — I can help you get a quick quote. What service do you need? Reply with 1) {ServiceA} 2) {ServiceB} 3) Other”

If reply = 1/2/3 (or text):
Message 2:
“Got it. What’s your ZIP code?”

If ZIP provided (5 digits US or valid local pattern):
Message 3:
“Thanks. When would you like it done? Reply 1) ASAP 2) This week 3) Flexible”

If timing provided:
Message 4 (handoff to booking):
“Perfect — here’s the quickest way to lock in a time: {calendar_link}. If you prefer, reply with a good time for a call.”

Stop conditions
- If user sends STOP: immediately confirm opt-out and cease.
- If user sends HELP: provide short help + support email.

Compliance keywords handling
- STOP (and equivalents: STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT):
  - Expected: “You’re opted out and won’t receive more texts. Reply START to opt back in.”
  - System must set opt_out=true and block future sends.
- HELP:
  - Expected: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

After-hours behavior
- If lead arrives outside business hours:
  - Send immediate acknowledgement within 60s:
    “Thanks {first_name} — we’re currently closed, but we got your request. What service do you need? Reply 1) {ServiceA} 2) {ServiceB} 3) Other”
  - Continue qualification asynchronously, but do NOT promise immediate call.
  - Optionally offer booking link; label it clearly: “Earliest times for tomorrow are here: {calendar_link}”.

Calendar link failure behavior
- If booking link is unreachable/invalid (detected or reported):
  - Send fallback: “Sorry — the booking link is having trouble. Reply with a good time for a call (and your timezone), and we’ll confirm.”
  - Create CRM note with “CALENDAR_LINK_FAILED” tag.

HubSpot CRM note formatting (strict template)
When a lead is created/updated, append a note in this exact structure:

[Lead Copilot Summary]
Source: {source} | Source Lead ID: {source_lead_id}
Received: {T0 ISO8601} | First SMS Sent: {T1 ISO8601} | SLA: {SLA_seconds}s
Name: {first_name} {last_name}
Phone: {normalized_phone} | Email: {email}
Campaign: {campaign}/{adset}/{ad} (if available)
Status: {Qualified|Unqualified|OptedOut|Pending}
After-hours: {true/false}
Opt-out: {true/false} (keyword: {STOP/… if any})
Booking: {Booked|LinkSent|ManualFollowupNeeded}
Calendar URL: {calendar_link}

[Transcript]
1) OUT: {message}
2) IN: {reply}
...

[Tags]
{DUPLICATE_SUPPRESSED if applicable}
{WEBHOOK_RETRY_RECEIVED if applicable}
{LLM_FALLBACK_USED if applicable}
{CALENDAR_LINK_FAILED if applicable}

E2E test cases (execute + expected results)
For each test, record T0/T1/T2 and whether CRM note matches template.

A. Happy path (each source)
A1 Webhook JSON valid lead
- Input: valid name + phone + service interest.
- Expect: SMS #1 within 60s; qualification proceeds; HubSpot note created.

A2 Jotform valid lead
- Submit form with valid phone.
- Expect: same as A1. Confirm correct field mapping.

A3 HubSpot valid lead
- Create/trigger lead via HubSpot form/workflow.
- Expect: SMS #1 within 60s; CRM note appended to correct contact/deal.

B. Missing/invalid phone
B1 Missing phone
- Input: phone omitted/null.
- Expect: no SMS attempt; create CRM note “MISSING_PHONE”; optional email to business contact; no crashes.

B2 Invalid phone
- Input: “123”, “+1 000 000 0000”, or letters.
- Expect: no SMS; CRM note “INVALID_PHONE”; request corrected phone if email exists.

C. STOP/HELP compliance
C1 STOP
- After receiving first SMS, reply “STOP”.
- Expect: immediate opt-out confirmation; no further texts for any subsequent triggers.

C2 HELP
- Reply “HELP”.
- Expect: help message includes support email agent_bob_replit+lead-copilot@agentmail.to and STOP instructions; continue only if user engages.

D. After-hours
D1 After-hours lead
- Submit outside configured hours.
- Expect: acknowledgement <60s; no promise of immediate callback; booking link optional.

E. Concurrency
E1 Multiple concurrent leads (5 within 30 seconds)
- Fire 5 webhook leads quickly (or submit form multiple times with different phones).
- Expect: all get first SMS <60s; no cross-talk; each transcript isolated.

F. Calendar/link failures
F1 Invalid calendar link
- Set calendar link to invalid URL (or simulate failure).
- Expect: system sends manual follow-up prompt; CRM note tagged CALENDAR_LINK_FAILED.

G. Webhook retries
G1 Same payload resent 3 times (same source_lead_id)
- Expect: only one conversation started; duplicates logged/tagged; no double texting.

H. Duplicate leads
H1 Duplicate by phone within 10 minutes
- Submit same phone/name twice.
- Expect: second lead suppressed or merged; CRM note tag DUPLICATE_SUPPRESSED; no second SMS blast.

I. LLM failure -> deterministic fallback
I1 Force LLM timeout/error
- Trigger LLM failure mode.
- Expect: deterministic question flow begins immediately; no weird/empty messages; CRM note includes LLM_FALLBACK_USED.

Results capture table (copy/paste)
| Case ID | Source | Input variant | T0 lead received | T1 SMS sent | SLA (sec) | T2 delivered | Pass <60s | Transcript OK | CRM note OK | Issues |
|---|---|---|---|---|---:|---|---|---|---|---|

Bug log template
- Bug ID:
- Title:
- Severity (P0 churn/reputation, P1 major, P2 minor):
- Source (Webhook/Jotform/HubSpot):
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (timestamps/screenshots/provider logs):
- Suggested fix/workaround (smallest first):
- Retest cases impacted:

Minimal “definition of done” for pilot readiness
- For each of the 3 sources, run at least 5 happy-path submissions and 2 edge-case submissions.
- Achieve at least 90% of tests with T1-T0 <= 60s (and investigate any misses).
- Verify STOP compliance (no further messages after STOP) every time.
- Verify HubSpot notes match the strict template on at least 10 records.

Operator notes
- If SLA misses occur: first check queue/backlog, SMS provider status, webhook processing latency, and retry storms (duplicates). Prefer operational fixes (rate limits, dedupe, provider config) before engineering.
- If mapping issues occur (Jotform/HubSpot): fix field mapping; rerun A2/A3 immediately.
