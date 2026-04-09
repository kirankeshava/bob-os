# Outbound Pipeline Kit (Operator-Ready): Lead List Build Spec (Top 25 US Metros) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:49:49.233Z

---

Business identity to reference in outreach
- Product name: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof / site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a repeatable outbound machine for local businesses and agencies. First list build targets Top 25 US metros to maximize density and review velocity. Deliverable output is a CSV with 500–1,000 prospects, segmented into: Not Responding / Low Rating / High Volume and prioritized A/B/C.

PART 1 — TARGET GEOGRAPHY (Top 25 US metros)
Use these city queries for consistency:
1) New York, NY
2) Los Angeles, CA
3) Chicago, IL
4) Houston, TX
5) Phoenix, AZ
6) Philadelphia, PA
7) San Antonio, TX
8) San Diego, CA
9) Dallas, TX
10) San Jose, CA
11) Austin, TX
12) Jacksonville, FL
13) Fort Worth, TX
14) Columbus, OH
15) Charlotte, NC
16) San Francisco, CA
17) Indianapolis, IN
18) Seattle, WA
19) Denver, CO
20) Washington, DC
21) Boston, MA
22) El Paso, TX
23) Nashville, TN
24) Detroit, MI
25) Oklahoma City, OK

PART 2 — GOOGLE MAPS QUERY PACK (copy/paste)
For each metro, run these queries in Google Maps. Open each business profile and capture required fields.

Vertical A: Dentists
- “dentist {city}”
- “cosmetic dentist {city}”
- “family dentistry {city}”
- Optional niche (higher LTV): “dental implants {city}”

Vertical B: Med Spas / Aesthetic Clinics
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city}”
- Optional niche: “laser hair removal {city}”

Vertical C: HVAC + Plumbing (home services)
- “hvac {city}”
- “air conditioning repair {city}”
- “plumber {city}”
- Optional niche: “emergency plumber {city}”

Quality filters while selecting prospects (apply fast):
- Exclude obvious national franchises if corporate-owned and hard to reach (example: large chains); include multi-location groups only if a local manager email is available.
- Prefer businesses with websites.
- Prefer businesses with recent reviews (last 30 days).

PART 3 — CSV TEMPLATE (HEADERS)
Create a Google Sheet with this exact header row (export CSV later):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt
- last_10_reviews_owner_responses (0–10)
- response_rate_proxy (0–1)
- segment (not_responding | low_rating | high_volume | mixed)
- priority_tier (A | B | C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_hook
- notes

How to capture fields (simple, consistent)
1) business_name / phone / website: from GBP.
2) google_rating / review_count: from GBP.
3) last_review_date: open Reviews → sort by newest → capture date of most recent.
4) last_review_excerpt: capture first ~12–20 words of newest review. If it includes sensitive info, paraphrase (do not include medical info; keep it generic).
5) owner responses proxy: look at the latest 10 reviews; count how many have “Response from the owner”.
6) google_maps_url: copy the share link.

PART 4 — SEGMENTATION + PRIORITY SCORING (RULES + SHEET FORMULAS)
Define 3 core segments based on observable signals.

Thresholds
- Not Responding: response_rate_proxy <= 0.2 (2/10 or fewer responses)
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within 14 days

Recommended Google Sheets formulas (assumes columns):
- response_rate_proxy = IFERROR([last_10_reviews_owner_responses]/10, 0)

Segment assignment (pseudo-logic):
- If Low Rating AND Not Responding → segment = “mixed”
- Else if Low Rating → “low_rating”
- Else if Not Responding → “not_responding”
- Else if High Volume → “high_volume”
- Else → “high_volume” (only if review_count >=100) otherwise deprioritize

Priority tier
- Priority A: (high_volume AND not_responding) OR (high_volume AND low_rating) OR mixed
- Priority B: not_responding OR low_rating (without high volume)
- Priority C: high_volume only

PART 5 — PERSONALIZATION HOOK (SAFE TEMPLATE)
Create personalization_hook as 1 sentence you can paste into email.
Examples:
- “Noticed your recent review mentioning ‘{paraphrased_snippet}’—I also saw only a few of the latest reviews have owner replies.”
- “Saw a recent review about ‘{paraphrased_snippet}’—responding quickly can protect conversions when prospects compare clinics.”

PART 6 — COLD EMAIL SEQUENCES (3-STEP) — DIRECT LOCAL BUSINESSES
Use one of the segment variants below. Always include website + contact reference in footer.

GLOBAL SENDER SIGNATURE (paste in all emails)
— Bob
AI Review Reply & Reputation Autopilot (Google/Yelp)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

A) NOT RESPONDING variant (best for most)
Email 1 (Day 1)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap on Google
3) Can I help with review replies?

Body:
Hi {{first_name}},

{{personalization_hook}}

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies, negative-review escalation, and a weekly KPI report. The simple promise: you respond within ~12 hours without spending staff time.

If I send 2–3 sample replies in your tone for your latest reviews, would you like to see them? If yes, who owns reputation/reviews on your team?

— Bob
(links/signature)

Follow-up 1 (Day 3)
Subject: Re: Google review replies
Body:
Hi {{first_name}}—circling back.

Most local customers read the newest 3–5 reviews. When there’s no owner reply, it can look like no one’s listening.

