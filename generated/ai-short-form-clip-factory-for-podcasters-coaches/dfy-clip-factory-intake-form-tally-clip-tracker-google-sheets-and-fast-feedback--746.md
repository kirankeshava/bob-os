# DFY Clip Factory — Intake Form (Tally), Clip Tracker (Google Sheets), and Fast Feedback One-Pager

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:03:46.304Z

---

# 1) Client Intake Form (Tally.so) — Copy-Ready Structure

**Form Title:** Clip Factory Intake — 10 Vertical Clips in 48 Hours

**Intro (top of form):**
Thanks for choosing Clip Factory. We turn your long-form video/podcast into **10 ready-to-post vertical clips within 48 hours**.

For legitimacy + contact:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Email: agent_bob_replit+clip-factory@agentmail.to

**A. Contact + Brand**
1. Full name
2. Email (where we should send delivery + questions)
3. Brand / Channel name
4. Time zone
5. Best place for quick clarifications (email only / IG DM / Slack / other)

**B. Source Episode / Long-Form Asset**
6. Provide the source link(s): (YouTube / Drive / Dropbox / Riverside / Descript / other)
7. If file upload is required, paste Drive/Dropbox link with download permissions
8. Episode title + publish date
9. Length of episode (minutes)
10. Are there multiple speakers?
   - Yes (2+) / No (solo)
11. Any sections to avoid? (timestamps or topics)

**C. Goals + Audience + Offer**
12. Primary goal for these clips (choose one):
   - Leads / Book calls
   - Views / reach
   - Authority / education
   - Podcast listens
   - Newsletter signups
13. Audience (1–2 sentences)
14. What do you want viewers to do next? (CTA)
   - Follow
   - Comment keyword
   - Visit link in bio
   - Book call
   - Subscribe
   - Other
15. CTA link (if any)

**D. Platforms + Deliverables**
16. Platforms you will post to:
   - TikTok
   - Instagram Reels
   - YouTube Shorts
17. Handle(s) (optional)
18. Do you want platform-specific exports?
   - Yes (separate exports per platform)
   - No (one universal 9:16 export)

**E. Style Preset (Pick One)**
19. Choose your default style preset:
   - Real Estate (clean, premium, local authority)
   - Fitness (high energy, bold, punchy)
   - B2B (minimal, credible, modern)
20. Caption preference:
   - Karaoke highlight (word-by-word)
   - Phrase-by-phrase
   - Minimal subtitles
21. Any brand assets? (logo, fonts, colors)
   - Paste Drive link
22. If no brand kit, choose a primary color: (hex optional)

**F. Hook Angles + Topic Priorities**
23. Provide up to 5 “must-clip” moments (timestamps + why)
24. Provide 3 hook angles you like (examples):
   - “Stop doing X…”
   - “Nobody tells you…”
   - “I used to think… until…”
25. Competitors/creators you like (links)

**G. Compliance / Safety**
26. Any claims we must avoid? (medical, financial, housing, legal)
27. Do you require on-screen disclaimers?
28. Words/topics to bleep/remove

**H. Delivery + Review**
29. Where should we deliver?
   - Google Drive
   - Frame.io
30. Reviewer email(s) for access
31. Confirmation checkbox:
   - “I confirm I have rights to this content and approve Clip Factory to edit it for the requested platforms.”

**Final Thank You Screen (after submit):**
You’re set. We’ll confirm receipt within 4 business hours.
Standard delivery: **10 clips within 48 hours** from intake + asset access.
Questions: agent_bob_replit+clip-factory@agentmail.to

**Internal note (not shown to client):** Once the form is created, paste its share URL into the onboarding doc + delivery email template as: **[INTAKE_FORM_URL]**.

---

# 2) Clip Tracking Sheet (Google Sheets) — Build Spec (Tabs + Columns)

**Sheet name:** Clip Factory — Tracker

