# UI and service contract: Mais assistidos do mês

## Service: `getMonthlyMostWatched`

**Location**: `src/services/tmdb.js`

```js
async function getMonthlyMostWatched(): Promise<TopRankedItem[]>
```

- Calls the existing `fetchFromTMDB` helper with `/trending/all/week`.
- Filters to TMDB results whose `media_type` is `movie` or `tv`.
- Produces exactly three normalized `TopRankedItem` values in API ranking order, assigning `rankPosition` from 1 to 3.
- Throws the existing translated API/network error for HTTP or connectivity failures.
- Throws a friendly unavailable error if fewer than three valid results exist.

## Component: `MonthlyMostWatched`

**Location**: `src/components/MonthlyMostWatched/MonthlyMostWatched.jsx`

```jsx
<MonthlyMostWatched items={items} loading={loading} error={error} />
```

| Prop | Type | Required | Contract |
| --- | --- | :---: | --- |
| `items` | `TopRankedItem[]` | Yes | Exactly three ordered values in the success state; `[]` otherwise. |
| `loading` | `boolean` | Yes | When true, show exactly three skeleton cards and no interactive item links. |
| `error` | `string \| null` | Yes | When non-null after loading, show a concise, friendly section-level unavailable state. |

### Render and interaction contract

- The section has a readable heading: `Mais assistidos do mês`.
- Each success card contains a visible rank badge (`1º`, `2º`, `3º`), poster or dark placeholder with media icon, and official title clamped to two lines.
- Each entire card is one keyboard-accessible React Router link with `aria-label="Ver detalhes de {title}"` and destination `/filme/{id}`.
- Rank is conveyed in text rather than color alone. Hover and keyboard focus are visually evident.
- The CSS is one column below 768px and three equal columns at or above 768px; it must not create horizontal scrolling at 320px.
- Use only solid dark colors and the red `#AD1818` accent; CSS gradients are forbidden.
