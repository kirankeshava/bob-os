# Outbound Pipeline Pack (Ready-to-Run): Lead List CSV Template + Segmentation Plan + Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:04:34.794Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use one CSV for all verticals + agencies.

**CSV headers**
business_name,vertical,segment,priority_tier,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,personalization_snippet_recent_review,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (how to fill each column)
- **vertical**: dentist | med_spa | hvac_plumbing | agency
- **google_rating / review_count / last_review_date**: from Google Business Profile (GBP).
- **response_rate_proxy_last10**: % of the last 10 reviews that have an owner response (0–100). If fewer than 10 visible, use what’s visible and note it in **notes**.
- **personalization_snippet_recent_review**: 1–2 sentences max from the most recent review (or paraphrase if safer). Avoid medical/financial claims.
- **segment** (apply rules below): not_responding | low_rating | high_volume (pick primary driver; if multiple, choose the one that best matches your email angle).
- **priority_tier**: A/B/C (rules below).
- **email_1/email_2**: best available owner/manager contact. Sources (free): website contact page, “info@/contact@”, Facebook page, LinkedIn company page, state licensing directories (dentists), BBB (home services).

### Segmentation rules (simple + consistent)
- **not_responding** if response_rate_proxy_last10 ≤ 20% OR 0 owner replies in last ~10 reviews.
- **low_rating** if google_rating < 4.2.
- **high_volume** if review_count ≥ 200 OR last_review_date within 14 days.

### Priority scoring (convert to A/B/C)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: (not_responding) OR (low_rating)
- **Priority C**: high_volume only (rating OK + they respond sometimes)

### QA checklist (10-minute audit per 100 leads)
1) Category match: actually dentist/med spa/HVAC-plumbing (not schools, suppliers, franchises HQ pages).
2) Has real customer reviews (review_count > 15 preferred).
3) Website present for direct email capture.
4) Personalization snippet is recent (prefer last 30 days) and non-sensitive.
5) Segment + priority correctly assigned.
6) Emails are not generic catch-alls when a better manager email exists (try 2 sources).

---

## 2) Segmented Prospecting Plan (what to pull first)
Goal: start with **Priority A** leads because they feel the pain (missed replies, reputation risk) and have enough review velocity to justify paying.

### Vertical pull order
1) **Med spas/aesthetic clinics** (high LTV, strong review impact)
2) **Dentists** (consistent review cadence, competitive)
3) **HVAC/Plumbing** (high lead value, reputation sensitive)

### Daily list-building targets (if manual)
- One person: 25–40 leads/day with full fields + segmentation.
- With a VA: 100 leads/day is realistic after 1–2 days of training.

### Agency/reseller lane (parallel)
Target agencies that manage local SEO / GBP for multiple clients.
- Search footprints: “local SEO agency dentist”, “reputation management agency med spa”, “Google Business Profile management agency”, “white label reputation management”.
- Target roles: founder, head of SEO, account manager, operations.
- Offer: white-label or co-branded, per-location pricing with margin.

---

## 3) Cold Email Sequences (3-step) — include website + contact email
Always reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### Personalization tokens
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like several recent reviews didn’t get a reply”)
- {{vertical_value}} (dentist: “new patient calls”; med spa: “bookings”; HVAC: “service calls”)


# A) LOCAL BUSINESS — Not Responding (Primary)
## Email 1 (Day 1)
**Subject options:**
1) Quick question about {{business_name}} reviews
2) Noticed a response gap on Google
3) {{business_name}} — reply help?

Hi {{first_name}},

I was looking at {{business_name}} in {{city}} and noticed a few recent Google reviews like:
“{{recent_review_snippet}}”

{{response_gap}}. Quick replies tend to lift conversion from people comparing options for {{vertical_value}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe responses within 12 hours**, escalates negative reviews, and sends a weekly KPI recap. You can **approve replies before posting**.

If you want to sanity-check it, here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can take review replies off your plate?

— Bob
agent_bob_replit+review-bot@agentmail.to

## Follow-up 1 (Day 3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — do you want me to send 2–3 example replies to your most recent reviews (so you can judge tone/quality)?

If yes, just reply “examples” and I’ll send them over.

— Bob
agent_bob_replit+review-bot@agentmail.to

## Follow-up 2 (Day 7)
Subject: Close the loop

Hi {{first_name}}, I’ll close this out.

If review responses are still a time sink at {{business_name}}, we can:
- respond within 12 hours
- flag negatives immediately
- deliver a weekly reputation report

Worth a quick look: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply with “later” and I’ll follow up next month.

— Bob


# B) LOCAL BUSINESS — Low Rating (Primary)
## Email 1 (Day 1)
**Subject options:**
1) Helping lift {{business_name}}’s rating (without fake reviews)
2) Quick idea for negative reviews
3) Reputation triage for {{business_name}}

Hi {{first_name}},

I saw a recent Google review for {{business_name}} that said:
“{{recent_review_snippet}}”

