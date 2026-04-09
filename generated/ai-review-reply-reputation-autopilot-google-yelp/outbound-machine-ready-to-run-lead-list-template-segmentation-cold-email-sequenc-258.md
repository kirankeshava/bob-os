# Outbound Machine (Ready-to-Run) — Lead List Template + Segmentation, Cold Email Sequences, Daily Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:33:29.887Z

---

Below is a complete outbound machine you can run immediately for the AI Review Reply & Reputation Autopilot.

WEBSITE TO REFERENCE IN OUTREACH
- Legitimacy link to include in emails: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) LEAD LIST CSV TEMPLATE (copy header row into Google Sheets)
Columns (in this exact order):
1 business_name
2 vertical (dentist|med_spa|hvac_plumbing|agency)
3 city
4 state
5 website
6 phone
7 google_maps_url
8 google_rating
9 review_count
10 last_review_date
11 last_review_snippet (paste 10–25 words; remove customer full names)
12 owner_response_in_last_10 (0–10)
13 response_rate_proxy (formula)
14 segment (formula)
15 priority_tier (formula)
16 contact_name
17 contact_role (owner|manager|marketing|agency_owner)
18 email_1
19 email_2
20 linkedin_url (optional)
21 notes

Segmentation formulas (Google Sheets)
- response_rate_proxy (row 2):
=IFERROR(L2/10,0)
(where L2 = owner_response_in_last_10)

- segment (row 2):
=IFS(
  H2<4.2,"low_rating",
  OR(M2<=0.2,L2=0),"not_responding",
  OR(I2>=200, TODAY()-DATEVALUE(J2)<=14),"high_volume",
  TRUE,"other"
)

- priority_tier (row 2):
=IFS(
  OR(AND(N2="not_responding",OR(I2>=200,TODAY()-DATEVALUE(J2)<=14)),AND(N2="low_rating",OR(I2>=200,TODAY()-DATEVALUE(J2)<=14))),"A",
  OR(N2="not_responding",N2="low_rating"),"B",
  N2="high_volume","C",
  TRUE,"D"
)

Collection SOP (zero-cost)
1) Open Google Maps. Search using query footprints in section B. Open each result.
2) Capture: rating, review count, website, phone, and copy the Maps URL.
3) Click “Reviews” → sort by “Newest”. Record last review date and a short snippet (10–25 words). Do NOT include a customer’s full name.
4) For response proxy: scan last 10 reviews; count how many have an “Owner response” (0–10). Enter it.
5) Add best available contact: use website “Contact” page, “About”, footer emails, or staff page. If none, use a generic role email if present (info@, office@). Add two if possible.
6) Apply segment + priority formulas. Filter Priority A/B first for sending.

B) GOOGLE MAPS QUERY PACK (Top 25 metros)
Use these metros: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

Dentists (paste into Maps search, one metro at a time)
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “dental implants + {metro}”
- “family dentistry + {metro}”
- “emergency dentist + {metro}”

Med spas / aesthetics
- “med spa + {metro}”
- “botox + {metro}”
- “laser hair removal + {metro}”
- “aesthetic clinic + {metro}”
- “coolsculpting + {metro}”

HVAC / plumbing
- “HVAC contractor + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
- “water heater repair + {metro}”
- “drain cleaning + {metro}”

Agency lane (resellers)
- “dental marketing agency + {metro}”
- “med spa marketing agency + {metro}”
- “home services marketing agency + {metro}”
- “reputation management agency + {metro}”

C) COLD EMAIL SEQUENCES (3-step) — DIRECT-TO-BUSINESS
Personalization tokens you’ll fill from the CSV:
- {{business_name}}, {{city}}, {{vertical}}, {{last_review_snippet}}, {{last_review_date}}, {{response_rate_proxy}}, {{segment}}, {{phone}}

GLOBAL OFFER LANGUAGE (use consistently)
- “We draft and (optionally) post brand-safe review replies for Google Business Profile + Yelp, escalate negative reviews, and send weekly reputation KPIs. Responses within 12 hours. You can approve before anything goes live.”
- Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) DENTAL — Not Responding segment
Subject options:
A) Quick fix for your Google reviews at {{business_name}}
B) Noticed a response gap on recent reviews
C) 12-hour review replies (you approve)

Email 1:
Hi {{contact_name|there}} — I was looking at {{business_name}}’s recent Google reviews in {{city}}.

One of the newest reviews mentions: “{{last_review_snippet}}” ({{last_review_date}}). I didn’t see an owner reply on a number of the latest reviews.

We run a simple “Review Reply & Reputation Autopilot” for local practices: we draft brand-safe responses for Google + Yelp, flag/route negative reviews fast, and send a weekly KPI report. Replies go out within 12 hours, and you can approve before posting.

If it’s helpful, I can send 3 sample replies for your next reviews (free) so you can see the tone. Want me to?

More context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{sender_name}}

Follow-up 1 (2–3 days later):
Hi {{contact_name|there}} — should I send the 3 sample replies for {{business_name}}? I’ll match your voice (warm/professional) and keep everything HIPAA-safe (no assumptions about treatment).

If you prefer, tell me: (1) do you want replies posted automatically, or (2) approval-first only?

Follow-up 2 (5–7 days later):
Last try — most practices don’t have a “review problem”, they have a “response time” problem.

If you want, I’ll draft replies for your next week of Google reviews and you can decide if it’s worth automating. OK to send those samples?

