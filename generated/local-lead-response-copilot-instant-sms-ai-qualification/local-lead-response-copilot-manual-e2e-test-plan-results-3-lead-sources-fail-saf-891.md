# Local Lead Response Copilot — Manual E2E Test Plan + Results (3 Lead Sources) + Fail-safe Deterministic Flow + Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:54:14.235Z

---

Business reference (for agency legitimacy / internal docs)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

1) Goal + Acceptance Criteria
Primary KPI: First outbound SMS must be sent within 60 seconds of lead capture (P95 <= 60s across a minimum of 20 trials; no single trial > 90s without an incident log entry).
Reliability goals:
A. LLM failure must not block qualification: system switches to deterministic flow within 5s of LLM error/timeout.
B. Compliance and safety: STOP immediately suppresses further messages; HELP returns help text and contact email.
C. No spammy duplicates: retries/duplicates should not create multiple parallel conversations.
D. After-hours behavior is deterministic and respectful; offers next-available booking or captures preferred time.
E. CRM notes are readable, consistently formatted, and contain enough context for humans.

2) Test Environments / Preconditions (manual, free-tier friendly)
- SMS sending number + logs (Twilio or equivalent) must be accessible to the operator for evidence screenshots.
- Calendar/booking endpoint/link configured (even if it’s a dummy link) to test failure behavior.
- LLM provider configured AND a test toggle to force LLM failure (or simulate by using invalid key / blocking outbound call).
- A shared folder (Drive/Notion) to store evidence: screenshots of timestamps, transcripts, CRM records.

3) Lead Sources Under Test (minimum 3)
Source 1: Generic Webhook JSON
- Trigger method: curl/Postman to /webhook/lead (or product’s inbound endpoint)
- Purpose: baseline timing, retries, concurrency, dedupe

Source 2: Jotform (real form tool)
- Trigger method: submit published Jotform to webhook
- Purpose: real-world form latency + payload quirks + missing field cases

Source 3: HubSpot CRM
- Trigger method: create Contact (and/or Form submission) in HubSpot tied to workflow/webhook
- Purpose: CRM note formatting, duplicates, lifecycle updates

4) Timestamp Evidence Method (for <60s proof)
For every trial capture these timestamps (T0-T3) and store evidence link:
- T0 (Lead captured): timestamp when webhook received (server log) OR when form submit confirmation shown (screenshot) OR HubSpot “create contact” time.
- T1 (SMS queued): timestamp when system enqueued the first message (app log).
- T2 (SMS sent): provider ‘sent’ timestamp (Twilio console).
- T3 (Lead replied received): optional, for round-trip tests.
Compute: T2 - T0 (primary KPI). Store screenshots/links per trial.

Results Table (copy/paste)
Trial | Source | Scenario | Lead ID | T0 | T1 | T2 | T2-T0 (sec) | Pass/Fail | Evidence Link | Notes
1 | Webhook | Happy path | | | | | | | | 
2 | Webhook | Duplicate | | | | | | | | 
...

Minimum sample sizes
- 20 total trials minimum: 8 Webhook, 6 Jotform, 6 HubSpot.
- Include at least 1 trial per edge-case scenario below.

5) Deterministic Qualification Fallback (LLM-safe mode)
Trigger conditions (any):
- LLM call errors OR times out > 5s
- LLM returns empty/garbled output
- Safety filter blocks response

Global conversation rules
- Always identify business context generically: “Thanks for reaching out—quick questions to get you booked.”
- Max 3 qualification questions before booking handoff.
- If user response is unclear twice, escalate to human: “I’ll have a specialist text/call you shortly.”
- Quiet hours/after-hours: if outside business hours, do not attempt live call booking; offer next steps.

STOP/HELP compliance
- If inbound message contains STOP (case-insensitive, exact word boundary), immediately set contact=DoNotText and reply once: “You’re unsubscribed and will no longer receive messages.” No further SMS.
- If inbound contains HELP, reply: “Help: Reply STOP to unsubscribe. For support email agent_bob_replit+lead-copilot@agentmail.to. See: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Fallback question flow (home services default)
Message 1 (immediate, under 60s):
“Thanks for reaching out—can I ask 3 quick questions to get you scheduled? Reply YES to continue.”
- If YES -> Q1
- If anything else -> “No problem—what’s the best time to reach you?” (capture + escalate)

Q1: “What service do you need? (e.g., repair, install, quote)”
- Store: service_type

Q2: “What’s your ZIP code?”
- Validate 5-digit; if invalid twice -> store raw + escalate

