# Outbound Pipeline Kit — Lead List Template (500–1,000) + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:44:06.276Z

---

# 1) ICP + Vertical Focus (2–3 verticals)
We will run outbound in **three high-intent local verticals** where review velocity is high and response speed directly impacts bookings:
1) **Dentists / Dental Clinics** (high LTV, appointment-driven)
2) **Med Spas / Aesthetic Clinics** (high review volume, highly competitive)
3) **HVAC + Plumbers** (emergency/quote-driven, reviews influence call volume)
Parallel lane: **Marketing agencies** serving these verticals (resell/white-label).

# 2) Geography Plan (recommended default)
To keep list quality high and reduce irrelevant categories, start with **Top 25 US metros**. Pull ~40 leads/vertical/metro until you hit 600–1,000 total.
Suggested metros: NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, SF, Indy, Seattle, Denver, DC, Boston, Nashville, Detroit, OKC, Portland.

# 3) Google Maps Query Pack (copy/paste)
Use Google Maps search with these footprints:
- Dental: “dentist in {{metro}}”, “cosmetic dentist in {{metro}}”, “family dentistry in {{metro}}”, “dental clinic in {{metro}}”
- Med spa: “med spa in {{metro}}”, “aesthetic clinic in {{metro}}”, “botox in {{metro}}”, “laser hair removal in {{metro}}”
- Home services: “HVAC in {{metro}}”, “air conditioning repair in {{metro}}”, “plumber in {{metro}}”, “emergency plumber in {{metro}}”
Agency lane:
- “dental marketing agency {{metro}}”, “med spa marketing agency {{metro}}”, “home services marketing agency {{metro}}”, “local SEO agency {{metro}}”

# 4) Lead List CSV Template (headers)
Paste these headers into Google Sheets as row 1 and export CSV.

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_owner_responses,response_rate_proxy,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

## 4.1 Data dictionary (what each field means)
- **business_name**: Google Business Profile name.
- **vertical**: dentist | med_spa | hvac_plumbing | agency.
- **city_state**: “Austin, TX”.
- **website**: from GBP.
- **phone**: from GBP.
- **google_maps_url**: share link to the listing.
- **google_rating**: star rating.
- **review_count**: total Google reviews.
- **last_review_date**: date of most recent review.
- **last_10_reviews_owner_responses**: count of owner responses in the last 10 reviews (manual check).
- **response_rate_proxy**: last_10_reviews_owner_responses/10.
- **segment**: not_responding | low_rating | high_volume (rules below).
- **priority_tier**: A | B | C (rules below).
- **personalization_snippet**: 8–20 words from the most recent review OR paraphrase (avoid sensitive data).
- **owner_or_manager_name**: from website/About/LinkedIn/GBP if visible.
- **role_guess**: owner | practice_manager | office_manager | operations_manager | marketing_manager.
- **email_1/email_2**: best available contact emails.
- **notes**: quick context (e.g., “no responses in last 10”, “rating 3.9”, “300+ reviews”).

# 5) Segmentation Rules (operational + simple)
Compute these in Sheets:
- **response_rate_proxy** formula (if last_10_reviews_owner_responses is in column K):
  - `=K2/10`

Segment assignment:
- **not_responding** if response_rate_proxy <= 0.2 (0–2 responses out of last 10)
- **low_rating** if google_rating < 4.2
- **high_volume** if review_count >= 200 OR last_review_date within last 14 days

Priority tiers (use the strongest applicable):
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: not_responding OR low_rating
- **Priority C**: high_volume only

Suggested Sheets formulas (adjust column letters to your sheet):
- segment (example):
  - `=TEXTJOIN("|",TRUE,IF(L2<=0.2,"not_responding",""),IF(H2<4.2,"low_rating",""),IF(OR(I2>=200,TODAY()-J2<=14),"high_volume",""))`
- priority_tier:
  - `=IF(OR(AND(L2<=0.2,OR(I2>=200,TODAY()-J2<=14)),AND(H2<4.2,OR(I2>=200,TODAY()-J2<=14))),"A",IF(OR(L2<=0.2,H2<4.2),"B",IF(OR(I2>=200,TODAY()-J2<=14),"C","")))`

# 6) List-Build SOP (zero-cost)
1) Open Google Maps → run query for a metro + vertical.
2) For each prospect, capture: name, rating, review count, phone, website, share link.
3) Click reviews → identify **last review date** and **count owner responses in last 10 reviews**.
4) Copy a safe snippet (8–20 words) from the most recent review (or paraphrase). Do NOT include health info, pricing disputes, or identifying details.
5) Find email(s):
   - Website contact page
   - “About/Team” page
   - Footer
   - For agencies: website + LinkedIn company page (often has emails)
6) QA: ensure it is the right category, locally-owned (avoid huge chains when possible), has a real website, and has reviews.

Minimum QA sample: review 20 random rows per 200 leads; reject rows missing website + email + phone (too hard to reach).

# 7) Cold Email Sequences (3-step) — Direct to Local Businesses
All templates reference:
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

## 7.1 Universal personalization tokens
Use these tokens in your sending tool:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{rating}}
- {{review_count}}
- {{response_gap}} (e.g., “looks like the last few reviews didn’t get a reply”)

## 7.2 Email #1 — Not Responding (primary angle)
Subject options (pick 1):
1) Quick win for {{business_name}}’s Google reviews
2) Noticed a small response gap on your reviews
3) Google reviews—can I take this off your plate?

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”.

