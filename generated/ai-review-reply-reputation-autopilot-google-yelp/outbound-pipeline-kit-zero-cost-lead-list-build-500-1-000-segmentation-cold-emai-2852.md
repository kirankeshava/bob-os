# Outbound Pipeline Kit (Zero-Cost): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:26:25.659Z

---

# Outbound Pipeline Kit (Zero-Cost)
Business: **AI Review Reply & Reputation Autopilot (Google/Yelp)**  
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply/contact email: **agent_bob_replit+review-bot@agentmail.to**

## 1) Target verticals (initial 30 days)
1) **Dentists** (high LTV, steady review velocity, reputation directly impacts bookings)  
2) **Med spas / aesthetic clinics** (very review-sensitive; many negative reviews go unaddressed)  
3) **HVAC + Plumbers** (high competition in local maps; response speed and trust matter)

Parallel lane: **Marketing agencies** that manage local clients (sell as white-label “review ops autopilot”).

## 2) Lead list CSV schema (copy/paste headers)
Use this exact header row in Google Sheets/CSV:

business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_replies_count,response_rate_proxy,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Definitions
- **last_10_owner_replies_count**: number of owner/manager replies among the last 10 reviews.
- **response_rate_proxy** = last_10_owner_replies_count / 10 (0.0 to 1.0)
- **personalization_snippet**: 8–20 word quote or paraphrase from the most recent review (avoid sensitive health info; for dentists/med spas, prefer paraphrase).

## 3) Segmentation rules (deterministic)
Calculate segment:
- **Not Responding** if response_rate_proxy <= 0.2 OR last_10_owner_replies_count = 0
- **Low Rating** if google_rating < 4.2
- **High Volume** if review_count >= 200 OR last_review_date within past 14 days

Priority tiers:
- **Priority A**: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B**: Not Responding OR Low Rating
- **Priority C**: High Volume only

Routing:
- Not Responding → “response gap” email variant
- Low Rating → “escalation + save-the-next-review” variant
- High Volume → “ops + speed + consistency” variant

## 4) Zero-cost lead sourcing workflow (to reach 500–1,000)
### Step A — Choose geography (owner decision)
Pick ONE for the first batch:
- **Top 25 US metros** (recommended) OR
- **5–10 target states** OR
- **US-wide** (harder QA)

### Step B — Google Maps query pack (repeatable)
For each chosen metro/state, run queries in Google Maps:
- Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “pediatric dentist”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”, “medical aesthetics”
- Home services: “HVAC”, “air conditioning repair”, “plumber”, “drain cleaning”, “water heater repair”

Collection rule: capture businesses with (a) visible website or (b) Facebook page; skip listings with no external contact route.

### Step C — Capture review fields quickly
From the Google business panel:
- rating, review count
- click Reviews → note **date of most recent review**
- open last ~10 reviews; count owner replies (quick tally)
- grab a safe personalization snippet

### Step D — Find emails (free-first)
For each business:
1) Go to **website** → look for Contact/About footer emails.
2) If none: check **Facebook page** linked from website for email.
3) If still none: use role-based guesses (info@, contact@, office@) only if domain exists.
4) Capture 1–2 emails max; prioritize non-generic when present (manager/owner).

QA sampling: every 25 rows, verify 3 random rows for correct category + valid website.

Production target: 50–100 leads/day manual is feasible with one focused operator; use Priority A/B rules to decide which ones to keep.

## 5) Cold email sequences (3-step) — base + tokens
**Tokens:** {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{rating}}, {{review_count}}, {{vertical}}

Always include legitimacy URL + reply email.

### 5.1 Local business — Not Responding variant (Initial)
**Subject options:**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your recent reviews
3) {{business_name}} — reply to reviews within 12 hours?

