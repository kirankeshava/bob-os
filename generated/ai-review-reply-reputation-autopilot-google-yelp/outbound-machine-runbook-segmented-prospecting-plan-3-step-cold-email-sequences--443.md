# Outbound Machine Runbook — Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:15:59.628Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (STARTING SET)
A) Dentists / dental clinics (high LTV, high competition, review-driven)
B) Med spas / aesthetic clinics (high ticket, reputation-sensitive, high review velocity)
C) HVAC + plumbing (lead gen is review-driven; high volume + fast response expectations)
Secondary lane: Local marketing agencies who manage GBP for multiple SMBs.

2) LEAD LIST CSV SPEC (500–1,000 TARGET)
Create a CSV with these columns:
- business_name
- vertical (dentist | med_spa | hvac_plumbing | agency)
- city
- state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100) = (# owner responses in last 10 reviews / 10)*100
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- owner_or_manager_name (if found)
- role_guess (owner | manager | practice manager | office manager | marketing)
- email_1
- email_2
- personalization_snippet (1–2 lines from a recent review OR paraphrase)
- notes (anything useful: “mentions wait time”, “mentions pricing”, “no responses in months”, etc.)

SEGMENT RULES (apply in this order)
- not_responding: response_rate_proxy <= 20 OR 0 owner replies in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days
- mixed: meets 2+ segments

PRIORITY SCORING
Priority A (send first):
- (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed
Priority B:
- not_responding only OR low_rating only
Priority C:
- high_volume only OR all others

PERSONALIZATION RULES (SAFE)
- Prefer paraphrase over direct quote if the review is sensitive.
- Use 6–20 words max.
- Do not mention health details, protected classes, or anything identifying.
- Examples:
  - Safe paraphrase: “They mentioned a long wait time at the front desk.”
  - Safe quote: “Quick, friendly service.”

3) SEGMENT → EMAIL VARIANT ROUTING
- not_responding: angle = “response gap + speed + brand-safe approvals”
- low_rating: angle = “damage control + escalation + rebuild trust”
- high_volume: angle = “throughput + consistency + weekly KPI reporting”

4) COLD EMAIL COPY (3-STEP) — CORE TEMPLATE
Use tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{google_rating}} {{review_count}} {{legitimacy_url}}

4.1) INITIAL EMAIL — NOT RESPONDING (LOCAL BUSINESS)
Subject options:
1) Quick idea for {{business_name}}’s Google reviews
2) Noticed a response gap on your recent reviews
3) Can I help you reply faster (without extra admin work)?

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}. One recent review mentioned: “{{recent_review_snippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp and keeps you consistent. Simple workflow:
- We draft replies within 12 hours
- You approve (or we auto-post based on your rules)
- Negative reviews get escalated immediately
- Weekly KPI report (rating trend, response rate, themes)

You can see what we do here: {{legitimacy_url}}

Worth a 10-minute chat to see if we can get your response rate to 90%+ without adding work to your team?

– Bob
agent_bob_replit+review-bot@agentmail.to

4.2) INITIAL EMAIL — LOW RATING (LOCAL BUSINESS)
Subject options:
1) Fixing review momentum for {{business_name}}
2) Quick help on Google reputation
3) Can we turn unhappy reviewers into resolved ones?

Body:
Hi {{first_name}} — Bob here.

I came across {{business_name}} while checking local listings in {{city}}. It looks like your rating is around {{google_rating}}, and a recent review mentioned: “{{recent_review_snippet}}”.

We help local businesses respond fast, stay brand-safe, and handle negatives the right way:
- Drafted replies (Google + Yelp)
- Escalation for negative reviews so issues are handled offline
- Weekly reputation KPIs + top complaint themes

Here’s our overview: {{legitimacy_url}}

If I send 2–3 sample replies to your latest reviews (no charge), would you want to see them?

– Bob
agent_bob_replit+review-bot@agentmail.to

4.3) INITIAL EMAIL — HIGH VOLUME (LOCAL BUSINESS)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Automating replies for {{business_name}}
3) Review response ops for busy teams

Body:
Hi {{first_name}} — Bob here.

{{business_name}} has a lot of review activity ({{review_count}} total). When volume is high, consistency usually slips even with a great team.

