# Practical 8A — Magazine-Style Grid Layout

## Objective
Build a real-looking, magazine-style article page using **CSS Grid named areas**,
a 3-column article grid with a spanning lead image, and a fully responsive
"Related Articles" grid — all spacing via `gap`, zero margin hacks, collapsing to a
single column below 600px.

---

## Folder Structure
```
Practical-8A/
├── index.html      → header, sidebar, article, ad rail, related grid, footer
├── style.css       → all grid logic lives here
└── README.md        → this file
```

---

## Page Architecture (Visual Overview)

```
Desktop (grid-template-columns: 200px 1fr 220px)
┌─────────────────────────────────────────────────────────────┐
│                          HEADER  (spans all 3 columns)          │
├───────────┬───────────────────────────────────┬───────────────┤
│           │                                     │               │
│  SIDEBAR   │              ARTICLE                │      ADS       │
│  (200px)   │              (1fr — flexible)         │    (220px)     │
│           │                                     │               │
│  Trending  │  ┌─────────────────────┐            │  ┌─────────┐   │
│  list      │  │  lead image          │  ┌──────┐  │  │ ad slot  │   │
│           │  │  (span 2 columns)      │  │ text  │  │  └─────────┘   │
│           │  └─────────────────────┘  └──────┘  │  ┌─────────┐   │
│           │  ┌──────┐ ┌──────┐ ┌──────┐          │  │ ad slot  │   │
│           │  │ text  │ │ image │ │ text  │          │  └─────────┘   │
│           │  └──────┘ └──────┘ └──────┘          │               │
│           │  ── Related Articles (auto-fit) ──   │               │
│           │  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │               │
│           │  │card│ │card│ │card│ │card│          │               │
│           │  └────┘ └────┘ └────┘ └────┘          │               │
├───────────┴───────────────────────────────────┴───────────────┤
│                          FOOTER  (spans all 3 columns)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
body
└── div.magazine                       [display:grid; grid-template-areas]
    │
    ├── header.magazine__header        [grid-area: header]
    │   ├── div.header__logo
    │   └── nav.header__nav
    │
    ├── aside.magazine__sidebar        [grid-area: sidebar]
    │   ├── h3.sidebar__title
    │   └── ul.sidebar__list
    │
    ├── main.magazine__article         [grid-area: article]
    │   ├── h1.article__headline
    │   ├── p.article__byline
    │   ├── div.article__grid          [display:grid; 3 columns]
    │   │   ├── img.article__image--lead   [grid-column: span 2]
    │   │   ├── p, p                    (1 column tracks)
    │   │   ├── img.article__image      (1 column track)
    │   │   └── p, p
    │   └── section.related
    │       ├── h2.related__title
    │       └── div.related__grid       [repeat(auto-fit, minmax(200px,1fr))]
    │           └── article.related__card × 4
    │
    ├── aside.magazine__ads            [grid-area: ads]
    │   └── div.ad-slot × 2
    │
    └── footer.magazine__footer        [grid-area: footer]
```

---

## Diagram 1 — Named Grid Areas (Requirement 36)

Instead of positioning elements by row/column numbers, `grid-template-areas` lets you
literally **draw the layout as ASCII art directly in the CSS** — each string is one
row, each word is one cell, and matching words merge into a single named region.

```css
.magazine {
  grid-template-columns: 200px 1fr 220px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header   header"
    "sidebar article  ads"
    "footer  footer   footer";
}
```

```
column:      200px         1fr           220px
          ┌───────────┬───────────────┬───────────┐
row: auto  │  header    │    header       │  header    │  ← same word 3x = one region
          ├───────────┼───────────────┼───────────┤        spanning all 3 columns
row: 1fr   │  sidebar   │    article       │    ads     │  ← 3 separate regions,
          ├───────────┼───────────────┼───────────┤    one per column
row: auto  │  footer    │    footer       │  footer    │  ← spans all 3 again
          └───────────┴───────────────┴───────────┘
```

Each element just declares which named region it belongs to —
`.magazine__article { grid-area: article; }` — and the grid handles all the actual
positioning math. The HTML stays flat: no nested wrapper `<div>`s just to create
layout hooks, because the *names* do that job instead.

## Diagram 2 — Article Grid: 3 Columns + Spanning Lead Image (Requirement 37)

```css
.article__grid { grid-template-columns: repeat(3, 1fr); }
.article__image--lead { grid-column: span 2; }
```

```
Row 1:  ┌─────────────────────────────┐  ┌───────────┐
        │   lead image (span 2)          │  │  <p> text  │   ← image claims 2 of the
        │   grid-column: span 2          │  │  (1 track)  │      3 available tracks;
        └─────────────────────────────┘  └───────────┘      the paragraph fills
                                                                    what's left
Row 2:  ┌───────────┐  ┌───────────┐  ┌───────────┐
        │  <p> text  │  │   image    │  │  <p> text  │   ← normal children each
        └───────────┘  └───────────┘  └───────────┘      occupy exactly 1 track
```

`span 2` tells the grid "this item should occupy 2 tracks starting from wherever
auto-placement puts it" — it's a *relative* instruction, unlike `grid-column: 1 / 3`
which hard-codes exact line numbers. That makes it resilient if content order shifts.

## Diagram 3 — Related Articles: `auto-fit` + `minmax()` (Requirement 38)

```css
.related__grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

```
WIDE column (article area is roomy):
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  card   │ │  card   │ │  card   │ │  card   │   ← 4 tracks fit, each stretches
└────────┘ └────────┘ └────────┘ └────────┘      evenly to fill the row (1fr)

