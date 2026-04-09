# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decisions + Feature Prioritization + 2-Week Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:42:45.689Z

---

# AI Short-Form Clip Factory (Revenue-Gated) — MVP PRD + Execution Plan

## 0) Revenue Gate (Non-Negotiable)
**Do not build this SaaS MVP until $5,000 in DFY clip-package sales is collected.**
Purpose of this document: define exactly what to build (and what not to) so we can execute immediately once the gate is met.

## 1) MVP User Story (End-to-End)
### Primary user
Podcaster/coach/creator (or their VA) who has long-form video and wants consistent vertical clips without hiring an editor.

### Core job-to-be-done
“Given a YouTube link or uploaded video, produce 5–20 ready-to-post 9:16 clips with accurate captions, strong hooks, and correct platform formatting.”

### MVP flow (must work)
1. **Input**: User pastes **YouTube link** *or* uploads an MP4.
2. **Ingest**: System downloads (for YouTube) or stores upload; generates audio track.
3. **Transcribe**: Auto-transcription returns timestamps + text.
4. **Highlight candidates**: System proposes 10–30 highlight segments (30–90s default) with confidence scores.
5. **Review/Select**: User previews segments, trims start/end, selects which to export.
6. **Template select**: Choose a basic template (3 options):
   - A) Captions bottom, speaker centered
   - B) Captions mid, speaker left + “topic” text on right
   - C) “Podcast” style with blurred background
7. **Export**: Render 9:16 with burned-in captions; deliver MP4 downloads + optional SRT.
8. **Outputs**: Zip/links containing MP4(s), SRT(s), and a simple text file with suggested titles/hooks.

### MVP success criteria
- A first-time user can go from link → first exported clip in **< 15 minutes** (typical 60–90 min source).
- Captions are **>95% accurate** for clear audio, and correctly time-synced.
- Exports conform to **1080x1920**, H.264, AAC, <60fps, <15MB/min target.

### Explicit non-goals (Phase 2+)
No team collaboration, no advanced brand kits, no auto-posting, no complex b-roll library, no multi-speaker layout switching, no automated viral prediction claims.

---
## 2) Feature Requirements (MVP)
### Must-have
- YouTube link ingest + MP4 upload
- Whisper-based transcription with timestamps
- Basic highlight detection (rule-based + LLM summarization; see below)
- Simple segment editor (start/end trim)
- 3 basic templates
- Caption styling controls (font size, safe margins, background box on/off)
- Rendering pipeline for 9:16 with burned-in captions
- Delivery via download links (signed URLs)

### Should-have
- Export SRT + MP4
- Speaker detection (basic diarization or heuristic) for improved caption readability
- Hook suggestions per clip (1–3 lines)

### Could-have
- Auto-resize/crop face tracking
- Brand preset (logo + colors)
- “Niche templates” (coach, fitness, real estate, podcasts)

---
## 3) Fastest Build Path (No/Low-Code)
### Recommended architecture (fast path)
- **Frontend/App**: Bubble (user auth, UI, jobs, status, payments later)
- **Transcription**: Whisper API (OpenAI) or Whisper hosted
- **Orchestration**: Bubble backend workflows + webhook callbacks
- **Rendering**:
  - Option 1: **Shotstack** (managed rendering, templates)
  - Option 2: **FFmpeg** on a lightweight worker (Render.com/Fly.io) + queue
- **Storage/CDN**: Cloudflare R2 or AWS S3 + signed URLs

### Highlight detection (MVP practical)
- Step 1: Use transcript → chunk by sentences/pauses.
- Step 2: Score chunks using:
  - keyword/phrase triggers ("here’s the key", "the mistake", "most people")
  - duration constraints (30–90s)
  - LLM pass: “select best 20 segments for short clips; return start/end timestamps + why + hook line.”
- Step 3: Merge/trim overlaps; present in UI with confidence + “why.”

---
## 4) Build vs Buy Decisions (Speed-Optimized)
### Transcription
- **Buy**: Whisper API (OpenAI) — fastest, good accuracy.
- **Build**: self-host Whisper — slower to implement/operate.
**Decision**: Start with **Whisper API**.

