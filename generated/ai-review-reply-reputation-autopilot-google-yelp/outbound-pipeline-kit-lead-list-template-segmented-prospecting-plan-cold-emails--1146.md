# Outbound Pipeline Kit — Lead List Template + Segmented Prospecting Plan + Cold Emails (3-Step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:56:39.579Z

---

Business
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

1) Verticals (initial 30-day focus)
A) Dentists (high LTV, frequent reviews, reputation affects calls)
B) Med spas/aesthetic clinics (high competition, reputation-driven conversions)
C) HVAC/Plumbing (urgent need; review velocity in home services)
Parallel lane: Marketing agencies serving these verticals (reseller / multi-location upside).

2) Segmentation & Priority (apply to every lead)
Required data points: google_rating, review_count, last_review_date, response_rate_proxy.
Response-rate proxy: For the last 10 reviews, count how many have an owner response. response_rate_proxy = responses/10.

Segments
- NOT_RESPONDING: response_rate_proxy ≤ 0.2 OR 0 owner responses in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count ≥ 200 OR last_review_date within 14 days

Priority scoring (routing)
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING only OR LOW_RATING only
- Priority C: HIGH_VOLUME only (rating OK, responds OK)

Messaging map
- NOT_RESPONDING → “response gap + speed + brand-safe approvals” angle
- LOW_RATING → “negative review triage + escalation + consistency” angle
- HIGH_VOLUME → “ops throughput + consistency + weekly KPI reporting” angle

3) Lead List CSV Template (headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

Data dictionary (how to fill)
- google_maps_url: share link from Google Maps listing.
- last_review_date: date of most recent review.
- response_rate_proxy: 0.0–1.0 based on last 10 reviews.
- personalization_snippet: 8–20 words from a recent review OR a safe paraphrase (avoid sensitive health details; do not include patient identifiers).
- owner_or_manager_name/role_guess/email_1/email_2: from website “Contact/About”, staff pages, or public email patterns. If not found, put blank and keep the row (still usable for phone/website contact later).

4) Zero-cost List Building SOP (repeatable)
Step 1: Choose geo scope (owner decision):
- Option 1: Top 25 US metros
- Option 2: 5–10 target states
- Option 3: US-wide (slower QA)

Step 2: Google Maps query footprints
Use: “{vertical} {city}” + “best {vertical} {city}” + “{vertical} near me” + category-specific modifiers.
Examples:
- Dentist: “cosmetic dentist Austin”, “family dentistry Denver”, “dental implants Miami”
- Med spa: “med spa Scottsdale”, “Botox clinic Chicago”, “aesthetic clinic Dallas”
- Home services: “HVAC repair Phoenix”, “emergency plumber Atlanta”, “AC installation Las Vegas”

Step 3: For each listing capture:
- rating, review count, last review date
- open reviews tab; sample last 10 reviews and count owner responses
- grab one safe snippet (or paraphrase) to personalize

Step 4: Segment + priority
- Apply rules above; fill segment (can be multiple; choose the most urgent driver in notes)
- Fill priority A/B/C

Step 5: QA (10% sample daily)
Reject leads with: wrong category, no website and no usable contact path, franchises where replies are centralized (unless targeting multi-location explicitly), duplicates.

5) Cold Email Sequences (3-step) — Local Businesses
Tokens
- {{business_name}}, {{city}}, {{first_name}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{google_rating}}, {{review_count}}
- Always include URL + contact email for legitimacy.

A) Initial email — NOT_RESPONDING variant
Subject options:
1) Quick fix for {{business_name}}’s review replies
2) Noticed a response gap on your Google reviews
3) Can we handle review replies for you?

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”.

It looks like there’s a {{response_gap}} (you’re getting reviews, but replies aren’t consistently going out). We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses and can post them (Google/Yelp), escalates negatives to you, and sends weekly reputation KPIs.

Offer: we respond within 12 hours, and you can choose “approve first” so nothing posts without your OK.

If I send 3 draft replies for your most recent reviews, would you like:
A) approve-first mode, or
B) auto-post for 4–5 star reviews and approve negatives?

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email agent_bob_replit+review-bot@agentmail.to
— Bob

B) Initial email — LOW_RATING variant
Subject options:
1) Quick win to lift rating + reduce 1-star damage
2) Review triage for {{business_name}}
3) Can we help with negative review responses?

