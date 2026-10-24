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
- [ ] T2 `guestbook` domain: Zod schema, RHF form, server action, repository port + local adapter, signatures list — route: delegated
- [ ] T3 Visual polish: fonts, palette, animations, metadata/OG, remove template sample content — route: delegated

## Checks
`pnpm lint`, `pnpm build`, `npx tsc --noEmit`.

## Progress
- Branch `feat/wedding-landing` created from `main` (ed2b590).
- T1 done — route: delegated (2+ non-trivial files). Commit: `feat(invitation): add hero, countdown, events and blessing sections` (hash recorded in the next commit). Checks observed: `pnpm lint` pass (0 problems), `npx tsc --noEmit` pass, `pnpm build` pass (`/` static). Smoke check of built HTML: countdown placeholders `--` server-rendered, both Maps URLs and Google Calendar link present, no 6:00 time anywhere. Test-first exception: no configured test runner for src.
