# Outbound Machine Kit — Lead List Build Plan (500–1,000), Segmentation, Cold Email (3-step), Agency Lane, Daily Sending Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:21:57.122Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof / legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Primary reply-to inbox (include in footer / replies): agent_bob_replit+review-bot@agentmail.to

========================
1) TARGETING: 2–3 VERTICALS + WHY
========================
Verticals (run in parallel):
A) Dentists (high LTV, high trust, strong review impact)
B) Med spas / aesthetic clinics (high competition, high review velocity)
C) HVAC + Plumbers (high call-driven revenue, reputation-sensitive)

Optional 4th lane (higher leverage): Agencies/resellers managing local SEO / reputation for these verticals.

========================
2) LEAD LIST CSV SCHEMA (REQUIRED COLUMNS)
========================
Create CSV with these exact headers:
- business_name
- vertical
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100%; see method below)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name (best guess)
- role_guess (owner | office_manager | practice_manager | manager | marketing)
- email_1
- email_2
- personalization_snippet (short excerpt or paraphrase from most recent review)
- notes

========================
3) ZERO-COST LEAD BUILD WORKFLOW (GOOGLE MAPS MANUAL) — 500–1,000 ROWS
========================
Goal: 500–1,000 leads in 5–10 working days without paid tools.
Daily target per person: 75–120 rows/day once process is smooth.

Step-by-step:
1) Pick geography scope (choose ONE):
   - Option 1: Top 25 US metros (broad)
   - Option 2: 5–10 states (focused)
   - Option 3: US-wide (not recommended for manual)
2) Run Google Maps searches by vertical + metro/state:
   Dentists queries:
   - “dentist + {city}”
   - “cosmetic dentist + {city}”
   - “family dentist + {city}”
   Med spa queries:
   - “med spa + {city}”
   - “aesthetic clinic + {city}”
   - “botox + {city}”
   Home services queries:
   - “HVAC + {city}”
   - “air conditioning repair + {city}”
   - “plumber + {city}”
3) For each prospect, capture:
   - Rating, review count, last review date (from Google profile)
   - Website + phone
   - Google Maps URL
4) Compute response_rate_proxy (fast method):
   - Open reviews tab → look at the last 10 reviews.
   - Count how many have an “Owner response.”
   - response_rate_proxy = (owner_responses / 10) * 100
   - If fewer than 10 reviews visible, use what’s visible and note sample size in notes.
5) Capture personalization_snippet:
   - Use a short, non-sensitive excerpt (5–15 words) OR a safe paraphrase.
   - Avoid medical/private info; don’t quote names; don’t mention protected categories.

QA Rules (do not add if):
- Franchise mega-chains unless location decision-makers are reachable
- No website and no obvious email path
- Category mismatch (e.g., “dental lab” instead of dentist)
- Reviews are extremely stale (e.g., last review > 18 months) unless review_count is huge

========================
4) SEGMENTATION + PRIORITY SCORING
========================
Segments (assign exactly one primary segment, but you can note secondary in notes):
- not_responding: response_rate_proxy <= 20% OR 0 owner replies in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

Priority tiers (for send order):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Routing rule:
- Priority A gets the most direct “speed + escalation” pitch and fastest follow-ups.
- Priority B gets standard pitch.
- Priority C gets “ops throughput” pitch (volume handling, reporting, consistency).

========================
5) CONTACT ENRICHMENT (FREE METHODS)
========================
Goal: find at least one email per lead.

Method order:
1) Website → Contact page (preferred). Capture owner/manager name if shown.
2) Website footer / About page (sometimes lists direct email).
3) Google Business Profile “website” link plus “appointments” link.
4) If no email is visible: use pattern guesses only if the domain is clear (e.g., info@, office@, hello@, support@). Put guessed emails in email_2 and mark “guessed” in notes.

