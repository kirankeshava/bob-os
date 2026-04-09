# Outbound Pipeline Kit — Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:51:30.331Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp). Drafts (and can post) brand-safe review replies, escalates negative reviews, and sends weekly KPI reporting.
Legitimacy URL (include in emails when useful): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email (include in footer/CTA): agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (2–3 lanes)
Lane A: Dentists / dental clinics (high LTV, reputation-sensitive, steady review flow)
Lane B: Med spas / aesthetics clinics (high LTV, reputation-sensitive, high competition)
Lane C: HVAC + plumbing (home services; high review velocity; fast conversion to booked jobs)
Parallel lane: Agencies (local SEO/reputation/marketing agencies serving these verticals)

2) REQUIRED LEAD FIELDS (CSV schema)
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, personalization_snippet, owner_or_manager_name, role_guess, email_1, email_2, notes

3) SEGMENTATION RULES (simple + actionable)
Compute response_rate_proxy_last10 = (# of business owner replies in last 10 reviews) / 10.
Segments:
A) NOT_RESPONDING: response_rate_proxy_last10 <= 0.2 OR 0/10 replies.
B) LOW_RATING: google_rating < 4.2 (tighten to <4.0 for harsher filter if list is huge).
C) HIGH_VOLUME: review_count >= 200 OR last_review_date within last 14 days.
Priority tiers (for send order):
Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
Priority B: NOT_RESPONDING OR LOW_RATING
Priority C: HIGH_VOLUME only
Routing to copy variant:
- NOT_RESPONDING → “response gap + speed/approval” angle
- LOW_RATING → “recovery + escalation + brand-safe” angle
- HIGH_VOLUME → “throughput/ops + consistency + weekly KPI reporting” angle

4) PERSONALIZATION RULES (safe + fast)
Personalization snippet source: latest review excerpt OR paraphrase.
Rules:
- Prefer paraphrase over direct quotes when the review mentions medical info, protected traits, or very specific circumstances.
- OK to reference generic issues: “wait time,” “communication,” “scheduling,” “technician professionalism.”
- If unsure, use: “I noticed a recent review mentioning {topic} …”

5) COLD EMAIL SEQUENCES (3-step). Use tokens:
{{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{vertical_specific_outcome}}, {{website_url}}, {{contact_email}}

5A) DENTAL — Initial (choose based on segment)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap on {{business_name}}
3) Simple way to protect your 5-star reputation

Email (NOT_RESPONDING / default):
Hi {{first_name}} —
I was looking at {{business_name}} in {{city}} and noticed a recent review about {{recent_review_snippet}}. It also looks like {{response_gap_fact}}.

We built an “AI Review Reply & Reputation Autopilot” for practices that don’t have time to reply consistently. We draft brand-safe responses within ~12 hours, escalate negatives, and send a weekly KPI recap. You can approve replies before anything posts.

If I send 2–3 sample replies for your most recent reviews, would you want to see them?

Website: {{website_url}}
— Bob
{{contact_email}}

Email (LOW_RATING variant):
Hi {{first_name}} —
Noticed {{business_name}} has a solid volume of Google feedback, but the rating is sitting around {{google_rating}} and a recent review mentioned {{recent_review_snippet}}.

We help practices recover reputation without risking off-brand replies: drafts in 12 hours, negative-review escalation, and weekly reporting (rating trend, response rate, issue tags). You approve before posting.

Open to a quick look if I send 2 sample “recovery” replies for your latest 1-star/2-star reviews?

{{website_url}}
— Bob
{{contact_email}}

5B) MED SPA — Initial
Subject options:
1) Review responses for {{business_name}}?
2) Protecting your rating in {{city}}
3) Quick fix for review response time

Email:
Hi {{first_name}} —
Saw a recent Google review for {{business_name}} that mentioned {{recent_review_snippet}}. It looks like {{response_gap_fact}}.

