# Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalations + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:25:18.612Z

---

Below are 3 paste-ready templates to run fulfillment in week 1 for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). These templates assume a human-in-the-loop workflow (we draft; we post when access is granted; otherwise client-post fallback). Proof URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Primary ops email: agent_bob_replit+review-bot@agentmail.to.

========================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into form or email)
========================
Subject: Quick onboarding for your Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply to this email with the answers below (or paste into a doc). Once we have this, we can begin responding within 1 business day.

A) Business + Locations
1) Business name:
2) Primary location address (and additional locations if any):
3) Business website:
4) Primary phone number:
5) Primary point of contact (name, email, mobile):
6) Backup escalation contact (name, email, mobile):

B) Review Profiles (links)
7) Google Business Profile link (or exact business name + address as it appears on Google):
8) Yelp business page link:
9) Any other review sources to monitor (optional): Facebook, TripAdvisor, etc.

C) Access (choose one for each platform)
10) Google Business Profile (GBP) posting access (preferred):
   - Option 1 (preferred): Add us as a Manager to GBP.
   - Option 2: You post replies using copy we provide.
   Please choose: Option 1 / Option 2

11) Yelp posting access:
   - Default (fastest onboarding): We draft; you post (client-post workflow).
   - Preferred: Grant Yelp Business Owner/Manager access so we can post.
   Please choose: Draft-only / Grant access

D) Brand Voice + Guardrails
12) Brand voice (choose 2–3): Friendly / Professional / Warm / Direct / Luxury / Casual / Clinical
13) Phrases/words to avoid (e.g., “cheap”, “guarantee”, competitor names):
14) Allowed offers (if any) that can be mentioned in replies (e.g., “Call us to make it right”, “Ask about our new patient special”):
15) Anything legally sensitive (medical, legal, financial disclaimers)? Provide required wording:
16) Do you want us to invite happy reviewers to return / book? Yes/No. If yes, preferred CTA:

E) Negative Review Handling
17) If review is 1–2★, should we (a) respond publicly only, (b) respond + request offline contact, (c) escalate to your team before posting? Choose:
18) Escalation contact method: Call / Text / Email. Provide details:
19) Any “must-escalate” topics (billing, safety, discrimination, HIPAA/PHI, threats, legal):

F) SLA + Approval Rules
20) Default approval preference:
   - Auto-post 4–5★ replies unless flagged
   - Approve-all (we send drafts first)
   Choose one:
21) Response time preference: within 24 hours (standard) / within 12 hours (pro)

G) Weekly KPI Report Recipients
22) Who should receive the weekly KPI email (names + emails)?
23) Preferred day/time for weekly report (e.g., Mondays 9am):

Once you reply, we’ll confirm go-live and share your first weekly baseline report.

—Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

========================
TEMPLATE 2 — ESCALATION TICKET + SLA (internal + client-facing)
========================
Title: Reputation Escalation Ticket — {{Business}} — {{Platform}} — {{Date}}

Severity (choose):
- Sev 1 (Urgent): Threats/legal claim/press/identity discrimination/safety allegation/medical privacy issue.
- Sev 2 (High): 1★ review with specific complaint, refund demand, accusation of fraud, repeated negative pattern.
- Sev 3 (Standard): 2–3★ review, ambiguous complaint, service issue.

Review Details
- Platform: Google / Yelp
- Review rating: ★1 ★2 ★3 ★4 ★5
- Review link:
- Reviewer name/handle:
- Date/time posted:
- Review text (paste):

Auto-flags (check any)
[ ] Mentions lawsuit/legal action
[ ] Mentions discrimination/harassment
[ ] Mentions safety/violence
[ ] Mentions medical/PHI/HIPAA
[ ] Mentions minors
[ ] Mentions doxxing/personal info
[ ] Spam/competitor suspicion

Recommended Response Strategy (draft owner)
- Goal: de-escalate + move offline + protect brand
- Public reply approach (1–2 sentences max):
- Offline CTA: “Please contact {{name}} at {{phone/email}} so we can make this right.”
- Do NOT admit fault or mention private details.

Approval + Posting Workflow
- If Sev 1: DO NOT POST until explicit client approval. Notify escalation contact immediately.
- If Sev 2: Send draft to client for approval; post after approval or after {{X}} hours with no response (only if client opted into auto-post for negatives).
- If Sev 3: If client opted into auto-post rules, post using approved template; otherwise request approval.

SLA Commitments (operational)
- Sev 1: draft within 2 hours (business hours), notify client within 15 minutes of detection.
- Sev 2: draft within 6 hours.
- Sev 3: draft within 24 hours.

Client Notification Email (paste-ready)
Subject: Action needed: New {{rating}}★ review on {{Platform}} for {{Business}}

Hi {{FirstName}},

A new {{rating}}★ review was posted on {{Platform}}. Because it includes {{flag_reason}}, we’re escalating before posting.

Review link: {{link}}
Proposed public reply (draft):
“{{draft_reply}}”

Please reply with APPROVE / EDITS within {{time_window}} so we can respond quickly.

—Bob
agent_bob_replit+review-bot@agentmail.to

========================
TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)
========================
A) Weekly KPI Email (send every week)
Subject: Weekly Reputation KPI Report — {{Business}} — Week of {{DateRange}}

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{Business}} (Google + Yelp). Reply to this email if you want us to adjust brand voice, escalation rules, or CTAs.

1) New Reviews (this week)
- Google: {{#}} new (avg {{avg_rating_google}}★)
- Yelp: {{#}} new (avg {{avg_rating_yelp}}★)

2) Rating Trend
- Current average rating: {{current_avg}}★ (vs last week {{last_week_avg}}★)
- Total reviews: {{total_reviews}}

3) Responsiveness
- Response rate (7 days): {{response_rate}}%
- Median response time: {{median_response_time}} hours
- Replies posted: {{#replies_posted}}

4) Negatives + Escalations
- 1–2★ reviews: {{#}}
- Escalations opened: {{#}}
- Escalations resolved/closed: {{#}}
- Top issue themes: {{theme1}}, {{theme2}}, {{theme3}}

5) Highlights
- Best review mention(s): {{highlight_quote}}
- Opportunities (what we’ll fix next week): {{opportunity_bullets}}

Access/Posting Note
- Google: {{posted_by_us_or_client}}
- Yelp: {{posted_by_us_or_client}} (default is draft-only unless owner access is granted)

—Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) Weekly KPI Sheet Layout (Google Sheet tabs/columns)
TAB 1: Overview (Week)
- Week start | Week end | Location | New Google reviews | New Yelp reviews | Avg rating (Google) | Avg rating (Yelp) | Combined avg | Total reviews | Replies posted | Response rate | Median response time (hrs) | 1–2★ count | Escalations opened | Escalations closed | Notes

TAB 2: Review Log
- Date | Platform | Location | Reviewer | Rating | Review text | Theme tag (billing/service/wait/quality/etc.) | Drafted by | Posted by (us/client) | Posted date | Status (draft/awaiting approval/posted/escalated) | Escalation severity | Link

TAB 3: SLA & Workflow
- Review type | Auto-post? (Y/N) | Draft SLA | Approval required? | Posting method | Escalation contact | Notes

TAB 4: Insights
- Theme | Count | Example quotes | Recommended ops fix | Owner

These templates are designed to be used immediately without paid tooling: reviews can be captured via manual checks or platform email alerts, drafts generated in your preferred LLM, then posted via GBP Manager access or client-post fallback on Yelp.