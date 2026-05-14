# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Master Pack v3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:26:30.749Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Master Pack v3

Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this checklist for every drafted response **before approval/posting**.

### A. Platform policy alignment (Google + Yelp)
- [ ] **No incentives**: response does NOT offer discounts, freebies, refunds, gifts, or “we’ll take care of you if you update your review.”
- [ ] **No review gating**: response does NOT ask for “5-star” ratings, doesn’t pressure removal, doesn’t redirect only happy customers to review.
- [ ] **No removal/enforcement promises**: response does NOT say “we’ll get Yelp/Google to remove this.”
- [ ] **No competitor disparagement**: response does NOT insult/accuse competitors or compare pricing/quality in a hostile way.
- [ ] **No solicitation of private info publicly**: does not request phone/email/address/medical details publicly; instructs to contact via offline channel.

### B. PHI/PII & doxxing controls (especially dentist/med spa)
- [ ] **No PHI confirmation**: does NOT confirm the person is/was a patient/client; avoid “your visit,” “your procedure,” “your chart/records.”
- [ ] **No appointment specifics**: no dates/times/provider names tied to a person, no treatment details.
- [ ] **No personal data**: does not repeat phone numbers, addresses, emails, last names, or staff personal info.
- [ ] If the review contains PHI/PII: response uses generic language + offline CTA; consider **manual-only hold**.

### C. Liability / legal risk
- [ ] No admission of fault: avoid “we messed up,” “we caused,” “our technician damaged,” “it was our negligence.”
- [ ] No promises that imply liability: avoid “we will reimburse,” “we will pay for damages” (unless explicitly authorized).
- [ ] If reviewer mentions **attorney/lawsuit/sue** or regulator complaints: **manual-only hold** + escalation to Legal.

### D. Medical/clinical claims (dentist/med spa)
- [ ] No outcome guarantees: avoid “guaranteed results,” “cure,” “permanent,” “no side effects.”
- [ ] No personalized medical advice: don’t diagnose or recommend treatment; keep general and invite offline discussion.

### E. Tone & de-escalation
- [ ] Non-inflammatory: no sarcasm, blame, or “you’re lying.”
- [ ] Empathetic and brief: acknowledge feelings without confirming disputed facts.
- [ ] Avoid public back-and-forth: do not argue point-by-point; move offline.

### F. Required elements
- [ ] Includes an **offline CTA** (call/email) to resolve.
- [ ] Includes **business-safe signature** (Team/Management) without naming specific staff.
- [ ] For negatives: includes invitation to discuss + commitment to investigate (without admitting fault).

### G. “DO NOT POST” conditions (manual-only hold)
Mark response as `blocked_manual_review` if any apply:
- [ ] Legal threat keywords: sue, lawsuit, attorney, subpoena, demand letter.
- [ ] Safety incident/injury: “hurt,” “injury,” “fire,” “gas leak,” “carbon monoxide,” “infection,” “bleeding,” “hospital.”
- [ ] PHI confirmation risk: review demands chart/records discussion or mentions protected details.
- [ ] Harassment/hate speech/credible threats.
- [ ] Active investigation: insurance claim, police report, regulator complaint.


## 2) Escalation Playbook v3 (Scenarios, Routing, SLAs)
**Escalation levels**
- **L0**: Normal (safe to auto-draft + human approve).
- **L1**: Negative, needs ops follow-up (safe to post with offline CTA).
- **L2**: High risk (billing dispute w/ chargeback, alleged damage, discrimination claim) — require manager approval.
- **L3**: Manual-only hold (legal threat/PHI/safety incident/threats) — do not post until cleared.

### Routing & SLA
- Service quality / rude staff / wait times → **Ops/GM** within 24h (L1/L2)
- Billing dispute / refund demand / chargeback → **Billing** within 24h (L2)
- Alleged damage/property loss → **Owner/GM** within 4h (L2) + collect evidence
- Discrimination/harassment allegations → **Owner/HR** same day (L2)
- PHI/HIPAA risk (dentist/med spa) → **Compliance lead/Owner** same day (L3)
- Legal threats (“attorney/sue”) → **Legal/Owner** same day (L3)
- Safety incidents (gas leak/injury) → **Owner/GM** within 2–4h (L3)

### Evidence to collect (internal, not public)
- Review URL + screenshots
- Job/appointment record ID (internal only)
- Staff involved (internal only)
- Timeline of events
- Photos/video if applicable
- Prior communications
- Refund/charge history (if billing)

### Public response patterns (what to post)
**L1 Service issue (post allowed):**
- Acknowledge experience + apologize for frustration (not fault)
- Invite offline contact
- State commitment to improve

**L2 Alleged damage (post allowed only with manager approval):**
- Acknowledge concern
- State you take it seriously and want to investigate
- No admissions, no reimbursement promises
- Offline CTA to designated channel

**L3 Legal/PHI/Safety (DO NOT POST):**
- Set status: `blocked_manual_review`
- Internal note: reason + detector match
- Optional: draft a *private* internal-only proposed response for legal/compliance review


## 3) Approved Response Template Library v3
**Global rules for variables**
- Allowed: {business_name}, {generic_team_name}, {phone}, {email}, {hours}, {city}
- Disallowed: reviewer name, staff name, appointment date/time, treatment details, pricing unless verified and approved, any PHI.

