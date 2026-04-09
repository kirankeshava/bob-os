# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:37:56.416Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1: $0 spend)

Business legitimacy link to include in outreach (website): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply contact email: agent_bob_replit+review-bot@agentmail.to

---
## 1) ICP + Verticals (pick 2–3, already aligned)
**Verticals:**
1) Dentists / Orthodontists / Cosmetic dentistry
2) Med spas / Aesthetic clinics
3) HVAC + Plumbers (home services)

**Why:** High review velocity, ratings materially impact leads, and owners often fail to respond consistently.

---
## 2) Segmentation + Priority Scoring (operational rules)
You will tag each prospect with a **segment** and **priority** using publicly visible Google review data.

### Required segments
**A) not_responding**
- Response-rate proxy ≤ 20% (≤2 owner responses in last 10 reviews), OR
- 0 owner responses in last 10 reviews

**B) low_rating**
- Google rating < 4.2

**C) high_volume**
- Review_count ≥ 200 OR last_review_date within last 14 days

> Prospects can match multiple segments.

### Priority tiers (for who to email first)
**Priority A (best):**
- (not_responding AND high_volume) OR (low_rating AND high_volume)

**Priority B:**
- not_responding OR low_rating (but not high_volume)

**Priority C:**
- high_volume only

### Personalization token rules (brand-safe)
- Use **review snippet**: quote up to 8–12 words from the most recent review; avoid medical claims; do not repeat sensitive content.
- If negative review: paraphrase the topic (“wait time”, “billing”, “communication”) rather than quoting accusatory text.

---
## 3) Lead List CSV / Google Sheet Template (copy-paste headers)
Create a Google Sheet and add these columns in row 1:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_responses_count,segment_tags,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,response_gap_note,notes

### Data dictionary (what each column means)
- **business_name**: GBP name
- **vertical**: dentist | med_spa | hvac_plumbing | agency
- **city_state**: “Austin, TX”
- **website**: from GBP
- **phone**: from GBP
- **google_maps_url**: share link
- **google_rating**: star rating
- **review_count**: total reviews
- **last_review_date**: date of latest review
- **last_10_responses_count**: count of owner responses in last 10 reviews
- **response_rate_proxy**: last_10_responses_count/10 (enter as %)
- **segment_tags**: comma-separated (not_responding, low_rating, high_volume)
- **priority_tier**: A | B | C
- **owner_or_manager_name**: best guess from About/Team/LinkedIn/GBP Q&A
- **role_guess**: Owner | Practice Manager | Office Manager | GM | Marketing Manager
- **email_1/email_2**: from website contact page; if none, use generic format guesses only if published elsewhere
- **personalization_snippet**: 8–12 word quote or safe paraphrase
- **response_gap_note**: “No owner replies visible in last 10” or “Last reply was 6+ months ago”
- **notes**: anything useful (multi-location, franchise, heavy ad spend indicators, etc.)

### Suggested formulas (Google Sheets)
If you input **last_10_responses_count** in a column (say column K), then:
- **response_rate_proxy** (column J): `=K2/10`
- **high_volume flag** (helper): `=IF(OR(H2>=200, I2>=TODAY()-14), TRUE, FALSE)` (requires last_review_date as a date)
- **low_rating flag**: `=IF(G2<4.2, TRUE, FALSE)`
- **not_responding flag**: `=IF(J2<=0.2, TRUE, FALSE)`
- **priority**:
  `=IF(OR(AND(J2<=0.2, OR(H2>=200, I2>=TODAY()-14)), AND(G2<4.2, OR(H2>=200, I2>=TODAY()-14))), "A", IF(OR(J2<=0.2, G2<4.2), "B", IF(OR(H2>=200, I2>=TODAY()-14), "C", "")))`

---
## 4) Google Maps Query Pack (Top metros, copy/paste)
Use these queries in Google Maps and pull the top results that match category + have a website.

### Recommended metros (Top 15 starter set)
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Charlotte NC.

### Query patterns
Replace {METRO}.

**Dentists**
- “cosmetic dentist {METRO}”
- “family dentistry {METRO}”
- “dental implants {METRO}”

**Med spas**
- “med spa {METRO}”
- “botox {METRO}”
- “laser hair removal {METRO}”

**HVAC/Plumbing**
- “HVAC repair {METRO}”
- “air conditioning contractor {METRO}”
- “plumber {METRO}”

### Agency / reseller lane queries
Goal: agencies already serving local SMBs; they can resell or bundle.
- “dental marketing agency {METRO}”
- “med spa marketing agency {METRO}”
- “home services marketing agency {METRO}”
- “local SEO agency {METRO}”

---
## 5) Cold Email Sequence Pack (3 steps) — includes website + contact email

### Universal subject lines (rotate)
1) “Quick question about your Google reviews”
2) “Re: responding to recent reviews”
3) “{{business_name}} — review reply help?”

### Personalization tokens
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap_note}}
- {{vertical_specific_line}}


## 5A) Local business — NOT RESPONDING variant (Email 1)
**Subject:** {{business_name}} — quick question about review replies

Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_note}}. One recent review mentioned: “{{recent_review_snippet}}”.

