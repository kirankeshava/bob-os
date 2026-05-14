# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation, 3-Step Cold Email Sequences, and Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T23:00:10.952Z

---

Business context (for all outreach)
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (include in signature): agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (copy/paste headers)
Required columns:
business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_owner_responses,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

How to compute response_rate_proxy (manual, zero-cost):
- Open Google Maps listing → Reviews → sort by “Newest.”
- Check last 10 reviews. Count how many have an “Owner response.”
- last_10_owner_responses = integer 0–10
- response_rate_proxy = last_10_owner_responses / 10

Segmentation rules (apply in the sheet):
- not_responding: response_rate_proxy <= 0.2 OR last_10_owner_responses = 0
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

Priority scoring (simple and operational):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Safety rule for personalization snippets:
- Prefer paraphrase over quoting. If quoting, use a short fragment (<= 12 words) and never include medical/financial sensitive details; keep it generic.

B) TARGETING PLAN (2 lanes)
Lane 1 — Direct-to-local (highest intent)
Verticals:
1) Dental practices
2) Med spas / aesthetic clinics
3) HVAC + plumbers

Where to pull leads (Google Maps query pack pattern):
- “[vertical] + [metro]” plus a category qualifier if needed:
  - Dental: “dentist”, “dental clinic”, “cosmetic dentist”, “family dentist”
  - Med spa: “med spa”, “aesthetic clinic”, “botox clinic”, “laser hair removal”
  - Home services: “HVAC contractor”, “air conditioning repair”, “plumber”, “drain cleaning”

What to prioritize first:
- Priority A accounts: high review velocity but poor/no responses, or high volume + rating issues.
- Avoid: national franchises with centralized reputation teams unless you can find a local GM email.

Lane 2 — Agency/reseller
Who to target:
- Local marketing agencies (SEO/PPC/web) serving dentists/med spas/home services.
Where to find:
- Google: “dental marketing agency [city]”, “med spa marketing agency [city]”, “HVAC marketing agency [city]”
- LinkedIn: titles “Founder”, “Owner”, “Agency Principal”, “Client Success Manager”
Offer framing:
- White-label review response + escalation + weekly KPI report
- “You keep the client relationship; we’re the fulfillment layer”

C) 3-STEP COLD EMAIL SEQUENCES (with segment variants)
Global personalization tokens:
- {{first_name}} (if unknown: “Hi {{business_name}} team,”)
- {{business_name}}
- {{city}}
- {{recent_review_paraphrase}} (or short quote)
- {{response_gap}} (e.g., “looks like several recent reviews don’t have owner replies”)
- {{vertical_word}} (dentist / med spa / HVAC)

Signature (use in all emails):
Bob Smith
AI Review Reply & Reputation Autopilot
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

1) INITIAL EMAIL — Not Responding (most common)
Subject options:
- Quick idea for {{business_name}}’s Google reviews
- Noticed a few reviews without replies
- Simple way to respond within 12 hours

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}} (e.g., the recent one mentioning “{{recent_review_paraphrase}}”).

We built an AI “review reply autopilot” for local {{vertical_word}} businesses: it drafts brand-safe responses to new Google/Yelp reviews, flags negatives for escalation, and sends a weekly KPI summary. You can approve replies before anything is posted.

Free for 7 days: we’ll respond to every new review within 12 hours and you can see the before/after on responsiveness.

Worth a 10-minute setup this week? If yes, reply with “YES” and the best email for the person who manages your Google Business Profile.

— Bob

2) INITIAL EMAIL — Low Rating (fix + escalation angle)
Subject options:
- Quick win to lift rating + protect revenue
- Reducing 1–3 star damage for {{business_name}}
- Handling negatives fast (without sounding defensive)

Body:
Hi {{first_name}},

I saw a recent review for {{business_name}} that mentioned “{{recent_review_paraphrase}}.” Negative reviews tend to convert browsers into non-buyers—especially when there’s no calm owner reply.

