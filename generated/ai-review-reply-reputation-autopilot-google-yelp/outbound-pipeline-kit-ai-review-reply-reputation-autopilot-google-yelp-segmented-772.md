# Outbound Pipeline Kit — AI Review Reply & Reputation Autopilot (Google/Yelp): Segmented Plan + Cold Emails + Ops Checklist + CRM + Lead CSV Template

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:18:37.865Z

---

BUSINESS REFERENCES (use in all outbound)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email (reply-to / signature): agent_bob_replit+review-bot@agentmail.to

====================================================================
1) ICP + VERTICALS (2–3 to start)
Vertical 1: Dental practices (general + cosmetic). Why: high LTV, frequent reviews, high trust impact.
Vertical 2: Med spas / aesthetic clinics. Why: review velocity + high price services; reputation drives bookings.
Vertical 3: HVAC + Plumbers (home services). Why: high competition + urgent buyer intent; responsiveness matters.
Secondary channel: Agencies (local marketing / SEO / reputation management resellers) serving these verticals.

Decision needed from owner (to lock lead list queries):
Choose geography for the first 500–1,000 leads:
A) Top 25 US metros (recommended for speed and density)
B) 5–10 target states (if you have regional focus)
C) US-wide (broadest, but noisier)

====================================================================
2) LEAD LIST DATA MODEL (CSV HEADERS)
Use this header row exactly:
lead_id,business_name,vertical,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority_tier,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,notes

Definitions:
- last_review_date: date of newest Google review (YYYY-MM-DD).
- response_rate_proxy_last10: % of last 10 reviews that have an owner/manager response (0–100).
- personalization_snippet: 8–20 words from the latest review OR a safe paraphrase (no profanity, no sensitive health details).

====================================================================
3) SEGMENTATION RULES + PRIORITY SCORING
Compute segments with these rules (apply all that match; pick the primary one by priority order below):
A) Not Responding:
- response_rate_proxy_last10 <= 20 OR 0 owner replies in last 10 reviews
B) Low Rating:
- google_rating < 4.2
C) High Volume:
- review_count >= 200 OR last_review_date is within the last 14 days

Primary segment selection order (if multiple apply):
1) Low Rating
2) Not Responding
3) High Volume

Priority tier:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only

Routing to email variant:
- Low Rating → “damage control + escalation” variant
- Not Responding → “response gap + speed/SOP” variant
- High Volume → “throughput + consistency + weekly KPI reporting” variant

====================================================================
4) LEAD LIST BUILD SOP (ZERO-COST GOOGLE MAPS WORKFLOW)
Goal: 500–1,000 rows with rating/review signals + best-available email.

Step-by-step:
1) Choose metros/states (see Decision above).
2) Google Maps search footprints (examples):
   - Dental: “dentist in {{city}}”, “cosmetic dentist in {{city}}”, “dental clinic in {{city}}”
   - Med spa: “med spa in {{city}}”, “aesthetic clinic in {{city}}”, “botox in {{city}}”
   - Home services: “HVAC in {{city}}”, “air conditioning repair in {{city}}”, “plumber in {{city}}”
3) For each business, capture:
   - Name, phone, website, Maps URL, rating, review count
   - Open the reviews panel, record newest review date
   - Check last ~10 reviews quickly; count owner responses to estimate response_rate_proxy_last10
   - Copy a short, safe review snippet (or paraphrase)
4) Email capture (best effort, zero-cost first):
   - Pull from website contact page / footer; look for owner/manager email or general inbox
   - If none, use formats like info@, hello@, office@ only if published
   - Optional free enrichment: LinkedIn search for “{{business}} owner” and capture contact name (no scraping needed)
5) QA rules (reject leads that fail):
   - No website AND no email (unless extremely high-priority and phone outreach planned)
   - Franchise listings where owner is not reachable (unless multi-location deal targeted)
   - Category mismatch (e.g., dental supply, training school)
6) Sampling QA: every 50 rows, re-check 5 randomly for correctness.

Minimum viable list for first send (if time constrained):
- 200 leads total: 70 dental / 70 med spa / 60 home services, weighted to Priority A/B.

====================================================================
5) COLD EMAIL SEQUENCE PACK (3 TOUCHES)
Rules:
- Keep it short.
- 1 clear CTA: “Want me to send 2–3 sample replies for approval?”
- Personalize with {{personalization_snippet}} and {{response_gap}}.
- Include legitimacy link and reply-to email.

TOKENS
{{first_name}} (use if known; otherwise “Hi there”)
{{business_name}}
{{city}}
{{vertical}}
{{personalization_snippet}}
{{last_review_date}}
{{response_gap}} (example: “looks like a few recent reviews didn’t get a public reply”)

-----------------------------
5A) DENTAL — Not Responding Variant

Email 1 (Day 1)
Subject options:
1) Quick question about replying to Google reviews
2) {{business_name}} — review responses
3) Can I draft a couple replies for you?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}} (latest mentions: “{{personalization_snippet}}”).

We run an AI-assisted “review reply + escalation” autopilot for local businesses: brand-safe responses within ~12 hours, negative reviews flagged immediately, and a simple weekly KPI email. You can approve replies before anything is posted.

Want me to draft 2–3 sample replies for your latest reviews so you can see the tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 2 (Day 3)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}},

Totally understand you’re busy. The quick win we usually see for dental practices is simply replying consistently (especially to 4–5 star reviews) so future patients see an active, caring office.

If you share 1 preferred “voice” (friendly / formal / concise), I’ll send 2–3 ready-to-post replies.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 3 (Day 7)
Subject: Should I close the loop?
Body:
Hi {{first_name}},

