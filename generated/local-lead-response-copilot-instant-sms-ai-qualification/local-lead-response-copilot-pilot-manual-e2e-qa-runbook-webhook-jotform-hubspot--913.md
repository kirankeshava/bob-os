# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:30:43.850Z

---

Business context (share with agencies for legitimacy)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Goal of this runbook
Validate end-to-end lead handling across 3 lead sources with a hard KPI: first outbound SMS sent within 60 seconds of lead receipt, and safe behavior under failures (LLM down, bad data, after-hours, opt-out keywords). This is designed for the first 1–3 pilots (manual execution; no automation required).

Scope: lead sources to test (minimum viable coverage)
1) Generic Webhook JSON (POST into our webhook endpoint)
2) Jotform (real form tool) → webhook/Zapier-like handoff into our intake
3) HubSpot (CRM) → new contact / form submission / workflow trigger into our intake, plus CRM note write-back

Required environment assumptions (fill during pilot)
- SMS provider: __________
- From number: __________
- Test handset(s): __________
- Calendar/booking link used in flow: __________
- After-hours window (local time): __________
- Deduplication key (phone/email/lead_id): __________

KPI definition and how to measure it
- KPI: First response time < 60 seconds.
- Start time (T0): when our system receives the lead (server receive timestamp). If you cannot access server logs, use the webhook delivery timestamp from the source + record local time to nearest second.
- SMS queued/sent time (T1): timestamp from SMS provider logs (queued/sent). If not available, use the time the message appears in provider console.
- Handset delivery time (T2): when the SMS arrives on the test phone (record via screen recording or manual stopwatch).
- Pass rule: T1 - T0 <= 60s (primary). Track T2 - T0 as “carrier lag” (informational).

Results table (copy/paste for each test)
Columns:
- Test ID | Lead source | Scenario | T0 received | T1 SMS sent | T2 delivered | Δ(T1-T0) | Δ(T2-T0) | Pass/Fail | Notes/bug link

Deterministic fallback flow (no-LLM) — MUST trigger on LLM timeout/error
Trigger conditions
- LLM call fails, times out, returns empty/invalid JSON, or exceeds latency threshold (recommend: 8–10s budget).
- Also acceptable as a “safe mode” toggle during incidents.

Fallback messages (exact text)
Message 1 (immediate; always within <60s):
“Hi {{first_name}}, it’s {{business_name}}. Quick question so we can help fast—what do you need help with? Reply 1) Repair 2) Quote/Install 3) Other”

If reply = 1 (Repair):
“Got it. What’s the issue? Reply 1) Not working 2) Leaking/Damaged 3) Other”

If reply = 2 (Quote/Install):
“Great—what are you looking to install/quote? Reply with a few words (e.g., ‘water heater’, ‘roof repair’, ‘HVAC’).”

If reply = 3 (Other) or free text:
“Thanks. What’s your address or ZIP code so we can match you with the right team?”

Booking handoff (once intent confirmed or after 2 questions):
“Perfect—here’s the fastest way to get scheduled: {{calendar_link}}. If you prefer, reply with 2 times that work today/tomorrow.”

After booking confirmation (manual or via calendar webhook):
“You’re booked. We’ll see you {{appt_time}}. Reply STOP to opt out.”

Compliance keywords
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately confirm opt-out: “You’re opted out. Reply START to opt back in.” Ensure no further marketing/automation messages.
- If inbound contains “HELP”: “Help: This is {{business_name}} appointment/text line. Reply STOP to opt out or email agent_bob_replit+lead-copilot@agentmail.to.”

Fail-safe behavior matrix (expected outcomes)
1) Missing phone
- Expected: Do not attempt SMS. Create CRM note: “Lead missing phone; cannot text.” If email exists, send an email notification to operator; else mark as “Needs follow-up.”
- KPI: Not applicable (no SMS). Must not error-loop.

2) Invalid phone (non-E.164, too short, letters)
- Expected: Validate and reject; no SMS. CRM note includes original value and validation failure reason.

3) STOP/HELP
- STOP: mark contact as opted-out; suppress future sends across all sources.
- HELP: send help message; do not opt out unless STOP received.

4) After-hours
- Expected: Send one immediate acknowledgment OR a compliant after-hours message based on policy.
Recommended after-hours message (if immediate contact allowed):
“Thanks for reaching out—our office is currently closed. We’ll text you first thing at {{next_open_time}}. If urgent, reply URGENT.”
- If URGENT: route to on-call/owner notification; still respect STOP.

5) Multiple concurrent leads (load)
- Expected: No dropped leads; queue processing; each lead gets first SMS within 60s under reasonable burst (test 5 leads within 10 seconds).

