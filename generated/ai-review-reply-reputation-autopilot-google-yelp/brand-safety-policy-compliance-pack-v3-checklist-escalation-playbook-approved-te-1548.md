# Brand-Safety & Policy Compliance Pack v3 — Checklist + Escalation Playbook + Approved Templates (Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:32:22.664Z

---

This Pack is the operational “source of truth” for safe, policy-aligned review responses on Google Business Profile (GBP) and Yelp for the AI Review Reply & Reputation Autopilot. Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Support/ops email: agent_bob_replit+review-bot@agentmail.to.

1) BRAND-SAFETY CHECKLIST v3 (tick-box, per response)
A. Platform policy (Google + Yelp)
- [ ] No incentives/discounts/gifts offered for reviews (“10% off”, “free add-on”, “coupon”, “refund if you remove/update”).
- [ ] No review gating or selective solicitation language (“only if you had a good experience…”).
- [ ] No promises to remove reviews / contact platform to take it down (“we will get Yelp/Google to remove this”).
- [ ] No competitor disparagement (“unlike X”, “they’re scammers”).
- [ ] No public back-and-forth escalation; invite offline resolution.

B. Privacy/PHI/PII
- [ ] Do NOT confirm someone is a patient/customer or reference visit/appointment/records (“your chart”, “your visit on Tuesday”, “we reviewed your records”).
- [ ] Do NOT repeat the reviewer’s medical details, address, phone, email, or staff full names if they appear.
- [ ] If reviewer posts PHI: respond generically + move offline; escalate to manual review.

C. Liability / legal risk
- [ ] Do NOT admit fault or liability (“we messed up”, “our technician broke…”, “we caused…”).
- [ ] Use neutral language: “we’re sorry you feel…”, “we’d like to learn more”, “we take concerns seriously”.
- [ ] If reviewer threatens lawsuit/attorney/regulator: response mode MUST be HOLD—MANUAL ONLY; escalate Legal.

D. Medical/health claims (Dentist/Med Spa)
- [ ] No outcome guarantees (“permanent”, “cured”, “zero pain”, “guaranteed results”).
- [ ] No diagnosing; no treatment advice beyond generic “contact our office”.
- [ ] No before/after claims or personal clinical discussion.

E. Tone & de-escalation
- [ ] No shaming, sarcasm, arguing, or calling reviewer a liar.
- [ ] Acknowledge + apologize for experience (without admitting liability) + invite offline.
- [ ] Keep concise; do not introduce new facts.

F. Required elements
- [ ] Include offline CTA with a safe contact path (phone/email/DM) and invitation to discuss.
- [ ] Include business-signature line (e.g., “— [Business/Team]”).

G. Hard blocks / holds (DO NOT POST; manual review required)
- [ ] PHI confirmation risk: any draft that states/assumes they were a patient, references “records/chart/visit/appointment”.
- [ ] Legal threat keywords: sue, lawsuit, attorney, lawyer, legal action, demand letter, subpoena.
- [ ] Safety incident (injury, fire, gas leak, severe adverse event) requires escalation and careful language.
- [ ] Harassment/hate speech where response could inflame; keep minimal and offline.

2) ESCALATION PLAYBOOK v3 (what to do for negative reviews)
Routing levels
- Level 0 (Auto-respond OK): mild dissatisfaction, vague complaint, neutral feedback.
- Level 1 (Ops Review <24h): missed appointment, delay, rudeness claims, workmanship dissatisfaction, billing confusion.
- Level 2 (Owner/GM <4h): safety incident allegation, discrimination claim, data/privacy concern.
- Level 3 (Legal same-day): lawsuit/attorney threats, regulator threats, defamation risk, restraining order threats.
- HOLD—MANUAL ONLY: any Level 3; any PHI/records mention; any draft that risks liability admission.

Scenario guidance (common)
A) Billing/pricing dispute
- Internal evidence: invoice, estimate, signed authorization, call notes.
- Response: acknowledge concern; invite offline to review account; do not disclose amounts unless already public and verified.
B) Service quality / “didn’t fix it” (HVAC)
- Evidence: work order, photos, technician notes, warranty terms.
- Response: apologize for frustration; offer offline follow-up; avoid admitting the work was wrong.
C) Alleged damage caused
- Evidence: pre/post photos, technician report, timestamps.
- Response: take seriously; offline investigation; no admission.
D) Safety incident (gas leak, injury, burn)
- SLA: Owner/GM <4h; document incident; consider pausing public response if facts unknown.
- Response: acknowledge concern; encourage immediate direct contact; if emergency, advise contacting appropriate emergency services (general wording only).
E) Discrimination/harassment claim
- SLA: Owner/GM <4h + HR.
- Response: state commitment to respectful service; invite offline; avoid debating facts.
F) PHI/HIPAA mention (Dentist/Med Spa)
- Always HOLD—MANUAL ONLY if the draft implies patient relationship.
- Response must NOT confirm; say “we take privacy seriously” and invite offline.
G) Suspected fake review / not a customer
- Evidence: customer logs, scheduling system.
- Response: do not accuse; invite offline to locate the experience.

