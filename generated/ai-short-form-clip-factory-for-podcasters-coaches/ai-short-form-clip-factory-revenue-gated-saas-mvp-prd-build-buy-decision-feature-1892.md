# AI Short-Form Clip Factory — Revenue-Gated SaaS MVP PRD + Build/Buy Decision + Feature Prioritization + 2-Week Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:40:06.992Z

---

## Context & Revenue Gate
This micro-SaaS MVP is explicitly **gated**: **DO NOT BUILD** until **$5,000 in DFY (done-for-you) clip package revenue** is collected. Until then, use DFY delivery + customer interviews to validate demand and refine requirements.

Business legitimacy link to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Business contact: agent_bob_replit+clip-factory@agentmail.to

---
## 1) MVP User Story (Core Flow)
**Primary user:** Podcaster / coach / small brand operator who has long-form video and wants consistent TikTok/Reels output without hiring an editor.

### User Story
As a creator, I want to paste a YouTube link (or upload a file), automatically find the best highlight moments, apply my caption/template style, and export vertical clips that are ready to post.

### MVP Workflow (V1)
1. **Auth + Project Create**
   - User signs in (email magic link or OAuth).
   - Creates a “Project” (one episode/video).
2. **Ingest**
   - Option A: Paste **YouTube link**.
   - Option B: **Upload** MP4/MOV.
   - System extracts audio track and stores source.
3. **Transcribe**
   - Auto transcription (Whisper) → returns timestamps.
4. **Highlight Detection**
   - System proposes 5–20 candidate segments (e.g., 15–60s) with a short “hook title.”
   - User can play and select desired segments.
5. **Template Selection**
   - User chooses 1 of 3–5 simple templates:
     - Captions style (font, size, position)
     - Safe margins for TikTok/Reels
     - Optional speaker name label (basic)
6. **Export**
   - Output 9:16 MP4 with **burned-in captions**.
   - Also provide **SRT** download.
   - Exports include platform presets: TikTok/Reels/Shorts.

### Out of Scope (strictly V1)
- Multi-speaker diarization (unless trivial).
- Auto b-roll insertion.
- Auto hook rewriting in “brand voice.”
- Direct publishing/scheduling.
- Team collaboration.

---
## 2) Fastest Build Path (No/Low-Code)
### Goal
Ship a working MVP quickly after the $5k gate, maximizing reliability and minimizing custom infra.

### Recommended Architecture (Fastest)
- **Frontend + user management + database:** Bubble
- **Transcription:** Whisper API (OpenAI) OR hosted Whisper (later)
- **Highlight segmentation:**
  - Phase 1: Heuristics (high energy sections, sentence boundaries, keyword spikes) + optional LLM scoring.
  - Phase 2: Fine-tuned logic based on what DFY customers actually pick.
- **Video rendering:**
  - Option A (build): FFmpeg on a lightweight worker (Replit/Fly.io/Render—later) using queued jobs.
  - Option B (buy): Shotstack (or similar) for managed rendering.
- **Storage:** Cloud object storage (S3-compatible) for source + outputs.
- **Async jobs:** Bubble backend workflows + webhook callbacks from render/transcribe.

### Why this is fastest
- Bubble handles auth, UI, DB, and workflows quickly.
- Whisper API reduces ML ops burden.
- Rendering is the biggest risk; managed render (Shotstack) may speed time-to-stable.

---
## 3) Build vs Buy — Decision (Practical)
### Transcription
- **Buy (recommended initially):** Whisper API
  - Pros: fastest, high quality.
  - Cons: variable cost; dependency.
- Build later only if costs force it.

### Highlight Detection
- **Build (MVP simple):** heuristics + LLM ranking
  - Pros: differentiated over time; can tune by niche.
  - Cons: requires iteration and real selection data.

### Rendering
- **Buy (fastest reliable):** Shotstack
  - Pros: avoids FFmpeg edge cases + scaling issues; stable.
  - Cons: ongoing cost.
- **Build (cheaper long-term):** FFmpeg worker
  - Pros: lower marginal cost; full control.
  - Cons: failure modes, scaling, queueing, monitoring.

### Storage/CDN
- **Buy:** S3-compatible storage + signed URLs.
  - Pros: standard; reliable.

### Auth
- **Buy:** Bubble auth (email magic link) or OAuth.

