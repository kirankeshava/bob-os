# Outbound Pipeline: 500–1,000 Lead Build (Zero-Cost) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:47:28.643Z

---

# Outbound Pipeline (Week 1: Free Launch, $0 Tools)
Business legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply-to/contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Target Verticals + Geography (locked)
**Verticals (direct-to-local):**
1) Dentists / Dental clinics
2) Med spas / Aesthetic clinics
3) HVAC + Plumbing (home services)

**Metro scope (Top 15, fast density):**
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Charlotte NC.

**Why this scope:** high review velocity + high LTV + lots of businesses per metro → fastest path to 500–1,000 leads with manual/VA collection.

## 2) Lead CSV Template (copy/paste headers)
Use Google Sheets; export as CSV when done.

**Headers:**
business_name,vertical,category_on_maps,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_response_count,response_rate_proxy,segment,priority,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,linkedin_url,notes

### Data Dictionary (what to capture)
- **google_rating / review_count:** from Google Business Profile panel.
- **last_review_date:** date of most recent Google review.
- **last_10_response_count:** in the last 10 Google reviews, count how many owner/management responses exist.
- **response_rate_proxy:** last_10_response_count/10.
- **personalization_snippet:** 1–2 lines from latest review OR paraphrase (safer) + mention whether there’s a response gap.
- **email_1/email_2:** from website contact page; if none, use formats you can infer only if it’s explicitly listed (otherwise leave blank for later enrichment).

### Segmentation Rules
Compute in Sheets:
- **response_rate_proxy:** `=IFERROR(last_10_response_count/10,0)`
- **segment** (choose ONE primary):
  - **not_responding** if `response_rate_proxy<=0.2`
  - **low_rating** if `google_rating<4.2`
  - **high_volume** if `review_count>=200 OR (TODAY()-last_review_date)<=14`
  - If multiple apply, pick the one that creates the strongest hook:
    1) low_rating (most urgent)
    2) not_responding
    3) high_volume
- **priority scoring** (A/B/C):
  - **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
  - **Priority B:** low_rating OR not_responding
  - **Priority C:** high_volume only

**Sheets formulas (example):**
- priority:
`=IFS(AND(segment="not_responding",OR(review_count>=200,(TODAY()-last_review_date)<=14)),"A",AND(segment="low_rating",OR(review_count>=200,(TODAY()-last_review_date)<=14)),"A",OR(segment="low_rating",segment="not_responding"),"B",segment="high_volume","C",TRUE,"C")`

## 3) Google Maps Query Pack (exact searches)
Goal: consistent categories; reduce irrelevant results.

### Dentists
Use these per metro (replace {CITY}):
- "Dentist {CITY}" 
- "Dental clinic {CITY}" 
- "Cosmetic dentist {CITY}" 
- "Emergency dentist {CITY}" 

### Med Spas
- "Med spa {CITY}" 
- "Aesthetic clinic {CITY}" 
- "Botox {CITY}" 
- "Laser hair removal {CITY}" 

### HVAC / Plumbing
- "HVAC contractor {CITY}" 
- "Air conditioning repair {CITY}" 
- "Plumber {CITY}" 
- "Plumbing company {CITY}" 

### Agency / Reseller Lane (parallel list)
Per metro or state-wide:
- "Local SEO agency {CITY}" 
- "Reputation management agency {CITY}" 
- "Digital marketing agency {CITY}" 
- "Marketing agency dentists {CITY}" 
- "Marketing agency med spa {CITY}" 
- "Home services marketing agency {CITY}"

**Agency lead fields:** business_name, city/state, website, phone, owner name if listed, email, niche notes (“dentist SEO”, “med spa ads”).

## 4) List-Build SOP (manual/VA, $0)
**Per lead (2–4 minutes each):**
1) Run query on Google Maps.
2) Open business listing.
3) Copy: name, phone, website, rating, review count, maps URL.
4) Click Reviews → read newest review date; capture last_review_date.
5) In last 10 reviews, count responses → last_10_response_count.
6) Take a safe personalization snippet:
   - Preferred: paraphrase (“Saw a recent review mentioning wait time…”) rather than quoting full name/details.
7) Visit website → Contact page → capture email(s) + contact name/role if listed.
8) Paste into Sheet; formulas assign segment + priority.

**QA rules (sample 10% daily):**
- Must be correct category (not a school/franchise directory).
- Must have website or phone.
- Must have >=20 reviews (avoid tiny/no-signal profiles).
- Personalization_snippet must not include sensitive info.

**Daily production targets (one VA):**
- 50 leads/day = 10 working days → 500 leads.

## 5) Cold Email Sequence (3 touches) — Direct-to-Local
All variants include: legitimacy link + reply-to email.

### Universal Tokens
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (paraphrased)
- {{response_gap}} (e.g., “I didn’t see an owner reply yet”)

