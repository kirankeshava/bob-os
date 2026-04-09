# DFY Clip Factory — 48-Hour Production SOP + Tool Stack + Style Presets + Naming/Folder System + SLA/Revision Policy

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:17:21.050Z

---

# DFY Clip Factory (10 Clips / 48 Hours) — Production SOP

## 0) Goal + Operating Principles
**Promise:** Deliver **10 ready-to-post vertical clips** from a long-form podcast/video within **48 hours** of receiving usable source files + brand assets.

**Speed > perfection rules:**
- Optimize for **clarity, hook, retention, and consistency**.
- If something blocks speed (missing fonts, unclear brand), use **default preset** and note it.
- Avoid time sinks: no advanced motion graphics, no manual rotoscoping, no “perfect” b-roll sourcing.

**Definition of “ready-to-post”:**
- 9:16 vertical, properly framed
- Captions burned-in
- Hooked first frame/first 1.5s
- Light b-roll cues or pattern interrupts
- Platform-safe music OFF by default (creator can add native audio)
- Delivered as MP4 + a simple posting notes sheet

---

## 1) Tool Stack Decision (Fast + Reliable)

### Primary stack (default)
1) **OpusClip** (or similar “long-to-shorts” AI) — fast first-pass clip candidates, auto reframing, basic captions.
2) **CapCut Desktop** — fastest finishing tool for caption styling, punch-ins, pattern interrupts, b-roll cues, end cards.
3) **Whisper** (OpenAI Whisper or MacWhisper) — accurate transcript when needed (esp. multi-speaker or noisy audio).
4) **Google Drive** — file delivery + organized folder structure.
5) **Review/approvals:** Share **Drive preview links** with timestamped comments OR **Frame.io** if already available on client side.

### Fallback stack (if OpusClip results are weak)
- **Descript** for transcript-based highlight selection, filler word removal, quick “paper edit” and captions.
- **Premiere/DaVinci** only if client explicitly requires it (avoid by default).

### Why this stack
- OpusClip gives speed for candidates.
- CapCut is fastest for consistent templates and exports.
- Whisper/Descript de-risk transcription quality.
- Drive links enable review without paid tooling.

---

## 2) Intake → Delivery: Step-by-Step SOP

### Stage A — Intake (Target: 30 minutes)
**Inputs required (must have):**
- Source video (or link to download) in 1080p+ OR audio + separate camera if applicable
- Guest names + correct spelling
- Brand handle(s) + CTA link (if any)
- Niche preset selection: Real Estate / Fitness / B2B (or “Default”) 

**Nice-to-have:**
- Brand kit (fonts, hex colors, logo)
- Examples of creator’s favorite clips
- Forbidden topics/words

**If client has no assets:** use preset fonts/colors, no logo. Add neutral CTA end card: “Follow for more” + @handle.

**Client legitimacy link (include in comms if needed):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
**Contact email:** agent_bob_replit+clip-factory@agentmail.to

---

### Stage B — Download, Transcode, Project Setup (Target: 30–60 minutes)
1) Create folder structure (see Section 5).
2) Download source files.
3) Transcode to editing-friendly format if needed:
   - Container: MP4
   - Codec: H.264
   - Audio: AAC 48k
4) Create a **“SOURCE_MASTER.mp4”** as the canonical file.
5) Generate transcript:
   - If single speaker clean audio: OpusClip/CapCut auto captions may be enough.
   - If multi-speaker/noisy: run Whisper → export .SRT + full transcript .TXT.

**Speaker diarization (only if needed):**
- If multiple speakers: label speakers in transcript quickly (Speaker A/B). Don’t over-engineer. The purpose is accurate captions and context.

---

### Stage C — Clip Candidate Generation (Target: 60–90 minutes)
**Method 1 (fastest): OpusClip pass**
1) Upload SOURCE_MASTER.
2) Request 15–25 candidates.
3) Filter by:
   - Clear statement in first 3 seconds
   - One idea per clip
   - Minimal cross-talk
   - Strong emotion/contrarian take/how-to steps
4) Shortlist **12–15** candidates to end with 10 final.

**Method 2 (fallback): Transcript-first selection (Descript/Manual)**
Scan transcript for:
- “Most people think X, but…”
- “Here’s the mistake…”
- “Do this in 3 steps…”
- “If you’re [audience], you need to hear this…”
- Specific numbers, timelines, case studies

---

### Stage D — Highlight Selection Rules (Hard Requirements)
Every chosen clip must pass:
1) **Hook in first 1.5 seconds**
   - Start at the most punchy phrase; remove lead-in words.
   - If needed, add on-screen hook text immediately.
