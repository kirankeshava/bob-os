# Outbound Pipeline Kit — Lead List Spec (500–1,000) + Segmentation + Cold Email (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:01:07.207Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Reply/contact email to include: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a targeted outbound machine for local businesses + agencies:
1) Generate 500–1,000 prospects with review metrics and segmentation.
2) Send 50–100 cold emails/day with safe personalization.
3) Route by segment: not responding / low rating / high volume.

PART A — VERTICALS + TARGETING (HIGH INTENT)
Primary verticals:
1) Dentists (incl. cosmetic, family dentistry, orthodontics)
2) Med Spas / Aesthetic Clinics (Botox, laser, skin)
3) HVAC + Plumbers (home services)
Why: high review velocity, strong LTV, ratings directly impact bookings.

Recommended geography for first 1,000 leads: TOP 25 US METROS.
Use these city footprints (copy/paste):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

PART B — LEAD LIST BUILD SPEC (GOOGLE MAPS / GBP)
Deliverable fields (CSV columns):
created_date, vertical, metro, business_name, address, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, last_review_snippet_safe, response_rate_proxy_last10, owner_response_in_last10 (yes/no), segment, priority, contact_name_guess, role_guess, email_1, email_2, notes

Data capture procedure per lead (repeatable SOP):
1) Open Google Maps → search query (see query pack below).
2) Click business → record:
   - Name, address/city, phone, website, Maps URL
   - Rating + review count
3) Click “Reviews” → sort by “Newest” (if available) → capture:
   - last_review_date
   - last_review_snippet_safe (8–18 words). SAFETY RULE: paraphrase if review contains health info, accusations, profanity, or personal data. Never include the reviewer’s full name.
4) Compute response-rate proxy from last 10 reviews:
   - Count how many of the newest 10 reviews have an “Owner response”.
   - response_rate_proxy_last10 = owner_responses/10 (as %)
   - owner_response_in_last10 = yes if >=1 else no
5) Quick email capture:
   - Prefer website contact page/footer (info@, hello@, office@)
   - If no email visible: try “Domain + common patterns” from About/Contact pages (e.g., office@domain.com).
   - Record as email_1/email_2; if none, leave blank for later enrichment.

Inclusion rules (quality control):
- Must have: website OR phone, rating, review count.
- Must be independently operated or small chain (exclude mega-franchises when possible).
- Prefer: review_count >= 50 OR last_review_date within 30 days.

Exclusion rules:
- Aggregators/directories (Yelp listing pages, Zocdoc pages as primary “website”).
- “Corporate HQ” listings that aren’t customer-facing.
- Duplicate locations already in sheet.

PART C — QUERY PACK (COPY/PASTE)
Run each query per metro and collect the top 10–20 that match inclusion rules.
Dentist queries:
- “dentist in {METRO}”
- “cosmetic dentist in {METRO}”
- “orthodontist in {METRO}”
Med spa queries:
- “med spa in {METRO}”
- “botox in {METRO}”
- “laser hair removal in {METRO}”
Home services queries:
- “hvac in {METRO}”
- “air conditioning repair in {METRO}”
- “plumber in {METRO}”

Agency/reseller lane (optional parallel list):
- “digital marketing agency dental {METRO}”
- “med spa marketing agency {METRO}”
- “home services marketing agency {METRO}”
Capture: agency name, website, email, LinkedIn, niche focus, clients referenced.

PART D — SEGMENTATION + PRIORITY SCORING
Segments (apply per lead):
1) not_responding:
   - response_rate_proxy_last10 <= 0.2 OR owner_response_in_last10 = no
2) low_rating:
   - google_rating < 4.2
3) high_volume:
   - review_count >= 200 OR last_review_date within 14 days

Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Google Sheets formulas (assumes columns):
- Rating in J, Review count in K, Last review date in L, Response proxy in N.
Segment (column P) example formula:
=TEXTJOIN(";",TRUE,
 IF($N2<=0.2,"not_responding","") ,
 IF($J2<4.2,"low_rating","") ,
 IF(OR($K2>=200, TODAY()-$L2<=14),"high_volume","")
)
Priority (column Q) example formula:
=IF(OR(AND($N2<=0.2,OR($K2>=200,TODAY()-$L2<=14)),AND($J2<4.2,OR($K2>=200,TODAY()-$L2<=14))),"A",
 IF(OR($N2<=0.2,$J2<4.2),"B",
 IF(OR($K2>=200,TODAY()-$L2<=14),"C","C")))

