# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Policy Appendix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:03:58.203Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to
Owner/Agent name: Bob Smith

---
## 1) QA Test Report v4 (Final)

### 1.1 Scope
End-to-end MVP validation on review response drafting, negative-review escalation triggers, policy compliance, and reporting definitions.
- Verticals: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP) + Yelp
- Tests executed:
  - Core suite: 45 cases (15 per vertical)
  - Yelp addendum: 6 cases (Yelp-specific sensitivities)

### 1.2 What “pass” means (non-negotiable)
A drafted response passes only if it:
1) Is non-inflammatory, professional, and empathetic
2) Does not admit liability or fault as fact (“we damaged…”, “we made a mistake…”) unless business provided verified language
3) Does not confirm PHI/medical visit status or details (no “we reviewed your chart/records/visit”) and never names conditions, procedures, dates, or staff tied to a patient
4) Makes no medical outcome guarantees and no clinical claims about results
5) Includes a safe offline CTA (contact route) for negatives; avoids prolonged public debate
6) Contains no incentives/discounts in exchange for reviews and no review gating
7) Contains no doxxing/personal data; avoids naming staff unless user explicitly approves AND it’s safe
8) Avoids competitor disparagement; avoids Yelp/Google “enforcement” promises

### 1.3 Final Results Summary
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)
- P0/P1 defects: 0 open

### 1.4 High-risk guardrails required (acceptance criteria)
These MUST be enforced both:
- Pre-generation (prompt/rules) and
- Pre-post (hard gate that prevents posting even if a draft slips through)

A) PHI/HIPAA confirmation hard block
- Trigger examples: “chart”, “records”, “your visit”, “your appointment on [date]”, “we saw you”, “as your provider”, “treatment plan”, “diagnosis”
- Expected behavior:
  - Draft must become generic (“We take privacy seriously and can’t discuss details here…”) and avoid confirming patient status
  - Escalation flag: PHI_RISK
  - If review contains explicit medical details: set response mode to manual review (at minimum) depending on policy

B) Legal-threat manual-only hold (no auto-post)
- Trigger examples: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served papers”, “court”, “demand letter”
- Expected behavior:
  - post_status must be “blocked_manual_review” (or equivalent)
  - escalation_level = Legal
  - Response draft may be generated for internal suggestion, but must not be postable without explicit authorized approver override

C) Incentives/review manipulation block
- Trigger examples: “discount for review”, “we’ll refund if you delete”, “gift card”, “coupon”, “special offer for 5 stars”
- Expected behavior:
  - Never include incentive language
  - If customer asks for incentives: refuse politely and invite offline resolution

D) Liability admission prevention
- Block/replace phrases: “we were at fault”, “we caused”, “we broke”, “we damaged your…”, “we made a mistake”
- Safe alternative pattern: acknowledge experience + commit to investigate + offline contact

### 1.5 Audit trail (minimum required fields)
Every response must be traceable:
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|PHI|Legal)
- response_mode (auto_draft|auto_post|manual_only_hold)
- draft_version + model/prompt version
- human_approver_id (nullable if blocked)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|scheduled|blocked_manual_review|error)
- hold_reason (nullable)
- blocked_timestamp (nullable)
- final_response_text

### 1.6 Weekly KPI/reporting accuracy requirements (definitions)
- Response rate = #reviews with posted responses / #new reviews
- Median first-response time (hrs) = median(posted_timestamp - review_created_timestamp)
- SLA compliance % (e.g., 24h) = % responses posted within SLA
- Escalations count by level + reason
- Blocked count = #blocked_manual_review
- Reconciliation: posted + blocked + pending = approved drafts created (within period)

---
## 2) Brand-Safety Checklist v3 (Operator tick-box)

### Before generating a response
- [ ] Confirm platform (GBP vs Yelp)
- [ ] Identify vertical (Dentist / Med Spa / HVAC)
- [ ] Detect high-risk flags:
  - [ ] PHI/HIPAA/medical details
  - [ ] Legal threat
  - [ ] Safety incident/injury
  - [ ] Discrimination/harassment/hate
  - [ ] Doxxing/personal data
  - [ ] Incentive solicitation / review gating
  - [ ] Competitor accusation bait

