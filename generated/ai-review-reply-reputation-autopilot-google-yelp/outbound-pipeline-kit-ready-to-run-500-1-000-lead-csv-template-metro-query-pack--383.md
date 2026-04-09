# Outbound Pipeline Kit (Ready-to-Run): 500–1,000 Lead CSV Template + Metro Query Pack + Segmentation/Scoring + Cold Emails + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:55:27.785Z

---

BUSINESS REFERENCES (use in outreach)
- Proof/website URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (include in signatures): agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (paste headers into Google Sheets; export CSV)
Column headers (in order):
lead_id,vertical,segment,priority_tier,business_name,city,state,zip,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_present_last_review,response_rate_proxy_last10,notes_contact_role_guess,contact_name,contact_email_1,contact_email_2,contact_source,personalization_line,offer_variant,email_status,first_sent_date,last_touch_date,next_step

Definitions (data dictionary, what to capture)
- vertical: Dental | MedSpa | HVAC-Plumbing | Agency
- google_rating: numeric (e.g., 4.6)
- review_count: integer
- last_review_date: YYYY-MM-DD (from Google reviews)
- last_review_excerpt: 8–20 words max (quote or paraphrase; avoid patient/private details)
- owner_response_present_last_review: Yes/No
- response_rate_proxy_last10: % = (# owner responses in last 10 reviews) / 10
- segment rules:
  * not_responding = response_rate_proxy_last10 <= 0.20 OR owner_response_present_last_review = No (if last 3 show no response)
  * low_rating = google_rating < 4.2
  * high_volume = review_count >= 200 OR (today - last_review_date) <= 14 days
  * If multiple apply, list as comma-separated (e.g., not_responding,high_volume)
- priority_tier:
  * A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  * B = not_responding OR low_rating
  * C = high_volume only
- personalization_line: 1 sentence tailored to their latest review + response gap (examples below)
- offer_variant: respond-gap | low-rating-recovery | high-volume-ops

Segmentation formulas (Google Sheets examples)
Assume:
- google_rating in column M
- review_count in column N
- last_review_date in column O
- response_rate_proxy_last10 in column R
Formula: segment (example)
=TEXTJOIN(",",TRUE,IF($R2<=0.2,"not_responding",""),IF($M2<4.2,"low_rating",""),IF(OR($N2>=200,TODAY()-$O2<=14),"high_volume",""))

Formula: priority_tier (example)
=IF(OR(AND($R2<=0.2,OR($N2>=200,TODAY()-$O2<=14)),AND($M2<4.2,OR($N2>=200,TODAY()-$O2<=14))),"A",IF(OR($R2<=0.2,$M2<4.2),"B",IF(OR($N2>=200,TODAY()-$O2<=14),"C","")))

B) METRO-BASED GOOGLE MAPS QUERY PACK (TOP 25 US METROS)
How to use:
1) Open Google Maps.
2) Search using the exact query strings below.
3) Filter by location (the metro). Collect 20–40 leads per query until you hit your target.
4) Avoid obvious chains/franchises at first (harder to close fast); prioritize owner-operated single/multi-location locals.

Top metros list (use as location suffix):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Detroit MI; Oklahoma City OK; Portland OR.

Vertical queries (copy/paste; append metro)
DENTAL:
- “dentist” + Metro
- “family dentistry” + Metro
- “cosmetic dentist” + Metro
- “dental implants” + Metro
- “pediatric dentist” + Metro

MED SPA / AESTHETICS:
- “med spa” + Metro
- “aesthetic clinic” + Metro
- “botox” + Metro
- “laser hair removal” + Metro
- “coolsculpting” + Metro

HVAC / PLUMBING (HOME SERVICES):
- “HVAC” + Metro
- “air conditioning repair” + Metro
- “heating repair” + Metro
- “plumber” + Metro
- “emergency plumber” + Metro

AGENCY / RESELLER LANE:
- “dental marketing agency” + US / state
- “med spa marketing agency” + US / state
- “HVAC marketing agency” + US / state
- “reputation management agency” + US / state

C) LIST-BUILD SOP (ZERO-COST)
Per lead (3–6 minutes once practiced):
1) Open listing → capture business_name, phone, website, maps URL.
2) Capture google_rating + review_count.
3) Click Reviews → sort by newest → record last_review_date.
4) Copy 8–20 word last_review_excerpt (or paraphrase; do not include medical details).
5) Check if owner responded to last review; then scan last 10 reviews and count owner responses → compute response_rate_proxy_last10.
6) Assign segment + priority tier via formulas.
7) Find contact email:
   - Website: contact page/footer
   - Google listing: sometimes has “Email”
   - If none: use role-based (info@, office@, hello@) only if listed on site
8) Write personalization_line (1 sentence): reference the theme of the most recent review + whether/when they responded.

QA rules (to prevent garbage leads)
- Must have: website OR a clearly usable Google listing + phone.
- Must be the correct vertical (no orthodontists in “dentist” list unless you want them).
- Exclude: national brands, call centers, lead-gen pages, closed/permanently closed.
- Keep excerpt brand-safe: no mention of patient names/conditions; paraphrase if needed.

D) COLD EMAIL SEQUENCES (3-STEP) — WITH SEGMENT + VERTICAL VARIANTS
Global tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{website_url}}, {{sender_name}} (=Bob), {{contact_email}} (=agent_bob_replit+review-bot@agentmail.to)

Personalization line examples (use in first paragraph)
- Not responding: “Saw a recent review mentioning ‘{{recent_review_snippet}}’—looks like there wasn’t an owner reply yet.”
- Low rating: “Noticed your Google rating is {{google_rating}} with {{review_count}} reviews—there’s usually quick win upside by responding consistently and escalating issues fast.”
- High volume: “You’re getting reviews frequently (last one on {{last_review_date}})—keeping response speed consistent is tough without a workflow.”

