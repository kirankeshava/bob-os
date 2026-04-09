# Outbound Pipeline Kit (Ready-to-Run): CSV Template + Segmentation Rules + Cold Email Sequences + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:16:36.979Z

---

OUTBOUND PIPELINE KIT — AI Review Reply & Reputation Autopilot (Google/Yelp)
Website to reference for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) LEAD LIST CSV TEMPLATE (HEADERS)
Copy/paste as row 1 in Google Sheets/CSV:
lead_id,vertical,priority_tier,segment_primary,business_name,city,state,phone,website_url,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_owner_responses,personalization_snippet,service_subtype,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes,source_query,date_added,last_contacted_date,sequence_variant,send_status,last_reply_status

B) DATA DICTIONARY (WHAT EACH FIELD MEANS)
- vertical: Dentist | Med Spa | HVAC/Plumbing | Agency
- google_rating: numeric from GBP (e.g., 4.1)
- review_count: total reviews shown on GBP
- last_review_date: date of most recent review on GBP
- response_rate_proxy: % = (owner responses in last 10 reviews / 10). If fewer than 10, divide by count captured.
- segment_primary (choose 1):
  1) not_responding: response_rate_proxy <= 0.20 OR 0 owner responses in last 10
  2) low_rating: google_rating < 4.2
  3) high_volume: review_count >= 200 OR last_review_date within 14 days
- priority_tier rules:
  - Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  - Priority B: not_responding OR low_rating
  - Priority C: high_volume only
- personalization_snippet: 8–20 words from a recent review OR paraphrase (avoid PHI; avoid naming individuals)

C) SEGMENTATION FORMULAS (GOOGLE SHEETS EXAMPLES)
Assume columns:
- google_rating in K
- review_count in L
- last_review_date in M
- response_rate_proxy in N

segment_primary (example logic—if multiple apply, keep the most urgent in this order: low_rating, not_responding, high_volume):
=IF(K2<4.2,"low_rating",IF(N2<=0.2,"not_responding",IF(OR(L2>=200,TODAY()-M2<=14),"high_volume","")))

priority_tier:
=IF(OR(AND(N2<=0.2,OR(L2>=200,TODAY()-M2<=14)),AND(K2<4.2,OR(L2>=200,TODAY()-M2<=14))),"A",IF(OR(N2<=0.2,K2<4.2),"B",IF(OR(L2>=200,TODAY()-M2<=14),"C","")))

D) GEO + QUERY PACK (ZERO-COST GOOGLE MAPS COLLECTION)
Pick one geo scope:
1) Top 25 metros (fast, broad) OR 2) 5–10 states (tight focus) OR 3) US-wide (harder to QA).
Use queries like:
- Dentist: "dentist" + {city, state}; also "cosmetic dentist", "family dentistry"
- Med Spa: "med spa", "aesthetic clinic", "botox", "laser hair removal"
- HVAC/Plumbing: "HVAC", "air conditioning repair", "plumber", "drain cleaning"
Collection rule: skip national chains/franchises where owner is not local decision maker.

E) COLD EMAIL SEQUENCES (3 TOUCHES) — INCLUDE WEBSITE
Sender signature should always include the website URL above.

TOKENS TO PERSONALIZE:
{{first_name}} {{business_name}} {{city}} {{recent_review_snippet}} {{segment_trigger}} {{quick_win}}

1) INITIAL EMAIL — NOT RESPONDING VARIANT
Subject options:
- Quick win for {{business_name}} reviews
- {{business_name}}: review replies in 12 hours
- Noticed a review reply gap

Body:
Hi {{first_name}} — quick note after looking at {{business_name}}’s recent reviews.

I saw: “{{recent_review_snippet}}” and it looks like some recent reviews aren’t getting an owner response yet ({{segment_trigger}}).

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, escalates negative reviews, and sends a weekly KPI report. You can approve replies before anything posts.

Concrete offer: we respond within 12 hours, using your brand voice + do/don’t rules.

