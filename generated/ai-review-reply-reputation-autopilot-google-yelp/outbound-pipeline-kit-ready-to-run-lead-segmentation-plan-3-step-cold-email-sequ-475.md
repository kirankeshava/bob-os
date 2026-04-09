# Outbound Pipeline Kit (Ready-to-Run) — Lead Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:24:18.017Z

---

## 1) ICP + Target Verticals (initial 30 days)
**Offer:** AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp: drafts brand-safe replies, posts (or queues for approval), escalates negative reviews, weekly KPI reporting.
**Legitimacy link to include in outreach:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact:** agent_bob_replit+review-bot@agentmail.to

**Verticals (high review velocity + high LTV):**
1) Dental practices (cosmetic/family/pediatric)
2) Med spas / aesthetics clinics
3) HVAC + Plumbing (home services)

**Why these:** high customer lifetime value, high sensitivity to ratings, frequent review inflow, owners often too busy to respond.

---
## 2) Segmentation + Priority Scoring (use while building the list)
### Required fields per prospect
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (responses in last 10 reviews / 10)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (last review excerpt or paraphrase)

### Segment rules
- **Not Responding:** response_rate_proxy ≤ 0.2 OR 0 owner responses in last 10 reviews
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date within 14 days

### Priority routing
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

### Messaging route by segment
- **Not Responding:** “response gap” angle → speed + brand-safe tone + approval flow
- **Low Rating:** “damage control + escalation” angle → alerting + internal escalation + consistent replies
- **High Volume:** “ops throughput” angle → 12-hour SLA, queueing, templates, weekly KPI report

---
## 3) Lead List Build Plan (500–1,000) — zero-cost workflow
### Geography options (pick ONE)
A) **Top 25 US metros** (fast, consistent, broad)
B) **5–10 states** where you can sell/support easiest
C) **US-wide** (broadest; more QA required)

### Google Maps query patterns (examples)
Use: **“{vertical} {city}”** + verify category + review activity.
- Dental: “cosmetic dentist Austin TX”, “family dentist Phoenix AZ”, “pediatric dentist Chicago IL”
- Med spa: “med spa Scottsdale AZ”, “aesthetic clinic Miami FL”, “botox provider Denver CO”
- Home services: “HVAC repair Dallas TX”, “plumber San Diego CA”, “emergency plumbing Atlanta GA”

### Collection steps (per lead)
1) Open Google Business Profile listing
2) Capture rating + review count
3) Open reviews → find **last review date**
4) Check last 10 reviews: count owner replies → compute response_rate_proxy
5) Copy a **short snippet** (8–16 words) from most recent review OR paraphrase (safer)
6) Find email via website Contact/About (prefer owner/manager); if none, capture contact form URL

### QA rules (avoid garbage leads)
- Exclude national franchises unless independently owned and locally managed
- Exclude businesses with no website AND no contact method
- Prefer businesses with recent reviews (last 30 days)
- Ensure correct vertical (don’t mix “dental lab” with “dentist”)

---
## 4) Cold Email Sequences (3-step) — include legitimacy URL + contact
**Personalization tokens:**
- {{first_name}} (if unknown, use “Hi {{business_name}} team,”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like the last few reviews didn’t get a response”)
- {{legitimacy_url}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to: agent_bob_replit+review-bot@agentmail.to

### 4A) DENTAL — Initial email (choose by segment)
**Subject options:**
1) Quick help responding to reviews for {{business_name}}
2) Noticed a review response gap ({{city}})
3) 12-hour review replies for your practice

**Variant A — Not Responding (dentist)**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”. It also looks like some recent reviews didn’t get a response.

We run an **AI Review Reply & Reputation Autopilot** for local businesses: brand-safe draft responses for Google/Yelp, **12-hour turnaround**, and you can **approve before anything posts**. Negative reviews get escalated immediately.

If I send 2–3 sample replies in your practice’s tone, would you like to see them?

– Bob
{{legitimacy_url}}
Reply here: agent_bob_replit+review-bot@agentmail.to

