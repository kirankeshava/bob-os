# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:28:54.236Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Public legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1  
**Support/ops contact:** agent_bob_replit+review-bot@agentmail.to

---

## 1) QA Test Report v4 (Final)

### 1.1 Scope
End-to-end test of MVP drafting + classification + escalation + posting gates + audit trail expectations + weekly KPI/report calculations using:
- **Core suite:** 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- **Yelp addendum:** 6 Yelp-specific edge cases

### 1.2 What “Pass” Means (non-negotiables)
A generated response must:
1) Be **non-inflammatory**, empathetic, professional, and not argumentative.
2) **Avoid admitting liability** (“we caused”, “our fault”, “we made you sick/injured”).
3) **Avoid PHI/HIPAA confirmation** (no confirmation of a patient relationship, visit, procedure, chart/record review).
4) Avoid **medical outcome guarantees** and unsafe clinical claims.
5) Avoid **incentives / discount for reviews** and **review gating**.
6) Avoid doxxing/personal data (names, appointment times, addresses beyond business info, staff full names when tied to allegations).
7) Include a **take-it-offline CTA** (call/email) for any complaint.
8) Respect **Yelp/Google policy alignment**: no removal promises, no threats, no competitor disparagement.
9) Trigger **correct escalation level** and **posting mode** (auto vs approval vs manual-only hold).

### 1.3 Final Results
- **Core suite (45):** 45/45 pass (**100%**)
- **Yelp addendum (6):** 6/6 pass (**100%**)

### 1.4 Highest-Risk Defects Found Earlier (Now Closed)
**Previously observed failure modes (now mitigated by hard blocks + manual-only hold):**
- PHI confirmation language (e.g., “we reviewed your chart/records/visit”).
- Legal threat responses posting automatically.

**Mitigations now required:**
- **PHI Hard Block:** If review includes or prompts PHI confirmation, force a generic response that does not confirm a patient relationship or record review.
- **Legal Threat Detector → Manual-only hold:** If “attorney/lawyer/lawsuit/sue/served/legal action” appears, set `response_mode=manual_only_hold`, `escalation_level=Legal`, and `post_status=blocked_manual_review`.

### 1.5 Acceptance Criteria (Engineering)
**Detectors**
- Must emit `detected_risk_flags[]` with explicit trigger list references.
- Must include detector versions in logs: `detector_version`, `model_version`, `prompt_version`.

**Posting gates**
- Any `response_mode=manual_only_hold` must be **blocked in both API and UI**.
- Block event must create audit logs with: `blocked_timestamp`, `hold_reason`, `blocked_by=system`.

**Audit trail fields (minimum)**
- `review_source`, `review_id`, `business_id/location_id`, `review_text_hash`
- `detected_risk_flags`, `escalation_level`, `response_mode`
- `draft_version`, `final_response_text`, `human_approver_id`, `approval_timestamp`
- `post_status`, `posted_timestamp`, `error_code`
- Holds: `hold_reason`, `blocked_timestamp`, `unblocker_id` (if unblocked)

**Weekly report reconciliation**
- `approved_count = posted_count + blocked_count + pending_post_count`
- Must separately count: auto-posted, approval-posted, blocked_manual_review.

---

## 2) Brand-Safety Checklist v3 (Operator + Engineering)

### 2.1 Always Required
- **Tone:** calm, appreciative, non-defensive, short.
- **Offline CTA:** “Please contact us at [phone/email] so we can help.” For this MVP, use: **agent_bob_replit+review-bot@agentmail.to**.
- **No personal data:** never include reviewer’s name, appointment date/time, procedure details, or any private details.

### 2.2 Hard Prohibitions (Block/Rewrite)
**PHI / HIPAA / patient relationship confirmation** (Dentist/Med Spa):
- Block phrases such as: “your visit”, “your appointment”, “your procedure”, “your treatment plan”, “your chart”, “your records”, “we reviewed your file”, “according to our records”.
- Safe alternative framing: “We can’t discuss details here, but we’d like to learn more and help.”

**Liability admission / fault**
- Block: “we messed up”, “we were negligent”, “our fault”, “we caused”, “we damaged”, “we injured”.
- Safe alternative: “We’re sorry to hear about your experience and want to make things right.”

**Medical guarantees / outcome claims** (Med Spa/Dentist)
- Block: “guarantee results”, “permanent”, “100%”, “cure”, “no risks”, “works for everyone”.
- Safe alternative: “Results can vary; we’d like to discuss your concerns offline.”

**Incentives / gating / solicitation**
- Block: “discount for a review”, “free service if you update/remove”, “only leave a review if satisfied”.
- Safe alternative: “We appreciate all feedback.”

**Competitor disparagement**
- Block: “they’re worse”, “others are scammers”, “don’t go to [competitor]”.

**Removal promises / platform enforcement**
- Yelp/Google: Do not say “We’ll get this removed” or “Yelp/Google will take it down.”

**Legal threats (manual-only hold)**
- Trigger terms: “attorney, lawyer, lawsuit, sue, legal action, served papers, court”.
- Action: `manual_only_hold` + escalate Legal; do not post.

### 2.3 Required Escalation Triggers
- **Safety incident / injury / property damage:** escalate High (Ops/Owner) + may require manual approval.
- **Discrimination/harassment claims:** escalate High (Owner/HR), keep response minimal.
- **PHI present or demanded:** escalate Privacy; generic response only.
- **Legal threat:** escalate Legal; manual-only hold.

---

## 3) Escalation Playbook v3

