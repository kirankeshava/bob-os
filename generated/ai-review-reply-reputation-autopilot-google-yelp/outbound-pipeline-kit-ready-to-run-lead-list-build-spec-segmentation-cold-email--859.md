# Outbound Pipeline Kit (Ready to Run): Lead List Build Spec + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:36:51.662Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit

Business legitimacy link to include in outreach:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Primary reply-to email:
- agent_bob_replit+review-bot@agentmail.to

## 1) Target verticals + geo scope (for the first 500–1,000)
**Verticals:** Dental, Med Spa/Aesthetics, HVAC/Plumbing

**Recommended geo:** Top 25 US metros (enough volume, consistent demand, high LTV, less randomness than US-wide).

**Top 25 metros list (use as City/State tokens in Google Maps):**
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

## 2) Google Maps query pack (copy/paste)
Run each query in Google Maps, then open each listing and capture fields.

### Dental
- “Dentist in {{metro}}”
- “Dental clinic in {{metro}}”
- “Cosmetic dentist in {{metro}}”
- “Family dentistry in {{metro}}”

### Med spa / aesthetics
- “Med spa in {{metro}}”
- “Aesthetic clinic in {{metro}}”
- “Botox in {{metro}}”
- “Laser hair removal in {{metro}}”

### HVAC / plumbing
- “HVAC company in {{metro}}”
- “Air conditioning repair in {{metro}}”
- “Plumber in {{metro}}”
- “Drain cleaning in {{metro}}”

**Agency lane (parallel list, 50–150 prospects):**
- “Dental marketing agency {{metro}}”
- “Med spa marketing agency {{metro}}”
- “HVAC marketing agency {{metro}}”
- “Local SEO agency {{metro}}”
- “Reputation management agency {{metro}}”

## 3) Lead CSV columns (data dictionary)
Create a Google Sheet with these exact headers, then export CSV.

**Required columns (direct-to-business):**
- business_name (exact listing name)
- vertical (dental | med_spa | hvac_plumbing)
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date (YYYY-MM-DD)
- last_review_excerpt (<= 140 chars; safe snippet)
- responded_to_last_review (yes/no)
- response_rate_proxy_last10 (0–100; % of last 10 reviews with owner response)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name (if found)
- role_guess (Owner | Office Manager | Practice Manager | GM | Marketing)
- email_1
- email_2
- linkedin_url (optional)
- notes

**Agency columns (separate sheet/CSV):**
- agency_name
- city_state
- website
- service_focus (dental/medspa/home services/general)
- contact_name
- role (Founder | Partner | Head of SEO | Client Success)
- email
- linkedin
- notes

## 4) Segmentation rules (Google Sheets friendly)
Use these rules so outreach matches the pain.

### Segment definitions
- **not_responding:** response_rate_proxy_last10 <= 20 OR responded_to_last_review = “no”
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR last_review_date within last 14 days

### Priority routing (do this after segments)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

### Example formulas (adjust column letters as needed)
Assume:
- Rating in H, Review Count in I, Last Review Date in J, Responded flag in M, Response proxy in N.

**segment (O2):**
=IFS(N2<=20,"not_responding",H2<4.2,"low_rating",OR(I2>=200,TODAY()-J2<=14),"high_volume",TRUE,"high_volume")

**priority (P2):**
=IFS(OR(AND(O2="not_responding",OR(I2>=200,TODAY()-J2<=14)),AND(O2="low_rating",OR(I2>=200,TODAY()-J2<=14))),"A",OR(O2="not_responding",O2="low_rating"),"B",O2="high_volume","C",TRUE,"C")

## 5) Personalization rules (safe + fast)
Use one line only, derived from public review content.
- Keep the snippet short (<=140 chars).
- Prefer paraphrase over quoting if review contains sensitive info.
- Do not mention health conditions, financial hardship, or anything that could be embarrassing.

**Allowed hook examples:**
- “Saw a recent review mentioning wait time at the front desk.”
- “Noticed a 5-star review came in last week and it didn’t look like there was a reply yet.”
- “Looks like reviews are coming in steadily (weekly) — tough to keep up with responses.”

## 6) Cold email sequences (3-step) — include URL + contact email
Tokens:
- {{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_hook}} {{rating}} {{review_count}} {{response_gap}}

### 6A) INITIAL — Not Responding variant (direct-to-business)
**Subject options:**
1) Quick question about replying to Google reviews
2) {{business_name}} reviews (simple idea)
3) Leaving reviews unanswered

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_hook}}.

A lot of local businesses mean to reply, but it falls behind — and unanswered reviews can quietly hurt conversions.

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** replies for Google (and Yelp), escalates negatives, and sends a weekly KPI report. We can also run it in **“you approve before posting”** mode.

If I send 2–3 sample replies for your most recent reviews (no charge), would you like them?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

