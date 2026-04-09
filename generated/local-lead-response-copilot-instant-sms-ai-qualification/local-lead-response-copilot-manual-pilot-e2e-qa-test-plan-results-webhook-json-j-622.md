# Local Lead Response Copilot — Manual Pilot E2E QA Test Plan + Results (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:50:40.113Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)  
**Legitimacy URL (share with agencies/customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Purpose & Success Criteria
This runbook validates end-to-end reliability for early pilots without building an automated test suite.

**Primary KPI:** *First outbound SMS sent within 60 seconds* of lead receipt for each lead source.
- “Lead receipt time” = timestamp when our system receives the lead (webhook hit / integration event).  
- “First response time” = timestamp when the first outbound SMS is queued/sent (provider timestamp) **and** confirmed delivered (handset time) when possible.

**Pass/Fail:**
- PASS: ≥ 95% of tests under 60s first response; 0 compliance failures (STOP/HELP); no duplicate spamming.
- FAIL: Any STOP not respected; any repeated texting after invalid phone; repeat texting on duplicates; >5% >60s without operational explanation.

## 1) Lead Sources Under Test (3)
1) **Generic Webhook JSON** (direct POST to our endpoint)  
2) **Jotform** (real form tool)  
3) **HubSpot** (CRM as a lead source + notes formatting as sink)

## 2) Preconditions / Test Rig
- You need:
  - One real mobile phone you control (the “test lead” handset) for receiving SMS.
  - One secondary phone number (optional) to test concurrency; or use a colleague.
  - A spreadsheet or doc to record timestamps (template included below).
- Configure system to use **After-hours rules** (define hours explicitly, ex: 6pm–8am + weekends) and ensure there is a known “booking link” or appointment route.
- Ensure **STOP/HELP handling** is enabled at SMS provider layer or application layer.

### Required fields (canonical)
Across all sources, map inputs to these canonical fields:
- lead_id (string; source-provided if possible)
- first_name
- last_name
- phone (E.164 preferred)
- email
- service_requested (string)
- zip_or_city (string)
- source (Webhook | Jotform | HubSpot)
- consent (boolean if applicable)
- submitted_at (source timestamp if available)

## 3) Deterministic Fallback Qualification Flow (No-LLM)
This flow is used when LLM errors/timeouts occur **or** when we force fallback mode for QA.

### 3.1 Trigger conditions
Enter deterministic mode when:
- LLM request times out (>3s suggested) OR errors.
- Missing required lead context for LLM prompt.
- System load/concurrency threshold exceeded.

### 3.2 Message templates (exact)
**SMS #1 (immediate):**
> “Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out about {{service_requested}}. Quick question so I can help: is this for **(1)** today/urgent, **(2)** this week, or **(3)** just pricing?”

**If no response after 2 minutes (optional single nudge):**
> “Reply 1, 2, or 3 and I’ll get you scheduled.”

**Branch Q2 (based on urgency):**
- If reply contains “1” (urgent):
  > “Got it. What’s the service address or ZIP code?”
- If reply contains “2” (this week):
  > “Great—what day/time works best? (e.g., Tue afternoon, Wed morning)”
- If reply contains “3” (pricing):
  > “Sure—what type of job is it (briefly), and what city/ZIP?”

**Handoff (booking/call):**
When enough info is collected (urgency + location + job type), send:
> “Perfect. Here’s the fastest way to book: {{calendar_link}}. If you prefer, reply with a good time to call.”

### 3.3 Compliance: STOP/HELP
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
  - Immediately cease messaging and mark **opted_out=true**.
  - Confirm once:
    > “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
- If inbound contains “HELP”:
  - Respond once:
    > “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### 3.4 After-hours behavior
If lead arrives after-hours:
- SMS #1 should acknowledge after-hours and set expectation:
  > “Hi {{first_name}}—thanks for reaching out. We’re currently closed, but I can get details now and have someone follow up when we open. What can we help with?”
