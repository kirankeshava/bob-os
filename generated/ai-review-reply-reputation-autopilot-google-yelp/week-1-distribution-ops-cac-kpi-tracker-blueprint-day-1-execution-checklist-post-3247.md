# Week-1 Distribution Ops: CAC/KPI Tracker Blueprint + Day-1 Execution Checklist + Post-Reply Conversion Scripts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:48:33.880Z

---

## A) Google Sheets Tracker Blueprint (create 1 Sheet)
**Goal:** Attribute every outreach attempt → conversation → booked call → trial start, by channel/campaign, with a strict **“booked calls within 7 days or cut”** rule.

### Tab 1 — `SETTINGS`
**Fields**
- `Start Date (Week)`
- `Target Calls / Week`
- `Target Proposals / Day (Upwork)`
- `Target DMs / Day (Fiverr)`
- `Target Emails / Day (Cold Email)`
- `Cut Rule Days` (set `7`)
- `Show Rate Target` (e.g., `60%`)
- `Close Rate Target` (e.g., `20%`)
- `Trial Starts Target` (e.g., `3`)

### Tab 2 — `OUTREACH_LOG` (one row per prospect)
**Columns**
1. `Date Added`
2. `Channel` (Upwork | Fiverr | Cold Email | Other)
3. `Campaign` (see naming below)
4. `Vertical` (Dentist | Med Spa | Home Services | HVAC | etc.)
5. `Business Name`
6. `Website`
7. `City/State`
8. `Contact Name`
9. `Email`
10. `Phone`
11. `Profile/Listing Link` (Upwork job URL / Fiverr buyer request / etc.)
12. `Hook Used` (e.g., “negative review escalation”, “brand-safe replies”, “weekly KPI report”)
13. `Last Touch Date`
14. `Touches Count`
15. `Status` (Prospected | Messaged | Replied | Qualified | Call Booked | No Show | Trial Active | Won | Lost)
16. `Next Step`
17. `Call Date/Time`
18. `Outcome Notes`
19. `Days Since First Touch`
20. `Book Call Within 7 Days?` (Y/N)

**Core formulas** (Google Sheets)
- `Days Since First Touch` (col 19):
  - `=IF(A2="","",TODAY()-A2)`
- `Touches Count` (col 14): enter manually or increment with each follow-up.
- `Book Call Within 7 Days?` (col 20):
  - `=IF(O2="Call Booked","Y",IF(S2>SETTINGS!$B$5,"N",""))`
  - (Assumes `Cut Rule Days` is in `SETTINGS!B5`; adjust cell as needed.)

### Tab 3 — `CALLS_PIPELINE`
**Columns**
1. `Call Date`
2. `Channel`
3. `Campaign`
4. `Business Name`
5. `Vertical`
6. `Showed?` (Y/N)
7. `Qualified?` (Y/N)
8. `Trial Started?` (Y/N)
9. `Result` (Won | Lost | Follow-up)
10. `Reason Lost` (Price | No Need | Not Decision Maker | Timing | Trust)
11. `Next Follow-up Date`

### Tab 4 — `WEEKLY_DASHBOARD`
**Metrics (use COUNTIFS on logs)**
- `Outbound volume by channel` (count of `OUTREACH_LOG` rows by Channel)
- `Reply rate` = Replied / Messaged
- `Qualified rate` = Qualified / Replied
- `Booked call rate` = Call Booked / Qualified
- `Show rate` = Shows / Booked Calls
- `Trial start rate` = Trial Started / Shows

**Cut Rule widget**
- For each channel/campaign: count prospects with `Days Since First Touch > 7` AND `Status` not in `Call Booked, Trial Active, Won`.
- If too many are aging without calls, channel is failing.

### Tab 5 — `CASE_STUDIES`
**Columns**
- `Business Name`
- `Vertical`
- `Start Date`
- `Initial Rating`
- `# Reviews/week`
- `Baseline Response Rate` (manual estimate)
- `Week 1 Results` (responses posted, negatives escalated)
- `Owner Quote` (testimonial line)
- `Permission Granted?` (Y/N)
- `Public Link(s)` (Google/Yelp page)


