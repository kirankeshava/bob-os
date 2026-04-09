# Outbound Machine (Ready-to-Run): Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:56:30.196Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (run 2 lanes in parallel)
A) Direct-to-local (high intent):
- Dental practices
- Med spas / aesthetic clinics
- HVAC / plumbers (home services)
B) Channel lane (bulk deals):
- Marketing agencies managing reputation/SEO/PPC for the above verticals

2) SEGMENTS + PRIORITY SCORING (apply to every prospect)
Collect: Google rating, review count, last review date, and Response-Rate Proxy (RRP) = (# owner responses among last 10 reviews) / 10.

Segments:
- Not Responding: RRP <= 0.2 OR 0 replies in last 10
- Low Rating: rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within 14 days

Priority:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only

Message routing (what angle to use):
- Not Responding → “response gap → lost revenue + trust; we respond within 12 hours; you approve.”
- Low Rating → “damage control + escalation; draft empathetic replies; notify you instantly; weekly KPI report.”
- High Volume → “ops throughput; consistent brand voice; reduce staff time; weekly reporting.”

Personalization tokens to capture (safe + fast):
- {{business_name}}, {{city}}, {{service_type}}
- {{recent_review_snippet}} (1 sentence; or paraphrase)
- {{response_gap}} e.g., “looks like several recent reviews didn’t get a reply”

3) COLD EMAIL SEQUENCE PACK (3 steps)
Guidelines:
- Keep to ~80–130 words.
- Use 1 personalization hook only.
- One CTA only.
- Always include proof URL + contact email.

3.1 DENTAL — Segment Variant A: NOT RESPONDING
Subject options:
1) Quick idea for {{business_name}} reviews
2) Noticed a review response gap
3) 12-hour review replies (you approve)

Email 1:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent note: “{{recent_review_snippet}}.” It also looks like a few recent reviews haven’t gotten a response.

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies to Google/Yelp, 12-hour turnaround, and you can approve before anything posts. Negative reviews get escalated immediately.

Open to a 10-minute call to see if this would save your team time and lift conversions from search?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reach me: agent_bob_replit+review-bot@agentmail.to

— Bob

Follow-up 1 (2–3 days later):
Subject: Re: {{business_name}} review replies
Hi {{first_name}},

Worth a quick look? When practices reply consistently, prospects see it as “attentive + trustworthy.”

If you send me your Google link, I’ll draft 3 on-brand replies for your most recent reviews (free), and you can decide if it’s useful.

— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later):
Subject: Should I close the loop?
Hi {{first_name}},

Should I close the loop on this? If review replies aren’t a priority right now, no worries.

If you want, I can set up a lightweight autopilot: draft replies within 12 hours, escalate negatives, and send a weekly KPI snapshot.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

3.2 DENTAL — Segment Variant B: LOW RATING
Subject options:
1) Improving {{business_name}}’s rating trend
2) Quick win for reputation this month
3) Drafting replies to tough reviews

Email 1:
Hi {{first_name}},

I noticed {{business_name}}’s Google rating is around {{google_rating}}. A recent review said: “{{recent_review_snippet}}.”

We help practices respond calmly and consistently: we draft brand-safe replies for Google/Yelp, escalate negative reviews to you immediately, and provide weekly reputation KPIs so you can see if sentiment is improving.

Would it be helpful if I drafted responses to the 3 most recent critical reviews for your approval?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Follow-ups: same as above, but replace angle with “de-escalation + consistency + weekly trend.”

3.3 DENTAL — Segment Variant C: HIGH VOLUME
Subject options:
1) Handling high review volume at {{business_name}}
2) Weekly review KPIs + fast replies
3) Review response workflow

Email 1:
Hi {{first_name}},

{{business_name}} has a strong amount of Google feedback ({{review_count}}+). That volume is great, but replying consistently becomes a workflow problem.

Our autopilot drafts on-brand replies for Google/Yelp within 12 hours, routes negative reviews to you instantly, and sends a weekly KPI report (new reviews, response rate, rating trend).

