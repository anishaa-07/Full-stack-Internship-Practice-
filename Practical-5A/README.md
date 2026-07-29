# Practical 5A — Styled Component Library

> Module 5: Introduction to CSS | Full-Stack Internship Practicals

## Objective

Build a CSS stylesheet demonstrating all core CSS fundamentals — custom
properties, the box model, typography units, a reusable card component, and
interactive pseudo-classes — as a small living style guide.

## Live Requirements Checklist

- [x] `box-sizing: border-box` applied universally via the `*` selector
- [x] 12 CSS custom properties in `:root` — colours (5), spacing (5), radius (3)
- [x] `h1`–`h3` styled at different sizes using `rem` units
- [x] `.card` class using padding, border, border-radius, and box-shadow
- [x] `:hover` and `:focus-visible` styles on links and buttons

## Folder Structure

```
practical-5a/
├── index.html      # Component showcase page
├── style.css       # Darkroom theme — tokens, cards, buttons, links
└── README.md        # This file
```

## Architecture Diagram

```
index.html
│
├── <header class="page-header">
│     └── Eyebrow + Title + Subtitle
│
├── <main class="page-main">
│     │
│     ├── <section> 01 · Design Tokens
│     │     └── .token-grid → 6 × .token-swatch (colour tokens rendered live)
│     │
│     ├── <section> 02 · Typography Scale
│     │     └── .type-scale → h1 / h2 / h3 / p, each at its rem size
│     │
│     ├── <section> 03 · Card Component
│     │     └── .card-grid → 3 × <article class="card">
│     │           (one uses the .card--featured modifier)
│     │
│     └── <section> 04 · Links & Buttons
│           └── .interactive-demo
│                 ├── .link-demo × 2 (internal anchor + external)
│                 └── .button-row → .btn--primary/secondary/ghost/danger
│
└── <footer class="page-footer">
```

## Component Tree (CSS)

```
:root                     → 12 design tokens (colour / spacing / radius / shadow)
* , *::before, *::after   → box-sizing: border-box (Requirement #1)
.showcase-section         → repeating section wrapper + numbered title
.token-swatch             → colour token preview block
.type-scale               → typography specimen card
.card                      → base card (padding, border, radius, shadow)
  .card--featured          → modifier: accent border + gradient + glow
.link-demo                → underlined link, colour-shift on hover/focus
.btn                       → base button
  .btn--primary/secondary/ghost/danger → colour variants
```

## Design Decisions

1. **Token-first architecture** — every colour, spacing value, and radius
   used anywhere on the page traces back to a single `:root` declaration.
   Changing `--color-primary` once re-themes cards, buttons, and swatches
   simultaneously — the entire point of a component library.

2. **`.card` + `.card--featured` (BEM-style modifier)** — rather than
   creating a second, near-duplicate class for the "featured" variant, the
   base `.card` styles are extended with a modifier class. This keeps
   specificity flat and mirrors the BEM convention used later in the
   course (Module 11).

3. **`:hover` and `:focus-within` on `.card`** — cards lift and glow on
   mouse hover, but `:focus-within` ensures the same feedback appears when
   a keyboard user tabs to content inside the card, not just on mouse
   hover.

4. **`:focus-visible` over `:focus`** — buttons and links only show the
   accent outline when navigated via keyboard, not on mouse click. This
   avoids the common complaint of "ugly focus rings" on mouse users while
   fully preserving keyboard accessibility.

5. **rem-based type scale** — `h1`–`h3` are sized in `rem` (relative to
   the root `16px`), so the entire scale respects a user's browser
   zoom/accessibility font-size settings, per the module's guidance.

6. **Four button variants, one base class** — `.btn` carries all shared
   button styling (padding, radius, transition); `--primary`,
   `--secondary`, `--ghost`, and `--danger` only override colour. This is
   the same "base + modifier" pattern applied to `.card`.

## How to Test

1. Open `index.html` in Chrome.
2. Hover over each card — observe the lift (`translateY`) and shadow/border
   colour change.
3. Press `Tab` repeatedly — watch the accent focus ring move through the
   links and all four buttons.
4. Resize the browser — the token grid and card grid reflow via
   `auto-fit, minmax()` with no media queries.

## Practical Checklist (from course sheet)

- [x] `box-sizing: border-box` applied universally
- [x] 8+ CSS custom properties defined in `:root` (colours, spacing, radius) — 12 used
- [x] `h1`–`h3` styled with different sizes using `rem` units
- [x] `.card` class built with padding, border, border-radius, box-shadow
- [x] `:hover` and `:focus` pseudo-class styles added to links and buttons