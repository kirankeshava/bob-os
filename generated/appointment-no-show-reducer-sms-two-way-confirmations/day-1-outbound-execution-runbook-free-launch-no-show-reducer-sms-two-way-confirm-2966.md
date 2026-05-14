# Day-1 Outbound Execution Runbook (FREE launch) — No-Show Reducer (SMS Two-Way Confirmations)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T06:51:18.859Z

---

Objective (30 days): book 40 demos and close 20–25 locations. Offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.” Legitimacy URL to include everywhere: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  | Contact: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM setup (15–25 min)
1) Create account (free). User: Bob Smith, agent_bob_replit@agentmail.to.
2) Pipeline stages (Deals):
   - New Lead (not contacted)
   - Attempted Contact (1st touch)
   - Replied (needs response)
   - Qualified (meets basic criteria)
   - Demo Booked
   - Demo Held
   - Trial/Setup Started (FREE 7-day)
   - Closed Won (Location)
   - Closed Lost
3) Required properties to create (custom fields):
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City Cluster
   - Scheduling System (Unknown / Dentrix / ChiroTouch / Mindbody / Jane / Square / Other)
   - Appts per week (range)
   - Est. no-show rate (%)
   - Value per visit ($)
   - Primary goal (reduce no-shows / fill gaps / confirmations)
   - Decision maker role (Owner/Practice Manager/Front Desk/Other)
   - Next Step Date
   - Last Touch Type (Email/Call/SMS/VM)
   - Disposition (No answer / Gatekeeper / Interested / Not now / Wrong person / Do not contact)
4) Logging rule: every touch becomes a Note with timestamp + outcome. Every prospect gets a “Next Step Date” or is marked Lost.

B) Lead capture template (Google Sheets columns for HubSpot import)
Company Name | Website | Google Maps URL | Address | City | State | Phone | Owner/Manager Name | Role | Email | Secondary Email | Notes (hours/booking link) | Vertical | City Cluster | Source URL | Last Touch Date | Last Touch Type | Disposition | Next Step Date
Dedupe rule: unique on Website domain first, then Phone.

C) Free lead sourcing (first 200 leads) — 2 city clusters x 5 verticals
Pick 2 clusters (examples): Cluster A: Phoenix AZ metro. Cluster B: Tampa FL metro. (Replace with any two you can execute fastest.)
Verticals: Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.
Where to pull:
1) Google Maps (fastest): search “{city} dentist”, open each profile, capture website + phone.
2) Yelp category pages, local directories, state association directories.
3) Company websites: look for “Contact”, “Team”, “About”, “Front desk”, “Practice manager”.
How to find emails (free, manual):
- Look on website contact pages.
- If no email, use common patterns: info@domain, office@domain, hello@domain.
- Capture contact form URL if no email; still call.
Target per day: 200 leads built once, then 50–100 emails/day drawn from that list.

D) Day-1 sending plan (50–100 emails)
Constraints: keep plain-text, minimal links (only the legitimacy URL when necessary). Send in 2 blocks to reduce spam flags.
Block 1: 25–40 emails between 9:00–11:00 local time.
Block 2: 25–60 emails between 1:30–4:30 local time.
Subject lines (rotate):
- quick question about no-shows
- two-way confirmations for {Business}
- reducing no-shows in {City}
- fill last-minute gaps

Email template (primary):
Hi {FirstName} — Bob here.

Do you handle scheduling for {Business}?

We help appointment-based businesses reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill (done-for-you setup in 24–48 hours).

If you’re open, I can show you a 10-minute demo and we’ll estimate how many visits you’d recover per month.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply with (1) best number to reach you and (2) what system you use for scheduling.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up (48–72h later):
Hi {FirstName} — looping back. If you’re not the right person, who owns confirmations/no-shows at {Business}?

If you are: what’s your rough no-show rate and average visit value? I’ll send a quick estimate.
— Bob

E) Calls/SMS (20–40/day)
Call opener (15 sec):
“Hi, is this {Name}? Bob here. Quick one — do you handle appointment confirmations/no-shows for {Business}? We help reduce no-shows with two-way SMS confirmations and instant reschedules. If I can show you in 10 minutes and estimate recovered visits, would you be open to a quick demo?”

If gatekeeper:
“Totally understand — who’s best to speak with about scheduling confirmations and no-shows? Practice manager/owner?”

Voicemail:
“Hi {Name}, Bob. We help {vertical} offices reduce no-shows with two-way SMS confirmations + reschedules. If you want a quick 10-minute walkthrough, call/text me back at {your number} or email agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Optional follow-up text (only where compliant and after contact/VM):
“Hi {Name} — Bob here. Sent you a quick note about reducing no-shows at {Business} using two-way SMS confirmations + instant reschedules. Want a 10-min demo this week? — agent_bob_replit+no-show-bot@agentmail.to”

F) Craigslist (1–2 posts/week per cluster)
Title: “Reduce appointment no-shows (two-way SMS confirmations + reschedules) — FREE setup trial”
Body: 3–5 bullets, include legitimacy URL + contact email. Track inbound in HubSpot as “Inbound — Craigslist”.

G) FB Groups (5–10 value posts/comments/week)
Post angle: teach, then soft CTA.
Example comment: “We’ve seen that two-way confirmations (reply C to confirm / R to reschedule) cut no-shows fast because it forces a commitment. If anyone wants, I can share a simple reminder sequence + timing that works for clinics.” Then DM responders and book demo.

H) Qualification (fast)
Must know:
- Approx appts/week
- No-show rate estimate
- $ value per visit
- Who owns scheduling
If appts < 30/week or no texting allowed, downgrade priority.

I) Daily KPI report (copy/paste)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies:
Positive replies:
Demos booked:
Demos held:
Trials started (FREE):
Closed won:
Notes: top objections + what worked.

Start-of-day checklist:
1) Pull today’s 50–100 leads from HubSpot (New Lead).
2) Send Block 1 emails; log.
3) Call block 1 (10–20 calls); log.
4) Send Block 2 emails; log.
5) Call block 2 (10–20 calls); log.
6) Post 1 Craigslist ad per active cluster (only on scheduled days).
7) End-of-day KPI report + queue follow-ups for tomorrow.
