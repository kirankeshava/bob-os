# Outbound Machine Kit — AI Review Reply & Reputation Autopilot (Google/Yelp): Segmentation Plan + 3-Step Cold Email Pack + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:39:15.569Z

---

Business proof/refs to use in outreach
- Website (include in signature + when asked for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email (reply-to / booking): agent_bob_replit+review-bot@agentmail.to

A) Segmented prospecting plan (what to target first)
Verticals (2–3 to start)
1) Dental practices
2) Med spas / aesthetic clinics
3) HVAC / Plumbing (home services)

Core segments (use for targeting + copy angle)
1) NOT RESPONDING
- Definition: response_rate_proxy <= 20% OR 0 owner responses in last 10 reviews
- Angle: “You’re leaving revenue on the table—fast, brand-safe replies within 12 hours; you approve.”

2) LOW RATING
- Definition: Google rating < 4.2 (or Yelp < 4.0 if you track Yelp)
- Angle: “Triage + escalation + consistent responses to stop the bleeding; route negatives to manager instantly.”

3) HIGH VOLUME
- Definition: review_count >= 200 OR last_review_date within last 14 days
- Angle: “Ops throughput—never miss a review; weekly KPI report; consistent voice.”

Priority tiers (who gets emailed first)
Priority A
- (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME)
Priority B
- NOT RESPONDING OR LOW RATING
Priority C
- HIGH VOLUME only

Minimum viable fields to collect per lead (for personalization + segmentation)
- business_name, vertical, city_state
- website, phone, google_maps_url
- google_rating, review_count, last_review_date
- response_rate_proxy (owner responses in last 10 reviews / 10)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (short quote OR paraphrase of most recent review; see “safe snippet rules” below)
- contacts: owner_or_manager_name (guess OK), role_guess, email_1, email_2

Safe snippet rules (don’t cause creepiness)
- Prefer paraphrase over direct quote when possible (e.g., “saw a recent review mentioning wait time”).
- If quoting: keep to <= 8–12 words; do not include full name of reviewer.
- Never mention health details, procedures, or sensitive personal info.

B) Cold email copy — 3-step sequence (direct-to-local). Includes segment variants.

Universal sender signature (use on all emails)
—
Bob
AI Review Reply & Reputation Autopilot (Google/Yelp)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Tokens (fill from your lead sheet)
{{first_name}} (or “Hi there”)
{{business_name}}
{{city}}
{{vertical}} (dental / med spa / HVAC)
{{recent_review_snippet}} (safe paraphrase)
{{response_gap}} (e.g., “looks like the last few reviews didn’t get a reply”)
{{rating}} / {{review_count}} / {{last_review_date}}

1) DENTAL — Initial email (choose by segment)

DENTAL / NOT RESPONDING — Email 1
Subject options:
- Quick question about your Google reviews
- Re: reviews for {{business_name}}
- Noticed a response gap
Body:
Hi {{first_name}} — quick note.

I saw a recent Google review for {{business_name}} mentioning “{{recent_review_snippet}}” and {{response_gap}}.

We run an AI-assisted review reply autopilot for local practices: brand-safe draft replies for Google/Yelp, negative-review escalation to a manager, and a simple weekly KPI report. Typical promise: replies within 12 hours, and you can approve before anything posts.

Open to a 10-minute call this week to see if we can take review responses off your plate?

— Bob (signature)

DENTAL / LOW RATING — Email 1
Subject options:
- Idea to lift your rating (without incentives)
- Quick fix for review triage
- Review response system for {{business_name}}
Body:
Hi {{first_name}},

Noticed {{business_name}} is around {{rating}} on Google and a recent review mentioned “{{recent_review_snippet}}”. When negatives sit unanswered, they tend to stack.

We help practices respond fast + consistently (Google/Yelp), and we escalate negative reviews immediately so the right person can step in. You approve responses if you want, and we track weekly KPIs (rating trend, response rate, negative themes).

Worth a quick call? If you share your GBP link, I can send 3 example replies in your tone.

— Bob (signature)

DENTAL / HIGH VOLUME — Email 1
Subject options:
- Keeping up with review volume at {{business_name}}
- Quick help replying to reviews
- Review ops for dental practices
Body:
Hi {{first_name}},