## Tab A: “Queue (All Clips)”
Create these columns in row 1:
1. Client Name
2. Client Email
3. Project ID (e.g., CF-YYYYMMDD-CLIENT)
4. Episode / Asset Name
5. Source Link
6. Platform(s) (TikTok/IG/YTS)
7. Style Preset (Real Estate/Fitness/B2B/Custom)
8. Clip # (01–10)
9. Clip Title (internal)
10. Hook Text (first line)
11. Timestamp In
12. Timestamp Out
13. Duration (sec)
14. Status (data validation dropdown):
   - Intake Received
   - Downloading/Transcoding
   - Auto-Select Draft
   - Edit in Progress
   - Captions Styled
   - B-Roll Cues Added
   - QA Passed
   - Sent to Client Review
   - Revision Requested
   - Final Delivered
15. Editor Owner
16. QA Owner
17. Due Date/Time (SLA)
18. Delivered Date/Time
19. Revision Count (0/1/2)
20. Client Notes / Feedback
21. Delivery Link (Drive/Frame.io URL)
22. Final Export Filename

**Conditional formatting:**
- If Status ≠ “Final Delivered” and NOW() > Due Date/Time: highlight row red.

## Tab B: “Projects (Episodes)”
Columns:
- Project ID
- Client Name
- Asset Link
- Intake Submitted (timestamp)
- SLA Start (timestamp)
- SLA Deadline (timestamp)
- Delivery Method (Drive/Frame.io)
- Folder Link
- Notes

## Tab C: “QA Scorecard (per clip)”
Columns:
- Project ID
- Clip #
- Pass/Fail
- Hook in first 1.5s (Y/N)
- Captions readable on mobile (Y/N)
- No long silences (Y/N)
- Pattern interrupts every 2–3s (Y/N)
- CTA end card present (Y/N)
- Safe margins (Y/N)
- Audio levels consistent (Y/N)
- Spelling/names correct (Y/N)
- Notes

**Internal note:** Once the sheet is created, paste its URL into internal ops docs as **[CLIP_TRACKER_URL]**.

---

# 3) Client One-Pager — “How to Give Feedback Fast (So We Still Hit 48 Hours)”

**Title:** How to Give Feedback Fast (So We Still Hit 48 Hours)

To keep your delivery on schedule, we need **fast, specific feedback**. Here’s the exact way to review clips so revisions don’t drag.

## Where you’ll review
We deliver via **Google Drive or Frame.io** (whichever you chose in intake). You’ll receive a folder/link by email from:
**agent_bob_replit+clip-factory@agentmail.to**

Business reference:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

## What to check (in this order)
1) **Hook:** Is the first 1–2 seconds compelling?
2) **Clarity:** Do captions match what’s said and stay readable?
3) **Pacing:** Does it feel tight (no dead space)?
4) **Accuracy:** Names, numbers, claims, and compliance.
5) **CTA:** Is the final prompt correct (follow/comment/book/etc.)?

## How to leave feedback (best format)
For each clip, reply with:
- **Clip filename** (or Clip #)
- **Timestamp** (e.g., 0:07)
- **Exact change request**

Examples:
- “Clip 03 — at 0:02 change caption to: ‘Stop doing this when buying a house.’”
- “Clip 07 — remove the word ‘guarantee’ and replace with ‘aim’.”
- “Clip 10 — swap end card CTA to ‘Comment ‘PLAYBOOK’ for the checklist’.”

## What counts as a ‘revision’
A revision is adjustments to the **same selected moment**:
- caption wording, emojis, spelling
- small trims (±1–2 seconds)
- CTA end card text
- removing/bleeping a word

## What slows delivery (avoid if possible)
These are effectively new edits and can push timelines:
- choosing completely different timestamps for multiple clips
- requesting a brand-new style/look after edits are done
- sending feedback in multiple scattered messages over many hours

## Feedback deadline
To protect the 48-hour promise, please send feedback within **12 hours** of review link delivery. If we don’t hear back, we’ll proceed with the best-judgment finalization based on the approved style preset.

## Need something urgent?
Email: **agent_bob_replit+clip-factory@agentmail.to**
Include: Project ID + Clip # + what changed.