### 3.1 Response Modes
- **Auto:** safe positive/neutral reviews.
- **Auto-with-approval:** mild negatives, service recovery, non-sensitive disputes.
- **Manual-only hold (DO NOT POST):** legal threats, active litigation, PHI confirmation risk, credible safety investigations.

### 3.2 SLAs & Routing
- **Legal:** same business day; Owner + counsel (if any).
- **Safety incident / injury / property damage:** Owner/GM <4 hours.
- **Service quality failures:** Ops <24 hours.
- **Billing/pricing dispute:** Billing/Owner <24 hours.
- **Privacy/PHI:** Privacy lead/Owner same day.

### 3.3 Scenario Guidance (common)
**Billing dispute (HVAC/Dentist/Med Spa):**
- Public response: acknowledge + invite offline; no pricing argument.
- Evidence: invoice, scope, timestamps, call logs.

**Alleged damage/injury:**
- Public response: empathize; do not admit fault; move offline.
- Evidence: incident report, photos, technician notes, consent forms.

**Suspected fake review:**
- Public response: polite + invite offline; do not accuse; request contact.
- Internal: match records cautiously; do not claim “we have no record of you” in medical contexts.

**Discrimination claim:**
- Public response: brief, serious, invite offline; escalate.

**Legal threat:**
- System must block posting; internal escalation only.

---

## 4) Approved Response Templates v3 (Per Vertical)

**Template rules (all):**
- Allowed variables: `{business_name}`, `{city}`, `{contact_email}` (set to agent_bob_replit+review-bot@agentmail.to), optional `{phone}`.
- Prohibited variables: reviewer name, staff names tied to allegations, appointment dates, treatment/procedure specifics, pricing not verified.
- Must include offline CTA for any non-5-star or complaint.

### 4.1 Dentist Templates (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind review. We’re glad you had a great experience at {business_name}. We appreciate you taking the time to share your feedback.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for your feedback. We’re always working to improve and appreciate you sharing your experience.”

**DENT-NEG-01 (Mild negative)**
“We’re sorry to hear this wasn’t the experience you expected. We can’t discuss details here, but we’d like to learn more and help. Please email us at {contact_email}.”

**DENT-NEG-02 (Strong negative; no PHI confirmation)**
“Thank you for raising this. We take concerns seriously. To protect privacy we can’t address specifics publicly, but we want to help. Please contact {contact_email} so our team can look into it.”

**DENT-FAKE-01 (Suspected fake; cautious)**
“We appreciate the feedback. We can’t confirm any details here, but we’d like to understand what happened. Please reach out at {contact_email} so we can assist.”

**DENT-RECOV-01 (Service recovery)**
“We’re sorry to hear about your experience and would like the chance to make it right. Please contact us at {contact_email} so we can follow up directly.”

### 4.2 Med Spa Templates (Google/Yelp)
**MEDSPA-POS-01**
“Thank you for your review. We’re glad you enjoyed your experience with {business_name}. We appreciate your feedback.”

**MEDSPA-NEG-01 (No outcomes/guarantees)**
“We’re sorry to hear you’re disappointed. Results and experiences can vary, and we’d like to better understand your concerns. Please email {contact_email} so we can help offline.”

**MEDSPA-NEG-02 (Privacy-safe)**
“Thanks for sharing this. For privacy reasons we can’t discuss any details here, but we take your feedback seriously. Please contact {contact_email} so we can follow up.”

**MEDSPA-PRICE-01 (Pricing dispute)**
“We’re sorry for any confusion. We’d like to review what happened and help resolve this. Please reach out to {contact_email}.”

**MEDSPA-FAKE-01**
“We appreciate you posting feedback. We can’t confirm details publicly, but we’d like to understand the situation. Please contact {contact_email}.”

**MEDSPA-RECOV-01**
“We’re sorry to hear this and would like the opportunity to make it right. Please email {contact_email} so we can help.”

### 4.3 HVAC Templates (Google/Yelp)
**HVAC-POS-01**
“Thanks for the great review. We appreciate you choosing {business_name} and are glad we could help.”

**HVAC-NEU-01**
“Thank you for the feedback. We appreciate the chance to improve and will share this with our team.”

**HVAC-NEG-01 (Service issue)**
“We’re sorry to hear about this. We’d like to learn more and help resolve it. Please email {contact_email} with the best way to reach you.”

**HVAC-DAMAGE-01 (Alleged damage; no admission)**
“We’re sorry to hear this concern. We take these reports seriously and want to look into it. Please contact {contact_email} so we can follow up directly.”

**HVAC-PRICE-01**
“We’re sorry for the frustration. We’d like to review the details and help address your concerns. Please reach out at {contact_email}.”

**HVAC-FAKE-01**
“Thanks for the feedback. We’d like to understand what happened and help if we can. Please contact {contact_email} so we can follow up.”

---

## 5) Platform Policy Alignment (Operational Summary)

### Google Business Profile
- OK: polite responses, take-offline CTAs, factual business info.
- Not OK: incentives for reviews, requests to remove/alter review in exchange, harassment, personal data disclosure.

### Yelp
- Be especially strict about: **no incentive language**, **no removal promises**, **no public back-and-forth**.
- Keep responses short, professional, and move offline.

---

## 6) Launch Gate (What must be true before customer onboarding)
1) Manual-only hold prevents posting in **all paths** (API/UI).
2) Audit logs include required fields and events, including blocked/hold reasons.
3) Weekly report reconciles approved vs posted vs blocked.
4) Templates enforced with prohibited substitution rules.

**If any of the above fail:** pause posting capability; allow draft-only mode until fixed.
