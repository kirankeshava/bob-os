# Outbound Pipeline Kit — Lead List Build (Top 25 Metros) + Segmentation + Cold Emails + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:24:25.557Z

---

Business proof + contact (use in outreach)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

A) VERTICALS + GEO (for first 500–1,000 leads)
We will pull from the Top 25 US metros to maximize review volume and ability to pay.
Top metros list (use city + state): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Detroit MI; Nashville TN; Portland OR.
Verticals:
1) Dentists (general/cosmetic/implants)
2) Med spas / aesthetic clinics
3) HVAC + Plumbers (home services)
Parallel lane: marketing agencies that serve these verticals.

B) LEAD LIST CSV HEADERS (copy/paste as row 1)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses,response_rate_proxy,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

C) GOOGLE MAPS QUERY PACK (copy/paste into Google and open Maps results)
For each metro, run each query. Goal: 6–10 businesses per query per metro.

Dentist queries:
- “dentist {CITY} {STATE}”
- “cosmetic dentist {CITY} {STATE}”
- “dental implants {CITY} {STATE}”
- “family dentistry {CITY} {STATE}”
Med spa queries:
- “med spa {CITY} {STATE}”
- “aesthetic clinic {CITY} {STATE}”
- “botox {CITY} {STATE}”
- “laser hair removal {CITY} {STATE}”
HVAC/Plumbing queries:
- “HVAC {CITY} {STATE}”
- “air conditioning repair {CITY} {STATE}”
- “plumber {CITY} {STATE}”
- “drain cleaning {CITY} {STATE}”

Agency lane queries (do these separately; 100–200 agencies can be enough for month 1):
- “digital marketing agency dentists {CITY}”
- “dental marketing agency {CITY}”
- “med spa marketing agency {CITY}”
- “home services marketing agency {CITY}”
- “seo agency plumbers {CITY}”

D) DATA COLLECTION SOP (zero-cost, repeatable)
For each selected business from Maps:
1) Capture: business_name, phone, website, google_maps_url (share link).
2) Capture reputation metrics:
   - google_rating and review_count from the main listing.
   - Click “Reviews”, sort by “Newest”, capture last_review_date.
3) Compute response-rate proxy (last_10_owner_responses):
   - In the newest 10 reviews, count how many have an “Owner response”. Put that count in last_10_owner_responses.
   - response_rate_proxy = last_10_owner_responses / 10.
4) Capture personalization_snippet:
   - Copy 8–20 words from the newest review OR paraphrase it. Keep it neutral. Avoid sensitive health details (especially for dentists/med spas). Example: “Saw your recent review mentioning ‘quick check-in and friendly staff’…”
5) Find contact:
   - Prefer website “Contact” page email.
   - If no email on site, try “About/Team” pages; for home services, try “Service” pages footer.
   - Role_guess: Owner, Practice Manager, Office Manager, Marketing Manager, General Manager.
   - owner_or_manager_name: from website team page or LinkedIn if easily available.

E) SEGMENTATION RULES (apply after fields are filled)
Segments (single primary tag):
- not_responding: response_rate_proxy <= 0.2 (0–2 owner responses out of last 10)
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days
Priority tier (A/B/C):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating (but not A)
- Priority C: high_volume only
Notes: If a business is both low_rating and not_responding, tag the more urgent angle in ‘segment’ based on which you want to lead with (usually low_rating first).

F) QA CHECKLIST (run every 30 rows; fix before sending)
- Category fit: truly in target vertical (not “dental lab”, not “beauty salon”, not “handyman”).
- Has website OR at least a clear business email found.
- Not a national franchise location that routes to corporate-only contact (unless you want multi-location deals).
- last_review_date is present and recent enough (prefer within 60 days).
- response_rate_proxy computed correctly (0–1.0).
- personalization_snippet is neutral and safe (no patient names, no diagnoses, no explicit procedure details).

G) COLD EMAIL SEQUENCES (3-step) — include website + contact
Use tokens:
{{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_rate_proxy}}, {{google_rating}}, {{review_count}}, {{vertical}}
Primary CTA: “Worth a 10-min call?” OR “Want me to send 2–3 draft replies for approval?”

G1) NOT RESPONDING — Initial
Subject options:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed you’re missing a few owner replies
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed a few recent ones don’t have an owner response (ex: “{{recent_review_snippet}}”).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe replies and helps you respond within ~12 hours. You can approve everything before it posts, and we escalate negative reviews so nothing gets missed.

If you want, I can send 2–3 draft responses for your newest reviews so you can see the tone.

Worth a quick 10-min call this week?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #1 (2–3 days later)
Subject: Want me to draft a couple replies?
Body:
Hi {{first_name}} — quick follow-up.

Most local buyers read the most recent 3–5 reviews; when there’s no owner reply, it can look like the business is inactive (even when service is great).

If you send me the link to your Google listing, I’ll draft a couple responses in your voice for approval.

