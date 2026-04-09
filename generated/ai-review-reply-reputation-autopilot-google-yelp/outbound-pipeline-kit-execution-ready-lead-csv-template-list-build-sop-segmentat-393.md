# Outbound Pipeline Kit (Execution-Ready): Lead CSV Template + List-Build SOP + Segmentation/CRM + 3-Step Cold Email Sequences (w/ Website + Contact Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:03:31.297Z

---

## 1) Initial Geo Scope (recommended)
Use **Top 25 US metros** for the first 500–1,000 leads to keep categories clean and review volume high.
Metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

## 2) Lead List CSV Template (copy/paste headers)
Create a Google Sheet with these columns:
1. business_name
2. vertical (dentist | med_spa | hvac_plumbing | agency)
3. category_on_gbp
4. city
5. state
6. website
7. phone
8. google_maps_url
9. google_rating
10. review_count
11. last_review_date
12. last_review_excerpt (<=160 chars)
13. owner_response_count_last10 (0–10)
14. response_rate_proxy (=owner_response_count_last10/10)
15. segment (not_responding | low_rating | high_volume)
16. priority (A | B | C)
17. contact_name
18. contact_role
19. email_1
20. email_2
21. linkedin_url (optional)
22. notes

### Segmentation rules (apply as formulas or manual tags)
- not_responding: response_rate_proxy <= 0.2 OR owner_response_count_last10 = 0
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

### Priority rubric
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

## 3) Data Dictionary (what “good” looks like)
- google_maps_url: the share link to the GBP listing.
- last_review_date: date of most recent review visible on GBP.
- owner_response_count_last10: count responses by owner within the last 10 reviews (scroll through reviews; tally). If the listing sorts by “Most relevant,” switch to “Newest.”
- last_review_excerpt: quote 1 sentence fragment from the newest review. If it contains sensitive health info, **paraphrase** (e.g., “mentioned great staff + fast scheduling”).
- emails: best available public emails from website contact page, footer, staff bio, or “mailto:”. If none, leave blank and later enrich.

## 4) Zero-Cost Lead Build SOP (Google Maps manual workflow)
Goal: 50–100 new leads/day per person.

### Step A — Pull relevant listings
For each metro, run 3 queries (examples):
- Dental: “dentist + {city}” and “cosmetic dentist + {city}”
- Med spa: “med spa + {city}” and “aesthetic clinic + {city}”
- Home services: “HVAC + {city}” and “plumber + {city}”

Open each promising listing in a new tab.

### Step B — Capture core business fields
From the listing:
- business_name, phone, website, google_rating, review_count, google_maps_url.
Note category as shown (e.g., “Dentist”, “Medical spa”, “HVAC contractor”).

### Step C — Capture review velocity + response proxy
1) Click Reviews → sort by Newest.
2) Record last_review_date.
3) Scan the last 10 reviews and tally owner replies → owner_response_count_last10.
4) Copy a short last_review_excerpt (or paraphrase safely).

### Step D — Determine segment + priority
Apply rules in Section 2.

### Step E — Find contact emails (free)
On the business website:
- Look for Contact, About, Team, Footer; copy any emails.
- If only a form exists, note “contact form only.”
If multiple, prefer owner/manager/office manager/practice manager.

### Step F — QA rules (prevent garbage)
Reject if:
- Franchise directory page with no local decision maker
- No website and no email and no contact form (too hard for first run)
- Category mismatch (e.g., dental lab instead of dentist)
- Listing appears closed/permanently closed

## 5) CRM Stages (simple pipeline)
Stages with entry/exit rules:
1) Prospects (new rows imported)
2) Ready to Send (email present + segment/priority assigned)
3) Sent – Step 1
4) Sent – Follow-up 1
5) Sent – Follow-up 2
6) Replied – Interested
7) Replied – Not Now
8) Qualified (has GBP/Yelp + review volume + agrees pain)
9) Demo Booked
10) Trial Started
11) Paid
12) Lost (reason)

## 6) Daily Sending Ops (targets + ramp)
Start with 1 inbox if you’re solo.
- Day 1–3: 20 new/day + follow-ups
- Day 4–7: 35 new/day
- Day 8–14: 50–75 new/day
Daily minimum activities:
- 50 new emails/day (by Day 10) + all due follow-ups
- 10 agency prospect touches/day (emails or LinkedIn)
- Reply SLA: same business day; negative replies: polite close + ask timing
Stop/adjust if bounce rate >3% or spam complaints >0.1%.

## 7) Cold Email Copy (3-step) — includes legitimacy references
Use tokens: {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{segment_angle}}

### 7.1 Local Business — Step 1 (Not Responding variant)
**Subject options:**
1) Quick help with Google review replies for {{business_name}}
2) Noticed a reply gap on your recent reviews
3) Can we handle responses within 12 hours?

Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It looks like some recent reviews haven’t gotten an owner reply yet ({{response_gap}}).

We run an **AI Review Reply & Reputation Autopilot** for local businesses: brand-safe draft replies for Google Business Profile (and Yelp), escalation for negatives, and a weekly KPI report. You can approve before anything posts.

If I send 2–3 sample replies in your tone for your latest reviews, would you want to see them?

— Bob Smith
AI Review Reply & Reputation Autopilot
Legit site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### 7.2 Local Business — Step 1 (Low Rating variant)
**Subject options:**
1) Fixing 1–2 star review damage (without sounding canned)
2) Reputation help for {{business_name}} in {{city}}
3) Quick win on review responses?

Hi {{first_name}},

I noticed {{business_name}}’s Google rating is around {{google_rating}} and a recent review mentioned “{{recent_review_snippet}}”. When negative reviews sit without a thoughtful response, it can depress calls/bookings.

We help by drafting **brand-safe, non-defensive** responses, escalating urgent issues to you, and tracking weekly reputation KPIs. You approve before posting.

Open to a 10-minute call this week? If you prefer, I can send a couple example responses first.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 7.3 Local Business — Step 1 (High Volume variant)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Reply to every review (without extra staff)
3) Review response ops for {{city}}

Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}+). The tough part is staying consistent and fast so prospects see an active, caring owner.

We draft and (optionally) post replies to Google + Yelp within 12 hours, escalate negatives, and send a weekly KPI email so you know what’s trending.

Would it be helpful if I sent sample replies for your 3 newest reviews?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 7.4 Follow-up 1 (2–3 days later)
Subject: Re: {{business_name}} review replies

Hi {{first_name}}, quick bump — want me to draft a couple replies for the newest reviews at {{business_name}} so you can see the quality/tone?

If you’re the wrong person, who handles Google/Yelp reviews there?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 7.5 Follow-up 2 (5–7 days later)
Subject: Should I close the loop?

Hi {{first_name}}, I don’t want to spam you. Should I close this out, or is reputation/review response something you want to revisit later?

If helpful, I can send a 1-page weekly KPI example report and 3 sample replies.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 8) Agency/Reseller Email (Step 1)
Subject options:
1) Add-on offer for your local clients: Google/Yelp review replies
2) White-label review response automation
3) Quick margin add for your client roster

Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), we can be your fulfillment layer for review responses: brand-safe drafts, fast turnaround, negative review escalation, and weekly KPI reporting. You can resell it as an add-on.

Want me to send a simple reseller outline (pricing + workflow) and a sample weekly report?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 9) What you do next (fastest path)
1) Confirm geo: Top 25 metros (recommended).
2) Build first 200 leads in 48 hours using the SOP.
3) Start sending to Priority A first using the matching variant.
4) Track replies and book demos; keep building the list daily until 1,000 leads.