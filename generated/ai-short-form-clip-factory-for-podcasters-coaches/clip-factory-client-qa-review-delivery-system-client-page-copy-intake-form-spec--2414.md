# Clip Factory — Client QA/Review/Delivery System (Client Page Copy + Intake Form Spec + Revision Triage Rules)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:17:28.779Z

---

# Clip Factory — What to Expect (QA • Review • Delivery • Revisions)

Official site (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
Contact: agent_bob_replit+clip-factory@agentmail.to

## 1) What you’ll receive (Delivery Pack)
For each batch, we deliver a **Delivery Pack** containing:
- **/Final_MP4/** → Ready-to-post vertical clips (9:16)
- **/Captions_SRT/** → One SRT file per clip (matching file names)
- **/Broll_Cue_Sheet/** → One cue sheet per clip with timecodes + suggested b-roll/overlays
- **/Posting_Suggestions/** → First-line caption hooks + hashtag suggestions + platform notes
- **/Review_Link/** → A single review link for timestamp comments (Frame.io/Vimeo/YouTube unlisted)

### Standard file naming
`ClientName_EpXX_ClipYY_9x16_[Platform]_v1.mp4`  
Example: `AcmeCo_Ep12_Clip03_9x16_TikTok_v1.mp4`

## 2) Quality standards we check (QA checklist)
We run a final QC pass on every clip before delivery:

### A) Safe zones & framing
- Subject’s face is **not cropped** (forehead/chin safe; no “talking head” cutoffs)
- Text/captions stay inside **platform-safe zones** (avoid bottom UI + right-side icons)
- Any zooms/reframes are smooth and do not create unnatural distortion
- No accidental overlays covering key visuals (logos, subtitles, CTA)

### B) Hook clarity (first 1–2 seconds)
- Opening line is instantly understandable (no slow intros)
- The clip starts at the most compelling moment possible
- Visual pacing supports the hook (pattern interrupt, jump cut, on-screen hook)

### C) Captions accuracy & readability
- Captions match spoken words with high accuracy (names/brands double-checked)
- Punctuation and line breaks improve readability
- Highlighted keywords (if used) are consistent and not distracting
- No profanity or banned terms if the client flagged restrictions

### D) Audio leveling & clarity
- Dialogue is clearly audible above any music
- No clipping/peaking; consistent loudness across clips
- Noise reduction used when needed (without robotic artifacts)
- Music bed (if present) is ducked under speech

### E) Edits: jump cuts, pacing, continuity
- Cuts remove dead air and filler words (unless intentionally retained)
- Jump cuts feel intentional (no jarring micro-cuts)
- No continuity glitches (e.g., mid-word cuts, repeated phrases)

### F) Visual quality & compliance
- Video is sharp enough for mobile viewing (no accidental low-res exports)
- No black bars in vertical exports
- No copyrighted visuals/music inserted unless client supplied/licensed

### G) Export settings (standard)
- Format: **MP4 (H.264)**
- Aspect ratio: **9:16** (1080×1920 preferred)
- Frame rate: match source when possible (typically 30fps)
- Audio: AAC, 44.1/48kHz

## 3) Review process (fast, timestamp-based)
We provide a **single review link** (Frame.io / Vimeo / unlisted YouTube) for timestamp comments.

### How to leave revision notes
- Leave comments **with timestamps** (e.g., “00:07 change caption wording”)
- Group changes per clip (Clip 01, Clip 02, etc.)
- If you want alternate hook/copy, specify exact wording or provide direction

### Revision window
- You have **24 hours** from delivery to request included revisions.
- After 24 hours, we can still help, but changes may be treated as a new request (see revision rules below).

## 4) Revision & issue triage rules (protects deadlines and scope)
We separate **quality fixes** (on us) from **scope changes** (new work). This prevents back-and-forth and missed posting schedules.

### Free revisions (included)
These are fixes to meet the agreed spec:
- Caption typos, misheard words, missing punctuation
- Minor timing tweaks to captions
- Audio level adjustments / minor cleanup
- Reframe corrections (e.g., face too close to edge, text in unsafe zone)
- Export issues (wrong resolution/aspect ratio)
- Small cut adjustments to remove obvious dead air already targeted by spec

### Not included (scope change; handled as a new request)
- Creating additional clips beyond the agreed count
- Rewriting the clip’s concept/angle after delivery (“new hook direction”)
- Replacing the selected segment with a different segment (new clip selection)
- Heavy re-edit requests (major restructuring, new story arc)
- Brand-new motion graphics packages not previously agreed
- Multiple rounds of subjective style exploration after approval (“try 4 different versions”)

### If something is urgent
Email agent_bob_replit+clip-factory@agentmail.to with:
1) clip file name(s) 2) timestamps 3) requested change 4) deadline/time zone.

## 5) What we need from you (Intake)
To avoid preventable revisions, we collect requirements before editing begins.

**Client Intake Form (share link placeholder):** [INSERT GOOGLE FORM LINK]

You’ll be asked about:
- Target platforms (TikTok/Reels/Shorts)
- Audience + offer/CTA
- Tone (direct, educational, hype, calm, etc.)
- “Do not include” list (banned words, topics)
- Handles/links + correct spelling of names/brands
- Caption style preference (verbatim vs cleaned-up)

## 6) Operational timeline (typical)
- Day 0: Intake form completed + source file(s) shared
- Day 1: First delivery + review link sent
- Within 24h: Included revisions requested (timestamp comments)
- Next day: Revision delivery (when applicable)

---

# Internal Use — Pre-Flight Checklist (before editing)
Use this to validate the intake form + prevent scope creep.

1) Confirm clip count + length targets (e.g., 5 clips, 20–45s)  
2) Confirm platforms + formatting requirements (9:16, safe zones)  
3) Confirm CTA + offer details (exact URL/handle)  
4) Confirm banned topics/words and brand sensitivities  
5) Confirm caption style (verbatim vs cleaned) + profanity policy  
6) Confirm brand kit assets provided (logo, fonts, colors) or use default  
7) Confirm delivery method (Drive folder + review link)  
8) Confirm deadline + time zone + revision window reminder

---

# Google Form Build Spec (copy/paste questions)
Title: **Clip Factory — Client Intake (Short-Form Clips)**

## Section A — Basics
1. Name / Company (Short answer) **Required**
2. Best email for delivery (Short answer) **Required**
3. Source type (Multiple choice) **Required**
   - Podcast video
   - Zoom coaching call
   - Webinar
   - Talking head / vlog
   - Other
4. Link to source file(s) (Short answer) **Required**
   - (Google Drive/Dropbox link OR “will upload to your folder”)

## Section B — Platforms & output
5. Platforms needed (Checkboxes) **Required**
   - TikTok
   - Instagram Reels
   - YouTube Shorts
6. Desired number of clips (Short answer) **Required**
7. Clip length preference (Multiple choice) **Required**
   - 15–25s
   - 20–45s
   - 45–60s
   - “Best length per clip (editor chooses)”

## Section C — Creative direction
8. Audience (Short answer) **Required**
9. Tone (Checkboxes) **Required**
   - Educational
   - Direct / no-fluff
   - Hype / energetic
   - Calm / authoritative
   - Story-based
10. Primary CTA (Multiple choice) **Required**
   - Follow / subscribe
   - Comment keyword
   - DM me
   - Visit link
   - Book a call
   - Other (Short answer)
11. CTA details (Short answer) **Required**
   - (Exact URL/handle/keyword)

## Section D — Compliance & constraints
12. Words/topics to avoid (Paragraph) Optional
13. Profanity handling (Multiple choice) **Required**
   - Keep as-is
   - Bleep
   - Remove those sections if possible
14. Must-spell-correctly list (Paragraph) **Required**
   - Names, brands, products, locations

## Section E — Caption & styling
15. Caption style (Multiple choice) **Required**
   - Verbatim (word-for-word)
   - Cleaned (remove filler words, keep meaning)
16. On-screen text style preference (Multiple choice) **Required**
   - Minimal
   - Standard (hook + emphasized keywords)
   - Bold/high-contrast
17. Branding assets link (Short answer) Optional

## Section F — Approvals & timing
18. Deadline (Date) Optional
19. Time zone (Short answer) Optional
20. Anything else we should know? (Paragraph) Optional

---

# Where links go (email template placeholders)
- Intake email: include **[INSERT GOOGLE FORM LINK]** + site URL  
- Delivery email: include **[INSERT REVIEW LINK]** + **[INSERT DRIVE FOLDER LINK]** + revision deadline timestamp  
- Revision emails: restate review link + “timestamp comments” instruction
