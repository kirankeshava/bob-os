# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Standards + Approved Templates v3.0

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:15:42.659Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Standards + Approved Templates v3.0

Business website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Google Business Profile + Yelp)

### A. Non‑negotiable “Pre-Generation” Gates (block or force safe mode)
**If any trigger below appears in a review, the system must either (1) switch to a restricted “safe generic” response template, and/or (2) set `post_status=blocked_manual_review` with escalation level.**

1) **PHI / HIPAA / appointment confirmation risk (Healthcare: dentist, med spa)**
- **Hard-block phrases** (examples): “my chart/records”, “your records show”, “we reviewed your chart/visit”, “as your dentist”, “when you were here on [date]”, “your treatment/diagnosis”, medication names tied to identity.
- **Rule:** Never confirm the reviewer is/was a patient/client; never reference visit details; never mention procedures performed, outcomes, or clinical facts.
- **Allowed safe alternative:** “We can’t discuss details here, but we’d like to learn more and help.”
- **Action:** If review contains explicit PHI details, still do **not** mirror/confirm them. If reviewer alleges malpractice/injury: escalate (see Playbook).

2) **Legal threat / intent to sue**
- Triggers: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served papers”, “court”, “demand letter”.
- **Rule:** No public discussion, no admissions, no negotiation.
- **Action:** `blocked_manual_review`, `escalation_level=Legal`.

3) **Safety incident / injury / property damage**
- Triggers: “injured”, “hurt”, “burned”, “bleeding”, “infection”, “fire”, “gas leak”, “carbon monoxide”, “electrical hazard”, “damage”, “flooded”, “broke”.
- **Rule:** Empathize without admitting fault; move offline; collect evidence internally.
- **Action:** `escalation_level=Safety` or `Ops-Critical`; allow posting only if it uses the safe incident template and no liability admission.

4) **Harassment / hate / discrimination / threats**
- Triggers: slurs, threats of violence, targeted harassment.
- **Rule:** Do not engage point-by-point; keep short; invite offline; consider reporting via platform tools.
- **Action:** `blocked_manual_review` if unsafe; otherwise safe template + escalation.

5) **Incentives / solicitation / review gating**
- Triggers (business or reviewer): “discount for review”, “free”, “gift card”, “we’ll refund if you remove”, “we only ask happy customers”, “leave 5 stars”.
- **Rule:** **Never** offer or imply compensation for reviews; never request only positive reviews.
- **Action:** remove incentive language; safe generic reply; escalate to owner if internal practice needs correction.

6) **Competitor disparagement / comparative claims**
- Triggers: “unlike X”, “our competitors”, “they’re scammers” (about others).
- **Rule:** Do not disparage competitors; keep focus on your process.

### B. Response Content Requirements (“Must include”)
Applies to **all** drafts that are eligible to post:
1) **Gratitude + acknowledgement** without arguing.
2) **No liability admission**: avoid “we messed up”, “our fault”, “we were negligent”. Use neutral language: “We’re sorry to hear you had this experience.”
3) **Offline CTA**: invite direct contact via phone/email; provide the support email when appropriate: agent_bob_replit+review-bot@agentmail.to.
4) **Brevity**: 2–6 sentences; no long narratives.
5) **No personal data**: no staff last names, no patient/client confirmation, no addresses beyond business public info.
6) **No medical guarantees** (healthcare): no outcome promises, no “permanent”, “cure”, “guaranteed”.
7) **No platform manipulation**: no asking to edit/remove review; no “Yelp will take this down”; no threats.

### C. “Must NOT include” (blocked phrases/examples)
- **PHI confirmation:** “We reviewed your chart/records/visit”, “As your provider”, “When you came in last Tuesday”.
- **Admission of fault:** “We were wrong”, “It’s our fault”, “We caused”.
- **Medical outcomes/claims:** “Guaranteed results”, “No risk”, “Cure”, “Permanent fix”.
- **Incentives:** “Discount”, “free service”, “gift card”, “refund if you change review”.
- **Doxxing:** full names, phone numbers of individuals, appointment IDs.
- **Hostile tone:** “You’re lying”, “That’s false”, “You must be confused”.

