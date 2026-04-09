# AI Short-Form Clip Factory — MVP PRD + Build/Buy Decisions + Client Validation + Gated 2‑Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:14:07.747Z

---

## 0) Revenue Gate (Non‑negotiable)
**Do not build this SaaS MVP until $5,000 in done-for-you (DFY) clip-pack sales is collected.**
Reason: ensure product demand, learn real requirements, and avoid building the wrong automation.

---

## 1) MVP PRD (1–2 pages)
### Product goal
Turn a long-form video/podcast into **ready-to-post 9:16 vertical clips** with **captions** and **hooks/templates**, with minimal human effort.

### Target user
- Podcasters, coaches, and creator-led small brands publishing on TikTok/IG Reels/YouTube Shorts.
- Pain: inconsistent output, editing time, cost of editors.

### MVP user story (end-to-end)
**As a creator**, I paste a YouTube link (or upload a file), and the system:
1) Ingests the video/audio
2) Transcribes speech automatically
3) Detects highlight segments (candidate clips)
4) Lets me pick a template
5) Exports a 9:16 video with burned-in captions
6) Lets me download the mp4 (and optionally .srt/.vtt)

### Primary workflow (MVP)
1. **Input**: Paste YouTube URL OR upload mp4/mov/mp3/wav
2. **Processing**:
   - Extract audio
   - Transcribe (timestamps)
   - Identify 5–15 candidate highlight segments (30–90s)
3. **Review**:
   - Show list of clips with a title + confidence + transcript preview
   - User selects up to N clips
4. **Template selection**:
   - Choose from 3 basic templates (e.g., “Podcast split”, “Centered speaker”, “Text-heavy”) with 1–2 caption styles
5. **Export**:
   - Render 1080x1920 mp4, 30fps, H.264, AAC audio
   - Burn-in captions (word or sentence level)
   - Download links + optional caption file export (.srt)

### MVP scope boundaries (explicitly NOT in MVP)
- No team seats / approvals / collaboration
- No auto-posting to TikTok/IG/YouTube
- No complex brand kits, dynamic b-roll library, or advanced motion graphics
- No multi-language, no custom fonts library beyond basic
- No long-term asset management beyond recent jobs

### Success metrics (MVP)
- Time to first clip export: **< 10 minutes** for a 30–60 min input (depending on render)
- Export success rate: **> 95%** jobs complete without manual intervention
- User-perceived quality: at least **“good enough to post”** without an editor for 50%+ clips

### Functional requirements
- Input: YouTube URL + file upload
- Transcription with timestamps
- Highlight detection producing segments (start/end)
- Clip preview (at least transcript + timestamps; video preview ideal but optional)
- Template selection (3)
- Rendering to 9:16
- Caption burn-in + export .srt
- Job status (queued/processing/complete/failed)

### Non-functional requirements
- Basic auth (email login)
- Rate limiting to avoid abuse
- Storage retention policy (e.g., 7 days for MVP)
- Privacy note: uploaded content processed for rendering/transcription only

---

## 2) Fastest Build Path (low/no-code + APIs)
### Recommended MVP architecture (fastest)
- **Frontend + workflow orchestration**: Bubble (fast to ship UI + DB + auth)
- **Async processing**: Bubble backend workflows + a lightweight webhook worker (Replit/Cloud Run) to run FFmpeg steps if needed
- **Transcription**: Whisper API (OpenAI) OR AssemblyAI (buy) for speed + diarization option later
- **Highlight detection**:
  - MVP: rule-based + LLM summarization of transcript chunks (fast) to propose segments
  - Later: ML scoring + engagement heuristics
- **Rendering**:
  - Option A (Build): FFmpeg pipeline (crop/scale, background blur, captions)
  - Option B (Buy): Shotstack / Mux / Creatomate for templated rendering and scale
- **Storage**: S3-compatible (Cloudflare R2 is cost-effective) or AWS S3; serve via signed URLs

### MVP highlight detection heuristic (pragmatic)
1) Chunk transcript by speaker turns or 30–60s windows.
2) Score each chunk:
   - high “hook density” (questions, bold claims, numbers)
   - emotional words, contrast (“but”, “however”), listicles (“3 ways…”) 
   - short self-contained narrative
3) Select top N segments and expand/trim to clean sentence boundaries.

---

## 3) Build vs Buy Decision (tooling)
### Principle
For MVP: **buy anything that prevents shipping**; build only the minimal glue.

| Component | Build Option | Buy Option | MVP Recommendation | Rationale |
|---|---|---|---|---|
| Transcription | Whisper open-source hosted by us | Whisper API / AssemblyAI / Deepgram | **Buy (API)** | Fast, reliable, less infra risk |
| Diarization | Build diarization pipeline | AssemblyAI/Deepgram diarization | **Defer** (upsell) | Adds cost/complexity; sell later |
| Highlight detection | LLM + heuristics | Specialized clipping APIs (varies) | **Build light** | Cheap + flexible; good enough |
| Rendering | FFmpeg pipeline | Shotstack/Creatomate/Mux templates | **Start Build (FFmpeg)** OR **Buy if time-constrained** | FFmpeg is flexible but can be fiddly; buy if schedule slips |
| Captions | FFmpeg drawtext + srt | Captions via rendering service | **Build** | Straightforward for MVP |
| Hosting | Replit/Cloud Run worker | Fully managed workflow platform | **Build light** | Minimal worker suffices |
| Auth/Billing | Stripe integration | LemonSqueezy/Paddle | **Defer billing** until post-DFY validation | MVP gated; don’t monetize SaaS yet |

