# Contributing

## Quick start

```bash
pnpm install
pnpm test
pnpm lint
```

Just open `index.html` in a browser to play. No build step needed.

## How to contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes
4. Run `pnpm lint && pnpm test`
5. Open a pull request

## Code style

We use **Biome** for linting and formatting (double quotes, as-needed semicolons, line width 100). No ESLint or Prettier.

The project is vanilla JS with ES modules — no frameworks, no build step.

## Adding a new Pokemon

Add an entry to `pokemons.js` with name, type, hp, img path, lvl, and 4 attacks. Add a sprite SVG in `assets/sprites/`. The sprite should be ~50x50px with a colored rounded rectangle background and simple face features.

## Testing

- Unit tests: `pnpm test` (Node `--test` runner)
- E2E tests: `pnpm exec playwright test` (requires `npx serve . -l 8080` running)

Add unit tests for pure game logic in `tests/game-logic-extended.test.js`. Add E2E tests in `tests/e2e/`.
