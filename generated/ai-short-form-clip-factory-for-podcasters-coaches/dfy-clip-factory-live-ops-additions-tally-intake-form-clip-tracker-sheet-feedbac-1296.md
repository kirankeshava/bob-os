# DFY Clip Factory — Live Ops Additions (Tally Intake Form + Clip Tracker Sheet + Feedback-Fast One-Pager + Runbook Index)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:40:49.639Z

---

## 0) Runbook Index (Start Here)
**Goal:** Deliver **10 ready-to-post vertical clips in 48 hours** per episode/video.

**Operational sequence**
1. **Client Intake (Tally/Google Form)** → capture assets, goals, brand style, and must-include moments.
2. **Asset Ingest** → download/source file(s), verify audio, create project folders.
3. **AI First Pass** (OpusClip or Descript) → find highlights, generate captions, rough clip set.
4. **Editor Pass** (CapCut template preset) → hook tightening, pattern interrupts, b-roll cues, end card.
5. **QA Gate** → scorecard checks; fix critical issues only.
6. **Client Review** (Drive/Frame.io) → collect feedback in one batch.
7. **Revisions (bounded)** → apply allowed revisions and finalize.
8. **Delivery** → exports + captions + posting notes + archive.

**Links to share with customers (legitimacy + contact):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Email: agent_bob_replit+clip-factory@agentmail.to

---

## 1) Tally Intake Form (Copy-Ready, Free Tier)
**Form title:** DFY Clip Factory — 10 Clips in 48 Hours Intake

**Intro text (top of form):**
Thanks for choosing Clip Factory. This intake takes ~5 minutes and helps us deliver **10 vertical clips within 48 hours**. If anything is unclear, email **agent_bob_replit+clip-factory@agentmail.to**.

### Section A — Contact + Brand
1) **Full Name** (short answer)
2) **Email for delivery + review invites** (email)
3) **Brand / Channel name** (short answer)
4) **Website / socials** (short answer)
5) **Primary audience** (short answer)
6) **Niche** (multiple choice): Real Estate / Fitness / B2B / Other (short answer)

### Section B — Source Content
7) **Upload link** (required) (short answer)
- Help text: Google Drive/Dropbox link to the full episode/video (or raw files). Make sure permissions are set to “Anyone with link can view.”
8) **Source type** (multiple choice): Podcast video / Podcast audio only / Webinar / Coaching call / YouTube long-form / Other
9) **Length of source** (multiple choice): <30 min / 30–60 min / 60–90 min / 90+ min
10) **Do you have a transcript?** (yes/no)
- If yes: **Transcript link** (short answer)

### Section C — Clip Goals + Constraints
11) **Primary goal** (multiple choice): Awareness / Lead gen / Authority / Course sales / Podcast growth
12) **Offer/CTA** (short answer)
- Help text: What should viewers do? (Follow, comment keyword, book a call, download lead magnet)
13) **No-go topics / compliance notes** (long answer)
- Help text: Claims to avoid, regulated language, platform sensitivity.
14) **Must-include moments** (long answer)
- Help text: Timecodes or descriptions (e.g., “12:14–13:02 the story about …”).
15) **Must-avoid moments** (long answer)

### Section D — Platforms + Output
16) **Platforms** (checkboxes): TikTok / Instagram Reels / YouTube Shorts
17) **Tone** (multiple choice): Clean/Corporate / Energetic / Bold / Calm
18) **Preferred clip length** (multiple choice): 15–25s / 20–35s / 30–60s / Mixed
19) **On-screen captions** (multiple choice): Yes (always) / Sometimes / No

### Section E — Style Preset Selection
20) **Choose a default style preset** (multiple choice): Real Estate / Fitness / B2B / “Match my brand” (upload reference)
21) **Upload brand kit** (optional) (file upload)
- Logos, colors, fonts.
22) **Reference links (3–5)** (long answer)
- Help text: Links to reels/shorts you love.

### Section F — Access + Delivery
23) **Preferred delivery method** (multiple choice): Google Drive folder / Frame.io review link
24) **Google Drive email to invite** (short answer)
25) **Deadline constraints** (long answer)
- Help text: If you have a hard publish window, specify.

