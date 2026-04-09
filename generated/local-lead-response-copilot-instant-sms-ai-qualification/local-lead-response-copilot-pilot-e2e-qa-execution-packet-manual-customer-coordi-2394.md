# Local Lead Response Copilot — Pilot E2E QA Execution Packet (Manual) + Customer Coordination Templates

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:11:02.136Z

---

## 1) Goal
Validate (manually, during early pilots) that Local Lead Response Copilot sends the FIRST outbound SMS in under 60 seconds from lead creation across three lead sources, and that the system fails safely when AI/LLM or downstream tools fail.

**Legitimacy URL to share:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Business inbox:** agent_bob_replit+lead-copilot@agentmail.to

## 2) Lead Sources Covered (minimum 3)
1) **Generic Webhook JSON** (direct POST to our webhook endpoint)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (CRM source; validate contact creation + note formatting)

## 3) KPI Definition + Evidence Capture
**KPI:** P95 first-response time < 60 seconds.

**Timestamps to record (per trial):**
- T0: Lead created time (form submit timestamp OR webhook received timestamp OR CRM create timestamp)
- T1: Our system “accepted/queued” timestamp (if available in logs)
- T2: Provider send time (SMS send request timestamp)
- T3: Customer device receive time (screenshot time or message log timestamp)

**Pass criteria:** (T2 - T0) <= 60 seconds for at least 19/20 trials (95%).

**Evidence to save (per trial):**
- Screenshot or export showing lead submit time (Jotform submission log / webhook caller timestamp / HubSpot create time)
- Screenshot/log line of SMS send time and the actual message content
- Screenshot of the received SMS (or provider delivery log if device screenshot isn’t possible)

## 4) Deterministic Fail-Safe Qualification Flow (LLM Down / Timeout Safe Mode)
Trigger safe mode when:
- LLM API error OR timeout (>4s) OR empty/invalid LLM output OR rate-limit

**Safe mode message sequence (deterministic):**
1) “Hi {first_name} — this is {business_name}. Quick question so we can help: what service do you need? Reply with 1) Repair 2) Install 3) Quote”
2) “Thanks. What’s your ZIP code?”
3) “When do you want service? Reply 1) ASAP 2) This week 3) Just researching”
4) If qualified (ASAP/This week): “Got it. Here’s a booking link: {calendar_link}. If you prefer, reply with a good time and we’ll confirm.”
5) If ‘Just researching’: “No problem—want a rough price range? Reply YES and we’ll text a quick estimate range and next steps.”

**Escalation:** If user replies with anything unparseable twice, send: “Thanks—one of our team will text you shortly. If urgent, call {phone}.” and create a task/flag in CRM.

**Compliance defaults:**
- If inbound = “STOP”: immediately set contact status = DoNotText; respond: “You’re opted out and will no longer receive texts.”
- If inbound = “HELP”: respond: “Reply STOP to opt out. Msg&data rates may apply. For help email agent_bob_replit+lead-copilot@agentmail.to”

## 5) High-Risk Test Cases (Required)
Run each at least once per lead source where applicable.

### A) Missing phone
- Input: no phone field OR null/empty phone
- Expected: no SMS attempt; create CRM record with note “Missing phone”; optionally email internal alert; mark as “Needs Manual Follow-up.”

### B) Invalid phone
- Input: phone with letters or too short (e.g., “12345”)
- Expected: no SMS attempt; CRM note “Invalid phone”; do not retry endlessly.

### C) STOP/HELP
- Input: user replies STOP after first message
- Expected: suppression is immediate; no further outbound except confirmation.
- Input: user replies HELP
- Expected: send help text with opt-out instructions and support email.

### D) After-hours
- Condition: lead arrives outside configured hours
- Expected: first SMS still sent quickly but with after-hours copy OR queued until next open (depending on configuration). Must be deterministic and documented.

### E) Multiple concurrent leads
- Create 5 leads within 10 seconds
- Expected: each receives correct personalized first SMS; no cross-talk; KPI still <60s.

### F) Calendar link failures
- Simulate: calendar URL returns 404 or integration error
- Expected: send alternative CTA: “Reply with a good time window” and create CRM task; no dead-end.

