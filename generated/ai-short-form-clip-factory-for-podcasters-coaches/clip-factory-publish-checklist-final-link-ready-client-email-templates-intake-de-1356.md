# Clip Factory — Publish Checklist + Final Link-Ready Client Email Templates (Intake, Delivery, Revisions)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:36:54.555Z

---

Below is the final, link-ready onboarding + delivery communication set. It includes (1) a publishing checklist to generate the live Notion + Google Form URLs, and (2) client emails with clear placeholders to paste those URLs immediately.

========================
A) PUBLISH CHECKLIST (NO SPEND)
========================
Goal: produce two live links:
1) WHAT TO EXPECT page (Notion public link)
2) INTAKE FORM (Google Form link)

A1) Notion page publish steps (free):
- Sign up / log in to Notion using:
  Name: Bob Smith
  Email: agent_bob_replit@agentmail.to
- Create a new page titled: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
- Paste the full one-page copy you already have from the onboarding kit.
- Add a short top block:
  “Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   Contact: agent_bob_replit+clip-factory@agentmail.to”
- Share → Publish to web → enable “Allow search engines” OFF (recommended) → Copy the public URL.
- Save it as: {{NOTION_WHAT_TO_EXPECT_URL}}

A2) Google Form create steps (free):
- Create/log into a Google account using agent_bob_replit@agentmail.to (if Google blocks direct signup on that inbox, create a free Gmail alias separately; still keep the business contact email inside the form header as agent_bob_replit+clip-factory@agentmail.to).
- Create a new Google Form titled: “Clip Factory — Clip Intake Form”
- Implement the questions from the build spec (platforms, tone, CTA, banned words, handles/links, examples, etc.).
- Settings:
  - Collect email addresses: ON
  - Limit to 1 response: OFF
  - Edit after submit: OFF (reduces moving-target scope)
  - Confirmation message: “Thanks — we’ll confirm receipt and begin after pre-flight checks.”
- Copy the share URL.
- Save it as: {{GOOGLE_INTAKE_FORM_URL}}

A3) Insert links into all templates below:
Replace:
- {{NOTION_WHAT_TO_EXPECT_URL}} with the Notion link
- {{GOOGLE_INTAKE_FORM_URL}} with the Google Form link

========================================
B) CLIENT EMAIL — INTAKE / KICKOFF
========================================
Subject: Clip Factory — Quick intake (so we nail the first delivery)

Hi {{ClientName}},

Thanks for working with Clip Factory.

To start, please complete this quick intake form (required):
{{GOOGLE_INTAKE_FORM_URL}}

What to expect (QA standards, review flow, delivery pack, revisions):
{{NOTION_WHAT_TO_EXPECT_URL}}

Once we receive your intake, we’ll run a short “pre-flight” check (framing, platform targets, caption style, brand terms, banned words) and reply with:
1) Confirmed clip targets (count + length)
2) The review link timeline
3) Any questions needed to avoid revisions

If you have any brand assets (logo pack, fonts, colors) or example clips you love, reply here and include them.

Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

========================================
C) CLIENT EMAIL — DELIVERY (REVIEW + FINAL PACK)
========================================
Subject: Your clips are ready — review link inside (24h revision window)

Hi {{ClientName}},

Your Clip Factory deliverables are ready.

1) Review link (timestamp comments):
{{REVIEW_LINK}}

How to review (important):
- Please leave timestamped comments directly on the review link.
- Group requests by clip number (e.g., “Clip 03: change first caption line”).
- Revision window: 24 hours from this email (until {{REVISION_DEADLINE}}).

2) Delivery pack download (MP4 + SRT + cue sheet + posting suggestions):
{{DELIVERY_FOLDER_LINK}}

Included in the delivery pack:
- Final vertical MP4s (platform-safe export settings)
- SRT caption files (one per clip)
- B-roll cue sheet (timecodes + suggestions)
- Posting suggestions (first-line caption + hashtags + CTA options)

What to expect / revision policy (reference):
{{NOTION_WHAT_TO_EXPECT_URL}}

Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

========================================
D) CLIENT EMAIL — REVISION RECEIVED (ACK)
========================================
Subject: Revisions received — we’re on it

Hi {{ClientName}},

Got your revision notes — thank you.

We’ll apply the requested changes based on your timestamp comments here:
{{REVIEW_LINK}}

We’ll deliver the updated files by {{REVISION_RETURN_TIME}}. If anything in the notes looks like a scope change (new clips, new angle, major content restructure), we’ll flag it before doing extra work so there are no surprises.

Contact: agent_bob_replit+clip-factory@agentmail.to
Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

========================================
E) CLIENT EMAIL — REVISION COMPLETED (HANDOFF)
========================================
Subject: Revisions complete — updated clips attached/linked

Hi {{ClientName}},

Revisions are complete.

Updated delivery pack:
{{DELIVERY_FOLDER_LINK}}

Updated review link (if applicable):
{{REVIEW_LINK}}

If everything looks good, you’re cleared to post. If you spot any technical issues we missed (caption timing, audio pop, export artifact), reply here and we’ll fix it.

Contact: agent_bob_replit+clip-factory@agentmail.to
Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

=====================================================
F) TRIAGE RULES (CLIENT-SAFE WORDING TO PASTE ANYWHERE)
=====================================================
Included (free, within the 24-hour window, via timestamp comments):
- Caption corrections (typos, missing words, punctuation)
- Minor timing tweaks (caption sync, small cut trims)
- Safe-zone/framing fixes (cropped faces, subtitles too low)
- Audio polishing fixes (leveling, small noise reduction adjustments)
- Platform formatting fixes (aspect ratio, export settings)

Usually paid / treated as a change request (we’ll quote before doing it):
- New creative direction (different hook angle, different story, different structure)
- Swapping to different source footage beyond what was provided/approved
- New clips not included in the original order
- Major rework due to new brand guidelines shared after editing started
- Changes requested after the 24-hour revision window

Note: If we made an objective mistake (export error, missing file, broken captions), we fix it free regardless of timing.
