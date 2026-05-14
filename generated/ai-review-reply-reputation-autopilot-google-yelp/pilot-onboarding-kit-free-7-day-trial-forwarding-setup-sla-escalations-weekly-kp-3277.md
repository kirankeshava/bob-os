# Pilot Onboarding Kit (Free 7-Day Trial) — Forwarding Setup + SLA/Escalations + Weekly KPI Report + Daily Ops SOP

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:54:15.855Z

---

Below is a complete, copy/paste-ready onboarding kit to run the Phase-1 human-in-the-loop “AI Review Reply & Reputation Autopilot” using email forwarding + approvals + manual posting link-outs.

=== 1) Welcome Email (send to customer) ===
Subject: Your Review Reply Autopilot is live (7-day free trial) — forwarding setup inside

Hi {{FirstName}},

Thanks for trying our Review Reply & Reputation Autopilot. During the free 7-day pilot, we’ll draft brand-safe replies for new Google/Yelp reviews, escalate risky/negative reviews, and send a weekly KPI summary.

Legitimacy/Contact:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

Your dedicated forwarding inbox (send all review notifications here):
agent_bob_replit+review-bot@agentmail.to

To activate, please reply to this email with:
1) Business name
2) Each location name + address (multi-location supported)
3) Review platforms (Google, Yelp)
4) Primary approval contact (name + email)
5) Escalation contact (name + email + phone if you want urgent text/call)
6) Brand voice (choose one): Friendly / Professional / Warm & brief / Luxury / Playful
7) “Never say” list (optional) and any compliance rules (HIPAA/health/legal disclaimers, refund policy, etc.)

Once forwarding is set up (instructions below), we’ll start drafting replies within the pilot SLA.

— Bob
agent_bob_replit+review-bot@agentmail.to


=== 2) Forwarding Setup Instructions (include in the same email or as follow-up) ===

A) Google Business Profile review notifications → Forward to us
1) Ensure your Google Business Profile notifications are enabled for new reviews.
2) Set the notification recipient to the email you use to receive review alerts.
3) Create an auto-forwarding rule from that inbox to: agent_bob_replit+review-bot@agentmail.to
4) If you have multiple locations, either:
   - Forward from each location manager’s inbox (best), OR
   - Forward everything to us and include a one-time mapping email: “If review email contains ‘{{LocationNickname}}’ route to {{LocationAddress}}.”

B) Yelp review notifications → Forward to us
1) In Yelp for Business, enable email notifications for new reviews.
2) Create an auto-forwarding rule from that inbox to: agent_bob_replit+review-bot@agentmail.to
3) If your Yelp notifications go to multiple team members, forward all of them to the same address above.

C) Multi-location mapping (required if you have >1 location)
Reply with a simple mapping like:
- “Downtown” = 123 Main St
- “Uptown” = 55 Oak Ave
- “Westside” = 9 Market Rd
If the notification emails already include the location address, we’ll auto-detect it.


=== 3) Approval + Posting Flow (what the customer experiences) ===
- When a review arrives, we draft a reply.
- You receive an email with:
  1) Review summary + sentiment tag
  2) A suggested reply
  3) Buttons/links: Approve / Request Edit / Reject
- After approval, we send a “Posting Pack” email with:
  - The final reply text (copy/paste)
  - A direct link to the platform (Google/Yelp) so your team can post safely without giving us account access.

This keeps platform/API risk low while still feeling like autopilot.


=== 4) SLA + Escalation Policy (paste into onboarding / agreement) ===
Pilot SLA (business hours):
- Draft turnaround: within 8 business hours for normal reviews.
- Negative/risky reviews: escalation email sent within 2 business hours.

Escalation triggers (any triggers → “Needs Attention”):
- Star rating: 1–2 stars (always), 3 stars (optional based on your preference)
- Sentiment: negative/angry/frustrated language
- Keywords (examples): “refund”, “chargeback”, “scam”, “lawsuit”, “attorney”, “HIPAA”, “medical”, “injury”, “food poisoning”, “health department”, “discrimination”, “harassment”, “fraud”, “police”, “unsafe”, “mold”, “infection”, “allergic”, “fire”, “gas leak”
- Mentions of staff by name in a hostile context

Escalation actions:
1) Immediate email to the escalation contact with:
   - The review text
   - Risk reason(s)
   - 2 recommended reply options (short neutral + longer empathetic)
   - Suggested offline resolution steps
2) If no action after X hours (set by client; default 24h), send reminder.


=== 5) Weekly KPI Report Email Template (send every week) ===
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly reputation summary.

1) Volume
- New reviews received: {{count_new_reviews}}
- Platforms: Google {{count_google}} | Yelp {{count_yelp}}
- By location:
  - {{Location1}}: {{count_loc1}}
  - {{Location2}}: {{count_loc2}}

2) Rating performance
- Average star rating (this week): {{avg_rating_week}}
- Previous period: {{avg_rating_prev}}
- Trend: {{trend_up_down_flat}}
- 1–2 star reviews: {{count_1_2_star}} ({{pct_1_2_star}}%)

3) Responsiveness
- Replies drafted: {{count_drafted}}
- Replies approved: {{count_approved}}
- Median time-to-first-draft: {{median_ttf_draft}}
- Median time-to-approval: {{median_ttf_approval}}
- Reviews still unhandled: {{count_unhandled}} (oldest: {{oldest_age}})

4) Escalations & risk
- Escalations triggered: {{count_escalations}}
- Top escalation reasons: {{top_reasons}}
- Notes: {{ops_notes}}

5) Next-week focus (2–3 bullets)
- {{next_focus_1}}
- {{next_focus_2}}

If you’d like, reply with your preferred tone tweaks (more formal, shorter, more apologetic, etc.).

— Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1


=== 6) Internal Daily Ops SOP (human-in-the-loop) ===
Goal: Maintain “feels like autopilot” responsiveness without posting access.

Daily cadence (2–4 times/day):
1) Check intake inbox: agent_bob_replit+review-bot@agentmail.to
2) For each new review email:
   - Identify client + location (via mapping or email content)
   - Extract: platform, stars (if present), reviewer name, review text, timestamp, link (if present)
   - Tag sentiment (positive/neutral/negative) + detect escalation triggers
3) Draft response using brand voice rules:
   - Positive: gratitude + specific reference + invite back
   - Neutral/3-star: acknowledge + improve + invite offline
   - Negative: empathize + no admissions of liability + move offline + concise
   - Compliance: avoid personal health info; avoid confirming customer identity if sensitive
4) Send approval email to approval contact with:
   - Review summary
   - Suggested reply
   - Approve / Request Edit / Reject
5) If approved:
   - Send Posting Pack: final reply + link-out instructions
   - Log status “Approved/Ready to Post” and timestamp
6) If escalation triggered:
   - Notify escalation contact immediately with “Needs Attention”
   - Set SLA reminder timer for X hours
7) End of week:
   - Compile weekly KPIs per location + overall
   - Email report using the template above

Quality bar:
- Replies must be brand-safe, non-defensive, and never argue with a reviewer.
- For negative reviews, always invite offline resolution and provide a contact route.

Support/legitimacy always included in customer emails:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
