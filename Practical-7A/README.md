# Practical 7A — Flexbox Dashboard Layout

## Objective
Build a responsive 3-column dashboard — fixed header, two sidebars, flexible main
content, and a wrapping card grid — entirely with CSS Flexbox. No CSS Grid, no JS.

---

## Folder Structure
```
Practical-7A/
├── index.html      → header, dual sidebars, main content, 6 cards, footer
├── style.css       → all flexbox logic lives here
└── README.md        → this file
```

---

## Page Architecture (Visual Overview)

```
┌───────────────────────────────────────────────────────────────┐
│  HEADER  (flex row: logo | nav | profile — justify:space-between) │
├───────────┬───────────────────────────────────────┬───────────┤
│           │                                       │           │
│  SIDEBAR   │              MAIN CONTENT              │  SIDEBAR   │
│   LEFT     │                                       │   RIGHT    │
│  (250px    │   .cards { display:flex; wrap; }       │  (200px    │
│   fixed)   │   ┌────┐ ┌────┐ ┌────┐                 │   fixed)   │
│            │   │card│ │card│ │card│                 │            │
│  flex:     │   └────┘ └────┘ └────┘                 │  flex:     │
│  0 0 250px │   ┌────┐ ┌────┐ ┌────┐                 │  0 0 200px │
│            │   │card│ │card│ │card│                 │            │
│            │   └────┘ └────┘ └────┘                 │            │
│            │   ↑ each card: flex: 1 1 200px          │            │
│            │     (wraps onto new row on small        │            │
│            │      screens automatically)              │            │
├───────────┴───────────────────────────────────────┴───────────┤
│  FOOTER  (pushed to bottom via column-flex + main:flex:1)        │
└───────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
body
└── div.dashboard                        [display:flex; flex-direction:column; min-height:100vh]
    │
    ├── header.dashboard__header          [display:flex; justify-content:space-between]
    │   ├── div.header__logo              [display:flex; centers icon + text]
    │   │   ├── span.header__logo-icon
    │   │   └── span.header__logo-text
    │   ├── nav.header__nav               [display:flex; gap]
    │   │   └── a × 3
    │   └── div.header__profile
    │
    ├── div.dashboard__body                [display:flex; flex:1]
    │   │
    │   ├── aside.sidebar.sidebar--left    [flex: 0 0 250px]
    │   │   ├── h3.sidebar__title
    │   │   └── ul.sidebar__list           [display:flex; column]
    │   │
    │   ├── main.main-content              [flex: 1]
    │   │   ├── h1.main-content__title
    │   │   ├── p.main-content__subtitle
    │   │   └── div.cards                  [display:flex; flex-wrap:wrap]
    │   │       ├── article.card × 6        [flex: 1 1 200px | column flex]
    │   │       │   ├── div.card__icon
    │   │       │   ├── h3.card__title
    │   │       │   └── p.card__text
    │   │
    │   └── aside.sidebar.sidebar--right   [flex: 0 0 200px]
    │       ├── h3.sidebar__title
    │       └── ul.sidebar__activity
    │
    └── footer.dashboard__footer
```

---

## Diagram 1 — The Sticky-Footer Flex Pattern (Requirement 31)

This is the classic 3-tier flex pattern: a **column-direction** flex container as
the outer wrapper, with the middle piece set to `flex: 1` so it eats all leftover
vertical space and pushes the footer to the bottom — even on pages with very little
content.

```
.dashboard { display:flex; flex-direction:column; min-height:100vh; }

┌─────────────────────────────┐  ← flex-direction: column means
│ header  (flex-shrink:0)      │     items stack top-to-bottom
├─────────────────────────────┤     instead of left-to-right
│                               │
│ .dashboard__body             │  ← flex: 1
│ (grows to fill ALL           │     "take up whatever vertical
│  remaining vertical space)   │      space is left over"
│                               │
├─────────────────────────────┤
│ footer  (flex-shrink:0)      │  ← always at the bottom,
└─────────────────────────────┘     even if body content is short
```

Without `flex: 1` on `.dashboard__body`, the footer would sit directly under the
content on short pages instead of being pinned to the bottom of the viewport.

## Diagram 2 — Three-Column Body (Requirement 32)

`.dashboard__body` is itself a **row-direction** flex container (the default),
holding exactly three children with three very different flex behaviours:

```
.dashboard__body { display:flex; gap:1.5rem; }

┌──────────────┐  ┌──────────────────────────┐  ┌──────────────┐
│ sidebar-left  │  │       main-content         │  │ sidebar-right │
│               │  │                            │  │               │
│ flex: 0 0     │  │ flex: 1                    │  │ flex: 0 0     │
│      250px    │  │ (grow:1 shrink:1 basis:0%) │  │      200px    │
│               │  │                            │  │               │
│ grow:0 →      │  │ Takes ALL remaining         │  │ grow:0 →      │
│  never grows   │  │ horizontal space after      │  │  never grows   │
│ shrink:0 →     │  │ both sidebars claim their    │  │ shrink:0 →     │
│  never shrinks  │  │ fixed widths.                │  │  never shrinks  │
└──────────────┘  └──────────────────────────┘  └──────────────┘
```

The `flex: 0 0 <width>` shorthand is the key idiom here: **grow 0, shrink 0, basis
<width>** — it locks a flex item to an exact pixel width regardless of how much
space is available, which is exactly what a sidebar needs.

## Diagram 3 — Card Grid: `flex-wrap` + `flex: 1 1 200px` (Requirement 33 & 34)

