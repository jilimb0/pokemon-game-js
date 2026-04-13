# planning.md

## Goal
Upgrade the project into a portfolio-ready, stable, and demonstrable mini-game.

## Architecture decisions
- Keep stack as static vanilla JS (no framework migration).
- Move critical combat logic to pure functions for testability.
- Keep deployment as static hosting (Netlify-friendly defaults).
- Prefer local art assets for reliability and offline resilience.

## Task breakdown
1. Refactor gameplay logic and remove known defects.
2. Add unit tests for deterministic core battle functions.
3. Improve UX feedback and responsive behavior.
4. Add docs that communicate engineering decisions and setup.

## Risks
- UI-only regressions cannot be fully caught by unit tests alone.
- CSS overrides may conflict with legacy style blocks.
