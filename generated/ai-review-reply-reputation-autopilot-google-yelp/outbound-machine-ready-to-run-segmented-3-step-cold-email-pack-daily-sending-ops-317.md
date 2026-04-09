# Outbound Machine (Ready-to-Run): Segmented 3-Step Cold Email Pack + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:11:58.450Z

---

BUSINESS CONTEXT (for positioning)
Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
What it does: drafts and posts brand-safe review responses, escalates negative reviews, and sends weekly reputation KPIs.
Legitimacy URL (include in emails when appropriate): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email (always use for replies / trust): agent_bob_replit+review-bot@agentmail.to
Sender identity for signups/outreach: Bob Smith

============================================================
A) SEGMENTATION (use for routing + which opening line to use)
Data you capture per lead: rating, review_count, last_review_date, response-rate proxy (owner replies in last 10 reviews).

Segments:
1) NOT RESPONDING
- response_rate_proxy <= 20% OR 0 owner replies in last 10 reviews.
2) LOW RATING
- Google rating < 4.2.
3) HIGH VOLUME
- review_count >= 200 OR last_review_date within last 14 days.

Priority scoring:
- Priority A: (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME)
- Priority B: NOT RESPONDING OR LOW RATING
- Priority C: HIGH VOLUME only

Personalization rules (safe + fast):
- Use a short snippet from the most recent review (5–12 words) OR paraphrase. Don’t include sensitive medical details, don’t mention protected classes, don’t claim outcomes.
- “Response gap” = mention if the last few reviews don’t have owner replies, or if negative reviews aren’t addressed.

============================================================
B) COLD EMAIL SEQUENCE (1 sequence, with segment-specific openings)

Use ONE sequence for all verticals; swap only the first 1–2 lines.
Target roles: owner, practice manager, office manager, general manager, operations manager, marketing manager.

SUBJECT LINES (pick 1)
1) Quick question about your Google reviews
2) Saw a recent review (and response opportunity)
3) Review responses — quick win for {{business_name}}
4) Can I help with review replies?
5) {{city}} reviews: respond faster (without extra staff)

EMAIL 1 — INITIAL
To: {{email}}

Hi {{first_name}},

[Pick ONE opening based on segment]

OPENING — Not responding:
I was looking at {{business_name}}’s recent Google reviews and noticed a few don’t have an owner reply yet (easy trust win).

OPENING — Low rating:
I saw a recent review for {{business_name}} that wasn’t great — responding well can genuinely pull perception back up.

OPENING — High volume:
Looks like {{business_name}} gets a steady flow of new reviews — replying fast is great for conversions, but it’s a time sink.

Personalized hook (add 1 line; keep it short):
Example snippet: “{{recent_review_snippet}}” — this is exactly the kind of review where a quick, brand-safe response helps.

What we do: an AI-assisted “review reply autopilot” for Google/Yelp that drafts (and can post) brand-safe responses, escalates negatives to you, and sends weekly reputation KPIs. You can approve everything before it goes live.

If helpful, I can send 2–3 sample responses for your latest reviews so you can judge tone/fit first.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a quick 10 minutes this week?

– Bob Smith
agent_bob_replit+review-bot@agentmail.to


EMAIL 2 — FOLLOW-UP (Day 2–3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up. If I draft 3 responses for the most recent reviews (including 1 negative, if you have one), would you want to see them?

The idea is simple: respond within ~12 hours, keep tone consistent, and escalate anything sensitive so it doesn’t get an autopilot reply.

If there’s someone else who owns reputation/reviews (manager/marketing), who should I contact?

– Bob Smith
agent_bob_replit+review-bot@agentmail.to
Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1


EMAIL 3 — FOLLOW-UP / BREAKUP (Day 6–8)
Subject: Should I close the loop?

Hi {{first_name}},

Last note—should I close the loop, or is review response coverage something you want to improve this month?

If you’re open, I’ll:
1) draft responses for your last 5 reviews,
2) flag any that should be escalated,
3) share a simple weekly KPI snapshot (new reviews, rating, response coverage).

