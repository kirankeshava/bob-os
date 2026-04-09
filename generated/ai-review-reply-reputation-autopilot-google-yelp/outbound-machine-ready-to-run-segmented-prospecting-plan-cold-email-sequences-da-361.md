# Outbound Machine (Ready-to-Run) — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:19:32.777Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

GOAL (30 days)
Build a predictable outbound pipeline to book demos/trials with local businesses (direct) and agencies (resellers). Core promise: draft + post brand-safe replies to Google Business Profile & Yelp, escalate negative reviews, and send weekly KPI reports.

1) ICP + VERTICALS (pick 2–3 to start)
A) Dentists / dental groups
- High LTV, high trust, highly review-driven
- Common pain: inconsistent owner responses, weak tone, slow response times
B) Med spas / aesthetic clinics
- High review velocity, reputation = revenue
- Common pain: emotional/negative reviews; need careful, brand-safe language
C) HVAC / Plumbers (home services)
- Competitive, high inbound reliance on Google; high lead value
- Common pain: owner busy; reviews unanswered, especially after-hours

2) SEGMENTATION RULES (what to target first)
Collect these fields for every lead:
- google_rating
- review_count
- last_review_date
- response_rate_proxy = owner_responses_in_last_10 / 10 (estimate by scanning last 10 reviews)

Segments:
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR 0 owner replies in last 10
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days

Priority scoring:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Routing to email variant:
- NOT_RESPONDING → “response gap / speed” angle
- LOW_RATING → “escalation + brand-safe recovery” angle
- HIGH_VOLUME → “throughput + weekly KPI reporting” angle

3) LEAD LIST BUILD (ZERO-COST) — HOW TO GET 500–1,000 LEADS
Owner/VA workflow (Google Maps manual collection):
A) Choose geography for first batch (needed from owner):
- Option 1: Top 25 US metros
- Option 2: 5–10 target states
- Option 3: US-wide (slower; more variance)

B) Query patterns (Google Maps):
- Dentists: “dentist + {city}”, “cosmetic dentist + {city}”, “family dentistry + {city}”
- Med spas: “med spa + {city}”, “aesthetic clinic + {city}”, “botox + {city}”, “laser hair removal + {city}”
- HVAC/plumbing: “HVAC + {city}”, “air conditioning repair + {city}”, “plumber + {city}”, “drain cleaning + {city}”

C) Data capture columns (CSV headers):
business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes

D) How to find email (free methods):
- Website contact page (preferred)
- Staff/locations page (practice manager/office manager)
- Google Business “website” link often has contact form + sometimes email
- If none: capture contact form URL + phone; keep in list but mark email missing

E) Personalization snippet rule (safe + fast):
- Use 6–16 words from the most recent review OR paraphrase without quoting sensitive info.
- Do NOT include medical details (med spa/dental), pricing, or personal identifiers.
- Example snippet format: “Recent review mentioned ‘front desk was helpful’—no owner reply yet.”

F) QA sampling (10% daily):
- Category correct? (dentist/med spa/HVAC/plumber)
- Website valid?
- Rating/review count copied correctly?
- Last review date within 24 months (discard older)
- Personalization snippet not sensitive?

Production targets (manual):
- 50–75 leads/day per VA after first day learning curve
- 500 leads in ~8–10 working days

4) COLD EMAIL COPY PACK (3-step sequences)
Tokens you’ll use:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{google_rating}} {{review_count}} {{last_review_date}}

4.1 INITIAL EMAIL — NOT RESPONDING (Local Business)
Subject options:
1) Quick fix for unanswered Google reviews
2) {{business_name}}: replying within 12 hours
3) Noticed a few reviews without owner replies

Body:
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_snippet}}. It looks like there aren’t owner responses on a few recent reviews ({{response_gap}}).

We run an AI-assisted “review reply autopilot” for local businesses: brand-safe drafts for Google/Yelp, you approve (or set rules), and we respond within 12 hours. Negative reviews get escalated immediately.

You can see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1

Open to a 10-minute walkthrough? If you reply “yes,” I’ll send times.

— Bob
agent_bob_replit+review-bot@agentmail.to

4.2 INITIAL EMAIL — LOW RATING (Local Business)
Subject options:
1) Quick reputation recovery for {{business_name}}
2) Escalation + replies for new reviews
3) Helping local businesses respond safely

Body:
Hi {{first_name}} — Bob here.

I saw {{business_name}} has a strong review volume ({{review_count}}), but the rating is sitting around {{google_rating}}. Often it’s not the service—it’s that a few negative reviews don’t get a timely, brand-safe response.