— Bob

Follow-up #2 (4–6 days later)
Subject: Close the loop?
Body:
Hi {{first_name}} — should I close the file on review replies for {{business_name}}, or is improving response rate on Google/Yelp a priority this month?

If it is, I can share a simple weekly KPI report (response rate, new reviews, avg rating trend) and handle the daily replying.

— Bob

G2) LOW RATING — Initial
Subject options:
1) Quick win to lift your Google rating
2) Handling negative reviews (without sounding robotic)
3) {{business_name}} reputation follow-up

Body:
Hi {{first_name}} — Bob here.

I noticed {{business_name}}’s Google rating is around {{google_rating}} and there are a few reviews that read like they needed a fast, professional owner response.

We help local businesses respond quickly and consistently (Google + Yelp): brand-safe drafts, negative review escalation, and a weekly reputation KPI report. You approve before anything posts.

If you want, I can draft a response to your most recent critical review in a calm, de-escalating tone.

Open to a quick 10-min call?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #1
Subject: I can draft the response (you approve)
Body:
Hi {{first_name}} — offering a no-pressure preview.

Replying well to a negative review often matters as much as the rating itself—future customers read the response.

Want me to draft 1 response you can post (or tweak) today?

— Bob

Follow-up #2
Subject: Should I stop reaching out?
Body:
Hi {{first_name}} — last note.

If you’re already on top of review replies, I’ll back off. If not, we can take this off your plate and send a weekly KPI snapshot.

Reply “yes” and I’ll send the 2–3 draft replies preview.

— Bob

G3) HIGH VOLUME — Initial
Subject options:
1) Keeping up with {{review_count}} reviews
2) Review replies at scale (still human-sounding)
3) Ops question for {{business_name}}

Body:
Hi {{first_name}} — Bob here.

{{business_name}} has strong review volume ({{review_count}}). The hard part is keeping response quality consistent when reviews come in frequently.

We run an autopilot that drafts on-brand replies for Google + Yelp, routes negative reviews for escalation, and sends a weekly KPI report. You can approve replies before posting (or set rules).

Want me to send a sample pack of 5 replies in your brand voice for recent reviews?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #1
Subject: Sample pack of replies?
Body:
If you share your listing link, I’ll draft 5 responses matching your tone (short/medium/warm) so you can pick a style.

— Bob

Follow-up #2
Subject: OK to close this?
Body:
Should I close this out, or would you like the sample pack + weekly KPI template?

— Bob

G4) AGENCY / RESELLER — Initial
Subject options:
1) Add “review reply” to your retainer (white-label)
2) Easy upsell for your local clients
3) White-label reputation ops

Body:
Hi {{first_name}} — Bob here.

If you manage local clients (dentists/med spas/home services), we can white-label an AI Review Reply & Reputation Autopilot: brand-safe drafts for Google/Yelp, negative review escalation, and a weekly KPI report.

You keep the relationship + margin; we do the ops. Happy to spin up a sample for 1 client so you can see the workflow.

Want to see a 1-page overview? (Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

H) DAILY SENDING OPS (minimum viable, 1 inbox)
Tools: any inbox + Google Sheet CRM.
Day-by-day ramp (1 inbox):
- Days 1–2: 20 new/day, 10 follow-ups/day
- Days 3–4: 30 new/day, 15 follow-ups/day
- Days 5–7: 40–50 new/day, 20 follow-ups/day
- Week 2: 60–80 new/day, 30 follow-ups/day (only if bounces <3% and spam complaints ~0)

Daily checklist:
1) Pull 25–80 leads from the sheet (Priority A first).
2) Personalize first line using {{recent_review_snippet}} + response gap.
3) Send new emails inside cap; schedule follow-ups.
4) Process replies 2x/day (midday + end of day). SLA: same-day response.
5) Track outcomes in CRM stages.

Bounce/complaint thresholds:
- If hard bounces >3% in a day: pause, verify emails, slow ramp.
- If any spam complaints: reduce volume, adjust copy, add more personalization.

I) CRM STAGES (simple and strict)
Prospect (in sheet) → Sent → Follow-up Due → Replied → Qualified → Demo Booked → Trial/Preview Sent → Paid → Lost.
Entry/exit:
- Qualified: they confirm they own/manage reviews OR ask pricing OR ask how it works.
- Trial/Preview Sent: you delivered 2–5 draft replies or a KPI snapshot.

J) OUTPUT TARGETS (to hit $100k path)
- Lead production: 50–100 new leads/day (with VA) until 1,000.
- Sending: 50–100 new/day + follow-ups once deliverability is stable.
- KPI goals: 3–8% reply rate, 1–3% booked calls, close 20–30% of qualified (depends on pricing).

If you confirm “Top 25 metros” as the geography, this kit is ready to execute today: build the first 200 leads (2–3 days with a VA), start sending Priority A immediately, and iterate copy based on replies.