2) **Pattern interrupt every 2–3 seconds**
   Use at least 3 of these per 20–40s clip:
   - Punch-in / punch-out (110%–125%)
   - Jump cut (remove pause)
   - Bold keyword pop
   - B-roll insert (0.3–1.0s)
   - On-screen “step” counter
   - Quick sound effect (optional; keep subtle)
3) **One core idea per clip**
   - If it becomes two ideas, split or cut.
4) **Length guidelines:**
   - TikTok/Reels: 20–45s ideal (up to 60s if retention stays strong)
   - YT Shorts: 20–50s ideal
5) **Close with payoff + CTA** (last 2–4 seconds)
   - “Follow for more [niche] tips” OR “Comment ‘X’ and I’ll send the checklist” (if client supports)

---

### Stage E — Edit Assembly + Framing (Target: 2–3 hours for 10 clips)
In CapCut Desktop (or editor of choice):
1) Set sequence to **9:16 (1080x1920)**.
2) Auto reframe to keep speaker centered; ensure eyes ~ top third.
3) Remove dead air; keep pace tight.
4) Add pattern interrupts:
   - Punch-in on emphasis words
   - Cut on breaths
   - Insert b-roll cues where it clarifies the point

**B-roll cue insertion (DFY speed version):**
- Use built-in stock (CapCut) or simple overlays.
- Keep it minimal: 2–6 b-roll inserts per clip.
- Prefer “context b-roll” (house exterior, gym movement, dashboard, screenshots) over random aesthetic.

---

### Stage F — Captions + On-Screen Text (Target: 2–3 hours for 10 clips)
**Caption rules (non-negotiable):**
- Burned in.
- 2 lines max.
- Highlight 1–3 keywords per sentence.
- Avoid covering mouth area.
- Safe margins: keep text inside ~10% inset from edges.

**Templates:** Use niche preset (Section 4). If brand kit exists, map fonts/colors.

---

### Stage G — End Card / CTA (Target: 30 minutes)
Add a 2–4 second end card:
- Handle + “Follow for more”
- Optional: 1-line offer (“Free guide in bio”) if provided.

---

### Stage H — Export Presets (Target: 30 minutes)
Export each clip as:
- Format: MP4
- Resolution: 1080x1920
- FPS: match source (30 preferred; 60 ok)
- Bitrate: 12–20 Mbps
- Audio: AAC 48k, 320kbps

**Platform formatting notes:**
- **TikTok:** Keep captions slightly higher to avoid UI bottom overlay.
- **IG Reels:** Similar to TikTok; avoid lower 20%.
- **YT Shorts:** Avoid heavy text near bottom; YT UI can cover.

---

### Stage I — QA Checklist (Target: 45 minutes)
Each clip must pass:
- [ ] Hook text appears immediately OR hook is audible/clear in first 1.5s
- [ ] No long pauses (max 0.3–0.5s unless for effect)
- [ ] Captions accurate (names/brands spelled correctly)
- [ ] Captions not cut off on edges; not covering mouth
- [ ] At least 1–2 pattern interrupts every ~3s on average
- [ ] Audio level consistent (no clipping)
- [ ] No awkward mid-word cuts
- [ ] CTA end card present (unless client requests none)
- [ ] File name correct + exported correctly

If 2+ items fail → rework before delivery.

---

### Stage J — Delivery (Target: 30 minutes)
Deliver via Google Drive folder:
- 10 final MP4s
- Optional: a “Posting Notes” doc (clip titles + suggested captions/hashtags if client wants later)

Provide client:
- Drive folder link
- Short summary: “10 clips included: X hooks, Y how-tos, Z contrarian takes.”
- Ask for revision requests in a single consolidated message.

---

## 3) Production Timing Plan (48 Hours)
**Hour 0–2:** Intake confirmed + source downloaded + transcript ready
**Hour 2–6:** Candidate generation + shortlist (12–15)
**Hour 6–20:** Edit + captions for first 5 clips
**Hour 20:** Internal QA pass for first 5
**Hour 20–34:** Edit + captions for remaining 5
**Hour 34–40:** Full batch QA + consistency pass (fonts/colors/position)
**Hour 40–46:** Exports + upload + organize
**Hour 46–48:** Delivery message + collect consolidated revisions

---

## 4) Template Packs — 3 Niche Style Presets

### Preset A: Real Estate (Clean + Premium)
**Use when:** agents, brokers, mortgage, investing.
- Font: **Montserrat SemiBold** (or Poppins SemiBold fallback)
- Colors:
  - Primary text: #FFFFFF
  - Highlight: **#00C2FF** (aqua)
  - Background caption pill: rgba(0,0,0,0.55)
- Caption position: lower-middle, above UI safe zone
- Caption style:
  - 2 lines max
  - Highlight numbers, locations, “mistake”, “don’t”, “instead”
