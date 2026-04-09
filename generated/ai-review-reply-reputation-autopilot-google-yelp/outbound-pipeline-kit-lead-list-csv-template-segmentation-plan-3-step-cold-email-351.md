# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:17:55.864Z

---

BUSINESS LINKS (use in all outreach)
- Website (legitimacy proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (headers to paste into Google Sheets)
business_name,vertical,service_type,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_present_last10,response_rate_proxy,last_10_review_dates,segment,priority,contact_name,role_guess,email_1,email_2,linkedin_url,notes

B) DATA DICTIONARY (what each column means + how to fill)
- vertical: dentist | med_spa | hvac_plumbing | agency
- service_type: e.g., “cosmetic dentist”, “med spa”, “HVAC contractor”, “plumber” (helps personalization)
- google_maps_url: share link to GBP listing
- last_review_date: date of most recent Google review (or Yelp if using Yelp for that record)
- last_review_excerpt: 8–25 word snippet OR paraphrase (avoid sensitive health info; prefer paraphrase if it contains PHI)
- owner_response_present_last10: count of owner/manager replies in last 10 reviews (0–10)
- response_rate_proxy: =owner_response_present_last10/10 (Sheets formula: =IFERROR([owner_response_present_last10]/10,""))
- segment rules:
  • not_responding: response_rate_proxy<=0.2 OR owner_response_present_last10=0
  • low_rating: google_rating<4.2
  • high_volume: review_count>=200 OR TODAY()-last_review_date<=14
  • if multiple apply, keep the most urgent first in notes, but segment field should be one of: not_responding | low_rating | high_volume | combo
- priority rules (operational):
  • Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  • Priority B: not_responding OR low_rating
  • Priority C: high_volume only

C) GOOGLE MAPS ZERO-COST LIST BUILD WORKFLOW (repeatable)
1) Pick geography set (you decide):
   - Option 1: Top 25 US metros (fastest to reach 1,000)
   - Option 2: 5–10 states (tight regional focus)
   - Option 3: US-wide (least consistent; more QA)
2) For each metro/state, run Google Maps searches and capture results:
   - Dentist queries: “cosmetic dentist [CITY]”, “family dentist [CITY]”, “dental clinic [CITY]”
   - Med spa queries: “med spa [CITY]”, “aesthetic clinic [CITY]”, “botox [CITY]”, “laser hair removal [CITY]”
   - HVAC/Plumbing queries: “HVAC contractor [CITY]”, “air conditioning repair [CITY]”, “plumber [CITY]”, “emergency plumber [CITY]”
3) For each lead, capture: rating, review count, website, phone, last review date + excerpt, and count owner responses in last 10 reviews.
4) Enrich emails (free-first):
   - Look for “Contact” page, footer emails, staff/manager pages
   - Use patterns from the domain (info@, hello@, office@, manager@). Store as email_1/email_2 with notes
   - Agencies: use website contact + “founder@ / partnerships@ / hello@” patterns

D) SEGMENTED PROSPECTING PLAN (who to email first)
- Priority A (best ROI): high review velocity + not responding OR low rating
  • Pitch: “respond within 12 hours + escalation + weekly KPI report”
  • CTA: “Want me to draft 3 replies from your latest reviews?”
- Priority B: not responding OR low rating (but lower volume)
  • Pitch: “brand-safe replies + approval workflow”
  • CTA: “Can I send a sample reply to your most recent review?”
- Priority C: high volume only
  • Pitch: “ops + throughput: never miss a review; consistent voice across locations”
  • CTA: “Are you the right person for review response workflow?”
- Agency lane (parallel): marketing/SEO agencies serving these verticals
  • Pitch: “white-label reputation reply autopilot; you keep margin; we do fulfillment + reporting”

E) COLD EMAIL COPY — 3-STEP SEQUENCE (DIRECT LOCAL BUSINESSES)

Personalization tokens:
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like several recent reviews don’t have an owner reply yet”)
- {{segment_angle}} (not responding vs low rating vs high volume)

E1) INITIAL EMAIL (NOT RESPONDING) — use for dentists/med spas/HVAC-plumbing
Subject options:
1) Quick question about Google review replies for {{business_name}}
2) Noticed a response gap on your recent reviews
3) Can I draft a couple review replies for you?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. {{response_gap}}.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google (and Yelp), flags negatives for escalation, and sends a simple weekly KPI report. You can approve replies before anything posts.

