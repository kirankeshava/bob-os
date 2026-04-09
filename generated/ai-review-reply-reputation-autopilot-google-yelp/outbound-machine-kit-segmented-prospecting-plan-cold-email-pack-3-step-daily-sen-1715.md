# Outbound Machine Kit — Segmented Prospecting Plan + Cold Email Pack (3-Step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:47:22.232Z

---

BUSINESS LEGITIMACY (include in outreach)
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) TARGET VERTICALS (start with these 3)
A) Dentists (high intent, high LTV, constant review flow)
B) Med spas / aesthetics (high competition, review sensitivity, high LTV)
C) HVAC + plumbers (local SEO matters, after-hours reviews, high velocity)
Parallel lane: Marketing agencies serving these verticals (resell/white-label)

2) SEGMENTATION + PRIORITY (use Google rating + review velocity + response behavior)
Core fields to collect per lead: google_rating, review_count, last_review_date, response_rate_proxy_last10.
- response_rate_proxy_last10 = (# of last 10 reviews with an owner response) / 10
Segments:
- NOT_RESPONDING: response_rate_proxy_last10 <= 0.2 OR 0 owner responses in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date <= 14 days
Priority routing:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Send the copy variant that matches the primary pain:
- NOT_RESPONDING → “response gap / missed revenue / we reply within 12 hours” angle
- LOW_RATING → “damage control + escalation + get back to 4.5+” angle
- HIGH_VOLUME → “throughput + weekly KPIs + consistency” angle

3) PERSONALIZATION TOKENS (safe + fast)
Use 1 of these lightweight hooks (do not overfit):
- {{recent_review_snippet}}: 6–14 words quoted OR paraphrased from latest review.
- {{response_gap}}: “looks like the last few reviews didn’t get an owner reply” (only if true).
- {{kpi_observation}}: “{{review_count}} reviews and last review on {{last_review_date}}”
Rules:
- If review mentions medical details, finances, or sensitive info: paraphrase (don’t quote).
- Never imply you are affiliated with Google/Yelp.

4) COLD EMAIL PACK (3-step sequence)

4.1 DENTAL — NOT RESPONDING (Priority A/B)
Subject options:
1) Quick note about your recent reviews
2) A simple fix for review responses at {{business_name}}
3) Re: Google reviews

Email 1 (Day 1)
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews — saw “{{recent_review_snippet}}” and it looks like a few recent reviews didn’t get an owner response.

We run a Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies to every Google/Yelp review within 12 hours, escalation when a negative review hits, and a weekly KPI report. You can approve replies before anything posts.

If you want to sanity-check it, I can draft responses for your last 10 reviews (free, no commitment). You can see the quality first.

Worth trying? If yes, reply with “yes” and I’ll send the drafts.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: review replies
Hi {{first_name}} — quick follow-up.

Even a short owner reply tends to lift conversion from Maps (patients compare offices fast). If you share your Google Business Profile link, I’ll draft responses for the 10 most recent reviews and flag any that need escalation.

Want me to do that?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (Day 7)
Subject: Should I close the loop?
Hi {{first_name}},

Should I close the loop, or would it be helpful if I just sent 3 sample replies in your practice’s tone (friendly/professional) so you can judge fit?

If you reply with “sample,” I’ll send them today.
— Bob


4.2 DENTAL — LOW RATING (Priority A/B)
Subject options:
1) Getting back above 4.5 at {{business_name}}
2) Quick idea re: negative reviews
3) Reputation quick fix

Email 1
Hi {{first_name}},

Noticed {{business_name}} is at {{google_rating}} on Google. In dental, that small difference (4.0 vs 4.6) can change call volume.

We help by responding quickly and consistently (Google + Yelp), escalating negatives the same day, and tracking weekly reputation KPIs. Replies are brand-safe and you can approve before posting.

I can draft responses for your most recent negative/neutral reviews for free so you can see the approach.

Open to that?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
If you send the links to your Google + Yelp pages, I’ll return:
- draft replies (in your tone)
- which reviews should be escalated
- a simple weekly KPI snapshot template

Want me to put that together?

Follow-up 2
Totally fine if timing’s bad. If you reply “later,” I’ll circle back in a month. If you reply “links,” I’ll send drafts within 12 hours.


4.3 DENTAL — HIGH VOLUME (Priority C)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Review response workflow for {{business_name}}
3) Quick ops question

Email 1
Hi {{first_name}},

{{business_name}} has {{review_count}} Google reviews and it looks like you’re getting them consistently. The operational problem is just keeping replies timely and consistent.

We run an autopilot workflow: draft replies within 12 hours, you approve (or set rules), we post, and we send a weekly KPI report so you can see response rate, rating trend, and negative-review escalations.

Want me to show you what the workflow would look like on your last 10 reviews?
— Bob


4.4 MED SPA — NOT RESPONDING
Subject options:
1) Reviews for {{business_name}}
2) Quick fix for review response speed
3) Re: Google/Yelp

