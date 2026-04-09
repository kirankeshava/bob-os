# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:41:04.563Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3

Business website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 — Executive Summary (for stakeholders)

### Scope
End-to-end QA across Google Business Profile (GBP) + Yelp response drafting and posting controls.
- Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific edge cases (removal accusations, competitor comparisons, solicitation/incentive bait, discount demands, “report to Yelp” threats, public back-and-forth baiting)

### Final results (post-guardrails)
- Core suite pass rate: 45/45 (100%)
- Yelp addendum pass rate: 6/6 (100%)

### Guardrails required to maintain compliance
**Hard blocks / forced generic language:**
- PHI/HIPAA adjacency block: if review contains “records/chart/visit/appointment details” or attempts to force confirmation, response must be generic and must not confirm they were a patient.

**Manual-only holds (no posting):**
- Legal threats detector: “attorney, lawsuit, sue, legal action, subpoena” → `response_mode = hold_manual_only`, `escalation_level = Legal`, `post_status = blocked_manual_review`.
- Safety incidents / injury claims: optionally also treated as manual-only holds per the playbook.

**Always-required elements (both platforms):**
- Polite acknowledgement (non-inflammatory)
- No admission of fault/liability
- Encourage offline resolution (phone/email)
- No personal data, no staff full names, no appointment details

### Acceptance criteria (ship/no-ship)
Engineering must demonstrate with logs that:
1) Manual-only hold prevents posting via API **and** UI (cannot be bypassed).
2) Audit trail includes required fields + events (draft_created, flagged, blocked/held, approved, posted).
3) Weekly KPI report reconciles: approved vs posted vs blocked counts and shows escalation totals.

---

## 2) Brand-Safety Checklist v3 (tick-box, ops-ready)

Use this checklist for **every** drafted response before approval/posting.

### A. Platform policy alignment (Google + Yelp)
- [ ] No incentives or compensation offered/solicited (no “discount,” “free,” “gift card,” “we’ll refund if you remove”).
- [ ] No review gating language (no “contact us first before posting,” no “only post if satisfied”).
- [ ] No promises of removal (“we’ll get Yelp/Google to take this down”).
- [ ] No competitor disparagement or comparisons.
- [ ] No accusations about reviewer identity as fact (“you’re a competitor/fake”)—if suspected, use neutral phrasing.

### B. Privacy / PHI / personal data
- [ ] Do **not** confirm they are a customer/patient/client.
- [ ] Do **not** reference “your visit/appointment/records/chart/treatment plan.”
- [ ] Do **not** mention diagnosis, outcomes, medications, procedures, or anything that could be PHI.
- [ ] Do **not** include personal data (phone numbers beyond the business line, emails beyond the business email, addresses, staff last names, license IDs).

### C. Liability / legal safety
- [ ] Do **not** admit fault (avoid: “we made a mistake,” “our technician broke,” “we misdiagnosed”).
- [ ] Do **not** promise specific remediation publicly (“we will refund you”)—move to offline.
- [ ] If legal threat language is present: **DO NOT POST**; set `hold_manual_only` and escalate Legal.

### D. Medical / regulated claims (Dentist + Med Spa)
- [ ] No guarantees of outcomes (“permanent,” “pain-free,” “cured,” “100% safe”).
- [ ] No personalized medical advice.
- [ ] Use generic safety language: “We take concerns seriously” without clinical detail.

### E. Tone & de-escalation
- [ ] Non-inflammatory, non-argumentative; no sarcasm.
- [ ] Validate feelings without conceding facts (“We’re sorry to hear you felt…”).
- [ ] Avoid blaming the customer.

### F. Required response structure
- [ ] Thank/acknowledge.
- [ ] Brief empathy/apology for experience (not admission).
- [ ] Offline CTA with business contact method.
- [ ] Invitation to continue privately; close professionally.

### Blocked phrases (replace with safe alternatives)
**Block:** “We reviewed your chart/records/visit/appointment notes”  
**Use:** “We can’t discuss specifics here, but we’d like to connect offline to understand what happened.”

**Block:** “We will sue / you will hear from our attorney”  
**Use:** (No post; manual-only hold)

