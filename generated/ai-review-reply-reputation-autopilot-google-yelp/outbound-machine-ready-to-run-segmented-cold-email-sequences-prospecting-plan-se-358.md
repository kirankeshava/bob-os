# Outbound Machine (Ready-to-Run): Segmented Cold Email Sequences + Prospecting Plan + Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:35:51.426Z

---

BUSINESS / LEGITIMACY REFERENCES (use in every thread)
- Website (proof/overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (signature + replies): agent_bob_replit+review-bot@agentmail.to
- Sender name for all outreach: Bob Smith

A) SEGMENTED PROSPECTING PLAN (WHO TO TARGET + WHY)

Primary verticals (direct-to-local):
1) Dentists / dental practices
2) Med spas / aesthetics / dermatology clinics
3) HVAC + plumbers (home services)

Parallel lane (agency/reseller):
- Local marketing agencies that manage Google Business Profiles (GBP), SEO agencies, “dentist marketing”, “med spa marketing”, “home service marketing”.

Required lead fields (minimum):
- business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date
- response_rate_proxy (owner responses in last 10 reviews / 10)
- segment, priority (A/B/C)
- personalization_snippet (short excerpt or paraphrase from most recent review)
- contact_email (owner/manager or general; add 2nd if found)

Segmentation rules (operational):
- Not Responding: response_rate_proxy <= 0.2 OR zero owner responses in last 10 reviews
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within last 14 days

Priority tiers:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating (but not high volume)
- Priority C: High Volume only

Offer positioning by segment:
- Not Responding: “We reply within 12 hours so prospects see you’re attentive—brand-safe, you approve.”
- Low Rating: “We escalate negatives, draft calm responses, and recover trust; weekly KPI report.”
- High Volume: “We keep up with volume consistently, keep voice consistent across locations/staff.”
- Agency: “White-label review response + escalation + weekly reporting you can resell.”

CTA hierarchy (lowest friction first):
1) “Reply with ‘yes’ and I’ll send a 2-minute audit”
2) “Who handles your Google/Yelp review replies?”
3) “15-min walkthrough this week?”

B) COLD EMAIL SEQUENCES (3 STEPS) — COPY READY

GLOBAL PERSONALIZATION TOKENS
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}}  (quote a short phrase OR paraphrase)
- {{response_gap}} (e.g., “I didn’t see a response to your last few reviews”)
- {{rating}} / {{review_count}} / {{last_review_date}}
- {{google_maps_url}}

SIGNATURE (use at bottom)
Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

———
1) DIRECT-TO-LOCAL: NOT RESPONDING (works for dentist/med spa/HVAC)

Subject options (rotate):
- Quick question about {{business_name}}’s Google reviews
- Noticed a gap on your recent reviews
- Review replies for {{business_name}}?

Email 1 (Day 1)
Hi {{first_name}} — quick note.

I was looking at {{business_name}}’s Google reviews and saw “{{recent_review_snippet}}.” {{response_gap}}.

We run a simple review-reply autopilot for local businesses: we draft brand-safe responses to Google + Yelp reviews, escalate negative ones to you, and send a weekly KPI report (rating trend, response rate, volume).

Operationally: we respond within 12 hours, and you can approve replies (or set rules so only negatives require approval).

If I send a 2-minute audit of your current response rate + 3 example replies in your brand voice, would you want it?

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — circling back.

Most owners don’t have time to reply consistently, but prospects absolutely read the owner responses.

If you tell me who handles review replies today (you / front desk / agency), I’ll tailor the audit to that workflow.

— Bob

Follow-up 2 (Day 7)
Subject: last one — review response coverage
Hi {{first_name}}, last message.

If you’re open to it, I can send:
1) your current response-rate snapshot (last 10 reviews)
2) 2 positive + 1 negative draft reply (brand-safe)
3) a suggested escalation rule (what gets flagged to you)

Reply “audit” and I’ll send it over.

— Bob Smith

———
2) DIRECT-TO-LOCAL: LOW RATING (recovery + escalation)

Subject options:
- Ideas to lift {{business_name}}’s rating
- Quick fix for negative review handling
- Review recovery for {{business_name}}

Email 1 (Day 1)
Hi {{first_name}} — I’m reaching out because Google reviews can swing bookings fast, especially with a rating around {{rating}}.

I saw a recent review mentioning “{{recent_review_snippet}}.” If that’s representative, the fastest win is consistent, calm owner responses + quick internal escalation.

We draft and post brand-safe replies to Google + Yelp, escalate negatives immediately, and send a weekly KPI report so you can see whether response rate and sentiment are improving.

Would you like me to send 3 example responses (1 negative, 2 positive) tailored to {{business_name}}?

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: {{business_name}} review replies
Hi {{first_name}} — a lot of businesses avoid replying to negatives because it’s stressful.

Our approach is: de-escalate publicly, move to private resolution, and flag anything legally/clinically sensitive for your approval.

If you reply with “send examples,” I’ll send the drafts.

— Bob

