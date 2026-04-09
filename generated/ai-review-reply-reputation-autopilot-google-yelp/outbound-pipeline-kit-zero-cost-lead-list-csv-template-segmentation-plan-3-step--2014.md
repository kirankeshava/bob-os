# Outbound Pipeline Kit (Zero-Cost): Lead List CSV Template + Segmentation Plan + 3-Step Cold Emails + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:15:33.081Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Zero-Cost)

## 1) Target verticals (initial 30 days)
1) **Dentists** (high LTV, reputation sensitive, steady review flow)
2) **Med spas / aesthetic clinics** (very review-driven, appointment-based, competitive)
3) **HVAC + plumbers** (lead-gen sensitive, strong volume in-season)

## 2) Segmentation + Priority (what to message + who to hit first)
**Required fields** (from Google Business Profile): rating, review_count, last_review_date, last_10_reviews_owner_responses (count).

### Segments
- **Not Responding**: owner responses in last 10 reviews ≤ 2 (≤20%) OR clearly no owner replies visible.
- **Low Rating**: rating < 4.2.
- **High Volume**: review_count ≥ 200 OR last_review_date ≤ 14 days.

### Priority score routing
- **Priority A**: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B**: Not Responding OR Low Rating
- **Priority C**: High Volume only

### Message angle by segment
- **Not Responding**: “response gap → lost calls/appointments; we respond within 12 hours; you approve.”
- **Low Rating**: “damage control + escalation; route negatives fast; reduce churn; brand-safe responses.”
- **High Volume**: “ops + throughput; never miss a review; weekly KPI report.”

## 3) Lead list CSV template (copy/paste header)
Use Google Sheets, one row per location.

```csv
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,owner_responses_last_10,response_rate_proxy,segment,priority,contact_name,role_guess,email_1,email_2,notes
```

### Formulas (Google Sheets examples)
Assume columns:
- google_rating in G, review_count in H, last_review_date in I, owner_responses_last_10 in K.

**response_rate_proxy (L):**
- `=IF(K2="", "", K2/10)`

**segment (M):**
- `=TEXTJOIN(";",TRUE, IF(L2<=0.2,"not_responding",""), IF(G2<4.2,"low_rating",""), IF(OR(H2>=200, TODAY()-I2<=14),"high_volume",""))`

**priority (N):**
- `=IF(OR(AND(SEARCH("not_responding",M2),SEARCH("high_volume",M2)), AND(SEARCH("low_rating",M2),SEARCH("high_volume",M2))),"A", IF(OR(ISNUMBER(SEARCH("not_responding",M2)), ISNUMBER(SEARCH("low_rating",M2))),"B","C"))`

(If SEARCH errors, wrap with IFERROR in your sheet.)

## 4) Zero-cost lead sourcing SOP (to reach 500–1,000)
### Step-by-step (per lead, 2–4 minutes once practiced)
1) Google Maps search query (examples):
   - “dentist + {CITY}”
   - “med spa + {CITY}” / “aesthetic clinic + {CITY}”
   - “HVAC contractor + {CITY}” / “plumber + {CITY}”
2) Open listing → capture: name, phone, website, rating, review count, Maps URL.
3) Click **Reviews** → sort by newest.
4) Capture **last review date** and a short **snippet** (≤15–25 words). Prefer paraphrase if it includes sensitive health info.
5) In the last 10 reviews, count how many have an **Owner response** → fill owner_responses_last_10.
6) Find email:
   - Check website footer/contact page.
   - If none: try “Contact”, “About”, “Locations”, “Team”.
   - If still none: use a role email guess only if domain exists (info@, office@, hello@). Mark as “guessed” in notes.

### QA rules (prevent garbage leads)
- Exclude: franchises with corporate-only contacts, listings without websites, categories that don’t match the vertical, businesses with <20 reviews (unless clearly high-end).
- Prefer: independent operators, recent review activity (last 30 days), visible response gaps.

## 5) Cold email pack (3-step) — include website + contact email
**Sender:** Bob
**Legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Reply-to/contact:** agent_bob_replit+review-bot@agentmail.to

### 5A) Direct-to-local — Not Responding variant (Email 1)
**Subject options:**
1) Quick fix for unanswered Google reviews at {{business_name}}
2) Noticed a response gap on your latest reviews
3) {{city_state}} customers are leaving reviews — are you replying?

**Body:**
Hi {{contact_name_or_owner}},

I was looking at {{business_name}}’s Google reviews and noticed a few recent ones aren’t getting an owner reply (e.g., “{{last_review_snippet}}”).

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses and helps you reply **within 12 hours**. You can **approve/edit** before anything posts, and negative reviews get **escalated** so they don’t sit.

