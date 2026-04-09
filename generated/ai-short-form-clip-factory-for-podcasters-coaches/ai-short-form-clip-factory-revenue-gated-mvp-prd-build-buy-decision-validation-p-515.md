# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Validation Plan + 2-Week Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:49:25.361Z

---

# AI Short-Form Clip Factory — MVP PRD (Revenue-Gated)

**IMPORTANT GATE:** Do not build until **$5,000 DFY (done-for-you) clip sales are collected**. Until then, use this document for sales enablement + customer validation.

## 1) Problem, Audience, Outcome
**Target users:** podcasters, coaches, course creators, and small brands who already publish long-form video/audio and want consistent TikTok/Reels output without hiring an editor.

**Job-to-be-done:** “Turn my 30–90 minute episode into multiple ready-to-post vertical clips that look on-brand and perform well.”

**MVP outcome:** A user can provide a YouTube link or upload a file and receive **multiple 9:16 clips** with **burned-in captions**, **hook suggestions**, and **platform-safe formatting**.

## 2) MVP User Story (End-to-End)
### Primary user story
As a creator, I want to paste a YouTube link (or upload an MP4/MOV) so the app can:
1) **Ingest** the video
2) **Transcribe** it
3) **Detect highlight segments** (e.g., 15–60s)
4) Let me pick a **clip template** (style + captions)
5) **Export** vertical clips (9:16) with captions and download links

### MVP flow (screens / steps)
1. **Auth + Project Create**
   - Sign up/login (email magic link is fine for MVP)
   - “New Project” → project name

2. **Ingest**
   - Input: **YouTube URL** OR upload video file
   - Basic checks: duration limit (e.g., ≤120 min), file type
   - Store raw video in object storage

3. **Transcribe**
   - Generate transcript + word-level timestamps
   - Output: transcript text, timestamps, confidence

4. **Highlight detection**
   - Auto-suggest 5–20 candidate clips
   - Each suggestion includes:
     - Start/end time
     - Title/summary
     - Hook suggestion (1–2 variants)
     - Confidence score (simple)

5. **Review + Template selection**
   - User previews candidate clips (low-res preview acceptable)
   - User selects a template:
     - Captions style (font/position)
     - Safe margins
     - Optional headline bar
   - User selects clips to export

6. **Export + Deliver**
   - Render 9:16 vertical mp4 with burned-in captions
   - Provide download links
   - Export captions separately: SRT/VTT

## 3) Functional Requirements (MVP)
**Must-have (MVP):**
- YouTube link ingestion OR upload
- Transcription with timestamps
- Auto highlight suggestions
- Template selection (at least 2 templates)
- Vertical 9:16 export with burned-in captions
- Download page + shareable links

**Nice-to-have (post-MVP):**
- Speaker diarization
- Brand voice hooks (trained prompts per brand)
- Niche templates (real estate, fitness, business coaching)
- Team workspace + approvals
- Auto b-roll cues + stock pull

**Non-goals (MVP):**
- Fully automated publishing to TikTok/IG
- Advanced motion graphics library
- Complex multi-track timeline editing

## 4) Acceptance Criteria (MVP)
A build is acceptable when:
1. A user can paste a YouTube link and see a created Project within 2 minutes.
2. Transcript completes with timestamps for a 30–60 minute video in a reasonable time (target: <15 min typical, depends on provider).
3. The system returns at least **5 highlight suggestions** with start/end times.
4. User can select **at least 3 clips** and export each as:
   - 9:16 mp4
   - burned-in captions
   - separate SRT/VTT
5. Exports play correctly on mobile and maintain safe caption margins.

## 5) Fastest Build Path (Low/No-Code)
### Orchestrator/UI: Bubble
- Pros: fast UI, auth, database, workflows
- Cons: video processing must happen via external workers/APIs

### Processing
**Transcription:** Whisper API (hosted) or managed transcription provider
- MVP suggestion: hosted Whisper API for speed and adequate quality.

**Highlight detection:** LLM-based segmentation + heuristics
- Input: transcript + timestamps
- Output: suggested segments (start/end) + titles + hooks

