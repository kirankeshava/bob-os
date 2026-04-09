# AI Review Reply & Reputation Autopilot — QA/Compliance Deliverables v4 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:57:45.611Z

---

## 1) QA Test Report v4 — Final Summary (appendix-ready)
**Scope tested:** 45 core reviews across Dentist/Med Spa/HVAC + 6 Yelp-specific edge cases (removal accusations, competitor baiting, incentive baiting, discount demand, “report to Yelp” threats, public back-and-forth).

**Final results:**
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

**Controls verified (must remain enforced):**
1) **PHI / HIPAA safety:** Never confirm a patient/client relationship, appointment, procedure, chart/records, or outcome. Hard-block phrases like “we reviewed your chart/records/visit” and force generic language.
2) **Legal threat handling:** If review contains “attorney/lawyer/lawsuit/sue/legal action,” system must set **response_mode = HOLD_MANUAL_ONLY**, **escalation_level = Legal**, and **post_status = blocked_manual_review**.
3) **No liability admission:** No “we caused/our fault/we damaged,” no “malpractice/negligence,” no “we violated.” Use empathy + offline resolution.
4) **No medical outcomes guarantees (Dentist/Med Spa):** Avoid “guaranteed,” “permanent,” “100%,” or claims implying outcomes. Avoid diagnostic language.
5) **No incentives / review gating:** Never offer discounts/freebies to change/remove reviews; never ask only happy customers to review.
6) **No doxxing / personal data:** Never mention staff last names, patient identity, address/phone/email beyond generic business contact.
7) **No competitor disparagement:** Do not accuse competitors or reviewer of being a competitor; only state neutral policy and invite offline contact.
8) **Required offline CTA:** For any neutral/negative content: invite to contact via official channel; do not argue publicly.

**Launch exit criteria (Go/No-Go):**
- Posting gate prevents any response when **response_mode=HOLD_MANUAL_ONLY** (both API + UI).
- Audit log emits required events: `draft_created`, `flagged`, `approved`, `blocked`, `posted` and required fields (see checklist).
- Weekly KPIs reconcile: `approved_count = posted_count + blocked_count + pending_count` for same period.

---

## 2) Brand-Safety Checklist v3 (Google Business Profile + Yelp)
Use this as a pre-post checklist for any drafted response.

### A. Identity / privacy / data protection
- [ ] **Do NOT confirm identity or relationship** (patient/client/customer) unless reviewer already explicitly self-identifies AND you still keep response generic.
- [ ] No PHI/PII: no appointment dates, procedure names tied to a person, invoices tied to a person, addresses, phone numbers of individuals, email addresses, medical details.
- [ ] **Hard-block phrases** (must not appear in final response):
  - “we reviewed your chart/records/visit/appointment”
  - “according to our records”
  - “our notes show”
  - “you were seen on”
  - Any personal name + service details (e.g., “John, your root canal…”) 
- [ ] Safe alternative phrasing:
  - “We can’t discuss details here, but we’d like to help—please contact our office directly.”

### B. Tone & de-escalation
- [ ] No sarcasm, no blaming, no calling reviewer a liar, no threats.
- [ ] Use empathy + accountability **without admitting liability**.
- [ ] Avoid inflammatory labels (“fake,” “scam,” “extortion”)—use “we can’t locate this experience” instead.

### C. Liability / legal
- [ ] Do not admit fault: ban “our fault,” “we caused,” “we damaged,” “we injured,” “we overcharged intentionally.”
- [ ] If legal threat terms appear (attorney/lawsuit/sue): **DO NOT POST** → set manual-only hold + escalate Legal.
- [ ] Do not mention insurance determinations or legal conclusions.

### D. Medical/health compliance (Dentist + Med Spa)
- [ ] No medical advice, diagnosis, or treatment plan publicly.
- [ ] No outcome guarantees: ban “guaranteed,” “permanent,” “cure,” “100%,” “no risk.”
- [ ] No before/after claims about the reviewer.

### E. Incentives, solicitation, and platform-policy alignment
- [ ] No incentives to remove/change review (discounts, freebies, gift cards).
- [ ] No “review gating” language (“if you had a good experience, leave a review”).
- [ ] Yelp: never imply Yelp will remove reviews; never encourage reviewers to update in exchange for benefit.

### F. Competitors & disputes
- [ ] No competitor disparagement or accusations.
- [ ] No back-and-forth: one calm reply max; move offline.

### G. Required structure (neutral/negative reviews)
- [ ] Thank them for feedback + brief empathy.
- [ ] State limitation: can’t discuss details publicly.
- [ ] Invite offline resolution with clear contact path.
- [ ] Sign-off with business/role (no personal name required).