2) DENTAL — Low Rating segment
Subject options:
A) 4.2+ rating recovery playbook
B) Turning negatives into resolutions (publicly)
C) Fixing the review narrative at {{business_name}}

Email 1:
Hi {{contact_name|there}} — I’m reaching out because reputation is revenue for dental practices, and {{business_name}}’s recent reviews suggest there may be a few unresolved patient experiences.

Example from a recent review: “{{last_review_snippet}}”. Even a calm, compliant reply often changes how future patients interpret the situation.

We help practices respond quickly and safely on Google + Yelp: brand-safe drafts, escalation for negatives, and weekly KPIs. You approve replies before posting (unless you want autopost).

Open to a quick 10-minute call? I can also send 3 sample replies for your latest reviews first.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1:
If you share your preferred tone (formal vs friendly), I’ll draft replies to the last 2 negative reviews and 1 positive review so you can compare.

Follow-up 2:
Should I (a) send the sample replies, or (b) close the loop on this for now?

3) MED SPA — High Volume segment
Subject options:
A) Handling review volume without staff time
B) Faster replies for {{business_name}}
C) Weekly KPI report + 12-hour replies

Email 1:
Hi {{contact_name|there}} — looks like {{business_name}} gets a steady stream of Google reviews.

When volume is high, consistency usually drops. We run an “AI Review Reply & Reputation Autopilot” that drafts brand-safe replies for Google + Yelp, escalates negatives fast, and sends a weekly KPI report. Typical SLA is replies within 12 hours, and you can approve before posting.

Want me to send a few sample replies based on your newest reviews (free), using your brand voice?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1:
If you reply with “approve-first” or “autopost”, I’ll tailor the workflow and send samples.

Follow-up 2:
Worth a quick test? I can cover your next 7 days of reviews with drafts so you can see the quality.

4) HVAC/PLUMBING — Not Responding segment
Subject options:
A) Quick win: replying to service reviews
B) Customers mention speed — replies can too
C) 12-hour Google/Yelp replies for {{business_name}}

Email 1:
Hi {{contact_name|there}} — I was looking at {{business_name}}’s recent Google reviews in {{city}}.

One of the newest reviews says: “{{last_review_snippet}}”. A lot of the latest reviews don’t have an owner response, which is a missed trust signal for home services.

We draft and (optionally) post brand-safe replies on Google + Yelp, flag negatives for fast follow-up, and send weekly reputation KPIs. Replies within 12 hours; approval-first available.

Want me to send 3 sample replies for your most recent reviews?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1:
If you tell me your preferred tone (straightforward vs friendly), I’ll match it and keep replies short and professional.

Follow-up 2:
OK if I send the 3 samples, or should I close this out?

D) AGENCY / RESELLER EMAIL (initial)
Subject options:
A) Add “review reply autopilot” to your retainers
B) White-label review responses for your clients
C) New recurring line item for local clients

Email 1:
Hi {{contact_name|there}} — do you manage Google Business Profile / reputation for local clients?

We built a lightweight Review Reply & Reputation Autopilot that drafts and (optionally) posts brand-safe replies for Google + Yelp, escalates negative reviews, and sends weekly KPI reporting. Most agencies position it as an add-on (or include it) because responsiveness moves conversion.

If you want, I can:
1) white-label it for your clients, or
2) run it under our name and you keep margin.

Overview you can forward internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want a 10-minute chat to see if it fits your packages?

E) DAILY SENDING OPS CHECKLIST + 14-DAY RAMP
Targets (per sender inbox)
- Days 1–3: 10–15 new/day
- Days 4–7: 20–30 new/day
- Days 8–14: 35–50 new/day
Rule: never exceed 100 total/day per inbox including follow-ups; keep follow-ups to 1:1 ratio with new sends.

Daily checklist (Mon–Fri)
1) Pull 30–80 prospects (Priority A/B first). Ensure website + at least 1 email exists.
2) Personalize line 1 with {{last_review_snippet}} and whether there’s an owner reply.
3) Send Email 1. Schedule FU1 in 2–3 business days; FU2 in 5–7 business days.
4) Reply SLA: same day if possible; always <24 hours.
5) Log outcomes in CRM.

List QA rules (before sending)
- Exclude: franchises with corporate review handling (unless targeting franchise owners specifically), businesses with <20 reviews, businesses with rating >4.7 and strong owner replies (unless very high volume), businesses without a website (lower likelihood to pay).
- Bounce thresholds: if hard bounce >3% in a batch, pause and re-check emails/source.
- Complaint threshold: if spam complaints appear, reduce volume and adjust copy (less salesy, more consultative).

CRM stages (simple)
1 Prospect (not contacted)
2 Sent (Email 1 sent)
3 Engaged (opened/clicked/replied)
4 Qualified (confirmed has GBP/Yelp + volume + pain)
5 Demo Booked
6 Trial / Sample Replies Sent
7 Paid
8 Lost (reason-coded: no need, already have solution, wrong contact, budget, timing)

Reply handling quick responses (snippets)
- If “Who are you?”: “Totally fair—here’s the one-page overview and how we work (approval-first, 12-hour SLA): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Want 3 sample replies for your newest reviews?”
- If “We already respond”: “Makes sense. If you want, we can cover overflow + weekends and add weekly KPIs + negative escalation. Want me to send a couple samples in your tone?”

What I need from you to run this fast
1) Choose geography for first list build: Top 25 metros (recommended) or 5–10 states.
2) Build first 200 leads using the template; start sending to Priority A/B immediately while scaling to 1,000.
