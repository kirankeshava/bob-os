# Pilot QA Checklist + Weekly Value Report Template (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:14:37.023Z

---

## 1) Pilot QA Checklist (Run for each pilot location)

### A. Pre-Flight / Setup
- **Business profile captured**: location name, address, primary contact, escalation contact.
- **Timezone configured**: confirm IANA timezone (e.g., America/Chicago). Validate against the business address.
- **Business hours + closed days**: ensure reminders do not send outside allowed window.
- **Appointment types**: durations, buffers, and average value per appointment.
- **Reminder policy configured**: default schedule (e.g., 24h + 2h). Confirm per service if different.
- **Reschedule policy**: earliest/latest reschedule times, link to booking page (if used), manual reschedule escalation path.
- **Waitlist policy**: who is eligible, how far ahead to offer, expiry window for offers, and fallback if no one accepts.

### B. Messaging Quality + Compliance
- **Opt-in language**: ensure the initial message clearly identifies the business and purpose.
- **STOP handling**: user reply “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” → immediate opt-out + confirmation message.
- **HELP handling**: reply “HELP” → send help/support response with business phone and support email: agent_bob_replit+no-show-bot@agentmail.to.
- **Quiet hours**: enforce no texts during configured quiet hours; queue to next allowed time.
- **Message tone**: short, clear, includes date/time, includes confirmation prompt.
- **Threading**: replies are always associated with the correct patient/customer and appointment.

### C. Rule-Based Intent Overrides (High-Confidence)
Implement hard rules that override AI classification when keywords are present:
- **Confirm**: “YES”, “Y”, “CONFIRM”, “OK”, “K”, “I’LL BE THERE”, “SEE YOU”, “SURE”
- **Cancel/Decline**: “NO”, “N”, “CAN’T”, “CANNOT”, “WON’T”, “NOT COMING”, “CANCEL”
- **Reschedule**: “RESCHEDULE”, “MOVE”, “CHANGE TIME”, “DIFFERENT TIME”, “LATER”, “EARLIER”, “NEXT WEEK”
- **Stop**: “STOP”, “UNSUBSCRIBE”, “END”, “QUIT” (highest priority)
Rules:
1) STOP always wins.
2) If both confirm and reschedule keywords exist, treat as reschedule.
3) If ambiguity remains, escalate to manual review/owner alert.

### D. Timezone + DST Edge Cases
- Schedule reminder timestamps in business timezone.
- Test 24h reminder across DST changes.
- If customer is in different timezone (unknown), still use business timezone consistently.

### E. Calendar Update & Consistency
- **Source of truth defined**: calendar/booking system vs internal database.
- **On confirm**: mark appointment confirmed (tag/field) and write event note if supported.
- **On reschedule**: ensure old slot is released before new slot is confirmed.
- **On cancel**: ensure appointment is canceled in booking system (or flagged + owner notified if API can’t).
- **Idempotency**: duplicate replies should not create duplicate reschedules/cancellations.

### F. Double-Booking Prevention
- Before creating a new appointment time, re-check availability.
- If slot becomes unavailable mid-flow, respond with 2–3 alternative times or escalation.
- Ensure waitlist fill does not allocate an already-booked slot.

### G. Failure Modes + Fail-Safes
- **Calendar API failure**: 
  - Log error with appointment ID, business ID, timestamp.
  - Send immediate alert to owner/escalation contact: “Action needed: calendar update failed.”
  - Send customer message: “We’re having trouble updating the schedule—someone will confirm shortly.”
- **SMS delivery failure**: retry policy, and fallback to email alert to owner.
- **AI/intent uncertainty**: route to manual review queue + owner alert if within X hours of appointment.

### H. Analytics Instrumentation (Per Location)
Track events with timestamps and appointment value:
- reminders_sent
- delivered (if available)
- customer_replied
- confirmed
- reschedule_requested
- rescheduled_success
- canceled
- waitlist_offers_sent
- waitlist_offer_accepted
- slot_filled_from_waitlist
- owner_manual_interventions
Derived weekly metrics:
- confirmation rate = confirmed / reminders_sent
- reschedule success rate = rescheduled_success / reschedule_requested
- fill rate = slot_filled_from_waitlist / cancellations
- estimated recovered revenue = (confirmed_saved + filled_slots) * avg_appointment_value

### I. Pilot Acceptance Criteria (Minimum)
- STOP/HELP compliant.
- Zero double-bookings attributable to the system.
- Calendar writes succeed ≥ 99% or owner alerted within 2 minutes.
- Weekly report generated with confirmed/rescheduled/filled counts and recovered revenue estimate.

---

## 2) Weekly Value Report Template (Client-Facing)

**Subject:** Weekly No-Show Reduction Report — {{Business Name}} ({{Week Start}}–{{Week End}})

Hi {{Owner First Name}},

Here’s your weekly summary from the Appointment No-Show Reducer. This report focuses on outcomes that impact revenue: confirmations, reschedules completed, and last-minute gaps filled from the waitlist.

**Account:** {{Business Name}} ({{Location}})
**Week:** {{Week Start}}–{{Week End}}

### 1) Appointment Outcomes
- **Reminders sent:** {{reminders_sent}}
- **Customer replies received:** {{replies}}
- **Confirmed appointments:** {{confirmed}}
- **Reschedule requests:** {{reschedule_requested}}
- **Reschedules successfully completed:** {{rescheduled_success}}
- **Cancellations detected:** {{canceled}}

### 2) Waitlist Gap-Filling
- **Waitlist offers sent:** {{waitlist_offers_sent}}
- **Offers accepted:** {{waitlist_offer_accepted}}
- **Slots filled from waitlist:** {{slots_filled}}

### 3) Estimated Recovered Revenue (This Week)
We estimate recovered revenue using your average appointment value of **${{avg_appt_value}}**.
- **Saved via confirmations:** {{confirmed_saved}} × ${{avg_appt_value}} = **${{rev_from_confirmations}}**
- **Recovered via filled gaps:** {{slots_filled}} × ${{avg_appt_value}} = **${{rev_from_fills}}**
- **Estimated recovered revenue (total):** **${{rev_total}}**

### 4) Notable Exceptions / Items Needing Attention
- **Calendar update failures:** {{calendar_failures}} (all escalated to owner within {{alert_sla}})
- **Manual interventions:** {{manual_interventions}}
- **Top customer issues:** {{top_issue_1}}, {{top_issue_2}}

### 5) Recommendations for Next Week
- {{recommendation_1}}
- {{recommendation_2}}

If you’d like to review message wording or reminder timing, reply to this email and we’ll adjust it concierge-style during the pilot.

Legitimacy / product info (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
Appointment No-Show Reducer

---

## 3) Pilot Baseline Metrics Capture (Before Go-Live)
Collect from owner (even rough numbers are acceptable during pilot):
- Avg weekly appointments: {{baseline_weekly_appts}}
- Current no-show rate (last 4 weeks): {{baseline_noshow_rate}}
- Avg appointment value: ${{avg_appt_value}}
- Current cancellation handling process: {{baseline_process}}
Then set week-1 targets:
- Increase confirmations by {{target_confirm_uplift}}%
- Reduce no-shows by {{target_noshow_reduction}}%
- Fill at least {{target_fills}} gaps/week (if waitlist is active)
