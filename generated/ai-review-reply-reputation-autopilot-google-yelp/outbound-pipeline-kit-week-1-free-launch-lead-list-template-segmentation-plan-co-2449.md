# Outbound Pipeline Kit (Week 1 Free Launch): Lead List Template + Segmentation Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:27:13.325Z

---

BUSINESS INFO (include in outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
- Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts brand-safe replies, escalates negative reviews, weekly KPIs. Week 1 is FREE (7-day trial), no credit card.

1) VERTICALS + ICP (choose 2–3 lanes to start)
A. Dentists / Dental Clinics
- Why: high LTV patients, reputation-sensitive, high review impact.
- Buyer: Practice owner, office manager, practice administrator.
B. Med Spas / Aesthetic Clinics
- Why: review-driven bookings, high competition, high review velocity.
- Buyer: Owner, clinic manager, front desk lead.
C. HVAC / Plumbing (Home Services)
- Why: local SEO + reviews drive calls, high review velocity, after-hours ops.
- Buyer: Owner, GM/ops manager, office manager.
D. Agency/Reseller lane
- Targets: local SEO agencies, website/marketing agencies serving the above verticals.
- Buyer: Founder, account manager, SEO lead.

2) LEAD LIST CSV / GOOGLE SHEETS TEMPLATE (copy headers exactly)
Columns:
1. business_name
2. vertical (dentist|med_spa|hvac_plumbing|agency)
3. city_state
4. website
5. phone
6. google_maps_url
7. google_rating
8. review_count
9. last_review_date
10. response_rate_proxy_last10 (0-100%)
11. segment (not_responding|low_rating|high_volume|mixed)
12. priority (A|B|C)
13. contact_name (owner/manager if known)
14. role_guess
15. email_1
16. email_2
17. personalization_snippet (recent review excerpt OR paraphrase)
18. response_gap_note (e.g., “no owner replies in last 10 reviews”)
19. notes

Data dictionary + collection rules (zero-cost)
- google_rating/review_count/phone/website: from Google Business Profile panel.
- last_review_date: open reviews, sort by newest, capture date of latest review.
- response_rate_proxy_last10: check latest 10 reviews; count how many have an owner response. proxy = (responses/10)*100.
- personalization_snippet: 1–2 sentences from the latest review OR a paraphrase if it contains sensitive health info. Avoid quoting patient names; do not mention conditions/treatments. For home services, quoting is usually safe.

Segmentation rules (operational)
- not_responding: response_rate_proxy_last10 <= 20 OR 0 responses in last 10.
- low_rating: google_rating < 4.2.
- high_volume: review_count >= 200 OR last_review_date within last 14 days.
- mixed: when multiple apply (store most urgent in notes).

Priority scoring (routing)
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR (low_rating AND last_review_date <= 30 days)
- Priority B: not_responding only OR low_rating only
- Priority C: high_volume only (rating >=4.2 and responding OK)

3) GEO + QUERY PACK (Google Maps manual workflow)
Owner decision needed: pick one scope to start (recommended: Top 25 metros for speed).

Use these query patterns in Google Maps (replace {metro}):
Dentists:
- “dentist {metro}”
- “dental clinic {metro}”
- “cosmetic dentist {metro}”
Med spas:
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “laser hair removal {metro}”
HVAC/Plumbing:
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
Agency lane:
- “local SEO agency {metro}”
- “dental marketing agency {metro}”
- “med spa marketing {metro}”

QA filters (skip leads that waste sends)
- Skip: franchises with corporate review ops (unless clearly locally-owned), businesses without websites (optional), businesses with <20 reviews (lower urgency), businesses outside target vertical, listings with no recent reviews (last review > 180 days).

Production targets (list building)
- 50 leads/day per person is realistic with quality fields (rating, review count, last review date, response proxy, snippet).
- Plan: 10 days × 50/day = 500 leads (one person). Or 5 days × 100/day = 500 leads.

4) COLD EMAIL SEQUENCE (3 steps) — MASTER TEMPLATE
Rules:
- Keep under ~120 words.
- Always use a personalization hook: review snippet + response gap.
- CTA: “Want me to reply to 3 reviews free?” (low friction).
- Include legitimacy link and contact email.

4A) DIRECT-TO-LOCAL: Initial Email (Segment = NOT RESPONDING)
Subject options:
1) Quick review reply help for {Business Name}
2) Noticed a few reviews unanswered
3) {City} reviews — can I help?

Body:
Hi {FirstName/Team},

Saw a recent review for {Business Name}: “{recent_review_snippet}”. I also noticed you haven’t been able to reply to some recent reviews.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe replies drafted within 12 hours, negative reviews get escalated, and you can approve before posting.

