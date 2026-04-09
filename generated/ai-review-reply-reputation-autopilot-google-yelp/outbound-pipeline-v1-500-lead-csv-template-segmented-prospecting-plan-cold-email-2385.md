# Outbound Pipeline v1 — 500-Lead CSV Template + Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (No-Spend)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:08:23.459Z

---

BUSINESS ID (use in all outreach)
- Website (legitimacy link to include in footer or P.S.): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (reply-to / signature): agent_bob_replit+review-bot@agentmail.to

A) 500-LEAD CSV — REQUIRED SCHEMA (copy/paste headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,owner_or_manager_name,role_guess,email_1,email_2,segment,priority_tier,personalization_snippet,notes

Definitions:
- last_review_date: date of most recent Google review (YYYY-MM-DD)
- response_rate_proxy: (owner responses in last 10 reviews) / 10, expressed as % (0,10,20…100). If can’t compute fast, leave blank and segment with “unknown_response_rate”.
- segment (primary): not_responding | low_rating | high_volume | unknown_response_rate
- priority_tier: A | B | C
- personalization_snippet: 10–25 words quoted or lightly paraphrased from the latest review (avoid sensitive info; no full names of reviewers).

Segmentation rules (apply in this order):
1) low_rating if google_rating < 4.2
2) high_volume if review_count >= 200 OR last_review_date within 14 days
3) not_responding if response_rate_proxy <= 20% OR no visible owner replies in last 10
4) unknown_response_rate if proxy not collected

Priority rubric:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only OR unknown_response_rate

Top 25 US metros (standard geo for consistent pulls):
NYC, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Detroit, Nashville, Portland

B) LEAD LIST BUILD (NO-SPEND) — QUERIES (Google Maps)
Use: "{vertical} {city}" and confirm category matches.
Vertical query set:
- Dentists: “dentist”, “cosmetic dentist”, “dental clinic”, “family dentist”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
- HVAC/Plumbing: “HVAC”, “air conditioning repair”, “plumber”, “plumbing service”

Inclusion filters (quality control):
- Must have a website (or a clear booking URL). Exclude “Facebook-only” if possible.
- Exclude national franchises when corporate emails dominate (unless local owner email is present).
- Prefer: last review within 30 days OR review_count >= 80 (signals active demand).

Email collection (free methods, in order):
1) Website footer/contact page (best)
2) Google Business “Website” → contact page
3) Staff/about page for owner/manager name (optional)
4) If no email on site: use contact form URL and put it in notes; still keep lead.

C) SEGMENTED PROSPECTING PLAN (WHO GETS WHAT)
Direct-to-local lane (primary):
- Priority A (fastest close): High review velocity + visible response gap or low rating.
  Angle: “You’re getting reviews now; leaving them unanswered (or negative unresolved) costs calls/bookings. We reply within 12 hours, brand-safe, you approve.”
  CTA: 7-day free trial managing all new reviews + 10 backlogged.

- Priority B: Not responding OR low rating but lower volume.
  Angle: “Easy operational win; consistent replies improve conversion and reduce churn.”
  CTA: free setup + first week responses.

- Priority C: High volume only / unknown response rate.
  Angle: “Reduce owner time + ensure compliance + weekly KPI report.”
  CTA: “Want me to send 3 example replies to your latest reviews?”

Agency/reseller lane (secondary, higher LTV):
- Target: local SEO agencies, web/marketing agencies serving dentists/med spas/home services.
- Offer: white-label review response + weekly reporting; agency keeps margin.
- CTA: “Pilot with 1 client free for 7 days; if it works, we roll out to 5+.”

D) COLD EMAIL SEQUENCES (3-STEP) — CORE TEMPLATE (TOKENIZED)
Personalization tokens:
- {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{google_rating}}, {{review_count}}, {{last_review_date}}

Email 1 — “review response gap” (best for not_responding / high_volume)
Subject options:
1) Quick idea for {{business_name}} reviews
2) Noticed a response gap on Google
3) Can I draft a couple replies for you?

Body:
Hi {{first_name_or_owner}},

I was looking at {{business_name}}’s recent Google reviews — saw: “{{recent_review_snippet}}” ({{last_review_date}}).

It looks like {{response_gap}}. That’s common when you’re busy, but it can quietly hurt conversion (people check if owners respond).

We built a lightweight “Review Reply & Reputation Autopilot” that drafts brand-safe replies for Google/Yelp, escalates negative reviews, and sends a weekly KPI report. We can respond within 12 hours, and you approve (or we follow your policy).

Want a free 7-day trial? I’ll draft replies to your 3 latest reviews first so you can see the tone.

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email 2 — follow-up (48–72h)
Subject: Re: {{business_name}} reviews

Hi {{first_name_or_owner}},

If you want, I can send 2 reply drafts today based on your current voice (short, professional). You can copy/paste them into Google in under a minute.

Are you the right person for review responses at {{business_name}}?

– Bob

Email 3 — break-up / low friction (4–6 days)
Subject: Should I close this out?

Hi {{first_name_or_owner}},

No worries if now isn’t a priority. Last try: want me to (1) draft replies for the latest 3 reviews, or (2) send a quick 1-page “review response policy” you can use internally?

Reply with “1” or “2” and I’ll send it over.

– Bob

Segment variant notes:
- low_rating: add a sentence: “When ratings dip below ~4.2, response quality and speed matter a lot; we escalate negatives immediately so you can recover.”
- high_volume: add: “We handle throughput so every review gets a timely response without you spending hours weekly.”

E) DAILY SENDING OPS (NO-SPEND) + CRM
Tools (free):
- Google Sheets (lead list + segmentation)
- Free email inbox (existing AgentMail inbox for replies); sending from existing provider if available
- Simple CRM in Sheets (or Trello free)

CRM stages (minimum viable):
1) Prospects (not sent)
2) Sent – Email 1
3) Follow-up Due (Email 2/3 scheduled)
4) Replied – Interested
5) Replied – Not now
6) Demo Booked
7) Trial (7 days free)
8) Won (paid later)
9) Lost

14-day send ramp (conservative, deliverability-safe):
- Days 1–2: 20/day (highly personalized Priority A only)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50/day steady (mix A/B; keep C minimal)

Daily workflow (60–90 minutes):
1) Pull 20–50 leads (start with Priority A)
2) Add personalization snippet + response gap note
3) Send Email 1
4) Log in CRM stage “Sent – Email 1” with date
5) Handle replies within 4 business hours
6) Each day: send due follow-ups (Email 2 then Email 3)

QA + safety thresholds:
- If bounce rate > 5% in a day: stop, re-check emails/source.
- Keep complaints at 0; remove anyone who asks.
- Avoid quoting reviewer full names; paraphrase sensitive content.

F) WHAT THE 500-LEAD LIST CONTAINS (v1)
- 500 prospects across Top 25 metros:
  * Dentists: 200
  * Med spas/aesthetic clinics: 150
  * HVAC/plumbing: 150
- Each row includes: business name, geo, phone, website, Google rating, review count, maps URL, initial segment + priority tier, and a short review snippet.
- Next enrichment pass adds: last_review_date, response_rate_proxy, and owner/manager emails where available.

If you want the fastest path to revenue this week: start sends immediately to Priority A leads even before full enrichment (use website contact emails), then backfill response_rate_proxy/last_review_date as you go.