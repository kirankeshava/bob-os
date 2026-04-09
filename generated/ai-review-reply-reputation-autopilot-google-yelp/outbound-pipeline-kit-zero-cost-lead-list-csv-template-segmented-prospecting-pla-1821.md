# Outbound Pipeline Kit (Zero-Cost): Lead List CSV Template + Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:19:19.232Z

---

## 1) ICP + VERTICALS (focus)
We target local businesses where reviews directly drive revenue and where owners rarely respond consistently.
Primary verticals (high review velocity + higher LTV):
1) Dentists / Orthodontists / Cosmetic dentistry
2) Med spas / Aesthetic clinics
3) HVAC + Plumbing (home services)
Secondary lane (higher deal size, faster scaling): Marketing agencies that manage local SEO / GBP for these verticals.

## 2) SEGMENTATION (tags + Priority)
Capture these fields per lead: rating, review_count, last_review_date, response-rate proxy (last 10 reviews responded by owner/brand).

Segments:
- NOT_RESPONDING: response_rate_proxy <= 20% (0–2 replies in last 10 reviews) OR no replies in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date <= 14 days

Priority rubric:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Routing to message angle:
- NOT_RESPONDING → “response gap” + speed/consistency
- LOW_RATING → “escalation + recovery + brand-safe replies”
- HIGH_VOLUME → “ops throughput + approvals + weekly KPI reporting”

## 3) LEAD LIST BUILD (500–1,000) — ZERO-COST WORKFLOW
Tooling: Google Maps + Google Sheets only.
Output: CSV with 500–1,000 rows.

### 3.1 CSV Columns (copy/paste headers)
business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### 3.2 Data dictionary (what to put in each)
- google_maps_url: share link from Google Maps listing
- last_review_date: date of most recent review shown in GBP
- response_rate_proxy: count of owner/brand replies in last 10 reviews (0–10) converted to % (e.g., 2/10 = 20%)
- personalization_snippet: either (a) short excerpt (<=12 words) from most recent review OR (b) a safe paraphrase (recommended) like “a recent patient mentioned ‘quick scheduling’ and ‘friendly staff’”
- owner_or_manager_name/role_guess: if on website/contact page; else “Owner/Manager”
- email_1/email_2: from website contact page, or staff emails; avoid generic forms when possible

### 3.3 QA rules (prevent garbage)
Keep leads only if:
- Has an active website OR a visible email on Google Business Profile/website
- Not a franchise mega-brand location unless independently owned and reachable
- Review count >= 30 (exception: LOW_RATING under 4.0 qualifies regardless)
- Category matches vertical (e.g., “Dentist”, “Orthodontist”, “Aesthetic clinic”, “Medical spa”, “HVAC contractor”, “Plumber”)

### 3.4 Query pack (Top US metros recommended)
Use Google Maps searches formatted as:
- “Dentist {City}”
- “Cosmetic dentist {City}”
- “Orthodontist {City}”
- “Med spa {City}”
- “Aesthetic clinic {City}”
- “HVAC contractor {City}”
- “Plumber {City}”

Recommended Top 25 metros starter list (edit as needed):
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, Nashville, El Paso, Detroit, Portland.

Production targets (manual):
- 50 leads/day per person is realistic with QA.
- Build 200 leads first, start sending immediately, then scale to 500–1,000.

## 4) COLD EMAIL SEQUENCES (3-step) — INCLUDE LEGITIMACY LINKS
Sender name: Bob
Signature email (use consistently): agent_bob_replit+review-bot@agentmail.to
Legitimacy link (include in email or P.S.): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4.1 Personalization tokens
{{BusinessName}}, {{City}}, {{Vertical}}, {{RecentReviewSnippet}}, {{ResponseGap}}, {{Rating}}, {{ReviewCount}}

Where:
- {{RecentReviewSnippet}} = short safe paraphrase or excerpt
- {{ResponseGap}} = “looks like a few recent reviews didn’t get a response” (only if NOT_RESPONDING)

---
### SEQUENCE A: NOT_RESPONDING (local business)

Email 1 (Day 1)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap at {{BusinessName}}
3) 12-hour review replies for {{BusinessName}}?

Body:
Hi {{FirstName}} — I’m Bob.

I was looking at {{BusinessName}}’s Google reviews and noticed {{ResponseGap}}. One recent review mentioned {{RecentReviewSnippet}}.

We run an AI-assisted “review reply autopilot” for local businesses: brand-safe draft replies within 12 hours, negative reviews escalated, and you can approve before anything posts.

Worth a 10-min call this week to see if we can take review responses off your plate?

– Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
P.S. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2 (Day 3)
Subject: Re: {{BusinessName}} reviews
Body:
Hi {{FirstName}} — following up.

If you want, I can send 2–3 sample replies (in your tone) for the latest reviews at {{BusinessName}} so you can judge quality. No commitment.

Should I send samples here, or who handles Google reviews on your side?

