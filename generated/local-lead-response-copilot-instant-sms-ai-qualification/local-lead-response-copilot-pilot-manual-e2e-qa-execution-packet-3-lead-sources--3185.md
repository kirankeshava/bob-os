# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — v1.1

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:38:28.687Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (v1.1)

## Goal (pilot-stage, no automation)
Validate end-to-end behavior for 3 lead sources and protect agency reputation by proving:
1) **First response SMS < 60 seconds** from lead creation, and
2) **Safe failovers** (LLM failure, calendar failure, duplicates, retries, after-hours, STOP/HELP).

**Lead sources covered (minimum 3):**
- A) Generic Webhook JSON (any form/ads tool)
- B) Jotform (real form tool)
- C) HubSpot (CRM)

**Business legitimacy references for any customer comms:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## KPI: “<60s first response” measurement (how to prove it)
### Timestamp points
Capture these 3 timestamps for each trial:
- **T0 (Lead Created):** The moment the lead is submitted/created in source system (Jotform submission time, HubSpot form submit timestamp, or your webhook sender timestamp).
- **T1 (Webhook Received):** Server log timestamp for the inbound webhook receipt (if available). If not available, skip and rely on T0/T2.
- **T2 (First SMS Sent):** Timestamp from SMS provider logs/message record (or app logs) when the **first outgoing SMS** to the lead is queued/sent.

### Computation
- Primary KPI: **T2 - T0** must be **≤ 60 seconds**.
- Secondary internal metric: **T2 - T1** must be **≤ 10 seconds** (useful for isolating delays).

### Sample size & pass gate
- Run **20 total trials** across sources (recommended distribution: 8 webhook JSON, 6 Jotform, 6 HubSpot).
- Pass if:
  - **≥ 19/20** are under 60s, and
  - No single scenario indicates a systemic failure (e.g., STOP not honored, duplicate spam, messages after-hours when forbidden).

### Evidence to store
For each trial, store:
- Screenshot or exported record of T0 (source submission)
- Screenshot/export of SMS log for T2
- Copy/paste of transcript (question flow + lead responses)
- If relevant: HubSpot record URL or screenshot of timeline notes

---

## Deterministic fail-safe qualification mode (LLM down / timeout)
### When to trigger deterministic mode
Switch to deterministic mode if:
- LLM API errors, timeouts, returns empty output, or exceeds max latency (e.g., >6 seconds), OR
- Confidence score below threshold (if supported), OR
- Any parsing/formatting error prevents safe next-question selection.

### Deterministic script (exact wording)
**Message 1 (immediate):**
“Hi {{first_name_or_there}} — thanks for reaching out to {{business_name}}. I can help get you booked fast. What service do you need? Reply with 1) Repair 2) Install 3) Quote/Estimate 4) Other.”

**If reply = 1/2/3/4:**
“Got it. What’s your address or ZIP code so we can confirm availability?”

**Then:**
“Thanks. When would you like service? Reply 1) ASAP 2) Today 3) This week 4) Just researching.”

**Then (booking / escalation):**
- If calendar link works: “Perfect — grab the next slot here: {{calendar_link}}. If you prefer, reply with a good time and we’ll confirm.”
- If calendar link fails/unavailable: “Our booking link is temporarily down. Reply with two times that work for you (e.g., ‘tomorrow 2pm or 4pm’) and a team member will confirm.”

### Safety + escalation rules
- If lead requests a human (“agent”, “call me”, “person”): “No problem — what’s the best time for a quick call?” Create escalation task.
- If user replies with sensitive info/payment: “For your security, please don’t send payment info by text. A team member will call you to complete this.” Escalate.
- **Max questions**: 3 questions before offering booking or escalation.
- **Idle timeout**: if no reply after 15 minutes: “Just checking in — still want to get this scheduled?” If no reply after 24 hours: close out.

---

## Compliance scenarios (STOP/HELP)
### STOP handling (must-pass)
- On inbound “STOP”, “STOP ALL”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”:
  - System must respond once with a confirmation like: “You’re opted out and will no longer receive messages.”
  - Must **not** send further messages unless user texts “START/UNSTOP”.
  - Must mark contact as opted-out in internal store/CRM.

### HELP handling (must-pass)
- On inbound “HELP”:
  - Respond with: business name + support email + opt-out instruction.
  - Example: “{{business_name}} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---

## After-hours behavior
Define business hours for pilot (example): Mon–Fri 8am–6pm local.
- If lead arrives **after-hours**, system must:
  - Send a safe acknowledgement: “Thanks — we’re closed right now. We’ll reach out at {{next_open_time}}. If urgent, reply URGENT.”
  - If “URGENT”: either route to on-call human or send: “We’ll prioritize you first thing at opening.” (depending on policy).
  - Must not book appointments outside permitted window (unless allowed).

---

## Lead Source A: Generic Webhook JSON (test payloads)
### Expected normalized fields
- lead_id (string)
- first_name (string, optional)
- last_name (string, optional)
- phone_e164 (string) OR raw_phone
- email (string, optional)
- source (string: “webhook”)
- created_at (timestamp)
- campaign (optional)

