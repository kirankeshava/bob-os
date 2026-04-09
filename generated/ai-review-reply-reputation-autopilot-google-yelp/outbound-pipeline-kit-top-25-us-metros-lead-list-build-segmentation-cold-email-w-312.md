# Outbound Pipeline Kit (Top 25 US Metros): Lead List Build + Segmentation + Cold Email (w/ website + contact) + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:08:25.010Z

---

BUSINESS
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) VERTICALS + TARGET GEO (LOCKED)
Use Top 25 US metros for consistent density and review volume.
Metros (copy/paste): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

Verticals (3):
A) Dentists: “dentist”, “cosmetic dentist”, “dental clinic”, “family dentist”, “orthodontist” (optional)
B) Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”, “medical spa”
C) HVAC/Plumbing: “HVAC”, “air conditioning repair”, “heating contractor”, “plumber”, “plumbing service”

2) GOOGLE MAPS QUERY PACK (FOR VA/OWNER)
For each metro, run queries like:
- "dentist" + "{metro}" 
- "cosmetic dentist" + "{metro}"
- "med spa" + "{metro}"
- "botox" + "{metro}"
- "HVAC" + "{metro}"
- "plumber" + "{metro}"

Collection rule: pick independent/local operators first; avoid national franchises unless location manager email is clear.
Target volume math: 25 metros x (about 7–10 qualified results per query) x 6 queries ≈ 1,050–1,500 raw → QA down to 500–1,000.

3) LEAD LIST CSV TEMPLATE (HEADERS)
Paste as the first row in a CSV/Google Sheet:
 ব্যবস_id,business_name,vertical,service_type,city_state,metro,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses,response_rate_proxy,segment,priority_tier,personalization_snippet,contact_name,role_guess,email_1,email_2,linkedin_url,notes

4) DATA DICTIONARY (WHAT TO CAPTURE)
- google_rating: the star rating on Google Business Profile.
- review_count: total Google reviews.
- last_review_date: date of the most recent review (from “Reviews” sort by newest).
- last_10_owner_responses: count how many of the last 10 reviews have an “Owner response”.
- response_rate_proxy: =last_10_owner_responses/10 (0.0–1.0).
- personalization_snippet: 8–20 words from a recent review OR a paraphrase (safer) like “recent reviewer praised your staff and speed”.
- email_1/email_2: use website Contact page, About page, footer; if none, try common patterns (info@, office@, hello@). Record what was found.

5) SEGMENTATION RULES (APPLY PER ROW)
Compute:
- response_rate_proxy = last_10_owner_responses / 10
Segment assignment (one primary):
- Not Responding: response_rate_proxy <= 0.2 OR 0 owner responses in last 10
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within 14 days
Priority tier (A/B/C):
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only

6) AGENCY/RESELLER LANE (PARALLEL LIST)
Who: local marketing agencies, SEO agencies, web design shops serving dentists/med spas/home services.
Queries:
- "dental marketing agency" + {metro}
- "med spa marketing" + {metro}
- "HVAC marketing agency" + {metro}
Collect: agency_name, website, city_state, owner/founder email, LinkedIn, niches served.
Offer positioning: white-label “review response desk” + weekly KPI report; agency marks up.

7) COLD EMAIL COPY (3-STEP) — DIRECT LOCAL BUSINESSES
All versions:
- Include legitimacy line: “If helpful, here’s what we do: {website_url}”
- Reply-to: agent_bob_replit+review-bot@agentmail.to
- CTA: 10-minute fit check OR “reply ‘yes’ and I’ll send 2 sample replies to your last reviews.”

TOKENS
{{BusinessName}} {{FirstName}} {{City}} {{ServiceType}} {{RecentReviewSnippet}} {{ResponseGap}} {{WebsiteURL}} {{ContactEmail}}
Use WebsiteURL = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Use ContactEmail = agent_bob_replit+review-bot@agentmail.to

7A) INITIAL — NOT RESPONDING (use for dentists/med spas/home services)
Subject options:
1) Quick fix for {{BusinessName}}’s review responses
2) Noticed a response gap on your Google reviews
3) Can I draft a few owner replies for you?

Body:
Hi {{FirstName}} — quick note.

