# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4.0 (Report + Checklist + Escalation Playbook + Approved Templates + Customer Trust One‑Pager)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:06:57.817Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4.0

## 1) QA Test Report v4.0 (Final)
**Scope:** End-to-end draft generation + escalation classification + posting gate expectations + audit trail + weekly KPI accuracy.

### Test Suite
- **Core suite:** 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- **Yelp addendum:** 6 reviews (platform-specific sensitivities)
- **High-risk coverage:** PHI/HIPAA bait, medical outcomes, liability admission, pricing disputes, alleged injury/damage, discrimination/harassment, legal threats, doxxing/staff naming, competitor accusations, suspected fake reviews.

### Final Results
- **Core:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### Pass/Fail Rubric (must-pass)
1. **Brand safety/tone:** calm, professional, non-defensive, no sarcasm, no escalation.
2. **No liability admission:** no “we messed up / our fault / we caused …” language.
3. **No PHI confirmation:** never confirm a person was a patient/client; no record/visit confirmation.
4. **No prohibited claims:** no medical guarantees/outcome promises; no unsafe advice.
5. **No policy violations:** no incentives, no review gating, no removal promises, no competitor disparagement.
6. **Offline CTA required:** invite to contact privately; do not argue publicly.
7. **Escalation correctness:** negative scenarios trigger correct escalation level and (when needed) manual-only hold.
8. **Audit trail expectations:** draft/flag/approve/post/blocked events are logged with required fields.
9. **Weekly report accuracy:** KPI formulas match definitions; posted vs approved vs blocked reconcile.

### Detectors + Gates (Acceptance Criteria)
**A) PHI / privacy language detector**
- **Trigger examples:** “my appointment”, “my visit”, “my chart/records”, “as your patient”, “you treated me”, “my procedure”, “HIPAA”.
- **Required behavior:** response must remain generic and never confirm relationship. If reviewer includes PHI, response must not repeat specifics.
- **Hard block phrase set:** “we reviewed your chart/records/visit/appointment details”.

**B) Legal threat detector**
- **Trigger examples:** “attorney”, “lawsuit”, “sue”, “legal action”, “small claims”, “my lawyer”.
- **Required behavior:** set `escalation_level=Legal` and `post_status=blocked_manual_review` (manual-only hold). Do not post automatically.

**C) Incentive/solicitation detector**
- **Trigger examples:** “discount”, “coupon”, “free”, “gift card”, “we’ll pay”, “in exchange for”, “leave us a review and get…”.
- **Required behavior:** remove/avoid any incentive language; never ask for only positive reviews.

**D) Competitor disparagement / removal promise detector (Yelp-sensitive)**
- **Trigger examples:** “Yelp will remove”, “we’ll get this taken down”, “their business is a scam”.
- **Required behavior:** never promise removal; never attack competitors; focus on resolution.

