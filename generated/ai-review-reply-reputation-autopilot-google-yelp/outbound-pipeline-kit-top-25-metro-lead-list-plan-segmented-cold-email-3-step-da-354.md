# Outbound Pipeline Kit — Top-25 Metro Lead List Plan + Segmented Cold Email (3-Step) + Daily Ops/CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:22:11.524Z

---

# Outbound Pipeline Kit (Ready to Run)
Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy link to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

## 1) Recommended initial geography (to hit 500–1,000 leads fast)
Use **Top 25 US metros** (high review velocity + higher LTV businesses, fewer low-quality rural leads):
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Dallas, TX
5. Houston, TX
6. Washington, DC
7. Miami, FL
8. Atlanta, GA
9. Philadelphia, PA
10. Phoenix, AZ
11. Boston, MA
12. San Francisco, CA
13. Riverside–San Bernardino, CA
14. Detroit, MI
15. Seattle, WA
16. Minneapolis, MN
17. San Diego, CA
18. Tampa, FL
19. Denver, CO
20. Baltimore, MD
21. St. Louis, MO
22. Orlando, FL
23. San Antonio, TX
24. Charlotte, NC
25. Portland, OR

Why this scope: enough density to produce 500–1,000 leads in 2–4 days of manual collection (or 30–60 minutes with a scraper), while keeping outreach messaging consistent.

## 2) Google Maps query pack (copy/paste)
Goal: pull businesses with visible review activity.

### Vertical A: Dentists
Use these in Google Maps:
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “dental clinic + {metro}”
- “pediatric dentist + {metro}”

### Vertical B: Med spas / aesthetics
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
- “laser hair removal + {metro}”

### Vertical C: HVAC / plumbing
- “HVAC company + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
- “water heater repair + {metro}”

### Collection rule of thumb
Per metro, aim for:
- Dentists: 10–15
- Med spas: 10–15
- HVAC/plumbing: 10–15
That’s ~30–45 per metro. Across 25 metros, you’ll exceed 750 quickly; stop at 1,000 and start sending.

## 3) CSV columns (minimum viable + segmentation)
Use these headers exactly:
- business_name
- vertical
- metro
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100, from last 10 reviews: % with owner replies)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- personalization_snippet (1–2 lines from a recent review OR paraphrase)
- contact_name (if found)
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
- email_1
- email_2
- notes

### Segment rules
- **not_responding**: response_rate_proxy ≤ 20% OR 0 owner replies in last 10 reviews
- **low_rating**: google_rating < 4.2
- **high_volume**: review_count ≥ 200 OR last_review_date within 14 days

### Priority scoring
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: (not_responding) OR (low_rating)
- **Priority C**: (high_volume only)

## 4) Cold email — 3-step sequence (with segment hooks)
Instructions:
- Keep it short.
- Personalize only line 1–2 using: {{personalization_snippet}} + {{response_gap}}.
- Use the same CTA: “Want me to show you 3 draft replies?”
- Always include the website URL + contact email in the footer.

### 4.1 Email #1 (Initial) — choose ONE segment hook
Subject line options:
- “Quick idea for your Google reviews”
- “Noticed something on your reviews”
- “12-hour review replies for {{business_name}}?”

Body:
Hi {{contact_name|there}} — I was looking at {{business_name}}’s Google reviews and saw: “{{personalization_snippet}}”.

{{SEGMENT_HOOK}}

We run an **AI Review Reply & Reputation Autopilot**: brand-safe replies for Google/Yelp, negative-review escalation, and weekly KPI reporting. Typical setup is: **we draft within 12 hours**, you approve (or auto-approve), and we post.

Would you like me to send **3 example replies** for your most recent reviews so you can see the tone?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

SEGMENT_HOOK options (paste one):
1) Not responding angle:
“I also noticed {{response_gap}} — it looks like many recent reviews don’t have an owner/manager reply. A few fast, consistent responses can lift conversion without spending on ads.”

2) Low rating angle:
“I noticed your rating is {{google_rating}}. The fastest win is responding to negatives in a calm, brand-safe way and escalating internally so the same issue doesn’t repeat.”

3) High volume angle:
“You’re getting reviews consistently (great signal) — the hard part is staying on top of replies without it becoming a daily task.”

### 4.2 Email #2 (Follow-up #1) — 2–3 days later
Subject:
- “Want the 3 draft replies?”
- “Should I send examples?”

Body:
Hi {{contact_name|there}} — quick follow-up.

If you share the link to your Google profile (or just confirm it’s this one: {{google_maps_url}}), I’ll send **3 draft replies** matching your tone.

If it’s not a priority right now, reply “later” and I’ll check back next month.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4.3 Email #3 (Follow-up #2 / breakup) — 5–7 days later
Subject:
- “Close the loop?”
- “Stop reaching out?”

Body:
Hi {{contact_name|there}} — should I close the loop?

We help local businesses reply to Google/Yelp reviews **within 12 hours**, escalate negatives, and send a weekly reputation KPI snapshot.

If you’re the wrong person, who handles reputation/reviews for {{business_name}}?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops (14-day ramp)
Deliverability rules:
- Day 1–2: 20/day/inbox
- Day 3–4: 30/day/inbox
- Day 5–6: 40/day/inbox
- Day 7–8: 50/day/inbox
- Day 9–10: 60/day/inbox
- Day 11–14: 75/day/inbox (cap until reply rates stabilize)

List hygiene thresholds:
- If bounce rate > 3%: stop, clean list, verify domains/emails.
- If spam complaints > 0.1%: stop, reduce volume, simplify copy.

Daily workflow (60–90 minutes):
1) Add 25–50 new prospects to CRM (Priority A first).
2) Personalize only the first line using the snippet + response gap.
3) Send today’s batch.
4) Process replies within 4 business hours (same day if possible).
5) Book demos: offer 10-minute screen share + show 3 drafted replies.
6) Move stages in CRM and add notes.

Weekly workflow:
- Monday: refresh leads (new reviews / new businesses) + QA 10% sample.
- Wednesday: analyze replies by segment, adjust subject lines.
- Friday: tally KPIs: sent, delivered, replies, positive replies, demos, trials, paid.

## 6) CRM stages (simple + enforceable)
1) Prospect (record created; not yet sent)
2) Sent (Email #1 sent)
3) Engaged (opened/replied/clicked; any signal)
4) Qualified (pain confirmed: time, low rating, no response process)
5) Demo Booked
6) Trial/Proof (you provide draft replies / connect accounts if applicable)
7) Paid
8) Lost (reason tagged)

Required fields to track per record:
- segment, priority, last_review_date, response_rate_proxy
- send_date_1/2/3 and reply outcome
- next_followup_date

## 7) Quick personalization rules (avoid risk)
- Prefer paraphrase over direct quotes if the review contains health/medical details.
- Never mention protected classes or sensitive health info.
- Keep tone neutral: “I saw a recent comment about wait time” vs quoting names/conditions.

If you want the 500–1,000 CSV produced fastest, the only blocker is execution of the list-building workflow (manual/VA) or approval to use a paid extractor. Everything above is ready to paste into your ops today.