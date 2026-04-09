# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:31:03.673Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

Business proof URL (share with agencies/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Business contact email (for test confirmations / notifications): agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal + scope
**Goal:** Verify end-to-end reliability for the first 1–3 pilots *without building automation*.

**What we must prove:**
1) **First response time KPI:** first outbound SMS is *sent* within **<60 seconds** of lead receipt for each lead source.
2) **Fail-safe behaviors:** safe deterministic behavior when the LLM fails and when external systems fail (calendar, webhook retries, duplicate leads).
3) **Compliance behaviors:** STOP/HELP handling is correct.
4) **CRM quality:** HubSpot notes/transcripts are formatted consistently for agency reporting.

**Lead sources covered (minimum 3):**
- **A. Generic Webhook JSON** (direct HTTP POST from any source)
- **B. Jotform** (real form tool)
- **C. HubSpot** (CRM source)

## 2) Definitions + timing proof method (<60s KPI)
We capture three timestamps per test lead:
- **T0 = Lead Received** (server receive time) — from app logs/event list/webhook ingress record.
- **T1 = SMS Queued/Sent** — from SMS provider message log OR internal “message created” event.
- **T2 = SMS Delivered to handset** (optional but recommended) — from provider delivery receipt or phone screenshot time.

**KPI pass criteria:**
- Must satisfy **(T1 − T0) <= 60 seconds** for at least **20 leads total** across sources.
- Track T2 for informational carrier latency; do not fail product if carrier causes delay, but record it.

**How to capture:**
- Keep a stopwatch or time.is open.
- For each submission, immediately record local time and later reconcile with server log time.
- Prefer server-side timestamps for KPI proof when possible.

### Results table (copy/paste)
| Test ID | Source | Scenario | Lead ID / Email | T0 Lead Received (UTC) | T1 SMS Sent (UTC) | Delta (sec) | T2 Delivered (UTC) | Outcome (Pass/Fail) | Notes |
|---|---|---|---|---|---|---:|---|---|---|

## 3) Pre-flight configuration checklist
Before running tests, confirm:
- A dedicated test phone number is available to receive SMS.
- SMS provider has STOP/HELP auto-handling enabled or the app implements it.
- After-hours window is configured (e.g., 6pm–8am local time) with a clear rule.
- Booking method defined: calendar link or appointment creation.
- Dedupe strategy defined: e.g., “same phone within 10 minutes” or “same external lead_id”.

Record configuration in this table:
| Item | Value |
|---|---|
| After-hours window | |
| Dedupe rule | |
| Booking method | |
| LLM timeout threshold | |
| Fallback enabled (Y/N) | |

## 4) Deterministic fallback qualification flow (no-LLM)
**When it triggers:**
- LLM API error
- LLM timeout over threshold
- LLM returns empty/invalid response

**Fallback principles:**
- Always short, local-business friendly.
- Never asks for sensitive data.
- Minimum viable qualification + booking.

### Fallback script (exact messages)
**MSG0 (immediate acknowledgement, always within <60s):**
“Hi {first_name} — this is {business_name}. Thanks for reaching out. What can we help you with today? Reply with a short description.”

If user replies:
**Q1 (service type):**
“Got it. Is this for (1) Repair (2) Install/Replace (3) Quote/Estimate? Reply 1, 2, or 3.”

**Q2 (urgency):**
“Thanks. How soon do you need help? Reply: (1) Today (2) This week (3) Just researching.”

**Q3 (location check):**
“Great — what’s the service address ZIP code?”

**Handoff to booking (normal hours):**
“Perfect. You can grab the next available time here: {calendar_link}. If you prefer, reply with two times that work for you and we’ll confirm.”

**After-hours behavior:**
If after-hours, replace booking handoff with:
“Thanks! We’re currently closed, but we’ll text you first thing when we open. If this is urgent, reply URGENT and we’ll do our best to accommodate.”

### STOP/HELP compliance (must override all flows)
- If inbound message contains **STOP**, **UNSUBSCRIBE**, **CANCEL**, **END**, **QUIT**:
  - Immediately mark contact as opted-out.
  - Respond once: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
  - Do not send further outreach.
- If inbound contains **HELP**:
  - Respond: “For help, reply to this message or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

## 5) Lead source A: Generic Webhook JSON
### Minimum fields expected
- phone (E.164 preferred)
- first_name (optional)
- last_name (optional)
- email (optional)
- source (string)
- external_lead_id (string) for dedupe

### Test payloads (ready-to-send examples)
**A1 Valid lead**
```json
{
  "external_lead_id": "wh_1001",
  "source": "webhook_test",
  "first_name": "Test",
  "last_name": "Lead",
  "email": "test.lead+1001@example.com",
  "phone": "+14155550101",
  "message": "Need an estimate for a water heater replacement"
}
```
**Expected:** MSG0 within 60s. Qualification begins (LLM or fallback). HubSpot note created (if enabled).