Body:
Hi {{first_name}} — I’m reaching out because {{business_name}} is at {{google_rating}} on Google, and the most recent feedback included: “{{recent_review_snippet}}”.

When negative reviews aren’t answered quickly and consistently, they tend to become the “top story” prospects read. Our autopilot drafts brand-safe responses, flags anything sensitive/angry for your approval, and escalates issues so you can resolve them fast.

If you want, I can send 3 suggested replies (1 negative + 2 recent) tailored to your tone. Do you prefer replies signed as the owner name, or “Team {{business_name}}”?

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email agent_bob_replit+review-bot@agentmail.to
— Bob

C) Initial email — HIGH_VOLUME variant
Subject options:
1) Keeping up with review volume at {{business_name}}
2) 12-hour review reply coverage
3) Automated review replies + weekly KPI report

Body:
Hi {{first_name}} — noticed {{business_name}} has ~{{review_count}} Google reviews and recent activity (“{{recent_review_snippet}}”). That’s great momentum, but it’s a lot to keep up with.

We built a reputation autopilot that drafts/posts brand-safe replies (Google/Yelp), keeps tone consistent, and sends a weekly KPI summary (new reviews, response time, rating trend, negatives escalated).

Would it be helpful if we covered replies within 12 hours so your team never has to touch the review inbox?

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email agent_bob_replit+review-bot@agentmail.to
— Bob

Follow-up #1 (2–3 days later) — universal
Subject: Re: reviews for {{business_name}}
Hi {{first_name}} — quick follow-up.

If you share the link to your Google listing (or confirm it’s {{google_maps_url}}), I’ll send:
- 3 draft replies in your brand voice
- recommended policy (auto-post 4–5 stars vs approve-all)
- a quick estimate of your current response rate vs local competitors

Want me to do that?
— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up #2 (5–7 days later) — universal breakup
Subject: Close the loop?
Hi {{first_name}} — should I close the loop on this?

If review replies aren’t a priority right now, no worries. If they are, reply with:
1) “approve first” or
2) “auto-post positives + approve negatives”

and I’ll send the 3 draft replies for {{business_name}}.
— Bob

6) Agency/Reseller Email (initial)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on offer for your local SEO clients
3) Quick reseller idea (Google/Yelp replies)

Body:
Hi {{first_name}} — I’m Bob. We built an AI Review Reply & Reputation Autopilot that drafts/posts brand-safe Google/Yelp responses, escalates negative reviews, and sends weekly KPI reporting.

This fits agencies managing local SEO who don’t want ops overhead. You can run it:
- white-label (your brand), or
- co-branded.

If you tell me your top niche (dentist/med spa/home services), I’ll share a 1-page offer + workflow and we can pilot with 1–2 clients.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to
— Bob

7) Daily Sending Ops Checklist (14-day ramp)
Deliverability basics (free-first)
- Start with 1 inbox; plain text; no attachments; 1 link max (use the site URL).
- Keep daily sends low until replies start; stop campaigns if bounce rate >3% or complaints >0.1%.

Ramp schedule (per inbox)
- Days 1–2: 15/day (mostly Priority A)
- Days 3–4: 25/day
- Days 5–7: 40/day
- Week 2: 50–75/day if bounce/complaints are clean
Follow-ups count toward daily volume.

Daily routine (60–90 min)
1) Pull 25–50 new leads (Priority A first); QA 10%.
2) Personalize first line with {{recent_review_snippet}} + {{response_gap}}.
3) Send batch; log in CRM.
4) Same-day reply SLA: <2 hours during business hours.
5) Book demos or offer “3 draft replies” deliverable.

Weekly routine
- Review KPI: sent, delivered, bounces, replies, qualified, demos, trials.
- Refresh copy based on objections.
- Add 100–200 new leads.

8) CRM Stages (simple)
Prospect (in CSV) → Sent (E1) → Follow-up 1 → Follow-up 2 → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost
Entry/exit criteria
- Qualified: confirms they manage reviews + has Google/Yelp listing + agrees to see draft replies.
- Trial/POC: they send listing link and approve first drafts.

Owner decision needed next
- Choose geography scope for first 500–1,000 leads: Top 25 metros vs 5–10 states vs US-wide. Once chosen, the query pack can be locked and lead production can begin immediately.