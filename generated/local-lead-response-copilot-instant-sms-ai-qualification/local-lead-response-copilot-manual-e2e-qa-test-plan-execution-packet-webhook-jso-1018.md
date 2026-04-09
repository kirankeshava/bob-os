# Local Lead Response Copilot — Manual E2E QA Test Plan + Execution Packet (Webhook JSON + Jotform + HubSpot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:21:08.051Z

---

Business proof link (share with agencies/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate the core reputation KPI and safety: (1) first SMS sent <60 seconds from lead receipt across 3 sources; (2) compliant STOP/HELP; (3) deterministic fallback qualification if LLM fails; (4) safe handling for duplicates, retries, after-hours, calendar issues; (5) HubSpot notes formatted cleanly for agency reporting.

Scope: 3 lead sources
A) Generic webhook JSON (direct POST)
B) Jotform (real form tool)
C) HubSpot (CRM)

Definitions (timestamps)
T0 = lead received by our server (request received time)
T1 = SMS queued/sent by provider (provider send/queued timestamp)
T2 = handset delivery time (as observed on a real phone)
Pass criteria: (T1 - T0) <= 60s for 95% of trials. (T2 may vary by carrier; record but do not fail unless extreme.)

Pre-flight checklist (do once)
1) Confirm sending number is active in the environment used for the test.
2) Confirm a test handset can receive SMS and can send STOP/HELP replies.
3) Confirm after-hours window configured (e.g., 6pm–8am local time) and timezone is correct.
4) Confirm booking behavior configured: (a) direct calendar link OR (b) “human follow-up” routing.
5) Confirm deterministic fallback is enabled on LLM error/timeout.
6) Confirm dedupe key: lead_id if present, else phone+source within N minutes (recommend 10–30 mins) and webhook retry idempotency is enabled.

Minimum normalized lead schema (internal)
- source (webhook|jotform|hubspot)
- lead_id (string, optional)
- first_name (string, optional)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- zip (optional)
- message (optional)
- created_at (T0)
- metadata: raw_payload snapshot, user_agent/ip (webhook), form_id (jotform), hubspot_object_ids

Deterministic fallback qualification flow (no-LLM)
Trigger conditions: LLM timeout (>5s), LLM error, empty/low-confidence output, or safety filter block.

SMS #1 (immediate, within 60s):
“Hi {first_name or ‘there’} — this is {BusinessName}. Thanks for reaching out. Quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”

If reply 1/2/3/4:
SMS #2:
“Got it. What’s your address or ZIP code?”

If ZIP/address provided:
SMS #3:
“Thanks. When would you like us to come by? Reply 1) ASAP 2) This week 3) Next week”

If reply indicates urgency (ASAP):
SMS #4 (handoff/booking):
“Perfect — here’s the booking link: {calendar_link}. If you prefer, reply with a good callback time.”

If calendar_link failure (link missing, 5xx, or provider error):
SMS fallback:
“Thanks — our booking link is temporarily down. Reply with your best callback time and we’ll confirm ASAP. You can also email us: agent_bob_replit+lead-copilot@agentmail.to”

STOP/HELP compliance (always overrides)
- On “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately mark opted_out=true; reply: “You’re unsubscribed and will no longer receive texts. Reply HELP for help.” No further outbound.
- On “HELP”: reply: “Help: This is an automated message from {BusinessName} about your recent inquiry. Reply STOP to opt out or email agent_bob_replit+lead-copilot@agentmail.to.”

After-hours behavior
If lead arrives in after-hours window:
SMS #1 (still within 60s):
“Hi {name} — thanks for reaching out. We’re currently closed, but I can get details now and we’ll follow up first thing. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
Additionally: create CRM task/flag: “After-hours lead: follow up at {next_open_time}”.

Fail-safe behavior matrix (expected outcomes)
1) Missing phone
- Expected: No SMS attempt. Create CRM record with status “Needs phone”, log error “missing_phone”. Optional: send email to internal ops if email exists.
2) Invalid phone (non-dialable)
- Expected: No SMS. Create CRM record “Bad phone”, log invalid value and source.
3) STOP/HELP
- Expected: STOP sets global opt-out immediately; HELP returns compliance message. No qualification continues post-STOP.
4) After-hours
- Expected: still first response <60s, but copy indicates closed; no booking unless policy allows.
5) Multiple concurrent leads (5 at once)
- Expected: 5 separate threads, no cross-talk; SMS order preserved per lead; no queue starvation; all initial SMS within 60s.
6) Calendar link failures
- Expected: fall back to “reply with callback time” + email, and CRM note indicates booking failure.
7) Webhook retries
- Expected: idempotent; same event_id should not trigger multiple SMS. Record “retry_ignored” note.
8) Duplicate leads
- Expected: dedupe prevents duplicate SMS; optionally merge into same CRM contact with a note “duplicate_lead_detected”.
9) CRM note formatting
- Expected: note contains lead metadata, timestamps, transcript, opt-out status, and booking outcome in a strict template (below).

HubSpot note formatting template (strict)
Title: “Lead Copilot Transcript — {source} — {phone} — {YYYY-MM-DD HH:MM TZ}”
Body:
“Lead Summary
- Source: {source}
- Lead ID: {lead_id}
- Name: {first} {last}
- Phone: {phone} (opted_out={true|false})
- Email: {email}
- Service: {service}
- Location: {zip/address}

Timing
- T0 received: {T0}
- T1 first SMS sent: {T1} (delta={seconds}s)
- T2 delivered (observed): {T2}