We draft and (optionally) post replies for Google/Yelp, escalate negative reviews right away, and send a weekly KPI report (rating trend, response rate, unresolved negatives). You approve the tone and rules.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1

Want me to show you what this looks like using one of your recent reviews as an example? Reply “example” and I’ll send a draft response.

— Bob
agent_bob_replit+review-bot@agentmail.to

4.3 INITIAL EMAIL — HIGH VOLUME (Local Business)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Weekly reputation KPIs + 12-hour replies
3) Review response system for {{business_name}}

Body:
Hi {{first_name}} — Bob.

{{business_name}} is getting reviews consistently (last one: {{last_review_date}}). When volume is high, the hard part is staying consistent: fast replies, same voice, and clear escalation when something goes wrong.

Our autopilot drafts brand-safe replies for Google/Yelp, responds within 12 hours, escalates negative reviews, and sends weekly reputation KPIs so you can see response rate + rating trend.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1

Worth a quick 10 minutes this week to see if it fits your workflow?

— Bob
agent_bob_replit+review-bot@agentmail.to

4.4 FOLLOW-UP #1 (Day 2–3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — circling back.

If you want, I can:
1) draft responses to your 3 most recent reviews in your brand voice, and
2) point out where responses are missing / slow.

No pressure—should I send the sample drafts?

— Bob
agent_bob_replit+review-bot@agentmail.to

4.5 FOLLOW-UP #2 (Day 6–7)
Subject: Should I close this out?

Hi {{first_name}} — last note.

If review responses aren’t a priority right now, totally fine. If they are, our promise is simple:
- brand-safe replies for Google/Yelp
- respond within 12 hours
- escalate negatives immediately
- weekly KPI report

Reply “later” and I’ll follow up next month, or “yes” and I’ll send times for a 10-minute walkthrough.

— Bob
agent_bob_replit+review-bot@agentmail.to

5) AGENCY / RESELLER LANE (for faster scale)
Target: small marketing agencies handling SEO/GBP for local businesses.
Search footprints:
- “dental marketing agency”, “med spa marketing”, “HVAC marketing agency”, “local SEO agency + {city}”
Roles: owner, account manager, head of SEO, GBP manager.

Agency initial email:
Subject options:
1) Add review responses to your GBP deliverables
2) White-label Google/Yelp review reply autopilot
3) Quick win for your local clients

Body:
Hi {{first_name}} — Bob here.

If you manage Google Business Profiles for {{vertical}} clients, review responses are a high-leverage add-on (and usually neglected).

We provide a white-labelable review reply + escalation system: brand-safe drafts for Google/Yelp, approvals/rules, 12-hour response SLA, and weekly KPI reporting. You can package it into your retainer.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1

Want to see pricing for agencies and a sample weekly KPI report? Reply “agency” and I’ll send it.

— Bob
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (NO-TOOLS ASSUMPTION; WORKS WITH ANY MAILBOX)
Compliance notes:
- Use truthful personalization; don’t imply you used private data.
- If asked, you found their public Google reviews.
- Include a clear opt-out line if required by your jurisdiction (recommended).

CRM stages (simple pipeline):
1) Prospect (lead added; not contacted)
2) Sent (email #1 sent)
3) Replied
4) Qualified (pain confirmed, has GBP/Yelp access path)
5) Demo Booked
6) Trial/Setup
7) Paid
8) Lost (no fit / no response / timing)

14-day ramp schedule (per inbox):
- Days 1–2: 10/day (focus on best Priority A leads)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
Rules:
- Keep bounce rate < 2% (pause list source if higher)
- Complaints/spam reports: stop immediately and review copy/list
- Reply SLA: respond within 2 hours during business day

Daily operator checklist (60–90 minutes):
1) Pull 25–50 new Priority A/B leads from the sheet
2) Verify: website + category + last review date
3) Add one safe personalization snippet
4) Send Email #1 batch
5) Send follow-up #1 to leads from 2–3 days ago
6) Send follow-up #2 to leads from 6–7 days ago
7) Update CRM stages + notes
8) Log metrics: sent, delivered, replies, qualified, demos

Weekly checklist (90 minutes):
- QA 10% of leads added that week
- Refresh segmentation (response_rate_proxy changes)
- Rotate subject lines if open/reply rates drop
- Create 1 new micro-variant based on top objections

7) WHAT I NEED FROM OWNER TO UNBLOCK THE CSV
Choose ONE geography scope for the first 500–1,000 leads:
A) Top 25 US metros (best balance)
B) 5–10 states (tightest niche focus)
C) US-wide (largest, but messier)

Once chosen, the query pack can be locked and the list build can proceed immediately.
