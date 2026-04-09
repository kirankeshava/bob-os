# Lead Sourcing Engine v1 — Dental/Ortho (Schema + SOP + Cold Email Sequences + CRM Sheet Spec + Posting Ops)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:48:51.222Z

---

## 1) Lead List Schema (CSV/Sheets Columns + Allowed Values)
Use this schema so every lead is actionable for outbound (email + phone + next step). Columns:

**Identity & location**
1. lead_id (auto: YYYYMMDD-###)
2. practice_name
3. vertical (Dental | Orthodontist)
4. num_locations (1 | 2-5 | 6+ | Unknown)
5. address_full
6. city
7. state_province
8. zip_postal
9. country
10. google_maps_url
11. website_url
12. yelp_url (optional)

**Contact & decision maker**
13. main_phone (required)
14. secondary_phone (optional)
15. decision_maker_name (Owner | Dentist | Practice Manager | Office Manager | Unknown)
16. decision_maker_title (Owner/Dentist | Practice Manager | Office Manager | Admin Lead | Unknown)
17. email_1 (required if found)
18. email_1_type (Owner | Manager | Frontdesk | Info | Unknown)
19. email_1_source (Website | Google | Yelp | Directory | Social)
20. email_2 (optional)
21. email_2_type
22. email_2_source

**Signals & qualifying notes**
23. online_booking (Yes | No | Unknown)
24. booking_vendor (NexHealth | Zocdoc | Weave | Solutionreach | Dentrix | Eaglesoft | Other | Unknown)
25. sms_mention_on_site (Yes | No | Unknown)
26. reviews_count (number)
27. rating (number)
28. hours_listed (Yes | No)
29. notes (free text: e.g., “Open Saturdays”, “New patient promo”, “Hiring front desk”)

**Outbound operations**
30. status_stage (New | Enriched | Contacted | Engaged | Demo Booked | Trial Active | Won | Lost | Nurture)
31. last_touch_date
32. next_touch_date
33. channel_last_touch (Email | Phone | SMS | Craigslist | FB Group | Upwork | Other)
34. cadence_day (0–14)
35. owner (Bob)

### QA rules (non-negotiable)
- **Phone required** for every row (main_phone). If missing, do not include.
- **Email strongly preferred**. If no direct email found, include only if website exists and has a contact form AND the practice looks high-quality (reviews_count > 20 OR rating >= 4.2). Mark email fields blank and set status_stage=Enriched with note “needs email find”.
- No duplicates: de-dupe by website_url or main_phone.
- Verify website is not broken; if broken, keep only if Google Maps listing is strong (rating/reviews).

---

## 2) Lead Sourcing SOP (Daily Engine to Reach 400–800/Month, 20–25 Closes/30 Days)
Goal: produce **20–40 high-quality leads/day** (email+phone) and keep CRM clean so outbound can run daily.

### Tools (free-first)
- Google Maps (primary)
- Yelp (secondary)
- Practice websites (contact page + team page)
- State dental association directories (as available)
- Hunter/Apify/etc are optional later; do not require spend in Week 1.

### Daily quota plan (recommended)
- 1 hour: collect 20 leads (phone + website + maps link)
- 1 hour: enrich to find emails for 12–15 of those leads
- 30 min: QA + import into CRM + schedule next touches

### Step-by-step
1) **Pick a metro** (rotate): choose 5–10 US/Canada metros/day.
2) Google Maps query strings (copy/paste):
   - “dentist near me” then set location to target city
   - “family dentistry + [CITY]”
   - “orthodontist + [CITY]”
   - “cosmetic dentist + [CITY]”
3) Filters (manual heuristics):
   - Prioritize independent practices: avoid obvious DSOs (Aspen, Heartland, etc.).
   - Prefer 4.2+ rating OR 20+ reviews.
   - Prefer websites with online booking or clear “Request Appointment”.
4) Capture base fields: practice_name, address, phone, website, maps URL, rating, reviews.
5) Email extraction (website):
   - Check footer + Contact page (look for email, not just form).
   - Check “Team” / “About” pages for manager names.
   - If no email, use pattern guess only if domain is clear (e.g., info@domain) and mark email_1_type=Info, email_1_source=Website Guess.
6) Decision maker targeting:
   - If the site lists staff: capture **Office Manager** or **Practice Manager** name.
   - If only doctors listed: capture lead dentist/owner name.
7) Booking vendor signals:
   - Note if site uses NexHealth/Zocdoc/Weave/Solutionreach widgets.
8) QA + stage:
   - If phone+email present → status_stage=New.
   - If phone present, email missing but website strong → status_stage=Enriched.
9) Import into CRM tab “Leads” and auto-set next_touch_date = today.

---

## 3) Cold Email Sequences (Owner + Office Manager)
**Legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Reply-to/Contact:** agent_bob_replit+no-show-bot@agentmail.to

### 3A) Sequence A — Owner/Dentist (4 touches)
**Email A1 (Day 1)**
Subject options:
1) “Quick idea to cut no-shows at {{Practice}}”
2) “{{City}} dental no-show question”
3) “Reducing last-minute cancellations (no new software?)”

Body:
Hi {{FirstName}},

I’m Bob. I’m building a simple SMS reminder + two-way confirmation system that’s designed specifically to reduce dental/ortho no-shows and last‑minute cancels.

It does 3 things:
- Sends smart reminders (text)
- Collects “Confirm / Reschedule” replies (two-way)
- Helps fill gaps from a waitlist when someone cancels

If you’re open to it, I can set up a **free 7‑day trial** for {{Practice}} and quantify the recovered revenue per week.

Would you be the right person to approve something like this, or is that your office manager?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email A2 (Day 3)**
Subject: “Worth a quick test at {{Practice}}?”

