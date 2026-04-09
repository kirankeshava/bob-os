# Outbound Machine (Ready-to-Run): Segmented Cold Email Pack + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:45:43.964Z

---

BUSINESS LEGITIMACY LINKS (include in every email footer)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) SEGMENTATION + PRIORITY RULES (apply to every lead)
Segments:
A) NOT RESPONDING = owner replies in last 10 reviews <= 2 (<=20%) OR no owner replies visible.
B) LOW RATING = Google rating < 4.2.
C) HIGH VOLUME = total reviews >= 200 OR last review within past 14 days.
Priority scoring:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only
Routing:
- Not Responding → “response gap” email variant
- Low Rating → “recover + escalate negatives” email variant
- High Volume → “ops + consistency” email variant

2) COLD EMAILS — LOCAL BUSINESSES (3-step sequence)
IMPORTANT PERSONALIZATION TOKENS
{{first_name}} {{business_name}} {{city}} {{service_type}} {{google_rating}} {{review_count}} {{recent_review_snippet}} {{response_gap_note}} {{calendar_link}}
If quoting a review: keep it short (<= 1 sentence) and never mention protected attributes; if unsure, paraphrase.

2.1 DENTIST / DENTAL PRACTICE — INITIAL EMAIL (pick the segment variant)
SUBJECT OPTIONS:
- Quick fix for your Google reviews at {{business_name}}
- Noticed a review response gap
- Re: new Google review for {{business_name}}

BODY (NOT RESPONDING variant)
Hi {{first_name}} — quick note after looking at {{business_name}}’s Google reviews.

I noticed you’re getting steady reviews, but a lot aren’t getting a response ({{response_gap_note}}). That usually costs calls because prospects read the replies as much as the rating.

We run an AI review-reply + reputation autopilot: brand-safe draft replies within 12 hours, negative reviews get escalated, and you can approve everything before it posts.

If I send 2–3 sample replies to your most recent reviews (including this one: “{{recent_review_snippet}}”), would that be useful?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

BODY (LOW RATING variant)
Hi {{first_name}} — I was looking at {{business_name}} and saw your Google rating is around {{google_rating}}.

When a dental practice has even a few unresolved negative reviews (or no response), it can drag down new patient bookings.

We help by drafting and posting brand-safe responses (you approve), escalating negatives to you immediately, and sending weekly KPIs so you can see rating + response-rate trend.

Open to me drafting 2 sample replies (1 positive + 1 negative) based on your latest reviews? If yes, just reply “sample”.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

BODY (HIGH VOLUME variant)
Hi {{first_name}} — {{business_name}} has a strong review volume ({{review_count}}+). Keeping up with replies is a real ops job.

We run a lightweight review autopilot: responses drafted within 12 hours in your brand voice, negatives escalated, and a weekly KPI report (rating trend, response rate, time-to-first-response).

If you want, I can send sample replies to your latest 3 reviews (including “{{recent_review_snippet}}”) so you can see the tone.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

DENTIST — FOLLOW-UP #1 (2–3 days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — checking back.

If it helps, the quick win is: reply to every review (especially the 3–5 most recent) with a consistent voice + a simple escalation path for negatives.

Want me to send 2–3 example replies for {{business_name}}? (No login needed to start.)

— Bob | agent_bob_replit+review-bot@agentmail.to

DENTIST — FOLLOW-UP #2 (5–7 days later)
Subject: Close the loop?
Hi {{first_name}} — should I close the loop on this?

If reviews matter for new patient calls in {{city}}, we can usually improve response rate in week 1 and keep replies going within 12 hours thereafter.

Reply “yes” and I’ll send sample replies for your latest reviews, or “later” and I’ll check back next month.

— Bob

2.2 MED SPA / AESTHETICS — INITIAL EMAIL (same structure, different angle)
SUBJECTS:
- Quick help with med spa review replies
- Noticed unanswered reviews for {{business_name}}
- {{business_name}} reputation ops

BODY (NOT RESPONDING)
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews.

Med spas are ultra-sensitive to review tone, and I noticed a response gap ({{response_gap_note}}). Prospects often read replies to judge professionalism/safety.

We run an AI review-reply + reputation autopilot: draft replies within 12 hours, you approve, and negative reviews get escalated immediately.

Want me to send sample replies to your latest reviews (e.g., “{{recent_review_snippet}}”)?

— Bob | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP #1 and #2: same as dental (swap “patients” → “clients”, “procedure trust”).

2.3 HVAC / PLUMBING — INITIAL EMAIL
SUBJECTS:
- Missed calls from unanswered reviews?
- Quick review reply help for {{business_name}}
- Re: your latest Google review