Open to a quick call to see if this fits your front desk’s workload?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

3.4 MED SPA — Segment Variant A: NOT RESPONDING
Subject options:
1) Quick fix for {{business_name}} reviews
2) Review replies (12 hours, you approve)
3) Noticed a few unreplied reviews

Email 1:
Hi {{first_name}},

I was checking {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}.” It looks like a few recent reviews didn’t receive a reply.

We run an AI Review Reply & Reputation Autopilot: brand-safe draft responses to Google/Yelp, 12-hour turnaround, approval before posting, and instant escalation for negative feedback.

Want me to draft 3 replies for your latest reviews so you can see the tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

(Med spa Low Rating + High Volume variants: same structure; emphasize “brand voice + compliance-safe + de-escalation.”)

3.5 HVAC/PLUMBING — Segment Variant A: NOT RESPONDING
Subject options:
1) Quick idea for {{business_name}} reviews
2) More calls from better review replies
3) Fast replies to Google/Yelp

Email 1:
Hi {{first_name}},

Saw a recent Google review for {{business_name}}: “{{recent_review_snippet}}.” It also looks like some recent reviews haven’t been answered.

We help home service companies reply fast (within 12 hours): brand-safe drafts for Google/Yelp, you approve before posting, negatives get escalated immediately, and you get a weekly KPI report (new reviews, response rate, rating trend).

Open to a quick 10-minute call this week?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

4) AGENCY / RESELLER EMAIL (single best opener)
Subject options:
1) White-label review response autopilot?
2) Add-on for your local clients (easy)
3) Quick partnership idea

Email 1:
Hi {{first_name}},

Do you manage Google Business Profiles for local clients (dentists/med spas/home services)? We built a Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negatives, and sends weekly KPI reporting.

It’s simple to resell: your team stays the face, we handle the drafting + workflow, and clients can approve before posting.

Worth a 15-minute chat to see if this could be an add-on for a few of your accounts?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

5) DAILY SENDING OPS (14-day ramp + guardrails)
Targets (per inbox):
- Day 1–2: 15–20 new/day
- Day 3–4: 25 new/day
- Day 5–7: 35 new/day
- Week 2: 40–60 new/day (only if bounce <3% and complaints ~0)

Daily checklist:
1) List QA sample (10 leads/day): correct category, local business (not franchise HQ), website present, review data captured.
2) Personalization fill: add {{recent_review_snippet}} OR {{response_gap}} (one only).
3) Send new emails first, then follow-ups.
4) Reply SLA: respond to positive replies within 1 business hour; book call within 24 hours.
5) Stop rules: if bounce >5% in any day, pause and clean list; if spam complaints occur, reduce volume and adjust copy.

Weekly checklist:
- Pull performance: delivered, open (if available), reply rate, positive rate, meetings booked.
- Refresh list: add 100–200 new leads/week.
- Iterate copy by segment (keep winners; cut losers).

6) CRM PIPELINE (stages + entry/exit criteria)
Stages:
- Prospect (has required fields + segment + priority)
- Sent (Email 1 sent)
- Engaged (reply OR explicit interest)
- Qualified (has Google/Yelp presence + confirms pain: time/consistency/negatives)
- Demo Booked
- Trial / Pilot
- Paid
- Lost (reason tagged: timing, in-house, no budget, wrong contact)

Qualification questions (fast):
- Who owns review responses today?
- Do you want replies posted automatically or approval-first?
- Any brand/compliance constraints?
- How many locations?

7) MINIMUM LEAD LIST CSV HEADERS (for 500–1,000 build)
Required:
- business_name, vertical, city_state, website, phone, google_maps_url
- google_rating, review_count, last_review_date
- response_rate_proxy (0–1)
- segment (not_responding/low_rating/high_volume)
- priority (A/B/C)
- owner_or_manager_name, role_guess, email_1, email_2
- personalization_snippet, notes

Next decision needed from owner to unlock list building: pick initial geography scope (Top 25 US metros vs 5–10 states vs US-wide).