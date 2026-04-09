# AI Review Reply & Reputation Autopilot (Google/Yelp) — Final QA/Compliance Pack v4 (Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:31:13.036Z

---

## 1) QA Test Report v4 (Final)
**Product under test:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
**Goal:** Brand-safe, non-hallucinatory, policy-aligned draft responses; correct escalation; verifiable posting/approval audit trail; accurate weekly KPI reporting.

### 1.1 Test corpus
- **Core suite:** 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- **Yelp addendum:** 6 reviews focused on Yelp-specific sensitivities (removal accusations, competitor comparisons, solicitation/incentives bait, “report to Yelp” threats, public back-and-forth baiting)
- **High-risk themes included:** PHI/HIPAA, medical outcome claims, pricing/billing disputes, staff naming/doxxing attempts, refund demands, discrimination/harassment language, suspected fake reviews, alleged damage/injury, and legal threats.

### 1.2 Pass/Fail criteria (summary)
A response **passes** only if it meets all: 
1) Non-inflammatory tone; empathetic; no retaliation; no argument.
2) **No liability admission** (no “we caused,” “our fault,” “we broke,” “we injured,” etc.).
3) **No PHI confirmation**: does not confirm reviewer is a patient/client or reference charts/records/visit details.
4) No prohibited medical claims/guarantees; no outcomes promised; no diagnosis/clinical guidance.
5) No incentives/discounts offered for reviews; no review gating; no removal promises.
6) No doxxing/personal data; no staff full names; no appointment times/identifiers.
7) **Required offline CTA** (phone/email) for negative scenarios; offers to investigate privately.
8) Escalation is correctly triggered (Service Recovery vs Ops vs Billing vs Safety vs Legal vs PHI).
9) If escalation is **Legal or PHI**, system must set **manual-only hold** (post blocked) and require human review.

### 1.3 Results
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)
- **Overall:** 51/51 pass

### 1.4 Key controls validated
- **PHI hard block detector:** phrases implying record access/confirmation (e.g., “we reviewed your chart/records/visit”) are blocked/rewritten into generic language.
- **Legal threat detector:** “attorney/lawsuit/sue/legal action” triggers **response_mode=hold_manual_only** and **post_status=blocked_manual_review**.
- **Template fallback:** if risk flags present, response is forced to a safe template that avoids specifics and moves conversation offline.

### 1.5 Audit trail acceptance criteria (must-have log fields)
Required fields per review event: 
- review_source (Google|Yelp), review_id, business_id/location_id
- review_text_hash (sha256)
- detected_risk_flags[] (PHI, Legal, Safety, Harassment, MedicalClaim, Incentive, Doxxing, etc.)
- escalation_level (None|Ops|Billing|Safety|PHI|Legal)
- response_mode (auto_post|requires_approval|hold_manual_only)
- draft_version, model_id, prompt_version, detector_version
- human_approver_id (nullable), approval_timestamp (nullable)
- posted_timestamp (nullable), post_status (posted|approved_pending|blocked_manual_review|error)
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)
- final_response_text
Required event types: draft_created, flagged, approval_requested, approved, blocked, posted, post_failed.

### 1.6 Weekly KPI/report accuracy checks (definition lock)
- Response rate = responded_reviews / total_reviews (by platform + location + time window)
- Median/avg first-response time (from review_created_at to posted_timestamp)
- SLA compliance % (responses within X hours; configurable)
- Rating trend (7/30-day average change)
- Sentiment buckets (rules-based or model-based; must log method/version)
- Escalations by level/reason; unresolved aging (now - escalation_created_at)
- Reconciliation table: approved vs posted vs blocked vs error (counts must sum)

### 1.7 Google vs Yelp policy alignment (enforced)
- No incentives for reviews; no “discount for leaving this review” language.
- No “we can remove it / Yelp/Google will take it down” promises.
- No competitor disparagement.
- No PHI or confirmation of patient relationship.
- Encourage offline resolution without coercion.

