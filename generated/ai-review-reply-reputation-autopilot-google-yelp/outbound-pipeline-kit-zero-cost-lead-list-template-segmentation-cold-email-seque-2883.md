# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:32:01.021Z

---

## 1) Scope (so we can actually ship 500–1,000 leads fast)
**Default geography:** Top 25 US metros (balanced mix of SMB density + review velocity). 
**Verticals:** (1) Dentists, (2) Med Spas / Aesthetics, (3) HVAC + Plumbing. 
**List size target:** 600 leads total (200/vertical) as the first milestone; scale to 1,000 by adding more metros or second-page results.

## 2) Lead CSV / Google Sheets Template (copy these headers)
Create a Google Sheet with these exact column headers (row 1):
1. business_name
2. vertical
3. city
4. state
5. metro
6. website
7. phone
8. google_maps_url
9. google_rating
10. review_count
11. last_review_date
12. last_review_excerpt (1–2 sentences max)
13. response_rate_proxy (0–100%)
14. segment (not_responding | low_rating | high_volume)
15. priority_tier (A | B | C)
16. owner_or_manager_name (if found)
17. role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
18. email_1
19. email_2
20. contact_source (website | google | facebook | linkedin)
21. personalization_hook (what you’ll use in line 1)
22. notes

### Data dictionary (quick rules so a VA doesn’t ruin the list)
- **google_rating**: numeric from GBP listing.
- **review_count**: numeric from GBP listing.
- **last_review_date**: date of the most recent Google review.
- **last_review_excerpt**: copy only a short safe excerpt OR paraphrase if it contains sensitive info. Avoid patient details.
- **response_rate_proxy**: look at the most recent **10** reviews; count how many have an owner response. Example: 2/10 = 20%.
- **owner_or_manager_name**: from website “About/Team”, footer, or LinkedIn.
- **emails**: from website contact page first; if none, try “mailto:” links, Facebook page, or staff directory.

## 3) Segmentation + Priority Scoring (formulas + logic)
Use these operational rules while collecting:
- **Not Responding:** response_rate_proxy <= 20% OR 0 responses in last 10 reviews
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count >= 200 OR last_review_date within 14 days

### Priority tiers (use this to decide send order)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

**Tie-breaker (manual):** pick businesses with (a) recent negative review, (b) obvious response gap, (c) competitive market metro.

## 4) Personalization Hook SOP (takes <60 seconds/lead)
Pick ONE hook only:
1) **Recent review excerpt** (safe, short): “I saw a recent review mentioning ‘{{excerpt}}’.”
2) **Response gap**: “Noticed several recent reviews didn’t get an owner reply.”
3) **Volume/velocity**: “You’re getting new reviews frequently—hard to keep up consistently.”

Compliance note: Do not imply the business did anything wrong; don’t mention protected health info; paraphrase if needed.

## 5) Cold Email Sequences (3-step) — includes URL + contact email
**Sender name:** Bob
**Website proof:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Reply-to / contact:** agent_bob_replit+review-bot@agentmail.to

### 5A) DENTAL — Variant: Not Responding
**Email 1 (Day 1)**
Subject options:
- Quick help replying to your Google reviews
- {{PracticeName}} reviews: can I draft replies for you?
- Noticed a response gap on Google

Body:
Hi {{FirstName}} — Bob here.

I was looking at {{PracticeName}}’s Google reviews and noticed a few recent ones didn’t get an owner reply (example: “{{recent_review_excerpt}}”).

We built a small **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses so you can approve/post in minutes. We can also flag any negative review for escalation so nothing gets missed.

If you want, I’ll do a **free 7-day trial**: we’ll draft replies within 12 hours for new reviews + send a weekly KPI summary (rating trend, response rate, negatives flagged).

Proof/info: {{WebsiteURL}} 
Best email to coordinate? You can also reply here: agent_bob_replit+review-bot@agentmail.to

Open to trying it this week?
— Bob

**Email 2 (Day 3)**
Subject: Re: replying to reviews for {{PracticeName}}

Hi {{FirstName}} — quick follow-up.

Most practices don’t lose patients because of one bad review—they lose them because the thread sits unanswered. If you want, I can send **3 drafted replies** based on your latest reviews so you can see the tone/quality.

Want me to draft those today?
— Bob

**Email 3 (Day 7)**
Subject: Should I close this loop?

Hi {{FirstName}}, last note.

If review replies aren’t a priority right now, no worries. If they are, I can start the free 7-day trial and you’ll get:
- Draft replies in <12 hours
- Escalation for negative reviews
- Weekly KPI snapshot

Yes/no and I’ll take it from there.
— Bob ({{WebsiteURL}})