6) Calendar link failures (down/invalid)
- Expected: If booking link cannot be generated or returns error, switch to manual scheduling:
“Sorry—our scheduling link is having issues. Reply with your preferred day/time and we’ll confirm.”
- Log incident in CRM note.

7) Webhook retries
- Expected: Idempotency. If the same lead_id is resent, do not send duplicate SMS; instead update CRM note with “duplicate delivery suppressed”.

8) Duplicate leads (same phone/email within window)
- Expected: Deduplicate within configurable window (recommend 30–120 minutes). If duplicate, do not restart qualification; append note and optionally send a single: “We got your request—reply YES if you still need help.”

9) CRM note formatting (HubSpot)
- Expected note template (exact format):
Title: “Lead Copilot Transcript — {{date}} {{time}}”
Body:
Lead Source: {{source}}
Lead ID: {{lead_id}}
Name: {{name}}
Phone: {{phone}}
Email: {{email}}
Received At: {{T0}}
First SMS At: {{T1}} (Δ {{delta}}s)
Status: {{Qualified/Unqualified/Opted-out/After-hours/Booked/Needs manual}}
Summary: {{1-2 line summary}}
Transcript:
- Outbound: “…"
- Inbound: “…"
- Outbound: “…"
Booking:
- Calendar Link: {{link or ‘failed’}}
- Appointment Time: {{time or ‘N/A’}}
Compliance:
- Opt-out: {{Yes/No}}; Keyword: {{STOP/none}}

Test cases (execute manually)
A. Generic Webhook JSON
Prereq: webhook endpoint URL = __________
Use curl or Postman. Record T0 at request send + server receive if available.
A1 Valid lead
Payload:
{
  "lead_id": "qa-webhook-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test+001@example.com",
  "service": "HVAC repair",
  "submitted_at": "{{now}}"
}
Expected: First SMS (Message 1) within 60s; CRM note created/updated.

A2 Missing phone
Same as A1 but omit phone.
Expected: No SMS; CRM note indicates missing phone; no retries loop.

A3 Invalid phone
"phone": "555-ABC-0101"
Expected: No SMS; CRM note indicates invalid phone.

A4 Duplicate lead_id retry
Send A1 twice with same lead_id.
Expected: Only one SMS; second delivery suppressed and logged.

A5 Burst concurrency
Send 5 unique lead_ids within 10 seconds.
Expected: 5 first SMS within 60s each; no cross-contamination of transcripts.

B. Jotform
Prereq: Jotform form fields must include: name, phone, email, service needed, preferred time.
Test submissions:
B1 Normal submission
Expected: same as A1.
B2 Invalid phone
Expected: same as A3.
B3 After-hours submission (submit during after-hours window)
Expected: after-hours message/policy; no booking link if policy prohibits.
B4 Duplicate submission (same phone within 10 minutes)
Expected: dedupe policy applied.

C. HubSpot
Prereq: Decide trigger: new contact created OR form submission OR workflow webhook.
C1 New contact with valid phone
Expected: SMS within 60s; CRM note formatted exactly per template.
C2 Update existing contact (duplicate lead)
Expected: suppress duplicate SMS; append note.
C3 Note formatting audit
Expected: title/body structure preserved; transcript lines readable; no broken markdown.

Edge-case inbound keyword tests (execute from handset)
D1 STOP
- After receiving Message 1, reply STOP.
Expected: opt-out confirmation; no more messages upon further lead events.
D2 HELP
- Reply HELP.
Expected: help response; not opted out.

Bug log + fix list (use this format)
- Bug ID:
- Title:
- Severity: (Blocker/High/Med/Low)
- Source: (Webhook/Jotform/HubSpot/SMS)
- Steps to reproduce:
- Expected:
- Actual:
- Evidence: (screenshots/log links)
- Suspected cause:
- Proposed smallest fix/workaround:
- Retest status:

Initial high-risk bugs to watch for (pre-populated checklist)
1) Phone parsing accepts invalid formats and still sends SMS (compliance/reputation risk)
2) STOP not persisted across sources (opt-out leakage)
3) Duplicate webhook deliveries create multiple SMS blasts
4) After-hours still sends multi-step qualification (annoying + churn risk)
5) Calendar link failure causes flow to stall (no manual fallback)
6) HubSpot note formatting collapses into one line / loses transcript order
7) Concurrency mixes transcripts between leads (catastrophic)

Acceptance criteria (pilot sign-off)
- At least 20 total test leads across the 3 sources, including edge cases.
- 95%+ of valid leads have Δ(T1-T0) <= 60 seconds; any misses have a documented root cause + workaround.
- Deterministic fallback flow successfully activates on forced LLM failure and still qualifies + offers booking.
- STOP/HELP behaviors verified and logged; opt-out persists.
- HubSpot notes match template and are readable for agency reporting.