If I send 2–3 sample replies for your latest reviews, would you like them in a Google Doc or email?

– Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 5B) Direct-to-local — Low Rating variant (Email 1)
**Subject options:**
1) A quick reputation win for {{business_name}}
2) Helping {{city_state}} businesses recover from tough reviews
3) Can I draft replies to your recent Google reviews?

**Body:**
Hi {{contact_name_or_owner}},

Saw {{business_name}}’s recent Google feedback — one review said: “{{last_review_snippet}}”.

When ratings dip, the fastest lever is consistent, professional replies + fast escalation for negative reviews. We draft **brand-safe** responses, route negatives to you immediately, and publish only with your approval.

Want me to draft replies to your 3 most recent reviews (free) so you can compare before/after?

– Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 5C) Direct-to-local — High Volume variant (Email 1)
**Subject options:**
1) Keeping up with your review volume at {{business_name}}
2) You’re getting a lot of reviews — want replies handled?
3) 12-hour review replies for {{business_name}}

**Body:**
Hi {{contact_name_or_owner}},

{{business_name}} is getting steady review volume in {{city_state}}. Most teams fall behind simply because it’s another daily task.

We can handle review replies end-to-end: draft **on-brand** responses, send them for **approval**, post quickly, and send a **weekly KPI report** (rating trend, response rate, negative review alerts).

Open to a 10-minute call to see if this saves you time this month?

– Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up #1 (2–3 business days later)
**Subject:** Re: {{business_name}} reviews

Hi {{contact_name_or_owner}},

If it helps, I can send:
1) a drafted reply to “{{last_review_snippet}}”, and
2) a simple weekly report template (response rate, rating trend, negative alerts).

Should I send that over?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up #2 (5–7 business days later)
**Subject:** Close the loop?

Hi {{contact_name_or_owner}},

Last note — want me to prepare a **free 7-day trial** where we draft replies for new reviews and you just approve/deny?

If yes, reply with the best email for whoever manages Google reviews at {{business_name}}.

– Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 6) Agency / reseller lane (initial email)
**Subject options:**
1) White-label review replies for your local clients
2) Quick add-on offer for your agency clients
3) Review response autopilot (you resell)

**Body:**
Hi {{first_name}},

If you manage local businesses (dentists/med spas/home services), we can be your fulfillment partner for review replies.

We provide: brand-safe drafted responses, optional client approval flow, negative-review escalation, and weekly reputation KPIs — packaged as a simple add-on you can resell.

Want me to send a 1-page overview and a sample weekly KPI report?

– Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7) Daily sending ops (14-day ramp, 1 inbox, zero-cost tools)
### Tooling (free)
- **Gmail/Google Workspace free trial if available** OR existing inbox (keep volume low)
- **HubSpot CRM Free** (or Airtable Free)
- Google Sheets for list + segmentation

### Ramp schedule (conservative deliverability)
- Days 1–2: 10–15 new sends/day (mostly Priority A)
- Days 3–4: 20–25/day
- Days 5–7: 30–40/day
- Week 2: 40–60/day if bounces <5% and replies steady

### Rules
- Personalize first line with review snippet + response gap.
- Never attach files; link to website only.
- Stop sending to any domain after 2 hard bounces.

### Bounce/complaint thresholds
- Hard bounce rate > 5% in a day: pause new sends, fix list hygiene.
- Spam complaints: immediately reduce volume and tighten targeting.

### Reply SLA
- Respond to positive replies within **2 hours** during business day.
- For “who are you?” replies: send 3-bullet explanation + legitimacy link.

## 8) CRM pipeline (stages + entry/exit)
1) **Prospect (Ready)**: row has email + segment + priority
2) **Sent**: email #1 sent
3) **Follow-up 1 Sent**
4) **Follow-up 2 Sent**
5) **Replied – Positive**: asked question / interested
6) **Qualified**: has Google Business Profile access owner/manager + review volume
7) **Demo Booked**
8) **Trial (7 days free)**
9) **Paid** (post-week-1)
10) **Lost** (no fit / no response / wrong contact)

## 9) Daily activity targets (starting point)
- Build/QA leads: **25–50/day** until 500–1,000 reached
- Send new emails: **20–60/day** (per ramp)
- Follow-ups: **equal to new sends** once pipeline matures
- Agency lane: **10 targeted emails/day** (small, high-quality list)

---
If you choose the geography (Top 25 metros vs specific states), the query list can be locked and list-building can begin immediately with the CSV template above.