# Pilot Intake + Onboarding Kit (Multi-Location) — Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:42:39.699Z

---

Below is a complete copy/paste onboarding kit to start pilots immediately (7-day free trial). It includes: (1) a Google Form-ready intake form, (2) customer emails, and (3) an internal ops SOP.

=============================
1) PILOT INTAKE FORM (Google Form-ready)
=============================
Form title: Review Reply & Reputation Autopilot — 7-Day Pilot Intake
Form description:
Thanks for trying the 7-day pilot. We’ll draft brand-safe responses to new Google/Yelp reviews, escalate urgent issues, and send a weekly KPI snapshot. This is human-in-the-loop: you approve replies before posting. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

Fields (suggested as required unless noted):
A. Primary contact
- Full name
- Role (Owner / GM / Office Manager / Marketing / Other)
- Email
- Phone (for escalations; optional)

B. Business details
- Business name
- Industry (Dental / Med Spa / HVAC / Restaurant / Legal / Other)
- Website (optional)

C. Locations (multi-location supported)
- How many locations? (1 / 2-5 / 6-20 / 20+)
- Location list (repeatable section per location):
  - Location nickname (e.g., “Downtown”, “Oak Street”)
  - Address
  - Primary review platforms used (Google / Yelp / Both)
  - Google Business Profile public link (optional but helpful)
  - Yelp business link (optional)

D. Brand voice & reply preferences
- Brand voice (Friendly & warm / Professional & concise / Premium & formal / Other: free text)
- Do you want us to mention staff names? (Yes/No)
- Are there any phrases we should avoid? (free text)
- Are there any offers/links we should include when appropriate? (free text)

E. Escalation rules (SLA + what counts as urgent)
- Escalation contacts (name + email; can list multiple)
- Escalate immediately when (checkboxes):
  - Any review under 3 stars
  - Keywords: refund/chargeback, lawsuit/legal, harassment/threat, discrimination, injury/health/safety
  - Mentions of specific employee by name
  - Competitor or fake review suspicion
- Internal notes for escalations (optional)

F. Approval workflow
- Who approves replies? (name + email)
- Preferred approval method (Email approve link / Reply to email with “APPROVE” / We can post without approval after X hours [not available in pilot])

G. Forwarding setup confirmation
- Can you forward review notification emails to: agent_bob_replit+review-bot@agentmail.to ? (Yes/Need help)
- What email receives review notifications today? (e.g., owner@gmail.com, marketing@company.com)

H. Success criteria
- What would make this pilot a win? (free text)

=============================
2) CUSTOMER EMAIL TEMPLATES (copy/paste)
=============================

2.1 Pilot invite / confirmation (send after a positive reply)
Subject: Your 7-day Review Reply Autopilot pilot — next step (forwarding)

Hi {{Name}},

Confirmed — we’ll start your free 7-day pilot for Review Reply & Reputation Autopilot.

How it works (human-in-the-loop):
1) New review arrives on Google/Yelp
2) You forward the notification email to agent_bob_replit+review-bot@agentmail.to
3) We draft a brand-safe reply + tag sentiment + flag any escalation
4) You approve (or request edits)
5) You post on Google/Yelp (we provide the exact text + direct link)

About us / legitimacy link:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Next step:
Please tell me which email address currently receives your Google/Yelp review notifications, and whether you want approvals from you or someone else.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to


2.2 Forwarding setup instructions (simple + common paths)
Subject: Forwarding setup (Google/Yelp review notifications → our inbox)

Hi {{Name}},

To start the autopilot, please forward review notification emails to:
agent_bob_replit+review-bot@agentmail.to

Fast options:
A) Manual forward (works immediately)
- When a review notification arrives, hit Forward and send it to the address above.

B) Auto-forward rule (recommended)
Gmail:
1) Settings → See all settings → Forwarding and POP/IMAP
2) Add a forwarding address: agent_bob_replit+review-bot@agentmail.to
3) Create a filter (e.g., from: “noreply@google.com” or subject contains “New review”)
4) Set action: Forward to agent_bob_replit+review-bot@agentmail.to

Outlook:
1) Rules → Create rule
2) Condition: subject contains “review” (or Google/Yelp sender)
3) Action: Forward to agent_bob_replit+review-bot@agentmail.to

If you want, forward me one sample notification and I’ll confirm we’re parsing it correctly.

Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


2.3 Approval email (what the customer receives per review)
Subject: Approval needed: reply draft for {{Location}} ({{Stars}}★)

Hi {{ApproverName}},

New review detected for {{BusinessName}} — {{Location}}.
Rating: {{Stars}}★
Reviewer: {{ReviewerName}}
Review text:
“{{ReviewText}}”

Recommended reply (copy/paste to post):
{{DraftReply}}

Posting links:
- Google: {{GooglePostLink}}
- Yelp: {{YelpPostLink}}

Reply to this email with one of the following:
- APPROVE
- EDIT: {{your edits}}
- REJECT (and tell us why)