### 6B) INITIAL — Low Rating variant (direct-to-business)
**Subject options:**
1) Helping recover after tough reviews
2) {{business_name}} reputation quick win
3) Reducing 1–3 star impact

**Body:**
Hi {{first_name}} — quick note after reading a recent Google review for {{business_name}} ({{recent_review_hook}}).

When a business has a few unhappy reviews, the biggest leverage is **fast, consistent, empathetic responses** + an internal escalation path, so issues don’t repeat.

We run an **AI-assisted review response system** (Google + Yelp) that drafts replies in your voice, flags urgent negatives, and can require your approval before posting.

Worth a quick look? If you reply “yes,” I’ll send sample responses to your last 2 negative reviews so you can judge tone and usefulness.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

### 6C) INITIAL — High Volume variant (direct-to-business)
**Subject options:**
1) Keeping up with review volume
2) {{business_name}}: respond within 12 hours?
3) Review replies without extra staff time

**Body:**
Hi {{first_name}} — looks like {{business_name}} gets steady Google reviews ({{review_count}} total; latest on {{last_review_date}}). {{recent_review_hook}}

If you’re getting volume, it’s hard to respond quickly without burning admin time. We built a **Reputation Autopilot** that:
- drafts on-brand replies in minutes,
- escalates negatives immediately,
- and reports weekly KPIs (ratings trend, response time, negative themes).

Would you be open to a 10-minute walkthrough? Or I can send 3 sample replies first.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

### 6D) FOLLOW-UP #1 (48–72 hours after initial)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — checking if you’re the right person for review responses at {{business_name}}.

If you are: want me to send **2–3 sample replies** based on your latest reviews? (Brand-safe tone, optional approval-before-posting.)

If not: who should I reach out to?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 6E) FOLLOW-UP #2 (4–6 days after initial)
**Subject:** Last try — review reply help

Hi {{first_name}} — last note from me.

If you want, I’ll generate a **mini “reply pack”** for {{business_name}}:
- 3 draft replies to recent reviews
- 1 suggested template for negatives
- response-time + rating benchmarks

Just reply with “reply pack” and I’ll send it over.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

## 7) Agency/reseller email (separate lane)
**Subject options:**
1) White-label review replies for your clients
2) Add-on offer: Google/Yelp response autopilot
3) Reputation management that doesn’t eat labor

**Body:**
Hi {{first_name}} — I’m reaching out because you work with {{vertical}} businesses.

We built an **AI Review Reply & Reputation Autopilot** for Google + Yelp: brand-safe drafts, negative-review escalation, and weekly KPI reporting. It’s designed to be **white-label friendly** (or co-branded) so agencies can add it without hiring more labor.

If I send a 1-page overview + example client report, would you consider piloting it with 1–2 accounts?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

## 8) Daily sending ops (no-paid-tools baseline)
**Core principle:** deliverability > volume. Start low, ramp, keep bounces/complaints near zero.

### CRM stages (simple)
Prospect → Queued → Sent → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost

**Entry/exit criteria**
- Queued: valid email + personalization hook present
- Sent: logged date + template variant used
- Replied: any response (positive/negative/OOTO)
- Qualified: expresses interest OR confirms they handle reviews OR asks pricing
- Demo Booked: calendar time confirmed
- Trial/Onboarding: connected or ready to connect Google/Yelp accounts
- Paid: invoice/subscription active
- Lost: explicit no / bad fit / no response after 3 touches + 14 days

### 14-day ramp (per inbox)
- Days 1–2: 10–15/day (mostly plain text)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day depending on bounces/replies

If running 2 inboxes, split volume evenly.

### List QA checklist (before sending)
- Business fits category (not a directory/franchise HQ)
- Rating, review_count, last_review_date populated
- A safe personalization line present
- Email passes basic sanity (no obvious typos)
- Remove duplicates, role emails if possible (info@) unless no alternative

### Thresholds (stop and fix if hit)
- Bounce rate > 3% in any 200-send window
- Spam complaints > 0.1%
- Reply rate < 1% after 300 sends (revise subject lines + hooks)

### Reply-handling SLA
- Positive replies: respond within 2 hours business time
- Negative replies: respond same day, short, polite, offer to stop
- OOTO: re-queue 7–10 days later

### Daily activity targets (starting point)
- New leads added + QA: 25–50/day
- Emails sent: 30–60/day (ramping)
- Follow-ups: 10–30/day
- Manual personalization: 15–25/day (Priority A first)

## 9) What the owner/VA does next (fastest path)
1) Choose metros (top 25 list above).
2) For each vertical, pull ~15–20 prospects per metro across 8–10 metros to hit 500–1,000 total.
3) Fill required columns; compute response_rate_proxy_last10 using last 10 reviews (count responses).
4) Apply segment + priority formulas.
5) Start sends with Priority A first using the matching template variant.

If you want, once a first 200-lead CSV is produced, I can help refine segmentation rules and subject lines based on early reply patterns (who answers, objections, etc.).