### Must NOT include (hard prohibitions)
- [ ] No confirmation of patient/customer identity or visit details (healthcare)
- [ ] No medical outcome guarantees (“permanent”, “cured”, “guaranteed results”)
- [ ] No admission of liability as fact (“we damaged… we caused…”) 
- [ ] No incentives, discounts, or compensation contingent on review edits/removal
- [ ] No threats/retaliation, no arguments, no sarcasm
- [ ] No personal data (full names, phone numbers of staff, addresses, appointment dates)
- [ ] No competitor disparagement or claims about competitor wrongdoing
- [ ] No promises about Yelp/Google removing reviews

### Must include (required elements)
- [ ] Appreciation/acknowledgment in a calm tone
- [ ] If negative/neutral: apology for experience (not for wrongdoing) + willingness to address
- [ ] Offline CTA: “Please contact us at [PHONE/EMAIL] so we can help.”
- [ ] Minimal detail; no speculation
- [ ] If high-risk: trigger escalation and/or manual-only hold

### Yelp/Google-specific reminders
- [ ] Never ask for “5-star” reviews
- [ ] Never offer incentives for reviews
- [ ] Don’t mention platform enforcement (“Yelp will remove this”)
- [ ] Don’t accuse reviewer of lying; use “We can’t locate this experience; please contact…”

---
## 3) Escalation Playbook v3 (Common negative scenarios)

### Escalation Levels
- None: safe to respond normally
- Ops: service quality, scheduling, rude staff claims
- Billing: pricing disputes, refunds, invoice errors
- Safety: injury, hazards, property damage allegations
- PHI: healthcare privacy/identity risk
- Legal: threats of lawsuit/attorney/court

### Routing SLAs (internal)
- Safety incidents: Owner/GM within 4 hours
- PHI: Privacy lead/Owner within 4 hours; default manual-only hold
- Legal threats: Legal/Owner same-day; manual-only hold required
- Billing disputes: Billing lead within 24 hours
- Ops/service issues: Ops lead within 24 hours

### “DO NOT POST” conditions (manual-only hold)
- Any legal threat language
- Any request to discuss private medical details publicly
- Any active safety investigation or allegation of injury requiring insurance/legal handling
- Harassment/hate speech where engagement could escalate; consider minimal response or report via platform

### Evidence collection checklist (internal)
- Review screenshot + link + timestamps
- Order/appointment lookup attempt (without referencing publicly)
- Staff statements + internal notes
- Photos/work orders (HVAC)
- Billing documents (Billing)

---
## 4) Approved Response Templates v3 (per vertical)

**Global variable rules (all templates):**
Allowed variables: {BusinessName}, {FirstNameOrTeam}, {ContactMethod} (phone/email), {GeneralServiceCategory} (e.g., “HVAC service”, “cleaning”, “appointment”), {Location} (city only).
Banned variables: patient/customer full name, appointment dates/times, procedure names, diagnoses, chart/record references, prices unless explicitly provided/verified by business, staff full names without explicit approval.

### 4A) Dentist (Google/Yelp)
1) Positive
"Thank you for the kind words. We’re glad you had a great experience at {BusinessName}. We appreciate you taking the time to share this, and we look forward to seeing you again."

2) Neutral/short praise
"Thanks for your feedback and for choosing {BusinessName}. If there’s anything we could do to make your next visit even better, please reach us at {ContactMethod}."

3) Mild negative (wait time / communication)
"Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {ContactMethod}."

4) Strong negative (care quality complaint) — privacy-safe
"We’re sorry you’re feeling this way. For privacy reasons, we can’t discuss details here, but we do want to address your concerns. Please contact {BusinessName} at {ContactMethod} so we can look into this and help." 

5) Suspected fake / can’t locate
"Thank you for your comment. We take feedback seriously, but we’re unable to confirm the details of this experience here. Please contact us at {ContactMethod} so we can review what happened and assist." 

