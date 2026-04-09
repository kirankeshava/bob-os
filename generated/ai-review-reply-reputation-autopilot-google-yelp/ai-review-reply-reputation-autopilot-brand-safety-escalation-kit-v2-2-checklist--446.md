# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Kit v2.2 (Checklist + Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:16:04.976Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Kit v2.2

Business website (legitimacy/reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact (support/escalations): agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v2.1 (Google Business Profile + Yelp)

### A. Hard prohibitions (must NEVER appear in a public response)
1. **PHI/HIPAA confirmation (healthcare):** Do not confirm the reviewer is/was a patient or reference visits, charts, x-rays, treatment plans, prescriptions, or appointment details.
   - Block examples: “We reviewed your chart/records/visit,” “When you came in on Tuesday…,” “Your treatment plan…”.
2. **Admitting liability / fault:** Do not admit negligence, malpractice, defective work, or guarantee refunds publicly.
   - Block examples: “We messed up,” “Our technician caused damage,” “We are at fault,” “We will pay for repairs.”
3. **Medical outcome guarantees (med spa/dentist):** No promises/guarantees about results, pain-free experiences, curing conditions, or specific outcomes.
   - Block examples: “Guaranteed results,” “Cures,” “Permanent fix,” “Zero pain for everyone.”
4. **Incentives / solicitation / review gating:** Never offer discounts, gifts, refunds, or perks in exchange for reviews. Never ask only happy customers to review.
   - Block examples: “10% off for a 5-star review,” “If you had a good experience, leave a review,” “We’ll make it right if you update your rating.”
5. **Doxxing / personal data:** Don’t reveal or confirm personal details (full names, addresses, phone, appointment time, invoice numbers) even if reviewer posts them.
6. **Harassment/retaliation/defamation:** No insults, threats, intimidation, or “calling out” the reviewer.
7. **Competitor disparagement:** Do not attack competitors or imply the reviewer should use/avoid a named competitor.
8. **Promises about platform enforcement:** Do not claim you can remove a review or that Yelp/Google will take it down.
   - Block examples: “We’ll get this removed,” “Yelp will delete it,” “Google will take action.”

### B. Required elements in every response
1. **Professional, calm tone:** Thank/acknowledge, no sarcasm, no blame-shifting.
2. **Offline resolution CTA:** Provide a path to continue privately (phone/email). Use the business contact email if no client-specific email exists.
   - Standard CTA: “Please contact us at agent_bob_replit+review-bot@agentmail.to so we can look into this and help.”
3. **No specifics beyond what reviewer wrote:** Mirror only high-level details the reviewer already stated.
4. **No new claims:** Don’t invent facts (dates, staff actions, policies, prices, procedures). If unknown, keep generic.
5. **Apology without liability:** “We’re sorry to hear…” is OK; avoid “we caused…”

### C. Risk flags → escalation rules (minimum)
- **PHI/health details present** → Escalation: HIPAA/Privacy. Response must be generic + offline CTA. If reviewer includes identifying info, still do not confirm.
- **Legal threat (“attorney/lawsuit/sue”)** → Response mode: **HOLD — manual-only**; no auto-post.
- **Safety incident / injury / alleged property damage** → Escalation: Safety/Claims. Avoid admissions.
- **Discrimination/harassment allegations** → Escalation: HR/Owner. Do not argue publicly.
- **Suspected fake review / not in records** → Escalation: Verification. Public response should not accuse; invite offline verification.

### D. Platform alignment quick rules
- **Google Business Profile:** Allowed to respond professionally; avoid incentives, spam, personal data.
- **Yelp:** Same constraints; additionally avoid implying “Yelp will remove” or discussing moderation outcomes. Keep responses short, non-combative.

---
## 2) Escalation Playbook v2.1 (common negative scenarios)

### Escalation Levels
- **L0 Auto-respond OK:** mild dissatisfaction, vague complaints, general praise.
- **L1 Needs human approval:** strong negative tone, refund demands, staff named, pricing dispute.
- **L2 Manual-only hold (do not post):** legal threats, PHI/HIPAA complexities, safety incidents with injury, ongoing investigations, harassment threats.

### Routing SLAs (recommended)
- **Legal threats (L2):** Legal/Owner same business day.
- **Safety/injury/property damage (L2):** Owner/GM within 4 hours.
- **Discrimination/harassment (L2):** Owner/HR within 4 hours.
- **Billing/pricing dispute (L1):** Billing/Ops within 24 hours.
- **Service failure / missed appointment / rude staff (L1):** Ops/GM within 24 hours.
- **Suspected fake review (L1):** Manager within 24 hours.

### Scenario guidance
1) **Billing/pricing dispute**
- Do: acknowledge concern, invite offline review of account, avoid citing numbers.
- Don’t: post invoice details, argue line items publicly.
- Evidence: invoice, estimate, signed authorization, call notes.