We run an AI review-reply autopilot built for clinics: brand-safe drafts fast (about 12 hours), negative-review escalation, and weekly reputation KPIs. You can approve responses before anything posts.

Want me to draft a couple replies for your newest reviews so you can judge the tone?

{{website_url}}
— Bob
{{contact_email}}

5C) HVAC/PLUMBING — Initial
Subject options:
1) Faster review replies = more booked jobs
2) Noticed your recent reviews
3) Quick question about {{business_name}} responses

Email:
Hi {{first_name}} —
I was checking {{business_name}} in {{city}} and saw a recent review referencing {{recent_review_snippet}}. It looks like {{response_gap_fact}}.

We help home-service teams respond consistently without pulling a tech or dispatcher off the phones: drafts within ~12 hours, escalates negative reviews, and sends weekly KPIs (rating trend + response rate).

If I send 3 sample replies for your most recent Google reviews, would that be useful?

{{website_url}}
— Bob
{{contact_email}}

6) FOLLOW-UPS (shared across verticals)
Follow-up #1 (2 days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — quick follow-up.
If I draft responses for the last 3 reviews on {{business_name}} (no commitment), do you want me to send them over for approval?
— Bob
{{contact_email}} | {{website_url}}

Follow-up #2 (5–7 days later)
Subject: Should I close the loop?
Hi {{first_name}} — should I close the loop here?
If review responses aren’t a priority, no worries. If they are, I can send sample replies + a simple weekly KPI report template so you can see what you’d get.
— Bob
{{contact_email}} | {{website_url}}

7) AGENCY / RESELLER OUTREACH (initial)
Subject options:
1) White-label review response ops for your clients
2) Add-on offer for your local SEO clients

Email:
Hi {{first_name}} —
Do you manage Google Business Profile / reputation for local clients (dentists, med spas, home services)?

We offer a lightweight “AI Review Reply & Reputation Autopilot”: brand-safe reply drafts in ~12 hours, negative-review escalation, and weekly reputation KPIs. It’s designed to be white-labeled or run as a done-for-you backend for agencies.

If I send details + a sample weekly KPI report, are you open to a 10-minute chat about a reseller setup?

{{website_url}}
— Bob
agent_bob_replit+review-bot@agentmail.to

8) DAILY SENDING OPS (deliverability-first)
Core rules:
- Start low, ramp slowly, prioritize reply rates over volume.
- Keep bounce rate < 3%; pause list/source if higher.
- Complaints: any spike → reduce volume + tighten targeting.
- Reply SLA: same day for positive/neutral replies; within 2 hours for “interested”.

14-day ramp (per inbox):
Days 1–3: 10–15/day (mostly initial emails)
Days 4–7: 20–30/day (add follow-up #1)
Days 8–10: 35–45/day (add follow-up #2)
Days 11–14: 50/day max (only if bounce/complaints are healthy)
If using multiple inboxes, multiply cautiously (do not scale until metrics are clean).

Daily checklist:
1) Pull today’s segment batch (Priority A first).
2) QA 10% sample: correct vertical, real local business, website present, recent reviews present.
3) Personalize first line using snippet + response gap.
4) Send.
5) Process replies twice/day: Interested → book call; Not now → set reminder; Wrong person → ask who handles GBP.
6) Log outcomes in CRM.

9) CRM PIPELINE STAGES (simple)
Prospect (new lead) → Sent (initial sent) → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost
Entry/exit criteria:
- Qualified: confirmed they own/manage GBP or reputation; pain acknowledged (time, consistency, rating).
- Lost: explicit no / invalid contact / repeated bounces.

10) NEXT DECISION (needed to produce the 500–1,000 lead CSV)
Pick initial geography scope:
A) Top 25 US metros (fastest to get volume + consistent categories)
B) 5–10 target states (better focus if you can serve specific regions)
C) US-wide (more noise; requires stricter QA)
Once chosen, the lead build can start immediately using Google Maps + the schema above, then we segment into Priority A/B/C and begin day-1 sending.