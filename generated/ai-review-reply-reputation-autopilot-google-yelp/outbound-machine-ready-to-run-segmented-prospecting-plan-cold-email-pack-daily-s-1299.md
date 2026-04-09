# Outbound Machine (Ready-to-Run): Segmented Prospecting Plan + Cold Email Pack + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:43:10.152Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

GOAL (30 days): Book demos and close local businesses + agencies by offering “brand-safe review responses in 12 hours + negative review escalation + weekly KPI report.”

1) ICP + VERTICALS (start with 3 lanes)
A) Dentists / Dental practices
- Why: high LTV, appointment-driven, high sensitivity to ratings.
- Trigger segments: low rating (<4.2), not responding to reviews, high review velocity.

B) Med spas / Aesthetic clinics
- Why: high ticket services, heavy competition, reviews drive bookings.
- Trigger segments: high volume (>=200 reviews) + response gaps; low rating.

C) HVAC / Plumbing (home services)
- Why: urgent demand, high local competition, strong lead-to-revenue link.
- Trigger segments: not responding + high volume; low rating + recent negatives.

Parallel lane: Agencies/resellers
- Who: local SEO agencies, web shops, “growth” agencies serving local SMBs.
- Offer: white-label or referral fee; they add it as an add-on.

2) LIST FIELDS (minimum viable for outreach + personalization)
Required columns (CSV/Sheet):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (responses_in_last_10 / 10)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name (if found)
- role_guess (Owner | Office Manager | Practice Manager | GM | Marketing)
- email_1, email_2 (best available)
- personalization_snippet (recent review excerpt OR paraphrase)
- notes

3) SEGMENTATION RULES + PRIORITY ROUTING
Compute:
- Not Responding: response_rate_proxy <= 0.2 OR 0 owner replies visible in last 10 reviews.
- Low Rating: google_rating < 4.2.
- High Volume: review_count >= 200 OR last_review_date within 14 days.

Priority rubric:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume).
- Priority B: Not Responding OR Low Rating.
- Priority C: High Volume only (they respond sometimes but volume is high).

Template routing:
- Not Responding → “response gap” variant.
- Low Rating → “damage control + escalation” variant.
- High Volume → “throughput + approval workflow” variant.

4) OFFER POSITIONING (what we promise, plain language)
Core offer:
- Draft and post brand-safe replies to Google + Yelp reviews.
- Respond within 12 hours (business days) to new reviews.
- Negative reviews trigger escalation (owner notified + suggested resolution steps + optional offline follow-up language).
- Weekly KPI email: new reviews, average rating trend, response rate, negative-review root causes.
- You can approve before posting (optional); otherwise auto-post within guardrails.

Proof/legitimacy line (use in emails):
- “Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1”

5) COLD EMAIL PACK (3-step sequence)
IMPORTANT personalization tokens:
- {{first_name}} {{business_name}} {{city}} {{vertical}}
- {{recent_review_snippet}} (quote 8–20 words OR paraphrase)
- {{response_gap}} (e.g., “looks like several recent reviews didn’t get a reply”)
- {{rating}} {{review_count}} {{last_review_date}}

5.1 DENTAL — NOT RESPONDING (Initial)
Subject options:
1) Quick help replying to reviews at {{business_name}}
2) Noticed a review response gap
3) Re: Google reviews for {{business_name}}

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}.

One recent note said: “{{recent_review_snippet}}.” A quick, professional reply there can protect trust and improve conversion for new patients.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp and posts within 12 hours (or sends for your approval). Negative reviews get escalated so you can resolve fast.

If you want, I can send 3 sample replies written in your tone for your last few reviews.
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Should I send the samples?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Want me to draft a reply to this one?
Hi {{first_name}} — quick follow-up. The review that mentioned “{{recent_review_snippet}}” is exactly the kind that benefits from a calm, brand-safe response.

Want me to draft a response you can copy/paste (or approve for posting)?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later):
Subject: Close the loop on review replies
Hi {{first_name}} — last touch. If review replies aren’t a priority right now, no worries.

If you’d like, we can run a 7-day pilot: respond to every new review within 12 hours + weekly KPI summary. If it doesn’t save you time, you can stop.

Worth a quick 10 minutes this week?
— Bob

5.2 DENTAL — LOW RATING (Initial)
Subject options:
1) Quick way to stabilize rating at {{business_name}}
2) About your recent reviews
3) Review triage for {{business_name}}

Body:
Hi {{first_name}} — I’m reaching out because {{business_name}} is at {{rating}} on Google and a few recent reviews read like they need a careful response.

Example: “{{recent_review_snippet}}.” When a clinic replies well (without admitting fault or sounding defensive), it can reduce drop-off from new patient calls.

We help dental practices with brand-safe review replies on Google/Yelp, plus escalation for negatives so you can address issues fast. You can approve replies before anything posts.

Want me to send 2–3 suggested responses for your latest negative reviews?
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

5.3 DENTAL — HIGH VOLUME (Initial)
Subject options:
1) Handling review volume at {{business_name}}
2) 12-hour responses (with approval)
3) Automating review replies for dental offices

