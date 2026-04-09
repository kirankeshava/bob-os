# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:04:12.817Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet
Business website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal + Scope
Goal: Protect early pilot reputation by validating end-to-end lead ingestion and instant SMS response across 3 lead sources, proving **first-response <60s**, and ensuring **safe fallbacks** when the LLM or downstream tools fail.

Lead sources covered:
1) **Generic Webhook JSON** (any ad platform/form tool)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

High-risk scenarios (must test): missing phone, invalid phone, STOP/HELP, after-hours handling, multiple concurrent leads, calendar link failures, webhook retries, duplicate leads, CRM note formatting.

Definition of “first response”: the first outbound SMS message sent by Copilot to the lead phone.

## 1) Environments + Preconditions
- Access to product logs showing inbound lead timestamp and outbound SMS timestamp.
- SMS sending number provisioned in the product.
- Calendar booking step configured (or a mock link) for “book now” path.
- LLM toggle available OR ability to simulate LLM timeout/error (e.g., set model key invalid in a test env) to verify deterministic fallback.

Test data:
- Use at least 3 phone numbers (one valid mobile, one landline if possible, one intentionally invalid like 555).
- Create 2 “duplicate” leads (same phone + email) within 2 minutes.

## 2) KPI Verification Method (<60 seconds)
### Timestamp capture points
Record these for every trial:
- T0: Lead submitted time (source system time: Jotform submission time / webhook receipt time / HubSpot form or contact-create time)
- T1: Copilot receives lead (server log timestamp)
- T2: Copilot sends first SMS (provider or app log timestamp)
- T3: Lead receives first SMS (device timestamp) — optional but recommended

### Pass/Fail
- PASS if (T2 - T0) <= 60 seconds for 95%+ of trials.
- Soft pass if (T2 - T0) <= 60s for 90–94% but no single trial exceeds 120s.
- FAIL if any systemic delay pushes average >60s or 2+ trials exceed 120s without an external provider outage.

### Evidence to store
- Screenshot/export of Jotform submission time or HubSpot activity timeline
- Copilot log snippet showing receipt + outbound SMS send
- SMS transcript screenshot showing first message timestamp

Recommended sample size during pilot: **20 trials total** across the 3 sources (minimum 5 per source).

## 3) Deterministic Qualification Fallback (LLM Failure Safe Mode)
When to trigger deterministic mode:
- LLM call errors, times out (>3s configurable), or returns empty/invalid JSON.
- Downstream calendar link generation fails.

### Safety principles
- Keep messages short and explicit.
- Always provide opt-out instructions.
- Never imply human is responding if it’s automated.

### Deterministic question flow (copy-paste)
Message 1 (immediate):
“Hi {first_name} — thanks for reaching out to {business_name}. I’m our automated assistant. What service do you need? Reply with 1) Install 2) Repair 3) Quote 4) Other.”

If reply 1/2/3/4 not recognized (after 1 retry):
“No problem — reply with a few words about what you need and your ZIP code.”

Then ask 2 core qualifiers (only):
Q2:
“Got it. What’s the job address ZIP code?”
Q3:
“When would you like service? Reply 1) Today 2) This week 3) Next week.”

Booking step:
- If calendar link available:
“Great — here’s the fastest way to book: {calendar_link}. If you prefer, reply CALL and we’ll ring you.”
- If calendar link fails:
“Our booking link is temporarily unavailable. Reply with a good time for a call (e.g., ‘today 3–5pm’), and we’ll confirm ASAP.”

Escalation rule:
- If lead replies “CALL” OR asks pricing specifics OR uses angry language, create a human escalation note and send:
“Understood — I’m flagging this for a team member now. If urgent, call us at {business_phone}.”

STOP/HELP compliance (always):
- On “STOP”: immediately confirm opt-out and suppress future messages:
“You’re opted out and will receive no more messages. Reply START to opt back in.”
- On “HELP”: provide business name + contact:
“Help: {business_name}. For support email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

After-hours behavior (configurable):
- If lead arrives outside business hours:
“Thanks — we’re currently closed, but we’ll get back to you at {next_open_time}. If this is urgent, reply URGENT.”
- If URGENT: escalate to human + send expected response window.

## 4) Lead Source Test Setups + Test Cases
### A) Generic Webhook JSON
#### Expected payload (minimum viable)
```json
{
  "source": "webhook",
  "lead": {
    "firstName": "Test",
    "lastName": "Lead",
    "phone": "+14155550123",
    "email": "test.lead@example.com",
    "service": "Repair",
    "message": "Need help ASAP",
    "timestamp": "2026-04-09T12:00:00Z"
  }
}
```