Hi {{FirstName}},

Sanity check: is reducing no-shows currently a priority for {{Practice}}?

If yes, I can run a 7-day free pilot where patients can reply by text to confirm or reschedule (so your team isn’t chasing voicemails).

If you tell me who owns scheduling ops, I’ll send a 2-minute setup checklist.

– Bob

**Email A3 (Day 7)**
Subject: “What happens when a patient replies ‘reschedule’?”

Hi {{FirstName}},

One detail that tends to matter: when a patient replies “reschedule,” we can automatically route it so your team gets a clear next step (instead of a dead-end reminder).

If you want, I’ll set this up for {{Practice}} as a free 7-day trial and share the recovered-appointment estimate.

Are you open to a 10-minute walkthrough?

– Bob

**Email A4 (Day 12)**
Subject: “Close the loop?”

Hi {{FirstName}},

Should I (1) reach out to your office manager instead, or (2) circle back next month?

If you reply with the best contact, I’ll send details + the free trial plan.

– Bob

### Reply handling (Owner)
- If “not interested”: ask 1 question: “Understood—are no-shows already low, or is there another reason?” then stop.
- If “send info”: send the website link + 3 bullets + ask for preferred phone number for texting test.
- If “talk to manager”: immediately pivot to Sequence B with manager’s name.


### 3B) Sequence B — Office/Practice Manager (5 touches)
**Email B1 (Day 1)**
Subject options:
1) “Two-way SMS confirmations for {{Practice}} (free pilot)”
2) “Cutting no-shows without more calls”
3) “Filling schedule gaps from a waitlist”

Body:
Hi {{FirstName}},

I’m Bob. Quick note: I’m running a free pilot of an SMS reminder system that lets patients reply **CONFIRM** or **RESCHEDULE** (two-way), and it can optionally notify a waitlist to fill gaps.

If you’re the person who owns schedule integrity/no-shows at {{Practice}}, I can set up a **7-day free trial** and then share:
- confirmation rate
- reschedule rate
- estimated recovered chair time / revenue

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a 10-minute setup call this week?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email B2 (Day 2)**
Subject: “Do you text patients today?”

Hi {{FirstName}},

Do you currently text patients for reminders, or is it mostly calls/emails?

If you reply with just “text” or “no text,” I’ll tell you the simplest pilot setup for {{Practice}}.

– Bob

**Email B3 (Day 4)**
Subject: “Pilot setup = 3 inputs”

Hi {{FirstName}},

Pilot setup is lightweight. I only need:
1) reminder timing (e.g., 72h + 24h)
2) your reschedule routing preference
3) whether you want waitlist gap-fill on/off

If you want, we can start with only confirmations (lowest friction) and add reschedules later.

Want me to send the 2-minute checklist?

– Bob

**Email B4 (Day 8)**
Subject: “Example message (patients reply)” 

Hi {{FirstName}},

Example patient text:
“Reminder: {{Practice}} appt tomorrow at 2:00pm. Reply 1 to confirm or 2 to reschedule.”

This tends to cut down the day-before scramble.

If you’re open, I can run this free for 7 days and share results.

– Bob

**Email B5 (Day 13)**
Subject: “Close the loop for now?”

Hi {{FirstName}},

Should I close this out, or is there a better time to test a no-show reducer at {{Practice}}?

If you reply with a month/week, I’ll follow up then.

– Bob

---

## 4) CRM in Google Sheets — Template Spec (Tabs, Columns, Dropdowns)
Create a Google Sheet with 4 tabs:

### Tab 1: Leads
Columns (match schema above), plus:
- created_date
- source (Google Maps | Yelp | Directory | Craigslist inbound | FB inbound | Upwork inbound)
- priority (High | Med | Low)

Dropdown: status_stage = New, Enriched, Contacted, Engaged, Demo Booked, Trial Active, Won, Lost, Nurture.

Formula suggestions:
- next_touch_date default: if blank and status_stage in (New, Enriched) then TODAY()
- aging_days: =TODAY()-DATEVALUE(created_date)

### Tab 2: Activity Log
- activity_id
- lead_id
- date
- channel
- action (Sent Email | Called | Left VM | Sent SMS | Posted CL | Posted FB | Received Reply | Booked Demo)
- outcome
- notes

### Tab 3: Pipeline Dashboard
- Count by stage (pivot)
- Demos booked this week
- Replies this week
- Trials active

### Tab 4: Sequences
Paste Sequence A and B with day numbers, subject, body, and “send on day” rules.

---

## 5) Craigslist + FB Groups Posting Ops
### Craigslist schedule template (rotation)
- Post 1x/day per metro in “small business ads” or “services > business” (where allowed).
- Rotate 6 metros/week; do not repost identical copy within 48–72 hours.
- Use 3 variants of headline + first sentence.
- Always include legitimacy URL and contact email.

**CL headline variants**
1) “Free pilot: reduce appointment no-shows (two-way SMS confirmations)”
2) “Appointment-based business? Fill last-minute cancellations (free trial)” 
3) “Stop no-shows: patients confirm/reschedule by text (7 days free)” 

### FB Groups compliance checklist
- Join groups relevant to: dental office managers, local small business, practice management, local city entrepreneur groups.
- Read rules: some ban links; if banned, post without link and offer to DM the overview.
- Do not mass-tag people. Do not copy/paste identical text across groups.
- Use value-led angle: offer a free “No-show baseline calculator” + free pilot.
- Always respond to comments within 2 hours if possible.

**FB post core CTA**
“If you comment ‘pilot’, I’ll DM you the overview + set up a free 7-day trial.”

---

If you want this converted into a ready-to-import Google Sheet (with headers + dropdown values), I can output the exact first-row header line and stage list format next cycle, along with the first 150–200 compiled leads using this schema.