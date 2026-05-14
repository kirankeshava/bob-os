# Pilot Reliability Pack v1 — 48h QA Simulation Plan + Defect Triage + Pilot Kickoff Email + Proof Metrics Schema

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:16:24.571Z

---

# Pilot Reliability Pack v1 (Appointment No-Show Reducer)

## 1) 48-hour Internal QA Simulation Plan (Synthetic Data)
**Goal:** Validate the full reminder → reply → confirmation/reschedule → calendar update → analytics loop under realistic edge cases before enabling live pilots.

### Setup (Hour 0–2)
- Choose a single test “location” profile:
  - Timezone: run in **America/New_York** first, then repeat key tests in **America/Los_Angeles**.
  - Business hours: 9am–5pm local.
  - Reminder schedule: T-24h and T-2h.
  - Reschedule policy: allow reschedule up to 2 hours prior.
  - Waitlist: 5 synthetic contacts.
- Create 30 synthetic appointments across 3 days:
  - Mix: 10 morning, 10 mid-day, 10 late afternoon.
  - Include 5 “high value” appointments (for recovered revenue calc).

### Core Test Cases (Hour 2–24)
1. **Timezone correctness:** Appointment at 10:00am local → reminder timestamps must match local time.
2. **DST boundary scenario:** Create appointment on a DST change weekend (if available) or simulate offset; ensure reminders do not shift by +/- 1 hour.
3. **Two-way confirmation threading:** Patient replies to first reminder “YES” → system marks confirmed and does not ask again.
4. **Late confirmation:** Reply arrives after second reminder but before appointment time → still confirm, no duplicate messages.
5. **Ambiguous replies:** “Yep”, “Y”, “OK”, “Sure” → treated as confirm (rule override).
6. **Negative replies:** “No”, “Can’t make it”, “Not coming” → treated as cancel/reschedule flow.
7. **Reschedule loop protection:** User reschedules twice; system should not create duplicates, and should update only the latest appointment.
8. **Double-book prevention:** Attempt to reschedule into an already occupied slot → system offers next available slot.
9. **Waitlist fill:** Cancellation occurs within 24 hours; system pings waitlist in order; first “YES” wins; stop outreach to others.
10. **Opt-out compliance:** Reply “STOP” at any point → immediate opt-out confirmation; no further messages.
11. **HELP flow:** Reply “HELP” → send support message with business contact email.

### Failure & Failsafe Tests (Hour 24–48)
12. **Calendar API failure (read):** Simulate calendar read error → system should:
   - Avoid sending incorrect availability.
   - Alert owner/admin (email) with incident details.
13. **Calendar API failure (write/update):** Simulate update failure after reschedule agreed → system should:
   - Tell client “We’re confirming this now; if you don’t get a confirmation shortly, we’ll contact you.”
   - Alert owner/admin immediately.
14. **SMS delivery failure:** Simulate undelivered message → retry policy (if any) and owner alert threshold.
15. **Rate limiting / burst:** 20 reminders scheduled same minute → verify queueing and no dropped sends.

### Pass/Fail Output
- **Pass:** No P0 issues; opt-out always honored; no duplicate appointments created; timezone correct; owner alerts fire on failures.
- **Fail:** Any of: sending after STOP, double-book created, reminder time wrong, missing owner alert on calendar failure.

---

## 2) Defect / Bug Triage List (Pilot Blocking Priority)
**Logging format:** ID, Priority, Title, Steps to Reproduce, Expected, Actual, Impact, Owner, Status, Verified In Build.

### P0 (Blocker — cannot run pilots)
- **P0-1: STOP not immediately honored**
  - Repro: User replies STOP after any reminder.
  - Expected: Immediate opt-out confirmation; zero subsequent messages.
  - Impact: Compliance risk.
- **P0-2: Double booking created during reschedule**
  - Repro: Reschedule into occupied slot.
  - Expected: Reject slot; offer alternatives.
  - Impact: Operational chaos, lost trust.
- **P0-3: Calendar update failure not alerted to owner**
  - Repro: Force calendar write failure.
  - Expected: Owner receives alert email with appointment + patient + error.
  - Impact: Silent failures; missed appointments.

### P1 (High — pilots can run but damages outcomes)
- **P1-1: Timezone shift / DST error**
  - Expected: Reminders align with local appointment time.
  - Impact: Confusion, increased no-shows.
- **P1-2: Message threading confusion** (system re-asks after YES)
  - Expected: Once confirmed, stop reminders or send only “See you soon” (config).
  - Impact: Annoyance, opt-outs.

### P2 (Medium — polish)
- **P2-1: Weak intent parsing for common slang** (“yep”, “k”, “sounds good”)
- **P2-2: Analytics mismatch** (confirmed count differs from message logs)

Verification checklist for any fix:
- Re-run the exact repro steps.
- Confirm analytics counters update correctly.
- Confirm no regression on STOP/HELP.

---

## 3) Pilot Kickoff + Consent & Expectations Email (Send after “Yes”)
**To:** Pilot owner/manager
**From:** agent_bob_replit+no-show-bot@agentmail.to
**Subject:** Pilot kickoff — 7-day No-Show Reducer (two-way SMS confirmations)

Hi [Name],

Thanks — we’re set to start your **7-day pilot** for Appointment No-Show Reducer.

Legitimacy / overview page (feel free to share internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### What we’ll do during the pilot
- Send **smart SMS reminders** before appointments
- Collect **two-way confirmations** (YES/NO)
- Offer **reschedule options** when someone can’t make it
- If enabled, attempt to **fill last-minute openings** from a waitlist
- Produce a **weekly value report** showing confirmations, reschedules, and estimated recovered revenue

### What we need from you (reply with answers)
1) Business name + location
2) Timezone + business hours
3) Appointment types + average appointment value (or best estimate)
4) Reminder timing preferences (ex: 24h + 2h)
5) Reschedule rules (how late is allowed?)
6) Waitlist: do you have one? If yes, how many contacts should we start with?
7) Owner/manager escalation contact (email + phone) if something fails

### Consent / opt-out
We only text clients who have provided a number for appointment communication. Every message includes opt-out instructions and **STOP** is honored immediately.

If you have any questions during the pilot, reply here or email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

---

## 4) Weekly Proof Pack Metrics Schema (Baseline vs Pilot)
Use these fields for each pilot location so results are comparable and sales-proof is clean.

### Baseline (Pre-pilot, ideally last 4 weeks)
- Location name
- Timezone
- Avg weekly appointments
- Baseline no-show rate (%)
- Baseline cancellation rate (%)
- Avg appointment value ($)
- Baseline weekly revenue estimate = Avg weekly appointments × (1 − no-show rate) × Avg value

### Pilot (Week 1)
- Total reminders sent
- Confirmations received (count)
- Confirmation rate = Confirmations / reminders
- Reschedule requests (count)
- Successful reschedules (count)
- Waitlist offers sent (count)
- Waitlist fills (count)
- Opt-outs (count)
- Estimated no-shows avoided (conservative) = min(Confirmations − baseline expected confirmations delta, Successful reschedules + Waitlist fills)
  - If baseline confirmation rate unknown, use: no-shows avoided ≈ Successful reschedules + Waitlist fills + (Confirmations × 0.15) (default conservative factor; can be tuned per niche)
- Estimated recovered revenue = (no-shows avoided + waitlist fills) × Avg appointment value

### Output snippets for the client report
- “You confirmed **X** appointments via SMS this week.”
- “We rescheduled **Y** at-risk appointments instead of losing them.”
- “We filled **Z** last-minute openings from the waitlist.”
- “Estimated recovered revenue: **$R** (conservative estimate).”
