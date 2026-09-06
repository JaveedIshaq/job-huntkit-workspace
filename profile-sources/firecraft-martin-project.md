# Project: Firecraft Centre — Agents App, Admin Panel & QR Visualiser (Client)

**Type:** Client / freelance product engineering (end-to-end delivery for The Firecraft Centre)  
**Client folder:** `/devwork/martin/`  
**Status (2026):** Production-oriented suite — agent Flutter app, Next.js admin, customer QR web live on Hostinger  
**Live sites:**
- Agents admin: `https://agents.thefirecraftcentre.com`
- Customer QR visualiser: `https://qrlink.thefirecraftcentre.com`
**Mobile package:** `uk.co.thefirecraftcentre.agents` (Flutter; version e.g. `1.0.10+10`)  
**One-liner:** Showroom agents and customers visualise Firecraft fireplaces in real rooms with AI remodeling, catalog-driven prompts, leads, and QR product links.

---

## What I built (three apps, one backend)

For this client I delivered a **full product suite** on a shared **Supabase** project:

| App | Stack | Audience | Repo folder |
|-----|--------|----------|-------------|
| **Firecraft Agents** | Flutter (Riverpod, GoRouter) | Showroom agents | `firecraft-agents-app` |
| **Agents Admin** | Next.js 16 static export | Super admins | `firecraft-agents-admin` |
| **QR Web** | Next.js 16 static export | Customers (scan QR) | `qr-web` |

No NestJS BFF — browser/mobile talk to Supabase Auth + Postgres (RLS) + Storage; privileged work goes through **Edge Functions** (Gemini remodel, create-agent, QR rate limits / geo / WhatsApp follow-up).

I owned schema/RLS, AI remodel pipeline, catalog “prompt destructor,” agent provisioning, lead capture, Hostinger deploy (GitHub Actions → rsync/SSH), and store/release packaging for Android.

---

## Business problem

Showroom staff need to show customers how a fireplace / stove suite will look **in their own room**, using real Firecraft product options (from the client’s Google Sheet mindmap), then capture interest as leads. Separately, product QR codes on the shop floor should let **customers** try a pre-set product visualiser without an agent login.

---

## Architecture

```
Flutter agents app  →  Supabase Auth (role=agent, is_active)
                    →  Catalog / room_designs / leads (RLS)
                    →  Storage room-designs/{agent_id}/{design_id}/…
                    →  Edge Function remodel-room (Gemini; service secrets)

Admin (Next.js)     →  Super admin session + RLS helpers
                    →  Catalog CMS, agents CRUD, designs, leads, QR products
                    →  Edge Function create-agent (service role provisioning)

QR Web (Next.js)    →  Anon read of public qr_products columns (prompt NEVER in browser)
                    →  qr_leads / qr_events inserts
                    →  Edge Function qr-remodel (service role loads prompt + Gemini)
                    →  qr-lead-geo, optional WhatsApp follow-up
```

**Security highlights:**
- Agents cannot self-register; only admin-provisioned accounts.
- Super admin vs agent roles enforced in Postgres RLS (`is_super_admin()`, `is_active_agent()`).
- QR product `prompt` kept private (column privilege + Edge Function service role); customer path is anonymous with IP rate limits.
- Gemini API key and service role stay in Edge Function secrets — not in Flutter or `NEXT_PUBLIC_*`.

---

## 1) Flutter — Firecraft Agents (`firecraft-agents-app`)

Showroom agent app for AI room remodeling sessions.

**Core flows**
- **Scan / remodel:** capture or pick room photo → step-by-step **catalog configurator** (wall type → fireplace style → fire type → accessories* → options → colours) → review selections, budget, and generated AI prompt → Edge Function remodel → result screen → share
- **History:** past designs with detail views
- **Analytics:** agent remodel metrics (charts)
- **Gallery / Inspiration:** browse generated designs and showroom reference content
- **Auth:** email/password; reject non-agent or inactive users; no public signup

**Prompt system (“prompt destructor”)**  
Each catalog node stores a **prompt fragment**. The app joins fragments into a deterministic natural-language prompt wrapped in the client’s template (preserve existing room furniture/decor). Catalog edits in admin update mobile behaviour **without an APK rebuild**.

**Stack:** Flutter 3.44 / Dart 3.12, Riverpod + Freezed + codegen, GoRouter shell tabs, slang i18n, Alchemy light/dark theme, Supabase Flutter, Dio/http, image picker, share_plus, fl_chart, Mixpanel, Sentry, Firebase Messaging / Remote Config, secure storage.

**Ports / evolution:** Ported UX ideas from a local prototype (`AIRoomRemodelingAppCode` / SQLite) into production Firecraft kit patterns (Riverpod, Supabase, theme tokens).

---