Transcript
- OUT {time}: {message}
- IN  {time}: {message}
- OUT {time}: {message}

Outcome
- Qualified: {yes|no|partial}
- Booking: {booked|link_sent|link_failed|handoff_needed}
- Next step: {call at X / schedule Y / manual follow-up}

Diagnostics
- LLM used: {yes|no} (fallback_triggered={yes|no}, reason={timeout|error|safety|empty})
- Dedupe: {none|merged|ignored_retry}
- Errors: {none|...}”

Test execution plan (20 total leads)
Run 20 submissions in one session and record a Results row per test.
- Webhook JSON: 8 tests
- Jotform: 6 tests
- HubSpot: 6 tests
At least 5 tests must be “edge cases” (STOP, missing phone, invalid phone, after-hours, calendar failure, retry, duplicate, concurrency).

How to capture timestamps quickly (operator method)
1) Start a timer when you press “submit” (or when you send the webhook request). Record as T0_client.
2) In app logs (or request inspector), capture server receive time T0_server.
3) In SMS provider console/logs, capture message queued/sent timestamp T1.
4) On handset, note arrival timestamp T2 (screenshot recommended).
Compute delta = T1 - T0_server. Pass if <= 60 seconds.

A) Webhook JSON test payloads (ready to paste)
Endpoint: POST {YOUR_WEBHOOK_URL}
Headers: Content-Type: application/json

1) Valid lead
{
  "source": "webhook",
  "lead_id": "qa-web-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "Repair",
  "zip": "94107",
  "message": "Need help today"
}
Expected: SMS #1 within 60s; CRM note created/updated; qualification continues.

2) Missing phone
{
  "source": "webhook",
  "lead_id": "qa-web-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Install"
}
Expected: no SMS; CRM record flagged Needs phone; no crash.

3) Invalid phone
{
  "source": "webhook",
  "lead_id": "qa-web-003",
  "first_name": "BadPhone",
  "phone": "12345"
}
Expected: no SMS; CRM flagged Bad phone.

4) Duplicate lead (same lead_id)
Send payload #1 again.
Expected: no second SMS; CRM note indicates duplicate suppressed.

5) Retry scenario (event_id)
{
  "source": "webhook",
  "lead_id": "qa-web-004",
  "event_id": "evt-aaa-111",
  "first_name": "Retry",
  "phone": "+14155550101"
}
Send twice.
Expected: second ignored (idempotent).

6) After-hours
Run same as valid lead during after-hours window.
Expected: after-hours copy used; still <60s response.

7) Concurrency
Send 5 valid leads within 10 seconds (qa-web-010..014).
Expected: all 5 initial SMS within 60s; no mixing transcripts.

8) Calendar link failure
Temporarily configure booking link to an invalid URL or simulate calendar provider 5xx.
Expected: fallback “reply with callback time” + email is sent; CRM notes link failure.

B) Jotform test setup (free)
Create form “Lead Copilot QA Form”. Fields:
- Name (First/Last)
- Phone Number (required for ‘valid’ tests; allow optional for missing-phone test)
- Email
- Dropdown: Service Needed (Repair/Install/Quote/Other)
- Short text: ZIP
- Long text: Details
Hidden fields (if supported): lead_id, source=jotform, campaign, ad_id.

Jotform test cases (6)
J1 Valid submission (all fields)
J2 Missing phone (make phone optional for this run)
J3 Invalid phone (enter 000 or short digits)
J4 Duplicate (submit identical name+phone twice within 2 minutes)
J5 After-hours (submit after-hours)
J6 STOP compliance (submit valid -> when SMS arrives reply STOP; verify opt-out + no further messaging)

C) HubSpot test setup (free)
Create:
- Pipeline stage “New Lead (Copilot)”
- Contact property (optional): lead_copilot_source, lead_copilot_lead_id, opted_out_sms
- Notes association enabled on Contact.

HubSpot test cases (6)
H1 New contact creation triggers SMS within 60s
H2 Existing contact update triggers dedupe (no duplicate SMS if within dedupe window)
H3 Note formatting matches strict template (no missing headings)
H4 STOP from handset updates opted_out_sms and is reflected in note
H5 Webhook retry/idempotency reflected in HubSpot note (“ignored_retry”)
H6 Calendar link failure captured in note Outcome section

Results table (fill during run)
Columns:
- Test ID (e.g., W1/J3/H5)
- Source
- Scenario
- Lead identifiers (lead_id, phone)
- T0_server
- T1
- Delta seconds
- T2 (observed)
- Pass/Fail
- Notes (what happened)

Bug/Fix log template
- Bug ID
- Severity (P0 compliance / P1 KPI / P2 formatting / P3 minor)
- Source (webhook/jotform/hubspot)
- Steps to reproduce
- Expected
- Actual
- Evidence (screenshots/log lines)
- Proposed smallest fix or workaround
- Retest status

Acceptance criteria (ship/pilot-ready)
- 20 tests executed; at least 3 per source.
- 95% of initial SMS sends (T1-T0_server) <= 60s; no compliance failures.
- Deterministic fallback triggers correctly when LLM fails; no broken conversation loops.
- Dedupe/retry prevents double-texting.
- HubSpot note format is consistent and readable for agency reporting.

Notes
This is intentionally manual (operator-run) to protect speed to revenue for the first 1–3 pilots. Once paid pilots stabilize, convert the highest-risk scenarios (STOP, retries, duplicates, after-hours, calendar failure) into lightweight regression scripts.