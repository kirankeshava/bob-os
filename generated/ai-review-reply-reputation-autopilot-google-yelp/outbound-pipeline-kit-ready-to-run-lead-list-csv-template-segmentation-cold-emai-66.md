# Outbound Pipeline Kit (Ready-to-Run): Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:41:14.119Z

---

BUSINESS REFERENCE (use in outreach)
Product/site proof URL (include in emails when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
From name suggestion: “{YourName} – Reputation Autopilot”


1) LEAD LIST CSV TEMPLATE (copy/paste headers)
lead_id,vertical,segment,priority_tier,business_name,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_count,last_10_owner_responses_count,recent_review_snippet_safe,personalization_hook,response_gap_note,contact_name,contact_role_guess,email_1,email_2,linkedin_url,agency_flag,notes,source_query,date_added


2) DATA DICTIONARY (what each column means + how to fill)
- lead_id: unique ID (e.g., DENT-AUS-0001)
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating: star rating shown in Google Business Profile
- review_count: total Google reviews count
- last_review_date: date of most recent review (from GBP)
- last_10_reviews_count: usually 10 (or fewer if low volume)
- last_10_owner_responses_count: count how many of the last ~10 reviews have an owner response
- response_rate_proxy: =last_10_owner_responses_count / last_10_reviews_count (as %)
- recent_review_snippet_safe: 8–20 words; either paraphrase or short quote. Avoid medical details, accusations, or any sensitive personal info. Prefer paraphrase.
- personalization_hook: 1 sentence about what you saw (“noticed a new review came in last week and there wasn’t a response yet.”)
- response_gap_note: “No replies in last 10” or “2/10 replied”
- segment: computed (Not Responding / Low Rating / High Volume)
- priority_tier: computed (A/B/C)
- contact info: pull from website Contact/About, or GBP “Website” → staff/owner page; if not found, use generic emails from site (info@, office@, hello@).


3) SEGMENTATION RULES (use these exact rules)
Compute response_rate_proxy:
- If last_10_reviews_count is 0, set response_rate_proxy = 0
- Else response_rate_proxy = last_10_owner_responses_count / last_10_reviews_count

Segment assignment:
A) Not Responding
- response_rate_proxy <= 0.20 OR last_10_owner_responses_count = 0
B) Low Rating
- google_rating < 4.2
C) High Volume
- review_count >= 200 OR last_review_date within last 14 days

Priority tiering:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only (and not in A/B)

Suggested Google Sheets formulas (assumes columns):
- response_rate_proxy: =IF([@[last_10_reviews_count]]=0,0,[@[last_10_owner_responses_count]]/[@[last_10_reviews_count]])
- High Volume flag: =OR([@[review_count]]>=200, TODAY()-DATEVALUE([@[last_review_date]])<=14)
- Not Responding flag: =OR([@[response_rate_proxy]]<=0.2, [@[last_10_owner_responses_count]]=0)
- Low Rating flag: =[@[google_rating]]<4.2
- priority_tier: =IF(OR(AND([@[Not Responding flag]],[@[High Volume flag]]),AND([@[Low Rating flag]],[@[High Volume flag]])),"A",IF(OR([@[Not Responding flag]],[@[Low Rating flag]]),"B",IF([@[High Volume flag]],"C","")))


4) ZERO-COST LEAD LIST BUILD SOP (repeatable, 500–1,000 rows)
Goal: build a clean list with review context that makes emails feel genuinely personalized.

Step 1 — Choose geography scope (owner decision)
- Option 1: Top 25 US metros (fast scaling, broad)
- Option 2: 5–10 states (tighter ops, better local relevance)
- Option 3: US-wide (harder QA)

