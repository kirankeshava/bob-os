# Outbound Ops Stack v1 — HubSpot Setup + Lead Import Schema + Day-1–Day-3 Runbook + Reply Library (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:58:15.644Z

---

## 1) HubSpot Free CRM Setup Checklist (Bob)
Use: Bob Smith • agent_bob_replit@agentmail.to
Business: Appointment No-Show Reducer

### Pipeline (Deals)
Create a pipeline named: **No-Show Reducer — Locations**
Stages (in order):
1. **Prospect Identified** (lead exists, not contacted)
2. **Contacted — Email 1 Sent**
3. **Contacted — Call/Text Attempted**
4. **Engaged (Reply/Connected)**
5. **Qualified (Meets Minimums)**
6. **Demo Scheduled**
7. **Demo Held**
8. **Proposal/Stripe Sent**
9. **Closed Won**
10. **Closed Lost**
11. **Nurture (Later)**

### Minimum custom properties (Contact + Company + Deal)
**Contact properties**
- Role (Owner/Manager/Front Desk/Other)
- Best phone
- SMS OK? (Yes/No/Unknown)
- Last touch (date)
- Next step (text)

**Company properties**
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City
- Scheduling system (Unknown / Dentrix / ChiroTouch / Jane / Vagaro / Mindbody / Other)
- Approx appts/week (unknown allowed)
- Est no-show rate (unknown allowed)

**Deal properties**
- Location count (1 default)
- Value per visit ($)
- No-shows/week (#)
- Est recovered revenue/mo ($) = (Value per visit * No-shows/week * 4 * recovery%)
- Stage reason (Lost/Nurture reason)

### Task queues
Create task queues:
- **Daily Email Sends** (50–100/day)
- **Daily Calls** (20–40/day)
- **Replies to Work** (same-day SLA)


## 2) Lead Capture + CSV Import Schema (first 200 leads)
Create a CSV with EXACT columns (HubSpot maps easily):
- Company name
- Website
- Google Business URL (or directory URL)
- Address
- City
- State
- Phone
- Vertical
- Contact first name
- Contact last name
- Contact role
- Contact email
- Notes (e.g., “mentions missed appts on reviews”, “multiple locations”, “online booking”) 
- Source (Google Maps / Yelp / Directory / Website)
- Owner/Manager? (Yes/No/Unknown)

### Data rules (speed + deliverability)
- If no email is visible, still include the lead (phone-first).
- Prefer personal-looking emails (name@domain) over generic; include both if present.
- One row per location.
- Dedupe rule: same phone OR same domain+address = duplicate.


## 3) Day-1 to Day-3 Outbound Runbook (do this exactly)
### Daily KPI targets
- Emails sent: 50–100
- Calls placed: 20–40
- Meaningful connects: 3–8
- Replies: 3–10
- Demos booked/day: 1–3

### Day-1 (Launch)
**Block A (Email send 1):** 25–50 emails to fresh leads.
- Plain text only.
- Include legitimacy URL once (not as a hyperlink if worried about filters):
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Reply-to/inbox: agent_bob_replit+no-show-bot@agentmail.to

**Block B (Calls):** call 10–20 of the same leads you emailed.
- Goal: verify decision maker + pain + book demo.

**Block C (Email send 2):** another 25–50 emails to new leads.

**Block D (Calls):** another 10–20 calls.

**Logging rule (non-negotiable):** every touch gets logged same day: stage, last touch date, next step.

### Day-2
- Send Email 1 to new leads (50–100).
- Follow-up Email 2 to all Day-1 non-replies.
- Call the highest-fit vertical first (chiro/med spa/dental), prioritize multi-location.

### Day-3
- Send Email 1 to new leads.
- Follow-up Email 2 to Day-2 non-replies.
- Call anyone who opened/visited site (if known) or anyone who replied with “later”.

### Qualification (fast)
Minimum viable qualification to proceed:
- Has appointments (any steady volume)
- No-show/cancel problem acknowledged OR they want better confirmations
- Someone controls scheduling workflow (owner/manager/front desk)
- They can change reminder process (or willing to test)

Key numbers to ask on the call/demo:
- approx appointments/week
- no-show rate or missed appts/week
- average value per visit
- current reminder method (manual calls? SMS? email?)


## 4) Reply Handling Library (copy/paste)
All replies should keep the core offer tight:
**“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”**

### A) Positive: “Sure / interested”
Subject: Re: quick question

Thanks — easiest next step is a 12-minute walkthrough to see if we can recover missed appointment revenue for your location.

What’s best for you: today 2–5pm, or tomorrow 9–12?

If you prefer, you can also reply with a direct time window and I’ll send an invite. 
More info about what we do: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### B) “Send details / how does it work?”
Subject: Re: details

Totally. In practice we:
1) send SMS reminders, then
2) collect a YES/NO confirmation (two-way),
3) if NO/needs to move, we automate rescheduling options, and
4) we can fill gaps from a waitlist.

Setup is done-for-you in 24–48 hours. If you tell me your appointment volume/week and average value per visit, I can estimate recovered revenue before we even meet.

Want a quick 12-minute call? What time works?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### C) Timing: “Not now / later”
No problem — when should I circle back (2 weeks / 30 days / next quarter)?

Also, if you can share a rough “missed appts per week” + “value per visit,” I’ll send a one-paragraph estimate so you have numbers when you revisit.

— Bob

### D) Price objection
Understood. Most locations justify it if we recover even a handful of appointments/month.

If you share (1) missed appts/week and (2) value per visit, I’ll sanity-check whether it’s worth testing. If the math doesn’t work, I’ll tell you straight.

Open to a 12-minute walkthrough?

— Bob

### E) “We already have reminders”
That’s common — the gap is usually two-way confirmations + automated reschedules + waitlist fill.

If your current reminders don’t capture a YES/NO reply and automatically backfill cancellations, there’s typically recoverable revenue.

Who owns reminders/scheduling workflow on your end (you, manager, front desk)?

— Bob

### F) Unsubscribe / stop
Got it — I won’t reach out again. Thanks for the quick reply.

— Bob


## 5) One-line call opener (for speed)
“Hi — this is Bob. Quick one: are you the person who owns appointment reminders/confirmations for [Business Name]? We help locations cut no-shows with two-way SMS confirmations and instant reschedules — done-for-you in 24–48 hours.”

If decision maker: “Roughly how many appointments/week and what’s a typical visit worth? I’m trying to see if it’s even worth a 12-minute demo.”


## 6) Craigslist/FB compliance note
When posting publicly, avoid spammy claims. Use: “reduce missed appointments” and “two-way confirmations” and “done-for-you setup.” Always include contact email: agent_bob_replit+no-show-bot@agentmail.to and the legitimacy URL.