BODY (NOT RESPONDING)
Hi {{first_name}} — quick note re: {{business_name}}’s Google reviews.

Home services buyers often pick the first company that looks responsive. I noticed several recent reviews without owner replies ({{response_gap_note}}).

We run a review-reply autopilot: brand-safe replies drafted within 12 hours, negative reviews escalated, and you can approve everything before it posts.

If I send 2–3 sample replies to your most recent reviews (like “{{recent_review_snippet}}”), would you want to see them?

— Bob | agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP #1 and #2: same as dental (swap “bookings” → “calls/jobs”).

3) AGENCY / RESELLER LANE (marketing agencies serving local verticals)
TARGETS: small agencies doing SEO/GBP management for dentists/med spas/home services.

AGENCY INITIAL EMAIL
Subject options:
- Add-on service: 12-hour review responses (white-label)
- Quick revenue add for your GBP clients
- Review response autopilot you can resell

Body:
Hi {{first_name}} — are you currently managing Google Business Profiles for local clients?

We built a review reply + reputation autopilot: brand-safe replies drafted within 12 hours, optional approval step, negative review escalation, and weekly KPI reporting.

Agencies resell it as a monthly add-on (white-label or co-branded). If you tell me your main vertical (dentist / med spa / home services), I’ll send a sample workflow + pricing structure that leaves you margin.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

AGENCY FOLLOW-UP #1
Subject: Re: review replies for your clients
If you have 10+ GBP clients, this is usually the easiest retention lever: response rate and time-to-first-response.

Want a 10-minute walkthrough + a sample report agencies forward to clients weekly?

AGENCY FOLLOW-UP #2
Subject: Close the loop?
Should I send the sample workflow + reseller pricing, or is review management not a focus right now?

4) OUTBOUND OPS CHECKLIST (DAILY / WEEKLY)
TOOLS (free-first): Google Sheets for CRM/list, Gmail/Workspace inbox, manual tracking links, optional free HubSpot CRM.

LIST QA (every batch of 50 leads)
- Confirm category matches vertical (dentist/med spa/HVAC/plumber) and not a franchise directory listing.
- Confirm rating + review count recorded.
- Capture last review date.
- Compute response-rate proxy from last 10 reviews (count owner responses).
- Capture 1 safe personalization snippet (quote 1 sentence max, or paraphrase).

SENDING LIMITS / RAMP (per inbox)
Day 1: 15 new sends
Day 2: 20
Day 3: 25
Day 4: 30
Day 5: 35
Day 6: 40
Day 7: 45
Day 8–14: 50/day (only if bounce <3% and spam complaints = 0)
Follow-ups: schedule F1 at +2–3 days, F2 at +5–7 days.

BOUNCE / COMPLAINT THRESHOLDS
- If hard bounce rate > 3% in a day: stop sending, clean list, verify emails.
- Any spam complaint: pause campaign, reduce volume, adjust copy, remove risky segments.

REPLY HANDLING SLA
- Reply within 2 business hours.
- If positive interest: ask for GBP access readiness + offer to send sample replies immediately.
- If objection “we already respond”: ask about time-to-first-response and consistency; offer KPI report + draft assistance.

5) CRM PIPELINE (simple stages + entry/exit)
Stages:
1) Prospect (has email + segmentation + snippet)
2) Sent (initial email sent)
3) Replied
4) Qualified (confirmed decision-maker + has GBP/Yelp reviews + pain)
5) Demo Booked
6) Trial / Samples Sent
7) Paid
8) Lost (no fit / not now / no response after 2 follow-ups)

KPIs TO TRACK WEEKLY
- New prospects added
- Emails sent
- Reply rate
- Positive reply rate
- Demos booked
- Trials/samples sent
- Paid conversions

6) LEAD LIST BUILD TARGETS (so you actually reach 500–1,000)
Daily production targets (manual/VA using Google Maps):
- 50–75 leads/day with full rating/review count/last review date
- 25–40 leads/day with response-rate proxy (from last 10 reviews) + snippet (this is slower)
Recommended: collect 1,000 basic rows first, then enrich top 300 Priority A/B with response-proxy + snippets for higher personalization.

NEXT OWNER DECISION (required to execute list build consistently)
Choose geography scope:
A) Top 25 US metros (fastest to standardize, high density)
B) 5–10 target states (good if you want regional focus)
C) US-wide (broadest, but list consistency suffers)
Once chosen, use a repeating pattern: vertical × metro/state → pull 100–200 per bucket until 1,000 rows.