**Body:**
Hi {{first_name_or_owner}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed a recent one: “{{recent_review_snippet}}”. It doesn’t look like there’s been an owner response on several recent reviews (easy to miss when things are busy).

We run a small **AI Review Reply & Reputation Autopilot**: brand-safe draft replies for Google/Yelp, negative-review escalation, and a weekly KPI recap. You can **approve replies before they post**, or we can run in “draft-only” mode.

Offer (free this week): we’ll draft replies to your last 10 reviews and set you up so new reviews get a response **within 12 hours**.

Want me to send 3 example replies for {{business_name}}?  
— Bob  
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
agent_bob_replit+review-bot@agentmail.to

### Follow-up #1 (2–3 days later)
**Subject:** Re: replies for {{business_name}}

Hi {{first_name_or_owner}},

If it’s helpful, I can draft responses that match your tone (friendly/clinical/straight-to-the-point) and flag anything negative for a quick internal follow-up.

Should I (A) send 3 sample replies here, or (B) draft your last 10 and share a doc for approval?

— Bob

### Follow-up #2 (5–7 days later)
**Subject:** Close the loop?

Hi {{first_name_or_owner}},

Last note—review responsiveness is one of the easiest “trust signals” prospects see in Maps. If you’d like, I’ll do a free mini-audit: response rate across last 10 reviews + 5 draft replies in your brand voice.

Reply with “audit” and I’ll send it over.

— Bob

---

### 5.2 Local business — Low Rating variant (Initial)
**Subject options:**
1) Fix the next review before it happens
2) {{business_name}} — quick reputation assist
3) Helping {{vertical}} teams recover ratings

**Body:**
Hi {{first_name_or_owner}},

I noticed {{business_name}} is at about {{rating}} on Google with ~{{review_count}} reviews. A recent review mentioned: “{{recent_review_snippet}}”.

When a negative review sits without a response, prospects assume it’s unresolved—even if it was handled offline.

We help local businesses respond in a **brand-safe** way (Google/Yelp), escalate negatives fast, and track weekly reputation KPIs. You can approve before anything posts.

Free this week: I’ll draft responses for your 5 most critical reviews (the ones prospects are most likely to read) and share them for approval.

Should I send the draft replies?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

### 5.3 Local business — High Volume variant (Initial)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) A simple workflow to reply faster
3) Review replies without adding admin time

**Body:**
Hi {{first_name_or_owner}},

{{business_name}} has strong review activity (~{{review_count}} total). When reviews come in frequently, replying consistently becomes an ops problem, not a marketing task.

We run an **AI Review Reply & Reputation Autopilot** that drafts replies in your tone, escalates negatives, and sends a weekly KPI report. You can approve replies before posting (or keep it draft-only).

Free this week: we’ll set up a workflow so every new review gets a draft reply within 12 hours.

Open to a 10-minute setup call, or should I just send a few samples?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 6) Agency/reseller email (Initial)
**Subject options:**
1) White-label review reply autopilot for your local clients
2) Helping agencies handle Google/Yelp replies at scale
3) Add-on service: review response + KPI reporting

**Body:**
Hi {{first_name}},

If you manage local SEO/reputation for dentists, med spas, or home services—review replies are the task that never ends.

We offer a lightweight **review reply & reputation autopilot** you can run white-label: brand-safe draft replies for Google/Yelp, negative escalation, and a weekly KPI recap per location. Clients can approve before posting, or you can handle approvals.

We’re doing free onboarding this week: I can set up 1 client location and deliver (a) last-10 review reply drafts + (b) a simple weekly KPI report.

If you tell me your main vertical + typical client count, I’ll suggest a workflow.
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7) Daily sending ops (14-day ramp, $0)
### Tools (free)
- Gmail inbox (one) to start; no tracking pixels/links besides the legitimacy URL.
- Google Sheets as CRM.

### Ramp schedule (per inbox)
- Days 1–2: 20/day (all Priority A)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50/day if bounce rate < 3% and replies remain positive

Follow-ups: 1st follow-up at day 2–3; 2nd follow-up at day 5–7.

### Deliverability guardrails
- Stop ramp if bounce rate > 5% in a day; fix list quality.
- If you get 1 spam complaint: pause for 48 hours and reduce volume.
- Keep personalization high: snippet + specific observation (response gap/rating/volume).

### Reply handling SLA
- Reply within 2 business hours.
- If prospect asks pricing: respond “free onboarding this week, can keep draft-only; after trial we can propose plan by location/review volume.”

## 8) Lightweight CRM stages (Google Sheet columns)
Stage values:
- Prospect (not sent)
- Sent
- Follow-up 1 sent
- Follow-up 2 sent
- Replied
- Qualified (has GBP/Yelp + decision-maker engaged)
- Demo booked
- Trial onboarding
- Won (paid later)
- Lost (no fit / no response)

Minimum KPIs to track daily:
- sent, replies, positive replies, demos booked.

## 9) What to execute next (exact next 48 hours)
1) Choose geography (Top 25 metros recommended).  
2) Build **200 Priority A/B leads** using the schema above (don’t wait for 1,000 to start).  
3) Send Day 1 = 20 emails (all Priority A).  
4) Log replies + objections; adjust subject lines and first 2 sentences.
