# Outbound Pipeline Kit (Zero-Spend) — Lead List Template (500–1,000), Segmentation Plan, Cold Email Sequences, Daily Sending Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:33:56.670Z

---

BUSINESS REFERENCES (use in outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
- Name: Bob (Bob Smith)

GOAL
Build a predictable outbound pipeline for “AI Review Reply & Reputation Autopilot (Google/Yelp)” targeting local businesses with meaningful review volume and weak/slow owner responses. Week 1 is FREE (7-day trial), so CTA is low-friction.

A) VERTICALS + WHY (keep fixed)
1) Dentists (high LTV, frequent review impact, high competition)
2) Med spas / aesthetics (high ticket, reputation-sensitive, high review velocity)
3) HVAC + Plumbers (high intent calls, emergency services, review speed matters)
Parallel lane: marketing agencies serving these verticals (resell/white-label)

B) GEOGRAPHY (NO-SPEND DEFAULT)
Start with 6 metros to avoid list sprawl and keep quality high. Recommended: Phoenix, Dallas, Houston, Atlanta, Tampa, Denver.
Alternative: choose any 5–10 states you can service easily; keep the first pull to ~200 leads.

C) LEAD LIST CSV TEMPLATE (copy/paste headers)
lead_id,business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes,personalization_hook,send_lane

Field notes (fast rules)
- last_review_excerpt: 10–25 words max; paraphrase if needed (don’t paste anything sensitive).
- response_rate_proxy_last10: count owner responses in last 10 reviews / 10 (e.g., 0.1 = 10%).
- segment rules:
  - Not Responding = response_rate_proxy_last10 <= 0.2 OR 0 responses in last 10
  - Low Rating = google_rating < 4.2
  - High Volume = review_count >= 200 OR last_review_date within 14 days
- priority_tier:
  - A = (Not Responding AND High Volume) OR (Low Rating AND High Volume)
  - B = (Not Responding) OR (Low Rating)
  - C = High Volume only
- send_lane: direct-local OR agency

D) ZERO-SPEND LEAD SOURCING WORKFLOW (HOW TO GET TO 500–1,000)
Step 1 — Pull 120 Priority-A prospects in 2 hours (fast start)
For each of 6 metros, do 3 searches (one per vertical) and capture the top 6–8 businesses meeting Priority A/B.
Search queries (Google Maps):
- Dentist: “dentist + {metro}”, “cosmetic dentist + {metro}”, “family dentistry + {metro}”
- Med spa: “med spa + {metro}”, “aesthetic clinic + {metro}”, “botox + {metro}”
- Home services: “HVAC + {metro}”, “air conditioning repair + {metro}”, “plumber + {metro}”

Step 2 — Capture required review fields
For each business:
1) Copy rating + review count.
2) Click Reviews → sort by “Newest” → record last review date and a short excerpt (or paraphrase).
3) Open the latest 10 reviews; count how many have an “Owner response.” Compute proxy.

Step 3 — Find emails (no paid tools)
Use in this order:
1) Business website contact page footer (best)
2) Google Business “website” → look for “contact”, “book”, “about”, “careers”
3) Facebook page “About” section
4) If no email found: put a contact form URL; still send via form manually for Priority A
Email pattern guesses are allowed only if clearly published on site; otherwise skip guessing to reduce bounce.

Step 4 — QA rules (prevent garbage leads)
Reject leads if:
- Franchise / corporate (unless you want multi-location deals)
- No website and no email/contact form
- Business category mismatch (e.g., “dental lab” instead of practice)
- Reviews are extremely low volume (<25) unless rating is <4.0 and recent
Sample QA: every batch of 50 leads, spot-check 5 leads for category, review recency, and contactability.

Scale math:
- 200 leads = 1–2 days (owner/VA)
- 500 leads = 1 week with 1–2 hours/day
- 1,000 leads = 2 weeks with 1–2 hours/day

E) SEGMENTED PROSPECTING PLAN (WHO GETS WHAT MESSAGE)
Priority A (fastest ROI)
- Not Responding + High Volume: message about response gap + speed SLA (respond within 12 hours)
- Low Rating + High Volume: message about de-escalation + brand-safe responses + escalation
Priority B
- Not Responding only OR Low Rating only: same angles, softer urgency
Priority C
- High Volume only: message about throughput + consistency + weekly KPI reporting

Offer framing (Week 1)
- “7-day free trial: we draft brand-safe replies to every new review, escalate negatives, and send weekly KPI summary. You approve everything before it posts.”

F) COLD EMAIL SEQUENCES (READY TO SEND)
Personalization tokens
- {{business_name}}, {{city}}, {{service_type}}, {{recent_review_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}, {{last_review_date}}, {{contact_name}}
- Include website for legitimacy in every Email 1 and optionally in follow-ups.

F1) DIRECT-LOCAL — EMAIL 1 (3 variants by segment)
SUBJECT OPTIONS (pick 1)
- Quick question about {{business_name}}’s Google reviews
- Re: your latest review (response time)
- Helping {{business_name}} respond to reviews in <12 hours

