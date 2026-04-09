# Outbound Machine (Ready-to-Run): Segmented Prospecting Plan + 3-Step Cold Emails + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:15:10.775Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp). Drafts and (where permitted) posts brand-safe responses, escalates negative reviews, and reports weekly reputation KPIs.
Proof URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (2–3 to start)
A) Dentists (private practices, multi-chair). Why: consistent review velocity, high LTV patient value, front-desk overloaded.
B) Med spas / aesthetic clinics. Why: reviews heavily influence bookings; high sensitivity to tone/brand.
C) HVAC + plumbing (home services). Why: high review volume, rapid response expectation, missed calls + poor review handling = direct revenue loss.
Parallel lane: Marketing agencies serving these verticals (resell/refer for multiple locations).

2) SEGMENTATION + PRIORITY ROUTING (USE IN CSV)
Required fields for segmentation: google_rating, review_count, last_review_date, response_rate_proxy (owner responses in last 10 reviews / 10).
Segments:
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR 0 owner responses in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days
Priority score (operational, for send order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Template mapping:
- NOT_RESPONDING → “response gap / speed / brand-safe approvals” angle
- LOW_RATING → “damage control / escalation / consistency” angle (be sensitive)
- HIGH_VOLUME → “throughput / workload / weekly KPI report” angle

3) LEAD LIST BUILD (ZERO-COST WORKFLOW)
Goal: first 200 leads in 48 hours; scale to 500–1,000 in week 1.
Inputs (choose geography):
Option 1: Top 25 US metros; Option 2: 5–10 states; Option 3: US-wide.
Google Maps query format (per metro):
- “dentist + {city}” / “cosmetic dentist + {city}”
- “med spa + {city}” / “aesthetic clinic + {city}”
- “hvac + {city}” / “plumber + {city}”
Data capture columns (CSV headers):
business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes
How to capture response_rate_proxy quickly:
- Open business → Reviews → scan last ~10 reviews; count visible owner replies; response_rate_proxy = replies/10.
Personalization_snippet rule:
- Use a short excerpt (8–15 words) from the most recent review OR paraphrase; do not include health details, protected info, or anything sensitive. If the review is negative, reference category-level issue (e.g., “wait time” / “communication”) rather than quoting harsh phrasing.
Email sourcing (no spend):
- Prefer website “Contact” page, footer, and About/Team pages.
- If no email: use contact form URL (store as email_1=“FORM:{url}”) and still include in pipeline.

4) COLD EMAIL COPY (3-STEP) — DIRECT-TO-LOCAL
Tokens to personalize:
{{first_name}} (or “there”), {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}} (e.g., “no owner replies on recent reviews”), {{proof_url}}

4.1 DENTIST — NOT_RESPONDING (Primary)
Subject options:
1) Quick fix for your Google reviews
2) {{business_name}} — replying to reviews
3) Small reputational gap (easy win)

Email 1 (Day 1)
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews in {{city}}.

Noticed {{response_gap}} (e.g., “many recent reviews don’t have an owner reply”). One recent review mentioned: “{{recent_review_snippet}}”.

We built a lightweight “review reply autopilot” that drafts brand-safe responses for Google/Yelp, escalates anything negative, and sends a simple weekly KPI report. You can approve replies before anything posts.

If it helps, I can set you up on a free 7-day trial and we’ll respond within 12 hours.

Want me to send 2–3 draft replies for your latest reviews so you can see the tone? 

– Bob
{{proof_url}}
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — quick follow-up.

Most practices don’t have time to reply consistently, but Google customers notice. If you reply to even a handful per week (with the right tone), it usually lifts conversion from Maps.

Should I draft replies for your 3 most recent reviews (free) and send them back for approval?
– Bob
{{proof_url}}

Follow-up 2 (Day 7)
Subject: close the loop?
Hi {{first_name}} — last note from me.

If someone on your team owns review replies already, I’ll step back. If not, I’m happy to run replies for 7 days (free) with:
- 12-hour response SLA
- brand-safe templates tailored to dentistry
- escalation for any negative review

Reply “drafts” and I’ll send draft responses for your latest reviews.
– Bob

4.2 MED SPA — LOW_RATING (Sensitive positioning)
Subject options:
1) Protecting {{business_name}}’s reputation
2) Quick help with review responses
3) Brand-safe replies for Google/Yelp