We run a Review Reply Autopilot that:
- drafts replies in your voice within 12 hours
- escalates negative reviews immediately
- reports weekly KPIs (response rate, rating trend, themes)

You can review the workflow here: {{legitimacy_url}}

Open to a quick call this week? I can outline an “approval-first” setup so nothing posts without your sign-off.

– Bob
agent_bob_replit+review-bot@agentmail.to

4.4) FOLLOW-UP 1 (DAY 3–4) — UNIVERSAL
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If you’d like, I can draft sample responses to your 3 most recent reviews (including 1 negative if you have one) so you can judge quality/brand-safety.

Should I send those over, or is someone else the right contact for reputation/Google reviews?

– Bob
agent_bob_replit+review-bot@agentmail.to

4.5) FOLLOW-UP 2 (DAY 7–10) — UNIVERSAL
Subject: Close the loop?

Hi {{first_name}}, closing the loop.

Most teams we help want one of these outcomes:
1) respond to every review within 12–24 hours
2) stop negative reviews from sitting unanswered
3) track weekly KPIs without manual reporting

If improving review responses isn’t a priority right now, no worries—just reply “later” and I’ll follow up next month.

– Bob
agent_bob_replit+review-bot@agentmail.to

5) AGENCY / RESELLER LANE (INITIAL EMAIL)
Target: small marketing agencies managing GBP/local SEO for multiple SMBs.

Subject options:
1) White-label review reply automation for your clients
2) Add-on service: 12-hour review responses (Google/Yelp)
3) Agencies: easy reputation ops win

Body:
Hi {{first_name}} — Bob here.

If you manage Google Business Profiles for local clients, review responses are a recurring pain: time-consuming, inconsistent, and hard to scale.

We built an AI Review Reply & Reputation Autopilot (Google/Yelp):
- draft responses in each client’s brand voice
- approval-first (or rules-based auto-post)
- negative review escalation
- weekly KPI reporting per location

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Interested in a reseller/white-label setup for 5–20 locations? If you tell me your client mix (dentists/med spas/home services), I’ll propose a simple packaging.

– Bob
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS + 14-DAY RAMP (SIMPLE, SAFE)
Assumptions: 1 inbox to start, cold outbound, B2B.

List hygiene (daily):
- Verify domain of website matches email when possible.
- Avoid generic catch-alls when possible (info@ is OK, but prefer manager names).
- Remove duplicates and franchises if you can’t reach the decision maker.

Bounce/complaint guardrails:
- If hard bounce rate > 3% in a day: pause, clean list.
- If spam complaints > 0.1%: pause and revise targeting/copy.

Reply handling SLA:
- Respond to interested replies within 2 hours business time.
- If negative reply: politely confirm opt-out and suppress.

14-day ramp (per inbox; manual sending is fine):
Day 1–2: 15–20/day (Priority A only)
Day 3–4: 25/day
Day 5–7: 35/day
Day 8–10: 50/day
Day 11–14: 70/day (only if bounce/complaints stay below thresholds)
Follow-ups count toward daily totals.

Daily activity targets (once ramped):
- 50–100 emails/day total
- 20–40 follow-ups/day
- 5–10 “sample replies delivered”/day (for engaged prospects)

7) CRM PIPELINE (MINIMAL)
Stages + entry/exit:
1) Prospect (has required fields + segment + priority)
2) Sent (initial email sent)
3) Engaged (opened/replied/clicked OR manual note)
4) Qualified (has GBP/Yelp + pain confirmed + decision maker)
5) Demo Booked (calendar invite)
6) Trial/Onboarding (access + brand rules gathered)
7) Paid
8) Lost (with reason: timing, budget, already handled, no fit)

Core KPIs to track weekly:
- deliverability: bounce rate, spam complaints
- outreach: sent, opens (optional), replies, positive replies
- sales: demos booked, close rate
- product proof: response rate improvement, time-to-respond, rating trend

8) WHAT I NEED FROM OWNER TO UNBLOCK THE 500–1,000 CSV
Choose one geography scope for the first list pull:
A) Top 25 US metros (fastest to find high-volume GBPs)
B) 5–10 states you want to sell into (easier to localize, better focus)
C) US-wide (largest but noisier)

Then execute the list build using the CSV spec above (manual/VA or paid scraper). Once the first 200 are built, we QA and start sending immediately while the remaining 300–800 are produced.
