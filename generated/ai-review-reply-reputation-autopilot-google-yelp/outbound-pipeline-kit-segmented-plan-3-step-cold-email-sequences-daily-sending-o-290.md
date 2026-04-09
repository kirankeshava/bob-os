# Outbound Pipeline Kit — Segmented Plan + 3-Step Cold Email Sequences + Daily Sending Ops (Includes Website + Contact Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:53:30.275Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply/Contact email: agent_bob_replit+review-bot@agentmail.to

1) TARGET VERTICALS + WHY (HIGH INTENT)
A) Dentists (incl. cosmetic dentistry, orthodontics): high appointment value, high sensitivity to rating/response quality.
B) Med spas/aesthetic clinics: reputation-driven bookings, high review velocity, lots of emotionally-charged reviews.
C) HVAC/plumbing: high competition in Maps, emergency calls influenced by star rating and recent reviews.

2) SEGMENTS + PRIORITY (WHAT TO PULL FIRST)
Capture for each lead: rating, review count, last review date, and a response-rate proxy from last 10 reviews.

Segments:
- NOT RESPONDING: response_rate_proxy ≤ 20% OR no owner replies in last 10 reviews.
- LOW RATING: Google rating < 4.2.
- HIGH VOLUME: review_count ≥ 200 OR last_review_date within 14 days.

Priority routing:
- Priority A: (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME).
- Priority B: NOT RESPONDING OR LOW RATING.
- Priority C: HIGH VOLUME only.

Recommended “hook” per segment:
- Not responding: “noticed several recent reviews without a reply” + show snippet.
- Low rating: “saw a recent frustrated review” + emphasize escalation + brand-safe response.
- High volume: “you’re getting a lot of reviews; we can keep responses within 12 hours.”

3) LEAD LIST CSV TEMPLATE (HEADERS)
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority, personalization_snippet, owner_or_manager_name, role_guess, email_1, email_2, notes

Response-rate proxy method (manual): open Google reviews → scroll newest 10 → count how many have an “Owner response.”
response_rate_proxy_last10 = owner_responses / 10.

4) ZERO-COST LIST BUILD WORKFLOW (TO REACH 500–1,000)
Step A — Choose geography (you decide):
Option 1: Top 25 US metros (fastest, consistent density)
Option 2: 5–10 states (if you have service preference)
Option 3: US-wide (slower QA, more variation)

Step B — Google Maps query patterns (use exact category words)
Dentist:
- “dentist in {city}”
- “cosmetic dentist in {city}”
- “orthodontist in {city}”
Med spa:
- “med spa in {city}”
- “aesthetic clinic in {city}”
- “botox in {city}” (verify category is med spa/clinic)
HVAC/Plumbing:
- “hvac company in {city}”
- “air conditioning repair in {city}”
- “plumber in {city}”

Step C — Per lead capture checklist (60–120 seconds per business once practiced)
- Copy business name, phone, website, Maps URL.
- Record rating + review count.
- Open reviews: capture last review date + snippet (5–15 words; avoid sensitive health details).
- Compute response_rate_proxy_last10.
- Apply segment + priority.
- Find email(s): website contact page, footer, “appointments,” “support,” or “info@/hello@”. If none, use a contact form and log “contact_form_only”.

QA rules (prevent garbage leads):
- Exclude: franchises with corporate-only contact, businesses with no website (unless phone-based outreach is planned), categories mismatch, or service area too far.
- Minimums: rating present + review count present + last review date present.

5) COLD EMAIL COPY (3-STEP) — MASTER TEMPLATE
Personalization tokens:
{{first_name}} (or “there”), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical}}, {{rating}}, {{review_count}}

Always include legitimacy link + reply email.

EMAIL 1 (Initial) — Not Responding angle
Subject options:
1) Quick question about your Google reviews
2) {{business_name}} — replying to recent reviews
3) Google review replies (easy win)

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}.

Example from a recent review: “{{recent_review_snippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews to you, and sends weekly reputation KPIs. Typical promise: replies within 12 hours, and you can approve before anything posts.

If you want to sanity-check us first, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can take review replies off your plate?

— Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 1B (Initial) — Low Rating angle
Subject options:
1) About a recent Google review
2) Reputation quick fix for {{business_name}}
3) Reduce 1-star damage (without drama)

