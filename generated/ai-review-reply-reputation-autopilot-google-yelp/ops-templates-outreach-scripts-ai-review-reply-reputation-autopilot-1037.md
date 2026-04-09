# Ops Templates + Outreach Scripts (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:06:27.753Z

---

## 1) Client Onboarding Questionnaire (copy/paste into Typeform/Google Form)
**Subject/Title:** Review Reply Autopilot — Onboarding (5 minutes)

**Business basics**
1) Business name:
2) Website URL:
3) Primary location address:
4) Additional locations (if any):
5) Primary phone number:
6) Main services (top 5):
7) Top 3 customer types (e.g., families, homeowners, patients):

**Access (week-1 deliverability; no API required)**
8) Google Business Profile: can you add us as a Manager? (Yes/No)
   - If Yes: invite email = agent_bob_replit+review-bot@agentmail.to
9) Yelp: do you have Yelp Business Owner access? (Yes/No)
   - If Yes: add us / share access instructions
   - If No: choose posting workflow: (A) We draft, you post (default) (B) You grant access later
10) Preferred method for review notifications:
   - (A) Forward review alert emails to agent_bob_replit+review-bot@agentmail.to
   - (B) We check daily manually (requires access)

**Brand voice & safety**
11) Pick your default tone: (Professional / Warm & friendly / Short & direct / Luxury / Casual)
12) Words/phrases to avoid (banned list):
13) Topics to never mention (e.g., pricing, insurance, outcomes):
14) Compliance constraints (if any): (HIPAA/medical, legal, finance, etc.)
15) Offer language allowed? (e.g., “Call us,” “Book online,” “Free estimate”):
16) Link(s) we can include in replies (booking link, contact page):

**Escalation contacts (for 1–3★ reviews)**
17) Primary escalation contact name + role:
18) Email:
19) Phone/text (optional):
20) Best hours to reach them:
21) Internal resolution owner (if different):

**Response rules**
22) For 4–5★ reviews: auto-post without approval? (Yes/No)
23) For 1–3★ reviews: require approval before posting? (Yes/No, recommended Yes)
24) If reviewer mentions staff by name, can we name staff back? (Yes/No)
25) Max length preference: (1–2 sentences / 3–5 sentences)

**Weekly report**
26) Where should weekly KPI report be sent (emails):
27) Any competitor businesses you want benchmarked (optional):

---

## 2) Escalation Ticket + SLA Rules (copy/paste into a shared doc or form)
**Title:** Negative Review Escalation Ticket

**Ticket fields**
- Client:
- Location:
- Platform: Google / Yelp
- Review URL:
- Star rating: 1 / 2 / 3
- Date/time received:
- Reviewer name/handle:
- Review text (paste):
- Category (choose one): Service quality / Billing / Wait time / Staff behavior / Product issue / Misunderstanding / Spam / Competitor / Other
- Severity: Low / Medium / High (High = legal threat, discrimination claim, safety issue, medical/legal specifics)
- Required action: Public reply only / Public reply + internal follow-up / Request removal/dispute (client-owned)
- Notes for internal resolution owner:

**SLA + handling rules (week-1, human-in-the-loop)**
1) **1–3★ reviews always escalate** and are drafted within **12 hours** (business hours) and sent for approval unless client explicitly opts out.
2) **High severity keywords** (legal threat, medical outcomes, discrimination, violence, doxxing, refund threats) → do **not** post automatically. Draft “acknowledge + take offline” response and request client approval.
3) **Never admit fault or promise outcomes** (especially medical/legal). Use neutral language: “We’re sorry to hear…” + “We’d like to learn more…” + contact channel.
4) **Resolution tracking:** Mark as Resolved when (a) response posted and (b) internal follow-up owner confirms outreach attempt.
5) **Disputes/removal requests:** We can provide suggested dispute text, but **client submits** via their platform account.

**Default negative-review reply template (safe baseline)**
“Hi {Name}, we’re sorry to hear about your experience. We take feedback seriously and would like to understand what happened. Please contact {Contact Method} so we can look into this and work toward a resolution. — {Business Name}”

---

## 3) Weekly KPI Report Template (email + sheet layout)
### Weekly email (copy/paste)
**Subject:** Weekly Reputation KPI Report — {Business Name} ({Week of MMM DD})

Hi {First Name},

Here’s your weekly reputation snapshot for **{Business Name}**.

**This week (Google + Yelp):**
- New reviews: {#}
- Average rating (current): {x.x}
- Rating change vs last week: {+/- x.xx}
- Responses posted: {#}
- Response rate (of new reviews): {x%}
- Median response time: {xh}
- Negative reviews (1–3★): {#}
- Escalations resolved: {#}

**Themes we saw:**
1) {Theme 1}
2) {Theme 2}
3) {Theme 3}

**Actions taken:**
- {Action 1}
- {Action 2}

**Open items needing your input:**
- {Open item} (link)

If you’d like, reply to this email with any preferred phrasing updates (tone, offers, do-not-say list). We’ll apply it going forward.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### Google Sheet layout (tabs + columns)
**Tab 1: Weekly Summary**
Columns: Week Start | Week End | New Reviews (G) | New Reviews (Y) | Total New Reviews | Avg Rating (G) | Avg Rating (Y) | Overall Avg | Responses Posted | Response Rate | Median Response Time (hrs) | 1–3★ Count | Escalations Created | Escalations Resolved | Top Theme 1 | Top Theme 2 | Notes

**Tab 2: Review Log**
Columns: Date | Platform | Location | Reviewer | Stars | Review Text | Category | Drafted Response | Approval Needed? (Y/N) | Posted? (Y/N) | Posted Date | Response Time (hrs) | Escalated? (Y/N) | Escalation Ticket Link | Status

**Tab 3: Pipeline (Internal, 30-day KPI dashboard)**
Columns: Date | Leads Sent | Replies | Calls Booked | Shows | Closes | Cash Collected | MRR Added | Notes | Next Actions

---

## 4) Outreach Email Scripts (reference website + contact email)
### Cold email #1 (local business owner)
**Subject options:**
- Quick help with your Google/Yelp reviews
- We can reply to every review for {Business Name}
- Fix response rate + protect rating (done-for-you)

Body:
Hi {First Name} — I’m Bob.

I run an **AI Review Reply & Reputation Autopilot** that drafts and posts brand-safe responses to **Google Business Profile + Yelp** reviews, escalates negative reviews, and sends a weekly KPI report.

If you want, I can do a quick 2-minute audit: response rate, response time, and where negative reviews are coming from.

Would you like me to send the audit for {Business Name}?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to

— Bob

### Follow-up #1 (48 hours later)
Subject: Re: Google/Yelp review replies for {Business Name}

Hi {First Name} — checking in.

Most local businesses lose conversions when (a) reviews go unanswered, or (b) a 1–2★ review sits without a calm public response.

If you share your Google/Yelp links, I’ll send:
1) response-rate estimate,
2) 3 example replies in your brand voice,
3) a simple plan to get to 90%+ response coverage.

Ok to send that over?

— Bob | agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Agency/white-label intro email
Subject: White-label review reply autopilot for your clients

Hi {First Name} — I’m Bob.

We provide a white-label **review reply autopilot** for agencies managing local clients (Google Business Profile + Yelp). We handle:
- daily review monitoring,
- brand-safe drafted replies,
- negative-review escalation tickets,
- weekly KPI reporting.

You keep the client relationship; we operate in the background.

If helpful, I can outline pricing for 3 / 10+ locations and show the weekly report format.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

— Bob
