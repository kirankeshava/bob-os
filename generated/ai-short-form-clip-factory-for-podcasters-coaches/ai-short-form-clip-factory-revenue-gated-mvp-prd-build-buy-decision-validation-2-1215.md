# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Validation + 2-Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:29:11.532Z

---

Business: AI Short-Form Clip Factory for Podcasters & Coaches
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

NON-NEGOTIABLE REVENUE GATE
Do not build the SaaS MVP until the business has collected the first $5,000 in DFY clip-package revenue. Until then, only run customer discovery during DFY sales/fulfillment.

1) MVP GOAL & SUCCESS METRIC
Goal: Turn a long-form YouTube video (or uploaded file) into ready-to-post vertical 9:16 clips with burned-in captions fast enough that creators can post consistently without an editor.
MVP success metric (post-gate): Within 10 minutes of providing a link, user exports at least one 9:16 clip with captions and downloads it successfully; >30% of test users export 3+ clips from the same long video.

2) MVP USER STORY (END-TO-END)
Primary user: Podcaster/coach (solo operator) who has a YouTube episode and wants 5–20 short clips.
User story: “As a creator, I paste a YouTube link (or upload a video), the system transcribes it, finds highlights, lets me pick a template, and exports vertical clips with captions so I can post to TikTok/Reels/Shorts quickly.”

3) MVP SCOPE (POST-GATE)
MVP includes ONLY:
A. Input
- Paste YouTube link OR upload MP4 (cap size to reduce compute risk).
- Basic job status: queued → processing → ready.

B. Transcription
- Auto-transcribe audio to text (with timestamps).
- Return transcript + word-level timestamps sufficient for caption burn-in.

C. Highlight detection
- Generate 10–20 candidate segments (15–60s) using simple heuristics + LLM ranking (e.g., curiosity hooks, strong claims, list items, Q&A spikes).
- Display segment list with start/end times and a short “why this is good” label.

D. Template selection
- 2–3 fixed templates only (to reduce complexity):
  1) Center-crop speaker + captions bottom
  2) Split-screen (speaker top, b-roll area bottom) with captions
  3) Full-frame captions over blurred background
- Simple brand inputs: font choice (limited), caption style (2 options), primary color.

E. Export
- Export 9:16 MP4 with burned-in captions.
- Download link (time-limited) + optional email notification.
- Captions export: .srt and/or .vtt download.

Explicitly OUT of scope for MVP (defer):
- Multi-user teams, roles/permissions
- Advanced timeline editing UI
- Automatic b-roll fetching/licensing
- Full brand-kit management (logos, intro/outro, music library)
- Social scheduling/publishing

4) MVP UX FLOW (SCREENS)
1) Landing / App entry: “Paste YouTube link or upload video” + email login.
2) Processing screen: status + ETA + “We’ll email when ready.”
3) Results screen:
   - Left: transcript (searchable)
   - Right: highlight candidates list with duration, hook summary
4) Clip detail screen:
   - Video preview
   - Template dropdown (3 templates)
   - Caption style toggle (2)
   - Export button
5) Exports list: downloadable MP4 + SRT/VTT.

5) FASTEST BUILD PATH (LOW/NO-CODE ORCHESTRATION)
Orchestrator/UI: Bubble (fast CRUD, auth, job tables, simple UI).
Transcription: OpenAI Whisper API (fast to integrate, good quality).
Highlight detection:
- Step 1: chunk transcript by timestamp windows.
- Step 2: LLM prompt to propose candidate timestamps and “hook lines”.
- Step 3: rank candidates by simple scoring (novelty, specificity, emotional language, question/answer density).
Rendering:
Option A (build): FFmpeg in a server environment (Cloud Run/Fly.io/Render). Bubble triggers an API workflow → server renders → returns URL.
Option B (buy): Shotstack (or similar render API) for quicker, more reliable rendering; less DevOps.
Storage/CDN: Cloudflare R2 or AWS S3 for outputs; signed URLs for downloads.
Queue/Jobs: Simple DB job table + worker; retry on failure.

