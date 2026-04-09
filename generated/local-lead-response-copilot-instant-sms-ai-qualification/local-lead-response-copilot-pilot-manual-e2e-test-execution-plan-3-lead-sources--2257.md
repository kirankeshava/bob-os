# Local Lead Response Copilot — Pilot Manual E2E Test Execution Plan (3 Lead Sources) + Evidence Pack + Deterministic Fallback (LLM-Safe Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:28:54.963Z

---

## Purpose
Run manual end-to-end checks during early pilots (no automation) to protect reputation: verify first response <60s, confirm STOP/HELP compliance, validate safe behavior on bad data (missing/invalid phone), ensure dedupe/retry correctness, and confirm CRM notes are clean (HubSpot). This is designed to be executed in under 60 minutes once integrations are wired.

## Systems Under Test (3 Lead Sources)
1) **Generic Webhook JSON** (any form/ad platform -> our webhook)
2) **Jotform** (real form tool; free tier)
3) **HubSpot CRM** (free/dev account)

## KPI + Evidence Standard
**Primary KPI:** time from lead creation (T0) to first outbound SMS (T1) must be **<60 seconds**.

### Timestamp capture points
- **T0 (Lead Created):**
  - Webhook: time shown in request log (server log timestamp) OR Postman send timestamp.
  - Jotform: submission timestamp in Jotform “Submissions” table.
  - HubSpot: contact create timestamp or form submit timestamp.
- **T1 (First SMS Sent):** timestamp from SMS provider message log (or app outbound log if that’s the source of truth).
- **T2 (Lead Replied):** timestamp of inbound SMS (for qualification/conversation tests).

### Evidence artifacts to store (per run)
For each test case, store:
- Unique Test ID (e.g., W-01, J-03, H-02)
- Screenshot or copy of the lead submission data
- Message transcript (inbound/outbound) with timestamps
- Any CRM record screenshots (HubSpot contact timeline + notes)

### Sample size
- Minimum **20 trials total** across the three sources (e.g., 8 Webhook / 6 Jotform / 6 HubSpot).
- Must include at least one instance of each high-risk scenario listed below.

## Deterministic Fallback Mode (LLM Failure Safe Mode)
Trigger deterministic mode when:
- LLM returns error OR times out (>6 seconds), OR
- Confidence/validation fails (missing key fields after 1 attempt), OR
- System is in “Degraded Mode” flag.

### Deterministic script (exact copy)
**Outbound #1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. Quick questions so we can help fast: 1) What city are you in? 2) When do you want this done: Today / This week / Flexible?”

If no response in 2 minutes:
“Just checking—what city are you in? Reply with your city and we’ll confirm next steps.”

After receiving city + timeframe:
“Got it. 3) Is this for a home or business? 4) What’s the best time for a quick call: Morning / Afternoon / Evening?”

If user indicates emergency/urgent keywords (e.g., “leak”, “no heat”, “flood”, “sparking”, “smell gas”):
“Understood—this sounds urgent. If there’s any immediate safety risk, please call emergency services. What’s the address (or nearest cross street) so we can route this ASAP?”

### Deterministic branching rules
- If timeframe = Today AND after-hours: route to after-hours message (below).
- If user requests booking: send booking link; if link fails, offer manual scheduling.

### After-hours safe message
“Thanks—our office is currently closed. We’ll message you first thing when we open. If this is urgent, reply ‘URGENT’ with your city and we’ll try to route it sooner.”

### Escalation-to-human rule
Escalate when:
- User replies “agent”, “human”, “call me”, “stop questions”, OR
- 4 messages exchanged without getting city + timeframe.

Escalation message:
“No problem—looping in a human now. What’s the best number and time to reach you?”

## Compliance: STOP / HELP
These must be hard-coded and bypass LLM.
- If inbound = “STOP” (or STOP variants): immediately mark opted-out; send: “You’re unsubscribed and will no longer receive messages. Reply START to resubscribe.”
- If inbound = “HELP”: send: “Help: Reply STOP to unsubscribe. For support email us at agent_bob_replit+lead-copilot@agentmail.to and reference this link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

## High-Risk Test Cases (with Expected Results)
Each case includes: setup, action, expected.

### A) Missing phone
- Action: Submit lead without phone (or blank).
- Expected: No SMS attempt. Lead marked “Needs phone”. If email exists, send fallback email. Create CRM note: “No phone provided; unable to SMS.”

### B) Invalid phone
- Action: Phone like “123”, “555-555-5555” (if considered invalid), or non-E.164.
- Expected: Validation failure; no SMS. CRM note includes normalized attempt + error.

