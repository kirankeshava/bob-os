# Outbound Pipeline Kit (Execution-Ready): Top-25 Metro Lead List Build + Segmentation + Cold Email Sequences + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:07:18.820Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply email (use as sender/reply-to): agent_bob_replit+review-bot@agentmail.to

========================
A) TARGET GEO (TOP 25 US METROS)
========================
Use these metros to quickly reach 500–1,000 prospects with high review volume:
1 New York, NY  2 Los Angeles, CA  3 Chicago, IL  4 Houston, TX  5 Phoenix, AZ
6 Philadelphia, PA  7 San Antonio, TX  8 San Diego, CA  9 Dallas, TX  10 San Jose, CA
11 Austin, TX  12 Jacksonville, FL  13 Fort Worth, TX  14 Columbus, OH  15 Charlotte, NC
16 San Francisco, CA  17 Indianapolis, IN  18 Seattle, WA  19 Denver, CO  20 Washington, DC
21 Boston, MA  22 Nashville, TN  23 Detroit, MI  24 Oklahoma City, OK  25 Portland, OR

========================
B) GOOGLE MAPS QUERY PACK (BY VERTICAL)
========================
Goal: consistent categories + fewer irrelevant results.
Search in Google Maps: “<keyword> in <city>” then open each result.

1) DENTISTS
Primary queries (use both):
- “dentist in {CITY}”
- “cosmetic dentist in {CITY}”
Optional add-ons:
- “family dentist in {CITY}”
Exclusions during QA:
- dental supply, dental lab only, dental school clinics (unless clearly a local practice)

2) MED SPAS / AESTHETICS
Primary queries:
- “med spa in {CITY}”
- “aesthetic clinic in {CITY}”
Optional add-ons:
- “botox in {CITY}”
Exclusions:
- beauty salon only, nail salon, massage only (unless it’s clearly a med spa with injectables)

3) HVAC / PLUMBING (HOME SERVICES)
Primary queries:
- “HVAC company in {CITY}”
- “plumber in {CITY}”
Optional add-ons:
- “air conditioning repair in {CITY}”
Exclusions:
- parts distributors only, big-box retailers, national franchise location pages without local contact

4) AGENCY / RESELLER LANE
Goal: 50–150 agencies that manage local businesses.
Queries:
- “digital marketing agency dentists {CITY}”
- “marketing agency med spa {CITY}”
- “reputation management agency {CITY}”

========================
C) LEAD LIST CSV TEMPLATE (COPY/PASTE HEADERS)
========================
Required columns (CSV headers):
prospect_id,business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_response_count,response_rate_proxy,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,yelp_url,notes

How to fill key fields:
- google_rating, review_count: from Google Maps listing.
- last_review_date: open “Reviews”, sort by “Newest”, capture the date of the newest review.
- last_10_response_count: count how many of the last 10 reviews have an “Owner response”.
- response_rate_proxy = last_10_response_count / 10 (as %).
- personalization_snippet: 8–20 words from the newest review OR paraphrase (safer) like: “Saw a recent review praising your front desk + quick scheduling.”

Segmentation rules:
- Not responding: response_rate_proxy <= 0.2 (<=20%) OR 0 owner responses in last 10.
- Low rating: google_rating < 4.2.
- High volume: review_count >= 200 OR last_review_date within 14 days.
If multiple apply, keep the strongest primary segment for messaging, and note others in notes.

Priority scoring:
- Priority A: (Not responding AND High volume) OR (Low rating AND High volume)
- Priority B: Not responding OR Low rating
- Priority C: High volume only

========================
D) DAILY PRODUCTION TARGETS (TO REACH 1,000 FAST)
========================
Lead building throughput (human/VA):
- 100 leads/day if only core fields (no emails)
- 40–60 leads/day if also finding emails
Recommended split:
- Day 1–2: Build 250 leads (no email enrichment) + segment
- Day 3–5: Add emails for Priority A/B first (enrich 150–250)
Free enrichment sources (start here):
- Website “Contact” page
- “About / Team” page
- Google Business Profile website link
- LinkedIn company page / owner name search