**Rendering:**
Two paths:
- **Build** with FFmpeg on a worker (Render/Fly.io/AWS Lambda with limits)
- **Buy** managed rendering (Shotstack, Mux, or similar)

### Storage/Delivery
- Object storage for source and outputs (S3-compatible)
- Signed URLs for download

## 6) Build vs Buy — Decision Guide
### Rendering (highest leverage decision)
**Build with FFmpeg if:**
- You need maximum control over caption styles and can tolerate devops/worker work.
- You want lower per-render cost at scale.

**Buy rendering (Shotstack/Mux) if:**
- You need speed/reliability now.
- You want to avoid queue/worker scaling.

**MVP bias:** buy managed rendering if it removes 70% of complexity; switch to FFmpeg later if unit economics require.

### Transcription
- **Buy (Whisper API / managed ASR)** for MVP.
- Build/host later only if cost or privacy requires.

### Highlight detection
- **Build (LLM prompts + rules)** because differentiation is in “good clips” selection.

## 7) Paying-Client Validation (What to Sell at $99–$299/mo)
Goal: confirm which features trigger subscription purchase **after** DFY proves demand.

### Hypothesized tiers
**$99/mo (Solo):**
- X projects/month
- Auto highlights + captions export
- 2–3 templates

**$199/mo (Pro):**
- More projects
- Brand kit (fonts/colors)
- Hook variants + CTA suggestions
- Higher priority rendering

**$299/mo (Team/Agency light):**
- Multi-user workspace
- Approval workflow
- Client folders
- Diarization + speaker labels

### Interview questions (paid-signal)
1. “How many clips/week do you want reliably?”
2. “What’s the cost (time or money) of your current workflow?”
3. “If this produced 10 clips/episode you’d actually post, what would that be worth monthly?”
4. “Which would you pay extra for: diarization, brand voice hooks, niche templates, approval links, b-roll cues?”
5. “What’s the dealbreaker that would stop you from subscribing?”

### Feature prioritization rubric (use after each call)
Score each feature 1–5 on:
- Willingness-to-pay signal
- Frequency of use
- Impact on conversion
- Complexity to implement

Prioritize: high WTP + high frequency + low/med complexity.

## 8) Gated 2-Week Build Plan (Only after $5k DFY collected)
### Week 1 — Core pipeline (link → transcript → suggestions)
**Day 1–2:** Bubble app skeleton
- Auth, project table, upload/link input
- Acceptance: create project, store metadata

**Day 3–4:** Ingest + transcription integration
- Fetch YouTube video (or accept upload)
- Send to transcription API, store transcript + timestamps
- Acceptance: transcript visible in project view

**Day 5:** Highlight detection
- LLM prompt + deterministic rules to propose segments
- Acceptance: at least 5 segment suggestions with timestamps

### Week 2 — Templates + export
**Day 6–7:** Template system
- Define 2–3 caption styles and layout rules
- Acceptance: user selects template per clip

**Day 8–10:** Rendering integration
- Managed rendering API OR FFmpeg worker
- Burned-in captions, 9:16 framing, safe margins
- Acceptance: exported mp4 renders reliably for 3 clips

**Day 11–12:** Delivery + downloads
- Signed URLs, download page, SRT/VTT export
- Acceptance: user can download mp4 + captions files

**Day 13–14:** QA + performance + guardrails
- Limits, retries, error states
- Acceptance: 10 end-to-end test runs succeed with <10% manual intervention

## 9) Risks & Mitigations
- **Rendering reliability:** start with managed rendering to avoid worker scaling.
- **Highlight quality:** iterate with DFY feedback; store “accepted/rejected clips” to improve prompts.
- **Unit economics:** track cost per minute (transcription + rendering) from day one.

---
**Next action (pre-build):** run 5–10 discovery calls and attach actual quotes + pricing thresholds to this PRD. Only initiate build once the DFY revenue gate ($5k) is satisfied.

Legitimacy link to reference in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Contact email for prospects: agent_bob_replit+clip-factory@agentmail.to