### (A) NOT RESPONDING variant (best for most profiles)
**Email 1 — Subject options:**
1) Quick question about your Google reviews
2) {{business_name}} — review replies
3) Saw a recent review in {{city}}

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_snippet}}. {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts brand-safe replies to Google (and Yelp) reviews and keeps response time under **12 hours**. You can approve replies (or we can auto-post using your guidelines).

If it helps, we can do this **free for 7 days** so you can see the impact on response rate and customer sentiment. Here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to set your brand voice + escalation rules?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (48–72h):**
Subject: Re: {{business_name}} review replies

Hi {{first_name}} — bumping this.

Most local businesses we talk to don’t have a time problem, they have an **ops problem**: reviews come in nights/weekends and nobody wants to risk saying the wrong thing.

If you want, reply “yes” and I’ll send a 2-question setup (brand tone + who to escalate negatives to). Free for 7 days.

— Bob

**Follow-up 2 (day 6–7):**
Subject: Should I close the loop?

Hi {{first_name}} — should I close the loop here?

If you’re not focused on review replies right now, no worries. If you are, we can start with just:
- Draft replies for new Google reviews
- Escalate 1–2 star reviews immediately
- Weekly KPI report (response rate + rating trend)

Want me to send the quick setup link? (Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

— Bob

### (B) LOW RATING variant (more sensitive)
**Email 1 — Subject options:**
1) Quick idea to help with review recovery
2) {{business_name}} rating + replies
3) Reputation ops in {{city}}

**Body:**
Hi {{first_name}} — I was researching {{business_name}} and saw a recent review that mentioned {{recent_review_snippet}}.

When ratings dip, the fastest lever is usually **consistent, careful owner responses** + immediate escalation of negative feedback (so issues get resolved offline).

We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp: brand-safe drafts, escalation rules, and a weekly KPI report. We’ll run it **free for 7 days** so you can see if response rate and sentiment move.

Worth a quick 10 minutes to set tone + what you want escalated? Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### (C) HIGH VOLUME variant (throughput/consistency)
**Email 1 — Subject options:**
1) Handling review volume at {{business_name}}
2) Keeping up with Google reviews
3) Quick ops fix for review replies

**Body:**
Hi {{first_name}} — {{business_name}} gets a lot of reviews (nice work). I noticed {{recent_review_snippet}} and it looks like keeping replies consistent is becoming a throughput issue.

We run an **AI Review Reply & Reputation Autopilot** (Google/Yelp):
- Draft replies in your brand voice
- Respond within **12 hours**
- Escalate negatives immediately
- Weekly KPI report

Can we run a **free 7-day trial** and measure response rate + sentiment? Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 6) Agency/Reseller Cold Email (separate lane)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp reply ops (done-for-you)
3) Quick partnership idea

**Body:**
Hi {{first_name}} — I’m reaching out because {{agency_name}} works with local businesses, and review responses are one of those “important but never done” tasks.

We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp: brand-safe drafts, escalation of negative reviews, and weekly KPI reporting. Agencies can offer it as:
- a white-label add-on, or
- an ops layer you bundle into your SEO/reputation package.

We’re offering **7 days free** for 1 client to prove it. If it works, we can talk about a simple reseller arrangement.

Open to a quick call? Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 7) Daily Sending Ops (Week 1, $0 stack)
**Tooling (free):**
- Google Sheets = CRM + list
- Gmail (existing) for small volume; keep daily volume conservative

**CRM stages (Sheet column: stage):**
Prospect → Queued → Sent (E1) → Follow-up 1 → Follow-up 2 → Replied → Qualified → Demo Booked → Trial (7-day free) → Won → Lost

**Daily targets (safe ramp without paid warmup/tools):**
- Day 1: 15 new emails
- Day 2: 20
- Day 3: 25
- Day 4: 30
- Day 5: 35
- Day 6: 40
- Day 7: 45
- Day 8+: 50/day (only if bounce <3% and no spam complaints)

**Rules:**
- Always send Priority A first, then B, then C.
- Personalize first line using snippet + response gap.
- If any sender sees bounces >5% in a day: pause, clean list, reduce volume.
- Reply SLA: within 2 hours during business day.

**Weekly KPI to track in Sheet:**
Sent, Delivered (approx), Bounced, Replies, Positive replies, Calls booked, Trials started.

## 8) What to do next (48 hours)
1) Assign list build: 50 leads/day using the query pack (start with 5 metros × 3 verticals).
2) Build first 200 leads; prioritize “not responding” + “high volume”.
3) Start sending Day-1 volume to Priority A only; log replies in CRM sheet.

If you want, I can also produce a one-tab Google Sheets CRM layout (columns + dropdowns) that matches the stages above so the first batch can be sent the same day the first 50 leads are collected.
