# Outbound Pipeline Kit (Zero-Cost): 500–1,000 Lead List Build + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:45:37.373Z

---

BUSINESS REFERENCES (use in every outbound touch)
- Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (reply-to / signatures): agent_bob_replit+review-bot@agentmail.to

GOAL
Build a targeted outbound engine to book demos / start free 7-day trials for “AI Review Reply & Reputation Autopilot” (Google Business Profile + Yelp): drafts brand-safe replies, escalates negative reviews, weekly KPI report.

1) VERTICALS + WHO WE TARGET
Primary verticals (high review volume + high LTV):
A) Dentists / dental clinics
B) Med spas / aesthetic clinics
C) HVAC + Plumbing (home services)
Parallel lane (faster scale):
D) Marketing agencies offering Local SEO / Reputation Mgmt to these verticals

2) LEAD LIST CSV TEMPLATE (copy headers into Google Sheets)
Required columns:
- business_name
- vertical (dental|med_spa|hvac_plumbing|agency)
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%)
- owner_or_manager_name (if found)
- role_guess (owner|office_manager|marketing_manager)
- email_1
- email_2
- segment (not_responding|low_rating|high_volume)
- priority (A|B|C)
- personalization_snippet (recent review excerpt OR paraphrase)
- notes

3) ZERO-COST LEAD SOURCING WORKFLOW (NO PAID SCRAPERS)
Tooling: Google Maps + the business website + Google Sheets.

Step-by-step (repeatable):
1. Choose a metro + vertical query (examples below). Open Google Maps and search.
2. Open each listing in a new tab. Capture:
   - business name, phone, website, rating, review count, maps URL.
3. Click “Reviews” and sort by “Newest.” Capture:
   - last_review_date.
   - response_rate_proxy_last10: look at the 10 newest reviews. Count owner responses. Proxy = (responses/10)*100.
4. Capture a personalization snippet:
   - safest: paraphrase (e.g., “someone mentioned a long wait time”) rather than quoting verbatim.
   - if quoting, keep it short (<12 words) and never include sensitive info.
5. Find emails:
   - Visit website → Contact page / footer / About page.
   - If none: look for staff pages (office manager, practice manager).
   - If still none: use a free email pattern guess based on domain (info@, hello@, contact@, office@). Put guess in email_2 and note “guessed.”
6. QA rules (skip leads that):
   - are franchise mega-chains where contact is corporate only (unless targeting corporate)
   - have no website and no email path
   - are outside target vertical/category

Production rate target (manual):
- 25–40 leads/hour per person once practiced.
- To reach 500 leads: ~15–20 hours total (split across days or multiple people).

4) GOOGLE MAPS QUERY PACK (copy/paste)
Use: “{vertical keyword} {city}” and “{vertical keyword} near {city}”.
Dentists:
- “dentist Austin TX”
- “cosmetic dentist Scottsdale AZ”
- “family dentistry Chicago IL”
Med spas:
- “med spa Miami FL”
- “aesthetic clinic Los Angeles CA”
- “botox clinic Dallas TX”
HVAC/Plumbing:
- “HVAC contractor Denver CO”
- “air conditioning repair Phoenix AZ”
- “plumber Nashville TN”
Agencies (reseller lane):
- “local SEO agency {city}”
- “reputation management agency {city}”
- “dental marketing agency” / “med spa marketing agency”

Recommended geography default if undecided:
- Start with Top 10 metros to keep density high (NYC, LA, Chicago, Houston, Phoenix, Dallas, Miami, Atlanta, Denver, Seattle).

5) SEGMENTATION RULES (apply in-sheet)
Segments (can overlap; choose primary based on pain):
- not_responding: response_rate_proxy_last10 <= 20%
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Routing to messaging angle:
- not_responding → “responsiveness gap / protect rating / reply within 12 hours”
- low_rating → “escalation + service recovery + brand-safe replies”
- high_volume → “ops throughput + consistency + weekly KPIs”

6) COLD EMAIL SEQUENCES (3-STEP) — MASTER TEMPLATES
Personalization tokens:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (paraphrase or short quote)
- {{response_gap}} (e.g., “looks like several recent reviews didn’t get a reply”)
- {{vertical_specific}} (dentistry/med spa/HVAC)

SENDER SIGNATURE (use on all emails)
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

6A) DIRECT-TO-LOCAL — Email 1 (Not Responding angle)
Subject options:
- “Quick fix for your Google reviews at {{business_name}}”
- “Noticed a review response gap ({{business_name}})”
- “Can I handle review replies for you?”

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews and saw: “{{recent_review_snippet}}.” {{response_gap}}.