## 2) Next.js — Agents Admin (`firecraft-agents-admin`)

Super-admin panel to run the showroom operation and content that drives the mobile + QR apps.

**Modules I built / wired**
- **Overview dashboard** — agents, designs, leads counts
- **Agents** — create (Edge Function), edit, avatar upload, activate/deactivate
- **Catalog** — room design types/styles; fire options; hierarchical **product listing** tree (prompt fragments, prices, required flags, sort, active); product image library
- **Designs** — all agent room remodeling sessions + detail
- **App leads** — leads from mobile designs; notes, address, quotations
- **QR web CMS** — QR products wizard, printable/public URLs, reports, QR leads, showrooms
- **App settings** — min version / force-update style controls for agents
- **Prompt Builder / Fireplace Builder** — visual tools to simulate catalog → prompt assembly
- **Help / documentation** — in-app user guide for admins

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, `@supabase/ssr` + supabase-js, `qrcode` for product QR generation.  
**Deploy:** static `output: 'export'` → Hostinger via GitHub Actions rsync/SSH (same pattern as QR web, different document root).

---

## 3) Next.js — QR Web (`qr-web`)

Customer-facing visualiser on **`qrlink.thefirecraftcentre.com`**.

**Journey:** Scan product QR → `/p/[slug]` → capture room photo → contact details → AI remodel (pre-set product prompt) → download / share result; track events (download, share, etc.).

**Thin-slice design**
- Public product fields only in the browser
- Leads + events written under anon policies
- Remodel via **`qr-remodel`** (not the agent `remodel-room` path)
- IP rate limiting + optional scan geo enrichment
- PHP mail helper on Hostinger for office email (SMTP config outside git)

**Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, Supabase anon client, GA measurement id baked at build time. Static export + Hostinger deploy parallel to admin.

---

## Shared data & Edge Functions

**Key tables / domains:** `users` (roles), catalog nodes / room-design / fire-options, `room_designs`, `leads` (+ quotations, notes, address), storage for originals/remodeled images, `qr_products` / `qr_leads` / `qr_events`, showrooms, rate-limit buckets, app settings.

**Edge Functions:** `remodel-room`, `create-agent`, `qr-remodel`, `qr-lead-geo`, `qr-lead-whatsapp` (as deployed across admin/app/qr-web function folders).

**Migrations:** extensive Supabase SQL under `firecraft-agents-app/supabase/migrations/` (core RLS/storage, catalog, room scene detection, QR web, showrooms, WhatsApp follow-up, etc.).

---

## Delivery & DevOps

- Separate Hostinger sites for agents vs QR; shared SSH deploy key pattern; GitHub Environments + secrets for `NEXT_PUBLIC_SUPABASE_*`
- CI lint/build on PRs; deploy on `main`
- Android release signing for agents APK/AAB; client-facing development reports explaining prompt builder and admin CMS
- Client collaboration: mapped Google Sheet mindmap → structured catalog DB → mobile configurator

---

## Skills demonstrated (for job matching)

Flutter, Dart, Riverpod, GoRouter, Freezed, mobile agent apps, Android release packaging, Next.js App Router, React, TypeScript, Tailwind CSS, static export hosting, Supabase Auth, PostgreSQL, Row Level Security (RLS), Supabase Storage, Edge Functions, Gemini / generative AI image remodeling, product catalog CMS, deterministic prompt engineering, QR code product flows, lead capture / CRM-lite, showroom retail tooling, GitHub Actions, Hostinger SSH deploy, Mixpanel, Sentry, Firebase, client communication, end-to-end ownership of multi-app products.

---

## Role summary (resume-style bullets)

- Built a three-app Firecraft suite for a UK fireplace retailer: Flutter showroom agents app, Next.js super-admin CMS, and customer QR visualiser — all on one Supabase backend with RLS.  
- Implemented AI room remodeling with Gemini via Edge Functions, plus a catalog-driven “prompt destructor” so product options assemble deterministic prompts and budgets.  
- Delivered admin tooling for agent provisioning, hierarchical product trees (fragments, prices, required flags), designs/leads monitoring, and QR product/lead/showroom management.  
- Shipped anonymous QR customer flow with private prompts, rate limits, lead + geo tracking, download/share, and production Hostinger deploys for both web apps.  
- Enforced role separation (super_admin vs agent), no mobile self-signup, and secrets kept off the client.

---

## How to add this to HuntKit Profile

1. Open HuntKit → **Profile** → Add source  
2. Type: **project**  
3. Title: `Firecraft Centre — Flutter Agents + Next.js Admin + QR Web`  
4. Paste this entire file (or Role summary + Architecture + Skills if you want a shorter chunk)  
5. Click **Add & embed source**

File path in HuntKit repo: `profile-sources/firecraft-martin-project.md`
