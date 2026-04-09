# Brand Safety & Compliance Pack v3 — Checklist, Escalation Playbook, and Approved Templates (Dentist/Med Spa/HVAC) for Google Business Profile + Yelp

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:40:46.397Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Compliance Pack v3

Business website (for legitimacy in customer comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Operational)
Use for every drafted response (Google Business Profile + Yelp).

### A. Hard prohibitions (must NEVER appear)
1. **PHI/medical privacy confirmation**: Do not confirm the person is/was a patient or discuss treatment, appointment, records, chart, results, diagnosis, procedure, medications.
   - Block phrases: “your chart/records/visit/appointment”, “as your provider”, “we treated you for…”, “your results”.
2. **Liability admission / fault**: Do not admit wrongdoing, negligence, malpractice, or guarantee reimbursement.
   - Block phrases: “we were at fault”, “our mistake caused”, “we guarantee a refund”, “we broke/damaged”.
3. **Medical outcome guarantees (dentist/med spa)**: No guarantees or promises of outcomes.
   - Block phrases: “guaranteed results”, “100%”, “permanent”, “no risk”, “cure”.
4. **Incentives / solicitation / review gating**: No offering discounts, gifts, refunds in exchange for reviews; no directing only happy customers to review.
   - Block phrases: “discount for a review”, “free gift”, “we’ll make it right if you change/remove your review”.
5. **Doxxing / PII**: Do not include phone numbers of staff, personal emails, addresses beyond business address, or identifying details about reviewer.
6. **Threats, retaliation, harassment**: No arguing, shaming, or threatening legal action back.
7. **Competitor disparagement**: No negative statements about competitors; no comparison bait.
8. **Platform enforcement promises**: Don’t claim Yelp/Google will remove reviews or that you have special access.

### B. Required elements (must be present)
1. **Neutral, respectful tone** (no sarcasm, blame).
2. **Thank you + acknowledgement** (without confirming protected details).
3. **Offline resolution CTA**: invite direct contact via official channel.
4. **Minimalism**: keep it short; don’t litigate facts publicly.
5. **Safety mode for high-risk cases**: If legal threat, PHI allegations, discrimination claims, injury/safety incident—**manual-only hold** and escalate.

### C. Platform alignment checks
- **Google Business Profile**: keep professional; no private info; no “review removal” promises.
- **Yelp**: same, plus avoid public back-and-forth; do not encourage review manipulation; keep response factual and brief.

### D. “Manual-only hold” triggers (DO NOT POST automatically)
If review contains any of:
- “lawyer/attorney/lawsuit/sue/court” (legal threats)
- Mentions of **injury**, “unsafe”, “fire”, “gas leak”, “electrocution”, “infection”, “complication”
- PHI/medical specifics, appointment dates, named clinician + treatment details
- Discrimination/harassment allegations (protected class)
- Requests to delete review in exchange for something
Action: mark `post_status = blocked_manual_review`, set `escalation_level` (Legal/Safety/Privacy), and require human approval.

## 2) Escalation Playbook v3 (Common Scenarios)
Each scenario includes: response stance + routing + evidence.

### 2.1 Billing / pricing dispute
**Public response goal**: acknowledge + invite offline resolution; no arguing line items.
- Route: Billing lead (SLA <24h)
- Evidence: invoice, signed estimate, call notes, payment records
- Do not: publish itemized charges unless already public and verified

### 2.2 Service quality / rudeness / wait time
**Goal**: apologize for experience (not fault), commit to learn, offline CTA.
- Route: Ops/GM (SLA <24h)
- Evidence: schedules, staffing notes, service ticket

### 2.3 Alleged damage/injury/safety incident (HVAC or clinical)
**Manual-only hold**.
- Route: Owner/GM + Safety (SLA <4h). If bodily injury claim, notify legal same-day.
- Evidence: photos, work order, technician notes, incident report
- Do not: accept blame or offer compensation publicly

### 2.4 PHI/HIPAA / privacy mention (Dentist/Med Spa)
**Manual-only hold** if any medical specifics or “my appointment/records”.
- Route: Privacy officer/Owner (SLA same-day)
- Evidence: internal communications, consent forms (do not reference publicly)
- Public response may be allowed only if generic and non-confirming

### 2.5 Discrimination / harassment allegations
**Manual-only hold**.
- Route: Owner/HR/Legal (SLA same-day)
- Evidence: CCTV if available, staff statements, policies
- Public response: neutral, invite offline contact; never debate protected-class facts online

### 2.6 Suspected fake review / not a customer
Public response is allowed but must be careful.
- Route: Ops/Owner (SLA <24h)
- Evidence: customer roster, job records
- Do not: accuse reviewer of lying; do not reveal customer records

### 2.7 Legal threats
**Manual-only hold always**.
- Route: Legal same-day
- Public response: typically none; if posted, extremely generic with offline CTA

## 3) Approved Response Templates v3 (Paste-ready)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail} (use agent_bob_replit+review-bot@agentmail.to), {Phone} (business main line only), {Location} (city/neighborhood only), {Team} (e.g., “team”).
- Never insert: reviewer name (unless already public and customer-approved), appointment dates, clinician names, treatment details, prices unless verified and non-sensitive.
- Always include offline CTA.

