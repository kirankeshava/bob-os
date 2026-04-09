# Outbound Pipeline Execution Kit — Lead List CSV Template + Segmentation/Scoring + Cold Email Pack (with legitimacy URL)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:26:58.146Z

---

## 1) Lead List CSV Template (copy these headers into Google Sheets/CSV)

**Core prospect fields**
- business_name
- vertical (dentist | med_spa | hvac_plumbing)
- city
- state
- zip
- address
- phone
- website_url
- google_maps_url
- yelp_url (if present)

**Review signals (Google)**
- google_rating (e.g., 4.3)
- google_review_count (integer)
- last_review_date (YYYY-MM-DD)
- last_review_star (1–5)
- recent_review_snippet (max ~140 chars; quote exactly or paraphrase safely)

**Response behavior proxy (manual from last ~10 reviews)**
- last10_reviews_checked (integer, usually 10)
- last10_owner_responses_count (integer)
- response_rate_proxy (formula)

**Decision-maker + contact**
- contact_name
- contact_role_guess (owner | practice_manager | office_manager | general_manager | marketing)
- email_1
- email_2
- email_source (website | contact page | google business site | facebook | linkedin)

**Segmentation + routing**
- segment_not_responding (TRUE/FALSE)
- segment_low_rating (TRUE/FALSE)
- segment_high_volume (TRUE/FALSE)
- priority_tier (A/B/C)
- email_angle (responsiveness_gap | low_rating_recovery | high_volume_ops)
- personalization_hook (what you’ll reference: e.g., “noticed you didn’t reply to several recent reviews…”) 
- notes

### Data dictionary (what “good” looks like)
- **recent_review_snippet**: Prefer a *neutral* snippet or paraphrase; avoid quoting sensitive medical details. Example paraphrase: “a recent reviewer mentioned wait times and communication.”
- **response_rate_proxy**: Use last 10 reviews on Google. Count how many have an owner reply.
- **segment rules**:
  - Not responding: response_rate_proxy ≤ 0.2 OR last10_owner_responses_count = 0
  - Low rating: google_rating < 4.2
  - High volume: google_review_count ≥ 200 OR last_review_date within 14 days
- **priority tiers**:
  - Priority A: (not responding AND high volume) OR (low rating AND high volume)
  - Priority B: not responding OR low rating
  - Priority C: high volume only

### Google Sheets formulas (assumes columns)
Assume:
- last10_reviews_checked in column P
- last10_owner_responses_count in column Q
- response_rate_proxy in column R
- google_rating in column K
- google_review_count in column L
- last_review_date in column M

**R2 (response_rate_proxy):**
=IFERROR(Q2/P2,0)

**segment_not_responding (S2):**
=OR(R2<=0.2,Q2=0)

**segment_low_rating (T2):**
=K2<4.2

**segment_high_volume (U2):**
=OR(L2>=200, M2>=TODAY()-14)

**priority_tier (V2):**
=IF(OR(AND(S2,U2),AND(T2,U2)),"A",IF(OR(S2,T2),"B",IF(U2,"C","")))

**email_angle (W2):**
=IF(T2,"low_rating_recovery",IF(S2,"responsiveness_gap",IF(U2,"high_volume_ops","")))

---

## 2) Cold Email Pack (3-step sequence + breakup)

Use sender signature like:
**— {{your_name}}**
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: {{your_email}}

### Personalization tokens
- {{business_name}}
- {{city}}
- {{vertical_phrase}} (e.g., “dental practice”, “med spa”, “HVAC company”)
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner reply on several of the most recent reviews.”)
- {{google_rating}} / {{google_review_count}}

### Email 1 — Initial (choose angle by segment)
**Subject line options (rotate):**
1) Quick question about {{business_name}} reviews
2) Noticed something on your Google reviews
3) 12-hour review replies for {{business_name}}?

**Body (Responsiveness-gap angle / Not responding):**
Hi {{contact_name_or_there}},

I was looking at {{business_name}}’s Google reviews in {{city}}—{{recent_review_snippet}}.

{{response_gap}} We built a small system that drafts *brand-safe* responses and keeps you consistently replying (typically within 12 hours). You can approve everything before it posts.

If I send a 5-review “reply makeover” (draft replies for your 5 most recent reviews), who’s the best person to run that by?

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

**Body (Low-rating recovery angle / Low rating):**
Hi {{contact_name_or_there}},

I saw {{business_name}} is at about {{google_rating}} on Google. One recent review mentioned: “{{recent_review_snippet}}”.

We help {{vertical_phrase}} teams respond quickly and consistently, escalate negative reviews to you immediately, and track weekly reputation KPIs—without sounding robotic or defensive. You approve before anything posts.

Open to a quick look? I can draft responses for the last 3 negative reviews + 3 recent positives so you can see the tone.

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

**Body (High-volume ops angle / High volume):**
Hi {{contact_name_or_there}},

{{business_name}} has strong review activity ({{google_review_count}}+). When volume is high, responses often slip—even if service is great.

We run an “AI review reply autopilot” that drafts on-brand replies, flags negatives for escalation, and sends a weekly KPI summary (rating trend, response time, % responded).

Want me to draft responses for your last 10 reviews so you can see the quality? If yes, who owns reviews on your side?

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

### Email 2 — Follow-up (Day 2–3)
**Subject:** Re: {{business_name}} reviews

Hi {{contact_name_or_there}},

Circling back—happy to do the small “sample pack” first:
- 5 draft replies in your brand voice (2 positive, 2 neutral, 1 negative)
- clear escalation note for the negative one
- you approve before anything posts

If you tell me who handles Google/Yelp reviews for {{business_name}}, I’ll send it over.

— {{your_name}}
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

### Email 3 — Follow-up (Day 6–8) with a “micro-audit”
**Subject:** Quick audit for {{business_name}} (30 sec)

Hi {{contact_name_or_there}},

I took another look at {{business_name}}’s recent reviews. Two quick wins usually move the needle fast:
1) Responding to recent reviews within 24–48 hours
2) Having a consistent tone + escalation process for negatives

If you want, reply with “audit” and I’ll send:
- your response-rate proxy estimate (based on last ~10 reviews)
- 3 suggested reply templates that match your category

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

### Breakup (Day 12–14)
**Subject:** Close the loop?

Hi {{contact_name_or_there}},

Should I stop reaching out about review replies for {{business_name}}?

If it’s not a priority, no worries—just reply “later” and I’ll follow up next month.
If someone else owns reviews, reply with their name and I’ll contact them instead.

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
{{your_email}}

---

## 3) Daily Sending Ops (minimum viable)
- Day 1–2: 20–30 sends/day, plain text, 1 link max (the website URL), no attachments.
- Day 3–5: 40–60 sends/day, start Follow-up #1.
- Day 6–10: 60–100 sends/day, run Follow-up #2, keep bounce rate <3% and spam complaints ~0.
- Always: stop sequence immediately if they reply; route to CRM stage “Replied”.

**CRM stages (simple):** Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost.

If you confirm the initial geography scope, I can translate this into a locked query list (exact Google Maps search strings by metro + vertical) and a 48-hour production target for the first 200 leads.