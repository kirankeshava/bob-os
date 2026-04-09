# Outbound Pipeline Kit (Week 1, $0 spend): 500-Lead CSV + Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:56:05.056Z

---

Below is the execution-ready outbound kit you can run with $0 spend.

1) LEAD LIST CSV (500 leads)
File name: review-reply-autopilot_leads_500_top25metros.csv
Columns:
- business_name
- vertical (dentist | med_spa | hvac_plumbing)
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- personalization_snippet (latest review excerpt or paraphrase)
- owner_or_manager_name (if known)
- role_guess
- email_1
- email_2
- notes

How segmentation is assigned (apply to each row):
- Not Responding: response_rate_proxy_last10 <= 20% OR 0 owner replies in last 10 reviews
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within 14 days
- Mixed: qualifies for 2+ segments

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed with low_rating
- Priority B: not_responding OR low_rating (alone)
- Priority C: high_volume only

Email variant routing:
- Not Responding → “response gap / speed + brand-safe approvals” angle
- Low Rating → “escalation + recovery workflow” angle
- High Volume → “ops + throughput / within 12 hours” angle

Top 25 metros used for pulls:
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

2) COLD EMAIL COPY (3-step sequences)
From name: Bob
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to
Legitimacy link to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Personalization tokens:
- {{first_name}} (if unknown, use: “Hi there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (quote 1 sentence max OR paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner reply on the last few reviews”)

A) INITIAL EMAIL — Not Responding (local business)
Subject options:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a reply gap on recent reviews
3) Can I help you respond within 12 hours?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews and saw: “{{recent_review_snippet}}”. {{response_gap}}.

We run a simple Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies to Google + Yelp, negative-review escalation, and a weekly KPI recap. You can approve replies before anything posts.

Offer (free this week): we’ll draft responses for your next 10 reviews and set up a 7-day trial workflow (respond within 12 hours).

Worth a quick 10 minutes to see if this would help? If yes, reply with “yes” and I’ll send 2 sample replies in your tone.

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up #1 (2–3 days later):
Subject: Re: replies for {{business_name}}
Hi {{first_name}} — quick follow-up.

If it helps, I can send 2 example replies based on your latest review(s) so you can see the voice/tone. You still approve before anything posts.

Should I send those over?
– Bob

Follow-up #2 (4–6 days later):
Subject: Last try — review replies
Hi {{first_name}},

Totally fine if now’s not the time. If you want, I’ll do a no-setup “before/after”:
- 3 draft replies in your brand voice
- 1 negative-review escalation template
- 1-page weekly KPI snapshot format

Reply “before/after” and I’ll send it.
– Bob

B) INITIAL EMAIL — Low Rating (local business)
Subject options:
1) Quick win to lift rating (without asking for reviews)
2) Repairing review damage for {{business_name}}
3) A simple escalation workflow for bad reviews

Body:
Hi {{first_name}},

Saw a recent review for {{business_name}} that mentioned “{{recent_review_snippet}}”. When responses are delayed (or missing), prospects often assume the issue is unresolved.

We help local teams respond fast and safely: draft brand-safe replies for Google/Yelp, flag negatives for escalation, and send a weekly reputation KPI report. You approve replies before posting.

Free this week: I’ll draft replies to your 5 most recent negative/neutral reviews and include an escalation checklist your front desk/manager can use.

Want me to send the drafts?
– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

C) INITIAL EMAIL — High Volume (local business)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Review replies in under 12 hours
3) Quick system for Google/Yelp replies

Body:
Hi {{first_name}},

{{business_name}} gets a steady stream of reviews. Most owners I talk to want to respond quickly but it becomes another daily task.

We run a lightweight autopilot: brand-safe reply drafts to Google/Yelp, escalation for negative reviews, and a weekly KPI report (response time, sentiment, rating trend). You approve replies before anything posts.

Free this week: we’ll handle your next 10 reviews (drafts within 12 hours).

Open to a 10-minute walkthrough?
– Bob

D) AGENCY / RESELLER VERSION (initial)
Subject options:
1) White-label review replies for your clients
2) Add “review management” in 48 hours
3) Quick reseller lane (Google + Yelp)

Body:
Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), review replies are an easy retention lever—yet most agencies don’t want the operational burden.

We provide a brand-safe Review Reply & Reputation Autopilot (Google Business Profile + Yelp): fast reply drafts, negative-review escalation, and weekly KPI reporting. You can resell it, and your clients can approve before posting.

Want a free trial on 1 client this week? Reply “trial” and I’ll send the workflow + sample replies.

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3) DAILY SENDING OPS (14-day ramp, $0 tools)
List prep (daily):
- Verify website present (avoid businesses with no site unless phone outreach)
- Ensure personalization snippet is 1 sentence max; avoid sensitive details; paraphrase if needed
- Add response_gap line only if you verified last 10 reviews show low/no owner replies

Sending ramp (per inbox):
- Day 1–2: 20/day
- Day 3–4: 35/day
- Day 5–7: 50/day
- Day 8–10: 75/day
- Day 11–14: 100/day

Daily cadence (target):
- 50 new sends/day (start)
- 25 follow-ups/day
- Reply SLA: respond within 2 hours during business day

Bounce/complaint rules:
- If hard bounce >3% in a day: stop, clean list, remove domain pattern, continue next day at -30%
- If spam complaints >0.1%: pause and rewrite copy + reduce volume

CRM stages (simple):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial (7 days free) → Converted/Paid (week 2+) → Lost (reason)

KPI targets (Week 1):
- Open proxy (if tracked manually via replies): n/a; focus on
- Reply rate: 3–8%
- Positive reply rate: 1–3%
- Demos booked: 1–2 per 200 sends

Note: Week 1 is free launch only; do not collect payment yet. Goal is demos + trials fast.

If you want, next cycle I will generate the agency/reseller lead CSV (150–250) so you can pursue higher-LTV multi-location/portfolio deals in parallel.