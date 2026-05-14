# Pilot Intake + Onboarding + Approval Email Templates (Human-in-the-Loop Review Reply Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:21:06.816Z

---

Below are paste-ready assets to start onboarding pilots immediately (no product UI required). All customer comms reference the live site URL and the dedicated inbox.

============================
A) PILOT INTAKE FORM (GOOGLE FORM) — QUESTIONS (MULTI-LOCATION)
============================
Form title: Review Reply & Reputation Autopilot — Free 7‑Day Pilot
Form description (paste):
“Thanks for your interest. This free 7‑day pilot drafts brand-safe replies to your Google/Yelp reviews, escalates urgent issues, and sends a weekly KPI summary. To prove legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Questions? Email agent_bob_replit+review-bot@agentmail.to.”

Questions:
1) Business name (Short answer)
2) Website URL (Short answer)
3) Primary contact name + role (Short answer)
4) Primary contact email (Short answer)
5) Primary contact phone (optional) (Short answer)
6) Review platforms used (Checkboxes): Google Business Profile, Yelp, Facebook, TripAdvisor, Other
7) How many locations? (Multiple choice): 1 / 2-5 / 6-20 / 21+
8) Locations list (Paragraph): “List each location name + city + the Google Business Profile link (and Yelp link if applicable). One per line.”
9) Brand voice (Multiple choice): Friendly & casual / Professional & concise / Warm & empathetic / Luxury & high-end / Other
10) Words/phrases to avoid (Paragraph)
11) Offers/comp policies (Multiple choice + paragraph):
   - “We can offer a call to resolve issues”
   - “We can offer a refund/credit”
   - “We never mention compensation publicly”
   - Notes
12) Escalation contacts (Paragraph): “Name + email (+ phone if urgent). Include who should be alerted for negative reviews.”
13) SLA preference (Multiple choice): Respond within 2 hours / 6 hours / 12 hours / 24 hours
14) Compliance notes (Checkboxes): Medical/health (HIPAA-like sensitivity), Legal sensitivity, Financial services, None
15) Anything else we should know? (Paragraph)

Confirmation message (paste):
“Got it. Next step: please forward your review notification emails to agent_bob_replit+review-bot@agentmail.to. We’ll reply with a quick setup confirmation and your first drafted responses. Legit site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.”

============================
B) ONBOARDING EMAIL TO NEW PILOT (FORWARDING SETUP)
============================
Subject: Your Review Reply Autopilot pilot — forwarding setup (5 minutes)

Hi {{FirstName}},

Thanks — you’re set for the free 7‑day Review Reply Autopilot pilot.

Legitimacy link (what we’re running):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Step 1 (required): Forward review notification emails to this dedicated inbox:
agent_bob_replit+review-bot@agentmail.to

Step 2: Make sure the forwarded email includes the full message content (not just a link).

Google Business Profile forwarding (common options):
- If Google sends review notifications to a shared inbox (e.g., info@ / manager@), set an auto-forward rule to agent_bob_replit+review-bot@agentmail.to.
- If multiple locations have different notification emails, forward each of them (we support multi-location from day 1).

Yelp forwarding:
- Forward Yelp review alert emails the same way (rule/auto-forward preferred).

Step 3 (recommended): Reply to this email with:
- Your preferred sign-off name (e.g., “— Dr. Lee” or “— The {{BusinessName}} Team”)
- Any phrases you never want used

How it works during the pilot:
1) A new review arrives (via forwarded email)
2) We draft a brand-safe reply
3) You approve/edit/reject via email
4) We provide the exact final text + the direct link to post it (you or your staff posts it)
5) Negative/urgent items get escalated immediately per your rules

If anything is urgent, email us at agent_bob_replit+review-bot@agentmail.to.

— Bob

============================
C) APPROVAL EMAIL — NEW DRAFT READY (DEFAULT)
============================
Subject: Draft reply ready — {{LocationName}} ({{Platform}} {{StarRating}}★)

Hi {{FirstName}},

A new review came in for {{LocationName}}.

Platform: {{Platform}}
Rating: {{StarRating}}★
Reviewer: {{ReviewerName}}
Review excerpt:
“{{ReviewText}}”

