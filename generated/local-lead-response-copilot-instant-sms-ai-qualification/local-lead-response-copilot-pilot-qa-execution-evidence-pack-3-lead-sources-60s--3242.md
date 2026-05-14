# Local Lead Response Copilot — Pilot QA Execution Evidence Pack (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:47:54.826Z

---

Purpose
This pack is designed for early pilots (pre-revenue) to manually verify end-to-end reliability without automation. It produces hard evidence for agencies: proof that first SMS is sent within 60 seconds, qualification continues safely when AI fails, compliance behaviors (STOP/HELP) are correct, and CRM logging is readable.

Business legitimacy references (use in comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Lead Sources Covered
A) Generic Webhook JSON (any ad/form tool that can POST JSON)
B) Jotform (real form tool; can POST to webhook)
C) HubSpot CRM (create/update contact + note/timeline event)

KPI & Evidence Standard: “<60s First Response”
Definition: time from lead submission (T0) to first outgoing SMS attempt (T1) <= 60 seconds.
- T0 capture: form submit timestamp (Jotform submission time) OR webhook request time (server logs) OR CRM create time.
- T1 capture: SMS provider outgoing message log timestamp OR app message log timestamp.
Store evidence per trial:
1) Screenshot or log line for T0
2) Screenshot or log line for T1
3) Computed delta seconds (T1 - T0)
4) Transcript of messages (at least the first 3 messages)

Minimum sample size for a pilot “pass”: 20 trials total across the 3 sources.
Hard fail gate: any trial with T1-T0 > 60 seconds or no outbound SMS within 2 minutes without a documented fallback.

Pre-Flight Checklist (10 minutes)
1) Confirm sending number is active and message logs are accessible.
2) Confirm after-hours schedule configured (e.g., 6pm–8am local + weekends).
3) Confirm deterministic fallback mode is available (toggle or automatic on LLM timeout/error).
4) Confirm dedupe strategy exists (phone-based or lead-id based) and the dedupe window (recommend 10 minutes).
5) Confirm calendar booking link exists and has a known “test failure” mode (disable/invalid URL) for negative tests.
6) Confirm CRM integration credentialed (HubSpot dev account is fine) and note formatting spec is known (see “Expected HubSpot Note Format”).

Deterministic Fallback Qualification Flow (Copy/Paste Script)
Trigger conditions (any):
- LLM call errors, times out (>8s), returns empty/unsafe output, or confidence/guardrail failure.
- Downstream dependency failure prevents dynamic prompt (e.g., CRM read fails).

Global rules:
- Always identify the business generically if needed: “Thanks for reaching out—quick question so we can help.”
- Never claim a booking is confirmed unless calendar confirms.
- STOP: immediately suppress all future non-essential messages.
- HELP: provide support email and stop instructions.
- Timeout: if user does not respond within 10 minutes, send one gentle reminder, then pause.

Fallback questions (home services oriented):
Message 1 (immediate):
“Thanks for reaching out—quick question so we can get you booked. What service do you need? Reply 1) Repair 2) Install/Replace 3) Quote/Other”

Branch:
- If reply 1/2/3 -> Message 2
- If unclear/free text -> Message 2 using category mapping: “Got it. What’s your ZIP code?”

Message 2:
“What’s the ZIP code for the job?”

Message 3:
“Is this urgent? Reply 1) Today 2) This week 3) Flexible”

Message 4 (handoff option):
“Best time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening. Or share a time window.”

Booking step:
- If calendar link is healthy:
“Perfect—here’s the booking link to lock it in: {CALENDAR_LINK}. If you prefer, reply with a time and we’ll confirm.”
- If calendar link fails:
“Our booking link is temporarily down. Reply with 2–3 times that work for you (and your time zone) and we’ll confirm by text. Support: agent_bob_replit+lead-copilot@agentmail.to | Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-hours behavior:
If outside business hours, first message becomes:
“Thanks—got your request. We’ll text you back first thing in the morning. To help us prep: what service do you need? Reply 1) Repair 2) Install/Replace 3) Quote/Other”
Then queue follow-up at next opening time.

Compliance messages:
- If inbound is “STOP” (any case):
“Confirmed. You’ll no longer receive texts. Reply HELP for support.”
(Then ensure system suppresses messaging for that phone.)
- If inbound is “HELP”:
“Support: agent_bob_replit+lead-copilot@agentmail.to | Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Reply STOP to opt out.”

Manual Test Cases & Expected Results (Run Order)
For each test, record T0, T1, delta seconds, and transcript.

1) Valid lead (baseline)
- Source: Generic Webhook JSON
- Expected: First SMS <=60s, normal qualification, CRM note created/updated.

2) Missing phone
- Source: Webhook payload missing phone field.
- Expected: No SMS attempt. System logs error clearly. If email is present, send fallback email or create CRM task (manual) with “Missing phone.” No repeated retries beyond configured max.

