# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Build Spec + Google Sheets Clip Tracker Build Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:57:20.214Z

---

## 1) Client One-Pager: How to Give Feedback Fast (So We Hit 48 Hours)

**Clip Factory Contact**
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Email: agent_bob_replit+clip-factory@agentmail.to

### Our 48-hour promise depends on fast, specific feedback
To deliver **10 ready-to-post vertical clips within 48 hours**, we need feedback that is:
1) **Fast** (sent within the feedback window)
2) **Binary** (Approve / Change)
3) **Specific** (what to change + exact timecode)

### The simplest way to review (2-pass method)
**Pass 1 — Hook + Topic fit (2 minutes total)**
For each clip, answer only:
- ✅ Keep / ❌ Replace (hook doesn’t grab, wrong angle, not on-brand)
- If Replace: tell us **the alternative moment** (rough timestamp) or say “pick a different moment”.

**Pass 2 — Polish (optional, only if needed)**
Use timecodes and one instruction per note:
- “00:03–00:06: remove ‘um’ cut”
- “00:08: caption typo: change ‘their’ → ‘there’”
- “00:12: b-roll: show ‘house exterior’ not ‘interior’”

### What we need from you (required)
When you send feedback, please include:
- **Clip ID** (example: `C03`)
- **Decision**: Approve / Needs changes
- **Exact timecode** (start–end)
- **Instruction** (1 sentence)

**Good feedback example**
- `C03` Needs changes: 00:00–00:02 hook is too slow. Replace with the moment around 12:44 where you say “Here’s the #1 mistake…”

**Bad feedback example**
- “Make it pop more.” (Not actionable; causes delays.)

### What counts as a revision (and what doesn’t)
**Included (1 revision round):**
- Caption fixes, timing tweaks, minor pacing edits
- Swapping 1–2 b-roll shots
- Reframing/cropping adjustments

**Not included (new scope):**
- Rewriting the clip angle/topic entirely after approval
- Requesting additional clips beyond the 10
- Rebuilding the style from scratch or changing brand direction after we start

### Feedback deadlines (protect the 48-hour SLA)
- We send a review set as soon as clips are ready.
- **Please reply within 12 hours** to keep delivery on schedule.
- If we don’t hear back within the window, we proceed with best judgment and deliver on time.

### Where to send feedback
Reply to the delivery email or email: **agent_bob_replit+clip-factory@agentmail.to**

---

## 2) Tally.so Intake Form — Build Spec (Free Tier)
**Goal:** One link that captures everything needed to produce 10 clips in 48h with minimal follow-up.

### Form Title
**Clip Factory — 10 Clips / 48-Hour Intake**

### Intro text (top of form)
“Fill this in once per episode/video. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

### Sections + Fields (with types)

**A) Client + Project Basics**
1. Full name (Short answer) — Required
2. Brand / Company name (Short answer) — Required
3. Email for delivery (Email) — Required
4. Time zone (Dropdown) — Required (ET/CT/MT/PT/UK/EU/Other)
5. Project type (Dropdown) — Required (Podcast / Coaching call / Webinar / YouTube video / Other)

**B) Source Content**
6. Source link (Short answer) — Required (YouTube / Drive / Dropbox / etc.)
7. If not public, access instructions/password (Long answer) — Optional
8. Source length (Dropdown) — Required (<30m / 30–60m / 60–120m / 2h+)
9. Speaker count (Dropdown) — Required (1 / 2 / 3+)
10. Any must-avoid topics or compliance notes? (Long answer) — Optional

**C) Platforms + Deliverables**
11. Platforms you want (Checkboxes) — Required (TikTok / IG Reels / YouTube Shorts)
12. Deliverable quantity (Dropdown) — Required (10 clips)
13. Preferred clip length (Dropdown) — Required (15–25s / 25–45s / 45–60s / Mix)
14. Tone (Checkboxes) — Required (Educational / Motivational / Contrarian / Storytime / Sales/Offer)

**D) Hook + Highlights Guidance**
15. Your audience in one sentence (Long answer) — Required
16. Top 3 topics we should prioritize in this episode (Long answer) — Required
17. Your offer/CTA (Short answer) — Optional (ex: “Book a call”, “Download lead magnet”, “Follow for X”)
18. Link for CTA (Short answer) — Optional
19. Anything we must include as a quote/moment? (Long answer) — Optional (timestamps welcome)

**E) Style + Branding**
20. Choose a style preset (Dropdown) — Required (Real Estate / Fitness / B2B / Use my brand kit)
21. Brand kit link (Short answer) — Optional (Drive/Dropbox)
22. Brand colors (Short answer) — Optional
23. Brand font preference (Short answer) — Optional
24. Caption style preference (Dropdown) — Required (Clean / Bold / Karaoke highlight)

**F) Pronunciation + Names**
25. Names/terms that must be spelled correctly (Long answer) — Optional
26. Words to censor/bleep (Long answer) — Optional

**G) Logistics + SLA**
27. When do you need delivery? (Dropdown) — Required (Standard 48 hours / Other)
28. Where should we deliver? (Dropdown) — Required (Google Drive / Frame.io / Both)
29. Confirm: You own/are authorized to use this content (Checkbox) — Required
30. Confirm: 1 revision round included; additional changes may be billed or scoped separately (Checkbox) — Required

### Confirmation message (after submit)
“Thanks—intake received. If we have everything we need, production starts within 2 business hours. You’ll receive delivery within 48 hours. Questions: agent_bob_replit+clip-factory@agentmail.to”

---

## 3) Google Sheets Clip Tracker — Build Spec (Free)
**Goal:** A single tracker that makes 10 clips/48h predictable: visibility, owners, timestamps, review status, and delivery.

### Sheet Name
`ClipFactory_Tracker_MASTER`

### Tabs
1) **Dashboard** (optional simple summary)
2) **Episode Tracker** (main operational tab)
3) **Dropdowns** (data validation source)

### Dropdowns tab (create lists)
- Status: `Intake Received`, `Source Downloaded`, `Transcribed`, `Select Highlights`, `Edit In Progress`, `Captions Styled`, `QA`, `Client Review`, `Revisions`, `Final Exported`, `Delivered`, `Blocked`
- Platform: `TikTok`, `IG Reels`, `YT Shorts`, `All`
- Priority: `P1`, `P2`, `P3`
- Preset: `Real Estate`, `Fitness`, `B2B`, `Client Brand Kit`

### Episode Tracker columns (left to right)
A. Client Name
B. Client Email
C. Project / Episode Title
D. Source Link
E. Received (date-time)
F. SLA Due (date-time)
G. Preset (dropdown)
H. Platforms (text or dropdown)
I. Clip ID (C01–C10)
J. Clip Timestamp IN (hh:mm:ss)
K. Clip Timestamp OUT (hh:mm:ss)
L. Hook text (1 line)
M. Working Title
N. Status (dropdown)
O. Owner (Editor)
P. QA Owner
Q. Review Link (Drive/Frame.io)
R. Client Feedback Received? (Yes/No)
S. Revision Notes (short)
T. Export Link (final)
U. Delivered? (Yes/No)
V. Notes / Blockers

### Recommended rules
- Freeze header row.
- Data validation for Status/Preset.
- Conditional formatting:
  - Status = `Blocked` → red
  - SLA Due within 12 hours and not Delivered → orange
  - Delivered = Yes → green

### Clip ID convention
For each episode, create 10 rows with Clip IDs `C01` to `C10`. This mirrors folder naming and prevents mismatches.