NARROW column (mobile / sidebar squeeze):
┌───────────────────────────┐
│           card                │   ← only 1 track fits >= 200px,
└───────────────────────────┘      auto-fit COLLAPSES the empty
┌───────────────────────────┐      tracks instead of leaving
│           card                │      gaps (this is the key
└───────────────────────────┘      difference vs auto-fill)
```

`minmax(200px, 1fr)` means every track is **at least 200px, but stretches to share
leftover space equally**. `auto-fit` (rather than `auto-fill`) collapses any tracks
that don't have content to fill them, so cards always stretch to use 100% of the
available width — no dead empty columns.

## Diagram 4 — Gap-Only Spacing (Requirement 39)

Every gutter on this page — page-level, inside the article grid, inside the related
grid, inside the ad rail — comes from a single `gap: var(--gutter)` declaration on
each respective grid container. There is **no margin used anywhere for spacing
between grid items** — only `gap`.

```
Old approach (margin hacks):            New approach (gap):
.card { margin-right: 24px; }          .grid { gap: 24px; }
.card:last-child { margin-right:0; }    ← one line, no exceptions,
   ↑ needs a special case for the         no last-child override needed,
     last item or you get extra           and it never adds space
     trailing space                       outside the grid's own edges
```

`gap` only ever creates space **between** grid tracks — never on the outer edge of
the grid — which is exactly the behaviour a `margin`-based system has to fight for
with `:last-child` overrides.

## Diagram 5 — Responsive Collapse Below 600px (Requirement 40)

```
>= 600px:                                  < 600px:
┌──────────────────────────┐              ┌───────────┐
│         header               │              │  header    │
├──────┬─────────────┬──────┤              ├───────────┤
│sidebar│  article      │ ads   │   ──────▶   │  article   │  ← areas simply
├──────┴─────────────┴──────┤              ├───────────┤    RE-STACK in a
│         footer               │              │  sidebar   │    new order — no
└──────────────────────────┘              ├───────────┤    HTML changes,
                                             │   ads      │    just a second
article__grid: 3 columns,                   ├───────────┤    grid-template-areas
lead image spans 2                          │  footer    │    block
                                             └───────────┘
                                             article__grid becomes
                                             1 column; lead image
                                             span drops to span 1
```

Because the layout is entirely area-name-driven, the mobile media query only needs
to redeclare `grid-template-columns` and `grid-template-areas` with a new stacking
order — every single element automatically flows into its new position. Nothing in
the HTML markup needs to change between breakpoints.

---

## Requirements Checklist

| # | Requirement | Implementation |
|---|---|---|
| 36 | Full-page layout via named areas: header / (sidebar+article+ads) / footer | `.magazine { grid-template-areas: ... }` |
| 37 | Article: 3-column grid, first image spans 2 columns | `.article__grid` + `.article__image--lead { grid-column: span 2 }` |
| 38 | Related Articles: `repeat(auto-fit, minmax(200px, 1fr))` | `.related__grid` |
| 39 | `gap` for all gutters — no margin hacks | every grid container uses `gap: var(--gutter)` only |
| 40 | Article grid becomes 1-column below 600px | `@media (max-width: 600px)` redefines both page and article grids |

---

## Architecture / Design Decisions

### 1. Why named areas instead of numbered grid lines
`grid-template-areas` was chosen over manually placing items with
`grid-column`/`grid-row` line numbers because it makes the CSS **self-documenting**
— you can look at the ASCII-art string block and immediately see the page's layout
without mentally tracking line numbers. It also makes the responsive breakpoint
trivial: redefining the area map is a complete re-layout in a handful of lines.

### 2. Why `span 2` rather than hard line numbers for the lead image
`grid-column: span 2` was used instead of `grid-column: 1 / 3` because it's
*relative* — it says "take up 2 tracks from here," which keeps working correctly
even if the image weren't the very first child, or if the column count changed.
Hard-coded line numbers would silently break under those same conditions.

### 3. Why `auto-fit` (not `auto-fill`) for Related Articles
`auto-fit` was deliberately chosen over `auto-fill` because this section only ever
has a handful of cards — with `auto-fill`, empty invisible tracks would remain
reserved and the visible cards would end up bunched to one side instead of
stretching to fill the row. `auto-fit` collapses those empty tracks so the real
cards always occupy 100% of the available width.

### 4. Gap over margin, consistently
Every single container in this layout — the page grid, the article grid, the
related-articles grid, even the ad rail — uses `gap` exclusively for internal
spacing. The one exception is `margin: 0 auto` on `.magazine` itself, which isn't
a *gutter* at all — it's centering the whole page block within the viewport, a
different job that `gap` was never meant to solve.

### 5. Semantic HTML preserved throughout
Even with a fairly complex visual layout, the HTML stays semantic and flat:
`<header>`, `<aside>`, `<main>`, `<section>`, `<footer>` — no generic `<div>` soup.
The grid's named areas do all of the positioning work, so semantic tags never had
to be sacrificed for layout convenience.

---

## How to Test

1. Open `index.html` in a browser.
2. Confirm the page renders as: header spanning full width, sidebar + article + ads
   in three columns, footer spanning full width again.
3. In the article, confirm the first (lead) image visually spans 2 of the 3 grid
   columns while the other image and paragraphs occupy single tracks.
4. Resize the browser and watch the "Related Articles" cards reflow from 4 → 2 → 1
   per row with no dead/empty space, purely from `auto-fit`.
5. Shrink below 600px — the whole page collapses to a single column
   (header → article → sidebar → ads → footer), and the lead image drops from
   spanning 2 columns to just 1, since only 1 column exists at that width.
6. Inspect any container in DevTools — confirm every visible gutter comes from a
   `gap` property, not `margin`.

---

## Author
Anisha — Full-Stack Internship
GitHub: [anishaa-07/Full-stack-Internship-Practice-](https://github.com/anishaa-07/Full-stack-Internship-Practice-)