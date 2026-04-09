# DFY Clip Factory — “Give Feedback Fast” One-Pager + Tally Intake Form Spec + Google Sheets Clip Tracker Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:23:47.753Z

---

# DFY Clip Factory — How to Give Feedback Fast (So We Hit 48 Hours)

**Purpose:** We deliver **10 ready-to-post vertical clips in 48 hours**. The #1 thing that can delay delivery is slow or unclear feedback. Use this guide so we can move fast.

## 1) Where to leave feedback
Use **Frame.io comments** (preferred) or Google Drive comments. If neither works, email feedback to **agent_bob_replit+clip-factory@agentmail.to**.

**Best practice:** leave comments **directly on the clip timeline** at the exact timestamp.

## 2) Feedback format (copy/paste)
For each requested change, use this template:

**Clip ID:** (example: `C03`)  
**Timestamp:** (example: `00:03–00:06`)  
**Issue type:** Hook / Captions / Cut / B-roll / CTA / Branding / Compliance  
**Requested change (objective):** (example: “Replace hook text with: ‘3 mistakes first-time buyers make’”)  
**If you want alternate options:** (example: “Provide 2 hook variations”) 

## 3) What counts as “in-scope” revisions (fast)
We include **1 revision round** per batch (10 clips). In-scope:
- Fix typos, punctuation, or misheard words in captions
- Adjust hook text (swap in your preferred phrasing)
- Swap a b-roll suggestion or remove a sensitive visual
- Minor timing trims (tighten a pause, remove a filler phrase)
- CTA/end card text edits

## 4) Out-of-scope changes (can break the 48h timeline)
These typically require re-editing or re-selecting highlights:
- Changing the **10 selected moments** after previews are delivered
- Requesting a new style direction after clips are edited
- Heavy re-structure (moving segments around, new narrative)
- Adding custom motion graphics beyond the preset style pack

If you need these, we can quote an add-on or schedule a second delivery window.

## 5) Feedback deadlines (protecting the SLA)
To keep the 48-hour turnaround:
- We need feedback **within 12 hours** of preview delivery.
- If we don’t hear back within 12 hours, we proceed using the **QA scorecard** as the standard and deliver the final set on time.

## 6) “Greenlight” options
If you’re busy, reply with one of these:
- **“Approved — ship as-is.”**
- **“Approved with these 3 changes only:”** (list them)

## 7) Quality standard we use
We QA every clip against:
- Hook lands in the **first 1.5 seconds**
- Pattern interrupt every **2–3 seconds** (cut/zoom/b-roll/caption emphasis)
- Captions are readable (safe margins, high contrast)
- No dead air, no awkward cuts, no broken words
- Correct platform export (9:16, correct bitrate, audio intact)

**Questions?** Email: **agent_bob_replit+clip-factory@agentmail.to**  
Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

---

# Build Spec — Tally.so Intake Form (Free Tier)

**Goal:** Collect everything needed to start production with zero back-and-forth.

## Form Settings
- Form name: **“Clip Factory Intake — 10 Clips / 48 Hours”**
- Enable: “Send copy of responses to respondent” = ON
- Notifications: send to **agent_bob_replit+clip-factory@agentmail.to**
- End screen message: “Thanks—please watch for an email from agent_bob_replit+clip-factory@agentmail.to with upload + review instructions.”

## Sections + Fields (in order)
### A) Contact + Billing Admin
1. Full name (required)
2. Brand / company name (required)
3. Email for delivery (required)
4. Phone/WhatsApp (optional)
5. Time zone (required)

### B) Source Content
6. Content type (dropdown): Podcast video / Zoom recording / YouTube video / Webinar / Other
7. Link to source file (required): Google Drive/Dropbox/YouTube link
8. If sending raw file later: checkbox “I will upload to the folder you provide”
9. Episode title (required)
10. Length of source (required)
11. Speaker count (dropdown): 1 / 2 / 3+
12. Speaker names + roles (short text)

### C) Target + Audience
13. Target platform(s) (checkbox): TikTok / IG Reels / YouTube Shorts
14. Audience (short text)
15. Primary offer (short text)
16. Desired CTA (dropdown): Follow / Comment keyword / DM / Book call / Visit site / Other
17. CTA link (if any)

### D) Clip Direction
18. Niche preset (dropdown): Real Estate / Fitness / B2B / “Use my brand kit”
19. Clip vibe (checkbox): Educational / Contrarian / Story / Tactical / Motivational
20. Topics to prioritize (paragraph)
21. Topics to avoid (paragraph)
22. Compliance notes (checkbox): No profanity / No medical claims / No financial claims / Other

### E) Branding Assets
23. Brand kit link (logo/fonts/colors) (optional)
24. On-screen handle (required)
25. End card CTA text (required)

### F) Approval + Speed Rules
26. Confirm: 48-hour SLA starts after assets received (required checkbox)
27. Confirm: 1 revision round per batch (required checkbox)
28. Confirm: feedback within 12 hours to maintain SLA (required checkbox)

### G) Notes
29. Anything else? (paragraph)

---

# Build Spec — Google Sheets Clip Tracker (Internal)

**Goal:** Track throughput and SLA across clients/episodes; prevent misses.

## Sheet Structure (3 tabs)
### Tab 1: `QUEUE`
Columns:
- Client
- Episode ID
- Source link
- Intake received (date/time)
- SLA deadline (auto: +48h)
- Priority (dropdown: Standard / Rush)
- Assigned editor
- Status (dropdown): Intake / Downloaded / Auto-cut / Select highlights / Edit pass / QA / Sent preview / Revisions / Delivered
- Blockers (free text)
- Next action (free text)

### Tab 2: `CLIPS`
One row per clip.
Columns:
- Client
- Episode ID
- Clip ID (C01–C10)
- Hook text
- Timestamp in source (start–end)
- Topic label
- Status (dropdown): Not started / Editing / QA / Previewed / Revision / Approved / Delivered
- Export links (TikTok / Reels / Shorts)
- Notes
- QA score (Pass/Fail)

### Tab 3: `QA_SCORECARD`
Checkbox columns (TRUE/FALSE) per clip:
- Hook in first 1.5s
- Pattern interrupts 2–3s
- Captions readable (safe margins)
- Captions accurate
- No dead air
- Branding present
- CTA end card present
- Platform export correct
- Audio clean
- Final pass

## Dropdown Values
- Status fields as listed above
- Priority: Standard, Rush

## Conditional Formatting (simple)
- SLA deadline within 12h = yellow
- SLA deadline past due = red
- Any clip with QA score Fail = red row highlight

## Operational Rule
- `QUEUE` is updated at every handoff.
- `CLIPS` must show 10 rows before preview is sent.
- Delivery cannot be marked “Delivered” until all 10 clips are “Approved” or “Delivered” with links filled.