========================
6) COLD EMAIL COPY — 3-STEP SEQUENCE (VERTICAL + SEGMENT VARIANTS)
========================
Personalization tokens:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (safe excerpt/paraphrase)
- {{rating}} / {{review_count}}
- {{response_rate_proxy}}
- {{vertical_phrase}} (e.g., “dental practice”, “med spa”, “HVAC company”)
- {{proof_url}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- {{reply_email}} = agent_bob_replit+review-bot@agentmail.to

---
6A) DENTIST — INITIAL (Not Responding)
Subject options:
1) Quick fix for unanswered Google reviews at {{business_name}}
2) {{business_name}}: want review replies handled in <12 hours?
3) Dentist review responses — done-for-you

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed recent feedback like: “{{recent_review_snippet}}” — but it looks like reviews often don’t get an owner reply (roughly {{response_rate_proxy}}% in the last few).

We run a simple “review reply autopilot” for dental practices: brand-safe responses drafted and posted fast (typically <12 hours), with negative reviews escalated so you can step in before they spiral. You can approve replies or let us auto-post based on your rules.

If helpful, here’s our site for context: {{proof_url}}

Open to a 10-minute call this week to see if we can take review replies off your plate?

— Bob
{{reply_email}}

---
6B) DENTIST — INITIAL (Low Rating)
Subject options:
1) Raising your Google rating without “review gating”
2) {{business_name}} reputation: faster responses + escalation
3) Quick win for dental reviews

Body:
Hi {{first_name}},

I saw {{business_name}}’s Google rating (~{{rating}}) and a recent review mentioning “{{recent_review_snippet}}.” When replies are delayed or inconsistent, those situations often stay visible without context.

We help dental practices respond quickly and safely: we draft brand-safe replies, escalate negatives immediately, and track weekly reputation KPIs so you know what’s improving.

You can see what we do here: {{proof_url}}

Worth a quick chat to show how we’d handle negatives + reduce future issues?

— Bob
{{reply_email}}

---
6C) DENTIST — INITIAL (High Volume)
Subject options:
1) Handling high review volume at {{business_name}}
2) Review reply coverage for busy practices
3) Keep up with Google reviews (without hiring)

Body:
Hi {{first_name}},

{{business_name}} has strong review activity ({{review_count}}+). Most teams start with good intentions but replying consistently becomes a time sink.

We provide done-for-you review replies for dental practices: on-brand drafts + posting, <12-hour coverage, negative escalation, and weekly KPI reporting so nothing falls through.

Site: {{proof_url}}

Should I send a 2–3 bullet plan for how we’d run replies for your practice?

— Bob
{{reply_email}}

---
6D) MED SPA — INITIAL (Not Responding)
Subject options:
1) Unanswered reviews at {{business_name}}
2) Med spa reviews: replies handled in <12 hours
3) Reputation autopilot for {{business_name}}

Body:
Hi {{first_name}},

I checked {{business_name}}’s recent Google reviews and saw “{{recent_review_snippet}}.” It looks like replies are sporadic (about {{response_rate_proxy}}% replied in the last few).

We run an AI-assisted (but brand-safe) review reply + escalation service for med spas: fast responses, negatives escalated, and a weekly KPI snapshot so your rating and responsiveness improve without adding staff workload.

More details: {{proof_url}}

Open to a quick call to see if it fits your workflow?

— Bob
{{reply_email}}

---
6E) HVAC/PLUMBER — INITIAL (Not Responding)
Subject options:
1) Quick win: reply coverage for Google reviews
2) {{business_name}}: we handle review replies (fast)
3) Keep reviews from costing calls

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed “{{recent_review_snippet}}.” It also looks like many reviews don’t get a response (about {{response_rate_proxy}}% in the last few).

For HVAC/plumbing companies, fast replies protect call volume: we draft and post brand-safe responses within ~12 hours, escalate negatives immediately, and send a weekly KPI report (rating trend, response coverage, themes).

Here’s our site: {{proof_url}}

Want me to show how this would run week-to-week for your team?

— Bob
{{reply_email}}

---
6F) FOLLOW-UP #1 (Day 2–3) — universal
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up — if you want, I can send 2 sample replies we’d post for {{business_name}} based on the review that said “{{recent_review_snippet}}” (plus an escalation path for negatives).

