# Feature: wedding-landing

## Objective
Elegant, mobile-first wedding invitation landing page with a countdown, event details, parents' blessing and a virtual guestbook.

## Facts (source of truth)
- Couple: Jose Ignacio Garcia Rincon & Patricia Yaima Rodriguez
- Date: Saturday, January 9, 2027 (America/Bogota, UTC-05:00)
- Ceremony (mass): shown as 5:30 PM (real mass is 6:00 PM — intentionally earlier on the invitation). Parroquia Juan Pablo II, Barrio Margaritas — https://maps.app.goo.gl/nFMDQc8142s7JkrD8
- Reception: 6:40 PM. Eventos Adonais — https://maps.app.goo.gl/as6DKxtiJbeW5HTV9
- Blessing: groom's parents Jose Agustin Garcia & Quintina Rincon; bride's parents Vicente Yaima & Blanca Alcira Rodriguez
- Countdown target: 2027-01-09T17:30:00-05:00

## Constraints
- Template rules in `.claude/knowledge/critical-constraints.md` and `.claude/rules/*.md` (DDD domains, atomic design, BEM + @apply, RHF + Zod, English identifiers).
- UI copy in Spanish (invitation audience); code identifiers in English.
- Guestbook persistence behind a port (hexagonal); production storage decided by the user: SQLite on a single AWS instance run with PM2 (Docker kept as optional path).

## Delivery strategy
ask-on-risk. Forecast ~900 authored lines → chain strategy to be asked before PR.

## Tasks
- [x] T1 `invitation` domain: hero, countdown, ceremony/reception cards with Maps links, parents' blessing, page composition — route: delegated (2+ non-trivial files)
- [x] T2 `guestbook` domain: Zod schema, RHF form, server action, repository port + local adapter, signatures list — route: delegated
- [x] T3 Visual polish: fonts, palette, animations, metadata/OG, remove template sample content — route: delegated
- [x] T4 SQLite guestbook adapter + PM2 deploy (ecosystem file, README) + Docker volume — route: delegated (2+ non-trivial files)

## Checks
`pnpm lint`, `pnpm build`, `npx tsc --noEmit`.

## Progress
- Branch `feat/wedding-landing` created from `main` (ed2b590).
- T1 done — route: delegated (2+ non-trivial files). Commit: `feat(invitation): add hero, countdown, events and blessing sections` `7460644`. Checks observed: `pnpm lint` pass (0 problems), `npx tsc --noEmit` pass, `pnpm build` pass (`/` static). Smoke check of built HTML: countdown placeholders `--` server-rendered, both Maps URLs and Google Calendar link present, no 6:00 time anywhere. Test-first exception: no configured test runner for src.
- T2 done — route: delegated. Commit: `feat(guestbook): add virtual signature book with file-backed repository` `a3d916e`. Added deps `zod@4.6.7`, `react-hook-form@7.91.0`, `@hookform/resolvers@6.0.0`. Checks observed: `pnpm lint` pass, `npx tsc --noEmit` pass, `pnpm build` pass (`/` now dynamic because signatures are read per request via `connection()`). Extra evidence: Node script exercised the JSON adapter (5 concurrent adds persisted, newest first) and rate limiter (4th attempt in window rejected); Playwright E2E on `pnpm start`: valid signature saved, trimmed, rendered as escaped text, list refreshed, form reset; empty submit shows both field errors wired via `aria-describedby`. Decisions: RHF hook calls the Server Action (no `useActionState`, which critical-constraints §9 forbids); reads live in `queries.ts` (not exposed as a Server Action); persistence port `GuestbookRepository` with composition point `src/domains/guestbook/repositories/guestbook-repository.ts` (`GUESTBOOK_DATA_FILE` env override). Follow-up: Docker/compose needs a volume for `data/` if the file adapter is used in production.
- T3 done — route: delegated. Commit: `feat(invitation): apply romantic visual theme, motion and share metadata` `3eb9882`. Fonts via `next/font/google`: Cormorant Garamond (display), Great Vibes (script), Jost (body), imported with camelCase aliases to satisfy the `camelcase` lint rule. Palette tokens (ivory, champagne, gold, sage, rose) in `src/app/globals.css`, semantic shadcn tokens remapped (gold primary ~5:1 on ivory, muted text ~6:1, input border ~3:1). CSS-only motion in `src/styles/utils/animations.css` (hero stagger + scroll-driven reveal behind `@supports (animation-timeline: view())`, all inside `prefers-reduced-motion: no-preference`). `<html lang="es">`, title/description/Open Graph from `src/config/site.ts`. Removed demo `public/*.svg` and Geist fonts. Checks observed: `pnpm lint` pass, `npx tsc --noEmit` pass, `pnpm build` pass; served HTML shows `lang="es"`, title and `og:title` "Jose Ignacio & Patricia · 9 de enero de 2027", `og:locale` es_CO; Playwright mobile (390px) full-page screenshot reviewed with reduced motion; scroll reveal verified (opacity 1 after scrolling); no 6:00 reference in `src`. Follow-ups: optional OG image (`opengraph-image`) for richer WhatsApp previews; Docker volume for `data/`.
- T4 done — route: delegated (2+ non-trivial files). Commit: `feat(guestbook): persist signatures in sqlite for single-instance deploy` `798d237`. `sqlite-guestbook.repository.ts` uses Node 24 built-in `node:sqlite` (`DatabaseSync`; no native build, no ExperimentalWarning observed on Node 24.16): idempotent schema + `created_at` index, WAL, parameterized statements, one lazily opened connection per process, parent dir created with a clear error naming `GUESTBOOK_DB_PATH` on failure. `GUESTBOOK_DB_PATH` defaults to `data/guestbook.db`; JSON adapter and `GUESTBOOK_DATA_FILE` removed. `@types/node` bumped 20.19.13 → 24.19.2 for `node:sqlite` typings. PM2: `ecosystem.config.cjs` (single fork instance — in-memory rate limiter + single SQLite writer; DB at `/var/lib/wedding-invitation/guestbook.db`), README `Deploy (PM2)` section. Docker (optional): named volume `guestbook-data` at `/app/data` owned by `nextjs`, image/container renamed `wedding-invitation`, builder now creates `public/` (pre-existing break after T3 removed it). Checks observed: `pnpm lint` pass, `npx tsc --noEmit` pass, `pnpm build` pass, `node -e "require('./ecosystem.config.cjs')"` loads, `docker build` pass. Smoke: `pnpm start` on :3417 with scratch `GUESTBOOK_DB_PATH`; Playwright signed through the real form (quote/SQL-ish text stored verbatim), row present with `journal_mode=wal` and the index, signature still rendered after server restart; adapter script: 5 concurrent adds persisted, unwritable path surfaces the `GUESTBOOK_DB_PATH` error (cause EACCES). Pending: `.env.example` not updated (file read denied by permission settings; it still documents `GUESTBOOK_DATA_FILE`). Test-first exception: no configured test runner for src.
- Next step: parent decides on native review and push/PR (chain strategy pending per delivery strategy); update `.env.example` (`GUESTBOOK_DB_PATH`).
