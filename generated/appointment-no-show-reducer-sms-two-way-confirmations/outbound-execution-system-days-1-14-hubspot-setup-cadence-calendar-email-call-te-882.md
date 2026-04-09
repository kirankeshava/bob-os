# Outbound Execution System (Days 1–14): HubSpot Setup + Cadence Calendar + Email/Call/Text Pack (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:15:05.615Z

---

Business / legitimacy link (include in replies and when asked): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Business inbox: agent_bob_replit+no-show-bot@agentmail.to

A) HUBSPOT FREE CRM SETUP (copy/paste spec)
1) Pipeline name: No-Show Reducer – Outbound
Stages (left to right):
- New Lead (not touched)
- Attempted Contact (emailed/called once)
- Connected (2-way conversation started)
- Qualified (meets basic fit)
- Demo Booked
- Demo Held
- Proposal / Stripe Link Sent
- Closed Won
- Closed Lost
- Nurture (not now)

2) Required properties (create as custom fields where needed)
Company/Location fields:
- Location Count (number)
- Vertical (dropdown: Dental, Chiro, Med Spa, PT, Optometry, Other)
- City Cluster (text)
- Scheduling System (text)
- Appointment Volume / Month (number)
- No-Show Rate % (number)
- Avg Value per Visit ($) (number)
- Decision Maker Role (dropdown: Owner, GM, Office Manager, Ops, Other)

Sales execution fields:
- Lead Source (dropdown: Google Maps, Yelp, Directory, Referral, FB Group, Craigslist)
- Last Touch Type (dropdown: Email, Call, SMS, VM, FB, CL)
- Last Touch Date (date)
- Next Step (text)
- Next Step Date (date)
- Objection Tag (dropdown: Price, Timing, Already have reminders, Not decision maker, Compliance, Other)

3) Task queues
- Daily Email Send Queue (50–100)
- Daily Call Queue (20–40)
- Follow-up Queue (day 2/4/7)
- Demo Prep Queue (day before demo)

B) 14-DAY EXECUTION CALENDAR (minimum viable to hit 40 demos / 30 days)
Daily baseline (Mon–Fri):
- 50–100 cold emails/day (plain text)
- 20–40 calls/day (or call attempts)
- Log every touch in HubSpot; create a “Next Step Date” for every non-negative outcome

Weekly add-ons:
- Craigslist: 1–2 posts/week per city cluster (rotate categories if needed)
- FB Groups: 5–10 value comments/posts/week (no hard pitch; soft CTA to inbox)

Day-by-day cadence (per lead):
- Day 1: Email #1 + same-day call attempt
- Day 2: Call attempt + short “bump” email if no response
- Day 4: Email #2 (proof + outcome math) + call attempt
- Day 7: Email #3 (case-style narrative + ask) + call attempt
- Day 10: Email #4 (breakup / permission) 

KPI targets (Days 1–14):
- Emails sent: 700–1,000
- Call attempts: 280–560
- Reply rate goal: 3–8%
- Demo booked goal: 12–20 (front-load to de-risk month)

C) READY-TO-SEND EMAIL SEQUENCE (plain text)
Use signature:
Bob Smith
Appointment No-Show Reducer (Two-way SMS confirmations + reschedules + waitlist fill)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Subject options (rotate):
1) quick question about no-shows at {{Business}}
2) reduce no-shows (two-way SMS)
3) {{City}} appointments — confirmations + reschedules
4) filling last-minute cancellations
5) 24–48h done-for-you setup
6) are you the right person for scheduling?

Email #1 (Day 1)
Hi {{FirstName}} — I’m Bob.

We help appointment-based locations reduce no-shows with two-way SMS confirmations (Y/N), instant reschedule links, and a waitlist fill so canceled slots get rebooked.

If you’re open to it, I can set this up done-for-you in 24–48 hours.

Who handles scheduling + reminders at {{Business}}?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email #1b bump (Day 2, only if no reply)
Hi {{FirstName}} — looping this once. Should I speak with you or someone else about appointment confirmations + reschedules?

– Bob

Email #2 (Day 4) — quick math
Hi {{FirstName}} — quick math check:

If you do ~{{ApptsPerMonth}} appts/month and even 5% no-show, that’s {{ApptsPerMonth*0.05}} missed visits. If your avg visit is ~$ {{AvgValue}}, recovering even a portion can be meaningful.

Our flow is simple: reminder → “Reply 1 to confirm / 2 to reschedule” → reschedule link → waitlist offer to backfill.

Worth a 10-minute look? If yes, what’s the best email/number to send a couple times.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email #3 (Day 7) — process + proof style
Hi {{FirstName}} — most reminder systems still leave a gap: patients ignore the reminder, or they cancel late and the slot stays empty.

We focus on two levers:
1) Two-way confirmations so you know who’s real
2) Fast reschedule + waitlist fill to recover the slot

If you tell me what you use for scheduling (e.g., Dentrix, Jane, Mindbody, etc.), I’ll tell you the simplest way to plug in.

Open to a quick demo?

– Bob

Email #4 (Day 10) — breakup
Hi {{FirstName}} — should I close the loop here, or is reducing no-shows something you want to revisit later?

If later, I can send a 1-page overview and you can reach me at agent_bob_replit+no-show-bot@agentmail.to.

– Bob

D) COLD CALL OPENER + VOICEMAIL
Call opener:
“Hi, is this {{FirstName}}? Hey {{FirstName}}, Bob here. Quick one — I’m reaching out because we help appointment-based locations reduce no-shows using two-way SMS confirmations plus instant reschedules and a waitlist fill. 

Who handles scheduling/reminders there — you, or an office manager?”

If decision maker:
“Got it. Do you have a rough sense of (1) appointments per week and (2) your no-show or late cancel rate?”

Voicemail (20 sec):
“Hi {{FirstName}}, Bob calling. We help reduce no-shows with two-way SMS confirmations and quick reschedules, plus a waitlist to fill last-minute gaps. If you handle scheduling, call me back or just email agent_bob_replit+no-show-bot@agentmail.to. Website is in my follow-up email. Thanks.”

E) COMPLIANT TEXT FOLLOW-UP (only where allowed / after contact / existing business line)
“Hi {{FirstName}} — Bob here. I emailed about reducing no-shows with two-way SMS confirmations + reschedules + waitlist fill. Want me to send a 1-min overview link? Reply YES and I’ll send it. (Reply STOP to opt out)”

F) REPLY SNIPPETS (paste into email responses)
Positive:
“Perfect — happy to show you. What’s the best day/time for a 10–15 min demo this week? If easier, reply with 2 times that work and I’ll send an invite. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

Not decision maker:
“Thanks — who’s the right person for scheduling/reminders? If you can intro me, I’ll keep it brief (10 min).”

Price ask:
“Depends on location count + appointment volume. Most locations justify it with 1–3 recovered visits/month. If you share rough monthly appointments and avg value/visit, I’ll ballpark it before a demo.”

Already have reminders:
“Totally — most do. The difference is two-way confirmations + automated reschedules + waitlist fill so canceled slots get rebooked. If you’re open, I can show it in 10 min.”

Stop:
“Understood — I won’t reach out again. Thanks for the reply.”

G) WHAT TO LOG (minimum viable)
For every lead touched, update:
- Stage
- Last Touch Type + Date
- Outcome note (1 sentence)
- Next Step Date (even if it’s ‘nurture in 60 days’)

This document is ready to execute immediately: create HubSpot → import leads → start Day-1 sends/calls using the above copy and cadence while tracking KPIs daily.