**Variant B — Low Rating (dentist)**
Hi {{first_name}},

I came across {{business_name}} while searching in {{city}}. One recent review said: “{{recent_review_snippet}}”. When ratings dip, speed + consistency in responses can really help conversion from Maps.

We draft **brand-safe** replies for Google/Yelp, escalate negatives, and send a simple weekly KPI report (new reviews, avg rating trend, response rate).

Open to a quick look? I can share sample responses and a lightweight workflow where you approve everything.

– Bob
{{legitimacy_url}}
Reply here: agent_bob_replit+review-bot@agentmail.to

**Variant C — High Volume (dentist)**
Hi {{first_name}},

{{business_name}} gets a solid volume of Google reviews. Keeping up with replies is a real ops burden.

We provide an autopilot that drafts (and can post/queue) brand-safe responses for Google/Yelp within **12 hours**, escalates negatives, and reports weekly reputation KPIs.

Worth a 10-min chat to see if this would save time for your front desk/manager?

– Bob
{{legitimacy_url}}
Reply here: agent_bob_replit+review-bot@agentmail.to

### DENTAL — Follow-up 1
Subject: Re: review replies for {{business_name}}

Hi {{first_name}},

Quick follow-up — if you want, I can draft a response to this review: “{{recent_review_snippet}}” in a friendly, HIPAA-safe tone and send it over for approval.

Should I send 2 sample replies?

– Bob
{{legitimacy_url}}

### DENTAL — Follow-up 2
Subject: Close the loop?

Hi {{first_name}},

Last note. If review responses aren’t a priority, no worries.

If they are: we can get you to **same-day/12-hour responses**, escalate negatives, and give you a weekly KPI email. You approve posts.

Want me to send a couple sample replies for {{business_name}}?

– Bob
{{legitimacy_url}}

---
## 4B) MED SPA — Initial + follow-ups (segment variants)
**Subject options:**
1) Protecting your med spa’s rating in {{city}}
2) Quick fix for review replies (Google/Yelp)
3) 12-hour review responses for {{business_name}}

**Initial — Not Responding (med spa)**
Hi {{first_name}},

Saw {{business_name}} in {{city}} and noticed a recent review: “{{recent_review_snippet}}”. It looks like some reviews aren’t getting responses.

We handle Google/Yelp replies with an **AI reputation autopilot**: on-brand drafts, 12-hour turnaround, optional approval before posting, and negative-review escalation.

Want me to send a couple sample replies in your brand voice?

– Bob
{{legitimacy_url}}
Reply: agent_bob_replit+review-bot@agentmail.to

**Initial — Low Rating (med spa)**
Hi {{first_name}},

One review for {{business_name}} mentioned: “{{recent_review_snippet}}”. For med spas, prospects often choose based on rating + how owners respond.

We draft brand-safe replies for Google/Yelp, escalate negatives to your manager immediately, and send weekly KPIs (rating trend, new reviews, response rate).

Open to seeing a few sample replies?

– Bob
{{legitimacy_url}}

**Initial — High Volume (med spa)**
Hi {{first_name}},

{{business_name}} gets a strong flow of reviews. Responding consistently is hard without someone owning it daily.

Our autopilot drafts/queues on-brand Google/Yelp replies within 12 hours, escalates negatives, and reports weekly KPIs.

Is it worth a 10-min look?

– Bob
{{legitimacy_url}}

**Follow-up 1 + 2:** reuse dental follow-ups, replacing “practice” with “clinic/spa.”

---
## 4C) HVAC/PLUMBING — Initial + follow-ups (segment variants)
**Subject options:**
1) More calls from Maps (review replies)
2) Quick help with Google reviews for {{business_name}}
3) Respond to reviews within 12 hours

**Initial — Not Responding (home services)**
Hi {{first_name}},

I found {{business_name}} in {{city}} — a recent customer wrote: “{{recent_review_snippet}}”. It looks like some recent reviews didn’t get a response.

