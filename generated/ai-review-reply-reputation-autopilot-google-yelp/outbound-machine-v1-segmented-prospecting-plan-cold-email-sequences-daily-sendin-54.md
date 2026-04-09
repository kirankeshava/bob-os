# Outbound Machine v1 — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:33:12.674Z

---

Business proof/legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) ICP + SEGMENTATION (who to email first)
Target verticals (high review velocity + high LTV):
1) Dentists / dental clinics
2) Med spas / aesthetics clinics
3) HVAC + plumbers (home services)

Primary pain: reviews drive calls/bookings; owners don’t respond fast/consistently; negative reviews sit unanswered; staff replies are inconsistent/off-brand.

Minimum filters for leads:
- Has a Google Business Profile (GBP)
- At least 30 reviews (so reputation matters)
- Not a national franchise OR clearly locally-managed location (franchises can work if local manager email is available)

Segments (tag each lead with ONE primary segment + a priority tier):
1) NOT_RESPONDING
Definition: in the last 10 Google reviews, owner/manager responses in ≤ 2 reviews (≤20% response-rate proxy).
Pitch angle: “you’re leaving reviews unanswered; we respond within 12 hours; you approve.”

2) LOW_RATING
Definition: Google rating < 4.2.
Pitch angle: “triage negatives; escalate issues; prevent future 1-stars; consistent brand-safe replies.”

3) HIGH_VOLUME
Definition: review_count ≥ 200 OR last review within 14 days.
Pitch angle: “ops throughput; never miss a review; weekly KPI report.”

Priority tiers (use to order the send list):
Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
Priority B: NOT_RESPONDING only OR LOW_RATING only
Priority C: HIGH_VOLUME only

Personalization tokens to capture for every lead (safe + fast):
- {{recent_review_snippet}}: 8–20 words copied OR paraphrased from most recent review (avoid health/private details)
- {{last_review_date}}
- {{rating}} and {{review_count}}
- {{response_gap}}: “looks like the last few reviews haven’t gotten a response yet” (only use if true)

B) ZERO-COST LEAD LIST BUILD WORKFLOW (owner/VA execution)
Goal: produce 500–1,000 rows with: business, contact info, rating/review count, last review date, response-rate proxy, segment, priority.

1) Decide geography scope (required):
Option 1: Top 25 US metros (fastest to scale + highest density)
Option 2: 5–10 target states (if you want sales focus)
Option 3: US-wide (broadest, harder to QA)

2) Google Maps query pack (example patterns):
- “dentist in {metro}” / “cosmetic dentist in {metro}”
- “med spa in {metro}” / “aesthetic clinic in {metro}”
- “HVAC repair in {metro}” / “plumber in {metro}”

3) Data entry columns (CSV headers):
business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, personalization_snippet, notes, contact_name, contact_role, email_1, email_2

4) How to compute response_rate_proxy_last10 (manual but consistent):
- Open GBP → Reviews → check the most recent 10 reviews
- Count how many have an “Owner response”
- response_rate_proxy_last10 = owner_responses / 10

5) QA rules (reject/skip leads that fail):
- No website AND no obvious contact email path → deprioritize unless high volume
- Category mismatch (e.g., dental supply store vs dentist) → reject
- Spammy/duplicate listings → reject
- Closed/permanently closed → reject

C) COLD EMAIL COPY — 3-STEP SEQUENCES (include legitimacy link)
Notes:
- Keep first email under ~120 words.
- Use ONE clear CTA: “Worth a 10-min call?” OR “Reply ‘yes’ and I’ll send 2 example replies.”
- Always include the website URL as proof.
- Replace {{tokens}}.

C1) DENTAL — NOT_RESPONDING (Primary)
Subject options:
1) Quick question about your Google reviews
2) {{business_name}} review replies
3) Leaving reviews unanswered?

Email 1:
Hi {{first_name}},

I was looking at {{business_name}} on Google—saw a recent review: “{{recent_review_snippet}}.”

It looks like a few recent reviews haven’t gotten a response yet. We run an AI review-reply + reputation autopilot for local businesses: brand-safe drafts, negative-review escalation, and we can respond within 12 hours (with approval if you want).

If helpful, I can send 2 example replies written in your tone for the last couple reviews.

Worth a quick 10-min call this week?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 1 (2–3 days later):
Subject: Want me to draft a couple replies?
Hi {{first_name}}—happy to draft responses for {{business_name}} for free (2 examples), especially for reviews that mention {{keyword_from_review}}.

If you reply “yes,” I’ll send them over.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 2 (5–7 days later):
Subject: Close the loop
Hi {{first_name}}, last note—most practices we talk to just want:
1) fast replies to every review,
2) a way to flag negatives for follow-up,
3) weekly visibility on rating + response rate.

If that’s relevant, want me to send a quick outline + pricing?
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

C2) DENTAL — LOW_RATING
Subject options:
1) Quick fix for reputation at {{business_name}}
2) About your Google rating
3) Turning negatives into recoveries

