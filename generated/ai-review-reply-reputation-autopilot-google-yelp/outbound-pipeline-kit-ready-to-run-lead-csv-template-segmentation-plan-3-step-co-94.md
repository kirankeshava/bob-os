# Outbound Pipeline Kit (Ready-to-Run): Lead CSV Template + Segmentation Plan + 3-Step Cold Emails + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:59:04.265Z

---

BUSINESS LEGITIMACY LINK (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) LEAD LIST CSV TEMPLATE (copy these headers into Google Sheets → export CSV)
lead_id,vertical,segment,priority_tier,business_name,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,has_owner_response_last10,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,personalization_hook,notes,source_query

Segmentation rules (apply during collection):
- Not Responding: response_rate_proxy_last10 <= 0.20 OR has_owner_response_last10 = No
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within last 14 days
Priority tiers:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only

How to compute response_rate_proxy_last10 (manual, $0): open Google reviews → scan most recent 10 → count how many have an “Owner response”. proxy = responses/10.

B) SEGMENTED PROSPECTING PLAN (WHO/WHAT TO PULL FIRST)
Verticals:
1) Dentists (high LTV, reputation-sensitive, heavy local search)
2) Med spas / aesthetic clinics (high margin, review-driven demand)
3) HVAC/Plumbing (high urgency leads; fast review velocity; high competition)

Target segments and angle:
- Not Responding: “you’re getting reviews but leaving revenue on the table; we reply in 12 hours; brand-safe; approval workflow.”
- Low Rating: “recover reputation + defuse negatives; escalation workflow; consistent tone; weekly KPIs.”
- High Volume: “ops throughput: never miss a review; response SLAs; reports.”

Geo strategy (owner chooses one):
- Top 25 metros: best density + manageable personalization
- 5–10 states: tight territory focus (useful if you have local network)
- US-wide: only if you have automation + higher sending volume

C) COLD EMAILS (3-STEP) — DIRECT-TO-LOCAL (BASE + TOKENS)
Tokens to personalize:
- {{first_name}} (if known)
- {{business_name}}
- {{city}}
- {{recent_review_excerpt}} (short, 8–20 words; OK to paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner reply on several recent reviews”)
- {{vertical_specific_benefit}}
- Include legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

EMAIL 1 (choose variant by segment)
Subject line options (pick 1):
1) Quick question about {{business_name}} reviews
2) Noticed your recent Google reviews
3) Helping {{vertical}} teams respond faster

Body (Not Responding variant):
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_excerpt}}. {{response_gap}}.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, escalates negatives, and sends weekly KPI summaries. The goal is simple: respond within ~12 hours without you living in the review tab.

You can approve replies before anything posts.

If I send 2–3 draft replies based on your most recent reviews, would you like to see them?

(Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)
— {{your_name}}
{{your_email}}

Body (Low Rating variant):
Hi {{first_name}} — saw a recent review for {{business_name}} mentioning “{{recent_review_excerpt}}”. When ratings dip even a little, it can directly impact calls and bookings.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: on-brand drafts, escalation for negative reviews, and a weekly report (rating trend, response rate, negative themes).

Would it be helpful if I put together a 7-day “catch-up” plan (which reviews to respond to first + draft responses) for {{business_name}}?

(Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)
— {{your_name}}
{{your_email}}

Body (High Volume variant):
Hi {{first_name}} — {{business_name}} gets a lot of Google review activity (nice work). I noticed a recent one: “{{recent_review_excerpt}}”.

At higher volume, the main risk is falling behind. We built an AI Review Reply & Reputation Autopilot that keeps replies consistent, routes negatives to the right person, and reports weekly reputation KPIs.

Open to a quick 10-min chat to see if we can help you hit a 12-hour response SLA?

(Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)
— {{your_name}}
{{your_email}}

FOLLOW-UP 1 (2 days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — circling back. If you share your Google Business Profile link, I’ll send:
1) 2 draft replies (brand-safe)
2) which reviews to prioritize first
3) a simple weekly KPI snapshot format

Would you prefer I send that here, or to a manager who handles reviews?
— {{your_name}} | {{your_email}} | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP 2 (5–7 days later)
Subject: Should I close the loop?
Hi {{first_name}} — should I close the loop on this, or is review response something you want to improve this month?

If it’s a “yes,” reply with:
- “Google” or “Yelp” (or both)
- who should approve replies
and I’ll send a quick suggested workflow.
— {{your_name}} | {{your_email}} | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

D) AGENCY / RESELLER EMAIL (MARKETING AGENCIES)
Subject options:
1) Add review-response as a reseller line item
2) White-label review replies for your clients
3) Quick partner idea (Google/Yelp replies)

Email 1:
Hi {{first_name}} — do you manage local SEO/reputation for clients in {{vertical}} (dentists/med spas/home services)?

We built an AI Review Reply & Reputation Autopilot that drafts/post replies for Google/Yelp, escalates negatives, and sends weekly KPI reporting. Agencies resell it as “review response management” without adding headcount.

If you tell me your client count, I can suggest a simple packaging + margin model.

(Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)
— {{your_name}}
{{your_email}}

E) DAILY SENDING OPS + CRM STAGES (CHECKLIST)
Day 0 (prep):
- Create a master Sheet with the CSV headers above.
- Build 50–100 new leads/day (manual Google Maps) until you hit 500–1,000.
- QA sample every 25 leads: correct vertical/category, website present, recent reviews visible, no obvious franchise/call center.

14-day sending ramp (per inbox):
- Days 1–3: 20 new/day + follow-ups; plain-text only.
- Days 4–7: 35 new/day.
- Days 8–14: 50 new/day if bounces <3% and spam complaints = 0.
Rules:
- Stop and clean list if hard bounce rate >5% in a day.
- SLA: reply to positive replies within 2 hours during business day; negative/angry replies within 30 minutes.

CRM stages (minimum viable):
Prospect (lead collected) → Sent (Email 1) → Engaged (reply/open indicated) → Qualified (has GBP/Yelp + pain confirmed) → Demo Booked → Trial/POC → Paid → Lost (with reason)

KPIs to track weekly:
- Deliverability: bounce %, spam complaint count
- Funnel: reply %, positive reply %, demos booked, trials started, close rate
- Efficiency: leads built/day, emails sent/day, follow-ups completed/day

NEXT OWNER ACTIONS (to unblock list production):
1) Choose geography scope (Top 25 metros vs 5–10 states vs US-wide).
2) Decide list build method: $0 manual (recommended to start) or paid scraper (faster, requires approval).
3) Start with 200 leads + Priority A only, send Day-1 ramp volume, iterate based on replies.
