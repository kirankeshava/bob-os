# Outbound Pipeline Runbook (Zero-Cost): Lead List Build (500–1,000) + Segmentation Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:24:58.080Z

---

BUSINESS / LEGITIMACY LINKS (use in every conversation)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

ONE GOAL
Book demos/trials with local businesses that have clear review-response gaps and/or reputational risk, and a parallel lane for agencies that can resell the service.

1) ICP + VERTICALS (start here)
A) Dentists / dental clinics
- Why: high LTV, reputation sensitive, steady review velocity, appointment-driven revenue.
B) Med spas / aesthetic clinics
- Why: extremely reputation-sensitive, high margin services, social proof drives bookings.
C) HVAC + plumbers (home services)
- Why: high review volume, fast response expectation, strong local pack competition.
D) Agency lane (reseller)
- Local SEO agencies, web design shops, marketing agencies managing GBPs.

2) LEAD LIST CSV TEMPLATE (copy/paste header row)
Required columns:
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_review_excerpt,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,notes

How to compute key fields (manual, zero-cost):
- google_rating/review_count: from Google Business Profile panel in Maps.
- last_review_date: open reviews, sort by newest, record date.
- last_review_excerpt: copy 8–20 words from newest review (or paraphrase if sensitive).
- response_rate_proxy: look at LAST 10 reviews. Count how many have an “Owner response.” proxy = responses/10. Example: 1 response in last 10 => 0.10.

3) SEGMENTATION + PRIORITY SCORING (simple and operational)
Segments (can be multiple; choose primary based on severity):
- NOT_RESPONDING: response_rate_proxy <= 0.20 OR 0 owner responses in last 10.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days.

Priority tiers:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME) OR (LOW_RATING AND last_review_date <= 14 days)
- Priority B: NOT_RESPONDING only OR LOW_RATING only
- Priority C: HIGH_VOLUME only (rating ok, some responses)

Routing to message variant:
- NOT_RESPONDING → “response gap + speed + brand-safe approval” angle
- LOW_RATING → “negative review escalation + careful tone + protect rating” angle
- HIGH_VOLUME → “throughput/ops + consistency + weekly KPI” angle

4) GEO + QUERY PACK (choose one geo approach, then execute)
Pick ONE:
A) Top 25 US metros (fastest to hit 500–1,000)
B) 5–10 states (good if you want concentrated footprint)
C) US-wide (harder QA)

Google Maps queries (use exact phrase + city):
Dentists:
- “dentist in {city}”
- “cosmetic dentist in {city}”
- “dental clinic in {city}”
Med spas:
- “med spa in {city}”
- “aesthetic clinic in {city}”
- “botox in {city}”
HVAC/plumbing:
- “hvac in {city}”
- “air conditioning repair in {city}”
- “plumber in {city}”

Agency lane queries:
- “local SEO agency {city}”
- “google business profile management {city}”
- “marketing agency {city} dental”

5) DAILY LIST-BUILD PRODUCTION TARGETS (zero-cost)
- One person can reliably do ~40–70 qualified rows/day if only collecting: rating, review_count, last_review_date, response_rate_proxy (last 10), website, and 1 email.
- Plan: 10 business leads per vertical per day (30/day) + 10 agencies/day = 40/day.
- 2 weeks = ~400–600. Scale by adding another collector or narrowing fields.

Free email capture (best-effort, not perfect):
- Check website footer/contact page
- Look for “info@, admin@, office@, hello@”
- For agencies, also capture “sales@ / partnerships@”

6) COLD EMAIL SEQUENCES (3-step). Use personalization tokens.
Tokens:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_excerpt}}
- {{response_gap}} (e.g., “looks like most recent reviews don’t have an owner reply”)
- {{website_url}} = website above
- {{contact_email}} = agent_bob_replit+review-bot@agentmail.to

6.1 LOCAL BUSINESS — INITIAL EMAIL (NOT_RESPONDING variant)
Subject options:
1) Quick fix for {{business_name}} reviews
2) Noticed a review reply gap
3) Re: Google reviews in {{city}}

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and saw a recent one: “{{recent_review_excerpt}}”. {{response_gap}}.

We run a lightweight Review Reply & Reputation Autopilot: we draft brand-safe responses (Google + Yelp), you approve (or we follow your rules), and we respond within 12 hours. Negative reviews get escalated immediately.

If helpful, I can send 3 sample replies for your latest reviews so you can see the tone (free this week).

Want me to draft them?