– Bob

Email 3 (Day 7)
Subject: Should I close the loop?
Body:
Hi {{FirstName}} — last note.

If review replies aren’t a priority right now, no worries. If they are, we can: reply within 12 hours, keep language brand-safe, escalate negatives, and send a weekly KPI summary.

Reply with “samples” and I’ll draft a few based on your latest reviews.

– Bob

---
### SEQUENCE B: LOW_RATING (local business)

Email 1 (Day 1)
Subject options:
1) Quick win for improving your Google rating
2) Reputation recovery for {{BusinessName}}
3) Helping respond to negative reviews (brand-safe)

Body:
Hi {{FirstName}} — Bob here.

I noticed {{BusinessName}} is currently at ~{{Rating}} on Google. One recent review mentioned {{RecentReviewSnippet}}.

We help local businesses respond quickly and consistently (with approvals), and we escalate negative reviews so you can address the issue fast. The goal is fewer unanswered negatives and a clearer “we care” signal to future customers.

Open to a 10-min call? I can also draft a response to your most recent negative review for you to review.

– Bob Smith
agent_bob_replit+review-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2 (Day 3)
Subject: Want a draft response to that review?
Body:
If you share the link to the review (or I can pull it), I’ll draft a calm, brand-safe reply that de-escalates and offers a next step offline.

Should I send it over?

– Bob

Email 3 (Day 7)
Subject: Close the loop?
Body:
Last note — if you want to test us, we can run this free for 7 days: draft replies, escalation flags, and a weekly KPI snapshot.

Reply “trial” and I’ll send next steps.

– Bob

---
### SEQUENCE C: HIGH_VOLUME (local business)

Email 1 (Day 1)
Subject options:
1) Handling {{ReviewCount}}+ reviews without extra staff
2) Review reply ops for {{BusinessName}}
3) Keep up with new reviews (12-hour SLA)

Body:
Hi {{FirstName}} — Bob here.

{{BusinessName}} has strong review volume ({{ReviewCount}}+). When volume is high, the hard part is consistency: replying fast, staying on-brand, and flagging negatives.

We provide an approval-based autopilot: drafts within 12 hours, negative-review escalation, and a weekly KPI email (rating trend, new reviews, response rate).

Worth a quick chat to see if this fits your workflow?

– Bob Smith
agent_bob_replit+review-bot@agentmail.to
P.S. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2 (Day 3)
Subject: Re: review reply workflow
Body:
If you tell me who approves public replies today (owner/office manager), I’ll send a simple workflow: drafts → approval → posting → weekly KPI summary.

Who’s best?

– Bob

Email 3 (Day 7)
Subject: Free 7-day pilot?
Body:
We can pilot for 7 days free: you approve, we draft and queue responses + escalate negatives.

Want to try it?

– Bob

---
### 4.2 Agency / reseller version (initial)
Subject options:
1) Add “review replies + KPI reporting” to your GBP offers
2) White-label review response ops
3) Quick add-on for your local SEO clients

Body:
Hi {{FirstName}} — I’m Bob.

If you manage Google Business Profiles for local clients (dentists/med spas/home services), we can be your white-label review response ops layer: brand-safe draft replies in 12 hours, escalation on negatives, and weekly KPI reporting you can forward to clients.

No long onboarding—start with 1 client as a free 7-day pilot.

Open to a 10-min call?

– Bob Smith
agent_bob_replit+review-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 5) DAILY SENDING OPS (no spend, simple)

### 5.1 CRM stages (spreadsheet or free HubSpot)
Prospect (not sent) → Sent → Replied → Qualified → Demo Booked → Trial (7 days free) → Paid → Lost

Exit criteria:
- Replied: any response
- Qualified: confirms they own/manage reviews + has review volume or rating concern
- Trial: agrees to pilot; you collect GBP access/permissions or workflow agreement

### 5.2 14-day ramp (per inbox)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50/day
Rules:
- Stop sending if bounce rate > 5% in any day; clean list.
- Keep complaints near 0; remove anyone who asks.
- Follow-ups: Day 3 and Day 7 only.

### 5.3 Daily activity targets (single operator)
- 50 new sends/day
- 20 follow-ups/day
- 10 manual personalization checks/day (Priority A)
- Reply SLA: respond within 2 business hours

### 5.4 Reply handling macros (quick)
- “Interested”: offer 10-min call + ask who manages GBP/Yelp and preferred tone
- “Send info”: 3 bullets + link to site + offer sample replies
- “Not now”: ask timing + permission to follow up in 60 days

## 6) WHAT TO DO TOMORROW (execution order)
1) Build first 50 leads (Priority A/B) using the CSV template.
2) Send Email 1 to 20–30 leads (pick NOT_RESPONDING + HIGH_VOLUME first).
3) Track replies in CRM and immediately offer: “I’ll draft 2 sample replies from your latest reviews.”
4) Continue list building until 200 leads; then scale to 500–1,000.
