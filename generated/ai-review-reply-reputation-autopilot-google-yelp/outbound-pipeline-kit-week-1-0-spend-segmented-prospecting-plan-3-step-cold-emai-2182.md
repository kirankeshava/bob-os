# Outbound Pipeline Kit (Week 1, $0 spend): Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:06:08.058Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1 / $0 spend)

## 1) ICP + Verticals (pick 2–3 to start)
**Core ICP:** local businesses where reviews directly drive bookings/calls and the owner/GM is too busy to respond consistently.
- **Dental practices** (cosmetic/general; high LTV, high competition)
- **Med spas / aesthetic clinics** (very review-sensitive; high velocity)
- **HVAC / plumbers** (calls depend on trust + ratings; frequent negative-service reviews)

**Agency lane (parallel):** small marketing agencies managing 10–50 local clients (often already touching GBP).

## 2) Segmentation Rules (simple + operational)
Capture these fields from Google Business Profile (GBP): rating, review count, last review date, and response-rate proxy.

### Required segments
- **Not Responding:** response-rate proxy ≤ 20% (≤2 owner responses in last 10 reviews) OR zero responses visible in last 10.
- **Low Rating:** Google rating < 4.2.
- **High Volume:** review_count ≥ 200 OR last_review_date within 14 days.

### Priority scoring (routing)
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

### What to pitch by segment
- **Not Responding:** speed + consistency (“we respond within 12 hours; brand-safe; you approve”)
- **Low Rating:** escalation + recovery (“flag negatives immediately; draft calm public responses; private follow-up workflow”)
- **High Volume:** throughput + delegation (“never fall behind; weekly KPI report; keep tone consistent across locations”)

## 3) Lead List Build (Zero-cost method)
### Suggested geo approach (choose one)
- **Option A: Top 25 US metros** (fastest to get 500–1,000 relevant leads)
- **Option B: 5–10 target states** (higher focus; better personalization)

### Google Maps search footprints (copy/paste)
Use queries like:
- Dental: “dentist + {city}”, “cosmetic dentist + {city}”, “dental clinic + {city}”
- Med spa: “med spa + {city}”, “botox + {city}”, “aesthetic clinic + {city}”
- Home services: “HVAC + {city}”, “air conditioning repair + {city}”, “plumber + {city}”

### Minimum CSV columns
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, segment, priority, owner_or_manager_name (guess if unknown), email_1, email_2, personalization_snippet (recent review excerpt or paraphrase), notes

**Personalization snippet guidance (safe):** use a short paraphrase of the most recent review (avoid quoting full names; keep it factual).

## 4) Cold Email Sequences (3-step) — Direct to Local Businesses
**From:** agent_bob_replit+review-bot@agentmail.to
**Trust link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4A) Variant: NOT RESPONDING (Primary)
**Subject options:**
1) Quick fix for your Google reviews
2) {{business_name}}: responding to reviews (without extra work)
3) Noticed a response gap on Google

**Email 1 (Day 1)**
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a few recent reviews like: “{{recent_review_snippet}}”. It looks like some reviews aren’t getting a response.

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google/Yelp and helps you respond within **12 hours**. You can **approve/edit** before anything posts. Negatives get **escalated** immediately.

If you want, I can set up a **free 7-day trial** and draft replies for your last 10 reviews so you can see the tone.

Open to a quick 10-min call this week?

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1 (Day 3)**
Hi {{first_name}} — would it be helpful if I send 3 example replies (1 positive, 1 neutral, 1 negative) written in {{business_name}}’s voice based on your recent reviews?

If yes, just reply “examples” and I’ll send them.

— Bob

**Follow-up 2 (Day 7)**
Last try, {{first_name}}.

If reviews aren’t a priority right now, no worries. If you *do* want help: we can keep you consistently responding on Google/Yelp, escalate negatives fast, and send weekly KPIs.

Should I close the loop, or is there someone else who owns reputation/GBP for {{business_name}}?

— Bob

### 4B) Variant: LOW RATING (Recovery)
**Subject options:**
1) Quick reputation recovery plan for {{business_name}}
2) Small change that helps ratings
3) About your recent Google reviews

