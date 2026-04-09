# Day-1 Outbound Launch Kit (HubSpot Spec + 200-Lead CSV Template + Reply Library + KPI Sheet)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:08:20.231Z

---

Below is the complete Day-1 Launch Kit for the Appointment No-Show Reducer outbound sprint.

1) HUBSPOT (FREE) PIPELINE SPEC
Pipeline name: No-Show Reducer Outbound
Stages (in order):
1. New Lead (Unworked)
2. Attempted Contact (Email/Call 1)
3. Connected (2-way convo started)
4. Demo Booked
5. Demo Held
6. Proposal/Checkout Sent
7. Closed Won (Location Live)
8. Closed Lost
9. Nurture (Revisit)

Required custom properties (create as Contact properties):
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster (e.g., Phoenix AZ)
- Role (Owner/Manager/Front Desk/Other)
- Scheduling System (Unknown/Square/Acuity/Mindbody/Weave/Other)
- Appointment Volume / Month (number)
- No-Show Rate % (number)
- Avg Value per Visit ($) (number)
- Primary Pain (No-shows/Last-minute cancels/Empty slots/Staff time)
- Next Step Date (date)
- Last Touch (date)
- Preferred Channel (Email/Phone/Text)
- Opt-out (Yes/No)

Activity logging minimum standard:
- Every email sent: log as “Email” activity + paste subject line
- Every call: log outcome (No answer/VM/Connected)
- Every text: log content + compliance note if applicable
- Every reply: paste in notes and set Next Step Date

2) 200-LEAD CSV TEMPLATE (COPY/PASTE HEADERS)
Use exactly these columns so import is clean:
First Name,Last Name,Business Name,Website,Phone,Email,City,State,Vertical,Role,Source URL,Notes,City Cluster,Scheduling System,Appointment Volume / Month,No-Show Rate %,Avg Value per Visit ($),Preferred Channel,Opt-out

Rules:
- If contact name unknown: First Name = "Team" and Role = "Front Desk" (or "Manager" if stated)
- Dedupe by Business Name + Phone; if duplicate, keep record with email.
- If no email found, still import (phone-only leads are used for calls).
- Source URL is mandatory (Google Maps listing, directory page, or website contact page).

3) DAY-1 KPI TRACKING (DAILY)
Copy into a sheet/Notion and fill daily:
Date:
Cold emails sent:
Cold calls placed:
Texts sent:
Email replies (total):
Positive replies:
Demos booked:
Demos held:
Checkout links sent:
Closed won (locations):
Closed lost:
Top objections seen:
Notes (what to improve tomorrow):

Targets (daily minimums):
- 50–100 cold emails/day (plain text)
- 20–40 calls/day
- 5–10 meaningful social touches/week (FB groups/comments)
- 1–2 Craigslist posts/week per city cluster

4) REPLY-HANDLING LIBRARY (READY TO SEND)
Use reply-to: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL to include when relevant: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

A) Positive reply → book demo
Subject: Quick demo times
Body:
Thanks — easiest next step is a 10-minute demo. We’ll show the two-way SMS confirmation flow, instant reschedules, and waitlist fill, and estimate recovered revenue per location.

What works better this week: (1) Tue 11:30am or (2) Wed 3:00pm your time?

If you prefer to review first, here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

B) “Send info” reply
Subject: Info + 2 questions
Body:
Absolutely. Here’s the quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Two quick questions so I send the right details:
1) Roughly how many appointments do you book per week?
2) What’s the usual no-show / late-cancel rate (even a guess)?

If it’s easier, we can cover it in 10 minutes. Want me to propose 2 times?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

C) Price objection
Subject: Re: pricing
Body:
Totally fair. Most locations justify it off just a few recovered visits.

If you share (a) weekly appointment count and (b) average value per visit, I’ll give you a quick “break-even” estimate.

If it helps, we can start with a short pilot and you’ll see confirmations + reschedules + waitlist fills in week 1.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

D) “We already send reminders” objection
Subject: Re: reminders
Body:
That’s a great baseline. The difference here is two-way confirmation (Y/N), automatic reschedule links when someone can’t make it, and waitlist fill to backfill openings — plus simple analytics on recovered revenue.

Quick question: are your reminders currently one-way (just a message), or do they collect confirmations and handle reschedules?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) Not the right person
Subject: Who handles scheduling?
Body:
Thanks — who’s the best person to speak with about scheduling/no-shows? (Owner, office manager, or front desk lead?)

If you can point me to their email/number, I’ll reach out and keep it brief.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

F) Stop / Opt-out
Subject: Re: remove
Body:
Understood — I won’t reach out again. I’ve marked you as opt-out.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

5) DAY-1 EXECUTION SCHEDULE (BLOCKS)
Block 1 (AM): Build 30–50 leads + send first 25–50 emails.
Block 2 (Late AM): 10–20 calls to the same businesses emailed (higher connect rate).
Block 3 (PM): Build next 30–50 leads + send second batch of emails.
Block 4 (Late PM): 10–20 calls + callbacks + reply handling + demo booking.
End of day: update KPI tracker + set Next Step Date on every open conversation.

This kit is designed so we can create the free HubSpot account, import the first 200 leads, and start sending/calling the same day.