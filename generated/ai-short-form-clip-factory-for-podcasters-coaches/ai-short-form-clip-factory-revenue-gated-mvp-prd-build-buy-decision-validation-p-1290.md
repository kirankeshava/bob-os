# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Validation Plan + 2-Week Gated Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:36:42.866Z

---

# AI Short-Form Clip Factory (SaaS) — MVP PRD (Revenue-Gated)

**Revenue gate (non-negotiable):** Do **not** start building the SaaS MVP until **$5,000 in DFY (done-for-you) clip sales is collected**. Until then, this document is for scoping, selling DFY, and running paid-signal validation.

## 1) Problem + Target User
**Target users:** podcasters, coaches, course creators, small agencies managing creator accounts.

**Job-to-be-done:** “Turn a long recording into multiple ready-to-post vertical clips consistently without hiring an editor.”

**Pain today:** editing time, inconsistent output, no packaging (hooks/captions), and creator fatigue. They will pay to avoid the workflow complexity.

## 2) MVP User Story (Scope)
**Primary user story:**
1) User pastes a **YouTube link** (or uploads a video/audio file).
2) System **downloads/ingests** media.
3) System runs **transcription**.
4) System **detects highlight segments** (candidate clips).
5) User reviews candidates, chooses a **template** (caption style, safe zones, font, brand colors).
6) System renders **9:16 vertical video** (option: crop/smart center), burns in **captions**, and exports.
7) User downloads assets (MP4 + SRT/VTT + copy suggestions).

**Explicit MVP outputs:**
- 3–10 clip candidates per input (configurable)
- Each candidate includes: timestamps, title/hook suggestion, confidence score
- Export formats: TikTok/Reels (9:16 MP4), captions burned-in + SRT

**Out of scope (for MVP):** automated posting/scheduling, team collaboration, advanced brand kits beyond basic template variables, multilingual, full media library, advanced analytics.

## 3) MVP Acceptance Criteria (What “Done” Means)
A. **Ingest**
- Paste a YouTube URL and system reliably ingests the media.
- Upload option supports common formats (MP4, MOV, MP3) up to a defined limit.

B. **Transcription**
- Transcript is generated and viewable; timestamps align to audio.
- Captions export as SRT.

C. **Highlight detection**
- System produces a list of candidate segments with start/end timestamps.
- User can trim a segment and re-render.

D. **Template + export**
- At least **2 templates** (e.g., “Podcast Clean” + “Bold Hook”) with font, size, stroke, placement.
- Rendered output is 9:16 with burned-in captions.

E. **Performance**
- For a 30–60 min input, first results (candidates) appear within a practical time window (set expectation; e.g., <30 min on MVP). Display queue/processing status.

## 4) Fastest Build Path (No-code/Low-code)
### Recommended fastest-path architecture (post-revenue gate)
- **Frontend + workflow:** Bubble
- **Transcription:** OpenAI Whisper API (or similar)
- **Rendering:** FFmpeg in a server environment OR managed rendering provider
- **Storage:** S3-compatible storage (or a managed storage add-on)

**How it works:**
Bubble handles auth, billing, UI, and job orchestration. A backend worker handles heavy tasks:
1) Fetch YouTube/download media
2) Run transcription
3) Highlight segmentation logic
4) Render 9:16 + captions using FFmpeg (or call managed render)
5) Return download links to Bubble

## 5) Build vs Buy Decision (Key Components)
**Transcription**
- **Buy:** Whisper API (fastest). Pros: high quality, minimal infra. Cons: per-minute cost.
- **Build:** self-host Whisper. Pros: lower long-run cost; Cons: ops complexity.

**Highlight detection**
- **Build (MVP):** heuristics + LLM prompts on transcript chunks (find high-energy/insight segments). Pros: fast iteration. Cons: needs tuning.
- **Buy:** specialized “clip detection” APIs. Pros: speed; Cons: less control, variable quality.

**Rendering**
- **Build:** FFmpeg pipeline. Pros: control, cost; Cons: infra complexity, edge cases.
- **Buy:** Shotstack / similar. Pros: fastest to ship; Cons: ongoing cost, vendor limits.

**Recommendation for MVP (after $5k gate):**
- Buy transcription (Whisper API)
- Build highlight detection (prompted LLM + rules)
- Start with **managed rendering** if speed matters most; switch to FFmpeg when volume/COGS justifies.

## 6) What Customers Will Pay $99–$299/mo For (Hypotheses)
Price anchors depend on volume (clips/week), speed, and brand controls.

