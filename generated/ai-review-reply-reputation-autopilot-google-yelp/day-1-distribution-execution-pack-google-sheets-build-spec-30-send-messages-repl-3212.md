# Day‑1 Distribution Execution Pack (Google Sheets Build Spec + 30 Send Messages + Reply-Handling Macros)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:42:57.449Z

---

BUSINESS DESTINATION (use in every message)
Landing page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply-to / booking email: agent_bob_replit+review-bot@agentmail.to

A) GOOGLE SHEETS OUTREACH TRACKER — 10-MINUTE BUILD SPEC
Create a Google Sheet named: “Review Reply Autopilot — Pipeline”. Add 4 tabs:

TAB 1: PIPELINE
Freeze row 1. Columns (copy exactly):
A Date Added
B Added By
C Lead Name
D Category (Dentist/Med Spa/Home Services/Restaurant/Other)
E Website
F Google Maps Link
G GBP Managed? (Y/N/Unknown)
H Yelp Page Link
I City
J State
K Locations Count
L Est Reviews/Month (Low <10 / Med 10–30 / High 30+)
M Rating
N Primary Contact Name
O Role
P Email
Q Phone
R IG/FB/LinkedIn URL
S Outreach Channel (Email/IG DM/FB DM/LinkedIn/Phone)
T Message Variant (A/B/C)
U Status (New/Contacted/Replied/Qualified/Trial Live/Won/Lost)
V Last Touch Date
W Next Follow-Up Date
X Next Step
Y Notes
Z Owner (Bob)
AA Priority Score (1–5)

Data validation:
- Column D dropdown: Dentist, Med Spa, Home Services, Restaurant, Other
- Column L dropdown: Low, Med, High
- Column S dropdown: Email, IG DM, FB DM, LinkedIn, Phone
- Column U dropdown: New, Contacted, Replied, Qualified, Trial Live, Won, Lost
- Column T dropdown: A, B, C
- Column AA dropdown: 1,2,3,4,5

Simple formulas:
- Add conditional formatting: Status=Replied (yellow), Qualified (blue), Trial Live (purple), Won (green), Lost (gray).
- Add a filter view: “Today Follow-ups” where Next Follow-Up Date = TODAY().

TAB 2: ACTIVITY LOG
Columns:
A Date
B Lead Name
C Channel
D Action (Sent/Reply/Call/Booked)
E Outcome (No reply/Interested/Not now/No fit)
F Notes

TAB 3: TEMPLATES
Store the message variants A/B/C + follow-ups (below) so you can copy/paste fast.

TAB 4: METRICS
Cells:
- Total Leads: =COUNTA(PIPELINE!C:C)-1
- Contacted: =COUNTIF(PIPELINE!U:U,"Contacted")
- Replied: =COUNTIF(PIPELINE!U:U,"Replied")
- Qualified: =COUNTIF(PIPELINE!U:U,"Qualified")
- Trial Live: =COUNTIF(PIPELINE!U:U,"Trial Live")
- Won: =COUNTIF(PIPELINE!U:U,"Won")
- Reply Rate: =Replied/Contacted


B) DAY‑1 SEND PACK — 30 READY-TO-SEND MESSAGES (EMAIL/DM)
Instructions: Pick 30 leads. For each, choose Variant A (most), B (for higher review volume), or C (for multi-location). Replace {BusinessName} {City} {Category} and paste the link + email as-is.

CORE VARIANT A (general) — use for 18 of 30
Subject: Quick help replying to Google/Yelp reviews at {BusinessName}
Body:
Hi {Name} — I’m Bob.

I noticed {BusinessName} in {City} has recent reviews on Google/Yelp. We run “Review Reply Autopilot”: brand-safe draft replies + approval, and we respond within 24 business hours.

Would you like a 7-day free trial (limited replies) so you can see what it looks like on your profile before committing?

Details/offer: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

If you tell me approx reviews/week + whether you want approve-before-post, I’ll recommend the right setup.

— Bob

CORE VARIANT B (high-volume / speed) — use for 8 of 30
Subject: We can respond to every review within 24 business hours
Body:
Hi {Name} — Bob here.

