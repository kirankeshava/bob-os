# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Build-Spec + Google Sheets Tracker Build-Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:11:40.016Z

---

## 1) Client One-Pager: How to Give Feedback Fast (So We Hit 48 Hours)

**Clip Factory Review Guide (10 minutes total)**

To keep your delivery on the 48-hour timeline, we need **fast, specific, consolidated feedback**. Please use this guide so revisions are quick and accurate.

**Where you’ll review**
- You’ll receive a review link (Frame.io or Google Drive). Each clip is labeled clearly (e.g., `CLIP_03`), so you can comment on the exact moment.
- If you have any access issues, email us immediately: **agent_bob_replit+clip-factory@agentmail.to**

**What “good feedback” looks like (use timecodes + one instruction)**
When leaving feedback, include:
1) **Clip ID** (e.g., CLIP_03)
2) **Timecode** (e.g., 00:02–00:05)
3) **Single instruction** (e.g., “Change caption wording to: …”)

Examples:
- ✅ “CLIP_02 00:01–00:03: Swap hook text to ‘Stop wasting 3 hours on this…’ ”
- ✅ “CLIP_07 00:10: Blur client name on screen.”
- ❌ “Make it punchier.” (too vague)

**The 4 feedback categories (pick one per comment)**
1) **Hook** (first 1–2 seconds): change opening line, tighter cut, stronger claim.
2) **Captions**: spelling, emphasis, line breaks, timing.
3) **Pacing**: remove a pause, tighten an answer, jump cut earlier.
4) **Brand**: colors, font size, handle/CTA, logo placement.

**10-minute feedback workflow (recommended)**
1) Watch all clips at 1.25x speed. (4–6 minutes)
2) Pick your **Top 3** clips and leave notes first. (2 minutes)
3) Only then leave notes on the remaining clips if needed. (2 minutes)

**Scope reminder (so turnaround stays fast)**
Included revisions (choose up to **1 revision round**):
- Text/caption fixes
- Minor cut tweaks (tighten/trim)
- Swap CTA/end card text
- Small framing adjustments

Not included in standard 48h revision:
- New concept direction for all clips
- Rebuilding clips from entirely different segments
- New b-roll sourcing or heavy motion redesign

**Deadline for feedback**
To stay on the 48-hour schedule, please send feedback within **12 hours** of delivery. If feedback arrives later, revised delivery moves accordingly.

**Need help?**
Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

---

## 2) Tally.so Intake Form Build-Spec (Free Tier, Copy/Paste Build)

**Goal:** Collect everything needed to produce 10 clips in 48 hours without back-and-forth.

### Form Title
**Clip Factory Intake — 10 Clips in 48 Hours**

### Intro copy
“Thanks for choosing Clip Factory. This form takes ~5 minutes. After submission, you’ll receive confirmation via **agent_bob_replit+clip-factory@agentmail.to**. Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

### Section A — Contact
1. Full name (short text)
2. Email (email field)
3. Business/Brand name (short text)
4. Primary platform(s) (multi-select): TikTok / IG Reels / YouTube Shorts / LinkedIn / Other
5. Handle(s) (short text)

### Section B — Source Content
6. Content type (single select): Podcast video / Zoom recording / Webinar / Talking-head / Other
7. Source link (short text): YouTube link / Drive link / Dropbox link
8. Upload option (single select): “I’ll share a Drive/Dropbox link” / “I want a secure upload link”
9. Total runtime (single select): <30m / 30–60m / 60–120m / 2h+
10. Speaker count (single select): 1 / 2 / 3+
11. Any sensitive topics to avoid? (long text)

### Section C — Clip Goals
12. Primary goal (single select): Leads / Views / Authority / Sales / Community
13. Target audience (long text)
14. Offer/CTA (short text): “Book a call,” “Download guide,” “Follow,” etc.
15. CTA link (short text)

### Section D — Style & Brand
16. Choose a base style preset (single select): Real Estate / Fitness / B2B / “Match my existing style”
17. Brand colors (long text) + (optional) hex codes
18. Font preference (short text) or “No preference”
19. Logo upload/link (file upload if available; if not, link field)
20. Examples you like (links) (long text)
21. Forbidden words/claims (long text)

### Section E — Content Rules
22. Must-include phrases (long text)
23. Compliance notes (single select + long text): None / Real estate disclaimers / Health disclaimers / Financial disclaimers / Other
24. Caption language (single select): English / Other
25. Profanity (single select): Allowed / Avoid

### Section F — Delivery
26. Delivery method (single select): Frame.io review / Google Drive folder
27. Deadline/timezone (date + time + timezone)

### Section G — Confirmation
28. Agreement checkbox: “I confirm I have rights to use this content and approve Clip Factory to edit it for social distribution.”
29. Agreement checkbox: “I understand the standard package includes 10 clips and 1 revision round, and feedback is required within 12 hours to maintain timelines.”

### Submission message
“Thank you. We’re starting production. Expect the first delivery within 48 hours. Questions: agent_bob_replit+clip-factory@agentmail.to”

---

## 3) Google Sheets Clip Tracker Build-Spec (Internal Ops)

**Goal:** Track throughput, owners, statuses, SLA timing, review links, and revision requests for every clip.

### Sheet Name
**Clip Factory — Production Tracker**

### Tab 1: `Queue`
Columns (left to right):
1. Client
2. Project / Episode ID
3. Source Link
4. Platform Targets (TT/IG/YTS)
5. Preset (RE/FIT/B2B/CUSTOM)
6. Due Date/Time (timezone)
7. SLA Clock Start (timestamp)
8. Owner (Editor)
9. Owner (QA)
10. Status (data validation dropdown)
11. Clip Count Target (default 10)
12. Notes / Risks

**Status dropdown values (in order):**
- Intake Received
- Assets Missing
- Downloading/Transcoding
- Auto-Select (Opus)
- Select Locked
- Editing (CapCut)
- Captions Styled
- QA Ready
- QA Passed
- Delivered
- Revision Requested
- Revision In Progress
- Revision Delivered
- Closed

### Tab 2: `Clips`
One row per clip.
Columns:
1. Client
2. Project / Episode ID
3. Clip ID (CLIP_01…CLIP_10)
4. Hook Text (first line)
5. Timestamp In/Out
6. Length (sec)
7. Pattern Interrupts Present? (Y/N)
8. Captions Style Applied (preset)
9. B-roll cues inserted? (Y/N)
10. Exported TT (Y/N)
11. Exported IG (Y/N)
12. Exported YTS (Y/N)
13. File Name
14. Drive/Frame.io Link
15. QA Score (Pass/Fail)
16. QA Notes
17. Client Feedback Notes
18. Revision Needed? (Y/N)

### Tab 3: `QA Checklist`
A checkbox list that mirrors the SOP QA (hook timing, safe margins, caption readability, audio, no dead air, no typos, correct branding, correct CTA/end card, platform specs, file naming).

### Tab 4: `SLA Dashboard` (lightweight)
- Count of projects by Status
- Average time in production (Delivered timestamp – SLA start)
- Late flags (IF Delivered > Due)

### Simple automation (optional, no paid tools)
- Use conditional formatting to highlight `Due Date/Time` within 6 hours and status not “Delivered”.
- Use conditional formatting to highlight “Assets Missing”.

---

If you want, I can also rewrite the one-pager into a **Frame.io comment template** (copy/paste) so clients naturally leave timecoded feedback in the right format.