**A2 Missing phone**
```json
{
  "external_lead_id": "wh_1002",
  "source": "webhook_test",
  "first_name": "NoPhone",
  "email": "test.lead+1002@example.com",
  "message": "Need service"
}
```
**Expected:** No SMS attempt. Create internal event + CRM note: “Missing phone; cannot text.” If email fallback exists, send email to business contact.

**A3 Invalid phone**
```json
{
  "external_lead_id": "wh_1003",
  "source": "webhook_test",
  "first_name": "BadPhone",
  "phone": "123",
  "message": "Quote please"
}
```
**Expected:** Reject/flag. No SMS. Log validation error and create CRM note.

**A4 Duplicate lead (same external_lead_id)**
```json
{
  "external_lead_id": "wh_1001",
  "source": "webhook_test",
  "first_name": "Test",
  "phone": "+14155550101",
  "message": "Following up"
}
```
**Expected:** Dedupe triggers; do not re-text (or only send a single controlled message if policy is to re-engage). Record dedupe decision.

**A5 Retry scenario (same payload resent after 10s)**
Send A1 twice.
**Expected:** Second attempt does not create a second outbound SMS if idempotency key is used.

## 6) Lead source B: Jotform
### Setup
- Create a Jotform form with fields:
  - First name
  - Last name
  - Phone
  - Email
  - “What do you need help with?” textarea
  - Hidden field: external_lead_id (optional)

### Scenarios
- B1 Valid submission
- B2 Missing phone (leave blank)
- B3 Invalid phone (e.g., 123)
- B4 Duplicate submission (same phone, same name) within dedupe window

**Expected for valid:** SMS MSG0 within 60s.

## 7) Lead source C: HubSpot (CRM)
### Setup
- Configure a test pipeline / contacts.
- Decide the trigger mechanism: new contact created, form submission event, or deal stage entry.

### Scenarios
- C1 New contact with valid phone => should text within 60s.
- C2 Contact without phone => no SMS; note added.
- C3 Duplicate contact or re-enrollment => dedupe policy enforced.
- C4 CRM note formatting validation (see section 8).

## 8) HubSpot note formatting (strict template)
Every lead should produce a single structured note (or timeline event) like:

**Title:** Lead Copilot — Qualification Transcript

**Body (exact structure):**
- Lead Source: {source}
- External Lead ID: {external_lead_id}
- Received (UTC): {T0}
- First SMS Sent (UTC): {T1}
- Response Time (sec): {delta}
- Phone: {phone}
- Email: {email}
- Opt-out status: {opted_out true/false}
- After-hours: {true/false}
- Booking outcome: {booked / link_sent / needs_followup / failed}
- Calendar link status: {ok / failed}

**Transcript:**
1) System: “…”
2) Lead: “…”
3) System: “…”

## 9) Fail-safe behavior matrix (must-pass for pilots)
| Scenario | Expected behavior |
|---|---|
| Missing phone | Do not send SMS; log; create CRM note; optionally email internal alert |
| Invalid phone | Validation failure; no SMS; CRM note created |
| STOP | Immediate opt-out + confirmation; no further texts |
| HELP | Provide help + email + STOP instructions |
| After-hours | Acknowledge + set expectation; no aggressive booking; queue follow-up |
| Calendar link failure | Send alternate “reply with 2 times” flow; log incident |
| Webhook retry | Idempotent; no duplicate SMS |
| Duplicate leads | Dedupe by external_lead_id/phone window; log decision |
| Concurrent leads (5 at once) | No queue collapse; all get MSG0 within 60s |
| LLM fails/timeout | Trigger deterministic fallback script; still respond within 60s |

## 10) Execution plan (20-lead minimum)
Run at least:
- 8 webhook tests (mix of A1–A5 plus concurrency)
- 6 Jotform submissions (B1–B4 plus duplicates)
- 6 HubSpot-trigger tests (C1–C4)

Include at least:
- 2 STOP tests
- 2 HELP tests
- 2 after-hours tests
- 3 duplicate/retry tests
- 1 calendar failure simulation

## 11) Bug log + fix list template
| Bug ID | Severity (P0-P3) | Title | Source | Steps to reproduce | Expected | Actual | Workaround | Proposed fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|

**Severity guide:**
- P0: Compliance risk (STOP/HELP wrong), sends to invalid/missing phone, spam/duplicate blasts.
- P1: KPI failure (>60s), missing acknowledgements, calendar failure with no fallback.
- P2: CRM note formatting broken/inconsistent.
- P3: Cosmetic copy issues.

## 12) “Verified <60s” acceptance checklist
To claim verification, attach:
- Completed Results table with at least 20 leads.
- Evidence of T0 and T1 timestamps (screenshots or exported logs).
- Summary: pass rate, worst-case delta, mean/median delta.

### Summary block (fill after run)
- Total leads tested:
- KPI pass count (<60s):
- KPI fail count (>60s):
- Worst delta (sec):
- Median delta (sec):
- Top 3 failure causes:

---

This runbook is designed to protect agency reputation during pilots by ensuring fast first response, deterministic behavior when AI fails, and clean HubSpot reporting. It can be executed by a non-technical operator and used as onboarding proof alongside the public site URL above.