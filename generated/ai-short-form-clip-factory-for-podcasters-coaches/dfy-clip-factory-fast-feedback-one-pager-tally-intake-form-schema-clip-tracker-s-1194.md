# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Schema + Clip Tracker Sheet Setup (Copy-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:45:52.516Z

---

# DFY Clip Factory — How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory** turns your long video/podcast into **10 ready-to-post vertical clips in 48 hours**. Fast feedback is the #1 lever that keeps the SLA intact.

**Official site (for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Contact:** agent_bob_replit+clip-factory@agentmail.to

## 1) Where you leave feedback
We deliver via **Frame.io** (preferred) or a **Google Drive folder**.
- **Frame.io:** leave **timestamped comments** on the exact moment.
- **Drive:** reply in the provided “Feedback” Google Doc using the clip filename + timecode.

## 2) What “good feedback” looks like (copy/paste)
Use this format so our editor can apply changes in minutes:

**Clip:** `CLIENT_E05_CL03_TikTok_1080x1920_v1.mp4`  
**Time:** `00:03–00:06`  
**Change:** “Replace caption line with: ‘Most agents lose deals here—don’t.’”  
**Reason (optional):** “Better hook, matches my voice.”

More examples:
- “**00:12** remove 1 second pause (tighten pace).”
- “Swap **CTA end card** to ‘DM “PLAN” for the checklist’.”
- “Caption style: make keywords **yellow** for this clip only.”

## 3) What not to do (causes delays)
Avoid:
- “Make it more engaging” (too vague)
- Rewriting the whole clip list after delivery
- Asking for new clips from a different section of the episode (that’s new scope)

## 4) Approval workflow (fastest path)
To stay within 48 hours:
1) **Approve 8–10 clips** with light edits (ideal)
2) Provide **one consolidated revision list** (not multiple messages)
3) Stick to **one revision round** unless we made an error

## 5) What counts as an included revision vs. new scope
**Included (1 round):**
- Caption text tweaks
- Minor trimming (±2–3 seconds)
- Swap hook line / reorder first 2–3 seconds
- B-roll swap from suggested cues
- On-screen CTA text change

**New scope (requires quote / new order):**
- New clips from entirely different timestamps not in the delivered set
- New episode/source file
- Full style redesign after previews (fonts/colors/layout)
- Additional aspect ratios beyond agreed deliverables

## 6) Deadline for feedback (protects the SLA)
- Please send revision notes within **12 hours of delivery**.
- If feedback arrives after 12 hours, turnaround may shift (we’ll still prioritize you, but the clock pauses).

---

# Tally.so Intake Form — Copy-Ready Schema (10 Clips / 48 Hours)

**Form title:** Clip Factory — 10 Clips in 48 Hours (Client Intake)

**Intro text:**
“Fill this out once per episode. This helps us deliver 10 ready-to-post clips in 48 hours. Questions? agent_bob_replit+clip-factory@agentmail.to | Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

## Section A — Basic Info
1. **Brand / Creator name** (Required, short text)
2. **Primary contact email** (Required, email)
3. **Best place for quick questions** (Required, multiple choice)
   - Email
   - Slack
   - WhatsApp
   - Other (short text)

## Section B — Source Content
4. **Episode title** (Required)
5. **Source type** (Required, multiple choice)
   - YouTube link
   - Podcast audio (MP3/WAV)
   - Raw video file (MP4/MOV)
   - Drive/Dropbox link
6. **Source link / upload link** (Required, long text)
7. **Approx length** (Required, multiple choice)
   - < 30 min
   - 30–60 min
   - 60–120 min
   - 2+ hours
8. **Number of speakers** (Required)
9. **Any speaker names / roles?** (Optional)
10. **Must-include timestamps / segments** (Optional, long text)
11. **Must-avoid topics / compliance notes** (Optional, long text)

## Section C — Goals & Audience
12. **Primary goal** (Required)
   - Leads / booked calls
   - Course / offer sales
   - Followers / reach
   - Authority / brand
13. **Target audience** (Required, long text)
14. **Offer / CTA** (Required, long text)
   - Example: “Book a discovery call at ___” or “DM ‘PLAN’ for the checklist”

## Section D — Platforms & Deliverables
15. **Platforms** (Required, checkbox)
   - TikTok
   - Instagram Reels
   - YouTube Shorts
16. **Preferred clip length** (Required, multiple choice)
   - 15–30s
   - 30–45s
   - 45–60s
17. **On-screen face-cam requirement** (Required)
   - Keep speaker visible always
   - Mix speaker + b-roll
   - Mostly b-roll acceptable

## Section E — Style Preset Selection
18. **Choose a style preset** (Required)
   - Real Estate (clean, trust, local)
   - Fitness (high-energy, bold)
   - B2B (minimal, premium)
   - Use my brand kit (upload/link)
19. **Brand kit link (logo, fonts, colors)** (Optional, long text)
20. **Caption vibe** (Required)
   - Clean & minimal
   - Bold with keyword highlights
   - Max punch (fast words, larger text)

## Section F — Constraints & Permissions
21. **Music policy** (Required)
   - No music
   - Safe/low music OK
   - Trend music OK (client acknowledges platform risk)
22. **Language / profanity constraints** (Required)
23. **I confirm I own/authorize editing & republishing this content** (Required, checkbox)

## Section G — Delivery & Review
24. **Delivery preference** (Required)
   - Frame.io review link (recommended)
   - Google Drive folder
25. **Time zone** (Required)
26. **Anything else we should know?** (Optional)

**End screen text:**
“Thanks — we’ll confirm receipt and delivery ETA by email. Questions: agent_bob_replit+clip-factory@agentmail.to”

---

# Google Sheets Clip Tracker — Setup Guide (Free Tier, 10-Min Build)

## Create 2 tabs
### Tab 1: `CLIP_QUEUE`
Add these columns (left to right):
1. **Client**
2. **Project/Episode ID** (e.g., `ACME_E05`)
3. **Source Link**
4. **Platform** (TikTok / Reels / Shorts)
5. **Aspect** (`9:16`)
6. **Clip #** (01–10)
7. **Start TC**
8. **End TC**
9. **Working Title / Hook**
10. **Editor Owner**
11. **Status** (data validation dropdown)
12. **Version** (`v1`, `v2`)
13. **Export Filename**
14. **Review Link** (Frame.io URL)
15. **QA Pass** (checkbox)
16. **Client Approved** (checkbox)
17. **Notes / Feedback**

**Status dropdown values (exact):**
- INTAKE
- DOWNLOAD
- TRANSCRIBE
- SELECTED
- EDITING
- CAPTIONS
- BROLL
- EXPORTING
- QA
- SENT
- REVISION
- APPROVED

### Tab 2: `SLA_DASH`
Columns:
1. **Project/Episode ID**
2. **Intake Timestamp**
3. **SLA Due Timestamp (+48h)**
4. **# Clips Delivered**
5. **# Clips Approved**
6. **At Risk?** (formula or manual)
7. **Blockers**

## Simple rules
- Every clip row must have: Platform, Clip #, Start/End TC, Status, Version, Export Filename.
- Only mark **SENT** once Review Link is pasted.
- Only mark **APPROVED** when Client Approved checkbox is checked.

## Export filename template (use in column)
`{CLIENT}_{EPID}_CL{##}_{PLATFORM}_1080x1920_{STYLE}_v{#}.mp4`
Example:
`ACME_E05_CL03_TikTok_1080x1920_B2B_v1.mp4`