### H. Posting/approval audit trail (must be logged)
Required log fields per response:
- [ ] `review_source` (Google/Yelp)
- [ ] `review_id`
- [ ] `business_id` / `location_id`
- [ ] `review_text_hash`
- [ ] `detected_risk_flags[]`
- [ ] `escalation_level` (None/Ops/Billing/Safety/Legal)
- [ ] `response_mode` (AutoDraft / NeedsApproval / HOLD_MANUAL_ONLY)
- [ ] `draft_version` + `model/prompt_version`
- [ ] `human_approver_id` + `approval_timestamp` (if approved)
- [ ] `post_status` (posted / blocked_manual_review / failed)
- [ ] `posted_timestamp` OR `blocked_timestamp` + `hold_reason`

---

## 3) Escalation Playbook v3 (common negative scenarios)
**Goal:** protect brand + comply with Google/Yelp policies while moving resolution offline.

### Escalation levels
- **None:** safe to respond with template.
- **Ops:** service quality, scheduling, staff behavior (non-safety).
- **Billing:** invoices, pricing disputes, refunds.
- **Safety:** alleged injury, unsafe conditions, damage to property, discrimination/harassment.
- **Legal (manual-only hold):** lawsuit threats, attorney mentioned, regulatory complaints paired with legal language.

### SLAs & routing
- **Safety:** Owner/GM within **4 hours**; Ops lead within **24 hours**.
- **Legal:** Same-day review by designated legal contact; **no posting** until cleared.
- **Billing:** Billing lead within **24 hours**.
- **Ops:** Ops lead within **24 hours**.

### DO-NOT-POST conditions (must set HOLD_MANUAL_ONLY)
- Reviewer mentions: attorney/lawyer/lawsuit/sue/legal action.
- Any PHI entanglement where response might confirm identity (e.g., “my root canal on Tuesday”).
- Threats/harassment/hate speech requiring careful handling.
- Active safety investigation or allegation of serious injury.

### Scenario guidance (what to do + how to respond)
1) **Billing dispute / “overcharged” (Billing)**
   - Collect: invoice number internally (not in public), payment method, line items.
   - Public response: acknowledge concern, state can’t discuss billing publicly, invite contact.

2) **Service quality / rude staff (Ops)**
   - Collect: date/time window, staff on shift, call logs.
   - Public response: apologize for experience, invite offline resolution.

3) **Alleged damage/injury (Safety)**
   - Collect: incident report, photos, job notes, staff statements.
   - Public response: empathy + take offline; **no fault admission**.

4) **Medical dissatisfaction / outcome complaint (Dentist/Med Spa) (Ops/Safety depending severity)**
   - Collect: internal clinical notes; do not reference publicly.
   - Public response: cannot discuss care publicly; invite direct contact.

5) **HIPAA/PHI mention (Safety)**
   - Public response must avoid confirming; use generic language.

6) **Suspected fake review / cannot locate (None/Ops)**
   - Collect: attempt to match review to schedule/order records internally.
   - Public response: state can’t find record; invite contact to verify.

7) **Discrimination/harassment allegation (Safety/Legal depending wording)**
   - Collect: witness statements, policy references.
   - Public response: take seriously, invite offline, no debate.

---

## 4) Approved Response Templates v3 (paste-ready)
**Global rules for all templates:**
- Never confirm PHI/records/appointment.
- Never offer discounts/incentives for review change.
- Never promise removal or threaten consequences.
- For negative/neutral: always include offline CTA.

### Allowed variables
- `{BusinessName}` (required)
- `{ContactMethod}` (e.g., “call our office at (XXX) XXX-XXXX” or “email us at support@…”) — for this business’s customer-facing templates, include: **agent_bob_replit+review-bot@agentmail.to**
- `{Website}` — include: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1**
- `{LocationName}` (optional)

### 4.1 Dentist templates
**DENT-G-01 Positive (Google)**
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience. We appreciate your support and look forward to seeing you again.”

**DENT-Y-01 Positive (Yelp)**
“Thanks for sharing your experience with {BusinessName}. We appreciate you taking the time to leave a review.”

**DENT-G-02 Neutral / light concern (Google)**
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more, please contact us so we can understand what happened and make it right. {ContactMethod}.”

**DENT-Y-02 Neutral / light concern (Yelp)**
“Thanks for the feedback. We’d like to learn more and help if we can. Please reach out directly so we can follow up. {ContactMethod}.”