{{business_name}} gets a steady stream of reviews ({{review_count}} total; last one on {{last_review_date}}). Many practices want to respond to every review but it’s a time sink.

We draft and post brand-safe replies for Google/Yelp, flag negatives for manager attention, and send a weekly reputation KPI snapshot. Goal: consistent voice + no missed reviews.

Would it be crazy to chat for 10 minutes and see if this saves you time each week?

— Bob (signature)

DENTAL — Follow-up 1 (Email 2, send ~2–3 days later)
Subject: Re: {{business_name}}
Body:
Hi {{first_name}} — circling back.

If I send 3 sample responses (1 positive, 1 neutral, 1 negative-style) based on your recent reviews, would that be helpful? No commitment—just showing what “brand-safe + fast” looks like.

Should I send them here, or is there a better email for whoever owns review responses?

— Bob

DENTAL — Follow-up 2 (Email 3, send ~5–7 days after Email 1)
Subject: Close the loop?
Body:
Hi {{first_name}}, last ping.

Do you want to:
A) keep review replies in-house,
B) have us draft replies for approval, or
C) have us run autopilot + escalate negatives?

Reply with A/B/C and I’ll point you to the right next step.

— Bob

2) MED SPA — Initial email (choose by segment)

MED SPA / NOT RESPONDING — Email 1
Subject options:
- Quick question about your reviews
- Response gap on Google reviews?
- Re: {{business_name}}
Body:
Hi {{first_name}},

Saw a recent review for {{business_name}} mentioning “{{recent_review_snippet}}” and {{response_gap}}.

We help med spas respond quickly and consistently on Google/Yelp using an AI-assisted workflow (brand-safe drafts, optional approval, and negative-review escalation). Most owners just want “done” without risking off-brand replies.

Open to a quick 10-minute call this week?

— Bob (signature)

MED SPA / LOW RATING — Email 1
Subject options:
- Quick triage for negative reviews
- Improve response rate + consistency
- Simple system for reviews
Body:
Hi {{first_name}},

Noticed {{business_name}} is around {{rating}} and a recent review referenced “{{recent_review_snippet}}”. When response times lag, the rating narrative can drift.

We run a review-response system for Google/Yelp: fast replies, consistent brand voice, and immediate escalation of negatives so you can recover the relationship offline.

If you want, I can send a quick “before/after” response style guide (3 examples) tailored to your brand.

— Bob

MED SPA / HIGH VOLUME — Email 1
Subject options:
- Keeping up with review volume
- Review reply ops for med spas
- Never miss a review again
Body:
Hi {{first_name}},

You’re getting frequent reviews ({{review_count}} total; last on {{last_review_date}}). Responding to all of them is great for trust, but it’s hard to keep up.

We draft/post brand-safe replies for Google/Yelp, route negatives to the right person immediately, and send weekly KPIs (response rate, themes, rating trend).

Worth 10 minutes to see if it fits your workflow?

— Bob

MED SPA — Follow-ups (reuse the Dental Email 2 and Email 3 verbatim).

3) HVAC/PLUMBING — Initial email (choose by segment)

HOME SERVICES / NOT RESPONDING — Email 1
Subject options:
- Quick question about your reviews
- Re: Google reviews for {{business_name}}
- Response gap I noticed
Body:
Hi {{first_name}},

I saw a recent review for {{business_name}} mentioning “{{recent_review_snippet}}” and {{response_gap}}.

We run an AI-assisted review reply autopilot for local home service companies: fast, brand-safe replies on Google/Yelp, negative-review escalation, and a weekly KPI report. You can approve responses before posting (or let it run autopilot).

Open to a quick 10-minute call?

— Bob

HOME SERVICES / LOW RATING — Email 1
Subject options:
- Quick idea to protect your rating
- Review triage system for {{business_name}}
- Can you route negatives faster?
Body:
Hi {{first_name}},

Noticed {{business_name}} is around {{rating}} and a recent review mentioned “{{recent_review_snippet}}”. In home services, a few unanswered negatives can cost calls.