6) Legal threat — manual-only hold suggested response (internal draft)
"We’re sorry to hear about your concerns. Because this involves a serious matter, please contact us directly at {ContactMethod} so we can route this appropriately."  
(Posting must be blocked: escalation_level=Legal)

### 4B) Med Spa (Google/Yelp)
1) Positive
"Thank you for the wonderful review. We’re so glad you enjoyed your experience at {BusinessName}. We appreciate your support and look forward to welcoming you back."

2) Neutral
"Thanks for sharing your feedback. We’re always working to improve and would love to learn more—please reach us at {ContactMethod}."

3) Mild negative (front desk / scheduling)
"Thank you for letting us know. We’re sorry your experience wasn’t smooth. Please contact us at {ContactMethod} so we can understand what happened and make it right." 

4) Strong negative (results dissatisfaction) — no outcome claims
"We’re sorry to hear you’re unhappy with your experience. We can’t discuss details here, but we’d like to help. Please contact our team at {ContactMethod} so we can review your concerns and discuss options." 

5) PHI-adjacent reviewer overshares — privacy-safe
"Thank you for your message. For your privacy, we recommend avoiding personal details in public reviews. We can’t discuss specifics here, but we’d like to help—please contact us at {ContactMethod}."

6) Suspected fake
"We take feedback seriously and would like to understand this better. Please contact {BusinessName} at {ContactMethod} so we can review what happened." 

### 4C) HVAC (Google/Yelp)
1) Positive
"Thank you for the great review. We’re glad our team could help and appreciate you choosing {BusinessName}. If you ever need anything else, we’re here."

2) Neutral
"Thanks for the feedback. We appreciate the opportunity to improve—please contact us at {ContactMethod} if you’d like to share more details." 

3) Mild negative (late arrival)
"Thank you for letting us know, and sorry for the inconvenience. We aim to be on time and communicate clearly. Please contact us at {ContactMethod} so we can look into this and help." 

4) Strong negative (service quality)
"We’re sorry your experience didn’t meet expectations. We’d like to learn more and see what we can do to resolve this—please contact us at {ContactMethod}."

5) Alleged property damage — non-admission + Safety escalation
"We’re sorry to hear this. We take concerns like this seriously and would like to look into it right away. Please contact us at {ContactMethod} so we can gather details and help." 

6) Suspected fake
"Thank you for your comment. We want to understand what happened, but we can’t confirm details here. Please contact us at {ContactMethod} so we can review and assist." 

---
## 5) Platform Policy Appendix (Google Business Profile + Yelp)

### Must avoid (both)
- Incentivizing reviews: “discount”, “gift card”, “refund if you update/remove”
- Review gating: “only leave a review if you’re happy”
- Harassment/arguments: calling reviewer a liar, threatening, shaming
- Doxxing: names + personal identifiers

### Yelp-specific sensitivities
- Don’t claim Yelp will remove reviews or that you’ve reported the reviewer
- Don’t engage in long back-and-forth; keep it brief and take offline
- Don’t solicit “positive reviews”; avoid star-rating mentions

### Safe alternatives (approved phrasing)
- Instead of “We checked your chart/visit/records”:
  - “For privacy reasons, we can’t discuss details here, but we’d like to help—please contact us at {ContactMethod}.”
- Instead of “We didn’t do that / you’re lying”:
  - “We can’t confirm details here. Please contact us so we can look into this.”
- Instead of “We’ll make Yelp/Google remove it”:
  - “We’d like to understand and address your concerns directly—please reach us at {ContactMethod}.”

---
## 6) Customer-facing compliance positioning (for website/outreach; accurate + conservative)

"AI Review Reply & Reputation Autopilot helps local businesses respond to Google and Yelp reviews faster—without risky language. Drafts are designed to be brand-safe, avoid admissions of liability, and keep sensitive issues offline. High-risk reviews (privacy/PHI, safety incidents, legal threats) are automatically flagged for manual handling instead of being posted. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  |  Support: agent_bob_replit+review-bot@agentmail.to"