Step 2 — Google Maps query pack (examples; replicate for each metro)
Dentist:
- “cosmetic dentist {city}”
- “family dentist {city}”
- “dental implants {city}”
Med spa:
- “med spa {city}”
- “botox {city}”
- “laser hair removal {city}”
HVAC/Plumbing:
- “HVAC company {city}”
- “air conditioning repair {city}”
- “plumber {city}”
Agencies:
- “dental marketing agency {city/state}”
- “med spa marketing agency {city/state}”
- “HVAC marketing agency {city/state}”

Step 3 — For each prospect, capture core GBP fields
From the Google Business Profile panel:
- Business name, phone, website, rating, review count
- Open reviews → sort by newest → capture last_review_date

Step 4 — Compute response proxy quickly
Open the most recent reviews (aim last 10): count how many have an “Owner response.”
- last_10_reviews_count = number you checked (up to 10)
- last_10_owner_responses_count = count of owner replies
- response_gap_note = “0/10 replied” etc.

Step 5 — Capture a SAFE personalization snippet
Rules:
- Prefer paraphrase: “A recent review mentioned scheduling and wait time.”
- If quoting, keep it short (8–12 words), omit names/PII, avoid health claims.
- Never mention the reviewer’s name.

Step 6 — Find an email (free methods)
- Website footer/contact page: info@, hello@, office@, appointments@, admin@
- About/team page: owner/manager name + role
- If none: use contact form note in “notes” and send to generic email if available.

Step 7 — QA before sending
Reject leads if:
- Franchise directory listings without local decision maker
- No website AND no email path
- Category mismatch (e.g., “dental lab” instead of dental practice)
- Review count extremely low (<15) unless rating is low (<4.0) and recent review exists

Production targets (manual, realistic):
- 60–100 leads/day per person if you only collect GBP fields
- 30–60 leads/day per person if you also collect response proxy + email


5) COLD EMAIL SEQUENCE PACK (3 steps) — DIRECT-TO-BUSINESS
Personalization tokens:
{{business_name}}, {{city}}, {{vertical_specific_service}}, {{recent_review_snippet_safe}}, {{response_gap_note}}, {{google_rating}}, {{review_count}}, {{last_review_date}}, {{site_url}}

General positioning points:
- “brand-safe replies”
- “respond within 12 hours”
- “you approve before posting (or auto-post rules)”
- “escalate negatives to manager immediately”
- “weekly reputation KPI report”

A) INITIAL EMAIL — Not Responding (variant)
Subject options:
1) Quick fix for un-replied reviews at {{business_name}}
2) Saw {{response_gap_note}} on Google — can we help?
3) Review replies in 12 hours (you approve)

Body:
Hi {{contact_name_or_owner}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_note}} recently. One of the newest reviews mentioned: “{{recent_review_snippet_safe}}”.

We run a simple Reputation Autopilot that drafts brand-safe responses for Google Business Profile (and Yelp), escalates negative reviews to you, and sends a weekly KPI summary. Typical workflow: we draft within 12 hours → you approve (or set rules) → we post.

If helpful, I can send 2–3 draft replies for your most recent reviews so you can see the tone. The product overview is here: {{site_url}}

Worth a quick 10-minute call this week to see if it fits?
— {YourName}


B) INITIAL EMAIL — Low Rating (variant)
Subject options:
1) Quick plan to lift a {{google_rating}} rating (without incentives)
2) Reputation triage for {{business_name}}
3) Can I draft replies to the toughest reviews?

Body:
Hi {{contact_name_or_owner}},

Noticed {{business_name}} is at {{google_rating}} on Google. A recent review said: “{{recent_review_snippet_safe}}”.

When ratings dip, speed + consistency of responses usually matters (and owners rarely have time). Our Reputation Autopilot drafts brand-safe replies, flags reviews that need a private follow-up, and gives you a weekly KPI snapshot so you can see trendlines.

I can draft responses for your last 3 negative reviews (free) and you decide if it’s the tone you want. Details: {{site_url}}

Open to a quick call, or should I just send the drafts by email?
— {YourName}


C) INITIAL EMAIL — High Volume (variant)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Review reply ops for {{review_count}}+ reviews
3) Faster replies without adding staff

