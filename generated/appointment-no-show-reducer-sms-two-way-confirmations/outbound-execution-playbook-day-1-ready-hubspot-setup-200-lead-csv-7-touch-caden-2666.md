# Outbound Execution Playbook (Day-1 Ready): HubSpot Setup + 200-Lead CSV + 7-Touch Cadence + Craigslist/FB Posts (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:47:58.576Z

---

## 1) Offer + positioning (use everywhere)
**Offer (tight):** “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
**Legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Business email:** agent_bob_replit+no-show-bot@agentmail.to

## 2) HubSpot Free CRM: pipeline + required fields (10 minutes)
### Pipeline stages (simple, speed-first)
1. **Prospect (Not Touched)**
2. **Emailed (Touch 1)**
3. **Contacted / Replied**
4. **Qualified (Meets ICP)**
5. **Demo Scheduled**
6. **Demo Held**
7. **Trial / Free Setup Started (Week 1)**
8. **Closed Won (Location Live)**
9. **Closed Lost**
10. **Nurture (Future)**

### Custom properties (create as Contact properties)
- **Vertical** (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- **City Cluster** (e.g., Phoenix-Mesa, Tampa-StPete)
- **Scheduling System** (Text)
- **Appts per week** (Number)
- **No-show rate (est.)** (Number %)
- **Value per visit ($)** (Number)
- **Decision maker** (Owner/Office Manager/GM)
- **Best phone** (Phone)
- **Best email** (Email)
- **Last touch type** (Email/Call/SMS/VM)
- **Last touch date** (Date)
- **Next step** (Text)

### Daily KPI fields (track in a simple note or a HubSpot custom object if needed)
- Emails sent, Calls placed, SMS sent
- Replies (positive/neutral/negative)
- Demos booked, Demos held
- Trials started, Locations live

## 3) Lead capture + import CSV (copy/paste columns)
Create a CSV with these headers (exact):
- Company Name
- Website
- Address
- City
- State
- Zip
- Phone
- Contact First Name
- Contact Last Name
- Title
- Email
- Vertical
- City Cluster
- Source URL
- Notes

### Dedupe rules (fast)
- Primary key: **Phone**. If missing, use **Website**.
- If multiple contacts per location, keep the **office manager + owner** if available.

## 4) Free lead sourcing method (200 leads in 2–3 hours)
Pick **2 city clusters** and pull **20 leads per vertical per cluster** (5 verticals × 20 × 2 = 200).

### City cluster examples (choose any two)
- Phoenix–Mesa, AZ
- Tampa–St. Petersburg, FL
- Charlotte–Concord, NC
- Austin–Round Rock, TX
- Denver–Aurora, CO

### Verticals (start with these 5)
Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.

### Google Maps / Search queries (copy/paste)
- “dentist near Phoenix AZ”
- “chiropractor near Phoenix AZ”
- “med spa Phoenix AZ”
- “physical therapy clinic Phoenix AZ”
- “optometrist Phoenix AZ”
Repeat for cluster #2.

### What to capture
- Location name, phone, website, address, and if website shows it: office manager / front desk email.
- If no email visible: use contact form URL + keep phone for calling.

## 5) Day-1 outbound schedule (do it in blocks)
**Block A (List build):** 60–90 min → 70–100 leads captured.
**Block B (Email):** 60 min → send 50–100 emails.
**Block C (Calls):** 60–90 min → 20–40 calls + voicemails.
**Block D (Admin):** 30 min → log outcomes, set tasks, reply to inbound.

## 6) Cold email (plain text) — Version A (no-show ROI)
**Subject:** quick fix for no-shows at {{Company}}

Hi {{FirstName}},

I’m Bob. We help appointment-based locations reduce no-shows using **two-way SMS confirmations**, **instant reschedules**, and **waitlist fill** (so gaps get refilled automatically).

If you’re doing even 15–30 appointments/day, a small reduction in no-shows usually adds meaningful revenue without extra marketing.

Would you be open to a 10-minute look this week? If it’s not a fit, I’ll tell you in 2 minutes.

Info/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
You can reply here or email me: agent_bob_replit+no-show-bot@agentmail.to

– Bob

## 7) Cold email — Version B (office manager friendly)
**Subject:** confirm + reschedule texts (done for you)

Hi {{FirstName}},

Quick question—do you currently **text patients to confirm** and **make rescheduling easy** when they can’t make it?

We set up two-way SMS confirmations + auto-reschedule + waitlist fill in 24–48 hours (done-for-you). It’s designed for busy front desks.

Want me to show you what it looks like on a 10-min call?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

– Bob

## 8) 7-touch cadence (email/call/SMS)
**Day 1:** Email #1 + Call #1 (VM if no answer)
**Day 2:** Email #2 (short) + Call #2
**Day 4:** SMS #1 (if compliant / business line)
**Day 6:** Email #3 (case/ROI angle) + Call #3
**Day 9:** Email #4 (breakup)
**Day 14:** Call #4 + SMS #2 (final)
**Day 21:** Nurture email (new angle: waitlist fill)

### Email #2 (short bump)
Subject: re: no-shows at {{Company}}

{{FirstName}} — should I talk to you or whoever owns scheduling/confirmations?

We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill.

– Bob | agent_bob_replit+no-show-bot@agentmail.to

### Email #4 (breakup)
Subject: should I close the loop?

No worries if timing isn’t right. Should I close the loop on helping {{Company}} reduce no-shows with two-way confirmation + rescheduling?

If there’s someone else I should speak with, point me their way.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

## 9) Cold call opener + voicemail
**Opener (10 seconds):**
“Hi, is this {{FirstName}}? Hey {{FirstName}}, Bob here. I’m calling because we help clinics reduce no-shows using two-way SMS confirmations and instant reschedules. Who’s the best person to talk to about scheduling/no-shows?”

**If decision maker:**
“Got it. Quick question—about how many appointments do you run in a typical week, and do you have a sense of your no-show rate?”

**Voicemail (15 sec):**
“Hi {{FirstName}}, Bob here. We help appointment-based locations reduce no-shows with two-way SMS confirmations and instant reschedules. If you want, I can show you in 10 minutes. You can reach me at agent_bob_replit+no-show-bot@agentmail.to. Again, agent_bob_replit+no-show-bot@agentmail.to.”

## 10) SMS script (only where appropriate)
“Hi {{FirstName}} — Bob here. We help reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Open to a quick 10-min look? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

## 11) Qualification (ask in first 3 minutes)
1) Appointments per day/week?
2) No-show rate estimate?
3) Value per visit?
4) Who owns scheduling tools/process?
5) What system (Dentrix, ChiroTouch, Jane, Mindbody, etc.)?

## 12) Craigslist post (Variation 1)
**Title:** Reduce Appointment No-Shows (Two-Way Text Confirmations + Reschedule)

**Body:**
If you run an appointment-based location (dental, chiro, PT, med spa, optometry), we help reduce no-shows using two-way SMS confirmations, instant reschedules, and waitlist fill.

- Done-for-you setup in 24–48 hours
- Patients confirm by replying (two-way)
- If they cancel, we help refill gaps
- Simple analytics to estimate revenue recovered

See info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

## 13) FB Group value post (copy/paste)
“Question for clinic owners/managers: what’s your current no-show rate, and do you rely on calls or text to confirm?

I’m working on a simple system that uses two-way SMS confirmations + instant reschedules + waitlist fill to reduce gaps. Happy to share a checklist of the exact reminder timing that’s working best (no pitch). If you want it, comment ‘checklist’ and I’ll send it.

(Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 | agent_bob_replit+no-show-bot@agentmail.to)”