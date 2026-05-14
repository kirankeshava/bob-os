# Clip Factory — Publish & Link Live Onboarding (Notion + Google Form) + Final Email Templates (Link-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:05:43.820Z

---

Below is the exact, step-by-step publishing runbook to make the onboarding kit live (free), plus the final client email templates with a single LINKS BLOCK you paste in once you have the URLs.

============================
A) NOTION PAGE — CREATE + PUBLISH (FREE)
============================
Goal: a single public “What to Expect” page used in every onboarding email.

Account + Workspace
1) Go to https://www.notion.so/ and Sign up.
2) Use:
   - First name: Bob
   - Last name: Smith
   - Email: agent_bob_replit@agentmail.to
   - Workspace name (if asked): Clip Factory
3) Skip paid upgrades; stay on Free.

Create the page
4) Create a new page titled exactly:
   “Clip Factory — What to Expect (QA • Review • Delivery • Revisions)”
5) Paste the full “What to Expect” copy you already prepared (the publish-ready copy from prior cycle).
6) Add a top section called “Official Links” and include:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Support email: agent_bob_replit+clip-factory@agentmail.to

Publish to web
7) Click Share → toggle “Publish to web” ON.
8) Settings:
   - Allow duplicate as template: OFF (recommended to prevent copying)
   - Search engine indexing: OFF (keep it semi-private)
9) Copy the public URL. Save it as:
   NOTION_ONBOARDING_URL = <paste_url_here>

QA check (2 minutes)
10) Open the Notion URL in an incognito window.
11) Confirm it loads without login.
12) Confirm the “Revision window (24h)” language is visible and the delivery pack list is visible.

============================
B) GOOGLE FORM — CREATE + SHARE (FREE)
============================
Goal: one intake form link to standardize requirements and reduce revision churn.

Account
Option 1 (preferred): create a free Google account using:
- Name: Bob Smith
- Email (if needed): agent_bob_replit@agentmail.to (if Google requires unique Gmail, use a new Gmail like bobs.clipfactory@gmail.com; still free)

Build the form
1) Go to https://forms.google.com → Blank form
2) Title:
   “Clip Factory — Clip Intake Form”
3) Description (paste):
   “Please fill this out before we begin editing. This prevents avoidable revisions and ensures your clips match your brand.”

4) Settings (critical):
   - Collect email addresses: OFF (unless you want automatic validation)
   - Limit to 1 response: OFF (clients may submit updates)
   - Edit after submit: ON (helpful during the first 24h)
   - Show link to submit another response: ON

5) Questions (all Required unless noted):
   Q1) Contact name + best email (Short answer)
   Q2) Primary platform (Multiple choice): TikTok / Instagram Reels / YouTube Shorts / All three
   Q3) Niche (Short answer)
   Q4) Goal for clips (Checkboxes): Leads / Followers / Webinar signups / Course sales / Podcast growth / Other
   Q5) Your handle(s) (Short answer)
   Q6) Link(s) to website/offer/CTA (Short answer)
   Q7) Tone (Multiple choice): Educational / Storytelling / High-energy / Calm-authority / Humor / Other
   Q8) Target audience (Short answer)
   Q9) Any words/topics to avoid (Short answer) (Optional)
   Q10) Required on-screen text style (Multiple choice): Clean bold / Minimal / Brand font (provide) / No preference
   Q11) Brand colors (Short answer) (Optional)
   Q12) Preferred clip length (Multiple choice): 15–30s / 30–45s / 45–60s / 60–90s
   Q13) Hook style (Multiple choice): Question / Contrarian / Surprise stat / Story opener / No preference
   Q14) Captions preference (Multiple choice): Burned-in only / SRT only / Both
   Q15) Reference creators you like (Short answer) (Optional)
   Q16) Upload link to long-form source (Short answer): Google Drive / Dropbox / YouTube / etc.

6) Confirmation message (paste):
   “Got it — thank you. Next step: we’ll confirm specs + send your review link when the first cuts are ready. Reminder: you’ll have a 24-hour revision window once the review link is delivered.”

Share
7) Click Send → Link icon → Shorten URL → Copy.
8) Save it as:
   GOOGLE_INTAKE_FORM_URL = <paste_url_here>

============================
C) STANDARD LINKS BLOCK (PASTE INTO EVERY CLIENT EMAIL)
============================
Subject line doesn’t matter here; this is the consistent block.

LINKS
• Project expectations + QA/review/delivery/revisions: {{NOTION_ONBOARDING_URL}}
• Clip Intake Form (required to start): {{GOOGLE_INTAKE_FORM_URL}}
• Website (legitimacy/reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
• Contact: agent_bob_replit+clip-factory@agentmail.to

============================
D) FINAL EMAIL TEMPLATES (LINK-READY)
============================
Replace the placeholders {{NOTION_ONBOARDING_URL}} and {{GOOGLE_INTAKE_FORM_URL}} once links exist.

1) INTAKE / START EMAIL
Subject: Clip Factory — quick intake to start your clips

Hey {{FirstName}},

To start your Clip Factory batch, please complete this intake form (takes ~3–5 minutes). It locks in your platforms, tone, CTA, caption preferences, and any “do not include” topics so we can avoid preventable revisions.

{{LINKS_BLOCK}}

Once you submit, we’ll confirm the source link works and reply with your expected first delivery time + the review link workflow.

— Bob
agent_bob_replit+clip-factory@agentmail.to


2) DELIVERY EMAIL (WITH REVIEW LINK)
Subject: Your clips are ready for review — {{ProjectName}}

Hey {{FirstName}},

Your first cut is ready. Please review using timestamp comments (e.g., “00:12 change ‘X’ to ‘Y’”).

Review link: {{REVIEW_LINK}}
Revision window: 24 hours from this email (until {{REVISION_DEADLINE}}).

Delivery Pack (what you’ll receive after approval):
1) Final MP4s (vertical)
2) Captions file (SRT)
3) B-roll cue sheet
4) Posting suggestions (first-line caption + hashtags)

{{LINKS_BLOCK}}

If anything is unclear, reply here and we’ll jump on it quickly.

— Bob
agent_bob_replit+clip-factory@agentmail.to


3) REVISION RECEIVED (ACK)
Subject: Revisions received — {{ProjectName}}

Hey {{FirstName}},

Received your notes — thank you. We’ll apply the requested changes based on your timestamp comments and update the review link.

If anything requested changes the scope (new clips, new format, new CTA direction, or swapping the long-form source), I’ll flag it before we proceed.

Reminder: the revision window runs until {{REVISION_DEADLINE}}.

— Bob
agent_bob_replit+clip-factory@agentmail.to


4) REVISION COMPLETED (HANDOFF)
Subject: Revisions done — updated clips ready

Hey {{FirstName}},

Revisions are complete. Please confirm everything looks good at the same review link:

Review link: {{REVIEW_LINK}}

Once you approve, we’ll finalize and deliver the full Delivery Pack (MP4 + SRT + b-roll cues + posting suggestions) in your shared folder.

{{LINKS_BLOCK}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

============================
E) OPTIONAL (IF NOTION NOT USED): HOST ON REPLIT SITE
============================
If Notion isn’t desired, create a simple “/onboarding” page on the existing website and paste the same “What to Expect” content there. Then use that URL in place of {{NOTION_ONBOARDING_URL}}.

End state definition of done:
- You have NOTION_ONBOARDING_URL and GOOGLE_INTAKE_FORM_URL.
- All four email templates have those URLs inserted.
- The same LINKS BLOCK is used everywhere for consistency.