Proposed reply (brand-safe):
“{{DraftReply}}”

Reply with ONE of the following:
1) APPROVE
2) EDIT: {{your edits in-line}}
3) REJECT

Posting instructions (manual link-out for now):
- Post on {{Platform}} using this listing/link: {{PostingLink}}
- Paste the approved text exactly as above.

Note: If this is negative (<3★) or includes sensitive keywords, we’ll flag it and can suggest a private-resolution message as well.

— Bob (Review Reply Autopilot)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

============================
D) APPROVAL EMAIL — ESCALATION (NEGATIVE / SENSITIVE)
============================
Subject: ACTION NEEDED — negative review for {{LocationName}} ({{Platform}} {{StarRating}}★)

Hi {{FirstName}},

Flagged for escalation based on rating/sentiment/keywords.

Platform: {{Platform}}
Rating: {{StarRating}}★
Reviewer: {{ReviewerName}}
Keywords/flags: {{Flags}}
Review:
“{{ReviewText}}”

Recommended approach:
- Public reply: short, empathetic, no admissions, invite offline resolution
- Internal: assign owner + contact reviewer (if possible) within {{SLAHours}} hours

Proposed public reply:
“{{DraftReply}}”

Reply with:
APPROVE / EDIT: … / REJECT

Posting link: {{PostingLink}}

If you want, reply with the best contact name/phone for offline resolution and I’ll tailor the wording.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

============================
E) “WE POSTED” CONFIRMATION (IF CLIENT POSTS, THIS IS A LOG CONFIRMATION)
============================
Subject: Logged: response posted for {{LocationName}} ({{Platform}})

Hi {{FirstName}},

Thanks — I’ve logged that the response was posted for:
- {{LocationName}} / {{Platform}}
- Rating: {{StarRating}}★
- Posted at: {{Timestamp}}

Final response text:
“{{FinalReply}}”

This will be included in your weekly KPI report (response time, volume, rating trend, and escalations).

— Bob
Support: agent_bob_replit+review-bot@agentmail.to

============================
F) WEEKLY KPI EMAIL (PILOT)
============================
Subject: Weekly reputation KPIs — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation summary:

1) Review volume
- New reviews: {{NewReviewCount}}
- By location: {{LocationBreakdown}}

2) Rating trend
- Average rating this week: {{AvgRatingThisWeek}}
- Previous week: {{AvgRatingPrevWeek}}
- Net change: {{RatingDelta}}

3) Responsiveness
- Drafts delivered: {{DraftsDelivered}}
- Approved: {{ApprovedCount}} | Edited: {{EditedCount}} | Rejected: {{RejectedCount}}
- Median time-to-first-draft: {{MedianTTFD}}
- Median time-to-approved: {{MedianTTFA}}
- SLA breaches (over {{SLAHours}}h): {{SLABreaches}}

4) Negative review handling
- Negative reviews (<3★): {{NegativeCount}} ({{NegativePct}}%)
- Escalations triggered: {{EscalationCount}}
- Unresolved escalations: {{UnresolvedEscalations}}

Top themes (from review text):
- {{Theme1}}
- {{Theme2}}
- {{Theme3}}

If you want, I can propose 2–3 operational fixes to reduce negative reviews next week.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

============================
G) 30-DAY ORGANIC DISTRIBUTION CADENCE (NO SPEND)
============================
Daily (Mon–Fri):
- Build 20 new leads/day (local owners/managers) from Google Maps + Yelp category pages.
- Send 30 cold emails/day using the pilot offer (free 7-day trial).
- Send 10 DMs/day (Facebook groups / Instagram) to owners who mention reviews or reputation.
- Track replies + follow-ups in a simple sheet: Business, Contact, Email, Niche, Locations, Last touch, Status.

Weekly targets:
- Week 1: 150 emails, 50 DMs, 10 calls → 1–3 pilots
- Week 2: 200 emails, 75 DMs, 15 calls → 3–6 pilots
- Week 3–4: scale volume and turn pilots into referrals/case studies.

Key CTA in all outreach: “Forward your review notifications to agent_bob_replit+review-bot@agentmail.to and we’ll start drafting replies within 1 business day.”