Q3: “How soon do you want this done? Reply 1) Today/ASAP 2) This week 3) Just researching”
- Store: urgency

Handoff (business hours):
- If calendar link healthy: “Great—grab a time here: <calendar_link>. If you prefer, reply with two times that work for you.”
- If calendar link failure: “I’m having trouble loading the booking link. Reply with your preferred day/time and we’ll confirm shortly.” + create task for human.

Handoff (after-hours):
“Thanks—our team is currently offline. Reply with a good time tomorrow (morning/afternoon/evening) and we’ll confirm first thing.”

6) Edge-Case Test Cases (Steps + Expected)
A) Missing phone
- Input: lead payload without phone or blank phone.
- Expected: no SMS attempt; create CRM note/task “Missing phone”; optionally email internal alert; status=NeedsInfo.

B) Invalid phone
- Input: phone not E.164 / too short.
- Expected: do not send SMS; log validation error; attempt normalization if safe; create CRM note “Invalid phone provided: <value>”.

C) STOP
- Steps: complete happy path, then reply “STOP”.
- Expected: one confirmation message; subsequent outbound blocked even if lead retries.

D) HELP
- Steps: reply “HELP”.
- Expected: returns help copy + support email + website; does not unsubscribe.

E) After-hours
- Steps: set system clock or business-hours config to after-hours; submit lead.
- Expected: first SMS still <60s; message uses after-hours script; no aggressive booking.

F) Multiple concurrent leads
- Steps: fire 5 leads within 5 seconds (different phones).
- Expected: all get first SMS within 60s; no cross-talk; no queue starvation.

G) Calendar link failures
- Steps: set calendar endpoint to 500/timeout; submit lead; progress to handoff.
- Expected: user gets alternative instruction (reply with times); internal task created; no dead-end.

H) Webhook retries
- Steps: send same lead payload 3 times with same event_id; or send duplicates with same phone+timestamp.
- Expected: dedupe prevents multiple first SMS; log shows deduped events; idempotency key respected.

I) Duplicate leads (same phone, new lead)
- Steps: submit lead for same phone 10 min later.
- Expected: either (1) continue same conversation thread or (2) create new thread but do not spam; system should detect recent activity window and adjust copy (“Looks like we recently texted—still need help?”).

J) CRM note formatting (HubSpot)
- Steps: run a lead through qualification and handoff; inspect Contact timeline.
- Expected: single note with consistent template:
  Title: “Lead Copilot Qualification Summary”
  Body (example):
  - Source: Jotform | Webhook | HubSpot
  - Lead captured: <timestamp>
  - First SMS sent: <timestamp> (<sec>s)
  - Service: <service_type>
  - ZIP: <zip>
  - Urgency: <urgency>
  - Status: Qualified / Unqualified / Needs follow-up
  - Transcript (last 6 messages max)

7) Bug/Fix List (starter, prioritized)
P0 (must fix before agency pilot)
1. SMS sent when phone missing/invalid -> add strict validation + CRM task instead.
2. STOP not enforced globally -> implement DoNotText flag checked before every send.
3. LLM failure blocks flow -> enforce deterministic fallback within 5s.
4. Duplicate webhook causes multiple SMS -> implement idempotency (event_id) + recent-phone dedupe window.

P1 (fix during pilot)
5. After-hours copy still tries to book live calls -> enforce after-hours routing.
6. Calendar link outage causes dead end -> add alternate capture + internal task.
7. Concurrency causes >60s on 5-lead burst -> prioritize first-touch message in queue.

P2 (nice-to-have)
8. HubSpot note formatting inconsistent -> standardize template and limit transcript length.

Bug Log Template
Bug ID | Severity | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Suspected Cause | Suggested Fix | Owner | Status

8) Execution Checklist (operator can complete in <60 minutes once endpoints exist)
1. Confirm webhook endpoint + verify logs accessible (T0/T1 capture).
2. Run 3 happy-path trials (Webhook/Jotform/HubSpot) and fill Results table.
3. Run edge cases A-J (at least 1 each) and log failures.
4. Run 5-lead concurrency burst (Webhook) and record timings.
5. Force LLM failure and verify deterministic flow continues end-to-end.
6. Export evidence links + summarize KPI (P50/P95) and open P0/P1 bugs.

9) Reporting Format (what to send agencies)
- “We tested 3 lead sources (Webhook/Jotform/HubSpot). P95 first-response was __ seconds across 20 trials. STOP/HELP compliant. LLM-safe deterministic mode verified. Known issues: __ (with ETA).”

End of document.