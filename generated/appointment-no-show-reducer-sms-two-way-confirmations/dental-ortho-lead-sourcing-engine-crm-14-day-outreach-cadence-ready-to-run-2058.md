# Dental/Ortho Lead Sourcing Engine + CRM + 14-Day Outreach Cadence (Ready-to-Run)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:29:51.161Z

---

BUSINESS CONTEXT (use in all outreach)
Offer: Appointment No-Show Reducer (SMS + two-way confirmations + reschedule + waitlist fill + basic analytics).
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

1) LEAD LIST SCHEMA (Google Sheets/CSV columns)
A. Required identity
- lead_id (auto)
- practice_name
- vertical (Dental / Ortho)
- locations_count (1–5)
- street
- city
- state
- zip
- country
- google_maps_url
- website_url
- main_phone

B. Decision maker / contact routing
- contact_type (Owner / Dentist / Practice Manager / Office Manager / Front Desk)
- contact_name
- contact_title
- contact_email
- alt_email (info@, scheduling@, admin@)
- contact_phone_direct (if present)

C. Appointment + fit signals (fast qualifying)
- online_booking (Y/N)
- booking_vendor (Zocdoc / NexHealth / Solutionreach / Doctible / Weave / LocalMed / Other / Unknown)
- hours_listed (Y/N)
- reviews_count
- rating
- accepts_new_patients (Y/N/Unknown)
- multi_provider (Y/N)

D. Outreach tracking fields (minimum viable CRM)
- stage (dropdown; see section 2)
- last_touch_date
- next_touch_date
- touch_count
- channel_last (Email/SMS/VM/CL/FB/Upwork)
- email_status (Unknown/Valid/Risky/Bounced)
- notes

2) CRM PIPELINE (stages + rules)
Stages (dropdown values):
1. New (not contacted)
2. Researched (contact verified; ready to send)
3. Contacted – Touch 1
4. Contacted – Touch 2
5. Engaged (reply/questions)
6. Booked Demo
7. No-Show for Demo (reschedule)
8. Trial Started (7-day free)
9. Won (convert after trial)
10. Lost (not fit/closed)
11. Nurture (later)

Stage movement rules:
- New → Researched only when website_url + at least one email OR confirmed contact form exists.
- Any bounce: set email_status=Bounced and immediately pivot to alt_email/contact form + phone/SMS.
- Engaged means a human reply OR phone conversation OR explicit “send details”.
- Booked Demo requires confirmed time + calendar entry.
- No-Show for Demo triggers same-day reschedule SMS + next-day email.

3) LEAD QA + ENRICHMENT RULES (keep list usable)
- Must have: practice_name + city/state + main_phone + website_url OR google_maps_url.
- Email priority order:
  1) Direct manager email (best)
  2) Office manager/front desk email
  3) info@/contact@ (acceptable)
  4) Contact form only (mark contact_email = “FORM_ONLY”)
- Deliverability heuristics (free):
  - If domain is a real practice domain (not only facebook page), mark email_status=Risky unless obvious.
  - Avoid scraping obvious spam-traps like “abuse@”, “postmaster@”.
- Fit filters to focus effort:
  - Reviews_count > 20 OR multi_provider=Y OR online_booking=Y indicates enough volume to care about no-shows.
  - Exclude: hospital systems, universities, corporate chains >5 locations.

4) FREE-TOOLS LEAD SOURCING SOP (to hit 400–800)
Goal: 400–800 leads/month in 1 vertical with decision-maker routing.

Daily quota suggestion (solo operator):
- 30–50 net-new leads/day (Mon–Fri) = 600–1,000/month.

Source stack (free tiers only):
- Google Maps (primary)
- Yelp (secondary)
- Practice websites (email extraction)
- State dental association directories / “Find a dentist” pages (when public)

Step-by-step SOP:
1) Choose 10–15 metros with high density (example set): Phoenix, Dallas, Houston, Austin, San Antonio, Tampa, Orlando, Miami, Atlanta, Charlotte, Nashville, Denver, Las Vegas, Los Angeles, San Diego.
2) Google Maps queries (copy/paste patterns):
   - “dentist near [CITY, ST]”
   - “family dentistry [CITY]”
   - “orthodontist [CITY]”
   - “pediatric dentist [CITY]”
   - “cosmetic dentist [CITY]”
3) For each listing:
   - Capture practice_name, phone, address, website, rating, reviews_count, maps_url.
   - Open website → look for Contact/About/Team.
   - Capture contact_email. If no email, capture contact form URL and mark FORM_ONLY.
   - Capture any booking vendor clues: “Book Online” buttons, embedded widgets (NexHealth, Weave, Solutionreach, LocalMed).
4) Yelp pass (if website missing): use Yelp to find official website and main phone.
5) Enrichment pass (fast):
   - If only info@ exists, try staff page to find manager name; if not, set contact_type=Office Manager.
6) Quality gate:
   - If no website AND no email AND no form, keep only if phone is valid and reviews_count indicates activity.

