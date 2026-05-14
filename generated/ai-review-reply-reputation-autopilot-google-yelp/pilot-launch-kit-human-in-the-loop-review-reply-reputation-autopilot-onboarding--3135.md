# Pilot Launch Kit — Human-in-the-Loop Review Reply & Reputation Autopilot (Onboarding + Ops SOP + Email Templates + Weekly KPIs)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:29:33.935Z

---

# Pilot Launch Kit — AI Review Reply & Reputation Autopilot (Google/Yelp)

## 1) What the pilot is (customer-facing)
**Offer:** Free 7-day “Review Reply Autopilot” trial. We draft brand-safe replies to new Google/Yelp reviews, you approve (1-click) and post. Negative reviews are escalated fast with recommended actions. You get a weekly KPI email.

**Legitimacy links:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

**What you need to do:** forward your Google Business Profile and/or Yelp review notification emails to our dedicated inbox. That’s it.

---

## 2) Internal Ops SOP (human-in-the-loop delivery)
### SLA targets (recommended defaults)
- **New review triage:** within 2 business hours
- **Draft delivered for approval:** within 6 business hours
- **Escalation:** immediate if <3 stars, negative sentiment, or keywords (refund, lawsuit, lawyer, HIPAA/health, unsafe, discrimination, scam, fraud)

### Daily workflow
1. **Ingest**: Review notification arrives (forwarded) to agent_bob_replit+review-bot@agentmail.to.
2. **Identify client + location**: Use subject/from + forwarding alias rules; if unclear, reply asking which location this review belongs to.
3. **Extract fields** (manual OK): platform (Google/Yelp), star rating, reviewer name, review text, location.
4. **Sentiment + risk tag**:
   - Positive: 4–5 stars and/or positive language.
   - Neutral: 3 stars or mixed.
   - Negative: 1–2 stars or negative language.
   - **Escalate if**: <3 stars OR keywords OR explicit safety/legal/health allegations.
5. **Draft reply** using brand voice guardrails:
   - No private info, no admissions of fault, no discounts promised publicly, no arguing.
   - Invite offline resolution for negative reviews.
   - Keep concise, warm, specific.
6. **Send approval** email to client contact(s) with:
   - Draft text
   - “Approve / Request edit / Reject” reply instructions
   - Link-out instructions for posting (platform link or “copy/paste steps”)
7. **Log** status: `Received → Drafted → Sent for approval → Approved/Edits requested/Rejected → Posted (confirmed)`.
8. **Escalations**: If triggered, send escalation email + (optional) SMS later (Phase 2). For now email-only.
9. **SLA reminders**: If no approval within X hours, send reminder.
10. **Weekly KPI report**: Every Monday morning, email KPIs per location + overall.

### Multi-location rules
- Every review must be tagged with **Client** + **Location**.
- If a client has multiple locations, drafts must reference the right location name (if provided) but avoid over-specific claims.

---

## 3) Pilot Intake Form (copy/paste fields)
Create as Google Form or embed on the site.
**Title:** Review Reply Autopilot — Pilot Intake

**Fields:**
1. Business name
2. Website URL
3. Primary contact name
4. Primary contact email
5. Phone (optional)
6. Platforms: (checkbox) Google Business Profile / Yelp / Other
7. Number of locations
8. Locations (repeatable section):
   - Location name (e.g., “Downtown”)
   - Address
   - Google Maps link (optional)
   - Yelp page link (optional)
   - Posting responsibility (who will post after approval?)
9. Brand voice (pick one): Friendly & casual / Professional & concise / Luxury & polished / Other (text)
10. Words/phrases to avoid (text)
11. “Always include” info (text) (e.g., phone number, booking link)
12. Escalation contacts (emails) for negative reviews
13. SLA preference: Draft within 6h / 12h / 24h
14. Approval method: Email reply approval / Simple approve link (later)
15. Confirmation checkbox: “I can forward review notification emails to agent_bob_replit+review-bot@agentmail.to”

---

## 4) Customer Onboarding Email (send after intake)
**Subject:** Your Review Reply Autopilot trial — forwarding setup (5 minutes)

Hi {{Name}},

Thanks for starting the free 7‑day Review Reply Autopilot trial. Here’s the whole workflow:
1) You forward new review notification emails to: **agent_bob_replit+review-bot@agentmail.to**
2) We draft a brand-safe reply and email it to you for approval
3) You approve (or request edits)
4) You post the approved reply on Google/Yelp (we’ll include copy/paste text + link-out instructions)
5) Negative reviews get escalated immediately + we send weekly KPI reporting

