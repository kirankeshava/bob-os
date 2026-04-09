# Outbound Machine Kit (Ready-to-Run): Cold Email Sequences (Segmented) + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:10:35.316Z

---

## 1) Segments, triggers, and personalization tokens

### Segments (use 1 primary per lead)
- **Not Responding:** No owner/manager responses in last 10 reviews OR response rate proxy ≤ 20%.
- **Low Rating:** Google rating < 4.2 (or Yelp < 4.0 if targeting Yelp).
- **High Volume:** Review count ≥ 200 OR last review within 14 days.

### Priority score routing
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

### Personalization tokens (safe + fast)
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (max 12–18 words; paraphrase if sensitive)
- {{response_gap}} (e.g., “looks like the last 6 reviews didn’t get a reply”)
- {{rating}} / {{review_count}} / {{last_review_date}}

### Compliance note
Do not include protected health info or any claim that reveals customer identity; keep snippets short and non-identifying. When in doubt: paraphrase sentiment instead of quoting.

---

## 2) Cold email sequences (Direct-to-local) — 3-step

### A) DENTAL PRACTICES

#### Segment: NOT RESPONDING (Initial)
**Subject options (pick 1):**
1) Quick help replying to Google reviews at {{business_name}}
2) Noticed a response gap on your reviews
3) {{business_name}} — want us to handle replies?

**Email 1:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw {{response_gap}}. One recent review mentioned: “{{recent_review_snippet}}.”

We run an AI-assisted **review reply autopilot** for local businesses: brand-safe drafts, **responses within 12 hours**, and you can **approve before anything posts**. Negative reviews get escalated so you can step in fast.

If I send 2–3 sample replies in your tone for your latest reviews, would you want to see them?

— {{sender_name}}

#### Follow-up 1 (Day 3)
Subject: Re: Google review replies for {{business_name}}

Hi {{first_name}},

Most dental offices we talk to don’t have time to reply consistently, but Google customers notice.

Want me to draft replies for the last 5 reviews at {{business_name}} (no charge) so you can compare them to your current style?

— {{sender_name}}

#### Follow-up 2 (Day 7)
Subject: Should I close this out?

Hi {{first_name}},

Should I close the loop here, or is someone else best to handle review responses for {{business_name}}?

If it helps, we can do:
- 12-hour response SLA
- approval-only mode
- escalation for 1–2 star reviews

— {{sender_name}}


#### Segment: LOW RATING (Initial)
Subject options:
1) Quick win to lift {{business_name}}’s rating
2) Addressing 1–2 star reviews faster
3) Reputation follow-up for {{business_name}}

Email 1:
Hi {{first_name}},

I noticed {{business_name}} is at {{rating}} on Google. A recent reviewer said: “{{recent_review_snippet}}.”

We help offices respond quickly and professionally to negative reviews (and keep every reply brand-safe). You can approve responses before posting, and we escalate anything sensitive immediately.

Open to a 10-minute call this week to see if we can help stabilize the rating and improve response consistency?

— {{sender_name}}

(Follow-ups: reuse Follow-up 1 + 2 above, swapping language to “negative reviews” / “rating recovery.”)


#### Segment: HIGH VOLUME (Initial)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Too many reviews to reply to?
3) Review reply workflow for {{business_name}}

Email 1:
Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}). That’s great—replying consistently is the hard part.

We set up a lightweight workflow: AI drafts in your tone, your approval (or autopost for 4–5 star only), and an escalation queue for anything negative.

Worth sending you a 1-page example workflow + a few sample replies from your latest reviews?

— {{sender_name}}

---

### B) MED SPAS / AESTHETIC CLINICS

#### NOT RESPONDING (Initial)
Subject options:
1) Review reply help for {{business_name}}
2) Quick question about your Google reviews
3) {{business_name}} — we can handle replies

Email 1:
Hi {{first_name}},

I saw {{response_gap}} on {{business_name}}’s Google reviews. One recent review mentioned: “{{recent_review_snippet}}.”

We help med spas respond fast and on-brand: drafts within 12 hours, approval-first posting, and automatic escalation for negative reviews.

If I draft replies to your latest 3 reviews in your tone, should I send them over?

— {{sender_name}}

Follow-up 1 (Day 3):
Hi {{first_name}},

In aesthetics, prospects often compare how businesses respond—not just the star rating.

Want free drafts for the last 5 reviews so you can see what it would look like with consistent replies?

— {{sender_name}}

Follow-up 2 (Day 7):
Hi {{first_name}},

Should I reach out to someone else about review response management for {{business_name}}?

We can run in approval-only mode and escalate 1–2 star reviews immediately.

— {{sender_name}}


#### LOW RATING (Initial)
Subject options:
1) Helping improve {{business_name}}’s rating
2) Fast replies to negative reviews
3) Reputation workflow for {{business_name}}

Email 1:
Hi {{first_name}},

Noticed {{business_name}} is at {{rating}} on Google. A reviewer recently said: “{{recent_review_snippet}}.”

We help clinics respond quickly and professionally (approval-first, brand-safe), and we flag negative reviews so you can intervene before they spiral.

Open to a quick 10-minute chat to see if this would help?

— {{sender_name}}


#### HIGH VOLUME (Initial)
Subject options:
1) Keeping up with reviews at {{business_name}}
2) Review volume workflow
3) Consistent replies without extra staff time

Email 1:
Hi {{first_name}},

{{business_name}} has strong review velocity ({{review_count}} total). If you want, we can take review replies off your team’s plate.

Workflow is simple: drafts in your tone, approve in 1 click, and auto-escalation for any negative feedback.

Want me to send sample replies for your latest reviews?

— {{sender_name}}

---

### C) HVAC / PLUMBING (HOME SERVICES)

