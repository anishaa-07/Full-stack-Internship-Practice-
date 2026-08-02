# Practical 6A — Positioned UI Components

## Objective
Build a page demonstrating `position: fixed`, `position: sticky`, `position: relative` +
`position: absolute` (tooltip pattern), and `float` with text wrapping — all pure CSS,
no JavaScript.

---

## Folder Structure
```
Practical-6A/
├── index.html      → structure: navbar, 3 sections, tooltip, floated image
├── style.css       → all positioning logic lives here
└── README.md        → this file
```

---

## Page Architecture (Visual Overview)

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR  (position: fixed — glued to viewport, z:1000)  │  ← never moves
├─────────────────────────────────────────────────────────┤
│         ↑ body { padding-top: 60px } pushes              │
│           content below the fixed navbar                 │
├─────────────────────────────────────────────────────────┤
│  <header class="intro">                                  │
│    Page title + short explainer                          │
├─────────────────────────────────────────────────────────┤
│  <section id="section-one">                               │
│    h2.sticky-heading  (position: sticky; top: 60px)      │
│    p, p, p — explains fixed vs sticky                    │
├─────────────────────────────────────────────────────────┤
│  <section id="section-two">                                │
│    h2.sticky-heading                                      │
│    p containing .tooltip → .tooltip__text                 │
│    (position: relative → position: absolute)              │
├─────────────────────────────────────────────────────────┤
│  <section id="section-three">                              │
│    h2.sticky-heading                                      │
│    img.float-img (float: left) + wrapping <p> text         │
├─────────────────────────────────────────────────────────┤
│  <footer class="page-footer">                              │
└─────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
body  (padding-top: 60px)
│
├── nav.navbar                    [position: fixed | top:0 | z-index:1000]
│   ├── div.navbar__logo
│   └── ul.navbar__links
│       ├── li > a  (#section-one)
│       ├── li > a  (#section-two)
│       └── li > a  (#section-three)
│
└── main.page
    │
    ├── header.intro
    │   ├── h1
    │   └── p
    │
    ├── section#section-one.content-section     [overflow:auto → clearfix]
    │   ├── h2.sticky-heading                    [position: sticky | top:60px]
    │   └── p × 3
    │
    ├── section#section-two.content-section
    │   ├── h2.sticky-heading                    [position: sticky | top:60px]
    │   └── p
    │       └── span.tooltip                     [position: relative]  ← anchor
    │           └── span.tooltip__text            [position: absolute] ← floats above anchor
    │
    ├── section#section-three.content-section
    │   ├── h2.sticky-heading
    │   ├── img.float-img                        [float: left]
    │   └── p × 3   (wrap around the float)
    │
    └── footer.page-footer
```

---

## Diagram 1 — `fixed` vs `sticky` (the core concept of this practical)

```
SCROLL POSITION: TOP OF PAGE                SCROLL POSITION: 300px DOWN
┌───────────────────────────┐               ┌───────────────────────────┐
│ NAVBAR (fixed)            │ ← viewport    │ NAVBAR (fixed)            │ ← viewport
├───────────────────────────┤   top: 0      ├───────────────────────────┤   top: 0
│ h2.sticky-heading         │ ← normal flow │ h2.sticky-heading         │ ← now "stuck"
│ (not stuck yet, sitting   │   position    │ (locked at top:60px,      │   at top:60px
│  wherever the document    │               │  section content keeps    │
│  flow placed it)          │               │  scrolling underneath)    │
│ paragraph text...         │               │ paragraph text...         │
│ paragraph text...         │               │ paragraph text...         │
└───────────────────────────┘               └───────────────────────────┘

fixed  → anchored to the VIEWPORT.  Ignores scrolling & ignores parent entirely.
sticky → anchored to its PARENT.    Behaves like `relative` until the scroll
                                      position crosses the `top` threshold, then
                                      behaves like `fixed` — but only while its
                                      parent is still in view.
```

## Diagram 2 — Tooltip Positioning Context (relative → absolute)

```
span.tooltip                     ← position: relative
┌───────────────────────┐          (creates a NEW positioning
│   "Hover me"           │           context / anchor point = (0,0)
└───────────────────────┘           of this box, not the page)
        ▲
        │  .tooltip__text is position: absolute
        │  → positioned relative to .tooltip, NOT <body>
        │  → bottom: 130%  (pushes it just above the badge)
        │  → left: 50% + translateX(-50%)  (centers it horizontally)
        │
┌─────────────────────────────────────┐
│ position: absolute inside position:  │  ← .tooltip__text
│ relative parent!                     │     (visibility:hidden by default,
└─────────────────────────────────────┘      shown on :hover / :focus)
              ▼  (small CSS triangle via ::after)

Without position:relative on the parent, the tooltip text would
position itself against the nearest positioned ANCESTOR up the
tree — which could be <body> — and appear in the wrong place
entirely (usually pinned to a page corner). This is the single
most common bug with absolute positioning.
```

## Diagram 3 — Float + Text Wrap + Clearfix

```
.content-section  { overflow: auto; }   ← clearfix wrapper
┌───────────────────────────────────────────────┐
│ ┌───────────┐  This paragraph text wraps       │
│ │           │  naturally around the floated     │
│ │  img       │  image because float:left pulls   │
│ │  (float:   │  it out of normal flow and lets    │
│ │   left)    │  inline content fill the space     │
│ │           │  beside it — the classic magazine-  │
│ └───────────┘  style layout technique.            │
│                                                    │
│  Once the paragraph text is taller than the        │
│  image, it continues at FULL WIDTH below it. │
└───────────────────────────────────────────────┘
        ▲
        │ Without `overflow: auto` (clearfix) on the parent,
        │ the floated image's height would NOT be counted
        │ when calculating .content-section's own height —
        │ the box could collapse and the image could visually
        │ spill into whatever section comes next.
```

---

## Requirements Checklist

| # | Requirement | Implementation |
|---|---|---|
| 26 | `<nav>` with `position: fixed` at top | `.navbar { position: fixed; top:0; z-index:1000; }` |
| 27 | Prevent fixed nav from covering content | `body { padding-top: 60px; }` |
| 28 | 3 sections, each `h2` with `position: sticky; top: 60px` | `.sticky-heading` reused on all 3 sections |
| 29 | Tooltip via relative parent + absolute child | `.tooltip` (relative) → `.tooltip__text` (absolute) |
| 30 | Image `float: left` with wrapping text | `.float-img` inside Section 3 |
| — | Clearfix so float doesn't break layout | `overflow: auto` on `.content-section` |

---

## Architecture / Design Decisions

### 1. Fixed vs. Sticky — why both exist in the same page
`.navbar` uses `position: fixed`, anchored to the **viewport** — it never moves,
regardless of scroll position, because it's removed entirely from document flow and
positioned against the browser window itself. Each `.sticky-heading` uses
`position: sticky; top: 60px`, anchored to its **own parent** (`.content-section`) —
it scrolls normally (acting like `relative`) until it's 60px from the top of the
viewport, then locks there (acting like `fixed`) until its parent section itself
scrolls out of view, at which point it releases and the next heading takes over.
Putting both on the same page side by side makes the difference visually obvious
instead of just theoretical.

### 2. Tooltip Pattern (relative + absolute)
`.tooltip` (the visible badge) is `position: relative`, which does two things:
keeps it in normal document flow (so it doesn't disrupt the paragraph it sits in),
and creates a **positioning context** for any absolutely-positioned descendant.
`.tooltip__text` is `position: absolute`, so instead of positioning against the whole
page, it positions against its nearest *positioned* ancestor — the badge itself. It's
hidden by default (`visibility: hidden; opacity: 0`) rather than `display: none`, and
revealed on `:hover` / `:focus` with a short opacity transition — `visibility` still
allows a smooth transition to run (unlike `display`, which snaps instantly), and it
also keeps the hidden tooltip out of tab order / hit-testing when not shown.

### 3. Float + Clearfix
`.float-img` uses the classic `float: left` pattern — pulled out of normal flow so
inline-level content (the paragraph text) wraps around its remaining space, exactly
the pre-Flexbox technique used for magazine-style layouts. Because floated elements
don't contribute to their parent's calculated height, `.content-section` uses
`overflow: auto` as a simple, modern clearfix — this forces the parent to include the
float in its own height calculation, preventing the image from spilling into
whatever section comes next.

### 4. Why no JavaScript
Every interaction on this page — tooltip reveal, sticky headings locking in place,
the navbar staying fixed — is achieved purely with CSS `position` values and the
`:hover` / `:focus` pseudo-classes. This matches the scope of the practical, which is
specifically about mastering the CSS `position` and `float` properties without
reaching for JS as a crutch.

### 5. Why `z-index` matters here
Both `.navbar` and `.sticky-heading` are given explicit `z-index` values
(`1000` and `10`), because positioned elements (`fixed`, `sticky`, `absolute`,
`relative`) create their own stacking context — without an explicit z-index, the
sticky headings could end up rendering *behind* other content as they overlap it
during scroll, since source order alone doesn't guarantee stacking order once
elements are taken out of normal flow.

---

## How to Test

1. Open `index.html` in a browser.
2. **Fixed nav** — scroll down the entire page; the navbar stays pinned to the top
   the whole time, never scrolling away.
3. **Sticky headings** — keep scrolling through each section; watch the `h2` "stick"
   right under the navbar, then get pushed off-screen by the next section's own
   heading as that section scrolls into place.
4. **Tooltip** — hover (or Tab-focus, for keyboard users) over either "Hover me" /
   "Practical 6A" badge in Section 2; a tooltip fades in just above it.
5. **Float** — in Section 3, notice the paragraph text flowing around the floated
   image, and how it drops to full width once the text runs taller than the image.
6. Resize the browser below 480px — the float switches to a full-width stacked image
   (see the responsive media query at the bottom of `style.css`).

---

## Author
Anisha — Full-Stack Internship
GitHub: [anishaa-07/Full-stack-Internship-Practice-](https://github.com/anishaa-07/Full-stack-Internship-Practice-)