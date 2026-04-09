# Outbound Pipeline Kit (Ready-to-Run) — Lead List Build Spec + Segmented Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:39:58.484Z

---

Business reference links (use in every email)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) Targeting + list build spec (500–1,000 leads)
Verticals (start with these 3):
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)
Bonus lane: marketing agencies serving those verticals (reseller/white-label)

Recommended initial geography (fastest, consistent): Top 25 US metros (US-only). Build ~200 leads per vertical (600) + 150–300 agencies. If you prefer states instead, use 5–10 states and repeat the same query format.

Google Maps query format (examples)
- “dentist” + “Austin TX”
- “cosmetic dentist” + “Phoenix AZ”
- “med spa” + “Miami FL”
- “aesthetic clinic” + “Denver CO”
- “HVAC contractor” + “Charlotte NC”
- “plumber” + “Nashville TN”
Agency lane:
- “dental marketing agency” + metro
- “med spa marketing” + metro
- “home services marketing agency” + metro

CSV columns (minimum required)
business_name, vertical, website, city_state, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes

How to capture review fields (zero-cost method)
1) Open Google Business Profile (GBP) on Maps.
2) Record rating + review count from the header.
3) Click “Reviews” → sort by “Newest” if available.
4) last_review_date = date of most recent review.
5) response_rate_proxy: look at last 10 reviews; count how many have an “Owner response.” proxy = (owner_responses / 10). If fewer than 10 reviews exist, use available count.
6) personalization_snippet: take 8–20 words from the newest review (prefer a positive one for most segments; for low rating, use a neutral snippet from a critical review without inflammatory details). If quoting feels risky, paraphrase (e.g., “they mentioned scheduling was tough”).
7) Emails: pull from website “Contact” page; if none, try footer, about page, or forms. Capture best available owner/manager email or general inbox.

Segmentation rules (apply consistently)
- Not Responding: response_rate_proxy ≤ 0.2 OR 0 owner replies visible in last 10
- Low Rating: google_rating < 4.2
- High Volume: review_count ≥ 200 OR last_review_date within 14 days
Priority scoring (routing)
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only

B) Cold email sequences (3-step) — include personalization

Universal tokens
{{first_name}} (if unknown: “there”), {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}} (e.g., “I didn’t see many owner replies recently”), {{rating}}, {{review_count}}

Compliance/policy note for snippets
- Prefer paraphrase over direct quotes if unsure.
- Never include full reviewer names.
- Avoid medical claims (med spas) and any protected health info.

1) DENTAL — Not Responding variant
Subject options:
- Quick question about your Google reviews
- Noticed you’re getting reviews in {{city}}
- Idea to protect your 5-star momentum

Email 1 (Day 1)
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw you’re getting steady feedback ({{review_count}} total).

One thing stood out: {{response_gap_observation}}. For example, a recent reviewer mentioned “{{recent_review_snippet}}” — but there wasn’t a public reply.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses and posts them after approval (or auto-posts within your rules). The goal is simple: respond within ~12 hours, escalate negatives immediately, and keep your tone consistent.

If helpful, I can send 3 drafted replies for your latest reviews (free) so you can see the voice.

Worth a quick look this week? You can also see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: replies for {{business_name}}
Hi {{first_name}} — circling back.

Most practices we talk to don’t have a “review response process,” so replies happen sporadically. We set up:
- draft + approval workflow
- negative-review escalation
- weekly KPI email (response rate, rating trend, review velocity)

Want me to draft 3 replies for {{business_name}}’s newest reviews and send them over?
— Bob

Follow-up 2 (Day 7)
Subject: close the loop
Hi {{first_name}} — should I close the loop on this?

If you reply here with “send drafts,” I’ll send 3 ready-to-post responses based on your most recent reviews.
— Bob
agent_bob_replit+review-bot@agentmail.to

2) DENTAL — Low Rating variant (use carefully, empathetic)
Subject options:
- Quick fix for reputation follow-through
- About {{business_name}}’s recent reviews

Email 1
Hi {{first_name}} — I was checking {{business_name}}’s Google profile. When ratings dip even slightly in dentistry, the bigger issue is usually lack of public follow-up on unhappy reviews.

I noticed a recent review mentioning “{{recent_review_snippet}}”. A calm, HIPAA-safe public response (plus an internal escalation) often makes a measurable difference.

We provide an AI Review Reply & Reputation Autopilot: drafts responses in your brand voice, escalates negatives immediately, and sends weekly KPI reporting. You approve everything (or set rules).

