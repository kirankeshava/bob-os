# DFY Clip Factory — Fast Feedback One-Pager + Intake/Tracker Build Specs (Free Tools)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:36:12.968Z

---

# DFY Clip Factory — How to Give Feedback Fast (So You Get Clips On Time)

**Official site (for reference):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Support email:** agent_bob_replit+clip-factory@agentmail.to

## Why this matters
We deliver **10 ready-to-post vertical clips within 48 hours**. The only thing that typically delays delivery is unclear or late feedback. This guide makes feedback fast, specific, and easy to apply.

## Where you’ll review
You’ll receive a review link (Frame.io or a shared Drive folder). Each clip will have a unique filename so comments map cleanly to the right asset.

## The 3 feedback rules (use these and we can move fast)
1) **Timestamp everything**  
Write feedback like: “**00:03–00:05** remove pause” or “**00:11** replace caption text.”

2) **Choose the type of change** (pick one)
- **Must-fix (accuracy/compliance):** wrong word, wrong claim, sensitive content, legal risk.
- **Brand/style preference:** color, emoji use, caption position, pacing.
- **Performance guess:** “I feel the hook could be stronger” (we’ll propose 1 alternative hook).

3) **One clip = one comment thread**  
Consolidate notes per clip (avoid scattered DMs). One thread reduces missed changes.

## What feedback is most helpful (examples you can copy)
- Hook: “**Clip 04**: Replace first line with: ‘Most agents lose listings because of this…’”
- Captions: “**Clip 07 00:08**: Change ‘lead’ to ‘listing lead’.”
- B-roll: “**Clip 02 00:06**: Add quick overlay of ‘Before/After’ or a simple graph animation.”
- CTA: “All clips: end card should say ‘DM “PLAN” for the checklist’.”

## What counts as a revision (and what doesn’t)
**Included (fast):**
- Caption text tweaks, emoji removal/addition, minor timing shifts
- Hook swap (1 alternate per clip if requested)
- CTA/end card text edits
- Small b-roll/cut changes within the selected segment

**Not included (new scope):**
- Selecting entirely new moments for most clips after approval
- Rebuilding the style pack (new fonts/colors/layout) after sign-off
- Multiple rounds of strategic repositioning (“new angle for all 10 clips”)

## Feedback SLA (to protect the 48-hour promise)
- **You get a first batch** (typically 3–5 clips) early for style confirmation.
- **You have 12 hours** to approve or request changes on that batch.
- If feedback arrives **after 12 hours**, delivery may shift because we pause final exports to avoid rework.

## “Approve fast” option (recommended)
If you’re busy, just reply:
- “**Approved**” (we proceed)
- or “**Approved with global note:** captions slightly higher + remove emojis”

## Need help?
Reply to the delivery email or contact **agent_bob_replit+clip-factory@agentmail.to** with:
- Clip filename(s)
- Timestamp(s)
- The exact replacement text (if applicable)

---

# Tally.so Intake Form — Build Spec (Free Tier)
Use this to create the form in Tally quickly (copy/paste labels). Mark required fields with **(Required)**.

## Section 1 — Client Info
1. **Full Name (Required)** — short text
2. **Brand/Company Name (Required)** — short text
3. **Email for delivery + questions (Required)** — email
4. **Timezone (Required)** — dropdown (PT/MT/CT/ET/UK/EU/Other)
5. **Website + social links** — long text (ask for TikTok/IG/YT links)

## Section 2 — Source Content Upload
6. **Content type (Required)** — multiple choice (Podcast / YouTube video / Webinar / Course / Other)
7. **Provide source link (Required)** — long text (Drive/Dropbox/YouTube link)
8. **Total length of source (Required)** — dropdown (<30m / 30–60m / 60–120m / 2h+)
9. **Do you have separate audio?** — yes/no
10. **Speaker names (if multiple) + roles** — long text

## Section 3 — Goal + Audience
11. **Primary audience (Required)** — long text
12. **Primary offer or CTA (Required)** — long text
13. **Desired outcomes** — checkboxes (More leads / More calls booked / More followers / Authority / Other)
14. **Topics to emphasize** — long text
15. **Topics to avoid (compliance/brand)** — long text

## Section 4 — Style Preset Selection
16. **Choose your style preset (Required)** — multiple choice:
- Real Estate
- Fitness
- B2B/Consulting
- Use my existing brand guide
17. **If you chose “Use my brand guide,” upload or link it** — long text
18. **Caption preference** — checkboxes (Word-by-word / Sentence chunks / Minimal)
19. **Emoji preference** — dropdown (None / Light / Moderate)

## Section 5 — Platform + Output
20. **Platforms (Required)** — checkboxes (TikTok / IG Reels / YouTube Shorts)
21. **Handle(s) to match** — long text
22. **Clip count (Required)** — dropdown (5 / 10 / 15 / 20)
23. **Preferred clip length** — dropdown (15–25s / 25–45s / 45–60s)

## Section 6 — Logistics
24. **Delivery folder email (Required)** — email (who to invite)
25. **Hard deadline (if any)** — date/time
26. **Any final notes** — long text

## Section 7 — Agreement
27. **Rights confirmation (Required)** — checkbox: “I confirm I own rights or have permission to edit and republish this content.”
28. **Revision policy acknowledgement (Required)** — checkbox: “I understand 1 revision round is included and feedback should be provided within 12 hours to keep the 48-hour SLA.”

---

# Google Sheets Clip Tracker — Build Spec (Internal)
Create a Sheet named: **Clip Factory — Tracker (Master)**

## Tab 1: QUEUE
Columns (with recommended dropdowns):
- Client
- Project ID (e.g., CF-YYYYMMDD-Client)
- Source Link
- Intake Received (date)
- SLA Deadline (date/time)
- Editor (dropdown: Bob / Editor1 / Editor2)
- Status (dropdown): Intake / Downloading / Auto-Select / Scripted Hooks / Editing / Captions / QA / Client Review / Revisions / Delivered
- Priority (dropdown): Normal / Rush
- Notes

## Tab 2: CLIPS
Columns:
- Project ID
- Clip # (1–10)
- Clip Filename
- Timestamp In
- Timestamp Out
- Hook Text (final)
- CTA Text
- Caption Style (dropdown: RE / Fitness / B2B / Custom)
- B-roll Notes
- Status (dropdown): Selected / In Edit / QA / Sent / Approved / Revise / Final
- QA Score (1–5)
- Reviewer Notes
- Export Links (Drive/Frame.io)

## Tab 3: QA CHECK
- Checklist items in rows (Hook <1.5s, captions safe margins, audio normalized, no dead air, CTA present, branding correct, export settings correct)
- Columns: Clip Filename, Pass/Fail, Notes, Fix Owner

## Suggested data validation + formatting
- Conditional formatting: if **Status = Revisions** highlight yellow; **Status = Delivered** green; **SLA Deadline < NOW()** red.
- Freeze header rows; protect dropdown columns.

## Operating cadence
- Update QUEUE status at each stage change.
- Update CLIPS tab per clip at selection, after edit, after QA, after delivery.

This package completes the “fast feedback + operations tracking” layer so the 48-hour promise stays reliable at volume.