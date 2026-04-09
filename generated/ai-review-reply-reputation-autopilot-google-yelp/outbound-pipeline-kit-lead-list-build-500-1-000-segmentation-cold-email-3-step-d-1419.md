# Outbound Pipeline Kit — Lead List Build (500–1,000) + Segmentation + Cold Email (3-Step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:03:13.478Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/landing page (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (focus)
A) Dentists (general + cosmetic + orthodontics): high LTV, steady review cadence, reputation affects bookings.
B) Med spas/aesthetic clinics: extremely review-sensitive, high competition, high review velocity.
C) HVAC/Plumbing: high intent searches, strong link between review responsiveness and call volume.
Parallel lane: Agencies (local SEO / web / PPC) serving those niches; pitch as reseller/white-label retention add-on.

2) SEGMENTATION + PRIORITY RULES (simple + operational)
Collect: google_rating, review_count, last_review_date, and response_rate_proxy.

Response-rate proxy (manual): Look at the last 10 Google reviews; count how many have an owner response.
response_rate_proxy = owner_responses_in_last_10 / 10.

Segments:
- NOT_RESPONDING: response_rate_proxy ≤ 0.20 OR 0 owner responses visible in last 10.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count ≥ 200 OR last_review_date within past 14 days.

Priority score (routing):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Template mapping:
- NOT_RESPONDING → “response gap / missed revenue / we reply within 12h” angle.
- LOW_RATING → “triage + escalation + damage control + brand-safe” angle.
- HIGH_VOLUME → “ops throughput + consistency + weekly KPI reporting” angle.

3) LEAD LIST CSV — REQUIRED COLUMNS (copy/paste headers)

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

How to fill key fields (zero-cost method):
- Google Maps: capture rating, review count, profile URL, phone, website.
- last_review_date: open reviews → sort by newest → record date of most recent.
- response_rate_proxy: scan last 10 reviews for “Response from the owner”.
- personalization_snippet: copy 8–20 words from the most recent review OR paraphrase safely (recommended). Avoid sensitive medical claims; stick to service/experience.
- email_1/email_2: website Contact page, footer, About page; if none, use generic contact form URL in notes.

4) GEO + QUERY PACK (choose geography, then execute)
You must choose ONE scope to keep extraction consistent:
Option 1: Top 25 US metros (fastest to fill 1,000 leads with high density)
Option 2: 5–10 states (good if you want tight regional focus)
Option 3: US-wide (harder to keep consistent; more noise)

Google Maps search footprints (copy/paste):
Dentists:
- “dentist in {city}”
- “cosmetic dentist in {city}”
- “orthodontist in {city}”
Med spa:
- “med spa in {city}”
- “aesthetic clinic in {city}”
- “botox in {city}” (then filter out single-provider injectors if needed)
HVAC/Plumbing:
- “HVAC in {city}”
- “air conditioning repair in {city}”
- “plumber in {city}”

Agency lane:
- “local SEO agency {city}”
- “dental marketing agency” / “med spa marketing agency” / “home services marketing agency”

5) COLD EMAIL — 3-STEP SEQUENCES (READY TO SEND)
Tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{website_url}} {{contact_email}}

Global signature:
— Bob
AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to

A) LOCAL BUSINESS — NOT RESPONDING (Initial)
Subject options:
1) Quick fix for your Google reviews (no extra work)
2) Noticed a response gap on {{business_name}}’s reviews
3) We can reply to reviews within 12 hours for {{business_name}}

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a few recent reviews without an owner response (e.g., “{{recent_review_snippet}}”).

We run an AI + human-guardrailed “review reply autopilot” that drafts brand-safe responses and posts them (or sends for approval). Goal: you respond within ~12 hours consistently so prospects see an active, attentive business.

If helpful, I can send 3 sample replies to your most recent reviews so you can judge tone/quality. Want me to draft them?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Want me to draft replies for the last 3 reviews?
Hi {{first_name}} — still open to me drafting a few review responses for {{business_name}}?

If you prefer approval mode: we draft → you approve → we post. If a review is negative, we flag/escalate with a suggested resolution reply.

Should I send 3 drafts for the newest reviews?
— Bob

Follow-up 2 (5–7 days later):
Subject: Close the loop?
Hi {{first_name}} — last note. If review responses aren’t a focus right now, no worries.

If you want to test it later, reply “draft” and I’ll send sample responses based on your newest Google reviews.
— Bob

B) LOCAL BUSINESS — LOW RATING (Initial)
Subject options:
1) Quick reputation triage for {{business_name}}
2) Fixing review damage (without sounding defensive)
3) Can I draft a response to your latest 1-star review?

