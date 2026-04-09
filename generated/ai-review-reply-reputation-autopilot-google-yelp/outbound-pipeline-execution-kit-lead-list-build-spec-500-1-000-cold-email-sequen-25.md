# Outbound Pipeline Execution Kit — Lead List Build Spec (500–1,000) + Cold Email Sequences (with Website/Email References)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:12:22.378Z

---

## A) Lead List Build Spec (500–1,000) — Zero/Low-Cost Google Maps Workflow

### Goal
Build 500–1,000 local-business prospects across **Dentists**, **Med Spas/Aesthetics**, **HVAC/Plumbing** (plus optional Agency lane), including:
- Google rating, review count, last review date
- Response-rate proxy (owner responses in last 10)
- A safe personalization hook (short review snippet or paraphrase)
- Owner/manager email(s) when available

### CSV Columns (copy/paste headers)
business_name,vertical,service_subtype,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_owner_responses,segment,priority_tier,personalization_snippet,contact_name,contact_role,email_1,email_2,linkedin_url,notes

### Vertical Definitions (keep categories tight)
1) **Dentists**: “Dentist”, “Cosmetic dentist”, “Dental clinic”, “Emergency dentist”, “Orthodontist” (optional)
2) **Med spas**: “Medical spa”, “Med spa”, “Aesthetics clinic”, “Skin care clinic” (avoid: nail salons)
3) **HVAC/Plumbing**: “HVAC contractor”, “Air conditioning repair service”, “Plumber”, “Plumbing service”

### Geography Options (owner must choose one)
- Option 1: **Top 25 US metros** (fast volume, broad)
- Option 2: **5–10 states** (tight routing + better personalization)
- Option 3: **US-wide** (largest but noisier)

### Query Pack Template (Google Maps)
For each chosen geo (metro or state), run these searches and collect top results until you hit quota.

**Dentists (per city):**
- “dentist in {CITY, ST}”
- “cosmetic dentist in {CITY, ST}”
- “dental clinic in {CITY, ST}”

**Med Spas (per city):**
- “medical spa in {CITY, ST}”
- “med spa in {CITY, ST}”
- “aesthetics clinic in {CITY, ST}”

**HVAC/Plumbing (per city):**
- “HVAC contractor in {CITY, ST}”
- “air conditioning repair in {CITY, ST}”
- “plumber in {CITY, ST}”

### What to Capture (per lead)
1) **Google rating / review count**: from Maps panel
2) **Last review date**: open reviews → sort by newest → capture date of most recent
3) **Response-rate proxy** (last 10 reviews):
   - Count how many of the last 10 reviews have an “Owner response”
   - response_rate_proxy = owner_responses/10
4) **Personalization snippet**:
   - Use 6–16 words from the most recent review OR a short paraphrase.
   - Avoid health/PHI or anything sensitive; do not mention treatment details.
5) **Website + contact email(s)**:
   - Check website header/footer + “Contact” page.
   - If none: look for “info@”, “office@”, “support@”, “hello@”.
   - For clinics: “appointments@”, “frontdesk@”. For home services: “dispatch@”, “service@”.

### Segmentation Rules (apply in sheet)
- **Not Responding**: response_rate_proxy ≤ 0.2 OR 0 owner responses in last 10
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count ≥ 200 OR last_review_date within 14 days

**Priority tiers**
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only

### QA Checklist (reject bad leads)
Reject if:
- Franchise mega-brand (unless multi-location is explicitly desired)
- No website and no email anywhere (unless you’re okay calling)
- Category mismatch (e.g., nail salon in med spa search)
- Duplicate locations/duplicates in sheet

### Daily Production Target (manual)
- 1 researcher can typically collect **60–120 leads/day** (faster if skipping snippet + response proxy).
- To reach 800 leads: 8–12 working days at 70–100/day.

---

## B) Cold Email Sequences (3-step) — Direct-to-Local + Agency Lane

### REQUIRED placeholders (edit before sending)
- {{WEBSITE_URL}} = your product site (e.g., https://yourdomain.com)
- {{FROM_EMAIL}} = your sending address (e.g., team@yourdomain.com)
- {{FIRST_NAME}}, {{BUSINESS_NAME}}, {{CITY}}, {{VERTICAL}}
- {{RECENT_REVIEW_SNIPPET}} (or short paraphrase)
- {{RESPONSE_GAP}} = “no owner replies on recent reviews” / “few responses lately”


# 1) DIRECT — Not Responding (core wedge)

## Email 1
**Subject:** Quick question about replies for {{BUSINESS_NAME}}

Hi {{FIRST_NAME}} —

I was looking at {{BUSINESS_NAME}}’s Google reviews and saw “{{RECENT_REVIEW_SNIPPET}}”. It also looks like {{RESPONSE_GAP}}.

We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google Business Profile + Yelp, escalates negatives, and sends a weekly KPI report.

Offer: we can help you respond to new reviews within **12 hours**. You can do **approval-only** (nothing posts without you).

Worth a 10-minute look this week? If yes, reply with “yes” and I’ll send 2 times.

— {{SENDER_NAME}}
{{FROM_EMAIL}}
{{WEBSITE_URL}}

## Email 2 (Follow-up)
**Subject:** Re: replies on Google reviews

Hi {{FIRST_NAME}} —

If you want, I can show you what we’d reply to the last 2 reviews for {{BUSINESS_NAME}} (so you can see tone + safety). No setup required.

Should I send a couple draft replies here by email?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}

