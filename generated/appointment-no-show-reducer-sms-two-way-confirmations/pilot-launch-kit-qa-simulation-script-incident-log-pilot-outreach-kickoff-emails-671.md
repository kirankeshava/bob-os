# Pilot Launch Kit — QA Simulation Script + Incident Log + Pilot Outreach/Kickoff Emails

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:23:01.679Z

---

# Pilot Launch Kit — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  
Support / contact email: agent_bob_replit+no-show-bot@agentmail.to

## 1) 48-Hour Internal QA Simulation Script (Run Before/Alongside Pilot #1)

### How to run
- Create a synthetic “test location” with a known timezone (start with America/New_York).
- Create 10–20 synthetic appointments over the next 7 days, including edge times.
- Use 2–3 test patient numbers (or a simulator) to reply with keywords and ambiguous free-text.
- For every scenario below, record: timestamp, message content, detected intent, resulting calendar change, and any owner alert triggered.

### Scenario Set A — Timezones & DST
**A1: Correct local-time rendering**
- Setup: Location timezone = America/Los_Angeles. Appointment at 10:00 AM local.
- Expectation: Reminder shows “10:00 AM” in local time; not UTC; not server time.
- Pass/Fail: Pass if reminder time and appointment time in message match calendar local time.

**A2: DST boundary sanity check**
- Setup: Appointment scheduled on the week of DST change (if feasible in test env), or simulate by changing timezone settings.
- Action: Generate reminders at T-24h and T-2h.
- Expectation: Reminders fire at intended local offsets.
- Fail-safe: If DST causes mismatch, system should not spam; should alert owner.

### Scenario Set B — Confirmations & Threading
**B1: Simple confirmation “YES”**
- Action: Reply “YES”.
- Expectation: Status becomes Confirmed; next reminder logic respects confirmed status (e.g., still sends final reminder if configured, but does not ask to confirm again).

**B2: Message threading with multiple messages**
- Action: Reply “Yes” then “thanks” then “see you”.
- Expectation: Only first confirmation changes state; subsequent messages do not flip state or cause duplicate actions.

**B3: Ambiguous confirmation**
- Action: Reply “Ok” / “k” / “sounds good”.
- Expectation: Intent parsing should map to Confirmed OR trigger clarification question if confidence low.
- Rule-based override: If message contains {yes, y, yep, confirm, confirmed} -> Confirm.

### Scenario Set C — Cancellations & Reschedules
**C1: Explicit cancel**
- Action: Reply “Cancel” / “I can’t make it”.
- Expectation: Appointment status becomes Cancel Requested or Cancelled (depending on policy); owner optionally notified; patient receives next-step message.

**C2: Reschedule request**
- Action: Reply “Reschedule” / “Can we move to next week?”.
- Expectation: Flow asks for preferred times OR offers next 3 slots; original slot held until reschedule confirmed (or released immediately per configured policy).

**C3: Reschedule loop prevention**
- Action: Patient requests reschedule, then changes mind: “Actually keep it”.
- Expectation: System returns to Confirmed/Pending correctly; no duplicate bookings.

### Scenario Set D — Double-Booking Prevention
**D1: Two-way reschedule creates conflict**
- Setup: Slot A already booked by another appointment.
- Action: Patient chooses Slot A.
- Expectation: System rejects and offers alternatives; does NOT overwrite other appointment.

**D2: Concurrent replies**
- Setup: Two patients both offered same slot (race condition test).
- Action: Both reply selecting the same time within 30 seconds.
- Expectation: Only first gets the slot; second gets alternative options.

### Scenario Set E — Opt-out / Compliance / HELP
**E1: STOP**
- Action: Reply “STOP”.
- Expectation: Immediately opt out; send confirmation of opt-out; suppress all future messages.

**E2: HELP**
- Action: Reply “HELP”.
- Expectation: Return a help message including support email agent_bob_replit+no-show-bot@agentmail.to and minimal instructions.

**E3: Opt-out edge variants**
- Action: “Unsubscribe”, “stop texting me”, “remove me”.
- Expectation: Treated as STOP via keyword overrides.

### Scenario Set F — Delivery Failures & Retries
**F1: SMS delivery failure**
- Setup: Simulate carrier failure / unreachable number.
- Expectation: Retry policy applies (if configured). If persistent failure, alert owner and mark number invalid.

**F2: Rate limiting / burst protection**
- Setup: 200 reminders scheduled same minute.
- Expectation: Queueing works; no provider bans; no duplicate sends.

### Scenario Set G — Calendar API Failures & Fail-safes
**G1: Calendar read fails**
- Setup: Disable/expire calendar token.
- Expectation: System stops automation that depends on calendar truth; alerts owner immediately with a clear remediation instruction.

