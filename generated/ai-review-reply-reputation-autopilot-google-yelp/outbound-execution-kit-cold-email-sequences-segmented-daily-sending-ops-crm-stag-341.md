# Outbound Execution Kit — Cold Email Sequences (Segmented) + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:25:35.986Z

---

Business proof link to include in emails (do not remove): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply/contact email to include: agent_bob_replit+review-bot@agentmail.to

============================================
1) ICP + SEGMENTS (used to route messaging)
============================================
Target verticals (high review velocity + LTV):
A) Dentists / Dental Practices
B) Med Spas / Aesthetics / Dermatology clinics
C) HVAC + Plumbing (home services)
D) Agency lane (local SEO/reputation agencies serving the above)

Core fields to collect per lead (minimum for outbound):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (responses in last 10 reviews / 10)
- segment
- priority_tier
- personalization_snippet (last review excerpt or paraphrase)
- contact_name (if found)
- role_guess (owner/manager/office manager/marketing)
- email_1, email_2

Segmentation rules:
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR 0 owner responses in last 10 reviews
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days

Priority scoring (for send order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: (NOT_RESPONDING) OR (LOW_RATING)
- Priority C: HIGH_VOLUME only

Template routing:
- NOT_RESPONDING -> “response gap” template
- LOW_RATING -> “negative review escalation + brand-safe” template
- HIGH_VOLUME -> “throughput + 12-hour SLA + weekly KPIs” template

Personalization snippet rules (brand-safe):
- You may quote a short phrase (5–12 words) from the most recent review.
- If the review is sensitive (medical details, staff names, allegations), paraphrase at a high level (e.g., “wait time feedback” / “billing confusion”) instead of quoting.
- Never mention health conditions, procedures, or personally identifying details.

============================================
2) COLD EMAIL COPY — LOCAL BUSINESSES (3-step)
============================================
Tokens:
{{business_name}} {{city}} {{first_name}} {{vertical}} {{recent_review_snippet}} {{rating}} {{review_count}} {{last_review_date}} {{response_gap_fact}}

--------------------------------------------
2A) INITIAL EMAIL — NOT RESPONDING VARIANT
--------------------------------------------
Subject options (pick 1):
1) Quick question about your Google reviews
2) Noticed a response gap at {{business_name}}
3) 12-hour review responses for {{business_name}}?

Body:
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}}’s Google reviews and saw a recent one mentioning: “{{recent_review_snippet}}.” {{response_gap_fact}}

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google Business Profile + Yelp, escalates negative reviews for approval, and sends a simple weekly KPI report.

Offer: we respond within 12 hours (you can approve before posting). If a review is negative, we flag it and propose a recovery response + next step.

If I send 2 sample replies for your latest reviews (no login needed), would you want to see them?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Or reply here: agent_bob_replit+review-bot@agentmail.to

— Bob

--------------------------------------------
2B) INITIAL EMAIL — LOW RATING VARIANT
--------------------------------------------
Subject options:
1) Quick fix for reputation recovery
2) About your recent Google feedback
3) Helping {{business_name}} protect ratings

Body:
Hi {{first_name}} — Bob here.

I noticed {{business_name}} is sitting around {{rating}}★ on Google, and a recent review mentioned “{{recent_review_snippet}}.”

We built an AI Review Reply & Reputation Autopilot for local businesses: it drafts brand-safe responses for Google/Yelp, escalates negative reviews for approval, and tracks weekly reputation KPIs (rating trend, response rate, time-to-response).

The goal isn’t generic “AI replies”—it’s preventing silent negatives and turning unhappy reviewers into resolved conversations.

Open to a 10-minute walkthrough? If not, I can send 2 suggested responses you can paste today.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

— Bob

--------------------------------------------
2C) INITIAL EMAIL — HIGH VOLUME VARIANT
--------------------------------------------
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Review replies within 12 hours
3) Weekly reputation KPI report for {{business_name}}

Body:
Hi {{first_name}} — I’m Bob.

{{business_name}} has ~{{review_count}} reviews and your last review was {{last_review_date}}. When volume is high, reply speed and consistency usually drop—even when service is great.

Our AI Review Reply & Reputation Autopilot drafts on-brand replies for Google Business Profile + Yelp, posts after approval (or auto-post rules), escalates negatives, and emails a weekly KPI snapshot.

Would it help if your reviews were responded to within 12 hours without adding work for your team?

If you say “yes,” I’ll send a couple sample replies for your most recent reviews.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

— Bob

--------------------------------------------
2D) FOLLOW-UP #1 (send 2 business days later)
--------------------------------------------
Subject: Re: {{business_name}} reviews

Hi {{first_name}}, quick follow-up.

If you send me the link to your Google Business Profile (or confirm it’s the one I found), I’ll draft 2 sample replies:
- 1 for a positive review (reinforce keywords + gratitude)
- 1 for a critical review (de-escalation + next step)

No access needed. If the samples look good, we can set up the autopilot so you get:
- replies within 12 hours
- negative review escalation
- weekly KPI email

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

— Bob

