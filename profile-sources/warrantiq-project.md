# Project: WarrantIQ — Full-Stack Mobile Product (Flutter + Next.js + Supabase)

**Type:** Solo / indie product engineer build (end-to-end ownership)  
**Status (2026):** Android Google Play release preparation; iOS App Store planned next  
**Package / app id:** `space.alchemify.warrantiq` · Display name: **WarrantIQ**  
**Marketing site:** https://warrantiq.alchemify.space  
**One-liner:** Scan receipts and appliance labels once; track warranties; get reminded before they expire.

---

## What I built

I designed and built **WarrantIQ** as a production-oriented monorepo product:

- **Flutter mobile app** (Android-first, iOS-ready architecture)
- **Next.js admin CMS + ops dashboard** (same Supabase project)
- **Supabase backend** (Auth, Postgres + RLS, Storage, Edge Functions, cron)
- **Marketing landing** (Next.js static export on GitHub Pages)

I own product requirements, schema/RLS design, mobile features, admin CMS/ops, monetization, push reminders, store listing assets, and release tooling — not only UI screens.

---

## Problem & product

People lose receipts, forget warranty end dates, and miss claim windows. WarrantIQ lets a user:

1. Add home assets (fridge, phone, AC, laptop, etc.)
2. Snap a receipt or serial/label photo
3. Use **AI extract** (OpenRouter) to prefill product name, purchase date, warranty period, serial
4. Confirm/edit, then save with receipt vault documents
5. Receive **warranty reminders** (30 / 7 / 1 days before expiry)

**Audience:** homeowners, renters, and busy professionals managing multiple devices.

---

## Architecture (system design)

```
Flutter app  →  Supabase Auth + Postgres (RLS) + Storage
             →  OpenRouter (AI receipt/label extract)
             →  RevenueCat (Premium entitlements)
             →  Firebase (FCM push, Remote Config, force-update / maintenance)

Admin (Next.js) → Supabase Auth + requireAdmin()
                → Service-role server APIs for CMS + aggregates (never in Flutter)

Edge Functions  → revenuecat-webhook (mirror entitlements server-side)
                → process-warranty-reminders (pg_cron → FCM)
                → process-scheduled-notifications
```

**Layering (Flutter):** UI → Riverpod notifiers → Repository → API → Supabase  
**Security model:** Mobile uses publishable key + user JWT only. Admin writes and usage aggregates use **service role** only after `requireAdmin()`. Quotas that matter (e.g. AI scans) are enforced with trusted SQL / webhook-mirrored entitlements — not client-only flags.

---

## Monorepo structure

| Path | Role |
|------|------|
| `apps/mobile` | Flutter product app (Riverpod, GoRouter, slang i18n, feature folders) |
| `apps/admin` | Next.js 16 admin — CMS, support, WarrantIQ ops, usage dashboard |
| `apps/landing` | Next.js static marketing site |
| `supabase/` + mobile functions | Migrations, RLS, Storage policies, Edge Functions |
| `packages/` | Shared TS (when needed) |
| `devdocs/` | Requirements, DB design, priority todos, schema/admin feature guides |

Root orchestration: **pnpm + Turborepo**. Flutter is run via `apps/mobile` (not a pnpm package).

---

## Mobile app — features I implemented

Feature modules under `lib/features/`:

| Feature | What it does |
|---------|----------------|
| **Assets** | CRUD list/detail/form; derived status `active` / `expiring_soon` / `expired`; free-tier asset cap |
| **Scan / AI** | Camera/gallery → Storage upload → OpenRouter structured JSON → review sheet → save asset + documents; AI scan quota |
| **Vault** | Receipt/manual documents; Premium vault rules |
| **Reminders** | Premium reminder UX; server-side expiry pushes (30/7/1); in-app received notifications |
| **Auth** | Supabase email/password; Google (Android); Apple planned for iOS |
| **Onboarding** | Pain → promise → how it works → notification permission |
| **Premium / quotas** | RevenueCat purchase/restore; gates on assets, AI scans, reminders, vault |
| **Engagement / settings / profile / notifications** | Kit + product wiring (Remote Config force-update, maintenance, review prompts) |

**Flutter stack:** Flutter 3.44 / Dart 3.12, Riverpod (+ codegen), GoRouter, Freezed/json_serializable, slang, Bart bottom nav, Supabase Flutter, Dio, RevenueCat (`purchases_flutter`), Firebase Messaging + Remote Config, Mixpanel, Sentry, local notifications / timezone, image picker, secure storage.

**Brand:** navy `#0A142E`, teal `#14B8A6`; tokenized theme (`AlchemyColors`).

---

## Backend & data model

