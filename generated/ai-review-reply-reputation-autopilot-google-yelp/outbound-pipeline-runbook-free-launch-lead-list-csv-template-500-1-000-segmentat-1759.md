# Outbound Pipeline Runbook (Free Launch): Lead List CSV Template (500–1,000), Segmentation Plan, Cold Email Sequences (3-step), Daily Sending Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:00:26.741Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Runbook (Week 1: $0)

## 0) Assets to include in outreach (legitimacy)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

---

## 1) ICP + vertical focus (2–3 verticals)
Focus list build on:
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)
Parallel lane (higher leverage):
4) Marketing agencies offering “local SEO / reputation management” to those verticals.

Why: high review velocity, direct revenue sensitivity to ratings, and clear operational pain (no time/skill to respond).

---

## 2) Segmentation + priority scoring (operational rules)
Capture these Google Business Profile signals:
- `google_rating`
- `review_count`
- `last_review_date`
- `response_rate_proxy_last10` (how many of the last 10 reviews have an owner/management response)

Segments:
- **NOT_RESPONDING**: response_rate_proxy_last10 ≤ 20% (0–2 responses out of last 10)
- **LOW_RATING**: google_rating < 4.2
- **HIGH_VOLUME**: review_count ≥ 200 OR last_review_date within 14 days

Priority:
- **Priority A**: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- **Priority B**: NOT_RESPONDING OR LOW_RATING
- **Priority C**: HIGH_VOLUME only

Routing rule:
- LOW_RATING → “recovery + escalation” email angle
- NOT_RESPONDING → “response-gap + speed + approvals” angle
- HIGH_VOLUME → “throughput + consistency + brand-safe ops” angle

---

## 3) Lead list build method ($0) + daily throughput targets
### Local businesses (Google Maps workflow)
Goal: 500–1,000 rows total.
- Day 1–2: build first **200** (validate fields + segments)
- Then: **100/day** until 500–1,000

How to source (manual, $0):
1) Open Google Maps, search: `"{city}" + "{vertical}"` with category filters.
2) Open listing, record:
   - Business name, phone, website, Google Maps URL
   - Rating, review count
   - Last review date + a short snippet (7–12 words) OR paraphrase
   - Count owner responses in last 10 reviews → response_rate_proxy_last10
3) Find email(s):
   - Website contact page, footer, “appointments”, “contact us”
   - If none, use WHOIS/LinkedIn guess is optional but keep it clean; prefer real on-site emails

QA rules (prevent garbage leads):
- Exclude franchises with corporate-only contact forms
- Exclude businesses with no website (unless there is a direct email on Google profile)
- Exclude closed/relocated listings
- Exclude categories that don’t match the vertical

### Agencies lane (Google + LinkedIn)
Target: 100–250 agency leads within the 500–1,000.
Search footprints:
- `"reputation management" + "dental" + "agency"`
- `"local seo" + "med spa" + "agency"`
- `"review management" + "HVAC" + "marketing"`
Capture: agency name, website, niche, decision-maker (owner/partner/head of client services), email.

---

## 4) CSV template (paste into Google Sheets; export as CSV)
Create a sheet with TWO tabs: `local_businesses` and `agencies`.

### Tab 1: local_businesses — column headers
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

Field notes:
- `personalization_snippet`: short quote or paraphrase from most recent review (avoid health/medical details; keep generic)
- `segment`: NOT_RESPONDING / LOW_RATING / HIGH_VOLUME (can be multiple; store primary)
- `priority`: A/B/C

### Tab 2: agencies — column headers
agency_name,website,city_state,niche_focus,proof_point,decision_maker_name,role,email_1,email_2,linkedin_url,notes

---

## 5) Cold email sequences (3-step) — DIRECT TO LOCAL BUSINESSES
Personalization tokens:
- {{first_name}} (if unknown → “Hi there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap_fact}} (e.g., “looks like the last few reviews didn’t get a response”)
- {{vertical}}

### 5A) Variant: NOT_RESPONDING (response gap)
**Subject options (pick 1):**
1) Quick idea for {{business_name}} reviews
2) Noticed you’re getting reviews in {{city}}
3) Re: responding to Google reviews

**Email 1 (Day 1):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. {{response_gap_fact}}.