```
.cards { display:flex; flex-wrap:wrap; gap:1.25rem; }
.card  { flex: 1 1 200px; }   /* grow:1 shrink:1 basis:200px */

WIDE VIEWPORT (fits 3 per row):
┌────────┐ ┌────────┐ ┌────────┐
│  card   │ │  card   │ │  card   │   ← each card grows evenly (grow:1)
└────────┘ └────────┘ └────────┘      to fill the row beyond 200px
┌────────┐ ┌────────┐ ┌────────┐
│  card   │ │  card   │ │  card   │
└────────┘ └────────┘ └────────┘

NARROW VIEWPORT (only fits 1 per row):
┌──────────────────────┐
│         card            │   ← flex-wrap:wrap moves overflow
└──────────────────────┘      cards onto new rows automatically,
┌──────────────────────┐      no media query needed for this part
│         card            │
└──────────────────────┘
```

Each individual `.card` is *also* a flex container — `flex-direction: column` with
`align-items: center` — which is how the icon, title, and text end up centered and
stacked vertically inside every card (Requirement 34).

## Diagram 4 — Header: Logo Centered via Flexbox (Requirement 35)

```
.dashboard__header { display:flex; align-items:center; justify-content:space-between; }

┌─────────────┬───────────────────────┬─────────────┐
│  ◆ FlexDash  │  Overview  Analytics  │  👤 Anisha   │
│  (logo)      │  Settings   (nav)      │  (profile)   │
└─────────────┴───────────────────────┴─────────────┘
      ↑                                        ↑
 justify-content: space-between pushes the three
 flex items to the far left, center-ish, and far
 right. `.header__logo` is itself a flex container
 with align-items:center + justify-content:center,
 which is what visually centers the icon + text
 against each other on the vertical axis.
```

---

## Requirements Checklist

| # | Requirement | Implementation |
|---|---|---|
| 31 | Fixed header + flex body + footer | `.dashboard { flex-direction:column }`, sticky-footer pattern |
| 32 | Sidebar (250px) + main + sidebar (200px) | `flex: 0 0 250px` / `flex: 1` / `flex: 0 0 200px` |
| 33 | `.cards` container, `flex-wrap:wrap`, 6 cards `flex:1 1 200px` | `.cards` + `.card` |
| 34 | Card: icon + title + text, column flex, centered | `.card { flex-direction:column; align-items:center }` |
| 35 | Logo centered in header via flexbox | `.header__logo { display:flex; align-items:center; justify-content:center }` |

---

## Architecture / Design Decisions

### 1. Why `flex: 0 0 <width>` for sidebars, but `flex: 1` for main
The two sidebars need a **fixed, non-negotiable width** — 250px and 200px — no
matter how wide or narrow the browser window is, which is exactly what `flex: 0 0`
does (zero grow, zero shrink, a fixed basis). The main content column, by contrast,
should be as flexible as possible, so it just gets `flex: 1` — shorthand for
`flex-grow: 1`, which lets it absorb every remaining pixel of horizontal space once
both sidebars have claimed theirs.

### 2. Why `flex: 1 1 200px` (not just `flex: 1`) on cards
Using `flex: 1 1 200px` instead of a plain `flex: 1` gives every card a **minimum
comfortable width of 200px** as its starting point (`flex-basis`), while still
letting cards grow (`flex-grow: 1`) to fill leftover space evenly, and shrink
(`flex-shrink: 1`) slightly if the row gets tight. Combined with `flex-wrap: wrap`
on the parent, this means the grid reflows itself responsively with zero media
queries — cards naturally drop to fewer per row as the viewport narrows.

### 3. `min-width: 0` on `.main-content`
By default, flex items have an implicit `min-width: auto`, which can stop them from
shrinking below their content's natural width — this is a well-known flexbox gotcha
that causes horizontal overflow. Setting `min-width: 0` on `.main-content` overrides
that default so the middle column can shrink properly on small screens instead of
forcing the whole layout to overflow horizontally.

### 4. Sticky footer without extra wrapper divs
Rather than using JS or absolute positioning tricks to pin the footer, the whole
page relies on one flex property: `.dashboard__body { flex: 1 }` inside a
column-direction flex container. This is the standard, JS-free sticky-footer
pattern and is far more robust than the old `min-height: 100vh; margin-top: -footer-height`
CSS hacks.

### 5. Responsive strategy: flex-wrap first, media queries second
Most of the responsiveness here — the card grid — comes for free from
`flex-wrap: wrap`, with **no media query required**. Media queries are only used as
a fallback for the two things flex-wrap can't solve alone: stacking the sidebars
below the main content on narrow screens, and wrapping the header nav on very small
screens.

---

## How to Test

1. Open `index.html` in a browser.
2. Resize the window wide — 3 cards per row, both sidebars visible at their fixed
   widths (250px / 200px), main content flexes to fill the middle.
3. Shrink the window gradually — watch the card grid drop to 2, then 1 card per row
   automatically (pure `flex-wrap`, no media query).
4. Shrink below 900px — the sidebars stack above/below the main content instead of
   sitting beside it.
5. Shrink below 480px — the header nav wraps onto its own row, still centered.
6. Scroll the page (if content is short) — footer still sits at the bottom of the
   viewport, never floating mid-page.

---

## Author
Anisha — Full-Stack Internship
GitHub: [anishaa-07/Full-stack-Internship-Practice-](https://github.com/anishaa-07/Full-stack-Internship-Practice-)