**MVP recommendation:** Bubble + Whisper API + managed render (Shotstack) if budget allows later; if not, FFmpeg worker with strict limits (file size, max duration, queue).

---
## 4) What Paying Clients Would Pay $99–$299/mo For (Hypotheses)
These are subscription drivers to validate in DFY calls.

### $99/mo (Solo creator)
- 30–60 clips/month included
- Auto highlights + caption styles
- Export presets (Reels/TikTok/Shorts)
- Basic brand kit (font/colors)

### $199/mo (Growth)
- Higher monthly clip volume
- **Diarization** (speaker labels) and better caption accuracy
- **Approval workflow** (save drafts, notes)
- **Niche templates** (podcast, coaching, real estate, fitness)

### $299/mo (Pro)
- Multiple shows/brands
- **Brand voice hook suggestions** (3 hook options per clip)
- Team seats
- Integrations (Drive/Dropbox, Zapier)

### Interview Questions (to validate WTP)
1. How many long-form episodes do you produce per month?
2. How many clips do you realistically post per week?
3. What’s your current editing workflow and cost?
4. If we auto-suggested highlights, what % would you accept without changes?
5. Would you pay more for speaker labels (diarization)?
6. Would hook rewriting in your brand voice change your willingness to pay?
7. Which is more important: speed, accuracy, or creative style?
8. What’s a “must-have” export requirement (SRT, burned captions, safe zones, etc.)?
9. At $99/$199/$299—what would you expect to be included?
10. What would make you cancel?

---
## 5) Feature Prioritization (MoSCoW for MVP)
### Must-have (V1)
- YouTube link ingest OR upload
- Transcription with timestamps
- Highlight candidates list + preview player
- Select clips + choose template
- Export 9:16 MP4 with burned-in captions
- Download SRT
- Basic project history

### Should-have (V1.1)
- Adjustable caption timing/words-per-line
- Clip length presets (15s/30s/60s)
- Simple cropping controls (center speaker)

### Could-have (later)
- Diarization + speaker labels
- Hook suggestions (LLM)
- Auto b-roll cues
- Publishing integrations

### Won’t-have (near-term)
- Full NLE-style timeline editing
- AI-generated avatars

---
## 6) Gated 2-Week Build Plan (Start ONLY After $5k DFY Collected)
### Sprint Goal
Deliver a functioning MVP that converts one long video into multiple vertical clips with captions and templates, reliably.

### Week 1 — Build Core Pipeline
**Day 1–2: Product scaffolding**
- Bubble app setup: auth, projects, upload/link input, DB schema.
- Acceptance: user can create project; source stored; status visible.

**Day 3–4: Transcription integration**
- Call Whisper API; store transcript + timestamps.
- Acceptance: transcript visible + downloadable; errors handled.

**Day 5–7: Highlight detection v0**
- Generate candidate segments (5–20) with start/end timestamps.
- Acceptance: candidates appear with short titles; user can preview segment playback.

### Week 2 — Templates + Rendering + Export
**Day 8–10: Template system**
- 3–5 templates with caption styling (font/position/color).
- Acceptance: user selects template; preview parameters saved.

**Day 11–13: Rendering pipeline**
- Implement render job queue (Bubble workflows calling render service).
- Output 9:16 with burned captions; SRT export.
- Acceptance: at least 3 clips render successfully from a 30–60 min source within defined limits (e.g., max 2GB upload, max 90 min video).

**Day 14: QA + launch to first 3 paying testers**
- Fix failure modes; add basic analytics (job success/fail).
- Acceptance: 3 real customer projects completed end-to-end without manual intervention beyond customer selections.

### Non-negotiable acceptance criteria
- End-to-end: link/upload → transcript → highlight candidates → select → template → export MP4 + SRT.
- Render reliability: clear status (queued/processing/done/failed) and retry path.
- Output meets platform constraints: 9:16, captions readable, safe margins.

---
## Notes: How to Validate Before Building
Until the $5k gate is hit, use DFY customers to gather:
- The clip lengths they actually post
- Caption style preferences
- Whether they need diarization
- What “template” really means for them (brand kit vs motion graphics)
- Their maximum acceptable wait time per clip

Then update this PRD with real language, most-requested exports, and the top 3 subscription drivers.