PART E — COLD EMAIL (3-STEP) WITH PERSONALIZED HOOK
Personalization tokens:
{{first_name}} (if unknown use “there”), {{business_name}}, {{metro}}, {{vertical}}, {{recent_review_snippet_safe}}, {{response_gap}} (e.g., “no owner replies on recent reviews”), {{rating}}, {{review_count}}
Always include:
- Website legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
- Reply email: agent_bob_replit+review-bot@agentmail.to

EMAIL 1 (use variant by segment)
Subject options:
A) “Quick help with your Google reviews”
B) “{{business_name}}: responses to new reviews”
C) “12-hour review replies (you approve)”

Body (NOT RESPONDING variant):
Hi {{first_name}} — I was looking at {{business_name}} on Google and noticed recent reviews like “{{recent_review_snippet_safe}}” without an owner reply.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews, and helps you respond within ~12 hours. You can approve/edit everything before it posts.

If you want, I can send 3 example replies for your latest reviews so you can see the tone. Details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Open to a 10-minute call this week, or should I email the samples?
— Bob
agent_bob_replit+review-bot@agentmail.to

Body (LOW RATING variant):
Hi {{first_name}} — I saw {{business_name}} has a {{rating}} rating and a few newer reviews mentioning “{{recent_review_snippet_safe}}”.

We help businesses respond fast and safely on Google/Yelp: empathetic replies, escalation for serious issues, and weekly reputation KPIs. Everything is brand-safe and can be approved before posting.

Would it be useful if I drafted responses to your 3 most recent critical reviews (no cost) so you can see if it helps convert future prospects? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Can I send those drafts by email?
— Bob
agent_bob_replit+review-bot@agentmail.to

Body (HIGH VOLUME variant):
Hi {{first_name}} — {{business_name}} gets a lot of review activity ({{review_count}} total). Keeping up with replies is a real ops load.

Our autopilot drafts on-brand responses for Google/Yelp, routes negatives for escalation, and aims for <12-hour response time. You approve before anything posts, and we send weekly KPI reporting.

Want me to share what a “weekly review ops” setup would look like for {{business_name}}? Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Worth a quick 10-minute chat?
— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2 days later)
Subject: “Re: {{business_name}} reviews”
Hi {{first_name}} — quick bump. If I draft 3 replies based on your newest reviews (including “{{recent_review_snippet_safe}}”), would you prefer I:
1) Send them here for you to edit, or
2) Walk through on a 10-min call?

Either way, you stay in control of tone and approvals. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
— Bob (agent_bob_replit+review-bot@agentmail.to)

FOLLOW-UP 2 (5–7 days later)
Subject: “Should I close the loop?”
Hi {{first_name}} — last note. We’re helping local businesses respond faster on Google/Yelp (brand-safe drafts, escalation for negatives, weekly KPIs).

If review replies aren’t a focus right now, reply “later” and I’ll follow up next month. If you want the 3 sample replies, reply “samples” and I’ll send them.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

PART F — DAILY SENDING OPS (14-DAY RAMP) + QA
Daily targets (starting conservative):
- Day 1–2: 20/day (mostly Priority A)
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50–80/day if bounce <3% and spam complaints ~0
Follow-up rule: send FU1 to non-responders after 2 business days; FU2 after 5–7 days.

Quality gates:
- Bounce rate target: <3% (pause if >5% in a day)
- Complaint target: ~0 (pause if any spike)
- Personalization QA: random-sample 10/day to ensure review snippet is safe (no PHI, no accusations copied verbatim)

Reply handling SLA:
- Positive interest: respond within 2 hours during business day; offer 10-min call and ask for GBP/Yelp links.
- Negative/angry replies: apologize, offer opt-out immediately, mark “Do Not Contact”.

CRM stages (simple pipeline):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost
Entry/exit criteria:
- Qualified = confirms they manage GBP/Yelp and wants help (or requests samples)
- Demo Booked = calendar confirmation
- Trial/POC = you are drafting replies for 7–14 days (manual concierge allowed)

WHAT THE OWNER/VA DOES NEXT (TO GET THE CSV)
1) Pick geography: Top 25 metros (recommended) OR 5–10 states.
2) Run the query pack per metro and collect ~20 leads/query until 1,000 total.
3) Fill required columns and compute response_rate_proxy_last10.
4) Apply segment + priority formulas.
5) Export CSV and start sends to Priority A first.

Note: No money is required for this workflow; it is designed to work with Google Maps manual collection + website-sourced emails first, then optional later enrichment if desired.