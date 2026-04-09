# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:13:52.340Z

---

BUSINESS REFERENCES (use in outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) VERTICALS + GEO (INITIAL PULL)
Verticals (high review velocity + high LTV):
A) Dentists (general + cosmetic)
B) Med Spas / Aesthetic clinics
C) HVAC + Plumbers (home services)

Geography: Top 25 US metros (repeatable and high density). Use these as city modifiers in Google Maps queries:
NYC, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Portland.

2) LEAD LIST CSV TEMPLATE (1,000 ROWS) — COLUMNS
Create a Google Sheet with these headers (export as CSV).

REQUIRED FIELDS:
- lead_id (unique)
- vertical (dentist | med_spa | hvac_plumbing)
- business_name
- city
- state
- metro
- address
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- personalization_snippet (1 sentence: either quoted short excerpt or paraphrase)
- decision_maker_name (if known)
- decision_maker_role (owner | office_manager | practice_manager | GM | marketing)
- email_1
- email_2
- linkedin_url (optional)
- notes
- status (Not Contacted | Sent | Replied | Qualified | Demo Booked | Trial | Paid | Lost)
- last_touch_date

FORMULAS / RULES (apply as you collect):
- High Volume = (review_count >= 200) OR (TODAY()-last_review_date <= 14)
- Low Rating = (google_rating < 4.2)
- Not Responding = (response_rate_proxy_last10 <= 20)
- Segment logic:
  - If Low Rating AND High Volume => segment=mixed
  - Else if Low Rating => segment=low_rating
  - Else if Not Responding => segment=not_responding
  - Else if High Volume => segment=high_volume
  - Else segment=high_volume (default) only if review_count >= 80, otherwise deprioritize

- Priority logic:
  - Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
  - Priority B: Not Responding OR Low Rating
  - Priority C: High Volume only

How to compute response_rate_proxy_last10 quickly (manual method):
- Open GBP > Reviews > scan last 10 reviews. Count how many have an “Owner response”.
- response_rate_proxy_last10 = (owner_responses / 10) * 100.

Personalization snippet safety:
- Prefer paraphrase of the most recent review over long quoting.
- If quoting, keep to <12 words and never include sensitive medical/service details.

3) GOOGLE MAPS QUERY PACK (COPY/PASTE)
For each metro, run these searches in Google Maps:
Dentist:
- “dentist {metro}”
- “cosmetic dentist {metro}”
Med Spa:
- “med spa {metro}”
- “aesthetic clinic {metro}”
HVAC/Plumbing:
- “HVAC {metro}”
- “plumber {metro}”

Collection rules (to keep quality high):
- Skip franchises with centralized reputation teams (unless owner-operated).
- Prefer businesses with a website (required).
- Prefer review_count >= 80 OR last_review_date within 30 days.

4) SEGMENTED PROSPECTING PLAN (WHAT TO SEND TO WHOM)
Goal: match message to pain.

A) Not Responding (response_rate_proxy_last10 <=20%)
Positioning: “You’re leaving revenue and trust on the table; we reply within 12 hours, brand-safe; you can approve.”
Offer: 7-day pilot responding to new reviews + backlog sample (3 drafts).
CTA: “Want me to draft replies to the last 3 reviews so you can see the tone?”

B) Low Rating (<4.2)
Positioning: “Recover trust + stop negative spirals; escalate negatives immediately; consistent, calm responses.”
Offer: triage workflow + weekly KPI report + escalation.
CTA: “If I draft a response to your most recent 1–2 star review, who should approve it?”

C) High Volume (>=200 reviews or recent activity)
Positioning: “Operational load; consistent voice; never miss a review; weekly reporting.”
Offer: SLA-based response (within 12 hours), weekly KPIs.
CTA: “Want a quick 10-min look at your review volume + response coverage?”

5) COLD EMAIL SEQUENCES (3-STEP) — READY TO SEND
Use tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{google_rating}}, {{review_count}}, {{last_review_date}}

GENERAL PERSONALIZED HOOK (insert into Email 1):
- “I saw a recent review that mentioned: ‘{{recent_review_snippet}}’. I also noticed {{response_gap}}.”
Examples of response_gap:
- “there aren’t many owner replies in the last 10 reviews”
- “your last few reviews haven’t been responded to yet”

EMAIL 1 (choose variant by segment)

Subject options (pick 1):
- “Quick idea for {{business_name}} reviews”
- “Reply coverage for {{business_name}}”
- “12-hour review replies (you approve)”

Variant A — Not Responding:
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”. I also noticed there aren’t many owner replies recently.

We run an AI Review Reply & Reputation Autopilot for local businesses: we draft brand-safe responses to every new Google/Yelp review within 12 hours, escalate negatives immediately, and send a weekly KPI report. You can approve replies before anything posts.