- Hook overlay (first 1.5s):
  - Top center: “REAL ESTATE TIP” small label
  - Main hook big text: e.g., “Don’t list until you do this”
- Pattern interrupts:
  - Punch-in on price, % rate, neighborhood names
  - Insert b-roll cues: property exterior, map pin, offer sheet screenshot
- CTA end card (2–3s):
  - “Follow @HANDLE for weekly home-buying tips”

### Preset B: Fitness (High Energy + Bold)
**Use when:** trainers, gyms, nutrition, transformations.
- Font: **Anton** for hook words + **Inter Bold** for captions (fallback: Bebas Neue + Arial)
- Colors:
  - Primary: #FFFFFF
  - Highlight: **#FF3D00** (orange-red)
  - Accent: #00E676 (green for “DO THIS”)
  - Background: black stroke + slight shadow (no pill) for intensity
- Caption position: center-lower (but not too low)
- Caption style:
  - Big, punchy keywords (1–2 per line)
  - Emphasize reps/sets/macros numbers
- Pattern interrupts:
  - Fast punch-ins every 2s
  - Step counters: “1/3”, “2/3”, “3/3”
  - B-roll cues: exercise demo, food close-up, timer
- CTA end card:
  - “Follow for workouts that actually work”
  - Optional: “Comment ‘PLAN’ for the routine” (if client supports)

### Preset C: B2B / Coaching (Trustworthy + Minimal)
**Use when:** consultants, founders, marketers, leadership coaches.
- Font: **Inter SemiBold** (fallback: Helvetica/Arial)
- Colors:
  - Primary: #FFFFFF
  - Highlight: **#FFD166** (warm yellow)
  - Caption background: rgba(15,15,20,0.60) with rounded corners
- Caption position: lower third; keep face visible
- Caption style:
  - Clean sentence case
  - Highlight only 1 keyword at a time (less is more)
- Pattern interrupts:
  - Punch-in on “the real reason”, “here’s the framework”
  - Simple on-screen framework: “Problem → Cost → Fix”
  - B-roll cues: simple icons, chart screenshot, calendar, Notion board
- CTA end card:
  - “Follow @HANDLE for 60-second business frameworks”

---

## 5) Folder Structure + Naming Conventions

### Folder structure (Google Drive)
**/CLIENT_NAME/**
- **/00_Admin/** (intake notes, brand kit, client comms)
- **/01_Source/**
  - SOURCE_MASTER.mp4
  - audio.wav (if separate)
  - transcript.txt
  - transcript.srt
- **/02_Working/**
  - CapCut_Project/
  - Exports_Drafts/
- **/03_Exports_Final/**
  - TikTok/
  - Reels/
  - Shorts/
- **/04_Review/**
  - Review_Links.txt
  - Revisions_Log.txt

### File naming convention
**CLIENT_Ep###_Clip##_{Platform}_{Preset}_v01.mp4**
Examples:
- ACME_Ep012_Clip03_TikTok_RE_v01.mp4
- ACME_Ep012_Clip07_Reels_FIT_v02.mp4

Preset codes:
- RE = Real Estate
- FIT = Fitness
- B2B = B2B/Coaching

Revisioning:
- v01 = first delivery
- v02/v03 = revision rounds

---

## 6) SLA + Revision Policy (Speed-Protecting)

### Turnaround SLA
- **Standard:** 10 clips delivered within **48 hours** after receiving:
  1) usable source video/audio, and
  2) confirmed preset/brand kit (or approval to use default preset).
- If source quality is unusable (severe noise, missing video), SLA clock pauses until resolved.

### Included revisions
- **1 revision round included** (batch feedback consolidated).
- Revisions limited to:
  - caption corrections
  - trimming start/end (±3 seconds)
  - small text/CTA adjustments
  - swapping 1–2 b-roll cues

### Not included (requires new scope)
- Rebuilding clips from entirely different timestamps
- Heavy motion graphics packages
- Multi-language captioning
- Extensive brand redesign mid-project

### Revision turnaround
- Revisions delivered within **24 hours** after receiving consolidated notes.

### Feedback format requirement
Client must send:
- Clip filename + timestamp + requested change.
- All notes in one message to avoid churn.

---

## 7) Default “Quality Bar” (What we ship)
- Captions readable on phone
- Hook hits immediately
- Audio intelligible
- Consistent style across all 10
- Minimal b-roll/pattern interrupts to maintain retention

---

## 8) Internal Notes (Operator shortcuts)
- Always shortlist 12–15 to comfortably deliver 10.
- If a clip needs >15 minutes of surgery, replace it.
- Keep a “wins” library: save 1 great caption style + 1 great end card per niche for reuse.
