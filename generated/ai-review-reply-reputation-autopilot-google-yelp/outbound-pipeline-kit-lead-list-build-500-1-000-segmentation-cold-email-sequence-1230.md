# Outbound Pipeline Kit — Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:34:37.197Z

---

Business context
Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts and posts brand-safe responses, escalates negative reviews, and sends weekly KPI reports.
Legitimacy URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email (include in emails): agent_bob_replit+review-bot@agentmail.to

1) ICP + vertical focus (use these 3 first)
A) Dental practices (high LTV, lots of reviews, strong local search impact)
B) Med spas / aesthetic clinics (high margin, brand sensitivity, heavy review influence)
C) HVAC + Plumbing (high review velocity, competitive local packs, immediate revenue impact)

2) Segmentation + priority (what to email first)
Capture these fields per business:
- google_rating (e.g., 4.1)
- review_count (e.g., 327)
- last_review_date (e.g., 2026-03-28)
- response_rate_proxy_last10 (0–100%: % of last 10 reviews that have an owner response)
- last_review_snippet (10–20 words; paraphrase if sensitive)

Segments (assign 1 primary segment):
- NOT_RESPONDING: response_rate_proxy_last10 <= 20% OR 0 owner responses in last 10 reviews
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within last 14 days

Priority scoring (A/B/C) for send order:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Personalization tokens to collect:
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (example: “noticed recent reviews aren’t getting owner replies”)
- {{vertical_phrase}} (dentist/med spa/HVAC/plumbing wording)

3) Lead list build SOP (zero-cost path to 500–1,000)
Goal: Build 500–1,000 leads with usable contact emails and review-response signals without paying for scrapers.

Step 1 — Choose geography (required to start)
Pick ONE approach for initial list quality:
- Option 1: Top 25 US metros (fastest volume, diverse)
- Option 2: 5–10 target states (tighter operations, better personalization)
- Option 3: US-wide (harder QA; more noise)

Step 2 — Google Maps query pack (repeatable)
For each metro/state, run searches like:
Dental:
- “dentist {{city}}”
- “cosmetic dentist {{city}}”
- “pediatric dentist {{city}}”
Med spa:
- “med spa {{city}}”
- “aesthetic clinic {{city}}”
- “botox {{city}}” (verify category fits)
Home services:
- “HVAC {{city}}”
- “air conditioning repair {{city}}”
- “plumber {{city}}”

Selection rules (to avoid junk):
- Must have a website OR clearly listed email on Google Business Profile
- Avoid national franchises unless independently owned
- Prefer businesses with 50+ reviews (enough signal)

Step 3 — Data capture (per lead)
In a Google Sheet, add columns:
business_name | vertical | city_state | phone | website | google_maps_url | google_rating | review_count | last_review_date | response_rate_proxy_last10 | owner_or_manager_name | role_guess | email_1 | email_2 | segment | priority | recent_review_snippet | notes

How to get response_rate_proxy_last10 quickly:
- Open Google reviews, scan last 10 reviews
- Count owner replies among those 10
- response_rate_proxy_last10 = (owner_replies/10)*100

How to get email (free):
Pass 1 (fast):
- Check website footer + Contact page
- Look for: info@, hello@, office@, support@, manager@, appointments@, contact form (if form only, note “form-only”)
Pass 2 (quality):
- Check “About/Team” page for owner name and a direct email
- If none, use standardized pattern guess ONLY when domain is clear (e.g., first@domain) and mark as “guessed” in notes

QA rules (every 50 rows sample 10):
- Website loads and matches business
- Category matches vertical
- Rating/review_count not blank
- last_review_date within last 90 days preferred
- email deliverability sanity check: domain matches website

Production target (manual):
- 50 leads/day per person is realistic with response proxy + emails if you keep it tight.

4) Cold email sequences (3-step) — Local businesses
Guidelines:
- Keep first email <120 words
- Ask a yes/no question
- Use 1 personalization line maximum
- Reference legitimacy URL and contact email in the footer

4.1 Master Sequence (swap lines by segment)

Email 1 (Initial)
Subject options (pick 1):
A) Quick question about your review replies
B) {{business_name}} — review response help?

Body:
Hi {{first_name_or_team}},

