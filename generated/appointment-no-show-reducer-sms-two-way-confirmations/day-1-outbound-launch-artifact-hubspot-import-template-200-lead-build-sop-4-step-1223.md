# Day-1 Outbound Launch Artifact: HubSpot Import Template + 200-Lead Build SOP + 4-Step Email Sequence + Reply Library + KPI Log

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:02:06.231Z

---

## 1) HubSpot Import Template (copy into Google Sheet, export CSV)
Use these exact columns to avoid rework later. Every record is a *Location* (not a person). Add contact info when available.

**Required columns (minimum viable):**
- Company Name
- Location Name (if different)
- Industry (Chiro / Med Spa / Dental)
- Website
- Google Maps URL
- Address
- City
- State
- Zip
- Main Phone
- Owner/Manager Name
- Owner/Manager Title (Owner/Office Manager/Practice Manager)
- Owner/Manager Email
- Secondary Email
- Notes (free text)
- Lead Source (Google Maps / Website / Directory)
- City Cluster (e.g., Phoenix / Dallas)
- Outreach Status (Not Contacted / Contacted / Replied / Demo Booked / Closed Won / Closed Lost)
- Last Touch Date
- Next Step

**Optional but helpful:**
- Booking Software (if visible: Zocdoc, Jane, Acuity, MindBody, Nextech, etc.)
- Appointment Type (e.g., hygiene, adjustment, facial)
- Estimated Appts/Week (guess if needed)
- No-show mention? (Y/N)

## 2) 200-Lead Build SOP (FREE sources; 2 city clusters x 3 verticals)
Goal: 200 locations in 2–3 hours without paid tools.

**Pick 2 city clusters (example):**
- Cluster A: Phoenix, AZ
- Cluster B: Dallas, TX

**Verticals (highest fit):**
- Chiropractor
- Med Spa
- Dentist

**Step-by-step:**
1) Open Google Maps. Search: “chiropractor Phoenix AZ”
2) Open each listing in a new tab. Capture into sheet:
   - Company name, phone, address, website, maps URL.
3) Click website. Look for contact page / footer email. Capture any of:
   - office@, info@, scheduling@, admin@, manager@, or a real name.
4) If no email shown, use website contact form URL and note: “No email; use contact form”. (Still import—call-first later.)
5) Repeat until you have 35–40 locations per vertical per city cluster.
   - 2 cities x 3 verticals x ~35 = ~210 leads.
6) De-dupe by website + phone.
7) Prioritize for day-1 sending:
   - Has email + phone + online booking visible.

**High-speed search strings (Google Maps or Google):**
- “chiropractor” + city
- “med spa” + city
- “cosmetic dentistry” + city
- Google web search operators:
  - med spa "City" "contact" "@"
  - chiropractor "City" "@" "office"
  - dentist "City" "@" "appointment"

## 3) Cold Email Sequence (4 steps, plain text)
**From/Reply-to:** agent_bob_replit+no-show-bot@agentmail.to
**Legitimacy link to include:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

### Subject line options (rotate):
1) quick question about no-shows at {{clinic}}
2) filling last-minute cancellations at {{clinic}}
3) two-way SMS confirmations (done-for-you)
4) reduce no-shows by text (24–48h setup)
5) are you the right person for scheduling?
6) waitlist fills when someone cancels

### Email 1 (Day 1)
Hi {{first_name}},

Do you handle scheduling/confirmations for {{clinic}}?

We help appointment-based practices reduce no-shows using two-way SMS confirmations (patients confirm/cancel), instant reschedule links, and optional waitlist fills to plug gaps.

It’s done-for-you setup in 24–48 hours. If you’re open to it, I can show you in 10 minutes and estimate recovered revenue per month based on your appt volume.

Want to see it this week?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply: agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (Day 3) – value + question
Hi {{first_name}},

Most locations we talk to already send reminders, but they’re one-way. The difference with two-way is it forces a clear “Yes I’m coming / No, reschedule” and frees up time to fill the slot.

Two questions so I don’t waste your time:
1) Roughly how many appointments do you have per week?
2) Any guess on no-show % (even a range)?

If it’s easier, I can just show you the workflow and you tell me if it fits.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

### Email 3 (Day 6) – social proof style without claiming logos
Hi {{first_name}},

When patients cancel last minute, most practices just eat the loss. Our flow immediately offers a reschedule option and can notify a small waitlist to fill open slots.

If no-shows/cancels aren’t a priority right now, tell me and I’ll close the loop.
If it *is* a priority, is 10 minutes on {{two_time_options}} doable?

– Bob
Reply: agent_bob_replit+no-show-bot@agentmail.to

### Email 4 (Day 10) – breakup
Hi {{first_name}},

Should I:
A) talk to you about reducing no-shows at {{clinic}}, or
B) who owns scheduling/operations there?

Either way is helpful.

– Bob

## 4) Reply Library (copy/paste)
**Positive:**
Awesome—happy to. What does your schedule look like Tue–Thu for a quick 10-minute walkthrough? If you share approx appts/week + avg $/visit, I’ll estimate recovered revenue.

**Not the right person:**
Thanks—who’s best for scheduling/ops? If you can intro me (email), I’ll keep it brief.

**“We already have reminders” objection:**
Totally. Quick question: are yours two-way (patient confirms/cancels) and do they automatically offer reschedule + waitlist fill? That’s usually where the incremental recovery comes from.

**Price asked:**
Depends on locations + volume, but it’s typically priced per location/month. If you share appts/week and no-show %, I’ll give you a clear number after a 10-minute demo.

**Stop/unsubscribe:**
Understood—sorry about that. I won’t email you again.

## 5) Day-1 Execution Schedule + KPI Log (minimum viable)
**Day-1 blocks:**
- 9:00–10:30: Build 40–60 leads + find emails/phones
- 10:30–11:30: Send 25–40 emails (personalized first line if possible)
- 1:00–2:00: Calls block #1 (10–20 dials)
- 2:00–3:00: Send remaining emails to hit 50–100 total
- 4:00–5:00: Calls block #2 (10–20 dials) + follow-up texts where compliant

**Daily KPI log fields:**
- Emails sent
- Email replies (positive/neutral/negative)
- Calls placed
- Live connects
- Demos booked
- Demos held
- Closed won
- Closed lost + reason
- Notes: biggest objection of the day + iteration to script

This artifact is ready to execute immediately: build the first 200 leads with the SOP, import into HubSpot with the columns above, and start day-1 sending/calling while logging KPIs daily.