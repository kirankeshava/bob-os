# Outbound Pipeline Kit (Week 1, $0 Spend): Lead List CSV Template + Segmentation + Cold Email (3-Step) + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:53:36.425Z

---

Business proof/links to include in outreach:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) Lead List CSV Template (copy/paste headers)
Columns:
1. business_name
2. vertical (dentist | med_spa | hvac_plumbing | agency)
3. city
4. state
5. website
6. phone
7. google_maps_url
8. google_rating
9. review_count
10. last_review_date
11. last_review_snippet (1–2 sentences max; if unsure, paraphrase)
12. owner_response_last10 (count of owner responses in last 10 reviews; 0–10)
13. response_rate_proxy (owner_response_last10/10)
14. segment (not_responding | low_rating | high_volume | combo)
15. priority (A | B | C)
16. contact_name
17. role_guess (owner | office_manager | practice_manager | gm | marketing_manager)
18. email_1
19. email_2
20. source (website_contact | google_business_site | linkedin | directory)
21. notes

Segmentation rules (apply in Sheets):
- not_responding: response_rate_proxy <= 0.2 OR owner_response_last10 = 0
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR (TODAY - last_review_date) <= 14 days
- combo: if 2+ flags true, set segment="combo" and note which.

Priority scoring (simple, operational):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR combo includes high_volume
- Priority B: not_responding only OR low_rating only
- Priority C: high_volume only

Zero-cost sourcing workflow (per lead, 2–4 minutes once you’re fast):
A) Google Maps search query examples (use chosen metro/state):
- Dentist: “dentist {city}” and “cosmetic dentist {city}”
- Med spa: “med spa {city}” and “aesthetic clinic {city}”
- Home services: “HVAC {city}”, “plumber {city}”, “plumbing company {city}”
B) Open the GBP listing → capture rating, review count.
C) Click reviews → sort by newest → capture last_review_date and 1–2 sentence snippet.
D) Count owner replies in last 10 reviews (quick scan) → fill owner_response_last10.
E) Find email:
- Website footer/contact page (best)
- Google Business “Website” sometimes has contact
- If none: LinkedIn company page or owner name + “contact” page
- Accept generic emails (info@, office@, hello@) for Week 1; we can refine later.

2) Cold Email Sequence (3 steps) — master template with personalization
Use tokens: {{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{vertical_phrase}}

Email 1 (Day 1) — responsiveness hook
Subject options:
A) Quick help with your Google reviews at {{business_name}}
B) Noticed a gap in recent review replies
C) 12-hour review responses for {{business_name}}?

Body:
Hi {{first_name}} —

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. {{response_gap_observation}}.

We run an AI Review Reply & Reputation Autopilot for local {{vertical_phrase}}: brand-safe draft replies to Google Business Profile + Yelp, negative-review escalation, and a weekly KPI email.

Simple promise: new reviews get a response drafted within 12 hours. You can approve/edit, or we can follow your rules.

If you want, I can set up a free 7-day trial and draft replies for your newest reviews so you can see the tone/quality first.

Website (for context): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute call this week? If yes, reply with “trial” and the best email to use.

— Bob
agent_bob_replit+review-bot@agentmail.to

Email 2 (Day 3) — low friction + example
Subject options:
A) Want me to draft 3 replies as a sample?
B) Example reply for {{business_name}}

Body:
Hi {{first_name}} — quick follow-up.

If you paste 1–2 recent review links, I’ll send back 3 ready-to-post responses in your brand voice (free). If you like them, we can run the 7-day autopilot trial.

Reply with the links, or just say “send sample” and I’ll pull the latest.

— Bob
agent_bob_replit+review-bot@agentmail.to

Email 3 (Day 7) — close the loop
Subject options:
A) Close the loop?
B) Should I stop reaching out?

Body:
Hi {{first_name}} — last note from me.

Do you want help keeping up with Google/Yelp review replies at {{business_name}} (12-hour drafts + escalation + weekly KPI report), or should I close this out?

Either way, thanks — Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Personalization guidance (fast + safe):
- If quoting reviews, keep it short (1 sentence). If the review mentions medical outcomes or sensitive info, paraphrase instead.
- response_gap_observation examples:
  - “I didn’t see a response yet, so I figured you might be swamped.”
  - “Looks like replies are intermittent — totally normal when things get busy.”

3) Daily Sending Ops (Week 1, no spend)
Targets:
- Day 1–2: 20 emails/day (new prospects only)
- Day 3–4: 35 emails/day (add Follow-up #1)
- Day 5+: 50 emails/day (mix new + follow-ups)

QA before sending (every batch of 25):
- Validate website loads; if no website and only a franchise listing, skip.
- Ensure last_review_date exists and snippet is not sensitive.
- Confirm segment + priority filled.

Reply-handling SLA:
- Positive interest: respond within 2 hours during business day.
- “Not interested”: tag Lost; stop sequence.
- “Who are you?”: send 2-line credibility reply + website link + offer sample replies.

4) CRM Stages (simple pipeline)
Stages:
- Prospects (not yet emailed)
- Sent (Email 1 sent)
- Follow-up 1 sent
- Follow-up 2 sent
- Replied — Interested
- Replied — Not now
- Qualified (has GBP/Yelp + clear owner/manager contact)
- Trial Active (7 days free)
- Converted (post-trial)
- Lost

Next decision needed to execute list building efficiently:
Choose geography for first 500 leads:
A) Top 10–25 US metros (fastest; high density)
B) 5–10 states (if you want regional focus)
Once chosen, run the query pack and build the first 200 leads; then replicate to reach 500.