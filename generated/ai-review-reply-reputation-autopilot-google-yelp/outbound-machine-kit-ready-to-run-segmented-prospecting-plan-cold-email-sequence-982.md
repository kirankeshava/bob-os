# Outbound Machine Kit (Ready-to-Run) — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:41:34.920Z

---

BUSINESS CONTEXT (use in every outreach)
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp). Drafts and (optionally) posts brand-safe review responses, escalates negative reviews, and sends weekly KPI reporting.
- Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) SEGMENTED PROSPECTING PLAN (what to pull + who to email)

Core verticals (high LTV + review velocity)
A) Dentists / Dental clinics
B) Med spas / Aesthetic clinics
C) HVAC + Plumbing (home services)

Parallel lane (faster bulk deals)
D) Local marketing agencies that manage GBP/reputation for the above verticals

Geography (choose ONE for initial 500–1,000)
- Option 1: Top 25 US metros (best for volume + density)
- Option 2: 5–10 target states (best for localized case studies)
- Option 3: US-wide (least consistent; more QA burden)

What qualifies as “high intent” (prioritize)
Capture from Google Business Profile:
- Rating
- Review count
- Last review date
- Response-rate proxy: of the last 10 reviews, how many have an owner/manager response?

Segments + routing
Segment rules:
- NOT_RESPONDING: response-rate proxy ≤ 20% (0–2 responses out of last 10)
- LOW_RATING: rating < 4.2
- HIGH_VOLUME: review_count ≥ 200 OR last_review_date within 14 days
Priority score (operational):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: (NOT_RESPONDING) OR (LOW_RATING)
- Priority C: (HIGH_VOLUME only)

Message angle by segment
- NOT_RESPONDING: “response gap → lost conversions → we respond in 12 hours, brand-safe, you approve.”
- LOW_RATING: “damage control + escalation workflow + consistent tone → win back trust.”
- HIGH_VOLUME: “ops throughput → clear approvals → weekly KPI summary.”

Daily sending targets (after ramp)
- Direct-to-local: 50–100 new emails/day + follow-ups
- Agency lane: 10–20 new emails/day (higher personalization)
- Reply SLA: < 2 business hours to positive replies; < 24 hours max

2) COLD EMAIL COPY — DIRECT-TO-LOCAL (3-step sequence)

Personalization tokens (copy/paste into your mail merge)
- {{first_name}} (optional)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{google_rating}} / {{review_count}}
- {{recent_review_snippet}} (quote 5–12 words max OR paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get a reply”)
- {{your_name}} = Bob
- {{website_url}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- {{contact_email}} = agent_bob_replit+review-bot@agentmail.to

SUBJECT LINE SETS (pick 1; rotate)
Dentist
1) Quick question about {{business_name}} reviews
2) Noticed a review response gap for {{business_name}}
3) 12-hour review replies for dental clinics

Med Spa
1) Your med spa reviews (quick help)
2) Consistent replies to protect bookings
3) {{business_name}}: review response system

HVAC/Plumbing
1) New reviews coming in—who replies?
2) Missed review replies at {{business_name}}?
3) 12-hour review replies for home services

EMAIL 1 (initial) — NOT_RESPONDING variant
Hi {{first_name_or_owner}},

I was looking at {{business_name}} on Google and noticed {{response_gap}}. One of the recent reviews mentioned “{{recent_review_snippet}}”.

We run a lightweight “reputation autopilot” for local businesses:
- Draft brand-safe Google/Yelp replies in your voice
- Respond within ~12 hours
- Flag/escalate negative reviews so they don’t sit unanswered
- Weekly KPI recap (rating, volume, response rate)

You can approve replies before anything posts.

Want me to send 2–3 sample replies for your last reviews so you can see the tone? If yes, just reply “samples” and I’ll send them.

– Bob
{{website_url}}
{{contact_email}}

EMAIL 1 (initial) — LOW_RATING variant
Hi {{first_name_or_owner}},

I saw {{business_name}} is at {{google_rating}} on Google right now and a recent reviewer mentioned “{{recent_review_snippet}}”. If negative reviews sit without a response, it can quietly hurt calls/bookings.

We help by:
- Drafting calm, brand-safe replies (no arguing, no policy issues)
- Escalating anything sensitive to you immediately
- Keeping response times fast and consistent
- Sending a weekly KPI snapshot so you can see improvement

If you want, I can draft responses for your 3 most recent critical reviews for approval (no cost to preview). Should I?

– Bob
{{website_url}}
{{contact_email}}

EMAIL 1 (initial) — HIGH_VOLUME variant
Hi {{first_name_or_owner}},

{{business_name}} gets a lot of reviews ({{review_count}}). Keeping up with replies consistently is basically an ops problem.

We set up a simple workflow:
- New review → draft reply in your brand voice
- You approve (or auto-approve for 5-star)
- Negative reviews trigger an escalation note
- Weekly KPI recap (volume, response rate, rating trend)

