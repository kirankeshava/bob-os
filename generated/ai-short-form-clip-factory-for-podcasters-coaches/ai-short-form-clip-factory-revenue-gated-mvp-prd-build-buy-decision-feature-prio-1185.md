# AI Short‑Form Clip Factory — Revenue‑Gated MVP PRD + Build/Buy Decision + Feature Prioritization + 2‑Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:41:46.791Z

---

## 1) Purpose + Revenue Gate
**Goal:** Scope (not build) a micro‑SaaS MVP that converts long videos/podcasts into ready-to-post vertical clips.
**Hard gate:** Do **not** start building until **$5,000 DFY clip sales collected** (deposits/cash received). Until then, only do customer discovery, paid pilots, and distribution.

Legitimacy link to share with prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Business contact: agent_bob_replit+clip-factory@agentmail.to

## 2) MVP User Story (End-to-End)
**Primary user:** Podcaster/coach/creator posting on TikTok/IG Reels/YT Shorts.

### Core flow (MVP)
1. **Input:** User pastes a YouTube link *or* uploads a file (MP4/MOV/MP3).
2. **Transcribe:** System generates transcript with word-level timestamps.
3. **Highlights:** System proposes highlight segments (15–60s) with confidence scores.
4. **Select:** User reviews segments, trims start/end, picks 3–10 clips.
5. **Template:** User chooses a simple brand template (font/color/caption style + safe margins).
6. **Export:** System renders 9:16 clips with burned-in captions and downloads or delivers links.
7. **Captions export:** Provide SRT/VTT plus plain-text caption copy (with hashtags optional).

### Acceptance criteria (MVP)
- Input accepts at least **YouTube URL** and **file upload**.
- Transcript produced in < 10 minutes for a 60-min episode (asynchronous job ok).
- Highlights produced automatically (at least 10 suggestions for 60-min content) and editable.
- Export outputs **1080x1920** MP4, captions burned-in, and downloadable.
- Captions export includes **SRT** and **plain text**.

## 3) MVP Functional Requirements
**FR1 Upload/Link ingestion**
- YouTube URL ingestion (fetch audio/video) + direct upload.
- Store source media securely.

**FR2 Transcription**
- Whisper-based transcription with timestamps.
- Basic punctuation; speaker diarization is NOT required in MVP.

**FR3 Highlight detection**
- Segment suggestions using transcript + simple heuristics (keyword spikes, sentence boundaries, duration constraints) and/or an LLM prompt to propose timestamp ranges.
- UI to adjust clip boundaries.

**FR4 Templates**
- 2–3 built-in caption styles (e.g., center-lower, karaoke-highlight optional later).
- Basic brand settings: font, size, color, outline.

**FR5 Rendering + export**
- Render 9:16, with optional blurred background fill for horizontal sources.
- Burn captions into video.
- Deliver download links.

## 4) Non-Functional Requirements
- **Async jobs:** Transcription/highlight/render in background; email notification optional.
- **Reliability:** Rendering failures retriable; job status visible.
- **Security:** Private links, expiring URLs.
- **Cost control:** Track minutes processed per user.

## 5) Fastest Build Path (No/Low-Code)
### Recommended stack (post-gate)
- **Frontend + auth + billing (later):** Bubble (fast iteration) or similar.
- **Transcription:** Whisper API (hosted) for speed; or Replicate.
- **Highlight detection:** LLM prompt over transcript to propose segments + rules-based guardrails.
- **Rendering:**
  - Option A: **FFmpeg** in a serverless/container worker (cheapest long-term, more dev)
  - Option B: **Managed rendering API** (fastest time-to-market)
- **Storage:** S3-compatible (or managed storage) + signed URLs.

## 6) Build vs Buy — Decision (What to choose first)
### Transcription
- **Buy:** Whisper API (fastest). Pros: simplest, high quality. Cons: per-minute cost.
- **Build:** Self-host Whisper. Pros: cheaper at scale. Cons: ops burden.
**Recommendation:** Buy for MVP.

### Highlight detection
- **Buy:** LLM API prompt-based segmentation. Pros: very fast to ship. Cons: variability.
- **Build:** custom model/ranker. Pros: consistency at scale. Cons: slow.
**Recommendation:** Buy (LLM) + guardrails.

### Rendering
- **Buy (Managed API like Shotstack/Cloudinary/Mux workflows):** Pros: fastest, fewer infra issues. Cons: per-render costs.
- **Build (FFmpeg worker):** Pros: cheaper at scale, full control. Cons: dev time, failures.
**Recommendation:** Start with managed rendering **if** it reduces build time to <2 weeks; otherwise FFmpeg worker with minimal template set.

### Storage/CDN
- **Buy:** S3/R2 + signed URLs. Recommendation: use commodity storage.

## 7) What Customers Will Pay $99–$299/mo For (Hypotheses to Validate)
**$99/mo (Solo creator):**
- 60–120 minutes processed/month
- 20–40 clips/month
- 2 templates
- Fast captions + export

**$199/mo (Pro creator/coach):**
- 300 minutes processed/month
- 80–120 clips/month
- Brand kit (fonts/colors), custom hook styles
- Auto-generated titles + captions per platform

**$299/mo (Team/agency-lite):**
- Multiple brands/workspaces
- Collaboration + approvals
- Higher limits + priority rendering

**Likely upsell features:**
- Speaker diarization
- “Brand voice” hook generation (trained prompt + examples)
- Niche templates (real estate, fitness, B2B podcast)
- Auto b‑roll cues + on-screen emphasis words

## 8) Customer Discovery: Feature Prioritization Framework
For each interview/DFY client, score each feature:
- **WTP signal (0–3):** would they pay for it today?
- **Frequency (0–3):** used weekly?
- **Revenue impact (0–3):** helps them post more or get leads?
- **Complexity (0–3, reverse):** lower is better.
Prioritize top features with highest (WTP + Frequency + Revenue) minus Complexity.

## 9) Gated 2‑Week Build Plan (ONLY after $5k DFY collected)
### Sprint 0 (Day 1–2): Setup + skeleton
**Deliverables:**
- Bubble app scaffold: auth, dashboard, project list.
- Job queue model: Project → Transcript → Clips → Renders.
**Acceptance criteria:**
- User can create a project and see job statuses (Queued/Running/Done/Failed).

### Sprint 1 (Day 3–14): Core MVP
**Deliverables:**
1) Ingestion: YouTube URL + upload.
2) Transcription job using Whisper API; store transcript with timestamps.
3) Highlight proposal: LLM proposes segments; user can approve/trim.
4) Templates: 2–3 caption styles + basic brand controls.
5) Rendering: 9:16 export with captions burned in; provide download links.
6) Captions export: SRT + plain text.

**Acceptance criteria:**
- From a 30–60 minute source, user can produce at least **5 publishable clips** in one session.
- Exports meet platform specs: 9:16, readable captions, safe margins.
- End-to-end success rate ≥ 90% across 10 test runs; failures surface with actionable errors.

## 10) Explicit Non‑Goals (Defer)
- Full editor timeline
- Auto-posting to social platforms
- Advanced diarization, multi-speaker styling
- AI b-roll insertion (b-roll *cues* ok later)

## 11) What to Do Next (Pre-gate)
- Convert discovery calls into DFY pilots; capture: current workflow, time/cost, must-haves, and price sensitivity.
- Only after $5k collected: pick rendering path (managed vs FFmpeg), then start Sprint 0.
