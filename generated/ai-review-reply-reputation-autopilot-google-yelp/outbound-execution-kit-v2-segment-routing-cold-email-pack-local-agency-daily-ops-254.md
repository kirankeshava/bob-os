# Outbound Execution Kit v2 — Segment Routing + Cold Email Pack (Local + Agency) + Daily Ops Scoreboard (Includes website URL)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:31:46.242Z

---

Below is a ready-to-run outbound kit you can paste into your sending tool/CRM. It includes: (A) segmentation routing rules, (B) a master 3-step cold email sequence with plug-in segment blocks, (C) an agency/reseller 3-step sequence, and (D) a daily ops scoreboard.

PRODUCT LEGITIMACY LINK (include in emails where appropriate): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) SEGMENTATION → PRIORITY → MESSAGE ROUTING
Data you capture per lead (minimum): rating, review_count, last_review_date, response_rate_proxy (owner replies in last 10 reviews), and latest review snippet (or paraphrase).

Segments:
1) NOT RESPONDING
Definition: response_rate_proxy ≤ 20% OR 0 owner replies in last 10 reviews.
Best hook: “noticed recent reviews aren’t getting responses.”
Offer angle: speed + brand-safe + you approve.
CTA: “Want me to draft 2 replies to your most recent reviews as an example?”

2) LOW RATING
Definition: rating < 4.2 (or <4.0 for stricter).
Best hook: “rating is taking hits / recent negative review.”
Offer angle: escalation + service recovery + consistent, calm responses.
CTA: “Want a recovery playbook + drafts for the 2 most recent negative reviews?”

3) HIGH VOLUME
Definition: review_count ≥ 200 OR last_review_date within 14 days.
Best hook: “you get steady review flow; replying is a workflow problem.”
Offer angle: autopilot drafting + weekly KPI report.
CTA: “Want a 7-day pilot: we draft replies within 12 hours, you approve?”

Priority tiers (who to email first):
Priority A: (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME)
Priority B: NOT RESPONDING only OR LOW RATING only
Priority C: HIGH VOLUME only

Follow-up logic:
- Priority A: send E1, follow-up after 2 business days (E2), follow-up after 4 more business days (E3).
- Priority B: same cadence, but E2 uses “example drafts” offer.
- Priority C: E1 emphasizes throughput + weekly reporting; E2 offers quick audit.

Personalization tokens (safe + quick):
{{business_name}}, {{city}}, {{service_type}}, {{recent_review_snippet}} (quote ≤ 1 sentence), {{response_gap}} (e.g., “no owner response seen on the last few reviews”), {{rating}}, {{review_count}}.
Compliance note: If you’re unsure about quoting, paraphrase instead of copying verbatim.

B) LOCAL BUSINESS COLD EMAIL — MASTER 3-STEP (with segment plug-ins)
Use one sequence; select the segment block at send-time.
From name: {{your_name}}
From email: {{your_email}}

EMAIL 1 (Initial)
Subject options (pick 1):
1) Quick idea for {{business_name}}’s Google reviews
2) {{business_name}}: replying to reviews (without extra work)
3) Noticed a gap on your recent reviews

Body:
Hi {{first_name_or_owner}},

I’m reaching out because I was looking at {{business_name}}’s reviews in {{city}} and noticed {{segment_hook}}.

{{SEGMENT BLOCK — choose one}}

What we do: we draft brand-safe replies to your Google (and Yelp) reviews, escalate the negative ones, and send a simple weekly reputation KPI report. You can approve replies before anything goes out.

If helpful, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week? If you prefer, I can send 2 example replies for your most recent reviews.

— {{your_name}}
{{your_title}}
{{your_email}}

Segment hooks + blocks:

NOT RESPONDING
segment_hook: “some recent reviews don’t appear to have owner responses.”
SEGMENT BLOCK:
For example, one recent review mentioned: “{{recent_review_snippet}}”. A quick, thoughtful response can protect conversion (people read responses as much as ratings).

LOW RATING
segment_hook: “your rating is close to the threshold where shoppers start filtering you out.”
SEGMENT BLOCK:
I noticed a recent critical review about “{{recent_review_snippet}}”. A calm, consistent reply + escalation workflow usually prevents repeat negatives and can win customers back.

