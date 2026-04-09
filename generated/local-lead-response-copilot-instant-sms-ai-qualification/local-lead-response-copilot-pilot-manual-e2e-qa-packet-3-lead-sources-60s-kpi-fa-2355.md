# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:58:32.547Z

---

Business context
Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy link to share with pilots/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Pilot support email (use in messages/notes): agent_bob_replit+lead-copilot@agentmail.to

Goal of this packet
1) Verify end-to-end behavior across 3 lead sources: (A) Generic Webhook JSON, (B) Jotform (real form tool), (C) HubSpot (CRM).
2) Prove speed-to-lead KPI: First outbound SMS within 60 seconds of lead creation.
3) Validate fail-safe behaviors: missing/invalid phone, STOP/HELP compliance, after-hours routing, concurrency, calendar link failures, webhook retries, dedupe, and CRM note formatting.
4) Document deterministic fallback flow when LLM fails (timeout/error) so qualification still works and reputational risk is minimized.

Scope and assumptions (pilot stage)
- Manual execution only. No automated test harness.
- Use free tiers (Jotform free form, HubSpot free CRM account). No paid tools.
- “LLM fail” is simulated by toggling an internal “deterministic mode” flag if available, or by forcing an LLM timeout/error (e.g., invalid key in test environment). If neither is possible yet, record as “Not testable until config exists.”

Definitions
- Lead Created Timestamp (T0): When form is submitted / webhook received / CRM record created.
- First Response Timestamp (T1): When the first outbound SMS is sent to the lead.
- KPI: T1 − T0 <= 60 seconds.
- Evidence: Screenshots or logs of T0 and T1, plus the SMS transcript.

Tools for timing capture (no spend)
- Use a stopwatch OR record timestamps from:
  - Jotform submission timestamp (in Jotform submissions)
  - Webhook receiver log timestamp (app logs)
  - HubSpot contact “Create date” and timeline events
  - SMS provider message log timestamps (or internal message table)

Sample size targets (pilot)
- Minimum: 20 total trials spanning all 3 sources.
- Suggested: 8 webhook, 6 Jotform, 6 HubSpot.
- Must include at least 1 run of each edge case listed in the test matrix below.

Acceptance criteria (high-level)
A. Speed-to-lead: 95% of trials meet <60s; no single trial exceeds 120s without a documented external outage.
B. Safety: No SMS sent when phone is missing/invalid; STOP halts messaging immediately.
C. After-hours: Message content changes and/or booking behavior changes as specified (no aggressive booking prompts if closed).
D. Reliability: Webhook retries do not create duplicate conversations; duplicate leads are deduped.
E. CRM notes: Qualification transcript is readable, consistently formatted, and includes required metadata.
F. Fallback: If LLM fails, deterministic flow is used and still produces a qualified outcome or escalation.

Lead sources under test
1) Generic Webhook JSON
- Endpoint: (fill in once available) __________________
- Auth: none / header token / HMAC (specify) __________________
- Expected minimal payload fields:
  - first_name, last_name (optional)
  - phone (E.164 preferred)
  - email (optional)
  - service/type (optional)
  - source (string)

2) Jotform
- Form name: __________________
- Jotform submission -> webhook/Zapier/Make -> our webhook OR direct integration.
- Fields: name, phone, email, zip, job type.

3) HubSpot (CRM)
- Trigger: new contact created OR form submission creates contact.
- Expected: create/update contact, add note with transcript, optionally set lifecycle stage/lead status.

Test data
Use the same phone pool for repeatability (do not use real customer numbers):
- Valid test phone (primary): +15555550101
- Valid test phone (secondary): +15555550102
- Invalid phone samples: "+1", "123", "555-ABCDE", empty string
- Names: Pat Test, Casey Test
- Business type scenario (home services): “Plumbing estimate” / “AC repair today”

Deterministic qualification fallback (LLM-safe mode)
Purpose: If LLM fails (timeout/error/over quota), continue qualification with a fixed script.

Entry conditions (any):
- LLM response time > 8 seconds (configurable) OR
- LLM returns error/empty OR
- Explicit “Deterministic Mode = ON” toggle.

Message pacing
- First SMS must be sent immediately (target <60s from T0).
- Wait window for each question: 10 minutes.
- Max questions before escalation: 4.
- If no response after 2 questions, send one final follow-up then stop.

Deterministic script (exact copy)
SMS #1 (immediate):
“Hi {first_name}, it’s the scheduling assistant. Thanks for reaching out about {service}. Quick question so we can help fast: what city/ZIP is the job in?”

If answer received -> SMS #2:
“Got it. Is this urgent (needs help today) or can it wait a few days? Reply: TODAY or LATER.”

If TODAY -> SMS #3:
“Understood. What’s the best time for a quick call in the next 2 hours? Reply with a time window (e.g., ‘30 min’ or ‘3–4pm’).”

If LATER -> SMS #3:
“Great. What day/time works best for a quick call to confirm details? (Example: ‘Tue 10–12’).”

SMS #4 (either path; booking attempt):
“Thanks—one last thing: what’s the best address or nearest cross street for the job?”

Completion behavior
- If user provides city/ZIP + urgency + time window: mark as Qualified.
- If calendar link/auto-booking is available: send booking link.
- If booking fails (calendar down): send escalation message (below) and create internal task.

Escalation message (calendar failure / unable to book)
“Thanks—our booking link is having trouble right now. A human will text/call you shortly to lock in a time. If you prefer, reply with the best callback number. Support: agent_bob_replit+lead-copilot@agentmail.to (site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)”