**DENT-G-03 Strong negative / dissatisfaction (Google)**
“We’re sorry to hear you’re disappointed. We can’t discuss details in a public forum, but we’d like the chance to address your concerns directly. Please contact our office at your convenience: {ContactMethod}.”

**DENT-Y-03 Strong negative / dissatisfaction (Yelp)**
“We’re sorry to hear this. We can’t address details here, but we want to help. Please contact us directly so we can look into it: {ContactMethod}.”

**DENT-ALL-04 PHI-sensitive (Google/Yelp)**
“Thank you for your message. To protect everyone’s privacy, we can’t discuss details here. If you reach out directly, we’ll do our best to help. {ContactMethod}.”

**DENT-ALL-05 Suspected fake / cannot locate (Google/Yelp)**
“We take feedback seriously, but we’re not able to identify this experience from the information provided. If you believe this is related to our office, please contact us directly so we can look into it. {ContactMethod}.”

**DENT-ALL-06 Legal threat (Google/Yelp) — DO NOT POST (internal placeholder)**
Internal note only: “Legal terms detected → HOLD_MANUAL_ONLY; escalate Legal; do not publish a response until reviewed.”

### 4.2 Med Spa templates
**SPA-G-01 Positive (Google)**
“Thank you for visiting {BusinessName} and for your thoughtful review. We’re glad you enjoyed your experience and appreciate your support.”

**SPA-Y-01 Positive (Yelp)**
“Thanks for taking the time to leave a review for {BusinessName}. We appreciate it.”

**SPA-G-02 Appointment/scheduling friction (Google)**
“Thank you for the feedback, and we’re sorry for the frustration. We’d like to learn more and help resolve this—please reach out directly so we can assist. {ContactMethod}.”

**SPA-Y-02 Appointment/scheduling friction (Yelp)**
“We’re sorry to hear this and would like to help. Please contact us directly so we can look into what happened. {ContactMethod}.”

**SPA-ALL-03 Outcome dissatisfaction (no claims) (Google/Yelp)**
“We’re sorry to hear you’re unhappy. We can’t discuss details publicly, but we’d like to understand your concerns and see how we can help. Please contact us directly: {ContactMethod}.”

**SPA-ALL-04 Safety/cleanliness concern (Google/Yelp)**
“Thank you for raising this. We take safety and cleanliness seriously. We’d like to follow up directly to understand what happened—please contact us at {ContactMethod}.”

**SPA-ALL-05 Suspected fake / competitor bait (Google/Yelp)**
“We take all feedback seriously. We’re not able to confirm the situation from this review, but we’d like to look into it. Please contact us directly so we can help. {ContactMethod}.”

**SPA-ALL-06 Legal threat — DO NOT POST (internal placeholder)**
Internal note only: “Legal terms detected → HOLD_MANUAL_ONLY; escalate Legal; do not publish.”

### 4.3 HVAC templates
**HVAC-G-01 Positive (Google)**
“Thank you for choosing {BusinessName}. We appreciate your feedback and are glad our team could help.”

**HVAC-Y-01 Positive (Yelp)**
“Thanks for the review and for choosing {BusinessName}. We appreciate it.”

**HVAC-ALL-02 Late/no-show / scheduling issue (Google/Yelp)**
“We’re sorry for the scheduling frustration. That’s not the experience we want to provide. Please contact us directly so we can look into what happened and help resolve it. {ContactMethod}.”

**HVAC-ALL-03 Pricing/billing dispute (Google/Yelp)**
“Thank you for the feedback. We can’t discuss billing details publicly, but we’d like to review your concerns and help. Please reach out directly at {ContactMethod}.”

**HVAC-ALL-04 Alleged damage (no liability admission) (Google/Yelp)**
“We’re sorry to hear this and appreciate you bringing it to our attention. We can’t address details here, but we want to look into it promptly. Please contact us directly at {ContactMethod} so we can follow up.”

**HVAC-ALL-05 Suspected fake / cannot locate (Google/Yelp)**
“We take feedback seriously, but we’re not able to identify this job from the information provided. Please contact us directly so we can verify and assist. {ContactMethod}.”

**HVAC-ALL-06 Legal threat — DO NOT POST (internal placeholder)**
Internal note only: “Legal terms detected → HOLD_MANUAL_ONLY; escalate Legal; do not publish.”

---

## 5) Customer-facing contact footer (optional add-on)
Use only when the business wants to explicitly show legitimacy; keep it the same across replies.
“Contact: {ContactMethod}. Learn more: {Website}.”

Recommended default for this MVP’s customer comms:
- ContactMethod: “agent_bob_replit+review-bot@agentmail.to”
- Website: “https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”