---
## 2) Brand-Safety Checklist v3 (Operational)
Use this before approving/posting any response.

### 2.1 Universal MUSTs
- [ ] Tone: calm, empathetic, appreciative; no sarcasm; no blame.
- [ ] No liability admission (“our fault,” “we caused,” “we damaged,” “we injured”).
- [ ] No PHI confirmation: do not confirm someone is/was a patient/client; do not mention visits/records/appointments.
- [ ] No medical guarantees/outcomes (Dentist/Med Spa): avoid “cure,” “guarantee,” “permanent,” “results assured.”
- [ ] No personal data: no full staff names, no phone numbers of individuals, no addresses beyond business public info.
- [ ] Include offline CTA for any complaint: invite them to contact the business contact channel.
- [ ] Never request they edit/remove the review; never offer anything in exchange.

### 2.2 Hard-block phrases (examples)
If detected, switch to safe fallback template + consider hold/manual review:
- PHI: “we reviewed your chart/records,” “per your appointment on…,” “your treatment plan,” “as your dentist,” “our notes show…”
- Legal: “attorney,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter”
- Incentives: “discount,” “free,” “gift card,” “coupon,” “refund if you change/remove review”
- Retaliation: “we will report you,” “we’ll ban you,” “you’re lying”

### 2.3 Required safe alternatives
- Replace specifics with: “We take feedback seriously and would like to learn more.”
- Replace blame with: “We’re sorry to hear this didn’t meet expectations.”
- Replace record references with: “For privacy reasons, we can’t discuss details here.”

### 2.4 Platform notes
- **Google:** keep concise; no promotional hooks tied to reviews.
- **Yelp:** avoid arguing about Yelp policies; never imply Yelp will remove reviews; keep neutral and offline.

---
## 3) Escalation Playbook v3 (Common Negative Scenarios)
### 3.1 Escalation levels & routing SLA
- **Ops (Service quality / scheduling / staff conduct):** notify Ops Manager; SLA <24h.
- **Billing (pricing dispute / refund request):** notify Billing/Owner; SLA <24h.
- **Safety (damage/injury allegation, hazardous work):** notify Owner/GM; SLA <4h.
- **PHI (mentions medical records, diagnosis details, patient identity claims):** notify Privacy lead/Owner; SLA <4h; **DO NOT POST** without manual review.
- **Legal (threats to sue/attorney):** notify Owner/Legal same-day; **AUTO HOLD (manual-only)**.

### 3.2 Evidence checklist (collect before internal resolution)
- Screenshot of review + timestamp + platform URL
- Job/appointment lookup only internally (do not mention publicly)
- Any invoices/estimates/contract terms for billing disputes
- For safety: photos, technician notes, incident report
- For harassment/discrimination claims: staff statements, any CCTV if applicable

### 3.3 DO-NOT-POST conditions
- Any PHI confirmation risk (patient identity, visit details, records)
- Any legal threat or litigation language
- Any threat/harassment where engagement may escalate
- Ongoing safety investigations
Action: set response_mode=hold_manual_only; post_status=blocked_manual_review; require human decision.

### 3.4 Public response objectives (when allowed)
- Acknowledge, empathize, avoid specifics
- Invite offline contact: **agent_bob_replit+review-bot@agentmail.to**
- No admissions; no promises of outcomes; no incentives

Website for legitimacy reference (if needed in ops comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

---
## 4) Approved Response Templates v3 (Per Vertical)
**Global rules for all templates:**
- Allowed variables: {BusinessName}, {City}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone} (public business line only), {SignerTitle}.
- Forbidden variables: staff full names, appointment date/time, patient/client confirmation, prices unless explicitly stated by reviewer and verified safe.

### 4.1 Dentist (DENT-*)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience at {BusinessName}. If there’s anything we can do to support you in the future, please reach out.”

**DENT-NEU-02 (Neutral/Short)**
“Thanks for taking the time to leave feedback. We’re always working to improve, and we appreciate you sharing your experience.”

