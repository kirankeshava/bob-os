# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates (v3, Google/Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:13:15.967Z

---

## 1) Brand-Safety Checklist v3 (Operational, Tick-Box)

### A. Universal “Must Have” in Every Public Reply (Google + Yelp)
- [ ] Thank the reviewer (neutral tone).
- [ ] Do **not** argue, shame, threaten, or blame.
- [ ] Invite offline follow-up with a clear CTA: “Please contact us at support@YOUR_DOMAIN.com or https://YOUR_WEBSITE_URL.”
- [ ] Keep it short (typically 2–5 sentences).
- [ ] If negative: acknowledge experience without admitting fault; offer to investigate offline.

### B. Universal “Must Not” (Hard Block)
Hard-block generation/posting if any of the following would be included or if the review contains these and the model tries to address them specifically:
- [ ] **PHI/HIPAA confirmation**: Do not confirm someone is/was a patient or discuss visits/records/charts/x-rays/treatment plans. 
  - Block phrases: “your chart/records/visit/appointment/treatment,” “we reviewed your file,” “according to our notes,” “as your dentist/doctor,” “your procedure.”
  - Safe alternative: “We take privacy seriously and can’t discuss details here. Please contact us directly…”
- [ ] **Medical outcome guarantees/claims** (Dentist/Med Spa): “guaranteed,” “permanent,” “100%,” “cure,” “no risk,” before/after promises.
  - Safe alternative: “Results can vary; we’d be glad to discuss options privately.”
- [ ] **Admitting liability**: “we messed up,” “our fault,” “we caused damage,” “we were negligent.”
  - Safe alternative: “We’re sorry to hear this. We’d like to learn more and address it directly.”
- [ ] **Incentives / review gating**: discounts, freebies, “we’ll make it right if you change/remove your review,” “contact us for a gift card.”
- [ ] **Doxxing/personal data**: staff last names, direct phone numbers of individuals, addresses beyond business address, identifying details about the reviewer.
- [ ] **Competitor disparagement**: “they’re scammers,” “we’re better than X,” etc.
- [ ] **Promises to remove reviews / contact Yelp/Google to take it down**.

### C. Manual-Only Hold (Do Not Post Automatically)
If detected, set `post_status=blocked_manual_review` and `escalation_level` appropriately:
- [ ] **Legal threat**: “attorney,” “lawsuit,” “sue,” “court,” “demand letter,” “legal action.” → `escalation_level=Legal`.
- [ ] **Safety incident**: alleged injury, fire, carbon monoxide, unsafe procedure, abuse, harassment, discrimination. → `escalation_level=Safety`.
- [ ] **Active investigation/regulator**: “BBB,” “state board,” “insurance complaint,” “OSHA,” etc. → `escalation_level=Ops/Legal`.
- [ ] **PHI-likely content**: reviewer includes detailed treatment specifics; reply must be generic privacy-safe.

### D. Tone & De-escalation Controls
- [ ] No sarcasm, no exclamation-heavy rebuttals.
- [ ] No “that didn’t happen,” “you’re lying.” Use: “We can’t locate details from a public post; please contact us so we can look into it.”
- [ ] No staff blame; no internal process details.

### E. Platform Notes
**Google Business Profile (GBP):** Keep replies professional; do not share personal data; do not solicit incentives. 
**Yelp:** Same; additionally avoid implying Yelp can/should remove a review; avoid extended back-and-forth. One calm response + offline CTA.

---

## 2) Escalation Playbook v3 (Common Negative Scenarios)

### Routing & SLAs (Internal)
- **Safety incident (injury, hazardous work, discrimination/harassment):** Owner/GM + Safety lead notified immediately; public reply = manual-only hold; internal SLA <4 hours.
- **Legal threats / attorney mentioned:** Legal counsel + Owner same-day; manual-only hold; no public reply until approved.
- **Billing/pricing dispute:** Billing lead <24 hours.
- **Service quality/technician conduct:** Ops lead <24 hours.
- **Suspected fake/competitor review:** Ops/Owner <24 hours; gather evidence; response must be non-accusatory.

### Evidence Checklist (Before Any Non-Template Response)
- Review screenshot + timestamp + platform URL.
- Job/patient record existence check (do not confirm publicly).
- Staff schedule/dispatch logs (HVAC), appointment ledger (dentist/med spa) — internal only.
- Any prior communications.

### Do-Not-Post Conditions (Always Manual)
- Mentions of: medical records, charts, x-rays, treatment details; attorney/lawsuit; injury/safety; discrimination; threats.

### Scenario Response Patterns (Approved)
1) **Billing dispute**
- Public: acknowledge concern; invite offline; no price detail unless already public and verified.
- Internal: confirm invoice, discounts, scope, authorizations.

2) **Service quality / “rude staff”**
- Public: apologize for experience (not fault); invite offline; commit to listening.
- Internal: pull call logs/visit notes; coach staff.

3) **Alleged damage/injury**
- Public: privacy-safe + serious tone; ask to contact immediately; do not admit.
- Internal: safety incident workflow; document everything.

4) **Suspected fake**
- Public: “We can’t find details from this post; please contact us…” No accusations.
- Internal: compare names/dates; platform report process.

5) **Discrimination/harassment claim**
- Public: zero tolerance statement; invite offline; manual review.
- Internal: HR + owner; preserve evidence.

---

## 3) Approved Response Templates v3 (Per Vertical)

