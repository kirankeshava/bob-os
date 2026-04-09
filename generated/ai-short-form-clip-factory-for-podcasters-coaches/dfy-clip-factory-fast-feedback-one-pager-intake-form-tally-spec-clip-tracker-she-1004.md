# DFY Clip Factory — Fast Feedback One-Pager + Intake Form (Tally) Spec + Clip Tracker (Sheets) Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:13:21.856Z

---

# DFY Clip Factory — How to Give Feedback Fast (So We Hit 48 Hours)

**Clip Factory (Legitimacy URL):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Contact:** agent_bob_replit+clip-factory@agentmail.to

## The goal
We deliver **10 ready-to-post vertical clips within 48 hours**. The only way we miss is slow or unclear feedback. This page shows the fastest way to review so you get what you want in one revision.

## Where you’ll review
We’ll send a single review link (Frame.io or Google Drive folder). Please keep all feedback **in one place**.

## What “good feedback” looks like (copy/paste)
Use this format for each clip:

**Clip:** CF_[YourBrand]_[Episode]_[Clip#]  
**Decision:** Approve / Revise  
**Timestamp:** 00:03–00:08  
**Change:** Replace hook text with: “____”  
**Reason (optional):** Too salesy / needs more curiosity / compliance.

If it’s a caption change, please provide **exact wording**.

## The 3 things you should check (and ignore everything else)
1) **Hook clarity (first 1–2 seconds):** Does it make you want to keep watching?
2) **Caption accuracy:** Names, numbers, key claims, and any compliance-sensitive phrasing.
3) **Meaning is intact:** We didn’t change your point by trimming.

**Tip:** Don’t spend time on micro-edits (single-word swaps) unless they impact meaning, compliance, or brand risk.

## Fast approval rules (to protect turnaround)
- **Best:** Approve with no changes.
- **Also fine:** One consolidated revision list for all 10 clips.
- **Avoid:** Multiple rounds of “tiny tweaks” across many clips—this is the #1 reason creators miss posting momentum.

## Deadlines (so the SLA holds)
- We ask for feedback within **12 hours** of delivery.
- If feedback arrives after 12 hours, the final delivery may shift (we’ll still move fast, but we can’t guarantee the original 48-hour window).

## Revision scope reminder (what we’ll revise)
Included (1 round):
- Hook text swaps
- Caption corrections
- Cutting 1–2 seconds tighter/looser
- Minor b-roll cue swap

Not included (new scope):
- Changing the clip topic/angle entirely
- Rebuilding 10 clips from scratch using different selection criteria
- New style system after delivery (new fonts/colors/layout)

## If you’re short on time
Just answer these 2 questions for each clip:
1) **Approve or revise?**
2) If revise: **what exact sentence should the on-screen hook say?**

---

# Build Spec — Client Intake Form (Tally.so, Free Tier)

## Form title
**Clip Factory Intake — 10 Clips in 48 Hours**

## Intro text (top of form)
“Thanks for choosing Clip Factory. Fill this in once per episode. Typical completion time: 4–6 minutes. Questions about the form? Email agent_bob_replit+clip-factory@agentmail.to. You can also view our site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

## Sections + questions (in order)
### A) Contact + Brand
1. **Full name** (required)
2. **Email for delivery** (required)
3. **Brand / Channel name** (required)
4. **Website / IG / TikTok links** (optional)
5. **Time zone** (required)

### B) Episode / Source Asset
6. **Source type** (multiple choice): YouTube link / Podcast RSS link / Google Drive link / Raw file upload (if available)
7. **Source URL** (long answer; required unless file upload)
8. **Episode title + publish date** (short answer)
9. **Runtime (approx.)** (multiple choice): <30m / 30–60m / 60–120m / 120m+
10. **Main speaker names** (short answer)

### C) Clip Goals
11. **Primary objective** (multiple choice): Awareness / Lead gen / Sell offer / Drive to podcast/YT
12. **Target audience (1 sentence)** (long answer)
13. **Offer / CTA** (short answer): “Follow for ___” / “DM ‘___’” / “Book a call” / “Link in bio”

### D) Style + Platforms
14. **Platforms needed** (checkboxes): TikTok / IG Reels / YouTube Shorts
15. **Style preset** (multiple choice): Real Estate / Fitness / B2B / “Use my brand guidelines”
16. **Brand colors (hex if possible)** (short answer)
17. **Font preference** (short answer)
18. **Do you want emoji in captions?** (yes/no)

### E) Compliance + No-Go
19. **Words/claims to avoid** (long answer)
20. **Required disclaimers** (long answer)
21. **Competitors or sensitive topics** (long answer)

### F) Clip Selection Guidance (optional but recommended)
22. **Top 3 moments to include (timestamps or topic notes)** (long answer)
23. **Top 3 moments to exclude** (long answer)
24. **Links to 3 clips you like (any creators)** (long answer)

### G) Delivery
25. **Preferred delivery method** (multiple choice): Frame.io / Google Drive
26. **Deadline / hard date** (date)
27. **Anything else we should know?** (long answer)

## Confirmation message
“Intake received. Next: we’ll confirm receipt by email within 2–4 business hours. Delivery target: 10 clips within 48 hours after we have the source + brand notes. Questions: agent_bob_replit+clip-factory@agentmail.to.”

## Settings
- Require email question
- Enable submission notifications to: agent_bob_replit+clip-factory@agentmail.to
- Disable “show results”

---

# Build Spec — Internal Clip Tracker (Google Sheets)

## Sheet name
**Clip Factory Tracker — Master**

## Tabs
1) **Queue** (everything flows here)  
2) **Clients** (client-level info + links)  
3) **Style Presets** (quick reference: fonts/colors/layout rules)  
4) **QA Rubric** (checkbox list for copy/paste)

## Tab 1: Queue — columns (left to right)
A. **Client**
B. **Episode ID** (CF_[Client]_[YYYY-MM-DD]_[EpShort])
C. **Source Link**
D. **Platform(s)**
E. **Preset** (Real Estate / Fitness / B2B / Custom)
F. **Clip #** (1–10)
G. **Proposed Hook**
H. **Timestamp In**
I. **Timestamp Out**
J. **Editor Owner**
K. **Status** (data validation dropdown): Intake Ready / Downloading / Selecting / Edit v1 / QA / Sent for Review / Revisions / Final Delivered
L. **Due (48h)** (datetime)
M. **Review Link** (Frame.io / Drive)
N. **Client Feedback Received?** (Yes/No)
O. **Revision Notes**
P. **Final Export Link**
Q. **QA Pass** (Yes/No)
R. **Notes / Risks**

## Data validation
- Status dropdown values exactly as above.
- Preset dropdown values exactly: Real Estate, Fitness, B2B, Custom.
- Client Feedback Received: Yes/No.

## Conditional formatting (speed cues)
- If Status = “Revisions” or “QA” highlight amber.
- If NOW() > Due(48h) and Status not “Final Delivered” highlight red.

## Basic operating rule
One row = **one clip**. An episode has 10 rows. If a clip is dropped/replaced, keep the row and mark Notes with “Replaced: reason”.
