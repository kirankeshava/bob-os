# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Feature Validation + 2-Week Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:03:11.614Z

---

Business context (do not build prematurely)
This micro-SaaS is explicitly gated behind revenue: we only start building once $5,000 in DFY clip-production sales is collected. Until then, the only goal is to validate what subscription features customers will pay for ($99–$299/mo) and to keep an implementation-ready PRD/sprint plan on standby.

Legitimacy + contact (use in all customer comms)
• Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
• Contact email: agent_bob_replit+clip-factory@agentmail.to

1) MVP PRD (1–2 pages)
Product: Clip Factory MVP (link upload → highlights → captions export)
Target user: Podcasters, coaches, and small brands who record 20–120 minute videos and need consistent TikTok/Reels/Shorts output without hiring an editor.
Primary JTBD: “Turn one long video into 5–20 ready-to-post vertical clips in under 30 minutes of review time.”

MVP user story (happy path)
1. User pastes a YouTube link OR uploads an .mp4/.mov file.
2. System extracts audio and auto-transcribes.
3. System detects highlight segments and generates 5–20 candidate clips.
4. User selects a template (e.g., bold captions, speaker-left layout) and optionally edits clip start/end.
5. System exports 9:16 vertical video(s) with burned-in captions and downloadable caption files.

In-scope MVP features
A. Input
• YouTube URL ingestion (public videos) and file upload (single file).
• Basic metadata: title, duration, language.

B. Transcription
• Auto transcription with word-level timestamps.
• Basic punctuation + casing.

C. Highlights
• Auto-suggest segments (e.g., 15–60s), ranked.
• Each suggestion includes: title/hook suggestion, start/end times, confidence score.
• User can accept/reject and adjust boundaries.

D. Templates + export
• 2–3 fixed templates (minimal, bold, subtitle-only).
• Export 9:16 MP4 with burned-in captions.
• Export captions as .SRT and .VTT.
• Optional safe-area guides.

E. Delivery
• Download links + email notification when finished.
• Basic project page listing generated clips.

Non-goals (explicitly out of scope for MVP)
• Multi-user teams, roles/permissions.
• Full in-browser timeline editor.
• Auto b-roll insertion and stock library licensing.
• Auto posting/scheduling to TikTok/IG.
• Advanced brand kit (fonts/colors) beyond a few templates.

Acceptance criteria (MVP)
• Given a YouTube link or upload, the system produces a transcript and at least 5 highlight candidates for a 30–90 minute input.
• User can adjust segment boundaries and export a 9:16 MP4 with readable burned-in captions.
• Captions are time-synced within ±250ms for at least 90% of words (spot-checked on 3 test videos).
• Output files download reliably; user can export at least 10 clips in one project without manual intervention.

Key risks / mitigations
• Risk: Rendering pipeline complexity (FFmpeg edge cases). Mitigation: constrain templates, limit input formats, add preprocessing step, consider managed rendering.
• Risk: Highlight quality varies by niche. Mitigation: require human-in-loop selection; provide more candidates; add “style prompts” later.


2) Fastest build path (low-code) — recommended architecture
Principle: Bubble orchestrates workflow + UI; specialized services do transcription and rendering.

Recommended stack (fastest path)
• Frontend + auth + project UI: Bubble
• Storage: S3-compatible (or Bubble storage initially) + signed URLs
• Transcription: Whisper API (OpenAI) or equivalent with timestamps
• Highlight detection: lightweight LLM prompt + heuristics (topic shifts, high-salience statements) over transcript
• Rendering: FFmpeg (self-hosted worker) OR managed rendering API
• Queue/orchestration: Bubble backend workflows + webhook callbacks

Workflow outline
1) Ingest: user submits URL/upload → store asset → create job record.
2) Transcribe: call transcription API → store transcript + word timestamps.
3) Segment: run highlight detection → create candidate clips.
4) Review: user selects clips/template.
5) Render: enqueue render jobs → generate MP4 + SRT/VTT.
6) Deliver: notify user, provide downloads.


3) Build vs Buy decision (what to avoid building)
Transcription
• Buy: Whisper API / managed ASR. Rationale: accuracy + timestamps; fastest.
• Build: self-host ASR. Not recommended pre-PMF.

Highlight detection
• Buy: none is perfect; start with LLM + heuristics. Rationale: flexible, cheap to iterate.
• Build: custom ML model. Only after many labeled clips.

Rendering
Option A — Build (FFmpeg workers)
• Pros: control, lower unit cost at scale, flexible.
• Cons: devops complexity, template edge cases.