Should I close the loop here, or is someone else at {{business_name}} responsible for review responses?

If it helps, I can send a sample weekly report format (response rate, new reviews, negatives flagged) tailored to dental.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

-----------------------------
5B) DENTAL — Low Rating Variant (damage control)

Email 1
Subject options:
1) Idea to lift {{business_name}}’s rating perception
2) Google reviews for {{business_name}}
3) Quick fix for negative reviews

Body:
Hi {{first_name}},

I saw {{business_name}}’s Google rating and a recent review that said “{{personalization_snippet}}”. When negatives don’t get a fast, professional reply, it can quietly cost new patient calls.

We help local businesses respond brand-safely within ~12 hours, escalate negatives to a manager immediately, and keep a weekly KPI report. Replies can be approval-based.

Want me to draft a calm, HIPAA-safe response to your most recent 1–2 negative reviews (no commitment)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-ups: same structure as above, focused on “we escalate + you approve”.

-----------------------------
5C) MED SPA — High Volume Variant

Email 1
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Review replies in under 12 hours
3) Quick idea for your Google reviews

Body:
Hi {{first_name}},

{{business_name}} gets a strong flow of new reviews (latest: “{{personalization_snippet}}”). Many med spas struggle to keep replies consistent without risking tone/brand.

We run a brand-safe review reply autopilot: draft replies fast, flag negatives, and send weekly KPIs (new reviews, response rate, themes). You can approve replies before posting.

Want me to send 3 sample replies that match your brand voice?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-ups: emphasize brand voice + consistency.

-----------------------------
5D) HVAC/PLUMBING — Not Responding Variant (speed + trust)

Email 1
Subject options:
1) Quick fix to win more calls from Google
2) {{business_name}} — review reply gap
3) Can I draft a few replies for you?

Body:
Hi {{first_name}},

I was checking {{business_name}}’s Google reviews—someone recently wrote “{{personalization_snippet}}”. It looks like {{response_gap}}.

For home services, fast public replies build trust and can nudge the next customer to call. We draft brand-safe responses within ~12 hours, escalate negatives immediately, and send a weekly KPI snapshot. You can approve before anything posts.

Want 2–3 sample replies for your newest reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

-----------------------------
5E) AGENCY / RESELLER VERSION (initial email)

Subject options:
1) White-label review reply autopilot for your clients?
2) Add-on service for Google review responses
3) Quick partnership idea (reputation ops)

Body:
Hi {{first_name}},

If you manage local SEO/GBP for {{vertical}} clients: we offer a simple white-label “review reply + escalation + weekly KPI” autopilot.

Your team gets:
- Brand-safe draft replies in ~12 hours
- Negative reviews escalated immediately
- Weekly KPI report you can forward to clients
- Optional approval workflow (you or the client approves)

If you want, I can share a quick overview + the client-facing report format:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth a 10-minute call to see if it fits your retainers?

— Bob
agent_bob_replit+review-bot@agentmail.to

====================================================================
6) DAILY SENDING OPS (14-DAY RAMP) + COMPLIANCE
Assumptions: 1–2 inboxes to start; send only to business emails; keep personalization; monitor bounces.

Day 1–3: 15–25 new emails/day/inbox (manual personalization on Priority A)
Day 4–7: 25–40 new/day/inbox + follow-ups begin
Day 8–14: 40–70 new/day/inbox depending on bounce/complaints
Hard stops:
- If bounce rate > 3–5%: pause, clean list
- If spam complaints > 0.1%: pause, adjust copy, reduce volume
Reply SLA:
- Reply within 2 hours during business day (or same day max)

Daily checklist:
1) Pull 25–50 Priority A/B leads
2) Add personalization snippet + response gap
3) Send Email 1
4) Send scheduled follow-ups (Email 2/3)
5) Log replies + set next step
6) Track KPIs: sent, delivered, replies, positive replies, demos booked

====================================================================
7) CRM PIPELINE (simple stages + entry/exit)
Stages:
1) Prospect (has email + segmentation)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Qualified (they confirm they own/manage GBP/Yelp or want help)
5) Demo Booked
6) Trial / Pilot (send 2–3 samples + connect account if applicable)
7) Paid
8) Lost (with reason: no fit, no access, already handled, timing)

Qualification questions (keep short):
- “Do you want replies to be approval-based or fully autopilot?”
- “Are you mainly focused on Google Business Profile, Yelp, or both?”
- “Who should negatives be escalated to, and what’s the response window you want?”

====================================================================
8) SEGMENTED PROSPECTING PLAN (WHAT TO SEND FIRST)
Week 1: Direct-to-local, Priority A only
- 60% Not Responding + High Volume
- 40% Low Rating + High Volume
Week 2: Expand to Priority B + start agency lane
- 1 agency block/day (10–20 emails) targeting: “local SEO”, “dental marketing”, “med spa marketing”, “home services marketing”
Week 3–4: Scale volume + test 2 offers
Offer A (core): “We respond within 12 hours + weekly KPIs + escalation; you approve.”
Offer B (hook): “We’ll draft replies for your last 10 reviews free—keep them either way.”

====================================================================
9) LEAD CSV TEMPLATE (copy/paste header)
lead_id,business_name,vertical,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority_tier,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,notes

NEXT ACTION REQUIRED FROM OWNER
Reply with the geography choice (A top 25 metros / B states / C US-wide). Once chosen, the query pack can be locked and the 500–1,000 lead build can begin immediately using the SOP above.