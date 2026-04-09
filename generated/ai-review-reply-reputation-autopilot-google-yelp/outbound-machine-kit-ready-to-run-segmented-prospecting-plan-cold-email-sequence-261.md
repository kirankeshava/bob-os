# Outbound Machine Kit (Ready-to-Run) — Segmented Prospecting Plan + Cold Email Sequences + Daily Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:36:09.713Z

---

Business context (use in outreach)
Product: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp (drafts + posts brand-safe responses, escalates negative reviews, weekly KPIs).
Legitimacy URL to include in emails: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Sender email token to use in templates: {{sender_email}}

1) Segmented Prospecting Plan (who to target first)
Verticals (start with these 3):
A) Dentists / Dental clinics
B) Med spas / Aesthetic clinics
C) HVAC + Plumbing (home services)
Parallel lane: Agencies (marketing/web/SEO) serving the above.

High-intent segments (how to prioritize):
Segment definitions (simple + observable on Google):
- Not Responding: owner replies in <= 2 of last 10 reviews (response_rate_proxy <= 20%).
- Low Rating: Google rating < 4.2.
- High Volume: review_count >= 200 OR last_review_date within 14 days.

Priority tiers:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only

Offer positioning by segment:
- Not Responding: “We respond within 12 hours, brand-safe, you approve (or autopilot), never miss a review again.”
- Low Rating: “Stop the bleeding; fast, empathetic responses + escalation workflow to recover trust.”
- High Volume: “Throughput + consistency; unified voice, weekly KPIs, less staff time.”

Geo strategy (pick one approach for initial 500–1,000 leads):
Option 1 (fast + consistent): Top 25 US metros (higher review velocity).
Option 2 (focus): 5–10 states where you can sell confidently / same time zone.
Option 3 (broad): US-wide (more noise; requires stricter QA).

Google Maps query footprints (copy/paste patterns):
Use: “{vertical keyword} in {metro}”
Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “pediatric dentist”, “orthodontist”.
Med spa: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”, “medical aesthetics”.
HVAC/Plumbing: “HVAC”, “air conditioning repair”, “heating repair”, “plumber”, “plumbing service”.

2) Lead List Build Spec (CSV fields + minimum viability)
Required columns for outbound (minimum):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (short quote or paraphrase of most recent review)
- contact_name (owner/manager if found)
- role_guess
- email_1
- email_2

Zero-cost enrichment hierarchy (use in this order):
1) Business website contact page (best)
2) Google Business Profile “Website” + “Contact”
3) Facebook page “About”
4) LinkedIn company page
5) If none: use role-based email guess ONLY when domain is known (info@, hello@, office@, admin@). Do not guess personal emails without verification.

Personalization snippet safety rules:
- Prefer paraphrase over quoting if review contains sensitive details.
- Never mention health conditions or protected attributes.
- Keep snippet to 8–16 words.
Example snippet formats:
- “A recent review mentioned ‘front desk was slammed but kind.’”
- “Someone praised your team’s quick turnaround on a last-minute appointment.”

3) Cold Email Sequences (3-step) — Direct to Local Businesses
Global tokens:
{{first_name}} {{last_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{sender_name}} {{sender_email}}
Include URL as credibility footer line.

3.1 Dentist sequence (Segment: Not Responding)
SUBJECT options:
1) Quick idea for {{business_name}} reviews
2) Noticed a response gap on Google
3) {{city}} patients are talking—are replies covered?

Email 1:
Hi {{first_name}} — quick note.

I saw a recent Google review for {{business_name}}: {{recent_review_snippet}}.
It looks like some reviews aren’t getting an owner response ({{response_gap}}).

We run an AI Review Reply & Reputation Autopilot for local clinics: brand-safe draft responses for Google/Yelp, negative-review escalation, and a weekly KPI summary. Typical setup is: respond within 12 hours; you can approve replies or let it run autopilot.

Open to a 10-minute walkthrough? If you share your GBP link, I’ll send 3 sample replies in your tone.

