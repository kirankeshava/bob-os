# Outbound Pipeline Kit (Top-25 Metros): Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:35:18.124Z

---

Below is a single, ready-to-run outbound kit for AI Review Reply & Reputation Autopilot (Google/Yelp).

BUSINESS LEGITIMACY LINKS (use in emails)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (1,000 rows) — COLUMN HEADERS (copy/paste into Google Sheets)
lead_id,vertical,priority_tier,segment_primary,segment_secondary,business_name,city,state,metro,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,email_confidence,notes,next_step,crm_stage

A1) DATA DICTIONARY (what to fill)
- vertical: Dentist | Med Spa | HVAC/Plumbing
- google_rating: number from GBP (e.g., 4.1)
- review_count: total reviews shown on GBP
- last_review_date: date of most recent review
- last_review_snippet: 8–25 words from the most recent review (or paraphrase if sensitive)
- response_rate_proxy_last10: % of last 10 reviews that have an owner response (0–100). If last 10 can’t be checked fast, use 0/50/100 as rough buckets and add note.
- segment_primary (rules below): not_responding | low_rating | high_volume
- priority_tier: A | B | C
- email_confidence: high (direct), med (patterned), low (generic form)

A2) SEGMENTATION RULES (apply per lead)
1) not_responding: response_rate_proxy_last10 <= 20
2) low_rating: google_rating < 4.2
3) high_volume: review_count >= 200 OR last_review_date within 14 days
Segment assignment:
- If low_rating true => segment_primary=low_rating
- Else if not_responding true => segment_primary=not_responding
- Else if high_volume true => segment_primary=high_volume
- Else => segment_primary=high_volume (fallback if decent fit but low data)

A3) PRIORITY TIERING (who to email first)
Priority A:
- (not_responding AND high_volume) OR (low_rating AND high_volume)
Priority B:
- not_responding only OR low_rating only
Priority C:
- high_volume only

A4) GOOGLE SHEETS FORMULAS (optional)
Assume columns:
- google_rating in M
- review_count in N
- last_review_date in O
- response_rate_proxy_last10 in Q
Create helper columns (or embed into segment calc):
- high_volume_flag: =IF(OR(N2>=200, O2>=TODAY()-14), TRUE, FALSE)
- not_responding_flag: =IF(Q2<=20, TRUE, FALSE)
- low_rating_flag: =IF(M2<4.2, TRUE, FALSE)
- segment_primary:
=IF(M2<4.2,"low_rating",IF(Q2<=20,"not_responding",IF(OR(N2>=200,O2>=TODAY()-14),"high_volume","high_volume")))
- priority_tier:
=IF(OR(AND(Q2<=20,OR(N2>=200,O2>=TODAY()-14)),AND(M2<4.2,OR(N2>=200,O2>=TODAY()-14))),"A",IF(OR(Q2<=20,M2<4.2),"B","C"))

B) TARGET GEOGRAPHY + QUERY PACK (TOP 25 US METROS)
Metros to rotate through (use in Google Maps searches):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

B1) GOOGLE MAPS SEARCH QUERIES (copy/paste)
Dentist lane:
- “dentist” + {metro}
- “cosmetic dentist” + {metro}
- “dental implants” + {metro}
Med spa lane:
- “med spa” + {metro}
- “aesthetic clinic” + {metro}
- “botox” + {metro}
HVAC/Plumbing lane:
- “HVAC” + {metro}
- “air conditioning repair” + {metro}
- “plumber” + {metro}

Collection rules (fast QA):
- Prefer independent/local brands over multi-state franchises.
- Prefer businesses with websites listed.
- Capture google_rating, review_count, last_review_date.
- For response proxy: open last ~10 reviews; count those with “Response from the owner.”

C) COLD EMAIL SEQUENCES (3-step) — INCLUDE WEBSITE + CONTACT
Personalization tokens:
{{first_name}} (if known), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical_specific_line}}

C1) UNIVERSAL VALUE PROP (use across verticals)
- “We draft brand-safe replies to Google/Yelp reviews, escalate negatives fast, and send weekly reputation KPIs. You approve (or we can auto-post once you’re comfortable).”
- “Goal: respond within 12 hours, protect rating, and turn review activity into booked jobs.”

C2) DENTIST — INITIAL
Subject options:
1) {{business_name}} Google reviews (quick win)
2) 12-hour review replies for {{business_name}}
3) Question about your recent review

Body:
Hi {{first_name}} —

I was looking at {{business_name}}’s Google reviews in {{city}}. I noticed {{response_gap}} and a recent review saying: “{{recent_review_snippet}}”.

We run a simple “Review Reply & Reputation Autopilot” for local practices: brand-safe draft replies for Google/Yelp, fast escalation for negative reviews, and a weekly KPI report. Typical setup targets replies within ~12 hours.