### Section G — Permissions + Agreement (scope control)
26) **Content rights confirmation** (required checkbox)
- “I confirm I own or have rights to the source content and approve Clip Factory to edit it for marketing clips.”
27) **Revision policy acknowledgement** (required checkbox)
- “I acknowledge the included revision policy: 1 revision round covering up to 5 clips, text/timing/trim changes only. Additional changes may require a new request.”
28) **SLA acknowledgement** (required checkbox)
- “I understand 48-hour delivery begins once all assets and permissions are received.”

**Submission confirmation message:**
Thanks—your request is in. We’ll confirm receipt within 4 business hours. For urgent updates email **agent_bob_replit+clip-factory@agentmail.to**.

---

## 2) Clip Tracking Sheet (Google Sheets Spec — Create Exactly)
**Sheet name:** Clip Factory — Tracker

### Tab 1: Jobs
**Columns (left → right):**
1. Job ID (e.g., CF-YYYYMMDD-Client-Ep01)
2. Client Name
3. Client Email
4. Niche Preset (RE / FIT / B2B / Custom)
5. Source Link
6. Source Length
7. Platforms (TT/IG/YT)
8. Intake Received (timestamp)
9. Assets Verified (Y/N)
10. SLA Start (timestamp)
11. SLA Due (timestamp = SLA Start + 48h)
12. Assigned PM
13. Assigned Editor
14. Status (dropdown): Intake / Ingest / AI Pass / Edit / QA / Client Review / Revisions / Delivered / Blocked
15. Blocker Reason (text)
16. Delivery Folder Link
17. Review Link (Frame.io or Drive)
18. Client Feedback Due (timestamp)
19. Delivered (timestamp)
20. On-Time? (formula)
21. Notes

**Suggested formulas:**
- On-Time? =IF(AND([Delivered]<="[SLA Due]",[Delivered]<>""),"YES",IF([Delivered]="","","NO"))

### Tab 2: Clips
**Columns:**
1. Job ID
2. Clip # (1–10)
3. Working Title
4. Start Timecode
5. End Timecode
6. Hook Text (first 1.5s)
7. Pattern Interrupts Used (Y/N)
8. Captions Style (Preset + variant)
9. B-roll Cue Notes
10. CTA / End Card
11. Status (dropdown): Selected / Editing / QA / Needs Fix / Approved / Delivered
12. Export Set (TT/IG/YT)
13. File Name
14. Drive Link
15. QA Score (0–10)
16. QA Issues (text)

### Tab 3: QA Scorecard (embedded checklist reference)
**Rows:** Captions accuracy, safe margins, hook clarity, pacing, audio, jump cuts, brand colors, CTA, export settings, filename correctness.

---

## 3) Client One-Pager — “How to Give Feedback Fast (So We Still Hit 48 Hours)”
**Title:** How to Give Feedback Fast (and keep the 48-hour promise)

To reliably deliver within **48 hours**, we need feedback in a single, clear batch. Here’s the fastest way to review:

### What you’ll receive
- A review link (Google Drive or Frame.io) containing **10 numbered clips**.
- Each clip file name includes the clip number and a short title (example: `CF-20260409-Acme-Ep12_C03_Cold-Open-Story_TT-IG-YT_v1.mp4`).

### How to leave feedback (best practice)
**1) Review all 10 clips first** (don’t comment clip-by-clip as you go).

**2) Reply in one message** (email or comments), using this format:
- Clip 03: Change caption line 2 to “_____” at 0:04
- Clip 05: Trim first 0.5s (start at “_____”)
- Clip 07: Replace CTA end card with “Book a call: ____”

**3) Keep revision requests within scope** (so we stay on schedule):
Included in the standard revision round:
- Caption text fixes
- Small timing adjustments
- Minor trims (tighten start/end)
- Swap CTA text (if provided)

Not included (may require a new request):
- Recutting new highlights from scratch
- Major re-storyboarding
- Extensive brand redesign across all clips

### Your review deadline
To keep the **48-hour delivery**, please send feedback within **12 hours of receiving the review link**.

### Need help?
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Email: agent_bob_replit+clip-factory@agentmail.to

---

## 4) Quick Addendum — SLA + Revision Policy (for consistency)
**SLA start:** begins when we have (a) source file access + permissions, (b) platform targets, (c) chosen style preset or brand references.

**Delivery promise:** 10 clips delivered within **48 hours**.

**Revisions included:** **1 revision round**, up to **5 clips**, text/timing/trim changes only.

**Client response requirement:** feedback within **12 hours** of review link for on-time guarantee.

**If client feedback is late:** SLA pauses until feedback arrives; delivery shifts accordingly.
