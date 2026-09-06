# Project: PlantUSA — Plant ID & Care App Suite (Flutter + Angular Admin + Next.js Landing)

**Type:** Client product engineering (Jyatra / PlantUSA) — mobile + admin CMS + marketing site  
**Status (2026):** Production consumer app on stores; shared Supabase backend; marketing site at theplantusa.com  
**Package / app id:** `com.plantusa.mobile` · Version e.g. `1.2.5+42`  
**Stores:**
- Google Play: https://play.google.com/store/apps/details?id=com.plantusa.mobile  
- App Store: https://apps.apple.com/us/app/plantusa-plant-identifier/id6742569762  
**Marketing:** https://theplantusa.com  
**One-liner:** Photo plant identification and disease diagnosis for US gardeners, with care tracking, reminders, articles, premium, and a full content/ops admin.

---

## What I built

For this client I delivered a **three-surface product** on one Supabase backend:

| Surface | Stack | Role |
|---------|--------|------|
| **PlantUSA mobile** | Flutter (BLoC/Cubit, GoRouter) | Consumer plant ID, disease lab, garden care |
| **Admin dashboard** | **Angular 19** + Tailwind + Supabase JS | CMS for plants, diseases, articles, users, notifications |
| **Marketing landing** | **Next.js** (App Router) + Tailwind + Supabase | SEO site, plant/blog pages, legal, app download CTAs |

> Note for accuracy: the admin panel is **Angular**, not Next.js. The **landing website** is Next.js. Both share the mobile app’s Supabase project.

I owned/implemented large parts of mobile features (AI diagnose, my-plants, reminders, subscriptions), Angular admin modules, Next.js marketing + public plant/blog data access, Edge Functions for push reminders/broadcasts, and Android release packaging (keystore / Play).

---

## Problem & product

US gardeners need fast plant ID, disease help, and care reminders without flipping through field guides. PlantUSA:

1. Identifies plants from photos (Gemini + optional RAG against the PlantUSA DB)  
2. Diagnoses diseases (“PlantUSA Lab”) and stores detection history  
3. Lets users manage **My Plants** with care actions (water, fertilize, mist, rotate, prune, notes, photos, health checks)  
4. Sends care reminders via local notifications + server FCM workers  
5. Offers articles, bookmarks, search, categories, location-aware UX  
6. Monetizes with **Adapty** premium / Pro limits  

Admin operators manage the plant/disease/article catalogs and broadcast notifications; the landing site markets the app and surfaces public plant/blog content for SEO.

---

## Architecture

```
Flutter app  →  Supabase Auth (incl. anonymous + device persistence)
             →  Postgres + Storage (plants, diseases, my_plants, articles, …)
             →  Gemini (google_generative_ai) for ID / disease / structured plant data
             →  Adapty (IAP / subscriptions)
             →  Firebase Messaging + local notifications
             →  Isar (local) + secure storage

Angular admin →  Supabase Auth (staff)
              →  CRUD CMS for catalogs, users, articles, push broadcast

Next.js web   →  Supabase anon (public plants / published articles)
              →  SEO (sitemap, robots, JSON-LD), privacy/terms, data-deletion
              →  App Store / Play download CTAs

Edge Functions →  send-plant-reminders (FCM care pushes)
               →  broadcast-notifications (admin campaigns)
```

**AI pattern:** Detect plant/disease from photo → look up PlantUSA DB → if missing, generate via Gemini, show to user, and **save for future reuse** (growing the corpus). RAG detection path compares embeddings / generative retrieval against stored knowledge when applicable.

**DB helpers:** Postgres RPCs such as `save_full_plant` / `get_full_plant` for transactional full-plant payloads (fewer round-trips).

---

## 1) Flutter mobile (`plantusa-mobile-flutter`)

**Architecture:** Clean Architecture-ish feature folders — `data` / domain-ish models / `presentation` (Cubit + views); DI via **get_it + injectable**; navigation with **GoRouter**.

**Feature modules I worked across**
| Feature | Capability |
|---------|------------|
| **diagnose** | PlantUSA Lab — disease detect from photo, guided UX, save results |
| **plants** | Plant recognition / detail; Gemini + RAG detection services |
| **my_plant** / **my_plant_action** | Personal garden, care actions, snaps, notes |
| **detection_history** | Past ID / disease runs |
| **article** / **bookmark** | Care content + save for later |
| **subscription** | Adapty paywall / Pro entitlements |
| **notifications** | Care reminders + push |
| **auth** / **profile** / **onboarding** / **home** / **search** / **location** | Account, settings, discovery |
| **feedback** / **inapp_review** / **banner** / **admin** | Support, reviews, promo, internal embedding tools |