### D. Post-Generation “Posting Gate” (final safety filter)
Before posting, validate:
- Offline CTA present.
- No blocked phrases.
- No PHI confirmation.
- If `escalation_level in {Legal, Safety}` then `post_status=blocked_manual_review` unless explicitly approved by authorized human.

### E. Audit Trail Requirements (minimum fields)
Each review response attempt logs:
- `review_source` (Google/Yelp), `review_id`, `business_id/location_id`
- `review_text_hash`
- `detected_risk_flags[]`, `detector_version`
- `escalation_level`, `hold_reason`
- `draft_version`, `prompt_or_template_id`, `model_version`
- `human_approver_id`, `approval_timestamp`
- `post_status` (drafted/approved/posted/blocked_manual_review/error)
- `posted_timestamp`, `error_code` (if any)
- `final_response_text`

---

## 2) Escalation Playbook v3 (Common Negative Scenarios)

### Escalation levels
- **L0 (Auto-reply OK):** standard positive/neutral/mild negative.
- **L1 (Ops follow-up):** service dissatisfaction, delays, rudeness claims without threats.
- **L2 (Billing/Refund):** pricing disputes, refund demands, contract confusion.
- **L3 (Safety/Critical):** alleged injury, unsafe work, property damage, infection.
- **L4 (Legal / Manual-only hold):** “sue/attorney/lawsuit”, defamation threats, regulator complaint + legal language.
- **L5 (PHI/HIPAA risk hold):** any situation where a response risks confirming patient/client relationship or details.

### SLAs (internal routing)
- **L3 Safety/Critical:** Owner/GM within **4 hours**.
- **L4 Legal:** Owner + Legal same-day; **do not post** until reviewed.
- **L2 Billing:** Billing lead within **24 hours**.
- **L1 Ops:** Ops manager within **24 hours**.

### Evidence collection checklist (internal, not public)
- Photos/videos, job notes, timestamps, invoices, call logs.
- Staff on duty, route history (HVAC), appointment schedule (healthcare) — **never referenced publicly**.
- Any platform messages.

### DO-NOT-POST conditions (always manual-only hold)
- Reviewer threatens legal action.
- Reviewer includes PHI or requests PHI confirmation.
- Safety incident under investigation.
- Harassment/threats where responding could inflame.

### Scenario guidance (what to do + safe public stance)
1) **Service quality complaint (L1):** Apologize for experience, invite offline, avoid arguing.
2) **Billing dispute/refund demand (L2):** Acknowledge concern, invite offline to review account, no pricing details unless already public and verified.
3) **No-show/late arrival (L1):** Acknowledge scheduling frustration, invite offline; avoid blaming customer.
4) **Alleged damage/injury (L3):** Empathize, state you want to address promptly, invite offline immediately; no admissions.
5) **Discrimination claim (L3/L4 depending on threat level):** Take seriously, invite offline to investigate; route to owner; keep response minimal.
6) **Suspected fake review (L1):** Don’t accuse; say you can’t locate the interaction and invite offline to verify details.
7) **HIPAA/PHI mention (L5):** Use healthcare-safe template; never confirm relationship.
8) **Legal threat (L4):** Block posting; manual-only hold; no public engagement.

---

## 3) Approved Response Template Library v3 (Ready to paste)
**Global variable rules:**
- Allowed: {BusinessName}, {City}, {SupportEmail}, {SupportPhone}, {OwnerOrManagerFirstName}, {ServiceCategory}.
- Not allowed: reviewer name beyond first name if already shown publicly; staff last names; appointment dates; pricing unless publicly posted and verified; any clinical details.

### Platform notes
- **Google Business Profile:** Keep concise; no incentives; no claims of removal.
- **Yelp:** Same constraints; additionally avoid mentioning Yelp moderation/removal promises; do not encourage customers to update/remove reviews.


### A) Dentist templates (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience. If there’s ever anything we can do to help, please reach us at {SupportEmail}.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for the feedback. We’re always working to improve the experience at {BusinessName}. If you’re open to sharing more, please contact us at {SupportEmail} so we can learn and follow up.”

**DENT-MNEG-01 (Mild negative: wait time, communication)**
“We’re sorry to hear your visit didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help. Please reach out to {SupportEmail} or {SupportPhone}.”

