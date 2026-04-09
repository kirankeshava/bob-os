# Outbound Pipeline Kit (Zero-Cost): Lead Sheet Template + Segmentation + Cold Email Sequences (w/ Website + Contact Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:31:09.002Z

---

## 1) Lead List Google Sheet / CSV Template (copy headers)
Use these columns exactly (row 1). This doubles as a CSV export.

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,notes

### How to fill quickly (manual, zero-cost)
- Open Google Maps → search query (examples below) → open listing.
- Capture rating + review count from the listing header.
- Click “Reviews” → sort by “Newest” (if available) → copy the most recent review date and 1–2 sentence excerpt (or paraphrase; do not include sensitive details).
- For response rate proxy: look at the last 10 reviews and count how many have an “Owner response.” Divide responses/10.
- Find email: check the website contact page + footer + Google Business Profile “Website” link. If none, leave blank and use contact form/phone later.

### Segmentation rules (implement as formulas or manual)
- segment =
  - "low_rating" if google_rating < 4.2
  - else "high_volume" if review_count >= 200 OR last_review_date within last 14 days
  - else "not_responding" if response_rate_proxy_last10 <= 0.2
  - else "baseline"

### Priority scoring (A/B/C)
- priority =
  - A if (segment = not_responding AND (review_count >= 200 OR last_review_date within 14 days)) OR (segment = low_rating AND review_count >= 200)
  - B if segment in (not_responding, low_rating)
  - C if segment = high_volume
  - otherwise skip

## 2) Query Pack (Top 25 US metros, repeatable)
Pick metros: NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, DC, Nashville, El Paso, Detroit, OKC, Portland.

Google Maps search strings (swap {CITY}):
- Dental: "dentist {CITY}", "cosmetic dentist {CITY}", "dental clinic {CITY}"
- Med spa: "med spa {CITY}", "aesthetic clinic {CITY}", "botox {CITY}", "laser hair removal {CITY}"
- HVAC/Plumbing: "HVAC {CITY}", "air conditioning repair {CITY}", "plumber {CITY}", "water heater repair {CITY}"

Collection target: 50 leads/day (≈ 1–1.5 hours once practiced). Build Priority A first.

## 3) Cold Email Sequences (Direct-to-Local Businesses)
Sender signature (use in all):
Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

### 3A) Variant: NOT RESPONDING (core angle = response gap)
**Email 1 (Day 1)**
Subject: Quick question about your Google reviews

Hi {{first_name_or_team}},

I was looking at {{business_name}}’s recent Google reviews — one that stood out: “{{last_review_excerpt}}”.

It looks like a lot of recent reviews don’t have an owner response. That’s a missed trust signal (and it’s hard to keep up when you’re busy).

I’m building a small Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp and escalates negatives. You approve before anything posts. We can respond within 12 hours.

Want me to draft replies for your last 10 reviews (free) so you can see the tone?

– Bob
{{signature}}

**Email 2 (Day 3)**
Subject: I can draft 10 replies today (free)

Hi {{first_name_or_team}},

If I drafted responses to these reviews for {{business_name}} (you approve), would that be helpful?

- Consistent voice
- Fast responses (within 12 hours)
- Negative reviews flagged for escalation

Reply “yes” and I’ll send drafts for the last 10 reviews.

– Bob
{{signature}}

**Email 3 (Day 7)**
Subject: Close the loop on review replies?

Hi {{first_name_or_team}},

Should I (a) send you 10 draft replies for {{business_name}} or (b) leave you alone?

Either way is totally fine — just don’t want to bug you.

– Bob
{{signature}}

### 3B) Variant: LOW RATING (core angle = recover trust + escalation)
**Email 1 (Day 1)**
Subject: Idea to protect your rating (without more workload)

Hi {{first_name_or_team}},

I saw a recent review for {{business_name}} that said: “{{last_review_excerpt}}”.

When ratings dip, the fastest win is often: respond quickly, acknowledge, and move the conversation offline. Most teams just don’t have time.

My tool drafts brand-safe Google/Yelp responses and flags negatives for escalation. You approve before anything posts. If you want, I’ll draft replies to your last 10 reviews free so you can gauge the tone.

Worth sending those drafts?

– Bob
{{signature}}

**Email 2 (Day 3)**
Subject: Want a “save-the-rating” response template set?

Hi {{first_name_or_team}},

I can send:
1) 10 draft replies for your newest reviews
2) A negative-review playbook response style (apology + offline resolution)

No commitment — just reply “send it.”

– Bob
{{signature}}

**Email 3 (Day 7)**
Subject: Last check — draft replies for {{business_name}}?

Hi {{first_name_or_team}},

Do you want me to draft responses for the last 10 reviews (free), or should I close this out?

– Bob
{{signature}}

### 3C) Variant: HIGH VOLUME (core angle = ops + consistency)
**Email 1 (Day 1)**
Subject: Keeping up with review replies at {{business_name}}

Hi {{first_name_or_team}},

{{business_name}} gets a strong volume of Google reviews. The hard part is keeping responses consistent and fast.

I’m building a Review Reply & Reputation Autopilot that:
- drafts on-brand replies for Google/Yelp
- escalates negatives
- sends weekly KPI reporting (rating trend, response rate, time-to-respond)

You approve before any post goes live. Want me to draft replies for your last 10 reviews free?

– Bob
{{signature}}

**Email 2 (Day 3)**
Subject: I can set up weekly reputation KPIs (free)

Hi {{first_name_or_team}},

If you’d like, I’ll send a sample weekly KPI report for {{business_name}} (response rate + time-to-respond + rating trend) along with 10 draft replies.

Want that?

– Bob
{{signature}}

**Email 3 (Day 7)**
Subject: Should I stop reaching out?

Hi {{first_name_or_team}},

Last note — want the 10 draft replies + KPI sample, or should I close your file?

– Bob
{{signature}}

## 4) Agency/Reseller Cold Email (Marketing agencies serving local verticals)
**Email 1 (Day 1)**
Subject: Add “Review Reply Autopilot” to your client retainers

Hi {{first_name}},

You already help local businesses grow — one easy retention lever is review responsiveness (Google/Yelp).

I’m building a white-label-friendly Review Reply & Reputation Autopilot that drafts brand-safe replies, escalates negatives, and sends weekly KPI reporting. Clients approve before posting.

If I send you a 1-page overview + a sample weekly report, would you consider offering this to 5–10 of your local clients?

Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

**Email 2 (Day 3)**
Subject: Can I send the sample report?

Hi {{first_name}},

Want the sample KPI report + sample reply set you can forward to a client?

– Bob

**Email 3 (Day 7)**
Subject: Close the loop?

Hi {{first_name}},

Should I send the sample assets, or should I stop reaching out?

– Bob

## 5) Daily Sending Ops (zero-cost)
- Day 1–3: 25 new emails/day + 25 follow-ups/day max (keep total under ~50/day/inbox).
- Day 4–7: 40 new/day + follow-ups.
- Day 8–14: 60–80 total/day only if bounce rate < 3% and replies are healthy.
- SLA: respond to any positive reply within 1 business hour; offer “free draft replies for last 10 reviews” immediately.
- Tracking: use a simple Google Sheet CRM tab if no tool; stages: Prospect → Sent → Replied → Qualified → Demo/Access Requested → Trial (Free 7 days) → Paid → Lost.

Personalization safety rule: quote only what is public in the review; avoid health-sensitive specifics (especially med spas) and never imply the reviewer is a patient/client beyond what they publicly stated.