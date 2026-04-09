# Outbound Pipeline Runbook — Lead List Build (500–1,000) + Segmentation + Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:13:10.611Z

---

Business + legitimacy links (use in all outreach)
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (signature + replies): agent_bob_replit+review-bot@agentmail.to

1) ICP + Vertical selection (why these 3)
We are targeting local businesses where reviews directly drive revenue, and where owners lack time to respond fast:
A) Dentists (high LTV, high competition, reviews influence appointment conversion)
B) Med spas / aesthetic clinics (very review-driven, frequent new customers, high margin)
C) HVAC + Plumbers (lead gen is urgent; responsiveness is a trust signal)
Parallel lane: Marketing agencies serving these verticals (resell/white-label for higher LTV).

2) Segmentation + priority scoring (used for routing copy)
Capture these fields per prospect: Google rating, review count, last review date, and a response-rate proxy from the last 10 reviews.
Definitions:
- response_rate_proxy = (# of last 10 reviews with an owner/management response) / 10
Segments:
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR 0 responses in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days
Priority tiers (outreach order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Routing to message angle:
- NOT_RESPONDING → “response gap / missed conversion / we respond in 12 hours”
- LOW_RATING → “damage control + escalation + brand-safe replies + service recovery”
- HIGH_VOLUME → “ops throughput + consistency + weekly KPI reporting”

3) Lead list CSV schema (copy/paste headers)
business_name,vertical,website,city_state,phone,google_maps_url,google_rating,review_count,last_review_date,owner_or_manager_name,role_guess,email_1,email_2,response_rate_proxy,segment,priority_tier,personalization_snippet,notes

4) Zero-cost lead sourcing workflow (Google Maps → Sheets)
Goal: 500–1,000 leads with enough signal to personalize.
Step-by-step:
1. Choose geography (one of these):
   - Option A: Top 25 US metros (fast, consistent)
   - Option B: 5–10 states (focused expansion)
   - Option C: US-wide (broad, slower QA)
2. Use Google Maps searches (examples; swap metro/state):
   - Dentists: “dentist Austin TX”, “cosmetic dentist Austin TX”, “family dentistry Austin TX”
   - Med spas: “med spa Austin TX”, “aesthetic clinic Austin TX”, “botox Austin TX”
   - HVAC/Plumbing: “HVAC Austin TX”, “air conditioning repair Austin TX”, “plumber Austin TX”
3. For each listing, capture:
   - Website, phone, rating, review count
   - Open the reviews tab → note last review date
   - Scan last ~10 reviews: count how many have an owner response → compute response_rate_proxy
   - Copy a short personalization_snippet (1 sentence). If quoting, keep it short and respectful; paraphrase sensitive content.
4. Email enrichment (free-first):
   - Primary: website contact page (owner/manager email if present)
   - Secondary: Google Business profile website footer, Facebook page “About”, LinkedIn company page
   - If no direct email: use contact@domain as fallback (still workable for small businesses)
5. QA rules (to avoid garbage leads):
   - Exclude franchises with corporate review handling (unless targeting franchise owners)
   - Exclude businesses with no website if possible (harder to reach/convert)
   - Ensure category matches vertical (e.g., “orthodontist” can stay in dental; “spa” without med/aesthetics may be off-target)

5) Cold email copy pack (3-step sequences)
Personalization tokens
- {{first_name}} (if unknown, use “Hi {{business_name}} team,”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like the last 8 reviews didn’t get a reply”)
- {{rating}} / {{review_count}}
- {{vertical_specific_term}} (dentist: “patients”; med spa: “clients”; HVAC: “homeowners”)
Signature (use everywhere)
- Bob
- AI Review Reply & Reputation Autopilot
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- agent_bob_replit+review-bot@agentmail.to

5.1) DENTAL — Initial email (choose based on segment)
Subject options:
1) Quick question about {{business_name}} reviews
2) Noticed a response gap on Google
3) Helping dentists reply faster (brand-safe)

A) NOT_RESPONDING angle
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed {{response_gap}} (ex: several recent patient reviews without a reply).

We run an AI “review reply + escalation” autopilot for local practices: drafts brand-safe responses within 12 hours, routes negative reviews to you first, and sends a weekly KPI summary (rating trend, response rate, themes).

If you want, I can draft 3 replies for your most recent reviews so you can see the tone. No commitment.

Worth trying that this week?
— Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

B) LOW_RATING angle
Hi {{first_name}},

I saw a recent Google review for {{business_name}} that said “{{recent_review_snippet}}.” When reviews go unanswered, it can look like the practice isn’t listening.

We help dentists respond quickly and safely: we draft empathetic replies (HIPAA-aware wording), flag anything negative for approval, and track weekly reputation KPIs.

Would you like me to draft a response to that review + two others so you can approve/edit?
— Bob

C) HIGH_VOLUME angle
Hi {{first_name}},