### 3.1 Dentist templates (Google/Yelp)
**D1 Positive (all platforms)**
“Thank you for the kind words. We’re glad you had a great experience with our team at {BusinessName}. If there’s anything we can do to support you in the future, please reach us at {SupportEmail}.”

**D2 Neutral/short praise**
“Thanks for taking the time to leave a review. We appreciate the feedback and will share it with our team. If there’s anything we can improve, please contact us at {SupportEmail}.”

**D3 Mild negative (wait time, front desk, communication)**
“Thank you for the feedback. We’re sorry your experience didn’t meet expectations. We take service concerns seriously and would like to learn more—please email us at {SupportEmail} so we can follow up offline.”

**D4 Strong negative (but no PHI specifics present)**
“We’re sorry to hear you’re unhappy. We can’t address details here, but we’d like the chance to understand what happened and help resolve it. Please contact {BusinessName} at {SupportEmail}.”

**D5 PHI/appointment mentioned (AUTO = manual-only hold; if human chooses to post, use this)**
“Thank you for your message. To protect everyone’s privacy, we can’t discuss anything related to care or visits here. Please contact our office directly at {SupportEmail} so we can assist you offline.”

**D6 Suspected fake/not a patient**
“Thanks for writing. We take feedback seriously, but we’re unable to match this experience to our records based on the details provided. If you believe this review is intended for {BusinessName}, please contact us at {SupportEmail} so we can look into it.”

### 3.2 Med Spa templates (Google/Yelp)
**M1 Positive**
“Thank you for the review. We’re happy you enjoyed your experience with {BusinessName}. If you ever have questions or need support, reach us at {SupportEmail}.”

**M2 Compliment for staff (no names back)**
“Thank you for sharing your feedback. We’ll make sure the team sees your kind note. If there’s anything we can do for you, please contact {SupportEmail}.”

**M3 Concern about results (NO guarantees)**
“Thank you for your feedback. We’re sorry to hear you’re disappointed. We’d like to learn more and see how we can help—please email {SupportEmail} so we can follow up privately.”

**M4 Safety/cleanliness concern (if no injury claim)**
“Thank you for raising this. We take cleanliness and client experience seriously and want to address your concerns. Please contact us at {SupportEmail} so we can follow up offline.”

**M5 PHI/medical details mentioned (AUTO hold; if posted, generic)**
“To protect privacy, we can’t discuss any visit-related details here. Please reach our team at {SupportEmail} so we can assist you privately.”

**M6 Suspected fake / competitor bait**
“Thanks for your comment. We strive to keep discussions respectful and accurate. If you had an experience with {BusinessName}, please email {SupportEmail} so we can look into it offline.”

### 3.3 HVAC templates (Google/Yelp)
**H1 Positive**
“Thank you for the review. We’re glad our team could help. If you need anything else, contact {BusinessName} at {SupportEmail}.”

**H2 On-time/professionalism praise**
“Thanks for taking the time to share this. We appreciate the feedback and will pass it along to the team. For future service, reach us anytime at {SupportEmail}.”

**H3 Mild negative (lateness, communication)**
“Thank you for the feedback. We’re sorry for the inconvenience and we want to improve. Please contact us at {SupportEmail} so we can review what happened and follow up offline.”

**H4 Alleged damage (AUTO hold; if human posts, non-admission)**
“Thank you for letting us know. We take concerns like this seriously. We can’t address details here, but we’d like to review this with you—please contact {BusinessName} at {SupportEmail} so we can follow up offline.”

**H5 Safety concern (gas leak, fire, injury) (AUTO hold; generally avoid posting)**
“Thank you for your message. We take safety concerns seriously and want to address this promptly. Please contact {BusinessName} directly at {SupportEmail} so we can follow up immediately offline.”

**H6 Suspected fake / not in job system**
“Thanks for writing. We’re unable to match this to a completed job based on the information provided. Please email {SupportEmail} with your service address and date (privately) so we can look into it.”

## 4) Google/Yelp policy alignment (testable requirements)
1. No incentives, discounts, or compensation offered for reviews.
2. No review gating (“if you’re happy leave a review”).
3. No promises to remove reviews or claims of platform influence.
4. No disclosure/confirmation of medical status/visits; no PHI.
5. No personal data about reviewer or staff.
6. No arguments; keep it brief; invite offline resolution.

## 5) Implementation notes (for engineering/ops)
- Enforce safety in two gates: **pre-generation** (detectors choose template/safe mode) and **pre-post** (block_manual_review cannot be overridden without logged human approval).
- Required logs for audit: review_source, review_id, review_text_hash, risk_flags, escalation_level, response_mode (auto/manual-only), draft_version, approver_id, timestamps, post_status, final_response_text, detector_version.

This pack is ready to hand to engineering/ops to implement hard blocks, human-hold flows, and policy-safe response generation across Google Business Profile and Yelp.