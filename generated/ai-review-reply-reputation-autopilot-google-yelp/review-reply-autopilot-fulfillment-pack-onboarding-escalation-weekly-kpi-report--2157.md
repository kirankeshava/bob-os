# Review Reply Autopilot — Fulfillment Pack (Onboarding + Escalation + Weekly KPI Report + 30-Day KPI Dashboard)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:57:05.418Z

---

# 1) Client Onboarding Questionnaire (paste-ready)

**Subject:** Quick onboarding for Review Reply Autopilot (Google/Yelp)

Hi {{ClientName}},

To start your 7-day free trial, please reply with the details below. If you prefer, you can email everything to **agent_bob_replit+review-bot@agentmail.to**.

**A) Business basics**
1) Business name:
2) Primary location address(es):
3) Website:
4) Primary phone:
5) Hours:

**B) Review profiles (links)**
6) Google Business Profile link(s):
7) Yelp business page link(s):

**C) Access / posting method (choose one per platform)**
8) Google: ( ) Add us as Manager to your Google Business Profile  ( ) We draft and you post
9) Yelp: ( ) Add us as Yelp Business Owner/Manager  ( ) We draft and you post

**D) Brand voice & style rules**
10) Voice: ( ) Friendly ( ) Professional ( ) Luxe ( ) Casual ( ) Other: ____
11) Must-use phrases (optional):
12) Never say / banned phrases:
13) Any sensitive topics to avoid (pricing, competitors, insurance, etc.):
14) Do you want to invite the reviewer back? (Y/N) If yes, preferred CTA:

**E) Approvals (human-in-the-loop)**
15) Auto-approve responses for 4–5★ reviews? (Y/N)
16) Require approval for all 1–3★ reviews? (recommended: Y)
17) Approver name + email + mobile (for urgent negatives):

**F) Escalation contacts & policy**
18) Best contact for negative reviews (owner/manager):
19) Escalation email + phone:
20) Do you want us to offer remediation? (e.g., “Please contact us at ___”) Provide preferred contact method:
21) Any legal/medical/compliance restrictions? (HIPAA, refunds, etc.)

**G) Weekly reporting**
22) Send weekly KPI report to (emails):
23) Preferred day/time: (Mon/Tue/Wed/Thu/Fri) + timezone

**H) Competitors (optional)**
24) Top 3 competitors (names or links) for benchmarking:

Once we have this, you’ll receive your first response drafts within 24 hours. You can also see our overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob

---

# 2) Escalation Ticket + SLA (internal + client-facing)

## Escalation SLA Policy (include in welcome email)
- **Severity 1 (Critical):** 1★ review alleging fraud, safety issue, discrimination, HIPAA/legal threat, chargeback threat, news/viral risk.
  - **Notify client:** within **2 hours** (business hours) / within **12 hours** (off-hours)
  - **Draft response:** within **6 hours** (business hours)
  - **Requires approval:** always
- **Severity 2 (High):** 1–2★ with specific service failure, staff complaint, refund request.
  - **Notify:** within **12 hours**
  - **Draft:** within **24 hours**
  - **Requires approval:** yes
- **Severity 3 (Normal):** 3★ mixed review, 4–5★ positive.
  - **Draft:** within **24 hours** (standard)
  - **Approval:** optional/auto-approve per onboarding settings

**Escalation rules (automatic):** If review contains keywords like “lawsuit”, “HIPAA”, “scam”, “fraud”, “unsafe”, “police”, “attorney”, “discrimination”, “refund”, “chargeback”, escalate to Severity 1/2.

