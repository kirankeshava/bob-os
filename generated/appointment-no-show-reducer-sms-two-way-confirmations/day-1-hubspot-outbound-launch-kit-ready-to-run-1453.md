# Day-1 HubSpot + Outbound Launch Kit (Ready-to-Run)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:37:34.844Z

---

Below is the exact Day-1 setup + execution kit to run outbound with HubSpot Free for the Appointment No-Show Reducer offer.

1) HubSpot PIPELINE (create exactly these stages)
- New Lead (no touch yet)
- Contacted (email/call/SMS sent)
- Engaged (replied / picked up / asked questions)
- Demo Booked (meeting scheduled)
- Demo Held (completed demo)
- Proposal/Checkout Sent (Stripe link or checkout sent)
- Won (paid location)
- Lost (explicit no)
- Nurture (timing not now; follow-up date set)

2) REQUIRED FIELDS (as HubSpot properties or tracked in notes)
- Vertical (Dental / Chiro / Med Spa / PT / Optometry)
- City Cluster
- Location Count (1 / 2–5 / 6+)
- Appointment Volume (est. per week)
- No-show rate (est.)
- Value per visit ($)
- Scheduling system (e.g., Dentrix, Jane, Mindbody, NexHealth, etc.)
- Primary contact role (Owner / Office Manager / Practice Manager)
- Last touch date
- Next step date/time

3) CSV TEMPLATE (copy these column headers)
Company,Website,Phone,Contact First Name,Contact Last Name,Contact Title,Contact Email,City,State,Vertical,Notes,Lead Source,Owner
Rules: keep one row per location. If no contact name, use “Office” in first name and leave last name blank. Put any evidence of appointments/no-shows in Notes (e.g., “online booking”, “late cancellation policy”).

4) DAY-1 ACTIVITY TARGETS
- Emails: 80–100 total (plain text, low-link, 1:1 tone)
- Calls: 20–40 total (aim 2 call blocks of 10–20)
- Texts: only to businesses/contacts where compliant and where number is clearly business line; keep to short confirmation request + opt-out line
- Craigslist: 1 post per city cluster (Services > Small Biz Ads or appropriate category)

5) EMAIL (version to paste)
Subject: quick question about reducing no-shows at {{business}}

Hi {{first}},

Do you handle scheduling at {{business}}?

We help appointment-based locations reduce no-shows using two-way SMS confirmations + instant reschedules, and we can fill last-minute gaps from a waitlist. Done-for-you setup in 24–48 hours.

If helpful, here’s our info/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 10-minute look this week?

—Bob
agent_bob_replit+no-show-bot@agentmail.to

6) POSITIVE REPLY HANDLING (book demo)
Awesome — what’s the best email + number for the person who owns scheduling? 

If it’s you, here’s the fastest way: grab a 10-min slot here: {{MEETINGS_LINK}}.

On the call I’ll ask: appts/week, no-show %, value/visit, and your scheduling system. Then I can estimate recovered revenue per month.

7) CALL OPENER (20–30 seconds)
“Hi—this is Bob. Quick one: do you handle scheduling and appointment confirmations? 
We reduce no-shows with two-way SMS confirmations and instant reschedules, plus waitlist fill when someone cancels. It’s done-for-you in 24–48 hours. 
Who’s the best person to speak with about that?”

8) VOICEMAIL
“Hi, it’s Bob. I’m calling because we help reduce appointment no-shows with two-way SMS confirmations and instant reschedules. If you handle scheduling, call me back at {{number}} or email agent_bob_replit+no-show-bot@agentmail.to. Our site is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

9) KPI LOGGING (end of day)
- New leads added:
- Emails sent:
- Calls placed:
- Conversations:
- Replies:
- Demos booked:
- Demos held:
- Checkout links sent:
- Wins:
- Losses + reason:
- Biggest objection(s) today:

If you run the above daily, you’ll have clean throughput: leads → touches → demos → closes, with every outcome captured in HubSpot stages and next-step dates.