### 5B) DENTAL — Variant: Low Rating
Swap hook paragraph in Email 1 with:
“I noticed your Google rating is around {{google_rating}}. A consistent reply strategy (especially on 1–3 star reviews) often helps conversion + future review velocity.”

### 5C) DENTAL — Variant: High Volume
Swap hook paragraph with:
“You’ve got {{review_count}} reviews and new ones coming in regularly—most teams can’t keep up without a process. We can keep replies consistent and on-brand.”

---

### 5D) MED SPA / AESTHETICS — Variant: Not Responding
**Email 1 (Day 1)**
Subject options:
- Helping {{BusinessName}} reply to Google reviews
- Quick fix for review response consistency
- Drafting on-brand review replies (you approve)

Body:
Hi {{FirstName}} — Bob here.

Saw {{BusinessName}}’s recent Google reviews and noticed some didn’t get a reply (example: “{{recent_review_excerpt}}”). In aesthetics, that public thread is often part of the sales funnel.

We run an **AI Review Reply & Reputation Autopilot** that drafts **on-brand, brand-safe** responses. You approve, then post—plus we escalate any negative review immediately.

I can set you up with a **free 7-day trial**: replies within 12 hours + a weekly KPI email.

Info: {{WebsiteURL}} | Reply: agent_bob_replit+review-bot@agentmail.to

Worth testing for a week?
— Bob

(Email 2 + 3 same structure as dental; adjust “practice” → “clinic/spa”.)

---

### 5E) HVAC / PLUMBING — Variant: Not Responding
**Email 1 (Day 1)**
Subject options:
- Quick help replying to your Google reviews
- Missed review replies (easy fix)
- Keeping review responses consistent

Body:
Hi {{FirstName}} — Bob here.

I checked {{BusinessName}}’s Google reviews and saw a few recent ones without an owner reply (example: “{{recent_review_excerpt}}”). In home services, speed + professionalism in replies can directly affect calls.

We built an **AI Review Reply & Reputation Autopilot**: brand-safe draft replies in <12 hours, you approve, and we flag negative reviews for escalation.

Free 7-day trial if you want to test it. Info: {{WebsiteURL}} 
Or reach me at: agent_bob_replit+review-bot@agentmail.to

Want me to start with 3 drafts from your latest reviews?
— Bob

(Email 2 + 3 same structure.)

---

### 5F) Agency / Reseller Version (initial email)
Subject options:
- White-label review reply automation for your clients
- Add “review response” as a productized service
- Quick partner idea for local SEO clients

Body:
Hi {{FirstName}} — Bob here.

If you manage local SEO/GBP for {{AgencyName}} clients: we built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses, escalates negatives, and reports weekly KPIs.

It’s simple to resell: you (or the client) approves responses, and you can bundle it into your GBP package. Happy to run a **free 7-day trial** on one client to prove results.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

Open to a 10-minute chat to see if it fits your stack?
— Bob

## 6) Daily Sending Ops (Free tools)
**Tooling (week 1 / $0):** 1 Gmail inbox + Google Sheets CRM + manual personalization.

### 14-day ramp (per inbox)
- Days 1–2: 15 emails/day (high personalization, Priority A only)
- Days 3–4: 25/day
- Days 5–7: 35/day
- Week 2: 50/day (only if bounce <3% and no spam warnings)

### Daily checklist (60–90 minutes)
1) Pull 25–50 prospects from Priority A/B.
2) Personalize line 1 (review excerpt or response gap).
3) Send Email 1 to new prospects.
4) Send Follow-up #1 to Day-3 cohort.
5) Send Follow-up #2 to Day-7 cohort.
6) Log outcomes in CRM: Sent / Replied / Qualified / Not now / Bounce.

### Stop-loss rules
- If hard bounce rate > 3% in a day: stop new sends, fix list/emails.
- If any “spam” warning: pause for 24–48h, lower volume, increase personalization.

### Reply handling SLA
- Same-day reply to any positive intent.
- Negative reply: mark “Do Not Contact” immediately.

## 7) CRM Stages (Google Sheet columns or a simple board)
1) Prospect (not contacted)
2) Sent – Initial
3) Sent – Follow-up 1
4) Sent – Follow-up 2
5) Replied – Interested
6) Qualified (has GBP/Yelp + enough review volume + decision maker)
7) Demo Booked
8) Trial Active (7 days free)
9) Converted (post-week-1 paid later)
10) Lost / Not Now

## 8) KPI Tracking (weekly)
- Emails sent / delivered / bounced
- Replies and positive reply rate
- Demos booked
- Trials started
- For trial accounts: response time, # replies drafted, negative escalations, response rate change

---
If you want, I can also add a one-page “trial onboarding email” that sets expectations (approval workflow, response tone, escalation rules) using the same website + contact email.