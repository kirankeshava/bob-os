# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + 3-Step Cold Email + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:13:50.210Z

---

## 1) Lead List CSV Template (copy headers into Google Sheets)
Use one row per location (avoid franchises with corporate-only review replies unless you’re targeting franchise owners).

**CSV Headers**
source,vertical,business_name,city,state,zip,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_3_reviews_dates,response_rate_proxy_last10,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,contact_page_url,personalization_snippet_recent_review,response_gap_note,notes,sequence_variant

**How to fill key fields (fast):**
- **google_rating / review_count / last_review_date:** from Google Business Profile panel.
- **response_rate_proxy_last10:** open Reviews → count owner responses in last 10 reviews. Example: 1/10 = 10%.
- **personalization_snippet_recent_review:** quote a short clause (6–12 words) OR paraphrase if safer (e.g., “mentioned wait time + friendly staff”).
- **response_gap_note:** “No owner reply on last X reviews” OR “Replies are 2–4 weeks late”.

**Segmentation rules (Sheets formulas idea):**
- **segment_not_responding:** TRUE if response_rate_proxy_last10<=0.2 OR 0 responses in last 10
- **segment_low_rating:** TRUE if google_rating<4.2
- **segment_high_volume:** TRUE if review_count>=200 OR last_review_date within 14 days

**Priority tier (routing):**
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** (not_responding) OR (low_rating)
- **Priority C:** high_volume only

**Sequence variant (set based on segment):**
- not_responding → “NR”
- low_rating → “LR”
- high_volume (but responding) → “HV”

---

## 2) Segmented Prospecting Plan (what to pull + who to email)
### Vertical focus (first 30 days)
1) **Med spas / aesthetics** (high review velocity, high margin, strong need for brand-safe replies)
2) **Dentists** (trust-sensitive, review responsiveness impacts bookings)
3) **HVAC/Plumbing** (high lead value, frequent urgent searches, review volume)

### Qualification (high-intent signals)
Target businesses with at least one of:
- **Response gap:** <=20% responses on last 10 reviews
- **Review velocity:** last review within 14 days OR steady weekly reviews
- **Reputation risk:** rating <4.2 OR multiple negative reviews unreplied

### Contacts to target
- Owner, practice manager, office manager (dental)
- Owner, clinic manager, front desk lead (med spa)
- Owner, GM, operations manager, dispatcher manager (home services)

### Offer positioning by segment
- **NR (Not responding):** “We respond within 12 hours, brand-safe, you approve.”
- **LR (Low rating):** “We triage negative reviews, escalate internally, and draft de-escalation replies.”
- **HV (High volume):** “We keep up with volume, consistent tone, weekly KPI reporting.”

---

## 3) Cold Email Sequence (3-step) — includes legitimacy link + contact email
**Business legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
**Reply/contact email:** agent_bob_replit+review-bot@agentmail.to

### Personalization tokens (use in every email)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “no owner replies on the last 8 reviews”)

### 3.1 Initial Email (NR variant — Not Responding)
**Subject options (pick 1):**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a reply gap on your recent reviews
3) Can I help you respond faster to reviews?

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews in {{city}}.

One recent review said: “{{recent_review_snippet}}” — and it looks like {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** Google/Yelp responses and keeps you caught up. Typical workflow:
- We draft replies within **12 hours**
- You **approve** (or we auto-post if you prefer)
- Negative reviews get **escalated** with a short internal summary
- Weekly KPI email (rating trend, response rate, negatives needing follow-up)

If you want, I can send 2–3 example replies for your latest reviews so you can see the tone.

Worth a quick 10 minutes this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3.2 Follow-up #1 (LR variant — Low Rating / Negatives)
**Subject:** Re: reviews at {{business_name}}

Hi {{first_name}} — quick follow-up.

When a business is under ~4.2 stars, even a few unreplied negatives can drag calls/bookings. I noticed “{{recent_review_snippet}}” and wanted to offer a simple assist:

I’ll draft a **de-escalation reply** + a short internal escalation note (what happened + suggested fix), and you can decide whether to post.

If you reply with “yes,” I’ll send draft replies for your 2 most recent negatives.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3.3 Follow-up #2 (HV variant — High Volume)
**Subject:** Should I close the loop?

Hi {{first_name}} — last note.

For locations getting frequent reviews, consistency matters: same tone, fast responses, and a simple weekly report. If {{business_name}} is getting steady review volume, we can keep responses current without adding work for your team.

If you’re open, reply with either:
1) “Send examples” (I’ll draft 2–3 replies), or
2) “Not now” (and I’ll stop)

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 4) Daily Sending Ops Checklist + CRM Stages (free/low-cost)
### CRM stages (simple)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost

**Stage rules:**
- Move to **Replied** on any response.
- Move to **Qualified** if they confirm they manage reviews and have pain (time, negatives, inconsistency).
- Move to **Lost** if “no,” “stop,” or wrong fit.

### 14-day sending ramp (per inbox)
- Day 1–2: 10–15/day
- Day 3–4: 20/day
- Day 5–7: 30/day
- Week 2: 40–50/day (only if bounce <3% and spam complaints ~0)

### Daily operator checklist (45–90 min)
1) Pull 25–50 new leads (Priority A first)
2) QA 10% sample: correct category, real local business, not a directory
3) Personalize: insert {{recent_review_snippet}} + {{response_gap}}
4) Send batch (staggered if possible)
5) Log outcomes in CRM
6) Same-day reply handling (goal SLA: <2 hours during business day)
7) Send follow-ups to non-responders per schedule

### Weekly checklist
- Review KPIs: sent, delivered, bounced, replies, meetings booked
- Refresh list: add new metros/vertical pockets
- Tighten targeting: double down on segments with best reply rate

---

## 5) What I need from the owner to generate the actual 500–1,000 lead CSV
Choose one geography scope for the first list:
A) Top 25 US metros
B) 5–10 target states
C) US-wide

Once chosen, the query pack becomes deterministic (vertical × metro/state) and the list can be built quickly with consistent quality and segmentation.