1) DENTAL — INITIAL (choose by segment)
Subject options:
A) Quick idea for {{business_name}}’s Google reviews
B) Re: responding to patient reviews in {{city}}
C) {{business_name}} review replies (12-hour turnaround)

Body (Not Responding angle):
Hi {{first_name}} —

Saw a recent Google review mentioning “{{recent_review_snippet}}” and it looks like there wasn’t an owner reply yet. A lot of practices lose easy referrals when reviews sit unanswered.

We run an AI review-reply autopilot for local businesses: brand-safe drafts for every Google/Yelp review, posted within ~12 hours (you can approve first), and we escalate negatives immediately so you can recover the patient relationship.

If you want to sanity-check it, here’s our site: {{website_url}}.

Open to a 10-minute call this week to see if we can take review responses off your plate for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

Body (Low Rating angle): swap paragraph 1 + CTA
Paragraph 1: “Noticed {{business_name}} is at {{google_rating}} on Google. Consistent, empathetic responses + fast escalation is one of the few levers that can move future ratings quickly.”
CTA stays.

Body (High Volume angle):
Paragraph 1: “You’re getting reviews regularly (last one on {{last_review_date}}). Keeping tone consistent and fast replies is hard without a system.”

Follow-up #1 (Day 3)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — quick follow-up.

If I sent you 3 example replies (based on your latest Google reviews) in your practice’s tone, would you want to see them?

If yes, where should I send them?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up #2 (Day 7)
Subject: Close the loop?
Hi {{first_name}} — should I close the loop here?

If review responses are already handled, no worries. If not, we can respond to every Google/Yelp review within 12 hours, escalate negatives, and send a weekly KPI summary.

Worth a 10-minute look? {{website_url}}
— Bob
agent_bob_replit+review-bot@agentmail.to

2) MED SPA — INITIAL
Subject options:
A) {{business_name}}: faster replies to Google reviews
B) A simple review-response workflow for med spas
C) Quick win for your rating + bookings

Body:
Hi {{first_name}} —

I saw a recent review for {{business_name}} referencing “{{recent_review_snippet}}”. When reviews come in fast, replies often lag—and that can cost bookings.

We help med spas respond to every Google/Yelp review quickly with brand-safe, on-voice drafts (you approve), and we escalate negative reviews immediately so you can recover the client.

Site for context: {{website_url}}.

Are you the right person to see a 2-minute demo?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups: same as dental, but swap “practice” → “clinic/spa” and “patients” → “clients”.

3) HVAC/PLUMBING — INITIAL
Subject options:
A) Missed calls start as missed review replies
B) {{business_name}} Google reviews (12-hour replies)
C) Quick idea to protect your rating

Body:
Hi {{first_name}} —

Noticed {{business_name}} has {{review_count}} Google reviews and the latest one mentions “{{recent_review_snippet}}”. When replies are inconsistent, homeowners often assume the business is hard to reach.

We run a review-reply autopilot: brand-safe responses for Google/Yelp, posted within ~12 hours (optional approval), negative-review escalation, and a weekly reputation KPI report.

Here’s our site: {{website_url}}.

Want me to send 2–3 sample replies in your company’s tone?
— Bob
agent_bob_replit+review-bot@agentmail.to

4) AGENCY / RESELLER — INITIAL
Subject options:
A) White-label review reply autopilot for your clients?
B) Add-on: Google/Yelp review responses (done-for-you)
C) Partner idea (margin + retention)

Body:
Hi {{first_name}} —

I’m reaching out because you work with {{vertical}} clients. We built an AI review-reply & reputation autopilot that drafts/posts brand-safe responses to Google Business Profile + Yelp, escalates negative reviews, and sends weekly KPI reporting.

Agencies use it as:
- a white-label add-on (retainer-friendly)
- a retention lever (clients love “we respond fast”)
- a way to operationalize review management without hiring

Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 15-minute partner chat? If it’s not a fit, I’ll send a 1-pager and get out of your hair.
— Bob
agent_bob_replit+review-bot@agentmail.to

E) DAILY SENDING OPS + 14-DAY RAMP (MINIMAL STACK)
Daily targets (starting conservative):
- Day 1–3: 20 new/day + 10 follow-ups/day
- Day 4–7: 40 new/day + 20 follow-ups/day
- Day 8–14: 60–100 new/day + 30–50 follow-ups/day
Rules:
- Keep bounce rate < 3%. If >3%, pause and clean list.
- Complaints: any spam complaint spike → stop, review copy + targeting.
- Reply SLA: respond to positive replies within 2 hours during business day.

Minimum CRM stages (sheet or free CRM):
Prospect → Ready to Send → Sent → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost
Entry/exit criteria:
- Qualified = correct vertical + has Google listing + evidence of response gap/low rating/high volume + decision-maker contactable.
- Demo Booked = calendar time set.
- Trial/Onboarding = connected GBP/Yelp (or manual workflow agreed) + brand voice inputs captured.

Daily checklist (operator)
1) Pull 20–100 new leads from the sheet (Priority A first).
2) Spot-check 10% for category accuracy + email validity.
3) Personalize line 1 only (do not over-customize).
4) Send initial emails.
5) Send follow-ups to non-replies.
6) Log replies, update CRM stage, book demos.
7) Record KPIs: sent, delivered, replies, positive replies, meetings booked.

If you want the fastest path to revenue: start with Priority A (not responding + high volume) in med spas and dental (they feel reputation pain and have higher LTV), while running agency outreach in parallel for bulk deals.