- Do not promise immediate calls.
- Offer booking link if available.

## 4) Fail-safe Behavior Matrix (Expected)
These are the acceptance expectations for each edge case:

1) **Missing phone**
- Expected: No SMS attempt. Create CRM record (if configured) with status “Missing phone”; email notification to ops (optional). Log error: `PHONE_MISSING`.

2) **Invalid phone** (non-E.164, too short, letters)
- Expected: No SMS attempt. Mark “Invalid phone” and store raw value. Log `PHONE_INVALID`.

3) **STOP**
- Expected: Immediate opt-out confirmation; no further outbound messages for that phone across all workflows.

4) **HELP**
- Expected: Provide support email + STOP instructions; do not spam.

5) **After-hours**
- Expected: Still respond <60s with after-hours template; no aggressive booking pressure; tag record `after_hours=true`.

6) **Multiple concurrent leads** (5 leads within 30 seconds)
- Expected: All receive SMS #1 within 60 seconds; no cross-talk; correct personalization.

7) **Calendar link failures** (link down/unreachable)
- Expected: If booking link fetch/validation fails, send alternative CTA:
  > “Our booking link is temporarily unavailable—reply with a good time to call and we’ll schedule you manually.”
Log `CALENDAR_DOWN`.

8) **Webhook retries** (same event delivered twice)
- Expected: Dedupe by (lead_id) or (phone + source + timestamp window). Do not send duplicate SMS #1.

9) **Duplicate leads** (same phone submits twice within 10 minutes)
- Expected: If active conversation exists, do not restart with SMS #1; instead continue thread or send a single acknowledgment.

10) **CRM note formatting**
- Expected: Every conversation update posts a clean, consistent note containing metadata + transcript + outcome.

## 5) Test Data + Payloads
### 5.1 Webhook JSON payloads (ready to paste)
**A) Valid lead**
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test.lead@example.com",
  "service_requested": "Water heater repair",
  "zip_or_city": "94107",
  "source": "Webhook",
  "consent": true
}
```

**B) Missing phone**
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service_requested": "HVAC tune-up",
  "zip_or_city": "94107",
  "source": "Webhook",
  "consent": true
}
```

