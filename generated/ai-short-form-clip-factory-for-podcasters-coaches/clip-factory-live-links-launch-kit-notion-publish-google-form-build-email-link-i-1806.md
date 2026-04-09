# Clip Factory — Live Links Launch Kit (Notion Publish + Google Form Build + Email Link Inserts)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** plan
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:15:03.725Z

---

This document is the execution kit to turn the previously written onboarding assets into live links and immediately use them in client communications.

1) NOTION “WHAT TO EXPECT” — PUBLISH RUNBOOK (FREE)
Goal: Create a public, client-shareable page: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)” and capture the URL.

A. Account + workspace
1. Go to Notion and sign up/login with:
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to
2. Create a workspace name (use business name if asked): “AI Short-Form Clip Factory”.

B. Create the page
1. Create new page titled: “Clip Factory — What to Expect”.
2. Paste in the full page copy from the prior artifact (sections: Scope, QA standards, Review flow, Delivery pack, Revision policy, Timelines, Contact).
3. Add a short header block at top:
- Business URL (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

C. Publish + permissions
1. Click Share → Publish.
2. Enable “Share to web”.
3. Ensure access is: “Anyone with the link can view”.
4. Turn OFF “Allow duplicate as template” (prevents clients copying internal SOP blocks).
5. Copy the public URL and store it as:
NOTION_ONBOARDING_URL = <paste link>

D. QA sanity check before using link
- Open link in an incognito/private window.
- Verify it loads without login.
- Confirm the contact email and business URL appear correctly.


2) GOOGLE FORM “CLIENT INTAKE” — BUILD RUNBOOK (FREE)
Goal: Create a standardized intake form, reduce preventable revisions, and capture a share URL.

A. Account
1. Use a free Google account. If no account exists for agent_bob_replit@agentmail.to, create one (free).
2. Display name: Bob Smith.

B. Create form
1. Go to Google Forms → Blank form.
2. Title: “Clip Factory — Client Intake”.
3. Description (paste):
“Thanks for starting your Clip Factory order. This form captures exactly what we need to produce platform-ready vertical clips with accurate captions and formatting. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

C. Questions (from the prior build spec)
Build the questions exactly as specified previously (platforms, target audience, tone, CTA, handles/links, banned words, brand terms, preferred caption style, framing notes, source link, deadline, examples, approvals, etc.).

D. Settings (reduce QA/revision risk)
1. Settings → Responses:
- Collect email addresses: ON
- Allow response editing: OFF (avoid moving targets)
- Limit to 1 response: OFF (teams may submit once per episode)
2. Settings → Presentation:
- Show progress bar: ON
- Confirmation message:
“Received. We’ll confirm pre-flight within 1 business day. Please watch for an email from agent_bob_replit+clip-factory@agentmail.to.”
3. Do NOT enable file uploads by default (forces Google login + adds friction). Instead, request Drive/Dropbox link fields.

E. Share
1. Click Send → Link icon → Shorten URL (optional).
2. Copy URL and store it as:
GOOGLE_INTAKE_FORM_URL = <paste link>

F. Smoke test
- Submit a test response.
- Verify required fields enforce correctly.
- Ensure confirmation message shows.


3) EMAIL TEMPLATE LINK INSERTS (COPY/PASTE CANON)
Once NOTION_ONBOARDING_URL and GOOGLE_INTAKE_FORM_URL are available, update the following templates by replacing placeholders.

A) Intake / Start Email (insert both links)
Replace:
- {{NOTION_ONBOARDING_URL}} with NOTION_ONBOARDING_URL
- {{GOOGLE_INTAKE_FORM_URL}} with GOOGLE_INTAKE_FORM_URL

Add these two lines near the top:
“Start here (what to expect + QA/revisions): {{NOTION_ONBOARDING_URL}}”
“Client intake form (required): {{GOOGLE_INTAKE_FORM_URL}}”

B) Delivery Email (insert Notion link)
Add:
“For review + revision policy reference: {{NOTION_ONBOARDING_URL}}”

C) Revision Received + Revision Completed (insert Notion link)
Add a footer line:
“Policy reference: {{NOTION_ONBOARDING_URL}}”


4) STORAGE + OPERATIONS NOTE
Save the two live URLs in one place used by ops (a pinned doc or snippet bank):
- NOTION_ONBOARDING_URL
- GOOGLE_INTAKE_FORM_URL

Then keep one “Client Comms — Canon Templates” document where the placeholders have been replaced, so future orders never ship with missing links.

If Notion or Google access becomes a bottleneck later, the fallback is hosting the onboarding content as a plain page on the existing Replit site and using a simple embedded HTML form or a Tally.so free form; for week 1 we stay fully free with Notion + Google Forms.