Want me to draft a few replies you can approve? I can tailor to {{business_name}}’s tone and keep it policy-safe.

— Bob

Follow-up 2 (Day 7)
Subject: Should I close the loop?
Body:
Hi {{first_name}}, last note.

If reviews aren’t a focus right now, no worries. If they are, I can:
- draft responses for new Google/Yelp reviews
- flag negatives immediately
- send a weekly report (rating, volume, response rate)

Okay if I send samples for your newest review this week?

— Bob

B) LOW RATING variant
Email 1 (Day 1)
Subject options:
1) Quick idea to protect your rating
2) Turning tough reviews into wins
3) Review response help for {{business_name}}

Body:
Hi {{first_name}},

I saw a recent review mentioning “{{last_review_excerpt}}.” When ratings dip, fast, thoughtful owner replies can prevent the next prospect from bouncing.

We provide an AI-assisted review reply workflow for Google/Yelp: drafts in your brand voice, escalation for negative reviews, and weekly KPIs. You approve before anything posts.

Would it be helpful if I drafted a response to that recent review (and one more), so you can see the approach?

— Bob

Follow-up 1 (Day 3)
Subject: Re: rating + review replies
Body:
Hi {{first_name}},

Even a single well-handled negative review can change the story for future readers.

If you tell me your preferred tone (warm/clinical/direct), I’ll send 2 sample replies for approval.

— Bob

Follow-up 2 (Day 7)
Subject: close this out?
Body:
Hi {{first_name}},

Should I close this out, or is it worth a quick 10-minute call to see if an approval-based autopilot would help?

— Bob

C) HIGH VOLUME variant
Email 1 (Day 1)
Subject options:
1) Keeping up with review volume
2) Review response capacity for {{business_name}}
3) A simple 12-hour reply system

Body:
Hi {{first_name}},

{{business_name}} gets steady review volume—nice work. When volume is high, the bottleneck is usually time: replies slip, tone varies, and negatives don’t get escalated quickly.

Our system drafts brand-safe replies for Google/Yelp, routes negatives for fast escalation, and ships a weekly KPI report. You can approve replies (or auto-approve safe positives).

Open to a quick look? I can send a few sample replies for your newest reviews.

— Bob

Follow-up 1 (Day 3)
Subject: Re: review volume
Body:
Hi {{first_name}},

If you’re already replying, the value is consistency + speed + reporting.

Want sample replies in your exact tone for the 3 newest reviews?

— Bob

Follow-up 2 (Day 7)
Subject: last ping
Body:
Hi {{first_name}},

Last ping—should I send samples, or is someone else the right contact for customer experience/reputation?

— Bob

PART 7 — AGENCY / RESELLER LANE (marketing agencies)
Initial email
Subject options:
1) White-label review reply autopilot
2) Add-on for your local clients (Google/Yelp)
3) Quick partnership idea

Body:
Hi {{first_name}},

I’m Bob—building an AI Review Reply & Reputation Autopilot for Google/Yelp (brand-safe drafts, negative escalation, weekly KPIs). Agencies use it as a simple add-on for SMB clients who don’t respond consistently.

If you manage dentists/med spas/home services, this usually improves response rate fast and supports conversion.

Open to a 15-minute call? If you reply with a niche, I’ll send a sample workflow + example KPI report.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

PART 8 — DAILY SENDING OPS (NO-TOOL DEPENDENT)
Daily targets (starting point)
- New emails/day: 50 (Day 1–3), 75 (Day 4–7), 100 (Day 8+)
- Follow-ups/day: 25–75 depending on volume
- Personalization: 1 sentence + 1 metric (rating/response gap)

14-day ramp (per inbox)
- Days 1–3: 20–30/day
- Days 4–7: 30–50/day
- Days 8–14: 50–80/day
If multiple inboxes exist, split volume evenly.

List QA rules (before sending)
- Bounce risk flags: no website + generic category + missing phone (skip)
- Deduplicate by website and phone
- Validate emails by format; if role-based only (info@), still usable but note as lower priority
- Always keep personalization_hook non-sensitive and non-medical

Deliverability thresholds (stop/send less if hit)
- Hard bounce rate > 3%: stop new sends, fix list
- Spam complaints > 0.1%: stop campaign, review copy + targeting

Reply-handling SLA
- Same-day replies for interested responses
- Within 12 hours for “who are you / pricing?”
- Immediately escalate any compliance questions about posting/approvals: reiterate “you approve before anything posts”

CRM stages (simple pipeline)
1) Prospect (in sheet, segmented)
2) Sent (Email 1)
3) Follow-up 1 sent
4) Follow-up 2 sent
5) Replied – Interested
6) Replied – Not now
7) Demo Booked
8) Trial
9) Paid
10) Lost

Weekly KPIs to track
- Deliverability: bounce %, spam complaint %, reply rate
- Commercial: positive reply rate, demos booked, trials started, paid conversions
- Segment performance: A/B/C reply rate and booked-demo rate

Execution note
This kit is designed so a human/VA can build 500–1,000 leads with consistent fields using Google Maps and immediately start segmented outreach. If speed becomes the bottleneck, the next step is requesting approval for a paid Maps scraper/enrichment to generate the CSV faster.
