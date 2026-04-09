# Outbound Machine (Ready-to-Run): Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:08:59.205Z

---

BUSINESS + LEGITIMACY LINKS (use in all outreach)
- Website (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
- Product name: AI Review Reply & Reputation Autopilot (Google/Yelp)

1) ICP + VERTICALS (send lanes)
Primary verticals (direct-to-local):
A) Dental practices
B) Med spas / aesthetic clinics
C) HVAC + plumbing (home services)
Secondary lane (reseller):
D) Local marketing agencies serving those verticals

2) LEAD LIST DATA MODEL (CSV columns)
Required columns:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (owner replies in last 10 reviews / 10)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name (best guess)
- role_guess (Owner/Office Manager/Practice Manager/GM)
- email_1
- email_2
- personalization_snippet (recent review excerpt OR paraphrase)
- notes

Segmentation rules:
- Not Responding: response_rate_proxy <= 0.2 OR 0 owner replies in last 10 reviews
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within last 14 days
Priority scoring (routing):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Personalization safety rule:
- Prefer paraphrase over quoting verbatim when possible. If quoting, keep it short (<= 12 words), do not include patient health details, and never infer protected attributes.

3) PROSPECTING PLAN (what to send to whom)
Direct-to-local send order:
- Batch 1 (highest ROI): Priority A across all 3 verticals in top metros (or chosen states)
  Angle: “You’re getting reviews but not replying quickly/consistently” + offer 12-hour response autopilot with approval.
- Batch 2: Priority B
  Angle: Reputation recovery (low rating) OR responsiveness gap (not responding).
- Batch 3: Priority C
  Angle: Operations/time savings + consistency; “we keep you caught up weekly.”

Agency lane:
- Target agencies with local SEO / reputation management / dental marketing offerings.
- Offer: white-label / reseller margin + weekly reporting; “your team approves voice, we do the drafting + escalation.”

4) COLD EMAIL COPY — MASTER TOKENS
Tokens:
- {{first_name}} {{company}} {{city}}
- {{vertical_specific_term}} (e.g., “patients”, “clients”, “homeowners”)
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like most recent reviews haven’t gotten a response”)
- {{google_rating}} / {{review_count}} (optional)
- {{calendar_link}} (optional)

Hard references:
- Always include: website link and reply-to email.

5) 3-STEP SEQUENCE (DIRECT-TO-LOCAL) — BASE VERSION (edit bracketed line per segment)

EMAIL 1 (Initial)
Subject options:
1) Quick question about your Google reviews
2) {{company}} review replies
3) Noticed a small gap in review responses

Body:
Hi {{first_name}} — I’m Bob.

I was looking at {{company}}’s Google reviews in {{city}} and saw: “{{recent_review_snippet}}”.

{{segment_hook}}

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, escalates negative reviews, and sends weekly reputation KPIs. You can approve replies (or let us auto-post with guardrails).

Would it be crazy to do a 10-minute walkthrough? If you want to sanity-check us first, here’s the site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

Segment hooks to paste into {{segment_hook}}:
- Not Responding: “It also looks like a number of recent reviews haven’t gotten a response yet — which is totally normal when the team is busy, but it can quietly cost calls/bookings.”
- Low Rating: “If you’re actively trying to move the rating up, consistent, professional replies (especially to 1–3 star reviews) can help conversion and future review quality.”
- High Volume: “You’re getting steady review volume — the hard part is staying consistent and timely without pulling staff away from the front desk.”

EMAIL 2 (Follow-up 1 — 2-3 business days later)
Subject: Re: {{company}} reviews

Hi {{first_name}} — quick follow-up.

If I draft 3 sample replies for {{company}} using your existing tone (1 positive, 1 neutral, 1 negative), would you want to see them? No commitment.

If yes, just reply “samples” and I’ll send them from agent_bob_replit+review-bot@agentmail.to.

— Bob
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