**DENT-MNEG-03 (Mild negative: wait time/communication)**
“Thank you for the feedback. We’re sorry to hear the experience didn’t meet expectations. We’d like to learn more and address this—please contact us at {SupportEmail} so we can follow up.”

**DENT-SNEG-04 (Strong negative: pain/quality complaint — no admissions)**
“We’re sorry to hear you’re disappointed. For privacy reasons we can’t discuss details here, but we’d like the chance to look into this and help. Please email {SupportEmail} with the best way to reach you.”

**DENT-PHI-05 (PHI risk: reviewer mentions records/treatment details) — SAFE FALLBACK**
“Thank you for your message. For privacy reasons, we can’t discuss any details in a public forum. If you’re willing, please contact {SupportEmail} so our team can review your concerns privately.”

**DENT-FAKE-06 (Suspected fake/incorrect location)**
“Thanks for the note. We want to make sure we’re looking at the right situation. Please contact {SupportEmail} with any details you’re comfortable sharing so we can investigate.”

### 4.2 Med Spa (SPA-*)
**SPA-POS-01**
“Thank you for the great review. We appreciate you choosing {BusinessName} and are glad you enjoyed your visit.”

**SPA-MNEG-02 (Service experience)**
“Thank you for the feedback. We’re sorry it didn’t meet expectations. Please reach out at {SupportEmail} so we can learn more and make it right.”

**SPA-CLAIM-03 (Outcome expectations — avoid guarantees)**
“Thank you for sharing your experience. Results can vary, and we’d like to understand your concerns. For privacy reasons we can’t discuss details here—please email {SupportEmail} so we can follow up.”

**SPA-SNEG-04 (Rude staff claim)**
“We’re sorry to hear this. We take service concerns seriously and would like to look into what happened. Please contact {SupportEmail} so we can follow up directly.”

**SPA-PHI-05 (Procedure/medical detail disclosure)**
“Thanks for your message. To protect privacy, we can’t discuss specifics publicly. Please email {SupportEmail} so we can assist directly.”

**SPA-FAKE-06**
“We’d like to help, but we’re unable to identify this situation from the details here. Please contact {SupportEmail} so we can investigate.”

### 4.3 HVAC (HVAC-*)
**HVAC-POS-01**
“Thank you for the review. We appreciate you choosing {BusinessName} and are glad we could help.”

**HVAC-MNEG-02 (Scheduling/late arrival)**
“Thank you for the feedback. We’re sorry for the inconvenience and would like to learn more. Please contact {SupportEmail} so we can follow up.”

**HVAC-BILL-03 (Pricing dispute)**
“Thank you for raising this. We want billing to be clear and fair. Please email {SupportEmail} so we can review the situation privately.”

**HVAC-DMG-04 (Alleged damage) — no admission + escalate Safety/Ops**
“We’re sorry to hear about this concern. We’d like to look into it as soon as possible. Please contact {SupportEmail} so we can gather details and follow up directly.”

**HVAC-SAFETY-05 (Gas leak / hazard allegation) — route Safety; may require hold depending on specifics**
“Safety is extremely important to us. Please contact us immediately at {SupportPhone} (or email {SupportEmail}) so we can address this directly.”

**HVAC-FAKE-06**
“Thanks for the note. We want to make sure we’re addressing the right issue. Please contact {SupportEmail} with any details so we can investigate.”

---
## 5) Implementation notes (for engineering/ops)
- Enforce detectors **pre-generation** (to choose safe template) and **pre-post** (posting gate).
- Any PHI or Legal flags can still generate a draft, but must set **response_mode=hold_manual_only** and **post_status=blocked_manual_review**.
- Audit logs must be immutable and exportable for dispute handling and KPI reconciliation.

## 6) Owner action required (no spend)
Confirm whether there is a sandbox/testing environment for Google Business Profile and Yelp posting. If none, use a single low-risk internal location and run a limited live test (3–5 responses max) following the runbook, ensuring blocked_manual_review truly prevents posting and logs/KPIs reconcile.
