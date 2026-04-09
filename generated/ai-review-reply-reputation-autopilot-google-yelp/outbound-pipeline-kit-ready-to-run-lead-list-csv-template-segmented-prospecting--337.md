# Outbound Pipeline Kit (Ready-to-Run): Lead List CSV Template + Segmented Prospecting Plan + 3-Step Cold Emails + Ops Checklist (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:04:55.673Z

---

Business:
AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Reply-to / contact email (include in emails): agent_bob_replit+review-bot@agentmail.to

========================================
A) LEAD LIST CSV TEMPLATE (copy headers into Google Sheets)
========================================
Use one row per location (GBP). Create columns exactly as written:

1. prospect_id
2. date_added
3. vertical (Dental | Med Spa | HVAC/Plumbing)
4. business_name
5. website
6. google_maps_url
7. address
8. city
9. state
10. zip
11. phone
12. google_rating
13. review_count
14. last_review_date
15. last_review_excerpt (<=240 chars; quote or paraphrase safely)
16. owner_response_last10 (count of owner responses in last 10 reviews)
17. response_rate_proxy (formula)
18. segment_not_responding (Y/N)
19. segment_low_rating (Y/N)
20. segment_high_volume (Y/N)
21. priority_tier (A/B/C)
22. contact_name
23. contact_role (Owner | Office Manager | Practice Manager | GM | Marketing)
24. email_1
25. email_1_source (Website | GBP | Facebook | LinkedIn | Other)
26. email_2
27. email_2_source
28. personalization_hook (1 sentence referencing review gap/velocity)
29. template_variant (NR | LR | HV)
30. notes

Formulas (Google Sheets):
- response_rate_proxy (col 17). Put in Q2:
=IFERROR(P2/10,"0")
Where P2 = owner_response_last10.

- segment_not_responding (col 18). In R2:
=IF(Q2<=0.2,"Y","N")

- segment_low_rating (col 19). In S2:
=IF(L2<4.2,"Y","N")

- segment_high_volume (col 20). In T2:
=IF(OR(M2>=200, TODAY()-N2<=14),"Y","N")
(Ensure last_review_date is a real date.)

- priority_tier (col 21). In U2:
=IFS(AND(R2="Y",T2="Y"),"A",AND(S2="Y",T2="Y"),"A",OR(R2="Y",S2="Y"),"B",T2="Y","C",TRUE,"C")

- template_variant (col 29). In AC2:
=IFS(R2="Y","NR",S2="Y","LR",T2="Y","HV",TRUE,"HV")

QA rules (reject rows):
- No website AND no email found after 3 minutes of checking (unless it’s Priority A and phone outreach is planned)
- Franchise/corporate listings where owner decision-maker is unlikely reachable
- Wrong category (e.g., “Dental laboratory” instead of “Dentist”; “Spa” that’s a resort)

========================================
B) SEGMENTED PROSPECTING PLAN (500–1,000 leads)
========================================
Goal: build 500–1,000 prospects across 3 verticals, prioritizing high review velocity and poor owner response.

Recommended split for first batch (example 900 total):
- Dental: 300
- Med Spa/Aesthetics: 300
- HVAC/Plumbing: 300

Within each vertical, target mix:
- Priority A: 30% (not responding + high volume OR low rating + high volume)
- Priority B: 50% (not responding OR low rating)
- Priority C: 20% (high volume only)

Geo approach (choose one and stick to it for list consistency):
Option 1 (fast): Top 25 US metros (pull 20–40 leads per vertical per metro)
Option 2 (focused): 5–10 states where you can sell “local expertise”
Option 3 (broad): US-wide, but QA is harder

Google Maps query strings (copy/paste into Google Maps search bar; swap city/state):
DENTAL:
- “dentist in {City, ST}”
- “cosmetic dentist in {City, ST}”
- “family dentistry in {City, ST}”
MED SPA:
- “med spa in {City, ST}”
- “aesthetic clinic in {City, ST}”
- “botox in {City, ST}”
HVAC/PLUMBING:
- “hvac company in {City, ST}”
- “air conditioning repair in {City, ST}”
- “plumber in {City, ST}”

High-intent filtering while browsing results:
- Review count >= 80 OR last review within 30 days
- Look for visible “Reviews” tab showing many customer comments
- Prefer independents (single location) first

How to capture last_review_date + response-rate proxy quickly:
- Open the business > Reviews
- Sort by “Most recent”
- Record: last review date
- Scan last 10 reviews: count how many have an owner response (owner_response_last10)
- Copy a short excerpt from the most recent review (or paraphrase) for personalization

========================================
C) 3-STEP COLD EMAIL SEQUENCES (with segment variants)
========================================
Rules:
- Keep personalization to 1 line max
- Mention legitimacy URL once (not in every follow-up)
- Offer: “responses within 12 hours, brand-safe, you approve”
- CTA: 10–15 minute call or “reply YES and we’ll send 2 sample replies”

--- UNIVERSAL TOKENS ---
{{FirstName}} {{BusinessName}} {{City}} {{State}} {{RecentReviewSnippet}} {{ResponseGap}} {{Rating}} {{ReviewCount}} {{Vertical}}


1) INITIAL EMAIL — NOT RESPONDING (Variant NR)
Subject options:
- Quick fix for your Google reviews
- Noticed a response gap at {{BusinessName}}
- 12-hour review replies (you approve)

