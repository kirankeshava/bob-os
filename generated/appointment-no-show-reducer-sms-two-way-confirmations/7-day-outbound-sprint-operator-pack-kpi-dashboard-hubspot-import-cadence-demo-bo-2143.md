# 7-Day Outbound Sprint Operator Pack (KPI Dashboard + HubSpot Import + Cadence + Demo Booking Fallback)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:54:28.900Z

---

Purpose: book demos immediately and avoid operational drag. Offer positioning to repeat everywhere: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.” Legitimacy URL to include in emails/posts: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Contact email: agent_bob_replit+no-show-bot@agentmail.to.

A) Daily KPI Dashboard (copy into Sheet/Notion)
Track these fields daily (one row per day):
- Date
- New leads added
- Emails sent
- Email replies (total)
- Positive replies
- Unsub/stop
- Calls placed
- Connects
- Conversations (>=60 sec)
- Demos booked
- Demos held
- Trials started (free)
- Locations closed/won
- Notes / bottleneck
Formulas:
- Reply rate = Email replies / Emails sent
- Positive rate = Positive replies / Emails sent
- Connect rate = Connects / Calls placed
- Demo book rate = Demos booked / (Positive replies + Conversations)
Daily minimum targets (Days 1–7):
- Leads added: 50/day
- Emails: 75/day (ramp 50→100)
- Calls: 25/day (ramp 20→40)
- Demos booked: 2/day target by Day 3 (initially 1/day)

B) HubSpot Import CSV Header (minimum viable)
Use exactly these columns (HubSpot will map most automatically; keep consistent):
- Company name
- Company domain
- Website URL
- Industry/Vertical (Dentist/Chiro/PT/MedSpa/Optometry/etc.)
- City
- State
- Phone
- Contact first name
- Contact last name
- Contact title (Owner/Practice Manager/Office Manager)
- Contact email
- Lead source (Google Maps/Yelp/Directory/Craigslist/FB Group)
- No-show guess (Low/Med/High)
- Est. appts/week (blank ok)
- Notes (any personalization hook)
- Lifecycle stage (Prospect)
- Pipeline stage (New)
Example rows (format only):
1) Company name: “Sunrise Family Dental” | Company domain: sunrisefamilydental.com | Website URL: https://sunrisefamilydental.com | Vertical: Dentist | City: Mesa | State: AZ | Phone: (480) 555-0101 | First: “Karen” | Last: “Lopez” | Title: Office Manager | Email: office@sunrisefamilydental.com | Lead source: Google Maps | No-show guess: Med | Notes: “Online booking; mentions ‘missed appt fee’ on site” | Stage: New
2) “Peak Performance Chiropractic” | peakchiro.com | https://peakchiro.com | Chiro | Tampa | FL | (813) 555-0102 | “Mike” | “Reed” | Owner | info@peakchiro.com | Yelp | High | Notes: “Reviews mention long waits; has text number listed” | New

C) 7-Day Touch Cadence (stop rules included)
Goal: 6–8 touches over 10 days; below is first 7 days.
Stop rules:
- If “remove/stop/unsubscribe” -> mark Do Not Contact immediately.
- If wrong person -> ask for correct scheduling owner, update contact, continue.
- If they confirm they have a strong 2-way confirmation + reschedule workflow -> park as “Not now” and set 90-day follow-up.

Day 1
- Email #1 (plain text) + (optional) call same day 2–4 hours later.
- If connect: qualify fast (see section E) and try to book demo.

Day 2
- Call block (morning). Leave voicemail if no answer.
- Email #2 (short bump) referencing voicemail and 24–48h setup.

Day 3
- SMS (only where clearly business mobile/explicitly listed as textable; keep compliant): short question + opt-out language.
- Call block (afternoon).

Day 4
- Email #3 (case-style ROI math + waitlist fill angle).
- FB Group value comment/post (5–10 min) in local business / practice manager groups (no hard pitch; invite to DM).

Day 5
- Call block (morning) + voicemail.
- Short email bump: “Should I close the loop?”

Day 6
- Craigslist post (per city cluster): service offer + free setup + link to legitimacy URL + contact email.

Day 7
- Final email (breakup): “Ok to stop?” + 2 bullet outcomes + link.

D) Demo Booking Fallback (if no calendar link yet)
Use this to book demos immediately via email or phone:
1) Offer 3 windows in their timezone: “Today 3–5pm, Tomorrow 11am–1pm, or Thu 2–4pm—what works?”
2) Once they pick a time, reply: “Confirmed for [Day/Time]. If anything changes, reply here or email agent_bob_replit+no-show-bot@agentmail.to.”
3) Add to your calendar manually; send a reminder email 2 hours before with the legitimacy URL for reference.

E) Fast Qualification (phone or email)
Ask only what you need to confirm fit:
1) “About how many appointments per week per location?”
2) “Roughly what’s your no-show rate (even a guess)?”
3) “Average value of a kept visit?”
4) “What scheduling system do you use (e.g., Mindbody, Dentrix, Jane, Calendly)?”
5) “Who owns scheduling/confirmations—are you the right person?”
If fit: propose demo immediately + “done-for-you setup in 24–48 hours.”

F) Paste-Ready Email Copy (Email #1)
Subject options: “Quick question about confirmations”, “Reducing no-shows at {{Company}}”, “Two-way SMS confirmations?”
Body:
Hi {{FirstName}} — I’m Bob.

Do you currently use two-way SMS confirmations (where patients/clients can reply C to confirm or R to reschedule) or is it mostly one-way reminders?

We help appointment-based businesses reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill, with done-for-you setup in 24–48 hours.

If it’s helpful, here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a 12-minute walkthrough this week? If you reply with a good time window, I’ll lock it in.

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

G) Paste-Ready SMS (use only where appropriate)
“Hi {{FirstName}}, Bob here — quick one: do you use two-way text confirmations (reply to confirm/reschedule) or just reminder texts? We reduce no-shows + fill gaps from a waitlist. Reply YES and I’ll send details; reply STOP to opt out.”

Operating note: Do not wait for ‘perfect tooling.’ Today’s success metric is booked conversations. If HubSpot or meetings link isn’t ready, run the fallback booking workflow and log in a simple spreadsheet until CRM is live.