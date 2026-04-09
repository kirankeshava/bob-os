# Outbound Machine (Ready-to-Run) — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:59:32.277Z

---

Business website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email: agent_bob_replit+review-bot@agentmail.to

1) TARGET VERTICALS + WHY
A) Dentists: high LTV, consistent review velocity, competitive local SEO.
B) Med spas/aesthetic clinics: very review-driven, high competition, sensitive brand voice.
C) HVAC/Plumbing: high inbound from Maps, urgent jobs tied to trust, frequent 1-star “no show / pricing” reviews.
D) Parallel lane: Local marketing agencies (resell/white-label; faster bulk deals).

2) SEGMENTATION + PRIORITY RUBRIC (USE ON EVERY LEAD)
Capture: rating, review_count, last_review_date, and response-rate proxy (owner responses in last 10 reviews).
Segments:
- NOT_RESPONDING: response_rate_proxy <= 20% OR 0 owner responses in last 10 reviews.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days.
Priority scoring (routing):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Template routing:
- NOT_RESPONDING → “response gap” angle + 12-hour SLA.
- LOW_RATING → “damage control + escalation” angle.
- HIGH_VOLUME → “throughput + approvals + consistency” angle.

3) GEO + QUERY PACK (LOCK AFTER OWNER CHOOSES GEO SCOPE)
Recommended starting geo: Top 25 US metros (fastest to build 500–1,000 with consistent demand).
For each metro (e.g., “Austin TX”, “Phoenix AZ”), run Google Maps queries below.
Dentists queries:
- “dentist {metro}”, “cosmetic dentist {metro}”, “pediatric dentist {metro}”, “orthodontist {metro}”
Med spa queries:
- “med spa {metro}”, “aesthetic clinic {metro}”, “botox {metro}”, “laser hair removal {metro}”
HVAC/Plumbing queries:
- “HVAC {metro}”, “air conditioning repair {metro}”, “plumber {metro}”, “water heater repair {metro}”
Agency lane queries:
- “dental marketing agency {metro/state}”, “med spa marketing agency {metro/state}”, “local SEO agency {metro}”

4) CSV TEMPLATE (HEADERS)
business_name,vertical,website,city_state,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_owner_responses,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

Data collection notes (zero-cost):
- google_rating/review_count: from Maps listing.
- last_review_date + response_rate_proxy: open Reviews → sort by newest → check last 10 reviews for owner replies.
- personalization_snippet: copy 6–20 words from the most recent review OR paraphrase safely (avoid health/financial sensitive info).
- emails: start with website contact page; if missing, use generic pattern (info@ / hello@) + LinkedIn/company pages when available.

5) COLD EMAIL SEQUENCES (3 STEPS) — INCLUDE WEBSITE + CONTACT
General sending rule: keep first email 70–130 words, plain text. Always include: “Not a fit? reply ‘no’ and I’ll close the loop.”

TOKENS YOU’LL PERSONALIZE
{{first_name}} (or “there”), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{vertical_specific_service}}

A) DENTIST — NOT RESPONDING (Priority A/B)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap at {{business_name}}
3) Re: recent patient review

Email 1:
Hi {{first_name}} — I was looking at {{business_name}} in {{city}} and saw a recent review mentioning “{{recent_review_snippet}}.” I also noticed {{response_gap_fact}} (looks like a lot of reviews don’t get a reply).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews, and sends a weekly KPI report. You can approve replies before anything posts.

If I send 3 draft replies in your tone (free), would you want to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Hi {{first_name}} — circling back. For dental practices, fast, consistent replies tend to lift call volume from Maps (patients compare “rating + responsiveness”).

Want me to send 3 drafts for your most recent reviews? You can keep them even if we don’t work together.

– Bob

Follow-up 2 (5–7 days later):
Last try, {{first_name}} — should I close the loop on {{business_name}}?
If review replies aren’t a priority, no worries. If they are, we can respond within 12 hours and escalate any 1–2 star review for your approval.

Reply with “drafts” and I’ll send examples.
– Bob

B) DENTIST — LOW RATING (Priority A/B)
Subject options:
1) Fixing 1–2 star reviews (without sounding scripted)
2) Helping {{business_name}} protect new patient calls
3) Reputation quick win

Email 1:
Hi {{first_name}} — I’m reaching out because Google reviews heavily impact dental bookings, and {{business_name}} is currently at {{google_rating}}.

