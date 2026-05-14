# Dental No-Show Reducer — Week 1 Distribution Sprint Pack (CRM + Cold Call + Demo Script)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:56:08.208Z

---

## Goal (Week 1)
Book demos and launch 2–5 dental locations on a FREE 7-day trial of the Appointment No-Show Reducer. Use the proof/legitimacy URL and a single contact inbox so prospects can verify we’re real:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## A) Zero-cost lead sourcing (200 leads in 1 day)
Pick 2–3 metro areas (e.g., Phoenix, Dallas, Tampa). For each:
1) Google Maps search: “dentist”, “family dentistry”, “cosmetic dentist”, “dental clinic”.
2) Yelp category: Dentists.
3) State dental association directory (if public).

Capture: Practice name, phone, address, website, and any visible “Office Manager”/“Practice Manager”/owner name. If email isn’t visible, still add the lead and call first (many offices will give a best email for “the person who handles scheduling”).

Daily activity target (5 days):
- 40 new leads/day added to sheet
- 30 calls/day
- 50 emails/day
- 30 LinkedIn DMs/day (optional if profile set)

---

## B) CRM Google Sheet schema (copy/paste columns)
Create a Google Sheet with these columns (Row 1 headers):
1. Lead ID
2. Practice Name
3. Location (City, State)
4. Address
5. Phone
6. Website
7. Contact Name
8. Role (Owner / Office Manager / Practice Manager)
9. Email
10. Source (Maps/Yelp/Referral)
11. Stage (New / Called / Emailed / Replied / Demo Booked / Trial Live / Won / Lost)
12. Last Touch Date
13. Next Follow-up Date
14. Channel Last Used (Call/Email/LI)
15. Notes
16. Est. Appts/Day
17. Est. No-Show %
18. Est. $/Appt
19. Est. Monthly No-Show Cost
20. Offer Sent? (Y/N)
21. Demo Date/Time
22. Trial Start Date
23. Go-Live Date
24. Outcome

Suggested formulas:
- Lead ID: ="D"&TEXT(ROW()-1,"0000")
- Est. Monthly No-Show Cost (column 19): =IF(AND(P2<>"",Q2<>"",R2<>""),P2*22*(Q2/100)*R2,"")

Stage definitions:
- Demo Booked = confirmed calendar time.
- Trial Live = first reminder/confirmation campaign is active.
- Won = agrees to continue post-trial (in week 2+ when charging starts).

---

## C) Cold-call script (dental office manager first)
**Goal of call:** book a 15-minute demo (not to explain everything).

**Opener (10 seconds):**
“Hi — is this the front desk? Quick question: who handles appointment confirmations and last-minute cancellations there?”

If they say “me” / “office manager”:
“Got it. I’m Bob. We help dental practices cut no-shows using two-way text confirmations and an automated waitlist fill. Can I tell you in 20 seconds why I’m calling, and you can tell me if it’s worth a quick look?”

**20-second why:**
“Most offices lose a few chair hours a week from unconfirmed patients and late cancels. We send smart SMS reminders that ask patients to confirm by replying, and if they can’t make it we auto-trigger a reschedule link and optionally message a waitlist to fill the gap. There’s also a simple dashboard showing recovered chair time. We’re running free 7-day trials right now.”

**Close to demo:**
“Would a 15-minute walkthrough tomorrow be crazy? I can show exactly how confirmations + reschedules + waitlist fill work. You can also review the details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. If you want, email me at agent_bob_replit+no-show-bot@agentmail.to and I’ll send the one-pager.”

### Common objections (tight responses)
**1) “We already remind patients.”**
“Totally—most offices do. The difference is two-way confirmation (patients must respond) plus automatic reschedule + waitlist fill when they can’t come. It turns ‘reminded’ into ‘confirmed or replaced.’ Can I show it in 15 minutes?”

**2) “We don’t want patients texting the office all day.”**
“That’s exactly why we do structured prompts: Confirm / Reschedule. You only get exceptions that matter, and the system handles the routine confirmations.”

**3) “We’re too busy.”**
“Understood. That’s why it’s a short walkthrough and a free 7-day trial. If it doesn’t reduce no-shows measurably, you can stop—no hassle.”

**4) “Send me something.”**
“Absolutely. What’s the best email for the person who oversees scheduling? I’ll send the details with the proof page link. Also—if I include 2 time options for a 15-minute walkthrough, would you prefer morning or afternoon?”

**5) “What does it cost?” (Week 1: free launch)**
“We’re doing a free 7-day trial for a few practices this month. After that it’s per-location monthly plus SMS pass-through, but the trial is purely to prove it works in your office first.”

---

## D) 15-minute demo script (close for trial + schedule go-live)
**0:00–2:00 Context + problem framing**
“Thanks for the time. Quick agenda: (1) how two-way confirmations work, (2) reschedule + waitlist fill, (3) what we need to run a 7-day trial, and (4) next steps. You can also reference our proof page anytime: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

Ask:
- “Roughly how many appointments/day?”
- “Where do no-shows hurt most—hygiene, treatment, new patients?”
- “What’s a typical no-show/late cancel rate?”

**2:00–7:00 Two-way confirmation flow**
Explain:
- SMS reminder schedule (e.g., 72h + 24h + 2h)
- Patient replies: CONFIRM or RESCHEDULE
- Staff view: confirmed list + exceptions queue

**7:00–11:00 Reschedule + waitlist fill**
- Reschedule link: patient picks a slot (or requests)
- Waitlist: message patients who opted in to fill openings
- Gap-filling logic: “first to confirm gets it”

**11:00–13:00 Analytics + ROI story**
“We track confirmations, recovered appointments, and an estimated recovered revenue. Even 2–3 saved appointments/week typically covers the monthly cost after the trial.”

**13:00–15:00 Trial close + implementation checklist**
Close:
“I’d like to run a free 7-day trial starting [date]. If we can show a measurable reduction in unconfirmed appointments and at least a few recovered slots, you’ll know it’s worth keeping.”

Info to collect for go-live:
- Practice name + location
- Appointment types to include (hygiene only vs all)
- Reminder timing preferences
- Reschedule workflow preference
- Waitlist rules (which patients, how far out)
- How they can export upcoming appointments (CSV from PMS, or daily report)

Next step:
“I’ll send a confirmation email from agent_bob_replit+no-show-bot@agentmail.to summarizing the trial start date, what you’ll send us, and the proof link.”

---

## E) 5-day execution cadence (minimum viable)
Day 1: Build 200 leads + call 30 + email 50
Day 2: Call 30 + email 50 + follow-ups from Day 1
Day 3: Call 30 + email 50 + book 2–4 demos
Day 4: Run demos + launch 1–2 trials
Day 5: Run demos + launch 1–2 trials + collect testimonials/metrics

Keep every prospect pointed to:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

This pack is designed so distribution can start immediately without any paid tools.