Body:
Hi {{first_name}} — I noticed {{business_name}} is at ~{{rating}} on Google and there’s at least one recent unhappy review: “{{recent_review_snippet}}”.

We help local businesses respond in a brand-safe way fast (Google/Yelp), route negative reviews for escalation, and track weekly KPIs so ratings stop drifting.

We also keep it low risk: you approve the tone/response before posting.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a quick 10 minutes to see how we’d handle responses for the next 30 days?

— Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 1C (Initial) — High Volume angle
Subject options:
1) Keeping up with {{review_count}} reviews
2) 12-hour review replies for {{business_name}}
3) Review response workflow

Body:
Hi {{first_name}} — {{business_name}} has a lot of Google activity ({{review_count}} reviews). Most teams I talk to struggle to reply consistently without it turning into a daily time sink.

We run an autopilot that drafts brand-safe Google/Yelp responses, flags negatives for escalation, and reports weekly reputation KPIs. Goal is simple: consistent replies within 12 hours, without you writing them.

You can review/approve before anything posts.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Should I send 2–3 sample replies for recent reviews to show what it looks like?

— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2–3 days later)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — checking back. If I draft 2 sample replies based on your most recent reviews (no obligation), would you want them?

If yes, tell me: do you prefer a friendly tone or more formal?

— Bob
agent_bob_replit+review-bot@agentmail.to
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP 2 (5–7 days later)
Subject: Close the loop?
Body:
Hi {{first_name}} — last note from me. Most of the lift is: (1) reply fast, (2) keep tone consistent/brand-safe, (3) escalate negatives so they don’t sit unanswered.

If you want, I can share a quick outline of how we’d run this for {{business_name}} (Google + Yelp) and what KPIs we’d report weekly.

Is it a “not now” or should we book 10 minutes?

— Bob
agent_bob_replit+review-bot@agentmail.to

6) AGENCY / RESELLER LANE (SHORT VERSION)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for local SEO retainers
3) Review response SLA for agencies

Body:
Hi {{first_name}} — we built an AI Review Reply & Reputation Autopilot for Google/Yelp (brand-safe drafts, negative escalation, weekly KPIs). Agencies use it to add a “review response SLA” to local SEO retainers without hiring.

If you have clients in dental/med spa/home services, want to see a reseller/white-label workflow?

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob (agent_bob_replit+review-bot@agentmail.to)

7) DAILY SENDING OPS (14-DAY RAMP)
Goal: protect deliverability while reaching 50–100 new sends/day per inbox.

Day 1–2: 15–20 sends/day/inbox (mostly Priority A). No links except the site; keep personalization high.
Day 3–4: 25–35/day. Start follow-up 1 for Day 1 prospects.
Day 5–7: 40–60/day. Add Priority B.
Day 8–14: 60–100/day if bounce rate <3% and complaint rate near 0. Add Priority C.

Rules/thresholds:
- Bounce rate >3% in a day: pause, clean list, remove domain patterns causing bounces.
- Any spam complaint: reduce volume next 48 hours, simplify copy, remove extra tracking.
- Replies SLA: respond within 1 business hour; book calls within 48 hours.

8) CRM PIPELINE (MINIMUM VIABLE)
Stages + entry/exit:
1) Prospect (lead added; segmented + priority assigned)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied (human response)
5) Qualified (has Google/Yelp presence + expresses pain/interest)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (reason logged: timing, already has solution, no fit, no response)

KPIs to track weekly:
- New prospects added
- Sends/day, Reply rate %, Positive reply rate %
- Meetings booked
- Conversion to trial, conversion to paid
- Deliverability: bounce %, spam complaints

OWNER DECISION NEEDED (TO UNLOCK THE 500–1,000 CSV OUTPUT)
Pick the initial geography scope for list building: Top 25 US metros vs 5–10 states vs US-wide. Once chosen, the query pack can be locked and a VA can produce 500–1,000 rows using the workflow above.