EMAIL 1A — Not Responding angle
Hi {{contact_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed a recent one: “{{recent_review_snippet}}”. It looks like there hasn’t been an owner reply yet (or replies are pretty rare).

We run an AI-assisted “Review Reply & Reputation Autopilot” for local businesses: brand-safe responses drafted within 12 hours, negative reviews flagged for escalation, and a weekly KPI recap. You approve replies before anything posts.

If you want to sanity-check it, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can cover your reviews for a 7-day free trial?

– Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 1B — Low Rating angle
Hi {{contact_name}} — Bob here.

Saw {{business_name}} is at about {{rating}} stars on Google. One recent review mentioned: “{{recent_review_snippet}}”. When reviews go negative, the public owner response can make (or break) the next customer’s decision.

We help local businesses respond fast with brand-safe, non-defensive replies (you approve before posting), escalate issues internally, and send a weekly reputation KPI summary so nothing slips.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Would you like to try it free for 7 days and see if we can improve response consistency right away?

– Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 1C — High Volume angle
Hi {{contact_name}} — Bob here.

{{business_name}} has ~{{review_count}} reviews and they’re coming in steadily (latest on {{last_review_date}}). Keeping up with replies is a real ops job.

We run an AI-assisted review reply autopilot: drafts within 12 hours, negatives escalated, weekly KPI reporting. You approve before posting, so it stays on-brand.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute look to see if we can take review responses off your plate (free 7-day trial)?

– Bob
agent_bob_replit+review-bot@agentmail.to

F2) DIRECT-LOCAL — FOLLOW-UP 1 (send Day 2–3)
Subject: Re: {{business_name}} reviews
Hi {{contact_name}} — quick bump.

If it’s helpful, I can send 2–3 sample replies (based on your latest reviews) so you can judge tone/quality before we set anything up.

Want me to send samples, or is someone else best to talk to about reviews at {{business_name}}?

– Bob
agent_bob_replit+review-bot@agentmail.to

F3) DIRECT-LOCAL — FOLLOW-UP 2 (send Day 5–7)
Subject: Should I close the loop?
Hi {{contact_name}} — last note.

If you don’t need help with review responses right now, no worries. If you do, we can start with a 7-day free trial: drafts within 12 hours, negatives escalated, weekly KPI summary, and you approve before posting.

OK if I close the loop, or want to test it for a week?

– Bob
agent_bob_replit+review-bot@agentmail.to

G) AGENCY / RESELLER LANE (SEPARATE SEQUENCE)
Target: small agencies doing SEO/PPC/websites for dentists, med spas, home services.
How to find (free): Google “{city} dental marketing agency”, Clutch directory, LinkedIn search “dental marketing”, local chamber listings.

AGENCY EMAIL 1
Subject: Add review responses as a service (done-for-you)
Hi {{contact_name}} — Bob here.

If you work with {{vertical}} clients, review response management is an easy retention lever but annoying to fulfill consistently.

We run an AI-assisted Review Reply & Reputation Autopilot (Google/Yelp): brand-safe drafts within 12 hours, negative review escalation, weekly KPI reporting. We can operate white-label, and your client can approve replies before anything posts.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute chat about adding this to your offers? Happy to do a 7-day free pilot for one client.

– Bob
agent_bob_replit+review-bot@agentmail.to

AGENCY FOLLOW-UP 1
Hi {{contact_name}} — should I send a 1-page outline of how agencies package/resell this (incl. reporting + escalation workflow)?

– Bob

AGENCY FOLLOW-UP 2
Hi {{contact_name}} — last ping. If you’re not focused on reputation services, all good. If you want to pilot with one client, I can get it running this week.

– Bob

H) DAILY SENDING OPS (FREE STACK)
Tooling (no spend)
- Sending: Gmail/Google Workspace free trial if available OR existing inbox; keep volume low.
- CRM: Google Sheets pipeline tab (or free HubSpot).
- Tracking: avoid heavy tracking early; prioritize deliverability.

14-day ramp (per inbox)
Day 1: 20 new emails
Day 2: 25
Day 3: 30
Day 4: 35
Day 5: 40
Day 6: 45
Day 7: 50
Week 2: 60–80/day if bounce <3% and replies stable
Rules
- Follow-up only to non-repliers.
- Stop sending if bounce rate >5% in any day; fix list quality.
- Reply SLA: respond to positive replies within 2 hours during business day.
- Negative replies: apologize once, ask if they want to be removed.

I) CRM PIPELINE (MINIMUM VIABLE)
Stages + entry/exit
1) Prospect (lead exists, QA passed)
2) Sent (Email 1 sent)
3) Engaged (replied OR asked question)
4) Qualified (has Google/Yelp reviews; agrees pain exists; decision-maker)
5) Demo Booked (calendar time set)
6) Trial (7-day free running)
7) Converted (post-week-1 paid later)
8) Lost (not now / wrong fit)

KPI targets (week 1)
- Daily: 30–50 sends/inbox; 10–20 follow-ups; 5–10 manual contact-form submissions for Priority A with no email
- Weekly: 300–500 sends total; reply rate 3–8%; meetings booked 1–3% of sends

J) FIRST 48 HOURS EXECUTION (WHAT TO DO NEXT)
1) Choose metros (use the 6 recommended) and pull 200 leads using the workflow.
2) Mark Priority A/B/C and pick the matching Email 1 variant.
3) Send 20–30/day starting immediately; log outcomes in CRM.
4) In parallel, build 50 agency leads and send the agency Email 1.

Everything above is designed for $0 spend in Week 1; scaling faster later can use a scraper/enrichment tool after Week 1 with approval.