Body:
Hi {{first_name}} — {{business_name}} has ~{{review_count}} reviews, which usually means new reviews keep coming.

If it helps, we run an autopilot that drafts brand-safe replies for Google/Yelp and posts within 12 hours (or queues for approval). It also escalates negatives and sends a weekly KPI email.

Want a quick walkthrough + a few sample replies from your latest reviews?
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

5.4 MED SPA — NOT RESPONDING (Initial)
Subject: Quick help replying to {{business_name}}’s reviews
Hi {{first_name}} — noticed {{response_gap}} on {{business_name}}’s Google reviews.

One recent review said: “{{recent_review_snippet}}.” In aesthetics, a warm + specific reply can directly impact bookings.

We draft and (optionally) post brand-safe replies to Google/Yelp within 12 hours, escalate negatives, and send weekly reputation KPIs.

Want 3 sample replies in your brand voice?
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob | agent_bob_replit+review-bot@agentmail.to

5.5 HVAC/PLUMBING — NOT RESPONDING (Initial)
Subject: Quick fix for unanswered Google reviews
Hi {{first_name}} — saw {{response_gap}} on {{business_name}}’s reviews.

A recent one said: “{{recent_review_snippet}}.” Replying quickly (especially to service issues) builds trust when customers are comparing 3–4 providers.

We draft and post brand-safe Google/Yelp replies within 12 hours (or you approve), escalate negatives, and send a weekly KPI summary.

Want me to draft replies for your last few reviews as an example?
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob | agent_bob_replit+review-bot@agentmail.to

5.6 AGENCY / RESELLER (Initial)
Subject options:
1) Add “review response autopilot” to your local SEO retainers
2) White-label review replies (Google/Yelp)

Body:
Hi {{first_name}} — I’m reaching out because you work with local businesses ({{vertical_or_client_type}}).

We built an AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp:
- brand-safe replies in 12 hours (approval optional)
- negative review escalation
- weekly KPI report you can forward to clients

Agencies use it as a white-label add-on or referral. If you tell me your client niches (dentist/med spa/home services), I’ll send the positioning + sample client report.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (14-day ramp + rules)
Principles:
- Start low, protect deliverability, avoid links early (you can add the website URL after initial warmup or keep it as plain text).
- Personalize 1 line per email: review snippet + response gap.
- Always have a single CTA ("Should I send samples?" or "Worth 10 minutes?").

Ramp schedule (per inbox):
Day 1–2: 10–15 emails/day (mostly plain text, minimal links)
Day 3–4: 20/day
Day 5–6: 30/day
Day 7–8: 40/day
Day 9–10: 50/day
Day 11–14: 60–80/day (only if bounce <3% and spam complaints ~0)

Daily routine (60–90 minutes):
1) Pull/send list: Choose Priority A first, then B.
2) QA sample: check 10 leads/day for category match + working website + obvious franchise mismatches.
3) Personalize: add {{recent_review_snippet}} + {{response_gap}}.
4) Send: adhere to ramp caps.
5) Reply handling SLA: respond to all replies within 4 business hours.
6) Log outcomes in CRM: Replied, Qualified, Demo booked, Not now, Unsubscribe.

Weekly routine (2 hours):
- Review deliverability: bounces, open/reply rates, spam complaints.
- Refresh list: add 100–200 new leads.
- Rotate copy: swap subject lines; test “samples first” vs “10-min walkthrough.”

Thresholds (stop/adjust):
- Bounce rate > 3%: pause sending, clean list, verify emails.
- Spam complaints > 0.1%: reduce volume, remove aggressive CTAs/links, tighten targeting.
- Reply rate < 1% after 300 sends: improve personalization and prioritize “not responding” segment.

7) CRM PIPELINE (stages + definitions)
Required fields in CRM: business_name, vertical, segment, priority, contact_name, email, status, last_touch_date, next_step, notes.

Stages:
1) Prospect (not contacted yet)
- Entry: lead meets ICP + has contact email.
- Exit: email sent.

2) Sent (Email #1)
- Exit: follow-up scheduled OR reply received.

3) Follow-up Scheduled
- Exit: follow-up sent OR reply.

4) Replied
- Sub-tags: Interested / Not now / Already have solution / Unsubscribe.
- Exit: Qualified (if Interested) OR Closed-Lost.

5) Qualified
- Criteria: confirms they manage reviews OR asks pricing/demo OR acknowledges pain (time, negatives, no replies).
- Exit: Demo Booked.

6) Demo Booked
- Exit: Trial started (pilot) OR Closed-Lost.

7) Trial / Pilot
- Exit: Paid.

8) Paid

9) Closed-Lost
- Reasons: No budget, Not priority, Wrong contact, Competitor, Bad timing.

8) WHAT TO DO NEXT (to unlock revenue)
- Choose geography scope for first 500–1,000 leads.
- Build first 200 leads in 48 hours (Priority A/B only) and start sending during list build.
- Track: sends/day, reply rate, qualified rate, demos booked/week.

All outreach should reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Reply-to email: agent_bob_replit+review-bot@agentmail.to