If I send a quick 1-minute overview + 2 sample replies in your tone, would you take a look?

– Bob
{{website_url}}
{{contact_email}}

FOLLOW-UP 1 (2 days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name_or_owner}},

Checking if this is on your radar. The main gap we fix is speed + consistency: replies within ~12 hours, brand-safe, and you can approve before posting.

If you reply with “samples,” I’ll send a few draft replies based on your recent reviews.

– Bob
{{website_url}}

FOLLOW-UP 2 (5–7 days later)
Subject: close the loop?

Hi {{first_name_or_owner}},

Should I close the loop on this? If someone else owns review replies at {{business_name}}, tell me who and I’ll reach out.

Otherwise, if you want to test it, I can draft responses for your latest 5 reviews and send them for approval.

– Bob
{{contact_email}}

3) COLD EMAIL COPY — AGENCY / RESELLER LANE (3-step)

Agency subject lines
1) White-label review response (GBP/Yelp)
2) Add review replies to your local retainers
3) Reputation autopilot for your clients

AGENCY EMAIL 1
Hi {{first_name}},

Do you manage Google Business Profiles/reputation for local clients (dentists, med spas, home services)?

I’m Bob — we built an AI Review Reply & Reputation Autopilot that agencies can white-label:
- Brand-safe replies drafted in the client’s voice
- 12-hour response SLA option
- Negative review escalation workflow
- Weekly KPI summary you can forward to clients

If you want, I can run a quick sample for one client location using their last 5 reviews (you’ll see the tone + workflow). Interested?

– Bob
{{website_url}}
{{contact_email}}

AGENCY FOLLOW-UP 1 (2–3 days)
Hi {{first_name}},

Worth a quick look? This is usually an easy add-on to existing GBP management because it’s operationally simple (approve queue + escalation rules).

If you tell me one client vertical (dental/med spa/home services), I’ll send a tailored sample + suggested packaging.

– Bob

AGENCY FOLLOW-UP 2 (5–7 days)
Hi {{first_name}},

If now’s not the time, no worries—should I circle back next month, or is there someone else on your team who owns reputation/GBP delivery?

– Bob

4) OUTBOUND OPS CHECKLIST (daily/weekly) + 14-DAY RAMP

List QA (before sending)
- Confirm business matches vertical (avoid schools, supply stores, franchises if undesired)
- Confirm Google rating + review count are real (from GBP)
- Capture last review date (recency)
- Compute response-rate proxy from last 10 reviews (count owner responses)
- Capture a safe personalization snippet (short quote or paraphrase; avoid sensitive info)
- Find best email: owner/manager or front desk; if none, use contact@ from website

Compliance + deliverability basics
- Include your contact email (agent_bob_replit+review-bot@agentmail.to)
- Use plain-text style emails; minimal links (only include {{website_url}})
- Stop emailing anyone who replies “stop/unsubscribe”
- Keep bounce rate < 3%; if >3% pause and clean list

14-day sending ramp (per inbox)
- Days 1–2: 10–15 new/day + follow-ups
- Days 3–4: 20–25 new/day
- Days 5–7: 30–40 new/day
- Week 2: 40–60 new/day (only if bounce/complaints are low)
Note: If using multiple inboxes, split volume evenly; never spike suddenly.

Daily routine (60–90 minutes)
1) Pull 25–100 new leads from the sheet (Priority A first)
2) Personalize first line using {{response_gap}} + {{recent_review_snippet}}
3) Send new emails within ramp cap
4) Send scheduled follow-ups
5) Triage replies:
   - Interested → propose 15-min call / ask for GBP access preference + approval workflow
   - Not now → set follow-up date
   - Wrong contact → ask for the right person
   - Unsubscribe → tag DNC and stop

Weekly routine (2–3 hours)
- Review KPIs: sent, delivered, open (optional), reply rate, positive reply rate, meetings booked
- Identify best-performing segment/vertical and double down next week
- Refresh list with new “last 14 days reviews” pulls

5) CRM STAGES (simple pipeline)
1) Prospect (validated lead; has email)
2) Sent (Email 1 sent)
3) Follow-up Scheduled (FU1/FU2 queued)
4) Replied – Positive
5) Replied – Neutral / Not now
6) Replied – Negative / Unsub
7) Qualified (fits: high review velocity, cares about brand, has approval owner)
8) Demo Booked
9) Trial / Pilot (sample replies + approval workflow)
10) Paid
11) Lost (reason tagged: budget, timing, already have process, wrong contact)

CTA OPTIONS (choose one; lowest friction wins early)
- “Reply ‘samples’ and I’ll draft 2–3 replies for your latest reviews.”
- “Want a 15-min walkthrough of the workflow?”
- “Who owns review responses at {{business_name}}?”

Execution dependency (to move from ‘kit’ to revenue)
- Choose initial geography scope and start building the 500–1,000 lead CSV using the schema + segments above. Once the first 200 are built, begin sending immediately while the rest of the list is still being compiled.
