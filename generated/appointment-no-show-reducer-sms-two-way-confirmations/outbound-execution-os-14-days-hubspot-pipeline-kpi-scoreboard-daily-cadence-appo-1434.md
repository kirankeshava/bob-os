# Outbound Execution OS (14 Days): HubSpot Pipeline + KPI Scoreboard + Daily Cadence (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:25:30.959Z

---

Business offer (for all outbound context)
We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours. Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  | Contact: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM: pipeline spec (create exactly)
Pipeline name: No-Show Reducer – Locations
Object: Deals (1 deal = 1 location)

Stages (with exit criteria)
1) New Lead (Unworked)
- Entered via import/manual add.
- Exit when first outbound touch is sent.

2) Touched (Attempting Contact)
- At least 1 email OR 1 call attempt logged.
- Exit when reply received OR demo booked OR disqualified.

3) Engaged (Two-way Conversation)
- Any reply, call connect, or text conversation.
- Exit when demo booked OR explicit “not interested” OR disqualified.

4) Demo Booked
- Meeting scheduled on calendar.
- Exit when demo held or no-show/cancel.

5) Demo Held
- Requirements confirmed (volume, no-show rate, value/visit, scheduling owner).
- Exit when payment link sent OR closed-lost.

6) Payment Link Sent
- Stripe link delivered by email + on call.
- Exit when paid (closed-won) OR stalled >7 days (nurture/closed-lost).

7) Closed Won (Active – Setup)
- Payment received.
- Create onboarding task set (below).

8) Closed Lost
- Reason required.

9) Nurture (Later)
- Not now / timing / contract locked.
- Next follow-up date required.

Required deal properties (create custom fields where needed)
- Vertical (dentist/chiro/med spa/PT/optometry/other)
- City / State
- Location count (1, 2–5, 6–20, 21+)
- Scheduling system (unknown / Dentrix / ChiroTouch / Mindbody / Square / Jane / Calendly / other)
- Monthly appointment volume (estimate)
- No-show rate (estimate)
- Avg value per visit ($)
- Est. monthly revenue recovered ($) [calc manually during demo]
- Decision maker role (owner/office manager/practice manager)
- Primary channel used (email/call/text/FB/Craigslist)
- Last touch date
- Next step (short text)
- Next step date
- Close lost reason (price/no need/timing/no response/other)

Tasks/Queues (create saved views)
1) Daily Send List: Stage = New Lead; Next step date = today
2) Call Block: Stage in (Touched, Engaged); Next step date = today
3) Demo Follow-up: Stage in (Demo Booked, Demo Held, Payment Link Sent); Next step date = today
4) Nurture Today: Stage = Nurture; Next step date = today

B) KPI Scoreboard (daily logging)
Create a simple daily log (Sheet/Notion). Columns:
- Date
- Leads added
- Cold emails sent
- Email replies (total)
- Positive replies
- Unsubscribe/stop
- Calls placed
- Connects
- Demos booked
- Demos held
- Payment links sent
- New customers (closed-won)
- Est. MRR/Revenue booked ($)
- Notes (what changed / what worked)

Targets (minimum viable)
- Emails/day: 50–100
- Calls/day: 20–40
- Replies/day: 3–10 (initially varies)
- Demos booked/week: 8–12
- Demos held/week: 6–10
- Closes/week: 4–7

C) 14-day outbound cadence (day-by-day)
Assumption: 5 workdays/week. Repeat blocks if starting later.

Every outreach touch should reference:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

Day 1 (Mon)
- Import 100 new leads into HubSpot (or as many as ready)
- Send 50–80 cold emails (Variant A/B)
- Calls: 20 (focus: highest-volume clinics)
- FB: 1 value comment on 2 relevant posts (no pitch)
- KPI log end of day

Day 2 (Tue)
- Add 50–100 new leads
- Send 50–100 cold emails (new leads)
- Follow-up #1 to Day-1 non-responders (short bump)
- Calls: 20–40 + leave 6–10 voicemails
- KPI log

Day 3 (Wed)
- Add 50 new leads
- Send 50–80 cold emails
- Reply handling: push for 15-min demo (offer 2 time slots)
- Craigslist: Post 1 ad in City Cluster A
- Calls: 20
- KPI log

Day 4 (Thu)
- Add 50 new leads
- Send 50–80 cold emails
- Follow-up #2 to Day-1 list ("close the loop")
- Calls: 20–40 (prioritize Engaged)
- FB: 1 post (value: "no-show % benchmarking + quick fixes") in 1 group
- KPI log

Day 5 (Fri)
- Demo-heavy day: confirm next week demos via email
- Send 50 cold emails (lighter if demo load)
- Calls: 20 (DMs only)
- Craigslist: Post 1 ad in City Cluster B
- KPI log + weekly review: what subject line/vertical performed best

Day 6 (Mon)
- Add 100 leads (new cluster or same)
- Send 80–100 cold emails
- Calls: 30
- FB: 3 comments (answer scheduling/no-show questions)
- KPI log

Day 7 (Tue)
- Follow-up #1 to Day-6 list
- Send 50–80 cold emails (new)
- Calls: 20–40
- Demo reminders for tomorrow demos
- KPI log

Day 8 (Wed)
- Demos + closes focus
- Send 50 cold emails
- Calls: 20 (Payment Link Sent + Demo Held follow-up)
- Craigslist: refresh/repost best-performing ad in Cluster A
- KPI log

Day 9 (Thu)
- Send 80–100 cold emails
- Follow-up #2 to Day-6 list
- Calls: 30
- FB: 1 value post ("2-way confirmations script" + checklist)
- KPI log

Day 10 (Fri)
- Send 50 cold emails
- Calls: 20
- Push closes: send Stripe link to all qualified Demo Held not paid
- KPI log + weekly review

Day 11 (Mon)
- Add 100 leads (expand verticals if needed)
- Send 80–100 cold emails
- Calls: 30
- KPI log

Day 12 (Tue)
- Follow-up #1 to Day-11 list
- Send 50–80 new cold emails
- Calls: 20–40
- KPI log

Day 13 (Wed)
- Craigslist: post in Cluster B (new headline)
- Send 50–80 cold emails
- Calls: 30
- KPI log

Day 14 (Thu)
- Follow-up #2 to Day-11 list
- Send 50–80 cold emails
- Calls: 20–40
- FB: 3–5 comments (answering questions; soft CTA only if asked)
- KPI log + decide next 2 city clusters based on reply rate

D) Qualification checklist (use on demo; log into deal notes)
- Monthly appointment volume?
- Current no-show % (or “how many missed appts last week”) 
- Avg value per visit?
- How do you confirm now (manual calls/texts/none)?
- What scheduling tool?
- Who can approve spending?
- If we recovered even X appointments/month, would that be worth $Y/month?

E) Close process (standard)
1) At demo end: confirm target metric + timeline ("we can set this up in 24–48 hours")
2) Send Stripe link immediately (same thread) + onboarding checklist
3) Book onboarding call while still live
4) Ask permission for anonymized metrics/testimonial after 14 days

This document is designed so we can run outbound every day with consistent volume, consistent logging, and clear stage movement inside HubSpot Free. The next operational step is to create the HubSpot account, import the first 200 leads, generate a meeting link, and start Day-1 sends/calls.