– Bob
{{website_url}}
{{contact_email}}

6.2 LOCAL BUSINESS — INITIAL EMAIL (LOW_RATING variant)
Subject options:
1) Protecting {{business_name}}’s rating
2) Quick help with negative reviews
3) Reputation + replies in {{city}}

Body:
Hi {{first_name}},

I noticed {{business_name}} is at {{google_rating}} on Google. A recent review said: “{{recent_review_excerpt}}”.

If you want, we can help by:
- Drafting careful, brand-safe responses (you approve)
- Escalating negative reviews the same day so the right person responds
- Sending a weekly KPI snapshot (rating trend, response rate, new reviews)

No software install required; it’s a simple workflow. Here’s our page: {{website_url}}.

Should I draft responses to your 2–3 most recent reviews (free) so you can compare?

– Bob
{{contact_email}}

6.3 LOCAL BUSINESS — INITIAL EMAIL (HIGH_VOLUME variant)
Subject options:
1) Keeping up with review volume
2) Review replies at scale (brand-safe)
3) Ops help for {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} has a strong volume of reviews ({{review_count}}). Most teams fall behind simply because it’s time-consuming.

We help local businesses keep replies consistent and fast: draft responses within 12 hours, follow your brand rules, escalate negatives, and report weekly KPIs.

If you send your preferred tone (friendly/formal/short), I’ll draft a reply to your newest review today (free).

Interested?

– Bob
{{website_url}}
{{contact_email}}

6.4 FOLLOW-UP #1 (Day 3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up — want me to draft 3 sample replies for {{business_name}}’s most recent reviews (including “{{recent_review_excerpt}}”)?

You can just reply “yes” and I’ll send drafts you can copy/paste.

– Bob
{{website_url}}
{{contact_email}}

6.5 FOLLOW-UP #2 (Day 7)
Subject: close the loop?

Hi {{first_name}},

Should I close the loop here, or is review replies something you’d like help with this month?

If you want, I’ll send:
1) a suggested reply to your newest review, and
2) a one-page snapshot of your response rate vs nearby competitors (manual, free).

– Bob
{{website_url}}
{{contact_email}}

6.6 AGENCY/RESELLER — INITIAL EMAIL
Subject options:
1) White-label review replies for your clients
2) Add-on: GBP + Yelp review response (done-for-you)
3) Quick partnership idea

Body:
Hi {{first_name}},

Do you manage Google Business Profiles for local clients (dental/med spa/home services)?

We run a Review Reply & Reputation Autopilot that you can resell: brand-safe drafts, client approval workflow, negative review escalation, and a simple weekly KPI report.

If you tell me your client vertical + volume, I can draft a white-label workflow and a sample weekly report you can forward.

Worth a quick 10 minutes?

– Bob
{{website_url}}
{{contact_email}}

7) DAILY SENDING OPS (FREE STACK)
Tools (free):
- Gmail/Google Workspace inbox you already have access to (send low volume)
- Google Sheets as CRM
- Manual tracking of opens is optional; prioritize replies.

14-day ramp (per inbox):
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50–80/day (only if bounce rate < 3% and replies are healthy)

Daily workflow (60–90 min):
1) Pull 20–40 new leads (Priority A/B first)
2) QA: verify category, local business (not franchise HQ), has website/phone
3) Personalize 1 line using {{recent_review_excerpt}} + {{response_gap}}
4) Send new emails
5) Send follow-ups due today
6) Process replies within same day (SLA: < 4 business hours)

Bounce/complaint rules:
- If hard bounces > 3% in any batch: stop, re-check emails, send only to verified website emails.
- If any spam complaints: reduce volume, simplify copy, remove links for 48 hours.

8) SIMPLE CRM PIPELINE (Google Sheets columns)
- Stage: Prospect | Sent | Follow-up 1 | Follow-up 2 | Replied | Qualified | Demo Booked | Trial Active | Won | Lost
- Next step date
- Notes (pain point, segment, offer promised)

Qualification checklist (on reply):
- Do they have Google + Yelp presence?
- Who owns review responses today?
- Do they want: approval workflow or fully managed?
- Negative review escalation contact?

9) WHAT TO DO NEXT (owner action)
- Choose geo scope (Top 25 metros OR 5–10 states). Then start list-building immediately using the template.
- Build first 200 leads, start sending Day 1 ramp simultaneously.
- Track replies by segment to learn which angle converts fastest (NOT_RESPONDING usually wins early).