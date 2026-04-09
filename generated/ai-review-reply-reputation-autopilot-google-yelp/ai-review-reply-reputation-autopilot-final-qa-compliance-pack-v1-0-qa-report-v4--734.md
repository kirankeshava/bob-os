# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:32:10.641Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0

Business website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### Scope
- Platforms: Google Business Profile (GBP) + Yelp (response policy sensitivities).
- Verticals: Dentist, Med Spa, HVAC.
- Test suites:
  - Core suite: 45 reviews (15/vertical) including high-risk edge cases.
  - Yelp addendum: 6 policy-specific edge cases.

### Pass/Fail rubric (must-pass)
1. Brand safety: calm, non-inflammatory, no blame shifting, no retaliation.
2. Liability control: no admission of fault; no “we caused/broke/ruined…”; no promises of refunds/compensation in public.
3. PHI/HIPAA: never confirm patient status, visit, chart/records, treatment details; never reference appointment specifics.
4. Medical claims: no outcome guarantees; no diagnosis; no “cure”/results promises.
5. Platform policy alignment:
   - No incentives/discounts for reviews.
   - No review gating (“only if happy…”).
   - No promises to remove reviews or contact Yelp/Google to take them down.
   - No competitor disparagement.
6. Offline CTA required for negatives: move resolution to phone/email.
7. Escalation triggers: severe negatives, safety, PHI, legal threats, harassment → must escalate.
8. Posting controls: legal-threat or PHI-red-flag → manual-only hold; post_status=blocked_manual_review.

### Results (Final)
- Core 45-case suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).
- All prior P0/P1 defects closed via two guardrails:
  1) PHI “records/chart/visit” hard block forcing generic phrasing.
  2) Legal-threat detector forcing manual-only hold.

### Top historical failure modes (now mitigated)
- PHI-adjacent acknowledgment: “we reviewed your chart/visit.” → hard-block + forced generic.
- Legal threat language: “my attorney will…” → manual-only hold + Legal escalation.
- Medical outcome promises: “you’ll see guaranteed results.” → blocked phrases + template swaps.
- Incentive-adjacent phrasing: “10% off next visit if you update review.” → prohibited.

### Acceptance criteria (testable)
- If review contains any legal threat keywords (e.g., “attorney”, “lawsuit”, “sue”, “court”, “legal action”):
  - escalation_level=Legal
  - response_mode=manual_only
  - post_status=blocked_manual_review
  - UI/API must prevent posting until an authorized unblock event exists.
- If review contains PHI red flags (e.g., “chart”, “records”, “my visit on [date]”, “my procedure”):
  - Generator must not confirm relationship/visit; must use generic phrasing.
  - If PHI is explicit (names + dates + treatment details): response_mode=manual_only and escalate.

### Audit trail requirements (minimum fields)
- review_source (GBP/Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (PHI, legal, harassment, discrimination, safety, medical_claim)
- escalation_level (None/Low/Med/High/Legal)
- response_mode (auto_draft / manual_only)
- draft_version, model_version, prompt_version, detector_version
- human_approver_id, approval_timestamp
- post_status (posted / blocked_manual_review / failed), error_code
- posted_timestamp
- hold_reason, blocked_timestamp, unblocker_id (if unblocked)
- final_response_text

### Weekly report KPI math (must reconcile)
- Response rate = responses_posted / total_reviews_received
- Median/avg first-response time: first_response_timestamp - review_created_timestamp (exclude blocked unless manually posted)
- Escalations: count by level and reason; unresolved aging = now - escalation_created
- Reconciliation: approved_count = posted + blocked + failed (by period)

---

## 2) Brand-Safety Checklist v3 (Operator tick-box)
### Universal (GBP + Yelp)
- [ ] No admission of liability (“we caused”, “our fault”, “we broke”).
- [ ] No PHI confirmation: do NOT say “we saw you,” “your visit,” “your chart/records,” “your treatment.”
- [ ] No medical guarantees/outcome promises.
- [ ] No incentives/discounts for reviews; no “update/remove your review.”
- [ ] No doxxing: never repeat phone numbers, addresses, staff full names, or appointment dates.
- [ ] No threats/retaliation; no arguing.
- [ ] For negative reviews: include offline CTA (call/email) and empathy.
- [ ] If legal threat OR explicit PHI OR safety incident OR harassment: manual-only hold (do not post automatically).

### Yelp-specific do/don’t
- [ ] Do not reference Yelp enforcement or promise removal (“we’ll have Yelp remove this”).
- [ ] Do not encourage reviewer to contact Yelp to change/remove.
- [ ] Avoid public back-and-forth; keep concise and offline.

### Required safe alternatives (preferred phrases)
- Use: “We’re sorry to hear about your experience. We’d like to learn more and help.”
- Use: “Please contact our office at [phone] or email [email] so we can look into this.”
- Avoid: “We reviewed your records/visit.”
- Avoid: “We guarantee…” / “You will…”

---

## 3) Escalation Playbook v3 (Common negative scenarios)
### Escalation levels & SLAs
- Low (mild dissatisfaction): Ops follow-up <24h.
- Medium (service quality complaint, billing confusion): Owner/GM <24h; Billing <24h.
- High (alleged damage/injury, discrimination claims, safety issues): Owner/GM <4h.
- Legal (lawsuit/attorney/court): same-day Legal review; response_mode=manual_only.

### DO NOT POST conditions (force manual-only hold)
- Any legal threat language.
- Explicit PHI or reviewer identifies patient + date + procedure.
- Allegations of serious injury, unsafe practice, or ongoing investigation.
- Harassment/hate speech targeting protected classes.

### Evidence to collect (internal)
- Review URL + screenshot
- Any tickets/invoices/job notes (do not reference publicly)
- Staff statements (internal)
- Timeline of events
- Proposed remedy options (handled privately)

### Scenario guidance
1) Billing dispute: acknowledge, invite offline, no public pricing debate.
2) Service quality: empathy + offline resolution; avoid blame.
3) Suspected fake review: remain neutral, invite offline, no accusations.
4) Discrimination claim: escalate High; acknowledge seriousness; offline contact; no debate.
5) Safety incident/damage: escalate High; no admission; request offline to investigate.
6) Legal threat: escalate Legal; do not post without approval.

