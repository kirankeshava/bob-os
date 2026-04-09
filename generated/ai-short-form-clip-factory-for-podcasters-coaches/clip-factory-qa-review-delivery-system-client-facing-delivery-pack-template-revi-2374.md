# Clip Factory — QA + Review/Delivery System (Client-Facing) + Delivery Pack Template + Revision Triage Rules + Email Templates + Intake Form Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:05:02.949Z

---

# Clip Factory — What to Expect (Client-Facing Page Copy)

**Welcome to Clip Factory** — we turn your long-form video/podcast into ready-to-post vertical clips (Reels/TikTok/Shorts) with hooks, captions, and posting suggestions.

**Proof/Website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
**Support email:** agent_bob_replit+clip-factory@agentmail.to

---

## 1) What you’ll receive (Delivery Pack)
Each delivery comes as a folder with:
1. **Final MP4 clips** (vertical 9:16, ready-to-post)
2. **Captions file (.SRT)** for each clip
3. **B-Roll / Visual Cue Sheet** (simple table with timestamps + suggested overlays/cutaways)
4. **Posting Suggestions** for each clip:
   - Recommended **first-line caption** (hook)
   - Suggested **hashtags** (platform-appropriate)
   - Optional CTA ideas

---

## 2) Our QA standards (how we prevent “bad clips”)
We run a final Quality Check on every clip before sending it.

### A) Safe zones + framing
- Subject’s face is **not cropped** (forehead/chin not cut off)
- No essential text appears in **platform UI safe-zone risk areas** (bottom caption controls/right-side icons)
- On-screen captions sit **above the bottom UI area** and avoid the right-side icon stack
- If the source is a wide shot, we use **smart reframing** and/or punch-ins to keep focus

### B) Caption accuracy + readability
- Captions match the spoken audio (names/brands checked)
- Punctuation used for clarity (not perfection)
- Words are not cut mid-line; line breaks are readable
- Profanity or sensitive words handled per your preferences (from intake form)

### C) Audio leveling + intelligibility
- Dialogue is clear and consistently audible
- No clipping/distortion; no sudden level jumps
- Background noise reduced where possible without robotic artifacts

### D) Editing cadence (jump cuts + pacing)
- Removes dead air and unnecessary filler while keeping meaning
- Jump cuts are clean; no jarring missing syllables
- Visual rhythm supports retention (pattern interrupts where appropriate)

### E) Hook clarity (first 1–2 seconds)
- Clip opens with a clear point, tension, or curiosity
- If needed, we add a **text hook** to clarify context

### F) Export + formatting
- Vertical: **1080×1920** (unless otherwise requested)
- H.264 MP4, optimized for social upload
- No black bars unless explicitly requested

---

## 3) Review flow (timestamp comments)
We send a **review link** (Frame.io / Vimeo / unlisted YouTube) or a Drive folder with preview files.

### How to request revisions
- Leave **timestamped comments** (e.g., “00:07 change caption wording”)
- If you want a global change (e.g., “make captions bigger”), say it once and specify **which clips** it applies to

### Revision window
- You have **24 hours** from delivery to request included revisions.
- After 24 hours, we can still help, but it may be treated as a new request depending on scope.

---

## 4) Revisions policy (what’s included vs scope change)
Our goal: fast turnaround with predictable outcomes.

### Included (free) revisions — within 24h
- Caption typo fixes / minor punctuation corrections
- Minor timing tweaks (caption sync)
- Audio level adjustments (small)
- Swap a hook text line while keeping the same clip content
- Safe-zone/framing corrections if something was missed

### Not included (scope changes)
These are new work because they change strategy or source selection:
- New clip selection from different sections of the long-form
- Changing the overall style/branding after approval (fonts/colors/layout)
- Major rewrite of captions for “new messaging angle”
- Adding new assets not provided (logos, b-roll packs) or heavy custom motion design
- Creating additional variants per platform beyond the agreed format

If a request is a scope change, we’ll reply with options: (a) do it as a new deliverable, or (b) keep to the original spec.

---

## 5) What we need from you (Intake)
To avoid back-and-forth, please fill out our intake form before we start. It covers:
- Platforms (TikTok / IG Reels / YouTube Shorts)
- Your handles + CTA link
- Tone (direct / playful / authoritative)
- Topics to avoid + banned words
- Caption style preferences

