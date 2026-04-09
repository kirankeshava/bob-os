# Outbound Pipeline Kit v1 — Lead List CSV Template + Segmentation + 3-Step Cold Email (Includes Legitimacy URL)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:35:40.450Z

---

Below is a complete, paste-ready outbound kit for your AI Review Reply & Reputation Autopilot.

IMPORTANT SETUP NOTE (you fill these once):
- LEGITIMACY URL (include in every email): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- FROM EMAIL (replace everywhere): {{from_email}}  (e.g., hello@yourdomain.com)
- SIGNATURE NAME: {{sender_name}}
- OPTIONAL CALENDAR LINK: {{calendar_link}} (if you don’t have one yet, use “Reply with ‘yes’ and I’ll send times.”)

=============================
A) LEAD LIST CSV TEMPLATE (HEADERS)
=============================
Copy this header row into Google Sheets/Excel and export CSV:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_last10_pct,response_rate_notes,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,personalization_hook,offer_angle,notes

Field definitions (short):
- last_review_excerpt: a short quote or paraphrase (max 12–18 words) from the most recent review.
- response_rate_last10_pct: out of last 10 reviews, how many have an owner/management reply (0–100).
- segment: not_responding | low_rating | high_volume | mixed
- priority_tier: A | B | C (rules below)
- personalization_hook: one sentence using the excerpt + response gap, e.g., “Saw the ‘{{last_review_excerpt}}’ review—looks like it didn’t get a reply yet.”
- offer_angle: which email variant to use (NR / LR / HV).

=============================
B) SEGMENTATION + PRIORITY RULES (OPERABLE)
=============================
1) Compute response_rate_last10_pct:
- Open the Google Business Profile reviews.
- Look at the most recent 10 reviews.
- Count how many have an owner/management response.
- response_rate_last10_pct = (responses / 10) * 100.

2) Segment rules:
- not_responding: response_rate_last10_pct <= 20
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days
- mixed: meets 2+ conditions (e.g., low_rating + not_responding)

3) Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed
- Priority B: not_responding OR low_rating
- Priority C: high_volume only (rating is fine and they reply often)

4) Which offer_angle to use:
- If low_rating or mixed → offer_angle = “LR” (escalation + save-the-relationship)
- Else if not_responding → offer_angle = “NR” (speed + consistency + brand-safe)
- Else if high_volume → offer_angle = “HV” (throughput + weekly KPI reporting)

=============================
C) PROSPECTING PLAN (WHAT TO PULL FIRST)
=============================
Verticals: Dentists, Med Spas/Aesthetic Clinics, HVAC/Plumbing.

Daily list-building targets (no paid tools):
- 25 new leads/day per person doing research (≈125/week).
- QA sample: every 25 leads, re-check 5 at random for correct category + correct website + correct last review date.

Order of operations (highest intent first):
1) Priority A leads in top metros (new reviews + low/zero responses) → these feel pain immediately.
2) Priority B leads → steady volume.
3) Priority C leads → only after A/B are flowing.

=============================
D) 3-STEP COLD EMAIL SEQUENCE (DYNAMIC BY SEGMENT)
=============================
Use one sequence; swap the bracketed blocks based on offer_angle (NR/LR/HV). Keep it short.

TOKENS YOU’LL REPLACE FROM THE CSV:
{{first_name}} (or “there” if unknown)
{{business_name}}
{{city_state}}
{{vertical}}
{{last_review_excerpt}}
{{response_rate_last10_pct}}
{{google_rating}}
{{sender_name}}
{{from_email}}
{{calendar_link}}

-----------------------------
EMAIL 1 (Initial)
-----------------------------
Subject line options (choose one):
1) Quick question about your Google/Yelp reviews
2) {{business_name}} — review reply help?
3) Noticed a recent review (no reply yet)

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s recent reviews in {{city_state}} and saw: “{{last_review_excerpt}}”.

[NR BLOCK]
It looks like some reviews aren’t getting a response (roughly {{response_rate_last10_pct}}% replies on the last 10). We built a small “review reply autopilot” that drafts brand-safe responses for Google/Yelp and gets them posted within 12 hours (you can approve first).

[LR BLOCK]
Your rating is around {{google_rating}} and a few negatives can really swing bookings. We built a “review reply + escalation” autopilot: draft empathetic replies, flag negatives instantly, and route them for a fast save (plus weekly KPI reporting).

[HV BLOCK]
With your review volume, the hard part is consistent, on-brand replies without it becoming a daily task. Our autopilot drafts/replies fast, escalates negatives, and sends a weekly KPI report.

If I send 2–3 sample replies using your tone (no commitment), would you want to see them?

You can also check the product page here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{sender_name}}
{{from_email}}
P.S. If you’re not the right person for reviews, who is?

-----------------------------
EMAIL 2 (Follow-up #1, 2–3 days later)
-----------------------------
Subject line options:
1) Want me to draft a reply to that review?
2) Re: {{business_name}} reviews
3) 12-hour review replies (with approval)

Body:
Hi {{first_name}},

Happy to keep this simple: I can draft a response to your latest review (“{{last_review_excerpt}}”) in your brand voice.

[NR BLOCK]
Most owners we talk to aren’t ignoring reviews—they’re just busy. The win is: every review gets a timely, professional reply without you touching it.

[LR BLOCK]
The win is reducing churn from negative experiences: fast, empathetic replies + internal escalation so issues get handled, not just answered.

[HV BLOCK]
The win is throughput + consistency: replies within 12 hours, negatives flagged instantly, and a weekly reputation KPI snapshot.

Reply “yes” and tell me your preferred tone (friendly / formal / short). Or grab 10 minutes: {{calendar_link}}

— {{sender_name}}
{{from_email}}
Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

-----------------------------
EMAIL 3 (Follow-up #2, 5–7 days after Email 1)
-----------------------------
Subject line options:
1) Close the loop?
2) Should I stop reaching out?
3) Last note on review replies

Body:
Hi {{first_name}},

Should I close the loop on this?

If review responses aren’t a priority right now, no worries. If they are, we can start with:
- 7-day trial: drafts + posting workflow (you approve), negative-review escalation, weekly KPI report
- No change to your operations—just faster, safer replies

If you want, reply with “trial” and I’ll send the next steps. 

— {{sender_name}}
{{from_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nnuiq6w8j.picard.replit.dev/sites/1

=============================
E) MINIMUM DAILY SENDING OPS (OWNER-EXECUTABLE)
=============================
- Day 1–2: 20–30 emails/day (new leads only). No links except the legitimacy URL.
- Day 3–5: 40–60/day. Start follow-ups for Day 1.
- Day 6–10: 60–100/day. Maintain 2:1 ratio new sends to follow-ups.
- Always: stop sequence when they reply; tag outcome in CRM.

CRM stages (simple): Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost.

Reply handling SLA:
- Positive reply: respond within 2 hours (business hours).
- Negative reply: polite close + ask for correct contact.

List QA gates before sending:
- Has website OR valid email.
- Correct category (dentist/med spa/HVAC/plumbing) and not a franchise call center.
- Last review date within 90 days for Priority A/B.

This kit is ready to run as soon as you provide (1) geography scope and (2) your sending email address to insert as {{from_email}}.