3) Invalid phone
- Source: Webhook with phone=“123” or “+1 (555) ABC-DEFG”.
- Expected: No SMS attempt. Error state recorded. CRM note marks “Invalid phone.”

4) STOP compliance
- Source: Use a valid lead; after first outbound SMS, reply “STOP”.
- Expected: Confirmation message sent; all future marketing/qualification messages suppressed.

5) HELP compliance
- Reply “HELP”.
- Expected: Support response includes email + website + STOP instructions.

6) After-hours
- Submit lead outside business hours.
- Expected: After-hours first message used, follow-up scheduled at next opening; no spammy repeated messages.

7) Concurrent leads (5 at once)
- Submit 5 leads within 30 seconds (webhook or Jotform).
- Expected: All receive first SMS <=60s; no cross-talk; each lead has separate transcript; CRM notes tied correctly.

8) Calendar link failure
- Temporarily use an invalid calendar URL or simulate outage.
- Expected: System sends apology + manual scheduling prompt; does not claim booking success; logs incident.

9) Webhook retries
- Re-send identical webhook payload 3 times within 2 minutes.
- Expected: Deduped (only 1 outbound SMS thread). CRM indicates “Duplicate suppressed” entry (optional) but does not spam.

10) Duplicate leads (same phone, different name)
- Submit twice with same phone and different name.
- Expected: Within dedupe window: suppress or merge. Outside window: treat as new, but maintain history.

11) CRM note formatting (HubSpot)
- Expected note is readable, consistent, and contains key fields; no JSON blobs.

Concrete Generic Webhook JSON Payloads
A) Valid
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "Repair",
  "zip": "94110",
  "submitted_at": "2026-05-14T12:00:00Z"
}

B) Missing phone
{
  "source": "webhook_test",
  "lead_id": "qa-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Install",
  "submitted_at": "2026-05-14T12:05:00Z"
}

C) Invalid phone
{
  "source": "webhook_test",
  "lead_id": "qa-003",
  "first_name": "BadPhone",
  "phone": "123",
  "submitted_at": "2026-05-14T12:10:00Z"
}

D) Duplicate (same lead_id)
(use A again with same lead_id within 2 minutes)

Expected HubSpot Note Format (single timeline note)
Title: “Lead Copilot Qualification”
Body (plain text, no raw JSON):
Lead ID: qa-001
Source: webhook_test | Jotform | HubSpot
Submitted: 2026-05-14 12:00:00Z
First SMS Sent: 2026-05-14 12:00:32Z (32s)
Contact:
- Name: Test Lead
- Phone: +15555550101
- Email: testlead@example.com
Qualification:
- Service: Repair
- ZIP: 94110
- Urgency: Today/This week/Flexible
- Preferred call time: Morning/Afternoon/Evening or free text
Outcome:
- Status: Qualified | Not Qualified | Needs Human Follow-up
- Booking: Calendar link sent | Booked | Calendar outage fallback used
Compliance:
- STOP: Yes/No | HELP: Yes/No
Errors/Incidents:
- LLM fallback used: Yes/No
- Delivery failure: Yes/No (provider code if available)

Results Capture Table (copy into sheet)
Trial # | Source | Scenario | T0 evidence link | T1 evidence link | Delta (sec) | Pass/Fail | Notes
1 | Webhook | Baseline | | | | | 
2 | Webhook | Missing phone | | | | | 
3 | Webhook | Invalid phone | | | | | 
...

Bug/Fix Log (minimum fields)
ID | Severity (P0/P1/P2) | Scenario | Steps to Repro | Expected | Actual | Evidence links | Suggested Fix | Owner | Status

Agency/Customer Communication Snippets (use when incidents happen)
1) LLM issue (safe mode enabled)
“Quick update: our AI qualification is having a temporary hiccup, but your leads are still being contacted instantly and routed through our safe-mode questions so nothing gets missed. If you see anything unusual, email agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

2) SMS delivery degradation
“We’re seeing delayed carrier delivery in some cases. We’ve switched to a conservative retry policy to avoid duplicate texts and we’re monitoring delivery logs. If there’s a critical lead, forward it to agent_bob_replit+lead-copilot@agentmail.to and we’ll confirm outreach manually. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) Calendar link outage
“Our booking link is temporarily unavailable. Leads will be asked for 2–3 preferred times by text and we’ll confirm appointments manually until the link is restored. Support: agent_bob_replit+lead-copilot@agentmail.to | Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Exit Criteria (what “verified” means for pilot)
- 20+ trials recorded with evidence.
- 95% of trials have T1-T0 <= 60s; 100% have T1-T0 <= 120s OR documented reason + fallback.
- STOP/HELP compliance observed and evidenced.
- After-hours behavior matches script.
- Dedupe prevents SMS spam on retries/duplicates.
- HubSpot notes are readable and consistent with the template above.

Notes
This pack intentionally avoids automation and focuses on producing agency-grade evidence quickly during pilots, aligning with the current priority: distribution and revenue first while preventing reputation damage.
