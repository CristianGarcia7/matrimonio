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
- Guestbook persistence behind a port (hexagonal); local adapter for now, production provider pending user decision.

## Delivery strategy
ask-on-risk. Forecast ~900 authored lines → chain strategy to be asked before PR.

## Tasks
- [x] T1 `invitation` domain: hero, countdown, ceremony/reception cards with Maps links, parents' blessing, page composition — route: delegated (2+ non-trivial files)
- [x] T2 `guestbook` domain: Zod schema, RHF form, server action, repository port + local adapter, signatures list — route: delegated
- [ ] T3 Visual polish: fonts, palette, animations, metadata/OG, remove template sample content — route: delegated

## Checks
`pnpm lint`, `pnpm build`, `npx tsc --noEmit`.

## Progress
- Branch `feat/wedding-landing` created from `main` (ed2b590).
- T1 done — route: delegated (2+ non-trivial files). Commit: `feat(invitation): add hero, countdown, events and blessing sections` `7460644`. Checks observed: `pnpm lint` pass (0 problems), `npx tsc --noEmit` pass, `pnpm build` pass (`/` static). Smoke check of built HTML: countdown placeholders `--` server-rendered, both Maps URLs and Google Calendar link present, no 6:00 time anywhere. Test-first exception: no configured test runner for src.
- T2 done — route: delegated. Commit: `feat(guestbook): add virtual signature book with file-backed repository` (hash recorded in the next commit). Added deps `zod@4.6.7`, `react-hook-form@7.91.0`, `@hookform/resolvers@6.0.0`. Checks observed: `pnpm lint` pass, `npx tsc --noEmit` pass, `pnpm build` pass (`/` now dynamic because signatures are read per request via `connection()`). Extra evidence: Node script exercised the JSON adapter (5 concurrent adds persisted, newest first) and rate limiter (4th attempt in window rejected); Playwright E2E on `pnpm start`: valid signature saved, trimmed, rendered as escaped text, list refreshed, form reset; empty submit shows both field errors wired via `aria-describedby`. Decisions: RHF hook calls the Server Action (no `useActionState`, which critical-constraints §9 forbids); reads live in `queries.ts` (not exposed as a Server Action); persistence port `GuestbookRepository` with composition point `src/domains/guestbook/repositories/guestbook-repository.ts` (`GUESTBOOK_DATA_FILE` env override). Follow-up: Docker/compose needs a volume for `data/` if the file adapter is used in production.