If you want, I’ll draft replies to 3 recent reviews for free so you can judge quality.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to

— Bob

4B) DIRECT-TO-LOCAL: Initial Email (Segment = LOW RATING)
Subject options:
1) Quick fix for review responses at {Business Name}
2) Reputation help (no new software)
3) Idea to lift rating from {rating}

Body:
Hi {FirstName/Team},

I was looking at {Business Name}’s recent reviews and saw: “{recent_review_snippet}”. When negative reviews don’t get a thoughtful reply, it can keep hurting conversions.

We draft calm, brand-safe responses for Google/Yelp (within 12 hours), flag urgent reviews for escalation, and send a weekly KPI report. You approve before anything posts.

Open to a free 7-day trial? I’ll draft replies to 3 reviews first.

Link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4C) DIRECT-TO-LOCAL: Initial Email (Segment = HIGH VOLUME)
Subject options:
1) Keeping up with reviews at {Business Name}
2) Review volume is great — want faster replies?
3) 12-hour review replies for {City}

Body:
Hi {FirstName/Team},

{Business Name} gets a lot of reviews (nice). The only issue is it’s hard to respond consistently without someone owning it.

We run a Review Reply Autopilot for Google/Yelp: drafts ready in ~12 hours, brand-safe tone, escalates negatives, weekly KPI report. You can approve replies before posting.

Want me to draft a few replies based on your latest reviews this week (free)?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4D) FOLLOW-UP #1 (Day 2–3)
Subject: Re: {Business Name} reviews

Hi {FirstName/Team} — quick bump.

I can send 3 draft replies (including one for the most recent review: “{recent_review_snippet}”) so you can see tone/quality. No login needed to start; just approval workflow.

Should I send the drafts here, or to a different email?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

4E) FOLLOW-UP #2 (Day 5–7)
Subject: Close the loop?

Hi {FirstName/Team},

Last note — if reviews aren’t a priority right now, no worries. If you’d like, I’ll still draft 3 replies free so you have them ready to paste into Google/Yelp.

Worth sending those over?

— Bob
agent_bob_replit+review-bot@agentmail.to

5) AGENCY/RESELLER EMAIL (INITIAL)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for GBP/Yelp management
3) Quick win for your {vertical} accounts

Body:
Hi {FirstName},

If you manage Google Business Profile/Yelp for local clients: we built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies, escalates negative reviews, and sends weekly KPI reporting.

Agencies use it as a white-label add-on: faster response times, fewer client complaints, and a clean weekly report.

Want to test it free for 7 days on one account? I’ll also draft 10 replies from their latest reviews so you can evaluate quality.

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

6) DAILY SENDING OPS (Week 1: $0 tools)
Tooling (free):
- One inbox (AgentMail alias or Gmail you already have), Google Sheets CRM, manual sends (no tracking pixel in week 1).

14-day ramp (conservative, deliverability-safe)
Day 1: 10 new emails
Day 2: 15
Day 3: 20
Day 4: 25
Day 5: 30
Day 6: 35
Day 7: 40
Day 8: 45
Day 9: 50
Day 10–14: 60/day (only if bounce rate <3% and replies steady)

Daily checklist (60–90 minutes)
1) Build/QA 20–50 new leads (verify website + email format).
2) Personalize 10–30 Priority A first (insert snippet + response gap note).
3) Send new emails within the day cap.
4) Log every send in CRM sheet (date_sent, template, segment, priority).
5) Process replies twice/day. SLA: respond within 4 business hours.
6) Send follow-ups due today (FU1 at day 2–3; FU2 at day 5–7).
7) Track basic KPIs: sent/day, reply rate, positive reply rate, bounces.

Bounce/complaint thresholds
- If hard bounce >3% in a day: stop sending, audit list source and email formats.
- If anyone complains: immediately stop emailing that domain and tighten personalization.

7) CRM PIPELINE (Google Sheets columns)
Stages:
1) Prospect (lead captured)
2) Sent (initial sent)
3) Replied
4) Qualified (has GBP/Yelp, pain confirmed, decision maker)
5) Demo Booked
6) Trial Active (week-1 free)
7) Paid (post-week-1)
8) Lost (reason)

Qualification questions to use on replies
- “Do you manage replies in-house today? Who owns it?”
- “Do you want approval-before-posting or fully managed?”
- “Do you care about Yelp as well, or only Google?”
- “How many locations?”

8) NEXT ACTION REQUIRED FROM OWNER
Reply with one choice so we lock the query pack and start building 500–1,000 leads:
A) Top 25 US metros
B) 5–10 target states (list them)
C) US-wide (slower + noisier)

Once chosen, the list-building SOP above produces the CSV within days at $0 spend, and the email sequence + ops plan can start immediately.