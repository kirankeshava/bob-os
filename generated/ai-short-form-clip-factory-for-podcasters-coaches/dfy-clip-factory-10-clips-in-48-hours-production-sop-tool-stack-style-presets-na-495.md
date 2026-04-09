# DFY Clip Factory — 10 Clips in 48 Hours Production SOP (Tool Stack + Style Presets + Naming/Folders + SLA/Revision Policy)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:37:56.299Z

---

# DFY Clip Factory — Production SOP (10 Clips / 48 Hours)

## Goal & Output Promise
Deliver **10 ready-to-post vertical clips** from a single long-form video/podcast episode within **48 hours** of receiving all required assets. Each clip includes:
- Hook optimized for first 1.5s
- Clean captions with consistent brand style
- Pattern interrupts every ~2–3 seconds (visual change)
- Optional **b-roll cue notes** (lightweight, for fast iteration)
- Exports formatted for **TikTok, IG Reels, and YouTube Shorts**

Speed and consistency > perfection.

---

## 1) Tool Stack (Fast + Reliable)
### Primary (recommended)
1. **OpusClip** (or similar auto-clipping platform)
   - Use for: first-pass highlight detection, auto reframing, initial captions.
2. **CapCut Desktop**
   - Use for: final polish, brand style presets, caption templates, end cards, quick b-roll overlays.
3. **Whisper (OpenAI) / Descript transcription**
   - Use for: backup transcription, diarization (if needed), correcting key words (names, locations, numbers).
4. **Frame.io** (preferred) or **Google Drive** (free fallback)
   - Use for: client review, timestamped feedback, final delivery.

### Backup paths (if something fails)
- If OpusClip fails: Use **Descript** (Remove filler words + find highlights manually) and export selects to CapCut.
- If diarization is messy: Transcribe with **Whisper** and keep captions speaker-agnostic (avoid speaker labels).
- If Frame.io not available: Use Drive folder + a Google Doc for feedback timestamps.

---

## 2) Intake → Delivery SOP (Step-by-step)

### A. Intake (Target: 15 minutes)
**Required from client** (minimum viable intake):
1. Long-form source link or file (YouTube link, Drive link, Riverside, Zoom, etc.)
2. Brand kit basics (or pick one of our presets):
   - Primary color, secondary color
   - Font preference (or allow defaults)
   - Logo (optional)
3. Target platform priority: TikTok / Reels / Shorts (can be “all”)
4. Audience + offer + CTA (1 sentence)
5. “Do-not” list (words, claims, topics)

**Internal step:** Create job ticket (client + episode) and confirm:
- Timecode length of source
- Any sensitive compliance needs (fitness claims, real estate disclaimers, finance disclaimers)

**Client confirmation email snippet (use in comms):**
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to

### B. Download / Transcode (Target: 15–30 minutes)
1. Download video (highest available, ideally 1080p). Keep original audio.
2. Transcode to editing-friendly format if needed:
   - MP4 H.264, 1080p, 30fps (or source fps)
   - Audio AAC 48k
3. Save into folder structure (see Section 5).

### C. Transcription + Speaker Diarization (Target: 20–40 minutes)
**Default:** Use OpusClip/Descript transcription.
- If 2+ speakers and captions look confusing, run **Whisper** with diarization (if available) OR keep captions neutral without speaker tags.

**Accuracy standard:** Fix obvious errors in:
- Names, brand, product names
- Places, numbers, prices, dates
- “Danger words” (medical/legal claims)

### D. Highlight Selection Rules (Target: 60–90 minutes)
Goal: Identify **12–15 candidates** to finalize **10**.

**Clip length guidance:**
- TikTok/Reels: 15–35s (sweet spot)
- Shorts: 20–45s acceptable

**What qualifies as a clip:**
1. **Hook in first 1.5 seconds**
   - Start at the first high-impact word, remove greetings.
   - Prefer starting with a contrarian claim, question, or pain point.
2. **Single idea per clip**
   - One clear takeaway or “micro-story.”
3. **Context in first 3 seconds**
   - Viewer should understand what the topic is quickly.
4. **Pattern interrupts every 2–3 seconds**
   - Options: jump cut, zoom, b-roll overlay, on-screen keyword, emoji/shape, quick headline change.
5. **End with micro-CTA**
   - “Follow for X”, “Comment ‘X’ for Y”, “DM me ‘X’”, “Watch part 2”.

**Hard rejects:**
- Requires too much setup/context
- Audio too noisy / cross-talk heavy
- Claims that trigger compliance risk (unless client approves)