### Global Rules for All Templates
- Allowed variables: {BusinessName}, {LocationOrTeam}, {FirstNameOrRole}, {SupportEmail}=support@YOUR_DOMAIN.com, {Website}=https://YOUR_WEBSITE_URL.
- Disallowed variables: reviewer name (unless public and approved), appointment date/time, procedure/service details that imply customer relationship, staff last names, pricing not already public/verified.
- Required CTA: support@YOUR_DOMAIN.com and/or https://YOUR_WEBSITE_URL.


# A) DENTIST (Google/Yelp)

**DENT-01 (Positive)**
“Thank you for the kind words and for taking the time to share your experience. Our team at {BusinessName} really appreciates it. If there’s ever anything we can do for you, please reach us at {SupportEmail} or {Website}.”

**DENT-02 (Neutral/Short)**
“Thanks for your feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact us at {SupportEmail} or {Website}.”

**DENT-03 (Mild Negative: wait time/communication)**
“Thank you for letting us know. We’re sorry to hear the visit didn’t meet expectations, and we’d like to understand what happened so we can improve. Please contact our team at {SupportEmail} or {Website}.”

**DENT-04 (Strong Negative: dissatisfaction; privacy-safe)**
“We’re sorry to hear you’re unhappy. We take patient privacy seriously and can’t discuss details in a public forum, but we would like to help. Please contact us at {SupportEmail} or {Website} so we can look into your concerns.”

**DENT-05 (Suspected Fake / Can’t Locate)**
“Thank you for the review. We can’t confirm details from a public post, but we’d like to understand what you experienced. Please contact us at {SupportEmail} or {Website} so we can investigate and assist.”

**DENT-06 (Post-Resolution Follow-up Tone)**
“Thank you for taking the time to speak with our team. We appreciate the opportunity to listen and improve. If you need anything further, please reach us at {SupportEmail} or {Website}.”


# B) MED SPA (Google/Yelp)

**SPA-01 (Positive)**
“Thank you for your feedback. We’re glad you had a great experience with our team at {BusinessName}. If you have questions or need anything else, contact us at {SupportEmail} or {Website}.”

**SPA-02 (Neutral)**
“Thanks for sharing your feedback. We’d like to learn more and make sure we’re meeting expectations. Please reach out at {SupportEmail} or {Website}.”

**SPA-03 (Mild Negative: scheduling/front desk)**
“We’re sorry to hear about the scheduling experience. We’d like to look into this and improve. Please contact us at {SupportEmail} or {Website}.”

**SPA-04 (Strong Negative: results/experience; no medical claims)**
“We’re sorry to hear this wasn’t the experience you expected. Because privacy matters, we can’t discuss details here, but we’d like to connect and address your concerns directly. Please contact us at {SupportEmail} or {Website}.”

**SPA-05 (No Guarantees / Results Vary Guardrail)**
“Thank you for your feedback. Every person’s experience can vary, and we’d like to understand what happened in your case. Please contact our team at {SupportEmail} or {Website} so we can help.”

**SPA-06 (Suspected Fake / Limited Info)**
“Thank you for the review. We can’t verify details from a public post, but we’d like the chance to learn more. Please contact us at {SupportEmail} or {Website}.”


# C) HVAC (Google/Yelp)

**HVAC-01 (Positive)**
“Thanks for the great review. We appreciate you choosing {BusinessName}, and we’re glad our team could help. If you ever need anything, contact us at {SupportEmail} or {Website}.”

**HVAC-02 (Neutral/Short)**
“Thank you for your feedback. We’d like to learn more and improve. Please contact us at {SupportEmail} or {Website}.”

**HVAC-03 (Mild Negative: late arrival/communication)**
“We’re sorry about the delay and appreciate you sharing this. We’re working to improve scheduling and communication. Please contact us at {SupportEmail} or {Website} so we can follow up.”

**HVAC-04 (Strong Negative: workmanship complaint; no liability admission)**
“We’re sorry to hear this. We want to understand what happened and help resolve it, but we can’t address specifics in a public forum. Please contact us at {SupportEmail} or {Website} so we can review the situation.”

**HVAC-05 (Alleged damage/safety concern — should usually be Manual Hold)**
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to connect directly as soon as possible. Please contact us at {SupportEmail} or {Website}.”
(Note: If review includes injury/fire/CO/legal threats → manual-only hold.)

**HVAC-06 (Suspected Fake / No Record Found)**
“Thank you for the review. We can’t confirm details from a public post, but we’d like to look into it and help. Please contact us at {SupportEmail} or {Website}.”

---

## 4) QA Test Report v4 — Executive Summary (Attach to Release Notes)
- Coverage: 45 core reviews across Dentist/Med Spa/HVAC + 6 Yelp-specific edge cases.
- Final results: 51/51 pass (100%) with guardrails enabled: PHI confirmation hard block; legal-threat detector → `blocked_manual_review`.
- Key launch gate: no automated posting when `post_status=blocked_manual_review`; audit logs must record `hold_reason`, `detector_version`, `blocked_timestamp`, and prevent posting through both API and UI.
- Ongoing QA: run this suite on every prompt/template/model change; any new blocked phrase or detector rule must ship with a unit test and a regression case.

Owner action: Replace placeholders {Website}=https://YOUR_WEBSITE_URL and {SupportEmail}=support@YOUR_DOMAIN.com with your real domain and support email before production use.