Email 1
Hi {{first_name}} — I’m reaching out because reviews tend to drive bookings for med spas, and response tone matters a lot.

I noticed {{business_name}}’s rating is around {{google_rating}} and there are a few recent reviews that look unresolved. One mentioned: “{{recent_review_snippet}}”.

We built an AI-assisted review reply workflow: brand-safe drafts, approval before posting, and automatic escalation so nothing negative slips by. Also includes a weekly KPI snapshot (rating trend, new reviews, response rate).

If you want, I can send 2 draft responses for your most recent reviews (free) so you can judge tone and safety.

– Bob
{{proof_url}}
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
Subject: Re: brand-safe replies
Hi {{first_name}} — if you’re open to it, I’ll draft replies that:
- acknowledge concerns without admitting liability
- move the conversation offline
- reinforce your brand voice

Want drafts for the last 2 reviews?
– Bob

Follow-up 2
Subject: should I close this out?
Hi {{first_name}} — I can run this for 7 days free. You approve everything, and we escalate negatives the same day.

Worth trying on your next few reviews?
– Bob

4.3 HVAC/PLUMBING — HIGH_VOLUME
Subject options:
1) 12-hour review responses for {{business_name}}
2) You’re getting reviews — want help replying?
3) Quick win from Google reviews

Email 1
Hi {{first_name}} — {{business_name}} is getting steady Google reviews in {{city}} ({{review_count}} total).

When review volume is high, replies usually fall behind. I noticed {{response_gap}}. A recent customer said: “{{recent_review_snippet}}”.

We run a simple review response autopilot: drafts within 12 hours, you approve (or we follow strict brand rules), negative reviews get escalated immediately, and you get a weekly KPI report.

Want me to draft replies for your latest 3 reviews and send them over (free)?

– Bob
{{proof_url}}
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
Subject: Re: review replies
Hi {{first_name}} — even 10 minutes/day is hard during dispatching.

If you forward the review link (or just reply “yes”), I’ll send drafts for the most recent reviews today.
– Bob

Follow-up 2
Subject: last ping
Hi {{first_name}} — happy to run a free 7-day trial: replies within 12 hours + escalation + weekly KPIs.

Should I send draft replies for the latest reviews?
– Bob

5) AGENCY/RESELLER LANE (BULK DEALS)
Target: small marketing agencies serving dentists/med spas/home services; local SEO shops; reputation management freelancers.
Offer: white-label or “done-for-you” fulfillment; agency keeps margin; weekly KPI report they can forward.

Agency Email 1
Subject: White-label review replies for your clients
Hi {{first_name}} — quick question: do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We built an AI-assisted review reply + escalation workflow that agencies can resell: brand-safe drafts, optional approval, and a weekly KPI report per location.

If you have 5+ locations across clients, I can run a free 7-day pilot on one location and share the KPI report format.

Details here: {{proof_url}}
If it’s relevant, who’s best to talk to about fulfillment/ops?

– Bob
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (WEEK 1: FREE LAUNCH)
CRM stages (Google Sheet is fine):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial (7-day free) → Converted (post-week1) / Lost.

Daily activity targets (single inbox, safe):
- Day 1–2: 20 new/day
- Day 3–4: 30 new/day
- Day 5–7: 40–60 new/day (only if bounce <3% and replies healthy)
Plus follow-ups: send F1 on Day 3, F2 on Day 7.

Operational checklist (daily):
1) Pull 20–60 Priority A/B leads.
2) Personalize token: add {{recent_review_snippet}} + choose correct segment template.
3) Send initial emails.
4) Log in CRM with next follow-up dates.
5) Reply SLA: respond to any inbound within same business day.
6) If negative reaction: apologize, confirm opt-out, mark Lost.

List QA + safety thresholds:
- Bounce rate target < 3%. If >5% stop sending and fix list.
- Complaint/unsubscribe: immediately suppress contact + domain.
- Do not email businesses without any website/contact path unless phone outreach is planned.

7) WHAT TO DO NEXT (CONCRETE)
1) Choose geography scope.
2) Build first 200 leads (at least 70 per vertical + 30 agencies) using the CSV headers above.
3) Start sending Day-1 volume with Priority A first.
4) Track replies, meetings, and trial starts; iterate subject lines and opening hooks weekly.