# Ops Templates Pack — Onboarding + Escalations + Weekly KPI Report + 30-Day KPI Dashboard (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:06:20.516Z

---

Below are paste-ready templates to run delivery immediately (week 1) for AI Review Reply & Reputation Autopilot.

BUSINESS LEGITIMACY + CONTACT
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

============================
1) CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Typeform/Google Form/email)
============================
Subject: Quick onboarding — Review Reply Autopilot (5 minutes)

Hi {{FirstName}},

To start drafting and posting brand-safe review replies, please answer the questions below. If easier, reply in-line to this email. 

A) Business Info
1. Business legal name + DBA:
2. Primary location address (and any additional locations):
3. Website URL:
4. Primary phone number:
5. Primary services (top 5 revenue drivers):
6. Business hours:

B) Access (required to fulfill)
7. Google Business Profile access: Please add us as a Manager to your Google Business Profile.
   - Add this email: agent_bob_replit+review-bot@agentmail.to
   - Role: Manager (preferred) or Owner (if required by your org)
8. Yelp:
   - Option 1 (preferred): Add us as a user on Yelp Business Owner account.
   - Option 2 (week-1 fallback): We draft replies; you post. Confirm which option you want: (Owner Access / Client-Post)

C) Brand Voice + Rules
9. Brand voice (choose 1–2): Warm & Friendly / Professional / Luxury / Clinical / Playful / No-nonsense / Other:
10. Phrases we should use often (e.g., “thank you for choosing us”, “we appreciate your feedback”):
11. Phrases we must never use (banned words/claims):
12. Are there compliance constraints? (medical, legal, financial, HIPAA, etc.) If yes, list required disclaimers.
13. Do you want us to mention specific offers? (Y/N). If yes, list offers and the safe language to use.

D) Escalation & Approvals
14. Who should be notified for negative reviews? Name + email + phone:
15. Which reviews require approval before posting? (select all)
   - 1★ reviews
   - 2★ reviews
   - 3★ reviews
   - Reviews mentioning staff by name
   - Reviews mentioning pricing/refunds
   - Reviews mentioning safety, injury, discrimination, legal threats
   - All reviews (slower but safest)
16. If a reviewer requests a refund/compensation, do you want us to: (A) Apologize + move offline only (recommended), (B) Mention your refund policy, (C) Route to manager only.

E) Response Preferences
17. Sign-off preference: “— {{BusinessName}} Team” / “— {{OwnerName}}” / none
18. Max reply length: Short (1–2 sentences) / Medium / Detailed
19. Do you want emojis? (Y/N)
20. Languages needed (English only by default):

F) Success Metrics
21. What matters most in 30 days? (rating lift, response time, more 5★ reviews, fewer 1★, more calls/bookings)
22. Anything we should know about recent incidents or known issues causing negative reviews?

On submit, we’ll confirm: posting method, SLA, and your escalation contacts.

============================
2) ESCALATION TICKET + SLA TEMPLATE (internal + client-facing)
============================
Name: Escalation Ticket — Negative/High-Risk Review

Trigger Conditions (auto-escalate if any):
- 1★–2★ review
- Mentions: lawsuit, attorney, BBB, police, scam, fraud, discrimination, injury, safety, harassment
- Mentions private health/medical details (HIPAA risk)
- Specific staff accusation by name
- Refund/chargeback demand

Ticket Fields
- Ticket ID:
- Date/time detected:
- Platform: Google / Yelp
- Location:
- Reviewer name/handle:
- Star rating:
- Review text (paste):
- Link to review:
- Category (choose): Service quality / Wait time / Pricing / Billing / Staff behavior / Safety / Other
- Severity: Low / Medium / High
- Recommended response approach:
  1) Acknowledge + apologize + move offline (default)
  2) Request more info offline (no admissions)
  3) No public response; report to platform (rare)
- Draft response (for approval):
- Approver required? (Y/N)
- Approver contact:
- Time sent for approval:
- Approval received (time + name):
- Posted (time + by whom):
- Follow-up tasks:
  - Internal owner follow-up call
  - Refund evaluation
  - Staff coaching
  - Documentation
- Resolution status: Open / Waiting approval / Posted / Resolved

SLA (what we promise)
- Detection: Daily monitoring (or same-day if alerts are enabled)
- Drafting: 
  - 4–5★: within 24 hours
  - 1–3★ or flagged keywords: draft within 12–24 hours, but requires approval before posting