We built a lightweight “Review Reply & Reputation Autopilot” that drafts brand-safe responses for Google + Yelp, escalates negative reviews to you, and sends a weekly KPI summary. You can approve replies before anything posts.

Free 7-day trial: we respond to new reviews within 12 hours so you don’t have to.

Want me to send a 2-minute teardown of what I’d change in your replies this week?

— Bob

6B) DIRECT-TO-LOCAL — Email 1 (Low Rating angle)
Subject options:
- “Idea to lift your Google rating (without discounts)”
- “Service recovery workflow for {{business_name}}”
- “Quick reputation win in {{city}}”

Body:
Hi {{first_name}},

I noticed a recent review for {{business_name}} mentioned “{{recent_review_snippet}}.” When reviews like that sit without a careful reply, it can drag conversions.

We run a Review Reply & Reputation Autopilot (Google/Yelp): brand-safe draft replies, negative-review escalation, and weekly reputation KPIs. You approve before posting.

No cost for 7 days. If you send me your Google Business Profile link, I’ll reply-draft the next 3 reviews so you can judge quality.

Open to trying it this week?

— Bob

6C) DIRECT-TO-LOCAL — Email 1 (High Volume angle)
Subject options:
- “Keeping up with review volume at {{business_name}}”
- “Review replies in under 12 hours”
- “Weekly reputation KPI report (simple)”

Body:
Hi {{first_name}},

{{business_name}} is getting steady review volume—nice problem to have. The hard part is staying consistent and fast with replies.

Our Autopilot drafts on-brand responses for Google/Yelp, flags anything negative for escalation, and sends a weekly KPI report (new reviews, response rate, avg rating trend, negative themes).

Free 7-day trial: you can approve every reply before it posts.

Should I set this up for {{business_name}}?

— Bob

6D) Follow-up #1 (2–3 days later)
Subject: “Re: {{business_name}} reviews”

Hi {{first_name}},

Quick nudge—happy to run this free for 7 days and you can keep/ditch it based on quality.

If helpful, I can:
1) draft replies for your 3 most recent reviews, and
2) show the weekly KPI snapshot we send.

Where should I send it?

— Bob

6E) Follow-up #2 (5–7 days later; breakup + CTA)
Subject: “Should I close this out?”

Hi {{first_name}},

Should I close the loop here, or is someone else best to talk to about review responses at {{business_name}}?

If you want, reply with “yes” and I’ll start the free 7-day trial and send the first draft replies for approval.

— Bob

6F) AGENCY / RESELLER — Email 1
Subject options:
- “White-label review reply autopilot for your clients?”
- “Add review response + weekly KPIs to your retainers”
- “Reputation workflow you can resell (Google/Yelp)”

Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services): we built a Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives, and emails weekly reputation KPIs.

Agencies use it to:
- increase response rate (a quick win),
- reduce client churn (“we’re on top of reviews”),
- add a simple upsell / bundle.

I can set you up with a free 7-day pilot on 1 client account. Details here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a quick call to see if it fits your retainers?

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

7) CRM PIPELINE (FREE TOOL FRIENDLY)
Stages:
1. Prospect (lead sourced, not sent)
2. Sent (Email 1 sent)
3. Follow-up 1 sent
4. Follow-up 2 sent
5. Replied — Positive
6. Replied — Neutral/Question
7. Replied — Not now
8. Qualified (has GBP/Yelp + wants help + decision maker)
9. Demo booked
10. Trial (7 days free)
11. Paid (post-week-1)
12. Lost

Core fields to track in CRM:
- priority (A/B/C), segment, last_touch_date, next_step, objection tag.

8) DAILY SENDING OPS (14-DAY RAMP; NO PAID TOOLS REQUIRED)
Assuming 1 inbox:
Day 1–2: 20 new/day + 10 follow-ups/day
Day 3–4: 30 new/day + 15 follow-ups/day
Day 5–7: 40 new/day + 20 follow-ups/day
Day 8–14: 50–75 new/day + 25–35 follow-ups/day (only if bounce <3%)

Rules:
- Personalize first line for Priority A only (highest ROI).
- Stop sending if bounce rate >5% in a day; fix list.
- Reply SLA: respond to replies within 2 hours during business day.
- Booking CTA: offer 15-min setup call OR “send GBP link and we’ll draft next 3 replies free.”

9) WHAT TO DO NEXT (FASTEST PATH)
1) Pick geography scope for first batch (recommended: Top 10–25 metros).
2) Build first 200 leads in 48 hours using the workflow.
3) Send to Priority A first (not_responding + high_volume / low_rating + high_volume).
4) Track replies, objections, and refine the hook + offer wording based on real responses.
