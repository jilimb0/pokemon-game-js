# Pokemon Fight (Vanilla JS)

A lightweight browser battle game built with plain JavaScript modules, HTML, and CSS.

## Live Demo

Deploy quickly on Netlify as a static site (no build command required).

## Features

- Turn-based 1v1 battle with random Pokemon matchups
- Multiple attacks per Pokemon with damage ranges and usage counters
- Enemy counterattacks with random move selection
- HP bars with low and critical visual states
- Battle logs and end-of-game modal with replay action
- Mobile-friendly controls and responsive layout
- Local sprite assets (no remote dependency)

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES modules)
- Node.js test runner (`node:test`) for unit tests

## Project Structure

- `index.html` - App markup
- `main.js` - Game orchestration and event handling
- `pokemon.js` - Pokemon model + rendering updates
- `game-logic.js` - Pure gameplay logic helpers (testable)
- `pokemons.js` - Pokemon roster data
- `logs.js` - Battle log sentence generator
- `utils.js` - Random utility helpers
- `tests/game-logic.test.js` - Unit tests

## Run Locally

1. Start a static server from project root:

```bash
python3 -m http.server 4173
```

2. Open `http://localhost:4173` in your browser.

## Tests

```bash
pnpm test
```

## Netlify Settings

- Branch to deploy: `main`
- Base directory: (empty)
- Build command: (empty)
- Publish directory: `.`
- Functions directory: `netlify/functions` (optional, not currently used)

## Portfolio Notes

This project demonstrates:

- DOM-driven game state management
- Refactoring from UI-coupled logic to testable pure functions
- UX improvements (combat feedback, battle result state, responsive controls)
- Static hosting readiness

## Next Up

- Add soundtrack + SFX toggle
- Add Pokemon selection screen and difficulty modes
- Add E2E browser tests with Playwright