---

# Internal QA Checklist (Editor/Operator)
Use this before every delivery.

## Pre-flight (before editing)
- [ ] Intake received and reviewed (platforms, handles, tone, CTA, banned words)
- [ ] Source file quality confirmed (audio intelligible; video not corrupted)
- [ ] Confirm clip count + target length range
- [ ] Confirm caption style: word-by-word vs line-by-line; highlight style (if any)

## Clip-level QA (repeat for each clip)
### Framing + safe zones
- [ ] Face/eyes remain in frame; no awkward crop
- [ ] Captions not blocked by UI (bottom/right)
- [ ] Any on-screen text (hook/labels) stays in safe area

### Captions
- [ ] Accuracy: names/brands checked
- [ ] Sync: no lag; lines change at natural pauses
- [ ] Readability: line length reasonable; contrast adequate
- [ ] Profanity/sensitive words handled per intake

### Audio
- [ ] No clipping; consistent loudness clip-to-clip
- [ ] Voice intelligible on phone speakers
- [ ] No abrupt audio cuts

### Editing
- [ ] Hook is clear in first 1–2 seconds
- [ ] Dead air removed; pacing is tight
- [ ] Jump cuts not jarring; no cut-off words

### Export
- [ ] 1080×1920 vertical
- [ ] H.264 MP4
- [ ] Filename correct and consistent

## Final pack QA
- [ ] All clips present + play correctly
- [ ] Matching .SRT exists for each clip
- [ ] B-roll cue sheet completed
- [ ] Posting suggestions completed
- [ ] Links set to “Anyone with link can view” where needed

---

# Review + Delivery Process (Ops SOP)
1. **Receive intake** → confirm requirements in writing.
2. **Edit batch** → run Internal QA checklist.
3. **Upload for review** (Frame.io/Vimeo/YouTube/Drive) and send review link.
4. **Client timestamps feedback** within 24h.
5. **Apply included revisions** → re-QA → deliver finals.
6. **Close out** with final folder + summary of what was delivered.

---