We help teams respond quickly + consistently on Google/Yelp, and we escalate negative reviews immediately so a manager can step in.

Want me to send 3 example replies in your company tone?

— Bob

HOME SERVICES / HIGH VOLUME — Email 1
Subject options:
- Keeping up with reviews at scale
- Review reply ops (Google/Yelp)
- Quick help with review responses
Body:
Hi {{first_name}},

You have strong review volume ({{review_count}}; last on {{last_review_date}}). Responding to every review is great for conversion, but it’s operationally annoying.

We draft and post brand-safe replies, flag negatives, and provide weekly KPIs so you know you’re covered.

Worth 10 minutes to see if it saves you time?

— Bob

HOME SERVICES — Follow-ups (reuse the Dental Email 2 and Email 3 verbatim).

C) Agency/reseller email (marketing agencies serving these verticals)

AGENCY — Email 1
Subject options:
- Add “review response” to your retainers
- White-label review replies for your clients
- Quick reseller idea
Body:
Hi {{first_name}},

Do you manage Google Business Profile or reputation for local clients (dentists/med spas/home services)?

We built an AI-assisted review response autopilot that drafts/posts brand-safe replies for Google/Yelp, escalates negative reviews, and sends weekly KPI reporting. It’s designed to be reseller-friendly: you can position it as part of your reputation/GBP package.

If you want, I can share a simple white-label workflow + pricing so you can add it to retainers without extra headcount.

Open to a 15-minute call?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

AGENCY — Email 2
Subject: Re: reseller workflow
Body:
Quick bump—should I send (1) a reseller margin example and (2) a screenshot-style overview of the weekly KPI report format?

— Bob

AGENCY — Email 3
Subject: Close the loop
Body:
If this isn’t a fit, no worries—reply “pass.” If it is, reply “info” and I’ll send the reseller workflow + suggested packaging.

— Bob

D) Daily sending ops checklist (14-day ramp + CRM)

Tooling (free-first guidance)
- Start with 1 inbox until replies prove offer-market fit.
- Track in Google Sheets as a simple CRM if you don’t have one.

14-day ramp (per inbox; adjust if using more inboxes)
Days 1–2: 10–15 new sends/day (only Priority A)
Days 3–4: 20–30/day
Days 5–7: 35–50/day
Week 2: 60–100/day if bounce rate < 3% and complaints = 0

Daily workflow (60–90 minutes)
1) Pull 20–100 new prospects from list (Priority A then B).
2) Personalize first line using safe paraphrase snippet.
3) Send Email 1.
4) Send scheduled follow-ups to non-responders (Email 2 then Email 3).
5) Handle replies within SLA (below) and update CRM stage.

List hygiene rules (non-negotiable)
- Verify category relevance (avoid franchises with corporate review ops).
- Avoid businesses with no website (harder to find decision maker email).
- If email bounces: remove domain and find alternate contact.

Deliverability guardrails
- If bounce rate > 3% in any 24h window: pause new sends, fix list.
- If spam complaints >= 1: pause, reduce volume, tighten targeting/personalization.
- Keep links minimal (website link only in signature is fine).

Reply-handling SLAs
- Positive reply / interest: respond within 2 hours during business day.
- “Not me”: ask for correct contact.
- “No”: mark Lost; do not re-email.

CRM stages (simple pipeline)
1) Prospect (lead meets criteria)
2) Sent (Email 1 sent)
3) Follow-up Sent (Email 2/3 sent)
4) Replied
5) Qualified (has GBP/Yelp, acknowledges pain, decision maker)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (reason: no need, wrong contact, timing, competitor)

KPIs to track weekly
- Sent, Open (optional), Reply rate, Positive reply rate
- Meetings booked
- Trials started
- Paid conversions
- Deliverability: bounce rate, complaint rate

Owner decision needed to execute next (blocking item)
Choose initial geography for the first 500–1,000 leads:
A) Top 25 US metros (fastest learning, densest)
B) 5–10 target states (if you want closer time zones/industry concentration)
C) US-wide (largest but noisier)
Once chosen, run the Google Maps query pack and start building 50–100 leads/day until you hit 500–1,000, then begin sending with the ramp schedule above.