{{business_name}} has a strong review volume ({{review_count}}). Keeping replies consistent is a real ops burden.

Our autopilot drafts on-brand responses within 12 hours, escalates negatives, and reports weekly KPIs so you see what’s improving.

Open to a 10-minute look at how it would work for your practice?
— Bob

5.2) DENTAL — Follow-up #1 (2–3 days later)
Subject: Want me to draft a few replies?
Hi {{first_name}},

If it helps, send me 2–3 review links (or I can use your latest ones) and I’ll reply-draft them in your tone. You approve everything before anything is posted.

Should I do that for {{business_name}}?
— Bob

5.3) DENTAL — Follow-up #2 (5–7 days later)
Subject: Close the loop?
Hi {{first_name}},

Totally fine if this isn’t a priority. Last check: do you want faster review replies + a weekly reputation KPI email, or should I close the loop?

— Bob

5.4) MED SPA — Initial email
Subject options:
1) {{business_name}} review replies
2) Quick win for your Google rating
3) 12-hour review response (you approve)

Hi {{first_name}},

I was reading {{business_name}}’s Google reviews and noticed “{{recent_review_snippet}}” and that {{response_gap}}.

We run a review-reply autopilot for med spas/aesthetic clinics: brand-safe draft replies within 12 hours, negative review escalation (so you can handle sensitive cases), and a simple weekly KPI recap (rating trend + response rate + common themes).

Want me to draft a few replies for your latest reviews so you can see the tone?
— Bob
(website + email signature)

Follow-up #1
Just bumping this—if you share the preferred tone (warm/clinical/luxury), I’ll draft 3 replies for approval.

Follow-up #2
Should I close this out, or is review response something you’d like to tighten up this month?

5.5) HVAC/PLUMBING — Initial email
Subject options:
1) Faster replies to Google reviews
2) Missed calls = missed jobs (reviews too)
3) Quick help for {{business_name}} reputation

Hi {{first_name}},

Noticed {{business_name}} has recent customer reviews like “{{recent_review_snippet}}” and {{response_gap}}.

We help home-service businesses reply within 12 hours (without you spending time): brand-safe drafts, negative review escalation, and weekly KPI reporting so you can see response rate + common issues.

If I draft replies for your 3 most recent reviews, would you want to approve them?
— Bob

Follow-up #1
If you’re busy, simplest path: I’ll draft, you approve/deny, and we handle the rest.

Follow-up #2
Should I stop reaching out, or can we set up a quick 10-min walkthrough?

5.6) AGENCY / RESELLER — Initial email
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on offer for dentists/med spas/home services
3) Quick partnership idea

Hi {{first_name}},

I’m reaching out because you work with {{vertical}} clients. We built a lightweight “AI review reply + escalation + weekly KPI” autopilot for Google Business Profile/Yelp.

Agencies use it as a white-label add-on: we draft brand-safe responses within 12 hours, escalate negatives to the account manager/client, and send a simple weekly reputation report.

If you have 10+ clients where reviews drive revenue, I can share packaging + margins and set you up with a pilot.

Open to a 15-minute chat?
— Bob
(website + email)

6) Daily sending ops (14-day ramp + SOP)
Tools (free-first):
- CRM: Google Sheets or HubSpot Free
- Tracking: avoid heavy link tracking early; keep deliverability high
- Scheduling: use plain-text emails, minimal links (only website if needed)

14-day ramp (per inbox):
- Days 1–2: 10–15/day (mostly Priority A)
- Days 3–4: 20/day
- Days 5–7: 30–40/day
- Week 2: 50/day → 75/day (only if bounce <3% and complaints ~0)
Target steady-state: 50–100/day total across inboxes.

List hygiene + QA sampling:
- Sample 20 leads per 200 for QA: correct vertical, valid website, not a franchise HQ, review data present
- Bounce threshold: pause sending if hard bounce >3% in a day; fix list

Reply handling SLA:
- Same-day replies for positive interest
- For negatives: acknowledge, ask for best contact/time, offer sample drafts

CRM stages (simple):
1) Prospect (in CSV, not sent)
2) Sent (Email 1 sent)
3) Engaged (opened/replied)
4) Qualified (correct decision maker + pain confirmed)
5) Demo booked
6) Trial / Pilot
7) Paid
8) Lost (reason)

KPIs to track weekly:
- Sent / delivered / bounce rate
- Reply rate (goal: 3–8% early)
- Positive reply rate (goal: 1–3%)
- Meetings booked (goal: 0.5–1% of delivered)
- Conversion to paid

7) What I still need from owner to unlock the lead CSV
Choose ONE geography approach:
- Top 25 US metros (recommended for speed and consistent TAM)
- 5–10 states (if you want concentration)
- US-wide (broadest, but slower QA)
Once chosen, the list can be built to 500–1,000 using this runbook, exported to CSV, and immediately loaded into the CRM stages above.