If this is urgent or sensitive, we will escalate separately based on your rules.

Bob
agent_bob_replit+review-bot@agentmail.to


2.4 Escalation alert (urgent)
Subject: ESCALATION: {{BusinessName}} {{Location}} review requires attention

Hi {{ContactName}},

We flagged a review that needs urgent handling.

Business/location: {{BusinessName}} — {{Location}}
Rating: {{Stars}}★
Reason(s) flagged: {{FlagReasons}} (e.g., <3 stars, refund keyword, legal keyword, health/safety)
Review text:
“{{ReviewText}}”

Proposed response (do not post until you confirm):
{{DraftReply}}

Please reply with:
- APPROVE (ok to post)
- HOLD (we will not respond yet)
- NOTES (any details we should incorporate)

Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


2.5 Weekly KPI report email
Subject: Weekly Reputation KPI Snapshot — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{Name}},

Here’s your weekly Reputation KPI snapshot for {{BusinessName}}.

Volume
- New reviews received: {{NewReviews}}
- Responses drafted: {{DraftsCreated}}
- Responses approved: {{ApprovedCount}}

Ratings
- Average rating (this week): {{AvgRatingWeek}}
- Average rating (prior week): {{AvgRatingPrev}}
- Rating trend: {{Trend}}

Responsiveness
- Median time-to-draft: {{MedianDraftTime}}
- Median time-to-approval: {{MedianApprovalTime}}
- Median time-to-response (end-to-end): {{MedianResponseTime}}
- SLA breaches (unhandled > {{SLAHours}}h): {{SLABreaches}}

Risk & Escalations
- Negative reviews (≤2★): {{NegCount}}
- Escalations triggered: {{EscalationCount}}
- Still awaiting decision: {{OpenEscalations}}

Notes / recommendations
{{Recommendations}}

If you want, reply with your preferred tone tweaks and we’ll adjust next week’s drafts.

Bob
agent_bob_replit+review-bot@agentmail.to

=============================
3) INTERNAL OPS SOP (7-day pilot delivery)
=============================
Goal: Deliver “autopilot” experience with minimal platform risk: ingest via forwarded emails → draft reply → get approval via email → customer posts → log everything → weekly KPI report.

Daily cadence (Mon–Sat recommended):
1) Inbox triage (2–4x/day)
- Check AgentMail inbox: agent_bob_replit+review-bot@agentmail.to
- For each new forwarded review email, create a review record in the log (even if parsing fails).

2) Parse + enrich (5 min/review)
Capture:
- Client
- Location
- Platform (Google/Yelp/Unknown)
- Stars (if present)
- Reviewer name (if present)
- Review text
- Review timestamp (from email)
If missing fields: reply to customer asking for (a) star rating, (b) platform link, (c) review text.

3) Sentiment + escalation tagging
Escalate immediately if any:
- Stars < 3
- Keywords: refund, chargeback, lawsuit, attorney, legal, HIPAA/PHI, discrimination, harassment/threat, injury, allergic reaction, infection, safety
- Allegation of fraud, scam, bait-and-switch
- Mentions staff member by name (optional per client)
Create flag reasons list.

4) Draft reply (brand-safe)
Rules:
- Never admit fault or liability.
- Never mention private customer details.
- Encourage offline resolution: phone/email.
- Keep it concise; thank positives; acknowledge negatives without specifics.
- Follow client brand voice.

Draft structure:
- Positive: thank + specific appreciation + invite back
- Neutral: thank + address topic + invite to contact
- Negative: thank + sorry to hear + invite to contact + minimal detail + commitment to improve

5) Send approval email
- Send Template 2.3 to the approver.
- Include direct posting links if available; otherwise request the GBP/Yelp link in the email.

6) Handle replies
- If APPROVE: mark approved + send “ready to post” confirmation with final text.
- If EDIT: incorporate edits + resend for approval.
- If REJECT: ask for guidance; optionally propose alternative.

7) SLA monitoring
Default pilot SLA:
- New reviews should receive a draft within 12 business hours.
- If any review un-drafted > 12h: send internal reminder email to agent_bob_replit+review-bot@agentmail.to.
- If any negative review un-escalated > 4h business hours: send escalation alert (Template 2.4).

Logging (minimum fields in spreadsheet/DB)
- client_id, location_id
- platform
- stars
- review_received_at
- drafted_at
- approved_at
- posted_confirmed_at (customer confirmation)
- escalation_flag (Y/N) + reasons
- status (new/drafted/awaiting_approval/approved/rejected/escalated/closed)

Weekly KPI report process (every 7 days per client)
- Count reviews received
- Avg rating this week vs last week (if rating available)
- Median time-to-draft, time-to-approval, end-to-end
- SLA breaches (#)
- Negative share (≤2★)
- Escalations triggered and unresolved
- 2–3 bullet recommendations (tone tweaks, common complaint theme, response speed improvement)
Send Template 2.5.

This SOP is sufficient to run 1–3 pilots immediately while the product UI/automation continues in parallel.