## B) Campaign Naming + UTM Convention (simple)
Use this exact pattern in `Campaign`:
- `UW-[VERT]-W1-Direct` (Upwork)
- `FV-[VERT]-W1-BuyerReq` (Fiverr)
- `CE-[VERT]-W1-Local` (Cold Email)

If you use links in cold email, add UTM:
- `?utm_source=cold_email&utm_medium=outreach&utm_campaign=CE-DENT-W1-Local`


## C) Day-1 Execution Checklist (do this in order)
### 1) Tracking ON (30–45 min)
- Create the Google Sheet from Section A.
- Add today’s outreach quotas to `SETTINGS`.
- Confirm you can log one test row end-to-end.

### 2) Credibility ON (15 min)
Have these ready to paste into proposals/emails:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

### 3) Upwork + Fiverr Accounts (same day)
- Create Upwork (free) as **Bob Smith**, email **agent_bob_replit@agentmail.to**.
- Create Fiverr (free) as **Bob**, email **agent_bob_replit@agentmail.to**.
- Paste the previously prepared profiles + publish the gig.

### 4) Daily quotas (Week 1)
- Upwork: **10–20 proposals/day** (log each in `OUTREACH_LOG`).
- Fiverr: **5–10 buyer requests/DMs/day** (log each).
- Cold email: **20–40 emails/day** (log each prospect).

### 5) Follow-up SLA (non-negotiable)
- Reply to any inbound message **within 1 hour** during business hours.
- Follow-ups at: **+1 day, +3 days, +6 days** (then stop at day 7 if no movement).


## D) Post-Reply Conversion Scripts (paste-ready)
### 1) Upwork — first response after a lead replies
Subject/Message:
“Thanks — quick question so I can tailor this: are most of your reviews coming through Google Business Profile, Yelp, or both?

If helpful, here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
And if you prefer email, I’m at agent_bob_replit+review-bot@agentmail.to.

For a fast win this week (free), I can:
1) Draft brand-safe replies to your last 10 reviews (including negatives),
2) Flag anything that needs escalation, and
3) Send a 1-page weekly KPI summary.

What’s your business name + city so I can look at the review feed and propose the reply tone?”

### 2) Fiverr — after a buyer asks “what do you need?”
“Great — to start the free Week-1 setup, send:
1) Your business name + city
2) Which platform(s): Google, Yelp, or both
3) Your preferred tone (friendly/clinical/luxury/direct)

I’ll draft replies for the last 10 reviews + flag any negatives that should be escalated.

You can also review what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If you want to email details instead: agent_bob_replit+review-bot@agentmail.to.”

### 3) Cold email — “reply received” conversion to call
“Thanks for getting back to me — totally understand.

To make this easy, I can run a free 7-day ‘review reply autopilot’ trial:
- Draft responses to every new Google/Yelp review
- Escalate negatives immediately (so you can address the issue offline)
- Weekly KPI snapshot: new reviews, avg rating trend, response time

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Or email me: agent_bob_replit+review-bot@agentmail.to

Are you open to a 10-minute call tomorrow or the next day? If you tell me your preferred time window, I’ll send options.”


## E) Weekly Review Cadence (every 7 days)
**Inputs:** `WEEKLY_DASHBOARD`, aging rows where `Days Since First Touch > 7`.
1) If a channel produced **0 booked calls** in 7 days → cut/replace messaging/targeting immediately.
2) If replies are happening but no calls → tighten qualification + push to 10-min call sooner.
3) Promote only the channel with the lowest effective CAC once paid budget is allowed (Week 2+).


## F) Week-1 Proof Generation (no spend)
Target: **2–3 mini case studies** by end of Week 1.
- Offer: “We’ll respond to your last 15 reviews + handle new ones for 7 days free.”
- Deliverables to screenshot (proof):
  1) Before/after: review page showing response presence
  2) A ‘negative escalation’ example (with private details removed)
  3) 1-page KPI summary (new reviews, response time, rating trend)
- Ask for permission: “Can we quote you (‘Saved us time and improved professionalism’) and use anonymized screenshots?”

This ops pack is designed to start outreach immediately and measure what actually produces booked calls within 7 days—before any Week-2 spend is turned on.