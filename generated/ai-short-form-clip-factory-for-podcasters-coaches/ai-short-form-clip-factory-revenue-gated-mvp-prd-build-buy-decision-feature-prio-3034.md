# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Feature Prioritization + 2-Week Plan (Post-$5k DFY)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:14:07.482Z

---

# AI Short-Form Clip Factory — MVP PRD (Revenue-Gated)

## Revenue Gate (Hard Constraint)
**Do not build** this SaaS MVP until **$5,000 in DFY clip-package revenue is collected**. Until then, use DFY delivery + interviews to validate willingness-to-pay and feature priority.

## Problem / Job-To-Be-Done
Podcasters and coaches want consistent TikTok/Reels/Shorts output but don’t want to hire editors or manage a complex workflow. They need fast conversion of long-form video into **ready-to-post** vertical clips with captions and hooks.

## MVP Goal
Deliver a thin, reliable workflow that turns a single long-form input into a small set of candidate highlight segments, then exports captioned 9:16 clips.

## MVP User Story (End-to-End)
1) User pastes a **YouTube link** (or uploads a file) 
2) System extracts audio/video, runs **transcription** 
3) System detects **highlight segments** (5–12 candidates) 
4) User selects a **template** (caption style + safe zones) 
5) User exports **9:16 video with burned-in captions** (+ optional .srt/.vtt)

## In-Scope (MVP)
- Auth: email + password (or magic link)
- Input: YouTube URL (primary); file upload (secondary)
- Transcription: Whisper API (OpenAI or comparable)
- Highlight detection: simple heuristic + LLM-assisted ranking
- Basic editor: choose segments, adjust start/end, choose 1 of 3 caption templates
- Export: 1080x1920 MP4 with burned-in captions; download link
- Captions export: SRT/VTT download

## Out of Scope (Non-goals for MVP)
- Team accounts, collaboration, roles
- Full timeline editor, b-roll library, auto-emoji, advanced motion graphics
- Auto-posting to TikTok/IG/YT
- Multi-speaker diarization as a requirement (test demand first)

## Core Screens / Flows
1) **New Project**: paste link/upload → project name → submit
2) **Processing**: status steps (ingest → transcribe → highlights)
3) **Highlights**: list of candidate segments with score + transcript snippet
4) **Clip Builder**: pick template; tweak start/end; preview captions
5) **Export**: render → download MP4 + SRT/VTT

## Data Requirements
- Store: source URL/file pointer, transcript text + timestamps, candidate segments (start/end + score), template selection, render outputs.

## Success Metrics (First 30 days post-MVP)
- Time-to-first-clip < 15 minutes for a 60–90 min episode
- Export success rate > 95%
- >= 30% of DFY customers convert to paid SaaS pilot

---

# Fastest Build Path (Low-Code + Minimal Ops)
## Recommended Stack (Speed-first)
- **Frontend/App**: Bubble (fast CRUD, auth, dashboards)
- **Transcription**: Whisper API
- **Highlight Detection**: hybrid
  - Heuristics: energy peaks + transcript keywording + segment length rules
  - LLM: rank/label segments + generate hook options
- **Rendering**:
  - Option A (build): FFmpeg in a lightweight worker (e.g., Cloud Run) for caption burn-in + 9:16 crop
  - Option B (buy): Shotstack (faster to ship, less ops) if free/low-cost tiers suffice initially
- **Storage**: S3-compatible (Cloudflare R2 or AWS S3) + signed URLs

## Build vs Buy Decision (Pragmatic)
- **Transcription**: Buy (Whisper API). Build is not worth it.
- **Highlight detection**: Build (simple rules + LLM ranking) because it’s differentiating and cheap to iterate.
- **Rendering**:
  - If MVP needs only simple crop + captions: **Build with FFmpeg** (cheapest at scale, moderate setup)
  - If speed-to-market is paramount and templates expand: **Buy (Shotstack)** temporarily, migrate later.
- **Auth/Billing**: Auth in Bubble; Billing deferred until post-validation (or use Stripe later).

---

# Paying Client Validation (What to Test for $99–$299/mo)
## Hypothesized Paid Features
**$99/mo (Starter):**
- 20 exports/mo, 3 templates, caption styles, basic highlights

**$199/mo (Pro):**
- 60 exports/mo, hook suggestions, topic tags, improved highlight ranking, brand presets

**$299/mo (Studio):**
- 150 exports/mo, team seats, reusable brand kit, niche templates, faster rendering queue

## Features to Validate (Rank by WTP)
1) **Diarization / speaker labels** (needed for interviews/panels)
2) **Brand voice hooks** (hook generator tuned to niche + prior winners)
3) **Niche templates** (real estate, fitness, business coaching, therapy)
4) **Auto b-roll cues** (timestamps + suggestions)
5) **One-click repurposing** (YT Shorts + IG + TikTok safe zones)

## Interview Capture Format (post-call)
- Customer type + content format (solo/interview)
- Current workflow + spend ($/mo) + time cost
- “Must-have to pay” feature (exact quote)
- Price sensitivity: would they pay $99/$199/$299? Why?
- Biggest objection to SaaS vs DFY
- Priority scores: Impact (1–5), Frequency (1–5), WTP (1–5), Complexity (1–5)

---

# Gated 2-Week Build Plan (ONLY after $5k DFY collected)
## Week 1 — Core Pipeline + Basic UI
**Day 1–2: Project ingest + storage**
- Accept YouTube URL; create project record; store metadata
**Acceptance:** project created reliably; status visible.

**Day 3–4: Transcription**
- Whisper API integration; store transcript with timestamps
**Acceptance:** transcript appears in UI; timestamps preserved.

**Day 5–7: Highlight detection v1**
- Generate 5–12 candidate segments with scores
**Acceptance:** highlight list renders; segments have start/end; user can adjust.

## Week 2 — Templates + Rendering + Export
**Day 8–10: Template system (v1)**
- 3 caption templates (font/size/position/safe zones)
**Acceptance:** user can switch templates and preview caption style.

**Day 11–12: Rendering worker**
- FFmpeg pipeline for 9:16 crop + burned-in captions
**Acceptance:** export produces playable 1080x1920 MP4; captions synced.

**Day 13–14: Exports + reliability pass**
- Download links, SRT/VTT export, retry on render failure
**Acceptance:** user can download MP4 + SRT/VTT; >95% successful renders in testing set.

## Definition of Done (MVP)
- A new user can go from link → highlights → select template → export captioned 9:16 MP4 without manual intervention.
- Clear error messages + retry path.
- Processing and rendering complete with reasonable latency.

---

# Notes (Distribution/Revenue Alignment)
This MVP is designed to convert DFY customers into subscription pilots. Use DFY fulfillment to learn: which highlight quality threshold is “good enough,” which template styles win in each niche, and what users actually pay for (not what they say they want). For legitimacy in outreach and onboarding, continue referencing:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to
