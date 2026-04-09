# DFY Clip Factory — Fast Feedback One-Pager + Intake Form Spec + Clip Tracker Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:35:10.277Z

---

# 1) Client One-Pager: How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory (DFY) — Feedback Guidelines**  
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
Support/Delivery Email: agent_bob_replit+clip-factory@agentmail.to

## The goal
To deliver **10 ready-to-post vertical clips within 48 hours**, we need **fast, specific feedback**. The easiest way to keep turnaround fast is to avoid subjective notes (“make it pop”) and instead give *timestamped, single-decision* feedback.

## When to send feedback
**Deadline:** Please send feedback within **12 hours** of receiving the first batch / review link.  
If feedback arrives after 12 hours, delivery may shift because we timebox revisions to protect the 48-hour SLA.

## What kind of feedback works best (copy/paste format)
Use this format for each clip:

**Clip:** CF_[YourBrand]_[Episode]_[Clip#]  
**Timecode:** 00:03–00:07  
**Change request:** Replace caption line with: “_____”  
**Keep / Remove:** Keep b-roll / Remove b-roll  
**CTA:** Use CTA end card A / Change to “_____”

Examples of high-signal feedback:
- “00:00–00:01 hook: change to ‘3 mistakes keeping you from closing deals’”
- “00:06 remove the word ‘actually’ from captions”
- “Swap b-roll at 00:08 to ‘house exterior’”
- “Replace CTA end card text with ‘DM ‘LISTING’ for the checklist’”

## What to prioritize (ranked)
1. **Hook wording (first 1.5 seconds)** — strongest impact.
2. **On-screen captions accuracy** — names, numbers, key claims.
3. **B-roll/cutaways** — only if they change meaning or compliance.
4. **Stylistic preferences** — font, emoji, animation; we’ll keep consistent with your chosen preset.

## What counts as a revision (to keep scope bounded)
Included in the standard delivery:
- Fixing caption errors/typos
- Swapping hook text once per clip
- Minor trim changes (tighten pauses)
- Replacing CTA copy

Not included (requires new quote / resets timeline):
- Recutting entirely different moments from the episode
- Major content rewrites across many clips
- New motion design package or custom brand animation build

## How to leave comments (fastest)
- If using Frame.io: comment directly on the clip with timecode notes.
- If using Google Drive: comment on the file + include timecodes.
- If emailing: paste feedback in the format above.

## If you’re not sure what you want
Answer these 2 questions and we’ll decide:
1) “Do you want this clip to feel **more authoritative** or **more energetic**?”  
2) “Should the CTA drive **follow**, **DM**, or **link click**?”

---

# 2) Intake Form Spec (Free Tally.so or Google Forms) — “Clip Factory Intake (10 clips / 48 hours)”

**Form title:** Clip Factory Intake — 10 Vertical Clips in 48 Hours  
**Form description:** Fill this out once per episode. Delivery + questions: agent_bob_replit+clip-factory@agentmail.to  
**Required fields marked (Required).**

## Section A — Contact + Project
1. Full Name (Required)
2. Brand/Company Name (Required)
3. Email for delivery + review invites (Required)
4. Time zone (Required)
5. Best contact method (Dropdown): Email / WhatsApp / Slack
6. If WhatsApp/Slack, handle/link (Short answer)

## Section B — Source Content
7. Source type (Dropdown, Required): YouTube / Podcast audio / Zoom recording / Uploaded file / Other
8. Source link (URL) OR file share link (Required)
9. Episode title/name (Required)
10. Episode length (Short answer, e.g., 52 min) (Required)
11. Speaker count (Dropdown, Required): 1 / 2 / 3+
12. Speaker names + roles (Short paragraph) (Required if speaker count >1)

## Section C — Clip Goals + Audience
13. Primary niche (Dropdown, Required): Real Estate / Fitness / B2B / Other
14. Target audience (Short paragraph, Required)
15. Primary goal (Dropdown, Required): Leads / Followers / Book calls / Sell offer / Authority
16. Offer/CTA destination (Short answer): “DM keyword”, booking link, website, etc. (Required)
17. Any banned words/claims (Short paragraph) (Optional)

## Section D — Style + Platform Formatting
18. Platforms needed (Checkboxes, Required): TikTok / IG Reels / YouTube Shorts
19. Preferred style preset (Dropdown, Required): Real Estate / Fitness / B2B
20. Brand colors (Short answer, Optional) (hex codes if possible)
21. Brand font(s) (Short answer, Optional)
22. Logo upload link (URL, Optional)
23. Caption preferences (Checkboxes): Clean / High-contrast / Emoji-light / Emoji-none

## Section E — Content Selection Guidance
24. Must-include topics or moments (Short paragraph) (Optional)
25. Must-avoid topics or moments (Short paragraph) (Optional)
26. Tone preference (Dropdown): Professional / Energetic / Calm / Punchy
27. Competitors or references (URL list) (Optional)

## Section F — Delivery + Review
28. Delivery preference (Dropdown, Required): Frame.io review link / Google Drive folder
29. Deadline constraints (Short answer, Optional)
30. Approver name + email (if different) (Short answer, Optional)

## Section G — Agreement (Required)
31. Checkbox (Required): “I confirm I own/authorized this content for editing and distribution.”
32. Checkbox (Required): “I understand 1 revision round is included and feedback is needed within 12 hours to maintain the 48-hour SLA.”

**Confirmation message:**
“Thanks — your intake is received. If your source link is accessible, production begins immediately. You’ll receive a review link and the first batch as soon as they’re ready. Questions: agent_bob_replit+clip-factory@agentmail.to | Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

---

# 3) Google Sheets Clip Tracker Spec (Free) — Build Instructions

**Sheet name:** ClipFactory_Tracker_Master  
**Tabs:** (1) Episodes (2) Clips (3) QA (optional) (4) Dropdowns

## Tab: Dropdowns
Create lists for data validation:
- Status: Not Started, Downloading, Transcribing, Selecting, Editing, Captions, QA, Client Review, Revisions, Approved, Delivered
- Platform: TikTok, IG Reels, YT Shorts
- Style Preset: Real Estate, Fitness, B2B
- Priority: High, Medium, Low

## Tab: Episodes (one row per episode)
Columns:
- Client
- Episode ID (e.g., EP001)
- Episode Title
- Source Link
- Received (date/time)
- SLA Deadline (auto = Received + 48h)
- Delivery Method (Frame.io / Drive)
- Style Preset
- Editor Owner
- Status (dropdown)
- Notes

## Tab: Clips (one row per clip)
Columns:
- Client
- Episode ID
- Clip # (01–10)
- Clip Filename (auto concatenate: Client_EpisodeID_C##)
- Hook Text
- Start TC
- End TC
- Platform(s)
- Status (dropdown)
- QA Score (0–10)
- QA Pass? (Y/N)
- Review Link
- Client Notes (short)
- Revision Count (number)
- Final Export Link
- Delivered? (checkbox)

## Tab: QA (optional detail)
Columns (checkboxes):
- Hook in first 1.5s
- Captions accurate
- Safe margins OK
- No cutoff words
- Audio levels OK
- CTA end card present
- Export settings correct
- Filename correct

## Conditional formatting
- Episodes: SLA Deadline within 12h = orange; overdue = red.
- Clips: Status “Client Review” older than 12h (requires a timestamp column if desired) = orange.
- Clips: QA Pass = N = red.

## Minimum operating rule
To hit 10 clips/48h: keep **WIP (work in progress) <= 20 clips** per editor at any moment. If WIP exceeds 20, pause new intakes or split episodes across editors.
