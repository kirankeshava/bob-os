# AI Short-Form Clip Factory — Revenue-Gated MVP PRD (1–2 pages) + Build/Buy + Interview Prioritization + Gated 2-Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:21:28.820Z

---

Business / legitimacy
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Contact email (all replies): agent_bob_replit+clip-factory@agentmail.to

REVENUE GATE (non-negotiable)
- Do NOT build the SaaS MVP until $5,000 in DFY (done-for-you) clip sales is collected.
- All “product” activity prior to the gate is limited to: discovery calls, paid pilots, and requirements capture.

1) MVP PRD (scoped, not built)
Goal
Convert a long-form source (YouTube link or uploaded file) into ready-to-post vertical clips with captions and basic template styling, fast enough that a creator can publish consistently without hiring an editor.

Primary user
- Podcasters and coaches (solo operators or small teams) posting to TikTok/Reels/Shorts.

Core user story (MVP)
“As a creator, I paste a YouTube link or upload a file, the system transcribes it, detects highlight segments, I pick a template, and export 9:16 clips with burned-in captions.”

MVP flow (v0)
1) Input: paste YouTube URL OR upload MP4/MOV.
2) Job created + status (queued → processing → ready).
3) Transcription: automatic transcript generated.
4) Highlights: system proposes 5–20 candidate segments with titles/hooks.
5) Review: user plays segments, trims start/end, selects 3–10.
6) Template: user selects 9:16 template (font, size, caption placement) + optional logo.
7) Export: render vertical clips with burned-in captions; provide download links + caption text file.

MVP outputs
- MP4 vertical (9:16), 1080x1920
- Burned-in captions (word- or phrase-level timing if feasible)
- A text/CSV export: clip title, suggested hook, hashtags (optional), timestamps

Out of scope for MVP (explicitly deferred)
- Multi-user workspaces, client approvals, team collaboration
- Full brand kits (multiple templates, advanced motion graphics)
- Auto b-roll insertion, stock libraries, dynamic subtitles effects library
- Direct posting/scheduling integrations

2) Fastest build path (low-code + APIs)
Target: ship a working v0 quickly after revenue gate, minimizing custom infrastructure.

Recommended stack (post-gate)
- Frontend + workflow orchestration: Bubble
- Transcription: Whisper API (OpenAI) or equivalent (Deepgram as alternative)
- Video processing: FFmpeg (self-hosted worker) OR managed render API
- Storage/CDN: S3-compatible (or managed object storage) + signed URLs
- Auth: Bubble native auth to start

Architecture (simple)
- Bubble collects link/upload → stores job record → triggers backend workflow.
- Worker service downloads source (for YouTube link: fetch video or require user-upload if ToS concerns) → extracts audio → transcribes → proposes segments → requests render per selected segments/template → uploads finished MP4 → returns URLs to Bubble.

3) Build vs buy decisions (with triggers)
Transcription
- Buy (recommended): Whisper API or Deepgram.
- Build: not recommended.
- Trigger to switch: if diarization accuracy and speaker separation become a paid must-have for >40% of paying users.

Highlight detection
- Build-light (recommended): heuristics + LLM summarization over transcript chunks; rank by energy/keywords; allow user trim.
- Buy: there are APIs but often expensive/opaque.
- Trigger to buy: if users demand consistently high-quality “viral-ready” segments and churn due to weak suggestions.

Rendering
- Option A (fastest to control): FFmpeg worker (self-hosted). Pros: cheap at scale, flexible. Cons: devops, queueing.
- Option B (fastest to ship): Managed video render API (e.g., Shotstack/Mux-like). Pros: fewer moving parts. Cons: per-render costs.
- Recommendation: start with managed rendering only if engineering time is the bottleneck and early volumes are low. Switch to FFmpeg when renders/day increase and cost becomes material.

Storage
- Buy (recommended): S3-compatible object storage.

4) What clients will pay $99–$299/mo for (validated via interviews; use scoring below)
Hypothesis pricing ladder (to validate)
- $99/mo Creator: limited minutes + captions + basic templates + exports
- $199/mo Pro: more minutes + better highlight suggestions + brand kit + faster render
- $299/mo Studio: multi-brand templates + approvals + team seats + API/Zapier