Body:
Hi {{contact_name_or_owner}},

{{business_name}} has strong review activity ({{review_count}} total; latest on {{last_review_date}}). Many teams hit the same wall: reviews keep coming, responses lag, and the tone varies.

We set up a Reputation Autopilot that drafts on-brand replies for Google/Yelp, routes negatives for quick escalation, and reports weekly KPIs. You can approve everything, or set auto-post rules for 5-star reviews.

If you want, I’ll send a sample batch of 5 draft replies based on your newest reviews. Overview: {{site_url}}

Should I send those, or is there someone else who owns reputation/reviews?
— {YourName}


FOLLOW-UP #1 (Day 2–3)
Subject: Re: {{business_name}} review replies

Hi {{contact_name_or_owner}},

Quick bump — if you share which tone you prefer (warm/short/clinical), I’ll send 2–3 draft replies for recent reviews at {{business_name}}.

This is the overview link again: {{site_url}}

Is this a priority right now, or should I check back next month?
— {YourName}


FOLLOW-UP #2 (Day 6–8) — break-up + value
Subject: Should I close the loop?

Hi {{contact_name_or_owner}},

I don’t want to be a pest. Last note from me.

If review replies are already handled, no worries. If they’re not, we can:
- respond within 12 hours (brand-safe drafts)
- escalate negative reviews immediately
- send weekly reputation KPIs

Want me to send a few draft replies for {{business_name}} so you can judge quality? {{site_url}}
— {YourName}


6) AGENCY / RESELLER EMAIL (for marketing agencies)
Subject options:
1) Add “review reply + escalation” to your client retainers
2) White-label reputation replies for local clients
3) Quick win for your dental/med spa/HVAC accounts

Body:
Hi {{agency_owner_name}},

If you manage local business marketing, you’ve probably seen this gap: clients get reviews, but no one consistently responds—especially the negative ones.

We built a lightweight AI Review Reply & Reputation Autopilot for Google Business Profile and Yelp: brand-safe drafts, approval workflow, negative-review escalation, and weekly KPI reporting. It’s designed to be easy to resell/white-label as an add-on to existing retainers.

Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If I send you a 1-page reseller outline + sample outputs, would you consider piloting it on 3 clients?
— {YourName}


7) DAILY SENDING OPS CHECKLIST + CRM STAGES (lightweight)
Daily (Mon–Fri):
1) Build/QA 20–50 new leads (or more if list already built)
2) Send new emails (start 20/day/inbox and ramp) + schedule follow-ups
3) Reply SLA: same day for any positive replies; <4 hours for “interested”
4) Tag replies: Interested / Not now / Unsubscribe / Wrong person
5) Update CRM stage + next step

14-day ramp (per inbox):
- Days 1–2: 10/day
- Days 3–4: 15/day
- Days 5–6: 20/day
- Days 7–8: 25/day
- Days 9–10: 30/day
- Days 11–14: 35–40/day (only if bounces <3% and complaints ~0)

Bounce/complaint guardrails:
- If hard bounce rate > 3% in any 48-hour window: pause new sends, verify emails, tighten QA
- If any spam complaints: reduce volume and simplify copy (remove links for 48 hours except the site URL if needed)

CRM stages (minimum viable):
- Prospect (lead collected, not sent)
- Sent (initial sent)
- Engaged (opened/clicked/replied)
- Qualified (has GBP/Yelp access path + pain confirmed)
- Demo Booked
- Trial / Pilot
- Paid
- Lost (w/ reason)


8) WHAT I NEED FROM OWNER TO EXECUTE NEXT (non-spend)
- Choose geography scope for first 500–1,000 leads (top metros vs states vs US-wide).
- Confirm your outbound “from” identity (name + a reply-to email address you will use).

Once you confirm geography, you can start producing the CSV immediately using the SOP above, and the email copy is ready to send with only light token personalization.