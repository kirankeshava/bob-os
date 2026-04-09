# Week-1 Outbound Execution Dashboard + HubSpot CSV Schema + Daily Task Queue (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T17:54:51.026Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (include in templates when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email for replies: agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): 40 demos booked / 25 locations closed. This document makes Week 1 measurable and executable.

1) WEEK-1 KPI DASHBOARD (daily + cumulative)
Create a Google Sheet with two tabs: (A) Daily KPIs, (B) Pipeline Snapshot.

A) Daily KPIs tab columns (one row per day)
- Date
- Leads Added (count)
- Emails Sent (manual send count)
- Email Replies (all)
- Positive Replies (interested / yes)
- Neutral Replies (later / ask info)
- Negative Replies (no / stop)
- Unsub/Stop Requests
- Calls Placed
- Live Connects
- Texts Sent (only if compliant)
- Demos Booked
- Demos Held
- No-Shows (to our demo)
- Deals Closed/Won
- Notes / Learnings

Core rates (add formula columns)
- Reply Rate = Email Replies / Emails Sent
- Positive Rate = Positive Replies / Email Replies
- Demo Book Rate = Demos Booked / Positive Replies
- Show Rate = Demos Held / Demos Booked
- Close Rate = Deals Closed/Won / Demos Held

Week-1 minimum performance targets (sanity thresholds)
- Reply Rate: 3–8% (below 2% = list/copy/deliverability issue)
- Positive Rate: 15–35%
- Demo Book Rate: 35–60%
- Show Rate: 70–85%

B) Pipeline Snapshot tab (update end of day)
- New (no touch)
- Touched (attempted)
- Replied (any)
- Interested
- Demo Booked
- Demo Held
- Closed Won
- Closed Lost
- Do Not Contact

2) HUBSPOT FREE CRM: PIPELINE + REQUIRED PROPERTIES
Pipeline stages (Contacts/Deals—choose one consistent system; simplest is Deals per location)
Deal stages:
1. Prospecting (not contacted)
2. Attempted Contact (sent email/called)
3. Replied (any reply)
4. Qualified (meets minimums)
5. Demo Scheduled
6. Demo Held
7. Trial/Setup Scheduled (7-day free)
8. Closed Won
9. Closed Lost
10. Do Not Contact

Required custom properties (create as Deal properties)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City
- Website URL
- Main Phone
- Contact Name
- Contact Title (Owner/Office Manager/Practice Manager/GM)
- Best Email
- Scheduling Software (Zocdoc, Calendly, Acuity, Jane, Mindbody, NexHealth, Other, Unknown)
- Appts per Week (numeric or range)
- No-Show Rate % (estimate)
- Value per Visit ($)
- Monthly No-Show Cost ($) = Appts per Week * 4 * No-Show Rate * Value per Visit
- Decision Maker Confirmed? (Y/N)
- Next Step (call / demo / follow-up date)
- Last Touch Type (Email/Call/Text/CL/FB)
- Last Touch Date

Strict logging standard (non-negotiable)
- Every outbound touch updates: Last Touch Type + Last Touch Date + a 1-line note.
- Every reply gets categorized (Positive/Neutral/Negative/Stop) in notes.
- Every demo booked must include date/time + meeting link.

3) HUBSPOT IMPORT: READY CSV SCHEMA
Create a CSV with exactly these columns (copy/paste header row):
Company Name,Website,City,State,Vertical,Main Phone,General Email,Contact First Name,Contact Last Name,Contact Title,Contact Email,Lead Source,Notes

Allowed values guidance:
- Lead Source: Google Maps, Website Contact Form, Yelp, Facebook Page, Chamber Directory, Craigslist Inbound
- Notes: include any quick personalization like “mentions same-day appointments” or “online booking available”.

4) WEEK-1 TASK QUEUE (DAY-BY-DAY)
Daily blocks (Mon–Fri):
- Block 1 (60–90 min): Build leads (20–40 new) + enrich (website + phone + email)
- Block 2 (60 min): Send 25–50 emails (plain text) + log as Attempted Contact
- Block 3 (60 min): Calls 10–20 + immediate follow-up email if voicemail
- Block 4 (45 min): Send next 25–50 emails + handle replies + book demos
- End-of-day (15 min): Update KPI sheet + pipeline snapshot

Cadence rules (per lead)
- Day 1: Email #1 + Call attempt
- Day 2: Email #2 (short bump) + Call attempt
- Day 4: Email #3 (case/ROI angle) + Call attempt
- Day 7: Breakup email (“should I close the file?”)
If any reply: stop sequence and move to reply-handling flow.

Craigslist
- 1–2 posts/week per city cluster. Post Day 2 and Day 6.
- Track inbound as Lead Source = Craigslist Inbound.

Facebook Groups
- 5–10 value comments/posts per week in local business / practice manager groups.
- CTA is soft: “If you want the reminder/confirmation workflow we use, email agent_bob_replit+no-show-bot@agentmail.to and I’ll send it.”

5) RAPID QUALIFICATION + ROI TALK TRACK (use in replies/calls)
Ask in order:
1) “Roughly how many appointments do you have per week?”
2) “What’s your no-show rate right now—best estimate?”
3) “What’s an average visit worth (or first visit)?”
4) “Who owns the scheduling system day-to-day—front desk manager, you, or someone else?”

ROI punchline (say out loud):
“If you’re doing ~X appointments/week, at Y% no-shows, and ~$Z per visit, that’s about $X*4*Y%*Z in lost revenue/month. Our two-way SMS confirmations + instant reschedules + waitlist fill typically recovers a meaningful chunk of that. We can set up a free 7-day trial in 24–48 hours.”

6) DEMO BOOKING MESSAGE (drop-in)
“Happy to show you in 10 minutes. We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Here’s our info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — reply with 2 times that work or email agent_bob_replit+no-show-bot@agentmail.to and we’ll lock it in.”

Execution note: We are Week 1 = free launch. Do not collect payment. Close is “schedule concierge onboarding + permission to measure recovered revenue,” then convert after trial later.