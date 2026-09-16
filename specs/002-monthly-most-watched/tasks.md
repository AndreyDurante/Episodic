# Tasks: Mais assistidos do mês na Home

**Input**: Design documents from `/specs/002-monthly-most-watched/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), and [monthly-most-watched.md](./contracts/monthly-most-watched.md)

**Tests**: Automated tests were not requested. Each story has an independent browser validation criterion; final static validation uses the existing lint and production-build commands.

**Organization**: Tasks are grouped by user story so the Top 3 display, detail navigation, and resilient responsive states can be delivered and tested incrementally.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing configuration needed by the feature; no dependency or project bootstrap is needed.

- [X] T001 Confirm the existing TMDB environment-variable names and image configuration support the planned request in `src/services/tmdb.js` and `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Provide the normalized real-data boundary shared by all ranking behavior.

**⚠️ CRITICAL**: Complete this phase before implementing the Home section.

- [X] T002 Add `getMonthlyMostWatched()` to `src/services/tmdb.js` using `/trending/all/week`, filtering to `movie`/`tv`, normalizing `TopRankedItem`, assigning positions 1–3, and rejecting incomplete rankings

**Checkpoint**: The service exposes exactly three real, normalized ranking items or a translated friendly error.

---

## Phase 3: User Story 1 - Visualização dos Mais Assistidos do Mês na Home (Priority: P1) 🎯 MVP

**Goal**: Show exactly three real ranked titles immediately below the primary Home CTA, each with rank, poster/fallback, and title.

**Independent Test**: Open `/` with TMDB available and verify the “Mais assistidos do mês” heading is directly below the CTA and exactly three ordered cards show `1º`, `2º`, and `3º`, poster/fallback, and title.

### Implementation for User Story 1

- [X] T003 [P] [US1] Create the semantic ranked-card success UI with heading, ordinal text, poster/media-icon fallback, and two-line title clamping in `src/components/MonthlyMostWatched/MonthlyMostWatched.jsx` and `src/components/MonthlyMostWatched/MonthlyMostWatched.css`
- [X] T004 [US1] Fetch `getMonthlyMostWatched()` with local React request state and render `MonthlyMostWatched` immediately after the CTA group in `src/pages/Home/Home.jsx`
- [X] T005 [US1] Add Home-section spacing and the solid dark/red ranking visual treatment without gradients in `src/pages/Home/Home.css`

**Checkpoint**: User Story 1 is independently functional with real data and all mandatory ranking content.

---

## Phase 4: User Story 2 - Acesso aos Detalhes da Produção Ranqueada (Priority: P2)

**Goal**: Let visitors open the existing details page from any ranked card and return to the originating Home page.

**Independent Test**: Click or keyboard-activate each ranked item on `/`; verify the matching details page opens, then use its back control and confirm return to Home.

### Implementation for User Story 2

- [X] T006 [US2] Make each successful ranking card a labeled React Router `Link` to `/filme/:id` and pass Home as its return origin in `src/components/MonthlyMostWatched/MonthlyMostWatched.jsx`
- [X] T007 [US2] Read the ranking-origin navigation state and make the details back control return to Home while preserving the existing results fallback in `src/pages/Details/Details.jsx`

**Checkpoint**: User Stories 1 and 2 both work; ranked titles are keyboard-accessible and retain a correct back destination.

---

## Phase 5: User Story 3 - Apresentação Responsiva e Estados Visuais Resilientes (Priority: P3)

**Goal**: Keep the section stable, usable, and visually consistent on mobile/desktop while data is loading or unavailable.

**Independent Test**: Throttle then fail the TMDB request and test 320px through desktop viewports; confirm three layout-stable skeletons while loading, a non-blocking friendly unavailable state on failure, no horizontal overflow, and a three-column grid from 768px.

### Implementation for User Story 3

- [X] T008 [US3] Render exactly three non-interactive skeleton cards during loading and a concise section-level unavailable state after errors in `src/components/MonthlyMostWatched/MonthlyMostWatched.jsx`
- [X] T009 [US3] Add mobile-first one-column layout, desktop three-column breakpoint, fixed skeleton dimensions, fallback styling, focus/hover feedback, and overflow-safe title treatment in `src/components/MonthlyMostWatched/MonthlyMostWatched.css`
- [X] T010 [US3] Preserve the quiz CTA while exposing service failures to the ranking component through Home’s loading/error state in `src/pages/Home/Home.jsx`

**Checkpoint**: All three stories work across the specified viewport and API-state scenarios.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature against the documented contract and quality gates.

- [X] T011 [P] Run lint and production-build validation from `package.json` using `npm run lint` and `npm run build`
- [X] T012 Validate all success, loading, error, responsive, keyboard-navigation, and return-navigation scenarios in `specs/002-monthly-most-watched/quickstart.md`
- [X] T013 Reconcile implementation behavior with FR-001 through FR-009 and the UI/service contract in `specs/002-monthly-most-watched/spec.md` and `specs/002-monthly-most-watched/contracts/monthly-most-watched.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on T001 and blocks the Home ranking work.
- **US1 (Phase 3)**: Depends on T002; delivers the MVP.
- **US2 (Phase 4)**: Depends on the successful-card markup from T003/T004.
- **US3 (Phase 5)**: Depends on T004; its CSS work can proceed after the component structure in T003 is available.
- **Polish (Phase 6)**: Depends on the implemented stories selected for release.

### User Story Dependencies

- **US1 (P1)**: Depends only on foundational data normalization; independently releasable as the MVP.
- **US2 (P2)**: Extends US1 cards with links and origin-aware return behavior.
- **US3 (P3)**: Extends US1 request/rendering with resilient states and responsive polish; it does not require US2.

### Parallel Opportunities

- T003's component structure/CSS can begin alongside the T002 service work, but must be integrated only after T002 completes.
- After T003, T009 can proceed independently from the Home integration in T004 because it changes only component CSS.
- T011 can run independently from documentation reconciliation once implementation is stable.

## Parallel Example: User Story 3

```text
Task: "Implement loading and error render states in src/components/MonthlyMostWatched/MonthlyMostWatched.jsx"
Task: "Implement responsive layout and skeleton styling in src/components/MonthlyMostWatched/MonthlyMostWatched.css"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T002 to establish the real-data service boundary.
2. Complete T003–T005 to show the real Top 3 under the Home CTA.
3. Validate the US1 independent test before expanding behavior.

### Incremental Delivery

1. Deliver US1 for core ranking visibility.
2. Deliver US2 for card-to-details discovery continuity.
3. Deliver US3 for loading/error resilience and responsive refinement.
4. Complete T011–T013 before handoff.

## Notes

- Every task follows the required checkbox, sequential-ID, story-label, and exact-path format.
- No new packages, persistence, authentication, gradients, or separate routes are in scope.
- `/trending/all/week` is the researched TMDB-supported proxy for the requested monthly mixed-media ranking.
