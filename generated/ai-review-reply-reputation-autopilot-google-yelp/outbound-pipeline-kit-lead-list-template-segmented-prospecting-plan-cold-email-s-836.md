# Outbound Pipeline Kit — Lead List Template + Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:51:42.159Z

---

BUSINESS REFERENCES (use in every outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (paste headers as row 1)
lead_id,vertical,segment,priority_tier,business_name,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,source_notes,personalization_hook

DATA DICTIONARY (how to fill each column)
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating, review_count: from Google Business Profile
- last_review_date: date of most recent review (for recency)
- last_review_excerpt: 8–20 words from the latest review (or paraphrase if you prefer). Use only what is publicly visible.
- response_rate_proxy_last10: count owner responses in the last 10 reviews / 10. Example: 0.1, 0.3, 0.8.
- segment rules:
  - not_responding: response_rate_proxy_last10 <= 0.2 OR 0 owner replies in last 10
  - low_rating: google_rating < 4.2
  - high_volume: review_count >= 200 OR last_review_date within last 14 days
  - If multiple apply, keep the “strongest pain” first in notes; segment column can be multi (e.g., not_responding|high_volume).
- priority_tier:
  - A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  - B: not_responding OR low_rating
  - C: high_volume only
- personalization_hook (1 sentence): combine snippet + gap. Example: “Saw a recent review saying ‘{{snippet}}’—looks like there hasn’t been an owner reply in the last few reviews.”

B) SEGMENTED PROSPECTING PLAN (2–3 verticals + agencies)
Goal: Target local businesses with high review velocity and/or visible response gaps, plus agencies that manage multiple local clients.

1) VERTICALS (direct-to-business)
1) Dentists
- Why: High LTV, high trust, reviews strongly influence bookings.
- Priority A pull: rating 3.6–4.1 OR no responses + 200+ reviews OR recent reviews in last 14 days.
- Offer angle: “Brand-safe, HIPAA-aware tone; you approve; respond within 12 hours; escalate negatives.”

2) Med spas / aesthetics
- Why: Review velocity, strong competition, high margin.
- Priority A pull: high volume + response gaps, or rating <4.2 with recent negatives.
- Offer angle: “On-brand voice, handle emotional/appearance-related reviews carefully, save staff time.”

3) HVAC / Plumbing
- Why: Many reviews, urgent local search, responsiveness impacts call volume.
- Priority A pull: 4.0–4.3 but unresponsive OR high volume (200+ reviews) + recent activity.
- Offer angle: “Speed + consistency; reduce churn from bad experiences; quick escalation to manager.”

2) AGENCY / RESELLER lane
Target: small marketing agencies running GBP, SEO, or paid search for local clients.
- Who: Local SEO agencies, boutique PPC shops, reputation management firms.
- Offer: white-label “review reply autopilot” + weekly KPI report; agency margin 20–40%.

C) GOOGLE MAPS QUERY PACK (Top metros, consistent categories)
Use format: “{category} in {metro}” then filter for relevant websites.

Suggested metros (starter 10; expand to Top 25 if needed):
New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA

Category queries (copy/paste)
Dentists:
- “dentist in {metro}”
- “cosmetic dentist in {metro}”
- “family dentist in {metro}”

Med spa:
- “med spa in {metro}”
- “aesthetic clinic in {metro}”
- “botox in {metro}”

HVAC/Plumbing:
- “HVAC contractor in {metro}”
- “air conditioning repair in {metro}”
- “plumber in {metro}”

Agency lane (Google + LinkedIn)
- “local seo agency {metro}”
- “google business profile management {metro}”
- “reputation management agency {metro}”

D) COLD EMAIL SEQUENCES (3 steps) — MASTER WITH TOKENS
TOKENS:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{google_rating}}, {{review_count}}, {{last_review_excerpt}}, {{response_gap_fact}}, {{website}}.
Always include:
- legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- reply-to email: agent_bob_replit+review-bot@agentmail.to

1) SEGMENT: NOT RESPONDING (Initial)
Subject options:
- “Quick question about replying to Google reviews”
- “Noticed a response gap on {{business_name}}”
- “12-hour review replies for {{business_name}}?”

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_fact}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives, and sends a weekly KPI report. You approve replies (or we can auto-post once you’re comfortable). We aim to respond within 12 hours so reviews don’t sit unanswered.

If you want, I can draft 3 example replies in your tone from recent reviews like: “{{last_review_excerpt}}”.

