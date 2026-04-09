# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Spec + Clip Tracker Sheet Spec (Copy-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:22:36.044Z

---

# 1) Client One-Pager: How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory** turns your long-form video/podcast into **10 ready-to-post vertical clips within 48 hours**. Fast delivery depends on fast, clear feedback.

If you ever need us, contact: **agent_bob_replit+clip-factory@agentmail.to**
Proof/website: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3**

## The 10-minute feedback method (do this for each clip)
When you review clips, please send feedback in this exact format:

**CLIP ID:** (example: `C03`)
1) **KEEP / CUT:** (keep as-is OR cut this clip entirely)
2) **1 change max (if needed):** (example: “Change first caption line to: …”) 
3) **Brand/compliance note (if any):** (example: “Remove competitor name”)
4) **Hook rating:** (1–5) and optional note (example: “Hook needs stronger first line”)

This format allows us to apply changes quickly without re-editing the entire clip.

## What counts as “fast, actionable” feedback
Good:
- “C02: Change on-screen text at 00:01 to ‘Stop doing this on sales calls…’”
- “C07: Remove the word ‘guarantee’ from captions.”
- “C09: Replace CTA end card with ‘Book a consult’.”

Hard to action (slows turnaround):
- “Make it pop more.”
- “Feels off.”
- “Can you change the vibe?”

If you’re unsure, tell us **the goal** (e.g., “more controversy,” “more curiosity,” “more professional”), and we’ll propose one concrete change.

## Timing: when to send feedback
To keep the 48-hour SLA:
- **Send revision notes within 12 hours of receiving the first batch**.
- If we don’t hear back within 12 hours, we assume **approved** and deliver the final set.

## Revision boundaries (so we can stay fast)
- Included: **1 revision round** for up to **3 clips** (micro-edits: captions, hook line, trimming, censoring, CTA end card).
- Not included (new work): changing topic selection, totally new hooks across all clips, re-cutting into different angles after approval.

## The “pick 3” rule (best results with minimal time)
If you want improvements but can’t review all 10 deeply, pick **3 clips** and tell us:
- Which one is best and why
- Which one is worst and why
- One brand preference (caption size, emoji/no emoji, more/less b-roll)

We’ll apply the pattern to the remaining clips.

---

# 2) Tally Intake Form — Build Spec (Free Tier, Copy/Paste)

**Form title:** Clip Factory Intake — 10 Vertical Clips in 48 Hours

**Intro text (paste):**
“Welcome to Clip Factory. This form collects what we need to deliver **10 ready-to-post vertical clips within 48 hours**. If you have any issues, email **agent_bob_replit+clip-factory@agentmail.to**. Proof/website: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3**.”

## Section A — Contact + Brand
1. **Full name** (Short text) — Required
2. **Brand / Company name** (Short text) — Required
3. **Email for delivery** (Email field) — Required
4. **Preferred communication** (Multiple choice) — Required
   - Email
   - Slack
   - WhatsApp
5. **Website + socials (links)** (Long text) — Optional

## Section B — Content source (what we’re clipping)
6. **Upload method** (Multiple choice) — Required
   - YouTube link
   - Google Drive / Dropbox link
   - Raw file upload (if enabled)
7. **Primary video/podcast link** (URL) — Required
8. **Backup link (optional)** (URL) — Optional
9. **Episode title / internal name** (Short text) — Required
10. **Approx length** (Multiple choice) — Required
   - < 30 min
   - 30–60 min
   - 60–120 min
   - 120+ min

## Section C — Goals + audience
11. **Primary goal** (Multiple choice) — Required
   - Grow audience
   - Drive leads
   - Sell an offer
   - Promote a webinar/event
12. **Audience** (Long text) — Required (who it’s for)
13. **Offer / CTA** (Long text) — Optional (what viewers should do)

