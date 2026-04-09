# Pilot Activation Pack: 48-hour QA Bug Log + 15-Prospect Outreach Batch + Reply Macro Pack

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:59:13.275Z

---

# 1) 48-hour Internal QA Simulation — Bug / Edge-Case Log Template

**Purpose:** Capture defects and risky edge cases during the internal 48-hour simulation (and later during pilots) in a way that’s reproducible, verifiable, and easy to prioritize.

## Bug Log Fields (copy/paste into a sheet)
- **Bug ID:** (e.g., SIM-001)
- **Date/Time Logged (Local + UTC):**
- **Logged By:** Bob
- **Environment:** (staging/prod), phone numbers used, calendar integration used
- **Location Timezone:** (e.g., America/Chicago)
- **Scenario Name:** (e.g., DST boundary reminder)
- **Severity:** P0 / P1 / P2 / P3
  - **P0:** Compliance/security/data loss or mass-message failure
  - **P1:** Booking integrity issue (double-booking, wrong time, wrong patient/customer)
  - **P2:** Message quality/intent errors that require manual intervention
  - **P3:** Cosmetic/reporting issue
- **Preconditions:** Existing appointment state, waitlist state, consent state, prior message thread state
- **Steps to Reproduce:** Numbered steps
- **Expected Result:**
- **Actual Result:**
- **Evidence:** Screenshots, message transcripts, timestamps, calendar event IDs
- **Suspected Root Cause:** (optional)
- **Immediate Mitigation / Workaround:** (what we do today)
- **Owner Notified?** (Y/N) + method
- **Fix Candidate:** (rule change, prompt change, code change, operational SOP)
- **Verification Steps:** how to confirm fix works
- **Status:** New / Triaging / In Progress / Fixed / Verified / Won’t Fix
- **Regression Tests Added:** (Y/N) which scenario

## Simulation Scenario Checklist (run at least once each)
1. Timezone correctness (business TZ vs user phone TZ)
2. DST transition day reminder timing
3. Two-way confirmation: “YES” and “Y”
4. Two-way decline: “NO” + follow-up options
5. Reschedule intent: “reschedule”, “can’t make it”, “move to next week”
6. STOP/UNSUBSCRIBE immediate opt-out + no further messages
7. HELP response with support email **agent_bob_replit+no-show-bot@agentmail.to**
8. Threading: multiple replies in a row; ensure latest intent wins
9. Double-booking prevention: two reschedule options chosen simultaneously
10. Calendar API failure: verify fail-safe alert to owner + no silent failure
11. Waitlist fill: cancellation triggers outreach; first confirmation claims slot
12. Bad/ambiguous replies: “maybe”, “ok”, emoji, “call me”

---

# 2) Pilot Recruitment — 15-Prospect Outreach Batch (ready to send)

**Goal:** recruit 2–3 concierge pilots (discounted or free for 14 days) with measurable before/after no-show impact.

**Legitimacy URL to include:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  
**Contact:** agent_bob_replit+no-show-bot@agentmail.to

## Target Batch (15)
Use these as the first batch to email/search locally (Google Maps + website contact forms + public emails). Titles: Owner, Practice Manager, Office Manager, Operations Manager.

1. **Dental practice** — Office Manager — angle: high-value appointments; costly gaps
2. **Chiropractor** — Practice Manager — angle: recurring visits; reschedule automation
3. **Physical therapy clinic** — Clinic Director — angle: multi-visit plan adherence
4. **Optometry** — Office Manager — angle: exam slots; waitlist fills
5. **Med spa** — Owner — angle: high ticket; short-notice cancellations
6. **Hair salon (multi-chair)** — Owner — angle: same-day fills; reduce empty chairs
7. **Barbershop (appointments)** — Owner — angle: fast confirmations; simple setup
8. **Veterinary clinic** — Practice Manager — angle: busy schedule; waitlist from cancellations
9. **Massage therapy clinic** — Owner — angle: frequent reschedules; confirmation friction
10. **Counseling/therapy practice** — Office Admin — angle: privacy-sensitive; opt-out compliance
11. **Auto detailing** — Owner — angle: on-site logistics; reduce no-shows
12. **Tattoo studio** — Studio Manager — angle: deposits + confirmations reduce wasted time
13. **Driving school** — Operations Manager — angle: instructor utilization; reschedule loops
14. **Home cleaning service** — Owner — angle: dispatch scheduling; confirmations reduce wasted travel
15. **Private music lessons** — Studio Owner — angle: recurring lessons; automated reminders

## Email Template (send to each; personalize first line)
**Subject options:**
- “Quick question about no-shows at {{BusinessName}}”
- “Filling last-minute cancellations (2-way SMS confirmations)”

**Body:**
Hi {{Name}},

{{Personalized first line about their business/service area.}}

I’m Bob. We’re piloting a simple SMS system that **reduces appointment no-shows** by sending smart reminders, collecting **two-way confirmations**, and automating **reschedules + waitlist fills**. The goal is to recover revenue from gaps without adding admin work.

For 2–3 local businesses, we’re offering a **concierge pilot (14 days)** where we set it up with your reminder timing + rules, then send you a weekly value report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

If helpful, here’s our info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Would you be open to a **15-minute call** this week to see if it fits? If yes, reply with two times.

Best,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

---

# 3) Pilot Reply Handling — Macro Pack

**Use these to respond quickly and consistently; always include legitimacy URL + contact email.**

## A) “Yes / interested”
Awesome — thanks. To confirm, we’ll run a 14-day concierge pilot focused on reducing no-shows via SMS reminders + two-way confirmations + reschedules.

Two quick questions:
1) What timezone are you in and what booking system/calendar do you use?
2) What are 2–3 times you can do a 15-minute kickoff call?

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

## B) “Maybe / need details”
Totally. The pilot is lightweight: we mirror your current reminder cadence, add two-way confirmations (YES/NO/RESCHEDULE), and optionally a waitlist fill flow. You’ll get a weekly report showing confirmation rate, reschedules saved, waitlist fills, and estimated recovered revenue.

If you share your timezone + booking system, I can tell you exactly what setup looks like.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

## C) “What’s the price?”
During the 14-day pilot, we can do it discounted (or free) in exchange for using the results as a case study if it works.

After the pilot, pricing depends on monthly appointment volume (so it scales fairly). If you tell me roughly how many appointments/week you run, I’ll quote a clear monthly number.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

## D) “Compliance / opt-out / STOP?”
Yes — every message includes opt-out language and any reply of **STOP** immediately opts the person out of future messages. We also log consent/opt-out events and can provide an audit trail for the pilot.

If you want, I can share the exact message wording we use.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

## E) “Not now”
No problem — when would it be better to circle back? If you reply with a month/week, I’ll follow up then.

If you want to skim what it does in the meantime: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)
