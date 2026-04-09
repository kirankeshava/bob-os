# DFY Clip Factory Runbook Addendum — Intake Form Build + Clip Tracker Sheet + Fast Feedback One-Pager

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:32:53.200Z

---

Below are the finalized, copy-ready assets to operationalize the DFY Clip Factory into a 48-hour fulfillment machine. These are designed to reduce back-and-forth, constrain scope, and make client inputs unambiguous.

A) TALLY INTAKE FORM (FREE TIER) — FIELD-BY-FIELD BUILD
Form title: “DFY Clip Factory — 10 Clips / 48 Hours Intake”
Subheader: “This form takes ~4 minutes. After submission, you’ll receive an email from agent_bob_replit+clip-factory@agentmail.to with next steps. Website (proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

1) Contact
- Full name (Short text) [Required]
- Email (Email) [Required]
- Brand/Business name (Short text) [Required]
- Role (Dropdown): Host / Producer / Marketing / Other [Required]

2) Content Source (choose one primary)
- Source type (Multiple choice) [Required]: YouTube link / Podcast audio (MP3/WAV) / Google Drive folder / Dropbox / Other
- Primary content link (URL) [Required]
- Backup link (URL) [Optional]
- Episode title (Short text) [Required]
- Episode length (Number, minutes) [Optional]

3) Targets + Goals
- Primary platform (Multiple choice) [Required]: TikTok / Instagram Reels / YouTube Shorts
- Also publish to (Checkboxes) [Optional]: TikTok / IG / YT
- Goal (Multiple choice) [Required]: Leads / Followers / Authority / Sales / Event/Webinar / Other
- CTA destination (URL) [Optional]: website / booking link / lead magnet

4) Audience + Topics
- Who is this for? (Long text) [Required]
- Topics to emphasize (Long text) [Optional]
- Topics to avoid (Long text) [Optional]

5) Style Preset (pick one) + Brand Kit
- Choose your default style (Multiple choice) [Required]: Real Estate / Fitness / B2B / Use my brand kit
- Brand colors (Short text) [Optional] (hex codes if known)
- Brand font (Short text) [Optional]
- Logo file link (URL) [Optional]
- Example clips you like (URLs) (Long text) [Optional]

6) Speaker + Formatting
- Main speaker name(s) (Short text) [Optional]
- Multiple speakers? (Yes/No) [Required]
- If yes: identify speakers? (Multiple choice): We can ignore / I will provide speaker map / Use best effort diarization [Required]
- On-screen captions (Multiple choice) [Required]: Burned-in / Provide SRT too / Both

7) Compliance + Safety
- Do not use these words/topics (Long text) [Optional]
- Required disclaimer text (Long text) [Optional]

8) Delivery + Review
- Preferred delivery (Multiple choice) [Required]: Google Drive / Frame.io / Either
- Deadline constraints (Long text) [Optional]

9) SLA + Revision Agreement (Required checkbox)
Checkbox label: “I understand the standard delivery is 10 clips within 48 hours of receiving usable source content + brand assets. Includes 1 revision round (timed feedback window). Additional revisions are out of scope unless agreed.”

Final screen message:
“Submission received. Next: you’ll get a confirmation email from agent_bob_replit+clip-factory@agentmail.to within 1 business hour with your upload/review folder and the 48-hour timeline.”


B) GOOGLE SHEETS CLIP TRACKER — COLUMNS + STATUS RULES
Sheet name: “Clip Factory — Tracker”
Tabs: (1) Intake Queue, (2) In Production, (3) Delivered

Columns (use same across tabs):
1. Client
2. Episode ID (Format: CLT-ClientSlug-YYYYMMDD-EP##)
3. Source Link
4. Platform Target (TT/IG/YT)
5. Style Preset (RE/FIT/B2B/Custom)
6. Clip # (01–10)
7. Hook (draft text)
8. Timestamp Start
9. Timestamp End
10. Status (Dropdown): INTAKE / DOWNLOADING / TRANSCRIBING / SELECTING / EDITING / CAPTIONS / QA / SENT_FOR_REVIEW / REVISION / APPROVED / DELIVERED / BLOCKED
11. Owner (Dropdown): Producer / Editor / QA
12. QA Score (0–10)
13. Issues (Short text)
14. Review Link (Frame.io/Drive)
15. Export Link (Drive folder)
16. Delivered Date/Time
17. SLA Deadline (Auto: intake timestamp + 48h)
18. Client Feedback Received (Y/N)
19. Revision Notes

Rules:
- Anything marked BLOCKED must have Issues filled + an assigned Owner.
- SENT_FOR_REVIEW requires Review Link.
- DELIVERED requires Export Link + Delivered Date/Time.


C) CLIENT ONE-PAGER: “HOW TO GIVE FEEDBACK FAST (SO WE STILL HIT 48 HOURS)”
Title: How to Give Feedback Fast (So We Still Hit 48 Hours)
From: Clip Factory (agent_bob_replit+clip-factory@agentmail.to)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

Why this matters
We deliver 10 short-form clips in 48 hours. The only way this stays true is if feedback is specific, centralized, and time-boxed.

Where to leave feedback
1) Use the provided Frame.io link (preferred) or comment directly inside the Google Drive file.
2) Please do not split feedback across email + DMs + multiple docs.

What good feedback looks like (examples you can copy)
- “Clip 03: Replace opening line with: ‘Most people lose money on X because…’ Keep the rest.”
- “Clip 07: Remove the last 2 seconds; end on the phrase ‘…and that’s the key.’”
- “Clip 02: Captions are too low; move them up ~10%.”
- “All clips: Replace CTA end card with ‘Book a consult: mysite.com’.”

What slows everything down
- “Make it more viral” (not actionable)
- “Try a different vibe” without examples
- Feedback arriving in multiple batches over multiple days

Our revision window (to protect SLA)
- You get 1 revision round.
- Please send all notes in a single batch within 12 hours of receiving the review link.
- If feedback arrives after the window, delivery timing may shift because the project is no longer in the active 48-hour lane.

If you’re unsure what to request
Tell us ONE of these:
- ‘More educational’ (we’ll prioritize tips/steps)
- ‘More controversial’ (we’ll prioritize counterintuitive takes)
- ‘More lead-gen’ (we’ll prioritize CTA clarity + problem/solution framing)

Thank you. This process is how we stay fast, consistent, and reliable.
