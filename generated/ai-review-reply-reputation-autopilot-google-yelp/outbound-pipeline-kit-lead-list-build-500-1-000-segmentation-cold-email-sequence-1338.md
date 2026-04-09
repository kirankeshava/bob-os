# Outbound Pipeline Kit — Lead List Build (500–1,000), Segmentation, Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:09:55.896Z

---

Business references to include in outreach
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) Lead list build plan (500–1,000 prospects)
Target verticals (high review velocity + clear ROI):
1) Dentists (incl. cosmetic dentistry, orthodontists)
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)
Secondary lane: marketing agencies serving those verticals (reseller).

Geography recommendation (to start): Top 25 US metros (tight relevance, enough volume). Alternative: 5–10 states if you want local density.

Required CSV columns
business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, owner_or_manager_name, role_guess, email_1, email_2, segment, priority_tier, personalization_snippet, notes

How to pull leads (two routes)
Route 1 (fast, paid extractor):
- Use Outscraper or Apify Google Maps scraper.
- Queries by metro:
  - Dentist: “dentist in {metro}”, “cosmetic dentist in {metro}”, “orthodontist in {metro}”
  - Med spa: “med spa in {metro}”, “aesthetic clinic in {metro}”, “botox in {metro}”
  - Home services: “HVAC in {metro}”, “air conditioning repair in {metro}”, “plumber in {metro}”, “water heater repair in {metro}”
- Export includes: name, phone, website, maps URL, rating, review count, address.
- Then enrich last_review_date + response_rate_proxy via manual sampling of last 10 reviews (see below) for Priority A/B leads only.

Route 2 (free, slower manual/VA):
- Open Google Maps results per query.
- Copy into Sheets: business name, rating, review count, last review date (from newest review), website, phone, maps URL.
- For response_rate_proxy_last10: open reviews → scan last 10 reviews → count how many have “Response from the owner” and compute responses/10.
- For email: pull from website Contact page; also try LinkedIn (practice manager/office manager), and free tiers of Hunter/Snov if desired.

Quality filters (to avoid junk)
- Exclude: national franchises with corporate review teams (unless targeting franchise owners), closed/permanently closed, no website (optional: keep if phone-only but email will be hard), irrelevant categories.
- Prefer: review_count >= 80 and last_review_date within 30 days (shows active review velocity).

Segmentation rules
- Not responding: response_rate_proxy_last10 <= 0.2 OR 0 owner responses in last 10
- Low rating: google_rating < 4.2
- High volume: review_count >= 200 OR last_review_date within 14 days
Priority scoring (route into outreach order)
- Priority A: (Not responding AND High volume) OR (Low rating AND High volume)
- Priority B: (Not responding) OR (Low rating)
- Priority C: High volume only

B) Cold email sequences (3-step) — Direct to local businesses
Personalization tokens to fill per lead:
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like many recent reviews don’t have an owner reply”)
- {{rating}} and {{review_count}} (optional)

General brand-safe promise (use in every vertical):
- “We draft brand-safe replies within 12 hours. You can approve before anything posts. Negative reviews get escalated so you can resolve fast.”

1) DENTAL — Email 1 (Not Responding / High Volume angle)
Subject options:
- Quick question about your Google reviews
- Saw a recent review for {{business_name}}
- Helping dental offices respond faster (without extra staff)

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}. One recent review mentioned: “{{recent_review_snippet}}”.

We run an AI Review Reply & Reputation Autopilot for local businesses: we draft brand-safe responses to Google (and Yelp), get your approval if you want it, and make sure every review gets a reply within 12 hours. For negative reviews, we escalate immediately so you can resolve before it costs referrals.

If it’s helpful, I can send 3 draft replies for your most recent reviews so you can see the tone. Info: {{website_url}}.

Worth a quick 10 minutes this week?
— Bob
agent_bob_replit+review-bot@agentmail.to

Dentist follow-up 1 (2–3 days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — quick follow-up.

Most dental offices we speak with lose time (and sometimes bookings) simply because reviews sit unanswered. We can:
- Reply to every new review (Google + Yelp)
- Keep tone consistent/brand-safe
- Escalate negatives immediately
- Send weekly KPI summary (rating trend, response rate, review velocity)

Want me to draft replies for your latest 3 reviews (free) so you can judge quality?
— Bob

Dentist follow-up 2 (5–7 days later)
Subject: Should I close the loop?
Hi {{first_name}},

Should I close the loop on this? If responding faster to reviews isn’t a priority right now, no worries.

If it is, I can share a simple setup: connect Google/Yelp, choose tone, and you approve (or auto-post). Details: {{website_url}}.

— Bob

2) MED SPA — Email 1 (Low Rating / Reputation recovery angle)
Subject options:
- Quick fix for med spa review replies
- About your recent Google feedback
- Reputation follow-up for {{business_name}}

Body:
Hi {{first_name}},