#### NOT RESPONDING (Initial)
Subject options:
1) Quick fix: reply to Google reviews faster
2) {{business_name}} review responses
3) Customers notice reply speed

Email 1:
Hi {{first_name}},

I was checking {{business_name}}’s reviews and saw {{response_gap}}. A recent reviewer said: “{{recent_review_snippet}}.”

We help home service companies respond within 12 hours, keep replies professional, and escalate negative reviews so you can follow up ASAP. You can approve before anything posts.

Want me to draft replies for your latest 3 reviews to show you what this would look like?

— {{sender_name}}

Follow-up 1 (Day 3):
Hi {{first_name}},

When homeowners compare providers, they look at recent reviews and whether the company responds.

Should I send free sample replies for the last 5 reviews at {{business_name}}?

— {{sender_name}}

Follow-up 2 (Day 7):
Hi {{first_name}},

Should I talk to someone else who handles reputation/reviews at {{business_name}}?

We run approval-first replies + escalation for 1–2 star reviews.

— {{sender_name}}


#### LOW RATING (Initial)
Subject options:
1) Quick help with negative reviews
2) {{business_name}} rating recovery
3) Responding to 1–2 star reviews faster

Email 1:
Hi {{first_name}},

Noticed {{business_name}} is at {{rating}} on Google. One review mentioned: “{{recent_review_snippet}}.”

We help service businesses respond quickly and calmly, escalate negatives to you, and keep every reply brand-safe. You approve before posting.

Open to a 10-minute chat to see if this could help stabilize the rating?

— {{sender_name}}


#### HIGH VOLUME (Initial)
Subject options:
1) Handling review volume at {{business_name}}
2) Review replies without adding headcount
3) 12-hour review response SLA

Email 1:
Hi {{first_name}},

{{business_name}} has {{review_count}} reviews—nice. The challenge is replying consistently while your team is on jobs.

We provide: drafts within 12 hours, approval-first posting, and escalation for negatives. Most owners spend ~5 minutes/day approving.

Want me to send a few sample replies based on your latest reviews?

— {{sender_name}}

---

## 3) Agency/Reseller lane (marketing agencies serving local clients)

**Subject options:**
1) Add “review response” as a retainer line item
2) White-label review replies for your clients
3) Quick revenue add-on for local SEO clients

**Email 1:**
Hi {{first_name}},

Saw you work with local businesses on SEO/GBP. We run an AI-assisted **review reply autopilot** you can offer as a white-label add-on: brand-safe drafts, approval-first posting, negative-review escalation, and weekly KPI reporting.

If you have clients with high review volume or low response rates, this is an easy win that improves conversion.

Want a simple partner offer sheet + pricing you can mark up?

— {{sender_name}}

Follow-up 1 (Day 3):
Hi {{first_name}},

Typical agency use: bundle it as “GBP Review Management” ($X–$Y/mo) with your existing local SEO. We do the ops; you keep margin.

Want me to send the one-pager?

— {{sender_name}}

Follow-up 2 (Day 7):
Hi {{first_name}},

Should I close this out, or is there someone else on your team who owns partnerships/add-ons?

— {{sender_name}}

---

## 4) Daily sending ops checklist (execution)

### Tooling-agnostic rules (works with any sender)
- **List hygiene:** remove role accounts (info@, support@) if you have a named contact alternative; keep them only if necessary.
- **Personalization floor:** every email must include {{business_name}} + either {{recent_review_snippet}} OR {{response_gap}}.
- **Plain text only:** no images, minimal links (ideally none). If you must include a link, use only one (calendar or simple landing page).
- **Reply SLA:** respond to any positive reply within 2 hours during business day.
- **Bounces:** if bounce rate > 3% in a day, stop sending and review list/enrichment.
- **Complaints:** if complaints/spam reports occur, pause that inbox and reduce volume.

### 14-day ramp schedule (per inbox)
- Days 1–2: 10–15/day (mostly Priority B/C)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day

If running multiple inboxes, scale linearly but keep **total** daily volume reasonable until bounce/complaint metrics are stable.

### Daily workflow (60–90 minutes)
1) Pull 50–150 leads from sheet by Priority (A first), verify website + category match.
2) Write/collect personalization: review snippet or response gap (10–15 seconds each once practiced).
3) Send new emails (per ramp caps).
4) Queue follow-ups (FU1 on Day 3, FU2 on Day 7).
5) Process replies: tag intent, book demos, or route objections.
6) Update CRM stages.

### Weekly workflow (45 minutes)
- Sample QA 30 leads: category accuracy, email validity, snippet safety.
- Review metrics: opens (directional only), replies, positive reply rate, meetings booked, bounces.
- Rotate subject lines if reply rate < 1% after 300 sends in a segment.

---

## 5) CRM pipeline stages (simple and enforceable)

1) **Prospect (Unsent)** — lead is validated + segmented + has personalization token.
2) **Sent (E1)** — initial email sent.
3) **Follow-up Due** — scheduled FU1/FU2 based on send date.
4) **Replied – Positive** — asked for info, samples, call, or pricing.
5) **Replied – Neutral/Question** — needs clarification (permissions, process, pricing, integrations).
6) **Replied – Objection** — “we already do this,” “no time,” “not now,” “too expensive.”
7) **Qualified** — has Google/Yelp presence + review volume + pain confirmed.
8) **Demo Booked** — calendar scheduled.
9) **Trial / Pilot** — agreed to test on X locations for Y days.
10) **Paid** — converted to subscription/retainer.
11) **Closed Lost** — not a fit / no response after final touch.

**Entry/exit criteria example:** Only move to Qualified after they confirm they want help managing responses OR they have clear pain (low rating, high volume, no time) and agree to see samples/demos.