Do-not-post conditions (stop, escalate)
- Any legal threat language.
- Any PHI confirmation risk.
- Any request to bribe/discount for removal.
- Any draft containing names/appointment dates/clinical details.

3) APPROVED RESPONSE TEMPLATE LIBRARY v3
Global rules for variables
Allowed variables: {business_name}, {team_signature}, {contact_channel} (e.g., “call us at (xxx) xxx-xxxx” or “email agent_bob_replit+review-bot@agentmail.to”), {location_city}.
Banned variables: reviewer name (unless generic first name and provided by customer policy), staff full names, appointment date/time, procedure/treatment details, amounts owed/refund amounts, diagnosis.

Platform notes
- Yelp: Do not mention “we’ll report to Yelp” or “Yelp will remove”; keep short, neutral.
- Google: Similar constraints; avoid implying access to their records.

A) DENTIST TEMPLATES
DENT-01 Positive
“Thank you for taking the time to share your feedback. We’re glad you had a great experience with our team. If there’s ever anything we can do to help, please reach out via {contact_channel}. — {team_signature}”
DENT-02 Neutral/short
“Thanks for your visit and for leaving a review. If you have suggestions on how we can improve, we’d appreciate the chance to hear more—please contact us via {contact_channel}. — {team_signature}”
DENT-03 Mild negative (service experience)
“Thank you for your feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact us via {contact_channel}. — {team_signature}”
DENT-04 Strong negative (no PHI confirmation)
“Thank you for raising your concerns. We take feedback seriously and would like to understand what happened. Please contact us directly via {contact_channel} so we can look into this and discuss next steps. — {team_signature}”
DENT-05 PHI mentioned by reviewer (privacy-safe)
“Thank you for your message. We take privacy and confidentiality seriously. We’re not able to discuss details in a public forum, but we’d like to help—please contact us directly via {contact_channel}. — {team_signature}”
DENT-06 Suspected fake / can’t locate
“Thank you for your review. We’re having trouble locating the experience you described, but we’d like to look into it. Please contact us via {contact_channel} with any details you’re comfortable sharing privately. — {team_signature}”

B) MED SPA TEMPLATES
SPA-01 Positive
“Thank you for the kind words. We’re happy you enjoyed your experience with our team. If you need anything, reach us anytime via {contact_channel}. — {team_signature}”
SPA-02 Neutral
“Thank you for your feedback. We’re always working to improve. Please contact us via {contact_channel} if you’d like to share more details privately. — {team_signature}”
SPA-03 Mild negative
“We’re sorry to hear your visit didn’t meet expectations. We’d appreciate the opportunity to learn more and help resolve this—please contact us via {contact_channel}. — {team_signature}”
SPA-04 Strong negative (no outcomes discussion)
“Thank you for sharing your concerns. We take service quality seriously and would like to understand what happened. Please contact us directly via {contact_channel} so we can discuss options privately. — {team_signature}”
SPA-05 Medical/outcome claim bait (avoid guarantees)
“Thank you for your feedback. Everyone’s experience can vary, and we’d like to understand your concerns. Please contact us via {contact_channel} so we can discuss privately. — {team_signature}”
SPA-06 Suspected fake
“Thank you for your review. We’d like to look into this, but we can’t confirm details publicly. Please contact us via {contact_channel} so we can investigate and assist. — {team_signature}”

C) HVAC TEMPLATES
HVAC-01 Positive
“Thanks for the review. We’re glad our team could help. If you ever need anything else, contact us via {contact_channel}. — {team_signature}”
HVAC-02 Neutral
“Thank you for your feedback. If you’d like to share more about your experience, please reach out via {contact_channel}. — {team_signature}”
HVAC-03 Mild negative (delay/communication)
“Thank you for letting us know. We’re sorry for the inconvenience and would like to learn more. Please contact us via {contact_channel} so we can help. — {team_signature}”
HVAC-04 Strong negative (work not resolved; no liability)
“Thank you for your feedback. We take concerns seriously and would like to understand what happened and help make this right. Please contact us directly via {contact_channel}. — {team_signature}”
HVAC-05 Alleged damage (no admission)
“Thank you for raising this. We’d like to review what occurred and address your concern. Please contact us via {contact_channel} so we can investigate and follow up. — {team_signature}”
HVAC-06 Suspected fake
“Thank you for your review. We’re unable to locate the job described from the information provided, but we’d like to look into it. Please contact us via {contact_channel} with any private details you’re comfortable sharing. — {team_signature}”

4) ONGOING QA SAMPLING PLAN (to prevent drift)
Weekly (Ops): Spot-check 10% of posted responses (or 20 responses, whichever is smaller). Verify checklist items A–G and confirm audit logs exist with detector_version and post_status.
Monthly (QA): Re-run the 45-case suite + Yelp addendum; ensure pass rate >= 98% with zero P0/P1. Any regression triggers prompt/template rollback to last known good version.
Release management: Any change to prompts, templates, detectors, or blocked phrase lists increments version and must be logged in audit trail for traceability.

This Pack is ready for engineering/ops use: it defines what is allowed to be posted, what must be escalated/held, and provides pre-approved, platform-safe responses per vertical.