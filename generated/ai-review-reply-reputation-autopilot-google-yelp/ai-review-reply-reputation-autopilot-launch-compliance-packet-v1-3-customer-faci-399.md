# AI Review Reply & Reputation Autopilot — Launch Compliance Packet v1.3 (Customer-Facing Safety FAQ + Approved Response Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:54:50.362Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-qfdl4ouo.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

1) Customer-Facing Safety & Policy FAQ (use on onboarding + in-app)

What this product does
- Drafts brand-safe responses to Google Business Profile and Yelp reviews.
- Flags risky reviews (legal threats, safety incidents, PHI/medical privacy, harassment, suspected fake/competitor) for escalation.
- Provides weekly reputation KPIs (response rate, response time, rating trend, escalation counts).

What it will NOT do (hard rules)
- No incentives or solicitation: We will never offer discounts, freebies, gifts, or anything of value in exchange for reviews. We will not ask customers to “update your rating for a discount,” and we will not perform “review gating.”
- No fake reviews: We will not create, purchase, or post reviews.
- No PHI/medical privacy confirmation: For healthcare-related businesses, we will not confirm someone is/was a patient or reference visits, charts, records, treatment details, appointments, or outcomes.
- No admission of liability: We will not admit fault, confirm wrongdoing, or promise compensation publicly.
- No public arguing or retaliation: Responses must remain calm, non-inflammatory, and professional.
- No doxxing/personal data: We will not publish private details (phone numbers, addresses, staff schedules, etc.).
- No competitor disparagement: We will not attack or compare competitors, or claim reviews were posted by competitors.
- No “we can remove your review” promises: Especially on Yelp, we will not imply we can get reviews removed or that the platform will remove them.

When responses are automatically held for human review (Manual-Only Hold)
A draft will be blocked from posting and routed to escalation if the review includes:
- Legal threats or litigation language (e.g., “attorney,” “lawsuit,” “sue,” “court,” “legal action”).
- PHI/HIPAA or medical privacy cues (e.g., “my records,” “my chart,” “my visit,” “treatment plan,” named providers + care details).
- Safety incidents (injury, alleged dangerous work, fire/electrical hazard, harassment, discrimination claims).
- Threats/harassment or hate speech.

How we respond to negative reviews (standard approach)
- Acknowledge feelings without admitting fault.
- Invite offline resolution via a direct contact path.
- Avoid specifics that confirm identity, service details, or protected information.

Offline resolution CTA (required)
Every neutral/negative response includes a short invitation to contact the business directly. Example safe CTA:
“Please contact our office so we can look into this and help. You can reach us at [business phone/email].”

Platform alignment notes (Google vs Yelp)
- Both: No incentives, no fake reviews, no harassment, no doxxing.
- Yelp sensitivity: Avoid implying Yelp will remove reviews, avoid public back-and-forth escalation, avoid language that looks like solicitation.
- Google Business Profile: Similar constraints; keep responses factual, polite, and privacy-safe.

Audit trail & approvals (what gets logged)
For compliance and accountability, the system should log:
- Review source (Google/Yelp), review ID, time received
- Draft version, model/prompt version
- Risk flags triggered + hold reason
- Approver identity and timestamps (if approval is enabled)
- Post status (posted/blocked/error) + timestamps

2) Approved-Only Response Templates (Paste-Ready)

Template rules (apply to ALL templates)
- Do not use reviewer names if they reveal identity (healthcare especially). Use “Hi there,” not “Hi John.”
- Do not confirm service details that identify the reviewer (dates, procedures, invoices) unless the customer explicitly wants that and has verified it; default is generic.
- Do not admit liability (“we messed up,” “our fault,” “we were negligent”).
- Never mention incentives, discounts, freebies for reviews.
- Keep it short, calm, and helpful.
- Always include offline CTA for neutral/negative.

Allowed variables (safe)
- [BusinessName], [City], [SupportPhone], [SupportEmail], [SupportContactNameOrRole], [HoursLink]
Banned variables
- Appointment dates, procedure names, medical conditions, patient status confirmation, invoice numbers, staff schedules, home addresses.

A) DENTIST (Google & Yelp)

DENT-POS-01 (Positive praise)
“Thank you for the kind words. We’re glad you had a great experience with our team at [BusinessName]. We appreciate you taking the time to share your feedback.”

DENT-NEU-01 (Neutral/short)
“Thank you for your feedback. If there’s anything we can do to improve your experience, please contact us at [SupportPhone] or [SupportEmail] so we can help.”

DENT-NEG-01 (Mild negative: wait time, front desk, scheduling)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail].”

DENT-NEG-02 (Strong negative, no PHI confirmation)
“We’re sorry to hear you’re upset. Because we take privacy seriously, we can’t discuss details here, but we’d like the chance to address your concerns. Please reach [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail].”

DENT-FAKE-01 (Suspected fake/unknown patient—no accusation)
“Thank you for your comment. We can’t confirm any details publicly. If you believe this relates to an experience with our office, please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can look into it.”

DENT-HOLD-LEGAL (Legal threat → manual-only hold; do NOT post)
DO NOT POST. Route to Legal escalation.

B) MED SPA (Google & Yelp)

SPA-POS-01 (Positive)
“Thank you for your review. We’re happy you had a great experience at [BusinessName]. We appreciate your support and look forward to seeing you again.”

SPA-NEU-01 (Neutral)
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more, please contact us at [SupportPhone] or [SupportEmail].”

SPA-NEG-01 (Service dissatisfaction)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and see what we can do to help—please reach [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail].”

SPA-NEG-02 (Outcome/medical claim bait—no guarantees)
“Thank you for sharing your concerns. We can’t discuss details here, but we take feedback seriously and want to help. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can review options privately.”

SPA-FAKE-01 (Suspected fake)
“Thank you for your comment. We can’t confirm any details publicly. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can look into this.”

SPA-HOLD-PHI (Mentions records/visit/treatment specifics → manual-only hold)
DO NOT POST. Escalate to Privacy/Owner.

C) HVAC (Google & Yelp)

HVAC-POS-01 (Positive)
“Thanks for the great review. We’re glad our team could help and we appreciate you choosing [BusinessName].”

HVAC-NEU-01 (Neutral)
“Thank you for the feedback. If you’re willing, please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can learn more and improve.”

HVAC-NEG-01 (Scheduling/late arrival)
“Thank you for letting us know. We’re sorry for the frustration. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can look into what happened and make it right.”

HVAC-NEG-02 (Billing dispute—no price argument)
“We’re sorry to hear about the concern. We’d like to review this directly and help resolve it. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail].”

HVAC-NEG-03 (Damage claim / safety concern—avoid liability admission)
“Thank you for bringing this to our attention. We take safety and quality seriously. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] as soon as possible so we can review and address your concern.”

HVAC-FAKE-01 (Suspected fake)
“Thank you for your comment. We’d like to understand more. Please contact [SupportContactNameOrRole] at [SupportPhone] or [SupportEmail] so we can look into this.”

3) Posting/Approval Notes (ops-ready)
- For any review flagged Legal/PHI/Safety/Harassment: set post_status = blocked_manual_review and do not allow posting via UI or API until an authorized user unblocks.
- For Yelp: never write “Yelp will remove this” or “we reported you to Yelp.” Keep it neutral and offline.
- For Google: same approach; do not reveal personal details; keep it calm and short.

4) Customer Support Footer (include in onboarding emails)
If you have questions about compliance, templates, or why a response was held:
Email: agent_bob_replit+review-bot@agentmail.to
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-qfdl4ouo.picard.replit.dev/sites/1

End of Launch Compliance Packet v1.3