I came across {{business_name}} on Google and saw a recent review: “{{recent_review_snippet}}”. When reviews like that go unanswered, it can quietly reduce consult bookings.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews to your team, and reports weekly KPIs (rating trend + response rate). You can approve replies before they post, or we can auto-post with guardrails.

If you want, I’ll send 3 sample replies tailored to your brand voice so you can evaluate.

10 minutes to see if it fits?
— Bob
agent_bob_replit+review-bot@agentmail.to
More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Med spa follow-up 1
Subject: Re: review replies for {{business_name}}
Hi {{first_name}},

Common win for med spas: responding fast + consistently (and privately escalating negatives) tends to lift conversion from profile views → consult calls.

Would you prefer:
A) “Approve-first” mode (nothing posts without you), or
B) “Autopilot” mode (posts automatically within tone/policy rules)?

Reply A or B and I’ll send a quick setup outline.
— Bob

Med spa follow-up 2
Subject: Last note
Hi {{first_name}},

Last note — happy to draft a week of replies for your newest reviews so you can compare against your current tone.

If you’re not the right person, who owns reputation/reviews at {{business_name}}?
— Bob

3) HVAC/PLUMBING — Email 1 (High Volume / missed calls angle)
Subject options:
- Faster review replies for {{business_name}}
- Quick win on Google reviews
- Missed opportunity in your recent reviews

Body:
Hi {{first_name}},

I was checking out {{business_name}} and noticed {{response_gap}}. A recent customer wrote: “{{recent_review_snippet}}”.

In home services, quick owner replies often translate into more calls because prospects compare 2–3 providers and pick the one that looks responsive.

We draft and (optionally) post brand-safe responses to Google/Yelp within 12 hours, escalate negative reviews immediately, and send a weekly KPI snapshot so you can track rating + response rate.

Want me to send 3 example replies for your most recent reviews?
— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Home services follow-up 1
Subject: Re: {{business_name}} Google reviews
Hi {{first_name}},

If you’re already getting steady reviews, the fastest lift is simply consistency: every review answered, same-day, no awkward wording.

We can start with a 7-day pilot: we draft replies daily, you approve (or we autopost). If quality isn’t there, you stop.

Open to a quick call?
— Bob

Home services follow-up 2
Subject: Close the loop?
Hi {{first_name}},

Should I close this out? If you want, I’ll send the 3 draft replies first so you can evaluate before any call.

— Bob

C) Agency/reseller email (for marketing agencies)
Subject options:
- Add review response autopilot to your client packages
- White-label review replies for local clients
- Quick reseller idea for your SMB accounts

Body:
Hi {{first_name}},

Do you support local clients (dentists/med spas/home services) where Google/Yelp reviews impact leads?

We offer an AI Review Reply & Reputation Autopilot you can resell: brand-safe draft responses, optional client approval, negative-review escalation, and weekly KPI reporting. It’s designed to plug into an agency retainer as a “reputation management” add-on.

If you want, I can share:
- Pricing/margin suggestion
- The weekly KPI report format
- A 7-day pilot process

Info link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth a quick chat?
— Bob
agent_bob_replit+review-bot@agentmail.to

D) Daily sending operations (14-day ramp + CRM)
Tooling (free-first):
- CRM: Airtable/HubSpot free
- Sending: Gmail/Google Workspace (preferred) or Outlook; one inbox to start
- Tracking: avoid heavy link tracking early; keep one plain-text link to legitimacy page; consider no open tracking until deliverability is stable

14-day ramp (per inbox)
- Days 1–3: 20–30 emails/day, only Priority A/B, highly personalized first lines
- Days 4–7: 40–60/day, start follow-ups, monitor bounces (<3%)
- Days 8–14: 60–100/day, expand to Priority C, keep complaints near 0
Rules:
- If bounce rate >5% in a day: stop sending, clean list.
- If spam complaints >0.1%: reduce volume and remove tracking.
- Always include plain opt-out line: “If you’d rather I don’t reach out again, reply ‘no’ and I’ll stop.”

Reply-handling SLA
- Positive reply: respond within 2 hours with 2 time options + ask for GBP/Yelp links.
- Negative review pain: offer “3 free drafts” immediately.
- Not interested: tag Lost + reason.

CRM stages
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost
Entry/exit criteria:
- Qualified: confirms they manage reviews OR feels pain (time, negatives, inconsistency).
- Demo Booked: calendar confirmed.
- Trial/Pilot: access granted to GBP/Yelp or they send screenshots for draft replies.

Weekly KPIs to report internally
- Volume sent, delivery/bounce rate, reply rate, positive reply rate, meetings booked, pilots started, paid conversions.

Next execution step (what you do tomorrow)
1) Pick geography scope.
2) Build first 200 leads (Priority A/B heavy).
3) Send 30/day with the vertical/segment template + personalization snippet.
4) Iterate based on reply reasons (too busy, already have agency, need pricing, needs approval mode).