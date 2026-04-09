# DFY Clip Factory — Intake Form (Tally), Clip Tracker (Google Sheets), and Fast Feedback One-Pager

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:17:51.537Z

---

# 1) Tally.so Intake Form (FREE) — Copy/Paste Build (Clip Factory 10-in-48)

**Form title:** Clip Factory Intake — 10 Vertical Clips in 48 Hours  
**Form description (top):**
Thanks for choosing Clip Factory. This form collects everything needed to deliver 10 ready-to-post vertical clips within 48 hours. If you have questions, email **agent_bob_replit+clip-factory@agentmail.to**. You can also view our service page here: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3**.

---

## Section A — Client + Episode Info
1) **Name** (short answer) — required  
2) **Brand / Channel name** (short answer) — required  
3) **Email for delivery + approvals** (email) — required  
4) **Time zone** (short answer) — required  
5) **Episode title** (short answer) — required  
6) **Episode publish date (if relevant)** (date) — optional  

## Section B — Source File (choose one)
7) **Upload source video/audio** (file upload) — optional  
8) **OR paste link to source** (long answer) — required if no upload  
Help text: “Paste a Google Drive/Dropbox/YouTube link. Ensure permissions are set to ‘Anyone with link can view’.”
9) **Source length (minutes)** (number) — optional  
10) **Speaker count** (multiple choice) — required  
- 1 speaker
- 2 speakers
- 3+ speakers
- Not sure

## Section C — Platforms + Output
11) **Platforms** (checkboxes) — required  
- TikTok
- Instagram Reels
- YouTube Shorts
12) **Preferred on-screen handle / @username** (short answer) — optional  
13) **CTA link (if any)** (short answer) — optional  
Help text: “Examples: book a call link, lead magnet URL, website.”

## Section D — Content Direction
14) **Primary goal for these clips** (multiple choice) — required  
- Leads / bookings
- Audience growth
- Authority / thought leadership
- Sales
- Other
15) **Target audience** (long answer) — required  
16) **Topic boundaries / do-not-use topics** (long answer) — optional  
17) **Must-include phrases / offers** (long answer) — optional

## Section E — Style Presets (choose one)
18) **Choose a style preset** (multiple choice) — required  
- Real Estate (clean, premium, local-trust)
- Fitness (high-energy, bold)
- B2B (minimal, credible)
- Use my brand style (I will provide assets)

## Section F — Brand Assets (if applicable)
19) **Upload logo (PNG preferred)** (file upload) — optional  
20) **Brand colors (HEX codes)** (short answer) — optional  
21) **Brand font name(s)** (short answer) — optional  
22) **Examples of clips you like** (long answer) — optional  
Help text: “Paste 1–3 links (TikTok/Reels/Shorts).”

## Section G — Compliance + Approval
23) **Caption language** (multiple choice) — required  
- English
- Other (specify below)
24) **If other, specify language** (short answer) — conditional  
25) **Consent + rights confirmation** (checkbox) — required  
“I confirm I have rights to use and edit this media and authorize Clip Factory to create derivative short clips for my channels.”
26) **Turnaround acknowledgment** (checkbox) — required  
“I understand delivery is **10 clips within 48 hours** after all required assets are received and access links work.”
27) **Revision policy acknowledgment** (checkbox) — required  
“I understand revisions are limited to the included revision round (see onboarding doc) and must be requested within the feedback window.”

## Section H — Notes
28) **Anything else we should know?** (long answer) — optional

**Tally settings (recommended):**
- After submission message: “Received. We’ll confirm intake within 4 business hours. If anything is missing, we’ll email you at the address provided. Questions: agent_bob_replit+clip-factory@agentmail.to”
- Email notifications: send to **agent_bob_replit+clip-factory@agentmail.to**

---

# 2) Google Sheets Clip Tracker — Build Spec (FREE)

## Sheet name
**Clip Factory Tracker — [ClientName]**

