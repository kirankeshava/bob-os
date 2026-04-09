# Outbound Lead Sourcing Engine (Dental/Ortho) — SOP + CRM + Cold Email + Craigslist/FB + Upwork Templates

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:58:40.615Z

---

BUSINESS / LEGITIMACY REFERENCES (use in all outreach)
- Website (proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to
- Offer: Appointment No-Show Reducer (SMS reminders + two-way confirmations + reschedules + waitlist fill + analytics)

GOAL + DAILY MATH (to close 20–25 locations / 30 days)
- Target vertical: independent dental + orthodontic practices (1–5 locations).
- Assumptions (conservative outbound): 40% open, 4–8% reply, 1–2% booked, 20–35% close from booked.
- Daily activity target (Mon–Fri):
  1) Add 40–60 new leads/day to CRM (phone + website minimum).
  2) Send 40–80 cold emails/day (warmup-safe), plus 10–20 calls/texts to warm replies.
  3) Post 1 Craigslist ad/day per metro (rotate copy) + 1–2 FB group posts/day (value-led).
  4) Upwork: 3 proposals/day to relevant posts.

LEAD LIST SCHEMA (CSV/Google Sheets columns)
Required columns:
1. Lead ID (auto)
2. Business Name
3. Practice Type (Dental / Ortho)
4. # Locations (1 / 2–5 / 6+)
5. City
6. State/Province
7. Country
8. Address
9. Main Phone
10. Website URL
11. Booking Method (Phone only / Web form / Online booking)
12. Evidence of scheduling tool (e.g., “NexHealth”, “Solutionreach”, “Doctible”, “Weave”, “Squarespace Scheduling”, “Zocdoc”) — if visible
13. Decision Maker Name (Owner/Doctor/Practice Manager)
14. Decision Maker Title
15. Best Email (practice manager/front desk or owner)
16. Email Source (Contact page / Staff page / Directory / Guess)
17. Secondary Email
18. Notes (hours, multiple providers, special offers, pain points)
19. Outreach Stage (dropdown)
20. Last Touch Date
21. Next Touch Date
22. Channel (Email / Phone / SMS / Upwork / Craigslist / FB)
23. Outcome (Interested / Not now / Wrong contact / No response)
24. Estimated No-Show Cost (optional)

LEAD QUALITY / QA RULES
- Minimum viable lead = Business Name + City/State + Phone + Website OR Google Maps listing.
- Prefer leads that:
  - Have online booking or a clear “Request appointment” CTA (high scheduling volume).
  - Have multiple providers or “New patient special” ads (marketing-active).
  - Have evidence of reminder tools but poor execution (missed confirmations, no waitlist fill).
- Email validation heuristics (before sending):
  - If email on site exists, use it.
  - If not, use common patterns only if domain exists: info@, office@, appointments@, hello@.
  - Avoid personal gmail unless clearly official.

LEAD SOURCING SOP (repeatable to 400–800)
Tools: Google Maps, Yelp, practice websites, state dental association directories, “Find a Dentist” directories.

Step-by-step:
1) Choose a metro + radius (start with top 25 metros). Query examples:
   - “dentist near me”, “family dentistry [city]”, “cosmetic dentist [city]”, “orthodontist [city]”.
2) From Google Maps:
   - Open listing → capture Name, Address, Phone, Website.
   - Check if “Appointments” link exists.
3) Visit website:
   - Find Contact page: capture published emails.
   - Find Team/Staff page: identify practice manager or office manager.
   - Note online booking / request appointment tools.
4) Yelp (optional enhancer):
   - Confirm phone/website, gauge review volume (proxy for appointment volume).
5) Enrichment for decision maker:
   - If manager name exists but no email, use role email (office@, appointments@).
   - Record “DM Name/Title” even without direct email; it improves call/SMS.
6) Logging:
   - Add to CRM with Stage = “New – Not Contacted” and Next Touch Date = today.

CRM PIPELINE (stages + rules)
Stages (dropdown):
1) New – Not Contacted
2) Attempting Contact (Email 1 sent)
3) Engaged (replied / asked question)
4) Qualified (has appointment volume + no-show pain + authority)
5) Demo Booked
6) Demo Completed
7) Trial/Setup Started
8) Closed Won (Paying)
9) Closed Lost
10) Nurture (future follow-up)

Required fields by stage:
- Engaged: must have contact person + channel + last touch date.
- Qualified: must have estimated appointment volume OR stated pain.
- Demo Booked: must have calendar date/time + attendee.

Next-step rules:
- Any “Attempting Contact” lead must have Next Touch Date within 48 hours.
- Any “Engaged” lead must have same-day response.
- Any “Demo Completed” must have proposal/next action within 24 hours.

COLD EMAIL SEQUENCE A (Owner/Doctor)
From: Bob (Appointment No-Show Reducer)
Include website proof + reply CTA.

Subject line options (rotate):
1) “Quick question about no-shows at {{Practice}}”
2) “Filling last-minute cancellations ({{City}})” 
3) “Reduce no-shows without more front-desk work”
4) “{{Practice}} – confirmations + reschedules via SMS”

Email 1 (Day 1)
Hi Dr. {{LastName}},

I’m Bob. We built a simple SMS + two-way confirmation system that reduces appointment no-shows and automatically prompts reschedules + fills gaps from a waitlist.

Most dental practices we speak with lose a meaningful amount each month from late cancels/no-shows, and the front desk ends up chasing confirmations manually.