**C) Invalid phone**
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "555-ABC-1234",
  "email": "badphone@example.com",
  "service_requested": "Drain cleaning",
  "zip_or_city": "94107",
  "source": "Webhook",
  "consent": true
}
```

**D) Duplicate lead_id (dedupe check)**
Send payload A again with the same `lead_id`.

**E) Retry simulation (same lead delivered twice quickly)**
Send payload A twice within 5 seconds. Expected: only one SMS #1.

### 5.2 Jotform tests (form variants)
Create a form with fields: First Name, Last Name, Phone, Email, Service Requested, City/ZIP, Consent checkbox.
- Submit 5 normal leads.
- Submit 1 missing phone.
- Submit 1 invalid phone (e.g., “123”).
- Submit 1 after-hours (run test after hours or simulate with config).

### 5.3 HubSpot tests
Two directions to test:
1) **HubSpot as source**: new contact created in a pipeline triggers texting.
2) **HubSpot as sink**: conversation transcript + outcome posted as a Note on the contact.

Create test contacts:
- Valid phone
- Missing phone
- Invalid phone
- Duplicate contact (same phone)

## 6) Timing Capture Procedure (<60s Proof)
For each test case, capture three timestamps:
1) **T0 Lead Received**
- Webhook: server log time when request received.
- Jotform: submission time + integration received log.
- HubSpot: workflow enrollment time / event time.

2) **T1 SMS Sent/Queued**
- From SMS provider logs (message created/queued/sent).

3) **T2 Handset Delivered/Observed**
- The time you see the SMS arrive on the handset (manual). If provider offers delivery receipt timestamp, record that as well.

Compute:
- T1 - T0 (system speed) => must be <60s
- T2 - T0 (end-to-end user experience) => target <60s; allow carrier variance but investigate >90s.

## 7) Execution Sequence (20-lead run)
Run in this order to surface failures early:
1) Webhook A (valid)
2) Webhook B (missing phone)
3) Webhook C (invalid phone)
4) Webhook E (retry)
5) Webhook D (duplicate lead_id)
6) Jotform: 5 normal
7) Jotform: missing phone
8) Jotform: invalid phone
9) Jotform: after-hours
10) HubSpot: 5 normal (including at least 2 concurrent)
11) HubSpot: duplicate phone/contact
12) STOP/HELP tests (send STOP from handset, then trigger a new lead; verify no SMS)
13) Calendar link failure test (temporarily set bad link or simulate failure; verify alternate CTA)

## 8) Results Table (fill during run)
Copy this table into a sheet and fill it:

| # | Source | Case | lead_id/contact | T0 received | T1 sms sent | T2 delivered | T1-T0 (sec) | Pass <60s | Expected behavior met (Y/N) | Notes/Bug link |
|---|--------|------|-----------------|------------|------------|--------------|-------------|-----------|------------------------------|----------------|
| 1 | Webhook | Valid | qa-webhook-001 |  |  |  |  |  |  |  |
| 2 | Webhook | Missing phone | qa-webhook-002 |  |  |  |  |  |  |  |
| 3 | Webhook | Invalid phone | qa-webhook-003 |  |  |  |  |  |  |  |
| 4 | Webhook | Retry | qa-webhook-001 |  |  |  |  |  |  |  |
| 5 | Webhook | Duplicate ID | qa-webhook-001 |  |  |  |  |  |  |  |
| 6 | Jotform | Normal 1 | submission id |  |  |  |  |  |  |  |
| … | … | … | … |  |  |  |  |  |  |  |

## 9) HubSpot Note Formatting (Acceptance Template)
Every note created in HubSpot should follow this format exactly (or close enough to be agency-readable):

**Subject:** Lead Copilot — Qualification Transcript ({{status}})

**Body:**
- Lead Source: {{source}}  
- Lead ID: {{lead_id}}  
- Name: {{first_name}} {{last_name}}  
- Phone: {{phone}}  
- Email: {{email}}  
- Submitted At: {{submitted_at}}  
- After-hours: {{true/false}}  
- Opt-out: {{true/false}}  
- Outcome: {{Booked / Requested callback / No response / Invalid phone / Missing phone}}  
- Booking Link Used: {{url or N/A}}  

**Transcript:**
1. Outbound ({{timestamp}}): {{message_1}}
2. Inbound ({{timestamp}}): {{reply_1}}
3. Outbound ({{timestamp}}): {{message_2}}
…

**Internal tags:** {{deduped=true/false}}, {{llm_used=true/false}}, {{fallback_used=true/false}}

## 10) Bug Log Template (fill as you find issues)
For each bug, record:
- Bug ID:
- Severity: P0 Compliance / P1 Revenue-killer / P2 Annoying / P3 Cosmetic
- Source: Webhook/Jotform/HubSpot
- Steps to reproduce:
- Expected vs Actual:
- Evidence: screenshots, provider log IDs, timestamps
- Suggested fix (smallest change first):

## 11) Known High-Risk Areas (watch during run)
- Phone normalization to E.164; silently failing sends.
- Dedupe rules across sources (lead_id vs phone-based).
- STOP persistence across workflows.
- Concurrency queue delays causing >60s.
- Calendar-link outages causing dead-end user experience.
- HubSpot notes getting malformed (HTML/newlines), or posting to wrong object.

---
**Operator instruction:** After completing the 20-lead run, summarize: (1) pass rate for <60s, (2) list of compliance confirmations (STOP/HELP), (3) list of bugs with severity, (4) any operational workarounds that can be applied immediately to protect pilots.
