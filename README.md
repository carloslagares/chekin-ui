# Chekin UI Kit

Chekin's internal design system — tokens, React components, and the visual vocabulary that every Chekin frontend should share.

## Where things live

- **Live Storybook:** <https://carloslagares.github.io/chekin-ui/>
- **Frontend Handbook (PDF):** <https://carloslagares.github.io/chekin-ui/docs/chekin-ui-kit-guide.pdf> — the single document to give new frontend / backend / PM teammates; covers tokens, components, conventions, and the full roadmap.

## Packages

| Package | What it is |
|---|---|
| `@chekin/tokens` | Design tokens as CSS custom properties, JSON, and a drop-in Tailwind preset. Platform-neutral. |
| `@chekin/ui` | React components built on Radix primitives and styled with Chekin tokens. |
| `apps/docs` | Storybook 8 (Vite) — the live spec and catalogue for every component. |

## Quick start

```bash
pnpm install          # Node 20+, pnpm 10+
pnpm storybook        # opens http://localhost:6006
pnpm typecheck        # runs tsc --noEmit across the workspace
```

To regenerate the PDF handbook locally:

```bash
pip install reportlab  # one-time
python3 docs/generate_guide.py
```

## Contributing

Component additions go through an RFC → PR flow. See §10 of the handbook (linked above) for the full process, versioning (changesets), and visual-regression expectations.

## Deployment

`.github/workflows/pages.yml` rebuilds the Storybook site and regenerates the PDF on every push to `main`, then publishes both to GitHub Pages. No manual steps.
