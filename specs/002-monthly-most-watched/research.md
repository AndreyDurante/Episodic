# Research: Mais assistidos do mês

**Feature**: `002-monthly-most-watched`  
**Date**: 2026-09-16

## Decision 1: Use TMDB's mixed-media weekly trending list as the live monthly-ranking proxy

**Decision**: Request `/trending/all/week`, ignore non-media results, retain entries whose `media_type` is `movie` or `tv`, and take the first three normalized entries.

**Rationale**: The specification requires real mixed movie and series data. TMDB's documented trending score has only daily and weekly windows; it does not expose a native monthly trending endpoint. The weekly mixed-media list is therefore the closest live, API-supported signal for “Mais assistidos do mês,” while maintaining the product wording requested by the feature. TMDB's popularity documentation also explains that popularity reflects current activity and is available as a discover sort, but not as a separately queryable historical monthly dataset. [TMDB popularity and trending](https://developer.themoviedb.org/docs/popularity-and-trending)

**Alternatives considered**:

- `/movie/popular` plus `/tv/popular`: rejected because merging two independently ranked lists produces an arbitrary cross-media Top 3.
- `/discover/movie` and `/discover/tv` with date filters: rejected because release/air dates identify newly released works, not what users watched during the month; they also have the same cross-media merge problem. [TMDB movie discover](https://developer.themoviedb.org/reference/discover-movie)
- Persisted daily snapshots and a local monthly aggregate: rejected because it needs scheduled collection and storage beyond this MVP's scope.

## Decision 2: Normalize at the TMDB service boundary

**Decision**: Add `getMonthlyMostWatched()` in `src/services/tmdb.js`; map TMDB response records to `TopRankedItem` with `rankPosition` assigned after filtering and slicing.

**Rationale**: The existing service already owns API URLs, error translation, image URL construction, and conversion to UI-shaped objects. Keeping those rules there avoids API-specific conditionals in the page/component and makes the component props predictable.

**Alternatives considered**:

- Map raw TMDB data in `Home`: rejected because it duplicates service responsibilities and makes component consumers depend on TMDB response fields.
- Add a state library/cache: rejected because Home performs one request and React's local hooks meet the requirement.

## Decision 3: Keep Home responsible for request lifecycle, use a presentational ranking component

**Decision**: Home will use `useState` and `useEffect` to model loading, success, and error. It will render `MonthlyMostWatched` directly after the CTA group, passing `items`, `loading`, and `error`.

**Rationale**: This matches the existing Details and Results patterns, satisfies the constitution's React-hook requirement, and prevents a failing optional section from blocking the hero CTA.

## Decision 4: Link directly to the existing detail route

**Decision**: Each ranked item renders a React Router `Link` to `/filme/:id`.

**Rationale**: This reuses existing navigation and preserves browser history. The current Details page already resolves an ID as a movie first and retries as TV if necessary, so both media types are supported without a route change.

## Decision 5: Use CSS Grid and fixed-size skeleton areas to avoid layout shift

**Decision**: Default to a one-column grid; at `min-width: 768px`, use three columns. Skeleton cards reserve the same poster/card proportions as final cards. Titles clamp to two lines, and missing posters use the existing Lucide movie/TV icon convention.

**Rationale**: Meets FR-006 to FR-008 and the established mobile-first CSS approach without new packages or gradients.
