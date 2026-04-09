# Outbound Pipeline Kit (Ready-to-Run): Segmentation Plan + 3-Step Cold Email Sequences + Daily Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:38:19.833Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email (include in emails): agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (start here)
Primary verticals (high review velocity + clear ROI):
A) Dentists / Orthodontists
B) Med spas / Aesthetic clinics
C) HVAC + Plumbing (home services)
Secondary lane (higher LTV, fewer deals): Agencies serving the above verticals (local SEO, reputation management, web/ads agencies).

2) SEGMENTS + PRIORITY SCORING (use for routing + personalization)
Capture these fields per prospect: google_rating, review_count, last_review_date, response_rate_proxy (owner replies in last 10 reviews / 10), and a recent review snippet.

Segments (tag 1–3 per prospect):
• NOT_RESPONDING: response_rate_proxy <= 0.2 OR 0 owner responses visible in last 10 reviews
• LOW_RATING: google_rating < 4.2
• HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days

Priority tiers (choose highest applicable):
• Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
• Priority B: NOT_RESPONDING OR LOW_RATING
• Priority C: HIGH_VOLUME only
Routing to email variants:
• NOT_RESPONDING → “response gap” angle (speed + consistency + brand-safe)
• LOW_RATING → “recovery + escalation + service save” angle
• HIGH_VOLUME → “ops throughput + 12-hour SLA + weekly KPIs” angle

3) DAILY SENDING TARGETS (initial)
Goal: 50 new sends/day by Day 10–14 per inbox (lower if brand-new). If multiple inboxes, multiply cautiously.
Daily activity mix (per day):
• New prospects: 30–60
• Follow-ups: 20–60 (depending on day)
• Optional owner/manager DMs: 5–10 (LinkedIn/Facebook) for Priority A only

4) 14-DAY RAMP (safe defaults, no paid tools assumed)
Day 1–2: 10–15 new/day + 10 follow-ups/day (if any)
Day 3–4: 20–25 new/day
Day 5–7: 30–40 new/day
Day 8–10: 40–60 new/day
Day 11–14: 60–80 new/day IF bounce <3% and complaint rate near 0
Hard stop rules:
• If bounce rate >5% in any 24–48h window: pause new sends, clean list
• If spam complaints: pause and reduce volume + tighten targeting
Reply SLA: respond within 2 hours during business day; always same-day.

5) CRM PIPELINE (simple stages + entry/exit)
Stages:
1. Prospect (has required data fields)
2. Ready to Send (email verified / best-available contact chosen)
3. Sent – Step 1
4. Sent – Follow-up 1
5. Sent – Follow-up 2
6. Replied – Positive
7. Replied – Not now
8. Replied – Objection
9. Qualified (meets ICP + pain confirmed)
10. Demo Booked
11. Trial / Pilot
12. Paid
13. Lost (with reason codes)
Required fields in CRM: business_name, vertical, city_state, website, phone, google_rating, review_count, last_review_date, segment_tags, priority, contact_name (if known), email, personalization_snippet, next_step_date, last_touch, status.

6) ZERO-COST LEAD LIST BUILD SOP (to reach 500–1,000)
Important: This kit provides the system; the 500–1,000 row CSV is produced by executing the SOP (owner or VA).

6.1 Choose geography (needed to lock queries)
Pick ONE:
A) Top 25 US metros (fastest, consistent)
B) 5–10 states (focused)
C) US-wide (hardest to QA)

6.2 Google Maps query pack (examples; repeat per metro)
Dentists:
• “dentist + {city}”
• “cosmetic dentist + {city}”
• “orthodontist + {city}”
Med spa:
• “med spa + {city}”
• “aesthetic clinic + {city}”
• “botox + {city}” (filter to clinics)
Home services:
• “HVAC + {city}”
• “air conditioning repair + {city}”
• “plumber + {city}”

6.3 Minimum fields to capture per lead (CSV headers)
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, owner_or_manager_name, role_guess, email_1, email_2, segment, priority, personalization_snippet, notes

6.4 How to compute response_rate_proxy quickly
Open Google reviews → scan last ~10 reviews → count visible owner/management responses.
response_rate_proxy = responses_in_last_10 / 10.
If Google shows “Response from the owner” frequently, count it.

6.5 Email sourcing (free-first)
Order of operations:
1) Website contact page (info@, office@, hello@)
2) Footer “mailto:”
3) Google Business Profile “Website” + “Contact”
4) For agencies: LinkedIn company page + site contact
Record 2 emails if available. If none, still include lead (phone-based follow-up lane).

6.6 QA rules (prevent garbage)
Exclude:
• National franchises with centralized call centers unless location has independent marketing contact
• Businesses without websites (unless Priority A pain is obvious)
• Categories that are off-target (e.g., “dental lab” vs “dentist”)
Spot-check 10% of rows/day for correctness.

7) COLD EMAIL COPY — 3-STEP SEQUENCES (with tokens)
Global tokens:
{{business_name}}, {{city}}, {{service_type}}, {{recent_review_snippet}}, {{last_review_date}}, {{google_rating}}, {{review_count}}, {{response_gap_observation}}
Signature:
Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

7.1 DENTAL — Variant A (NOT_RESPONDING)
Subject options:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your recent reviews
3) 12-hour review replies for {{business_name}}?

Email 1:
Hi {{first_name_or_there}},