Follow-up 2 (Day 7)
Subject: close the loop on reviews?
Hi {{first_name}}, last follow-up.

If it’s helpful, I can do a quick baseline:
- rating + review velocity
- % responded (last 10)
- most common complaint themes
Then propose a response playbook.

Want that baseline report?

— Bob Smith

———
3) DIRECT-TO-LOCAL: HIGH VOLUME (throughput + consistency)

Subject options:
- Keeping up with review volume at {{business_name}}
- Consistent replies (without extra staff)
- Quick workflow for Google/Yelp replies

Email 1 (Day 1)
Hi {{first_name}} — noticed {{business_name}} gets a solid volume of reviews ({{review_count}} total; last one on {{last_review_date}}).

When volume is high, the issue isn’t “should we reply,” it’s “how do we do it consistently without pulling staff off the floor.”

Our autopilot drafts and posts brand-safe responses to Google + Yelp, escalates negatives instantly, and gives you a weekly KPI report so you know response coverage is staying high.

Open to a 10–15 min walkthrough of the workflow? If yes, what’s the best email to send a couple of times?

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nnuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: review workflow
Hi {{first_name}} — if a call is too much, I can just send a short loom-style outline of the workflow + sample replies in your tone.

Should I send that?

— Bob

Follow-up 2 (Day 7)
Subject: sample replies for {{business_name}}
Hi {{first_name}}, last note.

Reply “samples” and I’ll send 5 sample replies (3 positive, 2 negative) + suggested approval rules (e.g., only negatives require approval).

— Bob Smith

———
4) AGENCY / RESELLER LANE (WHITE-LABEL)

Subject options:
- White-label review response for your clients
- Add-on for GBP clients (review replies + reporting)
- Partner idea: review management ops

Email 1 (Day 1)
Hi {{first_name}} — I’m reaching out because agencies managing GBP/SEO often get pulled into “can you respond to reviews too?” and it’s operationally annoying.

We built a review-reply autopilot: brand-safe responses to Google + Yelp, negative review escalation, and weekly KPI reporting. It’s designed to be white-labeled so you can resell it across clients (dentists, med spas, home services).

If you tell me your primary niche + roughly how many GBP clients you manage, I’ll suggest a simple packaging + margin structure.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3)
Subject: Re: white-label review replies
Hi {{first_name}} — we can do:
- agency dashboard reporting (weekly)
- client escalation rules (only negatives routed)
- consistent brand voice per client

Worth exploring for 10 minutes this week?

— Bob

Follow-up 2 (Day 7)
Subject: last ping — partner slot
Hi {{first_name}}, last follow-up.

If you want, I’ll send a 1-page reseller offer you can forward internally (pricing tiers, scope, SLAs).

Reply “reseller” and I’ll send it.

— Bob

C) DAILY SENDING OPS (14-DAY RAMP + KPIs)

Tool-agnostic rules (works with any inbox + spreadsheet/CRM):
- Day 1–3: 15–25 new emails/day/inbox; Day 4–7: 30–50/day; Day 8–14: 50–100/day depending on bounce/complaints.
- Hard limits: bounce rate < 3%; spam complaints ~ 0; if bounce >5% in a day, pause and clean list.
- Only 1 link max (use the website URL). No attachments. Plain text.
- Personalize first line using {{recent_review_snippet}} + {{response_gap}}; keep snippet short and non-sensitive (paraphrase if needed).

Daily activity targets (single operator):
- 50–100 new emails/day once warmed
- 50–150 follow-ups/day (automated or queued)
- 10 manual “high-intent” touches/day (call or LinkedIn)
- Reply SLA: respond to any positive reply within 2 hours business time

List QA checklist (sample 20 leads per 200 before sending):
- Category matches vertical (not general “medical clinic” when you want med spa)
- Website present and matches business name
- Last review date populated
- Rating and review_count not blank
- response_rate_proxy computed (from last 10)
- No obvious chains/franchises unless intentionally targeted

CRM stages (minimum viable) + definitions:
1) Prospect (in list; not contacted)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied – Interested (asks question, wants audit/samples)
5) Qualified (confirmed they manage reviews + has GBP/Yelp + pain)
6) Demo Booked (time scheduled)
7) Trial/Onboarding (access + rules set)
8) Paid
9) Lost (not a fit / no response / bad timing)

Weekly KPI dashboard (track in Sheets):
- Deliverability: bounce %, spam complaints
- Activity: new sends, follow-ups, replies
- Conversion: reply rate, positive reply rate, demos booked, trials started, paid
- Segments: compare Priority A vs B vs C reply rates

D) NEXT EXECUTION STEP (BLOCKER TO UNLOCK)
Choose geography for the first 500–1,000 leads so the Google Maps query pack can be locked:
Option 1: Top 25 US metros (fastest learning, broad)
Option 2: 5–10 states (tighter, easier operations)
Option 3: US-wide (largest, noisier)
Once chosen, build 200 leads first (48 hours), validate reply rate by segment, then scale to 1,000.
