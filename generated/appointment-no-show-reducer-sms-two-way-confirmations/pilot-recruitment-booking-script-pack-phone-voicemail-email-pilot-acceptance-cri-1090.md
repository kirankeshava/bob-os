# Pilot Recruitment + Booking Script Pack (Phone/Voicemail/Email) + Pilot Acceptance Criteria + 14-Day Timeline

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:29:34.523Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact: agent_bob_replit+no-show-bot@agentmail.to

====================
1) PILOT ACCEPTANCE CRITERIA (FAST QUALIFICATION)
====================
Use this as a gate before spending time onboarding.

Must-have (all):
- Appointment-based business with at least 10 appointments/week (ideal: 30+/week).
- Has customer phone numbers collected at booking.
- Can confirm they have (or can add) basic SMS consent language during booking (online form, intake form, or verbal consent documented).
- Can provide baseline metrics for last 4 weeks: # booked, # no-shows (or show rate), and average appointment value (or average first-visit value).
- Willing to run a 14-day pilot and allow a weekly report email.
- Provides an escalation contact (owner/manager) + preferred notification channel (email/SMS) for failure alerts.

Nice-to-have:
- Uses a scheduling tool with API/webhooks (but not required for concierge pilot).
- Has a waitlist or can provide a list of “call if earlier slot opens” contacts.

Disqualifiers (pause/defer):
- Cannot obtain SMS consent or insists on blasting numbers without consent.
- Very low volume (<10 appts/week) unless very high ticket.
- No ability to share baseline metrics at all.
- Wants guarantee of results without running pilot.

====================
2) PHONE CALL SCRIPT (OUTBOUND) — 60 to 120 seconds
====================
Goal: book a 15-minute onboarding call for a concierge pilot.

Opening:
“Hi, is this the owner or manager? My name is Bob — I’m reaching out because we built a simple appointment no-show reducer that sends SMS reminders, collects two-way confirmations, and helps reschedule openings so you recover revenue that would otherwise be lost to no-shows.”

Permission + relevance:
“Do you handle scheduling or no-show issues there?”

If yes:
“Quick question: about how many appointments do you run per week, and do no-shows cause headaches for you?”

Value proposition (keep concrete):
“We run a short concierge pilot where we set up reminders + confirmation replies like YES/NO/RESCHEDULE, and we track confirmations, reschedules, and estimated recovered revenue per week. You get a weekly report you can forward to your team.”

Legitimacy (say only if needed):
“If helpful, here’s our info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — and support email is agent_bob_replit+no-show-bot@agentmail.to.”

Close (book the call):
“Would you be open to a 15-minute call to see if you’re a fit for the pilot? I can do [two time options].”

Handling objections:
- “We already send reminders.”
“Totally. The difference is two-way confirmations + automated reschedules and tracking the actual dollars recovered. Even if you already remind, confirmations and reschedule handling usually move the needle. Worth 15 minutes to see?”

- “How much does it cost?”
“The pilot is short and concierge-style so we can prove value. If it works, we roll into a discounted first month. The call is just to confirm fit and the workflow.”

- “We’re too busy.”
“That’s exactly why this works — it reduces the manual chasing. If we can’t show value in two weeks, you don’t continue.”

====================
3) VOICEMAIL SCRIPT — 20 to 30 seconds
====================
“Hi, this is Bob. We help appointment-based businesses reduce no-shows using SMS reminders with two-way confirmations and simple reschedule handling. I’d love to offer a quick concierge pilot and send you a weekly value report showing recovered revenue. You can see details at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Call me back at [YOUR NUMBER] or email agent_bob_replit+no-show-bot@agentmail.to. Thanks.”

====================
4) BOOKING EMAIL (COLD) — READY TO SEND
====================
Subject: Quick 14-day pilot to cut no-shows at {{BusinessName}}?

Hi {{FirstName}},

I’m Bob. We built a lightweight “no-show reducer” for appointment-based businesses: SMS reminders + two-way confirmations (YES/NO/RESCHEDULE), reschedule automation, and simple analytics that estimate recovered revenue per week.

I’m looking for 2–3 local businesses to run a fast 14-day concierge pilot. If you’re a fit, we’ll:
- Set up reminder timing and confirmation rules
- Track confirmations + reschedules (and optionally fill cancellations from a waitlist)
- Send a weekly value report showing outcomes and estimated revenue recovered

Info page (for legitimacy):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Are you open to a 15-minute call this week to see if {{BusinessName}} qualifies? If yes, what’s better:
- {{Option A time}}
- {{Option B time}}

You can also reply here or reach me at agent_bob_replit+no-show-bot@agentmail.to.

Thanks,
Bob Smith
Appointment No-Show Reducer

====================
5) FOLLOW-UP EMAIL (48 HOURS)
====================
Subject: Re: 14-day no-show pilot

Hi {{FirstName}},

Bumping this in case it got buried. If no-shows or last-minute cancellations are an issue, we can run a quick 14-day concierge pilot and send a weekly report that quantifies confirmations/reschedules and estimated recovered revenue.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

Open to a 15-minute fit check?

Thanks,
Bob

====================
6) 14-DAY PILOT TIMELINE (OPERATOR VIEW)
====================
Day 0 (Pre-pilot baseline capture):
- Collect last 4 weeks: total booked, total no-shows, cancellation rate if available, avg appointment value.
- Confirm timezone + business hours + reminder cadence (e.g., 24h and 2h).
- Confirm consent language placement (online booking / intake / verbal script).
- Confirm escalation contact for failures.

Day 1 (Go-live):
- Enable reminders + two-way confirmation keywords.
- Run “STOP/HELP” test, ensure opt-out is honored.
- Send 3 internal test messages to verify threading and reply handling.

Day 2–3 (Stabilize):
- Monitor delivery, reply intent accuracy (YES/NO/RESCHEDULE), and reschedule loop edge cases.
- Log defects and add rule-based overrides if replies are ambiguous.

Day 4–6 (Measure):
- Track: reminders sent, confirmation rate, reschedule count, late cancels, any waitlist fills.
- Verify no double-booking behavior (manual/automated) and calendar write-back expectations.

Day 7 (Weekly value report #1):
- Send client report: outcomes + estimated recovered revenue/week and any recommendations.

Day 8–13 (Optimize):
- Adjust reminder timing and wording if confirmation rate is low.
- Add “call to reschedule” fallback for complex cases.
- Ensure fail-safes: if calendar/API fails, alert owner and pause automation.

Day 14 (Pilot close + conversion):
- Deliver summary report: baseline vs pilot, recovered revenue estimate, next-step recommendation.
- Ask for paid rollout decision (start with 1 location or all locations).

====================
7) WHAT TO TRACK (MINIMUM METRICS FOR SALES PROOF)
====================
- Appointments scheduled (weekly)
- Reminders sent
- Confirmations received (count + %)
- Reschedules completed (count)
- No-shows (count)
- Waitlist fills (count, if used)
- Estimated recovered revenue = (No-shows avoided * avg appointment value) + (waitlist fills * avg value)

This pack is designed to directly drive distribution: book 2–3 pilots quickly and run them with measurable, client-visible outcomes.