**Process:**
1. Run OpusClip auto-detection for suggestions.
2. Manually scan transcript for:
   - “Here’s the trick…”, “Most people…”, “Don’t do this…”, “The reason you’re stuck…”, “3 steps…”
3. Pick 12–15, label by theme (lead gen, mindset, how-to, myth-bust).

### E. Clip Assembly in OpusClip (Target: 60 minutes)
1. Generate candidates with auto reframing (speaker centered).
2. Apply base caption style (temporary).
3. Export clip drafts (watermark-free depends on plan; if watermark exists, treat OpusClip as draft-only and rebuild finals in CapCut).

### F. Finishing in CapCut (Target: 2–3 hours for 10 clips)
**Per-clip checklist:**
1. **Trim**: remove dead air; tighten pauses.
2. **Reframe**: ensure eyes in upper third; safe margins for UI overlays.
3. **Captions**:
   - Burn-in captions (not platform auto-captions)
   - Highlight keywords (1–3 words per sentence)
4. **Pattern interrupts** (every 2–3s):
   - Alternating scale 100% → 108% → 100%
   - 6–10 frame punch-in on emphasis
   - On-screen “keyword pop” animation
5. **B-roll cues insertion** (fast mode):
   - Either add actual b-roll (if available) OR add a subtle overlay (icon/stock image) OR add a text cue layer “B-ROLL: [idea]” (disabled for export if client only wants cues).
6. **CTA end card (0.8–1.5s)** using preset.
7. **Audio**:
   - Normalize loudness; remove harshness if needed.
   - Optional light background music at -28 to -24 LUFS equivalent (keep voice dominant).

### G. Export Presets (Target: 15 minutes)
Export **one master** per clip that works across platforms, plus optional variants.

**Master vertical preset:**
- 1080x1920
- H.264
- 15–30 Mbps
- AAC 48k
- Filename includes platform-agnostic label “VERT”.

**Platform-safe framing rules:**
- Keep captions above bottom UI zone (roughly bottom 15–20%)
- Keep key text within center safe area

Optional:
- TikTok variant with slightly higher brightness/saturation
- Shorts variant with slightly smaller caption size (less UI overlap)

### H. QA Checklist (Target: 30–45 minutes)
Run QA on all 10 before sending.

**Content QA**
- Hook lands within 1.5s
- Single idea per clip
- No sensitive claims or accidental profanity (unless client brand allows)

**Caption QA**
- No misspellings of names/brands
- Keywords highlighted consistently
- Captions do not cover mouth or critical visuals

**Visual QA**
- Pattern interrupts present every 2–3s
- No jarring jump cuts mid-word
- End card readable and on-screen long enough

**Technical QA**
- 1080x1920 output
- Audio clear, not clipping
- File plays on mobile

### I. Review + Delivery (Target: 15–30 minutes)
1. Upload to Frame.io (preferred) in a single review project folder.
2. Provide a “Clip Manifest” (Google Doc) listing:
   - Clip file name
   - Hook text
   - Topic
   - Suggested caption / post text
   - CTA suggestion
3. Send client delivery email with:
   - Review link
   - Revision instructions: “Timestamp comments only”
   - SLA for revisions (see Section 6)

---

## 3) Style Preset Packs (3 Niches)
All presets assume vertical 9:16, bold captions, keyword highlighting.

### Preset A — Real Estate (Trust + Local Authority)
**Palette**
- Primary: Deep Navy #0B1F3B
- Accent: Gold #D4AF37
- Neutral: White #FFFFFF

**Fonts (fallbacks allowed)**
- Headline/captions: Montserrat ExtraBold (fallback: Arial Bold)
- Secondary: Montserrat Medium

**Caption layout**
- Position: Lower-middle (above UI safe zone)
- Style: White text with navy shadow + gold highlight for keywords
- Keyword highlight: gold box with navy text OR gold text with navy outline

**Motion rules**
- Subtle punch-in on key phrases
- Use clean lower-third label at start: “REAL ESTATE TIP”

**CTA end card (1s)**
- Text: “Want listings that move faster? Follow @_____”
- Optional disclaimer small text: “Not financial advice” (if needed)


### Preset B — Fitness (High Energy + Action)
**Palette**
- Primary: Black #0A0A0A
- Accent: Neon Green #39FF14
- Secondary accent: White #FFFFFF

**Fonts**
- Captions: Anton (fallback: Impact)
- Secondary: Inter Medium

**Caption layout**
- Position: Center-lower
- Style: All caps, thick stroke (white text, black stroke)
- Keyword highlight: neon green text or neon underline swipe

