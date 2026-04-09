# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Sources) w/ Payloads, Results Sheet, HubSpot Expectations, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:30:01.294Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Sources)

Business reference for pilots / legitimacy:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Purpose & Success Criteria
**Goal:** Prove we can (a) send the first SMS in <60 seconds from lead creation across 3 lead sources and (b) behave safely under failures (LLM down, calendar link failure, retries/duplicates) without harming brand/compliance.

**Lead sources (minimum):**
1) Generic Webhook JSON (any form/ads tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

**KPI:** 95% of trials have **first outbound SMS ≤ 60 seconds** from lead creation timestamp.

**Hard pass/fail gates (must pass):**
- STOP/HELP behavior compliant (STOP immediately stops; HELP returns helpful instructions)
- Missing/invalid phone never triggers an SMS; instead logs + sends internal alert path
- Deterministic fallback works when LLM fails/timeouts (no dead ends)
- Duplicate leads deduped (no spammy double-texting)

---

## 1) Test Environment Preconditions (No Spend)
- Use free-tier accounts where possible.
- A test phone that can receive SMS and send STOP/HELP replies.
- Access to message logs (app logs or provider logs).
- For HubSpot: free developer/sandbox (or free CRM) with permission to view Contacts and Notes/Engagements.

**Required configuration knobs (whatever the product calls them):**
- “First message template”
- “After-hours schedule”
- “Calendar/booking link”
- “Deduplication window” (recommend 30–60 minutes)
- “Fallback mode on LLM error/timeout” (must exist; if not, file as P0 bug)

---

## 2) Results Capture Sheet (Copy/Paste Table)
Record **every** run. Use phone screen recording if possible.

| Run # | Lead Source | Scenario | Lead Created Timestamp (T0) | First Outbound SMS Timestamp (T1) | Delta (T1-T0) sec | Passed <60s? | Evidence Link/Screenshot | Notes |
|------:|-------------|----------|-----------------------------|-----------------------------------|------------------:|--------------|--------------------------|-------|
| 1 | Webhook | Baseline valid lead | | | | | | |

**How to measure T0:**
- Webhook: timestamp when request sent (client) + server receipt time if logged.
- Jotform: submission time shown in Jotform submission list.
- HubSpot: create-time of Contact (or form submission time) from HubSpot UI.

**How to measure T1:**
- Timestamp on received SMS on device + provider/app log timestamp.

---

## 3) Canonical Test Data Set
Use consistent fake names/emails; rotate phone numbers only when needed.

**Valid phone format examples:**
- +14155550101 (US E.164)
- +14155550102

**Invalid phone examples:**
- 415555 (too short)
- +1415ABC0101 (contains letters)
- +999999999999999 (too long)

**Lead identity fields:**
- first_name: “Test”
- last_name: “LeadA” / “LeadB”
- email: test.leadA@example.com
- service: “Water heater install”
- zip: “94107”

---

## 4) Source-Specific Setup + Test Execution

### A) Generic Webhook JSON (Source #1)
**Purpose:** Prove we can ingest a standard webhook and respond fast, handle retries/dedupe.

**Baseline payload (VALID):**
```json
{
  "source": "webhook",
  "lead_id": "wh_001",
  "created_at": "2026-04-09T12:00:00Z",
  "first_name": "Test",
  "last_name": "LeadA",
  "email": "test.leadA@example.com",
  "phone": "+14155550101",
  "service": "Water heater install",
  "city": "San Francisco",
  "state": "CA",
  "zip": "94107"
}
```

**Missing phone payload (NO SMS should be sent):**
```json
{
  "source": "webhook",
  "lead_id": "wh_002",
  "created_at": "2026-04-09T12:01:00Z",
  "first_name": "Test",
  "last_name": "NoPhone",
  "email": "test.nophone@example.com",
  "service": "Drain cleaning"
}
```

**Invalid phone payload (NO SMS should be sent):**
```json
{
  "source": "webhook",
  "lead_id": "wh_003",
  "created_at": "2026-04-09T12:02:00Z",
  "first_name": "Test",
  "last_name": "BadPhone",
  "email": "test.badphone@example.com",
  "phone": "415555",
  "service": "AC repair"
}
```

**Retry payload (same lead_id resent):** send the VALID payload again within 30 seconds.
**Expected:** should not text twice; should log “duplicate/retry ignored” OR update existing lead without sending another first message.

**Duplicate lead variant:** same phone + different lead_id within dedupe window.
**Expected:** dedupe by phone; avoid double texting. Optionally attach as “additional inquiry” in CRM.


### B) Jotform (Source #2)
**Purpose:** Validate a real form tool path.

**Jotform fields (minimum):**
- Name (first/last)
- Phone
- Email
- Service Needed (dropdown)
- Preferred time (optional)

**Runs:**
1) Baseline valid submission
2) Missing phone (make phone non-required just for test OR submit invalid)
3) Invalid phone (enter letters)
4) After-hours submission (submit outside working hours per config)