5) 14-DAY OUTREACH CADENCE (Email + SMS + VM)
General rules:
- Use the legitimacy URL in at least the first email and any “details” response.
- Always offer 7-day free trial (Week 1 policy).
- CTA = “Can I set this up for one location this week?” + booking option.
- If you don’t have a booking link yet, use: “Reply with 2 times that work and I’ll send a calendar invite.”

Day 1 – Email #1 (Owner/Doctor)
Subject options:
A) “Quick question about no-shows at {{Practice}}”
B) “Reducing dental no-shows (free setup)”
Body:
Hi {{FirstName}},

I’m Bob. We built a simple SMS reminder + two-way confirmation flow that reduces appointment no-shows and makes it easy for patients to reschedule so you can backfill from a waitlist.

If you’re open to it, I can set this up free for 7 days for {{Practice}} and show you the recovered appointments + estimated revenue.

Are you the right person to speak with, or is that your office manager?

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Day 2 – SMS #1 (if mobile/permission plausible; otherwise skip)
“Hi {{Name}}, Bob here — I emailed about a free 7-day setup to reduce no-shows + automate confirmations for {{Practice}}. Want me to send a 2-min overview link?”

Day 3 – Email #2 (Office Manager variant)
Subject: “For the schedule at {{Practice}}”
Hi {{FirstName}},

Do you handle appointment reminders/confirmations for {{Practice}}?

We help practices cut no-shows using SMS reminders with two-way confirmations (Confirm/Reschedule) and a waitlist fill flow for last-minute gaps. Free 7-day trial; minimal setup.

If you reply with your reminder workflow (manual calls? texts? software?), I’ll tell you what we can automate.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Day 4 – Voicemail (30 sec)
“Hi this is Bob. I’m reaching out because we’re helping dental offices reduce no-shows with two-way SMS confirmations and easy rescheduling so gaps get filled. I sent an email—if you want, I can set it up free for a week and show the impact. Call me back at {{YourNumber}} or reply to my email. Thanks.”

Day 6 – Email #3 (proof/metric framing)
Subject: “Worth recovering 1–2 appts/week?”
Hi {{FirstName}},

Most offices only need to recover 1–2 appointments per week for this to be worth it.

Would you like me to set up the free 7-day trial for {{Practice}} so you can see confirmations + reschedules + any backfilled slots?

If yes, tell me:
1) Your appointment system (or “not sure”)
2) Your usual no-show problem area (hygiene? consults?)

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Day 8 – SMS #2
“Hi {{Name}} — should I close the loop on the no-show reducer for {{Practice}}, or is it better to talk next week?”

Day 10 – Email #4 (breakup)
Subject: “Close the loop?”
Hi {{FirstName}},

I haven’t heard back—totally okay if timing is bad.

Should I:
A) Set up the free 7-day trial for one provider, or
B) Check back in 30 days?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Day 12 – Call attempt + short VM
“Bob again—just trying to find the right person for reminders/confirmations. Happy to do a free 7-day setup. My email has details.”

Day 14 – Email #5 (last touch + referral)
Subject: “Who handles reminders at {{Practice}}?”
Hi {{FirstName}},

Last note from me—if you’re not the right person, who handles appointment reminders/confirmations and reschedules?

Even a name/email helps and I’ll reach out directly.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

6) REPLY HANDLING (copy/paste)
If “Interested / tell me more”:
“Great—what system do you use for scheduling (Dentrix/Eaglesoft/OpenDental/etc.) and how do you remind patients today? If you share that, I’ll suggest the simplest setup. Also, what 2 times work this week for a 10-min walkthrough?”

If “We already use {{Vendor}}”:
“Perfect—then we can either complement it (two-way confirm + reschedule + waitlist fill) or replace pieces that aren’t working. What’s the biggest pain: no-shows, last-minute cancels, or staff time on confirmations?”

If “Not interested”:
“No worries—before I close out, is it because no-shows aren’t a problem, or you’re already satisfied with your reminder workflow?”

7) DAILY SENDING PLAN (warmup-safe, free-first)
- Week 1: 10–20 cold emails/day per inbox; prioritize quality; avoid attachments.
- Week 2: 25–40/day if bounce rate <3% and replies coming.
- Always mix in genuine manual sends (Gmail-style) if possible.
- If using a new domain later: SPF/DKIM/DMARC must be set before sending volume.

8) GOOGLE SHEETS CRM SETUP (quick)
Create one sheet tab “Leads” with columns:
- Date Added | lead_id | practice_name | city | state | website_url | main_phone | contact_name | contact_title | contact_email | email_status | stage | last_touch_date | next_touch_date | touch_count | notes | source
Data validation dropdown for stage (use section 2).
Filter views by: stage=New, stage=Researched, next_touch_date=today.

This document is ready to execute immediately: collect leads using the SOP + schema, paste into Sheets, and run the 14-day cadence while tracking stage and next_touch_date.