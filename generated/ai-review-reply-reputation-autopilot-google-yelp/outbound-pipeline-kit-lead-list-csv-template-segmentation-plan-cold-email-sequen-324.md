# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + Cold Email Sequences (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:57:06.377Z

---

Below is a complete outbound kit you can run immediately for AI Review Reply & Reputation Autopilot (Google/Yelp). It includes: (1) the exact lead CSV template to build 500–1,000 prospects, (2) segmentation + priority scoring rules, (3) cold email sequences with vertical + segment variants (including agency/reseller), and (4) daily sending ops + CRM stages.

A) LEAD LIST CSV TEMPLATE (copy headers into Google Sheets)
Columns (recommended):
1. business_name
2. vertical (dentist | med_spa | hvac_plumbing)
3. city
4. state
5. website
6. phone
7. google_maps_url
8. google_rating
9. google_review_count
10. last_review_date (YYYY-MM-DD)
11. last_review_excerpt (<=160 chars; paraphrase if needed)
12. owner_reply_count_last10 (0–10)
13. response_rate_proxy_last10 (=owner_reply_count_last10/10)
14. segment_not_responding (TRUE/FALSE)
15. segment_low_rating (TRUE/FALSE)
16. segment_high_volume (TRUE/FALSE)
17. priority_tier (A/B/C)
18. contact_name (owner/manager if known)
19. role_guess (Owner | Practice Manager | Office Manager | GM | Marketing Manager)
20. email_1
21. email_2
22. linkedin_url (optional)
23. notes

Segmentation formulas (Sheets examples; adjust column letters to match your sheet):
- segment_not_responding: =IF(M2<=0.2,TRUE,FALSE)
- segment_low_rating: =IF(H2<4.2,TRUE,FALSE)
- segment_high_volume: =IF(OR(I2>=200,(TODAY()-J2)<=14),TRUE,FALSE)
Priority scoring (simple deterministic routing):
- priority_tier:
=IF(OR(AND(N2=TRUE,P2=TRUE),AND(O2=TRUE,P2=TRUE)),"A",IF(OR(N2=TRUE,O2=TRUE),"B",IF(P2=TRUE,"C","C")))
Interpretation:
- A: urgent + high ROI (high volume plus either not responding or low rating)
- B: clear pain but less immediate scale
- C: high volume only (sell “we take this off your plate”)

B) PROSPECTING / SEGMENTED PLAN (who to contact + what angle)
1) Dentists (high LTV, reputation-sensitive)
- Target roles: Practice Owner, Practice Manager, Office Manager
- Best segments:
  - Not responding: “patients are seeing reviews unanswered”
  - Low rating: “damage control + escalation for negatives”
  - High volume: “you’re busy; we respond within 12 hours”

2) Med spas / aesthetic clinics (reviews drive bookings)
- Target roles: Owner/Founder, GM, Marketing Manager
- Best segments:
  - Low rating: “brand-safe, calm replies; route sensitive issues privately”
  - High volume: “keep momentum; convert happy clients into advocates”

3) HVAC/Plumbing (service velocity; many reviews; owners wear many hats)
- Target roles: Owner, GM, Office Manager/Dispatcher
- Best segments:
  - Not responding: “competitors look more responsive; win calls”
  - High volume: “consistent replies without you logging in”

4) Agency / reseller lane (faster bulk deals)
- Target: local SEO agencies, reputation management firms, web/marketing agencies serving these verticals
- Offer: white-label or “done-for-you review response” add-on; margin-friendly; weekly KPI report you can forward.

C) COLD EMAIL SEQUENCES (3-step) — includes vertical + segment variants
Sender signature (use in every email):
—
Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Personalization tokens you should fill (or keep minimal):
{{business_name}} {{city}} {{recent_review_excerpt}} {{rating}} {{review_count}} {{response_gap}} {{vertical_phrase}}

1) DENTAL — NOT RESPONDING (Initial)
Subject options:
- Quick help with unanswered Google reviews for {{business_name}}
- Question about your review replies
- Small reputation gap I noticed
Body:
Hi {{contact_name_or_there}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed a few recent reviews aren’t getting a reply (e.g., “{{recent_review_excerpt}}”). That’s a missed chance to reassure new patients who read the thread.

We run an AI-assisted review reply autopilot for Google + Yelp: brand-safe drafts in your voice, negative reviews escalated, and we respond within 12 hours. You can approve replies before anything posts.

Want me to send 3 sample replies written in your tone (free) based on your latest reviews?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #1 (2–3 days later)
Subject: Re: {{business_name}} reviews
Hi {{contact_name_or_there}},

If it’s helpful, I can also include a “response policy” so replies stay HIPAA-safe and consistent (thank-you’s, complaint routing, refunds/redo language, etc.).

Should I send the 3 sample replies?

— Bob

Follow-up #2 (5–7 days later)
Subject: Close the loop?
Hi {{contact_name_or_there}},

Last note—if you already have someone replying, no worries. If not, this is exactly what we automate: fast, brand-safe replies + escalation for negatives + a weekly KPI recap.

Reply “samples” and I’ll send drafts for your most recent reviews.

— Bob

2) DENTAL — LOW RATING (Initial)
Subject options:
- Repairing review perception for {{business_name}}
- Quick idea to lift your Google rating perception
Body:
Hi {{contact_name_or_there}},