--------------------------------------------
2E) FOLLOW-UP #2 (send 4–5 business days later)
--------------------------------------------
Subject: Should I close this out?

Hi {{first_name}} — last note.

Usually one of these is true:
1) someone is already replying daily to reviews, or
2) it’s on the list but never urgent until a negative goes unanswered.

If you’re open to it, I can send the 2 sample replies and a 1-page KPI snapshot format (response rate, time-to-response, rating trend).

If not a fit, just reply “pass” and I’ll stop.

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

============================================
3) AGENCY / RESELLER LANE (1 initial + 2 follow-ups)
============================================
Who to target:
- Local SEO agencies, reputation management agencies, web agencies serving dentists/med spas/home services.
Offer positioning:
- White-label or “powered by” review response automation
- SLA: draft replies in 12 hours
- Agency keeps margin; you provide tooling + reporting

Agency Initial Email:
Subject options:
1) Add review replies to your retainer (without hiring)
2) White-label review response autopilot
3) For your dental/med spa clients

Body:
Hi {{first_name}} — Bob here.

If you manage local clients (dentists/med spas/home services), you’ve probably seen reviews become a retention issue when replies are inconsistent.

We built an AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp:
- brand-safe draft replies
- negative review escalation + approval
- weekly KPI report per location
- optional white-label / reseller setup

Would you like to test it on 1 client location? I can generate sample replies from their latest reviews (no access needed).

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

— Bob

Agency Follow-up #1:
Subject: Re: review replies for your clients

Want me to send:
- a sample weekly KPI report format
- 2 sample replies for one of your clients’ latest reviews

If yes, reply with the GBP link + the brand voice (friendly/professional/concise).

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

Agency Follow-up #2:
Subject: Close the loop

Should I close this out, or is there someone on your team who owns reputation / GBP work?

If you reply “introduce,” I’ll send a 3-bullet summary they can forward internally.

— Bob

============================================
4) DAILY SENDING OPS (14-day ramp + targets)
============================================
Assumptions (adjust based on your inbox count):
- Start conservative to protect deliverability.
- Use plain text emails, no attachments.
- Always include a real reply-to (agent_bob_replit+review-bot@agentmail.to can be in signature as alternate contact).

Daily activity targets (once ramped):
- New outbound emails: 50–100/day (total across inboxes)
- Follow-ups: 1–2 follow-ups per new email volume (keep steady)
- Manual personalization: 30–60 seconds per Priority A lead
- DMs (optional): 5–10/day to owners/managers (LinkedIn / FB)

14-day sending ramp (per inbox; if multiple inboxes, split volume evenly):
Day 1–2: 10/day (highly personalized, Priority A only)
Day 3–4: 15/day
Day 5–6: 20/day
Day 7–8: 25/day
Day 9–10: 30/day
Day 11–12: 35/day
Day 13–14: 40/day
Then: 40–50/day/inbox if bounce+complaint rates are safe.

List QA rules (before sending):
- Remove franchises/mega-chains unless multi-location offer is ready.
- Ensure category match (dental vs med spa vs HVAC/plumbing).
- Verify website exists (or strong GBP presence).
- Exclude businesses with near-perfect response behavior (response_rate_proxy >= 0.8) unless HIGH_VOLUME and you pitch KPI reporting.

Bounce/complaint thresholds (stop + fix if breached):
- Hard bounce rate > 3% in a day: pause new sends, re-check emails.
- Spam complaints > 0.1%: reduce volume, simplify copy, improve targeting.
- Reply rate target: 1–3% early; 3–8% once personalization improves.

Reply handling SLA:
- Respond to positive replies within 2 hours during business day.
- If they ask pricing: offer “send 2 sample replies first” + book demo.
- If they object “we handle it”: ask about response time + negative escalation; offer KPI-only reporting.

============================================
5) CRM PIPELINE STAGES (simple + enforceable)
============================================
Stages + entry/exit criteria:
1) Prospect (lead is in CSV, segmented, email validated)
2) Queued (assigned template variant + scheduled send date)
3) Sent (initial email sent)
4) Follow-up Due (no reply after X days; schedule FU #1 and #2)
5) Replied (any response)
6) Qualified (pain confirmed: low response rate / negative reviews / high volume; decision maker identified)
7) Demo Booked (meeting scheduled)
8) Trial/Proof (sent sample replies or pilot running)
9) Paid (converted)
10) Lost (explicit “no” or no response after full sequence + final bump)

Required CRM fields:
- Segment, Priority, Template Variant
- Last touch date, Next touch date
- Notes (objections, tools they use, who posts replies)

============================================
6) WHAT YOU NEED FROM OWNER NEXT (NO SPEND)
============================================
1) Pick geography for the first list build: Top 25 US metros vs 5–10 states vs US-wide.
2) Decide daily list-building capacity (you vs VA): target 50–100 leads/day until 500–1,000.
3) Start with Priority A only for week 1 to maximize replies while deliverability warms.

If you want, I can also produce a one-page “VA instruction sheet” that tells a VA exactly how to collect each column (including response_rate_proxy from the last 10 reviews) and how to safely paraphrase review snippets.
