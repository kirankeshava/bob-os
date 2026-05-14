# KPI/CAC Tracker + Proof Generation Runbook (Week 1 Free, Week 2+ $850 Switch Plan)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:14:50.570Z

---

## 1) Source-of-truth tracker (Google Sheets) — build exactly like this
Create a Google Sheet named: **Reputation Autopilot — Growth Tracker**.

### Tab A — "Leads"
**Purpose:** Every outbound touch + inbound reply is logged here once, then updated through booked call/close.

**Columns (left to right):**
1. Lead_ID (formula: ="L-"&TEXT(ROW(A2)-1,"0000"))
2. Date_Added
3. Channel (Upwork / Fiverr / Cold Email / LinkedIn / Referral)
4. Campaign (naming rule below)
5. Niche (dentist/medspa/HVAC/etc.)
6. Business_Name
7. Contact_Name
8. Role (owner/manager/frontdesk)
9. Email
10. Phone
11. City
12. Review_Platforms (Google, Yelp, both)
13. Current_Rating (if visible)
14. Review_Volume_Last30 (estimate)
15. Offer_Sent (Y/N)
16. Last_Touch_Date
17. Touch_Count
18. Status (Prospecting / Replied / Qualified / Call Booked / No Show / Trial Active / Won / Lost)
19. Call_DateTime
20. Call_Result (Qualified/Not qualified)
21. Trial_Start
22. Trial_End (Trial_Start+7)
23. Outcome (Won/Lost/Pending)
24. Notes

**Useful formulas:**
- Days since last touch: =TODAY()-Last_Touch_Date
- Auto-trial end: =IF(Trial_Start<>"",Trial_Start+7,"")

### Tab B — "Activity"
**Purpose:** Daily activity quotas by channel (so we can correlate volume to calls).

Columns:
- Date
- Channel
- Proposals_Sent (Upwork)
- DMs_Sent (Fiverr)
- Emails_Sent (cold)
- Replies
- Calls_Booked
- Calls_Attended
- Trials_Started

### Tab C — "Costs" (Week 1 = $0; Week 2+ logs actual spend)
Columns:
- Week_Start
- Channel
- Spend_USD
- Notes

### Tab D — "KPI Dashboard"
**Weekly KPIs (by channel + total):**
- Reply rate = Replies / Messages_Sent
- Booked call rate = Calls_Booked / Messages_Sent
- Show rate = Calls_Attended / Calls_Booked
- Trial start rate = Trials_Started / Calls_Attended
- Close rate = Won / Trials_Started
- CAC (when spend exists) = Spend / Won
- Cost per booked call (when spend exists) = Spend / Calls_Booked

**7-day cut rule (core):** If a channel has **< 2 booked calls in 7 days** AFTER meaningful volume (Upwork 70 proposals, cold email 200 sends, Fiverr 30 inquiries), pause it and reallocate.

### Campaign naming convention (mandatory)
Format: **[Channel]-[Niche]-[Geo]-[Angle]-[Week]**
Example: **ColdEmail-Dentist-Austin-ReplySpeed-W1**

---
## 2) Proof generation plan (Week 1 free) — get credibility fast
### Goal
Generate **2–3 case studies** in 7 days showing time saved + response quality + escalation handling, plus a weekly KPI report screenshot to use on Upwork/Fiverr.

### Case study offer (free)
Message positioning (use everywhere, always include legitimacy links):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

**Offer:** “7-day Reputation Autopilot trial: we draft brand-safe replies to every new Google/Yelp review, flag urgent negatives within 15 minutes, and send a weekly KPI report. No cost this week.”

### Eligibility criteria (prioritize)
- 10+ reviews/month OR at least 3 reviews/week
- Rating between 3.2–4.6 (room to improve)
- Owner/operator reachable and willing to share before/after screenshots

### Trial success metrics (what we report)
- Response rate (responses / total reviews)
- Median response time
- # negative reviews escalated within SLA (target: <15 minutes)
- Sentiment trend (simple: positive/neutral/negative counts)
- “Saved time” estimate (minutes per response x count)

### Standard weekly KPI report (1-page template)
Title: **Weekly Reputation KPI Report — [Business Name] — Week of [Date]**
Sections:
1) Overview: Total reviews received, responses posted, response rate
2) Speed: Median response time; fastest; slowest
3) Sentiment: Positive / Neutral / Negative counts
4) Escalations: # flagged; resolution notes; recommended next steps
5) Highlights: 2 best customer quotes + drafted responses
6) Next week plan: 3 bullet improvements (tone, keywords, offer recovery)

Deliver report as PDF or email body + attach screenshots (allowed by platform policies).

---
## 3) $850 deployment plan (Week 2+ switch-over, only after Week 1 signals)
**Rule:** No spend unless Week 1 produces at least **3 qualified conversations** OR **1 booked call** from a channel.

### Line items
1) Upwork connects + boosting — **$300**
- Trigger: 2+ replies and 1+ booked call from organic proposals
- KPI: Cost per booked call <= $60 within 7 days

2) Fiverr promoted gigs/test — **$100**
- Trigger: Gig live + at least 5 inquiries organically
- KPI: Cost per inquiry <= $10; cost per booked call <= $50

3) Cold email infrastructure — **$200**
- Trigger: Cold email reply rate >= 3% on free sending
- KPI: booked call rate >= 0.5% of sends; maintain deliverability

4) Testimonial/proof incentives — **$100**
- Trigger: 2 businesses complete 7-day trial and agree to quote/screenshot
- KPI: 2 publishable testimonials or 1 full case study

5) SMS/alerts tooling for MVP — **$100**
- Trigger: at least 1 active trial needing real-time negative review escalation
- KPI: escalation delivery < 2 minutes; owner acknowledges within 30 minutes

---
## 4) Weekly review cadence (non-negotiable)
### Daily (15 minutes)
- Update Activity tab with yesterday’s volume
- Update Leads statuses (Replied/Qualified/Booked)
- Enforce follow-up rules (2 follow-ups per lead max unless engaged)

### Day 3 checkpoint
- If reply rate < 2% on cold email: change subject lines + tighten targeting
- If Upwork view rate is low: rewrite first 2 lines of proposals

### Day 7 cut/reallocate meeting (30 minutes)
For each channel:
1) Volume achieved?
2) Booked calls achieved?
3) If NO booked calls and volume threshold met → cut channel for next week.
4) Reallocate time (Week 1) or budget (Week 2+) to the best-performing channel.

---
## 5) Tooling list (Week 1 free, Week 2+ paid mapping)
Week 1 free:
- Google Sheets (tracking)
- AgentMail inbox: agent_bob_replit+review-bot@agentmail.to
- Manual SMS via phone (if needed) + email alerts
- Calendar booking via a free scheduler link (if available) or manual scheduling

Week 2+ paid mapping (ties to budget buckets above):
- Upwork connects/boosting
- Fiverr promoted gigs
- Email domains/inboxes + verification
- SMS alert tool for escalation

This document is designed to be executed immediately: build the sheet, start outreach, and only turn on spend after the tracker shows booked calls within 7 days.