Worth a 10-minute call this week?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #1 (2–3 days later)
Subject: “Want me to draft a few replies for {{business_name}}?”
Hi {{first_name}} — should I send those 3 draft responses for your latest Google reviews? You can copy/paste or tell us your preferred tone and we’ll match it.

If review replies aren’t a priority right now, no worries—just reply “later” and I’ll close the loop.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #2 (5–7 days later)
Subject: “Close the loop?”
Last note, {{first_name}} — the usual pattern we see is: more answered reviews → higher conversion from Maps → more calls/bookings.

Do you want a lightweight setup where we:
1) Draft replies daily, 2) Escalate negatives immediately, 3) Send a weekly KPI email?

Yes/no is perfect.
– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

2) SEGMENT: LOW RATING (Initial)
Subject options:
- “Helping {{business_name}} recover from negative reviews”
- “Quick win for {{business_name}}’s rating”
- “Re: recent Google reviews”

Body:
Hi {{first_name}} — I saw {{business_name}} is sitting around {{google_rating}} on Google. One thing that often helps (even before ops changes) is consistent, thoughtful owner responses—especially on 1–3★ reviews.

We run an AI Review Reply & Reputation Autopilot for Google + Yelp. It drafts brand-safe responses in your voice, flags negatives for escalation, and sends weekly reputation KPIs.

If you share your preferred tone (warm/strict/short), I’ll send 2 draft responses you can use for recent critical reviews.

Open to a quick 10-minute call?
– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3) SEGMENT: HIGH VOLUME (Initial)
Subject options:
- “Too many reviews to keep up with?”
- “Catching up on Google/Yelp replies for {{business_name}}”
- “Review response workflow for {{business_name}}”

Body:
Hi {{first_name}} — {{business_name}} has ~{{review_count}} Google reviews and it looks like new ones come in regularly. Most teams fall behind because there’s no simple workflow.

We run an AI Review Reply & Reputation Autopilot (Google + Yelp): drafts replies, routes negatives to the right person, and sends a weekly KPI report (rating trend, response rate, avg response time).

If I draft 3 sample replies based on your most recent reviews (e.g., “{{last_review_excerpt}}”), would you want them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

4) AGENCY / RESELLER (Initial)
Subject options:
- “White-label review replies for your local clients”
- “Add-on revenue: Google/Yelp review response autopilot”
- “GBP clients: 12-hour review responses (white-label)” 

Body:
Hi {{first_name}} — do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We offer a white-label AI Review Reply & Reputation Autopilot: brand-safe draft replies for Google + Yelp, negative-review escalation, and a weekly KPI email you can forward to clients. You can package it as an add-on and keep margin.

If helpful, here’s the product overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute chat to see if it fits your client base?
– Bob
agent_bob_replit+review-bot@agentmail.to

E) DAILY SENDING OPS CHECKLIST + CRM STAGES
Daily targets (once warmed):
- New emails/day: 50–100 (split by vertical; 10–20% Priority A)
- Follow-ups/day: 25–75 (automated but monitored)
- Manual personalization: 10–20/day (Priority A only; include review excerpt)
- Agency lane: 10 new/day + 10 follow-ups/day

14-day ramp (per inbox)
- Days 1–3: 10/day
- Days 4–7: 20/day
- Days 8–10: 30/day
- Days 11–14: 40/day
(Scale by adding inboxes rather than blasting from one.)

Deliverability guardrails
- Keep bounces < 3% (pause list if higher; verify emails)
- Complaints < 0.1% (immediately reduce volume if exceeded)
- Avoid attachments; keep links to 1 (the website URL above)
- Plain-text preferred; no tracking pixel if deliverability suffers

CRM stages (minimum viable)
1) Prospect (in CSV)
2) Queued to Send
3) Sent
4) Replied
5) Qualified (pain confirmed + correct decision maker)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (tag reason: no budget, timing, wrong contact, already handled)

Reply handling SLA
- Positive/curious reply: respond within 2 business hours
- Negative review pain: propose “send 3 draft replies today”
- Not now: set follow-up reminder for 30–60 days

F) WHAT I NEED FROM OWNER TO PRODUCE THE ACTUAL 500–1,000 ROW CSV
Choose one geography scope:
A) Top 25 US metros (fastest to standardize)
B) 5–10 target states
C) US-wide
Then choose list source method (manual/VA vs paid scraper). Once a CSV exists, we can compute response_rate_proxy + finalize segments and begin sending immediately.
