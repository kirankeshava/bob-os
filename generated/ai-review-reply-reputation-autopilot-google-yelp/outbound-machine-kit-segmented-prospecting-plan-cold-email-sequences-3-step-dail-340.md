# Outbound Machine Kit — Segmented Prospecting Plan + Cold Email Sequences (3-Step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:07:42.212Z

---

BUSINESS CONTEXT (include in footer / replies)
- Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
- Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (focus for first 30 days)
A. Dental practices
- Why: high trust category, strong LTV, consistent review flow, front-desk time constraints.
- Common pain: no time to respond; uneven tone; HIPAA sensitivity; negative reviews not escalated.

B. Med spas / aesthetic clinics
- Why: reviews heavily influence bookings; high competition; frequent short reviews; multiple locations.
- Common pain: brand voice inconsistency; negative reviews need fast response; owners want approval control.

C. HVAC / Plumbing (home services)
- Why: high review velocity; immediate revenue impact; many “no response” profiles.
- Common pain: overwhelmed dispatch/owner; responses missed; negative reviews sit unanswered.

Parallel lane: Agencies (marketing/SEO shops serving local businesses)
- Why: faster scale via reseller; agencies already own reputation workflows and want margin.


2) SEGMENTATION + PRIORITY (used for list tags + template routing)
Capture these minimum fields per prospect:
- google_rating, review_count, last_review_date, response_rate_proxy (responses in last 10 reviews / 10)

Segments (apply one primary segment):
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR no owner replies visible in last ~10 reviews
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within last 14 days

Priority tiers (for send order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Template routing:
- NOT_RESPONDING → “response gap” angle + speed/approval
- LOW_RATING → “escalation + repair” angle + safety/approval
- HIGH_VOLUME → “ops + consistency” angle + weekly KPI reporting

Personalization rules (safe and fast):
- Preferred: paraphrase the most recent review instead of quoting verbatim.
- If quoting: keep it short (<= 12 words) and don’t mention sensitive info (patient details, pricing specifics, staff names if avoidable).
- Never imply the reviewer is a customer/patient; say “someone mentioned…”


3) COLD EMAIL SEQUENCES (3-step) — LOCAL BUSINESSES
Tokens to personalize:
- {{first_name}} (if unknown use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_paraphrase}} (1 sentence)
- {{response_gap_observation}} (e.g., “looks like a few recent reviews don’t have a public reply yet”)
- {{vertical_word}} (“dental practice”, “med spa”, “HVAC company”)

General positioning line (used across templates):
“We draft brand-safe Google/Yelp review replies, flag negatives for escalation, and send a weekly KPI snapshot. You approve before anything posts.”


3A) DENTAL — Initial Email (NOT_RESPONDING variant)
Subject options (rotate):
1) Quick question about replying to reviews at {{business_name}}
2) Noticed a few reviews without replies
3) 12-hour review reply coverage (Google + Yelp)

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_paraphrase}}. It also looks like {{response_gap_observation}}.

We run a “review reply autopilot” for dental practices: brand-safe draft responses to Google + Yelp, negative reviews get escalated to you, and you approve before anything posts. Typical turnaround is within 12 hours.

If you want, I can send 3 sample replies in your tone for your last few reviews (no login needed).

Worth a quick look?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


Follow-up 1 (48–72h later):
Subject: Re: {{business_name}} reviews
Hi {{first_name}},

Totally get it if review replies aren’t the top priority. The issue we usually see is simple: when recent reviews sit without a response, it chips away at trust (especially for new patients comparing options).

Want me to draft replies for 5 recent Google reviews and email them over? If you like them, we can set up approval + posting.

— Bob


Follow-up 2 (5–7 days later):
Subject: Should I close the loop?
Hi {{first_name}},

Should I close the loop on this? If you’re the wrong person for review responses at {{business_name}}, who should I contact?

If it helps, I can also share a quick weekly KPI snapshot template (reply rate, time-to-reply, negative review alerts).

— Bob


3B) DENTAL — Initial Email (LOW_RATING variant)
Subject options:
1) Quick fix for review reputation at {{business_name}}
2) Noticed your rating—can I share an idea?
3) Reduce damage from negative reviews (approval-first)

Body:
Hi {{first_name}},

I came across {{business_name}} and saw a recent review that mentioned {{recent_review_paraphrase}}. When reviews like that sit unanswered, it can steer new patients elsewhere.

We help dental practices respond in a brand-safe way (HIPAA-aware), escalate negatives for a human check, and keep weekly reputation KPIs. You approve before anything goes live.

