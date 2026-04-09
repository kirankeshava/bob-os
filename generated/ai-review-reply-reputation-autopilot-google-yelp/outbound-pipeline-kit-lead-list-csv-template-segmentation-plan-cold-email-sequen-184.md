# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + Cold Email Sequences (Includes Website URL)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T04:01:53.818Z

---

Below is a ready-to-run outbound kit for AI Review Reply & Reputation Autopilot.

A) LEAD LIST CSV TEMPLATE (copy headers into Google Sheets)
Required columns (in order):
1. prospect_id
2. vertical (dentist | med_spa | hvac_plumbing | agency)
3. business_name
4. city
5. state
6. website
7. phone
8. google_maps_url
9. google_rating
10. review_count
11. last_review_date
12. last_review_excerpt (1–2 sentences)
13. owner_reply_count_last10 (0–10)
14. response_rate_proxy (formula)
15. segment (formula)
16. priority (formula)
17. owner_or_manager_name
18. role_guess (Owner | Practice Manager | Office Manager | GM | Marketing Manager)
19. email_1
20. email_1_source (website | google | fb | linkedin | directory)
21. email_2
22. email_2_source
23. personalization_hook (short: “Saw a recent review mentioning X…”) 
24. notes
25. sequence_assigned (LB-NotResponding | LB-LowRating | LB-HighVolume | Agency)

Data dictionary (how to fill fast):
- google_rating/review_count/last_review_date: from Google Business Profile panel.
- owner_reply_count_last10: open Reviews → count replies by the business on the most recent 10 reviews.
- last_review_excerpt: copy a short, non-sensitive fragment (avoid medical info; keep it generic).
- emails: pull from website Contact page + footer; if none, use “info@domain” or “hello@domain” only if published; otherwise leave blank for later enrichment.

Formulas (Google Sheets):
- response_rate_proxy (cell N2): =IFERROR(M2/10,0)
- segment (cell O2): =IF(AND(I2<4.2,J2>=50),"low_rating",IF(OR(N2<=0.2,M2=0),"not_responding",IF(OR(J2>=200, K2>=TODAY()-14),"high_volume","")))
- priority (cell P2): =IF(OR(AND(O2="not_responding",OR(J2>=200,K2>=TODAY()-14)),AND(O2="low_rating",OR(J2>=200,K2>=TODAY()-14))),"A",IF(OR(O2="not_responding",O2="low_rating"),"B",IF(O2="high_volume","C","C")))

B) SEGMENTED PROSPECTING PLAN (WHO TO EMAIL FIRST)
Verticals:
1) Dentists: high trust + repeat revenue; review responsiveness matters.
2) Med Spas/Aesthetic clinics: reputation drives bookings; review velocity often high.
3) HVAC/Plumbing: urgent intent; rating + responsiveness directly impacts calls.

Segments & offers:
- Not Responding (Priority A/B): “We reply to every review within 12 hours; you approve; brand-safe templates.”
- Low Rating (Priority A/B): “Negative-review escalation + draft response that protects the brand, moves to offline resolution, and shows accountability.”
- High Volume (Priority C/A if also not-responding): “We handle throughput and weekly KPI reporting so you never fall behind.”

Daily ops targets (starter, single inbox):
- Day 1–3: 20 new emails/day
- Day 4–7: 40 new emails/day
- Day 8–14: 60–80 new emails/day
- Follow-ups: send F1 to all non-replies after 2 business days; F2 after 4–5 business days.
- KPI targets: <3% bounce, <0.1% spam complaint, 6–12% reply rate, 1–3% meeting rate.

CRM stages (minimal): Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost.

C) COLD EMAIL SEQUENCES (READY TO PASTE; INCLUDES WEBSITE URL)
Note: Replace {{tokens}}. Keep personalization to 1 line.

1) LOCAL BUSINESS — INITIAL (use per segment)
Subject options:
- Quick idea for your Google reviews
- {{business_name}} reviews (response gap)
- 12-hour review replies (you approve)

Body:
Hi {{first_name}},

{{personalization_hook}} I noticed your Google reviews are active, but responses look {{response_gap}}.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google Business Profile + Yelp, escalates negatives, and sends weekly KPI reports. You can approve replies before anything posts.

If helpful, I can send 2–3 sample responses for recent reviews (no cost), in your brand voice.

Worth a quick 10 minutes this week?

— {{your_name}}
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Segment tweaks (add 1 line after the 2nd paragraph):
- Not Responding: “Most owners lose stars just by not replying—this fixes it without adding work.”
- Low Rating: “We also flag negatives immediately so you can resolve offline and prevent pile-ons.”
- High Volume: “If you’re getting lots of reviews, we keep you at 100% coverage without staff time.”

2) FOLLOW-UP #1 (2 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — should I send a few sample replies for your latest reviews so you can see the tone/quality?

We keep it brand-safe, you approve, and we can respond within 12 hours so reviews don’t sit unanswered.

If you’re the wrong person, who owns reputation/reviews for {{business_name}}?

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3) FOLLOW-UP #2 (4–5 business days later)
Subject: Close the loop?

Hi {{first_name}}, last note.

If you want, reply with “sample” and I’ll draft 2 responses:
1) one for a positive review in your style
2) one for a tougher/negative scenario (de-escalation + offline resolution)

If now isn’t a priority, all good—just tell me and I’ll close the loop.

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

D) AGENCY/RESELLER SEQUENCE (marketing agencies)
Initial subject options:
- Add a reviews-reply add-on for your clients
- White-label review response + reporting

Body:
Hi {{first_name}},

If you manage local SEO/GBP for {{agency_name}} clients: we offer a white-label “Review Reply & Reputation Autopilot” for Google + Yelp.

It drafts brand-safe replies, escalates negatives to your team/client, and sends weekly KPI reporting (reply coverage, rating trend, review velocity). Agencies typically resell it as a monthly add-on.

If you want, I’ll share a 1-page overview + sample reporting.

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

E) NEXT EXECUTION STEP (owner/VA)
1) Pick geography (Top 25 metros is fastest).
2) Build 50 leads/vertical (150 total) using the template.
3) Email only Priority A first; measure replies; iterate subject lines + hook quality.
4) Scale to 500–1,000 leads once the first 150 show a stable reply rate.