For busy {Category} businesses like {BusinessName}, reviews pile up fast. We draft and post (or draft + approval) brand-safe replies to Google Business Profile + Yelp and escalate negatives the same day.

We guarantee: respond to all reviews within 24 business hours (or next month free).

Want a 7-day free trial so you can judge the quality and time-savings?
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

CORE VARIANT C (multi-location) — use for 4 of 30
Subject: Multi-location review replies (Google + Yelp) with one approval flow
Body:
Hi {Name} — I’m Bob.

If {BusinessName} is managing reviews across multiple locations, we can centralize reply drafting + approvals and keep response time under 24 business hours.

We’ll start with a 7-day free trial for one location (limited replies), then expand if it’s a fit.

Offer/details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Two questions: how many locations + do you want brand voice strict (formal) or friendly?
— Bob

FOLLOW‑UPS (use same link + email)
Follow-up #1 (Day 2):
Subject: Re: review replies for {BusinessName}
Hi {Name} — quick bump. If it’s helpful, I can run a 7-day free trial and send drafts for approval first (no posting until you’re comfortable). Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 — agent_bob_replit+review-bot@agentmail.to

Follow-up #2 (Day 5):
Subject: Should I close the loop?
Hi {Name} — should I close this out, or is review reply coverage something you want fixed this month? We respond within 24 business hours and escalate negatives. Trial link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up #3 (Day 9):
Subject: Last note — 7-day free trial
Hi {Name} — last note from me. If you want to test without risk, reply “trial” and I’ll set up the 7-day free trial (limited replies) and send the first draft responses within 1 business day. agent_bob_replit+review-bot@agentmail.to

C) REPLY-HANDLING MACROS (ROUTING RULES + TEMPLATES)
Goal: convert replies into “Qualified” then “Trial Live” within 24 hours.

Routing rules:
1) Positive interest (“yes”, “tell me more”, “pricing?”): move Status=Replied → Qualified, set Next Step=Send onboarding questions + request access, set follow-up = tomorrow.
2) Price objection (“too expensive”, “we do it ourselves”): move to Replied, send ROI/time-savings + trial framing, ask for 7-day trial.
3) Not now: set Next Follow-Up Date = 30 days, Status=Replied, Note reason.
4) Not a fit (no Google/Yelp, no reviews, corporate restriction): Status=Lost with reason.

Macro 1 — Interested / next steps:
Subject: Great — 2 questions + access (7-day trial)
Thanks {Name}. To start your 7-day free trial, can you confirm:
1) Google Business Profile: do you want us to post replies, or send drafts for approval only?
2) Rough review volume: how many new reviews/week across Google + Yelp?

If you want posting enabled, we’ll need you to add agent_bob_replit+review-bot@agentmail.to as a Manager (Google Business Profile) and share your Yelp Business account via collaborator access (or we can do approval-only by email).

Once I have that, I’ll send the first set of draft replies within 1 business day.
Offer/details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Macro 2 — Approval-only reassurance:
Totally fine to start approval-only. We’ll draft replies in your brand voice and email them for a simple “Approve / Edit” response. After you’re comfortable, we can switch to posting (still with an approval window if you want).

Macro 3 — Price objection → trial + comparison:
Understood. Most owners can reply to reviews, but the pain is consistency + speed (especially negatives). The 7-day free trial lets you see if the drafts match your brand and if it actually saves time. If it doesn’t, you stop—no pressure. Want me to start the trial?

Macro 4 — Book a 10-min setup call (optional):
If easier, we can do a 10-minute setup call. Reply with two times that work and I’ll confirm by email. (Or just reply “trial” and we’ll do it async.)

Operator checklist for Day‑1 (do this in order):
1) Build the Sheet (Tab A) and paste your first 30 leads in PIPELINE.
2) Send 30 messages (18 A, 8 B, 4 C) via email/DM and mark Status=Contacted + Last Touch Date.
3) Log each send in ACTIVITY LOG.
4) Check inbox twice/day. For any reply, apply routing rules and send Macro 1 within the same business day.
5) Move any lead that agrees into Status=Trial Live and set Next Step=Collect access + brand voice notes.

All outbound must include:
- Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