— {{sender_name}}
{{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2 (Follow-up 1, 2–3 days later):
Subject: Re: {{business_name}} review replies
Hi {{first_name}} — checking back.

Most dental offices don’t ignore reviews intentionally; it just slips when the schedule gets packed. The downside is Google/Yelp customers interpret silence as “they don’t care.”

If you want, I can:
- draft replies for your last 5 reviews (same-day)
- flag any negative reviews for escalation
- set up weekly KPIs (rating trend, response time, % responded)

Worth a quick call this week?
— {{sender_name}} | {{sender_email}}

Email 3 (Follow-up 2, 4–6 days later):
Subject: Should I close the loop?
Hi {{first_name}} — last ping.

If review management is already handled at {{business_name}}, no worries. If not, reply “sample” and I’ll send 3 example responses based on your most recent reviews (no obligation).

— {{sender_name}}
{{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3.2 Med Spa sequence (Segment: Low Rating)
SUBJECT options:
1) Quick win to lift {{business_name}} rating
2) About a few recent reviews
3) Reputation fix for {{city}} med spas

Email 1:
Hi {{first_name}},

I’m reaching out because I noticed {{business_name}} has a few reviews that sound hard to read (e.g., {{recent_review_snippet}}). When a business replies quickly and consistently, it often prevents “pile-on” negatives and improves conversion from Maps.

We provide an AI review-response autopilot for Google/Yelp: brand-safe replies in your tone, negative-review escalation, and weekly reputation KPIs. You can approve replies, or we can run autopilot with guardrails.

Would you be open to a 10-minute chat? I can send sample responses for 3 recent reviews so you can see the voice.

— {{sender_name}} | {{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2:
Subject: Re: sample replies for {{business_name}}
Hi {{first_name}},

Common pattern we see with med spas: the best reply isn’t “defensive,” it’s calm + specific + takes it offline when needed.

If you reply with your GBP link, I’ll draft 3 responses (including one for a negative review) and include an escalation script for the front desk.

— {{sender_name}} | {{sender_email}}

Email 3:
Subject: OK if I send the drafts?
Hi {{first_name}} — should I send over the sample responses, or is someone else owning review replies at {{business_name}}?

— {{sender_name}} | {{sender_email}}

3.3 HVAC/Plumbing sequence (Segment: High Volume)
SUBJECT options:
1) Keeping up with {{business_name}} reviews
2) You’re getting a lot of reviews—who replies?
3) 12-hour review response for {{city}}

Email 1:
Hi {{first_name}},

Noticed {{business_name}} has strong review volume (and recent activity). When jobs are back-to-back, review replies usually fall to the bottom of the list.

We automate review responses for Google/Yelp: brand-safe drafts in your company voice, “negative review” escalation to a manager, and a weekly KPI email (new reviews, response time, % responded, rating trend).

If you want, send your GBP link and I’ll draft replies to your last 5 reviews so you can see the quality.

— {{sender_name}} | {{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2:
Subject: Re: review reply autopilot
Hi {{first_name}},

The promise is simple: replies go out within 12 hours, with guardrails (no admissions of fault, no personal data, consistent tone).

Is it you or someone on the office team who owns Google/Yelp?
— {{sender_name}} | {{sender_email}}

Email 3:
Subject: Close the file?
Hi {{first_name}} — if review replies are already handled, I’ll close this out. If not, reply “5” and I’ll send 5 sample replies today.

— {{sender_name}} | {{sender_email}}

4) Agency/Reseller Lane (short sequence)
Target: SEO agencies, web agencies, local marketing firms servicing dentists/med spas/home services.
Position: “white-label add-on; you keep margin; we handle fulfillment + reporting.”

Agency Email 1:
Subject: White-label review response add-on for your clients
Hi {{first_name}},

Do you manage local SEO/reputation for dentists/med spas/home services?

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe responses, negative-review escalation, and weekly KPI reporting. Agencies can resell it as an add-on (we handle fulfillment; you keep margin).

If you tell me your client verticals, I’ll share the partner workflow + a sample weekly KPI report.

— {{sender_name}} | {{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Agency Follow-up:
Subject: Re: white-label review replies
Quick nudge—worth exploring as a $99–$299/mo add-on for clients already paying you for local growth. Want the partner deck + demo link?
— {{sender_name}} | {{sender_email}}

5) Daily Sending Ops Checklist (do this every day)
Pre-send (30–45 min):
- Pull 50–100 prospects from Priority A/B.
- QA 10% sample: correct category, real local business (not directory), website present, review snippet safe, email valid.
- Personalize first line using {{recent_review_snippet}} + {{response_gap}}.

Send limits (ramp suggestion; adjust to your provider):
- Days 1–2: 15–25/day per inbox
- Days 3–5: 25–40/day
- Days 6–10: 40–60/day
- Days 11–14: 60–100/day (only if bounce <3% and replies steady)

Reply handling SLA:
- Positive replies: respond within 1 hour during business day.
- “Who are you?”: send 2-sentence explanation + URL + offer 3 samples.
- Unsubscribe: confirm removal immediately.

Bounce/complaint thresholds:
- Hard bounce > 3% in a day: pause sending, re-check list quality.
- Spam complaints: stop and revise copy/volume.

CRM stages (minimal):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost
Entry/exit criteria:
- Qualified: confirms they manage reviews OR hands you decision maker + confirms Google/Yelp matters.
- Demo Booked: calendar time set.
- Trial/POC: you’re drafting replies for last 5 reviews and sending preview.

KPIs to track weekly:
- Open rate (if tracked), reply rate, positive reply rate, demos booked, trials started, paid conversions.
- List health: bounce rate, unsubscribe rate.

Owner next step (to execute immediately):
1) Choose geo scope.
2) Build first 200 leads using the CSV spec.
3) Start sending to Priority A first with the matching segment template; follow with Day 3 and Day 7 follow-ups.