**Email 1**
Hi {{first_name}},

I saw {{business_name}}’s Google rating is around {{google_rating}} and there are some recent comments like: “{{recent_review_snippet}}”.

We run an **AI-assisted review response workflow** that:
- drafts calm, on-brand public replies (no defensiveness)
- **escalates negative reviews** to you immediately with suggested next steps
- keeps response times fast (goal: **within 12 hours**)
- sends a weekly KPI summary (rating trend, response rate, top issues)

No charge for a **7-day trial**—I’ll draft responses for the last 10 reviews so you can judge quality.

Worth a quick 10-min chat?

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1**
If it helps, I can draft a response specifically to the review mentioning “{{keyword_from_review}}” and send it for approval.

Want me to?

— Bob

**Follow-up 2**
Should I send a few draft replies and a simple “negative review escalation” checklist you can use internally?

— Bob

### 4C) Variant: HIGH VOLUME (Throughput)
**Subject options:**
1) Keeping up with Google reviews at {{business_name}}
2) Review response backlog?
3) System for responding within 12 hours

**Email 1**
Hi {{first_name}},

Noticed {{business_name}} has a lot of review activity ({{review_count}} reviews). Most teams fall behind simply due to volume.

We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp that drafts on-brand responses, routes negatives for approval/escalation, and keeps response times fast (target **12 hours**). You can approve/edit before posting.

Want a **free 7-day trial** where we handle drafts for your newest reviews + send a weekly KPI report?

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1**
Quick question: who currently owns review responses—front desk, manager, or an agency?

— Bob

**Follow-up 2**
If you want, I can do a one-time audit: response rate over last 10 reviews + a suggested tone guide for replies.

— Bob

## 5) Agency/Reseller Email (sell to agencies managing GBP)
**Subject options:**
1) White-label review replies for your clients
2) Helping you keep client GBPs responsive
3) Add-on: Google/Yelp review response autopilot

Hi {{first_name}},

If you manage Google Business Profiles for local clients, review responses are usually the most time-consuming part.

We built an **AI Review Reply & Reputation Autopilot** (Google/Yelp) that drafts brand-safe responses, escalates negatives, and produces a weekly KPI summary. It’s designed so an agency can run it with a simple approval workflow.

Open to a quick call? I can also set you up with a **free 7-day trial** on one client.

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 6) Daily Sending Ops (Week 1: zero-cost)
### Tools (free)
- **Lead tracking/CRM:** Google Sheets
- **Email sending:** existing inbox (keep volume low early)
- **Personalization:** manual insertion of snippet + segment token

### 14-day ramp (per inbox)
- Days 1–2: 15–20/day
- Days 3–4: 25/day
- Days 5–7: 35/day
- Week 2: 50/day (only if bounce < 3% and replies/complaints are healthy)

### Daily activity targets (minimum viable)
- 30 new prospects added/day to sheet
- 25 new emails/day sent
- 25 follow-ups/day (from day 3 onward)
- Reply SLA: same business day

### List QA rules
Reject/skip if:
- no website AND no obvious contact method
- franchise directory listings (unless multi-location is intentional)
- category mismatch (e.g., “dental lab” vs “dentist”)
- obvious spam/closed/permanently closed

### Bounce/complaint thresholds
- If hard bounce > 3% in a day: stop, verify emails, reduce volume.
- If spam complaints: stop immediately; tighten targeting and personalization.

## 7) CRM Stages (Google Sheet columns)
Stages: Prospect → Sent → Follow-up 1 → Follow-up 2 → Replied → Qualified → Demo Booked → Trial (Free 7 days) → Paid → Lost

**Definitions**
- **Qualified:** they confirm they manage GBP/Yelp responses AND have ongoing review volume.
- **Demo Booked:** meeting scheduled.
- **Trial:** you are actively drafting/posting (or drafting-for-approval) replies for 7 days.

## 8) What you need to decide (to unlock the 500–1,000 CSV)
Pick geography:
- Top 25 US metros (recommended for speed)
- OR 5–10 states (recommended for focus)

Once picked, use the query footprints above to build the first 200 leads in 48 hours, then scale to 500–1,000 with the same SOP.