Likely paid “upgrade” features to test (by WTP)
- Diarization / speaker labels (especially podcast interviews)
- Brand voice hooks (first line/title variants tailored to niche)
- Niche templates (coach/podcast/real estate/fitness) that look native
- Batch processing: “give me 30 clips/month” with consistent style
- Faster turnaround / priority queue

5) Customer discovery: scoring model (use after each call)
For each feature, score 1–5:
A) Willingness-to-pay signal (1=nice to have, 5=would pay extra / required)
B) Frequency (1=rarely used, 5=every job)
C) Churn risk if missing (1=won’t matter, 5=dealbreaker)
D) Implementation complexity (1=easy, 5=hard)

Priority score = (A*2 + B + C) − D
- Only promote features to MVP+ (post-gate) if Priority score ≥ 6 and at least 2 interviewees explicitly attach a dollar value.

6) Discovery → Paid Pilot → SaaS waitlist script (revenue-first)
Use on calls; objective is DFY conversion now, product signal second.

Opening (30s)
“Hey — I’m Bob. We run an AI Short-Form Clip Factory for podcasters and coaches. Here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3. If it’s easier, you can also email any links/questions to agent_bob_replit+clip-factory@agentmail.to.”

Qualify (5 min)
- “How many long-form episodes/videos do you publish per month?”
- “Which platforms matter most (TikTok/Reels/Shorts)?”
- “What’s your current clipping workflow and what do you hate about it?”
- “How many clips/week would you actually post if it was easy?”

Pain + value (5–7 min)
- “What would it be worth to reliably get X clips/week that match your style?”
- “Have you hired editors? What did it cost and why did it fail or succeed?”

Offer (DFY pilot, close now)
“We can start with a paid pilot where we turn each episode into a weekly pack of ready-to-post vertical clips: hooks, captions, and formats for TikTok/Reels/Shorts. If you like the output, we keep it recurring. If not, we stop. Want to try a 7-day pilot for your latest episode?”

SaaS positioning (only after pilot interest)
“We’re also validating a self-serve tool that does link → highlights → captions → export. If you do the pilot, I’ll put you on the early access list and build around your workflow.”

Close + next step
- Collect: episode link, brand colors/fonts (if any), target platforms, and clip cadence.
- Confirm: “Reply to agent_bob_replit+clip-factory@agentmail.to with the link + your top 3 topics you want clips about.”

7) Gated 2-week build plan (only after $5k DFY collected)
Definition of ready (must be true before Day 1)
- $5,000 DFY revenue collected.
- 5–10 interviews completed with scoring sheets.
- Locked MVP scope: input types, template v0, export specs.

Week 1 (Build core pipeline)
Day 1–2 Acceptance criteria
- User can create an account/login.
- User can submit a YouTube link or upload file.
- Job status updates visible in UI.

Day 3–4 Acceptance criteria
- Transcription completes for a 30–90 minute file with >95% completion success rate.
- Transcript is viewable and downloadable.

Day 5 Acceptance criteria
- System proposes at least 5 highlight segments with timestamps.
- User can preview and trim segment boundaries.

Week 2 (Templates + export)
Day 6–8 Acceptance criteria
- At least 3 caption templates available (caption position/font/size).
- User can apply a template to a chosen segment.

Day 9–10 Acceptance criteria
- Render completes to 1080x1920 MP4 with burned-in captions.
- Download link works; files stored securely via signed URLs.

Day 11–12 Acceptance criteria
- Export bundle includes: MP4 + caption text + segment metadata.
- Basic error handling: failed job retry + user-visible failure message.

Day 13–14 Acceptance criteria
- End-to-end test: YouTube link → transcript → highlights → 3 exported clips in <30 minutes processing time (baseline), depending on render approach.
- Minimal analytics: jobs created, jobs completed, avg processing time.

Guardrails
- No integrations (posting, schedulers) until recurring subscription demand is validated.
- No advanced b-roll until highlight quality + caption/export reliability is stable.

This document is designed to be used immediately for discovery calls and DFY conversion while keeping the SaaS build strictly behind the $5k revenue gate.