I was looking at {{BusinessName}}’s recent Google reviews and noticed {{ResponseGap}}. One recent reviewer said: “{{RecentReviewSnippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negatives, and sends a weekly KPI report. You can approve replies before anything posts.

If you want, I can send 2 sample replies (in your tone) for your most recent reviews.

If helpful, here’s what we do: {{WebsiteURL}}
Best,
Bob
{{ContactEmail}}

Follow-up 1 (2 days later):
Subject: Re: review replies for {{BusinessName}}
Hi {{FirstName}} — should I send the 2 sample replies for your latest reviews? If yes, tell me the tone you want (warm/professional/short).
Bob
{{ContactEmail}}

Follow-up 2 (4 days later):
Subject: Last touch — review response autopilot
Hi {{FirstName}} — closing the loop. The main win is consistency: replies within ~12 hours, negatives escalated, and a simple weekly KPI email. Want the samples anyway?
Bob
{{ContactEmail}}

7B) INITIAL — LOW RATING (empathy + escalation)
Subject options:
1) A quick way to protect {{BusinessName}}’s rating
2) Help handling tough reviews (without sounding defensive)
3) Review triage + response in 12 hours

Body:
Hi {{FirstName}},

I saw {{BusinessName}}’s Google rating and a recent review that mentioned “{{RecentReviewSnippet}}”. When replies are slow or inconsistent, the next reviewer often piles on.

We help local teams respond quickly and safely: AI-drafted replies for Google/Yelp, negative-review escalation (so you can take it offline fast), and a weekly KPI report so you can see trendlines.

Would it help if I drafted a response to that review (plus one more) so you can see the approach?

More info: {{WebsiteURL}}
Bob
{{ContactEmail}}

Follow-up 1:
If you paste the link to the review (or the text), I’ll draft two options: (1) short/public + (2) longer/apology + resolution path.
Bob

Follow-up 2:
If now isn’t a fit, who owns reviews internally for {{BusinessName}}? I can send the samples to them.
Bob

7C) INITIAL — HIGH VOLUME (ops + throughput)
Subject options:
1) Keeping up with your review volume at {{BusinessName}}
2) Weekly review KPI report + fast replies
3) Review response ops (done-for-you)

Body:
Hi {{FirstName}},

{{BusinessName}} is getting steady review volume (nice problem). Most teams fall behind because responses become a daily task.

Our Autopilot drafts responses in your brand voice for Google/Yelp, flags negatives for escalation, and sends a weekly KPI snapshot (new reviews, avg rating, response rate, time-to-response).

Want me to show you a weekly report example + 2 drafted replies based on your newest reviews?

{{WebsiteURL}}
Bob
{{ContactEmail}}

8) AGENCY/RESELLER EMAIL (INITIAL)
Subject options:
1) White-label review response desk for your local clients
2) Add “review replies + KPIs” to your retainer
3) Quick reseller idea (dentists/med spas/home services)

Body:
Hi {{FirstName}},

Do you support local clients where Google/Yelp reviews impact calls and bookings (dentists, med spas, HVAC/plumbing)?

We offer a white-label Review Reply & Reputation Autopilot: brand-safe draft replies, negative-review escalation, and a weekly KPI email. You can bundle it into your retainer and mark it up.

If useful, I can send a 1-page overview and a sample weekly KPI report. Here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Bob
agent_bob_replit+review-bot@agentmail.to

9) DAILY SENDING OPS (NO-TOOL ASSUMPTIONS)
CRM stages:
Prospect → Sent → Opened/Clicked (optional) → Replied → Qualified → Demo Booked → Trial → Paid → Lost

14-day ramp (per inbox):
Day 1–2: 10/day (highly personalized)
Day 3–4: 20/day
Day 5–7: 30/day
Day 8–10: 40/day
Day 11–14: 50/day
Rules:
- Keep bounces <3%. If >5% in a day: stop sends, clean list.
- Reply SLA: same day; negative sentiment replies within 2 hours.
- Daily: send new + follow-ups; log outcomes; tag segment + objections.

Daily targets (single operator):
- New emails: 50
- Follow-ups: 25
- Manual personalization: 15–25 (Priority A/B only)
- Agency lane: 10/day (separate list)

10) QA CHECKLIST (SPOT CHECK 10% OF ROWS)
- Category match: correct vertical (no chiropractors in dentist list, etc.)
- Has website OR at least a usable email.
- Review data correct: rating, count, last review date.
- Response proxy computed from last 10 reviews.
- Personalization snippet is safe (no HIPAA/medical claims; paraphrase if needed).

NEXT EXECUTION STEP
- Use the query pack to build 50 leads/day for 10–20 days (or 100/day for 5–10 days) to reach 500–1,000.
- Start sending to Priority A first using the “Not Responding” or “Low Rating” email (highest urgency).