**Motion rules**
- Faster pattern interrupts (every ~2s)
- Add rep-counter style pop-ups for lists: “#1 / #2 / #3”

**CTA end card (1s)**
- Text: “Want my 7-day plan? Comment ‘PLAN’”
- Optional: small “Always consult a professional” disclaimer


### Preset C — B2B / Coaching (Clean + Premium)
**Palette**
- Primary: Charcoal #111827
- Accent: Electric Blue #2563EB
- Neutral: Off-white #F9FAFB

**Fonts**
- Captions: Inter SemiBold (fallback: Arial)
- Headlines: Inter Bold

**Caption layout**
- Position: Mid-lower, left aligned (modern)
- Style: Off-white text, subtle drop shadow
- Keyword highlight: blue pill background with white text

**Motion rules**
- Minimal zooms; prefer clean jump cuts
- Use on-screen “Key Point” cards for frameworks

**CTA end card (1.2s)**
- Text: “Follow for daily growth systems • Link in bio”

---

## 4) B-Roll Cues (Fast Insertion Standard)
We support two modes:
1. **Cue-only mode (default for speed):** Add a text layer in CapCut labeled: “B-ROLL: [idea]” positioned top-left, hidden/disabled for export unless client requests visible.
2. **Light b-roll mode:** Use 1–2 quick overlays per clip:
   - Screen recording snippet, relevant icon, stock image, or simple animated keyword card.

**Cue writing formula:**
- “B-ROLL: [concrete visual] + [tone]”
Examples:
- “B-ROLL: Zillow listing page scroll (blur address)”
- “B-ROLL: gym close-up of dumbbells, high contrast”
- “B-ROLL: dashboard chart going up, minimal style”

---

## 5) Folder Structure + Naming Conventions (Scale-Ready)
**Root folder:**
`/CLIP_FACTORY/CLIENTNAME/`

**Per episode:**
`CLIENTNAME_YYYY-MM-DD_EP##_ShortTitle/`

**Inside episode folder:**
1. `01_INTAKE/` (brief, brand kit, CTA)
2. `02_SOURCE/` (original downloads)
3. `03_TRANSCRIPTS/` (SRT, TXT)
4. `04_SELECTS/` (drafts from OpusClip)
5. `05_PROJECTS/` (CapCut projects)
6. `06_EXPORTS/`
   - `VERT_MASTER/`
   - `TIKTOK/` (optional)
   - `REELS/` (optional)
   - `SHORTS/` (optional)
7. `07_DELIVERY/` (final share links, manifest)
8. `08_REVISIONS/` (rev1, rev2 if needed)

**File naming for each clip:**
`CLIENT_EP##_CLIP##_THEME_HOOKKEYWORD_v01_VERT.mp4`
Examples:
- `ACME_EP03_CLIP02_LEADGEN_NoOneTalksAbout_v01_VERT.mp4`
- `ACME_EP03_CLIP07_MYTHBUST_StopDoingThis_v01_VERT.mp4`

**Caption file naming:**
`CLIENT_EP##_CLIP##_v01.srt`

---

## 6) SLA + Revision Policy (Speed-Protecting)
### Turnaround SLA
- Clock starts once we have: source link/file + brand preset choice + CTA.
- Delivery: **10 clips within 48 hours** (business days).
- If source is >90 minutes, default scope is still 10 clips; we prioritize best segments.

### Communication cadence
- T+4 hours: intake confirmed, ETA reaffirmed.
- T+24 hours: “Drafts in progress” update (optional: 2 sample clips for calibration).
- T+48 hours: final delivery.

### Revisions (bounded)
Included:
- **1 revision round** per batch (up to **10 clips**) if requested within **3 business days** of delivery.
- Revisions limited to:
  - Caption corrections
  - Slight trims (±2 seconds)
  - Hook swap within the same selected segment
  - Minor style adjustments (font size, position, highlight color)

Not included (new scope):
- Recut from entirely different segments not in the original selects
- New b-roll sourcing beyond light overlays
- Extensive audio repair / noise removal
- Adding complex motion graphics

Revision SLA:
- Rev round delivered within **24 hours** of receiving timestamped notes.

### Feedback format requirement
Client must provide feedback as:
- Frame.io comments OR a list of: `CLIP FILE NAME + timestamp + change request`

---

## Throughput Targets (Internal)
- Candidate selection: 12–15 candidates in 90 min
- Finishing pace: ~12–18 minutes per clip in CapCut
- QA: ~3–4 minutes per clip

This SOP is designed to run reliably with one operator in a single day block, or faster with a selector + editor split.