# Delivery Pack Template (Folder Structure)
**ClientName_Project_YYYY-MM-DD/**
- **01_Final_MP4/**
  - ClientName_Clip01_HookTopic_1080x1920.mp4
  - ClientName_Clip02_HookTopic_1080x1920.mp4
- **02_Captions_SRT/**
  - ClientName_Clip01.srt
  - ClientName_Clip02.srt
- **03_BRoll_Cue_Sheet/**
  - ClientName_BRoll_Cues.csv (or .xlsx)
- **04_Posting_Suggestions/**
  - ClientName_Posting_Suggestions.docx (or Google Doc link)
- **05_Review_Link/**
  - Review_Link.txt

---

# B-Roll / Visual Cue Sheet (Copy/Paste Table)
| Clip | Timestamp | Spoken line (short) | Suggested visual / b-roll | On-screen text (optional) | Notes |
|------|-----------|----------------------|----------------------------|---------------------------|------|
| 01 | 00:00–00:02 | “Most people do X wrong…” | Punch-in to face | “Stop doing X” | Hook moment |
| 01 | 00:06–00:09 | “Here’s the framework…” | Add 3-step graphic | “3-step framework” | Pattern interrupt |

---

# Posting Suggestions Template (Per Clip)
**Clip 01 — Topic:** [topic]
- **Recommended first line caption:** “If you’re still doing X, this is why it’s not working.”
- **Description (optional):** 1–2 lines expanding context.
- **CTA:** “Follow for more clips like this” / “Link in bio for [offer]”
- **Hashtags (starter set):** #[niche] #marketingtips #businessgrowth #creator #podcast
- **Pin comment suggestion:** “If you want the checklist, comment ‘CHECKLIST’.”

---

# Issue Triage Rules (Refund/Churn Protection)
## Severity levels
**P0 (Critical):** wrong aspect ratio, missing files, unwatchable audio, corrupted export, faces/text cropped severely.  
→ Fix ASAP (same day if possible). Always included.

**P1 (Major):** captions meaningfully incorrect, hook unclear due to missing context text, obvious safe-zone violation, large audio level inconsistency.  
→ Included if requested within 24h.

**P2 (Minor):** small punctuation, preference tweaks, optional hook wording variations.  
→ Included within 24h; batch changes encouraged.

**Scope Change:** new clip selection, new style/branding system, new strategy angle.  
→ Not included; treat as new request.

---

# Client Intake Form — Google Form Build Spec
**Form title:** Clip Factory — Client Intake (Short-Form Clips)

**Required fields (suggested questions):**
1. Email (short answer, required)
2. Brand / Channel name (short answer, required)
3. Primary platform(s) (checkboxes: TikTok, IG Reels, YouTube Shorts, Other) (required)
4. Handles (short answer, required)
5. Link/CTA (short answer, optional)
6. Target audience (short answer, required)
7. Tone (multiple choice: Direct, Friendly, High-energy, Authority/Expert, Other) (required)
8. Topics to avoid (paragraph, optional)
9. Banned words / sensitivity notes (paragraph, optional)
10. Caption style preference (multiple choice: Clean lines, Word-by-word, Highlight keywords) (required)
11. On-screen text preference (multiple choice: Minimal, Moderate, Heavy) (required)
12. Examples you like (paste links) (paragraph, optional)
13. Approval contact (short answer, required)

**Pre-flight mapping (ops):**
- Platforms → export format + safe-zone expectations
- Caption style → template selection
- Banned words/topics → caption filter + hook language
- Handles/CTA → posting suggestions output

---

# Email Templates (Reference website + support email)

## 1) Intake Confirmation Email
**Subject:** Clip Factory — Intake received + next steps

Hi {{FirstName}},

Thanks — we received your intake for Clip Factory.

**Website (proof):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
**Support:** agent_bob_replit+clip-factory@agentmail.to

Next steps:
1) We’ll edit your first batch following the QA standards outlined here: {{NOTION_WHAT_TO_EXPECT_LINK}}
2) We’ll send a review link for timestamp comments.
3) You’ll have **24 hours** after delivery to request included revisions.

If anything changes (tone, banned words, CTA), reply before we start so we can lock the spec.

— Bob (Clip Factory)

## 2) Delivery Email (Review + Delivery Pack)
**Subject:** Your clips are ready — review link + delivery pack

Hi {{FirstName}},

Your clips are ready.

**Review link (timestamp comments):** {{REVIEW_LINK}}
**Delivery folder (final MP4 + SRT + cue sheet + posting suggestions):** {{DRIVE_FOLDER_LINK}}

**What’s inside the Delivery Pack**
- Final vertical MP4s
- Matching .SRT caption files
- B-roll/visual cue sheet
- Posting suggestions (first-line caption + hashtags)

**Revision window:** Please send timestamped revision notes within **24 hours** (by {{REVISION_DEADLINE}}) so we can apply included revisions quickly.

What to expect / QA & revisions policy: {{NOTION_WHAT_TO_EXPECT_LINK}}

— Bob (Clip Factory)  
agent_bob_replit+clip-factory@agentmail.to

## 3) Revision Received (Acknowledgment)
**Subject:** Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes — thanks for the timestamped comments.

We’ll apply the included revisions and send the updated files back here. If anything appears to be a scope change (new clip selection or major style shift), we’ll flag it before proceeding.

— Bob (Clip Factory)

## 4) Revision Completed (Handoff)
**Subject:** Revisions complete — updated clips attached/linked

Hi {{FirstName}},

Revisions are complete.

**Updated delivery folder:** {{DRIVE_FOLDER_LINK_UPDATED}}  
**(Optional) Updated review link:** {{REVIEW_LINK_UPDATED}}

If anything urgent remains, reply within the remaining revision window and include timestamps.

— Bob (Clip Factory)  
agent_bob_replit+clip-factory@agentmail.to

---

# Execution Steps (Next Cycle — Free Tools Only)
1) Create/publish Notion page using this copy → generate public URL → replace {{NOTION_WHAT_TO_EXPECT_LINK}} in templates.
2) Build Google Form from the spec → generate share URL.
3) Add both links to onboarding emails + optionally add a simple “Onboarding” page on the existing website linking to them.
