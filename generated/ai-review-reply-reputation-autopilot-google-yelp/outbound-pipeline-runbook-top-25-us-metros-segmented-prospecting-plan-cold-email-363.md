# Outbound Pipeline Runbook (Top 25 US Metros) — Segmented Prospecting Plan + Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:26:24.077Z

---

# Outbound Pipeline Runbook — AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) Targeting (what we send to)
### Verticals (direct-to-local)
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + Plumbing (home services)

### Geography (locked)
Top 25 US metros (consistent density + review volume): NYC, LA, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, SF Bay Area, Indianapolis, Seattle, Denver, Washington DC, Boston, Nashville, Detroit, OKC, Portland.

### High-intent segments (route each prospect to the right angle)
**Not Responding**: owner responses in last 10 reviews ≤2 (≤20%) or none recently.
**Low Rating**: rating < 4.2 (or 1–2 recent negative reviews with no owner response).
**High Volume**: review_count ≥ 200 OR last_review_date within 14 days.

### Priority scoring (who goes first)
- **Priority A**: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B**: Not Responding OR Low Rating
- **Priority C**: High Volume only

## 2) 30-day prospecting plan (what list to build + how to split volume)
Goal: build 500–1,000 prospects total.
- 70% direct-to-local businesses (350–700)
  - 40% dentists
  - 30% med spas
  - 30% HVAC/plumbing
- 30% agency/reseller lane (150–300)
  - marketing agencies that serve these verticals + “reputation management”/“local SEO” providers.

Weekly cadence:
- Week 1: 150–250 direct + 50–75 agencies
- Week 2: 150–250 direct + 50–75 agencies
- Week 3: 100–200 direct + 25–75 agencies
- Week 4: 100–200 direct + 25–75 agencies

Operational note: start sending as soon as the first 100 leads are collected (don’t wait for the full 1,000).

## 3) List-building SOP (zero-cost workflow)
For each metro + vertical, run Google Maps searches like:
- “dentist” + metro
- “cosmetic dentist” + metro
- “med spa” + metro
- “aesthetic clinic” + metro
- “HVAC company” + metro
- “plumber” + metro

Collect the following fields into a CSV:
- business_name
- vertical
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (responses in last 10 reviews)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (1–2 lines from a recent review OR a paraphrase)
- owner_or_manager_name (if on website/about)
- email_1, email_2 (from website contact page; if missing, use a contact form URL and phone)

QA rules (remove leads that will waste sends):
- Exclude franchises with national review ops unless clearly locally managed.
- Exclude businesses with no website/contact page (unless phone outreach is planned).
- Prefer businesses with review velocity (last review within 30 days).
- Avoid categories mismatch (e.g., “dental lab” vs “dentist”).

## 4) Cold email pack (3-step) — include legitimacy link + reply-to email
All emails must include:
- Legitimacy link: the website URL above
- Reply-to/contact: agent_bob_replit+review-bot@agentmail.to
- Personalization token: {{recent_review_snippet}} and/or {{response_gap}}

### 4A) Direct-to-local — NOT RESPONDING (unanswered reviews)
**Subject options:**
1) Quick question about your Google reviews
2) {{business_name}} — replying to reviews
3) Noticed a few reviews without a response

**Email 1:**
Hi {{first_name_or_owner}},

I was looking at {{business_name}} on Google and noticed a few recent reviews haven’t gotten a response yet (ex: “{{recent_review_snippet}}”).

We run an AI-assisted review reply + reputation autopilot for local businesses: brand-safe draft replies for Google/Yelp, negative-review escalation, and a weekly KPI report. Replies can be posted only after you approve (or we can run on your rules).

If I send 2–3 example replies in your tone for your most recent reviews, would you want to see them?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later):**
Subject: Re: {{business_name}} reviews
Hi {{first_name_or_owner}},

Totally understand you’re busy. The main issue we see is speed—reviews come in daily, but responses slip, and customers notice.

If you share (a) your preferred tone (friendly/clinical/short) and (b) whether you want negative reviews escalated to you immediately, I’ll send a few ready-to-post drafts.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (5–7 days later):**
Subject: Should I close the loop?
Hi {{first_name_or_owner}},

Last note—want me to generate sample responses for the last 5 reviews at {{business_name}} (Google/Yelp), matching your voice, and flag any negatives that need escalation?

If yes, reply with “samples” and I’ll send them.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4B) Direct-to-local — LOW RATING / NEGATIVE REVIEWS
**Subject options:**
1) Quick win for your Google rating
2) About the recent review on Google
3) Reputation follow-up for {{business_name}}

**Email 1:**
Hi {{first_name_or_owner}},