When ratings are under ~4.2, even a few well-handled public replies can change how new customers interpret the negatives.

We provide an **AI Review Reply & Reputation Autopilot**: brand-safe drafts, negative-review escalation, and weekly KPIs. You approve before anything posts.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to draft responses for the last 3 negative reviews so you can see what it would look like?

— Bob
agent_bob_replit+review-bot@agentmail.to

## Follow-up 1 (Day 3)
Subject: Drafting 3 replies?

If you send links to the reviews (or just confirm you’re the right person), I’ll draft 3 public responses that are calm, brand-safe, and de-escalating.

— Bob

## Follow-up 2 (Day 7)
Subject: Last touch

Should I:
A) send example replies, or
B) circle back later?

— Bob


# C) LOCAL BUSINESS — High Volume (Primary)
## Email 1 (Day 1)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Quick automation idea for your Google reviews
3) Review response coverage

Hi {{first_name}},

{{business_name}} gets a lot of review activity, which is great. The hard part is staying consistent so prospects always see fresh, professional replies.

We run an **AI Review Reply & Reputation Autopilot**: drafts replies within 12 hours, routes negatives for escalation, and sends weekly KPIs. Optional approval step before posting.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If I can show you a workflow that saves 2–4 hours/week, is it worth 10 minutes?

— Bob
agent_bob_replit+review-bot@agentmail.to

## Follow-up 1 (Day 3)
Subject: Who owns reviews at {{business_name}}?

Quick one—who’s the right person for Google/Yelp review replies? If it’s not you, can you point me to them?

— Bob

## Follow-up 2 (Day 7)
Subject: Should I stop reaching out?

No worries either way—reply “yes” if you want a quick walkthrough, or “no” and I’ll stop.

— Bob


# D) AGENCY / RESELLER — White-label lane
## Email 1 (Day 1)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on for GBP management (low lift)
3) Reputation automation (approve-before-post)

Hi {{first_name}},

If you manage Google Business Profiles for local clients, you’ve probably seen review replies become a time sink.

We offer an **AI Review Reply & Reputation Autopilot** you can resell: brand-safe drafts in ~12 hours, negative-review escalation, weekly KPI reporting, and an **approve-before-post** workflow.

You can see the product overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick call to discuss per-location pricing and white-label delivery?

— Bob
agent_bob_replit+review-bot@agentmail.to

## Follow-up 1 (Day 3)
Subject: Re: white-label review replies

If helpful, I can share:
- sample client-facing report
- SOP for escalation/approval
- margin-friendly pricing structure

Want that?

— Bob

## Follow-up 2 (Day 7)
Subject: Close the loop

Should I follow up in a month, or is review management not a priority add-on right now?

— Bob

---

## 4) Daily Sending Ops Checklist + 14-Day Ramp (per inbox)
**Tool-agnostic rules (free-first):**
- Start with **1 inbox** until replies/bounces are stable.
- Use plain text. No attachments. 1 link max (use the website above).
- Stop sending if bounce rate > 5% in a day; fix list hygiene.

### 14-day ramp (per inbox)
- Days 1–2: 15 new/day
- Days 3–4: 25 new/day
- Days 5–6: 35 new/day
- Days 7–8: 45 new/day
- Days 9–10: 60 new/day
- Days 11–14: 75 new/day
Add follow-ups daily (don’t exceed total caps). If you add inbox #2, repeat ramp.

### Daily workflow (60–90 min)
1) Import today’s batch (Priority A first).
2) QA 10% sample for category + email correctness.
3) Personalize first line with {{recent_review_snippet}} + {{response_gap}}.
4) Send Email 1 to new prospects.
5) Send scheduled follow-ups to non-responders.
6) Triage replies within same day:
   - Interested → book demo
   - Not now → set follow-up date
   - Not a fit → mark lost

### Reply handling SLA
- Same day response for any “interested” reply.
- For negatives: acknowledge + ask if they own GBP/Yelp.

---

## 5) CRM Stages (simple pipeline)
1) **Prospect (New)** — lead meets vertical criteria + has contact email
2) **Sent** — Email 1 sent
3) **Replied** — any response
4) **Qualified** — confirmed decision maker + has GBP/Yelp review volume
5) **Demo Booked** — meeting scheduled
6) **Trial / Pilot** — first replies drafted/approved
7) **Paid** — subscription or monthly service started
8) **Lost** — not interested / wrong person / bad timing

### KPI targets (initial)
- Bounce rate < 3%
- Reply rate 3–8% (cold)
- Positive reply rate 1–3%
- Demo booking 0.5–1.5%

---

## 6) What I still need from the owner to finish the full 500–1,000 CSV
Pick one geography scope so the query pack can be locked:
- **Option A:** Top 25 US metros (fastest, consistent)
- **Option B:** 5–10 states where you want customers
- **Option C:** US-wide (harder QA)

Once chosen, a VA can produce 500–1,000 leads using the template + rules above, and we start sending immediately using the sequences here.