### G) Webhook retries
- Simulate: sender retries same event_id multiple times
- Expected: idempotent handling; only one conversation started; log “duplicate ignored.”

### H) Duplicate leads
- Same phone/email submits twice within 5 minutes
- Expected: either append to existing conversation + CRM record, or create a new lead record but do not spam multiple initial SMS messages; behavior must be consistent.

### I) CRM note formatting
- Verify HubSpot note body:
  - Contains: lead source, timestamp, qualification answers, booking outcome, opt-out status if any.
  - Formatting: readable bullet list, no JSON dump to customer-facing fields.

## 6) Generic Webhook JSON Payloads (for consistent manual testing)
Use these as POST bodies to the webhook endpoint.

**Valid lead:**
{
  "event_id": "test-001",
  "source": "webhook",
  "timestamp": "2026-04-09T12:00:00Z",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie.lee@example.com",
  "service": "water heater repair",
  "utm_source": "facebook",
  "utm_campaign": "spring"
}

**Missing phone:**
{
  "event_id": "test-002",
  "source": "webhook",
  "timestamp": "2026-04-09T12:05:00Z",
  "first_name": "Casey",
  "email": "casey@example.com",
  "service": "roof quote"
}

**Invalid phone:**
{
  "event_id": "test-003",
  "source": "webhook",
  "timestamp": "2026-04-09T12:10:00Z",
  "first_name": "Morgan",
  "phone": "12345",
  "service": "HVAC install"
}

**Duplicate retry (same event_id):** send test-001 again.

## 7) Results Table (paste into a sheet)
Columns:
- TrialID
- LeadSource (Webhook/Jotform/HubSpot)
- Scenario (happy path / missing phone / STOP / etc.)
- T0 LeadCreated
- T2 SMS_Sent
- DeltaSeconds
- PassFail
- EvidenceLink (screenshot/log path)
- Notes

## 8) Bug/Fix Log (prioritized)
Fields:
- BugID
- Severity (P0 compliance / P1 churn / P2 annoyance)
- Title
- LeadSource
- Steps to Reproduce
- Expected
- Actual
- Evidence
- Suggested Fix

Prioritization guidance:
- **P0:** STOP not honored, texting without valid consent config, HELP missing, messages sent to invalid/missing phone, wrong recipient (cross-talk)
- **P1:** First response >60s, duplicate spamming, after-hours confusion, calendar dead-end, retries create multiple conversations
- **P2:** Formatting issues in CRM notes, minor copy issues

## 9) Customer / Pilot Coordination Emails (ready to send)

### Email A — Request minimal access + testing window
Subject: Quick pilot QA check (speed-to-lead <60s) for your lead flow

Hi {Name},

I’m Bob from Local Lead Response Copilot. We do instant SMS follow-up + qualification for new leads (speed-to-lead focus). For legitimacy, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

To verify everything works end-to-end in your setup, I’d like to run a short manual QA session (about 30–45 minutes) to confirm the first text goes out in under 60 seconds and that STOP/HELP + after-hours behavior is correct.

What I need from you:
1) The lead source we’re connecting first (FB Lead Ads / website form / Jotform / etc.)
2) A test phone number we can use to receive texts (yours is fine)
3) Your preferred business hours + the calendar link you want leads to book on

If you reply with a good 30-minute window today/tomorrow, I’ll run the checks and send you a small report with timestamps and any fixes needed.

Thanks,
Bob
agent_bob_replit+lead-copilot@agentmail.to

### Email B — Summary report after test
Subject: QA results: first-response timing + fail-safes

Hi {Name},

Here are the results from today’s speed-to-lead QA run:
- Trials run: {N}
- P95 first-response time: {P95}s (goal <60s)
- Key scenarios verified: happy path, STOP/HELP, after-hours, retries/dedupe, calendar failure fallback

Findings / fixes:
1) {Bug or “No issues found”}
2) {Bug}

Evidence:
- Timestamp table + screenshots/logs: {link or attachment}

Next step: if you’d like, we can keep this in “safe mode” (deterministic qualification questions) while we fine-tune AI prompts, so lead response never stalls.

Thanks,
Bob
agent_bob_replit+lead-copilot@agentmail.to
