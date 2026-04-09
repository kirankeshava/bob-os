# Outbound Pipeline Kit (Execution-Ready) — Segmented Prospecting Plan + Cold Email Pack + Daily Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:55:44.463Z

---

BUSINESS (reference in outreach):
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

====================================================
1) ICP + VERTICALS + WHAT TO PULL
====================================================
Verticals (high review velocity + revenue impact):
A) Dental practices
B) Med spas / aesthetic clinics
C) HVAC + plumbers (home services)

High-intent triggers (use for segmentation):
- Not responding: owner/manager replies in <=2 of last 10 Google reviews (<=20%) OR no replies visible recently.
- Low rating: Google rating < 4.2.
- High volume: review_count >= 200 OR last review within 14 days.

Priority scoring (use for routing + send order):
- Priority A: (Not responding AND High volume) OR (Low rating AND High volume)
- Priority B: (Not responding) OR (Low rating)
- Priority C: High volume only

Offer positioning by segment:
- Not responding: “We respond within 12 hours, brand-safe, you approve. Never miss a review.”
- Low rating: “Escalate negatives instantly + calm response drafts to protect revenue; weekly KPI report.”
- High volume: “Lightweight autopilot ops so your team doesn’t spend hours in Google/Yelp.”

====================================================
2) LIST BUILD SPEC (ZERO-COST WORKFLOW)
====================================================
Goal: 500–1,000 leads total, segmented and prioritized.
Production target: 50–100 leads/day (single person) or 200+/day (VA).

Columns (CSV headers):
business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_owner_replies_count,segment,priority,personalization_snippet,notes,contact_name,role_guess,email_1,email_2

How to collect key fields (manual):
1) Google Maps search per vertical + metro (e.g., “dentist Austin TX”, “med spa Scottsdale AZ”, “HVAC repair Raleigh NC”).
2) Open listing → capture rating + review count.
3) Click reviews → sort by newest → scan last 10 reviews:
   - Count owner replies visible (last_10_owner_replies_count).
   - response_rate_proxy = owner_replies/10.
   - last_review_date = date on most recent review.
4) personalization_snippet:
   - Copy a short, non-sensitive phrase (6–12 words) OR paraphrase.
   - Avoid health details, specific treatments, or anything that could be PHI-like; keep it generic.
5) Find contact emails:
   - Website footer/contact page (“info@”, “office@”, “hello@”).
   - If none, use patterns (first@domain) only when you have a named contact.

QA rules (skip leads that waste sends):
- Skip: franchises with corporate review management unless clearly locally owned.
- Skip: no website and no email found (unless phone-only campaign later).
- Prefer: independent practices/clinics/home service companies with 5+ recent reviews or evidence of activity.

====================================================
3) COLD EMAIL PACK (3-STEP) — BY SEGMENT
====================================================
Tokens you’ll personalize:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap_fact}} {{legitimacy_link}}

Safe personalization rules:
- Use: “I noticed a recent review mentioned ‘{{recent_review_snippet}}’.”
- Or paraphrase: “A recent review highlighted wait time / friendliness / scheduling.”
- Don’t paste full negative reviews. Don’t mention sensitive medical details. Don’t accuse.

-------------------------
3A) NOT RESPONDING (primary angle)
-------------------------
Subject options:
1) Quick help with Google review replies for {{business_name}}
2) Noticed a response gap on your recent reviews
3) Simple way to reply within 12 hours

Email 1:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a recent one mentioned “{{recent_review_snippet}}.”

One thing that jumps out: {{response_gap_fact}} (e.g., “I didn’t see owner replies on most of the last 10 reviews”). Businesses that reply consistently usually convert more calls/bookings from Maps.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews to you immediately, and gives a weekly KPI recap. You can approve everything before it posts.

If helpful, I can show you what “reply within 12 hours” looks like for {{business_name}}. Want me to send 2–3 drafted replies based on your latest reviews?

Legitimacy link: {{legitimacy_link}}

— {{your_name}}

Follow-up 1 (2–3 days later):
Subject: Want me to draft a few replies for {{business_name}}?
Hi {{first_name}} — quick follow-up. If I draft 3 replies (1 positive, 1 neutral, 1 negative-handling) using your existing tone, would you want to review them? No commitment—just a quick look.

Here’s our site: {{legitimacy_link}}

— {{your_name}}

Follow-up 2 (4–6 days later):
Subject: Close the loop?
Hi {{first_name}} — should I (a) send sample replies for {{business_name}}, or (b) circle back next month? Either is fine.

— {{your_name}}

-------------------------
3B) LOW RATING (damage control + escalation)
-------------------------
Subject options:
1) Fixing review impact for {{business_name}}
2) Quick win on negative reviews (without sounding robotic)
3) Reputation guardrails for Google/Yelp