HIGH VOLUME
segment_hook: “you get a steady stream of reviews.”
SEGMENT BLOCK:
When review volume is high, responses tend to get skipped—not because you don’t care, but because it’s a workflow problem. We turn it into a 12-hour draft/approve loop so every review gets handled.


EMAIL 2 (Follow-up #1 — value + proof)
Subject options:
1) Want 2 draft replies for {{business_name}}?
2) Example replies for your recent reviews
3) Re: {{business_name}} reviews

Body:
Hi {{first_name_or_owner}},

Quick follow-up — I can draft replies (in your tone) for the 2 most recent reviews at {{business_name}} so you can see what the “autopilot + approval” workflow looks like.

If you want that, reply with:
1) preferred tone (friendly/clinical/straight-to-the-point)
2) whether you want to prioritize Google only or Google + Yelp

Or if easier, are you open to 10 minutes to show you the flow + weekly KPI report?

— {{your_name}}
{{your_email}}


EMAIL 3 (Follow-up #2 — low-friction close)
Subject options:
1) Close the loop?
2) Should I send the drafts?
3) Worth a try for 7 days?

Body:
Hi {{first_name_or_owner}},

Should I (a) send example draft replies for your latest reviews, or (b) leave you alone for now?

If you’re open to a simple pilot: we draft responses within 12 hours, you approve, we escalate negatives, and you get a weekly KPI summary. Details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
{{your_name}}
{{your_email}}

C) AGENCY / RESELLER 3-STEP SEQUENCE (for marketing agencies serving local businesses)
Target: local SEO agencies, web + PPC shops, reputation management firms.
Goal: close 5–20 client add-on quickly.

EMAIL A1
Subject options:
1) Add “review replies” to your SEO package (done-for-you)
2) White-label review response autopilot for your clients
3) Quick reseller idea for your local clients

Body:
Hi {{first_name}},

If you manage local SEO/reputation for {{agency_name}}, this might be an easy add-on: an AI-assisted review reply + escalation + weekly KPI report system your clients can approve.

We’re building “AI Review Reply & Reputation Autopilot” (Google/Yelp). Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Typical problem: clients get reviews but don’t respond consistently; it hurts conversions and creates service-recovery blind spots.

Open to a 15-min chat about a reseller/white-label setup? If you tell me your top vertical (dentist/med spa/home services), I’ll send a sample weekly KPI report format + example replies.

— {{your_name}}
{{your_email}}

EMAIL A2
Subject: Sample KPI report + reply workflow
Body:
Hi {{first_name}},

Following up—if you reply with your top client vertical + approximate client count, I’ll send:
- a sample weekly KPI report (ratings trend, review velocity, response time, negative escalation count)
- the draft/approve workflow your AMs can run in minutes

Worth exploring?
— {{your_name}}
{{your_email}}

EMAIL A3
Subject: Close the loop on white-label review replies
Body:
Hi {{first_name}},

Should we discuss a reseller pilot (3–5 clients) or is this not a fit right now?

Either way, here’s the product page for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}
{{your_email}}

D) DAILY SENDING OPS SCOREBOARD (copy into a doc / sheet)
Daily targets (starting point; adjust based on inbox count):
- New prospects added: 50–100/day
- Emails sent/day: 50–100/day total across inboxes (ramp up over 14 days)
- Follow-ups/day: 1–2 follow-ups per 1 new send (keep it balanced)
- Positive replies target: 1–3/day once volume is steady

Quality gates (stoplight):
- Bounce rate: Green <2%, Yellow 2–5% (clean list), Red >5% (pause + verify)
- Spam complaints: Any spike → reduce volume + review copy
- Reply SLA: respond to positive replies within 2 hours during business day

CRM stages (minimum viable):
1) Prospect (not contacted)
2) Sent (E1)
3) Replied – Interested
4) Replied – Not now
5) Qualified (has Google/Yelp reviews + decision maker reachable)
6) Demo booked
7) Trial/pilot started
8) Paid
9) Lost (reason tagged: price / timing / already has tool / wrong contact)

Daily routine (45–75 minutes):
1) Add new prospects + segment (Priority A first)
2) Send E1 batch
3) Send follow-ups due today
4) Triage replies → book calls → log outcomes
5) QA 10 random leads for category mismatch / bad data

Owner decision needed next (to unlock list-building speed): choose initial geography scope for the first 500–1,000 leads: Top 25 US metros vs 5–10 states vs US-wide.