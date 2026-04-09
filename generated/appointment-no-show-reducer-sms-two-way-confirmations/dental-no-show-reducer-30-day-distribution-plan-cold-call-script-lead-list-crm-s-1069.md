# Dental No-Show Reducer — 30-Day Distribution Plan + Cold-Call Script + Lead List/CRM Spec

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:21:28.401Z

---

## Goal (30 days)
Collect $10k+ cash from dental locations using: $499 setup + $399/mo/location (SMS pass-through). Target: 12 closes in 30 days.
- 12 setups x $499 = $5,988 collected
- 12 month-1 MRR x $399 = $4,788 collected
- Total collected = $10,776 (ex-SMS)

## Funnel math (conservative)
Daily activity (Mon–Fri): 50 emails + 30 LinkedIn DMs + 20 calls = 100 touches/day.
Monthly touches (20 days) ≈ 2,000.
Assumptions:
- Positive reply rate: 2.5% → 50 replies
- Demo booking rate from replies: 40% → 20 demos
- Close rate from demos: 50–60% → 10–12 closes
This hits the $10k collected target primarily via setup fees + month-1 MRR.

## ICP (who we target)
Primary: single-location dental practices and small groups (2–10 locations) with 60+ appointments/week.
Roles:
- Office Manager / Practice Manager (day-to-day scheduling authority)
- Owner dentist / Managing partner (budget approval)
Qualifying triggers:
- Missed appointments or late cancellations are a recurring issue
- Uses a PMS (Dentrix/OpenDental/eaglesoft/etc.) and has textable patient numbers
- Willing to run a 14-day pilot and measure confirmations/no-shows

## Lead list build spec (free-first)
Geos (pick 2–3 metros to start): e.g., Phoenix, Dallas, Tampa (or any mid/large metro with many independent practices).
Sources: Google Maps + practice websites + LinkedIn.
Filters:
- Category: “Dentist”, “Dental clinic”, “Cosmetic dentist”, “Family dentist”, “Orthodontist” (optional)
- Exclude: public health clinics, schools, Medicaid-only clinics if obvious
- Prefer: 4.0+ rating, active website, multiple operatories implied ("family dentistry", "same-day crowns", etc.)
Data fields to capture:
1) Practice name
2) Website
3) Phone
4) Address / City
5) Owner name (if visible)
6) Office manager name (if visible)
7) Emails (front desk + office manager if present)
8) LinkedIn URL (practice and/or office manager)
9) Notes (hours, services, any "text us" mention)
10) Outreach status (Not Contacted / Attempted / Replied / Demo Booked / Won / Lost)
11) Last touch date
12) Next step date

## Simple Google Sheets CRM schema
Tabs:
1) Leads (fields above)
2) Activity Log (Date, Lead, Channel, Message ID, Outcome)
3) Pipeline (Lead, Stage, Deal value, Probability, Close date)
Stages:
- New → Contacted → Replied → Demo Scheduled → Proposal Sent → Closed Won/Lost

## Cold-call script (front desk / office manager)
Open (10 seconds):
“Hi — is this the office manager? My name’s Bob. I’m calling because we help dental practices cut no-shows with two-way text confirmations and easy rescheduling. Can I take 20 seconds to see if it’s relevant?”

If yes:
“Roughly how often do you see no-shows or last-minute cancels in a normal week?”
(Wait)
“And when a patient cancels late, do you usually have a waitlist you can text to fill that opening, or does the chair time just get lost?”

Value statement (tie to their answer):
“Got it. What we do is: patients get smart reminders, they can confirm by replying, and if they can’t make it we push them a reschedule link and automatically text the waitlist to fill the gap. You also get a simple report that estimates recovered revenue per month per location.”

Soft CTA:
“If I could show you this in 15 minutes and you could decide in the same call whether to run a 14-day pilot, would you be open to a quick demo tomorrow or Thursday?”

If they ask for legitimacy / details:
“Totally. Here’s the link with the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. And you can email me at agent_bob_replit+no-show-bot@agentmail.to — I’ll send pricing and the pilot outline.”

Close ask (on call or after demo):
“Great — to start, it’s $499 one-time concierge setup and $399/month per location plus SMS pass-through. Cancel anytime, and you can choose a risk-free option for the first 14 days.”

## Voicemail script (18–22 seconds)
“Hi, this is Bob. We help dental offices reduce no-shows with two-way text confirmations and automated waitlist fills. If you want details, the overview is at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. You can also email me at agent_bob_replit+no-show-bot@agentmail.to. I’ll try you again tomorrow.”

## Objection handling (quick snippets)
1) “We already text patients.”
“Totally—most offices do. The difference is two-way confirmations + automated reschedules + waitlist fill + recovered-revenue tracking. Are your texts actually collecting confirmations and automatically filling same-week gaps?”

2) “We don’t have budget.”
“Understood. If you recovered even 2–3 appointments/month, would that more than cover $399? If yes, we can run a 14-day pilot and only continue if it’s measurable.”

3) “Send info.”
“Absolutely. What’s the best email? I’ll send the overview link (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2) and pricing. Also—should I address it to you as the person who owns scheduling, or is there someone else who should see it?”

4) “We’re too busy.”
“That’s exactly why we keep setup concierge-style. If you can export next week’s schedule once (or share the reminder workflow you want), we can launch quickly. Would a 15-minute demo be easier than a back-and-forth email chain?”

## 15-minute demo-to-close micro-outline
Minute 0–2: confirm problem
- “How many no-shows/late cancels last week?”
- “What does an empty chair cost you?”
Minute 2–7: show workflow
- Reminder → reply YES/NO → reschedule link → waitlist fill
Minute 7–10: analytics + ROI
- “Here’s how we quantify recovered chair time and estimate recovered revenue.”
Minute 10–12: implementation
- “Week 1: message templates + schedule export + launch.”
Minute 12–15: close
- “If we start this week: $499 setup + $399/mo/location + SMS pass-through. Cancel anytime. Pick one: 14-day risk-free OR waive next month if no measurable reduction.”
