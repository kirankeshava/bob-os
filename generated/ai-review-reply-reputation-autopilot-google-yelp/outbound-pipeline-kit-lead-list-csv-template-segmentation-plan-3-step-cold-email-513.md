# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:47:50.602Z

---

## 1) Initial Targeting (Geography + Verticals)
**Initial geo (Top 10 US metros):** New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA.
**Verticals:** (1) Dentists, (2) Med spas/aesthetic clinics, (3) HVAC/Plumbing.

**Why this scope:** Enough density to produce 500–1,000 leads quickly with high review volume, while keeping personalization and QA manageable.

---
## 2) Lead List CSV Template (Copy/Paste Headers)
Use these exact columns (CSV):
1. business_name
2. vertical
3. service_type (dentist / medspa / hvac-plumbing)
4. city
5. state
6. website
7. phone
8. google_maps_url
9. google_rating
10. review_count
11. last_review_date
12. last_review_excerpt (<=160 chars; or paraphrase)
13. owner_response_in_last_10 (0–10)
14. response_rate_proxy (owner_response_in_last_10/10)
15. segment (not_responding / low_rating / high_volume)
16. priority (A/B/C)
17. personalization_hook (1 sentence: review snippet + response gap)
18. contact_name
19. contact_role (owner/manager/office manager/marketing)
20. email_1
21. email_2
22. linkedin_url (optional)
23. notes

### Data Dictionary / How to Fill Fast
- **google_rating, review_count:** from Google Business Profile card.
- **last_review_date + excerpt:** open most recent review; copy 1 short sentence or paraphrase.
- **owner_response_in_last_10:** count replies from the business in the last 10 reviews.
- **response_rate_proxy:** owner_response_in_last_10 / 10.
- **emails:** from website contact page, staff page, or patterns (info@, office@, hello@). If no direct email found, capture contact form URL in notes.

---
## 3) Segmentation Rules (Operational)
Compute **segment**:
- **not_responding:** response_rate_proxy <= 0.2 (0–2 replies out of last 10)
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR last_review_date within 14 days

Compute **priority** (use first match):
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

**Personalization hook formula (example):**
“Saw a recent review mentioning ‘{{excerpt}}’ and it looks like many reviews don’t get a reply—happy to help you respond quickly and brand-safely.”

---
## 4) Cold Email Sequences (3-step) — Include Website + Contact Email
**Always include:**
- Proof/legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to contact email: agent_bob_replit+review-bot@agentmail.to

### 4A) Local Business — Initial Email (choose variant by segment)
**Subject options:**
1) Quick idea for your Google reviews
2) Re: responding to recent reviews
3) {{business_name}} reviews — quick fix

**Variant 1: NOT RESPONDING**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews—saw a recent one: “{{last_review_excerpt}}”. It also looks like many reviews don’t get a reply.

We run an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses and posts them (or routes them for approval). Goal: **every review gets a thoughtful reply within ~12 hours**, and negative reviews get escalated fast.

If I send 2–3 example replies for your most recent reviews, would you like them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Variant 2: LOW RATING**
Hi {{first_name}},

Noticed {{business_name}} has a strong volume of reviews, but the rating is sitting around {{google_rating}}. A recent review mentioned: “{{last_review_excerpt}}”.

We help local businesses respond in a **brand-safe, de-escalating way** and escalate issues quickly so you can recover trust and improve conversion from Maps.

Open to a 10-minute walk-through? If you prefer, I can send a few draft responses first.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Variant 3: HIGH VOLUME**
Hi {{first_name}},

{{business_name}} gets a lot of Google reviews ({{review_count}}). That’s great—and also a lot to keep up with. I saw this recent one: “{{last_review_excerpt}}”.

We operate an **AI Review Reply Autopilot** so every review gets a consistent, on-brand response quickly, and negatives get flagged to your team immediately. Weekly KPI report included.

Worth trying on a 14-day pilot?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4B) Follow-up #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up—want me to send **3 sample replies** for your latest reviews (including one negative/neutral), so you can see the tone?

If yes, tell me whether you prefer:
1) **You approve before posting**, or
2) **Auto-post for 4–5★**, approve anything below.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4C) Follow-up #2 (5–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}},

Should I close this out? If review responses aren’t a priority right now, no worries.

If it *is* a priority, the quickest start is: you send your preferred tone/brand notes, and we reply to new Google/Yelp reviews within ~12 hours with escalation for negatives + a weekly KPI summary.

Want the sample replies?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 5) Agency/Reseller Version (Initial)
Subject: Add “review response autopilot” to your client retainers

Hi {{first_name}},

If you manage local clients (dentists/med spas/home services): we offer a white-labelable **AI Review Reply & Reputation Autopilot** for Google/Yelp—brand-safe drafts, optional approval workflow, negative review escalation, and weekly KPIs.

Agencies use it to:
- increase responsiveness (client-visible)
- protect ratings/conversion
- add a simple add-on line item

Open to a quick chat? Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 6) Daily Sending Ops (14-day Ramp + CRM)
### Deliverability + Volume Ramp (per inbox)
- Days 1–2: 10/day (mostly warm contacts or highly targeted)
- Days 3–4: 15/day
- Days 5–7: 20/day
- Week 2: 25–35/day if bounces <3% and spam complaints = 0

**If using 2 inboxes:** start 20/day total and ramp to 70/day total.

### Non-negotiable thresholds
- Hard bounce rate: stop + clean list if >3% in any day
- Spam complaints: if any, reduce volume and revise copy targeting
- Reply SLA: respond to positive replies within 2 hours business time

### CRM Stages (minimum viable)
1) Prospects (enriched + segmented)
2) Sent (Email 1)
3) Engaged (opened/clicked/replied)
4) Qualified (pain confirmed + has GBP/Yelp + has review volume)
5) Demo Booked
6) Trial/Pilot
7) Paid
8) Lost (tag reason)

### Daily Targets (starting point)
- New leads added + QA: 25–50/day
- New sends: 50/day (across inboxes, respecting ramp)
- Follow-ups: 25/day
- Manual personalization: Priority A only (top 10–20/day)

### Weekly Cadence
- Mon: refresh leads + segment; send to Priority A/B
- Tue–Thu: send + follow-ups; book demos
- Fri: KPI review (reply rate, meetings, demos, trial starts) + copy tweaks
