# Outbound Pipeline Kit (Ready-to-Run): Lead List Template + Segmentation + Cold Emails + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:32:32.231Z

---

## 1) Targeting decision (to unblock list build)
**Recommended geography for the first 500–1,000 leads:** Top 25 US metros (highest concentration, faster list-building, more review volume).
If you prefer states instead, pick 5–10 states with dense metros (CA, TX, FL, NY, IL, PA, GA, NC, AZ, WA).

**Verticals (start with these 3):**
1) Dentists (high LTV, high intent, steady review velocity)
2) Med spas/aesthetic clinics (high margin, competitive reputation dynamics)
3) HVAC/Plumbing (high call-driven revenue, strong review impact)


## 2) Lead list CSV template (copy/paste headers)
Paste as the first row in a CSV or Google Sheet:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses,response_rate_proxy,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Data dictionary (what each field means)
- **google_rating**: star rating shown on Google Business Profile.
- **review_count**: total review count.
- **last_review_date**: date of most recent review (YYYY-MM-DD).
- **last_10_owner_responses**: number of owner/management responses visible in the last 10 reviews (0–10).
- **response_rate_proxy**: last_10_owner_responses / 10 (0.0–1.0).
- **segment**:
  - not_responding = response_rate_proxy ≤ 0.2
  - low_rating = google_rating < 4.2
  - high_volume = review_count ≥ 200 OR last_review_date within last 14 days
  - (allow multiple; store as semicolon list if needed: e.g., “not_responding;high_volume”)
- **priority_tier**:
  - Priority A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  - Priority B = not_responding OR low_rating
  - Priority C = high_volume only
- **personalization_snippet**: 1–2 lines from the most recent review (or paraphrase). Do not include health info or anything sensitive.

### Google Sheets formulas (segmentation + priority)
Assume columns:
- google_rating in G
- review_count in H
- last_review_date in I
- response_rate_proxy in K

**High volume (helper):**
=IF(OR(H2>=200, I2>=TODAY()-14), TRUE, FALSE)

**Not responding (helper):**
=IF(K2<=0.2, TRUE, FALSE)

**Low rating (helper):**
=IF(G2<4.2, TRUE, FALSE)

**Segment (as text):**
=TEXTJOIN(";", TRUE, IF(K2<=0.2,"not_responding",""), IF(G2<4.2,"low_rating",""), IF(OR(H2>=200, I2>=TODAY()-14),"high_volume",""))

**Priority tier:**
=IFS(
  OR(AND(K2<=0.2, OR(H2>=200, I2>=TODAY()-14)), AND(G2<4.2, OR(H2>=200, I2>=TODAY()-14))), "A",
  OR(K2<=0.2, G2<4.2), "B",
  OR(H2>=200, I2>=TODAY()-14), "C",
  TRUE, "C"
)


## 3) Zero-cost lead sourcing workflow (repeatable)
### Queries (Google Maps / Google search)
Use: "{vertical keyword} {metro}" then open the Google Maps local pack.
- Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “family dentistry”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
- HVAC/Plumbing: “HVAC”, “air conditioning repair”, “plumber”, “drain cleaning”

**Production target (manual):** 25–40 leads/hour per researcher once practiced.
- Day 1: 100 leads
- Day 2–3: 250–300 more
- Week 1: reach 500

### Collection steps per lead
1) Open listing → record rating + review count.
2) Click reviews → capture last review date.
3) Scroll last ~10 reviews → count business responses (owner/management) → fill last_10_owner_responses.
4) Copy a safe 1–2 line snippet (or paraphrase) for personalization_snippet.
5) Find website + contact email:
   - Check website footer/contact page
   - If missing: use WHOIS contact page or “Contact/Privacy Policy” page
   - If still missing: use a role inbox guess when appropriate (info@, hello@, office@) and note “guessed”.

QA rules (to avoid garbage leads):
- Skip franchises where outreach must go to corporate (unless multi-location owner appears reachable).
- Prefer businesses with clear service pages and a real phone.
- Avoid categories that have very low review velocity (harder to sell speed).


## 4) Cold email sequences (3-step) — includes legitimacy links
**Your legitimacy references (use in templates):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### Universal personalization tokens
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like the last few reviews didn’t get a response”)
- {{vertical_phrase}} (“practice” for dentists, “clinic” for med spas, “team” for HVAC/plumbing)


### A) NOT RESPONDING angle (best for Priority A/B)
**Email 1 (Day 1)**
Subject options:
1) Quick help replying to Google reviews for {{business_name}}
2) Noticed a response gap on your recent reviews
3) {{business_name}} — can we handle review replies?

Body:
Hi {{first_name}} — I was looking at {{business_name}} in {{city}} and saw a recent review: “{{recent_review_snippet}}”.

It also looks like some recent reviews haven’t gotten a reply (which can hurt conversions even when ratings are strong).

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** Google/Yelp responses, flags negatives for escalation, and sends weekly KPI summaries. You can **approve before anything posts**, or we can auto-post from your guidelines.