We built a small “reputation autopilot” that drafts brand-safe Google/Yelp replies and can post them (or you can approve first). Goal: every review gets a timely, on-brand response—without you thinking about it.

For the free 7-day trial, we’ll respond within 12 hours and escalate any negative review to you with a suggested fix.

Want me to set up a quick trial for {{business_name}}? 

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Subject: Re: {{business_name}} reviews

Hi {{first_name}}—should I set up a free 7-day review-reply trial for {{business_name}}?

If you tell me “approve-first” vs “auto-post,” I’ll match your preference.

– Bob

**Follow-up 2 (Day 7):**
Subject: Close the loop?

If review replies aren’t a priority right now, no worries—just reply “later” and I’ll follow up next month.

If you want to test it, reply “trial” and I’ll send the 2-minute setup steps.

– Bob

### 5B) Variant: LOW_RATING (recovery + escalation)
**Subject options:**
1) Helping lift ratings for {{business_name}}
2) Quick win on review responses
3) Re: negative reviews

**Email 1:**
Hi {{first_name}},

I noticed {{business_name}} has a few lower-star reviews mixed in. One mentioned: “{{recent_review_snippet}}”.

We help businesses respond fast and safely: we draft empathetic replies, flag anything negative for escalation, and keep responses consistent with your brand. You can approve every reply before it posts.

We’re offering a free 7-day trial: we’ll handle new reviews within 12 hours and send a weekly KPI summary.

Open to trying it for {{business_name}}?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If it helps, the trial is “no workflow change”: you just choose approve-first, and we send drafts.

Would you like me to start it this week?

– Bob

**Follow-up 2:**
Should I close your file, or is it worth a 7-day test to see if faster responses improve sentiment?

– Bob

### 5C) Variant: HIGH_VOLUME (throughput)
**Subject options:**
1) Keeping up with {{business_name}} review volume
2) Quick system for review replies
3) Re: responding at scale

**Email 1:**
Hi {{first_name}},

{{business_name}} is getting a steady stream of reviews. We built a lightweight system that drafts (and optionally posts) on-brand responses for Google/Yelp so nothing sits unanswered.

Free 7-day trial: 12-hour response SLA, approve-first option, and negative-review escalation with suggested language.

Want to see it running for {{business_name}}?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 6) Cold email — AGENCY / RESELLER lane (3-step)
**Subject options:**
1) White-label review replies for your clients
2) Add-on for your local SEO clients
3) Quick reseller idea (reviews)

**Email 1:**
Hi {{first_name}},

If you manage local SEO/reputation for {{agency_name}} clients: we built a review-reply autopilot for Google/Yelp.

It drafts brand-safe responses, escalates negatives, and sends weekly KPIs. You can run it approve-first and present it as your process (we’re happy to stay in the background).

Could I offer you a free 7-day pilot on 1 client so you can evaluate it?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Worth testing on a client that’s getting reviews but not responding consistently? I can set it up in ~10 minutes.

– Bob

**Follow-up 2:**
If not a fit, who’s the right person on your team for add-on services / client ops?

– Bob

---

## 7) Daily sending ops (Week 1: free launch)
### CRM stages (simple)
Prospect → Enriched → Sent → Replied → Qualified → Demo Booked → Trial Active → Converted (Paid later) / Lost

### 14-day ramp (safe, simple; adjust per inbox reputation)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 50/day
- Days 11–14: 60/day
(Stop ramping if bounce > 3% or spam complaints > 0.1%.)

### Daily targets (minimum viable)
- 50 new sends/day once ramped
- 10 manual follow-ups/day (for replies that need a human answer)
- 10 LinkedIn/IG touches/day (optional, if owner has profiles)

### List hygiene + QA
- Before sending: sample 20 leads/day; verify website works + email exists on-site
- Remove role accounts that bounce frequently (info@ can work, but track)
- Keep a `do_not_contact` list

### Reply handling SLA
- Reply to all human replies within 2–4 business hours
- If negative sentiment: offer “approve-first only” + reassurance

---

## 8) What I still need from the owner (1 decision)
Choose initial geography for the first 500–1,000 leads:
- Option A: Top 25 US metros (fastest, diverse)
- Option B: 5–10 target states (tighter positioning)
- Option C: US-wide (more noise; slower QA)

Once geography is chosen, the list build starts immediately using the CSV template above.