I noticed {{business_name}}’s Google rating is around {{rating}}. Often the biggest win isn’t “more reviews” first—it’s responding calmly and consistently to the negatives so prospects see accountability.

Our Reputation Autopilot drafts brand-safe replies (Google + Yelp), escalates sensitive reviews to you privately, and provides a weekly KPI report. You approve replies before posting.

Open to a quick test? I’ll draft replies for your 2 most recent negative reviews and send them over.

— Bob (links/signature)

3) DENTAL — HIGH VOLUME (Initial)
Subject options:
- Keeping up with your review volume
- Quick ops question on review replies
Body:
Hi {{contact_name_or_there}},

{{business_name}} has strong review volume ({{review_count}}+). Most practices with that pace struggle to respond quickly while staying on-brand.

We respond within 12 hours using brand-safe AI drafts + human rules, escalate negatives, and send a weekly KPI summary. You can approve replies before anything posts.

Worth sending a 1-page “what it would look like” with example replies?

— Bob (links/signature)

4) MED SPA — NOT RESPONDING (Initial)
Subject options:
- Unanswered reviews = lost bookings
- Quick win for {{business_name}} reviews
Body:
Hi {{contact_name_or_there}},

I saw a recent review for {{business_name}} in {{city}} (“{{recent_review_excerpt}}”) that didn’t get a reply. In aesthetics, prospects read owner responses as part of the brand.

We run an AI Review Reply & Reputation Autopilot for Google + Yelp: fast, brand-safe replies in your tone, negative reviews escalated, weekly KPIs. You approve before posting.

Want 3 sample replies drafted from your latest reviews?

— Bob (links/signature)

5) MED SPA — LOW RATING (Initial)
Subject options:
- Protecting your brand on Google/Yelp
- Helping with negative review handling
Body:
Hi {{contact_name_or_there}},

If your rating is around {{rating}}, the fastest way to improve conversion isn’t arguing—it’s consistent, empathetic replies + taking issues offline.

Our system drafts brand-safe responses (Google/Yelp), flags negatives for escalation, and keeps a weekly KPI report you can forward to the team.

If you want, I’ll draft replies for your latest 2 negative reviews and send them over today.

— Bob (links/signature)

6) HVAC/PLUMBING — NOT RESPONDING (Initial)
Subject options:
- Quick question about Google review replies
- Missed calls from unanswered reviews
Body:
Hi {{contact_name_or_there}},

I was checking {{business_name}}’s Google reviews—there are a few recent ones with no owner response (e.g., “{{recent_review_excerpt}}”). When homeowners compare 2–3 companies, responses often decide who gets the call.

We automate brand-safe Google/Yelp replies: respond within 12 hours, escalate negatives, and send a weekly KPI summary. You can approve replies before posting.

Want me to draft 3 replies for your most recent reviews so you can see the tone?

— Bob (links/signature)

D) AGENCY / RESELLER VERSION (Initial)
Subject options:
- Add-on for your local clients: review replies in 12 hours
- White-label review response ops
Body:
Hi {{first_name}},

If you manage local SEO/reputation for {{agency_name}} clients: we offer a white-label (or partner) Review Reply Autopilot for Google + Yelp.

What you get: brand-safe drafts, negative-review escalation, 12-hour response SLA, and a weekly KPI report your team can forward to clients. Your clients approve replies (or you can).

If you tell me your main verticals (dentist/med spa/home services/etc.), I’ll share a simple pricing + workflow sheet.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E) DAILY SENDING OPS CHECKLIST + 14-DAY RAMP (tool-agnostic)
Non-negotiables:
- Keep emails plain text, 1 link max (use website link only when needed), no attachments.
- Stop sending to any domain with repeated bounces.
- If complaints >0.1% in a day, pause and clean list.

14-day ramp (per inbox):
- Days 1–3: 10–15 new/day + follow-ups; focus on high-fit Priority A.
- Days 4–7: 20–30 new/day; add Priority B.
- Days 8–14: 35–50 new/day; maintain follow-up cadence.
(Scale by adding inboxes only after stable bounce/complaint rates.)

Daily workflow (60–90 min):
1) Pull 50 new leads from sheet (Priority A first).
2) QA spot-check 10%: correct vertical/category, working website, plausible contact email.
3) Personalize only 1 line: review excerpt + response gap.
4) Send initial emails.
5) Send follow-up #1 to non-repliers from 2–3 business days ago.
6) Send follow-up #2 to non-repliers from 5–7 business days ago.
7) Reply handling SLA: same day. If negative/hostile, politely disengage.

CRM STAGES (simple pipeline)
- Prospect (in list, not contacted)
- Sent (initial sent)
- Follow-up Scheduled (awaiting FU1/FU2)
- Replied – Interested
- Replied – Not now
- Qualified (has Google/Yelp profile access; decision maker engaged)
- Demo Booked
- Trial/POC
- Paid
- Lost

Qualification checklist (must-have signals):
- Has meaningful review volume OR low rating pain
- Confirms they want faster replies / brand control
- Can grant access (or at least approve drafts)
- Decision maker or direct path to them

If you confirm the initial geography (Top 25 metros vs states), this kit becomes a repeatable factory: build list → segment → send → follow-up → convert.