**Fastest “ship something” path:** Bubble + Whisper API + Shotstack (buy rendering) if FFmpeg pipeline becomes a bottleneck.

---

## 4) Paying-client validation: what features justify $99–$299/mo
### Hypothesis pricing tiers
- **$99/mo (Starter)**: 30 clips/month, basic templates, caption styles, YouTube link ingest
- **$199/mo (Pro)**: 75 clips/month, better highlight detection, custom hook suggestions, brand colors, faster processing
- **$299/mo (Studio)**: 150 clips/month, diarization + speaker labeling, niche templates (coach/podcast/real estate), team seat (2), priority queue

### Likely high-value features (ranked hypotheses)
1) **Reliable highlight selection** (reduces human review time)
2) **Captions that look “native”** (karaoke/word emphasis, safe margins)
3) **Template presets by niche** (coach Q&A, podcast studio, screen-share + facecam)
4) **Brand kit** (fonts/colors/logo positioning)
5) **Diarization / speaker switching** (for podcasts)
6) **Hook generation** (title + on-screen intro line)
7) **Export packages** (mp4 + srt + caption-free version)

### Customer interview script (10–15 minutes)
Use with DFY clients and leads. Include legitimacy links in follow-ups.

1) “Where do clips currently come from (editor, VA, yourself)?”
2) “What is the most painful step: finding moments, editing, captions, formatting, posting?”
3) “How many clips/week do you realistically want?”
4) “What makes a clip ‘postable’ for you? (captions style, b-roll, framing, hook text)”
5) “If you could push a button and get 10 clips, what % would you actually post?”
6) “Would you pay for: (a) diarization, (b) brand kit templates, (c) hook suggestions, (d) niche templates?” Rank 1–4.
7) “What would you pay monthly if it saved you X hours/week or replaced an editor?”
8) “What would stop you from subscribing?”

**Email follow-up template (references assets):**
Subject: Quick 10-min feedback on AI Clip Factory?

Hi {{Name}},

I’m Bob from Clip Factory. We turn long videos/podcasts into ready-to-post vertical clips with hooks + captions.
Website for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Could I ask 8 quick questions (10 minutes) to make sure we build only what creators will actually pay for?
If easier, just reply with your biggest pain: finding moments vs editing/captions vs formatting.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

### Feature prioritization rubric (use after interviews)
Score each requested feature 1–5:
- **WTP (willingness to pay)**
- **Frequency (how often used)**
- **Retention impact** (would they churn without it?)
- **Build complexity** (inverse score)
Prioritize highest total score first.

---

## 5) Gated 2-week build plan (ONLY after $5k DFY collected)
### Sprint goal
Ship an internal beta where a user can paste a YouTube link and download 1–3 vertical clips with captions using 1–3 templates.

### Week 1 (Days 1–7): Core pipeline
**D1–D2: Product wiring**
- Bubble app skeleton: auth, project page, “New job” form (YouTube URL/upload)
- DB schema: Users, Jobs, Clips, Templates
**Acceptance criteria**: user can create a job and see it in a dashboard with statuses.

**D3–D4: Transcription + transcript viewer**
- Implement transcription API call and store transcript with timestamps
- Display transcript and allow selecting start/end timestamps
**Acceptance criteria**: 60-min YouTube link produces transcript; user can view it and set timestamps.

**D5–D7: Highlight detection v1**
- Auto-generate 5–15 suggested segments from transcript
- UI to approve/reject suggested clips
**Acceptance criteria**: system produces at least 5 suggested clips; user can select 3 for export.

### Week 2 (Days 8–14): Templates + rendering + export
**D8–D10: Rendering pipeline**
- Implement rendering (FFmpeg worker OR managed rendering provider)
- Basic 9:16 formatting (crop/blur background) + audio sync
**Acceptance criteria**: renders complete mp4 1080x1920 with correct segment timings.

**D11–D12: Captions**
- Burn-in captions from transcript (sentence-level minimum)
- Export .srt
**Acceptance criteria**: captions visible, safe margins, readable; .srt downloads.

**D13–D14: Hardening + beta checklist**
- Job retries, failure states, retention policy, signed URLs
- Basic analytics: processing time, failure count
**Acceptance criteria**: 10 consecutive jobs succeed end-to-end; failures show actionable errors.

### Definition of Done (MVP beta)
- Paste YouTube link → get suggested clips → choose template → export/download vertical clips with captions
- Works for at least 3 real customer videos across different audio qualities
- Documented limitations and next features driven by interviews

---

## 6) Notes to keep aligned with CEO priorities
- This plan is **distribution-safe**: do DFY first to generate cash + requirements.
- MVP should be built only when DFY proves repeatable demand; otherwise default dead risk is high.
- Keep SaaS scope narrow: ingestion → highlights → captions export; postpone “nice-to-haves.”