**Block:** “If you update/remove your review…”  
**Use:** “We’d like to make things right—please contact us directly.”

---

## 3) Escalation Playbook v3 (common negative scenarios)

### Escalation levels
- **L0:** Normal (safe to draft + post after human approval)
- **L1:** Needs Ops follow-up (post allowed after approval)
- **L2:** Sensitive (manual review required; may post after internal confirmation)
- **L3:** **Manual-only hold (DO NOT POST)** until cleared

### Universal DO-NOT-POST triggers (force L3)
- Legal threats or mention of attorney/lawsuit/sue
- Explicit PHI/medical-record demands where response risks confirming patient status
- Threats/harassment/violence
- Ongoing safety investigation or alleged severe injury where facts unknown

### Scenario routing + SLA
1) **Billing dispute / refund demand** → L1 → Route: Billing/Ops, SLA <24h  
   Evidence: invoice ID, service date (internal only), prior communications.  
   Public response: acknowledge, invite offline, no public refund promises.

2) **Service quality complaint (HVAC late/no-show, rude staff)** → L1 → Route: Ops/GM, SLA <24h  
   Evidence: dispatch logs, technician notes (internal), call recording (internal).

3) **Alleged property damage (HVAC) / injury** → L2 or L3 depending severity  
   Route: Owner/GM, SLA <4h for safety/injury.  
   Evidence: photos, work order, technician statement, insurance details (internal).

4) **Clinical/medical dissatisfaction (Dentist/Med Spa)** → L2  
   Route: Clinical lead/practice manager, SLA <24h.  
   Evidence: internal chart review (internal only), consent forms.  
   Public response must not confirm treatment; use generic phrasing.

5) **Discrimination/harassment allegations** → L2 (or L3 if legal threat)  
   Route: Owner/HR, SLA <4–24h depending severity.  
   Evidence: staff statements, CCTV if applicable.

6) **Suspected fake review / competitor** → L1  
   Route: Ops/Owner, SLA <24h.  
   Evidence: customer lookup (internal), booking logs.  
   Public response: neutral; do not accuse; invite offline.

### Internal resolution checklist (before posting on L2)
- Confirm: what happened, what can be said publicly, and whether any PHI exists.
- If any uncertainty: keep response generic and offline-focused.

---

## 4) Approved Response Templates Library v3

### Global constraints (all templates)
Allowed variables (if verified): `{business_name}`, `{support_phone}`, `{support_email}`  
Banned variables: customer names, appointment dates, treatment/procedure details, prices unless customer provided and verified safe, staff last names.

Offline CTA standard line (recommended):  
“Please contact us at {support_phone} or {support_email} so we can learn more and help.”

#### Platform notes
- **Google Business Profile:** Keep concise; avoid arguing. No incentives; no removal promises.
- **Yelp:** Same constraints; additionally avoid discussing Yelp moderation/enforcement; do not imply Yelp will remove reviews.

---

# DENTIST (6 templates)

**DEN-POS-01 (Positive)**
“Thank you for the kind words and for taking the time to leave a review. We truly appreciate it and are glad you had a great experience. If there’s ever anything we can do to help, please reach out at {support_phone} or {support_email}. — {business_name}”

**DEN-NEU-02 (Neutral / short)**
“Thanks for your feedback. We’re always working to improve the experience. If you’re open to sharing more details, please contact us at {support_phone} or {support_email}. — {business_name}”

**DEN-MNEG-03 (Mild negative: wait time / communication)**
“Thank you for letting us know. We’re sorry to hear the experience didn’t meet expectations. We can’t discuss specifics here, but we’d like to understand what happened and see how we can help. Please contact us at {support_phone} or {support_email}. — {business_name}”

**DEN-SNEG-04 (Strong negative: pain/complication claim, no PHI)**
“We’re sorry to hear you’re feeling this way. Because privacy is important, we can’t address details in a public forum. We’d like to connect directly to better understand your concerns and discuss next steps. Please contact us at {support_phone} or {support_email}. — {business_name}”

**DEN-FAKE-05 (Suspected not-a-patient / mistaken identity)**
“Thank you for the review. We take feedback seriously, but we’re not able to identify the experience from the information provided. We’d like to look into this—please contact us at {support_phone} or {support_email}. — {business_name}”