STOP/HELP compliance (required behavior)
- If inbound contains “STOP” (case-insensitive), immediately:
  - Send confirmation: “You’re opted out and will no longer receive messages. Reply HELP for help.”
  - Set contact opted_out=true.
  - Do not send any further automated messages.
- If inbound contains “HELP”, respond:
  - “Help: This is the scheduling assistant. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-hours behavior (recommended)
Define business hours per pilot account. If lead comes in after-hours:
- Immediate SMS still goes out (<60s), but copy changes:
“Hi {first_name}—thanks for reaching out about {service}. We’re currently closed, but I can collect a couple details now and we’ll follow up first thing in the morning. What city/ZIP is the job in?”
- Do not promise immediate human callback.

Test matrix (execute at least once each)
1. Happy path (valid phone, in-hours): lead -> immediate SMS -> qualifies -> booking link -> CRM note.
2. Missing phone: ensure no SMS sent; create CRM/internal note “missing phone”; request email follow-up if available.
3. Invalid phone: reject; no SMS; log validation error.
4. STOP: after any outbound, reply STOP; ensure immediate opt-out and no further messages.
5. HELP: reply HELP; ensure compliant help text.
6. After-hours: verify different copy + no immediate booking promise.
7. Multiple concurrent leads: submit 5 leads within 60 seconds; verify each gets correct conversation and no cross-talk.
8. Calendar link failure: simulate booking endpoint down; verify escalation message + internal task/CRM note.
9. Webhook retries: send same webhook payload 3 times (same lead_id); verify only one conversation and dedupe is applied.
10. Duplicate leads (same phone, new submission): verify dedupe rules (e.g., if within 24h, append to existing thread; if older, create new case) and CRM note reflects duplication.
11. HubSpot note formatting: ensure transcript note is readable and includes metadata.

Generic Webhook JSON payloads (copy/paste)
Happy path:
{
  "lead_id": "qa-001",
  "source": "webhook-test",
  "first_name": "Pat",
  "last_name": "Test",
  "phone": "+15555550101",
  "email": "pat.test@example.com",
  "service": "Plumbing estimate",
  "created_at": "{now}"
}
Missing phone:
{
  "lead_id": "qa-002",
  "source": "webhook-test",
  "first_name": "Casey",
  "phone": "",
  "service": "AC repair today",
  "created_at": "{now}"
}
Duplicate (same lead_id retry): resend payload qa-001 unchanged.
Duplicate (new lead_id same phone):
{
  "lead_id": "qa-003",
  "source": "webhook-test",
  "first_name": "Pat",
  "phone": "+15555550101",
  "service": "Plumbing estimate",
  "created_at": "{now}"
}

Expected CRM note format (HubSpot)
Title: “Lead Copilot Qualification — {source} — {date}”
Body (example):
- Lead ID: qa-001
- Source: webhook-test
- First response SLA: 22s (T0 2026-04-09 14:02:10Z -> T1 2026-04-09 14:02:32Z)
- Status: Qualified / Unqualified / Escalated / Opted-out
- Transcript:
  1) Outbound: “Hi Pat, it’s the scheduling assistant… what city/ZIP…?”
  2) Inbound: “90210”
  3) Outbound: “Is this urgent… TODAY or LATER?”
  4) Inbound: “TODAY”
  5) Outbound: “Best time in next 2 hours?”
  6) Inbound: “30 min”
- Next step: Booking link sent / Human follow-up requested / No phone

Results capture table (fill during run)
For each test run, record:
- Run ID:
- Lead source (Webhook/Jotform/HubSpot):
- Scenario (happy path / missing phone / STOP / etc.):
- T0 (lead created):
- T1 (first SMS sent):
- SLA seconds (T1-T0):
- Pass/Fail SLA:
- Pass/Fail behavior:
- Evidence link (screenshot/log excerpt):
- Notes:

Bug / Fix log template
Fields:
- Bug ID:
- Severity (P0 compliance, P1 revenue-impact, P2 annoyance):
- Source/Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Suggested fix:
- Owner:
- Status:

Known high-risk bug categories to watch
- Phone parsing/normalization (E.164), accidental sends to invalid numbers.
- STOP not halting follow-ups.
- Dedupe failures causing spam.
- Calendar outages not handled (no escalation).
- LLM timeouts causing silence (no deterministic fallback).
- HubSpot API rate limits causing missing notes.

Execution checklist (operator sequence)
1) Confirm test sending number is active and message logs are viewable.
2) Confirm deterministic mode toggle or failure simulation method exists; if not, mark fallback tests “blocked.”
3) Run 2 webhook tests (happy + missing phone) and record T0/T1.
4) Run 2 Jotform submissions (happy + invalid phone) and record.
5) Run 2 HubSpot-created contacts (happy + duplicate) and record.
6) Run STOP and HELP from the test handset; confirm compliance.
7) Run after-hours test by changing business hours or using current time window.
8) Run concurrency test (5 leads rapidly) and validate no cross-talk.
9) Summarize SLA stats: min/median/max; % under 60s.

Pilot-ready pass/fail gates
- If any P0 compliance issue (STOP/HELP) fails: do not proceed with agency onboarding until fixed.
- If median SLA > 60s or >10% trials exceed 60s: treat as launch-blocking for speed-to-lead positioning.
- If dedupe fails (duplicate SMS to same lead within minutes): fix before scaling outbound.

Notes
This packet is designed to be executed during first pilots without slowing distribution or revenue. As soon as we have 1–2 active customers and stable integrations, convert the highest-risk scenarios (STOP, retries/dedupe, SLA measurement) into lightweight scripted regression checks.