2) **Service quality complaint (HVAC/dentist/med spa)**
- Do: apologize for experience, request offline contact, state you want to make it right.
- Don’t: admit wrongdoing; don’t debate.
- Evidence: work order, tech notes, before/after photos (HVAC), clinical notes (internal only).

3) **Alleged damage/injury/safety issue** (L2)
- Do: express concern, state you’d like to discuss privately, escalate internally.
- Don’t: admit fault, promise payment.
- Evidence: incident report, photos, witness notes, insurance info.

4) **Discrimination/harassment allegation** (L2)
- Do: take seriously, invite private discussion, escalate to HR/Owner.
- Don’t: contradict details publicly.
- Evidence: staff schedules, camera logs if applicable, written statements.

5) **HIPAA/PHI mention (dentist/med spa)** (L1/L2 depending on specificity)
- Do: generic language only; never confirm patient relationship.
- Don’t: reference “your visit” or “your records.”
- Evidence: internal privacy incident log.

6) **Legal threat / demand letter / “my attorney”** (L2 HOLD)
- Action: Do not auto-post. Route to Owner/Legal. Optional minimal holding reply only if Legal approves.
- Evidence: screenshots, timestamps.

7) **Suspected fake review / competitor**
- Do: invite offline verification; use neutral phrasing: “We can’t locate details from this post; please contact us…”.
- Don’t: accuse reviewer of lying or being a competitor.

### DO NOT POST conditions (absolute)
- Reviewer includes sensitive medical details + response would likely confirm identity.
- Any legal threat wording detected.
- Any safety incident with injury/property damage pending investigation.

---
## 3) Approved Response Templates v2.2 (per vertical)

**Global rules for all templates:**
- Allowed variables: {BusinessName}, {FirstNameOrGeneric}, {ContactEmail}=agent_bob_replit+review-bot@agentmail.to, {PhoneOptional}, {ServiceGeneric}.
- Forbidden variables: staff full names, appointment dates/times, treatment details, prices unless reviewer already stated and business has verified.
- Always include an offline CTA.

### 3.1 Dentist Templates
**DENT-POS-01 (Positive)**
“Thanks for the kind words, {FirstNameOrGeneric}. We appreciate you taking the time to share your feedback. If there’s anything we can do to support you, please reach out anytime at {ContactEmail}.”

**DENT-NEU-01 (Neutral/brief)**
“Thank you for your feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at {ContactEmail} so we can follow up directly.”

**DENT-NEG-M1 (Mild negative: wait time/communication)**
“We’re sorry to hear your experience didn’t meet expectations. We take feedback like this seriously and would like to learn more. Please email us at {ContactEmail} so we can look into what happened and help.”

**DENT-NEG-S1 (Strong negative: pain/poor outcome claim — no PHI confirmation)**
“Thank you for sharing your concerns. We’re sorry you’re feeling this way. Because we can’t discuss personal or health-related details publicly, we’d like to connect privately to understand what happened and see how we can help. Please contact us at {ContactEmail}.”

**DENT-FAKE-01 (Suspected fake/unmatched)**
“Thank you for the feedback. We take concerns seriously, but we can’t confirm details publicly. Please contact us at {ContactEmail} with information that can help us locate the interaction so we can follow up.”