Reply “yes” and I’ll send the drafts, or “not now” and I’ll stop.

– Bob Smith
agent_bob_replit+review-bot@agentmail.to

============================================================
C) OPTIONAL VERTICAL-SPECIFIC 1-LINERS (drop-in after opening)
Use ONLY one line; keep it short.

Dentist:
- “Patients look at how practices handle feedback—especially scheduling and bedside manner comments.”
Med spa / aesthetics:
- “A fast, professional reply to service feedback protects the brand (and booking intent).”
HVAC / plumber:
- “Home service buyers often decide based on recent reviews + whether you respond when something goes wrong.”

============================================================
D) AGENCY / RESELLER OUTBOUND (for marketing agencies serving local SMB)

SUBJECTS
1) Add-on: review response autopilot for your clients
2) Quick reseller idea (reputation ops)

EMAIL 1 (Agency)
Hi {{first_name}},

If you manage local SMB clients (dentists/med spas/home services), we built a review response autopilot for Google/Yelp: brand-safe drafts, optional posting, negative-review escalation, and weekly KPI reporting.

It’s designed to be resold/white-labeled as an “always-on reputation ops” add-on. Your team can approve tone per client.

If you tell me your main client vertical, I’ll send a 1-page offer + sample responses you can forward.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick call?

– Bob Smith
agent_bob_replit+review-bot@agentmail.to

============================================================
E) DAILY SENDING OPS (14-DAY RAMP + RULES)

Tooling-agnostic process (free/low-cost friendly):
1) List QA (before sending)
- Verify category match (dentist / med spa / HVAC/plumbing). Avoid pure franchises unless owner-managed.
- Ensure the Google rating/review count/last review date are captured.
- Capture personalization snippet (short quote/paraphrase) + response gap note.
- Validate email format with a free checker if available; if not, send small batches first.

2) 14-day ramp (per inbox)
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
Rules: keep follow-ups on; total daily volume includes follow-ups. If you run 2 inboxes, split volume.

3) Daily targets (starting point)
- New emails/day: 30–50 (per warmed inbox)
- Follow-ups/day: 10–30
- Manual personalization: 30–60 seconds per lead (snippet + response gap)

4) Thresholds (pause if exceeded)
- Bounce rate > 3% in any 48-hour window: stop, clean list, fix invalid domains.
- Spam complaints: any spike or repeated complaints: stop and reduce volume + improve targeting.
- Reply SLA: respond to interested replies within 2 hours during business day.

5) Reply handling SOP
- Positive: propose 10-min call, ask: “Do you want approvals required before posting, or can we auto-post safe positives and escalate negatives?”
- Neutral: offer to send 2–3 drafted responses for their latest reviews.
- Negative: apologize, stop outreach, mark DNC.

============================================================
F) SIMPLE CRM PIPELINE (stages + entry/exit)
Stages:
1) Prospect (has email + GBP link)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked or replied)
4) Replied – Interested
5) Qualified (has Google/Yelp presence + review velocity + decision maker engaged)
6) Demo Booked
7) Trial / Pilot (drafted responses sent; approval workflow confirmed)
8) Paid
9) Lost (reason coded)

Required fields in CRM:
- vertical, segment, priority (A/B/C), city/state, rating, review_count, last_review_date, response_rate_proxy, last_touch_date, next_step, notes.

============================================================
G) WHAT I NEED FROM OWNER NEXT (to ship the 500–1,000 CSV)
Pick one geography scope:
A) Top 25 US metros (fastest, consistent)
B) 5–10 target states (if you have preferences)
C) US-wide (largest, more variance)

Then execute the zero-cost Google Maps workflow to create the CSV, or authorize a paid scraper route (requires separate approval). Once the CSV exists, we can finalize segmentation and start daily sending immediately using the sequence above.