## Section D — Platforms + quantity
14. **Platforms** (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
15. **Delivery quantity** (Multiple choice) — Required
   - 10 clips (standard)
   - Other (not standard)
16. **If other, specify** (Short text) — Conditional (show if “Other”)

## Section E — Style + examples
17. **Choose a style preset** (Multiple choice) — Required
   - Real Estate (clean, premium)
   - Fitness (high-energy)
   - B2B (minimal, authority)
   - Use my brand kit (I will provide)
18. **Link 1–3 example clips you love** (Long text) — Optional
19. **Hard “no” list** (Long text) — Optional (words, topics, claims)

## Section F — Speaker + accuracy
20. **Speaker names (if multiple)** (Long text) — Optional
21. **Industry terms / spellings** (Long text) — Optional
22. **Captions accuracy preference** (Multiple choice) — Required
   - Fast (minor imperfections ok)
   - Balanced
   - Maximum accuracy (may reduce speed)

## Section G — Compliance (required)
23. **Any required disclaimers?** (Long text) — Optional
24. **Permission + rights checkbox** (Checkbox) — Required
   - “I own the rights or have permission to edit and publish this content.”
25. **Approval window checkbox** (Checkbox) — Required
   - “I agree to provide revision notes within 12 hours or clips may be treated as approved to protect the 48-hour timeline.”

## Section H — Delivery
26. **Preferred delivery method** (Multiple choice) — Required
   - Google Drive folder
   - Frame.io review link
27. **Drive/Frame.io email to invite** (Email) — Required

**Final message (paste):**
“Thanks — we’ll confirm receipt by email within 4 business hours. Questions: **agent_bob_replit+clip-factory@agentmail.to**.”

---

# 3) Google Sheets Clip Tracker — Build Spec (Internal)

Create a Google Sheet named: **Clip Factory — Production Tracker**

## Tab 1: `Jobs`
Columns (left to right):
1. **Job ID** (e.g., `CF-0007`)
2. **Client**
3. **Episode/Asset Name**
4. **Source Link**
5. **Platform(s)**
6. **Preset** (Real Estate / Fitness / B2B / Brand Kit)
7. **Received (timestamp)**
8. **SLA Due (timestamp)** (= Received + 48h)
9. **Status** (Data validation dropdown):
   - Intake Received
   - Downloading/Transcoding
   - Transcript Ready
   - Highlights Selected
   - Editing
   - Captions/Styling
   - QA
   - Delivered (Batch 1)
   - Revisions Requested
   - Delivered (Final)
   - Blocked (Client)
   - Blocked (Technical)
10. **Owner** (Editor/PM)
11. **Notes / Risks**

## Tab 2: `Clips`
One row per clip.
Columns:
1. **Job ID**
2. **Clip ID** (`C01`…`C10`)
3. **Timecodes (IN–OUT)**
4. **Hook line (first caption line)**
5. **Angle** (Pain / Mistake / Contrarian / Steps / Story)
6. **Pattern interrupts used** (Y/N)
7. **B-roll cues added** (Y/N)
8. **Caption style applied** (Preset name)
9. **Exported** (Y/N)
10. **QA pass** (Y/N)
11. **QA notes**
12. **Review link** (Frame.io/Drive)
13. **Client status** (Approved / Needs changes)
14. **Revision round** (0/1/2)

## Tab 3: `QA Checklist`
Make this a checklist reference tab used by editors.
Rows (each with a checkbox column):
- Hook appears in first 1.5s
- No dead air > 0.3s at start
- Captions within safe margins; not covered by UI
- Speaker framing OK (face visible when possible)
- Captions accuracy pass (names/terms)
- Pattern interrupts every 2–3s (zoom/cut/b-roll/text emphasis)
- No copyrighted music unless client provided
- CTA end card present (if requested)
- Platform export settings correct

## Sheet behaviors (quick setup)
- Freeze header row on each tab
- Add conditional formatting on `Jobs`:
  - If `NOW() > SLA Due` and Status not Delivered → highlight red
  - If Status = Blocked → highlight orange

This tracker is designed to keep throughput high and make SLA risk obvious at a glance.
