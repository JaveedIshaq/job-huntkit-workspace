# Project: NurseLife / HaloCare — Healthcare Staffing Platform (Flutter + Angular Web)

**Type:** Client product engineering (Crunch / NurseLife) — nurse mobile app + multi-role web admin + marketing landings  
**Status (2026):** Active MVP delivery — shifts, applications, clock-in/out, chat, verification, referrals live on shared Supabase  
**Mobile brand:** **HaloCare** (Flutter) · Package: `nurselife.com.mobile` · Version e.g. `1.0.0+39`  
**Platform brand:** **NurseLife** — healthcare staffing for Africa  
**One-liner:** Hospitals post shifts; nurses discover, apply, clock in/out with location checks, chat, and get paid — with agencies and platform admins on one Angular web surface.

---

## What I built

Two main codebases under `/crunch/nurselife/`:

| Surface | Stack | Audience |
|---------|--------|----------|
| **HaloCare mobile** (`nurselife-mobile`) | Flutter (Riverpod, GoRouter, feature folders) | **Nurses** (primary) — registration, shifts, availability, chat, push, clock-in/out |
| **NurseLife web** (`nurselife-web-admin`) | **Angular 22** + Tailwind + Supabase | Landing + **Hospital / Agency / Nurse / Super-admin** portals |

> Accuracy note: marketing **landing pages and the admin/ops dashboards live in the same Angular app** (not a separate Next.js site). Routes like `/`, `/nurses`, `/hospital`, `/agencies` are public landings; authenticated `/admin/...` dashboards are role-gated.

I worked across progressive registration, shift lifecycle (post → apply → assign → clock-in/out → complete), hospital live shift boards, chat/notifications, document verification, agency nurse roster flows, referrals/payments surfaces, and Edge Functions for email/push.

---

## Problem & product vision

**Vision (PRD):** Become the most trusted, transparent healthcare staffing platform in Africa — cut agency middleman friction, fill hospital shortages faster, and give nurses flexible paid shifts.

**Core workflow**
1. Hospital posts a shift  
2. Eligible nurses are notified / browse & apply  
3. Hospital reviews applications and selects a nurse  
4. Nurse works the shift (mobile clock-in / clock-out + location)  
5. Mutual reviews  
6. Payment / platform commission (payments evolving)  

**Roles:** `ADMIN` (super), `NURSE`, `HOSPITAL`, `AGENCY` — enforced with `AuthGuard` + `RoleGuard` on web and role-aware mobile features.

---

## Architecture

```
HaloCare (Flutter)     →  Supabase Auth + Postgres (RLS)
                       →  Storage (credentials / documents)
                       →  FCM + local notifications
                       →  Geolocator (attendance / distance filters)
                       →  Chat, shifts, availability, referrals

NurseLife Angular web  →  Same Supabase project
                       →  Public landings + registration funnels
                       →  Role dashboards (hospital shifts, agency nurses,
                          admin verification, finance/referrals)
                       →  Firebase (AngularFire) where used for web push/auth helpers

Edge Functions         →  send-push-notification (FCM + Web Push / VAPID)
                       →  process-notification-queue
                       →  send-email / send-contact-notification
                       →  check-credential-expiry
                       →  agency-create-nurse
```

**Mobile-only vs web:** Shift **execution** (clock-in/out, on-site jobs/notes) is nurse-mobile first; hospitals manage posting, applications, and live attendance boards on web.

---

## 1) Flutter — HaloCare (`nurselife-mobile`)

**Architecture:** Feature modules with `data` / `domain` / `presentation`; Riverpod + Freezed/json_serializable; GoRouter; slang i18n (EN + AF/ES/FR strings present); Supabase Flutter.

**Feature areas**
| Feature | What it does |
|---------|----------------|
| **auth / registration / onboarding** | Sign-in, progressive registration steps, phone/email verification paths, Google Sign-In wiring |
| **shifts** | Browse by date/distance, details, apply, withdraw/time-off, start/complete, attendance |
| **availability** | Calendar availability; gate “available shifts” when unavailable |
| **chat** | In-app messaging with hospitals (names/contacts on threads) |
| **notifications** | Push + in-app; device token claim/cleanup for multi-user-on-one-device |
| **nurse / hospital / agency** | Role-specific profiles and flows |
| **document / certification / specialty** | Credentials upload (PDF/files), specialties for matching requirements |
| **payment / referral / reviews** | Payments surfaces, referral program, ratings |
| **home / account / settings** | Dashboard shortcuts (clock-in next to availability), profile, appearance/language |