We draft brand-safe Google/Yelp replies within **12 hours**, you can approve before posting, and we escalate negative reviews so they don’t sit unanswered.

Want me to send 2 sample replies you can use right away?

– Bob
{{legitimacy_url}}

**Initial — Low Rating (home services)**
Hi {{first_name}},

One review for {{business_name}} said: “{{recent_review_snippet}}”. For HVAC/plumbing, fast, professional replies can reduce refund demands and improve call conversion from Maps.

We draft consistent responses for Google/Yelp, escalate negatives, and send a weekly KPI recap.

Open to sample replies?

– Bob
{{legitimacy_url}}

**Initial — High Volume (home services)**
Hi {{first_name}},

You’re getting a lot of reviews at {{business_name}}. That’s great — but replying becomes a daily job.

We handle drafts/queueing for Google/Yelp replies within 12 hours, escalate negatives, and report weekly KPIs.

Worth a quick chat?

– Bob
{{legitimacy_url}}

**Follow-up 1 + 2:** reuse dental follow-ups, swapping vertical language.

---
## 4D) Agency / Reseller Lane — Initial + follow-ups
**Who to target:** local marketing agencies, SEO agencies, reputation management firms serving dentists/med spas/home services.

**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp responses in 12 hours
3) Easy retention lever for local SEO clients

**Agency initial**
Hi {{first_name}},

If you manage local SEO/GBP for clients, review responses are a sticky retention lever but a time sink.

We offer an **AI Review Reply & Reputation Autopilot** you can white-label: brand-safe drafts for Google/Yelp, 12-hour turnaround, approval workflow, negative escalation, and weekly KPI reporting.

Want to pilot this on 1–2 clients? I can share the workflow here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

**Agency follow-up 1**
Just checking — do you have any clients with high review volume or poor response rates where this would immediately help?

**Agency follow-up 2**
Happy to send sample replies + a simple reporting template your AMs can forward weekly. Worth testing on one account?

---
## 5) Daily Sending Ops (14-day ramp) + safety thresholds
### List hygiene + sending safety
- Verify emails where possible; remove obvious role accounts that bounce
- Keep initial sends low; ramp only if bounce/complaint stays low
- **Hard bounce threshold:** pause list/source if >3% daily
- **Spam complaint threshold:** pause immediately if any spike; review copy + targeting

### 14-day ramp (per inbox)
Day 1–2: 10–15/day
Day 3–4: 20/day
Day 5–6: 30/day
Day 7–8: 40/day
Day 9–10: 50/day
Day 11–14: 60–80/day (only if bounces low)

### Daily operating cadence (60–90 min)
1) Pull 25–100 new prospects (Priority A first)
2) Personalize 1 line: review snippet + response gap
3) Send new emails (per ramp cap)
4) Process replies within same day (SLA: <4 business hours)
5) Queue follow-ups to non-responders (D+3 and D+7)
6) Log outcome + next step in CRM

---
## 6) CRM pipeline stages (lightweight)
1) **Prospect (Unsent):** meets ICP, has required fields
2) **Sent (Step 1):** initial email sent
3) **Follow-up Scheduled:** follow-ups queued (D+3, D+7)
4) **Replied:** any response received
5) **Qualified:** has Google/Yelp presence + pain + decision-maker engaged
6) **Demo Booked:** meeting scheduled
7) **Trial / Pilot:** samples sent or trial running
8) **Paid:** converted
9) **Lost / Not Now:** explicit no, wrong fit, unreachable

**Exit criteria examples**
- Prospect → Sent: email verified or best-available contact + personalization line added
- Replied → Qualified: confirms they want help OR admits they can’t keep up OR asks pricing/process
- Qualified → Demo Booked: agrees to 10–15 min walkthrough

---
## 7) What I need from the owner to unlock the 500–1,000 CSV
Choose the geography scope (Top 25 metros / 5–10 states / US-wide). Then a human/VA can produce the CSV using the zero-cost workflow above; once the first 200 are done, we can tighten filters and scale to 1,000 with higher conversion odds.