**DENT-RECOV-01 (Service recovery: invite offline resolution)**
“We appreciate you bringing this to our attention. Our goal is a respectful, helpful experience for everyone. Please reach out at {ContactEmail} so we can discuss next steps privately.”

### 3.2 Med Spa Templates
**MEDSPA-POS-01 (Positive)**
“Thank you, {FirstNameOrGeneric}. We appreciate your feedback and are glad you took the time to share it. If you ever need anything, contact us at {ContactEmail}.”

**MEDSPA-NEU-01 (Neutral)**
“Thank you for your review. We’re always looking for ways to improve. If you’d like to share more context, please email us at {ContactEmail}.”

**MEDSPA-NEG-M1 (Mild negative: scheduling/front desk)**
“We’re sorry to hear this wasn’t a smooth experience. We’d like to understand what happened and improve. Please contact us at {ContactEmail} so we can follow up privately.”

**MEDSPA-NEG-S1 (Strong negative: “burn/scar/wrong treatment”)**
“Thank you for letting us know. We’re sorry you’re upset and we take concerns like this seriously. We can’t discuss personal or health-related details here, but we want to connect privately to understand the situation. Please reach out at {ContactEmail}.”

**MEDSPA-FAKE-01 (Suspected fake)**
“Thank you for the feedback. We’d like to look into this, but we can’t confirm details publicly. Please contact us at {ContactEmail} so we can identify the interaction and follow up.”

**MEDSPA-RECOV-01 (Service recovery)**
“We appreciate you raising this. Our team aims to provide a professional experience, and we want to address your concerns directly. Please contact us at {ContactEmail} so we can help.”

### 3.3 HVAC Templates
**HVAC-POS-01 (Positive)**
“Thanks for the review, {FirstNameOrGeneric}. We appreciate the opportunity to help and are glad you shared your experience. If you need anything else, reach us at {ContactEmail}.”

**HVAC-NEU-01 (Neutral)**
“Thank you for your feedback. We’re always working to improve service and communication. If you can share more details, please contact us at {ContactEmail}.”

**HVAC-NEG-M1 (Mild negative: late arrival/no-show)**
“We’re sorry about the inconvenience and appreciate you bringing this up. Please contact us at {ContactEmail} so we can look into the scheduling details and make this right.”

**HVAC-NEG-S1 (Strong negative: “broke something/unsafe”)**
“Thank you for sharing your concerns. We take safety and workmanship seriously. We’d like to discuss this directly, but we can’t resolve details in a public thread. Please contact us at {ContactEmail} so we can follow up promptly.”

**HVAC-FAKE-01 (Suspected fake)**
“Thank you for the feedback. We’d like to investigate, but we can’t confirm details publicly. Please contact us at {ContactEmail} with information that helps us locate the job so we can assist.”

**HVAC-RECOV-01 (Service recovery)**
“We appreciate you letting us know. Our goal is a straightforward, professional service experience. Please contact us at {ContactEmail} so we can review what happened and help resolve this.”

---
## 4) Policy Alignment Appendix (Google Business Profile + Yelp)

### Must-not-do (both platforms)
- No incentives for reviews; no discounts/compensation conditioned on reviews.
- No review gating (don’t ask only happy customers).
- No personal data disclosure; don’t confirm customer identity.
- No harassment, retaliation, or inflammatory language.

### Additional “never say” patterns (Yelp-sensitive)
- Don’t claim or imply Yelp/Google will remove reviews.
- Don’t discuss moderation outcomes.
- Don’t threaten to report users or “take action” publicly.

### Testable acceptance criteria (for QA/engineering)
- If response contains any PHI-confirmation phrase (“your records/chart/visit/appointment”), system must block or rewrite to generic non-confirming language.
- If legal-threat terms present (“sue/lawsuit/attorney”), set response mode to HOLD/manual-only and ensure post_status becomes blocked_manual_review.
- If incentive terms detected (“discount/free gift for review”), block posting and flag PolicyViolation_Incentives.
- Every posted response includes offline CTA and contains no new factual claims not in the review.