**Stack highlights:** Flutter 3.41+ / Dart 3.11+, flutter_bloc, Dio, supabase_flutter, Firebase Auth/Messaging, google_generative_ai (Gemini), Adapty, Isar, easy_localization, flex_color_scheme (light/dark), flutter_map / Syncfusion maps, Sentry, Freezed/json_serializable.

**Shipping:** Signed Android releases (`com.plantusa.mobile`); iOS App Store listing live; upgrader / force-update style tooling.

---

## 2) Angular admin (`plantusa-web-admin-dashboard`)

Angular 19 admin for content and ops (NgRx where used, Angular Material / Tailwind UI kit, TinyMCE/Quill for rich content, ApexCharts, FullCalendar).

**Modules**
- **Dashboard** — overview metrics  
- **Users** — accounts / subscription grants  
- **Plant categories & plants** — botanical catalog CRUD, images  
- **Disease categories & diseases** — pathogen/symptom/treatment content  
- **Articles & article categories** — CMS publish pipeline  
- **Notifications** — broadcast campaigns (ties to Edge Function)  

Auth: admin login under `/auth/login`; app shell under `/admin/*`. Backend: `@supabase/supabase-js` against the same project as mobile.

---

## 3) Next.js landing (`plantusa-web-landing`)

Marketing + SEO site for PlantUSA:

- Home: hero, features, how-it-works, featured plants, blog preview, FAQ, newsletter, app CTA  
- **Plants** catalog pages (`/plants`, `/plants/[slug]`, categories) fed from Supabase  
- **Blog** articles from published CMS content  
- Legal: privacy, terms, data-deletion request flow  
- Download / store badges; JSON-LD (Organization, SoftwareApplication, WebSite)  
- Sitemap + robots; ISR-style revalidation on key pages  

**Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, `@supabase/ssr`, react-hook-form + Zod, sanitize-html. Deploy target: Vercel/Netlify-style hosting with `NEXT_PUBLIC_SUPABASE_*` and `NEXT_PUBLIC_SITE_URL`.

---

## Backend & ops

- **Supabase** Postgres + Auth + Storage + RLS policies for web public access  
- **Edge Functions:** plant care reminder worker (action types: watering, fertilizing, misting, rotating, pruning, note, photo, healthCheck); admin broadcast notifications via FCM  
- Migrations / SQL guides under mobile `docs/` and landing `supabase/migrations/`  
- Client delivery artifacts: invoices, Play signing materials managed outside app source for release  

---

## Skills demonstrated (for job matching)

Flutter, Dart, BLoC/Cubit, GoRouter, Clean Architecture, dependency injection (get_it/injectable), Gemini / generative AI vision, RAG-style plant detection, Supabase Auth & Postgres, anonymous auth + cross-device persistence, Firebase Cloud Messaging, local notifications, Adapty / in-app subscriptions, Isar local DB, Angular 19, NgRx, admin CMS, Next.js App Router, React, Tailwind CSS, SEO (JSON-LD, sitemap), Edge Functions (Deno), FCM server push, Google Play & App Store shipping, plant/agritech product domain, end-to-end client delivery (mobile + admin + marketing).

---

## Role summary (resume-style bullets)

- Built and shipped PlantUSA as a production plant identification & care product: Flutter iOS/Android app, Angular admin CMS, and Next.js marketing site on a shared Supabase backend.  
- Implemented Gemini-powered plant and disease detection with DB lookup-or-generate persistence, My Plants care tracking, and reminder notifications (local + FCM Edge workers).  
- Delivered Angular admin modules for plants, diseases, articles, users, and notification broadcasts; wired Next.js landing with SEO plant/blog pages and store CTAs.  
- Integrated Adapty subscriptions, Firebase messaging, and Play/App Store releases (`com.plantusa.mobile`).  
- Designed transactional plant RPCs and content pipelines so mobile, admin, and web stay consistent without rebuilding the app for every catalog change.

---

## How to add this to HuntKit Profile

1. Open HuntKit → **Profile** → Add source  
2. Type: **project**  
3. Title: `PlantUSA — Flutter plant ID + Angular admin + Next.js landing`  
4. Paste this entire file (or Role summary + Architecture + Skills if shorter)  
5. Click **Add & embed source**

File path in HuntKit repo: `profile-sources/plantusa-amit-project.md`