Saw a recent review for {{business_name}} (“{{recent_review_snippet}}”). {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies + negative-review escalation + a weekly KPI report. You can approve replies before anything posts.

If I could help you respond within 12 hours (without adding admin work), would you be open to a 10‑minute look?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Segment swaps for {{response_gap}} (choose one):
- NOT_RESPONDING: “Noticed many recent reviews aren’t getting an owner response yet”
- LOW_RATING: “Noticed the rating is a bit under where most {{vertical_phrase}} want to be”
- HIGH_VOLUME: “Looks like you’re getting a steady stream of reviews every week”

Email 2 (Follow-up #1, 3–4 days later)
Subject options:
A) Worth handing off review replies?
B) Re: {{business_name}} reviews

Body:
Hi {{first_name_or_team}},

Most owners we talk to want two things: (1) more 5-star experiences and (2) no brand-risk in public replies.

We draft responses in your voice, flag anything sensitive, and send a simple weekly report (new reviews, response time, rating trend, negatives escalated).

Should I send a quick example response based on your latest review?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 3 (Follow-up #2, 7–10 days later)
Subject options:
A) Close the loop?
B) Last try — review reply autopilot

Body:
Hi {{first_name_or_team}},

Closing the loop—if review replies aren’t a priority right now, no worries.

If you want, I can:
- draft 3 replies for your most recent reviews (free), and
- show how we’d handle any negative review escalation.

Reply “yes” and I’ll send them, or “later” and I’ll circle back next month.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

4.2 Vertical phrasing tokens (use in copy + personalization)
- Dental: {{vertical_phrase}} = “dental practices” / “dentists” / “front desk teams”
- Med spa: “med spas” / “aesthetic clinics” / “patient coordinators”
- HVAC/Plumbing: “home service companies” / “dispatch teams” / “service managers”

5) Cold email sequences — Agencies/resellers (3-step)
Target: local SEO agencies, small marketing agencies, reputation management consultants.

Email 1
Subject options:
A) Add review response automation to your retainers
B) White-label review reply + reporting?

Body:
Hi {{first_name}},

If you manage local SEO for dentists/med spas/home services: we built a simple AI Review Reply & Reputation Autopilot (Google/Yelp).

It drafts brand-safe replies, escalates negatives, and sends weekly reputation KPIs—so you can bundle it into a retainer (white-label friendly). Clients can approve before posting.

Open to a 10-minute chat to see if this fits your packages?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 2
Subject: Re: white-label review replies

Body:
Hi {{first_name}},

Common agency pain we see: reviews piling up, inconsistent tone across locations, and no clear weekly reporting.

We can provide:
- 12-hour draft turnaround
- escalation queue for negatives
- weekly KPI snapshot you can forward to clients

Want me to send a sample client report layout?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 3
Subject: Should I stop reaching out?

Body:
Hi {{first_name}},

Should I stop reaching out, or is review response automation something you’ll revisit later?

If helpful, reply with “sample” and I’ll send:
1) a one-page reseller pitch blurb, and
2) a demo workflow you can show a client.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) Daily sending ops (single-inbox, low-risk)
Tools: Gmail/Google Workspace (or any inbox), Google Sheets as CRM.

14-day ramp (per inbox; keep it conservative):
- Days 1–2: 10 new/day + 10 follow-ups/day
- Days 3–4: 20 new/day + 15 follow-ups/day
- Days 5–7: 30 new/day + 20 follow-ups/day
- Week 2: 40–60 new/day + 20–30 follow-ups/day
Rules:
- Never exceed ~120 total sends/day/inbox early on.
- Pause sends if bounce rate >3% in a day; clean list.
- Remove anyone who replies “stop” immediately.

Daily workflow (60–90 minutes):
1) Pull today’s Priority A leads (new)
2) Add 1 personalization line (snippet + response gap)
3) Send Email 1
4) Send scheduled follow-ups to non-responders
5) Update CRM stage and notes
6) Reply SLA: same day for interested replies

7) CRM stages (simple)
Stages:
- Prospect (in sheet, not emailed)
- Sent (E1 sent)
- Follow-up 1 sent
- Follow-up 2 sent
- Replied
- Qualified (has GBP/Yelp + pain confirmed)
- Demo booked
- Trial started
- Paid
- Lost (reason)
Required CRM fields:
- next_follow_up_date
- last_touch_date
- status
- segment + priority
- notes (pain, tools used, timing)

8) What I need from owner to unlock the 500–1,000 CSV fast
One decision: initial geography scope (Top 25 metros vs 5–10 states vs US-wide). Once chosen, the query pack becomes fixed and list building can begin immediately.