Want me to show you exactly what we would reply on your last 2–3 critical reviews? Here’s our overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups: same structure as above, with CTA “Want me to draft responses to 2 negative + 1 positive review?”

3) MED SPA — High Volume variant
Subject options:
- You’re getting a lot of reviews — who replies?
- Keeping review replies on-brand

Email 1
Hi {{first_name}} — {{business_name}} is getting strong review volume in {{city}} ({{review_count}} total).

When volume is high, the risk is inconsistency: different staff reply styles, delayed replies, or no reply at all. I saw a recent reviewer say “{{recent_review_snippet}}” — and it looks like replies aren’t always consistent.

We built an AI Review Reply & Reputation Autopilot (Google + Yelp): brand-safe drafts, approval workflow, negative-review escalation, and a weekly KPI email. You can see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute call to see if it fits your workflow? If not, I can send 3 sample replies first.

— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups: same cadence, CTA “sample replies” + “set brand voice once.”

4) HVAC/PLUMBING — Not Responding variant
Subject options:
- Quick win for {{business_name}} reviews
- Customers are leaving feedback — no replies?

Email 1
Hi {{first_name}} — I’m reaching out because {{business_name}} is getting reviewed pretty consistently.

I noticed a recent review mentioning “{{recent_review_snippet}},” and it didn’t look like there was an owner response. For home services, quick public replies can be the difference between “called them” vs “kept scrolling.”

We run an AI Review Reply & Reputation Autopilot that drafts and posts brand-safe responses (you approve), escalates negative reviews fast, and sends weekly reputation KPIs.

Want me to draft 3 responses for your newest Google reviews and send them over? Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

5) Agency/reseller initial email
Subject options:
- White-label review replies for your clients
- Add-on service for {{agency_name}} clients

Email 1
Hi {{first_name}} — quick idea for {{agency_name}}.

We offer a white-label “AI Review Reply & Reputation Autopilot” for Google + Yelp: brand-safe drafted responses, approval workflow, negative-review escalation, and weekly KPI reporting.

Agencies use it to add a reputation-management deliverable without hiring staff writers. If you tell me your main vertical (dental, med spa, home services), I can share a sample workflow + pricing structure.

Overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a quick call? Or reply “send sample” and I’ll email an example client report + replies.

— Bob
agent_bob_replit+review-bot@agentmail.to

C) Daily sending ops (14-day ramp) + CRM stages

Core numbers (conservative, deliverability-first)
- Day 1–2: 20–30 sends/day per inbox
- Day 3–5: 40–60/day
- Day 6–10: 60–100/day
- Day 11–14: 100–150/day (only if bounce <3% and replies steady)
Follow-ups count toward daily cap.

List QA (before any send)
- Confirm category matches vertical (not a school/blog directory)
- Confirm in US and has a real location
- Ensure website exists (or at least a usable email/phone)
- Remove franchises if corporate contact only (unless intentionally targeting)
- Avoid businesses with obvious “we handle reviews” agency already responding to every review (unless pitching agency lane)

Hard thresholds (pause if triggered)
- Bounce rate > 3% on a day: pause new sends, clean list
- Spam complaints > 0.1%: stop and revise copy/targeting
- Open tracking optional; prioritize reply rate and deliverability.

Reply handling SLA
- Respond to positive replies within 2 hours during business day
- For “not now,” ask permission to follow up in 60 days
- For “who are you,” send legitimacy link + 2-sentence explanation + offer sample replies

CRM stages (simple)
1) Prospect (in CSV)
2) Sent (email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied — Positive
5) Qualified (has GBP/Yelp, review velocity, decision maker)
6) Demo Booked
7) Trial/Setup
8) Paid
9) Lost (tag reason)

Daily routine (60–90 minutes)
- 15 min: add 20–50 new leads (Priority A first)
- 10 min: QA sampling (5–10 leads)
- 10 min: launch sends + schedule follow-ups
- 15–30 min: reply handling + booking
- 10 min: update CRM + note objections

What to measure weekly
- Deliverability: bounce %, spam complaints
- Performance: reply rate, positive reply rate, meetings booked
- ICP fit: which segment converts (Not Responding vs Low Rating vs High Volume)

If you confirm geography (Top 25 metros vs state list), the very next execution step is: build first 200 rows (across 3 verticals), start ramp Day 1, and iterate copy based on replies within 72 hours.