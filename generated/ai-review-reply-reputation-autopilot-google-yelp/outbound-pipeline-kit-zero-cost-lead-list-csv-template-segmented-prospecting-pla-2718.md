# Outbound Pipeline Kit (Zero-Cost): Lead List CSV Template + Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:57:53.249Z

---

Business / legitimacy link to include in outreach:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) LEAD LIST CSV TEMPLATE (copy/paste headers)
Required columns (CSV headers):
business_name,vertical,service_type,city,state,zip,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

Segmentation rules (apply in Sheets):
- response_rate_proxy_last10 = (# owner/brand responses among the most recent 10 reviews) / 10
- segment:
  - not_responding if response_rate_proxy_last10 <= 0.2 OR (0 responses in last 10)
  - low_rating if google_rating < 4.2
  - high_volume if review_count >= 200 OR (today - last_review_date <= 14 days)
  - If multiple apply, concatenate tags: e.g., "low_rating;high_volume"

Priority scoring (simple, operational):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only
Routing:
- Priority A: send Day 1, follow-ups Day 3 and Day 7
- Priority B: send Day 2, follow-ups Day 5 and Day 10
- Priority C: send Day 4, follow-up Day 11 only

Data collection (zero-cost) sources:
- Google Maps/GBP: rating, review_count, last_review_date, last_review_snippet, response_rate_proxy_last10
- Website/contact page: email(s) (look for owner/manager, office manager, practice manager, general manager)
- If no email on site: use contact form URL as notes; still email general inbox if found on footer (info@, hello@, contact@)

2) SEGMENTED PROSPECTING PLAN (Verticals + Agencies)
Chosen verticals (high review velocity + high LTV + clear reputation sensitivity):
A) Dental practices (including cosmetic / family / orthodontics)
B) Med spas / aesthetic clinics
C) HVAC + plumbing (home services)
Agency lane (bulk deal potential):
- Local marketing agencies specializing in dentists/med spas/home services; offer reseller/white-label and multi-location rollups.

High-intent filters (what to prioritize):
- Review_count >= 80 (enough volume to feel pain)
- last_review_date within 30 days (active pipeline)
- not_responding (<=20% response rate in last 10) OR rating < 4.2

How to build 500–1,000 leads with $0 spend (repeatable):
- Choose geography: (a) Top 25 US metros OR (b) 5–10 target states.
- For each metro/state, run Google Maps searches using these query patterns:
  - Dental: “dentist”, “cosmetic dentist”, “orthodontist”, “dental implants”
  - Med spa: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
  - Home services: “HVAC”, “air conditioning repair”, “plumber”, “emergency plumber”
- Per query: collect top ~20–40 relevant independent businesses (avoid national chains unless franchise owner-operated with local decision maker).
- Production target: 30–40 leads/day/person with full review proxy + snippet + website email.

Segments and messaging angles:
- not_responding: “you’re leaving reviews unanswered; we respond within 12 hours; brand-safe; you approve.”
- low_rating: “fast, calm responses + escalation; reduce damage; show future customers you care.”
- high_volume: “ops/throughput: consistent replies without staff time; weekly KPI report.”

3) COLD EMAIL COPY (3-step sequences)

Personalization tokens:
{{first_name}} {{business_name}} {{city}} {{service_type}} {{google_rating}} {{review_count}} {{last_review_snippet}} {{response_gap_fact}} {{my_name}} {{site_url}} {{contact_email}}

Compliance/safety note: if quoting a review, keep it short and factual; when in doubt, paraphrase (avoid sensitive medical/dental details).

3A) UNIVERSAL SUBJECT LINES (pick 1)
- Quick help with Google reviews for {{business_name}}
- Noticed a review response gap ({{city}})
- 12-hour review replies (you approve)
- {{business_name}} — quick win on reviews

3B) SEQUENCE — NOT RESPONDING (local business)

Email 1 (Day 1)
Subject: Noticed a review response gap for {{business_name}}
Hi {{first_name}} — I was looking at {{business_name}} on Google and saw {{response_gap_fact}}.

One recent review said: “{{last_review_snippet}}”

We built a simple “AI Review Reply & Reputation Autopilot” that drafts brand-safe replies for Google/Yelp, escalates negatives, and sends a weekly KPI report. You approve before anything posts.

For the first 7 days, we’ll do it free: reply to new reviews within 12 hours and clean up any backlog you want.

Worth a 10-minute call to see if it fits? You can also check us here: {{site_url}}

– {{my_name}}
{{contact_email}}

Follow-up 1 (Day 3)
Subject: Re: reviews for {{business_name}}
Hi {{first_name}} — quick nudge. If you want, I can send 2–3 draft replies for your most recent reviews (no signup). If you like the tone, we can run the 7-day free trial.

Should I send drafts here, or is there a better email for whoever handles reviews?
– {{my_name}}