**$99/mo (Creator Starter):**
- 4 long uploads/mo
- 40 clip candidates/mo
- 20 exports/mo
- Basic templates, captions, 9:16

**$199/mo (Pro):**
- 8 uploads/mo
- 100 candidates/mo
- 60 exports/mo
- Brand kit (colors/fonts), hook suggestions, faster processing

**$299/mo (Studio):**
- 20 uploads/mo
- 300 candidates/mo
- 150 exports/mo
- Speaker diarization, multiple brand presets, team seats

**Features to validate for paid pull:**
- **Speaker diarization** (host vs guest captions)
- **Brand voice hooks** (hook generator trained on their style)
- **Niche templates** (real estate, fitness, business coaching, therapy)
- **Auto b-roll cues** (on-screen prompts like “cut to screenshot,” “insert chart”) and shot list
- **Batch processing** + consistent weekly output

## 7) Validation With Paying Clients (10-Interview Plan)
Goal: confirm which 3–5 capabilities unlock willingness-to-pay and reduce churn.

**Interview targets:**
- 4 podcasters (video podcasts)
- 4 coaches (YouTube + IG)
- 2 small agencies

**Core questions (paid-signal):**
1) How many long videos per week? How many clips needed?
2) What’s your current workflow? Who edits today? Cost/time?
3) What makes a clip “post-ready” for you (captions style, hook, branding)?
4) Would you pay **$99/$199/$299** per month if it reliably delivered X clips/week? Which tier feels right?
5) Dealbreakers: accuracy, diarization, brand, speed, manual control?
6) If we offered a DFY pilot first, what outcome would make you renew?

**Scoring rubric (per feature):**
- Willingness-to-pay impact (1–5)
- Frequency of use (1–5)
- Churn prevention (1–5)
- Implementation complexity (1–5, reversed)

## 8) Outreach Templates (Reference Website + Email)
Use for booking interviews / DFY pilots (distribution-adjacent).

**Cold email (short):**
Subject: Turn 1 episode into 10 vertical clips (done-for-you)

Hey {{Name}} — I run Clip Factory.
We turn long podcasts/videos into ready-to-post TikTok/Reels clips: hooks + captions + 9:16 formatting.

Proof/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

If you send 1 episode link, I’ll reply with 3 sample clip candidates (timestamps + hook ideas). If you like them, we can do a weekly clip pack.

Reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob

**LinkedIn DM:**
Hey {{Name}} — quick one. We turn long podcasts/coaching videos into ready-to-post vertical clips (hooks + captions). Here’s our page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
If you share 1 episode, I’ll send back 3 clip candidates (timestamps + hook suggestions). If it’s useful, we can set up a weekly clip pack. Email: agent_bob_replit+clip-factory@agentmail.to

## 9) 2-Week Build Plan (GATED — Start Only After $5k DFY Collected)
**Sprint goal:** working MVP from link/upload to exported 9:16 captioned clips.

### Week 1 — Core pipeline + UI skeleton
**Day 1–2:** Bubble app skeleton
- Auth, job creation screen, status page
- Acceptance: user can submit a YouTube link and see “processing” status.

**Day 3–4:** Transcription integration
- Whisper API call + transcript storage
- Acceptance: transcript view + SRT export available for a job.

**Day 5:** Highlight candidate generation
- Simple segmentation (rules + LLM summarization)
- Acceptance: list of 5–10 candidate segments w/ timestamps.

### Week 2 — Template rendering + export
**Day 6–8:** Rendering pipeline
- Choose managed rendering or FFmpeg worker
- Acceptance: render one selected segment into 9:16 with burned-in captions.

**Day 9–10:** Templates + basic editor
- 2 templates, trim controls, re-render
- Acceptance: user can switch template and re-export successfully.

**Day 11–12:** Reliability + queue + error handling
- Retries, progress indicators
- Acceptance: failed jobs show reason + allow retry.

**Day 13–14:** Polish + internal QA
- Mobile-safe caption positioning
- Acceptance: 10 test uploads render correctly; downloads stable.

## 10) Key Risks / Unknowns (To Validate via DFY First)
- Highlight quality (what “good” means differs by niche)
- Rendering costs/latency at scale
- Diarization value vs complexity
- Creators’ willingness to accept “AI-first” clips without human polish

**Next action (pre-build):** run DFY pilots and 10 interviews; only then lock MVP scope and begin Sprint Week 1.
