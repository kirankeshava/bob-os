# Outbound Pipeline Kit — Lead List Plan + Cold Emails (3-step) + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:07:41.362Z

---

Business:
- Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/website to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email to include: agent_bob_replit+review-bot@agentmail.to

1) TARGETING + LIST-BUILD PLAN (500–1,000 leads)

Verticals (high LTV + high review velocity):
A) Dentists / dental clinics
B) Med spas / aesthetic clinics
C) HVAC + plumbers (home services)
Parallel lane:
D) Agencies (local marketing agencies that manage GBP/reputation for these verticals)

Recommended geography for first 1,000 leads (keeps data consistent + high density):
- Top US metros (25): NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Charlotte, Indy, Seattle, Denver, DC, Boston, Nashville, Detroit, OKC, Portland, Vegas.

Lead targets by lane (example split):
- Dentists: 250–350
- Med spas: 200–300
- HVAC/Plumbing: 250–350
- Agencies: 100–150

Google Maps query pack (copy/paste patterns):
- Dentists:
  - “dentist + {city}”
  - “dental clinic + {city}”
  - “cosmetic dentist + {city}”
- Med spas:
  - “med spa + {city}”
  - “aesthetic clinic + {city}”
  - “botox + {city}” (filter to clinics)
- HVAC/Plumbing:
  - “hvac company + {city}”
  - “air conditioning repair + {city}”
  - “plumber + {city}”
- Agencies:
  - “digital marketing agency + {city}”
  - “local seo agency + {city}”
  - “reputation management + {city}”

CSV columns (minimum viable to send + segment):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100%) from last 10 reviews: % with owner response
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (short excerpt or paraphrase from latest review)
- contact_name (if found)
- role (owner/manager/front desk/marketing)
- email_1
- email_2
- notes

Segmentation rules:
- not_responding: response_rate_proxy <= 20% OR 0 owner responses in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days
Priority scoring (routing):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Personalization snippet policy (brand-safe):
- Prefer paraphrase over direct quote. Avoid patient/health specifics; keep it generic.
- Example safe paraphrase: “Saw a recent review mentioning long wait times and no reply yet.”
- Never include sensitive details; don’t restate names/medical info.

2) COLD EMAIL SEQUENCES (3 steps) — DIRECT-TO-LOCAL (WITH SEGMENT VARIANTS)

Formatting notes:
- Keep under ~120 words for Email 1.
- One CTA: “Worth a quick 10 minutes?”
- Always include proof URL + contact email in signature.

TOKENS:
- {{BusinessName}}, {{City}}, {{FirstName}}, {{Vertical}}, {{RecentReviewSnippet}}, {{LastReviewDate}}, {{Rating}}, {{ReviewCount}}, {{ResponseGap}}
- {{ResponseGap}} example: “I didn’t see an owner response to that review yet.”

A) DENTAL — Email 1 variants

A1) Not responding
Subject options:
1) Quick help with Google reviews for {{BusinessName}}
2) Noticed a response gap on your reviews
3) 12-hour review replies (you approve)

Body:
Hi {{FirstName}} — I was looking at {{BusinessName}}’s Google reviews in {{City}}.

Saw a recent one: “{{RecentReviewSnippet}}” — {{ResponseGap}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, escalates negatives, and sends a weekly KPI report. You can approve everything before it posts, or set rules.

Worth a quick 10 minutes to see if we can get your response time to <12 hours?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

A2) Low rating
Subject options:
1) Raising your rating (without spam)
2) About your Google rating for {{BusinessName}}
3) Quick reputation win

Body:
Hi {{FirstName}} — quick note after checking {{BusinessName}} in {{City}}.

A recent review mentioned: “{{RecentReviewSnippet}}”. If reviews like that aren’t acknowledged quickly, they tend to pile on.

We draft empathetic, brand-safe replies + flag urgent cases (refund/redo requests, staff complaints) so you can respond fast and protect the rating. Weekly KPIs included.

Open to a 10-minute walkthrough?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

A3) High volume
Subject options:
1) Keeping up with {{ReviewCount}} reviews
2) Review replies at scale (dental)
3) We can take review responses off your plate

Body:
Hi {{FirstName}} — {{BusinessName}} has strong review volume ({{ReviewCount}}+).

Most clinics fall behind simply due to time. We draft on-brand responses for Google/Yelp and route negatives to you instantly. You can approve all replies or only the negatives.