Core product tables (Postgres / Supabase):

- `assets` (+ `warranty_expires_on` trigger/index)
- `asset_documents` + private Storage bucket `asset-docs` (`{user_id}/…` path policies)
- `ai_extract_jobs` (debug / cost trail)
- `user_quotas` (e.g. free **3** assets, **3** lifetime AI scans; Premium skips AI quota)
- `user_entitlements` (mirrored from RevenueCat webhook for trusted server gates)
- `warranty_reminder_sends` + notifications/deliveries for idempotent push reminders
- Kit identity/activity tables: profiles/users, device tokens, daily activity for admin usage cards

**RLS:** authenticated users CRUD only their own rows; anon has no table grants.  
**Migrations** live under `supabase/migrations/` (product tables, AI consume RPC, Premium skip quota, warranty reminder scheduler).

---

## Admin panel — what I built / wired

Next.js App Router admin (TypeScript, Tailwind v4, shadcn/ui, TanStack Query + Table, nuqs, Zod forms) against the **same Supabase project**:

**Content CMS (mobile reads):** legal pages, FAQs, promo banners, version notes, Remote Config, app settings  

**Support:** feature-request moderation, support tickets, reviews  

**WarrantIQ ops:** users/quotas, assets detail, AI extract jobs, warranty reminder send logs  

**Usage dashboard (service-role aggregates):** online now, active/new users (7d), total/enabled users, Premium active, sessions (7d) — without inventing “screen time”

**Auth gate:** Supabase session + `profiles.role === 'admin'` via `requireAdmin()`; nav filtering is UX only.

---

## Monetization & store readiness

- **Free:** capped assets + AI scans; manual entry within cap  
- **Premium (RevenueCat):** unlimited assets/AI, reminders, vault  
- Paywall triggers: over asset cap, over AI quota, enabling reminders, soft prompt from settings  
- **Android:** Play listing graphics/screenshots prepared under `apps/mobile/playstore/`; signed release / AAB flow via kit ship skills; version e.g. `1.0.0+9`  
- **iOS:** architecture and kit `/shipkit*` App Store playbooks ready; publication planned after Android  
- Privacy / Data safety story includes AI extracts + receipt images (PII)

---

## Engineering practices I used

- Feature-first folders with clear API → repository → provider → UI boundaries  
- Trusted server rules for quotas/entitlements (webhook + SQL), not “honor system” client checks  
- Edge Functions for secrets (Firebase service account, cron secrets, RevenueCat webhook) — never in Flutter or `NEXT_PUBLIC_*`  
- Compile-time env via `--dart-define-from-file=.env`  
- Documented priority backlog (`devdocs/PRIORITY_TODOS.md`) and schema/admin feature guides for repeatable shipping  
- Reusable Alchemify Flutter kit patterns (`/kit-*`, `/shipkit*`) adapted into a real product monorepo

---

## Skills demonstrated (for job matching)

Flutter, Dart, Riverpod, GoRouter, Freezed, mobile architecture, Material Design, Android Play Store release, iOS App Store readiness, Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, admin dashboards, Supabase Auth, PostgreSQL, Row Level Security (RLS), Supabase Storage, Edge Functions, pg_cron, FCM push notifications, Firebase Remote Config, RevenueCat / in-app subscriptions, OpenRouter / LLM structured extraction, Mixpanel analytics, Sentry, monorepo (pnpm, Turborepo), product thinking, B2C utility SaaS, end-to-end ownership from schema to store listing.

---

## Role summary (resume-style bullets)

- Built WarrantIQ end-to-end: Flutter consumer app, Next.js admin CMS/ops, Supabase schema/RLS/Storage, and Edge Functions for Premium webhooks and warranty push reminders.  
- Implemented AI receipt/label capture with OpenRouter, editable review, Storage vault, and free/Premium quota enforcement.  
- Designed trusted monetization: RevenueCat client purchases + server-side entitlement mirror so Premium gates cannot be spoofed from the app alone.  
- Shipped admin content and ops surfaces (legal, FAQ, banners, remote config, assets/AI jobs, reminder sends, usage metrics) behind `requireAdmin()` + service-role APIs.  
- Prepared Google Play store assets and release pipeline; planning iOS publication on the same Flutter codebase.

---

## How to add this to HuntKit Profile

1. Open HuntKit → **Profile** → Add source  
2. Type: **project**  
3. Title: `WarrantIQ — Flutter + Next.js + Supabase product`  
4. Paste this entire file (or the Role summary + Architecture + Skills sections if you want a shorter chunk)  
5. Click **Add & embed source**

File path in this repo: `profile-sources/warrantiq-project.md`