If you want, I can draft replies to your last 3 reviews so you can see tone/quality. No login needed to start.

Should I send those drafts here, or is there someone else who owns reviews?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant B — Low Rating:
Hi {{first_name}} — Bob here.

I saw a recent Google review for {{business_name}} that said: “{{recent_review_snippet}}”. When ratings dip, fast/consistent responses can prevent a pile-on and show prospects you take issues seriously.

Our Reputation Autopilot drafts calm, brand-safe replies for Google/Yelp, flags anything sensitive for manual approval, and escalates negative reviews instantly. We also send a weekly report (rating trend, response coverage, negatives by theme).

If I draft a response to the most recent 1–2 star review in your style, who should approve it?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant C — High Volume:
Hi {{first_name}} — I’m Bob.

{{business_name}} has strong review activity ({{review_count}} total). Keeping up with replies consistently is hard, but it’s one of the easiest ways to convert “comparison shoppers.”

We provide an AI Review Reply & Reputation Autopilot: responses within 12 hours on Google/Yelp, negatives escalated immediately, and weekly reputation KPIs. You can approve before posting, or run on auto-approve with guardrails.

Open to a quick 10-minute check of your review volume + response coverage to see if this would save your team time?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 2 (Follow-up, +2 business days)
Subject: “Re: {{business_name}} reviews”
Hi {{first_name}} — quick follow-up.

If I draft 3 replies based on your most recent reviews (matching your tone + compliant), would you want them?

If you’re not the right person, who owns Google/Yelp review responses at {{business_name}}?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 3 (Bump, +4 business days)
Subject: “Close the loop?”
Hi {{first_name}} — should I close the loop on this?

If review replies are already handled, no worries. If not, I can:
- Reply to every new review within 12 hours (Google/Yelp)
- Escalate negatives immediately
- Send weekly KPIs (rating trend + response coverage)

Want me to send 3 sample drafts for {{business_name}}?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

AGENCY / RESELLER LANE (EMAIL 1)
Subject: “White-label review reply autopilot for your clients?”
Hi {{first_name}} — Bob here.

If you manage local clients (dentists, med spas, home services), review response management is a high-retention add-on but a pain operationally.

We provide a brand-safe AI Review Reply & Reputation Autopilot for Google/Yelp: 12-hour response SLA, negative review escalation, and weekly KPI reporting. It’s set up so you can resell/white-label and keep margin.

Worth a quick chat to see if this fits your client stack? If you tell me your top vertical, I’ll send a sample report + reply drafts.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS + 14-DAY RAMP (NO PAID TOOLS ASSUMED)
Assumptions: 1 inbox, new domain/inbox should ramp slowly. If using an existing warmed inbox, you can be more aggressive.

Daily targets (baseline):
- New sends/day: start 20 → ramp to 80
- Follow-ups/day: 1.5–2x new sends once sequence is running
- Personalization: 1 snippet + segment per lead

14-day ramp example (new inbox):
Day 1-2: 20/day
Day 3-4: 30/day
Day 5-6: 40/day
Day 7-8: 50/day
Day 9-10: 60/day
Day 11-12: 70/day
Day 13-14: 80/day
Rules:
- Keep bounce rate <3% (pause and clean list if higher)
- Complaints >0.1% => stop, review copy/list
- Reply SLA: respond to positive replies within 1 hour during business day; negative within 4 hours

List QA checklist (before sending):
- Business has website + valid domain email (avoid generic if possible)
- Category matches vertical
- Recent review snippet is safe (no PHI / sensitive claims)
- Segment + priority computed

7) CRM PIPELINE STAGES (SIMPLE)
Stages + entry/exit:
- Not Contacted: lead collected, not emailed
- Sent: Email 1 sent
- Replied: any reply
- Qualified: confirmed they handle reviews + pain exists
- Demo Booked: time scheduled
- Trial: pilot running (drafts or limited posting)
- Paid: subscription/retainer active
- Lost: not a fit/no response after 3 touches + 30 days

KPI weekly minimums (for 1 inbox at 80/day by end of ramp):
- 300–500 total sends/week
- 8–15% reply rate (target with personalization)
- 2–5% qualified rate
- 1–2 demos/week early; scale with more inboxes once deliverability is proven

NEXT EXECUTION STEP (ZERO-COST)
- Build first 100 leads (Priority A/B) using the template + Google Maps workflow.
- Start sending Day-1 ramp immediately to those 100 leads.
- Build the next 100 leads daily until you reach 500–1,000.

If speed becomes the bottleneck, we can switch to a paid scraper/enrichment—requires explicit approval before any spend.