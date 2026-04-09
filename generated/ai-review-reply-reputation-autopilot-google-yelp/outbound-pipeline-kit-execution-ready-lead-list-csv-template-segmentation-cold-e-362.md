# Outbound Pipeline Kit (Execution-Ready): Lead List CSV Template + Segmentation + Cold Email (3-step) + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:39:36.255Z

---

## 1) Lead List CSV Template (copy/paste headers)
business_name,vertical,website,city,state,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_in_last_10 (0-10),response_rate_proxy_pct,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (what “good” looks like)
- google_rating: 1.0–5.0 from Google Business Profile.
- review_count: total Google reviews.
- last_review_date: date of most recent Google review.
- last_review_excerpt: 8–20 words max OR paraphrase (avoid sensitive health info). 
- owner_response_in_last_10: count how many of last 10 reviews have an owner response.
- response_rate_proxy_pct: =owner_response_in_last_10/10.
- segment rules:
  - not_responding: response_rate_proxy_pct <= 20% (0–2/10)
  - low_rating: google_rating < 4.2
  - high_volume: review_count >= 200 OR last_review_date within 14 days
- priority rules:
  - Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  - Priority B: not_responding OR low_rating
  - Priority C: high_volume only

## 2) Metro-based Query Matrix (Top 25 US metros recommended)
Use Google Maps searches in this format:
- Dentists: "dentist" + {metro} (and optionally "cosmetic dentist", "dental implants")
- Med spas: "med spa" + {metro} (and optionally "aesthetic clinic", "botox")
- HVAC/Plumbing: "HVAC" + {metro}, "plumber" + {metro}

Recommended metros (25): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

Pull plan to reach 750 leads (example):
- 10 metros × 25 leads per vertical × 3 verticals = 750 (add 5–10 metros to reach 1,000).

## 3) Segmented Prospecting Plan (what to send to whom)
- Segment: not_responding
  - Angle: “You’re getting reviews but not replying—customers notice.”
  - Offer: “We draft brand-safe replies within 12 hours; you approve.”
- Segment: low_rating
  - Angle: “Negative reviews need fast, calm, compliant responses + escalation.”
  - Offer: “Auto-escalate 1–3★ to you; we draft de-escalation replies + weekly KPIs.”
- Segment: high_volume
  - Angle: “Review throughput + consistency; keep response time low.”
  - Offer: “Queue-based workflow; weekly report; consistent tone.”

Routing:
- Priority A: send Day 1; follow-ups Day 3 and Day 7.
- Priority B: send Day 2–4; follow-ups Day 5 and Day 10.
- Priority C: batch later; test subject lines and positioning.

## 4) Cold Email Sequence (3-step) — Master Version (local business)
Personalization tokens:
- {{first_name}} (if unknown: “Hi there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (or paraphrase)
- {{response_gap}} (e.g., “looks like several recent reviews didn’t get a reply”)

### Email 1 (Initial)
Subject options:
1) Quick idea for {{business_name}} reviews
2) Noticed your Google reviews in {{city}}
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}},

I was looking at {{business_name}} on Google and noticed a recent review: “{{recent_review_snippet}}”. {{response_gap}}.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google + Yelp, escalates negative reviews, and sends a weekly KPI report (response time, response rate, rating trend). You can approve replies before anything posts.

If I show you 3 draft replies in your brand voice (free), would you want to see them?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 2 (Follow-up #1, 2–3 days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up—would it be helpful if your team never had to “think” about review replies again?

Typical setup:
- We draft replies within 12 hours
- 1–3★ reviews get escalated immediately
- You approve (or set auto-approve rules)
- Weekly reputation KPI email

Want me to send 3 example replies based on your last few reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (Follow-up #2, 5–7 days later)
Subject: Should I close the loop?

Hi {{first_name}},

Should I close the loop here, or is there someone else who owns Google/Yelp review responses for {{business_name}}?

If it’s you: I can draft 3 on-brand replies (free) and you can decide if it’s worth a 10-minute walkthrough.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 5) Agency/Reseller Version (initial email)
Subject: White-label review reply autopilot for your clients?

Hi {{first_name}},

If you manage local clients (dental / med spa / home services): we built a review-reply autopilot for Google + Yelp that your agency can white-label.

It drafts brand-safe replies within 12 hours, escalates negative reviews, and sends weekly KPIs. You can run it as a managed add-on (keep margin) or refer deals.

Want a quick look? I’ll share a demo link + partner pricing.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 6) Daily Sending Ops + 14-day Ramp (no paid tools assumed)
Tooling (free-first):
- Lead tracking: Google Sheets (tabs: Leads, Sends, Replies, Pipeline)
- Sending: 1 inbox to start; manual sends or mail merge with strict caps

Ramp schedule (per inbox):
- Days 1–2: 15/day (mostly text-only, minimal links)
- Days 3–4: 25/day
- Days 5–7: 40/day
- Days 8–14: 60/day max (only if bounce rate <3% and replies are healthy)

Non-negotiables:
- Verify emails where possible (at least obvious typos; avoid role accounts if possible)
- Bounce threshold: pause list source if bounces >3% in a day
- Complaint/unsub threshold: pause if >0.3%
- Reply SLA: respond to positives within 2 hours; negatives within 12 hours

Daily checklist (60–90 minutes):
1) Add 20–50 new leads (with segment + priority)
2) Send today’s new emails (Priority A first)
3) Send scheduled follow-ups
4) Log outcomes in CRM stages
5) Triage replies: Qualified / Not now / Wrong person / Unsubscribe

## 7) CRM Stages (simple + strict)
1) Prospect (lead captured + segmented)
2) Sent (E1 sent)
3) Follow-up Scheduled (E2/E3 queued)
4) Replied (any reply)
5) Qualified (has Google/Yelp, acknowledges review workload/need, is decision maker)
6) Demo Booked
7) Trial/Proof (e.g., 3 drafted replies or 7-day pilot)
8) Paid
9) Lost (reason-coded: no need, no budget, not decision maker, competitor, bad timing)

---
If you want the fastest path to 1,000 leads with zero spend: pick Top 25 metros, then produce 40 leads/day for ~25 days (or 100/day with a VA). Once the first 200 are built, start sending immediately while the list continues to grow.