Email 1
Hi {{first_name}},

Saw a recent review mentioning “{{recent_review_snippet}}” — and it looks like some recent reviews didn’t get a response.

Because med spas are comparison-shopped, fast replies matter. We draft brand-safe responses to Google + Yelp reviews within 12 hours, escalate negatives immediately, and send a weekly KPI summary. You can approve before anything posts.

Want me to draft replies for your last 10 reviews for free so you can review tone/style?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
If you reply with your Google Business Profile link, I’ll send drafts today + flag any reviews that should be escalated.

Follow-up 2
Should I close this out, or send 3 sample replies in a “premium + warm” brand voice?


4.5 MED SPA — LOW RATING
Subject options:
1) Repairing reputation at {{business_name}}
2) Quick idea to lift your Google rating
3) Negative review response help

Email 1
Hi {{first_name}},

Noticed {{business_name}} is at {{google_rating}} on Google. In aesthetics, that rating is often the first thing prospects filter by.

We help you respond quickly (Google/Yelp), keep tone brand-safe, escalate negatives same day, and track weekly KPIs. Approval-first so nothing posts without your OK.

If you want, I’ll draft responses for the last 10 reviews (including any negatives) for free.

Interested?
— Bob


4.6 HVAC/PLUMBING — NOT RESPONDING
Subject options:
1) Missed calls from missed review replies
2) Quick note about your recent reviews
3) Review responses for {{business_name}}

Email 1
Hi {{first_name}},

Checked {{business_name}}’s recent reviews — saw “{{recent_review_snippet}}” and it looks like some recent reviews didn’t get a response.

Home services is a “call-the-first-trusted-company” game. We draft and post brand-safe responses to Google/Yelp reviews within 12 hours, escalate negative reviews immediately, and send a weekly KPI report (response rate, rating trend, negatives flagged). You can approve before posting.

Want me to draft replies for your last 10 reviews for free so you can see quality?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
If you reply “yes,” I’ll send drafts today. If you reply with your GBP link, I’ll pull the reviews myself.

Follow-up 2
Last nudge—want 3 sample replies in your tone (straightforward, service-first) so you can judge fit?


4.7 AGENCY / RESELLER (MARKETING AGENCIES)
Subject options:
1) Add-on your clients will actually keep
2) White-label review response ops
3) Quick partnership idea

Email 1
Hi {{first_name}},

You already help local businesses win on search/ads—reviews are the conversion layer that often gets ignored.

We run a Review Reply & Reputation Autopilot (Google + Yelp): brand-safe draft replies within 12 hours, negative-review escalation, and a weekly KPI report. It’s easy to white-label, and your clients can approve replies before posting.

If you tell me your main verticals (dentist/med spa/home services), I’ll send a 1-page partner workflow + a free sample pack (draft replies for one of your clients).

Open to a quick call, or should I email the 1-pager?
— Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

5) DAILY SENDING OPS (ZERO-SPEND FRIENDLY)

5.1 CRM stages (Google Sheet or Airtable free)
- Prospect (has required fields)
- Queued (has segment + priority + template assigned)
- Sent (date/time logged)
- Replied
- Qualified (pain confirmed + right role)
- Demo booked
- Trial active (7-day free)
- Paid (post-week-1)
- Lost (reason)

5.2 14-day ramp (per inbox)
Day 1-2: 20 emails/day
Day 3-4: 30/day
Day 5-7: 40/day
Day 8-14: 50/day
Rules: keep to plain text, 1 link max (the website), no attachments, no tracking pixels if possible. If bounce rate >3% in a day, stop and clean list.

5.3 Daily checklist (60–90 minutes)
1) Pull 20–50 new leads from the segmented list (Priority A first).
2) QA each: correct category, real local business, has Google listing, rating/review count captured.
3) Personalize: add {{recent_review_snippet}} and check {{response_gap}} is true.
4) Send new emails + schedule follow-ups (Day 3, Day 7).
5) Handle replies within SLA:
   - Positive reply → propose 10-min call or offer free sample drafts immediately.
   - Objection ("we do it") → ask who owns it + offer to cover weekends/after-hours.
   - Unsubscribe → mark Do Not Contact.
6) KPI log daily: sent, delivered, replies, positive replies, demos booked.

5.4 Reply-handling SLA + escalation positioning
- SLA: respond to inbound within 2 hours during business day.
- Escalation promise (in offer): “negative reviews flagged same day; we draft a response + suggested next step.”

6) NEXT EXECUTION STEP (to unlock revenue)
Pick geography scope for list build:
Option A: Top 25 US metros (fastest, broad)
Option B: 5–10 states (tight, more consistent compliance)
Option C: US-wide (largest but messier)
Then build first 200 leads in 48 hours using the Google Maps workflow, start sending at 20/day immediately, and iterate messaging based on reply reasons.