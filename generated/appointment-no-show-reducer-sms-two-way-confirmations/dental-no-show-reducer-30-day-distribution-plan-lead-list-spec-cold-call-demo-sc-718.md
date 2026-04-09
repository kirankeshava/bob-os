# Dental No-Show Reducer — 30-Day Distribution Plan + Lead List Spec + Cold Call & Demo Scripts

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:22:55.308Z

---

# Dental No-Show Reducer (SMS + Two-Way Confirmations)
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

## Goal (30 days)
Collect $10,000+ in 30 days via concierge setup fees + month-1 MRR.
- Offer: $399/mo/location + SMS pass-through + concierge setup $399 (limited-time).
- Collection math (simple): 10 locations closed in 30 days = (10 × $399 setup) + (10 × $399 month 1) = $7,980 collected.
- To hit $10k: close 13 locations (13 × $798) = $10,374 collected.

## ICP (who closes fast)
Primary: single-location dental practices + small groups (2–10 locations) with:
- 80–400 appointments/week
- No-show / late-cancel pain felt by owner + office manager
- Front desk already uses texting in some form OR is open to it
- Able to make a decision in <14 days

## Channel plan (distribution first)
Daily for 5 days/week:
1) Cold email: 50/day (owner + office manager)
2) LinkedIn: 30 DMs/day (same persona)
3) Phone: 20 calls/day (front desk → office manager)
Weekly targets (conservative):
- 250 emails + 150 DMs + 100 calls
- Reply rate: 5% email/DM combined → ~20 replies/week
- Meetings booked from replies: 35% → ~7 demos/week
- Close rate from demos: 25–30% → ~2 closes/week
Over 4 weeks: ~8 closes baseline. Push to 13 closes by (a) improving targeting, (b) adding calls, (c) faster follow-up, (d) asking for referrals within groups.

## Geo wedge (to keep list-building simple)
Start with 2–3 metros where practices cluster and phone outreach is efficient:
- Phoenix, AZ; Dallas–Fort Worth, TX; Tampa–St. Pete, FL (example)
Pick one metro for week 1 and saturate it.

## Lead list build spec (what to pull)
Sources (free-first): Google Maps, Yelp, dental association directories, practice websites.
Filters:
- Category: “Dentist”, “Cosmetic dentist”, “Family dentist”, “Dental clinic”, “Pediatric dentist”
- Exclude: “Dental school”, “Free clinic”, “Orthodontist only” (optional), “Emergency only”
- Rating count > 20 (signals volume)
Data fields to capture:
- Practice name
- Website
- Main phone
- Address + metro
- Owner/dentist name (if visible)
- Office manager / practice manager name (if visible)
- Emails found (general + person-specific)
- LinkedIn URLs (practice page, owner, office manager)
- Notes (hours, # providers, offers, any mention of texting)

## Google Sheet CRM schema (tabs + columns)
Tab 1: Leads
Columns:
- Lead ID
- Practice Name
- Metro
- Website
- Phone
- Decision Maker (Owner) Name
- Decision Maker (OM) Name
- Email(s)
- LinkedIn URL(s)
- Source (Maps/Yelp/etc.)
- Status (Not Contacted / Emailed / DMed / Called / Replied / Demo Booked / No Fit / Closed Won / Closed Lost)
- Last Touch Date
- Next Step Date
- Notes

Tab 2: Activity Log
- Date
- Lead ID
- Channel (Email/DM/Call)
- Template used
- Outcome (No answer/Left VM/Connected/Reply)
- Follow-up due

Tab 3: Pipeline
- Lead ID
- Demo Date
- Stage (Demo Set / Demo Done / Proposal Sent / Closed)
- Price (Setup + MRR)
- Expected Close Date

## Cold call script (front desk → office manager)
Goal: book a 15-min demo. Keep it respectful, fast, and specific.

### Opener (front desk)
“Hi — is this [Practice Name]? My name’s Bob. Quick question: who handles your appointment confirmations and no-show reduction — is that you or your office manager?”

If they say “me”:
“Got it. The reason I’m calling: we help dental practices cut no-shows and late cancels using two-way SMS confirmations and an automated reschedule link, plus a simple waitlist fill. Can I ask—are no-shows or last-minute cancellations a problem for you right now?”

If they say “office manager/practice manager”:
“Perfect — could you connect me with them for 30 seconds? I’m calling about reducing no-shows with two-way SMS confirmations and automated reschedules. It’s not a marketing pitch—more of an ops fix.”

### If gatekept (“send info”)
“Sure—what’s the best email to send it to? I’ll send a 3-bullet overview and a link to our page. Also, what’s a good time for a quick 15-minute walkthrough this week so it doesn’t get lost in the inbox?”

Send follow-up referencing:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

### Office manager connect script (30–60 seconds)
“Hi [Name] — Bob here. I’ll be brief. We reduce no-shows and late cancels for dental practices by sending smart SMS reminders and collecting two-way confirmations (Y/N), then automatically offering a reschedule link if they can’t make it. If you have a waitlist, we can also fill gaps. It usually pays for itself with just 1–2 saved appointments per month.

Open to a 15-minute look this week? If it’s not relevant, I’ll disappear.”

### Voicemail drop
“Hi [Name], this is Bob. We help dental practices cut no-shows with two-way SMS confirmations and automated reschedules. If saving even a couple of appointments a month matters, call/text me back or email agent_bob_replit+no-show-bot@agentmail.to. You can also see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

## Objection handling (tight responses)
1) “We already have reminders.”
“Totally. The difference is two-way confirmation + automated reschedule + waitlist fill, plus a simple recovered-revenue readout. Many systems remind, but they don’t close the loop when someone replies ‘can’t make it.’”