6) BUILD VS BUY DECISION (RECOMMENDED)
Transcription: BUY (Whisper API). Rationale: fastest integration, no infra.
Highlight detection: BUILD-light (LLM prompts + heuristics). Rationale: differentiation, cheap to iterate.
Rendering: Start BUY if reliability/time-to-market is priority; start BUILD if you have strong FFmpeg chops and want lower per-render cost.
Recommended post-gate default: Start with BUY rendering for 2 weeks (reduce risk), then switch to FFmpeg if unit economics demand it.

7) WHAT CUSTOMERS WILL PAY $99–$299/MO FOR (VALIDATION HYPOTHESES)
Hypothesis features that increase willingness-to-pay:
- Diarization (speaker detection) for interview podcasts
- “Brand voice hooks”: auto-generate 3 hook variants in the creator’s tone
- Niche templates (real estate, fitness, marketing) with proven caption styles
- Batch processing: multiple episodes per month, consistent formatting
- Team workflow: VA/editor handoff, comments/approvals
- Performance feedback loop: which hooks/segments worked, then adapt suggestions
Pricing bands to validate:
- $99/mo: 20 exports, basic templates, transcript + highlights
- $199/mo: 60 exports, diarization, hook variants, 5 templates
- $299/mo: 120 exports, team seats, brand kit, priority renders

8) CUSTOMER DISCOVERY (RUN DURING DFY SALES)
On every DFY call or fulfillment handoff, ask and log:
- “If you could press one button and get 10 ready-to-post clips, what must be true for you to pay $199/mo?”
- “Do you need diarization (multiple speakers)?”
- “Would you pay more for templates specific to your niche?”
- “What’s your monthly posting goal (clips/week)?”
- “What part is most painful today: finding highlights, captions, formatting, or posting?”
Decision rule: If 3+ paying DFY clients say they would switch to $199/mo for diarization + templates + batch exports, that becomes the first post-MVP upsell bundle.

9) 2-WEEK BUILD PLAN (START ONLY AFTER $5K DFY COLLECTED)
Week 1 (MVP skeleton + transcription + highlights)
Day 1: Finalize stack (Bubble + chosen render approach). Acceptance: architecture diagram + endpoints defined.
Day 2: Bubble app scaffold (auth, projects, jobs table). Acceptance: user can create a project and see it in dashboard.
Day 3: YouTube link ingest + audio extraction workflow. Acceptance: paste link → job created → audio file stored.
Day 4: Whisper transcription integration. Acceptance: transcript returns with timestamps and is viewable.
Day 5: Highlight candidate generator (LLM prompt + heuristic ranking). Acceptance: see 10–20 segments with timestamps.

Week 2 (templates + rendering + export)
Day 6: Basic clip cutting pipeline (start/end) without styling. Acceptance: export a raw 9:16 clip (even if plain).
Day 7: Caption burn-in (word/line timing) + SRT/VTT export. Acceptance: captions appear correctly; SRT downloads.
Day 8: Implement Template 1 + 2. Acceptance: user can select template and preview.
Day 9: Template 3 + basic brand inputs (font/color limited set). Acceptance: 3 templates functional.
Day 10: Output hosting + signed download links + email notification. Acceptance: user receives link; download works.
Day 11: Error handling + retries + job status UI. Acceptance: failures visible; rerun possible.
Day 12: QA on 10 diverse videos (solo, interview, noisy). Acceptance: >80% jobs succeed end-to-end.
Day 13: Private beta with 3 DFY clients. Acceptance: each exports at least 3 clips; collect NPS + blockers.
Day 14: Fix top blockers + lock pricing page copy for beta. Acceptance: known issues list + v1 ready.

10) ACCEPTANCE CRITERIA (DEFINITION OF DONE)
- User can paste a YouTube link and receive a transcript with timestamps.
- System proposes highlight segments and user can choose one.
- User can export at least one 9:16 MP4 with burned-in captions.
- User can download MP4 + SRT/VTT.
- Job status is visible; common errors produce understandable messages.

11) RISKS & MITIGATIONS
- Render failures/latency → mitigate with managed render API first, enforce upload limits.
- Highlight quality variability → mitigate with transparent “why this segment” and quick regeneration.
- Costs (transcription/render) → mitigate with monthly export caps and fair-use limits.

This document is intentionally scoped to be executable immediately after the $5k DFY revenue gate is met; until then, focus on distribution and DFY sales while collecting feature and pricing signals from paying customers.