### C) STOP
- Action: User replies STOP after first SMS.
- Expected: Immediate confirmation message; no further messages; any retries suppressed.

### D) HELP
- Action: User replies HELP.
- Expected: Help message above; no qualification questions in that response.

### E) After-hours
- Action: Submit lead outside business hours.
- Expected: First response still <60s, but copy uses after-hours safe message; optionally queues follow-up at open.

### F) Multiple concurrent leads
- Action: Submit 5 leads within 10 seconds.
- Expected: All receive first SMS <60s; no cross-talk; correct attribution of replies to lead.

### G) Calendar link failures
- Action: Simulate booking link down or invalid.
- Expected: System offers manual scheduling: “Booking link is having trouble—reply with 2 times that work for you and we’ll confirm.” No dead-end.

### H) Webhook retries
- Action: Send identical payload 3 times with same event_id.
- Expected: Deduped; only one SMS thread created; CRM shows “Deduped retry”.

### I) Duplicate leads
- Action: Two submissions same phone within 5 minutes.
- Expected: Either merge into one conversation or create new lead but suppress duplicate intro; CRM note indicates duplication rule used.

### J) CRM note formatting (HubSpot)
- Action: Lead goes through qualification and booking attempt.
- Expected: HubSpot note is readable, structured, and includes timestamps + transcript summary (see spec below).

## Generic Webhook JSON — Copy/Paste Payloads
Use these as Postman/cURL bodies (update endpoint URL later).

### Payload W-01 (happy path)
{
  "event_id": "W-01-{{uuid}}",
  "source": "webhook",
  "created_at": "{{iso_timestamp}}",
  "lead": {
    "first_name": "Test",
    "last_name": "Webhook",
    "phone": "+15555550101",
    "email": "test.webhook@example.com",
    "service": "water heater repair",
    "zip": "78701"
  },
  "metadata": {
    "campaign": "QA Pilot",
    "consent": true
  }
}

### Payload W-02 (missing phone)
{
  "event_id": "W-02-{{uuid}}",
  "source": "webhook",
  "created_at": "{{iso_timestamp}}",
  "lead": {
    "first_name": "Test",
    "last_name": "NoPhone",
    "phone": "",
    "email": "test.nophone@example.com",
    "service": "roof inspection"
  },
  "metadata": {"consent": true}
}

### Payload W-03 (retry/dedupe)
Use same payload 3x with identical event_id.

## HubSpot Note Formatting Spec (must pass QA)
Create a single engagement note on the Contact timeline with:
- Title line: “Lead Copilot Qualification Summary”
- Fields in bullet list:
  - Source: (Webhook/Jotform/HubSpot)
  - Lead created: (T0)
  - First SMS sent: (T1)
  - Response time: (T1-T0)
  - Status: (Qualified / Unqualified / After-hours queued / Opted-out)
  - Key answers: City, Timeframe, Property type, Best call time
  - Booking: (Booked / Link failed / Pending)
- Transcript excerpt (last 6 messages max), each prefixed with timestamp and direction.

Example note body:
Lead Copilot Qualification Summary
- Source: Jotform
- Lead created: 2026-04-09T18:02:11Z
- First SMS sent: 2026-04-09T18:02:36Z
- Response time: 25s
- Status: Qualified
- Key answers: City=Austin; Timeframe=This week; Property=Home; Best call time=Afternoon
- Booking: Link failed → manual scheduling requested

Transcript (most recent)
[18:02:36] OUT: Hi Test, it’s AC Pros…
[18:03:10] IN: Austin, this week
[18:03:12] OUT: Got it. Is this for a home or business? …

## Results Table (fill during execution)
Columns:
- Test ID | Source | Scenario | T0 | T1 | Response time (sec) | Pass/Fail | Evidence link | Notes/bugs

## Bug/Fix Logging Rules
Log any failure with:
- Severity: P0 (compliance or spam risk), P1 (revenue-loss), P2 (cosmetic)
- Repro steps (exact payload/form submission)
- Expected vs actual
- Suspected component (validation, dedupe, SMS send, LLM, calendar)

## Customer Legitimacy Reference (for any HELP/support message)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

## Exit Criteria (what ‘verified’ means)
We can claim “<60s first response verified” when:
- 20 total trials recorded
- 90%+ of trials <60s AND no P0 compliance failures
- STOP/HELP confirmed with transcripts
- At least one retry/dedupe test confirms no double-texting
- HubSpot notes match formatting spec in 5+ trials