Email 1:
Hi {{first_name}},

Noticed {{business_name}} is at {{rating}} on Google. A recent review mentioned: “{{recent_review_snippet}}.”

We help local businesses respond to reviews in a brand-safe way, escalate negatives quickly (so you can recover the patient relationship), and keep responses consistent.

If you want, I can draft a response to that review + one more (no cost) so you can see the tone.

Worth 10 minutes?
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 1:
Subject: Drafting a response to the {{last_review_date}} review
If you tell me who should approve replies (you or front desk), I’ll send two drafts that are HIPAA-safe and de-escalating.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 2:
Subject: Should I send the drafts?
Reply “send” and I’ll forward them.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

C3) MED SPA — NOT_RESPONDING
Subject options:
1) {{business_name}} review replies
2) Quick idea to boost bookings from reviews
3) Missing responses on Google

Email 1:
Hi {{first_name}},

Saw {{business_name}}’s latest Google review: “{{recent_review_snippet}}.”

It looks like some recent reviews aren’t getting responses. We run an AI review-reply autopilot: drafts in your brand voice, 12-hour response SLA, and negative-review escalation so issues don’t sit publicly.

Want me to send 2 example replies for your last couple reviews?
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 1:
Subject: 2 draft replies?
If you reply “yes,” I’ll send two drafts (short + on-brand). No login needed to review them.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 2:
Subject: Close the loop
We typically help clinics improve response rate and keep rating momentum without the owner spending time in Google/Yelp daily. Interested?
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

C4) HOME SERVICES (HVAC/PLUMBING) — HIGH_VOLUME
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Quick ops question
3) Review replies in under 12 hours

Email 1:
Hi {{first_name}},

{{business_name}} has {{review_count}} Google reviews and you’re still getting new ones (latest on {{last_review_date}}). That’s a lot to keep up with—especially during busy weeks.

We run a review-response autopilot: brand-safe drafts, respond within 12 hours, and escalate negatives so a manager can follow up fast. Weekly KPI report included.

Open to a quick call to see if this would save time for your team?
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 1:
Subject: Want 2 example replies?
Reply “yes” and I’ll draft two replies for your most recent reviews (in a friendly, local tone).
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 2:
Subject: Should I close this out?
If reviews are already handled internally, no worries. If not, I can share how we set up approvals + escalation in under a day.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

C5) AGENCY / RESELLER LANE (marketing agencies serving these verticals)
Subject options:
1) White-label review replies for your clients
2) Add-on service for GBP/Yelp clients
3) Quick partnership idea

Email 1:
Hi {{first_name}},

Not sure if you offer review management today. We built an AI review-reply + reputation autopilot that agencies can resell: brand-safe replies for Google/Yelp, negative-review escalation, and weekly KPI reporting.

If you have dentists/med spas/home-service clients, this is an easy retention add-on (you control positioning; we do the ops).

Open to a 15-min call? Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 1:
Subject: Margin + fulfillment
If helpful, I can send a one-page outline: what we fulfill, what you can charge, and how approvals/escalations work.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

Follow-up 2:
Subject: Worth sending the 1-pager?
Reply “1-pager” and I’ll send it.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{sender_name}}

D) DAILY SENDING OPS + CRM (what to do every day)

CRM stages (minimal but effective):
1) Prospects (not sent yet; includes segment + priority)
2) Sent (Email 1 sent)
3) Follow-up Scheduled (waiting for FU1/FU2)
4) Replied – Interested
5) Replied – Not now
6) Qualified (pain confirmed; next step = demo)
7) Demo Booked
8) Trial/Setup
9) Paid
10) Lost

14-day sending ramp (per inbox; conservative for deliverability):
Day 1–2: 10–15/day
Day 3–4: 20/day
Day 5–7: 30/day
Day 8–10: 40/day
Day 11–14: 50/day
Notes: keep follow-ups within same thread; stop sequence on reply.

Daily checklist (60–90 minutes):
1) Add 25–50 new prospects (Priority A first)
2) QA sample 10% of new leads (category match, website, review snippet accuracy)
3) Send Email 1 to today’s batch
4) Send Follow-up 1 to due prospects
5) Send Follow-up 2 to due prospects
6) Triage replies within 12 business hours:
   - Interested → ask 2 qualifiers (who responds today? volume? approval workflow?) and propose times
   - Not now → set reminder 30–60 days
   - Wrong person → ask for owner/manager contact
7) Track KPIs daily: sent, delivered, bounce %, reply %, positive reply %, demos booked

Safety/compliance notes:
- Avoid including sensitive medical details in dental/med-spa replies; keep personalization snippets short and non-sensitive.
- If quoting reviews, use brief excerpts; paraphrase if review contains personal/health details.

Owner decision required to start list building at scale: pick initial geography (Top 25 metros vs states vs US-wide). Once chosen, the query pack is locked and a VA/human can produce 500–1,000 leads using the workflow above.