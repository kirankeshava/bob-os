# Pilot Execution + Client Comms Pack (Kickoff Email, Consent Note, Baseline Form, Incident Log, Weekly Value Report Blocks)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:10:25.247Z

---

## 1) Client Pilot Kickoff Email (copy/paste)
Subject: 7‑Day No‑Show Reduction Pilot — kickoff + what we need (15 min)

Hi {{FirstName}},

Thanks for agreeing to run a rapid pilot of our Appointment No‑Show Reducer. Here’s the legitimacy link for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

For the 7‑day pilot, we’ll send smart SMS reminders, collect two‑way confirmations, and help automate reschedules so you recover otherwise lost appointments. We’ll also provide a weekly value report that estimates recovered revenue.

To start, please reply with the best time for a 15‑minute onboarding call (today/tomorrow). On that call we’ll confirm:
1) Your timezone + business hours
2) Reminder timing (e.g., 24h + 2h)
3) Reschedule rules (how far out, which days/times)
4) Waitlist rules (optional)
5) Owner/staff escalation contact if anything fails

If you prefer, you can email details directly to agent_bob_replit+no-show-bot@agentmail.to.

Best,
Bob
Appointment No‑Show Reducer


## 2) Consent/Compliance Confirmation Note (send after onboarding)
Subject: Confirming opt-in + STOP/HELP handling for your pilot

Hi {{FirstName}},

Quick confirmation of messaging compliance for the pilot:
- We will only text patients/clients who have provided consent to receive SMS related to their appointments (existing consent via your intake forms/online booking counts if it explicitly includes SMS reminders).
- Every reminder thread supports standard keywords:
  - STOP / UNSUBSCRIBE = immediate opt-out (no further messages)
  - HELP = support info + our contact email
- If a client opts out and later wants texts again, they must re-opt-in.

If you’d like to review our overview page, it’s here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Please reply “CONFIRMED” if the above matches your consent process.

Thanks,
Bob


## 3) Pilot Metrics Baseline Form (copy/paste into email or doc)
**Business / Location**
- Business name:
- Location address (optional):
- Primary contact name + role:
- Timezone:
- Business hours:
- Appointment types included in pilot (list):

**Baseline (last 4 weeks, if available)**
- Total appointments scheduled:
- No-shows (count):
- Late cancels (count):
- Reschedules (count):
- Avg appointment value ($):
- Typical lead time (days between booking and appointment):

**Pilot configuration**
- Reminder schedule (e.g., 24h + 2h):
- Confirmation wording preference (formal/casual):
- Reschedule rules (earliest allowed time, latest allowed time, days blocked):
- Waitlist enabled? (Y/N)
- Gap-fill preference (same-day only / 48 hours / any):

**Escalation**
- If automation fails, notify (name + email + phone):
- Preferred escalation window (e.g., 8am–6pm):


## 4) Incident Log + Bug Triage Template (single source of truth)
**Incident ID:** PILOT-{{LocationCode}}-{{YYYYMMDD}}-{{###}}
- Date/time detected:
- Detected by: (system / customer / us)
- Location:
- Severity:
  - S0: Compliance issue (STOP not honored, wrong recipient) — immediate halt
  - S1: Customer-impacting (missed reminders, wrong time, double booking risk)
  - S2: Partial degradation (threading odd, delayed send, minor copy)
  - S3: Cosmetic / improvement
- Summary (1 sentence):
- Customer impact (who/what/how many):
- Steps to reproduce:
- Expected result:
- Actual result:
- Suspected cause:
- Workaround applied (if any):
- Rollback criteria met? (Y/N) If yes, what action taken:
- Resolution:
- Verification steps + evidence:
- Prevent recurrence action:


## 5) Weekly Value Report Blocks (fill-in, client-facing)
Subject: Weekly results — confirmations up, no-shows down ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here are your pilot results for {{Location}} for {{StartDate}}–{{EndDate}}.

**Activity**
- Appointments with reminders sent: {{#}}
- Two-way confirmations received: {{#}} ({{%}} of reminded)
- Reschedule requests handled: {{#}}
- Opt-outs (STOP): {{#}}

**Outcomes (estimated)**
- Estimated no-shows prevented: {{#}}
- Same-day/near-term gaps filled from waitlist: {{#}}
- Estimated recovered revenue this week: ${{#}}
  - Calculation: (no-shows prevented × avg appointment value) + (gaps filled × avg appointment value)

**Notable notes**
- Top reason for reschedules (if available): {{Reason}}
- Any operational issues / incidents: {{None or list Incident IDs}}

**Next week tweak (1–2 items)**
- {{e.g., adjust 2h reminder copy to reduce confusion}}
- {{e.g., enable waitlist for specific appointment types}}

For reference, our overview page is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Best,
Bob


## 6) Go-Live Gating Checklist (quick pass before Day 1)
- Timezone verified (test appointment tomorrow at 9:00am local — reminder timestamps correct)
- STOP keyword test (opt-out immediately, no further sends)
- YES/CONFIRM test (status updates correctly)
- NO/CANCEL test (status updates; escalation/flow correct)
- RESCHEDULE test (proposes allowed times; avoids blocked hours)
- Double-book prevention (if booking slot taken, propose next valid slot)
- Failure mode (simulate calendar/API failure): owner escalation contact receives alert; system pauses risky actions

This pack is designed to be used as-is for the first 2–3 concierge pilots so we capture baseline, run safely, and produce credible weekly ROI proof for sales.
