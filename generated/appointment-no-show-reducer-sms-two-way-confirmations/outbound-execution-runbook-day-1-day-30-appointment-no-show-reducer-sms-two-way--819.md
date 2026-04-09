# Outbound Execution Runbook (Day-1 → Day-30): Appointment No-Show Reducer (SMS Two-Way Confirmations)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:17:44.414Z

---

## 1) Offer (say it the same way everywhere)
**Appointment No-Show Reducer**: We reduce no-shows with **two-way SMS confirmations + instant reschedules + waitlist fill**. **Done-for-you setup in 24–48 hours.**
Legitimacy link to share in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business inbox for replies: agent_bob_replit+no-show-bot@agentmail.to

## 2) ICP + qualification (fast)
Target: appointment-based locations (single- or multi-location) where missed visits are costly.
Top verticals: Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.
Qualify in <3 minutes:
1) Appointments/week (or month)
2) Current no-show/cancel rate
3) $ value per visit (or average ticket)
4) Scheduling system (Dentrix, Jane, ChiroTouch, Mindbody, etc.)
5) Who owns scheduling decisions (owner/GM/office manager)
Disqualify: <25 appts/week AND <$100/visit AND no clear decision maker.

## 3) CRM (HubSpot Free) — pipeline + fields
### Pipeline stages
1. **New Lead** (not contacted)
2. **Attempted Contact** (emailed/called)
3. **Connected** (2-way conversation)
4. **Demo Booked** (meeting scheduled)
5. **Demo Held**
6. **Trial/Pilot Offered** (pricing + next step sent)
7. **Closed Won**
8. **Closed Lost**
9. **Unqualified**

### Required properties (create as custom fields)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry)
- City + State
- Location count
- Appts per week (number)
- No-show rate % (number)
- Avg value per visit ($)
- Scheduling system
- Decision maker name + role
- Best phone
- Best email
- Last touch date
- Next step (text)
- Objection tag (price/timing/using vendor/no problem/other)

### Task queues
- **Daily Email Queue**: 50–100 sends/day
- **Daily Call Queue**: 20–40 dials/day
- **Follow-up Queue**: any “not now / check back”

## 4) Lead list build (free) + import columns
### Free sources
- Google Maps
- Yelp categories
- Local chamber directories
- Practice websites (contact pages)

### Search operators (copy/paste)
- "dentist" "City, ST" + "contact" / "appointments"
- "chiropractor" "City, ST" "book" / "schedule"
- "med spa" "City, ST" "book now"
- "physical therapy" "City, ST" "request appointment"
- "optometry" "City, ST" "schedule exam"

### CSV columns (HubSpot import)
Company Name, Website, City, State, Vertical, Phone, Contact First Name, Contact Last Name, Title, Contact Email, Notes (source URL), Stage (set to New Lead)

Data rules:
- If no email found, still import with phone + website; call first.
- Deduplicate by Website domain.
- Notes should include: “Found via Google Maps; office manager unknown; ask who owns scheduling.”

## 5) Daily activity targets (30-day sprint)
- **Emails**: 50–100/day (plain text)
- **Calls**: 20–40/day (midday + late afternoon)
- **Craigslist**: 1–2 posts/week per city cluster
- **FB Groups**: 5–10 value comments/posts per week (no spam; DM only when asked)
KPIs tracked daily: sends, opens (optional), replies, connects, demos booked, demos held, closes, time-to-setup, churn risks.

## 6) Cold email (Day-1 primary) — plain text
Subject options: 
- “quick question about no-shows”
- “two-way SMS confirmations for {Clinic}”
- “reduce no-shows in {City}”

Body:
Hi {FirstName} — Bob here.

We help appointment-based clinics reduce no-shows using **two-way SMS confirmations**, **instant reschedules**, and **waitlist fill**. Setup is **done-for-you in 24–48 hours**.

If you’re open, I can show you a 10-min demo and estimate recovered revenue based on your weekly appointment volume.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

Worth a quick look this week?
— Bob

Follow-up #1 (2 days later):
Hi {FirstName} — should I send over a 2-minute breakdown of how two-way confirmations + reschedules typically cut no-shows, or are you the wrong person for scheduling ops?

Follow-up #2 (5–7 days later):
If you’re already happy with no-show rates, no worries. If you want, share (a) appts/week and (b) avg value/visit and I’ll reply with a simple recovered-revenue estimate.

## 7) Cold call opener (tight)
“Hi, is this {Name}? Bob here — quick one. We help clinics reduce no-shows with two-way SMS confirmations and instant reschedules. Who handles scheduling performance and no-show reduction for your location?”

If decision maker is available:
“Not trying to sell you on a long call. If you’re doing {appts/week} and even a few no-shows/week, we usually recover meaningful revenue. Can I ask 3 quick questions to see if it’s worth a 10-min demo?”

Voicemail:
“Hi {Name}, Bob — we help reduce no-shows via two-way SMS confirmations + instant reschedules + waitlist fill. If you want to see how it would work for {Clinic}, call me back at {your number} or email agent_bob_replit+no-show-bot@agentmail.to. Website: (I’ll text it) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

## 8) SMS (only where compliant; use after a call or explicit interest)
“Hi {FirstName} — Bob here. Quick link on the no-show reducer (two-way SMS confirmations + reschedules + waitlist fill): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Want me to send 2 time options for a 10-min demo?”

## 9) Reply handling library (paste-ready)
**Positive**: “Great — what does your weekly appointment volume look like, and roughly what’s an average visit worth? I’ll tailor the demo to your numbers. Want {Time A} or {Time B}?”

**Neutral / busy**: “Totally. Is it better to talk to you or the person who owns scheduling/no-show performance? If it’s you, what day/time is least chaotic?”

**Price pushback**: “Fair. Before numbers: if you recover even 2–5 visits/month, does that pay for itself for your location? If you share appts/week + avg value/visit, I’ll give a simple ROI estimate.”

**Already using reminders**: “Most of our wins are for clinics already sending reminders — the difference is **two-way confirmations** + **instant reschedule flow** + **waitlist fill**. Quick demo to compare?”

**Stop**: “Understood — I won’t reach out again. If you ever want the link for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

## 10) Demo flow (10–15 minutes)
1) Confirm current workflow (reminders, confirmations, reschedules)
2) Quantify baseline: appts/week × no-show% × $/visit
3) Show: two-way confirm, reschedule automation, waitlist fill
4) Implementation: done-for-you in 24–48 hours; minimal staff time
5) Close: “If we can recover even {X} visits/month, should we start with one location?”
6) Next step: send Stripe link immediately after call; schedule concierge onboarding.

## 11) Daily KPI report (copy/paste)
Date:
Emails sent:
Calls placed:
SMS sent (compliant):
Replies:
Connects:
Demos booked:
Demos held:
Closed won:
Closed lost:
Top objections:
Notes / improvements for tomorrow:

This runbook is designed to be executed immediately with HubSpot Free + manual lead sourcing to hit volume and book demos quickly.