I was looking at {{business_name}}’s Google reviews in {{city}}. I noticed {{response_gap_observation}} and a recent review said: “{{recent_review_snippet}}”.

We run a simple Review Reply & Reputation Autopilot that drafts (and can post) brand-safe responses for Google/Yelp, escalates negatives to you, and keeps response times tight.

Concrete promise: replies drafted within 12 hours, you can approve/edit, and anything negative gets flagged immediately.

If I send 2 sample replies (one positive + one negative) for your recent reviews, would you want to see them?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Hi {{first_name_or_there}},

Still happy to draft a couple example responses for {{business_name}} (no setup). Most practices we talk to just don’t have time to reply consistently, and it leaves money on the table when prospects compare offices.

Should I send the samples here, or is there someone else who owns reputation/reviews?

— Bob

Follow-up 2 (4–7 days later):
Hi {{first_name_or_there}},

Last note—if you want, I can run a quick “review response audit” for {{business_name}} (last 10 reviews) and summarize: response rate, response time, and 2 quick wins.

Worth it? Reply “audit” and I’ll send it.

— Bob

7.2 DENTAL — Variant B (LOW_RATING)
Subject options:
1) Quick reputation recovery plan for {{business_name}}
2) Helping practices lift ratings (without fake reviews)
3) About your recent Google feedback

Email 1:
Hi {{first_name_or_there}},

I saw {{business_name}}’s Google rating is around {{google_rating}} with {{review_count}} reviews. One recent comment mentioned: “{{recent_review_snippet}}”.

We help practices respond fast, de-escalate negatives, and consistently reply in a brand-safe voice (you approve). The goal is to turn unhappy patients into resolved conversations and show prospects you’re attentive.

Would it be helpful if I drafted a calm, HIPAA-safe response to that review plus a short escalation note you can send internally?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Hi {{first_name_or_there}},

The biggest lift usually comes from (1) replying to every review within 12–24h and (2) having a consistent script for negatives so nothing is missed.

Want me to draft 2 example replies for {{business_name}} so you can judge tone/quality?

— Bob

Follow-up 2:
Hi {{first_name_or_there}},

If now isn’t the right time, no worries—who’s best to talk to about Google/Yelp reviews for {{business_name}}?

— Bob

7.3 MED SPA — Variant A (NOT_RESPONDING)
Subject options:
1) Faster review replies for {{business_name}}
2) Quick idea to protect your med spa’s rating
3) Replying to Google/Yelp reviews (without more work)

Email 1:
Hi {{first_name_or_there}},

I was checking out {{business_name}}’s reviews. A recent one said: “{{recent_review_snippet}}” and it looks like {{response_gap_observation}}.

We run a Review Reply Autopilot for Google/Yelp: brand-safe draft replies in your tone, a 12-hour turnaround, and negative reviews get escalated so you can step in fast.

Open to me sending a couple draft replies based on your latest reviews so you can see what it looks like?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Hi {{first_name_or_there}},

This is especially useful when review volume spikes after promos/new providers—keeping replies consistent protects conversion when prospects compare med spas.

Want the samples?

— Bob

Follow-up 2:
Hi {{first_name_or_there}},

If you already have someone handling reviews, what’s the best email to reach them? If not, I can send a one-page audit for {{business_name}}.

— Bob

7.4 HVAC/PLUMBING — Variant A (HIGH_VOLUME)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) 12-hour review replies for home services
3) Quick win for Google reviews

Email 1:
Hi {{first_name_or_there}},

Noticed {{business_name}} has strong review activity ({{review_count}} total) and a recent one said: “{{recent_review_snippet}}”. When calls are nonstop, review replies tend to slip.

We draft (and can post) brand-safe Google/Yelp responses within 12 hours, escalate negatives immediately, and send a weekly KPI report (response rate, response time, sentiment).

Want me to draft 2 sample replies for your last reviews so you can judge quality?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Hi {{first_name_or_there}},

If you tell me who should approve replies (owner/GM/office manager), I’ll send samples in the right tone.

— Bob

Follow-up 2:
Hi {{first_name_or_there}},

Should I close this out, or would you like a quick review-response audit for {{business_name}}?

— Bob

8) AGENCY / RESELLER EMAIL (sell many locations at once)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for GBP/Yelp reputation (fast)
3) Quick partnership idea

Email 1:
Hi {{first_name}},

I’m reaching out because you work with {{vertical}} businesses. We built a Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies in the client’s voice, 12-hour turnaround, negative-review escalation, and weekly KPI reporting.

Agencies use it as a simple add-on: you keep the relationship, we handle the reply ops. If helpful, I can share the workflow + a sample weekly report.

Open to a quick call to see if this fits your client base?

— Bob Smith
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
If you’re the wrong person, who handles partnerships or reputation management offers?

Follow-up 2:
Want me to send a sample set of replies + the KPI email report template you could forward to clients?

9) PERSONALIZATION RULES (to stay brand-safe)
• Prefer paraphrasing review content vs quoting exact medical details.
• Never reference private health/payment details. For dental/med spa: keep replies generic, invite offline resolution.
• Use “I noticed you have some recent reviews without a public reply” rather than accusing.

10) WHAT I NEED FROM CEO TO UNBLOCK THE 500–1,000 CSV
Reply with: Geography choice (Top 25 metros / 5–10 states / US-wide). Once chosen, the query pack can be locked and the 500–1,000 row list can be produced using the SOP above (no spend required).