If it helps, here’s our site with the exact workflow: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if this fits {{business_name}}? If you prefer, reply “send example” and I’ll send 2–3 sample replies using your recent reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

C3) DENTIST — FOLLOW-UP 1 (2 business days later)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — quick follow-up.

Most practices we talk to don’t need “more reviews” first — they need consistent replies so prospects see responsiveness (especially on the most recent reviews).

Want me to draft 3 replies for {{business_name}} (no charge), based on your latest reviews? You can say yes/no after you see them.

— Bob
agent_bob_replit+review-bot@agentmail.to

C4) DENTIST — FOLLOW-UP 2 (5–7 business days later)
Subject: Should I close the loop?
Body:
Hi {{first_name}} — should I close the loop here?

If review replies aren’t a priority right now, no worries. If they are, we can start with a lightweight setup: you approve replies, we handle drafting + escalation + weekly KPIs.

If you want, reply with “1” and I’ll send examples, or “2” and I’ll propose a 10-minute time.

— Bob

C5) MED SPA — INITIAL (swap vertical line)
Subject options:
1) Reputation + review replies for {{business_name}}
2) Quick question about your latest Google reviews
3) 12-hour review replies (Google/Yelp)

Body:
Hi {{first_name}} —

I was looking at {{business_name}}’s reviews and saw {{response_gap}}. One recent review mentioned: “{{recent_review_snippet}}”.

We help med spas keep a consistent, brand-safe voice in Google/Yelp replies, escalate negatives quickly (before they snowball), and send weekly KPIs so you can track impact.

Our workflow is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Would you be open to a quick 10-minute chat? Or reply “send example” and I’ll draft a few replies in your brand tone.

— Bob
agent_bob_replit+review-bot@agentmail.to

C6) HVAC/PLUMBING — INITIAL
Subject options:
1) Faster review replies for {{business_name}}
2) Quick fix for your Google reviews
3) About your most recent review

Body:
Hi {{first_name}} —

I’m reaching out because {{business_name}} gets steady review activity and I noticed {{response_gap}}. A recent review said: “{{recent_review_snippet}}”.

We run a “Review Reply & Reputation Autopilot” for local service businesses: we draft brand-safe replies for Google/Yelp, flag negatives for immediate escalation, and send weekly reputation KPIs.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute call to see if we can take review replies off your plate? If you reply “example,” I’ll send 2–3 sample responses.

— Bob
agent_bob_replit+review-bot@agentmail.to

C7) AGENCY/RESELLER — INITIAL (for marketing agencies)
Subject: White-label review reply autopilot for your clients?
Body:
Hi {{first_name}} —

Do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We provide a white-label “review reply autopilot”: brand-safe draft replies for Google/Yelp, negative-review escalation, and weekly KPI reporting. You can resell it as an add-on; we stay invisible or co-branded.

Workflow: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick call? If you tell me your niche + client count, I’ll suggest a simple packaging + margin.

— Bob
agent_bob_replit+review-bot@agentmail.to

D) DAILY SENDING OPS + CRM
D1) CRM STAGES (simple and strict)
1. Prospect (has email + minimum GBP data)
2. Queued (personalized snippet ready)
3. Sent – Email 1
4. Sent – Follow-up 1
5. Sent – Follow-up 2
6. Replied – Interested
7. Replied – Not now
8. Qualified (has GBP access path + decision maker)
9. Demo Booked
10. Trial / Pilot
11. Paid
12. Lost

D2) 14-DAY RAMP (per inbox; keep it conservative)
Day 1–2: 20/day
Day 3–4: 30/day
Day 5–6: 40/day
Day 7–8: 50/day
Day 9–10: 60/day
Day 11–14: 70–80/day
If using 2 inboxes, split volumes. Stop ramping if bounce >3% or spam complaints >0.1%.

D3) DAILY CHECKLIST (60–90 minutes)
- Build/QA 20–50 new leads (Priority A first)
- Confirm website exists and email is valid-looking
- Personalize first line with snippet + response gap
- Send today’s batch (per ramp)
- Respond to replies within 2 hours (business hours)
- Log outcomes + schedule follow-ups

D4) QA RULES (to avoid garbage leads)
- Exclude: businesses without website, closed/permanently closed, obvious franchises with corporate reputation teams, duplicates
- Ensure: review_count and rating captured; last_review_date within 90 days preferred
- Personalization safety: quote only short excerpt; avoid patient details (dentists/med spa). If sensitive, paraphrase (“a recent customer mentioned wait time”).

If you want me to generate the actual 500–1,000 lead CSV, I can do it fastest with a paid scraper (needs approval). Otherwise, this kit lets a human/VA build the list free using the query pack + template and start sending as soon as the first 50–200 leads are filled.