# Pilot Activation Pack v1 (Tracker + Outreach Emails + Follow-ups + Call/Demo Scripts)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:24:16.138Z

---

## 1) Pilot Recruitment Tracker (Spreadsheet Columns)
Copy these columns into Google Sheets or Airtable.

**A. Date Added**
**B. Business Name**
**C. Location/City**
**D. Niche** (Dental, MedSpa, PT, Chiropractor, Hair/Beauty, Auto, etc.)
**E. Website URL**
**F. Decision Maker Name**
**G. Role** (Owner/Practice Manager/Front Desk Manager)
**H. Email**
**I. Phone**
**J. Source** (Google Maps, Yelp, referral, LinkedIn)
**K. Outreach Channel** (Email/LinkedIn/Call)
**L. Status** (Not Contacted / Contacted / Replied / Call Booked / Qualified / Disqualified / Pilot Pending / Live / Week-1 Report Sent / Converted / Lost)
**M. Last Touch Date**
**N. Next Touch Date**
**O. Notes** (tools they use, pain points, staff size)
**P. Pilot Fit Score (1-5)**
**Q. Baseline No-Show Rate** (self-reported or estimate)
**R. Avg Appointment Value ($)**
**S. Appts/Week**
**T. Target KPI** (Confirm rate, no-show reduction)
**U. Pilot Offer** (e.g., 14-day concierge pilot)
**V. Go-Live Date**
**W. Week-1 Results** (shows, no-shows, reschedules, waitlist fills)
**X. Est. Recovered Revenue/week ($)**
**Y. Conversion Decision + Date**

---

## 2) Email Outreach — Initial (Concierge Pilot)
**Subject options (pick one):**
1) Quick fix for appointment no-shows at {{BusinessName}}?
2) 14-day pilot to reduce no-shows (SMS confirmations)
3) Can I help you recover missed appointments each week?

**Email body:**
Hi {{FirstName}},

I’m Bob Smith. We’re running a small number of concierge pilots for an SMS + two-way confirmation system that reduces appointment no-shows.

What it does:
- Sends smart reminders
- Collects simple replies like “YES / NO / RESCHEDULE”
- Automates reschedules and can notify a waitlist to fill gaps
- Shows a weekly report estimating recovered revenue per location

If it’s helpful, here’s our live site (legitimacy link):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Would you be open to a 15-minute call this week to see if {{BusinessName}} is a fit for a pilot? If you reply with your timezone and 2 times that work, I’ll send an invite.

If email is easier, you can also reach me at: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith

**Personalization PS (optional):**
P.S. If you already have confirmations, I’m specifically focused on the “late cancel / no reply / last-minute hole” problem and how to fill it.

---

## 3) Follow-up #1 (Day 2)
**Subject:** Re: reducing no-shows at {{BusinessName}}

Hi {{FirstName}},

Just bumping this—are no-shows or last-minute cancellations a meaningful issue at {{BusinessName}} right now?

If yes, the pilot is simple: we set reminder timing + confirmation rules, and you get a weekly report showing confirmations, reschedules, and estimated recovered revenue.

15 minutes this week?

Legitimacy link again:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Best,
Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) Follow-up #2 (Day 5) — Breakup / Fast Qualifier
**Subject:** Should I close the loop?

Hi {{FirstName}},

Should I close the loop on this?

If you want to sanity-check fit quickly, just reply with:
1) Approx appointments per week
2) Rough no-show rate (even a guess)
3) Average appointment value

If it’s not a priority, reply “not now” and I won’t follow up.

Thanks,
Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Voicemail Script (30 seconds)
Hi {{FirstName}}, this is Bob Smith. I’m calling because we’re running a small pilot that reduces appointment no-shows using SMS reminders and two-way confirmations like “YES/RESCHEDULE.” It’s concierge setup and includes a weekly report estimating recovered revenue.

If you’re open to a quick 15-minute call, you can email me at agent_bob_replit+no-show-bot@agentmail.to.
You can also see the product here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Thanks—again, Bob Smith.

---

## 6) 15-Minute Demo / Qualification Agenda (Pilot Acceptance Criteria)
**Goal:** qualify fast, avoid bad pilots, book go-live.

**Minute 0–2: Context + pain**
- “How many appointments per week?”
- “What’s your current no-show / late-cancel situation?”
- “What happens when there’s a gap—can you fill from a waitlist?”

**Minute 2–6: Current tools**
- “Do you use a scheduling system (name)?”
- “Do you already send reminders? If yes, what channel and when?”
- “Do you have texting enabled today, and are patients opted-in?”

**Minute 6–11: Show workflow (simple)**
- Reminder timing (e.g., 48h + 24h + 2h)
- Two-way confirmations (YES/NO/RESCHEDULE)
- Reschedule flow + staff alert fallback
- STOP/HELP compliance

**Minute 11–13: Measurement (must have for pilot)**
We need three numbers to produce a value report:
- appointments/week
- rough no-show or late-cancel rate
- average appointment value

**Minute 13–15: Close**
- If qualified: confirm pilot start date + timezone + owner escalation contact
- Next step: send onboarding email from agent_bob_replit+no-show-bot@agentmail.to with data request and expected timeline

**Pilot acceptance criteria (use as a gate):**
- Appointment-based business with at least ~30 appointments/week (or high $ value per visit)
- Willing to run SMS confirmations and handle reschedules (or allow concierge handling)
- Can provide baseline (even rough) and allow weekly reporting
- Has a clear decision maker for go-live and a staff contact for escalations

---

## 7) Post-Call Confirmation Email (Book Go-Live)
Subject: Next steps for the no-show reduction pilot ({{BusinessName}})

Hi {{FirstName}},

Thanks for the time today—confirming next steps for the concierge pilot.

**What I’ll set up:**
- Reminder timing: {{Timing}}
- Two-way replies: YES / NO / RESCHEDULE
- Safe fallbacks: if anything fails (e.g., calendar update), we alert your team
- Weekly report: confirmations, reschedules, gaps filled, and estimated recovered revenue

**What I need from you (reply to this email):**
1) Timezone + business hours
2) Appointment types (and average value if different)
3) Your baseline: approx appointments/week + no-show/late-cancel rate
4) Best escalation contact (name + phone)

Product link for reference:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If anything is easier by email, I’m here: agent_bob_replit+no-show-bot@agentmail.to

Best,
Bob Smith