### 3.1 Dentist Templates (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind review. We’re glad you had a great experience with our team. If you ever need anything, please reach us at {phone} or {email}. — {generic_team_name}, {business_name}”

**DENT-NEU-02 (Neutral/short praise)**
“Thanks for taking the time to share feedback. We appreciate it and will keep working to provide a great experience. If there’s anything we can do to improve, contact us at {phone} or {email}. — {generic_team_name}”

**DENT-NEG-03 (Wait time/communication)**
“Thank you for your feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can make this right—please contact our office at {phone} or {email}. — {generic_team_name}, {business_name}”

**DENT-HIRISK-04 (Clinical outcome complaint—no guarantees)**
“Thank you for sharing your concerns. We take feedback seriously and want to address this appropriately. For privacy reasons, we can’t discuss details here, but we’d like to connect directly—please reach us at {phone} or {email}. — {generic_team_name}”

**DENT-FAKE-05 (Suspected fake / not a patient)**
“We take feedback seriously, but we can’t locate details that match this description. Please contact us at {phone} or {email} so we can understand what happened and address it. — {generic_team_name}, {business_name}”

**DENT-DO-NOT-POST-06 (PHI/legal threat)**
Status: blocked_manual_review. Do not post. Escalate to Compliance/Legal.

### 3.2 Med Spa Templates (Google/Yelp)
**SPA-POS-01**
“Thank you for your review. We’re happy to hear you had a positive experience with our team. If you need anything, contact us at {phone} or {email}. — {generic_team_name}, {business_name}”

**SPA-NEG-02 (Service dissatisfaction)**
“Thank you for the feedback. We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help—please reach out at {phone} or {email}. — {generic_team_name}”

**SPA-HIRISK-03 (Results/side effects complaint—no medical advice)**
“Thank you for sharing your concerns. For privacy reasons, we can’t discuss specifics here, but we want to address this directly. Please contact us at {phone} or {email} so we can review next steps with you. — {generic_team_name}, {business_name}”

**SPA-PRICING-04 (Price dispute)**
“Thank you for your feedback. We aim to be transparent and would like to review your concerns directly. Please contact us at {phone} or {email}. — {generic_team_name}”

**SPA-FAKE-05**
“We take reviews seriously, but we’re unable to confirm the details from this post. Please contact us at {phone} or {email} so we can understand and address the concern. — {generic_team_name}, {business_name}”

**SPA-DO-NOT-POST-06 (PHI/legal/safety)**
Status: blocked_manual_review. Do not post.

### 3.3 HVAC Templates (Google/Yelp)
**HVAC-POS-01**
“Thanks for the great review. We appreciate the opportunity to help and are glad you had a good experience. If you need anything, reach us at {phone} or {email}. — {generic_team_name}, {business_name}”

**HVAC-NEG-02 (Late/no-show)**
“Thank you for the feedback. We’re sorry for the frustration and would like to look into what happened. Please contact us at {phone} or {email} so we can help. — {generic_team_name}”

**HVAC-HIRISK-03 (Alleged damage)**
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to investigate. Please contact us at {phone} or {email} so we can review the details directly. — {generic_team_name}, {business_name}”

**HVAC-PRICING-04 (Invoice dispute)**
“Thank you for your review. We’d like to understand your concerns and review the invoice with you. Please reach out at {phone} or {email}. — {generic_team_name}”

**HVAC-FAKE-05**
“We’re unable to match this situation to our records. Please contact us at {phone} or {email} so we can understand and address your concern. — {generic_team_name}, {business_name}”

**HVAC-DO-NOT-POST-06 (Safety incident/legal threat)**
Status: blocked_manual_review. Do not post.


## 4) Compliance & Policy Alignment Appendix (Testable Rules)
Implement as **pre-generation** and **pre-post** gates.

### Hard blocks (manual-only hold)
- Legal threat detector: attorney, lawsuit, sue, subpoena, demand letter → `escalation_level=Legal`, `post_status=blocked_manual_review`
- PHI confirmation detector: “chart/records/visit/procedure/diagnosis” + any confirmation phrasing (“we reviewed…”, “according to your…”) → force generic response OR manual hold depending on severity
- Safety incident detector: gas leak, CO, fire, injury, hospital → manual-only hold + safety escalation

### Must-not-say (examples)
- Incentives: “discount,” “free,” “coupon,” “we’ll refund if you update.”
- Removal promises: “we’ll get this removed,” “Yelp/Google will take it down.”
- Admissions: “we caused,” “our fault,” “we damaged,” “we were negligent.”
- PHI confirmation: “we reviewed your chart,” “your procedure,” “your appointment.”

### Must-include (negative reviews)
- Offline CTA: phone/email
- Privacy note when applicable: “For privacy reasons, we can’t discuss details here.”


## 5) Posting & Audit Trail Requirements (minimum)
Every draft/decision must log:
- source (Google/Yelp), review_id, business/location_id, review_text_hash
- detected_risk_flags, escalation_level, response_mode (auto/approve/hold)
- draft_version + prompt/model version
- approver_id + approval_timestamp
- post_status: posted | failed | blocked_manual_review
- posted_timestamp OR blocked_timestamp + hold_reason + detector_version

This pack is the authoritative reference for: brand-safe response content, escalation routing, manual-only hold conditions, and platform policy constraints.