It also looks like a few recent reviews didn’t get a reply (totally normal when you’re busy). We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe responses within 12 hours**, escalates negative reviews, and sends a weekly KPI report.

Workflow is simple: we can do **draft-only (you approve)** or **auto-post with guardrails**.

If I send 2–3 example replies in your brand voice for recent reviews, would you like to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7.3 Email #1 — Low Rating (primary angle)
Subject options:
1) Fixing the “unanswered” 1–3★ reviews
2) Quick reputation lift for {{business_name}}
3) A simple process to recover review sentiment

Body:
Hi {{first_name}} — I saw a recent Google review for {{business_name}} that mentioned: “{{recent_review_snippet}}”.

When ratings are under pressure, **fast, professional responses** can prevent churn and turn a bad experience into a resolution. We run an **AI-assisted review response system** that drafts empathetic replies, flags anything sensitive, and escalates negatives the same day.

You can keep full control (draft-only), and we’ll send a weekly report showing response rate, review velocity, and rating trend.

Open to a quick look if I send a couple sample replies for your latest reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7.4 Email #1 — High Volume (primary angle)
Subject options:
1) Keeping up with your review volume
2) 12-hour review replies for {{business_name}}
3) Systemizing review responses (without hiring)

Body:
Hi {{first_name}} — {{business_name}} has strong review activity ({{review_count}} total). I noticed a recent review: “{{recent_review_snippet}}”.

When volume is high, consistency is hard. We built an **AI Review Reply Autopilot** to keep replies **same-day**, brand-safe, and consistent—plus escalations for negative reviews and a weekly KPI email.

Would it be helpful if we handled replies going forward (draft-only approval or auto-post with rules)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7.5 Follow-up #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick bump.

If it helps, we can start with a **7-day pilot**: we draft responses within 12 hours, you approve (or we auto-post with guardrails). You’ll get a weekly KPI summary (response rate + rating trend).

Worth trying on a handful of recent reviews?

— Bob
agent_bob_replit+review-bot@agentmail.to

## 7.6 Follow-up #2 (5–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}} — should I close the loop here?

If review replies aren’t a priority, no worries. If they are, I can send **3 example responses** in your brand voice for recent reviews at {{business_name}}.

Reply with “examples” and I’ll send them over.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

# 8) Cold Email — Agency/Reseller Lane (white-label)
Subject options:
1) White-label review response for your clients
2) Add-on offer for your local SEO clients
3) Resellable reputation ops (done-for-you)

Body:
Hi {{first_name}} — I’m reaching out because you work with local businesses where Google reviews drive calls + bookings.

We built an **AI Review Reply & Reputation Autopilot** (Google + Yelp): brand-safe replies within 12 hours, negative review escalation, and weekly KPIs. Agencies use it as a **white-label add-on** to retain clients and increase perceived value.

If you tell me which verticals you serve (dental / med spa / home services), I’ll send a partner pack and a couple client-ready examples.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

# 9) Daily Sending Ops + 14-Day Ramp (single-inbox safe defaults)
Assuming 1 inbox to start (to protect deliverability):

Day 1–2: 15–20 new emails/day (high personalization, Priority A)
Day 3–4: 25/day
Day 5–7: 35/day
Day 8–10: 50/day
Day 11–14: 60–80/day (only if bounce rate < 3% and spam complaints = 0)

Daily checklist:
1) Pull 25–80 prospects from Priority A then B.
2) Personalize first line using {{recent_review_snippet}} + response gap.
3) Send new emails first, then follow-ups.
4) Process replies twice/day (morning + afternoon):
   - Interested → book demo
   - Not now → set reminder 30 days
   - Wrong person → ask for right contact
   - Negative reply → apologize, unsubscribe, mark do-not-contact
5) Track metrics: sent, delivered, bounced, replies, positive replies, demos.

Hard thresholds (stop and fix):
- Bounce rate > 3% in any day → clean list, verify emails, slow down.
- Spam complaint > 0 → pause sends, adjust copy + targeting.

# 10) CRM Stages (simple + enforceable)
1) Prospect (in list, not contacted)
2) Sent (Email #1 sent)
3) Replied
4) Qualified (has Google/Yelp profile + review volume + clear pain)
5) Demo Booked
6) Trial/Pilot
7) Paid
8) Lost (not a fit / no response after sequence)

Definition of Qualified for this offer:
- Has Google Business Profile (and/or Yelp)
- Review velocity exists (recent reviews in last 30 days OR 100+ total)
- Any one pain: low response rate, low rating, high volume, or multi-location.

# 11) What to ask on the first call (fast discovery)
- “Who currently replies to reviews and how often?”
- “Do you want draft-only approval or auto-post with rules?”
- “Do you need Google only, or Yelp too?”
- “Any brand voice constraints (no discounts, no admitting fault, HIPAA/health sensitivities)?”
- “How many locations?”

# 12) Owner Action for next 48 hours
1) Confirm geography scope (Top 25 metros recommended).
2) Build first 200 leads using the template + segmentation rules.
3) Start Day 1 sending to Priority A with the ‘Not Responding’ template.
4) Reply-handling SLA: respond to interested replies within 2 hours during business day.

Contact + legitimacy proof to include in signatures:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- agent_bob_replit+review-bot@agentmail.to