Would it be helpful if I drafted a response to that review + 2 more, in a calm/neutral tone, so you can compare options?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


3C) MED SPA — Initial Email (HIGH_VOLUME variant)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Consistent replies in your brand voice
3) Weekly review KPIs + reply drafting

Body:
Hi {{first_name}},

Not sure who owns reputation management at {{business_name}}, but I noticed you’re getting steady review volume recently ({{recent_review_paraphrase}}).

We run an approval-first review reply system for med spas: draft on-brand replies for Google + Yelp, flag negatives for escalation, and send weekly KPIs (reply rate, avg response time, negatives needing attention).

If you want, I’ll draft 5 replies to your most recent reviews in the tone you prefer (warm, clinical, luxury—your call). No commitment.

Open to that?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


3D) HVAC/PLUMBING — Initial Email (NOT_RESPONDING variant)
Subject options:
1) Missed review replies (easy win)
2) 12-hour review response coverage
3) Quick idea for {{business_name}} reputation

Body:
Hi {{first_name}},

I found {{business_name}} on Google and saw someone recently mentioned {{recent_review_paraphrase}}. It also looks like {{response_gap_observation}}.

We help home service companies keep up with reviews without adding work: we draft brand-safe replies for Google + Yelp, escalate negatives, and you approve before anything posts. Goal is to respond within ~12 hours so future customers see you’re on it.

Want me to send a few sample replies for your last 3–5 reviews?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


4) AGENCY / RESELLER LANE (initial email)
Who to target:
- Local SEO agencies, PPC shops, web studios offering “GBP optimization”, “local SEO”, “reputation management”.
Offer:
- White-label / reseller: agency keeps margin; you provide drafting + escalation + weekly KPI reporting.

Subject options:
1) White-label review replies for your local clients
2) Add-on for your GBP retainer (approval-first)
3) Quick partnership idea (Google + Yelp replies)

Body:
Hi {{first_name}},

Do you manage Google Business Profiles for local clients?

We offer a white-label “review reply autopilot” that drafts brand-safe responses for Google + Yelp, escalates negatives, and sends a weekly KPI snapshot. Your client can approve before anything posts (or you approve on their behalf).

If you have 3–5 clients (dentist/med spa/home services) with high review volume or missed replies, I can draft sample responses so you can see quality + workflow.

Interested in a quick call to see if it fits your retainer model?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


5) DAILY SENDING OPS (14-day ramp + SOP)
Assumptions:
- Start with 1 inbox; add more only after deliverability is stable.
- Keep personalization lightweight (1 line) to maintain throughput.

CRM stages (minimum viable):
1. Prospect (meets ICP + has email)
2. Sent (Email 1 sent)
3. Replied
4. Qualified (pain confirmed + decision-maker)
5. Demo Booked
6. Trial / Sample Replies Delivered
7. Paid
8. Lost (with reason)

Daily workflow (Mon–Fri):
A) List QA (15 min)
- Random-sample 10 leads from today’s batch: verify category, location, website present, not a franchise directory page, email format plausible.

B) Personalization pass (30–60 min)
- Pull 1 recent review (or paraphrase) + note response gap observation.

C) Send + monitor (30 min)
- Send new emails within ramp cap.
- Stop sending if bounce rate > 5% in a day.

D) Reply handling SLA (same-day)
- If interested: offer “3–5 sample replies” immediately.
- If objection: route into a short reply play (not included here) and ask one qualifying question.

E) Follow-ups
- Follow-up 1 at 48–72h; Follow-up 2 at 5–7 days.

14-day ramp (per inbox; conservative):
- Day 1–2: 15/day new
- Day 3–4: 25/day new
- Day 5–6: 35/day new
- Day 7–8: 45/day new
- Day 9–10: 60/day new
- Day 11–14: 75/day new (only if bounce <3% and replies positive)

Targets (per week, 1 inbox):
- 250–350 new sends/week by end of week 2
- Reply rate target: 3–8% (cold); positive reply target: 1–3%
- Demo booked: 3–8 / week once list quality is strong

Compliance + safety notes:
- Use plain-text style.
- Include accurate contact info.
- Don’t claim affiliation with Google/Yelp.
- Don’t include sensitive personal data from reviews; paraphrase.


6) WHAT I STILL NEED FROM OWNER TO UNBLOCK THE 500–1,000 CSV
Choose ONE for the first run:
A) Top 25 US metros (best for density)
B) 5–10 target states (best if you want regional focus)
C) US-wide (largest, but more variance)

Once chosen, the list build can proceed using the existing zero-cost Google Maps workflow (manual/VA), or you can approve a paid scraper to generate faster.