**Shift execution highlights**
- Browse available shifts (filter date / distance / rate / specialty requirements)  
- Apply → hospital accept → shift `FILLED` + `nurse_id`  
- Clock-in → `IN_PROGRESS`; hospital sees live timer/jobs on web  
- Location verification for attendance  
- Hide filled shifts from other nurses; completed one-day shifts don’t re-offer “Start”  

**Stack:** Flutter 3.44 / Dart 3.12, Riverpod, GoRouter, Dio, supabase_flutter, Firebase Messaging/Auth, local notifications, geolocator/geocoding, table_calendar, fl_chart, Mixpanel, Sentry, local_auth, Google Sign-In, slang.

---

## 2) Angular — NurseLife web admin + landing (`nurselife-web-admin`)

**Single Angular app** serving:

### Public marketing / acquisition
- Home, About, Contact  
- **For Nurses** landing + simple registration + success  
- **For Hospitals** landing + registration + success  
- **For Agencies** landing + registration  
- Legal: privacy, terms, cookies, data protection  

### Authenticated multi-portal (RoleGuard)
- **Super admin:** platform dashboard, payments, referral program/payouts, verification review, user/reference-data ops  
- **Hospital:** dashboard, create/edit shifts, shift board, applications review, live view of clocked-in nurses, facility profile  
- **Agency:** dashboard, my nurses, add nurse, browse shifts, submissions  
- **Nurse (web):** reduced dashboard / roster invitations (shift execution stays mobile)  

Other feature areas in the codebase: users, placements, payments/finance, chat/messages, communication, banners, reviews, referrals, settings, notifications, reference data.

**Auth UX:** login, register, email/phone verification, forgot/reset password, OAuth callback, registration-complete gates.

**Stack:** Angular 22, TypeScript, Tailwind CSS, Angular Material/CDK, `@supabase/supabase-js`, AngularFire/Firebase, FullCalendar, TinyMCE, SweetAlert2, Vercel Analytics, datatables/UI kit.

---

## Backend & reliability work

- Supabase migrations for shift state machine (e.g. fill on accept, in-progress on check-in)  
- RLS policy audits; progressive registration tables (`registration_steps`, `user_registration_progress`, `nurses`, …)  
- Notification queue + preference-aware push (quiet hours, per-category toggles)  
- Fixed multi-user-same-device FCM token leaks (claim token / deactivate on logout)  
- Credential expiry checker Edge Function  
- Agency-create-nurse provisioning function  

---

## Skills demonstrated (for job matching)

Flutter, Dart, Riverpod, GoRouter, Clean/feature architecture, healthcare staffing marketplace, shift scheduling, geolocation attendance, progressive multi-step registration, document/credential verification, in-app chat, FCM push notifications, Angular (latest), multi-role RBAC dashboards, marketing landings in Angular, Supabase Auth/Postgres/RLS/Storage, Edge Functions (Deno), email notifications, referral programs, payments surfaces, Mixpanel, Sentry, i18n (slang), Google Sign-In, Africa healthcare domain, end-to-end client delivery (mobile + web).

---

## Role summary (resume-style bullets)

- Built NurseLife/HaloCare healthcare staffing surfaces: Flutter nurse app and Angular multi-role web (landings + hospital/agency/admin portals) on one Supabase backend.  
- Implemented the core shift loop — post, apply, assign, clock-in/out with location checks, hospital live attendance boards, chat, and push notifications.  
- Delivered progressive nurse registration, document verification workflows, agency nurse roster tools, and referral/payment admin screens.  
- Hardened push delivery (device-token ownership on shared devices) and wired Edge Functions for push, email, notification queue, and credential expiry.  
- Enforced role-based access (`ADMIN` / `NURSE` / `HOSPITAL` / `AGENCY`) across web routes and mobile features aligned to the official PRD.

---

## How to add this to HuntKit Profile

1. Open HuntKit → **Profile** → Add source  
2. Type: **project**  
3. Title: `NurseLife / HaloCare — Flutter staffing app + Angular multi-role web`  
4. Paste this entire file (or Role summary + Architecture + Skills if shorter)  
5. Click **Add & embed source**

File path in HuntKit repo: `profile-sources/nurselife-halocare-project.md`
