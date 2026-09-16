# Data Model: Mais assistidos do mês

## `TopRankedItem`

Normalized client-side representation of a movie or TV series returned by TMDB's mixed-media trending feed.

| Field | Type | Required | Source / rule |
| --- | --- | :---: | --- |
| `id` | `number` | Yes | TMDB `id`; used for the details route. |
| `title` | `string` | Yes | `title` for movies, `name` for TV; fallback: `Sem título`. |
| `poster` | `string \| null` | No | `getPosterUrl(poster_path)`; `null` activates the visual fallback. |
| `type` | `'movie' \| 'tv'` | Yes | TMDB `media_type`, after excluding any non-media result. |
| `rankPosition` | `1 \| 2 \| 3` | Yes | One-based index after filtering the feed and retaining the first three entries. |
| `rating` | `number` | Yes | TMDB `vote_average`, rounded to one decimal or `0`. |

### Invariants and validation

- The success state contains exactly three items, ordered by `rankPosition` ascending.
- Only `movie` and `tv` items are admissible.
- Each `id` is a valid numeric TMDB identifier.
- A missing poster must not prevent a card from rendering.
- If the feed cannot yield three eligible entries, treat the result as unavailable and show the friendly non-blocking error state rather than presenting a partial ranking.

## Home ranking request state

The Home page owns this transient state; nothing is persisted.

```text
initial → loading → success (exactly 3 TopRankedItem values)
                  └→ error (friendly message, CTA remains available)
```

- `loading`: render three non-interactive skeleton cards of the final layout dimensions.
- `success`: render `MonthlyMostWatched` cards ordered 1, 2, 3.
- `error`: show a concise section-level unavailable message or omit the card grid; never replace or disable the quiz CTA.