Follow-up 2 (Day 7)
Subject: Last touch — review replies
If review replies aren’t a priority, no worries. If they are, the offer stands: 7 days free, replies within 12 hours, and you approve before posting.

Reply with “drafts” and I’ll send a few example responses for {{business_name}}.
– {{my_name}}

3C) SEQUENCE — LOW RATING (local business)

Email 1
Subject: Quick idea to protect {{business_name}}’s rating
Hi {{first_name}} — I noticed {{business_name}} is at {{google_rating}} on Google. When ratings dip, fast, calm owner responses can prevent further damage (and help future customers feel safe booking).

One recent review mentioned: “{{last_review_snippet}}”

We help by drafting brand-safe replies, escalating anything sensitive, and tracking weekly reputation KPIs. You approve before anything posts.

Can we run this free for 7 days and send you draft responses for any 1–2 star reviews?
– {{my_name}} | {{site_url}}

Follow-up 1
Subject: Re: rating protection for {{business_name}}
If you paste a link to the 1–2 review(s) you want handled first, I’ll send suggested responses same-day. If you like them, we can take over new reviews for the week (free).
– {{my_name}}

Follow-up 2
Subject: Close the loop?
Should I (a) send draft responses for the last few negative reviews, or (b) close this out?
– {{my_name}}

3D) SEQUENCE — HIGH VOLUME (local business)

Email 1
Subject: Handling review volume without staff time
Hi {{first_name}} — {{business_name}} has {{review_count}} reviews and recent activity. When volume is high, consistency matters, but it’s hard to keep up.

We run an autopilot that drafts replies for Google/Yelp, flags negatives instantly, and emails a weekly KPI summary. You approve before posting.

Want to try it free for 7 days? If yes, who should approve responses (you or a manager)?
– {{my_name}} | {{site_url}}

Follow-up 1
Subject: Re: review volume
I can send 5 example drafts in your brand voice (friendly/professional) for recent reviews. If the tone is right, we can start the 7-day free trial.
– {{my_name}}

Follow-up 2
Subject: Ok to send sample drafts?
Reply “yes” and I’ll send sample drafts for {{business_name}} today.
– {{my_name}}

3E) AGENCY / RESELLER VERSION (initial)
Subject: White-label review replies for your local clients?
Hi {{first_name}} — do you manage Google Business Profiles for local clients?

We built an “AI Review Reply & Reputation Autopilot” that drafts brand-safe review responses (Google/Yelp), escalates negatives, and sends weekly reputation KPIs. Agencies use it to keep response rates high without staffing.

Happy to set you up with a 7-day free pilot on 1–2 client locations. You can position it under your brand; we’ll just deliver drafts + reporting.

Open to a quick call this week? Details: {{site_url}}
– {{my_name}} ({{contact_email}})

4) OUTBOUND OPS CHECKLIST (DAILY) + 14-DAY RAMP

Tooling (week 1: $0):
- Send from an existing inbox you already own, or use a free provider inbox if available. Do not buy domains/inboxes in week 1.
- Track manually in Google Sheets CRM.

Deliverability safeguards:
- Day 1–3: 20–30 cold emails/day max per inbox
- Day 4–7: 40–60/day max
- Day 8–14: 80–100/day max (only if bounce rate <3% and spam complaints = 0)
- No attachments. Keep links to 1 (your site). Plain text style.

Daily workflow (60–90 minutes):
1) Pull 30–50 Priority A/B leads.
2) Add 1 personalization line: last review snippet + response gap fact.
3) Send Email 1.
4) Update CRM stage.
5) Process replies within 4 business hours:
   - Positive: book 10-min call; request GBP/Yelp access method; start free trial.
   - Neutral: offer to send 3 sample drafts.
   - Negative: apologize, confirm removal, mark Lost.

Weekly workflow:
- QA 10% of newly added leads for accuracy.
- KPI: sent, delivered, replies, positive replies, calls booked, trials started.

5) CRM STAGES (Google Sheet columns)
Stages (single-select):
- Prospect (not yet contacted)
- Sent (E1 sent)
- Follow-up 1 Sent
- Follow-up 2 Sent
- Replied — Positive
- Replied — Neutral
- Replied — Not now
- Qualified
- Call Booked
- Trial Active (Free 7-day)
- Converted (Paid later)
- Lost

Entry/exit criteria:
- Qualified: confirmed they control GBP/Yelp or can introduce the person who does.
- Trial Active: they agree to receive drafts (and optionally provide brand tone guidelines).

6) WHAT I NEED FROM CEO (NO SPEND)
Pick the initial geography scope so the query pack is locked:
A) Top 25 US metros (broad, fast scaling)
B) 5–10 states (tighter, easier personalization)
C) US-wide (harder QA, more variance)
Once chosen, we can start list production immediately and begin sending the same day to Priority A leads.
