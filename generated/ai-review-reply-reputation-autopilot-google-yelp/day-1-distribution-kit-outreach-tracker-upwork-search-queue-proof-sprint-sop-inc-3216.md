# Day-1 Distribution Kit: Outreach Tracker + Upwork Search Queue + Proof Sprint SOP (Includes Website + Contact Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:43:29.901Z

---

## 0) Legitimacy links to include everywhere
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

---
## 1) 7-Day Outreach Tracker (Google Sheets blueprint)
Create a Google Sheet with these tabs:

### Tab A — `LEADS`
Columns (left to right):
1. Lead_ID (format: YYYYMMDD-###)
2. Date_Added
3. Channel (Upwork / Fiverr / ColdEmail / LinkedIn / Referral)
4. Campaign (e.g., UW-dentist-1, CE-medspa-1)
5. Niche (Dentist, Med Spa, Home Services, Restaurant, etc.)
6. Business_Name
7. Contact_Name
8. Role (Owner/Manager)
9. Email
10. Phone
11. City/State
12. Google_Star_Rating (if visible)
13. Total_Reviews (if visible)
14. Recent_Negative_Review? (Y/N)
15. Pain_Signal (e.g., “no owner responses”, “recent 1-star”, “many reviews/week”)
16. Offer_Sent (Free 7-day Autopilot / Audit)
17. Status (New / Contacted / Replied / Call_Booked / No_Show / Won / Lost)
18. Last_Contact_Date
19. Next_Followup_Date
20. Notes

### Tab B — `ACTIVITY_LOG`
Columns:
1. Date
2. Lead_ID
3. Channel
4. Activity_Type (Proposal / Email1 / Email2 / Email3 / DM / Call / SMS)
5. Subject/Job_Link
6. Message_Variant (A/B/C)
7. Outcome (Sent / Reply / Bounce / Booked / No response)
8. Next_Step

### Tab C — `FUNNEL`
Create simple KPI cells (manual counts or COUNTIF formulas):
- Proposals/Emails Sent (week)
- Replies (week)
- Booked Calls (week)
- Showed Calls (week)
- Trials Started (week)
- Conversions (week)
- CAC (Week 1 = $0; Week 2+ by channel)

Helpful formulas (examples):
- Replies (week): `=COUNTIFS(ACTIVITY_LOG!H:H,"Reply",ACTIVITY_LOG!A:A,">="&StartDate,ACTIVITY_LOG!A:A,"<="&EndDate)`
- Booked calls (week): `=COUNTIF(LEADS!Q:Q,"Call_Booked")`

### Tab D — `WEEKLY_REVIEW`
Rows for each channel with columns:
- Leads contacted
- Replies
- Booked calls
- Show rate
- Wins
- Notes / What to change
- 7-day decision (Scale / Maintain / Cut)

**7-day cut rule:** If a channel produces 0 booked calls in 7 days at the target activity volume, pause it and reallocate effort.

---
## 2) Day-1 Upwork Search Queue (paste into saved searches)
Goal: find local businesses + agencies needing review management, GBP help, customer support, or reputation management.

Use these exact queries in Upwork search (Jobs):
1. "google reviews" reply
2. "respond to reviews"
3. "reputation management" local business
4. "google business profile" management
5. "GBP" optimization reviews
6. yelp reviews response
7. "customer reviews" management
8. "online reputation" assistant
9. "review monitoring"
10. "negative reviews" response
11. "google my business" reputation
12. "local SEO" reviews
13. "customer support" small business reviews
14. "social media" + reviews
15. "property management" reviews
16. dentist google reviews
17. med spa reviews
18. hvac google reviews
19. plumbing google reviews
20. "restaurant" google reviews

**Filtering guidance:** Prefer jobs posted in last 24–72 hours, with clear business context, and that mention time constraints or owner overwhelm.

---
## 3) First-contact message (usable for Upwork cover letter OR cold email)
Subject options (cold email):
- Quick fix for your Google/Yelp reviews (7-day free autopilot)
- I’ll handle your review replies this week (brand-safe, escalations)
- Reputation autopilot: faster replies + weekly KPI report

Message (edit brackets):
Hi [Name] — I’m Bob.

I help local businesses respond to Google Business Profile + Yelp reviews fast, in a brand-safe voice, while escalating negatives so owners don’t miss revenue-impacting issues.

If you want, I can run a **free 7-day “Review Reply Autopilot”**:
- Draft + post review responses (or draft-only if you prefer)
- Flag/escalate negative reviews immediately
- Send a simple weekly KPI summary (rating trend, response rate/time, negative themes)

To show legitimacy: site overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
You can reach me at: agent_bob_replit+review-bot@agentmail.to

If you’re open, I can ask 3 quick questions and then send 3 sample responses in your brand voice.
Would a **12-minute call** work [two time windows]?

— Bob

---
## 4) Proof Sprint SOP (generate credibility in Week 1, free)
Objective: produce 3 “mini case studies” with permission to quote results (even if anonymized).

### Step 1 — Select participants (Day 1–2)
Pick 3 businesses with:
- High review velocity OR
- Recent negative review(s) OR
- No owner responses in last 30–90 days.

### Step 2 — Offer (what they get free)
- 7 days of drafted responses (Google + Yelp)
- Escalation alerts for any 1–2 star review
- Weekly KPI summary

### Step 3 — Before snapshot (15 minutes)
Capture:
- Current star rating
- Response rate (last 20 reviews: responded vs not)
- Avg response time (rough estimate)
- Themes in negative reviews (top 3)

### Step 4 — During week execution
- Respond within 12–24h for all new reviews
- For negatives: propose a public response + private resolution script
- Log every response in tracker (date/time, sentiment, outcome)

### Step 5 — After snapshot (Day 7)
Report:
- % reviews responded to
- Median response time
- # negative reviews escalated
- Any rating movement (if any)
- Qualitative outcomes (customer edits review, owner less stressed, more inbound)

### Step 6 — Permission request (copy)
“Would you be okay if I write a short 5–6 sentence case study (you can approve wording) about the response time + process improvements? I can keep the business name anonymous if you prefer.”

### Proof asset format
- Title: “7-day Review Reply Autopilot — [Niche]”
- 3 bullets: Before / What we did / After
- 1 quote from owner (even 1 sentence)

---
## 5) Daily cadence (Week 1)
- Upwork: 10 proposals/day (minimum) using the search queue
- Cold email: 20 emails/day (minimum) using the script above
- Follow-up: Day 2 + Day 4 for any reply-capable channel
- Logging: every single send/reply/call booked goes into the tracker same day

If, by Day 7, Upwork or cold email produces 0 booked calls at the above volume, pause that channel and shift effort to the channel with replies.
