# Outbound Pipeline Kit — Lead List Spec (500–1,000), Segmented Prospecting Plan, Cold Email Sequences (3-step), Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:19:32.148Z

---

## 1) What we’re selling (1-sentence)
AI Review Reply & Reputation Autopilot drafts (and can help post) brand-safe responses to Google/Yelp reviews, escalates negative reviews fast, and sends weekly KPI reporting—so local businesses protect ratings and win more calls/bookings.

Legitimacy references to include in outreach:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---

## 2) Vertical picks (run 2–3 in parallel)
1) Dentists (high LTV, lots of reputation-sensitive decisions)
2) Med spas / aesthetics (very review-driven, frequent new reviews)
3) HVAC/Plumbing (urgent-intent buyers, strong conversion impact from ratings)

Secondary lane: marketing agencies selling local SEO / reputation mgmt to these verticals.

---

## 3) Lead list CSV template (headers)
Create a CSV with these columns (exact header names):
- business_name
- vertical
- city
- state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–1)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- owner_or_manager_name (best guess)
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
- email_1
- email_2
- personalization_snippet (short quote or paraphrase from most recent review)
- response_gap_note (e.g., “No owner replies in last 10 reviews”)
- notes

### Where each field comes from (zero-cost method)
- Google rating, review count, last review date: Google Business Profile panel + “Reviews” sort by newest.
- response_rate_proxy_last10: open last 10 reviews; count how many have an “Owner response.” proxy = responses/10.
- personalization_snippet: take 8–20 words from the most recent review (or paraphrase if sensitive).
- website/phone: from the profile.
- emails: first from website contact page; second from “About/Team” page or privacy policy footer; if none, use a contact form URL in notes and leave email blank (but ideally skip those for cold email).

### Segmentation rules (apply consistently)
- not_responding = response_rate_proxy_last10 <= 0.2 OR 0/10 owner replies
- low_rating = google_rating < 4.2
- high_volume = review_count >= 200 OR last_review_date within last 14 days
- mixed = meets 2+ conditions

### Priority scoring (routing)
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

---

## 4) Prospecting plan (who to hit first and why)
### Direct-to-local (core)
Start with Priority A across the 3 verticals. These have the clearest pain and fastest “yes”:
- High review velocity but weak response rate → obvious gap + easy ROI narrative.
- Low rating with fresh reviews → urgent remediation + escalation.

Recommended weekly mix once list exists:
- 60% Priority A
- 30% Priority B
- 10% Priority C (for volume/ops angle)

### Agency/reseller lane (parallel)
Target agencies that already manage GBP/SEO for 10–100 local clients. Offer a white-label “review reply autopilot” they can resell with margin.
Where to find:
- Google search: “dental marketing agency”, “med spa marketing”, “hvac marketing agency”, “local seo agency reputation management”
- Clutch category pages, LinkedIn company search, and agency websites’ service pages.

Agency qualification signals:
- They list “Google Business Profile” / “reputation management” services.
- They have case studies for your verticals.
- They offer ongoing retainers.

---

## 5) Cold email sequences (3-step) — includes required website + contact email

### Global personalization tokens
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like there aren’t many owner replies recently”)
- {{vertical_wording}} (dentist/med spa/HVAC/plumbing)

### Compliance/safety note for snippets
If the snippet contains sensitive medical info or personally identifying details, paraphrase (e.g., “a recent reviewer mentioned wait time + front desk experience”). Keep it respectful.

---

### A) Direct-to-local — Not Responding variant (most common)
**Email 1 (Day 1)**
Subject options:
1) Quick question about your Google reviews
2) Noticed something on {{business_name}}’s reviews
3) {{business_name}} — review replies

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews and saw: “{{recent_review_snippet}}”.

{{response_gap}} — which is common when things get busy, but it can quietly cost calls/bookings because prospects read the replies (or lack of them).

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp within 12 hours, flags negative reviews for escalation, and sends a weekly KPI recap. You can approve/edit before anything is posted.

You can see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute chat this week to see if it’s useful for {{business_name}}? If easier, reply with “send info” and I’ll email details.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3–4)**
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Still happy to share a quick example reply set for {{business_name}} based on your latest reviews (no commitment). The goal is simple: consistent, on-brand replies without your team spending time in the GBP/Yelp inbox.

Want me to send 3 sample replies for your most recent reviews?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (Day 7)**
Subject: Close the loop?

Hi {{first_name}},

Should I close the loop on this, or is someone else best to handle review responses for {{business_name}}?

If you point me to the right person, I’ll reach out with a short summary + the link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob

---

### B) Direct-to-local — Low Rating variant (escalation + remediation)
**Email 1**
Subject options:
1) Helping lift Google rating (without extra staff time)
2) Quick fix for negative reviews at {{business_name}}
3) Reputation question for {{business_name}}

Body:
Hi {{first_name}},