Email 1:
Hi {{first_name}} — I was reviewing {{business_name}}’s Google profile and saw you’re at {{google_rating}} stars.

When a negative review hits and there’s no fast, calm response, it can cost calls. We built a lightweight autopilot that (1) drafts brand-safe replies in your voice, (2) escalates negatives instantly so you can intervene, and (3) reports weekly KPIs so you can see progress.

If you want, I can draft responses for your 3 most recent critical reviews and send them for approval.

Legitimacy link: {{legitimacy_link}}

— {{your_name}}

Follow-up 1:
Hi {{first_name}} — happy to tailor the tone (short/clinical/warm) so it matches {{business_name}}. Want the sample drafts?

{{legitimacy_link}}

— {{your_name}}

Follow-up 2:
Hi {{first_name}} — last note. If reputation management is already handled, who’s best to speak with? If not, I can send sample responses today.

— {{your_name}}

-------------------------
3C) HIGH VOLUME (ops + throughput)
-------------------------
Subject options:
1) Handling review volume at {{business_name}}
2) Easier way to keep up with Google/Yelp reviews
3) Review replies: done daily, on-brand

Email 1:
Hi {{first_name}} — {{business_name}} has strong review activity ({{review_count}} total). When reviews come in regularly, keeping up with replies becomes an ops problem.

We built an autopilot that drafts on-brand responses and routes negatives for escalation. Goal: every review gets a timely reply without your team living in Google Business Profile.

Want me to send a sample batch of 5 replies based on your newest reviews?

{{legitimacy_link}}

— {{your_name}}

Follow-up 1:
If you tell me the preferred tone (formal/friendly/short), I’ll match it and send sample replies.

— {{your_name}}

Follow-up 2:
Should I send samples this week, or pause?

— {{your_name}}

====================================================
4) AGENCY / RESELLER LANE (bulk distribution)
====================================================
Target agencies:
- Local SEO agencies, dental marketing agencies, med spa marketing, home service PPC/SEO agencies.

Agency Email 1:
Subject: Add “review replies within 12 hours” to your client offer
Hi {{first_name}} — do you manage Google Business Profiles for local clients?

We built an AI Review Reply & Reputation Autopilot: brand-safe draft replies for Google/Yelp, negative-review escalation, and weekly KPI reporting. Agencies can package it as a retention add-on (you control approvals).

If I send a quick overview + example outputs, would you be open to a 15-min chat?

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

Agency Follow-ups:
- F1: “Want a white-label version of the weekly KPI report format?”
- F2: “If not you, who owns GBP fulfillment?”

====================================================
5) DAILY SENDING OPS (14-DAY RAMP) + RULES
====================================================
Core principle: low volume, high relevance, strict list hygiene.

Daily targets (starting point):
- New sends: 20/day (Day 1–2) → 40/day (Day 3–5) → 60/day (Day 6–10) → 80–100/day (Day 11–14) PER INBOX (only if deliverability is clean).
- Follow-ups: 1:1 with the same thread; cap total daily emails to maintain low complaint risk.

Ramp schedule (single inbox example):
Days 1–2: 20 new/day + 10 follow-ups
Days 3–5: 40 new/day + 20 follow-ups
Days 6–10: 60 new/day + 30 follow-ups
Days 11–14: 80 new/day + 40 follow-ups

List hygiene + thresholds:
- Hard bounce > 3% in a day: stop new sends, fix list.
- Complaint/spam signals: stop, revise copy, reduce volume.
- Always include plain-text style; avoid heavy links (use only the legitimacy link once).

Reply SLA (to win):
- Reply within 15 minutes during business hours.
- If interested: ask 2 questions only (platforms used + approval preference) and offer to send sample drafts the same day.

====================================================
6) CRM PIPELINE (STAGES + ENTRY/EXIT)
====================================================
Stages:
1) Prospect (lead meets ICP + has email)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied (any reply)
5) Qualified (has Google/Yelp presence + confirms pain: time/negatives/no replies)
6) Demo Booked
7) Trial/Proof (you send sample replies; set expectations)
8) Paid
9) Lost (with loss reason: timing, already handled, no budget, wrong contact)

Qualification checklist (quick):
- Do they have weekly/monthly review flow?
- Who approves replies?
- What’s the current response rate (their perception vs your proxy)?

====================================================
7) WHAT I NEED FROM OWNER NEXT (TO UNBLOCK 500–1,000 CSV)
====================================================
Choose geography scope for the first list pull:
A) Top 25 US metros (fastest to execute, highest density)
B) 5–10 target states (if you prefer regional focus)
C) US-wide (broadest, most work to QA)

Once chosen, you/VA can start building immediately using the list spec above and produce the CSV for segmentation + sending.