**DENT-SNEG-01 (Strong negative, non-legal)**
“Thank you for bringing this to our attention. We take concerns seriously and want to look into it promptly. Please contact our team at {SupportEmail} so we can follow up directly.”

**DENT-PHI-01 (PHI/HIPAA safe generic)**
“We’re sorry to hear this. For privacy reasons, we can’t discuss or confirm any details here. Please contact us at {SupportEmail} so we can address your concerns directly.”

**DENT-FAKE-01 (Suspected fake/non-patient)**
“Thanks for posting. We’re unable to verify the situation from the information provided, and we’d like to look into it. Please contact us at {SupportEmail} with any details you’re comfortable sharing.”


### B) Med Spa templates (Google/Yelp)
**SPA-POS-01 (Positive)**
“Thank you for the great review! We appreciate you choosing {BusinessName}. If you ever have questions or need support, reach us anytime at {SupportEmail}.”

**SPA-NEU-01 (Neutral)**
“Thanks for the feedback. We’re always working to improve. If you’re willing, please email {SupportEmail} so we can learn more and follow up.”

**SPA-MNEG-01 (Mild negative: front desk, scheduling)**
“We’re sorry to hear this didn’t meet your expectations. We’d like to understand what happened and make it right where possible. Please contact {SupportEmail} so we can follow up directly.”

**SPA-SNEG-01 (Strong negative: dissatisfaction)**
“Thank you for sharing this. We take concerns seriously and would like to discuss next steps privately. Please contact {SupportEmail} and a manager will follow up.”

**SPA-PHI-01 (Privacy-safe)**
“We’re sorry to hear you’re upset. For privacy reasons, we can’t discuss or confirm details in a public forum. Please contact us at {SupportEmail} so we can help.”

**SPA-OUTCOME-01 (No medical/guarantee language)**
“Thank you for the feedback. Results and experiences can vary, and we want to better understand your concerns. Please reach out to {SupportEmail} so we can discuss this privately.”


### C) HVAC templates (Google/Yelp)
**HVAC-POS-01 (Positive)**
“Thank you for the review and for choosing {BusinessName}. We’re glad our team could help. If you ever need anything else, contact us at {SupportEmail}.”

**HVAC-NEU-01 (Neutral)**
“Thanks for the feedback. We’re always working to improve our service. Please email {SupportEmail} if you’d like to share more so we can follow up.”

**HVAC-MNEG-01 (Mild negative: scheduling/communication)**
“We’re sorry to hear this was frustrating. We’d like to understand what happened and see how we can help. Please contact {SupportEmail} or {SupportPhone}.”

**HVAC-SNEG-01 (Strong negative: workmanship complaint)**
“Thank you for bringing this to our attention. We take workmanship concerns seriously and want to look into it. Please reach out to {SupportEmail} so a manager can follow up directly.”

**HVAC-DAMAGE-01 (Alleged damage—no admission)**
“We’re sorry to hear about this and we want to address it promptly. We can’t resolve details publicly, but please contact {SupportEmail} so we can review what happened and determine next steps.”

**HVAC-FAKE-01 (Suspected fake)**
“Thank you for posting. We’re unable to match this experience to our records from the details here, and we’d like to investigate. Please contact {SupportEmail} with any information you can share.”


---

## 4) Ongoing QA Sampling + Change Control (Ops standard)
- **Monthly QA:** sample 30–50 reviews across verticals and severity buckets (positive/neutral/negative/legal/PHI). Track pass/fail against checklist.
- **Any prompt/model change requires:**
  1) re-run high-risk tests (PHI, legal, safety, incentives, competitor disparagement)
  2) verify offline CTA presence
  3) confirm `blocked_manual_review` is enforced for Legal + PHI holds
  4) verify audit log completeness and weekly KPI reconciliation.

## 5) Go/No-Go minimum bar (launch)
- 0 open P0/P1 issues in PHI/legal/safety categories.
- 100% compliance with posting gate: legal threats always manual-only hold.
- Audit logs contain required fields for draft→approval→post/blocked.
- Weekly KPI report reconciles: drafted, approved, posted, blocked, error counts.

End of v3.0