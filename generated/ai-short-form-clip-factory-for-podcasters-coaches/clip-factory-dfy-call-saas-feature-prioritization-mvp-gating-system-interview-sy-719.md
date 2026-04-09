# Clip Factory — DFY Call → SaaS Feature Prioritization & MVP Gating System (Interview Synthesis + Scoring + PRD Update Rules)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** template
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:23:58.497Z

---

Purpose
This system turns DFY sales/discovery calls into a quantified SaaS roadmap for the “AI Short‑Form Clip Factory,” while strictly respecting the revenue gate: do not build the SaaS MVP until $5k in DFY clip-package revenue is collected.

Reference links to use in customer comms
- Website (legitimacy proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

A) Interview synthesis template (fill one per call)
Copy/paste into a doc or CRM note.

1) Prospect info
- Name / Role / Company:
- Creator type: (podcast, coach, agency, small brand)
- Monthly long-form outputs: (# episodes/videos)
- Current short-form cadence: (# clips/week)
- Platforms: (TikTok / IG Reels / YT Shorts / LinkedIn)
- Current workflow: (in-house, contractor editor, self)
- Current spend: ($/mo editing tools + editors)

2) Trigger & pain (use their words)
- “What made you look for help now?”
- Top 3 pains (ranked):
  1.
  2.
  3.
- Consequence if nothing changes (missed leads, inconsistent posting, time cost):

3) DFY offer outcome (revenue first)
- What DFY package was offered? (Starter / Growth / Pro)
- Objections raised:
- Outcome: (won / lost / follow-up)
- If won: price and start date:

4) SaaS willingness-to-pay probe ($99–$299/mo)
Ask after DFY discussion: “If this were self-serve software that reliably outputs ready-to-post clips, what would you pay monthly?”
- Price anchor response (choose one):
  - <$99
  - $99
  - $149
  - $199
  - $299+
- شرط/condition: “I’d pay $X if it does ___ reliably.” (quote)
- Deal-breakers for SaaS (must have):

5) Feature requests (raw list)
List every requested capability verbatim; don’t translate yet.
- 
- 
- 

6) Must/Sho uld/Could/Won’t (MoSCoW)
- Must:
- Should:
- Could:
- Won’t (or “not needed”):

7) Evidence notes
- Time saved estimate (hrs/week):
- Quality bar: “good enough” definition:
- Trust requirements: (accuracy %, caption style, brand voice)

B) Feature scoring rubric (fill for top 5 features mentioned)
Score each feature 1–5 in each category.

Feature: ______________________
1) Revenue impact (1–5): does it increase willingness-to-pay or reduce churn?
2) Deal impact (1–5): did it materially affect closing DFY today?
3) Frequency (1–5): how often they need it (every clip vs occasionally)
4) Urgency (1–5): do they need it now or “nice later”?
5) Complexity (1–5): engineering effort (5 = hardest)

Compute:
- Weighted Demand Score = (Revenue impact x2) + Deal impact + Frequency + Urgency
- Priority Index = Weighted Demand Score – Complexity

Interpretation:
- Priority Index ≥ 10: candidate for MVP or v1 subscription differentiator
- Priority Index 6–9: backlog for post-MVP
- Priority Index ≤ 5: deprioritize unless it becomes a repeated deal-breaker

C) What features commonly map to $99–$299/mo (hypotheses to validate)
Use these as “cards” during calls; only promote to roadmap if scoring supports it.
- $99/mo: link upload, transcript, highlight suggestions, basic captions export, 1–2 templates
- $149/mo: brand kit (fonts/colors), caption styles, hook suggestions, batch processing
- $199/mo: speaker diarization, auto “viral hook” variants, niche templates (real estate/fitness/coaching), b-roll cues
- $299/mo: team workspaces, approval workflow, multi-brand management (agencies), API/Zapier, advanced analytics

D) Build-vs-buy decision update checklist (run only after 5–10 paid DFY clients)
Goal: prevent building the wrong thing; choose simplest path that matches validated demand.
1) Rendering
- If clients demand pixel-perfect templates + fast turnaround: consider managed rendering (Shotstack/Mux-type) instead of custom FFmpeg.
- If basic captions + vertical crop is sufficient: FFmpeg pipeline may be enough.
2) Transcription
- If they require high accuracy across accents/noisy audio: Whisper API vs vendor comparison.
- If diarization is a top Priority Index item: choose a provider/approach that supports diarization well.
3) Highlight detection
- If buyers want “AI picks best moments” and judge you on quality: consider LLM-based segment ranking + manual override UI.
- If they accept “suggestions + human selects”: keep it simple; build selection UI first.
4) Storage/CDN
- If agencies upload lots of large files: choose scalable object storage + signed URLs.
5) Templates
- If “brand look” is the differentiator: invest early in a template system; otherwise keep 2–3 fixed layouts.

E) PRD refresh protocol (do not change scope without evidence)
Rules:
1) No MVP build work until: (a) $5,000 DFY revenue collected AND (b) at least 5 synthesis entries completed.
2) Only add a feature to MVP if:
- It appears as “Must” in ≥ 3 calls OR it has Priority Index ≥ 10 AND directly supports the core user story: link/upload → highlights → captions export → 9:16.
3) Only commit to a $99–$299/mo tier if:
- At least 3 prospects independently name a price in that range (or higher) AND describe a concrete condition for paying.
4) Every new feature added must specify:
- Acceptance criteria (observable output)
- Failure mode (what happens when AI is wrong)
- Manual override path (how user fixes it)

F) Weekly roll-up (one table)
At end of week, create a simple tally:
- Count of calls
- Count willing to pay: <$99 / $99 / $149 / $199 / $299+
- Top 10 requested features by frequency
- Top 5 features by Priority Index
- Top 5 objections preventing DFY close (use to fix offer/positioning)

If you follow this system, you’ll have a defensible, revenue-backed SaaS MVP scope ready to execute the moment the $5k gate is met—without wasting cycles building prematurely.