If helpful, I can show you 3 draft replies for your latest reviews so you can see the quality.

Want me to send the drafts, or should we do a quick 10-minute walkthrough?

Website (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Re: review replies for {{business_name}}

Hi {{first_name}} — circling back.

If you share whether you prefer **approve-first** or **autopost** workflows, I’ll send 2–3 sample replies in the tone you want (friendly/professional/short).

Open to that?
— Bob

**Follow-up 2 (Day 7)**
Subject: Should I close this out?

Hi {{first_name}} — should I close this out, or is review response coverage something you want tighter this month?

We typically respond within **12 hours**, escalate negatives immediately, and report weekly reputation KPIs.
— Bob


### B) LOW RATING / RECENT NEGATIVES angle (Priority A/B)
**Email 1 (Day 1)**
Subject options:
1) Quick fix for review fallout at {{business_name}}
2) Reputation triage (reply speed + escalation)
3) Can I help respond to recent feedback?

Body:
Hi {{first_name}} — I’m reaching out because I saw a recent review for {{business_name}}: “{{recent_review_snippet}}”.

When a review is negative (or even mixed), the **reply** often determines whether a prospect gives you a chance.

Our **AI Review Reply & Reputation Autopilot** drafts **brand-safe** responses, routes sensitive cases to you for approval, and tracks weekly KPIs so you can see rating/reply-time improvements.

If you want, I can draft a reply to that review in your brand voice (no obligation) and you can decide if it’s useful.

Okay if I send a draft?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Draft reply for that review?

If you reply with the tone you prefer (calm/apologetic/firm), I’ll send a draft response you can post.
— Bob

**Follow-up 2 (Day 7)**
Subject: last ping — worth tightening responses?

If you’re already handling replies internally, no worries. If not, we can cover replies within 12 hours + escalation + weekly KPIs.
— Bob


### C) HIGH VOLUME / OPERATIONS angle (Priority A/C)
**Email 1 (Day 1)**
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Can we take review replies off your plate?
3) Review response SLA for {{business_name}}

Body:
Hi {{first_name}} — noticed {{business_name}} gets steady review volume. Most teams fall behind because it’s repetitive and time-sensitive.

We run an **AI Review Reply & Reputation Autopilot**: drafts on-brand replies for Google/Yelp, escalates negatives, and reports weekly KPIs. Typical setup is simple: you give a tone guide + do approve-first for week 1.

Would you be open to a 10-minute call to see if a 12-hour reply SLA would help?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: quick question

Are review replies currently owned by you, front desk, or an agency? Either way, we can reduce time + keep replies consistent.
— Bob

**Follow-up 2 (Day 7)**
Subject: close the loop?

If it’s not a priority right now, tell me and I’ll stop. If it is, I can send a couple sample replies in your brand voice.
— Bob


### D) Agency/reseller initial email (sell bundles)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for GBP/Yelp management (fast)
3) Partner offer: reputation replies + KPIs

Body:
Hi {{first_name}} — I’m Bob. We built an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp: brand-safe draft replies, negative-review escalation, and weekly KPI reporting.

Agencies use it to:
- deliver a “reply within 12 hours” SLA,
- keep tone consistent across clients,
- reduce labor while improving responsiveness.

If you have clients in dental/med spa/home services, I can share a reseller/white-label workflow and pricing options.

Open to a quick call?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to


## 5) Daily sending ops + CRM stages (simple + scalable)
### 14-day ramp (per inbox)
- Days 1–2: 20/day (mix new + replies)
- Days 3–4: 35/day
- Days 5–7: 50/day
- Week 2: 75–100/day
If multiple inboxes: multiply volume, but keep per-inbox ramp conservative.

### Daily activity targets (starting point)
- New sends: 50/day
- Follow-ups: 30/day
- Manual personalization for Priority A: 10–20/day (include snippet + response gap)
- Reply handling SLA: same day (aim <4 business hours)

### List hygiene + thresholds
- Hard bounce rate: stop if >3% in a day; investigate source.
- Spam complaints: stop if any spike; tighten targeting + copy.
- Remove any “unsubscribe/stop” immediately.

### CRM stages (minimum viable)
1) Prospects (not yet sent)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked/replied)
4) Replied — Interested
5) Qualified (has GBP/Yelp + review volume + decision maker)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (tag reason: timing, price, already handled, no reviews)

### Weekly KPI scoreboard
- New leads added
- Emails sent / delivered
- Reply rate
- Meetings booked
- Trials started
- Paid conversions


## 6) Next execution steps (48-hour plan)
1) Confirm geography (Top 25 metros recommended).
2) Build first 200 leads (focus Priority A first).
3) Start sending Day 1: 50 new + 20 follow-ups (or ramp per inbox if brand new).
4) Track replies in CRM and iterate: which segment converts fastest.

If you want, I can convert the above into a single Google Sheet layout (tabs: Leads, Segmentation, Sends, Replies, KPI Dashboard) and a one-page VA instruction sheet.