We run an AI Review Reply & Reputation Autopilot: brand-safe replies, negative-review escalation, and weekly KPIs. The goal is to prevent “silent” negative reviews from shaping the story.

If you share 1 recent tough review, I’ll draft a calm, HIPAA-safe response in your tone. Want that?

– Bob
(links/signature as above)

C) DENTIST — HIGH VOLUME (Priority A/C)
Subject options:
1) Handling review volume at {{business_name}}
2) A lighter way to respond to every review
3) Review replies in your voice (with approvals)

Email 1:
Hi {{first_name}} — noticed {{business_name}} has {{review_count}}+ Google reviews and new ones coming in.

If replies are done ad hoc, it’s easy for tone to drift (or for great reviews to go unanswered). We draft replies in your voice, route negatives for approval, and can hit a “respond within 12 hours” SLA.

Open to a 10-minute look this week? I can show exactly how it would respond to your latest 3 reviews.

– Bob

D) MED SPA — NOT RESPONDING
Subject options:
1) Your reviews are great — but many are unanswered
2) Quick fix for Google/Yelp responsiveness
3) Re: recent client review

Email 1:
Hi {{first_name}} — I was looking at {{business_name}} and saw a recent review: “{{recent_review_snippet}}.” It also looks like {{response_gap_fact}}.

Med spa buyers are extremely review-driven, and quick replies help convert Maps traffic. Our autopilot drafts brand-safe responses (non-cringey, consistent tone), escalates negative reviews, and sends weekly reputation KPIs. You approve before posting.

Want me to send 3 drafts for your newest reviews?

– Bob
(links/signature)

E) HVAC/PLUMBING — NOT RESPONDING
Subject options:
1) Quick question about your Google reviews
2) Missed revenue from unanswered reviews
3) Re: “{{recent_review_snippet}}”

Email 1:
Hi {{first_name}} — I found {{business_name}} while searching for {{vertical_specific_service}} in {{city}}. A recent review said “{{recent_review_snippet}},” and I noticed {{response_gap_fact}}.

We help local service businesses respond fast (within 12 hours): draft replies in your voice, flag negatives immediately, and send a weekly KPI summary (rating trend, response rate, new review count). You can approve before anything posts.

If I send 3 ready-to-post drafts for your last reviews, would that be helpful?

– Bob
(links/signature)

F) AGENCY / RESELLER LANE — INITIAL
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on offer for dentists/med spas/home services
3) Quick reseller idea

Email 1:
Hi {{first_name}} — do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, escalates negative reviews, and sends weekly KPI reporting. It’s easy to resell as “reputation management” without adding headcount.

If I send a 1-page overview + pricing for agencies, who’s the right person?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (14-DAY RAMP) — QUICK SOP
Goal: reach 50–100/day safely per inbox once warmed; keep bounce < 3%, spam complaints < 0.1%.

Day 1–3:
- Send 10–15/day/inbox (mostly Priority A).
- Manual personalization required (review snippet + response gap fact).
- Track: sent, delivered, bounced, replies.

Day 4–7:
- Increase to 20–35/day/inbox.
- Start follow-up 1 for non-replies.
- Daily: remove bounces, fix domains/typos, pause if bounce > 5% in a day.

Day 8–14:
- Increase to 40–60/day/inbox if metrics clean.
- Add follow-up 2.
- Weekly: rotate subject lines, refresh segments, add 100–200 new leads.

Reply handling SLA (same day):
- Positive reply → book demo (send 2 time options).
- “Not now” → set follow-up in 30 days.
- “No” → mark Lost (Do Not Contact).

7) CRM PIPELINE STAGES (MINIMUM VIABLE)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost
Definitions:
- Qualified: confirms they manage GBP/Yelp and have review volume or pain (low rating / no time / inconsistent replies).
- Trial/Pilot: agrees to start with Google reviews first (Yelp optional), weekly report included.

8) DAILY ACTIVITY TARGETS (STARTING POINT)
- New sends: 50/day total (across all inboxes), ramp to 100/day.
- Follow-ups: 25/day.
- Personalizations: 50/day (each includes snippet + response gap fact).
- Agency lane: 10 targeted emails/day.

OWNER DECISION NEEDED TO START LIST BUILDING TODAY
Pick one for the first 500–1,000 leads:
A) Top 25 US metros (recommended)
B) 5–10 target states
C) US-wide (harder QA, more noise)
Once chosen, use Section 3 queries to produce the CSV using Section 4 headers and Section 2 segmentation.