Body:
Hi {{first_name}} — I saw {{business_name}} is currently around {{rating}} stars on Google. In categories like {{vertical}}, that can materially impact calls/appointments.

We help businesses respond to negative reviews quickly and safely: calm tone, accountability where appropriate, and an offline resolution path. We also escalate the ones that need owner attention.

If you share the link to the most recent negative review, I’ll draft a suggested response for approval (free). Should I?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Subject: Drafting 1–2 responses for approval?
Hi {{first_name}} — I can draft responses to your most recent negative reviews and keep them brand-safe + non-defensive.

Want me to send a draft you can approve/edit?
— Bob

Follow-up 2:
Subject: Should I stop reaching out?
Hi {{first_name}} — if you’re all set on reviews, I’ll close the loop. If you want, reply with “1” and I’ll draft one response to your latest review for approval.
— Bob

C) LOCAL BUSINESS — HIGH VOLUME (Initial)
Subject options:
1) Keeping up with {{review_count}} Google reviews
2) Simple workflow for review responses (weekly KPI report)
3) Review reply autopilot for {{business_name}}

Body:
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews and recent activity. Many teams fall behind simply due to volume.

We run a lightweight system that:
1) drafts/post brand-safe responses (or approval-first),
2) escalates negative reviews immediately,
3) sends a weekly KPI snapshot (new reviews, response rate, time-to-first-response).

If I draft responses to your 3 newest reviews, would you like approval-first or auto-post?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Subject: approval-first vs auto-post?
Hi {{first_name}} — quick one: would you prefer we (a) send drafts for approval, or (b) auto-post with brand-safe guardrails?
— Bob

Follow-up 2:
Subject: sample replies?
Hi {{first_name}} — want me to send sample responses in your brand voice for the latest reviews? If yes, I’ll draft 3.
— Bob

D) AGENCY / RESELLER VERSION (Initial)
Subject options:
1) Add review-response automation to your client retainers
2) White-label review replies (Google/Yelp) for your clients
3) Quick reseller idea for dentists/med spas/home services

Body:
Hi {{first_name}} — do you manage Google Business Profiles for local clients?

We offer a white-label “review reply autopilot” (Google/Yelp): brand-safe drafts, optional approval-first, negative review escalation, and a weekly KPI report you can forward to clients.

It’s an easy retainer add-on that reduces churn (clients see consistent responsiveness). If you tell me your main niche, I’ll send example replies + a suggested packaging/price point.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (14-DAY RAMP) + QA + THRESHOLDS

Core principles:
- Personalization always references a real review snippet or paraphrase.
- Keep first touch short; CTA is “want 3 sample drafts?”
- Log every send in CRM; stop sequences immediately on reply.

Daily ramp (per inbox):
Day 1–2: 15/day
Day 3–4: 25/day
Day 5–6: 35/day
Day 7–8: 45/day
Day 9–14: 50/day
If using 2 inboxes, double totals; keep follow-ups within same thread.

Daily activity targets (minimum viable):
- New sends: 50/day (once warmed)
- Follow-ups: 25/day
- Manual personalization: 15–25/day (Priority A only)
- Agency lane: 10/day

List QA rules (before sending):
- Remove franchises/mega-chains unless location manager email is found.
- Must have website OR usable contact email; otherwise tag “needs_contact_form”.
- Confirm category matches vertical.
- Verify last_review_date exists.

Bounce/complaint thresholds:
- Hard bounce > 3% in a day → stop sending, re-verify list.
- Spam complaints > 0.1% → pause; tighten targeting + reduce volume.

Reply handling SLA:
- Reply to positive interest within 2 hours during business day.
- Negative review escalation prospects: reply within 1 hour (they feel pain).

7) CRM STAGES (simple pipeline)
Prospect (imported) → Sent (initial) → Opened (optional) → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost

Entry/exit criteria:
- Qualified: confirms they own/manage reviews or can introduce decision maker; expresses pain (time, negative reviews, inconsistent responses).
- Demo booked: calendar time set.
- Trial/onboarding: they provide GBP/Yelp access or agree to approval-first workflow.

8) WHAT I NEED FROM OWNER TO UNLOCK THE 500–1,000 LEAD CSV
Reply with one line:
- Geography choice (Top 25 metros / 5–10 states / US-wide)
And optionally:
- Any “must-win” niches first (e.g., cosmetic dentistry only, or med spas with >300 reviews).

Once geo is chosen, the SOP above can be executed by owner/VA to generate 500–1,000 rows; then we’ll run QA, finalize segments/priority, and start daily sends using the sequences above.