**G2: Calendar write fails (reschedule/cancel)**
- Action: Attempt reschedule.
- Expectation: Patient gets a “We’re confirming with the office” message; owner gets urgent alert; system prevents patient from thinking it’s confirmed when it’s not.

### Scenario Set H — Analytics Integrity
**H1: Confirmation metrics**
- Action: Confirm 5 out of 10.
- Expectation: Confirmation rate = 50%; timestamps recorded; no double counting.

**H2: Reschedule saves**
- Action: 2 patients reschedule (would have no-showed).
- Expectation: Count as “reschedule saves” and included in recovered revenue estimate.

**H3: Waitlist fills**
- Action: Cancel one appointment; trigger waitlist outreach; one fill.
- Expectation: Waitlist fill count increments; recovered revenue includes filled appointment value.

---

## 2) Pilot Incident / Bug Log Template (Copy/Paste)

Use one row per incident.

**Incident ID:** (e.g., PILOT1-2026-04-09-001)  
**Date/Time (local):**  
**Location:**  
**Reporter:** (client / internal / automated monitor)  
**Severity:** S0 Critical (legal/safety), S1 High (revenue-impacting), S2 Medium (workflow broken with workaround), S3 Low (copy/UI)  
**Category:** timezone/DST | calendar sync | SMS delivery | intent parsing | opt-out | reschedule | waitlist | analytics | other  

**Summary (1 sentence):**  

**Customer Impact:**
- # patients affected:
- What happened:
- What should have happened:

**Reproduction Steps:**
1.
2.
3.

**Expected Result:**  
**Actual Result:**  

**Logs / Evidence:** (message IDs, appointment IDs, screenshots, timestamps)  

**Immediate Mitigation (concierge/manual):**  
**Owner/Client Communication Sent?** (Y/N + copy/paste)  

**Root Cause Hypothesis:**  
**Fix Owner:**  
**Fix ETA:**  

**Verification Steps (post-fix):**
1.
2.

**Status:** New | Investigating | Mitigated | Fixed | Verified | Closed  

---

## 3) Pilot Recruitment Email (Outbound)

**Subject options:**
- “Quick pilot to cut appointment no-shows (2-way SMS confirmations)”
- “Open slot: 14-day no-show reduction pilot (concierge setup)”

**Email body:**
Hi {{FirstName}},

I’m Bob — we’re running a small set of concierge pilots for an SMS-based no-show reducer that sends smart reminders, collects two-way confirmations, and automates reschedules (plus optional waitlist fills).

If you’re appointment-based, we can usually reduce no-shows within 7–14 days by:
- Getting more patients to confirm
- Catching “can’t make it” earlier and rescheduling
- Filling last-minute gaps from a waitlist

I can set this up concierge-style for {{BusinessName}} and send you a weekly value report that estimates recovered revenue.

You can see a quick overview here (for legitimacy):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If you’re open to a 15-minute call this week, reply with:
1) Your timezone
2) Typical appointment value (rough is fine)
3) Your current no-show rate (estimate ok)

Or email me directly: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Follow-up (48–72 hours later)
Subject: “Still open to a 14-day no-show pilot?”

Hi {{FirstName}},

Just bumping this—if you’re seeing no-shows or last-minute cancels, we can run a quick 14-day pilot to prove impact with a weekly report (confirmations, reschedules, waitlist fills, and estimated recovered revenue).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Worth a 15-minute chat?

— Bob

---

## 4) Pilot Kickoff & Consent Email (Send Once They Agree)

**Subject:** “Pilot kickoff: reminders + 2-way confirmations (consent + setup)”

Hi {{FirstName}},

Excited to get your no-show reduction pilot live. Here’s what we need to start and to stay compliant:

### A) Consent / messaging policy (reply “I approve”)
Please reply “I approve” confirming:
1) You have patient consent (or an established relationship where reminders are expected) to send appointment reminders by SMS.
2) You want us to include opt-out language and honor STOP immediately.
3) You want appointment reminders and two-way confirmations enabled for the pilot period.

If you’d like alternate wording for your intake/consent forms, tell me what system you use and I’ll provide suggested language.

### B) Setup details (reply inline)
1) Location name + timezone:
2) Business hours:
3) Reminder schedule (common): 24 hours + 2 hours before (confirmations requested at 24h). OK?
4) Reschedule rules: same-day allowed? minimum notice?
5) Avg appointment value ($):
6) Escalation contact (name + phone/email) for urgent issues:

### C) What you’ll get weekly (every Monday)
- Confirmation rate
- Reschedules saved
- Waitlist fills (if enabled)
- Estimated recovered revenue
- Any incidents + fixes

Legitimacy overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
