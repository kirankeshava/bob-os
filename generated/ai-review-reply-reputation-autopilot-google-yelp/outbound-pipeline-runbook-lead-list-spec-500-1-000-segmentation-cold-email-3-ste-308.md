# Outbound Pipeline Runbook — Lead List Spec (500–1,000) + Segmentation + Cold Email (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:04:30.466Z

---

## 1) Targeting (Who we email)
**Offer:** AI Review Reply & Reputation Autopilot (Google/Yelp) — drafts and posts brand-safe review responses, escalates negative reviews, and sends weekly KPI reporting.
**Proof/legitimacy link (include in emails):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact email (include in footer/CTA):** agent_bob_replit+review-bot@agentmail.to

**Verticals (initial 30 days):**
1) Dental practices
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)

**Geography (default for first list):** Top 25 US metros (New York, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Fort Worth, Indy, Charlotte, Seattle, Denver, DC, Nashville, OKC, El Paso, Boston, Portland). 

## 2) Lead List Build Spec (500–1,000) — Zero-cost workflow
### 2.1 Google Maps query pack (copy/paste searches)
Use queries like:
- “dentist near {{metro}}” + also “cosmetic dentist {{metro}}”, “pediatric dentist {{metro}}”
- “med spa {{metro}}” + “aesthetic clinic {{metro}}”, “botox {{metro}}”, “laser clinic {{metro}}”
- “hvac contractor {{metro}}” + “plumber {{metro}}”, “heating and air {{metro}}”

**Pull targets:** ~200–350 per vertical across metros to reach 700–1,000 total. Prioritize businesses with active review velocity (recent reviews) and obvious owner pain (no responses / low rating).

### 2.2 Required CSV columns (data dictionary)
Create a CSV with these headers:
- business_name (exact GBP name)
- vertical (dentist | med_spa | hvac_plumbing)
- city_state
- website
- phone
- google_maps_url
- google_rating (e.g., 4.1)
- review_count (integer)
- last_review_date (YYYY-MM-DD)
- last_review_excerpt (<=140 chars; quote or paraphrase)
- response_rate_proxy_last10 (0–100%; % of last 10 reviews with owner response)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- contact_name (owner/manager if known; else blank)
- role_guess (owner | office_manager | practice_manager | marketing_manager)
- email_1
- email_2
- linkedin_url (optional)
- notes (e.g., “No replies since 2023”, “Rating dropped last 3 months”)

### 2.3 How to collect review fields consistently (fast method)
For each business:
1) Open Google Business Profile listing.
2) Record rating + total reviews.
3) Click Reviews → sort by “Newest” → capture the most recent review date and a short excerpt.
4) For the **last 10 reviews**, count how many have an “Owner response” → response_rate_proxy_last10 = responses/10 * 100.

### 2.4 Segmentation + priority rules
**Segment rules:**
- not_responding: response_rate_proxy_last10 <= 20
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days
- mixed: meets 2+ segments (e.g., low_rating + not_responding)

**Priority:**
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed
- Priority B: not_responding OR low_rating
- Priority C: high_volume only (rating OK and response rate OK)

### 2.5 Email finding (free-first)
1) Check website footer/contact page for direct email.
2) Look for “Contact”, “About”, “Team”, “Careers” pages.
3) If none, use common patterns (info@, hello@, office@) plus role-based (manager@, marketing@).
4) If business has Facebook page, sometimes email is listed.
5) Put best guess in email_1, alternate in email_2.

### 2.6 QA sampling rules (pre-send)
- Sample 5% of rows daily for accuracy.
- Reject rows if: wrong category (not actually dentist/med spa/HVAC/plumbing), franchise corporate-only contact, no website/phone, or obviously inactive (no reviews in 12+ months AND low review count).
- Bounce risk flag: if only generic emails and no domain website, deprioritize.

## 3) Cold Email Copy (3-step) — include legitimacy URL + contact email
Tokens: {{first_name}}, {{business_name}}, {{city}}, {{vertical_phrase}}, {{recent_review_excerpt}}, {{response_gap_fact}}, {{rating}}, {{review_count}}

### Email 1 (initial) — “response gap” angle
**Subject options:**
1) Quick help with Google review replies for {{business_name}}
2) Saw a recent review — noticed a reply gap
3) {{business_name}}: respond to reviews within 12 hours?

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews in {{city}} and saw this recent comment: “{{recent_review_excerpt}}”.

Not sure if you’re the right person, but I also noticed {{response_gap_fact}} (many recent reviews don’t have an owner response).

We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google/Yelp, escalates negative reviews to you, and sends a weekly KPI report. You can **approve replies** before anything posts.

If I send 2–3 sample replies using your tone, would you want to see them?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

### Email 2 (follow-up) — “low rating / reputation lift” angle
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

When a listing sits around {{rating}} stars, the fastest lift is usually **consistent, professional owner responses** (especially to 3-star-and-below reviews) plus an escalation loop so nothing gets missed.

If you reply here with “sample,” I’ll draft:
- 1 reply to a positive review
- 1 reply to a neutral/critical review
- 1 reply that de-escalates and moves the convo offline

No obligation — just want to show what “brand-safe + fast” looks like.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (final follow-up) — “high volume / time savings” angle
**Subject:** Close the loop on review replies?

Hi {{first_name}} — last note from me.

If you’re getting steady review volume ({{review_count}} total and recent activity), replying manually is a time sink and often falls behind. Our autopilot keeps responses consistent, routes negatives to you immediately, and gives weekly reputation KPIs so you can track impact.

Worth a 10-minute walkthrough? If yes, tell me the best day/time or just reply “yes” and I’ll propose two slots.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 4) Daily Sending Ops + 14-day ramp (per inbox)
**Rules:** start low, keep deliverability clean, prioritize replies.

**Day 1–2:** 20/day (no links except legitimacy URL; plain text)
**Day 3–4:** 35/day
**Day 5–6:** 50/day
**Day 7–8:** 75/day
**Day 9–10:** 100/day
**Day 11–14:** 125–150/day (only if bounces <3% and spam complaints ~0)

**Daily minimum activity targets (single-operator):**
- New sends: 50–100/day (during ramp)
- Follow-ups: 20–60/day (as the sequence accumulates)
- Manual personalization: 10–20 Priority A/day (use review excerpt + response gap)
- Reply SLA: respond within 2 business hours

**Stop/adjust thresholds:**
- Bounces >5% in a day → stop sending, clean list, verify domains
- Any spam complaints → reduce volume, simplify copy, remove tracking

## 5) CRM pipeline (simple, import-ready)
Stages + entry/exit:
1) Prospect (row created + email found)
2) Sent (Email 1 sent)
3) Replied (any reply)
4) Qualified (has Google/Yelp presence + review volume + decision-maker)
5) Demo Booked
6) Trial / Pilot (drafting replies + approval loop)
7) Paid
8) Lost (reason: timing, not owner, no budget, do-it-in-house)

**Weekly KPIs:** sent, delivered, reply rate, positive reply rate, demos booked, trials started, paid conversions, bounce rate.

## 6) What’s next (to start sending within 48 hours)
1) Build first 200 leads using the spec above (Priority A-heavy).
2) Import into CRM with stages.
3) Start Day 1 ramp at 20/day and run sequence + follow-ups.
4) As replies come in, offer 2–3 sample replies and route to demo/trial.