### Dedupe key (expected)
- Prefer: phone_e164 + source + (campaign if present)
- Within window: 24 hours (configurable). Duplicate should not re-trigger full sequence.

### Payload 1 — valid
```json
{
  "lead_id": "wh_001",
  "first_name": "Sam",
  "last_name": "Lee",
  "phone": "+14155552671",
  "email": "sam.lee@example.com",
  "service": "Water heater repair",
  "created_at": "2026-05-14T18:30:00Z",
  "source": "webhook",
  "campaign": "fb_leads_may"
}
```
Expected:
- SMS sent <60s
- Qualification begins (LLM or deterministic)
- CRM note created if CRM integration enabled

### Payload 2 — missing phone
```json
{
  "lead_id": "wh_002",
  "first_name": "Jamie",
  "email": "jamie@example.com",
  "service": "Estimate",
  "created_at": "2026-05-14T18:31:00Z",
  "source": "webhook"
}
```
Expected:
- **No SMS attempt**
- Log/alert created: “missing phone”
- If email follow-up supported: send email; otherwise create task “needs phone”

### Payload 3 — invalid phone
```json
{
  "lead_id": "wh_003",
  "first_name": "Pat",
  "phone": "12345",
  "created_at": "2026-05-14T18:32:00Z",
  "source": "webhook"
}
```
Expected:
- Validation failure; no SMS; record flagged

### Payload 4 — retry / idempotency
Send Payload 1 twice with same lead_id within 60 seconds.
Expected:
- Only one SMS sequence starts
- Second request returns 200/OK but no duplicate outbound

---

## Lead Source B: Jotform (free) — setup + tests
### Setup checklist
1) Create a Jotform with fields:
   - Name
   - Phone (required in base case)
   - Email (optional)
   - Service needed (dropdown)
2) Configure submission webhook to Copilot inbound endpoint.
3) Verify field mapping: name -> first_name/last_name, phone -> phone.

### Edge-case tests
- Missing phone: make phone optional temporarily; submit without phone.
- Invalid phone: submit “1111”.
- Duplicate: submit identical phone twice within 5 minutes.
- After-hours: submit outside defined hours.

### Expected
- T2-T0 ≤ 60s
- Deterministic mode works if LLM fails
- Deduping prevents double sequences

---

## Lead Source C: HubSpot (free) — setup + tests
### Setup checklist
1) Create a test contact property set (if needed): Service, Lead Source.
2) Configure form or workflow to post lead to Copilot (or have Copilot create/update contact).
3) Ensure you can write back:
   - Contact note
   - Timeline event
   - “Last contacted”/custom property updates

### CRM note formatting (must-pass)
Expected note template (copy/paste target):

**Title:** “Lead Copilot Qualification Summary”

**Body (example):**
- Source: {{source}} / {{campaign}}
- Lead created: {{T0}}
- First SMS sent: {{T2}} ({{delta_seconds}}s)
- Status: {{Qualified | Unqualified | Needs human | Opted out}}
- Service: {{service}}
- ZIP/Address: {{zip}}
- Desired time: {{asap/today/this week/researching}}
- Transcript (last 3 messages):
  1) OUT: “…“
  2) IN: “…“
  3) OUT: “…“
- Booking: {{calendar_link_or_manual_followup}}
- Compliance: STOP={{true/false}} HELP={{true/false}}

### Duplicate contact behavior
- If phone matches existing contact:
  - Update existing record, append note; do not create a new contact.

---

## High-risk scenario matrix (run during pilot)
1) Missing phone (webhook + Jotform)
2) Invalid phone
3) STOP
4) HELP
5) After-hours lead
6) Multiple concurrent leads (submit 5 leads within 60 seconds)
7) Calendar link failure (simulate by using invalid link or toggling off)
8) Webhook retries (same lead_id repeated)
9) Duplicate lead (same phone, different lead_id)
10) HubSpot note formatting correctness

Pass/Fail gates:
- Any compliance failure (STOP not honored) = immediate stop-ship for pilots.
- Any systemic >60s delays: investigate and fix before agency rollout.

---

## Bug/Fix checklist (prioritized)
P0 (stop-ship):
- STOP not honored; messages continue.
- SMS sent to invalid/missing phone due to bad validation.
- Duplicate floods (retries/duplicates trigger multiple sequences).

P1 (high churn risk):
- After-hours policy violated.
- Calendar link failure has no recovery path.
- HubSpot notes missing key fields or cluttering timeline.

P2 (polish):
- Message wording issues, awkward branching.
- Non-critical formatting inconsistencies.

---

## Results table (to fill during execution)
For each trial: Source | Scenario | T0 | T2 | Delta(s) | Pass/Fail | Evidence link/screenshot | Notes/bugs.

When 20 trials complete, summarize:
- Fastest/slowest/median Delta(s)
- # under 60s
- Any P0/P1 bugs and fixes applied