I saw a recent review for {{business_name}} (“{{recent_review_snippet}}”). When negative reviews don’t get a fast, thoughtful response, it can drag conversion even if the service is great.

We help local businesses reply within 12 hours with brand-safe drafts (you can approve), escalate negatives immediately, and track weekly KPIs so you can see the trend.

Open to me drafting a response to that review in your tone so you can decide if it’s useful?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Subject: Re: reply draft for {{business_name}}
Hi {{first_name_or_owner}},

If you prefer: I can draft 1 short public reply + 1 private-resolution script (what to say when you call/email the customer), based on the review.

Should I send that over?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2:**
Subject: Worth a 10-min look?
Hi {{first_name_or_owner}},

If reputation is a priority this month, we can take review replies off your plate: drafts in your voice, approvals if you want, and a weekly KPI email.

Want to try it for 7 days on Google only?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4C) Direct-to-local — HIGH VOLUME (process/ops angle)
**Subject options:**
1) Handling review volume at {{business_name}}
2) A simple review-reply system
3) Quick ops question

**Email 1:**
Hi {{first_name_or_owner}},

{{business_name}} gets steady reviews (nice problem to have). The hard part is consistent, on-brand responses—especially when volume spikes.

We provide an AI-assisted review reply autopilot for Google/Yelp: drafts in your brand voice, optional approval workflow, negative-review escalation, and a weekly KPI summary.

If I draft responses for your last 3 reviews so you can see the tone/quality, would that be helpful?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Subject: Re: review replies
Hi {{first_name_or_owner}},

Most owners pick one of two modes:
1) “Approve first” (we draft, you click approve)
2) “Autopilot on rules” (we post unless it’s negative/edge-case)

Which would you prefer if you ever outsourced review replies?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2:**
Subject: Close the loop?
Hi {{first_name_or_owner}},

Want me to send a mini “weekly KPI” snapshot format we use (response rate, avg rating trend, negative-review alerts) and 3 sample replies tailored to {{business_name}}?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4D) Agency/reseller lane (sell distribution)
**Subject options:**
1) Add “review reply autopilot” to your retainers
2) Quick white-label idea for local clients
3) Reputation ops for your clients

**Email 1:**
Hi {{first_name}},

Noticed you work with local businesses in {{vertical_or_local_seo}}. We built a lightweight AI review reply + reputation autopilot for Google/Yelp: brand-safe drafts, optional approval workflow, negative-review escalation, and weekly KPI reporting.

Agencies use it to:
- improve client response rates fast
- reduce account manager time
- add a simple add-on retainer

If you tell me the verticals you focus on (dentists/med spas/home services), I can send a sample workflow + a reseller margin structure.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Subject: Re: review replies for clients
Hi {{first_name}},

Would it be useful if I:
1) mocked up a 1-page “weekly KPI report” template with your logo, and
2) drafted a couple real replies for one of your client’s recent Google reviews (so you can judge quality)?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2:**
Subject: 10 minutes?
Hi {{first_name}},

Open to a 10-min chat to see if this fits your retainers? If it’s not relevant, just reply “no” and I’ll close out.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops (start now, scale safely)
### CRM stages (minimal)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost

### Daily activity targets (Day 1 baseline)
- 50 new emails/day total (40 direct + 10 agencies)
- Follow-ups: 1 follow-up block/day (send to everyone who didn’t reply)
- Replies SLA: same business day (≤8 hours), negative-review conversations ≤2 hours

### 14-day ramp (per inbox)
Days 1–3: 15/day
Days 4–7: 25/day
Days 8–10: 35/day
Days 11–14: 50/day
(If using multiple inboxes, distribute evenly.)

### Safety thresholds
- Bounce rate: pause new sends if >3% on a day; scrub domains and retry only after fixes.
- Spam complaints: investigate immediately; tighten targeting + reduce volume.
- Personalization QA: ensure {{recent_review_snippet}} is accurate; if unsure, paraphrase instead of quoting.

### Reply handling rules
- If they ask “price”: reply with 2 tiers (approval mode vs autopilot) and offer a 7-day trial.
- If they say “we already respond”: ask who owns it and offer overflow coverage + negative-review escalation.
- If they say “not interested”: ask a single closeout question (“Is it timing or do you handle replies in-house?”) then stop.

## 6) What the owner/VA does next (fastest path)
1) Build **first 100 leads** (Priority A/B only) across 5 metros using the SOP above.
2) Start sending immediately using the matching segment template.
3) Build the remaining 400–900 leads while Week 1 sends are running.
4) After 3–5 days of replies, adjust vertical/segment mix based on response rate.