Open to a 10-minute chat this week? If you share your GBP link, I’ll send 2–3 example replies for your latest reviews.

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2) INITIAL EMAIL — LOW RATING VARIANT
Subject options:
- Idea to lift {{business_name}}’s rating trend
- Fix the “silent negative review” problem
- Quick reputation triage

Body:
Hi {{first_name}} — I’m reaching out because reviews are a direct revenue lever in {{vertical}}.

I noticed a recent comment: “{{recent_review_snippet}}” and overall your profile looks like it could benefit from a consistent reply + escalation process.

We run an AI-assisted review reply system (Google/Yelp) that:
1) drafts a calm, brand-safe response in your voice,
2) flags anything negative for you to approve + route internally,
3) emails a weekly reputation KPI summary.

Would it be helpful if I sent a sample response to that review (and 1–2 others) so you can see the tone?

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3) INITIAL EMAIL — HIGH VOLUME VARIANT
Subject options:
- Keeping up with review volume at {{business_name}}
- Review response ops for {{business_name}}
- 12-hour reply SLA (Google/Yelp)

Body:
Hi {{first_name}} — {{business_name}} gets a solid stream of new reviews (nice work).

The hard part is operational: keeping reply time fast and tone consistent across staff.

We provide a lightweight “reputation autopilot” for Google/Yelp that drafts responses, queues them for your approval, and escalates anything negative so it doesn’t get missed.

If I send a few sample replies using your last 3 reviews, would you want to see them?

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP 1 (2–3 DAYS LATER) — UNIVERSAL
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — circling back.

If it helps, I can do a quick “review response gap” snapshot for {{business_name}}:
- last 10 reviews: how many got an owner response
- avg time-to-reply (rough)
- 2 suggested replies in your brand voice

Want me to send that over?
— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP 2 (5–7 DAYS LATER) — BREAKUP
Subject: Close the loop?
Body:
Hi {{first_name}} — should I close the loop here?

If review replies aren’t a focus right now, no worries. If they are, I can send 2–3 drafted responses for {{business_name}} so you can judge quality quickly.

Yes / No?
— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

F) AGENCY / RESELLER EMAIL (INITIAL)
Subject options:
- White-label review reply autopilot for your clients
- Add a reputation KPI + review reply offer
- Quick reseller idea (Google/Yelp)

Body:
Hi {{first_name}} — do you support local clients (e.g., dental, med spa, home services) where reviews matter?

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies, approval workflow, negative-review escalation, and weekly KPI reporting.

Agencies use it to add a simple monthly line item (or bundle it) without hiring more staff.

Open to a 10-minute chat? I can share a reseller workflow and sample outputs.

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

G) OUTBOUND DAILY SENDING OPS (14-DAY RAMP)
Goal: consistent deliverability + steady replies.
- Day 1–2: 10–15 emails/inbox/day
- Day 3–4: 20–25/day
- Day 5–7: 30–40/day
- Week 2: 40–60/day (only if bounces <3% and spam complaints ~0)
Daily checklist:
1) Pull 25–60 new leads from CSV with Priority A first.
2) Personalize 1 line: {{recent_review_snippet}} + {{segment_trigger}}.
3) QA 10% sample: verify category match, website exists, rating/review count filled.
4) Send Initials; queue follow-ups at +2–3 days and +5–7 days.
5) Replies SLA: same day for positive interest; escalate “angry” replies immediately.
Stop/slow rules:
- Bounce rate >5% in a day: pause new sends, clean list.
- Spam complaints: pause immediately and review copy + domains.

H) CRM STAGES (SIMPLE)
Prospect (not contacted) → Sent (initial sent) → Engaged (reply/open signals) → Qualified (fit + problem confirmed) → Demo Booked → Trial/Proof (sample replies delivered) → Paid → Lost (reason logged)
Required fields to log: segment_primary, priority_tier, last_contacted_date, next_step, lost_reason.