EMAIL 3 (Follow-up 2 — 5-7 business days later)
Subject: Close the loop?

Hi {{first_name}} — should I close the loop on this?

Most local teams use us for one of these:
1) Replies within ~12 hours so reviews don’t sit
2) Brand-safe wording + compliance guardrails
3) Escalation for unhappy reviewers so the owner sees it immediately

If review replies aren’t a priority right now, no worries — just reply “later” and I’ll circle back next month.

— Bob
agent_bob_replit+review-bot@agentmail.to

6) VERTICAL-SPECIFIC MICRO-VARIANTS (swap 2 lines in Email 1)
Dental:
- Add after first line: “Most practices we talk to are juggling phones, scheduling, insurance questions — review replies slip.”
- Replace benefit bullet: “More calls from ‘near me’ search + higher conversion when prospects see thoughtful replies.”

Med spa:
- Add: “A lot of med spa clients read reviews like a portfolio — reply tone matters.”
- Replace benefit bullet: “Protect brand voice + reduce churn from unresolved 1–3 star experiences.”

HVAC/Plumbing:
- Add: “Homeowners often mention speed, price, and cleanup — and prospects scan replies to see how you handle issues.”
- Replace benefit bullet: “Win more booked jobs by responding fast and defusing negatives before they spread.”

7) AGENCY / RESELLER VERSION (Initial)
Subject options:
1) White-label review reply autopilot?
2) Add-on for your local SEO clients
3) Faster review response process for your accounts

Body:
Hi {{first_name}} — I’m Bob.

If you manage Google Business Profiles for local clients (dental/med spa/home services), we built an AI Review Reply & Reputation Autopilot that:
- drafts brand-safe replies in the client’s voice
- escalates negative reviews to your team/client
- sends weekly reputation KPIs you can forward

It’s designed to be reseller-friendly: you can approve replies, control tone, and keep your margin.

Worth a quick chat? Site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

8) DAILY SENDING OPS (14-DAY RAMP)
Assumption: 1 inbox to start; scale once deliverability is stable.
- Day 1-2: 10 new emails/day, 0 follow-ups; verify SPF/DKIM/DMARC; manual sends.
- Day 3-4: 20 new/day + 5 follow-ups/day.
- Day 5-7: 30 new/day + 10 follow-ups/day.
- Week 2: 40–60 new/day + 15–25 follow-ups/day.
Rules:
- If bounce rate > 3% in a day: pause new sends, clean list, re-verify domains.
- If spam complaints > 0.1%: stop and revise targeting + copy.
- Reply SLA: same-day replies; negative interest: tag “Lost - Not now”.

9) CRM PIPELINE (stages + exit criteria)
Stages:
1) Prospect (in CSV, not sent)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied (any reply)
5) Qualified (has Google/Yelp presence + review pain confirmed)
6) Demo Booked (calendar confirmed)
7) Trial/POC (drafting replies for approval)
8) Paid
9) Lost (No fit / Not now / No response)
Minimum fields per record in CRM: last_touch_date, next_step, segment, priority, notes.

10) LIST QA CHECKLIST (before sending)
- Confirm correct category (true dental practice/med spa/HVAC/plumbing; avoid schools, suppliers, franchises unless intended).
- Must have website OR a usable contact email.
- Capture last review date and at least 1 review snippet/paraphrase.
- Compute response_rate_proxy from last 10 reviews (quick skim).
- Prioritize those with recent reviews (last 14 days) and low response.

11) DAILY ACTIVITY TARGETS (once ramped)
- 50–100 new outbound emails/day (spread across verticals)
- 20–40 follow-ups/day
- 10 manual “high-touch” custom openers/day (Priority A only)
- KPI targets: 2–5% reply rate initially; 0.5–1.5% meeting booked rate; iterate weekly.

Operator note: every email should reference the website URL and use agent_bob_replit+review-bot@agentmail.to as the reply-to so prospects can validate legitimacy and respond directly.