If you’re the wrong person, who handles reputation/reviews on your side?

— Bob
{{reply_email}}

---
6G) FOLLOW-UP #2 (Day 6–8) — universal
Subject: Should I close the loop?

Hi {{first_name}},

Should I close the loop on this? We help {{vertical_phrase}} teams respond within ~12 hours, escalate negatives, and report weekly KPIs.

If it’s a “later,” reply with a month and I’ll circle back.

Site: {{proof_url}}

— Bob
{{reply_email}}

========================
7) AGENCY / RESELLER LANE (HIGH LEVERAGE)
========================
Who to target:
- Local SEO agencies, reputation management agencies, web design shops doing “local SEO”, boutique marketing agencies specializing in dentists/med spas/home services.

How to find (free):
- Google: “dental marketing agency {state}”, “med spa marketing agency”, “HVAC marketing agency”, “reputation management agency {city}”
- LinkedIn search: “Local SEO”, “Reputation Management”, “Agency Owner” + vertical keywords

Agency email (initial):
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on for your local SEO clients (review replies + KPIs)
3) Quick reseller idea for {{agency_name}}

Body:
Hi {{first_name}},

We built a lightweight review-reply + reputation reporting autopilot for Google/Yelp: brand-safe replies, negative escalation, and weekly KPI reporting.

Agencies are using it as a white-label add-on for dentists/med spas/home services — you keep the client relationship and margin; we handle the operational layer.

Site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 15-minute call to see if it fits your service stack? Reply here or reach me at agent_bob_replit+review-bot@agentmail.to.

— Bob

========================
8) DAILY SENDING OPS + 14-DAY RAMP (LOW-RISK DELIVERABILITY)
========================
Assumes 1 inbox. If multiple inboxes, distribute evenly.

Day 1–2: 15–25 new emails/day (no more than 2 follow-ups/day)
Day 3–4: 30–40 new/day
Day 5–7: 50 new/day
Day 8–10: 70 new/day
Day 11–14: 90–100 new/day (only if bounce rate <3% and complaints = 0)

Daily checklist:
1) Pull today’s prospects from Priority A first, then B, then C.
2) Personalize 1 line max using {{recent_review_snippet}} + mention response gap.
3) Send new emails in the morning; send follow-ups mid-day.
4) Monitor replies 2–3 times/day. Reply SLA: <4 business hours.
5) Bounce handling: if hard bounce rate >3% in a day, pause new sends and clean list.
6) Complaint/unsubscribe: stop immediately for that contact; review copy/targeting.

Weekly checklist:
- QA sample: verify 25 random leads (category match, website, email validity signs)
- KPI review: sent, delivered, opens (if available), replies, positive replies, demos
- Iterate: refine segments and subject lines per vertical

========================
9) CRM PIPELINE (SIMPLE STAGES + ENTRY/EXIT)
========================
Stages:
1) Prospect (has email + segment + priority)
2) Sent (Email 1 sent)
3) Follow-up 1 sent
4) Follow-up 2 sent
5) Replied — Positive (interest)
6) Replied — Neutral/Referral (asked to forward / wrong person)
7) Replied — Negative (not interested)
8) Qualified (pain confirmed: volume, negative reviews, no time, inconsistent replies)
9) Demo Booked
10) Trial/Proof (send sample replies + proposed workflow)
11) Paid
12) Lost (reason)

Qualification questions (keep short):
- Who currently replies to Google/Yelp reviews?
- How fast do you want replies (same day / 24h)?
- Do you want approval-before-posting or auto-post with rules?
- Any brand/legal constraints we should follow?

========================
10) WHAT I NEED FROM OWNER NEXT (TO EXECUTE FULLY)
========================
1) Choose geography scope for the first 500–1,000 leads (Top 25 metros vs 5–10 states).
2) Decide whether list-building is owner-only or delegated to a VA.
3) Once first 200 rows are built, we’ll QA and tune segments + copy based on reply patterns.

End of kit.