2) “We don’t want to annoy patients.”
“We keep it minimal—confirm + one follow-up if needed—and you control timing. Two-way confirmation usually reduces annoyance because patients can respond instead of ignoring.”

3) “No budget.”
“If we save even one hygiene appointment, it often covers the month. We also do a risk-free start—cancel anytime, and if there’s no measurable improvement we can waive the next month.”

4) “Is this compliant?”
“We only message existing patients about their appointments, with opt-out. We’ll align wording and timing to your policies.”

## 15-minute demo script (run-of-show)
0:00–2:00 Context
- “What’s your current reminder flow (text/call/email)? What’s the no-show/late-cancel pain?”

2:00–7:00 Show the wedge
- Two-way confirmation: “Reply Y to confirm / N to reschedule”
- Smart reminders: timing rules (e.g., 72h + 24h)
- Reschedule link: quick path to rebook
- Waitlist fill: offer newly opened slots to waitlist

7:00–10:00 ROI + analytics
- “We track confirmed vs unconfirmed, reschedules captured, and estimated recovered revenue per location.”
- “If your average value is $X and we save 2–3 slots/month, it’s typically an easy win.”

10:00–13:00 Implementation (reduce fear)
- “Week 1 launch: we need your appointment export (or a simple daily list), your reminder timing preferences, and message templates. We can go live quickly.”

13:00–15:00 Close
- “If we start this week: concierge setup is $399 (limited-time), then $399/month per location plus SMS pass-through. Cancel anytime. If you’d like, we can start with one location for 30 days and expand after results. Want to proceed with the one-location pilot?”

## Qualification checklist (use on calls)
- Do you have 80+ appointments/week?
- Are no-shows/late cancels causing real revenue loss?
- Do you have appointment reminders today (any form)?
- Can you share an appointment list/export (daily or weekly) so we can send confirmations?
- Is there a point person (office manager) who can approve message timing and templates?
- Can you decide in <14 days?

## Follow-up email (post-call) — short
Subject: Dental no-show reduction — quick overview

Hi [Name],

Thanks for the time today. Here’s the overview we discussed:
- Two-way SMS confirmations (Y/N)
- Automated reschedule link when patients can’t make it
- Optional waitlist fill + basic recovered-revenue analytics

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you want to proceed: it’s $399 concierge setup + $399/mo per location (SMS pass-through). Cancel anytime, and if there’s no measurable improvement we’ll waive the next month.

Best,
Bob
agent_bob_replit+no-show-bot@agentmail.to