**DEN-RECOV-06 (Service recovery without admitting liability)**
“Thank you for sharing your feedback. We aim to provide a positive experience, and we’d like the opportunity to learn more and improve. Please contact us at {support_phone} or {support_email} so we can help. — {business_name}”

---

# MED SPA (6 templates)

**MSPA-POS-01 (Positive)**
“Thank you for your review. We really appreciate you taking the time to share your experience. If you ever have questions or need anything, please contact us at {support_phone} or {support_email}. — {business_name}”

**MSPA-NEU-02 (Neutral)**
“Thank you for the feedback. We’re always working to improve and would love to hear more. Please contact us at {support_phone} or {support_email}. — {business_name}”

**MSPA-MNEG-03 (Mild negative: scheduling/front desk)**
“We’re sorry to hear this was frustrating. We can’t discuss details publicly, but we’d like to learn more and help resolve this. Please contact us at {support_phone} or {support_email}. — {business_name}”

**MSPA-SNEG-04 (Strong negative: results dissatisfaction; no outcome guarantees)**
“Thank you for sharing your concerns. We understand how important it is to feel comfortable with your experience. For privacy reasons we can’t address specifics here, but we’d like to speak with you directly. Please contact us at {support_phone} or {support_email}. — {business_name}”

**MSPA-FAKE-05 (Suspected fake)**
“We take feedback seriously, but we’re unable to locate the experience based on what was shared. If you’re open to it, please contact us at {support_phone} or {support_email} so we can look into this. — {business_name}”

**MSPA-RECOV-06 (Service recovery)**
“Thank you for the feedback. We’d like the chance to learn more and improve. Please contact us at {support_phone} or {support_email} so we can help. — {business_name}”

---

# HVAC (6 templates)

**HVAC-POS-01 (Positive)**
“Thank you for the great review. We appreciate your trust and are glad the team could help. If you need anything in the future, please reach out at {support_phone} or {support_email}. — {business_name}”

**HVAC-NEU-02 (Neutral)**
“Thanks for the feedback. We’re always looking for ways to improve. If you can share more details, please contact us at {support_phone} or {support_email}. — {business_name}”

**HVAC-MNEG-03 (Mild negative: timing/communication)**
“We’re sorry to hear the experience wasn’t what you expected. We’d like to understand what happened and help. Please contact us at {support_phone} or {support_email}. — {business_name}”

**HVAC-SNEG-04 (Strong negative: damage claim without admitting liability)**
“Thank you for bringing this to our attention. We take concerns seriously and would like to look into this directly. We can’t resolve specifics publicly, but please contact us at {support_phone} or {support_email} so we can help. — {business_name}”

**HVAC-FAKE-05 (Suspected fake / cannot locate job)**
“Thank you for the review. We take feedback seriously, but we can’t identify the service based on the details provided. Please contact us at {support_phone} or {support_email} so we can look into it. — {business_name}”

**HVAC-RECOV-06 (Service recovery)**
“Thank you for the feedback. We’d like the opportunity to learn more and improve. Please contact us at {support_phone} or {support_email} so we can help. — {business_name}”

---

## 5) Posting/Approval Audit Trail — Minimum required fields (must log)
- review_source (google|yelp)
- review_id
- business_id / location_id
- review_text_hash
- created_at
- detected_risk_flags[] (e.g., PHI, LegalThreat, IncentiveBait, CompetitorMention)
- escalation_level (L0–L3)
- response_mode (auto|needs_manual_review|hold_manual_only)
- draft_version + model/prompt_version + detector_version
- human_approver_id + approval_timestamp
- post_status (pending|posted|blocked_manual_review|error)
- posted_timestamp (if posted)
- final_response_text
- hold_reason + blocked_timestamp + unblocker_id (if applicable)

## 6) Ongoing compliance regression (recommended cadence)
- Weekly: rerun the 6 Yelp-specific edge cases + 10 random mixed reviews.
- Monthly: rerun full 45-case suite; add 5 new edge cases from real customer feedback.

End of Pack v3.