Body:
Hi {{FirstName}} — I was looking at {{BusinessName}}’s recent Google reviews and saw: “{{RecentReviewSnippet}}”.

It looks like there’s a response gap on a number of recent reviews (customers are talking, but the business isn’t always replying). We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp and can post them after your approval.

What we do:
- Reply to new reviews within 12 hours
- Escalate negative reviews to you immediately
- Send weekly KPI reporting (rating trend, response rate, themes)

If you want, reply “YES” and I’ll send 2 sample replies in your brand voice for recent reviews.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to


2) INITIAL EMAIL — LOW RATING (Variant LR)
Subject options:
- Quick help with reputation recovery
- Fixing review replies at {{BusinessName}}
- Triage for negative reviews

Body:
Hi {{FirstName}} — I saw {{BusinessName}}’s Google rating is around {{Rating}} with {{ReviewCount}} reviews.

When ratings dip, the fastest lever is consistent, calm, policy-safe responses that (1) show accountability and (2) move upset customers into a private resolution path.

Our AI Review Reply & Reputation Autopilot drafts responses for Google/Yelp in your voice, flags high-risk reviews for escalation, and sends weekly KPIs so you can see whether sentiment is improving.

Open to a 10-minute call this week? If you reply with 1–2 sentences on your preferred tone (friendly / formal / clinical), I’ll send sample replies to 2 recent reviews.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to


3) INITIAL EMAIL — HIGH VOLUME (Variant HV)
Subject options:
- Keeping up with review volume
- Review replies at scale (without risk)
- Can I take review replies off your plate?

Body:
Hi {{FirstName}} — {{BusinessName}} gets a strong volume of Google reviews ({{ReviewCount}} total). That kind of velocity is great for demand, but replying consistently is a time sink.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp:
- Drafts responses in a brand-safe style
- You approve (or we auto-post within guardrails)
- Escalates negatives instantly
- Weekly KPI report: response rate, rating trend, themes

If I send 2 sample replies based on your latest reviews, would you want them to sound more “warm and personal” or “short and professional”?

— Bob
agent_bob_replit+review-bot@agentmail.to


FOLLOW-UP #1 (send ~2 business days later; keep short)
Subject: Re: {{BusinessName}} reviews

Hi {{FirstName}} — quick follow-up.

If you paste a link to your Google reviews (or your GBP link), I’ll reply with 2 sample responses you can use immediately.

Should I send the samples here?
— Bob
agent_bob_replit+review-bot@agentmail.to


FOLLOW-UP #2 (send ~5–7 business days later; breakup)
Subject: close the loop?

Hi {{FirstName}} — should I close the loop on this?

If review replies aren’t a priority right now, no worries. If they are, reply “samples” and I’ll send 2 brand-safe replies tailored to {{BusinessName}}.

— Bob
agent_bob_replit+review-bot@agentmail.to


AGENCY/RESELLER VERSION (Initial)
Subject options:
- White-label review reply autopilot?
- Add-on for your local clients

Hi {{FirstName}} — do you support local clients (dental/med spa/home services) where Google/Yelp reviews directly impact calls and bookings?

We built an AI Review Reply & Reputation Autopilot you can resell:
- Draft & post brand-safe review responses
- Escalation workflow for negative reviews
- Weekly KPI reporting per client
- Approval-first mode so your team stays in control

If you tell me your client mix and average retainer, I’ll propose a simple white-label package and margin.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

========================================
D) OUTBOUND OPS CHECKLIST + CRM STAGES (FREE-FIRST)
========================================
Daily activity targets (starting point, per inbox):
- Day 1–2: 20 new/day
- Day 3–4: 30 new/day
- Day 5–7: 40 new/day
- Week 2: 50–70 new/day (only if bounce <3% and replies healthy)

Minimum daily cadence (per rep):
- 50–100 new emails/day (once warmed)
- 20 follow-ups/day (from sequences)
- 10 “manual personalizations” for Priority A accounts (better hooks)

List hygiene:
- Verify formatting of emails (basic regex)
- No attachments
- Plain-text first
- Remove roles@, info@ for Priority A only if no better option exists

Bounce/complaint thresholds:
- Hard bounce >3%: stop sending, audit list source, reduce volume
- Spam complaints >0.1%: pause, remove tracking links, simplify copy

Reply handling SLA:
- Reply to all positive replies within 2 business hours
- Negative replies: apologize, ask best person to speak with, opt-out immediately if requested
- Interested: propose 2 time slots + ask for GBP link

CRM stages (simple):
1. Prospect (in sheet, not yet sent)
2. Sent (E1 sent)
3. Engaged (opened/replied/clicked — whichever tracking you use)
4. Replied — Positive
5. Replied — Neutral/Question
6. Replied — Negative
7. Qualified (has GBP + pain confirmed)
8. Demo Booked
9. Trial Started
10. Paid
11. Lost (reason)

Weekly KPI tracking:
- Delivery rate, bounce %, reply %, positive reply %
- Meetings booked
- Trials started
- Paid conversions
- Segment performance (NR vs LR vs HV)

========================================
NEXT REQUIRED INPUT (to execute lead build)
========================================
Choose the geography scope for the first 500–1,000 leads:
A) Top 25 US metros
B) 5–10 target states
C) US-wide

Once chosen, the query pack above becomes the standard and the list can be built consistently in 2–5 days (manual/VA) without paid tools.
