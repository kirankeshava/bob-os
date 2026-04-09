# Outbound Pipeline Kit (Zero-Cost): 1,000-Lead Build Plan + CSV Template/Segmentation + Cold Emails + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:09:13.941Z

---

# Outbound Pipeline Kit (Zero-Cost)
Business: **AI Review Reply & Reputation Autopilot (Google/Yelp)**  
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact: **agent_bob_replit+review-bot@agentmail.to** (Bob)

## 1) Geography + list size plan (V1)
**Recommendation (fastest, highest intent): Top 25 US metros.** You’ll pull prospects where review velocity is high and owners feel reputation pressure.

**Target counts (1,000 total):**
- Dentists: 250
- Med spas / aesthetics: 250
- HVAC/plumbing: 250
- Agencies/resellers: 250 (marketing agencies serving those verticals)

If you want 500 first, cut each bucket in half.

## 2) Google Maps query pack (copy/paste)
Use this format per metro: `"{keyword}" "{city, state}"` on Google Maps.

### Top metro starter list (use any 10–25)
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Charlotte NC; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Las Vegas NV; Detroit MI; Portland OR.

### Vertical keywords (run 2–3 per metro)
**Dentists**
- “dentist”
- “cosmetic dentist”
- “family dentistry”
- “dental implants”

**Med spas / aesthetics**
- “med spa”
- “aesthetic clinic”
- “botox”
- “laser hair removal”

**HVAC / Plumbing**
- “HVAC”
- “air conditioning repair”
- “plumber”
- “water heater repair”

### Agencies/resellers keywords
Search in each metro + US-wide:
- “dental marketing agency”
- “med spa marketing”
- “HVAC marketing”
- “local SEO agency”
- “reputation management agency”

**Inclusion rules (keep quality high):**
- Must have a real website (not only Facebook unless you must)
- Avoid obvious multi-location franchises unless they have a local decision maker
- Prefer: review_count ≥ 80 OR last_review_date ≤ 14 days

## 3) Lead CSV template (headers)
Create a Google Sheet with these columns (exact header row):

business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (how to fill fast)
- **google_rating / review_count:** from Google Business Profile panel
- **last_review_date:** open reviews → sort by newest → capture date of top review
- **last_review_excerpt:** copy 8–20 words max OR paraphrase (safer)
- **response_rate_last10:** in last 10 reviews, count owner responses / 10 (e.g., 0.2)
- **emails:** from website contact page, about page, or footer. If none: try “info@domain”, “support@domain”, “office@domain”, “hello@domain”.
- **owner_or_manager_name:** from “About”, team page, or the GBP if visible

## 4) Segmentation + priority scoring (use formulas)
### Segment rules
- **not_responding:** response_rate_last10 <= 0.2
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR (today - last_review_date) <= 14 days

### Priority tiers
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

### Google Sheets formula examples
Assume:
- response_rate_last10 in column K
- google_rating in column G
- review_count in column H
- last_review_date in column I

**segment (column L)**
```
=TEXTJOIN("|", TRUE,
 IF($K2<=0.2,"not_responding",""),
 IF($G2<4.2,"low_rating",""),
 IF(OR($H2>=200, TODAY()-$I2<=14),"high_volume","")
)
```

**priority_tier (column M)**
```
=IF(OR(AND($K2<=0.2, OR($H2>=200, TODAY()-$I2<=14)), AND($G2<4.2, OR($H2>=200, TODAY()-$I2<=14))),"A",
 IF(OR($K2<=0.2,$G2<4.2),"B",
 IF(OR($H2>=200, TODAY()-$I2<=14),"C","C")))
```

## 5) 30-minute QA checklist (before sending)
Sample 25 random rows per 200 leads.
- Category correct? (dentist ≠ orthodontist-only unless you want it)
- Website loads and is local business (not directory)
- Email present and matches domain (avoid random Gmail unless it’s clearly the business)
- Review excerpt not sensitive (no medical claims, no PHI, no accusations)
- Segment/priority looks correct
- Remove duplicates and multi-location corporate HQ emails