If I can show you (in 10 minutes) how this works and how we quantify recovered revenue per location, who’s the best person at {{Practice}} to handle reminders/confirmations?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: “Re: no-shows at {{Practice}}”
Hi Dr. {{LastName}}, checking if you’re the right person for appointment reminders/confirmations.

If it’s your office manager, I can send a 3-bullet summary + pricing range. If it’s you, I can show the workflow and analytics quickly.

Worth a quick look?
– Bob

Follow-up 2 (Day 6)
Subject: “Last-minute cancellations”
Hi Dr. {{LastName}},

The biggest win tends to be:
1) two-way confirmations (Y/N) via SMS
2) auto-reschedule link when they say “No”
3) waitlist fill when a slot opens

If you tell me your rough weekly appointment count, I can estimate the monthly $$ recovered.
– Bob

Follow-up 3 (Day 10)
Subject: “Close the loop?”
Should I speak with your office manager/front desk lead, or is reducing no-shows not a priority right now?
– Bob

Reply handling snippets:
- If “send details”: “Absolutely—what’s the best email for your office manager? Also, do you currently confirm by phone/text/email?”
- If “already have reminders”: “Makes sense. Do patients confirm two-way (Y/N) and does it auto-reschedule + fill from waitlist, or is it mainly one-way reminders?”

COLD EMAIL SEQUENCE B (Office Manager / Front Desk)
Subject options:
1) “Confirmations + reschedules by text (less front-desk chasing)”
2) “Waitlist fill for cancellations at {{Practice}}”
3) “Two-way SMS confirmations”

Email 1 (Day 1)
Hi {{FirstName}},

Quick one—do you currently text patients to confirm appointments (two-way Y/N), or is it mostly reminder-only?

We built an SMS workflow that:
- sends smart reminders
- collects confirmations
- if they can’t make it, automates rescheduling
- fills gaps from a waitlist
- shows analytics on recovered revenue per location

If you’re open to it, I can show the flow in ~10 minutes.
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up 1 (Day 2)
Just bumping this—if you tell me whether you do confirmations by phone, text, or email, I’ll send a quick recommendation (no pitch).
– Bob

Follow-up 2 (Day 5)
Common issue we see: reminder gets sent, but no confirmation comes back, so the schedule stays uncertain.

Would two-way confirmations + auto-reschedule help your team, or are you already covered?
– Bob

Follow-up 3 (Day 9)
If I’m not reaching the right person, who owns reminders/confirmations at {{Practice}}?
– Bob

CRAIGSLIST POSTING TEMPLATE (Services → Small Biz Ads)
Title options:
- “Reduce dental no-shows with 2-way SMS confirmations (10-min setup)”
- “Stop last-minute cancels: SMS reminders + waitlist fill”

Body:
If you run a dental/ortho practice and no-shows or late cancellations are hitting production, we built a lightweight system that:
- texts patients reminders
- collects TWO-WAY confirmations (Y/N)
- automates reschedules when they can’t make it
- fills openings from a waitlist
- tracks recovered revenue per location

No long implementation. Designed for busy front desks.

See overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

FB GROUP POST (value-led, non-spam)
Post:
Dental office managers—question: how are you handling confirmations right now?

We’ve been testing a simple approach that reduces no-shows:
1) SMS reminders + two-way Y/N confirmations
2) if “No”, send reschedule options automatically
3) when a slot opens, offer it to a waitlist

If anyone wants, I can share the exact reminder/confirmation script we’re using and a quick calculator to estimate recovered production.
Overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

Anti-ban checklist:
- Do NOT DM members who didn’t ask.
- Ask admin permission if rules require.
- Post as “sharing a resource”, not “buy my software.”
- Rotate wording and never paste links if the group forbids links—offer to comment with it.

UPWORK PROFILE COPY (ready to paste)
Title: Reduce appointment no-shows with SMS reminders + 2-way confirmations (done-for-you)
Overview:
I help appointment-based businesses reduce no-shows and last-minute cancellations using SMS reminders, two-way confirmations (Y/N), automated rescheduling, and waitlist gap-filling. You’ll also get simple analytics to quantify recovered revenue per location.

If you’re currently relying on manual confirmation calls or one-way reminders, I can implement a tighter flow fast.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

UPWORK PROPOSAL TEMPLATE 1 (No-show reduction)
Hi {{ClientName}},
I can help you reduce no-shows by implementing two-way SMS confirmations (Y/N), automated reschedules, and waitlist fill for cancellations—plus a simple report showing recovered revenue.

If you share your appointment volume and current reminder process, I’ll outline a 7-day rollout plan.
Overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Thanks,
Bob
agent_bob_replit@agentmail.to

UPWORK PROPOSAL TEMPLATE 2 (Admin / appointment setting)
Hi {{ClientName}},
If your front desk/admin team is spending time chasing confirmations, I can set up an SMS workflow that confirms appointments two-way and automatically routes reschedules—reducing manual follow-up.

Happy to start with a single location and prove ROI.
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
– Bob

UPWORK PROPOSAL TEMPLATE 3 (Marketing ops / automation)
Hi {{ClientName}},
This is a quick automation win: reminders → two-way confirmation → if “No”, reschedule link → if slot opens, waitlist offer → simple dashboard.

If you tell me what scheduling system you use, I’ll confirm integration options and propose the fastest path.
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
– Bob

NEXT: SEED LEAD LIST BUILD (100–150)
Execution checklist for tomorrow:
1) Pick 5 metros, collect 25–30 practices each from Google Maps.
2) Visit each website, capture contact email + manager name.
3) Log into CRM, set Next Touch Date = today.
4) Send Email 1 (Owner or Manager variant) to first 40–80.
5) Track replies and book demos.