We run a simple reputation workflow: brand-safe responses drafted immediately (you approve), negative reviews escalated same-day, and a weekly KPI report so you can track rating trend + response time.

We’re offering a free 7-day trial. If you want, I can set it up so every new review gets a suggested reply within 12 hours.

Should I send the 2-minute setup link?

— Bob

3) INITIAL EMAIL — High Volume (ops + time savings)
Subject options:
- High review volume → easy time sink
- Keeping up with reviews (without a new hire)
- Weekly reputation report for {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} gets a steady flow of reviews (nice problem to have). Most owners I talk to want to respond consistently but it becomes a time sink.

Our autopilot drafts on-brand replies, routes any negative sentiment for escalation, and sends a weekly KPI report. You can approve everything before posting, or we can run in “draft-only” mode.

Free 7-day trial—no card. Want to try it on your next batch of reviews?

— Bob

FOLLOW-UP 1 (send 2 business days later)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}},

Quick nudge—do you want help staying on top of Google/Yelp review replies?

Free for 7 days: replies drafted within 12 hours + negatives escalated + weekly KPI summary. Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re not the right person, who owns reputation/review responses at {{business_name}}?

— Bob

FOLLOW-UP 2 (send 4–5 business days later)
Subject: Close the loop?
Body:
Hi {{first_name}},

Should I close the loop on this?

If review responses are already handled, no worries. If not, I can run a free 7-day trial where you get:
- Drafted, brand-safe replies within 12 hours
- Negative review escalation
- Weekly KPI report (rating trend, response time, volume)

Reply “YES” and I’ll send next steps.

— Bob

AGENCY/RESELLER INITIAL EMAIL
Subject options:
- White-label review response fulfillment
- Add a retention layer for your local clients
- Quick partner idea (Google/Yelp reviews)

Body:
Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), reviews are a silent retention killer—clients notice when ratings dip or responses lag.

We provide white-label fulfillment: AI-drafted, brand-safe Google/Yelp replies, negative escalation, and weekly KPI reporting. You can brand it as your service; we’re the backend.

Want to pilot this free for one client for 7 days?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

D) DAILY SENDING OPS (FREE-STACK FRIENDLY)
Tools (no spend required):
- Sending: Gmail/Google Workspace if already owned; otherwise use existing free inboxes with low volume
- CRM: Google Sheets (pipeline tabs) + calendar scheduling via email
- Tracking: none required at start (prioritize deliverability + replies)

14-day ramp (per inbox):
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day (cap until reputation is stable)

List hygiene + thresholds:
- Hard bounce rate stop-line: >3% in a day (pause, re-check domains/emails)
- Complaint stop-line: any spam complaints → reduce volume + tighten targeting
- Always send to one email per company first; only add email_2 on follow-up if no reply and email_1 verified/credible

Reply handling SLA:
- Respond to positive replies within 2 hours during business day.
- For “not interested”: ask one clarification question (“Are reviews already handled in-house?”) then stop.

CRM stages (columns or dropdown):
- Prospect (not contacted)
- Sent
- Replied — Positive
- Replied — Neutral/Question
- Replied — Not Interested
- Qualified (has access to GBP/Yelp + has review volume)
- Demo Booked
- Trial Active (7-day)
- Converted
- Lost

Daily activity targets (starting point, 1 person):
- 30–50 new sends/day (ramp)
- 10 follow-ups/day
- 10 manual lead adds/day (if list is still being built)
- 5 agency DMs/emails/day

Weekly KPI targets to track:
- Reply rate: 3–8% (cold, early)
- Positive reply rate: 1–3%
- Meetings booked: 0.3–1% of sends
- Trials started: 50–80% of meetings

E) NEXT ACTION REQUIRED (to unlock the 500–1,000 CSV)
Choose the first geography scope for list building so queries can be finalized:
- Option 1: Top 25 US metros (best consistency)
- Option 2: 5–10 target states (good focus)
- Option 3: US-wide (broad, more noise)
Once selected, use the CSV template + rules above to build 200 leads first, QA them, then scale to 500–1,000.