## Escalation Ticket (copy/paste into email or spreadsheet)
**Ticket ID:** {{YYYYMMDD-###}}
**Client:** {{BusinessName}}
**Platform:** Google / Yelp
**Review URL:** {{link}}
**Reviewer name:** {{name}}
**Star rating:** 1 / 2 / 3 / 4 / 5
**Date/time posted:** {{timestamp}}

**Severity:** 1 / 2 / 3
**Keywords triggered (if any):** {{list}}

**Summary of complaint (1–2 sentences):**
{{summary}}

**Evidence / context from client:**
- Order/appointment ID:
- Staff involved:
- What happened (client notes):

**Proposed public response draft:**
{{draft}}

**Recommended next step:**
- ( ) Ask reviewer to contact {{phone/email}}
- ( ) Offer resolution (details):
- ( ) Request offline discussion only
- ( ) Do not respond publicly yet (needs legal)

**Client approval:** Pending / Approved / Changes requested
**Time approved:** {{timestamp}}
**Posted by:** Autopilot / Client
**Time posted:** {{timestamp}}

**Resolution tracking:**
- Follow-up completed? Y/N
- Outcome: Resolved / Unresolved / Reviewer updated rating / Reviewer removed post (rare)
- Notes:

---

# 3) Weekly KPI Report One-Pager (template + email text)

## Weekly Email (paste-ready)
**Subject:** Weekly Reputation KPI Report — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{ClientName}},

Here’s your weekly reputation snapshot for **{{BusinessName}}** across Google/Yelp.

**Top-line:**
- New reviews: {{new_reviews_total}} (Google {{g_new}}, Yelp {{y_new}})
- Avg rating (current): Google {{g_rating}} | Yelp {{y_rating}}
- Responses posted: {{responses_posted}} (Response rate: {{response_rate}}%)
- Median response time: {{median_response_time}}
- Negative reviews (1–2★): {{neg_count}} (Escalated: {{escalated_count}} | Resolved: {{resolved_count}})

**Themes we’re seeing:**
1) {{theme_1}}
2) {{theme_2}}
3) {{theme_3}}

**What we did this week:**
- Drafted/posted {{count}} brand-safe responses
- Escalated {{count}} reviews needing attention
- Updated response language to align with your voice guidelines

**Recommended actions for next week (highest impact):**
1) {{action_1}}
2) {{action_2}}
3) {{action_3}}

If you want to adjust tone/CTAs, reply here or email **agent_bob_replit+review-bot@agentmail.to**.

For reference, our service overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob

## Weekly KPI Report (one-page layout)
**Client:** {{BusinessName}}  
**Week:** {{WeekStart}}–{{WeekEnd}}  

### A) Review volume & rating
| Metric | Google | Yelp | Total |
|---|---:|---:|---:|
| New reviews | {{g_new}} | {{y_new}} | {{new_reviews_total}} |
| Avg rating (current) | {{g_rating}} | {{y_rating}} | — |
| Avg rating (prev week) | {{g_prev_rating}} | {{y_prev_rating}} | — |
| Rating trend | {{g_trend}} | {{y_trend}} | — |

### B) Responsiveness
| Metric | Value |
|---|---:|
| Responses posted | {{responses_posted}} |
| Response rate | {{response_rate}}% |
| Median response time | {{median_response_time}} |

### C) Negative review handling
| Metric | Value |
|---|---:|
| 1–2★ reviews | {{neg_count}} |
| Escalations created | {{escalated_count}} |
| Resolved/closed | {{resolved_count}} |
| Open escalations | {{open_escalations}} |

### D) Insights
- **Top positive driver:** {{pos_driver}}
- **Top complaint driver:** {{neg_driver}}
- **Suggested operational fix:** {{ops_fix}}

### E) Next-week plan
- {{next_step_1}}
- {{next_step_2}}
- {{next_step_3}}

---

# 4) 30-Day KPI Dashboard (pipeline + revenue + delivery)

## Revenue plan baseline (to reach ~$12k cash-in-month)
- Close **6 DFY Growth** deals (cash: $500 setup + $1,250 month 1 = **$1,750** each)
- Close **2 Agency Starter** deals (cash: $199 setup + $399 month 1 = **$598** each)
- Target **1 small add-on** to bridge remaining gap (e.g., SMS review-request setup)

## KPI Dashboard Table (copy into Google Sheet)

**Assumptions (edit cells):**
- Reply rate on outbound: **15%**
- Call book rate from replies: **35%**
- Show rate: **70%**
- Close rate on shows: **25%**

**Monthly targets (30 days):**
- Outbound leads: **1,270** (≈ **42/day**)
- Replies: **190** (≈ **6/day**)
- Calls booked: **66** (≈ **2.2/day**)
- Shows: **46** (≈ **1.5/day**)
- Closes: **8** (≈ **2/week**)

### Daily tracker columns
| Date | Leads sent | Replies | Calls booked | Shows | Closes | Cash collected today | MRR added | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|

### Weekly rollup columns
| Week | Leads | Replies | Booked | Shows | Closes | Cash-in-month to date | MRR to date | On-time response % | Median response time |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|

**Delivery KPIs (weekly):**
- Response rate target: **≥ 90%** of new reviews responded (where allowed)
- Median response time target: **≤ 24 hours** (Growth) / **≤ 12 hours** (Pro)
- Escalations created within SLA: **≥ 95%**

**Notes:** In week 1, posting can be (a) direct via Google Business Profile Manager access, or (b) “draft-and-send” where the client posts. Yelp commonly requires the draft-and-send workflow unless Business Owner access is granted; both are deliverable without any API work.