I’m building an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses to Google (and Yelp), escalates negatives, and gives a weekly KPI summary. The promise is simple: **responses within 12 hours** and you can **approve before anything posts**.

If I send 2–3 sample replies in your tone for recent reviews, would you want to see them?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to


## 5B) Local business — NOT RESPONDING (Follow-up 1)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Totally understand if review replies aren’t top of the list.

Quick sanity check: if we handled **daily review responses + negative-review escalation**, would that be helpful for {{business_name}}? It’s designed for owners/managers who don’t have time to reply consistently.

If yes, reply with “sample” and I’ll send sample responses for your latest 3 reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to


## 5C) Local business — NOT RESPONDING (Follow-up 2)
**Subject:** Should I close the loop?

Hi {{first_name}},

Should I close the loop here, or is there someone else who owns online reputation/reviews for {{business_name}}?

If you point me to the right person, I’ll send a couple brand-safe sample replies and you can decide.

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 5D) Local business — LOW RATING variant (Email 1)
**Subject:** Quick idea to lift {{business_name}}’s rating

Hi {{first_name}},

I saw {{business_name}} is at **{{google_rating}}** on Google. A recent review mentioned “{{recent_review_snippet}}”.

One lever that often helps (fast) is consistent, professional owner responses—especially on 1–3 star reviews—so future searchers see accountability.

I’m building an **AI Review Reply & Reputation Autopilot**: brand-safe drafts, negative-review escalation, and weekly reputation KPIs. You can approve replies before anything posts.

Open to a quick test? I’ll draft responses for your last 5 reviews (including negatives) so you can compare.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 5E) Local business — HIGH VOLUME variant (Email 1)
**Subject:** Keeping up with {{business_name}}’s review volume

Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}} total). I noticed a recent one: “{{recent_review_snippet}}”.

When review volume is high, the problem becomes throughput + consistency. I’m building an **AI Review Reply & Reputation Autopilot** that drafts on-brand responses, escalates negatives, and reports weekly KPIs—so replies stay fast without pulling your team off ops.

If I send a small batch of sample replies (10), would you like to review them?

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 5F) Vertical-specific one-liners (insert into Email 1 after intro)
**Dental:** “Patients often mention scheduling, wait time, and bedside manner—replies really influence calls.”

**Med spa:** “Prospects compare tone and trust heavily; quick, compliant replies help protect conversion.”

**HVAC/Plumbing:** “Emergency services reviews drive calls—fast replies build trust when people are choosing in minutes.”

---
## 5G) Agency / reseller version (Email 1)
**Subject:** White-label review reply autopilot for your clients?

Hi {{first_name}},

Reaching out because you work with local businesses ({{agency_niche}}). I’m building an **AI Review Reply & Reputation Autopilot** for Google/Yelp that drafts brand-safe responses, escalates negatives, and sends weekly reputation KPIs.

This fits well as a **white-label add-on**: you keep the client relationship, we keep replies fast (≤12 hours) and consistent. You can choose “client approves” mode.

Would you be open to piloting it on 1–2 accounts for free this week?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 6) Daily Sending Ops (Week 1, $0 tooling)

### CRM stages (simple pipeline)
1) **Prospect** (in sheet, not contacted)
2) **Sent** (date_sent)
3) **Replied**
4) **Qualified** (has GBP access path + real pain)
5) **Demo Booked**
6) **Trial (Free Week)**
7) **Paid** (post week-1)
8) **Lost** (reason)

### Daily activity targets (manual sending)
- Day 1–2: 20–30 new emails/day (deliverability cautious)
- Day 3–5: 40–60/day
- Day 6–14: 75–100/day (only if bounce < 3% and replies steady)
- Follow-ups: 1 follow-up/day per prospect (do not spam; max 2 follow-ups)

### 14-day ramp schedule (high-level)
- **D1–D2:** 20–30/day, only Priority A
- **D3–D4:** 40/day, Priority A + best Priority B
- **D5–D7:** 60/day, expand to Priority B
- **D8–D14:** 75–100/day, introduce Priority C + agencies

### List QA rules (do before sending)
- Must have a website OR a clearly listed contact email on GBP/website
- Exclude: franchises with corporate-only contact, businesses without phone/website, categories that don’t match vertical
- Check last review recency: deprioritize if no reviews in 6+ months unless rating is low
- Avoid sensitive negative review details in the email body; paraphrase

### Bounce/complaint safety thresholds
- If bounces > 5% in a day: stop, audit emails, remove risky domains
- If spam complaints: stop and rewrite copy shorter + remove links for next batch

### Reply handling SLA
- Reply to all positives within 2 hours during business day
- If “not interested”: tag Lost + reason
- If “send samples”: draft 3 sample replies (1 positive, 1 neutral, 1 negative) and send within 12 hours

---
## 7) What to do tomorrow (fastest path)
1) Choose geography: **Top 15 metros** above.
2) Build **first 50 leads per vertical** (150 total) using the CSV template.
3) Email **Priority A first** using NOT RESPONDING or LOW RATING variants.
4) Track replies in the same sheet (date_sent, reply status).

If you want, you can paste 10 real prospects back to me (just business name + Google Maps URL) and I’ll generate the exact personalized Email 1 drafts using their latest review snippet and response gap note.