## Tab 1: “TRACKER” (columns)
Create row 1 headers exactly as below:
1. Client
2. Episode
3. Source Link
4. Platform (TT/IG/YT)
5. Clip ID
6. Clip Title (internal)
7. Hook (first 1.5s) — text
8. Timestamp Start (mm:ss)
9. Timestamp End (mm:ss)
10. Length (sec)
11. Style Preset (RE/FIT/B2B/Brand)
12. Captions (Y/N)
13. B-roll Cues Added (Y/N)
14. Edit Status (Not started / In progress / Exported)
15. QA Status (Pass / Fix)
16. Review Status (Sent / Approved / Changes requested)
17. Revision Count (0/1/2)
18. Delivery Link
19. Notes
20. Owner
21. Due Date/Time
22. Actual Delivered Date/Time

## Data validation (dropdowns)
- Platform: TT, IG, YT
- Edit Status: Not started, In progress, Exported
- QA Status: Pass, Fix
- Review Status: Not sent, Sent, Approved, Changes requested
- Style Preset: RE, FIT, B2B, Brand

## Conditional formatting (quick rules)
- If QA Status = Fix → row turns light red
- If Review Status = Changes requested → row turns light yellow
- If Due Date/Time is within 6 hours and Review Status not Approved → row turns orange

## Formulas (optional but fast)
- **Length (sec)** (col J) can be manual, or compute if you standardize timestamps.
- **SLA countdown helper**: create a cell (e.g., X1) “Hours to due” for each row:
  `=IF(U2="","",(U2-NOW())*24)`
(Assumes Due Date/Time is in column U.)

## Tab 2: “STATUS SUMMARY”
Create a simple table:
- Total clips
- Exported
- QA Pass
- Sent
- Approved

Use COUNTIF:
- Total clips: `=COUNTA(TRACKER!E:E)-1`
- Exported: `=COUNTIF(TRACKER!N:N,"Exported")`
- QA Pass: `=COUNTIF(TRACKER!O:O,"Pass")`
- Sent: `=COUNTIF(TRACKER!P:P,"Sent")`
- Approved: `=COUNTIF(TRACKER!P:P,"Approved")`

---

# 3) Client One-Pager — How to Give Feedback Fast (So We Still Hit 48 Hours)

**Title:** How to Give Feedback Fast (So We Still Hit 48 Hours)

To deliver **10 clips within 48 hours**, we need fast, specific feedback. Here’s the easiest way to review and request changes without slowing the schedule.

## A) What you’ll receive
- A review link (Frame.io or a shared Drive folder) with:
  - 10 vertical clips (platform-ready)
  - A simple list of clip titles/hooks
  - One place to comment/time-stamp feedback

Service details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
Support email: agent_bob_replit+clip-factory@agentmail.to

## B) The only feedback that helps (examples)
Use **time-stamped** notes and be **binary** where possible.
- Good: “00:02–00:05 remove ‘um’ and tighten pause.”
- Good: “Change caption wording at 00:07 to: ‘If you’re buying in 2026, do this first…’”
- Good: “Swap end CTA to: ‘DM ‘START’ for the checklist’.”
- Not helpful: “Make it punchier” / “I don’t like it” (no direction)

## C) Prioritize your feedback (to keep turnaround)
If you’re short on time, focus in this order:
1) **Hook** (first 1–2 seconds): does it stop scroll?
2) **Accuracy**: no misquotes, no misleading context
3) **Brand safety**: remove anything you don’t want public
4) **Captions readability**: spelling, names, key terms
5) **CTA**: correct handle/link/offer

## D) Feedback window + revisions
- Please send feedback within **12 hours** of receiving the review link.
- Included: **1 revision round** across the batch (small edits like trims, caption fixes, CTA text, b-roll swap).
- Not included (requires a new batch scope): rewriting narrative, changing the chosen topics entirely, requesting 10 new highlights after approval, full re-style of all clips.

## E) Fast approval method
Reply with one of these:
- “Approved all.”
- “Approved except clips 03 and 07 (notes left in link).”

If anything breaks or you can’t access the review link, email **agent_bob_replit+clip-factory@agentmail.to** immediately so we can keep the SLA.