**Expected behavior (after-hours):**
- First SMS still goes out <60s, but message should set expectation: “We’ll reach out at 8am” and optionally offer booking link.


### C) HubSpot CRM (Source #3)
**Purpose:** Validate CRM-native ingestion or sync and note formatting.

**Test:**
- Create a new Contact in HubSpot with phone/email, or submit via HubSpot form.
- Ensure the copilot sends SMS and writes back qualification notes.

**Expected HubSpot data artifacts:**
1) **Contact properties populated** (where mapped): First Name, Last Name, Phone, Email, Lead Source.
2) **Engagement/Note formatting (copy/paste standard):**
   - Title: `Lead Response Copilot — Qualification Summary`
   - Body (example):
     - `Speed-to-lead: first SMS sent in 34s (T0 12:00:10, T1 12:00:44)`
     - `Status: Qualified / Unqualified / Needs follow-up`
     - `Service: Water heater install`
     - `Timing: ASAP / This week / Flexible`
     - `Job address/ZIP: 94107`
     - `Consent: implied from form submission; STOP supported`
     - `Transcript (last 6 messages):` followed by timestamped lines

If HubSpot ends up truncating notes, file a bug and switch to “summary + link to transcript” format.

---

## 5) Scenario Matrix (Must Execute)
For each source where applicable:

1) **Missing phone** → No SMS, create internal alert/log, mark lead “Needs phone”
2) **Invalid phone** → No SMS, same handling
3) **STOP** reply from lead → Immediately stop future messages; confirm opt-out message
4) **HELP** reply from lead → Provide instructions + business contact email: agent_bob_replit+lead-copilot@agentmail.to
5) **After-hours** → First SMS <60s; expectation set; optional booking link
6) **Multiple concurrent leads** (at least 5 leads within 1 minute) → All get SMS <60s; no cross-talk in threads
7) **Calendar link failure** (simulate by using a bad URL) → Apologize + offer alternate: “Reply with 1–2 times” + escalate to human
8) **Webhook retries** (same payload resent) → No duplicate SMS
9) **Duplicate leads** (same phone, new lead_id) → Deduped; no spam
10) **CRM note formatting** (HubSpot) → Properly structured note; no broken JSON blobs

---

## 6) Deterministic Fallback Qualification Flow (LLM Down/Timeout)
**Trigger conditions:**
- LLM call errors (5xx), timeout > 8 seconds, or confidence below threshold.

**State machine (strict):**
1) **Message 1 (immediate):**
   “Hi {{first_name}}, it’s {{business_name}}. Got your request for {{service}}. A couple quick questions so we can help fast—what’s the address or ZIP?”

2) **If ZIP/address received:**
   Ask: “Thanks. Is this urgent (today/tomorrow) or can it be scheduled later this week?”

3) **If urgent:**
   Ask: “Got it. What’s the best time for a quick call—within 30 min, later today, or tomorrow morning?”

4) **If later this week:**
   Ask: “Great—what day/time window works best (morning/afternoon/evening)?”

5) **Booking step (if calendar link healthy):**
   “You can grab a time here: {{calendar_link}}. If it doesn’t work, just reply with 2 times that work.”

6) **Escalation-to-human rule:**
- If user replies with anything not matching expected (or after 2 unanswered questions), send:
  “Thanks—passing this to a human now. If urgent, reply URGENT.”
- Create a task/alert internally.

**Compliance hard rules in fallback:**
- On STOP: respond once confirming opt-out; set contact do-not-message.
- On HELP: respond with instructions + contact email.
- Never claim “a human will call in X minutes” unless operations can guarantee it.

---

## 7) Bug/Fix Log Template (Prioritized for Churn Risk)
| ID | Severity (P0–P3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Suggested Fix | Owner |
|----|------------------|----------|--------------------|----------|--------|----------|---------------|-------|

**Severity guidance:**
- P0: compliance risk (STOP fails), double-texting spam, sends to invalid/missing phone, >60s consistently
- P1: booking link failure without alternate, CRM notes unreadable, concurrency cross-talk
- P2: minor formatting, small delays, edge-case copy

---

## 8) What “Verified <60s” Means (Evidence Standard)
To claim <60s verified:
- At least **20 total runs** across the 3 sources (minimum 5 per source).
- Attach evidence for each run: screenshot of submission time + screenshot of received SMS time (or logs).
- Report median and p95 delta.

---

## 9) Pilot Messaging Consistency Note
All HELP/Support responses should reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Email: agent_bob_replit+lead-copilot@agentmail.to

This reduces confusion for agency partners and end customers.
