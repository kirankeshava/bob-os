# Week-1 Distribution Execution Kit (Tracking + Lead Sourcing + DM/Onboarding Scripts) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:17:59.899Z

---

## 1) Single Source of Truth Tracker (Google Sheets spec)
Create a Google Sheet with these tabs. This must be filled out for every outbound touch so we can compute booked calls and CAC by channel once spend starts.

### TAB A — OUTREACH_LOG
Columns (left to right):
1. Date
2. Channel (Upwork | Fiverr | Cold Email | LinkedIn DM | FB Group DM | Referral)
3. Campaign (e.g., CE_Dentist_Austin_MayW1)
4. Lead Name
5. Business Name
6. Niche (Dentist | Med Spa | HVAC | Plumber | Restaurant | etc.)
7. City/State
8. Website URL
9. Google Business Profile URL (if found)
10. Yelp URL (if found)
11. Contact Email
12. Phone
13. Decision Maker Name (if known)
14. Message Variant (A/B/C)
15. First Sent Timestamp
16. Follow-up #1 Date
17. Follow-up #2 Date
18. Reply? (Y/N)
19. Reply Type (Interested | Not now | Not a fit | OOO | Bounce)
20. Call Booked? (Y/N)
21. Call Date
22. Outcome (Pilot Started | Proposal Sent | Closed Won | Closed Lost)
23. Notes

Suggested formulas:
- Reply Rate by channel: =COUNTIFS(OUTREACH_LOG!B:B,"Cold Email",OUTREACH_LOG!R:R,"Y") / COUNTIF(OUTREACH_LOG!B:B,"Cold Email")
- Booked Call Rate by channel: =COUNTIFS(B:B,"Cold Email",T:T,"Y") / COUNTIF(B:B,"Cold Email")

### TAB B — PIPELINE
Columns: Lead/Company | Stage (Contacted/Responded/Call Booked/Pilot Started/Closed) | Next Step | Next Step Date | Owner (Bob) | Channel | Notes

### TAB C — METRICS_WEEKLY
Rows per week (Week 1, Week 2…). Columns:
- Touches (by channel)
- Replies (by channel)
- Calls booked (by channel)
- Showed calls (by channel)
- Pilots started (by channel)
- Closed-won (by channel)
- Time-to-first-response (avg)
- Notes/Decisions

### TAB D — COSTS (Week 2+)
Columns: Date | Channel | Item | Amount | Notes
This stays $0 in Week 1.

## 2) $0 Lead Sourcing Blueprint (50 leads in 60 minutes)
Goal: build a list of 50 local businesses with visible review volume and incomplete/slow owner responses.

### Priority niches (pick 2 per day)
- Dentists (high intent, high LTV)
- Med spas (reputation-sensitive)
- HVAC/Plumbing (lead-gen tied to trust)
- Roofing/Contractors (ratings matter)
- Restaurants (high volume; good for proof, often price-sensitive)

### How to pull leads fast (manual, no paid tools)
1. Open Google Maps.
2. Search: “[NICHE] near [CITY]” (example: “dentist near Austin”).
3. Filter mentally for: 3.5–4.6 rating OR recent negative reviews OR high volume (200+ reviews).
4. Click each listing:
   - Capture Business Name, Phone, Website.
   - Click “Reviews” and scan last 10 for negatives and whether owner responded.
   - If no/weak responses: mark as “High Priority”.
5. Find email:
   - Check website header/footer/contact page.
   - If missing, use contact form URL and send via form (log as “Cold Email” but note “via form”).
6. Optional: repeat on Yelp for the same niche.

Lead qualification quick score (0–5):
- (1) Recent review within 7 days
- (1) Negative review in last 30 days
- (1) Owner response rate appears <30%
- (1) High volume: 100+ reviews
- (1) Competitive niche (dentist/medspa/home services)
Prioritize 4–5 scores.

## 3) Outbound Message Pack (DM + Group + Onboarding) — includes legitimacy links
Always include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### LinkedIn DM (Variant A — direct + short)
Subject/first line: Quick idea to protect your Google reviews
Message:
“Hi {{FirstName}} — I help local businesses respond to Google/Yelp reviews in a brand-safe way (and escalate negatives fast). I noticed {{BusinessName}} has a few recent reviews where a timely response could help.

If you want, I can run this free for 7 days: draft/post replies + send an alert for any negative review + a weekly KPI snapshot.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email me: agent_bob_replit+review-bot@agentmail.to”

### LinkedIn DM (Variant B — proof-oriented)
“Hi {{FirstName}} — quick question: do you have someone actively replying to Google reviews within 24–48 hrs?

I run an AI-assisted ‘review reply + escalation’ autopilot for local businesses. Free 7-day pilot: you’ll see responses go out consistently, negatives get flagged immediately, and you get a simple weekly reputation report.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to”

### Facebook Group Comment (soft CTA)
“Happy to share a free template/process: we’ve been helping local businesses reply to Google/Yelp reviews faster (brand-safe tone) and escalate negative reviews so they don’t sit unanswered. If anyone wants a free 7-day pilot, info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 or email agent_bob_replit+review-bot@agentmail.to”

### Facebook Group DM (after they engage)
“Hey {{Name}} — saw your comment in {{GroupName}}. If you want, I can set you up with a free 7-day pilot: we draft/post Google/Yelp replies in your brand voice, flag negatives instantly, and send a weekly KPI report. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Best email if you prefer: agent_bob_replit+review-bot@agentmail.to”

## 4) Free 7-Day Pilot Onboarding Message (to convert interest fast)
Subject: Free 7-day Review Reply Autopilot — next steps
Body:
“Thanks — I can start your free 7-day pilot today.

What you’ll get during the pilot:
1) Brand-safe responses drafted for new Google/Yelp reviews (and posted if you approve access)
2) Negative review escalation (same-day alert + suggested resolution reply)
3) Weekly reputation KPI snapshot (new reviews, avg rating trend, response time, negative-review count)

To set up, reply with:
- Business name + location(s)
- Your Google Business Profile link (and Yelp link if you have one)
- Preferred brand voice (friendly/professional/clinical/etc.)
- Any phrases to avoid

If you’d rather send it all in one place, email me at agent_bob_replit+review-bot@agentmail.to.
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

## 5) Daily quotas (Week 1, $0)
- Cold Email/Form submits: 30/day
- LinkedIn DMs: 15/day
- FB group comments/DMs: 10 touches/day
- Upwork proposals: 10/day (once account is live)
- Fiverr Buyer Requests: 10/day (once account is live)

Rule: if any channel produces 0 booked calls by Day 7, pause it and reallocate effort to the highest reply-to-call channel. Log everything in OUTREACH_LOG so the decision is based on data, not vibes.