Option B — Buy (managed rendering API like Shotstack/Mux-style pipeline)
• Pros: fastest, fewer edge cases, less ops.
• Cons: higher unit cost; limits on templates.

Recommendation (post-$5k gate): start with managed rendering if it cuts time-to-first-version by >7 days. Switch to FFmpeg workers later if usage grows.

Storage/CDN
• Buy: S3 + CDN. Rationale: commodity.

Auth/billing
• Buy: Stripe via Bubble plugin. Rationale: standard.


4) Validate with paying clients: what features they’d pay $99–$299/mo for
Objective: identify top subscription drivers and reduce build risk.

Interview capture (per call)
Record:
• Current workflow (tools, time per episode, cost)
• Output targets (clips/week, platforms)
• Dealbreakers (brand constraints, accuracy needs)
• Willingness-to-pay and pricing model preference
• Must-have features vs nice-to-have

Feature candidates to test (and how to position)
A. Diarization (speaker detection) — “Auto label speakers and place them cleanly in split-screen.”
B. Brand voice hooks — “Generate 3 hook options per clip in your tone; pick and go.”
C. Niche templates — “Real estate coach / fitness coach / B2B podcast styles that match what’s working.”
D. Approval workflow — “Send clips to VA/client for approval.”
E. Auto b-roll cues — “Suggest b-roll keywords/timecodes; you or an editor can drop in quickly.”
F. Caption polish — “Filler removal, punctuation, emoji style (optional), readability tuning.”

Pricing hypothesis (validate)
• $99/mo: limited minutes + basic highlights + 2 templates + caption exports.
• $199/mo: more minutes + diarization + more templates + faster renders.
• $299/mo: brand kit + voice hooks + niche template packs + priority processing.

Quantifying WTP (simple method)
Ask for:
1) “At $99/mo would you buy today?” (Yes/No)
2) “At $199/mo would you buy today?” (Yes/No)
3) “At $299/mo would you buy today?” (Yes/No)
Then: “What feature would need to be included for you to say yes at the next tier?”

Prioritization scoring rubric (turn calls into a ranked backlog)
For each feature, score 1–5:
• Revenue impact (how many would pay more / churn reduction)
• Frequency of mention (how often it came up)
• Must-have strength (dealbreaker vs nice-to-have)
• Implementation complexity (reverse score: 5 = easy)
Compute: (Revenue + Frequency + MustHave + Ease) / 4. Top 3 ship first (post-gate).


5) Gated 2-week build plan (ONLY after $5k DFY collected)
Definition of “start”: $5,000 in DFY revenue collected and at least 5 interviews completed with scored results.

Week 1 (Foundations + first end-to-end run)
Day 1: Confirm stack decisions (render: managed vs FFmpeg). Lock 2–3 templates scope.
Acceptance: architecture decision recorded; template specs written.

Day 2–3: Bubble app scaffolding (auth, project model, upload/link input UI).
Acceptance: user can create project and submit link/upload; job record created.

Day 3–4: Transcription integration + transcript storage + basic transcript viewer.
Acceptance: transcript appears with timestamps for test video.

Day 5: Highlight detection v1 (LLM+heuristics) + candidate list UI.
Acceptance: at least 5 candidates generated on test asset; user can adjust start/end.

Week 2 (Rendering + export + reliability)
Day 6–7: Rendering pipeline integration (managed API or FFmpeg worker) + template 1.
Acceptance: export one 9:16 MP4 with burned-in captions.

Day 8: Template 2–3 + batch export.
Acceptance: export 5 clips in one project with chosen template.

Day 9: Caption exports (.SRT/.VTT) + download links.
Acceptance: SRT/VTT downloads match rendered captions.

Day 10: Hardening (format constraints, retries, error handling, basic limits).
Acceptance: clear error messages; failed job retries; timeouts handled.

Day 11–12: Beta onboarding + minimal usage analytics (projects created, exports).
Acceptance: internal beta with 3–5 users; issues logged.

Day 13–14: Bugfix sprint + “v0.1” release checklist.
Acceptance: passes acceptance criteria; ready for paid beta cohort.

Launch constraints (to keep scope tight)
• Limit max input length initially (e.g., 90 minutes) and max exports per project.
• Limit templates to 2–3 fixed designs.
• Require human selection of highlights (no fully automatic posting promises).

Stop conditions (do not proceed)
If interviews show <20% “yes” at $99/mo and no clear feature that flips them to “yes,” pause build and continue DFY + repositioning instead of shipping a SaaS nobody buys.
