# Quickstart validation: Mais assistidos do mês

## Prerequisites

- Node.js and npm installed.
- Dependencies installed with `npm install`.
- A valid `VITE_TMDB_API_KEY` in `.env` (see `.env.example`).

## Static validation

From the repository root:

```powershell
npm run lint
npm run build
```

Expected: both commands exit successfully.

## End-to-end browser validation

1. Start the app with `npm run dev` and open the printed local URL.
2. On `/`, verify that `Mais assistidos do mês` appears immediately below `Encontrar algo para assistir` and before any quiz-information section.
3. During a throttled request, confirm three skeleton cards reserve the final section layout with no abrupt layout shift.
4. Once TMDB responds, confirm exactly three cards show rank labels 1º, 2º, and 3º; each has a title and either a poster or the dark fallback. Compare field expectations with [data-model.md](./data-model.md).
5. Click and keyboard-activate each card. Confirm it opens `/filme/:id`, loads the matching details page, and browser Back returns to the Home page.
6. Test at 320px, 640px, 768px, and a wide desktop viewport. Confirm no horizontal overflow; the cards are one column on mobile and three columns from 768px up. See the [UI contract](./contracts/monthly-most-watched.md).
7. Simulate an offline/failed TMDB request and reload Home. Confirm the section shows a discreet friendly unavailable state while the quiz CTA still works.
8. Inspect the section's styles: no gradients, solid dark surfaces, and `#AD1818` used for rank emphasis/focus accents.