I noticed a recent review mentioning: “{{recent_review_snippet}}”. When ratings dip, even small improvements in response speed + tone can make a measurable difference in calls.

We run an AI Review Reply & Reputation Autopilot: brand-safe draft replies in 12 hours, negative-review escalation, and weekly KPI reporting. You approve before posting.

Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, I can send a suggested response to that review (and 2 others) that de-escalates while protecting the brand.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**
Subject: Want 2–3 suggested replies?

Hi {{first_name}},

Want me to draft a few replies for your most recent negative/neutral reviews so you can compare tone + structure? If it’s helpful, we can talk about making it automatic.

— Bob

**Follow-up 2**
Subject: Who owns reputation at {{business_name}}?

Hi {{first_name}},

Who’s the right person for Google/Yelp reputation at {{business_name}}? I can send the 1-page overview + examples.

— Bob

---

### C) Direct-to-local — High Volume variant (ops + consistency)
**Email 1**
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Fast review replies without adding workload
3) Review reply workflow for {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} gets a lot of reviews—nice problem to have. The downside is consistency: different staff, different tone, and replies fall behind.

We built an AI Review Reply & Reputation Autopilot that drafts consistent, brand-safe replies within 12 hours, flags risky/negative ones for escalation, and sends weekly KPIs. You can approve before anything is posted.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a quick 10 minutes to see if it fits your workflow?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-ups**: same structure as Not Responding (ask to send sample replies; close-the-loop).

---

### D) Agency / Reseller version (sell 10–100 accounts)
**Email 1**
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for GBP reputation (done-for-you replies)
3) Quick partnership idea (reputation ops)

Body:
Hi {{first_name}},

I’m reaching out because you work with {{vertical_or_local_seo}} clients, and review responses are a recurring bottleneck (time, tone, and consistency).

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: fast brand-safe drafts, negative-review escalation, and weekly KPI reporting. Agencies can run it as a white-label add-on.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 15-minute call? If it’s a fit, I’ll share reseller packaging + workflow.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**: ask if they want a demo on one of their client GBPs; **Follow-up 2**: ask who handles partnerships.

---

## 6) Daily sending ops checklist (do this every day)
### Pre-send (15–30 min)
1) Pull 50–100 new prospects from CSV (depending on ramp day).
2) QA 10% sample: correct category, has website/email, rating/review_count present, snippet not sensitive.
3) Personalize first line with {{recent_review_snippet}} + {{response_gap}}.
4) Remove duplicates/franchises if you’re not targeting them.

### Send
- Keep copy plain-text style.
- One clear CTA (10 min chat OR “send info” OR “send 3 sample replies”).
- Log every send in CRM stage “Sent”.

### Post-send (15 min)
- Handle replies within same business day.
- If negative reply: apologize, offer to send details, and ask for the right contact.
- Mark bounces immediately; if bounce rate > 3% in a day, pause and fix list quality.

### Follow-ups
- Day 3–4: Follow-up 1
- Day 7: Follow-up 2

---

## 7) 14-day sending ramp (per inbox)
Assumes 1 new sending inbox. If you use more inboxes, divide volume.
- Days 1–2: 15/day
- Days 3–4: 25/day
- Days 5–6: 35/day
- Days 7–8: 50/day
- Days 9–10: 65/day
- Days 11–14: 80–100/day (only if bounce <3% and replies healthy)

Hard rules:
- If bounce >5% any day: stop new sends, clean list.
- If spam complaints >0.1%: stop and change targeting/copy.

---

## 8) CRM stages (simple pipeline)
Use any free tool (Trello/HubSpot free/Airtable free). Stages:
1) Prospect (in list, not sent)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied with interest)
4) Replied – Not Now
5) Qualified (has GBP/Yelp volume + decision maker + pain confirmed)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (with loss reason)

Minimum fields in CRM card/row:
- Business name, vertical, city/state, email, segment, priority, last touch date, next step, notes.

---

## 9) Daily activity targets (starting point)
Once ramped and list quality is good:
- New sends: 50–100/day
- Follow-ups: 25–75/day (depending on volume)
- Reply handling: same-day
- New list build: 25–50 leads/day (if manual)
- Agency lane: 10 new sends/day + 5 follow-ups/day

---

## 10) What you need to decide today (to unlock the 500–1,000 CSV)
Pick ONE geography plan so the query pack is consistent:
A) Top 25 US metros (fastest, highest density)
B) 5–10 states where you want concentration
C) US-wide (harder to QA, more variance)

Once selected, a VA/you can produce 500–1,000 rows by repeating Google Maps searches like:
- “dentist + {metro}”, “cosmetic dentist + {metro}”
- “med spa + {metro}”, “aesthetic clinic + {metro}”
- “HVAC + {metro}”, “plumber + {metro}”
Then fill the CSV fields + apply segmentation rules above.