If I drafted 3 sample responses using your latest reviews (no cost), would you want to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E2) INITIAL EMAIL (LOW RATING) — empathy + fix-forward
Subject options:
1) Helping {{business_name}} lift rating (without more ad spend)
2) Quick idea to reduce 1–3★ fallout
3) Review response workflow for {{business_name}}

Body:
Hi {{first_name}},

I noticed {{business_name}} has strong review volume, but the overall rating looks a bit pressured right now. A recent comment mentioned “{{recent_review_snippet}}”.

We help local teams respond fast and consistently (Google + Yelp), escalate negatives the same day, and track weekly KPIs (new reviews, response rate, sentiment, unresolved issues). Replies are brand-safe and can be approval-based.

Open to a quick 10-minute call to see if this would help stabilize reviews and recover trust?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E3) INITIAL EMAIL (HIGH VOLUME) — operations/throughput
Subject options:
1) Do you have someone replying to every review?
2) Scaling review responses for {{business_name}}
3) 12-hour review reply SLA

Body:
Hi {{first_name}},

Looks like {{business_name}} gets steady reviews in {{city}}. When volume is high, review replies often become inconsistent (or delayed) even for great teams.

Our Review Reply & Reputation Autopilot drafts on-brand responses within 12 hours, routes negatives for escalation, and sends weekly KPI reporting. You can keep full approval control.

Who owns reviews + reputation workflow on your side?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E4) FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Just bumping this—happy to send over 2–3 sample replies based on your latest reviews (including one for a negative/neutral review if you want). If you tell me who handles review responses, I’ll reach out to the right person.

– Bob
agent_bob_replit+review-bot@agentmail.to

E5) FOLLOW-UP #2 (5–7 business days later) — break-up + easy yes/no
Subject: Should I close the loop?

Hi {{first_name}},

Should I close the loop here, or is improving review response speed something you want to revisit this month?

If it’s helpful, I can share:
- your response-rate snapshot (last 10 reviews), and
- a draft response to “{{recent_review_snippet}}”.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1

F) AGENCY / RESELLER VERSION (INITIAL)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp reply management (you keep margin)
3) Quick partnership idea

Body:
Hi {{first_name}},

If you manage local SEO/PPC for dentists, med spas, or home services: we built an AI Review Reply & Reputation Autopilot that drafts and (optionally) posts brand-safe Google/Yelp responses, escalates negatives, and sends weekly reputation KPIs.

Agencies use it as a white-label add-on: you keep the client relationship + margin; we handle fulfillment and reporting.

Want me to send pricing/packaging and a sample weekly KPI report?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

G) OUTBOUND OPS CHECKLIST + CRM STAGES

Daily sending targets (per inbox; keep conservative):
- Days 1–3: 15–25 new/day + follow-ups
- Days 4–7: 30–40 new/day
- Days 8–14: 40–60 new/day (only if bounce <3% and spam complaints ~0)

List QA (before sending):
- Random sample 20 leads: verify category fit + website exists + recent review exists
- Remove franchises with corporate-only contact unless targeting multi-location
- Ensure last_review_excerpt is non-sensitive; paraphrase if needed

Reply SLA + routing:
- Same-day replies to interested prospects
- If prospect asks for legitimacy: send website URL above + offer sample replies
- If negative response: mark “Lost - Not Now” and stop sequence

CRM stages (simple):
1) Prospects (not yet sent)
2) Sent - Initial
3) Sent - Follow-up 1
4) Sent - Follow-up 2
5) Replied - Interested
6) Qualified (has GBP access possibility + decision maker)
7) Demo Booked
8) Trial / Pilot
9) Paid
10) Lost (Not Now / No Fit / Wrong Contact)

KPIs to track weekly:
- Deliverability: bounce %, spam complaints, reply rate
- Funnel: positive reply rate, demos booked, close rate
- Segment performance: Priority A vs B vs C conversion

OWNER DECISION NEEDED NEXT (non-financial): pick geography scope for the first 500–1,000 leads so the query pack can be locked. After that, the CSV can be produced via the workflow above and immediately fed into this email system.
