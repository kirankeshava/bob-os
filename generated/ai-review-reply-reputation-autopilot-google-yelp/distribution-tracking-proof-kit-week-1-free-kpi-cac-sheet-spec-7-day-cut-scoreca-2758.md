# Distribution Tracking + Proof Kit (Week 1 Free): KPI/CAC Sheet Spec + 7-Day Cut Scorecard + Case Study Onboarding (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:06:27.326Z

---

Use this as the single source of truth for Week-1 distribution. It ensures every Upwork/Fiverr/cold email touch is attributable to a booked call, and every early customer can become proof.

BUSINESS LEGITIMACY LINKS (include in outreach + profiles)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

A) GOOGLE SHEETS TRACKER — TABS + COLUMNS (CREATE 1 SHEET)
TAB 1: Leads
Purpose: one row per company/lead regardless of channel.
Columns:
1 Lead_ID (format: YYYYMMDD-###)
2 Channel (Upwork | Fiverr | ColdEmail | LinkedIn | Referral)
3 Campaign (short string; examples below)
4 Company
5 Industry (Dentist | MedSpa | HomeServices | Restaurant | Other)
6 City/State
7 Website
8 Google Business Profile URL
9 Yelp URL
10 Contact Name
11 Role
12 Email
13 Phone
14 Rating (Google)
15 Review Count (Google)
16 Last Review Date
17 Pain Signal (No owner replies | Recent 1-star | High volume | Competitor outranking)
18 Status (Prospecting | Contacted | Replied | Call Booked | No Show | Trial Active | Won | Lost)
19 Last Touch Date
20 Next Follow-up Date
21 Notes

TAB 2: Touches
Purpose: one row per touch (proposal/email/follow-up/call/SMS).
Columns:
1 Touch_ID
2 Date
3 Lead_ID (data validation from Leads tab)
4 Channel
5 Touch Type (Proposal | Email1 | Email2 | Email3 | DM | Call | Voicemail | SMS)
6 Template Used (e.g., UPW-A, CE-1)
7 Outcome (Sent | Opened | Replied | Bounced | Call Booked | No Response)
8 Link to Message (URL or pasted snippet)
9 Owner (Bob)

TAB 3: Calls
Purpose: one row per scheduled call.
Columns:
1 Call_ID
2 Lead_ID
3 Date Scheduled
4 Date Held
5 Outcome (Held | No Show | Rescheduled)
6 Stage After Call (Trial Offered | Trial Started | Won | Lost)
7 Key Objection
8 Next Step + Date

TAB 4: Metrics (auto)
Create these cells/formulas (examples assume headers in row 1):
- Booked Calls (last 7 days): =COUNTIFS(Calls!C:C,">="&TODAY()-7)
- Held Calls (last 7 days): =COUNTIFS(Calls!D:D,">="&TODAY()-7,Calls!E:E,"Held")
- Show Rate (7d): =IFERROR(HeldCalls/BookedCalls,0)
- Replies (last 7 days): =COUNTIFS(Touches!A:A,"<>",Touches!B:B,">="&TODAY()-7,Touches!G:G,"Replied")
- Reply Rate by Channel (7d): for each channel, Replies(channel)/Touches Sent(channel)
- Time to First Response (manual): compute avg of (first reply date - first contact date) per lead.

Campaign naming convention (critical for CAC later):
Channel-Industry-Geo-Offer-Week
Examples:
- UW-Dentist-US-FreeTrial-W1
- FV-HomeServices-US-FreeTrial-W1
- CE-MedSpa-AZ-FreeTrial-W1

B) WEEKLY KPI TARGETS (WEEK 1, FREE)
Daily activity quotas (minimum viable):
- Upwork: 10–20 proposals/day
- Cold email: 20–40 new emails/day + follow-ups per sequence
- Fiverr: 1 live gig; respond to inquiries within 15 minutes during business hours

Leading indicators (review daily):
- Touches sent/day by channel
- Reply rate by channel (goal: Cold Email 3–8%; Upwork 5–15%)
- Time-to-first-response (goal: < 24 hours)
Lagging indicators (review daily + weekly):
- Booked calls (goal: 3–7/week by Day 7)
- Show rate (goal: 60%+)
- Trials started (goal: 1–3 by Day 7)

C) 7-DAY CUT / REALLOCATE SCORECARD (APPLY STRICTLY)
Run this review on Day 7 and every 7 days after:
For each channel (Upwork, Fiverr, Cold Email):
1 Did it generate at least 2 booked calls in the last 7 days?
- If NO: cut effort by 50% and reallocate that time to the best-performing channel.
- If YES: keep/increase effort; only then consider paid boosts/connects (Week 2+).
2 Is show-rate < 50%?
- If YES: tighten qualification + add SMS/confirmation step (free: email confirmation).
3 Is reply rate below threshold?
- Cold email < 2%: change niche list + subject lines + offer framing.
- Upwork < 5%: narrow job filters + rewrite first 2 lines of proposal.
4 Time-to-first-response > 24h?
- If YES: reduce channels, increase responsiveness; speed is a differentiator.

D) PROOF GENERATION — ONBOARDING + PERMISSION KIT (USE FOR TRIAL CUSTOMERS)
Goal: turn first 1–3 free trials into a case study + testimonial + before/after screenshots.

1) Intake questions (send via email from agent_bob_replit+review-bot@agentmail.to)
Subject: Quick setup for your Review Reply & Reputation Autopilot (10 minutes)
Body:
Hi {{Name}} — to set up your free 7-day trial, reply with:
1) Business name + address
2) Google Business Profile link (or tell me the exact name/city and I’ll find it)
3) Yelp business link (if applicable)
4) Who should be alerted on negative reviews? (name + email/phone)
5) Brand voice: (Friendly | Professional | Luxury | Casual) + any “never say” phrases
6) Top 3 services/products you want mentioned in positive-review replies
7) Any compliance constraints (HIPAA, legal, etc.)

You can see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2) Permission language (for testimonials/case study)
Add this line in the onboarding email:
“If you’re happy with the results, can we use anonymized screenshots of the before/after review responses (or your business name if you approve) as a short case study? Reply ‘yes, anonymized’ or ‘yes, with business name’.”

3) Case study outline (1 page)
- Client: (industry + city)
- Starting point: rating, review volume, % of reviews with owner responses, response time
- Intervention (7 days): # drafted replies, % posted, escalation workflow, brand voice rules
- Outcome: response coverage %, response time, sentiment notes, any recovered customers
- Client quote (2–3 sentences)

E) WHAT TO LOG FOR CREDIBILITY (SCREENSHOT CHECKLIST)
- Before: Google reviews page showing lack of replies + recent negatives
- After: same page showing consistent owner replies and a handled negative review
- Weekly KPI snapshot (from your report): response coverage %, avg response time, # escalations

This kit is ready to implement today. Next step is creating the free Upwork/Fiverr accounts and turning on the tracker so we can start generating booked calls immediately.