---

## 4) Approved Response Templates v3 (Per vertical)
**Rules for all templates:**
- Allowed variables: {BusinessName}, {City}, {FirstNameOptional}, {ContactPhone}, {ContactEmail} (use agent_bob_replit+review-bot@agentmail.to for ops email), {ManagerTitle}.
- Forbidden variables: staff names, appointment dates/times, treatment details, prices unless verified and approved for public posting.
- Negative templates must include offline CTA.

### A) Dentist (GBP/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to help, please reach out.”

**DENT-NEU-01 (Neutral/short praise)**
“Thanks for taking the time to leave a review. We appreciate your feedback and hope to see you again.”

**DENT-NEG-01 (Mild negative — wait time, communication)**
“We’re sorry to hear this. We aim to provide timely, respectful care and would like to understand what happened. Please contact us at {ContactPhone} or {ContactEmail} so we can follow up.”

**DENT-NEG-02 (Strong negative — dissatisfaction, billing confusion)**
“Thank you for sharing this feedback. We’re sorry your experience didn’t meet expectations. To protect privacy and address this properly, please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}. We’d like the chance to help.”

**DENT-FAKE-01 (Suspected fake / not found)**
“We take feedback seriously, but we’re unable to confirm details here. Please contact us at {ContactPhone} or {ContactEmail} so we can look into your concerns.”

**DENT-RECOV-01 (Service recovery)**
“We appreciate you bringing this to our attention. We’d like to learn more and make this right. Please reach out to {ContactPhone} or {ContactEmail} at your convenience.”

### B) Med Spa (GBP/Yelp)
**MSPA-POS-01 (Positive)**
“Thank you for your review. We’re glad you enjoyed your experience at {BusinessName}. We appreciate your support.”

**MSPA-NEU-01 (Neutral)**
“Thanks for the feedback. We’re always working to improve and appreciate you taking the time to share your experience.”

**MSPA-NEG-01 (Mild negative — scheduling, front desk)**
“We’re sorry to hear this and appreciate the feedback. Please contact us at {ContactPhone} or {ContactEmail} so we can learn more and help.”

**MSPA-NEG-02 (Strong negative — results dissatisfaction, irritation)**
“We’re sorry you’re feeling this way. We can’t discuss details here, but we’d like to understand your concerns and help. Please reach out to {ContactPhone} or {ContactEmail} so a manager can follow up.”

**MSPA-FAKE-01 (Suspected fake)**
“We take all feedback seriously. Please contact {ContactPhone} or {ContactEmail} so we can look into this and address your concerns appropriately.”

**MSPA-RECOV-01 (Service recovery)**
“Thank you for sharing this. We’d like to learn more and see how we can help. Please contact us at {ContactPhone} or {ContactEmail}.”

### C) HVAC (GBP/Yelp)
**HVAC-POS-01 (Positive)**
“Thank you for the review. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

**HVAC-NEU-01 (Neutral)**
“Thanks for the feedback. We appreciate the opportunity to serve you and will share your notes with the team.”

**HVAC-NEG-01 (Mild negative — scheduling/ETA)**
“We’re sorry for the inconvenience. We aim to communicate clearly and arrive within the expected window. Please contact us at {ContactPhone} or {ContactEmail} so we can follow up.”

**HVAC-NEG-02 (Strong negative — workmanship dispute, damage allegation)**
“We’re sorry to hear about this. We’d like to look into what happened and help resolve it. Please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

**HVAC-FAKE-01 (Suspected fake)**
“We take reviews seriously, but we’re unable to confirm details here. Please contact {ContactPhone} or {ContactEmail} so we can investigate.”

**HVAC-RECOV-01 (Service recovery)**
“Thank you for bringing this to our attention. We’d like the chance to make it right—please contact us at {ContactPhone} or {ContactEmail}.”

---

## 5) Platform-policy reminders (operational)
- Never ask for “positive reviews only” (review gating).
- Never offer incentives/discounts for reviews.
- Never promise removal or claim policy enforcement.
- Keep responses short, polite, and private for resolution.

## 6) Launch exit criteria (Go/No-Go)
GO only if all are true:
- Detectors: PHI + Legal + Incentive + Competitor + Harassment triggers verified with unit tests.
- Posting gate: manual_only holds cannot be posted via UI or API (blocked_manual_review).
- Audit logs: required fields/events present for draft→flag→approve/blocked→post.
- Weekly KPI report reconciles approved vs posted vs blocked vs failed.

Owner decision needed next: confirm sandbox availability for GBP/Yelp; otherwise choose one low-risk live location for a 3–5 response verification run per runbook.