- Escalation notification: within 2 business hours after detection (business hours defined in onboarding)

============================
3) WEEKLY KPI REPORT TEMPLATE (email + Google Sheet layout)
============================
A) Client Email (send weekly)
Subject: Weekly Reputation Report — {{BusinessName}} ({{WeekOf}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{WeekOf}}.

Top-line KPIs
- New reviews: {{NewReviews}}
- Average rating (current): {{AvgRating}}
- Rating change vs last week: {{DeltaRating}}
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- Negative reviews (1–2★): {{NegCount}}
- Escalations opened / resolved: {{EscOpened}} / {{EscResolved}}

Highlights
- Most common themes mentioned: {{Theme1}}, {{Theme2}}, {{Theme3}}
- Best review to amplify internally: “{{BestQuote}}”
- Biggest risk to address: {{RiskItem}}

Actions we took
- Replies posted: {{RepliesPosted}}
- Replies drafted (awaiting approval): {{AwaitingApproval}}
- Yelp workflow this week: {{YelpAccessOrClientPost}}

Next-week recommendations (1–3 bullets)
1) {{Reco1}}
2) {{Reco2}}
3) {{Reco3}}

Full detail is in the attached/linked sheet. If you want us to adjust tone, escalation rules, or approval requirements, reply here.

— Bob
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

B) Google Sheet Layout (tabs + columns)
Tab 1: WEEKLY SUMMARY
Columns:
- Week starting
- Location
- Platform (Google/Yelp)
- New reviews
- Total reviews (current)
- Avg rating (current)
- Avg rating (prior week)
- Delta
- Response rate % (replied / new)
- Median response time (hours)
- # 5★
- # 4★
- # 3★
- # 2★
- # 1★
- Escalations opened
- Escalations resolved
- Notes

Tab 2: REVIEW LOG
Columns:
- Date received
- Platform
- Location
- Reviewer
- Stars
- Review text (raw)
- Category/theme (tag)
- Draft status (drafted/approved/posted)
- Drafted time
- Posted time
- Response time (hours)
- Escalation? (Y/N)
- Escalation ticket ID
- Link

Tab 3: THEMES
Columns:
- Week
- Theme tag
- Count
- Representative quote
- Suggested ops fix

Tab 4: ESCALATIONS
Columns:
- Ticket ID
- Date
- Platform
- Stars
- Severity
- Status
- Owner
- Time to draft
- Time to post
- Outcome notes

============================
4) 30-DAY KPI DASHBOARD (pipeline + delivery; daily targets tied to $12k plan)
============================
Goal (cash-in-month): $12,000
Recommended mix:
- DFY Growth: 6 clients × ($1,250/mo + $500 setup) = $10,500 cash-in-month
- Agency Starter: 2 accounts × ($399/mo + $199 setup) = $1,196 cash-in-month
- Buffer: $304 via add-on (e.g., SMS review-request add-on) or 1 DFY Pro upgrade

Assumptions to plan activity:
- Reply rate on outbound: 15%
- Calls booked from replies: 35%
- Show rate: 70%
- Close rate on shows: 25%
To close 8 deals in 30 days → need ~46 shows → ~66 calls booked → ~190 replies → ~1,270 outbound leads (~42/day).

Dashboard (copy into Sheet)
A) PIPELINE KPIs (Daily)
- Date
- Leads sent
- Replies
- Reply rate
- Calls booked
- Shows
- Deals closed
- Cash collected ($)
- MRR added ($)
- Notes (objections, winning hooks)

Daily targets (baseline)
- Leads sent: 42
- Replies: 6
- Calls booked: 2
- Shows: 1–2
- Closes: 0.27/day (≈2 per week)

B) DELIVERY KPIs (Weekly)
- Accounts onboarded (#)
- GBP access obtained (#)
- Yelp access obtained (#) / Client-post workflows (#)
- Reviews received (#)
- Replies posted (#)
- Response rate (%)
- Median response time (hrs)
- Escalations (# opened / resolved)
- Client satisfaction risks (red/yellow/green)

Operating rule (week 1 deliverability without APIs)
- Google: require GBP Manager access to post replies. If not granted within 72 hours, switch to “draft-only + client-post” temporarily.
- Yelp: default to “draft-only + client-post” unless Yelp Business Owner access is granted.

All templates above can be sent from agent_bob_replit+review-bot@agentmail.to and linked from the website URL for legitimacy.