========================
E) COLD EMAIL SEQUENCE (3 TOUCHES) — WITH SEGMENT VARIANTS
========================
Sending note:
- Always include the legitimacy URL.
- Always use agent_bob_replit+review-bot@agentmail.to as reply-to.
- Personalize the first line using personalization_snippet and/or response_rate_proxy.

TOKENS:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{personalization_snippet}} {{google_rating}} {{review_count}} {{response_rate_proxy}}

------------------------
E1) EMAIL #1 (INITIAL)
------------------------
Subject options (pick 1):
1) Quick help with {{business_name}}’s Google reviews
2) Noticed a review response gap for {{business_name}}
3) 12-hour review replies (you approve)

Body (BASE):
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and saw: “{{personalization_snippet}}”.

Many local businesses lose calls/appointments when reviews sit un-answered (especially the negative/neutral ones). We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives, and sends weekly KPI reports.

How it works:
- We draft responses within 12 hours
- You approve (or we can auto-post with guardrails)
- Negative reviews get flagged immediately for escalation

If you want, I can send 2–3 example replies in your brand voice based on your most recent reviews.

OK if I do that?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

Variant insert (choose ONE based on segment):
A) NOT RESPONDING angle (insert after first paragraph):
I noticed responses are showing up on about {{response_rate_proxy}} of recent reviews — fixing that quickly tends to lift conversion without changing anything else.

B) LOW RATING angle:
If you’re around {{google_rating}} stars, consistent owner responses + fast escalation can stop the “pile-on” effect and recover rating momentum.

C) HIGH VOLUME angle:
With {{review_count}}+ reviews, the main challenge is throughput — we handle the daily volume so your team doesn’t have to.

D) AGENCY angle (if sending to an agency):
If you manage multiple locations/clients, this can be a white-label add-on: fast replies, approvals, and weekly reporting per client.

------------------------
E2) EMAIL #2 (FOLLOW-UP #1, +2 days)
------------------------
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I draft 3 responses (1 glowing, 1 neutral, 1 negative) using your recent review themes, would you like them sent here for approval?

If you prefer, just reply with:
1) “Approve-first” (you approve every reply)
2) “Auto-post” (we post with a strict policy + escalation)

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

------------------------
E3) EMAIL #3 (FOLLOW-UP #2, +4–6 days)
------------------------
Subject: Should I close the loop?

Hi {{first_name}},

I don’t want to be a pest — should I close the loop on helping {{business_name}} with review replies?

If timing is the issue, I can send a 1-page summary of what we’d change (response speed, negative escalation, weekly KPIs) and you can revisit later.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

========================
F) OUTBOUND OPS CHECKLIST (DAILY) + 14-DAY RAMP
========================
List hygiene (every batch):
- Remove duplicates, missing websites (unless strong GBP + phone), obvious franchises, wrong category.
- Spot-check 10 leads per 100 for category accuracy + valid contact.

14-day sending ramp (per inbox):
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
Rules:
- If bounce rate > 3% in a day: pause and clean list.
- If spam complaints: stop immediately and reduce volume + adjust copy.
- Reply SLA: respond to any positive/neutral reply within 2 hours business time.

Daily workflow (60–90 minutes):
1) Pull 30–100 Priority A/B prospects
2) Add 1 personalization line + choose segment variant
3) Send Email #1
4) Log in CRM
5) Process replies (book call, send examples, or disqualify)
6) Schedule follow-ups (E2/E3)

========================
G) SIMPLE CRM PIPELINE (SHEETS/NOTION OK)
========================
Stages + entry/exit:
1) Prospect (qualified lead captured)
2) Sent (Email #1 sent)
3) Replied (any reply)
4) Qualified (pain confirmed: low rating / no time / high volume)
5) Demo Booked (calendar scheduled)
6) Trial (drafted sample replies sent OR connected to GBP/Yelp)
7) Paid (invoice/subscription active)
8) Lost (not a fit / no response after sequence)
Fields to track: last_touch_date, next_touch_date, segment, priority, outcome, notes.

========================
H) WHAT’S NEEDED NEXT TO FINISH THE 500–1,000 CSV
========================
A human/VA needs to run the query pack above, fill the template fields, and export the CSV. Start with 250 leads (no emails) to validate segmentation, then enrich emails for Priority A/B first so you can begin sending while the list is still being built.
