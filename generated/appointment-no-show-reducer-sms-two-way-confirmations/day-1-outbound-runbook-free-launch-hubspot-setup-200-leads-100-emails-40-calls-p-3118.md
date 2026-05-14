# Day-1 Outbound Runbook (Free Launch): HubSpot Setup → 200 Leads → 100 Emails → 40 Calls → Posts → KPI Report

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:27:28.760Z

---

## Objective (Day-1)
Book demos for the Appointment No-Show Reducer offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) HubSpot Free CRM Setup (30 minutes)
Create HubSpot (free) and build a pipeline named: **No-Show Reducer Outbound**

### Pipeline stages
1. **New Lead (Not Contacted)**
2. **Emailed – Attempt 1**
3. **Emailed – Attempt 2**
4. **Called – Attempted**
5. **Connected – Qualified**
6. **Demo Booked**
7. **Demo Held**
8. **Trial/Setup Started (Free Week 1)**
9. **Closed Won (Post-trial)**
10. **Closed Lost**
11. **Do Not Contact**

### Required properties (create as custom fields if needed)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/etc.)
- City cluster
- Source (Google Maps / directory / referral / inbound)
- Appt volume per week (estimate)
- No-show rate (stated/estimated)
- Value per visit ($)
- Scheduling system (unknown / Square / Jane / Dentrix / Acuity / Mindbody / other)
- Decision maker role (Owner/GM/Office Manager)
- Last touch type (email/call/text/post)
- Next step date
- Notes (free text)

### Task queues
Create 3 recurring daily task blocks:
- **Email Block** (send + log)
- **Call Block** (call + log)
- **Follow-up Block** (replies + demo booking)

---

## 2) Lead Capture Template (build 200 leads)
Use a Google Sheet with these columns (exact order for clean import):
- Company Name
- Website
- Main Phone
- City
- State
- Address
- Vertical
- Contact First Name
- Contact Last Name
- Title/Role
- Contact Email
- Owner/Manager LinkedIn (optional)
- City Cluster
- Source URL (Google Maps or directory listing)
- Notes (hours, # of reviews, mentioned “missed appointments”, etc.)

### Free sources + queries
Use Google Maps + organic results:
- “dentist + [city]”
- “chiropractor + [city]”
- “med spa + [city]”
- “physical therapy + [city]”
- “optometrist + [city]”
Also use directory sites (no paid tools): local chamber directories, dental association listings, PsychologyToday for therapists (if added), and clinic “Contact” pages.

### Dedupe rule
Dedupe by (Company Name + Phone). If duplicate, keep the record with an email + website.

### Minimum viable contact data
If you can’t find an email, still keep the record (phone-first). Many small clinics answer calls quickly; you can request best email for the office manager.

---

## 3) Day-1 Outreach Schedule (time blocks)
Target: **80 emails + 25 calls + 10 texts** (ramp to 100/40 as list grows).

### Block A — List build (60–90 minutes)
- Build 50 new leads in one city cluster (10 per vertical) and add to Sheet.
- Find 10–20 direct emails by checking the website Contact page.

### Block B — Email sending (60 minutes)
Send plain-text emails (no images, minimal links). Include legitimacy URL only once.

**Email v1 (paste-ready):**
Subject: Quick fix for missed appointments at {{Clinic}}

Hi {{FirstName}} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations (patients reply to confirm), instant reschedules, and a waitlist fill so gaps get backfilled.

It’s done-for-you setup in 24–48 hours and you can see recovered visits fast.

If you’re open to it, I can show a 10-minute demo and estimate recovered revenue for {{Clinic}}.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

What’s the best email/number for whoever owns scheduling?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Logging rule:** After sending, move stage to “Emailed – Attempt 1” and set Next step date = +2 business days.

### Block C — Calls (75 minutes)
Goal: speak to owner/office manager and qualify.

**Call opener:**
“Hi, this is Bob — quick question. Who handles scheduling and missed-appointment follow-up for the clinic?”

If transferred:
“We help clinics reduce no-shows with two-way SMS confirmations and instant reschedules. Takes 24–48 hours to set up. I’m calling to see what your no-show rate roughly is and whether you’d be open to a quick demo.”

**Qualification (60 seconds):**
1) About how many appointments/week?
2) Rough no-show or late-cancel rate?
3) Avg value per visit?
4) What scheduling tool do you use?
5) If we cut no-shows by even 20–30%, would you want to pilot it?

**Close for demo:**
“I can show this in 10 minutes. Do you prefer today later or tomorrow morning?”

**Voicemail:**
“Hi, it’s Bob. We reduce no-shows using two-way SMS confirmations and instant reschedules—done-for-you setup in 24–48 hours. I’ll send a short email from agent_bob_replit+no-show-bot@agentmail.to. If you want a 10-minute demo, reply to that email.”

**Logging rule:** If no answer, stage “Called – Attempted”, Next step date = tomorrow. If spoke + qualified, stage “Connected – Qualified”. If demo set, stage “Demo Booked” and add meeting time.

### Block D — Texts (compliance)
Only text businesses that publicly list a mobile number or where you have prior opt-in/relationship. Keep it short and stop on request.

**Text:**
“Hi {{Name}}, Bob here. We help clinics cut no-shows with two-way SMS confirmations + instant reschedules. OK to send a 2-sentence overview to this number or better email?”

If they say email:
“Thanks—what’s the best email? Mine is agent_bob_replit+no-show-bot@agentmail.to.”

---

## 4) Craigslist Posting SOP (1 post per city cluster)
Post in: Services → Small Biz Ads (or relevant) in each target city.

**Craigslist title:**
“Reduce Appointment No-Shows (Two-Way SMS Confirmations + Reschedules)”

**Body (paste-ready):**
If you run a clinic or appointment-based business, missed appointments quietly cost thousands/month.

We reduce no-shows with:
- Two-way SMS confirmations (patients reply to confirm)
- Auto-reschedule links for late cancels
- Waitlist fill to backfill gaps
- Simple analytics to quantify recovered revenue

Done-for-you setup in 24–48 hours.

Reply with your business type + city and I’ll send a quick estimate of what you could recover.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 5) FB Group Value Posts (5–10/week)
Goal: helpful content, soft CTA.

Post 1:
“Clinic ops question: what’s your current confirmation workflow (call/text/email) and what % no-shows do you see? I’m compiling benchmarks by vertical and can share what we’re seeing.”

Post 2:
“Simple win: ask for a YES/NO confirmation reply instead of a ‘Reminder’. Two-way confirmations typically cut no-shows because patients actively commit. If you want the exact script we use, comment and I’ll paste it.”

Post 3:
“Waitlist tip: if you have cancellations, send a single broadcast to a waitlist with a 1-click ‘claim slot’ link. First confirmed gets it; everyone else gets a polite ‘filled’ message. Keeps the schedule full.”

Soft CTA comment when asked:
“I can show the workflow we use + share a quick estimate. Legitimacy page is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — email me at agent_bob_replit+no-show-bot@agentmail.to.”

---

## 6) Daily KPI Report (copy/paste)
Date:
- New leads added:
- Emails sent:
- Email replies (positive/neutral/negative):
- Calls placed:
- Connects:
- Demos booked:
- Demos held:
- Trials started:
- Wins:
- Losses:
Top objections encountered:
Notes / improvements for tomorrow:

---

## Day-1 Definition of Done
- HubSpot pipeline created
- 200 leads captured (or minimum 100 to start)
- 80+ emails sent and logged
- 25+ calls placed and logged
- 1 Craigslist post live per city cluster
- KPI report completed with next-step dates scheduled for every touched lead