Want to see what a “12-hour reply SLA” looks like in practice?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

B) MED SPA — Email 1 variants (same structure, tweak wording)

B1 Not responding subject: “Catching up on med spa reviews?”
Body swap line: “We draft brand-safe, compliant replies that stay clear of sensitive treatment details.”

B2 Low rating: emphasize “trust + bookings” and “fast escalation.”

B3 High volume: emphasize “peak seasons / promo traffic.”

C) HVAC/PLUMBING — Email 1 variants

C1 Not responding: emphasize speed, emergencies, trust.
C2 Low rating: emphasize “service recovery” + “stop the bleeding” with quick acknowledgment.
C3 High volume: emphasize “busy season” + “dispatcher/owner doesn’t have time.”

Email 2 (Follow-up #1) — all verticals
Subject: Re: {{BusinessName}} reviews

Hi {{FirstName}} — circling back.

If helpful, I can send 2–3 sample replies we’d draft for your recent reviews (positive + negative), in your brand voice, before you commit to anything.

Should I send those, and who is best to approve replies at {{BusinessName}}?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 3 (Follow-up #2) — all verticals
Subject: Close the loop?

Hi {{FirstName}} — last try.

Most teams use us for 3 outcomes:
1) Reply within 12 hours (without adding work)
2) Escalate negatives immediately
3) Weekly reputation KPIs (rating trend, response rate, review velocity)

If you’re not the right person, who owns Google/Yelp review responses?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3) AGENCY / RESELLER EMAIL (B2B lane)

Agency Email 1
Subject options:
1) White-label review replies for your clients
2) Add “12-hour review response” to your retainers
3) Reputation autopilot for local clients

Body:
Hi {{FirstName}} — do you manage Google Business Profile / reputation for local clients (dental, med spa, home services)?

We offer an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp responses, escalates negatives, and reports weekly KPIs. Agencies use it to add a “12-hour review response SLA” without hiring.

Open to a quick chat? If it’s a fit, we’ll set you up with a simple workflow (approve-all or approve-negatives).

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Agency Follow-up
Subject: Re: review replies for clients

If you tell me your top 2 verticals, I’ll send an example weekly KPI report + sample reply set you can forward to a client.

4) DAILY SENDING OPS + 14-DAY RAMP (FREE/LOW-COST FRIENDLY)

Daily targets (once warmed):
- New outbound: 50–100/day per inbox
- Follow-ups: 1 follow-up pass/day
- Manual personalization: 10–20 Priority A/day (snippet + response gap)

14-day ramp per inbox (conservative):
- Days 1–3: 10/day
- Days 4–6: 20/day
- Days 7–9: 35/day
- Days 10–12: 50/day
- Days 13–14: 70/day (only if bounces <3% and replies healthy)

List hygiene rules:
- Verify syntax; avoid info@ when possible; prefer owner/manager.
- Remove obvious franchises/corporate listings unless multi-location deal is intended.
- Bounce threshold: pause list source if hard bounces >3%.
- Complaint threshold: if spam complaints >0.1%, stop and tighten targeting.

Reply handling SLA:
- Reply to interested prospects within 10 business minutes.
- For “not interested,” ask a single routing question: “Who handles Google/Yelp reviews?” then close.

5) CRM PIPELINE (SIMPLE STAGES + ENTRY/EXIT)

Stages:
1) Prospect (lead meets vertical + geo + has email)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied – Positive (asks questions, wants details)
5) Qualified (has Google/Yelp presence + review volume + decision-maker identified)
6) Meeting Booked
7) Trial / Pilot (responding workflow set)
8) Paid
9) Lost (No fit / no response after sequence)

KPIs to track weekly:
- Deliverability: hard bounce %, spam complaint %
- Activity: sent/day, follow-ups/day
- Funnel: reply rate %, positive reply %, meetings booked %, close %

6) EXECUTION CHECKLIST (WHAT TO DO TOMORROW)

A) Build 100 leads (fast) from 2 metros x 3 verticals (e.g., Dallas + Phoenix) to start sending.
B) Segment them (A/B/C) and send only Priority A/B first.
C) Personalize with 1 sentence: review paraphrase + response gap.
D) Run sequence for 7 days; iterate subject lines + opening line based on replies.

If you confirm geography (Top 25 metros vs states), the query pack can be locked and list production can start immediately.