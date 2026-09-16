# Implementation Plan: Mais assistidos do mês

**Branch**: `002-monthly-most-watched` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

## Summary

Add a responsive, dark-theme “Mais assistidos do mês” Top 3 immediately below the Home CTA. A new TMDB service function will fetch real mixed movie/TV popularity data, normalize it into ranked items, and expose loading, success, and non-blocking error states. A focused reusable component will render accessible links to the existing details route.

## Technical Context

**Language/Version**: JavaScript (ES modules), React 19.2, Vite 8.3

**Primary Dependencies**: React, React Router DOM 7, Lucide React; browser Fetch API; TMDB API v3

**Storage**: N/A; request state remains local to the Home page

**Testing**: ESLint (`npm run lint`); Vite production build (`npm run build`); manual responsive/API-state validation

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: Single-page web application

**Performance Goals**: Render a layout-stable three-card skeleton while the request is pending; navigate to details using the existing SPA route in under one second under normal conditions (SC-003)

**Constraints**: Real TMDB data only; exactly three ranked items; no new dependency, authentication, persistence, gradients, or horizontal overflow from 320px upward; use solid dark surfaces and `#AD1818` for the ranking accent

**Scale/Scope**: One Home section, one presentational component with CSS, one TMDB-service function, and documentation. The ranking is fetched once when Home mounts.

## Constitution Check

| Gate | Status | Evidence |
| --- | --- | --- |
| I. Discovery focus | PASS | Gives visitors immediate, relevant choices before starting the discovery quiz. |
| II. MVP simplicity | PASS | Uses the existing API, route, and local state; no accounts, persistence, or new infrastructure. |
| III. React architecture | PASS | Page owns `useState`/`useEffect`; a reusable component receives normalized data through props. |
| IV. Real data and resilient async states | PASS | TMDB data is fetched asynchronously with loading and friendly error states. |
| V. Discovery experience | PASS | The CTA and established quiz flow remain intact; ranking is a supplementary entry point. |
| VI. Visual identity | PASS | Existing dark design tokens and solid red `#AD1818` accent will be reused without gradients. |
| VII. Responsive/accessibility | PASS | One-column mobile layout, three-column desktop grid, semantic links, focus visibility, and poster alt text are required. |
| VIII. Code organization | PASS | Files follow the existing `pages`, `components`, and `services` conventions. |
| IX. Traceability | PASS | Service, component, placement, states, navigation, and responsive rules map to FR-001 through FR-009. |

**Post-design re-check**: PASS. The research and design artifacts preserve all gates; no complexity exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/002-monthly-most-watched/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── monthly-most-watched.md
```

### Source Code (repository root)

```text
src/
├── components/
│   └── MonthlyMostWatched/
│       ├── MonthlyMostWatched.jsx
│       └── MonthlyMostWatched.css
├── pages/
│   └── Home/
│       ├── Home.jsx
│       └── Home.css
└── services/
    └── tmdb.js
```

**Structure Decision**: Keep the existing single React/Vite application. The Home page coordinates the request lifecycle and section placement; `MonthlyMostWatched` owns ranking presentation; `tmdb.js` remains the only API boundary.

## Complexity Tracking

No constitution violations or added dependencies.