## Email 3 (Breakup)
**Subject:** close the loop?

Hi {{FIRST_NAME}} —

All good if this isn’t a priority. Last question: do you have someone actively responding to reviews right now, or is it ad hoc?

If it’s ad hoc, we can run this in the background (approve-only, weekly KPIs).

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}


# 2) DIRECT — Low Rating (reputation recovery)

## Email 1
**Subject:** idea to lift {{BUSINESS_NAME}}’s rating trend

Hi {{FIRST_NAME}} —

I noticed a recent review mentioned “{{RECENT_REVIEW_SNIPPET}}”. When businesses reply quickly (and escalate issues privately), it often prevents repeat negatives and helps the rating trend.

Our system drafts **brand-safe** Google/Yelp replies, flags high-risk reviews for escalation, and gives you a weekly reputation KPI report.

If I send 2 draft replies to the most recent negative reviews for {{BUSINESS_NAME}}, would you want them in a more empathetic tone or more factual/short?

— {{SENDER_NAME}}
{{FROM_EMAIL}}
{{WEBSITE_URL}}

## Email 2
**Subject:** want me to draft 2 replies?

Hi {{FIRST_NAME}} —

We can do this two ways:
1) **Approve-only:** you approve every reply before posting.
2) **Autopilot:** we post standard positives, escalate negatives for approval.

Which is closer to what you’d prefer?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}

## Email 3
**Subject:** should I stop reaching out?

Hi {{FIRST_NAME}} —

If review management is already covered, no worries—just tell me and I’ll close it out.

If it isn’t, happy to send draft replies + a simple weekly KPI format so you can see what you’d get.

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}


# 3) DIRECT — High Volume (ops + consistency)

## Email 1
**Subject:** keeping up with review volume at {{BUSINESS_NAME}}

Hi {{FIRST_NAME}} —

{{BUSINESS_NAME}} gets a lot of review volume, and I saw a recent one: “{{RECENT_REVIEW_SNIPPET}}”.

We help teams respond consistently without it becoming a daily task: drafts for Google/Yelp, brand-safe tone controls, negative-review escalation, and a weekly KPI report.

Would it be useful if replies were handled within **12 hours** (with your approval)?

— {{SENDER_NAME}}
{{FROM_EMAIL}}
{{WEBSITE_URL}}

## Email 2
**Subject:** simple workflow (approve-only)

Hi {{FIRST_NAME}} —

The workflow is simple:
- You get drafts in one queue
- Approve/edit in seconds
- We track response time + sentiment trend weekly

Want me to show the workflow on a quick call?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}

## Email 3
**Subject:** last note

Hi {{FIRST_NAME}} —

If you’re the wrong person for reputation/reviews at {{BUSINESS_NAME}}, who owns it?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}


# 4) AGENCY / RESELLER Lane (marketing agencies serving local businesses)

## Email 1
**Subject:** add-on for your local clients (reviews)

Hi {{FIRST_NAME}} —

I’m reaching out because you work with local businesses (dentists/med spas/home services). Many are losing easy wins because reviews go unanswered or negatives aren’t escalated quickly.

We offer an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp: brand-safe drafts, negative escalation, and weekly KPI reporting. It’s easy to package as a retainer add-on.

Are you open to a partner/reseller setup? If yes, I’ll send pricing + how agencies typically position it.

— {{SENDER_NAME}}
{{FROM_EMAIL}}
{{WEBSITE_URL}}

## Email 2
**Subject:** quick partner info?

Hi {{FIRST_NAME}} —

We can support:
- White-label or co-branded
- Approve-only workflows for sensitive clients
- A simple weekly reputation report you can forward

Want the one-pager?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}

## Email 3
**Subject:** close the loop

Hi {{FIRST_NAME}} —

If you’re not exploring add-ons right now, no problem. If you are, who’s best to talk to about partnerships?

— {{SENDER_NAME}}
{{FROM_EMAIL}} | {{WEBSITE_URL}}

---

## C) Daily Sending Ops (minimum viable)
- Day 1–3: 20–30 new emails/day, verify bounce <3%, tighten subject lines
- Day 4–7: 40–60/day, start follow-ups, log objections + winners
- Day 8–14: 60–100/day (only if bounce/complaints stay low)
- Daily: 1st replies handled within 2 hours; negative sentiment replies within 30 minutes
- CRM stages: Prospect → Sent → Opened/Clicked → Replied → Qualified → Demo Booked → Trial → Paid → Lost

If you send me your chosen geography option, I’ll convert the query pack into an exact city/state checklist sized to hit 500–1,000 in 7–10 days.