## 6) Cold email sequences (3-step) — include legitimacy URL + contact email
Tokens to personalize:
- {{BusinessName}}, {{City}}, {{RecentReviewSnippet}}, {{ResponseGap}}, {{Rating}}, {{ReviewCount}}, {{YourName}} (= Bob)

### A) Not responding (local business) — Step 1
**Subject options:**
1) Quick question about your Google reviews
2) {{BusinessName}} — review replies
3) 12-hour review responses (you approve)

**Body:**
Hi {{FirstName}},

I was looking at {{BusinessName}}’s Google reviews in {{City}} and noticed a few recent reviews haven’t gotten a public reply yet (e.g., “{{RecentReviewSnippet}}”).

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google + Yelp, flags negatives for escalation, and sends a weekly KPI recap. You can **approve replies before anything posts**, and we target a **<12 hour** response time.

If it’s helpful, I can set up a **free 7-day trial** and draft replies for your latest reviews so you can see the quality first.

Want me to send 3 draft replies for {{BusinessName}}?

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Follow-up 1 (Day 3)
Subject: Re: {{BusinessName}} review replies

Hi {{FirstName}}, quick bump — would you like me to draft replies for the 3 most recent reviews? No login needed to start; just reply “yes” and I’ll send drafts in email.

— Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 2 (Day 7)
Subject: Close the loop?

If review replies aren’t a priority right now, no worries — should I circle back next month? If you want, I can still send a quick sample reply to:
“{{RecentReviewSnippet}}”

— Bob

### B) Low rating (local business) — Step 1
Subject: Helping lift ratings after tough reviews

Hi {{FirstName}},

I saw {{BusinessName}} is at about {{Rating}} on Google, and a recent review mentioned “{{RecentReviewSnippet}}”.

We help local businesses respond fast and safely: we draft empathetic, policy-safe replies, **escalate negative reviews** to the right person internally, and keep a weekly report so nothing slips.

Open to a free 7-day trial? I can send a suggested reply to that review plus two others today.

— Bob
agent_bob_replit+review-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### C) High volume (local business) — Step 1
Subject: Keeping up with {{ReviewCount}}+ reviews

Hi {{FirstName}},

{{BusinessName}} has a lot of review activity ({{ReviewCount}}+). Most teams fall behind on replies once volume picks up.

We run an autopilot that drafts on-brand responses for Google + Yelp, routes negatives for escalation, and gives you weekly KPIs. You approve replies before posting (or we can do “suggest-only” to start).

Want to try it free for 7 days?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 7) Agency/reseller email (sell to agencies)
Subject: White-label review reply autopilot for your clients

Hi {{FirstName}},

I’m Bob — we built an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp. Agencies use it to keep clients responsive without adding headcount: brand-safe drafts, negative escalation, and weekly KPI reporting.

If you manage local clients (dental, med spa, home services), I can offer a **free 7-day pilot** on one client account and provide a simple “client-ready” weekly report.

Open to a 15-minute chat to see if it fits your stack?

— Bob
agent_bob_replit+review-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 8) Daily sending ops (zero-cost stack)
### Daily targets (Week 1 ramp)
- Day 1–2: 20/day
- Day 3–4: 30/day
- Day 5–7: 50/day
(If bounce rate > 5%: stop and fix list.)

### Routine (60–90 minutes/day)
1) Pull 25–50 Priority A/B leads
2) Personalize first line using {{RecentReviewSnippet}} + note response gap
3) Send Step 1 emails
4) Log outcomes in CRM (stages below)
5) Reply to interested leads within 2 hours

### CRM stages (minimum viable)
Prospect → Sent Step 1 → Follow-up 1 Sent → Follow-up 2 Sent → Replied (Interested) → Qualified → Demo Booked → Trial Started (Free 7 days) → Paid → Lost

### Reply-handling SLA
- Interested: reply < 2 hours
- Not now: set follow-up date 30 days
- Unsubscribe: immediate suppression

### Weekly KPI snapshot
- New prospects added
- Emails sent
- Reply rate
- Positive interest rate
- Demos booked
- Trials started

---
**Next execution step:** confirm geography (Top 25 metros recommended) and build the first 200 leads using the template + query pack, then start sending on the ramp schedule.