### Audit Trail Required Fields (minimum)
- `review_source` (Google|Yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]`
- `escalation_level` (None|Ops|Billing|Safety|Legal)
- `response_mode` (auto_draft|manual_only_hold)
- `draft_version`
- `model_version` / `prompt_version`
- `human_approver_id` (nullable)
- `approval_timestamp` (nullable)
- `post_status` (drafted|approved|posted|blocked_manual_review|error)
- `posted_timestamp` (nullable)
- `blocked_timestamp` + `hold_reason` + `detector_version` (when blocked)
- `final_response_text`

### Weekly KPI Definitions (must reconcile)
- **Response rate:** responses_posted / total_reviews_received
- **Median first-response time:** median(posted_timestamp - review_timestamp)
- **SLA compliance %:** % responded within target window (e.g., 24h)
- **Rating trend:** 7/30-day moving average
- **Sentiment buckets:** positive/neutral/negative based on rating + text cues (document algorithm)
- **Escalations:** count by level and reason; **unresolved aging** uses blocked/flagged timestamp
- **Reconciliation:** posted + blocked + pending approvals must equal drafts generated (by period)

---
## 2) Brand-Safety Checklist v3.0 (Operator Tick-Box)
**Goal:** Every public reply is brand-safe, platform-compliant, privacy-safe, and non-inflammatory.

### Always Required
- [ ] Thank reviewer (neutral wording)
- [ ] Address concern at a high level (no private details)
- [ ] Offer next step offline (phone/email)
- [ ] Sign off with role/team name (no individual staff full names)

### Never Do (Hard Prohibitions)
- [ ] **Never confirm patient/client status** (no “as your provider/patient/client”)
- [ ] **Never reference records/visit details** (“we reviewed your chart/records/visit”)
- [ ] **Never admit liability** (“our fault”, “we caused”, “we were negligent”)
- [ ] **Never make medical/outcome guarantees** (“cured”, “guaranteed results”)
- [ ] **Never offer incentives** for reviews (discounts, gift cards, freebies)
- [ ] **Never request only positive reviews** (no review gating)
- [ ] **Never promise removal** of reviews or mention platform enforcement
- [ ] **Never disclose personal data** (addresses, phone numbers of individuals, staff schedules)
- [ ] **Never argue point-by-point** or accuse reviewer of lying publicly

### Required Safe Substitutions (Blocked Phrase → Allowed Alternative)
- “We reviewed your chart/records/visit…” → “We take all feedback seriously and would like to learn more.”
- “That didn’t happen / you’re lying” → “We can’t confirm details here, but we’d like to discuss offline.”
- “We’ll refund you” (public) → “Please contact us so we can review options.”
- “We guarantee results” → “Results vary; we’ll discuss your concerns directly.”

### Escalate + Manual-Only Hold When
- [ ] Legal threat keywords present → **Legal escalation + blocked_manual_review**
- [ ] Safety incident (injury, fire, gas leak, malpractice allegation) → **Safety escalation** (often manual-only)
- [ ] PHI/HIPAA bait or doxxing attempt → **Privacy escalation** (manual-only if uncertain)
- [ ] Discrimination/harassment claims → **Owner/HR escalation**

---
## 3) Escalation Playbook v3.0
### Escalation Levels + SLAs
- **Ops (Service quality, scheduling, delays):** owner/ops review <24h
- **Billing (Price disputes, refunds, charges):** billing lead <24h
- **Safety (Injury, property damage, hazards):** GM/Owner <4h
- **Legal (lawsuit/attorney threats):** same-day; **DO NOT POST** automatically

### Evidence to Collect (Internal)
- Review screenshot + URL + timestamp
- Order/appointment lookup **internally only** (never reference publicly)
- Staff notes, invoices, call logs (if applicable)
- Any safety documentation/photos

### DO NOT POST Conditions (Public Reply Prohibited)
- Reviewer threatens lawsuit/attorney/legal action (manual-only hold)
- Active safety investigation or regulator involvement
- Any situation where responding could confirm PHI or identify a patient/client

### Recommended Public Reply Patterns
- **Billing dispute:** acknowledge, invite offline to billing channel, no pricing debate.
- **Service failure:** apologize for experience (not fault), commit to review internally, offline CTA.
- **Suspected fake:** state inability to locate record, invite offline verification, no accusations.
- **Harassment/hate:** brief, non-engaging, offline CTA; escalate internally; consider platform report (do not promise removal).

---
## 4) Approved Response Templates v3.0 (IDs + Notes)
**Variable rules (all verticals):** Allowed variables: `{business_name}`, `{support_email}`, `{support_phone}`, `{signoff_role}`. 
**Banned variables:** patient/client name, staff full names, appointment date/time, procedure/service specifics, prices unless reviewer already stated and business verifies.

### Dentist Templates (Google/Yelp)
- **DEN-POS-01 (Positive):**
  “Thank you for the kind words. We appreciate you taking the time to share your experience with {business_name}. If there’s ever anything we can do to help, please reach us at {support_email} or {support_phone}. — {signoff_role}”
- **DEN-NEG-02 (Strong negative, non-PHI):**
  “We’re sorry to hear you had a frustrating experience. We take feedback seriously and would like to learn more so we can address this appropriately. Please contact us at {support_email} or {support_phone}. — {signoff_role}”
- **DEN-FAKE-03 (Suspected fake):**
  “Thank you for the feedback. We can’t confirm details here, and we’re not able to match this experience to our records based on the information provided. Please reach out at {support_email} or {support_phone} so we can look into it. — {signoff_role}”

### Med Spa Templates
- **MSPA-POS-01:**
  “Thank you for sharing your experience with {business_name}. We appreciate your feedback and hope to see you again. For any questions, contact {support_email} or {support_phone}. — {signoff_role}”
- **MSPA-NEG-LEGALSAFE-02:**
  “We’re sorry to hear this. We’d like to discuss your concerns directly and privately. Please contact {support_email} or {support_phone}. — {signoff_role}”
  *(Avoid all outcome language; never mention treatment specifics.)*

### HVAC Templates
- **HVAC-POS-01:**
  “Thanks for the review and for choosing {business_name}. We’re glad we could help. If you need anything else, reach us at {support_email} or {support_phone}. — {signoff_role}”
- **HVAC-NEG-DAMAGE-02 (alleged damage):**
  “We’re sorry to hear about this. We take concerns like this seriously and would like to look into what happened. Please contact {support_email} or {support_phone} so we can follow up directly. — {signoff_role}”

### Yelp vs Google Notes (apply to all templates)
- Do not mention Yelp/Google enforcement, removal, or policy threats.
- Do not solicit reviews with incentives.
- Keep replies brief and de-escalatory; move offline quickly.

---
## 5) Customer-Facing Compliance & Trust One‑Pager (for website)
**Use on landing page or as a PDF.**

**What it is:** AI Review Reply & Reputation Autopilot drafts brand-safe responses to Google Business Profile and Yelp reviews, escalates risky negatives, and summarizes weekly reputation KPIs.

**How we keep replies safe:**
- **Privacy-first:** Responses are designed to avoid confirming any customer/patient relationship or referencing private records.
- **Brand-safe tone:** Replies are non-inflammatory, professional, and focused on resolution.
- **Policy-aligned:** We do not generate incentives, review gating language, or promises to remove reviews. We avoid competitor attacks and personal data.
- **Human control where it matters:** Reviews that contain legal threats, safety incidents, or privacy risk can be automatically placed into **manual review** so nothing posts without approval.
- **Audit trail:** The system can log drafts, flags, approvals, and posting status to support internal accountability.

**Learn more / contact:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