About us / legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Forwarding setup (Google Business Profile)
- In Gmail, open a Google review notification email
- Click the 3-dot menu → **Forward** → send to **agent_bob_replit+review-bot@agentmail.to**
- Then create a filter so future review emails auto-forward:
  - Gmail Settings → Filters → Create new filter
  - Use keywords like: “You have a new review” or sender patterns used by Google notifications
  - Choose **Forward it to** agent_bob_replit+review-bot@agentmail.to

### Forwarding setup (Yelp)
- Open a Yelp review notification email
- Forward it to **agent_bob_replit+review-bot@agentmail.to**
- Create an auto-forward rule using Yelp sender/subject patterns

Reply to this email with:
- The best email(s) for approvals
- Any “do not say” phrases or compliance notes
- Confirm your primary location name(s) to tag reviews correctly

If you want, forward one recent review email now and we’ll do a same-day test draft.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 5) Approval Email Template (what we send for each review)
**Subject:** Draft reply ready ({{Platform}} | {{Stars}}★ | {{Location}}) — approval needed

Hi {{Name}},

New review received for **{{Location}}** on **{{Platform}}**.

**Reviewer:** {{ReviewerName}}
**Rating:** {{Stars}}★
**Review:**
“{{ReviewText}}”

### Recommended reply (copy/paste)
{{DraftReply}}

### Approve / edit / reject (reply to this email)
- Reply with **APPROVE** to approve as-is
- Reply with **EDIT:** and the changes you want
- Reply with **REJECT** if you don’t want to respond

**Posting instructions:**
- {{Platform}}: {{LinkOutInstructionsOrURL}}

About us: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
Bob (Review Reply Autopilot)
agent_bob_replit+review-bot@agentmail.to

---

## 6) Escalation Email Template (negative/risky reviews)
**Subject:** Escalation: negative/risky review ({{Platform}} | {{Stars}}★ | {{Location}}) — action recommended

Hi {{Name}},

We flagged a review for **{{Location}}** as needing escalation.

**Reason(s):** {{EscalationReasons}}  
**Rating:** {{Stars}}★  
**Review:** “{{ReviewText}}”

### Draft public reply (safe + de-escalating)
{{DraftReply}}

### Recommended private next step (not public)
{{RecommendedActionPlan}}

Reply **APPROVE** to proceed with this public reply, or **EDIT:** with changes.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) SLA Reminder Template
**Subject:** Reminder: review reply awaiting approval ({{Platform}} | {{Location}})

Hi {{Name}},

Quick reminder: we have a draft reply waiting for approval for **{{Location}}**.

Reply **APPROVE** to post, or **EDIT:** with changes. If you prefer no response, reply **REJECT**.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 8) Weekly KPI Report Email Template (multi-location)
**Subject:** Weekly Reputation KPI Report — {{BusinessName}} ({{DateRange}})

Hi {{Name}},

Here’s your weekly reputation snapshot for {{DateRange}}.

## Overall
- New reviews received: {{TotalReviews}}
- Average rating (this week): {{AvgRatingWeek}}
- Average rating (prior week): {{AvgRatingPrior}} (Δ {{Delta}})
- % negative (≤2★): {{NegativeShare}}%
- Median time to first draft: {{MedianDraftTime}}
- Median time to approved response: {{MedianApprovalTime}}
- Responses posted (confirmed): {{PostedCount}} / {{TotalReviews}}
- Escalations triggered: {{EscalationCount}}

## By location
{{LocationTable}}

## Notes / opportunities
- {{Insight1}}
- {{Insight2}}

If you want, reply with your booking link and we’ll incorporate it into positive-review replies going forward.

About us: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 9) Internal Logging (minimum viable, sheet-friendly)
Use a Google Sheet with columns:
- Timestamp received
- Client
- Location
- Platform
- Stars
- Reviewer name
- Review text
- Sentiment (pos/neutral/neg)
- Escalation? (Y/N)
- Draft sent timestamp
- Approval status (pending/approved/edit/rejected)
- Approved timestamp
- Posted? (Y/N/unknown)
- Posted timestamp
- Notes

This supports KPI reporting even without a fully built dashboard.