#### Webhook tests
1) Valid lead: expect first SMS <60s.
2) Missing phone: `phone` empty/null -> expect NO SMS; expect internal alert/CRM note “Missing phone”; optionally email to ops.
3) Invalid phone: `phone` = “123” -> expect validation fail + no SMS.
4) Webhook retry: send same payload with same event_id (if supported) 3 times -> expect **dedupe** and only one SMS.
5) Duplicate lead: new payload with same phone/email within 2 minutes -> expect dedupe behavior (either suppress second SMS or send “we’re on it” once).

### B) Jotform (Real Form Tool)
#### Form fields required
- First name
- Phone
- Email
- “What do you need help with?” (dropdown)
- Consent checkbox (if required)

#### Jotform tests
1) Standard submission: verify T0 from Jotform submission time; T2 from Copilot SMS log; <60s.
2) Missing phone (remove requirement or submit blank via test): ensure no SMS; create internal note.
3) Invalid phone formatting: submit “(000) 000-0000” -> validation catch.
4) Concurrent submissions: submit 5 leads within 60 seconds -> verify all receive first SMS and no cross-talk (each conversation isolated).

### C) HubSpot (CRM)
#### HubSpot behaviors to validate
- Contact creation/update without duplication
- Note formatting appended to contact record
- Timeline entry includes transcript + qualifiers

#### HubSpot tests
1) Lead created in HubSpot (via form or contact create): triggers Copilot SMS.
2) Duplicate contact: same phone/email -> ensure no duplicate contact; note should append not overwrite.
3) CRM note formatting (expected)
Use a consistent block:

**[Lead Copilot] New inbound lead**
- Source: {source}
- Received: {T1}
- First SMS sent: {T2} (Δ {T2-T0}s)
- Name: {first} {last}
- Phone: {phone}
- Email: {email}

**Qualification**
- Service: {service}
- ZIP: {zip}
- Timeframe: {timeframe}

**Transcript**
1) Copilot: ...
2) Lead: ...

**Next step**
- {Booked link OR Escalated to human OR Awaiting reply}

Pass if note is readable, consistently structured, and includes timing delta + transcript lines.

## 5) Special Compliance/Safety Tests
### STOP
- Send STOP after first SMS.
- PASS: immediate confirmation + future suppression.

### HELP
- Send HELP at any time.
- PASS: returns business identity + support email + STOP instructions.

### After-hours
- Force after-hours condition (change business hours or run outside hours).
- PASS: sends closed message, does not attempt to book unless lead requests URGENT.

### Calendar failure
- Break calendar link (invalid URL or simulate outage).
- PASS: deterministic fallback message requesting preferred callback time; escalation note created.

## 6) Results Capture Tables
### Trial log (copy/paste table)
| Trial # | Source | Scenario | T0 Lead submit | T1 Copilot recv | T2 First SMS sent | Δ (T2-T0) sec | Pass/Fail | Evidence link |
|---:|---|---|---|---|---|---:|---|---|
| 1 | Webhook | Valid |  |  |  |  |  |  |
| 2 | Jotform | Valid |  |  |  |  |  |  |
| 3 | HubSpot | Valid |  |  |  |  |  |  |

### Compliance log
| Scenario | Expected | Actual | Pass/Fail | Evidence |
|---|---|---|---|---|
| STOP | Opt-out confirmation + suppression |  |  |  |
| HELP | Identity + support + STOP instructions |  |  |  |
| After-hours | Closed msg + next open time |  |  |  |

## 7) Bug / Fix Log Template
| ID | Severity (P0/P1/P2) | Area | Steps to reproduce | Expected | Actual | Impact on revenue/churn | Suggested fix |
|---|---|---|---|---|---|---|---|
| B-001 | P0 | Phone validation | Submit missing phone via webhook | No SMS; create note/alert |  | High: wasted leads + reputation | Validate required fields; hard fail with logged reason |

Severity guidance:
- P0: causes wrong person texted, compliance breach, or missed high-intent leads.
- P1: delays >60s, calendar failures without fallback, CRM notes unusable.
- P2: formatting issues, minor copy improvements.

## 8) Pilot Exit Criteria (What “Done” Looks Like)
- 20 total trials across sources; evidence stored.
- 95%+ first response under 60s.
- STOP/HELP verified.
- After-hours verified.
- Calendar failure fallback verified.
- Dedupe + webhook retry behavior verified.
- HubSpot note format readable and consistent.

If any P0 bug found, pause onboarding new pilots until fixed or safely mitigated via deterministic mode.