### Diarization (multi-speaker)
- **Buy**: AssemblyAI/Speechmatics diarization (costlier, fewer ops)
- **Build**: pyannote pipeline (ops heavy)
**Decision**: Defer; only add if interviews show strong WTP.

### Rendering
- **Buy**: Shotstack (template-based rendering, quick iteration)
- **Build**: FFmpeg worker (cheaper at scale, more control)
**Decision**: If speed > margin early, choose **Shotstack**. If cost sensitivity + eng comfort, choose **FFmpeg**.

### Storage
- **Buy**: S3/R2 (commodity)
**Decision**: **Cloudflare R2** (low egress) or S3.

### Auth/Payments
- **MVP**: passwordless/email login; payments can remain manual while DFY.
**Decision**: Use Bubble auth now; Stripe later when SaaS goes live.

---
## 5) Paying-Client Validation (What to Test for $99–$299/mo)
### Hypothesized subscription tiers
- **$99/mo**: 20 clips/mo, captions + templates, basic highlights
- **$199/mo**: 60 clips/mo, better highlights, hook suggestions, brand preset
- **$299/mo**: 120 clips/mo, diarization, niche templates, team seat (1 VA)

### Features most likely to drive WTP (to validate)
1. **Diarization** (multi-speaker clarity)
2. **Brand presets** (logo/colors/fonts once)
3. **Niche templates** (coach/podcast styles)
4. **Hook generator in brand voice** (title + first line overlays)
5. **Batch processing** (upload 4 episodes at once)

### Interview prompts (extract paid signal)
- “What’s your monthly clip goal? What do you pay now (editor/VA/software)?”
- “If this reliably produced X clips/week you’d post, what would that be worth monthly?”
- “Which is a dealbreaker: accuracy of captions, finding highlights, or formatting?”
- “Would you pay **$99/$199/$299**? What would need to be true at each tier?”
- “What would make you cancel in month 1?”

### Prioritization rubric
Score each requested feature 1–5 for:
- Revenue impact (does it unlock higher tier/close deals?)
- Frequency (used every session?)
- Differentiation (unique vs CapCut/Descript?)
- Complexity (inverse score)
Then MoSCoW prioritize.

---
## 6) 2-Week Build Plan (GATED) + Acceptance Criteria
**Start only once $5k DFY revenue is confirmed.**

### Sprint 0 (1–2 days): Setup + spike
- Choose rendering path (Shotstack vs FFmpeg worker)
- Create Bubble data models: User, Project, Source, Transcript, Segment, RenderJob
**Acceptance**: A project record can be created; job statuses update end-to-end in Bubble.

### Sprint 1 (Days 3–7): Ingest + transcription + candidate segments
- YouTube URL ingestion (download audio) OR upload MP4
- Send audio to Whisper API; store transcript + timestamps
- Generate 10–30 highlight candidates via rules + LLM
**Acceptance**:
- For a 60-min video, transcript completes successfully and is viewable.
- Candidate segments returned with start/end timestamps and preview text.

### Sprint 2 (Days 8–14): Template preview + export
- Segment select + trim UI
- 3 templates implemented
- Render pipeline produces 9:16 MP4 with burned-in captions
- Delivery via signed download links + optional SRT
**Acceptance**:
- User exports at least 3 clips from a test episode without manual engineering steps.
- Captions are time-synced and legible in safe areas.
- Output meets format specs (1080x1920, H.264/AAC).

### QA checklist (minimum)
- Handles accents/noisy audio baseline
- Long videos (90–120 min) don’t time out (queue + async)
- Fails gracefully: transcription error, render error, missing link
- Deletes sources after X days (privacy)

---
## 7) Launch Criteria (Post-gate)
- 3–5 DFY clients agree to test SaaS workflow (even if still paying DFY)
- Median time link → 5 clips export < 30 minutes
- Clear tier chosen from interviews with at least 3 “yes at price” signals

## Legitimacy + Contact (use in any customer comms)
- Website (share to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to
